/**
 * TIXAR PHASE 2 — STEP 4: ADVERSARIAL & AUDIT ACCEPTANCE TEST SUITE
 *
 * Verifies probeSelector.js, probeEvaluator.js, and diagnosisResolver.js across
 * all adversarial audit conditions mandated by the Phase 2 specification and
 * the independent auditor review (P1 through P7).
 *
 * Run with: node frontend/src/diagnostics/adversarial/step4AdversarialTest.js
 */

import { selectDiscriminatingProbe, checkProbePairwiseDiscrimination } from "../engine/probeSelector.js";
import { evaluateProbeResponse } from "../engine/probeEvaluator.js";
import { resolveFinalDiagnosis } from "../engine/diagnosisResolver.js";
import { compareHypothesesAgainstEvidence } from "../engine/evidenceComparator.js";
import { rankHypotheses } from "../engine/hypothesisRanker.js";
import {
  HypothesisId,
  ResolutionStatus,
  SupportLevel,
  DecisionEligibility,
  createHypothesis,
  createEvidenceCitation,
  createEvidenceLimitation,
} from "../engine/hypothesisSchema.js";
import { EvidenceProvenance } from "../contracts/evidenceContract.js";

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

const SPEED_QUESTION = {
  q: "A car travels 180 km in 3 hours. Calculate its average speed.",
  skillId: "physics.mechanics.speed",
  submissionId: "sub_test_001",
  expected: {
    answer: 60,
    unit: "km/h",
    operation: "divide",
    inputs: [180, 3],
    relation: "speed = distance / time",
  },
};

console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
console.log(  "║       TIXAR PHASE 2 — STEP 4: ADVERSARIAL AUDIT ACCEPTANCE TESTS     ║");
console.log(  "╚══════════════════════════════════════════════════════════════════════╝\n");

// ─── Test 1: Correct formula selected in operational probe ────────────────────
test("Adv 1: Correct formula selected in operational probe weakens formula-error; does NOT support arithmetic error", () => {
  const probe = {
    probeId: "probe_speed_formula_selection",
    targetSkillId: "physics.mechanics.speed",
    options: ["180_DIV_3", "3_DIV_180", "180_MUL_3", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "180_MUL_3", effect: "SUPPORTS" } },
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "180_DIV_3", effect: "WEAKENS" } },
      { hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL, expectedEvidence: { responseValue: "180_DIV_3", effect: "WEAKENS" } },
    ],
  };

  const activeHyps = [
    createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" }),
    createHypothesis({ hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL, proposedCause: "Order reversal" }),
    createHypothesis({ hypothesisId: HypothesisId.ARITHMETIC_ERROR, proposedCause: "Calculation slip" }),
  ];

  const evalRes = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "180_DIV_3" },
    activeHypotheses: activeHyps,
  });

  const arithHyp = evalRes.updatedHypotheses.find((h) => h.hypothesisId === HypothesisId.ARITHMETIC_ERROR);
  // Epistemic invariant: Selecting 180 ÷ 3 does NOT positively support arithmetic error!
  assert(arithHyp.supportingEvidence.length === 0, "Arithmetic error must NOT gain unearned support from formula probe");

  const relHyp = evalRes.updatedHypotheses.find((h) => h.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(relHyp.contradictingEvidence.length === 1, "Relationship inversion must be weakened");

  const revHyp = evalRes.updatedHypotheses.find((h) => h.hypothesisId === HypothesisId.INPUT_ORDER_REVERSAL);
  assert(revHyp.contradictingEvidence.length === 1, "Input order reversal must be weakened");
});

