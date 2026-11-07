/**
 * Reasoning & Step Verification Engine.
 * Evaluates each step transition, identifies the first invalid step,
 * distinguishes original errors from propagated errors, and produces
 * verified corrective working.
 */

import { StepStatus } from "../engine/diagnosticTypes.js";
import { parseEquation, analyzeEquationTransition } from "../parsing/equationParser.js";
import { parseWorkingSteps } from "../parsing/workingParser.js";
import { Fraction } from "../parsing/fractionParser.js";

export function analyzeStudentSteps({
  userWork,
  initialEquationStr,
  parsedInitialEquation,
  expectedAnswer,
}) {
  const steps = parseWorkingSteps(userWork);
  if (!steps || steps.length === 0) {
    return null;
  }

  const evaluatedSteps = [];
  let firstError = null;
  let firstErrorIndex = null;
  let previousEquation = parsedInitialEquation || parseEquation(initialEquationStr);

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const stepNum = i + 1;

    if (step.type === "EQUATION" && step.parsed) {
      const currentEq = step.parsed;

      // If this is Step 1 and matches the initial equation, it is valid
      if (i === 0 && previousEquation) {
        if (currentEq.isEquivalentTo(previousEquation)) {
          evaluatedSteps.push({
            stepNumber: stepNum,
            raw: step.raw,
            status: StepStatus.VALID,
            statusLabel: "Correct",
            comment: "Original equation is valid.",
          });
          previousEquation = currentEq;
          continue;
        }
      }

      // Check transition from previous equation to current equation
      if (previousEquation) {
        const transition = analyzeEquationTransition(previousEquation, currentEq);

        if (transition.valid) {
          evaluatedSteps.push({
            stepNumber: stepNum,
            raw: step.raw,
            status: firstError ? StepStatus.PROPAGATED_ERROR : StepStatus.VALID,
            statusLabel: firstError ? "Affected by earlier error" : "Correct",
            comment: firstError
              ? `This follows from the earlier step, but remains affected by the mistake in Step ${firstErrorIndex}.`
              : "Valid algebraic step.",
          });
        } else {
          // Transition is mathematically invalid
          if (!firstError) {
            // This is the FIRST point of failure
            firstError = {
              stepNumber: stepNum,
              raw: step.raw,
              errorType: transition.errorType || "ALGEBRAIC_DIVERGENCE",
              explanation: transition.explanation,
              expected: transition.expected,
              studentStep: transition.studentStep,
            };
            firstErrorIndex = stepNum;

            evaluatedSteps.push({
              stepNumber: stepNum,
              raw: step.raw,
              status: StepStatus.FIRST_ERROR,
              statusLabel: "First Error",
              comment: `The first mathematical divergence. ${transition.explanation}`,
              explanation: transition.explanation,
              expected: transition.expected,
            });
          } else {
            // Already had an earlier error: check if current step followed from the erroneous previous equation
            const prevSol = previousEquation.getSolution();
            const currSol = currentEq.getSolution();

            const isFollowThrough =
              prevSol instanceof Fraction &&
              currSol instanceof Fraction &&
              (prevSol.equals(currSol) || Math.abs(prevSol.toNumber() - currSol.toNumber()) <= 0.05);

            if (isFollowThrough) {
              evaluatedSteps.push({
                stepNumber: stepNum,
                raw: step.raw,
                status: StepStatus.PROPAGATED_ERROR,
                statusLabel: "Affected by earlier error",
                comment: `This follows from the incorrect Step ${firstErrorIndex}. It is not the original error.`,
              });
            } else {
              evaluatedSteps.push({
                stepNumber: stepNum,
                raw: step.raw,
                status: StepStatus.INDEPENDENT_ERROR,
                statusLabel: "Additional error",
                comment: `Another mathematical error occurred in this step.`,
              });
            }
          }
        }

        previousEquation = currentEq;
      } else {
        // No previous equation to compare against
        evaluatedSteps.push({
          stepNumber: stepNum,
          raw: step.raw,
          status: StepStatus.VALID,
          statusLabel: "Premise",
          comment: "Starting premise.",
        });
        previousEquation = currentEq;
      }
    } else {
      // Expression or textual step
      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        status: firstError ? StepStatus.PROPAGATED_ERROR : StepStatus.VALID,
        statusLabel: firstError ? "Affected by earlier error" : "Step",
        comment: firstError ? "Affected by earlier error." : "Student reasoning step.",
      });
    }
  }

  return {
    evaluatedSteps,
    firstError,
    firstErrorIndex,
    hasError: Boolean(firstError),
  };
}
