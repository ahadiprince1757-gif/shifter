/**
 * ============================================================================
 * TIXAR SCIENCE VERIFIER
 * ============================================================================
 *
 * Physics & Chemistry verification engine.
 *
 * Architecture:
 *   QUESTION
 *     ↓
 *   CONCEPT DETECTOR  (Formula Registry keyword matching)
 *     ↓
 *   QUANTITY EXTRACTOR  (flexible regex, not rigid label-matching)
 *     ↓
 *   UNIT NORMALIZER  (SI conversion before any calculation)
 *     ↓
 *   FORMULA SELECTOR  (registry-driven)
 *     ↓
 *   CALCULATION ENGINE
 *     ↓
 *   ANSWER FORMATTER
 *     ↓
 *   STORED ANSWER COMPARATOR  (numeric vs text, with tolerance)
 *     ↓
 *   VERIFIED RESULT  (HIGH / MEDIUM / LOW confidence)
 *
 * Supported concepts:
 *
 *   PHYSICS
 *   - Newton's Second Law    F = m × a
 *   - Ohm's Law              V = I × R  /  I = V÷R  /  R = V÷I
 *   - Density                ρ = m ÷ V  (SI unit conversion included)
 *   - Work Done              W = F × d
 *   - Speed / Velocity       v = d ÷ t
 *   - Electrical Power       P = V × I  /  P = I²R
 *
 *   CHEMISTRY
 *   - pH Classification      pH < 7 acidic, =7 neutral, >7 alkaline
 * ============================================================================
 */


/* ============================================================================
   PUBLIC API
============================================================================ */

/**
 * Verifies a science (Physics/Chemistry) question.
 *
 * @param {string} questionText
 * @param {string|number|null} storedAns  – AI-generated or stored answer to compare against
 * @returns {object|null}
 */
export function verifyScienceQuestion(questionText, storedAns = null) {
  const q = normalize(questionText);

  const result =
    trySolveForce(q) ||
    trySolveOhmsLaw(q) ||
    trySolveElectricalPower(q) ||
    trySolveDensity(q) ||
    trySolveWorkDone(q) ||
    trySolveSpeed(q) ||
    trySolvePH(q);

  if (!result) return null;

  const comparison = compareAnswers(result.answer, storedAns, result.answerType);

  return {
    verifiedAnswer: String(result.answer),
    verifiedSteps: result.steps,
    explanation: result.explanation,
    subject: result.subject || "science",
    topic: result.topic,
    formula: result.formula || null,
    answerType: result.answerType,
    confidence: result.confidence ?? 0.95,
    confidenceTier: toConfidenceTier(result.confidence),
    wasOverridden: comparison.isDifferent,
    storedAnswer: storedAns ?? null,
    comparison,
  };
}


/* ============================================================================
   ANSWER COMPARISON ENGINE
   Handles numeric, text and unit answers separately.
============================================================================ */

function compareAnswers(verifiedAnswer, storedAnswer, answerType = "number") {
  if (
    storedAnswer === null ||
    storedAnswer === undefined ||
    String(storedAnswer).trim() === ""
  ) {
    return { compared: false, isDifferent: false };
  }

  // ── NUMERIC ───────────────────────────────────────────────────────────────
  if (answerType === "number") {
    const expected = Number(verifiedAnswer);
    const stored = extractFirstNumber(storedAnswer);

    if (Number.isFinite(expected) && Number.isFinite(stored)) {
      // Tolerance: 0.1% of expected value, minimum 0.01
      const tolerance = Math.max(0.01, Math.abs(expected) * 0.001);
      const difference = Math.abs(expected - stored);

      return {
        compared: true,
        isDifferent: difference > tolerance,
        expected,
        received: stored,
        difference: roundAnswer(difference),
        tolerance: roundAnswer(tolerance),
      };
    }
  }

  // ── TEXT ──────────────────────────────────────────────────────────────────
  if (answerType === "text") {
    const expected = normalizeText(verifiedAnswer);
    const received = normalizeText(storedAnswer);

    return {
      compared: true,
      isDifferent: !textAnswersMatch(expected, received),
      expected,
      received,
    };
  }

  return { compared: false, isDifferent: false };
}

