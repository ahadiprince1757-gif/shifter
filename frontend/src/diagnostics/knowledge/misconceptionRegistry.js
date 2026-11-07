/**
 * Central Misconception Knowledge Registry.
 * Deterministic catalog of pedagogical misconceptions across mathematics and science.
 */

import { Fraction } from "../parsing/fractionParser.js";

export const Misconceptions = {
  // --- Operational Precedence (BODMAS / PEMDAS) ---
  BODMAS_ADDITION_BEFORE_MULTIPLICATION: {
    code: "BODMAS_ADDITION_BEFORE_MULTIPLICATION",
    name: "Addition Evaluated Before Multiplication",
    diagnose: ({ studentAnswer, questionText }) => {
      // e.g. 7 + 5 * 3: correct is 22, student gave 36 (because (7+5)*3 = 36)
      const match = questionText?.match(/(\d+)\s*\+\s*(\d+)\s*[*×]\s*(\d+)/);
      if (match) {
        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        const c = parseInt(match[3], 10);
        const wrongLeftToRight = (a + b) * c;
        if (parseFloat(studentAnswer) === wrongLeftToRight) {
          return {
            errorType: "BODMAS_ADDITION_BEFORE_MULTIPLICATION",
            whatYouDid: `You added ${a} + ${b} first to get ${a + b}, then multiplied by ${c} to get ${wrongLeftToRight}.`,
            whyThisIsWrong: [
              `According to the order of operations (BODMAS / PEMDAS), multiplication must be evaluated before addition.`,
              `The expression ${a} + ${b} × ${c} requires multiplying ${b} × ${c} (= ${b * c}) first, then adding ${a} (= ${a + b * c}).`,
            ],
            theRightWay: [
              `First, perform the multiplication: ${b} × ${c} = ${b * c}.`,
              `Next, perform the addition: ${a} + ${b * c} = ${a + b * c}.`,
            ],
            remember:
              "BODMAS / PEMDAS rule: Multiplication and Division take priority over Addition and Subtraction.",
          };
        }
      }
      return null;
    },
  },

  // --- Fraction Misconceptions ---
  FRACTION_ADD_DENOMINATORS: {
    code: "FRACTION_ADD_DENOMINATORS",
    name: "Adding Numerators and Denominators Across",
    diagnose: ({ studentAnswer, questionText }) => {
      // e.g. 1/2 + 1/3: student answered 2/5
      const match = questionText?.match(/(\d+)\s*\/\s*(\d+)\s*\+\s*(\d+)\s*\/\s*(\d+)/);
      if (match) {
        const n1 = parseInt(match[1], 10);
        const d1 = parseInt(match[2], 10);
        const n2 = parseInt(match[3], 10);
        const d2 = parseInt(match[4], 10);
        const acrossNum = n1 + n2;
        const acrossDen = d1 + d2;
        const studentFrac = Fraction.tryParse(studentAnswer);

        if (studentFrac && studentFrac.n === acrossNum && studentFrac.d === acrossDen) {
          const correctFrac = new Fraction(n1, d1).add(new Fraction(n2, d2));
          return {
            errorType: "FRACTION_ADD_DENOMINATORS",
            whatYouDid: `You added numerators (${n1} + ${n2} = ${acrossNum}) and denominators (${d1} + ${d2} = ${acrossDen}) straight across to get ${acrossNum}/${acrossDen}.`,
            whyThisIsWrong: [
              "Fractions with different denominators cannot be added by simply summing their denominators.",
              "The denominator represents the size of the fractional parts, which must be made common first.",
            ],
            theRightWay: [
              `Find a common denominator for ${d1} and ${d2} (e.g. ${d1 * d2}).`,
              `Convert: ${n1}/${d1} = ${n1 * d2}/${d1 * d2} and ${n2}/${d2} = ${n2 * d1}/${d1 * d2}.`,
              `Add numerators: ${n1 * d2 + n2 * d1}/${d1 * d2} = ${correctFrac.toString()}.`,
            ],
            remember:
              "Never add denominators! Find a common denominator first, then add only the numerators.",
          };
        }
      }
      return null;
    },
  },

  // --- Speed Journey Misconceptions ---
  SPEED_AVERAGING_TRAP: {
    code: "speed_averaging_trap",
    name: "Speed Averaging Trap",
    matches: (errorType) => errorType === "speed_averaging_trap",
  },
};

export function findKnownMisconception(context) {
  for (const key of Object.keys(Misconceptions)) {
    const rule = Misconceptions[key];
    if (typeof rule.diagnose === "function") {
      const match = rule.diagnose(context);
      if (match) return match;
    }
  }
  return null;
}
