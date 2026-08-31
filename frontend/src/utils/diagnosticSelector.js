/**
 * TIXAR — DIAGNOSTIC QUESTION SELECTOR
 *
 * Selects a small number of questions that provide the most useful
 * evidence about a student's current understanding of a topic.
 *
 * Core principle:
 *
 *   Diagnostic ≠ Mini Test
 *
 * A diagnostic should maximize INFORMATION GAIN, not question count.
 *
 * The selector prioritizes:
 *
 *   1. Previously failed questions
 *   2. Questions targeting known weak concepts/skills
 *   3. Medium-difficulty questions
 *   4. Breadth across the question bank
 *   5. Diversity of question types
 *
 * The diagnostic remains intentionally short.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

export const DIAGNOSTIC_CONFIG = Object.freeze({
  MAX_QUESTIONS: 3,
  MIN_QUESTIONS: 1,

  /*
   * Maximum number of questions we allow from the same
   * conceptual cluster.
   *
   * This prevents a diagnostic from accidentally asking
   * three nearly identical questions.
   */
  MAX_SAME_CONCEPT: 2,

  /*
   * Target difficulty distribution.
   */
  TARGET_DIFFICULTIES: [
    "medium",
    "medium",
    "hard",
  ],
});

// ============================================================================
// MAIN SELECTOR
// ============================================================================

/**
 * Select diagnostic questions.
 *
 * @param {Array<Object>} questions
 * @param {Array<number|Object>} previousFails
 * @param {Object} history
 * @returns {Array<{qIdx:number,q:Object,reason:string,score:number}>}
 */
export function selectDiagnosticQuestions(
  questions = [],
  previousFails = [],
  history = {}
) {
  if (
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return [];
  }

  const maxQuestions =
    Math.min(
      DIAGNOSTIC_CONFIG.MAX_QUESTIONS,
      questions.length
    );

  const normalizedHistory =
    normalizeHistory(
      history,
      previousFails
    );

  const candidates =
    questions.map(
      (question, index) =>
        scoreQuestion(
          question,
          index,
          normalizedHistory,
          questions
        )
    );

  /*
   * Highest information-value questions first.
   */
  candidates.sort(
    compareCandidates
  );

  const selected = [];

  for (
    const candidate of candidates
  ) {
    if (
      selected.length >= maxQuestions
    ) {
      break;
    }

    if (
      violatesSelectionConstraints(
        candidate,
        selected
      )
    ) {
      continue;
    }

    selected.push(
      candidate
    );
  }

  /*
   * Safety fallback.
   *
   * We should NEVER return an empty diagnostic if
   * the question bank contains usable questions.
   */
  if (
    selected.length === 0
  ) {
    const fallback =
      candidates.find(
        isUsableCandidate
      );

    if (fallback) {
      selected.push(
        fallback
      );
    }
  }

  /*
   * Preserve deterministic ordering for the UI.
   *
   * We selected based on diagnostic value,
   * but questions should generally be presented
   * in a stable sequence.
   */
  selected.sort(
    (a, b) =>
      a.selectionOrder -
      b.selectionOrder
  );

  return selected.map(
    ({
      qIdx,
      q,
      score,
      reason,
    }) => ({
      qIdx,
      q,
      score,
      reason,
    })
  );
}

// ============================================================================
// QUESTION SCORING
// ============================================================================

