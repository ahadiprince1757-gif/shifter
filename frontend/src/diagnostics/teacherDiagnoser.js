
/**
 * ============================================================================
 * TIXAR DETERMINISTIC TEACHER DIAGNOSTIC ENGINE
 * ============================================================================
 *
 * File: frontend/src/diagnostics/teacherDiagnoser.js
 *
 * Core principle:
 * Diagnose from evidence. Never invent a student's reasoning.
 *
 * Pipeline:
 * Submission -> Evidence -> Error classification -> Correction -> Retest hint
 *
 * Public API:
 *   diagnoseStudentSubmission({...})
 *
 * Existing result fields are preserved for compatibility.
 * ============================================================================
 */

export const CONFIDENCE = Object.freeze({
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
});

export const STATUS = Object.freeze({
  DIAGNOSED: "diagnosed",
  INCONCLUSIVE: "inconclusive",
  CORRECT: "correct",
});

const UNIT_ALIASES = Object.freeze({
  kilometre: "km",
  kilometres: "km",
  kilometer: "km",
  kilometers: "km",
  metre: "m",
  metres: "m",
  meter: "m",
  meters: "m",
  centimetre: "cm",
  centimetres: "cm",
  centimeter: "cm",
  centimeters: "cm",
  hour: "h",
  hours: "h",
  hr: "h",
  hrs: "h",
  second: "s",
  seconds: "s",
  sec: "s",
  secs: "s",
  minute: "min",
  minutes: "min",
  mins: "min",
  kilometreperhour: "km/h",
  kilometerperhour: "km/h",
  kmph: "km/h",
  kph: "km/h",
  mph: "miles/h",
  mps: "m/s",
  metrepersecond: "m/s",
  meterpersecond: "m/s",
  kilogram: "kg",
  kilograms: "kg",
  gram: "g",
  grams: "g",
  volts: "v",
  volt: "v",
});

function cleanString(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return "";
  return String(value).trim();
}

function normalizeText(value) {
  return cleanString(value)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[−–—]/g, "-")
    .replace(/[×·]/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (Array.isArray(value) && value.length) return value;

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function toArrayOfStrings(value) {
  if (value === null || value === undefined) return [];

  const items = Array.isArray(value) ? value : [value];

  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();

      if (item && typeof item === "object") {
        return cleanString(
          item.text ??
          item.step ??
          item.explanation ??
          item.content ??
          item.why
        );
      }

      return "";
    })
    .filter(Boolean);
}

function approximatelyEqual(a, b, tolerance = 1e-5) {
  return (
    Number.isFinite(a) &&
    Number.isFinite(b) &&
    Math.abs(a - b) <=
      tolerance * Math.max(1, Math.abs(a), Math.abs(b))
  );
}

function normalizeUnit(unit) {
  if (!unit) return null;

  const normalized = String(unit)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[²]/g, "^2")
    .trim();

  return UNIT_ALIASES[normalized] || normalized;
}

/**
 * Parse a complete number, optionally followed by a unit.
 *
 * Examples:
 *   "42.5 km/h" -> { value: 42.5, unit: "km/h" }
 *   "-3.5"      -> { value: -3.5, unit: null }
 *
 * Does not evaluate expressions or extract numbers from arbitrary prose.
 */
export function parseNumericWithUnit(input) {
  const raw = cleanString(input);
  if (!raw) return null;

  const number = "[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
  const unit = "[a-zA-Z°μΩ]+(?:\\s*\\^?\\s*\\d+)?(?:\\s*/\\s*[a-zA-Z°μΩ]+(?:\\s*\\^?\\s*\\d+)?)?";

  const match = raw.match(
    new RegExp(`^\\s*(${number})\\s*(${unit})?\\s*$`)
  );

  if (!match) return null;

  const value = Number(match[1]);
  if (!Number.isFinite(value)) return null;

  return {
    value,
    unit: normalizeUnit(match[2] || null),
    raw,
  };
}

/**
 * Extract numeric quantities from working.
 * These are observations only; they are not proof of a student's method.
 */
