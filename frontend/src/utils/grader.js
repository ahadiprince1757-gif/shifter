
/**
 * ============================================================================
 * TIXAR GRADER
 * ============================================================================
 *
 * Production-oriented, evidence-first answer evaluator.
 *
 * Core principle:
 *
 *   ANSWER CORRECTNESS
 *          !=
 *   REASONING VALIDITY
 *          !=
 *   UNDERSTANDING
 *          !=
 *   MISCONCEPTION DIAGNOSIS
 *          !=
 *   MASTERY
 *
 * Pipeline:
 *
 *   QUESTION
 *      -> VERIFY QUESTION
 *      -> NORMALIZE ANSWER
 *      -> CLASSIFY ANSWER
 *      -> CHECK EQUIVALENCE
 *      -> COLLECT REASONING EVIDENCE
 *      -> DIAGNOSE ERRORS
 *      -> RETURN STRUCTURED RESULT
 *
 * Safety principles:
 *
 * - Lexical similarity is not proof of understanding.
 * - A correct final answer does not prove correct working.
 * - Missing reasoning is not automatically incorrect reasoning.
 * - A wrong answer does not automatically identify a misconception.
 * - Partial credit is not full credit.
 * - Unit equivalence does not imply unit conversion.
 * - Question verification must not silently overwrite authoritative
 *   curriculum answers.
 * - Mastery must not be inferred from one correct answer.
 *
 * Backward compatibility:
 *
 * - Keeps evaluateAnswer(userAnswer, question, userWork).
 * - Keeps the existing imports.
 * - Keeps legacy return fields.
 * - Keeps the exported helper functions.
 *
 * ============================================================================
 */

import { analyseStudentAnswer } from "./answerAnalyzer.js";
import { diagnoseStudentSubmission } from "../diagnostics/teacherDiagnoser.js";

import {
  verifyQuestionAcrossSubjects,
} from "./subjectVerifierRouter.js";

// ============================================================================
// VERSION AND CONFIGURATION
// ============================================================================

const GRADER_VERSION = "4.0";

const CONFIG = {
  numericTolerance: 1e-5,

  // Free-text matching is deliberately conservative.
  keywordCorrectThreshold: 0.80,
  keywordPartialThreshold: 0.35,
  minimumMeaningfulTokens: 2,
  minimumPhraseLength: 12,

  // Retained for backward compatibility.
  ambiguityThreshold: 0.55,
  maximumSimpleNumericParts: 1,
  typoMinTokenLength: 5,
};

// ============================================================================
// BASIC UTILITIES
// ============================================================================

function safeString(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function isBlank(value) {
  return safeString(value).trim().length === 0;
}

function unique(values) {
  return [...new Set(values)];
}

function normalize(value) {
  return safeString(value)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[×]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/√/g, "sqrt")
    .replace(/½/g, "1/2")
    .replace(/¼/g, "1/4")
    .replace(/¾/g, "3/4")
    .replace(/⅓/g, "1/3")
    .replace(/⅔/g, "2/3")
    .replace(/°\s*c\b/g, " c")
    .replace(/[^\p{L}\p{N}\s.,=+\-*/()%^_:<>']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  const text = normalize(value);
  return text ? text.split(/\s+/).filter(Boolean) : [];
}

// ============================================================================
// NUMBER UTILITIES
// ============================================================================

function extractNumbers(value) {
  return (
    safeString(value).match(/-?\d+(?:\.\d+)?/g) || []
  ).map(Number);
}

function approximatelyEqual(
  a,
  b,
  tolerance = CONFIG.numericTolerance
) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;

  return Math.abs(a - b) <= tolerance;
}

// ============================================================================
// STRICT NUMERIC PARSING
// ============================================================================

function parseStrictNumericValue(value) {
  if (value === null || value === undefined) return null;

  let text = String(value).trim();
  if (!text) return null;

  if (text.includes(",")) {
    if (!/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(text)) {
      return null;
    }

    text = text.replace(/,/g, "");
  }

  const fraction = text.match(
    /^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/
  );

  if (fraction) {
    const numerator = Number(fraction[1]);
    const denominator = Number(fraction[2]);

    if (!Number.isFinite(numerator) ||
        !Number.isFinite(denominator) ||
        denominator === 0) {
      return null;
    }

    const result = numerator / denominator;
    return Number.isFinite(result) ? result : null;
  }

  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
    return null;
  }

  const result = Number(text);
  return Number.isFinite(result) ? result : null;
}

// ============================================================================
// FRACTION AND PERCENTAGE PARSING
// ============================================================================

function parseFraction(value) {
  const text = normalize(value);

  const match = text.match(
    /^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/
  );

  if (!match) return null;

  const numerator = Number(match[1]);
  const denominator = Number(match[2]);

  if (!Number.isFinite(numerator) ||
      !Number.isFinite(denominator) ||
      denominator === 0) {
    return null;
  }

  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

function parsePercentage(value) {
  const text = normalize(value);
  const match = text.match(/^([+-]?\d+(?:\.\d+)?)\s*%$/);

  if (!match) return null;

  const result = Number(match[1]) / 100;
  return Number.isFinite(result) ? result : null;
}

function parseSimpleNumeric(value) {
  const text = normalize(value);
  if (!text) return null;

  const fraction = parseFraction(text);
  if (fraction !== null) return fraction;

  const percentage = parsePercentage(text);
  if (percentage !== null) return percentage;

  if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
    const result = Number(text);
    return Number.isFinite(result) ? result : null;
  }

  // A numeric value with a recognized unit.
  const withUnit = extractNumericWithUnit(value);

  if (withUnit && withUnit.unit !== null) {
    return withUnit.value;
  }

  return null;
}

// ============================================================================
// UNIT NORMALIZATION
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

  millimeter: "mm",
  millimeters: "mm",
  millimetre: "mm",
  millimetres: "mm",

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
  milligram: "mg",
  milligrams: "mg",

  second: "s",
  seconds: "s",
  sec: "s",
  secs: "s",

  minute: "min",
  minutes: "min",

  hour: "h",
  hours: "h",
  hr: "h",
  hrs: "h",

  degree: "deg",
  degrees: "deg",

  celsius: "c",
  kelvin: "k",

  volt: "v",
  volts: "v",
  ampere: "a",
  amperes: "a",
  amp: "a",
  amps: "a",

  watt: "w",
  watts: "w",
  joule: "j",
  joules: "j",
  newton: "n",
  newtons: "n",

  pascal: "pa",
  pascals: "pa",
  hertz: "hz",
  mole: "mol",
  moles: "mol",

  liter: "l",
  liters: "l",
  litre: "l",
  litres: "l",
  milliliter: "ml",
  milliliters: "ml",
  millilitre: "ml",
  millilitres: "ml",

  kmph: "km/h",
  kph: "km/h",
  "km/hr": "km/h",
  "km/hour": "km/h",

  mps: "m/s",
  "m/sec": "m/s",
  "m/s": "m/s",

  "km/h": "km/h",
  "m/s^2": "m/s^2",
  "m/s²": "m/s^2",
};

