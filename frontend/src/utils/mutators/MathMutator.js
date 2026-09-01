/**
 * TIXAR MATH MUTATOR v2
 *
 * Philosophy:
 *
 * Question
 *   |
 * Identify skill
 *   |
 * Select difficulty
 *   |
 * Generate valid parameters
 *   |
 * Solve exactly
 *   |
 * Generate misconception distractors
 *   |
 * Validate
 *   |
 * Return assessment item
 *
 * The mutator should NEVER change the mathematical concept
 * unless explicitly instructed to do so.
 */

export class MathMutator {
  constructor(config = {}) {
    this.config = {
      maxRetries: 20,
      defaultDifficulty: 1,
      useSeed: config.useSeed ?? false,
      seed: config.seed ?? Date.now(),
      ...config
    };

    this.rng = this._createRNG(this.config.seed);
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  mutate(qObj, modalityIndex = 0, performanceContext = {}) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();

    if (!stem) return null;

    const difficulty = this._determineDifficulty(
      qObj,
      performanceContext
    );

    const skill = this._classifySkill(stem);

    const generator = this._getGenerator(skill);

    if (!generator) {
      return this._fallback(qObj, modalityIndex, difficulty);
    }

    for (let attempt = 0; attempt < this.config.maxRetries; attempt++) {
      const generated = generator.call(
        this,
        qObj,
        difficulty,
        performanceContext
      );

      if (generated && this._validateQuestion(generated)) {
        return this._finalize(
          generated,
          modalityIndex,
          skill,
          difficulty
        );
      }
    }

    return this._fallback(qObj, modalityIndex, difficulty);
  }

  // ============================================================
  // SKILL CLASSIFICATION
  // ============================================================

  _classifySkill(stem) {
    const text = stem.toLowerCase();

    /*
     * Order matters.
     * More specific patterns come first.
     */

    if (
      /quadratic|x\^2|factor.*quadratic|solve.*quadratic/.test(text)
    ) {
      return "quadratic";
    }

    if (
      /simple interest|compound interest|interest rate/.test(text)
    ) {
      return "interest";
    }

    if (
      /discount|sale price|marked price|selling price/.test(text)
    ) {
      return "discount";
    }

    if (
      /profit|loss|cost price|profit percentage/.test(text)
    ) {
      return "profit_loss";
    }

    if (
      /percentage|percent|increase|decrease/.test(text)
    ) {
      return "percentage";
    }

    if (
      /simultaneous|simultaneous equations|two equations/.test(text)
    ) {
      return "simultaneous";
    }

    if (
      /linear equation|solve for x|equation/.test(text) &&
      /x/.test(text)
    ) {
      return "linear";
    }

    if (
      /circumference|circle|radius|diameter/.test(text)
    ) {
      return "circle";
    }

    if (
      /rectangle|length.*width|width.*length/.test(text)
    ) {
      return "rectangle";
    }

    if (
      /triangle|base.*height|height.*base/.test(text)
    ) {
      return "triangle";
    }

    if (
      /area|perimeter|volume|surface area/.test(text)
    ) {
      return "measurement";
    }

    if (
      /speed|distance|time|velocity|km\/h|m\/s/.test(text)
    ) {
      return "kinematics";
    }

    if (
      /fraction|numerator|denominator/.test(text)
    ) {
      return "fraction";
    }

    if (
      /ratio|proportion|scale/.test(text)
    ) {
      return "ratio";
    }

    return "generic";
  }

  _getGenerator(skill) {
    const generators = {
      linear: this._generateLinear,
      quadratic: this._generateQuadratic,
      percentage: this._generatePercentage,
      discount: this._generateDiscount,
      profit_loss: this._generateProfitLoss,
      interest: this._generateInterest,
      rectangle: this._generateRectangle,
      circle: this._generateCircle,
      triangle: this._generateTriangle,
      kinematics: this._generateKinematics,
      fraction: this._generateFraction,
      ratio: this._generateRatio,
      simultaneous: this._generateSimultaneous,
      measurement: this._generateMeasurement
    };

    return generators[skill];
  }

