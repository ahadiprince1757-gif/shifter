/**
 * Mistake Repository
 *
 * Consolidates local IndexedDB mistake storage and Supabase remote synchronization.
 * Writes to IndexedDB first, ensuring full offline functionality.
 */

import db from "../../db/db.js";
import { getActiveUserId } from "../../supabase.js";

export class MistakeRepository {
  constructor(database = db) {
    this.db = database;
  }

  /**
   * Save or update a missed question in IndexedDB, then sync to outbox or API.
   */
  async saveMistake({
    userId,
    topicId,
    subjectId,
    chapterId,
    questionIndex,
    questionText,
    correctAnswer,
    solution,
    diagnosis = null,
  }) {
    try {
      const uid = userId || (typeof getActiveUserId === "function" ? getActiveUserId() : null) || "anonymous";

      if (!this.db?.user_mistakes) return null;

      const existing = await this.db.user_mistakes
        .where("[user_id+topic_id+question_index]")
        .equals([uid, String(topicId || ""), Number(questionIndex || 0)])
        .first();

      const now = new Date().toISOString();

      if (existing) {
        await this.db.user_mistakes.update(existing.id, {
          question_text: questionText || existing.question_text,
          correct_answer: correctAnswer || existing.correct_answer,
          solution: solution || existing.solution,
          diagnosis: diagnosis || existing.diagnosis,
          attempt_count: (existing.attempt_count || 1) + 1,
          resolved: 0,
          updated_at: now,
        });
      } else {
        await this.db.user_mistakes.add({
          user_id: uid,
          topic_id: String(topicId || ""),
          subject_id: String(subjectId || ""),
          chapter_id: String(chapterId || ""),
          question_index: Number(questionIndex || 0),
          question_text: String(questionText || ""),
          correct_answer: String(correctAnswer || ""),
          solution: String(solution || ""),
          diagnosis: diagnosis || null,
          attempt_count: 1,
          resolved: 0,
          created_at: now,
          updated_at: now,
        });
      }

      // Enqueue in sync_outbox
      if (this.db?.sync_outbox) {
        const idempotencyKey = `mistake_save_${uid}_${topicId}_${questionIndex}_${Date.now()}`;
        await this.db.sync_outbox.put({
          idempotency_key: idempotencyKey,
          entity_type: "mistake",
          entity_id: `${uid}:${topicId}:${questionIndex}`,
          operation: "SAVE_MISTAKE",
          payload: {
            userId: uid,
            topicId,
            subjectId,
            chapterId,
            questionIndex,
            questionText,
            correctAnswer,
            solution,
            diagnosis,
          },
          status: "PENDING",
          attempt_count: 0,
          next_attempt_at: now,
          created_at: now,
        }).catch(() => {});
      }

      return true;
    } catch (err) {
      console.warn("[MistakeRepository] saveMistake failed:", err);
      return false;
    }
  }

  /**
   * Mark a mistake as resolved upon successful repair verification.
   */
  async resolveMistake({ userId, topicId, questionIndex }) {
    try {
      const uid = userId || (typeof getActiveUserId === "function" ? getActiveUserId() : null) || "anonymous";

      if (!this.db?.user_mistakes) return false;

      const existing = await this.db.user_mistakes
        .where("[user_id+topic_id+question_index]")
        .equals([uid, String(topicId || ""), Number(questionIndex || 0)])
        .first();

      const now = new Date().toISOString();

      if (existing) {
        await this.db.user_mistakes.update(existing.id, {
          resolved: 1,
          updated_at: now,
        });
      }

      // Enqueue in sync_outbox
      if (this.db?.sync_outbox) {
        const idempotencyKey = `mistake_resolve_${uid}_${topicId}_${questionIndex}_${Date.now()}`;
        await this.db.sync_outbox.put({
          idempotency_key: idempotencyKey,
          entity_type: "mistake",
          entity_id: `${uid}:${topicId}:${questionIndex}`,
          operation: "RESOLVE_MISTAKE",
          payload: { userId: uid, topicId, questionIndex },
          status: "PENDING",
          attempt_count: 0,
          next_attempt_at: now,
          created_at: now,
        }).catch(() => {});
      }

      return true;
    } catch (err) {
      console.warn("[MistakeRepository] resolveMistake failed:", err);
      return false;
    }
  }

  async getMistakesByTopic(userId, topicId) {
    if (!this.db?.user_mistakes) return [];
    return await this.db.user_mistakes
      .where("[user_id+topic_id]")
      .equals([userId, String(topicId)])
      .toArray();
  }
}

export const mistakeRepo = new MistakeRepository();
