/**
 * Equation Parser and Algebraic Transformation Verifier.
 */

import { Fraction } from "./fractionParser.js";
import { parseExpression, linearizeExpression } from "./expressionParser.js";
import { normalizeMathText } from "./textNormalizer.js";

export class ParsedEquation {
  constructor(lhsRaw, rhsRaw, varName = "x") {
    this.lhsRaw = lhsRaw;
    this.rhsRaw = rhsRaw;
    this.varName = varName;

    this.lhsAST = parseExpression(lhsRaw);
    this.rhsAST = parseExpression(rhsRaw);

    this.lhsLinear = linearizeExpression(this.lhsAST, varName);
    this.rhsLinear = linearizeExpression(this.rhsAST, varName);

    // Standard form: A * x = B where A = (lhs.a - rhs.a), B = (rhs.b - lhs.b)
    this.A = this.lhsLinear.a.sub(this.rhsLinear.a);
    this.B = this.rhsLinear.b.sub(this.lhsLinear.b);
  }

  getSolution() {
    if (this.A.n === 0) {
      if (this.B.n === 0) return "ALL_REAL";
      return "NO_SOLUTION";
    }
    return this.B.div(this.A);
  }

  isEquivalentTo(other) {
    if (!(other instanceof ParsedEquation)) return false;
    // Two equations are equivalent if their solutions match (for linear non-degenerate)
    const sol1 = this.getSolution();
    const sol2 = other.getSolution();
    if (sol1 instanceof Fraction && sol2 instanceof Fraction) {
      return sol1.equals(sol2);
    }
    return sol1 === sol2;
  }
}

export function parseEquation(line, varName = "x") {
  if (!line || typeof line !== "string") return null;
  const normalized = normalizeMathText(line);
  const parts = normalized.split("=");
  if (parts.length !== 2) return null;

  try {
    return new ParsedEquation(parts[0].trim(), parts[1].trim(), varName);
  } catch {
    return null;
  }
}

/**
 * Analyzes the transition from eq1 to eq2:
 * e.g., eq1: "3x + 5 = 20", eq2: "3x = 25"
 * Returns analysis of the transition:
 * - valid: boolean
 * - operation: "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE" | "UNKNOWN"
 * - expectedRHS: string
 * - actualRHS: string
 * - errorType: "SIGN_REVERSAL_IN_ISOLATION" | ...
 * - explanation: string
 */
export function analyzeEquationTransition(eq1, eq2) {
  if (!eq1 || !eq2) {
    return { valid: false, explanation: "Invalid equation step" };
  }

  // Check if they are equivalent equations
  if (eq1.isEquivalentTo(eq2)) {
    return { valid: true, explanation: "Mathematically equivalent transformation" };
  }

  // Check isolating constant error: ax + c1 = d1 -> ax = d2
  // If lhs constant was c1, isolating requires subtracting c1 from RHS: d1 - c1
  const c1 = eq1.lhsLinear.b;
  const d1 = eq1.rhsLinear.b;
  const d2 = eq2.rhsLinear.b;

  // Student kept ax on LHS
  if (
    eq1.lhsLinear.a.equals(eq2.lhsLinear.a) &&
    eq2.lhsLinear.b.n === 0 &&
    c1.n !== 0
  ) {
    const correctRHS = d1.sub(c1);
    const signReversedRHS = d1.add(c1);

    if (d2.equals(signReversedRHS)) {
      const verb = c1.n > 0 ? "added" : "subtracted";
      const correctVerb = c1.n > 0 ? "subtract" : "add";
      const absC = Math.abs(c1.toNumber());

      return {
        valid: false,
        errorType: "SIGN_REVERSAL_IN_ISOLATION",
        operation: verb.toUpperCase(),
        explanation: `You ${verb} ${absC} instead of ${c1.n > 0 ? "subtracting" : "adding"} it. To isolate the variable term, ${correctVerb} ${absC} from both sides.`,
        expected: `${eq1.lhsLinear.a.toString()}${eq1.varName} = ${correctRHS.toString()}`,
        studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
      };
    }
  }

  // Check isolating variable from ax = b -> x = b - a (subtracting coefficient instead of dividing)
  if (
    eq1.lhsLinear.b.n === 0 &&
    eq2.lhsLinear.a.n === 1 &&
    eq1.lhsLinear.a.n !== 1
  ) {
    const coeff = eq1.lhsLinear.a;
    const rhsPrev = eq1.rhsLinear.b;
    const subCoeff = rhsPrev.sub(coeff);

    if (d2.equals(subCoeff)) {
      return {
        valid: false,
        errorType: "SUBTRACTED_COEFFICIENT",
        explanation: `You subtracted the coefficient ${coeff.toString()} instead of dividing by it. To isolate ${eq1.varName}, divide both sides by ${coeff.toString()}.`,
        expected: `${eq1.varName} = ${rhsPrev.div(coeff).toString()}`,
        studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
      };
    }
  }

  return {
    valid: false,
    errorType: "INVALID_TRANSFORMATION",
    explanation: `The transition from "${eq1.lhsRaw} = ${eq1.rhsRaw}" to "${eq2.lhsRaw} = ${eq2.rhsRaw}" is mathematically incorrect.`,
    expected: null,
    studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
  };
}
