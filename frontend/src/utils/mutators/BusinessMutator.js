/**
 * Business Studies & Economics Subject Mutator
 * Intelligent Business Engine:
 * - Dynamic Financial Math Solver (Profit/Loss, Revenue, Margin, Interest).
 * - Real-World Commercial Case Studies (Scarcity, Inflation, Taxation, Market Structures).
 * - Generates 4 plausible business MCQ choices with step-by-step financial/economic breakdowns.
 */

export class BusinessMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Financial Math & Profit / Loss / Margin
    const costMatch = stem.match(/ksh\s*(\d+(?:,\d+)*)/i) || stem.match(/(\d+)\s*(?:ksh|shilling)/i);
    if (costMatch || lower.includes("profit") || lower.includes("cost") || lower.includes("revenue") || lower.includes("price") || lower.includes("capital")) {
      const baseCost = (Math.floor(Math.random() * 15) + 5) * 1000; // KSh 5,000 to 19,000
      const marginPct = (Math.floor(Math.random() * 5) + 2) * 5; // 10%, 15%, 20%, 25%, 30%
      const profit = Math.round((baseCost * marginPct) / 100);
      const sellingPrice = baseCost + profit;

      const isLoss = lower.includes("loss");
      const finalPrice = isLoss ? baseCost - profit : sellingPrice;

      return {
        q: isLoss
          ? `[Financial Decision] A trader purchased inventory for KSh ${baseCost.toLocaleString()} but had to clear stock at a ${marginPct}% loss due to low market demand. Calculate the final selling price.`
          : `[Financial Decision] A retail business buys stock for KSh ${baseCost.toLocaleString()} and applies a ${marginPct}% profit margin. Calculate the final selling price of the stock.`,
        ans: `KSh ${finalPrice.toLocaleString()}`,
        hint: isLoss
          ? `Loss = ${marginPct}% of KSh ${baseCost.toLocaleString()}. Subtract loss from cost price.`
          : `Profit = ${marginPct}% of KSh ${baseCost.toLocaleString()}. Add profit to cost price.`,
        why: isLoss
          ? `Loss = (${marginPct}/100) × ${baseCost} = KSh ${profit.toLocaleString()}.\nSelling Price = KSh ${baseCost.toLocaleString()} - KSh ${profit.toLocaleString()} = KSh ${finalPrice.toLocaleString()}.`
          : `Profit = (${marginPct}/100) × ${baseCost} = KSh ${profit.toLocaleString()}.\nSelling Price = KSh ${baseCost.toLocaleString()} + KSh ${profit.toLocaleString()} = KSh ${finalPrice.toLocaleString()}.`,
        sol: `KSh ${finalPrice.toLocaleString()}`,
        steps: [
          `Step 1: Calculate ${marginPct}% margin: (${marginPct}/100) × KSh ${baseCost.toLocaleString()} = KSh ${profit.toLocaleString()}`,
          `Step 2: ${isLoss ? "Subtract loss from" : "Add profit to"} cost price: KSh ${baseCost.toLocaleString()} ${isLoss ? "-" : "+"} KSh ${profit.toLocaleString()}`,
          `Step 3: Final selling price = KSh ${finalPrice.toLocaleString()}`
        ],
        type: "mcq",
        options: [
          `KSh ${finalPrice.toLocaleString()}`,
          `KSh ${profit.toLocaleString()}`,
          `KSh ${(baseCost + profit * 2).toLocaleString()}`,
          `KSh ${(baseCost / 2).toLocaleString()}`
        ]
      };
    }

    // 2. Scarcity, Opportunity Cost & Economic Systems
    if (lower.includes("scarcity") || lower.includes("opportunity cost") || lower.includes("resources") || lower.includes("wants") || lower.includes("choice")) {
      return {
        q: `[Economic Decision Case Study] A bakery owner has KSh 50,000 in capital. They want to buy a new baking oven costing KSh 40,000 and hire a delivery driver costing KSh 25,000. Explain the core economic problem faced by the owner.`,
        ans: "Scarcity of capital forces the owner to prioritize and make a choice, incurring an opportunity cost",
        hint: "Compare total wants (KSh 65,000) against limited available funds (KSh 50,000).",
        why: "Scarcity occurs when limited financial resources cannot satisfy unlimited business wants, forcing decision-making where the forgone alternative becomes the opportunity cost.",
        sol: "Scarcity forces a choice resulting in opportunity cost",
        steps: [
          "Step 1: Calculate total cost of desired items (40,000 + 25,000 = 65,000)",
          "Step 2: Compare with available capital (50,000)",
          "Step 3: Conclude limited funds force a choice where the forgone item is the opportunity cost"
        ],
        type: "mcq",
        options: [
          "Scarcity of capital forces the owner to prioritize and make a choice, incurring an opportunity cost",
          "Inflation reduces the purchasing power of the customer base",
          "Economies of scale automatically lower the cost of the baking oven",
          "Monopolistic competition prevents the hiring of delivery staff"
        ]
      };
    }

    // 3. Business Environment & Government Policy
    if (lower.includes("environment") || lower.includes("tax") || lower.includes("inflation") || lower.includes("external") || lower.includes("internal") || lower.includes("government")) {
      return {
        q: `[Macro-Environment Scenario] The government increases Value Added Tax (VAT) on industrial electricity tariffs by 16%. How is this factor classified in business environment analysis, and how does it affect profitability?`,
        ans: "External environment factor (uncontrollable); increases operating expenses and lowers net profit margin",
        hint: "Government tax policy originates outside the control of company management.",
        why: "Government fiscal measures are macroeconomic external factors that raise production costs, directly shrinking net profit margins.",
        sol: "External factor that increases costs and lowers profit",
        steps: [
          "Step 1: Classify factor origin (Government tax = Macro External environment)",
          "Step 2: Trace operational cost impact (Electricity expense increases)",
          "Step 3: Conclude net profit margin decreases"
        ],
        type: "mcq",
        options: [
          "External environment factor (uncontrollable); increases operating expenses and lowers net profit margin",
          "Internal environment factor (controllable); increases firm operational efficiency",
          "Micro-environment factor; increases consumer demand for manufactured goods",
          "Internal environment factor; reduces employee wage demands"
        ]
      };
    }

    // 4. Reverse Inquiry for General Business Concepts
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Commercial Principles Diagnostics] Regarding: "${stem}"\nWhich business principle or economic concept governs this commercial decision?`,
        ans: rawAns,
        hint: qObj.hint || "Relate commercial decisions to profitability, risk management, or market demand.",
        why: qObj.why || `Commercial principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze business scenario or decision described",
          "Step 2: Match to economic principle (Demand/Supply, Profitability, Risk)",
          "Step 3: State commercial conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Principle of diminishing marginal utility",
          "Horizontal integration of competing firms",
          "Diversification of product portfolio to mitigate risk"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Business Principles Check] ${stem}`,
      hint: qObj.hint || "Focus on profitability, management, or economic rules.",
      steps: [
        "Step 1: Analyze business context",
        "Step 2: Apply commercial rule",
        "Step 3: State conclusion"
      ]
    };
  }
}
