/**
 * ============================================================================
 * TIXAR DETERMINISTIC TEACHER DIAGNOSTIC ENGINE
 * ============================================================================
 *
 * File: frontend/src/diagnostics/teacherDiagnoser.js
 *
 * Philosophy:
 * "Identify the student's actual mistake, explain why it is wrong,
 * and guide them through correcting that exact mistake."
 *
 * Design Invariants:
 * 1. Evidence Before Explanation:
 *    Never claim the student used a formula unless their answer or working
 *    strictly supports that conclusion.
 * 2. No Invented Working:
 *    Distinguish an observed calculation error from an unverified guess.
 * 3. Separate Error Categories:
 *    Formula errors, misconceptions, omitted units, arithmetic errors,
 *    and unclassified deviations are strictly separated.
 * 4. Graceful Uncertainty:
 *    If the student supplies only a bare final answer with no working,
 *    diagnose only what is mathematically provable. Otherwise return
 *    status: "inconclusive".
 * 5. Curriculum-Aware Correction:
 *    Always prioritize authored steps and insights from the curriculum data.
 *
 * Output Contract:
 * {
 *   status: "diagnosed" | "inconclusive" | "correct",
 *   errorType: string | null,
 *   whatYouDid: string,
 *   whyThisIsWrong: string[],
 *   theRightWay: string[],
 *   remember: string,
 *   evidence: {
 *     observed: string[],
 *     expected: string[],
 *     confidence: "high" | "medium" | "low"
 *   }
 * }
 * ============================================================================
 */

// ============================================================================
// HELPER: NUMERIC & UNIT PARSING
// ============================================================================

/**
 * Extracts numeric value and optional unit from a string.
 * Example: "42.5 km/h" -> { value: 42.5, unit: "km/h", raw: "42.5 km/h" }
 */
export function parseNumericWithUnit(input) {
  if (input === null || input === undefined) return null;
  const str = String(input).trim();
  if (!str) return null;

  // Match number (including decimals and signs) followed by optional unit
  const match = str.match(/^([+-]?\d+(?:\.\d+)?)\s*([a-zA-Z/°%Ωμ]+(?:\^?\d+)?)?$/);
  if (!match) {
    // Try relaxed regex for text like "40km/h" or "approx 40 km/h"
    const relaxed = str.match(/([+-]?\d+(?:\.\d+)?)\s*([a-zA-Z/°%Ωμ]+(?:\^?\d+)?)?/);
    if (!relaxed) return null;
    return {
      value: parseFloat(relaxed[1]),
      unit: relaxed[2] ? relaxed[2].toLowerCase().trim() : null,
      raw: str,
    };
  }

  return {
    value: parseFloat(match[1]),
    unit: match[2] ? match[2].toLowerCase().trim() : null,
    raw: str,
  };
}

/**
 * Extracts all numbers from question text.
 */
export function extractNumbersWithUnits(text) {
  if (!text) return [];
  const regex = /(\d+(?:\.\d+)?)\s*(km\/h|m\/s|km|miles|miles\/h|mph|hours|hour|hrs|hr|h|seconds|second|sec|s|minutes|min|m|kg|g|ohms?|Ω|v|volts?|a|amps?|amperes?)?\b/gi;
  const items = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    items.push({
      value: parseFloat(m[1]),
      unit: m[2] ? m[2].toLowerCase() : null,
      full: m[0],
    });
  }
  return items;
}

// ============================================================================
// DOMAIN DETECTOR: AVERAGE SPEED / MULTI-LEG JOURNEY
// ============================================================================

/**
 * Analyzes questions involving average speed over multiple stages.
 * Checks for known traps:
 * 1. Averaging speeds: ((d1/t1) + (d2/t2)) / 2
 * 2. Single leg speed: (d1/t1) or (d2/t2)
 * 3. Adding distances but dividing by leg count: (d1 + d2) / 2
 * 4. Incomplete calculation: (d1 + d2)
 * 5. Time over distance inverted: totalTime / totalDist
 */
