/**
 * ============================================================================
 * TIXAR REPAIR PLANNER
 * ============================================================================
 *
 * Purpose:
 *   Bridge between the Diagnoser and the Mutator.
 *   The Diagnoser answers: "What kind of error did the learner make?"
 *   The Repair Planner answers: "What is the smallest broken skill,
 *   and what should the learner do RIGHT NOW to repair it?"
 *
 * Design principles:
 *   1. Deterministic — same diagnosis always produces same plan.
 *   2. Minimal — target the smallest repairable skill unit, not the whole topic.
 *   3. Ordered — skills have prerequisites; plan must respect that chain.
 *   4. Mode-aware — different failure types require different repair modes.
 *   5. No generation — this module plans; mutators execute.
 *
 * Pipeline position:
 *   Diagnoser → [Repair Planner] → Mutator → Repair Question → Repair Verifier
 *
 * Output shape (RepairPlan):
 * {
 *   repairTarget:        string,   // Smallest broken skill ID
 *   repairMode:          string,   // ISOLATE | SCAFFOLD | REINFORCE | TRANSFER
 *   targetDifficulty:    number,   // 1–5 overall
 *   difficultyProfile:   object,   // { numerical, conceptual, procedural, language, transfer, overall }
 *   cognitiveDemand:     string,   // RECALL | APPLY | ANALYSE | EVALUATE
 *   prerequisite:        string|null,
 *   shouldMutateOriginal: boolean,
 *   questionMode:        string,   // ISOLATED_SKILL | GUIDED_STEP | FULL_QUESTION | MCQ_FORCED
 *   hint:                string,
 *   repairReason:        string,
 *   _meta:               object,
 * }
 * ============================================================================
 */

// ============================================================================
// FAILURE TAXONOMY — maps Diagnoser error types to failure categories
// ============================================================================

const FAILURE_CATEGORY = {
  // No evidence at all
  IRRELEVANT_KNEW_NOTHING:  "PREREQUISITE",
  INSUFFICIENT_EVIDENCE:    "PREREQUISITE",

  // Conceptual misunderstanding
  FORMULA_MISAPPLICATION:   "CONCEPTUAL",
  WRONG_OPERATION:          "CONCEPTUAL",
  SIGN_ERROR:               "CONCEPTUAL",
  DIRECTION_CONFUSION:      "CONCEPTUAL",
  BONDING_CONFUSION:        "CONCEPTUAL",
  PHYSICS_CONFUSION:        "CONCEPTUAL",
  CIRCUIT_CONFUSION:        "CONCEPTUAL",
  THERMO_CONFUSION:         "CONCEPTUAL",
  BIOLOGY_CONFUSION:        "CONCEPTUAL",
  KINEMATICS_CONFUSION:     "CONCEPTUAL",
  OPTICS_CONFUSION:         "CONCEPTUAL",

  // Procedural breakdown — knows the concept but breaks the steps
  PROCEDURAL_STEP_ERROR:    "PROCEDURAL",
  PARTIAL_PROCEDURE:        "PROCEDURAL",
  STEP_SEQUENCE_ERROR:      "PROCEDURAL",
  FINAL_CONCLUSION_ERROR:   "PROCEDURAL",

  // Arithmetic / calculation slip
  CALCULATION_ERROR:        "CALCULATION",
  NOTATION_UNIT_TYPO:       "CALCULATION",
  ROUNDING_ERROR:           "CALCULATION",

  // Domain / constraint violation
  DOMAIN_VIOLATION:         "DOMAIN",
  NEGATIVE_PROBABILITY:     "DOMAIN",
  INVALID_RANGE:            "DOMAIN",

  // Transfer failure
  UNKNOWN_WRONG_ANSWER:     "TRANSFER",
  CONCEPT_ISOLATION:        "TRANSFER",

  // Non-failures
  CORRECT:                  "NONE",
  VALID_ALTERNATIVE_PATH:   "NONE",
  NO_CONFIRMED_ERROR:       "NONE",
};

