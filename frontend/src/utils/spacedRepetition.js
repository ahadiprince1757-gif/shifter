/**
 * SM-2 Spaced Repetition Algorithm Implementation
 * Calculates memory retention review intervals based on answer accuracy & confidence calibration.
 */

export function calculateNextReview(qualityRating, currentItem = null) {
  // qualityRating: 0 to 5
  // 5: Perfect (Correct + High Confidence)
  // 4: Good (Correct + Medium Confidence)
  // 3: Passable (Correct + Low Confidence)
  // 2: Misconception (Incorrect + High Confidence)
  // 1: Incorrect (Incorrect + Medium Confidence)
  // 0: Complete Blank (Incorrect + Low Confidence)

  const prevInterval = currentItem?.interval_days || 0;
  const prevRepetitions = currentItem?.repetitions || 0;
  const prevEase = currentItem?.ease_factor || 2.5;

  let repetitions = prevRepetitions;
  let intervalDays = 1;
  let easeFactor = prevEase;

  if (qualityRating >= 3) {
    // Correct answer
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(prevInterval * prevEase);
    }
    repetitions += 1;
  } else {
    // Incorrect answer - reset streak
    repetitions = 0;
    intervalDays = 1;
  }

  // Calculate new Ease Factor (min 1.3)
  easeFactor = prevEase + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    next_review_at: nextReviewAt,
    interval_days: intervalDays,
    ease_factor: Number(easeFactor.toFixed(2)),
    repetitions,
    updated_at: new Date().toISOString(),
  };
}

export function convertToQualityRating(isCorrect, confidence) {
  // confidence: "low" | "medium" | "high"
  if (isCorrect) {
    if (confidence === "high") return 5;
    if (confidence === "medium") return 4;
    return 3;
  } else {
    if (confidence === "high") return 2; // High confidence error = misconception
    if (confidence === "medium") return 1;
    return 0;
  }
}
