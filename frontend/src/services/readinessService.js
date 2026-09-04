import { fetchUserProgress } from "./progressService";
import { fetchUnresolvedMistakes } from "./mistakeService";
import { fetchDueSpacedReviews } from "./reviewService";
import { fetchUserAttempts } from "./attemptService";
import { getActiveUserId } from "../supabase";

/**
 * Calculates student readiness score for learning recommendations.
 *
 * @param {string} [userId]
 * @returns {Promise<Object>} Student readiness evaluation
 */
export async function calculateStudentReadiness(userId = null) {
  const activeUserId = userId || getActiveUserId();
  if (!activeUserId) {
    return {
      readinessScore: 50,
      dueReviewsCount: 0,
      unresolvedMistakesCount: 0,
      recentAccuracy: 0,
      status: "GUEST_MODE",
    };
  }

  try {
    const [progressList, mistakes, dueReviews, attempts] = await Promise.all([
      fetchUserProgress(activeUserId),
      fetchUnresolvedMistakes(activeUserId),
      fetchDueSpacedReviews(activeUserId),
      fetchUserAttempts(activeUserId, 20),
    ]);

    const completedTopics = progressList.filter((p) => p.completed).length;
    const totalMastery = progressList.reduce((sum, p) => sum + (Number(p.mastery_score) || 0), 0);
    const avgMastery = progressList.length > 0 ? totalMastery / progressList.length : 0;

    const recentCorrect = attempts.filter((a) => a.is_correct).length;
    const recentAccuracy = attempts.length > 0 ? Math.round((recentCorrect / attempts.length) * 100) : 75;

    // Readiness formula: Base accuracy weighted against unresolved mistakes & due reviews
    let readinessScore = recentAccuracy * 0.5 + avgMastery * 0.3 + Math.min(20, completedTopics * 2);
    if (dueReviews.length > 3) readinessScore -= 10;
    if (mistakes.length > 5) readinessScore -= 15;

    readinessScore = Math.max(10, Math.min(99, Math.round(readinessScore)));

    return {
      readinessScore,
      completedTopicsCount: completedTopics,
      dueReviewsCount: dueReviews.length,
      unresolvedMistakesCount: mistakes.length,
      recentAccuracy,
      status: readinessScore >= 75 ? "READY_TO_ADVANCE" : readinessScore >= 50 ? "NEEDS_REVISION" : "REQUIRES_SCAFFOLDING",
    };
  } catch (err) {
    console.error("[readinessService] Exception calculating readiness:", err);
    return {
      readinessScore: 50,
      dueReviewsCount: 0,
      unresolvedMistakesCount: 0,
      recentAccuracy: 0,
      status: "ERROR_FALLBACK",
    };
  }
}
