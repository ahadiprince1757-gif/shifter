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
 * - Exponential backoff when server is offline (503 / sleeping Render instance)
 * - Request timeouts
 * - Automatic background monitoring
 * - Clean event listener unbinding
 * ============================================================================
 */

// Backoff schedule when the backend is unreachable (503 / server sleeping).
// After N consecutive failures the check interval grows to avoid hammering.
// [ attempts, nextIntervalMs ]
const BACKOFF_SCHEDULE = [
  [0,  30_000],   //  0 failures  → check every 30s (normal)
  [2,  60_000],   //  2 failures  → check every 1 min
  [4, 120_000],   //  4 failures  → check every 2 min
  [6, 300_000],   //  6 failures  → check every 5 min
  [8, 600_000],   //  8+ failures → check every 10 min
];

function getBackoffInterval(consecutiveFailures) {
  let interval = BACKOFF_SCHEDULE[0][1];
  for (const [threshold, ms] of BACKOFF_SCHEDULE) {
    if (consecutiveFailures >= threshold) interval = ms;
  }
  return interval;
}

class NetworkService {
  constructor({
    healthCheckUrl = null,
    checkInterval = 30_000,
    timeout = 12_000,
    autoStart = true,
  } = {}) {
    const resolvedApiUrl =
      typeof import.meta !== "undefined" && import.meta.env?.PROD
        ? ((import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes("localhost"))
            ? import.meta.env.VITE_API_URL
            : "https://shifter-i49i.onrender.com")
        : (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
            ? import.meta.env.VITE_API_URL
            : "http://localhost:3001");

    this.healthCheckUrl = healthCheckUrl || `${resolvedApiUrl.replace(/\/$/, "")}/health`;
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
    this._checkPromise = null;
    this._consecutiveFailures = 0;  // tracks how many times /health returned non-ok

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

  /**
   * Waits for connectivity check to complete when in CHECKING state.
   * Resolves immediately if already ONLINE or OFFLINE.
   */
  async waitForOnline(timeoutMs = 5000) {
    if (this.isOnline) return true;
    if (this.isOffline) return false;
    return new Promise((resolve) => {
      let timer = null;
      const listener = (state) => {
        if (state.status === "ONLINE" || state.status === "DEGRADED") {
          cleanup();
          resolve(true);
        } else if (state.status === "OFFLINE") {
          cleanup();
          resolve(false);
        }
      };
      const cleanup = () => {
        if (timer) clearTimeout(timer);
        this.listeners.delete(listener);
      };
      this.listeners.add(listener);
      timer = setTimeout(() => {
        cleanup();
        resolve(this.isOnline);
      }, timeoutMs);
    });
  }

  /* ==========================================================================
     EVENT HANDLERS
  ========================================================================== */

  async handleOnline() {
    // Browser came back online — reset backoff and check immediately
    this._consecutiveFailures = 0;
    this._scheduleNextCheck(0);

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
    this._scheduleNextCheck();
  }

  /**
   * Schedule the next health check using adaptive backoff.
   * @param {number} [overrideMs] - If provided, use this delay instead of backoff calc.
   */
  _scheduleNextCheck(overrideMs) {
    if (this.monitorTimer) {
      clearTimeout(this.monitorTimer);
      this.monitorTimer = null;
    }

    const delay = overrideMs !== undefined
      ? overrideMs
      : getBackoffInterval(this._consecutiveFailures);

    if (delay === 0) {
      // Immediate check — schedule via rAF to avoid re-entrant call stack
      this.monitorTimer = setTimeout(() => {
        this.monitorTimer = null;
        this.checkConnectivity().then(() => this._scheduleNextCheck());
      }, 50);
      return;
    }

    this.monitorTimer = setTimeout(() => {
      this.monitorTimer = null;
      this.checkConnectivity().then(() => this._scheduleNextCheck());
    }, delay);
  }

  stop() {
    if (this.monitorTimer) {
      clearTimeout(this.monitorTimer);
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
    if (this._checkPromise) {
      return this._checkPromise;
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

    this._checkPromise = (async () => {
      try {
        const startTime = performance.now();

        if (this.healthCheckUrl) {
          const response = await this.fetchWithTimeout(
            this.healthCheckUrl,
            { method: "GET", cache: "no-store" },
            this.timeout
          );

          if (!response.ok) {
            // Server returned an error status (e.g. 503 Render sleeping).
            // Treat as a server-side failure — increment backoff counter.
            this._consecutiveFailures++;
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

        // Successful response — reset backoff
        this._consecutiveFailures = 0;

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
        // Network error or non-ok status — increment failure count if not already done above
        if (this._consecutiveFailures === 0) {
          this._consecutiveFailures++;
        }

        const isBrowserOnline = typeof navigator !== "undefined" ? navigator.onLine : false;
        this.updateState({
          browserOnline: isBrowserOnline,
          internetReachable: false,
          status: isBrowserOnline ? "DEGRADED" : "OFFLINE",
          latency: null,
          lastChecked: new Date().toISOString(),
        });
      } finally {
        this.isChecking = false;
        this._checkPromise = null;
      }

      return this.getState();
    })();

    return this._checkPromise;
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
          this._consecutiveFailures++;
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
