/**
 * Safe Deterministic Math Evaluator & Intent Router for Shifter / Tixar
 * 
 * Prevents LLM hallucinations on math by routing math queries to 
 * a deterministic JavaScript evaluator before hitting local LLMs / Ollama.
 */

// Basic math expression detection (numbers, operators, parentheses, decimal points)
const PURE_MATH_REGEX = /^[\d\s+\-*/%^().,eE]+$/;

// Common conversational math prefixes to clean up
const MATH_PREFIXES = /^(what is|calculate|compute|solve|eval|evaluate|find|value of|how much is)\s+/i;

// Word problem patterns for function calling
const WORD_PROBLEM_PATTERNS = [
  // "What is 15% of 250?"
  {
    regex: /^what\s+is\s+(\d+(?:\.\d+)?)\s*%\s+of\s+(\d+(?:\.\d+)?)/i,
    handler: (match) => {
      const pct = parseFloat(match[1]);
      const total = parseFloat(match[2]);
      const result = (pct / 100) * total;
      return `${pct}% of ${total} = ${result}`;
    }
  },
  // "What is 5 plus / minus / times / divided by 10?"
  {
    regex: /^what\s+is\s+(\d+(?:\.\d+)?)\s+(plus|add|\+|minus|subtract|-|times|multiplied by|\*|divided by|\/)\s+(\d+(?:\.\d+)?)/i,
    handler: (match) => {
      const a = parseFloat(match[1]);
      const op = match[2].toLowerCase();
      const b = parseFloat(match[3]);
      let res, opSymbol;

      if (op === "plus" || op === "add" || op === "+") {
        res = a + b;
        opSymbol = "+";
      } else if (op === "minus" || op === "subtract" || op === "-") {
        res = a - b;
        opSymbol = "-";
      } else if (op === "times" || op === "multiplied by" || op === "*") {
        res = a * b;
        opSymbol = "×";
      } else if (op === "divided by" || op === "/") {
        if (b === 0) return "Error: Division by zero is undefined.";
        res = a / b;
        opSymbol = "÷";
      }

      return `${a} ${opSymbol} ${b} = ${res}`;
    }
  },
  // "Square root of 144"
  {
    regex: /^(?:square\s+root\s+of|sqrt)\s+(\d+(?:\.\d+)?)/i,
    handler: (match) => {
      const val = parseFloat(match[1]);
      return `√${val} = ${Math.sqrt(val)}`;
    }
  }
];

/**
 * Safely evaluates a pure mathematical string expression without using eval().
 * Uses Shunting-yard algorithm for infix evaluation.
 */
export function safeEvaluateMath(expr) {
  // Clean whitespace and replace operators
  const sanitized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\^/g, "**")
    .replace(/\s+/g, "");

  // Tokenize numbers, operators, parentheses
  const tokens = sanitized.match(/(\d+(?:\.\d+)?|\*\*|[+\-*/%()])/g);
  if (!tokens || tokens.join("") !== sanitized) {
    throw new Error("Invalid characters in expression");
  }

  // Evaluate using a simple Shunting-yard + Stack execution
  const outputQueue = [];
  const operatorStack = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "**": 3 };
  const rightAssociative = { "**": true };

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(parseFloat(token));
    } else if (token in precedence) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] in precedence &&
        ((!rightAssociative[token] && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) ||
          (rightAssociative[token] && precedence[token] < precedence[operatorStack[operatorStack.length - 1]]))
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue.push(operatorStack.pop());
      }
      if (operatorStack.length === 0) throw new Error("Mismatched parentheses");
      operatorStack.pop(); // Remove '('
    }
  }

  while (operatorStack.length > 0) {
    const top = operatorStack.pop();
    if (top === "(" || top === ")") throw new Error("Mismatched parentheses");
    outputQueue.push(top);
  }

  // Execute RPN
  const stack = [];
  for (const token of outputQueue) {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      if (stack.length < 2) throw new Error("Invalid expression format");
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/":
          if (b === 0) throw new Error("Division by zero");
          stack.push(a / b);
          break;
        case "%": stack.push(a % b); break;
        case "**": stack.push(Math.pow(a, b)); break;
      }
    }
  }

  if (stack.length !== 1) throw new Error("Evaluation error");
  return stack[0];
}

/**
 * Attempts to extract and solve math queries deterministically.
 * @param {string} prompt User prompt
 * @returns {{ isMath: boolean, answer?: string, expression?: string }}
 */
export function routeMathQuery(prompt) {
  const trimmed = prompt.trim();

  // 1. Check Word Problem Patterns (Function Calling)
  for (const pattern of WORD_PROBLEM_PATTERNS) {
    const match = trimmed.match(pattern.regex);
    if (match) {
      const answerText = pattern.handler(match);
      return {
        isMath: true,
        answer: answerText,
      };
    }
  }

  // 2. Normalize and check for Pure Math Expression
  let cleanedExpr = trimmed.replace(MATH_PREFIXES, "").replace(/\?$/, "").trim();

  if (PURE_MATH_REGEX.test(cleanedExpr)) {
    try {
      const result = safeEvaluateMath(cleanedExpr);
      return {
        isMath: true,
        answer: `${cleanedExpr} = ${result}`,
      };
    } catch {
      // If safe evaluation failed, pass through to LLM
    }
  }

  return { isMath: false };
}
