/**
 * Number Classification Diagnostic Strategy
 *
 * Inspects conceptual claims about number systems (e.g. "It's a natural number").
 */

import { analyzeNumberClassificationResponse } from "../../../diagnostics/engine/studentReasoningAnalyzer.js";
import { createCandidateFinding, EVIDENCE_STRENGTH } from "../../contracts/CandidateFindingContract.js";

export class NumberClassificationStrategy {
  constructor() {
    this.id = "number_classification";
  }

  isApplicable({ submission, question }) {
    const text = (question?.q || question?.stem || "").toLowerCase();
    const isNumQuestion = text.includes("natural") || text.includes("whole") || text.includes("integer") || text.includes("rational");
    const ansText = String(submission?.answer || "").toLowerCase();
    return isNumQuestion || ansText.includes("natural") || ansText.includes("integer");
  }

  evaluate({ submission, question }) {
    const answer = String(submission?.answer || "").trim();
    const work = String(submission?.work || "").trim();
    const questionText = question?.q || question?.stem || "";
    const expectedAnswer = String(question?.ans || question?.correctAnswer || "");
    const authoredSteps = question?.steps || [];

    const diag = analyzeNumberClassificationResponse({
      studentAnswer: answer,
      userWork: work,
      questionText,
      expectedAnswer,
      authoredSteps,
      isAnswerCorrect: false,
    });

    if (!diag || diag.status !== "diagnosed") {
      return null;
    }

    return createCandidateFinding({
      strategyId: this.id,
      errorType: diag.errorType || "number_system_boundary",
      skillId: question?.skillId || "number_classification",
      confidence: 0.95,
      evidenceStrength: EVIDENCE_STRENGTH.DIRECT,
      specificity: 8,
      evidence: diag.evidence || [{ text: answer, meaning: "Incorrect number system classification claim" }],
      breakPoint: diag.breakPoint || {
        concept: "number_system_boundary",
        explanation: diag.whyThisIsWrong?.[0] || "Diverged on number system definition.",
      },
      repair: diag.repair || null,
      verification: diag.verification || diag.probe || null,
      whatYouDid: diag.whatYouDid || `You classified as ${answer}.`,
      whyThisIsWrong: diag.whyThisIsWrong || [],
      theRightWay: diag.theRightWay || authoredSteps,
      remember: diag.remember || "Natural numbers begin at 1; whole numbers begin at 0.",
    });
  }
}
