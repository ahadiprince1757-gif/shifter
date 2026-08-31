/**
 * TIXAR — Engine 2: Concept Graph & Weighted Meaning Mapper
 *
 * Purpose:
 *
 *   Determine whether the student has expressed the important concepts
 *   contained in a reference answer.
 *
 * IMPORTANT:
 *
 *   This engine does NOT simply compare words.
 *
 *   It combines:
 *
 *     1. Exact concept matches
 *     2. Concept aliases / synonyms
 *     3. Semantic roles
 *     4. Semantic triples
 *     5. Essential / important / supporting weights
 *     6. Missing concept detection
 *     7. Contradiction detection
 *
 * The engine answers:
 *
 *   "How much of the underlying concept did the student express?"
 *
 * It does NOT independently decide final correctness.
 *
 * Engine 1 → parses
 * Engine 2 → maps meaning
 * Engine 3 → diagnoses errors
 * Engine 4 → tracks recurrence
 * Engine 5 → chooses the next learning action
 */

// ============================================================================
// 1. CONCEPT WEIGHT TAXONOMY
// ============================================================================

export const CONCEPT_WEIGHTS = Object.freeze({

  // --------------------------------------------------------------------------
  // Biology / General Science
  // --------------------------------------------------------------------------

  instrument: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "classification",
  },

  device: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "classification",
  },

  microscope: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "instrument",
  },

  magnify: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "primary_function",
  },

  magnification: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "primary_function",
  },

  specimen: {
    weight: 0.7,
    level: "IMPORTANT",
    role: "target_object",
  },

  small: {
    weight: 0.7,
    level: "IMPORTANT",
    role: "qualifier",
  },

  microscopic: {
    weight: 0.7,
    level: "IMPORTANT",
    role: "qualifier",
  },

  biology: {
    weight: 0.4,
    level: "SUPPORTING",
    role: "domain_context",
  },

  medicine: {
    weight: 0.4,
    level: "SUPPORTING",
    role: "domain_context",
  },

  // --------------------------------------------------------------------------
  // Physics
  // --------------------------------------------------------------------------

  density: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "governing_property",
  },

  mass: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "quantity",
  },

  volume: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "space",
  },

  float: {
    weight: 0.7,
    level: "IMPORTANT",
    role: "phenomenon",
  },

  liquid: {
    weight: 0.4,
    level: "SUPPORTING",
    role: "state",
  },

  solid: {
    weight: 0.4,
    level: "SUPPORTING",
    role: "state",
  },

  // --------------------------------------------------------------------------
  // Chemistry
  // --------------------------------------------------------------------------

  ionic: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "bond_type",
  },

  covalent: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "bond_type",
  },

  transfer: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "electron_mechanism",
  },

  share: {
    weight: 1.0,
    level: "ESSENTIAL",
    role: "electron_mechanism",
  },

  electron: {
    weight: 0.7,
    level: "IMPORTANT",
    role: "particle",
  },

  charge: {
    weight: 0.7,
    level: "IMPORTANT",
    role: "property",
  },
});

// ============================================================================
// 2. CONCEPT ALIASES
// ============================================================================

/**
 * Concepts that can represent substantially similar meanings.
 *
 * This is NOT a general-purpose thesaurus.
 *
 * Only educationally safe equivalences should be placed here.
 */
export const CONCEPT_ALIASES = Object.freeze({

  // Microscope
  instrument: [
    "device",
    "apparatus",
    "tool",
  ],

  device: [
    "instrument",
    "apparatus",
    "tool",
  ],

  magnify: [
    "enlarge",
    "increase",
    "zoom",
    "make larger",
  ],

  specimen: [
    "sample",
    "object",
    "material",
  ],

  small: [
    "tiny",
    "little",
    "minute",
  ],

  microscopic: [
    "tiny",
    "microscopic",
    "very small",
  ],

  // Physics
  mass: [
    "amount of matter",
  ],

  weight: [
    "gravitational force",
    "force due to gravity",
  ],

  // Chemistry
  transfer: [
    "give",
    "giving",
    "move",
    "moving",
  ],

  share: [
    "sharing",
    "sharing of",
  ],

  electron: [
    "electrons",
  ],

  // General relationships
  produces: [
    "creates",
    "generates",
    "forms",
    "yields",
  ],

  requires: [
    "needs",
    "depends on",
  ],
});

// ============================================================================
// 3. NEGATION / CONTRADICTION TERMS
// ============================================================================