  // ============================================================
  // DIFFICULTY ENGINE
  // ============================================================

  _determineDifficulty(qObj, context) {
    if (typeof context.difficulty === "number") {
      return this._clamp(Math.round(context.difficulty), 1, 5);
    }

    if (typeof context.level === "number") {
      return this._clamp(Math.round(context.level), 1, 5);
    }

    const attempts = Number(qObj._attemptCount || 0);

    const accuracy = Number(
      context.recentAccuracy ??
      context.accuracy ??
      0.5
    );

    /*
     * Tixar principle:
     *
     * High mastery -> increase difficulty
     * Low mastery -> simplify
     */

    if (accuracy >= 0.85) return 4;
    if (accuracy >= 0.70) return 3;
    if (accuracy >= 0.50) return 2;

    if (attempts > 2) return 1;

    return this.config.defaultDifficulty;
  }

  // ============================================================
  // LINEAR EQUATIONS
  // ============================================================

  _generateLinear(_qObj, difficulty) {
    let a;
    let b;
    let x;

    if (difficulty <= 2) {
      a = this._randInt(2, 8);
      x = this._randInt(1, 10);
      b = this._randInt(1, 15);
    } else {
      a = this._randInt(3, 12);
      x = this._randInt(-8, 12);
      b = this._randInt(-15, 20);
    }

    const c = a * x + b;

    const sign = b >= 0 ? "+" : "-";
    const absB = Math.abs(b);

    const equation = `${a}x ${sign} ${absB} = ${c}`;

    const distractors = [
      x + 1,
      x - 1,
      c / a,
      -x
    ];

    return {
      q: `Solve for x: ${equation}`,
      ans: String(x),

      hint: `Isolate the constant term, then divide by the coefficient of x.`,

      steps: [
        `Step 1: ${a}x ${sign} ${absB} = ${c}`,
        `Step 2: ${a}x = ${c} ${b >= 0 ? "-" : "+"} ${absB}`,
        `Step 3: ${a}x = ${a * x}`,
        `Step 4: x = ${a * x} / ${a}`,
        `Step 5: x = ${x}`
      ],

      sol: `x = ${x}`,

      misconceptionMap: {
        [x + 1]: "Incorrectly adjusted x by 1.",
        [x - 1]: "Incorrectly adjusted x by 1.",
        [c / a]: "Stopped before isolating x correctly.",
        [-x]: "Sign error while solving."
      },

      metadata: {
        skill: "linear_equation",
        variables: { a, b, c, x }
      },

      options: distractors
    };
  }

  // ============================================================
  // QUADRATICS
  // ============================================================

  _generateQuadratic(_qObj, difficulty) {
    let p;
    let q;

    if (difficulty <= 2) {
      p = this._randInt(2, 6);
      q = this._randInt(3, 8);
    } else {
      p = this._randInt(-6, 6);
      q = this._randInt(-8, 8);

      if (p === 0) p = 2;
      if (q === 0) q = 3;
    }

    const b = -(p + q);
    const c = p * q;

    const bText = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

    const equation =
      `x^2 ${bText}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0`;

    const correct = [`x = ${p}`, `x = ${q}`];

    const distractors = [
      [`x = ${-p}`, `x = ${-q}`],
      [`x = ${p + q}`, `x = ${p * q}`],
      [`x = ${p}`, `x = ${-q}`]
    ];

    return {
      q: `Solve the quadratic equation: ${equation}`,

      ans: correct.join(" or "),

      hint:
        `Find two numbers whose product is ${c} and whose sum is ${b}.`,

      steps: [
        `Step 1: Write the equation in standard form.`,
        `Step 2: Factor: (x - ${p})(x - ${q}) = 0`,
        `Step 3: Set each factor equal to zero.`,
        `Step 4: x = ${p} or x = ${q}`
      ],

      sol:
        `(x - ${p})(x - ${q}) = 0 => x = ${p} or x = ${q}`,

      options: [
        correct.join(" or "),
        ...distractors.map(d => d.join(" or "))
      ],

      metadata: {
        skill: "quadratic_factorisation",
        variables: { p, q, b, c }
      }
    };
  }

