/**
 * ============================================================
 * TIXAR BIOLOGY MUTATOR v2
 * ============================================================
 *
 * Biology is not mutated by randomly changing facts.
 *
 * Instead:
 *
 * ORIGINAL QUESTION
 *       â†“
 * CONCEPT IDENTIFICATION
 *       â†“
 * BIOLOGICAL MECHANISM
 *       â†“
 * CONTEXT TRANSFORMATION
 *       â†“
 * EVIDENCE / CONSEQUENCE
 *       â†“
 * MISCONCEPTION DISTRACTORS
 *       â†“
 * VALIDATION
 *
 * Core principle:
 *
 *     Change the CONTEXT.
 *     Preserve the CONCEPT.
 *
 * This allows Tixar to test whether a learner actually
 * understands biology rather than memorizing wording.
 */

export class BiologyMutator {

  constructor(config = {}) {
    this.config = {
      maxRetries: 10,
      defaultDifficulty: 1,
      seed: config.seed ?? Date.now(),
      ...config
    };

    this.rng = this._createRNG(this.config.seed);
  }

  // ==========================================================
  // PUBLIC API
  // ==========================================================

  mutate(
    qObj,
    modalityIndex = 0,
    performanceContext = {}
  ) {
    if (!qObj) return null;

    const stem = String(
      qObj.q ||
      qObj.stem ||
      ""
    ).trim();

    if (!stem) return null;

    const difficulty =
      this._determineDifficulty(
        qObj,
        performanceContext
      );

    const concept =
      this._classifyConcept(stem);

    const generator =
      this._getGenerator(concept);

    if (!generator) {
      return this._fallback(
        qObj,
        modalityIndex,
        difficulty,
        concept
      );
    }

    for (
      let attempt = 0;
      attempt < this.config.maxRetries;
      attempt++
    ) {

      const question = generator.call(
        this,
        qObj,
        difficulty,
        performanceContext
      );

      if (
        question &&
        this._validateQuestion(question)
      ) {
        return this._finalize(
          question,
          modalityIndex,
          concept,
          difficulty
        );
      }
    }

    return this._fallback(
      qObj,
      modalityIndex,
      difficulty,
      concept
    );
  }

  // ==========================================================
  // CONCEPT CLASSIFIER
  // ==========================================================

  _classifyConcept(stem) {

    const text = stem.toLowerCase();

    /*
     * Specific concepts MUST come before broad concepts.
     */

    if (
      /photosynth|chlorophyll|stomata|light-dependent|light independent|carbon dioxide.*plant/
        .test(text)
    ) {
      return "photosynthesis";
    }

    if (
      /enzyme|active site|substrate|catalyst|denatur|amylase|pepsin/
        .test(text)
    ) {
      return "enzymes";
    }

    if (
      /osmosis|water potential|plasmolysis|turgid|flaccid|diffusion|membrane/
        .test(text)
    ) {
      return "transport";
    }

    if (
      /mitochondria|atp|aerobic respiration|anaerobic respiration|glucose.*respiration/
        .test(text)
    ) {
      return "respiration";
    }

    if (
      /dna|gene|allele|genotype|phenotype|chromosome|mitosis|meiosis|inheritance/
        .test(text)
    ) {
      return "genetics";
    }

    if (
      /heart|blood|artery|vein|capillary|haemoglobin|hemoglobin|circulation/
        .test(text)
    ) {
      return "circulation";
    }

    if (
      /xylem|phloem|transpiration|translocation|vascular/
        .test(text)
    ) {
      return "plant_transport";
    }

    if (
      /ecosystem|food chain|food web|population|predator|prey|ecology|habitat/
        .test(text)
    ) {
      return "ecology";
    }

    if (
      /hormone|insulin|thyroxine|adrenaline|feedback/
        .test(text)
    ) {
      return "homeostasis";
    }

    if (
      /adaptation|natural selection|evolution|survival/
        .test(text)
    ) {
      return "evolution";
    }

    if (
      /cell|organelle|nucleus|ribosome|vacuole|chloroplast/
        .test(text)
    ) {
      return "cell_biology";
    }

    return "generic";
  }

  // ==========================================================
  // GENERATOR REGISTRY
  // ==========================================================

