import { describe, it, expect } from "vitest";
import { diagnosticEngine } from "../diagnostics/engine/diagnosticEngine.js";
import { diagnoseStudentSubmission } from "../diagnostics/teacherDiagnoser.js";
import { evaluateAnswer } from "../utils/grader.js";

describe("Tixar Local Pedagogical Diagnostic Engine (Zero External AI APIs)", () => {
  describe("Component 1: Input Intelligence & Gibberish Classification", () => {
    it("identifies keyboard mashing / gibberish without fabricating mathematical reasoning", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Which of the following is a natural number: -3, 0, 4, or 1/2?",
        correctAnswer: "4",
        studentAnswer: "kjhhgffddfghj",
        options: ["-3", "0", "4", "1/2"],
      });

      expect(diagnosis.status).toBe("unrecognized");
      expect(diagnosis.input.recognized).toBe(false);
      expect(diagnosis.confidence.level).toBe("unrecognized");
      expect(diagnosis.feedback.whatWentWrong).toContain(
        "could not be interpreted as a mathematical answer"
      );
      // Must NOT fabricate an incorrect arithmetic or speed claim!
      expect(diagnosis.feedback.whatWentWrong).not.toContain("speed");
      expect(diagnosis.feedback.whatWentWrong).not.toContain("You selected a fraction");
    });

    it("identifies blank submissions cleanly", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Solve 3x + 5 = 20",
        correctAnswer: "5",
        studentAnswer: "",
        userWork: "",
      });

      expect(diagnosis.status).toBe("blank");
      expect(diagnosis.input.recognized).toBe(false);
    });
  });

  describe("Component 2 & 4: Number Systems & Misconception Diagnosis", () => {
    const naturalNumQ = {
      q: "Which of the following is a natural number: -3, 0, 4, or 1/2?",
      ans: "4",
      options: ["-3", "0", "4", "1/2"],
    };

    it("diagnoses selecting -3 as negative integer confused with natural number", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        question: naturalNumQ,
        correctAnswer: "4",
        studentAnswer: "-3",
        options: naturalNumQ.options,
      });

      expect(diagnosis.status).toBe("diagnosed");
      expect(diagnosis.diagnosis.errorType).toBe("NEGATIVE_INTEGER_CONFUSED_WITH_NATURAL");
      expect(diagnosis.feedback.approach).toContain("-3");
      expect(diagnosis.feedback.whatWentWrong).toContain("integers");
      expect(diagnosis.feedback.whatWentWrong).toContain("cannot be negative");
      expect(diagnosis.feedback.ruleToRemember).toContain("{1, 2, 3, ...}");
    });

    it("diagnoses selecting 0 as zero/natural-number convention confusion", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        question: naturalNumQ,
        correctAnswer: "4",
        studentAnswer: "0",
        options: naturalNumQ.options,
        curriculum: { naturalNumbersIncludeZero: false },
      });

      expect(diagnosis.status).toBe("diagnosed");
      expect(diagnosis.diagnosis.errorType).toBe("ZERO_NATURAL_NUMBER_CONVENTION");
      expect(diagnosis.feedback.whatWentWrong).toContain("whole numbers");
      expect(diagnosis.feedback.ruleToRemember).toContain("Whole Numbers include zero");
    });

    it("diagnoses selecting 1/2 as fraction confused with natural number", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        question: naturalNumQ,
        correctAnswer: "4",
        studentAnswer: "1/2",
        options: naturalNumQ.options,
      });

      expect(diagnosis.status).toBe("diagnosed");
      expect(diagnosis.diagnosis.errorType).toBe("FRACTION_CONFUSED_WITH_NATURAL");
      expect(diagnosis.feedback.whatWentWrong).toContain("fraction");
      expect(diagnosis.feedback.whatWentWrong).toContain("rational numbers");
      expect(diagnosis.feedback.ruleToRemember).toContain("discrete whole counting numbers");
    });

    it("confirms 4 as correct candidate without false errors", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        question: naturalNumQ,
        correctAnswer: "4",
        studentAnswer: "4",
        options: naturalNumQ.options,
      });

      expect(diagnosis.status).toBe("correct");
      expect(diagnosis.result.correct).toBe(true);
      expect(diagnosis.diagnosis.errorType).toBeNull();
    });
  });

  describe("Component 3: Step-by-Step Reasoning & Error Localization", () => {
    it("traces 3x + 5 = 20, flags Step 2 as first error, marks Step 3 as propagated error", async () => {
      const userWork = [
        "3x + 5 = 20",
        "3x = 25",
        "x = 8.33",
      ].join("\n");

      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Solve 3x + 5 = 20",
        correctAnswer: "5",
        studentAnswer: "8.33",
        userWork,
      });

      expect(diagnosis.status).toBe("diagnosed");
      expect(diagnosis.diagnosis.firstErrorStep).toBe(2);
      expect(diagnosis.diagnosis.errorType).toBe("SIGN_REVERSAL_IN_ISOLATION");

      // Verify step trace
      expect(diagnosis.steps.length).toBe(3);
      expect(diagnosis.steps[0].status).toBe("valid"); // Step 1: 3x + 5 = 20
      expect(diagnosis.steps[1].status).toBe("first_error"); // Step 2: 3x = 25
      expect(diagnosis.steps[1].comment).toContain("added 5 instead of subtracting it");
      expect(diagnosis.steps[2].status).toBe("propagated_error"); // Step 3: x = 8.33
      expect(diagnosis.steps[2].comment).toContain("follows from the incorrect Step 2");

      // 10x Precision Separations: { evidence, transition, diagnosis }
      expect(diagnosis.steps[1].evidence).toBeDefined();
      expect(diagnosis.steps[1].evidence.raw).toBe("3x = 25");
      expect(diagnosis.steps[1].diagnosis.origin).toBe("ROOT");
      expect(diagnosis.steps[1].transition.inferredIntent.operation).toBe("SUBTRACT");
      expect(diagnosis.steps[1].transition.actualOperation.rhs).toBe("ADD_5");

      expect(diagnosis.steps[2].diagnosis.origin).toBe("PROPAGATED");
      expect(diagnosis.steps[2].diagnosis.causedByStep).toBe(2);

      // Targeted Probe, Repair & Retest
      expect(diagnosis.probe).toBeDefined();
      expect(diagnosis.probe.question).toContain("To isolate 3x in 3x + 5 = 20");
      expect(diagnosis.repair).toBeDefined();
      expect(diagnosis.repair.instruction).toContain("subtract 5 from BOTH sides");
      expect(diagnosis.retest).toBeDefined();
      expect(diagnosis.retest.required).toBe(true);
      expect(diagnosis.retest.question).toContain("Solve 4x + 6 = 26");

      // Verify corrected solution produced by solutionBuilder
      expect(diagnosis.correction.verified).toBe(true);
      expect(diagnosis.correction.steps).toContain("3x + 5 = 20");
      expect(diagnosis.correction.steps).toContain("3x = 20 - 5");
      expect(diagnosis.correction.steps).toContain("3x = 15");
      expect(diagnosis.correction.steps).toContain("x = 5");
    });

    it("marks textual follow-up statements as UNVERIFIED rather than manufacturing causality", async () => {
      const userWork = [
        "3x + 5 = 20",
        "3x = 25",
        "Therefore x is a large positive value",
      ].join("\n");

      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Solve 3x + 5 = 20",
        correctAnswer: "5",
        studentAnswer: "8.33",
        userWork,
      });

      expect(diagnosis.steps.length).toBe(3);
      expect(diagnosis.steps[1].status).toBe("first_error"); // Root divergence
      // Step 3 is a textual claim: must NOT be blindly labeled as mathematically proven propagated error
      expect(diagnosis.steps[2].status).toBe("unverified");
      expect(diagnosis.steps[2].statusLabel).toBe("Unverified");
      expect(diagnosis.steps[2].comment).toContain("Cannot independently verify mathematical causality");
    });
  });

  describe("Operational Precedence (BODMAS) & Fraction Misconceptions", () => {
    it("diagnoses left-to-right evaluation in BODMAS (7 + 5 × 3 = 36)", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Calculate: 7 + 5 × 3",
        correctAnswer: "22",
        studentAnswer: "36",
      });

      expect(diagnosis.status).toBe("diagnosed");
      expect(diagnosis.diagnosis.errorType).toBe("BODMAS_ADDITION_BEFORE_MULTIPLICATION");
      expect(diagnosis.feedback.whatWentWrong).toContain("multiplication must be evaluated before addition");
      expect(diagnosis.feedback.ruleToRemember).toContain("Multiplication and Division take priority");
    });

    it("diagnoses adding numerators and denominators straight across (1/2 + 1/3 = 2/5)", async () => {
      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Calculate 1/2 + 1/3",
        correctAnswer: "5/6",
        studentAnswer: "2/5",
      });

      expect(diagnosis.status).toBe("diagnosed");
      expect(diagnosis.diagnosis.errorType).toBe("FRACTION_ADD_DENOMINATORS");
      expect(diagnosis.feedback.approach).toContain("added numerators (1 + 1 = 2) and denominators (2 + 3 = 5)");
      expect(diagnosis.feedback.ruleToRemember).toContain("Never add denominators");
    });
  });

  describe("Backward Compatibility with diagnoseStudentSubmission", () => {
    it("diagnoses natural number distractors through diagnoseStudentSubmission entry point", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "-3",
        question: {
          q: "Which of the following is a natural number: -3, 0, 4, or 1/2?",
          ans: "4",
          options: ["-3", "0", "4", "1/2"],
        },
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("NEGATIVE_INTEGER_CONFUSED_WITH_NATURAL");
      expect(result.whyThisIsWrong[0]).toContain("cannot be negative");
    });

    it("diagnoses keyboard mash through diagnoseStudentSubmission entry point", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "kjhhgffddfghj",
        question: {
          q: "Which of the following is a natural number: -3, 0, 4, or 1/2?",
          ans: "4",
        },
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("unrecognized");
      expect(result.errorType).toBe("unrecognized_input");
      expect(result.whatYouDid).toContain("kjhhgffddfghj");
    });
  });

  describe("End-to-End Grader & Feedback View Integration", () => {
    it("pipes teacherDiagnosis directly into evaluateAnswer for FeedbackDisplay and TeacherFeedbackView", () => {
      // Test 1: Natural number distractor (-3)
      const res = evaluateAnswer("-3", {
        q: "Which of the following is a natural number: -3, 0, 4, or 1/2?",
        ans: "4",
        options: ["-3", "0", "4", "1/2"],
      });

      expect(res.isCorrect).toBe(false);
      expect(res.teacherDiagnosis).toBeDefined();
      expect(res.teacherDiagnosis.status).toBe("diagnosed");
      expect(res.teacherDiagnosis.errorType).toBe("NEGATIVE_INTEGER_CONFUSED_WITH_NATURAL");
      expect(res.teacherDiagnosis.whatYouDid).toContain("-3");
      expect(res.teacherDiagnosis.whyThisIsWrong.length).toBeGreaterThan(0);
      expect(res.teacherDiagnosis.remember).toContain("Natural numbers");

      // Test 2: Multi-step equation working (3x + 5 = 20)
      const userWork = ["3x + 5 = 20", "3x = 25", "x = 8.33"].join("\n");
      const eqRes = evaluateAnswer("8.33", {
        q: "Solve 3x + 5 = 20",
        ans: "5",
      }, userWork);

      expect(eqRes.isCorrect).toBe(false);
      expect(eqRes.teacherDiagnosis).toBeDefined();
      expect(eqRes.teacherDiagnosis.stepAnalysis).toBeDefined();
      expect(eqRes.teacherDiagnosis.stepAnalysis.whereYourWorkingBrokeDown.studentStep).toContain("3x = 25");
      expect(eqRes.teacherDiagnosis.stepAnalysis.whereYourWorkingBrokeDown.explanation).toContain("added 5 instead of subtracting it");
      expect(eqRes.teacherDiagnosis.stepAnalysis.correctedWorking.length).toBeGreaterThanOrEqual(3);

      // Test 3: Unrecognized keyboard mash
      const mashRes = evaluateAnswer("kjhhgffddfghj", {
        q: "Which of the following is a natural number: -3, 0, 4, or 1/2?",
        ans: "4",
      });

      expect(mashRes.isCorrect).toBe(false);
      expect(mashRes.teacherDiagnosis.status).toBe("unrecognized");
      expect(mashRes.teacherDiagnosis.errorType).toBe("unrecognized_input");
    });
  });

  describe("10× Precision: 4-Dimensional Epistemic Confidence Evaluator", () => {
    it("evaluates answer, error, cause, and repair confidence dimensions separately", async () => {
      const userWork = ["3x + 5 = 20", "3x = 25", "x = 8.33"].join("\n");
      const diagnosis = await diagnosticEngine.analyze({
        questionText: "Solve 3x + 5 = 20",
        correctAnswer: "5",
        studentAnswer: "8.33",
        userWork,
      });

      // 4 Dimensions of epistemic confidence
      expect(diagnosis.confidence.answer).toBeDefined();
      expect(diagnosis.confidence.answer.score).toBe(0); // Answer is false

      expect(diagnosis.confidence.error).toBeDefined();
      expect(diagnosis.confidence.error.score).toBeGreaterThanOrEqual(0.75); // Divergence verified
      expect(diagnosis.confidence.error.evidence).toContain("STUDENT_WORKING_PROVIDED");

      expect(diagnosis.confidence.cause).toBeDefined();
      expect(diagnosis.confidence.repair).toBeDefined();

      // Strategic decision state
      expect(diagnosis.confidence.decision).toBe("DIAGNOSE");
    });
  });

  describe("Cross-Disciplinary 10× Precision Pedagogical Diagnoses (Physics, Chem, Bio, Eng, Comp)", () => {
    it("diagnoses Physics mass vs weight confusion and provides invariance probe", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "Does the mass or weight of an object change when taken from Earth to the Moon?",
        correctAnswer: "Weight changes due to gravity, but mass remains constant.",
        studentAnswer: "Mass changes depending on gravity",
        question: { subject: "physics", chapter: "force", topic: "Gravity" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("DISTINCTION_CONFUSION");
      expect(res.diagnosis.rootCause).toBe("DISTINCTION_CONFUSION");
      expect(res.probe).toBeDefined();
      expect(res.probe.question).toContain("astronaut has a mass of 70 kg");
      expect(res.repair).toBeDefined();
      expect(res.repair.principle).toContain("Mass is intrinsic matter");
    });

    it("diagnoses Physics Ohm's law algebraic transposition (I = VR)", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "State Ohm's Law rearranged to calculate electric current (I) from voltage (V) and resistance (R).",
        correctAnswer: "I = V / R",
        studentAnswer: "I = VR",
        question: { subject: "physics", chapter: "electricity", topic: "Ohm's Law" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("FORMULA_SELECTION_ERROR");
      expect(res.whatYouDid).toContain("multiplied voltage and resistance");
      expect(res.theRightWay.join(" ")).toContain("I = V / R (Current)");
    });

    it("diagnoses Chemistry pH scale inversion (< 7 is acidic vs > 7)", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "How does the pH scale indicate acidity?",
        correctAnswer: "Solutions with pH below 7 are acidic.",
        studentAnswer: "Higher pH is more acidic",
        question: { subject: "chemistry", chapter: "acids_and_bases", topic: "pH scale" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("DISTINCTION_CONFUSION");
      expect(res.whyThisIsWrong[0]).toContain("pH scale is inversely related to hydrogen ion");
      expect(res.probe.correctAnswer).toBe("Solution with pH 2");
    });

    it("diagnoses Biology photosynthesis vs 24/7 cellular respiration", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "Explain when plant cells carry out respiration.",
        correctAnswer: "Plant cells respire continuously 24 hours a day.",
        studentAnswer: "Plants only respire at night",
        question: { subject: "biology", chapter: "energetics", topic: "Cellular Respiration" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("PROCESS_INVERSION");
      expect(res.remember).toContain("Plants respire all the time");
      expect(res.probe.options).toContain("Yes, all living plant cells respire continuously day and night");
    });

    it("diagnoses English subject-verb agreement with intervening prepositional phrase", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "The list of items (is/are) on the table.",
        correctAnswer: "is",
        studentAnswer: "are",
        question: { subject: "english", chapter: "grammar", topic: "Subject-Verb Agreement" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("SUBJECT_VERB_AGREEMENT");
      expect(res.whatYouDid).toContain("plural verb 'are'");
      expect(res.remember).toContain("Cross out the prepositional phrase");
    });

    it("diagnoses Computer Studies RAM vs ROM volatility reversal", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "Compare the volatility of computer RAM and ROM.",
        correctAnswer: "RAM is volatile memory; ROM is non-volatile.",
        studentAnswer: "RAM is permanent memory",
        question: { subject: "computer", chapter: "memory", topic: "RAM and ROM" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("VOLATILITY_CONFUSION");
      expect(res.remember).toContain("RAM forgets when power cuts off; ROM remembers forever");
      expect(res.probe.correctAnswer).toBe("ROM");
    });

    it("diagnoses Computer Studies bit to byte conversion factor error", async () => {
      const res = await diagnosticEngine.analyze({
        questionText: "How many bytes are in 32 bits?",
        correctAnswer: "4",
        studentAnswer: "256",
        question: { subject: "computer", chapter: "data_rep", topic: "Bits and Bytes" },
      });

      expect(res.status).toBe("diagnosed");
      expect(res.diagnosis.category).toBe("UNIT_BIT_BYTE_CONFUSION");
      expect(res.theRightWay.join(" ")).toContain("Bits -> Bytes : Divide by 8");
    });

    it("pipes cross-subject diagnosis into evaluateAnswer for non-math question", () => {
      const q = {
        q: "Explain when plant cells carry out respiration.",
        ans: "Plant cells respire continuously 24 hours a day.",
        subject: "biology",
        chapter: "energetics",
        topic: "Cellular Respiration",
      };

      const res = evaluateAnswer("Plants only respire at night", q);
      expect(res.isCorrect).toBe(false);
      expect(res.teacherDiagnosis).toBeDefined();
      expect(res.teacherDiagnosis.status).toBe("diagnosed");
      expect(res.teacherDiagnosis.remember).toContain("Plants respire all the time");
    });
  });
});
