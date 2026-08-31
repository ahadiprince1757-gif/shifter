/**
 * TIXAR — Engine 1: Answer & Math AST Parser
 *
 * Responsibilities:
 *
 *   1. Extract semantic relationships from natural-language answers.
 *   2. Parse common mathematical expressions into structured AST nodes.
 *   3. Extract signed numbers safely.
 *   4. Preserve enough information for downstream diagnostic engines.
 *
 * Design principle:
 *
 *   Parsing is NOT grading.
 *
 * This engine should describe what the student wrote.
 * It should NOT decide whether the student is correct.
 *
 * Later engines can use the parsed representation to diagnose:
 *
 *   - conceptual errors
 *   - operation errors
 *   - sign errors
 *   - calculation errors
 *   - missing components
 *   - equivalent mathematical forms
 */

// ============================================================================
// 1. SEMANTIC TRIPLE EXTRACTION
// ============================================================================

const PREDICATE_PATTERNS = [
  {
    key: "IS_A",
    regex:
      /\b(.+?)\s+(?:is|are|was|were)\s+(?:a|an|the)?\s+(.+)$/i,
  },

  {
    key: "USED_FOR",
    regex:
      /\b(.+?)\s+(?:is\s+)?(?:used\s+for|used\s+to|serves\s+to|functions?\s+to)\s+(.+)$/i,
  },

  {
    key: "ACTS_ON",
    regex:
      /\b(.+?)\s+(?:acts?\s+on|acts?\s+upon|targets?|examines?|observes?|magnifies?)\s+(.+)$/i,
  },

  {
    key: "CONVERTS",
    regex:
      /\b(.+?)\s+(?:converts?|transforms?|turns?)\s+(.+?)\s+into\s+(.+)$/i,
  },

  {
    key: "PRODUCES",
    regex:
      /\b(.+?)\s+(?:produces?|generates?|yields?|forms?|creates?)\s+(.+)$/i,
  },

  {
    key: "CONSISTS_OF",
    regex:
      /\b(.+?)\s+(?:consists?\s+of|is\s+made\s+of|is\s+composed\s+of|contains?|has)\s+(.+)$/i,
  },

  {
    key: "REQUIRES",
    regex:
      /\b(.+?)\s+(?:requires?|needs?|uses?|depends?\s+on)\s+(.+)$/i,
  },
];

/**
 * Extract semantic triples.
 *
 * Example:
 *
 *   "Photosynthesis produces glucose."
 *
 * becomes:
 *
 *   {
 *     subject: "photosynthesis",
 *     predicate: "PRODUCES",
 *     object: "glucose"
 *   }
 *
 * @param {string} text
 * @returns {Array<Object>}
 */
export function extractSemanticTriples(text) {
  if (
    typeof text !== "string" ||
    !text.trim()
  ) {
    return [];
  }

  const sentences = splitIntoSentences(
    text
  );

  const triples = [];

  for (const sentence of sentences) {
    const cleanSentence =
      normalizeSemanticText(
        sentence
      );

    if (!cleanSentence) {
      continue;
    }

    for (
      const pattern of PREDICATE_PATTERNS
    ) {
      const match =
        cleanSentence.match(
          pattern.regex
        );

      if (!match) {
        continue;
      }

      let subject;
      let object;

      /*
       * CONVERTS has:
       *
       * match[1] = subject
       * match[2] = source
       * match[3] = destination
       */
      if (
        pattern.key === "CONVERTS"
      ) {
        subject = cleanSemanticPhrase(
          match[1]
        );

        object = `${cleanSemanticPhrase(match[2])} -> ${cleanSemanticPhrase(match[3])}`;
      } else {
        subject = cleanSemanticPhrase(
          match[1]
        );

        object = cleanSemanticPhrase(
          match[2]
        );
      }

      if (
        !subject ||
        !object
      ) {
        continue;
      }

      triples.push({
        subject,
        predicate:
          pattern.key,
        object,
        raw: sentence.trim(),
      });

      /*
       * One sentence should normally produce
       * one dominant relationship.
       */
      break;
    }
  }

  return deduplicateTriples(
    triples
  );
}