  // ============================================================
  // PERCENTAGE
  // ============================================================

  _generatePercentage(_qObj, difficulty) {
    const base =
      difficulty <= 2
        ? this._randInt(10, 50) * 10
        : this._randInt(20, 200) * 10;

    const pct =
      difficulty <= 2
        ? this._choice([5, 10, 20, 25, 50])
        : this._choice([7, 12, 15, 18, 22, 30]);

    const result = base * pct / 100;

    return {
      q:
        `What is ${pct}% of ${base.toLocaleString()}?`,

      ans: this._formatNumber(result),

      hint:
        `Convert ${pct}% to a decimal or fraction, then multiply by ${base}.`,

      steps: [
        `Step 1: Convert ${pct}% to ${pct}/100.`,
        `Step 2: (${pct}/100) x ${base} = ${result}`,
        `Step 3: Answer = ${this._formatNumber(result)}`
      ],

      sol: this._formatNumber(result),

      options: this._numberDistractors(result, [
        base * (pct / 10) / 100,
        base - result,
        base + result
      ]),

      metadata: {
        skill: "percentage",
        variables: { base, pct, result }
      }
    };
  }

  // ============================================================
  // DISCOUNT
  // ============================================================

  _generateDiscount() {
    const price = this._randInt(5, 50) * 100;
    const pct = this._choice([5, 10, 15, 20, 25, 30]);

    const discount = price * pct / 100;
    const finalPrice = price - discount;

    return {
      q:
        `A shop sells an item for KSh ${price.toLocaleString()} ` +
        `and offers a ${pct}% discount. ` +
        `How much does the customer pay?`,

      ans: `KSh ${this._formatNumber(finalPrice)}`,

      hint:
        `First calculate the discount, then subtract it from the original price.`,

      steps: [
        `Step 1: Discount = ${pct}% x ${price}`,
        `Step 2: Discount = KSh ${this._formatNumber(discount)}`,
        `Step 3: Amount paid = ${price} - ${discount}`,
        `Step 4: Amount paid = KSh ${this._formatNumber(finalPrice)}`
      ],

      sol:
        `KSh ${this._formatNumber(finalPrice)}`,

      options: [
        `KSh ${this._formatNumber(finalPrice)}`,
        `KSh ${this._formatNumber(price + discount)}`,
        `KSh ${this._formatNumber(discount)}`,
        `KSh ${this._formatNumber(price - discount / 2)}`
      ],

      metadata: {
        skill: "discount",
        variables: {
          price,
          pct,
          discount,
          finalPrice
        }
      }
    };
  }

  // ============================================================
  // PROFIT / LOSS
  // ============================================================

  _generateProfitLoss() {
    const costPrice = this._randInt(5, 50) * 100;
    const profitPct = this._choice([5, 10, 15, 20, 25]);

    const profit = costPrice * profitPct / 100;
    const sellingPrice = costPrice + profit;

    return {
      q:
        `A trader buys an item for KSh ${costPrice.toLocaleString()} ` +
        `and makes a ${profitPct}% profit. ` +
        `Find the selling price.`,

      ans:
        `KSh ${this._formatNumber(sellingPrice)}`,

      hint:
        `Calculate the profit first, then add it to the cost price.`,

      steps: [
        `Step 1: Profit = ${profitPct}% of ${costPrice}`,
        `Step 2: Profit = KSh ${this._formatNumber(profit)}`,
        `Step 3: Selling price = ${costPrice} + ${profit}`,
        `Step 4: Selling price = KSh ${this._formatNumber(sellingPrice)}`
      ],

      sol:
        `KSh ${this._formatNumber(sellingPrice)}`,

      options: [
        `KSh ${this._formatNumber(sellingPrice)}`,
        `KSh ${this._formatNumber(costPrice - profit)}`,
        `KSh ${this._formatNumber(profit)}`,
        `KSh ${this._formatNumber(costPrice + profit * 2)}`
      ],

      metadata: {
        skill: "profit_loss",
        variables: {
          costPrice,
          profitPct,
          profit,
          sellingPrice
        }
      }
    };
  }

