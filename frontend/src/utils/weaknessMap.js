/**
 * weaknessMap.js
 *
 * Converts failedQuestions[] from useQuiz into a WeaknessMap.
 *
 * Instead of repairing every wrong question independently, Tixar groups
 * failures by concept and performs one targeted repair cycle per concept.
 *
 * WeaknessMap shape:
 *
 * {
 *   [conceptTag]: {
 *     conceptTag: string,
 *     prerequisiteSkill: string,
 *     rootCause: string,
 *     remediationAction: string,
 *     questions: Array<{
 *       qIdx: number,
 *       questionText: string,
 *       correctAnswer: string,
 *       solution: string,
 *       mark: string|number,
 *       originalQ: object|null
 *     }>,
 *     repairTaught: boolean,
 *     repairPassed: boolean
 *   }
 * }
 */

/* -------------------------------------------------------------------------- */
/* 1. CONCEPT TAG DERIVATION                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Derive a stable concept tag from a question object.
 *
 * Priority:
 * 1. q.concept_tag supplied by backend.
 * 2. q.conceptTag supplied by backend.
 * 3. A deterministic slug derived from the question text.
 * 4. question_<qIdx> as the final fallback.
 *
 * @param {Object|null} q
 * @param {number} qIdx
 * @returns {string}
 */
function deriveConceptTag(q, qIdx) {
  const explicitTag =
    typeof q?.concept_tag === "string"
      ? q.concept_tag
      : typeof q?.conceptTag === "string"
        ? q.conceptTag
        : "";

  if (explicitTag.trim()) {
    return normalizeConceptTag(explicitTag);
  }

  const text =
    typeof q?.q === "string"
      ? q.q
      : typeof q?.question === "string"
        ? q.question
        : "";

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length > 3)
    .filter((word) => !STOP_WORDS.has(word))
    .slice(0, 4);

  if (words.length > 0) {
    return words.join("_");
  }

  return `question_${Number.isInteger(qIdx) ? qIdx : 0}`;
}

/**
 * Normalize concept tags.
 *
 * @param {string} value
 * @returns {string}
 */
function normalizeConceptTag(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 100);
}

/**
 * Common words that should not determine a concept tag.
 */
const STOP_WORDS = new Set([
  "what",
  "which",
  "where",
  "when",
  "this",
  "that",
  "these",
  "those",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "calculate",
  "find",
  "determine",
  "given",
  "following",
  "using",
  "answer",
  "question",
  "value",
  "values",
]);

/* -------------------------------------------------------------------------- */
/* 2. PREREQUISITE / ROOT-CAUSE ANALYSIS                                     */
/* -------------------------------------------------------------------------- */

/**
 * Derive the likely prerequisite skill and root cause for a failed concept.
 *
 * This is a heuristic layer. It should be treated as a diagnostic hint,
 * not as absolute proof of the student's misconception.
 *
 * @param {string} qText
 * @returns {Object}
 */
