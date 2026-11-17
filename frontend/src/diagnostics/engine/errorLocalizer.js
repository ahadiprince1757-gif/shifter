/**
 * TIXAR LAYER 3: ERROR LOCALIZER
 *
 * Traverses the Hierarchical Reasoning Taxonomy to identify the
 * FIRST verified point where student reasoning diverged from expected.
 *
 * Epistemic rule:
 * If evidence does not isolate a specific divergence, report UNKNOWN/INCONCLUSIVE.
 * Never invent a divergence category.
 */

import { ReasoningLocation, OperationType } from "../contracts/evidenceContract.js";

/**
 * Localizes the first point of divergence.
 *
 * @param {object} evidence - Extracted student evidence
 * @param {object} expected - Expected solution model { answer, unit, operation, inputs, relation }
 * @returns {object} { location, expectedOperation, observedOperation, detail, confidence }
 */
export function localizeErrorDivergence(evidence, expected = {}) {
  const expectedOp = (expected.operation || "").toUpperCase();
  const observedOp = (evidence.observedOperation || "").toUpperCase();

  const expAnswer = expected.answer !== null && expected.answer !== undefined
    ? parseFloat(expected.answer)
    : null;
  const obsResult = evidence.observedResult !== null && evidence.observedResult !== undefined
    ? parseFloat(evidence.observedResult)
    : null;

  // 1. Check if submission is correct
  if (expAnswer !== null && obsResult !== null && Math.abs(expAnswer - obsResult) < 0.001) {
    // Check unit divergence
    if (expected.unit && evidence.observedUnit && expected.unit.toLowerCase() !== evidence.observedUnit.toLowerCase()) {
      return {
        location: ReasoningLocation.UNITS,
        expectedUnit: expected.unit,
        observedUnit: evidence.observedUnit,
        detail: `Calculation correct (${obsResult}), but unit is '${evidence.observedUnit}' instead of '${expected.unit}'.`,
        confidence: 0.95,
      };
    }

    return null; // No error!
  }

  // 2. Check Relationship / Formula / Operation Inversion:
  // e.g. Expected DIVISION, Observed MULTIPLICATION
  if (
    (expectedOp === "DIVISION" || expectedOp === "DIVIDE" || expectedOp === "/") &&
    (observedOp === "MULTIPLICATION" || observedOp === "MULTIPLY" || observedOp === "*")
  ) {
    return {
      location: ReasoningLocation.RELATIONSHIP_SELECTION,
      expectedOperation: OperationType.DIVISION,
      observedOperation: OperationType.MULTIPLICATION,
      detail: "Student multiplied quantities where division was required by the governing relationship.",
      confidence: 0.94,
    };
  }

  // Inverse: Expected MULTIPLICATION, Observed DIVISION
  if (
    (expectedOp === "MULTIPLICATION" || expectedOp === "MULTIPLY" || expectedOp === "*") &&
    (observedOp === "DIVISION" || observedOp === "DIVIDE" || observedOp === "/")
  ) {
    return {
      location: ReasoningLocation.RELATIONSHIP_SELECTION,
      expectedOperation: OperationType.MULTIPLICATION,
      observedOperation: OperationType.DIVISION,
      detail: "Student divided quantities where multiplication was required by the governing relationship.",
      confidence: 0.94,
    };
  }

  // 3. Variable Identification / Inversion (e.g. 3 / 180 instead of 180 / 3)
  if (
    (expectedOp === "DIVISION" || expectedOp === "DIVIDE" || expectedOp === "/") &&
    observedOp === OperationType.DIVISION &&
    Array.isArray(expected.inputs) && expected.inputs.length >= 2 &&
    Array.isArray(evidence.observedInputs) && evidence.observedInputs.length >= 2
  ) {
    if (
      Math.abs(evidence.observedInputs[0] - expected.inputs[1]) < 0.01 &&
      Math.abs(evidence.observedInputs[1] - expected.inputs[0]) < 0.01
    ) {
      return {
        location: ReasoningLocation.VARIABLE_IDENTIFICATION,
        expectedInputs: expected.inputs,
        observedInputs: evidence.observedInputs,
        detail: `Inverted denominator and numerator: calculated ${evidence.observedInputs[0]}/${evidence.observedInputs[1]} instead of ${expected.inputs[0]}/${expected.inputs[1]}.`,
        confidence: 0.95,
      };
    }
  }

  // Helper: canonical operation matching (handles "divide" vs "DIVISION" vs "/")
  function opsMatch(a, b) {
    const divAlias = ["DIVISION", "DIVIDE", "/"];
    const mulAlias = ["MULTIPLICATION", "MULTIPLY", "*"];
    const addAlias = ["ADDITION", "ADD", "+"];
    const subAlias = ["SUBTRACTION", "SUBTRACT", "-"];
    const normalize = (op) => {
      const u = (op || "").toUpperCase();
      if (divAlias.includes(u)) return "DIV";
      if (mulAlias.includes(u)) return "MUL";
      if (addAlias.includes(u)) return "ADD";
      if (subAlias.includes(u)) return "SUB";
      return u;
    };
    return normalize(a) === normalize(b);
  }

  // 4. Arithmetic Divergence (Correct formula & inputs, but arithmetic error)
  if (
    opsMatch(observedOp, expectedOp) &&
    Array.isArray(expected.inputs) && expected.inputs.length >= 2 &&
    Array.isArray(evidence.observedInputs) && evidence.observedInputs.length >= 2 &&
    Math.abs(evidence.observedInputs[0] - expected.inputs[0]) < 0.01 &&
    Math.abs(evidence.observedInputs[1] - expected.inputs[1]) < 0.01 &&
    obsResult !== null && expAnswer !== null &&
    Math.abs(obsResult - expAnswer) > 0.001
  ) {
    return {
      location: ReasoningLocation.ARITHMETIC,
      expectedValue: expAnswer,
      observedValue: obsResult,
      detail: `Correct formula and inputs (${expected.inputs.join(", ")}), but calculation yielded ${obsResult} instead of ${expAnswer}.`,
      confidence: 0.96,
    };
  }

  // 5. Inconclusive: Student gave an unverified number with no discernible step
  if (evidence.isBareAnswer && observedOp === OperationType.UNKNOWN) {
    return {
      location: ReasoningLocation.UNKNOWN,
      expectedValue: expAnswer,
      observedValue: obsResult,
      detail: "Result differs from expected, but reasoning steps cannot be conclusively verified from submitted number alone.",
      confidence: 0.25, // Low cause confidence -> triggers Diagnostic Probe!
      needsProbe: true,
    };
  }

  // General fallback
  return {
    location: ReasoningLocation.UNKNOWN,
    expectedValue: expAnswer,
    observedValue: obsResult,
    detail: "Divergence detected, but specific cognitive path remains ambiguous.",
    confidence: 0.35,
    needsProbe: true,
  };
}
