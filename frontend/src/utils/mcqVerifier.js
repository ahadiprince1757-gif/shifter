/**
 * TIXAR MCQ OPTION VERIFIER
 *
 * Purpose:
 *   Validate and repair multiple-choice questions without silently
 *   creating misleading answer choices.
 *
 * Core principles:
 *
 * 1. Verify the answer before repairing the options.
 * 2. Never use substring matching for answer equality.
 * 3. Preserve units when comparing numerical answers.
 * 4. Remove duplicate options.
 * 5. Generate distractors from plausible mistakes where possible.
 * 6. Never create "None of the above" as a lazy filler.
 * 7. Never claim a question is verified when the subject verifier
 *    cannot confidently verify it.
 * 8. Keep the correct answer exactly represented in the option list.
 * 9. Keep option count at 4 for standard MCQs.
 * 10. Avoid distractors that are identical to the correct answer
 *     after normalization.
 *
 * Output includes:
 *
 * {
 *   question,
 *   verified,
 *   repaired,
 *   verificationConfidence,
 *   options,
 *   answer,
 *   steps,
 *   solution
 * }
 */

import { verifyQuestionAcrossSubjects } from "./subjectVerifierRouter.js";

// ============================================================================
// CONFIGURATION
// ============================================================================

const OPTION_COUNT = 4;

// Minimum confidence required before allowing the verifier
// to replace the stored answer.
const SAFE_OVERRIDE_CONFIDENCE = 0.95;

// ============================================================================
// PUBLIC API
// ============================================================================

export function getVerifiedQuestionWithOptions(questionObj) {
  if (!questionObj || typeof questionObj !== "object") {
    return questionObj;
  }

  const qText =
    String(
      questionObj.q ||
      questionObj.stem ||
      ""
    ).trim();

  const originalAnswer =
    questionObj.ans;

  // --------------------------------------------------------------------------
  // No question text = cannot verify.
  // --------------------------------------------------------------------------

  if (!qText) {
    return {
      ...questionObj,
      verified: false,
      verificationConfidence: 0,
      repaired: false,
    };
  }

  // --------------------------------------------------------------------------
  // 1. INDEPENDENT VERIFICATION
  // --------------------------------------------------------------------------

  let verification;

  try {
    verification =
      verifyQuestionAcrossSubjects(
        qText,
        originalAnswer,
        questionObj
      );
  } catch (error) {
    console.warn(
      "[Tixar MCQ Verifier] Subject verification failed:",
      error
    );

    return preserveQuestionSafely(
      questionObj
    );
  }

  const confidence =
    Number(
      verification?.confidence
    ) || 0;

  /*
   * Older subject verifiers may not return confidence.
   *
   * In that case, only trust an explicit override.
   */
  const verifierExplicitlyOverrode =
    verification?.wasOverridden === true;

  const canSafelyOverride =
    verifierExplicitlyOverrode &&
    (
      confidence === 0 ||
      confidence >=
        SAFE_OVERRIDE_CONFIDENCE
    );

  let targetAnswer =
    originalAnswer;

  let answerWasVerified =
    false;

  if (canSafelyOverride) {
    targetAnswer =
      verification.verifiedAnswer;

    answerWasVerified = true;
  } else if (
    verification?.verifiedAnswer !== undefined &&
    confidence >=
      SAFE_OVERRIDE_CONFIDENCE
  ) {
    targetAnswer =
      verification.verifiedAnswer;

    answerWasVerified = true;
  }

  // --------------------------------------------------------------------------
  // 2. CLEAN EXISTING OPTIONS
  // --------------------------------------------------------------------------

  const existingOptions =
    cleanOptions(
      questionObj.options
    );

  // --------------------------------------------------------------------------
  // 3. NO OPTIONS
  //
  // If this isn't an MCQ yet, don't fabricate four options unless
  // the caller explicitly wants an MCQ.
  // --------------------------------------------------------------------------

  if (
    existingOptions.length === 0
  ) {
    return {
      ...questionObj,

      ans:
        targetAnswer,

      type:
        questionObj.type === "mcq"
          ? (questionObj.isCalc || questionObj.steps ? "calc" : "open_response")
          : (questionObj.type || "open_response"),

      verified:
        answerWasVerified,

      verificationConfidence:
        confidence,

      steps:
        verification?.verifiedSteps ||
        questionObj.steps ||
        [],

      solution:
        verification?.explanation ||
        questionObj.sol ||
        questionObj.why ||
        "",

      repaired: false,

      options: null,
    };
  }

  // --------------------------------------------------------------------------
  // 4. CHECK WHETHER THE CORRECT ANSWER IS ALREADY PRESENT
  // --------------------------------------------------------------------------

  const hasCorrectAnswer =
    existingOptions.some(
      (option) =>
        answersEquivalent(
          option,
          targetAnswer
        )
    );

  // --------------------------------------------------------------------------
  // 5. EXISTING MCQ IS HEALTHY
  // --------------------------------------------------------------------------

  if (
    hasCorrectAnswer &&
    hasFourUniqueOptions(
      existingOptions,
      targetAnswer
    )
  ) {
    return {
      ...questionObj,

      ans:
        targetAnswer,

      options:
        shuffleArray(
          existingOptions
        ),

      verified:
        answerWasVerified,

      verificationConfidence:
        confidence,

      repaired: false,

      steps:
        verification?.verifiedSteps ||
        questionObj.steps ||
        [],

      solution:
        verification?.explanation ||
        questionObj.sol ||
        questionObj.why ||
        "",
    };
  }

  // --------------------------------------------------------------------------
  // 6. BROKEN MCQ
  //
  // Only repair if we have enough confidence in the answer.
  // --------------------------------------------------------------------------

  if (
    !answerWasVerified &&
    verifierExplicitlyOverrode &&
    confidence <
      SAFE_OVERRIDE_CONFIDENCE
  ) {
    /*
     * Do NOT manufacture an MCQ around an uncertain answer.
     *
     * This is a critical safety rule for Tixar.
     */
    return {
      ...questionObj,

      verified: false,

      verificationConfidence:
        confidence,

      repaired: false,

      verificationWarning:
        "The answer could not be verified with sufficient confidence, so the MCQ options were not automatically regenerated.",
    };
  }

  // --------------------------------------------------------------------------
  // 7. REPAIR THE MCQ
  // --------------------------------------------------------------------------

  const repairedOptions =
    generateRepairedOptions({
      targetAnswer,
      questionText: qText,
      existingOptions,
      steps:
        verification?.verifiedSteps ||
        questionObj.steps ||
        [],
    });

  // --------------------------------------------------------------------------
  // 8. FINAL SAFETY CHECK
  // --------------------------------------------------------------------------

  const finalOptions =
    ensureValidOptionSet(
      repairedOptions,
      targetAnswer,
      qText
    );

  return {
    ...questionObj,

    ans:
      targetAnswer,

    options:
      shuffleArray(
        finalOptions
      ),

    verified:
      answerWasVerified,

    verificationConfidence:
      confidence,

    repaired: true,

    steps:
      verification?.verifiedSteps ||
      questionObj.steps ||
      [],

    solution:
      verification?.explanation ||
      questionObj.sol ||
      questionObj.why ||
      "",

    mcqVerification: {
      correctAnswerPresent:
        finalOptions.some(
          (option) =>
            answersEquivalent(
              option,
              targetAnswer
            )
        ),

      optionCount:
        finalOptions.length,

      uniqueOptions:
        countUniqueAnswers(
          finalOptions
        ),

      repaired: true,
    },
  };
}

