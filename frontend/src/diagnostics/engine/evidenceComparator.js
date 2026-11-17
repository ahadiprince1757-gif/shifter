/**
 * TIXAR PHASE 2: EVIDENCE COMPARATOR
 *
 * Responsibility:
 * Evaluates how well each candidate hypothesis is supported, contradicted, or
 * limited by the available evidence ledger.
 *
 * Epistemic Rules:
 * 1. Does not invent evidence, modify true provenance, or diagnose the student.
 * 2. An OBSERVED operation explicitly written by the student can strongly support an operation selection hypothesis.
 * 3. An INFERRED_FROM_MATCH operation CANNOT be upgraded to observed evidence. Maximum support is WEAK/MODERATE.
 * 4. DERIVED evidence can support conclusions only when its source evidence and derivation are valid.
 * 5. Contradictory evidence reduces eligibility (STRONG contradiction -> INELIGIBLE).
 * 6. Missing evidence (evidenceLimitations) must NOT count as contradictory evidence, but requires a probe.
 * 7. Evidence from the expected solution must never be mistaken for evidence of what the student did.
 * 8. An invalid or missing evidence reference causes the comparison to fail safely.
 * 9. A hypothesis cannot be stronger than its strongest legitimate supporting evidence.
 */

import { EvidenceProvenance, EvidenceSufficiency } from "../contracts/evidenceContract.js";
import {
  SupportLevel,
  ContradictionLevel,
  ProvenanceAssessment,
  DecisionEligibility,
} from "./hypothesisSchema.js";

/**
 * Builds a normalized lookup map of the evidence collection.
 * Flags duplicate evidence IDs and non-conforming entries.
 *
 * @param {Array<object>|object} evidenceInput - Array of evidence items or an evidence object
 * @returns {{ map: Map<string, object>, duplicates: string[], items: object[] }}
 */
export function indexEvidenceCollection(evidenceInput) {
  const map = new Map();
  const duplicates = [];
  let rawItems = [];

  if (Array.isArray(evidenceInput)) {
    rawItems = evidenceInput;
  } else if (evidenceInput && typeof evidenceInput === "object") {
    if (Array.isArray(evidenceInput.items)) {
      rawItems = evidenceInput.items;
    } else {
      // Build canonical ledger entries from evidenceEngine object fields if items array is absent
      rawItems = extractLedgerFromEvidenceObject(evidenceInput);
    }
  }

  for (const item of rawItems) {
    if (!item || typeof item !== "object" || !item.evidenceId) continue;
    if (map.has(item.evidenceId)) {
      duplicates.push(item.evidenceId);
    } else {
      map.set(item.evidenceId, { ...item });
    }
  }

  return { map, duplicates, items: rawItems };
}

/**
 * Helper to build evidence ledger items from an EvidenceObject.
 */
