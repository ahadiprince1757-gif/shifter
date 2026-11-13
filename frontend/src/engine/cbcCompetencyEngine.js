/**
 * ============================================================================
 * TIXAR CBC COMPETENCY, MASTERY VECTOR & READINESS ENGINE
 * ============================================================================
 *
 * Responsibilities:
 * 1. Converts student performance into official CBC Performance Levels.
 * 2. Computes vector-based topic mastery maps with Evidence Confidence scores.
 * 3. Evaluates Tixar Readiness based on Performance + Mastery Vectors + Critical Gaps + Prerequisites.
 * ============================================================================
 */

import { CBC_GRADING_SCALE } from "./cbcGrading.js";

/**
 * Calculates Evidence Confidence Score (0 to 95) based on observation volume.
 *
 * @param {number} attempts - Number of observed attempts for a topic
 * @returns {number} Confidence percentage (20 to 95)
 */
export function calculateEvidenceConfidence(attempts) {
  const count = Number(attempts) || 0;
  if (count >= 10) return 95;
  if (count >= 7) return 85;
  if (count >= 5) return 75;
  if (count >= 3) return 60;
  if (count >= 2) return 40;
  return 20;
}

/**
 * Calculates CBC Competency details from correct count and total questions,
 * passing mastery vector data into the readiness evaluator.
 *
 * @param {number} correctAnswers
 * @param {number} totalQuestions
 * @param {object} [customScale] Optional override for custom school grading scales
 * @param {Array} [attempts] Optional list of raw attempt objects to construct mastery vector
 * @returns {object|null}
 */
export function calculateCompetency(
  correctAnswers,
  totalQuestions,
  customScale = null,
  attempts = []
) {
  if (!totalQuestions || totalQuestions <= 0) {
    return null;
  }

  const percentage = Math.max(
    0,
    Math.min(100, Math.round((correctAnswers / totalQuestions) * 100))
  );

  const level = mapScoreToCompetency(percentage, customScale);
  const masteryMap = buildMasteryMap(attempts);

  return {
    score: percentage,
    correctAnswers,
    totalQuestions,
    ...level,
    masteryMap,
    readiness: calculateReadiness({
      overallScore: percentage,
      masteryMap,
    }),
  };
}

/**
 * Maps a percentage score (0-100) to a CBC Performance Level.
 *
 * @param {number} score
 * @param {array} [customScale]
 * @returns {object}
 */
export function mapScoreToCompetency(score, customScale = null) {
  const numScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const scale = customScale || CBC_GRADING_SCALE;

  const match =
    scale.find((item) => numScore >= item.min && numScore <= item.max) ||
    scale[scale.length - 1];

  return {
    code:
      match.level === "EE1"
        ? "EE8"
        : match.level === "EE2"
        ? "EE7"
        : match.level === "ME1"
        ? "ME6"
        : match.level === "ME2"
        ? "ME5"
        : match.level === "AE1"
        ? "AE4"
        : match.level === "AE2"
        ? "AE3"
        : match.level === "BE1"
        ? "BE2"
        : "BE1",
    rawLevel: match.level,
    level: match.points,
    points: match.points,
    category: match.category,
    badgeBg: match.badgeBg,
    badgeText: match.badgeText,
    description: match.description,
    mastery: getMasteryDescriptor(match.points),
  };
}

function getMasteryDescriptor(points) {
  switch (points) {
    case 8: return "Exceptional";
    case 7: return "Strong";
    case 6: return "Advanced";
    case 5: return "Secure";
    case 4: return "Developing";
    case 3: return "Emerging";
    case 2: return "Needs Support";
    case 1: return "Beginning";
    default: return "Developing";
  }
}

/**
 * Builds a Vector-Based Mastery Map with Evidence Confidence scoring across topics.
 *
 * Evidence Thresholds:
 * - 1-2 attempts: Signal / Insufficient Evidence (Monitor only)
 * - 3-4 attempts: Emerging Evidence
 * - 5-6 attempts: Moderate Evidence (Threshold for confirmed gaps/mastery)
 * - 7-9 attempts: Strong Evidence
 * - 10+ attempts: High Confidence
 *
 * @param {Array<{ topic: string, correct: boolean }>} attempts
 * @returns {object} Vector map of topics + identified knowledge gaps & evidence warnings
 */
