/**
 * TIXAR BUSINESS STUDIES & ECONOMICS MUTATOR
 * Version 4.0
 *
 * DETERMINISTIC / ZERO-RANDOMNESS ENGINE
 *
 * Design:
 *
 *                    ORIGINAL QUESTION
 *                           ↓
 *                    CONCEPT DETECTION
 *                           ↓
 *                 EXTRACT EXISTING DATA
 *                           ↓
 *              DETERMINISTIC VARIANT INDEX
 *                           ↓
 *              FIXED MUTATION TRANSFORM
 *                           ↓
 *                 SOLVE FROM FIRST PRINCIPLES
 *                           ↓
 *                MISCONCEPTION DISTRACTORS
 *                           ↓
 *                     FINAL QUESTION
 *
 * IMPORTANT:
 * - No Math.random()
 * - No random number generator
 * - No pseudo-random hash
 * - No seed
 * - No shuffling
 * - No random selection
 *
 * Every mutation is reproducible.
 *
 * The mutation sequence is controlled by modalityIndex.
 *
 * modalityIndex 0 → Variant A
 * modalityIndex 1 → Variant B
 * modalityIndex 2 → Variant C
 * modalityIndex 3 → Variant D
 * modalityIndex 4 → Variant A
 * ...
 */

export class BusinessMutator {
  constructor() {
    this.version = "4.0";

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

    /*
     * Fixed deterministic sequences.
     *
     * These are not random.
     * They are deliberate educational progressions.
     */
    this.moneyValues = [
      2000,
      3000,
      4000,
      5000,
      6000,
      8000,
      10000,
      12000,
      15000,
      20000,
    ];

    this.percentages = [
      5,
      10,
      15,
      20,
      25,
      30,
      40,
    ];

    this.quantities = [
      20,
      30,
      40,
      50,
      60,
      80,
      100,
      120,
      150,
      200,
    ];
  }

  // =========================================================
  // DETERMINISTIC CORE
  // =========================================================

  /**
   * Normalize the modality index.
   *
   * This is the only selector used by the engine.
   *
   * There is deliberately NO seed.
   */
  _variant(index = 0) {
    const value = Number.isFinite(Number(index))
      ? Math.floor(Number(index))
      : 0;

    return ((value % 4) + 4) % 4;
  }

  /**
   * Deterministically select an item from a fixed sequence.
   *
   * This is NOT random selection.
   */
  _at(array, index = 0) {
    if (!array || array.length === 0) {
      return undefined;
    }

    const normalized =
      ((Math.floor(index) % array.length) +
        array.length) %
      array.length;

    return array[normalized];
  }

  /**
   * Deterministically generate a number from a fixed
   * educational sequence.
   */
  _sequenceValue(array, variant, offset = 0) {
    return this._at(
      array,
      variant + offset
    );
  }

