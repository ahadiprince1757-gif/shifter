/**
 * TIXAR PHASE 2 — STEP 4: PROBE SELECTOR
 *
 * Responsibility:
 * Determines what additional question or diagnostic task would best distinguish
 * between remaining competing explanations or resolve unverified evidence limitations.
 *
 * Selector Invariants:
 * 1. Pairwise Discrimination Guarantee:
 *    A probe qualifies if and only if for EVERY pair of active competing hypotheses (HA, HB),
 *    there exists at least one response option where the evidential effect on HA differs from HB.
 *    Does NOT truncate or slice to two if three or more competitors exist.
 * 2. Strict Skill Identity: probe.targetSkillId MUST match question.skillId
 *    (or be explicitly declared "general"). Operation match alone is rejected.
 * 3. Exposure Tracking vs Administration Identity:
 *    Probes already administered in this diagnostic chain are tracked by probeId in
 *    administeredProbeIds / previousProbes and NEVER repeated.
 * 4. Evidence against one explanation is NOT evidence for another:
 *    Selecting 180 ÷ 3 in a formula probe WEAKENS relationship/order errors; it does NOT prove an arithmetic error.
 * 5. The probe must not reveal the answer through its wording (revealsAnswer: false).
 * 6. Always supports an "UNSURE" response option.
 * 7. If no probe pairwise-discriminates all active competitors, returns NO_DISCRIMINATING_PROBE.
 */

import { HypothesisId } from "./hypothesisSchema.js";

/**
 * Normalizes probe text for robust matching.
 */
function normalizeProbeText(text) {
  return String(text || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "_")
    .replace(/_+/g, "_");
}

/**
 * Diagnostic Probe Library
 * Structured by conceptual relationship, skill identity, and targeted hypotheses.
 */
