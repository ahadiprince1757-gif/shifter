/**
 * Submit Answer Use Case
 *
 * Implements the 7-step recoverable submission lifecycle defined in
 * Architecture Specification v2.1:
 *
 * 1. Capture Submission Entity (generates submissionId, preserves raw answer & work).
 * 2. Persist locally to IndexedDB BEFORE evaluation (zero data loss on evaluator crash).
 * 3. Evaluate correctness (EvaluationResultContract).
 * 4. Diagnose cognitive breakdown if incorrect (DiagnosticEngine).
 * 5. Build targeted repair plan.
 * 6. Commit atomic transaction (update attempt, write mistake if diagnosed, enqueue sync_outbox).
 * 7. Return feedback presentation object to UI.
 */

import { createSubmissionEntity, PROCESSING_STATUS } from "../../domain/contracts/SubmissionEntity.js";
import { createEvaluationResult } from "../../domain/contracts/EvaluationResultContract.js";
import { attemptRepo } from "../../infrastructure/repositories/AttemptRepository.js";
import { mistakeRepo } from "../../infrastructure/repositories/MistakeRepository.js";
import { diagnosticEngine } from "../../domain/diagnostics/index.js";
import { evaluateAnswer } from "../../utils/grader.js";
import { createRepairPlan as buildRepairPlan } from "../../utils/repairInterventionSelector.js";

export class SubmitAnswerUseCase {
  constructor(attemptRepository = attemptRepo, mistakeRepository = mistakeRepo, engine = diagnosticEngine) {
    this.attemptRepo = attemptRepository;
    this.mistakeRepo = mistakeRepository;
    this.diagnosticEngine = engine;
  }

  /**
   * Executes the submission lifecycle.
   *
   * @param {Object} params
   * @param {string} params.answer - Student final answer
   * @param {string} params.work - Student written multi-step working
   * @param {Object} params.question - Active question object
   * @param {string} params.userId - Current user id
   * @param {string} params.topicId - Topic identifier
   * @param {string} params.subjectId - Subject identifier
   * @param {string} params.chapterId - Chapter identifier
   * @param {number} params.qIdx - Question index in current session
   * @param {number} params.timeSpentSeconds - Elapsed time
   * @param {string} params.confidence - Metacognitive confidence ("low", "medium", "high")
   * @returns {Promise<Object>} Formatted feedback object for the UI
   */
  async execute({
    answer = "",
    work = "",
    question,
    userId = "anonymous",
    topicId = null,
    subjectId = null,
    chapterId = null,
    qIdx = 0,
    timeSpentSeconds = 1,
    confidence = null,
  }) {
    if (!question) {
      throw new Error("[SubmitAnswerUseCase] question is required");
    }

    const questionId = question.id ?? (qIdx + 1);

    // ── STEP 1: CAPTURE SUBMISSION ENTITY ──
    const submission = createSubmissionEntity({
      userId,
      questionId,
      topicId,
      subjectId,
      chapterId,
      answer,
      work,
    });

    // ── STEP 2: PERSIST BEFORE EVALUATION (LOCAL-FIRST ZERO DATA LOSS) ──
    try {
      await this.attemptRepo.saveAttemptLocally(submission);
    } catch (persistErr) {
      console.warn("[SubmitAnswerUseCase] Pre-evaluation persistence warning:", persistErr);
    }

    // ── STEP 3: EVALUATE ANSWER ──
    let rawRes;
    try {
      rawRes = evaluateAnswer(answer, question, work);
    } catch (evalErr) {
      console.error("[SubmitAnswerUseCase] Evaluator crashed:", evalErr);
      await this.attemptRepo.markAttemptFailed(submission.submissionId, evalErr).catch(() => {});
      throw evalErr;
    }

    const isPartial = rawRes?.grade === "partial" || rawRes?.partialCredit === true;
    const isCorrect = Boolean(rawRes?.isCorrect);

    const evaluation = createEvaluationResult({
      isCorrect,
      grade: rawRes?.grade,
      studentAnswer: answer,
      userWork: work,
      correctAnswer: rawRes?.correctAnswer,
      solution: rawRes?.solution,
      steps: rawRes?.steps || question?.steps || [],
      partialInfo: rawRes?.partialInfo,
      confidence: rawRes?.confidence ?? 1.0,
      analysis: rawRes?.analysis || null,
      matchedConcepts: rawRes?.matchedConcepts || [],
      missingConcepts: rawRes?.missingConcepts || [],
      questionWhy: question?.why || null,
    });

    // Ensure question is attached to submission
    submission.question = question;

    // ── STEP 4: DIAGNOSE COGNITIVE BREAKDOWN IF INCORRECT ──
    let diagnosis = null;
    let repairPlan = null;

    if (!isCorrect) {
      // Run domain diagnostic engine
      diagnosis = this.diagnosticEngine.diagnose({
        submission,
        question,
        evaluation,
      });

      // Also merge any existing rich step analysis from evaluateAnswer if available
      if (rawRes?.teacherDiagnosis && !diagnosis.stepAnalysis && rawRes.teacherDiagnosis.stepAnalysis) {
        diagnosis.stepAnalysis = rawRes.teacherDiagnosis.stepAnalysis;
      }

      // ── STEP 5: BUILD TARGETED REPAIR PLAN ──
      try {
        repairPlan = buildRepairPlan({
          question,
          feedback: {
            ...rawRes,
            teacherDiagnosis: diagnosis,
            diagnosis,
          },
          studentAnswer: answer,
          subject: subjectId,
          chapter: chapterId,
          topic: topicId,
        });
      } catch (planErr) {
        console.warn("[SubmitAnswerUseCase] Repair plan build error:", planErr);
      }
    }

    // ── STEP 6: ATOMIC COMMIT (ATTEMPT + MISTAKE + OUTBOX) ──
    try {
      await this.attemptRepo.recordCompletedAttempt(
        submission.submissionId,
        evaluation,
        diagnosis,
        {
          userId,
          questionId,
          topicId,
          subjectId,
          chapterId,
          answer,
          work,
          timeSpentSeconds,
        }
      );

      // Save mistake record if diagnosed
      if (!isCorrect && diagnosis?.status === "diagnosed") {
        await this.mistakeRepo.saveMistake({
          userId,
          topicId,
          subjectId,
          chapterId,
          questionIndex: qIdx,
          questionText: question.q || question.stem || "",
          correctAnswer: rawRes?.correctAnswer || question.ans || "",
          solution: rawRes?.solution || "",
          diagnosis,
        }).catch(() => {});
      }
    } catch (commitErr) {
      console.warn("[SubmitAnswerUseCase] Commit error:", commitErr);
    }

    // ── STEP 7: ASSEMBLE UI FEEDBACK OBJECT ──
    return {
      ...rawRes,
      submissionId: submission.submissionId,
      studentAnswer: answer,
      userAnswer: answer,
      userWork: work,
      confidence,
      diagnosis,
      teacherDiagnosis: diagnosis,
      canonicalDiagnosis: diagnosis,
      analysis: {
        ...(rawRes?.analysis || {}),
        teacherDiagnosis: diagnosis,
      },
      repairPlan,
      whatWentWrong: repairPlan?.whatWentWrong,
      rule: repairPlan?.rule,
    };
  }
}

export const submitAnswerUseCase = new SubmitAnswerUseCase();
