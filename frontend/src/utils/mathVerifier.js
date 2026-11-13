/**
 * TIXAR MATH SELF-VERIFICATION ENGINE
 *
 * Independently computes mathematical answers from question text.
 *
 * Supported:
 * - Area: rectangle, square, triangle, circle
 * - Perimeter: rectangle, square
 * - Speed / Distance / Time
 * - Percentage calculations
 * - Simple arithmetic expressions
 * - Simple linear algebra:
 *      x + a = b
 *      x - a = b
 *      ax = b
 *      x / a = b
 *
 * IMPORTANT:
 * This verifier is deliberately conservative.
 *
 * It must NOT override a database answer merely because
 * it found some numbers in the question.
 *
 * Every solver returns:
 *
 * {
 *   answer,
 *   steps,
 *   explanation,
 *   operation,
 *   confidence
 * }
 *
 * confidence:
 *   0.95 - 1.00 → safe to override
 *   0.80 - 0.94 → useful verification, but cautious
 *   < 0.80      → do not override
 */

// ============================================================================
// PUBLIC API
// ============================================================================

export function verifyMathAnswer(questionText, storedAns) {
  const q = String(questionText || "").trim();
  const stored = parseNumber(storedAns);

  if (!q) {
    return {
      answer: storedAns,
      verifiedAnswer: storedAns,
      steps: null,
      verifiedSteps: null,
      wasOverridden: false,
      confidence: 0,
      operation: null,
      explanation: null,
    };
  }

  const result = solveFromText(q);

  // ----------------------------------------------------------
  // We couldn't confidently solve the question.
  // ----------------------------------------------------------

  if (!result) {
    return {
      answer: storedAns,
      verifiedAnswer: storedAns,
      steps: null,
      verifiedSteps: null,
      wasOverridden: false,
      confidence: 0,
      operation: null,
      explanation: null,
    };
  }

  const {
    answer,
    steps,
    explanation,
    operation,
    confidence,
  } = result;

  // ----------------------------------------------------------
  // Never override using a low-confidence solver.
  // ----------------------------------------------------------

  if (confidence < 0.95) {
    return {
      answer: String(formatAnswer(answer)),
      verifiedAnswer: storedAns,
      steps,
      verifiedSteps: steps,
      wasOverridden: false,
      confidence,
      operation,
      explanation,
    };
  }

  // ----------------------------------------------------------
  // Stored answer is not numeric.
  //
  // We can still provide the independently computed answer,
  // but only if the solver is highly confident.
  // ----------------------------------------------------------

  if (stored === null) {
    const formatted = String(formatAnswer(answer));
    return {
      answer: formatted,
      verifiedAnswer: formatted,
      steps,
      verifiedSteps: steps,
      wasOverridden: false,
      confidence,
      operation,
      explanation,
    };
  }

  // ----------------------------------------------------------
  // Compare independently computed answer with DB answer.
  // ----------------------------------------------------------

  const difference = Math.abs(
    Number(answer) - Number(stored)
  );

  if (difference > 0.001) {
    console.warn(
      `[Tixar Math Verifier] Database answer "${storedAns}" differs from independently computed answer "${answer}".`
    );

    const formatted = String(formatAnswer(answer));
    return {
      answer: formatted,
      verifiedAnswer: formatted,
      steps,
      verifiedSteps: steps,
      wasOverridden: true,
      confidence,
      operation,
      explanation,
    };
  }

  // ----------------------------------------------------------
  // Database answer agrees.
  // ----------------------------------------------------------

  const formatted = String(formatAnswer(answer));
  return {
    answer: formatted,
    verifiedAnswer: formatted,
    steps,
    verifiedSteps: steps,
    wasOverridden: false,
    confidence,
    operation,
    explanation,
  };
}

// ============================================================================
// SOLVER REGISTRY
// ============================================================================

function solveFromText(q) {
  const normalized = normalizeQuestion(q);

  // Order matters.
  //
  // More specific solvers should run before generic arithmetic.
  return (
    trySolveMean(normalized) ||
    trySolveArea(normalized) ||
    trySolvePerimeter(normalized) ||
    trySolveSpeedDistanceTime(normalized) ||
    trySolvePercentage(normalized) ||
    trySolveSimpleAlgebra(normalized) ||
    trySolveSimpleArithmetic(normalized) ||
    null
  );
}

// ============================================================================
// MEAN / AVERAGE SOLVER
// ============================================================================

