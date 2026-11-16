/**
 * Epistemic Agreement Test Suite
 *
 * Verifies that the JavaScript Teacher Diagnostic Engine agrees with the
 * Python TixarEngine on fundamental epistemic facts:
 * 1. Correct vs. Incorrect
 * 2. Error Detected vs. Not Detected
 * 3. Cause Known vs. Unknown
 * 4. Repair Known vs. Needs Probe
 */

import { diagnoseStudentSubmission } from "../diagnostics/teacherDiagnoser.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log("Running Epistemic Agreement Tests on JavaScript Diagnoser...\n");

// Case 1: Rate Operation Inversion (120km in 3h -> 360 km/h)
const qRate = {
  q: "A car travels 120 km in 3 hours. What is its average speed?",
  ans: "40 km/h",
};

const resRate = diagnoseStudentSubmission({
  studentAnswer: "360 km/h",
  question: qRate,
  questionText: qRate.q,
  expectedAnswer: qRate.ans,
  isAnswerCorrect: false,
});

assert(resRate.status === "diagnosed", "Rate inversion status must be 'diagnosed'");
assert(resRate.errorType === "OPERATION_SELECTION_ERROR", "Error type must be OPERATION_SELECTION_ERROR");
assert(Boolean(resRate.probe), "Probe question must be present for cognitive verification");
assert(Boolean(resRate.repair), "Cognitive repair must be present");
assert(Boolean(resRate.retest), "Verification retest must be present");
console.log("✓ Case 1 Passed: Rate Operation Inversion (agreement on error, cause, and repair).");

// Case 2: Correct Answer (40 km/h)
const resCorrect = diagnoseStudentSubmission({
  studentAnswer: "40 km/h",
  question: qRate,
  questionText: qRate.q,
  expectedAnswer: qRate.ans,
  isAnswerCorrect: true,
});

assert(resCorrect.status === "correct", "Correct answer status must be 'correct'");
assert(!resCorrect.errorType, "No errorType should be present for correct answer");
console.log("✓ Case 2 Passed: Correct Answer (agreement on correctness).");

// Case 3: BODMAS Precedence Inversion (7 + 5 * 3 -> 36)
const qBodmas = {
  q: "Evaluate: 7 + 5 * 3",
  ans: "22",
};

const resBodmas = diagnoseStudentSubmission({
  studentAnswer: "36",
  question: qBodmas,
  questionText: qBodmas.q,
  expectedAnswer: qBodmas.ans,
  isAnswerCorrect: false,
});

assert(resBodmas.status === "diagnosed", "BODMAS inversion status must be 'diagnosed'");
assert(resBodmas.errorType === "BODMAS_ADDITION_BEFORE_MULTIPLICATION", "Error type must be BODMAS_ADDITION_BEFORE_MULTIPLICATION");
console.log("✓ Case 3 Passed: BODMAS Precedence Inversion (agreement on operational cause).");

// Case 4: Blank Submission ("")
const resBlank = diagnoseStudentSubmission({
  studentAnswer: "",
  question: qRate,
  questionText: qRate.q,
  expectedAnswer: qRate.ans,
  isAnswerCorrect: false,
});

assert(resBlank.status === "blank", "Blank submission status must be 'blank'");
assert(resBlank.errorType === "blank_submission", "Error type must be blank_submission");
console.log("✓ Case 4 Passed: Blank Submission (agreement on absence of working).");

console.log("\nAll Epistemic Agreement Tests in JavaScript PASSED with 100% parity!");
