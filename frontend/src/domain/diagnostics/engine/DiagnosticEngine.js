/**
 * Universal Diagnostic Arbitrator (Phase 3 — Candidate Arbitration Architecture)
 *
 * Flow:
 * Submission -> EvidenceBundle (Phase 2) -> CandidateFindings[] -> Arbitrator -> LearningDiagnosis
 *
 * Hierarchy of defensible findings:
 * - Level 0: Evidence validity (blank / malformed / insufficient)
 * - Level 1: Direct reasoning failure (first divergent step, equation violation, calculation/unit error)
 * - Level 2: Explicit conceptual contradiction / misconception (wrong claim/relationship, negated concept)
 * - Level 3: Required evidence omission (missing required component)
 * - Level 4: Final-answer divergence (working reached right value, final answer differs)
 * - Fallback: Honest INCONCLUSIVE (never invents unseen steps or generic misconceptions)
 */

import { strategyRegistry } from "./StrategyRegistry.js";
import { StrategySelector } from "./StrategySelector.js";
import { EVIDENCE_STRENGTH } from "../../contracts/CandidateFindingContract.js";
import { EVIDENCE_STATUS, EVIDENCE_TYPES } from "../../contracts/EvidenceBundleContract.js";
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

function assertSameSkill({ diagnosedSkillId, repairSkillId, retestSkillId }) {
  if (diagnosedSkillId !== repairSkillId || repairSkillId !== retestSkillId) {
    throw new Error(
      `[DiagnosticEngine] Skill invariant violated: diagnosed='${diagnosedSkillId}', repair='${repairSkillId}', retest='${retestSkillId}'`
    );
  }
}

function calculateDiagnosticConfidence({ evidenceIds, evidenceBundle, specificity = 0.5, competingCount = 0 }) {
  const matchedItems = evidenceBundle.items.filter((i) => evidenceIds.includes(i.id));
  const avgEvidenceConf =
    matchedItems.length > 0
      ? matchedItems.reduce((sum, i) => sum + (i.confidence || 0.5), 0) / matchedItems.length
      : 0.45;
  const competitionPenalty = Math.min(0.2, Math.max(0, competingCount - 1) * 0.06);
  const score = avgEvidenceConf * 0.7 + specificity * 0.3 - competitionPenalty;
  return Number(Math.max(0.15, Math.min(0.98, score)).toFixed(2));
}

function scoreCandidate(candidate, evidenceBundle) {
  const strength = STRENGTH_WEIGHTS[candidate.evidenceStrength] || 100;
  const specificity = (candidate.specificity || 0.5) * 100;
  const coverage = Math.min(30, (candidate.evidenceIds?.length || 0) * 10);
  const levelPriority = Math.max(0, (5 - (candidate.level || 4)) * 40);
  const ambiguityPenalty = candidate.evidenceIds?.some((id) =>
    evidenceBundle.ambiguous?.some((a) => a.id === id)
  )
    ? 40
    : 0;

  return strength + specificity + coverage + levelPriority - ambiguityPenalty;
}

export class DiagnosticEngine {
  constructor(registry = strategyRegistry) {
    this.registry = registry;
    this.selector = new StrategySelector(this.registry);
  }