  // ============================================================
  // INTEREST
  // ============================================================

  _generateInterest(_qObj, difficulty) {
    const principal = this._randInt(5, 50) * 1000;
    const rate = this._choice([5, 10, 12, 15]);

    const years =
      difficulty <= 2
        ? this._randInt(1, 3)
        : this._randInt(2, 5);

    const interest = principal * rate * years / 100;
    const amount = principal + interest;

    return {
      q:
        `Find the simple interest on KSh ${principal.toLocaleString()} ` +
        `at ${rate}% per annum for ${years} year${years > 1 ? "s" : ""}.`,

      ans:
        `KSh ${this._formatNumber(interest)}`,

      hint:
        `Use I = PRT/100.`,

      steps: [
        `Step 1: P = ${principal}, R = ${rate}, T = ${years}`,
        `Step 2: I = (${principal} x ${rate} x ${years}) / 100`,
        `Step 3: I = KSh ${this._formatNumber(interest)}`
      ],

      sol:
        `KSh ${this._formatNumber(interest)}`,

      options: [
        `KSh ${this._formatNumber(interest)}`,
        `KSh ${this._formatNumber(amount)}`,
        `KSh ${this._formatNumber(principal * rate / 100)}`,
        `KSh ${this._formatNumber(principal - interest)}`
      ],

      metadata: {
        skill: "simple_interest",
        variables: {
          principal,
          rate,
          years,
          interest,
          amount
        }
      }
    };
  }

  // ============================================================
  // RECTANGLE
  // ============================================================

  _generateRectangle() {
    const length = this._randInt(5, 20);
    const width = this._randInt(2, 12);

    const askPerimeter =
      this._rng() > 0.5;

    const answer = askPerimeter
      ? 2 * (length + width)
      : length * width;

    const unit = askPerimeter ? "cm" : "cm2";

    return {
      q:
        `A rectangle has length ${length} cm and width ${width} cm. ` +
        `Find its ${askPerimeter ? "perimeter" : "area"}.`,

      ans: `${answer} ${unit}`,

      hint: askPerimeter
        ? `Use P = 2(L + W).`
        : `Use A = L x W.`,

      steps: askPerimeter
        ? [
            `Step 1: L = ${length}, W = ${width}`,
            `Step 2: P = 2(${length} + ${width})`,
            `Step 3: P = ${answer} cm`
          ]
        : [
            `Step 1: L = ${length}, W = ${width}`,
            `Step 2: A = ${length} x ${width}`,
            `Step 3: A = ${answer} cm2`
          ],

      sol: `${answer} ${unit}`,

      options: this._uniqueOptions([
        `${answer} ${unit}`,
        `${length + width} ${unit}`,
        `${2 * length + width} ${unit}`,
        `${length * width === answer ? 2 * (length + width) : length * width} ${unit}`
      ]),

      metadata: {
        skill: askPerimeter
          ? "rectangle_perimeter"
          : "rectangle_area",
        variables: {
          length,
          width,
          answer
        }
      }
    };
  }

  // ============================================================
  // CIRCLE
  // ============================================================

  _generateCircle() {
    const radius = this._choice([7, 14, 21, 28]);
    const pi = 22 / 7;

    const askArea = this._rng() > 0.5;

    const answer = askArea
      ? pi * radius * radius
      : 2 * pi * radius;

    const unit = askArea ? "cm2" : "cm";

    return {
      q:
        `A circle has radius ${radius} cm. ` +
        `Taking pi = 22/7, calculate its ` +
        `${askArea ? "area" : "circumference"}.`,

      ans: `${answer} ${unit}`,

      hint: askArea
        ? `Use A = pi*r^2.`
        : `Use C = 2*pi*r.`,

      steps: askArea
        ? [
            `Step 1: A = pi*r^2`,
            `Step 2: A = (22/7) x ${radius}^2`,
            `Step 3: A = ${answer} cm2`
          ]
        : [
            `Step 1: C = 2*pi*r`,
            `Step 2: C = 2 x (22/7) x ${radius}`,
            `Step 3: C = ${answer} cm`
          ],

      sol: `${answer} ${unit}`,

      options: this._uniqueOptions([
        `${answer} ${unit}`,
        `${answer / 2} ${unit}`,
        `${answer * 2} ${unit}`,
        `${radius * radius} ${unit}`
      ]),

      metadata: {
        skill: askArea
          ? "circle_area"
          : "circle_circumference",
        variables: { radius, answer }
      }
    };
  }

