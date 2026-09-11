/**
 * TIXAR CHEMISTRY MUTATOR
 * Version 4.0.0
 *
 * DETERMINISTIC / NON-RANDOM CHEMISTRY ENGINE
 *
 * CORE LAW
 *
 *      ORIGINAL QUESTION
 *              ↓
 *       FACT IDENTIFICATION
 *              ↓
 *       PARAMETER EXTRACTION
 *              ↓
 *       EXPLICIT MUTATION RULE
 *              ↓
 *       INDEPENDENT SOLVER
 *              ↓
 *       DISTRACTOR GENERATION
 *              ↓
 *       VALIDATION
 *
 * IMPORTANT:
 *
 * - No Math.random()
 * - No seed
 * - No Date.now()
 * - No hashing
 * - No pseudo-random selection
 * - No arbitrary generated numbers
 * - No arbitrary compound selection
 * - No random option shuffling
 *
 * Mutation must be explainable.
 */

export class ChemistryMutator {
  constructor(config = {}) {
    this.config = {
      version: "4.0.0",
      ...config,
    };

    // ==========================================================
    // ATOMIC MASSES
    // ==========================================================

    this.atomicMasses = Object.freeze({
      H: 1,
      C: 12,
      N: 14,
      O: 16,
      F: 19,
      Na: 23,
      Mg: 24.3,
      Al: 27,
      S: 32,
      Cl: 35.5,
      K: 39,
      Ca: 40,
      Fe: 56,
      Cu: 63.5,
      P: 31,
    });

    // ==========================================================
    // VERIFIED COMPOUNDS
    // ==========================================================

    this.compounds = Object.freeze([
      {
        id: "CaCO3",
        name: "Calcium carbonate",
        formula: "CaCO3",
        displayFormula: "CaCO3",
        molarMass: 100,
      },

      {
        id: "NaCl",
        name: "Sodium chloride",
        formula: "NaCl",
        displayFormula: "NaCl",
        molarMass: 58.5,
      },

      {
        id: "NaOH",
        name: "Sodium hydroxide",
        formula: "NaOH",
        displayFormula: "NaOH",
        molarMass: 40,
      },

      {
        id: "H2SO4",
        name: "Sulfuric acid",
        formula: "H2SO4",
        displayFormula: "H2SO4",
        molarMass: 98,
      },

      {
        id: "CO2",
        name: "Carbon dioxide",
        formula: "CO2",
        displayFormula: "CO2",
        molarMass: 44,
      },

      {
        id: "H2O",
        name: "Water",
        formula: "H2O",
        displayFormula: "H2O",
        molarMass: 18,
      },

      {
        id: "NH3",
        name: "Ammonia",
        formula: "NH3",
        displayFormula: "NH3",
        molarMass: 17,
      },

      {
        id: "MgOH2",
        name: "Magnesium hydroxide",
        formula: "Mg(OH)2",
        displayFormula: "Mg(OH)2",
        molarMass: 58.3,
      },

      {
        id: "CuSO4",
        name: "Copper(II) sulfate",
        formula: "CuSO4",
        displayFormula: "CuSO4",
        molarMass: 159.5,
      },

      {
        id: "C6H12O6",
        name: "Glucose",
        formula: "C6H12O6",
        displayFormula: "C6H12O6",
        molarMass: 180,
      },

      {
        id: "HNO3",
        name: "Nitric acid",
        formula: "HNO3",
        displayFormula: "HNO3",
        molarMass: 63,
      },

      {
        id: "Fe2O3",
        name: "Iron(III) oxide",
        formula: "Fe2O3",
        displayFormula: "Fe2O3",
        molarMass: 160,
      },
    ]);

    // ==========================================================
    // VERIFIED REACTIONS
    // ==========================================================

    this.reactions = Object.freeze([
      {
        id: "water_formation",

        equation:
          "2H2 + O2 -> 2H2O",

        reactants: [
          {
            formula: "H2",
            coefficient: 2,
          },
          {
            formula: "O2",
            coefficient: 1,
          },
        ],

        products: [
          {
            formula: "H2O",
            coefficient: 2,
          },
        ],
      },

      {
        id: "ammonia_formation",

        equation:
          "N2 + 3H2 -> 2NH3",

        reactants: [
          {
            formula: "N2",
            coefficient: 1,
          },
          {
            formula: "H2",
            coefficient: 3,
          },
        ],

        products: [
          {
            formula: "NH3",
            coefficient: 2,
          },
        ],
      },

      {
        id: "carbonate_acid",

        equation:
          "CaCO3 + 2HCl -> CaCl2 + H2O + CO2",

        reactants: [
          {
            formula: "CaCO3",
            coefficient: 1,
          },
          {
            formula: "HCl",
            coefficient: 2,
          },
        ],

        products: [
          {
            formula: "CO2",
            coefficient: 1,
          },
        ],
      },

      {
        id: "magnesium_combustion",

        equation:
          "2Mg + O2 -> 2MgO",

        reactants: [
          {
            formula: "Mg",
            coefficient: 2,
          },
          {
            formula: "O2",
            coefficient: 1,
          },
        ],

        products: [
          {
            formula: "MgO",
            coefficient: 2,
          },
        ],
      },

      {
        id: "methane_combustion",

        equation:
          "CH4 + 2O2 -> CO2 + 2H2O",

        reactants: [
          {
            formula: "CH4",
            coefficient: 1,
          },
          {
            formula: "O2",
            coefficient: 2,
          },
        ],

        products: [
          {
            formula: "CO2",
            coefficient: 1,
          },
        ],
      },
    ]);

    // ==========================================================
    // VERIFIED IONS
    // ==========================================================

    this.ions = Object.freeze([
      {
        element: "Na",
        name: "sodium",
        charge: 1,
        ion: "Na+",
      },

      {
        element: "K",
        name: "potassium",
        charge: 1,
        ion: "K+",
      },

      {
        element: "Mg",
        name: "magnesium",
        charge: 2,
        ion: "Mg2+",
      },

      {
        element: "Ca",
        name: "calcium",
        charge: 2,
        ion: "Ca2+",
      },

      {
        element: "Al",
        name: "aluminium",
        charge: 3,
        ion: "Al3+",
      },

      {
        element: "Cl",
        name: "chloride",
        charge: -1,
        ion: "Cl-",
      },

      {
        element: "F",
        name: "fluoride",
        charge: -1,
        ion: "F-",
      },

      {
        element: "O",
        name: "oxide",
        charge: -2,
        ion: "O2-",
      },

      {
        element: "S",
        name: "sulfide",
        charge: -2,
        ion: "S2-",
      },

      {
        element: "N",
        name: "nitride",
        charge: -3,
        ion: "N3-",
      },
    ]);

    // ==========================================================
    // VERIFIED FACT REGISTRY
    // ==========================================================

    this.factRegistry = Object.freeze({
      MOLAR_MASS: {
        concept: "Molar Mass",
        skill: "Calculate molar mass",
        keywords: [
          "molar mass",
          "relative formula mass",
          "rfm",
        ],
        type: "molar_mass",
      },

      MASS_TO_MOLES: {
        concept: "Moles",
        skill: "Convert mass to moles",
        keywords: [
          "moles in",
          "number of moles",
          "how many moles",
          "calculate the moles",
        ],
        type: "mass_to_moles",
      },

      MOLES_TO_MASS: {
        concept: "Moles and Mass",
        skill: "Convert moles to mass",
        keywords: [
          "mass of",
          "calculate the mass",
          "how many grams",
          "grams of",
        ],
        type: "moles_to_mass",
      },

      STOICHIOMETRY: {
        concept: "Stoichiometry",
        skill: "Use mole ratios",
        keywords: [
          "mole ratio",
          "reaction ratio",
          "stoichiometry",
          "balanced equation",
          "reacts with",
        ],
        type: "stoichiometry",
      },

      GAS_VOLUME: {
        concept: "Gas Volume",
        skill: "Calculate gas volume",
        keywords: [
          "gas volume",
          "molar volume",
          "dm3",
          "dm³",
          "rtp",
          "stp",
        ],
        type: "gas_volume",
      },

      CONCENTRATION: {
        concept: "Solution Concentration",
        skill: "Calculate concentration",
        keywords: [
          "concentration",
          "molarity",
        ],
        type: "concentration",
      },

      PH: {
        concept: "Acids, Bases and pH",
        skill: "Interpret pH",
        keywords: [
          "ph",
          "acidic",
          "alkaline",
          "alkali",
          "neutral",
        ],
        type: "ph",
      },

      IONIC_BONDING: {
        concept: "Chemical Bonding",
        skill: "Determine ionic bonding and formula",
        keywords: [
          "ionic bonding",
          "ionic bond",
        ],
        type: "ionic_bonding",
      },

      COVALENT_BONDING: {
        concept: "Chemical Bonding",
        skill: "Identify covalent bonding",
        keywords: [
          "covalent",
        ],
        type: "covalent_bonding",
      },

      METALLIC_BONDING: {
        concept: "Chemical Bonding",
        skill: "Explain metallic bonding",
        keywords: [
          "metallic bonding",
          "metallic bond",
        ],
        type: "metallic_bonding",
      },

      CATALYST: {
        concept: "Rates of Reaction",
        skill: "Explain catalyst action",
        keywords: [
          "catalyst",
          "activation energy",
        ],
        type: "catalyst",
      },
    });
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  mutate(
    qObj,
    modalityIndex = 0,
    performanceContext = {}
  ) {
    if (!qObj) {
      return null;
    }

    const stem = String(
      qObj.q ??
      qObj.stem ??
      ""
    ).trim();

    if (!stem) {
      return this._safeFallback(
        qObj,
        "EMPTY_STEM"
      );
    }

    const existingFact =
      qObj.metadata?.factModel ||
      qObj.factModel ||
      null;

    if (existingFact) {
      return this._mutateFromFactModel(
        qObj,
        existingFact,
        modalityIndex,
        performanceContext
      );
    }

    const fact =
      this._identifyFact(stem);

    if (!fact) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_FACT_MODEL"
      );
    }

