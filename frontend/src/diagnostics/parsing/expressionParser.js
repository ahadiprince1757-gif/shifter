/**
 * Mathematical Tokenizer and AST Expression Parser.
 * Evaluates expressions and extracts linear polynomial forms (ax + b).
 */

import { Fraction } from "./fractionParser.js";
import { normalizeMathText } from "./textNormalizer.js";

export function tokenize(input) {
  const text = normalizeMathText(input);
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Number (including decimals)
    if (/\d/.test(ch) || (ch === "." && /\d/.test(text[i + 1] || ""))) {
      let numStr = "";
      while (i < text.length && (/\d/.test(text[i]) || text[i] === ".")) {
        numStr += text[i];
        i++;
      }
      tokens.push({ type: "NUMBER", value: numStr });
      continue;
    }

    // Variable or identifier (e.g. x, y, speed, km)
    if (/[a-zA-Z_]/.test(ch)) {
      let idStr = "";
      while (i < text.length && /[a-zA-Z0-9_]/.test(text[i])) {
        idStr += text[i];
        i++;
      }
      tokens.push({ type: "VAR", value: idStr });
      continue;
    }

    // Operators and delimiters
    if ("+-*/^()=".includes(ch)) {
      tokens.push({ type: "OP", value: ch });
      i++;
      continue;
    }

    // Unrecognized single character
    tokens.push({ type: "UNKNOWN", value: ch });
    i++;
  }

  return tokens;
}

/**
 * Parser producing an Abstract Syntax Tree (AST).
 * Grammar:
 * Expression -> Term ( ('+' | '-') Term )*
 * Term       -> Factor ( ('*' | '/') Factor )*
 * Factor     -> Power
 * Power      -> Primary ( '^' Primary )*
 * Primary    -> NUMBER | VAR | '(' Expression ')' | ('-' | '+') Primary
 */
export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  peek() {
    return this.tokens[this.pos] || null;
  }

  consume() {
    return this.tokens[this.pos++];
  }

  match(type, value) {
    const t = this.peek();
    if (!t) return false;
    if (type && t.type !== type) return false;
    if (value && t.value !== value) return false;
    this.consume();
    return true;
  }

  parseExpression() {
    let node = this.parseTerm();
    while (this.peek() && this.peek().type === "OP" && (this.peek().value === "+" || this.peek().value === "-")) {
      const op = this.consume().value;
      const right = this.parseTerm();
      node = { type: "BINARY", op, left: node, right };
    }
    return node;
  }

  parseTerm() {
    let node = this.parsePrimary();

    while (this.peek()) {
      // Check explicit * or /
      if (this.peek().type === "OP" && (this.peek().value === "*" || this.peek().value === "/")) {
        const op = this.consume().value;
        const right = this.parsePrimary();
        node = { type: "BINARY", op, left: node, right };
      }
      // Implicit multiplication: 3x or 3(x + 1) or (a)(b)
      else if (
        this.peek().type === "VAR" ||
        (this.peek().type === "OP" && this.peek().value === "(")
      ) {
        const right = this.parsePrimary();
        node = { type: "BINARY", op: "*", left: node, right };
      } else {
        break;
      }
    }
    return node;
  }

  parsePrimary() {
    const t = this.peek();
    if (!t) throw new Error("Unexpected end of expression");

    // Unary +/-
    if (t.type === "OP" && (t.value === "-" || t.value === "+")) {
      this.consume();
      const operand = this.parsePrimary();
      if (t.value === "-") {
        return { type: "UNARY", op: "-", operand };
      }
      return operand;
    }

    if (t.type === "NUMBER") {
      this.consume();
      return { type: "NUMBER", value: parseFloat(t.value), raw: t.value };
    }

    if (t.type === "VAR") {
      this.consume();
      return { type: "VAR", name: t.value };
    }

    if (t.type === "OP" && t.value === "(") {
      this.consume();
      const node = this.parseExpression();
      if (!this.match("OP", ")")) {
        throw new Error("Missing closing parenthesis");
      }
      return node;
    }

    throw new Error(`Unexpected token: ${t.value}`);
  }
}

export function parseExpression(input) {
  const tokens = tokenize(input);
  if (tokens.length === 0) return null;
  const parser = new Parser(tokens);
  return parser.parseExpression();
}

/**
 * Evaluates an AST numerically given a variable environment.
 */
export function evaluateAST(node, env = {}) {
  if (!node) return 0;
  switch (node.type) {
    case "NUMBER":
      return node.value;
    case "VAR":
      if (env[node.name] !== undefined) return env[node.name];
      throw new Error(`Unbound variable: ${node.name}`);
    case "UNARY":
      if (node.op === "-") return -evaluateAST(node.operand, env);
      return evaluateAST(node.operand, env);
    case "BINARY": {
      const l = evaluateAST(node.left, env);
      const r = evaluateAST(node.right, env);
      switch (node.op) {
        case "+": return l + r;
        case "-": return l - r;
        case "*": return l * r;
        case "/":
          if (r === 0) throw new Error("Division by zero");
          return l / r;
        case "^": return Math.pow(l, r);
        default: throw new Error(`Unknown operator ${node.op}`);
      }
    }
    default:
      throw new Error(`Unknown node type ${node.type}`);
  }
}

/**
 * Linearizes an expression with respect to variable `varName`:
 * returns { a: Fraction, b: Fraction } representing a*x + b
 */
export function linearizeExpression(node, varName = "x") {
  if (!node) return { a: new Fraction(0), b: new Fraction(0) };

  switch (node.type) {
    case "NUMBER":
      return { a: new Fraction(0), b: Fraction.from(node.value) };

    case "VAR":
      if (node.name === varName) {
        return { a: new Fraction(1), b: new Fraction(0) };
      }
      throw new Error(`Non-target variable encountered: ${node.name}`);

    case "UNARY":
      if (node.op === "-") {
        const inner = linearizeExpression(node.operand, varName);
        return {
          a: inner.a.mul(new Fraction(-1)),
          b: inner.b.mul(new Fraction(-1)),
        };
      }
      return linearizeExpression(node.operand, varName);

    case "BINARY": {
      const left = linearizeExpression(node.left, varName);
      const right = linearizeExpression(node.right, varName);

      if (node.op === "+") {
        return {
          a: left.a.add(right.a),
          b: left.b.add(right.b),
        };
      }
      if (node.op === "-") {
        return {
          a: left.a.sub(right.a),
          b: left.b.sub(right.b),
        };
      }
      if (node.op === "*") {
        // Can multiply if at least one side is constant (a == 0)
        if (left.a.n === 0) {
          return {
            a: right.a.mul(left.b),
            b: right.b.mul(left.b),
          };
        }
        if (right.a.n === 0) {
          return {
            a: left.a.mul(right.b),
            b: left.b.mul(right.b),
          };
        }
        throw new Error("Non-linear multiplication (x * x)");
      }
      if (node.op === "/") {
        // Division only valid if divisor is purely constant
        if (right.a.n !== 0) throw new Error("Division by variable term");
        return {
          a: left.a.div(right.b),
          b: left.b.div(right.b),
        };
      }
      throw new Error(`Unsupported binary operator in linear expression: ${node.op}`);
    }

    default:
      throw new Error(`Cannot linearize node type ${node.type}`);
  }
}
