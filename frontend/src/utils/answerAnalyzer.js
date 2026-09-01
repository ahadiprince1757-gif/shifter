/**
 * TIXAR SMART ANSWER ANALYSER
 *
 * Purpose:
 * - Determine what the student demonstrated
 * - Identify missing concepts
 * - Identify incorrect concepts
 * - Detect contradictions and common misconceptions
 * - Analyse mathematical working
 * - Separate correctness from understanding
 *
 * Important:
 * This analyser does NOT assume that wording similarity = understanding.
 *
 * It is designed to work offline using deterministic rules.
 * Optional AI/semantic verification can be layered above this later.
 */

// ============================================================================
// CONCEPT CLUSTERS
// ============================================================================

const CONCEPT_CLUSTERS = {
  instrument: [
    "instrument",
    "device",
    "apparatus",
    "equipment",
    "tool",
    "machine",
    "gadget",
  ],

  magnify: [
    "magnify",
    "magnification",
    "enlarge",
    "enlargement",
    "amplify",
    "zoom",
    "bigger",
    "larger",
  ],

  small: [
    "small",
    "tiny",
    "minute",
    "micro",
    "microscopic",
    "little",
    "miniature",
  ],

  observe: [
    "observe",
    "see",
    "view",
    "look",
    "examine",
    "visualize",
    "watch",
    "inspect",
  ],

  specimen: [
    "specimen",
    "sample",
    "slide",
    "material",
    "tissue",
    "organism",
  ],

  transfer: [
    "transfer",
    "move",
    "conduct",
    "transmit",
    "carry",
    "pass",
  ],

  current: [
    "current",
    "electricity",
    "flow",
    "charge",
    "ampere",
  ],

  bond: [
    "bond",
    "link",
    "join",
    "connect",
    "attract",
  ],

  ionic: [
    "ionic",
    "ion",
    "cation",
    "anion",
    "charged",
    "electrostatic",
  ],

  covalent: [
    "covalent",
    "share",
    "sharing",
    "shared",
    "paired",
    "pair",
  ],

  profit: [
    "profit",
    "gain",
    "surplus",
    "income",
    "revenue",
    "earning",
    "earnings",
  ],

  loss: [
    "loss",
    "deficit",
    "negative",
    "shortfall",
  ],

  divide: [
    "divide",
    "division",
    "quotient",
    "split",
    "ratio",
    "per",
  ],

  multiply: [
    "multiply",
    "multiplication",
    "product",
    "times",
    "factor",
  ],

  subtract: [
    "subtract",
    "subtraction",
    "minus",
    "deduct",
    "reduce",
  ],

  add: [
    "add",
    "addition",
    "sum",
    "total",
    "plus",
    "increase",
    "combine",
  ],

  formula: [
    "formula",
    "equation",
    "expression",
    "rule",
    "law",
  ],

  calculate: [
    "calculate",
    "calculation",
    "compute",
    "solve",
    "find",
    "determine",
  ],

  increase: [
    "increase",
    "increases",
    "increased",
    "rise",
    "rises",
    "higher",
    "greater",
  ],

  decrease: [
    "decrease",
    "decreases",
    "decreased",
    "fall",
    "falls",
    "lower",
    "less",
  ],

  conductor: [
    "conductor",
    "conductive",
    "conducts",
  ],

  insulator: [
    "insulator",
    "insulating",
    "insulates",
  ],

  positive: [
    "positive",
    "positively",
    "plus",
  ],

  negative: [
    "negative",
    "negatively",
    "minus",
  ],
};

// ============================================================================
// WORD → CLUSTER INDEX
// ============================================================================

const WORD_TO_CLUSTER = {};

for (const [clusterName, words] of Object.entries(CONCEPT_CLUSTERS)) {
  for (const word of words) {
    WORD_TO_CLUSTER[word] = clusterName;
  }
}

// ============================================================================
// STOP WORDS
// ============================================================================

const STOP = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "it",
  "its",
  "to",
  "of",
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "as",
  "into",
  "that",
  "which",
  "who",
  "what",
  "this",
  "these",
  "those",
  "they",
  "them",
  "has",
  "have",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "not",
  "no",
  "yes",
  "also",
  "very",
  "just",
  "more",
  "can",
  "used",
  "using",
  "use",
  "and",
  "but",
  "or",
  "nor",
  "so",
  "yet",
  "both",
  "either",
  "neither",
  "because",
  "therefore",
  "then",
  "than",
  "from",
  "into",
  "through",
  "during",
  "while",
  "when",
  "where",
  "why",
  "how",
]);

