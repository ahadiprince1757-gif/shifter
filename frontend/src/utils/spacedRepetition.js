/**
 * Adaptive Learning + SM-2 Spaced Repetition Engine
 *
 * Combines:
 * - Correctness & Confidence Calibration
 * - SM-2 Spaced Repetition (Interval & Ease Factor)
 * - Dynamic Mastery Score (0.0 to 1.0)
 * - Misconception & Weakness Detection
 * - Real-Time Pedagogical Recommendation Engine (Next Action)
 *
 * Quality Ratings:
 * 5 = Perfect (Correct + High Confidence)
 * 4 = Good (Correct + Medium Confidence)
 * 3 = Passable / Guess (Correct + Low Confidence)
 * 2 = Misconception (Incorrect + High Confidence)
 * 1 = Weak Understanding (Incorrect + Medium Confidence)
 * 0 = Blank / Unknown (Incorrect + Low Confidence)
 */

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

/**
 * Convert correctness + confidence into SM-2 quality rating (0–5).
 * @param {boolean} isCorrect
 * @param {string} [confidence="medium"] - "low" | "medium" | "high"
 */
export function convertToQualityRating(isCorrect, confidence = "medium") {
  const normConfidence = ["low", "medium", "high"].includes(confidence) ? confidence : "medium";

  if (isCorrect) {
    if (normConfidence === "high") return 5;
    if (normConfidence === "medium") return 4;
    return 3;
  }

  if (normConfidence === "high") return 2;
  if (normConfidence === "medium") return 1;
  return 0;
}

/**
 * Calculate the updated Ease Factor using the standard SM-2 formula.
 */
function calculateEaseFactor(previousEase, qualityRating) {
  const newEase =
    previousEase +
    (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));

  return Math.max(MIN_EASE_FACTOR, newEase);
}

/**
 * Calculate the next review interval in days with confidence adjustments.
 */
function calculateInterval(qualityRating, repetitions, previousInterval, easeFactor) {
  // Incorrect answer - reset interval
  if (qualityRating < 3) {
    return 1;
  }

  // First successful review
  if (repetitions === 0) {
    return 1;
  }

  // Second successful review
  if (repetitions === 1) {
    return 6;
  }

  // Normal SM-2 progression
  let interval = Math.round(previousInterval * easeFactor);

  /**
   * Confidence adjustments:
   * Quality 3 = Correct but low confidence (possible guess). Shorten interval to 70%.
   * Quality 4 = Correct with medium confidence. Shorten interval to 90%.
   */
  if (qualityRating === 3) {
    interval = Math.max(1, Math.round(interval * 0.7));
  } else if (qualityRating === 4) {
    interval = Math.max(1, Math.round(interval * 0.9));
  }

  return interval;
}

/**
 * Determine the student's current learning state.
 */
function determineLearningState({ isCorrect, confidence, masteryScore, repetitions }) {
  // High confidence wrong answer = active misconception
  if (!isCorrect && confidence === "high") {
    return "misconception";
  }

  // Any incorrect answer
  if (!isCorrect) {
    return "learning";
  }

  // Strong evidence of mastery
  if (masteryScore >= 0.85 && repetitions >= 3 && confidence === "high") {
    return "mastered";
  }

  return "learning";
}

/**
 * Update continuous mastery score (0.00 to 1.00).
 */
function calculateMasteryScore(previousMastery, isCorrect, confidence) {
  let score = previousMastery ?? 0;
  const normConfidence = ["low", "medium", "high"].includes(confidence) ? confidence : "medium";

  if (isCorrect) {
    if (normConfidence === "high") score += 0.12;
    else if (normConfidence === "medium") score += 0.08;
    else score += 0.04;
  } else {
    if (normConfidence === "high") score -= 0.18; // Misconception penalty
    else if (normConfidence === "medium") score -= 0.12;
    else score -= 0.08;
  }

  return Math.min(1, Math.max(0, score));
}

/**
 * Pedagogical Recommendation Engine: Decides what the student should do next.
 */
