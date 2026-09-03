/**
 * ============================================================================
 * TIXAR USER DATA SCOPE MODULE
 * ============================================================================
 *
 * System-wide single source of truth for user-scoped storage key generation,
 * identity verification, and scope calculations.
 *
 * Core Rule: No student data may be created, read, updated, synchronized,
 * or deleted without an explicit, validated owner identity.
 * ============================================================================
 */

/**
 * Calculates a clean user scope string.
 *
 * @param {string|null} userId
 * @returns {string} `user_${userId}` or `guest`
 */
export function getUserScope(userId) {
  return userId ? `user_${userId}` : "guest";
}

/**
 * Generates a consistent scoped storage key for localStorage / IndexedDB keys.
 *
 * @param {string} baseKey
 * @param {string|null} userId
 * @returns {string} e.g. "tixar_learning_events:user_123"
 */
export function getScopedStorageKey(baseKey, userId) {
  if (!baseKey) {
    throw new Error("[Tixar Data Scope] baseKey is required.");
  }
  return `${baseKey}:${getUserScope(userId)}`;
}

/**
 * Asserts that a valid user identity is present. Throws if missing.
 *
 * @param {string|null} userId
 * @param {string} [contextName="Operation"]
 * @returns {string} The validated userId
 */
export function assertValidUserId(userId, contextName = "Operation") {
  if (!userId) {
    throw new Error(`[Tixar Data Scope] ${contextName} requires a valid user identity.`);
  }
  return userId;
}
