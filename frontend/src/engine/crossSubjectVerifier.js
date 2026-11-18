/**
 * TIXAR CROSS-SUBJECT VERIFICATION & TRANSFER ENGINE
 *
 * Implements two-stage verification:
 * 1. Foundational Acquisition: Verifies the isolated primitive (e.g. fraction multiplication in Math).
 * 2. Contextual Transfer: Verifies applying that primitive inside the original domain context (e.g. Chemistry stoichiometry).
 *
 * Invariant:
 * Acquisition != Transfer. Demonstrating arithmetic competence does NOT prove chemical stoichiometry competence.
 */

import { evaluateAnswer } from "../utils/grader.js";

export const VERIFICATION_OUTCOME = Object.freeze({
  ACQUISITION_CONFIRMED: "ACQUISITION_CONFIRMED",
  ACQUISITION_FAILED: "ACQUISITION_FAILED",
  TRANSFER_CONFIRMED: "TRANSFER_CONFIRMED",
  TRANSFER_FAILED: "TRANSFER_FAILED",
});

/**
 * Evaluates a learner's response on the foundational primitive retest.
 *
 * @param {object} params
 * @param {object} params.repairPlan - The active repair plan from crossSubjectRepairSelector
 * @param {string} params.studentAnswer - Answer submitted on the foundational retest
 * @returns {object} Verification outcome and state update
 */
export function verifyFoundationalRetest({
  repairPlan,
  studentAnswer,
  userId = "anon_learner",
  timeSpentMs = 0,
}) {
  const retestQ = repairPlan.foundationalRetest;
  const grade = evaluateAnswer(studentAnswer, retestQ);
  const isCorrect = Boolean(grade.isCorrect);

  const repairEventRecord = {
    eventId: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId,
    questionId: repairPlan.questionId,
    diagnosedSkillId: repairPlan.diagnosedSkillId,
    deliveredResourceIds: repairPlan.deliveredResourceIds || [],
    triggeringEvidenceIds: repairPlan.triggeringEvidenceIds || [],
    retestQuestionId: retestQ?.questionId || null,
    retestSubmittedAnswer: studentAnswer,
    retestOutcome: isCorrect ? "PASSED" : "FAILED",
    transferQuestionId: repairPlan.contextualTransfer?.questionId || null,
    transferOutcome: "PENDING",
    completionStatus: "PARTIAL",
    timeSpentMs,
    timestamp: new Date().toISOString(),
  };

  if (isCorrect) {
    return {
      status: VERIFICATION_OUTCOME.ACQUISITION_CONFIRMED,
      skillId: repairPlan.diagnosedSkillId,
      acquisition: "DEMONSTRATED",
      nextStep: "RETURN_TO_DOMAIN_CONTEXT",
      repairEventRecord,
      message: "Foundational skill verified! Now let's apply it back to your original problem.",
    };
  }

  return {
    status: VERIFICATION_OUTCOME.ACQUISITION_FAILED,
    skillId: repairPlan.diagnosedSkillId,
    acquisition: "UNVERIFIED",
    nextStep: "RETRY_FOUNDATION",
    repairEventRecord: { ...repairEventRecord, completionStatus: "ABANDONED" },
    message: "The foundational calculation was not completed correctly. Review the rule and try once more.",
  };
}

/**
 * Evaluates a learner's response when returning to the domain contextual problem.
 *
 * @param {object} params
 * @param {object} params.repairPlan - The active repair plan
 * @param {string} params.studentAnswer - Answer submitted on contextual transfer question
 * @param {object} [params.previousRetestRecord] - Prior foundational retest record
 * @param {number} [params.timeSpentMs] - Time spent on transfer attempt
 * @returns {object} Transfer outcome and state update
 */
export function verifyContextualTransfer({
  repairPlan,
  studentAnswer,
  previousRetestRecord = null,
  timeSpentMs = 0,
}) {
  const transferQ = repairPlan.contextualTransfer || repairPlan.questionId;
  const grade = evaluateAnswer(studentAnswer, transferQ);
  const isCorrect = Boolean(grade.isCorrect);

  const finalRepairEvent = {
    ...(previousRetestRecord || {}),
    transferQuestionId: transferQ?.questionId || null,
    transferSubmittedAnswer: studentAnswer,
    transferOutcome: isCorrect ? "PASSED" : "FAILED",
    completionStatus: "COMPLETED",
    totalTimeSpentMs: (previousRetestRecord?.timeSpentMs || 0) + timeSpentMs,
    completedAt: new Date().toISOString(),
  };

  if (isCorrect) {
    return {
      status: VERIFICATION_OUTCOME.TRANSFER_CONFIRMED,
      skillId: repairPlan.diagnosedSkillId,
      acquisition: "DEMONSTRATED",
      contextualTransfer: "DEMONSTRATED",
      nextStep: "ADVANCE_CURRICULUM",
      finalRepairEvent,
      message: "Transfer verified! You successfully applied the foundational skill in context.",
    };
  }

  return {
    status: VERIFICATION_OUTCOME.TRANSFER_FAILED,
    skillId: repairPlan.diagnosedSkillId,
    acquisition: "DEMONSTRATED", // Prerequisite primitive remains demonstrated!
    contextualTransfer: "FAILED_TRANSFER", // Contextual domain application requires reinforcement
    nextStep: "PRACTICE_DOMAIN_CONTEXT",
    finalRepairEvent,
    message: "You have mastered the arithmetic operation, but need more practice connecting it to the chemical context.",
  };
}
