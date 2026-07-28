import logger from "./utils/logger";
import { getActiveSession } from "./supabase";

// Base API URL – taken from env or fallback to localhost during dev
const raw = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://shifter-i49i.onrender.com" : "http://localhost:3001");
const API_BASE = raw.replace(/\/$/, "") + "/api";

/** Helper to retrieve auth headers from Supabase session */
function getAuthHeaders() {
  const session = getActiveSession();
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }
  return {};
}

export async function fetchCurriculum() {
  const startTime = Date.now();
  try {
    const r = await fetch(`${API_BASE}/curriculum`, { headers: getAuthHeaders() });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("GET", "/api/curriculum", r.status, {
        responseTime,
        error: "Failed to fetch curriculum",
      });
      throw new Error("Failed to fetch curriculum");
    }

    logger.api("GET", "/api/curriculum", r.status, { responseTime });
    return r.json();
  } catch (error) {
    logger.error("FETCH_CURRICULUM", error);
    throw error;
  }
}

export async function fetchTopicContent(sid, cid, topic) {
  const startTime = Date.now();
  const endpoint = `/api/content/${sid}/${cid}/${topic}`;

  try {
    const r = await fetch(
      `${API_BASE}/content/${encodeURIComponent(sid)}/${encodeURIComponent(cid)}/${encodeURIComponent(topic)}`,
      { headers: getAuthHeaders() }
    );
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("GET", endpoint, r.status, {
        responseTime,
        subject: sid,
        chapter: cid,
        topic,
        error: "Failed to fetch topic content",
      });
      throw new Error("Failed to fetch topic content");
    }

    logger.api("GET", endpoint, r.status, {
      responseTime,
      subject: sid,
      chapter: cid,
      topic,
    });
    return r.json();
  } catch (error) {
    logger.error("FETCH_TOPIC_CONTENT", error, {
      subject: sid,
      chapter: cid,
      topic,
    });
    throw error;
  }
}

export async function gradeAnswer(payload) {
  const startTime = Date.now();

  try {
    const r = await fetch(`${API_BASE}/grade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("POST", "/api/grade", r.status, {
        responseTime,
        questionId: payload.qId,
        error: "Failed to grade answer",
      });
      throw new Error("Failed to grade answer");
    }

    const result = await r.json();
    logger.api("POST", "/api/grade", r.status, {
      responseTime,
      questionId: payload.qId,
      isCorrect: result.isCorrect,
    });
    return result;
  } catch (error) {
    logger.error("GRADE_ANSWER", error, { questionId: payload.qId });
    throw error;
  }
}

export async function fetchAnalytics() {
  const startTime = Date.now();
  try {
    const r = await fetch(`${API_BASE}/analytics`, { headers: getAuthHeaders() });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("GET", "/api/analytics", r.status, {
        responseTime,
        error: "Failed to fetch analytics",
      });
      throw new Error("Failed to fetch analytics");
    }

    logger.api("GET", "/api/analytics", r.status, { responseTime });
    return r.json();
  } catch (error) {
    logger.error("FETCH_ANALYTICS", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
// LEARNING FEATURES: Mistakes, Spaced Reviews, Notes,
//                   Enrollments, Progress
// All silently no-op if the user is offline or unauthenticated —
// local IndexedDB is always the source of truth.
// ─────────────────────────────────────────────────────────────

async function silentPost(endpoint, body) {
  try {
    const r = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(body),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function silentPatch(endpoint, body) {
  try {
    const r = await fetch(`${API_BASE}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(body),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/** Save a missed question to Supabase. Silently fails when offline/unauthenticated. */
export async function saveMistake({ sid, cid, topicTitle, questionIndex, questionText, correctAnswer, solution }) {
  return silentPost("/mistakes", { sid, cid, topicTitle, questionIndex, questionText, correctAnswer, solution });
}

/** Mark a mistake as resolved in Supabase. */
export async function resolveMistake({ sid, cid, topicTitle, questionIndex }) {
  return silentPatch("/mistakes/resolve", { sid, cid, topicTitle, questionIndex });
}

/** Fetch all unresolved mistakes from Supabase (falls back to [] on error). */
export async function fetchMistakes() {
  try {
    const r = await fetch(`${API_BASE}/mistakes`, { headers: getAuthHeaders() });
    if (!r.ok) return [];
    return r.json();
  } catch {
    return [];
  }
}

/** Upsert an SM-2 spaced review schedule for a topic. */
export async function saveSpacedReview({ sid, cid, topicTitle, nextReviewAt, intervalDays, easeFactor, repetitions }) {
  return silentPost("/spaced-reviews", { sid, cid, topicTitle, nextReviewAt, intervalDays, easeFactor, repetitions });
}

/** Fetch all due spaced reviews from Supabase (falls back to [] on error). */
export async function fetchSpacedReviews() {
  try {
    const r = await fetch(`${API_BASE}/spaced-reviews`, { headers: getAuthHeaders() });
    if (!r.ok) return [];
    return r.json();
  } catch {
    return [];
  }
}

/** Save or update a personal synthesis note for a topic. */
export async function saveNote({ sid, cid, topicTitle, noteText }) {
  return silentPost("/notes", { sid, cid, topicTitle, noteText });
}

/** Fetch personal note text for a specific topic. Returns '' on error. */
export async function fetchNote(sid, cid, topicTitle) {
  try {
    const r = await fetch(
      `${API_BASE}/notes/${encodeURIComponent(sid)}/${encodeURIComponent(cid)}/${encodeURIComponent(topicTitle)}`,
      { headers: getAuthHeaders() }
    );
    if (!r.ok) return "";
    const data = await r.json();
    return data.note_text || "";
  } catch {
    return "";
  }
}

/** Enroll the current user in a subject. */
export async function enroll(subjectId) {
  return silentPost("/enroll", { subjectId });
}

/** Fetch all enrolled subjects for the current user. */
export async function fetchEnrollments() {
  try {
    const r = await fetch(`${API_BASE}/enrollments`, { headers: getAuthHeaders() });
    if (!r.ok) return [];
    return r.json();
  } catch {
    return [];
  }
}

/** Save topic progress (completion, score, mastered, confidence) to Supabase. */
export async function saveProgress({ sid, cid, topicTitle, completed, score, mastered, confidenceLevel }) {
  return silentPost("/progress", { sid, cid, topicTitle, completed, score, mastered, confidenceLevel });
}

