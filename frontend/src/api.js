import logger from "./utils/logger";
import { supabase, getActiveSession } from "./supabase";
import { curriculumRepo } from "./repository/curriculumRepo";
import { topicRepo } from "./repository/topicRepo";

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

function isOfflineOrNotFound(r, err) {
  if (err) return true;
  if (!r) return true;
  return r.status === 404 || r.status === 502 || r.status === 503 || !r.ok;
}

export async function fetchCurriculum() {
  const startTime = Date.now();
  try {
    const r = await fetch(`${API_BASE}/curriculum`, { headers: getAuthHeaders() });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      console.warn("[API] Remote curriculum endpoint unavailable. Using local database fallback.");
      return await curriculumRepo.getAll();
    }

    logger.api("GET", "/api/curriculum", r.status, { responseTime });
    return await r.json();
  } catch (error) {
    console.warn("[API] Network unavailable for curriculum. Using local IndexedDB fallback.");
    return await curriculumRepo.getAll();
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
      console.warn(`[API] Remote content unavailable for ${topic}. Using local fallback.`);
      const cached = await topicRepo.getById(`${sid}|${cid}|${topic}`);
      return cached?.data || null;
    }

    logger.api("GET", endpoint, r.status, {
      responseTime,
      subject: sid,
      chapter: cid,
      topic,
    });
    return await r.json();
  } catch (error) {
    console.warn(`[API] Network offline for topic content (${topic}). Using local fallback.`);
    const cached = await topicRepo.getById(`${sid}|${cid}|${topic}`);
    return cached?.data || null;
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
//                   Enrollments, Progress, Achievements
// Directly queries Supabase tables with user_id scoping.
// Returns empty fallback when unauthenticated or offline.
// ─────────────────────────────────────────────────────────────

/** Save a missed question to Supabase user_mistakes table. */
export async function saveMistake({ sid, cid, topicTitle, questionIndex, questionText, correctAnswer, solution }) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;

  const payload = {
    user_id: session.user.id,
    subject_id: sid || null,
    chapter_key: cid || null,
    topic_title: topicTitle || "",
    question_index: typeof questionIndex === "number" ? questionIndex : (parseInt(questionIndex, 10) || 0),
    question_text: questionText || "",
    correct_answer: correctAnswer || "",
    solution: solution || "",
    resolved: false,
  };

  if (typeof topicTitle === "number" || /^\d+$/.test(topicTitle)) {
    payload.topic_id = parseInt(topicTitle, 10);
  }

  try {
    const { error } = await supabase.from("user_mistakes").insert(payload);
    if (error) {
      console.warn("[Supabase] user_mistakes insert warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] user_mistakes error:", err);
    return false;
  }
}

/** Mark a mistake as resolved in Supabase. */
export async function resolveMistake({ sid, cid, topicTitle, questionIndex }) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;
  try {
    let query = supabase
      .from("user_mistakes")
      .update({ resolved: true })
      .eq("user_id", session.user.id)
      .eq("question_index", questionIndex);

    if (typeof topicTitle === "number" || /^\d+$/.test(topicTitle)) {
      query = query.eq("topic_id", parseInt(topicTitle, 10));
    } else if (cid) {
      query = query.eq("chapter_key", cid);
    }

    const { error } = await query;
    return !error;
  } catch {
    return false;
  }
}

/** Fetch all unresolved mistakes from Supabase for current user. */
export async function fetchMistakes() {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("user_mistakes")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("resolved", false);
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

/** Upsert an SM-2 spaced review schedule for a topic in Supabase. */
export async function saveSpacedReview({ sid, cid, topicTitle, nextReviewAt, intervalDays, easeFactor, repetitions }) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;

  const payload = {
    user_id: session.user.id,
    topic_title: topicTitle || "",
    subject_id: sid || null,
    chapter_id: cid || null,
    next_review_at: nextReviewAt,
    interval_days: intervalDays,
    ease_factor: easeFactor,
    repetitions: repetitions,
    updated_at: new Date().toISOString(),
  };

  if (typeof topicTitle === "number" || /^\d+$/.test(topicTitle)) {
    payload.topic_id = parseInt(topicTitle, 10);
  }

  try {
    const { error } = await supabase.from("spaced_reviews").upsert(payload);
    if (error) {
      console.warn("[Supabase] spaced_reviews upsert warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] spaced_reviews error:", err);
    return false;
  }
}

/** Fetch all due spaced reviews from Supabase for current user. */
export async function fetchSpacedReviews() {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("spaced_reviews")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

/** Save or update a personal synthesis note for a topic in Supabase. */
export async function saveNote({ sid, cid, topicTitle, noteText }) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;

  const payload = {
    user_id: session.user.id,
    topic_title: topicTitle || "",
    subject_id: sid || null,
    chapter_id: cid || null,
    note_text: noteText || "",
    updated_at: new Date().toISOString(),
  };

  if (typeof topicTitle === "number" || /^\d+$/.test(topicTitle)) {
    payload.topic_id = parseInt(topicTitle, 10);
  }

  try {
    const { error } = await supabase.from("user_notes").upsert(payload);
    if (error) {
      console.warn("[Supabase] user_notes upsert warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] user_notes error:", err);
    return false;
  }
}

/** Fetch personal note text for a specific topic from Supabase. */
export async function fetchNote(sid, cid, topicTitle) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return "";
  try {
    const { data, error } = await supabase
      .from("user_notes")
      .select("note_text")
      .eq("user_id", session.user.id)
      .or(`topic_title.eq.${topicTitle},topic_id.eq.${parseInt(topicTitle, 10) || 0}`)
      .limit(1);
    if (error || !data || data.length === 0) return "";
    return data[0].note_text || "";
  } catch {
    return "";
  }
}

/** Enroll the current user in a subject in Supabase. */
export async function enroll(subjectId) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;
  try {
    const { error } = await supabase.from("enrollments").upsert({
      user_id: session.user.id,
      subject_id: subjectId,
      created_at: new Date().toISOString(),
    }, { onConflict: "user_id, subject_id" });
    return !error;
  } catch {
    return false;
  }
}

/** Fetch all enrolled subjects for the current user from Supabase. */
export async function fetchEnrollments() {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

/** Save topic progress to Supabase. */
export async function saveProgress({ sid, cid, topicTitle, completed, score, mastered, confidenceLevel }) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;

  const payload = {
    user_id: session.user.id,
    topic_title: topicTitle || "",
    subject_id: sid || null,
    chapter_id: cid || null,
    completed: completed ?? false,
    score: score ?? null,
    mastered: mastered ?? false,
    confidence_level: confidenceLevel ?? null,
    updated_at: new Date().toISOString(),
  };

  if (typeof topicTitle === "number" || /^\d+$/.test(topicTitle)) {
    payload.topic_id = parseInt(topicTitle, 10);
  }

  try {
    const { error } = await supabase.from("progress").upsert(payload);
    if (error) {
      console.warn("[Supabase] progress upsert warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Supabase] progress error:", err);
    return false;
  }
}

/** Fetch all progress records for the current user from Supabase. */
export async function fetchProgress() {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

/** Unlock/save an achievement in Supabase. */
export async function saveAchievement(achievementName) {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return false;
  try {
    const { error } = await supabase.from("achievements").upsert({
      user_id: session.user.id,
      achievement_name: achievementName,
      unlocked_at: new Date().toISOString(),
    }, { onConflict: "user_id, achievement_name" });
    return !error;
  } catch {
    return false;
  }
}

/** Fetch all achievements for the current user. */
export async function fetchAchievements() {
  const session = getActiveSession();
  if (!session?.user?.id || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}


