/**
 * Tixar Adaptive Learning + Spaced Repetition Engine
 *
 * Purpose:
 * Turns an attempt into:
 *
 *   1. Quality evidence
 *   2. Updated mastery
 *   3. Learning state
 *   4. Review interval
 *   5. Next pedagogical action
 *
 * Core loop:
 *
 * TEST
 *   ↓
 * DIAGNOSE
 *   ↓
 * TEACH / RETRIEVE / REPAIR
 *   ↓
 * WAIT
 *   ↓
 * RETEST
 *   ↓
 * TRANSFER / PROVE MASTERY
 *
 * Quality:
 *
 * 5 = Correct + high confidence
 * 4 = Correct + medium confidence
 * 3 = Correct + low confidence
 * 2 = Incorrect + high confidence
 * 1 = Incorrect + medium confidence
 * 0 = Incorrect + low confidence
 */

const MIN_EASE_FACTOR = 1.3;
const MAX_EASE_FACTOR = 3.0;
const DEFAULT_EASE_FACTOR = 2.5;

const MIN_INTERVAL_DAYS = 1;
const MAX_INTERVAL_DAYS = 3650;

const VALID_CONFIDENCE = ["low", "medium", "high"];

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

function normalizeConfidence(confidence) {
  return VALID_CONFIDENCE.includes(confidence) ? confidence : "medium";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function safeNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function safeMastery(value) {
  return clamp(safeNumber(value, 0), 0, 1);
}

function safeRepetitions(value) {
  return Math.max(0, Math.floor(safeNumber(value, 0)));
}

function safeInterval(value) {
  return clamp(
    safeNumber(value, 0),
    0,
    MAX_INTERVAL_DAYS
  );
}

function safeEaseFactor(value) {
  return clamp(
    safeNumber(value, DEFAULT_EASE_FACTOR),
    MIN_EASE_FACTOR,
    MAX_EASE_FACTOR
  );
}

/* -------------------------------------------------------------------------- */
/* 1. QUALITY RATING                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Converts correctness + confidence into a 0–5 learning-quality score.
 */
export function convertToQualityRating(
  isCorrect,
  confidence = "medium"
) {
  const normConfidence = normalizeConfidence(confidence);

  if (isCorrect === true) {
    if (normConfidence === "high") return 5;
    if (normConfidence === "medium") return 4;
    return 3;
  }

  if (normConfidence === "high") return 2;
  if (normConfidence === "medium") return 1;

  return 0;
}

/* -------------------------------------------------------------------------- */
/* 2. SM-2 EASE FACTOR                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Standard SM-2 ease-factor update.
 *
 * Quality:
 * 0–2 = failure
 * 3–5 = successful recall
 */
function calculateEaseFactor(previousEase, qualityRating) {
  const ease = safeEaseFactor(previousEase);
  const q = clamp(Math.round(qualityRating), 0, 5);

  const updated =
    ease +
    (
      0.1 -
      (5 - q) *
        (0.08 + (5 - q) * 0.02)
    );

  return clamp(
    updated,
    MIN_EASE_FACTOR,
    MAX_EASE_FACTOR
  );
}

/* -------------------------------------------------------------------------- */
/* 3. INTERVAL CALCULATION                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Calculates the next review interval.
 *
 * Important correction:
 * The repetition count is updated BEFORE determining the interval.
 *
 * Standard progression:
 *
 * First successful recall  → 1 day
 * Second successful recall → 6 days
 * Later recalls            → previous interval × ease
 *
 * Failed recall:
 * - returns to 1 day
 * - does NOT continue the old interval
 */
function calculateInterval(
  qualityRating,
  previousRepetitions,
  previousInterval,
  easeFactor
) {
  const q = clamp(Math.round(qualityRating), 0, 5);
  const reps = safeRepetitions(previousRepetitions);
  const previous = safeInterval(previousInterval);
  const ease = safeEaseFactor(easeFactor);

  // Failed recall.
  if (q < 3) {
    return MIN_INTERVAL_DAYS;
  }

  // First successful recall.
  if (reps === 0) {
    return 1;
  }

  // Second successful recall.
  if (reps === 1) {
    return 6;
  }

  // Normal SM-2 progression.
  let interval = Math.round(previous * ease);

  // Low-confidence correct answers should be reviewed sooner.
  if (q === 3) {
    interval = Math.round(interval * 0.70);
  }

  // Medium-confidence answers get a moderate reduction.
  if (q === 4) {
    interval = Math.round(interval * 0.90);
  }

  // High-confidence correct answer receives the full interval.
  if (q === 5) {
    interval = Math.round(interval);
  }

  return clamp(
    interval,
    MIN_INTERVAL_DAYS,
    MAX_INTERVAL_DAYS
  );
}

/* -------------------------------------------------------------------------- */
/* 4. MASTERY SCORE                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Updates continuous mastery.
 *
 * Mastery is deliberately conservative:
 *
 * Correct + high confidence     → strong increase
 * Correct + medium confidence   → moderate increase
 * Correct + low confidence      → small increase
 *
 * Incorrect + high confidence   → strong penalty
 * Incorrect + medium confidence → moderate penalty
 * Incorrect + low confidence    → small penalty
 *
 * This prevents a student from "gaming" mastery by repeatedly guessing.
 */
function calculateMasteryScore(
  previousMastery,
  isCorrect,
  confidence
) {
  const previous = safeMastery(previousMastery);
  const normConfidence = normalizeConfidence(confidence);

  let delta;

  if (isCorrect === true) {
    if (normConfidence === "high") {
      delta = 0.12;
    } else if (normConfidence === "medium") {
      delta = 0.07;
    } else {
      delta = 0.025;
    }
  } else {
    if (normConfidence === "high") {
      // Strong penalty because this is evidence of a false belief.
      delta = -0.18;
    } else if (normConfidence === "medium") {
      delta = -0.10;
    } else {
      delta = -0.05;
    }
  }

  return clamp(
    previous + delta,
    0,
    1
  );
}

/* -------------------------------------------------------------------------- */
/* 5. LEARNING STATE                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Determines the student's current state.
 *
 * States:
 *
 * misconception
 * learning
 * reinforcing
 * consolidating
 * mastered
 *
 * Important:
 * "mastered" requires evidence, not merely one high-confidence answer.
 */
function determineLearningState({
  isCorrect,
  confidence,
  masteryScore,
  repetitions,
  qualityRating,
}) {
  const normConfidence = normalizeConfidence(confidence);
  const mastery = safeMastery(masteryScore);
  const reps = safeRepetitions(repetitions);

  // False belief is the most important state to detect.
  if (
    isCorrect === false &&
    normConfidence === "high"
  ) {
    return "misconception";
  }

  // Any failure indicates unresolved learning.
  if (isCorrect === false) {
    return "learning";
  }

  // Correct but uncertain = reinforcement required.
  if (
    isCorrect === true &&
    normConfidence === "low"
  ) {
    return "reinforcing";
  }

  // Strong evidence of durable understanding.
  if (
    qualityRating === 5 &&
    mastery >= 0.85 &&
    reps >= 3
  ) {
    return "mastered";
  }

  // Correct with reasonable confidence, but not yet proven durable.
  if (
    isCorrect === true &&
    mastery >= 0.60
  ) {
    return "consolidating";
  }

  return "learning";
}

/* -------------------------------------------------------------------------- */
/* 6. NEXT PEDAGOGICAL ACTION                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Determines the next learning action.
 *
 * This is intentionally different from the scheduling engine.
 *
 * Scheduling asks:
 *   "When should I see this again?"
 *
 * Pedagogy asks:
 *   "What should I do next?"
 */
function determineNextAction({
  isCorrect,
  confidence,
  learningState,
  masteryScore,
}) {
  const normConfidence = normalizeConfidence(confidence);
  const mastery = safeMastery(masteryScore);

  /* ---------------------------------------------------------------------- */
  /* Misconception                                                           */
  /* ---------------------------------------------------------------------- */

  if (
    !isCorrect &&
    normConfidence === "high"
  ) {
    return {
      type: "teach_misconception",
      priority: "critical",
      target: "incorrect_belief",
      reason:
        "You were confident, but the answer was incorrect. Correct the underlying idea before practicing more.",
      nextStep:
        "SHOW_CONTRASTIVE_EXPLANATION",
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Unknown / weak knowledge                                                */
  /* ---------------------------------------------------------------------- */

  if (
    !isCorrect &&
    normConfidence === "low"
  ) {
    return {
      type: "teach",
      priority: "high",
      target: "missing_foundation",
      reason:
        "You were unsure and the answer was incorrect. Rebuild the prerequisite concept before attempting another problem.",
      nextStep:
        "TEACH_PREREQUISITE",
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Partial understanding                                                   */
  /* ---------------------------------------------------------------------- */

  if (
    !isCorrect &&
    normConfidence === "medium"
  ) {
    return {
      type: "repair",
      priority: "high",
      target: "reasoning_gap",
      reason:
        "Your answer suggests partial understanding. Identify the exact step or concept that broke down.",
      nextStep:
        "SHOW_TARGETED_REPAIR",
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Correct but low confidence                                               */
  /* ---------------------------------------------------------------------- */

  if (
    isCorrect &&
    normConfidence === "low"
  ) {
    return {
      type: "retrieve",
      priority: "high",
      target: "retrieval_strength",
      reason:
        "You got it right, but you were unsure. Retrieve the idea again without assistance to determine whether you actually know it.",
      nextStep:
        "RETRIEVE_UNASSISTED",
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Correct + medium confidence                                             */
  /* ---------------------------------------------------------------------- */

  if (
    isCorrect &&
    normConfidence === "medium"
  ) {
    return {
      type: "practice",
      priority: "medium",
      target: "consolidation",
      reason:
        "You understand the concept reasonably well. Another varied problem will test whether the knowledge is stable.",
      nextStep:
        "PRACTICE_VARIANT",
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Mastery                                                                  */
  /* ---------------------------------------------------------------------- */

  if (
    isCorrect &&
    normConfidence === "high" &&
    learningState === "mastered" &&
    mastery >= 0.85
  ) {
    return {
      type: "transfer",
      priority: "low",
      target: "transfer",
      reason:
        "You have strong evidence of mastery. Prove that you can apply the concept in a new context.",
      nextStep:
        "TRANSFER_TEST",
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Strong answer but not yet mastered                                      */
  /* ---------------------------------------------------------------------- */

  if (
    isCorrect &&
    normConfidence === "high"
  ) {
    return {
      type: "consolidate",
      priority: "medium",
      target: "durability",
      reason:
        "You answered confidently, but Tixar needs repeated successful retrieval before declaring mastery.",
      nextStep:
        "DELAYED_RETEST",
    };
  }

  return {
    type: "continue",
    priority: "medium",
    target: "learning",
    reason:
      "Continue practicing and gather more evidence before changing the learning state.",
    nextStep:
      "CONTINUE_PRACTICE",
  };
}

/* -------------------------------------------------------------------------- */
/* 7. REVIEW DATE                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Creates the next review timestamp.
 *
 * `now` is injectable for testing.
 */
function calculateNextReviewAt(intervalDays, now = new Date()) {
  const baseDate =
    now instanceof Date && !Number.isNaN(now.getTime())
      ? now
      : new Date();

  const nextDate = new Date(
    baseDate.getTime() +
      intervalDays *
        24 *
        60 *
        60 *
        1000
  );

  return nextDate.toISOString();
}

/* -------------------------------------------------------------------------- */
/* 8. MAIN ENTRY POINT                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Supports:
 *
 * calculateNextReview(
 *   isCorrect,
 *   confidence,
 *   currentItem
 * )
 *
 * OR:
 *
 * calculateNextReview(
 *   qualityRating,
 *   currentItem
 * )
 *
 * Optional fourth argument:
 *
 * calculateNextReview(
 *   isCorrect,
 *   confidence,
 *   currentItem,
 *   options
 * )
 */
export function calculateNextReview(
  param1,
  param2 = null,
  param3 = null,
  param4 = {}
) {
  let isCorrect;
  let confidence;
  let currentItem;
  let qualityRating;
  let options;

  /* ---------------------------------------------------------------------- */
  /* Signature 1: boolean + confidence + item                                */
  /* ---------------------------------------------------------------------- */

  if (typeof param1 === "boolean") {
    isCorrect = param1;

    confidence =
      typeof param2 === "string"
        ? normalizeConfidence(param2)
        : "medium";

    currentItem = param3 || {};
    options = param4 || {};

    qualityRating = convertToQualityRating(
      isCorrect,
      confidence
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Signature 2: quality + item                                             */
  /* ---------------------------------------------------------------------- */

  else if (typeof param1 === "number") {
    qualityRating = clamp(
      Math.round(param1),
      0,
      5
    );

    currentItem = param2 || {};
    options = param3 || {};

    isCorrect = qualityRating >= 3;

    if (qualityRating === 5) {
      confidence = "high";
    } else if (qualityRating === 4) {
      confidence = "medium";
    } else if (qualityRating === 3) {
      confidence = "low";
    } else if (qualityRating === 2) {
      confidence = "high";
    } else if (qualityRating === 1) {
      confidence = "medium";
    } else {
      confidence = "low";
    }
  }

  else {
    throw new TypeError(
      "Invalid parameters for calculateNextReview. " +
      "Expected (boolean, confidence, item) or (qualityRating, item)."
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Sanitize existing data                                                  */
  /* ---------------------------------------------------------------------- */

  const previousInterval = safeInterval(
    currentItem.interval_days
  );

  const previousRepetitions = safeRepetitions(
    currentItem.repetitions
  );

  const previousEase = safeEaseFactor(
    currentItem.ease_factor
  );

  const previousMastery = safeMastery(
    currentItem.mastery_score
  );

  /* ---------------------------------------------------------------------- */
  /* Calculate new mastery                                                   */
  /* ---------------------------------------------------------------------- */

  const masteryScore = calculateMasteryScore(
    previousMastery,
    isCorrect,
    confidence
  );

  /* ---------------------------------------------------------------------- */
  /* Calculate new ease                                                       */
  /* ---------------------------------------------------------------------- */

  const easeFactor = calculateEaseFactor(
    previousEase,
    qualityRating
  );

  /* ---------------------------------------------------------------------- */
  /* Update repetitions BEFORE interval calculation                          */
  /* ---------------------------------------------------------------------- */

  let repetitions;

  if (qualityRating >= 3) {
    repetitions = previousRepetitions + 1;
  } else {
    repetitions = 0;
  }

  /* ---------------------------------------------------------------------- */
  /* Calculate interval                                                      */
  /* ---------------------------------------------------------------------- */

  const intervalDays = calculateInterval(
    qualityRating,
    previousRepetitions,
    previousInterval,
    easeFactor
  );

  /* ---------------------------------------------------------------------- */
  /* Determine learning state                                                */
  /* ---------------------------------------------------------------------- */

  const learningState = determineLearningState({
    isCorrect,
    confidence,
    masteryScore,
    repetitions,
    qualityRating,
  });

  /* ---------------------------------------------------------------------- */
  /* Determine pedagogical action                                            */
  /* ---------------------------------------------------------------------- */

  const nextAction = determineNextAction({
    isCorrect,
    confidence,
    learningState,
    masteryScore,
    qualityRating,
  });

  /* ---------------------------------------------------------------------- */
  /* Timestamp                                                               */
  /* ---------------------------------------------------------------------- */

  const now =
    options.now instanceof Date &&
    !Number.isNaN(options.now.getTime())
      ? options.now
      : new Date();

  const nowISO = now.toISOString();

  const nextReviewAt = calculateNextReviewAt(
    intervalDays,
    now
  );

  /* ---------------------------------------------------------------------- */
  /* Return canonical learning state                                         */
  /* ---------------------------------------------------------------------- */

  return {
    /* ------------------------- Attempt evidence ------------------------ */

    quality_rating: qualityRating,
    is_correct: isCorrect,
    confidence,

    /* ------------------------- Spaced repetition ----------------------- */

    interval_days: intervalDays,
    ease_factor: Number(
      easeFactor.toFixed(2)
    ),
    repetitions,

    /* ------------------------- Mastery --------------------------------- */

    mastery_score: Number(
      masteryScore.toFixed(3)
    ),

    learning_state: learningState,

    /* ------------------------- Pedagogy -------------------------------- */

    next_action: nextAction,

    /* ------------------------- Scheduling ------------------------------- */

    next_review_at: nextReviewAt,
    updated_at: nowISO,

    /* ------------------------- Debug / analytics ----------------------- */

    previous_state: {
      interval_days: previousInterval,
      ease_factor: previousEase,
      repetitions: previousRepetitions,
      mastery_score: previousMastery,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* 9. OPTIONAL HELPERS FOR TESTING                                            */
/* -------------------------------------------------------------------------- */

export function getLearningStateLabel(state) {
  const labels = {
    misconception: "Misconception",
    learning: "Learning",
    reinforcing: "Needs Reinforcement",
    consolidating: "Consolidating",
    mastered: "Mastered",
  };

  return labels[state] || "Learning";
}

export function isMastered(item = {}) {
  return (
    item.learning_state === "mastered" &&
    safeMastery(item.mastery_score) >= 0.85 &&
    safeRepetitions(item.repetitions) >= 3
  );
}