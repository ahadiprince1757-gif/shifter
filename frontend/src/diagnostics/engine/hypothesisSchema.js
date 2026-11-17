/**
 * TIXAR PHASE 2: HYPOTHESIS SCHEMA
 *
 * Defines the canonical contract for explanatory hypotheses in Tixar's
 * Diagnostic Intelligence layer.
 *
 * Epistemic Rules:
 * 1. No pseudo-probabilities: hypotheses must NOT carry arbitrary float "probabilities".
 * 2. Tripartite evidence categorization:
 *    - supportingEvidence: facts supporting the hypothesis.
 *    - contradictingEvidence: facts conflicting with the hypothesis.
 *    - evidenceLimitations: missing, unwritten, or ambiguous evidence preventing certainty.
 * 3. The generator proposes; the comparator evaluates; the ranker organizes.
 */

import { ReasoningLocation, EvidenceProvenance, EvidenceSufficiency } from "../contracts/evidenceContract.js";

/**
 * Standard Hypothesis Identifiers
 */
export const HypothesisId = {
  RELATIONSHIP_INVERSION: "relationship_inversion", // Wrong operation/formula (e.g. * instead of /)
  INPUT_ORDER_REVERSAL: "input_order_reversal",     // Reversed inputs (e.g. 3 / 180 instead of 180 / 3)
  VARIABLE_INVERSION: "variable_inversion",         // Kept as alias for input_order_reversal
  ARITHMETIC_ERROR: "arithmetic_error",             // Correct formula & inputs, calculation error
  UNIT_DIVERGENCE: "unit_divergence",               // Correct calculation, incorrect or unconverted unit
  COPIED_QUANTITY: "copied_quantity",               // Answer matches a given known quantity directly
  SIGN_ERROR: "sign_error",                         // Correct magnitude, inverted sign
  UNRESOLVED_REASONING: "unresolved_reasoning",     // Answer differs with no verifiable pattern
};

/**
 * Qualitative Hypothesis Confidence
 */
export const HypothesisConfidence = {
  UNASSESSED: "UNASSESSED",   // Freshly generated, before comparator evaluation
  HIGH: "HIGH",               // Supported by direct OBSERVED evidence with no contradictions or critical limitations
  MODERATE: "MODERATE",       // Corroborated by strong derived patterns
  LOW: "LOW",                 // Plausible compatibility only (INFERRED_FROM_MATCH)
  INCONCLUSIVE: "INCONCLUSIVE",// Cannot be established from available evidence
};

/**
 * Evidence Comparator Evaluation Enums
 */
export const SupportLevel = {
  STRONG: "STRONG",
  MODERATE: "MODERATE",
  WEAK: "WEAK",
  NONE: "NONE",
};

export const ContradictionLevel = {
  STRONG: "STRONG",
  MODERATE: "MODERATE",
  WEAK: "WEAK",
  NONE: "NONE",
};

export const ProvenanceAssessment = {
  OBSERVED: "OBSERVED",
  DERIVED: "DERIVED",
  INFERRED: "INFERRED",
  MIXED: "MIXED",
  UNVERIFIED: "UNVERIFIED",
};

export const DecisionEligibility = {
  ELIGIBLE: "ELIGIBLE",             // Meets evidentiary standard for direct diagnosis
  PROBE_REQUIRED: "PROBE_REQUIRED", // Insufficient or borderline; must query student
  INELIGIBLE: "INELIGIBLE",         // Contradicted or unsupported
};

/**
 * Hypothesis Ranker Resolution Enums
 */
export const ResolutionStatus = {
  DISTINGUISHED: "DISTINGUISHED",               // Exactly one explanation is eligible and superior
  COMPETING_HYPOTHESES: "COMPETING_HYPOTHESES", // Multiple plausible explanations remain
  INSUFFICIENT_EVIDENCE: "INSUFFICIENT_EVIDENCE",// No explanation achieves sufficiency
  NO_VALID_HYPOTHESES: "NO_VALID_HYPOTHESES",   // No candidate survived verification
};

export const RecommendedAction = {
  RESOLVE_DIAGNOSIS: "RESOLVE_DIAGNOSIS",
  ASK_PROBE: "ASK_PROBE",
  REMAIN_INCONCLUSIVE: "REMAIN_INCONCLUSIVE",
};

/**
 * Validates an evidence citation (supporting or contradicting).
 */
export function createEvidenceCitation({
  evidenceId,
  description,
  provenance = EvidenceProvenance.UNVERIFIED,
  evidenceOrigin = null,
  hypothesisId = null,
}) {
  if (!evidenceId || typeof evidenceId !== "string") {
    throw new Error("createEvidenceCitation: evidenceId string is required.");
  }
  if (!description || typeof description !== "string") {
    throw new Error("createEvidenceCitation: description string is required.");
  }
  return {
    evidenceId,
    description,
    provenance,
    evidenceOrigin,
    hypothesisId,
  };
}

/**
 * Validates an evidence limitation (missing or unwritten evidence).
 */
export function createEvidenceLimitation({
  evidenceId,
  reason,
}) {
  if (!evidenceId || typeof evidenceId !== "string") {
    throw new Error("createEvidenceLimitation: evidenceId string is required.");
  }
  if (!reason || typeof reason !== "string") {
    throw new Error("createEvidenceLimitation: reason string is required.");
  }
  return {
    evidenceId,
    reason,
  };
}

/**
 * Canonical factory for an explanatory hypothesis candidate.
 */
export function createHypothesis({
  hypothesisId,
  proposedCause,
  reasoningLocation = ReasoningLocation.UNKNOWN,
  supportingEvidence = [],
  contradictingEvidence = [],
  evidenceLimitations = [],
  evidenceSufficiency = EvidenceSufficiency.INSUFFICIENT,
  confidence = HypothesisConfidence.UNASSESSED,
  requiresProbe = true,
  metadata = {},
}) {
  if (!hypothesisId || typeof hypothesisId !== "string") {
    throw new Error("createHypothesis: hypothesisId string is required.");
  }
  if (!proposedCause || typeof proposedCause !== "string") {
    throw new Error("createHypothesis: proposedCause string is required.");
  }

  return {
    hypothesisId,
    proposedCause,
    reasoningLocation,
    supportingEvidence: Array.isArray(supportingEvidence) ? supportingEvidence : [],
    contradictingEvidence: Array.isArray(contradictingEvidence) ? contradictingEvidence : [],
    evidenceLimitations: Array.isArray(evidenceLimitations) ? evidenceLimitations : [],
    evidenceSufficiency,
    confidence,
    requiresProbe: Boolean(requiresProbe),
    metadata: { ...metadata },
  };
}
