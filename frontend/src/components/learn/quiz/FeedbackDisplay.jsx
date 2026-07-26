function FeedbackDisplay({
  feedback,
  nextQuestion,
  finishTopic,
  grading,
  qIdx,
  totalQs,
  goToReview,
}) {
  const isLastQuestion = qIdx >= totalQs - 1;

  if (!feedback) return null;

  const isCorrect = feedback.isCorrect;

  // Format multi-bullet correct answers if present
  const rawAnswer = feedback.correctAnswer || "";
  const answerBulletList = rawAnswer.includes("•")
    ? rawAnswer.split("•").map((s) => s.trim()).filter(Boolean)
    : null;

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-incorrect"}`}>
      {/* Verdict header */}
      <div className="fb-verdict">
        <div className="fb-verdict-badge">
          <span className={`fb-dot ${isCorrect ? "fb-dot-correct" : "fb-dot-incorrect"}`} />
          <span className="fb-verdict-text">
            {isCorrect ? "✓ Excellent! Correct Answer" : "💡 Not Quite — Let's Learn Why"}
          </span>
        </div>
        <span className="fb-progress">{qIdx + 1} of {totalQs}</span>
      </div>

      {/* Correct answer display (for incorrect submissions) */}
      {!isCorrect && rawAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-answer-label">✓ Correct Answer</div>
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
            <div className="fb-answer-value">{rawAnswer}</div>
          )}
        </div>
      )}

      {/* Step-by-step guidance if available */}
      {!isCorrect && Array.isArray(feedback.steps) && feedback.steps.length > 0 && (
        <div className="fb-steps-container">
          <div className="fb-section-header">
            <span className="fb-section-icon">📌</span>
            <span className="fb-section-title">Step-by-Step Solution</span>
          </div>
          <div className="fb-steps-list">
            {feedback.steps.map((step, i) => (
              <div key={i} className="fb-step-item">
                <span className="fb-step-number">{i + 1}</span>
                <span className="fb-step-text">{step.replace(/^step\s*\d+\s*:\s*/i, "")}</span>
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
            {feedback.solution}
          </div>
        </div>
      )}

      {/* Navigation action buttons */}
      <div className="fb-actions">
        {!isCorrect && (
          <button
            type="button"
            className="btn-g fb-action-btn"
            onClick={goToReview}
            disabled={grading}
          >
            📖 Review Concept
          </button>
        )}
        <button
          type="button"
          className="btn-p fb-action-btn"
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