  _getGenerator(concept) {

    const generators = {

      photosynthesis:
        this._generatePhotosynthesis,

      enzymes:
        this._generateEnzymes,

      transport:
        this._generateTransport,

      respiration:
        this._generateRespiration,

      genetics:
        this._generateGenetics,

      circulation:
        this._generateCirculation,

      plant_transport:
        this._generatePlantTransport,

      ecology:
        this._generateEcology,

      homeostasis:
        this._generateHomeostasis,

      evolution:
        this._generateEvolution,

      cell_biology:
        this._generateCellBiology
    };

    return generators[concept];
  }

  // ==========================================================
  // DIFFICULTY ENGINE
  // ==========================================================

  _determineDifficulty(qObj, context) {

    if (
      typeof context.difficulty === "number"
    ) {
      return this._clamp(
        Math.round(context.difficulty),
        1,
        5
      );
    }

    const accuracy = Number(
      context.recentAccuracy ??
      context.accuracy ??
      0.5
    );

    /*
     * Difficulty is based on demonstrated mastery,
     * not simply number of previous attempts.
     */

    if (accuracy >= 0.90) return 5;
    if (accuracy >= 0.80) return 4;
    if (accuracy >= 0.65) return 3;
    if (accuracy >= 0.45) return 2;

    return 1;
  }

  // ==========================================================
  // PHOTOSYNTHESIS
  // ==========================================================

  _generatePhotosynthesis(
    qObj,
    difficulty
  ) {

    const scenarios = {

      1: {
        q:
          "A green plant is placed in sunlight. " +
          "Which substance does it produce during photosynthesis?",

        ans:
          "Glucose",

        hint:
          "Photosynthesis converts carbon dioxide and water " +
          "into glucose using light energy.",

        steps: [
          "Step 1: Identify the process: photosynthesis.",
          "Step 2: Plants use carbon dioxide and water.",
          "Step 3: Light energy is captured by chlorophyll.",
          "Step 4: Glucose is produced."
        ],

        distractors: [
          "Oxygen only",
          "Protein",
          "Urea"
        ]
      },

      2: {
        q:
          "A student covers part of a green leaf with opaque paper " +
          "and leaves the plant in sunlight. After several hours, " +
          "the leaf is tested with iodine. What is the purpose of " +
          "this experiment?",

        ans:
          "To investigate whether light is required for starch formation",

        hint:
          "Iodine is used to test for starch.",

        steps: [
          "Step 1: The covered region receives little or no light.",
          "Step 2: The uncovered region receives light.",
          "Step 3: Iodine tests whether starch is present.",
          "Step 4: Differences in starch formation reveal the role of light."
        ],

        distractors: [
          "To test whether oxygen is required for respiration",
          "To measure water absorption by roots",
          "To determine whether chlorophyll is a protein"
        ]
      },

      3: {
        q:
          "Two identical plants are placed under lamps. " +
          "Plant A receives normal light while Plant B receives " +
          "very low light. After several days, Plant A has accumulated " +
          "more starch. Which explanation best accounts for the result?",

        ans:
          "Plant A received more light energy for photosynthesis",

        hint:
          "Light provides the energy required for photosynthesis.",

        steps: [
          "Step 1: Compare the independent variable: light intensity.",
          "Step 2: Photosynthesis requires light energy.",
          "Step 3: Greater available light can increase photosynthetic rate " +
          "when light is limiting.",
          "Step 4: More photosynthesis can result in greater starch accumulation."
        ],

        distractors: [
          "Plant A absorbed more oxygen through its leaves",
          "Low light directly converted starch into protein",
          "Plant B could not absorb carbon dioxide at all"
        ]
      },

      4: {
        q:
          "A greenhouse manager notices that increasing light intensity " +
          "initially increases the rate of photosynthesis, but beyond a " +
          "certain point the rate stops increasing. What is the most likely explanation?",

        ans:
          "Another factor has become limiting",

        hint:
          "Photosynthesis depends on several factors, including light, " +
          "carbon dioxide concentration and temperature.",

        steps: [
          "Step 1: Increasing light initially increases energy availability.",
          "Step 2: The rate eventually reaches a plateau.",
          "Step 3: Light is no longer the limiting factor.",
          "Step 4: Another factor such as COâ‚‚ concentration or temperature " +
          "may now limit the rate."
        ],

        distractors: [
          "Chlorophyll disappears immediately",
          "Water stops being chemically useful",
          "Oxygen becomes the main raw material"
        ]
      }
    };

    return this._scenario(
      scenarios,
      difficulty,
      "photosynthesis"
    );
  }

