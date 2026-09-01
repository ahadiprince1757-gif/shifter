/**
 * Determines whether a question requires mathematical working.
 *
 * Used to decide whether to render:
 * - "Show Your Working"
 * - "Your Final Answer"
 *
 * Returns true only when the student is genuinely expected
 * to perform a calculation or numerical transformation.
 */

export function isCalculationQuestion(question, subjectName = "") {
  if (!question || typeof question !== "object") {
    return false;
  }

  // --------------------------------------------------
  // 1. Explicit question configuration has priority
  // --------------------------------------------------

  if (question.type === "calc") {
    return true;
  }

  // MCQs are answered by selecting an option
  if (
    question.type === "mcq" &&
    Array.isArray(question.options) &&
    question.options.length > 0
  ) {
    return false;
  }

  // --------------------------------------------------
  // 2. Extract question text
  // --------------------------------------------------

  const stem = String(
    question.q ||
    question.stem ||
    question.question ||
    ""
  ).toLowerCase().trim();

  const subject = String(subjectName || "")
    .toLowerCase()
    .trim();

  if (!stem) {
    return false;
  }

  // --------------------------------------------------
  // 3. Detect explicitly conceptual questions
  // --------------------------------------------------

  const conceptualPatterns = [
    /\b(explain|describe|discuss|define|state|identify)\b/,
    /\b(compare|contrast|differentiate|outline)\b/,
    /\b(why|how does|what is|what are)\b/,
    /\b(advantages|disadvantages|importance|effects|causes)\b/,
    /\b(analyse|analyze|evaluate|justify)\b/,
  ];

  const isConceptualQuestion = conceptualPatterns.some(
    (pattern) => pattern.test(stem)
  );

  // --------------------------------------------------
  // 4. Strong calculation instructions
  // --------------------------------------------------

  const calculationCommands = [
    /\bcalculate\b/,
    /\bcompute\b/,
    /\bdetermine\b/,
    /\bevaluate\b/,
    /\bsolve\b/,
    /\bwork out\b/,
    /\bfind the value\b/,
    /\bfind the numerical\b/,
    /\busing the formula\b/,
    /\bhence calculate\b/,
  ];

  const hasCalculationCommand = calculationCommands.some(
    (pattern) => pattern.test(stem)
  );

  // Explicit calculation instruction always wins
  if (hasCalculationCommand) {
    return true;
  }

  // --------------------------------------------------
  // 5. Detect mathematical expressions
  // --------------------------------------------------

  const hasEquation = /[a-z]\s*=\s*[\d.]+/i.test(stem);

  const hasMathOperators =
    /\d+\s*[+\-*/×÷]\s*\d+/.test(stem);

  const hasAlgebra =
    /\b(solve for|equation|inequality|simultaneous equations)\b/.test(stem);

  const hasFormulaSymbols =
    /\b(v\s*=\s*u\s*\+\s*at|f\s*=\s*ma|p\s*=\s*mv|e\s*=\s*mc\^?2)\b/i
      .test(stem);

  // --------------------------------------------------
  // 6. Detect quantities with measurement units
  // --------------------------------------------------

  const hasMeasurements =
    /\b\d+(?:\.\d+)?\s*(km|m|cm|mm|kg|g|mg|l|ml|s|min|hours?|°c|k|n|pa|j|w|v|a|hz|mol|%)\b/i
      .test(stem);

  // --------------------------------------------------
  // 7. Numerical calculation topics
  // --------------------------------------------------

  const numericalTopics = [
    "area",
    "volume",
    "perimeter",
    "circumference",
    "hypotenuse",
    "percentage",
    "ratio",
    "proportion",
    "probability",
    "mean",
    "median",
    "mode",
    "standard deviation",
    "speed",
    "distance",
    "time",
    "velocity",
    "acceleration",
    "force",
    "momentum",
    "density",
    "pressure",
    "energy",
    "power",
    "work done",
    "molarity",
    "moles",
    "molar mass",
    "stoichiometry",
    "ph",
    "concentration",
    "binary to decimal",
    "decimal to binary",
    "interest",
    "profit",
    "loss",
    "discount",
    "tax",
  ];

  const hasNumericalTopic = numericalTopics.some((topic) =>
    stem.includes(topic)
  );

  // --------------------------------------------------
  // 8. Subjects that are primarily conceptual
  // --------------------------------------------------

  const primarilyConceptualSubjects =
    /biology|english|history|geography|kiswahili|literature|civics|cre|ire|hre|home\s*science/;

  if (primarilyConceptualSubjects.test(subject)) {
    // Only calculations if mathematical evidence exists
    return Boolean(
      hasMathOperators ||
      hasEquation ||
      hasAlgebra ||
      (hasMeasurements && hasNumericalTopic)
    );
  }

  // --------------------------------------------------
  // 9. Calculation-heavy subjects
  // --------------------------------------------------

  const calculationSubjects =
    /mathematics|math|physics|chemistry|statistics|accounting|finance|computer/;

  if (calculationSubjects.test(subject)) {
    // Conceptual questions should remain conceptual
    if (
      isConceptualQuestion &&
      !hasMathOperators &&
      !hasEquation &&
      !hasAlgebra
    ) {
      return false;
    }

    return Boolean(
      hasMathOperators ||
      hasEquation ||
      hasAlgebra ||
      hasFormulaSymbols ||
      (hasMeasurements && hasNumericalTopic)
    );
  }

  // --------------------------------------------------
  // 10. Generic fallback
  // --------------------------------------------------

  return Boolean(
    hasMathOperators ||
    hasEquation ||
    hasAlgebra ||
    (hasMeasurements && hasNumericalTopic)
  );
}