function splitIntoSentences(
  text
) {
  return text
    .replace(/\r\n/g, "\n")
    .split(/[.!?;\n]+/)
    .map(
      sentence =>
        sentence.trim()
    )
    .filter(Boolean);
}

function normalizeSemanticText(
  text
) {
  return String(text)
    .toLowerCase()
    .replace(
      /[“”"]/g,
      ""
    )
    .replace(
      /[’']/g,
      "'"
    )
    .replace(
      /[^\p{L}\p{N}\s,_-]/gu,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

function cleanSemanticPhrase(
  phrase
) {
  return String(
    phrase || ""
  )
    .replace(
      /^(?:the|a|an)\s+/i,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

function deduplicateTriples(
  triples
) {
  const seen = new Set();

  return triples.filter(
    triple => {
      const key = `${triple.subject}|${triple.predicate}|${triple.object}`;

      if (
        seen.has(key)
      ) {
        return false;
      }

      seen.add(key);

      return true;
    }
  );
}

// ============================================================================
// 2. MATHEMATICAL AST
// ============================================================================

/**
 * Parse a mathematical expression.
 *
 * Supports:
 *
 *   5
 *   -5
 *   x
 *   -x
 *   5x
 *   5x^2
 *   x^2
 *   2 + 3
 *   2 - 3
 *   2 * 3
 *   2 / 3
 *   (x + 2)
 *   2(x + 3)
 *   x = 5
 *
 * This is deliberately a lightweight parser.
 * It is NOT intended to replace a full CAS.
 *
 * @param {string} exprStr
 * @returns {Object}
 */
export function parseMathAST(
  exprStr
) {
  if (
    typeof exprStr !== "string" ||
    !exprStr.trim()
  ) {
    return {
      type: "EMPTY",
      raw: "",
    };
  }

  const original =
    exprStr.trim();

  const clean =
    normalizeMathExpression(
      original
    );

  if (!clean) {
    return {
      type: "EMPTY",
      raw: original,
    };
  }

  // --------------------------------------------------------------------------
  // EQUATION
  // --------------------------------------------------------------------------

  const equalityIndex =
    findTopLevelEquality(
      clean
    );

  if (
    equalityIndex !== -1
  ) {
    const lhs =
      clean.slice(
        0,
        equalityIndex
      );

    const rhs =
      clean.slice(
        equalityIndex + 1
      );

    return {
      type: "EQUATION",
      raw: original,
      lhs: parseMathAST(
        lhs
      ),
      rhs: parseMathAST(
        rhs
      ),
    };
  }

  // --------------------------------------------------------------------------
  // PARENTHESES
  // --------------------------------------------------------------------------

  if (
    isWrappedByParentheses(
      clean
    )
  ) {
    return {
      type: "GROUP",
      raw: original,
      expression:
        parseMathAST(
          clean.slice(
            1,
            -1
          )
        ),
    };
  }

  // --------------------------------------------------------------------------
  // ADDITION / SUBTRACTION
  // --------------------------------------------------------------------------

  const addSub =
    findTopLevelOperator(
      clean,
      ["+", "-"]
    );

  if (
    addSub !== -1
  ) {
    const operator =
      clean[addSub];

    return {
      type: "BINARY_OPERATION",
      raw: original,
      operator,
      left: parseMathAST(
        clean.slice(
          0,
          addSub
        )
      ),
      right: parseMathAST(
        clean.slice(
          addSub + 1
        )
      ),
    };
  }

  // --------------------------------------------------------------------------
  // MULTIPLICATION / DIVISION
  // --------------------------------------------------------------------------

  const multiplyDivide =
    findTopLevelOperator(
      clean,
      ["*", "/"]
    );

  if (
    multiplyDivide !== -1
  ) {
    const operator =
      clean[
        multiplyDivide
      ];

    return {
      type: "BINARY_OPERATION",
      raw: original,
      operator,
      left: parseMathAST(
        clean.slice(
          0,
          multiplyDivide
        )
      ),
      right: parseMathAST(
        clean.slice(
          multiplyDivide + 1
        )
      ),
    };
  }

  // --------------------------------------------------------------------------
  // POWER
  // --------------------------------------------------------------------------

  const powerIndex =
    findTopLevelOperator(
      clean,
      ["^"]
    );

  if (
    powerIndex !== -1
  ) {
    return {
      type: "BINARY_OPERATION",
      raw: original,
      operator: "^",
      left: parseMathAST(
        clean.slice(
          0,
          powerIndex
        )
      ),
      right: parseMathAST(
        clean.slice(
          powerIndex + 1
        )
      ),
    };
  }

  // --------------------------------------------------------------------------
  // SINGLE TERM / NUMBER / VARIABLE
  // --------------------------------------------------------------------------

  const term =
    parseTerm(clean);

  if (
    term
  ) {
    return term;
  }

  // --------------------------------------------------------------------------
  // UNKNOWN
  // --------------------------------------------------------------------------

  return {
    type: "UNKNOWN",
    raw: original,
  };
}

// ============================================================================
// 3. TERM PARSER
// ============================================================================

/**
 * Parse terms such as:
 *
 *   5
 *   -5
 *   x
 *   -x
 *   5x
 *   -5x
 *   5x^2
 *   x^2
 *   -3.5y^4
 */
function parseTerm(
  termStr
) {
  const source =
    String(
      termStr || ""
    ).trim();

  if (!source) {
    return null;
  }

  /*
   * Standalone number.
   */
  if (
    /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(
      source
    )
  ) {
    const value =
      Number(source);

    if (
      Number.isFinite(value)
    ) {
      return {
        type: "NUMBER",
        value,
        raw: source,
      };
    }
  }

  /*
   * Algebraic term.
   *
   * Examples:
   *
   *   x
   *   -x
   *   5x
   *   -5x
   *   x^2
   *   5x^2
   */
  const match =
    source.match(
      /^([+-])?(?:(\d+(?:\.\d+)?|\.\d+))?([a-zA-Z]+)(?:\^([+-]?\d+(?:\.\d+)?))?$/
    );

  if (!match) {
    return null;
  }

  const sign =
    match[1] === "-"
      ? -1
      : 1;

  const coefficient =
    match[2] !== undefined
      ? Number(match[2])
      : 1;

  const variable =
    match[3];

  const exponent =
    match[4] !== undefined
      ? Number(match[4])
      : 1;

  if (
    !Number.isFinite(
      coefficient
    ) ||
    !Number.isFinite(
      exponent
    )
  ) {
    return null;
  }

  return {
    type: "TERM",

    sign,

    coefficient:
      sign * coefficient,

    variable,

    exponent,

    raw: source,
  };
}

// ============================================================================
// 4. MATH NORMALIZATION
// ============================================================================

function normalizeMathExpression(
  expression
) {
  return String(
    expression || ""
  )
    .toLowerCase()
    .replace(
      /[\u2212\u2013\u2014]/g,
      "-"
    )
    .replace(
      /×/g,
      "*"
    )
    .replace(
      /÷/g,
      "/"
    )
    .replace(
      /·/g,
      "*"
    )
    .replace(
      /²/g,
      "^2"
    )
    .replace(
      /³/g,
      "^3"
    )
    .replace(
      /⁴/g,
      "^4"
    )
    .replace(
      /\s+/g,
      ""
    );
}

// ============================================================================
// 5. TOP-LEVEL OPERATOR FINDER
// ============================================================================

function findTopLevelOperator(
  expression,
  operators
) {
  let depth = 0;

  /*
   * Search from right to left.
   *
   * This makes:
   *
   *   2 + 3 + 4
   *
   * become:
   *
   *   (2 + 3) + 4
   *
   * rather than:
   *
   *   2 + (3 + 4)
   */
  for (
    let i =
      expression.length - 1;
    i >= 0;
    i--
  ) {
    const char =
      expression[i];

    if (
      char === ")"
    ) {
      depth++;
      continue;
    }

    if (
      char === "("
    ) {
      depth--;
      continue;
    }

    if (
      depth !== 0
    ) {
      continue;
    }

    if (
      !operators.includes(
        char
      )
    ) {
      continue;
    }

    /*
     * A + or - at position 0 is a unary sign,
     * not a binary operator.
     */
    if (
      (char === "+" ||
        char === "-") &&
      isUnaryOperator(
        expression,
        i
      )
    ) {
      continue;
    }

    return i;
  }

  return -1;
}

function isUnaryOperator(
  expression,
  index
) {
  if (
    index === 0
  ) {
    return true;
  }

  const previous =
    expression[index - 1];

  return (
    previous === "(" ||
    previous === "+" ||
    previous === "-" ||
    previous === "*" ||
    previous === "/" ||
    previous === "^" ||
    previous === "="
  );
}

// ============================================================================
// 6. TOP-LEVEL EQUALITY
// ============================================================================

function findTopLevelEquality(
  expression
) {
  let depth = 0;

  for (
    let i = 0;
    i < expression.length;
    i++
  ) {
    const char =
      expression[i];

    if (
      char === "("
    ) {
      depth++;
    } else if (
      char === ")"
    ) {
      depth--;
    } else if (
      char === "=" &&
      depth === 0
    ) {
      return i;
    }
  }

  return -1;
}

// ============================================================================
// 7. PARENTHESES
// ============================================================================

function isWrappedByParentheses(
  expression
) {
  if (
    expression[0] !== "(" ||
    expression[
      expression.length - 1
    ] !== ")"
  ) {
    return false;
  }

  let depth = 0;

  for (
    let i = 0;
    i < expression.length;
    i++
  ) {
    if (
      expression[i] === "("
    ) {
      depth++;
    } else if (
      expression[i] === ")"
    ) {
      depth--;
    }

    /*
     * The first opening parenthesis closed
     * before the final character.
     *
     * Therefore the outer parentheses
     * do not wrap the entire expression.
     */
    if (
      depth === 0 &&
      i <
        expression.length - 1
    ) {
      return false;
    }
  }

  return depth === 0;
}

// ============================================================================
// 8. NUMBER EXTRACTION
// ============================================================================

/**
 * Extract signed numbers from text.
 *
 * Examples:
 *
 *   "-5 + 3"      -> [-5, 3]
 *   "x = -2.5"    -> [-2.5]
 *   "3.5 kg"      -> [3.5]
 *
 * @param {string} str
 * @returns {number[]}
 */
export function extractSignedNumbers(
  str
) {
  if (
    typeof str !== "string" ||
    !str.trim()
  ) {
    return [];
  }

  const normalized =
    str.replace(
      /[\u2212\u2013\u2014]/g,
      "-"
    );

  const matches =
    normalized.match(
      /[-+]?(?:\d+(?:\.\d+)?|\.\d+)/g
    ) || [];

  return matches
    .map(Number)
    .filter(
      Number.isFinite
    );
}

// ============================================================================
// 9. STRUCTURAL MATH INFORMATION
// ============================================================================

/**
 * Extract useful structural information from an AST.
 *
 * This gives later diagnostic engines a much better signal than
 * comparing raw strings.
 */
export function analyseMathAST(
  ast
) {
  if (
    !ast ||
    typeof ast !==
      "object"
  ) {
    return {
      variables: [],
      numbers: [],
      operators: [],
      depth: 0,
      nodeCount: 0,
    };
  }

  const variables =
    new Set();

  const numbers =
    [];

  const operators =
    [];

  let depth = 0;
  let nodeCount = 0;

  function visit(
    node,
    currentDepth = 0
  ) {
    if (
      !node ||
      typeof node !==
        "object"
    ) {
      return;
    }

    nodeCount++;

    depth =
      Math.max(
        depth,
        currentDepth
      );

    if (
      node.type ===
      "NUMBER"
    ) {
      numbers.push(
        node.value
      );
    }

    if (
      node.type ===
      "TERM"
    ) {
      if (
        node.variable
      ) {
        variables.add(
          node.variable
        );
      }

      if (
        Number.isFinite(
          node.coefficient
        )
      ) {
        numbers.push(
          node.coefficient
        );
      }

      if (
        Number.isFinite(
          node.exponent
        )
      ) {
        numbers.push(
          node.exponent
        );
      }
    }

    if (
      node.type ===
        "BINARY_OPERATION"
    ) {
      operators.push(
        node.operator
      );
    }

    for (
      const key of [
        "lhs",
        "rhs",
        "left",
        "right",
        "expression",
      ]
    ) {
      if (
        node[key]
      ) {
        visit(
          node[key],
          currentDepth + 1
        );
      }
    }
  }

  visit(ast);

  return {
    variables:
      Array.from(
        variables
      ),

    numbers,

    operators,

    depth,

    nodeCount,
  };
}

// ============================================================================
// 10. FINAL ANSWER EXTRACTION
// ============================================================================

/**
 * Attempts to identify the student's final mathematical conclusion.
 *
 * This does NOT determine correctness.
 *
 * Example:
 *
 *   "3x = 12
 *    x = 4"
 *
 * returns:
 *
 *   {
 *      value: 4,
 *      expression: "x = 4"
 *   }
 */
export function extractFinalMathConclusion(
  text
) {
  if (
    typeof text !==
      "string" ||
    !text.trim()
  ) {
    return null;
  }

  const lines =
    text
      .split(
        /[\n;]+/
      )
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  /*
   * Prefer the final line containing "=".
   */
  for (
    let i =
      lines.length - 1;
    i >= 0;
    i--
  ) {
    const line =
      lines[i];

    const match =
      line.match(
        /(?:=|equals?)\s*([-+]?(?:\d+(?:\.\d+)?|\.\d+))\s*(?:[a-zA-Z]+)?$/i
      );

    if (match) {
      return {
        value:
          Number(match[1]),

        expression:
          line,

        lineIndex:
          i,

        confidence: 0.95,
      };
    }
  }

  /*
   * Otherwise inspect the final numeric token.
   */
  const numbers =
    extractSignedNumbers(
      lines[
        lines.length - 1
      ] || text
    );

  if (
    numbers.length > 0
  ) {
    return {
      value:
        numbers[
          numbers.length - 1
        ],

      expression:
        lines[
          lines.length - 1
        ] || text,

      lineIndex:
        Math.max(
          0,
          lines.length - 1
        ),

      confidence: 0.55,
    };
  }

  return null;
}

// ============================================================================
// 11. ANSWER PARSER
// ============================================================================

/**
 * Unified parser used by the rest of Tixar.
 *
 * This creates a single representation of the student's answer.
 */
export function parseStudentAnswer(
  answer
) {
  const text =
    String(
      answer || ""
    ).trim();

  if (!text) {
    return {
      raw: "",
      normalized: "",
      semanticTriples: [],
      mathAST: {
        type: "EMPTY",
        raw: "",
      },
      mathAnalysis: {
        variables: [],
        numbers: [],
        operators: [],
        depth: 0,
        nodeCount: 0,
      },
      finalConclusion: null,
    };
  }

  const mathAST =
    parseMathAST(
      text
    );

  return {
    raw: text,

    normalized:
      normalizeAnswerText(
        text
      ),

    semanticTriples:
      extractSemanticTriples(
        text
      ),

    mathAST,

    mathAnalysis:
      analyseMathAST(
        mathAST
      ),

    finalConclusion:
      extractFinalMathConclusion(
        text
      ),
  };
}

// ============================================================================
// 12. GENERAL ANSWER NORMALIZATION
// ============================================================================

export function normalizeAnswerText(
  text
) {
  return String(
    text || ""
  )
    .toLowerCase()
    .replace(
      /[\u2018\u2019\u201C\u201D]/g,
      ""
    )
    .replace(
      /[\u2212\u2013\u2014]/g,
      "-"
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}