  _money(value) {
    return `${this.currency} ${Math.round(
      value
    ).toLocaleString()}`;
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

  /**
   * Deterministic MCQ construction.
   *
   * IMPORTANT:
   * Options are deliberately NOT shuffled.
   *
   * The correct answer position is controlled by
   * the variant so it is predictable and reproducible.
   */
  _mcq(correct, distractors, variant = 0) {
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

    const fallback =
      "Insufficient information";

    if (
      unique.length < 4 &&
      !unique.includes(fallback)
    ) {
      unique.push(fallback);
    }

    const options =
      unique.slice(0, 4);

    if (options.length <= 1) {
      return options;
    }

    /*
     * Put the correct answer at a deterministic
     * position instead of shuffling.
     */
    const correctIndex =
      options.indexOf(correct);

    if (correctIndex === -1) {
      return options;
    }

    const target =
      variant % options.length;

    if (correctIndex === target) {
      return options;
    }

    [
      options[correctIndex],
      options[target],
    ] = [
      options[target],
      options[correctIndex],
    ];

    return options;
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
      stem.match(
        /(\d+(?:\.\d+)?)\s*%/
      );

    return match
      ? parseFloat(match[1])
      : null;
  }

  _extractNumbers(stem) {
    return (
      stem.match(
        /\b\d+(?:\.\d+)?\b/g
      ) || []
    ).map(Number);
  }

  _extractNumber(stem) {
    const numbers =
      this._extractNumbers(stem);

    return numbers.length
      ? numbers[0]
      : null;
  }

  // =========================================================
  // PROFIT / LOSS / MARKUP / MARGIN
  // =========================================================

  _generateProfit(stem, variant) {
    /*
     * Deterministic progression:
     *
     * Variant 0:
     * cost 2000, rate 10%
     *
     * Variant 1:
     * cost 4000, rate 15%
     *
     * Variant 2:
     * cost 6000, rate 20%
     *
     * Variant 3:
     * cost 8000, rate 25%
     */

    const cost =
      this._sequenceValue(
        [
          2000,
          4000,
          6000,
          8000,
        ],
        variant
      );

    const rate =
      this._sequenceValue(
        [10, 15, 20, 25],
        variant
      );

    const lower =
      stem.toLowerCase();

    const explicitLoss =
      lower.includes("loss");

    const explicitProfit =
      lower.includes("profit");

    /*
     * If the original question explicitly specifies
     * loss, preserve loss.
     *
     * Otherwise use a deterministic alternating
     * progression rather than randomness.
     */
    const isLoss =
      explicitLoss
        ? true
        : explicitProfit
        ? false
        : variant >= 2;

    const amount =
      cost * rate / 100;

    const sellingPrice =
      isLoss
        ? cost - amount
        : cost + amount;

    const answer =
      this._money(sellingPrice);

    const direction =
      isLoss
        ? "loss"
        : "profit";

    const distractors = [
      this._money(amount),

      this._money(
        isLoss
          ? cost + amount
          : cost - amount
      ),

      this._money(
        cost +
          (isLoss ? -1 : 1) *
            cost *
            rate /
            1000
      ),
    ];

    if (variant === 0) {
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
          `${direction} = ${rate}% × ${this._money(
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

    if (variant === 1) {
      const options =
        this._mcq(
          answer,
          distractors,
          variant
        );

      return {
        q:
          `A product costing ${this._money(
            cost
          )} is sold at a ${rate}% ${
            isLoss ? "loss" : "profit"
          }. What is its selling price?`,

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
          `Profit/loss amount = ${rate}% × ${this._money(
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

    if (variant === 2) {
      const wrong =
        isLoss
          ? sellingPrice + 500
          : sellingPrice - 500;

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
        } ${rate}% of Cost Price = ${answer}.`,

      hint:
        `Selling Price = Cost Price ${
          isLoss ? "-" : "+"
        } ${rate}% of Cost Price.`,

      why:
        `The ${rate}% amount is ${this._money(
          amount
        )}.`,

      sol: answer,

      steps: this._steps([
        `Calculate ${rate}% of cost price.`,
        `Obtain ${this._money(amount)}.`,
        `Apply the ${direction}.`,
        `Final selling price = ${answer}.`,
      ]),

      type: "open_response",
      options: null,
    };
  }

  // =========================================================
  // REVENUE
  // =========================================================

  _generateRevenue(stem, variant) {
    const quantity =
      this._sequenceValue(
        [20, 40, 60, 80],
        variant
      );

    const price =
      this._sequenceValue(
        [100, 200, 300, 400],
        variant
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
        "Revenue = Quantity sold × Selling price per unit.",

      why:
        `Revenue = ${quantity} × ${this._money(
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
        variant === 0
          ? "open_response"
          : "mcq",

      options:
        variant === 0
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
              variant
            ),
    };
  }

  // =========================================================
  // NET PROFIT
  // =========================================================

  _generateNetProfit(stem, variant) {
    const revenue =
      this._sequenceValue(
        [
          20000,
          30000,
          40000,
          50000,
        ],
        variant
      );

    const cost =
      this._sequenceValue(
        [
          10000,
          15000,
          20000,
          25000,
        ],
        variant
      );

    const expenses =
      this._sequenceValue(
        [
          2000,
          3000,
          4000,
          5000,
        ],
        variant
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
        "Net profit = Revenue − Cost of goods sold − Operating expenses.",

      why:
        `Net profit = ${this._money(
          revenue
        )} − ${this._money(
          cost
        )} − ${this._money(
          expenses
        )} = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Calculate gross profit: ${this._money(
          revenue
        )} − ${this._money(
          cost
        )} = ${this._money(
          grossProfit
        )}.`,

        `Subtract operating expenses: ${this._money(
          grossProfit
        )} − ${this._money(
          expenses
        )}.`,

        `Net profit = ${answer}.`,
      ]),

      type:
        variant === 0
          ? "open_response"
          : "mcq",

      options:
        variant === 0
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
              variant
            ),
    };
  }

  // =========================================================
  // DISCOUNT
  // =========================================================

  _generateDiscount(stem, variant) {
    const markedPrice =
      this._sequenceValue(
        [
          2000,
          4000,
          6000,
          8000,
        ],
        variant
      );

    const rate =
      this._sequenceValue(
        [10, 15, 20, 25],
        variant
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
        `Discount = ${rate}% × ${this._money(
          markedPrice
        )} = ${this._money(
          discount
        )}. Final price = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Calculate discount: ${rate}% × ${this._money(
          markedPrice
        )} = ${this._money(
          discount
        )}.`,

        `Subtract discount from marked price.`,

        `Amount payable = ${answer}.`,
      ]),

      type:
        variant === 0
          ? "open_response"
          : "mcq",

      options:
        variant === 0
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
              variant
            ),
    };
  }

  // =========================================================
  // SIMPLE INTEREST
  // =========================================================

  _generateSimpleInterest(stem, variant) {
    const principal =
      this._sequenceValue(
        [
          10000,
          20000,
          30000,
          40000,
        ],
        variant
      );

    const rate =
      this._sequenceValue(
        [5, 6, 8, 10],
        variant
      );

    const years =
      this._sequenceValue(
        [1, 2, 3, 4],
        variant
      );

    const interest =
      principal *
      rate *
      years /
      100;

    const amount =
      principal + interest;

    const askingAmount =
      variant !== 0;

    const answer =
      askingAmount
        ? this._money(amount)
        : this._money(interest);

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
        `I = ${principal} × ${rate} × ${years} ÷ 100 = ${this._money(
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
        variant === 0
          ? "open_response"
          : "mcq",

      options:
        variant === 0
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
              variant
            ),
    };
  }

  // =========================================================
  // VAT / TAX
  // =========================================================

  _generateTax(stem, variant) {
    const price =
      this._sequenceValue(
        [
          5000,
          10000,
          15000,
          20000,
        ],
        variant
      );

    const rate =
      this._sequenceValue(
        [8, 10, 12, 16],
        variant
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
        `Tax = ${rate}% × ${this._money(
          price
        )} = ${this._money(
          tax
        )}. Final price = ${answer}.`,

      sol: answer,

      steps: this._steps([
        `Calculate tax: ${rate}% × ${this._money(
          price
        )} = ${this._money(
          tax
        )}.`,

        `Add tax to pre-tax price.`,

        `Final price = ${answer}.`,
      ]),

      type:
        variant === 0
          ? "open_response"
          : "mcq",

      options:
        variant === 0
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
              variant
            ),
    };
  }

  // =========================================================
  // BREAK EVEN
  // =========================================================

  _generateBreakEven(stem, variant) {
    const fixedCost =
      this._sequenceValue(
        [
          10000,
          20000,
          30000,
          40000,
        ],
        variant
      );

    const sellingPrice =
      this._sequenceValue(
        [
          100,
          200,
          300,
          400,
        ],
        variant
      );

    const variableCost =
      this._sequenceValue(
        [
          40,
          80,
          120,
          160,
        ],
        variant
      );

    const contribution =
      sellingPrice -
      variableCost;

    const units =
      Math.ceil(
        fixedCost /
          contribution
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
        "Break-even output = Fixed Costs ÷ Contribution per unit.",

      why:
        `Contribution = ${this._money(
          sellingPrice
        )} − ${this._money(
          variableCost
        )} = ${this._money(
          contribution
        )}.`,

      sol: answer,

      steps: this._steps([
        `Calculate contribution per unit: ${this._money(
          sellingPrice
        )} − ${this._money(
          variableCost
        )} = ${this._money(
          contribution
        )}.`,

        `Divide fixed costs by contribution: ${this._money(
          fixedCost
        )} ÷ ${this._money(
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
        variant
      ),
    };
  }

  // =========================================================
  // SCARCITY / OPPORTUNITY COST
  // =========================================================

  _generateScarcity(stem, variant) {
    const capital =
      this._sequenceValue(
        [
          30000,
          40000,
          50000,
          60000,
        ],
        variant
      );

    const optionA =
      this._sequenceValue(
        [
          20000,
          25000,
          30000,
          35000,
        ],
        variant
      );

    const optionB =
      this._sequenceValue(
        [
          20000,
          25000,
          30000,
          35000,
        ],
        variant
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
        "Scarcity → choice → opportunity cost",

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
        variant
      ),
    };
  }

  // =========================================================
  // DEMAND / SUPPLY
  // =========================================================

  _generateDemandSupply(stem, variant) {
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
      this._at(
        scenarios,
        variant
      );

    return {
      q:
        `[Market Analysis] ${scenario.clue} What is the most appropriate economic interpretation?`,

      ans:
        scenario.answer,

      hint:
        "Separate a movement along a curve from a shift of the curve.",

      why:
        scenario.explanation,

      sol:
        scenario.answer,

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
        variant
      ),
    };
  }

  // =========================================================
  // INFLATION
  // =========================================================

  _generateInflation(stem, variant) {
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
      this._at(
        scenarios,
        variant
      );

    return {
      q:
        `[Economic Diagnosis] ${scenario.q}`,

      ans:
        scenario.ans,

      hint:
        "Focus on whether prices rise generally and identify the cause when required.",

      why:
        scenario.why,

      sol:
        scenario.ans,

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
        variant
      ),
    };
  }

  // =========================================================
  // MARKET STRUCTURES
  // =========================================================

  _generateMarketStructure(stem, variant) {
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
      this._at(
        scenarios,
        variant
      );

    return {
      q:
        `[Market Structure] ${scenario.clue} Which market structure best fits this description?`,

      ans:
        scenario.answer,

      hint:
        "Look at number of firms, product differentiation and barriers to entry.",

      why:
        scenario.explanation,

      sol:
        scenario.answer,

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
        variant
      ),
    };
  }

  // =========================================================
  // SOURCES OF FINANCE
  // =========================================================

  _generateFinanceSource(stem, variant) {
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
      this._at(
        scenarios,
        variant
      );

    return {
      q:
        `[Business Finance] ${scenario.q} Identify the source of finance.`,

      ans:
        scenario.answer,

      hint:
        "Determine where the money comes from and whether it is internal or external.",

      why:
        scenario.why,

      sol:
        scenario.answer,

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
        variant
      ),
    };
  }

  // =========================================================
  // ENTREPRENEURSHIP
  // =========================================================

  _generateEntrepreneurship(stem, variant) {
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
      this._at(
        scenarios,
        variant
      );

    return {
      q:
        `[Entrepreneurship] ${scenario.clue} What concept is being demonstrated?`,

      ans:
        scenario.answer,

      hint:
        "Focus on the action the entrepreneur is taking.",

      why:
        scenario.explanation,

      sol:
        scenario.answer,

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
        variant
      ),
    };
  }

  // =========================================================
  // BUSINESS ENVIRONMENT
  // =========================================================

  _generateBusinessEnvironment(stem, variant) {
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
      this._at(
        scenarios,
        variant
      );

    return {
      q:
        `[Business Environment] ${scenario.q} How should this factor be classified?`,

      ans:
        scenario.answer,

      hint:
        "Ask whether management can directly control the source of the change.",

      why:
        scenario.explanation,

      sol:
        scenario.answer,

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
        variant
      ),
    };
  }

  // =========================================================
  // REVERSE DIAGNOSTIC
  // =========================================================

  _reverseDiagnostic(qObj, stem) {
    const answer =
      String(qObj.ans || "").trim();

    if (
      !answer ||
      answer.length < 3
    ) {
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
  // GENERIC DETERMINISTIC MUTATION
  // =========================================================

  _genericMutation(qObj, stem, variant) {
    const numbers =
      this._extractNumbers(stem);

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
      numbers[0];

    if (!Number.isFinite(original)) {
      return qObj;
    }

    /*
     * Deterministic multiplier progression.
     *
     * Variant 0 → ×2
     * Variant 1 → ×3
     * Variant 2 → ×4
     * Variant 3 → ×5
     */
    const multiplier =
      [2, 3, 4, 5][variant];

    const mutated =
      Math.round(
        original * multiplier
      );

    const mutatedStem =
      stem.replace(
        String(original),
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
        `The original parameter ${original} was deterministically changed to ${mutated}.`,

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
    if (!qObj) {
      return null;
    }

    const stem =
      (
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    if (!stem) {
      return qObj;
    }

    const lower =
      stem.toLowerCase();

    /*
     * THIS IS NOW THE ONLY VARIANT SELECTOR.
     *
     * No seed.
     * No hash.
     * No random number.
     */
    const variant =
      this._variant(
        modalityIndex
      );

    // =======================================================
    // FINANCIAL MATHEMATICS
    // =======================================================

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
        variant
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
        variant
      );
    }

    /*
     * IMPORTANT:
     * Check net/gross profit BEFORE the generic
     * profit detector.
     *
     * Otherwise:
     *
     * "Calculate net profit"
     *
     * would incorrectly enter _generateProfit().
     */
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
        variant
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
        variant
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
        variant
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
        variant
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
        variant
      );
    }

    // =======================================================
    // ECONOMICS
    // =======================================================

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
        variant
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
        variant
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
        variant
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
        variant
      );
    }

    // =======================================================
    // BUSINESS STUDIES
    // =======================================================

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
        variant
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
        variant
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
        variant
      );
    }

    // =======================================================
    // REVERSE DIAGNOSTIC
    // =======================================================

    const reverse =
      this._reverseDiagnostic(
        qObj,
        stem
      );

    if (reverse) {
      return reverse;
    }

    // =======================================================
    // FALLBACK
    // =======================================================

    return this._genericMutation(
      qObj,
      stem,
      variant
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