// ─── Test 2: Probe targets only the leading hypothesis ────────────────────────
test("Adv 2: Probe targets only leading hypothesis → Rejected; selector returns NO_DISCRIMINATING_PROBE", () => {
  const ranked = [
    { hypothesisId: "specialized_deficit_A", decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
    { hypothesisId: "specialized_deficit_B", decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
  ];
  const probeRes = selectDiscriminatingProbe({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.COMPETING_HYPOTHESES,
    question: SPEED_QUESTION,
  });
  assert(probeRes.status === "NO_DISCRIMINATING_PROBE", "Must reject probe that fails to discriminate all active competitors");
});

// ─── Test 3: Probe skill differs from question skill ──────────────────────────
test("Adv 3: Probe skill differs from question skill → Probe rejected", () => {
  const chemistryQuestion = {
    q: "Calculate molar concentration.",
    skillId: "chemistry.solutions.concentration",
    expected: { operation: "divide" },
  };
  const ranked = [
    { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
    { hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL, decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
  ];

  const probeRes = selectDiscriminatingProbe({
    rankedHypotheses: ranked,
    question: chemistryQuestion,
  });
  assert(probeRes.status === "NO_DISCRIMINATING_PROBE", "Cannot administer physics speed probe for chemistry concentration question");
});

// ─── Test 4: Guessed response ─────────────────────────────────────────────────
test("Adv 4: Guessed response → No hypothesis strengthening", () => {
  const probe = {
    probeId: "probe_guess_check",
    options: ["DOUBLES", "HALVES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "DOUBLES", effect: "SUPPORTS" } },
    ],
  };

  const evalRes = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "DOUBLES", guessed: true },
    activeHypotheses: [createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" })],
  });

  assert(evalRes.verification.status === "GUESSED", "Status must be GUESSED");
  assert(evalRes.hypothesisUpdates.length === 0, "No hypothesis updates on guessed response");
  assert(evalRes.updatedHypotheses[0].supportingEvidence.length === 0, "No supporting evidence added for a guess");
  assert(evalRes.resolutionStatus === "UNRESOLVED", "Resolution must remain UNRESOLVED");
});

// ─── Test 5: Same probe repeated on same administration ───────────────────────
test("Adv 5: Same probe repeated on same administration → No independent evidence inflation", () => {
  const probe = {
    probeId: "probe_repeated_admin",
    options: ["DOUBLES", "HALVES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "DOUBLES", effect: "SUPPORTS" } },
    ],
  };
  const priorEvidence = [
    { evidenceId: "ev_resp_probe_repeated_admin_attempt_001", administrationId: "probe_probe_repeated_admin_attempt_001", provenance: EvidenceProvenance.OBSERVED },
  ];

  const evalRes = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "HALVES", administrationId: "attempt_001" },
    existingEvidence: priorEvidence,
  });

  assert(evalRes.evidence.length === 0, "Must not create duplicate evidence on identical administration");
});

// ─── Test 6: DOUBLES with contradictory written reasoning ─────────────────────
test("Adv 6: DOUBLES with contradictory written reasoning → Flags contradiction, zero support awarded", () => {
  const probe = {
    probeId: "probe_contradiction_test",
    options: ["DOUBLES", "HALVES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "DOUBLES", effect: "SUPPORTS" } },
    ],
  };

  const evalRes = evaluateProbeResponse({
    probe,
    response: {
      rawAnswer: "DOUBLES",
      writtenReasoning: "Speed decreases and becomes half because time is in the denominator",
    },
    activeHypotheses: [createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" })],
  });

  assert(evalRes.verification.status === "CONTRADICTORY", "Status must be CONTRADICTORY");
  assert(evalRes.hypothesisUpdates.length === 0, "Zero hypothesis updates when written reasoning contradicts selection");
  assert(evalRes.resolutionStatus === "UNRESOLVED", "Resolution must remain UNRESOLVED");
});

// ─── Test 7: Citation points to nonexistent evidence in ledger ────────────────
test("Adv 7: Citation points to nonexistent evidence in ledger → Diagnosis rejected by resolver", () => {
  const fakeEvidenceCitation = { evidenceId: "ev_ghost_nonexistent", provenance: EvidenceProvenance.OBSERVED };
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [fakeEvidenceCitation],
      evidenceLimitations: [],
    },
  ];

  const diagnosis = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [{ evidenceId: "ev_real_only", provenance: EvidenceProvenance.OBSERVED }],
  });

  assert(diagnosis.status === "UNRESOLVED_UNCERTAINTY", "Resolver must reject diagnosis citing nonexistent evidence");
  assert(diagnosis.requiresProbe === true, "Must require probe");
});

