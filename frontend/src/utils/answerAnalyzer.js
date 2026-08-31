/**
 * Tixar Master Diagnostic Engine Architecture
 *
 * Orchestrates the 5 Diagnostic & Learning Policy Engines:
 *   1. Answer & Math AST Parser (answerParser.js)
 *   2. Concept Graph Mapper (conceptGraphMapper.js)
 *   3. Misconception & Multi-Path Diagnoser (misconceptionDiagnoser.js)
 *   4. Student Memory Model & Diagnostic Confidence (studentMemoryModel.js)
 *   5. Learning Policy Engine (learningPolicyEngine.js)
 */

import { extractSemanticTriples } from "./answerParser.js";
import { evaluateConceptGraph } from "./conceptGraphMapper.js";
import { diagnoseMisconceptionPattern, diagnoseMathEquivalence } from "./misconceptionDiagnoser.js";
import { recordErrorAndGetRecurrence, computeDiagnosticConfidenceScore } from "./studentMemoryModel.js";
import { determineNextAction } from "./learningPolicyEngine.js";

function normalizeStr(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s) {
  const STOP = new Set([
    "a","an","the","is","are","was","were","be","been","being","it","its",
    "to","of","in","on","at","by","for","with","about","as","into","that",
    "which","who","what","this","these","those","they","them","has","have",
    "had","do","does","did","will","would","could","should","may","might",
    "not","no","yes","also","very","just","more","can","used","using","use",
    "and","but","or","nor","so","yet","both","either","neither"
  ]);
  return normalizeStr(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w));
}

/**
 * Master Diagnostic Orchestrator function.
 * Evaluates student answer & working through the 5-engine pipeline.
 *
 * @param {string} studentAnswer - Final answer typed by student
 * @param {string} correctAnswer - Target reference answer
 * @param {Object} question - Question object (with steps, topicId, etc.)
 * @param {string} userWork - Intermediate math working steps typed by student
 * @returns {Object} Comprehensive Diagnostic State
 */
export function analyseStudentAnswer(studentAnswer, correctAnswer, question = {}, userWork = "") {
  const sNorm = normalizeStr(studentAnswer);
  const cNorm = normalizeStr(correctAnswer);
  const sToks = tokenize(sNorm);
  const cToks = tokenize(cNorm);

  const topicId = question.topicId || question.id || "general_math";

  // ── ENGINE 1: PARSE INPUT (Triples & Math AST) ──────────────────────────────
  const studentTriples = extractSemanticTriples(studentAnswer);

  // ── ENGINE 2: CONCEPT GRAPH MAPPER ──────────────────────────────────────────
  const graphEval = evaluateConceptGraph(studentTriples, sToks, cToks);

  // ── ENGINE 3: ERROR & MISCONCEPTION DIAGNOSER ───────────────────────────────
  const misconception = diagnoseMisconceptionPattern(studentAnswer, correctAnswer);

  let mathDiag = null;
  const isMathQuestion = Array.isArray(question.steps) && question.steps.length > 0;

  if (isMathQuestion) {
    mathDiag = diagnoseMathEquivalence(question.steps, studentAnswer, userWork, correctAnswer);
  }

  // ── ENGINE 4: STUDENT MEMORY & CONFIDENCE SCORE ─────────────────────────────
  const errorCategory = misconception ? misconception.type : (mathDiag ? mathDiag.type : "CONCEPTUAL_GAP");
  const recurrence = recordErrorAndGetRecurrence(topicId, errorCategory);

  const isMathValid = isMathQuestion ? mathDiag.isMathValidPath : graphEval.isEssentialSatisfied;

  const dimensions = computeDiagnosticConfidenceScore({
    graphEval,
    misconception,
    isMathValid,
  });

  // ── ENGINE 5: LEARNING POLICY ENGINE (Next Action Router) ────────────────────
  const partialDiagResult = {
    misconception,
    recurrence,
    dimensions,
    isMathValid,
    graphEval,
    mathDiag,
  };

  const nextAction = determineNextAction(partialDiagResult, question);

  // Build Sentence-Level Feedback Items for UI
  const feedbackItems = buildSentenceFeedbackItems({
    graphEval,
    misconception,
    mathDiag,
  });

  const displayStudentSaid = userWork
    ? `Working: "${userWork}" | Answer: "${studentAnswer}"`
    : studentAnswer.trim();

  return {
    type: isMathQuestion ? "step_analysis" : "concept_analysis",
    studentSaid: displayStudentSaid,
    correctAnswer,
    feedback: feedbackItems,
    misconception,
    recurrence,
    dimensions,
    isMathValid,
    nextAction,
    overallRatio: dimensions.diagnosticConfidence,
    summary: misconception
      ? misconception.explanation
      : (isMathQuestion
          ? mathDiag.message
          : (graphEval.isEssentialSatisfied
              ? "Essential concepts present, but key terminology requires precision."
              : `Essential Concept Missing: Need to include "${graphEval.essentialMissing.join(", ")}".`)),
  };
}

/**
 * Builds clean, sentence-level feedback items for FeedbackDisplay UI
 */
function buildSentenceFeedbackItems({
  graphEval,
  misconception,
  mathDiag,
}) {
  const items = [];

  // Misconception Contrast item
  if (misconception) {
    items.push({
      type: "misconception_contrast",
      icon: "✗",
      message: misconception.explanation,
    });
  }

  // Essential concept met items
  if (graphEval && graphEval.essentialMet.length > 0) {
    items.push({
      type: "segment_correct",
      icon: "✓",
      message: `You correctly identified the essential concept: "${graphEval.essentialMet.join(", ")}".`
    });
  }

  // Essential missing items
  if (graphEval && graphEval.essentialMissing.length > 0) {
    items.push({
      type: "missing_concept",
      icon: "✗",
      message: `Essential Concept Missing: Your answer lacks "${graphEval.essentialMissing.join(", ")}" — which is required for an accurate definition.`
    });
  }

  // Math step failure item
  if (mathDiag && mathDiag.message) {
    items.push({
      type: mathDiag.isMathValidPath ? "step_partial" : "step_wrong",
      icon: mathDiag.isMathValidPath ? "⚠" : "✗",
      message: mathDiag.message,
    });
  }

  // General missing important items
  if (graphEval && graphEval.importantMissing.length > 0) {
    items.push({
      type: "missing_qualifier",
      icon: "⚠",
      message: `Important Qualifier Missing: Consider adding "${graphEval.importantMissing.join(", ")}" to complete your response.`
    });
  }

  return items;
}
