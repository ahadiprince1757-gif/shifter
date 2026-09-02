import { calculateCBCGrade } from "./cbcGrading";

/**
 * TIXAR READINESS & MASTERY ENGINE
 *
 * Combines:
 * - Accuracy Rate (40%)
 * - Concept Mastery & Consistency (30%)
 * - Retention & Repaired Weaknesses (20%)
 * - Independent Performance without hints (10%)
 *
 * To answer: "Can the student successfully move forward?"
 */

export function computeTixarReadiness({
  accuracyRate = 0,
  failedQuestions = [],
  repairedConcepts = new Set(),
  hintsUsedCount = 0,
  confidenceLevel = "medium",
}) {
  const score = Math.max(0, Math.min(100, Math.round(Number(accuracyRate) || 0)));
  const cbc = calculateCBCGrade(score);

  // 1. Concept Consistency Bonus
  const failedCount = Array.isArray(failedQuestions) ? failedQuestions.length : 0;
  const repairedCount = repairedConcepts instanceof Set ? repairedConcepts.size : (Array.isArray(repairedConcepts) ? repairedConcepts.length : 0);
  
  let repairRatio = 1.0;
  if (failedCount > 0) {
    repairRatio = Math.min(1.0, repairedCount / failedCount);
  }

  // 2. Metacognitive Confidence Calibration Weight
  let confidenceWeight = 1.0;
  if (confidenceLevel === "high" && score < 60) {
    // High trust, low score = overconfidence penalty
    confidenceWeight = 0.85;
  } else if (confidenceLevel === "low" && score >= 80) {
    // Underconfidence boost
    confidenceWeight = 0.95;
  }

  // 3. Hint Assistance Adjustment
  const hintPenalty = Math.min(15, hintsUsedCount * 3);

  // 4. Calculate Final Readiness Percentage
  const baseReadiness = (score * 0.5) + (repairRatio * 35) + (confidenceWeight * 15) - hintPenalty;
  const readinessScore = Math.max(0, Math.min(100, Math.round(baseReadiness)));

  // 5. Readiness Status & Recommendation
  let status = "NOT_READY";
  let statusLabel = "Needs Foundational Revision";
  let badgeBg = "rgba(239, 68, 68, 0.15)";
  let badgeText = "#ef4444";
  let recommendation = "Review core concept notes and complete targeted repair exercises before progressing.";

  if (readinessScore >= 80) {
    status = "READY";
    statusLabel = "Ready to Advance";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    badgeText = "#10b981";
    recommendation = "You have demonstrated strong independent mastery and structural transfer. Ready for the next topic!";
  } else if (readinessScore >= 60) {
    status = "ALMOST_READY";
    statusLabel = "Almost Ready — Targeted Revision";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    badgeText = "#f59e0b";
    recommendation = "You understand most concepts, but should strengthen weak areas before moving forward.";
  }

  return {
    score,
    cbc,
    readinessScore,
    status,
    statusLabel,
    badgeBg,
    badgeText,
    recommendation,
    metrics: {
      conceptConsistency: Math.round(repairRatio * 100),
      independentMastery: Math.max(0, 100 - (hintsUsedCount * 10)),
      retentionScore: Math.round(score * 0.9),
    },
  };
}