// ============================================================================
// REPAIR MODE TABLE — maps failure category to repair spec
// ============================================================================

const REPAIR_MODE_TABLE = {
  PREREQUISITE: {
    repairMode: "SCAFFOLD",
    questionMode: "GUIDED_STEP",
    cognitiveDemand: "RECALL",
    shouldMutateOriginal: false,
    difficultyDelta: -2,
  },
  CONCEPTUAL: {
    repairMode: "ISOLATE",
    questionMode: "ISOLATED_SKILL",
    cognitiveDemand: "APPLY",
    shouldMutateOriginal: false,
    difficultyDelta: -1,
  },
  PROCEDURAL: {
    repairMode: "SCAFFOLD",
    questionMode: "GUIDED_STEP",
    cognitiveDemand: "APPLY",
    shouldMutateOriginal: true,
    difficultyDelta: 0,
  },
  CALCULATION: {
    repairMode: "REINFORCE",
    questionMode: "ISOLATED_SKILL",
    cognitiveDemand: "APPLY",
    shouldMutateOriginal: true,
    difficultyDelta: -1,
  },
  DOMAIN: {
    repairMode: "ISOLATE",
    questionMode: "MCQ_FORCED",
    cognitiveDemand: "RECALL",
    shouldMutateOriginal: false,
    difficultyDelta: -2,
  },
  TRANSFER: {
    repairMode: "REINFORCE",
    questionMode: "FULL_QUESTION",
    cognitiveDemand: "APPLY",
    shouldMutateOriginal: true,
    difficultyDelta: 0,
  },
  NONE: {
    repairMode: "TRANSFER",
    questionMode: "FULL_QUESTION",
    cognitiveDemand: "ANALYSE",
    shouldMutateOriginal: true,
    difficultyDelta: 1,
  },
};

// ============================================================================
// SKILL PREREQUISITE CHAIN
// Maps skill → the skill that must be solid first.
// Keep this minimal — only add links with evidence.
// ============================================================================

const PREREQUISITE_CHAIN = {
  // Algebra
  solving_equations:        "inverse_operations",
  inverse_operations:       "arithmetic_operations",
  quadratic_formula:        "solving_equations",
  simultaneous_equations:   "solving_equations",
  inequalities:             "solving_equations",

  // Arithmetic
  fractions:                "arithmetic_operations",
  percentages:              "fractions",
  ratios:                   "fractions",
  decimals:                 "arithmetic_operations",

  // Geometry
  area_of_compound_shapes:  "area_of_basic_shapes",
  area_of_basic_shapes:     "multiplication",
  perimeter:                "addition",
  volume:                   "area_of_basic_shapes",
  trigonometry:             "pythagoras",
  pythagoras:               "area_of_basic_shapes",

  // Science — Chemistry
  balancing_equations:      "mole_concept",
  mole_concept:             "atomic_mass",
  ionic_bonding:            "electron_configuration",
  covalent_bonding:         "electron_configuration",

  // Science — Physics
  ohms_law:                 "circuit_symbols",
  kirchhoffs_law:           "ohms_law",
  kinematics:               "speed_distance_time",
  newton_laws:              "kinematics",
  work_energy:              "newton_laws",

  // Biology
  cell_division_meiosis:    "cell_division_mitosis",
  genetics:                 "cell_division_meiosis",
  photosynthesis:           "cell_structure",
};

// ============================================================================
// REPAIR HINT TABLE
// ============================================================================

const REPAIR_HINTS = {
  PREREQUISITE: "Let's go back to the basics first. We'll build up step by step.",
  CONCEPTUAL:   "Let's focus on the core idea before applying it to a full question.",
  PROCEDURAL:   "You know the concept — let's work through each step carefully this time.",
  CALCULATION:  "Your method looks right. Let's slow down on the arithmetic.",
  DOMAIN:       "There's a rule about what values are allowed here. Let's review that first.",
  TRANSFER:     "You understand this — let's try it in a slightly different situation.",
  NONE:         "Great job! Let's try something that pushes this skill a bit further.",
};

