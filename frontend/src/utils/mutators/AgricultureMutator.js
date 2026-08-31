/**
 * TIXAR AGRICULTURE MUTATOR v3.0
 *
 * Diagnostic Agricultural Science Engine
 *
 * Philosophy:
 *
 * Question
 *    â†“
 * Detect agricultural domain
 *    â†“
 * Extract concept / variables
 *    â†“
 * Mutate intelligently
 *    â†“
 * Recalculate / reason
 *    â†“
 * Generate explanation
 *    â†“
 * Diagnose misconception
 *
 * Domains:
 * - Soil science
 * - Soil conservation
 * - Fertilizers & nutrients
 * - Crop husbandry
 * - Pest management
 * - Plant diseases
 * - Weed control
 * - Irrigation
 * - Livestock husbandry
 * - Livestock nutrition
 * - Animal health
 * - Breeding & genetics
 * - Farm machinery
 * - Farm records & economics
 * - Agricultural ecology
 * - Climate & weather
 * - Post-harvest handling
 * - Agricultural calculations
 *
 * Important:
 * Numerical answers are calculated from mutated parameters.
 * They are never copied from the original answer.
 */

export class AgricultureMutator {
  constructor() {
    this.version = "3.0";

    // -------------------------------------------------------
    // SOIL
    // -------------------------------------------------------

    this.soils = [
      {
        name: "Sandy soil",
        properties: [
          "large particles",
          "high drainage",
          "low water-holding capacity",
          "usually low nutrient retention",
        ],
        problem: "rapid water loss",
        improvement: "addition of organic matter such as compost or well-decomposed manure",
      },
      {
        name: "Clay soil",
        properties: [
          "very small particles",
          "high water-holding capacity",
          "poor drainage when compacted",
          "can become sticky when wet",
        ],
        problem: "poor drainage and aeration",
        improvement: "addition of organic matter and appropriate soil structure management",
      },
      {
        name: "Loamy soil",
        properties: [
          "balanced mixture of sand, silt and clay",
          "good drainage",
          "good water retention",
          "generally suitable for many crops",
        ],
        problem: "may still require nutrient management",
        improvement: "maintaining organic matter and balanced fertility",
      },
    ];

    // -------------------------------------------------------
    // NUTRIENTS
    // -------------------------------------------------------

    this.nutrients = [
      {
        name: "Nitrogen (N)",
        role: "chlorophyll formation and vegetative growth",
        symptoms:
          "general yellowing of older leaves and reduced vegetative growth",
        fertilizerExamples: ["CAN", "urea"],
      },
      {
        name: "Phosphorus (P)",
        role: "root development, energy transfer and early establishment",
        symptoms:
          "poor root development and purplish coloration of leaves in some crops",
        fertilizerExamples: ["DAP", "TSP", "SSP"],
      },
      {
        name: "Potassium (K)",
        role: "water regulation, enzyme activation and plant stress resistance",
        symptoms:
          "yellowing or scorching of leaf margins, followed by browning in severe cases",
        fertilizerExamples: ["MOP", "SOP"],
      },
      {
        name: "Calcium (Ca)",
        role: "cell-wall development and growing-point development",
        symptoms:
          "distortion or death of young growing tissues",
        fertilizerExamples: ["agricultural lime", "gypsum"],
      },
      {
        name: "Magnesium (Mg)",
        role: "chlorophyll formation",
        symptoms:
          "interveinal chlorosis, especially on older leaves",
        fertilizerExamples: ["dolomitic lime", "magnesium sulphate"],
      },
    ];

    // -------------------------------------------------------
    // CONSERVATION
    // -------------------------------------------------------

    this.conservation = [
      {
        problem: "steep slope erosion",
        solution: "terracing",
        explanation:
          "Terraces shorten the effective slope and reduce runoff velocity.",
      },
      {
        problem: "wind erosion",
        solution: "windbreaks",
        explanation:
          "Windbreaks reduce wind speed near the soil surface.",
      },
      {
        problem: "loss of soil cover",
        solution: "cover crops",
        explanation:
          "Vegetative cover protects soil from raindrop impact and runoff.",
      },
      {
        problem: "runoff on cultivated land",
        solution: "contour farming",
        explanation:
          "Cultivating along contours slows the movement of water downslope.",
      },
      {
        problem: "declining soil organic matter",
        solution: "application of organic manure or compost",
        explanation:
          "Organic materials add organic matter and improve soil structure.",
      },
    ];

    // -------------------------------------------------------
    // PEST CONTROL
    // -------------------------------------------------------

    this.pestControls = [
      {
        method: "Crop rotation",
        target: "reducing buildup of pests and diseases associated with particular crops",
      },
      {
        method: "Biological control",
        target: "using natural enemies to suppress pest populations",
      },
      {
        method: "Mechanical control",
        target: "physically removing or destroying pests or affected plant material",
      },
      {
        method: "Chemical control",
        target: "using approved pesticides to control harmful organisms",
      },
      {
        method: "Integrated Pest Management",
        target:
          "combining compatible control methods while minimizing unnecessary pesticide use",
      },
    ];

    // -------------------------------------------------------
    // LIVESTOCK
    // -------------------------------------------------------

    this.livestock = [
      {
        name: "Cattle",
        products: ["milk", "meat", "hides"],
        housing: "cattle shed or zero-grazing unit depending on system",
      },
      {
        name: "Goats",
        products: ["meat", "milk", "skins"],
        housing: "well-ventilated raised or suitable goat housing",
      },
      {
        name: "Poultry",
        products: ["meat", "eggs"],
        housing: "poultry house",
      },
      {
        name: "Sheep",
        products: ["meat", "wool in some breeds", "skins"],
        housing: "sheep housing or sheltered grazing system",
      },
      {
        name: "Pigs",
        products: ["pork"],
        housing: "well-drained pig housing",
      },
    ];

    // -------------------------------------------------------
    // FARM INPUTS
    // -------------------------------------------------------

    this.inputs = [
      {
        name: "Improved seed",
        purpose: "establishing crops with desirable genetic characteristics",
      },
      {
        name: "Fertilizer",
        purpose: "supplying plant nutrients",
      },
      {
        name: "Manure",
        purpose: "adding organic matter and plant nutrients",
      },
      {
        name: "Pesticide",
        purpose: "controlling harmful pests or disease organisms",
      },
      {
        name: "Irrigation water",
        purpose: "supplying water when natural rainfall is insufficient",
      },
    ];

    // -------------------------------------------------------
    // FARM MACHINERY
    // -------------------------------------------------------

    this.machinery = [
      {
        name: "Plough",
        function: "primary soil tillage and turning the soil",
      },
      {
        name: "Harrow",
        function: "secondary tillage, breaking clods and preparing a seedbed",
      },
      {
        name: "Planter",
        function: "placing seed at controlled spacing and depth",
      },
      {
        name: "Sprayer",
        function: "applying liquid pesticides, herbicides or other treatments",
      },
      {
        name: "Combine harvester",
        function: "combining harvesting operations such as reaping, threshing and cleaning",
      },
    ];

    // -------------------------------------------------------
    // RECORDS / FARM ECONICS
    // -------------------------------------------------------

    this.economicConcepts = [
      {
        name: "Gross income",
        formula: "total revenue before deducting production costs",
      },
      {
        name: "Gross margin",
        formula: "gross income minus variable costs",
      },
      {
        name: "Net profit",
        formula: "total revenue minus total costs",
      },
      {
        name: "Break-even point",
        formula: "the output or sales level at which total revenue equals total cost",
      },
    ];
  }

