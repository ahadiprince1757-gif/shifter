/**
 * TIXAR PHASE 2 — FOUR ARCHETYPES & GENERALIZATION ACCEPTANCE TEST
 *
 * Verifies that hypothesisSchema.js and hypothesisGenerator.js satisfy:
 * 1. Student A: Explicit wrong operation (180 * 3 = 540) → SUFFICIENT, HIGH confidence, no probe.
 * 2. Student B: Bare 540 → BORDERLINE, LOW confidence, requiresProbe=true, cites unwritten work as contradiction.
 * 3. Student C: Reversed division (3 / 180 = 0.0167) → SUFFICIENT variable inversion, HIGH confidence.
 * 4. Student D: Bare 40 → INSUFFICIENT unresolved reasoning, INCONCLUSIVE confidence, requiresProbe=true.
 * 5. Generalization: Tests Ohm's law (V = I * R, student divides V / R when finding V).
 *
 * Run with: node frontend/src/diagnostics/adversarial/phase2ArchetypeTest.js
 */

import { extractSubmissionEvidence } from "../engine/evidenceEngine.js";
import { generateCompetingHypotheses } from "../engine/hypothesisGenerator.js";
import { compareHypothesesAgainstEvidence } from "../engine/evidenceComparator.js";
import { HypothesisId, SupportLevel, DecisionEligibility } from "../engine/hypothesisSchema.js";
import { EvidenceSufficiency, EvidenceProvenance } from "../contracts/evidenceContract.js";

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
  if (!condition) {
    throw new Error(message);
  }
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
console.log(  "║       TIXAR PHASE 2: FOUR STUDENT ARCHETYPES ACCEPTANCE TEST         ║");
console.log(  "╚══════════════════════════════════════════════════════════════════════╝\n");