  // ============================================================
  // TRIANGLE
  // ============================================================

  _generateTriangle() {
    const base = this._randInt(4, 20);
    const height = this._randInt(3, 15);

    const area = 0.5 * base * height;

    return {
      q:
        `A triangle has a base of ${base} cm and a height of ` +
        `${height} cm. Calculate its area.`,

      ans: `${area} cm2`,

      hint:
        `Use A = (1/2) x base x height.`,

      steps: [
        `Step 1: A = (1/2) x b x h`,
        `Step 2: A = (1/2) x ${base} x ${height}`,
        `Step 3: A = ${area} cm2`
      ],

      sol: `${area} cm2`,

      options: this._uniqueOptions([
        `${area} cm2`,
        `${base * height} cm2`,
        `${base + height} cm2`,
        `${2 * area} cm2`
      ]),

      metadata: {
        skill: "triangle_area",
        variables: { base, height, area }
      }
    };
  }

  // ============================================================
  // KINEMATICS
  // ============================================================

  _generateKinematics() {
    const speed = this._randInt(30, 100);
    const time = this._randInt(2, 8);

    const distance = speed * time;

    return {
      q:
        `A vehicle travels at a constant speed of ${speed} km/h ` +
        `for ${time} hours. How far does it travel?`,

      ans: `${distance} km`,

      hint:
        `Use distance = speed x time.`,

      steps: [
        `Step 1: d = vt`,
        `Step 2: d = ${speed} x ${time}`,
        `Step 3: d = ${distance} km`
      ],

      sol: `${distance} km`,

      options: [
        `${distance} km`,
        `${speed + time} km`,
        `${distance + speed} km`,
        `${distance / 2} km`
      ],

      metadata: {
        skill: "distance_speed_time",
        variables: {
          speed,
          time,
          distance
        }
      }
    };
  }

  // ============================================================
  // FRACTIONS
  // ============================================================

  _generateFraction() {
    const denominator =
      this._choice([2, 3, 4, 5, 6, 8]);

    const a = this._randInt(1, denominator - 1);

    const numerator2 =
      this._randInt(1, denominator - 1);

    const resultNumerator = a + numerator2;

    return {
      q:
        `Calculate ${a}/${denominator} + ` +
        `${numerator2}/${denominator}.`,

      ans:
        `${resultNumerator}/${denominator}`,

      hint:
        `The denominators are already equal, so add the numerators.`,

      steps: [
        `Step 1: Keep the denominator ${denominator}.`,
        `Step 2: Add numerators: ${a} + ${numerator2} = ${resultNumerator}.`,
        `Step 3: Answer = ${resultNumerator}/${denominator}.`
      ],

      sol:
        `${resultNumerator}/${denominator}`,

      options: [
        `${resultNumerator}/${denominator}`,
        `${a + numerator2}/${denominator * 2}`,
        `${a * numerator2}/${denominator}`,
        `${resultNumerator}/${denominator * 2}`
      ],

      metadata: {
        skill: "fraction_addition",
        variables: {
          a,
          numerator2,
          denominator
        }
      }
    };
  }

  // ============================================================
  // RATIO
  // ============================================================