// ─── Test 8: Evidence belongs to another skill ────────────────────────────────
test("Adv 8: Evidence belongs to another skill → Diagnosis rejected by resolver", () => {
  const foreignEvidenceCitation = { evidenceId: "ev_chemistry_item", provenance: EvidenceProvenance.OBSERVED };
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [foreignEvidenceCitation],
      evidenceLimitations: [],
    },
  ];

  const diagnosis = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [
      { evidenceId: "ev_chemistry_item", skillId: "chemistry.titration", provenance: EvidenceProvenance.OBSERVED },
    ],
  });

  assert(diagnosis.status === "UNRESOLVED_UNCERTAINTY", "Resolver must reject diagnosis citing evidence from foreign skill");
});

// ─── Test 9: Diagnosis has unresolved limitations ─────────────────────────────
test("Adv 9: Diagnosis has unresolved limitations → Diagnosis rejected by resolver", () => {
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [{ evidenceId: "ev_1", provenance: EvidenceProvenance.OBSERVED }],
      evidenceLimitations: [createEvidenceLimitation({ evidenceId: "ev_unwritten", reason: "Working not written" })],
    },
  ];

  const diagnosis = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [{ evidenceId: "ev_1", provenance: EvidenceProvenance.OBSERVED }],
  });

  assert(diagnosis.status === "UNRESOLVED_UNCERTAINTY", "Must reject diagnosis when unverified limitations remain");
});

// ─── Test 10: Correct formula plus wrong arithmetic on fresh task ─────────────
test("Adv 10: Correct formula plus wrong arithmetic on fresh task → Arithmetic error established", () => {
  const arithmeticEvidence = [
    { evidenceId: "ev_working", evidenceOrigin: "ORIGINAL_WORKING", description: "Student explicitly wrote 180 / 3 = 50", provenance: EvidenceProvenance.OBSERVED, skillId: SPEED_QUESTION.skillId },
    { evidenceId: "ev_calc_slip", evidenceOrigin: "ORIGINAL_WORKING", description: "180/3 = 60 != 50", provenance: EvidenceProvenance.DERIVED, skillId: SPEED_QUESTION.skillId },
  ];

  const ranked = [
    {
      hypothesisId: HypothesisId.ARITHMETIC_ERROR,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: arithmeticEvidence,
      evidenceLimitations: [],
    },
  ];

  const diagnosis = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: arithmeticEvidence,
  });

  assert(diagnosis.status === "DIAGNOSED", "Arithmetic execution error is legitimately diagnosed with actual arithmetic evidence");
  assert(diagnosis.demonstratedFailureMode === HypothesisId.ARITHMETIC_ERROR, "Mode is arithmetic_error");
});

// ─── Test 11: Student changes answer after feedback ───────────────────────────
test("Adv 11: Student changes answer after feedback → Preserved as distinct sequential attempts", () => {
  const probe = {
    probeId: "probe_feedback_seq",
    options: ["DOUBLES", "HALVES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "DOUBLES", effect: "SUPPORTS" } },
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "HALVES", effect: "WEAKENS" } },
    ],
  };

  const evalAttempt1 = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "DOUBLES", administrationId: "attempt_001" },
    activeHypotheses: [createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" })],
  });

  const evalAttempt2 = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "HALVES", administrationId: "attempt_002" },
    activeHypotheses: evalAttempt1.updatedHypotheses,
    existingEvidence: evalAttempt1.evidence,
  });

  assert(evalAttempt1.evidence.length === 2, "Attempt 1 produces observation + interpretation");
  assert(evalAttempt2.evidence.length === 2, "Attempt 2 produces observation + interpretation");
  assert(evalAttempt1.evidence[0].evidenceId !== evalAttempt2.evidence[0].evidenceId, "Evidence IDs must remain distinct");

  const finalHyp = evalAttempt2.updatedHypotheses[0];
  assert(finalHyp.supportingEvidence.length === 1, "Preserves initial support");
  assert(finalHyp.contradictingEvidence.length === 1, "Preserves subsequent contradiction");
});

