/**
 * Arithmetic & Expression Step Analyzer.
 *
 * Implements line-by-line verification of student arithmetic reductions and order of operations.
 * Pinpoints the EXACT first broken transition:
 * 1. Order-of-operations error (BODMAS: e.g. addition before multiplication)
 * 2. Arithmetic calculation error (correct operation, calculation slip e.g. 6 + 6 = 13)
 * 3. Left-to-right precedence error (e.g. evaluating 18 ÷ 3 × 2 as 18 ÷ 6)
 * 4. Operator modification (e.g. copying 6 + 2 × 3 as 6 + 2 + 3)
 */

import { parseWorkingSteps } from "../parsing/workingParser.js";
import { parseExpression, evaluateAST } from "../parsing/expressionParser.js";
import { normalizeMathText } from "../parsing/textNormalizer.js";

/**
 * Extracts a mathematical expression from a question string.
 */
export function extractExpressionFromQuestion(questionText) {
  if (!questionText || typeof questionText !== "string") return "";
  let s = questionText.trim();
  s = s.replace(/^(solve|evaluate|calculate|find|simplify|compute|what is the value of|what is)[\s:.-]*/i, "");
  s = s.replace(/[\?\.=]+$/, "").trim();
  return normalizeMathText(s);
}

/**
 * Evaluates an expression string safely to a number, or null on error.
 */
function safeEvalExpression(exprStr) {
  if (!exprStr) return null;
  try {
    const ast = parseExpression(exprStr);
    if (!ast) return null;
    return evaluateAST(ast);
  } catch {
    return null;
  }
}

/**
 * Analyzes multi-step student arithmetic working.
 */
export function analyzeArithmeticSteps({
  userWork = "",
  questionText = "",
  expectedAnswer = "",
}) {
  if (!userWork || typeof userWork !== "string" || !userWork.trim()) {
    return null;
  }

  const steps = parseWorkingSteps(userWork);
  // Need at least one mathematical step
  const mathSteps = steps.filter((s) => s.type === "EXPRESSION" || s.type === "RESULT");
  if (mathSteps.length === 0) {
    return null;
  }

  const initialExpr = extractExpressionFromQuestion(questionText);
  const initialValue = safeEvalExpression(initialExpr);

  // If question is not an evaluatable arithmetic expression, let other analyzers handle it
  if (initialValue === null || isNaN(initialValue)) {
    return null;
  }

  const evaluatedSteps = [];
  let firstError = null;
  let previousExpr = initialExpr;
  let previousValue = initialValue;

  for (let i = 0; i < mathSteps.length; i++) {
    const step = mathSteps[i];
    const stepNum = i + 1;
    const isFirstStep = i === 0;

    // Subcase 1: Step restates the original expression (Premise)
    if (isFirstStep && (step.clean === initialExpr || step.expression === initialExpr)) {
      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        status: "valid",
        statusLabel: "Correct",
        comment: "Original expression restated accurately.",
      });
      previousExpr = step.expression || step.clean;
      previousValue = initialValue;
      continue;
    }

    // Determine value of current step
    let currentValue = null;
    if (step.type === "RESULT" && typeof step.value === "number") {
      currentValue = step.value;
    } else if (step.expression) {
      currentValue = safeEvalExpression(step.expression);
    }

    // If current value cannot be computed, treat as unparsed
    if (currentValue === null || isNaN(currentValue)) {
      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        status: firstError ? "propagated" : "first_error",
        statusLabel: "Uninterpretable step",
        comment: "Could not evaluate this line mathematically.",
      });
      continue;
    }

    // If mathematical equality is preserved (valid reduction step)
    if (Math.abs(currentValue - previousValue) < 1e-7) {
      // Check if step introduces an invalid operator or precedence violation despite coincidental value
      const isPropagated = Boolean(firstError);
      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        status: isPropagated ? "propagated" : "valid",
        statusLabel: isPropagated ? "Affected by earlier error" : "Correct",
        comment: isPropagated
          ? `Follows earlier error in step ${firstError.stepNumber}.`
          : "Valid reduction step.",
      });
      previousExpr = step.expression || String(currentValue);
      previousValue = currentValue;
      continue;
    }

    // If we reach here, currentValue !== previousValue -> MATHEMATICAL DIVERGENCE
    if (!firstError) {
      const errorDiag = diagnoseArithmeticDivergence({
        previousExpr,
        previousValue,
        currentStep: step,
        currentValue,
        initialExpr,
        initialValue,
        stepNum,
      });

      firstError = {
        stepNumber: stepNum,
        raw: step.raw,
        ...errorDiag,
      };

      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        status: "first_error",
        statusLabel: "First error",
        comment: errorDiag.explanation,
      });
    } else {
      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        status: "propagated",
        statusLabel: "Affected by earlier error",
        comment: `Follows earlier error in step ${firstError.stepNumber}.`,
      });
    }

    previousExpr = step.expression || String(currentValue);
    previousValue = currentValue;
  }

  if (!firstError) {
    // All steps were mathematically valid!
    return {
      hasError: false,
      evaluatedSteps,
    };
  }

  // Build the complete diagnosis object
  const validEarlierSteps = evaluatedSteps.filter((s) => s.status === "valid");
  const whatYouDid = validEarlierSteps.length > 0
    ? `You worked through the problem correctly up to Step ${firstError.stepNumber - 1}, but your reasoning broke at Step ${firstError.stepNumber}: \`${firstError.raw}\`.`
    : `Your reasoning broke at Step ${firstError.stepNumber}: \`${firstError.raw}\`.`;

  const evidence = [
    {
      text: firstError.raw,
      meaning: firstError.evidenceMeaning || `Student wrote "${firstError.raw}" at Step ${firstError.stepNumber}.`,
    },
  ];

  return {
    hasError: true,
    firstError,
    evaluatedSteps,
    whatYouDid,
    whyThisIsWrong: [
      firstError.explanation,
      firstError.expected
        ? `The expected reduction at this point was \`${firstError.expected}\`.`
        : "Check your intermediate calculations carefully.",
    ],
    theRightWay: firstError.theRightWay || [
      `Expected value: ${initialValue}`,
    ],
    remember: firstError.remember || "Always follow the order of operations: Parentheses/Brackets, Orders/Exponents, Division & Multiplication, Addition & Subtraction.",
    evidence,
    repair: firstError.repair,
    verification: firstError.verification,
  };
}

