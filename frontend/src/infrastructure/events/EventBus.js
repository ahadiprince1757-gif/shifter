/**
 * Secondary Event Bus
 *
 * For non-critical side effects (telemetry, UI notifications, analytics).
 * Critical educational workflows are driven synchronously by Application Use Cases,
 * never by asynchronous event bus orchestration.
 */

export class EventBus {
  constructor() {
    this._listeners = new Map();
  }

  /**
   * Subscribes a listener to an event topic.
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {Function} Unsubscribe function
   */
  subscribe(eventName, callback) {
    if (!this._listeners.has(eventName)) {
      this._listeners.set(eventName, new Set());
    }
    this._listeners.get(eventName).add(callback);

    return () => {
      const set = this._listeners.get(eventName);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this._listeners.delete(eventName);
        }
      }
    };
  }

  /**
   * Publishes an event to all subscribers without blocking the caller.
   *
   * @param {string} eventName
   * @param {Object} payload
   */
  publish(eventName, payload = {}) {
    const set = this._listeners.get(eventName);
    if (!set || set.size === 0) return;

    // Dispatch asynchronously to guarantee zero interference with critical loop
    queueMicrotask(() => {
      for (const listener of set) {
        try {
          listener(payload);
        } catch (err) {
          console.warn(`[EventBus] Error in listener for '${eventName}':`, err);
        }
      }
    });
  }

  clear() {
    this._listeners.clear();
  }
}

export const eventBus = new EventBus();
