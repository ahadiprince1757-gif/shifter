import { db } from "../db/db";
import { calculateNextReview, convertToQualityRating } from "../utils/spacedRepetition";
import { saveSpacedReview as apiSaveSpacedReview, fetchSpacedReviews } from "../api";
import { networkService } from "../services/networkService";

export const spacedRepo = {
  /**
   * Record a review attempt and update the scheduled next review date.
   * Writes to IndexedDB first, then syncs to Supabase.
   *
   * @param {string} topicId   - The topic title (used as local key)
   * @param {boolean} isCorrect
   * @param {string} confidence - "low" | "medium" | "high"
   * @param {{ sid: string, cid: string, userId?: string }} meta - needed for Supabase sync
   */
  async updateReviewSchedule(topicId, isCorrect, confidence = "medium", meta = {}) {
    try {
      const { sid, cid, userId } = meta;
      const uid = userId || null;
      
      let existing = null;
      if (uid) {
        existing = await db.spaced_reviews.get([uid, topicId]);
      } else {
        const all = await db.spaced_reviews.where("topic_id").equals(topicId).toArray();
        existing = all.find(r => !r.user_id) || null;
      }

      const quality = convertToQualityRating(isCorrect, confidence);
      const nextData = calculateNextReview(quality, existing);

      // 1. Write to IndexedDB
      await db.spaced_reviews.put({
        user_id: uid,
        topic_id: topicId,
        ...nextData,
      });

      // 2. Sync to Supabase (fire-and-forget)
      if (sid && cid && networkService.isOnline) {
        apiSaveSpacedReview({
          sid,
          cid,
          topicTitle: topicId,
          nextReviewAt: nextData.next_review_at,
          intervalDays: nextData.interval_days,
          easeFactor: nextData.ease_factor,
          repetitions: nextData.repetitions,
        }).catch(() => {});
      }

      return nextData;
    } catch (err) {
      console.error("Failed to update spaced review schedule:", err);
    }
  },

  /**
   * Get all topics currently due for review (next_review_at <= NOW) for a specific user.
   * Hydrates from Supabase user_review_queue if online.
   */
  async getDueReviews(userId) {
    try {
      const uid = userId || null;

      // Hydrate from Supabase if online and authenticated
      if (uid && networkService.isOnline) {
        try {
          const remoteReviews = await fetchSpacedReviews();
          if (Array.isArray(remoteReviews) && remoteReviews.length > 0) {
            for (const r of remoteReviews) {
              const topicTitle = r.topic_title || "";
              if (!topicTitle) continue;
              const existing = await db.spaced_reviews.get([uid, topicTitle]);
              // Only hydrate if local data is absent or stale
              if (!existing || existing.next_review_at !== r.next_review_at) {
                await db.spaced_reviews.put({
                  user_id: uid,
                  topic_id: topicTitle,
                  next_review_at: r.next_review_at,
                  interval_days: r.interval_days || 1,
                  ease_factor: r.ease_factor || 2.5,
                  repetitions: r.repetitions || 0,
                  updated_at: new Date().toISOString(),
                }).catch(() => {});
              }
            }
          }
        } catch {
          // Hydration failed — fall back to local data
        }
      }

      // Return from local IndexedDB, filtered by user and due date
      const now = new Date().toISOString();
      const all = await db.spaced_reviews.toArray();
      return all.filter(r => {
        if (r.next_review_at > now) return false;
        if (uid) return r.user_id === uid;
        return !r.user_id;
      });
    } catch (err) {
      console.error("Failed to get due reviews:", err);
      return [];
    }
  },

  /**
   * Get spaced review metadata for a single topic.
   */
  async getTopicReviewInfo(topicId, userId = null) {
    try {
      if (userId) {
        return await db.spaced_reviews.get([userId, topicId]);
      }
      const all = await db.spaced_reviews.where("topic_id").equals(topicId).toArray();
      return all.find(r => !r.user_id) || null;
    } catch (err) {
      console.error("Failed to get topic review info:", err);
      return null;
    }
  }
};
