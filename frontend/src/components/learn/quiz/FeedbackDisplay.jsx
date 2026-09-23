import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * parsePedagogicalContent
 *
 * Safely extracts steps, solution text, and why from any feedback shape.
 * Handles raw JSON strings, plain text steps, and newline-separated steps.
 * The UI must NEVER render raw JSON.
 */
function parsePedagogicalContent(feedback) {
  // 1. Try feedback.steps first (already an array — backend sends this correctly)
  let steps = [];
  if (Array.isArray(feedback.steps) && feedback.steps.length > 0) {
    steps = feedback.steps
      .map((s) => String(s ?? "").trim())
      .filter((s) => s && s.toLowerCase() !== "undefined");
  }

  // 2. Extract solution text — avoid raw JSON leaks
  let solution = "";
  const rawSol = feedback.solution ?? feedback.sol ?? "";
  if (typeof rawSol === "string" && rawSol.trim()) {
    if (rawSol.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(rawSol);
        solution = parsed.sol || parsed.solution || parsed.why || "";
        if (Array.isArray(parsed.steps) && parsed.steps.length > 0 && steps.length === 0) {
          steps = parsed.steps.map((s) => String(s).trim()).filter(Boolean);
        }
      } catch {
        // not JSON — not usable
      }
    } else {
      solution = rawSol.trim();
    }
  }

  // 3. If still no steps, try to split solution text on newlines (Step 1: ... \n Step 2: ...)
  if (steps.length === 0 && solution) {
    const lines = solution
      .split(/\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length > 1) {
      steps = lines;
      solution = ""; // steps replaced the block text
    }
  }

  // 4. Extract why/key insight
  let why = "";
  const rawWhy = feedback.why ?? "";
  if (typeof rawWhy === "string" && rawWhy.trim() && !rawWhy.trim().startsWith("{")) {
    why = rawWhy.trim();
  }

  // 5. Strip "Step N:" prefix from each step for clean display
  const cleanSteps = steps.map((step) =>
    step.replace(/^step\s*\d+\s*:\s*/i, "").trim()
  );

  return { steps: cleanSteps, solution, why };
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
  if (!feedback) return null;

  const isCorrect = feedback.isCorrect;
  const isLastQuestion = qIdx >= totalQs - 1;

  // --- Correct answer (clean string only, never JSON) ---
  let rawAnswer = feedback.correctAnswer ?? "";
  if (typeof rawAnswer === "string" && rawAnswer.trim().startsWith("{")) {
    rawAnswer = ""; // never show raw JSON as the answer
  }
  if (Array.isArray(rawAnswer)) {
    rawAnswer = rawAnswer
      .filter((v) => v && String(v).trim().toLowerCase() !== "undefined")
      .join(" • ");
  }
  const hasAnswer =
    typeof rawAnswer === "string"
      ? rawAnswer.trim() && rawAnswer.trim().toLowerCase() !== "undefined"
      : Boolean(rawAnswer);

  // --- Pedagogical content ---
  const { steps, solution, why } = parsePedagogicalContent(feedback);
  const hasSteps = steps.length > 0;

  // Show solution paragraph only when there are no steps and solution is distinct from the answer
  const showSolution =
    !hasSteps &&
    solution &&
    solution.toLowerCase() !== String(rawAnswer).toLowerCase();

  // Show "why" only when it's distinct from the solution and the steps
  const showWhy =
    why &&
    why.toLowerCase() !== solution.toLowerCase() &&
    !steps.some((s) => s.toLowerCase().includes(why.toLowerCase().slice(0, 20)));

  // --- Repair confirmed banner (only when student fixed a mistake) ---
  const showRepairedBanner = isCorrect && feedback.isRepaired;

  // --- Recurrence warning (repeated mistake) ---
  const recurrence = feedback.analysis?.recurrence ?? null;
  const showRecurrence = !isCorrect && recurrence && recurrence.count > 1;

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-needs-review"}`}>

      {/* ── Header: status + progress ── */}
      <div className="fb-header">
        <span className={`fb-status-badge ${isCorrect ? "fb-badge-success" : "fb-badge-review"}`}>
          {isCorrect ? "✓ Mastered" : "Needs Review"}
        </span>
        <span className="fb-progress-pill">
          {qIdx + 1} / {totalQs}
        </span>
      </div>

      {/* ── Repeated mistake warning ── */}
      {showRecurrence && (
        <div className="smart-analysis-recurrence-badge">
          ⚠️ {recurrence.label} (seen {recurrence.count} times)
        </div>
      )}

      {/* ── Correct answer box ── */}
      {hasAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-section-title">Correct Answer</div>
          <div className="fb-answer-value">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {String(rawAnswer)}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* ── How to solve it — ALWAYS point form, never a paragraph ── */}
      {hasSteps && (
        <div className="fb-steps-container">
          <div className="fb-section-title">How to Solve It</div>
          <ol className="fb-steps-list">
            {steps.map((step, i) => (
              <li key={i} className="fb-step-item">
                <span className="fb-step-number">{i + 1}</span>
                <span className="fb-step-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {step}
                  </ReactMarkdown>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Fallback: plain solution text when no steps ── */}
      {showSolution && (
        <div className="fb-explanation-box">
          <div className="fb-section-title">Explanation</div>
          <div className="fb-explanation-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {solution}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* ── Key insight (why) — only shown when genuinely distinct ── */}
      {showWhy && (
        <div className="fb-why-box">
          <div className="fb-section-title">Key Insight</div>
          <p className="fb-why-text">{why}</p>
        </div>
      )}

      {/* ── Repair confirmed ── */}
      {showRepairedBanner && (
        <div className="fb-repaired-banner">
          <span className="fb-repaired-icon">✓</span>
          <strong>Fixed. We'll check this again later.</strong>
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="fb-actions">
        {!isCorrect && startMutatedRepair && (
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
          {isLastQuestion ? "Finish Topic" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default FeedbackDisplay;
