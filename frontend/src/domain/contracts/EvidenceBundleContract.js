/**
 * EvidenceBundle Contract
 *
 * Grouped universal evidence vocabulary shared across all subjects.
 * Every piece of evidence records:
 * - what the learner actually demonstrated (type, text, meaning)
 * - whether it is verified, divergent, missing, or ambiguous (status)
 * - where it came from (source: userWork | studentAnswer | reconciled)
 * - epistemic provenance (OBSERVED | DERIVED | INFERRED) + confidence (0.0 - 1.0)
 */

export const EVIDENCE_GROUPS = Object.freeze({
  RESPONSE: "response",
  QUANTITATIVE: "quantitative",
  STRUCTURAL: "structural",
});

export const EVIDENCE_TYPES = Object.freeze({
  // Response evidence
  CLAIM: "claim",
  DEFINITION: "definition",
  EXPLANATION: "explanation",
  COMPARISON: "comparison",
  CLASSIFICATION: "classification",
  PROCEDURE: "procedure",
  EXAMPLE: "example",
  CONCLUSION: "conclusion",
  RELATIONSHIP: "relationship",
  // Quantitative evidence
  CALCULATION: "calculation",
  EQUATION: "equation",
  QUANTITY: "quantity",
  UNIT: "unit",
  // Structural evidence
  OMISSION: "omission",
});

export const EVIDENCE_STATUS = Object.freeze({
  VERIFIED: "verified",
  DIVERGENT: "divergent",
  MISSING: "missing",
  AMBIGUOUS: "ambiguous",
});

export const EVIDENCE_PROVENANCE = Object.freeze({
  OBSERVED: "OBSERVED",
  DERIVED: "DERIVED",
  INFERRED: "INFERRED",
});

export function createEvidenceItem({
  id = null,
  type = EVIDENCE_TYPES.CLAIM,
  source = "studentAnswer",
  status = EVIDENCE_STATUS.VERIFIED,
  provenance = EVIDENCE_PROVENANCE.OBSERVED,
  confidence = 0.85,
  text = "",
  meaning = "",
  subPart = null,
  metadata = null,
}) {
  return {
    id: id || "",
    type: Object.values(EVIDENCE_TYPES).includes(type) ? type : EVIDENCE_TYPES.CLAIM,
    source,
    status: Object.values(EVIDENCE_STATUS).includes(status) ? status : EVIDENCE_STATUS.AMBIGUOUS,
    provenance: Object.values(EVIDENCE_PROVENANCE).includes(provenance)
      ? provenance
      : EVIDENCE_PROVENANCE.INFERRED,
    confidence: Math.max(0, Math.min(1, Number.isFinite(Number(confidence)) ? Number(confidence) : 0.5)),
    text: String(text || ""),
    meaning: String(meaning || ""),
    subPart: subPart ? String(subPart) : null,
    ...(metadata ? { metadata } : {}),
  };
}

export function createEvidenceBundle({
  studentAnswer = "",
  working = "",
  items = [],
  reconciliation = "UNANALYZED",
  stepAnalysis = null,
} = {}) {
  const numberedItems = items.map((item, idx) => ({
    ...item,
    id: item.id || `ev_${idx + 1}`,
  }));

  return {
    studentAnswer: String(studentAnswer || ""),
    working: String(working || ""),
    items: numberedItems,
    verified: numberedItems.filter((i) => i.status === EVIDENCE_STATUS.VERIFIED),
    divergent: numberedItems.filter((i) => i.status === EVIDENCE_STATUS.DIVERGENT),
    missing: numberedItems.filter((i) => i.status === EVIDENCE_STATUS.MISSING),
    ambiguous: numberedItems.filter((i) => i.status === EVIDENCE_STATUS.AMBIGUOUS),
    reconciliation,
    stepAnalysis,
  };
}
