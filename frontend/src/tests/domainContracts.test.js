/**
 * Domain Contracts Unit Test Suite
 *
 * Verifies that:
 * 1. SubmissionEntity captures raw submission and assigns unique submissionId.
 * 2. EvaluationResultContract preserves userWork and enforces boolean isCorrect.
 * 3. CandidateFindingContract enforces evidenceStrength ('DIRECT', 'DERIVED', 'INFERRED').
 * 4. RepairVerificationContract enforces Diagnosed Skill === Retest Skill and throws RETEST_SKILL_MISMATCH on divergence.
 */

import {
  createSubmissionEntity,
  validateSubmissionEntity,
  PROCESSING_STATUS,
  EVALUATION_STATUS,
  DIAGNOSIS_OUTCOME_STATUS,
  createEvaluationResult,
  validateEvaluationResult,
  GRADE_STATUS,
  createCandidateFinding,
  validateCandidateFinding,
  EVIDENCE_STRENGTH,
  canonicalSkillId,
  validateRetestSkill,
  RETEST_SKILL_MISMATCH,
  createRepairVerification,
} from "../domain/contracts/index.js";

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

console.log("=== RUNNING DOMAIN CONTRACTS TEST SUITE ===");

// 1. SubmissionEntity Tests
console.log("\n[Test Suite 1: SubmissionEntity]");
const sub = createSubmissionEntity({
  questionId: "q_bodmas_1",
  answer: "13",
  work: "6+2*3\n6+6\n=13",
  userId: "user_test_123",
});

assert(sub.submissionId.startsWith("sub_"), "Generates stable submissionId prefix");
assert(sub.work === "6+2*3\n6+6\n=13", "Preserves exact student working text");
assert(sub.processingStatus === PROCESSING_STATUS.CAPTURED, "Initial status is CAPTURED");
assert(validateSubmissionEntity(sub) === true, "Validates valid submission entity");

try {
  createSubmissionEntity({ answer: "13" }); // missing questionId
  assert(false, "Should have thrown for missing questionId");
} catch (e) {
  assert(true, "Throws when required questionId is missing");
}

// 2. EvaluationResultContract Tests
console.log("\n[Test Suite 2: EvaluationResultContract]");
const evalRes = createEvaluationResult({
  isCorrect: false,
  grade: GRADE_STATUS.INCORRECT,
  studentAnswer: "13",
  userWork: "6+2*3\n6+6\n=13",
  correctAnswer: "12",
});

assert(evalRes.isCorrect === false, "isCorrect is boolean false");
assert(evalRes.userWork === "6+2*3\n6+6\n=13", "Preserves userWork in EvaluationResult");
assert(validateEvaluationResult(evalRes) === true, "Validates valid evaluation result");

// 3. CandidateFindingContract Tests
console.log("\n[Test Suite 3: CandidateFindingContract]");
const candidate = createCandidateFinding({
  strategyId: "arithmetic_reduction",
  errorType: "arithmetic_addition_slip",
  skillId: "bodmas-addition",
  evidenceStrength: EVIDENCE_STRENGTH.DIRECT,
  specificity: 9,
  breakPoint: { concept: "addition", explanation: "6 + 6 = 12, not 13" },
});

assert(candidate.strategyId === "arithmetic_reduction", "Preserves strategyId");
assert(candidate.evidenceStrength === "DIRECT", "Accepts valid DIRECT evidence strength");
assert(candidate.specificity === 9, "Preserves specificity score");
assert(validateCandidateFinding(candidate) === true, "Validates valid candidate finding");

try {
  createCandidateFinding({
    strategyId: "invalid_strat",
    errorType: "slip",
    evidenceStrength: "GUESS",
  });
  assert(false, "Should have thrown for invalid evidenceStrength");
} catch (e) {
  assert(true, "Rejects unknown evidenceStrength values");
}

// 4. RepairVerificationContract Tests
console.log("\n[Test Suite 4: RepairVerificationContract & Invariant]");
const repairPlan = {
  diagnosedSkillId: "math-numbers-bodmas",
  title: "Order of operations review",
};

const matchingRetest = {
  id: "q_retest_1",
  skillId: "math-numbers-bodmas",
};

const mismatchRetest = {
  id: "q_retest_2",
  skillId: "physics-kinematics-velocity",
};

assert(validateRetestSkill(matchingRetest, repairPlan) === true, "Approves matching retest skill");

try {
  validateRetestSkill(mismatchRetest, repairPlan);
  assert(false, "Should have thrown RETEST_SKILL_MISMATCH");
} catch (err) {
  assert(err.code === RETEST_SKILL_MISMATCH, `Throws RETEST_SKILL_MISMATCH on skill divergence (${err.message})`);
}

const verification = createRepairVerification({
  repairPlan,
  retestQuestion: matchingRetest,
  isPassed: true,
  studentAnswer: "12",
});
assert(verification.isPassed === true, "Records verified passing repair attempt");

console.log(`\nDomain Contracts Tests Complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