  diagnose({ submission = {}, question = {}, evaluation = null }) {
    const studentAnswer = String(submission.studentAnswer ?? submission.answer ?? "").trim();
    const userWork = String(submission.userWork ?? submission.work ?? "").trim();
    const expectedAnswer = String(
      evaluation?.correctAnswer || question.ans || question.answer || question.correctAnswer || ""
    ).trim();
    const authoredSteps = Array.isArray(question?.steps) ? question.steps : [];

    const evidenceBundle = buildEvidenceBundle(submission, question, evaluation);
    const qc = evidenceBundle.questionContract;
    const smallestSkill = qc?.skillId || question?.skillId || question?.topic || "general";
    const skillName = qc?.skillName || question?.topic || "Core Concept";

    // ── PATH 1: CORRECT SUBMISSION ───────────────────────────────────────────
    if (evaluation?.isCorrect) {
      const hasEvidenceConfirmation =
        evidenceBundle.verified.length > 0 || (evidenceBundle.supported?.length || 0) > 0;

      const humanResponse = synthesizeHumanResponse({
        state: LEARNING_DIAGNOSIS_STATES.CORRECT,
        evidence: evidenceBundle,
        diagnosis: null,
        repair: null,
        question,
        skill: { id: smallestSkill, name: skillName },
        expectedAnswer,
      });

      const diag = createLearningDiagnosis({
        state: LEARNING_DIAGNOSIS_STATES.CORRECT,
        subject: qc?.subject || question?.subject || "general",
        topic: qc?.topic || question?.topic || "general",
        skill: { id: smallestSkill, name: skillName },
        evidence: evidenceBundle,
        diagnosis: null,
        repair: null,
        retest: null,
        response: humanResponse,
        expectedAnswer,
        stepAnalysis: null,
      });
      diag.correctnessSource = hasEvidenceConfirmation
        ? "EVIDENCE_CONFIRMED_CORRECT"
        : "EVALUATOR_CORRECT";
      return diag;
    }

    // ── LEVEL 0: EVIDENCE VALIDITY GUARD (BLANK / MALFORMED) ─────────────────
    if (evidenceBundle.reconciliation === "MALFORMED") {
      return this._buildInconclusiveResult({
        evidenceBundle,
        question,
        qc,
        smallestSkill,
        skillName,
        expectedAnswer,
        studentAnswer,
        authoredSteps,
        category: DIAGNOSIS_CATEGORIES.MALFORMED,
        brokenAt: "insufficient_evidence",
        explanation:
          "Your input does not contain enough recognizable reasoning or mathematical expression to analyze.",
        evidenceIds: evidenceBundle.items.map((i) => i.id),
      });
    }

    if (evidenceBundle.reconciliation === "BLANK" || (!studentAnswer && !userWork)) {
      return this._buildInconclusiveResult({
        evidenceBundle,
        question,
        qc,
        smallestSkill,
        skillName,
        expectedAnswer,
        studentAnswer,
        authoredSteps,
        category: DIAGNOSIS_CATEGORIES.MALFORMED,
        brokenAt: "blank_submission",
        explanation: "No final answer or working was provided.",
        evidenceIds: [],
      });
    }

    // ── GENERATE CANDIDATE FINDINGS ──────────────────────────────────────────
    const strategyCandidates = [];
    for (const strategy of this.selector.selectStrategies(submission, question)) {
      try {
        const candidate = strategy.evaluate({ submission, question, evaluation });
        if (candidate) strategyCandidates.push(candidate);
      } catch (err) {
        console.warn(`[DiagnosticEngine] Strategy '${strategy.id}' error:`, err);
      }
    }
    strategyCandidates.sort((a, b) => {
      const wA = (STRENGTH_WEIGHTS[a.evidenceStrength] || 0) + (a.specificity || 0);
      const wB = (STRENGTH_WEIGHTS[b.evidenceStrength] || 0) + (b.specificity || 0);
      return wB !== wA ? wB - wA : (b.confidence || 0) - (a.confidence || 0);
    });
    const winnerStrategy = strategyCandidates[0] || null;

    const candidates = [
      this._buildStepOrUnitCandidate(evidenceBundle, winnerStrategy, expectedAnswer, studentAnswer),
      this._buildMisconceptionCandidate(evidenceBundle, winnerStrategy, expectedAnswer, studentAnswer),
      this._buildOmissionCandidate(evidenceBundle, expectedAnswer),
      this._buildFinalDivergenceCandidate(evidenceBundle, expectedAnswer, studentAnswer),
    ].filter(Boolean);

    // ── ARBITRATE CANDIDATES ─────────────────────────────────────────────────
    if (candidates.length === 0) {
      const hasWork = Boolean(userWork);
      return this._buildInconclusiveResult({
        evidenceBundle,
        question,
        qc,
        smallestSkill,
        skillName,
        expectedAnswer,
        studentAnswer,
        authoredSteps,
        category: hasWork ? DIAGNOSIS_CATEGORIES.AMBIGUOUS : DIAGNOSIS_CATEGORIES.INSUFFICIENT_EVIDENCE,
        brokenAt: hasWork ? "unclassified_step_divergence" : "result_divergence",
        explanation: hasWork
          ? "Your working did not reach the expected result, and the exact divergence could not be isolated."
          : expectedAnswer
          ? `You entered "${studentAnswer}", but the expected method leads to "${expectedAnswer}".`
          : "Your answer diverged from the expected result.",
        evidenceIds: evidenceBundle.items.map((i) => i.id),
      });
    }

    candidates.sort((a, b) => scoreCandidate(b, evidenceBundle) - scoreCandidate(a, evidenceBundle));
    const winner = candidates[0];

    const confidence = calculateDiagnosticConfidence({
      evidenceIds: winner.evidenceIds,
      evidenceBundle,
      specificity: winner.specificity,
      competingCount: candidates.length,
    });

    const repair = {
      skillId: smallestSkill,
      ruleToRemember: question?.why || winnerStrategy?.remember || "",
      principle: question?.why || "",
      explanation: winner.explanation,
      steps: authoredSteps.length > 0 ? authoredSteps : winnerStrategy?.theRightWay || [],
    };

    const retest = {
      skillId: smallestSkill,
      probe: {
        question: question?.q || `Apply ${skillName} to a fresh problem.`,
        expectedConcept: qc?.targetConcept || skillName,
        options: [], // Never leak [expectedAnswer, studentAnswer]
        correctAnswer: null,
      },
    };

    assertSameSkill({
      diagnosedSkillId: smallestSkill,
      repairSkillId: repair.skillId,
      retestSkillId: retest.skillId,
    });

    const humanResponse = synthesizeHumanResponse({
      state: LEARNING_DIAGNOSIS_STATES.DIAGNOSED,
      evidence: evidenceBundle,
      diagnosis: {
        category: winner.category,
        brokenAt: winner.brokenAt,
        smallestSkill,
        evidenceIds: winner.evidenceIds,
        reason: winner.reason,
        misconception: winner.category === DIAGNOSIS_CATEGORIES.MISCONCEPTION ? winner.brokenAt : null,
        confidence,
      },
      repair,
      question,
      skill: { id: smallestSkill, name: skillName },
      expectedAnswer,
    });

    if (winner.preserveExactExplanation && winner.explanation) {
      humanResponse.whyYourThinkingBroke = winner.explanation;
    }

    const result = createLearningDiagnosis({
      state: LEARNING_DIAGNOSIS_STATES.DIAGNOSED,
      subject: qc?.subject || question?.subject || "general",
      topic: qc?.topic || question?.topic || "general",
      skill: { id: smallestSkill, name: skillName },
      evidence: evidenceBundle,
      diagnosis: {
        category: winner.category,
        smallestSkill,
        brokenAt: winner.brokenAt,
        evidenceIds: winner.evidenceIds,
        reason: winner.reason,
        misconception: winner.category === DIAGNOSIS_CATEGORIES.MISCONCEPTION ? winner.brokenAt : null,
        confidence,
        explanation: humanResponse.whyYourThinkingBroke || winner.explanation,
        type: winner.breakPoint?.type || winner.category,
      },
      repair,
      retest,
      response: humanResponse,
      expectedAnswer,
      stepAnalysis: winner.stepAnalysis || evidenceBundle.stepAnalysis || null,
    });

    result.breakPoint = winner.breakPoint || {
      brokenAt: winner.brokenAt,
      explanation: humanResponse.whyYourThinkingBroke || winner.explanation,
      type: winner.category,
    };
    result.verification = retest.probe;
    result.probe = retest.probe;
    if (winnerStrategy?.whatYouDid) {
      result.whatYouDid = winnerStrategy.whatYouDid;
    }

    return result;
  }