// ─── Test 12: Two probes support incompatible explanations ────────────────────
test("Adv 12: Two probes support incompatible explanations → Uncertainty strictly preserved", () => {
  const compIncompatible = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      decisionEligibility: DecisionEligibility.ELIGIBLE,
    },
    {
      hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      decisionEligibility: DecisionEligibility.ELIGIBLE,
    },
  ];

  const ranked = rankHypotheses({ comparisons: compIncompatible });
  assert(ranked.resolutionStatus === ResolutionStatus.COMPETING_HYPOTHESES, "Must resolve to COMPETING_HYPOTHESES");
  assert(ranked.recommendedAction === "ASK_PROBE", "Action must be ASK_PROBE");

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked.rankedHypotheses,
    resolutionStatus: ranked.resolutionStatus,
    question: SPEED_QUESTION,
  });
  assert(diag.status === "UNRESOLVED_UNCERTAINTY", "Must refuse diagnosis when incompatible explanations are equally supported");
});

// ─── Test 13: Pairwise discrimination check (P1) ──────────────────────────────
test("Adv 13: Pairwise discrimination failure: Two hypotheses with identical probe mappings → Rejected (P1)", () => {
  const nonDiscriminatingProbe = {
    probeId: "probe_fake_identical_effects",
    targetSkillId: "physics.mechanics.speed",
    targetHypotheses: [HypothesisId.RELATIONSHIP_INVERSION, HypothesisId.INPUT_ORDER_REVERSAL],
    options: ["OPTION_A", "OPTION_B"],
    discriminatesBetween: [
      // Both hypotheses mapped to SUPPORTS on OPTION_A and WEAKENS on OPTION_B
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "OPTION_A", effect: "SUPPORTS" } },
      { hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL, expectedEvidence: { responseValue: "OPTION_A", effect: "SUPPORTS" } },
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "OPTION_B", effect: "WEAKENS" } },
      { hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL, expectedEvidence: { responseValue: "OPTION_B", effect: "WEAKENS" } },
    ],
  };

  const competitors = [
    { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION },
    { hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL },
  ];

  const distinguishes = checkProbePairwiseDiscrimination(nonDiscriminatingProbe, competitors);
  assert(distinguishes === false, "Must detect that identical mapping fails pairwise discrimination");
});

// ─── Test 14: Three viable competitors with no slicing (P1) ───────────────────
test("Adv 14: Three viable competitors with no truncation → Selector rejects when 3rd is not discriminated (P1)", () => {
  const threeCompetitors = [
    { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
    { hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL, decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
    { hypothesisId: HypothesisId.ARITHMETIC_ERROR, decisionEligibility: DecisionEligibility.PROBE_REQUIRED },
  ];

  // Neither probe_speed_conceptual_relationship nor probe_speed_formula_selection covers/discriminates arithmetic_error
  const probeRes = selectDiscriminatingProbe({
    rankedHypotheses: threeCompetitors,
    question: SPEED_QUESTION,
  });

  assert(probeRes.status === "NO_DISCRIMINATING_PROBE", "Must reject probe when 3 competitors exist and none discriminates all 3");
});

// ─── Test 15: Valid option selected → VALID_RESPONSE (P3) ─────────────────────
test("Adv 15: Valid option selected → verificationStatus === 'VALID_RESPONSE', NOT 'VERIFIED' (P3)", () => {
  const probe = {
    probeId: "probe_test_valid",
    options: ["DOUBLES", "HALVES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "DOUBLES", effect: "SUPPORTS" } },
    ],
  };

  const evalRes = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "DOUBLES" },
    activeHypotheses: [createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" })],
  });

  assert(evalRes.verification.status === "VALID_RESPONSE", "Status must be VALID_RESPONSE (VERIFIED reserved for formal assertions)");
});

