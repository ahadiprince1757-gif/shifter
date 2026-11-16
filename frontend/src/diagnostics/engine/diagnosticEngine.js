
/**
 * Diagnostic Engine
 *
 * Central orchestrator for deterministic pedagogical reasoning.
 *
 * Principles:
 * - Evidence before explanation.
 * - Never invent a student's reasoning.
 * - Preserve uncertainty when evidence is insufficient.
 * - Analyse working even when the final answer is blank or unreadable.
 * - Keep diagnosis, correction, repair and retest connected.
 * - Run locally without external AI inference APIs.
 */

import { DiagnosticStatus, InputType } from "./diagnosticTypes.js";
import { classifyInput } from "./inputClassifier.js";
import { interpretProblem } from "./problemInterpreter.js";
import { analyzeStudentSteps } from "../analyzers/stepAnalyzer.js";
import { diagnoseNumberClassification } from "../knowledge/numberSystems.js";
import { findKnownMisconception } from "../knowledge/misconceptionRegistry.js";
import { findCrossSubjectMisconception } from "../knowledge/subjectMisconceptions.js";
import { evaluateDiagnosticConfidence } from "./confidenceEvaluator.js";
import { formatTeacherFeedback } from "../feedback/didacticFormatter.js";
import { buildLinearEquationSolution } from "../correction/solutionBuilder.js";
import { getDiagnosticProbe } from "../knowledge/skillGraph.js";


/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Normalize only superficial differences.
 *
 * This deliberately does NOT attempt mathematical equivalence.
 * For example, 0.5 and 1/2 remain different until a verified
 * mathematical comparison is available.
 */
function normalizeComparableAnswer(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[×·]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/\s+/g, "");
}

function answersMatch(expected, submitted) {
  if (!expected || !submitted) return false;

  return (
    normalizeComparableAnswer(expected) ===
    normalizeComparableAnswer(submitted)
  );
}

function asString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function getSafeConfidence(confidence) {
  if (
    confidence &&
    typeof confidence === "object" &&
    typeof confidence.score === "number" &&
    confidence.level
  ) {
    return confidence;
  }

  return {
    level: "low",
    score: 0,
  };
}

function getQuestionObject(question, questionText) {
  if (typeof question === "object" && question !== null) {
    return question;
  }

  return {
    q: String(question || questionText || ""),
  };
}


/* -------------------------------------------------------------------------- */
/* Diagnostic Engine                                                          */
/* -------------------------------------------------------------------------- */

