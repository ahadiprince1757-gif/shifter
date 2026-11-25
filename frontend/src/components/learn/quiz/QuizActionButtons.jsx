import React from "react";

/**
 * QuizActionButtons
 *
 * One primary action: Submit Answer.
 * Secondary helper: Hint (calm, understated).
 * Conforms to Rule 7 (ONE CLEAR ACTION) and Rule 8 (CONTENT BEFORE DECORATION).
 */
function QuizActionButtons({
  showHint,
  setShowHint,
  submitAnswer,
  grading,
  canSubmit,
}) {
  return (
    <div style={{ marginTop: "var(--space-6)", display: "flex", flexDirection: "column", gap: "10px" }}>
      <button
        type="button"
        className="primary-action-btn"
        onClick={submitAnswer}
        disabled={grading || !canSubmit}
      >
        {grading ? "CHECKING..." : "SUBMIT ANSWER →"}
      </button>

      <button
        type="button"
        className="secondary-action-btn"
        onClick={() => setShowHint(!showHint)}
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>
    </div>
  );
}

export default QuizActionButtons;
