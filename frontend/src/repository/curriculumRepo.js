import { db } from "../db/db";
import { ACTIVE_SUBJECT_IDS } from "../data/subjectRegistry";

export const curriculumRepo = {
  /**
   * Fetch all active canonical curriculum records.
   */
  async getAll() {
    const records = await db.curriculum.toArray();
    // Silently purge non-canonical records if any exist locally
    const nonCanonical = records.filter(c => !ACTIVE_SUBJECT_IDS.includes(c.id));
    if (nonCanonical.length > 0) {
      Promise.all(nonCanonical.map(c => db.curriculum.delete(c.id))).catch(() => {});
    }
    return records.filter(c => !c.is_deleted && ACTIVE_SUBJECT_IDS.includes(c.id));
  },

  /**
   * Upsert an array of curriculum items (typically from DOWN sync).
   * @param {Array} items
   */
  async upsertBatch(items) {
    return db.curriculum.bulkPut(items);
  },

  /**
   * Mark a curriculum as deleted locally (soft delete).
   * @param {string} id
   */
  async softDelete(id) {
    return db.curriculum.update(id, { is_deleted: true });
  },
};
