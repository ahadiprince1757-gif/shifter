/**
 * Chemistry Subject Mutator (Enhanced)
 * Intelligent, Diverse Chemistry Engine:
 * - Dynamic Molar Mass ($M$), Moles ($n = m/M$), Mass ($m = n \times M$), Stoichiometric Ratios, Gas Volumes ($V = n \times 24\text{ dm}^3$).
 * - Solution Concentration ($C = n/V$), Acid-Base Titration & pH, Chemical Bonding, and Reaction Kinetics.
 * - Deterministic hashing ensures distinct questions, compounds, and equations within the same quiz module.
 * - Generates 4 plausible chemical MCQ options with correct units (mol, g, g/mol, mol/dm³, dm³, pH).
 * - Step-by-step stoichiometric and chemical reaction breakdowns.
 */

export class ChemistryMutator {
  constructor() {
    this.compounds = [
      { name: "Calcium Carbonate", formula: "CaCO₃", molarMass: 100, breakdown: "Ca(40) + C(12) + 3×O(16) = 100 g/mol" },
      { name: "Sodium Chloride", formula: "NaCl", molarMass: 58.5, breakdown: "Na(23) + Cl(35.5) = 58.5 g/mol" },
      { name: "Sodium Hydroxide", formula: "NaOH", molarMass: 40, breakdown: "Na(23) + O(16) + H(1) = 40 g/mol" },
      { name: "Sulfuric Acid", formula: "H₂SO₄", molarMass: 98, breakdown: "2×H(1) + S(32) + 4×O(16) = 98 g/mol" },
      { name: "Carbon Dioxide", formula: "CO₂", molarMass: 44, breakdown: "C(12) + 2×O(16) = 44 g/mol" },
      { name: "Water", formula: "H₂O", molarMass: 18, breakdown: "2×H(1) + O(16) = 18 g/mol" },
      { name: "Ammonia", formula: "NH₃", molarMass: 17, breakdown: "N(14) + 3×H(1) = 17 g/mol" },
      { name: "Magnesium Hydroxide", formula: "Mg(OH)₂", molarMass: 58.3, breakdown: "Mg(24.3) + 2×(O(16)+H(1)) = 58.3 g/mol" },
      { name: "Copper(II) Sulfate", formula: "CuSO₄", molarMass: 159.5, breakdown: "Cu(63.5) + S(32) + 4×O(16) = 159.5 g/mol" },
      { name: "Glucose", formula: "C₆H₁₂O₆", molarMass: 180, breakdown: "6×C(12) + 12×H(1) + 6×O(16) = 180 g/mol" },
      { name: "Nitric Acid", formula: "HNO₃", molarMass: 63, breakdown: "H(1) + N(14) + 3×O(16) = 63 g/mol" },
      { name: "Iron(III) Oxide", formula: "Fe₂O₃", molarMass: 160, breakdown: "2×Fe(56) + 3×O(16) = 160 g/mol" },
    ];

    this.reactions = [
      {
        equation: "2H₂ + O₂ ➔ 2H₂O",
        ratioText: "2 moles of H₂ react with 1 mole of O₂ to produce 2 moles of H₂O",
        r1: "H₂", r2: "O₂", p: "H₂O",
        r1_coeff: 2, r2_coeff: 1, p_coeff: 2
      },
      {
        equation: "N₂ + 3H₂ ➔ 2NH₃",
        ratioText: "1 mole of N₂ reacts with 3 moles of H₂ to produce 2 moles of NH₃",
        r1: "N₂", r2: "H₂", p: "NH₃",
        r1_coeff: 1, r2_coeff: 3, p_coeff: 2
      },
      {
        equation: "CaCO₃ + 2HCl ➔ CaCl₂ + H₂O + CO₂",
        ratioText: "1 mole of CaCO₃ reacts with 2 moles of HCl to produce 1 mole of CO₂",
        r1: "CaCO₃", r2: "HCl", p: "CO₂",
        r1_coeff: 1, r2_coeff: 2, p_coeff: 1
      },
      {
        equation: "2Mg + O₂ ➔ 2MgO",
        ratioText: "2 moles of Mg react with 1 mole of O₂ to produce 2 moles of MgO",
        r1: "Mg", r2: "O₂", p: "MgO",
        r1_coeff: 2, r2_coeff: 1, p_coeff: 2
      },
      {
        equation: "CH₄ + 2O₂ ➔ CO₂ + 2H₂O",
        ratioText: "1 mole of CH₄ reacts with 2 moles of O₂ to produce 1 mole of CO₂ and 2 moles of H₂O",
        r1: "CH₄", r2: "O₂", p: "CO₂",
        r1_coeff: 1, r2_coeff: 2, p_coeff: 1
      }
    ];
  }

