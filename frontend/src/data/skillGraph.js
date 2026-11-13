/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-B
 * Canonical Skill Relationship Graph (Client Module — ESM)
 *
 * Tixar Intelligence Law — Graph Boundary:
 *   A graph edge creates a hypothesis pathway, NEVER an evidence pathway.
 *
 * Directional convention:
 *   DEPENDENT ──REQUIRES──> PREREQUISITE
 *
 *   fromSkill = the dependent skill (requires the other)
 *   toSkill   = the prerequisite skill (must exist first)
 */

export const GRAPH_VERSION = '1.0.0';

// ============================================================================
// RELATIONSHIP SEMANTICS
// ============================================================================

/**
 * Defines the epistemic properties of each relationship type.
 *
 * CRITICAL — hypothesisPriority is a structural ordering value, NOT probability.
 * It must never be interpreted as:
 *   - A percentage likelihood
 *   - A confidence score
 *   - Evidence strength
 *   - Proof of causation
 */
export const RELATIONSHIP_SEMANTICS = Object.freeze({
  REQUIRES: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: true,
    hypothesisPriority: 100
  }),
  SUPPORTS: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: false,
    hypothesisPriority: 60
  }),
  PART_OF: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: false,
    hypothesisPriority: 40
  }),
  TRANSFER_FROM: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: false,
    hypothesisPriority: 50
  }),
  PRECEDES: Object.freeze({
    canSupportHypothesis: false,
    canBlockProgression: false,
    hypothesisPriority: 0
  }),
  RELATED_TO: Object.freeze({
    canSupportHypothesis: false,
    canBlockProgression: false,
    hypothesisPriority: 0
  })
});

// ============================================================================
// CANONICAL SKILL RELATIONSHIP EDGES
// ============================================================================

export const SKILL_RELATIONSHIPS = Object.freeze([
  {
    id: 'rel_001',
    fromSkill: 'math.algebra.quadratic_equations.factorisation',
    toSkill:   'math.algebra.linear_equations.expansion',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_002',
    fromSkill: 'math.algebra.quadratic_equations.factorisation',
    toSkill:   'math.numbers.integers.signed_arithmetic',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_003',
    fromSkill: 'math.algebra.quadratic_equations.completing_square',
    toSkill:   'math.algebra.quadratic_equations.factorisation',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_004',
    fromSkill: 'math.algebra.quadratic_equations.completing_square',
    toSkill:   'math.numbers.fractions.addition_subtraction',
    type:      'SUPPORTS',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_005',
    fromSkill: 'math.algebra.quadratic_equations.quadratic_formula',
    toSkill:   'math.numbers.integers.signed_arithmetic',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_006',
    fromSkill: 'math.algebra.quadratic_equations.quadratic_formula',
    toSkill:   'math.algebra.quadratic_equations.completing_square',
    type:      'PRECEDES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_007',
    fromSkill: 'math.algebra.linear_equations.single_variable',
    toSkill:   'math.algebra.linear_equations.expansion',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_008',
    fromSkill: 'math.algebra.linear_equations.single_variable',
    toSkill:   'math.numbers.integers.signed_arithmetic',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_009',
    fromSkill: 'math.algebra.linear_equations.expansion',
    toSkill:   'math.numbers.integers.signed_arithmetic',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_010',
    fromSkill: 'math.numbers.fractions.addition_subtraction',
    toSkill:   'math.numbers.integers.signed_arithmetic',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  },
  {
    id: 'rel_011',
    fromSkill: 'math.numbers.fractions.multiplication_division',
    toSkill:   'math.numbers.integers.signed_arithmetic',
    type:      'REQUIRES',
    ontologyVersion: '1.0.0',
    active: true,
    provenance: { source: 'CURRICULUM_DESIGN', confidence: 'DECLARED' }
  }
]);

// ============================================================================
// GRAPH SNAPSHOT HASH (sync, browser-compatible)
// ============================================================================

/**
 * Deterministic graph snapshot hash for reproducibility.
 * Uses a fast djb2-style hash suitable for browser environments
 * (no Node crypto dependency).
 *
 * @param {string} graphVersion
 * @param {Array}  relationships
 * @returns {string} hex string
 */
export function computeGraphSnapshotHash(graphVersion = GRAPH_VERSION, relationships = SKILL_RELATIONSHIPS) {
  const activeEdges = [...relationships]
    .filter(r => r.active)
    .map(r => `${r.id}:${r.fromSkill}:${r.toSkill}:${r.type}:${r.ontologyVersion}`)
    .sort()
    .join('|');
  const raw = `${graphVersion}||${activeEdges}`;

  // djb2 hash over the string
  let h = 5381;
  for (let i = 0; i < raw.length; i++) {
    h = ((h << 5) + h) ^ raw.charCodeAt(i);
    h = h >>> 0; // keep unsigned 32-bit
  }
  return h.toString(16).padStart(8, '0');
}

// ============================================================================
// GRAPH QUERY FUNCTIONS
// ============================================================================

/**
 * Returns direct prerequisites of a skill.
 * Direction: skillId ──REQUIRES/SUPPORTS──> [returned prerequisites]
 */
export function getDirectPrerequisites(skillId, relationships = SKILL_RELATIONSHIPS) {
  return relationships
    .filter(r => r.active && r.fromSkill === skillId && RELATIONSHIP_SEMANTICS[r.type]?.canSupportHypothesis)
    .map(r => ({
      skillId: r.toSkill,
      relationshipId: r.id,
      type: r.type,
      hypothesisPriority: RELATIONSHIP_SEMANTICS[r.type]?.hypothesisPriority ?? 0,
      provenance: r.provenance
    }))
    .sort((a, b) => b.hypothesisPriority - a.hypothesisPriority);
}

/**
 * Returns direct dependents of a skill.
 * Direction: [returned dependents] ──REQUIRES──> skillId
 */
export function getDirectDependents(skillId, relationships = SKILL_RELATIONSHIPS) {
  return relationships
    .filter(r => r.active && r.toSkill === skillId && r.type === 'REQUIRES')
    .map(r => ({
      skillId: r.fromSkill,
      relationshipId: r.id,
      type: r.type
    }));
}

/**
 * Returns prerequisite hypothesis objects for a given skill.
 *
 * ════════════════════════════════════════════════════════════════
 * HYPOTHESIS BOUNDARY — Tixar Intelligence Law
 * Every object returned carries:  isObservedEvidence: false
 *
 * Graph traversal NEVER produces evidence.
 * Never pass these objects to evidence-consuming functions.
 * ════════════════════════════════════════════════════════════════
 */
export function getPrerequisiteHypotheses(skillId, relationships = SKILL_RELATIONSHIPS) {
  return getDirectPrerequisites(skillId, relationships).map(prereq => ({
    type:                    'PREREQUISITE_HYPOTHESIS',
    targetSkillId:           prereq.skillId,
    relationshipType:        prereq.type,
    relationshipId:          prereq.relationshipId,
    hypothesisPriority:      prereq.hypothesisPriority,
    provenance:              prereq.provenance,
    factor:                  prereq.skillId,
    evidenceWeight:          prereq.hypothesisPriority,
    isObservedEvidence:      false,
    requiresDiagnosticQuestion: true
  }));
}