function diagnoseAverageSpeedJourney({
  studentAnswer,
  userWork,
  questionText,
  authoredSteps,
  expectedAns,
  why,
}) {
  const normQ = (questionText || "").toLowerCase();
  const isAverageSpeedQuestion =
    normQ.includes("average speed") ||
    (normQ.includes("speed") && (normQ.includes("journey") || normQ.includes("travels") || normQ.includes("cyclist")));

  if (!isAverageSpeedQuestion) return null;

  // Extract legs from text: e.g. "50 km in 1 hour and 70 km in 2 hours"
  // Look for patterns: <num> km in <num> hour(s)
  const legRegex = /(\d+(?:\.\d+)?)\s*(km|miles|m)\s*(?:in|for)?\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|min|minutes?|seconds?|s)/gi;
  const legs = [];
  let match;
  while ((match = legRegex.exec(questionText)) !== null) {
    legs.push({
      distance: parseFloat(match[1]),
      distUnit: match[2].toLowerCase(),
      time: parseFloat(match[3]),
      timeUnit: match[4].toLowerCase(),
    });
  }

  if (legs.length < 2) return null;

  const leg1 = legs[0];
  const leg2 = legs[1];
  const speed1 = leg1.distance / leg1.time;
  const speed2 = leg2.distance / leg2.time;

  const totalDist = leg1.distance + leg2.distance;
  const totalTime = leg1.time + leg2.time;
  const correctSpeed = totalDist / totalTime;

  const parsedStudent = parseNumericWithUnit(studentAnswer);
  if (!parsedStudent) return null;

  const sVal = parsedStudent.value;
  const sUnit = parsedStudent.unit;
  const workText = String(userWork || "").toLowerCase();

  // Tolerance check
  const isClose = (a, b) => Math.abs(a - b) < 0.01;

  // 1. SPEED AVERAGING TRAP: (speed1 + speed2) / 2
  const speedAverage = (speed1 + speed2) / 2;
  const hasAveragingWork =
    workText.includes(`${speed1} + ${speed2}`) ||
    workText.includes(`${speed1}+${speed2}`) ||
    workText.includes(`(${speed1} + ${speed2})`) ||
    workText.includes(`${speed1 + speed2}/2`) ||
    workText.includes(`${speed1 + speed2} / 2`) ||
    workText.includes("average of speeds");

  if (isClose(sVal, speedAverage) || hasAveragingWork) {
    return {
      status: "diagnosed",
      errorType: "speed_averaging_trap",
      whatYouDid: `You calculated the speed for each part (${speed1} km/h and ${speed2} km/h) and averaged them ((${speed1} + ${speed2}) ÷ 2 = ${speedAverage} km/h), instead of dividing total distance by total time.`,
      whyThisIsWrong: [
        `A simple average of two speeds is only mathematically valid if the vehicle spent the exact same amount of time at each speed.`,
        `Because the journey spent ${leg2.time} hours at ${speed2} km/h and only ${leg1.time} hour at ${speed1} km/h, the lower speed has more weight in the actual journey.`,
        `Average speed is defined as the single constant speed required to cover the whole distance in the same total time: Total Distance ÷ Total Time.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Find the total distance: ${leg1.distance} + ${leg2.distance} = ${totalDist} km.`,
        `Find the total time: ${leg1.time} + ${leg2.time} = ${totalTime} hours.`,
        `Apply the formula: Average speed = Total distance ÷ Total time = ${totalDist} ÷ ${totalTime}.`,
        `Calculate the final answer: ${correctSpeed} km/h.`
      ],
      remember: why
        ? `${why} Remember: Average speed = Total distance ÷ Total time.`
        : "Average speed = Total distance ÷ Total time. Never take the mean of speeds when travel times differ.",
      evidence: {
        observed: [
          `Answer: ${studentAnswer}`,
          `Observed value ${sVal} matches ((speed 1: ${speed1}) + (speed 2: ${speed2})) ÷ 2 = ${speedAverage}`
        ],
        expected: [`${expectedAns || `${correctSpeed} km/h`} (Total distance ${totalDist} ÷ Total time ${totalTime})`],
        confidence: "high"
      }
    };
  }

  // 2. SINGLE LEG CALCULATION (Only calculated leg 1 or leg 2)
  if (isClose(sVal, speed1) || workText.includes(`${leg1.distance}/${leg1.time}`) || workText.includes(`${leg1.distance} / ${leg1.time}`)) {
    return {
      status: "diagnosed",
      errorType: "single_leg_calculation",
      whatYouDid: `You calculated the speed for only the first part of the journey (${leg1.distance} km ÷ ${leg1.time} h = ${speed1} km/h) instead of the entire journey.`,
      whyThisIsWrong: [
        `The question asks for the average speed of the whole journey, not just the first stage.`,
        `You must combine all distances and all times before dividing.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Add both distances: ${leg1.distance} + ${leg2.distance} = ${totalDist} km.`,
        `Add both times: ${leg1.time} + ${leg2.time} = ${totalTime} hours.`,
        `Divide total distance by total time: ${totalDist} ÷ ${totalTime} = ${correctSpeed} km/h.`
      ],
      remember: "Average speed requires the complete journey: Total Distance ÷ Total Time.",
      evidence: {
        observed: [`Answer: ${studentAnswer}`, `Matches leg 1 speed (${leg1.distance} / ${leg1.time})`],
        expected: [`${expectedAns || `${correctSpeed} km/h`}`],
        confidence: "high"
      }
    };
  }

  if (isClose(sVal, speed2) || workText.includes(`${leg2.distance}/${leg2.time}`) || workText.includes(`${leg2.distance} / ${leg2.time}`)) {
    return {
      status: "diagnosed",
      errorType: "single_leg_calculation",
      whatYouDid: `You calculated the speed for only the second part of the journey (${leg2.distance} km ÷ ${leg2.time} h = ${speed2} km/h) instead of the entire journey.`,
      whyThisIsWrong: [
        `The question asks for the average speed of the whole journey.`,
        `Both stages of travel must be accounted for.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Find total distance: ${leg1.distance} + ${leg2.distance} = ${totalDist} km.`,
        `Find total time: ${leg1.time} + ${leg2.time} = ${totalTime} hours.`,
        `Divide: ${totalDist} ÷ ${totalTime} = ${correctSpeed} km/h.`
      ],
      remember: "Average speed requires the complete journey: Total Distance ÷ Total Time.",
      evidence: {
        observed: [`Answer: ${studentAnswer}`, `Matches leg 2 speed (${leg2.distance} / ${leg2.time})`],
        expected: [`${expectedAns || `${correctSpeed} km/h`}`],
        confidence: "high"
      }
    };
  }

  // 3. DIVIDED TOTAL DISTANCE BY NUMBER OF STAGES INSTEAD OF TOTAL TIME: (d1 + d2) / 2
  const distOverStages = totalDist / 2;
  if (isClose(sVal, distOverStages) && !isClose(correctSpeed, distOverStages)) {
    return {
      status: "diagnosed",
      errorType: "divided_by_stage_count",
      whatYouDid: `You added the distances (${leg1.distance} + ${leg2.distance} = ${totalDist} km) but divided by 2 (the number of stages) instead of the total time (${totalTime} hours).`,
      whyThisIsWrong: [
        `Speed is distance divided by time, not distance divided by the number of journey stages.`,
        `The total time spent traveling was ${totalTime} hours (${leg1.time} h + ${leg2.time} h), so you must divide by ${totalTime}.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Total distance = ${leg1.distance} + ${leg2.distance} = ${totalDist} km.`,
        `Total time = ${leg1.time} + ${leg2.time} = ${totalTime} hours.`,
        `Average speed = ${totalDist} ÷ ${totalTime} = ${correctSpeed} km/h.`
      ],
      remember: "Divide total distance by total elapsed time, not by the count of stages.",
      evidence: {
        observed: [`Answer: ${studentAnswer}`, `Matches total distance (${totalDist}) ÷ 2`],
        expected: [`${expectedAns || `${correctSpeed} km/h`}`],
        confidence: "high"
      }
    };
  }

  // 4. INCOMPLETE CALCULATION: Summed distances but didn't divide
  if (isClose(sVal, totalDist)) {
    return {
      status: "diagnosed",
      errorType: "incomplete_journey_calculation",
      whatYouDid: `You calculated the total distance (${leg1.distance} + ${leg2.distance} = ${totalDist} km), but you did not divide by the total time.`,
      whyThisIsWrong: [
        `Finding total distance is only the first step.`,
        `To find speed, you must divide the total distance by the total time taken.`
      ],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [
        `Total distance = ${totalDist} km.`,
        `Total time = ${leg1.time} + ${leg2.time} = ${totalTime} hours.`,
        `Average speed = ${totalDist} ÷ ${totalTime} = ${correctSpeed} km/h.`
      ],
      remember: "Speed is a rate of distance per unit time. Don't stop at the total distance.",
      evidence: {
        observed: [`Answer: ${studentAnswer}`, `Matches total distance ${totalDist}`],
        expected: [`${expectedAns || `${correctSpeed} km/h`}`],
        confidence: "high"
      }
    };
  }

  return null;
}

