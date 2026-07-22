/**
 * Chemistry Subject Mutator
 * Handles Stoichiometry, Moles, Chemical Reactions, and Property identification.
 */

const CHEM_TEMPLATES = [
  {
    keywords: ["moles", "mass", "molar", "stoichiometry", "grams"],
    gen: () => {
      const mass = (Math.floor(Math.random() * 40) + 2) * 5; // 10 to 200 g
      const molarMass = 58.44; // NaCl
      const moles = (mass / molarMass).toFixed(2);
      const d1 = (mass * molarMass).toFixed(2);
      const d2 = (molarMass / mass).toFixed(2);

      return {
        q: `Calculate the number of moles in ${mass} g of Sodium Chloride (NaCl), given molar mass = 58.44 g/mol.`,
        ans: `${moles} mol`,
        hint: "Moles = Mass ÷ Molar Mass",
        why: `Moles = ${mass} g ÷ 58.44 g/mol = ${moles} mol.`,
        sol: `Moles = Mass ÷ Molar Mass = ${mass} g ÷ 58.44 g/mol = ${moles} mol.`,
        steps: ["Step 1: Write formula: Moles = Mass ÷ Molar Mass", "Step 2: Substitute given mass and molar mass", "Step 3: Compute moles to 2 decimal places"],
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
          ? "What color does blue litmus paper turn when dipped into an acidic solution?"
          : "What color does red litmus paper turn when dipped into an alkaline (basic) solution?",
        ans: isAcid ? "Red" : "Blue",
        hint: isAcid ? "Acids turn blue litmus..." : "Bases turn red litmus...",
        why: isAcid ? "Acids turn blue litmus red." : "Bases turn red litmus blue.",
        sol: isAcid ? "Acids turn blue litmus red." : "Bases turn red litmus blue.",
        steps: ["Step 1: Identify solution type (acidic/alkaline)", "Step 2: Recall indicator reaction", "Step 3: State color change"],
        type: "mcq",
        options: isAcid ? ["Red", "Blue", "Green", "Yellow"] : ["Blue", "Red", "Green", "Colorless"]
      };
    }
  }
];

export class ChemistryMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of CHEM_TEMPLATES) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    return {
      ...qObj,
      q: `[CHEMISTRY RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Recall chemical laws and stoichiometric ratios",
      steps: ["Step 1: Identify reactants and products", "Step 2: Balance or apply molar ratio", "Step 3: Solve for target quantity"]
    };
  }
}