export function extractNumbersWithUnits(text) {
  const source = cleanString(text);
  if (!source) return [];

  const regex =
    /([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(km\/h|m\/s|miles\/h|mph|km|miles?|cm|mm|metres?|meters?|hours?|hrs?|hr|h|seconds?|secs?|s|minutes?|mins?|min|kg|g|volts?|v|%|°c|°f)?/gi;

  const results = [];
  let match;

  while ((match = regex.exec(source)) !== null) {
    const value = Number(match[1]);
    if (!Number.isFinite(value)) continue;

    results.push({
      value,
      unit: normalizeUnit(match[2] || null),
      full: match[0].trim(),
    });
  }

  return results;
}

function getQuestionText(question = {}) {
  return cleanString(
    firstNonEmpty(
      question.q,
      question.question,
      question.prompt,
      question.text
    )
  );
}

function getExpectedAnswer(question = {}, expectedSolution = {}) {
  return cleanString(
    firstNonEmpty(
      expectedSolution.ans,
      expectedSolution.answer,
      question.ans,
      question.answer,
      question.correctAnswer
    )
  );
}

function getAuthoredSteps(question = {}, expectedSolution = {}) {
  return toArrayOfStrings(
    firstNonEmpty(
      expectedSolution.steps,
      question.steps,
      expectedSolution.solution,
      question.solution,
      question.sol
    )
  );
}

function getExplanation(question = {}, expectedSolution = {}) {
  return cleanString(
    firstNonEmpty(
      expectedSolution.why,
      question.why,
      expectedSolution.explain,
      question.explain
    )
  );
}

function makeDiagnosis({
  status = STATUS.INCONCLUSIVE,
  errorType = null,
  whatYouDid = "",
  whyThisIsWrong = [],
  theRightWay = [],
  remember = "",
  observed = [],
  expected = [],
  confidence = CONFIDENCE.LOW,
  firstError = null,
  correction = null,
}) {
  return {
    status,
    errorType,
    whatYouDid,
    whyThisIsWrong: toArrayOfStrings(whyThisIsWrong),
    theRightWay: toArrayOfStrings(theRightWay),
    remember,
    evidence: {
      observed: toArrayOfStrings(observed),
      expected: toArrayOfStrings(expected),
      confidence,
    },
    ...(firstError ? { firstError } : {}),
    ...(correction ? { correction } : {}),
  };
}

function diagnoseCorrectAnswer({
  studentAnswer,
  expectedAnswer,
  authoredSteps,
  explanation,
}) {
  return makeDiagnosis({
    status: STATUS.CORRECT,
    errorType: null,
    whatYouDid:
      "Your submitted answer was marked correct by the existing grader.",
    whyThisIsWrong: [],
    theRightWay: authoredSteps.length
      ? authoredSteps
      : expectedAnswer
        ? [`Expected answer: ${expectedAnswer}`]
        : [],
    remember:
      explanation ||
      "Your answer was accepted. Review the method to reinforce your understanding.",
    observed: [
      studentAnswer
        ? `Submitted answer: ${studentAnswer}`
        : "The existing grader marked the submission correct.",
    ],
    expected: expectedAnswer ? [expectedAnswer] : [],
    confidence: CONFIDENCE.HIGH,
  });
}

/**
 * Diagnose a unit omission or mismatch only when the numeric values agree.
 *
 * This deliberately does not claim that the entire method was correct.
 */
function diagnoseUnitErrors({
  studentAnswer,
  expectedAnswer,
  authoredSteps,
}) {
  const student = parseNumericWithUnit(studentAnswer);
  const expected = parseNumericWithUnit(expectedAnswer);

  if (!student || !expected) return null;

  if (!approximatelyEqual(student.value, expected.value)) {
    return null;
  }

  if (!student.unit && expected.unit) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "unit_omitted",
      whatYouDid:
        `Your numerical answer (${student.value}) matches the expected value, but your answer does not include the unit.`,
      whyThisIsWrong: [
        "A physical quantity needs an appropriate unit when the question asks for a measured quantity.",
        `The expected answer is expressed in ${expected.unit}.`,
      ],
      theRightWay: authoredSteps.length
        ? authoredSteps
        : [`Write the result with its unit: ${expected.value} ${expected.unit}.`],
      remember: "Check the unit as well as the numerical value before submitting.",
      observed: [`Submitted value: ${student.value}; no unit supplied.`],
      expected: [`Expected representation: ${expectedAnswer}`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  if (
    student.unit &&
    expected.unit &&
    student.unit !== expected.unit
  ) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "unit_mismatch",
      whatYouDid:
        `Your numerical value matches the expected value, but you wrote ${student.unit} instead of ${expected.unit}.`,
      whyThisIsWrong: [
        "Different units can represent different physical quantities or scales.",
        "A matching numerical value alone does not establish that the units are equivalent.",
      ],
      theRightWay: authoredSteps.length
        ? authoredSteps
        : [`Check the required unit and express the result as ${expectedAnswer}.`],
      remember:
        "Check whether the units match the question and whether a conversion is required.",
      observed: [`Submitted answer: ${studentAnswer}`],
      expected: [`Expected answer: ${expectedAnswer}`],
      confidence: CONFIDENCE.MEDIUM,
    });
  }

  return null;
}

