
/**
 * Multidimensional Diagnostic Confidence Evaluator.
 *
 * Evaluates four separate dimensions:
 *
 * 1. Answer confidence: confidence in the answer assessment.
 * 2. Error confidence: confidence that an error occurred.
 * 3. Cause confidence: confidence in the identified root cause.
 * 4. Repair confidence: confidence that the proposed intervention
 *    addresses the identified cause.
 *
 * Decisions:
 *
 * DIAGNOSE:
 *   A verified error and sufficiently supported root cause.
 *
 * INVESTIGATE:
 *   An error or meaningful misconception signal exists,
 *   but the exact cause needs confirmation.
 *
 * INCONCLUSIVE:
 *   Available evidence is insufficient to identify an error.
 *
 * CORRECT:
 *   The submitted answer is confirmed correct.
 *   This does not automatically verify the method.
 */

export const CONFIDENCE_LEVELS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  NONE: "none",
  UNRECOGNIZED: "unrecognized",
};

export const DIAGNOSTIC_DECISIONS = {
  DIAGNOSE: "DIAGNOSE",
  INVESTIGATE: "INVESTIGATE",
  INCONCLUSIVE: "INCONCLUSIVE",
  CORRECT: "CORRECT",
};

const clamp = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.max(0, Math.min(1, number));
};

export function getConfidenceLevel(score) {
  const value = clamp(score);

  if (value >= 0.85) return CONFIDENCE_LEVELS.HIGH;
  if (value >= 0.60) return CONFIDENCE_LEVELS.MEDIUM;
  if (value > 0) return CONFIDENCE_LEVELS.LOW;

  return CONFIDENCE_LEVELS.NONE;
}

export function createConfidence(score, evidence = []) {
  const safeScore = clamp(score);

  return {
    score: safeScore,
    level: getConfidenceLevel(safeScore),
    evidence: Array.isArray(evidence) ? evidence : [],
  };
}

function buildEvidence({
  hasWorkingSteps,
  stepErrorFound,
  transitionVerified,
  distractorMatched,
  rootCauseSupported,
  errorClassificationVerified,
  independentConfirmation,
}) {
  return {
    hasWorkingSteps: Boolean(hasWorkingSteps),
    stepErrorFound: Boolean(stepErrorFound),
    transitionVerified: Boolean(transitionVerified),
    distractorMatched: Boolean(distractorMatched),
    rootCauseSupported: Boolean(rootCauseSupported),
    errorClassificationVerified: Boolean(errorClassificationVerified),
    independentConfirmation: Boolean(independentConfirmation),
  };
}

function buildUnrecognizedResult(hasWorkingSteps) {
  return {
    status: "UNRECOGNIZED",
    decision: DIAGNOSTIC_DECISIONS.INCONCLUSIVE,
    score: 0,
    level: CONFIDENCE_LEVELS.UNRECOGNIZED,
    label: "Unrecognized Input",

    answer: createConfidence(0, ["INPUT_UNRECOGNIZED"]),
    error: createConfidence(0, ["CANNOT_EVALUATE_INPUT"]),
    cause: createConfidence(0, ["NO_INTERPRETABLE_CAUSE"]),
    repair: createConfidence(0, ["REENTER_INPUT"]),

    evidence: {
      hasWorkingSteps: Boolean(hasWorkingSteps),
      transitionVerified: false,
      distractorMatched: false,
      rootCauseSupported: false,
      independentConfirmation: false,
    },
  };
}

