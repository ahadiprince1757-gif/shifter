import { db } from "../db/db";
import { saveMistake as apiSaveMistake, resolveMistake as apiResolveMistake, fetchMistakes } from "../api";
import { networkService } from "../services/networkService";
import { getActiveUserId } from "../supabase";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Enqueue a mutation so syncEngine can replay it when connectivity returns.
 */
async function enqueuePendingSync(op, payload) {
  try {
    await db.pending_mistake_sync.add({
      op,
      payload,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[MistakeRepo] Failed to enqueue pending sync:', err);
  }
}

/**
 * Attempt to push a single save/resolve operation to Supabase.
 * Returns true on success, false on any failure.
 */
async function pushToSupabase(op, payload) {
  try {
    if (op === 'save') {
      const ok = await apiSaveMistake(payload);
      return Boolean(ok);
    }
    if (op === 'resolve') {
      const ok = await apiResolveMistake(payload);
      return Boolean(ok);
    }
  } catch {
    // Network failure — will be retried later
  }
  return false;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const mistakeRepo = {
  /**
   * Save or update a missed question in IndexedDB, then sync to Supabase.
   * When offline the mutation is enqueued for later replay.
   */
  async saveMistake({ userId, topicId, subjectId, chapterId, questionIndex, questionText, correctAnswer, solution }) {
    try {
      const uid = userId || getActiveUserId();

      // 1. Always write to IndexedDB first (offline-safe)
      const existing = await db.user_mistakes
        .where('[user_id+topic_id+question_index]')
        .equals([uid, topicId, questionIndex])
        .first()
        .catch(() => null);

      if (existing) {
        await db.user_mistakes.update(existing.id, {
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
          question_text: questionText || '',
          correct_answer: correctAnswer || '',
          solution: solution || '',
          resolved: false,
          attempt_count: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      // 2. Try Supabase; if offline enqueue for later
      const apiPayload = {
        sid: subjectId,
        cid: chapterId,
        topicTitle: topicId,
        questionIndex,
        questionText: questionText || '',
        correctAnswer: correctAnswer || '',
        solution: solution || '',
      };

      if (uid && networkService.isOnline) {
        const ok = await pushToSupabase('save', apiPayload);
        if (!ok) {
          await enqueuePendingSync('save', apiPayload);
          console.warn(`[MistakeRepo] Queued save for retry: ${topicId} [Q#${questionIndex}]`);
        } else {
          console.log(`[MistakeRepo] Synced save: ${topicId} [Q#${questionIndex}]`);
        }
      } else {
        await enqueuePendingSync('save', apiPayload);
        console.log(`[MistakeRepo] Offline - queued save: ${topicId} [Q#${questionIndex}]`);
      }
    } catch (err) {
      console.error('[MistakeRepo] Failed to save mistake:', err);
    }
  },

  /**
   * Get all unresolved mistakes for a specific user.
   * Always reads from IndexedDB first (instant, offline-safe).
   * Hydrates from Supabase in the background without blocking the UI.
   */
  async getUnresolvedMistakes(userId) {
    try {
      const uid = userId || getActiveUserId();

      // 1. Return local data immediately
      const local = await db.user_mistakes
        .where('user_id')
        .equals(uid)
        .toArray()
        .catch(() => []);

      const unresolved = local.filter((m) => !m.resolved);

      // 2. Fire-and-forget hydration from Supabase (never blocks the return)
      if (uid && networkService.isOnline) {
        this._hydrateFromSupabase(uid).catch(() => {});
      }

      return unresolved;
    } catch (err) {
      console.error('[MistakeRepo] Failed to fetch unresolved mistakes:', err);
      return [];
    }
  },

  /**
   * Pull remote mistakes into IndexedDB without blocking the caller.
   * Only inserts records that do not exist locally yet.
   */
  async _hydrateFromSupabase(uid) {
    try {
      const remoteMistakes = await fetchMistakes();
      if (!Array.isArray(remoteMistakes) || remoteMistakes.length === 0) return;

      for (const m of remoteMistakes) {
        const topicId = m.topics?.title || m.topic_id?.toString() || '';
        const existing = await db.user_mistakes
          .where('[user_id+topic_id+question_index]')
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
            question_text: m.question_text || '',
            correct_answer: m.correct_answer || '',
            solution: m.solution || '',
            resolved: m.resolved || false,
            attempt_count: m.attempt_count || 1,
            created_at: m.created_at,
            updated_at: m.updated_at,
          }).catch(() => {});
        }
      }
    } catch {
      // Silently ignore — best-effort background operation
    }
  },

  /**
   * Transition mistake to PROVISIONALLY_FIXED (immediate retest correct).
   */
  async markProvisionallyFixed(topicId, questionIndex, { subjectId, chapterId, userId = null } = {}) {
    try {
      const uid = userId || getActiveUserId();
      const existing = await db.user_mistakes
        .where('[user_id+topic_id+question_index]')
        .equals([uid, topicId, questionIndex])
        .first()
        .catch(() => null);

      if (existing) {
        await db.user_mistakes.update(existing.id, {
          status: 'PROVISIONALLY_FIXED',
          provisionally_fixed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('[MistakeRepo] Failed to mark mistake provisionally fixed:', err);
    }
  },

  /**
   * Transition mistake to CONFIRMED_FIXED (spaced review probe correct).
   */
  async markConfirmedFixed(topicId, questionIndex, { subjectId, chapterId, userId = null } = {}) {
    return this.resolveMistake(topicId, questionIndex, { subjectId, chapterId, userId });
  },

  /**
   * Mark a specific mistake as resolved in IndexedDB and Supabase.
   * When offline the resolve is enqueued for later replay.
   */
  async resolveMistake(topicId, questionIndex, { subjectId, chapterId, userId = null } = {}) {
    try {
      const uid = userId || getActiveUserId();
      const existing = await db.user_mistakes
        .where('[user_id+topic_id+question_index]')
        .equals([uid, topicId, questionIndex])
        .first()
        .catch(() => null);

      if (existing) {
        // 1. Write locally first
        await db.user_mistakes.update(existing.id, {
          status: 'CONFIRMED_FIXED',
          resolved: true,
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        const sid = subjectId || existing.subject_id;
        const cid = chapterId || existing.chapter_id;
        const apiPayload = { sid, cid, topicTitle: topicId, questionIndex };

        if (sid && cid) {
          if (networkService.isOnline) {
            const ok = await pushToSupabase('resolve', apiPayload);
            if (!ok) {
              await enqueuePendingSync('resolve', apiPayload);
              console.warn(`[MistakeRepo] Queued resolve for retry: ${topicId} [Q#${questionIndex}]`);
            } else {
              console.log(`[MistakeRepo] Synced resolve: ${topicId} [Q#${questionIndex}]`);
            }
          } else {
            await enqueuePendingSync('resolve', apiPayload);
            console.log(`[MistakeRepo] Offline - queued resolve: ${topicId} [Q#${questionIndex}]`);
          }
        }
      }
    } catch (err) {
      console.error('[MistakeRepo] Failed to resolve mistake:', err);
    }
  },

  /**
   * Drain the pending_mistake_sync queue.
   * Called by syncEngine when connectivity is restored.
   * Returns the number of successfully flushed items.
   */
  async flushPendingSync() {
    let flushed = 0;
    try {
      const queue = await db.pending_mistake_sync
        .orderBy('created_at')
        .toArray()
        .catch(() => []);

      for (const item of queue) {
        const ok = await pushToSupabase(item.op, item.payload);
        if (ok) {
          await db.pending_mistake_sync.delete(item.id).catch(() => {});
          flushed++;
        } else {
          break; // Stop on first failure — retry next cycle
        }
      }

      if (flushed > 0) {
        console.log(`[MistakeRepo] Flushed ${flushed} pending sync item(s).`);
      }
    } catch (err) {
      console.error('[MistakeRepo] flushPendingSync error:', err);
    }
    return flushed;
  },

  /**
   * Return the number of operations currently sitting in the outbox.
   */
  async getPendingCount() {
    try {
      return await db.pending_mistake_sync.count();
    } catch {
      return 0;
    }
  },

  /**
   * Get mistakes divided into learner-facing buckets.
   */
  async getMistakesByLifecycle(userId) {
    const unresolved = await this.getUnresolvedMistakes(userId);
    const needsAttention = [];
    const provisionallyFixed = [];

    for (const m of unresolved) {
      if (m.status === 'PROVISIONALLY_FIXED') {
        provisionallyFixed.push(m);
      } else {
        needsAttention.push(m);
      }
    }

    return { needsAttention, provisionallyFixed };
  },

  /**
   * Clear resolved mistakes older than 30 days.
   */
  async cleanupOldResolved(userId = null) {
    try {
      const uid = userId || getActiveUserId();
      const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const old = await db.user_mistakes
        .where('user_id')
        .equals(uid)
        .filter((m) => m.resolved && m.resolved_at < cutoff)
        .toArray()
        .catch(() => []);

      const ids = old.map((m) => m.id);
      if (ids.length > 0) {
        await db.user_mistakes.bulkDelete(ids);
      }
    } catch (err) {
      console.error('[MistakeRepo] Failed to cleanup old mistakes:', err);
    }
  },

  /**
   * Alias for getUnresolvedMistakes to satisfy getUnresolved calls.
   */
  async getUnresolved(userId = null) {
    return this.getUnresolvedMistakes(userId);
  },
};