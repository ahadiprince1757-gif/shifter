import { db } from "../db/db";
import { saveProgress as apiSaveProgress } from "../api";
import { networkService } from "../services/networkService";
import { getActiveUserId } from "../supabase";

export const progressRepo = {
  /**
   * Save user progress locally AND sync to Supabase.
   * Writes to IndexedDB first (offline-first), then syncs to Supabase if online.
   *
   * @param {object} progressData
   * @param {string|null} progressData.userId       - authenticated user UUID
   * @param {string}      progressData.topicId      - topic title (local key)
   * @param {object}      [progressData.data]       - raw quiz result payload
   * @param {string}      [progressData.sid]        - subject ID (for Supabase sync)
   * @param {string}      [progressData.cid]        - chapter ID (for Supabase sync)
   * @param {boolean}     [progressData.completed]  - whether topic is completed
   * @param {number}      [progressData.score]      - quiz score 0-100
   * @param {boolean}     [progressData.mastered]   - whether topic is mastered
   * @param {string}      [progressData.confidenceLevel] - 'low'|'medium'|'high'
   */
  async saveProgress(progressData) {
    const userId = progressData.userId || getActiveUserId();
    const topicId = progressData.topicId;

    const progressRecord = {
      id: progressData.id || (userId ? `${userId}_${topicId}` : crypto.randomUUID()),
      user_id: userId,
      topic_id: topicId,
      data: progressData.data, // raw quiz results/score
      sync_status: "pending",
      updated_at: Date.now(),
    };

    // 1. Write to IndexedDB (always, offline-first)
    await db.transaction("rw", db.user_progress, db.change_log, async () => {
      await db.user_progress.put(progressRecord);

      // Add to sync queue
      await db.change_log.add({
        type: "progress_update",
        entity_id: progressRecord.id,
        payload: { ...progressData, userId }, // store full payload with resolved userId
        timestamp: Date.now(),
        synced: false,
      });
    });

    // 2. Sync to Supabase with visible status logging
    const { sid, cid, completed, score, mastered, confidenceLevel } = progressData;
    if (sid && cid && topicId && networkService.isOnline) {
      apiSaveProgress({
        sid,
        cid,
        topicTitle: topicId,
        completed: completed ?? false,
        score: score ?? null,
        mastered: mastered ?? false,
        confidenceLevel: confidenceLevel ?? null,
      })
      .then((success) => {
        if (success) {
          console.log(`[Tixar Sync] Topic progress synced successfully for ${topicId}`);
        } else {
          console.warn(`[Tixar Sync] Topic progress sync returned false for ${topicId}`);
        }
      })
      .catch((err) => {
        console.error(`[Tixar Sync] Failed to sync progress for ${topicId}:`, err);
      });
    }

    return progressRecord;
  },

  /**
   * Get all unsynced progress for UP sync.
   */
  async getUnsyncedProgress() {
    return db.user_progress.where("sync_status").equals("pending").toArray();
  },

  /**
   * Mark progress as synced locally.
   */
  async markSynced(id) {
    return db.user_progress.update(id, { sync_status: "synced" });
  },
};
