/**
 * ============================================================================
 * TIXAR CENTRALIZED CBC ASSESSMENT & EVIDENTIARY ORCHESTRATOR
 * ============================================================================
 *
 * Responsibilities:
 * 1. Orchestrates the end-to-end CBC learning flow:
 *    Curriculum → Learning Outcome → Truth Brain → Misconception Diagnosis →
 *    Student Memory → CBC Attempt Rubric → Outcome Mastery Vector → Tixar Readiness.
 * 2. Generates immutable, auditable CBC Evidence Records for every attempt.
 * 3. Separates single-attempt Performance from cumulative Outcome-Based Mastery.
 * 4. Determines verified readiness to advance.
 * ============================================================================
 */

import { verifyGeneratedAnswer } from "../utils/verificationOrchestrator.js";
import { CbcRubricEvaluator, CbcCompetencyAggregator, CBC_RUBRICS } from "../utils/cbcRubricEvaluator.js";

export { CBC_RUBRICS };
import {
  recordErrorAndGetRecurrence,
  computeUnderstandingEvidence,
  computeDiagnosticConfidence,
} from "../utils/studentMemoryModel.js";
import { recordLearningEvent, LEARNING_EVENTS } from "../utils/analytics.js";
import { calculateReadiness } from "./cbcCompetencyEngine.js";

/**
 * Standard Core Competencies in the Kenya Competency-Based Curriculum (CBC)
 */
export const CBC_CORE_COMPETENCIES = {
  CRITICAL_THINKING: "Critical Thinking and Problem Solving",
  CREATIVITY: "Creativity and Imagination",
  COMMUNICATION: "Communication and Collaboration",
  DIGITAL_LITERACY: "Digital Literacy",
  LEARNING_TO_LEARN: "Learning to Learn",
  SELF_EFFICACY: "Self-efficacy",
  CITIZENSHIP: "Citizenship",
};

/**
 * Cognitive Demand Levels in Bloom's / CBC Framework
 */
export const COGNITIVE_LEVELS = {
  REMEMBER: { level: 1, label: "Recall & Knowledge" },
  UNDERSTAND: { level: 1, label: "Comprehension & Explanation" },
  APPLICATION: { level: 2, label: "Procedural & Operational Practice" },
  ANALYSIS: { level: 3, label: "Analytical Reasoning & Breakdown" },
  EVALUATION: { level: 3, label: "Evaluation & Judgement" },
  CREATION: { level: 3, label: "Synthesis & Real-World Transfer" },
};

/**
 * Helper to generate deduplicated evidence IDs
 */
