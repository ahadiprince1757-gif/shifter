/**
 * Safe Deterministic Math Evaluator & Intent Router for Tixar
 *
 * Purpose:
 * Prevent LLM hallucinations on deterministic mathematics by routing
 * supported math queries through a local, deterministic evaluator first.
 *
 * Supported:
 *   - Basic arithmetic
 *   - Parentheses
 *   - Percentages
 *   - Exponents
 *   - Square roots
 *   - Decimals
 *   - Negative numbers
 *   - Scientific notation
 *
 * Unsupported expressions are returned as isMath: false so the caller
 * can route them to another solver / LLM.
 */

// -----------------------------------------------------------------------------
// 1. MATH DETECTION
// -----------------------------------------------------------------------------

/**
 * Characters allowed in a pure mathematical expression.
 *
 * Scientific notation is supported, e.g.
 *   2e3
 *   1.5e-2
 */
const PURE_MATH_REGEX =
  /^[\d\s+\-*/%^().,×÷eE]+$/;

/**
 * Common conversational prefixes.
 *
 * Examples:
 *   "what is 5 + 3"
 *   "calculate 20 / 4"
 *   "solve 12 * 7"
 */
const MATH_PREFIXES =
  /^(what\s+is|calculate|compute|solve|eval(?:uate)?|find|value\s+of|how\s+much\s+is)\s+/i;

// -----------------------------------------------------------------------------
// 2. WORD-PROBLEM HANDLERS
// -----------------------------------------------------------------------------

const NUMBER_PATTERN =
  "(-?(?:\\d+(?:\\.\\d*)?|\\.\\d+))";

const WORD_PROBLEM_PATTERNS = [
  /**
   * "What is 15% of 250?"
   */
  {
    regex: new RegExp(
      `^what\\s+is\\s+${NUMBER_PATTERN}%\\s+of\\s+${NUMBER_PATTERN}\\??$`,
      "i"
    ),

    handler: (match) => {
      const pct = Number(match[1]);
      const total = Number(match[2]);

      const result = (pct / 100) * total;

      return {
        answer: `${formatNumber(pct)}% of ${formatNumber(total)} = ${formatNumber(result)}`,
        value: result,
      };
    },
  },

  /**
   * "What is 5 plus 10?"
   * "What is 5 times 10?"
   * "What is 10 divided by 2?"
   */
  {
    regex: new RegExp(
      `^what\\s+is\\s+${NUMBER_PATTERN}\\s+(plus|add|\\+|minus|subtract|-|times|multiplied\\s+by|\\*|divided\\s+by|/)\\s+${NUMBER_PATTERN}\\??$`,
      "i"
    ),

    handler: (match) => {
      const a = Number(match[1]);
      const op = match[2].toLowerCase().replace(/\s+/g, " ");
      const b = Number(match[3]);

      let result;
      let symbol;

      switch (op) {
        case "plus":
        case "add":
        case "+":
          result = a + b;
          symbol = "+";
          break;

        case "minus":
        case "subtract":
        case "-":
          result = a - b;
          symbol = "−";
          break;

        case "times":
        case "multiplied by":
        case "*":
          result = a * b;
          symbol = "×";
          break;

        case "divided by":
        case "/":
          if (b === 0) {
            return {
              answer: "Error: Division by zero is undefined.",
              error: "DIVISION_BY_ZERO",
            };
          }

          result = a / b;
          symbol = "÷";
          break;

        default:
          return null;
      }

      return {
        answer: `${formatNumber(a)} ${symbol} ${formatNumber(b)} = ${formatNumber(result)}`,
        value: result,
      };
    },
  },

  /**
   * "Square root of 144"
   * "sqrt 144"
   */
  {
    regex: new RegExp(
      `^(?:square\\s+root\\s+of|sqrt\\s+of?|√)\\s*${NUMBER_PATTERN}\\??$`,
      "i"
    ),

    handler: (match) => {
      const value = Number(match[1]);

      if (value < 0) {
        return {
          answer: "Error: The square root of a negative number is not a real number.",
          error: "NEGATIVE_SQUARE_ROOT",
        };
      }

      const result = Math.sqrt(value);

      return {
        answer: `√${formatNumber(value)} = ${formatNumber(result)}`,
        value: result,
      };
    },
  },
];

// -----------------------------------------------------------------------------
// 3. NUMBER FORMATTING
// -----------------------------------------------------------------------------

/**
 * Prevent ugly floating-point output such as:
 *
 *   0.30000000000000004
 *
 * while preserving useful precision.
 */
function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  if (Object.is(value, -0)) {
    return "0";
  }

  const rounded =
    Math.abs(value) < 1e12
      ? Number(value.toPrecision(12))
      : value;

  return String(rounded);
}

