/**
 * TIXAR ENGINE 3
 * ERROR & MISCONCEPTION DIAGNOSER
 *
 * Purpose:
 *   Diagnose WHY a student is wrong, rather than simply saying
 *   that the answer is wrong.
 *
 * Design principles:
 *
 * 1. Never diagnose a misconception from a single weak signal.
 * 2. Do not assume every negative number is a domain violation.
 * 3. Do not compare every number in the student's work with every
 *    number in the reference solution.
 * 4. Respect mathematically equivalent solution paths.
 * 5. Separate:
 *      - conceptual errors
 *      - procedural errors
 *      - calculation errors
 *      - final-answer errors
 *      - domain errors
 *      - insufficient evidence
 * 6. Prefer "I can't determine the cause yet" over a false diagnosis.
 *
 * Input:
 *   studentText
 *   correctText
 *   steps
 *   studentAnswer
 *   userWork
 *   correctAnswer
 *
 * Output:
 *
 * {
 *   type,
 *   severity,
 *   confidence,
 *   failedStepIndex,
 *   message,
 *   explanation,
 *   isMathValidPath,
 *   evidence
 * }
 */

import { extractSignedNumbers } from "./answerParser.js";

// ============================================================================
// 1. MISCONCEPTION TAXONOMY
// ============================================================================

const MISCONCEPTION_PAIRS = [
  // --------------------------------------------------------------------------
  // SCIENCE
  // --------------------------------------------------------------------------

  {
    conceptA: "ionic",
    conceptB: "covalent",
    category: "BONDING_CONFUSION",
    detail:
      "Ionic bonding involves electron transfer, while covalent bonding involves electron sharing.",
  },

  {
    conceptA: "mass",
    conceptB: "weight",
    category: "PHYSICS_CONFUSION",
    detail:
      "Mass measures the amount of matter, while weight is the gravitational force acting on an object.",
  },

  {
    conceptA: "conductor",
    conceptB: "insulator",
    category: "CIRCUIT_CONFUSION",
    detail:
      "A conductor allows electric charge to flow relatively easily, while an insulator strongly resists charge flow.",
  },

  {
    conceptA: "endothermic",
    conceptB: "exothermic",
    category: "THERMO_CONFUSION",
    detail:
      "An endothermic process absorbs heat from its surroundings, while an exothermic process releases heat.",
  },

  {
    conceptA: "mitosis",
    conceptB: "meiosis",
    category: "BIOLOGY_CONFUSION",
    detail:
      "Mitosis generally produces genetically similar daughter cells, while meiosis produces haploid gametes with genetic variation.",
  },

  {
    conceptA: "velocity",
    conceptB: "acceleration",
    category: "KINEMATICS_CONFUSION",
    detail:
      "Velocity describes displacement per unit time, while acceleration describes the rate of change of velocity.",
  },

  {
    conceptA: "enlarge",
    conceptB: "reduce",
    category: "OPTICS_CONFUSION",
    detail:
      "Enlargement increases image size relative to the object, while reduction decreases it.",
  },

  // --------------------------------------------------------------------------
  // MATHEMATICAL OPERATIONS
  // --------------------------------------------------------------------------

  {
    conceptA: "add",
    conceptB: "subtract",
    category: "OPERATION_SWAP",
    detail:
      "An addition operation was used where subtraction was required.",
  },

  {
    conceptA: "subtract",
    conceptB: "add",
    category: "OPERATION_SWAP",
    detail:
      "A subtraction operation was used where addition was required.",
  },

  {
    conceptA: "multiply",
    conceptB: "divide",
    category: "OPERATION_SWAP",
    detail:
      "Multiplication was used where division was required.",
  },

  {
    conceptA: "divide",
    conceptB: "multiply",
    category: "OPERATION_SWAP",
    detail:
      "Division was used where multiplication was required.",
  },
];

