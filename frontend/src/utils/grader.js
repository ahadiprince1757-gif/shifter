/**
 * TIXAR GRADER
 *
 * Responsibilities:
 *
 * 1. Validate / verify the question
 * 2. Determine final-answer correctness
 * 3. Evaluate working separately
 * 4. Run Smart Answer Analyser
 * 5. Return structured evidence
 *
 * Important architectural rule:
 *
 * ANSWER CORRECTNESS
 *      ≠
 * UNDERSTANDING
 *      ≠
 * REASONING QUALITY
 *
 * This allows Tixar to eventually build a reliable
 * student knowledge model and "Am I Ready?" system.
 */

import { analyseStudentAnswer } from "./answerAnalyzer.js";

import {
  verifyQuestionAcrossSubjects,
} from "./subjectVerifierRouter.js";

// ============================================================================
// NORMALIZATION
// ============================================================================

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\p{L}\p{N}\s.,=+\-*/()%^]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  const normalized = normalize(value);

  return normalized
    ? normalized.split(/\s+/).filter(Boolean)
    : [];
}

// ============================================================================
// NUMERIC UTILITIES
// ============================================================================

function extractNumbers(value) {
  return (
    String(value ?? "").match(
      /-?\d+(?:\.\d+)?/g
    ) || []
  ).map(Number);
}

function extractFinalNumericValue(value) {
  const text = String(value ?? "").trim();

  if (!text) return null;

  // Last line is usually the student's conclusion.
  const lines = text
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean);

  const lastLine =
    lines[lines.length - 1] || text;

  // Example:
  // x = 42
  // answer = -3.5
  const equalityMatch =
    lastLine.match(
      /=\s*(-?\d+(?:\.\d+)?)\s*$/
    );

  if (equalityMatch) {
    return Number(equalityMatch[1]);
  }

  // If no equality, use the final number.
  const numbers =
    extractNumbers(lastLine);

  if (numbers.length) {
    return numbers[numbers.length - 1];
  }

  return null;
}

// ============================================================================
// NUMERIC CORRECTNESS
// ============================================================================

function checkNumericAnswer(
  userAnswer,
  correctAnswer
) {
  const correctText =
    String(correctAnswer ?? "");

  const correctNumbers =
    extractNumbers(correctText);

  if (!correctNumbers.length) {
    return null;
  }

  // Only automatically treat a single-number answer as numeric.
  if (correctNumbers.length !== 1) {
    return null;
  }

  const target =
    correctNumbers[0];

  const student =
    extractFinalNumericValue(
      userAnswer
    );

  if (
    student === null ||
    Number.isNaN(student)
  ) {
    return false;
  }

  return (
    Math.abs(student - target) <
    1e-5
  );
}

// ============================================================================
// TEXTUAL ANSWER CHECKING
// ============================================================================

function exactOrPhraseMatch(
  userAnswer,
  correctAnswer
) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  if (!user || !correct) {
    return false;
  }

  if (user === correct) {
    return true;
  }

  /*
   * IMPORTANT:
   *
   * We only use substring matching for reasonably
   * long answers.
   *
   * "cell" should NOT make an answer correct merely
   * because "cell" occurs inside a sentence.
   */

  if (
    correct.length >= 12 &&
    user.includes(correct)
  ) {
    return true;
  }

  return false;
}

// ============================================================================
// TOKEN-BASED TEXT CHECKING
// ============================================================================

function keywordSimilarity(
  userAnswer,
  correctAnswer
) {
  const userTokens =
    new Set(tokenize(userAnswer));

  const correctTokens =
    tokenize(correctAnswer);

  const meaningfulCorrectTokens =
    correctTokens.filter(
      (token) =>
        token.length >= 4 &&
        !Number.isNaN(Number(token))
    );

  if (!meaningfulCorrectTokens.length) {
    return null;
  }

  const matched =
    meaningfulCorrectTokens.filter(
      (token) =>
        userTokens.has(token)
    );

  const ratio =
    matched.length /
    meaningfulCorrectTokens.length;

  /*
   * IMPORTANT:
   *
   * We deliberately use a high threshold.
   *
   * Keyword overlap should be a fallback,
   * not the main definition of understanding.
   */

  return {
    ratio,
    matched: matched.length,
    total:
      meaningfulCorrectTokens.length,
  };
}

// ============================================================================
// SINGLE ANSWER CHECK
// ============================================================================