function derivePrerequisiteAnalysis(qText) {
  const text = String(qText || "").toLowerCase();

  /* Geometry */
  if (
    /\b(area|perimeter|rectangle|triangle|circle|radius|diameter|length|width|height|circumference)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill: "Geometric Dimensional Properties & Formulas",
      rootCause:
        "Possible confusion between geometric dimensions and the formula required for the quantity being calculated.",
      remediationAction:
        "Identify the required quantity first, label the relevant dimensions, then apply the correct geometric formula.",
    };
  }

  /* Algebra */
  if (
    /\b(solve|equation|algebra|factor|factoring|quadratic|polynomial|expand|simplify|variable|coefficient)\b/i.test(text) ||
    /[a-z]\s*=/.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Algebraic Equivalence & Inverse Operations",
      rootCause:
        "Possible misapplication of algebraic transformations or inverse operations while maintaining equality.",
      remediationAction:
        "Identify the variable term and apply the same valid operation to both sides of the equation.",
    };
  }

  /* Speed / Kinematics */
  if (
    /\b(speed|velocity|acceleration|distance|time|rate|km\/h|m\/s|seconds?|hours?)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Rate & Kinematic Relations",
      rootCause:
        "Possible confusion between the relationships among distance, speed, time, velocity, and acceleration.",
      remediationAction:
        "Identify the known quantities and select the correct relationship before substituting values.",
    };
  }

  /* Percentage / Finance */
  if (
    /%/.test(text) ||
    /\b(percent|percentage|profit|loss|discount|interest|principal|rate|shilling|ksh)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Percentage Proportions & Base Quantity Calculation",
      rootCause:
        "Possible failure to identify the correct base quantity before applying the percentage rate.",
      remediationAction:
        "Identify the original quantity as the 100% baseline before calculating the percentage change.",
    };
  }

  /* Fractions / ratios */
  if (
    /\b(fraction|fractions|numerator|denominator|ratio|proportion|equivalent)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Fraction, Ratio & Proportion Relationships",
      rootCause:
        "Possible confusion about equivalent ratios, proportional relationships, or fraction operations.",
      remediationAction:
        "Identify the quantities being compared and preserve equivalent relationships while calculating.",
    };
  }

  /* Chemistry */
  if (
    /\b(ionic|covalent|atom|molecule|electron|proton|neutron|bonding|chemical|reaction|compound)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Atomic Structure & Chemical Relationships",
      rootCause:
        "Possible confusion between particles, bonding mechanisms, or chemical relationships.",
      remediationAction:
        "Identify the particles involved and recall the governing chemical rule before answering.",
    };
  }

  /* Physics */
  if (
    /\b(force|mass|weight|energy|work|power|pressure|density|current|voltage|resistance|circuit)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Physical Quantities & Governing Relationships",
      rootCause:
        "Possible confusion between physical quantities or the formula connecting them.",
      remediationAction:
        "Identify each physical quantity, its unit, and the governing relationship before calculating.",
    };
  }

  /* Biology */
  if (
    /\b(cell|mitosis|meiosis|photosynthesis|respiration|organelle|nucleus|chromosome|tissue|organism)\b/i.test(text)
  ) {
    return {
      prerequisiteSkill:
        "Biological Structures & Processes",
      rootCause:
        "Possible confusion between biological structures, functions, or processes.",
      remediationAction:
        "Identify the biological structure or process first, then connect it to its defining function.",
    };
  }

  /* Default */
  return {
    prerequisiteSkill:
      "Core Operational Logic & Rule Application",
    rootCause:
      "Possible gap in the core rule, concept, or procedure required to solve the question.",
    remediationAction:
      "Review the core concept, identify the governing rule, and apply it step by step.",
  };
}

/* -------------------------------------------------------------------------- */
/* 3. BUILD WEAKNESS MAP                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Build a WeaknessMap from failed questions produced by useQuiz.
 *
 * @param {Array<Object>} failedQuestions
 * @param {Array<Object>} allQuestions
 * @returns {Object}
 */
export function buildWeaknessMap(
  failedQuestions = [],
  allQuestions = []
) {
  if (!Array.isArray(failedQuestions)) {
    return {};
  }

  const questions =
    Array.isArray(allQuestions)
      ? allQuestions
      : [];

  const map = {};

  for (const failed of failedQuestions) {
    if (!failed || typeof failed !== "object") {
      continue;
    }

    const qIdx = Number.isInteger(failed.qIdx)
      ? failed.qIdx
      : Number.isInteger(failed.index)
        ? failed.index
        : -1;

    const originalQ =
      qIdx >= 0 && qIdx < questions.length
        ? questions[qIdx]
        : null;

    const qText =
      typeof failed.question === "string"
        ? failed.question.trim()
        : typeof failed.questionText === "string"
          ? failed.questionText.trim()
          : typeof originalQ?.q === "string"
            ? originalQ.q.trim()
            : "";

    const conceptTag = deriveConceptTag(
      originalQ,
      qIdx
    );

    const diagnostic =
      derivePrerequisiteAnalysis(qText);

    if (!map[conceptTag]) {
      map[conceptTag] = {
        conceptTag,

        prerequisiteSkill:
          diagnostic.prerequisiteSkill,

        rootCause:
          diagnostic.rootCause,

        remediationAction:
          diagnostic.remediationAction,

        questions: [],

        repairTaught: false,

        repairPassed: false,
      };
    }

    /*
     * Avoid adding the exact same question twice.
     */
    const alreadyAdded =
      map[conceptTag].questions.some(
        (item) => item.qIdx === qIdx
      );

    if (alreadyAdded) {
      continue;
    }

    const correctAnswer =
      failed.correctAnswer ??
      failed.ans ??
      originalQ?.ans ??
      "";

    const solution =
      failed.solution ??
      failed.sol ??
      failed.why ??
      originalQ?.sol ??
      originalQ?.why ??
      "";

    const mark =
      failed.mark ??
      originalQ?.mark ??
      "";

    map[conceptTag].questions.push({
      qIdx,
      questionText: qText,
      correctAnswer: String(correctAnswer),
      solution: String(solution),
      mark,
      originalQ,
    });
  }

  return map;
}

