/**
 * Business Studies & Economics Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Practical Business Case Study / Decision Scenario
 * - Mode 2: Multiple Choice Discrimination Challenge
 * - Mode 3: Financial Calculation & Percentage Mutator
 * - Mode 4: Factors of Production & Economic Systems Swap
 */

const BUSINESS_CASE_STUDIES = [
  {
    topic: "scarcity",
    keywords: ["scarcity", "wants", "choice", "resources"],
    scenario: "A bakery owner has KSh 50,000 in capital. They want to purchase a new oven costing KSh 40,000 and hire a delivery driver costing KSh 25,000. Explain the economic problem the bakery owner faces.",
    ans: "The owner faces scarcity (insufficient capital to afford both wants) and must make a choice based on priority.",
    hint: "Compare total wants (KSh 65,000) against available capital (KSh 50,000)",
    why: "Scarcity occurs because resources (money) are limited while business wants exceed available funds, forcing decision-making.",
    steps: ["Step 1: Calculate total cost of desired items (40,000 + 25,000 = 65,000)", "Step 2: Compare with available capital (50,000)", "Step 3: Identify deficit (15,000)", "Step 4: Conclude scarcity forces choice"]
  },
  {
    topic: "environment",
    keywords: ["environment", "tax", "inflation", "external", "internal", "government"],
    scenario: "The government introduces a 16% VAT on raw materials used by a furniture factory. Is this an internal or external business environment factor, and how does it affect profit?",
    ans: "External environment factor (uncontrollable); it increases production costs and reduces net profit.",
    hint: "Government tax laws come from outside the business",
    why: "Government fiscal policy is an uncontrollable external factor that raises operating costs.",
    steps: ["Step 1: Classify factor origin (Government = External)", "Step 2: Analyze cost impact (Raw materials cost rises)", "Step 3: Determine profit outcome (Profit decreases)"],
    type: "mcq",
    options: [
      "External environment factor; increases costs and reduces net profit",
      "Internal environment factor; increases management control",
      "External environment factor; increases profit margins",
      "Internal environment factor; reduces employee wages"
    ]
  }
];

export class BusinessMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();
    const mode = Math.floor(Math.random() * 4);

    // 1. Case Study Match
    const caseMatch = BUSINESS_CASE_STUDIES.find(c => c.keywords.some(kw => stem.includes(kw)));
    if (caseMatch) {
      return {
        q: caseMatch.scenario,
        ans: caseMatch.ans,
        hint: caseMatch.hint,
        why: caseMatch.why,
        sol: caseMatch.why,
        steps: caseMatch.steps,
        type: caseMatch.type || "text",
        options: caseMatch.options
      };
    }

    // 2. Financial Calculation Mutation
    const costMatch = stem.match(/ksh\s*(\d+(?:,\d+)*)/i) || stem.match(/(\d+)\s*(?:ksh|shilling)/i);
    if (costMatch) {
      const baseCost = (Math.floor(Math.random() * 15) + 5) * 1000; // 5,000 to 19,000
      const margin = (Math.floor(Math.random() * 6) + 2) * 500; // 1,000 to 3,500
      const sellingPrice = baseCost + margin;

      return {
        q: `[Financial Decision] A retail business buys goods for KSh ${baseCost.toLocaleString()} and sells them for KSh ${sellingPrice.toLocaleString()}. Calculate the net profit earned.`,
        ans: `KSh ${margin.toLocaleString()}`,
        hint: "Profit = Selling Price - Cost Price",
        why: `Profit = KSh ${sellingPrice.toLocaleString()} - KSh ${baseCost.toLocaleString()} = KSh ${margin.toLocaleString()}.`,
        sol: `Profit = Selling Price - Cost Price = KSh ${sellingPrice.toLocaleString()} - KSh ${baseCost.toLocaleString()} = KSh ${margin.toLocaleString()}.`,
        steps: ["Step 1: Write formula: Profit = Selling Price - Cost Price", "Step 2: Substitute values", "Step 3: Compute profit"]
      };
    }

    // 3. Cloze Concept Completion Mode
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 6) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Business Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Missing business term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Complete definition: ${qObj.ans}`,
          sol: qObj.why || `Complete definition: ${qObj.ans}`,
          steps: ["Step 1: Read statement context", "Step 2: Identify missing commercial term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 4. Fallback Business Application Mode
    return {
      q: `[Business Decision Check] Regarding ${qObj.q || qObj.stem}: How does this impact business operations or profitability?`,
      ans: qObj.ans,
      hint: qObj.hint || "Focus on profitability, risk, or resource allocation",
      why: qObj.why || qObj.ans,
      sol: qObj.why || qObj.ans,
      steps: ["Step 1: Analyze business principle", "Step 2: Evaluate impact on operations", "Step 3: Formulate answer"]
    };
  }
}
