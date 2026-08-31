/**
 * Engine 4: Student Memory & Diagnostic Confidence Model
 *
 * Tracks error history across attempts to distinguish slips from deep misconceptions.
 * Computes 6-Dimension Diagnostic Confidence Scores:
 *   1. Concept Coverage
 *   2. Relationship Accuracy
 *   3. Terminology Precision
 *   4. Reasoning Quality
 *   5. Critical Misconceptions
 *   6. Diagnostic Confidence Score
 */

// Memory store key for error trajectories
const MEMORY_STORAGE_KEY = "tixar_student_error_memory_v1";

/**
 * Loads student error history from localStorage.
 */
export function getStudentMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { attempts: [], misconceptions: {} };
  } catch {
    return { attempts: [], misconceptions: {} };
  }
}

/**
 * Records an error attempt in student memory and classifies recurrence.
 *
 * @param {string} topicId
 * @param {string} errorCategory
 * @returns {Object} Recurrence classification
 */
export function recordErrorAndGetRecurrence(topicId, errorCategory) {
  const memory = getStudentMemory();
  const key = `${topicId}:${errorCategory}`;

  const currentCount = (memory.misconceptions[key] || 0) + 1;
  memory.misconceptions[key] = currentCount;
  memory.attempts.push({ topicId, errorCategory, timestamp: Date.now() });

  try {
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memory));
  } catch {
    // Graceful fallback if storage disabled
  }

  let level = "SINGLE_SLIP";
  let label = "Performance Error (One-off slip)";

  if (currentCount >= 3) {
    level = "CROSS_TOPIC_RECURRENCE";
    label = "High-Confidence Fundamental Misconception";
  } else if (currentCount === 2) {
    level = "PROBABLE_MISCONCEPTION";
    label = "Probable Conceptual Gap";
  }

  return {
    level,
    label,
    count: currentCount,
  };
}

/**
 * Computes 6-Dimension Diagnostic Confidence Score.
 * Replaces naive word ratio with meaningful diagnostic metrics.
 *
 * @param {Object} params
 * @returns {Object} 6-Dimension Diagnostic Confidence
 */
export function computeDiagnosticConfidenceScore({
  graphEval,
  misconception,
  isMathValid,
}) {
  const conceptCoverage = graphEval ? graphEval.weightedScore : (isMathValid ? 85 : 40);
  const relationshipAccuracy = misconception ? 20 : (graphEval && graphEval.isEssentialSatisfied ? 95 : 65);
  const terminologyPrecision = graphEval ? (graphEval.essentialMissing.length === 0 ? 90 : 50) : 70;
  const reasoningQuality = isMathValid ? 90 : 45;
  const criticalMisconceptionsCount = misconception ? 1 : 0;

  // Diagnostic Confidence Calculation (weighted multi-dimensional formula)
  const diagnosticConfidence = Math.round(
    conceptCoverage * 0.35 +
    relationshipAccuracy * 0.30 +
    terminologyPrecision * 0.20 +
    reasoningQuality * 0.15 -
    (criticalMisconceptionsCount * 15)
  );

  return {
    conceptCoverage,
    relationshipAccuracy,
    terminologyPrecision,
    reasoningQuality,
    criticalMisconceptionsCount,
    diagnosticConfidence: Math.max(10, Math.min(99, diagnosticConfidence)),
  };
}
