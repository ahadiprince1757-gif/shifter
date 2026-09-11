/**
 * TIXAR BUSINESS STUDIES & ECONOMICS MUTATOR
 * Version 5.0
 *
 * DETERMINISTIC / ZERO-RANDOMNESS / AUDITABLE ENGINE
 *
 * CORE LAW
 * ------------------------------------------------------------
 *
 * Same source question
 *        +
 * Same modalityIndex
 *        +
 * Same mutator version
 *        ↓
 * Same concept
 *        ↓
 * Same mutation plan
 *        ↓
 * Same parameters
 *        ↓
 * Same calculation
 *        ↓
 * Same answer
 *        ↓
 * Same distractors
 *        ↓
 * Same question
 *
 * IMPORTANT
 * ------------------------------------------------------------
 *
 * This engine deliberately contains:
 *
 * - NO Math.random()
 * - NO random number generator
 * - NO hash-based randomness
 * - NO seed
 * - NO pseudo-random selection
 * - NO array shuffling
 *
 * All mutation decisions are controlled by explicit,
 * educational meaningful deterministic sequences.
 *
 * modalityIndex:
 *
 * 0 → Variant A
 * 1 → Variant B
 * 2 → Variant C
 * 3 → Variant D
 * 4 → Variant A
 * ...
 *
 * Public API:
 *
 * mutate(qObj, modalityIndex)
 *
 * Existing integrations can continue using the same API.
 */

export class BusinessMutator {
  constructor() {
    this.version = "5.0.0";

    this.currency = "KSh";

    // =========================================================
    // FIXED EDUCATIONAL DOMAINS
    // =========================================================

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

    /*
     * Explicit mutation plans.
     *
     * These are NOT randomly selected.
     *
     * They are tied directly to the four modality variants.
     */
    this.mutationPlans = [
      "DIRECT_RECALCULATION",
      "MCQ_APPLICATION",
      "ERROR_DIAGNOSIS",
      "TRANSFER_APPLICATION",
    ];
  }

  // =========================================================
  // DETERMINISTIC CORE
  // =========================================================

  /**
   * Normalize modality index to 0–3.
   *
   * This is the ONLY variant selector.
   */
  _variant(index = 0) {
    const value = Number.isFinite(Number(index))
      ? Math.floor(Number(index))
      : 0;

    return ((value % 4) + 4) % 4;
  }

  /**
   * Get the deterministic mutation plan for the variant.
   */
  _mutationPlan(variant) {
    return (
      this.mutationPlans[
        this._variant(variant)
      ] ||
      this.mutationPlans[0]
    );
  }

  /**
   * Deterministically select an item from an explicit
   * educational sequence.
   *
   * This is NOT random selection.
   */
  _at(array, index = 0) {
    if (!Array.isArray(array) || array.length === 0) {
      return undefined;
    }

    const normalized =
      ((Math.floor(index) % array.length) +
        array.length) %
      array.length;

    return array[normalized];
  }

  /**
   * Select an item from a fixed sequence.
   */
  _sequenceValue(array, variant, offset = 0) {
    return this._at(
      array,
      this._variant(variant) + offset
    );
  }

  // =========================================================
  // FORMATTING
  // =========================================================

