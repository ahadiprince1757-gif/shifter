
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * ================================================================
 * FEEDBACK DISPLAY
 * ================================================================
 *
 * IMPORTANT:
 *
 * This component DISPLAYs grading.
 * It does not invent grading.
 *
 * The grading pipeline must decide whether the answer is correct.
 * This component normalizes that result so values such as:
 *
 *   true
 *   false
 *   "true"
 *   "false"
 *   1
 *   0
 *
 * cannot accidentally be interpreted incorrectly.
 *
 * If correctness cannot be determined reliably, we DO NOT show
 * "Mastered".
 * ================================================================
 */


/**
 * Safely normalize a boolean-like value.
 *
 * Returns:
 *   true   -> definitely correct
 *   false  -> definitely incorrect
 *   null   -> unknown / unreliable
 */
function normalizeBoolean(value) {
  if (value === true) return true;
  if (value === false) return false;

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (
      normalized === "true" ||
      normalized === "correct" ||
      normalized === "yes" ||
      normalized === "1"
    ) {
      return true;
    }

    if (
      normalized === "false" ||
      normalized === "incorrect" ||
      normalized === "wrong" ||
      normalized === "no" ||
      normalized === "0"
    ) {
      return false;
    }
  }

  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
  }

  return null;
}


/**
 * Extract the most likely authoritative correctness value.
 *
 * We support several existing feedback shapes so the UI does not
 * silently break while the backend is being cleaned up.
 */
function getCorrectness(feedback) {
  if (!feedback || typeof feedback !== "object") {
    return null;
  }

  const candidates = [
    feedback.isCorrect,
    feedback.correct,
    feedback.result?.isCorrect,
    feedback.grading?.isCorrect,
    feedback.grade?.isCorrect,
  ];

  for (const value of candidates) {
    const normalized = normalizeBoolean(value);

    if (normalized !== null) {
      return normalized;
    }
  }

  return null;
}


/**
 * Convert an answer into safe display text.
 */
function normalizeAnswer(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value
      .filter(
        (v) =>
          v !== null &&
          v !== undefined &&
          String(v).trim() &&
          String(v).trim().toLowerCase() !== "undefined"
      )
      .map((v) => String(v).trim())
      .join(" • ");
  }

  if (typeof value === "object") {
    return "";
  }

  const text = String(value).trim();

  if (!text || text.toLowerCase() === "undefined") {
    return "";
  }

  return text;
}


/**
 * Safely extract pedagogical content.
 *
 * Handles:
 *   feedback.steps
 *   feedback.solution
 *   feedback.sol
 *   feedback.why
 *   JSON encoded solution strings
 *   newline-separated solutions
 */
function parsePedagogicalContent(feedback) {
  if (!feedback || typeof feedback !== "object") {
    return {
      steps: [],
      solution: "",
      why: "",
    };
  }

  // --------------------------------------------------------------
  // 1. STEPS
  // --------------------------------------------------------------

  let steps = [];

  if (Array.isArray(feedback.steps) && feedback.steps.length > 0) {
    steps = feedback.steps
      .map((s) => String(s ?? "").trim())
      .filter(
        (s) =>
          s &&
          s.toLowerCase() !== "undefined" &&
          s.toLowerCase() !== "null"
      );
  }


  // --------------------------------------------------------------
  // 2. SOLUTION
  // --------------------------------------------------------------

  let solution = "";

  const rawSol =
    feedback.solution ??
    feedback.sol ??
    feedback.explanation ??
    "";

  if (typeof rawSol === "string" && rawSol.trim()) {
    const trimmed = rawSol.trim();

    // JSON-encoded solution
    if (trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);

        solution =
          parsed.sol ??
          parsed.solution ??
          parsed.explanation ??
          parsed.why ??
          "";

        if (
          Array.isArray(parsed.steps) &&
          parsed.steps.length > 0 &&
          steps.length === 0
        ) {
          steps = parsed.steps
            .map((s) => String(s ?? "").trim())
            .filter(Boolean);
        }
      } catch {
        // If it looks like JSON but cannot be parsed,
        // do not leak the raw JSON into the UI.
        solution = "";
      }
    } else {
      solution = trimmed;
    }
  }


  // --------------------------------------------------------------
  // 3. CONVERT MULTI-LINE SOLUTION INTO STEPS
  // --------------------------------------------------------------

  if (steps.length === 0 && solution) {
    const lines = solution
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length > 1) {
      steps = lines;
      solution = "";
    }
  }


  // --------------------------------------------------------------
  // 4. WHY / KEY INSIGHT
  // --------------------------------------------------------------

  let why = "";

  const rawWhy =
    feedback.why ??
    feedback.keyInsight ??
    feedback.insight ??
    "";

  if (
    typeof rawWhy === "string" &&
    rawWhy.trim() &&
    !rawWhy.trim().startsWith("{")
  ) {
    why = rawWhy.trim();
  }


  // --------------------------------------------------------------
  // 5. CLEAN STEP PREFIXES
  // --------------------------------------------------------------

  const cleanSteps = steps
    .map((step) =>
      step
        .replace(/^step\s*\d+\s*[:.)-]\s*/i, "")
        .trim()
    )
    .filter(Boolean);


  return {
    steps: cleanSteps,
    solution,
    why,
  };
}


