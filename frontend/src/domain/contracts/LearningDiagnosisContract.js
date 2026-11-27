/**
 * LearningDiagnosis Contract
 *
 * Canonical contract between the universal diagnostic system and the UI.
 * Enforces:
 * - Strict top-level states: CORRECT | DIAGNOSED | INCONCLUSIVE
 * - No Diagnosis Without Evidence (diagnosis.evidenceIds + diagnosis.reason)
 * - Diagnosed Skill === Repair Skill === Retest Skill
 * - Separation of Evidence, Diagnosis, Repair, and Response layers
 */

export const LEARNING_DIAGNOSIS_STATES = Object.freeze({
  CORRECT: "CORRECT",
  DIAGNOSED: "DIAGNOSED",
  INCONCLUSIVE: "INCONCLUSIVE",
});

export const DIAGNOSIS_CATEGORIES = Object.freeze({
  // DIAGNOSED subcategories
  MISCONCEPTION: "misconception",
  PROCEDURAL_ERROR: "procedural_error",
  REASONING_ERROR: "reasoning_error",
  INCORRECT_ANSWER: "incorrect_answer",
  INCOMPLETE_ANSWER: "incomplete_answer",
  // INCONCLUSIVE subcategories
  INSUFFICIENT_EVIDENCE: "insufficient_evidence",
  AMBIGUOUS: "ambiguous",
  MALFORMED: "malformed",
});

export function createLearningDiagnosis({
  state = LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE,
  subject = "general",
  topic = "general",
  skill = { id: "general", name: "Core Concept" },
  evidence = { studentAnswer: "", working: "", items: [], verified: [], divergent: [], missing: [] },
  diagnosis = {
    category: DIAGNOSIS_CATEGORIES.INSUFFICIENT_EVIDENCE,
    smallestSkill: "general",
    brokenAt: "unverified",
    evidenceIds: [],
    reason: { expected: "", observed: "", evidenceId: null },
    misconception: null,
    confidence: 0.3,
  },
  repair = null,
  retest = null,
  response = {
    whatYouDidRight: [],
    whyYourThinkingBroke: "",
    rightWay: [],
    remember: "",
  },
  stepAnalysis = null,
  expectedAnswer = "",
}) {
  const normalizedState = Object.values(LEARNING_DIAGNOSIS_STATES).includes(state)
    ? state
    : LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE;

  const statusAlias =
    normalizedState === LEARNING_DIAGNOSIS_STATES.CORRECT
      ? "correct"
      : normalizedState === LEARNING_DIAGNOSIS_STATES.DIAGNOSED
      ? "diagnosed"
      : (diagnosis?.category === DIAGNOSIS_CATEGORIES.MALFORMED && !evidence?.studentAnswer && !evidence?.working)
      ? "blank"
      : "inconclusive";

  const correctnessAlias = normalizedState === LEARNING_DIAGNOSIS_STATES.CORRECT ? "correct" : "incorrect";
  const rightWay = Array.isArray(response?.rightWay) ? response.rightWay : [];
  const whyYourThinkingBroke = String(response?.whyYourThinkingBroke || "");

  return {
    state: normalizedState,
    subject: String(subject || "general"),
    topic: String(topic || "general"),
    skill: {
      id: skill?.id || "general",
      name: skill?.name || "Core Concept",
    },
    evidence,
    diagnosis,
    repair,
    retest,
    response,

    // Backward-compatible aliases for existing UI, repositories, and tests
    status: statusAlias,
    correctness: correctnessAlias,
    studentAnswer: evidence?.studentAnswer || "",
    userWork: evidence?.working || "",
    errorType: diagnosis?.category || "inconclusive",
    whatYouDid: evidence?.studentAnswer
      ? `You entered "${evidence.studentAnswer}".`
      : "No final answer was provided.",
    whatYouDidRight: Array.isArray(response?.whatYouDidRight) ? response.whatYouDidRight : [],
    whyThisIsWrong: whyYourThinkingBroke ? [whyYourThinkingBroke] : [],
    theRightWay: rightWay,
    remember: String(response?.remember || ""),
    correctAnswer: expectedAnswer || "",
    expected: expectedAnswer ? [expectedAnswer] : [],
    breakPoint: {
      concept: diagnosis?.smallestSkill || skill?.id || "general",
      errorType: diagnosis?.category || "inconclusive",
      brokenAt: diagnosis?.brokenAt || "",
      explanation: whyYourThinkingBroke,
    },
    probe: retest?.probe || null,
    verification: retest?.probe || null,
    stepAnalysis,
    confidence:
      (diagnosis?.confidence ?? 0) >= 0.8
        ? "high"
        : (diagnosis?.confidence ?? 0) >= 0.5
        ? "medium"
        : "low",
  };
}

export function validateLearningDiagnosis(ld) {
  if (!ld || typeof ld !== "object") {
    throw new Error("[LearningDiagnosis] Must be an object");
  }
  if (!Object.values(LEARNING_DIAGNOSIS_STATES).includes(ld.state)) {
    throw new Error(`[LearningDiagnosis] Invalid state: ${ld.state}`);
  }
  if (ld.state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED) {
    if (!Array.isArray(ld.diagnosis?.evidenceIds) || ld.diagnosis.evidenceIds.length === 0) {
      throw new Error("[LearningDiagnosis] Invariant violation: DIAGNOSED requires traceable diagnosis.evidenceIds");
    }
    if (ld.repair?.skillId && ld.repair.skillId !== ld.diagnosis.smallestSkill) {
      throw new Error("[LearningDiagnosis] Invariant violation: repair.skillId must equal diagnosis.smallestSkill");
    }
    if (ld.retest?.skillId && ld.repair?.skillId && ld.retest.skillId !== ld.repair.skillId) {
      throw new Error("[LearningDiagnosis] Invariant violation: retest.skillId must equal repair.skillId");
    }
  }
  return true;
}