// ============================================================================
// OPTION CLEANING
// ============================================================================

function cleanOptions(options) {
  if (!Array.isArray(options)) {
    return [];
  }

  const cleaned = [];

  for (const option of options) {
    if (
      option === null ||
      option === undefined
    ) {
      continue;
    }

    const value =
      String(option)
        .trim();

    if (!value) {
      continue;
    }

    // Remove common option labels:
    // A. 20
    // B) 30
    // C: 40
    const withoutLabel =
      value.replace(
        /^\s*[A-D][.:)]\s*/i,
        ""
      ).trim();

    if (
      !withoutLabel
    ) {
      continue;
    }

    if (
      !cleaned.some(
        (existing) =>
          answersEquivalent(
            existing,
            withoutLabel
          )
      )
    ) {
      cleaned.push(
        withoutLabel
      );
    }
  }

  return cleaned;
}

// ============================================================================
// OPTION GENERATION
// ============================================================================

function generateRepairedOptions({
  targetAnswer,
  questionText,
  existingOptions = [],
  steps = [],
}) {
  const target =
    String(
      targetAnswer ?? ""
    ).trim();

  if (!target) {
    return cleanOptions(
      existingOptions
    ).slice(
      0,
      OPTION_COUNT
    );
  }

  // --------------------------------------------------------------------------
  // Numeric answer
  // --------------------------------------------------------------------------

  const numeric =
    parseNumericAnswer(
      target
    );

  if (numeric) {
    return generateNumericOptions(
      numeric,
      target,
      questionText,
      existingOptions,
      steps
    );
  }

  // --------------------------------------------------------------------------
  // Text answer
  // --------------------------------------------------------------------------

  return generateTextOptions(
    target,
    existingOptions
  );
}

