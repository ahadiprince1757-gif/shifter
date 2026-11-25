import React from "react";

/**
 * QuizActionButtons
 *
 * Implements Rule 3 & Rule 7:
 * - Primary Action ("SUBMIT ANSWER →"): Signature Tixar brand gradient reserved for the most important cognitive action.
 * - Secondary Action ("Show Hint"): Understated neutral helper.
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
        style={{
          background: grading ? "var(--text-muted)" : "var(--action-primary)",
          color: "var(--action-primary-text, #ffffff)",
          border: "none",
          borderRadius: "var(--radius-control, 8px)",
          fontWeight: 600,
          letterSpacing: "0.02em",
          boxShadow: grading || !canSubmit ? "none" : "0 2px 10px rgba(40, 124, 224, 0.25)",
          cursor: grading || !canSubmit ? "not-allowed" : "pointer",
        }}
      >
        {grading ? "CHECKING..." : "SUBMIT ANSWER →"}
      </button>

      <button
        type="button"
        className="secondary-action-btn"
        onClick={() => setShowHint(!showHint)}
        style={{
          color: "var(--text-secondary, #475569)",
        }}
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>
    </div>
  );
}

export default QuizActionButtons;
