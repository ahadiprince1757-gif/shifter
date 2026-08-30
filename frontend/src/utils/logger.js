/**
 * Structured Logger Module for Frontend
 * Production-grade logging with:
 * - Log levels (ERROR, WARN, INFO, DEBUG)
 * - Session tracking
 * - Reduced noise (selective logging)
 * - Batch processing
 */

// Log level hierarchy
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

class FrontendLogger {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || "/api";
    this.batchSize = options.batchSize || 10;
    this.batchInterval = options.batchInterval || 30000; // 30s
    this.logLevelName = (options.logLevel || "info").toLowerCase();
    this.logLevelValue = LOG_LEVELS[this.logLevelName] || LOG_LEVELS.info;
    this.userId = null;
    this.requestId = null;
    this.sessionId = this._generateSessionId();
    this.logQueue = [];
    this.enabled = options.enabled !== false;

    // Start batch processing
    this._startBatchTimer();

    // Log uncaught errors
    window.addEventListener("error", (event) => {
      this.error("UNCAUGHT_ERROR", event.error, {
        filename: event.filename,
        lineno: event.lineno,
      });
    });

    // Log unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.error("UNHANDLED_PROMISE_REJECTION", event.reason);
    });
  }

  /**
   * Check if a log level should be logged
   */
  _shouldLog(level) {
    const levelValue = LOG_LEVELS[level] || LOG_LEVELS.info;
    return levelValue <= this.logLevelValue;
  }

  /**
   * Generate unique session ID for this browser session
   */
  _generateSessionId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Set user ID and request context
   */
  setUserId(userId) {
    this.userId = userId;
  }

  setRequestId(requestId) {
    this.requestId = requestId;
  }

  /**
   * Format log entry as JSON with consistent structure
   */
  _formatLog(level, action, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      action,
      userId: this.userId || null,
      ...(this.requestId && { requestId: this.requestId }),
      sessionId: this.sessionId,
      ...details,
    };
    return logEntry;
  }

  /**
   * Queue log entry for batch processing
   */
  _queueLog(logEntry) {
    if (!this.enabled || !this._shouldLog(logEntry.level)) return;

    // Show only errors and warnings in console in a highly structured format
    if (logEntry.level === "error") {
      console.error(
        `%c[SYSTEM ERROR - ${logEntry.action}]%c\n` +
        `• Message: ${logEntry.errorMessage || "No error message provided"}\n` +
        `• Time: ${new Date(logEntry.timestamp).toLocaleTimeString()}\n` +
        `• Context:`,
        "color: #ff3b30; font-weight: 800; font-size: 1.1em; text-transform: uppercase;",
        "color: inherit;",
        {
          userId: logEntry.userId,
          sessionId: logEntry.sessionId,
          ...logEntry,
        }
      );
    } else if (logEntry.level === "warn") {
      console.warn(
        `%c[SYSTEM WARNING - ${logEntry.action}]%c\n` +
        `• Time: ${new Date(logEntry.timestamp).toLocaleTimeString()}\n` +
        `• Context:`,
        "color: #ffcc00; font-weight: 700; font-size: 1.05em; text-transform: uppercase;",
        "color: inherit;",
        logEntry
      );
    }

    this.logQueue.push(logEntry);

    // Flush if batch size reached
    if (this.logQueue.length >= this.batchSize) {
      this._flushLogs();
    }
  }

  /**
   * Send queued logs to backend (non-blocking)
   */
  _flushLogs() {
    if (this.logQueue.length === 0) return;

    // Don't attempt to send logs when offline — keep them queued for later
    if (!navigator.onLine) return;

    const logsToSend = [...this.logQueue];
    this.logQueue = [];

    // Use sendBeacon for reliability
    const logsData = JSON.stringify({ logs: logsToSend });

    if (navigator.sendBeacon) {
      const blob = new Blob([logsData], { type: "application/json" });
      const sent = navigator.sendBeacon(`${this.baseUrl}/logs`, blob);
      if (!sent) {
        // sendBeacon failed — re-queue logs
        this.logQueue.unshift(...logsToSend);
      }
    } else {
      fetch(`${this.baseUrl}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: logsData,
        keepalive: true,
      }).catch(() => {
        // Re-queue logs on failure so they can be retried
        this.logQueue.unshift(...logsToSend);
      });
    }
  }

  /**
   * Start periodic flush of logs
   */
  _startBatchTimer() {
    setInterval(() => {
      this._flushLogs();
    }, this.batchInterval);

    // Also flush on page unload
    window.addEventListener("beforeunload", () => {
      this._flushLogs();
    });

    // Retry flushing queued logs when internet is restored
    window.addEventListener("online", () => {
      this._flushLogs();
    });
  }

  /**
   * Log authentication events (always logged)
   */
  auth(status, action, details = {}) {
    const logEntry = this._formatLog("info", `AUTH_${action.toUpperCase()}`, {
      category: "authentication",
      status,
      ...details,
    });
    this._queueLog(logEntry);
  }

  /**
   * Log API requests (selective - only errors)
   */
  api(method, endpoint, status, details = {}) {
    // Only log errors or slow responses
    const isError = status >= 400;
    if (isError) {
      const logEntry = this._formatLog("warn", `API_${method.toUpperCase()}`, {
        category: "api",
        method,
        endpoint,
        status,
        responseTime: details.responseTime || null,
        ...details,
      });
      this._queueLog(logEntry);
    }
  }

  /**
   * Log errors and exceptions (always logged)
   */
  error(action, error, details = {}) {
    const errorMessage = error?.message || String(error);
    const logEntry = this._formatLog("error", `ERROR_${action.toUpperCase()}`, {
      category: "error",
      errorMessage,
      ...details,
    });
    this._queueLog(logEntry);
  }

  /**
   * Log critical user actions (selective - only failures and important events)
   */
  action(actionName, result = "success", details = {}) {
    // Only log failures and important events (COMPLETE, START)
    if (
      result !== "success" ||
      actionName.includes("COMPLETE") ||
      actionName.includes("START")
    ) {
      const logEntry = this._formatLog(
        result === "success" ? "info" : "warn",
        `ACTION_${actionName.toUpperCase()}`,
        {
          category: "user_action",
          result,
          ...details,
        },
      );
      this._queueLog(logEntry);
    }
  }

  /**
   * Log debug information (only in debug mode)
   */
  debug(action, details = {}) {
    if (this._shouldLog("debug")) {
      const logEntry = this._formatLog(
        "debug",
        `DEBUG_${action.toUpperCase()}`,
        {
          category: "debug",
          ...details,
        },
      );
      this._queueLog(logEntry);
    }
  }

  /**
   * Force flush all queued logs immediately
   */
  flush() {
    this._flushLogs();
  }
}

// Create singleton instance
const loggerApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://shifter-i49i.onrender.com" : "http://localhost:3001");
const frontendLogger = new FrontendLogger({
  baseUrl: loggerApiUrl,
  batchSize: 10,
  batchInterval: 30000, // 30 seconds
  logLevel: import.meta.env.VITE_LOG_LEVEL || "info",
});

export default frontendLogger;
