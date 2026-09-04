import { supabase, getActiveUserId } from "../supabase";

/**
 * Record a historical question attempt for Tixar's readiness engine.
 *
 * @param {Object} params
 * @param {string} [params.userId]
 * @param {number|string} params.questionId
 * @param {number|string} [params.topicId]
 * @param {string} [params.userAnswer]
 * @param {boolean} params.isCorrect
 * @param {number} [params.score=0]
 * @param {number} [params.timeSpentSeconds=0]
 */
export async function recordQuestionAttempt({
  userId = null,
  questionId,
  topicId = null,
  userAnswer = "",
  isCorrect,
  score = 0,
  timeSpentSeconds = 0,
}) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) {
    console.warn("[attemptService] Skipping attempt record: unauthenticated.");
    return null;
  }

  const payload = {
    user_id: activeUserId,
    question_id: typeof questionId === "number" ? questionId : (parseInt(questionId, 10) || 0),
    user_answer: String(userAnswer || ""),
    is_correct: Boolean(isCorrect),
    score: Number(score || (isCorrect ? 100 : 0)),
    time_spent_seconds: Number(timeSpentSeconds || 0),
    attempted_at: new Date().toISOString(),
  };

  if (topicId && (typeof topicId === "number" || /^\d+$/.test(topicId))) {
    payload.topic_id = parseInt(topicId, 10);
  }

  try {
    const { data, error } = await supabase
      .from("question_attempts")
      .insert(payload)
      .select();

    if (error) {
      console.warn("[attemptService] Attempt insert warning:", error.message);
      return null;
    }
    return data?.[0] || payload;
  } catch (err) {
    console.error("[attemptService] Exception during question attempt record:", err);
    return null;
  }
}

/**
 * Fetch recent historical question attempts for a user.
 */
export async function fetchUserAttempts(userId = null, limit = 50) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("question_attempts")
      .select("*")
      .eq("user_id", activeUserId)
      .order("attempted_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.warn("[attemptService] Fetch attempts warning:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[attemptService] Exception during attempt fetch:", err);
    return [];
  }
}