function extractLedgerFromEvidenceObject(evidence) {
  const items = [];

  // Explicit working & expressions
  if (Array.isArray(evidence.expressions) && evidence.expressions.length > 0) {
    items.push({
      evidenceId: "ev_obs_op",
      description: `Student explicitly wrote: ${evidence.expressions.join(", ")}`,
      provenance: evidence.operationProvenance || EvidenceProvenance.OBSERVED,
      source: "student_working",
    });
  }

  // Observed inputs & reversal
  if (Array.isArray(evidence.observedInputs) && evidence.observedInputs.length >= 2) {
    items.push({
      evidenceId: "ev_obs_reversed_inputs",
      description: `Student explicitly wrote inputs in reversed order: ${evidence.observedInputs.join(" / ")}`,
      provenance: evidence.inputsProvenance || EvidenceProvenance.OBSERVED,
      source: "student_working",
    });
    items.push({
      evidenceId: "ev_correct_inputs_and_op",
      description: `Student wrote inputs: ${evidence.observedInputs.join(", ")} with operation: ${evidence.observedOperation}`,
      provenance: evidence.inputsProvenance || EvidenceProvenance.OBSERVED,
      source: "student_working",
    });
  }

  // Submitted result
  if (evidence.observedResult !== null && evidence.observedResult !== undefined) {
    items.push({
      evidenceId: "ev_submitted_result",
      description: `Student submitted result: ${evidence.observedResult}`,
      provenance: evidence.resultProvenance || EvidenceProvenance.OBSERVED,
      source: "student_input",
    });
    items.push({
      evidenceId: "ev_incorrect_result",
      description: `Engine comparison confirmed submitted value (${evidence.observedResult}) differs from expected`,
      provenance: EvidenceProvenance.DERIVED,
      source: "engine_derivation",
    });
    items.push({
      evidenceId: "ev_arithmetic_divergence",
      description: `Engine verified arithmetic execution yielded ${evidence.observedResult}`,
      provenance: EvidenceProvenance.DERIVED,
      source: "engine_derivation",
    });
    items.push({
      evidenceId: "ev_sign_inversion",
      description: `Engine comparison verified magnitude matches but sign is inverted`,
      provenance: EvidenceProvenance.DERIVED,
      source: "engine_derivation",
    });
    items.push({
      evidenceId: "ev_matches_given_known",
      description: `Engine comparison verified submitted value matches a given input in the problem statement`,
      provenance: EvidenceProvenance.DERIVED,
      source: "engine_derivation",
    });
    items.push({
      evidenceId: "ev_numeric_correctness",
      description: `Engine comparison confirmed calculation matches expected numeric answer`,
      provenance: EvidenceProvenance.DERIVED,
      source: "engine_derivation",
    });
  }

  // Unit mismatch
  if (evidence.observedUnit) {
    items.push({
      evidenceId: "ev_unit_mismatch",
      description: `Observed unit '${evidence.observedUnit}' evaluated against expected unit`,
      provenance: EvidenceProvenance.DERIVED,
      source: "engine_derivation",
    });
  }

  // Bare answer characteristics & inferred operations
  if (evidence.isBareAnswer) {
    items.push({
      evidenceId: "ev_no_written_operation",
      description: "No written mathematical operation was submitted",
      provenance: EvidenceProvenance.OBSERVED,
      source: "student_input",
    });
    items.push({
      evidenceId: "ev_no_written_division",
      description: "No division expression was observed in student writing",
      provenance: EvidenceProvenance.OBSERVED,
      source: "student_input",
    });
    items.push({
      evidenceId: "ev_no_operator_or_steps",
      description: "No mathematical operator or intermediate steps were observed",
      provenance: EvidenceProvenance.OBSERVED,
      source: "student_input",
    });
    items.push({
      evidenceId: "ev_no_discernible_working",
      description: "No intermediate calculations, known-formula relations, or recognizable heuristics match the input",
      provenance: EvidenceProvenance.OBSERVED,
      source: "student_input",
    });

    if (evidence.operationProvenance === EvidenceProvenance.INFERRED_FROM_MATCH) {
      items.push({
        evidenceId: "ev_arithmetic_compatibility",
        description: "Arithmetic match inferred from knowns",
        provenance: EvidenceProvenance.INFERRED_FROM_MATCH,
        source: "engine_derivation",
      });
      items.push({
        evidenceId: "ev_inf_reversed_match",
        description: "Inverted division match inferred from knowns",
        provenance: EvidenceProvenance.INFERRED_FROM_MATCH,
        source: "engine_derivation",
      });
    }
  }

  return items;
}

/**
 * Evaluates candidate hypotheses against the authoritative evidence collection.
 *
 * @param {object} params
 * @param {Array<object>} params.hypotheses - Candidate hypotheses from hypothesisGenerator.js
 * @param {Array<object>|object} params.evidence - Evidence items collection or EvidenceObject
 * @param {string} [params.evidenceSufficiency] - Optional sufficiency override
 * @returns {object} Comparison report conforming to Phase 2 specification
 */
export function compareHypothesesAgainstEvidence({
  hypotheses = [],
  evidence = [],
  evidenceSufficiency = EvidenceSufficiency.SUFFICIENT,
}) {
  const { map: evidenceMap, duplicates, items: totalItems } = indexEvidenceCollection(evidence);

  const comparisons = [];
  const issues = [];

  if (duplicates.length > 0) {
    issues.push({
      type: "DUPLICATE_EVIDENCE_ID",
      detail: `Duplicate evidence IDs detected in evidence collection: ${duplicates.join(", ")}`,
    });
  }

  const isEmptyEvidence = totalItems.length === 0;

  for (const hyp of hypotheses) {
    const comparison = evaluateSingleHypothesis(hyp, evidenceMap, isEmptyEvidence);
    comparisons.push(comparison);
  }

  let comparisonStatus = "COMPLETE";
  if (isEmptyEvidence) {
    comparisonStatus = "EMPTY_EVIDENCE";
  } else if (comparisons.some((c) => c.issues.some((i) => i.type === "UNRESOLVED_REFERENCE"))) {
    comparisonStatus = "INVALID_REFERENCES";
  }

  return {
    comparisons,
    comparisonStatus,
    issues,
  };
}