// ============================================================================
// 2. BASIC TEXT NORMALIZATION
// ============================================================================

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value) {
  return String(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function containsWord(text, word) {
  const normalized = normalizeText(text);
  const pattern = new RegExp(
    `\\b${escapeRegex(word)}\\b`,
    "i"
  );

  return pattern.test(normalized);
}

// ============================================================================
// 3. CONCEPT MISCONCEPTION DIAGNOSER
// ============================================================================

/**
 * Diagnoses explicit conceptual substitutions.
 *
 * IMPORTANT:
 * We only diagnose when the student explicitly uses the competing
 * concept as part of their response.
 *
 * We do not diagnose based merely on the fact that the correct
 * answer contains the concept.
 */

export function diagnoseMisconceptionPattern(
  studentText,
  correctText
) {
  const sNorm = normalizeText(studentText);
  const cNorm = normalizeText(correctText);

  if (!sNorm || !cNorm) {
    return null;
  }

  for (const pair of MISCONCEPTION_PAIRS) {
    const expectedA =
      containsWord(cNorm, pair.conceptA);

    const expectedB =
      containsWord(cNorm, pair.conceptB);

    const studentA =
      containsWord(sNorm, pair.conceptA);

    const studentB =
      containsWord(sNorm, pair.conceptB);

    // --------------------------------------------------------
    // Correct answer requires A, student explicitly gives B.
    // --------------------------------------------------------

    if (
      expectedA &&
      studentB &&
      !studentA
    ) {
      return {
        type: pair.category,
        expectedConcept: pair.conceptA,
        studentConcept: pair.conceptB,
        severity: "HIGH",
        confidence: 0.96,

        explanation:
          `You used "${pair.conceptB}" where ` +
          `"${pair.conceptA}" is required. ` +
          pair.detail,

        evidence: {
          expectedConcept: pair.conceptA,
          detectedStudentConcept: pair.conceptB,
        },
      };
    }

    // --------------------------------------------------------
    // Correct answer requires B, student explicitly gives A.
    // --------------------------------------------------------

    if (
      expectedB &&
      studentA &&
      !studentB
    ) {
      return {
        type: pair.category,
        expectedConcept: pair.conceptB,
        studentConcept: pair.conceptA,
        severity: "HIGH",
        confidence: 0.96,

        explanation:
          `You used "${pair.conceptA}" where ` +
          `"${pair.conceptB}" is required. ` +
          pair.detail,

        evidence: {
          expectedConcept: pair.conceptB,
          detectedStudentConcept: pair.conceptA,
        },
      };
    }
  }

  return null;
}

// ============================================================================
// 4. MAIN MATH DIAGNOSTIC ENGINE
// ============================================================================

/**
 * Diagnose mathematical errors.
 *
 * The function deliberately uses several layers:
 *
 * A. Final-answer extraction
 * B. Domain analysis
 * C. Explicit misconception detection
 * D. Working-vs-reference analysis
 * E. Alternative-path tolerance
 * F. Calculation error detection
 *
 * @param {Array<string>} steps
 * @param {string} studentAnswer
 * @param {string} userWork
 * @param {string} correctAnswer
 *
 * @returns {Object}
 */

export function diagnoseMathEquivalence(
  steps = [],
  studentAnswer = "",
  userWork = "",
  correctAnswer = ""
) {
  const safeSteps = Array.isArray(steps)
    ? steps.filter(Boolean).map(String)
    : [];

  const combinedWork = [
    userWork,
    studentAnswer,
  ]
    .filter(Boolean)
    .join("\n");

  if (!combinedWork.trim()) {
    return createInsufficientEvidenceResult(
      "There is not enough student work to determine the source of the error."
    );
  }

  const studentNums =
    safeExtractNumbers(combinedWork);

  const correctNums =
    safeExtractNumbers(correctAnswer);

  // ========================================================================
  // STEP 1 — FINAL ANSWER
  // ========================================================================

  const studentFinal =
    extractStudentFinalValue(
      studentAnswer,
      userWork
    );

  const correctFinal =
    extractExpectedFinalValue(
      correctAnswer,
      safeSteps
    );

  const finalValuesAvailable =
    studentFinal !== null &&
    correctFinal !== null;

  const finalAnswerWrong =
    finalValuesAvailable &&
    !numbersEquivalent(
      studentFinal,
      correctFinal
    );

  // ========================================================================
  // STEP 2 — DOMAIN ANALYSIS
  // ========================================================================

  const domainDiagnosis =
    diagnoseDomainConstraint(
      safeSteps,
      combinedWork,
      studentFinal,
      correctFinal
    );

  if (domainDiagnosis) {
    return domainDiagnosis;
  }

  // ========================================================================
  // STEP 3 — OPERATION/SIGN ANALYSIS
  // ========================================================================

  const operationDiagnosis =
    diagnoseOperationOrSignError(
      safeSteps,
      combinedWork
    );

  if (operationDiagnosis) {
    return operationDiagnosis;
  }

  // ========================================================================
  // STEP 4 — CHECK WHETHER THE STUDENT USED A VALID ALTERNATIVE PATH
  // ========================================================================

  const alternativePath =
    checkAlternativeMathPath(
      safeSteps,
      combinedWork,
      correctFinal
    );

  // If the final answer is correct, alternative method is acceptable.
  if (
    !finalAnswerWrong &&
    alternativePath.isValid
  ) {
    return {
      type: "VALID_ALTERNATIVE_PATH",
      failedStepIndex: -1,
      message:
        "Your method differs from the reference solution, but it is mathematically valid.",
      explanation:
        "Tixar should accept different valid mathematical methods instead of requiring students to reproduce one exact sequence of steps.",
      severity: "NONE",
      confidence: alternativePath.confidence,
      isMathValidPath: true,
      evidence: alternativePath.evidence,
    };
  }

  // ========================================================================
  // STEP 5 — FINAL ANSWER ERROR
  // ========================================================================

  if (finalAnswerWrong) {
    const hasWorking =
      Boolean(userWork && userWork.trim()) ||
      countMeaningfulLines(combinedWork) >= 2;

    if (hasWorking) {
      const workingAssessment =
        assessWorkingAgainstReference(
          safeSteps,
          userWork
        );

      if (
        workingAssessment.appearsCorrect &&
        workingAssessment.confidence >= 0.8
      ) {
        return {
          type: "FINAL_CONCLUSION_ERROR",
          failedStepIndex:
            Math.max(
              safeSteps.length - 1,
              0
            ),

          message:
            `Your method appears correct, but your final answer ` +
            `(${formatValue(studentFinal)}) does not match ` +
            `the expected answer (${formatValue(correctFinal)}).`,

          explanation:
            "Your error appears to occur during the final calculation or transcription rather than in the main method.",

          severity: "MEDIUM",
          confidence:
            workingAssessment.confidence,

          isMathValidPath: false,

          evidence: {
            studentFinal,
            correctFinal,
            workingAssessment,
          },
        };
      }
    }

    return {
      type: "CALCULATION_ERROR",
      failedStepIndex:
        Math.max(
          safeSteps.length - 1,
          0
        ),

      message:
        `Your final answer is ${formatValue(studentFinal)}, ` +
        `but the expected answer is ${formatValue(correctFinal)}.`,

      explanation:
        "Check the calculation that produced your final result and verify each operation before writing the final answer.",

      severity: "MEDIUM",
      confidence: 0.9,

      isMathValidPath: false,

      evidence: {
        studentFinal,
        correctFinal,
      },
    };
  }

  // ========================================================================
  // STEP 6 — NO CONFIRMED ERROR
  // ========================================================================

  if (alternativePath.isValid) {
    return {
      type: "VALID_ALTERNATIVE_PATH",
      failedStepIndex: -1,
      message:
        "Your solution appears to use a different mathematical path from the reference solution.",
      explanation:
        "Different valid mathematical methods should not automatically be treated as mistakes.",
      severity: "NONE",
      confidence:
        alternativePath.confidence,
      isMathValidPath: true,
      evidence: alternativePath.evidence,
    };
  }

  return {
    type: "NO_CONFIRMED_ERROR",
    failedStepIndex: -1,
    message:
      "No specific mathematical misconception could be confirmed from the available work.",
    explanation:
      "The available evidence is insufficient to identify exactly where your reasoning went wrong.",
    severity: "UNKNOWN",
    confidence: 0.35,
    isMathValidPath: false,
    evidence: {
      studentNums,
      correctNums,
    },
  };
}

// ============================================================================
// 5. DOMAIN-CONSTRAINT DIAGNOSER
// ============================================================================

function diagnoseDomainConstraint(
  steps,
  combinedWork,
  studentFinal
) {
  const text =
    normalizeText(
      steps.join(" ") +
      " " +
      combinedWork
    );

  // --------------------------------------------------------
  // Time
  // --------------------------------------------------------

  const isTimeProblem =
    /\b(time|duration|seconds?|minutes?|hours?)\b/i.test(
      text
    );

  // --------------------------------------------------------
  // Distance
  // --------------------------------------------------------

  const isDistanceProblem =
    /\b(distance|meters?|metres?|kilometers?|kilometres?|miles?)\b/i.test(
      text
    );

  // --------------------------------------------------------
  // Age
  // --------------------------------------------------------

  const isAgeProblem =
    /\bage\b|\byears?\s+old\b/i.test(
      text
    );

  const negativeValues =
    safeExtractNumbers(combinedWork)
      .filter(
        (n) =>
          Number.isFinite(n) &&
          n < 0
      );

  if (
    negativeValues.length === 0
  ) {
    return null;
  }

  // --------------------------------------------------------
  // Only apply domain restriction when the quantity itself
  // is known to be non-negative.
  // --------------------------------------------------------

  if (
    isTimeProblem ||
    isDistanceProblem ||
    isAgeProblem
  ) {
    const domain =
      isTimeProblem
        ? "time"
        : isDistanceProblem
        ? "distance"
        : "age";

    // If the student explicitly presents a negative value
    // as the final answer, the evidence is particularly strong.
    if (
      studentFinal !== null &&
      studentFinal < 0
    ) {
      return {
        type:
          "DOMAIN_CONSTRAINT_VIOLATION",

        failedStepIndex:
          Math.max(
            steps.length - 1,
            0
          ),

        message:
          `The value ${formatValue(studentFinal)} ` +
          `is not physically valid for ${domain} in this problem.`,

        explanation:
          `Check the domain of the problem. ` +
          `${capitalize(domain)} cannot be negative in this context. ` +
          `If an equation produces multiple roots, discard roots that violate the problem's conditions.`,

        severity: "HIGH",
        confidence: 0.94,

        isMathValidPath: false,

        evidence: {
          domain,
          negativeValues,
          studentFinal,
        },
      };
    }
  }

  return null;
}

// ============================================================================
// 6. OPERATION / SIGN ERROR
// ============================================================================

function diagnoseOperationOrSignError(
  steps,
  studentWork
) {
  const student =
    normalizeText(studentWork);

  if (!student) {
    return null;
  }

  // --------------------------------------------------------------------------
  // Explicit operation language
  // --------------------------------------------------------------------------

  const operationPatterns = [
    {
      wrong: /\bsubtract\b|\bminus\b/,
      expected: /\badd\b|\bplus\b/,
      type: "OPERATION_SWAP",
      message:
        "Check whether subtraction and addition were reversed while rearranging the equation.",
    },

    {
      wrong: /\badd\b|\bplus\b/,
      expected: /\bsubtract\b|\bminus\b/,
      type: "OPERATION_SWAP",
      message:
        "Check whether addition and subtraction were reversed while rearranging the equation.",
    },

    {
      wrong: /\bmultiply\b|\btimes\b/,
      expected: /\bdivide\b|\bdivided\b/,
      type: "OPERATION_SWAP",
      message:
        "Check whether multiplication and division were reversed while isolating the variable.",
    },

    {
      wrong: /\bdivide\b|\bdivided\b/,
      expected: /\bmultiply\b|\btimes\b/,
      type: "OPERATION_SWAP",
      message:
        "Check whether division and multiplication were reversed while isolating the variable.",
    },
  ];

  // We only use these when the reference explicitly describes
  // the required operation.
  for (const pattern of operationPatterns) {
    const reference =
      normalizeText(
        steps.join(" ")
      );

    if (
      pattern.wrong.test(student) &&
      pattern.expected.test(reference)
    ) {
      return {
        type: pattern.type,
        failedStepIndex:
          findFirstRelevantStep(
            steps,
            pattern.expected
          ),

        message:
          pattern.message,

        explanation:
          "When rearranging an equation, perform the inverse operation on both sides and keep track of the direction of the transformation.",

        severity: "HIGH",
        confidence: 0.88,

        isMathValidPath: false,

        evidence: {
          studentOperation:
            student.match(
              pattern.wrong
            )?.[0],

          expectedOperation:
            reference.match(
              pattern.expected
            )?.[0],
        },
      };
    }
  }

  // --------------------------------------------------------------------------
  // Sign language
  // --------------------------------------------------------------------------

  const explicitlyMentionsSign =
    /\bnegative\b|\bpositive\b|\bsign\b|\bminus\b/i.test(
      student
    );

  if (explicitlyMentionsSign) {
    return {
      type: "SIGN_ERROR",
      failedStepIndex: -1,

      message:
        "Check the signs of your terms when moving or simplifying expressions.",

      explanation:
        "A sign error occurs when a positive or negative term changes incorrectly during an algebraic transformation.",

      severity: "MEDIUM",
      confidence: 0.72,

      isMathValidPath: false,

      evidence: {
        reason:
          "Student work explicitly references signs.",
      },
    };
  }

  return null;
}

// ============================================================================
// 7. WORKING ASSESSMENT
// ============================================================================

function assessWorkingAgainstReference(
  referenceSteps,
  userWork
) {
  const reference =
    normalizeText(
      referenceSteps.join(" ")
    );

  const work =
    normalizeText(
      userWork
    );

  if (
    !reference ||
    !work
  ) {
    return {
      appearsCorrect: false,
      confidence: 0,
    };
  }

  const referenceNumbers =
    safeExtractNumbers(reference);

  const workNumbers =
    safeExtractNumbers(work);

  if (
    referenceNumbers.length === 0 ||
    workNumbers.length === 0
  ) {
    return {
      appearsCorrect: false,
      confidence: 0.25,
    };
  }

  let matched = 0;

  for (
    const number
    of workNumbers
  ) {
    if (
      referenceNumbers.some(
        (ref) =>
          numbersEquivalent(
            number,
            ref
          )
      )
    ) {
      matched++;
    }
  }

  const ratio =
    matched /
    Math.max(
      workNumbers.length,
      referenceNumbers.length
    );

  /*
   * IMPORTANT:
   *
   * Number overlap is only evidence.
   * It is NOT proof that the student's method is correct.
   */

  return {
    appearsCorrect:
      ratio >= 0.65,

    confidence:
      Math.min(
        0.85,
        ratio
      ),

    numberOverlap:
      ratio,
  };
}

// ============================================================================
// 8. ALTERNATIVE MATHEMATICAL PATH
// ============================================================================

function checkAlternativeMathPath(
  referenceSteps,
  studentWork,
  correctFinal
) {
  const text =
    normalizeText(
      studentWork
    );

  if (!text) {
    return {
      isValid: false,
      confidence: 0,
      evidence: null,
    };
  }

  // --------------------------------------------------------------------------
  // Factoring vs quadratic formula
  // --------------------------------------------------------------------------

  const mentionsQuadraticFormula =
    /\bquadratic formula\b|\bb²\s*-\s*4ac\b|\bdiscriminant\b/i.test(
      text
    );

  const referenceUsesFactoring =
    referenceSteps.some(
      (step) =>
        /\bfactor|factoring|factorise|factorize/i.test(
          step
        )
    );

  if (
    mentionsQuadraticFormula &&
    referenceUsesFactoring
  ) {
    return {
      isValid:
        correctFinal !== null
          ? true
          : false,

      confidence:
        correctFinal !== null
          ? 0.86
          : 0.5,

      evidence: {
        studentMethod:
          "quadratic_formula",
        referenceMethod:
          "factoring",
      },
    };
  }

  // --------------------------------------------------------------------------
  // Completing the square vs factoring
  // --------------------------------------------------------------------------

  const completingSquare =
    /\bcomplete(?:d|ing)? the square\b/i.test(
      text
    );

  if (
    completingSquare &&
    referenceUsesFactoring
  ) {
    return {
      isValid:
        correctFinal !== null,

      confidence:
        correctFinal !== null
          ? 0.86
          : 0.5,

      evidence: {
        studentMethod:
          "completing_the_square",
        referenceMethod:
          "factoring",
      },
    };
  }

  return {
    isValid: false,
    confidence: 0,
    evidence: null,
  };
}

// ============================================================================
// 9. FINAL ANSWER EXTRACTION
// ============================================================================

function extractStudentFinalValue(
  studentAnswer,
  userWork
) {
  // Prefer the explicit answer field.
  const direct =
    extractLastNumber(
      studentAnswer
    );

  if (direct !== null) {
    return direct;
  }

  // Otherwise use the final meaningful line.
  const lines =
    String(userWork || "")
      .split(/\r?\n|;/)
      .map(
        (line) =>
          line.trim()
      )
      .filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const lastLine =
    lines[lines.length - 1];

  const equalsMatch =
    lastLine.match(
      /=\s*(-?\d+(?:\.\d+)?)/i
    );

  if (equalsMatch) {
    return Number(
      equalsMatch[1]
    );
  }

  return extractLastNumber(
    lastLine
  );
}

function extractExpectedFinalValue(
  correctAnswer,
  steps
) {
  const direct =
    extractLastNumber(
      correctAnswer
    );

  if (direct !== null) {
    return direct;
  }

  if (
    steps.length === 0
  ) {
    return null;
  }

  return extractLastNumber(
    steps[steps.length - 1]
  );
}

function extractLastNumber(
  text
) {
  const numbers =
    safeExtractNumbers(
      text
    );

  return numbers.length
    ? numbers[numbers.length - 1]
    : null;
}

// ============================================================================
// 10. NUMBER HELPERS
// ============================================================================

function safeExtractNumbers(
  text
) {
  try {
    const result =
      extractSignedNumbers(
        String(text || "")
      );

    if (!Array.isArray(result)) {
      return [];
    }

    return result.filter(
      (n) =>
        typeof n === "number" &&
        Number.isFinite(n)
    );
  } catch {
    return [];
  }
}

function numbersEquivalent(
  a,
  b
) {
  if (
    a === null ||
    b === null ||
    !Number.isFinite(a) ||
    !Number.isFinite(b)
  ) {
    return false;
  }

  const tolerance =
    Math.max(
      1e-5,
      Math.abs(b) * 1e-5
    );

  return (
    Math.abs(a - b) <=
    tolerance
  );
}

function formatValue(
  value
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "unknown";
  }

  if (
    typeof value === "number" &&
    Number.isInteger(value)
  ) {
    return String(value);
  }

  return String(value);
}

function countMeaningfulLines(
  text
) {
  return String(text || "")
    .split(/\r?\n|;/)
    .map(
      (line) =>
        line.trim()
    )
    .filter(Boolean)
    .length;
}

// ============================================================================
// 11. STEP HELPERS
// ============================================================================

function findFirstRelevantStep(
  steps,
  pattern
) {
  for (
    let i = 0;
    i < steps.length;
    i++
  ) {
    if (
      pattern.test(
        normalizeText(
          steps[i]
        )
      )
    ) {
      return i;
    }
  }

  return -1;
}

// ============================================================================
// 12. FALLBACK
// ============================================================================

function createInsufficientEvidenceResult(
  message
) {
  return {
    type: "INSUFFICIENT_EVIDENCE",
    failedStepIndex: -1,
    message,
    explanation:
      "Tixar should not guess the cause of an error when the student's work does not contain enough evidence.",
    severity: "UNKNOWN",
    confidence: 0.1,
    isMathValidPath: false,
    evidence: null,
  };
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
