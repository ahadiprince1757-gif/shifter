/**
 * TIXAR LAYER 0: SUBMISSION NORMALIZER
 *
 * Normalizes raw student input into canonical representations
 * so downstream Evidence & Verification engines analyze reasoning,
 * not superficial formatting variations.
 */

// Common scientific & mathematical unit canonical mappings
const UNIT_CANONICAL_MAP = [
  // Speed / Velocity
  { pattern: /\b(km\s*\/\s*h|km\s*h[\^⁻\-]?1|km\s*hr[\^⁻\-]?1|kilomet(?:er|re)s?\s*(?:per|\/)\s*hour|km\s*\/\s*hr|kmph|kph)\b/gi, canonical: "km/h" },
  { pattern: /\b(m\s*\/\s*s|m\s*s[\^⁻\-]?1|met(?:er|re)s?\s*(?:per|\/)\s*second|mps)\b/gi, canonical: "m/s" },
  { pattern: /\b(miles?\s*(?:per|\/)\s*hour|mph)\b/gi, canonical: "mph" },

  // Density
  { pattern: /\b(g\s*\/\s*cm[\^3³]|g\s*cm[\^⁻\-]?3|grams?\s*(?:per|\/)\s*cubic\s*centimet(?:er|re))\b/gi, canonical: "g/cm³" },
  { pattern: /\b(kg\s*\/\s*m[\^3³]|kg\s*m[\^⁻\-]?3|kilograms?\s*(?:per|\/)\s*cubic\s*met(?:er|re))\b/gi, canonical: "kg/m³" },

  // Force, Energy, Power, Electricity
  { pattern: /\b(newtons?)\b/gi, canonical: "N" },
  { pattern: /\b(joules?)\b/gi, canonical: "J" },
  { pattern: /\b(watts?)\b/gi, canonical: "W" },
  { pattern: /\b(volts?)\b/gi, canonical: "V" },
  { pattern: /\b(amperes?|amps?)\b/gi, canonical: "A" },
  { pattern: /\b(ohms?|Ω)\b/gi, canonical: "Ω" },

  // Time & Distance
  { pattern: /\b(seconds?|secs?)\b/gi, canonical: "s" },
  { pattern: /\b(minutes?|mins?)\b/gi, canonical: "min" },
  { pattern: /\b(hours?|hrs?)\b/gi, canonical: "h" },
  { pattern: /\b(kilomet(?:er|re)s?)\b/gi, canonical: "km" },
  { pattern: /\b(met(?:er|re)s?)\b/gi, canonical: "m" },
  { pattern: /\b(centimet(?:er|re)s?)\b/gi, canonical: "cm" },
  { pattern: /\b(kilograms?|kilos?)\b/gi, canonical: "kg" },
  { pattern: /\b(grams?)\b/gi, canonical: "g" },
];

const WORD_NUMBERS = [
  { word: /\bzero\b/gi, num: "0" },
  { word: /\bone\b/gi, num: "1" },
  { word: /\btwo\b/gi, num: "2" },
  { word: /\bthree\b/gi, num: "3" },
  { word: /\bfour\b/gi, num: "4" },
  { word: /\bfive\b/gi, num: "5" },
  { word: /\bsix\b/gi, num: "6" },
  { word: /\bseven\b/gi, num: "7" },
  { word: /\beight\b/gi, num: "8" },
  { word: /\bnine\b/gi, num: "9" },
  { word: /\bten\b/gi, num: "10" },
  { word: /\beleven\b/gi, num: "11" },
  { word: /\btwelve\b/gi, num: "12" },
  { word: /\btwenty\b/gi, num: "20" },
  { word: /\bthirty\b/gi, num: "30" },
  { word: /\bforty\b/gi, num: "40" },
  { word: /\bfifty\b/gi, num: "50" },
  { word: /\bsixty\b/gi, num: "60" },
  { word: /\bseventy\b/gi, num: "70" },
  { word: /\beighty\b/gi, num: "80" },
  { word: /\bninety\b/gi, num: "90" },
  { word: /\bhundred\b/gi, num: "100" },
];

