/**
 * ============================================================================
 * TIXAR CANONICAL LEARNING CONTRACTS
 * ============================================================================
 *
 * Immutable, frozen data contracts governing all communication between:
 * Grader ──► Diagnoser ──► Repair Planner ──► Mutator ──► Repair Verifier ──► Memory
 *
 * Constitutional Principles:
 * 1. Immutability: All instances are strictly Object.freeze()'d.
 * 2. Strict Boolean Normalization: "false" as a string or 0 is never coerced to true.
 * 3. Identity Invariant: Diagnosed Skill ≡ Repair Skill ≡ Retest Skill.
 * 4. Determinism: Same input guarantees identical contract shape and values.
 * ============================================================================
 */

import { normalizeBoolean, normalizeCorrectness } from "./evidenceModel.js";

/**
 * Normalizes any value to a strict boolean without JavaScript truthy string bugs.
 * e.g. "false" -> false, "0" -> false, false -> false, 0 -> false
 */
export function normalizeStrictBoolean(val, fallback = false) {
  return normalizeBoolean(val, fallback);
}

/**
 * Factory for canonical Diagnostic result
 */
export function createDiagnosisResult({
  type = "UNKNOWN_WRONG_ANSWER",
  category = "CONCEPTUAL",
  skillId = "unknown",
  concept = "",
  confidence = 0,
  explanation = "",
  misconceptions = [],
  failedStepIndex = -1,
  rawDiagnosis = null,
} = {}) {
  return Object.freeze({
    type: String(type || "UNKNOWN_WRONG_ANSWER"),
    category: String(category || "CONCEPTUAL"),
    skillId: String(skillId || "unknown"),
    concept: String(concept || ""),
    confidence: Math.max(0, Math.min(1, Number(confidence) || 0)),
    explanation: String(explanation || ""),
    misconceptions: Object.freeze([...(misconceptions || [])]),
    failedStepIndex: Number.isInteger(failedStepIndex) ? failedStepIndex : -1,
    rawDiagnosis: rawDiagnosis ? Object.freeze({ ...rawDiagnosis }) : null,
  });
}

/**
 * Factory for canonical Repair Plan result
 */
export function createRepairPlanResult({
  repairTarget = "unknown",
  repairMode = "REINFORCE",
  targetDifficulty = 1,
  difficultyProfile = null,
  cognitiveDemand = "APPLY",
  prerequisite = null,
  shouldMutateOriginal = true,
  questionMode = "ISOLATED_SKILL",
  hint = "",
  repairReason = "",
  atomicRule = null,
  meta = {},
} = {}) {
  return Object.freeze({
    repairTarget: String(repairTarget || "unknown"),
    repairMode: String(repairMode || "REINFORCE"),
    targetDifficulty: Math.max(1, Math.min(5, Number(targetDifficulty) || 1)),
    difficultyProfile: difficultyProfile ? Object.freeze({ ...difficultyProfile }) : null,
    cognitiveDemand: String(cognitiveDemand || "APPLY"),
    prerequisite: prerequisite ? String(prerequisite) : null,
    shouldMutateOriginal: Boolean(shouldMutateOriginal),
    questionMode: String(questionMode || "ISOLATED_SKILL"),
    hint: String(hint || ""),
    repairReason: String(repairReason || ""),
    atomicRule: atomicRule ? Object.freeze({ ...atomicRule }) : null,
    meta: Object.freeze({ ...meta }),
  });
}

/**
 * Factory for canonical Repair Verification result
 */
export function createVerificationResult({
  outcome = "FAILED",
  confidence = 0,
  nextAction = "RETRY_REPAIR",
  nextDifficultyDelta = 0,
  masterySignal = "ABSENT",
  explanation = "",
  shouldEndRepairLoop = false,
  meta = {},
} = {}) {
  return Object.freeze({
    outcome: String(outcome || "FAILED"),
    confidence: Math.max(0, Math.min(1, Number(confidence) || 0)),
    nextAction: String(nextAction || "RETRY_REPAIR"),
    nextDifficultyDelta: Number(nextDifficultyDelta) || 0,
    masterySignal: String(masterySignal || "ABSENT"),
    explanation: String(explanation || ""),
    shouldEndRepairLoop: Boolean(shouldEndRepairLoop),
    meta: Object.freeze({ ...meta }),
  });
}

/**
 * Factory for canonical Memory Update result
 */
export function createMemoryUpdateResult({
  skillId = "unknown",
  intervalDays = 1,
  easeFactor = 2.5,
  repetitions = 0,
  nextReviewDate = null,
  status = "LEARNING",
  repaired = false,
} = {}) {
  return Object.freeze({
    skillId: String(skillId || "unknown"),
    intervalDays: Math.max(0, Number(intervalDays) || 1),
    easeFactor: Math.max(1.3, Number(easeFactor) || 2.5),
    repetitions: Math.max(0, Number(repetitions) || 0),
    nextReviewDate: nextReviewDate || new Date().toISOString(),
    status: String(status || "LEARNING"),
    repaired: Boolean(repaired),
  });
}

/**
 * Authoritative Canonical Learning Result Contract
 * Encapsulates the entire lifecycle event of a student attempt.
 */
export function createLearningResult({
  attemptId = null,
  studentAnswer = "",
  correctAnswer = "",
  isCorrect = false,
  score = 0,
  isPartial = false,
  steps = [],
  solution = "",
  diagnosis = null,
  repairPlan = null,
  verification = null,
  memoryUpdate = null,
  metadata = {},
} = {}) {
  const normalizedCorrect = normalizeStrictBoolean(isCorrect, false);
  const normalizedScore = Number(score ?? (normalizedCorrect ? 1 : 0));

  return Object.freeze({
    identity: Object.freeze({
      timestamp: metadata.timestamp || Date.now(),
      attemptId: attemptId || (metadata.attemptId ? String(metadata.attemptId) : null),
      questionId: metadata.questionId ? String(metadata.questionId) : null,
      subjectId: metadata.subjectId ? String(metadata.subjectId) : null,
      chapterId: metadata.chapterId ? String(metadata.chapterId) : null,
      topicId: metadata.topicId ? String(metadata.topicId) : null,
      skillId: metadata.skillId ? String(metadata.skillId) : null,
    }),
    evaluation: Object.freeze({
      studentAnswer: String(studentAnswer ?? "").trim(),
      correctAnswer: String(correctAnswer ?? "").trim(),
      isCorrect: normalizedCorrect,
      score: normalizedScore,
      isPartial: Boolean(isPartial),
      steps: Object.freeze([...(steps || [])]),
      solution: String(solution ?? ""),
    }),
    diagnosis: diagnosis ? createDiagnosisResult(diagnosis) : null,
    repairPlan: repairPlan ? createRepairPlanResult(repairPlan) : null,
    verification: verification ? createVerificationResult(verification) : null,
    memoryUpdate: memoryUpdate ? createMemoryUpdateResult(memoryUpdate) : null,
    metadata: Object.freeze({ ...metadata }),
  });
}
