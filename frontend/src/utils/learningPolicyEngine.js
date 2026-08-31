/**
 * TIXAR — ENGINE 5: LEARNING POLICY ENGINE
 *
 * Closed-loop pedagogical policy router.
 *
 * Core learning loop:
 *
 *   TEST
 *     ↓
 *   DIAGNOSE
 *     ↓
 *   FIX THE SMALLEST MISSING PIECE
 *     ↓
 *   RETRIEVE
 *     ↓
 *   RETEST
 *     ↓
 *   TRANSFER
 *     ↓
 *   SPACED REVIEW
 *
 * The engine should NOT simply react to whether an answer is
 * correct or incorrect.
 *
 * It should determine:
 *
 *   1. What the student currently knows.
 *   2. What is preventing success.
 *   3. Whether the error is recurring.
 *   4. Whether prerequisite knowledge is missing.
 *   5. What intervention has the highest expected learning value.
 *
 * IMPORTANT:
 *
 * This engine decides WHAT should happen next.
 * It does not generate the teaching content itself.
 */

// ============================================================================
// POLICY CONSTANTS
// ============================================================================

export const POLICY_ACTIONS = Object.freeze({
  SCAFFOLD_PREREQUISITE:
    "SCAFFOLD_PREREQUISITE",

  TEACH_MISCONCEPTION:
    "TEACH_MISCONCEPTION",

  RETRIEVE_UNASSISTED:
    "RETRIEVE_UNASSISTED",

  TRANSFER_TEST:
    "TRANSFER_TEST",

  SCHEDULE_SPACED_RETEST:
    "SCHEDULE_SPACED_RETEST",
});

// ============================================================================
// MAIN POLICY ROUTER
// ============================================================================

/**
 * Determine the next learning action.
 *
 * @param {Object} diagnosticResult
 * @param {Object} question
 * @returns {Object}
 */
