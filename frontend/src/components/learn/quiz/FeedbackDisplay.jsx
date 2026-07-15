function FeedbackDisplay({
  feedback,
  showAnswer,
  setShowAnswer,
  nextQuestion,
  finishTopic,
  grading,
  qIdx,
  totalQs,
}) {
  const isLastQuestion = qIdx >= totalQs - 1;

  if (!feedback) return null;

  return (
    <div className={`fb-box ${feedback.isCorrect ? "fb-cor" : "fb-wrn"}`}>
      <div className="fb-h">
        {feedback.isCorrect ? (
          <>
            <span style={{ fontSize: "1.2rem" }}>✅</span> Correct Answer!
          </>
        ) : (
          <>
            <span style={{ fontSize: "1.2rem" }}>❌</span> Not quite right, let's review.
          </>
        )}
      </div>

      <div className="fb-b">
        <div className="fb-section">
          <div className="fb-label">Explanation</div>
          <div className="fb-text">
            {feedback.solution || "No explanation provided."}
          </div>
        </div>

        {!feedback.isCorrect && feedback.correctAnswer && !showAnswer && (
          <button type="button" className="btn-g" onClick={() => setShowAnswer(true)}>
            Show Correct Answer
          </button>
        )}

        {showAnswer && !feedback.isCorrect && feedback.correctAnswer && (
          <div className="fb-section">
            <div className="fb-label">Correct Answer</div>
            <div className="fb-text" style={{ fontWeight: "700" }}>{feedback.correctAnswer}</div>
          </div>
        )}
      </div>

      <div className="btn-row fb-btn-row">
        <button
          type="button"
          className="btn-p"
          onClick={() => {
            setShowAnswer(false);
            if (isLastQuestion) {
              finishTopic();
            } else {
              nextQuestion();
            }
          }}
          disabled={grading}
          style={{ cursor: grading ? "not-allowed" : "pointer" }}
        >
          {isLastQuestion ? "Finish Topic" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

export default FeedbackDisplay;
