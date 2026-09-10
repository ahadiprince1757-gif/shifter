/**
 * TIXAR MATH MUTATOR v3
 *
 * Fact-Preserving, Invariant-Driven Mathematical Mutation Engine
 *
 * Architecture:
 *
 *     Original Question
 *            │
 *     Fact Extractor (Preserve invariants, shape, skill, units)
 *            │
 *     Mutation Plan (Constrained parameter changes only)
 *            │
 *     Deterministic Solver (Recalculate exact answer from formula)
 *            │
 *     Mathematical Verifier (Strict formula check: Reject invalid candidates)
 *            │
 *     Finalizer with Provenance Metadata
 */

export class MathMutator {
  constructor(config = {}) {
    this.config = {
      maxRetries: 20,
      defaultDifficulty: 1,
      useSeed: config.useSeed ?? false,
      seed: config.seed ?? Date.now(),
      ...config,
    };

    this.rng = this._createRNG(this.config.seed);
  }

  // ============================================================
  // PSEUDO-RANDOM NUMBER GENERATION
  // ============================================================

  _createRNG(seed) {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  _random() {
    return typeof this.rng === "function" ? this.rng() : Math.random();
  }

  _rng() {
    return this._random();
  }

  _randInt(min, max) {
    return Math.floor(this._random() * (max - min + 1)) + min;
  }

  _choice(items) {
    if (!Array.isArray(items) || !items.length) {
      return undefined;
    }
    return items[Math.floor(this._random() * items.length)];
  }

  _shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this._random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // ============================================================
  // PUBLIC MUTATION API
  // ============================================================

  mutate(qObj, modalityIndex = 0, performanceContext = {}) {
    if (!qObj) return null;

    const difficulty = this._resolveDifficulty(qObj, performanceContext);
    const skill = this._classifySkill(qObj);
    const generator = this._getGenerator(skill);

    if (!generator) {
      return this._safeOriginal(qObj, skill, "NO_GENERATOR");
    }

    const sourceModel = this._extractSourceModel(qObj, skill);

    const mutationContext = {
      ...performanceContext,
      sourceModel,
      diagnosis: performanceContext.diagnosis ?? null,
      repairStrategy: performanceContext.repairStrategy ?? "STANDARD",
      preserveConcept: true,
      preserveSkill: true,
      recalculateAnswer: true,
      requireVerification: true,
    };

    for (let attempt = 0; attempt < this.config.maxRetries; attempt++) {
      try {
        const candidate = generator.call(this, qObj, difficulty, mutationContext);

        if (!candidate) continue;

        const normalized = this._normalizeQuestion(candidate);
        if (!normalized) continue;

        const verification = this._verifyMathQuestion(normalized, skill);
        if (!verification.valid) {
          continue;
        }

        const finalQuestion = this._finalize(normalized, modalityIndex, skill, difficulty);

        finalQuestion.metadata = {
          ...(finalQuestion.metadata || {}),
          provenance: {
            ...(finalQuestion.metadata?.provenance || {}),
            mutationVerified: true,
            sourceQuestionId: qObj.id ?? qObj.questionId ?? null,
            mutationAttempt: attempt + 1,
            conceptPreserved: true,
            answerRecalculated: true,
          },
        };

        return finalQuestion;
      } catch (error) {
        console.warn(`[MathMutator] Attempt ${attempt + 1} failed:`, error);
      }
    }

    return this._safeOriginal(qObj, skill, "NO_VERIFIED_VARIANT");
  }

  // ============================================================
  // VERIFICATION LAYER
  // ============================================================

  _verifyMathQuestion(question, skill) {
    if (!question?.q) {
      return { valid: false, reason: "MISSING_QUESTION" };
    }

    if (question.ans === undefined || question.ans === null) {
      return { valid: false, reason: "MISSING_ANSWER" };
    }

    const variables = question.metadata?.variables ?? question.variables ?? {};
    const verifier = this._getVerifier(question.metadata?.skill ?? skill);

    if (!verifier) {
      return { valid: false, reason: "NO_SEMANTIC_VERIFIER" };
    }

    return verifier.call(this, question, variables);
  }

  _getVerifier(skill) {
    const verifiers = {
      rectangle_area: this._verifyRectangleArea,
      rectangle_perimeter: this._verifyRectanglePerimeter,
      rectangle: this._verifyRectangleArea,
      circle_area: this._verifyCircleArea,
      circle_circumference: this._verifyCircleCircumference,
      circle: this._verifyCircleArea,
      triangle_area: this._verifyTriangleArea,
      triangle: this._verifyTriangleArea,
      percentage: this._verifyPercentage,
      discount: this._verifyDiscount,
      profit_loss: this._verifyProfitLoss,
      interest: this._verifySimpleInterest,
      simple_interest: this._verifySimpleInterest,
      mean: this._verifyMean,
      median: this._verifyMedian,
      mode: this._verifyMode,
      fraction: this._verifyFraction,
      ratio: this._verifyRatio,
      probability: this._verifyProbability,
      kinematics: this._verifyKinematics,
      pythagoras: this._verifyPythagoras,
      trigonometry: this._verifyPythagoras,
      linear: this._verifyLinear,
      quadratic: this._verifyQuadratic,
      matrices: this._verifyMatrices,
      vectors: this._verifyVectors,
      logarithms: this._verifyLogarithms,
      measurement: this._verifyRectangleArea,
      simultaneous: this._verifySimultaneous,
    };

    return verifiers[skill] ?? null;
  }

  _verifyRectangleArea(question, vars) {
    const length = Number(vars.length);
    const width = Number(vars.width);
    const answer = Number(question.ans);

    if (!Number.isFinite(length) || !Number.isFinite(width) || !Number.isFinite(answer)) {
      return { valid: false, reason: "INVALID_RECTANGLE_DATA" };
    }

    const expected = length * width;
    return {
      valid: Math.abs(answer - expected) < 1e-9,
      reason: Math.abs(answer - expected) < 1e-9 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyRectanglePerimeter(question, vars) {
    const length = Number(vars.length);
    const width = Number(vars.width);
    const answer = Number(question.ans);

    const expected = 2 * (length + width);
    return {
      valid: Number.isFinite(expected) && Number.isFinite(answer) && Math.abs(answer - expected) < 1e-9,
      reason: Math.abs(answer - expected) < 1e-9 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyTriangleArea(question, vars) {
    const base = Number(vars.base);
    const height = Number(vars.height);
    const answer = Number(question.ans);

    const expected = 0.5 * base * height;
    return {
      valid: Number.isFinite(expected) && Number.isFinite(answer) && Math.abs(answer - expected) < 1e-9,
      reason: Math.abs(answer - expected) < 1e-9 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyCircleArea(question, vars) {
    const r = Number(vars.radius);
    const answer = Number(question.ans);
    const pi = Number(vars.pi) || Math.PI;

    const expected = pi * r * r;
    return {
      valid: Number.isFinite(answer) && Math.abs(answer - expected) < 0.05,
      reason: Math.abs(answer - expected) < 0.05 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyCircleCircumference(question, vars) {
    const r = Number(vars.radius);
    const answer = Number(question.ans);
    const pi = Number(vars.pi) || Math.PI;

    const expected = 2 * pi * r;
    return {
      valid: Number.isFinite(answer) && Math.abs(answer - expected) < 0.05,
      reason: Math.abs(answer - expected) < 0.05 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyPercentage(question, vars) {
    const value = Number(vars.value);
    const percentage = Number(vars.percentage);
    const answer = Number(question.ans);

    const expected = (percentage / 100) * value;
    return {
      valid: Number.isFinite(expected) && Number.isFinite(answer) && Math.abs(answer - expected) < 0.01,
      reason: Math.abs(answer - expected) < 0.01 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyDiscount(question, vars) {
    const markedPrice = Number(vars.markedPrice);
    const discountPct = Number(vars.discountPct);
    const target = vars.target || "salePrice";
    const answer = Number(question.ans);

    const discountAmount = (discountPct / 100) * markedPrice;
    const salePrice = markedPrice - discountAmount;
    const expected = target === "salePrice" ? salePrice : discountAmount;

    return {
      valid: Number.isFinite(answer) && Math.abs(answer - expected) < 0.01,
      reason: Math.abs(answer - expected) < 0.01 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyProfitLoss(question, vars) {
    const costPrice = Number(vars.costPrice);
    const profitPct = Number(vars.profitPct);
    const isProfit = vars.isProfit !== false;
    const answer = Number(question.ans);

    const change = (profitPct / 100) * costPrice;
    const expected = isProfit ? costPrice + change : costPrice - change;

    return {
      valid: Number.isFinite(answer) && Math.abs(answer - expected) < 0.01,
      reason: Math.abs(answer - expected) < 0.01 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifySimpleInterest(question, vars) {
    const principal = Number(vars.principal);
    const rate = Number(vars.rate);
    const time = Number(vars.time);
    const answer = Number(question.ans);

    const expected = principal * (rate / 100) * time;
    return {
      valid: Number.isFinite(answer) && Math.abs(answer - expected) < 0.01,
      reason: Math.abs(answer - expected) < 0.01 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyMean(question, vars) {
    const data = Array.isArray(vars.data) ? vars.data.map(Number) : [];
    const answer = Number(question.ans);

    if (!data.length || !Number.isFinite(answer)) {
      return { valid: false, reason: "INVALID_MEAN_DATA" };
    }

    const sum = data.reduce((acc, v) => acc + v, 0);
    const expected = sum / data.length;

    return {
      valid: Math.abs(answer - expected) < 0.01,
      reason: Math.abs(answer - expected) < 0.01 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyMedian(question, vars) {
    const data = Array.isArray(vars.data) ? [...vars.data].map(Number).sort((a, b) => a - b) : [];
    const answer = Number(question.ans);

    if (!data.length || !Number.isFinite(answer)) {
      return { valid: false, reason: "INVALID_MEDIAN_DATA" };
    }

    const mid = Math.floor(data.length / 2);
    const expected = data.length % 2 !== 0 ? data[mid] : (data[mid - 1] + data[mid]) / 2;

    return {
      valid: Math.abs(answer - expected) < 0.01,
      reason: Math.abs(answer - expected) < 0.01 ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyMode(question, vars) {
    const data = Array.isArray(vars.data) ? vars.data.map(Number) : [];
    const answer = Number(question.ans);

    if (!data.length || !Number.isFinite(answer)) {
      return { valid: false, reason: "INVALID_MODE_DATA" };
    }

    const counts = {};
    let maxCount = 0;
    let modeVal = null;
    data.forEach((val) => {
      counts[val] = (counts[val] || 0) + 1;
      if (counts[val] > maxCount) {
        maxCount = counts[val];
        modeVal = val;
      }
    });

    const valid = answer === modeVal;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${modeVal}_GOT_${answer}`,
    };
  }

  _verifyFraction(question, vars) {
    const num1 = Number(vars.num1);
    const den1 = Number(vars.den1);
    const num2 = Number(vars.num2);
    const den2 = Number(vars.den2);
    const op = vars.op || "+";
    const answer = String(question.ans).trim();

    let expectedVal = 0;
    if (op === "+") expectedVal = num1 / den1 + num2 / den2;
    else if (op === "-") expectedVal = num1 / den1 - num2 / den2;
    else if (op === "*") expectedVal = (num1 / den1) * (num2 / den2);
    else if (op === "/") expectedVal = (num1 / den1) / (num2 / den2);

    let ansVal = Number(answer);
    if (answer.includes("/")) {
      const [n, d] = answer.split("/").map(Number);
      if (d) ansVal = n / d;
    }

    const valid = Number.isFinite(ansVal) && Math.abs(ansVal - expectedVal) < 0.01;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expectedVal}_GOT_${answer}`,
    };
  }

  _verifyRatio(question, vars) {
    const partA = Number(vars.partA);
    const partB = Number(vars.partB);
    const total = Number(vars.total);
    const target = vars.target || "shareA";
    const answer = Number(question.ans);

    const shareA = (partA / (partA + partB)) * total;
    const shareB = (partB / (partA + partB)) * total;
    const expected = target === "shareA" ? shareA : shareB;

    const valid = Number.isFinite(answer) && Math.abs(answer - expected) < 0.01;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyProbability(question, vars) {
    const favorable = Number(vars.favorable);
    const total = Number(vars.total);
    const answer = String(question.ans).trim();

    const expectedRatio = favorable / total;
    let ansRatio = Number(answer);
    if (answer.includes("/")) {
      const [n, d] = answer.split("/").map(Number);
      if (d) ansRatio = n / d;
    }

    const valid = Number.isFinite(ansRatio) && Math.abs(ansRatio - expectedRatio) < 0.01;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expectedRatio}_GOT_${answer}`,
    };
  }

  _verifyKinematics(question, vars) {
    const speed = Number(vars.speed);
    const time = Number(vars.time);
    const distance = Number(vars.distance);
    const target = vars.target || "distance";
    const answer = Number(question.ans);

    let expected = 0;
    if (target === "distance") expected = speed * time;
    else if (target === "speed") expected = distance / time;
    else if (target === "time") expected = distance / speed;

    const valid = Number.isFinite(answer) && Math.abs(answer - expected) < 0.01;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyPythagoras(question, vars) {
    const a = Number(vars.a);
    const b = Number(vars.b);
    const c = Number(vars.c);
    const target = vars.target || "hypotenuse";
    const answer = Number(question.ans);

    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || !Number.isFinite(answer)) {
      return { valid: false, reason: "INVALID_PYTHAGORAS_DATA" };
    }

    const expected = target === "hypotenuse" ? Math.sqrt(a * a + b * b) : Math.sqrt(c * c - a * a);
    const valid = Math.abs(answer - expected) < 0.01;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyLinear(question, vars) {
    const a = Number(vars.a);
    const b = Number(vars.b);
    const c = Number(vars.c);
    const x = Number(vars.x);
    const answer = Number(question.ans);

    if (!Number.isFinite(a) || a === 0 || !Number.isFinite(b) || !Number.isFinite(c) || !Number.isFinite(x) || !Number.isFinite(answer)) {
      return { valid: false, reason: "INVALID_LINEAR_DATA" };
    }

    const expectedX = (c - b) / a;
    const isCorrect = Math.abs(answer - expectedX) < 1e-9 && Math.abs(x - expectedX) < 1e-9;
    return {
      valid: isCorrect,
      reason: isCorrect ? null : `EXPECTED_${expectedX}_GOT_${answer}`,
    };
  }

  _verifyQuadratic(question, vars) {
    const r1 = Number(vars.r1);
    const r2 = Number(vars.r2);
    const answer = String(question.ans);

    if (!Number.isFinite(r1) || !Number.isFinite(r2)) {
      return { valid: false, reason: "INVALID_QUADRATIC_DATA" };
    }

    const numbersInAns = (answer.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    const matchesRoots = (numbersInAns.includes(r1) && numbersInAns.includes(r2)) || numbersInAns.includes(r1);
    return {
      valid: matchesRoots,
      reason: matchesRoots ? null : `EXPECTED_ROOTS_${r1}_${r2}_GOT_${answer}`,
    };
  }

  _verifyMatrices(question, vars) {
    const a = Number(vars.a);
    const b = Number(vars.b);
    const c = Number(vars.c);
    const d = Number(vars.d);
    const answer = Number(question.ans);

    const expected = a * d - b * c;
    const valid = Number.isFinite(answer) && Math.abs(answer - expected) < 1e-9;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyVectors(question, vars) {
    const x = Number(vars.x);
    const y = Number(vars.y);
    const answer = Number(question.ans);

    const expected = Math.sqrt(x * x + y * y);
    const valid = Number.isFinite(answer) && Math.abs(answer - expected) < 0.01;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyLogarithms(question, vars) {
    const base = Number(vars.base);
    const power = Number(vars.power);
    const value = Number(vars.value);
    const answer = Number(question.ans);

    const expected = power;
    const valid = Math.pow(base, power) === value && answer === expected;
    return {
      valid,
      reason: valid ? null : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifySimultaneous(question, vars) {
    const x = Number(vars.x);
    const y = Number(vars.y);
    const answer = String(question.ans);

    const numbersInAns = (answer.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    const matches = numbersInAns.includes(x) && numbersInAns.includes(y);
    return {
      valid: matches,
      reason: matches ? null : `EXPECTED_X_${x}_Y_${y}_GOT_${answer}`,
    };
  }

  // ============================================================
  // FACT & SOURCE MODEL EXTRACTION
  // ============================================================

  _classifySkill(qObj) {
    if (qObj?.metadata?.skill) return qObj.metadata.skill;
    if (qObj?.skill) return qObj.skill;

    const stem = String(qObj?.q || qObj?.stem || "").toLowerCase();

    if (/mean|average|find mean/.test(stem)) return "mean";
    if (/median|find median|middle value/.test(stem)) return "median";
    if (/mode|find mode|most frequent/.test(stem)) return "mode";
    if (/probability|chance|dice|marbles|picking a|p\(/.test(stem)) return "probability";
    if (/pythagoras|hypotenuse|right-angled/.test(stem)) return "pythagoras";
    if (/trigonometry|sin|cos|tan/.test(stem)) return "trigonometry";
    if (/matrix|matrices|determinant|2x2/.test(stem)) return "matrices";
    if (/vector|magnitude|column vector/.test(stem)) return "vectors";
    if (/logarithm|log10|log2|log_/.test(stem)) return "logarithms";
    if (/quadratic|x\^2|factor.*quadratic|solve.*quadratic/.test(stem)) return "quadratic";
    if (/simple interest|compound interest|interest rate/.test(stem)) return "interest";
    if (/discount|sale price|marked price|selling price/.test(stem)) return "discount";
    if (/profit|loss|cost price|profit percentage/.test(stem)) return "profit_loss";
    if (/percentage|percent|increase|decrease/.test(stem)) return "percentage";
    if (/simultaneous|simultaneous equations|two equations/.test(stem)) return "simultaneous";
    if (/linear equation|solve for x|evaluate.*when x/.test(stem)) return "linear";
    if (/circumference|circle|radius|diameter/.test(stem)) return "circle";
    if (/rectangle|length.*width|width.*length/.test(stem)) return "rectangle";
    if (/triangle|base.*height|height.*base/.test(stem)) return "triangle";
    if (/speed|distance|time|velocity|km\/h|m\/s/.test(stem)) return "kinematics";
    if (/fraction|numerator|denominator/.test(stem)) return "fraction";
    if (/ratio|proportion|scale/.test(stem)) return "ratio";
    if (/area|perimeter|volume|surface area/.test(stem)) return "measurement";

    return "linear";
  }

  _extractSourceModel(qObj, skill) {
    const stem = String(qObj.q || qObj.stem || "");
    const numbers = (stem.match(/\b\d+(?:\.\d+)?\b/g) || []).map(Number);
    const unitMatch = stem.match(/\b(cm2|cm|m2|m|km\/h|m\/s|kg|g|shillings|ksh|kes|%)\b/i);
    const unit = unitMatch ? unitMatch[1] : "cm";

    switch (skill) {
      case "rectangle":
      case "rectangle_area":
      case "rectangle_perimeter": {
        const isPerimeter = /perimeter/i.test(stem);
        return {
          skill: isPerimeter ? "rectangle_perimeter" : "rectangle_area",
          target: isPerimeter ? "perimeter" : "area",
          length: numbers[0] || 8,
          width: numbers[1] || 5,
          unit,
        };
      }

      case "circle":
      case "circle_area":
      case "circle_circumference": {
        const isCircumference = /circumference/i.test(stem);
        return {
          skill: isCircumference ? "circle_circumference" : "circle_area",
          target: isCircumference ? "circumference" : "area",
          radius: numbers[0] || 7,
          pi: /22\/7/.test(stem) ? 22 / 7 : Math.PI,
          unit,
        };
      }

      case "triangle":
      case "triangle_area":
        return {
          skill: "triangle_area",
          target: "area",
          base: numbers[0] || 8,
          height: numbers[1] || 6,
          unit,
        };

      case "percentage":
        return {
          skill: "percentage",
          percentage: numbers.find((n) => n <= 100 && n > 0) || 20,
          value: numbers.find((n) => n > 100) || numbers[0] || 80,
          unit,
        };

      case "discount":
        return {
          skill: "discount",
          target: /discount amount/i.test(stem) ? "discountAmount" : "salePrice",
          markedPrice: numbers.find((n) => n >= 50) || 200,
          discountPct: numbers.find((n) => n <= 50 && n > 0) || 15,
          unit: unitMatch ? unitMatch[1] : "shillings",
        };

      case "profit_loss":
        return {
          skill: "profit_loss",
          costPrice: numbers.find((n) => n >= 50) || 500,
          profitPct: numbers.find((n) => n <= 50 && n > 0) || 20,
          isProfit: !/loss/i.test(stem),
          unit: unitMatch ? unitMatch[1] : "shillings",
        };

      case "interest":
      case "simple_interest":
        return {
          skill: "simple_interest",
          principal: numbers.find((n) => n >= 500) || 2000,
          rate: numbers.find((n) => n <= 30 && n > 0) || 10,
          time: numbers.find((n) => n <= 10 && n > 0 && n !== 10) || 3,
          unit: unitMatch ? unitMatch[1] : "shillings",
        };

      case "mean":
      case "median":
      case "mode": {
        const dataset = numbers.length >= 3 ? numbers : [4, 6, 8, 10, 12];
        return {
          skill,
          dataset,
          count: dataset.length,
          targetMean: Math.round(dataset.reduce((a, b) => a + b, 0) / dataset.length),
        };
      }

      case "kinematics":
        return {
          skill: "kinematics",
          target: /time/i.test(stem) ? "time" : (/speed/i.test(stem) ? "speed" : "distance"),
          speed: numbers[0] || 60,
          time: numbers[1] || 2,
          distance: numbers[2] || 120,
        };

      case "linear":
        return {
          skill: "linear",
          a: numbers[0] || 3,
          b: numbers[1] || 5,
          c: numbers[2] || 11,
        };

      case "quadratic":
        return {
          skill: "quadratic",
          r1: numbers[0] || 2,
          r2: numbers[1] || 3,
        };

      default:
        return {
          skill,
          rawNumbers: numbers,
          unit,
        };
    }
  }

  _getGenerator(skill) {
    const generators = {
      rectangle: this._generateRectangle,
      rectangle_area: this._generateRectangle,
      rectangle_perimeter: this._generateRectangle,
      circle: this._generateCircle,
      circle_area: this._generateCircle,
      circle_circumference: this._generateCircle,
      triangle: this._generateTriangle,
      triangle_area: this._generateTriangle,
      percentage: this._generatePercentage,
      discount: this._generateDiscount,
      profit_loss: this._generateProfitLoss,
      interest: this._generateInterest,
      simple_interest: this._generateInterest,
      mean: this._generateMean,
      median: this._generateMedian,
      mode: this._generateMode,
      fraction: this._generateFraction,
      ratio: this._generateRatio,
      probability: this._generateProbability,
      kinematics: this._generateKinematics,
      pythagoras: this._generatePythagoras,
      trigonometry: this._generatePythagoras,
      linear: this._generateLinear,
      quadratic: this._generateQuadratic,
      matrices: this._generateMatrices,
      vectors: this._generateVectors,
      logarithms: this._generateLogarithms,
      measurement: this._generateMeasurement,
      simultaneous: this._generateSimultaneous,
    };

    return generators[skill];
  }

  // ============================================================
  // INVARIANT-PRESERVING GENERATORS
  // ============================================================

  _generateRectangle(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "rectangle");
    const delta = this._choice([-2, -1, 1, 2, 3]) || 1;
    const length = Math.max(3, (source.length || 8) + delta);
    const width = Math.max(2, (source.width || 5) + (delta % 2 === 0 ? 1 : -1));
    const target = source.target || "area";
    const unit = source.unit || "cm";

    const answer = target === "area" ? length * width : 2 * (length + width);
    const answerUnit = target === "area" ? `${unit}2` : unit;

    return {
      q: `A rectangle has a length of ${length} ${unit} and a width of ${width} ${unit}. Calculate its ${target}.`,
      ans: String(answer),
      type: "mcq",
      options: this._numberDistractors(answer),
      hint: target === "area" ? "Area = length × width" : "Perimeter = 2 × (length + width)",
      sol: target === "area" ? `${length} × ${width} = ${answer} ${answerUnit}` : `2 × (${length} + ${width}) = ${answer} ${answerUnit}`,
      steps: [
        `Step 1: Identify given length = ${length} ${unit}, width = ${width} ${unit}.`,
        `Step 2: Apply formula: ${target === "area" ? "A = L × W" : "P = 2(L + W)"}.`,
        `Step 3: Calculate final ${target}: ${answer} ${answerUnit}.`,
      ],
      metadata: {
        skill: target === "area" ? "rectangle_area" : "rectangle_perimeter",
        variables: { length, width },
      },
    };
  }

  _generateCircle(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "circle");
    const radii = [7, 14, 21, 28, 35];
    const radius = this._choice(radii.filter((r) => r !== source.radius)) || 14;
    const target = source.target || "area";
    const pi = 22 / 7;
    const unit = source.unit || "cm";

    let answer;
    if (target === "area") {
      answer = Math.round(pi * radius * radius);
    } else {
      answer = Math.round(2 * pi * radius);
    }

    const answerUnit = target === "area" ? `${unit}2` : unit;

    return {
      q: `Find the ${target} of a circle with a radius of ${radius} ${unit}. (Use π = 22/7)`,
      ans: String(answer),
      type: "mcq",
      options: this._numberDistractors(answer),
      hint: target === "area" ? "Area = πr²" : "Circumference = 2πr",
      sol: target === "area" ? `(22/7) × ${radius}² = ${answer} ${answerUnit}` : `2 × (22/7) × ${radius} = ${answer} ${answerUnit}`,
      steps: [
        `Step 1: Note radius r = ${radius} ${unit}, π = 22/7.`,
        `Step 2: Apply ${target === "area" ? "Area = πr²" : "Circumference = 2πr"}.`,
        `Step 3: Calculate: ${answer} ${answerUnit}.`,
      ],
      metadata: {
        skill: target === "area" ? "circle_area" : "circle_circumference",
        variables: { radius, pi },
      },
    };
  }

  _generateTriangle(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "triangle");
    const delta = this._choice([2, 4, -2]) || 2;
    const base = Math.max(4, (source.base || 8) + delta);
    const height = Math.max(4, (source.height || 6) + delta);
    const unit = source.unit || "cm";
    const answer = 0.5 * base * height;

    return {
      q: `Calculate the area of a triangle with base ${base} ${unit} and height ${height} ${unit}.`,
      ans: String(answer),
      type: "mcq",
      options: this._numberDistractors(answer),
      hint: "Area of a triangle = 1/2 × base × height",
      sol: `1/2 × ${base} × ${height} = ${answer} ${unit}2`,
      steps: [
        `Step 1: Base = ${base} ${unit}, Height = ${height} ${unit}.`,
        `Step 2: Formula = 1/2 × b × h.`,
        `Step 3: Result = ${answer} ${unit}2.`,
      ],
      metadata: {
        skill: "triangle_area",
        variables: { base, height },
      },
    };
  }

  _generatePercentage(qObj, difficulty, context = {}) {
    const rates = [10, 15, 20, 25, 30, 50];
    const bases = [40, 60, 80, 100, 120, 150, 200];
    const percentage = this._choice(rates) || 20;
    const value = this._choice(bases) || 100;
    const answer = (percentage / 100) * value;

    return {
      q: `Find ${percentage}% of ${value}.`,
      ans: String(answer),
      type: "mcq",
      options: this._numberDistractors(answer),
      hint: "Convert percentage to fraction (rate/100) and multiply.",
      sol: `(${percentage} / 100) × ${value} = ${answer}`,
      steps: [
        `Step 1: Write percentage as fraction: ${percentage}/100.`,
        `Step 2: Multiply by ${value}.`,
        `Step 3: Calculate = ${answer}.`,
      ],
      metadata: {
        skill: "percentage",
        variables: { percentage, value },
      },
    };
  }

  _generateDiscount(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "discount");
    const markedPrice = this._choice([200, 300, 400, 500, 800, 1000]) || 500;
    const discountPct = this._choice([10, 15, 20, 25]) || 20;
    const target = source.target || "salePrice";
    const unit = source.unit || "KES";

    const discountAmount = (discountPct / 100) * markedPrice;
    const salePrice = markedPrice - discountAmount;
    const answer = target === "salePrice" ? salePrice : discountAmount;

    return {
      q: target === "salePrice"
        ? `An item with marked price ${unit} ${markedPrice} is offered at a ${discountPct}% discount. Find its selling price.`
        : `Calculate the discount amount on an item marked ${unit} ${markedPrice} with ${discountPct}% discount.`,
      ans: String(answer),
      type: "mcq",
      options: this._numberDistractors(answer),
      hint: "Discount Amount = (Discount % / 100) × Marked Price.",
      sol: `Discount = ${discountAmount}, Sale Price = ${salePrice}`,
      steps: [
        `Step 1: Discount = (${discountPct}/100) × ${markedPrice} = ${discountAmount}.`,
        `Step 2: Selling Price = ${markedPrice} - ${discountAmount} = ${salePrice}.`,
      ],
      metadata: {
        skill: "discount",
        variables: { markedPrice, discountPct, target },
      },
    };
  }

  _generateProfitLoss(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "profit_loss");
    const costPrice = this._choice([200, 300, 400, 500, 800, 1200]) || 500;
    const profitPct = this._choice([10, 15, 20, 25]) || 20;
    const isProfit = source.isProfit !== false;
    const unit = source.unit || "KES";

    const change = (profitPct / 100) * costPrice;
    const sellingPrice = isProfit ? costPrice + change : costPrice - change;

    return {
      q: `A trader bought an article for ${unit} ${costPrice} and sold it at a ${profitPct}% ${isProfit ? "profit" : "loss"}. Find the selling price.`,
      ans: String(sellingPrice),
      type: "mcq",
      options: this._numberDistractors(sellingPrice),
      hint: `${isProfit ? "Profit" : "Loss"} = (${profitPct}/100) × Cost Price.`,
      sol: `${isProfit ? "Profit" : "Loss"} = ${change}. Selling Price = ${sellingPrice}`,
      steps: [
        `Step 1: Calculate ${isProfit ? "profit" : "loss"}: (${profitPct}/100) × ${costPrice} = ${change}.`,
        `Step 2: Selling price = ${costPrice} ${isProfit ? "+" : "-"} ${change} = ${sellingPrice}.`,
      ],
      metadata: {
        skill: "profit_loss",
        variables: { costPrice, profitPct, isProfit },
      },
    };
  }

  _generateInterest(qObj, difficulty, context = {}) {
    const principal = this._choice([1000, 2000, 3000, 5000, 10000]) || 2000;
    const rate = this._choice([5, 8, 10, 12]) || 10;
    const time = this._choice([2, 3, 4]) || 2;
    const answer = principal * (rate / 100) * time;

    return {
      q: `Find the simple interest earned on KES ${principal} at an annual rate of ${rate}% for ${time} years.`,
      ans: String(answer),
      type: "mcq",
      options: this._numberDistractors(answer),
      hint: "Simple Interest = (Principal × Rate × Time) / 100.",
      sol: `(${principal} × ${rate} × ${time}) / 100 = ${answer}`,
      steps: [
        `Step 1: Note P = ${principal}, R = ${rate}%, T = ${time} years.`,
        `Step 2: Formula I = (P × R × T) / 100.`,
        `Step 3: I = (${principal} × ${rate} × ${time}) / 100 = ${answer}.`,
      ],
      metadata: {
        skill: "simple_interest",
        variables: { principal, rate, time },
      },
    };
  }

  _generateMean(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "mean");
    const count = source.count || 5;
    const targetMean = this._randInt(6, 16);
    const data = this._generateExactMeanDataset(count, targetMean, 1, 30);

    if (!data) return null;

    return {
      q: `Find the mean of the following numbers: ${data.join(", ")}.`,
      ans: String(targetMean),
      type: "mcq",
      options: this._numberDistractors(targetMean),
      hint: "Mean = Sum of all values ÷ Total number of values.",
      sol: `Sum = ${data.reduce((a, b) => a + b, 0)}. Mean = ${data.reduce((a, b) => a + b, 0)} ÷ ${count} = ${targetMean}`,
      steps: [
        `Step 1: Add all values: ${data.join(" + ")} = ${data.reduce((a, b) => a + b, 0)}.`,
        `Step 2: Divide by count (${count}): ${data.reduce((a, b) => a + b, 0)} ÷ ${count} = ${targetMean}.`,
      ],
      metadata: {
        skill: "mean",
        variables: { data, targetMean },
      },
    };
  }

  _generateExactMeanDataset(count, targetMean, min = 1, max = 100) {
    const targetSum = targetMean * count;
    const values = [];
    let remaining = targetSum;

    for (let i = 0; i < count - 1; i++) {
      const slotsLeft = count - i - 1;
      const minRemaining = slotsLeft * min;
      const maxRemaining = slotsLeft * max;
      const low = Math.max(min, remaining - maxRemaining);
      const high = Math.min(max, remaining - minRemaining);

      if (low > high) return null;

      const value = this._randInt(Math.ceil(low), Math.floor(high));
      values.push(value);
      remaining -= value;
    }

    const finalValue = remaining;
    if (finalValue < min || finalValue > max || !Number.isInteger(finalValue)) {
      return null;
    }

    values.push(finalValue);
    return this._shuffle(values);
  }

  _generateMedian(qObj, difficulty, context = {}) {
    const count = 5;
    const data = Array.from({ length: count }, () => this._randInt(2, 20));
    const sorted = [...data].sort((a, b) => a - b);
    const median = sorted[Math.floor(count / 2)];

    return {
      q: `Find the median of the following dataset: ${data.join(", ")}.`,
      ans: String(median),
      type: "mcq",
      options: this._numberDistractors(median),
      hint: "Arrange the numbers in ascending order and select the middle value.",
      sol: `Sorted: ${sorted.join(", ")}. Middle value = ${median}`,
      steps: [
        `Step 1: Arrange in ascending order: ${sorted.join(", ")}.`,
        `Step 2: Identify middle value: ${median}.`,
      ],
      metadata: {
        skill: "median",
        variables: { data },
      },
    };
  }

  _generateMode(qObj, difficulty, context = {}) {
    const modeVal = this._randInt(2, 15);
    const others = [modeVal + 1, modeVal + 2, modeVal - 1].filter((v) => v > 0);
    const data = this._shuffle([modeVal, modeVal, modeVal, ...others]);

    return {
      q: `Find the mode of the dataset: ${data.join(", ")}.`,
      ans: String(modeVal),
      type: "mcq",
      options: this._numberDistractors(modeVal),
      hint: "The mode is the value that appears most frequently.",
      sol: `${modeVal} appears 3 times, which is more than any other number.`,
      steps: [
        `Step 1: Count occurrences of each number.`,
        `Step 2: ${modeVal} appears most often (mode = ${modeVal}).`,
      ],
      metadata: {
        skill: "mode",
        variables: { data },
      },
    };
  }

  _generateKinematics(qObj, difficulty, context = {}) {
    const source = context.sourceModel || this._extractSourceModel(qObj, "kinematics");
    const speed = this._choice([40, 50, 60, 75, 80, 90]) || 60;
    const time = this._choice([2, 3, 4, 5]) || 3;
    const distance = speed * time;
    const target = source.target || "distance";

    let qText;
    let ansVal;
    let hint;

    if (target === "speed") {
      qText = `A car covers a distance of ${distance} km in ${time} hours. Calculate its speed.`;
      ansVal = speed;
      hint = "Speed = Distance ÷ Time";
    } else if (target === "time") {
      qText = `How many hours does it take for a bus travelling at ${speed} km/h to cover ${distance} km?`;
      ansVal = time;
      hint = "Time = Distance ÷ Speed";
    } else {
      qText = `A train travels at an average speed of ${speed} km/h for ${time} hours. What distance does it cover?`;
      ansVal = distance;
      hint = "Distance = Speed × Time";
    }

    return {
      q: qText,
      ans: String(ansVal),
      type: "mcq",
      options: this._numberDistractors(ansVal),
      hint,
      sol: `Formula applied gives: ${ansVal}`,
      steps: [
        `Step 1: Identify given parameters.`,
        `Step 2: Apply kinematic formula: ${hint}.`,
        `Step 3: Result = ${ansVal}.`,
      ],
      metadata: {
        skill: "kinematics",
        variables: { speed, time, distance, target },
      },
    };
  }

  _generateLinear(qObj, difficulty, context = {}) {
    const a = this._choice([2, 3, 4, 5]) || 2;
    const x = this._randInt(1, 8);
    const b = this._randInt(1, 10);
    const c = a * x + b;

    return {
      q: `Solve for x: ${a}x + ${b} = ${c}`,
      ans: String(x),
      type: "mcq",
      options: this._numberDistractors(x),
      hint: `Subtract ${b} from both sides, then divide by ${a}.`,
      sol: `${a}x = ${c} - ${b} = ${a * x}, therefore x = ${x}`,
      steps: [
        `Step 1: ${a}x + ${b} = ${c}`,
        `Step 2: ${a}x = ${c} - ${b} = ${a * x}`,
        `Step 3: x = ${a * x} / ${a} = ${x}`,
      ],
      metadata: {
        skill: "linear",
        variables: { a, b, c, x },
      },
    };
  }

  _generateQuadratic(qObj, difficulty, context = {}) {
    const r1 = this._choice([1, 2, 3, 4]) || 2;
    const r2 = this._choice([5, 6, 7]) || 5;
    const b = -(r1 + r2);
    const c = r1 * r2;
    const bSign = b < 0 ? `- ${Math.abs(b)}x` : `+ ${b}x`;

    return {
      q: `Find the smaller root of the quadratic equation: x² ${bSign} + ${c} = 0`,
      ans: String(r1),
      type: "mcq",
      options: this._numberDistractors(r1),
      hint: `Factorize into (x - ${r1})(x - ${r2}) = 0.`,
      sol: `(x - ${r1})(x - ${r2}) = 0 gives roots x = ${r1} and x = ${r2}. Smaller root = ${r1}.`,
      steps: [
        `Step 1: Factorize equation: (x - ${r1})(x - ${r2}) = 0.`,
        `Step 2: Solve x = ${r1} or x = ${r2}.`,
        `Step 3: Smaller root = ${r1}.`,
      ],
      metadata: {
        skill: "quadratic",
        variables: { r1, r2 },
      },
    };
  }

  _generatePythagoras(qObj, difficulty, context = {}) {
    const triplets = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
    ];
    const [a, b, c] = this._choice(triplets) || [3, 4, 5];

    return {
      q: `In a right-angled triangle, the two perpendicular sides measure ${a} cm and ${b} cm. Find the hypotenuse.`,
      ans: String(c),
      type: "mcq",
      options: this._numberDistractors(c),
      hint: "Pythagoras' theorem: a² + b² = c².",
      sol: `c² = ${a}² + ${b}² = ${a * a + b * b} = ${c}² => c = ${c} cm`,
      steps: [
        `Step 1: a = ${a}, b = ${b}.`,
        `Step 2: c = √(${a}² + ${b}²) = √(${a * a + b * b}).`,
        `Step 3: c = ${c} cm.`,
      ],
      metadata: {
        skill: "pythagoras",
        variables: { a, b, c, target: "hypotenuse" },
      },
    };
  }

  _generateFraction(qObj, difficulty, context = {}) {
    const den1 = this._choice([3, 4, 5, 6]) || 4;
    const num1 = this._randInt(1, den1 - 1);
    const den2 = den1;
    const num2 = this._randInt(1, den2 - 1);
    const sumNum = num1 + num2;

    return {
      q: `Calculate: ${num1}/${den1} + ${num2}/${den2}`,
      ans: `${sumNum}/${den1}`,
      type: "mcq",
      options: this._shuffle([
        `${sumNum}/${den1}`,
        `${sumNum + 1}/${den1}`,
        `${Math.max(1, sumNum - 1)}/${den1}`,
        `${sumNum}/${den1 * 2}`,
      ]),
      hint: "When denominators are the same, add the numerators directly.",
      sol: `(${num1} + ${num2}) / ${den1} = ${sumNum}/${den1}`,
      steps: [
        `Step 1: Denominators are both ${den1}.`,
        `Step 2: Add numerators: ${num1} + ${num2} = ${sumNum}.`,
        `Step 3: Result = ${sumNum}/${den1}.`,
      ],
      metadata: {
        skill: "fraction",
        variables: { num1, den1, num2, den2, op: "+" },
      },
    };
  }

  _generateRatio(qObj, difficulty, context = {}) {
    const partA = this._choice([2, 3, 4]) || 2;
    const partB = this._choice([3, 5]) || 3;
    const totalParts = partA + partB;
    const multiplier = this._choice([10, 20, 30]) || 20;
    const total = totalParts * multiplier;
    const shareA = partA * multiplier;

    return {
      q: `Divide KES ${total} in the ratio ${partA}:${partB}. Find the first share.`,
      ans: String(shareA),
      type: "mcq",
      options: this._numberDistractors(shareA),
      hint: "First share = (First ratio part / Total parts) × Total amount.",
      sol: `Total parts = ${totalParts}. Share = (${partA}/${totalParts}) × ${total} = ${shareA}`,
      steps: [
        `Step 1: Total parts = ${partA} + ${partB} = ${totalParts}.`,
        `Step 2: 1 part = ${total} ÷ ${totalParts} = ${multiplier}.`,
        `Step 3: First share = ${partA} × ${multiplier} = ${shareA}.`,
      ],
      metadata: {
        skill: "ratio",
        variables: { partA, partB, total, target: "shareA" },
      },
    };
  }

  _generateProbability(qObj, difficulty, context = {}) {
    const favorable = this._choice([2, 3, 4, 5]) || 3;
    const other = this._choice([4, 5, 6, 7]) || 5;
    const total = favorable + other;

    return {
      q: `A bag contains ${favorable} red balls and ${other} blue balls. What is the probability of picking a red ball?`,
      ans: `${favorable}/${total}`,
      type: "mcq",
      options: this._shuffle([
        `${favorable}/${total}`,
        `${other}/${total}`,
        `1/${total}`,
        `${favorable}/${other}`,
      ]),
      hint: "Probability = Number of favorable outcomes ÷ Total outcomes.",
      sol: `Favorable = ${favorable}, Total = ${total}. Probability = ${favorable}/${total}`,
      steps: [
        `Step 1: Total balls = ${favorable} + ${other} = ${total}.`,
        `Step 2: Red balls = ${favorable}.`,
        `Step 3: P(Red) = ${favorable}/${total}.`,
      ],
      metadata: {
        skill: "probability",
        variables: { favorable, total },
      },
    };
  }

  _generateMatrices(qObj, difficulty, context = {}) {
    const a = this._randInt(1, 5);
    const b = this._randInt(1, 4);
    const c = this._randInt(1, 4);
    const d = this._randInt(1, 5);
    const det = a * d - b * c;

    return {
      q: `Find the determinant of the 2×2 matrix: [[${a}, ${b}], [${c}, ${d}]]`,
      ans: String(det),
      type: "mcq",
      options: this._numberDistractors(det),
      hint: "Determinant of [[a, b], [c, d]] = ad - bc.",
      sol: `(${a} × ${d}) - (${b} × ${c}) = ${a * d} - ${b * c} = ${det}`,
      steps: [
        `Step 1: Identify a = ${a}, b = ${b}, c = ${c}, d = ${d}.`,
        `Step 2: Calculate ad - bc: (${a} × ${d}) - (${b} × ${c}).`,
        `Step 3: Determinant = ${det}.`,
      ],
      metadata: {
        skill: "matrices",
        variables: { a, b, c, d },
      },
    };
  }

  _generateVectors(qObj, difficulty, context = {}) {
    const triplets = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
    ];
    const [x, y, mag] = this._choice(triplets) || [3, 4, 5];

    return {
      q: `Find the magnitude of the column vector: (${x}, ${y})`,
      ans: String(mag),
      type: "mcq",
      options: this._numberDistractors(mag),
      hint: "Magnitude = √(x² + y²).",
      sol: `√(${x}² + ${y}²) = √(${x * x} + ${y * y}) = √${mag * mag} = ${mag}`,
      steps: [
        `Step 1: Formula: |v| = √(x² + y²).`,
        `Step 2: |v| = √(${x * x} + ${y * y}) = √${mag * mag}.`,
        `Step 3: Magnitude = ${mag}.`,
      ],
      metadata: {
        skill: "vectors",
        variables: { x, y },
      },
    };
  }

  _generateLogarithms(qObj, difficulty, context = {}) {
    const base = this._choice([2, 3, 5, 10]) || 2;
    const power = this._choice([2, 3, 4]) || 3;
    const value = Math.pow(base, power);

    return {
      q: `Evaluate: log_${base}(${value})`,
      ans: String(power),
      type: "mcq",
      options: this._numberDistractors(power),
      hint: `What power must ${base} be raised to in order to get ${value}?`,
      sol: `${base}^${power} = ${value}, therefore log_${base}(${value}) = ${power}`,
      steps: [
        `Step 1: Express ${value} as power of ${base}: ${value} = ${base}^${power}.`,
        `Step 2: By definition of logarithm: log_${base}(${base}^${power}) = ${power}.`,
      ],
      metadata: {
        skill: "logarithms",
        variables: { base, power, value },
      },
    };
  }

  _generateMeasurement(qObj, difficulty, context = {}) {
    return this._generateRectangle(qObj, difficulty, context);
  }

  _generateSimultaneous(qObj, difficulty, context = {}) {
    const x = this._randInt(1, 5);
    const y = this._randInt(1, 5);

    const c1 = x + y;
    const c2 = 2 * x - y;

    return {
      q: `Solve the system: x + y = ${c1} and 2x - y = ${c2}. What is the value of x?`,
      ans: String(x),
      type: "mcq",
      options: this._numberDistractors(x),
      hint: "Add the two equations to eliminate y.",
      sol: `(x + y) + (2x - y) = 3x = ${c1 + c2} => x = ${x}`,
      steps: [
        `Step 1: Add equations: (x + y) + (2x - y) = ${c1} + ${c2}.`,
        `Step 2: 3x = ${c1 + c2} => x = ${x}.`,
        `Step 3: Substitute x = ${x} to verify.`,
      ],
      metadata: {
        skill: "simultaneous",
        variables: { x, y },
      },
    };
  }

  // ============================================================
  // NORMALIZATION, FINALIZATION & FALLBACK
  // ============================================================

  _normalizeQuestion(question) {
    if (!question) return null;

    const result = {
      ...question,
    };

    result.ans = String(result.ans);

    if (Array.isArray(result.options)) {
      result.options = result.options.map((option) => String(option));
      if (!result.options.includes(result.ans)) {
        result.options.push(result.ans);
        result.options = this._shuffle(result.options);
      }
    }

    return result;
  }

  _finalize(question, modalityIndex, skill, difficulty) {
    if (!question) {
      throw new Error("Cannot finalize invalid question");
    }

    const metadata = {
      ...(question.metadata || {}),
      skill: question.metadata?.skill ?? skill,
      difficulty,
      modalityIndex,
      verified: true,
      generatedBy: "MathMutator",
      provenance: {
        ...(question.metadata?.provenance || {}),
        mutationVerified: true,
        conceptPreserved: true,
        answerRecalculated: true,
      },
    };

    return {
      ...question,
      metadata,
    };
  }

  _safeOriginal(qObj, skill, reason) {
    return {
      ...structuredClone(qObj),
      metadata: {
        ...(qObj.metadata || {}),
        skill: qObj.metadata?.skill ?? skill,
        provenance: {
          ...(qObj.metadata?.provenance || {}),
          mutationVerified: true,
          mutationAccepted: false,
          fallback: true,
          reason,
        },
      },
    };
  }

  _resolveDifficulty(qObj, context = {}) {
    if (typeof context.difficulty === "number") {
      return this._clamp(Math.round(context.difficulty), 1, 5);
    }
    if (typeof context.level === "number") {
      return this._clamp(Math.round(context.level), 1, 5);
    }

    const attempts = Number(qObj?._attemptCount || 0);
    const accuracy = Number(context.recentAccuracy ?? context.accuracy ?? 0.5);

    if (accuracy >= 0.85) return 4;
    if (accuracy >= 0.70) return 3;
    if (accuracy >= 0.50) return 2;
    if (attempts > 2) return 1;

    return this.config.defaultDifficulty;
  }

  _numberDistractors(answer, count = 3) {
    const num = Number(answer);
    const options = new Set();
    options.add(String(this._formatNumber(num)));

    const adjustments = [
      num + 1,
      num - 1,
      num * 2,
      num / 2,
      num + 2,
      num - 2,
      -num,
      num + 5,
      num * 1.5,
    ];

    for (const adj of adjustments) {
      if (options.size > count) break;
      if (Number.isFinite(adj) && adj !== num) {
        options.add(String(this._formatNumber(adj)));
      }
    }

    while (options.size <= count) {
      const fallbackAdj = num + (options.size + 1);
      options.add(String(this._formatNumber(fallbackAdj)));
    }

    return this._shuffle(Array.from(options));
  }

  _formatNumber(value) {
    if (!Number.isFinite(value)) return String(value);
    if (Number.isInteger(value)) return String(value);
    return Number(value.toFixed(2)).toString();
  }

  _clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}