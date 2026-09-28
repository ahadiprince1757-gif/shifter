import { describe, it, expect } from "vitest";
import { evaluateAnswer } from "../utils/grader.js";

describe("Tixar Flexible & Evidence-Based Grader (Phase 1 + Phase 2)", () => {
  it("accepts exact matches", () => {
    const q = { q: "What is the powerhouse of the cell?", ans: "mitochondria" };
    const res = evaluateAnswer("mitochondria", q);
    expect(res.isCorrect).toBe(true);
    expect(res.grade).toBe("correct");
    expect(res.acceptedAlternative).toBe(false);
  });

  it("tolerates minor typos in subject terms via Damerau-Levenshtein", () => {
    const q1 = { q: "Name the green pigment in plants.", ans: "chlorophyll" };
    const res1 = evaluateAnswer("chlorophyl", q1);
    expect(res1.isCorrect).toBe(true);
    expect(res1.grade).toBe("correct");
    expect(res1.acceptedAlternative).toBe(true);

    const q2 = { q: "What is the powerhouse of the cell?", ans: "mitochondria" };
    const res2 = evaluateAnswer("mitocondria", q2);
    expect(res2.isCorrect).toBe(true);
    expect(res2.grade).toBe("correct");
  });

  it("does not allow typo matching on very short words to prevent false positives", () => {
    const q = { q: "Name the animal.", ans: "cat" };
    const res = evaluateAnswer("bat", q);
    expect(res.isCorrect).toBe(false);
    expect(res.grade).toBe("incorrect");
  });

  it("normalizes morphological variations (stemming)", () => {
    const q = {
      q: "Explain how roots take in water.",
      ans: "absorption of water",
    };
    const res = evaluateAnswer("absorbing water", q);
    expect(res.isCorrect).toBe(true);
    expect(res.grade).toBe("correct");
  });

  it("recognizes conservative concept clusters (synonyms)", () => {
    const q1 = {
      q: "What is a microscope?",
      ans: "an instrument used to magnify small specimens",
    };
    // Student says "device" instead of "instrument", "enlarge" instead of "magnify", "little" instead of "small"
    const res1 = evaluateAnswer("a device used to enlarge little specimens", q1);
    expect(res1.isCorrect).toBe(true);
    expect(res1.grade).toBe("correct");
    expect(res1.acceptedAlternative).toBe(true);
  });

  it("enforces negation protection (veto layer)", () => {
    const q = {
      q: "Do plants require light for photosynthesis?",
      ans: "plants need sunlight for photosynthesis",
    };
    // Student includes negation ("do not need")
    const res = evaluateAnswer("plants do not need sunlight for photosynthesis", q);
    expect(res.isCorrect).toBe(false);
    expect(res.grade).toBe("incorrect");
    expect(res.shouldRecordMistake).toBe(true);
    expect(res.answerEvaluation.method).toBe("negation_mismatch");
  });

  it("triggers the 'Almost There' partial credit state for partial concept coverage", () => {
    const q = {
      q: "What is a computer network?",
      ans: "interconnected computers that communicate and share resources",
    };
    // Student captures communicate and share but misses interconnected computers
    const res = evaluateAnswer("communicate and share", q);
    expect(res.isCorrect).toBe(false);
    expect(res.grade).toBe("partial");
    expect(res.partialCredit).toBe(true);
    expect(res.shouldRecordMistake).toBe(false);
    expect(res.mark).toBe("Almost There");
    expect(res.status).toBe("partially_correct");
    expect(res.missingConcepts.length).toBeGreaterThan(0);
  });

  it("marks completely wrong answers as incorrect with shouldRecordMistake: true", () => {
    const q = {
      q: "What is the powerhouse of the cell?",
      ans: "mitochondria",
    };
    const res = evaluateAnswer("ribosome", q);
    expect(res.isCorrect).toBe(false);
    expect(res.grade).toBe("incorrect");
    expect(res.partialCredit).toBe(false);
    expect(res.shouldRecordMistake).toBe(true);
  });

  it("preserves strict numeric and mathematical equivalence", () => {
    const q = { q: "What is 15 + 10?", ans: "25" };
    expect(evaluateAnswer("25", q).isCorrect).toBe(true);
    expect(evaluateAnswer("25.0", q).isCorrect).toBe(true);
    expect(evaluateAnswer("24", q).isCorrect).toBe(false);
  });
});