export function trySolveMean(q) {
  // Only support a clearly delimited list immediately after
  // "mean of" or "average of".
  const match = q.match(
    /\b(?:mean|average)\s+of\s+((?:\d+(?:\.\d+)?\s*(?:,\s*|\band\b\s*|\s+))*\d+(?:\.\d+)?)(?=\s*(?:[?.;]|$))/i
  );

  if (!match) return null;

  const rawValues = match[1]
    .split(/\s*(?:,|\band\b)\s*/i)
    .map((value) => value.trim())
    .filter(Boolean);

  if (rawValues.length < 2) return null;

  if (rawValues.some((value) => !/^\d+(?:\.\d+)?$/.test(value))) {
    return null;
  }

  const numbers = rawValues.map(Number);

  if (!numbers.every(Number.isFinite)) return null;

  const sum = numbers.reduce((total, value) => total + value, 0);
  const mean = sum / numbers.length;
  const formatted = String(formatAnswer(mean));

  return {
    answer: formatted,
    confidence: 0.95,
    operation: "mean",
    explanation:
      `Mean = (${numbers.join(" + ")}) / ${numbers.length} = ${formatted}.`,
    steps: [
      `Step 1: Add the values: ${numbers.join(" + ")} = ${sum}`,
      `Step 2: Count the values: ${numbers.length}`,
      `Step 3: Divide the sum by the count: ${sum} / ${numbers.length} = ${formatted}`,
    ],
  };
}

// ============================================================================
// NORMALIZATION
// ============================================================================

