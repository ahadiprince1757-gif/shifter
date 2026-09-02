/**
 * ============================================================================
 * TIXAR CBC COMPETENCY & MASTERY VECTOR ENGINE
 * ============================================================================
 *
 * Converts student performance into official CBC Performance Levels,
 * computes vector-based topic mastery maps to detect hidden knowledge gaps,
 * and estimates Tixar Readiness for advancement.
 * ============================================================================
 */

import { CBC_GRADING_SCALE } from "./cbcGrading.js";

/**
 * Calculates CBC Competency details from correct count and total questions.
 *
 * @param {number} correctAnswers
 * @param {number} totalQuestions
 * @param {object} [customScale] Optional override for custom school grading scales
 * @returns {object|null}
 */
export function calculateCompetency(correctAnswers, totalQuestions, customScale = null) {
  if (!totalQuestions || totalQuestions <= 0) {
    return null;
  }

  const percentage = Math.max(0, Math.min(100, Math.round((correctAnswers / totalQuestions) * 100)));
  const level = mapScoreToCompetency(percentage, customScale);

  return {
    score: percentage,
    correctAnswers,
    totalQuestions,
    ...level,
    readiness: calculateReadiness(percentage),
  };
}

/**
 * Maps a percentage score (0-100) to a CBC Performance Level.
 *
 * Marks    CBC Code  Points  Category                   Mastery Level
 * 90–100   EE8 / EE1 8       Exceeding Expectations     Exceptional
 * 75–89    EE7 / EE2 7       Exceeding Expectations     Strong
 * 58–74    ME6 / ME1 6       Meeting Expectations       Advanced
 * 41–57    ME5 / ME2 5       Meeting Expectations       Secure
 * 31–40    AE4 / AE1 4       Approaching Expectations   Developing
 * 21–30    AE3 / AE2 3       Approaching Expectations   Emerging
 * 11–20    BE2       2       Below Expectations         Needs Support
 * 0–10     BE1       1       Below Expectations         Beginning
 *
 * @param {number} score
 * @param {array} [customScale]
 * @returns {object}
 */
export function mapScoreToCompetency(score, customScale = null) {
  const numScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const scale = customScale || CBC_GRADING_SCALE;

  const match = scale.find((item) => numScore >= item.min && numScore <= item.max) || scale[scale.length - 1];

  return {
    code: match.level === "EE1" ? "EE8" : match.level === "EE2" ? "EE7" : match.level === "ME1" ? "ME6" : match.level === "ME2" ? "ME5" : match.level === "AE1" ? "AE4" : match.level === "AE2" ? "AE3" : match.level === "BE1" ? "BE2" : "BE1",
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
 * Builds a Vector-Based Mastery Map across topics/skills.
 *
 * Key Feature:
 * Measures competency as a vector across individual topics rather than
 * collapsing everything into a single misleading average.
 *
 * @param {Array<{ topic: string, correct: boolean }>} attempts
 * @returns {object} Vector map of topics + identified knowledge gaps
 */
export function buildMasteryMap(attempts = []) {
  if (!Array.isArray(attempts) || attempts.length === 0) {
    return { topics: {}, strongTopics: [], weakTopics: [], knowledgeGaps: [] };
  }

  const topics = {};

  for (const attempt of attempts) {
    const topicName = String(attempt.topic || attempt.tag || "General").trim();
    if (!topics[topicName]) {
      topics[topicName] = { correct: 0, total: 0 };
    }

    topics[topicName].total += 1;
    if (attempt.correct || attempt.isCorrect || attempt.passed) {
      topics[topicName].correct += 1;
    }
  }

  const masteryMap = {};
  const strongTopics = [];
  const weakTopics = [];
  const knowledgeGaps = [];

  for (const [topic, data] of Object.entries(topics)) {
    const mastery = Math.round((data.correct / data.total) * 100);
    const cbc = mapScoreToCompetency(mastery);

    const topicStats = {
      attempts: data.total,
      correct: data.correct,
      mastery,
      cbcCode: cbc.code,
      points: cbc.points,
      category: cbc.category,
    };

    masteryMap[topic] = topicStats;

    if (mastery >= 75) {
      strongTopics.push({ topic, ...topicStats });
    } else if (mastery < 58) {
      weakTopics.push({ topic, ...topicStats });
      if (mastery < 40) {
        knowledgeGaps.push({ topic, ...topicStats, severity: "CRITICAL" });
      }
    }
  }

  return {
    topics: masteryMap,
    strongTopics,
    weakTopics,
    knowledgeGaps,
  };
}

/**
 * Calculates Tixar Readiness Status based on score and topic vector map.
 *
 * @param {number} overallScore
 * @param {object} [masteryMap]
 * @returns {object}
 */
export function calculateReadiness(overallScore, masteryMap = null) {
  const score = Math.max(0, Math.min(100, Math.round(Number(overallScore) || 0)));
  const gaps = masteryMap?.knowledgeGaps || [];

  if (score >= 75 && gaps.length === 0) {
    return {
      ready: true,
      score,
      status: "READY_TO_ADVANCE",
      label: "Ready to Advance",
      recommendation: "Demonstrates high competency across all assessed strands. Move on to the next unit.",
    };
  }

  if (score >= 58 || (score >= 50 && gaps.length <= 1)) {
    return {
      ready: false,
      score,
      status: "TARGETED_REVISION",
      label: "Almost Ready — Targeted Revision",
      recommendation: gaps.length > 0
        ? `Focus targeted revision on weak topics: ${gaps.map((g) => g.topic).join(", ")}.`
        : "Complete a quick review session before advancing.",
    };
  }

  return {
    ready: false,
    score,
    status: "FOUNDATIONAL_REVISION",
    label: "Needs Foundational Revision",
    recommendation: "Revisit foundational concepts and practice core exercises before attempting the next topic.",
  };
}
