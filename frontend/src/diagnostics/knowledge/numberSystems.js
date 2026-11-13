/**
 * Number systems and mathematical domain definitions.
 */

import { Fraction } from "../parsing/fractionParser.js";

export const CurriculumConventions = {
  NATURAL_NUMBERS_INCLUDE_ZERO: false, // Default standard: N = {1, 2, 3, ...}
};

export function classifyNumberValue(valStr, curriculum = {}) {
  const includeZeroInN =
    curriculum.naturalNumbersIncludeZero ?? CurriculumConventions.NATURAL_NUMBERS_INCLUDE_ZERO;

  const frac = Fraction.tryParse(valStr);
  if (!frac) {
    return { isNumber: false, types: [] };
  }

  const numVal = frac.toNumber();
  const isInteger = frac.d === 1;
  const isPositive = numVal > 0;
  const isZero = numVal === 0;
  const isNegative = numVal < 0;

  const isNatural = isInteger && (includeZeroInN ? numVal >= 0 : numVal > 0);
  const isWhole = isInteger && numVal >= 0;
  const isRational = true; // Any Fraction is rational
  const isReal = true;

  return {
    isNumber: true,
    value: numVal,
    fraction: frac,
    isInteger,
    isNatural,
    isWhole,
    isRational,
    isReal,
    isZero,
    isNegative,
    isPositive,
    convention: includeZeroInN ? "ZERO_INCLUSIVE" : "COUNTING_POSITIVE",
  };
}

/**
 * Diagnoses distractors in a Number Classification problem (e.g. natural number).
 */
export function diagnoseNumberClassification({
  studentInput,
  targetSet = "NATURAL_NUMBERS",
  options = [],
  curriculum = {},
}) {
  const classification = classifyNumberValue(studentInput, curriculum);
  if (!classification.isNumber) return null;

  const { fraction, isInteger, isZero, isNegative, convention } = classification;

  if (targetSet === "NATURAL_NUMBERS") {
    // Distractor 1: Zero
    if (isZero) {
      if (convention === "COUNTING_POSITIVE") {
        return {
          concept: "NATURAL_NUMBERS",
          errorType: "ZERO_NATURAL_NUMBER_CONVENTION",
          label: "Zero / Natural-Number Convention Confusion",
          whatYouDid: "You selected 0.",
          explanation:
            "Under the counting-number definition used in this curriculum, natural numbers begin at 1 (1, 2, 3, ...), while 0 is classified under the whole numbers.",
          ruleToRemember:
            "In this curriculum, Natural Numbers (counting numbers) are {1, 2, 3, ...}, whereas Whole Numbers include zero: {0, 1, 2, 3, ...}.",
        };
      } else {
        return {
          concept: "NATURAL_NUMBERS",
          errorType: "ZERO_INCLUDED_VALID",
          label: "Zero Included Under Zero-Inclusive Convention",
          whatYouDid: "You selected 0.",
          explanation: "Under the zero-inclusive convention, 0 is considered a natural number.",
          ruleToRemember: "Check whether your curriculum defines natural numbers as {0, 1, 2, ...} or {1, 2, 3, ...}.",
        };
      }
    }

    // Distractor 2: Negative integer (e.g. -3)
    if (isNegative && isInteger) {
      return {
        concept: "NATURAL_NUMBERS",
        errorType: "NEGATIVE_INTEGER_CONFUSED_WITH_NATURAL",
        label: "Negative Integer Confused with Natural Number",
        whatYouDid: `You selected ${studentInput}.`,
        explanation: `Negative numbers such as ${studentInput} are integers, but natural numbers cannot be negative—they only represent positive counting amounts.`,
        ruleToRemember:
          "Natural numbers are strictly positive counting numbers {1, 2, 3, ...}. Negative numbers belong to the integers (ℤ).",
      };
    }

    // Distractor 3: Fraction / rational number (e.g. 1/2)
    if (!isInteger) {
      return {
        concept: "NATURAL_NUMBERS",
        errorType: "FRACTION_CONFUSED_WITH_NATURAL",
        label: "Rational Number Confused with Natural Number",
        whatYouDid: `You selected ${studentInput}.`,
        explanation: `You selected a fraction (${studentInput}). Remember that natural numbers are whole counting numbers. Fractions belong to the rational numbers (ℚ).`,
        ruleToRemember:
          "Natural numbers are discrete whole counting numbers {1, 2, 3, ...}. Fractions and decimals are rational numbers, not natural numbers.",
      };
    }

    // If it is a natural number (e.g. 4)
    if (classification.isNatural) {
      return {
        concept: "NATURAL_NUMBERS",
        errorType: null,
        isCorrect: true,
        label: "Positive Counting Number",
        whatYouDid: `You correctly selected ${studentInput}.`,
        explanation: `${studentInput} is a positive whole number, so it is a natural number.`,
      };
    }
  }

  return null;
}
