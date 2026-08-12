import { db } from "../db/db";

export const progressRepo = {
  /**
   * Save user progress locally.
   * We also create a change_log entry for UP sync.
   */
  async saveProgress(progressData) {
    return db.transaction("rw", db.user_progress, db.change_log, async () => {
      // 1. Update the local view instantly
      const userId = progressData.userId || null;
      const progressRecord = {
        id: progressData.id || (userId ? `${userId}_${progressData.topicId}` : crypto.randomUUID()),
        user_id: userId,
        topic_id: progressData.topicId,
        data: progressData.data, // the actual quiz results/score
        sync_status: "pending",
        updated_at: Date.now(),
      };
      
      await db.user_progress.put(progressRecord);

      // 2. Add to the sync queue via change_log
      await db.change_log.add({
        type: "progress_update",
        entity_id: progressRecord.id,
        payload: progressRecord,
        timestamp: Date.now(),
        synced: false,
      });

      return progressRecord;
    });
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
