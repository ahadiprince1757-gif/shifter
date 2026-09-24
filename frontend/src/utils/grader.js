
/**
 * ============================================================================
 * TIXAR GRADER
 * ============================================================================
 *
 * Production-oriented answer evaluator.
 *
 * Core principle:
 *
 *   ANSWER CORRECTNESS
 *          !=
 *   REASONING QUALITY
 *          !=
 *   UNDERSTANDING
 *          !=
 *   MISCONCEPTION DIAGNOSIS
 *
 * The grader therefore produces EVIDENCE first.
 *
 * Pipeline:
 *
 *   QUESTION
 *      ↓
 *   VERIFY QUESTION
 *      ↓
 *   NORMALIZE ANSWER
 *      ↓
 *   CLASSIFY ANSWER
 *      ↓
 *   EQUIVALENCE CHECK
 *      ↓
 *   REASONING EVIDENCE
 *      ↓
 *   DIAGNOSTIC ANALYSIS
 *      ↓
 *   STRUCTURED RESULT
 *
 * IMPORTANT:
 *
 * This file deliberately avoids pretending that lexical similarity
 * is equivalent to understanding.
 *
 * It supports:
 *
 * - exact textual answers
 * - numeric answers
 * - fractions
 * - percentages
 * - simple equations
 * - algebraic expressions
 * - units
 * - alternative accepted answers
 * - multi-part answers
 * - partial answers
 * - blank answers
 * - ambiguous/ungradable answers
 * - conservative keyword evidence
 * - reasoning evidence
 * - question verification
 * - backward-compatible Tixar fields
 *
 * ============================================================================
 */

import { analyseStudentAnswer } from "./answerAnalyzer.js";

import {
  verifyQuestionAcrossSubjects,
} from "./subjectVerifierRouter.js";

// ============================================================================
// VERSION
// ============================================================================

const GRADER_VERSION = "3.0";

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  numericTolerance: 1e-5,

  /**
   * We intentionally keep text similarity conservative.
   *
   * Text overlap is EVIDENCE, not proof.
   */
  keywordCorrectThreshold: 0.9,

  /**
   * Minimum number of meaningful tokens before keyword evidence
   * can influence grading.
   */
  minimumMeaningfulTokens: 2,

  /**
   * Very short answers should not be accepted merely because
   * one word overlaps.
   */
  minimumPhraseLength: 12,

  /**
   * Confidence below this level should not silently produce
   * a definitive grade.
   */
  ambiguityThreshold: 0.55,

  /**
   * Maximum number of numbers allowed before the simple numeric
   * parser gives up.
   */
  maximumSimpleNumericParts: 1,
};

// ============================================================================
// BASIC UTILITIES
// ============================================================================

function safeString(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
}

function isBlank(value) {
  return safeString(value).trim().length === 0;
}

function normalize(value) {
  return safeString(value)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[×]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/[√]/g, "sqrt")
    .replace(/[½]/g, "1/2")
    .replace(/[¼]/g, "1/4")
    .replace(/[¾]/g, "3/4")
    .replace(/[⅓]/g, "1/3")
    .replace(/[⅔]/g, "2/3")
    .replace(/[^\p{L}\p{N}\s.,=+\-*/()%^_:<>]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  const normalized = normalize(value);

  return normalized
    ? normalized.split(/\s+/).filter(Boolean)
    : [];
}

function unique(array) {
  return [...new Set(array)];
}

// ============================================================================
// NUMBER UTILITIES
// ============================================================================

function extractNumbers(value) {
  return (
    safeString(value).match(
      /-?\d+(?:\.\d+)?/g
    ) || []
  ).map(Number);
}

function approximatelyEqual(a, b, tolerance = CONFIG.numericTolerance) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return false;
  }

  return Math.abs(a - b) <= tolerance;
}

// ============================================================================
// FRACTION PARSING
// ============================================================================

function parseFraction(value) {
  const text = normalize(value);

  const match = text.match(
    /^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/
  );

  if (!match) {
    return null;
  }

  const numerator = Number(match[1]);
  const denominator = Number(match[2]);

  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return null;
  }

  if (denominator === 0) {
    return null;
  }

  return numerator / denominator;
}

// ============================================================================
// PERCENTAGE PARSING
// ============================================================================

function parsePercentage(value) {
  const text = normalize(value);

  const match = text.match(
    /^(-?\d+(?:\.\d+)?)\s*%$/
  );

  if (!match) {
    return null;
  }

  return Number(match[1]) / 100;
}

// ============================================================================
// SIMPLE NUMERIC PARSING
// ============================================================================

function parseSimpleNumeric(value) {
  const text = normalize(value);

  if (!text) {
    return null;
  }

  const fraction = parseFraction(text);

  if (fraction !== null) {
    return fraction;
  }

  const percentage = parsePercentage(text);

  if (percentage !== null) {
    return percentage;
  }

  /**
   * Plain number only.
   *
   * We deliberately do NOT evaluate arbitrary JavaScript expressions.
   */
  if (/^-?\d+(?:\.\d+)?$/.test(text)) {
    return Number(text);
  }

  /**
   * Number with a simple unit:
   *
   * 5 kg
   * 20 m
   * 90 degrees
   *
   * The unit is handled separately.
   */
  const unitNumber = text.match(
    /^(-?\d+(?:\.\d+)?)\s*([a-z]+(?:\/[a-z]+)?|%)$/
  );

  if (unitNumber) {
    const number = Number(unitNumber[1]);

    if (unitNumber[2] === "%") {
      return number / 100;
    }

    return number;
  }

  return null;
}

