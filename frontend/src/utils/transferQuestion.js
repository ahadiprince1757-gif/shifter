/**
 * transferQuestion.js
 *
 * Selects or builds a Structural Representation Transfer question.
 *
 * Transfer is NOT asking vague real-world essay questions like:
 * "Where do you use this?"
 *
 * Transfer means STRUCTURAL RE-FRAMING:
 * taking the same underlying concept and presenting it through
 * a different representation, structure, or problem format.
 *
 * Example:
 *   Original:       Calculate 12 × 7.
 *   Transfer:       A rectangle has length 12 cm and width 7 cm.
 *                   What is its area?
 *
 * IMPORTANT:
 * This module never invents an answer to an unsolvable question.
 */

/**
 * Select a transfer question from the question bank.
 *
 * Priority:
 *   1. Explicit transfer question that has not been used.
 *   2. Explicit transfer question even if all normal questions are used.
 *   3. Unused question that is structurally different from the main quiz.
 *   4. Last unused question.
 *   5. null if no valid candidate exists.
 *
 * @param {Array<object>} questions
 * @param {Set<number>|Array<number>} usedIndices
 * @returns {{ qIdx: number, q: object } | null}
 */
export function selectTransferQuestion(
  questions = [],
  usedIndices = new Set()
) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  // Normalize usedIndices so the function is safe with either Set or Array.
  const used = usedIndices instanceof Set
    ? usedIndices
    : new Set(Array.isArray(usedIndices) ? usedIndices : []);

  const candidates = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => q && typeof q === "object");

  // ------------------------------------------------------------
  // 1. Explicit transfer questions that have NOT been used.
  // ------------------------------------------------------------
  const unusedExplicitTransfer = candidates.find(
    ({ q, idx }) =>
      !used.has(idx) &&
      (q.is_transfer === true || q.type === "transfer")
  );

  if (unusedExplicitTransfer) {
    return {
      qIdx: unusedExplicitTransfer.idx,
      q: unusedExplicitTransfer.q,
    };
  }

  // ------------------------------------------------------------
  // 2. Any unused question explicitly marked as transfer.
  // ------------------------------------------------------------
  const explicitTransfer = candidates.find(
    ({ q }) => q.is_transfer === true || q.type === "transfer"
  );

  if (explicitTransfer) {
    return {
      qIdx: explicitTransfer.idx,
      q: explicitTransfer.q,
    };
  }

  // ------------------------------------------------------------
  // 3. Prefer an unused question with a different representation.
  //
  // Useful metadata:
  //   representation: "word_problem"
  //   representation: "diagram"
  //   representation: "table"
  //   representation: "equation"
  //   representation: "graph"
  // ------------------------------------------------------------
  const unusedRepresentations = candidates.filter(
    ({ q, idx }) =>
      !used.has(idx) &&
      q.representation
  );

  if (unusedRepresentations.length > 0) {
    const candidate = unusedRepresentations[
      unusedRepresentations.length - 1
    ];

    return {
      qIdx: candidate.idx,
      q: candidate.q,
    };
  }

  // ------------------------------------------------------------
  // 4. Any unused question.
  // ------------------------------------------------------------
  for (let i = questions.length - 1; i >= 0; i--) {
    if (!used.has(i)) {
      return {
        qIdx: i,
        q: questions[i],
      };
    }
  }

  // ------------------------------------------------------------
  // 5. No valid unused question exists.
  //
  // Do NOT fabricate a fake transfer problem.
  // ------------------------------------------------------------
  return null;
}

/**
 * Build a fallback structural transfer question.
 *
 * This function only creates a question when the source question
 * contains enough information to construct a valid transformation.
 *
 * @param {string} topic
 * @param {Array<object>} questions
 * @returns {object|null}
 */
export function buildFallbackTransferQuestion(
  topic,
  questions = []
) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  const safeTopic = String(topic || "this concept").trim();

  // Find the first usable source question.
  const sampleQ = questions.find(
    (q) =>
      q &&
      typeof q === "object" &&
      typeof q.q === "string" &&
      q.q.trim()
  );

  if (!sampleQ) {
    return null;
  }



  /*
   * If the original question already has a structural representation,
   * reuse its metadata instead of inventing mathematics.
   */
  if (
    sampleQ.representation &&
    sampleQ.representation !== "standard"
  ) {
    return {
      ...sampleQ,
      concept_tag:
        sampleQ.concept_tag || "structural_transfer",
      is_transfer: true,
      type: "transfer",
      transfer_source: "fallback",
      transfer_topic: safeTopic,
    };
  }

  /*
   * A numerical answer alone is NOT enough to generate a valid
   * mathematical transfer problem.
   *
   * For example:
   *
   *   Answer = 84
   *
   * does NOT tell us whether the original operation was:
   *   12 × 7
   *   90 − 6
   *   42 × 2
   *   etc.
   *
   * Therefore, only generate a fallback if the original question
   * provides explicit transfer data.
   */

  if (
    sampleQ.transfer_question &&
    sampleQ.transfer_answer !== undefined
  ) {
    return {
      q: String(sampleQ.transfer_question),
      ans: String(sampleQ.transfer_answer),
      hint:
        sampleQ.transfer_hint ||
        `Apply the underlying principle of ${safeTopic} to the new representation.`,
      why:
        sampleQ.transfer_why ||
        "This checks whether you can apply the same concept when the problem structure changes.",
      type: "transfer",
      concept_tag:
        sampleQ.concept_tag || "structural_transfer",
      is_transfer: true,
      transfer_source: "fallback",
    };
  }

  /*
   * If the question has an explicit transformation template,
   * use it.
   *
   * Example:
   *
   * transferTemplate:
   * {
   *   q: "A rectangle has a length of {a} and width of {b}. Find its area.",
   *   ans: "84"
   * }
   */
  if (
    sampleQ.transferTemplate &&
    typeof sampleQ.transferTemplate.q === "string" &&
    sampleQ.transferTemplate.ans !== undefined
  ) {
    return {
      q: sampleQ.transferTemplate.q,
      ans: String(sampleQ.transferTemplate.ans),
      hint:
        sampleQ.transferTemplate.hint ||
        `Apply the core rule of ${safeTopic} to the new representation.`,
      why:
        "The problem uses a different representation while preserving the underlying concept.",
      type: "transfer",
      concept_tag:
        sampleQ.concept_tag || "structural_transfer",
      is_transfer: true,
      transfer_source: "template",
    };
  }

  /*
   * Last resort:
   * Do not manufacture a mathematically invalid question.
   *
   * Returning null tells the caller:
   * "There is no safe fallback transfer question."
   */
  return null;
}

/**
 * Select a transfer question, falling back to a generated one
 * only when the generated question is actually valid.
 *
 * @param {Array<object>} questions
 * @param {Set<number>|Array<number>} usedIndices
 * @param {string} topic
 * @returns {{ qIdx: number, q: object } | null}
 */
export function getTransferQuestion(
  questions = [],
  usedIndices = new Set(),
  topic = ""
) {
  // First try the actual question bank.
  const selected = selectTransferQuestion(
    questions,
    usedIndices
  );

  if (selected) {
    return selected;
  }

  // Only build a fallback if enough source information exists.
  const fallback = buildFallbackTransferQuestion(
    topic,
    questions
  );

  if (!fallback) {
    return null;
  }

  return {
    qIdx: -1,
    q: fallback,
  };
}