function scoreQuestion(
  question,
  index,
  history,
  allQuestions
) {
  if (
    !question ||
    typeof question !== "object"
  ) {
    return {
      qIdx: index,
      q: question,
      score: -Infinity,
      reason: "Invalid question",
      selectionOrder: index,
      conceptKey: null,
      difficulty: "",
      questionType: "",
    };
  }

  let score = 0;
  const reasons = [];

  const difficulty =
    normalizeDifficulty(
      question.difficulty
    );

  const questionType =
    normalizeQuestionType(
      question
    );

  const conceptKey =
    getConceptKey(
      question
    );

  // --------------------------------------------------------------------------
  // 1. PREVIOUS FAILURE
  // --------------------------------------------------------------------------

  if (
    history.failedIndexes.has(
      index
    )
  ) {
    score += 100;

    reasons.push(
      "Previously failed"
    );
  }

  // --------------------------------------------------------------------------
  // 2. KNOWN WEAK CONCEPT
  // --------------------------------------------------------------------------

  if (
    conceptKey &&
    history.weakConcepts.has(
      conceptKey
    )
  ) {
    score += 80;

    reasons.push(
      "Targets a known weak concept"
    );
  }

  // --------------------------------------------------------------------------
  // 3. RECURRENT FAILURE
  // --------------------------------------------------------------------------

  const failureCount =
    history.failureCounts.get(
      index
    ) || 0;

  if (
    failureCount > 0
  ) {
    score += Math.min(
      failureCount * 15,
      60
    );

    reasons.push(
      `Failed ${failureCount} time(s)`
    );
  }

  // --------------------------------------------------------------------------
  // 4. DIFFICULTY
  // --------------------------------------------------------------------------

  if (
    difficulty === "medium"
  ) {
    score += 35;

    reasons.push(
      "Medium difficulty"
    );
  } else if (
    difficulty === "hard"
  ) {
    score += 20;

    reasons.push(
      "Higher-difficulty probe"
    );
  } else if (
    difficulty === "easy"
  ) {
    score += 10;

    reasons.push(
      "Basic foundation probe"
    );
  }

  // --------------------------------------------------------------------------
  // 5. BREADTH
  //
  // Questions representing concepts that are uncommon in the current
  // diagnostic receive a diversity bonus later during selection.
  // --------------------------------------------------------------------------

  const conceptFrequency =
    countConceptFrequency(
      conceptKey,
      allQuestions
    );

  if (
    conceptFrequency === 1
  ) {
    score += 25;

    reasons.push(
      "Broad concept coverage"
    );
  }

  // --------------------------------------------------------------------------
  // 6. QUESTION TYPE
  //
  // Prefer questions that reveal reasoning rather than pure recognition.
  // --------------------------------------------------------------------------

  if (
    isReasoningQuestion(
      question
    )
  ) {
    score += 20;

    reasons.push(
      "Tests reasoning"
    );
  }

  // --------------------------------------------------------------------------
  // 7. PENALIZE PURE DUPLICATES
  // --------------------------------------------------------------------------

  if (
    history.recentlySeenIndexes.has(
      index
    )
  ) {
    score -= 35;

    reasons.push(
      "Recently seen"
    );
  }

  return {
    qIdx: index,
    q: question,

    score,

    reason:
      reasons.length > 0
        ? reasons.join(
            " • "
          )
        : "General diagnostic probe",

    selectionOrder:
      index,

    conceptKey,

    difficulty,

    questionType,
  };
}

// ============================================================================
// SELECTION CONSTRAINTS
// ============================================================================

