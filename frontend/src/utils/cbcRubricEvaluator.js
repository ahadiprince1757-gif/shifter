/**
 * ============================================================================
 * TIXAR CBC (COMPETENCY-BASED CURRICULUM) EVALUATOR & AGGREGATOR
 * ============================================================================
 *
 * Grades student performance according to official KICD / KNEC rubrics:
 * - EE (Exceeding Expectations): Level 4
 * - ME (Meeting Expectations): Level 3
 * - AE (Approaching Expectations): Level 2
 * - BE (Below Expectations): Level 1
 *
 * Architecture:
 * - Level 1: CbcRubricEvaluator (Evaluates single attempt evidence)
 * - Level 2: CbcCompetencyAggregator (Calculates cumulative competency over time)
 * ============================================================================
 */

export const CBC_RUBRICS = {
  EE: {
    code: "EE",
    level: 4,
    label: "Exceeding Expectations",
    color: "#10b981", // Emerald Green
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeText: "#059669",
    description:
      "Demonstrates accurate understanding and independently applies learning in unfamiliar or complex contexts."
  },
  ME: {
    code: "ME",
    level: 3,
    label: "Meeting Expectations",
    color: "#3b82f6", // Royal Blue
    badgeBg: "rgba(59, 130, 246, 0.15)",
    badgeText: "#2563eb",
    description:
      "Demonstrates the expected knowledge or skill accurately and independently."
  },
  AE: {
    code: "AE",
    level: 2,
    label: "Approaching Expectations",
    color: "#f59e0b", // Amber
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeText: "#d97706",
    description:
      "Demonstrates partial understanding but still requires support or minor correction."
  },
  BE: {
    code: "BE",
    level: 1,
    label: "Below Expectations",
    color: "#ef4444", // Rose Red
    badgeBg: "rgba(239, 68, 68, 0.15)",
    badgeText: "#dc2626",
    description:
      "Demonstrates significant gaps in prerequisite knowledge or the target competency."
  }
};

/**
 * Level 1: Evaluates a single learning attempt
 */
