import { db } from "../db/db";
import { saveNote as apiSaveNote } from "../api";
import { networkService } from "../services/networkService";

export const notesRepo = {
  /**
   * Save or update personal notes for a topic.
   * Writes to IndexedDB first, then syncs to Supabase.
   *
   * @param {string} topicId   - Topic title (local key)
   * @param {string} noteText
   * @param {{ sid: string, cid: string }} meta - needed for Supabase sync
   */
  async saveNote(topicId, noteText, meta = {}) {
    try {
      // 1. Write to IndexedDB (always)
      await db.user_notes.put({
        topic_id: topicId,
        note_text: noteText,
        updated_at: new Date().toISOString(),
      });

      // 2. Sync to Supabase (fire-and-forget)
      const { sid, cid } = meta;
      if (sid && cid && networkService.isOnline) {
        apiSaveNote({
          sid,
          cid,
          topicTitle: topicId,
          noteText,
        }).catch(() => {});
      }
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  },

  /**
   * Fetch personal note for a topic (from IndexedDB).
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