  _hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");
    const seed = this._hash(stem + (qObj.id || ""));

    // ── 1. Direct Molar Mass Calculation (e.g. "molar mass of", "relative formula mass") ──
    if (lower.includes("molar mass of") || lower.includes("relative formula mass") || lower.includes("rfm") || lower.includes("calculate the molar mass")) {
      const cmp = this.compounds[seed % this.compounds.length];
      const mm = cmp.molarMass;
      return {
        q: `[Stoichiometry] Calculate the molar mass (relative formula mass) of ${cmp.name} (${cmp.formula}).`,
        ans: `${mm} g/mol`,
        hint: `Sum the atomic masses of all constituent atoms in ${cmp.formula}.`,
        why: `Atomic mass breakdown for ${cmp.formula}: ${cmp.breakdown}. Total Molar Mass = ${mm} g/mol.`,
        sol: `${mm} g/mol`,
        steps: [
          `Step 1: Identify constituent elements in ${cmp.formula}`,
          `Step 2: Multiply atomic masses by subscript counts: ${cmp.breakdown}`,
          `Step 3: Sum to get total molar mass: ${mm} g/mol`
        ],
        type: "mcq",
        options: [
          `${mm} g/mol`,
          `${(mm * 1.5).toFixed(1)} g/mol`,
          `${(mm - 16 > 0 ? mm - 16 : mm + 12)} g/mol`,
          `${(mm / 2).toFixed(1)} g/mol`
        ]
      };
    }

    // ── 2. Mass to Moles Calculation (n = m / M) ──
    if (lower.includes("moles in") || lower.includes("number of moles") || lower.includes("how many moles") || lower.includes("calculate the moles")) {
      const cmp = this.compounds[seed % this.compounds.length];
      const multiplier = (seed % 6) + 2; // 2 to 7
      const mass = parseFloat((cmp.molarMass * (multiplier * 0.25)).toFixed(1));
      const moles = (mass / cmp.molarMass).toFixed(2);

      return {
        q: `[Quantitative Chemistry] A student weighs out a ${mass} g sample of pure ${cmp.name} (${cmp.formula}, Molar Mass = ${cmp.molarMass} g/mol). Calculate the number of moles present in the sample.`,
        ans: `${moles} mol`,
        hint: "Formula: Moles (n) = Mass in grams (m) ÷ Molar Mass (M)",
        why: `Given Mass m = ${mass} g, Molar Mass M = ${cmp.molarMass} g/mol.\nMoles n = ${mass} / ${cmp.molarMass} = ${moles} mol.`,
        sol: `${moles} mol`,
        steps: [
          `Step 1: Note parameters: Mass = ${mass} g, Molar Mass = ${cmp.molarMass} g/mol`,
          `Step 2: Apply formula: Moles = Mass ÷ Molar Mass`,
          `Step 3: Calculate: ${mass} ÷ ${cmp.molarMass} = ${moles} mol`
        ],
        type: "mcq",
        options: [
          `${moles} mol`,
          `${(mass * cmp.molarMass).toLocaleString()} mol`,
          `${(cmp.molarMass / mass).toFixed(2)} mol`,
          `${(parseFloat(moles) * 2).toFixed(2)} mol`
        ]
      };
    }

    // ── 3. Moles to Mass Calculation (m = n * M) ──
    if (lower.includes("mass of") || lower.includes("calculate the mass") || lower.includes("how many grams") || lower.includes("grams of")) {
      const cmp = this.compounds[(seed + 1) % this.compounds.length];
      const moles = parseFloat((((seed % 8) + 1) * 0.25).toFixed(2)); // 0.25 to 2.0 mol
      const mass = (moles * cmp.molarMass).toFixed(1);

      return {
        q: `[Stoichiometric Mass] Calculate the mass in grams of ${moles} moles of ${cmp.name} (${cmp.formula}, Molar Mass = ${cmp.molarMass} g/mol).`,
        ans: `${mass} g`,
        hint: "Formula: Mass in grams (m) = Moles (n) × Molar Mass (M)",
        why: `Given Moles n = ${moles} mol, Molar Mass M = ${cmp.molarMass} g/mol.\nMass m = ${moles} × ${cmp.molarMass} = ${mass} g.`,
        sol: `${mass} g`,
        steps: [
          `Step 1: Note parameters: Moles n = ${moles} mol, Molar Mass M = ${cmp.molarMass} g/mol`,
          `Step 2: Apply formula: Mass = Moles × Molar Mass`,
          `Step 3: Calculate: ${moles} × ${cmp.molarMass} = ${mass} g`
        ],
        type: "mcq",
        options: [
          `${mass} g`,
          `${(cmp.molarMass / moles).toFixed(1)} g`,
          `${(parseFloat(mass) * 1.5).toFixed(1)} g`,
          `${(moles / cmp.molarMass).toFixed(3)} g`
        ]
      };
    }

