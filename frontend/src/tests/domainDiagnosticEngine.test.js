/**
 * Domain Diagnostic Engine Unit Test Suite
 *
 * Verifies that:
 * 1. Diagnostic strategies emit structured candidate findings with direct evidence.
 * 2. DiagnosticEngine arbitrates using evidence strength and specificity.
 * 3. Exact BODMAS screenshot case is diagnosed with arithmetic slip at Step 3.
 * 4. Bare wrong answer without working produces honest INCONCLUSIVE.
 */

import { diagnosticEngine } from "../domain/diagnostics/index.js";
import { createSubmissionEntity } from "../domain/contracts/SubmissionEntity.js";
import { createEvaluationResult, GRADE_STATUS } from "../domain/contracts/EvaluationResultContract.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log("=== RUNNING DOMAIN DIAGNOSTIC ENGINE TEST SUITE ===");

const bodmasQuestion = {
  id: "q_bodmas_1",
  q: "Solve: 6 + 2 × 3",
  ans: "12",
  steps: [
    "Step 1: Identify multiplication and addition.",
    "Step 2: Calculate 2 × 3 = 6.",
    "Step 3: Calculate 6 + 6 = 12."
  ],
  skillId: "math-numbers-bodmas",
};

// Test 1: Full Working with Arithmetic Slip (User Screenshot Reproduction)
console.log("\n[Test 1: Student Working with Arithmetic Slip]");
const subWithWork = createSubmissionEntity({
  questionId: bodmasQuestion.id,
  answer: "13",
  work: "6+2*3\n6+6\n=13",
  userId: "user_test",
});

const evalIncorrect = createEvaluationResult({
  isCorrect: false,
  grade: GRADE_STATUS.INCORRECT,
  studentAnswer: "13",
  userWork: "6+2*3\n6+6\n=13",
  correctAnswer: "12",
});

const diagnosis1 = diagnosticEngine.diagnose({
  submission: subWithWork,
  question: bodmasQuestion,
  evaluation: evalIncorrect,
});

assert(diagnosis1.status === "diagnosed", "Status is 'diagnosed' from multi-step working");
assert(diagnosis1.breakPoint?.brokenAt === "arithmetic_addition_slip", "Pinpoints exact arithmetic slip brokenAt");
assert(diagnosis1.stepAnalysis !== null, "Produces stepAnalysis for feedback view");
assert(diagnosis1.stepAnalysis.whatYouDidRight.length === 2, "Recognizes first 2 steps were valid");
assert(diagnosis1.stepAnalysis.whereYourWorkingBrokeDown.stepIndex === 3, "Identifies Step 3 as point of breakdown");

// Test 2: Bare Wrong Answer Without Working (Honest Inconclusive)
console.log("\n[Test 2: Bare Wrong Answer Without Working]");
const subNoWork = createSubmissionEntity({
  questionId: bodmasQuestion.id,
  answer: "13",
  work: "",
  userId: "user_test",
});

const evalNoWork = createEvaluationResult({
  isCorrect: false,
  grade: GRADE_STATUS.INCORRECT,
  studentAnswer: "13",
  userWork: "",
  correctAnswer: "12",
});

const diagnosis2 = diagnosticEngine.diagnose({
  submission: subNoWork,
  question: bodmasQuestion,
  evaluation: evalNoWork,
});

assert(diagnosis2.status === "inconclusive", "Status is 'inconclusive' when no working is provided");
assert(diagnosis2.diagnosis.brokenAt === "insufficient_working", "Classified as insufficient_working");
assert(diagnosis2.whyThisIsWrong[0].includes("without intermediate steps"), "Explains that intermediate steps are required");

// Test 3: Correct Answer
console.log("\n[Test 3: Correct Answer]");
const subCorrect = createSubmissionEntity({
  questionId: bodmasQuestion.id,
  answer: "12",
  work: "6+2*3\n6+6\n=12",
  userId: "user_test",
});

const evalCorrect = createEvaluationResult({
  isCorrect: true,
  grade: GRADE_STATUS.CORRECT,
  studentAnswer: "12",
  userWork: "6+2*3\n6+6\n=12",
  correctAnswer: "12",
});

const diagnosis3 = diagnosticEngine.diagnose({
  submission: subCorrect,
  question: bodmasQuestion,
  evaluation: evalCorrect,
});

assert(diagnosis3.status === "correct", "Correct submission returns status 'correct'");

console.log(`\nDomain Diagnostic Engine Tests Complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