function generateId() {
  return `cbc_ev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Master CBC Attempt Evaluator and Evidence Orchestrator
 *
 * @param {Object} params
 * @param {Object|string} params.question - Question object or text string
 * @param {string} params.studentAnswer - Candidate student answer
 * @param {Object} [params.questionMetadata] - CBC Curriculum alignment metadata
 * @param {number} [params.hintsUsed=0] - Number of hints requested
 * @param {number} [params.attempts=1] - Attempt count on this question
 * @param {string} [params.reasoningQuality="unknown"] - Quality of student reasoning ("strong"|"moderate"|"weak")
 * @param {Array} [params.historicalOutcomeAttempts=[]] - History of attempts for this specific Learning Outcome
 * @returns {Promise<Object>} Comprehensive CBC Evidence & Readiness Assessment Result
 */
export async function evaluateCBCAttempt({
  question,
  studentAnswer,
  questionMetadata = {},
  hintsUsed = 0,
  attempts = 1,
  reasoningQuality = "unknown",
  historicalOutcomeAttempts = [],
}) {
  const questionText = typeof question === "string" ? question : question?.text || question?.q || question?.stem || "";
  const candidateAnswer = String(studentAnswer || "").trim();

  // Extract CBC Alignment Metadata
  const {
    studentId = null,
    grade = 7,
    learningArea = questionMetadata.subject || "Mathematics",
    subject = questionMetadata.subject || "math",
    strand = "General Strand",
    subStrand = "General Sub-Strand",
    learningOutcomeId = questionMetadata.learningOutcomeId || "LO_GENERAL",
    specificLearningOutcome = "Demonstrate core topic understanding.",
    competencies = [CBC_CORE_COMPETENCIES.CRITICAL_THINKING, CBC_CORE_COMPETENCIES.COMMUNICATION],
    cognitiveLevelNum = questionMetadata.cognitiveLevelNum || (questionMetadata.cognitiveLevel === "CREATION" || questionMetadata.cognitiveLevel === "TRANSFER" ? 3 : 2),
    evidenceType = "PROCEDURAL_REASONING",
    topic = questionMetadata.topic || strand,
    chapterId = questionMetadata.chapterId || null,
  } = questionMetadata;

  // 1. TRUTH BRAIN VERIFICATION
  const verification = verifyGeneratedAnswer(questionText, candidateAnswer, subject);
  const isCorrect = verification.answerStatus === "CORRECT";
  const isPartial = verification.answerStatus === "PARTIALLY_CORRECT";

  // 2. MISCONCEPTION DIAGNOSIS & RECURRENCE TRACKING
  let recurrence = null;
  let errorCategory = null;

  if (!isCorrect) {
    errorCategory =
      verification.extra?.factCheck?.misconceptions?.[0] ||
      verification.reason ||
      (isPartial ? "PARTIAL_UNDERSTANDING_SLIP" : "CONCEPTUAL_GAP");

    recurrence = recordErrorAndGetRecurrence(learningOutcomeId, errorCategory);
  }

  // 3. CBC ATTEMPT RUBRIC EVALUATION (Level 1: Attempt Performance)
  const rubricResult = CbcRubricEvaluator.evaluateAttempt({
    isCorrect,
    level: cognitiveLevelNum,
    diagnosis: { type: errorCategory || "NONE" },
    attempts,
    hintsUsed,
    reasoningQuality,
  });

  // 4. TWO-SCORE DIAGNOSTIC FRAMEWORK
  const understandingScore = computeUnderstandingEvidence({
    graphEval: null,
    misconception: recurrence?.level === "CROSS_TOPIC_RECURRENCE" ? { category: errorCategory } : null,
    isMathValid: verification.subject === "mathematics",
  });

  const diagnosticConfidence = computeDiagnosticConfidence({
    attempts,
    verifierConfidence: verification.confidence ?? 0.85,
    recurrenceLevel: recurrence?.level || "SINGLE_SLIP",
    graphEvidence: Boolean(verification.verifiedSteps?.length),
  });

  // 5. IMMUTABLE CBC EVIDENCE RECORD
  const evidenceRecord = {
    id: generateId(),
    studentId,
    timestamp: new Date().toISOString(),
    curriculum: {
      system: "CBC",
      country: "Kenya",
      level: grade >= 7 && grade <= 9 ? "Junior School" : grade >= 10 ? "Senior School" : "Primary School",
      grade,
    },
    learningArea,
    strand,
    subStrand,
    learningOutcomeId,
    specificLearningOutcome,
    competencies,
    cognitiveLevelNum,
    evidenceType,
    assessmentEvidence: {
      questionId: question?.id || null,
      questionText,
      studentAnswer: candidateAnswer,
      canonicalAnswer: verification.canonicalAnswer,
      isCorrect,
      isPartial,
      hintsUsed,
      attempts,
    },
    performanceLevel: rubricResult.competencyCode, // EE, ME, AE, BE
    performancePoints: rubricResult.competencyLevel, // 4, 3, 2, 1
    understandingScore,
    diagnosticConfidence,
    recurrenceLevel: recurrence?.level || "SINGLE_SLIP",
  };

  // 6. RECORD TELEMETRY EVENT TO STUDENT BRAIN
  recordLearningEvent({
    subjectId: subject,
    chapterId,
    topic,
    userId: studentId,

    strand,
    subStrand,
    learningOutcomeId,

    type: isCorrect
      ? LEARNING_EVENTS.QUESTION_CORRECT
      : isPartial
      ? LEARNING_EVENTS.QUESTION_ANSWERED
      : LEARNING_EVENTS.QUESTION_INCORRECT,

    correct: isCorrect,
    score: rubricResult.competencyLevel,

    questionId: question?.id || null,
    questionType: verification.answerType || null,

    attempts,
    hintsUsed,

    metadata: {
      evidenceId: evidenceRecord.id,
      verificationStatus: verification.verificationStatus,
      answerStatus: verification.answerStatus,
      competencyCode: rubricResult.competencyCode,
      feedback: rubricResult.feedback,
      nextStep: rubricResult.nextStep,
      diagnosticConfidence,
      understandingScore,
      recurrence,
    },
  });

  // 7. OUTCOME-BASED CUMULATIVE MASTERY VECTOR (Level 2: Cumulative Mastery)
  const allOutcomeAttempts = [...historicalOutcomeAttempts, evidenceRecord];
  const outcomeCumulativeCompetency = CbcCompetencyAggregator.calculateCompetency(allOutcomeAttempts);

  // 8. TIXAR READINESS DECISION
  const readiness = calculateReadiness({
    overallScore: outcomeCumulativeCompetency.weightedScore * 25, // Convert 1-4 scale to percentage
    masteryMap: {
      knowledgeGaps: recurrence?.level === "CROSS_TOPIC_RECURRENCE" ? [{ topic: strand, severity: "CRITICAL" }] : [],
      evidenceWarnings: diagnosticConfidence < 50 ? [{ topic: strand, message: "More evidence required." }] : [],
    },
  });

  return {
    evidenceRecord,
    verification,
    attemptPerformance: {
      code: rubricResult.competencyCode,
      level: rubricResult.competencyLevel,
      rubric: rubricResult.rubric,
      feedback: rubricResult.feedback,
      nextStep: rubricResult.nextStep,
    },
    cumulativeOutcomeMastery: outcomeCumulativeCompetency,
    diagnostic: {
      understandingScore,
      diagnosticConfidence,
      recurrence,
    },
    readiness,
  };
}

/**
 * Builds an Outcome-Based Mastery Map across CBC Learning Outcomes.
 *
 * @param {Array<Object>} evidenceRecords - List of CBC evidence record objects
 * @returns {Object} Map of outcomes with cumulative mastery, trends, and active misconceptions
 */
export function buildOutcomeMasteryMap(evidenceRecords = []) {
  if (!Array.isArray(evidenceRecords) || evidenceRecords.length === 0) {
    return { outcomes: {}, readyOutcomes: [], weakOutcomes: [] };
  }

  const grouped = {};

  for (const record of evidenceRecords) {
    const loId = record.learningOutcomeId || "LO_GENERAL";
    if (!grouped[loId]) {
      grouped[loId] = {
        learningOutcomeId: loId,
        specificLearningOutcome: record.specificLearningOutcome || "General Outcome",
        strand: record.strand || "General Strand",
        subStrand: record.subStrand || "General Sub-Strand",
        records: [],
      };
    }
    grouped[loId].records.push(record);
  }

  const outcomes = {};
  const readyOutcomes = [];
  const weakOutcomes = [];

  for (const [loId, data] of Object.entries(grouped)) {
    const cumulative = CbcCompetencyAggregator.calculateCompetency(data.records);
    const verifiedMastery = cumulative.weightedScore >= 3.0 && data.records.length >= 3;

    const outcomeStats = {
      learningOutcomeId: loId,
      strand: data.strand,
      subStrand: data.subStrand,
      specificLearningOutcome: data.specificLearningOutcome,
      attemptCount: data.records.length,
      performanceHistory: data.records.map((r) => r.performanceLevel),
      weightedMasteryScore: cumulative.weightedScore,
      competencyCode: cumulative.competencyCode,
      competencyLabel: cumulative.rubric.label,
      trend: cumulative.trend,
      verifiedMastery,
    };

    outcomes[loId] = outcomeStats;

    if (verifiedMastery) {
      readyOutcomes.push(outcomeStats);
    } else if (cumulative.weightedScore < 2.5) {
      weakOutcomes.push(outcomeStats);
    }
  }

  return {
    outcomes,
    readyOutcomes,
    weakOutcomes,
  };
}
