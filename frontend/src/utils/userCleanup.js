import { db as tixarDb } from "./db";
import { db as shifterDb } from "../db/db";

const CURRENT_USER_ID_KEY = "shifter_current_user_id";

/** Wipe all local storage & IndexedDB user-scoped caches when switching accounts or logging out. */
export async function clearUserDataForUserSwitch() {
  try {
    await Promise.all([
      tixarDb.mastered.clear().catch(() => {}),
      shifterDb.user_progress.clear().catch(() => {}),
      shifterDb.user_mistakes.clear().catch(() => {}),
      shifterDb.user_notes.clear().catch(() => {}),
      shifterDb.spaced_reviews.clear().catch(() => {}),
    ]);
    localStorage.removeItem("Tixar_mastered");
    localStorage.removeItem("lastTopic");
    localStorage.removeItem("shifter_guest_quiz_count");
    localStorage.removeItem(CURRENT_USER_ID_KEY);
  } catch (err) {
    console.error("Error clearing user data for switch:", err);
  }
}
