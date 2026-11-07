/**
 * Standard diagnostic types and status constants for the Tixar Pedagogical Engine.
 */

export const DiagnosticStatus = {
  CORRECT: "correct",
  DIAGNOSED: "diagnosed",
  INCONCLUSIVE: "inconclusive",
  UNRECOGNIZED: "unrecognized",
  BLANK: "blank",
};

export const InputType = {
  BLANK: "BLANK",
  GIBBERISH: "GIBBERISH",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  NUMBER: "NUMBER",
  FRACTION: "FRACTION",
  EQUATION: "EQUATION",
  EXPRESSION: "EXPRESSION",
  TEXT_EXPLANATION: "TEXT_EXPLANATION",
  UNKNOWN: "UNKNOWN",
};

export const ProblemType = {
  NUMBER_CLASSIFICATION: "NUMBER_CLASSIFICATION",
  LINEAR_EQUATION: "LINEAR_EQUATION",
  ARITHMETIC_PRECEDENCE: "ARITHMETIC_PRECEDENCE",
  FRACTION_ARITHMETIC: "FRACTION_ARITHMETIC",
  AVERAGE_SPEED: "AVERAGE_SPEED",
  CONCEPTUAL_DISCRETE: "CONCEPTUAL_DISCRETE",
  GENERAL_NUMERIC: "GENERAL_NUMERIC",
  UNKNOWN: "UNKNOWN",
};

export const StepStatus = {
  VALID: "valid",
  FIRST_ERROR: "first_error",
  PROPAGATED_ERROR: "propagated_error",
  INDEPENDENT_ERROR: "independent_error",
  UNVERIFIABLE: "unverifiable",
};
