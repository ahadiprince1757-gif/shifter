/**
 * TIXAR QUESTION RESPONSE ENGINE
 *
 * Determines how a student should answer a question based on cognitive intent.
 *
 * Priority:
 * 1. Explicit metadata (responseMode, requiresWorking)
 * 2. Question type (mcq vs calc vs short_answer)
 * 3. Text normalization
 * 4. Strong calculation commands
 * 5. Mathematical structure (equations, arithmetic, conversions)
 * 6. Quantitative context (measurements + quantitative concepts)
 * 7. Conceptual question detection (explain, describe, define, why, what is)
 * 8. Subject-aware inference
 * 9. Safe default (conceptual, requiresWorking: false)
 *
 * Returns:
 * {
 *   mode: "calculation" | "conceptual" | "selection" | "short_answer",
 *   requiresWorking: boolean,
 *   confidence: number
 * }
 */

export function determineResponseMode(question, subjectName = "") {
  if (!question || typeof question !== "object") {
    return {
      mode: "conceptual",
      requiresWorking: false,
      confidence: 0,
    };
  }

  // ------------------------------------------
  // 1. EXPLICIT METADATA — HIGHEST AUTHORITY
  // ------------------------------------------

  if (question.responseMode) {
    return {
      mode: question.responseMode,
      requiresWorking:
        question.requiresWorking ??
        question.responseMode === "calculation",
      confidence: 1,
    };
  }

  // ------------------------------------------
  // 2. QUESTION TYPE
  // ------------------------------------------

  if (
    question.type === "mcq" ||
    (Array.isArray(question.options) &&
      question.options.length > 0)
  ) {
    return {
      mode: "selection",
      requiresWorking: false,
      confidence: 1,
    };
  }

  if (question.type === "calc") {
    return {
      mode: "calculation",
      requiresWorking: true,
      confidence: 1,
    };
  }

  // ------------------------------------------
  // 3. NORMALIZE TEXT
  // ------------------------------------------

  const stem = String(
    question.q ||
    question.stem ||
    question.question ||
    ""
  ).toLowerCase().trim();

  const subject = String(subjectName)
    .toLowerCase()
    .trim();

  if (!stem) {
    return {
      mode: "conceptual",
      requiresWorking: false,
      confidence: 0,
    };
  }

  // ------------------------------------------
  // 4. STRONG CALCULATION COMMANDS
  // ------------------------------------------

  const calculationCommands =
    /\b(calculate|compute|evaluate|solve|work out|determine the value|find the value|hence calculate)\b/i;

  if (calculationCommands.test(stem)) {
    return {
      mode: "calculation",
      requiresWorking: true,
      confidence: 0.95,
    };
  }

  // ------------------------------------------
  // 5. MATHEMATICAL STRUCTURE
  // ------------------------------------------

  const hasArithmetic =
    /\d+\s*[+\-*/×÷]\s*\d+/.test(stem);

  const hasEquation =
    /[a-z]\s*=\s*[\d.a-z+\-*/²^]+/i.test(stem);

  const hasSolveFor =
    /\bsolve for\s+[a-z]\b/i.test(stem);

  const hasConversion =
    /\b(convert|express)\b.*\b(to|into)\b/i.test(stem) &&
    /\b(binary|decimal|hexadecimal|fraction|percentage|standard form|scientific notation)\b/i.test(stem);

  if (
    hasArithmetic ||
    hasEquation ||
    hasSolveFor ||
    hasConversion
  ) {
    return {
      mode: "calculation",
      requiresWorking: true,
      confidence: 0.9,
    };
  }

  // ------------------------------------------
  // 6. QUANTITATIVE CONTEXT
  // ------------------------------------------

  const hasMeasurement =
    /\b\d+(?:\.\d+)?\s*(km|m|cm|mm|kg|g|mg|l|ml|s|min|hour|hours|n|j|w|pa|v|a|hz|mol|%)\b/i
      .test(stem);

  const quantitativeConcept =
    /\b(speed|velocity|acceleration|distance|time|force|energy|power|pressure|density|momentum|area|volume|perimeter|probability|mean|median|molarity|moles|concentration|interest|discount|profit|loss)\b/i
      .test(stem);

  if (hasMeasurement && quantitativeConcept) {
    return {
      mode: "calculation",
      requiresWorking: true,
      confidence: 0.8,
    };
  }

  // ------------------------------------------
  // 7. CONCEPTUAL QUESTION DETECTION
  // ------------------------------------------

  const conceptualPatterns =
    /\b(explain|describe|discuss|define|state|identify|compare|contrast|differentiate|justify|outline|analyze|analyse|why|how does|what is|what are)\b/i;

  if (conceptualPatterns.test(stem)) {
    return {
      mode: "conceptual",
      requiresWorking: false,
      confidence: 0.9,
    };
  }

  // ------------------------------------------
  // 8. SUBJECT-AWARE FALLBACK
  // ------------------------------------------

  const calculationSubjects =
    /math|physics|chemistry|statistics|accounting|finance/;

  const hasNumbers =
    /\b\d+(?:\.\d+)?\b/.test(stem);

  if (
    calculationSubjects.test(subject) &&
    hasNumbers &&
    quantitativeConcept
  ) {
    return {
      mode: "calculation",
      requiresWorking: true,
      confidence: 0.6,
    };
  }

  // ------------------------------------------
  // 9. SAFE DEFAULT
  // ------------------------------------------

  return {
    mode: "conceptual",
    requiresWorking: false,
    confidence: 0.5,
  };
}

/**
 * Backward-compatible helper returning boolean requiresWorking.
 */
export function isCalculationQuestion(question, subjectName = "") {
  const result = determineResponseMode(question, subjectName);
  return result.requiresWorking;
}
