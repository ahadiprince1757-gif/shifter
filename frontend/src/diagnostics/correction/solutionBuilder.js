/**
 * 10× Precision Correction and Solution Engine.
 *
 * Models structured mathematical transformations (proof of solution)
 * and targeted repairs rather than rigid single-path string arrays.
 * Preserves exact Fraction representations without float loss.
 */

import { Fraction } from "../parsing/fractionParser.js";
import { parseEquation } from "../parsing/equationParser.js";

export function buildLinearEquationSolution(equationStr, diagnosis = null) {
  const eq = parseEquation(equationStr);
  if (!eq) return null;

  const stringSteps = [];
  const structuredSteps = [];
  const v = eq.varName;

  // Step 1: Original equation
  const origExpr = `${eq.lhsRaw} = ${eq.rhsRaw}`;
  stringSteps.push(origExpr);
  structuredSteps.push({
    stepNumber: 1,
    expression: origExpr,
    operation: null,
    justification: "Original equation premise.",
  });

  const a = eq.lhsLinear.a;
  const b = eq.lhsLinear.b;
  const c = eq.rhsLinear.b;
  const aStr = a.isOne() ? "" : a.toString();

  // Step 2 & 3: Isolate linear term
  if (!b.isZero()) {
    const oppSign = b.isNegative() ? "+" : "-";
    const absB = b.abs();
    const newRHS = c.sub(b);

    const step2Expr = `${aStr}${v} = ${c.toString()} ${oppSign} ${absB.toString()}`;
    stringSteps.push(step2Expr);
    structuredSteps.push({
      stepNumber: 2,
      expression: step2Expr,
      operation: {
        type: b.isNegative() ? "ADD" : "SUBTRACT",
        value: absB.toString(),
        target: "BOTH_SIDES",
      },
      justification: `${b.isNegative() ? "Add" : "Subtract"} ${absB.toString()} on both sides to isolate ${aStr}${v}.`,
    });

    const step3Expr = `${aStr}${v} = ${newRHS.toString()}`;
    stringSteps.push(step3Expr);
    structuredSteps.push({
      stepNumber: 3,
      expression: step3Expr,
      operation: {
        type: "SIMPLIFY",
        target: "RHS",
      },
      justification: `Simplify the right-hand side to ${newRHS.toString()}.`,
    });

    // Step 4: Divide by coefficient if not 1
    if (!a.isOne()) {
      const finalSol = newRHS.div(a);
      const step4Expr = `${v} = ${newRHS.toString()} ÷ ${a.toString()}`;
      stringSteps.push(step4Expr);
      structuredSteps.push({
        stepNumber: 4,
        expression: step4Expr,
        operation: {
          type: "DIVIDE",
          value: a.toString(),
          target: "BOTH_SIDES",
        },
        justification: `Divide both sides by coefficient ${a.toString()} to isolate ${v}.`,
      });

      const step5Expr = `${v} = ${finalSol.toString()}`;
      stringSteps.push(step5Expr);
      structuredSteps.push({
        stepNumber: 5,
        expression: step5Expr,
        operation: {
          type: "EVALUATE",
          target: "RESULT",
        },
        justification: `Final solution for ${v}.`,
      });
    }
  } else {
    // b is 0, just divide by a if not 1
    if (!a.isOne()) {
      const finalSol = c.div(a);
      const step2Expr = `${v} = ${c.toString()} ÷ ${a.toString()}`;
      stringSteps.push(step2Expr);
      structuredSteps.push({
        stepNumber: 2,
        expression: step2Expr,
        operation: {
          type: "DIVIDE",
          value: a.toString(),
          target: "BOTH_SIDES",
        },
        justification: `Divide both sides by ${a.toString()} to isolate ${v}.`,
      });

      const step3Expr = `${v} = ${finalSol.toString()}`;
      stringSteps.push(step3Expr);
      structuredSteps.push({
        stepNumber: 3,
        expression: step3Expr,
        operation: {
          type: "EVALUATE",
          target: "RESULT",
        },
        justification: `Final solution for ${v}.`,
      });
    }
  }

  const solution = eq.getSolution();
  const verified = solution instanceof Fraction;
  const answerStr = solution instanceof Fraction ? solution.toString() : String(solution);

  return {
    originalEquation: origExpr,
    verified,
    solutionStr: answerStr,
    steps: stringSteps,
    structuredSteps,
    repair: diagnosis ? {
      failedSkill: diagnosis.errorType || "ISOLATE_LINEAR_TERM",
      operation: b.isNegative() ? "ADD_CONSTANT" : "SUBTRACT_CONSTANT",
      explanation: `${b.isNegative() ? "Add" : "Subtract"} ${b.abs().toString()} on both sides to keep the equation balanced.`,
    } : null,
    verification: {
      answer: answerStr,
      checked: verified,
    },
  };
}
