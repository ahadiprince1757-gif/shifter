/**
 * ============================================================================
 * TIXAR LEARNING EVENT PROCESSOR — TRUTH & STUDENT BRAIN BRIDGE
 * ============================================================================
 *
 * Responsibilities:
 * 1. Process verified answers from the Truth Brain (Verification Orchestrator).
 * 2. Record rich telemetry events to the Student Brain via recordLearningEvent.
 * 3. Update CBC competency levels and topic mastery metrics.
 * 4. Determine the immediate NEXT BEST ACTION for adaptive student learning.
 * ============================================================================
 */

import { recordLearningEvent, LEARNING_EVENTS } from "./analytics.js";

/**
 * CBC Competency Tiers
 */
export const CBC_COMPETENCY_TIERS = {
  EXCEEDING_EXPECTATIONS: { label: "Exceeding Expectations", code: "EE", level: 4 },
  MEETING_EXPECTATIONS: { label: "Meeting Expectations", code: "ME", level: 3 },
  APPROACHING_EXPECTATIONS: { label: "Approaching Expectations", code: "AE", level: 2 },
  BELOW_EXPECTATIONS: { label: "Below Expectations", code: "BE", level: 1 },
};

/**
 * Standardized Next Best Action Recommendations
 */
export const NEXT_BEST_ACTIONS = {
  REVIEW_CONCEPT: "REVIEW_CONCEPT",
  SHOW_WORKED_EXAMPLE: "SHOW_WORKED_EXAMPLE",
  PRACTICE_TARGETED_WEAKNESS: "PRACTICE_TARGETED_WEAKNESS",
  RETRY_SIMILAR_QUESTION: "RETRY_SIMILAR_QUESTION",
  PROGRESS_NEXT_TOPIC: "PROGRESS_NEXT_TOPIC",
  CONFIRMATION_PRACTICE: "CONFIRMATION_PRACTICE",
};

/**
 * Process a verified question/answer pair and update student learning state.
 *
 * @param {Object} params
 * @param {string} params.question - The question text
 * @param {string} params.candidateAnswer - The student or candidate answer
 * @param {Object} params.verificationResult - Verification output from Truth Brain
 * @param {Object} [params.context] - Additional metadata (userId, subjectId, chapterId, topic, learningOutcomeId, etc.)
 * @returns {Object} Processed learning outcome, CBC evaluation, and Next Best Action
 */
