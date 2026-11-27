/**
 * Humanized Response Synthesizer (Phase 5)
 *
 * Pure translation layer: converts a completed LearningDiagnosis into warm,
 * specific, teacher-like language.
 *
 * INVARIANT: Diagnosis NEVER happens inside the humanizer.
 * This module never invents errors, alters diagnostic categories, or guesses unseen work.
 */

import {
  LEARNING_DIAGNOSIS_STATES,
  DIAGNOSIS_CATEGORIES,
} from "../../domain/contracts/LearningDiagnosisContract.js";

function cleanRuleText(text) {
  const s = String(text || "").trim();
  if (!s) return "";
  // Collapse accidental double periods like "0 m.."
  return s.replace(/\.{2,}$/, ".");
}

function buildRememberText({ repair, question, skill, expectedAnswer }) {
  const candidates = [
    repair?.ruleToRemember,
    repair?.principle,
    question?.why,
    skill?.coreConcept,
  ];

  for (const c of candidates) {
    const cleaned = cleanRuleText(c);
    if (cleaned && cleaned.toLowerCase() !== "nan") {
      return cleaned;
    }
  }

  if (expectedAnswer && !/nan/i.test(expectedAnswer)) {
    return cleanRuleText(`Compare your steps carefully with the worked solution to see how it reaches ${expectedAnswer}.`);
  }
  return "Review each step of the worked solution carefully before finalizing your answer.";
}

function buildRightWay({ question, repair, expectedAnswer }) {
  const authoredSteps = Array.isArray(question?.steps)
    ? question.steps.map((s) => String(s || "").trim()).filter(Boolean)
    : [];
  if (authoredSteps.length > 0) return authoredSteps;

  const repairSteps = Array.isArray(repair?.steps)
    ? repair.steps.map((s) => String(s || "").trim()).filter(Boolean)
    : [];
  if (repairSteps.length > 0) return repairSteps;

  if (expectedAnswer && !/nan/i.test(expectedAnswer)) {
    return [`Target answer: ${expectedAnswer}`];
  }
  return [];
}

/**
 * Translates a completed LearningDiagnosis (state, evidence, diagnosis, repair, question)
 * into the `response` object rendered by TeacherFeedbackView.
 */
export function synthesizeHumanResponse({
  state,
  evidence,
  diagnosis,
  repair,
  question,
  skill,
  expectedAnswer = "",
}) {
  const rightWay = buildRightWay({ question, repair, expectedAnswer });
  const remember = buildRememberText({ repair, question, skill, expectedAnswer });

  // 1. CORRECT
  if (state === LEARNING_DIAGNOSIS_STATES.CORRECT) {
    const verifiedRights = (evidence?.verified || []).map((v) => v.meaning).filter(Boolean);
    return {
      whatYouDidRight:
        verifiedRights.length > 0
          ? verifiedRights
          : ["Your reasoning and final answer match the expected method."],
      whyYourThinkingBroke: "",
      rightWay,
      remember,
    };
  }

  // Build WHAT YOU DID RIGHT from verified evidence items (never fabricate)
  const verifiedItems = evidence?.verified || [];
  const whatYouDidRight = Array.from(
    new Set(verifiedItems.map((item) => item.meaning).filter(Boolean))
  );

  // 2. INCONCLUSIVE
  if (state === LEARNING_DIAGNOSIS_STATES.INCONCLUSIVE) {
    const cat = diagnosis?.category;
    let whyYourThinkingBroke = "";

    if (cat === DIAGNOSIS_CATEGORIES.MALFORMED && !evidence?.studentAnswer && !evidence?.working) {
      whyYourThinkingBroke = "No answer or working was submitted, so I cannot evaluate your reasoning yet.";
    } else if (cat === DIAGNOSIS_CATEGORIES.MALFORMED) {
      whyYourThinkingBroke =
        "Your response doesn't contain enough recognizable reasoning or math steps to pinpoint where your thinking broke.";
    } else if (cat === DIAGNOSIS_CATEGORIES.AMBIGUOUS) {
      whyYourThinkingBroke =
        diagnosis?.reason?.observed ||
        "Your final answer does not match the expected result, and without written steps I can't tell for certain which step diverged.";
    } else {
      whyYourThinkingBroke =
        expectedAnswer
          ? `Your response does not yet match the expected answer (${expectedAnswer}). Show your step-by-step reasoning or check the method below.`
          : "There isn't enough working shown to verify where your thinking diverged. Review the worked method below.";
    }

    return {
      whatYouDidRight,
      whyYourThinkingBroke,
      rightWay,
      remember,
    };
  }

  // 3. DIAGNOSED — translate machine diagnosis.reason + repair into warm teacher prose
  const cat = diagnosis?.category;
  const reason = diagnosis?.reason || {};
  const divergent = evidence?.divergent || [];
  const missing = evidence?.missing || [];

  let whyYourThinkingBroke = "";

  if (cat === DIAGNOSIS_CATEGORIES.INCOMPLETE_ANSWER) {
    const missingDesc = missing.map((m) => m.meaning).filter(Boolean);
    if (whatYouDidRight.length > 0 && missingDesc.length > 0) {
      whyYourThinkingBroke = `${whatYouDidRight[0]}. However, your response is incomplete: ${missingDesc.join("; ")}.`;
    } else if (missingDesc.length > 0) {
      whyYourThinkingBroke = `Your response left out a required part of the answer: ${missingDesc.join("; ")}.`;
    } else {
      whyYourThinkingBroke = repair?.explanation || "Your answer is missing a required part.";
    }
  } else if (cat === DIAGNOSIS_CATEGORIES.MISCONCEPTION) {
    const primary = divergent[0];
    whyYourThinkingBroke =
      repair?.explanation ||
      primary?.meaning ||
      `Your response reflects a conceptual conflict: expected ${reason.expected || "the target principle"}, but observed "${reason.observed || evidence?.studentAnswer}".`;
    if (repair?.counterExample) {
      whyYourThinkingBroke += ` ${repair.counterExample}`;
    }
  } else if (cat === DIAGNOSIS_CATEGORIES.PROCEDURAL_ERROR) {
    const primary = divergent[0];
    whyYourThinkingBroke =
      primary?.meaning ||
      repair?.explanation ||
      `A step in your working diverged from the valid method (${reason.observed || ""} instead of ${reason.expected || ""}).`;
  } else if (cat === DIAGNOSIS_CATEGORIES.REASONING_ERROR) {
    whyYourThinkingBroke =
      divergent[0]?.meaning ||
      repair?.explanation ||
      "One of the claims in your explanation conflicts with the required concept.";
  } else {
    // INCORRECT_ANSWER (e.g. unit omission, unit mismatch, final answer divergence)
    whyYourThinkingBroke =
      divergent[0]?.meaning ||
      missing[0]?.meaning ||
      repair?.explanation ||
      (reason.expected
        ? `Your final answer (${reason.observed || evidence?.studentAnswer}) differs from ${reason.expected}.`
        : "Your final answer does not match the expected result.");
  }

  return {
    whatYouDidRight,
    whyYourThinkingBroke: cleanRuleText(whyYourThinkingBroke),
    rightWay,
    remember,
  };
}