// ============================================================================
// OPPOSING / CONTRADICTORY CONCEPTS
// ============================================================================

const OPPOSITES = {
  ionic: "covalent",
  covalent: "ionic",

  add: "subtract",
  subtract: "add",

  multiply: "divide",
  divide: "multiply",

  profit: "loss",
  loss: "profit",

  increase: "decrease",
  decrease: "increase",

  conductor: "insulator",
  insulator: "conductor",

  positive: "negative",
  negative: "positive",
};

// ============================================================================
// QUALIFIERS
// ============================================================================

const QUALIFIERS = new Set([
  "small",
  "large",
  "strong",
  "weak",
  "high",
  "low",
  "positive",
  "negative",
  "simple",
  "complex",
  "equal",
  "unequal",
]);

// ============================================================================
// BASIC TEXT UTILITIES
// ============================================================================

export function normalizeStr(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\p{L}\p{N}\s.,=+\-*/()%^]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(value) {
  const normalized = normalizeStr(value);

  if (!normalized) {
    return [];
  }

  return normalized
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 1 &&
        !STOP.has(word)
    );
}

function getCluster(word) {
  return WORD_TO_CLUSTER[normalizeStr(word)] || null;
}

function wordsInSameCluster(wordA, wordB) {
  const clusterA = getCluster(wordA);
  const clusterB = getCluster(wordB);

  return Boolean(
    clusterA &&
      clusterB &&
      clusterA === clusterB
  );
}

// ============================================================================
// TOKEN MATCHING
// ============================================================================

function findClosestInStudent(targetWord, studentTokens) {
  const target = normalizeStr(targetWord);

  // Exact match
  if (studentTokens.includes(target)) {
    return {
      studentWord: target,
      relationship: "exact",
    };
  }

  // Concept-cluster match
  for (const studentWord of studentTokens) {
    if (wordsInSameCluster(studentWord, target)) {
      return {
        studentWord,
        relationship: "same_cluster",
      };
    }
  }

  // Conservative morphological match.
  // We deliberately avoid aggressive fuzzy matching because
  // false positives are worse than false negatives in diagnosis.
  if (target.length >= 6) {
    const stem = target.slice(0, target.length - 2);

    for (const studentWord of studentTokens) {
      if (
        studentWord.length >= 6 &&
        (
          studentWord.startsWith(stem) ||
          target.startsWith(studentWord.slice(0, studentWord.length - 2))
        )
      ) {
        return {
          studentWord,
          relationship: "morphological",
        };
      }
    }
  }

  return {
    studentWord: null,
    relationship: "none",
  };
}

// ============================================================================
// PHRASE SEGMENTATION
// ============================================================================

function segmentPhrase(phrase) {
  return String(phrase || "")
    .split(/[,;]|\band\b|\bor\b|\bbut\b/i)
    .map((part) => part.trim())
    .filter((part) => part.length > 1);
}

// ============================================================================
// CONCEPT EXTRACTION
// ============================================================================

function extractConcepts(text) {
  const tokens = tokenize(text);
  const concepts = new Map();

  for (const token of tokens) {
    const cluster = getCluster(token);

    if (!cluster) continue;

    if (!concepts.has(cluster)) {
      concepts.set(cluster, {
        concept: cluster,
        evidence: [],
      });
    }

    concepts.get(cluster).evidence.push(token);
  }

  return [...concepts.values()];
}

// ============================================================================
// REQUIRED CONCEPT SUPPORT
// ============================================================================

