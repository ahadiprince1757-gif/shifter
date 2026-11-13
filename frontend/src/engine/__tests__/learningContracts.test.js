import { describe, it, expect } from "vitest";
import {
  normalizeStrictBoolean,
  createDiagnosisResult,
  createRepairPlanResult,
  createVerificationResult,
  createMemoryUpdateResult,
  createLearningResult,
} from "../learningContracts.js";

describe("Tixar Canonical Learning Contracts", () => {
  it("normalizes booleans strictly without JavaScript string coercion bugs", () => {
    expect(normalizeStrictBoolean(true)).toBe(true);
    expect(normalizeStrictBoolean(false)).toBe(false);
    expect(normalizeStrictBoolean("true")).toBe(true);
    expect(normalizeStrictBoolean("false")).toBe(false);
    expect(normalizeStrictBoolean("FALSE")).toBe(false);
    expect(normalizeStrictBoolean("0")).toBe(false);
    expect(normalizeStrictBoolean(0)).toBe(false);
    expect(normalizeStrictBoolean(1)).toBe(true);
  });

  it("freezes LearningResult instances and nested properties", () => {
    const result = createLearningResult({
      studentAnswer: "14",
      correctAnswer: "11",
      isCorrect: "false", // string 'false' must become boolean false
      diagnosis: {
        type: "MISCONCEPTION",
        category: "CONCEPTUAL",
        skillId: "multiplication_before_addition",
        confidence: 0.95,
        explanation: "Added before multiplying",
      },
      repairPlan: {
        repairTarget: "multiplication_before_addition",
        repairMode: "ISOLATE",
        targetDifficulty: 1,
      },
    });

    expect(result.evaluation.isCorrect).toBe(false);
    expect(result.diagnosis.skillId).toBe("multiplication_before_addition");
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.evaluation)).toBe(true);
    expect(Object.isFrozen(result.diagnosis)).toBe(true);
    expect(Object.isFrozen(result.repairPlan)).toBe(true);

    // Mutation should throw in strict mode / fail
    expect(() => {
      result.evaluation.isCorrect = true;
    }).toThrow();
  });
});