  // ==========================================================
  // ENZYMES
  // ==========================================================

  _generateEnzymes(
    qObj,
    difficulty
  ) {

    const temperature =
      difficulty >= 3
        ? this._choice([55, 60, 70])
        : this._choice([5, 10, 40]);

    const highTemp =
      temperature >= 55;

    const answer = highTemp
      ? "The enzyme becomes denatured and its active site changes shape"
      : "The enzyme may have reduced kinetic activity because molecules have less kinetic energy";

    return {

      q:
        `An enzyme-controlled reaction is investigated at ${temperature}Â°C. ` +
        `${highTemp
          ? "The reaction rate falls sharply after prolonged exposure."
          : "The reaction occurs more slowly than it does at the optimum temperature."
        } What is the best explanation?`,

      ans:
        answer,

      hint:
        highTemp
          ? "Think about the three-dimensional structure of proteins."
          : "Temperature affects molecular movement and collision frequency.",

      steps: highTemp
        ? [
            `Step 1: ${temperature}Â°C is substantially above the typical optimum.`,
            "Step 2: Excess heat disrupts bonds maintaining protein structure.",
            "Step 3: The enzyme's active site changes shape.",
            "Step 4: The substrate can no longer bind effectively."
          ]
        : [
            "Step 1: Enzyme activity depends on molecular collisions.",
            "Step 2: Lower temperature reduces molecular kinetic energy.",
            "Step 3: Fewer successful enzyme-substrate collisions occur.",
            "Step 4: Reaction rate decreases."
          ],

      sol:
        answer,

      options: [
        answer,
        highTemp
          ? "The enzyme is converted into glucose"
          : "The enzyme is permanently destroyed by every low temperature",

        "The substrate becomes radioactive",

        "The enzyme changes into a carbohydrate"
      ],

      metadata: {
        skill: "enzyme_activity",
        difficulty,
        variables: {
          temperature
        }
      }
    };
  }

  // ==========================================================
  // OSMOSIS / TRANSPORT
  // ==========================================================

  _generateTransport(
    qObj,
    difficulty
  ) {

    const scenarios = [
      {
        q:
          "A plant cell is placed in a concentrated salt solution. " +
          "After some time, the cell loses turgor. What happened?",

        ans:
          "Water moved out of the cell by osmosis",

        hint:
          "Osmosis is the movement of water across a selectively " +
          "permeable membrane from higher water potential to lower water potential.",

        steps: [
          "Step 1: The external salt solution is more concentrated.",
          "Step 2: The cell has relatively higher water potential.",
          "Step 3: Water moves out across the selectively permeable membrane.",
          "Step 4: The cell loses turgor."
        ]
      },

      {
        q:
          "Potato cylinders placed in distilled water increase in mass. " +
          "What is the best explanation?",

        ans:
          "Water entered the potato cells by osmosis",

        hint:
          "Distilled water has relatively high water potential.",

        steps: [
          "Step 1: Compare water potential.",
          "Step 2: Water moves toward the region of lower water potential.",
          "Step 3: Water enters the potato cells.",
          "Step 4: Cell mass increases."
        ]
      }
    ];

    const selected =
      scenarios[
        this._randInt(
          0,
          scenarios.length - 1
        )
      ];

    return {
      ...selected,

      sol: selected.ans,

      options: [
        selected.ans,
        "Salt moved through the membrane by active transport",
        "Water moved through the cell wall because the wall is fully permeable",
        "Starch molecules were actively pumped into the cell"
      ],

      metadata: {
        skill: "osmosis",
        difficulty
      }
    };
  }

  // ==========================================================
  // RESPIRATION
  // ==========================================================

