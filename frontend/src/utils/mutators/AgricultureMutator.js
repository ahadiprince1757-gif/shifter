/**
 * Agriculture Subject Mutator
 * Handles crop production, animal husbandry, soil science, and farm management.
 */

const AGRI_TEMPLATES = [
  {
    keywords: ["soil", "loam", "clay", "sand", "humus", "erosion"],
    gen: () => {
      const soils = [
        { type: "Sandy soil", property: "large particles and drains water quickly", crop: "Carrots and groundnuts" },
        { type: "Clay soil", property: "fine particles and retains water", crop: "Rice and paddy crops" },
        { type: "Loam soil", property: "a balanced mixture of sand, silt, and clay", crop: "Most crops including maize and beans" }
      ];
      const s = soils[Math.floor(Math.random() * soils.length)];
      const isProperty = Math.random() > 0.5;

      return isProperty ? {
        q: `Which type of soil has ${s.property}?`,
        ans: s.type,
        hint: `Suitable for growing ${s.crop}`,
        why: `${s.type} is characterized by ${s.property}.`,
        sol: `${s.type} is characterized by ${s.property}.`,
        steps: ["Step 1: Identify soil characteristic described", "Step 2: Match to soil type", "Step 3: State soil name"],
        type: "mcq",
        options: ["Sandy soil", "Clay soil", "Loam soil", "Silt soil"]
      } : {
        q: `State one type of crop suitable for growing in ${s.type}.`,
        ans: s.crop,
        hint: `${s.type} has ${s.property}`,
        why: `${s.crop} grow well in ${s.type} because it has ${s.property}.`,
        sol: `${s.crop} grow well in ${s.type} because it has ${s.property}.`,
        steps: ["Step 1: Identify soil type", "Step 2: Recall water retention and drainage", "Step 3: Name suitable crop"]
      };
    }
  },
  {
    keywords: ["fertilizer", "manure", "nutrient", "nitrogen", "phosphorus", "potassium", "npk"],
    gen: () => {
      const nutrients = [
        { name: "Nitrogen (N)", role: "promotes leafy/vegetative growth", deficiency: "yellowing of leaves (chlorosis)" },
        { name: "Phosphorus (P)", role: "promotes root development and flowering", deficiency: "purple/reddish leaves" },
        { name: "Potassium (K)", role: "strengthens stems and disease resistance", deficiency: "brown scorching of leaf edges" }
      ];
      const n = nutrients[Math.floor(Math.random() * nutrients.length)];

      return {
        q: `In crop production, which primary nutrient ${n.role}?`,
        ans: n.name,
        hint: `Deficiency causes ${n.deficiency}`,
        why: `${n.name} is essential because it ${n.role}.`,
        sol: `${n.name} is essential because it ${n.role}.`,
        steps: ["Step 1: Identify plant growth function described", "Step 2: Match to NPK nutrient", "Step 3: State nutrient name"],
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

    for (const item of AGRI_TEMPLATES) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    // Cloze fallback
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 8) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const idx = Math.floor(words.length / 2);
        const target = words[idx];
        const masked = [...words];
        masked[idx] = "________";
        return {
          q: `Complete the agricultural concept: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Key term starts with '${target.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.why || qObj.ans,
          steps: ["Step 1: Read the statement", "Step 2: Identify missing agricultural term", "Step 3: Fill in the blank"]
        };
      }
    }

    return {
      ...qObj,
      q: `[AGRICULTURE RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Apply farming and crop science principles",
      steps: ["Step 1: Identify agricultural concept", "Step 2: Recall best practices", "Step 3: State answer"]
    };
  }
}
