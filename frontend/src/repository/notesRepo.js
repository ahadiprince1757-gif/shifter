import { db } from "../db/db";
import { saveNote as apiSaveNote, fetchNote as apiFetchNote } from "../api";
import { networkService } from "../services/networkService";

export const notesRepo = {
  /**
   * Save or update personal notes for a topic.
   * Writes to IndexedDB first, then syncs to Supabase.
   *
   * @param {string} topicId   - Topic title (local key)
   * @param {string} noteText
   * @param {{ sid: string, cid: string, userId?: string }} meta - needed for Supabase sync and user isolation
   */
  async saveNote(topicId, noteText, meta = {}) {
    try {
      const { sid, cid, userId } = meta;
      const uid = userId || null;

      // 1. Write to IndexedDB (always, offline-first) using compound key [user_id+topic_id]
      await db.user_notes.put({
        user_id: uid,
        topic_id: topicId,
        note_text: noteText,
        updated_at: new Date().toISOString(),
      });

      // 2. Sync to Supabase (fire-and-forget, requires auth + online)
      if (sid && cid && networkService.isOnline) {
        apiSaveNote({
          sid,
          cid,
          topicTitle: topicId,
          noteText,
        }).catch(() => {}); // silently ignore if not logged in or offline
      }
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  },

  /**
   * Fetch personal note for a topic.
   * Tries local IndexedDB first, then falls back to Supabase if online.
   *
   * @param {string} topicId
   * @param {{ sid?: string, cid?: string, userId?: string }} meta - needed to scope to user and hydrate from remote
   * @returns {Promise<string>}
   */
  async getNote(topicId, meta = {}) {
    try {
      const { sid, cid, userId } = meta;
      const uid = userId || null;

      // 1. Try local IndexedDB first
      let record = null;
      if (uid) {
        record = await db.user_notes.get([uid, topicId]);
      } else {
        // Guest: try unscoped lookup (old primary key format fallback)
        const all = await db.user_notes.where("topic_id").equals(topicId).toArray();
        record = all.find(n => !n.user_id) || null;
      }

      if (record) return record.note_text || "";

      // 2. If online and authenticated, fetch from Supabase to hydrate local store
      if (uid && sid && cid && networkService.isOnline) {
        const remoteText = await apiFetchNote(sid, cid, topicId);
        if (remoteText) {
          // Hydrate local store
          await db.user_notes.put({
            user_id: uid,
            topic_id: topicId,
            note_text: remoteText,
            updated_at: new Date().toISOString(),
          }).catch(() => {});
        }
        return remoteText || "";
      }

      return "";
    } catch (err) {
      console.error("Failed to fetch note:", err);
      return "";
    }
  }
};
