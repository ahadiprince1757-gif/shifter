/**
 * Agriculture Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Farm Management & Soil Science Case Study
 * - Mode 2: Crop & Livestock Disease Discrimination
 * - Mode 3: NPK Fertilizer & Nutrient Calculation
 * - Mode 4: Cloze Agricultural Best Practices Check
 */

const AGRI_SCENARIOS = [
  {
    keywords: ["soil", "loam", "clay", "sand", "humus", "erosion", "farm"],
    gen: () => {
      const cases = [
        {
          scenario: "A farmer in a dry region observes that rainwater drains away almost immediately, leaving crops wilted due to low water retention. What soil management practice should the farmer apply to improve organic matter and water holding capacity?",
          ans: "Adding compost / organic manure",
          hint: "Organic matter improves soil structure and water retention",
          why: "Adding organic manure increases humus content, improving water retention in coarse sandy soils.",
          steps: ["Step 1: Identify soil problem (poor water retention)", "Step 2: Relate organic matter to soil structure", "Step 3: Recommend organic manure addition"]
        },
        {
          scenario: "A farmer on a hilly slope notices topsoil being washed away during heavy rainfall. Which soil conservation method is best suited for steep slopes?",
          ans: "Terracing and planting cover crops",
          hint: "Steps cut into hillsides reduce runoff velocity",
          why: "Terracing reduces slope gradient, slowing down surface runoff and preventing soil erosion.",
          steps: ["Step 1: Identify slope erosion risk", "Step 2: Select slope conservation practice", "Step 3: Recommend terracing"]
        }
      ];
      const selected = cases[Math.floor(Math.random() * cases.length)];
      return {
        q: `[Farm Case Study] ${selected.scenario}`,
        ans: selected.ans,
        hint: selected.hint,
        why: selected.why,
        sol: selected.why,
        steps: selected.steps
      };
    }
  },
  {
    keywords: ["fertilizer", "manure", "nutrient", "nitrogen", "phosphorus", "potassium", "npk"],
    gen: () => {
      const nutrients = [
        { name: "Nitrogen (N)", role: "vegetative growth and leaf development", sign: "yellowing of lower leaves (chlorosis)" },
        { name: "Phosphorus (P)", role: "root development and early crop establishment", sign: "purple discoloration of leaf margins" },
        { name: "Potassium (K)", role: "disease resistance and stem strength", sign: "browning and scorching of leaf edges" }
      ];
      const n = nutrients[Math.floor(Math.random() * nutrients.length)];

      return {
        q: `[Crop Diagnostic Scenario] A maize crop exhibits ${n.sign}. Which essential soil nutrient is deficient in this field?`,
        ans: n.name,
        hint: `Essential for ${n.role}`,
        why: `Deficiency in ${n.name} causes ${n.sign} because it is needed for ${n.role}.`,
        sol: `Deficiency in ${n.name} causes ${n.sign} because it is needed for ${n.role}.`,
        steps: ["Step 1: Observe crop deficiency symptom", "Step 2: Match symptom to NPK nutrient", "Step 3: Diagnose missing element"],
        type: "mcq",
        options: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "Calcium (Ca)"]
      };
    }
  }
];

export class AgricultureMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Farm Case Study Match
    const match = AGRI_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 6) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Agricultural Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.why || `Full concept: ${qObj.ans}`,
          steps: ["Step 1: Read agricultural statement", "Step 2: Identify missing farming term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[Agronomic Application Check] Regarding "${qObj.q || qObj.stem}": What agronomic practice or soil principle applies here?`,
      hint: qObj.hint || "Recall crop husbandry and soil management rules",
      steps: ["Step 1: Identify crop/animal scenario", "Step 2: Recall farming principle", "Step 3: State answer"]
    };
  }
}
