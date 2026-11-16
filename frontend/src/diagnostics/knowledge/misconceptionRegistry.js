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
  SPEED_OPERATION_INVERSION: {
    code: "SPEED_OPERATION_INVERSION",
    name: "Multiplying Distance by Time Instead of Dividing",
    diagnose: ({ studentAnswer, questionText, expectedAnswer }) => {
      if (!questionText) return null;
      const q = questionText.toLowerCase();
      if (!q.includes("speed") && !q.includes("velocity") && !q.includes("rate")) return null;

      // Extract distance (e.g. 120 km, 800 m, 60 miles)
      const distMatch = questionText.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometres?|kilometers?|m\b|metres?|meters?|miles?)/i);
      // Extract time (e.g. 3 hours, 2 hrs, 30 seconds, 10 minutes)
      const timeMatch = questionText.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h\b|seconds?|secs?|s\b|minutes?|mins?|min\b)/i);

      if (distMatch && timeMatch) {
        const d = parseFloat(distMatch[1]);
        const t = parseFloat(timeMatch[1]);
        if (d > 0 && t > 0) {
          const multiplied = d * t;
          const studentVal = parseFloat(String(studentAnswer).replace(/[^\d.-]/g, ""));

          if (Math.abs(studentVal - multiplied) < 0.01) {
            const correctSpeed = (d / t).toFixed(1).replace(/\.0$/, "");
            return {
              errorType: "OPERATION_SELECTION_ERROR",
              whatYouDid: `Your calculation (${d} × ${t} = ${multiplied}) is correct, but multiplication is the wrong operation here.`,
              whyThisIsWrong: [
                `You multiplied the distance (${d}) by the time (${t}) as if combining them, giving ${multiplied}.`,
                `Average speed is a rate: it asks "How much distance is covered in each single hour?"`,
                `When we want to know the speed per unit of time, we must divide the total distance by the total time, not multiply.`,
              ],
              theRightWay: [
                `State the relationship: Average Speed = Total Distance ÷ Total Time.`,
                `Substitute the known values: ${d} ÷ ${t} = ${correctSpeed}.`,
                `Attach the correct compound unit (e.g. km/h or m/s).`,
              ],
              remember:
                "Speed = Distance ÷ Time. Remember: you are distributing the total distance evenly across the time taken.",
              probe: {
                question: `If an object travels 60 km in 2 hours, what is its average speed?`,
                options: ["30 km/h", "120 km/h", "62 km/h", "58 km/h"],
                correctAnswer: "30 km/h",
                purpose: "Confirms whether the student divides distance by time."
              },
              repair: {
                principle: "A rate measures how much quantity corresponds to ONE unit of time.",
                counterExample: `If you travel ${d} km in ${t} hours, you cannot be traveling ${multiplied} km every hour — you only traveled ${d} km in total!`
              },
              retest: {
                question: `A cyclist travels 90 km in 3 hours. Calculate the average speed.`,
                expectedAnswer: "30 km/h"
              }
            };
          }
        }
      }
      return null;
    },
  },

  SPEED_AVERAGING_TRAP: {
    code: "SPEED_AVERAGING_TRAP",
    name: "Averaging Speeds Instead of Total Distance over Total Time",
    diagnose: ({ studentAnswer, questionText, expectedAnswer }) => {
      if (!questionText) return null;
      const q = questionText.toLowerCase();
      if (!q.includes("average speed") && !q.includes("average")) return null;

      const speeds = [...questionText.matchAll(/(\d+(?:\.\d+)?)\s*(?:km\/h|m\/s|mph)/gi)].map(m => parseFloat(m[1]));
      if (speeds.length >= 2) {
        const simpleMean = speeds.reduce((a, b) => a + b, 0) / speeds.length;
        const studentVal = parseFloat(String(studentAnswer).replace(/[^\d.-]/g, ""));
        if (Math.abs(studentVal - simpleMean) < 0.01 && expectedAnswer && Math.abs(parseFloat(expectedAnswer) - simpleMean) > 0.1) {
          return {
            errorType: "SPEED_AVERAGING_TRAP",
            whatYouDid: `You took the arithmetic average of the speeds (${speeds.join(" + ")} ÷ ${speeds.length} = ${simpleMean}).`,
            whyThisIsWrong: [
              "You cannot simply average the speeds unless the time spent at each speed is exactly the same.",
              "If the distances are the same or times differ, more time is spent at the slower speed, weighting the average downward.",
              "Average speed is ALWAYS defined as: Total Distance ÷ Total Time.",
            ],
            theRightWay: [
              "Step 1: Calculate the total distance covered across all parts of the journey.",
              "Step 2: Calculate the total time taken for all parts.",
              "Step 3: Divide Total Distance by Total Time.",
            ],
            remember:
              "Average speed is never just the average of the speeds: Always calculate Total Distance ÷ Total Time.",
          };
        }
      }
      return null;
    },
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
