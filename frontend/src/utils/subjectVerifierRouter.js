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
 * - Detect the most appropriate verification engine.
 * - Verify stored answers against the question.
 * - Preserve valid database answers.
 * - Override corrupted answers only when a verifier provides
 *   sufficiently strong evidence.
 * - Return verified answers, steps, and explanations.
 */

import { verifyMathAnswer } from "./mathVerifier.js";
import { verifyScienceQuestion } from "./verifiers/scienceVerifier.js";
import { verifyBiologyQuestion, verifyBiologyAnswer } from "./verifiers/biologyVerifier.js";
import { verifyLanguageQuestion } from "./verifiers/languageVerifier.js";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

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
 * Determine whether an answer looks numeric.
 *
 * Supports:
 * 5
 * -5
 * 5.5
 * 5 cm
 * 25 cm²
 * 10 m
 */
function isNumericAnswer(answer) {
  const value = String(answer ?? "").trim();

  if (!value) return false;

  return /^-?\d+(?:\.\d+)?(?:\s*(?:square|cubic|sq|cu)?\s*(?:units?|cm|m|km|mm|ft|in|kg|g|s|seconds?|min|minutes?|%)?)?$/i.test(
    value
  );
}

/**
 * Determine whether a question is probably mathematical.
 */
function isMathQuestion(text) {
  return /\b(area|perimeter|volume|solve|calculate|simplify|factor|expand|equation|expression|quadratic|polynomial|algebra|percentage|fraction|ratio|proportion|average|mean|speed|distance|time|velocity|acceleration|circumference|radius|diameter|gradient|slope)\b/i.test(text);
}

/**
 * Validate a verifier result before using it.
 */
function isValidVerificationResult(result) {
  return Boolean(
    result &&
      typeof result === "object" &&
      (
        result.wasOverridden === true ||
        result.verifiedAnswer !== undefined ||
        result.verifiedSteps !== undefined
      )
  );
}

/**
 * Safely obtain verification steps.
 */
function getVerifiedSteps(result, fallback = null) {
  if (Array.isArray(result?.verifiedSteps)) {
    return result.verifiedSteps;
  }

  if (Array.isArray(fallback) && fallback.length > 0) {
    return fallback;
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Main Router                                                                */
/* -------------------------------------------------------------------------- */

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

  /*
   * Empty question / answer.
   *
   * Do not attempt aggressive verification when there is not
   * enough information.
   */
  if (!text && !rawAnsStr) {
    return {
      verifiedAnswer: rawAnsStr,
      verifiedSteps: originalSteps,
      wasOverridden: false,
      subject: "general",
      explanation: null,
      confidence: 0,
    };
  }

  /* ---------------------------------------------------------------------- */
  /* 1. MATHEMATICS                                                         */
  /* ---------------------------------------------------------------------- */

  const shouldCheckMath =
    isNumericAnswer(rawAnsStr) ||
    isMathQuestion(text);

  if (shouldCheckMath) {
    try {
      const mathResult = verifyMathAnswer(text, rawAnsStr);

      if (isValidVerificationResult(mathResult)) {
        const verifiedAnswer =
          mathResult.verifiedAnswer !== undefined &&
          mathResult.verifiedAnswer !== null
            ? String(mathResult.verifiedAnswer).trim()
            : rawAnsStr;

        return {
          verifiedAnswer,
          verifiedSteps: getVerifiedSteps(
            mathResult,
            originalSteps
          ),
          wasOverridden: Boolean(mathResult.wasOverridden),
          subject: "math",
          explanation: mathResult.explanation || null,
          confidence:
            typeof mathResult.confidence === "number"
              ? mathResult.confidence
              : null,
        };
      }
    } catch (error) {
      console.error(
        "[SubjectVerifierRouter] Mathematics verifier failed:",
        error
      );
    }
  }

  /* ---------------------------------------------------------------------- */
  /* 2. PHYSICS / CHEMISTRY                                                 */
  /* ---------------------------------------------------------------------- */

  try {
    const scienceResult = verifyScienceQuestion(text, rawAnsStr);

    if (isValidVerificationResult(scienceResult)) {
      const verifiedAnswer =
        scienceResult.wasOverridden &&
        scienceResult.verifiedAnswer !== undefined
          ? String(scienceResult.verifiedAnswer).trim()
          : rawAnsStr;

      return {
        verifiedAnswer,
        verifiedSteps: getVerifiedSteps(
          scienceResult,
          originalSteps
        ),
        wasOverridden: Boolean(scienceResult.wasOverridden),
        subject: "science",
        explanation: scienceResult.explanation || null,
        confidence:
          typeof scienceResult.confidence === "number"
            ? scienceResult.confidence
            : null,
      };
    }
  } catch (error) {
    console.error(
      "[SubjectVerifierRouter] Science verifier failed:",
      error
    );
  }

  /* ---------------------------------------------------------------------- */
  /* 3. BIOLOGY                                                             */
  /* ---------------------------------------------------------------------- */

  try {
    const biologyResult = verifyBiologyQuestion(text);

    if (isValidVerificationResult(biologyResult)) {
      const verifiedAnswer =
        biologyResult.wasOverridden &&
        biologyResult.verifiedAnswer !== undefined
          ? String(biologyResult.verifiedAnswer).trim()
          : rawAnsStr;

      // Run answer fact-matching when a student answer exists
      const answerVerification = rawAnsStr
        ? verifyBiologyAnswer({ question: text, studentAnswer: rawAnsStr })
        : null;

      return {
        verifiedAnswer,
        verifiedSteps: getVerifiedSteps(biologyResult, originalSteps),
        wasOverridden: Boolean(biologyResult.wasOverridden),
        subject: "biology",
        explanation: biologyResult.explanation || null,
        confidence:
          typeof biologyResult.confidence === "number"
            ? biologyResult.confidence
            : null,
        // Structured fact-match result for CBC/readiness engine
        answerVerification: answerVerification || null,
        facts: biologyResult.facts || null,
      };
    }
  } catch (error) {
    console.error(
      "[SubjectVerifierRouter] Biology verifier failed:",
      error
    );
  }

  /* ---------------------------------------------------------------------- */
  /* 4. LANGUAGE / GRAMMAR                                                  */
  /* ---------------------------------------------------------------------- */

  try {
    const languageResult = verifyLanguageQuestion(
      text,
      rawAnsStr
    );

    if (isValidVerificationResult(languageResult)) {
      const verifiedAnswer =
        languageResult.wasOverridden &&
        languageResult.verifiedAnswer !== undefined
          ? String(languageResult.verifiedAnswer).trim()
          : rawAnsStr;

      return {
        verifiedAnswer,
        verifiedSteps: getVerifiedSteps(
          languageResult,
          originalSteps
        ),
        wasOverridden: Boolean(languageResult.wasOverridden),
        subject: "language",
        explanation: languageResult.explanation || null,
        confidence:
          typeof languageResult.confidence === "number"
            ? languageResult.confidence
            : null,
      };
    }
  } catch (error) {
    console.error(
      "[SubjectVerifierRouter] Language verifier failed:",
      error
    );
  }

  /* ---------------------------------------------------------------------- */
  /* 5. FALLBACK                                                            */
  /* ---------------------------------------------------------------------- */

  /*
   * If none of the specialized engines can confidently verify
   * the question, preserve the original database answer.
   *
   * IMPORTANT:
   * The router should NEVER invent an answer merely because
   * a verifier failed.
   */
  return {
    verifiedAnswer: rawAnsStr,
    verifiedSteps: originalSteps,
    wasOverridden: false,
    subject: "general",
    explanation: null,
    confidence: null,
  };
}
