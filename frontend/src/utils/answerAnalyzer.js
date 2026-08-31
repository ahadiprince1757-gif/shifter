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

  // Scope recurrence to specific question, not just topic — prevents inflated counts
  const topicId = question.topicId || question.id || "general";
  const questionKey = question.q
    ? `${topicId}:q:${normalizeStr(question.q).slice(0, 40)}`
    : topicId;

  // ── DETECT: Is this a pure-number math question? ─────────────────────────────
  // When correct answer is a plain number and question has steps, bypass text analysis.
  const correctNum = parseFloat(String(correctAnswer).trim());
  const isPureNumberMath =
    !isNaN(correctNum) &&
    String(correctAnswer).trim().match(/^-?\d+(?:\.\d+)?$/) !== null;

  const isMathQuestion = Array.isArray(question.steps) && question.steps.length > 0;

  // ── ENGINE 3: MATH DIAGNOSER (always run for math questions) ─────────────────
  let mathDiag = null;
  if (isMathQuestion) {
    mathDiag = diagnoseMathEquivalence(question.steps, studentAnswer, userWork, correctAnswer);
  }

  // ── ENGINE 2: CONCEPT GRAPH (only run for non-number text answers) ────────────
  let graphEval = null;
  let misconception = null;

  if (!isPureNumberMath) {
    const studentTriples = extractSemanticTriples(studentAnswer);
    graphEval = evaluateConceptGraph(studentTriples, sToks, cToks);
    misconception = diagnoseMisconceptionPattern(studentAnswer, correctAnswer);
  }

  // ── ENGINE 4: STUDENT MEMORY & CONFIDENCE SCORE ─────────────────────────────
  const errorCategory = misconception
    ? misconception.type
    : mathDiag
    ? mathDiag.type
    : "CONCEPTUAL_GAP";

  const recurrence = recordErrorAndGetRecurrence(questionKey, errorCategory);

  const isMathValid = isMathQuestion
    ? mathDiag.isMathValidPath
    : graphEval
    ? graphEval.isEssentialSatisfied
    : false;

  const dimensions = computeDiagnosticConfidenceScore({
    graphEval: graphEval || { weightedScore: isPureNumberMath ? 20 : 50, isEssentialSatisfied: false, essentialMissing: [] },
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

  // ── BUILD DIAGNOSTIC SUMMARY ─────────────────────────────────────────────────
  let summary;
  if (isPureNumberMath && mathDiag) {
    // For pure-number math: give a precise arithmetic explanation
    const studentVal = extractFinalStudentNumber(studentAnswer, userWork);
    if (studentVal !== null) {
      if (mathDiag.type === "FINAL_CONCLUSION_ERROR") {
        summary = mathDiag.message;
      } else if (mathDiag.type === "STEP_EXECUTION_FAILURE") {
        summary = mathDiag.message;
      } else {
        summary = `Your answer was ${studentVal}, but the correct answer is ${correctNum}. Double-check your arithmetic and order of operations (BODMAS/PEMDAS).`;
      }
    } else {
      summary = mathDiag.message || `The correct answer is ${correctNum}. Review your calculation method below.`;
    }
  } else if (misconception) {
    summary = misconception.explanation;
  } else if (isMathQuestion && mathDiag) {
    summary = mathDiag.message;
  } else if (graphEval) {
    summary = graphEval.isEssentialSatisfied
      ? "Your answer covers the key idea — make sure your wording is precise."
      : `Your answer is missing the key concept: "${(graphEval.essentialMissing || []).join(", ")}".`;
  } else {
    summary = `The correct answer is ${correctAnswer}. Review the explanation below.`;
  }

  // ── BUILD SENTENCE FEEDBACK ITEMS ────────────────────────────────────────────
  const feedbackItems = buildSentenceFeedbackItems({
    graphEval,
    misconception,
    mathDiag,
    isPureNumberMath,
    studentAnswer,
    correctNum,
  });

  const displayStudentSaid = userWork
    ? `${userWork.trim()}`.split("\n").slice(-3).join(" → ")
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
    summary,
  };
}

/**
 * Helper: Extract student's final numerical answer from working or answer field.
 */
function extractFinalStudentNumber(studentAnswer, userWork) {
  const combined = [userWork, studentAnswer].filter(Boolean).join("\n");
  const lines = combined.split(/[\n;]/).map((l) => l.trim()).filter(Boolean);
  const lastLine = lines[lines.length - 1] || combined;

  const eqMatch = lastLine.match(/=\s*(-?\d+(?:\.\d+)?)/);
  if (eqMatch) return parseFloat(eqMatch[1]);

  const nums = lastLine.match(/-?\d+(?:\.\d+)?/g);
  if (nums && nums.length > 0) return parseFloat(nums[nums.length - 1]);

  return null;
}

/**
 * Builds clean, sentence-level feedback items for FeedbackDisplay UI
 */
function buildSentenceFeedbackItems({
  graphEval,
  misconception,
  mathDiag,
  isPureNumberMath,
  studentAnswer,
  correctNum,
}) {
  const items = [];

  // For pure-number math answers: only show arithmetic-specific items
  if (isPureNumberMath) {
    if (mathDiag && mathDiag.message && mathDiag.type !== "CALCULATION_ERROR") {
      items.push({
        type: mathDiag.isMathValidPath ? "step_partial" : "step_wrong",
        icon: mathDiag.isMathValidPath ? "⚠" : "✗",
        message: mathDiag.message,
      });
    }
    // Show the correct order of operations hint if it's an order-of-operations problem
    if (mathDiag && mathDiag.type === "CALCULATION_ERROR") {
      items.push({
        type: "step_wrong",
        icon: "✗",
        message: `You wrote ${studentAnswer?.trim() || "?"} — the correct answer is ${correctNum}. Check your order of operations.`,
      });
    }
    return items;
  }

  // Misconception Contrast item
  if (misconception) {
    items.push({
      type: "misconception_contrast",
      icon: "✗",
      message: misconception.explanation,
    });
  }

  // Essential concept met items
  if (graphEval && graphEval.essentialMet && graphEval.essentialMet.length > 0) {
    items.push({
      type: "segment_correct",
      icon: "✓",
      message: `You correctly identified: "${graphEval.essentialMet.join(", ")}".`
    });
  }

  // Essential missing items
  if (graphEval && graphEval.essentialMissing && graphEval.essentialMissing.length > 0) {
    items.push({
      type: "missing_concept",
      icon: "✗",
      message: `Missing key concept: "${graphEval.essentialMissing.join(", ")}" is required for a complete answer.`
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
  if (graphEval && graphEval.importantMissing && graphEval.importantMissing.length > 0) {
    items.push({
      type: "missing_qualifier",
      icon: "⚠",
      message: `Consider adding: "${graphEval.importantMissing.join(", ")}" to strengthen your answer.`
    });
  }

  return items;
}
