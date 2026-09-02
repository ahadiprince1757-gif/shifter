/**
 * ============================================================================
 * TIXAR NETWORK & CONNECTIVITY SERVICE
 * ============================================================================
 *
 * Handles:
 * - Browser online/offline detection
 * - Actual internet & API connectivity verification
 * - Four Connection Health States: ONLINE, DEGRADED, OFFLINE, CHECKING
 * - Subscriber notifications
 * - Exponential backoff retry engine
 * - Request timeouts
 * - Automatic background monitoring
 * - Clean event listener unbinding
 * ============================================================================
 */

class NetworkService {
  constructor({
    healthCheckUrl = null,
    checkInterval = 30_000,
    timeout = 5_000,
    autoStart = true,
  } = {}) {
    this.healthCheckUrl =
      healthCheckUrl ||
      (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/health`
        : null);
    this.checkInterval = checkInterval;
    this.timeout = timeout;

    this.listeners = new Set();

    this.state = {
      status:
        typeof navigator !== "undefined" && navigator.onLine
          ? "CHECKING"
          : "OFFLINE",

      browserOnline:
        typeof navigator !== "undefined" ? navigator.onLine : false,

      internetReachable: false,
      lastChecked: null,
      latency: null,
    };

    this.monitorTimer = null;
    this.isChecking = false;

    // Bind event handlers
    this.handleOnline = this.handleOnline.bind(this);
    this.handleOffline = this.handleOffline.bind(this);

    if (typeof window !== "undefined") {
      window.addEventListener("online", this.handleOnline);
      window.addEventListener("offline", this.handleOffline);
    }

    if (autoStart) {
      this.start();
    }
  }

  /* ==========================================================================
     STATE HELPERS
  ========================================================================== */

  get isOnline() {
    return this.state.status === "ONLINE" || this.state.status === "DEGRADED";
  }

  get isOffline() {
    return this.state.status === "OFFLINE";
  }

  get status() {
    return this.state.status;
  }

  getState() {
    return {
      ...this.state,
      isOnline: this.isOnline,
    };
  }

  /* ==========================================================================
     EVENT HANDLERS
  ========================================================================== */

  async handleOnline() {
    this.updateState({
      browserOnline: true,
      status: "CHECKING",
    });

    await this.checkConnectivity();
  }

  handleOffline() {
    this.updateState({
      browserOnline: false,
      internetReachable: false,
      status: "OFFLINE",
      latency: null,
    });
  }

  /* ==========================================================================
     START / STOP / DESTROY
  ========================================================================== */

  async start() {
    if (this.monitorTimer) {
      return;
    }

    await this.checkConnectivity();

    this.monitorTimer = setInterval(() => {
      this.checkConnectivity();
    }, this.checkInterval);
  }

  stop() {
    if (this.monitorTimer) {
      clearInterval(this.monitorTimer);
      this.monitorTimer = null;
    }
  }

  destroy() {
    this.stop();

    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.handleOnline);
      window.removeEventListener("offline", this.handleOffline);
    }

    this.listeners.clear();
  }

  /* ==========================================================================
     CONNECTIVITY HEALTH CHECK
  ========================================================================== */

  async checkConnectivity() {
    if (this.isChecking) {
      return this.getState();
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      this.handleOffline();
      return this.getState();
    }

    this.isChecking = true;

    this.updateState({
      browserOnline: true,
      status: "CHECKING",
    });

    try {
      const startTime = performance.now();

      if (this.healthCheckUrl) {
        const response = await this.fetchWithTimeout(
          this.healthCheckUrl,
          { method: "GET", cache: "no-store" },
          this.timeout
        );

        if (!response.ok) {
          throw new Error(`Health check failed with status ${response.status}`);
        }
      } else {
        await this.fetchWithTimeout(
          "/favicon.ico",
          { method: "HEAD", cache: "no-store" },
          this.timeout
        );
      }

      const latency = Math.round(performance.now() - startTime);

      let status = "ONLINE";
      if (latency > 2000) {
        status = "DEGRADED";
      }

      this.updateState({
        browserOnline: true,
        internetReachable: true,
        status,
        latency,
        lastChecked: new Date().toISOString(),
      });
    } catch {
      this.updateState({
        browserOnline: true,
        internetReachable: false,
        status: "OFFLINE",
        latency: null,
        lastChecked: new Date().toISOString(),
      });
    } finally {
      this.isChecking = false;
    }

    return this.getState();
  }

  /* ==========================================================================
     FETCH WITH TIMEOUT
  ========================================================================== */

  async fetchWithTimeout(url, options = {}, timeout = this.timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /* ==========================================================================
     STATE MANAGEMENT & NOTIFICATIONS
  ========================================================================== */

  updateState(updates) {
    const previousStatus = this.state.status;

    this.state = {
      ...this.state,
      ...updates,
    };

    this.notifyListeners(this.getState(), previousStatus);
  }

  subscribe(callback, { immediate = true } = {}) {
    if (typeof callback !== "function") {
      throw new TypeError("Network listener must be a function.");
    }

    this.listeners.add(callback);

    if (immediate) {
      callback(this.getState(), null);
    }

    return () => {
      this.listeners.delete(callback);
    };
  }

  notifyListeners(state, previousStatus) {
    this.listeners.forEach((callback) => {
      try {
        callback(state, previousStatus);
      } catch (error) {
        console.error("[NetworkService] Listener error:", error);
      }
    });
  }

  /* ==========================================================================
     SAFE EXECUTION
  ========================================================================== */

  async executeIfOnline(fn, fallbackAction = null) {
    if (typeof fn !== "function") {
      throw new TypeError("executeIfOnline expects a function.");
    }

    if (!this.isOnline) {
      await this.checkConnectivity();
    }

    if (this.isOnline) {
      try {
        return await fn();
      } catch (error) {
        if (this.isNetworkError(error)) {
          this.updateState({
            internetReachable: false,
            status: "OFFLINE",
          });
        }
        throw error;
      }
    }

    if (typeof fallbackAction === "function") {
      return await fallbackAction();
    }

    throw new Error(
      "Tixar is currently offline. This action requires an internet connection."
    );
  }

  /* ==========================================================================
     RETRY ENGINE
  ========================================================================== */

  async executeWithRetry(
    fn,
    { retries = 3, initialDelay = 1000, fallbackAction = null } = {}
  ) {
    let lastError = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.executeIfOnline(fn, fallbackAction);
      } catch (error) {
        lastError = error;

        if (attempt >= retries) {
          break;
        }

        const delay = initialDelay * Math.pow(2, attempt);
        await this.sleep(delay);
        await this.checkConnectivity();
      }
    }

    throw lastError;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /* ==========================================================================
     ERROR DETECTION
  ========================================================================== */

  isNetworkError(error) {
    if (!error) return false;
    return (
      error.name === "AbortError" ||
      error.name === "TypeError" ||
      /network/i.test(error.message || "") ||
      /failed to fetch/i.test(error.message || "")
    );
  }
}

export const networkService = new NetworkService();
export default networkService;