const CANONICAL_UNITS = new Set([
  "m", "cm", "mm", "km",
  "kg", "g", "mg",
  "s", "min", "h",
  "deg", "c", "k",
  "v", "a", "w", "j", "n", "pa", "hz",
  "mol", "l", "ml",
  "km/h", "m/s", "m/s^2",
]);

function normalizeUnit(unit) {
  if (!unit) return null;

  let text = safeString(unit)
    .trim()
    .toLowerCase()
    .replace(/²/g, "^2")
    .replace(/°/g, "");

  if (UNIT_ALIASES[text]) return UNIT_ALIASES[text];
  if (CANONICAL_UNITS.has(text)) return text;

  return null;
}

function extractNumericWithUnit(value) {
  let text = safeString(value).trim().toLowerCase();

  if (!text) return null;

  text = text
    .replace(/,/g, (match, offset, whole) => {
      // Thousands separators are allowed only in valid numeric groups.
      return whole.slice(0, offset).match(/^\d{1,3}(?:,\d{3})*$/)
        ? ""
        : match;
    })
    .replace(/°\s*c\b/g, " c")
    .replace(/²/g, "^2")
    .replace(/\s+/g, " ")
    .trim();

  const match = text.match(
    /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*([a-z]+(?:\/[a-z]+(?:\^2)?)?)?$/
  );

  if (!match) return null;

  const numericValue = Number(match[1]);
  if (!Number.isFinite(numericValue)) return null;

  const rawUnit = match[2] || null;

  return {
    value: numericValue,
    unit: rawUnit ? normalizeUnit(rawUnit) : null,
    rawUnit,
  };
}

// ============================================================================
// FINAL ANSWER EXTRACTION
// ============================================================================

function extractFinalNumericValue(value) {
  const text = safeString(value).trim();
  if (!text) return null;

  const lines = text
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean);

  const lastLine = lines[lines.length - 1] || text;

  const equality = lastLine.match(
    /(?:^|=)\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(?:[a-z°]+)?\s*$/i
  );

  if (equality) return Number(equality[1]);

  const direct = parseStrictNumericValue(lastLine);
  if (direct !== null) return direct;

  const fraction = parseFraction(lastLine);
  if (fraction !== null) return fraction;

  const percentage = parsePercentage(lastLine);
  if (percentage !== null) return percentage;

  // Never accept malformed values such as "12abc" as the number 12.
  if (/^[+-]?\d+(?:\.\d+)?[a-zA-Z]+$/.test(lastLine.replace(/\s+/g, ""))) {
    return null;
  }

  const numbers = extractNumbers(lastLine);

  return numbers.length === 1 ? numbers[0] : null;
}

// ============================================================================
// NUMERIC EQUIVALENCE
// ============================================================================

function evaluateNumericEquivalence(userAnswer, correctAnswer) {
  const userText = normalize(userAnswer);
  const correctText = normalize(correctAnswer);

  if (!userText || !correctText) return null;

  const userNumeric = parseSimpleNumeric(userText);
  const correctNumeric = parseSimpleNumeric(correctText);

  if (userNumeric !== null && correctNumeric !== null) {
    const correct = approximatelyEqual(userNumeric, correctNumeric);

    return {
      correct,
      method: correct ? "numeric_equivalence" : "numeric_mismatch",
      confidence: 0.99,
      evidence: {
        studentValue: userNumeric,
        expectedValue: correctNumeric,
      },
    };
  }

  const finalStudent = extractFinalNumericValue(userAnswer);
  const finalCorrect = extractFinalNumericValue(correctAnswer);

  if (finalStudent !== null && finalCorrect !== null) {
    const correct = approximatelyEqual(finalStudent, finalCorrect);

    return {
      correct,
      method: correct
        ? "final_numeric_equivalence"
        : "final_numeric_mismatch",
      confidence: 0.95,
      evidence: {
        studentValue: finalStudent,
        expectedValue: finalCorrect,
      },
    };
  }

  return null;
}

// ============================================================================
// UNIT-AWARE EVALUATION
// ============================================================================

function evaluateUnitAwareAnswer(userAnswer, correctAnswer) {
  const user = extractNumericWithUnit(userAnswer);
  const correct = extractNumericWithUnit(correctAnswer);

  if (!user || !correct) return null;
  if (!user.unit && !correct.unit) return null;

  // Do not silently accept a missing or unknown unit when the expected
  // answer explicitly requires a recognized unit.
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

  const isCorrect = approximatelyEqual(user.value, correct.value);

  return {
    correct: isCorrect,
    method: isCorrect
      ? "numeric_unit_equivalence"
      : "numeric_unit_mismatch",
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
  const text = normalize(value).replace(/\s+/g, "");

  if (!text.includes("=")) return null;

  const parts = text.split("=");

  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }

  return {
    left: parts[0],
    right: parts[1],
  };
}

/**
 * Conservative one-variable linear expression parser.
 * Does not evaluate arbitrary JavaScript or general algebra.
 */
function parseLinearExpression(expression) {
  const text = safeString(expression)
    .replace(/\s+/g, "")
    .replace(/\*/g, "");

  if (!text) return null;

  const variables = unique(
    (text.match(/[a-zA-Z]/g) || []).map((v) => v.toLowerCase())
  );

  if (variables.length > 1) return null;

  const variable = variables[0] || null;

  if (!variable) {
    const constant = Number(text);

    return Number.isFinite(constant)
      ? { coefficient: 0, constant, variable: null }
      : null;
  }

  const escaped = variable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // x, -x, +x, 2x, -2.5x, 2x+5, x-3
  const termFirst = new RegExp(
    `^([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)?)${escaped}(?:([+-](?:\\d+(?:\\.\\d*)?|\\.\\d+)))?$`,
    "i"
  );

  const match = text.match(termFirst);

  if (match) {
    let coefficient;

    if (match[1] === "" || match[1] === "+") {
      coefficient = 1;
    } else if (match[1] === "-") {
      coefficient = -1;
    } else {
      coefficient = Number(match[1]);
    }

    const constant = match[2] === undefined ? 0 : Number(match[2]);

    if (!Number.isFinite(coefficient) || !Number.isFinite(constant)) {
      return null;
    }

    return { coefficient, constant, variable };
  }

  // 5+2x, 5-x
  const constantFirst = new RegExp(
    `^([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+))([+-](?:\\d+(?:\\.\\d*)?|\\.\\d+))?${escaped}$`,
    "i"
  );

  const reverseMatch = text.match(constantFirst);

  if (reverseMatch) {
    const constant = Number(reverseMatch[1]);
    const coefficient = reverseMatch[2] === undefined
      ? 1
      : Number(reverseMatch[2]);

    if (!Number.isFinite(coefficient) || !Number.isFinite(constant)) {
      return null;
    }

    return { coefficient, constant, variable };
  }

  return null;
}

