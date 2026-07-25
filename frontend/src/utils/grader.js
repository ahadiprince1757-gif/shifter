/**
 * Client-side evaluation engine for immediate offline & online grading.
 * Compares user answer against target question answer key.
 */
export function evaluateAnswer(userAnswer, question) {
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
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const tokenize = (s) => normalize(s).split(" ").filter(Boolean);
  const uAns = normalize(userAnswer);

  const mainCorrectAnswerStr = Array.isArray(rawAns) ? rawAns.join(" • ") : String(rawAns || "");
  const isCorrect = Array.isArray(rawAns)
    ? rawAns.some((variant) => checkSingleVariant(uAns, normalize(variant), tokenize))
    : checkSingleVariant(uAns, normalize(rawAns), tokenize);

  return {
    isCorrect,
    correctAnswer: mainCorrectAnswerStr,
    correctAnswerList: Array.isArray(rawAns) ? rawAns : [mainCorrectAnswerStr],
    solution,
    steps: Array.isArray(question.steps) ? question.steps : [],
    mark: isCorrect ? "Correct" : "Incorrect",
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