export const NEGATION_TERMS = new Set([
  "not",
  "never",
  "cannot",
  "can't",
  "doesn't",
  "doesnt",
  "isn't",
  "isnt",
  "wrong",
  "opposite",
]);

/**
 * Known conceptual opposites.
 *
 * A student using an opposite concept should not receive
 * credit merely because some keywords overlap.
 */
const CONCEPT_OPPOSITES = Object.freeze({

  ionic: [
    "covalent",
  ],

  covalent: [
    "ionic",
  ],

  conductor: [
    "insulator",
  ],

  insulator: [
    "conductor",
  ],

  endothermic: [
    "exothermic",
  ],

  exothermic: [
    "endothermic",
  ],

  mitosis: [
    "meiosis",
  ],

  meiosis: [
    "mitosis",
  ],

  add: [
    "subtract",
  ],

  subtract: [
    "add",
  ],

  multiply: [
    "divide",
  ],

  divide: [
    "multiply",
  ],
});

// ============================================================================
// 4. BASIC NORMALIZATION
// ============================================================================

export function normalizeConceptText(
  text
) {
  return String(
    text || ""
  )
    .toLowerCase()
    .replace(
      /[“”"']/g,
      ""
    )
    .replace(
      /[\u2013\u2014−]/g,
      "-"
    )
    .replace(
      /[^\p{L}\p{N}\s-]/gu,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

export function tokenizeConceptText(
  text
) {
  return normalizeConceptText(
    text
  )
    .split(/\s+/)
    .filter(Boolean);
}

// ============================================================================
// 5. CONCEPT METADATA
// ============================================================================

export function getConceptWeight(
  word
) {
  const key =
    normalizeConceptText(
      word
    );

  return (
    CONCEPT_WEIGHTS[key] || {
      weight: 0.5,
      level: "SUPPORTING",
      role: "general",
    }
  );
}

export function getConceptLevel(
  word
) {
  return getConceptWeight(
    word
  ).level;
}

// ============================================================================
// 6. ALIAS RESOLUTION
// ============================================================================

function conceptsEquivalent(
  studentConcept,
  expectedConcept
) {
  const student =
    normalizeConceptText(
      studentConcept
    );

  const expected =
    normalizeConceptText(
      expectedConcept
    );

  if (
    !student ||
    !expected
  ) {
    return false;
  }

  if (
    student === expected
  ) {
    return true;
  }

  const aliases =
    CONCEPT_ALIASES[
      expected
    ] || [];

  if (
    aliases.some(
      alias =>
        normalizeConceptText(
          alias
        ) === student
    )
  ) {
    return true;
  }

  const reverseAliases =
    CONCEPT_ALIASES[
      student
    ] || [];

  if (
    reverseAliases.some(
      alias =>
        normalizeConceptText(
          alias
        ) === expected
    )
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// 7. PHRASE MATCHING
// ============================================================================

function phraseExists(
  text,
  phrase
) {
  const normalizedText =
    ` ${normalizeConceptText(
      text
    )} `;

  const normalizedPhrase =
    ` ${normalizeConceptText(
      phrase
    )} `;

  return normalizedText.includes(
    normalizedPhrase
  );
}

/**
 * Checks whether a concept or one of its educationally approved aliases
 * appears in the student's answer.
 */
export function conceptPresent(
  studentText,
  expectedConcept
) {
  if (
    phraseExists(
      studentText,
      expectedConcept
    )
  ) {
    return {
      matched: true,
      matchedBy: "EXACT",
      matchedConcept:
        expectedConcept,
    };
  }

  const aliases =
    CONCEPT_ALIASES[
      normalizeConceptText(
        expectedConcept
      )
    ] || [];

  for (
    const alias of aliases
  ) {
    if (
      phraseExists(
        studentText,
        alias
      )
    ) {
      return {
        matched: true,
        matchedBy: "ALIAS",
        matchedConcept:
          alias,
      };
    }
  }

  return {
    matched: false,
    matchedBy: null,
    matchedConcept: null,
  };
}

// ============================================================================
// 8. TRIPLE MATCHING
// ============================================================================

/**
 * Compare semantic relationships rather than individual words.
 *
 * Example:
 *
 * Reference:
 *
 *   microscope → USED_FOR → magnifying specimens
 *
 * Student:
 *
 *   microscope → USED_FOR → enlarging samples
 *
 * should receive substantial credit.
 */
function compareSemanticTriples(
  studentTriples = [],
  expectedTriples = []
) {
  if (
    !Array.isArray(
      studentTriples
    ) ||
    !Array.isArray(
      expectedTriples
    )
  ) {
    return [];
  }

  const matches = [];

  for (
    const expected of expectedTriples
  ) {
    if (
      !expected ||
      !expected.subject ||
      !expected.predicate ||
      !expected.object
    ) {
      continue;
    }

    let bestMatch = null;

    for (
      const student of studentTriples
    ) {
      if (
        !student ||
        !student.subject ||
        !student.predicate ||
        !student.object
      ) {
        continue;
      }

      if (
        normalizeConceptText(
          student.predicate
        ) !==
        normalizeConceptText(
          expected.predicate
        )
      ) {
        continue;
      }

      const subjectMatch =
        conceptsEquivalent(
          student.subject,
          expected.subject
        );

      const objectMatch =
        conceptsEquivalent(
          student.object,
          expected.object
        ) ||
        phraseConceptOverlap(
          student.object,
          expected.object
        );

      const score =
        (subjectMatch
          ? 0.5
          : 0) +
        (objectMatch
          ? 0.5
          : 0);

      if (
        score > 0 &&
        (
          !bestMatch ||
          score >
            bestMatch.score
        )
      ) {
        bestMatch = {
          expected,
          student,
          score,
          subjectMatch,
          objectMatch,
        };
      }
    }

    if (
      bestMatch
    ) {
      matches.push(
        bestMatch
      );
    }
  }

  return matches;
}

function phraseConceptOverlap(
  a,
  b
) {
  const aTokens =
    new Set(
      tokenizeConceptText(
        a
      )
    );

  const bTokens =
    tokenizeConceptText(
      b
    );

  if (
    bTokens.length === 0
  ) {
    return false;
  }

  const matched =
    bTokens.filter(
      token =>
        aTokens.has(
          token
        )
    ).length;

  return (
    matched /
      bTokens.length >=
    0.5
  );
}

// ============================================================================
// 9. CONTRADICTION DETECTION
// ============================================================================

function findContradictions(
  studentTokens,
  correctTokens
) {
  const studentSet =
    new Set(
      studentTokens.map(
        normalizeConceptText
      )
    );

  const contradictions =
    [];

  for (
    const expected of correctTokens
  ) {
    const expectedKey =
      normalizeConceptText(
        expected
      );

    const opposites =
      CONCEPT_OPPOSITES[
        expectedKey
      ] || [];

    for (
      const opposite of opposites
    ) {
      const oppositeKey =
        normalizeConceptText(
          opposite
        );

      if (
        studentSet.has(
          oppositeKey
        )
      ) {
        contradictions.push({
          expected:
            expectedKey,

          student:
            oppositeKey,

          type:
            "CONCEPTUAL_CONTRADICTION",
        });
      }
    }
  }

  return contradictions;
}

// ============================================================================
// 10. WEIGHTED CONCEPT EVALUATION
// ============================================================================

/**
 * Main Engine 2 function.
 *
 * @param {Object} input
 * @returns {Object}
 */
export function evaluateConceptGraph(
  input = {}
) {
  /*
   * Support both the new object API and the old positional API.
   */
  const {
    studentTriples = [],
    expectedTriples = [],
    studentTokens = [],
    correctTokens = [],
    studentText = "",
    _correctText = "",
  } = Array.isArray(input)
    ? {
        studentTriples:
          input[0] || [],
        studentTokens:
          input[1] || [],
        correctTokens:
          input[2] || [],
      }
    : input;

  const normalizedStudentText =
    studentText ||
    studentTokens.join(
      " "
    );

  const studentSet =
    new Set(
      studentTokens
        .map(
          normalizeConceptText
        )
        .filter(Boolean)
    );

  const correctSet =
    new Set(
      correctTokens
        .map(
          normalizeConceptText
        )
        .filter(Boolean)
    );

  // --------------------------------------------------------------------------
  // CONCEPT MATCHING
  // --------------------------------------------------------------------------

  const essentialMet = [];
  const essentialMissing = [];

  const importantMet = [];
  const importantMissing = [];

  const supportingMet = [];
  const supportingMissing = [];

  let totalWeight = 0;
  let earnedWeight = 0;

  const matchedConcepts = [];
  const unmatchedConcepts = [];

  for (
    const expectedConcept of correctSet
  ) {
    const metadata =
      getConceptWeight(
        expectedConcept
      );

    totalWeight +=
      metadata.weight;

    const match =
      findBestConceptMatch(
        expectedConcept,
        studentSet,
        normalizedStudentText
      );

    if (
      match.matched
    ) {
      earnedWeight +=
        metadata.weight;

      const record = {
        concept:
          expectedConcept,

        weight:
          metadata.weight,

        level:
          metadata.level,

        role:
          metadata.role,

        matchedConcept:
          match.matchedConcept,

        matchedBy:
          match.matchedBy,
      };

      matchedConcepts.push(
        record
      );

      if (
        metadata.level ===
        "ESSENTIAL"
      ) {
        essentialMet.push(
          expectedConcept
        );
      } else if (
        metadata.level ===
        "IMPORTANT"
      ) {
        importantMet.push(
          expectedConcept
        );
      } else {
        supportingMet.push(
          expectedConcept
        );
      }
    } else {
      const record = {
        concept:
          expectedConcept,

        weight:
          metadata.weight,

        level:
          metadata.level,

        role:
          metadata.role,
      };

      unmatchedConcepts.push(
        record
      );

      if (
        metadata.level ===
        "ESSENTIAL"
      ) {
        essentialMissing.push(
          expectedConcept
        );
      } else if (
        metadata.level ===
        "IMPORTANT"
      ) {
        importantMissing.push(
          expectedConcept
        );
      } else {
        supportingMissing.push(
          expectedConcept
        );
      }
    }
  }

  // --------------------------------------------------------------------------
  // SEMANTIC RELATIONSHIP MATCHING
  // --------------------------------------------------------------------------

  const tripleMatches =
    compareSemanticTriples(
      studentTriples,
      expectedTriples
    );

  const tripleScore =
    expectedTriples.length > 0
      ? Math.round(
          (tripleMatches.length /
            expectedTriples.length) *
            100
        )
      : null;

  // --------------------------------------------------------------------------
  // CONTRADICTIONS
  // --------------------------------------------------------------------------

  const contradictions =
    findContradictions(
      studentTokens,
      correctTokens
    );

  /*
   * A contradiction is more serious than a missing supporting keyword.
   *
   * Example:
   *
   * Correct:
   *   "Ionic bonds involve electron transfer."
   *
   * Student:
   *   "Ionic bonds involve electron sharing."
   *
   * "electron" is present, but the student's model is wrong.
   */

  const contradictionPenalty =
    calculateContradictionPenalty(
      contradictions,
      totalWeight
    );

  // --------------------------------------------------------------------------
  // WEIGHTED SCORE
  // --------------------------------------------------------------------------

  const rawWeightedScore =
    totalWeight > 0
      ? (earnedWeight /
          totalWeight) *
        100
      : 0;

  const weightedScore =
    Math.round(
      clamp(
        rawWeightedScore -
          contradictionPenalty,
        0,
        100
      )
    );

  // --------------------------------------------------------------------------
  // ESSENTIAL CONCEPT SATISFACTION
  // --------------------------------------------------------------------------

  const isEssentialSatisfied =
    essentialMissing.length ===
      0 &&
    contradictions.length ===
      0;

  // --------------------------------------------------------------------------
  // CONCEPTUAL UNDERSTANDING LEVEL
  // --------------------------------------------------------------------------

  const understandingLevel =
    determineUnderstandingLevel(
      weightedScore,
      essentialMissing,
      contradictions,
      importantMissing
    );

  // --------------------------------------------------------------------------
  // RETURN
  // --------------------------------------------------------------------------

  return {
    weightedScore,

    rawWeightedScore:
      Math.round(
        rawWeightedScore
      ),

    isEssentialSatisfied,

    understandingLevel,

    essentialMet,
    essentialMissing,

    importantMet,
    importantMissing,

    supportingMet,
    supportingMissing,

    matchedConcepts,
    unmatchedConcepts,

    contradictions,

    contradictionPenalty,

    tripleMatches,

    tripleScore,

    totalWeight,
    earnedWeight,

    coverage:
      calculateCoverage(
        correctSet,
        studentSet
      ),

    confidence:
      calculateGraphConfidence({
        correctCount:
          correctSet.size,

        matchedCount:
          matchedConcepts.length,

        tripleScore,

        contradictions,
      }),
  };
}

// ============================================================================
// 11. BEST CONCEPT MATCH
// ============================================================================

function findBestConceptMatch(
  expectedConcept,
  studentSet,
  studentText
) {
  const expected =
    normalizeConceptText(
      expectedConcept
    );

  if (
    studentSet.has(
      expected
    ) ||
    phraseExists(
      studentText,
      expected
    )
  ) {
    return {
      matched: true,
      matchedBy: "EXACT",
      matchedConcept:
        expected,
    };
  }

  const aliases =
    CONCEPT_ALIASES[
      expected
    ] || [];

  for (
    const alias of aliases
  ) {
    const normalizedAlias =
      normalizeConceptText(
        alias
      );

    if (
      studentSet.has(
        normalizedAlias
      ) ||
      phraseExists(
        studentText,
        normalizedAlias
      )
    ) {
      return {
        matched: true,
        matchedBy: "ALIAS",
        matchedConcept:
          normalizedAlias,
      };
    }
  }

  /*
   * Multi-word concepts such as:
   *
   * "amount of matter"
   *
   * need phrase matching.
   */
  for (
    const [concept, aliasesForConcept] of
      Object.entries(
        CONCEPT_ALIASES
      )
  ) {
    if (
      normalizeConceptText(
        concept
      ) !== expected
    ) {
      continue;
    }

    for (
      const alias of aliasesForConcept
    ) {
      if (
        phraseExists(
          studentText,
          alias
        )
      ) {
        return {
          matched: true,
          matchedBy: "PHRASE_ALIAS",
          matchedConcept:
            alias,
        };
      }
    }
  }

  return {
    matched: false,
    matchedBy: null,
    matchedConcept: null,
  };
}

// ============================================================================
// 12. COVERAGE
// ============================================================================

function calculateCoverage(
  correctSet,
  studentSet
) {
  if (
    correctSet.size ===
    0
  ) {
    return 0;
  }

  let matched = 0;

  for (
    const concept of correctSet
  ) {
    if (
      studentSet.has(
        concept
      )
    ) {
      matched++;
      continue;
    }

    const aliases =
      CONCEPT_ALIASES[
        concept
      ] || [];

    if (
      aliases.some(
        alias =>
          studentSet.has(
            normalizeConceptText(
              alias
            )
          )
      )
    ) {
      matched++;
    }
  }

  return Math.round(
    (matched /
      correctSet.size) *
      100
  );
}

// ============================================================================
// 13. CONTRADICTION PENALTY
// ============================================================================

function calculateContradictionPenalty(
  contradictions,
  totalWeight
) {
  if (
    !Array.isArray(
      contradictions
    ) ||
    contradictions.length ===
      0 ||
    totalWeight <= 0
  ) {
    return 0;
  }

  /*
   * Essential conceptual contradictions receive a strong penalty.
   *
   * We deliberately cap the penalty so that this engine
   * doesn't become the final grader.
   */
  return Math.min(
    40,
    contradictions.length *
      25
  );
}

// ============================================================================
// 14. UNDERSTANDING LEVEL
// ============================================================================

function determineUnderstandingLevel(
  score,
  essentialMissing,
  contradictions,
  importantMissing
) {
  if (
    contradictions.length >
    0
  ) {
    return "MISCONCEPTION";
  }

  if (
    essentialMissing.length >
    0
  ) {
    return "INCOMPLETE_CORE";
  }

  if (
    score >= 85 &&
    importantMissing.length ===
      0
  ) {
    return "STRONG";
  }

  if (
    score >= 70
  ) {
    return "FUNCTIONAL";
  }

  if (
    score >= 50
  ) {
    return "PARTIAL";
  }

  return "WEAK";
}

// ============================================================================
// 15. CONFIDENCE
// ============================================================================

function calculateGraphConfidence({
  correctCount,
  matchedCount,
  tripleScore,
  contradictions,
}) {
  if (
    correctCount <= 0
  ) {
    return 0;
  }

  const conceptCoverage =
    matchedCount /
    correctCount;

  let confidence =
    conceptCoverage * 70;

  if (
    tripleScore !== null
  ) {
    confidence +=
      (tripleScore / 100) *
      30;
  }

  if (
    contradictions.length >
    0
  ) {
    confidence -=
      contradictions.length *
      20;
  }

  return Math.round(
    clamp(
      confidence,
      0,
      100
    )
  );
}

// ============================================================================
// 16. UTILITY
// ============================================================================

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    max,
    Math.max(
      min,
      Number.isFinite(
        value
      )
        ? value
        : min
    )
  );
}