// ============================================================================
// UNIT EXTRACTION
// ============================================================================

const UNIT_ALIASES = {
  meter: "m",
  meters: "m",
  metre: "m",
  metres: "m",

  centimeter: "cm",
  centimeters: "cm",
  centimetre: "cm",
  centimetres: "cm",

  kilometer: "km",
  kilometers: "km",
  kilometre: "km",
  kilometres: "km",

  kilogram: "kg",
  kilograms: "kg",
  kilogramme: "kg",
  kilogrammes: "kg",

  gram: "g",
  grams: "g",

  second: "s",
  seconds: "s",

  minute: "min",
  minutes: "min",

  hour: "h",
  hours: "h",

  degree: "deg",
  degrees: "deg",

  celsius: "c",
  "°c": "c",

  volt: "v",
  volts: "v",

  ampere: "a",
  amperes: "a",

  watt: "w",
  watts: "w",

  joule: "j",
  joules: "j",
};

function normalizeUnit(unit) {
  if (!unit) {
    return null;
  }

  const normalized = normalize(unit);

  return UNIT_ALIASES[normalized] || normalized;
}

function extractNumericWithUnit(value) {
  const text = normalize(value);

  const match = text.match(
    /^(-?\d+(?:\.\d+)?)\s*([a-z°]+(?:\/[a-z]+)?)?$/
  );

  if (!match) {
    return null;
  }

  return {
    value: Number(match[1]),
    unit: normalizeUnit(match[2]),
  };
}

// ============================================================================
// FINAL ANSWER EXTRACTION
// ============================================================================

function extractFinalNumericValue(value) {
  const text = safeString(value).trim();

  if (!text) {
    return null;
  }

  const lines = text
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean);

  const lastLine =
    lines[lines.length - 1] || text;

  /**
   * x = 42
   * answer = -3.5
   */
  const equalityMatch = lastLine.match(
    /=\s*(-?\d+(?:\.\d+)?)\s*(?:[a-z°]+)?$/i
  );

  if (equalityMatch) {
    return Number(equalityMatch[1]);
  }

  const parsed = parseSimpleNumeric(lastLine);

  if (parsed !== null) {
    return parsed;
  }

  const numericParts = extractNumbers(lastLine);

  if (numericParts.length === 1) {
    return numericParts[0];
  }

  return null;
}

// ============================================================================
// NUMERIC ANSWER EVALUATION
// ============================================================================

function evaluateNumericEquivalence(
  userAnswer,
  correctAnswer
) {
  const userText = normalize(userAnswer);
  const correctText = normalize(correctAnswer);

  if (!userText || !correctText) {
    return null;
  }

  // --------------------------------------------------------------------------
  // Exact fraction / decimal / percentage interpretation
  // --------------------------------------------------------------------------

  const correctNumeric =
    parseSimpleNumeric(correctText);

  const userNumeric =
    parseSimpleNumeric(userText);

  if (
    correctNumeric !== null &&
    userNumeric !== null
  ) {
    /**
     * Important:
     *
     * 50% = 0.5
     * 1/2 = 0.5
     * 0.5 = 0.5
     */
    if (
      approximatelyEqual(
        userNumeric,
        correctNumeric
      )
    ) {
      return {
        correct: true,
        method: "numeric_equivalence",
        confidence: 0.99,
        evidence: {
          studentValue: userNumeric,
          expectedValue: correctNumeric,
        },
      };
    }

    return {
      correct: false,
      method: "numeric_mismatch",
      confidence: 0.99,
      evidence: {
        studentValue: userNumeric,
        expectedValue: correctNumeric,
      },
    };
  }

  // --------------------------------------------------------------------------
  // Number embedded in final working
  // --------------------------------------------------------------------------

  const finalStudent =
    extractFinalNumericValue(userAnswer);

  const finalCorrect =
    extractFinalNumericValue(correctAnswer);

  if (
    finalStudent !== null &&
    finalCorrect !== null
  ) {
    if (
      approximatelyEqual(
        finalStudent,
        finalCorrect
      )
    ) {
      return {
        correct: true,
        method: "final_numeric_equivalence",
        confidence: 0.97,
        evidence: {
          studentValue: finalStudent,
          expectedValue: finalCorrect,
        },
      };
    }

    return {
      correct: false,
      method: "final_numeric_mismatch",
      confidence: 0.97,
      evidence: {
        studentValue: finalStudent,
        expectedValue: finalCorrect,
      },
    };
  }

  return null;
}

// ============================================================================
// NUMERIC + UNIT EVALUATION
// ============================================================================

function evaluateUnitAwareAnswer(
  userAnswer,
  correctAnswer
) {
  const user = extractNumericWithUnit(userAnswer);
  const correct = extractNumericWithUnit(correctAnswer);

  if (!user || !correct) {
    return null;
  }

  if (!user.unit && !correct.unit) {
    return null;
  }

  /**
   * Do not silently accept incompatible units.
   */
  if (user.unit !== correct.unit) {
    return {
      correct: false,
      method: "unit_mismatch",
      confidence: 0.98,
      evidence: {
        student: user,
        expected: correct,
      },
    };
  }

  return {
    correct: approximatelyEqual(
      user.value,
      correct.value
    ),
    method: "numeric_unit_equivalence",
    confidence: 0.99,
    evidence: {
      student: user,
      expected: correct,
    },
  };
}

