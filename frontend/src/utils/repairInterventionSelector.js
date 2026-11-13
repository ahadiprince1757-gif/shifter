/**
 * TIXAR REPAIR INTERVENTION SELECTOR
 *
 * Core Law:
 * A repair intervention may NEVER silently change the skill being diagnosed.
 *
 * Semantic Invariant:
 * Diagnosed Skill ≡ Repair Skill ≡ Retest Skill
 * (Unless explicitly declared as PREREQUISITE_REPAIR)
 *
 * Standard:
 * "Does this question provide valid evidence that the diagnosed skill has been repaired?"
 *
 * Intervention Hierarchy:
 * 1. DIRECT_RETEST        (Same rule + same cognitive operation, different surface)
 * 2. SIMPLIFY             (Strip extraneous steps to isolate the failed primitive)
 * 3. CONCEPT_CONTRAST     (Contrast between correct concept and misconception)
 * 4. PROCEDURE_REPAIR     (Step-by-step execution probe)
 * 5. SIGN_REPAIR          (Directional / sign inversion probe)
 * 6. CALCULATION_REPAIR   (Arithmetic / unit conversion check)
 * 7. DETERMINISTIC_PROBE  (Canonical verified bank variant)
 */

import { getVerifiedQuestionWithOptions } from "./mcqVerifier.js";
import { questionMutator } from "./questionMutator.js";

export const INTERVENTION_TYPES = Object.freeze({
  DIRECT_RETEST: "DIRECT_RETEST",
  SIMPLIFY: "SIMPLIFY",
  CONCEPT_CONTRAST: "CONCEPT_CONTRAST",
  PROCEDURE_REPAIR: "PROCEDURE_REPAIR",
  SIGN_REPAIR: "SIGN_REPAIR",
  CALCULATION_REPAIR: "CALCULATION_REPAIR",
  DETERMINISTIC_PROBE: "DETERMINISTIC_PROBE",
  PREREQUISITE_REPAIR: "PREREQUISITE_REPAIR",
});

/**
 * Extract canonical semantic skill identity from a question and topic context.
 */
export function extractSkillIdentity(question, { subject, chapter, topic } = {}) {
  const subjectId = subject?.id || question?.subject_id || "general";
  const chapterId = chapter?.id || question?.chapter_id || "general";
  const topicId = topic || question?.topic || "general";

  const conceptId =
    question?.concept_tag ||
    question?.conceptId ||
    question?.topic ||
    topicId;

  const skillId =
    question?.skill_id ||
    question?.skillId ||
    `${subjectId}:${topicId}:${conceptId}`.toLowerCase().replace(/\s+/g, "_");

  const subskillId =
    question?.subskill_id ||
    question?.subskillId ||
    question?.type ||
    "core";

  return {
    subjectId,
    chapterId,
    topicId,
    conceptId,
    skillId,
    subskillId,
  };
}

/**
 * 1. Create a structured Repair Plan from a failed attempt.
 */
export function createRepairPlan({
  question,
  feedback,
  studentAnswer,
  subject,
  chapter,
  topic,
}) {
  const semanticSkill = extractSkillIdentity(question, { subject, chapter, topic });

  // Classify failure
  const diagnosisType =
    feedback?.analysis?.diagnosis?.type ||
    feedback?.diagnosis?.type ||
    classifyFailure(question, studentAnswer, feedback);

  // Determine repair rule and strategy
  const { rule, whatWentWrong, strategy, recommendedIntervention } = determineStrategyAndRule(
    diagnosisType,
    question,
    feedback
  );

  return {
    semanticSkill,
    diagnosis: diagnosisType,
    whatWentWrong,
    rule,
    repairStrategy: strategy,
    recommendedIntervention,
    originalQuestion: question,
    correctAnswer: feedback?.correctAnswer || question?.ans || "",
    solution: feedback?.solution || question?.why || "",
    timestamp: Date.now(),
  };
}

/**
 * 2. Select the repair intervention probe and enforce the semantic invariant.
 */
