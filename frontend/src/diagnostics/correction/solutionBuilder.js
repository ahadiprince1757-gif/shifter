/**
 * Correction and Verification Engine.
 * Constructs mathematically verified solutions and formats the correct sequence of steps.
 */

import { Fraction } from "../parsing/fractionParser.js";
import { parseEquation } from "../parsing/equationParser.js";

export function buildLinearEquationSolution(equationStr) {
  const eq = parseEquation(equationStr);
  if (!eq) return null;

  const steps = [];
  const v = eq.varName;

  // Step 1: Original equation
  steps.push(`${eq.lhsRaw} = ${eq.rhsRaw}`);

  const a = eq.lhsLinear.a;
  const b = eq.lhsLinear.b;
  const c = eq.rhsLinear.b;

  // Step 2 & 3: Isolate linear term
  if (b.n !== 0) {
    const oppSign = b.n > 0 ? "-" : "+";
    const absB = Math.abs(b.toNumber());
    const newRHS = c.sub(b);

    steps.push(`${a.toString()}${v} = ${c.toString()} ${oppSign} ${absB}`);
    steps.push(`${a.toString()}${v} = ${newRHS.toString()}`);

    // Step 4: Divide by coefficient if not 1
    if (a.n !== 1) {
      const finalSol = newRHS.div(a);
      steps.push(`${v} = ${newRHS.toString()} ÷ ${a.toString()}`);
      steps.push(`${v} = ${finalSol.toString()}`);
    }
  } else {
    if (a.n !== 1) {
      const finalSol = c.div(a);
      steps.push(`${v} = ${c.toString()} ÷ ${a.toString()}`);
      steps.push(`${v} = ${finalSol.toString()}`);
    }
  }

  const solution = eq.getSolution();
  const verified = solution instanceof Fraction;

  return {
    verified,
    solutionStr: solution instanceof Fraction ? solution.toString() : String(solution),
    steps,
  };
}
