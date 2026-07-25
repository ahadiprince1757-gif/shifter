/**
 * Physics Subject Mutator
 * Intelligent Physics Engine:
 * - Solves Kinematics, Circuits (Ohm's Law), Forces (F=ma, Work, Power), Waves & Density dynamically.
 * - Generates fresh parameters and calculates the EXACT physical answer with SI units.
 * - Converts qualitative concepts into real-world engineering/experimental diagnostic scenarios ("The Reverse Aha!").
 * - Builds 4 plausible MCQ choices with unit precision and step-by-step physical breakdown.
 */

export class PhysicsMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Electricity & Ohm's Law / Circuits (V = I * R, P = V * I)
    if (lower.includes("current") || lower.includes("voltage") || lower.includes("resistance") || lower.includes("ohm") || lower.includes("circuit") || lower.includes("potentiometer")) {
      const i = Math.floor(Math.random() * 5) + 2; // 2 to 6 A
      const r = (Math.floor(Math.random() * 8) + 2) * 5; // 10 to 45 ohms
      const v = i * r;
      const p = v * i;

      const isPower = lower.includes("power") || lower.includes("watt");

      if (isPower) {
        return {
          q: `[Circuit Diagnostics] An electrical appliance draws a current of ${i} A when connected across a potential difference of ${v} V. Calculate the electrical power consumed by the appliance.`,
          ans: `${p} W`,
          hint: "Formula: Power (P) = Voltage (V) × Current (I)",
          why: `Given V = ${v} V, I = ${i} A.\nPower P = ${v} V × ${i} A = ${p} W (Watts).`,
          sol: `${p} W`,
          steps: [
            `Step 1: Identify given electrical parameters: V = ${v} V, I = ${i} A`,
            `Step 2: Apply power formula: P = V × I`,
            `Step 3: Calculate: ${v} × ${i} = ${p} Watts (W)`
          ],
          type: "mcq",
          options: [`${p} W`, `${v + i} W`, `${v * 2} W`, `${(v / i).toFixed(1)} W`]
        };
      } else {
        return {
          q: `[Circuit Analysis] A circuit element with a resistance of ${r} Ω has a steady current of ${i} A flowing through it. Calculate the voltage (potential difference) across its terminals.`,
          ans: `${v} V`,
          hint: "Apply Ohm's Law: Voltage (V) = Current (I) × Resistance (R)",
          why: `Given I = ${i} A, R = ${r} Ω.\nVoltage V = ${i} A × ${r} Ω = ${v} V.`,
          sol: `${v} V`,
          steps: [
            `Step 1: Note parameters: I = ${i} A, R = ${r} Ω`,
            `Step 2: Apply Ohm's Law formula: V = I × R`,
            `Step 3: Compute Voltage: ${i} × ${r} = ${v} Volts (V)`
          ],
          type: "mcq",
          options: [`${v} V`, `${r + i} V`, `${(r / i).toFixed(1)} V`, `${v * 2} V`]
        };
      }
    }

    // 2. Newton's Laws & Mechanics (F = m * a, Work = F * d, Momentum = m * v)
    if (lower.includes("force") || lower.includes("mass") || lower.includes("acceleration") || lower.includes("momentum") || lower.includes("newton") || lower.includes("friction")) {
      const m = (Math.floor(Math.random() * 8) + 2) * 5; // 10 to 45 kg
      const a = Math.floor(Math.random() * 6) + 2; // 2 to 7 m/s²
      const f = m * a;

      if (lower.includes("work") || lower.includes("joule")) {
        const d = Math.floor(Math.random() * 8) + 2; // 2 to 9 m
        const work = f * d;
        return {
          q: `[Engineering Application] A net force of ${f} N is applied to push a box across a horizontal floor through a distance of ${d} m. Calculate the total work done on the box.`,
          ans: `${work} J`,
          hint: "Formula: Work Done = Force × Distance",
          why: `Given Force F = ${f} N, Distance d = ${d} m.\nWork W = ${f} N × ${d} m = ${work} J (Joules).`,
          sol: `${work} J`,
          steps: [
            `Step 1: Identify given force F = ${f} N, distance d = ${d} m`,
            `Step 2: Apply work formula: W = F × d`,
            `Step 3: Multiply: ${f} × ${d} = ${work} Joules (J)`
          ],
          type: "mcq",
          options: [`${work} J`, `${f + d} J`, `${work * 2} J`, `${(work / 2).toFixed(0)} J`]
        };
      }

      return {
        q: `[Dynamics Check] A rocket payload with a mass of ${m} kg experiences a constant net force of ${f} N during liftoff. Calculate the acceleration of the payload.`,
        ans: `${a} m/s²`,
        hint: "Apply Newton's Second Law: Acceleration (a) = Force (F) ÷ Mass (m)",
        why: `Given F = ${f} N, m = ${m} kg.\nAcceleration a = ${f} N ÷ ${m} kg = ${a} m/s².`,
        sol: `${a} m/s²`,
        steps: [
          `Step 1: State Newton's 2nd Law: F = m × a`,
          `Step 2: Rearrange for acceleration: a = F / m`,
          `Step 3: Calculate: ${f} ÷ ${m} = ${a} m/s²`
        ],
        type: "mcq",
        options: [`${a} m/s²`, `${a * 2} m/s²`, `${(f * m)} m/s²`, `${Math.max(1, a - 1)} m/s²`]
      };
    }

    // 3. Kinematics & Motion (d = 1/2 a t², v = u + at)
    if (lower.includes("speed") || lower.includes("velocity") || lower.includes("accelerat") || lower.includes("motion") || lower.includes("rest") || lower.includes("kinematic")) {
      const a = Math.floor(Math.random() * 5) + 2; // 2 to 6 m/s²
      const t = Math.floor(Math.random() * 6) + 2; // 2 to 7 s
      const d = 0.5 * a * t * t;
      const finalV = a * t;

      return {
        q: `[Kinematics Scenario] An electric vehicle accelerates uniformly from rest at ${a} m/s² for ${t} seconds on a straight test track. Calculate the total distance covered.`,
        ans: `${d} m`,
        hint: "Since initial velocity u = 0, use d = ½at²",
        why: `Given u = 0 m/s, a = ${a} m/s², t = ${t} s.\nDistance d = 0.5 × ${a} × (${t})² = ${d} m.`,
        sol: `${d} m`,
        steps: [
          `Step 1: Identify given parameters: u = 0, a = ${a} m/s², t = ${t} s`,
          `Step 2: Apply equation: d = ut + ½at² = ½at²`,
          `Step 3: Compute: 0.5 × ${a} × ${t * t} = ${d} m`
        ],
        type: "mcq",
        options: [`${d} m`, `${finalV} m`, `${a * t * t} m`, `${(d / 2).toFixed(0)} m`]
      };
    }

    // 4. Waves, Sound & Light (v = f * lambda, Density = m / V)
    if (lower.includes("wave") || lower.includes("frequency") || lower.includes("wavelength") || lower.includes("sound") || lower.includes("light") || lower.includes("hz")) {
      const f = (Math.floor(Math.random() * 8) + 2) * 50; // 100 to 450 Hz
      const v = 340; // speed of sound in air m/s
      const lambda = (v / f).toFixed(2);

      return {
        q: `[Wave Physics] A tuning fork vibrates at a frequency of ${f} Hz in air. Taking the speed of sound in air as 340 m/s, calculate the wavelength of the emitted sound wave.`,
        ans: `${lambda} m`,
        hint: "Formula: Speed (v) = Frequency (f) × Wavelength (λ) ➔ λ = v / f",
        why: `Given v = 340 m/s, f = ${f} Hz.\nWavelength λ = 340 / ${f} = ${lambda} m.`,
        sol: `${lambda} m`,
        steps: [
          `Step 1: State wave equation: v = f × λ`,
          `Step 2: Rearrange for wavelength: λ = v / f`,
          `Step 3: Divide speed by frequency: 340 / ${f} = ${lambda} m`
        ],
        type: "mcq",
        options: [`${lambda} m`, `${(f / 340).toFixed(2)} m`, `${(340 * f).toLocaleString()} m`, `${(lambda * 2)} m`]
      };
    }

    // 5. Reverse Diagnostic Inquiry Mode for Qualitative Physics Questions
    if (qObj.ans && typeof qObj.ans === "string") {
      return {
        q: `[Physics Principles Diagnostic] Regarding the physical phenomenon described in: "${stem}"\nWhich core physical law or fundamental principle governs this behavior?`,
        ans: rawAns,
        hint: qObj.hint || "Relate the physical observation to the governing physical law.",
        why: qObj.why || `The governing physical law is: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze the physical setup or observation described",
          "Step 2: Identify the underlying physical law or conservation principle",
          "Step 3: State the governing concept clearly"
        ]
      };
    }

    // 6. Generic Parameter Randomizer Fallback
    const numbers = stem.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length >= 1) {
      const numVal = parseFloat(numbers[0]);
      if (numVal > 0 && numVal < 1000) {
        const newVal = Math.round(numVal * 1.5);
        const mutatedStem = stem.replace(numbers[0], String(newVal));

        return {
          ...qObj,
          q: `[Physics Parameter Retry] ${mutatedStem}`,
          ans: qObj.ans,
          hint: qObj.hint || "Identify physical constants and apply the appropriate physics formula.",
          why: "Parameters updated for calculation verification.",
          sol: `Recalculate using updated figure ${newVal}.`,
          steps: [
            "Step 1: Extract new physical quantities from question stem",
            "Step 2: Select governing physics equation",
            "Step 3: Calculate final answer with correct SI units"
          ]
        };
      }
    }

    return {
      ...qObj,
      q: `[Physics Application Check] ${stem}`,
      hint: qObj.hint || "Verify formulas and SI units.",
      steps: [
        "Step 1: Identify physical quantities",
        "Step 2: Apply governing physics formula",
        "Step 3: Solve for unknown"
      ]
    };
  }
}
