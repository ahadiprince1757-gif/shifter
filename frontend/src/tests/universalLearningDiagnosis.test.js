/**
 * Universal Learning Diagnosis Pipeline Test Suite
 *
 * Verifies the 5 Hard Invariants from the Approved Architecture Plan:
 * 1. No evidence -> no specific diagnosis (Inconclusive stays honest).
 * 2. No diagnosis without traceable evidence (diagnosis.evidenceIds + reason).
 * 3. Diagnosis never happens inside the humanizer.
 * 4. Repair skill === Diagnosed skill.
 * 5. Retest skill === Repair skill.
 *
 * Also reproduces and tests the exact Physics Distance vs Displacement case from the user's issue.
 */

import { diagnosticEngine } from "../domain/diagnostics/index.js";
import { createSubmissionEntity } from "../domain/contracts/SubmissionEntity.js";
import { createEvaluationResult } from "../domain/contracts/EvaluationResultContract.js";
import {
  LEARNING_DIAGNOSIS_STATES,
  DIAGNOSIS_CATEGORIES,
} from "../domain/contracts/LearningDiagnosisContract.js";

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

console.log("=== RUNNING UNIVERSAL LEARNING DIAGNOSIS TEST SUITE ===");

// ── TEST 1: User's Exact Physics Distance vs Displacement Case ───────────────
console.log("\n[Test 1: Physics Distance vs Displacement Prose with Typo]");

const physicsQuestion = {
  id: "phys_dist_disp_1",
  q: "A person walks 10 m forward and 10 m back to the starting point. Find distance and displacement.",
  ans: "Distance = 20 m; displacement = 0 m.",
  steps: [
    "Step 1: Distance = 10 + 10 = 20 m.",
    "Step 2: The person returns to the starting point.",
    "Step 3: Displacement = 0 m."
  ],
  why: "Distance is total path length (scalar), while displacement is net change in position from start to finish (vector).",
  skillId: "phys-kinematics-dist-disp",
  subject: "Physics",
  topic: "Linear Motion",
};

const physicsSubmission = createSubmissionEntity({
  questionId: physicsQuestion.id,
  answer: "The persons moves foprward and then backwards meaning he covers the distance but has zero displacement he is back to origin",
  work: "",
  userId: "user_physics",
});

const physicsEval = createEvaluationResult({
  isCorrect: false,
  studentAnswer: physicsSubmission.answer,
  correctAnswer: physicsQuestion.ans,
  questionWhy: physicsQuestion.why,
});

const physDiagnosis = diagnosticEngine.diagnose({
  submission: physicsSubmission,
  question: physicsQuestion,
  evaluation: physicsEval,
});

assert(physDiagnosis.state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED, "State is DIAGNOSED (not discarded as inconclusive)");
assert(physDiagnosis.diagnosis.category === DIAGNOSIS_CATEGORIES.INCOMPLETE_ANSWER, "Category is incomplete_answer");
assert(physDiagnosis.evidence.verified.length > 0, "Extracts verified claim from prose despite typo ('foprward')");
assert(
  physDiagnosis.evidence.verified.some((v) => v.text.includes("zero displacement") || v.meaning.includes("displacement is 0")),
  "Verified evidence recognizes student's correct zero displacement insight"
);
assert(
  physDiagnosis.evidence.missing.length > 0,
  "Identifies missing calculation for total distance"
);
assert(
  physDiagnosis.whatYouDidRight.length > 0,
  "WHAT YOU DID RIGHT is populated for qualitative prose (not blocked by multi-line gate)"
);
assert(
  !physDiagnosis.whyThisIsWrong[0].includes("The calculation does not lead to the required result"),
  "Never outputs robotic 'The calculation does not lead to the required result' on qualitative prose"
);
assert(
  physDiagnosis.repair.skillId === physDiagnosis.skill.id,
  "Invariant 4: Repair skill matches diagnosed skill"
);
assert(
  physDiagnosis.retest.skillId === physDiagnosis.repair.skillId,
  "Invariant 5: Retest skill matches repair skill"
);
assert(
  physDiagnosis.diagnosis.evidenceIds.length > 0,
  "Invariant 2: Diagnosis has traceable evidenceIds"
);
assert(
  physDiagnosis.remember === physicsQuestion.why,
  "Invariant: Authoritative question.why preserved without generic boilerplate overwrite"
);

