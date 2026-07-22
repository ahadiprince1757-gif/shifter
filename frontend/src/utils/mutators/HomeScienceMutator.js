/**
 * Home Science Subject Mutator
 * Handles nutrition, hygiene, clothing, cooking, and home management.
 */

const HS_TEMPLATES = [
  {
    keywords: ["nutrient", "vitamin", "protein", "carbohydrate", "mineral", "diet", "food"],
    gen: () => {
      const nutrients = [
        { name: "Proteins", function: "body building and repair of worn-out tissues", source: "meat, beans, eggs, fish" },
        { name: "Carbohydrates", function: "providing energy for body activities", source: "rice, bread, potatoes, maize" },
        { name: "Vitamins", function: "protecting the body against diseases", source: "fruits and vegetables" },
        { name: "Fats and Oils", function: "providing concentrated energy and insulation", source: "butter, cooking oil, nuts" },
        { name: "Minerals (Iron)", function: "formation of haemoglobin in blood", source: "liver, spinach, red meat" }
      ];
      const n = nutrients[Math.floor(Math.random() * nutrients.length)];
      const askFunction = Math.random() > 0.5;

      return askFunction ? {
        q: `What is the main function of ${n.name} in the body?`,
        ans: n.function.charAt(0).toUpperCase() + n.function.slice(1),
        hint: `Found in ${n.source}`,
        why: `${n.name} are important for ${n.function}. Good sources include ${n.source}.`,
        sol: `${n.name} are important for ${n.function}. Good sources include ${n.source}.`,
        steps: ["Step 1: Identify the nutrient class", "Step 2: Recall its role in the body", "Step 3: State the function clearly"]
      } : {
        q: `Name two food sources rich in ${n.name}.`,
        ans: n.source,
        hint: `These foods help in ${n.function}`,
        why: `${n.name} are found in ${n.source}. They help in ${n.function}.`,
        sol: `${n.name} are found in ${n.source}. They help in ${n.function}.`,
        steps: ["Step 1: Identify nutrient category", "Step 2: Recall dietary sources", "Step 3: Name at least two sources"]
      };
    }
  },
  {
    keywords: ["hygiene", "clean", "sanitation", "wash", "germ", "bacteria"],
    gen: () => {
      const scenarios = [
        {
          q: "State two reasons why personal hygiene is important.",
          ans: "It prevents diseases and improves self-esteem/confidence.",
          hint: "Health and social reasons"
        },
        {
          q: "Explain the correct procedure for hand washing.",
          ans: "Wet hands, apply soap, rub palms and between fingers for 20 seconds, rinse under clean water, dry with a clean towel.",
          hint: "Think about the WHO steps"
        }
      ];
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      return {
        ...s,
        why: s.ans,
        sol: s.ans,
        steps: ["Step 1: Understand the hygiene concept", "Step 2: Recall key steps/reasons", "Step 3: State answer clearly"]
      };
    }
  }
];

export class HomeScienceMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of HS_TEMPLATES) {
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
          q: `Complete: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Key word starts with '${target.charAt(0).toUpperCase()}'`,
          why: `Full answer: ${qObj.ans}`,
          sol: qObj.why || qObj.ans,
          steps: ["Step 1: Read the statement", "Step 2: Identify missing term", "Step 3: Fill in the blank"]
        };
      }
    }

    return {
      ...qObj,
      q: `[HOME SCIENCE RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Apply home science principles",
      steps: ["Step 1: Identify concept area", "Step 2: Recall practical knowledge", "Step 3: State answer"]
    };
  }
}