// ============================================================================
// NUMERIC DISTRACTOR GENERATOR
// ============================================================================

function generateNumericOptions(
  numeric,
  targetAnswer,
  questionText,
  existingOptions,
  steps
) {
  const targetValue =
    numeric.value;

  const unit =
    numeric.unit;

  const candidates = [];

  // --------------------------------------------------------------------------
  // Existing options are preferred.
  //
  // They may already represent realistic student errors.
  // --------------------------------------------------------------------------

  for (
    const option
    of existingOptions
  ) {
    if (
      !answersEquivalent(
        option,
        targetAnswer
      )
    ) {
      candidates.push(
        option
      );
    }
  }

  // --------------------------------------------------------------------------
  // Generate pedagogically meaningful distractors.
  // --------------------------------------------------------------------------

  const mistakes =
    generatePlausibleNumericMistakes(
      targetValue,
      questionText,
      steps
    );

  for (
    const value
    of mistakes
  ) {
    const formatted =
      formatNumericOption(
        value,
        unit
      );

    if (
      !answersEquivalent(
        formatted,
        targetAnswer
      ) &&
      !candidates.some(
        (option) =>
          answersEquivalent(
            option,
            formatted
          )
      )
    ) {
      candidates.push(
        formatted
      );
    }

    if (
      candidates.length >=
      OPTION_COUNT - 1
    ) {
      break;
    }
  }

  // --------------------------------------------------------------------------
  // Last-resort mathematically distinct values.
  //
  // These are still better than "None of the above" repeated.
  // --------------------------------------------------------------------------

  const fallbackValues =
    generateFallbackNumbers(
      targetValue
    );

  for (
    const value
    of fallbackValues
  ) {
    const formatted =
      formatNumericOption(
        value,
        unit
      );

    if (
      !answersEquivalent(
        formatted,
        targetAnswer
      ) &&
      !candidates.some(
        (option) =>
          answersEquivalent(
            option,
            formatted
          )
      )
    ) {
      candidates.push(
        formatted
      );
    }

    if (
      candidates.length >=
      OPTION_COUNT - 1
    ) {
      break;
    }
  }

  return [
    targetAnswer,
    ...candidates.slice(
      0,
      OPTION_COUNT - 1
    ),
  ];
}

// ============================================================================
// PLAUSIBLE MATHEMATICAL MISTAKES
// ============================================================================

function generatePlausibleNumericMistakes(
  answer,
  questionText,
  steps
) {
  const candidates = [];

  const text =
    String(
      questionText +
      " " +
      steps.join(" ")
    ).toLowerCase();

  // --------------------------------------------------------------------------
  // Percentage error
  //
  // Example:
  // Correct: 20% of 50 = 10
  //
  // Common mistake:
  // 20 × 50 = 1000
  // --------------------------------------------------------------------------

  if (
    /%|\bpercent\b|\bpercentage\b/i.test(
      text
    )
  ) {
    addCandidate(
      candidates,
      answer * 100
    );

    addCandidate(
      candidates,
      answer / 100
    );
  }

  // --------------------------------------------------------------------------
  // Area/perimeter confusion
  //
  // We cannot always know the alternate result, but if the steps
  // contain both dimensions we can generate common arithmetic
  // mistakes around them.
  // --------------------------------------------------------------------------

  if (
    /\barea\b/i.test(text) &&
    /\b(length|width|breadth|base|height)\b/i.test(
      text
    )
  ) {
    addCandidate(
      candidates,
      answer * 2
    );

    addCandidate(
      candidates,
      Math.sqrt(
        Math.abs(answer)
      )
    );
  }

  // --------------------------------------------------------------------------
  // Speed-distance-time mistakes
  // --------------------------------------------------------------------------

  if (
    /\bspeed\b|\bdistance\b|\btime\b/i.test(
      text
    )
  ) {
    addCandidate(
      candidates,
      answer * 2
    );

    addCandidate(
      candidates,
      answer / 2
    );

    addCandidate(
      candidates,
      answer * 3.6
    );

    addCandidate(
      candidates,
      answer / 3.6
    );
  }

  // --------------------------------------------------------------------------
  // Sign error
  // --------------------------------------------------------------------------

  if (
    answer !== 0
  ) {
    addCandidate(
      candidates,
      -answer
    );
  }

  // --------------------------------------------------------------------------
  // Rounding / transcription mistake
  // --------------------------------------------------------------------------

  addCandidate(
    candidates,
    Math.round(answer)
  );

  // --------------------------------------------------------------------------
  // Nearby integer mistake
  // --------------------------------------------------------------------------

  addCandidate(
    candidates,
    answer + 1
  );

  addCandidate(
    candidates,
    answer - 1
  );

  return candidates.filter(
    Number.isFinite
  );
}