function normalizeText(answer) {
  return String(answer || "")
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function textAnswersMatch(expected, received) {
  if (expected === received) return true;
  if (expected.includes(received) || received.includes(expected)) return true;

  // pH semantic synonyms
  const SYNONYMS = {
    acidic: ["acid", "acidic"],
    neutral: ["neutral"],
    alkaline: ["alkaline", "basic", "base"],
  };

  for (const values of Object.values(SYNONYMS)) {
    if (
      values.some((w) => expected.includes(w)) &&
      values.some((w) => received.includes(w))
    ) {
      return true;
    }
  }

  return false;
}

function extractFirstNumber(value) {
  const match = String(value).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : NaN;
}

function toConfidenceTier(confidence) {
  if (confidence >= 0.9) return "HIGH";
  if (confidence >= 0.7) return "MEDIUM";
  return "LOW";
}


/* ============================================================================
   TEXT NORMALIZATION
============================================================================ */

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[²]/g, "^2")
    .replace(/\s+/g, " ")
    .trim();
}


/* ============================================================================
   QUANTITY EXTRACTOR
   Flexible: matches numbers followed by units anywhere in the question,
   not just after rigid labels like "mass of".
============================================================================ */

/**
 * Extracts the first quantity matching a unit pattern from text.
 *
 * @param {string} text
 * @param {RegExp} unitPattern  – should capture (value)(unit)
 * @returns {{ value: number, unit: string } | null}
 */
function extractQuantity(text, unitPattern) {
  const match = text.match(unitPattern);
  if (!match) return null;
  return { value: Number(match[1]), unit: normalizeUnit(match[2]) };
}

/**
 * Extracts ALL quantities matching a unit pattern from text.
 * Useful when two quantities share the same unit (e.g. two lengths).
 */
function extractAllQuantities(text, unitPattern) {
  const results = [];
  const re = new RegExp(unitPattern.source, "g");
  let match;
  while ((match = re.exec(text)) !== null) {
    results.push({ value: Number(match[1]), unit: normalizeUnit(match[2]) });
  }
  return results;
}

function normalizeUnit(unit) {
  return String(unit).toLowerCase().trim();
}


/* ============================================================================
   UNIT CONVERSION — SI
============================================================================ */

function convertMassToKg(value, unit) {
  if (unit === "kg" || unit.startsWith("kilogram")) return value;
  if (unit === "g" || unit.startsWith("gram")) return value / 1000;
  return null; // unknown unit — refuse to calculate
}

function convertVolumeToM3(value, unit) {
  if (/^m\^?3$/.test(unit)) return value;
  if (/^cm\^?3$/.test(unit)) return value / 1_000_000;
  if (unit === "l" || unit.startsWith("liter") || unit.startsWith("litre")) return value / 1000;
  if (unit === "ml") return value / 1_000_000;
  return null;
}

function convertDistanceToM(value, unit) {
  if (unit === "m" || unit.startsWith("meter") || unit.startsWith("metre")) return value;
  if (unit === "km" || unit.startsWith("kilometer") || unit.startsWith("kilometre")) return value * 1000;
  if (unit === "cm") return value / 100;
  return null;
}

function convertTimeToSeconds(value, unit) {
  if (unit === "s" || unit.startsWith("sec")) return value;
  if (unit.startsWith("min")) return value * 60;
  if (unit === "h" || unit === "hr" || unit.startsWith("hour")) return value * 3600;
  return null;
}


/* ============================================================================
   RESULT HELPERS
============================================================================ */

function roundAnswer(value, decimals = 4) {
  return Number(Number(value).toFixed(decimals));
}

function makeResult({ answer, answerType = "number", topic, formula, steps, explanation, confidence = 0.99 }) {
  return { answer: answerType === "number" ? roundAnswer(answer) : answer, answerType, topic, formula, steps, explanation, confidence };
}


/* ============================================================================
   FORCE   F = m × a
============================================================================ */

function trySolveForce(q) {
  if (!/force|newton|f\s*=|calculate.*force/.test(q)) return null;
  if (!/force/.test(q)) return null; // must explicitly ask for force

  const mass = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(kg|kilograms?|g|grams?)/);
  const acceleration = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(m\/s\^?2|m\/s2|ms-2|m\s*s-2)/);

  if (!mass || !acceleration) return null;

  const massKg = convertMassToKg(mass.value, mass.unit);
  if (massKg === null) return null;

  const a = acceleration.value;
  const force = massKg * a;

  return makeResult({
    answer: force,
    topic: "Newton's Second Law",
    formula: "F = m × a",
    steps: [
      "Step 1: Identify the formula.",
      "F = m × a",
      `Step 2: Convert mass to kg if needed. Mass = ${massKg} kg`,
      `Step 3: Acceleration = ${a} m/s²`,
      "Step 4: Substitute the values.",
      `F = ${massKg} × ${a}`,
      `F = ${roundAnswer(force)} N`,
    ],
    explanation: `Using Newton's Second Law, force = mass × acceleration = ${massKg} × ${a} = ${roundAnswer(force)} Newtons.`,
  });
}


