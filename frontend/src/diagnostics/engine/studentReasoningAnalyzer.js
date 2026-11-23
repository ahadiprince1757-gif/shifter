/**
 * TIXAR EVIDENCE-FIRST STUDENT REASONING ANALYZER
 *
 * Epistemic Invariants:
 * 1. Do not ask "Was the answer wrong?" Ask: "What did the student actually say?"
 * 2. What does that statement imply?
 * 3. Where does that reasoning conflict with the required concept?
 * 4. What exact concept needs repairing?
 * 5. Do NOT diagnose from final answer alone:
 *    - An isolated/bare number without working returns INCONCLUSIVE (never invents a misconception).
 *    - Gibberish returns INCONCLUSIVE (never pretends it found a math misconception).
 *    - A correct answer with a flawed reason (e.g. "4 because fractions are natural numbers") DIAGNOSES the flaw.
 *    - A correct answer with genuine reasoning is VERIFIED without "why this is wrong".
 */

import {
  DIAGNOSTIC_STATUS,
  CORRECTNESS_STATUS,
  DIAGNOSIS_TYPE,
  createStructuredDiagnosis,
} from "./diagnosticContract.js";
import { isKeyboardMash } from "./inputClassifier.js";

/**
 * Normalizes text for linguistic pattern matching.
 */
function normalize(str) {
  return String(str || "").trim().toLowerCase();
}

/**
 * Checks whether an input contains zero recognizable lexical tokens or is keyboard mash.
 */
export function isUninterpretableInput(text) {
  if (!text || typeof text !== "string") return true;
  const trimmed = text.trim();
  if (trimmed.length === 0) return true;

  if (isKeyboardMash(trimmed)) return true;

  // Pattern matching consonant clusters or random letter repetitions without common words
  const lower = trimmed.toLowerCase();
  if (/^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(lower)) return true;
  if (/^[a-z]{6,}$/i.test(lower)) {
    const vowelCount = (lower.match(/[aeiou]/g) || []).length;
    if (vowelCount === 0) return true;
  }

  return false;
}

/**
 * Analyzes student response for number-system classification problems.
 * E.g.: "Is 0 a natural number, whole number, or integer?"
 *       "Which of -3, 0, 4, 1/2 is a natural number?"
 */