function solveLinearEquation(equation) {
  if (!equation) return null;

  const left = parseLinearExpression(equation.left);
  const right = parseLinearExpression(equation.right);

  if (!left || !right) return null;

  if (
    left.variable &&
    right.variable &&
    left.variable !== right.variable
  ) {
    return null;
  }

  const coefficient = left.coefficient - right.coefficient;
  const constant = right.constant - left.constant;

  if (coefficient === 0) return null;

  const result = constant / coefficient;

  return Number.isFinite(result) ? result : null;
}

function evaluateEquationEquivalence(userAnswer, correctAnswer) {
  const userEquation = normalizeEquation(userAnswer);
  const correctEquation = normalizeEquation(correctAnswer);

  if (!userEquation || !correctEquation) return null;

  const userSolution = solveLinearEquation(userEquation);
  const correctSolution = solveLinearEquation(correctEquation);

  if (userSolution === null || correctSolution === null) {
    return null;
  }

  const correct = approximatelyEqual(userSolution, correctSolution);

  return {
    correct,
    method: correct
      ? "linear_equation_equivalence"
      : "linear_equation_mismatch",
    confidence: 0.97,
    evidence: {
      studentSolution: userSolution,
      expectedSolution: correctSolution,
    },
  };
}

// ============================================================================
// EXACT AND PHRASE MATCHING
// ============================================================================

function exactMatch(userAnswer, correctAnswer) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  return Boolean(user && correct && user === correct);
}

function phraseMatch(userAnswer, correctAnswer) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  if (
    !user ||
    !correct ||
    correct.length < CONFIG.minimumPhraseLength
  ) {
    return false;
  }

  // Do not allow an answer containing the expected phrase to bypass
  // negation checks.
  if (detectNegationMismatch(user, correct)) return false;

  if (user.includes(correct)) return true;

  return correct.includes(user) &&
    user.length >= correct.length * 0.85;
}

// ============================================================================
// LIGHTWEIGHT MORPHOLOGY
// ============================================================================

function stemToken(word) {
  if (!word || typeof word !== "string" || word.length <= 3) {
    return word;
  }

  const w = word.toLowerCase();

  const domainMappings = [
    [/absorption$/, "absorb"],
    [/production$/, "produce"],
    [/respiration$/, "respire"],
    [/conduction$/, "conduct"],
    [/photosynthesizing$/, "photosynthes"],
    [/photosynthesis$/, "photosynthes"],
    [/interconnection$/, "connect"],
    [/interconnected$/, "connect"],
    [/multiplication$/, "multiply"],
    [/subtraction$/, "subtract"],
    [/magnification$/, "magnify"],
    [/enlargement$/, "enlarge"],
  ];

  for (const [pattern, replacement] of domainMappings) {
    if (pattern.test(w)) return w.replace(pattern, replacement);
  }

  if (w.endsWith("sses")) return w.slice(0, -2);
  if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
  if (w.endsWith("ational")) return w.slice(0, -7) + "ate";
  if (w.endsWith("ization") || w.endsWith("isation")) {
    return w.slice(0, -7) + "ize";
  }
  if (w.endsWith("tion") || w.endsWith("sion")) return w.slice(0, -4);
  if (w.endsWith("ment") && w.length > 6) return w.slice(0, -4);

  if (w.endsWith("ing") && w.length > 5) {
    const base = w.slice(0, -3);

    if (
      base.length > 3 &&
      base[base.length - 1] === base[base.length - 2]
    ) {
      return base.slice(0, -1);
    }

    return base;
  }

  if (w.endsWith("ed") && w.length > 4) {
    const base = w.slice(0, -2);

    if (
      base.length > 3 &&
      base[base.length - 1] === base[base.length - 2]
    ) {
      return base.slice(0, -1);
    }

    return base;
  }

  if (w.endsWith("ivity") && w.length > 6) return w.slice(0, -5);
  if (w.endsWith("ive") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("able") && w.length > 5) return w.slice(0, -4);
  if (w.endsWith("es") && w.length > 4) return w.slice(0, -2);

  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) {
    return w.slice(0, -1);
  }

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
  const matrix = Array.from(
    { length: lenA + 1 },
    () => Array(lenB + 1).fill(0)
  );

  for (let i = 0; i <= lenA; i++) matrix[i][0] = i;
  for (let j = 0; j <= lenB; j++) matrix[0][j] = j;

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );

      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        matrix[i][j] = Math.min(
          matrix[i][j],
          matrix[i - 2][j - 2] + 1
        );
      }
    }
  }

  return matrix[lenA][lenB];
}

function isTypoMatch(wordA, wordB) {
  if (!wordA || !wordB) return false;
  if (wordA === wordB) return true;

  const length = Math.max(wordA.length, wordB.length);

  if (length < CONFIG.typoMinTokenLength) return false;

  const distance = damerauLevenshtein(wordA, wordB);

  return length <= 7 ? distance <= 1 : distance <= 2;
}

// ============================================================================
// CONSERVATIVE CONCEPT CLUSTERS
// ============================================================================

