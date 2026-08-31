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

  // 1. Fundamental Recurrent Misconception -> SCAFFOLD_PREREQUISITE
  if (recurrence && recurrence.level === "CROSS_TOPIC_RECURRENCE") {
    return {
      action: "SCAFFOLD_PREREQUISITE",
      badge: "Prerequisite Rollback",
      title: "Scaffold Prerequisite Concept",
      instruction: "Your error pattern indicates a missing prerequisite foundation. Let's rebuild the prerequisite concept step-by-step before re-attempting.",
      btnText: "Repair Prerequisite",
      targetMode: "PREREQUISITE_REPAIR",
    };
  }

  // 2. Explicit Misconception Identified -> TEACH_MISCONCEPTION
  if (misconception) {
    return {
      action: "TEACH_MISCONCEPTION",
      badge: "Targeted Concept Repair",
      title: misconception.explanation,
      instruction: `Let me show you why "${misconception.studentConcept}" broke your reasoning and how "${misconception.expectedConcept}" establishes the correct model.`,
      btnText: "Fix Concept Misconception",
      targetMode: "MISCONCEPTION_TEACH",
    };
  }

  // 3. One-off Math Step Error -> RETRIEVE_UNASSISTED
  if (!isMathValid && Array.isArray(question.steps)) {
    return {
      action: "RETRIEVE_UNASSISTED",
      badge: "Step Repair",
      title: "Recalculate Step Execution",
      instruction: "You were on the right track initially! Try solving a variant with clean working steps.",
      btnText: "Try Variant Question",
      targetMode: "MUTATED_REPAIR",
    };
  }

  // 4. High Diagnostic Confidence -> TRANSFER_TEST
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
