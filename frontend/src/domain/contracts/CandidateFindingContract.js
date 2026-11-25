/**
 * Candidate Finding Contract
 *
 * Models a candidate diagnostic finding emitted by a diagnostic strategy.
 * Each strategy proposes a candidate; DiagnosticEngine arbitrates using
 * direct evidence and specificity, never raw confidence scores alone.
 */

export const EVIDENCE_STRENGTH = Object.freeze({
  DIRECT: "DIRECT",       // Observed directly in student's working or explicit answer text
  DERIVED: "DERIVED",     // Mathematically computed from step transitions or distractor analysis
  INFERRED: "INFERRED",   // Heuristic or probabilistic inference (lowest priority)
});

export function createCandidateFinding({
  strategyId,
  errorType,
  skillId,
  confidence = 0.5,
  evidenceStrength = EVIDENCE_STRENGTH.INFERRED,
  specificity = 1,
  evidence = [],
  breakPoint = null,
  repair = null,
  verification = null,
  whatYouDid = "",
  whyThisIsWrong = [],
  theRightWay = [],
  remember = "",
  stepAnalysis = null,
}) {
  if (!strategyId) {
    throw new Error("[CandidateFinding] strategyId is required");
  }
  if (!errorType) {
    throw new Error("[CandidateFinding] errorType is required");
  }

  const validStrengths = Object.values(EVIDENCE_STRENGTH);
  if (!validStrengths.includes(evidenceStrength)) {
    throw new Error(`[CandidateFinding] Invalid evidenceStrength: ${evidenceStrength}. Must be one of ${validStrengths.join(", ")}`);
  }

  return {
    strategyId: String(strategyId),
    errorType: String(errorType),
    skillId: skillId ? String(skillId) : null,
    confidence: Math.max(0, Math.min(1, Number(confidence) || 0)),
    evidenceStrength,
    specificity: Number(specificity) || 1,
    evidence: Array.isArray(evidence) ? evidence : [],
    breakPoint: breakPoint && typeof breakPoint === "object" ? {
      concept: String(breakPoint.concept || errorType),
      errorType: String(breakPoint.errorType || errorType),
      brokenAt: String(breakPoint.brokenAt || breakPoint.errorType || errorType),
      explanation: String(breakPoint.explanation || ""),
    } : null,
    repair: repair && typeof repair === "object" ? {
      concept: String(repair.concept || ""),
      explanation: String(repair.explanation || ""),
      steps: Array.isArray(repair.steps) ? repair.steps.map(String) : [],
    } : null,
    verification: verification && typeof verification === "object" ? {
      question: String(verification.question || ""),
      expectedConcept: String(verification.expectedConcept || ""),
      type: String(verification.type || "same_skill"),
      options: Array.isArray(verification.options) ? verification.options.map(String) : [],
      correctAnswer: String(verification.correctAnswer || ""),
    } : null,
    whatYouDid: String(whatYouDid || ""),
    whyThisIsWrong: Array.isArray(whyThisIsWrong) ? whyThisIsWrong.map(String) : (whyThisIsWrong ? [String(whyThisIsWrong)] : []),
    theRightWay: Array.isArray(theRightWay) ? theRightWay.map(String) : (theRightWay ? [String(theRightWay)] : []),
    remember: String(remember || ""),
    stepAnalysis: stepAnalysis || null,
  };
}

export function validateCandidateFinding(finding) {
  if (!finding || typeof finding !== "object") {
    throw new Error("[CandidateFinding] Invalid finding object");
  }
  if (!finding.strategyId) {
    throw new Error("[CandidateFinding] Missing strategyId");
  }
  if (!finding.errorType) {
    throw new Error("[CandidateFinding] Missing errorType");
  }
  if (!Object.values(EVIDENCE_STRENGTH).includes(finding.evidenceStrength)) {
    throw new Error(`[CandidateFinding] Invalid evidenceStrength: ${finding.evidenceStrength}`);
  }
  return true;
}