// ============================================================================
// FALLBACK NUMBERS
// ============================================================================

function generateFallbackNumbers(
  answer
) {
  const values = [];

  const offsets = [
    1,
    -1,
    2,
    -2,
    5,
    -5,
  ];

  for (
    const offset
    of offsets
  ) {
    const value =
      answer +
      offset;

    if (
      Number.isFinite(value) &&
      value !== answer
    ) {
      values.push(
        value
      );
    }
  }

  // Multiplicative fallbacks.
  values.push(
    answer * 2,
    answer / 2,
    answer * 0.5,
    answer * 1.5
  );

  return values.filter(
    (value, index, array) =>
      Number.isFinite(value) &&
      value !== answer &&
      array.indexOf(value) === index
  );
}

// ============================================================================
// TEXT OPTION GENERATOR
// ============================================================================

function generateTextOptions(
  targetAnswer,
  existingOptions
) {
  const cleaned =
    cleanOptions(
      existingOptions
    ).filter(
      (option) =>
        !answersEquivalent(
          option,
          targetAnswer
        )
    );

  /*
   * We DO NOT generate fake textual concepts here.
   *
   * A textual distractor needs semantic knowledge of the question.
   * Random text is worse than an incomplete MCQ.
   */

  const options = [
    targetAnswer,
    ...cleaned.slice(
      0,
      OPTION_COUNT - 1
    ),
  ];

  /*
   * If fewer than four options exist,
   * leave the MCQ incomplete rather than inventing
   * scientifically misleading statements.
   */

  return options;
}

// ============================================================================
// FINAL OPTION VALIDATION
// ============================================================================

function ensureValidOptionSet(
  options,
  targetAnswer
) {
  let cleaned =
    cleanOptions(
      options
    );

  // Remove duplicates.
  cleaned =
    deduplicateOptions(
      cleaned
    );

  // Make sure target answer exists.
  const hasTarget =
    cleaned.some(
      (option) =>
        answersEquivalent(
          option,
          targetAnswer
        )
    );

  if (!hasTarget) {
    cleaned.unshift(
      String(targetAnswer).trim()
    );
  }

  // --------------------------------------------------------------------------
  // Numeric questions can safely receive numeric fallback distractors.
  // --------------------------------------------------------------------------

  if (
    cleaned.length <
      OPTION_COUNT
  ) {
    const numeric =
      parseNumericAnswer(
        targetAnswer
      );

    if (numeric) {
      const fallbacks =
        generateFallbackNumbers(
          numeric.value
        );

      for (
        const value
        of fallbacks
      ) {
        const formatted =
          formatNumericOption(
            value,
            numeric.unit
          );

        if (
          !cleaned.some(
            (option) =>
              answersEquivalent(
                option,
                formatted
              )
          )
        ) {
          cleaned.push(
            formatted
          );
        }

        if (
          cleaned.length >=
          OPTION_COUNT
        ) {
          break;
        }
      }
    }
  }

  /*
   * Do not add "None of the above".
   *
   * A malformed MCQ should be visible to the system instead of
   * being hidden by a fake fourth option.
   */

  return cleaned.slice(
    0,
    OPTION_COUNT
  );
}

// ============================================================================
// ANSWER COMPARISON
// ============================================================================

function answersEquivalent(
  a,
  b
) {
  const first =
    normalizeAnswerValue(a);

  const second =
    normalizeAnswerValue(b);

  // Exact normalized match.
  if (
    first.normalized ===
    second.normalized
  ) {
    return true;
  }

  // Numeric comparison.
  if (
    first.numeric !== null &&
    second.numeric !== null
  ) {
    /*
     * If one has a unit and the other doesn't,
     * do NOT automatically assume they are equal.
     *
     * "6 m" and "6" are not necessarily equivalent
     * in an MCQ.
     */
    if (
      first.unit !== second.unit &&
      first.unit !== null &&
      second.unit !== null
    ) {
      return false;
    }

    return (
      Math.abs(
        first.numeric -
        second.numeric
      ) <=
      numericTolerance(
        first.numeric,
        second.numeric
      )
    );
  }

  return false;
}

// ============================================================================
// ANSWER NORMALIZATION
// ============================================================================