// ─── Test 16: Evaluator outputs resolutionStatus: EVIDENCE_UPDATED (P4) ────────
test("Adv 16: Evaluator outputs resolutionStatus === 'EVIDENCE_UPDATED', NOT 'RESOLVED' (P4)", () => {
  const probe = {
    probeId: "probe_test_update",
    options: ["DOUBLES", "HALVES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "DOUBLES", effect: "SUPPORTS" } },
    ],
  };

  const evalRes = evaluateProbeResponse({
    probe,
    response: { rawAnswer: "DOUBLES" },
    activeHypotheses: [createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" })],
  });

  assert(evalRes.resolutionStatus === "EVIDENCE_UPDATED", "Evaluator must output EVIDENCE_UPDATED, never RESOLVED");
});

// ─── Test 17: Derived evidence cites nonexistent source (P5) ──────────────────
test("Adv 17: Derived evidence cites nonexistent source evidenceId → Resolver rejects diagnosis (P5)", () => {
  const derivedCitation = {
    evidenceId: "ev_derived_ghost",
    provenance: EvidenceProvenance.DERIVED,
    sourceEvidenceIds: ["ev_nonexistent_parent"],
  };

  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [derivedCitation],
      evidenceLimitations: [],
    },
  ];

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [
      { evidenceId: "ev_derived_ghost", provenance: EvidenceProvenance.DERIVED, sourceEvidenceIds: ["ev_nonexistent_parent"], skillId: SPEED_QUESTION.skillId },
    ],
  });

  assert(diag.status === "UNRESOLVED_UNCERTAINTY", "Must reject diagnosis when derived citation parent does not exist in ledger");
});

// ─── Test 18: Derived evidence source belongs to different skill (P5) ─────────
test("Adv 18: Derived evidence source belongs to different skill → Resolver rejects diagnosis (P5)", () => {
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [{ evidenceId: "ev_derived_1", provenance: EvidenceProvenance.DERIVED }],
      evidenceLimitations: [],
    },
  ];

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [
      { evidenceId: "ev_derived_1", provenance: EvidenceProvenance.DERIVED, sourceEvidenceIds: ["ev_src_chem"], skillId: SPEED_QUESTION.skillId },
      { evidenceId: "ev_src_chem", provenance: EvidenceProvenance.OBSERVED, skillId: "chemistry.titration" }, // Foreign skill!
    ],
  });

  assert(diag.status === "UNRESOLVED_UNCERTAINTY", "Must reject diagnosis when source evidence belongs to foreign skill");
});

// ─── Test 19: Evidence belongs to different submissionId (P5) ─────────────────
test("Adv 19: Evidence belongs to different submissionId → Resolver rejects diagnosis (P5)", () => {
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [{ evidenceId: "ev_sub_mismatch", provenance: EvidenceProvenance.OBSERVED }],
      evidenceLimitations: [],
    },
  ];

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION, // submissionId: sub_test_001
    evidence: [
      { evidenceId: "ev_sub_mismatch", provenance: EvidenceProvenance.OBSERVED, submissionId: "sub_OTHER_STUDENT_999", skillId: SPEED_QUESTION.skillId },
    ],
  });

  assert(diag.status === "UNRESOLVED_UNCERTAINTY", "Must reject diagnosis when evidence belongs to another submission");
});

// ─── Test 20: Evidence citation targets different hypothesis (P5) ─────────────
test("Adv 20: Evidence citation targets different hypothesis → Resolver rejects diagnosis (P5)", () => {
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [{ evidenceId: "ev_for_arithmetic", hypothesisId: HypothesisId.ARITHMETIC_ERROR, provenance: EvidenceProvenance.OBSERVED }],
      evidenceLimitations: [],
    },
  ];

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [
      { evidenceId: "ev_for_arithmetic", hypothesisId: HypothesisId.ARITHMETIC_ERROR, provenance: EvidenceProvenance.OBSERVED, skillId: SPEED_QUESTION.skillId },
    ],
  });

  assert(diag.status === "UNRESOLVED_UNCERTAINTY", "Must reject diagnosis when citation targets a different hypothesis");
});