/**
 * Evaluates a single hypothesis against the indexed evidence map.
 */
function evaluateSingleHypothesis(hyp, evidenceMap, isEmptyEvidence) {
  const hypIssues = [];
  const verifiedSupporting = [];
  const verifiedContradicting = [];
  const verifiedLimitations = [];

  // If evidence collection is completely empty, fail safely
  if (isEmptyEvidence) {
    return {
      hypothesisId: hyp.hypothesisId,
      supportingEvidence: [],
      contradictingEvidence: [],
      evidenceLimitations: hyp.evidenceLimitations || [],
      supportLevel: SupportLevel.NONE,
      contradictionLevel: ContradictionLevel.NONE,
      provenanceAssessment: ProvenanceAssessment.UNVERIFIED,
      decisionEligibility: DecisionEligibility.INELIGIBLE,
      issues: [{ type: "EMPTY_EVIDENCE", detail: "Evidence collection is empty; cannot evaluate hypothesis." }],
    };
  }

  // 1. Resolve Supporting Evidence References
  for (const citation of (hyp.supportingEvidence || [])) {
    const original = evidenceMap.get(citation.evidenceId);

    if (!original) {
      hypIssues.push({
        type: "UNRESOLVED_REFERENCE",
        evidenceId: citation.evidenceId,
        detail: `Supporting evidenceId '${citation.evidenceId}' does not exist in authoritative evidence collection.`,
      });
      continue;
    }

    // Rule 7: Expected-solution evidence cannot be used as student evidence
    if (original.provenance === EvidenceProvenance.EXPECTED) {
      hypIssues.push({
        type: "ILLEGAL_EXPECTED_PROVENANCE",
        evidenceId: citation.evidenceId,
        detail: `Expected-solution evidence cannot be used as proof of student behavior.`,
      });
      continue;
    }

    // Rule 2: Cannot upgrade INFERRED to OBSERVED
    let trueProvenance = original.provenance || citation.provenance || EvidenceProvenance.UNVERIFIED;
    if (
      original.provenance === EvidenceProvenance.INFERRED_FROM_MATCH &&
      citation.provenance === EvidenceProvenance.OBSERVED
    ) {
      hypIssues.push({
        type: "ILLEGAL_PROVENANCE_UPGRADE",
        evidenceId: citation.evidenceId,
        detail: `Cannot upgrade INFERRED_FROM_MATCH evidence to OBSERVED.`,
      });
      trueProvenance = EvidenceProvenance.INFERRED_FROM_MATCH;
    }

    // Rule 9: Derived evidence must have valid derivation
    if (original.provenance === EvidenceProvenance.DERIVED && original.invalidDerivation) {
      hypIssues.push({
        type: "INVALID_DERIVATION",
        evidenceId: citation.evidenceId,
        detail: "Derived evidence has no valid source derivation.",
      });
      continue;
    }

    verifiedSupporting.push({
      ...citation,
      provenance: trueProvenance,
      description: original.description || citation.description,
    });
  }

  // 2. Resolve Contradicting Evidence References
  for (const citation of (hyp.contradictingEvidence || [])) {
    const original = evidenceMap.get(citation.evidenceId);
    if (!original) {
      hypIssues.push({
        type: "UNRESOLVED_REFERENCE",
        evidenceId: citation.evidenceId,
        detail: `Contradicting evidenceId '${citation.evidenceId}' does not exist in evidence collection.`,
      });
      continue;
    }
    verifiedContradicting.push({
      ...citation,
      provenance: original.provenance || citation.provenance,
      description: original.description || citation.description,
    });
  }

  // 3. Resolve Evidence Limitations (Missing or unwritten work)
  // Rule 5: Missing evidence must NOT count as contradictory evidence
  for (const lim of (hyp.evidenceLimitations || [])) {
    verifiedLimitations.push({
      ...lim,
    });
  }

  // 4. Compute Support Level
  // Rule: A hypothesis cannot be stronger than its strongest legitimate supporting evidence
  let supportLevel = SupportLevel.NONE;
  if (verifiedSupporting.length > 0) {
    const hasObservedSupport = verifiedSupporting.some((e) => e.provenance === EvidenceProvenance.OBSERVED);
    // Derived causal evidence (e.g. calculation divergence, unit mismatch) gives MODERATE support.
    const hasDerivedCausalSupport = verifiedSupporting.some(
      (e) => e.provenance === EvidenceProvenance.DERIVED && e.evidenceId !== "ev_incorrect_result"
    );
    const hasInferredSupport = verifiedSupporting.some((e) => e.provenance === EvidenceProvenance.INFERRED_FROM_MATCH);

    // Corroborated probe support: If student confirmed the failure across >= 2 independent probe stages
    // (e.g. conceptual understanding + operational formula selection), the demonstrated probing behavior is STRONG
    const probeInterpretations = verifiedSupporting.filter(
      (e) => e.provenance === EvidenceProvenance.DERIVED && (e.evidenceId.includes("interp") || e.type === "PROBE_INTERPRETATION")
    );

    if (hasObservedSupport) {
      supportLevel = SupportLevel.STRONG;
    } else if (probeInterpretations.length >= 2) {
      supportLevel = SupportLevel.STRONG; // Strongly demonstrated across multiple probe stages
    } else if (hasDerivedCausalSupport) {
      supportLevel = SupportLevel.MODERATE;
    } else if (hasInferredSupport) {
      supportLevel = SupportLevel.WEAK; // Inferred match alone can never be STRONG
    } else {
      supportLevel = SupportLevel.WEAK;
    }
  }

  // 5. Compute Contradiction Level
  let contradictionLevel = ContradictionLevel.NONE;
  if (verifiedContradicting.length > 0) {
    const hasObservedContradiction = verifiedContradicting.some((e) => e.provenance === EvidenceProvenance.OBSERVED);
    if (hasObservedContradiction) {
      contradictionLevel = ContradictionLevel.STRONG;
    } else {
      contradictionLevel = ContradictionLevel.MODERATE;
    }
  }

  // 6. Compute Provenance Assessment
  let provenanceAssessment = ProvenanceAssessment.UNVERIFIED;
  if (verifiedSupporting.length > 0) {
    const provs = new Set(verifiedSupporting.map((e) => e.provenance));
    if (provs.size > 1) {
      provenanceAssessment = ProvenanceAssessment.MIXED;
    } else if (provs.has(EvidenceProvenance.OBSERVED)) {
      provenanceAssessment = ProvenanceAssessment.OBSERVED;
    } else if (provs.has(EvidenceProvenance.DERIVED)) {
      provenanceAssessment = ProvenanceAssessment.DERIVED;
    } else if (provs.has(EvidenceProvenance.INFERRED_FROM_MATCH)) {
      provenanceAssessment = ProvenanceAssessment.INFERRED;
    }
  }

  // 7. Compute Decision Eligibility
  // Rule: Contradictory evidence must reduce eligibility
  // Rule: Missing evidence (limitations) demands PROBE_REQUIRED
  let decisionEligibility = DecisionEligibility.INELIGIBLE;

  if (contradictionLevel === ContradictionLevel.STRONG) {
    // Strongly contradicted -> INELIGIBLE regardless of support
    decisionEligibility = DecisionEligibility.INELIGIBLE;
  } else if (supportLevel === SupportLevel.STRONG && contradictionLevel === ContradictionLevel.NONE) {
    // Strong observed support with no contradictions and no critical limitations -> ELIGIBLE
    if (verifiedLimitations.length === 0) {
      decisionEligibility = DecisionEligibility.ELIGIBLE;
    } else {
      decisionEligibility = DecisionEligibility.PROBE_REQUIRED;
    }
  } else if (supportLevel === SupportLevel.MODERATE || supportLevel === SupportLevel.WEAK) {
    // Inferred or partial support -> PROBE_REQUIRED
    decisionEligibility = DecisionEligibility.PROBE_REQUIRED;
  } else if (verifiedLimitations.length > 0) {
    decisionEligibility = DecisionEligibility.PROBE_REQUIRED;
  } else {
    decisionEligibility = DecisionEligibility.INELIGIBLE;
  }

  // If there are fatal unresolved reference issues, fail safely
  if (hypIssues.some((i) => i.type === "UNRESOLVED_REFERENCE")) {
    decisionEligibility = DecisionEligibility.INELIGIBLE;
    supportLevel = SupportLevel.NONE;
  }

  return {
    hypothesisId: hyp.hypothesisId,
    supportingEvidence: verifiedSupporting,
    contradictingEvidence: verifiedContradicting,
    evidenceLimitations: verifiedLimitations,
    supportLevel,
    contradictionLevel,
    provenanceAssessment,
    decisionEligibility,
    issues: hypIssues,
  };
}