function determineNextAction({ isCorrect, confidence, learningState }) {
  const normConfidence = ["low", "medium", "high"].includes(confidence) ? confidence : "medium";

  // High confidence + wrong = misconception
  if (!isCorrect && normConfidence === "high") {
    return {
      type: "explain",
      priority: "high",
      reason: "High confidence error detected. Review misconception breakdown before retrying.",
    };
  }

  // Wrong + medium confidence
  if (!isCorrect && normConfidence === "medium") {
    return {
      type: "review",
      priority: "high",
      reason: "Partial understanding. Review the key concept and study a worked example.",
    };
  }

  // Wrong + low confidence
  if (!isCorrect && normConfidence === "low") {
    return {
      type: "teach",
      priority: "high",
      reason: "Unfamiliar topic. Review core definitions from the basics.",
    };
  }

  // Correct + low confidence
  if (isCorrect && normConfidence === "low") {
    return {
      type: "reinforce",
      priority: "medium",
      reason: "Correct answer but low confidence. Practice another variant to confirm mastery.",
    };
  }

  // Correct + medium confidence
  if (isCorrect && normConfidence === "medium") {
    return {
      type: "practice",
      priority: "medium",
      reason: "Good progress. Continue practice to solidify understanding.",
    };
  }

  // Correct + high confidence + mastered
  if (isCorrect && normConfidence === "high" && learningState === "mastered") {
    return {
      type: "advance",
      priority: "low",
      reason: "Topic mastered! Advance to the next concept or higher difficulty.",
    };
  }

  // Correct + high confidence
  return {
    type: "continue",
    priority: "low",
    reason: "Demonstrated strong understanding. Scheduled for standard review interval.",
  };
}

/**
 * Main calculation entry point.
 * Supports both function signatures:
 * 1) calculateNextReview(isCorrect: boolean, confidence: string, currentItem: object)
 * 2) calculateNextReview(qualityRating: number, currentItem: object)
 */
export function calculateNextReview(param1, param2 = null, param3 = null) {
  let isCorrect = true;
  let confidence = "medium";
  let currentItem = null;
  let qualityRating = 4;

  if (typeof param1 === "boolean") {
    isCorrect = param1;
    confidence = typeof param2 === "string" ? param2 : "medium";
    currentItem = param3 || null;
    qualityRating = convertToQualityRating(isCorrect, confidence);
  } else if (typeof param1 === "number") {
    qualityRating = Math.min(5, Math.max(0, Math.round(param1)));
    currentItem = param2 || null;
    isCorrect = qualityRating >= 3;
    confidence = qualityRating === 5 || qualityRating === 2 ? "high" : qualityRating === 4 || qualityRating === 1 ? "medium" : "low";
  } else {
    throw new Error("Invalid parameters for calculateNextReview");
  }

  const previousInterval = currentItem?.interval_days ?? 0;
  const previousRepetitions = currentItem?.repetitions ?? 0;
  const previousEase = currentItem?.ease_factor ?? DEFAULT_EASE_FACTOR;
  const previousMastery = currentItem?.mastery_score ?? 0;

  let repetitions = previousRepetitions;

  // Calculate updated metrics
  const masteryScore = calculateMasteryScore(previousMastery, isCorrect, confidence);
  const easeFactor = calculateEaseFactor(previousEase, qualityRating);
  const intervalDays = calculateInterval(qualityRating, previousRepetitions, previousInterval, easeFactor);

  if (qualityRating >= 3) {
    repetitions += 1;
  } else {
    repetitions = 0;
  }

  const learningState = determineLearningState({
    isCorrect,
    confidence,
    masteryScore,
    repetitions,
  });

  const nextAction = determineNextAction({
    isCorrect,
    confidence,
    learningState,
  });

  const now = new Date();
  const nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    // SM-2 Spaced Repetition fields (backwards compatible)
    quality_rating: qualityRating,
    interval_days: intervalDays,
    ease_factor: Number(easeFactor.toFixed(2)),
    repetitions,

    // Adaptive Learning & Recommendation Engine fields
    mastery_score: Number(masteryScore.toFixed(2)),
    learning_state: learningState,
    next_action: nextAction,

    // Timestamps
    next_review_at: nextReviewAt,
    updated_at: now.toISOString(),
  };
}