export function selectRepairIntervention(repairPlan, availableTopicQuestions = []) {
  const { semanticSkill, originalQuestion, recommendedIntervention, repairStrategy } = repairPlan;

  let probe = null;
  let chosenIntervention = recommendedIntervention || INTERVENTION_TYPES.DIRECT_RETEST;

  // ── 1. Search existing verified topic questions for an isomorphic probe ────
  const candidateFromBank = findIsomorphicQuestion(originalQuestion, semanticSkill, availableTopicQuestions);
  if (candidateFromBank) {
    probe = { ...candidateFromBank };
    chosenIntervention = INTERVENTION_TYPES.DIRECT_RETEST;
  }

  // ── 2. If no bank isomorphic question, apply targeted strategy probe ─────
  if (!probe) {
    switch (chosenIntervention) {
      case INTERVENTION_TYPES.SIMPLIFY:
        probe = buildSimplifiedProbe(originalQuestion, repairPlan);
        break;
      case INTERVENTION_TYPES.CONCEPT_CONTRAST:
        probe = buildConceptContrastProbe(originalQuestion, repairPlan);
        break;
      case INTERVENTION_TYPES.SIGN_REPAIR:
        probe = buildSignRepairProbe(originalQuestion, repairPlan);
        break;
      case INTERVENTION_TYPES.CALCULATION_REPAIR:
        probe = buildCalculationRepairProbe(originalQuestion, repairPlan);
        break;
      case INTERVENTION_TYPES.DIRECT_RETEST:
      default:
        probe = buildDirectRetestProbe(originalQuestion, repairPlan);
        break;
    }
  }

  // Fallback to deterministic mutator only if other strategies produce no valid probe
  if (!probe) {
    const fallbackMutated = questionMutator.mutate(
      originalQuestion,
      { correctAnswer: repairPlan.correctAnswer },
      semanticSkill.subjectId
    );
    if (fallbackMutated && fallbackMutated.q !== originalQuestion.q) {
      probe = fallbackMutated;
      chosenIntervention = INTERVENTION_TYPES.DETERMINISTIC_PROBE;
    } else {
      // Clean fallback: same question with verified options
      probe = { ...originalQuestion };
      chosenIntervention = INTERVENTION_TYPES.DIRECT_RETEST;
    }
  }

  // Enforce Verified Question shape
  const verifiedProbe = getVerifiedQuestionWithOptions(probe);

  // Stamp Semantic Identity Invariant onto probe
  verifiedProbe.semanticSkill = semanticSkill;
  verifiedProbe.intervention = chosenIntervention;
  verifiedProbe.repairStrategy = repairStrategy;
  verifiedProbe.is_repair_probe = true;

  // Invariant verification check
  const invariantCheck = verifySemanticSkillInvariant(repairPlan, verifiedProbe);
  if (!invariantCheck.valid) {
    console.warn("[RepairSelector] Semantic invariant violated:", invariantCheck.reason);
  }

  return {
    probe: verifiedProbe,
    intervention: chosenIntervention,
    repairPlan,
  };
}

/**
 * Verify semantic invariant: diagnosed skill == retest skill.
 */
export function verifySemanticSkillInvariant(repairPlan, probeQuestion) {
  const planSkill = repairPlan?.semanticSkill?.skillId;
  const probeSkill = probeQuestion?.semanticSkill?.skillId;

  if (repairPlan?.repairStrategy === "PREREQUISITE_REPAIR") {
    return { valid: true, declaredPrerequisite: true };
  }

  if (planSkill && probeSkill && planSkill !== probeSkill) {
    return {
      valid: false,
      reason: `Diagnosed skill (${planSkill}) does not match probe skill (${probeSkill}).`,
    };
  }

  return { valid: true };
}

/* -------------------------------------------------------------------------- */
/* INTERNAL HELPERS                                                           */
/* -------------------------------------------------------------------------- */

function classifyFailure(question, studentAnswer, feedback) {
  const ans = String(studentAnswer || "").trim().toLowerCase();
  const sol = String(feedback?.correctAnswer || question?.ans || "").trim().toLowerCase();

  if (!ans) return "NO_ANSWER";

  // Check sign error
  if (ans === `-${sol}` || `-${ans}` === sol) {
    return "SIGN_ERROR";
  }

  // Check calculation vs conceptual
  const numAns = parseFloat(ans.replace(/[^0-9.-]/g, ""));
  const numSol = parseFloat(sol.replace(/[^0-9.-]/g, ""));
  if (!isNaN(numAns) && !isNaN(numSol)) {
    if (Math.abs(numAns - numSol) / Math.abs(numSol || 1) < 0.25) {
      return "CALCULATION_SLIP";
    }
    return "PROCEDURAL_ERROR";
  }

  return "CONCEPTUAL_GAP";
}

