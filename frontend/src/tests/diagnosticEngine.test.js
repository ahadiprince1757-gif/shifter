import { describe, it, expect } from "vitest";
import { diagnosticEngine } from "../diagnostics/engine/diagnosticEngine.js";
import { diagnoseStudentSubmission } from "../diagnostics/teacherDiagnoser.js";

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

      // Verify corrected solution produced by solutionBuilder
      expect(diagnosis.correction.verified).toBe(true);
      expect(diagnosis.correction.steps).toContain("3x + 5 = 20");
      expect(diagnosis.correction.steps).toContain("3x = 20 - 5");
      expect(diagnosis.correction.steps).toContain("3x = 15");
      expect(diagnosis.correction.steps).toContain("x = 5");
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
    it("pipes teacherDiagnosis directly into evaluateAnswer for FeedbackDisplay and TeacherFeedbackView", async () => {
      const { evaluateAnswer } = await import("../utils/grader.js");

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
});
