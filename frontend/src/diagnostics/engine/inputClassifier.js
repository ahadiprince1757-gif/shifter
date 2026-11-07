/**
 * Input Intelligence Engine.
 * Classifies student input into:
 * - BLANK
 * - GIBBERISH (unrecognized keyboard mashing)
 * - MULTIPLE_CHOICE
 * - NUMBER
 * - FRACTION
 * - EQUATION
 * - EXPRESSION
 * - TEXT_EXPLANATION
 */

import { InputType } from "./diagnosticTypes.js";
import { normalizeMathText } from "../parsing/textNormalizer.js";

/**
 * Checks if a string looks like random keyboard mashing (e.g. "kjhhgffddfghj").
 */
export function isKeyboardMash(str) {
  if (!str || typeof str !== "string") return false;
  const s = str.trim().toLowerCase();
  if (s.length < 4) return false;

  // If it has spaces and common punctuation, it's likely text or a sentence
  if (s.includes(" ")) return false;

  // If it contains mathematical symbols (=, +, -, *, /, ^), it's not pure mash
  if (/[=+\-*/^]/.test(s)) return false;

  // If it's purely digits or numbers, it's not mash
  if (/^[-+]?\d+(\.\d+)?$/.test(s)) return false;

  // Check consonant cluster without vowels
  const vowelCount = (s.match(/[aeiou]/g) || []).length;
  if (s.length >= 6 && vowelCount === 0) return true;

  // Check home row keyboard mashing patterns
  const mashPatterns = [
    /^[asdfghjklqwertyuiopzxcvbnm]{6,}$/i,
  ];

  // Repetitive character frequency (e.g., "kjhhgffddfghj")
  const charCounts = {};
  for (const ch of s) {
    charCounts[ch] = (charCounts[ch] || 0) + 1;
  }
  const maxFreq = Math.max(...Object.values(charCounts));
  const distinctChars = Object.keys(charCounts).length;

  // High repetition or home row mash with low vowel ratio
  if (s.length >= 6 && vowelCount <= 1 && distinctChars <= 7) {
    return true;
  }

  // Common mash substrings
  if (
    s.includes("asdf") ||
    s.includes("hjkl") ||
    s.includes("qwer") ||
    s.includes("zxcv") ||
    s.includes("fghj") ||
    s.includes("dfgh") ||
    s.includes("ghjk")
  ) {
    if (vowelCount <= 1) return true;
  }

  return false;
}

export function classifyInput(rawInput, options = []) {
  if (rawInput === null || rawInput === undefined) {
    return {
      type: InputType.BLANK,
      recognized: false,
      normalized: "",
      raw: "",
      message: "No input provided",
    };
  }

  const raw = String(rawInput);
  const trimmed = raw.trim();

  if (!trimmed) {
    return {
      type: InputType.BLANK,
      recognized: false,
      normalized: "",
      raw,
      message: "Submission is blank",
    };
  }

  // Check keyboard mash / gibberish first
  if (isKeyboardMash(trimmed)) {
    return {
      type: InputType.GIBBERISH,
      recognized: false,
      normalized: trimmed,
      raw,
      message: "No interpretable mathematical answer",
    };
  }

  const normalized = normalizeMathText(trimmed);

  // Check if it matches an option in multiple choice options
  if (Array.isArray(options) && options.length > 0) {
    const normLower = normalized.toLowerCase();
    const matchedOpt = options.find((opt) => {
      if (typeof opt !== "string") return false;
      const optNorm = normalizeMathText(opt).toLowerCase();
      return optNorm === normLower;
    });

    if (matchedOpt !== undefined) {
      return {
        type: InputType.MULTIPLE_CHOICE,
        recognized: true,
        normalized,
        raw,
        selectedOption: matchedOpt,
        message: "Recognized multiple choice option",
      };
    }
  }

  // Check equation
  if (normalized.includes("=")) {
    const sides = normalized.split("=");
    if (sides.length === 2 && sides[0].trim() && sides[1].trim()) {
      return {
        type: InputType.EQUATION,
        recognized: true,
        normalized,
        raw,
        message: "Mathematical equation",
      };
    }
  }

  // Check fraction (e.g. 1/2, -3/4)
  if (/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(normalized)) {
    return {
      type: InputType.FRACTION,
      recognized: true,
      normalized,
      raw,
      message: "Fraction",
    };
  }

  // Check pure numeric (e.g. 4, -3, 0, 42.5)
  if (/^[+-]?\d+(\.\d+)?$/.test(normalized)) {
    return {
      type: InputType.NUMBER,
      recognized: true,
      normalized,
      raw,
      numericValue: parseFloat(normalized),
      message: "Numeric value",
    };
  }

  // Check mathematical expression
  if (/^[\d\s+\-*/^().a-zA-Z_]+$/.test(normalized) && /[+\-*/^]/.test(normalized)) {
    return {
      type: InputType.EXPRESSION,
      recognized: true,
      normalized,
      raw,
      message: "Mathematical expression",
    };
  }

  // Default to text explanation if words present
  if (/[a-zA-Z]{2,}/.test(normalized)) {
    return {
      type: InputType.TEXT_EXPLANATION,
      recognized: true,
      normalized,
      raw,
      message: "Written text explanation",
    };
  }

  return {
    type: InputType.UNKNOWN,
    recognized: false,
    normalized,
    raw,
    message: "Unrecognized mathematical input",
  };
}
