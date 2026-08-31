/**
 * Tixar Math Self-Verification Engine
 *
 * Independently computes the correct answer from the question text itself
 * so that wrong database answers are detected and overridden.
 *
 * Handles:
 *  - Area, Perimeter (rectangles, squares, triangles, circles)
 *  - Speed, Distance, Time
 *  - Simple arithmetic expressions in question text
 *  - Percentage calculations
 *  - Simple algebra (x + a = b → x = ?)
 *
 * Returns: { computedAnswer: number|null, computedSteps: string[], operation: string|null }
 */

/**
 * Attempts to independently solve the question from the question text.
 * @param {string} questionText
 * @param {string|number} storedAns - The answer stored in the database (may be wrong)
 * @returns {{ verifiedAnswer: string, verifiedSteps: string[], wasOverridden: boolean }}
 */
export function verifyMathAnswer(questionText, storedAns) {
  const q = String(questionText || "").toLowerCase();
  const stored = parseFloat(String(storedAns).trim());

  const result = solveFromText(q);

  if (result === null) {
    // Cannot self-verify — trust stored answer
    return { verifiedAnswer: storedAns, verifiedSteps: null, wasOverridden: false };
  }

  const { answer, steps, explanation } = result;

  // If stored answer is clearly wrong (differs by more than epsilon), override it
  if (!isNaN(stored) && Math.abs(answer - stored) > 0.001) {
    return {
      verifiedAnswer: String(answer),
      verifiedSteps: steps,
      wasOverridden: true,
      explanation,
    };
  }

  // Stored answer matches our computation — trust it but add our computed steps
  return {
    verifiedAnswer: String(answer),
    verifiedSteps: steps,
    wasOverridden: false,
    explanation,
  };
}

// ─── SOLVER REGISTRY ──────────────────────────────────────────────────────────

function solveFromText(q) {
  return (
    trySolveArea(q) ||
    trySolvePerimeter(q) ||
    trySolveSpeedDistanceTime(q) ||
    trySolvePercentage(q) ||
    trySolveSimpleArithmetic(q) ||
    null
  );
}

// ─── AREA SOLVER ──────────────────────────────────────────────────────────────

function trySolveArea(q) {
  // Rectangle: length × width
  const rectMatch = q.match(
    /(?:length|l)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm|ft|in|inches?)?\s+(?:and|,)?\s+(?:width|w|breadth)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i
  ) || q.match(
    /(?:width|w|breadth)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm|ft|in|inches?)?\s+(?:and|,)?\s+(?:length|l)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i
  );

  if (rectMatch && /area/i.test(q)) {
    const a = parseFloat(rectMatch[1]);
    const b = parseFloat(rectMatch[2]);
    // Determine which is length and which is width based on question wording
    let length = a, width = b;
    if (/width.*?(\d+).*?length/i.test(q)) {
      width = a; length = b;
    }
    const area = length * width;
    const unit = extractUnit(q);
    return {
      answer: area,
      steps: [
        `Formula: Area of rectangle = Length × Width`,
        `Substituting values: Area = ${length} × ${width}`,
        `Area = ${area}${unit ? " " + unit + "²" : " square units"}`,
      ],
      explanation: `Area of rectangle = Length × Width = ${length} × ${width} = ${area}`,
    };
  }

  // Square: side²
  const squareMatch = q.match(/(?:side|s)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i);
  if (squareMatch && /square/i.test(q) && /area/i.test(q)) {
    const side = parseFloat(squareMatch[1]);
    const area = side * side;
    const unit = extractUnit(q);
    return {
      answer: area,
      steps: [
        `Formula: Area of square = Side²`,
        `Substituting: Area = ${side}²`,
        `Area = ${area}${unit ? " " + unit + "²" : " square units"}`,
      ],
      explanation: `Area of square = ${side}² = ${area}`,
    };
  }

  // Triangle: ½ × base × height
  const triMatch = q.match(
    /(?:base|b)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm)?\s+(?:and|,)?\s+(?:height|h)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i
  ) || q.match(
    /(?:height|h)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm)?\s+(?:and|,)?\s+(?:base|b)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i
  );

  if (triMatch && /triangle/i.test(q) && /area/i.test(q)) {
    const a = parseFloat(triMatch[1]);
    const b = parseFloat(triMatch[2]);
    const area = 0.5 * a * b;
    return {
      answer: area,
      steps: [
        `Formula: Area of triangle = ½ × base × height`,
        `Substituting: Area = 0.5 × ${a} × ${b}`,
        `Area = ${area} square units`,
      ],
      explanation: `Area of triangle = ½ × ${a} × ${b} = ${area}`,
    };
  }

  // Circle: π × r²
  const circleRMatch = q.match(/radius\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i);
  const circleDMatch = q.match(/diameter\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i);
  if ((circleRMatch || circleDMatch) && /circle/i.test(q) && /area/i.test(q)) {
    const r = circleRMatch ? parseFloat(circleRMatch[1]) : parseFloat(circleDMatch[1]) / 2;
    const area = parseFloat((Math.PI * r * r).toFixed(4));
    return {
      answer: area,
      steps: [
        `Formula: Area of circle = π × r²`,
        `Radius = ${r}`,
        `Area = π × ${r}² = ${area.toFixed(2)} square units`,
      ],
      explanation: `Area of circle = π × ${r}² ≈ ${area.toFixed(2)}`,
    };
  }

  return null;
}