export class CbcRubricEvaluator {
  /**
   * Evaluate a student attempt against CBC Rubrics and Prove It ladder state
   *
   * @param {Object} params
   * @param {boolean} params.isCorrect - Was the student's answer correct?
   * @param {number} [params.level=1] - Cognitive demand / Prove It level (1: Procedural, 2: Operational, 3: Transfer)
   * @param {Object} [params.diagnosis={}] - Misconception diagnosis object
   * @param {number} [params.attempts=1] - Number of attempts on this question
   * @param {number} [params.hintsUsed=0] - Number of hints requested
   * @param {string} [params.reasoningQuality="unknown"] - Quality of reasoning ("strong"|"moderate"|"weak"|"unknown")
   * @returns {Object} CBC Rubric Grade & Feedback
   */
  static evaluateAttempt({
    isCorrect,
    level = 1,
    diagnosis = {},
    attempts = 1,
    hintsUsed = 0,
    reasoningQuality = "unknown"
  }) {
    // ─────────────────────────────────────────────────────────────
    // 1. EMPTY OR IRRELEVANT RESPONSE
    // ─────────────────────────────────────────────────────────────
    if (
      diagnosis.type === "BLANK" ||
      diagnosis.type === "IRRELEVANT" ||
      diagnosis.type === "IRRELEVANT_KNEW_NOTHING" ||
      diagnosis.type === "BLANK_KNEW_NOTHING"
    ) {
      return this.createResult({
        rubric: CBC_RUBRICS.BE,
        feedback: "Below Expectations. No sufficient evidence of understanding was demonstrated.",
        nextStep: "REVIEW_PREREQUISITE_SKILL"
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 2. CORRECT ANSWER
    // ─────────────────────────────────────────────────────────────
    if (isCorrect) {
      const independent = attempts === 1 && hintsUsed === 0;
      const strongReasoning = reasoningQuality === "strong" || reasoningQuality === "unknown";

      // EE: Correct + Transfer level (3+) + Independent + Strong Reasoning
      if (level >= 3 && independent && strongReasoning) {
        return this.createResult({
          rubric: CBC_RUBRICS.EE,
          feedback:
            "Exceeding Expectations! You independently applied your understanding to a more complex or unfamiliar situation.",
          nextStep: "ADVANCE_OR_EXTEND"
        });
      }

      // ME: Correct demonstration of expected skill
      return this.createResult({
        rubric: CBC_RUBRICS.ME,
        feedback:
          "Meeting Expectations! You successfully demonstrated the expected understanding and skill.",
        nextStep:
          level < 3
            ? "OFFER_TRANSFER_CHALLENGE"
            : "REINFORCE_AND_ADVANCE"
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 3. INCORRECT BUT MINOR OPERATIONAL/NOTATIONAL SLIP
    // ─────────────────────────────────────────────────────────────
    const minorErrorTypes = [
      "NOTATION_UNIT_TYPO",
      "ARITHMETIC_OPERATIONAL_SLIP",
      "ROUNDING_ERROR"
    ];

    if (minorErrorTypes.includes(diagnosis.type)) {
      return this.createResult({
        rubric: CBC_RUBRICS.AE,
        feedback:
          "Approaching Expectations. Your method shows understanding, but a minor error affected the final answer.",
        nextStep: "CORRECT_AND_RETRY"
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 4. TRANSFER PROBLEM BUT APPLICATION GAP
    // ─────────────────────────────────────────────────────────────
    if (level >= 3 && diagnosis.type === "APPLICATION_TRANSLATION_GAP") {
      return this.createResult({
        rubric: CBC_RUBRICS.AE,
        feedback:
          "Approaching Expectations. You understand the core method but need practice applying it in unfamiliar situations.",
        nextStep: "PRACTICE_GUIDED_TRANSFER"
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. FUNDAMENTAL GAP
    // ─────────────────────────────────────────────────────────────
    return this.createResult({
      rubric: CBC_RUBRICS.BE,
      feedback:
        "Below Expectations. A foundational gap was identified. Let's strengthen the prerequisite concept before continuing.",
      nextStep: "TRACE_PREREQUISITE_DAG"
    });
  }

  static createResult({ rubric, feedback, nextStep }) {
    return {
      rubric,
      competencyCode: rubric.code,
      competencyLevel: rubric.level,
      feedback,
      nextStep,
      evaluatedAt: new Date().toISOString()
    };
  }
}

/**
 * Level 2: Aggregates historical evidence over time to calculate student competency
 */
export class CbcCompetencyAggregator {
  /**
   * Calculates overall cumulative CBC Competency using recency-weighted evidence.
   *
   * @param {Array<Object|number>} attempts - Historical attempt objects or competency levels
   * @returns {Object} Aggregated competency result with trend and confidence
   */
  static calculateCompetency(attempts = []) {
    if (!Array.isArray(attempts) || attempts.length === 0) {
      return {
        rubric: CBC_RUBRICS.BE,
        competencyCode: CBC_RUBRICS.BE.code,
        competencyLevel: CBC_RUBRICS.BE.level,
        weightedScore: 1.0,
        trend: "NO_DATA",
        evidenceCount: 0,
        summary: "No historical attempt evidence recorded yet."
      };
    }

    // Take up to 10 most recent attempts
    const recentAttempts = attempts.slice(-10);
    const n = recentAttempts.length;

    // Recency weighting: earlier attempts get lower weight, recent get higher (1, 2, ..., n)
    const weights = recentAttempts.map((_, index) => index + 1);
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    const weightedTotal = recentAttempts.reduce((total, attempt, index) => {
      const level =
        typeof attempt === "number"
          ? attempt
          : attempt?.competencyLevel || attempt?.level || (attempt?.isCorrect ? 3 : 1);
      return total + level * weights[index];
    }, 0);

    const weightedAverage = weightedTotal / totalWeight;

    // Performance trend analysis
    let trend = "STABLE";
    if (n >= 4) {
      const half = Math.floor(n / 2);
      const earlyAttempts = recentAttempts.slice(0, half);
      const lateAttempts = recentAttempts.slice(half);

      const earlyAvg =
        earlyAttempts.reduce((sum, a) => sum + (typeof a === "number" ? a : a.competencyLevel || (a.isCorrect ? 3 : 1)), 0) /
        earlyAttempts.length;
      const lateAvg =
        lateAttempts.reduce((sum, a) => sum + (typeof a === "number" ? a : a.competencyLevel || (a.isCorrect ? 3 : 1)), 0) /
        lateAttempts.length;

      if (lateAvg - earlyAvg >= 0.5) trend = "IMPROVING";
      else if (earlyAvg - lateAvg >= 0.5) trend = "DECLINING";
    }

    // Map weighted score to CBC Rubric
    let rubric;
    if (weightedAverage >= 3.5) {
      rubric = CBC_RUBRICS.EE;
    } else if (weightedAverage >= 2.5) {
      rubric = CBC_RUBRICS.ME;
    } else if (weightedAverage >= 1.7) {
      rubric = CBC_RUBRICS.AE;
    } else {
      rubric = CBC_RUBRICS.BE;
    }

    return {
      rubric,
      competencyCode: rubric.code,
      competencyLevel: rubric.level,
      weightedScore: Math.round(weightedAverage * 100) / 100,
      trend,
      evidenceCount: n,
      summary: `Demonstrating ${rubric.label} (${trend.toLowerCase()} trend over ${n} attempts).`
    };
  }
}
