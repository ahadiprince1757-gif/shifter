/**
 * diagnosticSelector.js
 *
 * Selects 2–3 "diagnostic" questions from a topic's full question bank.
 * Strategy (in priority order):
 *   1. Questions the user has previously failed on this topic (from history)
 *   2. Questions with a `difficulty: "medium"` tag
 *   3. First question + last question (breadth probe)
 *   4. Single question if the bank has only 1–2
 *
 * The diagnostic is intentionally SHORT — the goal is to probe for gaps quickly,
 * not to re-teach everything.
 */

const MAX_DIAGNOSTIC = 3;
const MIN_DIAGNOSTIC = 1;

/**
 * Select diagnostic questions from a topic's question bank.
 *
 * @param {Array<object>} questions       - full content.qs[] array
 * @param {Array<number>} previousFails   - qIdx values the user got wrong historically
 * @returns {Array<{ qIdx: number, q: object }>}
 */
export function selectDiagnosticQuestions(questions = [], previousFails = []) {
  if (!questions || questions.length === 0) return [];

  const total = questions.length;
  const selected = new Set();
  const result = [];

  const pick = (idx) => {
    if (idx >= 0 && idx < total && !selected.has(idx)) {
      selected.add(idx);
      result.push({ qIdx: idx, q: questions[idx] });
    }
  };

  // Priority 1: questions the user has historically failed
  const validFails = (previousFails || []).filter(
    (i) => i >= 0 && i < total
  );
  for (const i of validFails) {
    if (result.length >= MAX_DIAGNOSTIC) break;
    pick(i);
  }

  if (result.length >= MAX_DIAGNOSTIC) return result;

  // Priority 2: medium difficulty questions
  const mediumIdxs = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => q.difficulty === "medium")
    .map(({ idx }) => idx);

  for (const i of mediumIdxs) {
    if (result.length >= MAX_DIAGNOSTIC) break;
    pick(i);
  }

  if (result.length >= MAX_DIAGNOSTIC) return result;

  // Priority 3: first + last question (breadth probe)
  if (total >= 3) {
    const mid = Math.floor(total / 2);
    pick(0);
    if (result.length < MAX_DIAGNOSTIC) pick(mid);
    if (result.length < MAX_DIAGNOSTIC) pick(total - 1);
  } else {
    for (let i = 0; i < total; i++) pick(i);
  }

  // Always return at least MIN_DIAGNOSTIC if questions exist
  if (result.length < MIN_DIAGNOSTIC && total > 0) pick(0);

  return result;
}

/**
 * Given diagnostic answers, determine whether a knowledge gap was detected.
 *
 * @param {Array<{ qIdx, passed }>} diagnosticResults
 * @returns {"gap_found" | "no_gap"}
 */
export function interpretDiagnostic(diagnosticResults = []) {
  if (diagnosticResults.length === 0) return "gap_found"; // be cautious: teach if unknown
  const anyFailed = diagnosticResults.some((r) => !r.passed);
  return anyFailed ? "gap_found" : "no_gap";
}