function analyseConceptCoverage(
  studentAnswer,
  correctAnswer,
  assessment = {}
) {
  const studentTokens = tokenize(studentAnswer);
  const correctTokens = tokenize(correctAnswer);

  const requiredConcepts = Array.isArray(
    assessment.requiredConcepts
  )
    ? assessment.requiredConcepts
    : [];

  const essentialTerms = Array.isArray(
    assessment.essentialTerms
  )
    ? assessment.essentialTerms
    : [];

  const studentConcepts = new Set(
    extractConcepts(studentAnswer).map(
      (item) => item.concept
    )
  );

  const result = {
    present: [],
    missing: [],
    incorrect: [],
    optionalMissing: [],
  };

  // ----------------------------------------------------------
  // Structured curriculum concepts
  // ----------------------------------------------------------

  for (const concept of requiredConcepts) {
    const normalized = normalizeStr(concept);

    if (
      studentConcepts.has(normalized) ||
      studentTokens.includes(normalized)
    ) {
      result.present.push({
        concept: normalized,
        confidence: 0.9,
        source: "structured_assessment",
      });
    } else {
      result.missing.push({
        concept: normalized,
        importance: "essential",
        source: "structured_assessment",
      });
    }
  }

  // ----------------------------------------------------------
  // Essential terms from question metadata
  // ----------------------------------------------------------

  for (const term of essentialTerms) {
    const normalized = normalizeStr(term);

    const found = findClosestInStudent(
      normalized,
      studentTokens
    );

    if (found.relationship !== "none") {
      result.present.push({
        concept: normalized,
        studentUsed: found.studentWord,
        confidence:
          found.relationship === "exact"
            ? 0.95
            : 0.8,
        source: "essential_term",
      });
    } else {
      result.missing.push({
        concept: normalized,
        importance: "essential",
        source: "essential_term",
      });
    }
  }

  // ----------------------------------------------------------
  // Natural answer comparison
  // ----------------------------------------------------------

  const correctSegments = segmentPhrase(
    correctAnswer
  );

  for (const segment of correctSegments) {
    const segmentTokens = tokenize(segment);

    if (!segmentTokens.length) continue;

    for (const correctWord of segmentTokens) {
      const match = findClosestInStudent(
        correctWord,
        studentTokens
      );

      if (
        match.relationship === "exact" ||
        match.relationship === "same_cluster"
      ) {
        result.present.push({
          concept: correctWord,
          studentUsed: match.studentWord,
          confidence:
            match.relationship === "exact"
              ? 0.95
              : 0.75,
          source: "answer_comparison",
        });
      }
    }
  }

  // Remove duplicates.
  result.present = deduplicateEvidence(
    result.present
  );

  result.missing = deduplicateEvidence(
    result.missing
  );

  // ----------------------------------------------------------
  // Calculate conservative coverage
  // ----------------------------------------------------------

  const uniqueCorrectConcepts = new Set(
    correctTokens
      .filter((token) => !STOP.has(token))
  );

  const matched = result.present.filter(
    (item) =>
      item.source === "answer_comparison" ||
      item.source === "essential_term"
  );

  const denominator =
    uniqueCorrectConcepts.size ||
    requiredConcepts.length ||
    1;

  const rawCoverage =
    matched.length / denominator;

  const coverage = Math.min(
    1,
    Math.max(0, rawCoverage)
  );

  return {
    ...result,
    coverage,
  };
}

// ============================================================================
// CONTRADICTION ANALYSIS
// ============================================================================

function analyseContradictions(
  studentAnswer,
  correctAnswer
) {
  const studentConcepts = extractConcepts(
    studentAnswer
  );

  const correctConcepts = new Set(
    extractConcepts(correctAnswer).map(
      (item) => item.concept
    )
  );

  const contradictions = [];

  for (const studentConcept of studentConcepts) {
    const opposite =
      OPPOSITES[studentConcept.concept];

    if (!opposite) continue;

    if (correctConcepts.has(opposite)) {
      contradictions.push({
        type: "contradiction",
        studentConcept: studentConcept.concept,
        expectedConcept: opposite,
        evidence: studentConcept.evidence,
        severity: "high",
      });
    }
  }

  return contradictions;
}

// ============================================================================
// MISCONCEPTION ANALYSIS
// ============================================================================

