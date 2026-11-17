/**
 * TIXAR HYPOTHESIS ENGINE (PHASE 1.5)
 *
 * Generates competing hypotheses for why a student's answer is wrong,
 * then selects the minimal discriminating probe when evidence is insufficient.
 *
 * Epistemic Contract:
 *   Hypotheses are ranked by prior probability given the available evidence.
 *   No hypothesis may claim OBSERVED provenance if only INFERRED evidence exists.
 */

import { ReasoningLocation, OperationType, EvidenceProvenance } from "../contracts/evidenceContract.js";

// ─── Hypothesis Type Constants ───────────────────────────────────────────────

export const HypothesisType = {
  RELATIONSHIP_SELECTION: "RELATIONSHIP_SELECTION", // Wrong formula / operation
  VARIABLE_INVERSION:     "VARIABLE_INVERSION",     // Swapped numerator/denominator
  ARITHMETIC:             "ARITHMETIC",             // Correct formula, wrong calculation
  UNITS:                  "UNITS",                  // Correct number, wrong unit
  COPIED_QUANTITY:        "COPIED_QUANTITY",         // Answer is one of the knowns
  SIGN_ERROR:             "SIGN_ERROR",             // Off by sign
  GUESS:                  "GUESS",                  // No discernible pattern
  UNKNOWN:                "UNKNOWN",
};

// ─── Hypothesis Generator ────────────────────────────────────────────────────

/**
 * Generates a ranked list of competing hypotheses for an incorrect submission.
 *
 * @param {object} evidence   - Extracted evidence from evidenceEngine.js
 * @param {object} expected   - Expected solution { answer, unit, operation, inputs, relation }
 * @returns {Array<{ id, type, probability, rationale, discriminatingQuestion }>}
 */
export function generateHypotheses(evidence, expected = {}) {
  const hypotheses = [];
  const obsOp  = evidence.observedOperation  || OperationType.UNKNOWN;
  const opProv = evidence.operationProvenance || EvidenceProvenance.UNVERIFIED;
  const isBare = Boolean(evidence.isBareAnswer);
  const obsResult  = evidence.observedResult  ?? null;
  const expAnswer  = expected.answer !== null && expected.answer !== undefined
    ? parseFloat(expected.answer) : null;
  const expOp = (expected.operation || "").toUpperCase();
  const inputs = Array.isArray(expected.inputs) ? expected.inputs : [];

  // ── H1: RELATIONSHIP_SELECTION ─────────────────────────────────────────────
  // Student may have used the wrong formula (e.g. × instead of ÷)
  {
    let p = 0.20; // baseline

    // Strong signal: observed operation directly contradicts expected
    if (
      opProv === EvidenceProvenance.OBSERVED &&
      obsOp !== OperationType.UNKNOWN &&
      obsOp !== expOp
    ) {
      p = 0.90;
    } else if (
      opProv === EvidenceProvenance.INFERRED_FROM_MATCH &&
      obsOp !== OperationType.UNKNOWN &&
      obsOp !== expOp
    ) {
      // Inferred match: moderate confidence
      p = 0.55;
    } else if (
      isBare && obsResult !== null && expAnswer !== null &&
      inputs.length >= 2 &&
      Math.abs(obsResult - (inputs[0] * inputs[1])) < 0.001
    ) {
      // Bare 540 when expected 60 — multiplication match
      p = 0.50;
    }

    hypotheses.push({
      id: "H1",
      type: HypothesisType.RELATIONSHIP_SELECTION,
      reasoningLocation: ReasoningLocation.RELATIONSHIP_SELECTION,
      probability: p,
      rationale: "Student may have selected the wrong operation or formula.",
      discriminatingQuestion: "Which formula did you use to calculate the answer?",
    });
  }

  // ── H2: VARIABLE_INVERSION ─────────────────────────────────────────────────
  // Student may have swapped numerator and denominator
  {
    let p = 0.10;

    if (
      (expOp === "DIVISION" || expOp === "/") &&
      inputs.length >= 2 && obsResult !== null
    ) {
      const invertedResult = inputs[1] / inputs[0];
      if (Math.abs(obsResult - invertedResult) < 0.001) {
        p = opProv === EvidenceProvenance.OBSERVED ? 0.95 : 0.60;
      }
    }

    hypotheses.push({
      id: "H2",
      type: HypothesisType.VARIABLE_INVERSION,
      reasoningLocation: ReasoningLocation.VARIABLE_IDENTIFICATION,
      probability: p,
      rationale: "Student may have inverted the numerator and denominator.",
      discriminatingQuestion: "Which number did you divide by which?",
    });
  }

  // ── H3: ARITHMETIC ─────────────────────────────────────────────────────────
  // Correct formula, wrong arithmetic
  {
    let p = 0.10;

    if (
      obsOp === expOp &&
      inputs.length >= 2 &&
      Array.isArray(evidence.observedInputs) && evidence.observedInputs.length >= 2 &&
      Math.abs(evidence.observedInputs[0] - inputs[0]) < 0.01 &&
      Math.abs(evidence.observedInputs[1] - inputs[1]) < 0.01
    ) {
      p = 0.80; // Same formula + same inputs + wrong result = arithmetic error
    }

    hypotheses.push({
      id: "H3",
      type: HypothesisType.ARITHMETIC,
      reasoningLocation: ReasoningLocation.ARITHMETIC,
      probability: p,
      rationale: "Student may have used the correct formula but made a calculation error.",
      discriminatingQuestion: "Can you show me each step of your calculation?",
    });
  }

  // ── H4: UNITS ──────────────────────────────────────────────────────────────
  // Correct number, wrong unit
  {
    let p = 0.05;
    const expUnit = (expected.unit || "").toLowerCase();
    const obsUnit = (evidence.observedUnit || "").toLowerCase();

    if (
      expAnswer !== null && obsResult !== null &&
      Math.abs(obsResult - expAnswer) < 0.001 &&
      expUnit && obsUnit && expUnit !== obsUnit
    ) {
      p = 0.90;
    } else if (
      obsUnit && expUnit && obsUnit !== expUnit
    ) {
      p = 0.40;
    }

    hypotheses.push({
      id: "H4",
      type: HypothesisType.UNITS,
      reasoningLocation: ReasoningLocation.UNITS,
      probability: p,
      rationale: "Student may have expressed the correct value in the wrong unit.",
      discriminatingQuestion: "What unit does your answer have?",
    });
  }

  // ── H5: COPIED_QUANTITY ─────────────────────────────────────────────────────
  // Student's answer is one of the question's given knowns
  {
    let p = 0.05;

    if (isBare && obsResult !== null && inputs.length > 0) {
      const isCopy = inputs.some((k) => Math.abs(obsResult - k) < 0.001);
      if (isCopy) {
        p = 0.65;
      }
    }

    hypotheses.push({
      id: "H5",
      type: HypothesisType.COPIED_QUANTITY,
      reasoningLocation: ReasoningLocation.INTERPRETATION,
      probability: p,
      rationale: "Student may have submitted one of the given values without computing anything.",
      discriminatingQuestion: "Did you calculate a new value, or use one of the numbers from the question?",
    });
  }

  // ── H6: SIGN_ERROR ─────────────────────────────────────────────────────────
  {
    let p = 0.03;

    if (
      expAnswer !== null && obsResult !== null &&
      Math.abs(obsResult - (-expAnswer)) < 0.001
    ) {
      p = 0.75;
    }

    hypotheses.push({
      id: "H6",
      type: HypothesisType.SIGN_ERROR,
      reasoningLocation: ReasoningLocation.ARITHMETIC,
      probability: p,
      rationale: "Student's answer has the correct magnitude but wrong sign.",
      discriminatingQuestion: null,
    });
  }

  // ── H7: UNKNOWN / GUESS ────────────────────────────────────────────────────
  hypotheses.push({
    id: "H7",
    type: HypothesisType.UNKNOWN,
    reasoningLocation: ReasoningLocation.UNKNOWN,
    probability: 0.05,
    rationale: "No discernible pattern between answer and question knowns.",
    discriminatingQuestion: "Can you explain how you got your answer?",
  });

  // Sort descending by probability
  hypotheses.sort((a, b) => b.probability - a.probability);

  return hypotheses;
}