function normalizeQuestion(q) {
  return String(q || "")
    .toLowerCase()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================================================
// AREA
// ============================================================================

export function trySolveArea(q) {
  if (!/\barea\b/i.test(q)) {
    return null;
  }

  // ----------------------------------------------------------
  // Rectangle
  // ----------------------------------------------------------

  let rect = extractNamedPair(
    q,
    ["length", "l"],
    ["width", "breadth", "w"]
  );

  if (!rect) {
    const byMatch = q.match(
      /\brectangle\b[^\d]*?(\d+(?:\.\d+)?)\s*(cm|m|km|mm|ft|in|inches|yards?)?\s*(?:by|x|×)\s*(\d+(?:\.\d+)?)\s*(cm|m|km|mm|ft|in|inches|yards?)?/i
    );
    if (byMatch) {
      rect = {
        first: Number(byMatch[1]),
        firstUnit: normalizeUnit(byMatch[2]),
        second: Number(byMatch[3]),
        secondUnit: normalizeUnit(byMatch[4]),
      };
    }
  }

  if (rect) {
    const { first, second, firstUnit, secondUnit } = rect;

    // Unit contract: Reject if one dimension has a unit and the other does not
    if (Boolean(firstUnit) !== Boolean(secondUnit)) {
      return null;
    }

    if (!areCompatibleUnits(firstUnit, secondUnit)) {
      return null;
    }

    let area;
    let displayUnit;

    if (firstUnit && secondUnit) {
      if (firstUnit === secondUnit) {
        area = first * second;
        displayUnit = firstUnit;
      } else {
        const length = convertLengthToBase(first, firstUnit);
        const width = convertLengthToBase(second, secondUnit);
        if (length === null || width === null) {
          return null;
        }
        area = length * width;
        displayUnit = "m";
      }
    } else {
      area = first * second;
      displayUnit = null;
    }

    return {
      answer: area,
      operation: "rectangle_area",
      confidence: 0.99,
      steps: [
        "Formula: Area of rectangle = Length × Width",
        `Substituting: Area = ${first} × ${second}`,
        `Area = ${formatAnswer(area)}${
          displayUnit ? ` ${displayUnit}²` : " square units"
        }`,
      ],
      explanation:
        `Area of rectangle = Length × Width = ` +
        `${first} × ${second} = ${formatAnswer(area)}${
          displayUnit ? ` ${displayUnit}²` : ""
        }`,
    };
  }

  // ----------------------------------------------------------
  // Square
  // ----------------------------------------------------------

  if (/\bsquare\b/i.test(q)) {
    const side = extractSingleDimension(q, ["side"]);

    if (side) {
      const area = side.value * side.value;
      const displayUnit = side.unit || null;

      return {
        answer: area,
        operation: "square_area",
        confidence: 0.99,
        steps: [
          "Formula: Area of square = Side²",
          `Substituting: Area = ${side.value}²`,
          `Area = ${formatAnswer(area)}${
            displayUnit ? ` ${displayUnit}²` : " square units"
          }`,
        ],
        explanation:
          `Area of square = ${side.value}² = ` +
          `${formatAnswer(area)}${displayUnit ? ` ${displayUnit}²` : ""}`,
      };
    }
  }

  // ----------------------------------------------------------
  // Triangle
  // ----------------------------------------------------------

  if (/\btriangle\b/i.test(q)) {
    const base = extractSingleDimension(q, ["base"]);
    const height = extractSingleDimension(q, ["height"]);

    if (base && height) {
      // Unit contract: Reject if one has a unit and the other does not
      if (Boolean(base.unit) !== Boolean(height.unit)) {
        return null;
      }

      if (!areCompatibleUnits(base.unit, height.unit)) {
        return null;
      }

      let area;
      let displayUnit;

      if (base.unit && height.unit) {
        if (base.unit === height.unit) {
          area = 0.5 * base.value * height.value;
          displayUnit = base.unit;
        } else {
          const b = convertLengthToBase(base.value, base.unit);
          const h = convertLengthToBase(height.value, height.unit);
          if (b === null || h === null) {
            return null;
          }
          area = 0.5 * b * h;
          displayUnit = "m";
        }
      } else {
        area = 0.5 * base.value * height.value;
        displayUnit = null;
      }

      return {
        answer: area,
        operation: "triangle_area",
        confidence: 0.99,
        steps: [
          "Formula: Area of triangle = ½ × Base × Height",
          `Substituting: Area = 0.5 × ${base.value} × ${height.value}`,
          `Area = ${formatAnswer(area)}${
            displayUnit ? ` ${displayUnit}²` : " square units"
          }`,
        ],
        explanation:
          `Area of triangle = ½ × ${base.value} × ` +
          `${height.value} = ${formatAnswer(area)}${
            displayUnit ? ` ${displayUnit}²` : ""
          }`,
      };
    }
  }

  // ----------------------------------------------------------
  // Circle
  // ----------------------------------------------------------

  if (/\bcircle\b/i.test(q)) {
    const radius = extractSingleDimension(q, ["radius"]);
    const diameter = extractSingleDimension(q, ["diameter"]);

    if (!radius && !diameter) {
      return null;
    }

    let r;
    let unit;

    if (radius) {
      r = radius.value;
      unit = radius.unit || null;
    } else {
      r = diameter.value / 2;
      unit = diameter.unit || null;
    }

    if (r === null || !Number.isFinite(r)) {
      return null;
    }

    const area = Math.PI * r * r;

    return {
      answer: Number(area.toFixed(4)),
      operation: "circle_area",
      confidence: 0.99,
      steps: [
        "Formula: Area of circle = π × r²",
        `Radius = ${formatAnswer(r)}`,
        `Area = π × ${formatAnswer(r)}²`,
        `Area ≈ ${area.toFixed(2)}${
          unit ? ` ${unit}²` : " square units"
        }`,
      ],
      explanation:
        `Area of circle = π × r² ≈ ` +
        `${area.toFixed(2)}${unit ? ` ${unit}²` : ""}`,
    };
  }

  return null;
}

// ============================================================================
// PERIMETER
// ============================================================================

export function trySolvePerimeter(q) {
  if (!/\bperimeter\b/i.test(q)) {
    return null;
  }

  // ----------------------------------------------------------
  // Rectangle
  // ----------------------------------------------------------

  const rect = extractNamedPair(
    q,
    ["length", "l"],
    ["width", "breadth", "w"]
  );

  if (rect) {
    if (Boolean(rect.firstUnit) !== Boolean(rect.secondUnit)) {
      return null;
    }

    if (!areCompatibleUnits(rect.firstUnit, rect.secondUnit)) {
      return null;
    }

    let perimeter;
    let displayUnit;

    if (rect.firstUnit && rect.secondUnit) {
      if (rect.firstUnit === rect.secondUnit) {
        perimeter = 2 * (rect.first + rect.second);
        displayUnit = rect.firstUnit;
      } else {
        const length = convertLengthToBase(rect.first, rect.firstUnit);
        const width = convertLengthToBase(rect.second, rect.secondUnit);
        if (length === null || width === null) {
          return null;
        }
        perimeter = 2 * (length + width);
        displayUnit = "m";
      }
    } else {
      perimeter = 2 * (rect.first + rect.second);
      displayUnit = null;
    }

    return {
      answer: perimeter,
      operation: "rectangle_perimeter",
      confidence: 0.99,
      steps: [
        "Formula: Perimeter of rectangle = 2 × (Length + Width)",
        `Substituting: Perimeter = 2 × (${rect.first} + ${rect.second})`,
        `Perimeter = ${formatAnswer(perimeter)}${
          displayUnit ? ` ${displayUnit}` : " units"
        }`,
      ],
      explanation:
        `Perimeter = 2(${rect.first} + ${rect.second}) = ` +
        `${formatAnswer(perimeter)}${displayUnit ? ` ${displayUnit}` : ""}`,
    };
  }

  // ----------------------------------------------------------
  // Square
  // ----------------------------------------------------------

  if (/\bsquare\b/i.test(q)) {
    const side = extractSingleDimension(q, ["side"]);

    if (side) {
      const perimeter = 4 * side.value;
      const displayUnit = side.unit || null;

      return {
        answer: perimeter,
        operation: "square_perimeter",
        confidence: 0.99,
        steps: [
          "Formula: Perimeter of square = 4 × Side",
          `Substituting: Perimeter = 4 × ${side.value}`,
          `Perimeter = ${formatAnswer(perimeter)}${
            displayUnit ? ` ${displayUnit}` : " units"
          }`,
        ],
        explanation:
          `Perimeter = 4 × ${side.value} = ` +
          `${formatAnswer(perimeter)}${displayUnit ? ` ${displayUnit}` : ""}`,
      };
    }
  }

  return null;
}

// ============================================================================
// SPEED / DISTANCE / TIME
// ============================================================================

function trySolveSpeedDistanceTime(q) {
  const asksDistance =
    /\bdistance\b/i.test(q);

  const asksSpeed =
    /\bspeed\b/i.test(q);

  const asksTime =
    /\btime\b|\bduration\b/i.test(q);

  // Need exactly one target.
  const targetCount =
    Number(asksDistance) +
    Number(asksSpeed) +
    Number(asksTime);

  if (targetCount !== 1) {
    return null;
  }

  const speed =
    extractValueWithUnit(
      q,
      /\bspeed\s+(?:of|is|=)?\s*(-?\d+(?:\.\d+)?)\s*(km\/h|kmh|m\/s|mph)?/i
    );

  const distance =
    extractValueWithUnit(
      q,
      /\bdistance\s+(?:of|is|=)?\s*(-?\d+(?:\.\d+)?)\s*(km|m|mi|miles)?/i
    );

  const time =
    extractValueWithUnit(
      q,
      /\b(?:time|duration)\s+(?:of|is|=)?\s*(-?\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|min|seconds?|secs?|s)?/i
    );

  // ----------------------------------------------------------
  // Distance = Speed × Time
  // ----------------------------------------------------------

  if (
    asksDistance &&
    speed &&
    time
  ) {
    const speedMps =
      speedToMps(
        speed.value,
        speed.unit
      );

    const timeSeconds =
      timeToSeconds(
        time.value,
        time.unit
      );

    if (
      speedMps === null ||
      timeSeconds === null
    ) {
      return null;
    }

    const distanceMeters =
      speedMps * timeSeconds;

    const answer =
      convertMetersToPreferredDistance(
        distanceMeters,
        distance?.unit
      );

    return {
      answer,
      operation: "distance_from_speed_time",
      confidence: 0.97,

      steps: [
        "Formula: Distance = Speed × Time",
        `Speed = ${speed.value} ${speed.unit || ""}`.trim(),
        `Time = ${time.value} ${time.unit || ""}`.trim(),
        `Distance = Speed × Time`,
        `Distance = ${formatAnswer(answer)}`,
      ],

      explanation:
        `Distance = Speed × Time = ` +
        `${speed.value} × ${time.value} = ` +
        `${formatAnswer(answer)}`,
    };
  }

  // ----------------------------------------------------------
  // Speed = Distance / Time
  // ----------------------------------------------------------

  if (
    asksSpeed &&
    distance &&
    time
  ) {
    const distanceMeters =
      distanceToMeters(
        distance.value,
        distance.unit
      );

    const timeSeconds =
      timeToSeconds(
        time.value,
        time.unit
      );

    if (
      distanceMeters === null ||
      timeSeconds === null ||
      timeSeconds === 0
    ) {
      return null;
    }

    const speedMps =
      distanceMeters /
      timeSeconds;

    const answer =
      mpsToPreferredSpeed(
        speedMps,
        distance.unit,
        time.unit
      );

    return {
      answer,
      operation: "speed_from_distance_time",
      confidence: 0.97,

      steps: [
        "Formula: Speed = Distance ÷ Time",
        `Speed = ${formatAnswer(answer)}`,
      ],

      explanation:
        `Speed = Distance ÷ Time = ${formatAnswer(answer)}`,
    };
  }

  // ----------------------------------------------------------
  // Time = Distance / Speed
  // ----------------------------------------------------------

  if (
    asksTime &&
    distance &&
    speed
  ) {
    const distanceMeters =
      distanceToMeters(
        distance.value,
        distance.unit
      );

    const speedMps =
      speedToMps(
        speed.value,
        speed.unit
      );

    if (
      distanceMeters === null ||
      speedMps === null ||
      speedMps === 0
    ) {
      return null;
    }

    const seconds =
      distanceMeters /
      speedMps;

    const answer =
      secondsToPreferredTime(
        seconds,
        time?.unit
      );

    return {
      answer,
      operation: "time_from_distance_speed",
      confidence: 0.97,

      steps: [
        "Formula: Time = Distance ÷ Speed",
        `Time = ${formatAnswer(answer)}`,
      ],

      explanation:
        `Time = Distance ÷ Speed = ${formatAnswer(answer)}`,
    };
  }

  return null;
}

// ============================================================================
// PERCENTAGE
// ============================================================================

function trySolvePercentage(q) {
  /*
   * Supported:
   *
   * "20% of 50"
   *
   * We deliberately DO NOT solve every percentage sentence.
   * Questions such as:
   *
   * "50 is what percentage of 200?"
   *
   * require a different interpretation.
   */

  const match =
    q.match(
      /\b(\d+(?:\.\d+)?)\s*%\s*(?:of)\s*(\d+(?:\.\d+)?)/i
    );

  if (!match) {
    return null;
  }

  const percentage =
    Number(match[1]);

  const total =
    Number(match[2]);

  const result =
    (percentage / 100) *
    total;

  return {
    answer: result,
    operation: "percentage_of",
    confidence: 0.99,

    steps: [
      "Formula: Result = (Percentage ÷ 100) × Total",
      `= (${percentage} ÷ 100) × ${total}`,
      `= ${percentage / 100} × ${total}`,
      `= ${formatAnswer(result)}`,
    ],

    explanation:
      `${percentage}% of ${total} = ` +
      `${formatAnswer(result)}`,
  };
}

// ============================================================================
// SIMPLE ALGEBRA
// ============================================================================

function trySolveSimpleAlgebra(q) {
  /*
   * Supported examples:
   *
   * x + 5 = 12
   * x - 5 = 12
   * 3x = 12
   * 3x + 5 = 14
   * x / 4 = 3
   */

  // ax [+-] b = c (e.g. 2x + 4 = 10)
  const fullLinearMatch = q.match(
    /\b(?:solve|find|calculate|determine)?\s*(?:for\s+)?(-?\d+(?:\.\d+)?)\s*x\s*([+-])\s*(\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)\b/i
  );

  if (fullLinearMatch) {
    const coeff = Number(fullLinearMatch[1]);
    const op = fullLinearMatch[2];
    const b = Number(fullLinearMatch[3]);
    const c = Number(fullLinearMatch[4]);

    if (coeff !== 0) {
      const intermediate = op === "+" ? c - b : c + b;
      const answer = intermediate / coeff;
      return {
        answer,
        operation: "linear_equation",
        confidence: 0.97,
        steps: [
          `Equation: ${coeff}x ${op} ${b} = ${c}`,
          op === "+"
            ? `Subtract ${b} from both sides: ${coeff}x = ${intermediate}`
            : `Add ${b} to both sides: ${coeff}x = ${intermediate}`,
          `Divide both sides by ${coeff}: x = ${formatAnswer(answer)}`,
        ],
        explanation: `Solving ${coeff}x ${op} ${b} = ${c} gives x = ${formatAnswer(answer)}`,
      };
    }
  }

  const equationMatch =
    q.match(
      /\b(?:solve|find|calculate|determine)?\s*(?:for\s+)?x\s*([+-])\s*(\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)\b/i
    );

  if (equationMatch) {
    const operator =
      equationMatch[1];

    const a =
      Number(equationMatch[2]);

    const b =
      Number(equationMatch[3]);

    const answer =
      operator === "+"
        ? b - a
        : b + a;

    return {
      answer,
      operation: "linear_equation",
      confidence: 0.97,

      steps: [
        `Equation: x ${operator} ${a} = ${b}`,
        operator === "+"
          ? `Subtract ${a} from both sides`
          : `Add ${a} to both sides`,
        `x = ${formatAnswer(answer)}`,
      ],

      explanation:
        `Solving x ${operator} ${a} = ${b} gives ` +
        `x = ${formatAnswer(answer)}`,
    };
  }

  // ax = b
  const multiplicationMatch =
    q.match(
      /\b(?:solve|find|calculate|determine)?\s*(-?\d+(?:\.\d+)?)\s*x\s*=\s*(-?\d+(?:\.\d+)?)\b/i
    );

  if (multiplicationMatch) {
    const coefficient =
      Number(multiplicationMatch[1]);

    const result =
      Number(multiplicationMatch[2]);

    if (coefficient === 0) {
      return null;
    }

    const answer =
      result / coefficient;

    return {
      answer,
      operation: "linear_equation",
      confidence: 0.97,

      steps: [
        `Equation: ${coefficient}x = ${result}`,
        `Divide both sides by ${coefficient}`,
        `x = ${formatAnswer(answer)}`,
      ],

      explanation:
        `${coefficient}x = ${result} gives ` +
        `x = ${formatAnswer(answer)}`,
    };
  }

  // x / a = b
  const divisionMatch =
    q.match(
      /\b(?:solve|find|calculate|determine)?\s*x\s*\/\s*(-?\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)\b/i
    );

  if (divisionMatch) {
    const divisor =
      Number(divisionMatch[1]);

    const result =
      Number(divisionMatch[2]);

    if (divisor === 0) {
      return null;
    }

    const answer =
      result * divisor;

    return {
      answer,
      operation: "linear_equation",
      confidence: 0.97,

      steps: [
        `Equation: x / ${divisor} = ${result}`,
        `Multiply both sides by ${divisor}`,
        `x = ${formatAnswer(answer)}`,
      ],

      explanation:
        `x / ${divisor} = ${result} gives ` +
        `x = ${formatAnswer(answer)}`,
    };
  }

  return null;
}

// ============================================================================
// SAFE SIMPLE ARITHMETIC
// ============================================================================

export function trySolveSimpleArithmetic(q) {
  /*
   * IMPORTANT:
   *
   * We only accept expressions that are clearly presented
   * as calculations.
   *
   * We DO NOT search the entire question for arbitrary
   * numbers and operators.
   */

  const expressionMatch =
    q.match(
      /\b(?:solve|calculate|evaluate|compute)\s*:?\s*([0-9+\-*/().\s%^×÷]+)$/i
    );

  if (!expressionMatch) {
    return null;
  }

  const raw =
    expressionMatch[1].trim();

  if (!raw) {
    return null;
  }

  const expression = raw
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\*\*/g, "^");

  /*
   * Only numbers, whitespace and arithmetic operators.
   */
  if (!/^[0-9+\-*/().\s%^]+$/.test(expression)) {
    return null;
  }

  const tokens =
    tokenizeExpression(
      expression
    );

  if (!tokens || !hasValidExpressionSyntax(tokens)) {
    return null;
  }

  const result =
    evaluateExpression(
      tokens
    );

  if (
    result === null ||
    !Number.isFinite(result)
  ) {
    return null;
  }

  return {
    answer: Number(
      result.toFixed(10)
    ),

    operation:
      "simple_arithmetic",

    confidence: 0.99,

    steps: [
      `Expression: ${raw}`,
      "Applying order of operations (BODMAS/PEMDAS)",
      `= ${formatAnswer(result)}`,
    ],

    explanation:
      `${raw} = ${formatAnswer(result)}`,
  };
}

