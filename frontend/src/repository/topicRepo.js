import { db } from "../db/db";

export const topicRepo = {
  /**
   * Fetch a specific topic directly by primary key id.
   */
  async getById(id) {
    return db.topics.get(id);
  },

  /**
   * Fetch a specific topic by its identifiers.
   */
  async getTopic(curriculumId, chapterId, topicId) {
    if (!curriculumId || !chapterId || !topicId) return null;
    const cid = String(curriculumId).toLowerCase().trim();
    const chid = String(chapterId).trim();
    const rawTid = String(topicId);
    const cleanTid = rawTid.trim();

    // 1. Direct primary key lookup (clean trimmed)
    let record = await db.topics.get(`${cid}|${chid}|${cleanTid}`).catch(() => null);
    if (record && !record.is_deleted) return record;

    // 2. Direct primary key lookup with raw topicId just in case
    if (rawTid !== cleanTid) {
      record = await db.topics.get(`${cid}|${chid}|${rawTid}`).catch(() => null);
      if (record && !record.is_deleted) return record;
    }

    // 3. Resilient fallback across chapter topics (handles dashes, spacing & casing)
    try {
      const chapterTopics = await db.topics
        .where("curriculum_id")
        .equals(cid)
        .toArray();

      const norm = (s) =>
        String(s || "")
          .replace(/[\u2010-\u2015]/g, "-")
          .replace(/\s+/g, " ")
          .toLowerCase()
          .trim();

      const targetNorm = norm(cleanTid);
      const match = chapterTopics.find(
        (t) =>
          t.chapter_id === chid &&
          !t.is_deleted &&
          (norm(t.topic) === targetNorm || norm(t.id?.split("|")[2]) === targetNorm)
      );
      if (match) return match;
    } catch {
      // Dexie error / offline fallback
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
