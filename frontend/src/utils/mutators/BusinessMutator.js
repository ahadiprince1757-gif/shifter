/**
 * TIXAR BUSINESS STUDIES & ECONOMICS MUTATOR
 * Version 3.0
 *
 * Design philosophy:
 *
 * Question
 *    â†“
 * Detect concept
 *    â†“
 * Extract / generate parameters
 *    â†“
 * Mutate the underlying problem
 *    â†“
 * Solve from first principles
 *    â†“
 * Generate misconception-based distractors
 *    â†“
 * Diagnose understanding
 *
 * Supports:
 *
 * BUSINESS MATHEMATICS
 * - Cost price
 * - Selling price
 * - Profit / loss
 * - Mark-up
 * - Profit margin
 * - Revenue
 * - Expenses
 * - Gross profit
 * - Net profit
 * - Discounts
 * - Commission
 * - Simple interest
 * - Compound interest
 * - VAT / tax
 * - Break-even
 *
 * ECONOMICS
 * - Scarcity
 * - Choice
 * - Opportunity cost
 * - Demand
 * - Supply
 * - Equilibrium
 * - Elasticity
 * - Inflation
 * - Unemployment
 * - Economic resources
 * - Market structures
 * - Government policy
 *
 * BUSINESS STUDIES
 * - Entrepreneurship
 * - Business ownership
 * - Sources of finance
 * - Marketing
 * - Management
 * - Production
 * - Business environment
 * - Risk
 * - Insurance
 *
 * The mutator intentionally creates distractors based on common
 * misconceptions instead of random incorrect answers.
 */

export class BusinessMutator {
  constructor() {
    this.version = "3.0";

    this.currency = "KSh";

    this.marketStructures = [
      "Perfect competition",
      "Monopoly",
      "Monopolistic competition",
      "Oligopoly",
    ];

    this.businessFunctions = [
      "Marketing",
      "Finance",
      "Human resource management",
      "Production",
      "Purchasing",
      "Accounting",
    ];

    this.financeSources = [
      "Owner's capital",
      "Bank loan",
      "Trade credit",
      "Retained profit",
      "Hire purchase",
      "Overdraft",
      "Debenture",
    ];
  }

  // =========================================================
  // DETERMINISTIC ENGINE
  // =========================================================

  _hash(str) {
    let hash = 2166136261;

    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);

