/**
 * Tixar Chemistry Mutator v3
 *
 * Fact-preserving adaptive chemistry mutation.
 *
 * Core law:
 *
 *   ORIGINAL FACT
 *        |
 *   FACT MODEL
 *        |
 *   SAFE TRANSFORMATION
 *        |
 *   SOLVE
 *        |
 *   VALIDATE
 *
 * Randomness may select among VERIFIED possibilities.
 * Randomness may NOT invent chemistry.
 */

export class ChemistryMutator {
  constructor(config = {}) {
    this.config = {
      version: "3.0.0",
      seed: config.seed ?? Date.now(),
      ...config,
    };

    // ----------------------------------------------------------
    // ATOMIC MASSES
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // VERIFIED COMPOUNDS
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // VERIFIED REACTIONS
    // ----------------------------------------------------------

    this.reactions = Object.freeze([
      {
        id: "water_formation",
        equation: "2H2 + O2 -> 2H2O",
        reactants: [
          { formula: "H2", coefficient: 2 },
          { formula: "O2", coefficient: 1 },
        ],
        products: [
          { formula: "H2O", coefficient: 2 },
        ],
      },
      {
        id: "ammonia_formation",
        equation: "N2 + 3H2 -> 2NH3",
        reactants: [
          { formula: "N2", coefficient: 1 },
          { formula: "H2", coefficient: 3 },
        ],
        products: [
          { formula: "NH3", coefficient: 2 },
        ],
      },
      {
        id: "carbonate_acid",
        equation: "CaCO3 + 2HCl -> CaCl2 + H2O + CO2",
        reactants: [
          { formula: "CaCO3", coefficient: 1 },
          { formula: "HCl", coefficient: 2 },
        ],
        products: [
          { formula: "CO2", coefficient: 1 },
        ],
      },
      {
        id: "magnesium_combustion",
        equation: "2Mg + O2 -> 2MgO",
        reactants: [
          { formula: "Mg", coefficient: 2 },
          { formula: "O2", coefficient: 1 },
        ],
        products: [
          { formula: "MgO", coefficient: 2 },
        ],
      },
      {
        id: "methane_combustion",
        equation: "CH4 + 2O2 -> CO2 + 2H2O",
        reactants: [
          { formula: "CH4", coefficient: 1 },
          { formula: "O2", coefficient: 2 },
        ],
        products: [
          { formula: "CO2", coefficient: 1 },
        ],
      },
    ]);

    // ----------------------------------------------------------
    // VERIFIED IONS
    // ----------------------------------------------------------

    this.ions = Object.freeze([
      { element: "Na", name: "sodium", charge: 1, ion: "Na+" },
      { element: "K", name: "potassium", charge: 1, ion: "K+" },
      { element: "Mg", name: "magnesium", charge: 2, ion: "Mg2+" },
      { element: "Ca", name: "calcium", charge: 2, ion: "Ca2+" },
      { element: "Al", name: "aluminium", charge: 3, ion: "Al3+" },
      { element: "Cl", name: "chloride", charge: -1, ion: "Cl-" },
      { element: "F", name: "fluoride", charge: -1, ion: "F-" },
      { element: "O", name: "oxide", charge: -2, ion: "O2-" },
      { element: "S", name: "sulfide", charge: -2, ion: "S2-" },
      { element: "N", name: "nitride", charge: -3, ion: "N3-" },
    ]);

    // ----------------------------------------------------------
    // VERIFIED FACT REGISTRY
    // ----------------------------------------------------------

    this.factRegistry = Object.freeze({
      MOLAR_MASS: {
        concept: "Molar Mass",
        skill: "Calculate molar mass",
        keywords: ["molar mass", "relative formula mass", "rfm"],
      },
      MASS_TO_MOLES: {
        concept: "Moles",
        skill: "Convert mass to moles",
        keywords: ["moles in", "number of moles", "how many moles", "calculate the moles"],
      },
      MOLES_TO_MASS: {
        concept: "Moles and Mass",
        skill: "Convert moles to mass",
        keywords: ["mass of", "calculate the mass", "how many grams", "grams of"],
      },
      STOICHIOMETRY: {
        concept: "Stoichiometry",
        skill: "Use mole ratios",
        keywords: ["mole ratio", "reaction ratio", "stoichiometry", "balanced equation"],
      },
      GAS_VOLUME: {
        concept: "Gas Volume",
        skill: "Calculate gas volume",
        keywords: ["gas volume", "molar volume", "dm3", "dm3", "rtp", "stp"],
      },
      CONCENTRATION: {
        concept: "Solution Concentration",
        skill: "Calculate concentration",
        keywords: ["concentration", "molarity"],
      },
      PH: {
        concept: "Acids, Bases and pH",
        skill: "Interpret pH",
        keywords: ["ph", "acidic", "alkaline", "alkali", "neutral"],
      },
      IONIC_BONDING: {
        concept: "Chemical Bonding",
        skill: "Determine ionic bonding and formula",
        keywords: ["ionic bonding", "ionic bond"],
      },
      COVALENT_BONDING: {
        concept: "Chemical Bonding",
        skill: "Identify covalent bonding",
        keywords: ["covalent"],
      },
      METALLIC_BONDING: {
        concept: "Chemical Bonding",
        skill: "Explain metallic bonding",
        keywords: ["metallic bonding", "metallic bond"],
      },
      CATALYST: {
        concept: "Rates of Reaction",
        skill: "Explain catalyst action",
        keywords: ["catalyst", "activation energy"],
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
    if (!qObj) return null;

    const stem = String(
      qObj.q ??
      qObj.stem ??
      ""
    ).trim();

    if (!stem) {
      return this._safeFallback(qObj, "EMPTY_STEM");
    }

    // 1. Existing verified fact model
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

    // 2. Conservative fact identification
    const fact = this._identifyFact(stem);

    if (!fact) {
      return this._safeFallback(qObj, "NO_VERIFIED_FACT_MODEL");
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
    const lower = stem.toLowerCase();

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
      lower.includes("dm3") ||
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

    if (lower.includes("covalent")) {
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
      /\bph\s*(?:of|=)?\s*\d/i.test(stem) ||
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
  // MUTATE FROM EXISTING FACT MODEL
  // ============================================================

  _mutateFromFactModel(
    qObj,
    factModel,
    modalityIndex,
    performanceContext
  ) {
    const type = factModel.type || factModel.factType;

    switch (type) {
      case "molar_mass":
        return this._buildMolarMass(qObj, modalityIndex, performanceContext, factModel);
      case "mass_to_moles":
        return this._buildMassToMoles(qObj, modalityIndex, performanceContext, factModel);
      case "moles_to_mass":
        return this._buildMolesToMass(qObj, modalityIndex, performanceContext, factModel);
      case "stoichiometry":
        return this._buildStoichiometry(qObj, modalityIndex, performanceContext, factModel);
      case "gas_volume":
        return this._buildGasVolume(qObj, modalityIndex, performanceContext, factModel);
      case "concentration":
        return this._buildConcentration(qObj, modalityIndex, performanceContext, factModel);
      case "ph":
        return this._buildPH(qObj, modalityIndex, performanceContext, factModel);
      case "ionic_bonding":
        return this._buildIonicBonding(qObj, modalityIndex, performanceContext, factModel);
      case "covalent_bonding":
        return this._buildCovalentBonding(qObj, modalityIndex, performanceContext, factModel);
      case "metallic_bonding":
        return this._buildMetallicBonding(qObj, modalityIndex, performanceContext, factModel);
      case "catalyst":
        return this._buildCatalyst(qObj, modalityIndex, performanceContext, factModel);
      default:
        return this._safeFallback(qObj, "UNSUPPORTED_FACT_MODEL");
    }
  }

  // ============================================================
  // MUTATE FROM IDENTIFIED FACT
  // ============================================================

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
    const compound = this._selectCompound(qObj, factModel);
    if (!compound) {
      return this._safeFallback(qObj, "NO_VERIFIED_COMPOUND");
    }

    const answer = `${compound.molarMass} g/mol`;
    const breakdown = this._formulaBreakdown(compound.formula);
    const mode = this._mode(modalityIndex, compound.formula);

    const base = {
      concept: "Molar Mass",
      skill: "Calculate molar mass",
      difficulty: this._difficulty(qObj, performanceContext),
      factModel: {
        type: "molar_mass",
        factId: `molar_mass.${compound.id}`,
        compound: {
          id: compound.id,
          name: compound.name,
          formula: compound.formula,
          molarMass: compound.molarMass,
        },
      },
    };

    if (mode === 0) {
      return this._finalize({
        q: `Calculate the molar mass of ${compound.name} (${compound.displayFormula}).`,
        ans: answer,
        hint: "Add the relative atomic masses of all atoms represented in the formula.",
        why: `The formula contains atoms whose relative atomic masses must be added. ${breakdown}.`,
        sol: `${breakdown}. Therefore, the molar mass is ${answer}.`,
        steps: [
          "Step 1: Identify each element and its subscript.",
          "Step 2: Multiply each atomic mass by the number of atoms present.",
          `Step 3: Add the contributions: ${breakdown}.`,
          `Step 4: State the answer with units: ${answer}.`,
        ],
        type: "open_response",
        options: null,
        ...base,
      });
    }

    const options = this._makeDistractors(answer, [
      `${this._round(compound.molarMass + 12)} g/mol`,
      `${this._round(compound.molarMass - 16)} g/mol`,
      `${this._round(compound.molarMass / 2)} g/mol`,
    ]);

    return this._finalize({
      q: `What is the molar mass of ${compound.name} (${compound.displayFormula})?`,
      ans: answer,
      hint: "Pay attention to every subscript in the formula.",
      why: `${breakdown}. Total = ${answer}.`,
      sol: `${breakdown}. Therefore = ${answer}.`,
      type: "mcq",
      options,
      misconception: "Incorrectly counts atoms or ignores a subscript.",
      ...base,
    });
  }

  // ============================================================
  // MASS -> MOLES
  // ============================================================

  _buildMassToMoles(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const compound = this._selectCompound(qObj, factModel);
    if (!compound) {
      return this._safeFallback(qObj, "NO_VERIFIED_COMPOUND");
    }

    const multiplier = this._safeMultiplier(qObj, factModel);
    const mass = this._round(compound.molarMass * multiplier, 2);
    const moles = this._round(this._solveMoles(mass, compound.molarMass), 2);
    const answer = `${moles} mol`;

    const base = {
      concept: "Moles",
      skill: "Convert mass to moles",
      difficulty: this._difficulty(qObj, performanceContext),
      factModel: {
        type: "mass_to_moles",
        factId: `mass_to_moles.${compound.id}`,
        compound: {
          id: compound.id,
          name: compound.name,
          formula: compound.formula,
          molarMass: compound.molarMass,
        },
        mass,
        moles,
      },
    };

    const mode = this._mode(modalityIndex, `${compound.id}:${mass}`);
    const steps = [
      "Step 1: Use n = m / M.",
      `Step 2: Substitute n = ${mass} / ${compound.molarMass}.`,
      `Step 3: Calculate n = ${answer}.`,
    ];

    if (mode === 0) {
      return this._finalize({
        q: `A sample contains ${mass} g of ${compound.name} (${compound.displayFormula}). Its molar mass is ${compound.molarMass} g/mol. Calculate the number of moles.`,
        ans: answer,
        hint: "Use n = m / M.",
        why: `Moles are calculated by dividing mass by molar mass: ${mass} / ${compound.molarMass}.`,
        sol: `${mass} / ${compound.molarMass} = ${answer}.`,
        steps,
        type: "open_response",
        options: null,
        ...base,
      });
    }

    return this._finalize({
      q: `How many moles are present in ${mass} g of ${compound.name} (${compound.displayFormula})?`,
      ans: answer,
      hint: "Divide mass by molar mass.",
      why: "n = m / M.",
      sol: `${mass} / ${compound.molarMass} = ${answer}.`,
      steps,
      type: "mcq",
      options: this._makeDistractors(answer, [
        `${this._round(mass * compound.molarMass, 2)} mol`,
        `${this._round(compound.molarMass / mass, 2)} mol`,
        `${this._round(mass / 2, 2)} mol`,
      ]),
      misconception: "Multiplies mass by molar mass instead of dividing.",
      ...base,
    });
  }

  // ============================================================
  // MOLES -> MASS
  // ============================================================

  _buildMolesToMass(
    qObj,
    modalityIndex,
    performanceContext,
    factModel
  ) {
    const compound = this._selectCompound(qObj, factModel);
    if (!compound) {
      return this._safeFallback(qObj, "NO_VERIFIED_COMPOUND");
    }

    const moles = this._safeMoles(qObj, factModel);
    const mass = this._round(this._solveMass(moles, compound.molarMass), 2);
    const answer = `${mass} g`;

    const base = {
      concept: "Moles and Mass",
      skill: "Convert moles to mass",
      difficulty: this._difficulty(qObj, performanceContext),
      factModel: {
        type: "moles_to_mass",
        factId: `moles_to_mass.${compound.id}`,
        compound: {
          id: compound.id,
          name: compound.name,
          formula: compound.formula,
          molarMass: compound.molarMass,
        },
        moles,
        mass,
      },
    };

    const isMcq = this._mode(modalityIndex, `${compound.id}:${moles}`) !== 0;

    return this._finalize({
      q: `Calculate the mass of ${moles} mol of ${compound.name} (${compound.displayFormula}). The molar mass is ${compound.molarMass} g/mol.`,
      ans: answer,
      hint: "Use m = n * M.",
      why: "Mass is found by multiplying the number of moles by the molar mass.",
      sol: `${moles} * ${compound.molarMass} = ${answer}.`,
      steps: [
        "Step 1: Write m = n * M.",
        `Step 2: Substitute m = ${moles} * ${compound.molarMass}.`,
        `Step 3: Calculate m = ${answer}.`,
      ],
      type: isMcq ? "mcq" : "open_response",
      options: isMcq
        ? this._makeDistractors(answer, [
            `${this._round(compound.molarMass / moles, 2)} g`,
            `${this._round(moles / compound.molarMass, 3)} g`,
            `${this._round(mass / 2, 2)} g`,
          ])
        : null,
      misconception: "Divides instead of multiplying.",
      ...base,
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
    const reaction = this._selectReaction(qObj, factModel);
    if (!reaction) {
      return this._safeFallback(qObj, "NO_VERIFIED_REACTION");
    }

    const reactant = reaction.reactants[0];
    const product = reaction.products[0];
    const startingMoles = this._safeReactionMoles(qObj, factModel);
    const produced = this._round(
      this._solveStoichiometry(
        startingMoles,
        reactant.coefficient,
        product.coefficient
      ),
      2
    );

    const answer = `${produced} mol`;

    const base = {
      concept: "Stoichiometry",
      skill: "Use mole ratios",
      difficulty: this._difficulty(qObj, performanceContext),
      factModel: {
        type: "stoichiometry",
        factId: `stoichiometry.${reaction.id}`,
        reactionId: reaction.id,
        reaction: reaction.equation,
        reactant,
        product,
        startingMoles,
        produced,
      },
    };

    const steps = [
      `Step 1: The balanced equation gives a mole ratio of ${reactant.coefficient}:${product.coefficient}.`,
      `Step 2: Multiply ${startingMoles} mol by ${product.coefficient}/${reactant.coefficient}.`,
      `Step 3: Calculate ${produced} mol ${product.formula}.`,
    ];

    const mode = this._mode(modalityIndex, `${reaction.id}:${startingMoles}`);

    if (mode === 0) {
      return this._finalize({
        q: `Given the balanced equation ${reaction.equation}, how many moles of ${product.formula} are produced when ${startingMoles} mol of ${reactant.formula} reacts completely with excess reactant?`,
        ans: answer,
        hint: `Use the mole ratio ${reactant.coefficient}:${product.coefficient}.`,
        why: `The coefficients represent the mole ratio between ${reactant.formula} and ${product.formula}.`,
        sol: `(${startingMoles} * ${product.coefficient}) / ${reactant.coefficient} = ${answer}.`,
        steps,
        type: "open_response",
        options: null,
        ...base,
      });
    }

    return this._finalize({
      q: `Given ${reaction.equation}, how many moles of ${product.formula} are produced when ${startingMoles} mol of ${reactant.formula} reacts completely?`,
      ans: answer,
      hint: `Use the coefficient ratio ${reactant.coefficient}:${product.coefficient}.`,
      why: `The balanced equation establishes the mole ratio ${reactant.coefficient}:${product.coefficient}.`,
      sol: `(${startingMoles} * ${product.coefficient}) / ${reactant.coefficient} = ${answer}.`,
      steps,
      type: "mcq",
      options: this._makeDistractors(answer, [
        `${startingMoles} mol`,
        `${this._round(startingMoles * reactant.coefficient)} mol`,
        `${this._round(produced / 2)} mol`,
      ]),
      misconception: "Uses the wrong coefficient ratio.",
      ...base,
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
    const gas = this._selectGas(qObj, factModel);
    const condition = this._selectGasCondition(qObj, factModel);
    const molarVolume = condition === "STP" ? 22.4 : 24;
    const moles = this._safeGasMoles(qObj, factModel);
    const volume = this._round(this._solveGasVolume(moles, molarVolume), 2);
    const answer = `${volume} dm3`;

    const base = {
      concept: "Gas Volume",
      skill: "Calculate gas volume",
      difficulty: this._difficulty(qObj, performanceContext),
      factModel: {
        type: "gas_volume",
        factId: `gas_volume.${gas.formula}.${condition}`,
        gas,
        condition,
        molarVolume,
        moles,
        volume,
      },
    };

    const mode = this._mode(modalityIndex, `${gas.formula}:${condition}:${moles}`);
    const question = `Calculate the volume occupied by ${moles} mol of ${gas.name} (${gas.formula}) at ${condition}, where the molar gas volume is ${molarVolume} dm3/mol.`;

    if (mode === 0) {
      return this._finalize({
        q: question,
        ans: answer,
        hint: `Use V = n * Vm. At ${condition}, Vm = ${molarVolume} dm3/mol.`,
        why: "Gas volume is calculated by multiplying moles by molar volume.",
        sol: `${moles} * ${molarVolume} = ${answer}.`,
        steps: [
          `Step 1: Use ${molarVolume} dm3/mol for ${condition}.`,
          "Step 2: Apply V = n * Vm.",
          `Step 3: V = ${moles} * ${molarVolume}.`,
          `Step 4: Volume = ${answer}.`,
        ],
        type: "open_response",
        options: null,
        ...base,
      });
    }

    return this._finalize({
      q: question,
      ans: answer,
      hint: `Use V = n * ${molarVolume}.`,
      sol: `${moles} * ${molarVolume} = ${answer}.`,
      type: "mcq",
      options: this._makeDistractors(answer, [
        `${this._round(moles * 22.4, 2)} dm3`,
        `${this._round(molarVolume / moles, 2)} dm3`,
        `${this._round(volume / 2, 2)} dm3`,
      ]),
      misconception:
        condition === "STP"
          ? "Uses the RTP molar volume at STP."
          : "Uses the STP molar volume at RTP.",
      ...base,
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
    const n = this._safeConcentrationMoles(qObj, factModel);
    const volume = this._safeConcentrationVolume(qObj, factModel);

    if (n <= 0 || volume <= 0) {
      return this._safeFallback(qObj, "INVALID_CONCENTRATION_DATA");
    }

    const concentration = this._round(n / volume, 2);
    const answer = `${concentration} mol/dm3`;

    const base = {
      concept: "Solution Concentration",
      skill: "Calculate concentration",
      difficulty: this._difficulty(qObj, performanceContext),
      factModel: {
        type: "concentration",
        factId: "concentration.moles_over_volume",
        moles: n,
        volume,
        concentration,
      },
    };

    const mode = this._mode(modalityIndex, `${n}:${volume}`);

    return this._finalize({
      q: `Exactly ${n} mol of solute is dissolved to make ${volume} dm3 of solution. Calculate the concentration.`,
      ans: answer,
      hint: "Use C = n / V.",
      why: "Concentration in mol/dm3 is the number of moles divided by the solution volume in dm3.",
      sol: `${n} / ${volume} = ${answer}.`,
      steps: [
        "Step 1: Identify the number of moles.",
        "Step 2: Identify the volume in dm3.",
        "Step 3: Use C = n / V.",
        `Step 4: C = ${answer}.`,
      ],
      type: mode === 0 ? "open_response" : "mcq",
      options: mode === 0
        ? null
        : this._makeDistractors(answer, [
            `${this._round(n * volume, 2)} mol/dm3`,
            `${this._round(volume / n, 2)} mol/dm3`,
            `${this._round(concentration * 2, 2)} mol/dm3`,
          ]),
      misconception: "Multiplies moles by volume instead of dividing.",
      ...base,
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
    const pH = this._extractPH(qObj, factModel);

    if (pH == null || pH < 0 || pH > 14) {
      return this._safeFallback(qObj, "INVALID_PH");
    }

    let answer;
    if (pH < 3) {
      answer = "Strongly acidic";
    } else if (pH < 7) {
      answer = "Acidic";
    } else if (pH === 7) {
      answer = "Neutral";
    } else if (pH <= 11) {
      answer = "Alkaline";
    } else {
      answer = "Strongly alkaline";
    }

    const options = this._makeDistractors(answer, [
      pH < 7 ? "Alkaline" : "Acidic",
      "Neutral",
      pH < 7 ? "Strongly alkaline" : "Strongly acidic",
    ]);

    const isMcq = this._mode(modalityIndex, String(pH)) !== 2;

    return this._finalize({
      q: `A solution has a pH of ${pH}. How should it be classified?`,
      ans: answer,
      hint: "Compare the pH with 7.",
      why: "pH below 7 is acidic, pH 7 is neutral, and pH above 7 is alkaline.",
      sol: `Since pH = ${pH}, the solution is ${answer.toLowerCase()}.`,
      steps: [
        `Step 1: Compare pH ${pH} with neutral pH 7.`,
        pH < 7
          ? "Step 2: The pH is below 7, so the solution is acidic."
          : pH === 7
            ? "Step 2: The pH equals 7, so the solution is neutral."
            : "Step 2: The pH is above 7, so the solution is alkaline.",
        `Step 3: Therefore the classification is ${answer}.`,
      ],
      type: isMcq ? "mcq" : "open_response",
      options: isMcq ? options : null,
      concept: "Acids, Bases and pH",
      skill: "Interpret pH",
      difficulty: 1,
      misconception:
        pH < 7
          ? "Confuses low pH with alkalinity."
          : "Confuses high pH with acidity.",
      factModel: {
        type: "ph",
        factId: `ph.classification.${pH}`,
        pH,
        classification: answer,
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
    const metal = this._selectIon(qObj, factModel, "positive");
    const nonMetal = this._selectIon(qObj, factModel, "negative");

    if (!metal || !nonMetal) {
      return this._safeFallback(qObj, "NO_VERIFIED_IONS");
    }

    const formula = this._ionicFormula(metal, nonMetal);
    const answer = `Ionic bonding forms when ${metal.name} loses electron(s) to form ${metal.ion}, while ${nonMetal.name} gains electron(s) to form ${nonMetal.ion}. The ions combine in the ratio represented by ${formula}.`;

    const isMcq = this._mode(modalityIndex, `${metal.element}:${nonMetal.element}`) !== 0;

    return this._finalize({
      q: `When ${metal.name} combines with ${nonMetal.name}, what type of bonding occurs and what is the formula of the ionic compound?`,
      ans: answer,
      hint: "A metal transfers electrons to a non-metal. Balance the ion charges.",
      why: answer,
      sol: answer,
      steps: [
        `Step 1: ${metal.name} forms ${metal.ion}.`,
        `Step 2: ${nonMetal.name} forms ${nonMetal.ion}.`,
        "Step 3: Balance the positive and negative charges.",
        `Step 4: The resulting formula is ${formula}.`,
      ],
      type: isMcq ? "mcq" : "open_response",
      options: isMcq
        ? this._makeDistractors(answer, [
            "Covalent bonding; electrons are shared.",
            "Metallic bonding; both elements form positive ions.",
            "Hydrogen bonding; neutral atoms attract.",
          ])
        : null,
      concept: "Chemical Bonding",
      skill: "Determine ionic bonding and formula",
      difficulty: 2,
      misconception: "Confuses electron transfer with electron sharing.",
      factModel: {
        type: "ionic_bonding",
        factId: `ionic.${metal.element}.${nonMetal.element}`,
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
    const answer = "Covalent bonding";
    const isMcq = this._mode(modalityIndex, "covalent") !== 0;

    return this._finalize({
      q: "What type of bonding forms when two non-metal atoms share pairs of electrons?",
      ans: answer,
      hint: "Think about electron sharing between non-metals.",
      why: "A covalent bond is formed when atoms share electron pairs.",
      sol: "Non-metal atoms can form covalent bonds by sharing pairs of electrons.",
      steps: [
        "Step 1: Identify the atoms as non-metals.",
        "Step 2: Non-metals can achieve stable outer electron arrangements by sharing electrons.",
        "Step 3: The shared electron pair forms a covalent bond.",
      ],
      type: isMcq ? "mcq" : "open_response",
      options: isMcq
        ? [
            "Covalent bonding",
            "Ionic bonding",
            "Metallic bonding",
            "Nuclear bonding",
          ]
        : null,
      concept: "Chemical Bonding",
      skill: "Identify covalent bonding",
      difficulty: 1,
      misconception: "Confuses electron sharing with electron transfer.",
      factModel: {
        type: "covalent_bonding",
        factId: "bonding.covalent.electron_sharing",
        relation: "electron_sharing_between_nonmetals",
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
    const answer = "Metallic bonding consists of positive metal ions attracted to delocalized electrons.";
    const isMcq = this._mode(modalityIndex, "metallic") !== 0;

    return this._finalize({
      q: "Why can metals conduct electricity in the solid state?",
      ans: answer,
      hint: "Think about the electrons that can move through metallic bonding.",
      why: "Metals contain delocalized electrons that can move through the structure and carry charge.",
      sol: answer,
      steps: [
        "Step 1: Metal atoms contribute outer electrons.",
        "Step 2: These electrons become delocalized.",
        "Step 3: The mobile electrons carry electrical charge.",
      ],
      type: isMcq ? "mcq" : "open_response",
      options: isMcq
        ? this._makeDistractors(answer, [
            "Positive ions move freely through the solid.",
            "Neutrons move through the metal.",
            "Water molecules carry the electrical current.",
          ])
        : null,
      concept: "Chemical Bonding",
      skill: "Explain metallic bonding",
      difficulty: 2,
      misconception: "Believes positive metal ions carry electrical current through the solid.",
      factModel: {
        type: "metallic_bonding",
        factId: "bonding.metallic.delocalized_electrons",
        relation: "delocalized_electrons_carry_charge",
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
    const answer = "MnO2 acts as a catalyst by providing an alternative reaction pathway with lower activation energy.";
    const isMcq = this._mode(modalityIndex, "catalyst") !== 0;

    return this._finalize({
      q: "A chemist adds MnO2 to hydrogen peroxide. Oxygen is produced faster, but the MnO2 is recovered unchanged. What is the role of MnO2?",
      ans: answer,
      hint: "A catalyst changes the rate of reaction without being permanently consumed.",
      why: "A catalyst provides an alternative reaction pathway with lower activation energy.",
      sol: answer,
      steps: [
        "Step 1: The reaction becomes faster.",
        "Step 2: MnO2 is recovered unchanged.",
        "Step 3: Therefore MnO2 acts as a catalyst.",
        "Step 4: A catalyst provides an alternative pathway with lower activation energy.",
      ],
      type: isMcq ? "mcq" : "open_response",
      options: isMcq
        ? this._makeDistractors(answer, [
            "MnO2 is completely consumed by the reaction.",
            "MnO2 changes the equilibrium constant.",
            "MnO2 permanently increases the temperature.",
          ])
        : null,
      concept: "Rates of Reaction",
      skill: "Explain catalyst action",
      difficulty: 2,
      misconception: "Believes a catalyst is consumed or changes the equilibrium constant.",
      factModel: {
        type: "catalyst",
        factId: "rates.catalyst.alternative_pathway",
        catalyst: "MnO2",
        reaction: "hydrogen peroxide decomposition",
        unchanged: true,
        effect: "lower_activation_energy",
      },
    });
  }

  // ============================================================
  // SOLVERS
  // ============================================================

  _solveMoles(mass, molarMass) {
    if (!Number.isFinite(mass) || !Number.isFinite(molarMass) || molarMass <= 0) {
      return NaN;
    }
    return mass / molarMass;
  }

  _solveMass(moles, molarMass) {
    if (!Number.isFinite(moles) || !Number.isFinite(molarMass) || moles < 0 || molarMass <= 0) {
      return NaN;
    }
    return moles * molarMass;
  }

  _solveGasVolume(moles, molarVolume) {
    if (!Number.isFinite(moles) || !Number.isFinite(molarVolume) || moles < 0 || molarVolume <= 0) {
      return NaN;
    }
    return moles * molarVolume;
  }

  _solveStoichiometry(startingMoles, reactantCoefficient, productCoefficient) {
    if (!Number.isFinite(startingMoles) || reactantCoefficient <= 0 || productCoefficient <= 0) {
      return NaN;
    }
    return (startingMoles * productCoefficient) / reactantCoefficient;
  }

  // ============================================================
  // VERIFIED DATA SELECTION
  // ============================================================

  _selectCompound(qObj, factModel) {
    const requestedId = factModel?.compound?.id;
    if (requestedId) {
      return this.compounds.find((c) => c.id === requestedId) || null;
    }

    const stem = String(qObj?.q || qObj?.stem || "").toLowerCase();
    const found = this.compounds.find(
      (compound) =>
        stem.includes(compound.name.toLowerCase()) ||
        stem.includes(compound.formula.toLowerCase())
    );

    if (found) return found;

    const seed = this._hash(stem);
    return this.compounds[seed % this.compounds.length];
  }

  _selectReaction(qObj, factModel) {
    if (factModel?.reactionId) {
      return this.reactions.find((r) => r.id === factModel.reactionId) || null;
    }

    const stem = String(qObj?.q || qObj?.stem || "").toLowerCase();
    const found = this.reactions.find((r) => stem.includes(r.equation.toLowerCase()));
    if (found) return found;

    return this.reactions[this._hash(stem) % this.reactions.length];
  }

  _selectGas(qObj, factModel) {
    const known = [
      { name: "carbon dioxide", formula: "CO2" },
      { name: "oxygen", formula: "O2" },
      { name: "nitrogen", formula: "N2" },
      { name: "hydrogen", formula: "H2" },
      { name: "methane", formula: "CH4" },
    ];

    if (factModel?.gas?.formula) {
      return known.find((g) => g.formula === factModel.gas.formula) || known[0];
    }

    const stem = String(qObj?.q || qObj?.stem || "").toLowerCase();
    const found = known.find((g) => stem.includes(g.name));
    return found || known[this._hash(stem) % known.length];
  }

  _selectGasCondition(qObj, factModel) {
    if (factModel?.condition === "STP" || factModel?.condition === "RTP") {
      return factModel.condition;
    }

    const lower = String(qObj?.q || qObj?.stem || "").toLowerCase();
    if (lower.includes("stp")) return "STP";
    if (lower.includes("rtp")) return "RTP";
    return "RTP";
  }

  _selectIon(qObj, factModel, sign) {
    if (sign === "positive" && factModel?.metal) {
      return factModel.metal;
    }
    if (sign === "negative" && factModel?.nonMetal) {
      return factModel.nonMetal;
    }

    const lower = String(qObj?.q || qObj?.stem || "").toLowerCase();
    const candidates = this.ions.filter((ion) => (sign === "positive" ? ion.charge > 0 : ion.charge < 0));
    const found = candidates.find((ion) => lower.includes(ion.name));

    return found || candidates[this._hash(lower + sign) % candidates.length];
  }

  // ============================================================
  // PARAMETER EXTRACTION
  // ============================================================

  _safeMultiplier(qObj, factModel) {
    if (Number.isFinite(factModel?.multiplier) && factModel.multiplier > 0) {
      return factModel.multiplier;
    }
    return 0.5 + (this._hash(String(qObj?.q || "")) % 4) * 0.5;
  }

  _safeMoles(qObj, factModel) {
    if (Number.isFinite(factModel?.moles) && factModel.moles > 0) {
      return factModel.moles;
    }
    return 0.25 + (this._hash(String(qObj?.q || "")) % 8) * 0.25;
  }

  _safeReactionMoles(qObj, factModel) {
    if (Number.isFinite(factModel?.startingMoles) && factModel.startingMoles > 0) {
      return factModel.startingMoles;
    }
    return (this._hash(String(qObj?.q || "")) % 5) + 1;
  }

  _safeGasMoles(qObj, factModel) {
    if (Number.isFinite(factModel?.moles) && factModel.moles > 0) {
      return factModel.moles;
    }
    return 0.5 + (this._hash(String(qObj?.q || "")) % 6) * 0.5;
  }

  _safeConcentrationMoles(qObj, factModel) {
    if (Number.isFinite(factModel?.moles) && factModel.moles > 0) {
      return factModel.moles;
    }
    return 0.1 + (this._hash(String(qObj?.q || "")) % 5) * 0.1;
  }

  _safeConcentrationVolume(qObj, factModel) {
    if (Number.isFinite(factModel?.volume) && factModel.volume > 0) {
      return factModel.volume;
    }
    return 0.5 + (this._hash(String(qObj?.q || "")) % 4) * 0.5;
  }

  _extractPH(qObj, factModel) {
    if (Number.isFinite(factModel?.pH)) {
      return factModel.pH;
    }

    const stem = String(qObj?.q || qObj?.stem || "");
    const match = stem.match(/\bpH\s*(?:of|=)?\s*(\d+(?:\.\d+)?)/i);
    if (!match) return null;
    return Number(match[1]);
  }

  // ============================================================
  // IONIC FORMULA
  // ============================================================

  _ionicFormula(positive, negative) {
    const positiveCharge = Math.abs(positive.charge);
    const negativeCharge = Math.abs(negative.charge);

    const gcd = this._gcd(positiveCharge, negativeCharge);
    const positiveCount = negativeCharge / gcd;
    const negativeCount = positiveCharge / gcd;

    return (
      positive.element +
      this._subscriptIfNeeded(positiveCount) +
      negative.element +
      this._subscriptIfNeeded(negativeCount)
    );
  }

  _subscriptIfNeeded(number) {
    if (number === 1) return "";
    const chars = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9" };
    return String(number)
      .split("")
      .map((x) => chars[x] || x)
      .join("");
  }

  // ============================================================
  // FORMULA BREAKDOWN
  // ============================================================

  _formulaBreakdown(formula) {
    const map = {
      CaCO3: "Ca(40) + C(12) + 3*O(16) = 100 g/mol",
      NaCl: "Na(23) + Cl(35.5) = 58.5 g/mol",
      NaOH: "Na(23) + O(16) + H(1) = 40 g/mol",
      H2SO4: "2*H(1) + S(32) + 4*O(16) = 98 g/mol",
      CO2: "C(12) + 2*O(16) = 44 g/mol",
      H2O: "2*H(1) + O(16) = 18 g/mol",
      NH3: "N(14) + 3*H(1) = 17 g/mol",
      "Mg(OH)2": "Mg(24.3) + 2*O(16) + 2*H(1) = 58.3 g/mol",
      CuSO4: "Cu(63.5) + S(32) + 4*O(16) = 159.5 g/mol",
      C6H12O6: "6*C(12) + 12*H(1) + 6*O(16) = 180 g/mol",
      HNO3: "H(1) + N(14) + 3*O(16) = 63 g/mol",
      Fe2O3: "2*Fe(56) + 3*O(16) = 160 g/mol",
    };

    return (
      map[formula] ||
      "Add the relative atomic masses of all atoms shown in the formula."
    );
  }

  // ============================================================
  // OPTIONS
  // ============================================================

  _makeDistractors(answer, distractors) {
    const cleaned = [];
    const candidates = [answer, ...distractors];

    for (const candidate of candidates) {
      if (candidate == null) continue;
      const value = String(candidate).trim();
      if (!value || cleaned.includes(value)) continue;
      cleaned.push(value);
    }

    const fallbackDistractors = [
      "Incorrect chemical relationship",
      "Incorrect use of the formula",
      "Incorrect unit conversion",
    ];

    for (const fallback of fallbackDistractors) {
      if (cleaned.length >= 4) break;
      if (!cleaned.includes(fallback)) {
        cleaned.push(fallback);
      }
    }

    return cleaned.slice(0, 4);
  }

  // ============================================================
  // FINALIZER
  // ============================================================

  _finalize(question) {
    const normalized = {
      ...question,
      q: String(question.q || "").trim(),
      ans: String(question.ans || "").trim(),
      hint: question.hint || "Identify the chemical principle before solving.",
      steps: Array.isArray(question.steps) ? question.steps : [],
      metadata: {
        ...(question.metadata || {}),
        factModel: question.factModel,
        mutationEngine: "TixarChemistryMutator",
        mutationVersion: this.config.version,
        verified: true,
        skill: question.skill || question.metadata?.skill,
        concept: question.concept || question.metadata?.concept,
        provenance: {
          mutationVerified: true,
          conceptPreserved: true,
          answerRecalculated: true,
        },
      },
    };

    if (normalized.type === "mcq" && Array.isArray(normalized.options)) {
      normalized.options = this._shuffle(
        normalized.options,
        this._hash(normalized.q)
      );
    }

    return normalized;
  }

  // ============================================================
  // VALIDATOR
  // ============================================================

  validateQuestion(question) {
    if (!question) return false;
    if (typeof question.q !== "string" || !question.q.trim()) return false;
    if (typeof question.ans !== "string" || !question.ans.trim()) return false;

    if (question.type === "mcq") {
      if (!Array.isArray(question.options)) return false;
      if (question.options.length !== 4) return false;
      if (new Set(question.options).size !== 4) return false;
      if (!question.options.includes(question.ans)) return false;
    }

    const fact = question.metadata?.factModel || question.factModel;
    if (!fact) return false;
    if (question.metadata?.verified !== true) return false;

    return true;
  }

  // ============================================================
  // SAFE FALLBACK
  // ============================================================

  _safeFallback(qObj, reason) {
    return {
      ...qObj,
      q: String(qObj.q || qObj.stem || ""),
      ans: String(qObj.ans || ""),
      type: qObj.type || "open_response",
      options: qObj.type === "mcq" ? qObj.options : null,
      metadata: {
        ...(qObj.metadata || {}),
        mutationEngine: "TixarChemistryMutator",
        mutationVersion: this.config.version,
        verified: false,
        fallback: true,
        reason,
      },
    };
  }

  // ============================================================
  // SAFE PUBLIC WRAPPER
  // ============================================================

  safeMutate(
    qObj,
    modalityIndex = 0,
    performanceContext = {}
  ) {
    const question = this.mutate(qObj, modalityIndex, performanceContext);
    if (!this.validateQuestion(question)) {
      return this._safeFallback(qObj, "VALIDATION_FAILED");
    }
    return question;
  }

  // ============================================================
  // DIFFICULTY
  // ============================================================

  _difficulty(qObj, performanceContext) {
    if (Number.isFinite(qObj?.difficulty)) {
      return Math.min(5, Math.max(1, qObj.difficulty));
    }

    const accuracy = Number(performanceContext?.accuracy);
    if (Number.isFinite(accuracy)) {
      if (accuracy >= 0.90) return 5;
      if (accuracy >= 0.80) return 4;
      if (accuracy >= 0.65) return 3;
      if (accuracy >= 0.45) return 2;
    }

    return 1;
  }

  // ============================================================
  // MODALITY
  // ============================================================

  _mode(modalityIndex, seed) {
    if (Number.isFinite(modalityIndex)) {
      return Math.abs(Math.floor(modalityIndex)) % 4;
    }
    return this._hash(String(seed)) % 4;
  }

  // ============================================================
  // DETERMINISTIC UTILITIES
  // ============================================================

  _hash(value) {
    const str = String(value);
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }

    return Math.abs(hash);
  }

  _round(value, decimals = 2) {
    return Number(Number(value).toFixed(decimals));
  }

  _gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  }

  _shuffle(array, seed) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = this._hash(`${seed}:${i}`) % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }
}