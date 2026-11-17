/**
 * TIXAR PHASE 2 — STEP 4: PROBE EVALUATOR
 *
 * Responsibility:
 * Evaluates the student's response to an administered probe, creates new empirical
 * evidence citations with OBSERVED response provenance and DERIVED interpretation provenance,
 * and immutably updates competing explanations.
 *
 * Evaluator Invariants:
 * 1. Tripartite Separation:
 *    - Observation: what the student actually entered (PROBE_RESPONSE, OBSERVED)
 *    - Interpretation: engine deduction regarding a hypothesis (DERIVED)
 *    - Diagnosis: resolved conclusion backed by verified citations (Resolver only)
 * 2. Status Invariant:
 *    - A valid option selected produces verificationStatus: "VALID_RESPONSE" (NEVER "VERIFIED").
 *      "VERIFIED" is strictly reserved for checked mathematical/formal assertions.
 *    - Evaluation produces resolutionStatus: "EVIDENCE_UPDATED" or "UNRESOLVED" (NEVER "RESOLVED").
 * 3. Guess Handling: A guessed response (response.guessed === true or "GUESSED") is
 *    strictly prevented from strengthening any hypothesis (status: "GUESSED").
 * 4. Administration Identity: Probes are tracked by administrationId scoped to the session attempt.
 *    Repeated evaluation on the same administration does not compound evidence.
 * 5. Explicit evidenceOrigin: Records carry explicit evidenceOrigin: "PROBE_RESPONSE".
 * 6. Semantic Reasoning Consistency: Tokenized check with negation awareness prevents false-positive contradiction.
 * 7. An "UNSURE" response strictly preserves uncertainty (never forces a winner).
 */

import { EvidenceProvenance } from "../contracts/evidenceContract.js";
import { createEvidenceCitation } from "./hypothesisSchema.js";

/**
 * Normalizes probe response text
 */
function normalizeProbeText(text) {
  return String(text || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "_")
    .replace(/_+/g, "_");
}

/**
 * Inspects written reasoning for genuine conceptual contradictions with the selected answer,
 * using tokenized analysis with negation awareness to avoid false positives (P7).
 */
function hasReasoningContradiction(normalizedAnswer, reasoningText) {
  if (!reasoningText || typeof reasoningText !== "string") return false;

  const lower = reasoningText.toLowerCase();
  const tokens = lower.split(/[\s,.;:!?()]+/).filter(Boolean);
  if (tokens.length === 0) return false;

  const isNegated = (index) => {
    const window = tokens.slice(Math.max(0, index - 3), index);
    return window.some((w) =>
      ["not", "no", "never", "without", "instead", "doesn't", "dont", "wont", "wouldn't", "incorrect", "wrong"].includes(w)
    );
  };

  if (normalizedAnswer === "HALVES") {
    const doubleIdx = tokens.findIndex((t) =>
      ["double", "doubles", "doubled", "increase", "increases", "multiplied", "multiply"].includes(t)
    );
    if (doubleIdx !== -1 && !isNegated(doubleIdx)) {
      return true;
    }
  } else if (normalizedAnswer === "DOUBLES") {
    const halfIdx = tokens.findIndex((t) =>
      ["half", "halves", "halved", "decrease", "decreases", "divided", "divide"].includes(t)
    );
    if (halfIdx !== -1 && !isNegated(halfIdx)) {
      return true;
    }
  }

  return false;
}

/**
 * Evaluates an administered probe against the student's response.
 *
 * @param {object} params
 * @param {object} params.probe - The probe object that was administered
 * @param {object} params.response - Student's response { rawAnswer, writtenReasoning, guessed, administrationId, submissionId }
 * @param {Array<object>} [params.activeHypotheses] - Existing hypotheses to update
 * @param {Array<object>} [params.existingEvidence] - Prior evidence ledger
 * @returns {object} Evaluation report conforming to Phase 2 specification
 */
