import { supabase, getActiveUserId } from "../supabase";

/**
 * Updates or inserts student topic mastery progress.
 * Focuses progress as the current state record for a topic.
 *
 * @param {Object} params
 * @param {string} [params.userId] - optional explicit user UUID
 * @param {number|string} params.topicId - numeric topic_id or topic title
 * @param {string} [params.topicTitle]
 * @param {string} [params.subjectId]
 * @param {number|string} [params.chapterId]
 * @param {boolean} [params.completed=false]
 * @param {number} [params.masteryScore=0]
 * @param {string} [params.confidenceLevel='medium']
 * @param {boolean} [params.mastered=false]
 */
export async function updateProgress({
  userId = null,
  topicId,
  topicTitle = "",
  subjectId = null,
  chapterId = null,
  completed = false,
  masteryScore = 0,
  confidenceLevel = "medium",
  mastered = false,
}) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) {
    console.warn("[progressService] Skipping update: unauthenticated.");
    return null;
  }

  const payload = {
    user_id: activeUserId,
    completed: Boolean(completed),
    mastery_score: Number(masteryScore || 0),
    confidence_level: confidenceLevel,
    mastered: Boolean(mastered),
    last_studied_at: new Date().toISOString(),
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

  if (mastered) {
    payload.mastered_at = new Date().toISOString();
  }

  try {
    const { data, error } = await supabase
      .from("progress")
      .upsert(payload, { onConflict: "user_id,topic_id" })
      .select();

    if (error) {
      console.warn("[progressService] Progress upsert warning:", error.message);
      return null;
    }
    return data?.[0] || payload;
  } catch (err) {
    console.error("[progressService] Exception during progress update:", err);
    return null;
  }
}

/**
 * Fetch all progress records for current authenticated user.
 */
export async function fetchUserProgress(userId = null) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", activeUserId);

    if (error) {
      console.warn("[progressService] Fetch error:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[progressService] Exception during progress fetch:", err);
    return [];
  }
}

/**
 * Fetch progress record for a single topic.
 */
export async function fetchTopicProgress(topicId, userId = null) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId || !supabase || !topicId) return null;

  try {
    let query = supabase.from("progress").select("*").eq("user_id", activeUserId);

    if (typeof topicId === "number" || /^\d+$/.test(topicId)) {
      query = query.eq("topic_id", parseInt(topicId, 10));
    } else {
      query = query.eq("topic_title", topicId);
    }

    const { data, error } = await query.maybeSingle();
    if (error) {
      console.warn("[progressService] Topic progress fetch warning:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[progressService] Exception during topic progress fetch:", err);
    return null;
  }
}
