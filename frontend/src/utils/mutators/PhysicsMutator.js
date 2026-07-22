/**
 * Physics Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Real-World Physics Case Study / Application Scenario
 * - Mode 2: Multiple Choice Formula & Unit Discrimination
 * - Mode 3: Cloze Physics Law Completion
 * - Mode 4: Numerical Parameter Randomization with Step Guidance
 */

const PHYSICS_SCENARIOS = [
  {
    topic: "kinematics",
    keywords: ["accelerat", "velocity", "speed", "distance", "rest", "car", "motion"],
    gen: () => {
      const a = Math.floor(Math.random() * 8) + 2; // 2 to 9 m/s²
      const t = Math.floor(Math.random() * 8) + 2; // 2 to 9 s
      const d = 0.5 * a * t * t;
      const v = a * t;

      const scenarios = [
        `[Application Scenario] An electric vehicle accelerates smoothly from rest at ${a} m/s² for ${t} seconds on a test track. Calculate the total distance covered.`,
        `[Scenario] A sprinter starts from rest and accelerates at ${a} m/s² for ${t} seconds. What is the total distance traveled during this acceleration phase?`
      ];
      const qText = scenarios[Math.floor(Math.random() * scenarios.length)];

      return {
        q: qText,
        ans: `${d} m`,
        hint: "Use kinematic equation: d = ½at²",
        why: `Given a = ${a} m/s², t = ${t} s. Distance d = 0.5 × ${a} × (${t})² = ${d} m.`,
        sol: `Given a = ${a} m/s², t = ${t} s. Distance d = 0.5 × ${a} × (${t})² = ${d} m.`,
        steps: ["Step 1: Identify given variables (a = " + a + " m/s², t = " + t + " s)", "Step 2: Apply formula d = ½at²", "Step 3: Calculate total distance"],
        type: "mcq",
        options: [`${d} m`, `${v} m`, `${a * t * t} m`, `${0.5 * a * t} m`]
      };
    }
  },
  {
    topic: "electricity",
    keywords: ["current", "voltage", "resistance", "ohm", "volt", "circuit", "kettle"],
    gen: () => {
      const i = Math.floor(Math.random() * 6) + 2; // 2 to 7 A
      const r = Math.floor(Math.random() * 15) + 5; // 5 to 19 ohms
      const v = i * r;

      return {
        q: `[Circuit Scenario] An electric appliance draws a current of ${i} A when connected to a circuit with a resistance of ${r} Ω. Calculate the potential difference (voltage) across the appliance.`,
        ans: `${v} V`,
        hint: "Apply Ohm's Law: V = I × R",
        why: `Voltage V = Current (${i} A) × Resistance (${r} Ω) = ${v} V.`,
        sol: `Voltage V = Current (${i} A) × Resistance (${r} Ω) = ${v} V.`,
        steps: ["Step 1: Identify Current (I = " + i + " A) and Resistance (R = " + r + " Ω)", "Step 2: Apply Ohm's Law V = I × R", "Step 3: Multiply to get Voltage in Volts (V)"],
        type: "mcq",
        options: [`${v} V`, `${i + r} V`, `${(r / i).toFixed(1)} V`, `${v * 2} V`]
      };
    }
  }
];

export class PhysicsMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Scenario Match
    const match = PHYSICS_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Physics Law Completion
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Physics Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Missing physical term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Complete principle: ${qObj.ans}`,
          sol: qObj.why || `Complete principle: ${qObj.ans}`,
          steps: ["Step 1: Read physics statement", "Step 2: Identify missing law/unit", "Step 3: State answer"]
        };
      }
    }

    // 3. Fallback Parameter Randomization
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      let mutatedStem = qObj.q || qObj.stem || "";
      numbers.forEach(n => {
        const val = parseFloat(n);
        if (val > 0 && val < 1000) {
          const newVal = Math.round(val * (1.2 + Math.random() * 0.6));
          mutatedStem = mutatedStem.replace(n, String(newVal));
        }
      });

      return {
        ...qObj,
        q: `[Physics Calculation] ${mutatedStem}`,
        ans: qObj.ans || "Calculate using updated numbers",
        hint: qObj.hint || "Identify physical constants and apply appropriate formula.",
        why: qObj.why || "Physics parameters randomized for calculation practice.",
        sol: qObj.explain || qObj.why || "Substitute updated numbers into physics equation.",
        steps: ["Step 1: List given physical quantities", "Step 2: Identify relevant equation", "Step 3: Calculate final answer"]
      };
    }

    return {
      ...qObj,
      q: `[Physics Application Check] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Check physics formulas and units",
      steps: ["Step 1: Identify physical quantities", "Step 2: Select physics law/formula", "Step 3: Solve for unknown"]
    };
  }
}
