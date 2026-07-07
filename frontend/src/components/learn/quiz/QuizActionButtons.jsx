function QuizActionButtons({
  showHint,
  setShowHint,
  submitAnswer,
  grading,
  canSubmit,
}) {
  return (
    <div className="btn-row" style={{ marginTop: ".8rem" }}>
      <button className="btn-g" onClick={() => setShowHint(!showHint)}>
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      <button
        className="btn-p"
        onClick={submitAnswer}
        disabled={grading || !canSubmit}
      >
        {grading ? "Checking..." : "Submit Answer"}
      </button>
    </div>
  );
}

export default QuizActionButtons;
