/**
 * Engine 5: Learning Policy Engine
 *
 * Closed-Loop Pedagogical Policy Router:
 * Determines the exact next action based on diagnostic state and memory recurrence:
 *  - SCAFFOLD_PREREQUISITE (Fallback to prerequisite node)
 *  - TEACH_MISCONCEPTION (Targeted contrastive explanation)
 *  - RETRIEVE_UNASSISTED (Prompt unassisted active retrieval)
 *  - TRANSFER_TEST (Present real-world or variant question)
 *  - SCHEDULE_SPACED_RETEST (Queue item for spaced repetition review)
 */

/**
 * Determines the closed-loop next action for the student.
 *
 * @param {Object} diagnosticResult - Complete output from Engines 1-4
 * @param {Object} question - Current question object
 * @returns {Object} Policy Action object
 */
export function determineNextAction(diagnosticResult, question = {}) {
  const { misconception, recurrence, dimensions, isMathValid } = diagnosticResult;

  const isMathStepQuestion = Array.isArray(question.steps) && question.steps.length > 0;
  const recurrenceCount = recurrence ? recurrence.count : 1;

  // 1. For math step questions with a single/two wrong attempts → guide to retry with steps
  if (isMathStepQuestion && !misconception && recurrenceCount <= 2) {
    return {
      action: "RETRIEVE_UNASSISTED",
      badge: "Step-by-Step Retry",
      title: "Show Your Full Working",
      instruction: "Write out every step clearly. For example: first apply BODMAS — do × and ÷ before + and −, then complete the final calculation.",
      btnText: "Try Variant Question",
      targetMode: "MUTATED_REPAIR",
    };
  }

  // 2. Persistent recurring error on same question (3+ times) → SCAFFOLD_PREREQUISITE
  if (recurrence && recurrence.level === "CROSS_TOPIC_RECURRENCE") {
    return {
      action: "SCAFFOLD_PREREQUISITE",
      badge: "Concept Foundation",
      title: "Let's Rebuild the Core Rule",
      instruction: "You have attempted this type of problem several times with the same error. Let's revisit the underlying rule before trying again.",
      btnText: "Rebuild Foundation",
      targetMode: "PREREQUISITE_REPAIR",
    };
  }

  // 3. Explicit Misconception Identified → TEACH_MISCONCEPTION
  if (misconception) {
    return {
      action: "TEACH_MISCONCEPTION",
      badge: "Concept Correction",
      title: misconception.explanation,
      instruction: `Let me show you why "${misconception.studentConcept}" is incorrect here and how "${misconception.expectedConcept}" establishes the correct model.`,
      btnText: "Fix Concept",
      targetMode: "MISCONCEPTION_TEACH",
    };
  }

  // 4. Math step error (non-number, mixed formula) → RETRIEVE_UNASSISTED
  if (!isMathValid && isMathStepQuestion) {
    return {
      action: "RETRIEVE_UNASSISTED",
      badge: "Step Repair",
      title: "Recalculate Step by Step",
      instruction: "You were on the right track! Show your full working and re-attempt the calculation step by step.",
      btnText: "Try Variant Question",
      targetMode: "MUTATED_REPAIR",
    };
  }

  // 5. High Diagnostic Confidence → TRANSFER_TEST
  if (dimensions && dimensions.diagnosticConfidence >= 75) {
    return {
      action: "TRANSFER_TEST",
      badge: "Mastery Transfer",
      title: "Test Mastery Transfer",
      instruction: "You demonstrate strong core understanding. Now test your concept in a real-world scenario.",
      btnText: "Try Transfer Problem",
      targetMode: "TRANSFER_TEST",
    };
  }

  // Default Spaced Review Policy
  return {
    action: "SCHEDULE_SPACED_RETEST",
    badge: "Review Queued",
    title: "Queue for Spaced Retest",
    instruction: "Concept recorded for review. We will re-test this concept tomorrow to reinforce long-term memory.",
    btnText: "Next Concept",
    targetMode: "NEXT_TOPIC",
  };
}