  // ── CANDIDATE BUILDERS ─────────────────────────────────────────────────────

  _buildStepOrUnitCandidate(evidenceBundle, winnerStrategy, expectedAnswer, studentAnswer) {
    const stepBroken =
      winnerStrategy &&
      (winnerStrategy.evidenceStrength === EVIDENCE_STRENGTH.DIRECT ||
        winnerStrategy.errorType === "procedural" ||
        winnerStrategy.errorType === "calculation_error" ||
        winnerStrategy.breakPoint?.brokenAt?.includes("slip") ||
        winnerStrategy.breakPoint?.brokenAt?.includes("violation"));

    const isStepOrUnit =
      stepBroken ||
      evidenceBundle.reconciliation === "STEP_BREAKDOWN" ||
      evidenceBundle.reconciliation === "FIRST_STEP_ERROR" ||
      evidenceBundle.reconciliation === "UNIT_ERROR";

    if (!isStepOrUnit) return null;

    const unitItems = evidenceBundle.divergent.filter((i) => i.type === EVIDENCE_TYPES.UNIT);
    const stepItems = evidenceBundle.items.filter(
      (i) => i.status === EVIDENCE_STATUS.DIVERGENT || i.status === EVIDENCE_STATUS.VERIFIED
    );
    let evidenceIds = (unitItems.length > 0 ? unitItems : stepItems).map((i) => i.id);
    if (evidenceIds.length === 0 && evidenceBundle.items.length > 0) {
      evidenceIds = [evidenceBundle.items[0].id];
    }

    const brokenAt =
      winnerStrategy?.breakPoint?.brokenAt ||
      evidenceBundle.stepAnalysis?.whereYourWorkingBrokeDown?.brokenAt ||
      (unitItems.length > 0 ? "unit_mismatch" : "step_breakdown");

    const explanation =
      winnerStrategy?.whyThisIsWrong?.[0] ||
      winnerStrategy?.breakPoint?.explanation ||
      unitItems[0]?.meaning ||
      evidenceBundle.stepAnalysis?.whereYourWorkingBrokeDown?.explanation ||
      "Calculation diverged at step.";

    return {
      level: 1,
      category: DIAGNOSIS_CATEGORIES.PROCEDURAL_ERROR,
      evidenceStrength: EVIDENCE_STRENGTH.DIRECT,
      specificity: 0.92,
      brokenAt,
      explanation,
      preserveExactExplanation: true,
      evidenceIds,
      reason: { expected: expectedAnswer, observed: explanation || studentAnswer, evidenceId: evidenceIds[0] || null },
      stepAnalysis: winnerStrategy?.stepAnalysis || evidenceBundle.stepAnalysis,
      breakPoint: winnerStrategy?.breakPoint || null,
    };
  }