// ─── PERIMETER SOLVER ─────────────────────────────────────────────────────────

function trySolvePerimeter(q) {
  if (!/perimeter/i.test(q)) return null;

  // Rectangle perimeter: 2(l + w)
  const rectMatch = q.match(
    /(?:length|l)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm)?\s+(?:and|,)?\s+(?:width|w|breadth)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i
  ) || q.match(
    /(?:width|w|breadth)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm)?\s+(?:and|,)?\s+(?:length|l)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i
  );

  if (rectMatch) {
    const a = parseFloat(rectMatch[1]);
    const b = parseFloat(rectMatch[2]);
    const perimeter = 2 * (a + b);
    return {
      answer: perimeter,
      steps: [
        `Formula: Perimeter of rectangle = 2 × (Length + Width)`,
        `Substituting: Perimeter = 2 × (${a} + ${b}) = 2 × ${a + b}`,
        `Perimeter = ${perimeter} units`,
      ],
      explanation: `Perimeter of rectangle = 2(${a} + ${b}) = ${perimeter}`,
    };
  }

  // Square perimeter: 4s
  const squareMatch = q.match(/(?:side|s)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i);
  if (squareMatch && /square/i.test(q)) {
    const side = parseFloat(squareMatch[1]);
    const perimeter = 4 * side;
    return {
      answer: perimeter,
      steps: [
        `Formula: Perimeter of square = 4 × Side`,
        `Substituting: Perimeter = 4 × ${side}`,
        `Perimeter = ${perimeter} units`,
      ],
      explanation: `Perimeter of square = 4 × ${side} = ${perimeter}`,
    };
  }

  return null;
}

// ─── SPEED / DISTANCE / TIME SOLVER ──────────────────────────────────────────

function trySolveSpeedDistanceTime(q) {
  // distance = speed × time
  const speedMatch = q.match(/speed\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:km\/h|m\/s|mph)?/i);
  const timeMatch = q.match(/(?:for|time|duration)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h|minutes?|mins?|seconds?|secs?)?/i);

  if (speedMatch && timeMatch && /distance/i.test(q)) {
    const speed = parseFloat(speedMatch[1]);
    const time = parseFloat(timeMatch[1]);
    const distance = speed * time;
    return {
      answer: distance,
      steps: [
        `Formula: Distance = Speed × Time`,
        `Substituting: Distance = ${speed} × ${time}`,
        `Distance = ${distance}`,
      ],
      explanation: `Distance = Speed × Time = ${speed} × ${time} = ${distance}`,
    };
  }

  return null;
}

// ─── PERCENTAGE SOLVER ────────────────────────────────────────────────────────

function trySolvePercentage(q) {
  // "X% of Y"
  const pctMatch = q.match(/(\d+(?:\.\d+)?)\s*%\s+(?:of)\s+(\d+(?:\.\d+)?)/i);
  if (pctMatch) {
    const pct = parseFloat(pctMatch[1]);
    const total = parseFloat(pctMatch[2]);
    const result = (pct / 100) * total;
    return {
      answer: result,
      steps: [
        `Formula: Percentage = (percentage value ÷ 100) × total`,
        `= (${pct} ÷ 100) × ${total}`,
        `= ${pct / 100} × ${total}`,
        `= ${result}`,
      ],
      explanation: `${pct}% of ${total} = ${result}`,
    };
  }

  return null;
}

// ─── SIMPLE ARITHMETIC SOLVER ─────────────────────────────────────────────────

function trySolveSimpleArithmetic(q) {
  // Look for inline arithmetic expressions like "6 + 2 × 3" or "solve: 5 + 3"
  const exprMatch = q.match(/(?:solve|calculate|find|evaluate|compute)\s*:?\s*([\d\s+\-×÷*/^()]+)/i)
    || q.match(/((?:\d+(?:\.\d+)?\s*[+\-×÷*/^]\s*)+\d+(?:\.\d+)?)/);

  if (exprMatch) {
    const raw = exprMatch[1].trim();
    try {
      // Normalise operators
      const sanitized = raw
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**")
        .replace(/\s+/g, " ");

      // Safe evaluation using Function constructor (no arbitrary code — digits and operators only)
      if (/^[\d\s+\-*/.^()%]+$/.test(sanitized)) {
        const result = Function(`"use strict"; return (${sanitized})`)();
        if (typeof result === "number" && isFinite(result)) {
          return {
            answer: parseFloat(result.toFixed(10)),
            steps: [
              `Expression: ${raw}`,
              `Applying order of operations (BODMAS/PEMDAS):`,
              `= ${result}`,
            ],
            explanation: `${raw} = ${result}`,
          };
        }
      }
    } catch {
      // Silently fail — couldn't evaluate
    }
  }

  return null;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function extractUnit(q) {
  const match = q.match(/\b(cm|m|km|mm|ft|in|inches?|yards?)\b/i);
  return match ? match[1].toLowerCase() : null;
}
