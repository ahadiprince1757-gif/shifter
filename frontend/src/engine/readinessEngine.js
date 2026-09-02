import { calculateCBCGrade } from "./cbcGrading.js";

/**
 * ============================================================================
 * TIXAR READINESS & MASTERY ENGINE
 * ============================================================================
 *
 * Answers:
 * "Do we have enough evidence that this student can successfully continue
 * without carrying important knowledge gaps forward?"
 *
 * Multi-Factor Weighting:
 * 1. Current Performance (Accuracy)  → 35%
 * 2. Concept Consistency             → 25%
 * 3. Retention                       → 20%
 * 4. Independent Performance         → 10%
 * 5. Evidence Confidence             → 10%
 *
 * Safety Gating:
 * - Unresolved critical gaps block advancement regardless of averages.
 * - Low evidence confidence (< 50) triggers INSUFFICIENT_EVIDENCE.
 * - Ready status requires readinessScore >= 80, accuracy >= 75, and consistencyScore >= 70.
 * ============================================================================
 */

export function computeTixarReadiness({
  accuracyRate = 0,
  conceptScores = [],
  failedConcepts = [],
  repairedConcepts = [],
  retentionRate = null,
  hintsUsedCount = 0,
  totalQuestions = 0,
  criticalGaps = [],
  diagnosticConfidence = 0,
  // Legacy backward compatibility properties
  failedQuestions = [],
} = {}) {
  // 1. NORMALIZE ACCURACY
  const accuracy = clampPercent(accuracyRate);

  // 2. CBC PERFORMANCE GRADE
  const cbc = calculateCBCGrade(accuracy);

  // 3. CONCEPT CONSISTENCY (Calculates std dev penalty across concept scores)
  const consistencyScore = calculateConceptConsistency(conceptScores, accuracy);

  // 4. VERIFIED REPAIR (Concept-level repair tracking)
  const normalizedFailed =
    Array.isArray(failedConcepts) && failedConcepts.length > 0
      ? failedConcepts
      : Array.isArray(failedQuestions)
      ? failedQuestions
      : [];

  const repairScore = calculateRepairScore(normalizedFailed, repairedConcepts);

  // 5. RETENTION (Performance on delayed review)
  const retentionScore =
    retentionRate === null
      ? Math.round(accuracy * 0.85)
      : clampPercent(retentionRate);

  // 6. INDEPENDENT PERFORMANCE (Penalty for excessive hint usage)
  const derivedTotalQs =
    totalQuestions > 0
      ? totalQuestions
      : Math.max(
          1,
          (Array.isArray(failedQuestions) ? failedQuestions.length : 0) +
            (accuracy > 0 ? 5 : 0)
        );

  const independenceScore = calculateIndependence(hintsUsedCount, derivedTotalQs);

  // 7. EVIDENCE CONFIDENCE
  const evidenceConfidence = calculateEvidenceConfidence(
    derivedTotalQs,
    diagnosticConfidence
  );

  // 8. BASE READINESS SCORE
  const readinessScore = Math.round(
    accuracy * 0.35 +
      consistencyScore * 0.25 +
      retentionScore * 0.20 +
      independenceScore * 0.10 +
      evidenceConfidence * 0.10
  );

  // 9. READINESS DECISION & SAFETY GATING
  const unresolvedCriticalGaps = Array.isArray(criticalGaps) ? criticalGaps : [];

  let status = "NOT_READY";
  let statusLabel = "Needs Foundational Revision";
  let badgeBg = "rgba(239, 68, 68, 0.15)";
  let badgeText = "#ef4444";
  let recommendation = "Strengthen foundational concepts before progressing.";

  // Critical gaps override averages
  if (unresolvedCriticalGaps.length > 0) {
    status = "CRITICAL_GAP";
    statusLabel = "Critical Knowledge Gap Detected";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    badgeText = "#dc2626";
    recommendation = `Before advancing, strengthen weak concepts: ${unresolvedCriticalGaps.join(
      ", "
    )}.`;
  }
  // Insufficient evidence
  else if (evidenceConfidence < 50) {
    status = "INSUFFICIENT_EVIDENCE";
    statusLabel = "More Evidence Needed";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    badgeText = "#d97706";
    recommendation =
      "Complete additional practice questions to confirm consistent mastery.";
  }
  // Ready to Advance
  else if (readinessScore >= 80 && accuracy >= 75 && consistencyScore >= 70) {
    status = "READY";
    statusLabel = "Ready to Advance";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    badgeText = "#10b981";
    recommendation =
      "Strong and sufficiently consistent evidence of mastery has been demonstrated.";
  }
  // Almost Ready — Targeted Revision
  else if (readinessScore >= 60) {
    status = "ALMOST_READY";
    statusLabel = "Almost Ready — Targeted Revision";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    badgeText = "#f59e0b";
    recommendation = "Focus on the weakest concepts and demonstrate mastery again.";
  }

  return {
    score: accuracy,
    readinessScore,
    status,
    statusLabel,
    badgeBg,
    badgeText,
    recommendation,
    cbc,

    // Transparent Evidence Metrics
    metrics: {
      accuracy,
      conceptConsistency: consistencyScore,
      verifiedRepair: repairScore,
      retention: retentionScore,
      independence: independenceScore,
      evidenceConfidence,
    },

    blockingFactors: unresolvedCriticalGaps,
  };
}

