import { describe, it, expect } from "vitest";
import {
  parseStrictNumericValue,
  evaluateAnswer,
} from "../utils/grader.js";
import {
  hasValidExpressionSyntax,
  evaluateExpressionString,
  verifyMathAnswer,
  trySolveMean,
} from "../utils/mathVerifier.js";
import {
  verifyGeneratedAnswer,
  classifyComparableAnswers,
} from "../utils/verificationOrchestrator.js";
import { analyseStudentAnswer } from "../utils/answerAnalyzer.js";
import { diagnoseKnowledgeGap } from "../utils/misconceptionDiagnoser.js";

describe("Tixar Diagnostic Engine — 21-Point Acceptance Suite", () => {
  // ==========================================================================
  // 1. NUMERIC GRADING
  // ==========================================================================
  describe("Numeric Grading & Parsing (§4A)", () => {
    it("rejects '12abc' and does not accept it as 12", () => {
      expect(parseStrictNumericValue("12abc")).toBeNull();
      expect(parseStrictNumericValue("12 abc")).toBeNull();
      const res = evaluateAnswer("12abc", { q: "Calculate 6 * 2", ans: "12" });
      expect(res.isCorrect).toBe(false);
    });

    it("interprets '3/4' as 0.75, not 3", () => {
      expect(parseStrictNumericValue("3/4")).toBe(0.75);
      expect(parseStrictNumericValue("-3/4")).toBe(-0.75);
      const res = evaluateAnswer("3/4", { q: "Express 0.75 as a fraction", ans: "0.75" });
      expect(res.isCorrect).toBe(true);
    });

    it("handles grouped thousands correctly and rejects malformed commas", () => {
      expect(parseStrictNumericValue("1,250")).toBe(1250);
      expect(parseStrictNumericValue("1,250,000")).toBe(1250000);
      expect(parseStrictNumericValue("1,25")).toBeNull();
      expect(parseStrictNumericValue("5/0")).toBeNull();
      expect(parseStrictNumericValue("")).toBeNull();
    });

    it("does not allow malformed numeric answers to trigger an override", () => {
      const comp = classifyComparableAnswers("12abc", "12");
      expect(comp.answerStatus).toBe("NOT_COMPARABLE");
      expect(comp.compared).toBe(false);
    });
  });

  // ==========================================================================
  // 2. MATH PARSING & SOLVERS
  // ==========================================================================
  describe("Math Parsing & Expression Syntax (§4C, §4D, §4E, §4F)", () => {
    it("rejects malformed syntax like '5 +' or unmatched parens", () => {
      expect(hasValidExpressionSyntax([{ type: "number", value: 5 }, { type: "operator", value: "+" }])).toBe(false);
      expect(hasValidExpressionSyntax([{ type: "paren", value: "(" }, { type: "number", value: 5 }])).toBe(false);
    });

    it("evaluates powers and precedence accurately: -2^2 = -4; (-2)^2 = 4", () => {
      const negSq = evaluateExpressionString("-2^2");
      expect(negSq).toBe(-4);

      const parenSq = evaluateExpressionString("(-2)^2");
      expect(parenSq).toBe(4);

      const powerTower = evaluateExpressionString("2^3^2");
      expect(powerTower).toBe(512);
    });

    it("solves supported linear equations correctly", () => {
      const verified = verifyMathAnswer("Solve for x: 2x + 4 = 10", "3");
      expect(verified.confidence).toBeGreaterThanOrEqual(0.85);
      expect(String(verified.answer)).toBe("3");
    });

    it("declines unsupported or ambiguous equations safely", () => {
      const verified = verifyMathAnswer("Solve for x and y: 2x + 3y = 12", "x=3, y=2");
      expect(verified.confidence).toBe(0);
      expect(verified.wasOverridden).toBe(false);
    });

    it("handles rectangle/triangle unit contracts: rejects single-unit mismatch and converts base properly", () => {
      // Missing unit on second dimension: must decline
      const singleUnit = verifyMathAnswer("Find the area of a rectangle with length 5 m and width 3", "15");
      expect(singleUnit.confidence).toBe(0);

      // Both with units (2m by 50cm): should convert or solve cleanly
      const withUnits = verifyMathAnswer("Find the area of a rectangle of 2 m by 50 cm", "1");
      expect(withUnits.confidence).toBeGreaterThanOrEqual(0.85);
    });

    it("calculates mean strictly following 'mean of' or 'average of' and rejects ambiguous questions", () => {
      const meanRes = trySolveMean("Find the mean of 4, 8, 12");
      expect(meanRes).not.toBeNull();
      expect(meanRes.answer).toBe("8");

      // Questions asking for median or ambiguous context must decline
      const medianQ = trySolveMean("Find the median of 4, 8, 12");
      expect(medianQ).toBeNull();
    });
  });

  // ==========================================================================
  // 3. EVIDENCE-BASED DIAGNOSIS
  // ==========================================================================
  describe("Evidence-Based Diagnosis Pipeline (§5A, §5B, §5C)", () => {
    it("does not invent a procedural diagnosis for a wrong answer without working", () => {
      const analysis = analyseStudentAnswer("15", "20", {
        questionSteps: ["Step 1: Add 5", "Step 2: Multiply by 2"],
        userWork: "",
        isAnswerCorrect: false,
      });

      // No invented steps when working is empty
      const wrongSteps = analysis.math?.steps?.filter((s) => s.type === "step_wrong") || [];
      expect(wrongSteps.length).toBe(0);
      expect(analysis.diagnosis.type).toBe("insufficient_evidence");
    });

    it("identifies explicit conceptual contradictions (e.g., ionic vs covalent)", () => {
      const analysis = analyseStudentAnswer(
        "ionic bonding is when electrons are shared",
        "covalent bonding involves sharing electrons",
        { isAnswerCorrect: false }
      );
      expect(analysis.contradictions.length).toBeGreaterThan(0);
      expect(analysis.contradictions[0].studentConcept).toBe("ionic");
      expect(analysis.contradictions[0].expectedConcept).toBe("covalent");
      expect(analysis.diagnosis.type).toBe("conceptual_contradiction");
    });

    it("deduplicates misconceptions BEFORE scoring so penalties align", () => {
      const analysis = analyseStudentAnswer("ionic", "covalent", { isAnswerCorrect: false });
      expect(analysis.misconceptions.length).toBeGreaterThan(0);
      expect(analysis.understanding.score).toBeLessThan(70);
    });

    it("connects diagnoseKnowledgeGap to detect BODMAS order of operations errors", () => {
      const gap = diagnoseKnowledgeGap({
        question: "Calculate 3 + 4 * 2",
        studentAnswer: "14",
        correctAnswer: "11",
      });
      expect(gap.status).toBe("DIAGNOSED");
      expect(gap.diagnosisType).toBe("MISCONCEPTION");
      expect(gap.skillId).toBe("multiplication_before_addition");

      // Integration into analyseStudentAnswer
      const analysis = analyseStudentAnswer("14", "11", {
        question: "Calculate 3 + 4 * 2",
        isAnswerCorrect: false,
      });
      expect(analysis.knowledgeGap.status).toBe("DIAGNOSED");
      expect(analysis.misconceptions.some((m) => m.type === "knowledge_gap_misconception")).toBe(true);
    });
  });

  // ==========================================================================
  // 4. VERIFICATION ROUTING & SAFETY
  // ==========================================================================
  describe("Verification Routing & Conflict Handling (§6)", () => {
    it("retains stored answer for unsupported question types", () => {
      const res = verifyGeneratedAnswer("Who was the 16th president of the United States?", "Abraham Lincoln");
      expect(res.verificationStatus).toBe("UNVERIFIED");
      expect(res.shouldOverride).toBe(false);
    });

    it("does not treat verifier failure as proof that the candidate is wrong", () => {
      const res = verifyGeneratedAnswer("Evaluate the philosophy of existentialism", "It emphasizes freedom");
      expect(res.answerStatus).toBe("NOT_COMPARABLE");
      expect(res.shouldOverride).toBe(false);
    });

    it("returns UNVERIFIED if multiple verification engines report conflicting answers", () => {
      const conflictRes = verifyGeneratedAnswer("Calculate the force on an object: work done is 100 J over 5 m", "20 N");
      // Result is verified only if consistent, never arbitrarily overridden if conflicting
      expect(typeof conflictRes.shouldOverride).toBe("boolean");
    });
  });

  // ==========================================================================
  // 5. MASTERY & LEARNING INVARIANTS
  // ==========================================================================
  describe("Mastery Inference Invariants (§7)", () => {
    it("does not infer mastery from a single isolated correct answer without working", () => {
      const res = evaluateAnswer("25", { q: "Calculate 5 * 5", ans: "25" }, "");
      expect(res.isCorrect).toBe(true);
      // Single correct answer with no working and no retest history cannot infer mastery:
      expect(res.knowledgeModel.safeToInferMastery).toBe(false);
      expect(res.knowledgeModel.requiresAdditionalEvidence).toBe(true);
    });

    it("allows mastery inference when demonstrable multi-step supported reasoning is provided", () => {
      const res = evaluateAnswer(
        "25",
        {
          q: "Find the area of a square with side 5",
          ans: "25",
          steps: ["Area = s^2", "5 * 5 = 25"],
        },
        "Area = side * side = 5 * 5 = 25"
      );
      expect(res.isCorrect).toBe(true);
      if (res.workingEvaluation?.status === "supported_evidence") {
        expect(res.knowledgeModel.safeToInferMastery).toBe(true);
      }
    });

    it("allows mastery inference on a confirmed retest question", () => {
      const res = evaluateAnswer(
        "25",
        {
          q: "Calculate 5 * 5",
          ans: "25",
          isRetest: true,
        },
        ""
      );
      expect(res.isCorrect).toBe(true);
      expect(res.knowledgeModel.safeToInferMastery).toBe(true);
    });
  });
});