function buildCorrectResult({
  hasWorkingSteps,
  transitionVerified,
}) {
  const answer = createConfidence(1, ["ANSWER_CONFIRMED_CORRECT"]);

  /**
   * A correct answer alone does not establish that the method was correct.
   * Only verified working can provide procedural evidence.
   */
  const methodScore = transitionVerified
    ? 0.95
    : hasWorkingSteps
      ? 0.50
      : 0;

  const causeEvidence = transitionVerified
    ? ["WORKING_TRANSITIONS_VERIFIED"]
    : hasWorkingSteps
      ? ["WORKING_PRESENT_METHOD_NOT_VERIFIED"]
      : ["ANSWER_ONLY_METHOD_UNKNOWN"];

  return {
    status: "ANSWER_CORRECT",
    decision: DIAGNOSTIC_DECISIONS.CORRECT,
    score: 1,
    level: CONFIDENCE_LEVELS.HIGH,
    label: "Confirmed Correct",

    answer,

    error: createConfidence(0, ["NO_ERROR_DETECTED"]),

    cause: createConfidence(methodScore, causeEvidence),

    repair: createConfidence(0, ["NO_REPAIR_REQUIRED"]),

    evidence: {
      hasWorkingSteps: Boolean(hasWorkingSteps),
      transitionVerified: Boolean(transitionVerified),
      distractorMatched: false,
      rootCauseSupported: false,
      independentConfirmation: false,
    },
  };
}

