/**
 * Mathematics Subject Mutator
 * Intelligent Dynamic Math Engine:
 * - Automatically parses equations, formulas, numbers, and financial/geometric contexts.
 * - Generates fresh parameters and calculates the EXACT new mathematical answer.
 * - Constructs 4 plausible MCQ options (correct answer + 3 realistic distractors).
 * - Provides clear step-by-step arithmetic breakdowns.
 */

export class MathMutator {
  mutate(qObj, modalityIndex = 0, performanceContext = {}) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    const mode = (typeof modalityIndex === "number" ? modalityIndex : Math.floor(Math.random() * 4)) % 4;

    // Performance & Diagnostic Context
    const diagnosis = performanceContext.diagnosis || qObj.diagnosis || {};
    const level = typeof performanceContext.level === "number" 
      ? performanceContext.level 
      : (qObj._attemptCount ? Math.min(3, qObj._attemptCount + 1) : 1);

    // 1. Quadratic Expressions & Algebra Adaptation Engine
    if (lower.includes("quadrat") || lower.includes("x²") || lower.includes("x^2") || lower.includes("factor") || lower.includes("solve for x") || lower.includes("equation")) {
      return this._mutateQuadraticOrAlgebra(qObj, stem, lower, mode, level, diagnosis);
    }

    // 2. Percentage & Financial Math (Profit, Loss, Interest, Discount, Depreciation)
    const currencyMatch = stem.match(/(?:KSh|\$|€|£)\s*(\d+(?:,\d+)*(?:\.\d+)?)/i) || stem.match(/(\d+)\s*(?:shilling|ksh)/i);
    const pctMatch = stem.match(/(\d+(?:\.\d+)?)\s*%/);

    if (currencyMatch || pctMatch || lower.includes("profit") || lower.includes("interest") || lower.includes("discount") || lower.includes("cost") || lower.includes("vat")) {
      return this._mutateFinancialOrPercentage(qObj, stem, lower, mode, level, diagnosis);
    }

    // 3. Geometry & Measurement (Area, Perimeter, Volume, Trigonometry)
    if (lower.includes("area") || lower.includes("perimeter") || lower.includes("radius") || lower.includes("diameter") || lower.includes("volume") || lower.includes("rectangle") || lower.includes("circle") || lower.includes("triangle")) {
      const geomRes = this._mutateGeometry(qObj, stem, lower, mode, level, diagnosis);
      if (geomRes) return geomRes;
    }

    // 4. Linear Equations & Basic Algebra (e.g. 2x + 5 = 15)
    const eqMatch = stem.match(/(\d+)\s*x\s*([+-])\s*(\d+)\s*=\s*(\d+)/i);
    if (eqMatch) {
      const a = parseInt(eqMatch[1], 10);
      const op = eqMatch[2];

      const newA = a + (Math.floor(Math.random() * 3) + 1);
      const newX = Math.floor(Math.random() * 8) + 2; // Clean integer x
      const newB = Math.floor(Math.random() * 10) + 1;
      const newC = op === "+" ? (newA * newX + newB) : (newA * newX - newB);

      const newEq = `${newA}x ${op} ${newB} = ${newC}`;
      const correctAns = `${newX}`;
      const options = this._generateNumberOptions(newX, false);

      const type = mode === 0 ? "open_response" : "mcq";

      return {
        q: `Solve for x in the equation: ${newEq}`,
        ans: correctAns,
        hint: `Isolate x: First ${op === "+" ? "subtract" : "add"} ${newB}, then divide by ${newA}`,
        why: `Step 1: ${newA}x = ${newC} ${op === "+" ? "-" : "+"} ${newB} = ${newA * newX}.\nStep 2: x = ${newA * newX} ÷ ${newA} = ${newX}.`,
        sol: `x = ${newX}`,
        steps: [
          `Step 1: Shift constant term: ${newA}x = ${newC} ${op === "+" ? "-" : "+"} ${newB}`,
          `Step 2: Simplify RHS: ${newA}x = ${newA * newX}`,
          `Step 3: Divide by coefficient ${newA}: x = ${newX}`
        ],
        type,
        options: type === "mcq" ? options : null
      };
    }

