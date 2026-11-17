
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TeacherFeedbackView from "./TeacherFeedbackView";
import { diagnoseStudentSubmission } from "../../../diagnostics/teacherDiagnoser";
import ReadingContainer from "../../layout/ReadingContainer";
import QuestionDisplay from "../../feedback/QuestionDisplay";
import StudentApproach from "../../feedback/StudentApproach";
import CorrectMethod from "../../feedback/CorrectMethod";
import RememberRule from "../../feedback/RememberRule";
import StandardAnswer from "../../feedback/StandardAnswer";
import FeedbackActions from "../../feedback/FeedbackActions";
import ContentSection from "../../content/ContentSection";

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
      components={{
        table: ({ node, ...props }) => (
          <div className="table-responsive">
            <table {...props} />
          </div>
        ),
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
}


// ================================================================
// DIAGNOSTIC REASONING TIMELINE
// ================================================================

/**
 * Maps a step type from analyseMathSteps output to a badge config.
 */
const STEP_BADGE = {
  step_correct: { icon: "✓", label: "Correct", cls: "fb-diag-badge--ok" },
  step_wrong:   { icon: "✗", label: "Gap",     cls: "fb-diag-badge--gap" },
  step_unverified: { icon: "?", label: "Unclear", cls: "fb-diag-badge--unclear" },
};

function DiagnosticTimeline({ analysis, isCorrect }) {
  if (!analysis || typeof analysis !== "object") return null;

  // ── Math step-by-step trace ────────────────────────────────────
  const mathSteps = Array.isArray(analysis.math?.steps)
    ? analysis.math.steps
    : [];

  // ── High-level misconceptions & concept gaps ──────────────────
  const misconceptions = Array.isArray(analysis.misconceptions)
    ? analysis.misconceptions
    : [];

  const missingConcepts = Array.isArray(analysis.concepts?.missing)
    ? analysis.concepts.missing
    : [];

  const contradictions = Array.isArray(analysis.contradictions)
    ? analysis.contradictions
    : [];

  // ── Understanding score ────────────────────────────────────────
  const understandingScore =
    typeof analysis.understanding?.score === "number"
      ? analysis.understanding.score
      : null;

  const understandingLevel = analysis.understanding?.level ?? null;

  // ── First failed step index ───────────────────────────────────
  const firstGapIndex = analysis.math?.firstFailedStepIndex ?? -1;

  // Nothing meaningful to show? Bail.
  const hasAnything =
    mathSteps.length > 0 ||
    misconceptions.length > 0 ||
    missingConcepts.length > 0 ||
    contradictions.length > 0;

  if (!hasAnything) return null;

  return (
    <div className="fb-diag-timeline">

      {/* Header */}
      <div className="fb-section-title fb-diag-timeline__title">
        Understanding Breakdown
      </div>

      {/* Understanding score bar */}
      {understandingScore !== null && (
        <div className="fb-diag-score-row">
          <span className="fb-diag-score-label">Understanding</span>
          <div className="fb-diag-score-track">
            <div
              className={`fb-diag-score-fill fb-diag-score--${understandingLevel ?? "weak"}`}
              style={{ width: `${Math.max(4, understandingScore)}%` }}
            />
          </div>
          <span className="fb-diag-score-pct">{understandingScore}%</span>
        </div>
      )}

      {/* Math step trace */}
      {mathSteps.length > 0 && (
        <ol className="fb-diag-steps-list">
          {mathSteps.map((step, i) => {
            const badge = STEP_BADGE[step.type] ?? STEP_BADGE.step_unverified;
            const isGap = step.type === "step_wrong";
            return (
              <li
                key={`diag-step-${i}`}
                className={`fb-diag-step-item${
                  isGap ? " fb-diag-step-item--gap" : ""
                }`}
              >
                <span className={`fb-diag-badge ${badge.cls}`}>
                  {badge.icon}
                </span>
                <span className="fb-diag-step-msg">{step.message}</span>
              </li>
            );
          })}
        </ol>
      )}

      {/* Prerequisite gap callout */}
      {firstGapIndex !== -1 && !isCorrect && (
        <div className="fb-diag-gap-callout">
          <span className="fb-diag-gap-callout__icon">!</span>
          <div className="fb-diag-gap-callout__body">
            <strong>Gap identified at Step {firstGapIndex + 1}.</strong>
            <span>
              {" "}The steps after this one could not be reliably checked
              because an earlier step needs to be corrected first.
            </span>
          </div>
        </div>
      )}

      {/* Misconceptions */}
      {misconceptions.length > 0 && (
        <div className="fb-diag-misconceptions">
          {misconceptions.map((m, i) => (
            <div key={`mc-${i}`} className="fb-diag-misconception-chip">
              <span className="fb-diag-misconception-chip__icon">Note:</span>
              <span>{m.misconception}</span>
            </div>
          ))}
        </div>
      )}

      {/* Contradictions */}
      {contradictions.length > 0 && (
        <div className="fb-diag-contradictions">
          {contradictions.map((c, i) => (
            <div key={`ctr-${i}`} className="fb-diag-contradiction-chip">
              <span className="fb-diag-contradiction-chip__icon">Swap:</span>
              <span>
                Used <strong>{c.studentConcept}</strong> but expected{" "}
                <strong>{c.expectedConcept}</strong>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Missing concept chips */}
      {missingConcepts.length > 0 && (
        <div className="fb-diag-missing-concepts">
          <span className="fb-diag-missing-label">Missing concepts:</span>
          <div className="fb-diag-missing-chips">
            {missingConcepts.map((mc, i) => (
              <span key={`mc-chip-${i}`} className="fb-diag-missing-chip">
                ✗ {mc.concept ?? mc}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
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
  refineAnswer,
  questionText,
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
  // DIAGNOSTIC ANALYSIS
  // ================================================================

  /**
   * The diagnostic analysis object comes from analyseStudentAnswer.
   * It is attached to feedback.analysis by the grading pipeline.
   */
  const diagnosticAnalysis =
    feedback.analysis ?? feedback.diagnostic ?? null;

  const teacherDiagnosis =
    feedback.analysis?.teacherDiagnosis ||
    feedback.teacherDiagnosis ||
    diagnoseStudentSubmission({
      studentAnswer,
      userWork: feedback.userWork || "",
      question: feedback.originalQ || {
        q: feedback.questionText || "",
        steps,
        ans: rawAnswer,
        why,
      },
      expectedSolution: {
        ans: rawAnswer,
        steps,
        why,
      },
      isAnswerCorrect: isCorrect === true,
    });


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

  const isPartial = feedback?.grade === "partial" || feedback?.partialCredit === true;

  let cardClass = "fb-needs-review";
  let badgeClass = "fb-badge-review";
  let statusText = "Needs Review";

  if (isCorrect === true) {
    cardClass = "fb-correct";
    badgeClass = "fb-badge-success";
    statusText = feedback?.acceptedAlternative
      ? "✓ Correct — Phrasing Accepted"
      : "✓ Correct";
  } else if (isPartial) {
    cardClass = "fb-almost-there fb-needs-review";
    badgeClass = "fb-badge-almost-there";
    statusText = "⚡ Almost There!";
  } else if (isCorrect === false) {
    cardClass = "fb-needs-review";
    badgeClass = "fb-badge-review";
    statusText = "✕ Incorrect";
  } else if (!hasReliableGrade) {
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
    <ReadingContainer className="feedback-document-root">
      {/* Subtle Progress Tracker */}
      <div className="type-meta" style={{ marginBottom: "var(--space-4)" }}>
        Question {currentQuestion} of {questionCount}
      </div>

      {/* Inconclusive grading notification — plain text notice, no card */}
      {!hasReliableGrade && (
        <div style={{ marginBottom: "var(--space-4)", color: "var(--text-secondary)", fontSize: "14px" }}>
          <strong style={{ color: "var(--text-primary)" }}>Notice: </strong>
          Your answer could not be evaluated with complete certainty. Please review the solution below.
        </div>
      )}

      {/* Partial match guidance — simple, no decorative banner */}
      {isPartial && (
        <div style={{ marginBottom: "var(--space-4)", color: "var(--text-secondary)", fontSize: "14px" }}>
          <strong style={{ color: "var(--text-primary)" }}>Almost there: </strong>
          Your answer captured part of the idea. Refine it using the correct method below.
        </div>
      )}

      {/* ==========================================================
          CORRECT ANSWER DOCUMENT SURFACE (MINIMAL, ONE SURFACE)
          ========================================================== */}
      {isCorrect === true && (
        <div aria-label="Correct Answer Review">
          {questionText && (
            <QuestionDisplay questionText={questionText} />
          )}

          {hasStudentAnswer && (
            <StudentApproach studentAnswer={studentAnswer} approachSummary={`Your answer: "${studentAnswer}"`} />
          )}

          {hasSteps && (
            <CorrectMethod steps={steps} title="HOW TO SOLVE IT" />
          )}

          {(showSolution || showWhy) && (
            <RememberRule
              title="KEY INSIGHT"
              ruleText={solution || why}
            />
          )}

          {hasCorrectAnswer && (
            <StandardAnswer answer={rawAnswer} steps={steps} />
          )}
        </div>
      )}

      {/* ==========================================================
          INCORRECT / PARTIAL DIAGNOSTIC DOCUMENT
          ========================================================== */}
      {(isCorrect === false || isPartial) && (
        <TeacherFeedbackView
          diagnosis={teacherDiagnosis}
          rawAnswer={rawAnswer}
          steps={steps}
          why={why}
          isPartial={isPartial}
          questionText={questionText || feedback?.question?.q || feedback?.q || ""}
          studentAnswer={studentAnswer}
        />
      )}

      {/* ==========================================================
          STANDARDIZED ACTIONS
          ========================================================== */}
      <FeedbackActions
        isCorrect={isCorrect}
        isPartial={isPartial}
        disabled={grading}
        onPrimary={
          isPartial && refineAnswer
            ? refineAnswer
            : isCorrect === false
            ? (startMutatedRepair || nextQuestion)
            : () => (isLastQuestion ? finishTopic() : nextQuestion())
        }
        primaryLabel={
          isPartial && refineAnswer
            ? "REFINE MY ANSWER"
            : isCorrect === false
            ? "TRY AGAIN"
            : isLastQuestion
            ? "FINISH TOPIC →"
            : "NEXT QUESTION →"
        }
        onSecondary={
          isCorrect !== true
            ? () => (isLastQuestion ? finishTopic() : nextQuestion())
            : null
        }
        secondaryLabel={isLastQuestion ? "Finish Topic →" : "Next question →"}
        onTertiary={goToReview}
        tertiaryLabel="Review concept"
      />
    </ReadingContainer>
  );
}

export default FeedbackDisplay;

