/**
 * Classified Circuit Breaker
 *
 * Implements resilient fault isolation for external network sync.
 *
 * Rules (Architecture Specification v2.1):
 * 1. Trips ONLY on network loss, timeouts, or 5xx server errors.
 * 2. Never trips on client/business errors (401, 403, 404, 422).
 * 3. Enforces single-probe concurrency lock in HALF-OPEN state.
 */

export const CIRCUIT_STATE = Object.freeze({
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
});

export class ClassifiedCircuitBreaker {
  constructor({
    failureThreshold = 3,
    resetTimeoutMs = 15000,
  } = {}) {
    this.failureThreshold = failureThreshold;
    this.resetTimeoutMs = resetTimeoutMs;
    this.state = CIRCUIT_STATE.CLOSED;
    this.consecutiveFailures = 0;
    this.nextAttemptAt = 0;
    this._probing = false;
  }

  /**
   * Determines whether an error qualifies to trip the circuit.
   */
  isTrippingError(error) {
    if (!error) return false;

    // HTTP Status classification
    const status = error.status || error.statusCode || error.response?.status;
    if (status) {
      // 4xx errors (client/auth/validation) do NOT trip the circuit breaker
      if (status >= 400 && status < 500) {
        return false;
      }
      // 5xx errors (server faults) DO trip the circuit breaker
      if (status >= 500) {
        return true;
      }
    }

    // Network / timeout / DNS failure messages
    const msg = String(error.message || error).toLowerCase();
    if (
      msg.includes("network") ||
      msg.includes("failed to fetch") ||
      msg.includes("timeout") ||
      msg.includes("abort") ||
      msg.includes("offline") ||
      msg.includes("econnrefused") ||
      msg.includes("enotfound")
    ) {
      return true;
    }

    return false;
  }

  /**
   * Checks whether an execution can be attempted.
   */
  canAttempt() {
    const now = Date.now();

    if (this.state === CIRCUIT_STATE.CLOSED) {
      return true;
    }

    if (this.state === CIRCUIT_STATE.OPEN) {
      if (now >= this.nextAttemptAt) {
        this.state = CIRCUIT_STATE.HALF_OPEN;
        this._probing = false;
      } else {
        return false;
      }
    }

    if (this.state === CIRCUIT_STATE.HALF_OPEN) {
      // Strict single-probe concurrency lock
      if (this._probing) {
        return false;
      }
      this._probing = true;
      return true;
    }

    return false;
  }

  /**
   * Records a successful execution.
   */
  recordSuccess() {
    this.consecutiveFailures = 0;
    this.state = CIRCUIT_STATE.CLOSED;
    this._probing = false;
  }

  /**
   * Records a failed execution.
   */
  recordFailure(error) {
    this._probing = false;

    if (!this.isTrippingError(error)) {
      // Do not count non-tripping (client/auth) errors towards circuit trip
      return;
    }

    this.consecutiveFailures++;

    if (this.state === CIRCUIT_STATE.HALF_OPEN || this.consecutiveFailures >= this.failureThreshold) {
      this.state = CIRCUIT_STATE.OPEN;
      this.nextAttemptAt = Date.now() + this.resetTimeoutMs;
    }
  }

  reset() {
    this.state = CIRCUIT_STATE.CLOSED;
    this.consecutiveFailures = 0;
    this.nextAttemptAt = 0;
    this._probing = false;
  }
}

export const circuitBreaker = new ClassifiedCircuitBreaker();