    // ── 4. Stoichiometric Reaction Ratios & Equations ──
    if (lower.includes("stoichiometry") || lower.includes("balanced equation") || lower.includes("reacts with") || lower.includes("produced") || lower.includes("reaction ratio")) {
      const rxn = this.reactions[seed % this.reactions.length];
      const startMoles = ((seed % 5) + 1) * 2; // 2, 4, 6, 8, 10
      const producedMoles = (startMoles * (rxn.p_coeff / rxn.r1_coeff)).toFixed(1);

      return {
        q: `[Stoichiometry Ratios] Given the balanced chemical equation: ${rxn.equation}\nHow many moles of ${rxn.p} are produced when ${startMoles} moles of ${rxn.r1} react completely with excess ${rxn.r2}?`,
        ans: `${producedMoles} mol`,
        hint: `Use the mole ratio from the balanced equation: ${rxn.r1_coeff} mol ${rxn.r1} : ${rxn.p_coeff} mol ${rxn.p}`,
        why: `According to ${rxn.equation}, ${rxn.ratioText}.\nFor ${startMoles} moles of ${rxn.r1}: (${startMoles} × ${rxn.p_coeff}) ÷ ${rxn.r1_coeff} = ${producedMoles} moles of ${rxn.p}.`,
        sol: `${producedMoles} mol`,
        steps: [
          `Step 1: Identify mole ratio from equation: ${rxn.r1_coeff} mol ${rxn.r1} ➔ ${rxn.p_coeff} mol ${rxn.p}`,
          `Step 2: Set up proportion: Moles ${rxn.p} = (${startMoles} × ${rxn.p_coeff}) ÷ ${rxn.r1_coeff}`,
          `Step 3: Calculate final answer: ${producedMoles} moles`
        ],
        type: "mcq",
        options: [
          `${producedMoles} mol`,
          `${startMoles} mol`,
          `${(startMoles * rxn.r1_coeff).toFixed(1)} mol`,
          `${(parseFloat(producedMoles) / 2).toFixed(1)} mol`
        ]
      };
    }

    // ── 5. Gas Volume at STP / RTP (V = n * 24 dm³) ──
    if (lower.includes("gas volume") || lower.includes("molar volume") || lower.includes("dm3") || lower.includes("rtp") || lower.includes("stp")) {
      const gases = [
        { name: "Carbon Dioxide", formula: "CO₂" },
        { name: "Oxygen", formula: "O₂" },
        { name: "Nitrogen", formula: "N₂" },
        { name: "Hydrogen", formula: "H₂" },
        { name: "Methane", formula: "CH₄" }
      ];
      const g = gases[seed % gases.length];
      const moles = parseFloat((((seed % 6) + 1) * 0.5).toFixed(1)); // 0.5 to 3.0 mol
      const molarVolume = 24; // dm³/mol at RTP
      const vol = (moles * molarVolume).toFixed(1);

      return {
        q: `[Gas Chemistry] Calculate the volume occupied by ${moles} moles of ${g.name} (${g.formula}) gas at Room Temperature and Pressure (RTP), where 1 mole of any gas occupies 24.0 dm³.`,
        ans: `${vol} dm³`,
        hint: "Formula: Gas Volume = Moles (n) × Molar Gas Volume (24.0 dm³/mol)",
        why: `Given Moles n = ${moles} mol, Molar Gas Volume = 24.0 dm³/mol.\nVolume V = ${moles} × 24.0 = ${vol} dm³.`,
        sol: `${vol} dm³`,
        steps: [
          `Step 1: Note parameters: Moles n = ${moles} mol, Molar Volume = 24.0 dm³/mol`,
          `Step 2: Apply formula: Volume = n × 24.0`,
          `Step 3: Compute: ${moles} × 24 = ${vol} dm³`
        ],
        type: "mcq",
        options: [
          `${vol} dm³`,
          `${(24 / moles).toFixed(1)} dm³`,
          `${(parseFloat(vol) * 1.5).toFixed(1)} dm³`,
          `${(moles * 22.4).toFixed(1)} dm³`
        ]
      };
    }