  _generateRespiration(
    qObj,
    difficulty
  ) {

    const muscleDemand =
      this._choice([
        "a sprinter during a race",
        "a hummingbird flying rapidly",
        "a cyclist climbing a steep hill",
        "a person performing intense exercise"
      ]);

    return {

      q:
        `During ${muscleDemand}, muscle cells require large amounts ` +
        `of ATP. Which organelle is primarily responsible for aerobic ` +
        `ATP production?`,

      ans:
        "Mitochondria",

      hint:
        "Aerobic respiration occurs mainly in mitochondria.",

      steps: [
        "Step 1: Identify the biological demand: high ATP requirement.",
        "Step 2: ATP is required for cellular work such as muscle contraction.",
        "Step 3: Aerobic respiration generates large amounts of ATP.",
        "Step 4: Mitochondria are the main site of aerobic respiration."
      ],

      sol:
        "Mitochondria produce ATP through aerobic respiration.",

      options: [
        "Mitochondria",
        "Ribosomes",
        "Golgi apparatus",
        "Lysosomes"
      ],

      metadata: {
        skill: "aerobic_respiration",
        difficulty
      }
    };
  }

  // ==========================================================
  // GENETICS
  // ==========================================================

  _generateGenetics(
    qObj,
    difficulty
  ) {

    const dominant =
      this._choice(["A", "B"]);

    const recessive =
      dominant === "A"
        ? "a"
        : "b";

    return {

      q:
        `In a genetic cross, ${dominant} is dominant over ${recessive}. ` +
        `Two heterozygous parents are crossed. What proportion of ` +
        `their offspring is expected to show the recessive phenotype?`,

      ans:
        "25%",

      hint:
        "Write the parental genotypes and construct a Punnett square.",

      steps: [
        `Step 1: Heterozygous parents are ${dominant}${recessive} Ã— ${dominant}${recessive}.`,
        "Step 2: Each parent produces two possible gametes.",
        "Step 3: The offspring genotypes occur in a 1:2:1 ratio.",
        `Step 4: One of the four outcomes is homozygous recessive.`,
        "Step 5: Therefore the expected recessive phenotype is 1/4 = 25%."
      ],

      sol:
        "25%",

      options: [
        "25%",
        "50%",
        "75%",
        "100%"
      ],

      metadata: {
        skill: "monohybrid_inheritance",
        difficulty,
        variables: {
          dominant,
          recessive
        }
      }
    };
  }

  // ==========================================================
  // CIRCULATION
  // ==========================================================

  _generateCirculation(
    qObj,
    difficulty
  ) {

    const scenarios = [
      {
        q:
          "A patient has a greatly reduced red blood cell count. " +
          "Which physiological function is most directly affected?",

        ans:
          "Transport of oxygen to body tissues",

        explanation:
          "Red blood cells contain haemoglobin, which binds oxygen " +
          "and transports it through the circulatory system."
      },

      {
        q:
          "Why do arteries generally have thicker muscular walls than veins?",

        ans:
          "They carry blood under higher pressure from the heart",

        explanation:
          "Blood pumped from the heart enters arteries at relatively high pressure, " +
          "requiring stronger walls."
      }
    ];

    const selected =
      this._choice(scenarios);

    return {

      q: selected.q,

      ans: selected.ans,

      hint:
        "Connect the structure or condition to its physiological function.",

      why:
        selected.explanation,

      sol:
        selected.ans,

      steps: [
        "Step 1: Identify the structure or physiological condition.",
        "Step 2: Recall its normal biological function.",
        "Step 3: Determine what changes when that function is disrupted.",
        "Step 4: Select the consequence that follows directly."
      ],

      options: [
        selected.ans,
        "Production of digestive enzymes",
        "Synthesis of chlorophyll",
        "Removal of all carbon dioxide from the atmosphere"
      ],

      metadata: {
        skill: "circulatory_system",
        difficulty
      }
    };
  }

  // ==========================================================
  // PLANT TRANSPORT
  // ==========================================================

  _generatePlantTransport(
    qObj,
    difficulty
  ) {

    const scenarios = [
      {
        q:
          "A leafy shoot is placed in coloured water. After several hours, " +
          "the dye appears in the veins of the leaves. Which tissue transported the water?",

        ans:
          "Xylem",

        explanation:
          "Xylem transports water and dissolved mineral ions from the roots toward the leaves."
      },

      {
        q:
          "A plant has healthy roots but its leaves wilt rapidly when exposed " +
          "to dry, windy conditions. Which process is most directly increased?",

        ans:
          "Transpiration",

        explanation:
          "Dry moving air can increase water loss from leaves, increasing transpiration."
      }
    ];

    const selected =
      this._choice(scenarios);

    return {

      q: selected.q,

      ans: selected.ans,

      hint:
        "Identify what substance is moving and determine the tissue responsible.",

      why:
        selected.explanation,

      sol:
        selected.ans,

      steps: [
        "Step 1: Identify the substance or process involved.",
        "Step 2: Identify the direction of movement.",
        "Step 3: Match the movement to the correct plant tissue.",
        "Step 4: Explain why that tissue performs the function."
      ],

      options: [
        selected.ans,
        "Phloem",
        "Epidermis",
        "Root cap"
      ],

      metadata: {
        skill: "plant_transport",
        difficulty
      }
    };
  }

