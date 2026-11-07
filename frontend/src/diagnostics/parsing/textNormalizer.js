/**
 * Text and mathematical input normalizer.
 * Cleans user input, converts mathematical symbols (e.g. ÷ to /, × to *, − to -),
 * standardizes fractions, strips leading step markers.
 */

export function normalizeMathText(raw) {
  if (raw === null || raw === undefined) return "";
  let s = String(raw).trim();

  // Normalize Unicode minus, multiplication, division, fractions
  s = s
    .replace(/[\u2212\u2013\u2014]/g, "-") // minus, en-dash, em-dash
    .replace(/[\u00D7\u2715\u2716]/g, "*") // multiplication symbols
    .replace(/[\u00F7\u2215]/g, "/")       // division symbols
    .replace(/½/g, "1/2")
    .replace(/⅓/g, "1/3")
    .replace(/⅔/g, "2/3")
    .replace(/¼/g, "1/4")
    .replace(/¾/g, "3/4")
    .replace(/⅕/g, "1/5")
    .replace(/⅖/g, "2/5")
    .replace(/⅗/g, "3/5")
    .replace(/⅘/g, "4/5")
    .replace(/⅙/g, "1/6")
    .replace(/⅚/g, "5/6")
    .replace(/⅛/g, "1/8")
    .replace(/⅜/g, "3/8")
    .replace(/⅝/g, "5/8")
    .replace(/⅞/g, "7/8");

  // Normalize quotes and extra spaces
  s = s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  return s;
}

export function stripStepPrefix(line) {
  if (!line) return "";
  let clean = line.trim();
  // Strip patterns like "Step 1:", "1.", "1)", "(1)", "Step 1 -"
  clean = clean.replace(/^(step\s*\d+[\s:.-]*|\d+[\s:.)-]+\s*|\(\d+\)\s*)/i, "");
  return clean.trim();
}