// ============================================================================
// EQUATION NORMALIZATION
// ============================================================================

function normalizeEquation(value) {
  const text = normalize(value)
    .replace(/\s+/g, "");

  if (!text.includes("=")) {
    return null;
  }

  const parts = text.split("=");

  if (parts.length !== 2) {
    return null;
  }

  return {
    left: parts[0],
    right: parts[1],
  };
}

/**
 * Very conservative linear equation parser.
 *
 * Supports common forms such as:
 *
 * x=6
 * 2x=12
 * x+3=9
 * 2x+4=12
 * 4x-8=0
 *
 * It intentionally refuses complex expressions.
 */
function parseLinearExpression(expression) {
  const text = expression
    .replace(/\s+/g, "")
    .replace(/\*/g, "");

  if (!text) {
    return null;
  }

  /**
   * Only one variable is supported.
   */
  const variables =
    text.match(/[a-zA-Z]/g) || [];

  const uniqueVariables =
    unique(
      variables.map((v) =>
        v.toLowerCase()
      )
    );

  if (uniqueVariables.length > 1) {
    return null;
  }

  const variable =
    uniqueVariables[0] || null;

  if (!variable) {
    const constant = Number(text);

    return Number.isFinite(constant)
      ? {
          coefficient: 0,
          constant,
          variable: null,
        }
      : null;
  }

  /**
   * Convert:
   *
   * x       -> 1x
   * -x      -> -1x
   * 2x      -> 2x
   */
  const normalized = text
    .replace(
      new RegExp(`([+-]?)${variable}`, "gi"),
      (match, sign) => {
        if (sign === "-") return "-1";
        if (sign === "+") return "+1";
        return "1";
      }
    );

  /**
   * This parser is intentionally conservative.
   */
  if (
    !/^[+-]?\d+(?:\.\d+)?(?:[+-]\d+(?:\.\d+)?)?$/.test(
      normalized
    )
  ) {
    return null;
  }

  const coefficientMatch =
    normalized.match(
      /^([+-]?\d+(?:\.\d+)?)/
    );

  const coefficient =
    coefficientMatch
      ? Number(coefficientMatch[1])
      : 0;

  const remainder =
    normalized.slice(
      coefficientMatch
        ? coefficientMatch[0].length
        : 0
    );

  const constant =
    remainder
      ? Number(remainder)
      : 0;

  return {
    coefficient,
    constant,
    variable,
  };
}

function solveLinearEquation(equation) {
  if (!equation) {
    return null;
  }

  const left =
    parseLinearExpression(
      equation.left
    );

  const right =
    parseLinearExpression(
      equation.right
    );

  if (!left || !right) {
    return null;
  }

  if (
    left.variable &&
    right.variable &&
    left.variable !== right.variable
  ) {
    return null;
  }

  const coefficient =
    left.coefficient -
    right.coefficient;

  const constant =
    right.constant -
    left.constant;

  if (coefficient === 0) {
    return null;
  }

  return constant / coefficient;
}

function evaluateEquationEquivalence(
  userAnswer,
  correctAnswer
) {
  const userEquation =
    normalizeEquation(userAnswer);

  const correctEquation =
    normalizeEquation(correctAnswer);

  if (!userEquation || !correctEquation) {
    return null;
  }

  const userSolution =
    solveLinearEquation(userEquation);

  const correctSolution =
    solveLinearEquation(correctEquation);

  if (
    userSolution === null ||
    correctSolution === null
  ) {
    return null;
  }

  if (
    approximatelyEqual(
      userSolution,
      correctSolution
    )
  ) {
    return {
      correct: true,
      method: "linear_equation_equivalence",
      confidence: 0.97,
      evidence: {
        studentSolution: userSolution,
        expectedSolution: correctSolution,
      },
    };
  }

  return {
    correct: false,
    method: "linear_equation_mismatch",
    confidence: 0.97,
    evidence: {
      studentSolution: userSolution,
      expectedSolution: correctSolution,
    },
  };
}

// ============================================================================
// TEXT MATCHING
// ============================================================================

function exactMatch(
  userAnswer,
  correctAnswer
) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  if (!user || !correct) {
    return false;
  }

  return user === correct;
}

function phraseMatch(
  userAnswer,
  correctAnswer
) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  if (
    !user ||
    !correct ||
    correct.length < CONFIG.minimumPhraseLength
  ) {
    return false;
  }

  return (
    user.includes(correct) ||
    correct.includes(user)
  );
}

// ============================================================================
// SEMANTIC TOKEN EVIDENCE
// ============================================================================

const STOP_WORDS = new Set([
  "the",
  "and",
  "that",
  "this",
  "with",
  "from",
  "into",
  "when",
  "where",
  "which",
  "what",
  "why",
  "how",
  "are",
  "was",
  "were",
  "has",
  "have",
  "had",
  "for",
  "then",
  "than",
  "their",
  "there",
  "they",
  "them",
  "its",
  "is",
  "of",
  "to",
  "in",
  "on",
  "by",
  "a",
  "an",
  "as",
  "or",
  "be",
  "it",
  "at",
]);

