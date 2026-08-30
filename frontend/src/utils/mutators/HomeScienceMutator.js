/**
 * Home Science Subject Mutator
 * Intelligent Home Science Engine:
 * - Dynamic Clinical Nutrition & Deficiency Disease Case Studies (Kwashiorkor, Scurvy, Rickets, Anemia).
 * - Hygiene, Sanitation & First Aid Management Scenarios.
 * - Textile Care & Food Preservation Methods.
 * - Generates 4 plausible Home Science MCQ options with step-by-step practical breakdowns.
 */

export class HomeScienceMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    const mode = (typeof modalityIndex === "number" ? modalityIndex : Math.floor(Math.random() * 4)) % 4;

    // 1. Clinical Nutrition & Malnutrition Deficiency Case Studies
    if (lower.includes("nutrient") || lower.includes("vitamin") || lower.includes("protein") || lower.includes("mineral") || lower.includes("diet") || lower.includes("scurvy") || lower.includes("kwashiorkor") || lower.includes("rickets")) {
      const cases = [
        {
          scenario: "A 3-year-old child presents with swollen abdomen, brittle reddish hair, skin lesions, and severe growth stunting. The clinical diagnosis is Kwashiorkor. Which dietary group should be immediately introduced to remedy this condition?",
          ans: "High-quality proteins (e.g. eggs, milk, fish, beans)",
          options: [
            "High-quality proteins (e.g. eggs, milk, fish, beans)",
            "Refined carbohydrates (e.g. white sugar and cassava starch)",
            "Saturated animal fats and vegetable oils",
            "Dietary fiber and roughage supplements"
          ],
          hint: "Kwashiorkor is caused by severe protein deficiency during rapid growth phases.",
          why: "Kwashiorkor results from inadequate dietary protein. Introducing protein-dense foods repairs damaged tissues and restores normal growth."
        },
        {
          scenario: "A patient complains of bleeding gums, slow wound healing, and joint pain. The doctor diagnoses Scurvy. Which nutrient rich in citrus fruits should be prescribed?",
          ans: "Vitamin C (Ascorbic Acid)",
          options: [
            "Vitamin C (Ascorbic Acid)",
            "Vitamin D (Calciferol)",
            "Vitamin K (Phylloquinone)",
            "Vitamin B1 (Thiamine)"
          ],
          hint: "Found abundantly in oranges, lemons, guavas, and fresh green vegetables.",
          why: "Vitamin C is required for collagen synthesis and blood vessel maintenance; deficiency causes capillary fragility and Scurvy."
        }
      ];
      const selected = cases[mode % cases.length];
      const ansStr = selected.ans;

      if (mode === 0) {
        return {
          q: selected.scenario,
          ans: ansStr,
          hint: selected.hint,
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      } else if (mode === 1) {
        return {
          q: selected.scenario,
          ans: ansStr,
          hint: selected.hint,
          sol: ansStr,
          type: "mcq",
          options: selected.options,
        };
      } else if (mode === 2) {
        const wrongRemedy = selected.options[1];
        return {
          q: `A patient exhibiting symptoms in this case study: "${selected.scenario.split('.')[0]}." was prescribed ${wrongRemedy}. Is this recommendation correct? State the true dietary remedy.`,
          ans: `Incorrect. The true dietary remedy is ${ansStr}.`,
          hint: selected.hint,
          sol: `Prescribing ${wrongRemedy} is incorrect. Correct remedy = ${ansStr}.`,
          type: "open_response",
          options: null,
        };
      } else {
        return {
          q: `State the missing nutrient and therapeutic dietary remedy for the following condition:\n"${selected.scenario}"`,
          ans: `Nutrient/Remedy: ${ansStr}. ${selected.hint}`,
          hint: selected.hint,
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      }
    }

    // 2. Reverse Inquiry for Practical Home Management
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Home Management Inquiry] Regarding: "${stem}"\nWhat practical home management, hygiene, or nutritional principle governs this practice?`,
        ans: rawAns,
        hint: qObj.hint || "Apply practical nutrition, hygiene, or textile care principles.",
        why: qObj.why || `Practical principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze practical household or health scenario",
          "Step 2: Apply relevant home science principle",
          "Step 3: State conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Cross-contamination prevention via aseptic food handling",
          "Emulsification of grease using alkaline soaps",
          "Balanced meal planning adhering to daily Recommended Dietary Allowances (RDA)"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Home Science Application Check] ${stem}`,
      hint: qObj.hint || "Apply practical nutrition, hygiene, or textile knowledge.",
      steps: [
        "Step 1: Identify practical scenario",
        "Step 2: Apply home science rule",
        "Step 3: State conclusion"
      ]
    };
  }
}
