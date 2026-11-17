/**
 * TIXAR PHASE 2 — STEP 4: DIAGNOSIS RESOLVER
 *
 * Responsibility:
 * The final safety boundary of Tixar's Diagnostic Intelligence layer.
 * Validates every supporting evidence citation against the authoritative evidence ledger
 * before emitting a diagnosis. Refuses to diagnose if any citation is missing, invalid,
 * belongs to a different skill, belongs to a different submission, has unverified provenance,
 * or if unverified limitations remain.
 *
 * Resolver Invariants:
 * 1. Independent Evidence Validation (P5):
 *    - Every cited evidenceId must exist in the authoritative evidence ledger.
 *    - Provenance cannot be EXPECTED or UNVERIFIED.
 *    - Must match question.skillId (or "general").
 *    - Must match submissionId if specified.
 *    - Must match diagnosed hypothesisId.
 *    - If DERIVED, all sourceEvidenceIds must exist and be valid non-EXPECTED, non-UNVERIFIED records.
 * 2. Cannot override the Evidence Sufficiency Gate:
 *    Requires ELIGIBLE + STRONG support + NONE contradiction + ZERO limitations.
 * 3. Scope Discipline: Diagnoses the demonstrated task failure, NOT a broad persistent deficit.
 * 4. Preserves evidence origin distinction via explicit property (P6):
 *    - ORIGINAL_WORKING: what student wrote during initial problem
 *    - PROBE_RESPONSE: what student demonstrated during diagnostic probes
 *    - CORROBORATED_WORKING_AND_PROBE: demonstrated in both
 * 5. An unresolved diagnosis (UNRESOLVED_UNCERTAINTY) is a first-class success outcome.
 */

import { ResolutionStatus, DecisionEligibility, SupportLevel, ContradictionLevel } from "./hypothesisSchema.js";
import { EvidenceProvenance } from "../contracts/evidenceContract.js";

/**
 * Builds an index of the authoritative evidence ledger.
 */
function buildLedgerMap(evidenceInput) {
  const map = new Map();
  let rawItems = [];

  if (Array.isArray(evidenceInput)) {
    rawItems = evidenceInput;
  } else if (evidenceInput && typeof evidenceInput === "object") {
    if (Array.isArray(evidenceInput.items)) {
      rawItems = evidenceInput.items;
    } else {
      // If a Phase 1 EvidenceObject was passed, extract its canonical entries
      if (Array.isArray(evidenceInput.expressions)) {
        evidenceInput.expressions.forEach((expr, idx) => {
          map.set(`ev_expr_${idx}`, {
            evidenceId: `ev_expr_${idx}`,
            type: "WRITTEN_EXPRESSION",
            evidenceOrigin: "ORIGINAL_WORKING",
            provenance: evidenceInput.operationProvenance || EvidenceProvenance.OBSERVED,
          });
        });
      }
      if (evidenceInput.observedResult !== null && evidenceInput.observedResult !== undefined) {
        map.set("ev_submitted_result", {
          evidenceId: "ev_submitted_result",
          type: "SUBMISSION_ANSWER",
          evidenceOrigin: "ORIGINAL_WORKING",
          provenance: evidenceInput.resultProvenance || EvidenceProvenance.OBSERVED,
        });
      }
      return map;
    }
  }

  for (const item of rawItems) {
    if (item && item.evidenceId) {
      map.set(item.evidenceId, { ...item });
    }
  }

  return map;
}

/**
 * Resolves the final diagnosis from ranked hypotheses and authoritative evidence ledger.
 *
 * @param {object} params
 * @param {Array<object>} params.rankedHypotheses - Output from hypothesisRanker
 * @param {string} params.resolutionStatus - Output from hypothesisRanker (e.g. DISTINGUISHED, COMPETING_HYPOTHESES)
 * @param {object} [params.question] - Question model { skillId, expected, submissionId }
 * @param {Array<object>|object} [params.evidence] - Authoritative evidence collection
 * @returns {object} Final validated diagnostic decision
 */
