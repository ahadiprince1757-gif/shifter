/**
 * TIXAR PHASE 2 — STEP 3 ADVERSARIAL & ACCEPTANCE TEST SUITE
 *
 * Verifies evidenceComparator.js and hypothesisRanker.js against all 14 adversarial
 * conditions, the 4 student archetypes, and multi-structure cross-domain problems.
 *
 * Run with: node frontend/src/diagnostics/adversarial/step3AdversarialTest.js
 */

import { extractSubmissionEvidence } from "../engine/evidenceEngine.js";
import { generateCompetingHypotheses } from "../engine/hypothesisGenerator.js";
import { compareHypothesesAgainstEvidence } from "../engine/evidenceComparator.js";
import { rankHypotheses } from "../engine/hypothesisRanker.js";
import {
  HypothesisId,
  SupportLevel,
  ContradictionLevel,
  DecisionEligibility,
  ResolutionStatus,
  RecommendedAction,
  createHypothesis,
  createEvidenceCitation,
  createEvidenceLimitation,
} from "../engine/hypothesisSchema.js";
import { EvidenceProvenance } from "../contracts/evidenceContract.js";

const SPEED_QUESTION = {
  q: "A car travels 180 km in 3 hours. Calculate its average speed.",
  expected: {
    answer: 60,
    unit: "km/h",
    operation: "divide",
    inputs: [180, 3],
    relation: "speed = distance / time",
  },
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`          ${err.message}`);
    failed++;
  }
}

console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
console.log(  "║       TIXAR PHASE 2 — STEP 3: COMPARATOR & RANKER TEST SUITE         ║");
console.log(  "╚══════════════════════════════════════════════════════════════════════╝\n");

console.log("── PART 1: 14 ADVERSARIAL STRESS TESTS ─────────────────────────────");

