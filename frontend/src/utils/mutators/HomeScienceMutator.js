/**
 * Home Science Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Nutrition & Meal Planning Case Study
 * - Mode 2: Hygiene & First Aid Scenario
 * - Mode 3: Textile & Clothing Maintenance Check
 * - Mode 4: Cloze Home Management Completion
 */

const HS_SCENARIOS = [
  {
    keywords: ["nutrient", "vitamin", "protein", "carbohydrate", "mineral", "diet", "food", "child"],
    gen: () => {
      const cases = [
        {
          scenario: "A growing child presents with swollen limbs, thin hair, and slow growth. The doctor diagnoses Kwashiorkor. Which food group should be increased immediately in the child's daily diet?",
          ans: "Proteins (e.g. eggs, milk, fish, beans)",
          hint: "Kwashiorkor is a protein-deficiency disease",
          why: "Kwashiorkor is caused by severe protein deficiency during growth stages. Adding protein-dense foods repairs tissues and restores growth.",
          steps: ["Step 1: Identify nutritional deficiency disease (Kwashiorkor)", "Step 2: Match disease to missing nutrient (Protein)", "Step 3: Recommend protein-rich food sources"]
        },
        {
          scenario: "A patient complains of bleeding gums and slow wound healing. The doctor suspects Scurvy. Which nutrient rich in citrus fruits should be prescribed?",
          ans: "Vitamin C (Ascorbic Acid)",
          hint: "Found in oranges, lemons, and guavas",
          why: "Vitamin C is essential for collagen synthesis and tissue repair; deficiency causes Scurvy.",
          steps: ["Step 1: Identify symptoms (bleeding gums, Scurvy)", "Step 2: Match to Vitamin C deficiency", "Step 3: Recommend Vitamin C intake"]
        }
      ];
      const selected = cases[Math.floor(Math.random() * cases.length)];
      return {
        q: `[Nutrition Case Study] ${selected.scenario}`,
        ans: selected.ans,
        hint: selected.hint,
        why: selected.why,
        sol: selected.why,
        steps: selected.steps
      };
    }
  }
];

export class HomeScienceMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Scenario Match
    const match = HS_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Home Science Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.why || `Full concept: ${qObj.ans}`,
          steps: ["Step 1: Read statement context", "Step 2: Identify missing home science term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[Practical Home Science Check] Regarding "${qObj.q || qObj.stem}": What practical home management or hygiene rule applies?`,
      hint: qObj.hint || "Apply practical nutrition, hygiene, or textile knowledge",
      steps: ["Step 1: Identify practical scenario", "Step 2: Recall home science principle", "Step 3: State conclusion"]
    };
  }
}
