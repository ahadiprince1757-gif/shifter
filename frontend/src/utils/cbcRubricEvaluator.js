/**
 * CBC (Competency-Based Curriculum) 4-Tier Assessment Rubric Evaluator
 * Grades student performance according to official KICD / KNEC rubrics:
 * - EE (Exceeding Expectations): Score 4
 * - ME (Meeting Expectations): Score 3
 * - AE (Approaching Expectations): Score 2
 * - BE (Below Expectations): Score 1
 */

export const CBC_RUBRICS = {
  EE: {
    code: "EE",
    level: 4,
    label: "Exceeding Expectations",
    color: "#10b981", // Emerald Green
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeText: "#059669",
    description: "Flawless procedural execution and successful transfer to real-world scenario modeling."
  },
  ME: {
    code: "ME",
    level: 3,
    label: "Meeting Expectations",
    color: "#3b82f6", // Royal Blue
    badgeBg: "rgba(59, 130, 246, 0.15)",
    badgeText: "#2563eb",
    description: "Accurate procedural calculation and operational manipulation."
  },
  AE: {
    code: "AE",
    level: 2,
    label: "Approaching Expectations",
    color: "#f59e0b", // Amber
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeText: "#d97706",
    description: "Understands core method but committed a minor arithmetic or notation unit slip."
  },
  BE: {
    code: "BE",
    level: 1,
    label: "Below Expectations",
    color: "#ef4444", // Rose Red
    badgeBg: "rgba(239, 68, 68, 0.15)",
    badgeText: "#dc2626",
    description: "Foundational conceptual gap detected. Prerequisite skill review recommended."
  }
};

export class CbcRubricEvaluator {
  /**
   * Evaluate a student attempt against CBC Rubrics and Prove It ladder state
   * @param {Object} params
   * @param {boolean} params.isCorrect - Was the student's answer correct?
   * @param {number} params.level - Prove It Ladder Level (1: Procedural, 2: Operational, 3: Transfer)
   * @param {Object} params.diagnosis - Misconception diagnosis object
   * @returns {Object} CBC Rubric Grade & Feedback
   */
  static evaluateAttempt({ isCorrect, level = 1, diagnosis = {} }) {
    if (isCorrect) {
      if (level >= 3) {
        return {
          rubric: CBC_RUBRICS.EE,
          feedback: "Exceeding Expectations! You demonstrated full conceptual transfer from mathematical modeling to real-world problem solving.",
          nextStep: "ADVANCE_TO_NEXT_STRAND"
        };
      }
      return {
        rubric: CBC_RUBRICS.ME,
        feedback: "Meeting Expectations! Your calculation and algebraic manipulation are accurate.",
        nextStep: "CHALLENGE_WITH_PROVE_IT_TRANSFER"
      };
    }

    // Incorrect attempts
    if (diagnosis.type === "NOTATION_UNIT_TYPO" || diagnosis.type === "ARITHMETIC_OPERATIONAL_SLIP") {
      return {
        rubric: CBC_RUBRICS.AE,
        feedback: "Approaching Expectations! You have the right method, but made a minor calculation or unit formatting slip.",
        nextStep: "CORRECT_NOTATION_SLIP"
      };
    }

    if (level >= 3 && diagnosis.type !== "BLANK_KNEW_NOTHING") {
      return {
        rubric: CBC_RUBRICS.AE,
        feedback: "Approaching Expectations! You master procedural algebra, but struggle to translate real-world verbal constraints into mathematical equations.",
        nextStep: "BRIDGE_REAL_WORLD_TRANSLATION_GAP"
      };
    }

    return {
      rubric: CBC_RUBRICS.BE,
      feedback: "Below Expectations. Foundational skill gap detected. Reviewing prerequisite learning outcomes.",
      nextStep: "TRACE_PREREQUISITE_DAG"
    };
  }
}
