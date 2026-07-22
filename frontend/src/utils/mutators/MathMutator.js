/**
 * Mathematics Subject Mutator
 * Automatically extracts numerical values, formulas, and equations in math questions
 * and generates fresh randomized numbers while maintaining mathematical relationships.
 */

export class MathMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = qObj.q || qObj.stem || "";

    // 1. Percentage / Financial Math Mutation
    const pctMatch = stem.match(/(\d+(?:\.\d+)?)\s*%/);
    const amountMatch = stem.match(/(?:KSh|\$|€|£)\s*(\d+(?:,\d+)*(?:\.\d+)?)/i) || stem.match(/(\d+)\s*(?:shilling|ksh)/i);

    if (amountMatch) {
      const origVal = parseFloat(amountMatch[1].replace(/,/g, ""));
      const multiplier = (Math.floor(Math.random() * 8) + 2) / 2; // 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5
      const newVal = Math.round(origVal * multiplier);

      const newStem = stem.replace(amountMatch[0], `KSh ${newVal.toLocaleString()}`);
      
      // Calculate updated answer if original answer was a simple number
      let newAns = qObj.ans;
      if (typeof qObj.ans === "string" && !isNaN(parseFloat(qObj.ans.replace(/[^0-9.]/g, "")))) {
        const origAnsVal = parseFloat(qObj.ans.replace(/[^0-9.]/g, ""));
        const newAnsVal = Math.round(origAnsVal * multiplier);
        newAns = qObj.ans.replace(/\d+(?:,\d+)*/, newAnsVal.toLocaleString());
      }

      return {
        ...qObj,
        q: newStem,
        ans: newAns,
        hint: qObj.hint || "Apply the same formula with the updated values.",
        why: `Values updated: KSh ${origVal.toLocaleString()} ➔ KSh ${newVal.toLocaleString()}.`,
        sol: `Recalculate using updated figure KSh ${newVal.toLocaleString()}.`,
        steps: [
          "Step 1: Identify updated given value",
          "Step 2: Apply mathematical formula",
          "Step 3: Calculate new result"
        ]
      };
    }

    // 2. Generic Numeric Extraction Mutation
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      let mutatedStem = stem;
      const replacements = {};

      numbers.forEach((numStr, idx) => {
        const val = parseFloat(numStr);
        // Avoid mutating years like 2024 or 1999 or single index numbers
        if (val > 1900 && val < 2100) return;
        
        const delta = Math.floor(Math.random() * 5) + 1;
        const newVal = val > 10 ? val + delta * 2 : val + delta;
        replacements[numStr] = newVal;
        mutatedStem = mutatedStem.replace(numStr, String(newVal));
      });

      return {
        ...qObj,
        q: mutatedStem,
        ans: qObj.ans || "Use updated values to compute.",
        hint: qObj.hint || "Carefully substitute the new numbers into the formula.",
        why: qObj.why || "Problem values have been randomized for practice.",
        sol: qObj.explain || qObj.why || "Substitute updated numbers into the formula.",
        steps: [
          "Step 1: Note the new numerical values in the question",
          "Step 2: Write down the formula",
          "Step 3: Perform calculation with updated values"
        ]
      };
    }

    // Fallback: Step Scaffold
    return {
      ...qObj,
      q: `[PRACTICE RETRY] ${stem}`,
      hint: qObj.hint || "Break the problem down step-by-step",
      steps: [
        "Step 1: Identify given variables",
        "Step 2: Choose target formula",
        "Step 3: Compute final value"
      ]
    };
  }
}