  // =========================================================
  // DETERMINISTIC ENGINE
  // =========================================================

  _hash(value) {
    let hash = 2166136261;

    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash +=
        (hash << 1) +
        (hash << 4) +
        (hash << 7) +
        (hash << 8) +
        (hash << 24);
    }

    return Math.abs(hash >>> 0);
  }

  _seed(stem, qObj) {
    return this._hash(
      `${stem}|${qObj?.id || ""}|${this.version}`
    );
  }

  _pick(array, seed, offset = 0) {
    if (!array.length) return null;
    return array[(seed + offset) % array.length];
  }

  _number(seed, min, max, step = 1, offset = 0) {
    const count = Math.floor((max - min) / step) + 1;

    return (
      min +
      ((seed + offset) % count) * step
    );
  }

  _shuffle(items, seed) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
      const j =
        (seed + i * 31) %
        (i + 1);

      [result[i], result[j]] =
        [result[j], result[i]];
    }

    return result;
  }

  _unique(items) {
    return [...new Set(items)];
  }

  _mcq(correct, distractors, seed) {
    const unique = this._unique([
      correct,
      ...distractors,
    ]);

    const cleaned = unique.filter(
      Boolean
    );

    return this._shuffle(
      cleaned.slice(0, 4),
      seed
    );
  }

  _steps(lines) {
    return lines.map(
      (line, index) =>
        `Step ${index + 1}: ${line}`
    );
  }

  _result({
    q,
    ans,
    hint,
    why,
    sol = ans,
    steps = [],
    type = "mcq",
    options = null,
    domain = "agriculture",
    difficulty = "medium",
    misconception = null,
  }) {
    return {
      q,
      ans,
      hint,
      why,
      sol,
      steps,
      type,
      options,
      domain,
      difficulty,
      misconception,
      mutatorVersion: this.version,
    };
  }

  // =========================================================
  // NUMERICAL AGRICULTURE
  // =========================================================

  _generateFarmCalculation(stem, mode, seed) {
    const calculationTypes = [
      "yield",
      "revenue",
      "profit",
      "plant_population",
      "feed",
    ];

    const selectedType = this._pick(
      calculationTypes,
      seed
    );

    // -------------------------------------------------------
    // CROP YIELD
    // -------------------------------------------------------

    if (selectedType === "yield") {
      const hectares =
        this._number(seed, 1, 8, 1);

      const yieldPerHa =
        this._number(
          seed,
          1,
          8,
          1,
          17
        );

      const totalYield =
        hectares * yieldPerHa;

      return this._result({
        q: `A farmer cultivates ${hectares} hectares of maize. The average yield is ${yieldPerHa} tonnes per hectare. What is the expected total harvest?`,
        ans: `${totalYield} tonnes`,
        hint:
          "Multiply cultivated area by yield per hectare.",
        why:
          `${hectares} ha Ã— ${yieldPerHa} tonnes/ha = ${totalYield} tonnes.`,
        steps: this._steps([
          `Identify cultivated area: ${hectares} hectares.`,
          `Identify yield per hectare: ${yieldPerHa} tonnes.`,
          `Multiply ${hectares} Ã— ${yieldPerHa}.`,
          `Expected harvest = ${totalYield} tonnes.`,
        ]),
        type:
          mode === 0
            ? "open_response"
            : "mcq",
        options:
          mode === 0
            ? null
            : this._mcq(
                `${totalYield} tonnes`,
                [
                  `${totalYield + yieldPerHa} tonnes`,
                  `${totalYield - yieldPerHa} tonnes`,
                  `${hectares + yieldPerHa} tonnes`,
                ],
                seed
              ),
        domain: "farm_calculations",
      });
    }

    // -------------------------------------------------------
    // REVENUE
    // -------------------------------------------------------

    if (selectedType === "revenue") {
      const quantity =
        this._number(
          seed,
          100,
          1000,
          100
        );

      const price =
        this._number(
          seed,
          20,
          100,
          10,
          19
        );

      const revenue =
        quantity * price;

      return this._result({
        q: `A farmer sells ${quantity} kg of produce at KSh ${price} per kg. Calculate the total revenue.`,
        ans:
          `KSh ${revenue.toLocaleString()}`,
        hint:
          "Revenue = quantity sold Ã— selling price per unit.",
        why:
          `${quantity} Ã— KSh ${price} = KSh ${revenue.toLocaleString()}.`,
        steps: this._steps([
          `Quantity sold = ${quantity} kg.`,
          `Price per kg = KSh ${price}.`,
          `Revenue = ${quantity} Ã— ${price}.`,
          `Revenue = KSh ${revenue.toLocaleString()}.`,
        ]),
        type:
          mode === 0
            ? "open_response"
            : "mcq",
        options:
          mode === 0
            ? null
            : this._mcq(
                `KSh ${revenue.toLocaleString()}`,
                [
                  `KSh ${(revenue - quantity * 10).toLocaleString()}`,
                  `KSh ${(revenue + quantity * 10).toLocaleString()}`,
                  `KSh ${(quantity + price).toLocaleString()}`,
                ],
                seed
              ),
        domain: "farm_economics",
      });
    }

    // -------------------------------------------------------
    // PROFIT
    // -------------------------------------------------------

    if (selectedType === "profit") {
      const totalCost =
        this._number(
          seed,
          10000,
          80000,
          5000
        );

      const revenue =
        totalCost +
        this._number(
          seed,
          5000,
          30000,
          5000,
          13
        );

      const profit =
        revenue - totalCost;

      return this._result({
        q: `A farmer spends KSh ${totalCost.toLocaleString()} producing a crop and receives KSh ${revenue.toLocaleString()} from sales. What is the farmer's profit?`,
        ans:
          `KSh ${profit.toLocaleString()}`,
        hint:
          "Profit = total revenue âˆ’ total cost.",
        why:
          `Profit = KSh ${revenue.toLocaleString()} âˆ’ KSh ${totalCost.toLocaleString()} = KSh ${profit.toLocaleString()}.`,
        steps: this._steps([
          `Revenue = KSh ${revenue.toLocaleString()}.`,
          `Total cost = KSh ${totalCost.toLocaleString()}.`,
          `Subtract cost from revenue.`,
          `Profit = KSh ${profit.toLocaleString()}.`,
        ]),
        type:
          mode === 0
            ? "open_response"
            : "mcq",
        options:
          mode === 0
            ? null
            : this._mcq(
                `KSh ${profit.toLocaleString()}`,
                [
                  `KSh ${revenue.toLocaleString()}`,
                  `KSh ${totalCost.toLocaleString()}`,
                  `KSh ${(profit + totalCost).toLocaleString()}`,
                ],
                seed
              ),
        domain: "farm_economics",
      });
    }

    // -------------------------------------------------------
    // PLANT POPULATION
    // -------------------------------------------------------

    if (selectedType === "plant_population") {
      const rows =
        this._number(
          seed,
          20,
          100,
          10
        );

      const plantsPerRow =
        this._number(
          seed,
          10,
          50,
          5,
          11
        );

      const population =
        rows * plantsPerRow;

      return this._result({
        q: `A farmer establishes ${rows} rows of maize with ${plantsPerRow} plants in each row. What is the total plant population?`,
        ans: `${population} plants`,
        hint:
          "Multiply the number of rows by the number of plants in each row.",
        why:
          `${rows} Ã— ${plantsPerRow} = ${population} plants.`,
        steps: this._steps([
          `Number of rows = ${rows}.`,
          `Plants per row = ${plantsPerRow}.`,
          `Population = ${rows} Ã— ${plantsPerRow}.`,
          `Total population = ${population} plants.`,
        ]),
        type:
          mode === 0
            ? "open_response"
            : "mcq",
        options:
          mode === 0
            ? null
            : this._mcq(
                `${population} plants`,
                [
                  `${population + plantsPerRow} plants`,
                  `${population - plantsPerRow} plants`,
                  `${rows + plantsPerRow} plants`,
                ],
                seed
              ),
        domain: "crop_production",
      });
    }

    // -------------------------------------------------------
    // LIVESTOCK FEED
    // -------------------------------------------------------

    const birds =
      this._number(
        seed,
        20,
        100,
        10
      );

    const feedPerBird =
      this._number(
        seed,
        50,
        200,
        25,
        9
      );

    const totalFeed =
      birds * feedPerBird;

    return this._result({
      q: `A poultry farmer has ${birds} birds. Each bird is expected to consume ${feedPerBird} g of feed during a particular feeding period. How much feed is required in total?`,
      ans:
        `${totalFeed.toLocaleString()} g`,
      hint:
        "Multiply the number of birds by the feed requirement per bird.",
      why:
        `${birds} Ã— ${feedPerBird} g = ${totalFeed.toLocaleString()} g.`,
      steps: this._steps([
        `Number of birds = ${birds}.`,
        `Feed per bird = ${feedPerBird} g.`,
        `Total feed = ${birds} Ã— ${feedPerBird}.`,
        `Total = ${totalFeed.toLocaleString()} g.`,
      ]),
      type:
        mode === 0
          ? "open_response"
          : "mcq",
      options:
        mode === 0
          ? null
          : this._mcq(
              `${totalFeed.toLocaleString()} g`,
              [
                `${(totalFeed / 2).toLocaleString()} g`,
                `${(totalFeed + feedPerBird).toLocaleString()} g`,
                `${(birds + feedPerBird).toLocaleString()} g`,
              ],
              seed
            ),
      domain: "livestock_nutrition",
    });
  }

  // =========================================================
  // SOIL DIAGNOSTICS
  // =========================================================

  _generateSoil(stem, mode, seed) {
    const scenario =
      this._pick(
        this.conservation,
        seed
      );

    if (
      lowerIncludes(
        stem,
        [
          "erosion",
          "slope",
          "runoff",
          "conservation",
          "terrace",
          "contour",
          "wind",
        ]
      )
    ) {
      return this._result({
        q: `A farmer's field is experiencing ${scenario.problem}. Which management practice would be most appropriate?`,
        ans: scenario.solution,
        hint:
          "Match the conservation practice to the mechanism causing the soil loss.",
        why:
          scenario.explanation,
        steps: this._steps([
          `Identify the soil problem: ${scenario.problem}.`,
          "Determine how the problem is occurring.",
          `Select the conservation practice: ${scenario.solution}.`,
          scenario.explanation,
        ]),
        type:
          mode === 0
            ? "open_response"
            : "mcq",
        options:
          mode === 0
            ? null
            : this._mcq(
                scenario.solution,
                this.conservation
                  .filter(
                    x =>
                      x.solution !==
                      scenario.solution
                  )
                  .map(
                    x =>
                      x.solution
                  ),
                seed
              ),
        domain: "soil_conservation",
      });
    }

    const soil =
      this._pick(
        this.soils,
        seed
      );

    return this._result({
      q: `Which soil type is best described by the following characteristics: ${soil.properties.join(", ")}?`,
      ans: soil.name,
      hint:
        "Compare particle size, drainage and water-holding capacity.",
      why:
        `${soil.name} is characterized by ${soil.properties.join(", ")}.`,
      steps: this._steps([
        "Identify the soil characteristics.",
        "Compare them with the properties of common soil types.",
        `The best match is ${soil.name}.`,
      ]),
      type: "mcq",
      options: this._mcq(
        soil.name,
        this.soils
          .filter(
            x =>
              x.name !==
              soil.name
          )
          .map(
            x =>
              x.name
          ),
        seed
      ),
      domain: "soil_science",
    });
  }

  // =========================================================
  // NUTRIENT DIAGNOSTICS
  // =========================================================

  _generateNutrient(stem, mode, seed) {
    const nutrient =
      this._pick(
        this.nutrients,
        seed
      );

    return this._result({
      q: `[Plant Nutrient Diagnosis] A crop shows ${nutrient.symptoms}. Which nutrient deficiency is the most likely explanation?`,
      ans: nutrient.name,
      hint:
        `Think about the role of the nutrient in ${nutrient.role}.`,
      why:
        `${nutrient.name} is important for ${nutrient.role}. A deficiency can produce ${nutrient.symptoms}.`,
      steps: this._steps([
        `Observe the symptoms: ${nutrient.symptoms}.`,
        `Identify the nutrient associated with ${nutrient.role}.`,
        `Diagnosis: ${nutrient.name}.`,
        `Examples of fertilizers or amendments supplying it include ${nutrient.fertilizerExamples.join(", ")}.`,
      ]),
      type: "mcq",
      options: this._mcq(
        nutrient.name,
        this.nutrients
          .filter(
            x =>
              x.name !==
              nutrient.name
          )
          .map(
            x =>
              x.name
          ),
        seed
      ),
      domain: "plant_nutrition",
    });
  }

  // =========================================================
  // PEST MANAGEMENT
  // =========================================================

  _generatePest(stem, mode, seed) {
    const method =
      this._pick(
        this.pestControls,
        seed
      );

    return this._result({
      q: `A farmer wants to control pests by ${method.target}. Which pest-management method best fits this approach?`,
      ans: method.method,
      hint:
        "Focus on the mechanism used to reduce the pest population.",
      why:
        `${method.method} involves ${method.target}.`,
      steps: this._steps([
        "Identify the intended pest-control mechanism.",
        `Match it to the method: ${method.method}.`,
        `Reason: ${method.target}.`,
      ]),
      type: "mcq",
      options: this._mcq(
        method.method,
        this.pestControls
          .filter(
            x =>
              x.method !==
              method.method
          )
          .map(
            x =>
              x.method
          ),
        seed
      ),
      domain: "pest_management",
    });
  }

  // =========================================================
  // LIVESTOCK
  // =========================================================

  _generateLivestock(stem, mode, seed) {
    const animal =
      this._pick(
        this.livestock,
        seed
      );

    const questionType =
      seed % 2;

    if (questionType === 0) {
      return this._result({
        q: `Which livestock enterprise is commonly associated with the following products: ${animal.products.join(", ")}?`,
        ans: animal.name,
        hint:
          "Match the products to the livestock species.",
        why:
          `${animal.name} can provide ${animal.products.join(", ")}.`,
        steps: this._steps([
          "Identify the agricultural products.",
          "Match the products to the appropriate livestock species.",
          `Answer: ${animal.name}.`,
        ]),
        type: "mcq",
        options: this._mcq(
          animal.name,
          this.livestock
            .filter(
              x =>
                x.name !==
                animal.name
            )
            .map(
              x =>
                x.name
            ),
          seed
        ),
        domain: "livestock",
      });
    }

    return this._result({
      q: `Which livestock species is most directly associated with a ${animal.housing}?`,
      ans: animal.name,
      hint:
        "Identify the livestock species normally kept in this type of housing.",
      why:
        `${animal.name} may be kept in ${animal.housing}.`,
      steps: this._steps([
        "Identify the housing system.",
        "Determine which livestock enterprise uses it.",
        `Answer: ${animal.name}.`,
      ]),
      type: "mcq",
      options: this._mcq(
        animal.name,
        this.livestock
          .filter(
            x =>
              x.name !==
              animal.name
          )
          .map(
            x =>
              x.name
          ),
        seed
      ),
      domain: "livestock_husbandry",
    });
  }

  // =========================================================
  // FARM MACHINERY
  // =========================================================

  _generateMachinery(stem, mode, seed) {
    const machine =
      this._pick(
        this.machinery,
        seed
      );

    return this._result({
      q: `Which farm implement or machine is primarily used for ${machine.function}?`,
      ans: machine.name,
      hint:
        "Match the machine with its main agricultural operation.",
      why:
        `${machine.name} is primarily used for ${machine.function}.`,
      steps: this._steps([
        "Identify the farm operation.",
        "Match the operation with the appropriate implement.",
        `The correct machine is ${machine.name}.`,
      ]),
      type: "mcq",
      options: this._mcq(
        machine.name,
        this.machinery
          .filter(
            x =>
              x.name !==
              machine.name
          )
          .map(
            x =>
              x.name
          ),
        seed
      ),
      domain: "farm_machinery",
    });
  }

  // =========================================================
  // FARM ECONOMICS
  // =========================================================

  _generateEconomics(stem, mode, seed) {
    const concept =
      this._pick(
        this.economicConcepts,
        seed
      );

    if (
      lowerIncludes(
        stem,
        [
          "profit",
          "cost",
          "revenue",
          "income",
          "margin",
          "break even",
          "break-even",
        ]
      )
    ) {
      const cost =
        this._number(
          seed,
          10000,
          70000,
          5000
        );

      const revenue =
        cost +
        this._number(
          seed,
          5000,
          30000,
          5000,
          17
        );

      const profit =
        revenue - cost;

      return this._result({
        q: `A farmer spends KSh ${cost.toLocaleString()} on production and earns KSh ${revenue.toLocaleString()} from sales. What is the net profit?`,
        ans:
          `KSh ${profit.toLocaleString()}`,
        hint:
          "Subtract total costs from total revenue.",
        why:
          `Net profit = KSh ${revenue.toLocaleString()} âˆ’ KSh ${cost.toLocaleString()} = KSh ${profit.toLocaleString()}.`,
        steps: this._steps([
          `Total revenue = KSh ${revenue.toLocaleString()}.`,
          `Total cost = KSh ${cost.toLocaleString()}.`,
          "Profit = Revenue âˆ’ Cost.",
          `Profit = KSh ${profit.toLocaleString()}.`,
        ]),
        type:
          mode === 0
            ? "open_response"
            : "mcq",
        options:
          mode === 0
            ? null
            : this._mcq(
                `KSh ${profit.toLocaleString()}`,
                [
                  `KSh ${cost.toLocaleString()}`,
                  `KSh ${revenue.toLocaleString()}`,
                  `KSh ${(profit * 2).toLocaleString()}`,
                ],
                seed
              ),
        domain: "farm_economics",
      });
    }

    return this._result({
      q: `Which agricultural economic concept is described by the following relationship: ${concept.formula}?`,
      ans: concept.name,
      hint:
        "Focus on the quantities being compared or subtracted.",
      why:
        `${concept.name}: ${concept.formula}.`,
      steps: this._steps([
        "Identify the quantities involved.",
        `Match them with the economic relationship.`,
        `The correct concept is ${concept.name}.`,
      ]),
      type: "mcq",
      options: this._mcq(
        concept.name,
        this.economicConcepts
          .filter(
            x =>
              x.name !==
              concept.name
          )
          .map(
            x =>
              x.name
          ),
        seed
      ),
      domain: "agricultural_economics",
    });
  }

  // =========================================================
  // REVERSE DIAGNOSTIC
  // =========================================================

  _reverseDiagnostic(qObj, stem) {
    const rawAns =
      String(
        qObj?.ans || ""
      ).trim();

    if (
      !rawAns ||
      rawAns.length < 3
    ) {
      return null;
    }

    return this._result({
      q: `[Reverse Agricultural Diagnosis]

Original question:
"${stem}"

The original answer was:
"${rawAns}"

Work backward. Which agricultural principle, biological process,
management practice, production rule, or economic relationship
explains why this answer is correct?`,
      ans: rawAns,
      hint:
        qObj.hint ||
        "Do not merely recall the answer. Identify the agricultural principle that produces it.",
      why:
        qObj.why ||
        `The answer is supported by the agricultural principle represented by "${rawAns}".`,
      sol:
        qObj.sol ||
        rawAns,
      steps: this._steps([
        "Identify the agricultural situation.",
        "Determine what process or principle explains the result.",
        "Connect that principle to the original answer.",
        "State the conclusion.",
      ]),
      type: "open_response",
      options: null,
      domain: "reverse_diagnosis",
    });
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
          `[Agricultural Application Check] ${stem}`,

        hint:
          qObj.hint ||
          "Identify the agricultural principle and apply it to the situation.",

        steps: this._steps([
          "Identify the crop, livestock or farm-management situation.",
          "Identify the relevant agricultural principle.",
          "Apply the principle.",
          "State the conclusion.",
        ]),

        domain:
          "agricultural_application",
      };
    }

    const original =
      parseFloat(
        numbers[0]
      );

    if (
      !Number.isFinite(
        original
      )
    ) {
      return qObj;
    }

    const multipliers =
      [2, 3, 4];

    const factor =
      multipliers[
        seed %
          multipliers.length
      ];

    const mutated =
      Math.round(
        original * factor
      );

    const mutatedStem =
      stem.replace(
        numbers[0],
        String(mutated)
      );

    return {
      ...qObj,

      q:
        `[Agricultural Parameter Variant] ${mutatedStem}`,

      hint:
        qObj.hint ||
        "Apply the same agricultural rule using the new parameter.",

      why:
        `The original parameter ${original} was changed to ${mutated}. The agricultural relationship must therefore be recalculated.`,

      steps: this._steps([
        `Identify the changed parameter: ${mutated}.`,
        "Identify the governing agricultural formula or principle.",
        "Recalculate the result using the new parameter.",
        "Check whether the new result is reasonable.",
      ]),

      domain:
        "parameter_mutation",
    };
  }

  // =========================================================
  // DOMAIN DETECTION
  // =========================================================

  _detectDomain(lower) {
    const domains = [
      {
        name: "soil",
        terms: [
          "soil",
          "erosion",
          "terrace",
          "terracing",
          "humus",
          "clay",
          "sandy",
          "loam",
          "runoff",
          "conservation",
          "contour",
          "windbreak",
        ],
      },

      {
        name: "nutrient",
        terms: [
          "fertilizer",
          "nutrient",
          "nitrogen",
          "phosphorus",
          "potassium",
          "npk",
          "chlorosis",
          "deficiency",
          "urea",
          "can",
          "dap",
          "mop",
        ],
      },

      {
        name: "pest",
        terms: [
          "pest",
          "insect",
          "pesticide",
          "ipm",
          "integrated pest",
          "biological control",
          "crop rotation",
        ],
      },

      {
        name: "livestock",
        terms: [
          "livestock",
          "cattle",
          "cow",
          "goat",
          "sheep",
          "pig",
          "poultry",
          "chicken",
          "broiler",
          "layer",
          "milk",
          "egg",
          "meat",
          "animal",
        ],
      },

      {
        name: "machinery",
        terms: [
          "tractor",
          "plough",
          "plow",
          "harrow",
          "planter",
          "sprayer",
          "combine",
          "machinery",
          "implement",
          "cultivator",
        ],
      },

      {
        name: "economics",
        terms: [
          "profit",
          "cost",
          "revenue",
          "income",
          "margin",
          "break-even",
          "break even",
          "farm budget",
          "farm economics",
          "selling price",
        ],
      },

      {
        name: "calculation",
        terms: [
          "calculate",
          "how many",
          "how much",
          "yield",
          "hectare",
          "tonnes",
          "kg",
          "feed",
          "population",
        ],
      },
    ];

    for (const domain of domains) {
      if (
        lowerIncludes(
          lower,
          domain.terms
        )
      ) {
        return domain.name;
      }
    }

    return null;
  }

  // =========================================================
  // MAIN MUTATOR
  // =========================================================

  mutate(
    qObj,
    modalityIndex = 0
  ) {
    if (!qObj) return null;

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

    const mode =
      typeof modalityIndex ===
      "number"
        ? (
            (
              Math.floor(
                modalityIndex
              ) % 4
            ) + 4
          ) % 4
        : 0;

    const seed =
      this._seed(
        stem,
        qObj
      );

    const domain =
      this._detectDomain(
        lower
      );

    // -------------------------------------------------------
    // AGRICULTURAL CALCULATIONS
    // -------------------------------------------------------

    if (
      domain ===
      "calculation"
    ) {
      return this._generateFarmCalculation(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // SOIL
    // -------------------------------------------------------

    if (
      domain ===
      "soil"
    ) {
      return this._generateSoil(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // PLANT NUTRITION
    // -------------------------------------------------------

    if (
      domain ===
      "nutrient"
    ) {
      return this._generateNutrient(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // PEST MANAGEMENT
    // -------------------------------------------------------

    if (
      domain ===
      "pest"
    ) {
      return this._generatePest(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // LIVESTOCK
    // -------------------------------------------------------

    if (
      domain ===
      "livestock"
    ) {
      return this._generateLivestock(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // MACHINERY
    // -------------------------------------------------------

    if (
      domain ===
      "machinery"
    ) {
      return this._generateMachinery(
        stem,
        mode,
        seed
      );
    }

    // -------------------------------------------------------
    // FARM ECONOMICS
    // -------------------------------------------------------

    if (
      domain ===
      "economics"
    ) {
      return this._generateEconomics(
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
        stem
      );

    if (reverse) {
      return reverse;
    }

    // -------------------------------------------------------
    // GENERIC MUTATION
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
