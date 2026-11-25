/**
 * Application Use Cases Unit Test Suite
 *
 * Verifies:
 * 1. SubmitAnswerUseCase executes full 7-step lifecycle with local-first persistence.
 * 2. Pre-evaluation attempt record is created before evaluation runs.
 * 3. VerifyRepairUseCase enforces RETEST_SKILL_MISMATCH invariant.
 */

import { SubmitAnswerUseCase } from "../application/use-cases/SubmitAnswer.js";
import { VerifyRepairUseCase } from "../application/use-cases/VerifyRepair.js";
import { RETEST_SKILL_MISMATCH } from "../domain/contracts/RepairVerificationContract.js";

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

console.log("=== RUNNING APPLICATION USE CASES TEST SUITE ===");

// Mock repositories
class MockAttemptRepo {
  constructor() {
    this.savedPreEvaluation = null;
    this.completed = null;
  }
  async saveAttemptLocally(submission) {
    this.savedPreEvaluation = { ...submission };
    return this.savedPreEvaluation;
  }
  async recordCompletedAttempt(submissionId, evaluation, diagnosis, metadata) {
    this.completed = { submissionId, evaluation, diagnosis, metadata };
  }
  async markAttemptFailed() {}
}

class MockMistakeRepo {
  constructor() {
    this.savedMistakes = [];
    this.resolvedMistakes = [];
  }
  async saveMistake(data) {
    this.savedMistakes.push(data);
  }
  async resolveMistake(data) {
    this.resolvedMistakes.push(data);
  }
}

const mockAttempt = new MockAttemptRepo();
const mockMistake = new MockMistakeRepo();
const submitUseCase = new SubmitAnswerUseCase(mockAttempt, mockMistake);
const verifyUseCase = new VerifyRepairUseCase(mockMistake);

async function runTests() {
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
    conceptId: "math-numbers-bodmas",
  };

  // 1. SubmitAnswer with student working (Exact screenshot reproduction)
  console.log("\n[Test 1: SubmitAnswer Lifecycle]");
  const feedback = await submitUseCase.execute({
    answer: "13",
    work: "6+2*3\n6+6\n=13",
    question: bodmasQuestion,
    userId: "test_user_789",
    topicId: "BODMAS / Order of Operations",
    qIdx: 0,
  });

  assert(mockAttempt.savedPreEvaluation !== null, "Pre-evaluation attempt saved to local storage");
  assert(mockAttempt.savedPreEvaluation.work === "6+2*3\n6+6\n=13", "Pre-evaluation attempt preserved exact working");
  assert(mockAttempt.completed !== null, "Completed attempt committed atomically");
  assert(feedback.userWork === "6+2*3\n6+6\n=13", "Feedback preserves userWork");
  assert(feedback.teacherDiagnosis?.status === "diagnosed", "Teacher diagnosis status is 'diagnosed'");
  assert(feedback.teacherDiagnosis?.diagnosis?.brokenAt === "arithmetic_addition_slip", "Pinpoints arithmetic slip at 6+6=13");
  assert(mockMistake.savedMistakes.length === 1, "Mistake recorded in repository for diagnosed failure");

  // 2. VerifyRepair Invariant Enforcement
  console.log("\n[Test 2: VerifyRepair Skill Invariant]");
  const repairPlan = {
    diagnosedSkillId: "math-numbers-bodmas",
  };

  const matchingRetest = {
    id: "q_retest_bodmas",
    q: "Calculate: 4 + 3 × 2",
    ans: "10",
    skillId: "math-numbers-bodmas",
  };

  const mismatchRetest = {
    id: "q_retest_other",
    q: "Calculate speed: 100km / 2h",
    ans: "50",
    skillId: "physics-kinematics-speed",
  };

  // Should throw RETEST_SKILL_MISMATCH on mismatch
  try {
    await verifyUseCase.execute({
      repairPlan,
      retestQuestion: mismatchRetest,
      studentAnswer: "50",
      userId: "test_user_789",
      topicId: "BODMAS / Order of Operations",
      originalQuestionIndex: 0,
    });
    assert(false, "Should have thrown RETEST_SKILL_MISMATCH");
  } catch (err) {
    assert(err.code === RETEST_SKILL_MISMATCH, "Threw RETEST_SKILL_MISMATCH on skill divergence");
  }

  // Matching retest passes
  const verifyResult = await verifyUseCase.execute({
    repairPlan,
    retestQuestion: matchingRetest,
    studentAnswer: "10",
    userId: "test_user_789",
    topicId: "BODMAS / Order of Operations",
    originalQuestionIndex: 0,
  });

  assert(verifyResult.isPassed === true, "Retest passed with correct answer");
  assert(mockMistake.resolvedMistakes.length === 1, "Mistake marked resolved in repository upon passing retest");

  console.log(`\nApplication Use Cases Tests Complete: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
