/**
 * Tixar Master Multi-Subject Verifier Router
 *
 * Universal Verification Pipeline across all Subjects:
 *  1. Mathematics (mathVerifier.js)
 *  2. Physics & Chemistry (scienceVerifier.js)
 *  3. Biology & Life Science (biologyVerifier.js)
 *  4. Language Arts & Grammar (languageVerifier.js)
 *
 * Catches database content corruption, verifies calculations & scientific laws,
 * and dynamically generates step-by-step solution steps for students!
 */

import { verifyMathAnswer } from "./mathVerifier.js";
import { verifyScienceQuestion } from "./verifiers/scienceVerifier.js";
import { verifyBiologyQuestion } from "./verifiers/biologyVerifier.js";
import { verifyLanguageQuestion } from "./verifiers/languageVerifier.js";

/**
 * Universal Subject Self-Verification Entry Point.
 *
 * @param {string} questionText - Raw question prompt
 * @param {string|Array} storedAns - Stored database answer key
 * @param {Object} questionObj - Full question object
 * @returns {Object} Comprehensive Subject Verification Result
 */
export function verifyQuestionAcrossSubjects(questionText, storedAns, questionObj = {}) {
  const text = String(questionText || "").trim();
  const rawAnsStr = Array.isArray(storedAns) ? storedAns.join(" • ") : String(storedAns || "");

  // 1. Check Mathematics Engine (Geometry, Kinematics, Algebra, Arithmetic)
  const isNumericMath =
    !Array.isArray(storedAns) &&
    !isNaN(parseFloat(rawAnsStr)) &&
    rawAnsStr.match(/^-?\d+(?:\.\d+)?(\s*(square|cubic|sq|cu)?\s*(units?|cm|m|km|mm|ft|in)?)?$/i);

  if (isNumericMath || /\b(area|perimeter|volume|solve|calculate|speed|distance|percentage|%)\b/i.test(text)) {
    const mathResult = verifyMathAnswer(text, rawAnsStr);
    if (mathResult && (mathResult.wasOverridden || mathResult.verifiedSteps)) {
      return {
        verifiedAnswer: mathResult.verifiedAnswer,
        verifiedSteps: mathResult.verifiedSteps,
        wasOverridden: mathResult.wasOverridden,
        subject: "math",
        explanation: mathResult.explanation,
      };
    }
  }

  // 2. Check Science Engine (Physics & Chemistry: Force, Ohm's Law, Density, pH)
  const scienceResult = verifyScienceQuestion(text, rawAnsStr);
  if (scienceResult) {
    return {
      verifiedAnswer: scienceResult.wasOverridden ? scienceResult.verifiedAnswer : rawAnsStr,
      verifiedSteps: scienceResult.verifiedSteps,
      wasOverridden: scienceResult.wasOverridden,
      subject: "science",
      explanation: scienceResult.explanation,
    };
  }

  // 3. Check Biology Engine (Cell division, Photosynthesis, Organelles, Blood vessels)
  const biologyResult = verifyBiologyQuestion(text, rawAnsStr);
  if (biologyResult) {
    return {
      verifiedAnswer: rawAnsStr,
      verifiedSteps: biologyResult.verifiedSteps,
      wasOverridden: false,
      subject: "biology",
      explanation: biologyResult.explanation,
    };
  }

  // 4. Check Language Arts & Grammar Engine (Figures of Speech, Voice, Parts of Speech)
  const languageResult = verifyLanguageQuestion(text, rawAnsStr);
  if (languageResult) {
    return {
      verifiedAnswer: rawAnsStr,
      verifiedSteps: languageResult.verifiedSteps,
      wasOverridden: false,
      subject: "language",
      explanation: languageResult.explanation,
    };
  }

  // Default: Return original stored answer unchanged
  return {
    verifiedAnswer: rawAnsStr,
    verifiedSteps: Array.isArray(questionObj.steps) && questionObj.steps.length > 0 ? questionObj.steps : null,
    wasOverridden: false,
    subject: "general",
    explanation: null,
  };
}
