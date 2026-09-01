/**
 * ============================================================
 * TIXAR STRUCTURAL TRANSFER ENGINE
 * ============================================================
 *
 * PURPOSE
 *
 * Selects or constructs questions that test STRUCTURAL TRANSFER.
 *
 * Transfer does NOT simply mean:
 * - changing numbers
 * - changing names
 * - adding a random real-world story
 *
 * Genuine transfer means:
 * - PRESERVE the underlying concept or cognitive operation.
 * - CHANGE the representation, structure, context, or format.
 * - Keep the question independently solvable.
 * - Never invent an answer without sufficient information.
 *
 * EXAMPLE
 *
 * Original:
 * Calculate 12 × 7.
 *
 * Parameter variation:
 * Calculate 14 × 6. -> NOT strong transfer.
 *
 * Structural transfer:
 * A rectangle has a length of 12 cm and a width of 7 cm. What is its area?
 * -> Same multiplicative structure.
 * -> Different representation.
 *
 * TRANSFER QUALITY HIERARCHY
 *
 * Strongest: Same concept + clearly different representation.
 * Good:      Same concept + different problem structure.
 * Moderate:  Same concept + different context.
 * Weak:      Same structure + different numbers only.
 * Invalid:   Different concept entirely.
 *
 * ============================================================
 */

/**
 * Normalize a value for safe comparison.
 */
function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

/**
 * Convert an Array, Set, or invalid value into a safe Set.
 */
function normalizeUsedIndices(usedIndices) {
  if (usedIndices instanceof Set) {
    return usedIndices;
  }

  if (Array.isArray(usedIndices)) {
    return new Set(usedIndices);
  }

  return new Set();
}

/**
 * Extract the question's main text.
 */
function getQuestionText(question) {
  if (!question || typeof question !== "object") {
    return "";
  }

  return String(
    question.q ||
    question.stem ||
    question.question ||
    ""
  ).trim();
}

/**
 * Determines whether a question contains enough information
 * to be presented safely to a learner.
 *
 * A question without text is never valid.
 */
export function isUsableQuestion(question) {
  if (!question || typeof question !== "object") {
    return false;
  }

  return Boolean(getQuestionText(question));
}

/**
 * Extract transfer-relevant metadata.
 *
 * These fields are optional, allowing the engine to work
 * with both old and new Tixar question formats.
 */
export function getQuestionSignature(question) {
  return {
    concept: normalize(
      question.concept_tag ||
      question.concept ||
      question.skill ||
      question.topic
    ),

    representation: normalize(
      question.representation ||
      question.format ||
      "unknown"
    ),

    structure: normalize(
      question.structure ||
      question.problem_structure ||
      question.schema
    ),

    context: normalize(
      question.context ||
      question.domain ||
      "abstract"
    ),

    cognitiveAction: normalize(
      question.cognitive_action ||
      question.learning_action ||
      question.responseMode
    ),
  };
}

/**
 * Determines whether a question is explicitly marked as transfer.
 */
export function isExplicitTransfer(question) {
  if (!question || typeof question !== "object") {
    return false;
  }

  return (
    question.is_transfer === true ||
    question.type === "transfer" ||
    question.question_role === "transfer"
  );
}

/**
 * Scores how strongly a candidate differs structurally
 * from the source question.
 *
 * Higher score = stronger transfer.
 */
export function scoreStructuralDifference(source, candidate) {
  const sourceSig = getQuestionSignature(source);
  const candidateSig = getQuestionSignature(candidate);

  let score = 0;

  // Different representation is the strongest signal.
  if (
    sourceSig.representation !== "unknown" &&
    candidateSig.representation !== "unknown" &&
    sourceSig.representation !== candidateSig.representation
  ) {
    score += 5;
  }

  // Different structural form.
  if (
    sourceSig.structure &&
    candidateSig.structure &&
    sourceSig.structure !== candidateSig.structure
  ) {
    score += 4;
  }

  // Different context.
  if (
    sourceSig.context &&
    candidateSig.context &&
    sourceSig.context !== candidateSig.context
  ) {
    score += 2;
  }

  // Different cognitive action may indicate transfer,
  // but should receive lower weight.
  if (
    sourceSig.cognitiveAction &&
    candidateSig.cognitiveAction &&
    sourceSig.cognitiveAction !== candidateSig.cognitiveAction
  ) {
    score += 1;
  }

  return score;
}

