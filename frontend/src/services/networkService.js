class NetworkService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.listeners = new Set();

    window.addEventListener("online", this.handleOnline.bind(this));
    window.addEventListener("offline", this.handleOffline.bind(this));
  }

  handleOnline() {
    this.isOnline = true;
    this.notifyListeners(true);
  }

  handleOffline() {
    this.isOnline = false;
    this.notifyListeners(false);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(status) {
    this.listeners.forEach((cb) => cb(status));
  }

  /**
   * Helper to execute a function only if online, otherwise queue it or throw an error.
   */
  async executeIfOnline(fn, fallbackAction = null) {
    if (this.isOnline) {
      return await fn();
    } else {
      if (fallbackAction) {
        return await fallbackAction();
      }
      throw new Error("Network is offline. Action cannot be completed immediately.");
    }
  }
}

export const networkService = new NetworkService();
