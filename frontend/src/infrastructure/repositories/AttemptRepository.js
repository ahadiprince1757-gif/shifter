/**
 * Attempt Repository
 *
 * Persists student submissions locally in Dexie before evaluation occurs.
 * Manages atomic transition across attempt persistence, mistake logging, and outbox queuing.
 */

import db from "../../db/db.js";
import {
  PROCESSING_STATUS,
  EVALUATION_STATUS,
  DIAGNOSIS_OUTCOME_STATUS,
  validateSubmissionEntity,
} from "../../domain/contracts/SubmissionEntity.js";

export class AttemptRepository {
  constructor(database = db) {
    this.db = database;
  }

  /**
   * Persists a student's submission to IndexedDB immediately upon capture.
   * Runs BEFORE evaluation to guarantee no data loss if the evaluator throws.
   *
   * @param {Object} submission - SubmissionEntity
   * @returns {Promise<Object>} The persisted attempt record
   */
  async saveAttemptLocally(submission) {
    validateSubmissionEntity(submission);

    const now = new Date().toISOString();
    const record = {
      submission_id: submission.submissionId,
      user_id: submission.userId || "anonymous",
      question_id: submission.questionId,
      topic_id: submission.topicId || null,
      subject_id: submission.subjectId || null,
      chapter_id: submission.chapterId || null,
      answer: String(submission.answer || ""),
      work: String(submission.work || ""),
      processing_status: submission.processingStatus || PROCESSING_STATUS.CAPTURED,
      evaluation_status: submission.evaluationStatus || EVALUATION_STATUS.PENDING,
      diagnosis_status: submission.diagnosisStatus || DIAGNOSIS_OUTCOME_STATUS.PENDING,
      created_at: submission.clientTimestamp || now,
      updated_at: now,
    };

    if (this.db?.local_attempts) {
      await this.db.local_attempts.put(record);
    }
    return record;
  }

  /**
   * Updates an attempt with its evaluation results.
   */
  async updateAttemptEvaluation(submissionId, evaluation) {
    if (!submissionId) {
      throw new Error("[AttemptRepository] submissionId is required");
    }

    const updates = {
      evaluation_status: EVALUATION_STATUS.EVALUATED,
      is_correct: Boolean(evaluation?.isCorrect),
      grade: evaluation?.grade || (evaluation?.isCorrect ? "correct" : "incorrect"),
      score: evaluation?.score ?? (evaluation?.isCorrect ? 100 : (evaluation?.isPartial ? 50 : 0)),
      updated_at: new Date().toISOString(),
    };

    if (this.db?.local_attempts) {
      await this.db.local_attempts
        .where("submission_id")
        .equals(submissionId)
        .modify(updates);
    }
    return updates;
  }

  /**
   * Atomic commit of attempt completion, mistake recording, and sync outbox queueing.
   * Runs in a single Dexie transaction.
   *
   * @param {string} submissionId
   * @param {Object} evaluation
   * @param {Object} diagnosis
   * @param {Object} metadata
   */
  async recordCompletedAttempt(submissionId, evaluation, diagnosis, metadata = {}) {
    if (!submissionId) {
      throw new Error("[AttemptRepository] submissionId is required");
    }

    const now = new Date().toISOString();
    const isCorrect = Boolean(evaluation?.isCorrect);
    const diagnosisStatus = isCorrect
      ? DIAGNOSIS_OUTCOME_STATUS.CORRECT
      : (diagnosis?.status === "diagnosed" ? DIAGNOSIS_OUTCOME_STATUS.DIAGNOSED : DIAGNOSIS_OUTCOME_STATUS.INCONCLUSIVE);

    const attemptUpdates = {
      processing_status: PROCESSING_STATUS.COMPLETED,
      evaluation_status: EVALUATION_STATUS.EVALUATED,
      diagnosis_status: diagnosisStatus,
      is_correct: isCorrect,
      grade: evaluation?.grade || (isCorrect ? "correct" : "incorrect"),
      score: isCorrect ? 100 : (evaluation?.isPartial ? 50 : 0),
      diagnosis_data: diagnosis || null,
      updated_at: now,
    };

    let savedWork = evaluation?.userWork || metadata.work || "";
    let savedAnswer = evaluation?.studentAnswer || metadata.answer || "";

    if (!savedWork && this.db?.local_attempts) {
      const existing = await this.db.local_attempts
        .where("submission_id")
        .equals(submissionId)
        .first();
      if (existing) {
        savedWork = existing.work || "";
        savedAnswer = savedAnswer || existing.answer || "";
      }
    }

    const outboxRecord = {
      idempotency_key: `attempt_${submissionId}`,
      entity_type: "attempt",
      entity_id: submissionId,
      operation: "CREATE",
      payload: {
        submission_id: submissionId,
        user_id: metadata.userId || "anonymous",
        question_id: metadata.questionId || null,
        topic_id: metadata.topicId || null,
        user_answer: savedAnswer,
        user_work: savedWork,
        is_correct: isCorrect,
        score: attemptUpdates.score,
        time_spent_seconds: metadata.timeSpentSeconds || 1,
        diagnosis: diagnosis || null,
        client_timestamp: now,
      },
      status: "PENDING",
      attempt_count: 0,
      next_attempt_at: now,
      created_at: now,
    };

    // If IndexedDB is available, perform atomic transaction
    if (this.db?.local_attempts && this.db?.sync_outbox && typeof this.db.transaction === "function") {
      await this.db.transaction("rw", [this.db.local_attempts, this.db.sync_outbox], async () => {
        await this.db.local_attempts
          .where("submission_id")
          .equals(submissionId)
          .modify(attemptUpdates);

        // Put to sync_outbox with unique idempotency_key
        await this.db.sync_outbox.put(outboxRecord);
      });
    }

    return {
      attemptUpdates,
      outboxRecord,
    };
  }

  /**
   * Retrieves an attempt by its submissionId.
   */
  async getAttemptBySubmissionId(submissionId) {
    if (!submissionId || !this.db?.local_attempts) return null;
    return await this.db.local_attempts
      .where("submission_id")
      .equals(submissionId)
      .first();
  }

  /**
   * Marks an attempt as failed in processing.
   */
  async markAttemptFailed(submissionId, error) {
    if (!submissionId || !this.db?.local_attempts) return;
    await this.db.local_attempts
      .where("submission_id")
      .equals(submissionId)
      .modify({
        processing_status: PROCESSING_STATUS.EVALUATION_FAILED,
        evaluation_status: EVALUATION_STATUS.EVALUATION_FAILED,
        processing_error: String(error?.message || error || "Unknown error"),
        updated_at: new Date().toISOString(),
      });
  }
}

export const attemptRepo = new AttemptRepository();
