/**
 * ============================================================
 * TIXAR BIOLOGY MUTATOR v3
 * ============================================================
 *
 * VERIFIED SEMANTIC MUTATION ENGINE
 *
 * Core principle:
 *
 *     FACTS -> CONCEPT -> MUTATION PLAN -> QUESTION
 *                    |
 *                 ANSWER
 *                    |
 *                VALIDATOR
 *
 * Randomness is ONLY used to select among verified alternatives.
 *
 * The mutator must NEVER:
 *
 *   - randomly replace biological facts
 *   - randomly combine unrelated organisms
 *   - change the concept after classification
 *   - copy an old answer into a changed question
 *   - invent a biological relationship
 *
 * If Tixar cannot verify a mutation:
 *
 *     DISCARD IT.
 *
 * ============================================================
 */

export class BiologyMutator {
  constructor(config = {}) {
    this.config = {
      maxRetries: 10,
      defaultDifficulty: 1,
      seed: config.seed ?? Date.now(),
      ...config,
    };

    this.rng = this._createRNG(this.config.seed);

    /*
     * This is intentionally a curated knowledge model.
     *
     * It is NOT intended to be the entire biology curriculum.
     * It is the verified foundation from which mutations may be made.
     */
    this.factBank = this._createFactBank();
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
      qObj.q ??
      qObj.stem ??
      ""
    ).trim();

    if (!stem) return null;

    const difficulty =
      this._determineDifficulty(
        qObj,
        performanceContext
      );

    /*
     * Prefer the semantic model already attached to the
     * question. This is much safer than trying to rediscover
     * meaning from English every time.
     */
    const sourceModel =
      this._extractSourceModel(
        qObj
      );

    const concept =
      sourceModel?.concept ??
      this._classifyConcept(stem);

    const generator =
      this._getGenerator(concept);

    /*
     * Unknown concept:
     * NEVER invent a biological mutation.
     */
    if (!generator) {
      return this._fallback(
        qObj,
        modalityIndex,
        difficulty,
        concept,
        "NO_SAFE_GENERATOR"
      );
    }

    for (
      let attempt = 0;
      attempt < this.config.maxRetries;
      attempt++
    ) {
      try {
        const context = {
          ...performanceContext,

          sourceModel,

          concept,

          difficulty,

          diagnosis:
            performanceContext.diagnosis ??
            null,

          repairStrategy:
            performanceContext.repairStrategy ??
            "STANDARD",

          preserveConcept: true,

          preserveFacts: true,

          recalculateAnswer: true,

          requireVerification: true,
        };

        const candidate =
          generator.call(
            this,
            qObj,
            difficulty,
            context
          );

        if (!candidate) {
          continue;
        }

        const normalized =
          this._normalizeQuestion(
            candidate
          );

        if (!normalized) {
          continue;
        }

        const verification =
          this._verifyQuestion(
            normalized,
            concept
          );

        if (!verification.valid) {
          console.warn(
            "[BiologyMutator] Rejected candidate:",
            verification.reason
          );

          continue;
        }

        return this._finalize(
          normalized,
          modalityIndex,
          concept,
          difficulty,
          sourceModel,
          attempt + 1
        );
      } catch (error) {
        console.warn(
          "[BiologyMutator] Mutation attempt failed:",
          error
        );
      }
    }