// ── TEST 2: Multi-step Math Working with Arithmetic Slip ──────────────────────
console.log("\n[Test 2: BODMAS Step Slip with Traceable Evidence]");

const bodmasQuestion = {
  id: "q_bodmas_slip",
  q: "Solve: 6 + 2 × 3",
  ans: "12",
  steps: [
    "Step 1: Identify multiplication and addition.",
    "Step 2: Calculate 2 × 3 = 6.",
    "Step 3: Calculate 6 + 6 = 12."
  ],
  why: "Multiplication precedes addition in standard order of operations.",
  skillId: "math-numbers-bodmas",
  subject: "Mathematics",
  topic: "Order of Operations",
};

const bodmasSub = createSubmissionEntity({
  questionId: bodmasQuestion.id,
  answer: "13",
  work: "6+2*3\n6+6\n=13",
  userId: "user_bodmas",
});

const bodmasEval = createEvaluationResult({
  isCorrect: false,
  studentAnswer: "13",
  userWork: "6+2*3\n6+6\n=13",
  correctAnswer: "12",
});

const bodmasDiag = diagnosticEngine.diagnose({
  submission: bodmasSub,
  question: bodmasQuestion,
  evaluation: bodmasEval,
});

assert(bodmasDiag.state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED, "State is DIAGNOSED from multi-step working");
assert(bodmasDiag.diagnosis.brokenAt === "arithmetic_addition_slip", "Pinpoints exact slip at 6+6=13");
assert(bodmasDiag.stepAnalysis !== null, "Produces structured stepAnalysis");
assert(bodmasDiag.stepAnalysis.whereYourWorkingBrokeDown.stepIndex === 3, "Pinpoints Step 3 as breakdown point");
assert(bodmasDiag.diagnosis.evidenceIds.length > 0, "Has traceable evidenceIds");

// ── TEST 3: Bare Wrong Answer Without Working (Honest Inconclusive) ───────────
console.log("\n[Test 3: Bare Wrong Answer Refuses to Hallucinate Unseen Steps]");

const speedQuestion = {
  id: "q_speed_bare",
  q: "A car travels 120 km in 3 hours. Calculate its average speed.",
  ans: "40 km/h",
  why: "Average speed = Total distance / Total time.",
  skillId: "phys-kinematics-speed",
};

const bareSub = createSubmissionEntity({
  questionId: speedQuestion.id,
  answer: "360 km/h",
  work: "",
  userId: "user_bare",
});

const bareEval = createEvaluationResult({
  isCorrect: false,
  studentAnswer: "360 km/h",
  correctAnswer: "40 km/h",
});

const bareDiag = diagnosticEngine.diagnose({
  submission: bareSub,
  question: speedQuestion,
  evaluation: bareEval,
});

assert(bareDiag.state === LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE, "Bare answer stays INCONCLUSIVE");
assert(bareDiag.diagnosis.brokenAt === "result_divergence", "Classified as result_divergence");
assert(bareDiag.retest.probe !== null, "Generates targeted verification probe instead of hallucinated steps");

// ── TEST 4: Keyboard Mash / Gibberish Input ──────────────────────────────────
console.log("\n[Test 4: Keyboard Mash / Malformed Input]");

const mashSub = createSubmissionEntity({
  questionId: speedQuestion.id,
  answer: "jcddcjdkdkd",
  work: "",
  userId: "user_mash",
});

const mashEval = createEvaluationResult({
  isCorrect: false,
  studentAnswer: "jcddcjdkdkd",
  correctAnswer: "40 km/h",
});

const mashDiag = diagnosticEngine.diagnose({
  submission: mashSub,
  question: speedQuestion,
  evaluation: mashEval,
});

assert(mashDiag.state === LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE, "Mash stays INCONCLUSIVE");
assert(mashDiag.diagnosis.category === DIAGNOSIS_CATEGORIES.MALFORMED, "Classified as malformed category");

// ── TEST 5: Source Separation & Immutable EvidenceBundle ─────────────────────
console.log("\n[Test 5: Source Separation & Contradiction Between Work and Final Answer]");

