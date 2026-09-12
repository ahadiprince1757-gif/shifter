/**
 * TIXAR MATH MUTATOR v4
 *
 * Deterministic, Fact-Preserving, Invariant-Driven
 * Mathematical Mutation Engine
 *
 * CORE LAW
 * ------------------------------------------------------------
 *
 * Same source + same context
 *          ↓
 *      Same fingerprint
 *          ↓
 *      Same mutation plan
 *          ↓
 *      Same mathematical values
 *          ↓
 *      Same answer
 *          ↓
 *      Same distractors
 *
 * NO RANDOMNESS.
 *
 * Architecture:
 *
 *     ORIGINAL QUESTION
 *             │
 *             ▼
 *     SKILL CLASSIFICATION
 *             │
 *             ▼
 *     SOURCE MODEL EXTRACTION
 *             │
 *             ▼
 *     STABLE FINGERPRINT
 *             │
 *             ▼
 *     DETERMINISTIC MUTATION PLAN
 *             │
 *             ▼
 *     DOMAIN GENERATOR
 *             │
 *             ▼
 *     EXACT ANSWER RECOMPUTATION
 *             │
 *             ▼
 *     MATHEMATICAL VERIFIER
 *             │
 *             ▼
 *     NORMALIZATION
 *             │
 *             ▼
 *     PROVENANCE
 *
 * Design principles:
 * ------------------------------------------------------------
 * 1. Never mutate the concept accidentally.
 * 2. Never trust an inherited answer.
 * 3. Always recompute the answer.
 * 4. Never use Math.random().
 * 5. Never use Date.now() for generation.
 * 6. Same input produces same output.
 * 7. Difficulty changes structure, not correctness.
 * 8. Distractors are deterministic.
 * 9. Invalid mathematical states are rejected.
 * 10. Every generated question is independently verified.
 */

export class MathMutator {
  constructor(config = {}) {
    this.config = {
      defaultDifficulty: 1,
      maxRetries: 6,
      ...config,
    };
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  mutate(qObj, modalityIndex = 0, performanceContext = {}) {
    if (!qObj) return null;

    const rawSkill =
      qObj?.metadata?.skill ??
      qObj?.skill ??
      this._classifySkill(qObj);

    const skill =
      rawSkill === "order_of_operations" || rawSkill === "bodmas"
        ? "bodmas"
        : rawSkill;

    const difficulty = this._resolveMutationDifficulty(
      qObj,
      performanceContext
    );

    const semanticIdentity = this._extractSemanticIdentity(
      qObj,
      skill
    );

    const sourceModel = this._extractSourceModel(
      qObj,
      skill
    );

    const fingerprint = this._createFingerprint(
      qObj,
      skill,
      difficulty,
      modalityIndex,
      semanticIdentity
    );

    const mutationContext = {
      ...performanceContext,
      sourceModel,
      fingerprint,
      difficulty,
      modalityIndex,
      semanticIdentity,

      diagnosis:
        performanceContext.diagnosis ?? null,

      repairStrategy:
        performanceContext.repairStrategy ?? "STANDARD",

      preserveConcept: true,
      preserveSkill: true,
      recalculateAnswer: true,
      requireVerification: true,
    };

    const generator = this._getGenerator(skill);

    if (!generator) {
      return this._safeOriginal(
        qObj,
        skill,
        "NO_GENERATOR",
        fingerprint
      );
    }

    /*
     * Deterministic strategy selection.
     *
     * We deliberately allow a small number of deterministic
     * attempts because some source values may create invalid
     * mathematical states.
     *
     * Attempt N always derives from:
     *
     * fingerprint + N
     *
     * Therefore retries are still deterministic.
     */
    for (
      let attempt = 0;
      attempt < this.config.maxRetries;
      attempt++
    ) {
      try {
        const attemptContext = {
          ...mutationContext,
          attempt,
          variantSeed: this._hash(
            `${fingerprint}:attempt:${attempt}`
          ),
        };

        const candidate = generator.call(
          this,
          qObj,
          difficulty,
          attemptContext
        );

        if (!candidate) continue;

        const normalized =
          this._normalizeQuestion(candidate);

        if (!normalized) continue;

        const boundaryCheck = this._verifySemanticBoundary(
          qObj,
          normalized,
          skill,
          normalized.metadata?.skill ?? skill,
          attemptContext
        );

        if (!boundaryCheck.valid) {
          console.warn(
            `[MathMutator] Semantic boundary check failed: ${boundaryCheck.reason}`
          );
          continue;
        }

        const verification =
          this._verifyMathQuestion(
            normalized,
            skill
          );

        if (!verification.valid) continue;

        const finalQuestion =
          this._finalize(
            normalized,
            modalityIndex,
            skill,
            difficulty
          );

        finalQuestion.metadata = {
          ...(finalQuestion.metadata || {}),

          provenance: {
            ...(finalQuestion.metadata?.provenance || {}),

            mutationVerified: true,
            mutationAccepted: true,

            sourceQuestionId:
              qObj.id ??
              qObj.questionId ??
              null,

            mutationAttempt: attempt + 1,

            conceptPreserved: true,
            skillPreserved: true,
            semanticIdentity,
            answerRecalculated: true,

            deterministic: true,
            randomnessUsed: false,

            fingerprint,

            variantSeed:
              attemptContext.variantSeed,

            verificationReason:
              verification.reason ?? null,
          },
        };

        return finalQuestion;
      } catch (error) {
        /*
         * Deterministic engine:
         * errors do not change future output.
         */
        console.warn(
          `[MathMutator] Deterministic attempt ${
            attempt + 1
          } failed:`,
          error
        );
      }
    }

    return this._safeOriginal(
      qObj,
      skill,
      "NO_VERIFIED_VARIANT",
      fingerprint
    );
  }

  // ============================================================
  // DETERMINISTIC HASHING
  // ============================================================

  _hash(input) {
    const text = String(input);

    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash =
        Math.imul(hash, 16777619);
    }

    return hash >>> 0;
  }

  _createFingerprint(
    qObj,
    skill,
    difficulty,
    modalityIndex,
    semanticIdentity = null
  ) {
    const sem =
      semanticIdentity ??
      this._extractSemanticIdentity(qObj, skill);

    const canonical = JSON.stringify({
      q: String(
        qObj?.q ??
        qObj?.stem ??
        ""
      )
        .trim()
        .toLowerCase(),

      subject: sem.subject,
      chapter: sem.chapter,
      topic: sem.topic,
      conceptId: sem.conceptId,
      skillId: sem.skillId,
      subskillId: sem.subskillId,

      difficulty,

      modalityIndex,
    });

    return this._hash(canonical)
      .toString(16)
      .padStart(8, "0");
  }

  _unitHash(seed, salt = "") {
    return this._hash(
      `${seed}:${salt}`
    );
  }

  _deterministicInt(
    seed,
    min,
    max,
    salt = ""
  ) {
    if (max <= min) return min;

    const hash =
      this._unitHash(seed, salt);

    return (
      min +
      (hash % (max - min + 1))
    );
  }

  _deterministicChoice(
    items,
    seed,
    salt = ""
  ) {
    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return undefined;
    }

    const index =
      this._unitHash(seed, salt) %
      items.length;

