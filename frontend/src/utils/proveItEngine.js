/**
 * Prove It Diagnostic Ladder & Transfer Testing Engine
 *
 * Drives the cognitive progression:
 *
 *   Level 1 → Procedural Foundation
 *   Level 2 → Operational Stress
 *   Level 3 → Real-World Transfer
 *
 * Adaptive cycle:
 *
 *   TEST → DIAGNOSE → TEACH → RETRIEVE → WAIT → RETEST → TRANSFER
 *
 * Core rule:
 *   A single correct answer does NOT prove mastery.
 *
 * Advancement requires sufficient evidence across attempts.
 */

import { CbcRubricEvaluator } from "./cbcRubricEvaluator.js";
import { getPrerequisiteChain } from "../data/cbcCurriculumGraph.js";

const LEVELS = {
  1: {
    name: "Procedural Foundations",
    description: "Can the student execute the core procedure?",
  },

  2: {
    name: "Operational Stress Check",
    description: "Can the student handle variation and increased complexity?",
  },

  3: {
    name: "Real-World Transfer",
    description: "Can the student apply the concept in a new context?",
  },
};

const ACTIONS = {
  CONTINUE_PRACTICE: "CONTINUE_PRACTICE",
  PROVE_IT_LEVEL_UP: "PROVE_IT_LEVEL_UP",
  TEACH_MISCONCEPTION: "TEACH_MISCONCEPTION",
  TEACH_TRANSLATION_BRIDGE: "TEACH_TRANSLATION_BRIDGE",
  PREREQUISITE_REMEDIATION: "PREREQUISITE_REMEDIATION",
  RETRIEVE_UNASSISTED: "RETRIEVE_UNASSISTED",
  RETEST: "RETEST",
  TOPIC_MASTERY_ACHIEVED: "TOPIC_MASTERY_ACHIEVED",
};

/**
 * Minimum evidence required before advancing.
 *
 * Two successful attempts are safer than one.
 */
const PROMOTION_RULES = {
  1: {
    minimumAttempts: 2,
    requiredCorrect: 2,
  },

  2: {
    minimumAttempts: 2,
    requiredCorrect: 2,
  },

  3: {
    minimumAttempts: 2,
    requiredCorrect: 2,
  },
};

/**
 * Safely normalize a session level.
 */
function normalizeLevel(level) {
  const parsed = Number(level);

  if (!Number.isFinite(parsed)) return 1;

  return Math.min(3, Math.max(1, Math.floor(parsed)));
}

/**
 * Safely normalize attempts.
 */
function normalizeAttempts(attempts) {
  if (!Array.isArray(attempts)) return [];

  return attempts.filter(Boolean);
}

/**
 * Determine whether an attempt belongs to a valid ladder level.
 */
export function isValidLevel(level) {
  return Number.isInteger(level) && level >= 1 && level <= 3;
}

/**
 * Get attempts for a particular level.
 */
function getLevelAttempts(attempts, level) {
  return attempts.filter(
    (attempt) => normalizeLevel(attempt.level) === level
  );
}

/**
 * Count correct attempts at a level.
 */
export function getCorrectCount(attempts, level) {
  return getLevelAttempts(attempts, level).filter(
    (attempt) => attempt.isCorrect === true
  ).length;
}

/**
 * Calculate performance for a level.
 */
function getLevelPerformance(attempts, level) {
  const levelAttempts = getLevelAttempts(attempts, level);

  if (levelAttempts.length === 0) {
    return {
      attempts: 0,
      correct: 0,
      accuracy: 0,
    };
  }

  const correct = levelAttempts.filter(
    (attempt) => attempt.isCorrect === true
  ).length;

  return {
    attempts: levelAttempts.length,
    correct,
    accuracy: Math.round((correct / levelAttempts.length) * 100),
  };
}

/**
 * Determine whether the student has enough evidence to advance.
 *
 * We intentionally require consecutive recent success rather than
 * relying on historical attempts from weeks/months ago.
 */
