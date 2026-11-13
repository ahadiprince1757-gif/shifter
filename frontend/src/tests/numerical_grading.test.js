import { describe, it, expect } from "vitest";
import { evaluateAnswer } from "../utils/grader.js";

describe("Tixar Grader — Numerical and Quantitative Grading Regression Suite", () => {
  const speedQuestion = {
    q: "A cyclist travels 40 km in 2 hours and 20 km in 1 hour. Find the average speed.",
    ans: "20 km/h",
    type: "text",
    steps: [
      "Step 1: Total distance = 40 + 20 = 60 km.",
      "Step 2: Total time = 2 + 1 = 3 h.",
      "Step 3: Average speed = 60 ÷ 3.",
      "Step 4: Average speed = 20 km/h."
    ],
    why: "Average speed is total distance divided by total time.",
    sol: "Step 1: Total distance = 40 + 20 = 60 km.\nStep 2: Total time = 2 + 1 = 3 h.\nStep 3: Average speed = 60 ÷ 3.\nStep 4: Average speed = 20 km/h.",
  };

  it("rejects wrong final number even when phrasing/working mentions average speed and km/h", () => {
    const res = evaluateAnswer("Step 4: Average speed = 40 km/h.", speedQuestion);
    expect(res.isCorrect).toBe(false);
    expect(res.acceptedAlternative).toBe(false);
    expect(res.shouldRecordMistake).toBe(true);
  });

  it("rejects 'Average speed = 40 km/h' when expected is '20 km/h'", () => {
    const res = evaluateAnswer("Average speed = 40 km/h", speedQuestion);
    expect(res.isCorrect).toBe(false);
    expect(res.acceptedAlternative).toBe(false);
    expect(res.shouldRecordMistake).toBe(true);
  });

  it("accepts 'Step 4: Average speed = 20 km/h.' as correct", () => {
    const res = evaluateAnswer("Step 4: Average speed = 20 km/h.", speedQuestion);
    expect(res.isCorrect).toBe(true);
  });

  it("accepts 'Average speed = 20 km/h' as correct", () => {
    const res = evaluateAnswer("Average speed = 20 km/h", speedQuestion);
    expect(res.isCorrect).toBe(true);
  });

  it("accepts equivalent expanded unit '20 kilometres per hour' as correct", () => {
    const res = evaluateAnswer("20 kilometres per hour", speedQuestion);
    expect(res.isCorrect).toBe(true);
  });

  it("accepts number words in 'The speed is twenty km/h' as correct", () => {
    const res = evaluateAnswer("The speed is twenty km/h", speedQuestion);
    expect(res.isCorrect).toBe(true);
  });

  it("rejects correct conceptual explanation with wrong final number from being marked correct", () => {
    const res = evaluateAnswer(
      "Total distance is 60 km and total time is 3 hours so average speed is 40 km/h",
      speedQuestion
    );
    expect(res.isCorrect).toBe(false);
    expect(res.acceptedAlternative).toBe(false);
  });
});