export const PROBE_CATALOG = [
  // 1. Conceptual Probe: Tests relationship understanding (distance, time, speed)
  // Epistemic rule: Answering HALVES weakens relationship inversion; it does NOT prove input reversal!
  {
    probeId: "probe_speed_conceptual_relationship",
    targetSkillId: "physics.mechanics.speed",
    applicableOperations: ["divide", "DIVISION"],
    targetHypotheses: [
      HypothesisId.RELATIONSHIP_INVERSION,
      HypothesisId.INPUT_ORDER_REVERSAL,
    ],
    purpose: "DISTINGUISH_HYPOTHESES",
    prompt: "A vehicle travels the same distance in twice the time. What happens to its average speed?",
    responseType: "SINGLE_CHOICE",
    options: ["DOUBLES", "HALVES", "REMAINS_SAME", "UNSURE"],
    discriminatesBetween: [
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "DOUBLES",
          effect: "SUPPORTS",
          description: "Student selected that speed doubles when time doubles, indicating a multiplicative relationship assumption (v = d * t).",
        },
      },
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "HALVES",
          effect: "WEAKENS",
          description: "Student correctly identified that speed halves when time doubles, weakening the hypothesis of an inverse/multiplicative formula misconception.",
        },
      },
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "REMAINS_SAME",
          effect: "SUPPORTS",
          description: "Student indicated speed remains the same, suggesting conceptual confusion about the rate relationship.",
        },
      },
      {
        hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
        expectedEvidence: {
          responseValue: "DOUBLES",
          effect: "WEAKENS",
          description: "Student indicated speed doubles with time, which conflicts with intending inverse division.",
        },
      },
    ],
    validationRules: {
      allowsUncertainty: true,
      requiresReasoning: false,
      revealsAnswer: false,
    },
  },

  // 2. Operational Probe: Tests actual formula/substitution selection
  // Epistemic rule: Selecting 180 ÷ 3 WEAKENS relationship_inversion and input_order_reversal;
  // it does NOT positively support arithmetic_error without fresh calculation evidence!
  {
    probeId: "probe_speed_formula_selection",
    targetSkillId: "physics.mechanics.speed",
    applicableOperations: ["divide", "DIVISION"],
    targetHypotheses: [
      HypothesisId.RELATIONSHIP_INVERSION,
      HypothesisId.INPUT_ORDER_REVERSAL,
    ],
    purpose: "DISTINGUISH_HYPOTHESES",
    prompt: "A vehicle travels 180 km in 3 hours. Which expression calculates its average speed?",
    responseType: "SINGLE_CHOICE",
    options: [
      "180_DIV_3",
      "3_DIV_180",
      "180_MUL_3",
      "UNSURE",
    ],
    discriminatesBetween: [
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "180_MUL_3",
          effect: "SUPPORTS",
          description: "Student explicitly confirmed selecting 180 × 3 for average speed calculation.",
        },
      },
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "180_DIV_3",
          effect: "WEAKENS",
          description: "Student selected the correct formula (180 ÷ 3), weakening the relationship inversion hypothesis.",
        },
      },
      {
        hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
        expectedEvidence: {
          responseValue: "3_DIV_180",
          effect: "SUPPORTS",
          description: "Student confirmed calculating 3 ÷ 180 (dividing time by distance).",
        },
      },
      {
        hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
        expectedEvidence: {
          responseValue: "180_MUL_3",
          effect: "WEAKENS",
          description: "Student confirmed calculating 180 × 3, weakening the division order reversal hypothesis (3 ÷ 180).",
        },
      },
      {
        hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
        expectedEvidence: {
          responseValue: "180_DIV_3",
          effect: "WEAKENS",
          description: "Student selected the correct variable order (180 ÷ 3), weakening the input reversal hypothesis.",
        },
      },
    ],
    validationRules: {
      allowsUncertainty: true,
      requiresReasoning: false,
      revealsAnswer: false,
    },
  },

  // 3. Ohm's Law Distinguishing Probe
  {
    probeId: "probe_ohms_law_rel_inversion",
    targetSkillId: "physics.electricity.ohms_law",
    applicableOperations: ["multiply", "MULTIPLICATION"],
    targetHypotheses: [
      HypothesisId.RELATIONSHIP_INVERSION,
      HypothesisId.ARITHMETIC_ERROR,
    ],
    purpose: "DISTINGUISH_HYPOTHESES",
    prompt: "If current in a fixed resistor doubles, what happens to the voltage across it?",
    responseType: "SINGLE_CHOICE",
    options: ["DOUBLES", "HALVES", "REMAINS_SAME", "UNSURE"],
    discriminatesBetween: [
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "HALVES",
          effect: "SUPPORTS",
          description: "Student indicated voltage halves when current doubles, pointing to an inverse/division relationship assumption.",
        },
      },
      {
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        expectedEvidence: {
          responseValue: "DOUBLES",
          effect: "WEAKENS",
          description: "Student understands direct proportionality V ∝ I, weakening the inverse relationship hypothesis.",
        },
      },
      {
        hypothesisId: HypothesisId.ARITHMETIC_ERROR,
        expectedEvidence: {
          responseValue: "DOUBLES",
          effect: "NEUTRAL",
          description: "Conceptual relationship probe does not test arithmetic calculation.",
        },
      },
    ],
    validationRules: {
      allowsUncertainty: true,
      requiresReasoning: false,
      revealsAnswer: false,
    },
  },

  // 4. Copied Quantity Investigation Probe
  {
    probeId: "probe_copied_quantity_check",
    targetSkillId: "general",
    applicableOperations: [],
    targetHypotheses: [
      HypothesisId.COPIED_QUANTITY,
      HypothesisId.UNRESOLVED_REASONING,
    ],
    purpose: "INVESTIGATE_UNRESOLVED",
    prompt: "Did you calculate a new number for your answer, or select one of the numbers already in the question?",
    responseType: "SINGLE_CHOICE",
    options: [
      "CALCULATED_NEW_VALUE",
      "USED_NUMBER_FROM_QUESTION",
      "GUESSED",
      "UNSURE",
    ],
    discriminatesBetween: [
      {
        hypothesisId: HypothesisId.COPIED_QUANTITY,
        expectedEvidence: {
          responseValue: "USED_NUMBER_FROM_QUESTION",
          effect: "SUPPORTS",
          description: "Student confirmed copying a given number directly without calculation.",
        },
      },
      {
        hypothesisId: HypothesisId.COPIED_QUANTITY,
        expectedEvidence: {
          responseValue: "CALCULATED_NEW_VALUE",
          effect: "WEAKENS",
          description: "Student indicated an attempt to calculate a new value, weakening pure copying hypothesis.",
        },
      },
      {
        hypothesisId: HypothesisId.UNRESOLVED_REASONING,
        expectedEvidence: {
          responseValue: "USED_NUMBER_FROM_QUESTION",
          effect: "WEAKENS",
          description: "Student clarified a specific copying action, ruling out unspecified divergence.",
        },
      },
      {
        hypothesisId: HypothesisId.UNRESOLVED_REASONING,
        expectedEvidence: {
          responseValue: "CALCULATED_NEW_VALUE",
          effect: "SUPPORTS",
          description: "Student attempted calculation but produced an unclassified divergence.",
        },
      },
    ],
    validationRules: {
      allowsUncertainty: true,
      requiresReasoning: false,
      revealsAnswer: false,
    },
  },
];

/**
 * Verifies that a candidate probe pairwise discriminates between EVERY pair of hypotheses.
 *
 * For each pair (HA, HB), there must exist at least one response option where the effect on HA
 * differs from the effect on HB. If for all options the effect is identical, the probe fails.
 *
 * @param {object} probe - Candidate probe
 * @param {Array<object>} hypotheses - Set of active hypotheses to discriminate
 * @returns {boolean} True if every pair is distinguishable by at least one option
 */