      hash +=
        (hash << 1) +
        (hash << 4) +
        (hash << 7) +
        (hash << 8) +
        (hash << 24);
    }

    return Math.abs(hash >>> 0);
  }

  _seed(stem, qObj = {}) {
    return this._hash(
      `${stem}|${qObj.id || ""}|${this.version}`
    );
  }

  _number(seed, min, max, step = 1, offset = 0) {
    const count =
      Math.floor((max - min) / step) + 1;

    return (
      min +
      ((seed + offset) % count) * step
    );
  }

  _pick(array, seed, offset = 0) {
    return array[
      (seed + offset) % array.length
    ];
  }

  _shuffle(array, seed) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j =
        (seed + i * 31) % (i + 1);

      [result[i], result[j]] =
        [result[j], result[i]];
    }

    return result;
  }

  _money(value) {
    return `${this.currency} ${Math.round(value).toLocaleString()}`;
  }

  _percent(value) {
    return `${value}%`;
  }

  _steps(lines) {
    return lines.map(
      (line, index) =>
        `Step ${index + 1}: ${line}`
    );
  }

  _mcq(correct, distractors, seed) {
    const unique = [];

    for (
      const answer of [correct, ...distractors]
    ) {
      if (
        answer !== undefined &&
        answer !== null &&
        !unique.includes(answer)
      ) {
        unique.push(answer);
      }
    }

    /*
     * Never use fake "None of the above" answers.
     * Instead generate a safe fallback.
     */
    let fallback = "Insufficient information";

    if (!unique.includes(fallback)) {
      unique.push(fallback);
    }

    return this._shuffle(
      unique.slice(0, 4),
      seed
    );
  }

  _mode(index = 0) {
    return (
      ((Math.floor(index) % 4) + 4) % 4
    );
  }

  // =========================================================
  // NUMBER EXTRACTION
  // =========================================================

  _extractMoney(stem) {
    const match = stem.match(
      /(?:ksh|kes|sh|shilling[s]?)\s*([\d,]+(?:\.\d+)?)/i
    );

    if (!match) return null;

    return parseFloat(
      match[1].replace(/,/g, "")
    );
  }

  _extractPercent(stem) {
    const match =
      stem.match(/(\d+(?:\.\d+)?)\s*%/);

    return match
      ? parseFloat(match[1])
      : null;
  }

  _extractNumber(stem) {
    const match =
      stem.match(/\b\d+(?:\.\d+)?\b/);

    return match
      ? parseFloat(match[0])
      : null;
  }

  // =========================================================
  // PROFIT / LOSS / MARKUP / MARGIN
  // =========================================================

  _generateProfit(stem, mode, seed) {
    const cost =
      this._number(
        seed,
        2000,
        20000,
        500,
        11
      );

    const rate =
      this._pick(
        [10, 15, 20, 25, 30, 40],
        seed,
        17
      );

    const isLoss =
      stem.toLowerCase().includes("loss") ||
      seed % 5 === 0;

    const amount =
      cost * rate / 100;

    const sellingPrice =
      isLoss
        ? cost - amount
        : cost + amount;

    const answer =
      this._money(sellingPrice);

    const direction =
      isLoss ? "loss" : "profit";

    /*
     * Common misconceptions:
     *
     * 1. Student gives only profit amount.
     * 2. Student subtracts when it should add.
     * 3. Student adds percentage directly to currency.
     * 4. Student calculates percentage from selling price.
     */

    const distractors = [
      this._money(amount),

      this._money(
        isLoss
          ? cost + amount
          : cost - amount
      ),

      this._money(
        cost * (1 + rate / 10) / 100
      ),
    ];

    if (mode === 0) {
      return {
        q: isLoss
          ? `A trader buys goods for ${this._money(
              cost
            )} and sells them at a ${rate}% loss. Calculate the selling price.`
          : `A trader buys goods for ${this._money(
              cost
            )} and sells them at a ${rate}% profit. Calculate the selling price.`,

        ans: answer,

        hint:
          `First calculate ${rate}% of the cost price, then ${
            isLoss ? "subtract" : "add"
          } it.`,

        why:
          `${direction} = ${rate}% Ã— ${this._money(
            cost
          )} = ${this._money(amount)}.`,

        sol: answer,

        steps: this._steps([
          `Calculate ${rate}% of ${this._money(
            cost
          )}: ${this._money(amount)}.`,
          `${
            isLoss ? "Subtract" : "Add"
          } the ${direction} ${
            isLoss ? "from" : "to"
          } the cost price.`,
          `Selling price = ${answer}.`,
        ]),

        type: "open_response",
        options: null,
      };
    }

    if (mode === 1) {
      const options =
        this._mcq(
          answer,
          distractors,
          seed
        );

      return {
        q: isLoss
          ? `A product costing ${this._money(
              cost
            )} is sold at a ${rate}% loss. What is its selling price?`
          : `A product costing ${this._money(
              cost
            )} is sold at a ${rate}% profit. What is its selling price?`,

        ans: answer,

        hint:
          `Find ${rate}% of the cost price before calculating the selling price.`,

        why:
          `${rate}% of ${this._money(
            cost
          )} = ${this._money(
            amount
          )}. Therefore the selling price is ${answer}.`,

        sol: answer,

        steps: this._steps([
          `Profit/loss amount = ${rate}% Ã— ${this._money(
            cost
          )}.`,
          `Profit/loss amount = ${this._money(
            amount
          )}.`,
          `Selling price = ${answer}.`,
        ]),

        type: "mcq",
        options,
      };
    }

    if (mode === 2) {
      const wrong =
        sellingPrice +
        this._pick(
          [100, 200, 500],
          seed
        );

      return {
        q:
          `A trader bought goods for ${this._money(
            cost
          )} and sold them at a ${rate}% ${
            isLoss ? "loss" : "profit"
          }. An accountant recorded the selling price as ${this._money(
            wrong
          )}. Is the record correct? Give the correct selling price.`,

        ans:
          `Incorrect. The correct selling price is ${answer}.`,

        hint:
          `Calculate the ${rate}% ${
            isLoss ? "loss" : "profit"
          } from the cost price.`,

        why:
          `The ${rate}% amount is ${this._money(
            amount
          )}, giving a selling price of ${answer}.`,

        sol:
          `Incorrect. Correct selling price = ${answer}.`,

        steps: this._steps([
          `Calculate the ${rate}% amount.`,
          `Apply the ${isLoss ? "loss" : "profit"} to the cost price.`,
          `Compare the calculated value with the recorded value.`,
          `The correct selling price is ${answer}.`,
        ]),

        type: "open_response",
        options: null,
      };
    }

    return {
      q:
        `A business buys stock for ${this._money(
          cost
        )} and earns a ${rate}% ${
          isLoss ? "loss" : "profit"
        } based on cost. State the formula and calculate the selling price.`,

      ans:
        `Selling Price = Cost Price ${
          isLoss ? "-" : "+"
        } ${
          rate
        }% of Cost Price = ${answer}.`,

      hint:
        `Selling Price = Cost Price ${
          isLoss ? "-" : "+"
        } ${
          rate
        }% of Cost Price.`,

      why:
        `The ${rate}% amount is ${this._money(
          amount
        )}.`,

      sol: answer,

      steps: this._steps([
        `Calculate ${rate}% of cost price.`,
        `Obtain ${this._money(amount)}.`,
        `Apply the ${
          isLoss ? "loss" : "profit"
        }.`,
        `Final selling price = ${answer}.`,
      ]),

      type: "open_response",
      options: null,
    };
  }

  // =========================================================
  // REVENUE
  // =========================================================

  _generateRevenue(stem, mode, seed) {
    const quantity =
      this._number(
        seed,
        20,
        200,
        10,
        5
      );

    const price =
      this._number(
        seed,
        50,
        1000,
        50,
        23
      );

    const revenue =
      quantity * price;

    const answer =
      this._money(revenue);

    return {
      q:
        `A business sells ${quantity} units at ${this._money(
          price
        )} per unit. What is the total revenue?`,

      ans: answer,

      hint:
        "Revenue = Quantity sold Ã— Selling price per unit.",

      why:
        `Revenue = ${quantity} Ã— ${this._money(
          price
        )} = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Identify quantity sold: ${quantity}.`,
        `Identify selling price per unit: ${this._money(
          price
        )}.`,
        `Multiply quantity by price.`,
        `Revenue = ${answer}.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              answer,
              [
                this._money(
                  quantity + price
                ),
                this._money(
                  quantity * 2 * price
                ),
                this._money(
                  quantity * price / 2
                ),
              ],
              seed
            ),
    };
  }

  // =========================================================
  // COST / PROFIT / NET PROFIT
  // =========================================================

  _generateNetProfit(stem, mode, seed) {
    const revenue =
      this._number(
        seed,
        20000,
        100000,
        5000,
        7
      );

    const cost =
      this._number(
        seed,
        5000,
        revenue - 5000,
        5000,
        19
      );

    const expenses =
      this._number(
        seed,
        2000,
        Math.max(2000, cost / 2),
        1000,
        31
      );

    const grossProfit =
      revenue - cost;

    const netProfit =
      grossProfit - expenses;

    const answer =
      this._money(netProfit);

    return {
      q:
        `A business has revenue of ${this._money(
          revenue
        )}, cost of goods sold of ${this._money(
          cost
        )}, and operating expenses of ${this._money(
          expenses
        )}. Calculate its net profit.`,

      ans: answer,

      hint:
        "Net profit = Revenue âˆ’ Cost of goods sold âˆ’ Operating expenses.",

      why:
        `Net profit = ${this._money(
          revenue
        )} âˆ’ ${this._money(
          cost
        )} âˆ’ ${this._money(
          expenses
        )} = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Calculate gross profit: ${this._money(
          revenue
        )} âˆ’ ${this._money(
          cost
        )} = ${this._money(
          grossProfit
        )}.`,
        `Subtract operating expenses: ${this._money(
          grossProfit
        )} âˆ’ ${this._money(
          expenses
        )}.`,
        `Net profit = ${answer}.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              answer,
              [
                this._money(grossProfit),
                this._money(
                  revenue - expenses
                ),
                this._money(cost),
              ],
              seed
            ),
    };
  }

  // =========================================================
  // DISCOUNT
  // =========================================================

  _generateDiscount(stem, mode, seed) {
    const markedPrice =
      this._number(
        seed,
        1000,
        20000,
        500,
        13
      );

    const rate =
      this._pick(
        [5, 10, 15, 20, 25, 30],
        seed,
        29
      );

    const discount =
      markedPrice * rate / 100;

    const sellingPrice =
      markedPrice - discount;

    const answer =
      this._money(sellingPrice);

    return {
      q:
        `A product has a marked price of ${this._money(
          markedPrice
        )}. A customer receives a ${rate}% discount. What price should the customer pay?`,

      ans: answer,

      hint:
        `Calculate ${rate}% of the marked price, then subtract the discount.`,

      why:
        `Discount = ${rate}% Ã— ${this._money(
          markedPrice
        )} = ${this._money(
          discount
        )}. Final price = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Calculate discount: ${rate}% Ã— ${this._money(
          markedPrice
        )} = ${this._money(
          discount
        )}.`,
        `Subtract discount from marked price.`,
        `Amount payable = ${answer}.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              answer,
              [
                this._money(discount),
                this._money(
                  markedPrice + discount
                ),
                this._money(
                  markedPrice -
                    discount / 2
                ),
              ],
              seed
            ),
    };
  }

  // =========================================================
  // SIMPLE INTEREST
  // =========================================================

  _generateSimpleInterest(stem, mode, seed) {
    const principal =
      this._number(
        seed,
        5000,
        100000,
        5000,
        3
      );

    const rate =
      this._pick(
        [5, 6, 8, 10, 12, 15],
        seed,
        17
      );

    const years =
      this._number(
        seed,
        1,
        5,
        1,
        29
      );

    const interest =
      principal * rate * years / 100;

    const amount =
      principal + interest;

    const answer =
      mode === 0
        ? this._money(interest)
        : this._money(amount);

    const askingAmount =
      mode !== 0;

    return {
      q:
        askingAmount
          ? `A business deposits ${this._money(
              principal
            )} at ${rate}% simple interest per year for ${years} years. What is the total amount after ${years} years?`
          : `A business borrows ${this._money(
              principal
            )} at ${rate}% simple interest per year for ${years} years. Calculate the interest charged.`,

      ans: answer,

      hint:
        "Use I = PRT / 100.",

      why:
        `I = ${principal} Ã— ${rate} Ã— ${years} Ã· 100 = ${this._money(
          interest
        )}.`,

      sol: answer,

      steps: this._steps([
        `Identify P = ${this._money(
          principal
        )}.`,
        `Identify R = ${rate}% and T = ${years} years.`,
        `Interest = PRT/100 = ${this._money(
          interest
        )}.`,
        askingAmount
          ? `Total amount = principal + interest = ${answer}.`
          : `Interest charged = ${answer}.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              answer,
              askingAmount
                ? [
                    this._money(
                      principal +
                        interest / 2
                    ),
                    this._money(
                      interest
                    ),
                    this._money(
                      principal -
                        interest
                    ),
                  ]
                : [
                    this._money(
                      principal
                    ),
                    this._money(
                      interest * 2
                    ),
                    this._money(
                      principal +
                        interest
                    ),
                  ],
              seed
            ),
    };
  }

  // =========================================================
  // VAT / TAX
  // =========================================================

  _generateTax(stem, mode, seed) {
    const price =
      this._number(
        seed,
        1000,
        50000,
        500,
        41
      );

    const rate =
      this._pick(
        [8, 10, 12, 14, 16],
        seed,
        53
      );

    const tax =
      price * rate / 100;

    const inclusive =
      price + tax;

    const answer =
      this._money(inclusive);

    return {
      q:
        `A taxable business product costs ${this._money(
          price
        )} before tax. If tax is charged at ${rate}%, what is the final price including tax?`,

      ans: answer,

      hint:
        `Tax = ${rate}% of the pre-tax price. Add the tax to the original price.`,

      why:
        `Tax = ${rate}% Ã— ${this._money(
          price
        )} = ${this._money(
          tax
        )}. Final price = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Calculate tax: ${rate}% Ã— ${this._money(
          price
        )} = ${this._money(
          tax
        )}.`,
        `Add tax to pre-tax price.`,
        `Final price = ${answer}.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              answer,
              [
                this._money(tax),
                this._money(
                  price - tax
                ),
                this._money(
                  price + tax * 2
                ),
              ],
              seed
            ),
    };
  }

  // =========================================================
  // BREAK EVEN
  // =========================================================

  _generateBreakEven(stem, mode, seed) {
    const fixedCost =
      this._number(
        seed,
        10000,
        100000,
        5000,
        7
      );

    const sellingPrice =
      this._number(
        seed,
        100,
        1000,
        50,
        23
      );

    const variableCost =
      this._number(
        seed,
        20,
        sellingPrice - 20,
        10,
        37
      );

    const contribution =
      sellingPrice - variableCost;

    const units =
      Math.ceil(
        fixedCost / contribution
      );

    const answer =
      `${units} units`;

    return {
      q:
        `A business has fixed costs of ${this._money(
          fixedCost
        )}. Each unit sells for ${this._money(
          sellingPrice
        )} and has a variable cost of ${this._money(
          variableCost
        )}. How many units must be sold to break even?`,

      ans: answer,

      hint:
        "Break-even output = Fixed Costs Ã· Contribution per unit.",

      why:
        `Contribution = ${this._money(
          sellingPrice
        )} âˆ’ ${this._money(
          variableCost
        )} = ${this._money(
          contribution
        )}.`,

      sol: answer,

      steps: this._steps([
        `Calculate contribution per unit: ${this._money(
          sellingPrice
        )} âˆ’ ${this._money(
          variableCost
        )} = ${this._money(
          contribution
        )}.`,
        `Divide fixed costs by contribution: ${this._money(
          fixedCost
        )} Ã· ${this._money(
          contribution
        )}.`,
        `Round up because the business must sell a complete number of units.`,
        `Break-even output = ${answer}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        answer,
        [
          `${Math.ceil(
            fixedCost /
              sellingPrice
          )} units`,

          `${Math.ceil(
            fixedCost /
              variableCost
          )} units`,

          `${Math.ceil(
            fixedCost /
              (sellingPrice +
                variableCost)
          )} units`,
        ],
        seed
      ),
    };
  }

  // =========================================================
  // SCARCITY / OPPORTUNITY COST
  // =========================================================

  _generateScarcity(stem, mode, seed) {
    const capital =
      this._number(
        seed,
        30000,
        100000,
        5000,
        13
      );

    const optionA =
      this._number(
        seed,
        20000,
        capital,
        5000,
        17
      );

    const optionB =
      this._number(
        seed,
        20000,
        80000,
        5000,
        29
      );

    return {
      q:
        `A business has ${this._money(
          capital
        )} available. The owner wants to spend ${this._money(
          optionA
        )} on new equipment and ${this._money(
          optionB
        )} on advertising. The owner cannot afford both. What economic problem is illustrated?`,

      ans:
        "Scarcity requiring choice and creating opportunity cost",

      hint:
        `The available capital is ${this._money(
          capital
        )}, while the two desired uses require ${this._money(
          optionA + optionB
        )}.`,

      why:
        "Limited resources cannot satisfy all wants, so a choice must be made. The next best alternative forgone is the opportunity cost.",

      sol:
        "Scarcity â†’ choice â†’ opportunity cost",

      steps: this._steps([
        `Calculate total desired spending: ${this._money(
          optionA + optionB
        )}.`,
        `Compare this with available capital of ${this._money(
          capital
        )}.`,
        "The resources are insufficient for both wants.",
        "The owner must choose, creating an opportunity cost.",
      ]),

      type: "mcq",

      options: this._mcq(
        "Scarcity requiring choice and creating opportunity cost",
        [
          "Inflation caused by excessive money supply",
          "Economies of scale caused by increased production",
          "Market equilibrium caused by equal demand and supply",
        ],
        seed
      ),
    };
  }

  // =========================================================
  // DEMAND / SUPPLY
  // =========================================================

  _generateDemandSupply(stem, mode, seed) {
    const scenarios = [
      {
        clue:
          "The price of a product rises and consumers buy less of it.",
        answer:
          "A contraction in quantity demanded",
        explanation:
          "Holding other factors constant, a rise in price normally causes quantity demanded to fall.",
      },

      {
        clue:
          "The price of a product falls and consumers buy more of it.",
        answer:
          "An expansion in quantity demanded",
        explanation:
          "A fall in price normally causes quantity demanded to increase, ceteris paribus.",
      },

      {
        clue:
          "The cost of producing a product falls because of cheaper raw materials.",
        answer:
          "Supply increases",
        explanation:
          "Lower production costs make supplying the product more profitable, shifting supply outward.",
      },

      {
        clue:
          "A major drought reduces agricultural production.",
        answer:
          "Supply decreases",
        explanation:
          "A reduction in productive capacity reduces the amount producers can supply at each price.",
      },
    ];

    const scenario =
      this._pick(
        scenarios,
        seed
      );

    return {
      q:
        `[Market Analysis] ${scenario.clue} What is the most appropriate economic interpretation?`,

      ans: scenario.answer,

      hint:
        "Separate a movement along a curve from a shift of the curve.",

      why: scenario.explanation,

      sol: scenario.answer,

      steps: this._steps([
        "Identify what changed.",
        "Determine whether the change is caused by price or another factor.",
        scenario.explanation,
        `Conclusion: ${scenario.answer}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.answer,
        [
          "Demand becomes perfectly inelastic",
          "Market becomes a monopoly",
          "Equilibrium price must immediately become zero",
        ],
        seed
      ),
    };
  }

  // =========================================================
  // INFLATION
  // =========================================================

  _generateInflation(stem, mode, seed) {
    const scenarios = [
      {
        q:
          "The general price level rises continuously while the purchasing power of money falls. What economic condition is being experienced?",

        ans: "Inflation",

        why:
          "Inflation is a sustained increase in the general price level, reducing the purchasing power of money.",
      },

      {
        q:
          "A business faces rising fuel, electricity and raw-material costs, causing it to increase prices. What type of inflationary pressure is illustrated?",

        ans: "Cost-push inflation",

        why:
          "Higher production costs can push firms to raise prices.",
      },

      {
        q:
          "Consumers suddenly increase spending while production capacity remains unchanged. What type of inflationary pressure may result?",

        ans: "Demand-pull inflation",

        why:
          "Excess demand relative to available output can place upward pressure on prices.",
      },
    ];

    const scenario =
      this._pick(
        scenarios,
        seed
      );

    return {
      q:
        `[Economic Diagnosis] ${scenario.q}`,

      ans: scenario.ans,

      hint:
        "Focus on whether prices rise generally and identify the cause when required.",

      why: scenario.why,

      sol: scenario.ans,

      steps: this._steps([
        "Identify the economic symptom.",
        "Identify the underlying cause.",
        scenario.why,
        `Conclusion: ${scenario.ans}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.ans,
        [
          "Deflation",
          "Unemployment",
          "Economic growth",
        ],
        seed
      ),
    };
  }

  // =========================================================
  // MARKET STRUCTURES
  // =========================================================

  _generateMarketStructure(stem, mode, seed) {
    const scenarios = [
      {
        clue:
          "A market has one dominant seller and very high barriers to entry.",

        answer: "Monopoly",

        explanation:
          "A monopoly is characterized by a single dominant supplier and significant barriers to entry.",
      },

      {
        clue:
          "A market contains many firms selling differentiated products.",

        answer: "Monopolistic competition",

        explanation:
          "Many firms compete while differentiating their products through branding, quality or other features.",
      },

      {
        clue:
          "A market is dominated by a small number of large firms whose decisions affect one another.",

        answer: "Oligopoly",

        explanation:
          "Oligopoly involves a small number of interdependent large firms.",
      },

      {
        clue:
          "Many firms sell identical products and no individual firm can influence the market price.",

        answer: "Perfect competition",

        explanation:
          "Under the simplified perfect competition model, firms are price takers.",
      },
    ];

    const scenario =
      this._pick(
        scenarios,
        seed
      );

    return {
      q:
        `[Market Structure] ${scenario.clue} Which market structure best fits this description?`,

      ans: scenario.answer,

      hint:
        "Look at number of firms, product differentiation and barriers to entry.",

      why: scenario.explanation,

      sol: scenario.answer,

      steps: this._steps([
        "Identify the number of firms.",
        "Check whether products are differentiated.",
        "Consider barriers to entry and market power.",
        `The best classification is ${scenario.answer}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.answer,
        this.marketStructures.filter(
          x => x !== scenario.answer
        ),
        seed
      ),
    };
  }

  // =========================================================
  // SOURCES OF FINANCE
  // =========================================================

  _generateFinanceSource(stem, mode, seed) {
    const scenarios = [
      {
        q:
          "A business allows a supplier to provide goods now and receive payment later. What source of finance is being used?",

        answer: "Trade credit",

        why:
          "Trade credit allows a business to obtain goods or services now and pay the supplier later.",
      },

      {
        q:
          "A business obtains money from a bank and agrees to repay it with interest over an agreed period.",

        answer: "Bank loan",

        why:
          "A bank loan provides borrowed funds that are repaid according to agreed terms, normally with interest.",
      },

      {
        q:
          "A business uses accumulated profits from previous years to finance expansion.",

        answer: "Retained profit",

        why:
          "Retained profit is internally generated finance kept in the business rather than distributed to owners.",
      },

      {
        q:
          "An owner uses personal savings to establish a business.",

        answer: "Owner's capital",

        why:
          "The owner is providing personal funds as capital for the business.",
      },
    ];

    const scenario =
      this._pick(
        scenarios,
        seed
      );

    return {
      q:
        `[Business Finance] ${scenario.q} Identify the source of finance.`,

      ans: scenario.answer,

      hint:
        "Determine where the money comes from and whether it is internal or external.",

      why: scenario.why,

      sol: scenario.answer,

      steps: this._steps([
        "Identify the source of the funds.",
        "Determine whether the funds are borrowed or internally generated.",
        `Classify the source as ${scenario.answer}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.answer,
        this.financeSources.filter(
          x => x !== scenario.answer
        ),
        seed
      ),
    };
  }

  // =========================================================
  // ENTREPRENEURSHIP
  // =========================================================

  _generateEntrepreneurship(stem, mode, seed) {
    const scenarios = [
      {
        clue:
          "A person identifies an unmet customer need, organizes resources and accepts the possibility of financial loss to establish a business.",

        answer:
          "Entrepreneurship",

        explanation:
          "Entrepreneurship involves identifying opportunities, organizing resources, making decisions and bearing business risk.",
      },

      {
        clue:
          "A business owner introduces a new product that solves a customer problem in a different way.",

        answer:
          "Innovation",

        explanation:
          "Innovation involves introducing or significantly improving products, services or processes.",
      },

      {
        clue:
          "A business owner studies customer needs before deciding which product to produce.",

        answer:
          "Market research",

        explanation:
          "Market research provides information about customers, competitors and market conditions.",
      },
    ];

    const scenario =
      this._pick(
        scenarios,
        seed
      );

    return {
      q:
        `[Entrepreneurship] ${scenario.clue} What concept is being demonstrated?`,

      ans: scenario.answer,

      hint:
        "Focus on the action the entrepreneur is taking.",

      why: scenario.explanation,

      sol: scenario.answer,

      steps: this._steps([
        "Identify the entrepreneur's action.",
        "Connect the action to the relevant business concept.",
        `The concept is ${scenario.answer}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.answer,
        [
          "Liquidity",
          "Depreciation",
          "Specialization",
        ],
        seed
      ),
    };
  }

  // =========================================================
  // BUSINESS ENVIRONMENT
  // =========================================================

  _generateBusinessEnvironment(stem, mode, seed) {
    const scenarios = [
      {
        q:
          "The government introduces a higher business tax rate.",

        answer:
          "External business environment factor",

        explanation:
          "Government policy originates outside the individual firm's control and therefore forms part of the external environment.",
      },

      {
        q:
          "A business introduces a new internal training programme for employees.",

        answer:
          "Internal business environment factor",

        explanation:
          "The firm's management controls decisions about internal training and employee development.",
      },

      {
        q:
          "A competitor launches a cheaper substitute product.",

        answer:
          "External business environment factor",

        explanation:
          "Competitors are outside the direct control of the business.",
      },
    ];

    const scenario =
      this._pick(
        scenarios,
        seed
      );

    return {
      q:
        `[Business Environment] ${scenario.q} How should this factor be classified?`,

      ans: scenario.answer,

      hint:
        "Ask whether management can directly control the source of the change.",

      why: scenario.explanation,

      sol: scenario.answer,

      steps: this._steps([
        "Identify the source of the change.",
        "Determine whether it originates inside or outside the business.",
        scenario.explanation,
        `Classification: ${scenario.answer}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.answer,
        [
          "Always an accounting error",
          "Always a production objective",
          "A personal financial decision",
        ],
        seed
      ),
    };
  }

  // =========================================================
  // REVERSE DIAGNOSTIC
  // =========================================================

  _reverseDiagnostic(qObj, stem) {
    const answer =
      String(qObj.ans || "").trim();

    if (!answer || answer.length < 3) {
      return null;
    }

    return {
      q:
        `[Reverse Business Diagnosis]

Original question:
"${stem}"

Known answer:
"${answer}"

Work backwards.

What business, accounting or economic principle must be understood for this answer to be correct?`,

      ans: answer,

      hint:
        qObj.hint ||
        "Do not simply repeat the answer. Identify the rule, relationship or principle behind it.",

      why:
        qObj.why ||
        `The answer depends on the underlying business or economic principle represented by "${answer}".`,

      sol:
        qObj.sol ||
        answer,

      steps: this._steps([
        "Identify the result or business decision.",
        "Ask what rule or concept explains that result.",
        "Connect the concept to the original question.",
        "Explain why the answer follows.",
      ]),

      type: "open_response",
      options: null,
    };
  }

  // =========================================================
  // GENERIC NUMERICAL MUTATION
  // =========================================================

  _genericMutation(qObj, stem, seed) {
    const numbers =
      stem.match(
        /\b\d+(?:\.\d+)?\b/g
      );

    if (
      !numbers ||
      numbers.length === 0
    ) {
      return {
        ...qObj,

        q:
          `[Business Application Check] ${stem}`,

        hint:
          qObj.hint ||
          "Identify the relevant business or economic principle.",

        steps: this._steps([
          "Identify the business concept.",
          "Recall the governing rule or relationship.",
          "Apply the rule to the situation.",
          "Check whether the conclusion makes business sense.",
        ]),
      };
    }

    const original =
      parseFloat(numbers[0]);

    if (!Number.isFinite(original)) {
      return qObj;
    }

    const multiplier =
      this._pick(
        [2, 3, 4, 5],
        seed
      );

    const mutated =
      Math.round(
        original * multiplier
      );

    const mutatedStem =
      stem.replace(
        numbers[0],
        String(mutated)
      );

    return {
      ...qObj,

      q:
        `[Business Parameter Variant] ${mutatedStem}`,

      hint:
        qObj.hint ||
        "Recalculate using the new business parameter.",

      why:
        `The original parameter ${original} was mutated to ${mutated}.`,

      sol:
        qObj.sol ||
        `Recalculate the answer using ${mutated}.`,

      steps: this._steps([
        `Identify the changed parameter: ${mutated}.`,
        "Apply the original business rule.",
        "Recalculate the result.",
        "Check the result for commercial reasonableness.",
      ]),
    };
  }

  // =========================================================
  // MAIN MUTATOR
  // =========================================================

  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;

    const stem =
      (
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    if (!stem) return qObj;

    const lower =
      stem.toLowerCase();

    const mode =
      this._mode(
        modalityIndex
      );

    const seed =
      this._seed(
        stem,
        qObj
      );

    // -------------------------------------------------------
    // FINANCIAL MATHEMATICS
    // -------------------------------------------------------

    if (
      lowerIncludes(
        lower,
        [
          "profit",
          "loss",
          "markup",
          "mark-up",
          "margin",
          "selling price",
          "cost price",
        ]
      )
    ) {
      return this._generateProfit(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "revenue",
          "sales revenue",
          "sales",
        ]
      )
    ) {
      return this._generateRevenue(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "net profit",
          "gross profit",
          "operating expenses",
          "expenses",
        ]
      )
    ) {
      return this._generateNetProfit(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "discount",
          "marked price",
          "trade discount",
        ]
      )
    ) {
      return this._generateDiscount(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "simple interest",
          "interest rate",
          "principal",
          "interest",
        ]
      )
    ) {
      return this._generateSimpleInterest(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "vat",
          "tax",
          "taxation",
        ]
      )
    ) {
      return this._generateTax(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "break even",
          "break-even",
          "fixed cost",
          "contribution",
        ]
      )
    ) {
      return this._generateBreakEven(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // ECONOMICS
    // -------------------------------------------------------

    if (
      lowerIncludes(
        lower,
        [
          "scarcity",
          "opportunity cost",
          "choice",
          "limited resources",
          "unlimited wants",
        ]
      )
    ) {
      return this._generateScarcity(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "demand",
          "supply",
          "equilibrium",
          "quantity demanded",
          "quantity supplied",
        ]
      )
    ) {
      return this._generateDemandSupply(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "inflation",
          "price level",
          "purchasing power",
          "cost-push",
          "demand-pull",
        ]
      )
    ) {
      return this._generateInflation(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "monopoly",
          "oligopoly",
          "perfect competition",
          "monopolistic competition",
          "market structure",
        ]
      )
    ) {
      return this._generateMarketStructure(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // BUSINESS STUDIES
    // -------------------------------------------------------

    if (
      lowerIncludes(
        lower,
        [
          "source of finance",
          "sources of finance",
          "loan",
          "trade credit",
          "retained profit",
          "owner's capital",
          "overdraft",
          "hire purchase",
        ]
      )
    ) {
      return this._generateFinanceSource(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "entrepreneur",
          "entrepreneurship",
          "innovation",
          "business idea",
          "market research",
        ]
      )
    ) {
      return this._generateEntrepreneurship(
        stem,
        mode,
        seed
      );
    }

    if (
      lowerIncludes(
        lower,
        [
          "business environment",
          "internal environment",
          "external environment",
          "government policy",
          "competitor",
          "competition",
        ]
      )
    ) {
      return this._generateBusinessEnvironment(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // REVERSE DIAGNOSTIC
    // -------------------------------------------------------

    const reverse =
      this._reverseDiagnostic(
        qObj,
        stem,
        seed
      );

    if (reverse) {
      return reverse;
    }

    // -------------------------------------------------------
    // FALLBACK
    // -------------------------------------------------------

    return this._genericMutation(
      qObj,
      stem,
      seed
    );
  }
}


// ===========================================================
// HELPER
// ===========================================================

function lowerIncludes(
  text,
  terms
) {
  return terms.some(
    term =>
      text.includes(
        term.toLowerCase()
      )
  );
}
