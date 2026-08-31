/**
 * Prove It Diagnostic Ladder & Transfer Testing Engine
 * Drives the 3-tier cognitive progression:
 *   Level 1: Procedural Direct Calculation (e.g. x² - 5x + 6 = 0)
 *   Level 2: Operational Stress / Coefficient Split (e.g. 2x² - 5x + 2 = 0)
 *   Level 3: Real-World Scenario Transfer (e.g. Ball trajectory / Farm yield modeling)
 * 
 * Manages the adaptive cycle:
 *   TEST ➔ TEACH ➔ RETRIEVE ➔ WAIT ➔ RETEST ➔ TRANSFER
 */

import { CbcRubricEvaluator } from "./cbcRubricEvaluator";
import { getPrerequisiteChain } from "../data/cbcCurriculumGraph";

export class ProveItEngine {
  /**
   * Determine the current ladder level and next question structure
   * @param {Object} sessionState - Current topic session state
   * @param {number} sessionState.level - Current level (1, 2, or 3)
   * @param {Array} sessionState.attempts - Attempt history
   * @returns {Object} Ladder state & instructions
   */
  static getLadderState(sessionState = {}) {
    const level = sessionState.level || 1;
    const attempts = sessionState.attempts || [];

    return {
      level,
      isLevel1Complete: attempts.some(a => a.level === 1 && a.isCorrect),
      isLevel2Complete: attempts.some(a => a.level === 2 && a.isCorrect),
      isLevel3Complete: attempts.some(a => a.level === 3 && a.isCorrect),
      phaseName: level === 1 ? "Procedural Foundations" : level === 2 ? "Operational Stress Check" : "Real-World CBC Transfer",
    };
  }

  /**
   * Evaluate student answer and determine adaptive next action
   * @param {Object} qBlueprint - Question blueprint
   * @param {Object} studentResponse - Student answer payload
   * @param {Object} sessionState - Current session state
   */
  static evaluateAndStep(qBlueprint, studentResponse, sessionState = {}) {
    const isCorrect = studentResponse.isCorrect;
    const currentLevel = sessionState.level || 1;
    const diagnosis = studentResponse.diagnosis || {};

    const rubricEval = CbcRubricEvaluator.evaluateAttempt({
      isCorrect,
      level: currentLevel,
      diagnosis
    });

    let nextLevel = currentLevel;
    let actionType = "CONTINUE_PRACTICE";
    let bridgeLesson = null;
    let prerequisiteTrace = null;

    if (isCorrect) {
      if (currentLevel < 3) {
        nextLevel = currentLevel + 1;
        actionType = "PROVE_IT_LEVEL_UP";
      } else {
        actionType = "TOPIC_MASTERY_ACHIEVED";
      }
    } else {
      // Handle incorrect response based on level
      if (currentLevel === 3 && rubricEval.rubric.code === "AE") {
        // Passed Level 1 & 2, but failed Level 3 Real-World Transfer
        actionType = "TEACH_TRANSLATION_BRIDGE";
        bridgeLesson = {
          title: "Translating Real-World Scenarios into Mathematical Equations",
          concept: "Real-World Boundary Condition Mapping",
          summary: "You have strong algebraic manipulation skills! The key is mapping verbal constraints to mathematical terms.",
          example: "In trajectory problems ('when a ball hits the ground'), set height h(t) = 0 and solve for time t."
        };
      } else if (rubricEval.rubric.code === "BE") {
        // Foundational gap -> Trace prerequisite DAG
        actionType = "PREREQUISITE_REMEDIATION";
        prerequisiteTrace = getPrerequisiteChain(qBlueprint.subject || "math", qBlueprint.subStrand || "quadratic_expressions_1");
      }
    }

    return {
      rubricEval,
      currentLevel,
      nextLevel,
      actionType,
      bridgeLesson,
      prerequisiteTrace
    };
  }
}
