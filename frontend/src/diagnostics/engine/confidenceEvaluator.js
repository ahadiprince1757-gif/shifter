/**
 * Confidence Evaluator.
 * Assigns evidence-based confidence levels to diagnoses, preventing
 * the engine from inventing assumptions when evidence is inconclusive.
 */

export function evaluateDiagnosticConfidence({
  hasInputMash,
  hasWorkingSteps,
  stepErrorFound,
  distractorMatched,
  isCorrect,
  isUnknownDeviation,
}) {
  if (hasInputMash) {
    return {
      score: 0.05,
      level: "unrecognized",
      label: "Unrecognized Input",
    };
  }

  if (isCorrect) {
    return {
      score: 1.0,
      level: "high",
      label: "Confirmed Correct",
    };
  }

  if (stepErrorFound) {
    return {
      score: 0.95,
      level: "high",
      label: "High Evidence (Step Verification)",
    };
  }

  if (distractorMatched) {
    return {
      score: 0.9,
      level: "high",
      label: "High Evidence (Cataloged Distractor)",
    };
  }

  if (isUnknownDeviation) {
    return {
      score: 0.25,
      level: "low",
      label: "Low Evidence (Inconclusive)",
    };
  }

  return {
    score: 0.5,
    level: "medium",
    label: "Moderate Evidence",
  };
}