function analyseMisconceptions(
  studentAnswer,
  correctAnswer,
  assessment = {}
) {
  const knownMisconceptions =
    Array.isArray(
      assessment.commonMisconceptions
    )
      ? assessment.commonMisconceptions
      : [];

  const studentNorm = normalizeStr(
    studentAnswer
  );

  const detected = [];

  for (const misconception of knownMisconceptions) {
    if (
      typeof misconception === "string" &&
      studentNorm.includes(
        normalizeStr(misconception)
      )
    ) {
      detected.push({
        type: "known_misconception",
        misconception,
        confidence: 0.85,
      });
    }

    if (
      typeof misconception === "object" &&
      misconception.patterns
    ) {
      const patterns = Array.isArray(
        misconception.patterns
      )
        ? misconception.patterns
        : [];

      const matchedPattern = patterns.find(
        (pattern) =>
          studentNorm.includes(
            normalizeStr(pattern)
          )
      );

      if (matchedPattern) {
        detected.push({
          type: "known_misconception",
          misconception:
            misconception.id ||
            misconception.description ||
            "unknown",
          evidence: matchedPattern,
          confidence: 0.9,
        });
      }
    }
  }

  // Contradictions are also strong evidence of a misconception.
  const contradictions =
    analyseContradictions(
      studentAnswer,
      correctAnswer
    );

  for (const contradiction of contradictions) {
    detected.push({
      type: "concept_confusion",
      misconception: `${contradiction.studentConcept}_instead_of_${contradiction.expectedConcept}`,
      evidence: contradiction.evidence,
      confidence: 0.88,
    });
  }

  return deduplicateEvidence(
    detected
  );
}

// ============================================================================
// QUALIFIER ANALYSIS
// ============================================================================

function analyseQualifiers(
  studentAnswer,
  correctAnswer,
  assessment = {}
) {
  const studentNorm = normalizeStr(
    studentAnswer
  );

  const correctNorm = normalizeStr(
    correctAnswer
  );

  const requiredQualifiers =
    Array.isArray(
      assessment.requiredQualifiers
    )
      ? assessment.requiredQualifiers
      : [];

  const qualifiers = [
    ...new Set([
      ...QUALIFIERS,
      ...requiredQualifiers.map(normalizeStr),
    ]),
  ];

  const missing = [];

  for (const qualifier of qualifiers) {
    if (
      correctNorm.includes(qualifier) &&
      !studentNorm.includes(qualifier)
    ) {
      missing.push({
        qualifier,
        severity:
          requiredQualifiers.includes(qualifier)
            ? "high"
            : "medium",
      });
    }
  }

  return missing;
}

// ============================================================================
// REASONING ANALYSIS
// ============================================================================

function analyseReasoning(
  studentAnswer,
  correctAnswer,
  userWork,
  assessment = {}
) {
  const reasoning = {
    present: Boolean(userWork),
    quality: "unknown",
    score: null,
    evidence: [],
  };

  if (!userWork) {
    reasoning.quality =
      assessment.requiresReasoning
        ? "missing"
        : "not_provided";

    reasoning.score =
      assessment.requiresReasoning
        ? 0
        : null;

    return reasoning;
  }

  const workTokens = tokenize(userWork);
  const answerTokens = tokenize(
    correctAnswer
  );

  if (!workTokens.length) {
    reasoning.quality = "empty";
    reasoning.score = 0;
    return reasoning;
  }

  const matchingConcepts =
    answerTokens.filter((token) =>
      workTokens.includes(token)
    );

  const conceptRatio =
    answerTokens.length > 0
      ? matchingConcepts.length /
        answerTokens.length
      : 0;

  reasoning.score = Math.round(
    Math.min(1, conceptRatio) * 100
  );

  if (reasoning.score >= 70) {
    reasoning.quality = "substantial";
  } else if (reasoning.score >= 35) {
    reasoning.quality = "partial";
  } else {
    reasoning.quality = "weak";
  }

  reasoning.evidence =
    matchingConcepts.slice(0, 10);

  return reasoning;
}

// ============================================================================
// MATH ANALYSIS
// ============================================================================

function extractNumbers(text) {
  return (
    String(text || "").match(
      /-?\d+(?:\.\d+)?/g
    ) || []
  ).map(Number);
}