// ============================================================================
// UNIT & FORMAT ERROR DETECTOR
// ============================================================================

function diagnoseUnitErrors({ studentAnswer, expectedAns, authoredSteps }) {
  const parsedStudent = parseNumericWithUnit(studentAnswer);
  const parsedExpected = parseNumericWithUnit(expectedAns);

  if (!parsedStudent || !parsedExpected) return null;

  // Check if numeric values match closely
  const numericMatches = Math.abs(parsedStudent.value - parsedExpected.value) < 0.01;

  if (numericMatches) {
    // Case A: Missing unit entirely
    if (!parsedStudent.unit && parsedExpected.unit) {
      return {
        status: "diagnosed",
        errorType: "unit_omitted",
        whatYouDid: `You calculated the correct numeric quantity (${parsedStudent.value}), but you did not specify the unit of measurement.`,
        whyThisIsWrong: [
          `In science and mathematics, a physical quantity is incomplete without its unit.`,
          `Without '${parsedExpected.unit}', it is unclear whether your answer represents meters, kilometers per hour, or another measure.`
        ],
        theRightWay: [
          `Perform the calculation: result = ${parsedExpected.value}.`,
          `Attach the standard unit: ${parsedExpected.value} ${parsedExpected.unit}.`
        ],
        remember: `Always write the appropriate unit (e.g. ${parsedExpected.unit}) alongside your numerical answer.`,
        evidence: {
          observed: [`Student value: ${parsedStudent.value} (unit missing)`],
          expected: [`Expected: ${expectedAns}`],
          confidence: "high"
        }
      };
    }

    // Case B: Wrong unit
    if (parsedStudent.unit && parsedExpected.unit && parsedStudent.unit !== parsedExpected.unit) {
      return {
        status: "diagnosed",
        errorType: "unit_mismatch",
        whatYouDid: `You calculated the correct number (${parsedStudent.value}), but used the unit '${parsedStudent.unit}' instead of '${parsedExpected.unit}'.`,
        whyThisIsWrong: [
          `The problem parameters require the answer to be expressed in '${parsedExpected.unit}'.`,
          `A value of ${parsedStudent.value} ${parsedStudent.unit} is physically different from ${parsedExpected.value} ${parsedExpected.unit}.`
        ],
        theRightWay: [
          `Confirm the question units: distance in ${parsedExpected.unit.split('/')[0] || 'km'}, time in ${parsedExpected.unit.split('/')[1] || 'h'}.`,
          `State the final answer with consistent units: ${parsedExpected.value} ${parsedExpected.unit}.`
        ],
        remember: `Check that your final unit matches the units of distance and time given in the problem.`,
        evidence: {
          observed: [`Observed unit: ${parsedStudent.unit}`],
          expected: [`Expected unit: ${parsedExpected.unit}`],
          confidence: "high"
        }
      };
    }
  }

  return null;
}

