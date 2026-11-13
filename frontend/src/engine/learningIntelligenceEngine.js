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
 * Returns { score: null, evidenceCount: 0 } for untagged levels to preserve transparency.
 *
 * @param {Array<Object>} attempts
 * @returns {Object} Qualified cognitive levels with score and evidenceCount
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
      results[level] = { score: null, evidenceCount: 0 };
    } else {
      const correct = items.filter((item) => item.correct || item.isCorrect || item.passed).length;
      results[level] = {
        score: Math.round((correct / items.length) * 100),
        evidenceCount: items.length,
      };
    }
  }

  return results;
}

/**
 * Determines the single human-centered Next Best Action based on evidence confidence.
 *
 * Hierarchy:
 * 1. Cold Start (0 attempts) -> Start somewhere
 * 2. Calibration (1-4 attempts) -> Keep practicing, still learning strengths
 * 3. Evidence-Backed Critical Gap (>= 5 attempts, < 40%) -> Let's fix this first
 * 4. Repeated Mistakes (>= 5 unresolved) -> Look at mistake journal
 * 5. Due Reviews (> 0) -> Refresh what you've learned
 * 6. Ready to Advance (Readiness met) -> Ready to progress
 * 7. Active Learning -> Keep practicing
 *
 * @param {Object} params
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
  // Stage 1: Cold Start (No question attempts yet)
  if (isColdStart || (totalAttempts === 0 && dueReviews.length === 0 && unresolvedMistakes.length === 0)) {
    return {
      type: "cold_start",
      priority: "ONBOARDING",
      action: "START_LEARNING",
      title: "Start Your Learning Journey",
      reason: "Complete your first topic quiz so we can begin understanding your strengths.",
      buttonLabel: "Browse Subjects",
      route: "/subjects",
    };
  }

  // Stage 2: Calibration Phase (1 to 4 questions answered)
  // Refuses to diagnose weaknesses prematurely; focuses on building baseline
  if (totalAttempts < 5) {
    return {
      type: "calibrating",
      priority: "CALIBRATION",
      action: "PRACTICE",
      title: "We're Still Learning Your Strengths",
      reason: `You've completed ${totalAttempts} question${totalAttempts > 1 ? "s" : ""}. A little more practice will give us a clearer picture of where to focus.`,
      buttonLabel: "Continue Practice",
      route: "/subjects",
    };
  }

  // Stage 3: Evidence-Backed Critical Gap (requires >= 5 attempts + < 40% accuracy)
  const criticalGap = masteryMap?.knowledgeGaps?.[0];
  if (criticalGap) {
    return {
      type: "critical_gap",
      priority: "HIGH",
      action: "REPAIR_KNOWLEDGE_GAP",
      title: `Let's Fix This First: ${criticalGap.topic}`,
      reason: `You've encountered consistent difficulty with ${criticalGap.topic}. Strengthening this foundation will make the next topics easier.`,
      buttonLabel: "Review Topic",
      targetTopic: criticalGap.topic,
    };
  }

  // Stage 4: Repeated Mistakes
  if (Array.isArray(unresolvedMistakes) && unresolvedMistakes.length >= 5) {
    return {
      type: "review_mistakes",
      priority: "HIGH",
      action: "REVIEW_MISTAKES",
      title: "Look at Your Mistake Journal",
      reason: `You have ${unresolvedMistakes.length} recurring mistakes. A quick review will help break the pattern.`,
      buttonLabel: "Open Mistake Journal",
      route: "/mistakes",
    };
  }

  // Stage 5: Due Memory Reviews
  if (Array.isArray(dueReviews) && dueReviews.length > 0) {
    return {
      type: "complete_reviews",
      priority: "MEDIUM",
      action: "COMPLETE_REVIEWS",
      title: "Refresh What You've Learned",
      reason: `${dueReviews.length} topic${dueReviews.length > 1 ? "s are" : " is"} ready for memory review.`,
      buttonLabel: "Start Memory Review",
      route: "/analytics",
    };
  }

  // Stage 6: Ready to Advance
  if (readiness?.status === "READY_TO_ADVANCE" || readiness?.status === "READY" || readiness?.ready) {
    return {
      type: "ready_to_advance",
      priority: "SUCCESS",
      action: "ADVANCE",
      title: "You Are Ready to Advance",
      reason: "Your recent performance demonstrates strong and consistent evidence of understanding.",
      buttonLabel: "Continue Learning",
      route: "/subjects",
    };
  }

  // Stage 7: Active Practice
  return {
    type: "active_learning",
    priority: "LOW",
    action: "PRACTICE",
    title: "Keep Practicing",
    reason: "Continue answering practice questions to build a clearer picture of your understanding.",
    buttonLabel: "Practice Now",
    route: "/subjects",
  };
}

/**
 * Builds the central Tixar Learning Intelligence State Object from canonical evidence.
 *
 * @param {Object} params
 * @returns {Object} Comprehensive Intelligence Object
 */
