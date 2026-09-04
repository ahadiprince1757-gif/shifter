import { getActiveSession, getActiveUserId } from "../supabase";
import { getScopedStorageKey } from "./userDataScope";

const QUEUE_BASE_KEY = "tixar_learning_events";
const MAX_QUEUE_SIZE = 5000;
const DUP_WINDOW_MS = 2000; // 2-second deduplication window for identical event payloads
const recentEventsCache = new Map();
const activeSyncs = new Set();

/**
 * Checks whether an event is a rapid duplicate recorded within DUP_WINDOW_MS
 */
function isRapidDuplicate(userId, type, subjectId, chapterId, topic) {
  const key = `${userId || "guest"}:${type}:${subjectId}:${chapterId || "general"}:${topic || "general"}`;
  const now = Date.now();
  const lastTimestamp = recentEventsCache.get(key);

  if (lastTimestamp && (now - lastTimestamp < DUP_WINDOW_MS)) {
    return true; // Suppress rapid duplicate within 2s
  }

  recentEventsCache.set(key, now);

  // Evict stale entries older than 10 seconds to keep cache lightweight
  if (recentEventsCache.size > 1000) {
    for (const [k, time] of recentEventsCache.entries()) {
      if (now - time > 10000) recentEventsCache.delete(k);
    }
  }

  return false;
}

/**
 * Standardized Learning Event Vocabulary for Tixar's Student Brain
 */
export const LEARNING_EVENTS = {
  // Content interaction
  LESSON_OPENED: "lesson_opened",
  LESSON_COMPLETED: "lesson_completed",

  // Questions & Exercises
  QUESTION_STARTED: "question_started",
  QUESTION_ANSWERED: "question_answered",
  QUESTION_CORRECT: "question_correct",
  QUESTION_INCORRECT: "question_incorrect",

  // Learning Support & Scaffolding
  HINT_REQUESTED: "hint_requested",
  EXPLANATION_VIEWED: "explanation_viewed",

  // Assessment & Evaluation
  ASSESSMENT_STARTED: "assessment_started",
  ASSESSMENT_COMPLETED: "assessment_completed",

  // Revision & Retention
  TOPIC_REVIEWED: "topic_reviewed",
};

/**
 * Helper to generate a random unique UUID for event deduplication
 */
function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Calculates storage key scoped strictly to userId
 */
function getQueueStorageKey(userId) {
  return getScopedStorageKey(QUEUE_BASE_KEY, userId || getActiveUserId());
}

/**
 * Retrieve all queued events for a specific user from local storage
 */
export function getQueuedEvents(userId = null) {
  try {
    const activeUserId = userId || getActiveUserId();
    const key = getQueueStorageKey(activeUserId);
    const data = localStorage.getItem(key);
    const events = data ? JSON.parse(data) : [];

    // Defensive filtering: ensure only events belonging to target userId are returned
    return events.filter((evt) => (evt.user_id || null) === (activeUserId || null));
  } catch (e) {
    console.error("[Telemetry] Failed to read event queue from localStorage", e);
    return [];
  }
}

/**
 * Overwrite/save the queue for a specific user to local storage
 */
export function saveQueuedEvents(userId, events) {
  try {
    const targetUserId = userId || getActiveUserId();
    const key = getQueueStorageKey(targetUserId);
    const safeEvents = events.filter((evt) => (evt.user_id || null) === (targetUserId || null));
    localStorage.setItem(key, JSON.stringify(safeEvents));
  } catch (e) {
    console.error("[Telemetry] Failed to save event queue to localStorage", e);
  }
}

/**
 * Halt background sync for a specific user
 */
export function haltSyncForUser(userId) {
  if (userId) {
    activeSyncs.delete(userId);
  }
}

/**
 * Clear queued events for a specific user
 */
export function clearQueuedEventsForUser(userId = null) {
  try {
    const activeUserId = userId || getActiveUserId();
    const key = getQueueStorageKey(activeUserId);
    localStorage.removeItem(key);
    console.log(`[Telemetry] Cleared telemetry event queue for ${activeUserId || "guest"}`);
  } catch (e) {
    console.error("[Telemetry] Failed to clear telemetry event queue", e);
  }
}

/**
 * Backward compatible clearQueuedEvents (clears guest and active session events)
 */
export function clearQueuedEvents() {
  const userId = getActiveUserId();
  clearQueuedEventsForUser(userId);
  clearQueuedEventsForUser(null);
}

/**
 * Flexible Educational Learning Event Recorder
 * Captures student action, CBC curriculum mapping, performance, and context.
 */