function meaningfulTokens(value) {
  return unique(
    tokenize(value).filter(
      (token) =>
        token.length >= 4 &&
        !STOP_WORDS.has(token) &&
        Number.isNaN(Number(token))
    )
  );
}

function keywordEvidence(
  userAnswer,
  correctAnswer
) {
  const userTokens =
    new Set(
      meaningfulTokens(userAnswer)
    );

  const correctTokens =
    meaningfulTokens(correctAnswer);

  if (
    correctTokens.length <
    CONFIG.minimumMeaningfulTokens
  ) {
    return null;
  }

  const matched =
    correctTokens.filter((token) =>
      userTokens.has(token)
    );

  const ratio =
    matched.length /
    correctTokens.length;

  return {
    ratio,
    matched: matched.length,
    total: correctTokens.length,
    matchedTokens: matched,
    missingTokens:
      correctTokens.filter(
        (token) =>
          !userTokens.has(token)
      ),
  };
}

// ============================================================================
// SINGLE VARIANT EVALUATION
// ============================================================================

function checkSingleVariant(
  userAnswer,
  correctAnswer
) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  // --------------------------------------------------------------------------
  // BLANK
  // --------------------------------------------------------------------------

  if (!user) {
    return {
      correct: false,
      grade: "blank",
      method: "blank_answer",
      confidence: 1,
    };
  }

  // --------------------------------------------------------------------------
  // EXACT
  // --------------------------------------------------------------------------

  if (user === correct) {
    return {
      correct: true,
      grade: "correct",
      method: "exact",
      confidence: 1,
    };
  }

  // --------------------------------------------------------------------------
  // UNIT-AWARE NUMERIC
  // --------------------------------------------------------------------------

  const unitResult =
    evaluateUnitAwareAnswer(
      userAnswer,
      correctAnswer
    );

  if (unitResult) {
    return {
      ...unitResult,
      grade: unitResult.correct
        ? "correct"
        : "incorrect",
    };
  }

  // --------------------------------------------------------------------------
  // NUMERIC
  // --------------------------------------------------------------------------

  const numericResult =
    evaluateNumericEquivalence(
      userAnswer,
      correctAnswer
    );

  if (numericResult) {
    return {
      ...numericResult,
      grade: numericResult.correct
        ? "correct"
        : "incorrect",
    };
  }

  // --------------------------------------------------------------------------
  // EQUATION
  // --------------------------------------------------------------------------

  const equationResult =
    evaluateEquationEquivalence(
      userAnswer,
      correctAnswer
    );

  if (equationResult) {
    return {
      ...equationResult,
      grade: equationResult.correct
        ? "correct"
        : "incorrect",
    };
  }

  // --------------------------------------------------------------------------
  // LONG PHRASE
  // --------------------------------------------------------------------------

  if (
    phraseMatch(
      userAnswer,
      correctAnswer
    )
  ) {
    return {
      correct: true,
      grade: "correct",
      method: "phrase",
      confidence: 0.95,
    };
  }

  // --------------------------------------------------------------------------
  // KEYWORD EVIDENCE
  // --------------------------------------------------------------------------

  const keywords =
    keywordEvidence(
      userAnswer,
      correctAnswer
    );

  if (
    keywords &&
    keywords.total >=
      CONFIG.minimumMeaningfulTokens &&
    keywords.ratio >=
      CONFIG.keywordCorrectThreshold
  ) {
    return {
      correct: true,
      grade: "correct",
      method: "high_keyword_overlap",
      confidence: 0.76,
      evidence: keywords,
      warning:
        "Correctness inferred from strong lexical overlap; semantic equivalence was not independently established.",
    };
  }

  // --------------------------------------------------------------------------
  // INSUFFICIENT / WRONG
  // --------------------------------------------------------------------------

  return {
    correct: false,
    grade: "incorrect",
    method: "no_sufficient_match",
    confidence: 0.88,
    evidence: keywords,
  };
}

// ============================================================================
// MULTI-PART ANSWERS
// ============================================================================

function splitStudentParts(userAnswer) {
  return safeString(userAnswer)
    .split(
      /\n|;|•|\s+\band\b\s+|\s*,\s*/
    )
    .map((part) => part.trim())
    .filter(Boolean);
}

function checkMultiPartAnswer(
  userAnswer,
  answerList
) {
  if (!Array.isArray(answerList) || !answerList.length) {
    return {
      correct: false,
      grade: "ungradable",
      matchedCount: 0,
      totalRequired: 0,
      percent: 0,
      results: [],
    };
  }

  const studentParts =
    splitStudentParts(userAnswer);

  const results = answerList.map(
    (answer) => {
      let best = null;

      for (const studentPart of studentParts) {
        const result =
          checkSingleVariant(
            studentPart,
            answer
          );

        if (
          !best ||
          result.confidence >
            best.confidence
        ) {
          best = {
            studentPart,
            result,
          };
        }
      }

      /**
       * Also test the entire answer.
       *
       * Useful when the student writes a sentence rather
       * than separated list items.
       */
      const wholeResult =
        checkSingleVariant(
          userAnswer,
          answer
        );

      if (
        !best ||
        wholeResult.confidence >
          best.result.confidence
      ) {
        best = {
          studentPart: userAnswer,
          result: wholeResult,
        };
      }

      return {
        answer,
        studentAnswer:
          best?.studentPart || "",
        result:
          best?.result || {
            correct: false,
            grade: "incorrect",
            method: "no_match",
            confidence: 0,
          },
      };
    }
  );

  const matched =
    results.filter(
      (item) =>
        item.result.correct
    );

  const matchedCount =
    matched.length;

  const totalRequired =
    answerList.length;

  const percent =
    Math.round(
      (matchedCount /
        totalRequired) *
        100
    );

  return {
    correct:
      matchedCount === totalRequired,

    grade:
      matchedCount === 0
        ? "incorrect"
        : matchedCount ===
          totalRequired
        ? "correct"
        : "partial",

    matchedCount,
    totalRequired,
    percent,
    results,
  };
}

