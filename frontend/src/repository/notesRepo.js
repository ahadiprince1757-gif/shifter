import { db } from "../db/db";

export const notesRepo = {
  /**
   * Save or update custom personal notes for a topic.
   */
  async saveNote(topicId, noteText) {
    try {
      return await db.user_notes.put({
        topic_id: topicId,
        note_text: noteText,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  },

  /**
   * Fetch personal note for a topic.
   */
  async getNote(topicId) {
    try {
      const record = await db.user_notes.get(topicId);
      return record ? record.note_text : "";
    } catch (err) {
      console.error("Failed to fetch note:", err);
      return "";
    }
  }
};
