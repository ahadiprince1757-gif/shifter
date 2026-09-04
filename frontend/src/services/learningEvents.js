import { supabase, getActiveUserId } from "../supabase";

/**
 * Log a student behavioral learning event to Supabase.
 *
 * @param {Object} params
 * @param {string} [params.userId]
 * @param {string} params.eventType - lesson_started, lesson_completed, question_answered, hint_requested, topic_mastered, etc.
 * @param {string} [params.subjectId]
 * @param {number|string} [params.chapterId]
 * @param {number|string} [params.topicId]
 * @param {number|string} [params.questionId]
 * @param {Object} [params.metadata={}]
 */
export async function logLearningEvent({
  userId = null,
  eventType,
  subjectId = null,
  chapterId = null,
  topicId = null,
  questionId = null,
  metadata = {},
}) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase || !eventType) {
    return false;
  }

  const payload = {
    user_id: activeUserId,
    event_type: eventType,
    metadata: metadata || {},
    created_at: new Date().toISOString(),
  };

  if (subjectId) payload.subject_id = subjectId;
  if (chapterId && (typeof chapterId === "number" || /^\d+$/.test(chapterId))) {
    payload.chapter_id = parseInt(chapterId, 10);
  }
  if (topicId && (typeof topicId === "number" || /^\d+$/.test(topicId))) {
    payload.topic_id = parseInt(topicId, 10);
  }
  if (questionId && (typeof questionId === "number" || /^\d+$/.test(questionId))) {
    payload.question_id = parseInt(questionId, 10);
  }

  try {
    const { error } = await supabase.from("learning_events").insert(payload);
    if (error) {
      console.warn("[learningEvents] Event log warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[learningEvents] Exception logging event:", err);
    return false;
  }
}

/**
 * Batch insert learning events.
 */
export async function batchLogLearningEvents(events = []) {
  const activeUserId = getActiveUserId();
  if (!activeUserId || !supabase || !Array.isArray(events) || events.length === 0) {
    return false;
  }

  const rows = events.map((evt) => ({
    user_id: evt.user_id || activeUserId,
    event_type: evt.event_type || evt.type || "generic_event",
    subject_id: evt.subject_id || evt.sid || null,
    metadata: evt.metadata || evt.payload || {},
    created_at: evt.created_at || new Date().toISOString(),
  }));

  try {
    const { error } = await supabase.from("learning_events").insert(rows);
    if (error) {
      console.warn("[learningEvents] Batch log warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[learningEvents] Exception batch logging events:", err);
    return false;
  }
}
