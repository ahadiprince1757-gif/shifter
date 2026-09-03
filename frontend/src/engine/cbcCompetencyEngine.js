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
 * Key Feature:
 * Measures competency as a vector across individual topics rather than
 * collapsing everything into a single misleading average.
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

  // 2. Build Mastery Vectors with Evidence Confidence
  for (const [topic, data] of Object.entries(topicGroups)) {
    const performanceScore = Math.round((data.correct / data.total) * 100);
    const evidenceConfidence = calculateEvidenceConfidence(data.total);
    const cbc = mapScoreToCompetency(performanceScore);

    // Verified mastery requires BOTH strong performance AND sufficient evidence
    const verifiedMastery = performanceScore >= 75 && evidenceConfidence >= 75;

    const topicStats = {
      topic,
      attempts: data.total,
      correct: data.correct,
      performanceScore,
      evidenceConfidence,
      verifiedMastery,
      cbcCode: cbc.code,
      points: cbc.points,
      category: cbc.category,
    };

    topics[topic] = topicStats;

    // Strong Topics (Confirmed Verified Mastery)
    if (verifiedMastery) {
      strongTopics.push(topicStats);
    }

    // Weak Topics & Knowledge Gaps
    if (performanceScore < 58) {
      weakTopics.push(topicStats);
      if (performanceScore < 40) {
        knowledgeGaps.push({ ...topicStats, severity: "CRITICAL" });
      }
    }

    // Insufficient Evidence Warnings
    if (evidenceConfidence < 60) {
      evidenceWarnings.push({
        topic,
        attempts: data.total,
        message: "More evidence is required before confirming mastery.",
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
 * Calculates Tixar Readiness Status based on overall score, mastery vector map,
 * critical knowledge gaps, evidence confidence, and prerequisite dependencies.
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

  if (
    typeof options === "object" &&
    options !== null &&
    !Array.isArray(options) &&
    ("overallScore" in options || "masteryMap" in options)
  ) {
    overallScore = options.overallScore ?? 0;
    masteryMap = options.masteryMap || null;
    prerequisiteStatus = options.prerequisiteStatus || null;
  } else {
    overallScore = options;
    masteryMap = fallbackMap;
    prerequisiteStatus = fallbackPrereq;
  }

  const score = Math.max(0, Math.min(100, Math.round(Number(overallScore) || 0)));
  const criticalGaps = masteryMap?.knowledgeGaps || [];
  const evidenceWarnings = masteryMap?.evidenceWarnings || [];

  // 1. BLOCKED BY CRITICAL KNOWLEDGE GAP
  if (criticalGaps.length > 0) {
    return {
      ready: false,
      score,
      status: "CRITICAL_GAP_DETECTED",
      label: "Not Ready — Critical Gap Detected",
      blockingTopics: criticalGaps.map((gap) => gap.topic),
      recommendation:
        criticalGaps.length === 1
          ? `Strengthen foundational concepts in ${criticalGaps[0].topic} before advancing.`
          : `Strengthen foundational concepts in ${criticalGaps.length} weak topics before advancing.`,
    };
  }

  // 2. PREREQUISITE FAILURE
  if (prerequisiteStatus?.satisfied === false) {
    return {
      ready: false,
      score,
      status: "PREREQUISITE_NOT_MET",
      label: "Prerequisite Skills Need Attention",
      missingPrerequisites: prerequisiteStatus.missing || [],
      recommendation: "Review prerequisite skills before advancing.",
    };
  }

  // 3. INSUFFICIENT EVIDENCE
  if (evidenceWarnings.length > 0 && score < 90) {
    return {
      ready: false,
      score,
      status: "INSUFFICIENT_EVIDENCE",
      label: "More Evidence Needed",
      evidenceWarnings,
      recommendation: "Complete additional questions to confirm consistent mastery.",
    };
  }

  // 4. READY TO ADVANCE
  if (score >= 75) {
    return {
      ready: true,
      score,
      status: "READY_TO_ADVANCE",
      label: "Ready to Advance",
      recommendation: "You have demonstrated sufficient and consistent competency across all assessed topics.",
    };
  }

  // 5. TARGETED REVISION
  if (score >= 58) {
    return {
      ready: false,
      score,
      status: "TARGETED_REVISION",
      label: "Almost Ready — Targeted Revision",
      recommendation: "Complete targeted revision before advancing.",
    };
  }

  // 6. FOUNDATIONAL REVISION
  return {
    ready: false,
    score,
    status: "FOUNDATIONAL_REVISION",
    label: "Needs Foundational Revision",
    recommendation: "Rebuild core concepts before progressing.",
  };
}
