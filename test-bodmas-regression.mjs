import { diagnoseKnowledgeGap } from "./frontend/src/utils/misconceptionDiagnoser.js";
import { verifyMathSemanticBoundary } from "./frontend/src/utils/mathVerifier.js";
import { getAtomicRepairContent } from "./frontend/src/engine/repairPlanner.js";
import { MathMutator } from "./frontend/src/utils/mutators/MathMutator.js";
import { SUBJECTS, ACTIVE_SUBJECT_IDS } from "./frontend/src/data/subjectRegistry.js";

console.log("==================================================================");
console.log("TIXAR RESET — REGRESSION & LEARNING IDENTITY VERIFICATION SUITE");
console.log("==================================================================\n");

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    passed++;
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// -------------------------------------------------------------------
// 1. SUBJECT REGISTRY TESTS
// -------------------------------------------------------------------
console.log("--- 1. Authoritative Subject Registry ---");
assert(ACTIVE_SUBJECT_IDS.length === 6, "Subject registry has exactly 6 active subjects");
assert(SUBJECTS.math && SUBJECTS.math.tier === 1, "Mathematics is Tier 1 Flagship");
assert(SUBJECTS.computer && SUBJECTS.computer.name === "Computer Studies", "Canonical 'computer' is active");
assert(!SUBJECTS.swe_se && !SUBJECTS.business && !SUBJECTS.geography, "Dead subjects are absent from registry");

// -------------------------------------------------------------------
// 2. BODMAS CONFIRMED MISCONCEPTION TESTS
// -------------------------------------------------------------------
console.log("\n--- 2. BODMAS Confirmed Misconceptions ---");

const d1 = diagnoseKnowledgeGap({
  question: "3 + 4 * 2",
  studentAnswer: "14",
  correctAnswer: "11",
});
assert(d1.status === "DIAGNOSED", "3 + 4 * 2 = 14 is DIAGNOSED");
assert(d1.diagnosisType === "MISCONCEPTION", "3 + 4 * 2 = 14 diagnosisType is MISCONCEPTION");
assert(d1.skillId === "multiplication_before_addition", "Skill identified is multiplication_before_addition");

const d2 = diagnoseKnowledgeGap({
  question: "7 + 5 * 3",
  studentAnswer: "36",
  correctAnswer: "22",
});
assert(d2.status === "DIAGNOSED" && d2.skillId === "multiplication_before_addition", "7 + 5 * 3 = 36 diagnosed as multiplication_before_addition");

const d3 = diagnoseKnowledgeGap({
  question: "10 - 2 * 3",
  studentAnswer: "24",
  correctAnswer: "4",
});
assert(d3.status === "DIAGNOSED" && d3.skillId === "multiplication_before_subtraction", "10 - 2 * 3 = 24 diagnosed as multiplication_before_subtraction");

const d4 = diagnoseKnowledgeGap({
  question: "8 + 6 / 2",
  studentAnswer: "7",
  correctAnswer: "11",
});
assert(d4.status === "DIAGNOSED" && d4.skillId === "division_before_addition", "8 + 6 / 2 = 7 diagnosed as division_before_addition");

// -------------------------------------------------------------------
// 3. ARITHMETIC ERRORS & AMBIGUOUS DATA (INSUFFICIENT EVIDENCE)
// -------------------------------------------------------------------
console.log("\n--- 3. Ambiguous Errors (Insufficient Evidence) ---");

const d5 = diagnoseKnowledgeGap({
  question: "3 + 4 * 2",
  studentAnswer: "18",
  correctAnswer: "11",
});
assert(d5.status === "INSUFFICIENT_EVIDENCE", "3 + 4 * 2 = 18 returns INSUFFICIENT_EVIDENCE (no fake certainty)");

const d6 = diagnoseKnowledgeGap({
  question: "3 + 4 * 2",
  studentAnswer: "15",
  correctAnswer: "11",
});
assert(d6.status === "INSUFFICIENT_EVIDENCE", "3 + 4 * 2 = 15 returns INSUFFICIENT_EVIDENCE");

// -------------------------------------------------------------------
// 4. CORRECT ANSWERS
// -------------------------------------------------------------------
console.log("\n--- 4. Correct Answers ---");

const d7 = diagnoseKnowledgeGap({
  question: "3 + 4 * 2",
  studentAnswer: "11",
  correctAnswer: "11",
});
assert(d7.status === "DIAGNOSED" && d7.diagnosisType === "CORRECT", "3 + 4 * 2 = 11 diagnosed as CORRECT");

// -------------------------------------------------------------------
// 5. ATOMIC REPAIR CARD TESTS
// -------------------------------------------------------------------
console.log("\n--- 5. Atomic Repair Card (1 Rule + 1 Example) ---");

const repair = getAtomicRepairContent("multiplication_before_addition", "order_of_operations");
assert(repair && repair.rule.length > 0, "Repair rule exists");
assert(repair.example.includes("7 + 5 × 3") || repair.example.includes("22"), "Repair has 1 concrete example");

// -------------------------------------------------------------------
// 6. NEGATIVE SEMANTIC BOUNDARY TESTS (Rejecting Drift)
// -------------------------------------------------------------------
console.log("\n--- 6. Semantic Boundary Verifier (Negative Tests) ---");

const bad1 = verifyMathSemanticBoundary({ q: "Solve 2x^2 + 7x + 3 = 0", ans: "x = -3" }, "multiplication_before_addition", "order_of_operations");
assert(bad1.isValid === false, "Verifier rejects quadratic question for BODMAS");

const bad2 = verifyMathSemanticBoundary({ q: "Calculate sin(30) + cos(60)", ans: "1" }, "multiplication_before_addition", "order_of_operations");
assert(bad2.isValid === false, "Verifier rejects trigonometry question for BODMAS");

const good1 = verifyMathSemanticBoundary({ q: "Evaluate 6 + 4 * 5", ans: "26" }, "multiplication_before_addition", "order_of_operations");
assert(good1.isValid === true, "Verifier accepts valid isomorphic BODMAS question");

// -------------------------------------------------------------------
// 7. MATH MUTATOR DETERMINISTIC GENERATION
// -------------------------------------------------------------------
console.log("\n--- 7. MathMutator Contract Execution ---");

const mutator = new MathMutator();
const sourceQ = {
  q: "3 + 4 * 2",
  ans: "11",
  metadata: { conceptId: "order_of_operations", skillId: "bodmas" }
};

const probeQ = mutator.mutate(sourceQ, 1, {
  sourceSkillId: "bodmas",
  targetSkillId: "bodmas",
  mode: "REPAIR_PROBE",
  repairStrategy: "STANDARD",
});

assert(probeQ !== null, "MathMutator produces valid probe question");
assert(probeQ && probeQ.ans !== undefined, "Probe question contains computed answer");

console.log("\n==================================================================");
console.log(`SUMMARY: ${passed} / ${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
console.log("==================================================================");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
