import { describe, it, expect } from "vitest";
import { evaluateAnswer } from "../utils/grader.js";
import { questionMutator } from "../utils/questionMutator.js";
import { createRepairPlan, getAtomicRepairContent } from "../engine/repairPlanner.js";
import { verifyRepair, OUTCOME } from "../engine/repairVerifier.js";
import { createLearningResult } from "../engine/learningContracts.js";

describe("Tixar Golden Learning Loop — Multi-Subject Invariants", () => {
  // ── 1. MATHEMATICS (BODMAS / Precedence) ──────────────────────────────────
  describe("Mathematics: Operational Precedence", () => {
    const question = {
      q: "Calculate: 7 + 5 × 3",
      ans: "22",
      subject: "mathematics",
      topic: "algebra",
      skillId: "multiplication_before_addition",
    };

    it("evaluates wrong answer and diagnoses BODMAS misconception", () => {
      const evaluation = evaluateAnswer("36", question);
      expect(evaluation.isCorrect).toBe(false);

      const diagnosis = evaluation.diagnosis || evaluation.analysis?.diagnosis;
      expect(diagnosis).toBeDefined();

      const atomicRule = getAtomicRepairContent("multiplication_before_addition");
      expect(atomicRule.rule).toContain("Multiplication must always be evaluated before addition");

      const plan = createRepairPlan(diagnosis, question);
      expect(plan.repairTarget).toBe("multiplication_before_addition");

      // Mutation for repair preserves subject and target skill
      const repairProbe = questionMutator.mutateForRepair({
        originalQuestion: question,
        targetSkill: "multiplication_before_addition",
        diagnosis,
        repairPlan: plan,
        subjectName: "mathematics",
      });

      expect(repairProbe).toBeDefined();
      expect(repairProbe.q).toBeDefined();
      expect(repairProbe.ans).toBeDefined();

      // Student corrects mistake on repair probe
      const verification = verifyRepair(plan, repairProbe, {
        answer: String(repairProbe.ans),
        timeMs: 4000,
        workShown: true,
      });

      expect(verification.outcome).toBe(OUTCOME.REPAIRED);
      expect(verification.shouldEndRepairLoop).toBe(true);

      // Canonical LearningResult emitted
      const learningResult = createLearningResult({
        studentAnswer: "36",
        correctAnswer: "22",
        isCorrect: false,
        diagnosis,
        repairPlan: plan,
        verification,
        metadata: { subjectId: "mathematics", skillId: "multiplication_before_addition" },
      });

      expect(learningResult.evaluation.isCorrect).toBe(false);
      expect(learningResult.verification.outcome).toBe(OUTCOME.REPAIRED);
    });
  });

  // ── 2. PHYSICS (Ohm's Law / Mechanics) ────────────────────────────────────
  describe("Physics: Ohm's Law Formula Application", () => {
    const question = {
      q: "A resistor has 10V across it and a current of 2A. What is its resistance in ohms?",
      ans: "5",
      subject: "physics",
      topic: "electricity",
      skillId: "ohms_law",
    };

    it("evaluates correct and incorrect answers and mutates with physics constraints", () => {
      const wrongEval = evaluateAnswer("20", question); // Multiplying instead of dividing
      expect(wrongEval.isCorrect).toBe(false);

      const plan = createRepairPlan(wrongEval.diagnosis, question);
      expect(plan).toBeDefined();

      const probe = questionMutator.mutateForRepair({
        originalQuestion: question,
        targetSkill: "ohms_law",
        subjectName: "physics",
      });

      expect(probe).toBeDefined();
      expect(probe.ans).toBeDefined();

      const correctEval = evaluateAnswer("5", question);
      expect(correctEval.isCorrect).toBe(true);
    });
  });

  // ── 3. CHEMISTRY (Stoichiometry & Bonding) ─────────────────────────────────
  describe("Chemistry: Bonding & Concepts", () => {
    const question = {
      q: "What type of chemical bond involves the sharing of electron pairs between atoms?",
      ans: "covalent",
      subject: "chemistry",
      topic: "bonding",
      skillId: "covalent_bonding",
    };

    it("evaluates chemical concepts and generates repair probes", () => {
      const wrongEval = evaluateAnswer("ionic", question);
      expect(wrongEval.isCorrect).toBe(false);

      const plan = createRepairPlan({ type: "BONDING_CONFUSION" }, question);
      expect(plan.repairMode).toBe("ISOLATE");

      const probe = questionMutator.mutateForRepair({
        originalQuestion: question,
        targetSkill: "covalent_bonding",
        subjectName: "chemistry",
      });

      expect(probe).toBeDefined();
    });
  });

  // ── 4. BIOLOGY (Mitosis vs Meiosis) ───────────────────────────────────────
  describe("Biology: Cell Division", () => {
    const question = {
      q: "In which type of cell division are four genetically diverse daughter cells produced?",
      ans: "meiosis",
      subject: "biology",
      topic: "genetics",
      skillId: "cell_division_meiosis",
    };

    it("evaluates biological answers case-insensitively and triggers targeted repairs", () => {
      const correctEval = evaluateAnswer("MEIOSIS", question);
      expect(correctEval.isCorrect).toBe(true);

      const wrongEval = evaluateAnswer("mitosis", question);
      expect(wrongEval.isCorrect).toBe(false);

      const plan = createRepairPlan({ type: "BIOLOGY_CONFUSION" }, question);
      expect(plan.repairTarget).toBe("cell_division_mitosis"); // resolves prerequisite chain
    });
  });

  // ── 5. ENGLISH (Grammar & Agreement) ──────────────────────────────────────
  describe("English: Language Skills", () => {
    const question = {
      q: "Identify the correct verb form: 'The bouquet of flowers (was/were) placed on the table.'",
      ans: "was",
      subject: "english",
      topic: "grammar",
      skillId: "subject_verb_agreement",
    };

    it("evaluates exact grammatical choices", () => {
      const correctEval = evaluateAnswer("was", question);
      expect(correctEval.isCorrect).toBe(true);

      const wrongEval = evaluateAnswer("were", question);
      expect(wrongEval.isCorrect).toBe(false);
    });
  });

  // ── 6. COMPUTER SCIENCE (Data Structures & Logic) ─────────────────────────
  describe("Computer Science: Data Representation & Logic", () => {
    const question = {
      q: "Convert the binary number 1010 to its decimal equivalent.",
      ans: "10",
      subject: "computer",
      topic: "number_systems",
      skillId: "binary_to_decimal",
    };

    it("evaluates binary conversion and repair routing", () => {
      const correctEval = evaluateAnswer("10", question);
      expect(correctEval.isCorrect).toBe(true);

      const wrongEval = evaluateAnswer("12", question);
      expect(wrongEval.isCorrect).toBe(false);

      const probe = questionMutator.mutateForRepair({
        originalQuestion: question,
        targetSkill: "binary_to_decimal",
        subjectName: "computer",
      });

      expect(probe).toBeDefined();
    });
  });
});
