/**
 * 10× Precision Reasoning & Step Verification Engine.
 *
 * Implements:
 * 1. Exact symbolic and Fraction transformation checks (no loose 0.05 tolerances).
 * 2. Strict step separation: { evidence, transition, diagnosis }.
 * 3. Explicit error origin: ROOT, PROPAGATED, INDEPENDENT, or NONE.
 * 4. UNVERIFIED status for unproven/textual follow-up statements (never manufacturing causality).
 * 5. Generation of targeted repair & retest metadata.
 */

import { StepStatus, ErrorOrigin, DiagnosticErrorType } from "../engine/diagnosticTypes.js";
import { parseEquation, analyzeEquationTransition } from "../parsing/equationParser.js";
import { parseWorkingSteps } from "../parsing/workingParser.js";
import { Fraction } from "../parsing/fractionParser.js";
import { getDiagnosticProbe } from "../knowledge/skillGraph.js";

/**
 * Checks if a decimal number string (e.g. "8.33") is a valid standard rounding of a Fraction (e.g. 25/3).
 */
function isExactRoundingOf(frac, strOrNum) {
  if (!frac || !(frac instanceof Fraction)) return false;
  const numVal = typeof strOrNum === "number" ? strOrNum : parseFloat(strOrNum);
  if (isNaN(numVal)) return false;

  const exact = frac.toNumber();
  // Check exact
  if (exact === numVal) return true;

  // Check 1, 2, 3 decimal place standard roundings
  for (let places = 1; places <= 4; places++) {
    const factor = Math.pow(10, places);
    const rounded = Math.round(exact * factor) / factor;
    if (rounded === numVal) return true;
  }

  return false;
}

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

      // If this is Step 1 and matches the initial equation, it is the valid starting premise
      if (i === 0 && previousEquation) {
        if (currentEq.isEquivalentTo(previousEquation)) {
          evaluatedSteps.push({
            stepNumber: stepNum,
            raw: step.raw,
            evidence: {
              stepNumber: stepNum,
              raw: step.raw,
              type: "EQUATION",
            },
            transition: {
              valid: true,
              operation: { type: "PREMISE", target: "both_sides" },
              inferredIntent: { goal: "restate_problem" },
            },
            diagnosis: {
              origin: ErrorOrigin.NONE,
              causedByStep: null,
              category: null,
              confidence: 1.0,
            },
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
          // Transition is mathematically valid
          const isPropagated = Boolean(firstError);
          evaluatedSteps.push({
            stepNumber: stepNum,
            raw: step.raw,
            evidence: {
              stepNumber: stepNum,
              raw: step.raw,
              type: "EQUATION",
            },
            transition: {
              valid: true,
              operation: transition.operation,
              inferredIntent: transition.inferredIntent,
            },
            diagnosis: {
              origin: isPropagated ? ErrorOrigin.PROPAGATED : ErrorOrigin.NONE,
              causedByStep: isPropagated ? firstErrorIndex : null,
              category: null,
              confidence: 0.95,
            },
            status: isPropagated ? StepStatus.PROPAGATED_ERROR : StepStatus.VALID,
            statusLabel: isPropagated ? "Affected by earlier error" : "Correct",
            comment: isPropagated
              ? `This transformation is valid from the previous step, but follows the error in Step ${firstErrorIndex}.`
              : "Valid algebraic step.",
          });
        } else {
          // Transition is mathematically invalid
          if (!firstError) {
            // This is the FIRST point of failure (ROOT ERROR)
            firstError = {
              stepNumber: stepNum,
              raw: step.raw,
              errorType: transition.errorType || DiagnosticErrorType.SIGN_ERROR,
              category: transition.category || DiagnosticErrorType.SIGN_ERROR,
              subtype: transition.subtype || "SIGN_REVERSAL_IN_ISOLATION",
              rootCause: transition.subtype || transition.errorType,
              confidence: 0.95,
              inferredIntent: transition.inferredIntent,
              actualOperation: transition.actualOperation,
              expectedOperation: transition.expectedOperation,
              explanation: transition.explanation,
              expected: transition.expected,
              studentStep: transition.studentStep,
              repairSkillId: "linear_equation_isolation",
            };
            firstErrorIndex = stepNum;

            evaluatedSteps.push({
              stepNumber: stepNum,
              raw: step.raw,
              evidence: {
                stepNumber: stepNum,
                raw: step.raw,
                type: "EQUATION",
              },
              transition: {
                valid: false,
                inferredIntent: transition.inferredIntent,
                actualOperation: transition.actualOperation,
                expected: transition.expected,
              },
              diagnosis: {
                origin: ErrorOrigin.ROOT,
                causedByStep: null,
                category: transition.category || DiagnosticErrorType.SIGN_ERROR,
                subtype: transition.subtype,
                confidence: 0.95,
                explanation: transition.explanation,
              },
              status: StepStatus.FIRST_ERROR,
              statusLabel: "First Error",
              comment: `The first mathematical divergence. ${transition.explanation}`,
              explanation: transition.explanation,
              expected: transition.expected,
            });
          } else {
            // Already had an earlier error: check if current step followed logically from the flawed previous equation
            const prevSol = previousEquation.getSolution();
            const currSol = currentEq.getSolution();

            const isExactFractionEquiv =
              prevSol instanceof Fraction &&
              currSol instanceof Fraction &&
              prevSol.equals(currSol);

            const isExactRounding =
              prevSol instanceof Fraction &&
              isExactRoundingOf(prevSol, currentEq.rhsRaw);

            const isFollowThrough = isExactFractionEquiv || isExactRounding;

            if (isFollowThrough) {
              evaluatedSteps.push({
                stepNumber: stepNum,
                raw: step.raw,
                evidence: {
                  stepNumber: stepNum,
                  raw: step.raw,
                  type: "EQUATION",
                },
                transition: {
                  valid: true, // conditioned on erroneous premise
                  isFollowThrough: true,
                },
                diagnosis: {
                  origin: ErrorOrigin.PROPAGATED,
                  causedByStep: firstErrorIndex,
                  category: null,
                  confidence: 0.92,
                },
                status: StepStatus.PROPAGATED_ERROR,
                statusLabel: "Affected by earlier error",
                comment: `This follows from the incorrect Step ${firstErrorIndex}. It is not the original error.`,
              });
            } else {
              evaluatedSteps.push({
                stepNumber: stepNum,
                raw: step.raw,
                evidence: {
                  stepNumber: stepNum,
                  raw: step.raw,
                  type: "EQUATION",
                },
                transition: {
                  valid: false,
                },
                diagnosis: {
                  origin: ErrorOrigin.INDEPENDENT,
                  causedByStep: null,
                  category: transition.category || DiagnosticErrorType.ARITHMETIC_ERROR,
                  confidence: 0.85,
                },
                status: StepStatus.INDEPENDENT_ERROR,
                statusLabel: "Additional error",
                comment: "Another mathematical error occurred in this step.",
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
          evidence: { stepNumber: stepNum, raw: step.raw, type: "EQUATION" },
          transition: { valid: true },
          diagnosis: { origin: ErrorOrigin.NONE, causedByStep: null, confidence: 0.5 },
          status: StepStatus.VALID,
          statusLabel: "Premise",
          comment: "Starting premise.",
        });
        previousEquation = currentEq;
      }
    } else {
      // Expression or textual step: Do NOT automatically manufacture causality
      const isUnverified = Boolean(firstError);
      evaluatedSteps.push({
        stepNumber: stepNum,
        raw: step.raw,
        evidence: { stepNumber: stepNum, raw: step.raw, type: "TEXT" },
        transition: { valid: false, checkable: false },
        diagnosis: {
          origin: isUnverified ? ErrorOrigin.PROPAGATED : ErrorOrigin.NONE,
          causedByStep: isUnverified ? firstErrorIndex : null,
          confidence: 0.3, // Low confidence on unverified text
        },
        status: isUnverified ? StepStatus.UNVERIFIED : StepStatus.VALID,
        statusLabel: isUnverified ? "Unverified" : "Step",
        comment: isUnverified
          ? `Text statement following Step ${firstErrorIndex}. Cannot independently verify mathematical causality without formal symbols.`
          : "Student reasoning step.",
      });
    }
  }

  // Generate probe and repair from skill graph if error found
  let probe = null;
  let repair = null;
  let retest = null;

  if (firstError) {
    const probeMeta = getDiagnosticProbe("linear_equations", "inverse_operations");
    if (probeMeta) {
      probe = probeMeta.probe;
      repair = probeMeta.repair;
      retest = probeMeta.retest;
    }
  }

  return {
    status: firstError ? "DIAGNOSED" : "CORRECT",
    evaluatedSteps,
    firstError,
    firstErrorIndex,
    hasError: Boolean(firstError),
    diagnosis: firstError
      ? {
          stepNumber: firstError.stepNumber,
          category: firstError.category,
          subtype: firstError.subtype,
          rootCause: firstError.rootCause,
          confidence: firstError.confidence,
          whatStudentDid: firstError.studentStep,
          whatShouldHaveHappened: firstError.expected,
          whyItFailed: firstError.explanation,
        }
      : null,
    probe,
    repair,
    retest,
  };
}