/* ============================================================================
   OHM'S LAW   V = I × R
============================================================================ */

function trySolveOhmsLaw(q) {
  if (!/voltage|current|resistance|ohm|ampere|amps?|volt/.test(q)) return null;
  // Defer to Electrical Power if the question is about power
  if (/electrical power|calculate.*power|power.*circuit/.test(q)) return null;

  const voltage = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(v|volts?)\b/);
  const current = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(a|amps?|amperes?)\b/);
  const resistance = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(ohms?|Ω)/);

  // Find Voltage: V = I × R
  if (current && resistance && !voltage) {
    const V = current.value * resistance.value;
    return makeResult({
      answer: V,
      topic: "Ohm's Law",
      formula: "V = I × R",
      steps: [
        "Formula: V = I × R",
        `Current = ${current.value} A`,
        `Resistance = ${resistance.value} Ω`,
        `V = ${current.value} × ${resistance.value}`,
        `V = ${roundAnswer(V)} V`,
      ],
      explanation: `The voltage is ${roundAnswer(V)} Volts.`,
    });
  }

  // Find Current: I = V ÷ R
  if (voltage && resistance && !current) {
    if (resistance.value === 0) return null;
    const I = voltage.value / resistance.value;
    return makeResult({
      answer: I,
      topic: "Ohm's Law",
      formula: "I = V ÷ R",
      steps: [
        "Formula: I = V ÷ R",
        `Voltage = ${voltage.value} V`,
        `Resistance = ${resistance.value} Ω`,
        `I = ${voltage.value} ÷ ${resistance.value}`,
        `I = ${roundAnswer(I)} A`,
      ],
      explanation: `The electric current is ${roundAnswer(I)} Amperes.`,
    });
  }

  // Find Resistance: R = V ÷ I
  if (voltage && current && !resistance) {
    if (current.value === 0) return null;
    const R = voltage.value / current.value;
    return makeResult({
      answer: R,
      topic: "Ohm's Law",
      formula: "R = V ÷ I",
      steps: [
        "Formula: R = V ÷ I",
        `Voltage = ${voltage.value} V`,
        `Current = ${current.value} A`,
        `R = ${voltage.value} ÷ ${current.value}`,
        `R = ${roundAnswer(R)} Ω`,
      ],
      explanation: `The electrical resistance is ${roundAnswer(R)} Ohms.`,
    });
  }

  return null;
}


/* ============================================================================
   ELECTRICAL POWER   P = V × I  or  P = I²R
============================================================================ */

function trySolveElectricalPower(q) {
  if (!/electrical power|power.*circuit|calculate.*power/.test(q)) return null;

  const voltage = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(v|volts?)\b/);
  const current = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(a|amps?|amperes?)\b/);
  const resistance = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(ohms?|Ω)/);

  // P = V × I
  if (voltage && current) {
    const power = voltage.value * current.value;
    return makeResult({
      answer: power,
      topic: "Electrical Power",
      formula: "P = V × I",
      steps: [
        "Formula: P = V × I",
        `Voltage = ${voltage.value} V`,
        `Current = ${current.value} A`,
        `P = ${voltage.value} × ${current.value}`,
        `P = ${roundAnswer(power)} W`,
      ],
      explanation: `The electrical power is ${roundAnswer(power)} Watts.`,
    });
  }

  // P = I²R
  if (current && resistance) {
    const power = current.value ** 2 * resistance.value;
    return makeResult({
      answer: power,
      topic: "Electrical Power",
      formula: "P = I²R",
      steps: [
        "Formula: P = I²R",
        `Current = ${current.value} A`,
        `Resistance = ${resistance.value} Ω`,
        `P = (${current.value})² × ${resistance.value}`,
        `P = ${current.value ** 2} × ${resistance.value}`,
        `P = ${roundAnswer(power)} W`,
      ],
      explanation: `The electrical power is ${roundAnswer(power)} Watts.`,
    });
  }

  return null;
}


/* ============================================================================
   DENSITY   ρ = m ÷ V  (full SI unit conversion)
============================================================================ */

