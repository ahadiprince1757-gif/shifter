/**
 * TIXAR PHASE 2: HYPOTHESIS RANKER
 *
 * Responsibility:
 * Organizes competing explanations based on evidence quality and identifies
 * whether one explanation is sufficiently distinguished from the others.
 *
 * Epistemic Rules:
 * 1. Deterministic comparison rules — NO arbitrary float probabilities or fake 0.75 scores.
 * 2. Reordering input hypotheses or evidence must NOT change the winner or ranking.
 * 3. A hypothesis with strong evidence does NOT automatically win if another has equally strong evidence.
 * 4. Never forces a winner simply because a diagnosis is desired.
 */

import {
  SupportLevel,
  ContradictionLevel,
  ProvenanceAssessment,
  DecisionEligibility,
  ResolutionStatus,
  RecommendedAction,
} from "./hypothesisSchema.js";
import { EvidenceSufficiency } from "../contracts/evidenceContract.js";

/**
 * Numeric sort tiers (strictly internal for deterministic ordering, never exposed as probabilities)
 */
const ELIGIBILITY_TIER = {
  [DecisionEligibility.ELIGIBLE]: 300,
  [DecisionEligibility.PROBE_REQUIRED]: 200,
  [DecisionEligibility.INELIGIBLE]: 100,
};

const CONTRADICTION_TIER = {
  [ContradictionLevel.NONE]: 40,
  [ContradictionLevel.WEAK]: 30,
  [ContradictionLevel.MODERATE]: 20,
  [ContradictionLevel.STRONG]: 10,
};

const SUPPORT_TIER = {
  [SupportLevel.STRONG]: 4,
  [SupportLevel.MODERATE]: 3,
  [SupportLevel.WEAK]: 2,
  [SupportLevel.NONE]: 1,
};

const PROVENANCE_TIER = {
  [ProvenanceAssessment.OBSERVED]: 4,
  [ProvenanceAssessment.DERIVED]: 3,
  [ProvenanceAssessment.INFERRED]: 2,
  [ProvenanceAssessment.MIXED]: 2,
  [ProvenanceAssessment.UNVERIFIED]: 1,
};

/**
 * Calculates a deterministic evidence strength index for sorting.
 */
function calculateEvidenceQualityIndex(comp) {
  const el = ELIGIBILITY_TIER[comp.decisionEligibility] || 0;
  const ct = CONTRADICTION_TIER[comp.contradictionLevel] || 0;
  const sp = SUPPORT_TIER[comp.supportLevel] || 0;
  const pv = PROVENANCE_TIER[comp.provenanceAssessment] || 0;

  // Specific candidate explanations (e.g. relationship_inversion, variable_inversion)
  // carry causal specificity over the generic fallback "unresolved_reasoning"
  const specificityBonus = comp.hypothesisId === "unresolved_reasoning" ? 0 : 0.5;

  return el + ct + sp + pv + specificityBonus;
}

/**
 * Ranks candidate hypotheses based on comparator outputs.
 *
 * @param {object} params
 * @param {Array<object>} params.comparisons - Evaluated comparison objects from compareHypothesesAgainstEvidence
 * @param {string} [params.evidenceSufficiency] - Pipeline sufficiency level
 * @returns {object} Ranked hypotheses and resolution decision
 */
