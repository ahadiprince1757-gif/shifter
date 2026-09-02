/**
 * TIXAR CENTRALIZED CBC GRADING ENGINE
 *
 * Official Kenya Competency-Based Curriculum (CBC) Performance Level Scale.
 *
 * Marks    CBC Level    Category                    Points
 * 90–100   EE1          Exceeding Expectations      8
 * 75–89    EE2          Exceeding Expectations      7
 * 58–74    ME1          Meeting Expectations        6
 * 41–57    ME2          Meeting Expectations        5
 * 31–40    AE1          Approaching Expectations    4
 * 21–30    AE2          Approaching Expectations    3
 * 11–20    BE1          Below Expectations          2
 * 0–10     BE2          Below Expectations          1
 */

export const CBC_GRADING_SCALE = [
  {
    min: 90,
    max: 100,
    level: "EE1",
    category: "Exceeding Expectations",
    points: 8,
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeText: "#059669",
    description: "Exceptional mastery of the assessed competencies.",
  },
  {
    min: 75,
    max: 89,
    level: "EE2",
    category: "Exceeding Expectations",
    points: 7,
    badgeBg: "rgba(16, 185, 129, 0.12)",
    badgeText: "#10b981",
    description: "Strong mastery with minor areas for improvement.",
  },
  {
    min: 58,
    max: 74,
    level: "ME1",
    category: "Meeting Expectations",
    points: 6,
    badgeBg: "rgba(59, 130, 246, 0.15)",
    badgeText: "#2563eb",
    description: "Demonstrates solid understanding of the competencies.",
  },
  {
    min: 41,
    max: 57,
    level: "ME2",
    category: "Meeting Expectations",
    points: 5,
    badgeBg: "rgba(59, 130, 246, 0.12)",
    badgeText: "#3b82f6",
    description: "Meets basic expectations but requires further development.",
  },
  {
    min: 31,
    max: 40,
    level: "AE1",
    category: "Approaching Expectations",
    points: 4,
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeText: "#d97706",
    description: "Approaching the expected level of competency.",
  },
  {
    min: 21,
    max: 30,
    level: "AE2",
    category: "Approaching Expectations",
    points: 3,
    badgeBg: "rgba(245, 158, 11, 0.12)",
    badgeText: "#f59e0b",
    description: "Requires significant improvement to meet expectations.",
  },
  {
    min: 11,
    max: 20,
    level: "BE1",
    category: "Below Expectations",
    points: 2,
    badgeBg: "rgba(239, 68, 68, 0.15)",
    badgeText: "#dc2626",
    description: "Demonstrates limited competency.",
  },
  {
    min: 0,
    max: 10,
    level: "BE2",
    category: "Below Expectations",
    points: 1,
    badgeBg: "rgba(239, 68, 68, 0.12)",
    badgeText: "#ef4444",
    description: "Requires substantial support and intervention.",
  },
];

/**
 * Calculates official CBC Performance Grade from score (0-100).
 *
 * @param {number} score
 * @returns {object} CBC Grade details
 */
export function calculateCBCGrade(score) {
  const numericScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));

  const grade = CBC_GRADING_SCALE.find(
    (item) => numericScore >= item.min && numericScore <= item.max
  ) || CBC_GRADING_SCALE[CBC_GRADING_SCALE.length - 1];

  return {
    score: numericScore,
    ...grade,
  };
}
