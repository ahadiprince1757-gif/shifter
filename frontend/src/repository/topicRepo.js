import { db } from "../db/db";

export const topicRepo = {
  /**
   * Fetch a specific topic by its identifiers.
   */
  async getTopic(curriculumId, chapterId, topicId) {
    const record = await db.topics.get(`${curriculumId}|${chapterId}|${topicId}`);
    if (
      record &&
      record.curriculum_id === curriculumId &&
      record.chapter_id === chapterId &&
      !record.is_deleted
    ) {
      return record;
    }
    return null;
  },

  /**
   * Fetch all topics for a given chapter.
   */
  async getTopicsByChapter(curriculumId, chapterId) {
    const records = await db.topics
      .where("curriculum_id")
      .equals(curriculumId)
      .toArray();

    return records.filter((r) => r.chapter_id === chapterId && !r.is_deleted);
  },

  /**
   * Upsert an array of topic items (from DOWN sync).
   */
  async upsertBatch(items) {
    return db.topics.bulkPut(items);
  },

  /**
   * Soft delete a topic.
   */
  async softDelete(topicId) {
    return db.topics.update(topicId, { is_deleted: true });
  },
};
