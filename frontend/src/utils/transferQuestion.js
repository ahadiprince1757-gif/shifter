/**
 * transferQuestion.js
 *
 * Selects or builds a Structural Representation Transfer question.
 *
 * Transfer is NOT asking vague real-world essay questions like "Where do you use this?".
 * Transfer is STRUCTURAL RE-FRAMING: taking the exact same core concept and presenting it
 * in a different representation or novel problem structure.
 *
 * Example:
 *   Original Quiz:  Calculate 12 * 7
 *   Transfer Probe: "A rectangle has a length of 12 and a width of 7. What is its total surface area?"
 */

/**
 * @param {Array<object>} questions       - full content.qs[] array
 * @param {Set<number>}   usedIndices     - qIdx values already shown in the main quiz
 * @returns {{ qIdx: number, q: object } | null}
 */
export function selectTransferQuestion(questions = [], usedIndices = new Set()) {
  if (!questions || questions.length === 0) return null;

  // Priority 1: explicitly marked transfer / novel representation question
  const explicit = questions
    .map((q, idx) => ({ q, idx }))
    .find(({ q }) => q.is_transfer === true || q.type === "transfer");
  if (explicit) return { qIdx: explicit.idx, q: explicit.q };

  // Priority 2: question in bank not used in the diagnostic or main quiz
  for (let i = questions.length - 1; i >= 0; i--) {
    if (!usedIndices.has(i)) {
      return { qIdx: i, q: questions[i] };
    }
  }

  // Priority 3: Last question in bank
  const last = questions.length - 1;
  return { qIdx: last, q: questions[last] };
}

/**
 * Build a fallback structural representation question when no transfer question exists.
 * Re-frames the topic concept into a geometric, structural, or word-problem representation.
 *
 * @param {string} topic
 * @param {Array<object>} questions
 * @returns {object}
 */
export function buildFallbackTransferQuestion(topic, questions = []) {
  const sampleQ = questions[0];
  const sampleAns = sampleQ?.ans || sampleQ?.answer;
  const sampleAnsStr = Array.isArray(sampleAns) ? sampleAns[0] : (sampleAns || "");

  // If we have a numerical/formula question, build a geometric/structural reframing
  if (sampleAnsStr && !isNaN(Number(sampleAnsStr))) {
    const val = Number(sampleAnsStr);
    return {
      q: `Representation Transfer: Consider a rectangular region where the dimensions combine under the rules of ${topic} to yield ${val}. If the length is re-scaled or represented visually as a grid of dimensions, state the final computed value for this setup.`,
      ans: String(val),
      hint: `Apply the core formula of ${topic} to this new spatial representation.`,
      why: "Structural transfer tests if you understand the underlying mathematics regardless of how the problem is drawn or framed.",
      type: "calc",
      concept_tag: "structural_transfer",
      is_transfer: true,
    };
  }

  // General structural reframing fallback
  return {
    q: `Structural Transfer Challenge: Apply the core rule of "${topic}" to solve this alternative scenario: If the inputs are presented in a structural diagram or word-problem frame instead of standard notation, what is the exact resulting value or relationship?`,
    ans: sampleAnsStr || "The core concept applied to the new representation.",
    hint: "Identify the underlying formula or rule, ignoring the visual framing.",
    why: "Transfer proves you master the core mathematical principle, not just standard question templates.",
    type: "open",
    concept_tag: "structural_transfer",
    is_transfer: true,
  };
}