export function buildMasteryMap(attempts = []) {
  if (!Array.isArray(attempts) || attempts.length === 0) {
    return {
      topics: {},
      strongTopics: [],
      weakTopics: [],
      knowledgeGaps: [],
      evidenceWarnings: [],
    };
  }

  const topicGroups = {};

  // 1. Group attempts by topic
  for (const attempt of attempts) {
    const topicName = String(
      attempt.topic || attempt.tag || "General"
    ).trim();

    if (!topicGroups[topicName]) {
      topicGroups[topicName] = { correct: 0, total: 0 };
    }

    topicGroups[topicName].total += 1;
    if (attempt.correct === true || attempt.isCorrect === true || attempt.passed === true) {
      topicGroups[topicName].correct += 1;
    }
  }

  const topics = {};
  const strongTopics = [];
  const weakTopics = [];
  const knowledgeGaps = [];
  const evidenceWarnings = [];

  // 2. Build Mastery Vectors with Evidence-Aware Thresholds
  for (const [topic, data] of Object.entries(topicGroups)) {
    const performanceScore = Math.round((data.correct / data.total) * 100);
    const evidenceConfidence = calculateEvidenceConfidence(data.total);
    const cbc = mapScoreToCompetency(performanceScore);

    // Evidence Thresholds
    const isInsufficientEvidence = data.total < 3;
    const verifiedMastery = performanceScore >= 75 && data.total >= 5;

    // Critical Gap requires BOTH persistent difficulty AND sufficient evidence (>= 5 attempts)
    const isCriticalGap = data.total >= 5 && performanceScore < 40;

    // Weak Topic requires at least 3 attempts
    const isWeak = data.total >= 3 && performanceScore < 58;

    let masteryState = "DEVELOPING";
    if (isInsufficientEvidence) {
      masteryState = "INSUFFICIENT_EVIDENCE";
    } else if (verifiedMastery) {
      masteryState = "VERIFIED_MASTERY";
    } else if (isCriticalGap) {
      masteryState = "CRITICAL_GAP";
    } else if (isWeak) {
      masteryState = "DEVELOPING_WEAKNESS";
    }

    let readinessImpact = "NONE";
    if (isCriticalGap) readinessImpact = "BLOCKING";
    else if (isWeak) readinessImpact = "NEEDS_ATTENTION";
    else if (data.total < 3 && performanceScore < 58) readinessImpact = "MONITOR";

    const topicStats = {
      topic,
      attempts: data.total,
      correct: data.correct,
      performanceScore,
      evidenceConfidence,
      verifiedMastery,
      masteryState,
      readinessImpact,
      cbcCode: cbc.code,
      points: cbc.points,
      category: cbc.category,
    };

    topics[topic] = topicStats;

    // Strong Topics (Confirmed verified mastery with >= 5 attempts)
    if (verifiedMastery) {
      strongTopics.push(topicStats);
    }

    // Weak Topics (Confirmed difficulty with >= 3 attempts)
    if (isWeak) {
      weakTopics.push(topicStats);
    }

    // Knowledge Gaps (Critical blockers with >= 5 attempts and < 40% accuracy)
    if (isCriticalGap) {
      knowledgeGaps.push({ ...topicStats, severity: "CRITICAL" });
    }

    // Insufficient Evidence Warnings (1-2 attempts)
    if (isInsufficientEvidence) {
      evidenceWarnings.push({
        topic,
        attempts: data.total,
        message: "Still gathering evidence to evaluate this topic.",
      });
    }
  }

  return {
    topics,
    strongTopics,
    weakTopics,
    knowledgeGaps,
    evidenceWarnings,
  };
}

/**
 * Calculates Tixar Readiness Status based on evidence volume, prerequisite dependencies,
 * evidence-backed knowledge gaps, and demonstrated mastery.
 *
 * Decision Hierarchy:
 * 1. Do we have enough evidence overall? (total attempts >= 5)
 * 2. Are prerequisites satisfied?
 * 3. Are there evidence-backed critical gaps? (>= 5 attempts on topic, < 40% score)
 * 4. Is mastery sufficiently demonstrated? (>= 75% accuracy)
 * 5. Targeted revision (58 - 74%)
 *
 * @param {object|number} options - Options object or overallScore number
 * @param {object} [fallbackMap] - Fallback masteryMap if positional args used
 * @param {object} [fallbackPrereq] - Fallback prerequisiteStatus if positional args used
 * @returns {object} Readiness evaluation result
 */
