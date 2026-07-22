/**
 * Mathematics Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Real-World Application Word Problem
 * - Mode 2: Multi-Choice Calculation Challenge
 * - Mode 3: Formula Setup & Identification
 * - Mode 4: Numerical Randomization with Step-1 Scaffolding
 */

export class MathMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = qObj.q || qObj.stem || "";
    const lowerStem = stem.toLowerCase();

    // 1. Percentage / Financial Math Word Problem
    const amountMatch = stem.match(/(?:KSh|\$|€|£)\s*(\d+(?:,\d+)*(?:\.\d+)?)/i) || stem.match(/(\d+)\s*(?:shilling|ksh)/i);
    if (amountMatch) {
      const origVal = parseFloat(amountMatch[1].replace(/,/g, ""));
      const multiplier = (Math.floor(Math.random() * 6) + 2) / 2; // 1.0, 1.5, 2.0, 2.5, 3.0, 3.5
      const newVal = Math.round(origVal * multiplier);

      const names = ["Amani", "Kev", "Sarah", "Zawadi", "Otieno"];
      const selectedName = names[Math.floor(Math.random() * names.length)];

      const newStem = stem
        .replace(amountMatch[0], `KSh ${newVal.toLocaleString()}`)
        .replace(/a student|a trader|a company|a person/i, selectedName);
      
      let newAns = qObj.ans;
      if (typeof qObj.ans === "string" && !isNaN(parseFloat(qObj.ans.replace(/[^0-9.]/g, "")))) {
        const origAnsVal = parseFloat(qObj.ans.replace(/[^0-9.]/g, ""));
        const newAnsVal = Math.round(origAnsVal * multiplier);
        newAns = `KSh ${newAnsVal.toLocaleString()}`;
      }

      return {
        ...qObj,
        q: `[Scenario] ${newStem}`,
        ans: newAns,
        hint: qObj.hint || "Apply the mathematical formula using the updated figures.",
        why: `Values updated for ${selectedName}: KSh ${origVal.toLocaleString()} ➔ KSh ${newVal.toLocaleString()}.`,
        sol: `Recalculate using updated figure KSh ${newVal.toLocaleString()}.`,
        steps: [
          "Step 1: Identify given financial values",
          "Step 2: Set up mathematical equation",
          "Step 3: Perform arithmetic calculation"
        ]
      };
    }

    // 2. Generic Numeric Randomization
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      let mutatedStem = stem;
      const valMap = {};

      numbers.forEach((numStr) => {
        const val = parseFloat(numStr);
        if (val > 1900 && val < 2100) return; // Ignore years
        
        const delta = Math.floor(Math.random() * 6) + 1;
        const newVal = val > 10 ? val + delta * 2 : val + delta;
        valMap[numStr] = newVal;
        mutatedStem = mutatedStem.replace(numStr, String(newVal));
      });

      return {
        ...qObj,
        q: `[Numerical Practice] ${mutatedStem}`,
        ans: qObj.ans || "Calculate using updated numbers",
        hint: qObj.hint || "Carefully substitute the new numbers into the equation.",
        why: "Values have been randomized to verify formula understanding.",
        sol: qObj.explain || qObj.why || "Substitute updated numbers into formula.",
        steps: [
          "Step 1: Note the new numerical values in the question",
          "Step 2: State the formula",
          "Step 3: Calculate the final result"
        ]
      };
    }

    // 3. Fallback Step-by-Step Scaffold
    return {
      ...qObj,
      q: `[Step 1 Scaffold] Regarding "${stem}": What is the first mathematical step or formula required?`,
      ans: qObj.ans,
      hint: qObj.hint || "State the first step or governing formula",
      steps: [
        "Step 1: Identify given variables",
        "Step 2: Choose target formula",
        "Step 3: Solve equation"
      ]
    };
  }
}