    // 5. Speed, Distance & Time (Kinematics & Relative Velocity)
    if (lower.includes("speed") || lower.includes("distance") || lower.includes("time") || lower.includes("km/h") || lower.includes("m/s") || lower.includes("matatu")) {
      return this._mutateKinematics(qObj, stem, lower, mode, level, diagnosis);
    }

    // 6. Generic Number Extraction & Dynamic Scaling
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      const scaleFactor = (Math.floor(Math.random() * 4) + 2); // 2, 3, 4, 5

      const numVal = parseFloat(numbers[0]);
      if (numVal > 0 && numVal < 1000) {
        const newVal = numVal * scaleFactor;
        const mutatedStem = stem.replace(numbers[0], String(newVal));

        let origAnsNum = parseFloat(rawAns.replace(/[^0-9.]/g, ""));
        let newAnsStr = rawAns;
        if (!isNaN(origAnsNum)) {
          const newAnsVal = origAnsNum * scaleFactor;
          newAnsStr = rawAns.replace(String(origAnsNum), String(newAnsVal));
        }

        return {
          ...qObj,
          q: mutatedStem,
          ans: newAnsStr,
          sol: newAnsStr,
          type: mode === 0 ? "open_response" : "mcq",
          options: mode === 0 ? null : this._generateNumberOptions(parseFloat(newAnsStr) || 10, false)
        };
      }
    }

    // Fallback Scaffold Mode
    return {
      ...qObj,
      q: stem,
      ans: qObj.ans,
      hint: qObj.hint || "Recall the relevant mathematical rule or theorem.",
      steps: [
        "Step 1: Identify given quantities and required unknown",
        "Step 2: Select governing formula",
        "Step 3: Calculate answer"
      ]
    };
  }

  _mutateQuadraticOrAlgebra(qObj, stem, lower, mode, level) {
    if (level === 3) {
      // LEVEL 3: REAL-WORLD CBC / KCSE TRANSFER (Ball trajectory, Farm yield, Profit modeling)
      const transferScenarios = [
        {
          q: "A ball follows a quadratic trajectory given by h(t) = -5t² + 20t + 25, where h is height in meters and t is time in seconds. Find the time t when the ball hits the ground (h = 0).",
          ans: "5 seconds",
          hint: "Set h(t) = 0 -> -5t² + 20t + 25 = 0. Divide by -5 to get t² - 4t - 5 = 0, then factor (t - 5)(t + 1) = 0.",
          sol: "t = 5 seconds (disregarding negative time t = -1).",
          steps: [
            "Step 1: Set height h(t) = 0: -5t² + 20t + 25 = 0",
            "Step 2: Simplify by dividing by -5: t² - 4t - 5 = 0",
            "Step 3: Factor: (t - 5)(t + 1) = 0 -> t = 5 s (since time t > 0)"
          ],
          type: mode === 0 ? "open_response" : "mcq",
          options: mode === 0 ? null : ["5 seconds", "4 seconds", "25 seconds", "2 seconds"]
        },
        {
          q: "A rectangular maize farm in Nakuru has an area of 120 m². The length of the farm is 7 m longer than its width. Calculate the width of the farm.",
          ans: "8 meters",
          hint: "Let width = w. Length = w + 7. Area = w(w + 7) = 120 -> w² + 7w - 120 = 0.",
          sol: "w² + 7w - 120 = 0 -> (w + 15)(w - 8) = 0 -> w = 8 m.",
          steps: [
            "Step 1: Express area as equation: w(w + 7) = 120",
            "Step 2: Expand to standard quadratic form: w² + 7w - 120 = 0",
            "Step 3: Factor: (w + 15)(w - 8) = 0 -> Width = 8 m (positive dimension)"
          ],
          type: mode === 0 ? "open_response" : "mcq",
          options: mode === 0 ? null : ["8 meters", "15 meters", "12 meters", "10 meters"]
        }
      ];
      return transferScenarios[mode % transferScenarios.length];
    } else if (level === 2) {
      // LEVEL 2: OPERATIONAL STRESS (Non-unit leading coefficient a > 1)
      const a = (mode % 3) + 2; // 2, 3, 4
      const p = (mode % 4) + 1; // 1, 2, 3, 4
      const q = (mode % 3) + 2; // 2, 3, 4
      const b = (a * q) + p;
      const c = p * q;
      const eq = `${a}x² - ${b}x + ${c} = 0`;
      const ansStr = `x = ${q} or x = ${p}/${a}`;

      return {
        q: `Solve the quadratic equation with non-unit leading coefficient: ${eq}`,
        ans: ansStr,
        hint: `Factor ${a}x² - ${b}x + ${c} = 0 using two numbers that multiply to ${a * c} and add up to -${b}.`,
        sol: `(${a}x - ${p})(x - ${q}) = 0 -> x = ${q} or x = ${p}/${a}.`,
        type: mode === 0 ? "open_response" : "mcq",
        options: mode === 0 ? null : [ansStr, `x = ${q + 1}`, `x = ${b}`, `x = ${c}`]
      };
    } else {
      // LEVEL 1: PROCEDURAL BASIS (Standard unit coefficient factoring)
      const p = (mode % 4) + 2; // 2, 3, 4, 5
      const q = (mode % 4) + 3; // 3, 4, 5, 6
      const b = p + q;
      const c = p * q;
      const eq = `x² - ${b}x + ${c} = 0`;
      const ansStr = `x = ${p} or x = ${q}`;

      return {
        q: `Solve for x in the quadratic equation: ${eq}`,
        ans: ansStr,
        hint: `Find two numbers that multiply to +${c} and add up to -${b}.`,
        sol: `(x - ${p})(x - ${q}) = 0 -> x = ${p} or x = ${q}.`,
        type: mode === 0 ? "open_response" : "mcq",
        options: mode === 0 ? null : [ansStr, `x = ${b} or x = ${c}`, `x = -${p} or x = -${q}`, `x = ${p * 2}`]
      };
    }
  }

  _mutateKinematics(qObj, stem, lower, mode, level) {
    if (level === 3) {
      // LEVEL 3: REAL-WORLD RELATIVE VELOCITY & BREAKING DISTANCE
      const v1 = (Math.floor(Math.random() * 4) + 6) * 10; // 60 to 90 km/h
      const v2 = (Math.floor(Math.random() * 4) + 5) * 10; // 50 to 80 km/h
      const totalDist = 280; // Nairobi to Kisumu segment distance
      const relSpeed = v1 + v2;
      const meetTimeHours = (totalDist / relSpeed).toFixed(1);

      return {
        q: `Two matatus leave Nairobi and Kisumu (280 km apart) at the same time, traveling towards each other along the highway. Matatu A travels at ${v1} km/h and Matatu B travels at ${v2} km/h. How many hours after departure will they meet?`,
        ans: `${meetTimeHours} hours`,
        hint: "Relative speed when moving towards each other = Speed A + Speed B. Time = Distance ÷ Relative Speed.",
        sol: `Relative Speed = ${v1} + ${v2} = ${relSpeed} km/h. Time = 280 ÷ ${relSpeed} = ${meetTimeHours} hours.`,
        type: mode === 0 ? "open_response" : "mcq",
        options: mode === 0 ? null : [`${meetTimeHours} hours`, `${(totalDist / v1).toFixed(1)} hours`, `${(totalDist / v2).toFixed(1)} hours`, `3.0 hours`]
      };
    } else {
      // LEVEL 1 / 2: UNIFORM KINEMATICS
      const s = (Math.floor(Math.random() * 8) + 4) * 10; // 40 to 110 km/h
      const t = Math.floor(Math.random() * 4) + 2; // 2 to 5 hours
      const d = s * t;

      return {
        q: `A vehicle travels at a constant speed of ${s} km/h for ${t} hours. Calculate the total distance covered.`,
        ans: `${d} km`,
        hint: "Formula: Distance = Speed × Time",
        sol: `Distance = ${s} km/h × ${t} h = ${d} km.`,
        type: mode === 0 ? "open_response" : "mcq",
        options: mode === 0 ? null : [`${d} km`, `${s + t} km`, `${d + s} km`, `${Math.round(d / 2)} km`]
      };
    }
  }

  _mutateFinancialOrPercentage(qObj, stem, lower) {
    const names = ["Zawadi", "Otieno", "Amani", "Wanjiku", "Baraka"];
    const name = names[Math.floor(Math.random() * names.length)];

    const origAmount = Math.floor(Math.random() * 20 + 5) * 1000; // e.g. 5,000 to 25,000
    const pct = (Math.floor(Math.random() * 4) + 1) * 5; // 5%, 10%, 15%, 20%
    const calculatedAns = Math.round((origAmount * pct) / 100);

    if (lower.includes("discount") || lower.includes("decrease") || lower.includes("loss")) {
      const finalPrice = origAmount - calculatedAns;
      return {
        q: `[Financial Math] ${name} bought goods worth KSh ${origAmount.toLocaleString()}. The shop offered a ${pct}% discount. How much did ${name} pay after discount?`,
        ans: `KSh ${finalPrice.toLocaleString()}`,
        hint: `Discount = ${pct}% of KSh ${origAmount.toLocaleString()}. Subtract discount from original price.`,
        why: `Discount = (${pct}/100) × ${origAmount} = KSh ${calculatedAns.toLocaleString()}.\nAmount Paid = ${origAmount} - ${calculatedAns} = KSh ${finalPrice.toLocaleString()}.`,
        sol: `KSh ${finalPrice.toLocaleString()}`,
        steps: [
          `Step 1: Calculate discount amount: ${pct}% of KSh ${origAmount.toLocaleString()} = KSh ${calculatedAns.toLocaleString()}`,
          `Step 2: Subtract discount from original price: KSh ${origAmount.toLocaleString()} - KSh ${calculatedAns.toLocaleString()}`,
          `Step 3: Final price paid = KSh ${finalPrice.toLocaleString()}`
        ],
        type: "mcq",
        options: [
          `KSh ${finalPrice.toLocaleString()}`,
          `KSh ${(origAmount + calculatedAns).toLocaleString()}`,
          `KSh ${calculatedAns.toLocaleString()}`,
          `KSh ${(origAmount - calculatedAns / 2).toLocaleString()}`
        ]
      };
    }

    // Default Profit / Percentage Increase
    const finalVal = origAmount + calculatedAns;
    return {
      q: `[Financial Math] ${name} invested KSh ${origAmount.toLocaleString()} in a small business venture and earned a ${pct}% return on investment. What is the total accumulated amount?`,
      ans: `KSh ${finalVal.toLocaleString()}`,
      hint: `Gain = ${pct}% of KSh ${origAmount.toLocaleString()}. Total = Principal + Gain.`,
      why: `Gain = (${pct}/100) × ${origAmount} = KSh ${calculatedAns.toLocaleString()}.\nTotal = ${origAmount} + ${calculatedAns} = KSh ${finalVal.toLocaleString()}.`,
      sol: `KSh ${finalVal.toLocaleString()}`,
      steps: [
        `Step 1: Calculate ${pct}% gain: (${pct}/100) × KSh ${origAmount.toLocaleString()} = KSh ${calculatedAns.toLocaleString()}`,
        `Step 2: Add gain to original investment: KSh ${origAmount.toLocaleString()} + KSh ${calculatedAns.toLocaleString()}`,
        `Step 3: Total accumulated amount = KSh ${finalVal.toLocaleString()}`
      ],
      type: "mcq",
      options: [
        `KSh ${finalVal.toLocaleString()}`,
        `KSh ${(origAmount - calculatedAns).toLocaleString()}`,
        `KSh ${calculatedAns.toLocaleString()}`,
        `KSh ${(origAmount + calculatedAns * 2).toLocaleString()}`
      ]
    };
  }

  _mutateGeometry(qObj, stem, lower) {
    if (lower.includes("rectangle") || (lower.includes("length") && lower.includes("width"))) {
      const l = Math.floor(Math.random() * 10) + 5; // 5 to 14
      const w = Math.floor(Math.random() * 6) + 2; // 2 to 7
      const isArea = lower.includes("area");

      const ansVal = isArea ? l * w : 2 * (l + w);
      const unit = isArea ? "cm²" : "cm";

      return {
        q: `[Geometry] A rectangle has a length of ${l} cm and a width of ${w} cm. Calculate its ${isArea ? "area" : "perimeter"}.`,
        ans: `${ansVal} ${unit}`,
        hint: isArea ? "Area of rectangle = Length × Width" : "Perimeter of rectangle = 2 × (Length + Width)",
        why: isArea
          ? `Area = ${l} cm × ${w} cm = ${ansVal} cm².`
          : `Perimeter = 2 × (${l} + ${w}) = ${ansVal} cm.`,
        sol: `${ansVal} ${unit}`,
        steps: [
          `Step 1: Identify dimensions: Length = ${l} cm, Width = ${w} cm`,
          `Step 2: Apply formula: ${isArea ? "Area = L × W" : "Perimeter = 2(L + W)"}`,
          `Step 3: Compute final value = ${ansVal} ${unit}`
        ],
        type: "mcq",
        options: [`${ansVal} ${unit}`, `${l + w} ${unit}`, `${ansVal * 2} ${unit}`, `${isArea ? 2 * (l + w) : l * w} ${unit}`]
      };
    }

    if (lower.includes("circle") || lower.includes("radius")) {
      const r = (Math.floor(Math.random() * 5) + 1) * 7; // multiples of 7 for clean division by pi = 22/7
      const isArea = lower.includes("area");
      const ansVal = isArea ? (22 / 7) * r * r : 2 * (22 / 7) * r;
      const unit = isArea ? "cm²" : "cm";

      return {
        q: `[Circle Geometry] A circle has a radius of ${r} cm. Taking π = 22/7, calculate its ${isArea ? "area" : "circumference"}.`,
        ans: `${ansVal} ${unit}`,
        hint: isArea ? "Area = πr²" : "Circumference = 2πr",
        why: isArea
          ? `Area = (22/7) × ${r} × ${r} = ${ansVal} cm².`
          : `Circumference = 2 × (22/7) × ${r} = ${ansVal} cm.`,
        sol: `${ansVal} ${unit}`,
        steps: [
          `Step 1: Given radius r = ${r} cm, π = 22/7`,
          `Step 2: Apply formula: ${isArea ? "Area = π × r²" : "Circumference = 2 × π × r"}`,
          `Step 3: Compute value = ${ansVal} ${unit}`
        ],
        type: "mcq",
        options: [`${ansVal} ${unit}`, `${ansVal / 2} ${unit}`, `${ansVal * 2} ${unit}`, `${r * r} ${unit}`]
      };
    }

    return null;
  }

  _generateNumberOptions(correctNum, isFloat = false) {
    const correctStr = isFloat ? correctNum.toFixed(2) : String(correctNum);
    const d1 = isFloat ? (correctNum * 1.5).toFixed(2) : String(Math.round(correctNum * 1.5) || correctNum + 2);
    const d2 = isFloat ? (correctNum * 0.5).toFixed(2) : String(Math.max(1, Math.round(correctNum * 0.5)) || correctNum - 1);
    const d3 = isFloat ? (correctNum + 5).toFixed(2) : String(correctNum + 5);

    const opts = [correctStr, d1, d2, d3];
    // Shuffle options
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }
}