/**
 * Determines whether a candidate appears to test the same concept.
 */
export function hasCompatibleConcept(source, candidate) {
  if (isExplicitTransfer(candidate)) {
    return true;
  }

  const sourceSig = getQuestionSignature(source);
  const candidateSig = getQuestionSignature(candidate);

  // Strongest evidence: explicit concept tags.
  if (
    sourceSig.concept &&
    candidateSig.concept
  ) {
    return sourceSig.concept === candidateSig.concept;
  }

  return false;
}

/**
 * Determines whether the candidate has explicit evidence
 * that it is a genuine structural transfer.
 */
export function validateTransferCandidate(
  candidate,
  sourceQuestion = null
) {
  if (!isUsableQuestion(candidate)) {
    return {
      valid: false,
      score: 0,
      reason: "invalid_question",
    };
  }

  // Explicitly curated transfer questions are trusted,
  // but still need valid question content.
  if (isExplicitTransfer(candidate)) {
    return {
      valid: true,
      score: 100,
      reason: "explicit_transfer",
    };
  }

  // Without a source question we cannot safely prove
  // structural transfer from metadata alone.
  if (!sourceQuestion) {
    return {
      valid: false,
      score: 0,
      reason: "no_source_question",
    };
  }

  // The concept must be compatible.
  if (!hasCompatibleConcept(sourceQuestion, candidate)) {
    return {
      valid: false,
      score: 0,
      reason: "concept_mismatch_or_unknown",
    };
  }

  const differenceScore = scoreStructuralDifference(
    sourceQuestion,
    candidate
  );

  // Require a meaningful structural difference.
  if (differenceScore < 4) {
    return {
      valid: false,
      score: differenceScore,
      reason: "insufficient_structural_difference",
    };
  }

  return {
    valid: true,
    score: differenceScore,
    reason: "validated_structural_transfer",
  };
}

/**
 * SELECT TRANSFER QUESTION
 *
 * Priority:
 * 1. Unused explicit transfer question.
 * 2. Used explicit transfer question if reuse is allowed.
 * 3. Unused validated structural transfer.
 * 4. Used validated structural transfer if reuse is allowed.
 * 5. null.
 */
export function selectTransferQuestion(
  questions = [],
  usedIndices = new Set(),
  sourceQuestion = null,
  options = {}
) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  const {
    allowReuse = true,
  } = options;

  const used = normalizeUsedIndices(usedIndices);

  const candidates = questions
    .map((q, idx) => ({
      q,
      idx,
      used: used.has(idx),
    }))
    .filter(({ q }) => isUsableQuestion(q));

  // PHASE 1: Unused explicit transfer questions.
  const unusedExplicit = candidates.find(
    ({ q, used }) =>
      !used && isExplicitTransfer(q)
  );

  if (unusedExplicit) {
    return {
      qIdx: unusedExplicit.idx,
      q: unusedExplicit.q,
      score: 100,
      reason: "unused_explicit_transfer",
    };
  }

  // PHASE 2: Reuse explicit transfer questions if permitted.
  if (allowReuse) {
    const reusableExplicit = candidates.find(
      ({ q }) => isExplicitTransfer(q)
    );

    if (reusableExplicit) {
      return {
        qIdx: reusableExplicit.idx,
        q: reusableExplicit.q,
        score: 100,
        reason: "reused_explicit_transfer",
      };
    }
  }

  // PHASE 3: Score unused structural transfer candidates.
  const unusedStructuralCandidates = candidates
    .filter(({ used }) => !used)
    .map(({ q, idx }) => {
      const validation = validateTransferCandidate(
        q,
        sourceQuestion
      );

      return {
        q,
        idx,
        ...validation,
      };
    })
    .filter(({ valid }) => valid)
    .sort((a, b) => b.score - a.score);

  if (unusedStructuralCandidates.length > 0) {
    const best = unusedStructuralCandidates[0];

    return {
      qIdx: best.idx,
      q: best.q,
      score: best.score,
      reason: best.reason,
    };
  }

  // PHASE 4: Reuse validated structural transfer if permitted.
  if (allowReuse) {
    const reusableStructuralCandidates = candidates
      .map(({ q, idx }) => {
        const validation = validateTransferCandidate(
          q,
          sourceQuestion
        );

        return {
          q,
          idx,
          ...validation,
        };
      })
      .filter(({ valid }) => valid)
      .sort((a, b) => b.score - a.score);

    if (reusableStructuralCandidates.length > 0) {
      const best = reusableStructuralCandidates[0];

      return {
        qIdx: best.idx,
        q: best.q,
        score: best.score,
        reason: "reused_" + best.reason,
      };
    }
  }

  return null;
}