/**
 * Normalizes raw mathematical text, word numbers, and units into a canonical form.
 */
export function normalizeSubmission(raw) {
  if (raw === null || raw === undefined) return "";
  let s = String(raw).trim();

  // 1. Normalize unicode punctuation and quotes
  s = s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, "-");

  // 2. Remove thousands separators between digits (e.g. 1,000 -> 1000)
  s = s.replace(/(\d),(\d)/g, "$1$2");

  // 3. Normalize word numbers when they represent values (e.g. "sixty" -> "60")
  for (const { word, num } of WORD_NUMBERS) {
    s = s.replace(word, num);
  }

  // 4. Normalize arithmetic multiplication variants:
  // e.g. "180 × 3", "180 x 3", "180*3", "180 times 3", "180 multiplied by 3"
  s = s.replace(/(\d)\s*(?:times|multiplied\s*by)\s*(\d)/gi, "$1 * $2");
  s = s.replace(/(\d)\s*[×\u2715\u2716xX]\s*(\d)/g, "$1 * $2");
  s = s.replace(/(\d)\s*\*\s*(\d)/g, "$1 * $2");
  // Implicit multiplication: "180(3)" -> "180 * 3"
  s = s.replace(/(\d+)\s*\(\s*(\d+)\s*\)/g, "$1 * $2");

  // 5. Normalize arithmetic division variants:
  // e.g. "180 ÷ 3", "180 / 3", "180 over 3", "180 divided by 3"
  s = s.replace(/(\d)\s*(?:divided\s*by|over)\s*(\d)/gi, "$1 / $2");
  s = s.replace(/(\d)\s*[\u00F7\u2215:]\s*(\d)/g, "$1 / $2");
  s = s.replace(/(\d)\s*\/\s*(\d)/g, "$1 / $2");

  // 6. Normalize addition and subtraction verbal phrases
  s = s.replace(/(\d)\s*(?:plus|added\s*to)\s*(\d)/gi, "$1 + $2");
  s = s.replace(/(\d)\s*(?:minus|subtracted\s*by)\s*(\d)/gi, "$1 - $2");

  // 7. Normalize fractions symbols
  s = s
    .replace(/½/g, "1/2")
    .replace(/⅓/g, "1/3")
    .replace(/⅔/g, "2/3")
    .replace(/¼/g, "1/4")
    .replace(/¾/g, "3/4");

  // 8. Canonicalize scientific units
  for (const { pattern, canonical } of UNIT_CANONICAL_MAP) {
    s = s.replace(pattern, canonical);
  }

  // 9. Clean excess whitespace
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

/**
 * Checks whether the submission contains conversational wrapper or trailing incomplete clauses.
 * e.g. "I think it is 60 because...", "the answer is 60"
 */
export function inspectReasoningCompleteness(raw) {
  if (!raw) return { hasIncompleteReasoning: false, conversationalWrapper: false };
  const str = String(raw).trim().toLowerCase();

  const isIncomplete =
    /\bbecause\s*\.?\s*$/i.test(str) ||
    /\bsince\s*\.?\s*$/i.test(str) ||
    /\bas\s*\.?\s*$/i.test(str) ||
    /\.\.\.\s*$/.test(str) ||
    /\bso\s*\.?\s*$/i.test(str);

  const isConversational =
    /\b(i think|the answer is|my answer is|it is|it should be)\b/i.test(str);

  return {
    hasIncompleteReasoning: isIncomplete,
    conversationalWrapper: isConversational,
  };
}

/**
 * Extracts candidate canonical unit from text if present.
 */
export function extractCanonicalUnit(text) {
  if (!text) return null;
  const normalized = normalizeSubmission(text);
  for (const { canonical } of UNIT_CANONICAL_MAP) {
    const escaped = canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?:^|\\s|\\d)${escaped}(?:$|\\s|\\))`, "i");
    if (regex.test(normalized)) {
      return canonical;
    }
  }
  return null;
}