// ============================================================================
// MAIN DIAGNOSTIC ENGINE: diagnoseStudentSubmission
// ============================================================================

/**
 * Deterministically inspects student work and constructs evidence-based teacher feedback.
 *
 * @param {Object} params
 * @param {string} params.studentAnswer - The raw answer string entered by student
 * @param {string} [params.userWork] - Working/scratchpad steps written by student
 * @param {Object} params.question - The question object from curriculum
 * @param {Object} [params.expectedSolution] - Optional override/authored solution
 * @param {boolean} [params.isAnswerCorrect] - Flag from grader
 * @returns {Object} Consistent teacher diagnosis object
 */
export function diagnoseStudentSubmission({
  studentAnswer,
  userWork = "",
  question = {},
  expectedSolution = {},
  isAnswerCorrect = false,
}) {
  const sAns = String(studentAnswer ?? "").trim();
  const qText = question.q || question.question || "";
  const expectedAns = String(expectedSolution.ans || question.ans || question.answer || "").trim();
  const rawSteps = question.steps || expectedSolution.steps || [];
  const authoredSteps = Array.isArray(rawSteps)
    ? rawSteps.map((s) => String(s).trim())
    : [];
  const why = question.why || expectedSolution.why || "";

  // 1. Correct Answer Check
  if (isAnswerCorrect) {
    return {
      status: "correct",
      errorType: null,
      whatYouDid: "You applied the correct method and found the correct answer.",
      whyThisIsWrong: [],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [`Final answer: ${expectedAns}`],
      remember: why || "Great work! You understood the concept and executed the steps accurately.",
      evidence: {
        observed: [sAns],
        expected: [expectedAns],
        confidence: "high",
      },
    };
  }

  // 2. Empty Submission Check
  if (!sAns && !userWork.trim()) {
    return {
      status: "inconclusive",
      errorType: "no_attempt",
      whatYouDid: "No answer or working was provided.",
      whyThisIsWrong: ["An answer must be submitted to receive credit."],
      theRightWay: authoredSteps.length > 0 ? authoredSteps : [`The expected answer is ${expectedAns}.`],
      remember: "Try writing down the values given in the problem first before calculating.",
      evidence: {
        observed: [],
        expected: [expectedAns],
        confidence: "high",
      },
    };
  }

  // 3. Average Speed Domain Diagnostic
  const speedDiagnosis = diagnoseAverageSpeedJourney({
    studentAnswer: sAns,
    userWork,
    questionText: qText,
    authoredSteps,
    expectedAns,
    why,
  });
  if (speedDiagnosis) {
    return speedDiagnosis;
  }

  // 4. Unit / Representation Errors
  const unitDiagnosis = diagnoseUnitErrors({
    studentAnswer: sAns,
    expectedAns,
    authoredSteps,
  });
  if (unitDiagnosis) {
    return unitDiagnosis;
  }

  // 5. Inconclusive Graceful Fallback
  // If no deterministic pattern uniquely accounts for the answer, return INCONCLUSIVE.
  // Never fabricate or guess unobserved student thoughts!
  return {
    status: "inconclusive",
    errorType: "unclassified_deviation",
    whatYouDid: `You provided the answer "${sAns}".`,
    whyThisIsWrong: [
      `The correct answer is ${expectedAns}.`,
      userWork.trim()
        ? `The calculation does not lead to the required result.`
        : `Without step-by-step working, the specific arithmetic or procedural deviation cannot be confirmed without guessing.`
    ],
    theRightWay: authoredSteps.length > 0
      ? authoredSteps
      : [
          `Read the question carefully to identify the known values.`,
          `Apply the standard formula or definition.`,
          `Calculate the result: ${expectedAns}.`
        ],
    remember: why || "Review the step-by-step method to see where your calculation diverged.",
    evidence: {
      observed: [`Student answer: ${sAns}`],
      expected: [`Expected answer: ${expectedAns}`],
      confidence: "low",
    },
  };
}
