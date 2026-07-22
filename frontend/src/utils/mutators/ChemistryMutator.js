/**
 * Chemistry Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Chemical Reaction & Lab Experiment Case Study
 * - Mode 2: Multiple Choice Chemical Discrimination
 * - Mode 3: Cloze Bonding & Periodic Concept Check
 * - Mode 4: Stoichiometric Value Randomization
 */

const CHEM_SCENARIOS = [
  {
    keywords: ["moles", "mass", "molar", "stoichiometry", "grams", "nacl"],
    gen: () => {
      const mass = (Math.floor(Math.random() * 30) + 2) * 5; // 10 to 150 g
      const molarMass = 58.44; // NaCl
      const moles = (mass / molarMass).toFixed(2);
      const d1 = (mass * molarMass).toFixed(2);
      const d2 = (molarMass / mass).toFixed(2);

      return {
        q: `[Lab Experiment] A student weighs out ${mass} g of pure Sodium Chloride (NaCl) in a beaker. Given the molar mass of NaCl is 58.44 g/mol, calculate how many moles of NaCl were measured.`,
        ans: `${moles} mol`,
        hint: "Formula: Moles = Mass (g) ÷ Molar Mass (g/mol)",
        why: `Moles = ${mass} g ÷ 58.44 g/mol = ${moles} mol.`,
        sol: `Moles = Mass (g) ÷ Molar Mass (g/mol) = ${mass} g ÷ 58.44 g/mol = ${moles} mol.`,
        steps: ["Step 1: Identify given mass (g) and molar mass (g/mol)", "Step 2: Apply formula: Moles = Mass ÷ Molar Mass", "Step 3: Compute moles to 2 decimal places"],
        type: "mcq",
        options: [`${moles} mol`, `${d1} mol`, `${d2} mol`, "1.00 mol"]
      };
    }
  },
  {
    keywords: ["acid", "base", "ph", "litmus", "neutralization"],
    gen: () => {
      const isAcid = Math.random() > 0.5;
      return {
        q: isAcid
          ? "[Indicator Test] A technician tests an unknown clear liquid with blue litmus paper and observes it turns bright red. What can be concluded about the solution?"
          : "[Indicator Test] A student adds phenolphthalein indicator to a solution of Sodium Hydroxide (NaOH). What color change indicates the presence of a base?",
        ans: isAcid ? "The solution is acidic (pH < 7)" : "The solution turns pink/magenta",
        hint: isAcid ? "Acids turn blue litmus red" : "Phenolphthalein turns pink in basic solutions",
        why: isAcid
          ? "Acidic solutions contain excess H+ ions which turn blue litmus paper red."
          : "Phenolphthalein is colorless in acid and turns pink/magenta in alkaline conditions (pH > 8.2).",
        sol: isAcid
          ? "Acidic solutions contain excess H+ ions which turn blue litmus paper red."
          : "Phenolphthalein is colorless in acid and turns pink/magenta in alkaline conditions.",
        steps: ["Step 1: Identify the chemical indicator used", "Step 2: Recall indicator reaction with acid/base", "Step 3: State conclusion"],
        type: "mcq",
        options: isAcid
          ? ["The solution is acidic (pH < 7)", "The solution is alkaline (pH > 7)", "The solution is neutral (pH = 7)", "The solution is pure water"]
          : ["The solution turns pink/magenta", "The solution turns dark blue", "The solution turns red", "The solution remains colorless"]
      };
    }
  }
];

export class ChemistryMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Lab Scenario Match
    const match = CHEM_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Concept Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Chemical Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Chemical term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full principle: ${qObj.ans}`,
          sol: qObj.why || `Full principle: ${qObj.ans}`,
          steps: ["Step 1: Read chemical statement", "Step 2: Identify missing element/term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[Chemical Application Check] Regarding "${qObj.q || qObj.stem}": What chemical principle governs this behavior?`,
      hint: qObj.hint || "Recall chemical laws and periodic trends",
      steps: ["Step 1: Identify reactants and products", "Step 2: Apply chemical laws", "Step 3: State final answer"]
    };
  }
}