function hasPromotionEvidence(attempts, level) {
  const rule = PROMOTION_RULES[level];

  if (!rule) return false;

  const levelAttempts = getLevelAttempts(attempts, level);

  if (levelAttempts.length < rule.minimumAttempts) {
    return false;
  }

  const recentAttempts = levelAttempts.slice(-rule.minimumAttempts);

  return (
    recentAttempts.filter((attempt) => attempt.isCorrect === true).length >=
    rule.requiredCorrect
  );
}

/**
 * Determine whether the student has a persistent failure pattern.
 */
function hasPersistentFailure(attempts, level) {
  const levelAttempts = getLevelAttempts(attempts, level);

  if (levelAttempts.length < 2) {
    return false;
  }

  const recentAttempts = levelAttempts.slice(-3);

  return (
    recentAttempts.length >= 2 &&
    recentAttempts.filter((attempt) => attempt.isCorrect === false).length >= 2
  );
}

/**
 * Extract the most recent diagnosis.
 */
function getLatestDiagnosis(sessionState, currentDiagnosis) {
  if (currentDiagnosis && typeof currentDiagnosis === "object") {
    return currentDiagnosis;
  }

  const attempts = normalizeAttempts(sessionState.attempts);

  for (let i = attempts.length - 1; i >= 0; i--) {
    if (attempts[i]?.diagnosis) {
      return attempts[i].diagnosis;
    }
  }

  return {};
}

/**
 * Safely determine whether a misconception exists.
 */
export function hasMisconception(diagnosis) {
  return Boolean(
    diagnosis?.misconception ||
      diagnosis?.type === "MISCONCEPTION" ||
      diagnosis?.category === "MISCONCEPTION"
  );
}

/**
 * Extract misconception object safely.
 */
function getMisconception(diagnosis) {
  if (diagnosis?.misconception) {
    return diagnosis.misconception;
  }

  if (diagnosis?.type === "MISCONCEPTION") {
    return diagnosis;
  }

  return null;
}

/**
 * Safely determine whether the mathematical path is valid.
 */
function isValidMathPath(diagnosis) {
  if (typeof diagnosis?.isMathValid === "boolean") {
    return diagnosis.isMathValid;
  }

  if (typeof diagnosis?.isMathValidPath === "boolean") {
    return diagnosis.isMathValidPath;
  }

  return true;
}

/**
 * Determine whether the question actually has a usable step structure.
 */
export function hasStepStructure(question) {
  return (
    Array.isArray(question?.steps) &&
    question.steps.filter(
      (step) => typeof step === "string" && step.trim()
    ).length > 0
  );
}

/**
 * Determine whether a question is a transfer question.
 */
export function isTransferQuestion(question, level) {
  if (level === 3) return true;

  const mode = String(
    question?.mode ||
      question?.questionType ||
      question?.type ||
      ""
  ).toLowerCase();

  return (
    mode.includes("transfer") ||
    mode.includes("real_world") ||
    mode.includes("application")
  );
}

/**
 * Safely resolve prerequisite chain.
 */
function resolvePrerequisites(question = {}) {
  const subject = question.subject || "math";

  const strand =
    question.subStrand ||
    question.strand ||
    question.topic ||
    "quadratic_expressions_1";

  try {
    const chain = getPrerequisiteChain(subject, strand);

    return Array.isArray(chain) ? chain : [];
  } catch (error) {
    console.warn(
      "[Tixar ProveIt] Failed to resolve prerequisite chain:",
      error
    );

    return [];
  }
}

