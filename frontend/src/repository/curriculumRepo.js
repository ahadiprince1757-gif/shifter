import { db } from "../db/db";

export const curriculumRepo = {
  /**
   * Fetch all active curriculum records.
   */
  async getAll() {
    const records = await db.curriculum.toArray();
    return records.filter(c => !c.is_deleted);
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
