/**
 * Physics Subject Mutator
 * Handles physical quantities, kinematic equations, force/energy calculations,
 * and unit-aware variable mutation.
 */

const PHYSICS_FORMULAS = [
  {
    topic: "Kinematics",
    keywords: ["accelerat", "velocity", "speed", "distance", "rest"],
    formulaName: "Distance (d = ½at²)",
    gen: () => {
      const a = (Math.floor(Math.random() * 8) + 2); // 2 to 9 m/s²
      const t = (Math.floor(Math.random() * 10) + 2); // 2 to 11 s
      const d = 0.5 * a * t * t;
      return {
        q: `A body accelerates from rest at a constant rate of ${a} m/s² for ${t} seconds. Calculate the total distance traveled.`,
        ans: `${d} m`,
        hint: "Use d = ½at²",
        why: `d = 0.5 × ${a} m/s² × (${t} s)² = 0.5 × ${a} × ${t * t} = ${d} m.`,
        sol: `d = 0.5 × ${a} m/s² × (${t} s)² = 0.5 × ${a} × ${t * t} = ${d} m.`,
        steps: ["Step 1: Identify acceleration (a) and time (t)", "Step 2: Apply formula d = ½at²", "Step 3: Calculate distance"]
      };
    }
  },
  {
    topic: "Forces & Motion",
    keywords: ["force", "mass", "newton", "acceleration"],
    formulaName: "Force (F = ma)",
    gen: () => {
      const m = Math.floor(Math.random() * 45) + 5; // 5 to 50 kg
      const a = Math.floor(Math.random() * 9) + 2; // 2 to 10 m/s²
      const f = m * a;
      return {
        q: `Calculate the force required to accelerate a mass of ${m} kg at a rate of ${a} m/s².`,
        ans: `${f} N`,
        hint: "Use Newton's second law: F = m × a",
        why: `Force F = mass (${m} kg) × acceleration (${a} m/s²) = ${f} N.`,
        sol: `Force F = mass (${m} kg) × acceleration (${a} m/s²) = ${f} N.`,
        steps: ["Step 1: Identify mass (m) and acceleration (a)", "Step 2: Apply F = m × a", "Step 3: State answer in Newtons (N)"]
      };
    }
  },
  {
    topic: "Electricity",
    keywords: ["current", "voltage", "resistance", "ohm", "volt", "ampere"],
    formulaName: "Ohm's Law (V = IR)",
    gen: () => {
      const i = Math.floor(Math.random() * 8) + 1; // 1 to 8 A
      const r = Math.floor(Math.random() * 20) + 5; // 5 to 24 ohms
      const v = i * r;
      return {
        q: `Calculate the potential difference (voltage) across a resistor of ${r} Ω when a current of ${i} A flows through it.`,
        ans: `${v} V`,
        hint: "Use Ohm's Law: V = I × R",
        why: `Voltage V = Current (${i} A) × Resistance (${r} Ω) = ${v} V.`,
        sol: `Voltage V = Current (${i} A) × Resistance (${r} Ω) = ${v} V.`,
        steps: ["Step 1: Identify current (I) and resistance (R)", "Step 2: Apply V = I × R", "Step 3: Calculate voltage in Volts (V)"]
      };
    }
  }
];

export class PhysicsMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // Match matched topic formula generator
    for (const item of PHYSICS_FORMULAS) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    // Generic physics numeric mutation
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      let mutatedStem = qObj.q || qObj.stem || "";
      numbers.forEach(n => {
        const val = parseFloat(n);
        if (val > 0 && val < 1000) {
          const newVal = Math.round(val * (1.2 + Math.random() * 0.8));
          mutatedStem = mutatedStem.replace(n, String(newVal));
        }
      });

      return {
        ...qObj,
        q: mutatedStem,
        ans: qObj.ans || "Calculate using updated numbers",
        hint: qObj.hint || "Identify physical constants and apply appropriate formula.",
        why: qObj.why || "Physics parameters randomized for calculation practice.",
        sol: qObj.explain || qObj.why || "Substitute updated numbers into physics equation.",
        steps: ["Step 1: List given physical quantities", "Step 2: Identify relevant equation", "Step 3: Calculate final answer"]
      };
    }

    return {
      ...qObj,
      q: `[PHYSICS PRACTICE] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Check physics formulas and units",
      steps: ["Step 1: Identify given physical values", "Step 2: Select physics law/formula", "Step 3: Solve for unknown"]
    };
  }
}
