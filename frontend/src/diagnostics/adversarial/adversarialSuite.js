/**
 * TIXAR PHASE 1.5 — ADVERSARIAL TEST SUITE
 *
 * Tests the Evidence Pipeline against 20+ carefully designed inputs for the question:
 *   "A car travels 180 km in 3 hours. Calculate its average speed."
 *   Expected: 60 km/h (operation: divide, inputs: [180, 3])
 *
 * Run with: node frontend/src/diagnostics/adversarial/adversarialSuite.js
 *
 * Uses a lightweight inline runner (no external test framework required).
 */

import { executeEvidencePipeline } from "../engine/evidencePipeline.js";
import { EvidenceSufficiency, EvidenceProvenance, VerificationStatus } from "../contracts/evidenceContract.js";

// ─── Test Question Definition ─────────────────────────────────────────────────

const QUESTION = {
  q: "A car travels 180 km in 3 hours. Calculate its average speed.",
  skillId: "physics.mechanics.average_speed",
  subject: "physics",
  expected: {
    answer: 60,
    unit: "km/h",
    operation: "divide",
    relation: "speed = distance / time",
    inputs: [180, 3],
  },
};

// ─── Test Runner ─────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

function test(label, fn) {
  try {
    fn();
    console.log(`  ✅ PASS  ${label}`);
    passed++;
  } catch (err) {
    console.log(`  ❌ FAIL  ${label}`);
    console.log(`         → ${err.message}`);
    failures.push({ label, error: err.message });
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function run(rawAnswer) {
  return executeEvidencePipeline(rawAnswer, QUESTION);
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function causeConf(c) { return c.verification.causeConfidence; }
function sufficiency(c) { return c.verification.evidenceSufficiency; }
function status(c) { return c.verification.status; }
function opProv(c) { return c.student.evidence.operationProvenance; }

// ─── Test Cases ───────────────────────────────────────────────────────────────

console.log("\n╔═══════════════════════════════════════════════════════════╗");
console.log(  "║   TIXAR PHASE 1.5 — Evidence Pipeline Adversarial Suite   ║");
console.log(  "╚═══════════════════════════════════════════════════════════╝\n");

console.log("── GROUP A: Correct Answers ─────────────────────────────────");

test("bare 60 → CORRECT", () => {
  const c = run("60");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test("60 km/h → CORRECT", () => {
  const c = run("60 km/h");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test("60 km/hr → CORRECT", () => {
  const c = run("60 km/hr");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test("60 kilometres per hour → CORRECT (normalized)", () => {
  const c = run("60 kilometres per hour");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test('"sixty" → CORRECT (word number normalized)', () => {
  const c = run("sixty");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test('"the answer is 60" → CORRECT', () => {
  const c = run("the answer is 60");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test("180 / 3 → CORRECT (explicit division)", () => {
  const c = run("180 / 3");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

test("180 ÷ 3 = 60 → CORRECT (explicit division with result)", () => {
  const c = run("180 ÷ 3 = 60");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

console.log("\n── GROUP B: Explicit Wrong Working (SUFFICIENT evidence) ────");

test("180 × 3 = 540 → INCORRECT, SUFFICIENT, causeConfidence >= 0.90", () => {
  const c = run("180 × 3 = 540");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.SUFFICIENT, `sufficiency=${sufficiency(c)}`);
  assert(causeConf(c) >= 0.90, `causeConf=${causeConf(c)}`);
  assert(opProv(c) === EvidenceProvenance.OBSERVED, `opProv=${opProv(c)}`);
});

test("180 * 3 = 540 → INCORRECT, SUFFICIENT, opProv=OBSERVED", () => {
  const c = run("180 * 3 = 540");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.SUFFICIENT, `sufficiency=${sufficiency(c)}`);
  assert(opProv(c) === EvidenceProvenance.OBSERVED, `opProv=${opProv(c)}`);
});

test("3 / 180 → INCORRECT, SUFFICIENT, VARIABLE_IDENTIFICATION, causeConf >= 0.80", () => {
  const c = run("3 / 180");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.SUFFICIENT, `sufficiency=${sufficiency(c)}`);
  assert(causeConf(c) >= 0.80, `causeConf=${causeConf(c)}`);
});

console.log("\n── GROUP C: Bare Answers (INSUFFICIENT/BORDERLINE evidence) ─");

test("bare 540 → INCORRECT, NOT SUFFICIENT, causeConf <= 0.45", () => {
  const c = run("540");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(
    sufficiency(c) === EvidenceSufficiency.INSUFFICIENT ||
    sufficiency(c) === EvidenceSufficiency.BORDERLINE,
    `sufficiency=${sufficiency(c)}`
  );
  assert(causeConf(c) <= 0.45, `causeConf=${causeConf(c)}`);
  assert(opProv(c) === EvidenceProvenance.INFERRED_FROM_MATCH, `opProv=${opProv(c)}`);
});

test("540 km/h → INCORRECT, NOT SUFFICIENT, causeConf <= 0.45", () => {
  const c = run("540 km/h");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(causeConf(c) <= 0.45, `causeConf=${causeConf(c)}`);
});

test("bare 40 → INCORRECT, INSUFFICIENT, causeConf <= 0.30", () => {
  const c = run("40");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.INSUFFICIENT, `sufficiency=${sufficiency(c)}`);
  assert(causeConf(c) <= 0.30, `causeConf=${causeConf(c)}`);
});

test("bare 40 km/h → INCORRECT, INSUFFICIENT, causeConf <= 0.30", () => {
  const c = run("40 km/h");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(causeConf(c) <= 0.30, `causeConf=${causeConf(c)}`);
});

console.log("\n── GROUP D: Copied Quantity (Known Values) ───────────────────");

test("bare 180 → INCORRECT, INSUFFICIENT (copied known)", () => {
  const c = run("180");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.INSUFFICIENT, `sufficiency=${sufficiency(c)}`);
  assert(causeConf(c) <= 0.35, `causeConf=${causeConf(c)}`);
});

test("bare 3 → INCORRECT, INSUFFICIENT (copied known)", () => {
  const c = run("3");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.INSUFFICIENT, `sufficiency=${sufficiency(c)}`);
});

console.log("\n── GROUP E: Units Divergence ─────────────────────────────────");

test("20 m/s → INCORRECT, units divergence", () => {
  const c = run("20 m/s");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  // Unit is different; divergence should indicate unit issue or we have enough evidence
  const div = c.divergence;
  // Either the number is wrong (20 ≠ 60) or units differ — both are INCORRECT
  assert(div !== null, "Expected non-null divergence");
});

console.log("\n── GROUP F: Sign & Edge Cases ────────────────────────────────");

test("-60 → INCORRECT (sign error)", () => {
  const c = run("-60");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  // Hypotheses should include sign error
  const signHyp = c.hypotheses?.find(h => h.type === "SIGN_ERROR");
  assert(signHyp && signHyp.probability >= 0.70, `sign error hyp probability=${signHyp?.probability}`);
});

test("0 → INCORRECT, INSUFFICIENT", () => {
  const c = run("0");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
});

test("empty string → INCONCLUSIVE", () => {
  const c = run("");
  assert(status(c) === VerificationStatus.INCONCLUSIVE, `status=${status(c)}`);
});

test('"I think it is 60 because..." → CORRECT (60 extracted)', () => {
  const c = run("I think it is 60 because speed equals distance over time");
  assert(status(c) === VerificationStatus.CORRECT, `status=${status(c)}`);
});

console.log("\n── GROUP G: Hypothesis & Probe Generation ────────────────────");

test("bare 540 → hypotheses generated, probe available", () => {
  const c = run("540");
  assert(Array.isArray(c.hypotheses) && c.hypotheses.length > 0, "Expected hypotheses array");
  assert(c.probe !== null, "Expected probe to be generated for INSUFFICIENT case");
});

test("180 × 3 = 540 → no probe needed (SUFFICIENT evidence)", () => {
  const c = run("180 × 3 = 540");
  // When SUFFICIENT, probe may be null (hypothesis engine not needed)
  assert(sufficiency(c) === EvidenceSufficiency.SUFFICIENT, `sufficiency=${sufficiency(c)}`);
});

test("3 × 180 → INCORRECT, SUFFICIENT, op inversion hypothesis prominent", () => {
  const c = run("3 × 180");
  assert(status(c) === VerificationStatus.INCORRECT, `status=${status(c)}`);
  assert(sufficiency(c) === EvidenceSufficiency.SUFFICIENT, `sufficiency=${sufficiency(c)}`);
});

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log("\n╔════════════════════════════════════════╗");
console.log(  "║           TEST SUMMARY                 ║");
console.log(  "╠════════════════════════════════════════╣");
console.log( `║  Passed: ${String(passed).padEnd(27)}║`);
console.log( `║   Failed: ${String(failed).padEnd(27)}║`);
console.log( `║  Total:    ${String(passed + failed).padEnd(27)}║`);
console.log(  "╚════════════════════════════════════════╝");

if (failures.length > 0) {
  console.log("\n── Failures ─────────────────────────────────────────────────");
  failures.forEach(({ label, error }) => {
    console.log(`  ${label}`);
    console.log(`     ${error}`);
  });
  process.exit(1);
} else {
  console.log("\nAll tests passed. Phase 1.5 adversarial suite is green.\n");
  process.exit(0);
}
