import { db as shifterDb } from "../db/db";
import { db as tixarDb } from "./db";
import { clearQueuedEvents } from "./analytics";

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
      tixarDb.mastered.clear().catch(() => {}),
    ]);

    // Clear local telemetry queue
    clearQueuedEvents();

    // Remove all known user-scoped localStorage keys
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

