
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
   * Evidence-based semantic threshold for full credit.
   * Relaxed from 0.9 to 0.65 when combined with morphology,
   * typo tolerance, and concept clusters.
   */
  keywordCorrectThreshold: 0.65,

  /**
   * Evidence-based threshold for partial credit ("Almost There").
   */
  keywordPartialThreshold: 0.35,

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

  /**
   * Minimum token length to be eligible for Damerau-Levenshtein typo tolerance.
   * Prevents false positives on short words.
   */
  typoMinTokenLength: 5,
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

  // Student answer contains the entire expected answer (e.g. conversational wrapping)
  if (user.includes(correct)) {
    return true;
  }

  // If expected answer contains student answer, only accept as full match if nearly the full length
  if (correct.includes(user) && user.length >= correct.length * 0.85) {
    return true;
  }

  return false;
}

// ============================================================================
// MORPHOLOGICAL NORMALIZATION (LIGHTWEIGHT STEMMING)
// ============================================================================

function stemToken(word) {
  if (!word || typeof word !== "string" || word.length <= 3) {
    return word;
  }

  let w = word.toLowerCase();

  // Curricular & domain-specific reductions
  if (w.endsWith("absorption")) return "absorb";
  if (w.endsWith("production")) return "produce";
  if (w.endsWith("respiration")) return "respire";
  if (w.endsWith("conduction")) return "conduct";
  if (w.endsWith("photosynthesizing") || w.endsWith("photosynthesis")) return "photosynthes";
  if (w.endsWith("interconnection") || w.endsWith("interconnected")) return "connect";
  if (w.endsWith("multiplication")) return "multiply";
  if (w.endsWith("subtraction")) return "subtract";
  if (w.endsWith("magnification")) return "magnify";
  if (w.endsWith("enlargement")) return "enlarge";

  // General suffix reductions
  if (w.endsWith("sses")) return w.slice(0, -2);
  if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
  if (w.endsWith("es") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) return w.slice(0, -1);
  if (w.endsWith("ational")) return w.slice(0, -7) + "ate";
  if (w.endsWith("ization") || w.endsWith("isation")) return w.slice(0, -7) + "ize";
  if (w.endsWith("tion") || w.endsWith("sion")) return w.slice(0, -4);
  if (w.endsWith("ment") && w.length > 6) return w.slice(0, -4);
  if (w.endsWith("ing") && w.length > 5) {
    const base = w.slice(0, -3);
    if (base.length > 3 && base[base.length - 1] === base[base.length - 2]) {
      return base.slice(0, -1);
    }
    return base;
  }
  if (w.endsWith("ed") && w.length > 4) {
    const base = w.slice(0, -2);
    if (base.length > 3 && base[base.length - 1] === base[base.length - 2]) {
      return base.slice(0, -1);
    }
    return base;
  }
  if (w.endsWith("ivity") && w.length > 6) return w.slice(0, -5);
  if (w.endsWith("ive") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("able") && w.length > 5) return w.slice(0, -4);

  return w;
}

// ============================================================================
// DAMERAU-LEVENSHTEIN TYPO TOLERANCE
// ============================================================================

function damerauLevenshtein(a, b) {
  if (!a || !b) return (a || b || "").length;
  if (a === b) return 0;

  const lenA = a.length;
  const lenB = b.length;
  const d = [];

  for (let i = 0; i <= lenA; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= lenB; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,       // deletion
        d[i][j - 1] + 1,       // insertion
        d[i - 1][j - 1] + cost // substitution
      );

      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // transposition
      }
    }
  }

  return d[lenA][lenB];
}

function isTypoMatch(wordA, wordB) {
  if (!wordA || !wordB) return false;
  if (wordA === wordB) return true;

  const len = Math.max(wordA.length, wordB.length);
  if (len < (CONFIG.typoMinTokenLength || 5)) return false;

  const dist = damerauLevenshtein(wordA, wordB);
  if (len <= 7) return dist <= 1;
  return dist <= 2;
}

// ============================================================================
// CONSERVATIVE CONCEPT CLUSTERS
// ============================================================================

