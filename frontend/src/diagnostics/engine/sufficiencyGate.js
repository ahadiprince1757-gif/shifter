/**
 * TIXAR EVIDENCE SUFFICIENCY GATE (PHASE 1.5)
 *
 * Epistemic Invariant:
 *   Inferred evidence CANNOT automatically produce HIGH causeConfidence.
 *   Only when the student explicitly showed their work (OBSERVED provenance)
 *   may causeConfidence reach its natural ceiling.
 *
 * Returns: { sufficiency, causeConfidenceCap, reason }
 */

import {
  EvidenceSufficiency,
  EvidenceProvenance,
  OperationType,
} from "../contracts/evidenceContract.js";

/**
 * Evaluates whether the available evidence is sufficient to support
 * a confident causal claim about WHY the student made an error.
 *
 * @param {object} evidence - The evidence object from evidenceEngine.js
 * @param {object} expected - The expected solution model { answer, unit, operation, inputs }
 * @returns {{ sufficiency: string, causeConfidenceCap: number, reason: string }}
 */
export function evaluateEvidenceSufficiency(evidence, expected = {}) {
  const opProvenance = evidence.operationProvenance || EvidenceProvenance.UNVERIFIED;
  const obsOp = evidence.observedOperation || OperationType.UNKNOWN;
  const isBare = Boolean(evidence.isBareAnswer);
  const hasExpressions = Array.isArray(evidence.expressions) && evidence.expressions.length > 0;
  const obsResult = evidence.observedResult;

  // ── Rule 1: Student explicitly showed working → SUFFICIENT ──────────────
  // Explicit operator written (e.g. "180 * 3 = 540" or "180 * 3")
  if (opProvenance === EvidenceProvenance.OBSERVED) {
    return {
      sufficiency: EvidenceSufficiency.SUFFICIENT,
      causeConfidenceCap: 1.0,
      reason: "Student explicitly wrote working; operation is directly observed.",
    };
  }

  // ── Rule 2: Bare answer, no matching operation found → INSUFFICIENT ──────
  if (isBare && obsOp === OperationType.UNKNOWN) {
    return {
      sufficiency: EvidenceSufficiency.INSUFFICIENT,
      causeConfidenceCap: 0.25,
      reason: "Bare answer submitted with no expressions; we cannot determine the operation the student used.",
    };
  }

  // ── Rule 3: Bare answer but operation inferred (mathematical match) ───────
  // The bare number happens to match a×b or a/b or similar.
  // This is compatible evidence, NOT proof of the operation used.
  if (isBare && opProvenance === EvidenceProvenance.INFERRED_FROM_MATCH) {
    // Check whether the question admits multiple plausible operations
    const expOp = (expected.operation || "").toUpperCase();
    const inputs = Array.isArray(expected.inputs) ? expected.inputs : [];

    // If this answer matches the CORRECT operation (e.g. bare 60 matches 180/3),
    // let verification handle it; sufficiency is not our concern for correct answers.
    // Only evaluate sufficiency for incorrect answers with inferred operation.
    const expAnswer = expected.answer !== null && expected.answer !== undefined
      ? parseFloat(expected.answer)
      : null;
    const isCorrect = expAnswer !== null && Math.abs(obsResult - expAnswer) < 0.001;

    if (isCorrect) {
      // Verification will mark CORRECT — sufficiency gates don't apply the same way
      return {
        sufficiency: EvidenceSufficiency.SUFFICIENT,
        causeConfidenceCap: 1.0,
        reason: "Answer matches expected; verification determines correctness.",
      };
    }

    // Wrong answer, operation inferred from match — could be coincidental
    // Question has multiple possible operations → competing hypotheses exist
    return {
      sufficiency: EvidenceSufficiency.BORDERLINE,
      causeConfidenceCap: 0.45,
      reason: "Operation inferred from mathematical match (not observed in writing). Answer is compatible with one operation, but student may have guessed, copied, or used a different path.",
    };
  }

  // ── Rule 4: Copied quantity (bare number is one of the question knowns) ──
  if (isBare && Array.isArray(expected.inputs) && expected.inputs.length > 0) {
    const isKnownCopy = expected.inputs.some(
      (k) => obsResult !== null && Math.abs(obsResult - k) < 0.001
    );
    if (isKnownCopy) {
      return {
        sufficiency: EvidenceSufficiency.INSUFFICIENT,
        causeConfidenceCap: 0.30,
        reason: "Student's answer equals one of the question's given knowns — possible copied quantity, not computed.",
      };
    }
  }

  // ── Rule 5: Explicit expressions but no match to expected inputs ─────────
  if (hasExpressions && opProvenance !== EvidenceProvenance.OBSERVED) {
    return {
      sufficiency: EvidenceSufficiency.BORDERLINE,
      causeConfidenceCap: 0.65,
      reason: "Expression found but operation provenance is not fully confirmed as observed.",
    };
  }

  // ── Fallback: insufficient by default if no stronger rule matched ─────────
  return {
    sufficiency: EvidenceSufficiency.INSUFFICIENT,
    causeConfidenceCap: 0.30,
    reason: "No explicit working found; cause cannot be proven without probing.",
  };
}