export function checkProbePairwiseDiscrimination(probe, hypotheses) {
  if (!Array.isArray(hypotheses) || hypotheses.length <= 1) return true;

  const options = probe.options || [];
  const rules = probe.discriminatesBetween || [];

  for (let i = 0; i < hypotheses.length; i++) {
    for (let j = i + 1; j < hypotheses.length; j++) {
      const hypA = hypotheses[i].hypothesisId;
      const hypB = hypotheses[j].hypothesisId;

      let pairDistinguished = false;
      for (const opt of options) {
        const normOpt = normalizeProbeText(opt);
        const ruleA = rules.find(
          (r) => r.hypothesisId === hypA && normalizeProbeText(r.expectedEvidence?.responseValue) === normOpt
        );
        const ruleB = rules.find(
          (r) => r.hypothesisId === hypB && normalizeProbeText(r.expectedEvidence?.responseValue) === normOpt
        );

        const effectA = ruleA?.expectedEvidence?.effect || "NEUTRAL";
        const effectB = ruleB?.expectedEvidence?.effect || "NEUTRAL";

        if (effectA !== effectB) {
          pairDistinguished = true;
          break;
        }
      }

      if (!pairDistinguished) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Selects the minimal discriminating probe for a set of ranked hypotheses.
 *
 * @param {object} params
 * @param {Array<object>} params.rankedHypotheses - Ranked explanations from hypothesisRanker
 * @param {Array<object>} [params.viableCompetingHypotheses] - Explicit set of active viable competitors
 * @param {string} [params.resolutionStatus] - Resolution status from hypothesisRanker
 * @param {object} [params.question] - Authoritative problem definition with skillId
 * @param {Array<string>} [params.previousProbes] - IDs of probes already administered
 * @param {Array<string>} [params.administeredProbeIds] - IDs of probes already administered (alias)
 * @returns {object} Selected probe conforming to contract, or { status: "NO_DISCRIMINATING_PROBE" }
 */
export function selectDiscriminatingProbe({
  rankedHypotheses = [],
  viableCompetingHypotheses = null,
  resolutionStatus = null,
  question = {},
  previousProbes = [],
  administeredProbeIds = [],
}) {
  if (!Array.isArray(rankedHypotheses) || rankedHypotheses.length === 0) {
    return { status: "NO_DISCRIMINATING_PROBE", reason: "No ranked hypotheses provided." };
  }

  // Decoupled probe exposure tracking
  const prevSet = new Set([
    ...(Array.isArray(previousProbes) ? previousProbes : []),
    ...(Array.isArray(administeredProbeIds) ? administeredProbeIds : []),
  ]);

  const questionSkill = question.skillId || null;
  const qOp = String(question.expected?.operation || "").toLowerCase();

  // Identify all active competing hypotheses that require discrimination
  let activeCompetitors = [];
  if (Array.isArray(viableCompetingHypotheses) && viableCompetingHypotheses.length > 0) {
    activeCompetitors = viableCompetingHypotheses;
  } else {
    const eligible = rankedHypotheses.filter((h) => h.decisionEligibility !== "INELIGIBLE");
    activeCompetitors = eligible.length > 0
      ? eligible
      : rankedHypotheses.filter((h) => h.supportLevel !== "NONE");
  }

  // Search candidate probes in catalog
  const candidate = PROBE_CATALOG.find((probe) => {
    // 1. Must not have been administered previously in this chain (probeId exposure check)
    if (prevSet.has(probe.probeId)) return false;

    // 2. Strict Skill Identity check: probe skill MUST match question skill (or be explicitly 'general')
    if (questionSkill && probe.targetSkillId !== "general" && probe.targetSkillId !== questionSkill) {
      return false;
    }
    if (!questionSkill && probe.targetSkillId !== "general") {
      return false;
    }

    // 3. Operation compatibility check
    if (probe.applicableOperations.length > 0 && qOp) {
      const matchesOp = probe.applicableOperations.some(
        (op) =>
          op.toLowerCase() === qOp ||
          (qOp === "divide" && op === "DIVISION") ||
          (qOp === "multiply" && op === "MULTIPLICATION")
      );
      if (!matchesOp) return false;
    }

    // 4. Invariant: Must cover ALL active competitors without arbitrary truncation
    const coversAll = activeCompetitors.every((hyp) =>
      probe.targetHypotheses.includes(hyp.hypothesisId)
    );
    if (!coversAll) return false;

    // 5. Invariant: Pairwise Discrimination across ALL active competitors
    if (!checkProbePairwiseDiscrimination(probe, activeCompetitors)) {
      return false;
    }

    // 6. Invariant: Must not reveal the answer
    if (probe.validationRules?.revealsAnswer) return false;

    return true;
  });

  if (!candidate) {
    return {
      status: "NO_DISCRIMINATING_PROBE",
      reason: "No probe in catalog pairwise-discriminates all active competitors for this skill without leaking the answer.",
    };
  }

  return {
    ...candidate,
    status: "PROBE_SELECTED",
  };
}
