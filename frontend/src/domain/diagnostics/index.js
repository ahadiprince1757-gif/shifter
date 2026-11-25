/**
 * Domain Diagnostics Module
 *
 * Registers core diagnostic strategies and exports the DiagnosticEngine.
 */

import { strategyRegistry } from "./engine/StrategyRegistry.js";
import { ArithmeticReductionStrategy } from "./strategies/ArithmeticReductionStrategy.js";
import { AlgebraicEquationStrategy } from "./strategies/AlgebraicEquationStrategy.js";
import { NumberClassificationStrategy } from "./strategies/NumberClassificationStrategy.js";
import { DiagnosticEngine, diagnosticEngine } from "./engine/DiagnosticEngine.js";

// Register default strategies
strategyRegistry.register(new ArithmeticReductionStrategy());
strategyRegistry.register(new AlgebraicEquationStrategy());
strategyRegistry.register(new NumberClassificationStrategy());

export {
  strategyRegistry,
  DiagnosticEngine,
  diagnosticEngine,
  ArithmeticReductionStrategy,
  AlgebraicEquationStrategy,
  NumberClassificationStrategy,
};