export function determineNextAction(
  diagnosticResult = {},
  question = {}
) {
  const diagnostic =
    normalizeDiagnosticResult(
      diagnosticResult
    );

  const context =
    buildLearningContext(
      diagnostic,
      question
    );

  /*
   * Policy priority is deliberate.
   *
   * 1. Missing prerequisite
   * 2. Explicit misconception
   * 3. Recoverable execution error
   * 4. Retrieval
   * 5. Transfer
   * 6. Spaced review
   *
   * We fix the cause before increasing difficulty.
   */

  // --------------------------------------------------------------------------
  // 1. PREREQUISITE FAILURE
  // --------------------------------------------------------------------------

  if (
    shouldScaffoldPrerequisite(
      context
    )
  ) {
    return createAction(
      POLICY_ACTIONS.SCAFFOLD_PREREQUISITE,
      {
        badge:
          "Concept Foundation",

        title:
          "Rebuild the Missing Foundation",

        instruction:
          "This problem depends on a concept that is not yet reliable. Let's repair that foundation before attempting another problem.",

        btnText:
          "Rebuild Foundation",

        targetMode:
          "PREREQUISITE_REPAIR",

        reason:
          "Prerequisite knowledge appears to be the bottleneck.",

        priority:
          "HIGH",
      }
    );
  }

  // --------------------------------------------------------------------------
  // 2. EXPLICIT MISCONCEPTION
  // --------------------------------------------------------------------------

  if (
    shouldTeachMisconception(
      context
    )
  ) {
    const misconception =
      context.misconception;

    return createAction(
      POLICY_ACTIONS.TEACH_MISCONCEPTION,
      {
        badge:
          "Concept Correction",

        title:
          "Correct the Mental Model",

        instruction:
          buildMisconceptionInstruction(
            misconception
          ),

        btnText:
          "Fix Concept",

        targetMode:
          "MISCONCEPTION_TEACH",

        reason:
          "A specific misconception was identified.",

        priority:
          "HIGH",

        misconception:
          {
            type:
              misconception.type ||
              null,

            expectedConcept:
              misconception.expectedConcept ||
              null,

            studentConcept:
              misconception.studentConcept ||
              null,
          },
      }
    );
  }

  // --------------------------------------------------------------------------
  // 3. EXECUTION / PROCEDURAL ERROR
  // --------------------------------------------------------------------------

  if (
    shouldRepairExecution(
      context
    )
  ) {
    return createAction(
      POLICY_ACTIONS.RETRIEVE_UNASSISTED,
      {
        badge:
          "Step Repair",

        title:
          "Find Where Your Method Broke",

        instruction:
          buildExecutionInstruction(
            context
          ),

        btnText:
          "Retry Problem",

        targetMode:
          "MUTATED_REPAIR",

        reason:
          "The student appears to understand part of the concept but made an execution error.",

        priority:
          "MEDIUM",
      }
    );
  }

  // --------------------------------------------------------------------------
  // 4. EARLY RETRIEVAL
  //
  // If the student has demonstrated some understanding but has not
  // yet demonstrated reliable independent recall, test retrieval again.
  // --------------------------------------------------------------------------

  if (
    shouldRetrieve(
      context
    )
  ) {
    return createAction(
      POLICY_ACTIONS.RETRIEVE_UNASSISTED,
      {
        badge:
          "Active Retrieval",

        title:
          "Show What You Remember",

        instruction:
          "Try a closely related problem without looking at the explanation. The goal is to retrieve the method yourself.",

        btnText:
          "Try Again",

        targetMode:
          "MUTATED_REPAIR",

        reason:
          "The student needs another independent retrieval attempt.",

        priority:
          "MEDIUM",
      }
    );
  }

  // --------------------------------------------------------------------------
  // 5. TRANSFER
  //
  // Transfer comes AFTER core understanding has been demonstrated.
  // --------------------------------------------------------------------------

  if (
    shouldTransfer(
      context
    )
  ) {
    return createAction(
      POLICY_ACTIONS.TRANSFER_TEST,
      {
        badge:
          "Mastery Transfer",

        title:
          "Use It Somewhere New",

        instruction:
          "You appear to understand the core idea. Now use it in a different context to prove that you can apply it rather than simply recognize it.",

        btnText:
          "Try Transfer Problem",

        targetMode:
          "TRANSFER_TEST",

        reason:
          "Core understanding appears strong enough for transfer testing.",

        priority:
          "HIGH",
      }
    );
  }

  // --------------------------------------------------------------------------
  // 6. SPACED RETEST
  //
  // The student has demonstrated sufficient competence.
  // Do not keep teaching unnecessarily.
  // Let memory decay and test it later.
  // --------------------------------------------------------------------------

  return createAction(
    POLICY_ACTIONS.SCHEDULE_SPACED_RETEST,
    {
      badge:
        "Spaced Review",

      title:
        "Come Back to This Later",

      instruction:
        "You have demonstrated enough understanding for now. This concept has been scheduled for a later retest so we can check whether you still remember it.",

      btnText:
        "Next Concept",

      targetMode:
        "NEXT_TOPIC",

      reason:
        "The concept does not currently require immediate intervention.",

      priority:
        "LOW",
    }
  );
}

// ============================================================================
// CONTEXT BUILDER
// ============================================================================

function buildLearningContext(
  diagnostic,
  question
) {
  const misconception =
    diagnostic.misconception;

  const recurrence =
    diagnostic.recurrence;

  const dimensions =
    diagnostic.dimensions;

  const diagnosticConfidence =
    getConfidence(
      dimensions
    );

  const recurrenceCount =
    getRecurrenceCount(
      recurrence
    );

  const recurrenceLevel =
    String(
      recurrence?.level ||
      ""
    ).toUpperCase();

  const mathValid =
    diagnostic.isMathValid;

  const isCorrect =
    diagnostic.isCorrect === true;

  const isMathQuestion =
    isMathStepQuestion(
      question
    );

  const hasWorking =
    Boolean(
      String(
        diagnostic.userWork ||
        question.userWork ||
        ""
      ).trim()
    );

  const diagnosticType =
    String(
      diagnostic.type ||
      diagnostic.errorType ||
      ""
    ).toUpperCase();

  return {
    misconception,
    recurrence,
    dimensions,

    diagnosticConfidence,

    recurrenceCount,

    recurrenceLevel,

    mathValid,

    isCorrect,

    isMathQuestion,

    hasWorking,

    diagnosticType,

    question,
  };
}

// ============================================================================
// POLICY 1 — PREREQUISITE
// ============================================================================