export function calculateReadiness(options = {}, fallbackMap = null, fallbackPrereq = null) {
  let overallScore;
  let masteryMap;
  let prerequisiteStatus;
  let totalAttempts = 0;

  if (
    typeof options === "object" &&
    options !== null &&
    !Array.isArray(options) &&
    ("overallScore" in options || "masteryMap" in options)
  ) {
    overallScore = options.overallScore ?? 0;
    masteryMap = options.masteryMap || null;
    prerequisiteStatus = options.prerequisiteStatus || null;
    totalAttempts = options.totalAttempts ?? 0;
  } else {
    overallScore = options;
    masteryMap = fallbackMap;
    prerequisiteStatus = fallbackPrereq;
  }

  // Derive totalAttempts from masteryMap if not explicitly passed
  if (!totalAttempts && masteryMap?.topics) {
    totalAttempts = Object.values(masteryMap.topics).reduce((sum, t) => sum + (t.attempts || 0), 0);
  }

  const score = Math.max(0, Math.min(100, Math.round(Number(overallScore) || 0)));
  const criticalGaps = masteryMap?.knowledgeGaps || [];
  const evidenceWarnings = masteryMap?.evidenceWarnings || [];

  // 1. EVIDENCE BUILDING STAGE (Need at least 5 question attempts across curriculum)
  if (totalAttempts < 5) {
    return {
      ready: false,
      score,
      totalAttempts,
      status: "INSUFFICIENT_EVIDENCE",
      label: totalAttempts === 0 ? "Unmeasured" : "We're Still Learning Your Strengths",
      evidenceWarnings,
      recommendation:
        totalAttempts === 0
          ? "Complete your first topic quiz to begin establishing your readiness baseline."
          : `You've completed ${totalAttempts} question${totalAttempts > 1 ? "s" : ""}. Keep practicing so we can build an accurate readiness picture.`,
    };
  }

  // 2. PREREQUISITE SKILLS CHECK
  if (prerequisiteStatus?.satisfied === false) {
    return {
      ready: false,
      score,
      totalAttempts,
      status: "PREREQUISITE_NOT_MET",
      label: "Prerequisite Skills Need Attention",
      missingPrerequisites: prerequisiteStatus.missing || [],
      recommendation: "Review foundational prerequisite skills before advancing.",
    };
  }

  // 3. EVIDENCE-BACKED CRITICAL GAPS (Requires >= 5 attempts on topic + <40% score)
  if (criticalGaps.length > 0) {
    return {
      ready: false,
      score,
      totalAttempts,
      status: "CRITICAL_GAP_DETECTED",
      label: "Needs Foundational Attention",
      blockingTopics: criticalGaps.map((gap) => gap.topic),
      recommendation:
        criticalGaps.length === 1
          ? `Work through foundational concepts in ${criticalGaps[0].topic} before progressing.`
          : `Work through foundational concepts in ${criticalGaps.length} topics needing attention before progressing.`,
    };
  }

  // 4. READY TO ADVANCE (Score >= 75%)
  if (score >= 75) {
    return {
      ready: true,
      score,
      totalAttempts,
      status: "READY_TO_ADVANCE",
      label: "Ready to Advance",
      recommendation: "You have demonstrated strong and consistent understanding across assessed topics.",
    };
  }

  // 5. TARGETED REVISION (Score 58 - 74%)
  if (score >= 58) {
    return {
      ready: false,
      score,
      totalAttempts,
      status: "TARGETED_REVISION",
      label: "Almost Ready — Targeted Revision",
      recommendation: "Review topics that need attention and demonstrate mastery again.",
    };
  }

  // 6. FOUNDATIONAL REVISION
  return {
    ready: false,
    score,
    totalAttempts,
    status: "FOUNDATIONAL_REVISION",
    label: "Needs More Practice",
    recommendation: "Spend more time with core practice questions before moving ahead.",
  };
}
