/**
 * Arithmetic Reduction Diagnostic Strategy
 *
 * Inspects multi-line arithmetic working, order of operations (BODMAS),
 * and basic calculation slips.
 */

import { analyzeArithmeticSteps } from "../../../diagnostics/analyzers/arithmeticStepAnalyzer.js";
import { createCandidateFinding, EVIDENCE_STRENGTH } from "../../contracts/CandidateFindingContract.js";

export class ArithmeticReductionStrategy {
  constructor() {
    this.id = "arithmetic_reduction";
  }

  isApplicable({ work }) {
    return Boolean(work && work.trim().length > 0);
  }

  evaluate({ submission, question }) {
    const work = (submission?.work || "").trim();
    if (!work) return null;

    const questionText = question?.q || question?.stem || question?.text || "";
    const expectedAnswer = String(question?.ans || question?.correctAnswer || "");

    const analysis = analyzeArithmeticSteps({
      userWork: work,
      questionText,
      expectedAnswer,
    });

    if (!analysis || !analysis.hasError || !analysis.firstError) {
      return null;
    }

    const err = analysis.firstError;
    const validEarlierSteps = (analysis.evaluatedSteps || []).filter((s) => s.status === "valid");
    const whatYouDidRight = validEarlierSteps.map((s) => `Step ${s.stepNumber} was valid: \`${s.raw}\`.`);

    const correctedWorking = (analysis.theRightWay || []).map((step) => ({
      step,
      status: "corrected",
      note: "Target method",
    }));

    return createCandidateFinding({
      strategyId: this.id,
      errorType: err.errorType || "arithmetic_error",
      skillId: question?.skillId || "arithmetic_calculation",
      confidence: 0.95,
      evidenceStrength: EVIDENCE_STRENGTH.DIRECT,
      specificity: 9,
      evidence: [{ text: err.raw, meaning: err.evidenceMeaning || err.explanation }],
      breakPoint: {
        concept: err.category === "calculation" ? "arithmetic_error" : "order_of_operations",
        errorType: err.errorType,
        brokenAt: err.brokenAt || err.errorType,
        explanation: err.explanation,
      },
      repair: err.repair || analysis.repair,
      verification: err.verification || analysis.verification,
      whatYouDid: analysis.whatYouDid,
      whyThisIsWrong: analysis.whyThisIsWrong,
      theRightWay: analysis.theRightWay,
      remember: analysis.remember,
      stepAnalysis: {
        whatYouDidRight,
        whereYourWorkingBrokeDown: {
          stepIndex: err.stepNumber,
          studentStep: err.raw,
          correctedStep: err.expected,
          explanation: err.explanation,
        },
        correctedWorking,
        thinkingRepair: {
          title: "Check step transitions",
          strategy: analysis.remember,
        },
      },
    });
  }
}
