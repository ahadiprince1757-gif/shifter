/**
 * TIXAR LAYER 1: EVIDENCE ENGINE
 *
 * Extracts empirical mathematical and conceptual evidence from student submissions:
 * - Numbers, units, operators, variables, expressions
 * - Explicit and inferred operations (e.g. 180 * 3 = 540 vs bare 540)
 * - Epistemic rule: downstreams CANNOT invent facts not present in this EvidenceObject.
 */

import { normalizeSubmission, extractCanonicalUnit } from "./normalizer.js";
import { OperationType, EvidenceProvenance } from "../contracts/evidenceContract.js";

/**
 * Extracts empirical evidence from a student submission.
 *
 * @param {string} rawAnswer - Raw student submission
 * @param {object} questionContext - Question text, knowns, expected values
 * @returns {object} evidence object
 */
export function extractSubmissionEvidence(rawAnswer, questionContext = {}) {
  const normalized = normalizeSubmission(rawAnswer);

  const evidence = {
    numbers: [],
    units: [],
    operators: [],
    expressions: [],
    variables: [],
    observedOperation: OperationType.UNKNOWN,
    operationProvenance: EvidenceProvenance.UNVERIFIED,
    observedInputs: [],
    inputsProvenance: EvidenceProvenance.UNVERIFIED,
    observedResult: null,
    resultProvenance: EvidenceProvenance.UNVERIFIED,
    observedUnit: null,
    claims: [],
    isBareAnswer: false,
  };

  if (!normalized) {
    return evidence;
  }

  // 1. Extract all numbers (including decimals and negatives)
  const numberMatches = normalized.match(/-?\b\d+(?:\.\d+)?\b/g);
  if (numberMatches) {
    evidence.numbers = numberMatches.map(Number);
  }

  // 2. Extract unit
  const detectedUnit = extractCanonicalUnit(normalized);
  if (detectedUnit) {
    evidence.units.push(detectedUnit);
    evidence.observedUnit = detectedUnit;
  }

  // 3. Extract operators
  const operatorMatches = normalized.match(/[+\-*/=^]/g);
  if (operatorMatches) {
    evidence.operators = [...new Set(operatorMatches)];
  }

  // 4. Extract explicit operations: e.g. "180 * 3 = 540" or "180 * 3"
  const explicitEqMatch = normalized.match(/(-?\d+(?:\.\d+)?)\s*([*\/+\-])\s*(-?\d+(?:\.\d+)?)\s*(?:=\s*(-?\d+(?:\.\d+)?))?/);
  if (explicitEqMatch) {
    const num1 = parseFloat(explicitEqMatch[1]);
    const opChar = explicitEqMatch[2];
    const num2 = parseFloat(explicitEqMatch[3]);
    const explicitResult = explicitEqMatch[4] ? parseFloat(explicitEqMatch[4]) : null;

    evidence.observedInputs = [num1, num2];
    evidence.expressions.push(`${num1} ${opChar} ${num2}`);

    // Student explicitly showed their working — all evidence is OBSERVED
    evidence.operationProvenance = EvidenceProvenance.OBSERVED;
    evidence.inputsProvenance = EvidenceProvenance.OBSERVED;

    switch (opChar) {
      case "*":
        evidence.observedOperation = OperationType.MULTIPLICATION;
        evidence.observedResult = explicitResult !== null ? explicitResult : num1 * num2;
        break;
      case "/":
        evidence.observedOperation = OperationType.DIVISION;
        evidence.observedResult = explicitResult !== null ? explicitResult : (num2 !== 0 ? num1 / num2 : null);
        break;
      case "+":
        evidence.observedOperation = OperationType.ADDITION;
        evidence.observedResult = explicitResult !== null ? explicitResult : num1 + num2;
        break;
      case "-":
        evidence.observedOperation = OperationType.SUBTRACTION;
        evidence.observedResult = explicitResult !== null ? explicitResult : num1 - num2;
        break;
    }
    // The result was explicitly stated by the student, or derived deterministically
    evidence.resultProvenance = explicitResult !== null
      ? EvidenceProvenance.OBSERVED
      : EvidenceProvenance.DERIVED;
  } else if (evidence.numbers.length === 1) {
    // Student submitted a single bare number: e.g. "540" or "540 km/h" or "40"
    evidence.isBareAnswer = true;
    evidence.observedResult = evidence.numbers[0];
    // The bare number itself was directly observed
    evidence.resultProvenance = EvidenceProvenance.OBSERVED;

    // Deductive Evidence Inference: Check against question knowns if available
    const qKnowns = Array.isArray(questionContext.expectedInputs) && questionContext.expectedInputs.length >= 2
      ? questionContext.expectedInputs
      : extractKnownsFromText(questionContext.text || questionContext.q || "");

    if (qKnowns.length >= 2) {
      const a = qKnowns[0];
      const b = qKnowns[1];
      const res = evidence.observedResult;

      const tolerance = 0.001;
      if (Math.abs(res - (a * b)) < tolerance) {
        evidence.observedOperation = OperationType.MULTIPLICATION;
        evidence.observedInputs = [a, b];
        evidence.expressions.push(`${a} * ${b} = ${res}`);
        // Operation and inputs are INFERRED — compatible match, not observed
        evidence.operationProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
        evidence.inputsProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
      } else if (Math.abs(res - (a / b)) < tolerance) {
        evidence.observedOperation = OperationType.DIVISION;
        evidence.observedInputs = [a, b];
        evidence.expressions.push(`${a} / ${b} = ${res}`);
        evidence.operationProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
        evidence.inputsProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
      } else if (Math.abs(res - (b / a)) < tolerance) {
        evidence.observedOperation = OperationType.DIVISION;
        evidence.observedInputs = [b, a];
        evidence.expressions.push(`${b} / ${a} = ${res}`);
        evidence.operationProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
        evidence.inputsProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
      } else if (Math.abs(res - (a + b)) < tolerance) {
        evidence.observedOperation = OperationType.ADDITION;
        evidence.observedInputs = [a, b];
        evidence.expressions.push(`${a} + ${b} = ${res}`);
        evidence.operationProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
        evidence.inputsProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
      } else if (Math.abs(res - Math.abs(a - b)) < tolerance) {
        evidence.observedOperation = OperationType.SUBTRACTION;
        evidence.observedInputs = [a, b];
        evidence.expressions.push(`${Math.max(a, b)} - ${Math.min(a, b)} = ${res}`);
        evidence.operationProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
        evidence.inputsProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
      }
      // If no match found, operation remains UNKNOWN with UNVERIFIED provenance
    }
  } else if (evidence.numbers.length > 1 && evidence.observedResult === null) {
    // If multiple numbers but no explicit operator, last number is often conclusion
    evidence.observedResult = evidence.numbers[evidence.numbers.length - 1];
  }

  return evidence;
}

/**
 * Extracts numbers from question text as candidate knowns.
 */
function extractKnownsFromText(text) {
  if (!text) return [];
  const normalized = normalizeSubmission(text);
  const matches = normalized.match(/\b\d+(?:\.\d+)?\b/g);
  return matches ? matches.map(Number) : [];
}
