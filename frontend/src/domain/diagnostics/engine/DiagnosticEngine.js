/**
 * Universal Diagnostic Arbitrator (Phase 3)
 *
 * Implements the universal evidence-first diagnostic pipeline across all subjects.
 * Replaces narrow strategy gate with a 4-level Fallback Ladder:
 * - Level 1: Step reasoning / arithmetic / algebraic breakdown
 * - Level 2: Claims, quantities, concepts & omissions (e.g. Physics distance vs displacement)
 * - Level 3: High-confidence subject misconceptions
 * - Level 4: Final answer divergence
 * - Fallback: Honest INCONCLUSIVE (ambiguous, insufficient evidence, malformed)
 *
 * Enforces hard invariants:
 * 1. No evidence -> no specific diagnosis (Inconclusive stays honest).
 * 2. No diagnosis without traceable evidence (evidenceIds + reason).
 * 3. Diagnosis never happens inside the humanizer.
 * 4. Repair skill === Diagnosed skill === Retest skill.
 * 5. Question.why is authoritative domain knowledge (never overwritten with boilerplate).
 */

import { strategyRegistry } from "./StrategyRegistry.js";
import { StrategySelector } from "./StrategySelector.js";
import { EVIDENCE_STRENGTH } from "../../contracts/CandidateFindingContract.js";
import { buildEvidenceBundle } from "../../../diagnostics/evidence/universalEvidenceExtractor.js";
import { synthesizeHumanResponse } from "../../../diagnostics/response/responseSynthesizer.js";
import {
  createLearningDiagnosis,
  LEARNING_DIAGNOSIS_STATES,
  DIAGNOSIS_CATEGORIES,
} from "../../contracts/LearningDiagnosisContract.js";

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
   * Diagnoses a submission and returns a canonical LearningDiagnosis.
   *
   * @param {Object} params
   * @param {Object} params.submission - CanonicalSubmission or raw submission entity
   * @param {Object} params.question - Active question object
   * @param {Object} params.evaluation - EvaluationResult
   * @returns {Object} Canonical LearningDiagnosis contract
   */
  diagnose({ submission = {}, question = {}, evaluation = null }) {
    const studentAnswer = String(submission.studentAnswer ?? submission.answer ?? "").trim();
    const userWork = String(submission.userWork ?? submission.work ?? "").trim();
    const expectedAnswer = String(
      evaluation?.correctAnswer || question.ans || question.answer || question.correctAnswer || ""
    ).trim();
    const authoredSteps = Array.isArray(question?.steps) ? question.steps : [];
    const smallestSkill = question?.skillId || question?.topic || "general";
    const skillName = question?.topic || "Core Concept";

    // ── PATH 1: CORRECT SUBMISSION ───────────────────────────────────────────
    if (evaluation?.isCorrect) {
      const evidenceBundle = buildEvidenceBundle(submission, question, evaluation);
      const repair = {
        skillId: smallestSkill,
        ruleToRemember: question?.why || (expectedAnswer ? `The standard method gives ${expectedAnswer}.` : ""),
        principle: question?.why || "",
        steps: authoredSteps.length > 0 ? authoredSteps : (expectedAnswer ? [`Calculate: ${expectedAnswer}`] : []),
      };

      const humanResponse = synthesizeHumanResponse({
        state: LEARNING_DIAGNOSIS_STATES.CORRECT,
        evidence: evidenceBundle,
        diagnosis: null,
        repair,
        question,
        skill: { id: smallestSkill, name: skillName },
        expectedAnswer,
      });

      return createLearningDiagnosis({
        state: LEARNING_DIAGNOSIS_STATES.CORRECT,
        subject: question?.subject || question?.subjectId || "general",
        topic: question?.topic || question?.topicId || "general",
        skill: { id: smallestSkill, name: skillName },
        evidence: evidenceBundle,
        diagnosis: null,
        repair: null,
        retest: null,
        response: humanResponse,
        expectedAnswer,
        stepAnalysis: null,
      });
    }

    // ── PATH 2: INCORRECT / UNVERIFIED SUBMISSION ────────────────────────────
    const evidenceBundle = buildEvidenceBundle(submission, question, evaluation);

    // Run registered domain strategies (e.g. Arithmetic, Algebraic, Number Classification)
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

    if (candidates.length > 0) {
      candidates.sort((a, b) => {
        const weightA = (STRENGTH_WEIGHTS[a.evidenceStrength] || 0) + (a.specificity || 0);
        const weightB = (STRENGTH_WEIGHTS[b.evidenceStrength] || 0) + (b.specificity || 0);
        if (weightB !== weightA) return weightB - weightA;
        return (b.confidence || 0) - (a.confidence || 0);
      });
    }
    const winnerCandidate = candidates[0] || null;

    // Build targeted verification probe
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

    const retest = {
      skillId: smallestSkill,
      probe: {
        question: probeQuestion,
        expectedConcept: "operation choice",
        options: expectedAnswer && studentAnswer ? [expectedAnswer, studentAnswer] : [],
        correctAnswer: expectedAnswer,
      },
    };

    // ── 4-LEVEL ARBITRATION LADDER ───────────────────────────────────────────
    let state = LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE;
    let category = DIAGNOSIS_CATEGORIES.INSUFFICIENT_EVIDENCE;
    let brokenAt = "unclassified";
    let explanation = "";
    let evidenceIds = [];
    let reason = { expected: expectedAnswer, observed: studentAnswer, evidenceId: null };
    let stepAnalysis = evidenceBundle?.stepAnalysis || winnerCandidate?.stepAnalysis || null;

    // Check for MALFORMED / GIBBERISH / BLANK first
    if (evidenceBundle.reconciliation === "MALFORMED") {
      state = LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE;
      category = DIAGNOSIS_CATEGORIES.MALFORMED;
      brokenAt = "insufficient_evidence";
      explanation = "Your input does not contain enough recognizable reasoning or mathematical expression to analyze.";
      evidenceIds = evidenceBundle.items.map((i) => i.id);
    } else if (evidenceBundle.reconciliation === "BLANK" || (!studentAnswer && !userWork)) {
      state = LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE;
      category = DIAGNOSIS_CATEGORIES.MALFORMED;
      brokenAt = "blank_submission";
      explanation = "No final answer or working was provided.";
      evidenceIds = [];
    }
    // LEVEL 1: Step reasoning / arithmetic / algebraic breakdown
    else if (
      winnerCandidate &&
      (winnerCandidate.evidenceStrength === EVIDENCE_STRENGTH.DIRECT ||
        winnerCandidate.errorType === "procedural" ||
        winnerCandidate.errorType === "calculation_error" ||
        winnerCandidate.breakPoint?.brokenAt?.includes("slip") ||
        winnerCandidate.breakPoint?.brokenAt?.includes("violation") ||
        evidenceBundle.reconciliation === "STEP_BREAKDOWN")
    ) {
      state = LEARNING_DIAGNOSIS_STATES.DIAGNOSED;
      category = DIAGNOSIS_CATEGORIES.PROCEDURAL_ERROR;
      brokenAt = winnerCandidate?.breakPoint?.brokenAt || stepAnalysis?.whereYourWorkingBrokeDown?.brokenAt || "step_breakdown";
      explanation = winnerCandidate?.whyThisIsWrong?.[0] || winnerCandidate?.breakPoint?.explanation || "Calculation diverged at step.";
      evidenceIds = evidenceBundle.items.filter((i) => i.status === "divergent" || i.status === "verified").map((i) => i.id);
      if (evidenceIds.length === 0 && winnerCandidate?.evidence?.length > 0) {
        evidenceIds = ["ev_step_break"];
      }
      reason = {
        expected: expectedAnswer,
        observed: winnerCandidate?.breakPoint?.explanation || studentAnswer,
        evidenceId: evidenceIds[0] || null,
      };
      if (winnerCandidate?.stepAnalysis) {
        stepAnalysis = winnerCandidate.stepAnalysis;
      }
    }
    // LEVEL 2: Claims, quantities, concepts & omissions (e.g. Physics distance vs displacement)
    else if (
      evidenceBundle.reconciliation === "PARTIAL_REASONING_MISSING_CALC" ||
      (evidenceBundle.verified.length > 0 && evidenceBundle.missing.length > 0)
    ) {
      state = LEARNING_DIAGNOSIS_STATES.DIAGNOSED;
      category = DIAGNOSIS_CATEGORIES.INCOMPLETE_ANSWER;
      const firstMissing = evidenceBundle.missing[0];
      const partKey = firstMissing?.metadata?.partKey || "required_calculation";
      brokenAt = `missing_${partKey}`;
      const verifiedSummary = evidenceBundle.verified.map((i) => i.meaning).join("; ");
      const missingSummary = evidenceBundle.missing.map((i) => i.meaning).join("; ");
      explanation = `${verifiedSummary}. However, ${missingSummary}.`;
      evidenceIds = [...evidenceBundle.verified.map((i) => i.id), ...evidenceBundle.missing.map((i) => i.id)];
      reason = {
        expected: expectedAnswer,
        observed: `Demonstrated: ${verifiedSummary}; Omitted: ${missingSummary}`,
        evidenceId: firstMissing?.id || evidenceIds[0] || null,
      };
    }
    // LEVEL 3: Subject Misconception
    else if (
      evidenceBundle.divergent.length > 0 ||
      (winnerCandidate && winnerCandidate.errorType === "misconception")
    ) {
      state = LEARNING_DIAGNOSIS_STATES.DIAGNOSED;
      category = DIAGNOSIS_CATEGORIES.MISCONCEPTION;
      brokenAt = winnerCandidate?.breakPoint?.brokenAt || evidenceBundle.divergent[0]?.meaning || "misconception";
      explanation = winnerCandidate?.whyThisIsWrong?.[0] || winnerCandidate?.breakPoint?.explanation || evidenceBundle.divergent[0]?.meaning || "Misconception identified.";
      evidenceIds = evidenceBundle.divergent.map((i) => i.id);
      reason = {
        expected: expectedAnswer,
        observed: evidenceBundle.divergent[0]?.text || studentAnswer,
        evidenceId: evidenceIds[0] || null,
      };
    }
    // LEVEL 4: Final Divergence (working correct or absent, final answer simply wrong)
    else if (evidenceBundle.reconciliation === "FINAL_DIVERGENCE") {
      state = LEARNING_DIAGNOSIS_STATES.DIAGNOSED;
      category = DIAGNOSIS_CATEGORIES.INCORRECT_ANSWER;
      brokenAt = "final_answer_divergence";
      explanation = expectedAnswer
        ? `You entered "${studentAnswer}", but the calculation leads to "${expectedAnswer}".`
        : "The final answer diverged from the expected result.";
      evidenceIds = evidenceBundle.items.map((i) => i.id);
      reason = { expected: expectedAnswer, observed: studentAnswer, evidenceId: evidenceIds[0] || null };
    }
    // FALLBACK: INCONCLUSIVE
    else {
      state = LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE;
      const hasWork = Boolean(userWork);
      category = hasWork ? DIAGNOSIS_CATEGORIES.AMBIGUOUS : DIAGNOSIS_CATEGORIES.INSUFFICIENT_EVIDENCE;
      brokenAt = hasWork ? "unclassified_step_divergence" : "result_divergence";
      explanation = hasWork
        ? "The calculation does not lead to the required result."
        : (expectedAnswer
            ? `You entered "${studentAnswer}", but the calculation leads to "${expectedAnswer}".`
            : "The calculation diverged from the expected result.");
      evidenceIds = evidenceBundle.items.map((i) => i.id);
      reason = { expected: expectedAnswer, observed: studentAnswer, evidenceId: evidenceIds[0] || null };
    }

    // ── ASSEMBLE REPAIR CONTRACT ─────────────────────────────────────────────
    const repair = {
      skillId: smallestSkill,
      ruleToRemember: question?.why || winnerCandidate?.remember || (expectedAnswer ? `The standard method gives ${expectedAnswer}.` : ""),
      principle: question?.why || "",
      explanation: explanation,
      steps: authoredSteps.length > 0 ? authoredSteps : (winnerCandidate?.theRightWay || (expectedAnswer ? [`Calculate: ${expectedAnswer}`] : [])),
    };

    // ── SYNTHESIZE HUMAN RESPONSE ────────────────────────────────────────────
    const humanResponse = synthesizeHumanResponse({
      state,
      evidence: evidenceBundle,
      diagnosis: {
        category,
        brokenAt,
        smallestSkill,
        evidenceIds,
        reason,
        misconception: category === DIAGNOSIS_CATEGORIES.MISCONCEPTION ? brokenAt : null,
        confidence: winnerCandidate?.confidence ?? (state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED ? 0.9 : 0.4),
      },
      repair,
      question,
      skill: { id: smallestSkill, name: skillName },
      expectedAnswer,
    });

    // Preserve exact diagnostic explanation when available
    if (explanation && (category === DIAGNOSIS_CATEGORIES.PROCEDURAL_ERROR || brokenAt === "result_divergence")) {
      humanResponse.whyYourThinkingBroke = explanation;
    }

    const diagnosisEntity = {
      category,
      smallestSkill,
      brokenAt,
      evidenceIds,
      reason,
      misconception: category === DIAGNOSIS_CATEGORIES.MISCONCEPTION ? brokenAt : null,
      confidence: winnerCandidate?.confidence ?? (state === LEARNING_DIAGNOSIS_STATES.DIAGNOSED ? 0.9 : 0.4),
      explanation: humanResponse.whyYourThinkingBroke || explanation,
      type: winnerCandidate?.breakPoint?.type || category,
    };

    const result = createLearningDiagnosis({
      state,
      subject: question?.subject || question?.subjectId || "general",
      topic: question?.topic || question?.topicId || "general",
      skill: { id: smallestSkill, name: skillName },
      evidence: evidenceBundle,
      diagnosis: diagnosisEntity,
      repair,
      retest,
      response: humanResponse,
      expectedAnswer,
      stepAnalysis,
    });

    // Populate backward-compatible properties
    result.breakPoint = winnerCandidate?.breakPoint || {
      brokenAt,
      explanation: humanResponse.whyYourThinkingBroke || explanation,
      type: category,
    };
    result.verification = retest.probe;
    result.probe = retest.probe;
    if (winnerCandidate?.whatYouDid) {
      result.whatYouDid = winnerCandidate.whatYouDid;
    }

    return result;
  }
}

export const diagnosticEngine = new DiagnosticEngine();
