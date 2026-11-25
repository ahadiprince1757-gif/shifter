/**
 * Algebraic Equation Diagnostic Strategy
 *
 * Inspects multi-step algebraic manipulation and balances.
 */

import { analyzeStudentSteps } from "../../../diagnostics/analyzers/stepAnalyzer.js";
import { createCandidateFinding, EVIDENCE_STRENGTH } from "../../contracts/CandidateFindingContract.js";

export class AlgebraicEquationStrategy {
  constructor() {
    this.id = "algebraic_equation";
  }

  isApplicable({ work }) {
    return Boolean(work && work.includes("="));
  }

  evaluate({ submission, question }) {
    const work = (submission?.work || "").trim();
    if (!work) return null;

    const questionText = question?.q || question?.stem || question?.text || "";
    const expectedAnswer = String(question?.ans || question?.correctAnswer || "");
    const authoredSteps = question?.steps || [];

    const analysis = analyzeStudentSteps(work, authoredSteps, expectedAnswer, questionText);
    if (!analysis || !analysis.hasError || !analysis.firstError) {
      return null;
    }

    const err = analysis.firstError;
    return createCandidateFinding({
      strategyId: this.id,
      errorType: err.errorType || "algebraic_step_divergence",
      skillId: question?.skillId || "algebraic_manipulation",
      confidence: 0.9,
      evidenceStrength: EVIDENCE_STRENGTH.DIRECT,
      specificity: 8,
      evidence: [{ text: err.raw, meaning: err.explanation }],
      breakPoint: {
        concept: "algebraic_balance",
        errorType: err.errorType || "equation_balance",
        explanation: err.explanation,
      },
      repair: err.repair || null,
      verification: err.verification || null,
      whatYouDid: analysis.whatYouDid || `You wrote \`${err.raw}\`.`,
      whyThisIsWrong: analysis.whyThisIsWrong || [err.explanation],
      theRightWay: analysis.theRightWay || authoredSteps,
      remember: analysis.remember || "Ensure the same operation is applied to both sides of the equation.",
    });
  }
}
