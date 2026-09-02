import { getActiveSession } from "../supabase";

// Event-driven learning analytics telemetry queue and synchronization
const QUEUE_KEY = "shifter_learning_events";
const MAX_QUEUE_SIZE = 5000;

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
 * Helper to generate a random unique ID for event deduplication
 */
function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Retrieve all queued events from local storage
 */
export function getQueuedEvents() {
  try {
    const data = localStorage.getItem(QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("[Telemetry] Failed to read event queue from localStorage", e);
    return [];
  }
}

/**
 * Overwrite/save the queue to local storage
 */
export function saveQueuedEvents(events) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error("[Telemetry] Failed to save event queue to localStorage", e);
  }
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

  const events = getQueuedEvents();

  const newEvent = {
    id: generateId(),
    user_id: userId || null,
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

  // Prevent local queue overflow during prolonged offline periods
  if (events.length > MAX_QUEUE_SIZE) {
    events.splice(0, events.length - MAX_QUEUE_SIZE);
  }

  saveQueuedEvents(events);
  console.log(
    `[Telemetry] Recorded learning event: ${type} -> ${subjectId}/${chapterId || "general"}/${topic || "general"}`
  );

  // Trigger sync asynchronously in the background
  triggerSync();
}

/**
 * Backward-compatible legacy recordEvent wrapper
 * Maps (sid, cid, topic, type, userId) calls to recordLearningEvent
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

let syncInProgress = false;

/**
 * Sync queued events to backend in batches
 */
export async function triggerSync() {
  if (syncInProgress) return;

  const events = getQueuedEvents();
  if (events.length === 0) return;

  syncInProgress = true;
  const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const syncUrl = `${VITE_API_URL.replace(/\/$/, "")}/api/analytics/events`;

  // Capture the batch of event IDs we are trying to sync
  const batchToSync = [...events];
  const batchIds = new Set(batchToSync.map((e) => e.id));

  try {
    const session = await Promise.resolve(getActiveSession());
    const headers = {
      "Content-Type": "application/json",
    };
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    const res = await fetch(syncUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ events: batchToSync }),
    });

    if (res.ok) {
      console.log(`[Telemetry] Successfully synced ${batchToSync.length} events to the backend.`);
      // Retrieve the current queue state in case new events were added while syncing
      const currentEvents = getQueuedEvents();
      // Filter out only the events that we successfully synced
      const remainingEvents = currentEvents.filter((e) => !batchIds.has(e.id));
      saveQueuedEvents(remainingEvents);
    } else {
      console.warn(`[Telemetry] Sync failed with status: ${res.status}`);
    }
  } catch (err) {
    console.warn("[Telemetry] Sync failed (offline mode):", err.message);
  } finally {
    syncInProgress = false;
  }
}

/**
 * Clear all queued telemetry events from local storage
 */
export function clearQueuedEvents() {
  try {
    localStorage.removeItem(QUEUE_KEY);
    console.log("[Telemetry] Telemetry event queue cleared.");
  } catch (e) {
    console.error("[Telemetry] Failed to clear telemetry event queue", e);
  }
}

// Automatically retry sync when network connectivity returns or app boots
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    console.log("[Telemetry] Internet connection restored. Initiating telemetry sync.");
    triggerSync();
  });

  // Attempt initial sync shortly after module load
  setTimeout(() => triggerSync(), 1500);
}