function analyseMathSteps(
  questionSteps,
  studentAnswer,
  userWork,
  correctAnswer
) {
  const combinedWorking = [
    userWork,
    studentAnswer,
  ]
    .filter(Boolean)
    .join("\n");

  if (!questionSteps?.length) {
    return {
      type: "math_analysis",
      steps: [],
      firstFailedStepIndex: -1,
      reasoningScore: null,
      diagnosticConfidence: 0.25,
    };
  }

  const studentNumbers =
    extractNumbers(combinedWorking);

  const feedback = [];
  let firstFailedStepIndex = -1;

  questionSteps.forEach((step, index) => {
    const stepNumber = index + 1;

    const cleanStep = String(step)
      .replace(
        /^step\s*\d+\s*[:-]/i,
        ""
      )
      .trim();

    const expectedNumbers =
      extractNumbers(cleanStep);

    const matchingNumbers =
      expectedNumbers.filter((number) =>
        studentNumbers.includes(number)
      );

    const numberCoverage =
      expectedNumbers.length > 0
        ? matchingNumbers.length /
          expectedNumbers.length
        : 0;

    // --------------------------------------------------------
    // Sign errors
    // --------------------------------------------------------

    const signErrors = [];

    for (const expected of expectedNumbers) {
      if (
        expected !== 0 &&
        !studentNumbers.includes(expected) &&
        studentNumbers.includes(-expected)
      ) {
        signErrors.push({
          expected,
          studentGot: -expected,
        });
      }
    }

    // --------------------------------------------------------
    // IMPORTANT:
    // Numerical overlap alone is NOT enough to declare
    // a mathematical step correct.
    // --------------------------------------------------------

    let status = "uncertain";

    if (
      expectedNumbers.length > 0 &&
      numberCoverage >= 0.75 &&
      signErrors.length === 0
    ) {
      status = "supported";
    } else if (
      signErrors.length > 0
    ) {
      status = "incorrect";
    }

    if (
      status === "supported" &&
      firstFailedStepIndex === -1
    ) {
      feedback.push({
        type: "step_correct",
        step: stepNumber,
        icon: "✓",
        confidence: 0.7,
        message:
          `Step ${stepNumber} appears consistent with the expected result.`
      });

      return;
    }

    if (
      status === "incorrect" &&
      firstFailedStepIndex === -1
    ) {
      firstFailedStepIndex = index;

      const signError =
        signErrors[0];

      feedback.push({
        type: "step_wrong",
        step: stepNumber,
        icon: "✗",
        confidence: 0.9,
        errorType: "sign_error",
        message:
          `Step ${stepNumber} appears to contain a sign error: ` +
          `expected ${signError.expected}, ` +
          `but ${signError.studentGot} was found.`
      });

      return;
    }

    if (
      firstFailedStepIndex !== -1
    ) {
      feedback.push({
        type: "step_unverified",
        step: stepNumber,
        icon: "⚠",
        confidence: 0.95,
        message:
          `Step ${stepNumber} could not be reliably evaluated because an earlier step requires correction.`
      });

      return;
    }

    feedback.push({
      type: "step_unverified",
      step: stepNumber,
      icon: "⚠",
      confidence: 0.25,
      message:
        `Step ${stepNumber} could not be reliably verified from the available evidence.`
    });
  });

  const reasoningScore =
    firstFailedStepIndex === -1
      ? 100
      : Math.round(
          (firstFailedStepIndex /
            questionSteps.length) *
            100
        );

  return {
    type: "math_analysis",
    steps: feedback,
    firstFailedStepIndex,
    reasoningScore,
    diagnosticConfidence:
      firstFailedStepIndex === -1
        ? 0.75
        : 0.85,
    correctAnswer,
  };
}

// ============================================================================
// EVIDENCE DEDUPLICATION
// ============================================================================

function deduplicateEvidence(items) {
  const seen = new Map();

  for (const item of items) {
    const key =
      item.concept ||
      item.misconception ||
      item.qualifier ||
      JSON.stringify(item);

    if (!seen.has(key)) {
      seen.set(key, item);
    }
  }

  return [...seen.values()];
}

// ============================================================================
// DIAGNOSTIC CLASSIFICATION
// ============================================================================