// ============================================================================
// MULTI-PART DETECTION
// ============================================================================

function detectMultiPartQuestion(
  question
) {
  /**
   * Metadata always wins.
   */
  if (
    question?.multi_part === true ||
    question?.multiPart === true ||
    question?.answerMode ===
      "MULTI_PART"
  ) {
    return true;
  }

  /**
   * If the answer itself is an array, this is strong evidence.
   */
  if (Array.isArray(question?.ans)) {
    return true;
  }

  /**
   * Conservative fallback.
   *
   * We intentionally do NOT detect every question containing
   * "two", "three", "all", etc.
   */
  const stem =
    safeString(
      question?.q ||
      question?.stem ||
      ""
    ).toLowerCase();

  return (
    /\b(list|name|state|give|identify)\b.{0,60}\b(two|three|four|2|3|4)\b/i.test(
      stem
    ) ||
    /\b(two|three|four|2|3|4)\s+(factors|reasons|advantages|disadvantages|examples|steps|types|ways|causes|effects)\b/i.test(
      stem
    )
  );
}

// ============================================================================
// REASONING ANALYSIS
// ============================================================================

function analyseReasoning(
  userWork,
  question,
  verifiedSteps
) {
  const work =
    safeString(userWork).trim();

  if (!work) {
    return {
      provided: false,
      status: "not_provided",
      confidence: 1,
      score: null,
      evidence: [],
      contradictions: [],
    };
  }

  const steps =
    Array.isArray(verifiedSteps)
      ? verifiedSteps
      : Array.isArray(question?.steps)
      ? question.steps
      : [];

  if (!steps.length) {
    return {
      provided: true,
      status: "not_verifiable",
      confidence: 0.2,
      score: null,
      evidence: [],
      contradictions: [],
    };
  }

  const workTokens =
    new Set(
      meaningfulTokens(work)
    );

  const expectedTokens =
    meaningfulTokens(
      steps.join(" ")
    );

  const matched =
    expectedTokens.filter(
      (token) =>
        workTokens.has(token)
    );

  const ratio =
    expectedTokens.length
      ? matched.length /
        expectedTokens.length
      : 0;

  /**
   * This is explicitly called EVIDENCE.
   *
   * It is not treated as proof that the mathematics is correct.
   */
  let status;

  if (ratio >= 0.65) {
    status = "supported_evidence";
  } else if (ratio >= 0.35) {
    status = "partial_evidence";
  } else {
    status = "limited_evidence";
  }

  return {
    provided: true,
    status,
    confidence: Math.min(
      0.75,
      0.35 + ratio * 0.5
    ),
    score: Math.round(
      ratio * 100
    ),

    evidence: matched,

    missingEvidence:
      expectedTokens.filter(
        (token) =>
          !workTokens.has(token)
      ),

    note:
      "Reasoning status represents evidence similarity to verified steps, not proof that the student's reasoning is mathematically valid.",
  };
}

// ============================================================================
// QUESTION VERIFICATION
// ============================================================================

function verifyQuestion(
  questionText,
  rawAnswer,
  question
) {
  const fallbackSolution =
    question?.sol ||
    question?.solution ||
    question?.why ||
    question?.explain ||
    question?.reason ||
    question?.mark ||
    "Review the answer.";

  const fallbackSteps =
    Array.isArray(question?.steps)
      ? question.steps
      : null;

  if (!questionText) {
    return {
      rawAnswer,
      verifiedAnswer: rawAnswer,
      solution: fallbackSolution,
      steps: fallbackSteps,

      verification: {
        attempted: false,
        status: "not_attempted",
        confidence: 0,
      },
    };
  }

  try {
    const verification =
      verifyQuestionAcrossSubjects(
        questionText,
        rawAnswer,
        question
      );

    let verifiedAnswer =
      rawAnswer;

    let solution =
      fallbackSolution;

    let steps =
      fallbackSteps;

    const isCurriculum =
      question.source ===
        "CURRICULUM" ||
      (!question.source &&
        !question.mutation);

    /**
     * Curriculum answers remain authoritative.
     */
    if (
      !isCurriculum &&
      verification?.wasOverridden &&
      verification?.verifiedAnswer !==
        undefined
    ) {
      verifiedAnswer =
        verification.verifiedAnswer;
    }

    if (
      verification?.explanation &&
      !question?.sol &&
      !question?.why &&
      !question?.explain &&
      !question?.reason
    ) {
      solution =
        verification.explanation;
    }

    if (
      Array.isArray(
        verification?.verifiedSteps
      ) &&
      verification.verifiedSteps.length
    ) {
      steps =
        verification.verifiedSteps;
    }

    return {
      rawAnswer,

      verifiedAnswer,

      solution,

      steps,

      verification: {
        attempted: true,

        status:
          verification?.wasOverridden
            ? "override_proposed"
            : "verified_or_unchanged",

        subject:
          verification?.subject ||
          question?.subject ||
          null,

        confidence:
          verification?.confidence ??
          null,

        explanation:
          verification?.explanation ||
          null,

        wasOverridden:
          Boolean(
            verification?.wasOverridden
          ),
      },
    };
  } catch (error) {
    console.warn(
      "[Tixar Grader] Question verification failed:",
      error
    );

    return {
      rawAnswer,

      verifiedAnswer: rawAnswer,

      solution: fallbackSolution,

      steps: fallbackSteps,

      verification: {
        attempted: true,
        status: "failed",
        confidence: 0,
        error:
          error?.message ||
          String(error),
      },
    };
  }
}

