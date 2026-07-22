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
        <span className={`fb-dot ${isCorrect ? "fb-dot-correct" : "fb-dot-incorrect"}`} />
        <span className="fb-verdict-text">
          {isCorrect ? "✓ Correct!" : "✕ Needs Review"}
        </span>
        <span className="fb-progress">{qIdx + 1} / {totalQs}</span>
      </div>

      {/* Correct answer display (for incorrect submissions) */}
      {!isCorrect && rawAnswer && (
        <div className="fb-answer">
          <span className="fb-answer-label">Correct Answer:</span>
          {answerBulletList ? (
            <ul className="fb-answer-bullets">
              {answerBulletList.map((item, idx) => (
                <li key={idx} className="fb-answer-bullet-item">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <span className="fb-answer-value">{rawAnswer}</span>
          )}
        </div>
      )}

      {/* Step-by-step guidance if available */}
      {!isCorrect && Array.isArray(feedback.steps) && feedback.steps.length > 0 && (
        <div className="fb-steps-box">
          <h4 className="fb-explanation-title">Step-by-Step Breakdown</h4>
          <ol className="review-steps-list">
            {feedback.steps.map((step, i) => (
              <li key={i} className="review-step-item">
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Explanation / Solution text */}
      {feedback.solution && (
        <div className="fb-explanation">
          <h4 className="fb-explanation-title">Explanation</h4>
          <div className="fb-explanation-text">
            {feedback.solution}
          </div>
        </div>
      )}

      {/* Navigation action buttons */}
      {isCorrect ? (
        <button
          type="button"
          className="btn-p fb-action"
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
      ) : (
        <div className="fb-actions">
          <button
            type="button"
            className="btn-g fb-action"
            onClick={goToReview}
            disabled={grading}
          >
            Review Concept 📖
          </button>
          <button
            type="button"
            className="btn-p fb-action"
            onClick={() => {
              if (isLastQuestion) {
                finishTopic();
              } else {
                nextQuestion();
              }
            }}
            disabled={grading}
          >
            {isLastQuestion ? "Finish Topic" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FeedbackDisplay;
