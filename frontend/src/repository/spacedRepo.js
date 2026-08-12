import { db } from "../db/db";
import { calculateNextReview, convertToQualityRating } from "../utils/spacedRepetition";
import { saveSpacedReview as apiSaveSpacedReview } from "../api";
import { networkService } from "../services/networkService";

export const spacedRepo = {
  /**
   * Record a review attempt and update the scheduled next review date.
   * Writes to IndexedDB first, then syncs to Supabase.
   *
   * @param {string} topicId   - The topic title (used as local key)
   * @param {boolean} isCorrect
   * @param {string} confidence - "low" | "medium" | "high"
   * @param {{ sid: string, cid: string }} meta - needed for Supabase sync
   */
  async updateReviewSchedule(topicId, isCorrect, confidence = "medium", meta = {}) {
    try {
      const existing = await db.spaced_reviews.get(topicId);
      const quality = convertToQualityRating(isCorrect, confidence);
      const nextData = calculateNextReview(quality, existing);

      // 1. Write to IndexedDB
      await db.spaced_reviews.put({
        topic_id: topicId,
        ...nextData,
      });

      // 2. Sync to Supabase (fire-and-forget)
      const { sid, cid } = meta;
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
   */
  async getDueReviews(userId) {
    try {
      const now = new Date().toISOString();
      const all = await db.spaced_reviews.toArray();
      return all.filter(r => r.next_review_at <= now && (!userId || !r.user_id || r.user_id === userId));
    } catch (err) {
      console.error("Failed to get due reviews:", err);
      return [];
    }
  },

  /**
   * Get spaced review metadata for a single topic.
   */
  async getTopicReviewInfo(topicId) {
    try {
      return await db.spaced_reviews.get(topicId);
    } catch (err) {
      console.error("Failed to get topic review info:", err);
      return null;
    }
  }
};