// ============================================================================
// GRADE CLASSIFICATION
// ============================================================================

function classifyOverallGrade({
  isAnswerCorrect,
  answerEvaluation,
  reasoning,
}) {
  if (
    answerEvaluation?.grade ===
    "blank"
  ) {
    return "blank";
  }

  if (
    answerEvaluation?.grade ===
    "partial"
  ) {
    return "partial";
  }

  if (
    isAnswerCorrect &&
    reasoning.status ===
      "not_provided"
  ) {
    return "correct";
  }

  if (
    isAnswerCorrect &&
    (
      reasoning.status ===
        "supported_evidence" ||
      reasoning.status ===
        "partial_evidence"
    )
  ) {
    return "correct";
  }

  if (
    isAnswerCorrect &&
    reasoning.status ===
      "limited_evidence"
  ) {
    return "correct";
  }

  return "incorrect";
}

// ============================================================================
// DIAGNOSTIC SAFE FALLBACK
// ============================================================================

function safeDiagnosticAnalysis(
  userAnswer,
  rawAnswer,
  question,
  userWork,
  isAnswerCorrect
) {
  try {
    return analyseStudentAnswer(
      userAnswer,
      Array.isArray(rawAnswer)
        ? rawAnswer.join(" • ")
        : String(
            rawAnswer ?? ""
          ),
      question,
      userWork,
      {
        isAnswerCorrect,
      }
    );
  } catch (error) {
    console.warn(
      "[Tixar Grader] Answer analysis failed:",
      error
    );

    return {
      understanding: {
        score: null,
        level: "unknown",
      },

      diagnosis: {
        type: "analysis_unavailable",
        severity: "unknown",
      },

      misconceptions: [],

      concepts: {
        missing: [],
      },

      contradictions: [],

      diagnosticConfidence: 0,

      error:
        error?.message ||
        String(error),
    };
  }
}

// ============================================================================
// MAIN EVALUATOR
// ============================================================================