/**
 * Safely builds a transfer question from explicit transfer data.
 */
export function buildFallbackTransferQuestion(
  topic = "",
  sourceQuestion = null
) {
  if (!isUsableQuestion(sourceQuestion)) {
    return null;
  }

  const safeTopic =
    String(topic || "this concept").trim();

  // OPTION 1: Explicit pre-authored transfer question.
  if (
    typeof sourceQuestion.transfer_question === "string" &&
    sourceQuestion.transfer_question.trim() &&
    sourceQuestion.transfer_answer !== undefined &&
    sourceQuestion.transfer_answer !== null
  ) {
    return {
      q: sourceQuestion.transfer_question.trim(),

      ans: String(
        sourceQuestion.transfer_answer
      ),

      hint:
        sourceQuestion.transfer_hint ||
        `Apply the underlying structure of ${safeTopic} in this new form.`,

      why:
        sourceQuestion.transfer_why ||
        "This question presents the same underlying concept through a different structure or representation.",

      type: "transfer",

      is_transfer: true,

      concept_tag:
        sourceQuestion.concept_tag ||
        sourceQuestion.concept ||
        safeTopic,

      representation:
        sourceQuestion.transfer_representation ||
        "transferred",

      transfer_source: "explicit_transfer_data",

      source_question_id:
        sourceQuestion.id || null,
    };
  }

  // OPTION 2: Structured transfer object.
  const transfer = sourceQuestion.transfer;

  if (
    transfer &&
    typeof transfer === "object" &&
    typeof transfer.q === "string" &&
    transfer.q.trim() &&
    transfer.ans !== undefined &&
    transfer.ans !== null
  ) {
    return {
      q: transfer.q.trim(),

      ans: String(transfer.ans),

      hint:
        transfer.hint ||
        `Apply the underlying structure of ${safeTopic}.`,

      why:
        transfer.why ||
        "The representation changes while the underlying concept remains the same.",

      type: "transfer",

      is_transfer: true,

      concept_tag:
        transfer.concept_tag ||
        sourceQuestion.concept_tag ||
        sourceQuestion.concept ||
        safeTopic,

      representation:
        transfer.representation ||
        "transferred",

      structure:
        transfer.structure ||
        sourceQuestion.structure ||
        null,

      transfer_source: "structured_transfer_data",

      source_question_id:
        sourceQuestion.id || null,
    };
  }

  // OPTION 3: Legacy transfer template.
  const template =
    sourceQuestion.transferTemplate;

  if (
    template &&
    typeof template === "object" &&
    typeof template.q === "string" &&
    template.q.trim() &&
    template.ans !== undefined &&
    template.ans !== null
  ) {
    return {
      q: template.q.trim(),

      ans: String(template.ans),

      hint:
        template.hint ||
        `Apply the core structure of ${safeTopic}.`,

      why:
        template.why ||
        "This problem changes the representation while preserving the underlying concept.",

      type: "transfer",

      is_transfer: true,

      concept_tag:
        sourceQuestion.concept_tag ||
        sourceQuestion.concept ||
        safeTopic,

      representation:
        template.representation ||
        "transferred",

      transfer_source:
        "legacy_transfer_template",

      source_question_id:
        sourceQuestion.id || null,
    };
  }

  return null;
}

/**
 * MAIN TRANSFER QUESTION API
 *
 * Primary entry point for selecting/constructing transfer questions.
 */
export function getTransferQuestion(
  questions = [],
  usedIndices = new Set(),
  topic = "",
  sourceQuestion = null,
  options = {}
) {
  const selected = selectTransferQuestion(
    questions,
    usedIndices,
    sourceQuestion,
    options
  );

  if (selected) {
    return selected;
  }

  const fallbackSource =
    sourceQuestion ||
    questions.find(isUsableQuestion);

  const fallback =
    buildFallbackTransferQuestion(
      topic,
      fallbackSource
    );

  if (!fallback) {
    return null;
  }

  return {
    qIdx: -1,
    q: fallback,
    score: 95,
    reason: "safe_explicit_fallback_transfer",
  };
}