// ============================================================================
// SAFE EXPRESSION TOKENIZER
// ============================================================================

export function tokenizeExpression(expression) {
  const source =
    String(expression)
      .replace(/\s+/g, "");

  const tokens = [];

  let i = 0;

  while (i < source.length) {
    const char =
      source[i];

    if (
      /[0-9.]/.test(char)
    ) {
      let number = "";

      while (
        i < source.length &&
        /[0-9.]/.test(source[i])
      ) {
        number += source[i];
        i++;
      }

      if (
        number === "." ||
        (number.match(/\./g) || []).length > 1
      ) {
        return null;
      }

      tokens.push({
        type: "number",
        value: Number(number),
      });

      continue;
    }

    if (
      char === "+" ||
      char === "-" ||
      char === "*" ||
      char === "/" ||
      char === "%" ||
      char === "^"
    ) {
      tokens.push({
        type: "operator",
        value: char,
      });

      i++;
      continue;
    }

    if (
      char === "(" ||
      char === ")"
    ) {
      tokens.push({
        type: "paren",
        value: char,
      });

      i++;
      continue;
    }

    return null;
  }

  return tokens;
}

// ============================================================================
// EXPRESSION SYNTAX VALIDATOR
// ============================================================================

export function evaluateExpressionString(str) {
  const raw = String(str || "").trim();
  const normalized = raw
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\*\*/g, "^");
  const tokens = tokenizeExpression(normalized);
  if (!tokens || !hasValidExpressionSyntax(tokens)) {
    return null;
  }
  return evaluateExpression(tokens);
}