function checkSingleVariant(
  userAnswer,
  correctAnswer
) {
  const user =
    normalize(userAnswer);

  const correct =
    normalize(correctAnswer);

  if (!user || !correct) {
    return {
      correct: user === correct,
      method: "empty_or_exact",
      confidence: 1,
    };
  }

  // ----------------------------------------------------------
  // 1. Exact textual match
  // ----------------------------------------------------------

  if (user === correct) {
    return {
      correct: true,
      method: "exact",
      confidence: 1,
    };
  }

  // ----------------------------------------------------------
  // 2. Numerical / equation answer
  // ----------------------------------------------------------

  const numericResult =
    checkNumericAnswer(
      userAnswer,
      correctAnswer
    );

  if (numericResult !== null) {
    return {
      correct: numericResult,
      method: "numeric",
      confidence: 0.98,
    };
  }

  // ----------------------------------------------------------
  // 3. Long exact phrase
  // ----------------------------------------------------------

  if (
    exactOrPhraseMatch(
      userAnswer,
      correctAnswer
    )
  ) {
    return {
      correct: true,
      method: "phrase",
      confidence: 0.96,
    };
  }

  // ----------------------------------------------------------
  // 4. Conservative keyword fallback
  // ----------------------------------------------------------

  const similarity =
    keywordSimilarity(
      userAnswer,
      correctAnswer
    );

  if (
    similarity &&
    similarity.total >= 2 &&
    similarity.ratio >= 0.85
  ) {
    return {
      correct: true,
      method: "keyword_fallback",
      confidence: 0.78,
      similarity,
    };
  }

  return {
    correct: false,
    method: "no_sufficient_match",
    confidence: 0.9,
    similarity,
  };
}

// ============================================================================
// MULTI-PART ANSWERS
// ============================================================================

function checkMultiPartAnswer(
  userAnswer,
  answerList
) {
  const user =
    normalize(userAnswer);

  const results =
    answerList.map((answer) => ({
      answer,
      result:
        checkSingleVariant(
          user,
          answer
        ),
    }));

  const matched =
    results.filter(
      (item) =>
        item.result.correct
    );

  return {
    correct:
      matched.length ===
      answerList.length,

    matchedCount:
      matched.length,

    totalRequired:
      answerList.length,

    percent:
      answerList.length
        ? Math.round(
            (matched.length /
              answerList.length) *
              100
          )
        : 0,

    results,
  };
}

// ============================================================================
// MULTI-PART DETECTION
// ============================================================================

function detectMultiPartQuestion(
  question
) {
  if (question.multi_part) {
    return true;
  }

  const stem =
    String(
      question.q ||
      question.stem ||
      ""
    ).toLowerCase();

  return /\b(four|4|three|3|two|2|both|all|list|name\s+the|identify\s+the|give\s+the)\b/i.test(stem);
}

// ============================================================================
// WORKING ANALYSIS
// ============================================================================

function analyseWorking(
  userWork,
  question,
  verifiedSteps
) {
  if (!userWork?.trim()) {
    return {
      provided: false,
      status: "not_provided",
      confidence: 1,
      score: null,
    };
  }

  const steps =
    verifiedSteps ||
    question.steps;

  if (
    !Array.isArray(steps) ||
    steps.length === 0
  ) {
    return {
      provided: true,
      status: "not_verifiable",
      confidence: 0.2,
      score: null,
    };
  }

  const workTokens =
    new Set(tokenize(userWork));

  const stepTokens =
    tokenize(steps.join(" "));

  if (!stepTokens.length) {
    return {
      provided: true,
      status: "not_verifiable",
      confidence: 0.2,
      score: null,
    };
  }

  const matched =
    stepTokens.filter(
      (token) =>
        token.length > 2 &&
        workTokens.has(token)
    );

  const ratio =
    matched.length /
    stepTokens.length;

  let status;

  if (ratio >= 0.65) {
    status = "substantial";
  } else if (ratio >= 0.35) {
    status = "partial";
  } else {
    status = "weak";
  }

  return {
    provided: true,
    status,
    confidence: 0.5,
    score: Math.round(
      ratio * 100
    ),
  };
}

// ============================================================================
// QUESTION VERIFICATION
// ============================================================================