const CONCEPT_CLUSTERS = {
  instrument: ["instrument", "device", "apparatus", "equipment", "tool", "machine"],
  magnify: ["magnify", "magnification", "enlarge", "enlargement", "amplify", "zoom"],
  small: ["small", "tiny", "minute", "micro", "microscopic", "little"],
  observe: ["observe", "see", "view", "look", "examine", "inspect"],
  specimen: ["specimen", "sample", "slide", "material", "tissue", "organism"],
  transfer: ["transfer", "move", "conduct", "transmit", "carry", "convey"],
  current: ["current", "electricity", "flow", "charge", "ampere", "electrons"],
  bond: ["bond", "link", "join", "connect", "attract"],
  ionic: ["ionic", "ion", "cation", "anion", "charged", "electrostatic"],
  covalent: ["covalent", "share", "sharing", "shared", "paired", "pair"],
  profit: ["profit", "gain", "surplus", "earning", "earnings"],
  loss: ["loss", "deficit", "shortfall"],
  divide: ["divide", "division", "quotient", "split"],
  multiply: ["multiply", "multiplication", "product", "times"],
  subtract: ["subtract", "subtraction", "minus", "deduct"],
  add: ["add", "addition", "sum", "total", "plus", "combine"],
  formula: ["formula", "equation", "expression", "rule", "law"],
  calculate: ["calculate", "calculation", "compute", "solve", "determine"],
  increase: ["increase", "increases", "increased", "rise", "higher", "greater"],
  decrease: ["decrease", "decreases", "decreased", "fall", "lower", "drop"],
  conductor: ["conductor", "conductive", "conducts", "conduction"],
  insulator: ["insulator", "insulating", "insulates", "insulation", "nonconductor"],
  produce: ["produce", "production", "producing", "manufacture", "synthesize", "generate"],
  food: ["food", "glucose", "nutrient", "nutrients", "sugar", "starch"],
  sunlight: ["sunlight", "light", "solar", "sunshine"],
  absorb: ["absorb", "absorption", "absorbing", "uptake"],
  store: ["store", "storage", "stored", "contain", "reserve", "retain"],
  network: ["network", "interconnect", "interconnected"],
  communicate: ["communicate", "communication", "exchange"],
  share: ["share", "sharing", "shared", "pool"],
  trade: ["trade", "trading", "commerce", "buying", "selling", "barter"],
};

const WORD_TO_CLUSTER = Object.create(null);

for (const [clusterKey, words] of Object.entries(CONCEPT_CLUSTERS)) {
  for (const word of words) {
    WORD_TO_CLUSTER[word] = clusterKey;
    WORD_TO_CLUSTER[stemToken(word)] = clusterKey;
  }
}

function getConceptKey(token) {
  const raw = token.toLowerCase();

  if (WORD_TO_CLUSTER[raw]) return WORD_TO_CLUSTER[raw];

  const stem = stemToken(raw);

  return WORD_TO_CLUSTER[stem] || stem;
}

// ============================================================================
// NEGATION PROTECTION
// ============================================================================

const NEGATION_WORDS = new Set([
  "not", "no", "never", "cannot", "cant", "can't",
  "wont", "won't", "doesnt", "doesn't", "dont", "don't",
  "isnt", "isn't", "arent", "aren't", "without",
  "hardly", "neither", "nor",
]);

function hasNegation(value) {
  const text = normalize(value);

  const tokens = new Set(tokenize(text));

  if ([...NEGATION_WORDS].some((word) => tokens.has(word))) {
    return true;
  }

  // Also catch common contracted forms after punctuation normalization.
  return /\b(?:is not|are not|was not|were not|do not|does not|did not|will not|cannot)\b/.test(text);
}

function detectNegationMismatch(userText, correctText) {
  return hasNegation(userText) !== hasNegation(correctText);
}

// ============================================================================
// MEANINGFUL TOKENS AND CONCEPT EVIDENCE
// ============================================================================

const STOP_WORDS = new Set([
  "the", "and", "that", "this", "with", "from", "into", "when",
  "where", "which", "what", "why", "how", "are", "was", "were",
  "has", "have", "had", "for", "then", "than", "their", "there",
  "they", "them", "its", "is", "of", "to", "in", "on", "by",
  "a", "an", "as", "or", "be", "it", "at", "can", "could",
  "would", "should", "will", "may", "might", "because",
]);

function meaningfulTokens(value) {
  return unique(
    tokenize(value).filter((token) =>
      token.length >= 3 &&
      !STOP_WORDS.has(token) &&
      !NEGATION_WORDS.has(token) &&
      Number.isNaN(Number(token))
    )
  );
}

function keywordEvidence(userAnswer, correctAnswer) {
  const userTokens = new Set(meaningfulTokens(userAnswer));
  const expectedTokens = meaningfulTokens(correctAnswer);

  if (expectedTokens.length < CONFIG.minimumMeaningfulTokens) {
    return null;
  }

  const matchedTokens = expectedTokens.filter((token) =>
    userTokens.has(token)
  );

  return {
    ratio: matchedTokens.length / expectedTokens.length,
    matched: matchedTokens.length,
    total: expectedTokens.length,
    matchedTokens,
    missingTokens: expectedTokens.filter((token) =>
      !userTokens.has(token)
    ),
  };
}

function evaluateConceptCoverage(userAnswer, correctAnswer) {
  const userTokens = meaningfulTokens(userAnswer);
  const expectedTokens = meaningfulTokens(correctAnswer);

  if (expectedTokens.length === 0) return null;

  if (detectNegationMismatch(userAnswer, correctAnswer)) {
    return {
      negationMismatch: true,
      ratio: 0,
      matched: 0,
      total: expectedTokens.length,
      matchedTokens: [],
      missingTokens: expectedTokens,
    };
  }

  const userConceptKeys = new Set(userTokens.map(getConceptKey));
  const matchedTokens = [];
  const missingTokens = [];

  for (const expectedToken of expectedTokens) {
    const expectedKey = getConceptKey(expectedToken);

    let matched = userConceptKeys.has(expectedKey);

    if (!matched) {
      matched = userTokens.some((userToken) =>
        isTypoMatch(userToken, expectedToken)
      );
    }

    if (matched) matchedTokens.push(expectedToken);
    else missingTokens.push(expectedToken);
  }

  return {
    negationMismatch: false,
    ratio: matchedTokens.length / expectedTokens.length,
    matched: matchedTokens.length,
    total: expectedTokens.length,
    matchedTokens,
    missingTokens,
  };
}

// ============================================================================
// SINGLE ANSWER EVALUATION
// ============================================================================