  _buildMisconceptionCandidate(evidenceBundle, winnerStrategy, expectedAnswer, studentAnswer) {
    // Explicitly EXCLUDE final_answer and unit items so Level 2 never collides with Level 1 or Level 4
    const conceptualDivergent = evidenceBundle.divergent.filter(
      (i) =>
        i.type !== EVIDENCE_TYPES.FINAL_ANSWER &&
        i.type !== EVIDENCE_TYPES.UNIT &&
        i.metadata?.errorType !== "final_answer_error" &&
        (i.type !== EVIDENCE_TYPES.QUANTITY || Boolean(i.subPart))
    );

    const hasStrategyMisconception = winnerStrategy && winnerStrategy.errorType === "misconception";
    if (conceptualDivergent.length === 0 && !hasStrategyMisconception) return null;

    const evidenceIds = conceptualDivergent.map((i) => i.id);
    const brokenAt =
      winnerStrategy?.breakPoint?.brokenAt ||
      conceptualDivergent[0]?.metadata?.misconceptionId ||
      (conceptualDivergent[0]?.type === EVIDENCE_TYPES.CONTRADICTION ? "conceptual_contradiction" : "misconception");

    const explanation =
      winnerStrategy?.whyThisIsWrong?.[0] ||
      winnerStrategy?.breakPoint?.explanation ||
      conceptualDivergent[0]?.meaning ||
      "Conceptual contradiction detected.";

    return {
      level: 2,
      category: DIAGNOSIS_CATEGORIES.MISCONCEPTION,
      evidenceStrength:
        conceptualDivergent[0]?.provenance === "DERIVED"
          ? EVIDENCE_STRENGTH.DERIVED
          : EVIDENCE_STRENGTH.INFERRED,
      specificity: 0.85,
      brokenAt,
      explanation,
      preserveExactExplanation: true,
      evidenceIds,
      reason: {
        expected: expectedAnswer,
        observed: conceptualDivergent[0]?.text || studentAnswer,
        evidenceId: evidenceIds[0] || null,
      },
      breakPoint: winnerStrategy?.breakPoint || null,
    };
  }

