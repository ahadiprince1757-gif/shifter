/**
 * Engine 4: Student Memory & Diagnostic Confidence Model
 *
 * Architecture:
 * 1. 2-Level Recurrence Tracker:
 *    - Topic-specific recurrence (repeated error within one topic)
 *    - Cross-topic recurrence (same misconception across >= 3 distinct topics)
 * 2. Time-Decay Evidence Model (30-day half-life so resolved errors naturally decay)
 * 3. Two-Score Diagnostic Framework:
 *    - Student Understanding Score (How well the student appears to understand)
 *    - Diagnostic Confidence Score (How confident Tixar is in its diagnosis)
 */

const MEMORY_STORAGE_KEY = "tixar_student_error_memory_v2";
const LEGACY_STORAGE_KEY = "tixar_student_error_memory_v1";

const DEFAULT_MEMORY = {
  attempts: [],
  topicErrors: {},
  globalErrors: {},
  misconceptionProfiles: {},
};

/**
 * Calculates time-decay weight for past error evidence (30-day half-life)
 *
 * @param {number} timestamp - Unix timestamp in ms
 * @returns {number} Decay multiplier between 0.0 and 1.0
 */
export function calculateRecencyWeight(timestamp) {
  const ageDays = (Date.now() - Number(timestamp || Date.now())) / (1000 * 60 * 60 * 24);
  return Math.pow(0.5, Math.max(0, ageDays) / 30);
}

/**
 * Safely load student error history from localStorage.
 * Handles migration from v1 memory structure seamlessly.
 *
 * @returns {Object}
 */
