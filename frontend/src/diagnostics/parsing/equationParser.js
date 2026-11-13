/**
 * Equation Parser and Algebraic Transformation Verifier.
 *
 * Models:
 * - Mathematical Abstract Syntax Trees (LHS and RHS)
 * - Exact linear polynomial reduction: A*x = B
 * - Operation semantics & Inferred Student Intent
 * - Precise Error Taxonomy (SIGN_ERROR, ARITHMETIC_ERROR, OPERATION_ERROR, EQUALITY_ERROR)
 */

import { Fraction } from "./fractionParser.js";
import { parseExpression, linearizeExpression } from "./expressionParser.js";
import { normalizeMathText } from "./textNormalizer.js";
import { DiagnosticErrorType } from "../engine/diagnosticTypes.js";

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
 * Evaluates:
 * - Mathematical equivalence
 * - Inferred student intent (what was the student trying to isolate?)
 * - Actual operation applied to LHS vs RHS
 * - Specific error category & subtype
 */
export function analyzeEquationTransition(eq1, eq2) {
  if (!eq1 || !eq2) {
    return {
      valid: false,
      errorType: DiagnosticErrorType.UNKNOWN,
      explanation: "Invalid equation step structure.",
    };
  }

  // 1. Equivalent transformation
  if (eq1.isEquivalentTo(eq2)) {
    // Determine what operation was executed
    const c1 = eq1.lhsLinear.b;
    const c2 = eq2.lhsLinear.b;
    const a1 = eq1.lhsLinear.a;
    const a2 = eq2.lhsLinear.a;

    let opDescription = "Mathematically equivalent transformation";
    let operation = { type: "IDENTITY", target: "both_sides" };

    if (c1.n !== 0 && c2.n === 0 && a1.equals(a2)) {
      const verb = c1.n > 0 ? "SUBTRACT" : "ADD";
      const amt = Math.abs(c1.toNumber());
      operation = { type: verb, amount: amt, target: "both_sides" };
      opDescription = `Applied inverse operation: ${verb.toLowerCase()}ed ${amt} symmetrically to both sides.`;
    } else if (c1.n === 0 && c2.n === 0 && a1.n !== 1 && a2.n === 1) {
      operation = { type: "DIVIDE", amount: a1.toString(), target: "both_sides" };
      opDescription = `Divided both sides by coefficient ${a1.toString()} to isolate ${eq1.varName}.`;
    }

    return {
      valid: true,
      operation,
      inferredIntent: operation,
      explanation: opDescription,
    };
  }

  const c1 = eq1.lhsLinear.b;
  const d1 = eq1.rhsLinear.b;
  const d2 = eq2.rhsLinear.b;
  const a1 = eq1.lhsLinear.a;
  const a2 = eq2.lhsLinear.a;

  // 2. Case: Isolating constant term (ax + c1 = d1 -> ax = d2)
  if (a1.equals(a2) && eq2.lhsLinear.b.n === 0 && c1.n !== 0) {
    const correctRHS = d1.sub(c1);
    const signReversedRHS = d1.add(c1);
    const absC = Math.abs(c1.toNumber());
    const correctVerb = c1.n > 0 ? "subtract" : "add";
    const wrongVerb = c1.n > 0 ? "added" : "subtracted";

    const inferredIntent = {
      operation: correctVerb.toUpperCase(),
      amount: absC,
      target: "BOTH_SIDES",
      goal: `isolate_${a1.toString()}${eq1.varName}`,
    };

    // Subcase 2A: Sign reversal on RHS
    if (d2.equals(signReversedRHS)) {
      return {
        valid: false,
        errorType: "SIGN_REVERSAL_IN_ISOLATION",
        category: DiagnosticErrorType.SIGN_ERROR,
        subtype: "SIGN_REVERSAL_IN_ISOLATION",
        inferredIntent,
        actualOperation: {
          lhs: `${correctVerb.toUpperCase()}_${absC}`,
          rhs: `${c1.n > 0 ? "ADD" : "SUBTRACT"}_${absC}`,
        },
        expectedOperation: {
          type: correctVerb.toUpperCase(),
          amount: absC,
          target: "BOTH_SIDES",
        },
        explanation: `You ${wrongVerb} ${absC} instead of subtracting it. To isolate ${a1.toString()}${eq1.varName}, subtract ${absC} from both sides.`,
        expected: `${a1.toString()}${eq1.varName} = ${correctRHS.toString()}`,
        studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
      };
    }

    // Subcase 2B: Asymmetric operation (removed c1 from LHS, but forgot RHS)
    if (d2.equals(d1)) {
      return {
        valid: false,
        errorType: "ASYMMETRIC_OPERATION",
        category: DiagnosticErrorType.EQUALITY_ERROR,
        subtype: "ASYMMETRIC_OPERATION",
        inferredIntent,
        actualOperation: {
          lhs: `${correctVerb.toUpperCase()}_${absC}`,
          rhs: "NO_OPERATION",
        },
        explanation: `You eliminated ${c1.toString()} from the left-hand side, but did not apply the operation to the right-hand side. Both sides must receive the same operation.`,
        expected: `${a1.toString()}${eq1.varName} = ${correctRHS.toString()}`,
        studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
      };
    }

    // Subcase 2C: Correct procedure, but arithmetic mistake in RHS calculation
    return {
      valid: false,
      errorType: "ARITHMETIC_ERROR",
      category: DiagnosticErrorType.ARITHMETIC_ERROR,
      subtype: "SUBTRACTION_ARITHMETIC_SLIP",
      inferredIntent,
      actualOperation: {
        lhs: `${correctVerb.toUpperCase()}_${absC}`,
        rhs: `ARITHMETIC_SLIP (${d1.toString()} ${c1.n > 0 ? "-" : "+"} ${absC} ≠ ${d2.toString()})`,
      },
      explanation: `You chose the correct operation (${correctVerb} ${absC}), but made an arithmetic calculation slip on the right side: ${d1.toString()} ${c1.n > 0 ? "-" : "+"} ${absC} = ${correctRHS.toString()}, not ${d2.toString()}.`,
      expected: `${a1.toString()}${eq1.varName} = ${correctRHS.toString()}`,
      studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
    };
  }

  // 3. Case: Isolating variable from coefficient (ax = b -> x = b - a)
  if (c1.n === 0 && a2.n === 1 && a1.n !== 1) {
    const coeff = a1;
    const rhsPrev = d1;
    const subCoeff = rhsPrev.sub(coeff);
    const correctSol = rhsPrev.div(coeff);

    const inferredIntent = {
      operation: "DIVIDE",
      amount: coeff.toString(),
      target: "BOTH_SIDES",
      goal: `isolate_${eq1.varName}`,
    };

    if (d2.equals(subCoeff)) {
      return {
        valid: false,
        errorType: "SUBTRACTED_COEFFICIENT",
        category: DiagnosticErrorType.OPERATION_ERROR,
        subtype: "SUBTRACTED_COEFFICIENT_INSTEAD_OF_DIVIDING",
        inferredIntent,
        actualOperation: {
          lhs: "DIVIDED_BY_COEFFICIENT",
          rhs: `SUBTRACTED_${coeff.toString()}`,
        },
        explanation: `You subtracted the coefficient ${coeff.toString()} instead of dividing by it. To isolate ${eq1.varName}, divide both sides by ${coeff.toString()}.`,
        expected: `${eq1.varName} = ${correctSol.toString()}`,
        studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
      };
    }

    // Arithmetic division slip
    return {
      valid: false,
      errorType: "ARITHMETIC_ERROR",
      category: DiagnosticErrorType.ARITHMETIC_ERROR,
      subtype: "DIVISION_ARITHMETIC_SLIP",
      inferredIntent,
      actualOperation: {
        lhs: "DIVIDED_BY_COEFFICIENT",
        rhs: `ARITHMETIC_SLIP (${rhsPrev.toString()} ÷ ${coeff.toString()} ≠ ${d2.toString()})`,
      },
      explanation: `You correctly divided to isolate ${eq1.varName}, but made an arithmetic division slip: ${rhsPrev.toString()} ÷ ${coeff.toString()} = ${correctSol.toString()}, not ${d2.toString()}.`,
      expected: `${eq1.varName} = ${correctSol.toString()}`,
      studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
    };
  }

  return {
    valid: false,
    errorType: "INVALID_TRANSFORMATION",
    category: DiagnosticErrorType.UNJUSTIFIED_TRANSFORMATION,
    subtype: "UNCLASSIFIED_TRANSFORMATION",
    explanation: `The transition from "${eq1.lhsRaw} = ${eq1.rhsRaw}" to "${eq2.lhsRaw} = ${eq2.rhsRaw}" is mathematically unjustified.`,
    expected: null,
    studentStep: `${eq2.lhsRaw} = ${eq2.rhsRaw}`,
  };
}