// ─── Probe Selector ─────────────────────────────────────────────────────────

/**
 * Selects the minimal diagnostic probe that best discriminates between
 * the top competing hypotheses.
 *
 * Triggers when:
 *   - The top two hypotheses have ΔP < 0.20, OR
 *   - Sufficiency is INSUFFICIENT
 *
 * @param {Array}  hypotheses - Ranked hypotheses from generateHypotheses()
 * @param {object} expected   - Expected solution model
 * @returns {{ question: string, options: string[]|null, correctAnswer: string|null } | null}
 */
export function selectMinimalProbe(hypotheses, expected = {}) {
  if (!Array.isArray(hypotheses) || hypotheses.length === 0) return null;

  const top = hypotheses[0];
  const second = hypotheses[1] || null;
  const delta = second ? top.probability - second.probability : 1.0;

  // Not ambiguous enough to need probing — highest hypothesis dominates
  if (delta >= 0.20 && top.probability >= 0.80) return null;

  // Choose probe question based on the top hypothesis type
  const expOp = (expected.operation || "").replace("divide", "÷").replace("multiply", "×");
  const expFormula = expected.relation || `result = ${expOp} of inputs`;
  const inputs = Array.isArray(expected.inputs) ? expected.inputs : [];

  switch (top.type) {
    case HypothesisType.RELATIONSHIP_SELECTION:
      return {
        question: "Which formula or operation did you use to get your answer?",
        options: inputs.length >= 2
          ? [
              `${inputs[0]} ÷ ${inputs[1]}`,
              `${inputs[0]} × ${inputs[1]}`,
              `${inputs[1]} ÷ ${inputs[0]}`,
              "Something else",
            ]
          : null,
        correctAnswer: inputs.length >= 2 ? `${inputs[0]} ÷ ${inputs[1]}` : null,
        targetHypotheses: ["H1", "H2"],
        rationale: "Discriminates between formula inversion and variable inversion.",
      };

    case HypothesisType.VARIABLE_INVERSION:
      return {
        question: "Which number did you divide by which?",
        options: inputs.length >= 2
          ? [
              `${inputs[0]} divided by ${inputs[1]}`,
              `${inputs[1]} divided by ${inputs[0]}`,
              "I didn't divide",
            ]
          : null,
        correctAnswer: inputs.length >= 2 ? `${inputs[0]} divided by ${inputs[1]}` : null,
        targetHypotheses: ["H2"],
        rationale: "Directly identifies variable ordering error.",
      };

    case HypothesisType.COPIED_QUANTITY:
      return {
        question: "Did you calculate a new value, or use one of the numbers already in the question?",
        options: ["I calculated a new value", "I used a number from the question", "I guessed"],
        correctAnswer: "I calculated a new value",
        targetHypotheses: ["H5"],
        rationale: "Checks whether student attempted calculation at all.",
      };

    default:
      return {
        question: top.discriminatingQuestion || "Can you show or describe how you got your answer?",
        options: null,
        correctAnswer: null,
        targetHypotheses: [top.id],
        rationale: "Open probe — reason unknown from bare answer alone.",
      };
  }
}
