import { db as shifterDb } from "../db/db";
import { db as tixarDb } from "./db";
import { clearQueuedEvents } from "./analytics";

const CURRENT_USER_ID_KEY = "shifter_current_user_id";

/** Clear local storage & IndexedDB user-scoped caches for a specific user when switching accounts. */
export async function clearUserDataForUserSwitch(userId = null) {
  try {
    // If a specific userId is passed, delete only records belonging to that user
    if (userId) {
      await Promise.all([
        shifterDb.user_progress.where("user_id").equals(userId).delete().catch(() => {}),
        shifterDb.user_mistakes.where("user_id").equals(userId).delete().catch(() => {}),
        shifterDb.user_notes.where("user_id").equals(userId).delete().catch(() => {}),
        shifterDb.spaced_reviews.where("user_id").equals(userId).delete().catch(() => {}),
      ]);
      console.log(`[Tixar] Cleared local IndexedDB data for user: ${userId}`);
    }

    // Clear local telemetry queue for guest and active session
    clearQueuedEvents();

    // Remove user-scoped localStorage keys
    localStorage.removeItem("Tixar_mastered");
    localStorage.removeItem("lastTopic");          // legacy unscoped key
    localStorage.removeItem("shifter_guest_quiz_count");
    localStorage.removeItem(CURRENT_USER_ID_KEY);

    // Remove user-scoped keys for this user
    if (userId) {
      localStorage.removeItem(`lastTopic_${userId}`);
      localStorage.removeItem(`Tixar_mastered_${userId}`);
    }

    // Remove any other stale lastTopic_* or Tixar_mastered_* keys left on this device
    Object.keys(localStorage)
      .filter((k) => k.startsWith("lastTopic_") || k.startsWith("Tixar_mastered_"))
      .forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error("Error clearing user data for switch:", err);
  }
}

/** Transfer guest study records created before log-in to the newly authenticated user_id. */
export async function migrateGuestDataToUser(newUserId) {
  if (!newUserId) return;
  try {
    const guestProgress = await shifterDb.user_progress.filter((p) => !p.user_id).toArray().catch(() => []);
    for (const p of guestProgress) {
      await shifterDb.user_progress.put({ ...p, user_id: newUserId });
    }

    const guestMistakes = await shifterDb.user_mistakes.filter((m) => !m.user_id).toArray().catch(() => []);
    for (const m of guestMistakes) {
      await shifterDb.user_mistakes.put({ ...m, user_id: newUserId });
    }

    const guestReviews = await shifterDb.spaced_reviews.filter((r) => !r.user_id).toArray().catch(() => []);
    for (const r of guestReviews) {
      await shifterDb.spaced_reviews.delete([null, r.topic_id]).catch(() => {});
      await shifterDb.spaced_reviews.put({ ...r, user_id: newUserId });
    }

    const guestNotes = await shifterDb.user_notes.filter((n) => !n.user_id).toArray().catch(() => []);
    for (const n of guestNotes) {
      await shifterDb.user_notes.delete([null, n.topic_id]).catch(() => {});
      await shifterDb.user_notes.put({ ...n, user_id: newUserId });
    }
  } catch (err) {
    console.error("Error migrating guest data to user:", err);
  }
}