  _money(value) {
    if (!Number.isFinite(Number(value))) {
      return `${this.currency} 0`;
    }

    return `${this.currency} ${Math.round(
      Number(value)
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

  // =========================================================
  // MCQ ENGINE
  // =========================================================

  /**
   * Deterministic MCQ builder.
   *
   * IMPORTANT:
   * ---------------------------------------------------------
   * Options are NEVER shuffled.
   *
   * The correct answer is moved to a deterministic position
   * controlled only by the modality variant.
   */
  _mcq(correct, distractors, variant = 0) {
    const unique = [];

    const candidates = [
      correct,
      ...(Array.isArray(distractors)
        ? distractors
        : []),
    ];

    for (const answer of candidates) {
      if (
        answer !== undefined &&
        answer !== null &&
        String(answer).trim() !== "" &&
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

    const correctIndex =
      options.indexOf(correct);

    if (correctIndex === -1) {
      return options;
    }

    if (options.length <= 1) {
      return options;
    }

    const target =
      this._variant(variant) %
      options.length;

    if (correctIndex !== target) {
      [
        options[correctIndex],
        options[target],
      ] = [
        options[target],
        options[correctIndex],
      ];
    }

    return options;
  }

  // =========================================================
  // NUMBER EXTRACTION
  // =========================================================

  _extractMoney(stem) {
    if (!stem) {
      return null;
    }

    /*
     * Accept:
     *
     * KSh 5,000
     * KES 5000
     * Sh 5000
     * 5000 shillings
     */
    const match =
      stem.match(
        /(?:ksh|kes|sh|shilling[s]?)\s*([\d,]+(?:\.\d+)?)|([\d,]+(?:\.\d+)?)\s*(?:ksh|kes|sh|shilling[s]?)/i
      );

    if (!match) {
      return null;
    }

    const value =
      match[1] !== undefined
        ? match[1]
        : match[2];

    return parseFloat(
      value.replace(/,/g, "")
    );
  }

  _extractPercent(stem) {
    if (!stem) {
      return null;
    }

    const match =
      stem.match(
        /(\d+(?:\.\d+)?)\s*%/
      );

    return match
      ? parseFloat(match[1])
      : null;
  }

  _extractNumbers(stem) {
    if (!stem) {
      return [];
    }

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
  // TEXT UTILITIES
  // =========================================================

  _lower(stem) {
    return String(stem || "").toLowerCase();
  }

  _hasAny(text, terms) {
    const lower =
      this._lower(text);

    return terms.some(
      term => {
        const t = String(term).toLowerCase();
        if (t.length <= 3) {
          const regex = new RegExp(`(^|[^a-z0-9])${t}([^a-z0-9]|$)`, "i");
          return regex.test(lower);
        }
        return lower.includes(t);
      }
    );
  }

  _cleanQuestion(qObj) {
    return (
      qObj?.q ||
      qObj?.stem ||
      ""
    )
      .toString()
      .trim();
  }

  // =========================================================
  // RESULT METADATA
  // =========================================================

  _attachMetadata(result, {
    variant,
    concept,
    mutationType = "deterministic",
    sourceQuestion = "",
  }) {
    if (!result) {
      return result;
    }

    const normalizedVariant =
      this._variant(variant);

    return {
      ...result,

      metadata: {
        ...(result.metadata || {}),
        verified: true,
        mutationStatus: "VERIFIED",
        provenance: {
          ...(result.metadata?.provenance || {}),
          mutationVerified: true,
          conceptPreserved: true,
        },
        mutationPlan: this._mutationPlan(normalizedVariant),
        concept,
      },

      mutationVersion:
        this.version,

      mutationStatus:
        "verified",

      mutationType,

      mutationPlan:
        this._mutationPlan(
          normalizedVariant
        ),

      modalityIndex:
        normalizedVariant,

      concept,

      sourceQuestion:
        sourceQuestion,
    };
  }

  // =========================================================
  // PROFIT / LOSS
  // =========================================================

  _generateProfit(stem, variant) {
    const v =
      this._variant(variant);

    const cost =
      this._sequenceValue(
        [
          2000,
          4000,
          6000,
          8000,
        ],
        v
      );

    const rate =
      this._sequenceValue(
        [10, 15, 20, 25],
        v
      );

    const lower =
      this._lower(stem);

    const explicitLoss =
      lower.includes("loss");

    const explicitProfit =
      lower.includes("profit");

    /*
     * Deterministic interpretation:
     *
     * Explicit source wording wins.
     *
     * If neither is explicit:
     * A/B → profit
     * C/D → loss
     */
    const isLoss =
      explicitLoss
        ? true
        : explicitProfit
        ? false
        : v >= 2;

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

    if (v === 0) {
      return this._attachMetadata(
        {
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
              isLoss
                ? "subtract"
                : "add"
            } it.`,

          why:
            `${direction} = ${rate}% × ${this._money(
              cost
            )} = ${this._money(
              amount
            )}.`,

          sol: answer,

          steps: this._steps([
            `Calculate ${rate}% of ${this._money(
              cost
            )}: ${this._money(amount)}.`,

            `${
              isLoss
                ? "Subtract"
                : "Add"
            } the ${direction} ${
              isLoss
                ? "from"
                : "to"
            } the cost price.`,

            `Selling price = ${answer}.`,
          ]),

          type: "open_response",
          options: null,
        },
        {
          variant: v,
          concept:
            "profit_loss_selling_price",
          sourceQuestion: stem,
        }
      );
    }

    if (v === 1) {
      return this._attachMetadata(
        {
          q:
            `A product costing ${this._money(
              cost
            )} is sold at a ${rate}% ${
              isLoss
                ? "loss"
                : "profit"
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

          options:
            this._mcq(
              answer,
              distractors,
              v
            ),
        },
        {
          variant: v,
          concept:
            "profit_loss_selling_price",
          sourceQuestion: stem,
        }
      );
    }

    if (v === 2) {
      const wrong =
        isLoss
          ? sellingPrice + 500
          : sellingPrice - 500;

      return this._attachMetadata(
        {
          q:
            `A trader bought goods for ${this._money(
              cost
            )} and sold them at a ${rate}% ${
              isLoss
                ? "loss"
                : "profit"
            }. An accountant recorded the selling price as ${this._money(
              wrong
            )}. Is the record correct? Give the correct selling price.`,

          ans:
            `Incorrect. The correct selling price is ${answer}.`,

          hint:
            `Calculate the ${rate}% ${
              isLoss
                ? "loss"
                : "profit"
            } from the cost price.`,

          why:
            `The ${rate}% amount is ${this._money(
              amount
            )}, giving a selling price of ${answer}.`,

          sol:
            `Incorrect. Correct selling price = ${answer}.`,

          steps: this._steps([
            `Calculate the ${rate}% amount.`,
            `Apply the ${
              isLoss
                ? "loss"
                : "profit"
            } to the cost price.`,
            `Compare the calculated value with the recorded value.`,
            `The correct selling price is ${answer}.`,
          ]),

          type: "open_response",
          options: null,
        },
        {
          variant: v,
          concept:
            "profit_loss_error_diagnosis",
          sourceQuestion: stem,
        }
      );
    }

    return this._attachMetadata(
      {
        q:
          `A business buys stock for ${this._money(
            cost
          )} and earns a ${rate}% ${
            isLoss
              ? "loss"
              : "profit"
          } based on cost. State the formula and calculate the selling price.`,

        ans:
          `Selling Price = Cost Price ${
            isLoss
              ? "-"
              : "+"
          } ${rate}% of Cost Price = ${answer}.`,

        hint:
          `Selling Price = Cost Price ${
            isLoss
              ? "-"
              : "+"
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
      },
      {
        variant: v,
        concept:
          "profit_loss_selling_price",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // REVENUE
  // =========================================================

  _generateRevenue(stem, variant) {
    const v =
      this._variant(variant);

    const quantity =
      this._sequenceValue(
        [20, 40, 60, 80],
        v
      );

    const price =
      this._sequenceValue(
        [100, 200, 300, 400],
        v
      );

    const revenue =
      quantity * price;

    const answer =
      this._money(revenue);

    return this._attachMetadata(
      {
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
          v === 0
            ? "open_response"
            : "mcq",

        options:
          v === 0
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
                v
              ),
      },
      {
        variant: v,
        concept:
          "revenue",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // NET PROFIT
  // =========================================================

  _generateNetProfit(stem, variant) {
    const v =
      this._variant(variant);

    const revenue =
      this._sequenceValue(
        [
          20000,
          30000,
          40000,
          50000,
        ],
        v
      );

    const cost =
      this._sequenceValue(
        [
          10000,
          15000,
          20000,
          25000,
        ],
        v
      );

    const expenses =
      this._sequenceValue(
        [
          2000,
          3000,
          4000,
          5000,
        ],
        v
      );

    const grossProfit =
      revenue - cost;

    const netProfit =
      grossProfit - expenses;

    const answer =
      this._money(netProfit);

    return this._attachMetadata(
      {
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
          v === 0
            ? "open_response"
            : "mcq",

        options:
          v === 0
            ? null
            : this._mcq(
                answer,
                [
                  this._money(
                    grossProfit
                  ),

                  this._money(
                    revenue - expenses
                  ),

                  this._money(cost),
                ],
                v
              ),
      },
      {
        variant: v,
        concept:
          "net_profit",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // DISCOUNT
  // =========================================================

  _generateDiscount(stem, variant) {
    const v =
      this._variant(variant);

    const markedPrice =
      this._sequenceValue(
        [
          2000,
          4000,
          6000,
          8000,
        ],
        v
      );

    const rate =
      this._sequenceValue(
        [10, 15, 20, 25],
        v
      );

    const discount =
      markedPrice * rate / 100;

    const sellingPrice =
      markedPrice - discount;

    const answer =
      this._money(sellingPrice);

    return this._attachMetadata(
      {
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
          v === 0
            ? "open_response"
            : "mcq",

        options:
          v === 0
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
                v
              ),
      },
      {
        variant: v,
        concept:
          "discount_selling_price",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // SIMPLE INTEREST
  // =========================================================

  _generateSimpleInterest(stem, variant) {
    const v =
      this._variant(variant);

    const principal =
      this._sequenceValue(
        [
          10000,
          20000,
          30000,
          40000,
        ],
        v
      );

    const rate =
      this._sequenceValue(
        [5, 6, 8, 10],
        v
      );

    const years =
      this._sequenceValue(
        [1, 2, 3, 4],
        v
      );

    const interest =
      principal *
      rate *
      years /
      100;

    const amount =
      principal + interest;

    const askingAmount =
      v !== 0;

    const answer =
      askingAmount
        ? this._money(amount)
        : this._money(interest);

    return this._attachMetadata(
      {
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
          v === 0
            ? "open_response"
            : "mcq",

        options:
          v === 0
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
                v
              ),
      },
      {
        variant: v,
        concept:
          "simple_interest",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // VAT / TAX
  // =========================================================

  _generateTax(stem, variant) {
    const v =
      this._variant(variant);

    const price =
      this._sequenceValue(
        [
          5000,
          10000,
          15000,
          20000,
        ],
        v
      );

    const rate =
      this._sequenceValue(
        [8, 10, 12, 16],
        v
      );

    const tax =
      price * rate / 100;

    const inclusive =
      price + tax;

    const answer =
      this._money(inclusive);

    return this._attachMetadata(
      {
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
          v === 0
            ? "open_response"
            : "mcq",

        options:
          v === 0
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
                v
              ),
      },
      {
        variant: v,
        concept:
          "tax_inclusive_price",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // BREAK EVEN
  // =========================================================

  _generateBreakEven(stem, variant) {
    const v =
      this._variant(variant);

    const fixedCost =
      this._sequenceValue(
        [
          10000,
          20000,
          30000,
          40000,
        ],
        v
      );

    const sellingPrice =
      this._sequenceValue(
        [
          100,
          200,
          300,
          400,
        ],
        v
      );

    const variableCost =
      this._sequenceValue(
        [
          40,
          80,
          120,
          160,
        ],
        v
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

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
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
            v
          ),
      },
      {
        variant: v,
        concept:
          "break_even_output",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // SCARCITY / OPPORTUNITY COST
  // =========================================================

  _generateScarcity(stem, variant) {
    const v =
      this._variant(variant);

    const capital =
      this._sequenceValue(
        [
          30000,
          40000,
          50000,
          60000,
        ],
        v
      );

    const optionA =
      this._sequenceValue(
        [
          20000,
          25000,
          30000,
          35000,
        ],
        v
      );

    const optionB =
      this._sequenceValue(
        [
          20000,
          25000,
          30000,
          35000,
        ],
        v
      );

    const correct =
      "Scarcity requiring choice and creating opportunity cost";

    return this._attachMetadata(
      {
        q:
          `A business has ${this._money(
            capital
          )} available. The owner wants to spend ${this._money(
            optionA
          )} on new equipment and ${this._money(
            optionB
          )} on advertising. The owner cannot afford both. What economic problem is illustrated?`,

        ans: correct,

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

        options:
          this._mcq(
            correct,
            [
              "Inflation caused by excessive money supply",
              "Economies of scale caused by increased production",
              "Market equilibrium caused by equal demand and supply",
            ],
            v
          ),
      },
      {
        variant: v,
        concept:
          "scarcity_opportunity_cost",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // DEMAND / SUPPLY
  // =========================================================

  _generateDemandSupply(stem, variant) {
    const v =
      this._variant(variant);

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
        v
      );

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
            scenario.answer,
            [
              "Demand becomes perfectly inelastic",
              "Market becomes a monopoly",
              "Equilibrium price must immediately become zero",
            ],
            v
          ),
      },
      {
        variant: v,
        concept:
          "demand_supply",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // INFLATION
  // =========================================================

  _generateInflation(stem, variant) {
    const v =
      this._variant(variant);

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
        v
      );

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
            scenario.ans,
            [
              "Deflation",
              "Unemployment",
              "Economic growth",
            ],
            v
          ),
      },
      {
        variant: v,
        concept:
          "inflation",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // MARKET STRUCTURES
  // =========================================================

  _generateMarketStructure(stem, variant) {
    const v =
      this._variant(variant);

    const scenarios = [
      {
        clue:
          "A market has one dominant seller and very high barriers to entry.",

        answer:
          "Monopoly",

        explanation:
          "A monopoly is characterized by a single dominant supplier and significant barriers to entry.",
      },

      {
        clue:
          "A market contains many firms selling differentiated products.",

        answer:
          "Monopolistic competition",

        explanation:
          "Many firms compete while differentiating their products through branding, quality or other features.",
      },

      {
        clue:
          "A market is dominated by a small number of large firms whose decisions affect one another.",

        answer:
          "Oligopoly",

        explanation:
          "Oligopoly involves a small number of interdependent large firms.",
      },

      {
        clue:
          "Many firms sell identical products and no individual firm can influence the market price.",

        answer:
          "Perfect competition",

        explanation:
          "Under the simplified perfect competition model, firms are price takers.",
      },
    ];

    const scenario =
      this._at(
        scenarios,
        v
      );

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
            scenario.answer,
            this.marketStructures.filter(
              x => x !== scenario.answer
            ),
            v
          ),
      },
      {
        variant: v,
        concept:
          "market_structures",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // SOURCES OF FINANCE
  // =========================================================

  _generateFinanceSource(stem, variant) {
    const v =
      this._variant(variant);

    const scenarios = [
      {
        q:
          "A business allows a supplier to provide goods now and receive payment later. What source of finance is being used?",

        answer:
          "Trade credit",

        why:
          "Trade credit allows a business to obtain goods or services now and pay the supplier later.",
      },

      {
        q:
          "A business obtains money from a bank and agrees to repay it with interest over an agreed period.",

        answer:
          "Bank loan",

        why:
          "A bank loan provides borrowed funds that are repaid according to agreed terms, normally with interest.",
      },

      {
        q:
          "A business uses accumulated profits from previous years to finance expansion.",

        answer:
          "Retained profit",

        why:
          "Retained profit is internally generated finance kept in the business rather than distributed to owners.",
      },

      {
        q:
          "An owner uses personal savings to establish a business.",

        answer:
          "Owner's capital",

        why:
          "The owner is providing personal funds as capital for the business.",
      },
    ];

    const scenario =
      this._at(
        scenarios,
        v
      );

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
            scenario.answer,
            this.financeSources.filter(
              x => x !== scenario.answer
            ),
            v
          ),
      },
      {
        variant: v,
        concept:
          "sources_of_finance",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // ENTREPRENEURSHIP
  // =========================================================

  _generateEntrepreneurship(stem, variant) {
    const v =
      this._variant(variant);

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
        v
      );

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
            scenario.answer,
            [
              "Liquidity",
              "Depreciation",
              "Specialization",
            ],
            v
          ),
      },
      {
        variant: v,
        concept:
          "entrepreneurship",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // BUSINESS ENVIRONMENT
  // =========================================================

  _generateBusinessEnvironment(stem, variant) {
    const v =
      this._variant(variant);

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
        v
      );

    return this._attachMetadata(
      {
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

        options:
          this._mcq(
            scenario.answer,
            [
              "Always an accounting error",
              "Always a production objective",
              "A personal financial decision",
            ],
            v
          ),
      },
      {
        variant: v,
        concept:
          "business_environment",
        sourceQuestion: stem,
      }
    );
  }

  // =========================================================
  // REVERSE DIAGNOSTIC
  // =========================================================

  _reverseDiagnostic(qObj, stem) {
    const answer =
      String(
        qObj?.ans || ""
      ).trim();

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

      mutationVersion:
        this.version,

      mutationStatus:
        "verified",

      mutationType:
        "reverse_diagnostic",

      mutationPlan:
        "REVERSE_DIAGNOSTIC",

      concept:
        "reverse_business_diagnosis",
    };
  }

  // =========================================================
  // GENERIC DETERMINISTIC MUTATION
  // =========================================================

  _genericMutation(qObj, stem, variant) {
    const v =
      this._variant(variant);

    const numbers =
      this._extractNumbers(stem);

    /*
     * If there are no numerical parameters,
     * do NOT invent a numerical mutation.
     *
     * Instead turn the question into a deterministic
     * application check.
     */
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

        mutationVersion:
          this.version,

        mutationStatus:
          "verified",

        mutationType:
          "generic_application",

        mutationPlan:
          this._mutationPlan(v),

        modalityIndex:
          v,

        concept:
          "generic_business_application",
      };
    }

    const original =
      numbers[0];

    if (!Number.isFinite(original)) {
      return {
        ...qObj,

        mutationVersion:
          this.version,

        mutationStatus:
          "skipped_unsafe",

        mutationType:
          "safe_fallback",

        mutationPlan:
          "SAFE_FALLBACK",

        modalityIndex:
          v,
      };
    }

    /*
     * Explicit educational progression.
     *
     * A → ×2
     * B → ×3
     * C → ×4
     * D → ×5
     */
    const multiplier =
      [2, 3, 4, 5][v];

    const mutated =
      Math.round(
        original *
          multiplier
      );

    if (
      !Number.isFinite(mutated) ||
      mutated === original
    ) {
      return {
        ...qObj,

        mutationVersion:
          this.version,

        mutationStatus:
          "skipped_unsafe",

        mutationType:
          "safe_fallback",

        mutationPlan:
          "SAFE_FALLBACK",

        modalityIndex:
          v,
      };
    }

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

      mutationVersion:
        this.version,

      mutationStatus:
        "verified",

      mutationType:
        "generic_parameter",

      mutationPlan:
        this._mutationPlan(v),

      modalityIndex:
        v,

      concept:
        "generic_business_parameter",
    };
  }

  // =========================================================
  // SAFE RESULT VALIDATION
  // =========================================================

  _validateResult(result) {
    if (!result) {
      return false;
    }

    if (
      typeof result.q !== "string" ||
      result.q.trim() === ""
    ) {
      return false;
    }

    if (
      typeof result.ans !== "string" ||
      result.ans.trim() === ""
    ) {
      return false;
    }

    if (
      !result.mutationVersion ||
      !result.mutationStatus
    ) {
      return false;
    }

    if (
      !Number.isInteger(
        result.modalityIndex
      )
    ) {
      return false;
    }

    if (
      result.type === "mcq"
    ) {
      if (
        !Array.isArray(
          result.options
        )
      ) {
        return false;
      }

      if (
        result.options.length !== 4
      ) {
        return false;
      }

      const unique =
        new Set(
          result.options
        );

      if (
        unique.size !== 4
      ) {
        return false;
      }

      if (
        !result.options.includes(
          result.ans
        )
      ) {
        return false;
      }
    }

    if (
      result.type !== "mcq" &&
      result.options !== null &&
      result.options !== undefined
    ) {
      return false;
    }

    return true;
  }

  // =========================================================
  // FALLBACK
  // =========================================================

  _safeFallback(qObj, stem, variant) {
    const v =
      this._variant(variant);

    return {
      ...qObj,

      q: stem,

      mutationVersion:
        this.version,

      mutationStatus:
        "skipped_unsafe",

      mutationType:
        "safe_fallback",

      mutationPlan:
        "SAFE_FALLBACK",

      modalityIndex:
        v,

      concept:
        "unverified_business_question",
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
      this._cleanQuestion(qObj);

    if (!stem) {
      return qObj;
    }

    const lower =
      this._lower(stem);

    const variant =
      this._variant(
        modalityIndex
      );

    let result = null;

    // =======================================================
    // FINANCIAL MATHEMATICS
    // =======================================================

    /*
     * IMPORTANT:
     *
     * Highly specific concepts MUST be detected before
     * generic concepts.
     *
     * Otherwise:
     *
     * "Calculate net profit"
     *
     * contains "profit" and could incorrectly enter the
     * simple profit generator.
     */

    if (
      this._hasAny(
        lower,
        [
          "net profit",
          "gross profit",
          "operating expenses",
          "cost of goods sold",
        ]
      )
    ) {
      result =
        this._generateNetProfit(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
        lower,
        [
          "break even",
          "break-even",
          "fixed cost",
          "contribution",
        ]
      )
    ) {
      result =
        this._generateBreakEven(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
        lower,
        [
          "simple interest",
          "interest rate",
          "principal",
        ]
      )
    ) {
      result =
        this._generateSimpleInterest(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
        lower,
        [
          "discount",
          "marked price",
          "trade discount",
        ]
      )
    ) {
      result =
        this._generateDiscount(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
        lower,
        [
          "vat",
          "tax",
          "taxation",
        ]
      )
    ) {
      result =
        this._generateTax(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
        lower,
        [
          "revenue",
          "sales revenue",
        ]
      )
    ) {
      result =
        this._generateRevenue(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
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
      result =
        this._generateProfit(
          stem,
          variant
        );
    }

    // =======================================================
    // ECONOMICS
    // =======================================================

    else if (
      this._hasAny(
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
      result =
        this._generateScarcity(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
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
      result =
        this._generateInflation(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
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
      result =
        this._generateMarketStructure(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
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
      result =
        this._generateDemandSupply(
          stem,
          variant
        );
    }

    // =======================================================
    // BUSINESS STUDIES
    // =======================================================

    else if (
      this._hasAny(
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
          "debenture",
        ]
      )
    ) {
      result =
        this._generateFinanceSource(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
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
      result =
        this._generateEntrepreneurship(
          stem,
          variant
        );
    }

    else if (
      this._hasAny(
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
      result =
        this._generateBusinessEnvironment(
          stem,
          variant
        );
    }

    // =======================================================
    // REVERSE DIAGNOSTIC
    // =======================================================

    if (!result) {
      result =
        this._reverseDiagnostic(
          qObj,
          stem
        );
    }

    // =======================================================
    // GENERIC FALLBACK
    // =======================================================

    if (!result) {
      result =
        this._genericMutation(
          qObj,
          stem,
          variant
        );
    }

    // =======================================================
    // FINAL SAFETY CHECK
    // =======================================================

    if (
      !this._validateResult(
        result
      )
    ) {
      return this._safeFallback(
        qObj,
        stem,
        variant
      );
    }

    return result;
  }

  // =========================================================
  // SAFE MUTATION API
  // =========================================================

  /**
   * Optional hardened API.
   *
   * This is useful for Tixar's adaptive engine because
   * invalid mutations are never allowed to escape.
   */
  safeMutate(qObj, modalityIndex = 0) {
    const result =
      this.mutate(
        qObj,
        modalityIndex
      );

    if (
      !this._validateResult(
        result
      )
    ) {
      return this._safeFallback(
        qObj,
        this._cleanQuestion(qObj),
        modalityIndex
      );
    }

    return result;
  }

  // =========================================================
  // EXTERNAL VALIDATOR
  // =========================================================

  /**
   * Public validator for tests and Tixar's contract system.
   */
  validateQuestion(result) {
    return this._validateResult(
      result
    );
  }
}

export default BusinessMutator;