export function evaluateProbeResponse({
  probe,
  response = {},
  activeHypotheses = [],
  existingEvidence = [],
}) {
  if (!probe || !probe.probeId) {
    throw new Error("evaluateProbeResponse: probe definition with probeId is required.");
  }

  const rawAnswer = String(response.rawAnswer || "").trim();
  const writtenReasoning = String(response.writtenReasoning || "").trim();
  const normalizedAnswer = normalizeProbeText(rawAnswer);
  const administrationId = String(response.administrationId || "attempt_001");
  const submissionId = response.submissionId || null;
  const isGuessed = Boolean(response.guessed === true || normalizedAnswer === "GUESSED");

  // 1. Administration Tracking: Check if this specific administration attempt was already recorded
  const adminTrackId = `probe_${probe.probeId}_${administrationId}`;
  const prevAdminIds = new Set(
    (Array.isArray(existingEvidence) ? existingEvidence : []).map((e) => e.administrationId || e.evidenceId)
  );
  const isDuplicateAdministration = prevAdminIds.has(adminTrackId);

  // 2. Classify response verification status (P3: VALID_RESPONSE, never VERIFIED)
  let verificationStatus = "VALID_RESPONSE";
  let isUnsure = false;
  let isAmbiguous = false;

  if (isGuessed) {
    verificationStatus = "GUESSED";
  } else if (!rawAnswer) {
    isAmbiguous = true;
    verificationStatus = "AMBIGUOUS";
  } else if (["UNSURE", "I_AM_NOT_SURE", "NOT_SURE"].includes(normalizedAnswer)) {
    isUnsure = true;
    verificationStatus = "UNSURE";
  } else if (probe.options && !probe.options.map(normalizeProbeText).includes(normalizedAnswer)) {
    isAmbiguous = true;
    verificationStatus = "AMBIGUOUS";
  }

  // 3. Inspect written reasoning consistency with negation awareness (P7)
  let hasContradictoryReasoning = false;
  if (writtenReasoning && !isGuessed && !isUnsure && !isAmbiguous) {
    if (hasReasoningContradiction(normalizedAnswer, writtenReasoning)) {
      hasContradictoryReasoning = true;
      verificationStatus = "CONTRADICTORY";
    }
  }

  // 4. Create Observation Evidence (Raw Student Response) with explicit evidenceOrigin (P6)
  const responseEvidenceId = `ev_resp_${probe.probeId}_${administrationId}`;
  const responseEvidence = {
    evidenceId: responseEvidenceId,
    type: "PROBE_RESPONSE",
    evidenceOrigin: "PROBE_RESPONSE",
    provenance: EvidenceProvenance.OBSERVED,
    description: `Student responded '${rawAnswer}' to probe: "${probe.prompt}"`,
    value: rawAnswer,
    writtenReasoning: writtenReasoning || null,
    isGuessed,
    administrationId: adminTrackId,
    submissionId,
    skillId: probe.targetSkillId || "general",
    source: "probe_response",
  };

  const newEvidenceItems = [];
  if (!isDuplicateAdministration && !isAmbiguous) {
    newEvidenceItems.push(responseEvidence);

    if (hasContradictoryReasoning) {
      newEvidenceItems.push({
        evidenceId: `${responseEvidenceId}_reasoning_mismatch`,
        type: "REASONING_MISMATCH",
        evidenceOrigin: "PROBE_RESPONSE",
        provenance: EvidenceProvenance.OBSERVED,
        description: `Student selected '${rawAnswer}' but supplied contradictory written reasoning: "${writtenReasoning}"`,
        administrationId: adminTrackId,
        submissionId,
        skillId: probe.targetSkillId || "general",
        source: "probe_reasoning",
      });
    }
  }

  // 5. Compute Diagnostic Interpretations (Engine Deductions: DERIVED)
  // Epistemic rule: Guessed, Unsure, Ambiguous, Duplicate, or Contradictory responses
  // CANNOT strengthen or weaken any hypothesis!
  const hypothesisUpdates = [];
  const interpretationEvidence = [];

  const canEvaluateInferences =
    !isGuessed &&
    !isUnsure &&
    !isAmbiguous &&
    !isDuplicateAdministration &&
    !hasContradictoryReasoning;

  if (canEvaluateInferences) {
    for (const rule of (probe.discriminatesBetween || [])) {
      const targetHypId = rule.hypothesisId;
      const expectedVal = normalizeProbeText(rule.expectedEvidence?.responseValue);
      const ruleEffect = rule.expectedEvidence?.effect || "SUPPORTS";

      if (normalizedAnswer === expectedVal) {
        const interpId = `ev_interp_${probe.probeId}_${targetHypId}_${administrationId}`;
        const interpItem = {
          evidenceId: interpId,
          type: "PROBE_INTERPRETATION",
          evidenceOrigin: "PROBE_RESPONSE",
          provenance: EvidenceProvenance.DERIVED,
          hypothesisId: targetHypId,
          effect: ruleEffect,
          description: rule.expectedEvidence?.description || `Probe response '${rawAnswer}' ${ruleEffect.toLowerCase()}s ${targetHypId}`,
          sourceEvidenceIds: [responseEvidenceId],
          administrationId: adminTrackId,
          submissionId,
          skillId: probe.targetSkillId || "general",
          source: "probe_response",
        };

        interpretationEvidence.push(interpItem);
        newEvidenceItems.push(interpItem);

        hypothesisUpdates.push({
          hypothesisId: targetHypId,
          effect: ruleEffect,
          evidenceId: interpId,
          description: interpItem.description,
        });
      }
    }
  }

  // 6. Immutably clone and update active hypotheses with derived interpretations
  const updatedHypotheses = (activeHypotheses || []).map((hyp) => {
    const update = hypothesisUpdates.find((u) => u.hypothesisId === hyp.hypothesisId);
    if (!update) return { ...hyp };

    const newHyp = {
      ...hyp,
      supportingEvidence: [...(hyp.supportingEvidence || [])],
      contradictingEvidence: [...(hyp.contradictingEvidence || [])],
    };

    if (update.effect === "SUPPORTS") {
      newHyp.supportingEvidence.push(
        createEvidenceCitation({
          evidenceId: update.evidenceId,
          description: update.description,
          provenance: EvidenceProvenance.DERIVED,
          evidenceOrigin: "PROBE_RESPONSE",
          hypothesisId: update.hypothesisId,
        })
      );
    } else if (update.effect === "WEAKENS") {
      newHyp.contradictingEvidence.push(
        createEvidenceCitation({
          evidenceId: update.evidenceId,
          description: update.description,
          provenance: EvidenceProvenance.DERIVED,
          evidenceOrigin: "PROBE_RESPONSE",
          hypothesisId: update.hypothesisId,
        })
      );
    }

    return newHyp;
  });

  // Determine resolution state (P4: EVIDENCE_UPDATED, never RESOLVED)
  let resolutionStatus = "UNRESOLVED";
  if (canEvaluateInferences && hypothesisUpdates.length > 0) {
    resolutionStatus = "EVIDENCE_UPDATED";
  }

  return {
    probeId: probe.probeId,
    administrationId: adminTrackId,
    response: {
      rawAnswer,
      normalizedAnswer,
      writtenReasoning,
      guessed: isGuessed,
    },
    verification: {
      status: verificationStatus,
      provenance: EvidenceProvenance.OBSERVED,
    },
    responseEvidence,
    interpretationEvidence,
    evidence: newEvidenceItems,
    hypothesisUpdates,
    updatedHypotheses,
    resolutionStatus,
  };
}
