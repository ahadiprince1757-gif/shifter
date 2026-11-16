
/**
 * Tixar Response Intelligence Layer v1
 *
 * Responsibilities:
 * 1. Interpret verified diagnostic evidence.
 * 2. Build an evidence-backed response plan.
 * 3. Render natural, student-centred feedback.
 *
 * Invariants:
 * - Never invent student reasoning.
 * - Never claim an unverified step was correct.
 * - Never confuse propagated errors with new errors.
 * - Never teach a repair unrelated to the diagnosed skill.
 * - Preserve the existing UI response contract.
 */

const safeArray = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const safeText = (value, fallback = "") =>
  typeof value === "string" && value.trim()
    ? value.trim()
    : fallback;

const getEvidence = (confidence) => ({
  confidence: confidence?.level || "low",
  score: Number.isFinite(confidence?.score)
    ? confidence.score
    : 0,
});

const getSteps = (problemInfo, fallback) => {
  const steps = safeArray(problemInfo?.steps);

  return steps.length
    ? steps
    : [fallback].filter(Boolean);
};

/**
 * Creates a response plan from verified diagnostic information.
 */
function buildResponsePlan({
  status,
  stepAnalysis,
  misconception,
  studentAnswer,
  expectedAnswer,
  problemInfo,
}) {
  // A verified step error takes priority over generic matching.
  if (stepAnalysis?.hasError && stepAnalysis.firstError) {
    const error = stepAnalysis.firstError;

    const validSteps = safeArray(
      stepAnalysis.evaluatedSteps
    ).filter((step) => step.status === "valid");

    return {
      type: "step_error",

      opening: validSteps.length
        ? `Your working was correct up to ${validSteps.length === 1
            ? "this point"
            : `${validSteps.length} steps`}.`
        : "Let's look at where your working changed direction.",

      studentAction: safeText(error.raw),

      breakdown: safeText(
        error.explanation,
        "This step does not follow correctly from the preceding working."
      ),

      correction: safeText(error.expected),

      errorType: error.errorType || "step_error",

      evidence: {
        firstErrorStep: error.stepNumber ?? null,
        verifiedEarlierSteps: validSteps.length,
      },

      repair: safeText(
        error.repairExplanation ||
        misconception?.remember
      ),

      question: safeText(
        error.diagnosticPrompt ||
        misconception?.diagnosticPrompt
      ),

      steps: getSteps(
        problemInfo,
        `Expected answer: ${expectedAnswer}`
      ),

      error,
      validSteps,
    };
  }

  // Only use misconception explanations when the answer
  // has not already been established as correct.
  if (status !== "correct" && misconception) {
    return {
      type: "misconception",

      opening: safeText(
        misconception.whatYouDid,
        `You provided: ${studentAnswer}`
      ),

      breakdown: safeText(
        misconception.explanation,
        safeArray(misconception.whyThisIsWrong)[0]
      ),

      correction: null,

      errorType: misconception.errorType || "misconception",

      evidence: {},

      repair: safeText(
        misconception.remember ||
        misconception.ruleToRemember
      ),

      question: safeText(
        misconception.diagnosticPrompt
      ),

      steps: safeArray(misconception.theRightWay).length
        ? safeArray(misconception.theRightWay)
        : getSteps(
            problemInfo,
            `Expected answer: ${expectedAnswer}`
          ),

      misconception,
    };
  }

  return null;
}

/**
 * Main formatter.
 */
