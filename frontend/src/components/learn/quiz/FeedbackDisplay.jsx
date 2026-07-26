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
}) {
  if (!feedback) return null;

  const isCorrect = feedback.isCorrect;
  const isLastQuestion = qIdx >= totalQs - 1;

  // Format multi-bullet correct answers if present
  const rawAnswer = feedback.correctAnswer || "";
  const answerBulletList = rawAnswer.includes("•")
    ? rawAnswer.split("•").map((s) => s.trim()).filter(Boolean)
    : null;

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-incorrect"}`}>
      {/* Top Banner Status */}
      <div className="fb-header">
        <div className="fb-status-wrapper">
          <div className={`fb-icon-ring ${isCorrect ? "fb-ring-success" : "fb-ring-error"}`}>
            <span className="fb-status-icon">{isCorrect ? "✓" : "💡"}</span>
          </div>
          <div className="fb-status-info">
            <div className="fb-verdict-title">
              {isCorrect ? "Spot on! Outstanding work" : "Not quite — let's master this"}
            </div>
            <div className="fb-verdict-subtitle">
              {isCorrect
                ? "You answered this question correctly."
                : "Review the breakdown below to understand the key concept."}
            </div>
          </div>
        </div>

        <div className="fb-meta-badges">
          {isCorrect && <span className="fb-xp-badge">+10 XP</span>}
          <span className="fb-progress-pill">
            {qIdx + 1} / {totalQs}
          </span>
        </div>
      </div>

      {/* Correct answer display (for incorrect submissions) */}
      {!isCorrect && rawAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-section-header">
            <span className="fb-section-icon">🎯</span>
            <span className="fb-section-title">Correct Target Answer</span>
          </div>
          {answerBulletList ? (
            <ul className="fb-answer-bullets">
              {answerBulletList.map((item, idx) => (
                <li key={idx} className="fb-answer-bullet-item">
                  <span className="bullet-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="fb-answer-value">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {rawAnswer}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Step-by-step guidance if available */}
      {!isCorrect && Array.isArray(feedback.steps) && feedback.steps.length > 0 && (
        <div className="fb-steps-container">
          <div className="fb-section-header">
            <span className="fb-section-icon">🧩</span>
            <span className="fb-section-title">Step-by-Step Breakdown</span>
          </div>
          <div className="fb-steps-timeline">
            {feedback.steps.map((step, i) => (
              <div key={i} className="fb-step-card">
                <div className="fb-step-badge">Step {i + 1}</div>
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

      {/* Explanation / Solution text */}
      {feedback.solution && (
        <div className="fb-explanation-box">
          <div className="fb-section-header">
            <span className="fb-section-icon">💡</span>
            <span className="fb-section-title">Key Concept Explanation</span>
          </div>
          <div className="fb-explanation-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {feedback.solution}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Navigation action buttons */}
      <div className="fb-actions">
        {!isCorrect && (
          <button
            type="button"
            className="btn-g fb-action-btn fb-review-btn"
            onClick={goToReview}
            disabled={grading}
          >
            📖 Review Concept
          </button>
        )}
        <button
          type="button"
          className="btn-p fb-action-btn fb-next-btn"
          onClick={() => {
            if (isLastQuestion) {
              finishTopic();
            } else {
              nextQuestion();
            }
          }}
          disabled={grading}
        >
          {isLastQuestion ? "Finish Topic 🎉" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

export default FeedbackDisplay;

