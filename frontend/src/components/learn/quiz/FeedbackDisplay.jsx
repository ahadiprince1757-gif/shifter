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
    (isCorrect ? "Great job! Your answer is correct and mathematically sound." : null);

  const sentenceItems = feedback.analysis?.feedback || [];
  const nextAction = feedback.analysis?.nextAction || null;
  const confidenceScore = feedback.analysis?.dimensions?.diagnosticConfidence || null;
  const recurrence = feedback.analysis?.recurrence || null;

  // Extract and clean solution & steps to eliminate duplicated headings & text
  const { displaySteps, displayExplanation } = (() => {
    let rawSol = String(feedback.solution || "").trim();
    let stepsList = Array.isArray(feedback.steps) ? [...feedback.steps] : [];

    // Filter out generic fallback steps
    stepsList = stepsList.filter((step) => {
      const s = String(step || "").toLowerCase();
      return !(
        s.includes("identify the modified numerical quantity") ||
        s.includes("determine how the changed quantity affects") ||
        s.includes("recalculate the result") ||
        s.includes("check units") ||
        s.includes("read carefully")
      );
    });

    // Extract step lines if stepsList is empty but rawSol contains "Step 1:"
    if (stepsList.length === 0 && /(?:^|\n)\s*step\s*\d+/i.test(rawSol)) {
      const lines = rawSol.split(/\r?\n/);
      const extractedSteps = [];
      const nonStepLines = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (/^steps?\s*:/i.test(line)) continue;
        if (/^correct\s*answer\s*:/i.test(line)) {
          if (i + 1 < lines.length && lines[i + 1].trim().toLowerCase() === rawAnswer.trim().toLowerCase()) {
            i++;
          }
          continue;
        }
        if (/^explanation\s*:/i.test(line)) continue;

        if (/^step\s*\d+/i.test(line)) {
          extractedSteps.push(line);
        } else if (extractedSteps.length > 0 && line && !line.toLowerCase().startsWith("explanation:")) {
          extractedSteps.push(line);
        } else {
          nonStepLines.push(line);
        }
      }

      if (extractedSteps.length > 0) {
        stepsList = extractedSteps;
        rawSol = nonStepLines.join("\n").trim();
      }
    }

    // Clean up residual headings from rawSol
    let cleanSol = rawSol
      .replace(/(?:^|\n)\s*steps?\s*:\s*/gi, "\n")
      .replace(/(?:^|\n)\s*correct\s*answer\s*:\s*[^\n]*/gi, "")
      .replace(/(?:^|\n)\s*explanation\s*:\s*/gi, "\n")
      .trim();

    if (cleanSol.toLowerCase() === rawAnswer.trim().toLowerCase() || /^\d+$/.test(cleanSol)) {
      cleanSol = "";
    }

    return { displaySteps: stepsList, displayExplanation: cleanSol };
  })();

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-needs-review"}`}>
      {/* Header Bar with Readiness Confidence */}
      <div className="fb-header">
        <div className="fb-status-wrapper" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span className={`fb-status-badge ${isCorrect ? "fb-badge-success" : "fb-badge-review"}`}>
            {isCorrect ? "✓ Mastered" : "Needs Review"}
          </span>
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

      {/* Diagnostic / Summary Container — Always shown */}
      <div className="smart-analysis-container">
        {/* What student wrote */}
        {(feedback.analysis?.studentSaid || feedback.userAnswer || feedback.studentAnswer) && (
          <div className="smart-analysis-you-said">
            <span className="smart-analysis-label">You wrote:</span>
            <span className="smart-analysis-quote">
              "{feedback.analysis?.studentSaid || feedback.userAnswer || feedback.studentAnswer}"
            </span>
          </div>
        )}

        {/* Diagnostic / Encouragement Summary */}
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

      {/* Correct Target Answer — Always shown */}
      {rawAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-section-title">Correct Answer</div>
          <div className="fb-answer-value">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {rawAnswer}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Step-by-Step Solution — Always shown when steps exist */}
      {displaySteps.length > 0 && (
        <div className="fb-steps-container">
          <div className="fb-section-title">How to Solve It</div>
          <div className="fb-steps-timeline">
            {displaySteps.map((step, i) => (
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

      {/* Explanation — Always shown when explanation exists */}
      {displayExplanation && (
        <div className="fb-explanation-box">
          <div className="fb-section-title">Explanation</div>
          <div className="fb-explanation-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {displayExplanation}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Effortless Student Repair Experience: "Here's what went wrong" + "Here's the rule" */}
      {!isCorrect && (feedback.whatWentWrong || feedback.rule) && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem 1.2rem",
            borderRadius: "10px",
            background: "rgba(239, 68, 68, 0.05)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          {feedback.whatWentWrong && (
            <div style={{ marginBottom: "0.75rem" }}>
              <div style={{ fontWeight: 700, color: "var(--rd, #ef4444)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Here's what went wrong:
              </div>
              <div style={{ marginTop: "0.25rem", color: "var(--t)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                {feedback.whatWentWrong}
              </div>
            </div>
          )}

          {feedback.rule && (
            <div>
              <div style={{ fontWeight: 700, color: "var(--v, #6366f1)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Here's the rule:
              </div>
              <div style={{ marginTop: "0.25rem", color: "var(--t)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                {feedback.rule}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Repaired Confirmation */}
      {isCorrect && feedback.isRepaired && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.8rem 1rem",
            borderRadius: "10px",
            background: "rgba(34, 197, 94, 0.06)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "var(--gr, #22c55e)", fontWeight: 700, fontSize: "1.1rem" }}>✓</span>
          <strong style={{ color: "var(--t)", fontSize: "0.9rem" }}>Fixed. We'll check this again later.</strong>
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
