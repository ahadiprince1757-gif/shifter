/**
 * ============================================================================
 * TIXAR LEARNING INTELLIGENCE ENGINE
 * ============================================================================
 *
 * Responsibilities:
 * 1. Aggregates true learning evidence (truth brain, verifiers, telemetry).
 * 2. Measures cognitive mastery across 5 distinct evidence levels:
 *    RECOGNITION, RECALL, PROCEDURAL, APPLICATION, TRANSFER.
 * 3. Calculates sample-size-adjusted reliable mastery & confidence ratings.
 * 4. Determines the student's Primary Learning Bottleneck & Next Best Action.
 * ============================================================================
 */

import { buildMasteryMap, calculateReadiness } from "./cbcCompetencyEngine.js";

/**
 * Calculates sample-size-adjusted reliable mastery and confidence level.
 *
 * @param {number} correct
 * @param {number} total
 * @returns {Object} { mastery, confidence, attempts, evidenceFactor }
 */
export function calculateReliableMastery(correct, total) {
  if (!total || total <= 0) {
    return {
      mastery: 0,
      confidence: "INSUFFICIENT_DATA",
      attempts: 0,
      evidenceFactor: 0,
    };
  }

  const rawMastery = correct / total;
  const evidenceFactor = Math.min(1, total / 10);
  const mastery = Math.round(rawMastery * 100);

  let confidence = "LOW";
  if (total >= 10) confidence = "HIGH";
  else if (total >= 5) confidence = "MEDIUM";

  return {
    mastery,
    confidence,
    attempts: total,
    evidenceFactor,
  };
}

/**
 * Measures actual cognitive level performance directly from tagged attempt evidence.
 * Returns null for levels with 0 attempts (no fake estimations).
 *
 * @param {Array<Object>} attempts
 * @returns {Object} Cognitive level percentages or null
 */
export function calculateCognitiveMastery(attempts = []) {
  const levels = {
    RECOGNITION: [],
    RECALL: [],
    PROCEDURAL: [],
    APPLICATION: [],
    TRANSFER: [],
  };

  if (Array.isArray(attempts)) {
    for (const attempt of attempts) {
      const rawLevel = String(attempt.cognitiveLevel || attempt.cognitive_level || "").toUpperCase();
      let matchedKey = null;

      if (rawLevel.includes("RECOGNITION") || rawLevel.includes("REMEMBER")) {
        matchedKey = "RECOGNITION";
      } else if (rawLevel.includes("RECALL") || rawLevel.includes("UNDERSTAND")) {
        matchedKey = "RECALL";
      } else if (rawLevel.includes("PROCEDURAL") || rawLevel.includes("PROCEDURE")) {
        matchedKey = "PROCEDURAL";
      } else if (rawLevel.includes("APPLICATION") || rawLevel.includes("APPLY")) {
        matchedKey = "APPLICATION";
      } else if (rawLevel.includes("TRANSFER") || rawLevel.includes("EVALUATION") || rawLevel.includes("CREATION")) {
        matchedKey = "TRANSFER";
      }

      if (matchedKey && levels[matchedKey]) {
        levels[matchedKey].push(attempt);
      }
    }
  }

  const results = {};
  for (const [level, items] of Object.entries(levels)) {
    if (!items || items.length === 0) {
      results[level] = null;
    } else {
      const correct = items.filter((item) => item.correct || item.isCorrect || item.passed).length;
      results[level] = Math.round((correct / items.length) * 100);
    }
  }

  return results;
}

/**
 * Determines the single Primary Learning Bottleneck and Next Best Action.
 *
 * @param {Object} params
 * @param {Object} [params.readiness]
 * @param {Object} [params.masteryMap]
 * @param {Array} [params.dueReviews]
 * @param {Array} [params.unresolvedMistakes]
/**
 * Determines the single Primary Learning Bottleneck and Next Best Action.
 *
 * @param {Object} params
 * @param {number} [params.totalAttempts]
 * @param {Object} [params.readiness]
 * @param {Object} [params.masteryMap]
 * @param {Array} [params.dueReviews]
 * @param {Array} [params.unresolvedMistakes]
 * @param {boolean} [params.isColdStart]
 * @returns {Object} Action recommendation object
 */