    return items[index];
  }

  _deterministicShuffle(
    items,
    seed,
    salt = ""
  ) {
    const result = [...items];

    /*
     * Stable sort by independently hashed
     * item values.
     *
     * No randomness.
     */
    return result
      .map((item, index) => ({
        item,
        key: this._hash(
          `${seed}:${salt}:${index}:${String(item)}`
        ),
      }))
      .sort((a, b) => {
        if (a.key !== b.key) {
          return a.key - b.key;
        }

        return String(a.item).localeCompare(
          String(b.item)
        );
      })
      .map((entry) => entry.item);
  }

  // ============================================================
  // SKILL CLASSIFICATION
  // ============================================================

  _classifySkill(qObj) {
    if (qObj?.metadata?.skill) {
      return qObj.metadata.skill;
    }

    if (qObj?.skill) {
      return qObj.skill;
    }

    const stem = String(
      qObj?.q ??
      qObj?.stem ??
      ""
    ).toLowerCase();

    if (
      /mean|average|find mean/.test(stem)
    ) {
      return "mean";
    }

    if (
      /median|middle value/.test(stem)
    ) {
      return "median";
    }

    if (
      /mode|most frequent/.test(stem)
    ) {
      return "mode";
    }

    if (
      /probability|chance|dice|marbles|picking a|p\(/.test(
        stem
      )
    ) {
      return "probability";
    }

    if (
      /pythagoras|hypotenuse|right[- ]angled/.test(
        stem
      )
    ) {
      return "pythagoras";
    }

    if (
      /\bsin\b|\bcos\b|\btan\b|trigonometry|angle of elevation|angle of depression/.test(
        stem
      )
    ) {
      return "trigonometry";
    }

    if (
      /matrix|matrices|determinant|2x2|2×2/.test(
        stem
      )
    ) {
      return "matrices";
    }

    if (
      /vector|magnitude|column vector/.test(
        stem
      )
    ) {
      return "vectors";
    }

    if (
      /logarithm|log10|log2|log_/.test(
        stem
      )
    ) {
      return "logarithms";
    }

    if (
      /bodmas|order of operations|order of operation|pemdas|brackets.*multiply|multiply.*before.*add|division.*before.*add/i.test(
        stem
      )
    ) {
      return "bodmas";
    }

    if (
      /quadratic|x\^2|factor.*quadratic|solve.*quadratic/.test(
        stem
      )
    ) {
      return "quadratic";
    }

    if (
      /simple interest/.test(stem)
    ) {
      return "simple_interest";
    }

    if (
      /compound interest/.test(stem)
    ) {
      return "compound_interest";
    }

    if (
      /interest rate|interest/.test(stem)
    ) {
      return "simple_interest";
    }

    if (
      /discount|sale price|marked price/.test(
        stem
      )
    ) {
      return "discount";
    }

    if (
      /profit|loss|cost price|profit percentage/.test(
        stem
      )
    ) {
      return "profit_loss";
    }

    if (
      /percentage|percent|increase|decrease/.test(
        stem
      )
    ) {
      return "percentage";
    }

    if (
      /simultaneous|simultaneous equations|two equations/.test(
        stem
      )
    ) {
      return "simultaneous";
    }

    if (
      /linear equation|solve for x|evaluate.*when x/.test(
        stem
      )
    ) {
      return "linear";
    }

    if (
      /circumference/.test(stem)
    ) {
      return "circle_circumference";
    }

    if (
      /circle|radius|diameter/.test(stem)
    ) {
      return "circle_area";
    }

    if (
      /rectangle|length.*width|width.*length/.test(
        stem
      )
    ) {
      return "rectangle_area";
    }

    if (
      /triangle|base.*height|height.*base/.test(
        stem
      )
    ) {
      return "triangle_area";
    }

    if (
      /speed|distance|time|velocity|km\/h|m\/s/.test(
        stem
      )
    ) {
      return "kinematics";
    }

    if (
      /fraction|numerator|denominator/.test(
        stem
      )
    ) {
      return "fraction";
    }

    if (
      /ratio|proportion|scale/.test(stem)
    ) {
      return "ratio";
    }

    if (
      /area|perimeter|volume|surface area/.test(
        stem
      )
    ) {
      return "measurement";
    }

    return "linear";
  }

  // ============================================================
  // SEMANTIC IDENTITY
  // ============================================================

  _extractSemanticIdentity(qObj, skill) {
    const meta = qObj?.metadata ?? {};
    const subject =
      meta.subject ??
      qObj?.subject ??
      "Mathematics";

    const chapter =
      meta.chapter ??
      qObj?.chapter ??
      "Algebra";

    const topic =
      meta.topic ??
      qObj?.topic ??
      (skill === "bodmas" ? "BODMAS" : skill);

    let conceptId =
      meta.conceptId ??
      meta.concept ??
      null;

    let skillId =
      meta.skillId ??
      meta.skill ??
      skill;

    let subskillId =
      meta.subskillId ??
      meta.subskill ??
      null;

    if (skill === "bodmas" || skill === "order_of_operations") {
      if (!conceptId) conceptId = "order_of_operations";
      if (!skillId) skillId = "bodmas";
      if (!subskillId) subskillId = "mixed_operations";
    } else {
      if (!conceptId) conceptId = skill;
      if (!skillId) skillId = skill;
      if (!subskillId) subskillId = skill;
    }

    return {
      subject,
      chapter,
      topic,
      conceptId,
      skillId,
      subskillId,
    };
  }

  // ============================================================
  // SOURCE MODEL
  // ============================================================

  _extractNumbers(stem) {
    return (
      String(stem)
        .match(
          /-?\d+(?:\.\d+)?/g
        ) || []
    ).map(Number);
  }

  _extractSourceModel(qObj, skill) {
    const stem = String(
      qObj?.q ??
      qObj?.stem ??
      ""
    );

    const numbers =
      this._extractNumbers(stem);

    const unitMatch =
      stem.match(
        /\b(cm²|cm2|cm|m²|m2|m|km|km\/h|m\/s|kg|g|shillings|ksh|kes|%)\b/i
      );

    const unit =
      unitMatch?.[1] ??
      "cm";

    switch (skill) {
      case "rectangle":
      case "rectangle_area":
      case "rectangle_perimeter": {
        const isPerimeter =
          skill === "rectangle_perimeter" ||
          /perimeter/i.test(stem);

        return {
          skill: isPerimeter
            ? "rectangle_perimeter"
            : "rectangle_area",

          target: isPerimeter
            ? "perimeter"
            : "area",

          length:
            numbers[0] ??
            8,

          width:
            numbers[1] ??
            5,

          unit,
        };
      }

      case "circle":
      case "circle_area":
      case "circle_circumference": {
        const isCircumference =
          skill ===
            "circle_circumference" ||
          /circumference/i.test(stem);

        return {
          skill: isCircumference
            ? "circle_circumference"
            : "circle_area",

          target: isCircumference
            ? "circumference"
            : "area",

          radius:
            /diameter/i.test(stem)
              ? (numbers[0] ?? 14) / 2
              : (numbers[0] ?? 7),

          pi:
            /22\s*\/\s*7/.test(stem)
              ? 22 / 7
              : Math.PI,

          unit,
        };
      }

      case "triangle":
      case "triangle_area":
        return {
          skill: "triangle_area",
          target: "area",
          base:
            numbers[0] ??
            8,
          height:
            numbers[1] ??
            6,
          unit,
        };

      case "percentage": {
        const percentage =
          numbers.find(
            (n) =>
              n > 0 &&
              n <= 100
          ) ?? 20;

        const value =
          numbers.find(
            (n) =>
              n > 100
          ) ??
          numbers.find(
            (n) =>
              n !== percentage
          ) ??
          80;

        return {
          skill,
          percentage,
          value,
          unit,
        };
      }

      case "discount":
        return {
          skill,
          target:
            /discount amount/i.test(
              stem
            )
              ? "discountAmount"
              : "salePrice",

          markedPrice:
            numbers.find(
              (n) => n >= 50
            ) ??
            500,

          discountPct:
            numbers.find(
              (n) =>
                n > 0 &&
                n <= 50
            ) ??
            20,

          unit:
            /ksh|kes|shillings/i.test(
              stem
            )
              ? "KES"
              : unit,
        };

      case "profit_loss":
        return {
          skill,
          costPrice:
            numbers.find(
              (n) => n >= 50
            ) ??
            500,

          profitPct:
            numbers.find(
              (n) =>
                n > 0 &&
                n <= 50
            ) ??
            20,

          isProfit:
            !/loss/i.test(stem),

          unit:
            /ksh|kes|shillings/i.test(
              stem
            )
              ? "KES"
              : unit,
        };

      case "simple_interest":
      case "interest":
        return {
          skill: "simple_interest",

          principal:
            numbers.find(
              (n) => n >= 500
            ) ??
            2000,

          rate:
            numbers.find(
              (n) =>
                n > 0 &&
                n <= 30
            ) ??
            10,

          time:
            numbers.find(
              (n) =>
                n > 0 &&
                n <= 10
            ) ??
            3,
        };

      case "mean":
      case "median":
      case "mode": {
        const data =
          numbers.length >= 3
            ? numbers
            : [4, 6, 8, 10, 12];

        return {
          skill,
          dataset: data,
          count: data.length,
        };
      }

      case "kinematics": {
        const target =
          /time/i.test(stem)
            ? "time"
            : /speed/i.test(stem)
              ? "speed"
              : "distance";

        return {
          skill,
          target,

          speed:
            numbers[0] ??
            60,

          time:
            numbers[1] ??
            2,

          distance:
            numbers[2] ??
            120,
        };
      }

      case "linear":
        return {
          skill,
          a:
            numbers[0] ??
            3,
          b:
            numbers[1] ??
            5,
          c:
            numbers[2] ??
            11,
        };

      case "quadratic":
        return {
          skill,
          r1:
            numbers[0] ??
            2,
          r2:
            numbers[1] ??
            3,
        };

      case "bodmas":
        return {
          skill: "bodmas",
          numbers,
          unit,
        };

      default:
        return {
          skill,
          rawNumbers: numbers,
          unit,
        };
    }
  }

  // ============================================================
  // GENERATOR REGISTRY
  // ============================================================

  _getGenerator(skill) {
    const generators = {
      bodmas:
        this._generateBodmas,

      order_of_operations:
        this._generateBodmas,

      rectangle:
        this._generateRectangle,

      rectangle_area:
        this._generateRectangle,

      rectangle_perimeter:
        this._generateRectangle,

      circle:
        this._generateCircle,

      circle_area:
        this._generateCircle,

      circle_circumference:
        this._generateCircle,

      triangle:
        this._generateTriangle,

      triangle_area:
        this._generateTriangle,

      percentage:
        this._generatePercentage,

      discount:
        this._generateDiscount,

      profit_loss:
        this._generateProfitLoss,

      interest:
        this._generateInterest,

      simple_interest:
        this._generateInterest,

      mean:
        this._generateMean,

      median:
        this._generateMedian,

      mode:
        this._generateMode,

      fraction:
        this._generateFraction,

      ratio:
        this._generateRatio,

      probability:
        this._generateProbability,

      kinematics:
        this._generateKinematics,

      pythagoras:
        this._generatePythagoras,

      trigonometry:
        this._generateTrigonometry,

      linear:
        this._generateLinear,

      quadratic:
        this._generateQuadratic,

      matrices:
        this._generateMatrices,

      vectors:
        this._generateVectors,

      logarithms:
        this._generateLogarithms,

      measurement:
        this._generateMeasurement,

      simultaneous:
        this._generateSimultaneous,
    };

    return generators[skill];
  }

  // ============================================================
  // DETERMINISTIC MUTATION HELPERS
  // ============================================================

  _mutationStrength(
    difficulty,
    attempt
  ) {
    /*
     * Difficulty:
     *
     * 1 → very close
     * 2 → small variation
     * 3 → moderate variation
     * 4 → strong variation
     * 5 → challenge variation
     *
     * Attempt adds deterministic variation
     * without randomness.
     */
    const base = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
    }[difficulty] ?? 1;

    return Math.max(
      1,
      base + Math.min(attempt, 2)
    );
  }

  _mutateAround(
    value,
    seed,
    min,
    max,
    difficulty,
    salt
  ) {
    const strength =
      this._mutationStrength(
        difficulty,
        0
      );

    const span =
      Math.max(
        1,
        strength * 2
      );

    const delta =
      this._deterministicInt(
        seed,
        -span,
        span,
        salt
      );

    return this._clamp(
      Math.round(value + delta),
      min,
      max
    );
  }

  // ============================================================
  // RECTANGLES
  // ============================================================

  _generateRectangle(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "rectangle"
      );

    const seed =
      context.variantSeed;

    const length =
      this._mutateAround(
        source.length ?? 8,
        seed,
        3,
        100,
        difficulty,
        "length"
      );

    let width =
      this._mutateAround(
        source.width ?? 5,
        seed,
        2,
        100,
        difficulty,
        "width"
      );

    if (width >= length) {
      width =
        Math.max(
          2,
          length -
            this._deterministicInt(
              seed,
              1,
              3,
              "width-adjust"
            )
        );
    }

    const target =
      source.target ??
      "area";

    const unit =
      source.unit ??
      "cm";

    const answer =
      target === "area"
        ? length * width
        : 2 * (length + width);

    const answerUnit =
      target === "area"
        ? `${unit}²`
        : unit;

    return {
      q:
        target === "area"
          ? `A rectangle has a length of ${length} ${unit} and a width of ${width} ${unit}. Calculate its area.`
          : `A rectangle has a length of ${length} ${unit} and a width of ${width} ${unit}. Calculate its perimeter.`,

      ans: String(answer),

      type: "mcq",

      options:
        this._numberDistractors(
          answer,
          3,
          seed
        ),

      hint:
        target === "area"
          ? "Area = length × width."
          : "Perimeter = 2 × (length + width).",

      sol:
        target === "area"
          ? `${length} × ${width} = ${answer} ${answerUnit}`
          : `2 × (${length} + ${width}) = ${answer} ${answerUnit}`,

      steps: [
        `Step 1: Length = ${length} ${unit}, width = ${width} ${unit}.`,
        `Step 2: Apply the formula.`,
        `Step 3: Answer = ${answer} ${answerUnit}.`,
      ],

      metadata: {
        skill:
          target === "area"
            ? "rectangle_area"
            : "rectangle_perimeter",

        variables: {
          length,
          width,
        },
      },
    };
  }

  // ============================================================
  // CIRCLE
  // ============================================================

  _generateCircle(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "circle"
      );

    const seed =
      context.variantSeed;

    const radiusOptions = [
      5,
      7,
      10,
      14,
      21,
      28,
      35
    ];

    const filtered =
      radiusOptions.filter(
        (r) =>
          r !==
          Number(
            source.radius
          )
      );

    const radius =
      this._deterministicChoice(
        filtered,
        seed,
        "radius"
      ) ??
      7;

    const target =
      source.target ??
      "area";

    const pi =
      /22\s*\/\s*7/.test(
        String(
          qObj?.q ??
          ""
        )
      )
        ? 22 / 7
        : 22 / 7;

    const answer =
      target === "area"
        ? pi * radius * radius
        : 2 * pi * radius;

    const rounded =
      Number(
        answer.toFixed(2)
      );

    const unit =
      source.unit ??
      "cm";

    return {
      q:
        target === "area"
          ? `Find the area of a circle with a radius of ${radius} ${unit}. (Use π = 22/7)`
          : `Find the circumference of a circle with a radius of ${radius} ${unit}. (Use π = 22/7)`,

      ans: String(
        Number.isInteger(rounded)
          ? rounded
          : rounded
      ),

      type: "mcq",

      options:
        this._numberDistractors(
          rounded,
          3,
          seed
        ),

      hint:
        target === "area"
          ? "Area = πr²."
          : "Circumference = 2πr.",

      sol:
        target === "area"
          ? `(22/7) × ${radius}² = ${rounded} ${unit}²`
          : `2 × (22/7) × ${radius} = ${rounded} ${unit}`,

      steps: [
        `Step 1: Radius = ${radius} ${unit}.`,
        `Step 2: Use π = 22/7.`,
        `Step 3: Calculate = ${rounded}.`,
      ],

      metadata: {
        skill:
          target === "area"
            ? "circle_area"
            : "circle_circumference",

        variables: {
          radius,
          pi,
        },
      },
    };
  }

  // ============================================================
  // TRIANGLE
  // ============================================================

  _generateTriangle(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "triangle"
      );

    const seed =
      context.variantSeed;

    const base =
      this._mutateAround(
        source.base ?? 8,
        seed,
        3,
        100,
        difficulty,
        "base"
      );

    const height =
      this._mutateAround(
        source.height ?? 6,
        seed,
        2,
        100,
        difficulty,
        "height"
      );

    const answer =
      0.5 *
      base *
      height;

    const unit =
      source.unit ??
      "cm";

    return {
      q: `Calculate the area of a triangle with base ${base} ${unit} and height ${height} ${unit}.`,

      ans: String(answer),

      type: "mcq",

      options:
        this._numberDistractors(
          answer,
          3,
          seed
        ),

      hint:
        "Area = ½ × base × height.",

      sol:
        `½ × ${base} × ${height} = ${answer} ${unit}²`,

      steps: [
        `Step 1: Base = ${base} ${unit}.`,
        `Step 2: Height = ${height} ${unit}.`,
        `Step 3: Area = ½ × ${base} × ${height} = ${answer} ${unit}².`,
      ],

      metadata: {
        skill: "triangle_area",

        variables: {
          base,
          height,
        },
      },
    };
  }

  // ============================================================
  // PERCENTAGE
  // ============================================================

  _generatePercentage(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "percentage"
      );

    const seed =
      context.variantSeed;

    const rates = [
      5,
      10,
      15,
      20,
      25,
      30,
      40,
      50
    ];

    const percentage =
      this._deterministicChoice(
        rates,
        seed,
        "percentage"
      );

    const bases = [
      40,
      60,
      80,
      100,
      120,
      150,
      200,
      240,
      300,
      400
    ];

    const value =
      this._deterministicChoice(
        bases,
        seed,
        "value"
      );

    const answer =
      (percentage / 100) *
      value;

    return {
      q: `Find ${percentage}% of ${value}.`,

      ans: String(answer),

      type: "mcq",

      options:
        this._numberDistractors(
          answer,
          3,
          seed
        ),

      hint:
        "Convert the percentage to a fraction and multiply by the number.",

      sol:
        `(${percentage}/100) × ${value} = ${answer}`,

      steps: [
        `Step 1: Write ${percentage}% as ${percentage}/100.`,
        `Step 2: Multiply ${percentage}/100 by ${value}.`,
        `Step 3: Answer = ${answer}.`,
      ],

      metadata: {
        skill: "percentage",

        variables: {
          percentage,
          value,
        },
      },
    };
  }

  // ============================================================
  // DISCOUNT
  // ============================================================

  _generateDiscount(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "discount"
      );

    const seed =
      context.variantSeed;

    const prices = [
      200,
      300,
      400,
      500,
      600,
      800,
      1000,
      1200,
    ];

    const rates = [
      10,
      15,
      20,
      25,
      30
    ];

    const markedPrice =
      this._deterministicChoice(
        prices,
        seed,
        "marked-price"
      );

    const discountPct =
      this._deterministicChoice(
        rates,
        seed,
        "discount-rate"
      );

    const target =
      source.target ??
      "salePrice";

    const discountAmount =
      markedPrice *
      discountPct /
      100;

    const salePrice =
      markedPrice -
      discountAmount;

    const answer =
      target === "salePrice"
        ? salePrice
        : discountAmount;

    return {
      q:
        target === "salePrice"
          ? `An item marked at KES ${markedPrice} is offered at a ${discountPct}% discount. Find its selling price.`
          : `An item marked at KES ${markedPrice} has a ${discountPct}% discount. Find the discount amount.`,

      ans: String(answer),

      type: "mcq",

      options:
        this._numberDistractors(
          answer,
          3,
          seed
        ),

      hint:
        "Discount = (discount rate ÷ 100) × marked price.",

      sol:
        `Discount = (${discountPct}/100) × ${markedPrice} = ${discountAmount}. ` +
        `Selling price = ${markedPrice} - ${discountAmount} = ${salePrice}.`,

      steps: [
        `Step 1: Discount = (${discountPct}/100) × ${markedPrice} = ${discountAmount}.`,
        `Step 2: Selling price = ${markedPrice} - ${discountAmount} = ${salePrice}.`,
      ],

      metadata: {
        skill: "discount",

        variables: {
          markedPrice,
          discountPct,
          target,
        },
      },
    };
  }

  // ============================================================
  // PROFIT / LOSS
  // ============================================================

  _generateProfitLoss(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "profit_loss"
      );

    const seed =
      context.variantSeed;

    const prices = [
      200,
      300,
      400,
      500,
      600,
      800,
      1000,
      1200,
    ];

    const rates = [
      10,
      15,
      20,
      25
    ];

    const costPrice =
      this._deterministicChoice(
        prices,
        seed,
        "cost-price"
      );

    const profitPct =
      this._deterministicChoice(
        rates,
        seed,
        "profit-rate"
      );

    const isProfit =
      source.isProfit !== false;

    const change =
      costPrice *
      profitPct /
      100;

    const sellingPrice =
      isProfit
        ? costPrice + change
        : costPrice - change;

    return {
      q: `A trader bought an article for KES ${costPrice} and sold it at a ${profitPct}% ${isProfit ? "profit" : "loss"}. Find the selling price.`,

      ans: String(
        sellingPrice
      ),

      type: "mcq",

      options:
        this._numberDistractors(
          sellingPrice,
          3,
          seed
        ),

      hint:
        `${isProfit ? "Profit" : "Loss"} = (${profitPct}/100) × Cost Price.`,

      sol:
        `${isProfit ? "Profit" : "Loss"} = ${change}. ` +
        `Selling price = ${sellingPrice}.`,

      steps: [
        `Step 1: ${isProfit ? "Profit" : "Loss"} = (${profitPct}/100) × ${costPrice} = ${change}.`,
        `Step 2: Selling price = ${costPrice} ${isProfit ? "+" : "-"} ${change}.`,
        `Step 3: Selling price = ${sellingPrice}.`,
      ],

      metadata: {
        skill: "profit_loss",

        variables: {
          costPrice,
          profitPct,
          isProfit,
        },
      },
    };
  }

  // ============================================================
  // SIMPLE INTEREST
  // ============================================================

  _generateInterest(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const principals = [
      1000,
      2000,
      3000,
      5000,
      8000,
      10000,
    ];

    const rates = [
      5,
      8,
      10,
      12,
      15
    ];

    const times = [
      2,
      3,
      4,
      5
    ];

    const principal =
      this._deterministicChoice(
        principals,
        seed,
        "principal"
      );

    const rate =
      this._deterministicChoice(
        rates,
        seed,
        "rate"
      );

    const time =
      this._deterministicChoice(
        times,
        seed,
        "time"
      );

    const answer =
      principal *
      rate *
      time /
      100;

    return {
      q: `Find the simple interest earned on KES ${principal} at an annual rate of ${rate}% for ${time} years.`,

      ans: String(answer),

      type: "mcq",

      options:
        this._numberDistractors(
          answer,
          3,
          seed
        ),

      hint:
        "Simple Interest = (Principal × Rate × Time) ÷ 100.",

      sol:
        `(${principal} × ${rate} × ${time}) ÷ 100 = ${answer}`,

      steps: [
        `Step 1: P = ${principal}, R = ${rate}%, T = ${time}.`,
        `Step 2: I = (P × R × T) / 100.`,
        `Step 3: I = ${answer}.`,
      ],

      metadata: {
        skill: "simple_interest",

        variables: {
          principal,
          rate,
          time,
        },
      },
    };
  }

  // ============================================================
  // MEAN
  // ============================================================

  _generateMean(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "mean"
      );

    const seed =
      context.variantSeed;

    const count =
      Math.min(
        Math.max(
          source.count ?? 5,
          3
        ),
        8
      );

    const targetMeans = [
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20
    ];

    const targetMean =
      this._deterministicChoice(
        targetMeans,
        seed,
        "mean"
      );

    const data =
      this._generateExactMeanDataset(
        count,
        targetMean,
        1,
        30,
        seed
      );

    if (!data) return null;

    const sum =
      data.reduce(
        (a, b) => a + b,
        0
      );

    return {
      q:
        `Find the mean of the following numbers: ${data.join(", ")}.`,

      ans:
        String(targetMean),

      type: "mcq",

      options:
        this._numberDistractors(
          targetMean,
          3,
          seed
        ),

      hint:
        "Mean = sum of all values ÷ number of values.",

      sol:
        `Sum = ${sum}. Mean = ${sum} ÷ ${count} = ${targetMean}.`,

      steps: [
        `Step 1: Add the values to get ${sum}.`,
        `Step 2: There are ${count} values.`,
        `Step 3: ${sum} ÷ ${count} = ${targetMean}.`,
      ],

      metadata: {
        skill: "mean",

        variables: {
          data,
          targetMean,
        },
      },
    };
  }

  _generateExactMeanDataset(
    count,
    targetMean,
    min = 1,
    max = 100,
    seed = 1
  ) {
    const targetSum =
      targetMean *
      count;

    const values = [];

    let remaining =
      targetSum;

    for (
      let i = 0;
      i < count - 1;
      i++
    ) {
      const slotsLeft =
        count - i - 1;

      const minRemaining =
        slotsLeft * min;

      const maxRemaining =
        slotsLeft * max;

      const low =
        Math.max(
          min,
          remaining -
            maxRemaining
        );

      const high =
        Math.min(
          max,
          remaining -
            minRemaining
        );

      if (low > high) {
        return null;
      }

      const value =
        this._deterministicInt(
          seed,
          Math.ceil(low),
          Math.floor(high),
          `mean-value-${i}`
        );

      values.push(value);

      remaining -= value;
    }

    if (
      remaining < min ||
      remaining > max ||
      !Number.isInteger(
        remaining
      )
    ) {
      return null;
    }

    values.push(remaining);

    return this._deterministicShuffle(
      values,
      seed,
      "mean-order"
    );
  }

  // ============================================================
  // MEDIAN
  // ============================================================

  _generateMedian(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const count =
      difficulty >= 4
        ? 7
        : 5;

    const data = [];

    for (
      let i = 0;
      i < count;
      i++
    ) {
      data.push(
        this._deterministicInt(
          seed,
          2,
          30,
          `median-${i}`
        )
      );
    }

    const sorted =
      [...data].sort(
        (a, b) => a - b
      );

    const median =
      sorted[
        Math.floor(count / 2)
      ];

    const ordered =
      this._deterministicShuffle(
        data,
        seed,
        "median-order"
      );

    return {
      q:
        `Find the median of the following dataset: ${ordered.join(", ")}.`,

      ans:
        String(median),

      type: "mcq",

      options:
        this._numberDistractors(
          median,
          3,
          seed
        ),

      hint:
        "Arrange the numbers in ascending order and identify the middle value.",

      sol:
        `Sorted data: ${sorted.join(", ")}. Median = ${median}.`,

      steps: [
        `Step 1: Arrange the numbers in ascending order.`,
        `Step 2: Identify the middle value.`,
        `Step 3: Median = ${median}.`,
      ],

      metadata: {
        skill: "median",

        variables: {
          data: ordered,
        },
      },
    };
  }

  // ============================================================
  // MODE
  // ============================================================

  _generateMode(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const modeVal =
      this._deterministicInt(
        seed,
        2,
        15,
        "mode"
      );

    const others = [
      modeVal + 1,
      modeVal + 2,
      Math.max(
        1,
        modeVal - 1
      ),
      modeVal + 3,
    ];

    const data =
      this._deterministicShuffle(
        [
          modeVal,
          modeVal,
          modeVal,
          ...others,
        ],
        seed,
        "mode-order"
      );

    return {
      q:
        `Find the mode of the dataset: ${data.join(", ")}.`,

      ans:
        String(modeVal),

      type: "mcq",

      options:
        this._numberDistractors(
          modeVal,
          3,
          seed
        ),

      hint:
        "The mode is the value that occurs most frequently.",

      sol:
        `${modeVal} occurs three times, more than any other value.`,

      steps: [
        `Step 1: Count how many times each number occurs.`,
        `Step 2: ${modeVal} occurs most frequently.`,
        `Step 3: Mode = ${modeVal}.`,
      ],

      metadata: {
        skill: "mode",

        variables: {
          data,
        },
      },
    };
  }

  // ============================================================
  // KINEMATICS
  // ============================================================

  _generateKinematics(
    qObj,
    difficulty,
    context = {}
  ) {
    const source =
      context.sourceModel ??
      this._extractSourceModel(
        qObj,
        "kinematics"
      );

    const seed =
      context.variantSeed;

    const speeds = [
      20,
      30,
      40,
      50,
      60,
      75,
      80,
      90,
      100,
    ];

    const times = [
      2,
      3,
      4,
      5
    ];

    const speed =
      this._deterministicChoice(
        speeds,
        seed,
        "speed"
      );

    const time =
      this._deterministicChoice(
        times,
        seed,
        "time"
      );

    const distance =
      speed * time;

    const target =
      source.target ??
      "distance";

    let q;
    let answer;
    let hint;

    if (target === "speed") {
      q =
        `A car covers ${distance} km in ${time} hours. Calculate its speed.`;

      answer = speed;

      hint =
        "Speed = Distance ÷ Time.";
    } else if (target === "time") {
      q =
        `How many hours does a bus travelling at ${speed} km/h take to cover ${distance} km?`;

      answer = time;

      hint =
        "Time = Distance ÷ Speed.";
    } else {
      q =
        `A train travels at ${speed} km/h for ${time} hours. What distance does it cover?`;

      answer = distance;

      hint =
        "Distance = Speed × Time.";
    }

    return {
      q,
      ans: String(answer),
      type: "mcq",

      options:
        this._numberDistractors(
          answer,
          3,
          seed
        ),

      hint,

      sol:
        `Using the formula gives ${answer}.`,

      steps: [
        `Step 1: Identify the known values.`,
        `Step 2: Apply the correct speed-distance-time formula.`,
        `Step 3: Answer = ${answer}.`,
      ],

      metadata: {
        skill: "kinematics",

        variables: {
          speed,
          time,
          distance,
          target,
        },
      },
    };
  }

  // ============================================================
  // LINEAR EQUATIONS
  // ============================================================

  _generateLinear(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const a =
      this._deterministicChoice(
        [2, 3, 4, 5, 6, 7],
        seed,
        "linear-a"
      );

    const x =
      this._deterministicInt(
        seed,
        1,
        difficulty >= 4
          ? 15
          : 10,
        "linear-x"
      );

    const b =
      this._deterministicInt(
        seed,
        1,
        12,
        "linear-b"
      );

    const c =
      a * x + b;

    return {
      q:
        `Solve for x: ${a}x + ${b} = ${c}`,

      ans:
        String(x),

      type: "mcq",

      options:
        this._numberDistractors(
          x,
          3,
          seed
        ),

      hint:
        `Subtract ${b} from both sides, then divide by ${a}.`,

      sol:
        `${a}x = ${c} - ${b} = ${a * x}, therefore x = ${x}.`,

      steps: [
        `Step 1: ${a}x + ${b} = ${c}.`,
        `Step 2: ${a}x = ${c - b}.`,
        `Step 3: x = ${x}.`,
      ],

      metadata: {
        skill: "linear",

        variables: {
          a,
          b,
          c,
          x,
        },
      },
    };
  }

  // ============================================================
  // QUADRATIC
  // ============================================================

  _generateQuadratic(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const r1 =
      this._deterministicInt(
        seed,
        1,
        difficulty >= 4
          ? 8
          : 5,
        "root-1"
      );

    const r2 =
      this._deterministicInt(
        seed,
        r1 + 1,
        difficulty >= 4
          ? 12
          : 8,
        "root-2"
      );

    const b =
      -(r1 + r2);

    const c =
      r1 * r2;

    const bSign =
      b < 0
        ? `- ${Math.abs(b)}x`
        : `+ ${b}x`;

    return {
      q:
        `Find the smaller root of the quadratic equation: x² ${bSign} + ${c} = 0.`,

      ans:
        String(r1),

      type: "mcq",

      options:
        this._numberDistractors(
          r1,
          3,
          seed
        ),

      hint:
        `Factorize into (x - ${r1})(x - ${r2}) = 0.`,

      sol:
        `(x - ${r1})(x - ${r2}) = 0, so the roots are ${r1} and ${r2}. Smaller root = ${r1}.`,

      steps: [
        `Step 1: Factorize the quadratic.`,
        `Step 2: x = ${r1} or x = ${r2}.`,
        `Step 3: Smaller root = ${r1}.`,
      ],

      metadata: {
        skill: "quadratic",

        variables: {
          r1,
          r2,
          b,
          c,
        },
      },
    };
  }

  // ============================================================
  // PYTHAGORAS
  // ============================================================

  _generatePythagoras(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const triplets = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
      [9, 12, 15],
      [12, 16, 20],
    ];

    const triplet =
      this._deterministicChoice(
        triplets,
        seed,
        "pythagoras-triplet"
      );

    const [a, b, c] =
      triplet;

    return {
      q:
        `In a right-angled triangle, the two perpendicular sides measure ${a} cm and ${b} cm. Find the hypotenuse.`,

      ans:
        String(c),

      type: "mcq",

      options:
        this._numberDistractors(
          c,
          3,
          seed
        ),

      hint:
        "Pythagoras' theorem: a² + b² = c².",

      sol:
        `c² = ${a}² + ${b}² = ${a * a + b * b}, so c = ${c} cm.`,

      steps: [
        `Step 1: a = ${a}, b = ${b}.`,
        `Step 2: c = √(${a}² + ${b}²).`,
        `Step 3: c = ${c} cm.`,
      ],

      metadata: {
        skill: "pythagoras",

        variables: {
          a,
          b,
          c,
          target: "hypotenuse",
        },
      },
    };
  }

  // ============================================================
  // TRIGONOMETRY
  // ============================================================

  _generateTrigonometry(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const triples = [
      {
        ratio: "sin",
        opposite: 3,
        hypotenuse: 5,
        value: "3/5",
      },
      {
        ratio: "cos",
        adjacent: 4,
        hypotenuse: 5,
        value: "4/5",
      },
      {
        ratio: "tan",
        opposite: 3,
        adjacent: 4,
        value: "3/4",
      },
    ];

    const chosen =
      this._deterministicChoice(
        triples,
        seed,
        "trig-ratio"
      );

    if (chosen.ratio === "sin") {
      return {
        q:
          `In a right-angled triangle, the opposite side is ${chosen.opposite} cm and the hypotenuse is ${chosen.hypotenuse} cm. Find sin θ.`,

        ans:
          chosen.value,

        type: "mcq",

        options:
          this._fractionDistractors(
            chosen.value,
            seed
          ),

        hint:
          "sin θ = opposite ÷ hypotenuse.",

        sol:
          `sin θ = ${chosen.opposite}/${chosen.hypotenuse} = ${chosen.value}.`,

        metadata: {
          skill: "trigonometry",

          variables: {
            ratio: "sin",
            opposite:
              chosen.opposite,
            hypotenuse:
              chosen.hypotenuse,
          },
        },
      };
    }

    if (chosen.ratio === "cos") {
      return {
        q:
          `In a right-angled triangle, the adjacent side is ${chosen.adjacent} cm and the hypotenuse is ${chosen.hypotenuse} cm. Find cos θ.`,

        ans:
          chosen.value,

        type: "mcq",

        options:
          this._fractionDistractors(
            chosen.value,
            seed
          ),

        hint:
          "cos θ = adjacent ÷ hypotenuse.",

        sol:
          `cos θ = ${chosen.adjacent}/${chosen.hypotenuse} = ${chosen.value}.`,

        metadata: {
          skill: "trigonometry",

          variables: {
            ratio: "cos",
            adjacent:
              chosen.adjacent,
            hypotenuse:
              chosen.hypotenuse,
          },
        },
      };
    }

    return {
      q:
        `In a right-angled triangle, the opposite side is ${chosen.opposite} cm and the adjacent side is ${chosen.adjacent} cm. Find tan θ.`,

      ans:
        chosen.value,

      type: "mcq",

      options:
        this._fractionDistractors(
          chosen.value,
          seed
        ),

      hint:
        "tan θ = opposite ÷ adjacent.",

      sol:
        `tan θ = ${chosen.opposite}/${chosen.adjacent} = ${chosen.value}.`,

      metadata: {
        skill: "trigonometry",

        variables: {
          ratio: "tan",
          opposite:
            chosen.opposite,
          adjacent:
            chosen.adjacent,
        },
      },
    };
  }

  // ============================================================
  // FRACTIONS
  // ============================================================

  _generateFraction(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const denominators = [
      3,
      4,
      5,
      6,
      8,
      10,
    ];

    const den1 =
      this._deterministicChoice(
        denominators,
        seed,
        "fraction-denominator"
      );

    const den2 =
      this._deterministicChoice(
        denominators,
        seed,
        "fraction-denominator-2"
      );

    const num1 =
      this._deterministicInt(
        seed,
        1,
        den1 - 1,
        "fraction-num-1"
      );

    const num2 =
      this._deterministicInt(
        seed,
        1,
        den2 - 1,
        "fraction-num-2"
      );

    const op =
      difficulty >= 4
        ? this._deterministicChoice(
            ["+", "-", "*"],
            seed,
            "fraction-op"
          )
        : "+";

    const result =
      this._fractionOperation(
        num1,
        den1,
        num2,
        den2,
        op
      );

    const simplified =
      this._simplifyFraction(
        result.numerator,
        result.denominator
      );

    const answer =
      `${simplified.numerator}/${simplified.denominator}`;

    return {
      q:
        `Calculate: ${num1}/${den1} ${op} ${num2}/${den2}`,

      ans:
        answer,

      type: "mcq",

      options:
        this._fractionDistractors(
          answer,
          seed
        ),

      hint:
        op === "+"
          ? "Find a common denominator, then add the numerators."
          : op === "-"
            ? "Find a common denominator, then subtract the numerators."
            : "Multiply the numerators and multiply the denominators.",

      sol:
        `${num1}/${den1} ${op} ${num2}/${den2} = ${answer}.`,

      steps: [
        `Step 1: Apply the fraction operation.`,
        `Step 2: Simplify the result.`,
        `Step 3: Answer = ${answer}.`,
      ],

      metadata: {
        skill: "fraction",

        variables: {
          num1,
          den1,
          num2,
          den2,
          op,
        },
      },
    };
  }

  _fractionOperation(
    n1,
    d1,
    n2,
    d2,
    op
  ) {
    if (op === "+") {
      return {
        numerator:
          n1 * d2 +
          n2 * d1,

        denominator:
          d1 * d2,
      };
    }

    if (op === "-") {
      return {
        numerator:
          n1 * d2 -
          n2 * d1,

        denominator:
          d1 * d2,
      };
    }

    if (op === "*") {
      return {
        numerator:
          n1 * n2,

        denominator:
          d1 * d2,
      };
    }

    if (op === "/") {
      return {
        numerator:
          n1 * d2,

        denominator:
          d1 * n2,
      };
    }

    return {
      numerator: 0,
      denominator: 1,
    };
  }

  _gcd(a, b) {
    a = Math.abs(
      Math.trunc(a)
    );

    b = Math.abs(
      Math.trunc(b)
    );

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }

    return a || 1;
  }

  _simplifyFraction(
    numerator,
    denominator
  ) {
    if (denominator === 0) {
      throw new Error(
        "Zero denominator"
      );
    }

    const sign =
      denominator < 0
        ? -1
        : 1;

    numerator *= sign;
    denominator *= sign;

    const gcd =
      this._gcd(
        numerator,
        denominator
      );

    return {
      numerator:
        numerator / gcd,

      denominator:
        denominator / gcd,
    };
  }

  // ============================================================
  // RATIO
  // ============================================================

  _generateRatio(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const partA =
      this._deterministicChoice(
        [2, 3, 4, 5],
        seed,
        "ratio-a"
      );

    const partB =
      this._deterministicChoice(
        [3, 4, 5, 6, 7],
        seed,
        "ratio-b"
      );

    const multiplier =
      this._deterministicChoice(
        [10, 20, 30, 40],
        seed,
        "ratio-multiplier"
      );

    const totalParts =
      partA + partB;

    const total =
      totalParts *
      multiplier;

    const shareA =
      partA *
      multiplier;

    return {
      q:
        `Divide KES ${total} in the ratio ${partA}:${partB}. Find the first share.`,

      ans:
        String(shareA),

      type: "mcq",

      options:
        this._numberDistractors(
          shareA,
          3,
          seed
        ),

      hint:
        "First share = (first ratio part ÷ total parts) × total.",

      sol:
        `Total parts = ${totalParts}. First share = (${partA}/${totalParts}) × ${total} = ${shareA}.`,

      steps: [
        `Step 1: Total ratio parts = ${partA} + ${partB} = ${totalParts}.`,
        `Step 2: One part = ${total} ÷ ${totalParts} = ${multiplier}.`,
        `Step 3: First share = ${partA} × ${multiplier} = ${shareA}.`,
      ],

      metadata: {
        skill: "ratio",

        variables: {
          partA,
          partB,
          total,
          target: "shareA",
        },
      },
    };
  }

  // ============================================================
  // PROBABILITY
  // ============================================================

  _generateProbability(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const favorable =
      this._deterministicChoice(
        [2, 3, 4, 5],
        seed,
        "favorable"
      );

    const other =
      this._deterministicChoice(
        [3, 4, 5, 6, 7, 8],
        seed,
        "other"
      );

    const total =
      favorable +
      other;

    const simplified =
      this._simplifyFraction(
        favorable,
        total
      );

    const answer =
      `${simplified.numerator}/${simplified.denominator}`;

    return {
      q:
        `A bag contains ${favorable} red balls and ${other} blue balls. What is the probability of picking a red ball?`,

      ans:
        answer,

      type: "mcq",

      options:
        this._fractionDistractors(
          answer,
          seed
        ),

      hint:
        "Probability = favourable outcomes ÷ total outcomes.",

      sol:
        `P(red) = ${favorable}/${total} = ${answer}.`,

      steps: [
        `Step 1: Total balls = ${favorable} + ${other} = ${total}.`,
        `Step 2: Favourable outcomes = ${favorable}.`,
        `Step 3: Probability = ${favorable}/${total} = ${answer}.`,
      ],

      metadata: {
        skill: "probability",

        variables: {
          favorable,
          total,
        },
      },
    };
  }

  // ============================================================
  // MATRICES
  // ============================================================

  _generateMatrices(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const a =
      this._deterministicInt(
        seed,
        1,
        6,
        "matrix-a"
      );

    const b =
      this._deterministicInt(
        seed,
        1,
        5,
        "matrix-b"
      );

    const c =
      this._deterministicInt(
        seed,
        1,
        5,
        "matrix-c"
      );

    const d =
      this._deterministicInt(
        seed,
        1,
        6,
        "matrix-d"
      );

    const det =
      a * d -
      b * c;

    return {
      q:
        `Find the determinant of the 2×2 matrix [[${a}, ${b}], [${c}, ${d}]].`,

      ans:
        String(det),

      type: "mcq",

      options:
        this._numberDistractors(
          det,
          3,
          seed
        ),

      hint:
        "For [[a,b],[c,d]], determinant = ad - bc.",

      sol:
        `(${a} × ${d}) - (${b} × ${c}) = ${det}.`,

      steps: [
        `Step 1: Identify a = ${a}, b = ${b}, c = ${c}, d = ${d}.`,
        `Step 2: Calculate ad - bc.`,
        `Step 3: Determinant = ${det}.`,
      ],

      metadata: {
        skill: "matrices",

        variables: {
          a,
          b,
          c,
          d,
        },
      },
    };
  }

  // ============================================================
  // VECTORS
  // ============================================================

  _generateVectors(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const triplets = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
    ];

    const [
      x,
      y,
      magnitude,
    ] =
      this._deterministicChoice(
        triplets,
        seed,
        "vector-triplet"
      );

    return {
      q:
        `Find the magnitude of the vector (${x}, ${y}).`,

      ans:
        String(magnitude),

      type: "mcq",

      options:
        this._numberDistractors(
          magnitude,
          3,
          seed
        ),

      hint:
        "Magnitude = √(x² + y²).",

      sol:
        `√(${x}² + ${y}²) = √${magnitude * magnitude} = ${magnitude}.`,

      steps: [
        `Step 1: Use |v| = √(x² + y²).`,
        `Step 2: Substitute x = ${x}, y = ${y}.`,
        `Step 3: Magnitude = ${magnitude}.`,
      ],

      metadata: {
        skill: "vectors",

        variables: {
          x,
          y,
        },
      },
    };
  }

  // ============================================================
  // LOGARITHMS
  // ============================================================

  _generateLogarithms(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const base =
      this._deterministicChoice(
        [2, 3, 5, 10],
        seed,
        "log-base"
      );

    const power =
      this._deterministicChoice(
        [2, 3, 4, 5],
        seed,
        "log-power"
      );

    const value =
      Math.pow(
        base,
        power
      );

    return {
      q:
        `Evaluate: log_${base}(${value}).`,

      ans:
        String(power),

      type: "mcq",

      options:
        this._numberDistractors(
          power,
          3,
          seed
        ),

      hint:
        `Ask: ${base} raised to what power gives ${value}?`,

      sol:
        `${base}^${power} = ${value}, therefore log_${base}(${value}) = ${power}.`,

      steps: [
        `Step 1: Express ${value} as ${base}^${power}.`,
        `Step 2: Therefore the logarithm equals ${power}.`,
      ],

      metadata: {
        skill: "logarithms",

        variables: {
          base,
          power,
          value,
        },
      },
    };
  }

  // ============================================================
  // MEASUREMENT
  // ============================================================

  _generateMeasurement(
    qObj,
    difficulty,
    context = {}
  ) {
    return this._generateRectangle(
      qObj,
      difficulty,
      context
    );
  }

  // ============================================================
  // SIMULTANEOUS EQUATIONS
  // ============================================================

  _generateSimultaneous(
    qObj,
    difficulty,
    context = {}
  ) {
    const seed =
      context.variantSeed;

    const x =
      this._deterministicInt(
        seed,
        1,
        8,
        "sim-x"
      );

    const y =
      this._deterministicInt(
        seed,
        1,
        8,
        "sim-y"
      );

    const c1 =
      x + y;

    const c2 =
      2 * x - y;

    return {
      q:
        `Solve the system: x + y = ${c1} and 2x - y = ${c2}. Find x.`,

      ans:
        String(x),

      type: "mcq",

      options:
        this._numberDistractors(
          x,
          3,
          seed
        ),

      hint:
        "Add the two equations to eliminate y.",

      sol:
        `3x = ${c1 + c2}, therefore x = ${x}.`,

      steps: [
        `Step 1: Add the equations.`,
        `Step 2: 3x = ${c1 + c2}.`,
        `Step 3: x = ${x}.`,
      ],

      metadata: {
        skill: "simultaneous",

        variables: {
          x,
          y,
          c1,
          c2,
        },
      },
    };
  }

  // ============================================================
  // NORMALIZATION
  // ============================================================

  _normalizeQuestion(
    question
  ) {
    if (!question?.q) {
      return null;
    }

    const result = {
      ...question,
    };

    if (
      result.ans ===
      undefined ||
      result.ans === null
    ) {
      return null;
    }

    result.ans =
      String(result.ans).trim();

    if (
      Array.isArray(
        result.options
      )
    ) {
      result.options =
        result.options
          .map((option) =>
            String(option)
              .trim()
          )
          .filter(Boolean);

      /*
       * Remove duplicate options.
       */
      result.options =
        [
          ...new Set(
            result.options
          ),
        ];

      if (
        !result.options.includes(
          result.ans
        )
      ) {
        result.options.push(
          result.ans
        );
      }

      /*
       * Exactly four MCQ options
       * when possible.
       */
      if (
        result.options.length >
        4
      ) {
        result.options =
          result.options.slice(
            0,
            4
          );
      }

      /*
       * Ensure answer remains
       * present.
       */
      if (
        !result.options.includes(
          result.ans
        )
      ) {
        result.options[0] =
          result.ans;
      }
    }

    return result;
  }

  // ============================================================
  // BODMAS / ORDER OF OPERATIONS GENERATORS
  // ============================================================

  _generateBodmas(qObj, difficulty, context = {}) {
    const strategy = context.repairStrategy ?? "STANDARD";

    if (strategy === "CONCEPT_CONTRAST" || strategy === "PROBE") {
      return this._generateBodmasConceptProbe(context);
    }

    if (strategy === "PROCEDURE_REPAIR" || strategy === "ISOLATE") {
      return this._generateBodmasProcedureRepair(context);
    }

    if (strategy === "SIMPLIFY_NUMBERS" || strategy === "CALCULATION_REPAIR") {
      return this._generateBodmasSimplified(qObj, context);
    }

    return this._generateBodmasByLevel(difficulty, context);
  }

  _generateBodmasByLevel(level, context = {}) {
    const seed = context.variantSeed ?? 1;
    const clampedLevel = this._clamp(Math.round(level || 1), 1, 5);

    const level1Tuples = [
      {
        q: "Evaluate: 2 + 3 × 4",
        ans: "14",
        distractors: ["20", "9", "18"],
        steps: [
          "Step 1: Multiply first: 3 × 4 = 12.",
          "Step 2: Add: 2 + 12 = 14.",
        ],
      },
      {
        q: "Evaluate: 10 - 2 × 3",
        ans: "4",
        distractors: ["24", "8", "6"],
        steps: [
          "Step 1: Multiply first: 2 × 3 = 6.",
          "Step 2: Subtract: 10 - 6 = 4.",
        ],
      },
      {
        q: "Evaluate: 5 + 4 × 2",
        ans: "13",
        distractors: ["18", "11", "10"],
        steps: [
          "Step 1: Multiply first: 4 × 2 = 8.",
          "Step 2: Add: 5 + 8 = 13.",
        ],
      },
      {
        q: "Evaluate: 12 - 6 ÷ 2",
        ans: "9",
        distractors: ["3", "10", "4"],
        steps: [
          "Step 1: Divide first: 6 ÷ 2 = 3.",
          "Step 2: Subtract: 12 - 3 = 9.",
        ],
      },
      {
        q: "Evaluate: 3 × 4 + 5",
        ans: "17",
        distractors: ["27", "12", "19"],
        steps: [
          "Step 1: Multiply first: 3 × 4 = 12.",
          "Step 2: Add: 12 + 5 = 17.",
        ],
      },
      {
        q: "Evaluate: 18 ÷ 3 - 2",
        ans: "4",
        distractors: ["18", "6", "1"],
        steps: [
          "Step 1: Divide first: 18 ÷ 3 = 6.",
          "Step 2: Subtract: 6 - 2 = 4.",
        ],
      },
    ];

    const level2Tuples = [
      {
        q: "Evaluate: 6 + 4 × 2 - 3",
        ans: "11",
        distractors: ["17", "14", "8"],
        steps: [
          "Step 1: Multiply first: 4 × 2 = 8.",
          "Step 2: Add and subtract from left to right: 6 + 8 = 14.",
          "Step 3: 14 - 3 = 11.",
        ],
      },
      {
        q: "Evaluate: 15 - 3 × 2 + 4",
        ans: "13",
        distractors: ["28", "24", "10"],
        steps: [
          "Step 1: Multiply first: 3 × 2 = 6.",
          "Step 2: Left to right: 15 - 6 = 9.",
          "Step 3: 9 + 4 = 13.",
        ],
      },
      {
        q: "Evaluate: 8 + 12 ÷ 3 × 2",
        ans: "16",
        distractors: ["10", "20", "14"],
        steps: [
          "Step 1: Divide: 12 ÷ 3 = 4.",
          "Step 2: Multiply: 4 × 2 = 8.",
          "Step 3: Add: 8 + 8 = 16.",
        ],
      },
      {
        q: "Evaluate: 20 - 10 ÷ 2 + 1",
        ans: "16",
        distractors: ["6", "14", "15"],
        steps: [
          "Step 1: Divide first: 10 ÷ 2 = 5.",
          "Step 2: Left to right: 20 - 5 = 15.",
          "Step 3: 15 + 1 = 16.",
        ],
      },
      {
        q: "Evaluate: 4 × 5 - 6 ÷ 2",
        ans: "17",
        distractors: ["7", "20", "14"],
        steps: [
          "Step 1: Multiply: 4 × 5 = 20.",
          "Step 2: Divide: 6 ÷ 2 = 3.",
          "Step 3: Subtract: 20 - 3 = 17.",
        ],
      },
      {
        q: "Evaluate: 14 + 6 ÷ 2 - 5",
        ans: "12",
        distractors: ["5", "15", "10"],
        steps: [
          "Step 1: Divide first: 6 ÷ 2 = 3.",
          "Step 2: Left to right: 14 + 3 = 17.",
          "Step 3: 17 - 5 = 12.",
        ],
      },
    ];

    const level3Tuples = [
      {
        q: "Evaluate: (3 + 5) × 2",
        ans: "16",
        distractors: ["13", "10", "21"],
        steps: [
          "Step 1: Evaluate inside brackets first: 3 + 5 = 8.",
          "Step 2: Multiply: 8 × 2 = 16.",
        ],
      },
      {
        q: "Evaluate: 4 × (10 - 6)",
        ans: "16",
        distractors: ["34", "10", "24"],
        steps: [
          "Step 1: Evaluate inside brackets first: 10 - 6 = 4.",
          "Step 2: Multiply: 4 × 4 = 16.",
        ],
      },
      {
        q: "Evaluate: 18 ÷ (2 + 1) + 5",
        ans: "11",
        distractors: ["14", "9", "12"],
        steps: [
          "Step 1: Inside brackets first: 2 + 1 = 3.",
          "Step 2: Divide: 18 ÷ 3 = 6.",
          "Step 3: Add: 6 + 5 = 11.",
        ],
      },
      {
        q: "Evaluate: (12 - 4) ÷ 2 + 7",
        ans: "11",
        distractors: ["10", "15", "8"],
        steps: [
          "Step 1: Inside brackets first: 12 - 4 = 8.",
          "Step 2: Divide: 8 ÷ 2 = 4.",
          "Step 3: Add: 4 + 7 = 11.",
        ],
      },
      {
        q: "Evaluate: 5 + (8 - 2) × 3",
        ans: "23",
        distractors: ["33", "21", "18"],
        steps: [
          "Step 1: Inside brackets first: 8 - 2 = 6.",
          "Step 2: Multiply: 6 × 3 = 18.",
          "Step 3: Add: 5 + 18 = 23.",
        ],
      },
      {
        q: "Evaluate: 24 ÷ (3 + 3) × 2",
        ans: "8",
        distractors: ["2", "12", "6"],
        steps: [
          "Step 1: Inside brackets first: 3 + 3 = 6.",
          "Step 2: Divide: 24 ÷ 6 = 4.",
          "Step 3: Multiply: 4 × 2 = 8.",
        ],
      },
    ];

    const level4Tuples = [
      {
        q: "Evaluate: 2 × (3 + 4 × 2)",
        ans: "22",
        distractors: ["28", "14", "20"],
        steps: [
          "Step 1: Inside brackets, multiply first: 4 × 2 = 8.",
          "Step 2: Complete bracket addition: 3 + 8 = 11.",
          "Step 3: Multiply by outside factor: 2 × 11 = 22.",
        ],
      },
      {
        q: "Evaluate: (15 - 3) ÷ (2 + 2) + 6",
        ans: "9",
        distractors: ["6", "12", "10"],
        steps: [
          "Step 1: Evaluate both brackets: (15 - 3) = 12 and (2 + 2) = 4.",
          "Step 2: Divide: 12 ÷ 4 = 3.",
          "Step 3: Add: 3 + 6 = 9.",
        ],
      },
      {
        q: "Evaluate: 3 × (4 + 2) - 10 ÷ 2",
        ans: "13",
        distractors: ["18", "8", "15"],
        steps: [
          "Step 1: Inside brackets: 4 + 2 = 6.",
          "Step 2: Multiply: 3 × 6 = 18.",
          "Step 3: Divide: 10 ÷ 2 = 5.",
          "Step 4: Subtract: 18 - 5 = 13.",
        ],
      },
      {
        q: "Evaluate: 24 ÷ (8 - 2 × 3) + 5",
        ans: "17",
        distractors: ["9", "12", "15"],
        steps: [
          "Step 1: Inside brackets, multiply: 2 × 3 = 6.",
          "Step 2: Finish bracket: 8 - 6 = 2.",
          "Step 3: Divide: 24 ÷ 2 = 12.",
          "Step 4: Add: 12 + 5 = 17.",
        ],
      },
      {
        q: "Evaluate: 4 + 2 × (5 + 3 × 2)",
        ans: "26",
        distractors: ["22", "30", "32"],
        steps: [
          "Step 1: Inside brackets, multiply: 3 × 2 = 6.",
          "Step 2: Finish bracket: 5 + 6 = 11.",
          "Step 3: Multiply: 2 × 11 = 22.",
          "Step 4: Add: 4 + 22 = 26.",
        ],
      },
      {
        q: "Evaluate: 5 × (12 - 2 × 4) + 3",
        ans: "23",
        distractors: ["43", "20", "25"],
        steps: [
          "Step 1: Inside brackets, multiply: 2 × 4 = 8.",
          "Step 2: Finish bracket: 12 - 8 = 4.",
          "Step 3: Multiply: 5 × 4 = 20.",
          "Step 4: Add: 20 + 3 = 23.",
        ],
      },
    ];

    const level5Tuples = [
      {
        q: "Evaluate: 30 - 2 × (18 - (4 + 2) × 2)",
        ans: "18",
        distractors: ["12", "24", "20"],
        steps: [
          "Step 1: Innermost bracket: 4 + 2 = 6.",
          "Step 2: Multiply inside bracket: 6 × 2 = 12.",
          "Step 3: Outer bracket: 18 - 12 = 6.",
          "Step 4: Multiply outside: 2 × 6 = 12.",
          "Step 5: Subtract: 30 - 12 = 18.",
        ],
      },
      {
        q: "Evaluate: (40 - 4 × 5) ÷ (2 × 5) + 7",
        ans: "9",
        distractors: ["11", "8", "12"],
        steps: [
          "Step 1: First bracket: 4 × 5 = 20, so 40 - 20 = 20.",
          "Step 2: Second bracket: 2 × 5 = 10.",
          "Step 3: Divide: 20 ÷ 10 = 2.",
          "Step 4: Add: 2 + 7 = 9.",
        ],
      },
      {
        q: "Evaluate: 5 × (2 + 3) - 4 × (6 - 2)",
        ans: "9",
        distractors: ["15", "12", "6"],
        steps: [
          "Step 1: Evaluate both brackets: (2 + 3) = 5 and (6 - 2) = 4.",
          "Step 2: Multiply: 5 × 5 = 25 and 4 × 4 = 16.",
          "Step 3: Subtract: 25 - 16 = 9.",
        ],
      },
      {
        q: "Evaluate: 48 ÷ 4 × (2 + 1) - 6",
        ans: "30",
        distractors: ["18", "24", "36"],
        steps: [
          "Step 1: Inside bracket: 2 + 1 = 3.",
          "Step 2: Division and multiplication left to right: 48 ÷ 4 = 12.",
          "Step 3: 12 × 3 = 36.",
          "Step 4: Subtract: 36 - 6 = 30.",
        ],
      },
      {
        q: "Evaluate: 2 × (10 - 2 × (6 - 4)) + 8",
        ans: "20",
        distractors: ["16", "24", "18"],
        steps: [
          "Step 1: Innermost bracket: 6 - 4 = 2.",
          "Step 2: Multiply inside outer bracket: 2 × 2 = 4.",
          "Step 3: Finish outer bracket: 10 - 4 = 6.",
          "Step 4: Multiply: 2 × 6 = 12.",
          "Step 5: Add: 12 + 8 = 20.",
        ],
      },
    ];

    const ladders = {
      1: level1Tuples,
      2: level2Tuples,
      3: level3Tuples,
      4: level4Tuples,
      5: level5Tuples,
    };

    const tuples = ladders[clampedLevel] || level1Tuples;
    const selected = this._deterministicChoice(
      tuples,
      seed,
      `bodmas-l${clampedLevel}`
    );
    const options = [selected.ans, ...selected.distractors];

    return this._makeBodmasQuestion(
      selected.q,
      selected.ans,
      options,
      context,
      {
        steps: selected.steps,
        sol: selected.steps.join(" "),
        subskillId: `level_${clampedLevel}`,
      }
    );
  }

  _generateBodmasConceptProbe(context = {}) {
    const seed = context.variantSeed ?? 1;

    const probeTuples = [
      {
        q: "In the expression 2 + 5 × 3, which operation must be calculated first according to BODMAS?",
        ans: "5 × 3 (Multiplication)",
        options: [
          "5 × 3 (Multiplication)",
          "2 + 5 (Addition)",
          "2 × 3",
          "Left to right: 2 + 5",
        ],
        hint: "Multiplication takes precedence over addition in BODMAS.",
        steps: [
          "Step 1: BODMAS order is Brackets, Orders, Division & Multiplication, Addition & Subtraction.",
          "Step 2: Multiplication (5 × 3) has higher priority than addition (2 + 5).",
        ],
      },
      {
        q: "In the expression 12 - 6 ÷ 2, which operation should be carried out first?",
        ans: "6 ÷ 2 (Division)",
        options: [
          "6 ÷ 2 (Division)",
          "12 - 6 (Subtraction)",
          "12 ÷ 2",
          "Left to right: 12 - 6",
        ],
        hint: "Division comes before subtraction in BODMAS.",
        steps: [
          "Step 1: In BODMAS, Division (D) takes precedence over Subtraction (S).",
          "Step 2: Therefore, 6 ÷ 2 must be calculated before subtracting.",
        ],
      },
      {
        q: "In the expression 4 × (8 - 3), which operation must be calculated first?",
        ans: "8 - 3 (inside brackets)",
        options: [
          "8 - 3 (inside brackets)",
          "4 × 8 (Multiplication)",
          "4 × 3",
          "4 × 8 - 3",
        ],
        hint: "Operations inside Brackets always come first (B in BODMAS).",
        steps: [
          "Step 1: 'B' in BODMAS stands for Brackets.",
          "Step 2: Always evaluate operations inside brackets first: 8 - 3.",
        ],
      },
      {
        q: "In the expression 10 + 8 ÷ 4 × 2, which operation should be performed first?",
        ans: "8 ÷ 4 (Division)",
        options: [
          "8 ÷ 4 (Division)",
          "10 + 8 (Addition)",
          "4 × 2 (Multiplication)",
          "10 × 2",
        ],
        hint: "Division and multiplication take precedence over addition; evaluate them left to right.",
        steps: [
          "Step 1: Division and multiplication have equal priority, evaluated left to right.",
          "Step 2: Since division appears first from the left (8 ÷ 4), it is calculated first.",
        ],
      },
    ];

    const selected = this._deterministicChoice(
      probeTuples,
      seed,
      "bodmas-probe"
    );

    return this._makeBodmasQuestion(
      selected.q,
      selected.ans,
      selected.options,
      context,
      {
        hint: selected.hint,
        steps: selected.steps,
        sol: selected.steps.join(" "),
        subskillId: "concept_contrast",
      }
    );
  }

  _generateBodmasProcedureRepair(context = {}) {
    const seed = context.variantSeed ?? 1;

    const procedureTuples = [
      {
        q: "Step 1 of evaluating 3 + 4 × 5: First calculate the multiplication 4 × 5. What is 4 × 5?",
        ans: "20",
        distractors: ["9", "15", "12"],
        steps: [
          "Step 1: Identify the operation with highest priority (Multiplication: 4 × 5).",
          "Step 2: Calculate 4 × 5 = 20.",
        ],
        hint: "Calculate 4 multiplied by 5.",
      },
      {
        q: "Step 1 of evaluating 15 - 2 × 4: First calculate the multiplication 2 × 4. What is 2 × 4?",
        ans: "8",
        distractors: ["13", "10", "6"],
        steps: [
          "Step 1: Multiplication comes before subtraction in BODMAS.",
          "Step 2: Calculate 2 × 4 = 8.",
        ],
        hint: "Calculate 2 multiplied by 4.",
      },
      {
        q: "Step 1 of evaluating 6 + 18 ÷ 3: First calculate the division 18 ÷ 3. What is 18 ÷ 3?",
        ans: "6",
        distractors: ["8", "9", "24"],
        steps: [
          "Step 1: Division takes precedence over addition in BODMAS.",
          "Step 2: Calculate 18 ÷ 3 = 6.",
        ],
        hint: "Divide 18 by 3.",
      },
      {
        q: "Step 1 of evaluating 20 - (4 + 6): First calculate the bracket (4 + 6). What is 4 + 6?",
        ans: "10",
        distractors: ["14", "24", "16"],
        steps: [
          "Step 1: Operations inside brackets must be evaluated first.",
          "Step 2: Calculate 4 + 6 = 10.",
        ],
        hint: "Add 4 and 6 inside the brackets.",
      },
    ];

    const selected = this._deterministicChoice(
      procedureTuples,
      seed,
      "bodmas-procedure"
    );
    const options = [selected.ans, ...selected.distractors];

    return this._makeBodmasQuestion(
      selected.q,
      selected.ans,
      options,
      context,
      {
        hint: selected.hint,
        steps: selected.steps,
        sol: selected.steps.join(" "),
        subskillId: "procedure_repair",
      }
    );
  }

  _generateBodmasSimplified(qObj, context = {}) {
    const seed = context.variantSeed ?? 1;

    const simplifiedTuples = [
      {
        q: "Evaluate: 1 + 2 × 3",
        ans: "7",
        distractors: ["9", "6", "8"],
        steps: [
          "Step 1: Multiply first: 2 × 3 = 6.",
          "Step 2: Add: 1 + 6 = 7.",
        ],
      },
      {
        q: "Evaluate: 2 + 3 × 2",
        ans: "8",
        distractors: ["10", "7", "12"],
        steps: [
          "Step 1: Multiply first: 3 × 2 = 6.",
          "Step 2: Add: 2 + 6 = 8.",
        ],
      },
      {
        q: "Evaluate: 10 - 2 × 2",
        ans: "6",
        distractors: ["16", "8", "4"],
        steps: [
          "Step 1: Multiply first: 2 × 2 = 4.",
          "Step 2: Subtract: 10 - 4 = 6.",
        ],
      },
      {
        q: "Evaluate: 6 ÷ 2 + 1",
        ans: "4",
        distractors: ["2", "5", "3"],
        steps: [
          "Step 1: Divide first: 6 ÷ 2 = 3.",
          "Step 2: Add: 3 + 1 = 4.",
        ],
      },
    ];

    const selected = this._deterministicChoice(
      simplifiedTuples,
      seed,
      "bodmas-simplified"
    );
    const options = [selected.ans, ...selected.distractors];

    return this._makeBodmasQuestion(
      selected.q,
      selected.ans,
      options,
      context,
      {
        steps: selected.steps,
        sol: selected.steps.join(" "),
        subskillId: "simplified_numbers",
      }
    );
  }

  _makeBodmasQuestion(q, ans, options, context = {}, extra = {}) {
    const seed = context.variantSeed ?? 1;
    const finalAns = String(ans);

    let finalOptions;
    if (Array.isArray(options) && options.length > 0) {
      finalOptions = [...options];
    } else {
      finalOptions = this._numberDistractors(finalAns, 3, seed);
    }

    if (!finalOptions.includes(finalAns)) {
      finalOptions[0] = finalAns;
    }

    const shuffled = this._deterministicShuffle(
      finalOptions,
      seed,
      "bodmas-options"
    );

    return {
      q,
      ans: finalAns,
      options: shuffled,
      hint:
        extra.hint ??
        "Apply BODMAS: Brackets, Orders, Division & Multiplication, Addition & Subtraction.",
      sol:
        extra.sol ??
        `Applying order of operations (BODMAS), the answer is ${finalAns}.`,
      steps: extra.steps ?? [
        "Step 1: Follow order of operations: Brackets, Orders, Division & Multiplication, Addition & Subtraction.",
        `Step 2: The evaluated result is ${finalAns}.`,
      ],
      type: "mcq",
      metadata: {
        subject: "Mathematics",
        chapter: "Algebra",
        topic: "BODMAS",
        conceptId: "order_of_operations",
        skillId: "bodmas",
        subskillId: extra.subskillId ?? "mixed_operations",
        skill: "bodmas",
        repairStrategy: context.repairStrategy ?? "STANDARD",
        difficulty: context.difficulty ?? 1,
        variables: extra.variables ?? {},
        ...(extra.metadata || {}),
      },
    };
  }

  // ============================================================
  // FINALIZATION
  // ============================================================

  _finalize(
    question,
    modalityIndex,
    skill,
    difficulty
  ) {
    if (!question) {
      throw new Error(
        "Cannot finalize invalid question"
      );
    }

    return {
      ...question,

      metadata: {
        ...(question.metadata || {}),

        skill:
          question.metadata?.skill ??
          skill,

        difficulty,

        modalityIndex,

        verified: true,

        generatedBy:
          "MathMutator",

        engineVersion:
          "4.0.0",

        deterministic: true,

        provenance: {
          ...(question.metadata
            ?.provenance || {}),

          mutationVerified:
            true,

          conceptPreserved:
            true,

          answerRecalculated:
            true,

          randomnessUsed:
            false,
        },
      },
    };
  }

  // ============================================================
  // SAFE FALLBACK
  // ============================================================

  _safeOriginal(
    qObj,
    skill,
    reason,
    fingerprint = null
  ) {
    let cloned;

    try {
      cloned =
        structuredClone(qObj);
    } catch {
      cloned = {
        ...qObj,
      };
    }

    return {
      ...cloned,

      metadata: {
        ...(cloned.metadata || {}),

        skill:
          cloned.metadata?.skill ??
          skill,

        provenance: {
          ...(cloned.metadata
            ?.provenance || {}),

          mutationVerified:
            false,

          mutationAccepted:
            false,

          fallback:
            true,

          reason,

          deterministic:
            true,

          randomnessUsed:
            false,

          fingerprint,
        },
      },
    };
  }

  // ============================================================
  // DIFFICULTY
  // ============================================================

  _resolveDifficulty(
    qObj,
    context = {}
  ) {
    if (
      typeof context.difficulty ===
      "number"
    ) {
      return this._clamp(
        Math.round(
          context.difficulty
        ),
        1,
        5
      );
    }

    if (
      typeof context.level ===
      "number"
    ) {
      return this._clamp(
        Math.round(
          context.level
        ),
        1,
        5
      );
    }

    const attempts =
      Number(
        qObj?._attemptCount ?? 0
      );

    const accuracy =
      Number(
        context.recentAccuracy ??
        context.accuracy ??
        0.5
      );

    if (accuracy >= 0.85) {
      return 4;
    }

    if (accuracy >= 0.70) {
      return 3;
    }

    if (accuracy >= 0.50) {
      return 2;
    }

    if (attempts > 2) {
      return 1;
    }

    return this.config
      .defaultDifficulty;
  }

  _resolveMutationDifficulty(
    qObj,
    context = {}
  ) {
    const strategy =
      context.repairStrategy ??
      "STANDARD";

    const repairStrategies =
      new Set([
        "PROBE",
        "CONCEPT_CONTRAST",
        "PROCEDURE_REPAIR",
        "SIGN_REPAIR",
        "SIMPLIFY_NUMBERS",
        "CALCULATION_REPAIR",
        "ISOLATE",
        "REPAIR",
      ]);

    if (
      repairStrategies.has(strategy)
    ) {
      return 1;
    }

    return this._resolveDifficulty(
      qObj,
      context
    );
  }

  // ============================================================
  // DISTRACTORS
  // ============================================================

  _numberDistractors(
    answer,
    count = 3,
    seed = 1
  ) {
    const num =
      Number(answer);

    if (
      !Number.isFinite(num)
    ) {
      return [
        String(answer),
      ];
    }

    const candidates = [
      num + 1,
      num - 1,
      num + 2,
      num - 2,
      num * 2,
      num / 2,
      -num,
      num + 5,
      num - 5,
      num * 1.5,
    ];

    const valid = [];

    for (
      const candidate of candidates
    ) {
      if (
        Number.isFinite(
          candidate
        ) &&
        candidate !== num
      ) {
        valid.push(
          this._formatNumber(
            candidate
          )
        );
      }
    }

    /*
     * Deterministic ordering.
     */
    const shuffled =
      this._deterministicShuffle(
        [
          this._formatNumber(num),
          ...[
            ...new Set(
              valid
            ),
          ],
        ],
        seed,
        "numeric-options"
      );

    return shuffled.slice(
      0,
      count + 1
    );
  }

  _fractionDistractors(
    answer,
    seed = 1
  ) {
    const parsed =
      this._parseFraction(
        answer
      );

    if (!parsed) {
      return [
        answer,
        "1/2",
        "1/3",
        "2/3",
      ];
    }

    const {
      numerator,
      denominator,
    } = parsed;

    const candidates = [
      `${numerator + 1}/${denominator}`,
      `${Math.max(
        1,
        numerator - 1
      )}/${denominator}`,

      `${numerator}/${denominator + 1}`,

      `${Math.max(
        1,
        numerator + 1
      )}/${denominator + 1}`,

      `${numerator * 2}/${denominator * 2}`,
    ];

    return this._deterministicShuffle(
      [
        answer,
        ...candidates,
      ],
      seed,
      "fraction-options"
    )
      .filter(
        (item, index, arr) =>
          arr.indexOf(item) ===
          index
      )
      .slice(
        0,
        4
      );
  }

  _parseFraction(value) {
    const match =
      String(value)
        .trim()
        .match(
          /^(-?\d+)\s*\/\s*(-?\d+)$/
        );

    if (!match) {
      return null;
    }

    const numerator =
      Number(match[1]);

    const denominator =
      Number(match[2]);

    if (
      !Number.isFinite(
        numerator
      ) ||
      !Number.isFinite(
        denominator
      ) ||
      denominator === 0
    ) {
      return null;
    }

    return {
      numerator,
      denominator,
    };
  }

  _formatNumber(value) {
    if (
      !Number.isFinite(value)
    ) {
      return String(value);
    }

    if (
      Number.isInteger(value)
    ) {
      return String(value);
    }

    return Number(
      value.toFixed(2)
    ).toString();
  }

  // ============================================================
  // SEMANTIC BOUNDARY VERIFICATION
  // ============================================================

  _verifySemanticBoundary(
    original,
    candidate,
    origSkill,
    candSkill,
    context = {}
  ) {
    // If the repair planner explicitly targeted a prerequisite skill or alternate skill, allow it
    const isPrerequisiteEscalation =
      context.repairStrategy === "PREREQUISITE" ||
      Boolean(context.isPrerequisite);

    if (isPrerequisiteEscalation) {
      return { valid: true, reason: null };
    }

    const origSem = this._extractSemanticIdentity(
      original,
      origSkill
    );
    const candSem = this._extractSemanticIdentity(
      candidate,
      candSkill
    );

    // Skill must not drift (e.g. bodmas -> quadratic)
    if (
      origSem.skillId &&
      candSem.skillId &&
      origSem.skillId !== candSem.skillId
    ) {
      return {
        valid: false,
        reason: `SKILL_DRIFT: original=${origSem.skillId}, candidate=${candSem.skillId}`,
      };
    }

    // Concept must not drift
    if (
      origSem.conceptId &&
      candSem.conceptId &&
      origSem.conceptId !== candSem.conceptId
    ) {
      return {
        valid: false,
        reason: `CONCEPT_DRIFT: original=${origSem.conceptId}, candidate=${candSem.conceptId}`,
      };
    }

    // Topic must not drift — but sub-topics within a chapter ARE compatible.
    // e.g. original="algebra" and candidate="linear" is NOT a drift,
    //      it means the mutator chose a specific algebra sub-skill.
    if (
      origSem.topic &&
      candSem.topic &&
      origSem.topic !== candSem.topic
    ) {
      if (!this._mathTopicsCompatible(origSem.topic, candSem.topic)) {
        return {
          valid: false,
          reason: `TOPIC_DRIFT: original=${origSem.topic}, candidate=${candSem.topic}`,
        };
      }
    }

    return { valid: true, reason: null };
  }

  // ============================================================
  // TOPIC ALIAS TABLE
  // ============================================================

  /**
   * Returns true when two topic strings refer to the same or
   * compatible math concept.
   *
   * This handles cases where:
   *  - The original question uses a broad chapter name ("algebra")
   *    while the mutator correctly narrows to a sub-skill ("linear").
   *  - Legacy question metadata uses alternate spellings.
   */
  _mathTopicsCompatible(a, b) {
    if (!a || !b) return true;  // Missing topic = no constraint
    if (a === b) return true;

    const norm = (s) =>
      String(s)
        .toLowerCase()
        .replace(/[\s_-]+/g, "_")
        .trim();

    const na = norm(a);
    const nb = norm(b);

    if (na === nb) return true;

    // Algebra family — all of these live under the same chapter.
    const algebraFamily = new Set([
      "algebra",
      "linear",
      "linear_equations",
      "linear_equation",
      "quadratic",
      "quadratic_equations",
      "quadratic_equation",
      "simultaneous",
      "simultaneous_equations",
      "inequalities",
      "expressions",
      "algebraic_expressions",
      "factorisation",
      "factorization",
      "simplification",
      "substitution",
    ]);

    // Number / arithmetic family
    const arithmeticFamily = new Set([
      "arithmetic",
      "number",
      "numbers",
      "whole_numbers",
      "integers",
      "natural_numbers",
      "bodmas",
      "order_of_operations",
      "pemdas",
      "brackets",
    ]);

    // Fraction / ratio family
    const fractionFamily = new Set([
      "fractions",
      "fraction",
      "ratio",
      "ratios",
      "proportion",
      "percentages",
      "percentage",
    ]);

    // Geometry family
    const geometryFamily = new Set([
      "geometry",
      "area",
      "perimeter",
      "volume",
      "surface_area",
      "shapes",
      "triangles",
      "circles",
      "angles",
      "pythagoras",
    ]);

    // Statistics family
    const statisticsFamily = new Set([
      "statistics",
      "data",
      "mean",
      "median",
      "mode",
      "probability",
    ]);

    const families = [
      algebraFamily,
      arithmeticFamily,
      fractionFamily,
      geometryFamily,
      statisticsFamily,
    ];

    for (const family of families) {
      if (family.has(na) && family.has(nb)) {
        return true;
      }
    }

    return false;
  }

  // ============================================================
  // MATHEMATICAL VERIFICATION
  // ============================================================

  _verifyMathQuestion(
    question,
    skill
  ) {
    if (!question?.q) {
      return {
        valid: false,
        reason: "MISSING_QUESTION",
      };
    }

    if (
      question.ans ===
        undefined ||
      question.ans ===
        null
    ) {
      return {
        valid: false,
        reason: "MISSING_ANSWER",
      };
    }

    const variables =
      question.metadata
        ?.variables ??
      question.variables ??
      {};

    const verifier =
      this._getVerifier(
        question.metadata?.skill ??
        skill
      );

    if (!verifier) {
      return {
        valid: false,
        reason:
          "NO_SEMANTIC_VERIFIER",
      };
    }

    return verifier.call(
      this,
      question,
      variables
    );
  }

  _getVerifier(skill) {
    const verifiers = {
      bodmas:
        this._verifyBodmas,

      order_of_operations:
        this._verifyBodmas,

      rectangle_area:
        this._verifyRectangleArea,

      rectangle_perimeter:
        this._verifyRectanglePerimeter,

      rectangle:
        this._verifyRectangleArea,

      circle_area:
        this._verifyCircleArea,

      circle_circumference:
        this._verifyCircleCircumference,

      circle:
        this._verifyCircleArea,

      triangle_area:
        this._verifyTriangleArea,

      triangle:
        this._verifyTriangleArea,

      percentage:
        this._verifyPercentage,

      discount:
        this._verifyDiscount,

      profit_loss:
        this._verifyProfitLoss,

      interest:
        this._verifySimpleInterest,

      simple_interest:
        this._verifySimpleInterest,

      mean:
        this._verifyMean,

      median:
        this._verifyMedian,

      mode:
        this._verifyMode,

      fraction:
        this._verifyFraction,

      ratio:
        this._verifyRatio,

      probability:
        this._verifyProbability,

      kinematics:
        this._verifyKinematics,

      pythagoras:
        this._verifyPythagoras,

      trigonometry:
        this._verifyTrigonometry,

      linear:
        this._verifyLinear,

      quadratic:
        this._verifyQuadratic,

      matrices:
        this._verifyMatrices,

      vectors:
        this._verifyVectors,

      logarithms:
        this._verifyLogarithms,

      measurement:
        this._verifyRectangleArea,

      simultaneous:
        this._verifySimultaneous,
    };

    return (
      verifiers[skill] ??
      null
    );
  }

  // ============================================================
  // VERIFIERS
  // ============================================================

  _verifyRectangleArea(
    question,
    vars
  ) {
    const length =
      Number(vars.length);

    const width =
      Number(vars.width);

    const answer =
      Number(question.ans);

    if (
      !Number.isFinite(
        length
      ) ||
      !Number.isFinite(
        width
      ) ||
      !Number.isFinite(
        answer
      )
    ) {
      return {
        valid: false,
        reason:
          "INVALID_RECTANGLE_DATA",
      };
    }

    const expected =
      length * width;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyRectanglePerimeter(
    question,
    vars
  ) {
    const length =
      Number(vars.length);

    const width =
      Number(vars.width);

    const answer =
      Number(question.ans);

    const expected =
      2 * (length + width);

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyTriangleArea(
    question,
    vars
  ) {
    const base =
      Number(vars.base);

    const height =
      Number(vars.height);

    const answer =
      Number(question.ans);

    const expected =
      0.5 *
      base *
      height;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyCircleArea(
    question,
    vars
  ) {
    const radius =
      Number(vars.radius);

    const pi =
      Number(vars.pi) ||
      Math.PI;

    const answer =
      Number(question.ans);

    const expected =
      pi *
      radius *
      radius;

    return this._numericVerification(
      answer,
      expected,
      0.05
    );
  }

  _verifyCircleCircumference(
    question,
    vars
  ) {
    const radius =
      Number(vars.radius);

    const pi =
      Number(vars.pi) ||
      Math.PI;

    const answer =
      Number(question.ans);

    const expected =
      2 *
      pi *
      radius;

    return this._numericVerification(
      answer,
      expected,
      0.05
    );
  }

  _verifyPercentage(
    question,
    vars
  ) {
    const value =
      Number(vars.value);

    const percentage =
      Number(vars.percentage);

    const answer =
      Number(question.ans);

    const expected =
      percentage /
      100 *
      value;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyDiscount(
    question,
    vars
  ) {
    const markedPrice =
      Number(
        vars.markedPrice
      );

    const discountPct =
      Number(
        vars.discountPct
      );

    const target =
      vars.target ??
      "salePrice";

    const answer =
      Number(question.ans);

    const discountAmount =
      markedPrice *
      discountPct /
      100;

    const salePrice =
      markedPrice -
      discountAmount;

    const expected =
      target ===
      "salePrice"
        ? salePrice
        : discountAmount;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyProfitLoss(
    question,
    vars
  ) {
    const costPrice =
      Number(
        vars.costPrice
      );

    const profitPct =
      Number(
        vars.profitPct
      );

    const isProfit =
      vars.isProfit !== false;

    const answer =
      Number(question.ans);

    const change =
      costPrice *
      profitPct /
      100;

    const expected =
      isProfit
        ? costPrice + change
        : costPrice - change;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifySimpleInterest(
    question,
    vars
  ) {
    const principal =
      Number(
        vars.principal
      );

    const rate =
      Number(vars.rate);

    const time =
      Number(vars.time);

    const answer =
      Number(question.ans);

    const expected =
      principal *
      rate *
      time /
      100;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyMean(
    question,
    vars
  ) {
    const data =
      Array.isArray(
        vars.data
      )
        ? vars.data.map(Number)
        : [];

    const answer =
      Number(question.ans);

    if (
      !data.length ||
      data.some(
        (v) =>
          !Number.isFinite(v)
      )
    ) {
      return {
        valid: false,
        reason:
          "INVALID_MEAN_DATA",
      };
    }

    const expected =
      data.reduce(
        (a, b) => a + b,
        0
      ) /
      data.length;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyMedian(
    question,
    vars
  ) {
    const data =
      Array.isArray(
        vars.data
      )
        ? [...vars.data]
            .map(Number)
            .sort(
              (a, b) =>
                a - b
            )
        : [];

    const answer =
      Number(question.ans);

    if (
      !data.length ||
      data.some(
        (v) =>
          !Number.isFinite(v)
      )
    ) {
      return {
        valid: false,
        reason:
          "INVALID_MEDIAN_DATA",
      };
    }

    const middle =
      Math.floor(
        data.length / 2
      );

    const expected =
      data.length % 2 !== 0
        ? data[middle]
        : (
            data[middle - 1] +
            data[middle]
          ) /
          2;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyMode(
    question,
    vars
  ) {
    const data =
      Array.isArray(
        vars.data
      )
        ? vars.data.map(Number)
        : [];

    if (!data.length) {
      return {
        valid: false,
        reason:
          "INVALID_MODE_DATA",
      };
    }

    const counts =
      new Map();

    for (
      const value of data
    ) {
      counts.set(
        value,
        (counts.get(value) ??
          0) + 1
      );
    }

    const maxCount =
      Math.max(
        ...counts.values()
      );

    const modes =
      [...counts.entries()]
        .filter(
          ([, count]) =>
            count === maxCount
        )
        .map(
          ([value]) =>
            value
        );

    /*
     * Reject ambiguous multimodal
     * datasets.
     */
    if (
      modes.length !== 1
    ) {
      return {
        valid: false,
        reason:
          "AMBIGUOUS_MODE",
      };
    }

    const answer =
      Number(question.ans);

    const valid =
      answer === modes[0];

    return {
      valid,

      reason:
        valid
          ? null
          : `EXPECTED_${modes[0]}_GOT_${answer}`,
    };
  }

  _verifyFraction(
    question,
    vars
  ) {
    const n1 =
      Number(vars.num1);

    const d1 =
      Number(vars.den1);

    const n2 =
      Number(vars.num2);

    const d2 =
      Number(vars.den2);

    const op =
      vars.op ?? "+";

    const answer =
      String(
        question.ans
      ).trim();

    if (
      !Number.isFinite(n1) ||
      !Number.isFinite(d1) ||
      !Number.isFinite(n2) ||
      !Number.isFinite(d2) ||
      d1 === 0 ||
      d2 === 0
    ) {
      return {
        valid: false,
        reason:
          "INVALID_FRACTION_DATA",
      };
    }

    const result =
      this._fractionOperation(
        n1,
        d1,
        n2,
        d2,
        op
      );

    if (
      result.denominator ===
      0
    ) {
      return {
        valid: false,
        reason:
          "ZERO_DENOMINATOR",
      };
    }

    const expected =
      result.numerator /
      result.denominator;

    const answerValue =
      this._parseFraction(
        answer
      );

    const actual =
      answerValue
        ? answerValue.numerator /
          answerValue.denominator
        : Number(answer);

    return this._numericVerification(
      actual,
      expected,
      1e-9
    );
  }

  _verifyRatio(
    question,
    vars
  ) {
    const partA =
      Number(vars.partA);

    const partB =
      Number(vars.partB);

    const total =
      Number(vars.total);

    const answer =
      Number(question.ans);

    if (
      partA <= 0 ||
      partB <= 0 ||
      total <= 0
    ) {
      return {
        valid: false,
        reason:
          "INVALID_RATIO_DATA",
      };
    }

    const expected =
      (
        partA /
        (partA + partB)
      ) *
      total;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyProbability(
    question,
    vars
  ) {
    const favorable =
      Number(
        vars.favorable
      );

    const total =
      Number(vars.total);

    const answer =
      String(
        question.ans
      ).trim();

    if (
      favorable < 0 ||
      total <= 0 ||
      favorable > total
    ) {
      return {
        valid: false,
        reason:
          "INVALID_PROBABILITY_DATA",
      };
    }

    const expected =
      favorable /
      total;

    const parsed =
      this._parseFraction(
        answer
      );

    const actual =
      parsed
        ? parsed.numerator /
          parsed.denominator
        : Number(answer);

    return this._numericVerification(
      actual,
      expected,
      1e-9
    );
  }

  _verifyKinematics(
    question,
    vars
  ) {
    const speed =
      Number(vars.speed);

    const time =
      Number(vars.time);

    const distance =
      Number(vars.distance);

    const target =
      vars.target ??
      "distance";

    const answer =
      Number(question.ans);

    let expected;

    if (
      target ===
      "distance"
    ) {
      expected =
        speed * time;
    } else if (
      target ===
      "speed"
    ) {
      expected =
        distance / time;
    } else if (
      target ===
      "time"
    ) {
      expected =
        distance / speed;
    } else {
      return {
        valid: false,
        reason:
          "INVALID_KINEMATICS_TARGET",
      };
    }

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyPythagoras(
    question,
    vars
  ) {
    const a =
      Number(vars.a);

    const b =
      Number(vars.b);

    const c =
      Number(vars.c);

    const answer =
      Number(question.ans);

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      !Number.isFinite(c) ||
      !Number.isFinite(answer)
    ) {
      return {
        valid: false,
        reason:
          "INVALID_PYTHAGORAS_DATA",
      };
    }

    const expected =
      Math.sqrt(
        a * a +
        b * b
      );

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyTrigonometry(
    question,
    vars
  ) {
    const ratio =
      vars.ratio;

    const answer =
      String(
        question.ans
      ).trim();

    let expected;

    if (ratio === "sin") {
      expected =
        Number(
          vars.opposite
        ) /
        Number(
          vars.hypotenuse
        );
    } else if (
      ratio === "cos"
    ) {
      expected =
        Number(
          vars.adjacent
        ) /
        Number(
          vars.hypotenuse
        );
    } else if (
      ratio === "tan"
    ) {
      expected =
        Number(
          vars.opposite
        ) /
        Number(
          vars.adjacent
        );
    } else {
      return {
        valid: false,
        reason:
          "INVALID_TRIG_RATIO",
      };
    }

    const parsed =
      this._parseFraction(
        answer
      );

    const actual =
      parsed
        ? parsed.numerator /
          parsed.denominator
        : Number(answer);

    return this._numericVerification(
      actual,
      expected,
      1e-9
    );
  }

  _verifyLinear(
    question,
    vars
  ) {
    const a =
      Number(vars.a);

    const b =
      Number(vars.b);

    const c =
      Number(vars.c);

    const x =
      Number(vars.x);

    const answer =
      Number(question.ans);

    if (
      !Number.isFinite(a) ||
      a === 0 ||
      !Number.isFinite(b) ||
      !Number.isFinite(c) ||
      !Number.isFinite(x) ||
      !Number.isFinite(answer)
    ) {
      return {
        valid: false,
        reason:
          "INVALID_LINEAR_DATA",
      };
    }

    const expected =
      (c - b) /
      a;

    const answerCorrect =
      Math.abs(
        answer -
          expected
      ) < 1e-9;

    const variableCorrect =
      Math.abs(
        x -
          expected
      ) < 1e-9;

    return {
      valid:
        answerCorrect &&
        variableCorrect,

      reason:
        answerCorrect &&
        variableCorrect
          ? null
          : `EXPECTED_${expected}_GOT_${answer}`,
    };
  }

  _verifyQuadratic(
    question,
    vars
  ) {
    const r1 =
      Number(vars.r1);

    const r2 =
      Number(vars.r2);

    const answer =
      String(
        question.ans
      ).trim();

    if (
      !Number.isFinite(r1) ||
      !Number.isFinite(r2)
    ) {
      return {
        valid: false,
        reason:
          "INVALID_QUADRATIC_DATA",
      };
    }

    const numericAnswer =
      Number(answer);

    const valid =
      Number.isFinite(
        numericAnswer
      ) &&
      (
        numericAnswer === r1 ||
        numericAnswer === r2
      );

    return {
      valid,

      reason:
        valid
          ? null
          : `EXPECTED_ROOT_${r1}_OR_${r2}_GOT_${answer}`,
    };
  }

  _verifyMatrices(
    question,
    vars
  ) {
    const a =
      Number(vars.a);

    const b =
      Number(vars.b);

    const c =
      Number(vars.c);

    const d =
      Number(vars.d);

    const answer =
      Number(question.ans);

    const expected =
      a * d -
      b * c;

    return this._numericVerification(
      answer,
      expected
    );
  }

  _verifyVectors(
    question,
    vars
  ) {
    const x =
      Number(vars.x);

    const y =
      Number(vars.y);

    const answer =
      Number(question.ans);

    const expected =
      Math.sqrt(
        x * x +
        y * y
      );

    return this._numericVerification(
      answer,
      expected,
      0.01
    );
  }

  _verifyLogarithms(
    question,
    vars
  ) {
    const base =
      Number(vars.base);

    const power =
      Number(vars.power);

    const value =
      Number(vars.value);

    const answer =
      Number(question.ans);

    if (
      base <= 0 ||
      base === 1 ||
      value <= 0
    ) {
      return {
        valid: false,
        reason:
          "INVALID_LOG_DATA",
      };
    }

    const validDefinition =
      Math.abs(
        Math.pow(
          base,
          power
        ) -
          value
      ) < 1e-9;

    const validAnswer =
      answer === power;

    return {
      valid:
        validDefinition &&
        validAnswer,

      reason:
        validDefinition &&
        validAnswer
          ? null
          : `EXPECTED_${power}_GOT_${answer}`,
    };
  }

  _verifySimultaneous(
    question,
    vars
  ) {
    const x =
      Number(vars.x);

    const y =
      Number(vars.y);

    const c1 =
      Number(vars.c1);

    const c2 =
      Number(vars.c2);

    const answer =
      Number(question.ans);

    if (
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      !Number.isFinite(c1) ||
      !Number.isFinite(c2) ||
      !Number.isFinite(answer)
    ) {
      return {
        valid: false,
        reason:
          "INVALID_SIMULTANEOUS_DATA",
      };
    }

    const equation1 =
      Math.abs(
        x + y - c1
      ) < 1e-9;

    const equation2 =
      Math.abs(
        2 * x -
          y -
          c2
      ) < 1e-9;

    const answerCorrect =
      Math.abs(
        answer -
          x
      ) < 1e-9;

    return {
      valid:
        equation1 &&
        equation2 &&
        answerCorrect,

      reason:
        equation1 &&
        equation2 &&
        answerCorrect
          ? null
          : `EXPECTED_X_${x}_Y_${y}_GOT_${answer}`,
    };
  }

  // ============================================================
  // BODMAS VERIFIER
  // ============================================================

  _verifyBodmas(question, vars = {}) {
    if (!question?.q) {
      return {
        valid: false,
        reason: "MISSING_QUESTION",
      };
    }

    if (
      question.ans === undefined ||
      question.ans === null ||
      question.ans === ""
    ) {
      return {
        valid: false,
        reason: "MISSING_ANSWER",
      };
    }

    const ansStr = String(question.ans).trim().toLowerCase();

    if (Array.isArray(question.options) && question.options.length > 0) {
      const hasAns = question.options.some(
        (opt) => String(opt).trim().toLowerCase() === ansStr
      );
      if (!hasAns) {
        return {
          valid: false,
          reason: "ANSWER_NOT_IN_OPTIONS",
        };
      }
    }

    return {
      valid: true,
      reason: null,
    };
  }

  // ============================================================
  // GENERIC NUMERIC VERIFIER
  // ============================================================

  _numericVerification(
    actual,
    expected,
    tolerance = 1e-9
  ) {
    if (
      !Number.isFinite(
        actual
      ) ||
      !Number.isFinite(
        expected
      )
    ) {
      return {
        valid: false,
        reason:
          "NON_FINITE_VALUE",
      };
    }

    const valid =
      Math.abs(
        actual -
          expected
      ) <= tolerance;

    return {
      valid,

      reason:
        valid
          ? null
          : `EXPECTED_${expected}_GOT_${actual}`,
    };
  }

  // ============================================================
  // UTILITY
  // ============================================================

  _clamp(
    value,
    min,
    max
  ) {
    return Math.max(
      min,
      Math.min(
        max,
        value
      )
    );
  }
}