export function hasValidExpressionSyntax(tokens) {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return false;
  }

  let parenDepth = 0;
  let prevToken = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token || !token.type) return false;

    if (token.type === "paren") {
      if (token.value === "(") {
        parenDepth++;
        if (
          prevToken &&
          (prevToken.type === "number" ||
            (prevToken.type === "paren" && prevToken.value === ")"))
        ) {
          return false;
        }
      } else if (token.value === ")") {
        parenDepth--;
        if (parenDepth < 0) return false;
        if (
          !prevToken ||
          (prevToken.type === "paren" && prevToken.value === "(") ||
          prevToken.type === "operator"
        ) {
          return false;
        }
      } else {
        return false;
      }
    } else if (token.type === "operator") {
      const isBinaryOnly = ["*", "/", "%", "^"].includes(token.value);
      if (i === 0 && isBinaryOnly) {
        return false;
      }
      if (i === tokens.length - 1) {
        return false;
      }
      if (prevToken) {
        if (prevToken.type === "operator") {
          if (isBinaryOnly) {
            return false;
          }
          if (i > 1 && tokens[i - 2].type === "operator") {
            return false;
          }
        } else if (prevToken.type === "paren" && prevToken.value === "(") {
          if (isBinaryOnly) {
            return false;
          }
        }
      }
    } else if (token.type === "number") {
      if (!Number.isFinite(token.value)) return false;
      if (
        prevToken &&
        (prevToken.type === "number" ||
          (prevToken.type === "paren" && prevToken.value === ")"))
      ) {
        return false;
      }
    } else {
      return false;
    }

    prevToken = token;
  }

  return parenDepth === 0;
}

