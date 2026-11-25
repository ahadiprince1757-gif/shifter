/**
 * Diagnostic Engine
 *
 * Implements direct-evidence arbitration over candidate diagnostic findings.
 * Does NOT rely on ungrounded confidence scores.
 * Priority: DIRECT > DERIVED > INFERRED, then Specificity.
 */

import { strategyRegistry } from "./StrategyRegistry.js";
import { StrategySelector } from "./StrategySelector.js";
import { EVIDENCE_STRENGTH } from "../../contracts/CandidateFindingContract.js";

const STRENGTH_WEIGHTS = Object.freeze({
  [EVIDENCE_STRENGTH.DIRECT]: 300,
  [EVIDENCE_STRENGTH.DERIVED]: 200,
  [EVIDENCE_STRENGTH.INFERRED]: 100,
});

export class DiagnosticEngine {
  constructor(registry = strategyRegistry) {
    this.registry = registry;
    this.selector = new StrategySelector(this.registry);
  }

  /**
   * Diagnoses a submission and returns the winning finding or an honest INCONCLUSIVE result.
   *
   * @param {Object} submission - SubmissionEntity
   * @param {Object} question - Question metadata
   * @param {Object} evaluation - EvaluationResult
   * @returns {Object} Canonical structured diagnosis
   */
  diagnose({ submission, question, evaluation }) {
    if (evaluation?.isCorrect) {
      const authoredSteps = question?.steps || [];
      const expectedAnswer = question?.ans || question?.correctAnswer || submission?.answer || "";

      return {
        status: "correct",
        correctness: "correct",
        studentAnswer: submission.answer,
        userWork: submission.work,
        theRightWay: authoredSteps.length > 0 ? authoredSteps : (expectedAnswer ? [`Calculate: ${expectedAnswer}`] : []),
        remember: question?.why || question?.explanation || (expectedAnswer ? `The standard method gives ${expectedAnswer}.` : ""),
        whatYouDid: "Your reasoning and calculation correctly follow the standard method.",
        evidence: [],
        diagnosis: null,
        repair: null,
        verification: null,
      };
    }

    const eligibleStrategies = this.selector.selectStrategies(submission, question);
    const candidates = [];

    for (const strategy of eligibleStrategies) {
      try {
        const candidate = strategy.evaluate({ submission, question, evaluation });
        if (candidate) {
          candidates.push(candidate);
        }
      } catch (err) {
        console.warn(`[DiagnosticEngine] Strategy '${strategy.id}' evaluation error:`, err);
      }
    }

    if (candidates.length === 0) {
      return this._createInconclusiveDiagnosis(submission, question);
    }

    // Arbitrate candidates
    candidates.sort((a, b) => {
      const weightA = (STRENGTH_WEIGHTS[a.evidenceStrength] || 0) + (a.specificity || 0);
      const weightB = (STRENGTH_WEIGHTS[b.evidenceStrength] || 0) + (b.specificity || 0);
      if (weightB !== weightA) {
        return weightB - weightA;
      }
      return (b.confidence || 0) - (a.confidence || 0);
    });

    const winner = candidates[0];
    return {
      status: "diagnosed",
      correctness: "incorrect",
      studentAnswer: submission.answer,
      userWork: submission.work,
      evidence: winner.evidence,
      diagnosis: winner.breakPoint,
      breakPoint: winner.breakPoint,
      repair: winner.repair,
      verification: winner.verification,
      probe: winner.verification,
      errorType: winner.errorType,
      whatYouDid: winner.whatYouDid,
      whyThisIsWrong: winner.whyThisIsWrong,
      theRightWay: winner.theRightWay,
      remember: winner.remember,
      stepAnalysis: winner.stepAnalysis,
      confidence: winner.confidence >= 0.8 ? "high" : "medium",
    };
  }

  _createInconclusiveDiagnosis(submission, question) {
    const hasWork = Boolean((submission?.work || "").trim());
    const studentAnswer = submission?.answer || "";
    const expectedAnswer = question?.ans || question?.correctAnswer || "";
    const authoredSteps = question?.steps || [];

    // Format verification question naturally without "Calculate: Is ... = ?"
    let probeQuestion = "Which formula or operation did you use to get your answer?";
    if (expectedAnswer) {
      const qText = (question?.q || "").trim();
      if (/^(is|are|which|what|can|how|why|does|do)\b/i.test(qText) || qText.endsWith("?")) {
        probeQuestion = qText;
      } else {
        const cleanExp = qText.replace(/^solve:?\s*/i, "").trim();
        probeQuestion = cleanExp ? `Calculate: ${cleanExp} = ?` : `Calculate: What is ${expectedAnswer}?`;
      }
    }

    const whyThisIsWrong = [];
    if (hasWork) {
      whyThisIsWrong.push("The calculation does not lead to the required result.");
    } else if (expectedAnswer) {
      whyThisIsWrong.push(`You entered "${studentAnswer}", but the calculation leads to "${expectedAnswer}".`);
    } else {
      whyThisIsWrong.push("The calculation diverged from the expected result.");
    }

    return {
      status: "inconclusive",
      correctness: "incorrect",
      studentAnswer,
      userWork: submission?.work || "",
      evidence: hasWork ? [{ text: submission.work, meaning: "Submitted working was unclassified" }] : [],
      diagnosis: {
        type: "unclassified",
        brokenAt: hasWork ? "unclassified_step_divergence" : "result_divergence",
        explanation: hasWork
          ? "The calculation does not lead to the required result."
          : (expectedAnswer
              ? `You entered "${studentAnswer}", but the calculation leads to "${expectedAnswer}".`
              : "The calculation diverged from the expected result."),
      },
      errorType: "inconclusive_reasoning",
      whatYouDid: studentAnswer ? `You entered "${studentAnswer}".` : "No final answer was provided.",
      whyThisIsWrong,
      theRightWay: authoredSteps.length > 0 ? authoredSteps : (expectedAnswer ? [`Calculate: ${expectedAnswer}`] : []),
      remember: expectedAnswer
        ? `Double check your calculation: the expected result is ${expectedAnswer}.`
        : "Review the step-by-step method to see where your calculation diverged.",
      probe: {
        question: probeQuestion,
        expectedConcept: "operation choice",
        options: expectedAnswer && studentAnswer ? [expectedAnswer, studentAnswer] : [],
        correctAnswer: expectedAnswer,
      },
      confidence: "low",
    };
  }
}

export const diagnosticEngine = new DiagnosticEngine();
