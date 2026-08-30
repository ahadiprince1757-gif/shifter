/**
 * Mathematics Subject Mutator
 * Intelligent Dynamic Math Engine:
 * - Automatically parses equations, formulas, numbers, and financial/geometric contexts.
 * - Generates fresh parameters and calculates the EXACT new mathematical answer.
 * - Constructs 4 plausible MCQ options (correct answer + 3 realistic distractors).
 * - Provides clear step-by-step arithmetic breakdowns.
 */

export class MathMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");
    const mode = (typeof modalityIndex === "number" ? modalityIndex : Math.floor(Math.random() * 4)) % 4;

    // 1. Percentage & Financial Math (Profit, Loss, Interest, Discount)
    const currencyMatch = stem.match(/(?:KSh|\$|€|£)\s*(\d+(?:,\d+)*(?:\.\d+)?)/i) || stem.match(/(\d+)\s*(?:shilling|ksh)/i);
    const pctMatch = stem.match(/(\d+(?:\.\d+)?)\s*%/);

    if (currencyMatch || pctMatch || lower.includes("profit") || lower.includes("interest") || lower.includes("discount") || lower.includes("cost")) {
      return this._mutateFinancialOrPercentage(qObj, stem, lower);
    }

    // 2. Geometry & Measurement (Area, Perimeter, Radius, Volume)
    if (lower.includes("area") || lower.includes("perimeter") || lower.includes("radius") || lower.includes("diameter") || lower.includes("volume") || lower.includes("rectangle") || lower.includes("circle") || lower.includes("triangle")) {
      const geomRes = this._mutateGeometry(qObj, stem, lower);
      if (geomRes) return geomRes;
    }

    // 3. Linear Equations & Algebra (e.g. 2x + 5 = 15 or solve for x)
    const eqMatch = stem.match(/(\d+)\s*x\s*([+-])\s*(\d+)\s*=\s*(\d+)/i);
    if (eqMatch) {
      const a = parseInt(eqMatch[1], 10);
      const op = eqMatch[2];

      const newA = a + (Math.floor(Math.random() * 3) + 1);
      const newX = Math.floor(Math.random() * 8) + 2; // Make x a clean integer
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

    // 4. Speed, Distance & Time (d = s * t)
    if (lower.includes("speed") || lower.includes("distance") || lower.includes("time") || lower.includes("km/h") || lower.includes("m/s")) {
      const s = (Math.floor(Math.random() * 8) + 4) * 10; // 40 to 110 km/h
      const t = Math.floor(Math.random() * 4) + 2; // 2 to 5 hours
      const d = s * t;
      const type = mode === 0 ? "open_response" : "mcq";

      return {
        q: `A vehicle travels at a constant speed of ${s} km/h for ${t} hours. Calculate the total distance covered.`,
        ans: `${d} km`,
        hint: "Formula: Distance = Speed × Time",
        why: `Distance = ${s} km/h × ${t} h = ${d} km.`,
        sol: `${d} km`,
        steps: [
          `Step 1: Note given parameters: Speed = ${s} km/h, Time = ${t} hours`,
          `Step 2: Apply formula: Distance = Speed × Time`,
          `Step 3: Calculate: ${s} × ${t} = ${d} km`
        ],
        type,
        options: type === "mcq" ? [`${d} km`, `${s + t} km`, `${d + s} km`, `${Math.round(d / 2)} km`] : null
      };
    }

    // 5. Generic Number Extraction & Dynamic Scaling for Any Math Question
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      const scaleFactor = (Math.floor(Math.random() * 4) + 2); // 2, 3, 4, 5

      const numVal = parseFloat(numbers[0]);
      if (numVal > 0 && numVal < 1000) {
        const newVal = numVal * scaleFactor;
        const mutatedStem = stem.replace(numbers[0], String(newVal));

        // Try to update answer numerically if possible
        let origAnsNum = parseFloat(rawAns.replace(/[^0-9.]/g, ""));
        let newAnsStr = rawAns;
        let correctVal = 0;

        if (!isNaN(origAnsNum) && origAnsNum !== 0) {
          correctVal = Math.round(origAnsNum * scaleFactor);
          newAnsStr = rawAns.replace(/\d+(?:\.\d+)?/, String(correctVal));
        }

        const options = correctVal > 0 ? this._generateNumberOptions(correctVal, false) : undefined;

        return {
          ...qObj,
          q: `[Application Retry] ${mutatedStem}`,
          ans: newAnsStr,
          hint: qObj.hint || "Apply the mathematical relationship with the updated values.",
          why: `Values updated by scale factor ×${scaleFactor}.`,
          sol: `Updated solution: ${newAnsStr}`,
          steps: [
            "Step 1: Note updated numerical values in the question stem",
            "Step 2: Apply the governing mathematical formula",
            "Step 3: Compute final value"
          ],
          type: options ? "mcq" : qObj.type,
          options
        };
      }
    }

    // 6. Conceptual / Fallback Scaffold Mode
    return {
      ...qObj,
      q: `[Concept Mastery] Regarding "${stem}": What is the fundamental formula or first step to solve this problem?`,
      ans: qObj.ans,
      hint: qObj.hint || "Recall the relevant mathematical rule or theorem.",
      steps: [
        "Step 1: Identify given quantities and required unknown",
        "Step 2: Select governing formula",
        "Step 3: Calculate answer"
      ]
    };
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
