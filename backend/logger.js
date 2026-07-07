const fs = require("fs");
const path = require("path");

/**
 * Structured Logger Module
 * Production-grade logging with:
 * - Log levels (ERROR, WARN, INFO, DEBUG)
 * - Request tracing (requestId, userId, sessionId)
 * - Reduced noise (selective logging)
 * - Safe non-blocking async I/O
 */

// Log level hierarchy
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

class Logger {
  constructor(options = {}) {
    this.logFile = options.logFile || null;
    this.logLevelName = (options.logLevel || "info").toLowerCase();
    this.logLevelValue = LOG_LEVELS[this.logLevelName] || LOG_LEVELS.info;
    this.includeConsole = options.includeConsole !== false;
    this.userId = null;
    this.requestId = null;
    this.sessionId = null;

    // Ensure log directory exists if logging to file
    if (this.logFile) {
      const logDir = path.dirname(this.logFile);
      try {
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
      } catch (err) {
        console.error("Failed to create logs directory:", err.message);
      }
    }
  }

  /**
   * Set the current request context
   */
  setContext(userId, requestId, sessionId) {
    this.userId = userId || null;
    this.requestId = requestId || null;
    this.sessionId = sessionId || null;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setRequestId(requestId) {
    this.requestId = requestId;
  }

  /**
   * Check if a log level should be logged
   */
  _shouldLog(level) {
    const levelValue = LOG_LEVELS[level] || LOG_LEVELS.info;
    return levelValue <= this.logLevelValue;
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
      ...(this.sessionId && { sessionId: this.sessionId }),
      ...details,
    };
    return logEntry;
  }

  /**
   * Write log to file and/or console (non-blocking)
   */
  _output(logEntry) {
    // Skip if log level not enabled
    if (!this._shouldLog(logEntry.level)) {
      return;
    }

    const jsonStr = JSON.stringify(logEntry) + "\n";

    try {
      if (this.includeConsole) {
        // Only show ERROR and WARN in console by default
        if (logEntry.level === "error" || logEntry.level === "warn") {
          const colors = {
            error: "\x1b[31m", // Red
            warn: "\x1b[33m", // Yellow
            info: "\x1b[36m", // Cyan
            debug: "\x1b[35m", // Magenta
          };
          const reset = "\x1b[0m";
          const color = colors[logEntry.level] || "";
          console.log(
            `${color}[${logEntry.level.toUpperCase()}]${reset}`,
            logEntry,
          );
        }
      }
    } catch (consoleErr) {
      // Fail silently if console logging fails
    }

    // Write to file asynchronously (non-blocking)
    if (this.logFile) {
      fs.appendFile(this.logFile, jsonStr, (err) => {
        if (err) {
          // Fail silently - don't crash the server
        }
      });
    }
  }

  /**
   * Log authentication events (always logged)
   */
  auth(status, action, details = {}) {
    try {
      const logEntry = this._formatLog("info", `AUTH_${action.toUpperCase()}`, {
        category: "authentication",
        status, // success, failed, error
        ...details,
      });
      this._output(logEntry);
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Log API requests (selective - only errors and slow requests)
   */
  api(method, endpoint, status, details = {}) {
    try {
      // Only log errors or slow requests (>500ms)
      const isError = status >= 400;
      const isSlow = (details.responseTime || 0) > 500;
      const isHealthCheck = endpoint === "/health" || endpoint === "/api/ping";

      if (isError || isSlow || !isHealthCheck) {
        const logEntry = this._formatLog(
          "info",
          `API_${method.toUpperCase()}`,
          {
            category: "api",
            method,
            endpoint,
            status,
            responseTime: details.responseTime || null,
            ...(isError && { level: "warn" }),
            ...details,
          },
        );
        // Change level to warn if error
        if (isError) {
          logEntry.level = "warn";
        }
        this._output(logEntry);
      }
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Log database queries (selective - only errors)
   */
  db(operation, table, status, details = {}) {
    try {
      // Only log errors
      if (status === "error") {
        const logEntry = this._formatLog(
          "warn",
          `DB_${operation.toUpperCase()}`,
          {
            category: "database",
            operation,
            table,
            status,
            ...details,
          },
        );
        this._output(logEntry);
      }
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Log errors and exceptions (always logged)
   */
  error(action, error, details = {}) {
    try {
      const logEntry = this._formatLog(
        "error",
        `ERROR_${action.toUpperCase()}`,
        {
          category: "error",
          errorMessage: error?.message || String(error),
          ...(error?.stack && { errorStack: error.stack }),
          ...details,
        },
      );
      this._output(logEntry);
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Log critical user actions (selective)
   */
  action(actionName, result = "success", details = {}) {
    try {
      // Only log failures and important actions
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
        this._output(logEntry);
      }
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Log debug information (only in debug mode)
   */
  debug(action, details = {}) {
    try {
      if (this._shouldLog("debug")) {
        const logEntry = this._formatLog(
          "debug",
          `DEBUG_${action.toUpperCase()}`,
          {
            category: "debug",
            ...details,
          },
        );
        this._output(logEntry);
      }
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Create middleware for Express to log requests and add tracing
   */
  middleware() {
    const logger = this;
    return (req, res, next) => {
      const startTime = Date.now();
      const method = req.method;
      const endpoint = req.path;

      // Generate requestId for tracing
      const requestId =
        req.headers["x-request-id"] || this._generateRequestId();
      const userId = req.user?.id || null;
      const sessionId = req.headers["x-session-id"] || null;

      // Set context for this request
      logger.setContext(userId, requestId, sessionId);
      req.requestId = requestId;

      // Capture the original send function
      const originalSend = res.send;
      res.send = function (data) {
        try {
          const responseTime = Date.now() - startTime;
          const statusCode = res.statusCode;

          logger.api(method, endpoint, statusCode, {
            responseTime,
          });
        } catch (err) {
          // Fail silently if logging fails - don't crash the response
        }

        return originalSend.call(res, data);
      };

      next();
    };
  }

  /**
   * Generate a simple request ID for tracing
   */
  _generateRequestId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Create singleton instance
const logFilePath =
  process.env.LOG_FILE || path.join(__dirname, "logs", "app.log");
const logger = new Logger({
  logFile: logFilePath,
  logLevel: process.env.LOG_LEVEL || "warn",
  includeConsole: process.env.LOG_CONSOLE !== "false",
});

module.exports = logger;