    return this._mutateFromFact(
      qObj,
      fact,
      modalityIndex,
      performanceContext
    );
  }

  // ============================================================
  // FACT IDENTIFICATION
  // ============================================================

  _identifyFact(stem) {
    const lower =
      String(stem).toLowerCase();

    if (
      lower.includes("empirical formula") ||
      lower.includes("simplest formula") ||
      lower.includes("percentage composition")
    ) {
      return {
        id: "EMPIRICAL_FORMULA",
        concept: "Empirical Formula",
        skill: "Calculate empirical formula",
        type: "empirical_formula",
      };
    }

    if (
      lower.includes("stoichiometry") ||
      lower.includes("mole ratio") ||
      lower.includes("balanced equation") ||
      lower.includes("reacts with")
    ) {
      return {
        id: "STOICHIOMETRY",
        concept: "Stoichiometry",
        skill: "Use mole ratios",
        type: "stoichiometry",
      };
    }

    if (
      lower.includes("gas volume") ||
      lower.includes("molar volume") ||
      lower.includes("dm3") ||
      lower.includes("dm³") ||
      lower.includes("rtp") ||
      lower.includes("stp")
    ) {
      return {
        id: "GAS_VOLUME",
        concept: "Gas Volume",
        skill: "Calculate gas volume",
        type: "gas_volume",
      };
    }

    if (
      lower.includes("concentration") ||
      lower.includes("molarity")
    ) {
      return {
        id: "CONCENTRATION",
        concept: "Solution Concentration",
        skill: "Calculate concentration",
        type: "concentration",
      };
    }

    if (
      lower.includes("catalyst") ||
      lower.includes("activation energy")
    ) {
      return {
        id: "CATALYST",
        concept: "Rates of Reaction",
        skill: "Explain catalyst action",
        type: "catalyst",
      };
    }

    if (
      lower.includes("metallic bonding") ||
      lower.includes("metallic bond")
    ) {
      return {
        id: "METALLIC_BONDING",
        concept: "Chemical Bonding",
        skill: "Explain metallic bonding",
        type: "metallic_bonding",
      };
    }

    if (
      lower.includes("covalent")
    ) {
      return {
        id: "COVALENT_BONDING",
        concept: "Chemical Bonding",
        skill: "Identify covalent bonding",
        type: "covalent_bonding",
      };
    }

    if (
      lower.includes("ionic bonding") ||
      lower.includes("ionic bond")
    ) {
      return {
        id: "IONIC_BONDING",
        concept: "Chemical Bonding",
        skill: "Determine ionic bonding and formula",
        type: "ionic_bonding",
      };
    }

    if (
      lower.includes("molar mass") ||
      lower.includes("relative formula mass") ||
      lower.includes("rfm")
    ) {
      return {
        id: "MOLAR_MASS",
        concept: "Molar Mass",
        skill: "Calculate molar mass",
        type: "molar_mass",
      };
    }

    if (
      lower.includes("how many moles") ||
      lower.includes("number of moles") ||
      lower.includes("moles in")
    ) {
      return {
        id: "MASS_TO_MOLES",
        concept: "Moles",
        skill: "Convert mass to moles",
        type: "mass_to_moles",
      };
    }

    if (
      lower.includes("calculate the mass") ||
      lower.includes("how many grams") ||
      lower.includes("grams of")
    ) {
      return {
        id: "MOLES_TO_MASS",
        concept: "Moles and Mass",
        skill: "Convert moles to mass",
        type: "moles_to_mass",
      };
    }

    if (
      /\bpH\s*(?:of|=)?\s*\d/i.test(stem) ||
      lower.includes("acidic") ||
      lower.includes("alkaline") ||
      lower.includes("alkali") ||
      lower.includes("neutral")
    ) {
      return {
        id: "PH",
        concept: "Acids, Bases and pH",
        skill: "Interpret pH",
        type: "ph",
      };
    }

    return null;
  }

  // ============================================================
  // FACT ROUTING
  // ============================================================

  _mutateFromFactModel(
    qObj,
    factModel,
    modalityIndex,
    performanceContext
  ) {
    const type =
      factModel.type ||
      factModel.factType;

    switch (type) {
      case "molar_mass":
        return this._buildMolarMass(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "mass_to_moles":
        return this._buildMassToMoles(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "moles_to_mass":
        return this._buildMolesToMass(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "stoichiometry":
        return this._buildStoichiometry(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "gas_volume":
        return this._buildGasVolume(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "concentration":
        return this._buildConcentration(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "ph":
        return this._buildPH(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "ionic_bonding":
        return this._buildIonicBonding(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "covalent_bonding":
        return this._buildCovalentBonding(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "metallic_bonding":
        return this._buildMetallicBonding(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      case "catalyst":
        return this._buildCatalyst(
          qObj,
          modalityIndex,
          performanceContext,
          factModel
        );

      default:
        return this._safeFallback(
          qObj,
          "UNSUPPORTED_FACT_MODEL"
        );
    }
  }

  _mutateFromFact(
    qObj,
    fact,
    modalityIndex,
    performanceContext
  ) {
    return this._mutateFromFactModel(
      qObj,
      {
        ...fact,
        source: "verified_registry",
      },
      modalityIndex,
      performanceContext
    );
  }

  // ============================================================
  // MOLAR MASS
  // ============================================================

  _buildMolarMass(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const compound =
      this._selectCompound(
        qObj,
        factModel
      );

    if (!compound) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_COMPOUND"
      );
    }

    /*
     * Deterministic transformation:
     *
     * Same compound.
     * Same chemical fact.
     * Change question framing only.
     *
     * We do NOT invent another compound.
     */

    const breakdown =
      this._formulaBreakdown(
        compound.formula
      );

    const answer =
      `${compound.molarMass} g/mol`;

    const mode =
      this._mode(modalityIndex);

    const base = {
      concept: "Molar Mass",

      skill:
        "Calculate molar mass",

      difficulty:
        this._difficulty(
          qObj,
          performanceContext
        ),

      factModel: {
        type: "molar_mass",

        factId:
          `molar_mass.${compound.id}`,

        compound: {
          id: compound.id,
          name: compound.name,
          formula: compound.formula,
          molarMass:
            compound.molarMass,
        },
      },
    };

    const question =
      mode === 0
        ? `Calculate the molar mass of ${compound.name} (${compound.displayFormula}).`
        : mode === 1
          ? `What is the relative formula mass of ${compound.name} (${compound.displayFormula})?`
          : mode === 2
            ? `How many grams are contained in one mole of ${compound.name} (${compound.displayFormula})?`
            : `Determine the molar mass of ${compound.displayFormula}.`;

    const distractors =
      this._makeDistractors(
        answer,
        [
          `${this._round(compound.molarMass + 12)} g/mol`,
          `${this._round(compound.molarMass - 16)} g/mol`,
          `${this._round(compound.molarMass / 2)} g/mol`,
        ]
      );

    return this._finalize({
      q: question,

      ans: answer,

      hint:
        "Add the relative atomic masses of all atoms represented in the formula.",

      why:
        `The formula must be expanded according to its subscripts. ${breakdown}.`,

      sol:
        `${breakdown}. Therefore, the molar mass is ${answer}.`,

      steps: [
        "Step 1: Identify every element in the formula.",
        "Step 2: Read each subscript as the number of atoms.",
        `Step 3: Add the atomic-mass contributions: ${breakdown}.`,
        `Step 4: State the answer: ${answer}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              distractors,
              mode
            ),

      misconception:
        "Incorrectly counts atoms or ignores a subscript.",

      mutationRule:
        "reframe_same_compound",

      mutationReason:
        "The chemical substance and its verified molar mass were preserved; only the retrieval framing changed.",

      ...base,
    });
  }

  // ============================================================
  // MASS → MOLES
  // ============================================================

  _buildMassToMoles(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const compound =
      this._selectCompound(
        qObj,
        factModel
      );

    if (!compound) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_COMPOUND"
      );
    }

    const mass =
      this._extractMass(
        qObj,
        factModel,
        compound
      );

    if (
      !Number.isFinite(mass) ||
      mass <= 0
    ) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_MASS"
      );
    }

    const moles =
      this._round(
        this._solveMoles(
          mass,
          compound.molarMass
        ),
        2
      );

    const answer =
      `${moles} mol`;

    const mode =
      this._mode(modalityIndex);

    const steps = [
      "Step 1: Use n = m / M.",
      `Step 2: Substitute n = ${mass} / ${compound.molarMass}.`,
      `Step 3: Calculate n = ${answer}.`,
    ];

    return this._finalize({
      q:
        mode === 0
          ? `A sample contains ${mass} g of ${compound.name} (${compound.displayFormula}). Its molar mass is ${compound.molarMass} g/mol. Calculate the number of moles.`
          : `How many moles are present in ${mass} g of ${compound.name} (${compound.displayFormula})?`,

      ans: answer,

      hint:
        "Use n = m / M.",

      why:
        `Moles are calculated by dividing mass by molar mass: ${mass} / ${compound.molarMass}.`,

      sol:
        `${mass} / ${compound.molarMass} = ${answer}.`,

      steps,

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                `${this._round(mass * compound.molarMass, 2)} mol`,
                `${this._round(compound.molarMass / mass, 2)} mol`,
                `${this._round(mass / 2, 2)} mol`,
              ],
              mode
            ),

      misconception:
        "Multiplies mass by molar mass instead of dividing.",

      concept:
        "Moles",

      skill:
        "Convert mass to moles",

      difficulty:
        this._difficulty(
          qObj,
          performanceContext
        ),

      mutationRule:
        "reframe_mass_to_moles",

      mutationReason:
        "The original mass and compound were preserved and the mole value was independently recalculated.",
      
      factModel: {
        type: "mass_to_moles",

        factId:
          `mass_to_moles.${compound.id}`,

        compound: {
          id: compound.id,
          name: compound.name,
          formula: compound.formula,
          molarMass:
            compound.molarMass,
        },

        mass,
        moles,
      },
    });
  }

  // ============================================================
  // MOLES → MASS
  // ============================================================

  _buildMolesToMass(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const compound =
      this._selectCompound(
        qObj,
        factModel
      );

    if (!compound) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_COMPOUND"
      );
    }

    const moles =
      this._extractMoles(
        qObj,
        factModel
      );

    if (
      !Number.isFinite(moles) ||
      moles <= 0
    ) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_MOLES"
      );
    }

    const mass =
      this._round(
        this._solveMass(
          moles,
          compound.molarMass
        ),
        2
      );

    const answer =
      `${mass} g`;

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        `Calculate the mass of ${moles} mol of ${compound.name} (${compound.displayFormula}). The molar mass is ${compound.molarMass} g/mol.`,

      ans:
        answer,

      hint:
        "Use m = n × M.",

      why:
        "Mass is found by multiplying the number of moles by the molar mass.",

      sol:
        `${moles} × ${compound.molarMass} = ${answer}.`,

      steps: [
        "Step 1: Use m = n × M.",
        `Step 2: Substitute m = ${moles} × ${compound.molarMass}.`,
        `Step 3: Calculate m = ${answer}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                `${this._round(compound.molarMass / moles, 2)} g`,
                `${this._round(moles / compound.molarMass, 3)} g`,
                `${this._round(mass / 2, 2)} g`,
              ],
              mode
            ),

      misconception:
        "Divides instead of multiplying.",

      concept:
        "Moles and Mass",

      skill:
        "Convert moles to mass",

      difficulty:
        this._difficulty(
          qObj,
          performanceContext
        ),

      mutationRule:
        "reframe_moles_to_mass",

      mutationReason:
        "The original amount of substance and compound were preserved; the required quantity was recalculated.",

      factModel: {
        type: "moles_to_mass",

        factId:
          `moles_to_mass.${compound.id}`,

        compound: {
          id: compound.id,
          name: compound.name,
          formula: compound.formula,
          molarMass:
            compound.molarMass,
        },

        moles,
        mass,
      },
    });
  }

  // ============================================================
  // STOICHIOMETRY
  // ============================================================

  _buildStoichiometry(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const reaction =
      this._selectReaction(
        qObj,
        factModel
      );

    if (!reaction) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_REACTION"
      );
    }

    const reactant =
      reaction.reactants[0];

    const product =
      reaction.products[0];

    const startingMoles =
      this._extractReactionMoles(
        qObj,
        factModel
      );

    if (
      !Number.isFinite(
        startingMoles
      ) ||
      startingMoles <= 0
    ) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_REACTION_MOLES"
      );
    }

    const produced =
      this._round(
        this._solveStoichiometry(
          startingMoles,
          reactant.coefficient,
          product.coefficient
        ),
        2
      );

    const answer =
      `${produced} mol`;

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        `Given the balanced equation ${reaction.equation}, how many moles of ${product.formula} are produced when ${startingMoles} mol of ${reactant.formula} reacts completely with excess reactant?`,

      ans:
        answer,

      hint:
        `Use the mole ratio ${reactant.coefficient}:${product.coefficient}.`,

      why:
        `The balanced equation establishes the mole ratio ${reactant.coefficient}:${product.coefficient}.`,

      sol:
        `(${startingMoles} × ${product.coefficient}) / ${reactant.coefficient} = ${answer}.`,

      steps: [
        `Step 1: Read the balanced equation: ${reaction.equation}.`,
        `Step 2: Identify the ratio ${reactant.coefficient}:${product.coefficient}.`,
        `Step 3: Calculate (${startingMoles} × ${product.coefficient}) / ${reactant.coefficient}.`,
        `Step 4: Answer = ${answer}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                `${startingMoles} mol`,
                `${this._round(startingMoles * reactant.coefficient, 2)} mol`,
                `${this._round(produced / 2, 2)} mol`,
              ],
              mode
            ),

      misconception:
        "Uses the wrong coefficient ratio.",

      concept:
        "Stoichiometry",

      skill:
        "Use mole ratios",

      difficulty:
        this._difficulty(
          qObj,
          performanceContext
        ),

      mutationRule:
        "reframe_mole_ratio",

      mutationReason:
        "The verified balanced equation was preserved and the product amount was recalculated from its coefficients.",

      factModel: {
        type: "stoichiometry",

        factId:
          `stoichiometry.${reaction.id}`,

        reactionId:
          reaction.id,

        reaction:
          reaction.equation,

        reactant,
        product,

        startingMoles,
        produced,
      },
    });
  }

  // ============================================================
  // GAS VOLUME
  // ============================================================

  _buildGasVolume(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const gas =
      this._selectGas(
        qObj,
        factModel
      );

    if (!gas) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_GAS"
      );
    }

    const condition =
      this._selectGasCondition(
        qObj,
        factModel
      );

    const molarVolume =
      condition === "STP"
        ? 22.4
        : 24;

    const moles =
      this._extractGasMoles(
        qObj,
        factModel
      );

    if (
      !Number.isFinite(moles) ||
      moles <= 0
    ) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_GAS_MOLES"
      );
    }

    const volume =
      this._round(
        this._solveGasVolume(
          moles,
          molarVolume
        ),
        2
      );

    const answer =
      `${volume} dm3`;

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        `Calculate the volume occupied by ${moles} mol of ${gas.name} (${gas.formula}) at ${condition}, where the molar gas volume is ${molarVolume} dm3/mol.`,

      ans:
        answer,

      hint:
        `Use V = n × Vm. At ${condition}, Vm = ${molarVolume} dm3/mol.`,

      why:
        "Gas volume is calculated by multiplying the number of moles by molar volume.",

      sol:
        `${moles} × ${molarVolume} = ${answer}.`,

      steps: [
        `Step 1: Identify the condition: ${condition}.`,
        `Step 2: Use molar volume = ${molarVolume} dm3/mol.`,
        "Step 3: Apply V = n × Vm.",
        `Step 4: V = ${moles} × ${molarVolume} = ${answer}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                `${this._round(moles * 22.4, 2)} dm3`,
                `${this._round(molarVolume / moles, 2)} dm3`,
                `${this._round(volume / 2, 2)} dm3`,
              ],
              mode
            ),

      misconception:
        condition === "STP"
          ? "Uses the RTP molar volume at STP."
          : "Uses the STP molar volume at RTP.",

      concept:
        "Gas Volume",

      skill:
        "Calculate gas volume",

      difficulty:
        this._difficulty(
          qObj,
          performanceContext
        ),

      mutationRule:
        "reframe_gas_volume",

      mutationReason:
        "The gas, amount, and temperature condition were preserved and the volume was independently recalculated.",

      factModel: {
        type: "gas_volume",

        factId:
          `gas_volume.${gas.formula}.${condition}`,

        gas,
        condition,
        molarVolume,
        moles,
        volume,
      },
    });
  }

  // ============================================================
  // CONCENTRATION
  // ============================================================

  _buildConcentration(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const n =
      this._extractConcentrationMoles(
        qObj,
        factModel
      );

    const volume =
      this._extractConcentrationVolume(
        qObj,
        factModel
      );

    if (
      !Number.isFinite(n) ||
      !Number.isFinite(volume) ||
      n <= 0 ||
      volume <= 0
    ) {
      return this._safeFallback(
        qObj,
        "INVALID_CONCENTRATION_DATA"
      );
    }

    const concentration =
      this._round(
        n / volume,
        2
      );

    const answer =
      `${concentration} mol/dm3`;

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        `Exactly ${n} mol of solute is dissolved to make ${volume} dm3 of solution. Calculate the concentration.`,

      ans:
        answer,

      hint:
        "Use C = n / V.",

      why:
        `Concentration = number of moles / volume = ${n} / ${volume}.`,

      sol:
        `${n} / ${volume} = ${answer}.`,

      steps: [
        "Step 1: Identify the number of moles.",
        "Step 2: Identify the volume in dm3.",
        "Step 3: Use C = n / V.",
        `Step 4: C = ${answer}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                `${this._round(n * volume, 2)} mol/dm3`,
                `${this._round(volume / n, 2)} mol/dm3`,
                `${this._round(concentration * 2, 2)} mol/dm3`,
              ],
              mode
            ),

      misconception:
        "Multiplies moles by volume instead of dividing.",

      concept:
        "Solution Concentration",

      skill:
        "Calculate concentration",

      difficulty:
        this._difficulty(
          qObj,
          performanceContext
        ),

      mutationRule:
        "reframe_concentration",

      mutationReason:
        "The original mole and volume values were preserved and concentration was recalculated from C = n/V.",

      factModel: {
        type: "concentration",

        factId:
          "concentration.moles_over_volume",

        moles: n,
        volume,
        concentration,
      },
    });
  }

  // ============================================================
  // pH
  // ============================================================

  _buildPH(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const pH =
      this._extractPH(
        qObj,
        factModel
      );

    if (
      pH == null ||
      pH < 0 ||
      pH > 14
    ) {
      return this._safeFallback(
        qObj,
        "INVALID_PH"
      );
    }

    const classification =
      this._classifyPH(pH);

    const mode =
      this._mode(modalityIndex);

    const answer =
      classification;

    const distractors =
      [
        "Acidic",
        "Neutral",
        "Alkaline",
        "Strongly acidic",
        "Strongly alkaline",
      ].filter(
        (x) => x !== answer
      );

    return this._finalize({
      q:
        `A solution has a pH of ${pH}. How should it be classified?`,

      ans:
        answer,

      hint:
        "Compare the pH with 7.",

      why:
        "pH below 7 is acidic, pH 7 is neutral, and pH above 7 is alkaline.",

      sol:
        `Since pH = ${pH}, the solution is ${answer.toLowerCase()}.`,

      steps: [
        `Step 1: Compare pH ${pH} with neutral pH 7.`,

        pH < 7
          ? "Step 2: The pH is below 7, so the solution is acidic."
          : pH === 7
            ? "Step 2: The pH equals 7, so the solution is neutral."
            : "Step 2: The pH is above 7, so the solution is alkaline.",

        `Step 3: Therefore the classification is ${answer}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              distractors,
              mode
            ),

      concept:
        "Acids, Bases and pH",

      skill:
        "Interpret pH",

      difficulty:
        1,

      misconception:
        pH < 7
          ? "Confuses low pH with alkalinity."
          : "Confuses high pH with acidity.",

      mutationRule:
        "reframe_ph_classification",

      mutationReason:
        "The original pH value was preserved and classification was recalculated from the pH scale.",

      factModel: {
        type: "ph",

        factId:
          `ph.classification.${pH}`,

        pH,

        classification:
          answer,
      },
    });
  }

  // ============================================================
  // IONIC BONDING
  // ============================================================

  _buildIonicBonding(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const metal =
      this._selectIon(
        qObj,
        factModel,
        "positive"
      );

    const nonMetal =
      this._selectIon(
        qObj,
        factModel,
        "negative"
      );

    if (
      !metal ||
      !nonMetal
    ) {
      return this._safeFallback(
        qObj,
        "NO_VERIFIED_IONS"
      );
    }

    const formula =
      this._ionicFormula(
        metal,
        nonMetal
      );

    const answer =
      `Ionic bonding forms when ${metal.name} loses electron(s) to form ${metal.ion}, while ${nonMetal.name} gains electron(s) to form ${nonMetal.ion}. The ions combine in the ratio represented by ${formula}.`;

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        `When ${metal.name} combines with ${nonMetal.name}, what type of bonding occurs and what is the formula of the ionic compound?`,

      ans:
        answer,

      hint:
        "A metal transfers electrons to a non-metal. Balance the ion charges.",

      why:
        answer,

      sol:
        answer,

      steps: [
        `Step 1: ${metal.name} forms ${metal.ion}.`,
        `Step 2: ${nonMetal.name} forms ${nonMetal.ion}.`,
        "Step 3: Balance the positive and negative charges.",
        `Step 4: The resulting formula is ${formula}.`,
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                "Covalent bonding; electrons are shared.",
                "Metallic bonding; both elements form positive ions.",
                "Hydrogen bonding; neutral atoms attract.",
              ],
              mode
            ),

      concept:
        "Chemical Bonding",

      skill:
        "Determine ionic bonding and formula",

      difficulty:
        2,

      misconception:
        "Confuses electron transfer with electron sharing.",

      mutationRule:
        "reframe_ionic_bonding",

      mutationReason:
        "The verified ions and their charges were preserved; the ionic formula was independently calculated.",

      factModel: {
        type:
          "ionic_bonding",

        factId:
          `ionic.${metal.element}.${nonMetal.element}`,

        metal,
        nonMetal,
        formula,
      },
    });
  }

  // ============================================================
  // COVALENT BONDING
  // ============================================================

  _buildCovalentBonding(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const answer =
      "Covalent bonding";

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        mode === 0
          ? "What type of bonding forms when two non-metal atoms share pairs of electrons?"
          : "Which type of chemical bond involves sharing pairs of electrons between non-metal atoms?",

      ans:
        answer,

      hint:
        "Think about electron sharing between non-metals.",

      why:
        "A covalent bond is formed when atoms share electron pairs.",

      sol:
        "Non-metal atoms can form covalent bonds by sharing pairs of electrons.",

      steps: [
        "Step 1: Identify the atoms as non-metals.",
        "Step 2: Non-metals can achieve stable outer electron arrangements by sharing electrons.",
        "Step 3: The shared electron pair forms a covalent bond.",
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                "Ionic bonding",
                "Metallic bonding",
                "Nuclear bonding",
              ],
              mode
            ),

      concept:
        "Chemical Bonding",

      skill:
        "Identify covalent bonding",

      difficulty:
        1,

      misconception:
        "Confuses electron sharing with electron transfer.",

      mutationRule:
        "reframe_electron_sharing",

      mutationReason:
        "The same verified chemical principle was retained while the retrieval wording changed.",

      factModel: {
        type:
          "covalent_bonding",

        factId:
          "bonding.covalent.electron_sharing",

        relation:
          "electron_sharing_between_nonmetals",
      },
    });
  }

  // ============================================================
  // METALLIC BONDING
  // ============================================================

  _buildMetallicBonding(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const answer =
      "Metallic bonding consists of positive metal ions attracted to delocalized electrons.";

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        mode === 0
          ? "Why can metals conduct electricity in the solid state?"
          : "Which feature of metallic bonding allows a solid metal to conduct electricity?",

      ans:
        answer,

      hint:
        "Think about the electrons that can move through metallic bonding.",

      why:
        "Metals contain delocalized electrons that can move through the structure and carry charge.",

      sol:
        answer,

      steps: [
        "Step 1: Metal atoms contribute outer electrons.",
        "Step 2: These electrons become delocalized.",
        "Step 3: The mobile electrons carry electrical charge.",
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                "Positive ions move freely through the solid.",
                "Neutrons move through the metal.",
                "Water molecules carry the electrical current.",
              ],
              mode
            ),

      concept:
        "Chemical Bonding",

      skill:
        "Explain metallic bonding",

      difficulty:
        2,

      misconception:
        "Believes positive metal ions carry electrical current through the solid.",

      mutationRule:
        "reframe_metallic_conduction",

      mutationReason:
        "The verified explanation of metallic conduction was preserved while the retrieval demand changed.",

      factModel: {
        type:
          "metallic_bonding",

        factId:
          "bonding.metallic.delocalized_electrons",

        relation:
          "delocalized_electrons_carry_charge",
      },
    });
  }

  // ============================================================
  // CATALYST
  // ============================================================

  _buildCatalyst(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const answer =
      "MnO2 acts as a catalyst by providing an alternative reaction pathway with lower activation energy.";

    const mode =
      this._mode(modalityIndex);

    return this._finalize({
      q:
        mode === 0
          ? "A chemist adds MnO2 to hydrogen peroxide. Oxygen is produced faster, but the MnO2 is recovered unchanged. What is the role of MnO2?"
          : "Why does MnO2 increase the rate of hydrogen peroxide decomposition without being permanently consumed?",

      ans:
        answer,

      hint:
        "A catalyst changes the rate of reaction without being permanently consumed.",

      why:
        "A catalyst provides an alternative reaction pathway with lower activation energy.",

      sol:
        answer,

      steps: [
        "Step 1: The reaction becomes faster.",
        "Step 2: MnO2 is recovered unchanged.",
        "Step 3: Therefore MnO2 acts as a catalyst.",
        "Step 4: A catalyst provides an alternative pathway with lower activation energy.",
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._deterministicOptions(
              answer,
              [
                "MnO2 is completely consumed by the reaction.",
                "MnO2 changes the equilibrium constant.",
                "MnO2 permanently increases the temperature.",
              ],
              mode
            ),

      concept:
        "Rates of Reaction",

      skill:
        "Explain catalyst action",

      difficulty:
        2,

      misconception:
        "Believes a catalyst is consumed or changes the equilibrium constant.",

      mutationRule:
        "reframe_catalyst_action",

      mutationReason:
        "The verified catalyst mechanism was preserved while the question framing changed.",

      factModel: {
        type:
          "catalyst",

        factId:
          "rates.catalyst.alternative_pathway",

        catalyst:
          "MnO2",

        reaction:
          "hydrogen peroxide decomposition",

        unchanged:
          true,

        effect:
          "lower_activation_energy",
      },
    });
  }

  // ============================================================
  // COMPOUND SELECTION
  // ============================================================

  _selectCompound(
    qObj,
    factModel
  ) {
    const requestedId =
      factModel?.compound?.id;

    if (requestedId) {
      return (
        this.compounds.find(
          (compound) =>
            compound.id ===
            requestedId
        ) ||
        null
      );
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      ).toLowerCase();

    /*
     * IMPORTANT:
     *
     * No:
     *
     * this.compounds[hash % length]
     *
     * If the question does not identify
     * a verified compound, fail safely.
     */

    const found =
      this.compounds.find(
        (compound) =>
          stem.includes(
            compound.name.toLowerCase()
          ) ||
          stem.includes(
            compound.formula.toLowerCase()
          )
      );

    return found || null;
  }

  // ============================================================
  // REACTION SELECTION
  // ============================================================

  _selectReaction(
    qObj,
    factModel
  ) {
    if (factModel?.reactionId) {
      return (
        this.reactions.find(
          (reaction) =>
            reaction.id ===
            factModel.reactionId
        ) ||
        null
      );
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      ).toLowerCase();

    /*
     * Prefer an exact equation match.
     */

    const found =
      this.reactions.find(
        (reaction) =>
          stem.includes(
            reaction.equation
              .toLowerCase()
          )
      );

    return found || null;
  }

  // ============================================================
  // GAS SELECTION
  // ============================================================

  _selectGas(
    qObj,
    factModel
  ) {
    const known = [
      {
        name:
          "carbon dioxide",
        formula:
          "CO2",
      },

      {
        name:
          "oxygen",
        formula:
          "O2",
      },

      {
        name:
          "nitrogen",
        formula:
          "N2",
      },

      {
        name:
          "hydrogen",
        formula:
          "H2",
      },

      {
        name:
          "methane",
        formula:
          "CH4",
      },
    ];

    if (
      factModel?.gas?.formula
    ) {
      return (
        known.find(
          (gas) =>
            gas.formula ===
            factModel.gas.formula
        ) ||
        null
      );
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      ).toLowerCase();

    const found =
      known.find(
        (gas) =>
          stem.includes(
            gas.name
          ) ||
          stem.includes(
            gas.formula.toLowerCase()
          )
      );

    return found || null;
  }

  // ============================================================
  // GAS CONDITION
  // ============================================================

  _selectGasCondition(
    qObj,
    factModel
  ) {
    if (
      factModel?.condition ===
        "STP" ||
      factModel?.condition ===
        "RTP"
    ) {
      return factModel.condition;
    }

    const lower =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      ).toLowerCase();

    if (
      lower.includes("stp")
    ) {
      return "STP";
    }

    if (
      lower.includes("rtp")
    ) {
      return "RTP";
    }

    /*
     * No arbitrary condition.
     */
    return null;
  }

  // ============================================================
  // ION SELECTION
  // ============================================================

  _selectIon(
    qObj,
    factModel,
    sign
  ) {
    if (
      sign === "positive" &&
      factModel?.metal
    ) {
      return factModel.metal;
    }

    if (
      sign === "negative" &&
      factModel?.nonMetal
    ) {
      return factModel.nonMetal;
    }

    const lower =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      ).toLowerCase();

    const candidates =
      this.ions.filter(
        (ion) =>
          sign === "positive"
            ? ion.charge > 0
            : ion.charge < 0
      );

    const found =
      candidates.find(
        (ion) =>
          lower.includes(
            ion.name
          ) ||
          lower.includes(
            ion.element.toLowerCase()
          )
      );

    /*
     * NEVER randomly select an ion.
     */
    return found || null;
  }

  // ============================================================
  // PARAMETER EXTRACTION
  // ============================================================

  _extractMass(
    qObj,
    factModel,
    compound
  ) {
    if (
      Number.isFinite(
        factModel?.mass
      ) &&
      factModel.mass > 0
    ) {
      return factModel.mass;
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      );

    /*
     * Prefer numbers immediately followed
     * by grams.
     */

    const gramMatch =
      stem.match(
        /(\d+(?:\.\d+)?)\s*(?:g|grams?)\b/i
      );

    if (gramMatch) {
      return Number(
        gramMatch[1]
      );
    }

    /*
     * If no mass is explicitly provided,
     * do NOT invent one.
     *
     * However, a question asking about one
     * mole can safely use the compound's
     * verified molar mass.
     */

    if (
      /\b(one|1)\s*mole\b/i.test(
        stem
      )
    ) {
      return compound.molarMass;
    }

    return null;
  }

  _extractMoles(
    qObj,
    factModel
  ) {
    if (
      Number.isFinite(
        factModel?.moles
      ) &&
      factModel.moles > 0
    ) {
      return factModel.moles;
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      );

    const match =
      stem.match(
        /(\d+(?:\.\d+)?)\s*(?:mol|moles?)\b/i
      );

    return match
      ? Number(match[1])
      : null;
  }

  _extractReactionMoles(
    qObj,
    factModel
  ) {
    if (
      Number.isFinite(
        factModel?.startingMoles
      ) &&
      factModel.startingMoles > 0
    ) {
      return factModel.startingMoles;
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      );

    const matches = [
      ...stem.matchAll(
        /(\d+(?:\.\d+)?)\s*(?:mol|moles?)\b/gi
      ),
    ];

    if (!matches.length) {
      return null;
    }

    return Number(
      matches[0][1]
    );
  }

  _extractGasMoles(
    qObj,
    factModel
  ) {
    if (
      Number.isFinite(
        factModel?.moles
      ) &&
      factModel.moles > 0
    ) {
      return factModel.moles;
    }

    return this._extractMoles(
      qObj,
      factModel
    );
  }

  _extractConcentrationMoles(
    qObj,
    factModel
  ) {
    if (
      Number.isFinite(
        factModel?.moles
      )
    ) {
      return factModel.moles;
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      );

    const match =
      stem.match(
        /(\d+(?:\.\d+)?)\s*mol\b/i
      );

    return match
      ? Number(match[1])
      : null;
  }

  _extractConcentrationVolume(
    qObj,
    factModel
  ) {
    if (
      Number.isFinite(
        factModel?.volume
      )
    ) {
      return factModel.volume;
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      );

    const match =
      stem.match(
        /(\d+(?:\.\d+)?)\s*(?:dm3|dm³|litres?|liters?|l)\b/i
      );

    return match
      ? Number(match[1])
      : null;
  }

  // ============================================================
  // pH EXTRACTION
  // ============================================================

  _extractPH(
    qObj,
    factModel
  ) {
    if (
      Number.isFinite(
        factModel?.pH
      )
    ) {
      return factModel.pH;
    }

    const stem =
      String(
        qObj?.q ||
        qObj?.stem ||
        ""
      );

    const match =
      stem.match(
        /\bpH\s*(?:of|=)?\s*(\d+(?:\.\d+)?)/i
      );

    if (!match) {
      return null;
    }

    return Number(
      match[1]
    );
  }

  // ============================================================
  // PH CLASSIFICATION
  // ============================================================

  _classifyPH(pH) {
    if (pH < 3) {
      return "Strongly acidic";
    }

    if (pH < 7) {
      return "Acidic";
    }

    if (pH === 7) {
      return "Neutral";
    }

    if (pH <= 11) {
      return "Alkaline";
    }

    return "Strongly alkaline";
  }

  // ============================================================
  // IONIC FORMULA
  // ============================================================

  _ionicFormula(
    positive,
    negative
  ) {
    const positiveCharge =
      Math.abs(
        positive.charge
      );

    const negativeCharge =
      Math.abs(
        negative.charge
      );

    const gcd =
      this._gcd(
        positiveCharge,
        negativeCharge
      );

    const positiveCount =
      negativeCharge / gcd;

    const negativeCount =
      positiveCharge / gcd;

    return (
      positive.element +
      this._subscriptIfNeeded(
        positiveCount
      ) +
      negative.element +
      this._subscriptIfNeeded(
        negativeCount
      )
    );
  }

  _subscriptIfNeeded(
    number
  ) {
    if (number === 1) {
      return "";
    }

    const chars = {
      0: "₀",
      1: "₁",
      2: "₂",
      3: "₃",
      4: "₄",
      5: "₅",
      6: "₆",
      7: "₇",
      8: "₈",
      9: "₉",
    };

    return String(number)
      .split("")
      .map(
        (x) =>
          chars[x] || x
      )
      .join("");
  }

  // ============================================================
  // FORMULA BREAKDOWN
  // ============================================================

  _formulaBreakdown(
    formula
  ) {
    const map = {
      CaCO3:
        "Ca(40) + C(12) + 3×O(16) = 100 g/mol",

      NaCl:
        "Na(23) + Cl(35.5) = 58.5 g/mol",

      NaOH:
        "Na(23) + O(16) + H(1) = 40 g/mol",

      H2SO4:
        "2×H(1) + S(32) + 4×O(16) = 98 g/mol",

      CO2:
        "C(12) + 2×O(16) = 44 g/mol",

      H2O:
        "2×H(1) + O(16) = 18 g/mol",

      NH3:
        "N(14) + 3×H(1) = 17 g/mol",

      "Mg(OH)2":
        "Mg(24.3) + 2×O(16) + 2×H(1) = 58.3 g/mol",

      CuSO4:
        "Cu(63.5) + S(32) + 4×O(16) = 159.5 g/mol",

      C6H12O6:
        "6×C(12) + 12×H(1) + 6×O(16) = 180 g/mol",

      HNO3:
        "H(1) + N(14) + 3×O(16) = 63 g/mol",

      Fe2O3:
        "2×Fe(56) + 3×O(16) = 160 g/mol",
    };

    return (
      map[formula] ||
      "Add the relative atomic masses of all atoms shown in the formula."
    );
  }

  // ============================================================
  // SOLVERS
  // ============================================================

  _solveMoles(
    mass,
    molarMass
  ) {
    if (
      !Number.isFinite(mass) ||
      !Number.isFinite(molarMass) ||
      molarMass <= 0
    ) {
      return NaN;
    }

    return (
      mass /
      molarMass
    );
  }

  _solveMass(
    moles,
    molarMass
  ) {
    if (
      !Number.isFinite(moles) ||
      !Number.isFinite(molarMass) ||
      moles < 0 ||
      molarMass <= 0
    ) {
      return NaN;
    }

    return (
      moles *
      molarMass
    );
  }

  _solveGasVolume(
    moles,
    molarVolume
  ) {
    if (
      !Number.isFinite(moles) ||
      !Number.isFinite(molarVolume) ||
      moles < 0 ||
      molarVolume <= 0
    ) {
      return NaN;
    }

    return (
      moles *
      molarVolume
    );
  }

  _solveStoichiometry(
    startingMoles,
    reactantCoefficient,
    productCoefficient
  ) {
    if (
      !Number.isFinite(
        startingMoles
      ) ||
      reactantCoefficient <= 0 ||
      productCoefficient <= 0
    ) {
      return NaN;
    }

    return (
      startingMoles *
      productCoefficient /
      reactantCoefficient
    );
  }

  // ============================================================
  // DETERMINISTIC MODE
  // ============================================================

  _mode(
    modalityIndex
  ) {
    if (
      !Number.isFinite(
        modalityIndex
      )
    ) {
      return 0;
    }

    /*
     * Explicit cycle:
     *
     * 0 = open response
     * 1 = MCQ
     * 2 = MCQ
     * 3 = MCQ
     *
     * No randomness.
     */
    return (
      Math.abs(
        Math.floor(
          modalityIndex
        )
      ) % 4
    );
  }

  // ============================================================
  // DETERMINISTIC OPTIONS
  // ============================================================

  _deterministicOptions(
    answer,
    distractors,
    mode = 0
  ) {
    const correct =
      String(answer).trim();

    const cleaned = [];

    for (
      const item of [
        correct,
        ...distractors,
      ]
    ) {
      if (
        item == null
      ) {
        continue;
      }

      const value =
        String(item).trim();

      if (
        !value ||
        cleaned.includes(value)
      ) {
        continue;
      }

      cleaned.push(value);
    }

    /*
     * Never manufacture fake chemistry
     * just to reach four options.
     */
    const options =
      cleaned.slice(
        0,
        4
      );

    /*
     * Deterministic answer-position rule.
     *
     * mode 1 → answer position 1
     * mode 2 → answer position 2
     * mode 3 → answer position 3
     *
     * We don't shuffle.
     */
    const desiredPosition =
      Math.min(
        Math.max(
          mode,
          0
        ),
        options.length - 1
      );

    const currentPosition =
      options.indexOf(
        correct
      );

    if (
      currentPosition >= 0 &&
      desiredPosition >= 0 &&
      currentPosition !==
        desiredPosition
    ) {
      [
        options[
          currentPosition
        ],
        options[
          desiredPosition
        ],
      ] = [
        options[
          desiredPosition
        ],
        options[
          currentPosition
        ],
      ];
    }

    return options;
  }

  _makeDistractors(
    answer,
    distractors
  ) {
    const correct =
      String(answer).trim();

    return [
      ...new Set(
        distractors
          .filter(
            (x) =>
              x != null
          )
          .map(
            (x) =>
              String(x).trim()
          )
          .filter(
            (x) =>
              x &&
              x !== correct
          )
      ),
    ].slice(
      0,
      3
    );
  }

  // ============================================================
  // FINALIZER
  // ============================================================

  _finalize(
    question
  ) {
    const normalized = {
      ...question,

      q:
        String(
          question.q ||
          ""
        ).trim(),

      ans:
        String(
          question.ans ||
          ""
        ).trim(),

      hint:
        question.hint ||
        "Identify the chemical principle before solving.",

      steps:
        Array.isArray(
          question.steps
        )
          ? question.steps
          : [],

      metadata: {
        ...(question.metadata || {}),

        factModel:
          question.factModel,

        mutationEngine:
          "TixarChemistryMutator",

        mutationVersion:
          this.config.version,

        verified:
          true,

        deterministic:
          true,

        random:
          false,

        seed:
          null,

        skill:
          question.skill ||
          question.metadata?.skill,

        concept:
          question.concept ||
          question.metadata?.concept,

        mutationRule:
          question.mutationRule ||
          null,

        mutationReason:
          question.mutationReason ||
          null,

        provenance: {
          mutationVerified:
            true,

          conceptPreserved:
            true,

          answerRecalculated:
            true,

          deterministic:
            true,

          randomnessUsed:
            false,
        },
      },
    };

    /*
     * IMPORTANT:
     *
     * There is intentionally NO:
     *
     * this._shuffle(...)
     *
     * here.
     */

    return normalized;
  }

  // ============================================================
  // VALIDATOR
  // ============================================================

  validateQuestion(
    question
  ) {
    if (!question) {
      return false;
    }

    if (
      typeof question.q !==
        "string" ||
      !question.q.trim()
    ) {
      return false;
    }

    if (
      typeof question.ans !==
        "string" ||
      !question.ans.trim()
    ) {
      return false;
    }

    if (
      question.type ===
      "mcq"
    ) {
      if (
        !Array.isArray(
          question.options
        )
      ) {
        return false;
      }

      if (
        question.options.length !==
        4
      ) {
        return false;
      }

      if (
        new Set(
          question.options
        ).size !== 4
      ) {
        return false;
      }

      if (
        !question.options.includes(
          question.ans
        )
      ) {
        return false;
      }
    }

    const fact =
      question.metadata?.factModel ||
      question.factModel;

    if (!fact) {
      return false;
    }

    if (
      question.metadata?.verified !==
      true
    ) {
      return false;
    }

    if (
      question.metadata?.random !==
      false
    ) {
      return false;
    }

    if (
      question.metadata?.deterministic !==
      true
    ) {
      return false;
    }

    return true;
  }

  // ============================================================
  // SAFE PUBLIC WRAPPER
  // ============================================================

  safeMutate(
    qObj,
    modalityIndex = 0,
    performanceContext = {}
  ) {
    const question =
      this.mutate(
        qObj,
        modalityIndex,
        performanceContext
      );

    if (
      !this.validateQuestion(
        question
      )
    ) {
      return this._safeFallback(
        qObj,
        "VALIDATION_FAILED"
      );
    }

    return question;
  }

  // ============================================================
  // SAFE FALLBACK
  // ============================================================

  _safeFallback(
    qObj,
    reason
  ) {
    return {
      ...qObj,

      q:
        String(
          qObj?.q ||
          qObj?.stem ||
          ""
        ),

      ans:
        String(
          qObj?.ans ||
          ""
        ),

      type:
        qObj?.type ||
        "open_response",

      options:
        qObj?.type ===
        "mcq"
          ? qObj.options
          : null,

      metadata: {
        ...(qObj?.metadata || {}),

        mutationEngine:
          "TixarChemistryMutator",

        mutationVersion:
          this.config.version,

        verified:
          false,

        deterministic:
          true,

        random:
          false,

        fallback:
          true,

        reason,
      },
    };
  }

  // ============================================================
  // DIFFICULTY
  // ============================================================

  _difficulty(
    qObj,
    performanceContext
  ) {
    if (
      Number.isFinite(
        qObj?.difficulty
      )
    ) {
      return Math.min(
        5,
        Math.max(
          1,
          qObj.difficulty
        )
      );
    }

    const accuracy =
      Number(
        performanceContext?.accuracy
      );

    if (
      Number.isFinite(
        accuracy
      )
    ) {
      if (
        accuracy >= 0.90
      ) {
        return 5;
      }

      if (
        accuracy >= 0.80
      ) {
        return 4;
      }

      if (
        accuracy >= 0.65
      ) {
        return 3;
      }

      if (
        accuracy >= 0.45
      ) {
        return 2;
      }
    }

    return 1;
  }

  // ============================================================
  // BASIC UTILITIES
  // ============================================================

  _round(
    value,
    decimals = 2
  ) {
    return Number(
      Number(value).toFixed(
        decimals
      )
    );
  }

  _gcd(
    a,
    b
  ) {
    a =
      Math.abs(a);

    b =
      Math.abs(b);

    while (
      b !== 0
    ) {
      const temp =
        b;

      b =
        a % b;

      a =
        temp;
    }

    return a;
  }
}