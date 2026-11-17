/**
 * TIXAR PHASE 2: HYPOTHESIS GENERATOR
 *
 * Generates competing, evidence-grounded explanatory hypotheses for student submissions.
 *
 * Epistemic Rules:
 * 1. Proposes hypotheses; does NOT make final sufficiency or eligibility decisions
 *    (that is the sole responsibility of evidenceComparator.js).
 * 2. Tripartite evidence ledger:
 *    - supportingEvidence: facts supporting the hypothesis.
 *    - contradictingEvidence: facts that actively conflict with the hypothesis.
 *    - evidenceLimitations: missing, unwritten, or ambiguous evidence preventing certainty.
 * 3. Never confuses absence of written work with proof against an operation.
 * 4. Engine evaluations (e.g. answer ≠ expected) carry DERIVED provenance,
 *    while raw student input carries OBSERVED provenance.
 */

import {
  ReasoningLocation,
  EvidenceProvenance,
  EvidenceSufficiency,
  OperationType,
} from "../contracts/evidenceContract.js";
import {
  HypothesisId,
  HypothesisConfidence,
  createHypothesis,
  createEvidenceCitation,
  createEvidenceLimitation,
} from "./hypothesisSchema.js";

/**
 * Normalizes operation string to canonical representation
 */
function canonicalOp(op) {
  const u = String(op || "").toUpperCase();
  if (["DIVISION", "DIVIDE", "/"].includes(u)) return OperationType.DIVISION;
  if (["MULTIPLICATION", "MULTIPLY", "*"].includes(u)) return OperationType.MULTIPLICATION;
  if (["ADDITION", "ADD", "+"].includes(u)) return OperationType.ADDITION;
  if (["SUBTRACTION", "SUBTRACT", "-"].includes(u)) return OperationType.SUBTRACTION;
  return OperationType.UNKNOWN;
}

/**
 * Generates competing candidate explanations for an incorrect submission.
 *
 * @param {object} evidence - Extracted evidence from evidenceEngine.js
 * @param {object} expected - Expected problem model { answer, unit, operation, inputs, relation }
 * @param {object} [context] - Optional additional question context
 * @returns {Array<object>} List of candidate hypotheses conforming to hypothesisSchema
 */
