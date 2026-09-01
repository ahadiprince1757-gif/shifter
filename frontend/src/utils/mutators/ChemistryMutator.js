/**
 * Tixar Chemistry Mutator
 *
 * Adaptive Chemistry Question Engine
 *
 * Design:
 *   Concept
 *      ↓
 *   Skill
 *      ↓
 *   Difficulty
 *      ↓
 *   Deterministic mutation
 *      ↓
 *   Solver
 *      ↓
 *   Misconception-based distractors
 *      ↓
 *   Validation
 *      ↓
 *   Question
 *
 * Supported areas:
 * - Molar mass / relative formula mass
 * - Mass ↔ moles
 * - Stoichiometric ratios
 * - Limiting reagent
 * - Gas volumes at RTP/STP
 * - Solution concentration
 * - Acid/base and pH
 * - Ionic/covalent/metallic bonding
 * - Periodic structure
 * - Rates of reaction / catalysts
 *
 * Output remains compatible with the Tixar question format:
 *
 * {
 *   q,
 *   ans,
 *   hint,
 *   why,
 *   sol,
 *   steps,
 *   type,
 *   options,
 *   skill,
 *   difficulty,
 *   misconception,
 *   concept
 * }
 */

export class ChemistryMutator {

  constructor() {

    // ------------------------------------------------------------
    // ATOMIC MASSES
    // ------------------------------------------------------------

    this.atomicMasses = {
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
      Cu: 63.5
    };


    // ------------------------------------------------------------
    // COMPOUNDS
    // ------------------------------------------------------------

    this.compounds = [

      {
        name: "Calcium Carbonate",
        formula: "CaCO3",
        displayFormula: "CaCO₃",
        molarMass: 100
      },

      {
        name: "Sodium Chloride",
        formula: "NaCl",
        displayFormula: "NaCl",
        molarMass: 58.5
      },

      {
        name: "Sodium Hydroxide",
        formula: "NaOH",
        displayFormula: "NaOH",
        molarMass: 40
      },

      {
        name: "Sulfuric Acid",
        formula: "H2SO4",
        displayFormula: "H₂SO₄",
        molarMass: 98
      },

      {
        name: "Carbon Dioxide",
        formula: "CO2",
        displayFormula: "CO₂",
        molarMass: 44
      },

      {
        name: "Water",
        formula: "H2O",
        displayFormula: "H₂O",
        molarMass: 18
      },

      {
        name: "Ammonia",
        formula: "NH3",
        displayFormula: "NH₃",
        molarMass: 17
      },

      {
        name: "Magnesium Hydroxide",
        formula: "Mg(OH)2",
        displayFormula: "Mg(OH)₂",
        molarMass: 58.3
      },

      {
        name: "Copper(II) Sulfate",
        formula: "CuSO4",
        displayFormula: "CuSO₄",
        molarMass: 159.5
      },

      {
        name: "Glucose",
        formula: "C6H12O6",
        displayFormula: "C₆H₁₂O₆",
        molarMass: 180
      },

      {
        name: "Nitric Acid",
        formula: "HNO3",
        displayFormula: "HNO₃",
        molarMass: 63
      },

      {
        name: "Iron(III) Oxide",
        formula: "Fe2O3",
        displayFormula: "Fe₂O₃",
        molarMass: 160
      }

    ];


    // ------------------------------------------------------------
    // REACTIONS
    // ------------------------------------------------------------

    this.reactions = [

      {
        equation: "2H₂ + O₂ → 2H₂O",
        r1: "H₂",
        r2: "O₂",
        product: "H₂O",
        r1Coeff: 2,
        r2Coeff: 1,
        productCoeff: 2
      },

      {
        equation: "N₂ + 3H₂ → 2NH₃",
        r1: "N₂",
        r2: "H₂",
        product: "NH₃",
        r1Coeff: 1,
        r2Coeff: 3,
        productCoeff: 2
      },

      {
        equation: "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂",
        r1: "CaCO₃",
        r2: "HCl",
        product: "CO₂",
        r1Coeff: 1,
        r2Coeff: 2,
        productCoeff: 1
      },

      {
        equation: "2Mg + O₂ → 2MgO",
        r1: "Mg",
        r2: "O₂",
        product: "MgO",
        r1Coeff: 2,
        r2Coeff: 1,
        productCoeff: 2
      },

      {
        equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
        r1: "CH₄",
        r2: "O₂",
        product: "CO₂",
        r1Coeff: 1,
        r2Coeff: 2,
        productCoeff: 1
      }

    ];


    // ------------------------------------------------------------
    // ELEMENT DATABASE
    // ------------------------------------------------------------

    this.metals = [

      {
        name: "Sodium",
        symbol: "Na",
        atomicNumber: 11,
        configuration: "2,8,1",
        valency: 1,
        ion: "Na⁺"
      },

      {
        name: "Potassium",
        symbol: "K",
        atomicNumber: 19,
        configuration: "2,8,8,1",
        valency: 1,
        ion: "K⁺"
      },

      {
        name: "Magnesium",
        symbol: "Mg",
        atomicNumber: 12,
        configuration: "2,8,2",
        valency: 2,
        ion: "Mg²⁺"
      },

      {
        name: "Calcium",
        symbol: "Ca",
        atomicNumber: 20,
        configuration: "2,8,8,2",
        valency: 2,
        ion: "Ca²⁺"
      },

      {
        name: "Aluminium",
        symbol: "Al",
        atomicNumber: 13,
        configuration: "2,8,3",
        valency: 3,
        ion: "Al³⁺"
      }

    ];


    this.nonMetals = [

      {
        name: "Chlorine",
        symbol: "Cl",
        atomicNumber: 17,
        configuration: "2,8,7",
        valency: 1,
        ion: "Cl⁻"
      },

      {
        name: "Fluorine",
        symbol: "F",
        atomicNumber: 9,
        configuration: "2,7",
        valency: 1,
        ion: "F⁻"
      },

      {
        name: "Oxygen",
        symbol: "O",
        atomicNumber: 8,
        configuration: "2,6",
        valency: 2,
        ion: "O²⁻"
      },

      {
        name: "Sulfur",
        symbol: "S",
        atomicNumber: 16,
        configuration: "2,8,6",
        valency: 2,
        ion: "S²⁻"
      },

      {
        name: "Nitrogen",
        symbol: "N",
        atomicNumber: 7,
        configuration: "2,5",
        valency: 3,
        ion: "N³⁻"
      },

      {
        name: "Hydrogen",
        symbol: "H",
        atomicNumber: 1,
        configuration: "1",
        valency: 1,
        ion: "H⁺"
      }

    ];


    // ------------------------------------------------------------
    // GAS DATABASE
    // ------------------------------------------------------------

    this.gases = [

      {
        name: "Carbon dioxide",
        formula: "CO₂"
      },

      {
        name: "Oxygen",
        formula: "O₂"
      },

      {
        name: "Nitrogen",
        formula: "N₂"
      },

      {
        name: "Hydrogen",
        formula: "H₂"
      },

      {
        name: "Methane",
        formula: "CH₄"
      }

    ];

  }


