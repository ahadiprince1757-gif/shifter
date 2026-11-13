/**
 * Diagnostic Engine.
 * Central Orchestrator for deterministic pedagogical reasoning and error diagnosis.
 *
 * Runs 100% locally:
 * - NO external AI inference APIs (OpenAI, Gemini, Claude, etc.)
 * - Zero per-question charges
 * - Mathematical AST parsing, symbolic verification, and misconception matching.
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

export class DiagnosticEngine {
  /**
   * Main analysis pipeline.
   *
   * @param {Object} submission
   * @param {Object|string} submission.question - Question object or text
   * @param {string} submission.questionText - Alternative question text string
   * @param {string} submission.correctAnswer - Expected answer
   * @param {string} submission.studentAnswer - Submitted student answer
   * @param {string} submission.userWork - Student's step-by-step working
   * @param {Array<string>} submission.options - Multiple-choice options
   * @param {string} submission.subject - Subject name
   * @param {string} submission.topic - Topic name
   * @param {Object} submission.curriculum - Curriculum options (e.g. natural numbers include zero)
   * @param {boolean} submission.isAnswerCorrect - Pre-evaluated correctness flag if available
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
  }) {
    const qObj = typeof question === "object" && question !== null ? question : { q: String(question || questionText) };
    const qText = String(qObj.q || questionText || "").trim();
    const expected = String(qObj.ans || correctAnswer || "").trim();
    const studentAns = String(studentAnswer || "").trim();
    const working = String(userWork || "").trim();

    // 1. Problem Understanding
    const problemInfo = interpretProblem({
      question: qObj,
      questionText: qText,
      correctAnswer: expected,
      options: options.length > 0 ? options : (qObj.options || []),
      curriculum,
    });

    // 2. Input Classification
    const inputClassification = classifyInput(studentAns, problemInfo.options);

    // If input is blank
    if (inputClassification.type === InputType.BLANK && !working) {
      const conf = evaluateDiagnosticConfidence({ isBlank: true });
      return formatResult({
        status: DiagnosticStatus.BLANK,
        inputClassification,
        problemInfo,
        expected,
        studentAns,
        confidence: conf,
      });
    }

    // If input is gibberish / unreadable keyboard mash
    if (inputClassification.type === InputType.GIBBERISH) {
      const conf = evaluateDiagnosticConfidence({ hasInputMash: true });
      return formatResult({
        status: DiagnosticStatus.UNRECOGNIZED,
        inputClassification,
        problemInfo,
        expected,
        studentAns,
        confidence: conf,
      });
    }

    // Check if the answer is explicitly correct
    const isCorrect = isAnswerCorrect === true || (
      expected && studentAns && expected.toLowerCase() === studentAns.toLowerCase()
    );

    if (isCorrect) {
      const conf = evaluateDiagnosticConfidence({ isCorrect: true });
      return formatResult({
        status: DiagnosticStatus.CORRECT,
        inputClassification,
        problemInfo,
        expected,
        studentAns,
        confidence: conf,
      });
    }

    // 3. Step Analysis (if working was provided or for equations)
    let stepAnalysisResult = null;
    if (working) {
      stepAnalysisResult = analyzeStudentSteps({
        userWork: working,
        initialEquationStr: problemInfo.equationStr || qText,
        parsedInitialEquation: problemInfo.parsedEquation,
        expectedAnswer: expected,
      });
    }

    if (stepAnalysisResult && stepAnalysisResult.hasError) {
      const conf = evaluateDiagnosticConfidence({
        hasWorkingSteps: true,
        stepErrorFound: true,
        transitionVerified: true,
        rootCauseSupported: Boolean(stepAnalysisResult.diagnosis?.rootCause),
        errorClassificationVerified: Boolean(stepAnalysisResult.diagnosis?.category),
      });

      return formatResult({
        status: DiagnosticStatus.DIAGNOSED,
        inputClassification,
        problemInfo,
        stepAnalysis: stepAnalysisResult,
        expected,
        studentAns,
        confidence: conf,
      });
    }

    // 4. Misconception Knowledge Engine
    // 4a. Number classification problem (e.g. natural number distractors)
    if (problemInfo.type === "NUMBER_CLASSIFICATION") {
      const numberDiagnosis = diagnoseNumberClassification({
        studentInput: studentAns,
        targetSet: problemInfo.targetSet,
        options: problemInfo.options,
        curriculum,
      });

      if (numberDiagnosis && numberDiagnosis.errorType) {
        const conf = evaluateDiagnosticConfidence({
          distractorMatched: true,
          rootCauseSupported: true,
          errorClassificationVerified: true,
        });
        return formatResult({
          status: DiagnosticStatus.DIAGNOSED,
          inputClassification,
          problemInfo,
          misconception: numberDiagnosis,
          expected,
          studentAns,
          confidence: conf,
        });
      }
    }

    // 4b. Known arithmetic / BODMAS / fraction misconceptions
    const registryMatch = findKnownMisconception({
      studentAnswer: studentAns,
      questionText: qText,
      expectedAnswer: expected,
      problemInfo,
    });

    if (registryMatch) {
      const conf = evaluateDiagnosticConfidence({
        distractorMatched: true,
        rootCauseSupported: true,
        errorClassificationVerified: true,
      });
      return formatResult({
        status: DiagnosticStatus.DIAGNOSED,
        inputClassification,
        problemInfo,
        misconception: registryMatch,
        expected,
        studentAns,
        confidence: conf,
      });
    }

    // 4c. Cross-Disciplinary Misconceptions (Physics, Chemistry, Biology, English, Computer Studies)
    const crossSubjectMatch = findCrossSubjectMisconception({
      studentAnswer: studentAns,
      questionText: qText,
      expectedAnswer: expected,
      subject: problemInfo.subject || "",
      questionObj: typeof question === "object" ? question : {},
    });

    if (crossSubjectMatch) {
      const conf = evaluateDiagnosticConfidence({
        distractorMatched: true,
        rootCauseSupported: true,
        errorClassificationVerified: true,
      });
      return formatResult({
        status: DiagnosticStatus.DIAGNOSED,
        inputClassification,
        problemInfo,
        misconception: crossSubjectMatch,
        expected,
        studentAns,
        confidence: conf,
      });
    }

    // 5. Inconclusive Fallback (Honest uncertainty: don't fabricate diagnosis)
    const conf = evaluateDiagnosticConfidence({ isUnknownDeviation: true });
    return formatResult({
      status: DiagnosticStatus.INCONCLUSIVE,
      inputClassification,
      problemInfo,
      expected,
      studentAns,
      confidence: conf,
    });
  }
}

/**
 * Normalizes and formats the final result object.
 */
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
  const teacherFeedback = formatTeacherFeedback({
    status,
    inputInfo: inputClassification,
    problemInfo,
    stepAnalysis,
    misconception,
    confidence,
    expectedAnswer: expected,
    studentAnswer: studentAns,
  });

  // Build verified correction if available
  let correction = {
    verified: false,
    steps: problemInfo.steps || (expected ? [`Expected answer: ${expected}`] : []),
  };

  if (problemInfo.equationStr) {
    const verifiedSol = buildLinearEquationSolution(problemInfo.equationStr);
    if (verifiedSol) {
      correction = {
        verified: verifiedSol.verified,
        steps: verifiedSol.steps,
      };
    }
  }

  // Diagnostic Probe, Repair & Retest from Step Verification, Misconception, or Skill Graph
  let probe = stepAnalysis?.probe || misconception?.probe || null;
  let repair = stepAnalysis?.repair || misconception?.repair || null;
  let retest = stepAnalysis?.retest || misconception?.retest || null;

  if (!probe && problemInfo.type === "AVERAGE_SPEED" && status !== DiagnosticStatus.CORRECT) {
    const speedProbeMeta = getDiagnosticProbe("average_speed", "formula_selection");
    if (speedProbeMeta) {
      probe = speedProbeMeta.probe;
      repair = speedProbeMeta.repair;
      retest = speedProbeMeta.retest;
    }
  } else if (!probe && problemInfo.type === "NUMBER_CLASSIFICATION" && status !== DiagnosticStatus.CORRECT) {
    const numProbeMeta = getDiagnosticProbe("number_classification", "natural_number_definition");
    if (numProbeMeta) {
      probe = numProbeMeta.probe;
      repair = numProbeMeta.repair;
      retest = numProbeMeta.retest;
    }
  } else if (!probe && problemInfo.type === "FRACTION_ARITHMETIC" && status !== DiagnosticStatus.CORRECT) {
    const fracProbeMeta = getDiagnosticProbe("fraction_addition", "common_denominator");
    if (fracProbeMeta) {
      probe = fracProbeMeta.probe;
      repair = fracProbeMeta.repair;
      retest = fracProbeMeta.retest;
    }
  }

  // Structured 10x diagnostic response
  return {
    ...teacherFeedback, // Contains whatYouDid, whyThisIsWrong, theRightWay, remember, stepAnalysis, evidence
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
      workShown: Boolean(stepAnalysis?.evaluatedSteps?.length > 0),
      rawInput: studentAns,
      steps: stepAnalysis?.evaluatedSteps || [],
    },
    diagnosis: {
      errorType: teacherFeedback.errorType || null,
      category: stepAnalysis?.diagnosis?.category || teacherFeedback.errorType || null,
      subtype: stepAnalysis?.diagnosis?.subtype || null,
      rootCause: stepAnalysis?.diagnosis?.rootCause || teacherFeedback.errorType || null,
      concept: misconception?.concept || null,
      firstErrorStep: teacherFeedback.firstErrorStep || null,
      explanation: teacherFeedback.whyThisIsWrong?.[0] || "",
      whatStudentDid: teacherFeedback.whatYouDid || "",
      whatShouldHaveHappened: teacherFeedback.theRightWay?.[0] || "",
    },
    steps: stepAnalysis?.evaluatedSteps || [],
    correction,
    probe,
    repair,
    retest: retest ? { required: status !== DiagnosticStatus.CORRECT, ...retest } : { required: false },
    feedback: {
      approach: teacherFeedback.whatYouDid || "",
      whatWentWrong: teacherFeedback.whyThisIsWrong?.join(" ") || "",
      rightWay: teacherFeedback.theRightWay?.join("\n") || "",
      ruleToRemember: teacherFeedback.remember || "",
    },
    confidence: {
      ...confidence,
      score: confidence.score,
      level: confidence.level,
    },
  };
}

export const diagnosticEngine = new DiagnosticEngine();
export default diagnosticEngine;