// ============================================================================
// DIFFICULTY PROFILE BUILDER
// Produces a multidimensional difficulty profile.
// ============================================================================

function buildDifficultyProfile(baseLevel, delta, failureCat) {
  const target = Math.max(1, Math.min(5, baseLevel + delta));

  const profiles = {
    PREREQUISITE: { numerical: 1,      conceptual: 1,      procedural: 1,      language: 1,      transfer: 1 },
    CONCEPTUAL:   { numerical: target, conceptual: 1,      procedural: 1,      language: 1,      transfer: 1 },
    PROCEDURAL:   { numerical: target, conceptual: target, procedural: 1,      language: 1,      transfer: 1 },
    CALCULATION:  { numerical: 1,      conceptual: target, procedural: target, language: 1,      transfer: 1 },
    DOMAIN:       { numerical: 1,      conceptual: 1,      procedural: 1,      language: 1,      transfer: 1 },
    TRANSFER:     { numerical: target, conceptual: target, procedural: target, language: 1,      transfer: 2 },
    NONE:         { numerical: target, conceptual: target, procedural: target, language: target, transfer: target },
  };

  const profile = profiles[failureCat] || profiles.NONE;
  return { ...profile, overall: target };
}

// ============================================================================
// SKILL EXTRACTOR
// ============================================================================

function extractSkill(blueprint) {
  if (!blueprint) return "unknown";
  return (
    blueprint.skill ||
    blueprint.metadata?.skill ||
    blueprint.metadata?.concept ||
    blueprint.concept ||
    blueprint.topic ||
    "unknown"
  );
}

// ============================================================================
// PREREQUISITE RESOLVER
// ============================================================================

function resolvePrerequisite(skill) {
  if (!skill || skill === "unknown") return null;
  return PREREQUISITE_CHAIN[skill] || null;
}

// ============================================================================
// ESCALATION — increase isolation after repeated failed attempts
// ============================================================================

function _escalate(modeSpec, attemptCount) {
  if (attemptCount <= 1) return modeSpec;
  return {
    ...modeSpec,
    repairMode: "ISOLATE",
    questionMode: "ISOLATED_SKILL",
    cognitiveDemand: "RECALL",
    difficultyDelta: Math.min(-2, modeSpec.difficultyDelta - 1),
    shouldMutateOriginal: false,
  };
}

// ============================================================================
// ADVANCEMENT PLAN (correct answer → push forward)
// ============================================================================

function _advancementPlan(blueprint, baseLevel, diagType) {
  const skill = extractSkill(blueprint);
  const isAlt = diagType === "VALID_ALTERNATIVE_PATH";
  return {
    repairTarget: skill,
    repairMode: "TRANSFER",
    targetDifficulty: Math.min(5, baseLevel + 1),
    difficultyProfile: buildDifficultyProfile(baseLevel, 1, "NONE"),
    cognitiveDemand: isAlt ? "ANALYSE" : "EVALUATE",
    prerequisite: null,
    shouldMutateOriginal: true,
    questionMode: "FULL_QUESTION",
    hint: isAlt
      ? "Your method was valid! Let's explore the concept from another angle."
      : REPAIR_HINTS.NONE,
    repairReason: `[ADVANCEMENT] ${diagType}`,
    _meta: {
      diagnosisType: diagType,
      failureCategory: "NONE",
      diagnosisConfidence: 1.0,
      attemptCount: 0,
      failedStepIndex: -1,
    },
  };
}

// ============================================================================
// NULL PLAN (fallback when no diagnosis available)
// ============================================================================

