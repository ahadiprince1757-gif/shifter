/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-B
 * Canonical Skill Relationship Graph
 *
 * Tixar Intelligence Law — Graph Boundary:
 *   A graph edge creates a hypothesis pathway, NEVER an evidence pathway.
 *
 * Directional convention:
 *   DEPENDENT ──REQUIRES──> PREREQUISITE
 *
 *   fromSkill = the dependent skill (the one that needs the other)
 *   toSkill   = the prerequisite skill (the one that must exist first)
 *
 * Example:
 *   Quadratic Factorisation ──REQUIRES──> Linear Expansion
 *   (Factorisation is fromSkill; Expansion is toSkill / the prerequisite)
 */

const crypto = require('crypto');
const { CORE_SKILL_REGISTRY } = require('./skillOntology');

const GRAPH_VERSION = '1.0.0';

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
 *
 * It communicates: "if a diagnostic question is needed, which prerequisite
 * relationships should be investigated first?"
 */
const RELATIONSHIP_SEMANTICS = Object.freeze({
  REQUIRES: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: true,
    hypothesisPriority: 100
    // Dependency: A cannot be reasonably assessed without B existing conceptually.
  }),
  SUPPORTS: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: false,
    hypothesisPriority: 60
    // Supplementary: B is helpful but not required for A.
  }),
  PART_OF: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: false,
    hypothesisPriority: 40
    // Structural containment: A is a component of B.
  }),
  TRANSFER_FROM: Object.freeze({
    canSupportHypothesis: true,
    canBlockProgression: false,
    hypothesisPriority: 50
    // Cross-topic transfer: knowledge of B may transfer to A.
  }),
  PRECEDES: Object.freeze({
    canSupportHypothesis: false,
    canBlockProgression: false,
    hypothesisPriority: 0
    // Ordering only — not a causal or dependency relationship.
    // Must NOT be used for prerequisite diagnosis.
  }),
  RELATED_TO: Object.freeze({
    canSupportHypothesis: false,
    canBlockProgression: false,
    hypothesisPriority: 0
    // Contextual association only. Never diagnostic.
    // Must NOT trigger prerequisite repair.
  })
});

// ============================================================================
// CANONICAL SKILL RELATIONSHIP EDGES
// ============================================================================

/**
 * First-class relationship edge objects.
 * Each edge is independently addressable via its stable `id`.
 *
 * Edge schema:
 * {
 *   id:              string  — stable unique identifier (never reused, even if edge is retired)
 *   fromSkill:       string  — the DEPENDENT skill (requires the toSkill)
 *   toSkill:         string  — the PREREQUISITE skill (must exist first)
 *   type:            string  — one of RELATIONSHIP_SEMANTICS keys
 *   ontologyVersion: string  — skill ontology version this edge was authored against
 *   active:          boolean — false = soft-retired (not deleted, for reproducibility)
 *   provenance: {
 *     source:     string — "CURRICULUM_DESIGN" | "EXPERT_REVIEW" | "EMPIRICAL_DATA" | "EXPERIMENTAL"
 *     confidence: string — "DECLARED" | "INFERRED" | "PROVISIONAL"
 *   }
 * }
 */