export function formatTeacherFeedback({
  status,
  inputInfo = {},
  problemInfo = {},
  stepAnalysis = null,
  misconception = null,
  confidence = {},
  expectedAnswer = "",
  studentAnswer = "",
}) {
  const evidence = getEvidence(confidence);

  const answer = safeText(
    String(studentAnswer ?? ""),
    ""
  );

  const expected = safeText(
    String(expectedAnswer ?? ""),
    "the expected answer"
  );

  const correctSteps = getSteps(
    problemInfo,
    `Expected answer: ${expected}`
  );

  // CASE 1: BLANK
  if (status === "blank") {
    return {
      status: "blank",
      errorType: "blank_submission",

      whatYouDid:
        "You haven't attempted this question yet.",

      whyThisIsWrong: [
        "There is no answer to evaluate, so we cannot identify a specific reasoning error."
      ],

      theRightWay: correctSteps,

      remember:
        "Start by identifying what the question is asking you to find. Then work through the relevant steps.",

      evidence,

      responsePlan: {
        type: "encourage_attempt",
        nextAction: "attempt_question",
      },
    };
  }

  // CASE 2: UNRECOGNIZED INPUT
  if (status === "unrecognized") {
    const raw = safeText(inputInfo.raw, answer);

    return {
      status: "unrecognized",
      errorType: "unrecognized_input",

      whatYouDid: `You entered "${raw}".`,

      whyThisIsWrong: [
        "I couldn't interpret this as a mathematical answer or working step.",
        "Try writing the number, fraction, equation or calculation more clearly."
      ],

      theRightWay: correctSteps,

      remember:
        "Show your mathematical working in a format that can be checked.",

      evidence,

      responsePlan: {
        type: "input_clarification",
        nextAction: "resubmit_answer",
      },
    };
  }

  // CASE 3: VERIFIED STEP ERROR
  const plan = buildResponsePlan({
    status,
    stepAnalysis,
    misconception,
    studentAnswer: answer,
    expectedAnswer: expected,
    problemInfo,
  });

  if (plan?.type === "step_error") {
    const validEarlierSteps = plan.validSteps;

    const whatYouDidRight = validEarlierSteps.map(
      (step) => `You correctly worked out: ${step.raw}.`
    );

    const correctedWorking = safeArray(
      stepAnalysis.evaluatedSteps
    ).map((step) => {
      if (step.status === "valid") {
        return {
          step: step.raw,
          status: "correct",
          label: "Correct step",
        };
      }

      if (step.status === "first_error") {
        return {
          step: plan.correction || step.expected || step.raw,
          status: "corrected",
          label: "Corrected step",
        };
      }

      return {
        step: step.raw,
        status: "propagated",
        label: "Based on earlier error",
      };
    });

    const breakdown = [
      plan.breakdown,
    ];

    if (plan.correction) {
      breakdown.push(
        `The corrected step is: ${plan.correction}`
      );
    }

    const remember = plan.repair ||
      "Focus on correcting the first step that does not follow from the previous one.";

    return {
      status: "diagnosed",
      errorType: plan.errorType,
      firstErrorStep: plan.evidence.firstErrorStep,

      whatYouDid: plan.opening,

      whyThisIsWrong: breakdown,

      theRightWay: plan.steps,

      remember,

      stepAnalysis: {
        whatYouDidRight,

        whereYourWorkingBrokeDown: {
          studentStep: plan.studentAction,
          explanation: plan.breakdown,
        },

        correctedWorking,

        thinkingRepair: {
          strategy: remember,
          diagnosticPrompt: plan.question,
        },
      },

      evidence: {
        ...evidence,
        ...plan.evidence,
      },

      responsePlan: {
        type: "step_error",
        opening: plan.opening,
        breakdown: plan.breakdown,
        correction: plan.correction,
        repair: remember,
        diagnosticQuestion: plan.question,
      },
    };
  }

  // CASE 4: MATCHED MISCONCEPTION
  if (plan?.type === "misconception") {
    const reasons = safeArray(
      plan.misconception.whyThisIsWrong
    );

    if (!reasons.length && plan.breakdown) {
      reasons.push(plan.breakdown);
    }

    return {
      status: "diagnosed",
      errorType: plan.errorType,
      concept: plan.misconception.concept,

      whatYouDid: plan.opening,

      whyThisIsWrong: reasons,

      theRightWay: plan.steps,

      remember: plan.repair,

      probe: plan.misconception?.probe || null,
      repair: plan.misconception?.repair || null,
      retest: plan.misconception?.retest || null,

      evidence,

      responsePlan: {
        type: "misconception",
        opening: plan.opening,
        breakdown: plan.breakdown,
        repair: plan.repair,
        diagnosticQuestion: plan.question,
      },
    };
  }

  // CASE 5: CORRECT ANSWER
  // This comes before generic misconception matching.
  if (status === "correct") {
    return {
      status: "correct",
      errorType: null,

      whatYouDid:
        `You correctly answered: ${answer}`,

      whyThisIsWrong: [],

      theRightWay: safeArray(problemInfo.steps).length
        ? correctSteps
        : [answer],

      remember:
        "Your answer is correct. Make sure you can explain why your method works, not just reproduce the result.",

      evidence: {
        confidence: "high",
        score: 1,
      },

      responsePlan: {
        type: "correct",
        nextAction: "continue_or_verify_reasoning",
      },
    };
  }

  // CASE 6: INCONCLUSIVE
  return {
    status: "inconclusive",
    errorType: "unclassified_deviation",

    whatYouDid:
      `You provided the answer "${answer}".`,

    whyThisIsWrong: [
      `Your answer does not match the expected result (${expected}).`,
      "I cannot reliably identify the exact reasoning mistake from the available evidence."
    ],

    theRightWay: correctSteps,

    remember:
      "Show your working so that each step can be examined. This helps identify exactly where the reasoning changes.",

    evidence: {
      confidence: "low",
      score: 0.25,
    },

    responsePlan: {
      type: "inconclusive",
      nextAction: "request_working",
    },
  };
}