  // ==========================================================
  // ECOLOGY
  // ==========================================================

  _generateEcology(
    qObj,
    difficulty
  ) {

    const prey =
      this._choice([
        "grass",
        "maize",
        "algae"
      ]);

    const herbivore =
      this._choice([
        "grasshopper",
        "zebra",
        "caterpillar"
      ]);

    const predator =
      this._choice([
        "frog",
        "lion",
        "bird"
      ]);

    return {

      q:
        `Consider the food chain:\n\n` +
        `${prey} â†’ ${herbivore} â†’ ${predator}\n\n` +
        `If the population of ${herbivoresOr(
          herbivore
        )} suddenly decreases, what is the most immediate likely effect ` +
        `on the ${predator} population?`,

      ans:
        "It is likely to decrease because less food is available",

      hint:
        "Predators depend on their prey for energy.",

      steps: [
        `Step 1: Identify the predator's food source: ${herbivore}.`,
        `Step 2: The ${herbivore} population decreases.`,
        "Step 3: Less food is available to the predator.",
        "Step 4: Predator survival and reproduction may decrease."
      ],

      sol:
        "The predator population may decrease because its food supply has fallen.",

      options: [
        "It is likely to decrease because less food is available",
        "It must immediately double",
        "It becomes a producer",
        "It no longer requires energy"
      ],

      metadata: {
        skill: "food_chain_population",
        difficulty,
        variables: {
          prey,
          herbivore,
          predator
        }
      }
    };
  }

  // ==========================================================
  // HOMEOSTASIS
  // ==========================================================

  _generateHomeostasis(
    qObj,
    difficulty
  ) {

    return {

      q:
        "After eating a carbohydrate-rich meal, blood glucose concentration rises. " +
        "Which hormone helps return blood glucose toward its normal level?",

      ans:
        "Insulin",

      hint:
        "Think about the hormone released when blood glucose rises.",

      steps: [
        "Step 1: Blood glucose concentration increases.",
        "Step 2: The pancreas detects the increase.",
        "Step 3: Insulin is released.",
        "Step 4: Cells take up more glucose and excess glucose can be stored as glycogen.",
        "Step 5: Blood glucose concentration falls toward its normal range."
      ],

      sol:
        "Insulin helps lower elevated blood glucose concentration.",

      options: [
        "Insulin",
        "Adrenaline",
        "Haemoglobin",
        "Amylase"
      ],

      metadata: {
        skill: "blood_glucose_homeostasis",
        difficulty
      }
    };
  }

  // ==========================================================
  // EVOLUTION
  // ==========================================================

  _generateEvolution(
    qObj,
    difficulty
  ) {

    return {

      q:
        "A population of insects is exposed repeatedly to the same insecticide. " +
        "After several generations, a larger proportion of the population survives. " +
        "Which process best explains this change?",

      ans:
        "Natural selection",

      hint:
        "Consider inherited variation and differential survival.",

      steps: [
        "Step 1: Individuals in the population vary.",
        "Step 2: Some individuals possess inherited traits that increase survival.",
        "Step 3: Resistant individuals are more likely to survive and reproduce.",
        "Step 4: Resistance becomes more common over generations."
      ],

      sol:
        "Natural selection increases the frequency of inherited resistance.",

      options: [
        "Natural selection",
        "Individual insects deliberately changed their genes",
        "Photosynthesis",
        "Osmosis"
      ],

      metadata: {
        skill: "natural_selection",
        difficulty
      }
    };
  }

  // ==========================================================
  // CELL BIOLOGY
  // ==========================================================