export class DiagnosticEngine {
  /**
   * Main diagnostic pipeline.
   *
   * @param {Object} submission
   * @param {Object|string} submission.question
   * @param {string} submission.questionText
   * @param {string} submission.correctAnswer
   * @param {string} submission.studentAnswer
   * @param {string} submission.userWork
   * @param {Array<string>} submission.options
   * @param {string} submission.subject
   * @param {string} submission.topic
   * @param {Object} submission.curriculum
   * @param {boolean|null} submission.isAnswerCorrect
   */
  async analyze({
    question,
    questionText = "",
    correctAnswer = "",
    studentAnswer = "",
    userWork = "",
    options = [],
    subject = "Mathematics",
    topic = "",
    curriculum = {},
    isAnswerCorrect = null,
  } = {}) {
    const qObj = getQuestionObject(question, questionText);

    const qText = asString(qObj.q || questionText);
    const expected = asString(qObj.ans || correctAnswer);
    const studentAns = asString(studentAnswer);
    const working = asString(userWork);

    const hasStudentAnswer = Boolean(studentAns);
    const hasWorking = Boolean(working);

    const questionOptions = asArray(
      options.length > 0 ? options : qObj.options
    );

    /* ---------------------------------------------------------------------- */
    /* 1. Understand the question                                             */
    /* ---------------------------------------------------------------------- */

    const problemInfo = interpretProblem({
      question: qObj,
      questionText: qText,
      correctAnswer: expected,
      options: questionOptions,
      curriculum,
    });

    /* ---------------------------------------------------------------------- */
    /* 2. Classify the submission                                             */
    /* ---------------------------------------------------------------------- */

    const inputClassification = classifyInput(
      studentAns,
      questionOptions
    );

    /* ---------------------------------------------------------------------- */
    /* 3. Handle a genuinely empty submission                                 */
    /* ---------------------------------------------------------------------- */

    if (!hasStudentAnswer && !hasWorking) {
      const confidence = getSafeConfidence(
        evaluateDiagnosticConfidence({
          isBlank: true,
        })
      );

      return formatResult({
        status: DiagnosticStatus.BLANK,
        inputClassification,
        problemInfo,
        expected,
        studentAns,
        confidence,
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 4. Reject unreadable input only when no usable working exists          */
    /* ---------------------------------------------------------------------- */

    if (
      inputClassification.type === InputType.GIBBERISH &&
      !hasWorking
    ) {
      const confidence = getSafeConfidence(
        evaluateDiagnosticConfidence({
          hasInputMash: true,
        })
      );

      return formatResult({
        status: DiagnosticStatus.UNRECOGNIZED,
        inputClassification,
        problemInfo,
        expected,
        studentAns,
        confidence,
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 5. Determine correctness                                               */
    /* ---------------------------------------------------------------------- */

    /**
     * An explicit grading decision takes precedence over string matching.
     *
     * If the caller explicitly says false, do not silently override that
     * decision merely because two strings happen to look identical.
     *
     * If no grading decision was supplied, use conservative normalized
     * text equality. Mathematical equivalence belongs in a verified
     * mathematical comparison layer, not here.
     */
    const isCorrect = hasStudentAnswer && (
      typeof isAnswerCorrect === "boolean"
        ? isAnswerCorrect
        : answersMatch(expected, studentAns)
    );

    if (isCorrect) {
      const confidence = getSafeConfidence(
        evaluateDiagnosticConfidence({
          isCorrect: true,
        })
      );

      return formatResult({
        status: DiagnosticStatus.CORRECT,
        inputClassification,
        problemInfo,
        expected,
        studentAns,
        confidence,
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 6. Analyse actual student working                                      */
    /* ---------------------------------------------------------------------- */

    let stepAnalysisResult = null;

    if (hasWorking) {
      stepAnalysisResult = analyzeStudentSteps({
        userWork: working,
        initialEquationStr: problemInfo.equationStr || qText,
        parsedInitialEquation: problemInfo.parsedEquation,
        expectedAnswer: expected,
      });
    }

    /**
     * A verified error in the student's actual working is stronger evidence
     * than a final-answer pattern.
     */
    if (stepAnalysisResult?.hasError) {
      const confidence = getSafeConfidence(
        evaluateDiagnosticConfidence({
          hasWorkingSteps: true,
          stepErrorFound: true,
          transitionVerified: true,
          rootCauseSupported: Boolean(
            stepAnalysisResult.diagnosis?.rootCause
          ),
          errorClassificationVerified: Boolean(
            stepAnalysisResult.diagnosis?.category
          ),
        })
      );

      return formatResult({
        status: DiagnosticStatus.DIAGNOSED,
        inputClassification,
        problemInfo,
        stepAnalysis: stepAnalysisResult,
        expected,
        studentAns,
        confidence,
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 7. Number classification                                               */
    /* ---------------------------------------------------------------------- */

    if (
      hasStudentAnswer &&
      problemInfo.type === "NUMBER_CLASSIFICATION"
    ) {
      const numberDiagnosis = diagnoseNumberClassification({
        studentInput: studentAns,
        targetSet: problemInfo.targetSet,
        options: problemInfo.options,
        curriculum,
      });

      if (numberDiagnosis?.errorType) {
        const confidence = getSafeConfidence(
          evaluateDiagnosticConfidence({
            distractorMatched: true,

            // A known incorrect answer is useful evidence,
            // but does not independently prove the student's reasoning.
            rootCauseSupported: false,

            errorClassificationVerified: true,
          })
        );

        return formatResult({
          status: DiagnosticStatus.DIAGNOSED,
          inputClassification,
          problemInfo,
          misconception: numberDiagnosis,
          expected,
          studentAns,
          confidence,
        });
      }
    }

    /* ---------------------------------------------------------------------- */
    /* 8. Known subject-specific misconceptions                               */
    /* ---------------------------------------------------------------------- */

    if (hasStudentAnswer) {
      const registryMatch = findKnownMisconception({
        studentAnswer: studentAns,
        questionText: qText,
        expectedAnswer: expected,
        problemInfo,
      });

      if (registryMatch) {
        const confidence = getSafeConfidence(
          evaluateDiagnosticConfidence({
            distractorMatched: true,
            rootCauseSupported: false,
            errorClassificationVerified: true,
          })
        );

        return formatResult({
          status: DiagnosticStatus.DIAGNOSED,
          inputClassification,
          problemInfo,
          misconception: registryMatch,
          expected,
          studentAns,
          confidence,
        });
      }
    }

    /* ---------------------------------------------------------------------- */
    /* 9. Cross-subject misconception matching                               */
    /* ---------------------------------------------------------------------- */

    if (hasStudentAnswer) {
      const crossSubjectMatch = findCrossSubjectMisconception({
        studentAnswer: studentAns,
        questionText: qText,
        expectedAnswer: expected,

        // Prefer the interpreted subject, but retain the caller's subject
        // when the interpreter has not identified one.
        subject: problemInfo.subject || subject,

        questionObj: qObj,
      });

      if (crossSubjectMatch) {
        const confidence = getSafeConfidence(
          evaluateDiagnosticConfidence({
            distractorMatched: true,
            rootCauseSupported: false,
            errorClassificationVerified: true,
          })
        );

        return formatResult({
          status: DiagnosticStatus.DIAGNOSED,
          inputClassification,
          problemInfo,
          misconception: crossSubjectMatch,
          expected,
          studentAns,
          confidence,
        });
      }
    }

    /* ---------------------------------------------------------------------- */
    /* 10. Honest inconclusive result                                          */
    /* ---------------------------------------------------------------------- */

    const confidence = getSafeConfidence(
      evaluateDiagnosticConfidence({
        isUnknownDeviation: true,
      })
    );

    return formatResult({
      status: DiagnosticStatus.INCONCLUSIVE,
      inputClassification,
      problemInfo,
      stepAnalysis: stepAnalysisResult,
      expected,
      studentAns,
      confidence,
    });
  }
}


/* -------------------------------------------------------------------------- */
/* Result construction                                                        */
/* -------------------------------------------------------------------------- */

function formatResult({
  status,
  inputClassification,
  problemInfo,
  stepAnalysis = null,
  misconception = null,
  expected = "",
  studentAns = "",
  confidence,
}) {
  const safeConfidence = getSafeConfidence(confidence);

  const teacherFeedback = formatTeacherFeedback({
    status,
    inputInfo: inputClassification,
    problemInfo,
    stepAnalysis,
    misconception,
    confidence: safeConfidence,
    expectedAnswer: expected,
    studentAnswer: studentAns,
  });

  /* ------------------------------------------------------------------------ */
  /* Verified correction                                                      */
  /* ------------------------------------------------------------------------ */

  let correction = {
    verified: false,
    steps: asArray(problemInfo.steps).length > 0
      ? problemInfo.steps
      : expected
        ? [`Expected answer: ${expected}`]
        : [],
  };

  if (problemInfo.equationStr) {
    const verifiedSolution = buildLinearEquationSolution(
      problemInfo.equationStr
    );

    if (verifiedSolution) {
      correction = {
        verified: Boolean(verifiedSolution.verified),
        steps: asArray(verifiedSolution.steps),
      };
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Diagnostic probe, repair and retest                                      */
  /* ------------------------------------------------------------------------ */

  let probe = stepAnalysis?.probe || misconception?.probe || null;
  let repair = stepAnalysis?.repair || misconception?.repair || null;
  let retest = stepAnalysis?.retest || misconception?.retest || null;

  if (
    !probe &&
    problemInfo.type === "AVERAGE_SPEED" &&
    status !== DiagnosticStatus.CORRECT
  ) {
    const metadata = getDiagnosticProbe(
      "average_speed",
      "formula_selection"
    );

    if (metadata) {
      probe = metadata.probe;
      repair = metadata.repair;
      retest = metadata.retest;
    }
  } else if (
    !probe &&
    problemInfo.type === "NUMBER_CLASSIFICATION" &&
    status !== DiagnosticStatus.CORRECT
  ) {
    const metadata = getDiagnosticProbe(
      "number_classification",
      "natural_number_definition"
    );

    if (metadata) {
      probe = metadata.probe;
      repair = metadata.repair;
      retest = metadata.retest;
    }
  } else if (
    !probe &&
    problemInfo.type === "FRACTION_ARITHMETIC" &&
    status !== DiagnosticStatus.CORRECT
  ) {
    const metadata = getDiagnosticProbe(
      "fraction_addition",
      "common_denominator"
    );

    if (metadata) {
      probe = metadata.probe;
      repair = metadata.repair;
      retest = metadata.retest;
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Structured response                                                      */
  /* ------------------------------------------------------------------------ */

  const evaluatedSteps = asArray(stepAnalysis?.evaluatedSteps);
  const feedback = teacherFeedback || {};

  const whyThisIsWrong = asArray(feedback.whyThisIsWrong);
  const theRightWay = asArray(feedback.theRightWay);

  return {
    ...feedback,

    status,

    input: {
      type: inputClassification?.type || InputType.UNKNOWN,
      recognized: inputClassification?.recognized ?? false,
      raw: inputClassification?.raw || studentAns,
    },

    result: {
      correct: status === DiagnosticStatus.CORRECT,
      expectedAnswer: expected,
    },

    evidence: {
      workShown: evaluatedSteps.length > 0,
      rawInput: studentAns,
      steps: evaluatedSteps,
    },

    diagnosis: {
      errorType: feedback.errorType || null,

      category:
        stepAnalysis?.diagnosis?.category ||
        feedback.errorType ||
        null,

      subtype:
        stepAnalysis?.diagnosis?.subtype ||
        null,

      rootCause:
        stepAnalysis?.diagnosis?.rootCause ||
        feedback.errorType ||
        null,

      concept: misconception?.concept || null,

      firstErrorStep: feedback.firstErrorStep || null,

      explanation: whyThisIsWrong[0] || "",

      whatStudentDid: feedback.whatYouDid || "",

      whatShouldHaveHappened: theRightWay[0] || "",
    },

    steps: evaluatedSteps,

    correction,

    probe,
    repair,

    retest: retest
      ? {
          required: status !== DiagnosticStatus.CORRECT,
          ...retest,
        }
      : {
          required: false,
        },

    feedback: {
      approach: feedback.whatYouDid || "",
      whatWentWrong: whyThisIsWrong.join(" "),
      rightWay: theRightWay.join("\n"),
      ruleToRemember: feedback.remember || "",
    },

    confidence: {
      ...safeConfidence,
      score: safeConfidence.score,
      level: safeConfidence.level,
    },
  };
}


export const diagnosticEngine = new DiagnosticEngine();

export default diagnosticEngine;