function determineDiagnosis({
  isAnswerCorrect,
  conceptCoverage,
  missingConcepts,
  incorrectConcepts,
  contradictions,
  misconceptions,
  missingQualifiers,
  reasoning,
}) {
  if (contradictions.length > 0) {
    return {
      type: "conceptual_contradiction",
      severity: "high",
    };
  }

  if (misconceptions.length > 0) {
    return {
      type: "misconception",
      severity: "high",
    };
  }

  if (incorrectConcepts.length > 0) {
    return {
      type: "incorrect_concept",
      severity: "high",
    };
  }

  if (
    missingConcepts.length > 0 &&
    conceptCoverage < 0.7
  ) {
    return {
      type: "knowledge_gap",
      severity: "medium",
    };
  }

  if (
    missingQualifiers.length > 0
  ) {
    return {
      type: "incomplete_precision",
      severity: "medium",
    };
  }

  if (
    isAnswerCorrect &&
    reasoning.quality === "weak"
  ) {
    return {
      type: "correct_answer_weak_reasoning",
      severity: "medium",
    };
  }

  if (
    isAnswerCorrect &&
    reasoning.quality === "substantial"
  ) {
    return {
      type: "demonstrated_understanding",
      severity: "low",
    };
  }

  if (conceptCoverage >= 0.7) {
    return {
      type: "mostly_understood",
      severity: "low",
    };
  }

  return {
    type: "insufficient_evidence",
    severity: "medium",
  };
}

// ============================================================================
// MAIN ANALYSER
// ============================================================================

