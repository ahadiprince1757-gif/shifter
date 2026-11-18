/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-A
 * Canonical Skill Ontology & Governance Engine (Client Module — ESM)
 *
 * Invariants: Tixar Intelligence Law (Codebase Constitution)
 * - Never infer more certainty than the evidence supports.
 * - Always remain capable of saying: "I don't know yet."
 * - Ontology versioning preserves historical interpretation integrity.
 * - UNKNOWN_SKILL is never used for root-cause diagnosis or mastery claims.
 *
 * P1-B separation of concerns:
 * - This file defines WHAT SKILLS EXIST (metadata, hierarchy, cognitive expectations).
 * - HOW SKILLS CONNECT is defined exclusively in skillGraph.js.
 * - relationships: [] is kept as a structural placeholder but is not the canonical source.
 */

export const ONTOLOGY_VERSION = "1.0.0";

export const SKILL_ROLES = Object.freeze({
  PRIMARY: "PRIMARY",
  SUPPORTING: "SUPPORTING",
  PREREQUISITE: "PREREQUISITE",
  TRANSFER_TARGET: "TRANSFER_TARGET",
  UNKNOWN: "UNKNOWN"
});

export const SKILL_CLASSIFICATIONS = Object.freeze({
  FOUNDATIONAL: "FOUNDATIONAL",                     // Reusable primitive (e.g. arithmetic, algebraic manipulation)
  DOMAIN_SPECIFIC: "DOMAIN_SPECIFIC",               // Bound to a domain model (e.g. balancing chemical equations)
  CONTEXTUAL_APPLICATION: "CONTEXTUAL_APPLICATION", // Applying primitives in domain context (e.g. mole ratio math)
});

export const RELATIONSHIP_TYPES = Object.freeze({
  REQUIRES: "REQUIRES",
  PREREQUISITE_OF: "PREREQUISITE_OF",
  SUPPORTS: "SUPPORTS",
  PRECEDES: "PRECEDES",
  PART_OF: "PART_OF",
  TRANSFER_FROM: "TRANSFER_FROM",
  APPLIED_IN: "APPLIED_IN",
  RELATED_TO: "RELATED_TO"
});

export const MAPPING_SOURCES = Object.freeze({
  AUTHOR_TAG: "AUTHOR_TAG",
  BLUEPRINT: "BLUEPRINT",
  CURRICULUM_RULE: "CURRICULUM_RULE",
  UNKNOWN: "UNKNOWN"
});

export const MAPPING_CONFIDENCE = Object.freeze({
  AUTHOR_TAG: 1.0,
  BLUEPRINT: 0.95,
  CURRICULUM_RULE: 0.85,
  UNKNOWN: null
});

/**
 * Explicit UNKNOWN_SKILL Object with Formal Policy Boundaries
 */
export const UNKNOWN_SKILL = Object.freeze({
  id: "unknown_skill",
  code: "UNKNOWN",
  name: "Unknown / Unclassified Skill",
  subjectId: null,
  strandId: null,
  subStrandId: null,
  relationships: [], // Graph edges are canonical in skillGraph.js — not here
  cognitiveExpectations: [],
  status: "ACTIVE",
  difficulty: null,
  isUnknown: true,
  policy: Object.freeze({
    allowedForQuestionEvidence: true,
    allowedForActivityMetrics: true,
    allowedForGeneralObservation: true,
    allowedForPrerequisiteDiagnosis: false,
    allowedForRootCauseInference: false,
    allowedForMasteryClaim: false,
    allowedAsWeakTopic: false
  })
});

/**
 * Core Canonical Skill Registry (v1.0.0)
 *
 * NOTE: relationships: [] fields are intentionally empty.
 * All graph edges between skills are defined in skillGraph.js.
 */
