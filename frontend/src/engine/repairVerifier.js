/**
 * ============================================================================
 * TIXAR REPAIR VERIFIER
 * ============================================================================
 *
 * Purpose:
 *   After a repair question is answered, determine whether the repair
 *   SUCCEEDED, PARTIALLY SUCCEEDED, or FAILED — and issue the next
 *   instruction to the adaptive loop.
 *
 * Design principles:
 *   1. Never grade the same dimension twice (don't double-penalise).
 *   2. A correct answer alone is not enough — it must align with the repair plan.
 *   3. A wrong answer might still be a step forward (partial credit).
 *   4. After 3 consecutive failures on the same target, escalate differently.
 *   5. Never modify question content — only judge outcomes.
 *
 * Pipeline position:
 *   Diagnoser → Repair Planner → Mutator → Repair Question → [Repair Verifier] → Restoration Engine
 *
 * Output (VerificationResult):
 * {
 *   outcome:             string,   // REPAIRED | PARTIAL | FAILED | ADVANCEMENT
 *   confidence:          number,   // 0–1
 *   nextAction:          string,   // ADVANCE | RETRY_REPAIR | ESCALATE | RESTORE | TRANSFER
 *   nextDifficultyDelta: number,   // +1 advance, 0 retry, -1 escalate
 *   masterySignal:       string,   // CONFIRMED | EMERGING | ABSENT
 *   explanation:         string,   // Human-readable reason for the decision
 *   shouldEndRepairLoop: boolean,
 *   _meta:               object,
 * }
 * ============================================================================
 */

import { createRepairPlan, isAdvancementPlan } from "./repairPlanner.js";

// ============================================================================
// THRESHOLDS
// ============================================================================

const THRESHOLDS = {
  // Confidence below this is treated as a failed repair
  MIN_REPAIR_CONFIDENCE:    0.6,

  // After this many consecutive failures on the same target, escalate
  MAX_CONSECUTIVE_FAILURES: 3,

  // Partial credit awarded when student is numerically close
  PARTIAL_NUMERIC_TOLERANCE: 0.15, // 15% relative error
};

// ============================================================================
// OUTCOME DEFINITIONS
// ============================================================================

const OUTCOME = {
  REPAIRED:    "REPAIRED",    // Student answered correctly; skill is repaired
  PARTIAL:     "PARTIAL",     // Progress made but not full repair
  FAILED:      "FAILED",      // No evidence of repair
  ADVANCEMENT: "ADVANCEMENT", // Repair was not needed; student is advancing
};

const NEXT_ACTION = {
  ADVANCE:       "ADVANCE",       // Move to harder/transfer question
  RETRY_REPAIR:  "RETRY_REPAIR",  // Re-attempt repair at same level
  ESCALATE:      "ESCALATE",      // Drop deeper into prerequisites
  RESTORE:       "RESTORE",       // Return to main learning path
  TRANSFER:      "TRANSFER",      // Apply skill in new context
};

const MASTERY_SIGNAL = {
  CONFIRMED: "CONFIRMED", // Strong evidence of mastery
  EMERGING:  "EMERGING",  // Some evidence, needs reinforcement
  ABSENT:    "ABSENT",    // No evidence of mastery
};

// ============================================================================
// ANSWER EQUIVALENCE HELPERS
// ============================================================================