/**
 * Average-speed diagnostic.
 *
 * Only activates for questions with at least two explicitly detected
 * distance/time pairs. It does not convert different units automatically.
 */
function diagnoseAverageSpeedJourney({
  studentAnswer,
  userWork,
  questionText,
  expectedAnswer,
  authoredSteps,
  explanation,
}) {
  const q = normalizeText(questionText);

  const isAverageSpeed =
    q.includes("average speed") ||
    q.includes("mean speed");

  if (!isAverageSpeed) return null;

  const legRegex =
    /(\d+(?:\.\d+)?)\s*(km|miles?|m)\s*(?:in|for)\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|hr|h|minutes?|mins?|min|seconds?|secs?|s)\b/gi;

  const legs = [];
  let match;

  while ((match = legRegex.exec(questionText)) !== null) {
    legs.push({
      distance: Number(match[1]),
      distanceUnit: normalizeUnit(match[2]),
      time: Number(match[3]),
      timeUnit: normalizeUnit(match[4]),
    });
  }

  if (legs.length < 2) return null;

  // Avoid incorrect calculations when conversion would be required.
  const first = legs[0];

  if (
    legs.some(
      (leg) =>
        leg.distanceUnit !== first.distanceUnit ||
        leg.timeUnit !== first.timeUnit
    )
  ) {
    return null;
  }

  if (legs.some((leg) => leg.time <= 0)) return null;

  const totalDistance = legs.reduce(
    (sum, leg) => sum + leg.distance,
    0
  );

  const totalTime = legs.reduce(
    (sum, leg) => sum + leg.time,
    0
  );

  if (totalTime <= 0) return null;

  const correctSpeed = totalDistance / totalTime;

  const legSpeeds = legs.map(
    (leg) => leg.distance / leg.time
  );

  const simpleMean =
    legSpeeds.reduce((sum, speed) => sum + speed, 0) /
    legSpeeds.length;

  const parsed = parseNumericWithUnit(studentAnswer);

  if (!parsed) return null;

  const work = normalizeText(userWork);
  const unit = `${first.distanceUnit}/${first.timeUnit}`;

  const steps = authoredSteps.length
    ? authoredSteps
    : [
        `Add the distances: ${totalDistance} ${first.distanceUnit}.`,
        `Add the travel times: ${totalTime} ${first.timeUnit}.`,
        `Average speed = total distance ÷ total time.`,
        `Calculate ${totalDistance} ÷ ${totalTime} = ${correctSpeed} ${unit}.`,
      ];

  const expected = [
    expectedAnswer || `${correctSpeed} ${unit}`,
  ];

  // A result matching the simple mean is a clue, not proof by itself.
  const averagingEvidence =
    approximatelyEqual(parsed.value, simpleMean) &&
    !approximatelyEqual(parsed.value, correctSpeed);

  const averagingWork =
    /average\s+of\s+(the\s+)?speeds/.test(work);

  if (averagingEvidence && averagingWork) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "speed_averaging_trap",
      whatYouDid:
        "Your working explicitly indicates that you averaged the individual speeds instead of calculating the average speed for the entire journey.",
      whyThisIsWrong: [
        "Average speed for the whole journey is total distance divided by total elapsed time.",
        "A simple mean of individual speeds generally gives the wrong result when the journey stages take different amounts of time.",
      ],
      theRightWay: steps,
      remember:
        explanation ||
        "Average speed = total distance ÷ total time. Use the whole journey, not just the individual speeds.",
      observed: [
        `Submitted answer: ${studentAnswer}`,
        "Working explicitly refers to averaging the individual speeds.",
      ],
      expected,
      confidence: CONFIDENCE.HIGH,
      firstError: {
        description: "The average-speed method was applied incorrectly.",
        evidence: "The student's submitted working explicitly identifies an average of speeds.",
      },
      correction: {
        instruction: "Calculate total distance and total time separately before dividing.",
      },
    });
  }

  // Bare answers can suggest a pattern but cannot prove the student's method.
  if (averagingEvidence) {
    return makeDiagnosis({
      status: STATUS.INCONCLUSIVE,
      errorType: "possible_speed_averaging_trap",
      whatYouDid:
        "Your answer matches the simple mean of the individual stage speeds.",
      whyThisIsWrong: [
        "This result can occur when individual speeds are averaged directly.",
        "The final answer alone does not prove that this is the method you used.",
      ],
      theRightWay: steps,
      remember:
        "Show how you calculated average speed so the specific error, if any, can be identified.",
      observed: [
        `Submitted answer: ${studentAnswer}`,
        `The simple mean of the stage speeds is ${simpleMean}.`,
      ],
      expected,
      confidence: CONFIDENCE.MEDIUM,
    });
  }

  // Do not invent an error merely because the answer is wrong.
  return null;
}

