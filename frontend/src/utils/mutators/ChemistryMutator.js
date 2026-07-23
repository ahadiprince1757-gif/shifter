/**
 * Chemistry Subject Mutator
 * Intelligent Chemistry Engine:
 * - Dynamic Moles ($n = m/M$), Concentration ($C = n/V$), and Gas Law ($P_1 V_1 = P_2 V_2$) solver.
 * - Lab Experiment Scenarios for Acid-Base Titration, Indicators, Rates of Reaction, and Bonding.
 * - Generates 4 plausible chemical MCQ options with correct units (mol, g, mol/dm³, pH).
 * - Step-by-step stoichiometric and chemical reaction breakdowns.
 */

export class ChemistryMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Stoichiometry & Moles Calculation (n = m / M)
    if (lower.includes("moles") || lower.includes("molar mass") || lower.includes("stoichiometry") || lower.includes("grams") || lower.includes("mass") || lower.includes("nacl") || lower.includes("caco3")) {
      const mass = (Math.floor(Math.random() * 8) + 2) * 10; // 20 to 90 g
      const molarMass = lower.includes("caco3") ? 100 : (lower.includes("nacl") ? 58.5 : 40); // CaCO3 = 100, NaCl = 58.5, NaOH = 40
      const compound = lower.includes("caco3") ? "Calcium Carbonate (CaCO₃)" : (lower.includes("nacl") ? "Sodium Chloride (NaCl)" : "Sodium Hydroxide (NaOH)");

      const moles = (mass / molarMass).toFixed(2);

      return {
        q: `[Quantitative Chemistry Lab] A student weighs out a ${mass} g sample of pure ${compound} (Molar Mass = ${molarMass} g/mol) for a reaction. Calculate the number of moles of ${compound} present in the sample.`,
        ans: `${moles} mol`,
        hint: "Formula: Moles (n) = Mass in grams (m) ÷ Molar Mass (M)",
        why: `Given Mass m = ${mass} g, Molar Mass M = ${molarMass} g/mol.\nMoles n = ${mass} / ${molarMass} = ${moles} mol.`,
        sol: `${moles} mol`,
        steps: [
          `Step 1: Identify parameters: Mass = ${mass} g, Molar Mass = ${molarMass} g/mol`,
          `Step 2: Apply formula: Moles = Mass ÷ Molar Mass`,
          `Step 3: Divide: ${mass} ÷ ${molarMass} = ${moles} moles (mol)`
        ],
        type: "mcq",
        options: [
          `${moles} mol`,
          `${(mass * molarMass).toLocaleString()} mol`,
          `${(molarMass / mass).toFixed(2)} mol`,
          `${(parseFloat(moles) * 2).toFixed(2)} mol`
        ]
      };
    }

    // 2. Solution Concentration & Molarity (C = n / V)
    if (lower.includes("concentration") || lower.includes("molarity") || lower.includes("solution") || lower.includes("dm3") || lower.includes("litres")) {
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

    // 3. Acid-Base Titration & pH Indicators
    if (lower.includes("acid") || lower.includes("base") || lower.includes("ph") || lower.includes("indicator") || lower.includes("litmus") || lower.includes("neutral")) {
      const isAcid = Math.random() > 0.5;
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

    // 4. Chemical Bonding & Periodic Trends (Ionic, Covalent, Metallic)
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

    // 5. Rates of Reaction & Catalysts
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

    // 6. Generic Reverse Diagnostic Chemical Scenario
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Chemical Principles Investigation] Regarding: "${stem}"\nWhat chemical principle or reaction law explains this outcome?`,
        ans: rawAns,
        hint: qObj.hint || "Relate chemical observations to bonding, reactivity, or stoichiometry laws.",
        why: qObj.why || `Chemical principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze reactants, products, or physical state changes",
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