function normalizeAnswerValue(
  value
) {
  const raw =
    String(
      value ?? ""
    )
      .toLowerCase()
      .trim();

  const numeric =
    parseNumericAnswer(
      raw
    );

  return {
    raw,

    normalized:
      normalizeTextAnswer(
        raw
      ),

    numeric:
      numeric
        ? numeric.value
        : null,

    unit:
      numeric
        ? numeric.unit
        : null,
  };
}

function normalizeTextAnswer(
  value
) {
  return String(
    value || ""
  )
    .toLowerCase()
    .replace(/[“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================================================
// NUMERIC PARSER
// ============================================================================

function parseNumericAnswer(
  value
) {
  const text =
    String(
      value ?? ""
    )
      .trim()
      .toLowerCase();

  /*
   * Supports:
   *
   * 6
   * -6
   * 6.5
   * 6 cm
   * 6cm
   * 6.5 km
   *
   * Does NOT accept:
   *
   * 6 apples
   * answer is 6
   *
   * because those require semantic interpretation.
   */

  const match =
    text.match(
      /^(-?\d+(?:\.\d+)?)\s*([a-z]+(?:\/[a-z]+)?|²|³)?$/i
    );

  if (!match) {
    return null;
  }

  const numeric =
    Number(
      match[1]
    );

  if (
    !Number.isFinite(
      numeric
    )
  ) {
    return null;
  }

  return {
    value: numeric,
    unit:
      normalizeUnit(
        match[2]
      ),
  };
}

// ============================================================================
// UNIT NORMALIZATION
// ============================================================================

function normalizeUnit(
  unit
) {
  if (!unit) {
    return null;
  }

  const normalized =
    String(unit)
      .toLowerCase()
      .trim();

  const aliases = {
    meter: "m",
    meters: "m",
    metre: "m",
    metres: "m",

    centimeter: "cm",
    centimeters: "cm",
    centimetre: "cm",
    centimetres: "cm",

    kilometer: "km",
    kilometers: "km",
    kilometre: "km",
    kilometres: "km",

    millimeter: "mm",
    millimeters: "mm",
    millimetre: "mm",
    millimetres: "mm",

    foot: "ft",
    feet: "ft",

    inch: "in",
    inches: "in",

    yard: "yd",
    yards: "yd",

    squaremeter: "m²",
    squaremeters: "m²",

    squarecentimeter: "cm²",
    squarecentimeters: "cm²",

    squarekilometer: "km²",
    squarekilometers: "km²",
  };

  return (
    aliases[normalized] ||
    normalized
  );
}

// ============================================================================
// NUMERIC FORMATTING
// ============================================================================

function formatNumericOption(
  value,
  unit
) {
  const formatted =
    Number.isInteger(value)
      ? String(value)
      : String(
          Number(
            value.toFixed(4)
          )
        );

  return unit
    ? `${formatted} ${unit}`
    : formatted;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function addCandidate(
  array,
  value
) {
  if (
    Number.isFinite(value) &&
    !array.some(
      (existing) =>
        Math.abs(
          existing - value
        ) < 1e-8
    )
  ) {
    array.push(
      value
    );
  }
}

function numericTolerance(
  a,
  b
) {
  return Math.max(
    1e-5,
    Math.abs(a) * 1e-5,
    Math.abs(b) * 1e-5
  );
}

function deduplicateOptions(
  options
) {
  const result = [];

  for (
    const option
    of options
  ) {
    if (
      !result.some(
        (existing) =>
          answersEquivalent(
            existing,
            option
          )
      )
    ) {
      result.push(
        option
      );
    }
  }

  return result;
}

function countUniqueAnswers(
  options
) {
  return deduplicateOptions(
    options
  ).length;
}

function hasFourUniqueOptions(
  options,
  targetAnswer
) {
  return (
    options.length ===
      OPTION_COUNT &&
    countUniqueAnswers(
      options
    ) === OPTION_COUNT &&
    options.some(
      (option) =>
        answersEquivalent(
          option,
          targetAnswer
        )
    )
  );
}

function preserveQuestionSafely(
  questionObj
) {
  return {
    ...questionObj,

    verified: false,

    verificationConfidence: 0,

    repaired: false,

    verificationWarning:
      "Question verification failed. Existing answer and options were preserved rather than generating potentially incorrect content.",
  };
}

// ============================================================================
// SHUFFLE
// ============================================================================

function shuffleArray(
  array
) {
  const result =
    [...array];

  for (
    let i =
      result.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      result[i],
      result[j],
    ] = [
      result[j],
      result[i],
    ];
  }

  return result;
}