// ============================================================================
// SAFE EXPRESSION EVALUATOR
// ============================================================================

export function evaluateExpression(tokens) {
  let position = 0;

  function peek() {
    return tokens[position];
  }

  function consume() {
    return tokens[position++];
  }

  function parseExpression() {
    let value = parseTerm();
    if (value === null) return null;

    while (
      peek()?.type === "operator" &&
      (peek().value === "+" || peek().value === "-")
    ) {
      const operator = consume().value;
      const right = parseTerm();
      if (right === null) {
        return null;
      }
      value = operator === "+" ? value + right : value - right;
    }

    return value;
  }

  function parseTerm() {
    let value = parseUnary();
    if (value === null) return null;

    while (
      peek()?.type === "operator" &&
      (peek().value === "*" || peek().value === "/" || peek().value === "%")
    ) {
      const operator = consume().value;
      const right = parseUnary();
      if (right === null) {
        return null;
      }

      if (operator === "/" && right === 0) {
        return null;
      }

      if (operator === "*") {
        value *= right;
      } else if (operator === "/") {
        value /= right;
      } else {
        value %= right;
      }
    }

    return value;
  }

  function parseUnary() {
    if (peek()?.type === "operator" && peek().value === "+") {
      consume();
      return parseUnary();
    }

    if (peek()?.type === "operator" && peek().value === "-") {
      consume();
      const value = parseUnary();
      return value === null ? null : -value;
    }

    return parsePower();
  }

  function parsePower() {
    let value = parsePrimary();
    if (value === null) return null;

    if (peek()?.type === "operator" && peek().value === "^") {
      consume();
      const exponent = parseUnary();
      if (exponent === null) {
        return null;
      }
      value = Math.pow(value, exponent);
    }

    return value;
  }

  function parsePrimary() {
    const token = peek();
    if (!token) {
      return null;
    }

    if (token.type === "number") {
      consume();
      return token.value;
    }

    if (token.type === "paren" && token.value === "(") {
      consume();
      const value = parseExpression();
      if (peek()?.type !== "paren" || peek().value !== ")") {
        return null;
      }
      consume();
      return value;
    }

    return null;
  }

  const result = parseExpression();

  if (position !== tokens.length) {
    return null;
  }

  return result;
}

