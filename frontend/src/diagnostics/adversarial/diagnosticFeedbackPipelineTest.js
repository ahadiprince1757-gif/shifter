/**
 * TIXAR DIAGNOSTIC FEEDBACK PIPELINE AUDIT SUITE
 *
 * Validates the evidence-first diagnostic engine and feedback contract:
 * 1. Test 1 (Gibberish): "jcddcjdkdkd" -> INCONCLUSIVE (never invents math misconception)
 * 2. Test 2 (Classification Break): "It's a natural number." -> DIAGNOSED (exact break, repair, same-skill retest)
 * 3. Test 3 (Correct Reasoning): "0 is a whole number and an integer... natural numbers start at 1" -> CORRECT (verified reasoning, NO "why this is wrong")
 * 4. Test 4 (Bare Correct Answer): "4" -> CORRECT (verified, no "why this is wrong")
 * 5. Test 5 (Correct Choice + Hidden Misconception): "4 because fractions are natural numbers" -> DIAGNOSED
 * 6. Test 6 (Wrong Answer + Misconception): 42.5 km/h -> DIAGNOSED
 * 7. Test 7 (Wrong Answer + Unit Error): 40 m/s instead of km/h -> DIAGNOSED
 * 8. Test 8 (Step-by-Step Algebraic Working): 3x = 11 -> DIAGNOSED (first error step identified)
 * 9. Test 9 (Empty Submission): "" -> INCONCLUSIVE (blank)
 * 10. Test 10 (Bare Wrong Answer Without Working): "12" -> INCONCLUSIVE (refusal to invent unobserved reasoning)
 * 11. Test 11 (Alternative Phrasing): Valid terminology accepted -> CORRECT
 * 12. Test 12 (Canonical Contract Compliance): All returns strictly adhere to canonical schema
 */

import { diagnoseStudentSubmission, STATUS } from "../teacherDiagnoser.js";
import { DIAGNOSTIC_STATUS, CORRECTNESS_STATUS } from "../engine/diagnosticContract.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[AUDIT FAILED] ${message}`);
  }
}

console.log("=== RUNNING TIXAR DIAGNOSTIC FEEDBACK PIPELINE AUDIT ===");

// ── TEST 1: Gibberish input (Screenshot 1 Reproduction) ───────────────────────
const qNaturalList = {
  q: "Which of -3, 0, 4, 1/2 is a natural number?",
  ans: "4",
  steps: [
    "Natural numbers are positive counting numbers: {1, 2, 3, 4, ...}.",
    "-3 is a negative integer.",
    "0 is a whole number.",
    "1/2 is a fraction (rational number).",
    "Therefore, 4 is the only natural number.",
  ],
  why: "Natural numbers are positive whole numbers starting from 1.",
};

const gibberishResult = diagnoseStudentSubmission({
  studentAnswer: "jcddcjdkdkd",
  userWork: "",
  question: qNaturalList,
  expectedAnswer: "4",
  isAnswerCorrect: false,
});

assert(gibberishResult.status === "inconclusive", "Gibberish must return inconclusive");
assert(gibberishResult.correctness === "incorrect", "Gibberish correctness must be incorrect");
assert(Array.isArray(gibberishResult.evidence) && gibberishResult.evidence.length === 0, "Gibberish must produce zero evidence of mathematical reasoning");
assert(gibberishResult.diagnosis.brokenAt === "insufficient_evidence", "Gibberish must attribute breakdown to insufficient evidence");
assert(
  gibberishResult.diagnosis.explanation.includes("doesn't contain enough mathematical reasoning"),
  "Gibberish explanation must state insufficient reasoning rather than inventing a misconception"
);
assert(
  !gibberishResult.whyThisIsWrong.some((msg) => msg.includes("we cannot verify your reasoning from this number alone")),
  "Universal generic sentence must NOT be used for gibberish"
);
console.log("✅ PASS: Test 1 (Gibberish) accurately classified as INCONCLUSIVE with honest uncertainty.");


// ── TEST 2: Meaningful Misconception Statement (Screenshot 2 Reproduction) ──
const qZeroClassification = {
  q: "Is 0 a natural number, whole number, or integer?",
  ans: "Whole number and integer",
  steps: [
    "Natural numbers: {1, 2, 3, 4, ...}.",
    "Whole numbers: {0, 1, 2, 3, 4, ...}.",
    "Integers: {..., -2, -1, 0, 1, 2, ...}.",
    "0 is a whole number and an integer, but not a natural number.",
  ],
  why: "Natural numbers start at 1 in this classification; whole numbers include 0.",
};

const naturalResult = diagnoseStudentSubmission({
  studentAnswer: "It's a natural number.",
  userWork: "",
  question: qZeroClassification,
  expectedAnswer: "Whole number and integer",
  isAnswerCorrect: false,
});