    // ── 6. Solution Concentration & Molarity (C = n / V) ──
    if (lower.includes("concentration") || lower.includes("molarity") || lower.includes("solution") || lower.includes("litres")) {
      const n = (Math.floor(Math.random() * 5) + 1) * 0.1; // 0.1 to 0.5 moles
      const v = (Math.floor(Math.random() * 4) + 1) * 0.5; // 0.5 to 2.0 dm³
      const conc = (n / v).toFixed(2);

      return {
        q: `[Solution Chemistry] Exactly ${n.toFixed(1)} moles of solute are dissolved in water to make a total solution volume of ${v.toFixed(1)} dm³. Calculate the concentration (molarity) of the solution in mol/dm³.`,
        ans: `${conc} mol/dm³`,
        hint: "Formula: Concentration (C) = Moles (n) ÷ Volume in dm³ (V)",
        why: `Given Moles n = ${n.toFixed(1)} mol, Volume V = ${v.toFixed(1)} dm³.\nConcentration C = ${n.toFixed(1)} / ${v.toFixed(1)} = ${conc} mol/dm³.`,
        sol: `${conc} mol/dm³`,
        steps: [
          `Step 1: Note given values: Moles n = ${n.toFixed(1)} mol, Volume V = ${v.toFixed(1)} dm³`,
          `Step 2: Apply formula: Concentration C = n / V`,
          `Step 3: Divide: ${n.toFixed(1)} ÷ ${v.toFixed(1)} = ${conc} mol/dm³`
        ],
        type: "mcq",
        options: [
          `${conc} mol/dm³`,
          `${(n * v).toFixed(2)} mol/dm³`,
          `${(v / n).toFixed(2)} mol/dm³`,
          `${(parseFloat(conc) * 2).toFixed(2)} mol/dm³`
        ]
      };
    }

    // ── 7. Acid-Base Titration & pH Indicators ──
    if (lower.includes("acid") || lower.includes("base") || lower.includes("ph") || lower.includes("indicator") || lower.includes("litmus") || lower.includes("neutral")) {
      const isAcid = (seed % 2) === 0;
      return {
        q: isAcid
          ? `[Chemical Analysis] A laboratory technician tests an unknown clear aqueous solution with Universal Indicator. The solution turns dark red and shows a pH reading of 2.0. How is this solution correctly classified?`
          : `[Chemical Analysis] A laboratory technician tests an unknown clear aqueous solution with Universal Indicator. The solution turns dark purple and shows a pH reading of 12.0. How is this solution correctly classified?`,
        ans: isAcid
          ? "Strongly acidic (high H⁺ ion concentration)"
          : "Strongly alkaline (high OH⁻ ion concentration)",
        hint: isAcid
          ? "pH values from 0 to 3 indicate strong acids with high H⁺ ion concentration."
          : "pH values from 11 to 14 indicate strong bases with high OH⁻ ion concentration.",
        why: isAcid
          ? "A pH of 2.0 indicates a high concentration of hydrogen ions (H⁺), characteristic of a strong acid."
          : "A pH of 12.0 indicates a high concentration of hydroxide ions (OH⁻), characteristic of a strong base.",
        sol: isAcid ? "Strongly acidic" : "Strongly alkaline",
        steps: isAcid
          ? [
              "Step 1: Observe pH reading (pH 2.0 < 7)",
              "Step 2: Interpret indicator color (Red = Highly acidic)",
              "Step 3: Conclude solution contains excess H⁺ ions"
            ]
          : [
              "Step 1: Observe pH reading (pH 12.0 > 7)",
              "Step 2: Interpret indicator color (Purple = Highly alkaline)",
              "Step 3: Conclude solution contains excess OH⁻ ions"
            ],
        type: "mcq",
        options: [
          isAcid ? "Strongly acidic (high H⁺ ion concentration)" : "Strongly alkaline (high OH⁻ ion concentration)",
          isAcid ? "Strongly alkaline (high OH⁻ ion concentration)" : "Strongly acidic (high H⁺ ion concentration)",
          "Neutral (equal H⁺ and OH⁻ concentration)",
          "Weakly basic (pH 8.5 - 9.0)"
        ]
      };
    }

