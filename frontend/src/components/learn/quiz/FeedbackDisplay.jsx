import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
  const rawAnswer = feedback.correctAnswer || "";

  // Extract primary diagnostic message from Smart Analyser or working note
  const diagnosticSummary =
    feedback.analysis?.summary ||
    feedback.workingNote ||
    null;

  const sentenceItems = feedback.analysis?.feedback || [];

  const nextAction = feedback.analysis?.nextAction || null;
  const confidenceScore = feedback.analysis?.dimensions?.diagnosticConfidence || null;
  const recurrence = feedback.analysis?.recurrence || null;

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-needs-review"}`}>
      {/* Header Bar with Readiness Confidence */}
      <div className="fb-header">
        <div className="fb-status-wrapper" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span className={`fb-status-badge ${isCorrect ? "fb-badge-success" : "fb-badge-review"}`}>
            {isCorrect ? "✓ Mastered" : "Needs Review"}
          </span>
          {confidenceScore !== null && (
            <span className="smart-analysis-readiness-pill">
              Readiness: {confidenceScore}%
            </span>
          )}
        </div>
        <span className="fb-progress-pill">
          {qIdx + 1} / {totalQs}
        </span>
      </div>

      {/* Recurrence Warning (When misconception is repeated across attempts) */}
      {!isCorrect && recurrence && recurrence.count > 1 && (
        <div className="smart-analysis-recurrence-badge">
          ⚠️ {recurrence.label} (Attempted {recurrence.count}x)
        </div>
      )}

      {/* Minimalist Diagnostic Insight (When Incorrect) */}
      {!isCorrect && (
        <div className="smart-analysis-container">
          {/* What student wrote */}
          {feedback.analysis?.studentSaid && (
            <div className="smart-analysis-you-said">
              <span className="smart-analysis-label">You wrote:</span>
              <span className="smart-analysis-quote">"{feedback.analysis.studentSaid}"</span>
            </div>
          )}

          {/* Primary Diagnostic Breakpoint Explanation */}
          {diagnosticSummary && (
            <div className="smart-analysis-summary">
              {diagnosticSummary}
            </div>
          )}

          {/* Sentence Feedback List */}
          {sentenceItems.length > 0 && (
            <div className="smart-analysis-list">
              {sentenceItems.map((item, i) => (
                <div
                  key={i}
                  className={`smart-analysis-item smart-analysis-item--${
                    item.type === "segment_correct" || item.type === "step_correct"
                      ? "correct"
                      : item.type === "step_partial" || item.type === "missing_qualifier"
                      ? "warn"
                      : "wrong"
                  }`}
                >
                  <span className="smart-analysis-item-icon">{item.icon}</span>
                  <span className="smart-analysis-item-text">{item.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Closed-Loop Learning Policy Directive (Tixar Next Action) */}
      {!isCorrect && nextAction && (
        <div className="smart-policy-card">
          <div className="smart-policy-header">
            <span className="smart-policy-badge">{nextAction.badge}</span>
            <span className="smart-policy-title">{nextAction.title}</span>
          </div>
          <p className="smart-policy-instruction">{nextAction.instruction}</p>
        </div>
      )}

      {/* Correct Target Answer */}
      {!isCorrect && rawAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-section-title">Correct Answer</div>
          <div className="fb-answer-value">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {rawAnswer}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Step-by-Step Solution (when steps exist — auto-generated or from DB) */}
      {!isCorrect && feedback.steps && feedback.steps.length > 0 && (
        <div className="fb-steps-container">
          <div className="fb-section-title">How to Solve It</div>
          <div className="fb-steps-timeline">
            {feedback.steps.map((step, i) => (
              <div key={i} className="fb-step-card">
                <span className="fb-step-badge">Step {i + 1}</span>
                <div className="fb-step-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {step.replace(/^step\s*\d+\s*:\s*/i, "")}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Solution / Explanation — Only shown if no steps exist or if it provides distinct non-redundant context */}
      {feedback.solution && (!feedback.steps || feedback.steps.length === 0) && (
        <div className="fb-explanation-box">
          <div className="fb-section-title">Explanation</div>
          <div className="fb-explanation-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {feedback.solution}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="fb-actions">
        {!isCorrect && startMutatedRepair && (
          <button
            type="button"
            className="fb-action-btn fb-repair-btn"
            onClick={startMutatedRepair}
            disabled={grading}
          >
            {nextAction?.btnText || "Try Variant Question"}
          </button>
        )}
        {!isCorrect && goToReview && (
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
