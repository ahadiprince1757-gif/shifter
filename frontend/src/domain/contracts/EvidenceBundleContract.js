/**
 * EvidenceBundle Contract (v2 — Source-Separated Evidence Graph)
 *
 * Immutable factual record produced by evidence observers.
 * Enforces:
 * - Strict source separation: userWorkEvidence vs studentAnswerEvidence vs crossSourceEvidence
 * - Strict epistemic provenance: OBSERVED (raw text) | DERIVED (deterministic) | INFERRED (heuristic)
 * - Calibrated confidence derived from explicit evidence-quality factors
 * - Stable evidence IDs + relational graph (SUPPORTS, CONTRADICTS, DERIVES_FROM)
 * - Claim polarity (AFFIRMED | NEGATED) and distinction between VERIFIED, SUPPORTED, WEAK_SUPPORT, NOT_OBSERVED, MISSING
 */

export const EVIDENCE_GROUPS = Object.freeze({
  RESPONSE: "response",
  QUANTITATIVE: "quantitative",
  STRUCTURAL: "structural",
});

export const EVIDENCE_TYPES = Object.freeze({
  // Response / Conceptual evidence
  CLAIM: "claim",
  CONCEPT: "concept",
  DEFINITION: "definition",
  EXPLANATION: "explanation",
  COMPARISON: "comparison",
  CLASSIFICATION: "classification",
  PROCEDURE: "procedure",
  RULE: "rule",
  FORMULA: "formula",
  EXAMPLE: "example",
  CONCLUSION: "conclusion",
  RELATIONSHIP: "relationship",
  CAUSE: "cause",
  EFFECT: "effect",
  CONTRADICTION: "contradiction",
  FINAL_ANSWER: "final_answer",
  METHOD: "method",
  // Quantitative evidence
  CALCULATION: "calculation",
  EQUATION: "equation",
  QUANTITY: "quantity",
  UNIT: "unit",
  // Structural evidence
  OMISSION: "omission",
});

export const EVIDENCE_STATUS = Object.freeze({
  VERIFIED: "verified",         // Deterministic match (exact calc, normalized unit, explicit answer)
  SUPPORTED: "supported",       // Conceptual/semantic support (e.g. negated-safe claim match)
  WEAK_SUPPORT: "weak_support", // Fuzzy keyword overlap only — never treated as verified understanding
  DIVERGENT: "divergent",       // Contradicts expected value, calculation, or concept
  NOT_OBSERVED: "not_observed", // Extractor could not detect it (distinct from proven MISSING)
  MISSING: "missing",           // Required by questionContract / multi-part target and absent across all sources
  AMBIGUOUS: "ambiguous",       // Unclear / uninterpretable
});

export const EVIDENCE_PROVENANCE = Object.freeze({
  OBSERVED: "OBSERVED", // Literally exists in the student's text
  DERIVED: "DERIVED",   // Established by deterministic computation / normalization
  INFERRED: "INFERRED", // Suggested by heuristic / pattern, cannot be strictly proven
});

export const EVIDENCE_RELATION_TYPES = Object.freeze({
  SUPPORTS: "SUPPORTS",
  CONTRADICTS: "CONTRADICTS",
  DERIVES_FROM: "DERIVES_FROM",
});

export const RECONCILIATION_STATES = Object.freeze({
  BLANK: "BLANK",
  MALFORMED: "MALFORMED",
  NO_WORK: "NO_WORK",
  CORRECT: "CORRECT",
  WORKING_CORRECT_FINAL_WRONG: "WORKING_CORRECT_FINAL_WRONG",
  WORKING_WRONG_CORRECT_FINAL: "WORKING_WRONG_CORRECT_FINAL",
  WORKING_AND_FINAL_WRONG: "WORKING_AND_FINAL_WRONG",
  FIRST_STEP_ERROR: "FIRST_STEP_ERROR",
  LATER_STEP_ERROR: "LATER_STEP_ERROR",
  STEP_BREAKDOWN: "STEP_BREAKDOWN",
  PARTIAL_REASONING_MISSING_CALC: "PARTIAL_REASONING_MISSING_CALC",
  FINAL_DIVERGENCE: "FINAL_DIVERGENCE",
  UNIT_ERROR: "UNIT_ERROR",
  CONTRADICTION: "CONTRADICTION",
  OMISSION: "OMISSION",
  DIVERGENT_EVIDENCE: "DIVERGENT_EVIDENCE",
  PARTIAL_VERIFIED: "PARTIAL_VERIFIED",
  AMBIGUOUS: "AMBIGUOUS",
  INSUFFICIENT_EVIDENCE: "INSUFFICIENT_EVIDENCE",
  UNCLASSIFIED: "UNCLASSIFIED",
});

/**
 * Computes a calibrated confidence score [0.05, 0.99] from explicit evidence-quality factors
 * rather than arbitrary magic numbers.
 */
export function computeCalibratedConfidence({
  exactMatch = 0,
  explicitLabel = 0,
  sourceQuality = 0.8,
  ambiguity = 0,
  contradiction = 0,
  provenance = EVIDENCE_PROVENANCE.OBSERVED,
} = {}) {
  const base =
    provenance === EVIDENCE_PROVENANCE.OBSERVED
      ? 0.72
      : provenance === EVIDENCE_PROVENANCE.DERIVED
      ? 0.68
      : 0.50;

  const score =
    base +
    exactMatch * 0.18 +
    explicitLabel * 0.08 +
    sourceQuality * 0.05 -
    ambiguity * 0.25 -
    contradiction * 0.20;

  return Number(Math.max(0.05, Math.min(0.99, score)).toFixed(2));
}