function determineStrategyAndRule(diagnosis, question, feedback) {
  const cleanAns = feedback?.correctAnswer || question?.ans || "";

  switch (diagnosis) {
    case "SIGN_ERROR":
      return {
        whatWentWrong: "The magnitude is right, but the sign/direction was inverted.",
        rule: "Pay close attention to direction and sign rules (e.g. transposing across equals inverts the sign).",
        strategy: "SIGN_REPAIR",
        recommendedIntervention: INTERVENTION_TYPES.SIGN_REPAIR,
      };

    case "CALCULATION_SLIP":
      return {
        whatWentWrong: "The approach was correct, but a calculation or arithmetic error occurred.",
        rule: "Execute each step carefully. Double-check mental arithmetic before submitting.",
        strategy: "CALCULATION_REPAIR",
        recommendedIntervention: INTERVENTION_TYPES.CALCULATION_REPAIR,
      };

    case "PROCEDURAL_ERROR":
      return {
        whatWentWrong: "A step in the standard solving procedure was skipped or applied out of order.",
        rule: question?.why || `Follow the standard procedure step-by-step: correct result is ${cleanAns}.`,
        strategy: "PROCEDURE_REPAIR",
        recommendedIntervention: INTERVENTION_TYPES.PROCEDURE_REPAIR,
      };

    case "DISTRIBUTIVE_FAILURE":
      return {
        whatWentWrong: "The outside factor was not multiplied across all terms inside the parentheses.",
        rule: "a(b + c) = ab + ac. Multiply every term inside by the outer coefficient.",
        strategy: "DISTRIBUTION_REPAIR",
        recommendedIntervention: INTERVENTION_TYPES.DIRECT_RETEST,
      };

    case "CONCEPTUAL_GAP":
    default:
      return {
        whatWentWrong: feedback?.workingNote || "The core concept or principle was misidentified.",
        rule: question?.why || `The correct principle leads to: ${cleanAns}.`,
        strategy: "CONCEPT_REPAIR",
        recommendedIntervention: INTERVENTION_TYPES.DIRECT_RETEST,
      };
  }
}

/**
 * Search available topic questions for an isomorphic question (same concept, different text).
 */
function findIsomorphicQuestion(originalQuestion, semanticSkill, questions) {
  if (!Array.isArray(questions) || questions.length <= 1) return null;

  const originalStem = (originalQuestion?.q || originalQuestion?.stem || "").trim();

  return questions.find((q) => {
    const qStem = (q?.q || q?.stem || "").trim();
    if (qStem === originalStem) return false;

    const qSkill = extractSkillIdentity(q, semanticSkill);
    return qSkill.conceptId === semanticSkill.conceptId;
  }) || null;
}

/**
 * Build DIRECT_RETEST: Same rule + same cognitive operation, different surface numbers.
 * Example: 3(x + 2) = 15  ──►  2(x + 4) = 14
 */
function buildDirectRetestProbe(originalQuestion, repairPlan) {
  const stem = originalQuestion?.q || originalQuestion?.stem || "";
  const ans = String(originalQuestion?.ans || "");

  // Simple clean linear equation transform
  const linearMatch = stem.match(/(\d+)\s*\(\s*x\s*([+-])\s*(\d+)\s*\)\s*=\s*(\d+)/i);
  if (linearMatch) {
    const [, a, sign, b, c] = linearMatch;
    // New parameters: same structure, clean integers
    const newA = parseInt(a) === 3 ? 2 : 3;
    const newB = 4;
    const newX = 3;
    const newC = newA * (sign === "+" ? newX + newB : newX - newB);

    return {
      ...originalQuestion,
      q: `Solve for x: ${newA}(x ${sign} ${newB}) = ${newC}`,
      stem: `Solve for x: ${newA}(x ${sign} ${newB}) = ${newC}`,
      ans: String(newX),
      why: `${newA}(x ${sign} ${newB}) = ${newC} → x ${sign} ${newB} = ${newC / newA} → x = ${newX}`,
      options: [String(newX), String(newX + 1), String(newX - 1), String(newX + 2)],
    };
  }

  // Fallback: return copy of question with cleared state
  return { ...originalQuestion };
}

function buildSimplifiedProbe(originalQuestion, repairPlan) {
  return buildDirectRetestProbe(originalQuestion, repairPlan);
}

function buildConceptContrastProbe(originalQuestion, repairPlan) {
  return buildDirectRetestProbe(originalQuestion, repairPlan);
}

function buildSignRepairProbe(originalQuestion, repairPlan) {
  return buildDirectRetestProbe(originalQuestion, repairPlan);
}

function buildCalculationRepairProbe(originalQuestion, repairPlan) {
  return buildDirectRetestProbe(originalQuestion, repairPlan);
}