  _generateRatio() {
    const ratioA = this._randInt(1, 5);
    const ratioB = this._randInt(2, 8);
    const multiplier = this._randInt(2, 10);

    const first = ratioA * multiplier;
    const second = ratioB * multiplier;

    return {
      q:
        `Two quantities are in the ratio ${ratioA}:${ratioB}. ` +
        `If the first quantity is ${first}, what is the second quantity?`,

      ans: String(second),

      hint:
        `Find the multiplier that changes ${ratioA} into ${first}.`,

      steps: [
        `Step 1: ${ratioA} x ${multiplier} = ${first}`,
        `Step 2: ${ratioB} x ${multiplier} = ${second}`,
        `Step 3: The second quantity is ${second}.`
      ],

      sol: String(second),

      options: this._uniqueOptions([
        String(second),
        String(first),
        String(second + multiplier),
        String(second - multiplier)
      ]),

      metadata: {
        skill: "ratio",
        variables: {
          ratioA,
          ratioB,
          multiplier,
          first,
          second
        }
      }
    };
  }

  // ============================================================
  // SIMULTANEOUS EQUATIONS
  // ============================================================

  _generateSimultaneous() {
    const x = this._randInt(2, 10);
    const y = this._randInt(2, 10);

    const c1 = x + y;
    const c2 = x - y;

    return {
      q:
        `Solve simultaneously:\n` +
        `x + y = ${c1}\n` +
        `x - y = ${c2}`,

      ans: `x = ${x}, y = ${y}`,

      hint:
        `Add the two equations to eliminate y.`,

      steps: [
        `Step 1: Add equations: 2x = ${c1 + c2}`,
        `Step 2: x = ${x}`,
        `Step 3: Substitute x = ${x} into x + y = ${c1}`,
        `Step 4: y = ${y}`
      ],

      sol:
        `x = ${x}, y = ${y}`,

      options: [
        `x = ${x}, y = ${y}`,
        `x = ${y}, y = ${x}`,
        `x = ${x + 1}, y = ${y - 1}`,
        `x = ${-x}, y = ${-y}`
      ],

      metadata: {
        skill: "simultaneous_equations",
        variables: { x, y }
      }
    };
  }

  // ============================================================
  // GENERIC MEASUREMENT
  // ============================================================

  _generateMeasurement() {
    const length = this._randInt(5, 20);
    const width = this._randInt(2, 10);

    const area = length * width;

    return {
      q:
        `A rectangular field is ${length} m long and ${width} m wide. ` +
        `Find its area.`,

      ans: `${area} m2`,

      hint:
        `Area = length x width.`,

      steps: [
        `Step 1: A = L x W`,
        `Step 2: A = ${length} x ${width}`,
        `Step 3: A = ${area} m2`
      ],

      sol: `${area} m2`,

      options: [
        `${area} m2`,
        `${length + width} m2`,
        `${2 * (length + width)} m2`,
        `${area / 2} m2`
      ],

      metadata: {
        skill: "area",
        variables: { length, width, area }
      }
    };
  }

  // ============================================================
  // DISTRACTOR ENGINE
  // ============================================================

  _numberDistractors(correct, extra = []) {
    const candidates = [
      ...extra,
      correct + 1,
      correct - 1,
      correct * 2,
      correct / 2
    ];

    return this._uniqueOptions([
      this._formatNumber(correct),
      ...candidates.map(x => this._formatNumber(x))
    ]);
  }

  _uniqueOptions(options) {
    const clean = [...new Set(options)];

    return this._shuffle(clean).slice(0, 4);
  }

  // ============================================================
  // VALIDATION
  // ============================================================

  _validateQuestion(question) {
    if (!question) return false;

    if (!question.q) return false;
    if (!question.ans) return false;

    if (question.options) {
      if (question.options.length !== 4) return false;

      if (
        new Set(question.options).size !== 4
      ) {
        return false;
      }

      if (
        !question.options.includes(question.ans)
      ) {
        return false;
      }
    }

    return true;
  }

  // ============================================================
  // FINALIZATION
  // ============================================================