// -----------------------------------------------------------------------------
// 4. TOKENIZER
// -----------------------------------------------------------------------------

/**
 * Tokenizes a mathematical expression.
 *
 * Examples:
 *
 *   "2 + 3"
 *   ["2", "+", "3"]
 *
 *   "-5 * 2"
 *   ["-", "5", "*", "2"]
 *
 *   "2^-3"
 *   ["2", "^", "-", "3"]
 */
function tokenizeMath(expression) {
  const tokens = [];

  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    // Ignore whitespace.
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Operators / parentheses.
    if ("+-*/%^()".includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    // Unicode math operators.
    if (char === "×") {
      tokens.push("*");
      i++;
      continue;
    }

    if (char === "÷") {
      tokens.push("/");
      i++;
      continue;
    }

    // Number / decimal / scientific notation.
    if (/\d|\./.test(char)) {
      let number = "";

      // Integer / decimal portion.
      while (
        i < expression.length &&
        /[\d.]/.test(expression[i])
      ) {
        number += expression[i];
        i++;
      }

      // Scientific notation.
      if (
        i < expression.length &&
        /[eE]/.test(expression[i])
      ) {
        number += expression[i];
        i++;

        if (
          i < expression.length &&
          /[+-]/.test(expression[i])
        ) {
          number += expression[i];
          i++;
        }

        const exponentStart = i;

        while (
          i < expression.length &&
          /\d/.test(expression[i])
        ) {
          number += expression[i];
          i++;
        }

        // "2e" or "2e+" is invalid.
        if (i === exponentStart) {
          throw new Error("Invalid scientific notation");
        }
      }

      const numericValue = Number(number);

      if (!Number.isFinite(numericValue)) {
        throw new Error("Invalid number");
      }

      tokens.push(numericValue);
      continue;
    }

    throw new Error(
      `Invalid character "${char}" in mathematical expression`
    );
  }

  return tokens;
}

// -----------------------------------------------------------------------------
// 5. SHUNTING-YARD PARSER
// -----------------------------------------------------------------------------

const OPERATOR_PRECEDENCE = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "^": 3,
  "u+": 4,
  "u-": 4,
};

const RIGHT_ASSOCIATIVE = {
  "^": true,
  "u+": true,
  "u-": true,
};

/**
 * Determines whether a token is an operator.
 */
function isOperator(token) {
  return (
    typeof token === "string" &&
    Object.prototype.hasOwnProperty.call(
      OPERATOR_PRECEDENCE,
      token
    )
  );
}

/**
 * Convert infix tokens into Reverse Polish Notation.
 */
function toRPN(tokens) {
  const output = [];
  const operators = [];

  let expectingOperand = true;

  for (const token of tokens) {
    // Number.
    if (typeof token === "number") {
      output.push(token);
      expectingOperand = false;
      continue;
    }

    // Opening parenthesis.
    if (token === "(") {
      operators.push(token);
      expectingOperand = true;
      continue;
    }

    // Closing parenthesis.
    if (token === ")") {
      let foundOpeningParenthesis = false;

      while (operators.length > 0) {
        const top = operators.pop();

        if (top === "(") {
          foundOpeningParenthesis = true;
          break;
        }

        output.push(top);
      }

      if (!foundOpeningParenthesis) {
        throw new Error("Mismatched parentheses");
      }

      expectingOperand = false;
      continue;
    }

    // Operator.
    if (isOperator(token)) {
      let operator = token;

      // Unary + / -.
      if (
        expectingOperand &&
        (token === "+" || token === "-")
      ) {
        operator = token === "+" ? "u+" : "u-";
      }

      while (operators.length > 0) {
        const top = operators[operators.length - 1];

        if (!isOperator(top)) {
          break;
        }

        const currentPrecedence =
          OPERATOR_PRECEDENCE[operator];

        const topPrecedence =
          OPERATOR_PRECEDENCE[top];

        const shouldPop =
          RIGHT_ASSOCIATIVE[operator]
            ? currentPrecedence < topPrecedence
            : currentPrecedence <= topPrecedence;

        if (!shouldPop) {
          break;
        }

        output.push(operators.pop());
      }

      operators.push(operator);
      expectingOperand = true;
      continue;
    }

    throw new Error("Invalid token");
  }

  if (expectingOperand && tokens.length > 0) {
    throw new Error("Expression ends with an operator");
  }

  while (operators.length > 0) {
    const operator = operators.pop();

    if (operator === "(" || operator === ")") {
      throw new Error("Mismatched parentheses");
    }

    output.push(operator);
  }

  return output;
}

// -----------------------------------------------------------------------------
// 6. RPN EVALUATOR
// -----------------------------------------------------------------------------