// ─── Student A: 180 × 3 = 540 ───────────────────────────────────────────────
test("Student A (180 * 3 = 540): Explicit working earns SUFFICIENT relationship inversion", () => {
  const ev = extractSubmissionEvidence("180 * 3 = 540", {
    expectedInputs: [180, 3],
  });
  const hyps = generateCompetingHypotheses(ev, SPEED_QUESTION.expected);
  const comp = compareHypothesesAgainstEvidence({ hypotheses: hyps, evidence: ev });

  assert(hyps.length >= 1, "Must generate at least one hypothesis");
  const relHyp = hyps.find((h) => h.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(relHyp, "Must generate relationship_inversion hypothesis");
  assert(relHyp.evidenceSufficiency === EvidenceSufficiency.SUFFICIENT, "Sufficiency must be SUFFICIENT");
  const compResult = comp.comparisons.find((c) => c.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(compResult.supportLevel === SupportLevel.STRONG, "Support level must be STRONG");
  assert(compResult.decisionEligibility === DecisionEligibility.ELIGIBLE, "Must be ELIGIBLE");
  assert(
    relHyp.supportingEvidence.some((e) => e.provenance === EvidenceProvenance.OBSERVED),
    "Supporting evidence must be OBSERVED"
  );
  assert(relHyp.contradictingEvidence.length === 0, "Explicit work has no contradiction");
});

// ─── Student B: Bare 540 ────────────────────────────────────────────────────
test("Student B (bare 540): Arithmetic match cannot claim HIGH confidence; requires probe", () => {
  const ev = extractSubmissionEvidence("540", {
    expectedInputs: [180, 3],
  });
  const hyps = generateCompetingHypotheses(ev, SPEED_QUESTION.expected);
  const comp = compareHypothesesAgainstEvidence({ hypotheses: hyps, evidence: ev });

  const relHyp = hyps.find((h) => h.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(relHyp, "Must identify relationship compatibility");
  assert(relHyp.evidenceSufficiency === EvidenceSufficiency.BORDERLINE, "Sufficiency must be BORDERLINE, not SUFFICIENT");
  const compResult = comp.comparisons.find((c) => c.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(compResult.supportLevel === SupportLevel.WEAK, "Support must be WEAK for inferred match");
  assert(compResult.decisionEligibility === DecisionEligibility.PROBE_REQUIRED, "Must require a probe");
  assert(
    relHyp.supportingEvidence.some((e) => e.provenance === EvidenceProvenance.INFERRED_FROM_MATCH),
    "Supporting evidence must have INFERRED_FROM_MATCH provenance"
  );
  assert(
    relHyp.evidenceLimitations.some((e) => e.evidenceId === "ev_no_written_operation"),
    "Must preserve evidence limitation noting absence of written working"
  );
});

// ─── Student C: 3 ÷ 180 = 0.0167 ────────────────────────────────────────────
test("Student C (3 / 180 = 0.0167): Variable inversion identified from observed reversal", () => {
  const ev = extractSubmissionEvidence("3 / 180 = 0.0167", {
    expectedInputs: [180, 3],
  });
  const hyps = generateCompetingHypotheses(ev, SPEED_QUESTION.expected);
  const comp = compareHypothesesAgainstEvidence({ hypotheses: hyps, evidence: ev });

  const varHyp = hyps.find((h) => h.hypothesisId === HypothesisId.VARIABLE_INVERSION);
  assert(varHyp, "Must generate variable_inversion hypothesis");
  assert(varHyp.evidenceSufficiency === EvidenceSufficiency.SUFFICIENT, "Sufficiency must be SUFFICIENT");
  const compResult = comp.comparisons.find((c) => c.hypothesisId === HypothesisId.VARIABLE_INVERSION);
  assert(compResult.supportLevel === SupportLevel.STRONG, "Support must be STRONG");
  assert(compResult.decisionEligibility === DecisionEligibility.ELIGIBLE, "Must be ELIGIBLE");
  assert(
    varHyp.supportingEvidence.some((e) => e.provenance === EvidenceProvenance.OBSERVED),
    "Reversal must cite OBSERVED provenance"
  );
});

// ─── Student D: Bare 40 ────────────────────────────────────────────────────
test("Student D (bare 40): Unresolved reasoning; never invents a misconception", () => {
  const ev = extractSubmissionEvidence("40", {
    expectedInputs: [180, 3],
  });
  const hyps = generateCompetingHypotheses(ev, SPEED_QUESTION.expected);
  const comp = compareHypothesesAgainstEvidence({ hypotheses: hyps, evidence: ev });

  assert(!hyps.some((h) => h.evidenceSufficiency === EvidenceSufficiency.SUFFICIENT), "No hypothesis may be SUFFICIENT");
  const unresHyp = hyps.find((h) => h.hypothesisId === HypothesisId.UNRESOLVED_REASONING);
  assert(unresHyp, "Must generate unresolved_reasoning hypothesis");
  assert(unresHyp.evidenceSufficiency === EvidenceSufficiency.INSUFFICIENT, "Sufficiency must be INSUFFICIENT");
  const compResult = comp.comparisons.find((c) => c.hypothesisId === HypothesisId.UNRESOLVED_REASONING);
  assert(compResult.decisionEligibility !== DecisionEligibility.ELIGIBLE, "Must NOT be ELIGIBLE");
});

// ─── Generalization: Ohm's Law (V = I * R, Multiplication Expected) ─────────
test("Generalization: Ohm's Law (Expected V = 2 * 10 = 20 V; Student writes 10 / 2 = 5 V)", () => {
  const OHMS_QUESTION = {
    q: "A circuit has current 2 A and resistance 10 Ω. Calculate voltage V.",
    expected: {
      answer: 20,
      unit: "V",
      operation: "multiply",
      inputs: [2, 10],
      relation: "voltage = current * resistance",
    },
  };
  const ev = extractSubmissionEvidence("10 / 2 = 5 V", {
    expectedInputs: [2, 10],
  });
  const hyps = generateCompetingHypotheses(ev, OHMS_QUESTION.expected);
  const comp = compareHypothesesAgainstEvidence({ hypotheses: hyps, evidence: ev });

  const relHyp = hyps.find((h) => h.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(relHyp, "Must identify relationship inversion on multiplication structure");
  assert(relHyp.evidenceSufficiency === EvidenceSufficiency.SUFFICIENT, "Explicit division is SUFFICIENT");
  const compResult = comp.comparisons.find((c) => c.hypothesisId === HypothesisId.RELATIONSHIP_INVERSION);
  assert(compResult.supportLevel === SupportLevel.STRONG, "Support level must be STRONG");
  assert(compResult.decisionEligibility === DecisionEligibility.ELIGIBLE, "Must be ELIGIBLE");
});

// ─── Generalization: Arithmetic Error ───────────────────────────────────────
test("Generalization: Arithmetic Error (180 / 3 = 50)", () => {
  const ev = extractSubmissionEvidence("180 / 3 = 50", {
    expectedInputs: [180, 3],
  });
  const hyps = generateCompetingHypotheses(ev, SPEED_QUESTION.expected);
  const comp = compareHypothesesAgainstEvidence({ hypotheses: hyps, evidence: ev });

  const arithHyp = hyps.find((h) => h.hypothesisId === HypothesisId.ARITHMETIC_ERROR);
  assert(arithHyp, "Must identify arithmetic_error");
  assert(arithHyp.evidenceSufficiency === EvidenceSufficiency.SUFFICIENT, "Formula is correct and observed; error is calculation");
  const compResult = comp.comparisons.find((c) => c.hypothesisId === HypothesisId.ARITHMETIC_ERROR);
  assert(compResult.supportLevel === SupportLevel.STRONG, "Support level must be STRONG");
  assert(compResult.decisionEligibility === DecisionEligibility.ELIGIBLE, "Must be ELIGIBLE");
});

console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
console.log(`║ Summary: ${passed} passed, ${failed} failed                                          ║`);
console.log("╚══════════════════════════════════════════════════════════════════════╝\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All Phase 2 Archetype & Generalization tests passed cleanly.\n");
  process.exit(0);
}