  _finalize(question, modalityIndex, skill, difficulty) {
    const isOpen = Number(modalityIndex) % 4 === 0;

    let solText = question.why || question.explanation;

    if (!solText || solText.trim() === String(question.ans).trim()) {
      if (Array.isArray(question.steps) && question.steps.length > 0) {
        solText = question.steps.join("\n");
      } else {
        solText = `Calculated solution: ${question.ans}.`;
      }
    }

    return {
      ...question,

      ans: String(question.ans),
      why: solText,
      sol: solText,
      explanation: solText,

      type: isOpen ? "open_response" : "mcq",

      options: isOpen ? null : question.options,

      metadata: {
        ...(question.metadata || {}),

        skill,
        difficulty,

        generatedBy: "TixarMathMutator",
        version: "2.0"
      }
    };
  }

  // ============================================================
  // FALLBACK
  // ============================================================

  _fallback(qObj, modalityIndex, difficulty) {
    const stem = String(qObj.q || qObj.stem || "").trim();
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    const ans = qObj.ans ? String(qObj.ans) : "Calculated Result";

    if (numbers && numbers.length >= 1) {
      const oldValue = parseFloat(numbers[0]);
      if (Number.isFinite(oldValue) && oldValue > 0) {
        const factor = 2;
        const newValue = oldValue * factor;
        const mutatedStem = stem.replace(numbers[0], String(newValue));
        const originalSteps = Array.isArray(qObj.steps) && qObj.steps.length > 0 ? qObj.steps : null;

        const steps = originalSteps
          ? originalSteps.map((s) => s.replace(new RegExp(`\\b${oldValue}\\b`, "g"), String(newValue)))
          : [
              `Step 1: Note the updated numerical quantity: ${newValue} (modified from ${oldValue}).`,
              `Step 2: Substitute ${newValue} into the governing mathematical formula.`,
              `Step 3: Perform the calculation to solve the problem.`,
              `Step 4: Verify units and state the final result.`
            ];

        const solText = qObj.why || qObj.sol || `Recalculate using the updated value ${newValue}.`;

        return {
          ...qObj,
          q: `[Math Variant] ${mutatedStem}`,
          ans,
          why: solText,
          sol: solText,
          explanation: solText,
          steps,
          type: Number(modalityIndex) % 4 === 0 ? "open_response" : "mcq",
          metadata: { skill: "numeric_mutation", difficulty, generatedBy: "TixarMathMutator" }
        };
      }
    }

    const solText =
      qObj.why ||
      qObj.sol ||
      qObj.explanation ||
      `Apply the mathematical relationship to obtain ${ans}.`;

    const steps = Array.isArray(qObj.steps) && qObj.steps.length > 0
      ? qObj.steps
      : [
          `Step 1: Identify given quantities in: "${stem}".`,
          `Step 2: Apply the governing mathematical rule or formula.`,
          `Step 3: Calculate the final result: ${ans}.`
        ];

    return {
      ...qObj,
      ans,
      why: solText,
      sol: solText,
      explanation: solText,
      steps,
      type: Number(modalityIndex) % 4 === 0 ? "open_response" : "mcq",
      metadata: { skill: "general_math", difficulty, generatedBy: "TixarMathMutator" }
    };
  }

  // ============================================================
  // RANDOM UTILITIES
  // ============================================================

  _randInt(min, max) {
    return Math.floor(
      this._rng() * (max - min + 1)
    ) + min;
  }

  _choice(array) {
    return array[
      Math.floor(this._rng() * array.length)
    ];
  }

  _shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this._rng() * (i + 1));

      [result[i], result[j]] =
        [result[j], result[i]];
    }

    return result;
  }

  _formatNumber(value) {
    if (Number.isInteger(value)) {
      return String(value);
    }

    return Number(value.toFixed(2)).toString();
  }

  _clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  _createRNG(seed) {
    let state = seed >>> 0;

    return () => {
      state += 0x6D2B79F5;

      let t = state;

      t = Math.imul(
        t ^ (t >>> 15),
        t | 1
      );

      t ^= t + Math.imul(
        t ^ (t >>> 7),
        t | 61
      );

      return (
        ((t ^ (t >>> 14)) >>> 0)
        / 4294967296
      );
    };
  }
}