export function evaluateDiagnosticConfidence({
  hasInputMash = false,
  hasWorkingSteps = false,
  stepErrorFound = false,
  distractorMatched = false,
  isCorrect = false,
  isIncorrect = false,
  isUnknownDeviation = false,

  transitionVerified = false,
  errorClassificationVerified = false,
  rootCauseSupported = false,
  independentConfirmation = false,
}) {
  /* ---------------------------------------------------------------------- */
  /* 1. Unrecognized input                                                   */
  /* ---------------------------------------------------------------------- */

  if (hasInputMash) {
    return buildUnrecognizedResult(hasWorkingSteps);
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Correct answer                                                       */
  /* ---------------------------------------------------------------------- */

  if (isCorrect) {
    return buildCorrectResult({
      hasWorkingSteps,
      transitionVerified,
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Establish evidence                                                   */
  /* ---------------------------------------------------------------------- */

  const evidence = buildEvidence({
    hasWorkingSteps,
    stepErrorFound,
    transitionVerified,
    distractorMatched,
    rootCauseSupported,
    errorClassificationVerified,
    independentConfirmation,
  });

  const errorEvidence = [];

  if (transitionVerified) {
    errorEvidence.push("INVALID_TRANSITION_VERIFIED");
  }

  if (stepErrorFound) {
    errorEvidence.push("STEP_ERROR_REPORTED");
  }

  if (distractorMatched) {
    errorEvidence.push("CATALOGUED_DISTRACTOR_MATCH");
  }

  if (hasWorkingSteps) {
    errorEvidence.push("STUDENT_WORKING_PROVIDED");
  }

  if (isIncorrect) {
    errorEvidence.push("ANSWER_ASSESSED_INCORRECT");
  }

  /* ---------------------------------------------------------------------- */
  /* 4. Answer confidence                                                    */
  /* ---------------------------------------------------------------------- */

  /**
   * This measures confidence in the answer assessment,
   * not confidence in the student's reasoning.
   *
   * The caller should set isIncorrect only when the expected
   * answer and submitted answer have been reliably assessed.
   */
  const answerScore = isIncorrect ? 1 : 0;

  /* ---------------------------------------------------------------------- */
  /* 5. Error confidence                                                     */
  /* ---------------------------------------------------------------------- */

  let errorScore = 0;

  if (transitionVerified) {
    errorScore = 0.98;
  } else if (stepErrorFound) {
    errorScore = 0.65;
  } else if (distractorMatched) {
    // A distractor is a signal, not proof of the reasoning.
    errorScore = 0.70;
  } else if (isIncorrect) {
    // The answer is wrong, but the specific error is not established.
    errorScore = 0.45;
  } else if (isUnknownDeviation) {
    errorScore = 0.20;
  } else if (hasWorkingSteps) {
    errorScore = 0.15;
  }

  /* ---------------------------------------------------------------------- */
  /* 6. Cause confidence                                                     */
  /* ---------------------------------------------------------------------- */

  let causeScore = 0;

  if (rootCauseSupported && transitionVerified) {
    causeScore = independentConfirmation ? 0.98 : 0.85;
  } else if (rootCauseSupported && stepErrorFound) {
    causeScore = independentConfirmation ? 0.85 : 0.70;
  } else if (distractorMatched) {
    // A known answer pattern suggests a possible cause.
    // It does not independently establish the cause.
    causeScore = 0.45;
  } else if (stepErrorFound) {
    causeScore = 0.40;
  }

  /* ---------------------------------------------------------------------- */
  /* 7. Repair confidence                                                    */
  /* ---------------------------------------------------------------------- */

  let repairScore = 0;

  if (
    rootCauseSupported &&
    transitionVerified &&
    errorClassificationVerified
  ) {
    repairScore = independentConfirmation ? 0.98 : 0.90;
  } else if (rootCauseSupported && errorClassificationVerified) {
    repairScore = 0.70;
  } else if (distractorMatched) {
    // A probe may be useful, but a targeted repair is not yet verified.
    repairScore = 0.35;
  } else if (stepErrorFound) {
    repairScore = 0.30;
  }

  /* ---------------------------------------------------------------------- */
  /* 8. Select the diagnostic decision                                       */
  /* ---------------------------------------------------------------------- */

  let decision = DIAGNOSTIC_DECISIONS.INCONCLUSIVE;
  let status = "NEEDS_MORE_EVIDENCE";

  /**
   * Diagnosis requires all three:
   * - Verified transition error.
   * - Supported root cause.
   * - Verified error classification.
   *
   * A high answer-pattern score alone can never trigger DIAGNOSE.
   */
  if (
    transitionVerified &&
    rootCauseSupported &&
    errorClassificationVerified &&
    errorScore >= 0.85 &&
    causeScore >= 0.70
  ) {
    decision = DIAGNOSTIC_DECISIONS.DIAGNOSE;
    status = "ERROR_CONFIRMED";
  } else if (
    errorScore >= 0.60 ||
    (distractorMatched && isIncorrect)
  ) {
    decision = DIAGNOSTIC_DECISIONS.INVESTIGATE;
    status = "NEEDS_PROBE";
  }

  /* ---------------------------------------------------------------------- */
  /* 9. Overall score                                                        */
  /* ---------------------------------------------------------------------- */

  /**
   * The summary score must not hide a weak dimension.
   *
   * For diagnosis, the weakest of error, cause and repair is important.
   * For investigation, the score communicates the strength of the
   * available error signal without pretending the cause is known.
   */
  let overallScore = 0;

  if (decision === DIAGNOSTIC_DECISIONS.DIAGNOSE) {
    overallScore = Math.min(
      errorScore,
      causeScore,
      repairScore
    );
  } else if (decision === DIAGNOSTIC_DECISIONS.INVESTIGATE) {
    overallScore = Math.min(errorScore, 0.70);
  } else {
    overallScore = Math.min(errorScore, 0.25);
  }

  const label =
    decision === DIAGNOSTIC_DECISIONS.DIAGNOSE
      ? "Verified Error and Supported Cause"
      : decision === DIAGNOSTIC_DECISIONS.INVESTIGATE
        ? "Error Signal — Needs Investigation"
        : "Insufficient Evidence — Inconclusive";

  /* ---------------------------------------------------------------------- */
  /* 10. Return multidimensional confidence                                  */
  /* ---------------------------------------------------------------------- */

  return {
    status,
    decision,

    score: clamp(overallScore),
    level: getConfidenceLevel(overallScore),
    label,

    answer: createConfidence(
      answerScore,
      isIncorrect
        ? ["ANSWER_ASSESSED_INCORRECT"]
        : ["ANSWER_ASSESSMENT_NOT_ESTABLISHED"]
    ),

    error: createConfidence(
      errorScore,
      errorEvidence
    ),

    cause: createConfidence(
      causeScore,
      rootCauseSupported
        ? ["ROOT_CAUSE_SUPPORTED"]
        : distractorMatched
          ? ["POSSIBLE_CAUSE_FROM_DISTRACTOR"]
          : ["CAUSE_NOT_ESTABLISHED"]
    ),

    repair: createConfidence(
      repairScore,
      repairScore >= 0.85
        ? ["TARGETED_REPAIR_SUPPORTED"]
        : ["REPAIR_NOT_YET_VERIFIED"]
    ),

    evidence,
  };
}
