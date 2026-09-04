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
  } catch {
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
  } catch {
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
// Delegates directly to modular database services in src/services/
// ─────────────────────────────────────────────────────────────

import { getActiveUserId } from "./supabase";
import { recordMistake, markMistakeResolved, fetchUnresolvedMistakes } from "./services/mistakeService";
import { updateProgress as serviceUpdateProgress, fetchUserProgress } from "./services/progressService";
import { upsertSpacedReview, fetchDueSpacedReviews } from "./services/reviewService";

/** Save a missed question to Supabase user_mistakes table via mistakeService. */
export async function saveMistake({ sid, cid, topicTitle, questionIndex, questionText, correctAnswer, solution }) {
  const record = await recordMistake({
    subjectId: sid,
    chapterKey: cid,
    topicTitle,
    questionIndex,
    questionText,
    correctAnswer,
    solution,
  });
  return Boolean(record);
}

/** Mark a mistake as resolved in Supabase via mistakeService. */
export async function resolveMistake({ cid, topicTitle, questionIndex }) {
  return await markMistakeResolved({
    chapterKey: cid,
    topicId: topicTitle,
    questionIndex,
  });
}

/** Fetch all unresolved mistakes from Supabase for current user via mistakeService. */
export async function fetchMistakes() {
  return await fetchUnresolvedMistakes();
}

/** Upsert an SM-2 spaced review schedule for a topic in Supabase via reviewService. */
export async function saveSpacedReview({ sid, cid, topicTitle, nextReviewAt, intervalDays, easeFactor, repetitions }) {
  const record = await upsertSpacedReview({
    subjectId: sid,
    chapterId: cid,
    topicId: topicTitle,
    topicTitle,
    nextReviewAt,
    intervalDays,
    repetitions,
    easeFactor,
  });
  return Boolean(record);
}

/** Fetch all due spaced reviews from Supabase for current user via reviewService. */
export async function fetchSpacedReviews() {
  return await fetchDueSpacedReviews();
}

/** Save or update a personal synthesis note for a topic in Supabase. */
export async function saveNote({ sid, cid, topicTitle, noteText }) {
  const userId = getActiveUserId();
  if (!userId || !supabase) return false;

  const topicTitleStr = topicTitle || "";

  const payload = {
    user_id: userId,
    topic_title: topicTitleStr,
    subject_id: sid || null,
    note_text: noteText || "",
    updated_at: new Date().toISOString(),
  };

  if (typeof topicTitle === "number" || /^\d+$/.test(topicTitle)) {
    payload.topic_id = parseInt(topicTitle, 10);
  }
  if (cid && (typeof cid === "number" || /^\d+$/.test(cid))) {
    payload.chapter_id = parseInt(cid, 10);
  }

  try {
    const { data: existing } = await supabase
      .from("user_notes")
      .select("id")
      .eq("user_id", userId)
      .eq("topic_title", topicTitleStr)
      .limit(1);

    if (existing && existing.length > 0) {
      const { error } = await supabase
        .from("user_notes")
        .update(payload)
        .eq("id", existing[0].id);
      if (error) {
        console.warn("[Supabase API] user_notes update warning:", error.message);
        return false;
      }
    } else {
      const { error } = await supabase.from("user_notes").insert(payload);
      if (error) {
        console.warn("[Supabase API] user_notes insert warning:", error.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error("[Supabase API] user_notes exception:", err);
    return false;
  }
}

/** Fetch personal note text for a specific topic from Supabase. */
export async function fetchNote(sid, cid, topicTitle) {
  const userId = getActiveUserId();
  if (!userId || !supabase) return "";
  try {
    const { data, error } = await supabase
      .from("user_notes")
      .select("note_text")
      .eq("user_id", userId)
      .or(`topic_title.eq.${topicTitle},topic_id.eq.${parseInt(topicTitle, 10) || 0}`)
      .limit(1);
    if (error || !data || data.length === 0) return "";
    return data[0].note_text || "";
  } catch (err) {
    console.error("[Supabase API] fetchNote exception:", err);
    return "";
  }
}

/** Enroll the current user in a subject in Supabase. */
export async function enroll(subjectId) {
  const userId = getActiveUserId();
  if (!userId || !supabase) return false;
  try {
    const { error } = await supabase.from("enrollments").upsert({
      user_id: userId,
      subject_id: subjectId,
      created_at: new Date().toISOString(),
    }, { onConflict: "user_id, subject_id" });
    if (error) console.warn("[Supabase API] enroll warning:", error.message);
    return !error;
  } catch (err) {
    console.error("[Supabase API] enroll exception:", err);
    return false;
  }
}

/** Fetch all enrolled subjects for the current user from Supabase. */
export async function fetchEnrollments() {
  const userId = getActiveUserId();
  if (!userId || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.warn("[Supabase API] fetchEnrollments warning:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[Supabase API] fetchEnrollments exception:", err);
    return [];
  }
}

/** Save topic progress to Supabase via progressService. */
export async function saveProgress({ sid, cid, topicTitle, completed, score, mastered, confidenceLevel }) {
  const record = await serviceUpdateProgress({
    subjectId: sid,
    chapterId: cid,
    topicId: topicTitle,
    topicTitle,
    completed: completed ?? false,
    masteryScore: score ?? 0,
    mastered: mastered ?? false,
    confidenceLevel: confidenceLevel ?? "medium",
  });
  return Boolean(record);
}

/** Fetch all progress records for the current user from Supabase via progressService. */
export async function fetchProgress() {
  return await fetchUserProgress();
}

/** Unlock/save an achievement in Supabase. */
export async function saveAchievement(achievementName) {
  const userId = getActiveUserId();
  if (!userId || !supabase) return false;
  try {
    // Check if already exists to avoid duplicates (no unique constraint required)
    const { data: existing } = await supabase
      .from("achievements")
      .select("id")
      .eq("user_id", userId)
      .eq("achievement_name", achievementName)
      .limit(1);

    if (existing && existing.length > 0) return true; // Already unlocked

    const { error } = await supabase.from("achievements").insert({
      user_id: userId,
      achievement_name: achievementName,
      unlocked_at: new Date().toISOString(),
    });
    if (error) console.warn("[Supabase API] saveAchievement warning:", error.message);
    return !error;
  } catch (err) {
    console.error("[Supabase API] saveAchievement exception:", err);
    return false;
  }
}

/** Fetch all achievements for the current user. */
export async function fetchAchievements() {
  const userId = getActiveUserId();
  if (!userId || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.warn("[Supabase API] fetchAchievements warning:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[Supabase API] fetchAchievements exception:", err);
    return [];
  }
}

// ----------------------------------------------------------------------------
// AUTOMATIC ONLINE SYNC RECOVERY
// ----------------------------------------------------------------------------
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    console.log("[Network] Connection restored. Auto-syncing progress with Supabase...");
    fetchProgress().catch(() => {});
  });
}