// ============================================================================
// EXTRACTION HELPERS
// ============================================================================

function extractNamedPair(
  q,
  firstNames,
  secondNames
) {
  const firstPattern =
    firstNames.join("|");

  const secondPattern =
    secondNames.join("|");

  const pattern1 =
    new RegExp(
      `(?:${firstPattern})\\s+(?:of|is|=)?\\s*` +
        `(\\d+(?:\\.\\d+)?)\\s*` +
        `(cm|m|km|mm|ft|in|inches|yards?)?` +
        `\\s*(?:and|,|by)\\s*` +
        `(?:${secondPattern})\\s+(?:of|is|=)?\\s*` +
        `(\\d+(?:\\.\\d+)?)\\s*` +
        `(cm|m|km|mm|ft|in|inches|yards?)?`,
      "i"
    );

  const pattern2 =
    new RegExp(
      `(?:${secondPattern})\\s+(?:of|is|=)?\\s*` +
        `(\\d+(?:\\.\\d+)?)\\s*` +
        `(cm|m|km|mm|ft|in|inches|yards?)?` +
        `\\s*(?:and|,|by)\\s*` +
        `(?:${firstPattern})\\s+(?:of|is|=)?\\s*` +
        `(\\d+(?:\\.\\d+)?)\\s*` +
        `(cm|m|km|mm|ft|in|inches|yards?)?`,
      "i"
    );

  let match =
    q.match(pattern1);

  if (match) {
    return {
      first: Number(match[1]),
      firstUnit: normalizeUnit(match[2]),
      second: Number(match[3]),
      secondUnit: normalizeUnit(match[4]),
    };
  }

  match =
    q.match(pattern2);

  if (match) {
    return {
      first: Number(match[3]),
      firstUnit: normalizeUnit(match[4]),
      second: Number(match[1]),
      secondUnit: normalizeUnit(match[2]),
    };
  }

  return null;
}

function extractSingleDimension(
  q,
  names
) {
  const pattern =
    new RegExp(
      `(?:${names.join("|")})\\s+` +
        `(?:of|is|=)?\\s*` +
        `(\\d+(?:\\.\\d+)?)\\s*` +
        `(cm|m|km|mm|ft|in|inches|yards?)?`,
      "i"
    );

  const match =
    q.match(pattern);

  if (!match) {
    return null;
  }

  return {
    value: Number(match[1]),
    unit: normalizeUnit(match[2]),
  };
}

function extractValueWithUnit(
  q,
  regex
) {
  const match =
    q.match(regex);

  if (!match) {
    return null;
  }

  return {
    value: Number(match[1]),
    unit: normalizeUnit(match[2]),
  };
}

// ============================================================================
// UNIT HELPERS
// ============================================================================

function normalizeUnit(unit) {
  if (!unit) {
    return null;
  }

  const u =
    String(unit)
      .toLowerCase()
      .trim();

  const aliases = {
    centimeters: "cm",
    centimeter: "cm",
    metres: "m",
    meters: "m",
    metre: "m",
    meter: "m",
    kilometres: "km",
    kilometer: "km",
    kilometers: "km",
    millimeters: "mm",
    millimetres: "mm",
    millimeter: "mm",
    millimetre: "mm",
    feet: "ft",
    foot: "ft",
    inches: "in",
    inch: "in",
    yards: "yd",
    yard: "yd",

    kmh: "km/h",
    hrs: "h",
    hour: "h",
    hours: "h",
    min: "min",
    mins: "min",
    minutes: "min",
    minute: "min",
    sec: "s",
    secs: "s",
    seconds: "s",
    second: "s",

    miles: "mi",
    mile: "mi",
  };

  return aliases[u] || u;
}

function lengthToMeters(value, unit) {
  switch (unit) {
    case "mm":
      return value / 1000;

    case "cm":
      return value / 100;

    case "m":
    case null:
      return value;

    case "km":
      return value * 1000;

    case "in":
      return value * 0.0254;

    case "ft":
      return value * 0.3048;

    case "yd":
      return value * 0.9144;

    default:
      return null;
  }
}