export function resolveFinalDiagnosis({
  rankedHypotheses = [],
  resolutionStatus = ResolutionStatus.INSUFFICIENT_EVIDENCE,
  question = {},
  evidence = [],
}) {
  const targetSkillId = question.skillId || null;
  const currentSubmissionId = question.submissionId || null;
  const top = Array.isArray(rankedHypotheses) ? rankedHypotheses[0] : null;

  // 1. Invariant: If resolutionStatus is not DISTINGUISHED, refuse diagnosis
  if (resolutionStatus !== ResolutionStatus.DISTINGUISHED || !top) {
    return {
      status: "UNRESOLVED_UNCERTAINTY",
      hypothesisId: null,
      targetSkillId,
      diagnosedCause: null,
      citedEvidence: [],
      epistemicConfidence: "INCONCLUSIVE",
      explanation: "Available evidence does not uniquely distinguish the cognitive or mathematical cause of the error.",
      competingCandidates: (rankedHypotheses || []).map((h) => h.hypothesisId),
      requiresProbe: true,
    };
  }

  // 2. Invariant: Strict eligibility standards (Sufficiency Gate)
  const hasZeroLimitations = !top.evidenceLimitations || top.evidenceLimitations.length === 0;
  const isStrictlyEligible =
    top.decisionEligibility === DecisionEligibility.ELIGIBLE &&
    top.supportLevel === SupportLevel.STRONG &&
    top.contradictionLevel === ContradictionLevel.NONE &&
    hasZeroLimitations;

  if (!isStrictlyEligible) {
    return {
      status: "UNRESOLVED_UNCERTAINTY",
      hypothesisId: top.hypothesisId,
      targetSkillId,
      diagnosedCause: null,
      citedEvidence: [],
      epistemicConfidence: "INCONCLUSIVE",
      explanation: "Candidate explanation has unverified limitations, insufficient evidence, or unresolved contradictions.",
      requiresProbe: true,
    };
  }

  // 3. Invariant: Active Validation of Cited Evidence against Authoritative Ledger (P5)
  const ledgerMap = buildLedgerMap(evidence);

  if (ledgerMap.size === 0) {
    return {
      status: "UNRESOLVED_UNCERTAINTY",
      hypothesisId: top.hypothesisId,
      targetSkillId,
      diagnosedCause: null,
      citedEvidence: [],
      epistemicConfidence: "INCONCLUSIVE",
      explanation: "Authoritative evidence ledger is empty; cannot validate diagnostic citations.",
      requiresProbe: true,
    };
  }

  const supportingCitations = Array.isArray(top.supportingEvidence) ? top.supportingEvidence : [];
  if (supportingCitations.length === 0) {
    return {
      status: "UNRESOLVED_UNCERTAINTY",
      hypothesisId: top.hypothesisId,
      targetSkillId,
      diagnosedCause: null,
      citedEvidence: [],
      epistemicConfidence: "INCONCLUSIVE",
      explanation: "Hypothesis has no supporting evidence citations.",
      requiresProbe: true,
    };
  }

  const validatedCitations = [];
  let hasOriginalWorking = false;
  let hasProbeResponse = false;

  for (const citation of supportingCitations) {
    const ledgerItem = ledgerMap.get(citation.evidenceId);

    // Check A: Citation points to nonexistent evidence in ledger
    if (!ledgerItem) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Evidence citation '${citation.evidenceId}' does not exist in authoritative ledger.`,
        requiresProbe: true,
      };
    }

    // Check B: Expected-solution evidence cannot be cited as student proof
    if (ledgerItem.provenance === EvidenceProvenance.EXPECTED || citation.provenance === EvidenceProvenance.EXPECTED) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Expected solution model cannot be cited as empirical student evidence.`,
        requiresProbe: true,
      };
    }

    // Check C: Unverified provenance cannot support a diagnosis
    if (
      ledgerItem.provenance === "UNVERIFIED" ||
      ledgerItem.provenance === EvidenceProvenance.UNVERIFIED ||
      citation.provenance === "UNVERIFIED" ||
      citation.provenance === EvidenceProvenance.UNVERIFIED
    ) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Cited evidence '${citation.evidenceId}' has UNVERIFIED provenance.`,
        requiresProbe: true,
      };
    }

    // Check D: Evidence belongs to another skill
    if (targetSkillId && ledgerItem.skillId && ledgerItem.skillId !== "general" && ledgerItem.skillId !== targetSkillId) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Cited evidence '${citation.evidenceId}' belongs to skill '${ledgerItem.skillId}', differing from question skill '${targetSkillId}'.`,
        requiresProbe: true,
      };
    }

    // Check E: Evidence belongs to another submission/session
    if (currentSubmissionId && ledgerItem.submissionId && ledgerItem.submissionId !== currentSubmissionId) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Cited evidence '${citation.evidenceId}' belongs to submission '${ledgerItem.submissionId}', differing from current submission '${currentSubmissionId}'.`,
        requiresProbe: true,
      };
    }

    // Check F: Evidence citation must match diagnosed hypothesis
    if (ledgerItem.hypothesisId && ledgerItem.hypothesisId !== top.hypothesisId) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Cited evidence '${citation.evidenceId}' targets hypothesis '${ledgerItem.hypothesisId}', differing from diagnosed hypothesis '${top.hypothesisId}'.`,
        requiresProbe: true,
      };
    }
    if (citation.hypothesisId && citation.hypothesisId !== top.hypothesisId) {
      return {
        status: "UNRESOLVED_UNCERTAINTY",
        hypothesisId: top.hypothesisId,
        targetSkillId,
        diagnosedCause: null,
        citedEvidence: [],
        epistemicConfidence: "INCONCLUSIVE",
        explanation: `Citation targets hypothesis '${citation.hypothesisId}', differing from diagnosed hypothesis '${top.hypothesisId}'.`,
        requiresProbe: true,
      };
    }

    // Check G: If DERIVED, validate sourceEvidenceIds chain
    const isDerived =
      ledgerItem.provenance === EvidenceProvenance.DERIVED ||
      citation.provenance === EvidenceProvenance.DERIVED;

    if (isDerived) {
      const sourceIds = ledgerItem.sourceEvidenceIds || citation.sourceEvidenceIds || [];
      for (const srcId of sourceIds) {
        const srcItem = ledgerMap.get(srcId);
        if (!srcItem) {
          return {
            status: "UNRESOLVED_UNCERTAINTY",
            hypothesisId: top.hypothesisId,
            targetSkillId,
            diagnosedCause: null,
            citedEvidence: [],
            epistemicConfidence: "INCONCLUSIVE",
            explanation: `Derived evidence citation '${citation.evidenceId}' references nonexistent source evidence '${srcId}'.`,
            requiresProbe: true,
          };
        }
        if (srcItem.provenance === EvidenceProvenance.EXPECTED || srcItem.provenance === "UNVERIFIED") {
          return {
            status: "UNRESOLVED_UNCERTAINTY",
            hypothesisId: top.hypothesisId,
            targetSkillId,
            diagnosedCause: null,
            citedEvidence: [],
            epistemicConfidence: "INCONCLUSIVE",
            explanation: `Derived evidence source '${srcId}' has invalid provenance '${srcItem.provenance}'.`,
            requiresProbe: true,
          };
        }
        if (targetSkillId && srcItem.skillId && srcItem.skillId !== "general" && srcItem.skillId !== targetSkillId) {
          return {
            status: "UNRESOLVED_UNCERTAINTY",
            hypothesisId: top.hypothesisId,
            targetSkillId,
            diagnosedCause: null,
            citedEvidence: [],
            epistemicConfidence: "INCONCLUSIVE",
            explanation: `Derived evidence source '${srcId}' belongs to differing skill '${srcItem.skillId}'.`,
            requiresProbe: true,
          };
        }
        if (currentSubmissionId && srcItem.submissionId && srcItem.submissionId !== currentSubmissionId) {
          return {
            status: "UNRESOLVED_UNCERTAINTY",
            hypothesisId: top.hypothesisId,
            targetSkillId,
            diagnosedCause: null,
            citedEvidence: [],
            epistemicConfidence: "INCONCLUSIVE",
            explanation: `Derived evidence source '${srcId}' belongs to differing submission '${srcItem.submissionId}'.`,
            requiresProbe: true,
          };
        }
      }
    }

    // Determine origin explicitly (P6)
    const explicitOrigin = ledgerItem.evidenceOrigin || citation.evidenceOrigin || null;
    if (explicitOrigin === "ORIGINAL_WORKING") {
      hasOriginalWorking = true;
    } else if (explicitOrigin === "PROBE_RESPONSE") {
      hasProbeResponse = true;
    } else {
      // If explicit origin is missing, check known type tags; do NOT default to ORIGINAL_WORKING
      if (ledgerItem.type === "PROBE_RESPONSE" || ledgerItem.type === "PROBE_INTERPRETATION") {
        hasProbeResponse = true;
      } else if (
        ledgerItem.type === "SUBMISSION_ANSWER" ||
        ledgerItem.type === "WRITTEN_EXPRESSION" ||
        ledgerItem.type === "OBSERVED_CALCULATION"
      ) {
        hasOriginalWorking = true;
      }
    }

    validatedCitations.push({
      ...citation,
      provenance: ledgerItem.provenance || citation.provenance,
      evidenceOrigin: explicitOrigin,
      source: ledgerItem.source || "evidence_ledger",
      skillId: ledgerItem.skillId || null,
      submissionId: ledgerItem.submissionId || null,
    });
  }

  // Synthesize aggregate evidenceOrigin
  let evidenceOrigin = "UNSPECIFIED_ORIGIN";
  if (hasProbeResponse && hasOriginalWorking) {
    evidenceOrigin = "CORROBORATED_WORKING_AND_PROBE";
  } else if (hasProbeResponse) {
    evidenceOrigin = "PROBE_RESPONSE";
  } else if (hasOriginalWorking) {
    evidenceOrigin = "ORIGINAL_WORKING";
  }

  // Construct verified, scope-disciplined diagnosis
  const diagnosedCause = getHumanReadableCause(top.hypothesisId, question, evidenceOrigin);

  return {
    status: "DIAGNOSED",
    hypothesisId: top.hypothesisId,
    targetSkillId,
    diagnosedCause,
    evidenceOrigin,
    citedEvidence: validatedCitations,
    epistemicConfidence: "HIGH",
    explanation: `Demonstrated failure on this problem: ${diagnosedCause}.`,
    demonstratedFailureMode: top.hypothesisId,
    requiresProbe: false,
  };
}