  _generateCellBiology(
    qObj,
    difficulty
  ) {

    return {

      q:
        "A cell contains many ribosomes. What does this suggest about the cell's activity?",

      ans:
        "It is actively synthesizing proteins",

      hint:
        "Ribosomes are the sites of protein synthesis.",

      steps: [
        "Step 1: Identify the organelle: ribosome.",
        "Step 2: Recall its function: protein synthesis.",
        "Step 3: A high number of ribosomes suggests high protein production."
      ],

      sol:
        "Many ribosomes indicate active protein synthesis.",

      options: [
        "It is actively synthesizing proteins",
        "It is performing photosynthesis only",
        "It is storing all genetic material outside the nucleus",
        "It is digesting cellulose using chlorophyll"
      ],

      metadata: {
        skill: "cell_structure_function",
        difficulty
      }
    };
  }

  // ==========================================================
  // QUESTION BUILDER
  // ==========================================================

  _scenario(
    scenarios,
    difficulty,
    skill
  ) {

    const selected =
      scenarios[
        Math.min(
          difficulty,
          Object.keys(scenarios).length
        )
      ] ||
      scenarios[
        Object.keys(scenarios).length
      ];

    return {
      ...selected,

      options: [
        selected.ans,
        ...(selected.distractors || [])
      ],

      metadata: {
        skill,
        difficulty
      }
    };
  }

  // ==========================================================
  // VALIDATION
  // ==========================================================

  _validateQuestion(question) {

    if (!question) return false;

    if (!question.q) return false;

    if (!question.ans) return false;

    if (!question.options) return true;

    const unique =
      new Set(question.options);

    if (unique.size !== 4) {
      return false;
    }

    if (
      !unique.has(question.ans)
    ) {
      return false;
    }

    return true;
  }

  // ==========================================================
  // FINALIZATION
  // ==========================================================

  _finalize(
    question,
    modalityIndex,
    concept,
    difficulty
  ) {

    const mode =
      Number(modalityIndex) % 4;

    const open =
      mode === 0;

    return {

      ...question,

      type:
        open
          ? "open_response"
          : "mcq",

      options:
        open
          ? null
          : this._shuffle(
              question.options || []
            ),

      metadata: {

        ...(question.metadata || {}),

        concept,

        difficulty,

        mutationEngine:
          "TixarBiologyMutator",

        version:
          "2.0"
      }
    };
  }

  // ==========================================================
  // FALLBACK
  // ==========================================================

  _fallback(
    qObj,
    modalityIndex,
    difficulty,
    concept
  ) {

    return {

      ...qObj,

      type:
        Number(modalityIndex) % 4 === 0
          ? "open_response"
          : "mcq",

      hint:
        qObj.hint ||
        "Connect the biological structure, process, and function.",

      steps:
        qObj.steps || [
          "Identify the biological structure or process.",
          "Recall its function.",
          "Explain the mechanism.",
          "Connect the mechanism to the observed outcome."
        ],

      metadata: {
        concept,
        difficulty,
        mutationEngine:
          "TixarBiologyMutator",
        version:
          "2.0"
      }
    };
  }

  // ==========================================================
  // UTILITIES
  // ==========================================================

  _choice(array) {

    return array[
      Math.floor(
        this._rng() * array.length
      )
    ];
  }

  _randInt(min, max) {

    return Math.floor(
      this._rng() *
      (max - min + 1)
    ) + min;
  }

  _shuffle(array) {

    const result =
      [...array];

    for (
      let i = result.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          this._rng() * (i + 1)
        );

      [
        result[i],
        result[j]
      ] = [
        result[j],
        result[i]
      ];
    }

    return result;
  }

  _clamp(
    value,
    min,
    max
  ) {

    return Math.max(
      min,
      Math.min(max, value)
    );
  }

  _createRNG(seed) {

    let state =
      seed >>> 0;

    return () => {

      state +=
        0x6D2B79F5;

      let t =
        state;

      t = Math.imul(
        t ^ (t >>> 15),
        t | 1
      );

      t ^= t +
        Math.imul(
          t ^ (t >>> 7),
          t | 61
        );

      return (
        (
          t ^
          (t >>> 14)
        ) >>> 0
      ) / 4294967296;
    };
  }
}

/**
 * Small helper used by the ecology generator.
 * Keeping it outside the class prevents accidental
 * coupling with the mutator state.
 */
function herbivoresOr(name) {
  return name;
}
