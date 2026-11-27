/**
 * Quantity, Expression & Unit Normalizer
 *
 * Separates ExpressionParser, UnitParser, and QuantityNormalizer so that:
 * - "100 cm" === "1 m" (canonical length: m)
 * - "36 km/h" === "10 m/s" (canonical speed: m/s)
 * - "km/h", "kmh", "km hr^-1", "kilometres per hour" normalize identically
 * - Fractions ("1/2", "3/4"), percentages ("25%"), scientific notation ("3.2e-5", "1.5 × 10^3") parse cleanly
 */

const UNIT_CONVERSIONS = Object.freeze({
  // Length -> canonical: m
  m: { dimension: "length", canonical: "m", factor: 1 },
  meter: { dimension: "length", canonical: "m", factor: 1 },
  meters: { dimension: "length", canonical: "m", factor: 1 },
  metre: { dimension: "length", canonical: "m", factor: 1 },
  metres: { dimension: "length", canonical: "m", factor: 1 },
  cm: { dimension: "length", canonical: "m", factor: 0.01 },
  mm: { dimension: "length", canonical: "m", factor: 0.001 },
  km: { dimension: "length", canonical: "m", factor: 1000 },

  // Mass -> canonical: kg
  kg: { dimension: "mass", canonical: "kg", factor: 1 },
  kilogram: { dimension: "mass", canonical: "kg", factor: 1 },
  kilograms: { dimension: "mass", canonical: "kg", factor: 1 },
  g: { dimension: "mass", canonical: "kg", factor: 0.001 },
  gram: { dimension: "mass", canonical: "kg", factor: 0.001 },
  grams: { dimension: "mass", canonical: "kg", factor: 0.001 },
  mg: { dimension: "mass", canonical: "kg", factor: 1e-6 },

  // Time -> canonical: s
  s: { dimension: "time", canonical: "s", factor: 1 },
  sec: { dimension: "time", canonical: "s", factor: 1 },
  secs: { dimension: "time", canonical: "s", factor: 1 },
  second: { dimension: "time", canonical: "s", factor: 1 },
  seconds: { dimension: "time", canonical: "s", factor: 1 },
  min: { dimension: "time", canonical: "s", factor: 60 },
  mins: { dimension: "time", canonical: "s", factor: 60 },
  minute: { dimension: "time", canonical: "s", factor: 60 },
  minutes: { dimension: "time", canonical: "s", factor: 60 },
  h: { dimension: "time", canonical: "s", factor: 3600 },
  hr: { dimension: "time", canonical: "s", factor: 3600 },
  hrs: { dimension: "time", canonical: "s", factor: 3600 },
  hour: { dimension: "time", canonical: "s", factor: 3600 },
  hours: { dimension: "time", canonical: "s", factor: 3600 },

  // Speed -> canonical: m/s
  "m/s": { dimension: "speed", canonical: "m/s", factor: 1 },
  "ms-1": { dimension: "speed", canonical: "m/s", factor: 1 },
  "ms^-1": { dimension: "speed", canonical: "m/s", factor: 1 },
  "m/sec": { dimension: "speed", canonical: "m/s", factor: 1 },
  "km/h": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "km/hr": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "kmh": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "kmh-1": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "kmh^-1": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "kmhr^-1": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "kmhr-1": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },
  "kph": { dimension: "speed", canonical: "m/s", factor: 1000 / 3600 },

  // Acceleration -> canonical: m/s^2
  "m/s^2": { dimension: "acceleration", canonical: "m/s^2", factor: 1 },
  "m/s2": { dimension: "acceleration", canonical: "m/s^2", factor: 1 },
  "ms^-2": { dimension: "acceleration", canonical: "m/s^2", factor: 1 },
  "ms-2": { dimension: "acceleration", canonical: "m/s^2", factor: 1 },

  // Force / Energy / Power / Pressure
  n: { dimension: "force", canonical: "N", factor: 1 },
  newton: { dimension: "force", canonical: "N", factor: 1 },
  newtons: { dimension: "force", canonical: "N", factor: 1 },
  j: { dimension: "energy", canonical: "J", factor: 1 },
  joule: { dimension: "energy", canonical: "J", factor: 1 },
  joules: { dimension: "energy", canonical: "J", factor: 1 },
  kj: { dimension: "energy", canonical: "J", factor: 1000 },
  w: { dimension: "power", canonical: "W", factor: 1 },
  watt: { dimension: "power", canonical: "W", factor: 1 },
  watts: { dimension: "power", canonical: "W", factor: 1 },
  pa: { dimension: "pressure", canonical: "Pa", factor: 1 },
  kpa: { dimension: "pressure", canonical: "Pa", factor: 1000 },

  // Percent / Temperature
  "%": { dimension: "ratio", canonical: "%", factor: 1 },
  percent: { dimension: "ratio", canonical: "%", factor: 1 },
  "°c": { dimension: "temperature", canonical: "°C", factor: 1 },
  c: { dimension: "temperature", canonical: "°C", factor: 1 },
  k: { dimension: "temperature", canonical: "K", factor: 1 },
});

/**
 * Normalizes unit strings (handles superscripts, spaces, "per", etc.)
 */
export function normalizeUnitString(rawUnit) {
  let u = String(rawUnit || "").trim().toLowerCase();
  if (!u) return "";

  u = u
    .replace(/⁻/g, "^-")
    .replace(/¹/g, "1")
    .replace(/²/g, "2")
    .replace(/³/g, "3")
    .replace(/\bkilomet(?:er|re)s?\s+per\s+hour\b/g, "km/h")
    .replace(/\bmet(?:er|re)s?\s+per\s+second\b/g, "m/s")
    .replace(/\s+per\s+/g, "/")
    .replace(/\s+/g, "");

  return u;
}

