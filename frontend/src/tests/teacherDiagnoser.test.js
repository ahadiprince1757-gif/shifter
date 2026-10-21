import { describe, it, expect } from "vitest";
import {
  diagnoseStudentSubmission,
  parseNumericWithUnit,
} from "../diagnostics/teacherDiagnoser.js";

describe("Tixar Deterministic Teacher Diagnostic Engine", () => {
  const avgSpeedQuestion = {
    q: "A car travels 50 km in 1 hour and 70 km in 2 hours. Find its average speed.",
    hint: "Find total distance and total time first.",
    steps: [
      "Total distance = 50 + 70 = 120 km.",
      "Total time = 1 + 2 = 3 h.",
      "Average speed = 120 ÷ 3.",
      "Average speed = 40 km/h.",
    ],
    ans: "40 km/h",
    why: "Average speed uses the total distance and total time for the whole journey.",
  };

  describe("Numeric and Unit Parsing", () => {
    it("parses numbers with units correctly", () => {
      expect(parseNumericWithUnit("42.5 km/h")).toEqual({
        value: 42.5,
        unit: "km/h",
        raw: "42.5 km/h",
      });
      expect(parseNumericWithUnit("40")).toEqual({
        value: 40,
        unit: null,
        raw: "40",
      });
      expect(parseNumericWithUnit("  120km  ")).toEqual({
        value: 120,
        unit: "km",
        raw: "120km",
      });
    });
  });

  describe("Average Speed Journey Diagnoses", () => {
    it("diagnoses speed averaging trap (42.5 km/h)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "42.5 km/h",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("speed_averaging_trap");
      expect(result.evidence.confidence).toBe("high");
      expect(result.whatYouDid).toContain("50 km/h and 35 km/h");
      expect(result.whatYouDid).toContain("averaged them");
      expect(result.whyThisIsWrong.length).toBeGreaterThan(0);
      expect(result.theRightWay).toEqual(avgSpeedQuestion.steps);
      expect(result.remember).toContain("Average speed = Total distance ÷ Total time");
    });

    it("diagnoses speed averaging trap from working even if answer has slight formatting differences", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "42.5",
        userWork: "(50 + 35) / 2 = 42.5",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("speed_averaging_trap");
    });

    it("diagnoses single leg calculation (50 km/h)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "50 km/h",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("single_leg_calculation");
      expect(result.whatYouDid).toContain("first part of the journey");
    });

    it("diagnoses single leg calculation for second leg (35 km/h)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "35 km/h",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("single_leg_calculation");
      expect(result.whatYouDid).toContain("second part of the journey");
    });

    it("diagnoses dividing by stage count instead of total time (60 km/h)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "60 km/h",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("divided_by_stage_count");
      expect(result.whatYouDid).toContain("divided by 2 (the number of stages)");
    });

    it("diagnoses incomplete calculation when student stops at total distance (120 km)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "120 km",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("incomplete_journey_calculation");
      expect(result.whatYouDid).toContain("calculated the total distance");
    });
  });

  describe("Unit Diagnoses", () => {
    it("diagnoses omitted unit when numeric value is correct (40)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "40",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("unit_omitted");
      expect(result.whatYouDid).toContain("did not specify the unit of measurement");
      expect(result.remember).toContain("Always write the appropriate unit");
    });

    it("diagnoses unit mismatch when numeric value is correct but unit is wrong (40 m/s)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "40 m/s",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("unit_mismatch");
      expect(result.whatYouDid).toContain("used the unit 'm/s' instead of 'km/h'");
    });
  });

  describe("Correct Answers and Inconclusive Graceful Uncertainty", () => {
    it("handles correct answers gracefully", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "40 km/h",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: true,
      });

      expect(result.status).toBe("correct");
      expect(result.errorType).toBeNull();
      expect(result.evidence.confidence).toBe("high");
    });

    it("returns inconclusive when an arbitrary wrong number is given with no evidence (e.g. 17)", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "17",
        userWork: "",
        question: avgSpeedQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("inconclusive");
      expect(result.errorType).toBe("unclassified_deviation");
      expect(result.evidence.confidence).toBe("low");
      expect(result.whatYouDid).toContain('You provided the answer "17"');
      // Must not falsely claim they averaged speeds or anything unverified!
      expect(result.whatYouDid).not.toContain("speed");
      expect(result.whatYouDid).not.toContain("averaged");
    });
  });

  describe("Step-by-Step Algebraic Reasoning and Reconstructed Working", () => {
    const linearEqQuestion = {
      q: "Solve 3x - 5 = 16",
      ans: "7",
      steps: [
        "3x - 5 = 16",
        "3x = 16 + 5",
        "3x = 21",
        "x = 7",
      ],
      why: "Add 5 to both sides to cancel -5, then divide both sides by 3.",
    };

    it("diagnoses sign reversal error in linear equation with full student working", () => {
      const studentWork = [
        "3x - 5 = 16",
        "3x = 16 - 5",
        "3x = 11",
        "x = 11/3",
      ].join("\n");

      const result = diagnoseStudentSubmission({
        studentAnswer: "11/3",
        userWork: studentWork,
        question: linearEqQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("sign_reversal_in_equation");
      expect(result.stepAnalysis).toBeDefined();

      // 1. What You Did Right
      expect(result.stepAnalysis.whatYouDidRight.length).toBeGreaterThan(0);
      expect(result.stepAnalysis.whatYouDidRight[0]).toContain("isolate x");

      // 2. Where Working Broke Down
      expect(result.stepAnalysis.whereYourWorkingBrokeDown.studentStep).toContain("3x = 16 - 5");
      expect(result.stepAnalysis.whereYourWorkingBrokeDown.explanation).toContain("subtract 5");

      // 3. Corrected Working using student's work
      expect(result.stepAnalysis.correctedWorking.length).toBeGreaterThanOrEqual(4);
      const correctedStep = result.stepAnalysis.correctedWorking.find((s) => s.status === "corrected");
      expect(correctedStep).toBeDefined();
      expect(correctedStep.step).toContain("3x = 16 + 5");

      // 4. Thinking Strategy Repair
      expect(result.stepAnalysis.thinkingRepair.strategy).toContain("What operation cancels");
    });

    it("diagnoses sign reversal from answer alone when student subtracts instead of adding", () => {
      const result = diagnoseStudentSubmission({
        studentAnswer: "11/3",
        userWork: "",
        question: linearEqQuestion,
        isAnswerCorrect: false,
      });

      expect(result.status).toBe("diagnosed");
      expect(result.errorType).toBe("sign_reversal_in_equation");
      expect(result.stepAnalysis.whereYourWorkingBrokeDown.studentStep).toContain("3x = 16 - 5");
    });
  });
});
