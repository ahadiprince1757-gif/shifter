import { db } from "../db/db";
import { calculateNextReview, convertToQualityRating } from "../utils/spacedRepetition";

export const spacedRepo = {
  /**
   * Record a review attempt and update the scheduled next review date.
   */
  async updateReviewSchedule(topicId, isCorrect, confidence = "medium") {
    try {
      const existing = await db.spaced_reviews.get(topicId);
      const quality = convertToQualityRating(isCorrect, confidence);
      const nextData = calculateNextReview(quality, existing);

      await db.spaced_reviews.put({
        topic_id: topicId,
        ...nextData,
      });
      return nextData;
    } catch (err) {
      console.error("Failed to update spaced review schedule:", err);
    }
  },

  /**
   * Get all topics currently due for review (next_review_at <= NOW).
   */
  async getDueReviews() {
    try {
      const now = new Date().toISOString();
      const all = await db.spaced_reviews.toArray();
      return all.filter(r => r.next_review_at <= now);
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
