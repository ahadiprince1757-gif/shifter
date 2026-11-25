/**
 * Submission Entity Contract
 *
 * Models a student's answer submission with explicit lifecycle state.
 * Preserves raw answer and working before any evaluation or diagnosis occurs.
 */

export const PROCESSING_STATUS = Object.freeze({
  CAPTURED: "CAPTURED",
  EVALUATING: "EVALUATING",
  EVALUATED: "EVALUATED",
  DIAGNOSING: "DIAGNOSING",
  COMPLETED: "COMPLETED",
  EVALUATION_FAILED: "EVALUATION_FAILED",
  PROCESSING_RETRY_REQUIRED: "PROCESSING_RETRY_REQUIRED",
});

export const EVALUATION_STATUS = Object.freeze({
  PENDING: "PENDING",
  EVALUATED: "EVALUATED",
  EVALUATION_FAILED: "EVALUATION_FAILED",
});

export const DIAGNOSIS_OUTCOME_STATUS = Object.freeze({
  PENDING: "PENDING",
  CORRECT: "CORRECT",
  DIAGNOSED: "DIAGNOSED",
  INCONCLUSIVE: "INCONCLUSIVE",
});

export function generateSubmissionId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `sub_${ts}_${rand}`;
}

export function createSubmissionEntity({
  submissionId = null,
  userId = null,
  questionId,
  topicId = null,
  subjectId = null,
  chapterId = null,
  answer = "",
  work = "",
  clientTimestamp = null,
  processingStatus = PROCESSING_STATUS.CAPTURED,
  evaluationStatus = EVALUATION_STATUS.PENDING,
  diagnosisStatus = DIAGNOSIS_OUTCOME_STATUS.PENDING,
}) {
  if (!questionId && questionId !== 0) {
    throw new Error("[SubmissionEntity] questionId is required");
  }

  return {
    submissionId: submissionId || generateSubmissionId(),
    userId: userId || "anonymous",
    questionId,
    topicId,
    subjectId,
    chapterId,
    answer: String(answer || ""),
    work: String(work || ""),
    clientTimestamp: clientTimestamp || new Date().toISOString(),
    processingStatus,
    evaluationStatus,
    diagnosisStatus,
  };
}

export function validateSubmissionEntity(entity) {
  if (!entity || typeof entity !== "object") {
    throw new Error("[SubmissionEntity] Invalid submission object");
  }
  if (!entity.submissionId) {
    throw new Error("[SubmissionEntity] Missing required submissionId");
  }
  if (!entity.questionId && entity.questionId !== 0) {
    throw new Error("[SubmissionEntity] Missing required questionId");
  }
  return true;
}
