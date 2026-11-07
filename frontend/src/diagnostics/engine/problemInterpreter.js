/**
 * Problem Understanding Engine.
 * Extracts the problem type, mathematical structure, variable names,
 * constraints, options, and relevant concepts from question text.
 */

import { ProblemType } from "./diagnosticTypes.js";
import { parseEquation } from "../parsing/equationParser.js";

export function interpretProblem({
  question,
  questionText = "",
  correctAnswer = "",
  options = [],
  curriculum = {},
}) {
  const qText = String(question?.q || questionText || "").trim();
  const qLower = qText.toLowerCase();

  // 1. Number Classification (e.g., natural number, integer, rational number)
  if (
    qLower.includes("natural number") ||
    qLower.includes("whole number") ||
    qLower.includes("integer") ||
    qLower.includes("rational number")
  ) {
    let targetSet = "NATURAL_NUMBERS";
    if (qLower.includes("whole number")) targetSet = "WHOLE_NUMBERS";
    if (qLower.includes("rational number")) targetSet = "RATIONAL_NUMBERS";
    if (qLower.includes("integer") && !qLower.includes("natural")) targetSet = "INTEGERS";

    // Extract options if not explicitly passed
    let detectedOptions = options;
    if (!detectedOptions || detectedOptions.length === 0) {
      // Look for options in text like "-3, 0, 4, or 1/2" or bullet points
      const optMatch = qText.match(/:\s*([^?]+)\?/);
      if (optMatch) {
        detectedOptions = optMatch[1]
          .split(/,\s*|\s+or\s+/i)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
    }

    return {
      type: ProblemType.NUMBER_CLASSIFICATION,
      targetSet,
      options: detectedOptions,
      curriculum,
      expectedAnswer: String(question?.ans || correctAnswer || "").trim(),
    };
  }

  // 2. Average Speed Journey
  if (
    qLower.includes("average speed") ||
    (qLower.includes("km in") && qLower.includes("hours")) ||
    (qLower.includes("travels") && qLower.includes("speed"))
  ) {
    return {
      type: ProblemType.AVERAGE_SPEED,
      expectedAnswer: String(question?.ans || correctAnswer || "").trim(),
      steps: question?.steps || [],
      why: question?.why || "",
    };
  }

  // 3. Linear Equation (e.g. "Solve 3x + 5 = 20" or "3x - 5 = 16")
  const eqMatch = qText.match(/(?:solve\s+)?([a-zA-Z0-9\s+\-*/^()]+=[a-zA-Z0-9\s+\-*/^()]+)/i);
  if (eqMatch) {
    const parsedEq = parseEquation(eqMatch[1].trim());
    if (parsedEq) {
      return {
        type: ProblemType.LINEAR_EQUATION,
        equationStr: eqMatch[1].trim(),
        parsedEquation: parsedEq,
        variable: parsedEq.varName,
        expectedAnswer: String(question?.ans || correctAnswer || "").trim(),
        steps: question?.steps || [],
      };
    }
  }

  // 4. Arithmetic Order of Operations (e.g. "Calculate: 7 + 5 × 3")
  if (
    /[+*×/÷-]/.test(qText) &&
    (qLower.includes("calculate") || qLower.includes("evaluate") || qLower.includes("what is"))
  ) {
    if (qText.includes("/") && !qText.includes("×") && !qText.includes("*")) {
      return {
        type: ProblemType.FRACTION_ARITHMETIC,
        expectedAnswer: String(question?.ans || correctAnswer || "").trim(),
      };
    }
    return {
      type: ProblemType.ARITHMETIC_PRECEDENCE,
      expectedAnswer: String(question?.ans || correctAnswer || "").trim(),
    };
  }

  return {
    type: ProblemType.UNKNOWN,
    expectedAnswer: String(question?.ans || correctAnswer || "").trim(),
    options,
  };
}