export function getUnitSpec(rawUnit) {
  const norm = normalizeUnitString(rawUnit);
  if (!norm) return null;
  return UNIT_CONVERSIONS[norm] || { dimension: "custom", canonical: norm, factor: 1 };
}

/**
 * Parses numbers, fractions, percentages, and scientific notation.
 */
export function parseNumericExpression(rawText) {
  const s = String(rawText || "")
    .trim()
    .replace(/,/g, "")
    .replace(/×/g, "*")
    .replace(/÷/g, "/");

  if (!s) return null;

  // Word numbers for zero
  if (/^(zero|nil|none)$/i.test(s)) {
    return { value: 0, isFraction: false, isPercent: false };
  }

  // Scientific notation: e.g. 3.2 * 10^-5 or 3.2 * 10^-5 or 3.2e-5
  const sciMatch = s.match(/^(-?\d+(?:\.\d+)?)\s*(?:\*\s*10\s*\^?\s*(-?\d+)|e([+-]?\d+))$/i);
  if (sciMatch) {
    const mantissa = parseFloat(sciMatch[1]);
    const exp = parseInt(sciMatch[2] ?? sciMatch[3], 10);
    if (Number.isFinite(mantissa) && Number.isFinite(exp)) {
      return { value: mantissa * Math.pow(10, exp), isFraction: false, isPercent: false };
    }
  }

  // Mixed fraction: e.g. 1 1/2
  const mixedMatch = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const num = parseInt(mixedMatch[2], 10);
    const den = parseInt(mixedMatch[3], 10);
    if (den !== 0) {
      const sign = whole < 0 ? -1 : 1;
      return { value: whole + sign * (num / den), isFraction: true, isPercent: false };
    }
  }

  // Simple fraction: e.g. 1/2
  const fracMatch = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
      return { value: num / den, isFraction: true, isPercent: false };
    }
  }

  // Percentage: e.g. 25%
  const pctMatch = s.match(/^(-?\d+(?:\.\d+)?)\s*%$/);
  if (pctMatch) {
    const val = parseFloat(pctMatch[1]);
    if (Number.isFinite(val)) {
      return { value: val, isFraction: false, isPercent: true };
    }
  }

  // Plain decimal / integer
  const numMatch = s.match(/^(-?\d+(?:\.\d+)?)$/);
  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    if (Number.isFinite(val)) {
      return { value: val, isFraction: false, isPercent: false };
    }
  }

  return null;
}

/**
 * Normalizes a quantity string like "100 cm" or "36 km/h" into canonical units.
 */
export function normalizeQuantity(rawText) {
  const s = String(rawText || "").trim();
  if (!s) return null;

  if (/^(zero|nil)$/i.test(s)) {
    return {
      rawValue: 0,
      rawUnit: "",
      value: 0,
      unit: "",
      dimension: "dimensionless",
    };
  }

  // Extract numeric prefix + optional unit suffix
  const match = s.match(
    /^(-?\d+(?:,\d{3})*(?:\.\d+)?(?:\s*\*\s*10\s*\^?\s*-?\d+|e[+-]?\d+|\s*\/\s*\d+)?)\s*([a-zA-Z°%][a-zA-Z0-9\s/^\-⁻¹²³°%]*)?$/
  );
  if (!match) return null;

  const numParsed = parseNumericExpression(match[1]);
  if (!numParsed) return null;

  const rawUnit = (match[2] || "").trim();
  const normUnitStr = normalizeUnitString(rawUnit);

  if (!normUnitStr) {
    return {
      rawValue: numParsed.value,
      rawUnit: "",
      value: numParsed.value,
      unit: "",
      dimension: "dimensionless",
    };
  }

  const spec = getUnitSpec(normUnitStr);
  return {
    rawValue: numParsed.value,
    rawUnit: normUnitStr,
    value: Number((numParsed.value * spec.factor).toPrecision(10)),
    unit: spec.canonical,
    dimension: spec.dimension,
  };
}

/**
 * Compares two quantities semantically (e.g. "100 cm" == "1 m", "36 km/h" == "10 m/s").
 */
export function compareQuantities(qA, qB, tolerance = 1e-4) {
  const a = typeof qA === "string" ? normalizeQuantity(qA) : qA;
  const b = typeof qB === "string" ? normalizeQuantity(qB) : qB;
  if (!a || !b) return { comparable: false, equal: false };

  const numericClose = Math.abs(a.value - b.value) <= tolerance * Math.max(1, Math.abs(b.value));

  // Both have units
  if (a.unit && b.unit) {
    if (a.dimension === b.dimension && a.unit === b.unit) {
      return { comparable: true, equal: numericClose, unitMatch: true, dimensionMatch: true };
    }
    return { comparable: true, equal: false, unitMatch: false, dimensionMatch: a.dimension === b.dimension };
  }

  // One has unit, one is unitless (e.g. "0" vs "0 m")
  if (a.value === 0 && b.value === 0) {
    return { comparable: true, equal: true, unitMatch: true, dimensionMatch: true };
  }

  return {
    comparable: true,
    equal: numericClose && !b.unit, // missing unit when expected has unit is NOT fully equal
    unitMatch: !b.unit || a.unit === b.unit,
    missingUnit: Boolean(b.unit && !a.unit),
  };
}