function evaluateRPN(rpn) {
  const stack = [];

  for (const token of rpn) {
    // Number.
    if (typeof token === "number") {
      stack.push(token);
      continue;
    }

    // Unary operators.
    if (token === "u+" || token === "u-") {
      if (stack.length < 1) {
        throw new Error("Invalid unary operator");
      }

      const value = stack.pop();

      stack.push(
        token === "u-" ? -value : value
      );

      continue;
    }

    // Binary operators.
    if (stack.length < 2) {
      throw new Error("Invalid expression format");
    }

    const b = stack.pop();
    const a = stack.pop();

    let result;

    switch (token) {
      case "+":
        result = a + b;
        break;

      case "-":
        result = a - b;
        break;

      case "*":
        result = a * b;
        break;

      case "/":
        if (b === 0) {
          throw new Error("Division by zero");
        }

        result = a / b;
        break;

      case "%":
        if (b === 0) {
          throw new Error("Modulo by zero");
        }

        result = a % b;
        break;

      case "^":
        result = Math.pow(a, b);
        break;

      default:
        throw new Error(
          `Unsupported operator: ${token}`
        );
    }

    if (!Number.isFinite(result)) {
      throw new Error("Result is not finite");
    }

    stack.push(result);
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack[0];
}

// -----------------------------------------------------------------------------
// 7. SAFE MATH EVALUATOR
// -----------------------------------------------------------------------------

/**
 * Safely evaluates a mathematical expression.
 *
 * NEVER uses eval() or Function().
 *
 * @param {string} expr
 * @returns {number}
 */
export function safeEvaluateMath(expr) {
  if (typeof expr !== "string") {
    throw new Error("Expression must be a string");
  }

  const normalized = expr
    .trim()
    .replace(/,/g, "")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\^/g, "^");

  if (!normalized) {
    throw new Error("Empty expression");
  }

  // Character-level safety check.
  if (!PURE_MATH_REGEX.test(normalized)) {
    throw new Error("Invalid characters in expression");
  }

  const tokens = tokenizeMath(normalized);

  if (tokens.length === 0) {
    throw new Error("Empty expression");
  }

  const rpn = toRPN(tokens);

  return evaluateRPN(rpn);
}

// -----------------------------------------------------------------------------
// 8. MATH QUERY ROUTER
// -----------------------------------------------------------------------------

/**
 * Attempts to solve a math query deterministically.
 *
 * @param {string} prompt
 *
 * @returns {{
 *   isMath: boolean,
 *   deterministic: boolean,
 *   answer?: string,
 *   value?: number,
 *   expression?: string,
 *   error?: string
 * }}
 */
export function routeMathQuery(prompt) {
  if (typeof prompt !== "string") {
    return {
      isMath: false,
      deterministic: false,
    };
  }

  const trimmed = prompt.trim();

  if (!trimmed) {
    return {
      isMath: false,
      deterministic: false,
    };
  }

  // ---------------------------------------------------------------------------
  // 1. Word-problem patterns.
  // ---------------------------------------------------------------------------

  for (const pattern of WORD_PROBLEM_PATTERNS) {
    const match = trimmed.match(pattern.regex);

    if (!match) {
      continue;
    }

    try {
      const result = pattern.handler(match);

      if (!result) {
        continue;
      }

      return {
        isMath: true,
        deterministic: true,
        answer: result.answer,
        value: result.value,
      };
    } catch (error) {
      return {
        isMath: true,
        deterministic: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to solve deterministically",
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Remove conversational prefix.
  // ---------------------------------------------------------------------------

  let cleanedExpr = trimmed
    .replace(MATH_PREFIXES, "")
    .replace(/[?]+$/, "")
    .trim();

  // ---------------------------------------------------------------------------
  // 3. Normalize common notation.
  // ---------------------------------------------------------------------------

  cleanedExpr = cleanedExpr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

  // ---------------------------------------------------------------------------
  // 4. Pure mathematical expression.
  // ---------------------------------------------------------------------------

  if (!PURE_MATH_REGEX.test(cleanedExpr)) {
    return {
      isMath: false,
      deterministic: false,
    };
  }

  try {
    const result = safeEvaluateMath(cleanedExpr);

    return {
      isMath: true,
      deterministic: true,
      expression: cleanedExpr,
      value: result,
      answer: `${cleanedExpr} = ${formatNumber(result)}`,
    };
  } catch (error) {
    /*
     * Important:
     *
     * We detected something that LOOKS like math,
     * but our deterministic engine cannot safely solve it.
     *
     * Do not guess.
     *
     * Let the caller route it to a stronger math solver / LLM.
     */
    return {
      isMath: true,
      deterministic: false,
      expression: cleanedExpr,
      error:
        error instanceof Error
          ? error.message
          : "Unable to evaluate expression",
    };
  }
}