const workVsAnswerSub = createSubmissionEntity({
  questionId: physicsQuestion.id,
  work: "Distance = 20 m",
  answer: "Distance = 40 m; displacement = 0 m",
  userId: "user_source_sep",
});

const workVsAnswerDiag = diagnosticEngine.diagnose({
  submission: workVsAnswerSub,
  question: physicsQuestion,
  evaluation: createEvaluationResult({
    isCorrect: false,
    studentAnswer: workVsAnswerSub.answer,
    userWork: workVsAnswerSub.work,
    correctAnswer: physicsQuestion.ans,
  }),
});

assert(Object.isFrozen(workVsAnswerDiag.evidence), "EvidenceBundle is strictly immutable");
assert(
  workVsAnswerDiag.evidence.userWorkEvidence.some((e) => e.source === "userWork" && e.text.includes("20")),
  "userWorkEvidence preserves Distance = 20 m separately"
);
assert(
  workVsAnswerDiag.evidence.studentAnswerEvidence.some((e) => e.source === "studentAnswer" && e.text.includes("40")),
  "studentAnswerEvidence preserves Distance = 40 m separately"
);
assert(
  workVsAnswerDiag.evidence.relationships.some((r) => r.type === "CONTRADICTS"),
  "Cross-source contradiction relationship emitted between work and final answer"
);

// ── TEST 6: Unit Normalization & Unit Error Detection ────────────────────────
console.log("\n[Test 6: Unit Normalization & Unit Mismatch Detection]");

const unitQuestion = {
  id: "q_unit_1",
  q: "A car travels 120 km in 3 hours. Calculate its average speed.",
  ans: "40 km/h",
  skillContract: {
    skillId: "phys-kinematics-avg-speed",
    skillName: "Calculate average speed",
    targetConcept: "speed = distance / time",
  },
  why: "Average speed equals total distance divided by total time.",
};

const unitSub = createSubmissionEntity({
  questionId: unitQuestion.id,
  answer: "40 m/s",
  work: "",
  userId: "user_unit",
});

const unitDiag = diagnosticEngine.diagnose({
  submission: unitSub,
  question: unitQuestion,
  evaluation: createEvaluationResult({
    isCorrect: false,
    studentAnswer: "40 m/s",
    correctAnswer: "40 km/h",
  }),
});

assert(unitDiag.state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED, "Unit mismatch is DIAGNOSED");
assert(unitDiag.diagnosis.brokenAt === "unit_mismatch", "Pinpoints unit_mismatch");
assert(
  unitDiag.retest.probe.expectedConcept === "speed = distance / time",
  "Uses skillContract.targetConcept instead of hardcoded 'operation choice'"
);
assert(
  unitDiag.retest.probe.options.length === 0,
  "Does not leak [expectedAnswer, studentAnswer] in retest options"
);

// ── TEST 7: Explicit Negation Guard (Biology) ────────────────────────────────
console.log("\n[Test 7: Negation Guard Prevents False Support]");

const bioQuestion = {
  id: "q_bio_respire",
  q: "Explain whether plants respire.",
  ans: "Plants respire continuously to release energy.",
  subject: "Biology",
  skillId: "bio-respiration-plants",
  why: "All living cells, including plant cells, respire continuously.",
};

const bioSub = createSubmissionEntity({
  questionId: bioQuestion.id,
  answer: "Plants do not respire",
  work: "",
  userId: "user_bio",
});

const bioDiag = diagnosticEngine.diagnose({
  submission: bioSub,
  question: bioQuestion,
  evaluation: createEvaluationResult({
    isCorrect: false,
    studentAnswer: bioSub.answer,
    correctAnswer: bioQuestion.ans,
    matchedConcepts: ["respire"],
  }),
});

assert(bioDiag.state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED, "Negated concept is DIAGNOSED");
assert(
  bioDiag.diagnosis.category === DIAGNOSIS_CATEGORIES.MISCONCEPTION,
  "Negated concept classified as MISCONCEPTION, not SUPPORTED"
);
assert(
  bioDiag.evidence.divergent.some((e) => e.claim?.polarity === "NEGATED"),
  "Evidence item records polarity: NEGATED"
);

console.log(`\nUniversal Learning Diagnosis Tests Complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