export function createEvidenceItem({
  id = null,
  type = EVIDENCE_TYPES.CLAIM,
  source = "studentAnswer", // "userWork" | "studentAnswer" | "reconciled"
  location = null,          // e.g. { source: "userWork", line: 2 }
  status = EVIDENCE_STATUS.SUPPORTED,
  provenance = EVIDENCE_PROVENANCE.OBSERVED,
  confidence = null,
  confidenceFactors = null,
  text = "",
  meaning = "",
  subPart = null,
  claim = null,             // e.g. { subject, relation, polarity: "AFFIRMED" | "NEGATED" }
  derivation = null,        // e.g. { from: ["ev_1"], rule: "EXACT_UNIT_NORMALIZATION" }
  metadata = null,
}) {
  const resolvedProvenance = Object.values(EVIDENCE_PROVENANCE).includes(provenance)
    ? provenance
    : EVIDENCE_PROVENANCE.INFERRED;

  const resolvedConfidence =
    confidence !== null && Number.isFinite(Number(confidence))
      ? Math.max(0, Math.min(1, Number(confidence)))
      : computeCalibratedConfidence({ ...(confidenceFactors || {}), provenance: resolvedProvenance });

  const item = {
    id: id || "",
    type: Object.values(EVIDENCE_TYPES).includes(type) ? type : EVIDENCE_TYPES.CLAIM,
    source,
    location: location || { source },
    status: Object.values(EVIDENCE_STATUS).includes(status) ? status : EVIDENCE_STATUS.AMBIGUOUS,
    provenance: resolvedProvenance,
    confidence: resolvedConfidence,
    ...(confidenceFactors ? { confidenceFactors } : {}),
    text: String(text || ""),
    meaning: String(meaning || ""),
    subPart: subPart ? String(subPart) : null,
    ...(claim ? { claim } : {}),
    ...(derivation ? { derivation } : {}),
    ...(metadata ? { metadata } : {}),
  };

  return Object.freeze(item);
}

/**
 * Normalizes a question object into a canonical QuestionContract so observers
 * know what skill and evidence parts are being tested.
 */
export function createQuestionContract(question = {}) {
  const sc = question.skillContract || {};
  return Object.freeze({
    skillId: sc.skillId || question.skillId || null,
    skillName: sc.skillName || question.skillName || question.topic || "Core Concept",
    subject: question.subject || question.subjectId || "general",
    topic: question.topic || question.topicId || "general",
    targetConcept: sc.targetConcept || question.targetConcept || null,
    requiredEvidence: Array.isArray(sc.requiredEvidence || question.requiredEvidence)
      ? [...(sc.requiredEvidence || question.requiredEvidence)]
      : [],
    acceptableMethods: Array.isArray(sc.acceptableMethods || question.acceptableMethods)
      ? [...(sc.acceptableMethods || question.acceptableMethods)]
      : [],
    forbiddenConfusions: Array.isArray(sc.commonMisconceptions || question.forbiddenConfusions)
      ? [...(sc.commonMisconceptions || question.forbiddenConfusions)]
      : [],
    expectedAnswer: String(question.ans || question.answer || question.correctAnswer || "").trim(),
    authoritativeWhy: String(question.why || "").trim(),
  });
}

export function createEvidenceBundle({
  studentAnswer = "",
  working = "",
  items = [],
  relationships = [],
  reconciliation = RECONCILIATION_STATES.UNCLASSIFIED,
  reconciliationDetail = null,
  reasoningTrace = null,
  questionContract = null,
  stepAnalysis = null,
} = {}) {
  const numberedItems = Object.freeze(
    items.map((item, idx) =>
      Object.freeze({
        ...item,
        id: item.id || `ev_${idx + 1}`,
      })
    )
  );

  const studentAnswerEvidence = Object.freeze(
    numberedItems.filter((i) => i.source === "studentAnswer")
  );
  const userWorkEvidence = Object.freeze(
    numberedItems.filter((i) => i.source === "userWork")
  );
  const crossSourceEvidence = Object.freeze(
    numberedItems.filter((i) => i.source === "reconciled" || (i.source !== "studentAnswer" && i.source !== "userWork"))
  );

  const bundle = {
    studentAnswer: String(studentAnswer || ""),
    working: String(working || ""),
    items: numberedItems,
    studentAnswerEvidence,
    userWorkEvidence,
    crossSourceEvidence,
    relationships: Object.freeze(relationships.map((r) => Object.freeze({ ...r }))),
    verified: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.VERIFIED)),
    supported: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.SUPPORTED)),
    weakSupport: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.WEAK_SUPPORT)),
    divergent: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.DIVERGENT)),
    missing: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.MISSING)),
    notObserved: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.NOT_OBSERVED)),
    ambiguous: Object.freeze(numberedItems.filter((i) => i.status === EVIDENCE_STATUS.AMBIGUOUS)),
    reconciliation,
    reconciliationDetail: reconciliationDetail
      ? Object.freeze({ ...reconciliationDetail })
      : Object.freeze({ state: reconciliation, firstDivergence: null }),
    reasoningTrace: reasoningTrace ? Object.freeze({ ...reasoningTrace }) : null,
    questionContract: questionContract || null,
    stepAnalysis,
  };

  return Object.freeze(bundle);
}