export const CORE_SKILL_REGISTRY = {
  // --- NUMBERS & OPERATIONS ---
  "math.numbers.integers.signed_arithmetic": {
    id: "math.numbers.integers.signed_arithmetic",
    code: "MATH-NUM-INT-01",
    name: "Signed Arithmetic & Directed Numbers",
    description: "Addition, subtraction, multiplication, and division with negative numbers.",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "integers",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.numbers.fractions.addition_subtraction": {
    id: "math.numbers.fractions.addition_subtraction",
    code: "MATH-NUM-FRAC-01",
    name: "Fraction Addition & Subtraction",
    description: "Operating with like and unlike denominators using LCM.",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "fractions_decimals",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.numbers.fractions.multiplication_division": {
    id: "math.numbers.fractions.multiplication_division",
    code: "MATH-NUM-FRAC-02",
    name: "Fraction Multiplication & Division",
    description: "Multiplying fractions and dividing using reciprocal multiplication.",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "fractions_decimals",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },

  // --- ALGEBRA ---
  "math.algebra.linear_equations.expansion": {
    id: "math.algebra.linear_equations.expansion",
    code: "MATH-ALG-LIN-01",
    name: "Algebraic Expansion & Combining Like Terms",
    description: "Distributive property, removing parentheses, and simplifying algebraic expressions.",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "linear_equations",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.algebra.linear_equations.single_variable": {
    id: "math.algebra.linear_equations.single_variable",
    code: "MATH-ALG-LIN-02",
    name: "Solving Linear Equations in One Variable",
    description: "Isolating variables using inverse operations across the equality sign.",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "linear_equations",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.algebra.quadratic_equations.factorisation": {
    id: "math.algebra.quadratic_equations.factorisation",
    code: "MATH-ALG-QUAD-01",
    name: "Factorisation of Quadratic Expressions",
    description: "Factoring quadratic polynomials ax^2 + bx + c into binomial products.",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "quadratic_equations",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.algebra.quadratic_equations.completing_square": {
    id: "math.algebra.quadratic_equations.completing_square",
    code: "MATH-ALG-QUAD-02",
    name: "Solving Quadratics by Completing the Square",
    description: "Transforming quadratic equations into vertex form (x + p)^2 = q.",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "quadratic_equations",
    relationships: [], // Graph edges are canonical in skillGraph.js — not here
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.algebra.quadratic_equations.quadratic_formula": {
    id: "math.algebra.quadratic_equations.quadratic_formula",
    code: "MATH-ALG-QUAD-03",
    name: "Solving Quadratics via the Quadratic Formula",
    description: "Applying x = (-b ± √(b^2 - 4ac)) / 2a and evaluating the discriminant.",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "quadratic_equations",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["APPLICATION", "TRANSFER"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },

  // --- PILOT FOUNDATIONAL MATHEMATICS & RATIOS ---
  "math.numbers.integers.subtract_negative": {
    id: "math.numbers.integers.subtract_negative",
    code: "MATH-NUM-INT-SUBNEG",
    name: "Subtracting Negative Numbers",
    description: "Evaluating subtractions with negative integers (-a - (-b)).",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "integers",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.numbers.ratios.simplification": {
    id: "math.numbers.ratios.simplification",
    code: "MATH-NUM-RAT-SIMP",
    name: "Ratio Simplification & Part-to-Part",
    description: "Simplifying integer and fractional ratios to lowest terms using GCD.",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "ratios",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.numbers.ratios.direct_proportion": {
    id: "math.numbers.ratios.direct_proportion",
    code: "MATH-NUM-RAT-PROP",
    name: "Direct Proportional Scaling",
    description: "Using the unitary method or ratio scaling to solve proportional problems.",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "ratios",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.algebra.linear_equations.two_step": {
    id: "math.algebra.linear_equations.two_step",
    code: "MATH-ALG-LIN-03",
    name: "Solving Two-Step Linear Equations",
    description: "Isolating variables using ordered inverse operations (ax + b = c).",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "linear_equations",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.algebra.formulae.change_subject": {
    id: "math.algebra.formulae.change_subject",
    code: "MATH-ALG-FORM-SUBJ",
    name: "Rearranging Formulae (Change of Subject)",
    description: "Rearranging algebraic relationships to isolate a specified variable.",
    subjectId: "math",
    strandId: "algebra",
    subStrandId: "formulae",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "math.measurement.units.metric_conversion": {
    id: "math.measurement.units.metric_conversion",
    code: "MATH-MEAS-UNITS-01",
    name: "Metric Prefix Unit Conversion",
    description: "Converting quantities between standard metric prefixes (milli, centi, kilo).",
    subjectId: "math",
    strandId: "measurement",
    subStrandId: "units",
    classification: SKILL_CLASSIFICATIONS.FOUNDATIONAL,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },

  // --- PILOT DOMAIN-SPECIFIC & CONTEXTUAL CHEMISTRY (STOICHIOMETRY) ---
  "chemistry.equations.balance_stoichiometry": {
    id: "chemistry.equations.balance_stoichiometry",
    code: "CHEM-EQ-BAL-01",
    name: "Balancing Chemical Equations",
    description: "Balancing coefficients to satisfy conservation of mass without changing subscripts.",
    subjectId: "chemistry",
    strandId: "equations",
    subStrandId: "balancing_equations",
    classification: SKILL_CLASSIFICATIONS.DOMAIN_SPECIFIC,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.moles.calculate_molar_mass": {
    id: "chemistry.moles.calculate_molar_mass",
    code: "CHEM-MOL-MR-01",
    name: "Relative Formula Mass (Mr) Calculation",
    description: "Calculating molar mass by summing relative atomic masses with formula subscripts.",
    subjectId: "chemistry",
    strandId: "moles",
    subStrandId: "molar_mass",
    classification: SKILL_CLASSIFICATIONS.DOMAIN_SPECIFIC,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.moles.mass_to_moles": {
    id: "chemistry.moles.mass_to_moles",
    code: "CHEM-MOL-N-M-01",
    name: "Converting Mass to Moles (n = m / Mr)",
    description: "Calculating molar amount from given mass and calculated molar mass.",
    subjectId: "chemistry",
    strandId: "moles",
    subStrandId: "mole_calculations",
    classification: SKILL_CLASSIFICATIONS.CONTEXTUAL_APPLICATION,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.moles.moles_to_mass": {
    id: "chemistry.moles.moles_to_mass",
    code: "CHEM-MOL-M-N-01",
    name: "Converting Moles to Mass (m = n × Mr)",
    description: "Calculating mass from molar amount and molar mass.",
    subjectId: "chemistry",
    strandId: "moles",
    subStrandId: "mole_calculations",
    classification: SKILL_CLASSIFICATIONS.CONTEXTUAL_APPLICATION,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.stoichiometry.extract_mole_ratio": {
    id: "chemistry.stoichiometry.extract_mole_ratio",
    code: "CHEM-STOICH-RATIO-01",
    name: "Extracting Molar Ratios from Balanced Equations",
    description: "Identifying stoichiometric coefficients as molar ratios between reactants and products.",
    subjectId: "chemistry",
    strandId: "stoichiometry",
    subStrandId: "mole_ratios",
    classification: SKILL_CLASSIFICATIONS.DOMAIN_SPECIFIC,
    relationships: [],
    cognitiveExpectations: ["CONCEPTUAL", "PROCEDURAL"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.stoichiometry.mole_to_mole_direct": {
    id: "chemistry.stoichiometry.mole_to_mole_direct",
    code: "CHEM-STOICH-MOL-MOL-1",
    name: "Direct 1:1 Stoichiometric Mole Calculation",
    description: "Calculating product moles from reactant moles with equal stoichiometric coefficients.",
    subjectId: "chemistry",
    strandId: "stoichiometry",
    subStrandId: "stoichiometric_calculations",
    classification: SKILL_CLASSIFICATIONS.CONTEXTUAL_APPLICATION,
    relationships: [],
    cognitiveExpectations: ["APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.stoichiometry.mole_to_mole_ratio_application": {
    id: "chemistry.stoichiometry.mole_to_mole_ratio_application",
    code: "CHEM-STOICH-MOL-MOL-2",
    name: "Non-1:1 Stoichiometric Mole Ratio Calculation",
    description: "Applying fractional molar ratios (coefficient target / coefficient given) to scale moles.",
    subjectId: "chemistry",
    strandId: "stoichiometry",
    subStrandId: "stoichiometric_calculations",
    classification: SKILL_CLASSIFICATIONS.CONTEXTUAL_APPLICATION,
    relationships: [],
    cognitiveExpectations: ["APPLICATION", "TRANSFER"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.stoichiometry.mass_to_mass": {
    id: "chemistry.stoichiometry.mass_to_mass",
    code: "CHEM-STOICH-MASS-MASS",
    name: "Integrated Mass-to-Mass Stoichiometry",
    description: "Executing complete 3-step stoichiometry: mass A -> moles A -> moles B -> mass B.",
    subjectId: "chemistry",
    strandId: "stoichiometry",
    subStrandId: "mass_calculations",
    classification: SKILL_CLASSIFICATIONS.CONTEXTUAL_APPLICATION,
    relationships: [],
    cognitiveExpectations: ["APPLICATION", "TRANSFER"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.stoichiometry.identify_limiting_reactant": {
    id: "chemistry.stoichiometry.identify_limiting_reactant",
    code: "CHEM-STOICH-LIMITING",
    name: "Identifying Limiting and Excess Reactants",
    description: "Dividing available moles by stoichiometric coefficients to identify the limiting reagent.",
    subjectId: "chemistry",
    strandId: "stoichiometry",
    subStrandId: "limiting_reactants",
    classification: SKILL_CLASSIFICATIONS.DOMAIN_SPECIFIC,
    relationships: [],
    cognitiveExpectations: ["ANALYSE", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  },
  "chemistry.stoichiometry.percentage_yield": {
    id: "chemistry.stoichiometry.percentage_yield",
    code: "CHEM-STOICH-PCT-YIELD",
    name: "Percentage Yield Calculation",
    description: "Calculating (actual yield / theoretical yield) × 100%.",
    subjectId: "chemistry",
    strandId: "stoichiometry",
    subStrandId: "percentage_yield",
    classification: SKILL_CLASSIFICATIONS.CONTEXTUAL_APPLICATION,
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  }
};

/**
 * Governance: Skill Ontology Structural Validator
 *
 * Validates skill identity, metadata completeness, and hierarchy consistency.
 * Does NOT validate graph edges — that is validateSkillGraph()'s responsibility.
 */
export function validateSkillOntology(registry = CORE_SKILL_REGISTRY) {
  const errors = [];
  const warnings = [];

  for (const [id, skill] of Object.entries(registry)) {
    if (skill.id !== id) {
      errors.push(`Key mismatch: Registry key "${id}" does not match skill.id "${skill.id}"`);
    }

    if (!skill.name || typeof skill.name !== 'string') {
      errors.push(`Skill "${id}" is missing a human-readable name`);
    }

    if (!skill.subjectId || !skill.strandId || !skill.subStrandId) {
      errors.push(`Skill "${id}" violates parent hierarchy: subject, strand, or subStrand is missing`);
    }

    if (skill.difficulty !== null) {
      warnings.push(`Skill "${id}" has non-null difficulty (${skill.difficulty}). Invariant: difficulty should remain null until empirical calibration.`);
    }

    if (!skill.ontologyVersion) {
      errors.push(`Skill "${id}" is missing ontologyVersion`);
    }
  }

  // Cycle detection on inline relationships (if present)
  const skillIds = new Set(Object.keys(registry));
  const visited = new Set();
  const recStack = new Set();

  function detectCycle(skillId, path = []) {
    visited.add(skillId);
    recStack.add(skillId);
    const skill = registry[skillId];
    if (skill && Array.isArray(skill.relationships)) {
      for (const rel of skill.relationships) {
        const targetId = rel.skillId;
        if (!visited.has(targetId)) {
          detectCycle(targetId, [...path, skillId]);
        } else if (recStack.has(targetId)) {
          errors.push(`Circular dependency detected in skill ontology: ${[...path, skillId, targetId].join(' -> ')}`);
        }
      }
    }
    recStack.delete(skillId);
  }

  for (const skillId of skillIds) {
    if (!visited.has(skillId)) {
      detectCycle(skillId);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function getSkillById(id, registry = CORE_SKILL_REGISTRY) {
  if (!id || typeof id !== 'string') return UNKNOWN_SKILL;
  const trimmed = id.trim();
  return registry[trimmed] || UNKNOWN_SKILL;
}

export function getSkillsForTopic(topicId, registry = CORE_SKILL_REGISTRY) {
  if (!topicId) return [];
  const normalized = topicId.toLowerCase().trim();
  return Object.values(registry).filter(s => s.subStrandId === normalized || s.strandId === normalized);
}