const CONCEPT_CLUSTERS = {
  instrument: ["instrument", "device", "apparatus", "equipment", "tool", "machine", "gadget"],
  magnify: ["magnify", "magnification", "enlarge", "enlargement", "amplify", "zoom", "bigger", "larger"],
  small: ["small", "tiny", "minute", "micro", "microscopic", "little", "miniature"],
  observe: ["observe", "see", "view", "look", "examine", "visualize", "watch", "inspect"],
  specimen: ["specimen", "sample", "slide", "material", "tissue", "organism"],
  transfer: ["transfer", "move", "conduct", "transmit", "carry", "pass", "convey"],
  current: ["current", "electricity", "flow", "charge", "ampere", "electrons"],
  bond: ["bond", "link", "join", "connect", "attract", "interconnect"],
  ionic: ["ionic", "ion", "cation", "anion", "charged", "electrostatic"],
  covalent: ["covalent", "share", "sharing", "shared", "paired", "pair"],
  profit: ["profit", "gain", "surplus", "income", "revenue", "earning", "earnings"],
  loss: ["loss", "deficit", "negative", "shortfall"],
  divide: ["divide", "division", "quotient", "split", "ratio", "per"],
  multiply: ["multiply", "multiplication", "product", "times", "factor"],
  subtract: ["subtract", "subtraction", "minus", "deduct", "reduce"],
  add: ["add", "addition", "sum", "total", "plus", "increase", "combine"],
  formula: ["formula", "equation", "expression", "rule", "law"],
  calculate: ["calculate", "calculation", "compute", "solve", "find", "determine"],
  increase: ["increase", "increases", "increased", "rise", "rises", "higher", "greater", "escalate"],
  decrease: ["decrease", "decreases", "decreased", "fall", "falls", "lower", "less", "drop"],
  conductor: ["conductor", "conductive", "conducts", "conduction"],
  insulator: ["insulator", "insulating", "insulates", "insulation", "nonconductor"],
  produce: ["produce", "production", "producing", "make", "making", "manufacture", "synthesize", "generate", "create"],
  food: ["food", "glucose", "nutrient", "nutrients", "sugar", "sugars", "starch"],
  sunlight: ["sunlight", "light", "solar", "sun", "sunshine"],
  absorb: ["absorb", "absorption", "absorbing", "soak", "draw", "uptake"],
  store: ["store", "storage", "stored", "contain", "hold", "reserve", "retain"],
  network: ["network", "interconnect", "interconnected", "link"],
  communicate: ["communicate", "communication", "talk", "exchange"],
  share: ["share", "sharing", "shared", "pool"],
  trade: ["trade", "trading", "commerce", "buying", "selling", "exchange", "barter"],
};

const WORD_TO_CLUSTER = {};
for (const [clusterKey, words] of Object.entries(CONCEPT_CLUSTERS)) {
  for (const w of words) {
    const raw = w.toLowerCase();
    WORD_TO_CLUSTER[raw] = clusterKey;
    WORD_TO_CLUSTER[stemToken(raw)] = clusterKey;
  }
}

function getConceptKey(token) {
  const raw = token.toLowerCase();
  if (WORD_TO_CLUSTER[raw]) return WORD_TO_CLUSTER[raw];
  const stem = stemToken(raw);
  if (WORD_TO_CLUSTER[stem]) return WORD_TO_CLUSTER[stem];
  return stem;
}

// ============================================================================
// NEGATION PROTECTION (VETO LAYER)
// ============================================================================

const NEGATION_WORDS = new Set([
  "not", "no", "never", "cannot", "cant", "can't",
  "wont", "won't", "doesnt", "doesn't", "dont", "don't",
  "isnt", "isn't", "arent", "aren't", "without", "hardly", "neither", "nor"
]);

function detectNegationMismatch(userText, correctText) {
  const userTokens = tokenize(userText);
  const correctTokens = tokenize(correctText);

  const userHasNegation = userTokens.some((t) => NEGATION_WORDS.has(t));
  const correctHasNegation = correctTokens.some((t) => NEGATION_WORDS.has(t));

  return userHasNegation !== correctHasNegation;
}

// ============================================================================
// SEMANTIC TOKEN EVIDENCE
// ============================================================================

const STOP_WORDS = new Set([
  "the", "and", "that", "this", "with", "from", "into", "when", "where",
  "which", "what", "why", "how", "are", "was", "were", "has", "have",
  "had", "for", "then", "than", "their", "there", "they", "them", "its",
  "is", "of", "to", "in", "on", "by", "a", "an", "as", "or", "be", "it", "at"
]);