function convertLengthToBase(
  value,
  unit
) {
  return lengthToMeters(
    value,
    unit
  );
}

function distanceToMeters(
  value,
  unit
) {
  if (!unit) {
    return value;
  }

  if (unit === "mi") {
    return value * 1609.344;
  }

  return lengthToMeters(
    value,
    unit
  );
}

function speedToMps(
  value,
  unit
) {
  if (!unit) {
    // Without a unit, we cannot safely infer one.
    return null;
  }

  switch (unit) {
    case "m/s":
      return value;

    case "km/h":
      return value / 3.6;

    case "mph":
      return value * 0.44704;

    default:
      return null;
  }
}

function timeToSeconds(
  value,
  unit
) {
  switch (unit) {
    case "s":
      return value;

    case "min":
      return value * 60;

    case "h":
      return value * 3600;

    case null:
      return value;

    default:
      return null;
  }
}

function convertMetersToPreferredDistance(
  meters,
  preferredUnit
) {
  switch (preferredUnit) {
    case "km":
      return meters / 1000;

    case "mi":
      return meters / 1609.344;

    case "cm":
      return meters * 100;

    case "mm":
      return meters * 1000;

    default:
      return meters;
  }
}

function mpsToPreferredSpeed(
  mps,
  distanceUnit,
  timeUnit
) {
  /*
   * If the question uses km and hours,
   * return km/h.
   */

  if (
    distanceUnit === "km" &&
    timeUnit === "h"
  ) {
    return mps * 3.6;
  }

  if (
    distanceUnit === "mi" &&
    timeUnit === "h"
  ) {
    return mps / 0.44704;
  }

  return mps;
}

function secondsToPreferredTime(
  seconds,
  requestedUnit
) {
  switch (requestedUnit) {
    case "h":
      return seconds / 3600;

    case "min":
      return seconds / 60;

    case "s":
    default:
      return seconds;
  }
}

export function areCompatibleUnits(a, b) {
  if (!a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }

  const aLength = lengthToMeters(1, a);
  const bLength = lengthToMeters(1, b);

  return (
    aLength !== null &&
    bLength !== null
  );
}

function commonUnit(
  a,
  b
) {
  if (a && a === b) {
    return a;
  }

  return a || b || null;
}

// ============================================================================
// NUMBER HELPERS
// ============================================================================

function parseNumber(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const parsed =
    Number(
      String(value)
        .trim()
        .replace(/,/g, "")
    );

  return Number.isFinite(parsed)
    ? parsed
    : null;
}

function formatAnswer(value) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return value;
  }

  if (
    Number.isInteger(value)
  ) {
    return value;
  }

  return Number(
    value.toFixed(6)
  );
}

/**
 * Strict Semantic Boundary Verifier for Math Mutations.
 * Discards any candidate question that violates semantic invariants or mathematical validity.
 */
export function verifyMathSemanticBoundary(candidateQuestion, expectedSkillId = "", expectedConceptId = "") {
  if (!candidateQuestion) {
    return { isValid: false, reason: "NULL_CANDIDATE" };
  }

  const text = String(
    candidateQuestion.q ||
    candidateQuestion.question ||
    candidateQuestion.Question ||
    ""
  ).trim();

  const ans = String(
    candidateQuestion.ans ||
    candidateQuestion.answer ||
    candidateQuestion.Answer ||
    ""
  ).trim();

  // 1. Structural validity
  if (!text || !ans) {
    return { isValid: false, reason: "MISSING_TEXT_OR_ANSWER" };
  }

  const numAns = parseNumber(ans);
  if (numAns === null || !Number.isFinite(numAns)) {
    // If it's not a numeric string or algebraic expression, verify non-empty
    if (ans.length === 0) {
      return { isValid: false, reason: "INVALID_ANSWER_FORMAT" };
    }
  }

  // 2. Semantic drift checks
  const normSkill = String(expectedSkillId || "").toLowerCase();
  const normConcept = String(expectedConceptId || "").toLowerCase();

  // Invariant A: BODMAS / Order of Operations must NOT drift into quadratics, linear equations with x, or trigonometry
  if (normSkill.includes("bodmas") || normSkill.includes("multiplication_before") || normConcept.includes("order_of_operations")) {
    const forbiddenPatterns = [
      /x\^2|x²|quadratic/i,
      /\bsin\b|\bcos\b|\btan\b/i,
      /\bfind x\b|\bsolve for x\b/i,
    ];

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(text)) {
        return { isValid: false, reason: "SEMANTIC_DRIFT_BODMAS_TO_COMPLEX_TOPIC" };
      }
    }
  }

  // Invariant B: Arithmetic must not drift into calculus or matrices
  if (normConcept.includes("numbers") || normConcept.includes("arithmetic")) {
    if (/\bint\b|\bderivative\b|\bmatrix\b/i.test(text)) {
      return { isValid: false, reason: "SEMANTIC_DRIFT_ARITHMETIC_TO_ADVANCED" };
    }
  }

  return { isValid: true, reason: "VERIFIED_SEMANTIC_BOUNDARY" };
}

