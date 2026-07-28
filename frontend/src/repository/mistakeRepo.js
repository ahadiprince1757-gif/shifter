import { db } from "../db/db";
import { saveMistake as apiSaveMistake, resolveMistake as apiResolveMistake } from "../api";
import { networkService } from "../services/networkService";

export const mistakeRepo = {
  /**
   * Save or update a missed question in IndexedDB, then sync to Supabase.
   */
  async saveMistake({ topicId, subjectId, chapterId, questionIndex, questionText, correctAnswer, solution }) {
    try {
      // 1. Write to IndexedDB (always, offline-first)
      const existing = await db.user_mistakes
        .where({ topic_id: topicId, question_index: questionIndex })
        .first();

      if (existing) {
        await db.user_mistakes.update(existing.id, {
          resolved: false,
          attempt_count: (existing.attempt_count || 1) + 1,
          updated_at: new Date().toISOString(),
        });
      } else {
        await db.user_mistakes.add({
          topic_id: topicId,
          subject_id: subjectId,
          chapter_id: chapterId,
          question_index: questionIndex,
          question_text: questionText || "",
          correct_answer: correctAnswer || "",
          solution: solution || "",
          resolved: false,
          attempt_count: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      // 2. Sync to Supabase (fire-and-forget, requires auth + network)
      if (networkService.isOnline) {
        apiSaveMistake({
          sid: subjectId,
          cid: chapterId,
          topicTitle: topicId,   // topicId here is the topic title string
          questionIndex,
          questionText: questionText || "",
          correctAnswer: correctAnswer || "",
          solution: solution || "",
        }).catch(() => {});       // silently ignore if not logged in or offline
      }
    } catch (err) {
      console.error("Failed to save mistake:", err);
    }
  },

  /**
   * Get all unresolved mistakes.
   */
  async getUnresolvedMistakes() {
    try {
      return await db.user_mistakes.filter(m => !m.resolved).toArray();
    } catch (err) {
      console.error("Failed to fetch unresolved mistakes:", err);
      return [];
    }
  },

  /**
   * Mark a specific mistake as resolved in IndexedDB and Supabase.
   */
  async resolveMistake(topicId, questionIndex, { subjectId, chapterId } = {}) {
    try {
      const existing = await db.user_mistakes
        .where({ topic_id: topicId, question_index: questionIndex })
        .first();

      if (existing) {
        await db.user_mistakes.update(existing.id, {
          resolved: true,
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        // Sync resolve to Supabase
        const sid = subjectId || existing.subject_id;
        const cid = chapterId || existing.chapter_id;
        if (sid && cid && networkService.isOnline) {
          apiResolveMistake({
            sid,
            cid,
            topicTitle: topicId,
            questionIndex,
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.error("Failed to resolve mistake:", err);
    }
  },

  /**
   * Clear resolved mistakes older than 30 days.
   */
  async cleanupOldResolved() {
    try {
      const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const old = await db.user_mistakes
        .filter(m => m.resolved && m.resolved_at < cutoff)
        .toArray();
      const ids = old.map(m => m.id);
      if (ids.length > 0) {
        await db.user_mistakes.bulkDelete(ids);
      }
    } catch (err) {
      console.error("Failed to cleanup old mistakes:", err);
    }
  }
};