function _nullPlan(reason) {
  return {
    repairTarget: "unknown",
    repairMode: "REINFORCE",
    targetDifficulty: 1,
    difficultyProfile: { numerical: 1, conceptual: 1, procedural: 1, language: 1, transfer: 1, overall: 1 },
    cognitiveDemand: "RECALL",
    prerequisite: null,
    shouldMutateOriginal: false,
    questionMode: "ISOLATED_SKILL",
    hint: "Let's start from the beginning.",
    repairReason: `[NULL] ${reason}`,
    _meta: {
      diagnosisType: "NONE",
      failureCategory: "NONE",
      diagnosisConfidence: 0,
      attemptCount: 0,
      failedStepIndex: -1,
    },
  };
}

// ============================================================================
// PUBLIC API — createRepairPlan
// ============================================================================

/**
 * Create a structured repair plan from a diagnostic result.
 *
 * @param {object} diagnosis        - Output from misconceptionDiagnoser or QuestionMutator.diagnoseMisconception()
 * @param {object} blueprint        - The original question object
 * @param {object} [options]
 * @param {number} [options.baseLevel=2]       - Original question difficulty (1–5)
 * @param {number} [options.attemptCount=0]    - Times the student has failed this question
 * @param {object} [options.studentContext={}] - Performance context from learningIntelligenceEngine
 * @returns {RepairPlan}
 */
export function createRepairPlan(diagnosis, blueprint, options = {}) {
  const {
    baseLevel = 2,
    attemptCount = 0,
    studentContext = {},
  } = options;

  if (!diagnosis) return _nullPlan("NO_DIAGNOSIS");

  const diagType = diagnosis.type || "UNKNOWN_WRONG_ANSWER";

  // Correct / valid alternative path → advance, don't repair
  if (diagType === "CORRECT" || diagType === "VALID_ALTERNATIVE_PATH") {
    return _advancementPlan(blueprint, baseLevel, diagType);
  }

  const failureCat  = FAILURE_CATEGORY[diagType] || "TRANSFER";
  const modeSpec    = REPAIR_MODE_TABLE[failureCat] || REPAIR_MODE_TABLE.TRANSFER;
  const escalated   = _escalate(modeSpec, attemptCount);

  const skill       = extractSkill(blueprint);
  const prerequisite = failureCat === "PREREQUISITE"
    ? resolvePrerequisite(skill)
    : null;

  const repairTarget = prerequisite || skill;

  const difficultyProfile = buildDifficultyProfile(
    baseLevel,
    escalated.difficultyDelta,
    failureCat
  );

  return {
    repairTarget,
    repairMode:           escalated.repairMode,
    targetDifficulty:     difficultyProfile.overall,
    difficultyProfile,
    cognitiveDemand:      escalated.cognitiveDemand,
    prerequisite,
    shouldMutateOriginal: escalated.shouldMutateOriginal,
    questionMode:         escalated.questionMode,
    hint:                 REPAIR_HINTS[failureCat] || REPAIR_HINTS.TRANSFER,
    repairReason:         `[${failureCat}] ${diagType} — attempt ${attemptCount}`,
    _meta: {
      diagnosisType:        diagType,
      failureCategory:      failureCat,
      diagnosisConfidence:  diagnosis.confidence || 0,
      attemptCount,
      failedStepIndex:      diagnosis.failedStepIndex ?? -1,
    },
  };
}

// ============================================================================
// PUBLIC UTILITIES
// ============================================================================

/** Human-readable summary for logging or debug UI */
export function summarizeRepairPlan(plan) {
  if (!plan) return "No repair plan.";
  return (
    `Repair [${plan.repairMode}] → target: "${plan.repairTarget}" ` +
    `| mode: ${plan.questionMode} ` +
    `| difficulty: ${plan.targetDifficulty} ` +
    `| demand: ${plan.cognitiveDemand}` +
    (plan.prerequisite ? ` | check prerequisite: "${plan.prerequisite}" first` : "")
  );
}

/** Returns true when the plan is an advancement (not a repair) */
export function isAdvancementPlan(plan) {
  return plan?.repairMode === "TRANSFER" && plan?._meta?.failureCategory === "NONE";
}
