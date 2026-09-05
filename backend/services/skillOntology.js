/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-A
 * Canonical Skill Ontology & Governance Engine
 * 
 * Invariants: Tixar Intelligence Law (Codebase Constitution)
 * - Never infer more certainty than the evidence supports.
 * - Always remain capable of saying: "I don't know yet."
 * - Ontology versioning preserves historical interpretation integrity.
 * - UNKNOWN_SKILL is never used for root-cause diagnosis or mastery claims.
 */

const ONTOLOGY_VERSION = "1.0.0";

const SKILL_ROLES = Object.freeze({
  PRIMARY: "PRIMARY",
  SUPPORTING: "SUPPORTING",
  PREREQUISITE: "PREREQUISITE",
  TRANSFER_TARGET: "TRANSFER_TARGET",
  UNKNOWN: "UNKNOWN"
});

const RELATIONSHIP_TYPES = Object.freeze({
  REQUIRES: "REQUIRES",
  SUPPORTS: "SUPPORTS",
  PRECEDES: "PRECEDES",
  PART_OF: "PART_OF",
  TRANSFER_FROM: "TRANSFER_FROM",
  RELATED_TO: "RELATED_TO"
});

const MAPPING_SOURCES = Object.freeze({
  AUTHOR_TAG: "AUTHOR_TAG",
  BLUEPRINT: "BLUEPRINT",
  CURRICULUM_RULE: "CURRICULUM_RULE",
  UNKNOWN: "UNKNOWN"
});

const MAPPING_CONFIDENCE = Object.freeze({
  AUTHOR_TAG: 1.0,
  BLUEPRINT: 0.95,
  CURRICULUM_RULE: 0.85,
  UNKNOWN: null
});

/**
 * Explicit UNKNOWN_SKILL Object with Formal Policy Boundaries
 */
const UNKNOWN_SKILL = Object.freeze({
  id: "unknown_skill",
  code: "UNKNOWN",
  name: "Unknown / Unclassified Skill",
  subjectId: null,
  strandId: null,
  subStrandId: null,
  relationships: [],
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
 * Structured hierarchy: Subject -> Strand -> Sub-Strand (Topic) -> Skill
 */
const CORE_SKILL_REGISTRY = {
  // --- NUMBERS & OPERATIONS ---
  "math.numbers.integers.signed_arithmetic": {
    id: "math.numbers.integers.signed_arithmetic",
    code: "MATH-NUM-INT-01",
    name: "Signed Arithmetic & Directed Numbers",
    description: "Addition, subtraction, multiplication, and division with negative numbers.",
    subjectId: "math",
    strandId: "numbers",
    subStrandId: "integers",
    relationships: [],
    cognitiveExpectations: ["PROCEDURAL", "APPLICATION"],
    status: "ACTIVE",
    difficulty: null, // Empirical difficulty strictly null until calibrated
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
    relationships: [
      { skillId: "math.numbers.integers.signed_arithmetic", relationship: "REQUIRES" }
    ],
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
    relationships: [
      { skillId: "math.numbers.integers.signed_arithmetic", relationship: "REQUIRES" }
    ],
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
    relationships: [
      { skillId: "math.numbers.integers.signed_arithmetic", relationship: "REQUIRES" }
    ],
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
    relationships: [
      { skillId: "math.algebra.linear_equations.expansion", relationship: "REQUIRES" },
      { skillId: "math.numbers.integers.signed_arithmetic", relationship: "REQUIRES" }
    ],
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
    relationships: [
      { skillId: "math.algebra.linear_equations.expansion", relationship: "REQUIRES" },
      { skillId: "math.numbers.integers.signed_arithmetic", relationship: "REQUIRES" }
    ],
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
    relationships: [
      { skillId: "math.algebra.quadratic_equations.factorisation", relationship: "REQUIRES" },
      { skillId: "math.numbers.fractions.addition_subtraction", relationship: "SUPPORTS" }
    ],
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
    relationships: [
      { skillId: "math.algebra.quadratic_equations.completing_square", relationship: "PRECEDES" },
      { skillId: "math.numbers.integers.signed_arithmetic", relationship: "REQUIRES" }
    ],
    cognitiveExpectations: ["APPLICATION", "TRANSFER"],
    status: "ACTIVE",
    difficulty: null,
    ontologyVersion: ONTOLOGY_VERSION
  }
};

/**
 * Governance: Strict Skill Ontology Graph Validator
 * Verifies ID uniqueness, parent hierarchy consistency, relationship targets, and acyclicity (DAG).
 * 
 * @param {Object} registry Dictionary of skill definitions
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateSkillOntology(registry = CORE_SKILL_REGISTRY) {
  const errors = [];
  const warnings = [];
  const skillIds = new Set(Object.keys(registry));

  // 1. Structural and Reference Validation
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

    // Check relationship references
    if (Array.isArray(skill.relationships)) {
      for (const rel of skill.relationships) {
        if (!skillIds.has(rel.skillId)) {
          errors.push(`Broken reference: Skill "${id}" references unknown prerequisite "${rel.skillId}"`);
        }
        if (!Object.values(RELATIONSHIP_TYPES).includes(rel.relationship)) {
          errors.push(`Invalid relationship type "${rel.relationship}" on skill "${id}"`);
        }
      }
    }
  }

  // 2. Cycle Detection (DFS) to guarantee Directed Acyclic Graph (DAG) invariant
  const visited = new Set();
  const recursionStack = new Set();

  function checkCycle(currId, path = []) {
    visited.add(currId);
    recursionStack.add(currId);

    const skill = registry[currId];
    if (skill && Array.isArray(skill.relationships)) {
      for (const rel of skill.relationships) {
        if (rel.relationship === RELATIONSHIP_TYPES.REQUIRES || rel.relationship === RELATIONSHIP_TYPES.PRECEDES) {
          const neighbor = rel.skillId;
          if (!visited.has(neighbor)) {
            if (checkCycle(neighbor, [...path, currId])) {
              return true;
            }
          } else if (recursionStack.has(neighbor)) {
            errors.push(`Circular prerequisite dependency detected: ${[...path, currId, neighbor].join(' -> ')}`);
            return true;
          }
        }
      }
    }

    recursionStack.delete(currId);
    return false;
  }

  for (const id of skillIds) {
    if (!visited.has(id)) {
      checkCycle(id);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Look up a skill by canonical ID.
 * Returns UNKNOWN_SKILL if not found.
 */
function getSkillById(id, registry = CORE_SKILL_REGISTRY) {
  if (!id || typeof id !== 'string') return UNKNOWN_SKILL;
  const trimmed = id.trim();
  return registry[trimmed] || UNKNOWN_SKILL;
}

/**
 * Retrieves all canonical skills belonging to a topic/sub-strand.
 */
function getSkillsForTopic(topicId, registry = CORE_SKILL_REGISTRY) {
  if (!topicId) return [];
  const normalized = topicId.toLowerCase().trim();
  return Object.values(registry).filter(s => s.subStrandId === normalized || s.strandId === normalized);
}

module.exports = {
  ONTOLOGY_VERSION,
  SKILL_ROLES,
  RELATIONSHIP_TYPES,
  MAPPING_SOURCES,
  MAPPING_CONFIDENCE,
  UNKNOWN_SKILL,
  CORE_SKILL_REGISTRY,
  validateSkillOntology,
  getSkillById,
  getSkillsForTopic
};
