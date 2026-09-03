/**
 * ============================================================================
 * TIXAR USER SWITCH TRANSACTION MANAGER
 * ============================================================================
 *
 * Manages clean, identity-safe transitions when logging in, logging out,
 * or switching active student accounts.
 *
 * Sequence:
 * 1. Halt background sync for previous user.
 * 2. Clear in-memory application & diagnostic state.
 * 3. Update active user identity.
 * 4. Initialize only the newly authenticated user's data.
 * ============================================================================
 */

import { clearQueuedEventsForUser, haltSyncForUser } from "./analytics";
import { clearStudentMemoryCache } from "./studentMemoryModel";

const CURRENT_USER_ID_KEY = "shifter_current_user_id";

/**
 * Executes a transactional user switch.
 *
 * @param {Object} params
 * @param {string|null} params.previousUserId
 * @param {string|null} params.nextUserId
 */
export async function handleUserSwitch({ previousUserId = null, nextUserId = null } = {}) {
  try {
    // 1. Halt background sync for previous user
    if (previousUserId) {
      haltSyncForUser(previousUserId);
    }

    // 2. Clear in-memory diagnostic state & caches
    clearStudentMemoryCache();

    // 3. Update stored active user ID
    if (nextUserId) {
      localStorage.setItem(CURRENT_USER_ID_KEY, nextUserId);
    } else {
      localStorage.removeItem(CURRENT_USER_ID_KEY);
    }

    // 4. Clear temporary un-synced guest telemetry if transitioning to auth user
    if (!previousUserId && nextUserId) {
      clearQueuedEventsForUser(null);
    }

    console.log(`[User Switch] Transaction completed: ${previousUserId || "guest"} -> ${nextUserId || "guest"}`);
  } catch (err) {
    console.error("[User Switch] Error during user switch transaction:", err);
  }
}