const SKILL_RELATIONSHIPS = Object.freeze([
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
// GRAPH SNAPSHOT HASH
// ============================================================================

/**
 * Computes a deterministic hash of the skill relationship graph state.
 * Used to make intelligence decisions reproducible against the exact graph
 * that existed when they were made.
 *
 * When the graph version or any edge changes, this hash changes — old
 * decisions remain reproducible via their stored graphSnapshotHash.
 *
 * @param {string} graphVersion  Semver string e.g. "1.0.0"
 * @param {Array}  relationships Array of edge objects
 * @returns {string} SHA-256 hex hash
 */
function computeGraphSnapshotHash(graphVersion = GRAPH_VERSION, relationships = SKILL_RELATIONSHIPS) {
  const activeEdges = relationships
    .filter(r => r.active)
    .map(r => `${r.id}:${r.fromSkill}:${r.toSkill}:${r.type}:${r.ontologyVersion}`)
    .sort()
    .join('|');
  const raw = `${graphVersion}||${activeEdges}`;
  return crypto.createHash('sha256').update(raw).digest('hex');
}

// ============================================================================
// GRAPH VALIDATION
// ============================================================================

/**
 * Validates referential integrity of the relationship graph.
 * Checks:
 *   1. fromSkill and toSkill both exist in the registry
 *   2. type is a valid RELATIONSHIP_SEMANTICS key
 *   3. id is unique across all edges
 *   4. provenance fields are present
 *
 * NOTE: Does NOT perform cycle detection — that is the responsibility of
 * validatePrerequisiteDAG() and validateOrderingGraph() below.
 *
 * @param {Array}  relationships Array of edge objects
 * @param {Object} registry      Canonical skill registry (from skillOntology.js)
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateSkillGraph(param1 = SKILL_RELATIONSHIPS, param2 = CORE_SKILL_REGISTRY) {
  let relationships, registry;
  if (Array.isArray(param1)) {
    relationships = param1;
    registry = param2 || CORE_SKILL_REGISTRY;
  } else if (param1 && typeof param1 === 'object' && Array.isArray(param2)) {
    registry = param1;
    relationships = param2;
  } else if (param1 && typeof param1 === 'object') {
    registry = param1;
    relationships = SKILL_RELATIONSHIPS;
  } else {
    relationships = SKILL_RELATIONSHIPS;
    registry = CORE_SKILL_REGISTRY;
  }

  const errors = [];
  const warnings = [];
  const seenIds = new Set();
  const validTypes = Object.keys(RELATIONSHIP_SEMANTICS);
  const skillIds = new Set(Object.keys(registry));

  for (const edge of relationships) {
    // ID uniqueness
    if (!edge.id) {
      errors.push(`Edge missing required 'id' field`);
    } else if (seenIds.has(edge.id)) {
      errors.push(`Duplicate edge id: "${edge.id}"`);
    } else {
      seenIds.add(edge.id);
    }

    // Referential integrity
    if (edge.fromSkill && !skillIds.has(edge.fromSkill)) {
      errors.push(`Edge "${edge.id}": fromSkill "${edge.fromSkill}" does not exist in registry`);
    }
    if (edge.toSkill && !skillIds.has(edge.toSkill)) {
      errors.push(`Edge "${edge.id}": toSkill "${edge.toSkill}" does not exist in registry`);
    }

    // Relationship type validity
    if (!validTypes.includes(edge.type)) {
      errors.push(`Edge "${edge.id}": unknown type "${edge.type}". Valid types: ${validTypes.join(', ')}`);
    }

    // Provenance
    if (!edge.provenance || !edge.provenance.source || !edge.provenance.confidence) {
      warnings.push(`Edge "${edge.id}" is missing provenance metadata`);
    }

    // Self-loop guard
    if (edge.fromSkill && edge.toSkill && edge.fromSkill === edge.toSkill) {
      errors.push(`Edge "${edge.id}": self-loop detected (fromSkill === toSkill = "${edge.fromSkill}")`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validates that REQUIRES edges form a Directed Acyclic Graph.
 * A cycle in REQUIRES relationships would mean "A requires B requires ... requires A",
 * which is logically invalid for prerequisite dependency resolution.
 *
 * Only REQUIRES edges are checked — PRECEDES is validated separately.
 *
 * @param {Array}  relationships Array of edge objects
 * @param {Object} registry      Canonical skill registry
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validatePrerequisiteDAG(relationships = SKILL_RELATIONSHIPS, registry = CORE_SKILL_REGISTRY) {
  const errors = [];
  const requiresEdges = relationships.filter(r => r.active && r.type === 'REQUIRES');

  // Build adjacency map: fromSkill -> [toSkill, ...]
  const adj = {};
  for (const edge of requiresEdges) {
    if (!adj[edge.fromSkill]) adj[edge.fromSkill] = [];
    adj[edge.fromSkill].push(edge.toSkill);
  }

  const visited = new Set();
  const recursionStack = new Set();

  function hasCycle(node, path = []) {
    visited.add(node);
    recursionStack.add(node);

    for (const neighbor of (adj[node] || [])) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor, [...path, node])) return true;
      } else if (recursionStack.has(neighbor)) {
        errors.push(
          `Cycle detected in prerequisite DAG: ${[...path, node, neighbor].join(' -> ')}`
        );
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  }

  const allNodes = new Set([
    ...requiresEdges.map(e => e.fromSkill),
    ...requiresEdges.map(e => e.toSkill)
  ]);

  for (const node of allNodes) {
    if (!visited.has(node)) hasCycle(node);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates PRECEDES edges independently from prerequisite dependency.
 * PRECEDES represents curriculum ordering — it may have different
 * cycle tolerance policies than REQUIRES.
 *
 * Current policy: PRECEDES graphs are validated for referential integrity
 * only. Cycle detection in PRECEDES is warned (not errored) since ordering
 * relationships may eventually support more complex curriculum structures.
 *
 * @param {Array}  relationships Array of edge objects
 * @param {Object} registry      Canonical skill registry
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateOrderingGraph(relationships = SKILL_RELATIONSHIPS, registry = CORE_SKILL_REGISTRY) {
  const errors = [];
  const warnings = [];
  const precedesEdges = relationships.filter(r => r.active && r.type === 'PRECEDES');
  const skillIds = new Set(Object.keys(registry || CORE_SKILL_REGISTRY));

  for (const edge of precedesEdges) {
    if (!skillIds.has(edge.fromSkill)) {
      errors.push(`PRECEDES edge "${edge.id}": fromSkill "${edge.fromSkill}" not in registry`);
    }
    if (!skillIds.has(edge.toSkill)) {
      errors.push(`PRECEDES edge "${edge.id}": toSkill "${edge.toSkill}" not in registry`);
    }
  }

  // Cycle detection for PRECEDES — warn, do not error
  const adj = {};
  for (const edge of precedesEdges) {
    if (!adj[edge.fromSkill]) adj[edge.fromSkill] = [];
    adj[edge.fromSkill].push(edge.toSkill);
  }

  const visited = new Set();
  const stack = new Set();

  function detectCycle(node, path = []) {
    visited.add(node);
    stack.add(node);
    for (const neighbor of (adj[node] || [])) {
      if (!visited.has(neighbor)) {
        detectCycle(neighbor, [...path, node]);
      } else if (stack.has(neighbor)) {
        warnings.push(
          `Circular PRECEDES ordering detected: ${[...path, node, neighbor].join(' -> ')} — review curriculum sequence.`
        );
      }
    }
    stack.delete(node);
  }

  for (const node of Object.keys(adj)) {
    if (!visited.has(node)) detectCycle(node);
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ============================================================================
// GRAPH QUERY FUNCTIONS
// ============================================================================

/**
 * Returns the direct prerequisites of a skill — i.e., the skills that
 * `skillId` depends on via REQUIRES or SUPPORTS edges.
 *
 * Direction: skillId ──REQUIRES──> [returned prerequisites]
 *
 * @param {string} skillId       The dependent skill
 * @param {Array}  relationships Edge list (defaults to canonical)
 * @returns {Array<{ skillId, relationshipId, type, hypothesisPriority, provenance }>}
 */
function getDirectPrerequisites(skillId, relationships = SKILL_RELATIONSHIPS) {
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
 * Returns the direct dependents of a skill — i.e., skills that REQUIRE
 * `skillId` (upstream in the learner's progression).
 *
 * Direction: [returned dependents] ──REQUIRES──> skillId
 *
 * @param {string} skillId       The prerequisite skill
 * @param {Array}  relationships Edge list (defaults to canonical)
 * @returns {Array<{ skillId, relationshipId, type }>}
 */
function getDirectDependents(skillId, relationships = SKILL_RELATIONSHIPS) {
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
 * ════════════════════════════════════════════════════════════════════
 * HYPOTHESIS BOUNDARY — Tixar Intelligence Law
 * Every object returned by this function carries:
 *   isObservedEvidence: false
 *
 * This field is NEVER omitted. It explicitly marks that this object
 * was produced by graph traversal, NOT by observing student responses.
 *
 * A hypothesis object MUST NOT be passed to evaluateTopicMastery() or
 * any evidence-consuming function. Doing so would contaminate the
 * evidence layer with graph structure.
 * ════════════════════════════════════════════════════════════════════
 *
 * @param {string} skillId       The skill to generate hypotheses for
 * @param {Array}  relationships Edge list (defaults to canonical)
 * @returns {Array<HypothesisObject>}
 */
function getPrerequisiteHypotheses(skillId, relationships = SKILL_RELATIONSHIPS) {
  const directPrereqs = getDirectPrerequisites(skillId, relationships);

  return directPrereqs.map(prereq => ({
    type:                    'PREREQUISITE_HYPOTHESIS',
    targetSkillId:           prereq.skillId,
    relationshipType:        prereq.type,
    relationshipId:          prereq.relationshipId,
    hypothesisPriority:      prereq.hypothesisPriority,
    provenance:              prereq.provenance,
    factor:                  prereq.skillId,
    evidenceWeight:          prereq.hypothesisPriority,
    // ── Hypothesis Boundary ──────────────────────────────────────────
    isObservedEvidence:      false,   // INVARIANT: always false from graph traversal
    requiresDiagnosticQuestion: true  // Student must answer questions to confirm this
    // ─────────────────────────────────────────────────────────────────
  }));
}

module.exports = {
  GRAPH_VERSION,
  RELATIONSHIP_SEMANTICS,
  SKILL_RELATIONSHIPS,
  computeGraphSnapshotHash,
  validateSkillGraph,
  validatePrerequisiteDAG,
  validateOrderingGraph,
  getDirectPrerequisites,
  getDirectDependents,
  getPrerequisiteHypotheses
};
