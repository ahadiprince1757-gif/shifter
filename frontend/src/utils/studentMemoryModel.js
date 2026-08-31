/**
 * Engine 4: Student Memory & Diagnostic Confidence Model
 *
 * Tracks error history across attempts to distinguish:
 * - SINGLE_SLIP
 * - PROBABLE_MISCONCEPTION
 * - CROSS_TOPIC_RECURRENCE
 *
 * Computes 6 diagnostic dimensions:
 * 1. Concept Coverage
 * 2. Relationship Accuracy
 * 3. Terminology Precision
 * 4. Reasoning Quality
 * 5. Critical Misconceptions
 * 6. Diagnostic Confidence
 */

const MEMORY_STORAGE_KEY = "tixar_student_error_memory_v1";

const DEFAULT_MEMORY = {
  attempts: [],
  misconceptions: {},
};

/**
 * Safely load student error history from localStorage.
 *
 * Works in both browser environments and environments where
 * localStorage does not exist.
 *
 * @returns {Object}
 */
export function getStudentMemory() {
  try {
    if (typeof localStorage === "undefined") {
      return {
        attempts: [],
        misconceptions: {},
      };
    }

    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);

    if (!raw) {
      return {
        attempts: [],
        misconceptions: {},
      };
    }

    const parsed = JSON.parse(raw);

    return {
      attempts: Array.isArray(parsed.attempts)
        ? parsed.attempts
        : [],
      misconceptions:
        parsed.misconceptions &&
        typeof parsed.misconceptions === "object"
          ? parsed.misconceptions
          : {},
    };
  } catch (error) {
    console.warn(
      "[DiagnosticMemory] Failed to load memory:",
      error
    );

    return {
      ...DEFAULT_MEMORY,
    };
  }
}

/**
 * Save student memory safely.
 *
 * @param {Object} memory
 */
function saveStudentMemory(memory) {
  try {
    if (typeof localStorage === "undefined") {
      return false;
    }

    localStorage.setItem(
      MEMORY_STORAGE_KEY,
      JSON.stringify(memory)
    );

    return true;
  } catch (error) {
    console.warn(
      "[DiagnosticMemory] Failed to save memory:",
      error
    );

    return false;
  }
}

/**
 * Normalize identifiers used as memory keys.
 *
 * @param {string} value
 * @returns {string}
 */
function normalizeKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

/**
 * Records an error attempt and determines whether the error
 * looks like a slip or recurring misconception.
 *
 * @param {string} topicId
 * @param {string} errorCategory
 * @returns {Object}
 */
export function recordErrorAndGetRecurrence(
  topicId,
  errorCategory
) {
  const normalizedTopic = normalizeKey(topicId);
  const normalizedCategory = normalizeKey(errorCategory);

  if (!normalizedTopic || !normalizedCategory) {
    return {
      level: "UNKNOWN",
      label: "Insufficient diagnostic information",
      count: 0,
    };
  }

  const memory = getStudentMemory();

  const key = `${normalizedTopic}:${normalizedCategory}`;

  const currentCount =
    Number(memory.misconceptions[key]) || 0;

  const newCount = currentCount + 1;

  memory.misconceptions[key] = newCount;

  memory.attempts.push({
    topicId: normalizedTopic,
    errorCategory: normalizedCategory,
    timestamp: Date.now(),
  });

  // Prevent unlimited localStorage growth.
  // Keep the most recent 500 attempts.
  if (memory.attempts.length > 500) {
    memory.attempts = memory.attempts.slice(-500);
  }

  saveStudentMemory(memory);

  let level = "SINGLE_SLIP";
  let label = "Performance Error (One-off slip)";

  if (newCount >= 3) {
    level = "CROSS_TOPIC_RECURRENCE";
    label = "Recurring Fundamental Misconception";
  } else if (newCount === 2) {
    level = "PROBABLE_MISCONCEPTION";
    label = "Probable Conceptual Gap";
  }

  return {
    level,
    label,
    count: newCount,
    topicId: normalizedTopic,
    errorCategory: normalizedCategory,
  };
}