// ─── Test 21: Evidence citation has UNVERIFIED provenance (P5) ─────────────────
test("Adv 21: Evidence citation has UNVERIFIED provenance → Resolver rejects diagnosis (P5)", () => {
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [{ evidenceId: "ev_unverified", provenance: "UNVERIFIED" }],
      evidenceLimitations: [],
    },
  ];

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [
      { evidenceId: "ev_unverified", provenance: "UNVERIFIED", skillId: SPEED_QUESTION.skillId },
    ],
  });

  assert(diag.status === "UNRESOLVED_UNCERTAINTY", "Must reject diagnosis when evidence provenance is UNVERIFIED");
});

// ─── Test 22: Missing evidenceOrigin does not default to original working (P6) ─
test("Adv 22: Missing evidenceOrigin does not default to original working (P6)", () => {
  const ranked = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      decisionEligibility: DecisionEligibility.ELIGIBLE,
      supportLevel: SupportLevel.STRONG,
      contradictionLevel: "NONE",
      supportingEvidence: [{ evidenceId: "ev_no_origin", provenance: EvidenceProvenance.OBSERVED }],
      evidenceLimitations: [],
    },
  ];

  const diag = resolveFinalDiagnosis({
    rankedHypotheses: ranked,
    resolutionStatus: ResolutionStatus.DISTINGUISHED,
    question: SPEED_QUESTION,
    evidence: [
      { evidenceId: "ev_no_origin", provenance: EvidenceProvenance.OBSERVED, skillId: SPEED_QUESTION.skillId }, // no evidenceOrigin, no recognized type
    ],
  });

  assert(diag.status === "DIAGNOSED", "Diagnosis allowed");
  assert(diag.evidenceOrigin === "UNSPECIFIED_ORIGIN", "Must NOT assume ORIGINAL_WORKING when origin is missing");
});

// ─── Test 23: Written reasoning with negation (P7) ────────────────────────────
test("Adv 23: Written reasoning with negation ('I did not double') does NOT trigger contradiction (P7)", () => {
  const probe = {
    probeId: "probe_negation_test",
    options: ["HALVES", "DOUBLES", "UNSURE"],
    discriminatesBetween: [
      { hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, expectedEvidence: { responseValue: "HALVES", effect: "WEAKENS" } },
    ],
  };

  const evalRes = evaluateProbeResponse({
    probe,
    response: {
      rawAnswer: "HALVES",
      writtenReasoning: "I did not double because time increased so speed must decrease",
    },
    activeHypotheses: [createHypothesis({ hypothesisId: HypothesisId.RELATIONSHIP_INVERSION, proposedCause: "Multiplication" })],
  });

  assert(evalRes.verification.status === "VALID_RESPONSE", "Negated token 'did not double' must NOT trigger CONTRADICTORY");
});

