/**
 * ============================================================================
 * TIXAR LEARNING EVENT PROCESSOR — TRUTH & STUDENT BRAIN BRIDGE
 * ============================================================================
 *
 * Responsibilities:
 * 1. Process verified answers from the Truth Brain (Verification Orchestrator).
 * 2. Record rich telemetry events to the Student Brain via recordLearningEvent.
 * 3. Evaluate single-attempt evidence (Level 1) & aggregate cumulative CBC competency (Level 2).
 * 4. Determine the immediate NEXT BEST ACTION for adaptive student learning.
 * ============================================================================
 */

import { recordLearningEvent, LEARNING_EVENTS } from "./analytics.js";
import { CbcRubricEvaluator, CbcCompetencyAggregator, CBC_RUBRICS } from "./cbcRubricEvaluator.js";

export { CBC_RUBRICS };

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
 * @param {Object} [params.context] - Additional metadata (userId, subjectId, chapterId, topic, learningOutcomeId, proveItLevel, attemptsHistory, etc.)
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
    proveItLevel = 1,
    timeSpentSeconds = null,
    hintsUsed = 0,
    attempts = 1,
    diagnosis = {},
    reasoningQuality = "unknown",
    historicalAttempts = [],
  } = context;

  const verificationStatus = verificationResult?.verificationStatus || "UNVERIFIED";
  const answerStatus = verificationResult?.answerStatus || "NOT_COMPARABLE";
  const confidence = verificationResult?.confidence ?? 0;
  const canonicalAnswer = verificationResult?.canonicalAnswer || null;

  const isCorrect = answerStatus === "CORRECT";
  const isPartial = answerStatus === "PARTIALLY_CORRECT";

  // 1. LEVEL 1: ATTEMPT EVALUATION
  const attemptRubric = CbcRubricEvaluator.evaluateAttempt({
    isCorrect,
    level: proveItLevel,
    diagnosis,
    attempts,
    hintsUsed,
    reasoningQuality,
  });

  // Map event type
  const eventType = isCorrect
    ? LEARNING_EVENTS.QUESTION_CORRECT
    : answerStatus === "INCORRECT"
    ? LEARNING_EVENTS.QUESTION_INCORRECT
    : LEARNING_EVENTS.QUESTION_ANSWERED;

  // 2. RECORD TELEMETRY EVENT TO STUDENT BRAIN
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
    score: attemptRubric.competencyLevel,

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
      competencyCode: attemptRubric.competencyCode,
      feedback: attemptRubric.feedback,
      nextStep: attemptRubric.nextStep,
      explanation: verificationResult?.explanation || null,
      verifiedSteps: verificationResult?.verifiedSteps || [],
    },
  });

  // 3. LEVEL 2: CUMULATIVE COMPETENCY AGGREGATION
  const allAttempts = [...historicalAttempts, attemptRubric];
  const cumulativeCompetency = CbcCompetencyAggregator.calculateCompetency(allAttempts);

  // 4. COMPUTE NEXT BEST ACTION
  const nextBestAction = computeNextBestAction({
    answerStatus,
    verificationStatus,
    confidence,
    hintsUsed,
    attempts,
    topic,
    learningOutcomeId,
    attemptRubric,
  });

  return {
    verification: verificationResult,
    telemetryRecorded: true,
    performance: {
      correct: isCorrect,
      isPartial,
      score: attemptRubric.competencyLevel,
      answerStatus,
    },
    attemptRubric,
    cumulativeCompetency,
    nextBestAction,
    timestamp: new Date().toISOString(),
  };
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
  attemptRubric = null,
}) {
  const nextStep = attemptRubric?.nextStep;

  if (nextStep === "REVIEW_PREREQUISITE_SKILL" || nextStep === "TRACE_PREREQUISITE_DAG") {
    return {
      action: NEXT_BEST_ACTIONS.REVIEW_CONCEPT,
      reason: "Foundational conceptual gap identified.",
      recommendation: "Review the prerequisite concept before attempting further exercises.",
      topic,
      learningOutcomeId,
    };
  }

  if (answerStatus === "INCORRECT") {
    if (hintsUsed >= 2 || attempts > 2) {
      return {
        action: NEXT_BEST_ACTIONS.REVIEW_CONCEPT,
        reason: "Multiple incorrect attempts and high hint dependency detected.",
        recommendation: "Review the core concept explanation and worked steps before retrying.",
        topic,
        learningOutcomeId,
      };
    }

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
      reason: "Answer is partially correct; minor operational or translation slip.",
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

  return {
    action: NEXT_BEST_ACTIONS.CONFIRMATION_PRACTICE,
    reason: "No deterministic verifier could verify ground truth.",
    recommendation: "Continue practice or request tutor feedback.",
    topic,
    learningOutcomeId,
  };
}
