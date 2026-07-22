/**
 * Business Studies & Economics Subject Mutator
 * Mutates financial calculations, scenario problems, factors of production,
 * and economic systems.
 */

const SCENARIOS = [
  {
    topic: "Profit & Loss Calculation",
    keywords: ["profit", "cost", "selling", "revenue", "ksh"],
    gen: () => {
      const cost = (Math.floor(Math.random() * 20) + 5) * 1000; // KSh 5,000 to 24,000
      const profitMargin = (Math.floor(Math.random() * 5) + 2) * 500; // KSh 1,000 to 3,500
      const selling = cost + profitMargin;
      return {
        q: `A trader purchases inventory at KSh ${cost.toLocaleString()} and sells it for KSh ${selling.toLocaleString()}. Calculate the net profit.`,
        ans: `KSh ${profitMargin.toLocaleString()}`,
        hint: "Profit = Selling Price - Cost Price",
        why: `Profit = KSh ${selling.toLocaleString()} - KSh ${cost.toLocaleString()} = KSh ${profitMargin.toLocaleString()}.`,
        sol: `Profit = Selling Price - Cost Price = KSh ${selling.toLocaleString()} - KSh ${cost.toLocaleString()} = KSh ${profitMargin.toLocaleString()}.`,
        steps: ["Step 1: Write formula: Profit = Selling Price - Cost Price", "Step 2: Substitute values", "Step 3: Subtract to get net profit"]
      };
    }
  },
  {
    topic: "Factors of Production",
    keywords: ["factor", "production", "land", "labour", "capital", "entrepreneur"],
    gen: () => {
      const factors = [
        { name: "Land", reward: "Rent", desc: "natural resources" },
        { name: "Labour", reward: "Wages / Salaries", desc: "human physical and mental effort" },
        { name: "Capital", reward: "Interest", desc: "man-made tools and machinery" },
        { name: "Entrepreneur", reward: "Profit", desc: "risk-taking and organization" }
      ];
      const selected = factors[Math.floor(Math.random() * factors.length)];
      const isRewardQ = Math.random() > 0.5;

      if (isRewardQ) {
        return {
          q: `What is the economic reward for the factor of production known as '${selected.name}'?`,
          ans: selected.reward,
          hint: `Think of what ${selected.name} earns`,
          why: `${selected.name} receives ${selected.reward} as its factor payment.`,
          sol: `${selected.name} receives ${selected.reward} as its factor payment.`,
          steps: ["Step 1: Identify factor of production", "Step 2: Recall factor payment/reward", "Step 3: State reward clearly"],
          type: "mcq",
          options: [selected.reward, "Rent", "Wages", "Profit", "Interest"].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4)
        };
      } else {
        return {
          q: `Which factor of production refers to ${selected.desc}?`,
          ans: selected.name,
          hint: `Earns ${selected.reward}`,
          why: `${selected.name} encompasses ${selected.desc}.`,
          sol: `${selected.name} encompasses ${selected.desc}.`,
          steps: ["Step 1: Read description of resource", "Step 2: Match to 4 factors of production", "Step 3: State factor name"],
          type: "mcq",
          options: ["Land", "Labour", "Capital", "Entrepreneur"]
        };
      }
    }
  },
  {
    topic: "Economic Systems",
    keywords: ["system", "capitalism", "socialism", "mixed", "ownership"],
    gen: () => {
      const systems = [
        { name: "Capitalism (Free Market)", feature: "private individuals driven by profit motive" },
        { name: "Socialism (Planned Economy)", feature: "the government for social welfare" },
        { name: "Mixed Economy", feature: "both private individuals and government" }
      ];
      const s = systems[Math.floor(Math.random() * systems.length)];
      return {
        q: `Which economic system is characterized by resource ownership by ${s.feature}?`,
        ans: s.name,
        hint: "Consider market forces vs government control",
        why: `${s.name} is defined by ownership by ${s.feature}.`,
        sol: `${s.name} is defined by ownership by ${s.feature}.`,
        steps: ["Step 1: Analyze resource ownership type", "Step 2: Compare economic systems", "Step 3: Select correct system"],
        type: "mcq",
        options: ["Capitalism (Free Market)", "Socialism (Planned Economy)", "Mixed Economy", "Traditional Economy"]
      };
    }
  }
];

export class BusinessMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of SCENARIOS) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    return {
      ...qObj,
      q: `[BUSINESS RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Relate question to business & economic principles",
      steps: ["Step 1: Identify business environment/concept", "Step 2: Apply commercial principles", "Step 3: State conclusion"]
    };
  }
}
