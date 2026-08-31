/**
 * Engine 1: Answer & Math AST Parser
 *
 * Extracts semantic triples (Subject, Predicate, Object) from natural language
 * and parses mathematical equations into symbolic AST structures.
 */

// ── 1. SEMANTIC TRIPLE EXTRACTOR (Text & Definitions) ──────────────────────────

/**
 * Known predicates that define conceptual relationships
 */
const PREDICATE_PATTERNS = [
  { key: "IS_A", regex: /\b(is|are|was|were)\s+(?:a|an|the)?\s*([a-z0-9_]+)\b/i },
  { key: "USED_FOR", regex: /\b(used\s+for|used\s+to|function\s+is|serves\s+to)\s+([a-z0-9_]+(?:\s+[a-z0-9_]+)?)\b/i },
  { key: "ACTS_ON", regex: /\b(on|upon|target|targets|examines|observes|magnifies)\s+([a-z0-9_]+)\b/i },
  { key: "CONVERTS", regex: /\b(converts|transforms|turns)\s+([a-z0-9_]+)\s+into\s+([a-z0-9_]+)\b/i },
  { key: "PRODUCES", regex: /\b(produces|generates|yields|forms|creates)\s+([a-z0-9_]+)\b/i },
  { key: "CONSISTS_OF", regex: /\b(consists\s+of|made\s+of|composed\s+of|contains|has)\s+([a-z0-9_]+)\b/i },
  { key: "REQUIRES", regex: /\b(requires|needs|uses|depends\s+on)\s+([a-z0-9_]+)\b/i },
];

/**
 * Extracts semantic triples from student or reference text.
 * @param {string} text
 * @returns {Array<{subject: string, predicate: string, object: string, raw: string}>}
 */
export function extractSemanticTriples(text) {
  if (!text || typeof text !== "string") return [];

  const sentences = text
    .toLowerCase()
    .replace(/[^\w\s.,-]/g, " ")
    .split(/[.;]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const triples = [];

  for (const sentence of sentences) {
    const tokens = sentence.split(/\s+/).filter((t) => t.length > 2);

    for (const pattern of PREDICATE_PATTERNS) {
      const match = sentence.match(pattern.regex);
      if (match) {
        const subject = tokens[0] || "concept";
        const predicate = pattern.key;
        const object = match[2] || match[1];

        triples.push({
          subject: subject.trim(),
          predicate,
          object: object.trim(),
          raw: sentence,
        });
      }
    }
  }

  return triples;
}

// ── 2. SYMBOLIC MATH AST PARSER ───────────────────────────────────────────────

/**
 * Parses a math expression or equation string into a structured AST node.
 * Handles equations (LHS = RHS), terms, coefficients, variables, operators, and exponents.
 *
 * @param {string} exprStr
 * @returns {Object} AST node
 */
export function parseMathAST(exprStr) {
  if (!exprStr || typeof exprStr !== "string") {
    return { type: "EMPTY", raw: "" };
  }

  const clean = exprStr
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/x²/g, "x^2")
    .replace(/t²/g, "t^2")
    .replace(/y²/g, "y^2");

  // Equation: LHS = RHS
  if (clean.includes("=")) {
    const [lhsStr, rhsStr] = clean.split("=");
    return {
      type: "EQUATION",
      raw: exprStr,
      lhs: parseMathAST(lhsStr),
      rhs: parseMathAST(rhsStr),
    };
  }

  // Expression: parse terms
  const termRegex = /([+-]?\d*(?:\.\d+)?[a-z]?(?:\^\d+)?)/gi;
  const rawTerms = clean.match(termRegex)?.filter(Boolean) || [];

  const terms = rawTerms.map((tStr) => parseTerm(tStr));

  return {
    type: "EXPRESSION",
    raw: exprStr,
    terms,
  };
}

/**
 * Helper: Parses an individual algebraic term like "-5x^2", "20t", "25", "x"
 */
function parseTerm(termStr) {
  let sign = 1;
  let s = termStr;

  if (s.startsWith("-")) {
    sign = -1;
    s = s.slice(1);
  } else if (s.startsWith("+")) {
    s = s.slice(1);
  }

  // Match coefficient, variable, exponent
  const match = s.match(/^(\d+(?:\.\d+)?)?([a-z])?(?:\^(\d+))?$/i);

  if (!match) {
    return { sign, coeff: 1, var: null, exp: 0, raw: termStr };
  }

  const coeffNum = match[1] !== undefined ? parseFloat(match[1]) : (match[2] ? 1 : 0);
  const coeff = sign * coeffNum;
  const variable = match[2] || null;
  const exp = match[3] ? parseInt(match[3], 10) : (variable ? 1 : 0);

  return {
    sign,
    coeff,
    var: variable,
    exp,
    raw: termStr,
  };
}

/**
 * Extracts numbers from text/math string with their positions and signed values.
 */
export function extractSignedNumbers(str) {
  if (!str) return [];
  const matches = str.match(/-?\d+(?:\.\d+)?/g) || [];
  return matches.map((m) => parseFloat(m));
}
