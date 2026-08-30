/**
 * transferQuestion.js
 *
 * Selects or synthesizes the final "Transfer" question — a novel-context application
 * of the concept the learner just completed.
 *
 * Strategy (in priority order):
 *   1. A question in content.qs[] explicitly tagged `is_transfer: true`
 *   2. The last question in the bank that was NOT used in the main quiz
 *   3. The last question in the bank (acceptable repetition at this stage)
 *   4. null if there are no questions at all
 *
 * Why not AI-generate? Avoids latency at the end of a session. If the topic
 * author has added a transfer question, that is always superior to generated text.
 * AI generation can be added as a future backend endpoint without changing this API.
 */

/**
 * @param {Array<object>} questions       - full content.qs[] array
 * @param {Set<number>}   usedIndices     - qIdx values already shown in the main quiz
 * @returns {{ qIdx: number, q: object } | null}
 */
export function selectTransferQuestion(questions = [], usedIndices = new Set()) {
  if (!questions || questions.length === 0) return null;

  // Priority 1: explicit transfer question
  const explicit = questions
    .map((q, idx) => ({ q, idx }))
    .find(({ q }) => q.is_transfer === true || q.type === "transfer");
  if (explicit) return { qIdx: explicit.idx, q: explicit.q };

  // Priority 2: last question not already shown
  for (let i = questions.length - 1; i >= 0; i--) {
    if (!usedIndices.has(i)) {
      return { qIdx: i, q: questions[i] };
    }
  }

  // Priority 3: fall back to the last question (novel context still applies)
  const last = questions.length - 1;
  return { qIdx: last, q: questions[last] };
}

/**
 * Build a placeholder transfer question object when the bank is empty.
 * This ensures TransferPhase always has something to render.
 *
 * @param {string} topic
 * @returns {object}
 */
export function buildFallbackTransferQuestion(topic) {
  return {
    q: `Give one real-world example where understanding "${topic}" would directly affect a decision or outcome. Explain the connection clearly.`,
    ans: "Any clear, logical real-world application of the concept.",
    hint: "Think about how this concept changes what you would do differently.",
    why: "Transfer shows you can move knowledge from study context to real use.",
    type: "open",
    concept_tag: "transfer",
    is_transfer: true,
  };
}