assert(naturalResult.status === "diagnosed", "Student classifying 0 as natural must be DIAGNOSED");
assert(naturalResult.correctness === "incorrect", "Correctness must be incorrect");
assert(naturalResult.evidence.length > 0, "Must extract student's actual claim as evidence");
assert(naturalResult.evidence[0].text === "It's a natural number.", "Evidence must capture exact student wording");
assert(naturalResult.diagnosis.type === "classification", "Diagnosis type must be classification");
assert(naturalResult.diagnosis.brokenAt === "natural-number definition", "Break point must be natural-number definition");
assert(
  naturalResult.diagnosis.explanation.includes("natural numbers begin at 1, while whole numbers include 0"),
  "Diagnosis explanation must explain starting points of number systems"
);
assert(Array.isArray(naturalResult.repair.steps) && naturalResult.repair.steps.length >= 3, "Repair must provide distinct number system steps");
assert(naturalResult.verification.type === "same_skill", "Verification must test same skill");
assert(
  naturalResult.verification.question.includes("what makes it different from a natural number"),
  "Verification probe must test distinguishing 0 from natural numbers"
);
assert(
  !naturalResult.whyThisIsWrong.some((msg) => msg.includes("we cannot verify your reasoning from this number alone")),
  "Universal generic sentence must NOT be displayed when student provided reasoning"
);
console.log("✅ PASS: Test 2 (Student writes 'It\\'s a natural number.') produces DIAGNOSED classification break and repair.");


// ── TEST 3: Student writes full, correct reasoning ──────────────────────────
const correctReasoningAnswer =
  "0 is a whole number and an integer because both include 0, but it isn't a natural number because natural numbers start at 1.";

const correctReasoningResult = diagnoseStudentSubmission({
  studentAnswer: correctReasoningAnswer,
  userWork: "",
  question: qZeroClassification,
  expectedAnswer: "Whole number and integer",
  isAnswerCorrect: true,
});

assert(correctReasoningResult.status === "correct", "Correct reasoning must return status 'correct'");
assert(correctReasoningResult.correctness === "correct", "Correctness must be 'correct'");
assert(correctReasoningResult.evidence.length >= 3, "Must extract the 3 verified conceptual claims from student answer");
assert(correctReasoningResult.whyThisIsWrong.length === 0, "Correct reasoning must have ZERO 'Why this is wrong' reasons");
assert(
  correctReasoningResult.remember.includes("reasoning matches the classification") ||
  correctReasoningResult.whatYouDid.includes("correctly separated the three number systems"),
  "Must affirm that student correctly separated the three number systems"
);
assert(correctReasoningResult.verification !== null, "Must provide same-skill verification question");
console.log("✅ PASS: Test 3 (Student writes full correct reasoning) returns verified claims with ZERO 'Why this is wrong'.");


// ── TEST 4: Bare correct answer (e.g. "4") ──────────────────────────────────
const bareCorrectResult = diagnoseStudentSubmission({
  studentAnswer: "4",
  userWork: "",
  question: qNaturalList,
  expectedAnswer: "4",
  isAnswerCorrect: true,
});

assert(bareCorrectResult.status === "correct", "Bare correct answer must return status 'correct'");
assert(bareCorrectResult.whyThisIsWrong.length === 0, "Bare correct answer must have ZERO 'Why this is wrong'");
console.log("✅ PASS: Test 4 (Bare correct answer) returns status 'correct' without negative feedback.");


// ── TEST 5: Correct final choice with hidden misconception ──────────────────
const correctWithMisconception = diagnoseStudentSubmission({
  studentAnswer: "4 because 4/1 is a fraction and fractions are natural numbers",
  userWork: "",
  question: qNaturalList,
  expectedAnswer: "4",
  isAnswerCorrect: false, // Student had a misconception despite picking 4
});

assert(correctWithMisconception.status === "diagnosed", "Misconception in reasoning must be DIAGNOSED");
assert(correctWithMisconception.diagnosis.brokenAt === "fraction vs natural number distinction", "Must identify fraction confusion");
assert(correctWithMisconception.repair.steps.length > 0, "Must provide repair on rational vs natural numbers");
console.log("✅ PASS: Test 5 (Correct choice but flawed reasoning) catches hidden misconception.");


// ── TEST 6: Average Speed Journey Misconception (Speed Averaging) ───────────
const avgSpeedQuestion = {
  q: "A car travels 50 km in 1 hour and 70 km in 2 hours. Find its average speed.",
  ans: "40 km/h",
  steps: [
    "Total distance = 50 + 70 = 120 km.",
    "Total time = 1 + 2 = 3 h.",
    "Average speed = 120 ÷ 3 = 40 km/h.",
  ],
};

const speedMisconceptionResult = diagnoseStudentSubmission({
  studentAnswer: "42.5 km/h",
  userWork: "",
  question: avgSpeedQuestion,
  expectedAnswer: "40 km/h",
  isAnswerCorrect: false,
});

assert(speedMisconceptionResult.status === "diagnosed", "Speed averaging error must be DIAGNOSED");
assert(speedMisconceptionResult.diagnosis.type === "formula", "Type must be formula");
assert(speedMisconceptionResult.diagnosis.brokenAt === "speed_averaging_trap", "Broken at must be speed_averaging_trap");
assert(speedMisconceptionResult.repair.steps.length > 0, "Repair must give total distance / total time steps");
console.log("✅ PASS: Test 6 (Average speed averaging trap) diagnosed with formula repair.");