/**
 * Maps hypothesis ID to objective, evidence-grounded failure descriptions
 * (describing demonstrated task behavior, not unprovable psychological states).
 */
function getHumanReadableCause(hypothesisId, question = {}, evidenceOrigin = "ORIGINAL_WORKING") {
  const isProbeOrigin = evidenceOrigin === "PROBE_RESPONSE";
  const opName =
    question.expected?.operation === "divide"
      ? "multiplication instead of division"
      : "division instead of multiplication";

  switch (hypothesisId) {
    case "relationship_inversion":
      return isProbeOrigin
        ? `Demonstrated multiplicative relationship selection during diagnostic probing; original calculation remains unverified`
        : `Selected inverse operation (${opName})`;
    case "input_order_reversal":
    case "variable_inversion":
      return isProbeOrigin
        ? `Demonstrated inverted input ordering during diagnostic probing (dividing time by distance)`
        : `Reversed input ordering during calculation (divided time by distance instead of distance by time)`;
    case "arithmetic_error":
      return "Calculation execution error during arithmetic calculation";
    case "copied_quantity":
      return "Substituted a given problem quantity directly without calculating";
    case "sign_error":
      return "Calculated correct magnitude with inverted sign";
    case "unit_divergence":
      return "Calculated correct value but specified incorrect unit";
    default:
      return "Unclassified reasoning divergence";
  }
}
