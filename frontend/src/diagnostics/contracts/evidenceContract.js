/**
 * TIXAR EVIDENCE & VERIFICATION PIPELINE CONTRACT
 *
 * Epistemic Invariants:
 * 1. Evidence before explanation: downstream layers cannot invent claims not in evidence.
 * 2. Evidence Provenance: explicitly distinguish OBSERVED (written by student) from INFERRED (math match).
 * 3. Evidence Sufficiency Gate: Inferred evidence CANNOT automatically claim high cause confidence.
 * 4. Distinct Confidence Dimensions:
 *    - Answer Confidence: Do we know if the answer is right/wrong?
 *    - Error Confidence: Do we know the submission is erroneous?
 *    - Evidence Sufficiency: Do we have enough evidence to claim WHY? (SUFFICIENT | INSUFFICIENT)
 *    - Cause Confidence: How certain are we of the root cognitive cause?
 *    - Repair Confidence: How certain are we that the intervention will repair this exact cause?
 * 5. Epistemic Discipline: INCONCLUSIVE is a first-class state, not a failure.
 */

/**
 * Hierarchical Reasoning Divergence Taxonomy
 */
export const ReasoningLocation = {
  INTERPRETATION: "INTERPRETATION",
  CONCEPT_SELECTION: "CONCEPT_SELECTION",
  RELATIONSHIP_SELECTION: "RELATIONSHIP_SELECTION", // e.g. Formula / Operation selection
  VARIABLE_IDENTIFICATION: "VARIABLE_IDENTIFICATION",
  SUBSTITUTION: "SUBSTITUTION",
  TRANSFORMATION: "TRANSFORMATION",
  ARITHMETIC: "ARITHMETIC",
  UNITS: "UNITS",
  CONCLUSION: "CONCLUSION",
  UNKNOWN: "UNKNOWN",
};

/**
 * Epistemic Verification Status
 */
export const VerificationStatus = {
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
  PARTIAL: "PARTIAL",
  INCONCLUSIVE: "INCONCLUSIVE",
  AMBIGUOUS: "AMBIGUOUS",
};

/**
 * Evidence Provenance System
 */
export const EvidenceProvenance = {
  OBSERVED: "OBSERVED",                     // Explicitly stated in student's input or working
  INFERRED_FROM_MATCH: "INFERRED_FROM_MATCH", // Deductively compatible with question knowns
  DERIVED: "DERIVED",                       // Computed deterministically from observed steps
  EXPECTED: "EXPECTED",                     // Sourced from authoritative question model
  ASSUMED: "ASSUMED",                       // Plausible working hypothesis
  UNVERIFIED: "UNVERIFIED",                 // Completely unsupported
};

/**
 * Evidence Sufficiency Status
 */
export const EvidenceSufficiency = {
  SUFFICIENT: "SUFFICIENT",       // Explicit evidence defends a causal claim
  INSUFFICIENT: "INSUFFICIENT",   // Answer is wrong, but cause cannot be proven without probing
  BORDERLINE: "BORDERLINE",       // Competing hypotheses exist
};

/**
 * Canonical Operation Names
 */
export const OperationType = {
  MULTIPLICATION: "MULTIPLICATION",
  DIVISION: "DIVISION",
  ADDITION: "ADDITION",
  SUBTRACTION: "SUBTRACTION",
  EXPONENTIATION: "EXPONENTIATION",
  NONE: "NONE",
  UNKNOWN: "UNKNOWN",
};

/**
 * Builds the canonical contract object representing the complete
 * evidence, verification, and sufficiency state for a student submission.
 */
export function createSubmissionContract({
  submissionId = null,
  question = {},
  student = {},
  verification = {},
  divergence = null,
  hypotheses = [],
  probe = null,
}) {
  return {
    submissionId: submissionId || `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),

    question: {
      skillId: question.skillId || "general",
      subject: question.subject || "general",
      text: question.text || question.q || "",
      expected: {
        answer: question.expected?.answer ?? null,
        unit: question.expected?.unit ?? null,
        operation: question.expected?.operation ?? null,
        relation: question.expected?.relation ?? null,
        inputs: Array.isArray(question.expected?.inputs) ? question.expected.inputs : [],
        steps: Array.isArray(question.expected?.steps) ? question.expected.steps : [],
      },
    },

    student: {
      rawAnswer: String(student.rawAnswer ?? ""),
      normalized: String(student.normalized ?? ""),
      evidence: {
        items: Array.isArray(student.evidence?.items) ? student.evidence.items : [],
        numbers: Array.isArray(student.evidence?.numbers) ? student.evidence.numbers : [],
        units: Array.isArray(student.evidence?.units) ? student.evidence.units : [],
        operators: Array.isArray(student.evidence?.operators) ? student.evidence.operators : [],
        expressions: Array.isArray(student.evidence?.expressions) ? student.evidence.expressions : [],
        variables: Array.isArray(student.evidence?.variables) ? student.evidence.variables : [],
        observedOperation: student.evidence?.observedOperation || OperationType.UNKNOWN,
        operationProvenance: student.evidence?.operationProvenance || EvidenceProvenance.UNVERIFIED,
        observedInputs: Array.isArray(student.evidence?.observedInputs) ? student.evidence.observedInputs : [],
        inputsProvenance: student.evidence?.inputsProvenance || EvidenceProvenance.UNVERIFIED,
        observedResult: student.evidence?.observedResult ?? null,
        resultProvenance: student.evidence?.resultProvenance || EvidenceProvenance.UNVERIFIED,
        observedUnit: student.evidence?.observedUnit ?? null,
        claims: Array.isArray(student.evidence?.claims) ? student.evidence.claims : [],
        isBareAnswer: Boolean(student.evidence?.isBareAnswer),
        hasIncompleteReasoning: Boolean(student.evidence?.hasIncompleteReasoning),
      },
    },

    verification: {
      status: verification.status || VerificationStatus.INCONCLUSIVE,
      answerConfidence: typeof verification.answerConfidence === "number" ? verification.answerConfidence : 0,
      errorConfidence: typeof verification.errorConfidence === "number" ? verification.errorConfidence : 0,
      evidenceSufficiency: verification.evidenceSufficiency || EvidenceSufficiency.INSUFFICIENT,
      causeConfidence: typeof verification.causeConfidence === "number" ? verification.causeConfidence : 0,
      repairConfidence: typeof verification.repairConfidence === "number" ? verification.repairConfidence : 0,
      isVerified: verification.status === VerificationStatus.CORRECT,
    },

    divergence: divergence ? {
      location: divergence.location || ReasoningLocation.UNKNOWN,
      expectedOperation: divergence.expectedOperation || null,
      observedOperation: divergence.observedOperation || null,
      expectedValue: divergence.expectedValue ?? null,
      observedValue: divergence.observedValue ?? null,
      detail: divergence.detail || "",
      provenance: divergence.provenance || EvidenceProvenance.UNVERIFIED,
    } : null,

    hypotheses: Array.isArray(hypotheses) ? hypotheses : [],

    probe: probe || null,
  };
}