export function rankHypotheses({
  comparisons = [],
  evidenceSufficiency = EvidenceSufficiency.SUFFICIENT,
}) {
  if (!Array.isArray(comparisons) || comparisons.length === 0) {
    return {
      rankedHypotheses: [],
      resolutionStatus: ResolutionStatus.NO_VALID_HYPOTHESES,
      recommendedAction: RecommendedAction.REMAIN_INCONCLUSIVE,
    };
  }

  // Clone and sort deterministically
  const sorted = [...comparisons].sort((a, b) => {
    const scoreA = calculateEvidenceQualityIndex(a);
    const scoreB = calculateEvidenceQualityIndex(b);

    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }

    // Tie-breaker: alphabetical by hypothesisId to guarantee order invariance
    return String(a.hypothesisId).localeCompare(String(b.hypothesisId));
  });

  // Assign 1-based ranks
  const rankedHypotheses = sorted.map((c, index) => ({
    hypothesisId: c.hypothesisId,
    rank: index + 1,
    supportLevel: c.supportLevel,
    contradictionLevel: c.contradictionLevel,
    provenanceAssessment: c.provenanceAssessment,
    decisionEligibility: c.decisionEligibility,
    supportingEvidence: c.supportingEvidence || [],
    contradictingEvidence: c.contradictingEvidence || [],
    evidenceLimitations: c.evidenceLimitations || [],
  }));

  const top = rankedHypotheses[0];

  // Distinguish generatedCandidates from viableCompetingHypotheses
  // A viable competitor is eligible or has moderate/strong support with no fatal contradiction
  const viableCompetingHypotheses = rankedHypotheses.filter(
    (h) => h !== top &&
      h.decisionEligibility !== DecisionEligibility.INELIGIBLE &&
      (h.supportLevel === SupportLevel.STRONG || h.supportLevel === SupportLevel.MODERATE) &&
      h.contradictionLevel !== ContradictionLevel.STRONG
  );

  const generatedCandidates = rankedHypotheses.map((h) => h.hypothesisId);

  // Case 1: No valid hypotheses survive
  if (!top || (top.decisionEligibility === DecisionEligibility.INELIGIBLE && top.supportLevel === SupportLevel.NONE)) {
    return {
      rankedHypotheses,
      generatedCandidates,
      viableCompetingHypotheses,
      resolutionStatus: ResolutionStatus.NO_VALID_HYPOTHESES,
      recommendedAction: RecommendedAction.REMAIN_INCONCLUSIVE,
    };
  }

  // Case 2: Exactly one explanation is ELIGIBLE with STRONG support and NO contradiction
  if (
    top.decisionEligibility === DecisionEligibility.ELIGIBLE &&
    top.supportLevel === SupportLevel.STRONG &&
    top.contradictionLevel === ContradictionLevel.NONE
  ) {
    // If another viable competing hypothesis exists with comparable support, preserve competition
    if (viableCompetingHypotheses.length > 0) {
      return {
        rankedHypotheses,
        generatedCandidates,
        viableCompetingHypotheses,
        resolutionStatus: ResolutionStatus.COMPETING_HYPOTHESES,
        recommendedAction: RecommendedAction.ASK_PROBE,
      };
    }

    // Clear single winner with no viable competitors
    return {
      rankedHypotheses,
      generatedCandidates,
      viableCompetingHypotheses,
      resolutionStatus: ResolutionStatus.DISTINGUISHED,
      recommendedAction: RecommendedAction.RESOLVE_DIAGNOSIS,
    };
  }

  // Case 3: Top hypothesis requires a probe (borderline, inferred match, or has limitations)
  if (top.decisionEligibility === DecisionEligibility.PROBE_REQUIRED) {
    const second = rankedHypotheses[1] || null;
    if (second && second.decisionEligibility === DecisionEligibility.PROBE_REQUIRED) {
      return {
        rankedHypotheses,
        generatedCandidates,
        viableCompetingHypotheses,
        resolutionStatus: ResolutionStatus.COMPETING_HYPOTHESES,
        recommendedAction: RecommendedAction.ASK_PROBE,
      };
    }

    return {
      rankedHypotheses,
      generatedCandidates,
      viableCompetingHypotheses,
      resolutionStatus: ResolutionStatus.INSUFFICIENT_EVIDENCE,
      recommendedAction: RecommendedAction.ASK_PROBE,
    };
  }

  // Fallback for unresolved or low-evidence states
  return {
    rankedHypotheses,
    generatedCandidates,
    viableCompetingHypotheses,
    resolutionStatus: ResolutionStatus.INSUFFICIENT_EVIDENCE,
    recommendedAction: RecommendedAction.ASK_PROBE,
  };
}
