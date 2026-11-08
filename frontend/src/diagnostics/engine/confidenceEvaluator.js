/**
 * 10× Precision Multidimensional Confidence Evaluator.
 *
 * Replaces monolithic confidence with 4 epistemic dimensions:
 * 1. Answer Confidence: Is the submitted answer correct?
 * 2. Error Confidence: Did a verified mathematical divergence occur?
 * 3. Cause Confidence: Do we know why it happened (the root cause)?
 * 4. Repair Confidence: Do we know which targeted intervention will fix it?
 *
 * Decision Behaviors:
 * - DIAGNOSE: High evidence on both error and cause.
 * - INVESTIGATE: Error detected, but cause needs confirmation via a probe.
 * - INCONCLUSIVE: Insufficient evidence; honest fallback without fabricating thinking.
 */

export const CONFIDENCE_LEVELS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  NONE: "none",
  UNRECOGNIZED: "unrecognized",
};

export function getConfidenceLevel(score) {
  if (score >= 0.85) return CONFIDENCE_LEVELS.HIGH;
  if (score >= 0.60) return CONFIDENCE_LEVELS.MEDIUM;
  if (score > 0) return CONFIDENCE_LEVELS.LOW;
  return CONFIDENCE_LEVELS.NONE;
}

export function createConfidence(score, evidence = []) {
  return {
    score,
    level: getConfidenceLevel(score),
    evidence,
  };
}

export function evaluateDiagnosticConfidence({
  hasInputMash = false,
  hasWorkingSteps = false,
  stepErrorFound = false,
  distractorMatched = false,
  isCorrect = false,
  isUnknownDeviation = false,

  transitionVerified = false,
  errorClassificationVerified = false,
  rootCauseSupported = false,
  independentConfirmation = false,
}) {
  // Case 1: Unrecognized / Gibberish input
  if (hasInputMash) {
    return {
      status: "UNRECOGNIZED",
      decision: "INCONCLUSIVE",
      score: 0.05,
      level: CONFIDENCE_LEVELS.UNRECOGNIZED,
      label: "Unrecognized Input",
      answer: createConfidence(0, ["INPUT_UNRECOGNIZED"]),
      error: createConfidence(0, ["CANNOT_EVALUATE_MASH"]),
      cause: createConfidence(0, ["NO_INTERPRETABLE_CAUSE"]),
      repair: createConfidence(0, ["REENTER_INPUT"]),
      evidence: {
        hasWorkingSteps,
        transitionVerified: false,
        distractorMatched: false,
        rootCauseSupported: false,
        independentConfirmation: false,
      },
    };
  }

  // Case 2: Correct answer
  if (isCorrect) {
    const answerScore = 1.0;
    // Working presence increases confidence that answer wasn't a lucky guess
    const proceduralScore = hasWorkingSteps ? 0.95 : 0.70;

    return {
      status: "ANSWER_CORRECT",
      decision: "DIAGNOSE",
      score: answerScore,
      level: CONFIDENCE_LEVELS.HIGH,
      label: "Confirmed Correct",
      answer: createConfidence(answerScore, ["ANSWER_MATCH"]),
      error: createConfidence(0, ["NO_ERROR_DETECTED"]),
      cause: createConfidence(proceduralScore, hasWorkingSteps ? ["WORKING_VERIFIED"] : ["ANSWER_ONLY"]),
      repair: createConfidence(0, ["NO_REPAIR_REQUIRED"]),
      evidence: {
        hasWorkingSteps,
        transitionVerified: true,
        distractorMatched: false,
        rootCauseSupported: true,
        independentConfirmation: false,
      },
    };
  }

  // Case 3: Error analysis
  const errorEvidence = [];
  if (stepErrorFound && transitionVerified) {
    errorEvidence.push("INVALID_TRANSITION_VERIFIED");
  }
  if (distractorMatched) {
    errorEvidence.push("CATALOGED_DISTRACTOR_MATCH");
  }
  if (hasWorkingSteps) {
    errorEvidence.push("STUDENT_WORKING_PROVIDED");
  }

  const errorScore = transitionVerified
    ? 0.98
    : distractorMatched
    ? 0.85
    : stepErrorFound
    ? 0.75
    : isUnknownDeviation
    ? 0.20
    : 0.35;

  const causeScore = rootCauseSupported
    ? independentConfirmation
      ? 0.95
      : 0.75
    : distractorMatched
    ? 0.70
    : 0.25;

  const repairScore = rootCauseSupported
    ? errorClassificationVerified
      ? 0.90
      : 0.65
    : distractorMatched
    ? 0.70
    : 0.30;

  // Determine diagnostic decision
  let decision = "INCONCLUSIVE";
  let status = "NEEDS_MORE_EVIDENCE";

  if (errorScore >= 0.85 && causeScore >= 0.70) {
    decision = "DIAGNOSE";
    status = "ERROR_CONFIRMED";
  } else if (errorScore >= 0.60) {
    decision = "INVESTIGATE";
    status = "NEEDS_PROBE";
  }

  // Overall summary score for backward compatibility
  const overallScore = Math.min(errorScore, Math.max(causeScore, 0.25));

  return {
    status,
    decision,
    score: overallScore,
    level: getConfidenceLevel(overallScore),
    label: decision === "DIAGNOSE" ? "High Evidence (Diagnosed)" : decision === "INVESTIGATE" ? "Moderate Evidence (Needs Probe)" : "Low Evidence (Inconclusive)",

    answer: createConfidence(0, ["ANSWER_INCORRECT"]),
    error: createConfidence(errorScore, errorEvidence),
    cause: createConfidence(
      causeScore,
      rootCauseSupported ? ["ROOT_CAUSE_SUPPORTED"] : distractorMatched ? ["DISTRACTOR_RECOGNIZED"] : ["CAUSE_NOT_ESTABLISHED"]
    ),
    repair: createConfidence(
      repairScore,
      errorClassificationVerified ? ["REPAIR_MATCHES_ERROR"] : ["REPAIR_PROVISIONAL"]
    ),

    evidence: {
      hasWorkingSteps,
      transitionVerified,
      distractorMatched,
      rootCauseSupported,
      independentConfirmation,
    },
  };
}
