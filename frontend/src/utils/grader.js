import { analyseStudentAnswer } from "./answerAnalyzer.js";
import { verifyQuestionAcrossSubjects } from "./subjectVerifierRouter.js";

/**
 * Client-side evaluation engine for immediate offline & online grading.
 *
 * Now includes:
 *  - Universal Multi-Subject Verification (Math, Physics, Chemistry, Biology, Language Arts):
 *    independently verifies questions across all subjects, catches database generation errors,
 *    and auto-generates step-by-step solution cards.
 *  - Working vs. Final Answer evaluation
 *  - Multi-part / multi-item partial grading
 *  - Final conclusion extraction
 */
export function evaluateAnswer(userAnswer, question, userWork = "") {
  if (!question) {
    return {
      isCorrect: false,
      correctAnswer: "",
      solution: "Question details unavailable.",
      mark: "Incorrect",
    };
  }

  let rawAns = question.ans;
  const questionText = question.q || question.stem || "";
  const solution =
    question.sol ||
    question.why ||
    question.explain ||
    "Review your answer against the solution above.";

  // ── UNIVERSAL MULTI-SUBJECT SELF-VERIFICATION ─────────────────────────────
  // Runs question through Subject Verifiers (Math, Physics/Chemistry, Biology, Language Arts)
  let verifiedSteps = Array.isArray(question.steps) && question.steps.length > 0
    ? question.steps
    : null;

  if (questionText) {
    const verification = verifyQuestionAcrossSubjects(questionText, rawAns, question);

    if (verification.wasOverridden) {
      console.warn(
        `[Tixar Grader] Multi-Subject Verifier (${verification.subject}) overrode stored answer "${rawAns}" → "${verification.verifiedAnswer}" for: "${questionText}"`
      );
      rawAns = verification.verifiedAnswer;
    }

    if (verification.verifiedSteps && !verifiedSteps) {
      verifiedSteps = verification.verifiedSteps;
    }
  }

  // ── NORMALIZERS ───────────────────────────────────────────────────────────
  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/[\u2018\u2019\u201C\u201D]/g, "")
      .replace(/[^a-z0-9\s.,-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const tokenize = (s) => normalize(s).split(" ").filter(Boolean);
  const uAns = normalize(userAnswer);

  const mainCorrectAnswerStr = Array.isArray(rawAns)
    ? rawAns.join(" • ")
    : String(rawAns || "");

  // ── MULTI-PART CHECKING ───────────────────────────────────────────────────
  const stem = questionText.toLowerCase();
  const isMultiPartQuestion =
    question.multi_part ||
    /\b(four|4|three|3|both|all|list|name\s+the|which\s+ones)\b/i.test(stem);

  let partialInfo = null;

  const checkAnswer = () => {
    if (Array.isArray(rawAns) && isMultiPartQuestion) {
      const requiredItems = rawAns.map(normalize);
      const matchedCount = requiredItems.filter((item) =>
        checkSingleVariant(uAns, item, tokenize)
      ).length;
      const totalRequired = requiredItems.length;

      if (matchedCount < totalRequired) {
        partialInfo = {
          matchedCount,
          totalRequired,
          percent: Math.round((matchedCount / totalRequired) * 100),
        };
      }
      return matchedCount === totalRequired;
    }
    if (Array.isArray(rawAns)) {
      return rawAns.some((variant) =>
        checkSingleVariant(uAns, normalize(variant), tokenize)
      );
    }
    return checkSingleVariant(uAns, normalize(rawAns), tokenize);
  };

  const isAnswerCorrect = checkAnswer();

  // ── WORKING vs. FINAL ANSWER EVALUATION ──────────────────────────────────
  let isWorkCorrect = null;
  let workingNote = null;
  const uWork = normalize(userWork);

  const stepsToCheck = verifiedSteps || question.steps;
  if (uWork && stepsToCheck && stepsToCheck.length > 0) {
    const stepTokens = tokenize(stepsToCheck.join(" "));
    const workTokens = tokenize(uWork);
    const matchedWork = stepTokens.filter(
      (t) => t.length > 2 && workTokens.includes(t)
    );
    isWorkCorrect =
      stepTokens.length > 0
        ? matchedWork.length / Math.min(stepTokens.length, workTokens.length) >= 0.35
        : true;
  }

  let finalIsCorrect = isAnswerCorrect;

  if (uWork && isWorkCorrect !== null) {
    if (isAnswerCorrect && !isWorkCorrect) {
      finalIsCorrect = true;
      workingNote =
        "Your final answer is correct! (Note: Review your working steps for proper method formatting).";
    } else if (!isAnswerCorrect && isWorkCorrect) {
      finalIsCorrect = false;
      workingNote =
        "Your working method is on the right track, but your final answer was incorrect.";
    }
  }

  if (!finalIsCorrect && partialInfo) {
    workingNote = `Partially correct (${partialInfo.matchedCount}/${partialInfo.totalRequired} items — ${partialInfo.percent}%). Complete all required items to master this concept.`;
  }

  // ── RICH ANSWER ANALYSIS ──────────────────────────────────────────────────
  // Pass verified question object (with corrected answer + steps) to the analyser
  const enrichedQuestion = verifiedSteps
    ? { ...question, ans: rawAns, steps: verifiedSteps }
    : { ...question, ans: rawAns };

  const analysis = !finalIsCorrect
    ? analyseStudentAnswer(userAnswer, mainCorrectAnswerStr, enrichedQuestion, userWork)
    : null;

  return {
    isCorrect: finalIsCorrect,
    isAnswerCorrect,
    isWorkCorrect,
    workingNote,
    correctAnswer: mainCorrectAnswerStr,
    correctAnswerList: Array.isArray(rawAns) ? rawAns : [mainCorrectAnswerStr],
    solution,
    steps: verifiedSteps || [],
    mark: finalIsCorrect ? "Correct" : "Incorrect",
    analysis,
  };
}

function checkSingleVariant(uAns, cAns, tokenize) {
  if (!uAns || !cAns) return uAns === cAns;

  // Clean exact match
  if (uAns.trim() === cAns.trim()) return true;

  // 1. Numerical & Equation Evaluation
  const cNumMatch = String(cAns).match(/-?\d+(?:\.\d+)?/);
  if (cNumMatch) {
    const targetNum = parseFloat(cNumMatch[0]);

    // Extract student's final line or conclusion following '='
    const rawLines = String(uAns)
      .split(/[\n;]/)
      .map((l) => l.trim())
      .filter(Boolean);
    const lastLine = rawLines[rawLines.length - 1] || String(uAns);

    const eqMatch = lastLine.match(/=\s*(-?\d+(?:\.\d+)?)/);
    const numbersOnLastLine = lastLine.match(/-?\d+(?:\.\d+)?/g);

    let studentFinalVal;
    if (eqMatch) {
      studentFinalVal = parseFloat(eqMatch[1]);
    } else if (numbersOnLastLine && numbersOnLastLine.length > 0) {
      studentFinalVal = parseFloat(
        numbersOnLastLine[numbersOnLastLine.length - 1]
      );
    }

    if (studentFinalVal !== undefined && !isNaN(studentFinalVal)) {
      return Math.abs(studentFinalVal - targetNum) < 1e-5;
    }
  }

  // 2. Substring match ONLY for longer non-numeric textual phrases
  if (cAns.length > 4 && isNaN(parseFloat(cAns)) && uAns.includes(cAns)) {
    return true;
  }

  // 3. Keyword token fuzzy match
  const answerTokens = tokenize(uAns);
  const correctTokens = tokenize(cAns);
  const keywords = correctTokens.filter(
    (w) => w.length > 3 && isNaN(parseFloat(w))
  );
  const matchedKeywords = keywords.filter((w) => answerTokens.includes(w));
  const matchedCount = matchedKeywords.length;
  const keywordRatio = keywords.length ? matchedCount / keywords.length : 0;
  const overlapRatio = correctTokens.length
    ? matchedCount / Math.max(correctTokens.length, answerTokens.length)
    : 0;

  if (keywords.length > 0 && (keywordRatio >= 0.6 || overlapRatio >= 0.5)) {
    return true;
  }

  return false;
}