export function generatePrimaryRecommendation({
  totalAttempts = 0,
  readiness = null,
  masteryMap = null,
  dueReviews = [],
  unresolvedMistakes = [],
  isColdStart = false,
} = {}) {
  if (isColdStart || (totalAttempts === 0 && dueReviews.length === 0 && unresolvedMistakes.length === 0)) {
    return {
      type: "cold_start",
      priority: "ONBOARDING",
      action: "START_LEARNING",
      title: "Start Your Learning Journey",
      reason: "Complete your first topic quiz to establish your baseline learning readiness.",
      buttonLabel: "Browse Subjects",
      route: "/subjects",
    };
  }

  const criticalGap = masteryMap?.knowledgeGaps?.[0];

  if (criticalGap) {
    return {
      type: "critical_gap",
      priority: "CRITICAL",
      action: "REPAIR_KNOWLEDGE_GAP",
      title: `Strengthen ${criticalGap.topic}`,
      reason: `Your mastery is currently ${criticalGap.performanceScore || criticalGap.mastery || 0}%, creating a prerequisite gap.`,
      buttonLabel: "Repair This Gap",
      targetTopic: criticalGap.topic,
    };
  }

  if (Array.isArray(unresolvedMistakes) && unresolvedMistakes.length >= 5) {
    return {
      type: "review_mistakes",
      priority: "HIGH",
      action: "REVIEW_MISTAKES",
      title: "Repair Recurring Mistakes",
      reason: `${unresolvedMistakes.length} unresolved mistakes detected in your journal.`,
      buttonLabel: "Open Mistake Journal",
      route: "/mistakes",
    };
  }

  if (Array.isArray(dueReviews) && dueReviews.length > 0) {
    return {
      type: "complete_reviews",
      priority: "MEDIUM",
      action: "COMPLETE_REVIEWS",
      title: "Protect What You've Learned",
      reason: `${dueReviews.length} topic${dueReviews.length > 1 ? "s are" : " is"} due for memory review today.`,
      buttonLabel: "Start Memory Review",
      route: "/analytics",
    };
  }

  if (readiness?.status === "READY" || readiness?.ready) {
    return {
      type: "ready_to_advance",
      priority: "SUCCESS",
      action: "ADVANCE",
      title: "You Are Ready to Advance",
      reason: "Your recent performance demonstrates strong and consistent evidence of mastery.",
      buttonLabel: "Continue Learning",
      route: "/subjects",
    };
  }

  return {
    type: "active_learning",
    priority: "LOW",
    action: "PRACTICE",
    title: "Build More Learning Evidence",
    reason: "Complete additional practice questions to accurately measure your competency.",
    buttonLabel: "Practice Now",
    route: "/subjects",
  };
}

/**
 * Builds the central Tixar Learning Intelligence State Object.
 *
 * @param {Object} params
 * @returns {Object} Comprehensive Intelligence Object
 */
export function buildLearningIntelligence({
  attempts = [],
  dueReviews = [],
  unresolvedMistakes = [],
  diagnosticMemory = null,
} = {}) {
  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter(
    (attempt) => attempt.correct || attempt.isCorrect || attempt.passed
  ).length;

  const isColdStart = totalAttempts === 0 && dueReviews.length === 0 && unresolvedMistakes.length === 0;

  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
  const reliableMastery = calculateReliableMastery(correctAttempts, totalAttempts);
  const cognitiveMastery = calculateCognitiveMastery(attempts);
  const masteryMap = buildMasteryMap(attempts);

  const readiness = calculateReadiness({
    overallScore: accuracy,
    masteryMap,
  });

  const recommendation = generatePrimaryRecommendation({
    totalAttempts,
    readiness,
    masteryMap,
    dueReviews,
    unresolvedMistakes,
    isColdStart,
  });

  return {
    overview: {
      coldStart: isColdStart,
      intelligenceState: isColdStart ? "cold_start" : (readiness.ready ? "ready_to_advance" : "active_learning"),
      totalAttempts,
      correctAttempts,
      accuracy: isColdStart ? null : accuracy,
      reliableMastery: isColdStart ? 0 : reliableMastery.mastery,
      evidenceConfidence: isColdStart ? "UNMEASURED" : reliableMastery.confidence,
      readinessScore: isColdStart ? null : readiness.score,
      readinessStatus: isColdStart ? "UNMEASURED" : readiness.status,
      readinessLabel: isColdStart ? "Unmeasured" : readiness.label,
      readinessRecommendation: isColdStart ? "Complete your first topic quiz to measure readiness." : readiness.recommendation,
      isReady: isColdStart ? false : readiness.ready,
    },
    cognitiveMastery,
    masteryMap,
    memory: {
      dueReviewsCount: dueReviews.length,
      unresolvedMistakesCount: unresolvedMistakes.length,
      diagnosticMemory,
    },
    recommendation,
  };
}
