/**
 * ============================================================================
 * TIXAR DETERMINISTIC TEACHER DIAGNOSTIC ENGINE
 * ============================================================================
 *
 * File: frontend/src/diagnostics/teacherDiagnoser.js
 *
 * Philosophy:
 * "Identify the student's actual mistake, explain why it is wrong,
 * and guide them through correcting that exact mistake using their own working."
 *
 * Design Invariants:
 * 1. Evidence Before Explanation:
 *    Never claim the student used a formula or method unless their answer
 *    or working strictly supports that conclusion.
 * 2. No Invented Working:
 *    Distinguish an observed calculation error from an unverified guess.
 * 3. Separate Error Categories:
 *    Formula errors, misconceptions, omitted units, arithmetic errors,
 *    and unclassified deviations are strictly separated.
 * 4. Step-by-Step Thinking Reconstruction:
 *    Trace the student's actual lines of working. Identify what was right,
 *    isolate the exact transformation that failed, rebuild their solution,
 *    and repair the cognitive thinking model.
 * 5. Curriculum-Aware Correction:
 *    Always prioritize authored steps and insights from the curriculum data.
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
  minute: "min",
  minutes: "min",
  mins: "min",
  mile: "miles",
  miles: "miles",
  kmph: "km/h",
  kph: "km/h",
  mph: "miles/h",
  mps: "m/s",
});

function cleanString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (Array.isArray(value) && value.length) return value;
    const text = cleanString(value);
    if (text) return value;
  }
  return "";
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

function normalizeText(value) {
  return cleanString(value)
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[×·]/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

function unpackStructuredJson(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  const str = String(value).trim();
  if (str.startsWith("{") && str.endsWith("}")) {
    try {
      const parsed = JSON.parse(str);
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      return null;
    }
  }
  return null;
}

function toArrayOfStrings(value) {
  if (!value) return [];

  // Check if value itself is a structured JSON string or object
  const unpackedRoot = unpackStructuredJson(value);
  if (unpackedRoot) {
    if (Array.isArray(unpackedRoot.steps) && unpackedRoot.steps.length > 0) {
      return toArrayOfStrings(unpackedRoot.steps);
    }
    if (unpackedRoot.sol || unpackedRoot.solution) {
      return String(unpackedRoot.sol || unpackedRoot.solution)
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  if (!Array.isArray(value)) {
    if (typeof value === "string") {
      return value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    }
    return [cleanString(value)].filter(Boolean);
  }

  const result = [];
  for (const item of value) {
    const unpacked = unpackStructuredJson(item);
    if (unpacked) {
      if (Array.isArray(unpacked.steps) && unpacked.steps.length > 0) {
        unpacked.steps.forEach((s) => s && result.push(cleanString(s)));
      } else if (unpacked.sol || unpacked.solution) {
        String(unpacked.sol || unpacked.solution)
          .split(/\r?\n/)
          .forEach((s) => s.trim() && result.push(cleanString(s)));
      }
    } else if (typeof item === "string") {
      result.push(item.trim());
    } else if (item && typeof item === "object") {
      result.push(
        cleanString(
          item.text || item.step || item.explanation || item.content
        )
      );
    } else if (item) {
      result.push(cleanString(item));
    }
  }
  return result.filter(Boolean);
}

function approximatelyEqual(a, b, tolerance = 0.01) {
  return (
    Number.isFinite(a) &&
    Number.isFinite(b) &&
    Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(b))
  );
}

/**
 * Extracts numeric value and optional unit from a string.
 * Example: "42.5 km/h" -> { value: 42.5, unit: "km/h", raw: "42.5 km/h" }
 */
export function parseNumericWithUnit(input) {
  if (input === null || input === undefined) return null;
  const raw = String(input).trim();
  if (!raw) return null;

  // Fraction check: e.g. "11/3", "-5/2"
  const fractionMatch = raw.match(/^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const num = Number(fractionMatch[1]);
    const den = Number(fractionMatch[2]);
    if (den !== 0 && Number.isFinite(num) && Number.isFinite(den)) {
      return {
        value: num / den,
        unit: null,
        raw,
      };
    }
  }

  const numberPattern = "[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
  const unitPattern = "[a-zA-Z/°%Ωμ²³^]+";

  const strictMatch = raw.match(
    new RegExp(`^(${numberPattern})\\s*(${unitPattern})?$`)
  );
  const relaxedMatch =
    strictMatch ||
    raw.match(new RegExp(`(${numberPattern})\\s*(${unitPattern})?`));

  if (!relaxedMatch) return null;

  const value = Number(relaxedMatch[1]);
  if (!Number.isFinite(value)) return null;

  return {
    value,
    unit: normalizeUnit(relaxedMatch[2] || null),
    raw,
  };
}