export function evaluateAnswer(
  userAnswer,
  question,
  userWork = ""
) {
  // --------------------------------------------------------------------------
  // DEBUG
  // --------------------------------------------------------------------------

  if (
    typeof import.meta !==
      "undefined" &&
    import.meta.env?.DEV
  ) {
    console.log(
      "[TIXAR GRADER v3] evaluateAnswer:",
      {
        userAnswer,
        questionText:
          question?.q ||
          question?.stem,
        storedAnswer:
          question?.ans,
      }
    );
  }

  // --------------------------------------------------------------------------
  // QUESTION UNAVAILABLE
  // --------------------------------------------------------------------------

  if (!question) {
    return {
      isCorrect: false,
      isAnswerCorrect: false,
      isWorkCorrect: null,

      grade: "ungradable",

      correctAnswer: "",
      correctAnswerList: [],

      solution:
        "Question details unavailable.",

      steps: [],

      mark: "Incorrect",

      status: "ungradable",

      analysis: {
        type: "diagnostic_analysis",

        diagnosis: {
          type: "question_unavailable",
          severity: "high",
        },

        diagnosticConfidence: 0,
      },

      answerEvaluation: {
        grade: "ungradable",
        correct: false,
        method: "question_unavailable",
        confidence: 0,
      },

      workingEvaluation: {
        provided: false,
        status: "not_verifiable",
        confidence: 0,
        score: null,
      },

      questionVerification: {
        attempted: false,
        status: "not_attempted",
      },

      metadata: {
        graderVersion: GRADER_VERSION,
        readyForKnowledgeModel: false,
      },
    };
  }

  // --------------------------------------------------------------------------
  // EXTRACT ANSWER
  // --------------------------------------------------------------------------

  let rawAnswer;

  if (
    question.ans !==
      undefined &&
    question.ans !== null
  ) {
    rawAnswer =
      question.ans;
  } else {
    rawAnswer =
      question.answer ??
      question.a ??
      question.Answer ??
      question.correctAnswer ??
      "";
  }

  /**
   * Protect against corrupted seed data.
   */
  if (
    typeof rawAnswer ===
      "string" &&
    rawAnswer
      .trim()
      .toLowerCase() ===
      "undefined"
  ) {
    rawAnswer = "";
  }

  const questionText =
    question.q ||
    question.stem ||
    "";

  // --------------------------------------------------------------------------
  // VERIFY QUESTION
  // --------------------------------------------------------------------------

  const verified =
    verifyQuestion(
      questionText,
      rawAnswer,
      question
    );

  rawAnswer =
    verified.verifiedAnswer;

  const solution =
    verified.solution;

  const verifiedSteps =
    verified.steps;

  // --------------------------------------------------------------------------
  // ENRICH QUESTION
  // --------------------------------------------------------------------------

  const enrichedQuestion = {
    ...question,

    ans: rawAnswer,

    ...(verifiedSteps
      ? {
          steps: verifiedSteps,
        }
      : {}),
  };

  // --------------------------------------------------------------------------
  // DETERMINE ANSWER MODE
  // --------------------------------------------------------------------------

  const isMultiPart =
    detectMultiPartQuestion(
      question
    );

  let isAnswerCorrect = false;

  let answerEvaluation;

  let partialInfo = null;

  // --------------------------------------------------------------------------
  // MULTI-PART ANSWER
  // --------------------------------------------------------------------------

  if (
    Array.isArray(rawAnswer) &&
    isMultiPart
  ) {
    const multipart =
      checkMultiPartAnswer(
        userAnswer,
        rawAnswer
      );

    isAnswerCorrect =
      multipart.correct;

    answerEvaluation =
      multipart;

    if (
      multipart.grade ===
      "partial"
    ) {
      partialInfo = {
        matchedCount:
          multipart.matchedCount,

        totalRequired:
          multipart.totalRequired,

        percent:
          multipart.percent,
      };
    }
  }

  // --------------------------------------------------------------------------
  // MULTIPLE ACCEPTED VARIANTS
  // --------------------------------------------------------------------------

  else if (
    Array.isArray(rawAnswer)
  ) {
    const results =
      rawAnswer.map(
        (variant) =>
          checkSingleVariant(
            userAnswer,
            variant
          )
      );

    const successful =
      results.find(
        (result) =>
          result.correct
      );

    isAnswerCorrect =
      Boolean(successful);

    answerEvaluation = {
      correct:
        isAnswerCorrect,

      grade:
        isAnswerCorrect
          ? "correct"
          : isBlank(userAnswer)
          ? "blank"
          : "incorrect",

      method:
        successful?.method ||
        "none",

      confidence:
        successful?.confidence ??
        0,

      variants:
        results,
    };
  }

  // --------------------------------------------------------------------------
  // SINGLE ANSWER
  // --------------------------------------------------------------------------

  else {
    answerEvaluation =
      checkSingleVariant(
        userAnswer,
        rawAnswer
      );

    isAnswerCorrect =
      Boolean(
        answerEvaluation.correct
      );
  }

  // --------------------------------------------------------------------------
  // REASONING
  // --------------------------------------------------------------------------

  const reasoning =
    analyseReasoning(
      userWork,
      question,
      verifiedSteps
    );

  /**
   * IMPORTANT:
   *
   * We no longer pretend lexical evidence proves
   * the work is mathematically correct.
   */
  let isWorkCorrect = null;

  if (
    reasoning.provided
  ) {
    if (
      reasoning.status ===
      "supported_evidence"
    ) {
      isWorkCorrect = true;
    } else if (
      reasoning.status ===
      "limited_evidence"
    ) {
      isWorkCorrect = false;
    } else {
      isWorkCorrect = null;
    }
  }

  // --------------------------------------------------------------------------
  // DIAGNOSTIC ANALYSIS
  // --------------------------------------------------------------------------

  const analysis =
    safeDiagnosticAnalysis(
      userAnswer,
      rawAnswer,
      enrichedQuestion,
      userWork,
      isAnswerCorrect
    );

  // --------------------------------------------------------------------------
  // OVERALL GRADE
  // --------------------------------------------------------------------------

  const grade =
    classifyOverallGrade({
      isAnswerCorrect,
      answerEvaluation,
      reasoning,
    });

  // --------------------------------------------------------------------------
  // STATUS
  // --------------------------------------------------------------------------

  let status;

  if (
    grade === "blank"
  ) {
    status =
      "blank_answer";
  } else if (
    partialInfo
  ) {
    status =
      "partially_correct";
  } else if (
    isAnswerCorrect &&
    reasoning.status ===
      "supported_evidence"
  ) {
    status =
      "correct_with_supported_reasoning";
  } else if (
    isAnswerCorrect &&
    reasoning.status !==
      "supported_evidence"
  ) {
    status =
      "correct_answer_reasoning_evidence_insufficient";
  } else if (
    !isAnswerCorrect &&
    reasoning.status ===
      "supported_evidence"
  ) {
    status =
      "incorrect_final_answer_with_reasoning_evidence";
  } else {
    status =
      "incorrect";
  }

  // --------------------------------------------------------------------------
  // WORKING NOTE
  // --------------------------------------------------------------------------

  let workingNote = null;

  if (
    status ===
    "correct_answer_reasoning_evidence_insufficient"
  ) {
    workingNote =
      "Your final answer is correct, but the working provided is not enough to establish how you reached it.";
  }

  if (
    status ===
    "incorrect_final_answer_with_reasoning_evidence"
  ) {
    workingNote =
      "Your final answer is incorrect, but your working contains evidence related to the expected method. Check the final step or calculation.";
  }

  if (partialInfo) {
  workingNote =
    `Partially correct: ${partialInfo.matchedCount}/${partialInfo.totalRequired} required items identified (${partialInfo.percent}%).`;
}
  // --------------------------------------------------------------------------
  // ANSWER FORMAT
  // --------------------------------------------------------------------------

  const cleanAnswerValue =
    (value) =>
      value !==
        undefined &&
      value !== null &&
      String(value)
        .trim()
        .toLowerCase() !==
        "undefined";

  const mainCorrectAnswerStr =
    Array.isArray(rawAnswer)
      ? rawAnswer
          .filter(
            cleanAnswerValue
          )
          .map((v) =>
            String(v)
          )
          .join(" • ")
      : cleanAnswerValue(
          rawAnswer
        )
      ? String(rawAnswer)
      : "";

  const correctAnswerList =
    Array.isArray(rawAnswer)
      ? rawAnswer.filter(
          cleanAnswerValue
        )
      : mainCorrectAnswerStr
      ? [mainCorrectAnswerStr]
      : [];

  // --------------------------------------------------------------------------
  // EVIDENCE
  // --------------------------------------------------------------------------

  const evidence = {
    answerCorrect:
      isAnswerCorrect,

    answerGrade:
      grade,

    answerMethod:
      answerEvaluation?.method ||
      null,

    answerConfidence:
      answerEvaluation?.confidence ??
      0,

    reasoningSupported:
      reasoning.status ===
      "supported_evidence",

    reasoningStatus:
      reasoning.status,

    reasoningConfidence:
      reasoning.confidence,

    understandingScore:
      analysis?.understanding?.score ??
      null,

    understandingLevel:
      analysis?.understanding?.level ??
      "unknown",

    diagnosis:
      analysis?.diagnosis?.type ??
      "unknown",

    misconceptionCount:
      Array.isArray(
        analysis?.misconceptions
      )
        ? analysis.misconceptions.length
        : 0,

    missingConceptCount:
      Array.isArray(
        analysis?.concepts?.missing
      )
        ? analysis.concepts.missing.length
        : 0,

    contradictionCount:
      Array.isArray(
        analysis?.contradictions
      )
        ? analysis.contradictions.length
        : 0,
  };

  // --------------------------------------------------------------------------
  // RETURN
  // --------------------------------------------------------------------------

  return {
    // ========================================================================
    // BACKWARD COMPATIBILITY
    // ========================================================================

    isCorrect:
      isAnswerCorrect,

    isAnswerCorrect,

    isWorkCorrect,

    workingNote,

    correctAnswer:
      mainCorrectAnswerStr,

    correctAnswerList,

    solution,

    steps:
      verifiedSteps || [],

    mark:
      isAnswerCorrect
        ? "Correct"
        : "Incorrect",

    analysis,

    // ========================================================================
    // NEW GRADING FIELDS
    // ========================================================================

    grade,

    status,

    answerEvaluation,

    workingEvaluation:
      reasoning,

    questionVerification:
      verified.verification,

    understanding:
      analysis?.understanding ?? {
        score: null,
        level: "unknown",
      },

    diagnosis:
      analysis?.diagnosis ?? {
        type: "unknown",
        severity: "unknown",
      },

    misconceptions:
      analysis?.misconceptions ?? [],

    conceptEvidence:
      analysis?.concepts ?? {
        missing: [],
      },

    diagnosticConfidence:
      analysis?.diagnosticConfidence ??
      0,

    evidence,

    // ========================================================================
    // PROVENANCE
    // ========================================================================

    provenance: {
      originalAnswer:
        question.ans ??
        question.answer ??
        question.a ??
        question.Answer ??
        question.correctAnswer ??
        "",

      verifiedAnswer:
        rawAnswer,

      answerWasVerified:
        Boolean(
          verified.verification
            ?.attempted
        ),

      answerWasOverridden:
        Boolean(
          verified.verification
            ?.wasOverridden
        ),

      answerSource:
        question.source ||
        "UNKNOWN",

      mutation:
        question.mutation ||
        null,
    },

    // ========================================================================
    // KNOWLEDGE MODEL SAFETY
    // ========================================================================

    knowledgeModel: {
      /**
       * A correct answer is evidence of answer correctness,
       * NOT automatic proof of mastery.
       */
      answerCorrect:
        isAnswerCorrect,

      reasoningEvidence:
        reasoning.status,

      diagnosisAvailable:
        Boolean(
          analysis?.diagnosis
        ),

      safeToInferMastery:
        Boolean(
          isAnswerCorrect &&
          analysis?.diagnosticConfidence >=
            0.85 &&
          reasoning.status !==
            "limited_evidence"
        ),

      requiresAdditionalEvidence:
        Boolean(
          grade === "blank" ||
          grade === "partial" ||
          reasoning.status ===
            "limited_evidence"
        ),
    },

    // ========================================================================
    // METADATA
    // ========================================================================

    metadata: {
      graderVersion:
        GRADER_VERSION,

      architecture:
        "verification + equivalence + answer_evidence + reasoning_evidence + diagnosis",

      readyForKnowledgeModel:
        true,
    },
  };
}

// ============================================================================
// OPTIONAL DIRECT HELPERS
// ============================================================================

export {
  normalize,
  tokenize,
  extractNumbers,
  parseFraction,
  parsePercentage,
  parseSimpleNumeric,
  evaluateNumericEquivalence,
  evaluateEquationEquivalence,
  keywordEvidence,
  checkSingleVariant,
  analyseReasoning,
};