/* -------------------------------------------------------------------------- */
/* 4. CONCEPT PRIORITIZATION                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Return concept tags ordered by diagnostic priority.
 *
 * Priority:
 * 1. More failed questions.
 * 2. Concepts not yet repaired.
 * 3. Stable alphabetical fallback.
 *
 * @param {Object} weaknessMap
 * @returns {string[]}
 */
export function getConceptOrder(weaknessMap = {}) {
  if (!weaknessMap || typeof weaknessMap !== "object") {
    return [];
  }

  return Object.keys(weaknessMap).sort(
    (a, b) => {
      const conceptA = weaknessMap[a];
      const conceptB = weaknessMap[b];

      const failuresA =
        Array.isArray(conceptA?.questions)
          ? conceptA.questions.length
          : 0;

      const failuresB =
        Array.isArray(conceptB?.questions)
          ? conceptB.questions.length
          : 0;

      if (failuresB !== failuresA) {
        return failuresB - failuresA;
      }

      const completeA =
        conceptA?.repairTaught &&
        conceptA?.repairPassed;

      const completeB =
        conceptB?.repairTaught &&
        conceptB?.repairPassed;

      if (completeA !== completeB) {
        return completeA ? 1 : -1;
      }

      return a.localeCompare(b);
    }
  );
}

/* -------------------------------------------------------------------------- */
/* 5. REPAIR STATE MANAGEMENT                                                */
/* -------------------------------------------------------------------------- */

/**
 * Mark a concept's repair lesson as taught.
 *
 * Returns a new WeaknessMap.
 *
 * @param {Object} weaknessMap
 * @param {string} conceptTag
 * @returns {Object}
 */
export function markRepairTaught(
  weaknessMap = {},
  conceptTag
) {
  if (
    !weaknessMap ||
    typeof weaknessMap !== "object" ||
    !conceptTag ||
    !weaknessMap[conceptTag]
  ) {
    return weaknessMap;
  }

  return {
    ...weaknessMap,

    [conceptTag]: {
      ...weaknessMap[conceptTag],
      repairTaught: true,
    },
  };
}

/**
 * Mark a concept's repair retry as passed.
 *
 * Returns a new WeaknessMap.
 *
 * @param {Object} weaknessMap
 * @param {string} conceptTag
 * @returns {Object}
 */
export function markRepairPassed(
  weaknessMap = {},
  conceptTag
) {
  if (
    !weaknessMap ||
    typeof weaknessMap !== "object" ||
    !conceptTag ||
    !weaknessMap[conceptTag]
  ) {
    return weaknessMap;
  }

  return {
    ...weaknessMap,

    [conceptTag]: {
      ...weaknessMap[conceptTag],
      repairPassed: true,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* 6. REPAIR STATUS                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Determine whether a concept has completed its repair cycle.
 *
 * A repair is complete only when:
 *
 * TEST
 *  ↓
 * TEACH
 *  ↓
 * RETRIEVE / RETRY
 *  ↓
 * PASS
 *
 * Therefore both repairTaught and repairPassed must be true.
 *
 * @param {Object} concept
 * @returns {boolean}
 */
export function isRepairComplete(concept) {
  if (!concept || typeof concept !== "object") {
    return false;
  }

  return Boolean(
    concept.repairTaught &&
    concept.repairPassed
  );
}

/**
 * Returns true when every concept in the map has completed
 * its repair cycle.
 *
 * Empty maps return false because there is no evidence that
 * anything has been repaired.
 *
 * @param {Object} weaknessMap
 * @returns {boolean}
 */
export function allRepairsComplete(
  weaknessMap = {}
) {
  if (
    !weaknessMap ||
    typeof weaknessMap !== "object"
  ) {
    return false;
  }

  const concepts =
    Object.values(weaknessMap);

  if (concepts.length === 0) {
    return false;
  }

  return concepts.every(
    (concept) => isRepairComplete(concept)
  );
}

/**
 * Returns true when at least one concept still requires repair.
 *
 * @param {Object} weaknessMap
 * @returns {boolean}
 */
export function hasPendingRepairs(
  weaknessMap = {}
) {
  if (
    !weaknessMap ||
    typeof weaknessMap !== "object"
  ) {
    return false;
  }

  return Object.values(weaknessMap).some(
    (concept) => !isRepairComplete(concept)
  );
}

/**
 * Get the next concept that needs repair.
 *
 * Uses the same prioritization rules as getConceptOrder().
 *
 * @param {Object} weaknessMap
 * @returns {Object|null}
 */
export function getNextRepairConcept(
  weaknessMap = {}
) {
  const order = getConceptOrder(weaknessMap);

  for (const conceptTag of order) {
    const concept = weaknessMap[conceptTag];

    if (!isRepairComplete(concept)) {
      return concept;
    }
  }

  return null;
}
