/**
 * ============================================================================
 * TIXAR SAFE TRIGONOMETRY ENGINE
 * ============================================================================
 *
 * Provides asymptote-aware trig functions for use in the Math Verification
 * Engine.
 *
 * Key Design Decisions:
 * - All inputs are assumed to be in RADIANS (JS Math functions use radians).
 * - tan(x) is only rejected at genuine asymptotes (cos(x) ≈ 0),
 *   NOT at arbitrary large-value thresholds.
 * - Both a bare function form and a metadata form are exported to allow
 *   the Truth Brain to produce educational explanations, not silent NaN.
 *
 * IMPORTANT for educators:
 *   Students often work in DEGREES. Callers must convert to radians before
 *   passing values to these functions.
 *   Conversion: radians = degrees × (π / 180)
 * ============================================================================
 */

/**
 * Returns a trig function wrapped in asymptote-safe guards based on topic name.
 *
 * @param {string} [topic=""] - Topic string (e.g. "cosine", "tan", "sine")
 * @returns {Function} Safe trig function. Returns NaN at undefined points.
 */
export function safeTrigFunction(topic = "") {
  const normalizedTopic = String(topic).toLowerCase();

  try {
    if (normalizedTopic.includes("cos")) {
      return Math.cos;
    }

    if (normalizedTopic.includes("tan")) {
      return (x) => {
        if (!Number.isFinite(x)) {
          return NaN;
        }

        // tan(x) = sin(x)/cos(x) is undefined wherever cos(x) = 0 (i.e. π/2 + nπ).
        // We check the denominator directly rather than capping on tan's output value,
        // since tan(x) can legitimately be very large (e.g. tan(1.5) ≈ 14.1).
        const denominator = Math.cos(x);

        if (Math.abs(denominator) < 1e-10) {
          return NaN;
        }

        const value = Math.tan(x);

        return Number.isFinite(value) ? value : NaN;
      };
    }

    // Default: sine
    return Math.sin;
  } catch (error) {
    console.warn("[Trig Engine] Failed to select trig function:", error);
    return () => NaN;
  }
}

/**
 * Returns a trig function together with educational metadata.
 * Preferred over safeTrigFunction() when the Truth Brain needs to
 * explain WHY a value is mathematically undefined.
 *
 * @param {string} [topic=""] - Topic string
 * @returns {{ name: string, fn: Function, undefinedAt: string|Array }}
 *
 * @example
 * const { name, fn, undefinedAt } = getSafeTrigFunction("tan");
 * const result = fn(Math.PI / 2);
 * // result === NaN
 * // undefinedAt === "π/2 + nπ  (where cos(x) = 0)"
 */
export function getSafeTrigFunction(topic = "") {
  const normalized = String(topic).toLowerCase();

  if (normalized.includes("cos")) {
    return {
      name: "cos",
      fn: Math.cos,
      undefinedAt: [],
      explanation: "cos(x) is defined for all real x.",
    };
  }

  if (normalized.includes("tan")) {
    return {
      name: "tan",
      fn: (x) => {
        if (!Number.isFinite(x)) return NaN;
        if (Math.abs(Math.cos(x)) < 1e-10) return NaN;
        const value = Math.tan(x);
        return Number.isFinite(value) ? value : NaN;
      },
      undefinedAt: "π/2 + nπ  (where cos(x) = 0)",
      explanation:
        "tan(x) = sin(x) / cos(x). It is undefined wherever cos(x) = 0, " +
        "i.e. at x = π/2, 3π/2, 5π/2, ... (90°, 270°, 450°, ...).",
    };
  }

  return {
    name: "sin",
    fn: Math.sin,
    undefinedAt: [],
    explanation: "sin(x) is defined for all real x.",
  };
}

/**
 * Converts degrees to radians.
 * Use this before passing student-entered degree values to any trig function.
 *
 * @param {number} degrees
 * @returns {number} Radians
 */
export function degreesToRadians(degrees) {
  return (Number(degrees) * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 *
 * @param {number} radians
 * @returns {number} Degrees
 */
export function radiansToDegrees(radians) {
  return (Number(radians) * 180) / Math.PI;
}