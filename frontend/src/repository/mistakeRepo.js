import { db } from "../db/db";

export const mistakeRepo = {
  /**
   * Save or update a missed question in IndexedDB.
   */
  async saveMistake({ topicId, subjectId, chapterId, questionIndex, questionText, correctAnswer, solution }) {
    try {
      // Check if this mistake already exists and is unresolved
      const existing = await db.user_mistakes
        .where({ topic_id: topicId, question_index: questionIndex })
        .first();

      if (existing) {
        return await db.user_mistakes.update(existing.id, {
          resolved: false,
          attempt_count: (existing.attempt_count || 1) + 1,
          updated_at: new Date().toISOString(),
        });
      }

      return await db.user_mistakes.add({
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
   * Mark a specific mistake as resolved.
   */
  async resolveMistake(topicId, questionIndex) {
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