function parseNumber(value) {
  const cleaned = String(value ?? "")
    .replace(/,/g, "")
    .replace(/[^\d.+\-eE]/g, "")
    .trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function isNumericallyCorrect(studentAnswer, correctAnswer) {
  const sa = parseNumber(studentAnswer);
  const ca = parseNumber(correctAnswer);
  if (sa !== null && ca !== null) {
    return Math.abs(sa - ca) < 1e-9;
  }
  return (
    String(studentAnswer).trim().toLowerCase() ===
    String(correctAnswer).trim().toLowerCase()
  );
}

function isNumericallyClose(studentAnswer, correctAnswer) {
  const sa = parseNumber(studentAnswer);
  const ca = parseNumber(correctAnswer);
  if (sa === null || ca === null) return false;
  if (ca === 0) return Math.abs(sa) < 0.01;
  return Math.abs(sa - ca) / Math.abs(ca) <= THRESHOLDS.PARTIAL_NUMERIC_TOLERANCE;
}

// ============================================================================
// MCQ VERIFIER
// ============================================================================

function verifyMCQAnswer(studentAnswer, correctAnswer, options) {
  if (!Array.isArray(options) || options.length === 0) {
    return isNumericallyCorrect(studentAnswer, correctAnswer);
  }

  const studentNorm = String(studentAnswer ?? "").trim().toLowerCase();
  const correctNorm = String(correctAnswer ?? "").trim().toLowerCase();

  // Direct match
  if (studentNorm === correctNorm) return true;

  // Match by option index ("A", "B", "C" → index 0, 1, 2)
  const letterMap = { a: 0, b: 1, c: 2, d: 3, e: 4 };
  const studentIdx = letterMap[studentNorm] ?? -1;
  const correctIdx = letterMap[correctNorm] ?? -1;

  if (studentIdx >= 0 && correctIdx >= 0) return studentIdx === correctIdx;

  // Match by option text
  const correctOption = options[correctIdx];
  if (correctOption) {
    return studentNorm === String(correctOption).trim().toLowerCase();
  }

  return false;
}

// ============================================================================
// CORE VERIFICATION LOGIC
// ============================================================================

/**
 * Verify the outcome of a repair question attempt.
 *
 * @param {object} repairPlan          - The plan that generated this repair question (from repairPlanner)
 * @param {object} repairQuestion      - The repair question that was shown { q, ans, type, options }
 * @param {object} studentAttempt      - { answer, timeMs, workShown }
 * @param {object} [context]
 * @param {number} [context.consecutiveFailures=0]  - Failures on this repair target so far
 * @param {boolean} [context.isFirstAttempt=true]   - Whether this is the student's first try at this question
 * @returns {VerificationResult}
 */
export function verifyRepair(repairPlan, repairQuestion, studentAttempt, context = {}) {
  const {
    consecutiveFailures = 0,
    isFirstAttempt = true,
  } = context;

  // --- Validate inputs
  if (!repairPlan || !repairQuestion || !studentAttempt) {
    return _errorResult("MISSING_INPUTS");
  }

  // --- Advancement path: student was already correct
  if (isAdvancementPlan(repairPlan)) {
    return _advancementResult(repairPlan);
  }

  const studentAnswer = String(studentAttempt.answer ?? "").trim();
  const correctAnswer = String(repairQuestion.ans ?? "").trim();
  const questionType  = repairQuestion.type || "short_answer";

  // --- Determine correctness
  let isCorrect = false;

  if (questionType === "mcq") {
    isCorrect = verifyMCQAnswer(studentAnswer, correctAnswer, repairQuestion.options);
  } else {
    isCorrect = isNumericallyCorrect(studentAnswer, correctAnswer);
  }

  const isClose = !isCorrect && isNumericallyClose(studentAnswer, correctAnswer);

  // --- Speed / confidence signals
  const timeMs = Number(studentAttempt.timeMs ?? 0);
  const answeredQuickly = timeMs > 0 && timeMs < 8000; // < 8 seconds suggests recall, not guess
  const showedWork = Boolean(studentAttempt.workShown);

  // ============================================================
  // REPAIRED
  // ============================================================
  if (isCorrect) {
    const masterySignal = (isFirstAttempt && answeredQuickly) || showedWork
      ? MASTERY_SIGNAL.CONFIRMED
      : MASTERY_SIGNAL.EMERGING;

    const outcome = OUTCOME.REPAIRED;
    const shouldEndRepairLoop = masterySignal === MASTERY_SIGNAL.CONFIRMED;

    return {
      outcome,
      confidence: masterySignal === MASTERY_SIGNAL.CONFIRMED ? 0.9 : 0.75,
      nextAction: shouldEndRepairLoop ? NEXT_ACTION.RESTORE : NEXT_ACTION.ADVANCE,
      nextDifficultyDelta: 1,
      masterySignal,
      explanation: masterySignal === MASTERY_SIGNAL.CONFIRMED
        ? `Repair confirmed. "${repairPlan.repairTarget}" appears solid.`
        : `Correct, but needs one more reinforcement before restoring main path.`,
      shouldEndRepairLoop,
      _meta: {
        repairTarget:        repairPlan.repairTarget,
        repairMode:          repairPlan.repairMode,
        questionMode:        repairPlan.questionMode,
        consecutiveFailures,
        studentAnswerCorrect: true,
        isFirstAttempt,
      },
    };
  }

  // ============================================================
  // PARTIAL (numerically close, not conceptually broken)
  // ============================================================
  if (isClose) {
    return {
      outcome: OUTCOME.PARTIAL,
      confidence: 0.5,
      nextAction: NEXT_ACTION.RETRY_REPAIR,
      nextDifficultyDelta: 0,
      masterySignal: MASTERY_SIGNAL.EMERGING,
      explanation: `Answer is close. Likely a calculation slip rather than a conceptual gap. Retry same level.`,
      shouldEndRepairLoop: false,
      _meta: {
        repairTarget:         repairPlan.repairTarget,
        repairMode:           repairPlan.repairMode,
        questionMode:         repairPlan.questionMode,
        consecutiveFailures,
        studentAnswerCorrect: false,
        isFirstAttempt,
      },
    };
  }

  // ============================================================
  // FAILED — check escalation threshold
  // ============================================================
  const totalFailures = consecutiveFailures + 1;
  const shouldEscalate = totalFailures >= THRESHOLDS.MAX_CONSECUTIVE_FAILURES;

  if (shouldEscalate) {
    return {
      outcome: OUTCOME.FAILED,
      confidence: 0.85,
      nextAction: NEXT_ACTION.ESCALATE,
      nextDifficultyDelta: -1,
      masterySignal: MASTERY_SIGNAL.ABSENT,
      explanation: `${totalFailures} consecutive failures on "${repairPlan.repairTarget}". ` +
        `Escalating to prerequisite: "${repairPlan.prerequisite || "basic skill"}".`,
      shouldEndRepairLoop: false,
      _meta: {
        repairTarget:         repairPlan.repairTarget,
        repairMode:           repairPlan.repairMode,
        questionMode:         repairPlan.questionMode,
        consecutiveFailures:  totalFailures,
        studentAnswerCorrect: false,
        isFirstAttempt,
      },
    };
  }

  // Standard failure — retry repair
  return {
    outcome: OUTCOME.FAILED,
    confidence: 0.7,
    nextAction: NEXT_ACTION.RETRY_REPAIR,
    nextDifficultyDelta: 0,
    masterySignal: MASTERY_SIGNAL.ABSENT,
    explanation: `Repair attempt failed (${totalFailures} / ${THRESHOLDS.MAX_CONSECUTIVE_FAILURES}). ` +
      `Retrying repair for "${repairPlan.repairTarget}".`,
    shouldEndRepairLoop: false,
    _meta: {
      repairTarget:         repairPlan.repairTarget,
      repairMode:           repairPlan.repairMode,
      questionMode:         repairPlan.questionMode,
      consecutiveFailures:  totalFailures,
      studentAnswerCorrect: false,
      isFirstAttempt,
    },
  };
}

// ============================================================================
// RESTORATION ENGINE HOOK
// After a successful repair, decide whether to restore the main path.
// ============================================================================

/**
 * After a REPAIRED outcome, call this to build the restoration plan.
 * Returns what to show next on the main learning path.
 *
 * @param {VerificationResult} verificationResult
 * @param {object}             originalBlueprint    - The question that originally triggered failure
 * @param {number}             [currentMastery=0]   - Current mastery score (0–1)
 * @returns {{ shouldRestore: boolean, action: string, reason: string }}
 */
export function planRestoration(verificationResult, originalBlueprint, currentMastery = 0) {
  if (!verificationResult) {
    return { shouldRestore: false, action: NEXT_ACTION.RETRY_REPAIR, reason: "No verification result." };
  }

  if (verificationResult.outcome === OUTCOME.ADVANCEMENT) {
    return {
      shouldRestore: true,
      action: NEXT_ACTION.TRANSFER,
      reason: "Student is advancing. Move to transfer challenge.",
    };
  }

  if (verificationResult.outcome === OUTCOME.REPAIRED) {
    if (verificationResult.masterySignal === MASTERY_SIGNAL.CONFIRMED) {
      return {
        shouldRestore: true,
        action: NEXT_ACTION.RESTORE,
        reason: `"${verificationResult._meta.repairTarget}" is repaired. Return to main path.`,
      };
    }

    return {
      shouldRestore: false,
      action: NEXT_ACTION.ADVANCE,
      reason: "Repair is emerging. One more reinforcement before restoring.",
    };
  }

  if (verificationResult.outcome === OUTCOME.FAILED) {
    return {
      shouldRestore: false,
      action: verificationResult.nextAction,
      reason: verificationResult.explanation,
    };
  }

  return {
    shouldRestore: false,
    action: NEXT_ACTION.RETRY_REPAIR,
    reason: "Partial progress. Continue repair.",
  };
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

function _advancementResult(repairPlan) {
  return {
    outcome: OUTCOME.ADVANCEMENT,
    confidence: 1.0,
    nextAction: NEXT_ACTION.TRANSFER,
    nextDifficultyDelta: 1,
    masterySignal: MASTERY_SIGNAL.CONFIRMED,
    explanation: `"${repairPlan.repairTarget}" is already mastered. Advancing to transfer challenge.`,
    shouldEndRepairLoop: true,
    _meta: {
      repairTarget:         repairPlan.repairTarget,
      repairMode:           repairPlan.repairMode,
      questionMode:         repairPlan.questionMode,
      consecutiveFailures:  0,
      studentAnswerCorrect: true,
      isFirstAttempt:       true,
    },
  };
}

function _errorResult(reason) {
  return {
    outcome: OUTCOME.FAILED,
    confidence: 0,
    nextAction: NEXT_ACTION.RETRY_REPAIR,
    nextDifficultyDelta: 0,
    masterySignal: MASTERY_SIGNAL.ABSENT,
    explanation: `Verification error: ${reason}`,
    shouldEndRepairLoop: false,
    _meta: {
      repairTarget:         "unknown",
      repairMode:           "UNKNOWN",
      questionMode:         "UNKNOWN",
      consecutiveFailures:  0,
      studentAnswerCorrect: false,
      isFirstAttempt:       false,
    },
  };
}

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export { OUTCOME, NEXT_ACTION, MASTERY_SIGNAL };

/**
 * Returns a short human-readable label for the outcome + next action.
 * Useful for debug overlays or analytics logging.
 */
export function summarizeVerification(result) {
  if (!result) return "No verification result.";
  return (
    `[${result.outcome}] → ${result.nextAction} ` +
    `| mastery: ${result.masterySignal} ` +
    `| confidence: ${Math.round(result.confidence * 100)}% ` +
    `| endLoop: ${result.shouldEndRepairLoop}`
  );
}