function shouldScaffoldPrerequisite(
  context
) {
  /*
   * Strongest evidence:
   *
   * - explicit prerequisite diagnosis
   * - cross-topic recurrence
   * - repeated failure
   * - low diagnostic confidence
   *
   * We do NOT scaffold merely because the student got one question wrong.
   */

  if (
    context.recurrenceLevel ===
    "PREREQUISITE_FAILURE"
  ) {
    return true;
  }

  if (
    context.recurrenceLevel ===
    "CROSS_TOPIC_RECURRENCE" &&
    context.recurrenceCount >= 2
  ) {
    return true;
  }

  if (
    context.recurrenceCount >= 3 &&
    context.diagnosticConfidence < 50
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// POLICY 2 — MISCONCEPTION
// ============================================================================

function shouldTeachMisconception(
  context
) {
  if (
    !context.misconception
  ) {
    return false;
  }

  /*
   * Do not blindly trust extremely weak diagnostic signals.
   *
   * If confidence exists, require a reasonable threshold.
   */
  if (
    context.diagnosticConfidence > 0 &&
    context.diagnosticConfidence < 50
  ) {
    return false;
  }

  return true;
}

// ============================================================================
// POLICY 3 — EXECUTION ERROR
// ============================================================================

function shouldRepairExecution(
  context
) {
  if (
    !context.isMathQuestion
  ) {
    return false;
  }

  /*
   * If the mathematical method is explicitly invalid,
   * give the learner another opportunity to reconstruct
   * the method.
   */

  if (
    context.mathValid === false
  ) {
    return true;
  }

  /*
   * Known calculation / step errors.
   */

  const executionErrors = new Set([
    "CALCULATION_ERROR",
    "FINAL_CONCLUSION_ERROR",
    "STEP_EXECUTION_FAILURE",
    "SIGN_ERROR",
    "OPERATION_SWAP",
  ]);

  if (
    executionErrors.has(
      context.diagnosticType
    )
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// POLICY 4 — RETRIEVAL
// ============================================================================

function shouldRetrieve(
  context
) {
  /*
   * Retrieval is appropriate when:
   *
   * - there is no strong misconception
   * - there is no clear prerequisite failure
   * - the student has not yet demonstrated reliable mastery
   */

  if (
    context.misconception
  ) {
    return false;
  }

  if (
    context.recurrenceLevel ===
    "PREREQUISITE_FAILURE"
  ) {
    return false;
  }

  /*
   * A recent failed attempt should generally lead
   * to another retrieval attempt before transfer.
   */

  if (
    !context.isCorrect &&
    context.recurrenceCount <= 2
  ) {
    return true;
  }

  /*
   * Moderate confidence means understanding may exist
   * but has not yet been demonstrated reliably.
   */

  if (
    context.diagnosticConfidence >= 50 &&
    context.diagnosticConfidence < 75
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// POLICY 5 — TRANSFER
// ============================================================================

function shouldTransfer(
  context
) {
  /*
   * Transfer should require more than "diagnostic confidence".
   *
   * Ideally the learner should have:
   *
   *   - correct answer
   *   - valid reasoning
   *   - reasonably high diagnostic confidence
   *   - no unresolved misconception
   */

  if (
    !context.isCorrect
  ) {
    return false;
  }

  if (
    context.misconception
  ) {
    return false;
  }

  if (
    context.mathValid === false
  ) {
    return false;
  }

  if (
    context.diagnosticConfidence <
    75
  ) {
    return false;
  }

  /*
   * If the student has repeatedly demonstrated competence,
   * transfer becomes especially valuable.
   */

  if (
    context.recurrenceCount >= 2
  ) {
    return true;
  }

  /*
   * High-confidence success can also justify transfer.
   */

  if (
    context.diagnosticConfidence >= 85
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// INSTRUCTION BUILDERS
// ============================================================================

function buildMisconceptionInstruction(
  misconception
) {
  const studentConcept =
    misconception?.studentConcept;

  const expectedConcept =
    misconception?.expectedConcept;

  if (
    studentConcept &&
    expectedConcept
  ) {
    return (
      `You used "${studentConcept}", but this problem requires "${expectedConcept}". ` +
      `Let's compare the two ideas and identify exactly where they differ before you try again.`
    );
  }

  return (
    misconception?.explanation ||
    "A specific misunderstanding was detected. Let's correct the underlying idea before you try the problem again."
  );
}

function buildExecutionInstruction(
  context
) {
  if (
    context.diagnosticType ===
    "FINAL_CONCLUSION_ERROR"
  ) {
    return (
      "Your method appears to be on the right track. Recheck the final calculation carefully and retrieve the final result yourself."
    );
  }

  if (
    context.diagnosticType ===
    "SIGN_ERROR"
  ) {
    return (
      "Your method needs a sign check. Rework the transformation one step at a time and verify the sign after each operation."
    );
  }

  if (
    context.diagnosticType ===
    "OPERATION_SWAP"
  ) {
    return (
      "Check which inverse operation is required at this step. Rework the equation without looking at the solution."
    );
  }

  return (
    "Reconstruct the solution one step at a time. Do not copy the previous solution; identify the operation required at each step."
  );
}

// ============================================================================
// ACTION FACTORY
// ============================================================================

function createAction(
  action,
  details = {}
) {
  return {
    action,

    badge:
      details.badge ||
      "Learning Action",

    title:
      details.title ||
      "Continue Learning",

    instruction:
      details.instruction ||
      "Continue with the next learning task.",

    btnText:
      details.btnText ||
      "Continue",

    targetMode:
      details.targetMode ||
      "NEXT_TOPIC",

    reason:
      details.reason ||
      "",

    priority:
      details.priority ||
      "MEDIUM",

    /*
     * Version makes it easier to evolve the policy engine
     * without breaking clients consuming its output.
     */
    policyVersion:
      "5.1",
  };
}

// ============================================================================
// DIAGNOSTIC NORMALIZATION
// ============================================================================

function normalizeDiagnosticResult(
  result
) {
  if (
    !result ||
    typeof result !== "object"
  ) {
    return {
      misconception: null,
      recurrence: null,
      dimensions: null,
      isMathValid: null,
      isCorrect: false,
      type: "",
      userWork: "",
    };
  }

  return {
    misconception:
      result.misconception ||
      result.analysis?.misconception ||
      null,

    recurrence:
      result.recurrence ||
      result.analysis?.recurrence ||
      null,

    dimensions:
      result.dimensions ||
      result.analysis?.dimensions ||
      null,

    isMathValid:
      result.isMathValid ??
      result.analysis?.isMathValid ??
      null,

    isCorrect:
      result.isCorrect === true,

    type:
      result.type ||
      result.errorType ||
      result.analysis?.type ||
      "",

    userWork:
      result.userWork ||
      "",
  };
}

// ============================================================================
// CONFIDENCE
// ============================================================================

function getConfidence(
  dimensions
) {
  if (
    !dimensions ||
    typeof dimensions !==
      "object"
  ) {
    return 0;
  }

  const candidates = [
    dimensions.diagnosticConfidence,
    dimensions.confidence,
    dimensions.overallConfidence,
  ];

  for (
    const value
    of candidates
  ) {
    const number =
      Number(value);

    if (
      Number.isFinite(number)
    ) {
      return clamp(
        number,
        0,
        100
      );
    }
  }

  return 0;
}

// ============================================================================
// RECURRENCE
// ============================================================================

function getRecurrenceCount(
  recurrence
) {
  if (
    !recurrence ||
    typeof recurrence !==
      "object"
  ) {
    return 0;
  }

  const count =
    Number(
      recurrence.count
    );

  if (
    !Number.isFinite(count) ||
    count < 0
  ) {
    return 0;
  }

  return Math.floor(
    count
  );
}

// ============================================================================
// QUESTION HELPERS
// ============================================================================

function isMathStepQuestion(
  question
) {
  if (
    !question ||
    typeof question !==
      "object"
  ) {
    return false;
  }

  if (
    Array.isArray(
      question.steps
    ) &&
    question.steps.length > 0
  ) {
    return true;
  }

  const subject =
    String(
      question.subject ||
      question.type ||
      ""
    ).toLowerCase();

  return (
    subject === "math" ||
    subject === "mathematics" ||
    subject === "physics" ||
    subject === "chemistry"
  );
}

// ============================================================================
// GENERAL UTILITIES
// ============================================================================

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}