export function analyzeNumberClassificationResponse({
  studentAnswer = "",
  userWork = "",
  questionText = "",
  expectedAnswer = "",
  authoredSteps = [],
  isAnswerCorrect = false,
}) {
  const answer = studentAnswer.trim();
  const work = userWork.trim();
  const combined = `${answer} ${work}`.trim();
  const combinedLower = combined.toLowerCase();
  const qLower = questionText.toLowerCase();

  // Blank submission — let the blank handler in teacherDiagnoser.js manage this
  // so the returned errorType is "blank_submission", not "insufficient_reasoning_evidence"
  if (!answer && !work) {
    return null;
  }

  const isClassifyingZero =
    qLower.includes(" 0 ") ||
    qLower.includes("zero") ||
    qLower.includes("is 0");

  const asksAboutNatural = qLower.includes("natural");
  const asksAboutWhole = qLower.includes("whole");
  const asksAboutInteger = qLower.includes("integer");

  // ── 1. GIBBERISH / UNINTERPRETABLE INPUT ──
  if (isUninterpretableInput(answer) && !work) {
    return createStructuredDiagnosis({
      status: DIAGNOSTIC_STATUS.INCONCLUSIVE,
      correctness: CORRECTNESS_STATUS.INCORRECT,
      studentAnswer: answer,
      userWork: work,
      evidence: [],
      diagnosis: {
        type: DIAGNOSIS_TYPE.UNCLASSIFIED,
        brokenAt: "insufficient_evidence",
        explanation:
          "Your response doesn't contain enough mathematical reasoning for me to determine where your thinking broke.",
      },
      breakPoint: {
        concept: "unclassified_input",
        errorType: "insufficient_reasoning_evidence",
        explanation:
          "Your response doesn't contain enough mathematical reasoning for me to determine where your thinking broke.",
      },
      repair: {
        concept: "showing_working",
        explanation:
          "Try showing the step you used to decide which number system each value belongs to.",
        steps: [
          "State the property or rule you used.",
          "Identify the starting point of the number system.",
        ],
      },
      verification: {
        question: isClassifyingZero
          ? "What property of 0 did you use to classify it?"
          : "What property of natural numbers did you use to classify your choice?",
        expectedConcept: isClassifyingZero ? "whole numbers include 0" : "positive counting numbers",
        type: "same_skill",
      },
      whatYouDid: `You entered "${answer}".`,
      whyThisIsWrong: [
        "Your response doesn't contain enough mathematical reasoning for me to determine where your thinking broke.",
        "Try showing the step you used to reach your answer.",
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [`The expected classification is ${expectedAnswer}.`],
      remember: "Take your time to write out your reasoning or select from the available options.",
      confidence: "low",
    });
  }

  // ── 2. CLASSIFYING 0: STUDENT CLASSIFIES 0 AS A NATURAL NUMBER ──
  // E.g. "It's a natural number", "natural", "0 is a natural number", "a natural number"
  const claimsNaturalNumber =
    /\b(?:it(?:'s|\s+is)\s+)?(?:a\s+)?natural(?:\s+number)?\b/i.test(combinedLower) &&
    !/\b(?:not|isn't|is\s+not)\s+(?:a\s+)?natural\b/i.test(combinedLower);

  if (isClassifyingZero && claimsNaturalNumber) {
    const evidence = [
      {
        text: answer || "It's a natural number.",
        meaning: "Student classified 0 as a natural number.",
      },
    ];

    if (/because\s+it\s+is\s+a\s+whole\s+number/i.test(combinedLower)) {
      evidence.push({
        text: "because it is a whole number",
        meaning: "Student treats whole-number membership as sufficient for natural-number membership.",
      });
    }

    return createStructuredDiagnosis({
      status: DIAGNOSTIC_STATUS.DIAGNOSED,
      correctness: CORRECTNESS_STATUS.INCORRECT,
      studentAnswer: answer,
      userWork: work,
      evidence,
      diagnosis: {
        type: DIAGNOSIS_TYPE.CLASSIFICATION,
        brokenAt: "natural-number definition",
        explanation:
          "You classified 0 as a natural number. The important distinction is how each number system defines its starting point. In this classification, natural numbers begin at 1, while whole numbers include 0. So your reasoning breaks at the point where you treated 0 as belonging to the natural numbers.",
      },
      breakPoint: {
        concept: "natural numbers",
        errorType: "classification",
        explanation: "Student treated 0 as a natural number.",
      },
      repair: {
        concept: "number-system membership",
        explanation:
          "In this classification, number systems are defined by their starting points:",
        steps: [
          "Natural numbers → 1, 2, 3, 4, ...",
          "Whole numbers → 0, 1, 2, 3, ...",
          "Integers → ..., −2, −1, 0, 1, 2, ...",
          "Therefore, 0 is a whole number and an integer, but not a natural number in this classification.",
        ],
      },
      verification: {
        question:
          "If 0 is a whole number and an integer, what makes it different from a natural number?",
        expectedConcept: "whole numbers include 0 whereas natural numbers start at 1",
        options: [
          "Whole numbers include 0, but natural numbers begin at 1",
          "Natural numbers include negative numbers",
          "Whole numbers cannot be positive",
          "There is no difference between them",
        ],
        correctAnswer: "Whole numbers include 0, but natural numbers begin at 1",
        type: "same_skill",
      },
      whatYouDid: `You classified 0 as a natural number.`,
      whyThisIsWrong: [
        "In this classification, natural numbers begin at 1 (1, 2, 3, ...).",
        "Whole numbers include 0 (0, 1, 2, 3, ...), and integers include 0 (..., -1, 0, 1, ...).",
        "So 0 is a whole number and an integer, but not a natural number.",
      ],
      theRightWay: [
        "Natural numbers: {1, 2, 3, 4, ...}",
        "Whole numbers: {0, 1, 2, 3, ...}",
        "Integers: {..., -2, -1, 0, 1, 2, ...}",
        "0 belongs to whole numbers and integers, not natural numbers.",
      ],
      remember:
        "Natural numbers start at 1. Whole numbers include 0. Integers include positive, negative, and 0.",
      confidence: "high",
    });
  }

  // ── 3. FULLY REASONED CORRECT CLASSIFICATION ──
  // E.g. "0 is a whole number and an integer because both include 0, but it isn't a natural number because natural numbers start at 1."
  const mentionsNaturalStartsOne =
    /(?:natural(?:s)?\s+(?:numbers\s+)?(?:start|begin)\s+at\s+1|not\s+a\s+natural|isn't\s+a\s+natural)/i.test(combinedLower);
  const mentionsWholeIncludesZero =
    /(?:whole(?:\s+numbers)?\s+include\s+0|0\s+is\s+a\s+whole)/i.test(combinedLower);
  const mentionsIntegerIncludesZero =
    /(?:integer(?:s)?\s+include\s+0|0\s+is\s+an?\s+integer|both\s+include\s+0)/i.test(combinedLower);

  if (isClassifyingZero && mentionsNaturalStartsOne && (mentionsWholeIncludesZero || mentionsIntegerIncludesZero)) {
    const evidence = [
      {
        text: "Natural numbers start at 1",
        meaning: "Student correctly identifies natural numbers start at 1.",
      },
      {
        text: "Whole numbers include 0",
        meaning: "Student correctly identifies whole numbers include 0.",
      },
      {
        text: "Integers also include 0",
        meaning: "Student correctly identifies integers include 0.",
      },
    ];

    return createStructuredDiagnosis({
      status: DIAGNOSTIC_STATUS.CORRECT,
      correctness: CORRECTNESS_STATUS.CORRECT,
      studentAnswer: answer,
      userWork: work,
      evidence,
      diagnosis: null,
      breakPoint: null,
      repair: null,
      verification: {
        question: "Which number system contains 0 but does not contain negative numbers?",
        expectedConcept: "whole numbers",
        options: ["Natural numbers", "Whole numbers", "Integers", "Rational numbers only"],
        correctAnswer: "Whole numbers",
        type: "same_skill",
      },
      whatYouDid:
        "You correctly separated the three number systems: Natural numbers start at 1, whole numbers include 0, and integers include 0.",
      whyThisIsWrong: [],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : ["0 is a whole number and an integer."],
      remember:
        "Your reasoning matches the classification used in this question.",
      confidence: "high",
    });
  }

  // ── 4. CORRECT FINAL ANSWER BUT WITH A HIDDEN MISCONCEPTION ──
  // E.g. Question: "Which of -3, 0, 4, 1/2 is a natural number?"
  // Student: "4 because 4/1 is a fraction and fractions are natural numbers"
  if (
    /\b4\b/.test(combinedLower) &&
    /\bfractions?\s+(?:are|belong\s+to)\s+natural\b/i.test(combinedLower)
  ) {
    return createStructuredDiagnosis({
      status: DIAGNOSTIC_STATUS.DIAGNOSED,
      correctness: CORRECTNESS_STATUS.PARTIAL,
      studentAnswer: answer,
      userWork: work,
      evidence: [
        {
          text: "fractions are natural numbers",
          meaning: "Student incorrectly believes fractions are natural numbers.",
        },
      ],
      diagnosis: {
        type: DIAGNOSIS_TYPE.CLASSIFICATION,
        brokenAt: "fraction vs natural number distinction",
        explanation:
          "You selected 4, but your reasoning stated that 'fractions are natural numbers'. Natural numbers are whole counting numbers {1, 2, 3, ...}, not fractional parts.",
      },
      breakPoint: {
        concept: "natural numbers",
        errorType: "fraction_misconception",
        explanation: "Student stated fractions are natural numbers.",
      },
      repair: {
        concept: "rational vs natural distinction",
        explanation:
          "Fractions belong to the rational numbers (ℚ), whereas natural numbers (ℕ) are discrete positive counting numbers:",
        steps: [
          "Natural numbers: {1, 2, 3, 4, ...}",
          "Rational numbers: Any fraction a/b where b ≠ 0 (e.g. 1/2, 4/1).",
        ],
      },
      verification: {
        question: "Which set does 3/4 belong to?",
        expectedConcept: "rational numbers",
        options: ["Natural numbers", "Whole numbers", "Integers", "Rational numbers"],
        correctAnswer: "Rational numbers",
        type: "same_skill",
      },
      whatYouDid: `You selected 4, but justified it by claiming fractions are natural numbers.`,
      whyThisIsWrong: [
        "Fractions are rational numbers, not natural numbers.",
        "4 is natural because it is a positive whole counting number, not because it can be written as a fraction.",
      ],
      theRightWay: ["Natural numbers are {1, 2, 3, 4, ...}."],
      remember: "Fractions belong to rational numbers, not natural numbers.",
      confidence: "high",
    });
  }

  // ── 5. CORRECT FINAL ANSWER WITH VALID REASONING ──
  // E.g. "4 because natural numbers are positive whole numbers"
  if (
    /\b4\b/.test(combinedLower) &&
    /(?:positive\s+whole|counting\s+number)/i.test(combinedLower)
  ) {
    return createStructuredDiagnosis({
      status: DIAGNOSTIC_STATUS.CORRECT,
      correctness: CORRECTNESS_STATUS.CORRECT,
      studentAnswer: answer,
      userWork: work,
      evidence: [
        {
          text: "natural numbers are positive whole numbers",
          meaning: "Student understands natural numbers are positive integers.",
        },
      ],
      diagnosis: null,
      breakPoint: null,
      repair: null,
      verification: {
        question: "Is 12 a natural number?",
        expectedConcept: "positive counting number",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        type: "same_skill",
      },
      whatYouDid: "You correctly selected 4 and identified that natural numbers are positive whole numbers.",
      whyThisIsWrong: [],
      theRightWay: ["4 is a positive integer, so it is a natural number."],
      remember: "Natural numbers are {1, 2, 3, 4, ...}.",
      confidence: "high",
    });
  }

  return null;
}