/**
 * Calculates consistency across concepts based on standard deviation variation penalty.
 */
function calculateConceptConsistency(conceptScores, fallbackScore) {
  if (!Array.isArray(conceptScores) || conceptScores.length === 0) {
    return fallbackScore;
  }

  const scores = conceptScores.map((item) =>
    clampPercent(item?.score ?? item?.mastery ?? item?.performance)
  );

  const average = scores.reduce((sum, value) => sum + value, 0) / scores.length;
  const variance =
    scores.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) /
    scores.length;
  const standardDeviation = Math.sqrt(variance);

  return Math.round(Math.max(0, Math.min(100, average - standardDeviation)));
}

/**
 * Measures whether previously weak CONCEPTS have been successfully repaired.
 */
function calculateRepairScore(failedConcepts, repairedConcepts) {
  const failed = new Set(Array.isArray(failedConcepts) ? failedConcepts : []);
  const repaired = new Set(
    repairedConcepts instanceof Set
      ? repairedConcepts
      : Array.isArray(repairedConcepts)
      ? repairedConcepts
      : []
  );

  if (failed.size === 0) {
    return 100;
  }

  let repairedCount = 0;
  for (const concept of failed) {
    if (repaired.has(concept)) {
      repairedCount++;
    }
  }

  return Math.round((repairedCount / failed.size) * 100);
}

/**
 * Measures performance without excessive hint reliance.
 */
function calculateIndependence(hintsUsed, totalQuestions) {
  if (!totalQuestions || totalQuestions <= 0) {
    return 50;
  }

  const hintRate = Math.max(0, Number(hintsUsed) || 0) / totalQuestions;
  return Math.round(Math.max(0, 100 - hintRate * 100));
}

/**
 * Measures observation volume and diagnostic evidence confidence.
 */
function calculateEvidenceConfidence(attempts, diagnosticConfidence) {
  let attemptConfidence = 20;

  if (attempts >= 10) attemptConfidence = 95;
  else if (attempts >= 7) attemptConfidence = 85;
  else if (attempts >= 5) attemptConfidence = 75;
  else if (attempts >= 3) attemptConfidence = 60;
  else if (attempts >= 2) attemptConfidence = 40;

  const diagnostic = clampPercent(diagnosticConfidence);
  return Math.round(attemptConfidence * 0.7 + diagnostic * 0.3);
}

/**
 * Clamps numeric inputs to 0–100.
 */
function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}