function trySolveDensity(q) {
  if (!/density/.test(q)) return null;

  const mass = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(kg|kilograms?|g|grams?)/);
  const volume = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(m\^?3|cm\^?3|ml|l|liters?|litres?)/);

  if (!mass || !volume) return null;

  const massKg = convertMassToKg(mass.value, mass.unit);
  const volumeM3 = convertVolumeToM3(volume.value, volume.unit);

  // Refuse to calculate if units are unknown — avoids confidently wrong answers
  if (massKg === null || volumeM3 === null || volumeM3 === 0) return null;

  const density = massKg / volumeM3;

  return makeResult({
    answer: density,
    topic: "Density",
    formula: "ρ = m ÷ V",
    steps: [
      "Formula: Density = Mass ÷ Volume",
      `Step 1: Convert mass to SI. ${mass.value} ${mass.unit} = ${roundAnswer(massKg)} kg`,
      `Step 2: Convert volume to SI. ${volume.value} ${volume.unit} = ${roundAnswer(volumeM3)} m³`,
      `Step 3: Density = ${roundAnswer(massKg)} ÷ ${roundAnswer(volumeM3)}`,
      `Density = ${roundAnswer(density)} kg/m³`,
    ],
    explanation: `After converting to SI units, density = ${roundAnswer(massKg)} kg ÷ ${roundAnswer(volumeM3)} m³ = ${roundAnswer(density)} kg/m³.`,
  });
}


/* ============================================================================
   WORK DONE   W = F × d
============================================================================ */

function trySolveWorkDone(q) {
  if (!/work\s*done|calculate\s*work|work.*force/.test(q)) return null;

  const force = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(n|newtons?)\b/);
  const distance = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(m|meters?|metres?)\b/);

  if (!force || !distance) return null;

  const work = force.value * distance.value;

  return makeResult({
    answer: work,
    topic: "Work Done",
    formula: "W = F × d",
    steps: [
      "Formula: W = F × d",
      `Force = ${force.value} N`,
      `Distance = ${distance.value} m`,
      `W = ${force.value} × ${distance.value}`,
      `W = ${roundAnswer(work)} J`,
    ],
    explanation: `The work done is ${roundAnswer(work)} Joules.`,
  });
}


/* ============================================================================
   SPEED / VELOCITY   v = d ÷ t  (unit normalization included)
============================================================================ */

function trySolveSpeed(q) {
  if (!/speed|velocity|distance.*time|time.*distance/.test(q)) return null;

  const distance = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(km|kilometers?|kilometres?|cm|m|meters?|metres?)\b/);
  const time = extractQuantity(q, /(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|seconds?|secs?|s)\b/);

  if (!distance || !time) return null;

  const distanceM = convertDistanceToM(distance.value, distance.unit);
  const timeS = convertTimeToSeconds(time.value, time.unit);

  // Refuse if we can't normalise the units — avoids wrong-unit answers
  if (distanceM === null || timeS === null || timeS === 0) return null;

  const speed = distanceM / timeS;

  return makeResult({
    answer: speed,
    topic: "Speed",
    formula: "v = d ÷ t",
    steps: [
      "Formula: Speed = Distance ÷ Time",
      `Step 1: Convert distance to metres. ${distance.value} ${distance.unit} = ${roundAnswer(distanceM)} m`,
      `Step 2: Convert time to seconds. ${time.value} ${time.unit} = ${roundAnswer(timeS)} s`,
      `Step 3: Speed = ${roundAnswer(distanceM)} ÷ ${roundAnswer(timeS)}`,
      `Speed = ${roundAnswer(speed)} m/s`,
    ],
    explanation: `The speed is ${roundAnswer(speed)} metres per second.`,
  });
}


/* ============================================================================
   pH CLASSIFICATION   (text answer — uses text comparator)
============================================================================ */

function trySolvePH(q) {
  if (!/\bph\b/.test(q)) return null;

  const match = q.match(/\bph\s*(?:of|is|=|value)?\s*(\d+(?:\.\d+)?)/);
  if (!match) return null;

  const ph = Number(match[1]);
  if (ph < 0 || ph > 14) return null;

  const classification = ph < 7 ? "acidic" : ph === 7 ? "neutral" : "alkaline";

  return {
    answer: classification,
    answerType: "text", // triggers text comparator, not numeric
    topic: "pH Scale",
    formula: null,
    steps: [
      "pH < 7 → acidic",
      "pH = 7 → neutral",
      "pH > 7 → alkaline",
      `Given: pH = ${ph}`,
      `Therefore: ${classification}`,
    ],
    explanation: `A solution with a pH of ${ph} is classified as ${classification}.`,
    confidence: 0.99,
  };
}