function checkSingleVariant(userAnswer, correctAnswer) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

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

  if (!correct) {
    return {
      correct: false,
      grade: "ungradable",
      method: "missing_expected_answer",
      confidence: 0,
      acceptedAlternative: false,
      shouldRecordMistake: false,
    };
  }

  // Exact answer.
  if (exactMatch(user, correct)) {
    return {
      correct: true,
      grade: "correct",
      method: "exact",
      confidence: 1,
      acceptedAlternative: false,
      shouldRecordMistake: false,
    };
  }

  // Check explicit negation before more permissive matching.
  if (detectNegationMismatch(userAnswer, correctAnswer)) {
    return {
      correct: false,
      grade: "incorrect",
      method: "negation_mismatch",
      confidence: 0.98,
      acceptedAlternative: false,
      shouldRecordMistake: true,
      matchedConcepts: [],
      missingConcepts: meaningfulTokens(correctAnswer),
    };
  }

  // Numeric with units.
  const unitResult = evaluateUnitAwareAnswer(userAnswer, correctAnswer);

  if (unitResult) {
    return {
      ...unitResult,
      grade: unitResult.correct ? "correct" : "incorrect",
      acceptedAlternative: false,
      shouldRecordMistake: !unitResult.correct,
    };
  }

  // Numeric, fraction, percentage, or final numeric answer.
  const numericResult = evaluateNumericEquivalence(userAnswer, correctAnswer);

  if (numericResult) {
    return {
      ...numericResult,
      grade: numericResult.correct ? "correct" : "incorrect",
      acceptedAlternative: false,
      shouldRecordMistake: !numericResult.correct,
    };
  }

  // Simple linear equation equivalence.
  const equationResult = evaluateEquationEquivalence(
    userAnswer,
    correctAnswer
  );

  if (equationResult) {
    return {
      ...equationResult,
      grade: equationResult.correct ? "correct" : "incorrect",
      acceptedAlternative: false,
      shouldRecordMistake: !equationResult.correct,
    };
  }

  // Long exact phrase.
  if (phraseMatch(userAnswer, correctAnswer)) {
    return {
      correct: true,
      grade: "correct",
      method: "phrase",
      confidence: 0.95,
      acceptedAlternative: true,
      shouldRecordMistake: false,
    };
  }

  // Free-text concept evidence.
  const conceptEvidence = evaluateConceptCoverage(
    userAnswer,
    correctAnswer
  );

  if (conceptEvidence && !conceptEvidence.negationMismatch) {
    const hasEnoughTokens =
      conceptEvidence.total >= CONFIG.minimumMeaningfulTokens;

    // A single meaningful expected word can only be accepted when the
    // complete concept matches, not merely because one word is similar.
    const fullMatch = conceptEvidence.total === 1
      ? conceptEvidence.ratio === 1
      : hasEnoughTokens &&
        conceptEvidence.ratio >= CONFIG.keywordCorrectThreshold;

    if (fullMatch) {
      return {
        correct: true,
        grade: "correct",
        method: "concept_match",
        confidence: 0.78,
        acceptedAlternative: true,
        shouldRecordMistake: false,
        matchedConcepts: conceptEvidence.matchedTokens,
        missingConcepts: conceptEvidence.missingTokens,
        evidence: conceptEvidence,
      };
    }

    if (conceptEvidence.ratio >= CONFIG.keywordPartialThreshold) {
      return {
        correct: false,
        partialCredit: true,
        grade: "partial",
        method: "concept_partial",
        confidence: 0.65,
        acceptedAlternative: false,
        shouldRecordMistake: false,
        requiresReview: true,
        matchedConcepts: conceptEvidence.matchedTokens,
        missingConcepts: conceptEvidence.missingTokens,
        evidence: conceptEvidence,
      };
    }
  }

  return {
    correct: false,
    partialCredit: false,
    grade: "incorrect",
    method: conceptEvidence?.negationMismatch
      ? "negation_mismatch"
      : "no_sufficient_match",
    confidence: 0.85,
    shouldRecordMistake: true,
    matchedConcepts: conceptEvidence?.matchedTokens || [],
    missingConcepts:
      conceptEvidence?.missingTokens ||
      meaningfulTokens(correctAnswer),
    evidence: conceptEvidence,
  };
}

// ============================================================================
// MULTI-PART ANSWERS
// ============================================================================

