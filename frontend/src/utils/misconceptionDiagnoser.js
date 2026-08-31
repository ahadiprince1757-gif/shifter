/**
 * Engine 3: Error & Misconception Diagnoser
 *
 * Categorized Misconception Taxonomy:
 *  - Concept Substitution (confusing Ionic ↔ Covalent, Mass ↔ Weight, Conductor ↔ Insulator)
 *  - Operation Swap (Add ↔ Subtract, Multiply ↔ Divide)
 *  - Sign & Distribution Error (e.g. -5t / -5 = +1t, (x-2)(x+3))
 *  - Domain Constraint Error (keeping invalid t < 0 in trajectory problems)
 *  - Multi-Path Mathematical Equivalence Checker
 */

import { extractSignedNumbers } from "./answerParser.js";

// ── 1. MISCONCEPTION TAXONOMY & PAIRS ─────────────────────────────────────────

const MISCONCEPTION_PAIRS = [
  // Science concept confusion
  { conceptA: "ionic", conceptB: "covalent", category: "BONDING_CONFUSION", detail: "Confused ionic bonding (electron transfer) with covalent bonding (electron sharing)." },
  { conceptA: "mass", conceptB: "weight", category: "PHYSICS_CONFUSION", detail: "Confused mass (amount of matter) with weight (force due to gravity)." },
  { conceptA: "conductor", conceptB: "insulator", category: "CIRCUIT_CONFUSION", detail: "Confused electrical conductor (allows current) with insulator (blocks current)." },
  { conceptA: "endothermic", conceptB: "exothermic", category: "THERMO_CONFUSION", detail: "Confused endothermic (absorbs heat) with exothermic (releases heat)." },
  { conceptA: "mitosis", conceptB: "meiosis", category: "BIOLOGY_CONFUSION", detail: "Confused mitosis (identical body cells) with meiosis (gamete division)." },
  { conceptA: "velocity", conceptB: "acceleration", category: "KINEMATICS_CONFUSION", detail: "Confused velocity (speed in direction) with acceleration (rate of speed change)." },
  { conceptA: "enlarge", conceptB: "reduce", category: "OPTICS_CONFUSION", detail: "Confused magnification (making larger) with reduction (making smaller)." },

  // Math operation swap
  { conceptA: "add", conceptB: "subtract", category: "OPERATION_SWAP", detail: "Added when subtraction was required to isolate the variable." },
  { conceptA: "multiply", conceptB: "divide", category: "OPERATION_SWAP", detail: "Multiplied when division was required to simplify the coefficient." },
];

/**
 * Diagnoses explicit misconceptions in student text / answers.
 * @param {string} studentText
 * @param {string} correctText
 * @returns {Object|null} Misconception diagnosis object
 */
export function diagnoseMisconceptionPattern(studentText, correctText) {
  const sNorm = String(studentText || "").toLowerCase();
  const cNorm = String(correctText || "").toLowerCase();

  for (const pair of MISCONCEPTION_PAIRS) {
    // If correct answer requires concept A and student explicitly used concept B
    if (cNorm.includes(pair.conceptA) && sNorm.includes(pair.conceptB)) {
      return {
        type: pair.category,
        expectedConcept: pair.conceptA,
        studentConcept: pair.conceptB,
        explanation: `Concept Confusion: You used "${pair.conceptB}" when the problem specifically requires "${pair.conceptA}". ${pair.detail}`,
        severity: "HIGH",
      };
    }
    // Reverse check
    if (cNorm.includes(pair.conceptB) && sNorm.includes(pair.conceptA)) {
      return {
        type: pair.category,
        expectedConcept: pair.conceptB,
        studentConcept: pair.conceptA,
        explanation: `Concept Confusion: You used "${pair.conceptA}" when the problem specifically requires "${pair.conceptB}". ${pair.detail}`,
        severity: "HIGH",
      };
    }
  }

  return null;
}

// ── 2. MULTI-PATH MATHEMATICAL DIAGNOSER ───────────────────────────────────────

/**
 * Validates math steps against multiple valid mathematical solution paths.
 * E.g. Quadratic equations can be solved via:
 *   Path 1: Factoring
 *   Path 2: Quadratic Formula
 *   Path 3: Completing the Square
 *
 * @param {Array<string>} steps - Reference steps from question
 * @param {string} studentAnswer - Final answer
 * @param {string} userWork - Intermediate working
 * @param {string} correctAnswer - Reference correct answer
 * @returns {Object} Diagnostic result
 */