export function recordLearningEvent({
  subjectId,
  chapterId = null,
  topic = null,
  type,
  userId = null,

  // CBC curriculum mapping
  strand = null,
  subStrand = null,
  learningOutcomeId = null,

  // Performance & Assessment
  correct = null,
  score = null,
  questionId = null,
  questionType = null,

  // Behavior
  timeSpentSeconds = null,
  attempts = null,
  hintsUsed = 0,

  metadata = {},
}) {
  if (!subjectId || !type) {
    console.warn("[Telemetry] Skipping event record: subjectId and type are required.");
    return;
  }

  const activeUserId = userId || getActiveUserId();

  // Defense-in-depth: Suppress rapid duplicate event recordings within 2-second window
  if (isRapidDuplicate(activeUserId, type, subjectId, chapterId, topic)) {
    console.warn(`[Telemetry] Suppressed rapid duplicate event (${type}) within ${DUP_WINDOW_MS}ms window.`);
    return;
  }

  const events = getQueuedEvents(activeUserId);

  const newEvent = {
    id: generateId(),
    user_id: activeUserId,
    subject_id: subjectId,
    chapter_id: chapterId || null,
    topic: topic || null,

    strand: strand || null,
    sub_strand: subStrand || null,
    learning_outcome_id: learningOutcomeId || null,

    event_type: type,

    correct: correct ?? null,
    score: score ?? null,

    question_id: questionId || null,
    question_type: questionType || null,

    time_spent_seconds: timeSpentSeconds ?? null,
    attempts: attempts ?? null,
    hints_used: hintsUsed ?? 0,

    metadata: metadata || {},

    created_at: new Date().toISOString(),
  };

  events.push(newEvent);

  if (events.length > MAX_QUEUE_SIZE) {
    events.splice(0, events.length - MAX_QUEUE_SIZE);
  }

  saveQueuedEvents(activeUserId, events);
  console.log(
    `[Telemetry] Recorded learning event: ${type} -> ${subjectId}/${chapterId || "general"}/${topic || "general"} [${activeUserId || "guest"}]`
  );

  // Trigger sync asynchronously in the background
  triggerSync(activeUserId);
}

/**
 * Backward-compatible legacy recordEvent wrapper
 */
export function recordEvent(sid, cid, topic, type, userId = null) {
  const mappedType =
    type === "pass"
      ? LEARNING_EVENTS.QUESTION_CORRECT
      : type === "fail"
      ? LEARNING_EVENTS.QUESTION_INCORRECT
      : type === "visit"
      ? LEARNING_EVENTS.LESSON_OPENED
      : type;

  recordLearningEvent({
    subjectId: sid,
    chapterId: cid,
    topic,
    type: mappedType,
    userId,
    correct: type === "pass" ? true : type === "fail" ? false : null,
  });
}

/**
 * Sync queued events to backend with identity validation & double-check safety
 */
export async function triggerSync(targetUserId = null) {
  const session = getActiveSession();
  const activeUserId = targetUserId || session?.user?.id || session?.user_id || null;

  if (!activeUserId) return; // Do not push unauthenticated guest telemetry to server
  if (activeSyncs.has(activeUserId)) return;

  const events = getQueuedEvents(activeUserId);
  if (events.length === 0) return;

  activeSyncs.add(activeUserId);
  const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const syncUrl = `${VITE_API_URL.replace(/\/$/, "")}/api/analytics/events`;

  const safeEvents = events.filter((e) => e.user_id === activeUserId);
  if (safeEvents.length === 0) {
    activeSyncs.delete(activeUserId);
    return;
  }

  const batchIds = new Set(safeEvents.map((e) => e.id));

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    const res = await fetch(syncUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ events: safeEvents }),
    });

    if (res.ok) {
      // Re-verify session identity before mutating local storage queue
      const latestSession = getActiveSession();
      const latestUserId = latestSession?.user?.id || latestSession?.user_id || null;

      if (latestUserId !== activeUserId) {
        console.warn(`[Telemetry] User changed during sync (${activeUserId} -> ${latestUserId}). Preserving queue.`);
        return;
      }

      console.log(`[Telemetry] Successfully synced ${safeEvents.length} events for user ${activeUserId}.`);
      const currentEvents = getQueuedEvents(activeUserId);
      const remainingEvents = currentEvents.filter((e) => !batchIds.has(e.id));
      saveQueuedEvents(activeUserId, remainingEvents);
    } else {
      console.warn(`[Telemetry] Sync failed with status: ${res.status}`);
    }
  } catch (err) {
    console.warn("[Telemetry] Sync failed (offline mode):", err.message);
  } finally {
    activeSyncs.delete(activeUserId);
  }
}

// Retry sync on reconnection
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    const session = getActiveSession();
    const activeUserId = session?.user?.id || session?.user_id || null;
    if (activeUserId) {
      console.log("[Telemetry] Internet connection restored. Initiating telemetry sync.");
      triggerSync(activeUserId);
    }
  });

  setTimeout(() => {
    const session = getActiveSession();
    const activeUserId = session?.user?.id || session?.user_id || null;
    if (activeUserId) triggerSync(activeUserId);
  }, 1500);
}