test("Adv 1: Evidence ID does not exist → fails safely, flags unresolved reference", () => {
  const badHyp = createHypothesis({
    hypothesisId: "ghost_hypothesis",
    proposedCause: "Uses non-existent evidence",
    supportingEvidence: [
      createEvidenceCitation({
        evidenceId: "ev_does_not_exist",
        description: "Ghost evidence",
        provenance: EvidenceProvenance.OBSERVED,
      }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [badHyp],
    evidence: [{ evidenceId: "ev_real", description: "Real evidence", provenance: EvidenceProvenance.OBSERVED }],
  });
  assert(res.comparisonStatus === "INVALID_REFERENCES", `status should be INVALID_REFERENCES, got ${res.comparisonStatus}`);
  assert(res.comparisons[0].decisionEligibility === DecisionEligibility.INELIGIBLE, "Must be INELIGIBLE");
  assert(res.comparisons[0].supportLevel === SupportLevel.NONE, "Support must be NONE");
});

test("Adv 2: Evidence ID is duplicated → detected and flagged in issues", () => {
  const hyp = createHypothesis({
    hypothesisId: "test_hyp",
    proposedCause: "Test duplicate handling",
    supportingEvidence: [
      createEvidenceCitation({
        evidenceId: "ev_dup",
        description: "Evidence dup",
        provenance: EvidenceProvenance.OBSERVED,
      }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [hyp],
    evidence: [
      { evidenceId: "ev_dup", description: "First copy", provenance: EvidenceProvenance.OBSERVED },
      { evidenceId: "ev_dup", description: "Second copy", provenance: EvidenceProvenance.OBSERVED },
    ],
  });
  assert(res.issues.some((i) => i.type === "DUPLICATE_EVIDENCE_ID"), "Must detect duplicate evidence ID");
});

test("Adv 3: Inferred operation incorrectly presented as observed → illegal upgrade rejected", () => {
  const badHyp = createHypothesis({
    hypothesisId: "forged_hyp",
    proposedCause: "Attempts to upgrade inferred match to observed",
    supportingEvidence: [
      createEvidenceCitation({
        evidenceId: "ev_math_match",
        description: "Arithmetic match",
        provenance: EvidenceProvenance.OBSERVED, // Fraudulent claim!
      }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [badHyp],
    evidence: [
      { evidenceId: "ev_math_match", description: "Arithmetic match", provenance: EvidenceProvenance.INFERRED_FROM_MATCH },
    ],
  });
  assert(res.comparisons[0].issues.some((i) => i.type === "ILLEGAL_PROVENANCE_UPGRADE"), "Must reject provenance upgrade");
  assert(res.comparisons[0].supportLevel !== SupportLevel.STRONG, "Support level cannot be STRONG for inferred operation");
  assert(res.comparisons[0].decisionEligibility === DecisionEligibility.PROBE_REQUIRED, "Must require a probe");
});

test("Adv 4: Expected-solution evidence used as student evidence → rejected from support", () => {
  const badHyp = createHypothesis({
    hypothesisId: "hyp_using_expected",
    proposedCause: "Claims expected solution as student proof",
    supportingEvidence: [
      createEvidenceCitation({
        evidenceId: "ev_expected_formula",
        description: "v = d / t from question model",
        provenance: EvidenceProvenance.OBSERVED,
      }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [badHyp],
    evidence: [
      { evidenceId: "ev_expected_formula", description: "Model relation", provenance: EvidenceProvenance.EXPECTED },
    ],
  });
  assert(res.comparisons[0].issues.some((i) => i.type === "ILLEGAL_EXPECTED_PROVENANCE"), "Must reject expected evidence as student support");
  assert(res.comparisons[0].decisionEligibility === DecisionEligibility.INELIGIBLE, "Must be INELIGIBLE");
});

test("Adv 5: Strong supporting and strong contradictory evidence → reduced eligibility (INELIGIBLE)", () => {
  const conflictedHyp = createHypothesis({
    hypothesisId: "conflicted_hyp",
    proposedCause: "Has both strong support and strong contradiction",
    supportingEvidence: [
      createEvidenceCitation({ evidenceId: "ev_sup", description: "Saw division", provenance: EvidenceProvenance.OBSERVED }),
    ],
    contradictingEvidence: [
      createEvidenceCitation({ evidenceId: "ev_con", description: "Also saw multiplication", provenance: EvidenceProvenance.OBSERVED }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [conflictedHyp],
    evidence: [
      { evidenceId: "ev_sup", description: "Saw division", provenance: EvidenceProvenance.OBSERVED },
      { evidenceId: "ev_con", description: "Also saw multiplication", provenance: EvidenceProvenance.OBSERVED },
    ],
  });
  assert(res.comparisons[0].contradictionLevel === ContradictionLevel.STRONG, "Contradiction must be STRONG");
  assert(res.comparisons[0].decisionEligibility === DecisionEligibility.INELIGIBLE, "Must be INELIGIBLE when strongly contradicted");
});

test("Adv 6: Two hypotheses have equally strong evidence → resolution is COMPETING_HYPOTHESES", () => {
  const compA = {
    hypothesisId: "hyp_alpha",
    supportLevel: SupportLevel.STRONG,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "OBSERVED",
    decisionEligibility: DecisionEligibility.ELIGIBLE,
  };
  const compB = {
    hypothesisId: "hyp_beta",
    supportLevel: SupportLevel.STRONG,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "OBSERVED",
    decisionEligibility: DecisionEligibility.ELIGIBLE,
  };
  const ranked = rankHypotheses({ comparisons: [compA, compB] });
  assert(ranked.resolutionStatus === ResolutionStatus.COMPETING_HYPOTHESES, "Must resolve to COMPETING_HYPOTHESES");
  assert(ranked.recommendedAction === RecommendedAction.ASK_PROBE, "Must recommend ASK_PROBE");
});

test("Adv 7: One hypothesis has weak evidence while another has strong evidence → strong is DISTINGUISHED", () => {
  const compStrong = {
    hypothesisId: "hyp_strong",
    supportLevel: SupportLevel.STRONG,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "OBSERVED",
    decisionEligibility: DecisionEligibility.ELIGIBLE,
  };
  const compWeak = {
    hypothesisId: "hyp_weak",
    supportLevel: SupportLevel.WEAK,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "INFERRED",
    decisionEligibility: DecisionEligibility.PROBE_REQUIRED,
  };
  const ranked = rankHypotheses({ comparisons: [compWeak, compStrong] });
  assert(ranked.resolutionStatus === ResolutionStatus.DISTINGUISHED, "Must resolve to DISTINGUISHED");
  assert(ranked.rankedHypotheses[0].hypothesisId === "hyp_strong", "Strong hypothesis must rank 1");
  assert(ranked.recommendedAction === RecommendedAction.RESOLVE_DIAGNOSIS, "Action must be RESOLVE_DIAGNOSIS");
});

test("Adv 8: Missing evidence is not classified as contradictory evidence", () => {
  const hypWithLimitation = createHypothesis({
    hypothesisId: "hyp_with_limit",
    proposedCause: "Inferred calculation with missing written steps",
    supportingEvidence: [
      createEvidenceCitation({ evidenceId: "ev_inf", description: "Matches 180 * 3", provenance: EvidenceProvenance.INFERRED_FROM_MATCH }),
    ],
    evidenceLimitations: [
      createEvidenceLimitation({ evidenceId: "ev_no_work", reason: "Student did not write working" }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [hypWithLimitation],
    evidence: [{ evidenceId: "ev_inf", description: "Matches 180 * 3", provenance: EvidenceProvenance.INFERRED_FROM_MATCH }],
  });
  assert(res.comparisons[0].contradictionLevel === ContradictionLevel.NONE, "Missing evidence must NOT produce contradiction");
  assert(res.comparisons[0].decisionEligibility === DecisionEligibility.PROBE_REQUIRED, "Limitation requires probe");
});

test("Adv 9: Derived evidence has invalid derivation → rejected from supporting evidence", () => {
  const derivedHyp = createHypothesis({
    hypothesisId: "hyp_derived",
    proposedCause: "Relies on invalid derived evidence",
    supportingEvidence: [
      createEvidenceCitation({ evidenceId: "ev_bad_derived", description: "Broken derivation", provenance: EvidenceProvenance.DERIVED }),
    ],
  });
  const res = compareHypothesesAgainstEvidence({
    hypotheses: [derivedHyp],
    evidence: [{ evidenceId: "ev_bad_derived", description: "Broken derivation", provenance: EvidenceProvenance.DERIVED, invalidDerivation: true }],
  });
  assert(res.comparisons[0].issues.some((i) => i.type === "INVALID_DERIVATION"), "Must detect invalid derivation");
  assert(res.comparisons[0].supportLevel === SupportLevel.NONE, "Support level must fall to NONE");
});

test("Adv 10: Comparator receives empty evidence collection → fails safely with EMPTY_EVIDENCE", () => {
  const hyp = createHypothesis({
    hypothesisId: "hyp_empty",
    proposedCause: "Empty test",
    supportingEvidence: [createEvidenceCitation({ evidenceId: "ev_any", description: "Any", provenance: EvidenceProvenance.OBSERVED })],
  });
  const res = compareHypothesesAgainstEvidence({ hypotheses: [hyp], evidence: [] });
  assert(res.comparisonStatus === "EMPTY_EVIDENCE", "Must return EMPTY_EVIDENCE status");
  assert(res.comparisons[0].decisionEligibility === DecisionEligibility.INELIGIBLE, "Must be INELIGIBLE");
});

test("Adv 11: Ranker receives no valid hypotheses → returns NO_VALID_HYPOTHESES & REMAIN_INCONCLUSIVE", () => {
  const ranked = rankHypotheses({ comparisons: [] });
  assert(ranked.resolutionStatus === ResolutionStatus.NO_VALID_HYPOTHESES, "Must return NO_VALID_HYPOTHESES");
  assert(ranked.recommendedAction === RecommendedAction.REMAIN_INCONCLUSIVE, "Must return REMAIN_INCONCLUSIVE");
});

test("Adv 12: Reordering input evidence does not change the ranking", () => {
  const hyp = createHypothesis({
    hypothesisId: "hyp_order",
    proposedCause: "Order invariance test",
    supportingEvidence: [
      createEvidenceCitation({ evidenceId: "ev_1", description: "First", provenance: EvidenceProvenance.OBSERVED }),
      createEvidenceCitation({ evidenceId: "ev_2", description: "Second", provenance: EvidenceProvenance.DERIVED }),
    ],
  });
  const evidenceOrder1 = [
    { evidenceId: "ev_1", description: "First", provenance: EvidenceProvenance.OBSERVED },
    { evidenceId: "ev_2", description: "Second", provenance: EvidenceProvenance.DERIVED },
  ];
  const evidenceOrder2 = [
    { evidenceId: "ev_2", description: "Second", provenance: EvidenceProvenance.DERIVED },
    { evidenceId: "ev_1", description: "First", provenance: EvidenceProvenance.OBSERVED },
  ];
  const res1 = compareHypothesesAgainstEvidence({ hypotheses: [hyp], evidence: evidenceOrder1 });
  const res2 = compareHypothesesAgainstEvidence({ hypotheses: [hyp], evidence: evidenceOrder2 });
  assert(res1.comparisons[0].supportLevel === res2.comparisons[0].supportLevel, "Support level must be identical");
  assert(res1.comparisons[0].decisionEligibility === res2.comparisons[0].decisionEligibility, "Eligibility must be identical");
});

test("Adv 13: Reordering hypotheses does not arbitrarily change the winner", () => {
  const compA = {
    hypothesisId: "hyp_b",
    supportLevel: SupportLevel.STRONG,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "OBSERVED",
    decisionEligibility: DecisionEligibility.ELIGIBLE,
  };
  const compB = {
    hypothesisId: "hyp_a",
    supportLevel: SupportLevel.WEAK,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "INFERRED",
    decisionEligibility: DecisionEligibility.PROBE_REQUIRED,
  };
  const rankOrder1 = rankHypotheses({ comparisons: [compA, compB] });
  const rankOrder2 = rankHypotheses({ comparisons: [compB, compA] });
  assert(rankOrder1.rankedHypotheses[0].hypothesisId === rankOrder2.rankedHypotheses[0].hypothesisId, "Winner must be identical regardless of input order");
  assert(rankOrder1.resolutionStatus === rankOrder2.resolutionStatus, "Status must be identical");
});

test("Adv 14: Hypothesis cannot become eligible simply because it was generated first", () => {
  const compIneligibleFirst = {
    hypothesisId: "first_generated_weak",
    supportLevel: SupportLevel.WEAK,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "INFERRED",
    decisionEligibility: DecisionEligibility.PROBE_REQUIRED,
  };
  const compEligibleSecond = {
    hypothesisId: "second_generated_strong",
    supportLevel: SupportLevel.STRONG,
    contradictionLevel: ContradictionLevel.NONE,
    provenanceAssessment: "OBSERVED",
    decisionEligibility: DecisionEligibility.ELIGIBLE,
  };
  const ranked = rankHypotheses({ comparisons: [compIneligibleFirst, compEligibleSecond] });
  assert(ranked.rankedHypotheses[0].hypothesisId === "second_generated_strong", "Stronger hypothesis must win even if listed second");
  assert(ranked.resolutionStatus === ResolutionStatus.DISTINGUISHED, "Must be DISTINGUISHED");
});

console.log("\n── PART 2: FOUR STUDENT ARCHETYPES (END-TO-END PIPELINE) ───────────");

function evaluateStudentArchetype(submissionText, question) {
  const ev = extractSubmissionEvidence(submissionText, {
    expectedInputs: question.expected.inputs,
  });
  const hyps = generateCompetingHypotheses(ev, question.expected);
  const comparisonRes = compareHypothesesAgainstEvidence({
    hypotheses: hyps,
    evidence: ev,
  });
  const ranked = rankHypotheses({
    comparisons: comparisonRes.comparisons,
  });
  return { ev, hyps, comparisonRes, ranked };
}

test("Student A (180 × 3 = 540): Relationship inversion strongly supported → RESOLVE_DIAGNOSIS", () => {
  const { ranked } = evaluateStudentArchetype("180 * 3 = 540", SPEED_QUESTION);
  assert(ranked.resolutionStatus === ResolutionStatus.DISTINGUISHED, `status=${ranked.resolutionStatus}`);
  assert(ranked.recommendedAction === RecommendedAction.RESOLVE_DIAGNOSIS, `action=${ranked.recommendedAction}`);
  assert(ranked.rankedHypotheses[0].hypothesisId === HypothesisId.RELATIONSHIP_INVERSION, "Rank 1 must be relationship_inversion");
  assert(ranked.rankedHypotheses[0].supportLevel === SupportLevel.STRONG, "Support must be STRONG");
});

test("Student B (bare 540): Relationship inversion weakly supported (limitations) → ASK_PROBE", () => {
  const { ranked } = evaluateStudentArchetype("540", SPEED_QUESTION);
  assert(ranked.resolutionStatus !== ResolutionStatus.DISTINGUISHED, "Must NOT be DISTINGUISHED without written working");
  assert(ranked.recommendedAction === RecommendedAction.ASK_PROBE, `action should be ASK_PROBE, got ${ranked.recommendedAction}`);
  assert(ranked.rankedHypotheses[0].decisionEligibility === DecisionEligibility.PROBE_REQUIRED, "Must require a probe");
  assert(ranked.rankedHypotheses[0].supportLevel === SupportLevel.WEAK, "Support level must be WEAK for inferred bare number");
});

test("Student C (3 ÷ 180 = 0.0167): Variable inversion strongly supported → RESOLVE_DIAGNOSIS", () => {
  const { ranked } = evaluateStudentArchetype("3 / 180 = 0.0167", SPEED_QUESTION);
  assert(ranked.resolutionStatus === ResolutionStatus.DISTINGUISHED, `status=${ranked.resolutionStatus}`);
  assert(ranked.recommendedAction === RecommendedAction.RESOLVE_DIAGNOSIS, `action=${ranked.recommendedAction}`);
  assert(ranked.rankedHypotheses[0].hypothesisId === HypothesisId.VARIABLE_INVERSION, "Rank 1 must be variable_inversion");
  assert(ranked.rankedHypotheses[0].supportLevel === SupportLevel.STRONG, "Support must be STRONG");
});

test("Student D (bare 40): Unresolved reasoning → ASK_PROBE", () => {
  const { ranked } = evaluateStudentArchetype("40", SPEED_QUESTION);
  assert(ranked.resolutionStatus !== ResolutionStatus.DISTINGUISHED, "Must NOT be DISTINGUISHED");
  assert(ranked.recommendedAction === RecommendedAction.ASK_PROBE, "Must ask probe for unclassified bare answer");
  assert(ranked.rankedHypotheses[0].decisionEligibility !== DecisionEligibility.ELIGIBLE, "Must NOT be ELIGIBLE");
});

console.log("\n── PART 3: CROSS-STRUCTURE GENERALIZATION ──────────────────────────");

test("Cross-structure: Ohm's Law (10 ÷ 2 = 5 V where V = 2 * 10) → RESOLVE_DIAGNOSIS", () => {
  const OHM_QUESTION = {
    q: "A circuit has current 2 A and resistance 10 Ω. Calculate voltage V.",
    expected: {
      answer: 20,
      unit: "V",
      operation: "multiply",
      inputs: [2, 10],
      relation: "voltage = current * resistance",
    },
  };
  const { ranked } = evaluateStudentArchetype("10 / 2 = 5 V", OHM_QUESTION);
  assert(ranked.resolutionStatus === ResolutionStatus.DISTINGUISHED, "Must be DISTINGUISHED");
  assert(ranked.recommendedAction === RecommendedAction.RESOLVE_DIAGNOSIS, "Action must be RESOLVE_DIAGNOSIS");
  assert(ranked.rankedHypotheses[0].hypothesisId === HypothesisId.RELATIONSHIP_INVERSION, "Must be relationship_inversion");
});

test("Cross-structure: Arithmetic slip (180 ÷ 3 = 50) → RESOLVE_DIAGNOSIS (arithmetic_error)", () => {
  const { ranked } = evaluateStudentArchetype("180 / 3 = 50", SPEED_QUESTION);
  assert(ranked.resolutionStatus === ResolutionStatus.DISTINGUISHED, "Must be DISTINGUISHED");
  assert(ranked.recommendedAction === RecommendedAction.RESOLVE_DIAGNOSIS, "Action must be RESOLVE_DIAGNOSIS");
  assert(ranked.rankedHypotheses[0].hypothesisId === HypothesisId.ARITHMETIC_ERROR, "Must be arithmetic_error");
});

console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
console.log(`║ Summary: ${passed} passed, ${failed} failed                                          ║`);
console.log("╚══════════════════════════════════════════════════════════════════════╝\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All Step 3 Adversarial & Archetype tests passed cleanly.\n");
  process.exit(0);
}