export function buildLearningIntelligence({
  attempts = [],
  dueReviews = [],
  unresolvedMistakes = [],
  diagnosticMemory = null,
  authoritativeDecision = null,
  authority = "LOCAL_PROVISIONAL",
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
    totalAttempts,
  });

  let recommendation;
  if (authoritativeDecision) {
    recommendation = {
      authority: "SERVER_VERIFIED",
      decisionId: authoritativeDecision.decisionId,
      supersedesDecisionId: authoritativeDecision.supersedesDecisionId,
      type: authoritativeDecision.decisionType,
      action: authoritativeDecision.actionType,
      title: authoritativeDecision.explanation?.title || `Let's Practice: ${authoritativeDecision.targetTopicTitle}`,
      reason: authoritativeDecision.explanation?.reason || "Recommendation from server intelligence.",
      pedagogicalWhy: authoritativeDecision.explanation?.pedagogicalWhy,
      buttonLabel: authoritativeDecision.explanation?.actionText || "Practice Now",
      targetTopic: authoritativeDecision.targetTopicTitle,
      engineVersion: authoritativeDecision.engineVersion || "2.0.0",
      ruleVersion: authoritativeDecision.ruleVersion || 1,
      schemaVersion: authoritativeDecision.schemaVersion || 1,
      why: {
        evidenceStrength: authoritativeDecision.evidenceStrength,
        confidence: authoritativeDecision.confidenceLevel,
        masteryState: authoritativeDecision.masteryState,
        readinessState: authoritativeDecision.readinessState,
        rulesTriggered: authoritativeDecision.inferenceRules || [],
        evidenceRefs: authoritativeDecision.evidenceRefs || [],
        contributingHypotheses: authoritativeDecision.contributingHypotheses || [],
        evidenceSnapshot: authoritativeDecision.evidenceSnapshot || {
          totalAttempts,
          correctAttempts,
          accuracy
        }
      }
    };
  } else {
    const localRec = generatePrimaryRecommendation({
      totalAttempts,
      readiness,
      masteryMap,
      dueReviews,
      unresolvedMistakes,
      isColdStart,
    });

    recommendation = {
      ...localRec,
      authority: "LOCAL_PROVISIONAL",
      decisionId: `local-${Date.now()}`,
      engineVersion: "2.0.0",
      ruleVersion: 1,
      schemaVersion: 1,
      why: {
        evidenceStrength: Math.min(100, totalAttempts * 10),
        confidence: totalAttempts >= 10 ? "HIGH" : totalAttempts >= 5 ? "MODERATE" : "LOW",
        masteryState: totalAttempts >= 5 ? (accuracy >= 70 ? "ESTABLISHED" : "EMERGING") : "INSUFFICIENT_EVIDENCE",
        readinessState: readiness.ready ? "READY" : "NOT_READY",
        rulesTriggered: localRec.type === "critical_gap"
          ? ["MIN_ATTEMPTS_5", "ACCURACY_LT_40", "PREREQUISITE_WEAKNESS_SUSPECTED"]
          : localRec.type === "calibrating"
          ? ["INSUFFICIENT_TOTAL_EVIDENCE", "CALIBRATION_RECOMMENDED"]
          : ["LOCAL_HEURISTIC_ACTIVE"],
        evidenceRefs: attempts.map((a) => a.clientEventId).filter(Boolean).slice(-6),
        contributingHypotheses: [],
        evidenceSnapshot: {
          totalAttempts,
          correctAttempts,
          accuracy
        }
      }
    };
  }

  // ─────────────────────────────────────────────────────────────────────
  // TIXAR CONSTITUTIONAL LAW: NOT_STARTED ≠ NEEDS_SUPPORT
  // Absence of evidence is never treated as evidence of difficulty.
  // ─────────────────────────────────────────────────────────────────────
  const learnerState = (() => {
    if (isColdStart) return "NOT_STARTED";           // No evidence yet. Neutral.
    if (totalAttempts < 5) return "EARLY_EVIDENCE";  // Some evidence. Calibrating.
    if (accuracy >= 70) return "PROGRESSING";         // Evidence of strength.
    return "NEEDS_SUPPORT";                           // Evidence of genuine difficulty.
  })();

  return {
    overview: {
      coldStart: isColdStart,
      // learnerState is the canonical semantic state of the learner.
      // Components MUST use this instead of deriving state from raw scores.
      learnerState,
      intelligenceState: isColdStart
        ? "no_evidence"
        : totalAttempts < 5
        ? "early_evidence"
        : readiness.ready
        ? "ready_to_advance"
        : "active_learning",
      totalAttempts,
      correctAttempts,
      // Constitutional: Do NOT expose accuracy when NOT_STARTED.
      // A percentage implies a measurement. With zero attempts there is no measurement.
      accuracy: isColdStart ? null : accuracy,
      reliableMastery: isColdStart ? 0 : reliableMastery.mastery,
      evidenceConfidence: isColdStart ? "UNMEASURED" : reliableMastery.confidence,
      readinessScore: isColdStart ? null : readiness.score,
      readinessStatus: isColdStart ? "UNMEASURED" : readiness.status,
      readinessLabel: isColdStart ? "Unmeasured" : readiness.label,
      readinessRecommendation: isColdStart
        ? "Complete your first topic quiz to measure readiness."
        : readiness.recommendation,
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