  _buildOmissionCandidate(evidenceBundle, expectedAnswer) {
    const positiveEvidence = [
      ...evidenceBundle.verified,
      ...(evidenceBundle.supported || []),
    ];
    if (
      evidenceBundle.reconciliation !== "PARTIAL_REASONING_MISSING_CALC" &&
      !(positiveEvidence.length > 0 && evidenceBundle.missing.length > 0)
    ) {
      return null;
    }

    const firstMissing = evidenceBundle.missing[0];
    const partKey = firstMissing?.metadata?.partKey || "required_calculation";
    const verifiedSummary = positiveEvidence.map((i) => i.meaning).join("; ");
    const missingSummary = evidenceBundle.missing.map((i) => i.meaning).join("; ");
    const evidenceIds = [
      ...positiveEvidence.map((i) => i.id),
      ...evidenceBundle.missing.map((i) => i.id),
    ];

    return {
      level: 3,
      category: DIAGNOSIS_CATEGORIES.INCOMPLETE_ANSWER,
      evidenceStrength: EVIDENCE_STRENGTH.DERIVED,
      specificity: 0.8,
      brokenAt: `missing_${partKey}`,
      explanation: `${verifiedSummary}. However, ${missingSummary}.`,
      preserveExactExplanation: false, // Let humanizer craft natural phrasing
      evidenceIds,
      reason: {
        expected: expectedAnswer,
        observed: `Demonstrated: ${verifiedSummary}; Omitted: ${missingSummary}`,
        evidenceId: firstMissing?.id || evidenceIds[0] || null,
      },
    };
  }

  _buildFinalDivergenceCandidate(evidenceBundle, expectedAnswer, studentAnswer) {
    if (
      evidenceBundle.reconciliation !== "FINAL_DIVERGENCE" &&
      evidenceBundle.reconciliation !== "WORKING_CORRECT_FINAL_WRONG"
    ) {
      return null;
    }

    const evidenceIds = evidenceBundle.items.map((i) => i.id);
    return {
      level: 4,
      category: DIAGNOSIS_CATEGORIES.INCORRECT_ANSWER,
      evidenceStrength: EVIDENCE_STRENGTH.DERIVED,
      specificity: 0.7,
      brokenAt: "final_answer_divergence",
      explanation: expectedAnswer
        ? `Your working reached the right value, but your final answer "${studentAnswer}" differs from "${expectedAnswer}".`
        : "Your final answer diverged from your working.",
      preserveExactExplanation: true,
      evidenceIds,
      reason: { expected: expectedAnswer, observed: studentAnswer, evidenceId: evidenceIds[0] || null },
    };
  }

  _buildInconclusiveResult({
    evidenceBundle,
    question,
    qc,
    smallestSkill,
    skillName,
    expectedAnswer,
    studentAnswer,
    authoredSteps,
    category,
    brokenAt,
    explanation,
    evidenceIds,
  }) {
    const repair = {
      skillId: smallestSkill,
      ruleToRemember: question?.why || "",
      principle: question?.why || "",
      explanation,
      steps: authoredSteps,
    };

    const retest = {
      skillId: smallestSkill,
      probe: {
        question: question?.q || `Show your reasoning for ${skillName}.`,
        expectedConcept: qc?.targetConcept || skillName,
        options: [],
        correctAnswer: null,
      },
    };

    const humanResponse = synthesizeHumanResponse({
      state: LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE,
      evidence: evidenceBundle,
      diagnosis: { category, brokenAt, smallestSkill, evidenceIds },
      repair,
      question,
      skill: { id: smallestSkill, name: skillName },
      expectedAnswer,
    });

    if (explanation) {
      humanResponse.whyYourThinkingBroke = explanation;
    }

    const result = createLearningDiagnosis({
      state: LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE,
      subject: qc?.subject || question?.subject || "general",
      topic: qc?.topic || question?.topic || "general",
      skill: { id: smallestSkill, name: skillName },
      evidence: evidenceBundle,
      diagnosis: {
        category,
        smallestSkill,
        brokenAt,
        evidenceIds,
        reason: { expected: expectedAnswer, observed: studentAnswer, evidenceId: evidenceIds[0] || null },
        misconception: null,
        confidence: 0.35,
        explanation: humanResponse.whyYourThinkingBroke,
        type: "unclassified",
      },
      repair,
      retest,
      response: humanResponse,
      expectedAnswer,
      stepAnalysis: evidenceBundle.stepAnalysis || null,
    });

    result.breakPoint = {
      brokenAt,
      explanation: humanResponse.whyYourThinkingBroke,
      type: "unclassified",
    };
    result.verification = retest.probe;
    result.probe = retest.probe;
    return result;
  }
}

export const diagnosticEngine = new DiagnosticEngine();