// ─── Part 2: Two-Stage Student B Verification (Defensible Scope) ──────────────
test("Student B Two-Stage Verification: Demonstrates probe response scope discipline", () => {
  // Stage 0: Initial submission bare 540
  const initialComp = [
    {
      hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
      supportLevel: SupportLevel.WEAK,
      contradictionLevel: "NONE",
      decisionEligibility: DecisionEligibility.PROBE_REQUIRED,
    },
    {
      hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
      supportLevel: SupportLevel.WEAK,
      contradictionLevel: "NONE",
      decisionEligibility: DecisionEligibility.PROBE_REQUIRED,
    },
  ];
  const rank0 = rankHypotheses({ comparisons: initialComp });
  assert(rank0.recommendedAction === "ASK_PROBE", "Bare 540 requires probe");

  // Stage 1: Conceptual Probe
  const probe1 = selectDiscriminatingProbe({
    rankedHypotheses: rank0.rankedHypotheses,
    question: SPEED_QUESTION,
  });
  assert(probe1.probeId === "probe_speed_conceptual_relationship", "Selects conceptual probe as stage 1");

  // Student answers "DOUBLES" to conceptual probe
  const eval1 = evaluateProbeResponse({
    probe: probe1,
    response: { rawAnswer: "DOUBLES", administrationId: "attempt_001", submissionId: SPEED_QUESTION.submissionId },
    activeHypotheses: [
      createHypothesis({
        hypothesisId: HypothesisId.RELATIONSHIP_INVERSION,
        proposedCause: "Multiplication instead of division",
        supportingEvidence: [createEvidenceCitation({ evidenceId: "ev_compat", description: "540 matches 180*3", provenance: EvidenceProvenance.INFERRED_FROM_MATCH })],
      }),
      createHypothesis({
        hypothesisId: HypothesisId.INPUT_ORDER_REVERSAL,
        proposedCause: "Divided in reverse order",
      }),
    ],
  });
  assert(eval1.verification.status === "VALID_RESPONSE", "Stage 1 conceptual response is VALID_RESPONSE");
  assert(eval1.resolutionStatus === "EVIDENCE_UPDATED", "Evaluator produces EVIDENCE_UPDATED");

  // Stage 2: Operational Formula Selection Probe
  const probe2 = selectDiscriminatingProbe({
    rankedHypotheses: eval1.updatedHypotheses,
    question: SPEED_QUESTION,
    previousProbes: [probe1.probeId],
  });
  assert(probe2.probeId === "probe_speed_formula_selection", "Selects operational formula probe as stage 2");

  // Student explicitly selects "180_MUL_3"
  const eval2 = evaluateProbeResponse({
    probe: probe2,
    response: { rawAnswer: "180_MUL_3", administrationId: "attempt_002", submissionId: SPEED_QUESTION.submissionId },
    activeHypotheses: eval1.updatedHypotheses,
  });
  assert(eval2.verification.status === "VALID_RESPONSE", "Stage 2 formula response is VALID_RESPONSE");

  // Re-compare and re-rank with full accumulated ledger
  const fullEvidenceLedger = [
    { evidenceId: "ev_compat", description: "540 matches 180*3", provenance: EvidenceProvenance.INFERRED_FROM_MATCH, skillId: SPEED_QUESTION.skillId, submissionId: SPEED_QUESTION.submissionId },
    ...eval1.evidence,
    ...eval2.evidence,
  ];

  const finalComp = compareHypothesesAgainstEvidence({
    hypotheses: eval2.updatedHypotheses,
    evidence: fullEvidenceLedger,
  });
  const finalRank = rankHypotheses({ comparisons: finalComp.comparisons });

  assert(finalRank.resolutionStatus === ResolutionStatus.DISTINGUISHED, "Now DISTINGUISHED with 2-stage verification!");

  const finalDiagnosis = resolveFinalDiagnosis({
    rankedHypotheses: finalRank.rankedHypotheses,
    resolutionStatus: finalRank.resolutionStatus,
    question: SPEED_QUESTION,
    evidence: fullEvidenceLedger,
  });

  assert(finalDiagnosis.status === "DIAGNOSED", "Diagnosis earned with empirical certainty");
  assert(finalDiagnosis.evidenceOrigin === "PROBE_RESPONSE", "Identifies evidence origin as PROBE_RESPONSE");
  assert(
    finalDiagnosis.diagnosedCause.includes("probing") && finalDiagnosis.diagnosedCause.includes("unverified"),
    "Diagnosis explicitly documents that the original calculation process remains unverified"
  );
});

console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
console.log(`║ Summary: ${passed} passed, ${failed} failed                                          ║`);
console.log("╚══════════════════════════════════════════════════════════════════════╝\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All 24 Adversarial Audit Tests & Student B Scope Tests passed cleanly.\n");
  process.exit(0);
}