function violatesSelectionConstraints(
  candidate,
  selected
) {
  if (
    !isUsableCandidate(
      candidate
    )
  ) {
    return true;
  }

  /*
   * Prevent three questions from testing exactly
   * the same conceptual area.
   */
  if (
    candidate.conceptKey
  ) {
    const sameConceptCount =
      selected.filter(
        item =>
          item.conceptKey ===
          candidate.conceptKey
      ).length;

    if (
      sameConceptCount >=
      DIAGNOSTIC_CONFIG.MAX_SAME_CONCEPT
    ) {
      return true;
    }
  }

  /*
   * Prevent exact duplicate question types
   * when alternatives are available.
   */
  if (
    selected.length >= 2 &&
    candidate.questionType
  ) {
    const sameTypeCount =
      selected.filter(
        item =>
          item.questionType ===
          candidate.questionType
      ).length;

    if (
      sameTypeCount >= 2
    ) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// DIAGNOSTIC INTERPRETATION
// ============================================================================

/**
 * Interpret diagnostic performance.
 *
 * This is intentionally more informative than:
 *
 *   anyFailed ? "gap_found" : "no_gap"
 *
 * One failed question does NOT necessarily prove a knowledge gap.
 *
 * @param {Array<Object>} diagnosticResults
 * @returns {Object}
 */
export function interpretDiagnostic(
  diagnosticResults = []
) {
  if (
    !Array.isArray(
      diagnosticResults
    ) ||
    diagnosticResults.length === 0
  ) {
    return {
      status: "insufficient_evidence",
      confidence: 0,
      gapFound: true,
      recommendation:
        "Run another diagnostic question.",
    };
  }

  const validResults =
    diagnosticResults.filter(
      result =>
        result &&
        typeof result === "object"
    );

  if (
    validResults.length === 0
  ) {
    return {
      status: "insufficient_evidence",
      confidence: 0,
      gapFound: true,
      recommendation:
        "Diagnostic results are invalid.",
    };
  }

  const total =
    validResults.length;

  const passed =
    validResults.filter(
      result =>
        result.passed === true
    ).length;

  const failed =
    total - passed;

  const hasStrongEvidence =
    validResults.some(
      result =>
        result.confidence >= 80
    );

  const hasMisconception =
    validResults.some(
      result =>
        Boolean(
          result.misconception
        )
    );

  // --------------------------------------------------------------------------
  // CLEAR GAP
  // --------------------------------------------------------------------------

  if (
    hasMisconception ||
    failed >= 2
  ) {
    return {
      status:
        "gap_found",

      confidence:
        calculateDiagnosticConfidence(
          validResults
        ),

      gapFound: true,

      recommendation:
        hasMisconception
          ? "Teach the identified misconception before retesting."
          : "Identify the missing concept or prerequisite before continuing.",
    };
  }

  // --------------------------------------------------------------------------
  // POSSIBLE GAP
  // --------------------------------------------------------------------------

  if (
    failed === 1
  ) {
    return {
      status:
        "uncertain",

      confidence:
        calculateDiagnosticConfidence(
          validResults
        ),

      gapFound: false,

      recommendation:
        "Run a targeted retrieval question before concluding mastery.",
    };
  }

  // --------------------------------------------------------------------------
  // STRONG PERFORMANCE
  // --------------------------------------------------------------------------

  if (
    passed === total &&
    (
      hasStrongEvidence ||
      total >= 2
    )
  ) {
    return {
      status:
        "no_gap",

      confidence:
        calculateDiagnosticConfidence(
          validResults
        ),

      gapFound: false,

      recommendation:
        "Test transfer or schedule a later retention check.",
    };
  }

  // --------------------------------------------------------------------------
  // DEFAULT
  // --------------------------------------------------------------------------

  return {
    status:
      "uncertain",

    confidence:
      calculateDiagnosticConfidence(
        validResults
      ),

    gapFound: false,

    recommendation:
      "Collect more evidence before declaring mastery.",
  };
}

// ============================================================================
// CONFIDENCE
// ============================================================================

function calculateDiagnosticConfidence(
  results
) {
  if (
    !Array.isArray(results) ||
    results.length === 0
  ) {
    return 0;
  }

  const passed =
    results.filter(
      r =>
        r.passed === true
    ).length;

  const performanceConfidence =
    (passed /
      results.length) *
    100;

  const reportedConfidence =
    results
      .map(
        r =>
          Number(
            r.confidence
          )
      )
      .filter(
        Number.isFinite
      );

  if (
    reportedConfidence.length ===
    0
  ) {
    return Math.round(
      performanceConfidence
    );
  }

  const averageReported =
    reportedConfidence.reduce(
      (sum, value) =>
        sum + clamp(
          value,
          0,
          100
        ),
      0
    ) /
    reportedConfidence.length;

  /*
   * Combine observed performance with diagnostic confidence.
   *
   * We do not allow a model-generated confidence value
   * to completely override actual student performance.
   */
  return Math.round(
    performanceConfidence *
      0.6 +
      averageReported *
      0.4
  );
}

// ============================================================================
// HISTORY NORMALIZATION
// ============================================================================

function normalizeHistory(
  history,
  previousFails
) {
  const failedIndexes =
    new Set(
      Array.isArray(
        previousFails
      )
        ? previousFails
            .map(Number)
            .filter(
              Number.isInteger
            )
        : []
    );

  const historyObject =
    history &&
    typeof history ===
      "object"
      ? history
      : {};

  const historicalFails =
    Array.isArray(
      historyObject.failedIndexes
    )
      ? historyObject.failedIndexes
      : [];

  historicalFails.forEach(
    index => {
      const numericIndex =
        Number(index);

      if (
        Number.isInteger(
          numericIndex
        )
      ) {
        failedIndexes.add(
          numericIndex
        );
      }
    }
  );

  const failureCounts =
    new Map();

  if (
    historyObject.failureCounts &&
    typeof historyObject.failureCounts ===
      "object"
  ) {
    Object.entries(
      historyObject.failureCounts
    ).forEach(
      ([index, count]) => {
        const numericIndex =
          Number(index);

        const numericCount =
          Number(count);

        if (
          Number.isInteger(
            numericIndex
          ) &&
          Number.isFinite(
            numericCount
          )
        ) {
          failureCounts.set(
            numericIndex,
            Math.max(
              0,
              numericCount
            )
          );
        }
      }
    );
  }

  const weakConcepts =
    new Set(
      Array.isArray(
        historyObject.weakConcepts
      )
        ? historyObject.weakConcepts.map(
            normalizeConcept
          )
        : []
    );

  const recentlySeenIndexes =
    new Set(
      Array.isArray(
        historyObject.recentlySeenIndexes
      )
        ? historyObject.recentlySeenIndexes
            .map(Number)
            .filter(
              Number.isInteger
            )
        : []
    );

  return {
    failedIndexes,
    failureCounts,
    weakConcepts,
    recentlySeenIndexes,
  };
}

// ============================================================================
// CONCEPT EXTRACTION
// ============================================================================

function getConceptKey(
  question
) {
  if (
    !question ||
    typeof question !==
      "object"
  ) {
    return null;
  }

  const value =
    question.concept ||
    question.skill ||
    question.learningObjective ||
    question.topic ||
    question.subtopic ||
    null;

  if (
    !value
  ) {
    return null;
  }

  return normalizeConcept(
    value
  );
}

function normalizeConcept(
  value
) {
  return String(
    value || ""
  )
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "_"
    )
    .replace(
      /^_+|_+$/g,
      ""
    );
}

function countConceptFrequency(
  conceptKey,
  questions
) {
  if (
    !conceptKey ||
    !Array.isArray(
      questions
    )
  ) {
    return 0;
  }

  return questions.filter(
    question =>
      getConceptKey(
        question
      ) === conceptKey
  ).length;
}

// ============================================================================
// QUESTION CLASSIFICATION
// ============================================================================

function normalizeDifficulty(
  difficulty
) {
  const value =
    String(
      difficulty || ""
    )
      .trim()
      .toLowerCase();

  if (
    ["easy", "beginner"].includes(
      value
    )
  ) {
    return "easy";
  }

  if (
    ["hard", "advanced"].includes(
      value
    )
  ) {
    return "hard";
  }

  return "medium";
}

function normalizeQuestionType(
  question
) {
  const type =
    String(
      question?.type ||
      question?.questionType ||
      ""
    )
      .trim()
      .toLowerCase();

  if (
    type
  ) {
    return type;
  }

  if (
    Array.isArray(
      question?.options
    ) &&
    question.options.length > 0
  ) {
    return "mcq";
  }

  if (
    question?.steps ||
    question?.workingRequired
  ) {
    return "problem_solving";
  }

  return "short_answer";
}

function isReasoningQuestion(
  question
) {
  if (
    !question ||
    typeof question !==
      "object"
  ) {
    return false;
  }

  if (
    Array.isArray(
      question.steps
    ) &&
    question.steps.length > 0
  ) {
    return true;
  }

  const type =
    normalizeQuestionType(
      question
    );

  return [
    "problem_solving",
    "open_ended",
    "short_answer",
    "calculation",
    "proof",
    "explanation",
  ].includes(type);
}

// ============================================================================
// SORTING
// ============================================================================

function compareCandidates(
  a,
  b
) {
  if (
    a.score !== b.score
  ) {
    return (
      b.score -
      a.score
    );
  }

  /*
   * Deterministic tie breaker.
   */
  return (
    a.qIdx -
    b.qIdx
  );
}

// ============================================================================
// VALIDATION
// ============================================================================

function isUsableCandidate(
  candidate
) {
  return Boolean(
    candidate &&
    candidate.q &&
    typeof candidate.q ===
      "object" &&
    Number.isInteger(
      candidate.qIdx
    ) &&
    Number.isFinite(
      candidate.score
    )
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