function meaningfulTokens(value) {
  return unique(
    tokenize(value).filter(
      (token) =>
        token.length >= 3 &&
        !STOP_WORDS.has(token) &&
        !NEGATION_WORDS.has(token) &&
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

function evaluateConceptCoverage(userAnswer, correctAnswer) {
  const userTokens = meaningfulTokens(userAnswer);
  const targetTokens = meaningfulTokens(correctAnswer);

  if (targetTokens.length === 0) {
    return null;
  }

  if (detectNegationMismatch(userAnswer, correctAnswer)) {
    return {
      negationMismatch: true,
      ratio: 0,
      matched: 0,
      total: targetTokens.length,
      matchedTokens: [],
      missingTokens: targetTokens,
    };
  }

  const matchedTokens = [];
  const missingTokens = [];
  const userConceptKeys = new Set(userTokens.map(getConceptKey));

  for (const targetToken of targetTokens) {
    const targetConceptKey = getConceptKey(targetToken);
    let found = false;

    if (userConceptKeys.has(targetConceptKey)) {
      found = true;
    } else {
      for (const uToken of userTokens) {
        if (isTypoMatch(uToken, targetToken)) {
          found = true;
          break;
        }
      }
    }

    if (found) {
      matchedTokens.push(targetToken);
    } else {
      missingTokens.push(targetToken);
    }
  }

  const ratio = targetTokens.length > 0 ? matchedTokens.length / targetTokens.length : 0;

  return {
    negationMismatch: false,
    ratio,
    matched: matchedTokens.length,
    total: targetTokens.length,
    matchedTokens,
    missingTokens,
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
      acceptedAlternative: false,
      shouldRecordMistake: false,
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
      acceptedAlternative: false,
      shouldRecordMistake: false,
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
      acceptedAlternative: false,
      shouldRecordMistake: !unitResult.correct,
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
      acceptedAlternative: false,
      shouldRecordMistake: !numericResult.correct,
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
      acceptedAlternative: false,
      shouldRecordMistake: !equationResult.correct,
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
      acceptedAlternative: true,
      shouldRecordMistake: false,
    };
  }

  // --------------------------------------------------------------------------
  // EVIDENCE-BASED FREE-TEXT & CONCEPT MATCHING
  // --------------------------------------------------------------------------

  const conceptEv = evaluateConceptCoverage(userAnswer, correctAnswer);

  if (conceptEv && !conceptEv.negationMismatch) {
    // 1. FULL CREDIT: Meets relaxed threshold (0.65) or single-word target with ratio 1.0 (exact typo/stem match)
    const isSingleWordTarget = conceptEv.total === 1;
    const qualifiesForFullCredit = isSingleWordTarget
      ? conceptEv.ratio === 1.0
      : (conceptEv.total >= CONFIG.minimumMeaningfulTokens && conceptEv.ratio >= CONFIG.keywordCorrectThreshold);

    if (qualifiesForFullCredit) {
      return {
        correct: true,
        grade: "correct",
        method: "concept_match",
        confidence: 0.85,
        acceptedAlternative: true,
        shouldRecordMistake: false,
        matchedConcepts: conceptEv.matchedTokens,
        missingConcepts: conceptEv.missingTokens,
        evidence: conceptEv,
      };
    }

    // 2. PARTIAL CREDIT ("Almost There"): Meets partial threshold (0.35 - 0.64)
    if (conceptEv.ratio >= CONFIG.keywordPartialThreshold) {
      return {
        correct: false,
        partialCredit: true,
        grade: "partial",
        method: "concept_partial",
        confidence: 0.70,
        acceptedAlternative: false,
        shouldRecordMistake: false,
        requiresReview: false,
        matchedConcepts: conceptEv.matchedTokens,
        missingConcepts: conceptEv.missingTokens,
        evidence: conceptEv,
      };
    }
  }

  // --------------------------------------------------------------------------
  // INSUFFICIENT / WRONG
  // --------------------------------------------------------------------------

  return {
    correct: false,
    partialCredit: false,
    grade: "incorrect",
    method: conceptEv?.negationMismatch ? "negation_mismatch" : "no_sufficient_match",
    confidence: 0.88,
    shouldRecordMistake: true,
    matchedConcepts: conceptEv?.matchedTokens || [],
    missingConcepts: conceptEv?.missingTokens || meaningfulTokens(correctAnswer),
    evidence: conceptEv,
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
    "partial" ||
    answerEvaluation?.partialCredit === true
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
    partialInfo ||
    grade === "partial"
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
  } else if (grade === "partial") {
    const missing = answerEvaluation?.missingConcepts;
    workingNote =
      missing && missing.length
        ? `Almost there! You've got the main idea. Remember to consider: ${missing.join(", ")}.`
        : "Almost there! You're on the right track.";
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
        : (grade === "partial" ? "Almost There" : "Incorrect"),

    analysis,

    // ========================================================================
    // NEW GRADING FIELDS
    // ========================================================================

    grade,

    status,

    partialCredit:
      grade === "partial" || Boolean(answerEvaluation?.partialCredit),

    acceptedAlternative:
      Boolean(answerEvaluation?.acceptedAlternative),

    shouldRecordMistake:
      answerEvaluation?.shouldRecordMistake ??
      (grade !== "partial" && !isAnswerCorrect && grade !== "blank"),

    missingConcepts:
      answerEvaluation?.missingConcepts || [],

    matchedConcepts:
      answerEvaluation?.matchedConcepts || [],

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