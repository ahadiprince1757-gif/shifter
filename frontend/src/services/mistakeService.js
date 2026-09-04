import { supabase, getActiveUserId } from "../supabase";

/**
 * Record a mistake attempt with diagnostic intelligence JSONB payload.
 *
 * @param {Object} params
 * @param {string} [params.userId]
 * @param {number|string} [params.questionAttemptId]
 * @param {number|string} [params.questionId]
 * @param {number|string} [params.topicId]
 * @param {string} [params.topicTitle]
 * @param {number|string} [params.chapterId]
 * @param {string} [params.chapterKey]
 * @param {number} [params.questionIndex=0]
 * @param {string} [params.questionText]
 * @param {string} [params.correctAnswer]
 * @param {string} [params.solution]
 * @param {string} [params.mistakeType]
 * @param {Object} [params.diagnosticData={}]
 */
export async function recordMistake({
  userId = null,
  questionAttemptId = null,
  questionId = null,
  topicId = null,
  topicTitle = "",
  chapterId = null,
  chapterKey = "",
  questionIndex = 0,
  questionText = "",
  correctAnswer = "",
  solution = "",
  mistakeType = "calculation_error",
  diagnosticData = {},
}) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) {
    console.warn("[mistakeService] Skipping mistake record: unauthenticated.");
    return null;
  }

  const payload = {
    user_id: activeUserId,
    question_index: typeof questionIndex === "number" ? questionIndex : (parseInt(questionIndex, 10) || 0),
    question_text: questionText || "",
    correct_answer: correctAnswer || "",
    solution: solution || "",
    mistake_type: mistakeType || "calculation_error",
    diagnostic_data: diagnosticData || {},
    resolved: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (questionAttemptId && (typeof questionAttemptId === "number" || /^\d+$/.test(questionAttemptId))) {
    payload.question_attempt_id = parseInt(questionAttemptId, 10);
  }
  if (questionId && (typeof questionId === "number" || /^\d+$/.test(questionId))) {
    payload.question_id = parseInt(questionId, 10);
  }
  if (topicId && (typeof topicId === "number" || /^\d+$/.test(topicId))) {
    payload.topic_id = parseInt(topicId, 10);
  }
  if (topicTitle) {
    payload.topic_title = topicTitle;
  }
  if (chapterId && (typeof chapterId === "number" || /^\d+$/.test(chapterId))) {
    payload.chapter_id = parseInt(chapterId, 10);
  }
  if (chapterKey) {
    payload.chapter_key = chapterKey;
  }

  try {
    const { data, error } = await supabase
      .from("user_mistakes")
      .insert(payload)
      .select();

    if (error) {
      console.warn("[mistakeService] Mistake insert warning:", error.message);
      return null;
    }
    return data?.[0] || payload;
  } catch (err) {
    console.error("[mistakeService] Exception during mistake record:", err);
    return null;
  }
}

/**
 * Mark a mistake as resolved in Supabase.
 */
export async function markMistakeResolved({ topicId, questionIndex, userId = null }) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) return false;

  try {
    let query = supabase
      .from("user_mistakes")
      .update({
        resolved: true,
        resolved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", activeUserId)
      .eq("question_index", questionIndex);

    if (typeof topicId === "number" || /^\d+$/.test(topicId)) {
      query = query.eq("topic_id", parseInt(topicId, 10));
    } else if (topicId) {
      query = query.eq("topic_title", topicId);
    }

    const { error } = await query;
    if (error) console.warn("[mistakeService] Resolution warning:", error.message);
    return !error;
  } catch (err) {
    console.error("[mistakeService] Exception during mistake resolution:", err);
    return false;
  }
}

/**
 * Fetch all unresolved mistakes for current user.
 */
export async function fetchUnresolvedMistakes(userId = null) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("user_mistakes")
      .select("*")
      .eq("user_id", activeUserId)
      .eq("resolved", false);

    if (error) {
      console.warn("[mistakeService] Fetch unresolved mistakes warning:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[mistakeService] Exception fetching unresolved mistakes:", err);
    return [];
  }
}