/**
 * Clear all diagnostic memory.
 *
 * Useful for:
 * - testing
 * - development
 * - resetting a student's diagnostic profile
 */
export function clearStudentMemory() {
  try {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.removeItem(MEMORY_STORAGE_KEY);
  } catch (error) {
    console.warn(
      "[DiagnosticMemory] Failed to clear memory:",
      error
    );
  }
}

/**
 * Computes the 6-dimensional diagnostic confidence score.
 *
 * IMPORTANT:
 * This function does NOT claim mastery merely because the
 * student got the final answer correct.
 *
 * @param {Object} params
 * @param {Object|null} params.graphEval
 * @param {Object|null} params.misconception
 * @param {boolean} params.isMathValid
 * @returns {Object}
 */
export function computeDiagnosticConfidenceScore({
  graphEval = null,
  misconception = null,
  isMathValid = false,
} = {}) {
  /*
   * 1. CONCEPT COVERAGE
   *
   * Prefer the weighted concept graph score when available.
   * For mathematics, a valid mathematical path provides
   * stronger evidence than a simple answer match.
   */
  const conceptCoverage = clampScore(
    graphEval?.weightedScore ??
      (isMathValid ? 85 : 40)
  );

  /*
   * 2. RELATIONSHIP ACCURACY
   *
   * A misconception is strong evidence that the student's
   * conceptual relationship model is wrong.
   */
  let relationshipAccuracy;

  if (misconception) {
    relationshipAccuracy = 20;
  } else if (graphEval?.isEssentialSatisfied) {
    relationshipAccuracy = 95;
  } else if (graphEval) {
    relationshipAccuracy = 65;
  } else {
    relationshipAccuracy = isMathValid ? 85 : 50;
  }

  relationshipAccuracy = clampScore(relationshipAccuracy);

  /*
   * 3. TERMINOLOGY PRECISION
   */
  let terminologyPrecision;

  if (graphEval) {
    const missingEssential =
      Array.isArray(graphEval.essentialMissing)
        ? graphEval.essentialMissing.length
        : 0;

    terminologyPrecision =
      missingEssential === 0 ? 90 : 50;
  } else {
    terminologyPrecision = isMathValid ? 80 : 60;
  }

  terminologyPrecision = clampScore(
    terminologyPrecision
  );

  /*
   * 4. REASONING QUALITY
   */
  const reasoningQuality = clampScore(
    isMathValid ? 90 : 45
  );

  /*
   * 5. CRITICAL MISCONCEPTIONS
   *
   * Keep this numeric because the final confidence formula
   * uses it as a penalty.
   */
  const criticalMisconceptionsCount =
    misconception ? 1 : 0;

  /*
   * 6. OVERALL DIAGNOSTIC CONFIDENCE
   *
   * Weighted evidence:
   *
   * Concept Coverage       35%
   * Relationship Accuracy  30%
   * Terminology Precision  20%
   * Reasoning Quality      15%
   *
   * Then apply a strong misconception penalty.
   */
  const rawConfidence =
    conceptCoverage * 0.35 +
    relationshipAccuracy * 0.30 +
    terminologyPrecision * 0.20 +
    reasoningQuality * 0.15 -
    criticalMisconceptionsCount * 15;

  const diagnosticConfidence = Math.round(
    clamp(rawConfidence, 10, 99)
  );

  return {
    conceptCoverage,
    relationshipAccuracy,
    terminologyPrecision,
    reasoningQuality,
    criticalMisconceptionsCount,
    diagnosticConfidence,
  };
}

/**
 * Clamp a numeric score between 0 and 100.
 *
 * @param {number} value
 * @returns {number}
 */
function clampScore(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, numeric)
  );
}

/**
 * Generic clamp helper.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}