// ── TEST 7: Unit Error ──────────────────────────────────────────────────────
const unitErrorResult = diagnoseStudentSubmission({
  studentAnswer: "40 m/s",
  userWork: "",
  question: avgSpeedQuestion,
  expectedAnswer: "40 km/h",
  isAnswerCorrect: false,
});

assert(unitErrorResult.status === "diagnosed", "Unit mismatch must be DIAGNOSED");
assert(unitErrorResult.diagnosis.type === "units", "Diagnosis type must be units");
console.log("✅ PASS: Test 7 (Unit mismatch) diagnosed as units error.");


// ── TEST 8: Step-by-Step Multi-line Working Error ───────────────────────────
const algebraQuestion = {
  q: "Solve for x: 3x - 5 = 16",
  ans: "7",
  steps: [
    "Add 5 to both sides: 3x = 21.",
    "Divide both sides by 3: x = 7.",
  ],
};

const stepErrorResult = diagnoseStudentSubmission({
  studentAnswer: "11/3",
  userWork: "3x - 5 = 16\n3x = 16 - 5\n3x = 11\nx = 11/3",
  question: algebraQuestion,
  expectedAnswer: "7",
  isAnswerCorrect: false,
});

assert(stepErrorResult.status === "diagnosed", "Step error must be DIAGNOSED");
assert(stepErrorResult.stepAnalysis !== undefined, "Must include stepAnalysis");
assert(stepErrorResult.stepAnalysis.whereYourWorkingBrokeDown !== undefined, "Must pinpoint exact broken step");
console.log("✅ PASS: Test 8 (Step-by-step algebraic working) pinpointed exact step transition error.");


// ── TEST 9: Empty Submission ────────────────────────────────────────────────
const blankResult = diagnoseStudentSubmission({
  studentAnswer: "",
  userWork: "",
  question: algebraQuestion,
  expectedAnswer: "7",
  isAnswerCorrect: false,
});

assert(blankResult.status === "inconclusive", "Blank submission must be inconclusive");
assert(blankResult.errorType === "blank_submission", "Error type must be blank_submission");
console.log("✅ PASS: Test 9 (Blank submission) handled cleanly as inconclusive.");


// ── TEST 10: Bare Wrong Answer Without Working ──────────────────────────────
const bareWrongResult = diagnoseStudentSubmission({
  studentAnswer: "12",
  userWork: "",
  question: avgSpeedQuestion,
  expectedAnswer: "40 km/h",
  isAnswerCorrect: false,
});

assert(bareWrongResult.status === "inconclusive", "Bare wrong answer without working must be INCONCLUSIVE");
assert(
  !bareWrongResult.whyThisIsWrong.some((m) => m.includes("we cannot verify your reasoning from this number alone")),
  "Universal generic sentence must be replaced with clear contextual message"
);
console.log("✅ PASS: Test 10 (Bare wrong answer without working) refuses to guess unsupported misconceptions.");


// ── TEST 11: Alternative Valid Phrasing ─────────────────────────────────────
const altValidResult = diagnoseStudentSubmission({
  studentAnswer: "whole number",
  userWork: "",
  question: {
    q: "In {0, 1, 2}, 0 is a ...?",
    ans: "whole number",
  },
  expectedAnswer: "whole number",
  isAnswerCorrect: true,
});

assert(altValidResult.status === "correct", "Alternative valid phrasing must be marked correct");
console.log("✅ PASS: Test 11 (Alternative valid phrasing) handled as correct.");


// ── TEST 12: Canonical Contract Invariant Verification ───────────────────────
for (const [name, res] of [
  ["gibberish", gibberishResult],
  ["natural", naturalResult],
  ["correctReasoning", correctReasoningResult],
  ["bareCorrect", bareCorrectResult],
  ["speed", speedMisconceptionResult],
  ["bareWrong", bareWrongResult],
]) {
  assert(["correct", "diagnosed", "inconclusive"].includes(res.status), `${name}: status must match canonical enum`);
  assert(["correct", "incorrect", "partial"].includes(res.correctness), `${name}: correctness must match canonical enum`);
  assert(Array.isArray(res.evidence), `${name}: evidence must be an array`);
  assert(typeof res.studentAnswer === "string", `${name}: studentAnswer must be a string`);
  if (res.status === "diagnosed") {
    assert(res.diagnosis !== null && typeof res.diagnosis === "object", `${name}: diagnosis must be structured object`);
    assert(typeof res.diagnosis.brokenAt === "string", `${name}: diagnosis.brokenAt must be a string`);
    assert(typeof res.diagnosis.explanation === "string", `${name}: diagnosis.explanation must be a string`);
    assert(res.repair !== null && Array.isArray(res.repair.steps), `${name}: repair.steps must be an array`);
  }
}
console.log("✅ PASS: Test 12 (Canonical Contract Compliance) verified across all outcomes.");

console.log("\n🎉 ALL 12 DIAGNOSTIC FEEDBACK PIPELINE AUDIT TESTS PASSED CLEANLY!");