  // ============================================================
  // DETERMINISTIC RANDOMNESS
  // ============================================================

  _hash(str) {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {

      hash =
        (hash << 5) -
        hash +
        str.charCodeAt(i);

      hash |= 0;

    }

    return Math.abs(hash);

  }


  _random(seed) {

    let x = Math.sin(seed) * 10000;

    return x - Math.floor(x);

  }


  _pick(array, seed) {

    return array[seed % array.length];

  }


  // ============================================================
  // MATH HELPERS
  // ============================================================

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


  _lcm(a, b) {

    return Math.abs(a * b) / this._gcd(a, b);

  }


  _round(value, decimals = 2) {

    return Number(
      Number(value).toFixed(decimals)
    );

  }


  // ============================================================
  // SUBSCRIPTS
  // ============================================================

  _subscript(number) {

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
      9: "₉"
    };

    return String(number)
      .split("")
      .map(x => chars[x] || x)
      .join("");

  }


  // ============================================================
  // IONIC FORMULA GENERATOR
  // ============================================================

  _ionicFormula(metal, nonMetal) {

    const lcm =
      this._lcm(
        metal.valency,
        nonMetal.valency
      );

    const metalCount =
      lcm / metal.valency;

    const nonMetalCount =
      lcm / nonMetal.valency;

    return (
      metal.symbol +
      (
        metalCount === 1
          ? ""
          : this._subscript(metalCount)
      ) +
      nonMetal.symbol +
      (
        nonMetalCount === 1
          ? ""
          : this._subscript(nonMetalCount)
      )
    );

  }


  // ============================================================
  // SOLVER
  // ============================================================

  _solveMoles(mass, molarMass) {

    return mass / molarMass;

  }


  _solveMass(moles, molarMass) {

    return moles * molarMass;

  }


  _solveGasVolume(moles, molarVolume) {

    return moles * molarVolume;

  }


  _solveConcentration(moles, volume) {

    return moles / volume;

  }


  _solveStoichiometry(
    startingMoles,
    reactantCoefficient,
    productCoefficient
  ) {

    return (
      startingMoles *
      productCoefficient /
      reactantCoefficient
    );

  }


  // ============================================================
  // MODALITY
  // ============================================================

  _mode(modalityIndex, seed) {

    if (
      typeof modalityIndex === "number" &&
      Number.isFinite(modalityIndex)
    ) {

      return (
        Math.abs(Math.floor(modalityIndex)) % 4
      );

    }

    return seed % 4;

  }


  // ============================================================
  // MAIN MUTATOR
  // ============================================================

  mutate(qObj, modalityIndex = 0) {

    if (!qObj) return null;

    const stem =
      String(
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    const lower =
      stem.toLowerCase();

    const rawAns =
      String(qObj.ans || "");

    const seed =
      this._hash(
        stem +
        String(qObj.id || "")
      );

    const mode =
      this._mode(
        modalityIndex,
        seed
      );


    // ==========================================================
    // 0. EMPIRICAL FORMULA
    // ==========================================================

    if (
      lower.includes("empirical") ||
      lower.includes("empirical formula") ||
      lower.includes("simplest formula") ||
      lower.includes("percent by mass") ||
      lower.includes("composition by mass")
    ) {

      return this._empiricalFormulaQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 1. MOLAR MASS
    // ==========================================================

    if (
      lower.includes("molar mass") ||
      lower.includes("relative formula mass") ||
      lower.includes("rfm")
    ) {

      return this._molarMassQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 2. MASS → MOLES
    // ==========================================================

    if (
      lower.includes("moles in") ||
      lower.includes("number of moles") ||
      lower.includes("how many moles") ||
      lower.includes("calculate the moles")
    ) {

      return this._massToMolesQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 3. MOLES → MASS
    // ==========================================================

    if (
      lower.includes("mass of") ||
      lower.includes("calculate the mass") ||
      lower.includes("how many grams") ||
      lower.includes("grams of")
    ) {

      return this._molesToMassQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 4. STOICHIOMETRY
    // ==========================================================

    if (
      lower.includes("stoichiometry") ||
      lower.includes("mole ratio") ||
      lower.includes("reaction ratio") ||
      lower.includes("reacts with") ||
      lower.includes("produced") ||
      lower.includes("balanced equation")
    ) {

      return this._stoichiometryQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 5. GAS VOLUME
    // ==========================================================

    if (
      lower.includes("gas volume") ||
      lower.includes("molar volume") ||
      lower.includes("dm3") ||
      lower.includes("dm³") ||
      lower.includes("rtp") ||
      lower.includes("stp")
    ) {

      return this._gasVolumeQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 6. CONCENTRATION
    // ==========================================================

    if (
      lower.includes("concentration") ||
      lower.includes("molarity")
    ) {

      return this._concentrationQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 7. ACIDS / BASES / pH
    // ==========================================================

    if (
      lower.includes("acid") ||
      lower.includes("base") ||
      lower.includes("alkali") ||
      lower.includes("ph") ||
      lower.includes("indicator") ||
      lower.includes("litmus") ||
      lower.includes("neutral")
    ) {

      return this._acidBaseQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 8. BONDING
    // ==========================================================

    if (
      lower.includes("bond") ||
      lower.includes("ionic") ||
      lower.includes("covalent") ||
      lower.includes("metallic") ||
      lower.includes("electron") ||
      lower.includes("valenc") ||
      lower.includes("lattice")
    ) {

      return this._bondingQuestion(
        seed,
        mode,
        lower
      );

    }


    // ==========================================================
    // 9. RATE OF REACTION
    // ==========================================================

    if (
      lower.includes("rate") ||
      lower.includes("catalyst") ||
      lower.includes("activation energy") ||
      lower.includes("surface area") ||
      lower.includes("collision")
    ) {

      return this._kineticsQuestion(
        seed,
        mode
      );

    }


    // ==========================================================
    // 10. GENERIC NUMERICAL MUTATION
    // ==========================================================

    const numbers =
      stem.match(
        /\b\d+(?:\.\d+)?\b/g
      );

    if (
      numbers &&
      numbers.length >= 1
    ) {

      return this._genericNumericMutation(
        qObj,
        stem,
        numbers,
        seed
      );

    }


    // ==========================================================
    // 11. GENERIC REVERSE INQUIRY
    // ==========================================================

    if (rawAns.length > 3) {

      return this._genericQuestion(
        qObj,
        stem,
        rawAns
      );

    }


    // ==========================================================
    // FALLBACK
    // ==========================================================

    return {

      ...qObj,

      q: stem,

      hint:
        qObj.hint ||
        "Identify the chemical principle involved before calculating.",

      concept:
        qObj.concept ||
        "General Chemistry",

      difficulty:
        qObj.difficulty ||
        1,

      steps: [

        "Step 1: Identify the chemical quantities or structures given.",

        "Step 2: Select the relevant chemical principle or equation.",

        "Step 3: Apply the principle carefully.",

        "Step 4: Check the units and final answer."

      ]

    };

  }


  // ============================================================
  // EMPIRICAL FORMULA QUESTION
  // ============================================================

  _empiricalFormulaQuestion(seed, mode) {
    const problems = [
      {
        given: "70% Iron (Fe) and 30% Oxygen (O) by mass (Ar: Fe = 56, O = 16)",
        ans: "Fe₂O₃",
        steps: [
          "Step 1: Assume a 100 g sample — mass of Fe = 70 g, mass of O = 30 g.",
          "Step 2: Convert mass to moles: Fe = 70 ÷ 56 = 1.25 mol, O = 30 ÷ 16 = 1.875 mol.",
          "Step 3: Divide by the smallest mole value (1.25): Fe = 1.25 ÷ 1.25 = 1, O = 1.875 ÷ 1.25 = 1.5.",
          "Step 4: Convert non-integer ratio (1 : 1.5) to whole numbers by multiplying all by 2: Fe = 2, O = 3.",
          "Step 5: Write the empirical formula: Fe₂O₃."
        ],
        sol: "The ratio 1 : 1.5 is multiplied by 2 to yield whole numbers 2 : 3. The empirical formula of iron(III) oxide is Fe₂O₃.",
        options: ["Fe₂O₃", "FeO", "Fe₃O₂", "Fe₃O₄"]
      },
      {
        given: "52.2% Carbon (C), 13.0% Hydrogen (H), and 34.8% Oxygen (O) by mass (Ar: C = 12, H = 1, O = 16)",
        ans: "C₂H₆O",
        steps: [
          "Step 1: Assume a 100 g sample — mass of C = 52.2 g, H = 13.0 g, O = 34.8 g.",
          "Step 2: Convert mass to moles: C = 52.2 ÷ 12 = 4.35 mol, H = 13.0 ÷ 1 = 13.0 mol, O = 34.8 ÷ 16 = 2.175 mol.",
          "Step 3: Divide each mole value by the smallest (2.175): C = 4.35 ÷ 2.175 = 2, H = 13.0 ÷ 2.175 = 6, O = 2.175 ÷ 2.175 = 1.",
          "Step 4: The simplest whole-number atom ratio is C : H : O = 2 : 6 : 1.",
          "Step 5: Write the empirical formula: C₂H₆O."
        ],
        sol: "Converting mass percentages to moles gives C = 4.35, H = 13.0, and O = 2.175. Dividing by 2.175 gives the whole-number ratio 2 : 6 : 1. Empirical formula = C₂H₆O.",
        options: ["C₂H₆O", "CH₃O", "C₂H₄O", "CH₂O"]
      },
      {
        given: "2.4 g of Magnesium reacting completely with Oxygen to form 4.0 g of Magnesium Oxide (Ar: Mg = 24, O = 16)",
        ans: "MgO",
        steps: [
          "Step 1: Determine element masses: Mg = 2.4 g, O = 4.0 g - 2.4 g = 1.6 g.",
          "Step 2: Convert to moles: Mg = 2.4 ÷ 24 = 0.10 mol, O = 1.6 ÷ 16 = 0.10 mol.",
          "Step 3: Divide each by the smallest mole value (0.10): Mg = 1, O = 1.",
          "Step 4: The simplest whole-number mole ratio is 1 : 1.",
          "Step 5: Write the empirical formula: MgO."
        ],
        sol: "2.4 g Mg combines with 1.6 g O. Converting to moles yields Mg = 0.10 mol and O = 0.10 mol, giving a 1 : 1 ratio. Empirical formula = MgO.",
        options: ["MgO", "Mg₂O", "MgO₂", "Mg₂O₃"]
      },
      {
        given: "32.4% Sodium (Na), 22.5% Sulfur (S), and 45.1% Oxygen (O) by mass (Ar: Na = 23, S = 32, O = 16)",
        ans: "Na₂SO₄",
        steps: [
          "Step 1: Assume a 100 g sample — Na = 32.4 g, S = 22.5 g, O = 45.1 g.",
          "Step 2: Convert mass to moles: Na = 32.4 ÷ 23 = 1.41 mol, S = 22.5 ÷ 32 = 0.703 mol, O = 45.1 ÷ 16 = 2.82 mol.",
          "Step 3: Divide each mole value by the smallest (0.703): Na = 2, S = 1, O = 4.",
          "Step 4: The simplest whole-number atom ratio Na : S : O = 2 : 1 : 4.",
          "Step 5: Write the empirical formula: Na₂SO₄."
        ],
        sol: "Dividing mole values by 0.703 yields whole numbers Na = 2, S = 1, O = 4. Empirical formula = Na₂SO₄.",
        options: ["Na₂SO₄", "NaSO₃", "Na₂SO₃", "NaSO₄"]
      },
      {
        given: "79.9% Copper (Cu) and 20.1% Oxygen (O) by mass (Ar: Cu = 63.5, O = 16)",
        ans: "CuO",
        steps: [
          "Step 1: Assume a 100 g sample — Cu = 79.9 g, O = 20.1 g.",
          "Step 2: Convert to moles: Cu = 79.9 ÷ 63.5 = 1.258 mol, O = 20.1 ÷ 16 = 1.256 mol.",
          "Step 3: Divide each by smallest (1.256): Cu = 1, O = 1.",
          "Step 4: The simplest whole-number ratio is 1 : 1.",
          "Step 5: Write the empirical formula: CuO."
        ],
        sol: "79.9 g Cu and 20.1 g O contain equal mole quantities (~1.26 mol). Ratio = 1 : 1. Empirical formula = CuO.",
        options: ["CuO", "Cu₂O", "CuO₂", "Cu₂O₃"]
      },
      {
        given: "43.6% Phosphorus (P) and 56.4% Oxygen (O) by mass (Ar: P = 31, O = 16)",
        ans: "P₂O₅",
        steps: [
          "Step 1: Assume a 100 g sample — P = 43.6 g, O = 56.4 g.",
          "Step 2: Convert mass to moles: P = 43.6 ÷ 31 = 1.406 mol, O = 56.4 ÷ 16 = 3.525 mol.",
          "Step 3: Divide each by smallest (1.406): P = 1, O = 2.5.",
          "Step 4: Multiply by 2 to obtain whole numbers: P = 2, O = 5.",
          "Step 5: Write the empirical formula: P₂O₅."
        ],
        sol: "The mole ratio P : O is 1 : 2.5. Multiplying by 2 gives whole numbers 2 : 5. Empirical formula = P₂O₅.",
        options: ["P₂O₅", "PO₂", "P₂O₃", "PO₃"]
      }
    ];

    const selected = this._pick(problems, seed);

    if (mode === 0) {
      return {
        q: `A compound contains ${selected.given}. Determine its empirical formula.`,
        ans: selected.ans,
        hint: "Convert mass percentages to moles by dividing by relative atomic masses, then find the simplest whole-number ratio.",
        why: selected.sol,
        sol: selected.sol,
        steps: selected.steps,
        type: "open_response",
        options: null,
        concept: "Empirical Formula",
        skill: "Calculate empirical formula from mass percentages",
        difficulty: 2,
        misconception: "Forgets to divide by relative atomic masses or does not simplify mole ratio to whole numbers"
      };
    }

    return {
      q: `A compound contains ${selected.given}. Which is its empirical formula?`,
      ans: selected.ans,
      hint: "Find the mole ratio of the elements and simplify to whole numbers.",
      why: selected.sol,
      sol: selected.sol,
      steps: selected.steps,
      type: "mcq",
      options: this._uniqueOptions(selected.options),
      concept: "Empirical Formula",
      skill: "Identify empirical formula",
      difficulty: 2,
      misconception: "Uses mass ratio directly instead of mole ratio"
    };
  }


  // ============================================================
  // MOLAR MASS QUESTION
  // ============================================================

  _molarMassQuestion(seed, mode) {

    const cmp =
      this._pick(
        this.compounds,
        seed
      );

    const M =
      cmp.molarMass;

    const answer =
      `${M} g/mol`;

    const breakdown =
      this._formulaBreakdown(
        cmp.formula
      );


    if (mode === 0) {

      return {

        q:
          `Calculate the molar mass of ${cmp.name} (${cmp.displayFormula}).`,

        ans: answer,

        hint:
          "Add the atomic masses of every atom represented in the formula.",

        sol:
          `${breakdown}. Therefore, molar mass = ${answer}.`,

        steps: [

          "Step 1: Identify every element in the formula.",

          "Step 2: Multiply each atomic mass by the number of atoms present.",

          `Step 3: Add the values: ${breakdown}.`,

          `Step 4: State the answer with units: ${answer}.`

        ],

        type: "open_response",

        options: null,

        concept: "Molar Mass",

        skill: "Calculate molar mass",

        difficulty: 1,

        misconception: null

      };

    }


    if (mode === 1) {

      const options =
        this._uniqueOptions([

          answer,

          `${this._round(M + 12, 1)} g/mol`,

          `${this._round(M - 16, 1)} g/mol`,

          `${this._round(M / 2, 1)} g/mol`

        ]);

      return {

        q:
          `What is the molar mass of ${cmp.name} (${cmp.displayFormula})?`,

        ans: answer,

        hint:
          "Sum the relative atomic masses of all atoms.",

        sol:
          `${breakdown}. Total = ${answer}.`,

        type: "mcq",

        options,

        concept: "Molar Mass",

        skill: "Calculate molar mass",

        difficulty: 1,

        misconception:
          "Incorrectly counts atoms or subscripts"

      };

    }


    if (mode === 2) {

      const wrong =
        M + 12;

      return {

        q:
          `A student calculates the molar mass of ${cmp.name} (${cmp.displayFormula}) as ${wrong} g/mol. Is the calculation correct?`,

        ans:
          `Incorrect. The correct molar mass is ${answer}.`,

        hint:
          "Recalculate the atomic mass contribution of every atom.",

        sol:
          `The student's value is incorrect. ${breakdown}. Correct molar mass = ${answer}.`,

        type: "open_response",

        options: null,

        concept: "Molar Mass",

        skill: "Check molar mass calculations",

        difficulty: 2,

        misconception:
          "Incorrect atom counting"

      };

    }


    return {

      q:
        `Explain how the relative formula mass of ${cmp.name} (${cmp.displayFormula}) is determined.`,

      ans:
        `Add the relative atomic masses of all atoms in the formula. The molar mass is ${answer}.`,

      hint:
        "Pay attention to subscripts.",

      sol:
        `${breakdown}. Therefore = ${answer}.`,

      type: "open_response",

      options: null,

      concept: "Molar Mass",

      skill: "Explain molar mass",

      difficulty: 2,

      misconception: null

    };

  }


  // ============================================================
  // FORMULA BREAKDOWN
  // ============================================================

  _formulaBreakdown(formula) {

    const breakdowns = {

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
        "2×Fe(56) + 3×O(16) = 160 g/mol"

    };

    return (
      breakdowns[formula] ||
      "Add the relative atomic masses of all atoms shown in the formula"
    );

  }


  // ============================================================
  // MASS → MOLES
  // ============================================================

  _massToMolesQuestion(seed, mode) {

    const cmp =
      this._pick(
        this.compounds,
        seed + 2
      );

    const multiplier =
      (seed % 5) + 1;

    const mass =
      this._round(
        cmp.molarMass *
        multiplier *
        0.25,
        1
      );

    const moles =
      this._round(
        this._solveMoles(
          mass,
          cmp.molarMass
        ),
        2
      );

    const answer =
      `${moles} mol`;


    if (mode === 0) {

      return {

        q:
          `A laboratory sample contains ${mass} g of ${cmp.name} (${cmp.displayFormula}). Its molar mass is ${cmp.molarMass} g/mol. Calculate the number of moles.`,

        ans: answer,

        hint:
          "Use n = m ÷ M.",

        sol:
          `${mass} ÷ ${cmp.molarMass} = ${answer}.`,

        steps: [

          "Step 1: Write the formula n = m/M.",

          `Step 2: Substitute: n = ${mass}/${cmp.molarMass}.`,

          `Step 3: Calculate: n = ${moles} mol.`

        ],

        type: "open_response",

        options: null,

        concept: "Moles",

        skill: "Convert mass to moles",

        difficulty: 1,

        misconception: null

      };

    }


    const options =
      this._uniqueOptions([

        answer,

        `${this._round(moles * 2, 2)} mol`,

        `${this._round(moles / 2, 2)} mol`,

        `${this._round(moles + 1, 2)} mol`

      ]);


    return {

      q:
        `How many moles are present in ${mass} g of ${cmp.name} (${cmp.displayFormula})?`,

      ans: answer,

      hint:
        "Divide mass by molar mass.",

      sol:
        `n = m/M = ${mass}/${cmp.molarMass} = ${answer}.`,

      type: "mcq",

      options,

      concept: "Moles",

      skill: "Convert mass to moles",

      difficulty: 1,

      misconception:
        "Multiplies mass by molar mass instead of dividing"

    };

  }


  // ============================================================
  // MOLES → MASS
  // ============================================================

  _molesToMassQuestion(seed, mode) {

    const cmp =
      this._pick(
        this.compounds,
        seed + 4
      );

    const moles =
      this._round(
        ((seed % 8) + 1) * 0.25,
        2
      );

    const mass =
      this._round(
        this._solveMass(
          moles,
          cmp.molarMass
        ),
        1
      );

    const answer =
      `${mass} g`;


    const question =

      `Calculate the mass of ${moles} mol of ${cmp.name} (${cmp.displayFormula}). The molar mass is ${cmp.molarMass} g/mol.`;


    if (mode === 0) {

      return {

        q: question,

        ans: answer,

        hint:
          "Use m = n × M.",

        sol:
          `${moles} × ${cmp.molarMass} = ${answer}.`,

        steps: [

          "Step 1: Write m = n × M.",

          `Step 2: Substitute m = ${moles} × ${cmp.molarMass}.`,

          `Step 3: Calculate m = ${answer}.`

        ],

        type: "open_response",

        options: null,

        concept: "Moles and Mass",

        skill: "Convert moles to mass",

        difficulty: 1,

        misconception: null

      };

    }


    return {

      q: question,

      ans: answer,

      hint:
        "Multiply the number of moles by the molar mass.",

      sol:
        `m = n × M = ${moles} × ${cmp.molarMass} = ${answer}.`,

      steps: [

        "Step 1: Identify n and M.",

        "Step 2: Multiply n × M.",

        "Step 3: Attach grams as the unit."

      ],

      type: "mcq",

      options:
        this._uniqueOptions([

          answer,

          `${this._round(cmp.molarMass / moles, 1)} g`,

          `${this._round(mass * 1.5, 1)} g`,

          `${this._round(moles / cmp.molarMass, 3)} g`

        ]),

      concept: "Moles and Mass",

      skill: "Convert moles to mass",

      difficulty: 1,

      misconception:
        "Divides instead of multiplying"

    };

  }


  // ============================================================
  // STOICHIOMETRY
  // ============================================================

  _stoichiometryQuestion(seed, mode) {

    const rxn =
      this._pick(
        this.reactions,
        seed
      );

    const startingMoles =
      ((seed % 5) + 1) * 2;

    const produced =
      this._round(
        this._solveStoichiometry(
          startingMoles,
          rxn.r1Coeff,
          rxn.productCoeff
        ),
        2
      );

    const answer =
      `${produced} mol`;


    const steps = [

      `Step 1: From the balanced equation, ${rxn.r1Coeff} mol ${rxn.r1} produces ${rxn.productCoeff} mol ${rxn.product}.`,

      `Step 2: Set up the ratio: ${startingMoles} × ${rxn.productCoeff}/${rxn.r1Coeff}.`,

      `Step 3: Calculate = ${produced} mol.`

    ];


    if (mode === 2) {

      return {

        q:
          `A student uses the coefficients as if they were mass ratios. Given ${rxn.equation}, ${startingMoles} mol of ${rxn.r1} reacts completely. Explain why the mole ratio must be used instead.`,

        ans:
          `The coefficients represent mole ratios, not mass ratios. Therefore ${startingMoles} mol of ${rxn.r1} produces ${produced} mol of ${rxn.product}.`,

        hint:
          "Balanced-equation coefficients represent relative numbers of moles.",

        sol:
          `The coefficients give the mole relationship. ${rxn.r1Coeff} mol ${rxn.r1} corresponds to ${rxn.productCoeff} mol ${rxn.product}.`,

        type: "open_response",

        options: null,

        concept: "Stoichiometry",

        skill: "Interpret mole ratios",

        difficulty: 2,

        misconception:
          "Treats coefficients as mass ratios"

      };

    }


    if (mode === 0) {

      return {

        q:
          `Given the balanced equation ${rxn.equation}, how many moles of ${rxn.product} are produced when ${startingMoles} mol of ${rxn.r1} reacts completely with excess ${rxn.r2}?`,

        ans: answer,

        hint:
          `Use the mole ratio ${rxn.r1Coeff}:${rxn.productCoeff}.`,

        why:
          `The balanced equation states ${rxn.r1Coeff} mol ${rxn.r1} → ${rxn.productCoeff} mol ${rxn.product}.`,

        sol: answer,

        steps,

        type: "open_response",

        options: null,

        concept: "Stoichiometry",

        skill: "Use mole ratios",

        difficulty: 2,

        misconception: null

      };

    }


    return {

      q:
        `Given ${rxn.equation}, how many moles of ${rxn.product} are produced when ${startingMoles} mol of ${rxn.r1} reacts completely?`,

      ans: answer,

      hint:
        `Use the coefficient ratio ${rxn.r1Coeff}:${rxn.productCoeff}.`,

      sol:
        `(${startingMoles} × ${rxn.productCoeff}) ÷ ${rxn.r1Coeff} = ${answer}.`,

      steps,

      type: "mcq",

      options:
        this._uniqueOptions([

          answer,

          `${startingMoles} mol`,

          `${this._round(startingMoles * rxn.r1Coeff, 1)} mol`,

          `${this._round(produced / 2, 1)} mol`

        ]),

      concept: "Stoichiometry",

      skill: "Use mole ratios",

      difficulty: 2,

      misconception:
        "Uses the wrong coefficient ratio"

    };

  }


  // ============================================================
  // GAS VOLUME
  // ============================================================

  _gasVolumeQuestion(seed) {

    const gas =
      this._pick(
        this.gases,
        seed
      );

    const isSTP =
      seed % 2 === 0;

    const condition =
      isSTP ? "STP" : "RTP";

    const molarVolume =
      isSTP ? 22.4 : 24;

    const moles =
      this._round(
        ((seed % 6) + 1) * 0.5,
        1
      );

    const volume =
      this._round(
        this._solveGasVolume(
          moles,
          molarVolume
        ),
        1
      );

    const answer =
      `${volume} dm³`;


    return {

      q:
        `Calculate the volume occupied by ${moles} mol of ${gas.name} (${gas.formula}) at ${condition}, where the molar gas volume is ${molarVolume} dm³/mol.`,

      ans: answer,

      hint:
        `Use V = n × molar volume. At ${condition}, use ${molarVolume} dm³/mol.`,

      sol:
        `V = ${moles} × ${molarVolume} = ${answer}.`,

      steps: [

        `Step 1: Identify the molar volume at ${condition}: ${molarVolume} dm³/mol.`,

        `Step 2: Apply V = n × Vm.`,

        `Step 3: V = ${moles} × ${molarVolume}.`,

        `Step 4: Volume = ${answer}.`

      ],

      type: "mcq",

      options:
        this._uniqueOptions([

          answer,

          `${this._round(moles * 22.4, 1)} dm³`,

          `${this._round(molarVolume / moles, 1)} dm³`,

          `${this._round(volume / 2, 1)} dm³`

        ]),

      concept: "Gas Volume",

      skill: "Calculate gas volume",

      difficulty: 2,

      misconception:
        isSTP
          ? "Uses RTP molar volume at STP"
          : "Uses 22.4 dm³/mol at RTP"

    };

  }


  // ============================================================
  // CONCENTRATION
  // ============================================================

  _concentrationQuestion(seed, mode) {

    const n =
      ((seed % 5) + 1) * 0.1;

    const v =
      ((seed % 4) + 1) * 0.5;

    const concentration =
      this._round(
        this._solveConcentration(
          n,
          v
        ),
        2
      );

    const answer =
      `${concentration} mol/dm³`;


    return {

      q:
        `Exactly ${n.toFixed(1)} mol of solute is dissolved to make ${v.toFixed(1)} dm³ of solution. Calculate the concentration.`,

      ans: answer,

      hint:
        "Use C = n/V.",

      sol:
        `C = ${n.toFixed(1)} ÷ ${v.toFixed(1)} = ${answer}.`,

      steps: [

        "Step 1: Identify the number of moles.",

        "Step 2: Identify the solution volume in dm³.",

        "Step 3: Apply C = n/V.",

        `Step 4: C = ${answer}.`

      ],

      type: mode === 0
        ? "open_response"
        : "mcq",

      options:
        mode === 0
          ? null
          : this._uniqueOptions([

              answer,

              `${this._round(n * v, 2)} mol/dm³`,

              `${this._round(v / n, 2)} mol/dm³`,

              `${this._round(concentration * 2, 2)} mol/dm³`

            ]),

      concept: "Solution Concentration",

      skill: "Calculate concentration",

      difficulty: 2,

      misconception:
        "Multiplies moles by volume instead of dividing"

    };

  }


  // ============================================================
  // ACIDS / BASES / pH
  // ============================================================

  _acidBaseQuestion(seed, mode) {

    const acidic =
      seed % 2 === 0;

    const pH =
      acidic ? 2 : 12;

    const answer =
      acidic
        ? "Strongly acidic"
        : "Strongly alkaline";


    return {

      q:
        acidic
          ? `A solution has a pH of ${pH}. How should it be classified?`
          : `A solution has a pH of ${pH}. How should it be classified?`,

      ans:
        answer,

      hint:
        acidic
          ? "A pH well below 7 indicates high H⁺ concentration."
          : "A pH well above 7 indicates high OH⁻ concentration.",

      sol:
        acidic
          ? `pH ${pH} is far below 7, indicating a strongly acidic solution with relatively high H⁺ concentration.`
          : `pH ${pH} is far above 7, indicating a strongly alkaline solution with relatively high OH⁻ concentration.`,

      steps: [

        `Step 1: Compare pH ${pH} with neutral pH 7.`,

        acidic
          ? "Step 2: Since pH < 7, the solution is acidic."
          : "Step 2: Since pH > 7, the solution is alkaline.",

        acidic
          ? "Step 3: The very low pH indicates strong acidity."
          : "Step 3: The very high pH indicates strong alkalinity."

      ],

      type: mode === 2
        ? "open_response"
        : "mcq",

      options:
        mode === 2
          ? null
          : this._uniqueOptions([

              answer,

              acidic
                ? "Strongly alkaline"
                : "Strongly acidic",

              "Neutral",

              "Weakly alkaline"

            ]),

      concept: "Acids, Bases and pH",

      skill: "Interpret pH",

      difficulty: 1,

      misconception:
        acidic
          ? "Confuses low pH with alkalinity"
          : "Confuses high pH with acidity"

    };

  }


  // ============================================================
  // BONDING
  // ============================================================

  _bondingQuestion(seed, mode, lower) {

    const explicitlyCovalent =
      lower.includes("covalent");

    const explicitlyMetallic =
      lower.includes("metallic");




    if (explicitlyMetallic) {

      const metal =
        this._pick(
          this.metals,
          seed
        );

      const answer =
        "Metallic bonding involves positive metal ions attracted to a sea of delocalized electrons.";


      return {

        q:
          `Why does ${metal.name} conduct electricity as a solid?`,

        ans:
          answer,

        hint:
          "Think about the electrons present in metallic bonding.",

        sol:
          answer,

        steps: [

          "Step 1: Metallic atoms release outer electrons.",

          "Step 2: The electrons become delocalized.",

          "Step 3: These mobile electrons carry electrical charge."

        ],

        type:
          mode === 0
            ? "open_response"
            : "mcq",

        options:
          mode === 0
            ? null
            : [

                answer,

                "Because positive ions move freely through the solid.",

                "Because the atoms contain freely moving neutrons.",

                "Because metallic bonds contain water molecules."

              ],

        concept: "Chemical Bonding",

        skill: "Explain metallic bonding",

        difficulty: 2,

        misconception:
          "Believes positive ions carry the current in metals"

      };

    }


    if (explicitlyCovalent) {

      const n1 =
        this._pick(
          this.nonMetals,
          seed + 2
        );

      const n2 =
        this._pick(
          this.nonMetals,
          seed + 5
        );

      const answer =
        `A covalent bond forms when ${n1.name} and ${n2.name} share valence electrons.`;


      return {

        q:
          `What type of bonding occurs when two non-metal atoms such as ${n1.name} and ${n2.name} share valence electrons?`,

        ans:
          "Covalent bonding",

        hint:
          "Look for electron sharing between non-metals.",

        sol:
          answer,

        steps: [

          "Step 1: Identify the elements as non-metals.",

          "Step 2: Non-metals generally achieve stable outer shells by sharing electrons.",

          "Step 3: Shared electron pairs form covalent bonds."

        ],

        type:
          mode === 0
            ? "open_response"
            : "mcq",

        options:
          mode === 0
            ? null
            : [

                "Covalent bonding",

                "Ionic bonding",

                "Metallic bonding",

                "Nuclear bonding"

              ],

        concept: "Chemical Bonding",

        skill: "Identify covalent bonding",

        difficulty: 1,

        misconception:
          "Confuses electron sharing with electron transfer"

      };

    }


    // ----------------------------------------------------------
    // DEFAULT: IONIC
    // ----------------------------------------------------------

    const metal =
      this._pick(
        this.metals,
        seed
      );

    const nonMetal =
      this._pick(
        this.nonMetals,
        seed + 3
      );

    const formula =
      this._ionicFormula(
        metal,
        nonMetal
      );


    const answer =
      `Ionic bonding: ${metal.name} loses ${metal.valency} electron(s) to form ${metal.ion}, while ${nonMetal.name} gains electron(s) to form ${nonMetal.ion}. The ions form a lattice in the ratio represented by ${formula}.`;


    return {

      q:
        `When ${metal.name} (${metal.configuration}) reacts with ${nonMetal.name} (${nonMetal.configuration}), what type of bond forms and what is the resulting formula?`,

      ans:
        answer,

      hint:
        "A metal transfers electrons to a non-metal. Balance the resulting ion charges.",

      sol:
        answer,

      steps: [

        `Step 1: ${metal.name} is a metal and tends to lose ${metal.valency} valence electron(s).`,

        `Step 2: It forms ${metal.ion}.`,

        `Step 3: ${nonMetal.name} gains electrons to form ${nonMetal.ion}.`,

        `Step 4: Balance the ion charges using the smallest whole-number ratio.`,

        `Step 5: The resulting formula is ${formula}.`

      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : [

              answer,

              "Covalent bonding; electrons are shared equally.",

              "Metallic bonding; both elements form positive ions.",

              "Hydrogen bonding; neutral atoms attract each other."

            ],

      concept: "Chemical Bonding",

      skill: "Determine ionic bonding and formula",

      difficulty: 2,

      misconception:
        "Confuses electron sharing with electron transfer"

    };

  }


  // ============================================================
  // KINETICS
  // ============================================================

  _kineticsQuestion(seed, mode) {

    const answer =
      "MnO₂ acts as a catalyst by providing an alternative reaction pathway with lower activation energy.";


    return {

      q:
        `A chemist adds MnO₂ powder to hydrogen peroxide. Oxygen gas is produced much faster, but the MnO₂ is recovered unchanged at the end. What is the role of MnO₂?`,

      ans:
        answer,

      hint:
        "A catalyst changes reaction rate without being permanently consumed.",

      why:
        "A catalyst provides an alternative reaction pathway with lower activation energy, increasing the fraction of successful collisions.",

      sol:
        answer,

      steps: [

        "Step 1: Observe that the reaction becomes faster.",

        "Step 2: Observe that MnO₂ is recovered unchanged.",

        "Step 3: Identify MnO₂ as a catalyst.",

        "Step 4: A catalyst lowers the activation energy by providing an alternative pathway."

      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : [

              answer,

              "MnO₂ is consumed completely to produce oxygen.",

              "MnO₂ permanently increases the temperature of the solution.",

              "MnO₂ changes the equilibrium constant."

            ],

      concept: "Rates of Reaction",

      skill: "Explain catalyst action",

      difficulty: 2,

      misconception:
        "Believes catalysts are consumed or change the equilibrium constant"

    };

  }


  // ============================================================
  // GENERIC NUMERIC MUTATION
  // ============================================================

  _genericNumericMutation(
    qObj,
    stem,
    numbers,
    seed
  ) {

    const oldValue =
      parseFloat(
        numbers[0]
      );

    if (
      !Number.isFinite(oldValue) ||
      oldValue <= 0
    ) {

      return {
        ...qObj,
        q: stem
      };

    }


    const factors =
      [1, 1.5, 2, 2.5];

    const factor =
      factors[
        seed % factors.length
      ];

    const newValue =
      this._round(
        oldValue * factor,
        2
      );

    const mutatedStem =
      stem.replace(
        numbers[0],
        String(newValue)
      );


    return {

      ...qObj,

      q:
        `[Chemical Variant] ${mutatedStem}`,

      /*
       * IMPORTANT:
       *
       * We deliberately do NOT claim that the old answer
       * remains correct.
       *
       * The parent question should be re-solved by the
       * calling solver when numerical mutation is used.
       */

      ans:
        qObj.ans,

      hint:
        qObj.hint ||
        "Identify the changed chemical quantity and recalculate.",

      why:
        `The original value ${oldValue} was changed to ${newValue}. The answer must therefore be recalculated.`,

      sol:
        qObj.sol ||
        "Recalculate using the updated quantity.",

      steps: Array.isArray(qObj.steps) && qObj.steps.length > 0
        ? qObj.steps.map(s => s.replace(new RegExp(`\\b${oldValue}\\b`, "g"), String(newValue)))
        : [
            `Step 1: Note the updated chemical quantity: ${newValue} (modified from ${oldValue}).`,
            `Step 2: Substitute ${newValue} into the chemical equation or relationship.`,
            `Step 3: Perform the calculation using ${newValue} to find the updated result.`,
            `Step 4: Express the final result with standard chemical units.`
          ],

      type:
        qObj.type || "open_response",

      concept:
        qObj.concept ||
        "Chemical Calculation",

      skill:
        qObj.skill ||
        "Apply chemical equations",

      difficulty:
        qObj.difficulty ||
        2,

      mutation: {

        originalValue: oldValue,

        newValue

      }

    };

  }


  // ============================================================
  // GENERIC REVERSE QUESTION
  // ============================================================

  _genericQuestion(
    qObj,
    stem,
    rawAns
  ) {

    return {

      q:
        `[Chemical Principle Inquiry] Regarding: "${stem}" Which fundamental chemical principle explains this?`,

      ans:
        rawAns,

      hint:
        qObj.hint ||
        "Identify the chemical law, structure, reaction, or principle responsible.",

      why:
        qObj.why ||
        `Chemical principle: ${rawAns}`,

      sol:
        qObj.sol ||
        qObj.why ||
        rawAns,

      steps: [

        "Step 1: Identify the chemical system or observation.",

        "Step 2: Identify the relevant chemical principle.",

        "Step 3: Connect the principle to the observation.",

        "Step 4: State the conclusion."

      ],

      type:
        "mcq",

      options:
        this._uniqueOptions([

          rawAns,

          "Le Chatelier's principle",

          "Conservation of mass",

          "Electrostatic attraction between charged particles"

        ]),

      concept:
        qObj.concept ||
        "General Chemistry",

      skill:
        qObj.skill ||
        "Explain chemical principles",

      difficulty:
        qObj.difficulty ||
        2,

      misconception:
        null

    };

  }


  // ============================================================
  // OPTION CLEANING
  // ============================================================

  _uniqueOptions(options) {

    const cleaned =
      [];

    for (const option of options) {

      if (
        option == null ||
        option === ""
      ) {
        continue;
      }

      if (
        !cleaned.includes(option)
      ) {

        cleaned.push(option);

      }

    }


    /*
     * Guarantee four options.
     */

    const fallbacks = [

      "None of the above",

      "The quantities cannot be determined",

      "The reaction does not occur",

      "Insufficient information"

    ];


    for (
      const fallback of fallbacks
    ) {

      if (
        cleaned.length >= 4
      ) {
        break;
      }

      if (
        !cleaned.includes(fallback)
      ) {

        cleaned.push(
          fallback
        );

      }

    }


    return cleaned.slice(
      0,
      4
    );

  }


  // ============================================================
  // QUESTION VALIDATOR
  // ============================================================

  validateQuestion(question) {

    if (!question) {
      return false;
    }

    if (
      typeof question.q !== "string" ||
      question.q.trim().length === 0
    ) {
      return false;
    }

    if (
      typeof question.ans !== "string" ||
      question.ans.trim().length === 0
    ) {
      return false;
    }


    if (
      question.type === "mcq"
    ) {

      if (
        !Array.isArray(
          question.options
        )
      ) {

        return false;

      }

      if (
        question.options.length !== 4
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

    }


    return true;

  }


  // ============================================================
  // SAFE MUTATION WRAPPER
  // ============================================================

  safeMutate(
    qObj,
    modalityIndex = 0
  ) {

    const question =
      this.mutate(
        qObj,
        modalityIndex
      );


    if (
      !this.validateQuestion(
        question
      )
    ) {

      return {

        ...qObj,

        q:
          qObj.q ||
          qObj.stem ||
          "",

        ans:
          String(
            qObj.ans || ""
          ),

        hint:
          "Review the chemical quantities and apply the appropriate principle.",

        type:
          qObj.type ||
          "open_response",

        options:
          qObj.type === "mcq"
            ? this._uniqueOptions([
                qObj.ans,
                "Incorrect calculation",
                "Incorrect chemical principle",
                "Insufficient information"
              ])
            : null,

        concept:
          qObj.concept ||
          "General Chemistry",

        skill:
          qObj.skill ||
          "Apply chemical principles",

        difficulty:
          qObj.difficulty ||
          1

      };

    }


    return question;

  }

}