export function processVerifiedLearningEvent({
  question,
  candidateAnswer,
  verificationResult,
  context = {},
}) {
  const {
    userId = null,
    subjectId = verificationResult?.subject || "general",
    chapterId = null,
    topic = verificationResult?.topic || null,
    strand = null,
    subStrand = null,
    learningOutcomeId = null,
    questionId = null,
    questionType = verificationResult?.answerType || null,
    timeSpentSeconds = null,
    hintsUsed = 0,
    attempts = 1,
  } = context;

  const verificationStatus = verificationResult?.verificationStatus || "UNVERIFIED";
  const answerStatus = verificationResult?.answerStatus || "NOT_COMPARABLE";
  const confidence = verificationResult?.confidence ?? 0;
  const canonicalAnswer = verificationResult?.canonicalAnswer || null;

  // Determine accuracy boolean & numerical score
  const isCorrect = answerStatus === "CORRECT";
  const isPartial = answerStatus === "PARTIALLY_CORRECT";
  const score = isCorrect ? 1.0 : isPartial ? 0.5 : 0.0;

  // Map event type
  const eventType = isCorrect
    ? LEARNING_EVENTS.QUESTION_CORRECT
    : answerStatus === "INCORRECT"
    ? LEARNING_EVENTS.QUESTION_INCORRECT
    : LEARNING_EVENTS.QUESTION_ANSWERED;

  // 1. RECORD TELEMETRY EVENT TO STUDENT BRAIN
  recordLearningEvent({
    subjectId,
    chapterId,
    topic,
    userId,

    strand,
    subStrand,
    learningOutcomeId,

    type: eventType,

    correct: isCorrect,
    score,

    questionId,
    questionType,

    timeSpentSeconds,
    attempts,
    hintsUsed,

    metadata: {
      question,
      candidateAnswer,
      canonicalAnswer,
      verificationStatus,
      answerStatus,
      confidence,
      explanation: verificationResult?.explanation || null,
      verifiedSteps: verificationResult?.verifiedSteps || [],
    },
  });

  // 2. EVALUATE CBC COMPETENCY LEVEL
  const cbcCompetency = evaluateCBCCompetency(score, confidence, hintsUsed);

  // 3. COMPUTE NEXT BEST ACTION
  const nextBestAction = computeNextBestAction({
    answerStatus,
    verificationStatus,
    confidence,
    hintsUsed,
    attempts,
    topic,
    learningOutcomeId,
  });

  return {
    verification: verificationResult,
    telemetryRecorded: true,
    performance: {
      correct: isCorrect,
      score,
      answerStatus,
    },
    cbcCompetency,
    nextBestAction,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Evaluate CBC Competency tier based on score, confidence, and scaffolding
 */
export function evaluateCBCCompetency(score, confidence, hintsUsed) {
  // Heavy hint dependency lowers competency tier
  const effectiveScore = hintsUsed > 2 ? Math.max(0, score - 0.2) : score;

  if (effectiveScore >= 0.90 && confidence >= 0.85) {
    return CBC_COMPETENCY_TIERS.EXCEEDING_EXPECTATIONS;
  }
  if (effectiveScore >= 0.70) {
    return CBC_COMPETENCY_TIERS.MEETING_EXPECTATIONS;
  }
  if (effectiveScore >= 0.40) {
    return CBC_COMPETENCY_TIERS.APPROACHING_EXPECTATIONS;
  }
  return CBC_COMPETENCY_TIERS.BELOW_EXPECTATIONS;
}

/**
 * Determine the Next Best Action for the student
 */
export function computeNextBestAction({
  answerStatus,
  verificationStatus,
  confidence,
  hintsUsed = 0,
  attempts = 1,
  topic = null,
  learningOutcomeId = null,
}) {
  if (answerStatus === "INCORRECT") {
    // High hint reliance + incorrect -> return to concept explanation
    if (hintsUsed >= 2 || attempts > 2) {
      return {
        action: NEXT_BEST_ACTIONS.REVIEW_CONCEPT,
        reason: "Multiple incorrect attempts and high hint dependency detected.",
        recommendation: "Review the core concept explanation and worked steps before retrying.",
        topic,
        learningOutcomeId,
      };
    }

    // Single incorrect attempt -> provide a worked example or similar question
    return {
      action: NEXT_BEST_ACTIONS.SHOW_WORKED_EXAMPLE,
      reason: "Candidate answer was incorrect relative to canonical truth.",
      recommendation: "Examine the step-by-step worked solution to see how to solve this problem.",
      topic,
      learningOutcomeId,
    };
  }

  if (answerStatus === "PARTIALLY_CORRECT") {
    return {
      action: NEXT_BEST_ACTIONS.RETRY_SIMILAR_QUESTION,
      reason: "Answer is partially correct, key elements missing or incomplete.",
      recommendation: "Try a similar question to solidify full understanding.",
      topic,
      learningOutcomeId,
    };
  }

  if (answerStatus === "CORRECT") {
    if (verificationStatus === "VERIFIED" && confidence >= 0.85) {
      return {
        action: NEXT_BEST_ACTIONS.PROGRESS_NEXT_TOPIC,
        reason: "Question answered correctly with high verification confidence.",
        recommendation: "Ready to advance to the next learning outcome!",
        topic,
        learningOutcomeId,
      };
    }

    return {
      action: NEXT_BEST_ACTIONS.CONFIRMATION_PRACTICE,
      reason: "Answer verified with moderate confidence.",
      recommendation: "Complete one more practice question to lock in mastery.",
      topic,
      learningOutcomeId,
    };
  }

  // Fallback for UNVERIFIED / NOT_COMPARABLE
  return {
    action: NEXT_BEST_ACTIONS.CONFIRMATION_PRACTICE,
    reason: "No deterministic verifier could verify ground truth.",
    recommendation: "Continue practice or request tutor feedback.",
    topic,
    learningOutcomeId,
  };
}
