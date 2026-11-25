/**
 * Strategy Registry
 *
 * Maintains registered diagnostic strategies.
 * Separate from strategy selection to adhere to Single Responsibility Principle.
 */

export class StrategyRegistry {
  constructor() {
    this._strategies = new Map();
  }

  register(strategy) {
    if (!strategy || !strategy.id) {
      throw new Error("[StrategyRegistry] Strategy must have a non-empty id");
    }
    if (typeof strategy.evaluate !== "function") {
      throw new Error(`[StrategyRegistry] Strategy '${strategy.id}' must implement evaluate()`);
    }
    this._strategies.set(strategy.id, strategy);
  }

  get(id) {
    return this._strategies.get(id) || null;
  }

  getAll() {
    return Array.from(this._strategies.values());
  }

  has(id) {
    return this._strategies.has(id);
  }
}

export const strategyRegistry = new StrategyRegistry();