/**
 * Safely render markdown content.
 */
function Markdown({ children }) {
  if (!children) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {String(children)}
    </ReactMarkdown>
  );
}


function FeedbackDisplay({
  feedback,
  nextQuestion,
  finishTopic,
  grading,
  qIdx,
  totalQs,
  goToReview,
  startMutatedRepair,
}) {
  if (!feedback) {
    return null;
  }


  // ================================================================
  // AUTHORITATIVE CORRECTNESS
  // ================================================================

  const isCorrect = getCorrectness(feedback);

  /*
   * VERY IMPORTANT:
   *
   * isCorrect can now be:
   *
   *   true
   *   false
   *   null
   *
   * null means:
   * "The grading result is not reliable enough to call this
   *  Mastered or Needs Review."
   *
   * We NEVER treat unknown as correct.
   */
  const hasReliableGrade = typeof isCorrect === "boolean";


  // ================================================================
  // PROGRESS
  // ================================================================

  const currentQuestion =
    Number.isFinite(Number(qIdx))
      ? Number(qIdx) + 1
      : 1;

  const questionCount =
    Number.isFinite(Number(totalQs))
      ? Number(totalQs)
      : 1;

  const isLastQuestion =
    currentQuestion >= questionCount;


  // ================================================================
  // ANSWERS
  // ================================================================

  const studentAnswer = normalizeAnswer(
    feedback.studentAnswer ??
    feedback.userAnswer ??
    feedback.answer ??
    feedback.submittedAnswer
  );

  const rawAnswer = normalizeAnswer(
    feedback.correctAnswer ??
    feedback.answerKey ??
    feedback.expectedAnswer
  );

  const hasStudentAnswer = Boolean(studentAnswer);
  const hasCorrectAnswer = Boolean(rawAnswer);


  // ================================================================
  // PEDAGOGICAL CONTENT
  // ================================================================

  const {
    steps,
    solution,
    why,
  } = parsePedagogicalContent(feedback);

  const hasSteps = steps.length > 0;


  const showSolution =
    !hasSteps &&
    Boolean(solution) &&
    solution.trim().toLowerCase() !==
      rawAnswer.trim().toLowerCase();


  const normalizedWhy = why.trim().toLowerCase();
  const normalizedSolution = solution.trim().toLowerCase();

  const showWhy =
    Boolean(why) &&
    normalizedWhy !== normalizedSolution &&
    !steps.some((step) =>
      step
        .toLowerCase()
        .includes(normalizedWhy.slice(0, 20))
    );


  // ================================================================
  // REPAIR
  // ================================================================

  const showRepairedBanner =
    isCorrect === true &&
    feedback.isRepaired === true;


  // ================================================================
  // RECURRENCE
  // ================================================================

  const recurrence =
    feedback.analysis?.recurrence ??
    feedback.recurrence ??
    null;

  const recurrenceCount =
    Number(recurrence?.count ?? 0);

  const showRecurrence =
    isCorrect === false &&
    recurrence &&
    recurrenceCount > 1;


  // ================================================================
  // VISUAL STATE
  // ================================================================

  let cardClass = "fb-needs-review";
  let badgeClass = "fb-badge-review";
  let statusText = "Needs Review";

  if (isCorrect === true) {
    cardClass = "fb-correct";
    badgeClass = "fb-badge-success";
    statusText = "✓ Correct";
  }

  if (isCorrect === false) {
    cardClass = "fb-needs-review";
    badgeClass = "fb-badge-review";
    statusText = "✕ Incorrect";
  }

  /*
   * UNKNOWN IS DELIBERATELY NOT "Mastered".
   *
   * This protects Tixar from falsely telling a learner they have
   * mastered something when the grading result is missing.
   */
  if (!hasReliableGrade) {
    cardClass = "fb-needs-review";
    badgeClass = "fb-badge-review";
    statusText = "Review Result";
  }


  // ================================================================
  // DEVELOPMENT DIAGNOSTICS
  // ================================================================

  if (typeof window !== "undefined" && window.__TIXAR_DEBUG__) {
    console.log("[TIXAR] FeedbackDisplay", {
      rawIsCorrect: feedback.isCorrect,
      normalizedIsCorrect: isCorrect,
      hasReliableGrade,

      studentAnswer,
      correctAnswer: rawAnswer,

      feedback,
    });
  }


  // ================================================================
  // RENDER
  // ================================================================

  return (
    <div className={`fb-card ${cardClass}`}>

      {/* ==========================================================
          HEADER
      ========================================================== */}

      <div className="fb-header">

        <span
          className={`fb-status-badge ${badgeClass}`}
        >
          {statusText}
        </span>

        <span className="fb-progress-pill">
          {currentQuestion} / {questionCount}
        </span>

      </div>


      {/* ==========================================================
          UNKNOWN GRADING WARNING
          ========================================================== */}

      {!hasReliableGrade && (
        <div className="fb-grading-warning">
          <strong>We couldn't reliably determine the result.</strong>

          <span>
            Your answer has not been marked as mastered.
            Please review the solution below.
          </span>
        </div>
      )}


      {/* ==========================================================
          WRONG ANSWER — MAKE IT OBVIOUS
          ========================================================== */}

      {isCorrect === false && (
        <div className="fb-incorrect-banner">

          <strong>Not quite.</strong>

          <span>
            Your answer needs another look.
          </span>

        </div>
      )}


      {/* ==========================================================
          STUDENT ANSWER
          ========================================================== */}

      {hasStudentAnswer && (
        <div className="fb-student-answer-box">

          <div className="fb-section-title">
            Your Answer
          </div>

          <div className="fb-answer-value">
            <Markdown>
              {studentAnswer}
            </Markdown>
          </div>

        </div>
      )}


      {/* ==========================================================
          CORRECT ANSWER
          ========================================================== */}

      {hasCorrectAnswer && (
        <div className="fb-correct-answer-box">

          <div className="fb-section-title">
            {isCorrect === true
              ? "Answer"
              : "Correct Answer"}
          </div>

          <div className="fb-answer-value">
            <Markdown>
              {rawAnswer}
            </Markdown>
          </div>

        </div>
      )}


      {/* ==========================================================
          REPEATED MISTAKE
          ========================================================== */}

      {showRecurrence && (
        <div className="smart-analysis-recurrence-badge">
          ⚠️ {recurrence.label || "Repeated mistake"}{" "}
          (seen {recurrenceCount} times)
        </div>
      )}


      {/* ==========================================================
          HOW TO SOLVE
          ========================================================== */}

      {hasSteps && (
        <div className="fb-steps-container">

          <div className="fb-section-title">
            {isCorrect === false
              ? "How to Fix It"
              : "How to Solve It"}
          </div>

          <ol className="fb-steps-list">

            {steps.map((step, index) => (
              <li
                key={`${index}-${step.slice(0, 20)}`}
                className="fb-step-item"
              >

                <span className="fb-step-number">
                  {index + 1}
                </span>

                <span className="fb-step-text">
                  <Markdown>
                    {step}
                  </Markdown>
                </span>

              </li>
            ))}

          </ol>

        </div>
      )}


      {/* ==========================================================
          FALLBACK EXPLANATION
          ========================================================== */}

      {showSolution && (
        <div className="fb-explanation-box">

          <div className="fb-section-title">
            Explanation
          </div>

          <div className="fb-explanation-text">
            <Markdown>
              {solution}
            </Markdown>
          </div>

        </div>
      )}


      {/* ==========================================================
          KEY INSIGHT
          ========================================================== */}

      {showWhy && (
        <div className="fb-why-box">

          <div className="fb-section-title">
            Key Insight
          </div>

          <p className="fb-why-text">
            {why}
          </p>

        </div>
      )}


      {/* ==========================================================
          REPAIR CONFIRMED
          ========================================================== */}

      {showRepairedBanner && (
        <div className="fb-repaired-banner">

          <span className="fb-repaired-icon">
            ✓
          </span>

          <strong>
            Fixed. We'll check this again later.
          </strong>

        </div>
      )}


      {/* ==========================================================
          ACTIONS
          ========================================================== */}

      <div className="fb-actions">

        {isCorrect === false &&
          startMutatedRepair && (
            <button
              type="button"
              className="fb-action-btn fb-repair-btn"
              onClick={startMutatedRepair}
              disabled={grading}
            >
              Try Again (Retest) →
            </button>
          )}


        {goToReview && (
          <button
            type="button"
            className="fb-action-btn fb-review-btn"
            onClick={goToReview}
            disabled={grading}
          >
            Review Concept
          </button>
        )}


        <button
          type="button"
          className="fb-action-btn fb-next-btn"
          onClick={() => {
            if (isLastQuestion) {
              finishTopic();
            } else {
              nextQuestion();
            }
          }}
          disabled={grading}
        >
          {isLastQuestion
            ? "Finish Topic"
            : "Next Question"}
        </button>

      </div>

    </div>
  );
}


export default FeedbackDisplay;