export function analyseStudentAnswer(
  studentAnswer,
  correctAnswer,
  question = {},
  userWork = "",
  options = {}
) {
  const studentNorm =
    normalizeStr(studentAnswer);

  const assessment =
    question.assessment || {};

  // ----------------------------------------------------------
  // Empty response
  // ----------------------------------------------------------

  if (!studentNorm) {
    return {
      type: "diagnostic_analysis",

      correctness: {
        status: "incorrect",
        confidence: 1,
      },

      understanding: {
        score: 0,
        level: "no_evidence",
      },

      diagnosis: {
        type: "no_response",
        severity: "high",
      },

      concepts: {
        present: [],
        missing: [],
        incorrect: [],
      },

      misconceptions: [],

      contradictions: [],

      missingQualifiers: [],

      reasoning: {
        present: false,
        quality: "missing",
        score: 0,
      },

      diagnosticConfidence: 1,

      feedback: [
        {
          type: "no_response",
          icon: "✗",
          message:
            "No answer was provided, so Tixar cannot yet determine what you understand.",
        },
      ],

      studentSaid: "",
      correctAnswer,
    };
  }

  // ----------------------------------------------------------
  // Math path
  // ----------------------------------------------------------

  const mathAnalysis =
    Array.isArray(question.steps) &&
    question.steps.length > 0
      ? analyseMathSteps(
          question.steps,
          studentAnswer,
          userWork,
          correctAnswer
        )
      : null;

  // ----------------------------------------------------------
  // Concept analysis
  // ----------------------------------------------------------

  const coverage =
    analyseConceptCoverage(
      studentAnswer,
      correctAnswer,
      assessment
    );

  const contradictions =
    analyseContradictions(
      studentAnswer,
      correctAnswer
    );

  const misconceptions =
    analyseMisconceptions(
      studentAnswer,
      correctAnswer,
      assessment
    );

  const missingQualifiers =
    analyseQualifiers(
      studentAnswer,
      correctAnswer,
      assessment
    );

  const reasoning =
    analyseReasoning(
      studentAnswer,
      correctAnswer,
      userWork,
      assessment
    );

  // ----------------------------------------------------------
  // Determine answer correctness
  //
  // IMPORTANT:
  // This function is a diagnostic engine, not the final
  // answer matcher. Grader.js supplies the authoritative
  // correctness result.
  // ----------------------------------------------------------

  const externallySuppliedCorrectness =
    options.isAnswerCorrect;

  const isAnswerCorrect =
    typeof externallySuppliedCorrectness ===
    "boolean"
      ? externallySuppliedCorrectness
      : false;

  // ----------------------------------------------------------
  // Understanding score
  // ----------------------------------------------------------

  let understandingScore =
    coverage.coverage * 100;

  // Penalise contradictions heavily.
  understandingScore -=
    contradictions.length * 25;

  // Penalise confirmed misconceptions.
  understandingScore -=
    misconceptions.length * 20;

  // Penalise missing essential qualifiers.
  understandingScore -=
    missingQualifiers.filter(
      (item) => item.severity === "high"
    ).length * 10;

  understandingScore = Math.round(
    Math.max(
      0,
      Math.min(
        100,
        understandingScore
      )
    )
  );

  // ----------------------------------------------------------
  // Understanding level
  // ----------------------------------------------------------

  let understandingLevel;

  if (understandingScore >= 85) {
    understandingLevel = "strong";
  } else if (understandingScore >= 70) {
    understandingLevel = "good";
  } else if (understandingScore >= 40) {
    understandingLevel = "partial";
  } else {
    understandingLevel = "weak";
  }

  // ----------------------------------------------------------
  // Diagnosis
  // ----------------------------------------------------------

  const diagnosis =
    determineDiagnosis({
      isAnswerCorrect,
      conceptCoverage:
        coverage.coverage,
      missingConcepts:
        coverage.missing,
      incorrectConcepts:
        coverage.incorrect,
      contradictions,
      misconceptions,
      missingQualifiers,
      reasoning,
    });

  // ----------------------------------------------------------
  // Diagnostic confidence
  // ----------------------------------------------------------

  let diagnosticConfidence = 0.65;

  if (
    coverage.present.length > 0 ||
    coverage.missing.length > 0
  ) {
    diagnosticConfidence += 0.1;
  }

  if (
    contradictions.length > 0
  ) {
    diagnosticConfidence += 0.15;
  }

  if (
    misconceptions.length > 0
  ) {
    diagnosticConfidence += 0.1;
  }

  if (
    mathAnalysis
  ) {
    diagnosticConfidence =
      Math.max(
        diagnosticConfidence,
        mathAnalysis.diagnosticConfidence
      );
  }

  diagnosticConfidence =
    Math.min(
      0.99,
      diagnosticConfidence
    );

  // ----------------------------------------------------------
  // Feedback
  // ----------------------------------------------------------

  const feedback = [];

  for (const item of coverage.missing) {
    feedback.push({
      type: "missing_concept",
      icon: "✗",
      concept: item.concept,
      severity: item.importance,
      message:
        `Your answer does not demonstrate the required concept "${item.concept}".`,
    });
  }

  for (const contradiction of contradictions) {
    feedback.push({
      type: "contradiction",
      icon: "✗",
      severity: "high",
      message:
        `You used "${contradiction.studentConcept}" where the expected concept is "${contradiction.expectedConcept}". These concepts should not be treated as equivalent here.`,
    });
  }

  for (const misconception of misconceptions) {
    feedback.push({
      type: "misconception",
      icon: "✗",
      severity: "high",
      message:
        `This answer suggests a possible misconception: ${misconception.misconception}.`,
    });
  }

  for (const qualifier of missingQualifiers) {
    feedback.push({
      type: "missing_qualifier",
      icon: "⚠",
      severity: qualifier.severity,
      message:
        `Your answer may be missing the important qualifier "${qualifier.qualifier}".`,
    });
  }

  if (
    feedback.length === 0 &&
    isAnswerCorrect
  ) {
    feedback.push({
      type: "understanding_supported",
      icon: "✓",
      message:
        "Your answer is correct and the available evidence supports your understanding of the required concept.",
    });
  }

  if (
    feedback.length === 0 &&
    !isAnswerCorrect
  ) {
    feedback.push({
      type: "incorrect_attempt",
      icon: "✗",
      message:
        "Your answer is incorrect. Review the correct answer and step-by-step solution below.",
    });
  }

  return {
    type: "diagnostic_analysis",

    correctness: {
      status:
        isAnswerCorrect
          ? "correct"
          : "incorrect",

      confidence:
        typeof externallySuppliedCorrectness ===
        "boolean"
          ? 0.95
          : 0.4,
    },

    understanding: {
      score: understandingScore,
      level: understandingLevel,
    },

    diagnosis,

    concepts: {
      present: coverage.present,
      missing: coverage.missing,
      incorrect: coverage.incorrect,
    },

    misconceptions,

    contradictions,

    missingQualifiers,

    reasoning,

    math: mathAnalysis,

    diagnosticConfidence,

    feedback,

    studentSaid: studentAnswer.trim(),

    correctAnswer,

    metadata: {
      analyserVersion: "2.0",
      deterministic: true,
      semanticAIUsed: false,
    },
  };
}