function verifyQuestion(
  questionText,
  rawAnswer,
  question
) {
  if (!questionText) {
    return {
      rawAnswer,
      solution:
        question.sol ||
        question.why ||
        question.explain ||
        "Review the answer.",
      steps:
        Array.isArray(question.steps)
          ? question.steps
          : null,
      verification: {
        attempted: false,
        status: "not_attempted",
      },
    };
  }

  try {
    const verification =
      verifyQuestionAcrossSubjects(
        questionText,
        rawAnswer,
        question
      );

    let verifiedAnswer =
      rawAnswer;

    let solution =
      question.sol ||
      question.why ||
      question.explain ||
      "Review the answer.";

    let steps =
      Array.isArray(question.steps) &&
      question.steps.length
        ? question.steps
        : null;

    if (
      verification?.wasOverridden
    ) {
      verifiedAnswer =
        verification.verifiedAnswer;

      console.warn(
        `[Tixar Grader] Question verifier proposed an answer override for: "${questionText}"`
      );
    }

    if (
      verification?.explanation
    ) {
      solution =
        verification.explanation;
    }

    if (
      verification?.verifiedSteps &&
      !steps
    ) {
      steps =
        verification.verifiedSteps;
    }

    return {
      rawAnswer,
      verifiedAnswer,
      solution,
      steps,

      verification: {
        attempted: true,
        status:
          verification.wasOverridden
            ? "override_proposed"
            : "verified_or_unchanged",

        subject:
          verification.subject ||
          null,

        confidence:
          verification.confidence ??
          null,

        explanation:
          verification.explanation ||
          null,
      },
    };
  } catch (error) {
    console.warn(
      "[Tixar Grader] Question verification failed:",
      error
    );

    return {
      rawAnswer,
      verifiedAnswer: rawAnswer,

      solution:
        question.sol ||
        question.why ||
        question.explain ||
        "Review the answer.",

      steps:
        Array.isArray(question.steps)
          ? question.steps
          : null,

      verification: {
        attempted: true,
        status: "failed",
        error:
          error?.message ||
          String(error),
      },
    };
  }
}

// ============================================================================
// MAIN EVALUATOR
// ============================================================================

