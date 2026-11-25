/**
 * Verify Repair Use Case
 *
 * Verifies a student's answer to a targeted retest question.
 * Strictly enforces:
 * Diagnosed Skill ≡ Repair Skill ≡ Retest Skill
 *
 * If skills diverge, throws RETEST_SKILL_MISMATCH domain error.
 */

import { validateRetestSkill, RETEST_SKILL_MISMATCH, createRepairVerification } from "../../domain/contracts/RepairVerificationContract.js";
import { evaluateAnswer } from "../../utils/grader.js";
import { mistakeRepo } from "../../infrastructure/repositories/MistakeRepository.js";

export class VerifyRepairUseCase {
  constructor(mistakeRepository = mistakeRepo) {
    this.mistakeRepo = mistakeRepository;
  }

  /**
   * Executes repair verification on a retest attempt.
   *
   * @param {Object} params
   * @param {Object} params.repairPlan - The active repair plan containing diagnosedSkillId
   * @param {Object} params.retestQuestion - The retest question presented to the student
   * @param {string} params.studentAnswer - The student's retest answer
   * @param {string} params.userWork - Student's written retest working
   * @param {string} params.userId - Current user id
   * @param {string} params.topicId - Current topic id
   * @param {number} params.originalQuestionIndex - Index of original failed question
   * @returns {Object} Verification outcome
   */
  async execute({
    repairPlan,
    retestQuestion,
    studentAnswer = "",
    userWork = "",
    userId = "anonymous",
    topicId = null,
    originalQuestionIndex = null,
  }) {
    // ── 1. ENFORCE INVARIANT: DIAGNOSED SKILL === RETEST SKILL ──
    validateRetestSkill(retestQuestion, repairPlan);

    // ── 2. EVALUATE RETEST ANSWER ──
    const evalResult = evaluateAnswer(studentAnswer, retestQuestion, userWork);
    const isPassed = Boolean(evalResult?.isCorrect);

    const verification = createRepairVerification({
      repairPlan,
      retestQuestion,
      isPassed,
      studentAnswer,
    });

    // ── 3. IF PASSED, RESOLVE LOCAL & OUTBOX MISTAKE ──
    if (isPassed && topicId !== null && originalQuestionIndex !== null) {
      await this.mistakeRepo.resolveMistake({
        userId,
        topicId,
        questionIndex: originalQuestionIndex,
      }).catch(() => {});
    }

    return {
      isPassed,
      evalResult,
      verification,
    };
  }
}

export const verifyRepairUseCase = new VerifyRepairUseCase();