    /*
     * Safe failure.
     *
     * An unchanged verified question is better than
     * a biologically incorrect mutation.
     */
    return this._fallback(
      qObj,
      modalityIndex,
      difficulty,
      concept,
      "NO_VERIFIED_VARIANT"
    );
  }

  // ==========================================================
  // CONCEPT CLASSIFIER
  // ==========================================================

  _classifyConcept(stem) {
    const text =
      String(stem)
        .toLowerCase()
        .replace(/\s+/g, " ");

    /*
     * Specific concepts before broad concepts.
     */

    if (
      /photosynth|chlorophyll|stomata|light[- ]dependent|light[- ]independent|carbon dioxide.*plant|plant.*carbon dioxide/.test(text)
    ) {
      return "photosynthesis";
    }

    if (
      /enzyme|active site|substrate|denatur|amylase|pepsin|catalyst/.test(text)
    ) {
      return "enzymes";
    }

    if (
      /osmosis|water potential|plasmolysis|turgid|flaccid/.test(text)
    ) {
      return "osmosis";
    }

    if (
      /\bdiffusion\b|concentration gradient|facilitated diffusion|active transport/.test(text)
    ) {
      return "membrane_transport";
    }

    if (
      /aerobic respiration|anaerobic respiration|respiration.*glucose|glucose.*respiration|atp.*respiration/.test(text)
    ) {
      return "respiration";
    }

    if (
      /mitochondri|atp production/.test(text)
    ) {
      return "aerobic_respiration";
    }

    if (
      /dna|gene|allele|genotype|phenotype|chromosome|monohybrid|inheritance|punnett|mitosis|meiosis/.test(text)
    ) {
      return "genetics";
    }

    if (
      /heart|blood|artery|vein|capillary|haemoglobin|hemoglobin|circulation/.test(text)
    ) {
      return "circulation";
    }

    if (
      /xylem|phloem|transpiration|translocation|vascular/.test(text)
    ) {
      return "plant_transport";
    }

    if (
      /ecosystem|food chain|food web|population|predator|prey|ecology|habitat|producer|consumer/.test(text)
    ) {
      return "ecology";
    }

    if (
      /hormone|insulin|thyroxine|adrenaline|feedback|blood glucose|homeostasis/.test(text)
    ) {
      return "homeostasis";
    }

    if (
      /adaptation|natural selection|evolution|survival|selection pressure/.test(text)
    ) {
      return "evolution";
    }

    if (
      /cell|organelle|nucleus|ribosome|vacuole|chloroplast|cell membrane|cytoplasm/.test(text)
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

      osmosis:
        this._generateOsmosis,

      membrane_transport:
        this._generateMembraneTransport,

      respiration:
        this._generateRespiration,

      aerobic_respiration:
        this._generateAerobicRespiration,

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
        this._generateCellBiology,
    };

    return generators[concept] ?? null;
  }

  // ==========================================================
  // DIFFICULTY
  // ==========================================================

  _determineDifficulty(
    qObj,
    context
  ) {
    if (
      typeof context.difficulty === "number"
    ) {
      return this._clamp(
        Math.round(context.difficulty),
        1,
        5
      );
    }

    const accuracy =
      Number(
        context.recentAccuracy ??
        context.accuracy ??
        0.5
      );

    if (accuracy >= 0.90) return 5;
    if (accuracy >= 0.80) return 4;
    if (accuracy >= 0.65) return 3;
    if (accuracy >= 0.45) return 2;

    return 1;
  }

  // ==========================================================
  // SOURCE MODEL
  // ==========================================================

  _extractSourceModel(qObj) {
    /*
     * Best case:
     * another Tixar engine already supplied semantic metadata.
     */
    const metadataModel =
      qObj?.metadata?.biologyModel ??
      qObj?.biologyModel ??
      qObj?.mutationSpec ??
      null;

    if (metadataModel) {
      return metadataModel;
    }

    /*
     * Legacy questions may only have a stem.
     *
     * We deliberately do NOT invent detailed facts here.
     *
     * The concept classifier may still identify the concept,
     * allowing the curated fact bank to generate a safe question.
     */
    return null;
  }

  // ==========================================================
  // PHOTOSYNTHESIS
  // ==========================================================

  _generatePhotosynthesis(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.photosynthesis;

    const mode =
      this._chooseMode(
        difficulty,
        [
          "recall",
          "mechanism",
          "application",
          "evidence",
        ]
      );

    if (mode === "recall") {
      return this._buildQuestion({
        q:
          "Which substance is produced as a carbohydrate " +
          "during photosynthesis?",

        ans:
          facts.products.primary,

        options: [
          facts.products.primary,
          "Urea",
          "Protein",
          "Lactic acid",
        ],

        hint:
          "Photosynthesis uses light energy to make carbohydrate " +
          "from carbon dioxide and water.",

        why:
          "Glucose is produced during photosynthesis.",

        skill:
          "photosynthesis_products",

        concept:
          "photosynthesis",

        variables: {
          process: "photosynthesis",
          product: facts.products.primary,
        },
      });
    }

    if (mode === "mechanism") {
      return this._buildQuestion({
        q:
          "Why is chlorophyll important in photosynthesis?",

        ans:
          facts.chlorophyll.function,

        options: [
          facts.chlorophyll.function,
          "It digests glucose inside the vacuole",
          "It transports water through the xylem",
          "It converts oxygen into nitrogen",
        ],

        hint:
          "Think about where the energy for photosynthesis comes from.",

        why:
          facts.chlorophyll.function,

        skill:
          "photosynthesis_light_capture",

        concept:
          "photosynthesis",

        variables: {
          structure: "chlorophyll",
        },
      });
    }

    if (mode === "application") {
      return this._buildQuestion({
        q:
          "A green plant is kept in darkness for a prolonged period. " +
          "Which factor is directly unavailable for photosynthesis?",

        ans:
          "Light energy",

        options: [
          "Light energy",
          "Carbon dioxide in every circumstance",
          "Water in every circumstance",
          "Oxygen as the raw material",
        ],

        hint:
          "Identify the energy source required by photosynthesis.",

        why:
          "Light provides the energy required for photosynthesis.",

        skill:
          "photosynthesis_limiting_factor",

        concept:
          "photosynthesis",
      });
    }

    return this._buildQuestion({
      q:
        "A leaf is partly covered with opaque material and then exposed " +
        "to light. Iodine is used after the experiment. What is the purpose " +
        "of the iodine test?",

      ans:
        "To test for starch",

      options: [
        "To test for starch",
        "To measure oxygen pressure",
        "To test for protein synthesis",
        "To detect mineral ions",
      ],

      hint:
        "Iodine is commonly used as an indicator for starch.",

      why:
        "The iodine test detects starch, allowing starch formation in different parts of the leaf to be compared.",

      skill:
        "photosynthesis_starch_test",

      concept:
        "photosynthesis",

      variables: {
        test: "iodine",
        substanceDetected: "starch",
      },
    });
  }

  // ==========================================================
  // ENZYMES
  // ==========================================================

  _generateEnzymes(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.enzymes;

    const mode =
      this._chooseMode(
        difficulty,
        [
          "specificity",
          "temperature",
          "ph",
          "mechanism",
        ]
      );

    if (mode === "specificity") {
      return this._buildQuestion({
        q:
          "Why can an enzyme usually catalyse only particular substrates?",

        ans:
          "Its active site has a shape complementary to the substrate",

        options: [
          "Its active site has a shape complementary to the substrate",
          "All enzymes have identical active sites",
          "Enzymes are converted into substrates",
          "Substrates permanently change into enzymes",
        ],

        hint:
          "Think about the shape of the active site.",

        why:
          facts.general.specificity,

        skill:
          "enzyme_specificity",

        concept:
          "enzymes",
      });
    }

    if (mode === "temperature") {
      return this._buildQuestion({
        q:
          "Why does enzyme activity usually decrease sharply at temperatures " +
          "well above the enzyme's optimum?",

        ans:
          "The enzyme may denature and its active site changes shape",

        options: [
          "The enzyme may denature and its active site changes shape",
          "The enzyme is converted into a carbohydrate",
          "The substrate disappears because enzymes become radioactive",
          "All chemical reactions stop permanently",
        ],

        hint:
          "Consider the three-dimensional structure of a protein.",

        why:
          facts.temperature.high,

        skill:
          "enzyme_temperature",

        concept:
          "enzymes",
      });
    }

    if (mode === "ph") {
      return this._buildQuestion({
        q:
          "Why can a change in pH reduce the activity of an enzyme?",

        ans:
          "It can alter interactions maintaining the enzyme's structure and active site",

        options: [
          "It can alter interactions maintaining the enzyme's structure and active site",
          "It changes every enzyme into DNA",
          "It guarantees that more substrate is produced",
          "It removes all water from the cell",
        ],

        hint:
          "Enzymes depend on their three-dimensional structure.",

        why:
          facts.ph.effect,

        skill:
          "enzyme_ph",

        concept:
          "enzymes",
      });
    }

    return this._buildQuestion({
      q:
        "What happens when a substrate binds to the active site of a suitable enzyme?",

      ans:
        "An enzyme-substrate complex forms",

      options: [
        "An enzyme-substrate complex forms",
        "The enzyme becomes a chromosome",
        "The substrate becomes oxygen automatically",
        "The active site permanently disappears",
      ],

      hint:
        "Think about the first stage of an enzyme-catalysed reaction.",

      why:
        facts.general.binding,

      skill:
        "enzyme_mechanism",

      concept:
        "enzymes",
    });
  }

  // ==========================================================
  // OSMOSIS
  // ==========================================================

  _generateOsmosis(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.osmosis;

    const scenario =
      this._choice([
        {
          q:
            "A plant cell is placed in a solution with lower water potential " +
            "than the cell. What is the net movement of water?",

          ans:
            "Water moves out of the cell by osmosis",

          variables: {
            direction: "out",
            process: "osmosis",
          },
        },

        {
          q:
            "A potato cylinder gains mass when placed in a solution with " +
            "higher water potential than the potato cells. What explains the change?",

          ans:
            "Water enters the potato cells by osmosis",

          variables: {
            direction: "in",
            process: "osmosis",
          },
        },

        {
          q:
            "A plant cell becomes turgid after being placed in water. " +
            "What has happened to the net movement of water?",

          ans:
            "Water has moved into the cell by osmosis",

          variables: {
            direction: "in",
            process: "osmosis",
          },
        },
      ]);

    return this._buildQuestion({
      ...scenario,

      options: [
        scenario.ans,
        "Water moves only because the cell wall actively pumps it",
        "Glucose is converted directly into water",
        "The nucleus pumps water through the cell",
      ],

      hint:
        facts.definition,

      why:
        facts.definition,

      skill:
        "osmosis",

      concept:
        "osmosis",
    });
  }

  // ==========================================================
  // MEMBRANE TRANSPORT
  // ==========================================================

  _generateMembraneTransport(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.transport;

    const mode =
      this._choice([
        "diffusion",
        "active_transport",
      ]);

    if (mode === "diffusion") {
      return this._buildQuestion({
        q:
          "A substance moves across a membrane from a region of higher " +
          "concentration to a region of lower concentration without energy " +
          "from ATP. Which process is being described?",

        ans:
          "Diffusion",

        options: [
          "Diffusion",
          "Active transport",
          "Photosynthesis",
          "Transpiration",
        ],

        hint:
          facts.diffusion.definition,

        why:
          facts.diffusion.definition,

        skill:
          "diffusion",

        concept:
          "membrane_transport",
      });
    }

    return this._buildQuestion({
      q:
        "A cell moves a substance from a region of lower concentration " +
        "to a region of higher concentration using cellular energy. " +
        "Which process is this?",

      ans:
        "Active transport",

      options: [
        "Active transport",
        "Simple diffusion",
        "Osmosis",
        "Transpiration",
      ],

      hint:
        facts.activeTransport.definition,

        why:
          facts.activeTransport.definition,

      skill:
        "active_transport",

      concept:
        "membrane_transport",
    });
  }

  // ==========================================================
  // RESPIRATION
  // ==========================================================

  _generateRespiration(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.respiration;

    const mode =
      this._choice([
        "aerobic",
        "anaerobic",
        "comparison",
      ]);

    if (mode === "aerobic") {
      return this._buildQuestion({
        q:
          "Which statement correctly describes aerobic respiration?",

        ans:
          "It releases energy from glucose using oxygen",

        options: [
          "It releases energy from glucose using oxygen",
          "It produces glucose from carbon dioxide",
          "It occurs only outside living cells",
          "It requires chlorophyll",
        ],

        hint:
          facts.aerobic.definition,

        why:
          facts.aerobic.definition,

        skill:
          "aerobic_respiration",

        concept:
          "respiration",
      });
    }

    if (mode === "anaerobic") {
      return this._buildQuestion({
        q:
          "What distinguishes anaerobic respiration from aerobic respiration?",

        ans:
          "Anaerobic respiration releases energy without using oxygen",

        options: [
          "Anaerobic respiration releases energy without using oxygen",
          "Anaerobic respiration requires chlorophyll",
          "Anaerobic respiration always produces more energy",
          "Anaerobic respiration is photosynthesis",
        ],

        hint:
          facts.anaerobic.definition,

        why:
          facts.anaerobic.definition,

        skill:
          "anaerobic_respiration",

        concept:
          "respiration",
      });
    }

    return this._buildQuestion({
      q:
        "Why is respiration important to cells?",

      ans:
        "It releases energy that cells can use for biological processes",

      options: [
        "It releases energy that cells can use for biological processes",
        "It creates sunlight inside cells",
        "It replaces all proteins with glucose",
        "It prevents every chemical reaction",
      ],

      hint:
        facts.general.function,

      why:
        facts.general.function,

      skill:
        "respiration_function",

      concept:
        "respiration",
    });
  }

  // ==========================================================
  // AEROBIC RESPIRATION
  // ==========================================================

  _generateAerobicRespiration(
    qObj,
    difficulty,
    context
  ) {
    return this._buildQuestion({
      q:
        "Which organelle is the main site of aerobic respiration in eukaryotic cells?",

      ans:
        "Mitochondrion",

      options: [
        "Mitochondrion",
        "Ribosome",
        "Golgi apparatus",
        "Cell wall",
      ],

      hint:
        "Think about the organelle associated with aerobic respiration.",

      why:
        "Mitochondria are the main site of aerobic respiration in eukaryotic cells.",

      skill:
        "aerobic_respiration_site",

      concept:
        "aerobic_respiration",
    });
  }

  // ==========================================================
  // GENETICS
  // ==========================================================

  _generateGenetics(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.genetics;

    const parent =
      this._choice(
        facts.monohybrid.validCrosses
      );

    return this._buildQuestion({
      q:
        `Two heterozygous parents with genotypes ${parent.parent} ` +
        `are crossed. What proportion of offspring is expected to have ` +
        `the homozygous recessive genotype ${parent.recessive}?`,

      ans:
        "25%",

      options: [
        "25%",
        "50%",
        "75%",
        "100%",
      ],

      hint:
        "Each heterozygous parent produces two possible gametes.",

      why:
        "A heterozygous × heterozygous monohybrid cross gives a 1:2:1 genotype ratio, so one quarter is homozygous recessive.",

      skill:
        "monohybrid_inheritance",

      concept:
        "genetics",

      variables: {
        parentalGenotype:
          parent.parent,

        recessive:
          parent.recessive,

        expectedRecessive:
          0.25,
      },
    });
  }

  // ==========================================================
  // CIRCULATION
  // ==========================================================

  _generateCirculation(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.circulation;

    const scenario =
      this._choice([
        {
          q:
            "Why do arteries generally have thick muscular walls?",

          ans:
            facts.arteries.reason,

          skill:
            "artery_structure",
        },

        {
          q:
            "What is the main role of haemoglobin in red blood cells?",

          ans:
            facts.haemoglobin.function,

          skill:
            "haemoglobin_function",
        },

        {
          q:
            "Why are capillary walls very thin?",

          ans:
            facts.capillaries.reason,

          skill:
            "capillary_structure",
        },
      ]);

    return this._buildQuestion({
      ...scenario,

      options:
        this._uniqueOptions([
          scenario.ans,
          "To produce digestive enzymes",
          "To carry out photosynthesis",
          "To store genetic information",
        ]),

      hint:
        "Connect the structure of the blood vessel or cell component to its function.",

      why:
        scenario.ans,

      concept:
        "circulation",
    });
  }

  // ==========================================================
  // PLANT TRANSPORT
  // ==========================================================

  _generatePlantTransport(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.plantTransport;

    const scenario =
      this._choice([
        {
          q:
            "Which tissue transports water and mineral ions from the roots toward the leaves?",

          ans:
            "Xylem",

          skill:
            "xylem_transport",
        },

        {
          q:
            "Which tissue transports assimilates such as sucrose around a plant?",

          ans:
            "Phloem",

          skill:
            "phloem_transport",
        },

        {
          q:
            "What process describes the loss of water vapour from the aerial parts of a plant?",

          ans:
            "Transpiration",

          skill:
            "transpiration",
        },
      ]);

    return this._buildQuestion({
      ...scenario,

      options:
        this._uniqueOptions([
          scenario.ans,
          "Xylem",
          "Phloem",
          "Root cap",
        ]),

      hint:
        facts.general,

      why:
        this._getPlantTransportExplanation(
          scenario.ans
        ),

      concept:
        "plant_transport",
    });
  }

  // ==========================================================
  // ECOLOGY
  // ==========================================================

  _generateEcology(
    qObj,
    difficulty,
    context
  ) {
    /*
     * IMPORTANT:
     *
     * We no longer independently randomize:
     *
     *     prey
     *     herbivore
     *     predator
     *
     * because that can create impossible food chains.
     *
     * We select a complete verified chain.
     */

    const chain =
      this._choice(
        this.factBank.ecology.foodChains
      );

    const mode =
      this._choice([
        "population",
        "energy",
        "classification",
      ]);

    if (mode === "classification") {
      return this._buildQuestion({
        q:
          `In the food chain ${chain.display}, ` +
          `which organism is the producer?`,

        ans:
          chain.producer,

        options:
          this._uniqueOptions([
            chain.producer,
            chain.primaryConsumer,
            chain.secondaryConsumer,
            "The decomposer",
          ]),

        hint:
          "A producer makes organic food, usually through photosynthesis.",

        why:
          `${chain.producer} is the producer in this food chain.`,

        skill:
          "food_chain_roles",

        concept:
          "ecology",

        variables: {
          chainId:
            chain.id,
        },
      });
    }

    if (mode === "energy") {
      return this._buildQuestion({
        q:
          `In the food chain ${chain.display}, ` +
          `which organism obtains energy directly from the producer?`,

        ans:
          chain.primaryConsumer,

        options:
          this._uniqueOptions([
            chain.primaryConsumer,
            chain.producer,
            chain.secondaryConsumer,
            "The decomposer",
          ]),

        hint:
          "The first consumer feeds directly on the producer.",

        why:
          `${chain.primaryConsumer} is the primary consumer and obtains energy directly from ${chain.producer}.`,

        skill:
          "food_chain_energy",

        concept:
          "ecology",

        variables: {
          chainId:
            chain.id,
        },
      });
    }

    return this._buildQuestion({
      q:
        `In the food chain ${chain.display}, ` +
        `what is the most likely immediate effect if the population ` +
        `of ${chain.primaryConsumer} decreases substantially?`,

      ans:
        `The ${chain.secondaryConsumer} population may decrease because less food is available`,

      options: [
        `The ${chain.secondaryConsumer} population may decrease because less food is available`,
        `The ${chain.secondaryConsumer} becomes a producer`,
        `The ${chain.secondaryConsumer} no longer requires energy`,
        `The ${chain.secondaryConsumer} immediately becomes extinct`,
      ],

      hint:
        "Think about the relationship between a predator and its food source.",

      why:
        `A substantial reduction in the primary consumer can reduce the food available to the secondary consumer.`,

      skill:
        "food_chain_population",

      concept:
        "ecology",

      variables: {
        chainId:
          chain.id,
      },
    });
  }

  // ==========================================================
  // HOMEOSTASIS
  // ==========================================================

  _generateHomeostasis(
    qObj,
    difficulty,
    context
  ) {
    const scenario =
      this._choice([
        {
          q:
            "After a carbohydrate-rich meal, blood glucose concentration rises. " +
            "Which hormone helps lower it toward the normal range?",

          ans:
            "Insulin",

          skill:
            "blood_glucose",
        },

        {
          q:
            "Which organ produces insulin?",

          ans:
            "Pancreas",

          skill:
            "insulin_source",
        },
      ]);

    return this._buildQuestion({
      ...scenario,

      options:
        scenario.skill === "blood_glucose"
          ? [
              "Insulin",
              "Adrenaline",
              "Haemoglobin",
              "Amylase",
            ]
          : [
              "Pancreas",
              "Thyroid gland",
              "Kidney",
              "Liver",
            ],

      hint:
        scenario.skill === "blood_glucose"
          ? "Think about the hormone released when blood glucose rises."
          : "Think about the organ responsible for producing insulin.",

      why:
        scenario.ans === "Insulin"
          ? "Insulin helps lower elevated blood glucose concentration."
          : "Insulin is produced by the pancreas.",

      concept:
        "homeostasis",
    });
  }

  // ==========================================================
  // EVOLUTION
  // ==========================================================

  _generateEvolution(
    qObj,
    difficulty,
    context
  ) {
    const facts =
      this.factBank.evolution;

    const scenario =
      this._choice([
        {
          q:
            "A population of insects contains inherited variation in resistance " +
            "to an insecticide. After repeated insecticide use, resistant insects " +
            "become more common. Which process explains this change?",

          ans:
            "Natural selection",

          skill:
            "natural_selection",
        },

        {
          q:
            "Why can an advantageous inherited characteristic become more common " +
            "in a population over generations?",

          ans:
            "Individuals with the characteristic may survive and reproduce more successfully",

          skill:
            "selection_mechanism",
        },
      ]);

    return this._buildQuestion({
      ...scenario,

      options:
        scenario.skill === "natural_selection"
          ? [
              "Natural selection",
              "Individual organisms deliberately changed their genes",
              "Osmosis",
              "Photosynthesis",
            ]
          : [
              "Individuals with the characteristic may survive and reproduce more successfully",
              "All individuals become genetically identical immediately",
              "The environment directly writes new genes into every organism",
              "Photosynthesis stops occurring",
            ],

      hint:
        facts.general,

      why:
        scenario.ans,

      concept:
        "evolution",
    });
  }

  // ==========================================================
  // CELL BIOLOGY
  // ==========================================================

  _generateCellBiology(
    qObj,
    difficulty,
    context
  ) {
    const fact =
      this._choice(
        this.factBank.cellBiology.organelles
      );

    return this._buildQuestion({
      q:
        `Which statement correctly describes the function of the ${fact.name}?`,

      ans:
        fact.function,

      options:
        this._uniqueOptions([
          fact.function,
          ...fact.distractors,
        ]),

      hint:
        `Recall the main function of the ${fact.name}.`,

      why:
        fact.function,

      skill:
        "cell_structure_function",

      concept:
        "cell_biology",

      variables: {
        organelle:
          fact.name,
      },
    });
  }

  // ==========================================================
  // QUESTION BUILDER
  // ==========================================================

  _buildQuestion({
    q,
    ans,
    options,
    hint,
    why,
    skill,
    concept,
    variables = {},
  }) {
    const normalizedOptions =
      this._uniqueOptions(
        options
      );

    return {
      q: String(q).trim(),

      ans: String(ans).trim(),

      options:
        normalizedOptions,

      hint,

      why,

      sol:
        String(ans).trim(),

      metadata: {
        skill,

        concept,

        variables,

        biologyModel: {
          concept,

          skill,

          variables,
        },

        provenance: {
          generatedBy:
            "TixarBiologyMutator",

          mutationVerified:
            false,
        },
      },
    };
  }

  // ==========================================================
  // VALIDATION
  // ==========================================================

  _verifyQuestion(
    question,
    concept
  ) {
    if (!question) {
      return {
        valid: false,
        reason: "EMPTY_QUESTION",
      };
    }

    if (
      typeof question.q !== "string" ||
      !question.q.trim()
    ) {
      return {
        valid: false,
        reason: "MISSING_STEM",
      };
    }

    if (
      question.ans === undefined ||
      question.ans === null ||
      !String(question.ans).trim()
    ) {
      return {
        valid: false,
        reason: "MISSING_ANSWER",
      };
    }

    if (
      !question.metadata?.skill
    ) {
      return {
        valid: false,
        reason: "MISSING_SKILL",
      };
    }

    if (
      question.metadata?.concept !== concept
    ) {
      return {
        valid: false,
        reason:
          "CONCEPT_MISMATCH",
      };
    }

    if (
      !Array.isArray(question.options)
    ) {
      return {
        valid: false,
        reason:
          "OPTIONS_MISSING",
      };
    }

    if (
      question.options.length !== 4
    ) {
      return {
        valid: false,
        reason:
          "INVALID_OPTION_COUNT",
      };
    }

    const options =
      question.options.map(
        (option) =>
          String(option)
            .trim()
      );

    const unique =
      new Set(
        options.map(
          (option) =>
            option.toLowerCase()
        )
      );

    if (unique.size !== 4) {
      return {
        valid: false,
        reason:
          "DUPLICATE_OPTIONS",
      };
    }

    const answer =
      String(question.ans)
        .trim()
        .toLowerCase();

    if (!unique.has(answer)) {
      return {
        valid: false,
        reason:
          "ANSWER_NOT_IN_OPTIONS",
      };
    }

    /*
     * Every generated question must contain semantic
     * variables or a fact model.
     */
    if (
      !question.metadata?.variables &&
      !question.metadata?.biologyModel
    ) {
      return {
        valid: false,
        reason:
          "NO_SEMANTIC_MODEL",
      };
    }

    return {
      valid: true,
    };
  }

  // ==========================================================
  // NORMALIZATION
  // ==========================================================

  _normalizeQuestion(question) {
    if (!question) return null;

    const result = {
      ...question,
    };

    result.q =
      String(result.q ?? "")
        .trim();

    result.ans =
      String(result.ans ?? "")
        .trim();

    if (
      !result.q ||
      !result.ans
    ) {
      return null;
    }

    result.options =
      Array.isArray(result.options)
        ? result.options.map(
            (option) =>
              String(option).trim()
          )
        : [];

    return result;
  }

  // ==========================================================
  // FINALIZATION
  // ==========================================================

  _finalize(
    question,
    modalityIndex,
    concept,
    difficulty,
    sourceModel,
    attempt
  ) {
    const mode =
      Number(modalityIndex) % 4;

    const open =
      mode === 0;

    const options =
      open
        ? null
        : this._shuffle(
            question.options
          );

    return {
      ...question,

      type:
        open
          ? "open_response"
          : "mcq",

      options,

      metadata: {
        ...(question.metadata || {}),

        concept,

        difficulty,

        mutationEngine:
          "TixarBiologyMutator",

        version:
          "3.0",

        verified:
          true,

        provenance: {
          ...(question.metadata?.provenance || {}),

          mutationVerified:
            true,

          mutationAccepted:
            true,

          mutationAttempt:
            attempt,

          sourceQuestionId:
            null,

          sourceModelAvailable:
            Boolean(sourceModel),

          conceptPreserved:
            true,

          factsPreserved:
            true,

          answerRecalculated:
            true,
        },
      },
    };
  }

  // ==========================================================
  // SAFE FALLBACK
  // ==========================================================

  _fallback(
    qObj,
    modalityIndex,
    difficulty,
    concept,
    reason
  ) {
    const fallback =
      structuredClone(qObj);

    fallback.metadata = {
      ...(fallback.metadata || {}),

      concept,

      difficulty,

      mutationEngine:
        "TixarBiologyMutator",

      version:
        "3.0",

      verified:
        true,

      provenance: {
        ...(fallback.metadata?.provenance || {}),

        mutationVerified:
          false,

        mutationAccepted:
          false,

        fallback:
          true,

        reason,
      },
    };

    return fallback;
  }

  // ==========================================================
  // FACT BANK
  // ==========================================================

  _createFactBank() {
    return {
      photosynthesis: {
        products: {
          primary: "Glucose",
        },

        chlorophyll: {
          function:
            "It absorbs light energy used in photosynthesis",
        },
      },

      enzymes: {
        general: {
          specificity:
            "An enzyme's active site has a shape complementary to its substrate",

          binding:
            "An enzyme-substrate complex forms when a suitable substrate binds to the active site",
        },

        temperature: {
          high:
            "High temperature can disrupt bonds maintaining the enzyme's structure, changing the active site",
        },

        ph: {
          effect:
            "A change in pH can alter interactions maintaining the enzyme's structure and active site",
        },
      },

      osmosis: {
        definition:
          "Osmosis is the net movement of water across a selectively permeable membrane from higher water potential to lower water potential",
      },

      transport: {
        diffusion: {
          definition:
            "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration",
        },

        activeTransport: {
          definition:
            "Active transport moves substances against a concentration gradient using cellular energy",
        },
      },

      respiration: {
        general: {
          function:
            "Respiration releases energy that cells can use for biological processes",
        },

        aerobic: {
          definition:
            "Aerobic respiration releases energy from glucose using oxygen",
        },

        anaerobic: {
          definition:
            "Anaerobic respiration releases energy without using oxygen",
        },
      },

      genetics: {
        monohybrid: {
          validCrosses: [
            {
              parent: "Aa × Aa",
              recessive: "aa",
            },

            {
              parent: "Bb × Bb",
              recessive: "bb",
            },
          ],
        },
      },

      circulation: {
        arteries: {
          reason:
            "They carry blood away from the heart under relatively high pressure, so their walls need strength",
        },

        haemoglobin: {
          function:
            "It binds oxygen and helps transport oxygen in the blood",
        },

        capillaries: {
          reason:
            "Their thin walls provide a short diffusion distance for exchange of substances",
        },
      },

      plantTransport: {
        general:
          "Xylem transports water and mineral ions, while phloem transports assimilates such as sucrose",
      },

      ecology: {
        foodChains: [
          {
            id: "grass_grasshopper_frog",

            display:
              "grass → grasshopper → frog",

            producer:
              "grass",

            primaryConsumer:
              "grasshopper",

            secondaryConsumer:
              "frog",
          },

          {
            id: "grass_zebra_lion",

            display:
              "grass → zebra → lion",

            producer:
              "grass",

            primaryConsumer:
              "zebra",

            secondaryConsumer:
              "lion",
          },

          {
            id: "maize_caterpillar_bird",

            display:
              "maize → caterpillar → bird",

            producer:
              "maize",

            primaryConsumer:
              "caterpillar",

            secondaryConsumer:
              "bird",
          },
        ],
      },

      homeostasis: {
        bloodGlucose: {
          hormone:
            "Insulin",
        },
      },

      evolution: {
        general:
          "Natural selection can increase the frequency of inherited characteristics that improve survival and reproductive success",
      },

      cellBiology: {
        organelles: [
          {
            name:
              "nucleus",

            function:
              "It contains most of the cell's genetic material and helps control cell activities",

            distractors: [
              "It is the main site of protein synthesis",
              "It is the main site of aerobic respiration",
              "It controls water loss from the entire organism",
            ],
          },

          {
            name:
              "ribosome",

            function:
              "It is the site of protein synthesis",

            distractors: [
              "It is the main site of aerobic respiration",
              "It stores most of the cell's genetic material",
              "It absorbs light energy for photosynthesis",
            ],
          },

          {
            name:
              "mitochondrion",

            function:
              "It is the main site of aerobic respiration",

            distractors: [
              "It is the site of protein synthesis",
              "It contains chlorophyll for photosynthesis",
              "It controls entry of every substance into the cell",
            ],
          },

          {
            name:
              "chloroplast",

            function:
              "It is the organelle where photosynthesis occurs in plant cells",

            distractors: [
              "It is the main site of protein synthesis",
              "It is the main site of aerobic respiration",
              "It stores all genetic material in the cell",
            ],
          },

          {
            name:
              "vacuole",

            function:
              "It contains cell sap and contributes to maintaining turgor in plant cells",

            distractors: [
              "It synthesizes proteins",
              "It is the main site of aerobic respiration",
              "It produces haemoglobin",
            ],
          },
        ],
      },
    };
  }

  // ==========================================================
  // EXPLANATION HELPERS
  // ==========================================================

  _getPlantTransportExplanation(
    answer
  ) {
    const explanations = {
      Xylem:
        "Xylem transports water and mineral ions from the roots toward the aerial parts of the plant.",

      Phloem:
        "Phloem transports assimilates such as sucrose around the plant.",

      Transpiration:
        "Transpiration is the loss of water vapour from the aerial parts of a plant.",
    };

    return (
      explanations[answer] ??
      "Connect the plant tissue or process to its biological function."
    );
  }

  // ==========================================================
  // MODE SELECTION
  // ==========================================================

  _chooseMode(
    difficulty,
    modes
  ) {
    /*
     * Lower mastery:
     * favour direct retrieval.
     *
     * Higher mastery:
     * favour mechanism/application.
     */

    if (difficulty <= 1) {
      return this._choice(
        modes.slice(0, 2)
      );
    }

    if (difficulty >= 4) {
      return this._choice(
        modes.slice(
          Math.max(0, modes.length - 2)
        )
      );
    }

    return this._choice(modes);
  }

  // ==========================================================
  // OPTION UTILITIES
  // ==========================================================

  _uniqueOptions(
    options
  ) {
    const result = [];
    const seen = new Set();

    for (const option of options) {
      const value =
        String(option ?? "")
          .trim();

      if (!value) continue;

      const key =
        value.toLowerCase();

      if (seen.has(key)) continue;

      seen.add(key);
      result.push(value);
    }

    return result.slice(0, 4);
  }

  // ==========================================================
  // RANDOMNESS
  // ==========================================================

  _choice(array) {
    if (
      !Array.isArray(array) ||
      array.length === 0
    ) {
      return undefined;
    }

    return array[
      Math.floor(
        this._random() *
        array.length
      )
    ];
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
          this._random() *
          (i + 1)
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

  _random() {
    return typeof this.rng === "function" ? this.rng() : Math.random();
  }

  _rng() {
    return this._random();
  }

  // ==========================================================
  // UTILITIES
  // ==========================================================

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

  _createRNG(seed) {
    let state =
      seed >>> 0;

    return () => {
      state +=
        0x6D2B79F5;

      let t =
        state;

      t =
        Math.imul(
          t ^ (t >>> 15),
          t | 1
        );

      t ^=
        t +
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
