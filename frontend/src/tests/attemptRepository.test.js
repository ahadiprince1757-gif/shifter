/**
 * AttemptRepository Unit Test Suite
 *
 * Verifies that:
 * 1. Submissions are saved locally with raw work before evaluation.
 * 2. Status transitions from CAPTURED to EVALUATED to COMPLETED.
 * 3. Outbox receives idempotently keyed operation for background sync.
 */

import { AttemptRepository } from "../infrastructure/repositories/AttemptRepository.js";
import { createSubmissionEntity, PROCESSING_STATUS, EVALUATION_STATUS, DIAGNOSIS_OUTCOME_STATUS } from "../domain/contracts/SubmissionEntity.js";

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

console.log("=== RUNNING ATTEMPT REPOSITORY TEST SUITE ===");

// Create a mock Dexie store
class MockTable {
  constructor() {
    this.items = new Map();
  }
  async put(record) {
    const key = record.submission_id || record.idempotency_key || String(Math.random());
    this.items.set(key, { ...record });
    return key;
  }
  where(field) {
    return {
      equals: (val) => ({
        first: async () => {
          for (const item of this.items.values()) {
            if (item[field] === val) return item;
          }
          return null;
        },
        modify: async (updates) => {
          for (const [k, item] of this.items.entries()) {
            if (item[field] === val) {
              this.items.set(k, { ...item, ...updates });
            }
          }
        },
      }),
    };
  }
}

class MockDb {
  constructor() {
    this.local_attempts = new MockTable();
    this.sync_outbox = new MockTable();
  }
  async transaction(mode, tables, fn) {
    return await fn();
  }
}

const mockDb = new MockDb();
const repo = new AttemptRepository(mockDb);

async function runTests() {
  const sub = createSubmissionEntity({
    questionId: "q_bodmas_1",
    answer: "13",
    work: "6+2*3\n6+6\n=13",
    userId: "user_test_456",
  });

  // Test 1: Local save before evaluation
  const saved = await repo.saveAttemptLocally(sub);
  assert(saved.submission_id === sub.submissionId, "Attempt saved with correct submission_id");
  assert(saved.work === "6+2*3\n6+6\n=13", "Raw working persisted before evaluation");
  assert(saved.processing_status === PROCESSING_STATUS.CAPTURED, "Processing status is CAPTURED");

  // Verify retrieval
  const retrieved = await repo.getAttemptBySubmissionId(sub.submissionId);
  assert(retrieved !== null && retrieved.submission_id === sub.submissionId, "Retrieved attempt by submissionId");

  // Test 2: Evaluation update
  await repo.updateAttemptEvaluation(sub.submissionId, {
    isCorrect: false,
    grade: "incorrect",
    score: 0,
  });
  const evaluated = await repo.getAttemptBySubmissionId(sub.submissionId);
  assert(evaluated.evaluation_status === EVALUATION_STATUS.EVALUATED, "Evaluation status updated to EVALUATED");
  assert(evaluated.is_correct === false, "is_correct updated to false");

  // Test 3: Atomic completion & outbox queueing
  const diagnosis = {
    status: "diagnosed",
    errorType: "arithmetic_error",
    brokenAt: "arithmetic_addition_slip",
  };
  await repo.recordCompletedAttempt(
    sub.submissionId,
    { isCorrect: false, grade: "incorrect" },
    diagnosis,
    { userId: "user_test_456", questionId: "q_bodmas_1" }
  );

  const completed = await repo.getAttemptBySubmissionId(sub.submissionId);
  assert(completed.processing_status === PROCESSING_STATUS.COMPLETED, "Processing status updated to COMPLETED");
  assert(completed.diagnosis_status === DIAGNOSIS_OUTCOME_STATUS.DIAGNOSED, "Diagnosis status updated to DIAGNOSED");

  // Check outbox
  const outboxItem = mockDb.sync_outbox.items.get(`attempt_${sub.submissionId}`);
  assert(outboxItem !== undefined, "Sync outbox received entry with idempotent key");
  assert(outboxItem.idempotency_key === `attempt_${sub.submissionId}`, "Correct idempotency key assigned");
  assert(outboxItem.payload.user_work === "6+2*3\n6+6\n=13", "Outbox preserves student working");

  console.log(`\nAttempt Repository Tests Complete: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
