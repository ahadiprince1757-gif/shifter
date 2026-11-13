/**
 * Didactic Formatter.
 * Formats evidence-based teacher explanations and step analysis for the UI.
 */

export function formatTeacherFeedback({
  status,
  inputInfo,
  problemInfo,
  stepAnalysis,
  misconception,
  confidence,
  expectedAnswer,
  studentAnswer,
}) {
  let whatYouDid = "";
  let whyThisIsWrong = [];
  let theRightWay = [];
  let remember = "";
  let formattedStepAnalysis = null;

  // Case 1: Unrecognized / Gibberish Input
  if (status === "unrecognized") {
    whatYouDid = `You entered "${inputInfo.raw}".`;
    whyThisIsWrong = [
      "This input could not be interpreted as a mathematical answer or reasoning step.",
      "Please enter a valid number, fraction, or algebraic expression.",
    ];
    theRightWay = problemInfo.steps?.length > 0 ? problemInfo.steps : [`Expected answer: ${expectedAnswer}`];
    remember = "Take your time to write out your calculation or select from the available options.";

    return {
      status: "unrecognized",
      errorType: "unrecognized_input",
      whatYouDid,
      whyThisIsWrong,
      theRightWay,
      remember,
      evidence: { confidence: confidence.level, score: confidence.score },
    };
  }

  // Case 2: Blank Input
  if (status === "blank") {
    whatYouDid = "No answer was submitted.";
    whyThisIsWrong = ["The answer box was left blank."];
    theRightWay = problemInfo.steps?.length > 0 ? problemInfo.steps : [`Expected answer: ${expectedAnswer}`];
    remember = "Attempt each question by calculating or isolating the unknown step-by-step.";

    return {
      status: "blank",
      errorType: "blank_submission",
      whatYouDid,
      whyThisIsWrong,
      theRightWay,
      remember,
      evidence: { confidence: confidence.level, score: confidence.score },
    };
  }

  // Case 3: Step Breakdown (from Step Verification Engine)
  if (stepAnalysis && stepAnalysis.hasError) {
    const err = stepAnalysis.firstError;
    const stepNum = err.stepNumber;

    whatYouDid = `You worked through the problem, but a divergence occurred at Step ${stepNum}.`;
    whyThisIsWrong = [
      err.explanation,
      "Downstream steps were calculated based on this erroneous intermediate value.",
    ];

    // Build Step Analysis for TeacherFeedbackView
    const whatYouDidRight = [];
    const validEarlierSteps = stepAnalysis.evaluatedSteps.filter((s) => s.status === "valid");
    if (validEarlierSteps.length > 0) {
      whatYouDidRight.push(
        `You set up Step 1 correctly: \`${validEarlierSteps[0].raw}\`.`
      );
    }

    const correctedWorking = stepAnalysis.evaluatedSteps.map((s) => {
      if (s.status === "first_error") {
        return {
          step: err.expected || s.raw,
          status: "corrected",
          label: "Corrected Transition",
        };
      }
      return {
        step: s.raw,
        status: s.status === "valid" ? "correct" : "propagated",
        label: s.statusLabel,
      };
    });

    formattedStepAnalysis = {
      whatYouDidRight,
      whereYourWorkingBrokeDown: {
        studentStep: err.raw,
        explanation: err.explanation,
      },
      correctedWorking,
      thinkingRepair: {
        strategy: "Apply inverse operations symmetrically to both sides of the equation.",
        diagnosticPrompt: "What operation cancels the constant term?",
      },
    };

    theRightWay = correctedWorking.map((c) => c.step);
    remember = "To isolate a term, perform the inverse operation to BOTH sides of the equation.";

    return {
      status: "diagnosed",
      errorType: err.errorType,
      firstErrorStep: stepNum,
      whatYouDid,
      whyThisIsWrong,
      theRightWay,
      remember,
      stepAnalysis: formattedStepAnalysis,
      evidence: { confidence: confidence.level, score: confidence.score },
    };
  }

  // Case 4: Misconception Matched (e.g. number classification, BODMAS, fraction addition)
  if (misconception) {
    whatYouDid = misconception.whatYouDid || `You provided: ${studentAnswer}`;
    whyThisIsWrong = Array.isArray(misconception.whyThisIsWrong)
      ? misconception.whyThisIsWrong
      : [misconception.explanation || ""];
    theRightWay = Array.isArray(misconception.theRightWay)
      ? misconception.theRightWay
      : [`Expected answer: ${expectedAnswer}`];
    remember = misconception.remember || misconception.ruleToRemember || "";

    return {
      status: "diagnosed",
      errorType: misconception.errorType,
      concept: misconception.concept,
      whatYouDid,
      whyThisIsWrong,
      theRightWay,
      remember,
      evidence: { confidence: confidence.level, score: confidence.score },
    };
  }

  // Case 5: Correct Answer
  if (status === "correct") {
    return {
      status: "correct",
      errorType: null,
      whatYouDid: `You correctly answered: ${studentAnswer}`,
      whyThisIsWrong: [],
      theRightWay: problemInfo.steps?.length > 0 ? problemInfo.steps : [studentAnswer],
      remember: "Well done! Your reasoning is mathematically sound.",
      evidence: { confidence: "high", score: 1.0 },
    };
  }

  // Case 6: Inconclusive Deviation (Honest fallback without fabricating reasoning)
  whatYouDid = `You provided the answer "${studentAnswer}".`;
  whyThisIsWrong = [
    `The submitted answer does not match the expected result (${expectedAnswer}).`,
    "Without step-by-step working, we cannot reliably determine the exact cause of the mistake.",
  ];
  theRightWay = problemInfo.steps?.length > 0 ? problemInfo.steps : [`The correct answer is ${expectedAnswer}.`];
  remember = "Always show your working step-by-step so each reasoning transition can be verified.";

  return {
    status: "inconclusive",
    errorType: "unclassified_deviation",
    whatYouDid,
    whyThisIsWrong,
    theRightWay,
    remember,
    evidence: { confidence: "low", score: 0.25 },
  };
}