export function getStudentMemory() {
  try {
    if (typeof localStorage === "undefined") {
      return { ...DEFAULT_MEMORY };
    }

    const raw = localStorage.getItem(MEMORY_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

    if (!raw) {
      return { ...DEFAULT_MEMORY };
    }

    const parsed = JSON.parse(raw);

    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      topicErrors: parsed.topicErrors && typeof parsed.topicErrors === "object" ? parsed.topicErrors : {},
      globalErrors: parsed.globalErrors && typeof parsed.globalErrors === "object" ? parsed.globalErrors : {},
      misconceptionProfiles:
        parsed.misconceptionProfiles && typeof parsed.misconceptionProfiles === "object"
          ? parsed.misconceptionProfiles
          : {},
    };
  } catch (error) {
    console.warn("[DiagnosticMemory] Failed to load memory:", error);
    return { ...DEFAULT_MEMORY };
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

    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(memory));
    return true;
  } catch (error) {
    console.warn("[DiagnosticMemory] Failed to save memory:", error);
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
 * Records an error attempt and evaluates 2-level recurrence (topic vs cross-topic).
 *
 * @param {string} topicId
 * @param {string} errorCategory
 * @returns {Object} Recurrence evaluation with decay weighting
 */
export function recordErrorAndGetRecurrence(topicId, errorCategory) {
  const topic = normalizeKey(topicId);
  const category = normalizeKey(errorCategory);

  if (!topic || !category) {
    return {
      level: "UNKNOWN",
      label: "Insufficient diagnostic information",
      topicCount: 0,
      crossTopicCount: 0,
      uniqueTopics: 0,
      decayWeightedScore: 0,
    };
  }

  const memory = getStudentMemory();

  memory.topicErrors ??= {};
  memory.globalErrors ??= {};
  memory.misconceptionProfiles ??= {};

  // 1. TOPIC-SPECIFIC RECURRENCE
  const topicKey = `${topic}:${category}`;
  memory.topicErrors[topicKey] = (memory.topicErrors[topicKey] || 0) + 1;
  const topicCount = memory.topicErrors[topicKey];

  // 2. CROSS-TOPIC RECURRENCE
  if (!memory.globalErrors[category]) {
    memory.globalErrors[category] = {
      count: 0,
      topics: [],
    };
  }

  const globalError = memory.globalErrors[category];
  globalError.count += 1;

  if (!globalError.topics.includes(topic)) {
    globalError.topics.push(topic);
  }

  const uniqueTopics = globalError.topics.length;

  // 3. RECORD ATTEMPT HISTORY
  memory.attempts.push({
    topicId: topic,
    errorCategory: category,
    timestamp: Date.now(),
  });

  // Cap history to 500 recent attempts
  if (memory.attempts.length > 500) {
    memory.attempts = memory.attempts.slice(-500);
  }

  // 4. CALCULATE TIME-DECAYED RECURRENCE EVIDENCE
  const relevantAttempts = memory.attempts.filter(
    (a) => a.errorCategory === category
  );

  const decayWeightedScore = Math.round(
    relevantAttempts.reduce(
      (sum, a) => sum + calculateRecencyWeight(a.timestamp),
      0
    ) * 10
  ) / 10;

  // 5. DETERMINE DIAGNOSTIC LEVEL
  let level = "SINGLE_SLIP";
  let label = "One-off performance error";

  // Same error category demonstrated across at least 3 distinct topics
  if (uniqueTopics >= 3 && decayWeightedScore >= 2.0) {
    level = "CROSS_TOPIC_RECURRENCE";
    label = "Recurring misconception across multiple learning areas";
  }
  // Repeated error within one topic
  else if (topicCount >= 2 && decayWeightedScore >= 1.5) {
    level = "PROBABLE_MISCONCEPTION";
    label = "Repeated conceptual difficulty detected";
  }

  // 6. UPDATE MISCONCEPTION PROFILE
  memory.misconceptionProfiles[category] = {
    category,
    totalOccurrences: globalError.count,
    affectedTopics: globalError.topics,
    uniqueTopicCount: uniqueTopics,
    decayWeightedScore,
    lastSeen: Date.now(),
    status: level,
  };

  saveStudentMemory(memory);

  return {
    level,
    label,
    topicId: topic,
    errorCategory: category,
    topicCount,
    crossTopicCount: globalError.count,
    uniqueTopics,
    decayWeightedScore,
  };
}

/**
 * Clear all diagnostic memory.
 */
export function clearStudentMemory() {
  try {
    if (typeof localStorage === "undefined") {
      return;
    }
    localStorage.removeItem(MEMORY_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (error) {
    console.warn("[DiagnosticMemory] Failed to clear memory:", error);
  }
}

/**
 * Computes the Student Understanding Evidence Score (0 to 100).
 * Measures how well the student appears to understand the target material.
 *
 * @param {Object} params
 * @param {Object|null} [params.graphEval]
 * @param {Object|null} [params.misconception]
 * @param {boolean} [params.isMathValid=false]
 * @returns {number} Understanding score (0-100)
 */
export function computeUnderstandingEvidence({
  graphEval = null,
  misconception = null,
  isMathValid = false,
} = {}) {
  const conceptCoverage = clampScore(
    graphEval?.weightedScore ?? (isMathValid ? 85 : 40)
  );

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

  let terminologyPrecision;
  if (graphEval) {
    const missingEssential = Array.isArray(graphEval.essentialMissing)
      ? graphEval.essentialMissing.length
      : 0;
    terminologyPrecision = missingEssential === 0 ? 90 : 50;
  } else {
    terminologyPrecision = isMathValid ? 80 : 60;
  }
  terminologyPrecision = clampScore(terminologyPrecision);

  const reasoningQuality = clampScore(isMathValid ? 90 : 45);
  const criticalMisconceptionsCount = misconception ? 1 : 0;

  const rawScore =
    conceptCoverage * 0.35 +
    relationshipAccuracy * 0.30 +
    terminologyPrecision * 0.20 +
    reasoningQuality * 0.15 -
    criticalMisconceptionsCount * 15;

  return Math.round(clamp(rawScore, 0, 100));
}

/**
 * Computes Tixar's Diagnostic Confidence Score (0 to 99).
 * Measures how confident Tixar is in its diagnostic conclusions.
 *
 * @param {Object} params
 * @param {number} [params.attempts=1] - Number of observed attempts
 * @param {number} [params.verifierConfidence=0.5] - Truth Brain verifier confidence (0.0 to 1.0)
 * @param {string} [params.recurrenceLevel="UNKNOWN"] - Recurrence level (CROSS_TOPIC_RECURRENCE | PROBABLE_MISCONCEPTION | SINGLE_SLIP)
 * @param {boolean} [params.graphEvidence=false] - Whether concept graph reasoning evidence exists
 * @returns {number} Diagnostic confidence percentage (0-99)
 */
export function computeDiagnosticConfidence({
  attempts = 1,
  verifierConfidence = 0.5,
  recurrenceLevel = "UNKNOWN",
  graphEvidence = false,
} = {}) {
  let confidence = 0;

  // Observation volume boosts confidence
  if (attempts >= 5) {
    confidence += 30;
  } else if (attempts >= 3) {
    confidence += 20;
  } else if (attempts >= 2) {
    confidence += 10;
  } else {
    confidence += 5;
  }

  // Quality of Truth Brain verifier
  confidence += Math.min(30, Math.max(0, verifierConfidence * 30));

  // Concept Graph reasoning provides structural evidence
  if (graphEvidence) {
    confidence += 20;
  }

  // Multi-context pattern evidence increases certainty
  if (recurrenceLevel === "CROSS_TOPIC_RECURRENCE") {
    confidence += 20;
  } else if (recurrenceLevel === "PROBABLE_MISCONCEPTION") {
    confidence += 12;
  }

  return Math.round(clamp(confidence, 10, 99));
}

/**
 * Backward-compatible 6-dimensional diagnostic confidence wrapper.
 * Combines understanding evidence score and diagnostic confidence score.
 *
 * @param {Object} params
 * @returns {Object} Detailed diagnostic evaluation object
 */
export function computeDiagnosticConfidenceScore({
  graphEval = null,
  misconception = null,
  isMathValid = false,
  attempts = 1,
  verifierConfidence = 0.85,
  recurrenceLevel = "UNKNOWN",
} = {}) {
  const conceptCoverage = clampScore(
    graphEval?.weightedScore ?? (isMathValid ? 85 : 40)
  );

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

  let terminologyPrecision;
  if (graphEval) {
    const missingEssential = Array.isArray(graphEval.essentialMissing)
      ? graphEval.essentialMissing.length
      : 0;
    terminologyPrecision = missingEssential === 0 ? 90 : 50;
  } else {
    terminologyPrecision = isMathValid ? 80 : 60;
  }
  terminologyPrecision = clampScore(terminologyPrecision);

  const reasoningQuality = clampScore(isMathValid ? 90 : 45);
  const criticalMisconceptionsCount = misconception ? 1 : 0;

  const understandingScore = computeUnderstandingEvidence({
    graphEval,
    misconception,
    isMathValid,
  });

  const diagnosticConfidence = computeDiagnosticConfidence({
    attempts,
    verifierConfidence,
    recurrenceLevel,
    graphEvidence: Boolean(graphEval),
  });

  return {
    conceptCoverage,
    relationshipAccuracy,
    terminologyPrecision,
    reasoningQuality,
    criticalMisconceptionsCount,
    understandingScore,
    diagnosticConfidence,
  };
}

function clampScore(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(100, numeric));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}