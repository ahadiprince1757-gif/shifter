import { db } from "../db/db";
import { saveMistake as apiSaveMistake, resolveMistake as apiResolveMistake, fetchMistakes } from "../api";
import { networkService } from "../services/networkService";

export const mistakeRepo = {
  /**
   * Save or update a missed question in IndexedDB, then sync to Supabase.
   */
  async saveMistake({ userId, topicId, subjectId, chapterId, questionIndex, questionText, correctAnswer, solution }) {
    try {
      const uid = userId || null;

      // 1. Write to IndexedDB using compound user index
      const existing = await db.user_mistakes
        .where("[user_id+topic_id+question_index]")
        .equals([uid, topicId, questionIndex])
        .first()
        .catch(() => null);

      if (existing) {
        await db.user_mistakes.update(existing.id, {
          user_id: uid,
          resolved: false,
          attempt_count: (existing.attempt_count || 1) + 1,
          updated_at: new Date().toISOString(),
        });
      } else {
        await db.user_mistakes.add({
          user_id: uid,
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
      if (uid && networkService.isOnline) {
        apiSaveMistake({
          sid: subjectId,
          cid: chapterId,
          topicTitle: topicId,
          questionIndex,
          questionText: questionText || "",
          correctAnswer: correctAnswer || "",
          solution: solution || "",
        }).catch(() => {});
      }
    } catch (err) {
      console.error("Failed to save mistake:", err);
    }
  },

  /**
   * Get all unresolved mistakes for a specific user.
   * Hydrates from Supabase on first call if online.
   */
  async getUnresolvedMistakes(userId) {
    try {
      const uid = userId || null;

      // Try to hydrate from Supabase if online and authenticated
      if (uid && networkService.isOnline) {
        try {
          const remoteMistakes = await fetchMistakes();
          if (Array.isArray(remoteMistakes) && remoteMistakes.length > 0) {
            for (const m of remoteMistakes) {
              const topicId = m.topics?.title || m.topic_id?.toString() || "";
              const existing = await db.user_mistakes
                .where("[user_id+topic_id+question_index]")
                .equals([uid, topicId, m.question_index])
                .first()
                .catch(() => null);

              if (!existing) {
                await db.user_mistakes.add({
                  user_id: uid,
                  topic_id: topicId,
                  subject_id: m.subject_id,
                  chapter_id: m.chapter_key,
                  question_index: m.question_index,
                  question_text: m.question_text || "",
                  correct_answer: m.correct_answer || "",
                  solution: m.solution || "",
                  resolved: m.resolved || false,
                  attempt_count: m.attempt_count || 1,
                  created_at: m.created_at,
                  updated_at: m.updated_at,
                }).catch(() => {});
              }
            }
          }
        } catch {
          // Hydration failed — fall back to local data
        }
      }

      // Return from local IndexedDB, strictly filtered by user_id compound index
      const allUserMistakes = await db.user_mistakes
        .where("user_id")
        .equals(uid)
        .toArray()
        .catch(() => []);

      return allUserMistakes.filter((m) => !m.resolved);
    } catch (err) {
      console.error("Failed to fetch unresolved mistakes:", err);
      return [];
    }
  },

  /**
   * Mark a specific mistake as resolved in IndexedDB and Supabase.
   */
  async resolveMistake(topicId, questionIndex, { subjectId, chapterId, userId = null } = {}) {
    try {
      const uid = userId || null;
      const existing = await db.user_mistakes
        .where("[user_id+topic_id+question_index]")
        .equals([uid, topicId, questionIndex])
        .first()
        .catch(() => null);

      if (existing) {
        await db.user_mistakes.update(existing.id, {
          resolved: true,
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

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
  async cleanupOldResolved(userId = null) {
    try {
      const uid = userId || null;
      const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const old = await db.user_mistakes
        .where("user_id")
        .equals(uid)
        .filter((m) => m.resolved && m.resolved_at < cutoff)
        .toArray()
        .catch(() => []);

      const ids = old.map((m) => m.id);
      if (ids.length > 0) {
        await db.user_mistakes.bulkDelete(ids);
      }
    } catch (err) {
      console.error("Failed to cleanup old mistakes:", err);
    }
  },
};
