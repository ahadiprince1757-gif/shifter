import { db as shifterDb } from "../db/db";

const CURRENT_USER_ID_KEY = "shifter_current_user_id";

/** Wipe all local storage & IndexedDB user-scoped caches when switching accounts or logging out. */
export async function clearUserDataForUserSwitch(userId) {
  try {
    await Promise.all([
      shifterDb.user_progress.clear().catch(() => {}),
      shifterDb.user_mistakes.clear().catch(() => {}),
      shifterDb.user_notes.clear().catch(() => {}),
      shifterDb.spaced_reviews.clear().catch(() => {}),
      shifterDb.change_log.clear().catch(() => {}),
    ]);

    // Remove all known user-scoped localStorage keys
    localStorage.removeItem("Tixar_mastered");
    localStorage.removeItem("lastTopic");          // legacy unscoped key
    localStorage.removeItem("shifter_guest_quiz_count");
    localStorage.removeItem(CURRENT_USER_ID_KEY);

    // Remove the new user-scoped lastTopic key for this specific user
    if (userId) localStorage.removeItem(`lastTopic_${userId}`);

    // Remove any other stale lastTopic_* keys left by other users on this device
    Object.keys(localStorage)
      .filter((k) => k.startsWith("lastTopic_"))
      .forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error("Error clearing user data for switch:", err);
  }
}