export function diagnoseMathEquivalence(steps, studentAnswer, userWork, correctAnswer) {
  const combinedWork = [userWork, studentAnswer].filter(Boolean).join("\n");
  const studentNums = extractSignedNumbers(combinedWork);
  const correctNums = extractSignedNumbers(correctAnswer);

  // Check Domain Constraint Error (e.g. keeping negative time t = -1)
  const isTimeOrDistanceProb = /second|sec|time|meter|m\b|distance/i.test(steps.join(" "));
  const hasNegativeNum = studentNums.some((n) => n < 0);
  const correctIsPositiveOnly = correctNums.length > 0 && correctNums.every((n) => n >= 0);

  if (isTimeOrDistanceProb && hasNegativeNum && correctIsPositiveOnly) {
    return {
      type: "DOMAIN_CONSTRAINT_VIOLATION",
      failedStepIndex: steps.length - 1,
      message: "Domain Constraint Error: Physical quantities like time and distance cannot be negative. You must discard the negative root (e.g. t = -1) and keep only the positive solution.",
      isMathValidPath: false,
    };
  }

  // Evaluate step sequence
  let failedIndex = -1;
  let failureReason = "";

  steps.forEach((step, i) => {
    if (failedIndex !== -1) return;

    const stepClean = step.replace(/^step\s*\d+\s*[:-]/i, "").trim();
    const stepNums = extractSignedNumbers(stepClean);

    // Sign Error check
    const hasSignError = stepNums.some((n) => n !== 0 && !studentNums.includes(n) && studentNums.includes(-n));

    if (hasSignError) {
      failedIndex = i;
      failureReason = `Sign Error in Step ${i + 1}: Check your positive/negative signs when moving terms across the equals sign.`;
    } else if (stepNums.length > 0 && !stepNums.some((n) => studentNums.includes(n))) {
      // Check if student applied an alternative valid method (e.g., quadratic formula vs factoring)
      const isAltValidMethod = checkAlternativeMathPath(stepClean, studentNums);

      if (!isAltValidMethod && i === 0 && studentNums.length > 0) {
        // Step 1 mismatched but student is doing valid math
      } else if (!isAltValidMethod) {
        failedIndex = i;
        failureReason = `Method divergence at Step ${i + 1}: Expected step "${stepClean}". Ensure your mathematical transformation is valid.`;
      }
    }
  });

  // Final conclusion number check
  const targetFinalNum = correctNums.length > 0 ? correctNums[correctNums.length - 1] : null;
  const rawLines = combinedWork.split(/[\n;]/).map((l) => l.trim()).filter(Boolean);
  const lastLine = rawLines[rawLines.length - 1] || combinedWork;
  const eqMatch = lastLine.match(/=\s*(-?\d+(?:\.\d+)?)/);
  const numbersOnLastLine = lastLine.match(/-?\d+(?:\.\d+)?/g);

  let studentFinalNum;
  if (eqMatch) {
    studentFinalNum = parseFloat(eqMatch[1]);
  } else if (numbersOnLastLine && numbersOnLastLine.length > 0) {
    studentFinalNum = parseFloat(numbersOnLastLine[numbersOnLastLine.length - 1]);
  }

  if (targetFinalNum !== null && studentFinalNum !== undefined && Math.abs(studentFinalNum - targetFinalNum) >= 1e-5) {
    return {
      type: "FINAL_CONCLUSION_ERROR",
      failedStepIndex: steps.length - 1,
      message: `Final Calculation Error: Your intermediate steps were correct, but your final conclusion was ${studentFinalNum} instead of ${targetFinalNum}.`,
      isMathValidPath: false,
    };
  }

  return {
    type: failedIndex === -1 ? "CALCULATION_ERROR" : "STEP_EXECUTION_FAILURE",
    failedStepIndex: failedIndex,
    message: failureReason || "Review your working steps against the solution above.",
    isMathValidPath: failedIndex === -1,
  };
}

/**
 * Helper: Checks if student's numbers belong to an alternative valid math path
 */
function checkAlternativeMathPath(stepText, studentNums) {
  // If factoring step expected, but student computed discriminant b^2 - 4ac
  if (stepText.toLowerCase().includes("factor") && studentNums.some((n) => n > 10 || n < -10)) {
    return true; // Student used quadratic formula or completing square
  }
  return false;
}