export function evaluateAnswer(
  userAnswer,
  question,
  userWork = ""
) {
  // ----------------------------------------------------------
  // Missing question
  // ----------------------------------------------------------

  if (!question) {
    return {
      isCorrect: false,

      isAnswerCorrect: false,

      isWorkCorrect: null,

      correctAnswer: "",

      correctAnswerList: [],

      solution:
        "Question details unavailable.",

      steps: [],

      mark: "Incorrect",

      analysis: {
        type: "diagnostic_analysis",

        diagnosis: {
          type: "question_unavailable",
          severity: "high",
        },

        diagnosticConfidence: 1,
      },
    };
  }

  // ----------------------------------------------------------
  // Extract question data
  // ----------------------------------------------------------

  let rawAnswer =
    question.ans;

  const questionText =
    question.q ||
    question.stem ||
    "";

  // ----------------------------------------------------------
  // Verify question
  // ----------------------------------------------------------

  const verified =
    verifyQuestion(
      questionText,
      rawAnswer,
      question
    );

  rawAnswer =
    verified.verifiedAnswer;

  const solution =
    verified.solution;

  const verifiedSteps =
    verified.steps;

  // ----------------------------------------------------------
  // Enriched question passed to analyser
  // ----------------------------------------------------------

  const enrichedQuestion = {
    ...question,

    ans: rawAnswer,

    ...(verifiedSteps
      ? {
          steps: verifiedSteps,
        }
      : {}),
  };

  // ----------------------------------------------------------
  // Determine answer correctness
  // ----------------------------------------------------------

  const isMultiPart =
    detectMultiPartQuestion(
      question
    );

  let isAnswerCorrect;

  let partialInfo = null;

  let answerEvaluation;

  if (
    Array.isArray(rawAnswer)
  ) {
    if (isMultiPart) {
      const multipart =
        checkMultiPartAnswer(
          userAnswer,
          rawAnswer
        );

      isAnswerCorrect =
        multipart.correct;

      answerEvaluation =
        multipart;

      if (
        multipart.matchedCount <
        multipart.totalRequired
      ) {
        partialInfo = {
          matchedCount:
            multipart.matchedCount,

          totalRequired:
            multipart.totalRequired,

          percent:
            multipart.percent,
        };
      }
    } else {
      const results =
        rawAnswer.map(
          (variant) =>
            checkSingleVariant(
              userAnswer,
              variant
            )
        );

      const successful =
        results.find(
          (result) =>
            result.correct
        );

      isAnswerCorrect =
        Boolean(successful);

      answerEvaluation = {
        correct:
          isAnswerCorrect,

        method:
          successful?.method ||
          "none",

        confidence:
          successful?.confidence ||
          0,

        variants:
          results,
      };
    }
  } else {
    answerEvaluation =
      checkSingleVariant(
        userAnswer,
        rawAnswer
      );

    isAnswerCorrect =
      answerEvaluation.correct;
  }

  // ----------------------------------------------------------
  // Working
  // ----------------------------------------------------------

  const workingEvaluation =
    analyseWorking(
      userWork,
      question,
      verifiedSteps
    );

  /*
   * DO NOT turn:
   *
   * correct answer + weak working
   *
   * into simply "incorrect".
   *
   * These are separate dimensions.
   */

  const isWorkCorrect =
    userWork?.trim()
      ? workingEvaluation.status ===
        "substantial"
      : null;

  // ----------------------------------------------------------
  // Rich diagnostic analysis
  // ----------------------------------------------------------

  const analysis =
    analyseStudentAnswer(
      userAnswer,
      Array.isArray(rawAnswer)
        ? rawAnswer.join(" • ")
        : String(rawAnswer ?? ""),
      enrichedQuestion,
      userWork,
      {
        isAnswerCorrect,
      }
    );

  // ----------------------------------------------------------
  // Overall status
  // ----------------------------------------------------------

  let status;

  if (
    isAnswerCorrect &&
    isWorkCorrect === true
  ) {
    status =
      "correct_with_supported_reasoning";
  } else if (
    isAnswerCorrect &&
    isWorkCorrect === false
  ) {
    status =
      "correct_answer_weak_or_invalid_reasoning";
  } else if (
    !isAnswerCorrect &&
    isWorkCorrect === true
  ) {
    status =
      "incorrect_final_answer_with_reasoning_evidence";
  } else if (
    partialInfo
  ) {
    status =
      "partially_correct";
  } else {
    status =
      "incorrect";
  }

  // ----------------------------------------------------------
  // Working note
  // ----------------------------------------------------------

  let workingNote = null;

  if (
    status ===
    "correct_answer_weak_or_invalid_reasoning"
  ) {
    workingNote =
      "Your final answer is correct, but your working does not yet provide enough evidence that the method was valid.";
  }

  if (
    status ===
    "incorrect_final_answer_with_reasoning_evidence"
  ) {
    workingNote =
      "Your working contains evidence of the correct method, but the final answer is incorrect. Check your final calculation.";
  }

  if (
    partialInfo
  ) {
    workingNote =
      `Partially correct: ${partialInfo.matchedCount}/${partialInfo.totalRequired} required items identified (${partialInfo.percent}%).`;
  }

  // ----------------------------------------------------------
  // Correct answer formatting
  // ----------------------------------------------------------

  const mainCorrectAnswerStr =
    Array.isArray(rawAnswer)
      ? rawAnswer.join(" • ")
      : String(rawAnswer ?? "");

  const correctAnswerList =
    Array.isArray(rawAnswer)
      ? rawAnswer
      : [mainCorrectAnswerStr];

  // ----------------------------------------------------------
  // Return structured evaluation
  // ----------------------------------------------------------

  return {
    // --------------------------------------------------------
    // Backwards-compatible fields
    // --------------------------------------------------------

    isCorrect:
      isAnswerCorrect,

    isAnswerCorrect,

    isWorkCorrect,

    workingNote,

    correctAnswer:
      mainCorrectAnswerStr,

    correctAnswerList,

    solution,

    steps:
      verifiedSteps || [],

    mark:
      isAnswerCorrect
        ? "Correct"
        : "Incorrect",

    analysis,

    // --------------------------------------------------------
    // NEW TIXAR DIAGNOSTIC FIELDS
    // --------------------------------------------------------

    status,

    answerEvaluation,

    workingEvaluation,

    questionVerification:
      verified.verification,

    understanding:
      analysis.understanding,

    diagnosis:
      analysis.diagnosis,

    misconceptions:
      analysis.misconceptions,

    conceptEvidence:
      analysis.concepts,

    diagnosticConfidence:
      analysis.diagnosticConfidence,

    // --------------------------------------------------------
    // Useful for future Knowledge Model
    // --------------------------------------------------------

    evidence: {
      answerCorrect:
        isAnswerCorrect,

      reasoningSupported:
        isWorkCorrect === true,

      understandingScore:
        analysis.understanding.score,

      understandingLevel:
        analysis.understanding.level,

      diagnosis:
        analysis.diagnosis.type,

      misconceptionCount:
        analysis.misconceptions.length,

      missingConceptCount:
        analysis.concepts.missing.length,

      contradictionCount:
        analysis.contradictions.length,
    },

    metadata: {
      graderVersion: "2.0",

      architecture:
        "answer_correctness + concept_diagnosis + reasoning_analysis",

      readyForKnowledgeModel:
        true,
    },
  };
}