/**
 * Generic fallback.
 *
 * The correct answer and authored solution can be shown, but the engine
 * does not pretend to know which step failed without supporting evidence.
 */
function genericFallback({
  studentAnswer,
  userWork,
  expectedAnswer,
  authoredSteps,
  explanation,
}) {
  const hasWork = Boolean(cleanString(userWork));

  return makeDiagnosis({
    status: STATUS.INCONCLUSIVE,
    errorType: "unclassified_deviation",
    whatYouDid: studentAnswer
      ? `You submitted: "${studentAnswer}".`
      : "Working was submitted without a final answer.",
    whyThisIsWrong: [
      expectedAnswer
        ? `The expected answer is ${expectedAnswer}.`
        : "The existing grader did not accept the submitted response.",
      hasWork
        ? "The available evidence is not sufficient to identify the exact first incorrect step confidently."
        : "No working was provided, so the method used cannot be established from the final answer alone.",
    ],
    theRightWay: authoredSteps.length
      ? authoredSteps
      : expectedAnswer
        ? [`Review the question and compare your method with the expected answer: ${expectedAnswer}.`]
        : [
            "Identify the information given in the question.",
            "Choose the relevant formula, rule, or concept.",
            "Show each step and verify the final result.",
          ],
    remember:
      explanation ||
      "Compare your working with the correct method. The exact mistake has not yet been established.",
    observed: [
      ...(studentAnswer
        ? [`Submitted answer: ${studentAnswer}`]
        : []),
      ...(hasWork
        ? [`Submitted working: ${cleanString(userWork)}`]
        : []),
    ],
    expected: expectedAnswer
      ? [`Expected answer: ${expectedAnswer}`]
      : [],
    confidence: CONFIDENCE.LOW,
  });
}

/**
 * Main public entry point.
 *
 * IMPORTANT:
 * isAnswerCorrect must reflect the existing grader's verified result.
 * This function diagnoses the submission; it does not replace grading.
 */
export function diagnoseStudentSubmission({
  studentAnswer = "",
  userWork = "",
  question = {},
  expectedSolution = {},
  isAnswerCorrect = false,
} = {}) {
  const answer = cleanString(studentAnswer);
  const work = cleanString(userWork);

  const questionText = getQuestionText(question);
  const expectedAnswer = getExpectedAnswer(
    question,
    expectedSolution
  );
  const authoredSteps = getAuthoredSteps(
    question,
    expectedSolution
  );
  const explanation = getExplanation(
    question,
    expectedSolution
  );

  // 1. Preserve the result of the existing grader.
  if (isAnswerCorrect) {
    return diagnoseCorrectAnswer({
      studentAnswer: answer,
      expectedAnswer,
      authoredSteps,
      explanation,
    });
  }

  // 2. No submission.
  if (!answer && !work) {
    return makeDiagnosis({
      status: STATUS.INCONCLUSIVE,
      errorType: "no_attempt",
      whatYouDid: "No answer or working was provided.",
      whyThisIsWrong: [
        "There is no submitted work to assess.",
      ],
      theRightWay: authoredSteps.length
        ? authoredSteps
        : expectedAnswer
          ? [`Expected answer: ${expectedAnswer}`]
          : ["Start by identifying what the question asks you to find."],
      remember:
        "Write down the given information and attempt the first step.",
      observed: [],
      expected: expectedAnswer ? [expectedAnswer] : [],
      confidence: CONFIDENCE.HIGH,
    });
  }

  // 3. Specific domain diagnostic.
  const speedDiagnosis = diagnoseAverageSpeedJourney({
    studentAnswer: answer,
    userWork: work,
    questionText,
    expectedAnswer,
    authoredSteps,
    explanation,
  });

  if (speedDiagnosis) return speedDiagnosis;

  // 4. Representation and unit diagnostics.
  const unitDiagnosis = diagnoseUnitErrors({
    studentAnswer: answer,
    expectedAnswer,
    authoredSteps,
  });

  if (unitDiagnosis) return unitDiagnosis;

  // 5. Evidence insufficient for a specific diagnosis.
  return genericFallback({
    studentAnswer: answer,
    userWork: work,
    expectedAnswer,
    authoredSteps,
    explanation,
  });
}

export default diagnoseStudentSubmission;
