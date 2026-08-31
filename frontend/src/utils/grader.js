/**
 * Client-side evaluation engine for immediate offline & online grading.
 * Compares user answer against target question answer key.
 * Now handles:
 *  - Working vs. Final Answer evaluation
 *  - Multi-part / multi-item partial grading (e.g. 1/4 correct is NOT full pass)
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

  const rawAns = question.ans;
  const solution =
    question.sol ||
    question.why ||
    question.explain ||
    "Review your answer against the solution above.";

  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/[\u2018\u2019\u201C\u201D]/g, "")
      .replace(/[^a-z0-9\s.,-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const tokenize = (s) => normalize(s).split(" ").filter(Boolean);
  const uAns = normalize(userAnswer);
  const uWork = normalize(userWork);

  const mainCorrectAnswerStr = Array.isArray(rawAns) ? rawAns.join(" • ") : String(rawAns || "");

  // 1. Multi-Item / Multi-Part Checking
  const stem = String(question.q || question.stem || "").toLowerCase();
  const isMultiPartQuestion =
    question.multi_part ||
    /\b(four|4|three|3|both|all|list|name\s+the|which\s+ones)\b/i.test(stem);

  let partialInfo = null;

  const checkAnswer = () => {
    if (Array.isArray(rawAns) && isMultiPartQuestion) {
      const requiredItems = rawAns.map(normalize);
      const matchedCount = requiredItems.filter((item) => checkSingleVariant(uAns, item, tokenize)).length;
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
      return rawAns.some((variant) => checkSingleVariant(uAns, normalize(variant), tokenize));
    }
    return checkSingleVariant(uAns, normalize(rawAns), tokenize);
  };

  const isAnswerCorrect = checkAnswer();

  // 2. Working vs. Final Answer Evaluation
  let isWorkCorrect = null;
  let workingNote = null;

  if (uWork && question.steps && question.steps.length > 0) {
    const stepTokens = tokenize(question.steps.join(" "));
    const workTokens = tokenize(uWork);
    const matchedWork = stepTokens.filter((t) => t.length > 2 && workTokens.includes(t));
    isWorkCorrect = stepTokens.length > 0 ? (matchedWork.length / Math.min(stepTokens.length, workTokens.length)) >= 0.35 : true;
  }

  let finalIsCorrect = isAnswerCorrect;

  if (uWork && isWorkCorrect !== null) {
    if (isAnswerCorrect && !isWorkCorrect) {
      // Correct answer, flawed working -> STILL PERMIT TO PROCEED (isCorrect: true) with working note
      finalIsCorrect = true;
      workingNote = "Your final answer is correct! (Note: Review your working steps to ensure proper method formatting).";
    } else if (!isAnswerCorrect && isWorkCorrect) {
      // Correct working method, wrong final answer -> MARK INCORRECT (isCorrect: false) to trigger calculation repair
      finalIsCorrect = false;
      workingNote = "Your working method is on the right track, but your final answer calculation was incorrect.";
    }
  }

  if (!finalIsCorrect && partialInfo) {
    workingNote = `Partially correct (${partialInfo.matchedCount}/${partialInfo.totalRequired} items identified — ${partialInfo.percent}%). Complete all required items to master this concept.`;
  }

  // 3. Generate personalised answer breakdown (always, not just for misconceptions)
  const breakdown = !finalIsCorrect
    ? generateAnswerBreakdown(userAnswer, mainCorrectAnswerStr, normalize, tokenize)
    : null;

  return {
    isCorrect: finalIsCorrect,
    isAnswerCorrect,
    isWorkCorrect,
    workingNote,
    correctAnswer: mainCorrectAnswerStr,
    correctAnswerList: Array.isArray(rawAns) ? rawAns : [mainCorrectAnswerStr],
    solution,
    steps: Array.isArray(question.steps) ? question.steps : [],
    mark: finalIsCorrect ? "Correct" : "Incorrect",
    breakdown,
  };
}

function checkSingleVariant(uAns, cAns, tokenize) {
  if (!uAns || !cAns) return uAns === cAns;

  // Exact match
  if (uAns === cAns) return true;

  // Substring match for longer phrases
  if (uAns.includes(cAns) || cAns.includes(uAns)) return true;

  // Keyword token fuzzy match
  const answerTokens = tokenize(uAns);
  const correctTokens = tokenize(cAns);
  const keywords = correctTokens.filter((w) => w.length > 3);
  const matchedKeywords = keywords.filter((w) => answerTokens.includes(w));
  const matchedCount = matchedKeywords.length;
  const keywordRatio = keywords.length ? matchedCount / keywords.length : 0;
  const overlapRatio = correctTokens.length
    ? matchedCount / Math.max(correctTokens.length, answerTokens.length)
    : 0;

  if (keywords.length > 0 && (keywordRatio >= 0.5 || overlapRatio >= 0.45)) {
    return true;
  }

  return false;
}

/**
 * Generates a personalised breakdown comparing the student's answer to the correct answer.
 * Returns exactly what they got right, what they missed, and a plain-English reason.
 *
 * @param {string} studentAnswer - What the student typed
 * @param {string} correctAnswer - The correct answer string
 * @param {Function} normalize - String normalizer
 * @param {Function} tokenize - String tokenizer
 * @returns {Object} breakdown
 */
function generateAnswerBreakdown(studentAnswer, correctAnswer, normalize, tokenize) {
  const sNorm = normalize(studentAnswer || "");
  const cNorm = normalize(correctAnswer || "");

  const sTokens = tokenize(sNorm);
  const cTokens = tokenize(cNorm);

  // Key concept words (length > 3, ignore common stop words)
  const STOP_WORDS = new Set([
    "the", "and", "that", "this", "with", "from", "for", "are", "was",
    "were", "have", "has", "had", "been", "will", "would", "could", "should",
    "used", "also", "when", "them", "their", "they", "into", "which"
  ]);

  const cKeywords = cTokens.filter((w) => w.length > 3 && !STOP_WORDS.has(w));
  const sKeywords = new Set(sTokens.filter((w) => w.length > 3 && !STOP_WORDS.has(w)));

  const matched = cKeywords.filter((w) => sKeywords.has(w));
  const missing = cKeywords.filter((w) => !sKeywords.has(w));

  const matchRatio = cKeywords.length > 0 ? matched.length / cKeywords.length : 0;

  // Determine how close the student was
  let closeness;
  let closenessLabel;
  if (matchRatio >= 0.7) {
    closeness = "close";
    closenessLabel = "Very close — just missing key terminology.";
  } else if (matchRatio >= 0.35) {
    closeness = "partial";
    closenessLabel = "Partially correct — you understood some concepts but missed core parts.";
  } else if (sNorm.length < 5 || /^(idk|i don|no idea|pass|dunno|nothing|help)/.test(sNorm)) {
    closeness = "irrelevant";
    closenessLabel = "No attempt — you expressed having no idea.";
  } else {
    closeness = "off-track";
    closenessLabel = "Your answer was off-track — different concept applied.";
  }

  // Generate specific gap explanations for missing keywords
  const missingExplanations = missing.slice(0, 4).map((w) => {
    return { keyword: w, reason: `The concept "${w}" is central to the correct answer but was not mentioned in your response.` };
  });

  // Identify what the student DID say that shows understanding
  const creditedPhrases = matched.map((w) => w);

  return {
    studentSaid: studentAnswer.trim(),
    correctAnswer,
    matched: creditedPhrases,
    missing: missing,
    missingExplanations,
    closeness,
    closenessLabel,
    matchRatio: Math.round(matchRatio * 100),
  };
}
