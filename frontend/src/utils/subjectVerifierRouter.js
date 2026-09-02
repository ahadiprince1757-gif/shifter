/**
 * Tixar Master Multi-Subject Verifier Router
 *
 * Universal verification pipeline across:
 * 1. Mathematics
 * 2. Physics & Chemistry
 * 3. Biology & Life Science
 * 4. Language Arts & Grammar
 *
 * Responsibilities:
 * - Delegates to the Truth Brain (Verification Orchestrator).
 * - Preserves backwards compatibility for database question verification.
 * - Establishes canonical truth and distinguishes verification status from answer correctness.
 */

import { verifyGeneratedAnswer } from "./verificationOrchestrator.js";

/**
 * Safely convert an answer into a string.
 */
function normalizeAnswer(answer) {
  if (Array.isArray(answer)) {
    return answer
      .map((item) => String(item ?? "").trim())
      .filter(Boolean)
      .join(" • ");
  }

  return String(answer ?? "").trim();
}

/**
 * Universal Subject Self-Verification Entry Point.
 *
 * @param {string} questionText
 * @param {string|Array} storedAns
 * @param {Object} questionObj
 * @returns {Object} Comprehensive verification result
 */
export function verifyQuestionAcrossSubjects(
  questionText,
  storedAns,
  questionObj = {}
) {
  const text = String(questionText ?? "").trim();
  const rawAnsStr = normalizeAnswer(storedAns);

  const originalSteps =
    Array.isArray(questionObj?.steps) && questionObj.steps.length > 0
      ? questionObj.steps
      : null;

  if (!text && !rawAnsStr) {
    return {
      verificationStatus: "UNVERIFIED",
      answerStatus: "NOT_COMPARABLE",
      canonicalAnswer: rawAnsStr,
      verifiedAnswer: rawAnsStr,
      verifiedSteps: originalSteps,
      shouldOverride: false,
      wasOverridden: false,
      subject: "general",
      explanation: null,
      confidence: 0,
    };
  }

  // Execute Truth Brain verification pipeline
  const result = verifyGeneratedAnswer(text, rawAnsStr);

  return {
    ...result,
    canonicalAnswer: result.canonicalAnswer || rawAnsStr,
    verifiedAnswer: result.shouldOverride ? result.canonicalAnswer : (result.canonicalAnswer || rawAnsStr),
    verifiedSteps: result.verifiedSteps?.length ? result.verifiedSteps : originalSteps,
    wasOverridden: result.shouldOverride,
  };
}
