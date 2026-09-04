import { supabase, getActiveUserId } from "../supabase";

/**
 * Upsert spaced repetition review schedule for a student topic.
 * Uses UNIQUE(user_id, topic_id) constraint.
 *
 * @param {Object} params
 * @param {string} [params.userId]
 * @param {number|string} params.topicId
 * @param {string} [params.topicTitle]
 * @param {string} [params.subjectId]
 * @param {number|string} [params.chapterId]
 * @param {string} params.nextReviewAt - ISO timestamp string
 * @param {number} [params.intervalDays=1]
 * @param {number} [params.repetitions=0]
 * @param {number} [params.easeFactor=2.5]
 */
export async function upsertSpacedReview({
  userId = null,
  topicId,
  topicTitle = "",
  subjectId = null,
  chapterId = null,
  nextReviewAt,
  intervalDays = 1,
  repetitions = 0,
  easeFactor = 2.5,
}) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) {
    console.warn("[reviewService] Skipping spaced review update: unauthenticated.");
    return null;
  }

  const payload = {
    user_id: activeUserId,
    next_review_at: nextReviewAt,
    interval_days: Number(intervalDays || 1),
    repetitions: Number(repetitions || 0),
    ease_factor: Number(easeFactor || 2.5),
    last_reviewed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (typeof topicId === "number" || /^\d+$/.test(topicId)) {
    payload.topic_id = parseInt(topicId, 10);
  }
  if (topicTitle) {
    payload.topic_title = topicTitle;
  }
  if (subjectId) {
    payload.subject_id = subjectId;
  }
  if (chapterId && (typeof chapterId === "number" || /^\d+$/.test(chapterId))) {
    payload.chapter_id = parseInt(chapterId, 10);
  }

  try {
    const { data, error } = await supabase
      .from("spaced_reviews")
      .upsert(payload, { onConflict: "user_id,topic_id" })
      .select();

    if (error) {
      console.warn("[reviewService] Spaced review upsert warning:", error.message);
      return null;
    }
    return data?.[0] || payload;
  } catch (err) {
    console.error("[reviewService] Exception during spaced review upsert:", err);
    return null;
  }
}

/**
 * Fetch all due spaced reviews for current user.
 */
export async function fetchDueSpacedReviews(userId = null) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) return [];
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("spaced_reviews")
      .select("*")
      .eq("user_id", activeUserId)
      .lte("next_review_at", now);

    if (error) {
      console.warn("[reviewService] Fetch due reviews warning:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[reviewService] Exception fetching due spaced reviews:", err);
    return [];
  }
}