    // ── 8. Chemical Bonding & Periodic Trends ──
    if (lower.includes("bond") || lower.includes("ionic") || lower.includes("covalent") || lower.includes("electron") || lower.includes("periodic") || lower.includes("valenc")) {
      return {
        q: `[Chemical Bonding Inquiry] Element X has an atomic number of 11 (2,8,1) and Element Y has an atomic number of 17 (2,8,7). What type of chemical bond forms between X and Y, and how are electrons transferred?`,
        ans: "Ionic bond; Element X transfers 1 valence electron to Element Y",
        hint: "Metals (Group 1) transfer valence electrons to non-metals (Group 7) to form oppositely charged ions.",
        why: "Element X (Sodium metal) loses 1 electron to form X⁺, while Element Y (Chlorine non-metal) gains 1 electron to form Y⁻. Electrostatic attraction forms an ionic crystal lattice.",
        sol: "Ionic bond formed by electron transfer from X to Y",
        steps: [
          "Step 1: Determine electron configurations (X = 2,8,1; Y = 2,8,7)",
          "Step 2: Identify metal (X loses 1 e⁻) and non-metal (Y gains 1 e⁻)",
          "Step 3: Conclude ionic bonding occurs via electron transfer"
        ],
        type: "mcq",
        options: [
          "Ionic bond; Element X transfers 1 valence electron to Element Y",
          "Covalent bond; Element X and Y share a pair of electrons equally",
          "Metallic bond; Delocalized sea of electrons shared between metal ions",
          "Hydrogen bond; Permanent dipole attraction between polar molecules"
        ]
      };
    }

    // ── 9. Rates of Reaction & Catalysts ──
    if (lower.includes("rate") || lower.includes("catalyst") || lower.includes("activation energy") || lower.includes("surface area") || lower.includes("collision")) {
      return {
        q: `[Reaction Kinetics Investigation] A chemist adds Manganese(IV) Oxide (MnO₂) powder to a hydrogen peroxide (H₂O₂) solution. Gas bubbles evolve 10 times faster, but the MnO₂ is fully recovered unchanged at the end. What is the role of MnO₂?`,
        ans: "It acts as a catalyst by providing an alternative pathway with lower activation energy",
        hint: "Catalysts speed up reactions without being consumed in the overall chemical equation.",
        why: "A catalyst lowers the activation energy barrier ($E_a$), allowing a higher percentage of collisions to be successful without being permanently changed.",
        sol: "Acts as a catalyst by lowering activation energy",
        steps: [
          "Step 1: Observe observation (Reaction rate increases, MnO₂ recovered unchanged)",
          "Step 2: Recall definition of a catalyst",
          "Step 3: State mechanism (Lowers activation energy $E_a$)"
        ],
        type: "mcq",
        options: [
          "It acts as a catalyst by providing an alternative pathway with lower activation energy",
          "It acts as a reactant that is consumed to produce oxygen gas",
          "It increases the kinetic temperature of the liquid solution",
          "It shifts the equilibrium constant to increase total yield"
        ]
      };
    }

    // ── 10. Smart Stem Parameter Mutation (for stems containing custom figures) ──
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      const numVal = parseFloat(numbers[0]);
      if (numVal > 0 && numVal < 1000) {
        const factor = ((seed % 4) + 2) * 0.5; // 1.0, 1.5, 2.0, 2.5
        const newVal = Math.round(numVal * factor);
        const mutatedStem = stem.replace(numbers[0], String(newVal));

        return {
          ...qObj,
          q: `[Chemical Calculation Variant] ${mutatedStem}`,
          ans: qObj.ans,
          hint: qObj.hint || "Identify given chemical quantities and apply stoichiometric equations.",
          why: `Recalculate using updated input figure ${newVal}.`,
          sol: `Updated figure ${newVal} applied.`,
          steps: [
            "Step 1: Extract modified chemical parameters from stem",
            "Step 2: Apply appropriate stoichiometry or gas formula",
            "Step 3: Solve for final answer with correct chemical units"
          ]
        };
      }
    }

    // ── 11. Generic Reverse Diagnostic Inquiry Mode ──
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Chemical Principles Inquiry] Regarding: "${stem}"\nWhich fundamental chemical principle or reaction law explains this behavior?`,
        ans: rawAns,
        hint: qObj.hint || "Relate chemical observations to bonding, reactivity, or stoichiometry laws.",
        why: qObj.why || `Chemical principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze reactants, products, or state changes",
          "Step 2: Apply relevant chemical principle or law",
          "Step 3: State conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Le Chatelier's principle shifting chemical equilibrium",
          "Law of Conservation of Mass during gas evolution",
          "Electrolytic oxidation at the positive anode"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Chemical Reaction Check] ${stem}`,
      hint: qObj.hint || "Check chemical equations and stoichiometric ratios.",
      steps: [
        "Step 1: Balance chemical equation",
        "Step 2: Apply stoichiometric ratio",
        "Step 3: Calculate final answer"
      ]
    };
  }
}
