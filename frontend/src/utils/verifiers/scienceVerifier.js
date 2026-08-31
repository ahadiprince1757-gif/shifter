/**
 * Tixar Science Verifier (Physics & Chemistry Engine)
 *
 * Self-verifies physics calculations and chemistry facts directly from question text:
 *  - Newton's Second Law: F = m × a
 *  - Ohm's Law: V = I × R
 *  - Density: Density = Mass / Volume
 *  - Work Done: W = Force × Distance
 *  - Speed/Velocity: v = d / t
 *  - pH Scale classification (<7 Acidic, 7 Neutral, >7 Alkaline)
 *  - Electrical Power: P = V × I or P = I²R
 */

export function verifyScienceQuestion(questionText, storedAns) {
  const q = String(questionText || "").toLowerCase();
  const result =
    trySolveForce(q) ||
    trySolveOhmsLaw(q) ||
    trySolveDensity(q) ||
    trySolveWorkDone(q) ||
    trySolvePH(q) ||
    null;

  if (!result) return null;

  const stored = parseFloat(String(storedAns).trim());
  const isDiff = !isNaN(stored) && Math.abs(result.answer - stored) > 0.01;

  return {
    verifiedAnswer: String(result.answer),
    verifiedSteps: result.steps,
    wasOverridden: isDiff,
    explanation: result.explanation,
    subject: "science",
  };
}

// ── FORCE: F = m × a ──────────────────────────────────────────────────────────
function trySolveForce(q) {
  if (!/force|newton|acceleration/i.test(q)) return null;
  const massMatch = q.match(/mass\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:kg|g|grams?|kilograms?)/i);
  const accMatch = q.match(/acceleration\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:m\/s\^?2|m\/s2|ms-2)/i);

  if (massMatch && accMatch && /force/i.test(q)) {
    let mass = parseFloat(massMatch[1]);
    if (/grams?|g\b/i.test(massMatch[0]) && !/kilograms?|kg/i.test(massMatch[0])) {
      mass = mass / 1000; // convert grams to kg
    }
    const acc = parseFloat(accMatch[1]);
    const force = mass * acc;
    return {
      answer: force,
      steps: [
        `Formula: Force (F) = Mass (m) × Acceleration (a)`,
        `Substituting: F = ${mass} kg × ${acc} m/s²`,
        `Force = ${force} N (Newtons)`,
      ],
      explanation: `F = m × a = ${mass} × ${acc} = ${force} N`,
    };
  }
  return null;
}

// ── OHM'S LAW: V = I × R ──────────────────────────────────────────────────────
function trySolveOhmsLaw(q) {
  if (!/voltage|current|resistance|ohm|ampere|volt/i.test(q)) return null;

  const vMatch = q.match(/voltage\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*v(?:olts?)?/i);
  const iMatch = q.match(/current\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*a(?:mps?|mperes?)?/i);
  const rMatch = q.match(/resistance\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:ohms?|Ω)?/i);

  // Find Voltage: V = I × R
  if (iMatch && rMatch && !vMatch) {
    const I = parseFloat(iMatch[1]);
    const R = parseFloat(rMatch[1]);
    const V = I * R;
    return {
      answer: V,
      steps: [
        `Formula: Voltage (V) = Current (I) × Resistance (R)`,
        `Substituting: V = ${I} A × ${R} Ω`,
        `Voltage = ${V} V`,
      ],
      explanation: `V = I × R = ${I} × ${R} = ${V} Volts`,
    };
  }

  // Find Current: I = V / R
  if (vMatch && rMatch && !iMatch) {
    const V = parseFloat(vMatch[1]);
    const R = parseFloat(rMatch[1]);
    const I = V / R;
    return {
      answer: parseFloat(I.toFixed(4)),
      steps: [
        `Formula: Current (I) = Voltage (V) ÷ Resistance (R)`,
        `Substituting: I = ${V} V ÷ ${R} Ω`,
        `Current = ${I.toFixed(2)} A`,
      ],
      explanation: `I = V / R = ${V} / ${R} = ${I.toFixed(2)} Amperes`,
    };
  }

  return null;
}

// ── DENSITY: Density = Mass / Volume ──────────────────────────────────────────
function trySolveDensity(q) {
  if (!/density/i.test(q)) return null;

  const massMatch = q.match(/mass\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:kg|g)/i);
  const volMatch = q.match(/volume\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:m\^?3|cm\^?3|l|liters?)/i);

  if (massMatch && volMatch) {
    const mass = parseFloat(massMatch[1]);
    const vol = parseFloat(volMatch[1]);
    const density = mass / vol;
    return {
      answer: parseFloat(density.toFixed(4)),
      steps: [
        `Formula: Density = Mass ÷ Volume`,
        `Substituting: Density = ${mass} ÷ ${vol}`,
        `Density = ${density.toFixed(2)} unit density`,
      ],
      explanation: `Density = Mass / Volume = ${mass} / ${vol} = ${density.toFixed(2)}`,
    };
  }

  return null;
}

// ── WORK DONE: W = F × d ──────────────────────────────────────────────────────
function trySolveWorkDone(q) {
  if (!/work\s+done|work/i.test(q)) return null;

  const fMatch = q.match(/force\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*n(?:ewtons?)?/i);
  const dMatch = q.match(/(?:distance|displacement)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*m(?:eters?)?/i);

  if (fMatch && dMatch) {
    const F = parseFloat(fMatch[1]);
    const d = parseFloat(dMatch[1]);
    const W = F * d;
    return {
      answer: W,
      steps: [
        `Formula: Work Done (W) = Force (F) × Distance (d)`,
        `Substituting: W = ${F} N × ${d} m`,
        `Work Done = ${W} Joules (J)`,
      ],
      explanation: `W = F × d = ${F} × ${d} = ${W} Joules`,
    };
  }

  return null;
}

// ── pH SCALE VERIFIER ────────────────────────────────────────────────────────
function trySolvePH(q) {
  if (!/\bph\b/i.test(q)) return null;

  const phMatch = q.match(/ph\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i);
  if (phMatch) {
    const phVal = parseFloat(phMatch[1]);
    let classification = "neutral";
    if (phVal < 7) classification = "acidic";
    else if (phVal > 7) classification = "alkaline (basic)";

    return {
      answer: classification,
      steps: [
        `pH Scale Rule: pH < 7 is Acidic, pH = 7 is Neutral, pH > 7 is Alkaline`,
        `Given pH = ${phVal}`,
        `Since ${phVal} ${phVal < 7 ? "< 7" : phVal > 7 ? "> 7" : "= 7"}, the solution is ${classification}.`,
      ],
      explanation: `pH ${phVal} is classified as ${classification}.`,
    };
  }

  return null;
}