export function generateCompetingHypotheses(evidence, expected = {}, context = {}) {
  const hypotheses = [];

  const obsResult = evidence.observedResult ?? null;
  const expAnswer = expected.answer !== null && expected.answer !== undefined
    ? parseFloat(expected.answer)
    : null;

  const obsOp = canonicalOp(evidence.observedOperation);
  const expOp = canonicalOp(expected.operation);
  const opProv = evidence.operationProvenance || EvidenceProvenance.UNVERIFIED;
  const isBare = Boolean(evidence.isBareAnswer);
  const inputs = Array.isArray(expected.inputs) ? expected.inputs : [];
  const obsInputs = Array.isArray(evidence.observedInputs) ? evidence.observedInputs : [];

  // ───────────────────────────────────────────────────────────────────────────
  // 1. RELATIONSHIP INVERSION (Wrong Operation / Formula Selection)
  // ───────────────────────────────────────────────────────────────────────────
  // Case A: Student explicitly wrote an incorrect operation
  if (
    opProv === EvidenceProvenance.OBSERVED &&
    obsOp !== OperationType.UNKNOWN &&
    obsOp !== expOp
  ) {
    hypotheses.push(
      createHypothesis({
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        proposedCause: `Student explicitly selected ${obsOp.toLowerCase()} instead of ${expOp.toLowerCase()}.`,
        reasoningLocation: ReasoningLocation.RELATIONSHIP_SELECTION,
        supportingEvidence: [
          createEvidenceCitation({
            evidenceId: "ev_obs_op",
            description: `Student explicitly wrote ${obsOp.toLowerCase()} operation: "${evidence.expressions.join(", ")}"`,
            provenance: EvidenceProvenance.OBSERVED,
          }),
        ],
        contradictingEvidence: [],
        evidenceLimitations: [],
        evidenceSufficiency: EvidenceSufficiency.SUFFICIENT,
        confidence: HypothesisConfidence.UNASSESSED,
        requiresProbe: false,
        metadata: {
          observedOperation: obsOp,
          expectedOperation: expOp,
        },
      })
    );
  }
  // Case B: Bare answer is mathematically compatible with an inverse operation,
  // but student did NOT show their work (e.g. bare 540 when 180 * 3 = 540)
  else if (
    isBare &&
    obsResult !== null &&
    inputs.length >= 2 &&
    (
      (expOp === OperationType.DIVISION && Math.abs(obsResult - (inputs[0] * inputs[1])) < 0.001) ||
      (expOp === OperationType.MULTIPLICATION && inputs[1] !== 0 && Math.abs(obsResult - (inputs[0] / inputs[1])) < 0.001)
    )
  ) {
    const matchedOp = expOp === OperationType.DIVISION
      ? OperationType.MULTIPLICATION
      : OperationType.DIVISION;

    hypotheses.push(
      createHypothesis({
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        proposedCause: `Answer is mathematically compatible with ${matchedOp.toLowerCase()} of given values (${inputs.join(` ${matchedOp === OperationType.MULTIPLICATION ? "×" : "÷"} `)} = ${obsResult}), but operation was not written.`,
        reasoningLocation: ReasoningLocation.RELATIONSHIP_SELECTION,
        supportingEvidence: [
          createEvidenceCitation({
            evidenceId: "ev_arithmetic_compatibility",
            description: `Submitted value ${obsResult} matches ${inputs[0]} ${matchedOp === OperationType.MULTIPLICATION ? "*" : "/"} ${inputs[1]} = ${obsResult}`,
            provenance: EvidenceProvenance.INFERRED_FROM_MATCH,
          }),
        ],
        contradictingEvidence: [],
        evidenceLimitations: [
          createEvidenceLimitation({
            evidenceId: "ev_no_written_operation",
            reason: "The student's operation cannot be established from the final answer alone. Bare number could be coincidental, guessed, or copied.",
          }),
        ],
        evidenceSufficiency: EvidenceSufficiency.BORDERLINE,
        confidence: HypothesisConfidence.UNASSESSED,
        requiresProbe: true,
        metadata: {
          inferredOperation: matchedOp,
          expectedOperation: expOp,
        },
      })
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 2. VARIABLE INVERSION (Swapped Inputs e.g. 3 / 180 instead of 180 / 3)
  // ───────────────────────────────────────────────────────────────────────────
  if (expOp === OperationType.DIVISION && inputs.length >= 2 && inputs[0] !== 0) {
    const invertedValue = inputs[1] / inputs[0];

    // Case A: Student explicitly wrote the reversed division
    if (
      opProv === EvidenceProvenance.OBSERVED &&
      obsOp === OperationType.DIVISION &&
      obsInputs.length >= 2 &&
      Math.abs(obsInputs[0] - inputs[1]) < 0.01 &&
      Math.abs(obsInputs[1] - inputs[0]) < 0.01
    ) {
      hypotheses.push(
        createHypothesis({
          hypothesisId: HypothesisId.VARIABLE_INVERSION,
          proposedCause: `Student divided in reversed order: ${obsInputs[0]} ÷ ${obsInputs[1]} instead of ${inputs[0]} ÷ ${inputs[1]}.`,
          reasoningLocation: ReasoningLocation.VARIABLE_IDENTIFICATION,
          supportingEvidence: [
            createEvidenceCitation({
              evidenceId: "ev_obs_reversed_inputs",
              description: `Student explicitly wrote ${obsInputs[0]} / ${obsInputs[1]}`,
              provenance: EvidenceProvenance.OBSERVED,
            }),
          ],
          contradictingEvidence: [],
          evidenceLimitations: [],
          evidenceSufficiency: EvidenceSufficiency.SUFFICIENT,
          confidence: HypothesisConfidence.UNASSESSED,
          requiresProbe: false,
          metadata: {
            observedInputs: obsInputs,
            expectedInputs: inputs,
          },
        })
      );
    }
    // Case B: Bare answer matches the inverted calculation
    else if (isBare && obsResult !== null && Math.abs(obsResult - invertedValue) < 0.001) {
      hypotheses.push(
        createHypothesis({
          hypothesisId: HypothesisId.VARIABLE_INVERSION,
          proposedCause: `Answer matches inverted division (${inputs[1]} ÷ ${inputs[0]} = ${obsResult}), but calculation was not written.`,
          reasoningLocation: ReasoningLocation.VARIABLE_IDENTIFICATION,
          supportingEvidence: [
            createEvidenceCitation({
              evidenceId: "ev_inf_reversed_match",
              description: `Submitted value ${obsResult} matches ${inputs[1]} ÷ ${inputs[0]}`,
              provenance: EvidenceProvenance.INFERRED_FROM_MATCH,
            }),
          ],
          contradictingEvidence: [],
          evidenceLimitations: [
            createEvidenceLimitation({
              evidenceId: "ev_no_written_division",
              reason: "No calculation shown; inverted division is inferred solely from arithmetic match.",
            }),
          ],
          evidenceSufficiency: EvidenceSufficiency.BORDERLINE,
          confidence: HypothesisConfidence.UNASSESSED,
          requiresProbe: true,
          metadata: {
            invertedValue,
          },
        })
      );
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 3. ARITHMETIC ERROR (Correct Formula & Inputs, Calculation Diverged)
  // ───────────────────────────────────────────────────────────────────────────
  if (
    obsOp === expOp &&
    inputs.length >= 2 &&
    obsInputs.length >= 2 &&
    Math.abs(obsInputs[0] - inputs[0]) < 0.01 &&
    Math.abs(obsInputs[1] - inputs[1]) < 0.01 &&
    obsResult !== null && expAnswer !== null &&
    Math.abs(obsResult - expAnswer) > 0.001
  ) {
    hypotheses.push(
      createHypothesis({
        hypothesisId: HypothesisId.ARITHMETIC_ERROR,
        proposedCause: `Student applied the correct formula and inputs (${inputs.join(", ")}), but execution of arithmetic yielded ${obsResult} instead of ${expAnswer}.`,
        reasoningLocation: ReasoningLocation.ARITHMETIC,
        supportingEvidence: [
          createEvidenceCitation({
            evidenceId: "ev_correct_inputs_and_op",
            description: `Student correctly set up ${inputs[0]} ${obsOp === OperationType.DIVISION ? "÷" : "×"} ${inputs[1]}`,
            provenance: EvidenceProvenance.OBSERVED,
          }),
          createEvidenceCitation({
            evidenceId: "ev_arithmetic_divergence",
            description: `Engine verified that ${inputs[0]} ${obsOp === OperationType.DIVISION ? "÷" : "×"} ${inputs[1]} equals ${expAnswer}, but student reached ${obsResult}`,
            provenance: EvidenceProvenance.DERIVED,
          }),
        ],
        contradictingEvidence: [],
        evidenceLimitations: [],
        evidenceSufficiency: EvidenceSufficiency.SUFFICIENT,
        confidence: HypothesisConfidence.UNASSESSED,
        requiresProbe: false,
        metadata: {
          observedResult: obsResult,
          expectedAnswer: expAnswer,
        },
      })
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 4. COPIED QUANTITY (Student Submitted a Given Known Directly)
  // ───────────────────────────────────────────────────────────────────────────
  if (isBare && obsResult !== null && inputs.length > 0) {
    const matchedKnown = inputs.find((k) => Math.abs(obsResult - k) < 0.001);
    if (matchedKnown !== undefined) {
      hypotheses.push(
        createHypothesis({
          hypothesisId: HypothesisId.COPIED_QUANTITY,
          proposedCause: `Student submitted ${obsResult}, which matches a quantity given in the question, without performing an operation.`,
          reasoningLocation: ReasoningLocation.INTERPRETATION,
          supportingEvidence: [
            createEvidenceCitation({
              evidenceId: "ev_matches_given_known",
              description: `Engine comparison confirmed submitted value ${obsResult} matches a given input in the question`,
              provenance: EvidenceProvenance.DERIVED,
            }),
          ],
          contradictingEvidence: [],
          evidenceLimitations: [
            createEvidenceLimitation({
              evidenceId: "ev_no_operator_or_steps",
              reason: "No mathematical operation was written; cannot determine if student copied intentionally, misunderstood the prompt, or made an unrelated error.",
            }),
          ],
          evidenceSufficiency: EvidenceSufficiency.INSUFFICIENT,
          confidence: HypothesisConfidence.UNASSESSED,
          requiresProbe: true,
          metadata: {
            copiedValue: matchedKnown,
          },
        })
      );
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 5. SIGN ERROR (Correct Magnitude, Wrong Sign)
  // ───────────────────────────────────────────────────────────────────────────
  if (
    expAnswer !== null &&
    obsResult !== null &&
    Math.abs(obsResult - (-expAnswer)) < 0.001
  ) {
    hypotheses.push(
      createHypothesis({
        hypothesisId: HypothesisId.SIGN_ERROR,
        proposedCause: `Submitted answer (${obsResult}) has the correct magnitude (${Math.abs(obsResult)}) but inverted sign (expected ${expAnswer}).`,
        reasoningLocation: ReasoningLocation.ARITHMETIC,
        supportingEvidence: [
          createEvidenceCitation({
            evidenceId: "ev_sign_inversion",
            description: `Engine comparison verified magnitude matches ${Math.abs(obsResult)} but sign is inverted from expected ${expAnswer}`,
            provenance: EvidenceProvenance.DERIVED,
          }),
        ],
        contradictingEvidence: [],
        evidenceLimitations: [],
        evidenceSufficiency: EvidenceSufficiency.SUFFICIENT,
        confidence: HypothesisConfidence.UNASSESSED,
        requiresProbe: false,
      })
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 6. UNIT DIVERGENCE (Correct Math, Wrong or Missing Unit)
  // ───────────────────────────────────────────────────────────────────────────
  const expUnit = (expected.unit || "").trim().toLowerCase();
  const obsUnit = (evidence.observedUnit || "").trim().toLowerCase();
  if (
    expAnswer !== null &&
    obsResult !== null &&
    Math.abs(obsResult - expAnswer) < 0.001 &&
    expUnit && obsUnit && expUnit !== obsUnit
  ) {
    hypotheses.push(
      createHypothesis({
        hypothesisId: HypothesisId.UNIT_DIVERGENCE,
        proposedCause: `Student performed the correct calculation (${obsResult}), but provided unit '${evidence.observedUnit}' instead of '${expected.unit}'.`,
        reasoningLocation: ReasoningLocation.UNITS,
        supportingEvidence: [
          createEvidenceCitation({
            evidenceId: "ev_unit_mismatch",
            description: `Engine comparison confirmed observed unit '${evidence.observedUnit}' does not match expected '${expected.unit}'`,
            provenance: EvidenceProvenance.DERIVED,
          }),
          createEvidenceCitation({
            evidenceId: "ev_numeric_correctness",
            description: `Engine comparison confirmed calculation ${obsResult} matches expected answer ${expAnswer}`,
            provenance: EvidenceProvenance.DERIVED,
          }),
        ],
        contradictingEvidence: [],
        evidenceLimitations: [],
        evidenceSufficiency: EvidenceSufficiency.SUFFICIENT,
        confidence: HypothesisConfidence.UNASSESSED,
        requiresProbe: false,
      })
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 7. UNRESOLVED REASONING (Fallback / Ambiguous Bare Answers)
  // ───────────────────────────────────────────────────────────────────────────
  // If no hypothesis has SUFFICIENT evidence, or if the answer is completely
  // unrecognized (like Student D: bare 40), generate UNRESOLVED_REASONING
  const hasSufficientHypothesis = hypotheses.some(
    (h) => h.evidenceSufficiency === EvidenceSufficiency.SUFFICIENT
  );

  if (!hasSufficientHypothesis || hypotheses.length === 0) {
    hypotheses.push(
      createHypothesis({
        hypothesisId: HypothesisId.UNRESOLVED_REASONING,
        proposedCause: `Student entered ${obsResult ?? `"${evidence.rawAnswer || ""}"`}. The submitted answer differs from expected (${expAnswer}), but no valid reasoning path can be established from this input alone.`,
        reasoningLocation: ReasoningLocation.UNKNOWN,
        supportingEvidence: [
          createEvidenceCitation({
            evidenceId: "ev_incorrect_result",
            description: `Engine comparison verified submitted value (${obsResult ?? "unparsed"}) does not match expected answer (${expAnswer})`,
            provenance: EvidenceProvenance.DERIVED,
          }),
        ],
        contradictingEvidence: [],
        evidenceLimitations: [
          createEvidenceLimitation({
            evidenceId: "ev_no_discernible_working",
            reason: "No intermediate calculations, known-formula relations, or recognizable heuristics match the input.",
          }),
        ],
        evidenceSufficiency: EvidenceSufficiency.INSUFFICIENT,
        confidence: HypothesisConfidence.UNASSESSED,
        requiresProbe: true,
        metadata: {
          isBareAnswer: isBare,
        },
      })
    );
  }

  return hypotheses;
}
