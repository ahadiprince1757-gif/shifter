/**
 * Evaluation Result Contract
 *
 * Models the output of LocalEvaluator.
 * Separates correctness determination from cognitive error diagnosis.
 */

export const GRADE_STATUS = Object.freeze({
  CORRECT: "correct",
  INCORRECT: "incorrect",
  PARTIAL: "partial",
  BLANK: "blank",
  UNGRADABLE: "ungradable",
});

export function createEvaluationResult({
  isCorrect = false,
  grade = GRADE_STATUS.INCORRECT,
  studentAnswer = "",
  userWork = "",
  correctAnswer = "",
  solution = "",
  steps = [],
  partialInfo = null,
  analysis = null,
  matchedConcepts = [],
  missingConcepts = [],
  questionWhy = "",
  method = "deterministic",
  confidence = 1.0,
}) {
  return {
    isCorrect: Boolean(isCorrect),
    grade: Object.values(GRADE_STATUS).includes(grade) ? grade : (isCorrect ? GRADE_STATUS.CORRECT : GRADE_STATUS.INCORRECT),
    studentAnswer: String(studentAnswer || ""),
    userWork: String(userWork || ""),
    correctAnswer: String(correctAnswer || ""),
    solution: String(solution || ""),
    steps: Array.isArray(steps) ? steps.map(String) : [],
    partialInfo: partialInfo && typeof partialInfo === "object" ? {
      matchedCount: Number(partialInfo.matchedCount || 0),
      totalRequired: Number(partialInfo.totalRequired || 0),
      percent: Number(partialInfo.percent || 0),
    } : null,
    analysis: analysis && typeof analysis === "object" ? analysis : null,
    matchedConcepts: Array.isArray(matchedConcepts) ? matchedConcepts : [],
    missingConcepts: Array.isArray(missingConcepts) ? missingConcepts : [],
    questionWhy: String(questionWhy || ""),
    method: String(method || "deterministic"),
    confidence: Number(confidence || 1.0),
  };
}

export function validateEvaluationResult(res) {
  if (!res || typeof res !== "object") {
    throw new Error("[EvaluationResult] Invalid evaluation result object");
  }
  if (typeof res.isCorrect !== "boolean") {
    throw new Error("[EvaluationResult] isCorrect must be a boolean");
  }
  if (!Object.values(GRADE_STATUS).includes(res.grade)) {
    throw new Error(`[EvaluationResult] Invalid grade: ${res.grade}`);
  }
  if (typeof res.userWork !== "string") {
    throw new Error("[EvaluationResult] userWork must be preserved as string");
  }
  return true;
}