/**
 * Extracts all numbers with units from text.
 */
export function extractNumbersWithUnits(text) {
  if (!text) return [];
  const regex =
    /([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(km\/h|m\/s|miles\/h|mph|km|miles?|metres?|meters?|hours?|hrs?|hr|h|seconds?|secs?|s|minutes?|mins?|min|kg|g|ohms?|Ω|volts?|v|amps?|amperes?|a|%|°c|°f)?/gi;

  const results = [];
  let match;
  while ((match = regex.exec(String(text))) !== null) {
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
  const structured =
    unpackStructuredJson(question?.explain) ||
    unpackStructuredJson(expectedSolution?.explain) ||
    unpackStructuredJson(question?.solution) ||
    unpackStructuredJson(expectedSolution?.solution);

  const rawSteps = firstNonEmpty(
    expectedSolution.steps,
    question.steps,
    structured?.steps,
    expectedSolution.solution,
    question.solution,
    structured?.sol,
    question.sol
  );

  return toArrayOfStrings(rawSteps);
}

function getExplanation(question = {}, expectedSolution = {}) {
  const structured =
    unpackStructuredJson(question?.explain) ||
    unpackStructuredJson(expectedSolution?.explain) ||
    unpackStructuredJson(question?.solution) ||
    unpackStructuredJson(expectedSolution?.solution);

  const rawWhy = firstNonEmpty(
    expectedSolution.why,
    question.why,
    structured?.why,
    structured?.explanation,
    structured?.sol,
    expectedSolution.explain,
    question.explain
  );

  const unpackedWhy = unpackStructuredJson(rawWhy);
  if (unpackedWhy) {
    return cleanString(unpackedWhy.why || unpackedWhy.explain || unpackedWhy.sol || "");
  }

  return cleanString(rawWhy);
}

/**
 * Consistent response structure for the diagnostic engine and UI.
 */
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
  stepAnalysis = null,
}) {
  const cleanRemember = cleanString(remember);
  const unpackedRem = unpackStructuredJson(cleanRemember);
  const finalRemember = unpackedRem
    ? cleanString(unpackedRem.why || unpackedRem.explain || unpackedRem.sol || "")
    : cleanRemember;

  return {
    status,
    errorType,
    whatYouDid,
    whyThisIsWrong: toArrayOfStrings(whyThisIsWrong),
    theRightWay: toArrayOfStrings(theRightWay),
    remember: finalRemember,
    evidence: {
      observed: toArrayOfStrings(observed),
      expected: toArrayOfStrings(expected),
      confidence,
    },
    ...(firstError ? { firstError } : {}),
    ...(correction ? { correction } : {}),
    ...(stepAnalysis ? { stepAnalysis } : {}),
  };
}

/**
 * Handles correct answers gracefully.
 */
function diagnoseCorrectAnswer({
  studentAnswer,
  expectedAnswer,
  authoredSteps,
  explanation,
}) {
  return makeDiagnosis({
    status: STATUS.CORRECT,
    whatYouDid: "You applied the correct method and found the correct answer.",
    whyThisIsWrong: [],
    theRightWay: authoredSteps.length > 0
      ? authoredSteps
      : expectedAnswer
        ? [`Final answer: ${expectedAnswer}`]
        : [],
    remember:
      explanation ||
      "Great work! You understood the concept and executed the steps accurately.",
    observed: [studentAnswer || "Submitted answer marked correct."],
    expected: expectedAnswer ? [expectedAnswer] : [],
    confidence: CONFIDENCE.HIGH,
  });
}

/**
 * ────────────────────────────────────────────────────────────────────────────
 * ALGEBRAIC STEP-BY-STEP REASONING DIAGNOSIS & RECONSTRUCTION
 * ────────────────────────────────────────────────────────────────────────────
 * Reconstructs student attempts on linear equations:
 * e.g., 3x - 5 = 16
 * Student working:
 *   3x - 5 = 16
 *   3x = 16 - 5
 *   3x = 11
 *   x = 11/3
 *
 * Produces:
 * 1. What You Did Right (Affirmation)
 * 2. Where Your Working Goes Wrong (Exact step and breakdown)
 * 3. Your Corrected Working (Rebuilt starting from student's work)
 * 4. Change The Way You Approach This (Thinking strategy repair)
 */
function diagnoseAlgebraicSteps({
  studentAnswer,
  userWork,
  questionText,
  expectedAnswer,
  authoredSteps,
  explanation,
}) {
  const qStr = questionText || "";
  // Check for linear equation form: [+-]? Ax [+-] B = C
  const eqRegex = /([+-]?\s*\d*(?:\.\d+)?)\s*([a-zA-Z])\s*([+-])\s*(\d+(?:\.\d+)?)\s*=\s*([+-]?\s*\d+(?:\.\d+)?)/;
  const match = qStr.match(eqRegex) || (userWork && userWork.match(eqRegex));
  if (!match) return null;

  let rawCoeff = match[1].replace(/\s+/g, "");
  let a = 1;
  if (rawCoeff === "" || rawCoeff === "+") a = 1;
  else if (rawCoeff === "-") a = -1;
  else a = Number(rawCoeff);

  const varName = match[2];
  const sign = match[3];
  const bVal = Number(match[4]);
  const cVal = Number(match[5]);

  if (!Number.isFinite(a) || !Number.isFinite(bVal) || !Number.isFinite(cVal) || a === 0) {
    return null;
  }

  // Equation is: a*var [sign] bVal = cVal
  // If sign is '-', equation is a*x - bVal = cVal. To solve: a*x = cVal + bVal
  // If sign is '+', equation is a*x + bVal = cVal. To solve: a*x = cVal - bVal
  const correctConstant = sign === "-" ? cVal + bVal : cVal - bVal;
  const correctFinalVal = correctConstant / a;

  // Student mistake: reversed the operation!
  // e.g. If sign is '-', student did cVal - bVal instead of cVal + bVal
  // e.g. If sign is '+', student did cVal + bVal instead of cVal - bVal
  const flawedConstant = sign === "-" ? cVal - bVal : cVal + bVal;
  const flawedFinalVal = flawedConstant / a;

  const workLines = (userWork || "")
    .split(/\n|;/)
    .map((l) => l.trim())
    .filter(Boolean);

  const parsedAns = parseNumericWithUnit(studentAnswer);
  const studentAnsVal = parsedAns ? parsedAns.value : null;

  // Check if student's answer or working matches the flawed operation
  const studentAnswerMatchesFlawed =
    studentAnsVal !== null && approximatelyEqual(studentAnsVal, flawedFinalVal);

  const workHasFlawedStep = workLines.some((line) => {
    const norm = line.replace(/\s+/g, "");
    const targetFlawed = `${cVal}${sign === "-" ? "-" : "+"}${bVal}`;
    return norm.includes(targetFlawed) || norm.includes(`${flawedConstant}`);
  });

  if (!studentAnswerMatchesFlawed && !workHasFlawedStep) {
    return null;
  }

  const oppositeWord = sign === "-" ? "add" : "subtract";
  const wrongWord = sign === "-" ? "subtract" : "add";

  const whatYouDidRight = [
    `You started with the correct equation and recognised that you need to isolate ${varName}.`,
    ...(a !== 1 ? [`You understood that dividing by ${a} is needed to isolate ${varName}.`] : [])
  ];

  const flawedStepLine = `${a !== 1 ? a : ""}${varName} = ${cVal} ${sign === "-" ? "-" : "+"} ${bVal}`;
  const correctedStepLine = `${a !== 1 ? a : ""}${varName} = ${cVal} ${sign === "-" ? "+" : "-"} ${bVal}`;

  const whereYourWorkingBrokeDown = {
    stepIndex: 2,
    studentStep: flawedStepLine,
    correctedStep: correctedStepLine,
    explanation: `You wrote \`${flawedStepLine}\`. But because the equation contains \`${sign} ${bVal}\`, you need to ${oppositeWord} ${bVal} on both sides to cancel it out, not ${wrongWord} ${bVal}.`
  };

  const correctedWorking = [
    {
      step: `${a !== 1 ? a : ""}${varName} ${sign} ${bVal} = ${cVal}`,
      status: "correct",
      note: "Original equation"
    },
    {
      step: `${a !== 1 ? a : ""}${varName} = ${cVal} ${sign === "-" ? "+" : "-"} ${bVal}`,
      status: "corrected",
      note: `${oppositeWord.charAt(0).toUpperCase() + oppositeWord.slice(1)} ${bVal} to both sides to cancel ${sign}${bVal}`
    },
    {
      step: `${a !== 1 ? a : ""}${varName} = ${correctConstant}`,
      status: "correct",
      note: "Simplify the right-hand side"
    },
    ...(a !== 1
      ? [
          {
            step: `${varName} = ${correctConstant} / ${a}`,
            status: "correct",
            note: `Divide both sides by ${a}`
          },
          {
            step: `${varName} = ${correctFinalVal}`,
            status: "correct",
            note: "Final solution"
          }
        ]
      : [])
  ];

  const thinkingRepair = {
    title: "Change the way you approach this",
    strategy: `Don't think of the ${sign === "-" ? "minus" : "plus"} sign as something to simply move across. Ask yourself: **What operation cancels ${sign}${bVal} while keeping both sides balanced?** ${oppositeWord.charAt(0).toUpperCase() + oppositeWord.slice(1)}ing ${bVal} on both sides removes the ${sign}${bVal} and preserves equality.`
  };

  const stepsToUse =
    authoredSteps.length > 0
      ? authoredSteps
      : correctedWorking.map((w) => w.step);

  return makeDiagnosis({
    status: STATUS.DIAGNOSED,
    errorType: "sign_reversal_in_equation",
    whatYouDid: `You ${wrongWord}ed ${bVal} ${sign === "-" ? "from" : "to"} ${cVal} instead of ${oppositeWord}ing ${bVal} to both sides to cancel ${sign}${bVal}.`,
    whyThisIsWrong: [
      `To maintain equality when rearranging an equation, you must apply the inverse operation to both sides.`,
      `The inverse of \`${sign} ${bVal}\` is \`${sign === "-" ? "+" : "-"} ${bVal}\`.`,
      `Writing \`${flawedStepLine}\` makes the two sides unequal.`
    ],
    theRightWay: stepsToUse,
    remember:
      explanation ||
      `Inverse operations keep equations balanced: undo ${sign}${bVal} by ${oppositeWord}ing ${bVal} on both sides.`,
    observed: [
      `Submitted answer: ${studentAnswer}`,
      workLines.length > 0
        ? `Observed step: ${flawedStepLine}`
        : `Answer matches (${cVal} ${sign === "-" ? "-" : "+"} ${bVal}) ÷ ${a} = ${flawedFinalVal}`
    ],
    expected: [expectedAnswer || `${varName} = ${correctFinalVal}`],
    confidence: CONFIDENCE.HIGH,
    firstError: whereYourWorkingBrokeDown,
    correction: {
      step: correctedStepLine,
      instruction: `${oppositeWord.charAt(0).toUpperCase() + oppositeWord.slice(1)} ${bVal} to both sides.`
    },
    stepAnalysis: {
      whatYouDidRight,
      whereYourWorkingBrokeDown,
      correctedWorking,
      thinkingRepair
    }
  });
}

/**
 * Analyzes questions involving average speed over multiple stages.
 * Checks for known traps:
 * 1. Averaging speeds: ((d1/t1) + (d2/t2)) / 2
 * 2. Single leg speed: (d1/t1) or (d2/t2)
 * 3. Adding distances but dividing by leg count: (d1 + d2) / 2
 * 4. Incomplete calculation: (d1 + d2)
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
  const isAverageSpeedQuestion =
    q.includes("average speed") ||
    (q.includes("speed") && /\b(journey|travels|cyclist|trip|stage|car)\b/.test(q));

  if (!isAverageSpeedQuestion) return null;

  const legRegex =
    /(\d+(?:\.\d+)?)\s*(km|miles?|m)\s*(?:in|for)?\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|hr|h|minutes?|mins?|min|seconds?|secs?|s)\b/gi;

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

  const [leg1, leg2] = legs;
  if (leg1.time <= 0 || leg2.time <= 0) return null;

  const speed1 = leg1.distance / leg1.time;
  const speed2 = leg2.distance / leg2.time;
  const totalDist = leg1.distance + leg2.distance;
  const totalTime = leg1.time + leg2.time;
  const correctSpeed = totalDist / totalTime;
  const speedAverage = (speed1 + speed2) / 2;
  const distOverStages = totalDist / 2;

  const parsedStudent = parseNumericWithUnit(studentAnswer);
  if (!parsedStudent) return null;

  const sVal = parsedStudent.value;
  const workText = normalizeText(userWork);

  const fallbackSteps = [
    `Find the total distance: ${leg1.distance} + ${leg2.distance} = ${totalDist} km.`,
    `Find the total time: ${leg1.time} + ${leg2.time} = ${totalTime} hours.`,
    `Apply the formula: Average speed = Total distance ÷ Total time = ${totalDist} ÷ ${totalTime}.`,
    `Calculate the final answer: ${correctSpeed} km/h.`
  ];
  const stepsToUse = authoredSteps.length > 0 ? authoredSteps : fallbackSteps;

  // 1. SPEED AVERAGING TRAP
  const hasAveragingWork =
    workText.includes(`${speed1} + ${speed2}`) ||
    workText.includes(`${speed1}+${speed2}`) ||
    workText.includes(`(${speed1} + ${speed2})`) ||
    workText.includes(`(${speed1}+${speed2})`) ||
    workText.includes(`${speed1 + speed2}/2`) ||
    workText.includes(`${speed1 + speed2} / 2`) ||
    workText.includes("average of speeds");

  if (approximatelyEqual(sVal, speedAverage) || hasAveragingWork) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "speed_averaging_trap",
      whatYouDid: `You calculated the speed for each part (${speed1} km/h and ${speed2} km/h) and averaged them ((${speed1} + ${speed2}) ÷ 2 = ${speedAverage} km/h), instead of dividing total distance by total time.`,
      whyThisIsWrong: [
        `A simple average of two speeds is only mathematically valid if the vehicle spent the exact same amount of time at each speed.`,
        `Because the journey spent ${leg2.time} hours at ${speed2} km/h and only ${leg1.time} hour at ${speed1} km/h, the lower speed has more weight in the actual journey.`,
        `Average speed is defined as the single constant speed required to cover the whole distance in the same total time: Total Distance ÷ Total Time.`
      ],
      theRightWay: stepsToUse,
      remember: explanation
        ? `${explanation} Remember: Average speed = Total distance ÷ Total time.`
        : "Average speed = Total distance ÷ Total time. Never take the mean of speeds when travel times differ.",
      observed: [
        `Answer: ${studentAnswer}`,
        `Observed value ${sVal} matches ((speed 1: ${speed1}) + (speed 2: ${speed2})) ÷ 2 = ${speedAverage}`
      ],
      expected: [expectedAnswer || `${correctSpeed} km/h`],
      confidence: CONFIDENCE.HIGH,
      stepAnalysis: {
        whatYouDidRight: [
          `You calculated the speeds for the individual legs (${speed1} km/h and ${speed2} km/h).`
        ],
        whereYourWorkingBrokeDown: {
          stepIndex: 2,
          studentStep: `(${speed1} + ${speed2}) / 2 = ${speedAverage} km/h`,
          correctedStep: `Total Distance / Total Time = ${totalDist} / ${totalTime} = ${correctSpeed} km/h`,
          explanation: `Averaging ${speed1} km/h and ${speed2} km/h gives equal weight to both speeds, ignoring the fact that more time (${leg2.time} h) was spent at the lower speed.`
        },
        correctedWorking: [
          { step: `Total distance = ${leg1.distance} + ${leg2.distance} = ${totalDist} km`, status: "correct" },
          { step: `Total time = ${leg1.time} + ${leg2.time} = ${totalTime} hours`, status: "correct" },
          { step: `Average speed = ${totalDist} ÷ ${totalTime} = ${correctSpeed} km/h`, status: "corrected" }
        ],
        thinkingRepair: {
          title: "Change the way you approach average speed",
          strategy: "Average speed is never the average of speeds unless travel times are identical. Always calculate Total Distance ÷ Total Elapsed Time."
        }
      }
    });
  }

  // 2. SINGLE LEG CALCULATION (Leg 1)
  if (approximatelyEqual(sVal, speed1) || workText.includes(`${leg1.distance}/${leg1.time}`)) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "single_leg_calculation",
      whatYouDid: `You calculated the speed for only the first part of the journey (${leg1.distance} km ÷ ${leg1.time} h = ${speed1} km/h) instead of the entire journey.`,
      whyThisIsWrong: [
        `The question asks for the average speed of the whole journey, not just the first stage.`,
        `You must combine all distances and all times before dividing.`
      ],
      theRightWay: stepsToUse,
      remember: "Average speed requires the complete journey: Total Distance ÷ Total Time.",
      observed: [
        `Answer: ${studentAnswer}`,
        `Matches leg 1 speed (${leg1.distance} / ${leg1.time})`
      ],
      expected: [expectedAnswer || `${correctSpeed} km/h`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  // 2. SINGLE LEG CALCULATION (Leg 2)
  if (approximatelyEqual(sVal, speed2) || workText.includes(`${leg2.distance}/${leg2.time}`)) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "single_leg_calculation",
      whatYouDid: `You calculated the speed for only the second part of the journey (${leg2.distance} km ÷ ${leg2.time} h = ${speed2} km/h) instead of the entire journey.`,
      whyThisIsWrong: [
        `The question asks for the average speed of the whole journey.`,
        `Both stages of travel must be accounted for.`
      ],
      theRightWay: stepsToUse,
      remember: "Average speed requires the complete journey: Total Distance ÷ Total Time.",
      observed: [
        `Answer: ${studentAnswer}`,
        `Matches leg 2 speed (${leg2.distance} / ${leg2.time})`
      ],
      expected: [expectedAnswer || `${correctSpeed} km/h`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  // 3. DIVIDED BY STAGE COUNT (d1 + d2) / 2
  if (approximatelyEqual(sVal, distOverStages) && !approximatelyEqual(correctSpeed, distOverStages)) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "divided_by_stage_count",
      whatYouDid: `You added the distances (${leg1.distance} + ${leg2.distance} = ${totalDist} km) but divided by 2 (the number of stages) instead of the total time (${totalTime} hours).`,
      whyThisIsWrong: [
        `Speed is distance divided by time, not distance divided by the number of journey stages.`,
        `The total time spent traveling was ${totalTime} hours (${leg1.time} h + ${leg2.time} h), so you must divide by ${totalTime}.`
      ],
      theRightWay: stepsToUse,
      remember: "Divide total distance by total elapsed time, not by the count of stages.",
      observed: [
        `Answer: ${studentAnswer}`,
        `Matches total distance (${totalDist}) ÷ 2`
      ],
      expected: [expectedAnswer || `${correctSpeed} km/h`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  // 4. INCOMPLETE CALCULATION (Stopped at total distance)
  if (approximatelyEqual(sVal, totalDist)) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "incomplete_journey_calculation",
      whatYouDid: `You calculated the total distance (${leg1.distance} + ${leg2.distance} = ${totalDist} km), but you did not divide by the total time.`,
      whyThisIsWrong: [
        `Finding total distance is only the first step.`,
        `To find speed, you must divide the total distance by the total time taken.`
      ],
      theRightWay: stepsToUse,
      remember: "Speed is a rate of distance per unit time. Don't stop at the total distance.",
      observed: [
        `Answer: ${studentAnswer}`,
        `Matches total distance ${totalDist}`
      ],
      expected: [expectedAnswer || `${correctSpeed} km/h`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  return null;
}

/**
 * Detect a missing unit or a unit mismatch.
 */
function diagnoseUnitErrors({ studentAnswer, expectedAnswer, authoredSteps }) {
  const student = parseNumericWithUnit(studentAnswer);
  const expected = parseNumericWithUnit(expectedAnswer);

  if (!student || !expected) return null;

  if (!approximatelyEqual(student.value, expected.value)) {
    return null;
  }

  // Case A: Missing unit entirely
  if (!student.unit && expected.unit) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "unit_omitted",
      whatYouDid: `You calculated the correct numeric quantity (${student.value}), but you did not specify the unit of measurement.`,
      whyThisIsWrong: [
        `In science and mathematics, a physical quantity is incomplete without its unit.`,
        `Without '${expected.unit}', it is unclear whether your answer represents meters, kilometers per hour, or another measure.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Perform the calculation: result = ${expected.value}.`,
        `Attach the standard unit: ${expected.value} ${expected.unit}.`
      ],
      remember: `Always write the appropriate unit (e.g. ${expected.unit}) alongside your numerical answer.`,
      observed: [`Student value: ${student.value} (unit missing)`],
      expected: [`Expected: ${expectedAnswer}`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  // Case B: Wrong unit
  if (student.unit && expected.unit && student.unit !== expected.unit) {
    return makeDiagnosis({
      status: STATUS.DIAGNOSED,
      errorType: "unit_mismatch",
      whatYouDid: `You calculated the correct number (${student.value}), but used the unit '${student.unit}' instead of '${expected.unit}'.`,
      whyThisIsWrong: [
        `The problem parameters require the answer to be expressed in '${expected.unit}'.`,
        `A value of ${student.value} ${student.unit} is physically different from ${expected.value} ${expected.unit}.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Confirm the question units.`,
        `State the final answer with consistent units: ${expected.value} ${expected.unit}.`
      ],
      remember: `Check that your final unit matches the units of distance and time given in the problem.`,
      observed: [`Observed unit: ${student.unit}`],
      expected: [`Expected unit: ${expected.unit}`],
      confidence: CONFIDENCE.HIGH,
    });
  }

  return null;
}

/**
 * Fallback for unclassified deviations.
 * Never invents unobserved student reasoning.
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
      ? `You provided the answer "${studentAnswer}".`
      : "Working was submitted without a final answer.",
    whyThisIsWrong: [
      expectedAnswer
        ? `The correct answer is ${expectedAnswer}.`
        : "The submitted response did not match what the grader expected.",
      hasWork
        ? "The calculation does not lead to the required result."
        : "Without step-by-step working, the specific arithmetic or procedural deviation cannot be confirmed without guessing."
    ],
    theRightWay: authoredSteps.length > 0
      ? authoredSteps
      : [
          "Read the question carefully to identify the known values.",
          "Apply the standard formula or definition.",
          expectedAnswer ? `Calculate the result: ${expectedAnswer}.` : "Check each step before submitting."
        ],
    remember:
      explanation ||
      "Review the step-by-step method to see where your calculation diverged.",
    observed: [
      ...(studentAnswer ? [`Student answer: ${studentAnswer}`] : []),
      ...(hasWork ? ["Student working was provided for review."] : [])
    ],
    expected: expectedAnswer ? [`Expected answer: ${expectedAnswer}`] : [],
    confidence: CONFIDENCE.LOW,
  });
}

/**
 * Main public entry point.
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
  const expectedAnswer = getExpectedAnswer(question, expectedSolution);
  const authoredSteps = getAuthoredSteps(question, expectedSolution);
  const explanation = getExplanation(question, expectedSolution);

  // 1. Correct Answer
  if (isAnswerCorrect) {
    return diagnoseCorrectAnswer({
      studentAnswer: answer,
      expectedAnswer,
      authoredSteps,
      explanation,
    });
  }

  // 2. Empty Submission
  if (!answer && !work) {
    return makeDiagnosis({
      status: STATUS.INCONCLUSIVE,
      errorType: "no_attempt",
      whatYouDid: "No answer or working was provided.",
      whyThisIsWrong: ["An answer must be submitted to receive credit."],
      theRightWay: authoredSteps.length > 0
        ? authoredSteps
        : [`The expected answer is ${expectedAnswer}.`],
      remember: "Try writing down the values given in the problem first before calculating.",
      observed: [],
      expected: expectedAnswer ? [expectedAnswer] : [],
      confidence: CONFIDENCE.HIGH,
    });
  }

  // 3. Step-by-Step Algebraic Reasoning (Inverse Operations & Sign Flips)
  const algebraDiagnosis = diagnoseAlgebraicSteps({
    studentAnswer: answer,
    userWork: work,
    questionText,
    expectedAnswer,
    authoredSteps,
    explanation,
  });
  if (algebraDiagnosis) return algebraDiagnosis;

  // 4. Domain Diagnostic: Average Speed
  const speedDiagnosis = diagnoseAverageSpeedJourney({
    studentAnswer: answer,
    userWork: work,
    questionText,
    expectedAnswer,
    authoredSteps,
    explanation,
  });
  if (speedDiagnosis) return speedDiagnosis;

  // 5. Unit / Representation Errors
  const unitDiagnosis = diagnoseUnitErrors({
    studentAnswer: answer,
    expectedAnswer,
    authoredSteps,
  });
  if (unitDiagnosis) return unitDiagnosis;

  // 6. Unclassified Fallback
  return genericFallback({
    studentAnswer: answer,
    userWork: work,
    expectedAnswer,
    authoredSteps,
    explanation,
  });
}

export default diagnoseStudentSubmission;