function splitStudentParts(userAnswer) {
  return safeString(userAnswer)
    .split(/\n|;|•|\s+\band\b\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

function checkMultiPartAnswer(userAnswer, answerList) {
  if (!Array.isArray(answerList) || answerList.length === 0) {
    return {
      correct: false,
      grade: "ungradable",
      matchedCount: 0,
      totalRequired: 0,
      percent: 0,
      results: [],
    };
  }

  const studentParts = splitStudentParts(userAnswer);
  const usedParts = new Set();

  const results = answerList.map((answer) => {
    let best = null;

    // Each student part can satisfy at most one required item.
    for (let i = 0; i < studentParts.length; i++) {
      if (usedParts.has(i)) continue;

      const result = checkSingleVariant(studentParts[i], answer);

      if (
        !best ||
        result.correct ||
        result.confidence > best.result.confidence
      ) {
        best = {
          index: i,
          studentPart: studentParts[i],
          result,
        };
      }

      if (result.correct) break;
    }

    // Also evaluate the entire response for sentence-style answers.
    // It may count for an item only when no separated part matches it.
    if (!best || !best.result.correct) {
      const wholeResult = checkSingleVariant(userAnswer, answer);

      if (
        wholeResult.correct ||
        (!best || wholeResult.confidence > best.result.confidence)
      ) {
        best = {
          index: null,
          studentPart: userAnswer,
          result: wholeResult,
        };
      }
    }

    if (best?.result?.correct && best.index !== null) {
      usedParts.add(best.index);
    }

    return {
      answer,
      studentAnswer: best?.studentPart || "",
      result: best?.result || {
        correct: false,
        grade: "incorrect",
        method: "no_match",
        confidence: 0,
      },
    };
  });

  const matchedCount = results.filter(
    (item) => item.result.correct
  ).length;

  const totalRequired = answerList.length;
  const percent = Math.round((matchedCount / totalRequired) * 100);

  return {
    correct: matchedCount === totalRequired,
    grade: matchedCount === 0
      ? "incorrect"
      : matchedCount === totalRequired
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

function detectMultiPartQuestion(question) {
  if (
    question?.multi_part === true ||
    question?.multiPart === true ||
    question?.answerMode === "MULTI_PART"
  ) {
    return true;
  }

  if (Array.isArray(question?.ans)) return true;

  const stem = safeString(question?.q || question?.stem || "");

  return (
    /\b(list|name|state|give|identify)\b.{0,60}\b(two|three|four|2|3|4)\b/i.test(stem) ||
    /\b(two|three|four|2|3|4)\s+(factors|reasons|advantages|disadvantages|examples|steps|types|ways|causes|effects)\b/i.test(stem)
  );
}

// ============================================================================
// REASONING EVIDENCE
// ============================================================================

/**
 * This function measures textual alignment with reference steps.
 *
 * It does NOT prove that the student's mathematical operations are valid.
 * The result is therefore evidence of alignment, not a verified reasoning
 * score. isWorkCorrect remains null unless a separate trusted validator exists.
 */
function analyseReasoning(userWork, question, verifiedSteps) {
  const work = safeString(userWork).trim();

  if (!work) {
    return {
      provided: false,
      status: "not_provided",
      confidence: 1,
      score: null,
      evidence: [],
      missingEvidence: [],
      contradictions: [],
      validity: "not_evaluated",
    };
  }

  const steps = Array.isArray(verifiedSteps)
    ? verifiedSteps
    : Array.isArray(question?.steps)
    ? question.steps
    : [];

  if (steps.length === 0) {
    return {
      provided: true,
      status: "not_verifiable",
      confidence: 0.2,
      score: null,
      evidence: [],
      missingEvidence: [],
      contradictions: [],
      validity: "not_evaluated",
      note: "No reference steps are available for comparison.",
    };
  }

  const workTokens = new Set(meaningfulTokens(work));
  const expectedTokens = meaningfulTokens(steps.join(" "));

  if (expectedTokens.length === 0) {
    return {
      provided: true,
      status: "not_verifiable",
      confidence: 0.2,
      score: null,
      evidence: [],
      missingEvidence: [],
      contradictions: [],
      validity: "not_evaluated",
    };
  }

  const matched = expectedTokens.filter((token) =>
    workTokens.has(token) ||
    [...workTokens].some((studentToken) =>
      getConceptKey(studentToken) === getConceptKey(token)
    )
  );

  const ratio = matched.length / expectedTokens.length;

  let status;

  if (ratio >= 0.65) status = "supported_evidence";
  else if (ratio >= 0.35) status = "partial_evidence";
  else status = "limited_evidence";

  return {
    provided: true,
    status,
    confidence: Math.min(0.75, 0.35 + ratio * 0.5),
    score: Math.round(ratio * 100),
    evidence: matched,
    missingEvidence: expectedTokens.filter(
      (token) => !matched.includes(token)
    ),
    contradictions: [],
    validity: "not_evaluated",
    note:
      "Textual alignment with reference steps is not proof that the student's reasoning is mathematically or logically valid.",
  };
}

// ============================================================================
// QUESTION VERIFICATION
// ============================================================================

function verifyQuestion(questionText, rawAnswer, question) {
  const fallbackSolution =
    question?.sol ||
    question?.solution ||
    question?.why ||
    question?.explain ||
    question?.reason ||
    question?.mark ||
    "Review the answer.";

  const fallbackSteps = Array.isArray(question?.steps)
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
    const verification = verifyQuestionAcrossSubjects(
      questionText,
      rawAnswer,
      question
    );

    let verifiedAnswer = rawAnswer;
    let solution = fallbackSolution;
    let steps = fallbackSteps;

    const isCurriculum =
      question?.source === "CURRICULUM" ||
      (!question?.source && !question?.mutation);

    // Never silently replace an authoritative curriculum answer.
    if (
      !isCurriculum &&
      verification?.wasOverridden === true &&
      verification?.verifiedAnswer !== undefined
    ) {
      verifiedAnswer = verification.verifiedAnswer;
    }

    if (
      verification?.explanation &&
      !question?.sol &&
      !question?.why &&
      !question?.explain &&
      !question?.reason
    ) {
      solution = verification.explanation;
    }

    if (
      (!steps || steps.length === 0) &&
      Array.isArray(verification?.verifiedSteps) &&
      verification.verifiedSteps.length > 0
    ) {
      steps = verification.verifiedSteps;
    }

    return {
      rawAnswer,
      verifiedAnswer,
      solution,
      steps,
      verification: {
        attempted: true,
        status: verification?.wasOverridden
          ? "override_proposed"
          : "verified_or_unchanged",
        subject: verification?.subject || question?.subject || null,
        confidence: verification?.confidence ?? null,
        explanation: verification?.explanation || null,
        wasOverridden: Boolean(verification?.wasOverridden),
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
        error: error?.message || String(error),
      },
    };
  }
}

// ============================================================================
// OVERALL GRADE CLASSIFICATION
// ============================================================================

function classifyOverallGrade({
  isAnswerCorrect,
  answerEvaluation,
  reasoning,
}) {
  if (answerEvaluation?.grade === "blank") return "blank";
  if (answerEvaluation?.grade === "ungradable") return "ungradable";

  if (
    answerEvaluation?.grade === "partial" ||
    answerEvaluation?.partialCredit === true
  ) {
    return "partial";
  }

  // Reasoning evidence never overrides final-answer correctness.
  return isAnswerCorrect ? "correct" : "incorrect";
}

// ============================================================================
// SAFE DIAGNOSTIC FALLBACK
// ============================================================================

function safeDiagnosticAnalysis(
  userAnswer,
  rawAnswer,
  question,
  userWork,
  isAnswerCorrect
) {
  try {
    const analysis = analyseStudentAnswer(
      userAnswer,
      Array.isArray(rawAnswer)
        ? rawAnswer.join(" • ")
        : String(rawAnswer ?? ""),
      question,
      userWork,
      { isAnswerCorrect }
    );

    const teacherDiagnosis = diagnoseStudentSubmission({
      studentAnswer: userAnswer,
      userWork,
      question,
      expectedSolution: {
        ans: rawAnswer,
        steps: question?.steps,
        why: question?.why,
      },
      isAnswerCorrect,
    });

    return {
      ...analysis,
      teacherDiagnosis: teacherDiagnosis ?? null,
    };
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
      teacherDiagnosis: null,
      misconceptions: [],
      concepts: {
        missing: [],
      },
      contradictions: [],
      diagnosticConfidence: 0,
      error: error?.message || String(error),
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
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env?.DEV
  ) {
    console.log("[TIXAR GRADER v4] evaluateAnswer:", {
      userAnswer,
      questionText: question?.q || question?.stem,
      storedAnswer: question?.ans,
    });
  }

  // --------------------------------------------------------------------------
  // QUESTION UNAVAILABLE
  // --------------------------------------------------------------------------

  if (!question) {
    return {
      isCorrect: false,
      isAnswerCorrect: false,
      isWorkCorrect: null,
      workingNote: null,

      grade: "ungradable",
      status: "ungradable",

      correctAnswer: "",
      correctAnswerList: [],
      solution: "Question details unavailable.",
      steps: [],
      mark: "Ungradable",

      analysis: {
        type: "diagnostic_analysis",
        diagnosis: {
          type: "question_unavailable",
          severity: "high",
        },
        teacherDiagnosis: null,
        diagnosticConfidence: 0,
      },

      teacherDiagnosis: null,

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
        validity: "not_evaluated",
      },

      questionVerification: {
        attempted: false,
        status: "not_attempted",
      },

      partialCredit: false,
      acceptedAlternative: false,
      shouldRecordMistake: false,
      missingConcepts: [],
      matchedConcepts: [],

      understanding: {
        score: null,
        level: "unknown",
      },

      diagnosis: {
        type: "question_unavailable",
        severity: "high",
      },

      misconceptions: [],
      conceptEvidence: { missing: [] },
      diagnosticConfidence: 0,

      evidence: {
        answerCorrect: false,
        answerGrade: "ungradable",
        reasoningSupported: false,
        reasoningStatus: "not_verifiable",
      },

      provenance: {
        originalAnswer: "",
        verifiedAnswer: "",
        answerWasVerified: false,
        answerWasOverridden: false,
        answerSource: "UNKNOWN",
        mutation: null,
      },

      knowledgeModel: {
        answerCorrect: false,
        reasoningEvidence: "not_verifiable",
        diagnosisAvailable: false,
        safeToInferMastery: false,
        requiresAdditionalEvidence: true,
      },

      metadata: {
        graderVersion: GRADER_VERSION,
        architecture:
          "verification + equivalence + answer_evidence + reasoning_evidence + diagnosis",
        readyForKnowledgeModel: false,
      },
    };
  }

  // --------------------------------------------------------------------------
  // EXTRACT STORED ANSWER
  // --------------------------------------------------------------------------

  let rawAnswer =
    question.ans ??
    question.answer ??
    question.a ??
    question.Answer ??
    question.correctAnswer ??
    "";

  if (
    typeof rawAnswer === "string" &&
    rawAnswer.trim().toLowerCase() === "undefined"
  ) {
    rawAnswer = "";
  }

  const questionText = question.q || question.stem || "";

  // --------------------------------------------------------------------------
  // VERIFY QUESTION
  // --------------------------------------------------------------------------

  const verified = verifyQuestion(
    questionText,
    rawAnswer,
    question
  );

  rawAnswer = verified.verifiedAnswer;

  const solution = verified.solution;
  const verifiedSteps = verified.steps;

  // --------------------------------------------------------------------------
  // ENRICH QUESTION
  // --------------------------------------------------------------------------

  const enrichedQuestion = {
    ...question,
    ans: rawAnswer,
    ...(verifiedSteps ? { steps: verifiedSteps } : {}),
  };

  // --------------------------------------------------------------------------
  // ANSWER MODE
  // --------------------------------------------------------------------------

  const isMultiPart = detectMultiPartQuestion(question);

  let isAnswerCorrect = false;
  let answerEvaluation;
  let partialInfo = null;

  if (Array.isArray(rawAnswer) && isMultiPart) {
    const multipart = checkMultiPartAnswer(userAnswer, rawAnswer);

    isAnswerCorrect = multipart.correct;
    answerEvaluation = multipart;

    if (multipart.grade === "partial") {
      partialInfo = {
        matchedCount: multipart.matchedCount,
        totalRequired: multipart.totalRequired,
        percent: multipart.percent,
      };
    }
  } else if (Array.isArray(rawAnswer)) {
    // Array represents alternative accepted answers.
    const results = rawAnswer.map((variant) =>
      checkSingleVariant(userAnswer, variant)
    );

    const successful = results.find((result) => result.correct);

    isAnswerCorrect = Boolean(successful);

    answerEvaluation = {
      correct: isAnswerCorrect,
      grade: isAnswerCorrect
        ? "correct"
        : isBlank(userAnswer)
        ? "blank"
        : "incorrect",
      method: successful?.method || "none",
      confidence: successful?.confidence ?? 0,
      acceptedAlternative: Boolean(successful),
      shouldRecordMistake: !isAnswerCorrect && !isBlank(userAnswer),
      variants: results,
    };
  } else {
    answerEvaluation = checkSingleVariant(userAnswer, rawAnswer);
    isAnswerCorrect = Boolean(answerEvaluation.correct);
  }

  // --------------------------------------------------------------------------
  // REASONING EVIDENCE
  // --------------------------------------------------------------------------

  const reasoning = analyseReasoning(
    userWork,
    question,
    verifiedSteps
  );

  // Textual overlap cannot prove mathematical validity.
  // A separate validated step checker is required before this can be true.
  const isWorkCorrect = null;

  // --------------------------------------------------------------------------
  // DIAGNOSTIC ANALYSIS
  // --------------------------------------------------------------------------

  const analysis = safeDiagnosticAnalysis(
    userAnswer,
    rawAnswer,
    enrichedQuestion,
    userWork,
    isAnswerCorrect
  );

  // --------------------------------------------------------------------------
  // OVERALL GRADE
  // --------------------------------------------------------------------------

  const grade = classifyOverallGrade({
    isAnswerCorrect,
    answerEvaluation,
    reasoning,
  });

  // --------------------------------------------------------------------------
  // STATUS
  // --------------------------------------------------------------------------

  let status;

  if (grade === "blank") {
    status = "blank_answer";
  } else if (grade === "ungradable") {
    status = "ungradable";
  } else if (partialInfo || grade === "partial") {
    status = "partially_correct";
  } else if (
    isAnswerCorrect &&
    reasoning.status === "supported_evidence"
  ) {
    status = "correct_answer_with_reasoning_evidence";
  } else if (isAnswerCorrect) {
    status = "correct_answer_reasoning_unverified";
  } else if (
    reasoning.provided &&
    reasoning.status === "supported_evidence"
  ) {
    status = "incorrect_final_answer_with_reasoning_evidence";
  } else {
    status = "incorrect";
  }

  // --------------------------------------------------------------------------
  // WORKING NOTE
  // --------------------------------------------------------------------------

  let workingNote = null;

  if (status === "correct_answer_reasoning_unverified") {
    workingNote =
      "Your final answer is correct. The working has not been independently verified, so we cannot yet confirm that every step is valid.";
  } else if (
    status === "incorrect_final_answer_with_reasoning_evidence"
  ) {
    workingNote =
      "Your final answer is incorrect. Some of your working resembles the expected method, but the individual steps still need to be checked.";
  }

  if (partialInfo) {
    workingNote =
      `Partially correct: ${partialInfo.matchedCount}/${partialInfo.totalRequired} required items identified (${partialInfo.percent}%).`;
  } else if (grade === "partial") {
    const missing = answerEvaluation?.missingConcepts;

    workingNote = missing?.length
      ? `Some relevant concepts are present. Review these missing concepts: ${missing.join(", ")}.`
      : "Your answer contains some relevant evidence but does not yet satisfy the full answer requirements.";
  }

  // --------------------------------------------------------------------------
  // ANSWER FORMAT
  // --------------------------------------------------------------------------

  const cleanAnswerValue = (value) =>
    value !== undefined &&
    value !== null &&
    String(value).trim().toLowerCase() !== "undefined";

  const mainCorrectAnswerStr = Array.isArray(rawAnswer)
    ? rawAnswer.filter(cleanAnswerValue).map(String).join(" • ")
    : cleanAnswerValue(rawAnswer)
    ? String(rawAnswer)
    : "";

  const correctAnswerList = Array.isArray(rawAnswer)
    ? rawAnswer.filter(cleanAnswerValue)
    : mainCorrectAnswerStr
    ? [mainCorrectAnswerStr]
    : [];

  // --------------------------------------------------------------------------
  // EVIDENCE SUMMARY
  // --------------------------------------------------------------------------

  const evidence = {
    answerCorrect: isAnswerCorrect,
    answerGrade: grade,
    answerMethod: answerEvaluation?.method || null,
    answerConfidence: answerEvaluation?.confidence ?? 0,

    // This means textual alignment only.
    reasoningSupported: reasoning.status === "supported_evidence",
    reasoningStatus: reasoning.status,
    reasoningConfidence: reasoning.confidence,
    reasoningValidity: "not_evaluated",

    understandingScore: analysis?.understanding?.score ?? null,
    understandingLevel: analysis?.understanding?.level ?? "unknown",

    diagnosis: analysis?.diagnosis?.type ?? "unknown",

    misconceptionCount: Array.isArray(analysis?.misconceptions)
      ? analysis.misconceptions.length
      : 0,

    missingConceptCount: Array.isArray(analysis?.concepts?.missing)
      ? analysis.concepts.missing.length
      : 0,

    contradictionCount: Array.isArray(analysis?.contradictions)
      ? analysis.contradictions.length
      : 0,
  };

  // --------------------------------------------------------------------------
  // MASTERY SAFETY
  // --------------------------------------------------------------------------

  /**
   * A single correct answer must never be enough to claim mastery.
   *
   * Even when a question is marked as a retest or transfer question,
   * this grader alone does not establish repeated, valid reasoning.
   * A separate knowledge model must aggregate independent evidence.
   */
  const hasRepeatedEvidence =
    question?.repeatedSuccess === true &&
    question?.masteryEvidenceVerified === true;

  const safeToInferMastery =
    Boolean(
      hasRepeatedEvidence &&
      isAnswerCorrect &&
      grade === "correct"
    );

  // --------------------------------------------------------------------------
  // RETURN
  // --------------------------------------------------------------------------

  return {
    // ========================================================================
    // BACKWARD COMPATIBILITY
    // ========================================================================

    isCorrect: isAnswerCorrect,
    isAnswerCorrect,
    isWorkCorrect,

    workingNote,

    correctAnswer: mainCorrectAnswerStr,
    correctAnswerList,

    solution,
    steps: verifiedSteps || [],

    mark: isAnswerCorrect
      ? "Correct"
      : grade === "partial"
      ? "Almost There"
      : grade === "ungradable"
      ? "Needs Review"
      : "Incorrect",

    analysis,

    // Teacher-facing diagnosis for the student feedback screen.
    teacherDiagnosis: analysis?.teacherDiagnosis ?? null,

    // ========================================================================
    // GRADING FIELDS
    // ========================================================================

    grade,
    status,

    partialCredit:
      grade === "partial" ||
      Boolean(answerEvaluation?.partialCredit),

    acceptedAlternative:
      Boolean(answerEvaluation?.acceptedAlternative),

    shouldRecordMistake:
      answerEvaluation?.shouldRecordMistake ??
      (
        grade !== "partial" &&
        grade !== "blank" &&
        grade !== "ungradable" &&
        !isAnswerCorrect
      ),

    missingConcepts:
      answerEvaluation?.missingConcepts || [],

    matchedConcepts:
      answerEvaluation?.matchedConcepts || [],

    answerEvaluation,

    workingEvaluation: reasoning,

    questionVerification: verified.verification,

    understanding: analysis?.understanding ?? {
      score: null,
      level: "unknown",
    },

    diagnosis: analysis?.diagnosis ?? {
      type: "unknown",
      severity: "unknown",
    },

    misconceptions: analysis?.misconceptions ?? [],

    conceptEvidence: analysis?.concepts ?? {
      missing: [],
    },

    diagnosticConfidence: analysis?.diagnosticConfidence ?? 0,

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

      verifiedAnswer: rawAnswer,

      answerWasVerified: Boolean(
        verified.verification?.attempted
      ),

      answerWasOverridden: Boolean(
        verified.verification?.wasOverridden
      ),

      answerSource: question.source || "UNKNOWN",

      mutation: question.mutation || null,
    },

    // ========================================================================
    // KNOWLEDGE MODEL SAFETY
    // ========================================================================

    knowledgeModel: {
      answerCorrect: isAnswerCorrect,

      reasoningEvidence: reasoning.status,

      reasoningValidity: "not_evaluated",

      diagnosisAvailable: Boolean(analysis?.diagnosis),

      safeToInferMastery,

      requiresAdditionalEvidence: Boolean(
        !isAnswerCorrect ||
        grade === "blank" ||
        grade === "partial" ||
        grade === "ungradable" ||
        reasoning.status === "limited_evidence" ||
        !safeToInferMastery
      ),
    },

    // ========================================================================
    // METADATA
    // ========================================================================

    metadata: {
      graderVersion: GRADER_VERSION,

      architecture:
        "verification + equivalence + answer_evidence + reasoning_evidence + diagnosis",

      readyForKnowledgeModel: true,
    },
  };
}

// ============================================================================
// EXPORTED HELPERS
// ============================================================================

export {
  normalize,
  tokenize,
  extractNumbers,
  parseFraction,
  parsePercentage,
  parseSimpleNumeric,
  parseStrictNumericValue,
  evaluateNumericEquivalence,
  evaluateEquationEquivalence,
  keywordEvidence,
  checkSingleVariant,
  analyseReasoning,
};