export class ProveItEngine {
  /**
   * Return the current ladder state.
   */
  static getLadderState(sessionState = {}) {
    const level = normalizeLevel(sessionState.level);
    const attempts = normalizeAttempts(sessionState.attempts);

    const level1 = getLevelPerformance(attempts, 1);
    const level2 = getLevelPerformance(attempts, 2);
    const level3 = getLevelPerformance(attempts, 3);

    const level1Complete = hasPromotionEvidence(attempts, 1);
    const level2Complete = hasPromotionEvidence(attempts, 2);
    const level3Complete = hasPromotionEvidence(attempts, 3);

    return {
      level,

      phaseName: LEVELS[level].name,
      phaseDescription: LEVELS[level].description,

      levels: {
        1: {
          ...level1,
          complete: level1Complete,
        },

        2: {
          ...level2,
          complete: level2Complete,
        },

        3: {
          ...level3,
          complete: level3Complete,
        },
      },

      isLevel1Complete: level1Complete,
      isLevel2Complete: level2Complete,
      isLevel3Complete: level3Complete,

      canAdvance:
        level < 3
          ? hasPromotionEvidence(attempts, level)
          : level3Complete,

      topicMastered: level3Complete,
    };
  }

  /**
   * Evaluate an attempt and determine the next adaptive action.
   */
  static evaluateAndStep(
    qBlueprint = {},
    studentResponse = {},
    sessionState = {}
  ) {
    const currentLevel = normalizeLevel(sessionState.level);
    const attempts = normalizeAttempts(sessionState.attempts);

    const isCorrect = studentResponse?.isCorrect === true;

    const diagnosis = getLatestDiagnosis(
      sessionState,
      studentResponse?.diagnosis
    );

    /**
     * Evaluate rubric defensively.
     */
    let rubricEval;

    try {
      rubricEval = CbcRubricEvaluator.evaluateAttempt({
        isCorrect,
        level: currentLevel,
        diagnosis,
      });
    } catch (error) {
      console.warn(
        "[Tixar ProveIt] Rubric evaluation failed:",
        error
      );

      rubricEval = {
        rubric: {
          code: isCorrect ? "A" : "B",
        },
      };
    }

    const rubricCode = rubricEval?.rubric?.code || null;

    const misconception = getMisconception(diagnosis);
    const mathPathValid = isValidMathPath(diagnosis);

    const persistentFailure = hasPersistentFailure(
      attempts,
      currentLevel
    );

    const hasPromotion = hasPromotionEvidence(
      attempts,
      currentLevel
    );

    let nextLevel;
    let actionType;
    let bridgeLesson;
    let prerequisiteTrace;
    let reason;

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 1 — KNOWLEDGE / MISCONCEPTION FAILURE
     * ────────────────────────────────────────────────
     *
     * Never advance a student while an explicit misconception
     * remains unresolved.
     */
    if (!isCorrect && misconception) {
      actionType = ACTIONS.TEACH_MISCONCEPTION;

      reason = "An explicit conceptual misconception was detected.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace: null,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 2 — PREREQUISITE / FOUNDATIONAL FAILURE
     * ────────────────────────────────────────────────
     */
    if (!isCorrect && rubricCode === "BE") {
      actionType = ACTIONS.PREREQUISITE_REMEDIATION;

      prerequisiteTrace = resolvePrerequisites(qBlueprint);

      reason =
        "The response indicates a foundational gap that should be repaired before continuing.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 3 — INVALID MATHEMATICAL PATH
     * ────────────────────────────────────────────────
     */
    if (!isCorrect && !mathPathValid) {
      actionType = ACTIONS.RETRIEVE_UNASSISTED;

      reason =
        "The student's working contains an invalid mathematical transformation.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace: null,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 4 — LEVEL 3 TRANSFER FAILURE
     * ────────────────────────────────────────────────
     */
    if (!isCorrect && currentLevel === 3) {
      actionType = ACTIONS.TEACH_TRANSLATION_BRIDGE;

      bridgeLesson = {
        title:
          "Translating Real-World Scenarios into Mathematical Models",

        concept:
          "Real-World Boundary Condition Mapping",

        summary:
          "Your procedural mathematics may be developing well. The next step is identifying which real-world conditions correspond to mathematical equations.",

        example:
          "If a ball hits the ground, its height is zero. Set h(t) = 0 and solve for the physically meaningful time.",
      };

      reason =
        "The student reached transfer but could not successfully map the real-world situation to the mathematical model.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson,
        prerequisiteTrace: null,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 5 — REPEATED FAILURE
     * ────────────────────────────────────────────────
     */
    if (!isCorrect && persistentFailure) {
      actionType = ACTIONS.RETRIEVE_UNASSISTED;

      reason =
        "Repeated failure suggests the student needs another retrieval attempt before increasing difficulty.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace: null,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 6 — INCORRECT BUT NO CLEAR DIAGNOSIS
     * ────────────────────────────────────────────────
     */
    if (!isCorrect) {
      actionType = ACTIONS.RETRIEVE_UNASSISTED;

      reason =
        "The answer is incorrect, but the system does not yet have enough evidence to identify the exact misconception.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace: null,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 7 — CORRECT BUT NOT ENOUGH EVIDENCE
     * ────────────────────────────────────────────────
     *
     * This is the most important correction.
     *
     * One correct answer ≠ mastery.
     */
    if (isCorrect && !hasPromotion) {
      actionType = ACTIONS.RETEST;

      reason =
        "The student answered correctly, but additional independent evidence is required before promotion.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: currentLevel,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace: null,
        reason,
        mastery: false,
      });
    }

    /**
     * ────────────────────────────────────────────────
     * PRIORITY 8 — PROMOTION
     * ────────────────────────────────────────────────
     */
    if (isCorrect && hasPromotion) {
      if (currentLevel < 3) {
        nextLevel = currentLevel + 1;

        actionType = ACTIONS.PROVE_IT_LEVEL_UP;

        reason =
          `The student demonstrated sufficient evidence at Level ${currentLevel}.`;

        return this.#buildResult({
          rubricEval,
          currentLevel,
          nextLevel,
          actionType,
          bridgeLesson: null,
          prerequisiteTrace: null,
          reason,
          mastery: false,
        });
      }

      /**
       * Level 3 complete.
       */
      actionType = ACTIONS.TOPIC_MASTERY_ACHIEVED;

      reason =
        "The student demonstrated reliable performance through transfer.";

      return this.#buildResult({
        rubricEval,
        currentLevel,
        nextLevel: 3,
        actionType,
        bridgeLesson: null,
        prerequisiteTrace: null,
        reason,
        mastery: true,
      });
    }

    /**
     * Safety fallback.
     */
    return this.#buildResult({
      rubricEval,
      currentLevel,
      nextLevel: currentLevel,
      actionType: ACTIONS.CONTINUE_PRACTICE,
      bridgeLesson: null,
      prerequisiteTrace: null,
      reason: "Continue collecting evidence.",
      mastery: false,
    });
  }

  /**
   * Build a consistent engine response.
   */
  static #buildResult({
    rubricEval,
    currentLevel,
    nextLevel,
    actionType,
    bridgeLesson,
    prerequisiteTrace,
    reason,
    mastery,
  }) {
    return {
      rubricEval,

      currentLevel,

      nextLevel,

      phase:
        LEVELS[currentLevel]?.name ||
        "Unknown",

      nextPhase:
        LEVELS[nextLevel]?.name ||
        "Unknown",

      actionType,

      bridgeLesson,

      prerequisiteTrace,

      reason,

      mastery: Boolean(mastery),

      shouldAdvance: nextLevel > currentLevel,

      shouldTeach:
        actionType === ACTIONS.TEACH_MISCONCEPTION ||
        actionType === ACTIONS.PREREQUISITE_REMEDIATION ||
        actionType === ACTIONS.TEACH_TRANSLATION_BRIDGE,

      shouldRetest:
        actionType === ACTIONS.RETEST ||
        actionType === ACTIONS.RETRIEVE_UNASSISTED,

      shouldScheduleReview:
        actionType === ACTIONS.TOPIC_MASTERY_ACHIEVED,
    };
  }
}