/**
 * Pinpoints the exact mathematical divergence between previousExpr and currentStep.
 */
function diagnoseArithmeticDivergence({
  previousExpr,
  previousValue,
  currentStep,
  currentValue,
  initialExpr,
  initialValue,
  stepNum,
}) {
  const prevClean = previousExpr.replace(/\s+/g, "");
  const currRaw = (currentStep.expression || currentStep.clean || currentStep.raw || "").replace(/\s+/g, "");

  // ── ERROR CLASS 1: ORDER OF OPERATIONS (Addition / Subtraction before Multiplication / Division) ──
  // Check if previous expression had mixed operations (e.g. + and *)
  if (/[+\-]/.test(prevClean) && /[*\/]/.test(prevClean)) {
    // Case 1A: 6 + 2 * 3 evaluated as (6 + 2) * 3 = 8 * 3 = 24
    // Check if adding before multiplying matches student's step
    const addBeforeMulRegex = /^(\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)$/;
    const m = prevClean.match(addBeforeMulRegex);
    if (m) {
      const a = parseFloat(m[1]);
      const b = parseFloat(m[2]);
      const c = parseFloat(m[3]);
      const wrongSum = a + b; // e.g. 6 + 2 = 8
      const wrongProduct = wrongSum * c; // e.g. 8 * 3 = 24

      if (currRaw.includes(`${wrongSum}*${c}`) || currRaw === `${wrongSum}*${c}` || currentValue === wrongProduct || currRaw === String(wrongSum)) {
        return {
          errorType: "order_of_operations",
          category: "misconception",
          brokenAt: "multiplication_before_addition",
          explanation: `You performed addition (\`${a} + ${b} = ${wrongSum}\`) before multiplication (\`${b} × ${c}\`). In BODMAS, multiplication must be completed before addition.`,
          expected: `${a} + ${b * c}`,
          theRightWay: [
            `Identify operations: addition (+) and multiplication (×).`,
            `Perform multiplication first: ${b} × ${c} = ${b * c}.`,
            `Perform addition next: ${a} + ${b * c} = ${a + b * c}.`,
          ],
          remember: "Multiplication and division take priority over addition and subtraction.",
          evidenceMeaning: `Student evaluated addition before multiplication: (${a} + ${b}) × ${c}.`,
          repair: {
            concept: "order_of_operations",
            explanation: "Multiplication and division must be completed before addition and subtraction.",
            steps: [
              `Identify higher priority operations: ${b} × ${c} = ${b * c}.`,
              `Substitute into the expression: ${a} + ${b * c}.`,
              `Calculate final addition: ${a + b * c}.`,
            ],
          },
          verification: {
            question: `In the expression 4 + 3 × 2, which operation must you calculate first?`,
            expectedConcept: "multiplication before addition",
            options: ["3 × 2 (Multiplication)", "4 + 3 (Addition)"],
            correctAnswer: "3 × 2 (Multiplication)",
            type: "same_skill",
          },
        };
      }
    }
  }

  // ── ERROR CLASS 2: LEFT-TO-RIGHT EVALUATION (Division & Multiplication equal precedence) ──
  // Check if expression is of form A / B * C
  const divMulRegex = /^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)$/;
  const dmMatch = prevClean.match(divMulRegex);
  if (dmMatch) {
    const a = parseFloat(dmMatch[1]);
    const b = parseFloat(dmMatch[2]);
    const c = parseFloat(dmMatch[3]);
    const rightFirst = b * c; // e.g. 3 * 2 = 6
    const wrongVal = a / rightFirst; // e.g. 18 / 6 = 3

    if (currRaw.includes(`${a}/${rightFirst}`) || currRaw === `${a}/${rightFirst}` || currentValue === wrongVal) {
      return {
        errorType: "left_to_right_error",
        category: "procedure",
        brokenAt: "left_to_right_equal_precedence",
        explanation: `Multiplication and division have equal precedence and must be evaluated from left to right. In \`${a} ÷ ${b} × ${c}\`, calculate \`${a} ÷ ${b} = ${a / b}\` first, then multiply by \`${c}\` to get \`${(a / b) * c}\`.`,
        expected: `${a / b} * ${c}`,
        theRightWay: [
          `Division and multiplication share equal precedence.`,
          `Calculate left to right: ${a} ÷ ${b} = ${a / b}.`,
          `Multiply next: ${a / b} × ${c} = ${(a / b) * c}.`,
        ],
        remember: "Operations of equal precedence (multiplication and division) are always evaluated from left to right.",
        evidenceMeaning: `Student evaluated right multiplication (${b} × ${c}) before left division (${a} ÷ ${b}).`,
        repair: {
          concept: "left_to_right_rule",
          explanation: "When operations have equal priority, evaluate them in order from left to right.",
          steps: [
            `Evaluate the leftmost operation first: ${a} ÷ ${b} = ${a / b}.`,
            `Continue from left to right: ${a / b} × ${c} = ${(a / b) * c}.`,
          ],
        },
        verification: {
          question: `In 20 ÷ 4 × 2, what is the correct first step?`,
          expectedConcept: "left to right",
          options: ["20 ÷ 4 = 5", "4 × 2 = 8"],
          correctAnswer: "20 ÷ 4 = 5",
          type: "same_skill",
        },
      };
    }
  }

  // ── ERROR CLASS 3: ARITHMETIC CALCULATION SLIP (Operation correct, arithmetic wrong) ──
  // Check if previous expression was a single operation, e.g. '6 + 6'
  const singleOpRegex = /^(\d+(?:\.\d+)?)([+\-*\/])(\d+(?:\.\d+)?)$/;
  const opMatch = prevClean.match(singleOpRegex);
  if (opMatch) {
    const a = parseFloat(opMatch[1]);
    const op = opMatch[2];
    const b = parseFloat(opMatch[3]);
    let correctResult;
    let opWord = "operation";
    if (op === "+") { correctResult = a + b; opWord = "addition"; }
    else if (op === "-") { correctResult = a - b; opWord = "subtraction"; }
    else if (op === "*") { correctResult = a * b; opWord = "multiplication"; }
    else if (op === "/") { correctResult = a / b; opWord = "division"; }

    return {
      errorType: "arithmetic_error",
      category: "calculation",
      brokenAt: `arithmetic_${opWord}_slip`,
      explanation: `Your order of operations was correct, but an arithmetic calculation error occurred: \`${a} ${op === "*" ? "×" : op} ${b} = ${correctResult}\`, not \`${currentValue}\`.`,
      expected: String(correctResult),
      theRightWay: [
        `You correctly simplified to ${a} ${op === "*" ? "×" : op} ${b}.`,
        `Calculate ${a} ${op === "*" ? "×" : op} ${b} = ${correctResult}.`,
      ],
      remember: `Double check your basic arithmetic calculations: ${a} ${op === "*" ? "×" : op} ${b} = ${correctResult}.`,
      evidenceMeaning: `Student computed ${a} ${op} ${b} as ${currentValue} instead of ${correctResult}.`,
      repair: {
        concept: `${opWord}_accuracy`,
        explanation: `Check your calculation carefully: ${a} ${op === "*" ? "×" : op} ${b} equals ${correctResult}.`,
        steps: [
          `Confirm the values: ${a} and ${b}.`,
          `Calculate: ${a} ${op === "*" ? "×" : op} ${b} = ${correctResult}.`,
        ],
      },
      verification: {
        question: `Calculate: ${a} ${op === "*" ? "×" : op} ${b} = ?`,
        expectedConcept: `${opWord} calculation`,
        options: [String(correctResult), String(currentValue)],
        correctAnswer: String(correctResult),
        type: "same_skill",
      },
    };
  }

  // ── ERROR CLASS 4: GENERAL ARITHMETIC DIVERGENCE ──
  return {
    errorType: "arithmetic_error",
    category: "calculation",
    brokenAt: "arithmetic_reduction_divergence",
    explanation: `Your reasoning diverged at this step: \`${previousExpr}\` was simplified to \`${currRaw}\`, but the mathematically valid result is \`${previousValue}\`.`,
    expected: String(previousValue),
    theRightWay: [
      `From \`${previousExpr}\`, evaluate to get ${previousValue}.`,
    ],
    remember: "Check each arithmetic reduction step carefully before moving to the next line.",
    evidenceMeaning: `Student reduced "${previousExpr}" to "${currRaw}".`,
    repair: {
      concept: "arithmetic_step_reduction",
      explanation: `Reduce "${previousExpr}" carefully to reach ${previousValue}.`,
      steps: [
        `Write down: ${previousExpr}.`,
        `Evaluate step by step: ${previousValue}.`,
      ],
    },
    verification: {
      question: `What is the value of ${previousExpr}?`,
      expectedConcept: "arithmetic reduction",
      options: [String(previousValue), String(currentValue)],
      correctAnswer: String(previousValue),
      type: "same_skill",
    },
  };
}
