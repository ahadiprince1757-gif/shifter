function FeedbackDisplay({
  feedback,
  nextQuestion,
  finishTopic,
  grading,
  qIdx,
  totalQs,
  goToReview, // new prop for review navigation
}) {
  const isLastQuestion = qIdx >= totalQs - 1;

  if (!feedback) return null;

  const isCorrect = feedback.isCorrect;

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-incorrect"}`}>
      {/* Verdict line */}
      <div className="fb-verdict">
        <span className={`fb-dot ${isCorrect ? "fb-dot-correct" : "fb-dot-incorrect"}`} />
        <span className="fb-verdict-text">
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
        <span className="fb-progress">{qIdx + 1} / {totalQs}</span>
      </div>

      {/* Correct answer — shown inline for wrong answers */}
      {!isCorrect && feedback.correctAnswer && (
        <div className="fb-answer">
          <span className="fb-answer-label">Correct answer:</span>
          <span className="fb-answer-value">{feedback.correctAnswer}</span>
        </div>
      )}

      {/* Explanation */}
      {feedback.solution && (
        <div className="fb-explanation">
          <h4 className="fb-explanation-title">Explanation</h4>
          <div className="fb-explanation-text">
            {feedback.solution}
          </div>
        </div>
      )}

      {/* Action buttons */}
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
          {isLastQuestion ? "Finish Topic" : "Next Question →"}
        </button>
      ) : (
        <div className="fb-actions">
          <button
            type="button"
            className="btn-g fb-action"
            onClick={goToReview}
            disabled={grading}
          >
            Review Concept
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

