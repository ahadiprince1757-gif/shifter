import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { db } from "../db/db";

/**
 * Next Action Engine
 *
 * Reads from all existing data layers (spaced reviews, mistakes, mastery scores)
 * and returns ONE prioritised action for the student.
 *
 * Priority order (by learning impact, highest first):
 *   1. Misconception — topic answered with high confidence but wrong (most damaging learning state)
 *   2. Overdue spaced review — forgetting curve is actively eroding retention
 *   3. Low mastery with repeated attempts — genuine weak spot (mastery_score < 0.3 with >= 2 attempts)
 *
 * Returns null when there is nothing urgent — the UI should hide itself entirely.
 */
export async function computeNextAction(userId) {
  try {
    const uid = userId || null;

    // ── 1. Misconception Detection ─────────────────────────────────────────
    // A topic where the student was "Very Sure" but got it wrong is the most
    // urgent learning state — the false belief must be corrected before it cements.
    const unresolvedMistakes = await mistakeRepo.getUnresolvedMistakes(uid);

    // Cross-reference with spaced review data to find confirmed misconception state
    // The spacedRepetition engine writes learning_state = "misconception" when
    // quality_rating = 2 (high confidence + wrong). We check mastery_score as a proxy.
    for (const mistake of unresolvedMistakes) {
      if (mistake.attempt_count >= 1) {
        // Look for matching spaced review record to check learning_state
        const reviewInfo = await spacedRepo.getTopicReviewInfo(mistake.topic_id, uid);
        if (reviewInfo && reviewInfo.learning_state === "misconception") {
          return {
            topic: mistake.topic_id,
            subject: mistake.subject_id || null,
            chapter: mistake.chapter_id || null,
            route: mistake.subject_id && mistake.chapter_id
              ? `/learn/${mistake.subject_id}/${mistake.chapter_id}/${encodeURIComponent(mistake.topic_id)}`
              : null,
            reason: "You answered this with high confidence but got it wrong. Review before the incorrect thinking sets in.",
            urgency: "high",
            type: "misconception",
          };
        }
      }
    }

    // ── 2. Overdue Spaced Review ───────────────────────────────────────────
    const dueReviews = await spacedRepo.getDueReviews(uid);
    if (dueReviews.length > 0) {
      // Most overdue first (earliest next_review_at)
      const sorted = dueReviews.sort(
        (a, b) => new Date(a.next_review_at) - new Date(b.next_review_at)
      );
      const top = sorted[0];
      return {
        topic: top.topic_id,
        subject: null,  // spacedRepo doesn't store subject — navigate via analytics
        chapter: null,
        route: "/analytics",
        reason: `This topic is due for memory review. Revisiting now keeps it in long-term memory.`,
        urgency: dueReviews.length > 3 ? "high" : "medium",
        type: "review",
        count: dueReviews.length,
      };
    }

    // ── 3. Low Mastery Weak Spot ───────────────────────────────────────────
    // Topics with mastery_score < 0.3 after at least 2 repetitions
    // (ignores topics never attempted — we don't push students toward random topics)
    const allReviews = await db.spaced_reviews.toArray();
    const weakSpots = allReviews
      .filter((r) => {
        if (uid && r.user_id !== uid) return false;
        if (!uid && r.user_id) return false;
        return (
          typeof r.mastery_score === "number" &&
          r.mastery_score < 0.3 &&
          typeof r.repetitions === "number" &&
          r.repetitions >= 2
        );
      })
      .sort((a, b) => (a.mastery_score ?? 1) - (b.mastery_score ?? 1));

    if (weakSpots.length > 0) {
      const weakest = weakSpots[0];
      // Try to find the matching mistake to get subject/chapter context
      const matchingMistake = unresolvedMistakes.find(
        (m) => m.topic_id === weakest.topic_id
      );
      return {
        topic: weakest.topic_id,
        subject: matchingMistake?.subject_id || null,
        chapter: matchingMistake?.chapter_id || null,
        route:
          matchingMistake?.subject_id && matchingMistake?.chapter_id
            ? `/learn/${matchingMistake.subject_id}/${matchingMistake.chapter_id}/${encodeURIComponent(weakest.topic_id)}`
            : "/analytics",
        reason: "This is your weakest topic right now. Practice it to build a solid foundation.",
        urgency: "medium",
        type: "weakness",
      };
    }

    // Nothing urgent — return null so the UI hides completely
    return null;
  } catch (err) {
    console.error("[NextActionEngine] Error computing next action:", err);
    return null;
  }
}
