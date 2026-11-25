import React from "react";
import ContentSection from "../../content/ContentSection";

/**
 * QuizInputFields
 *
 * Clean, calm input areas following Global Layout Rules.
 * Structure through typography and purposeful vertical spacing,
 * without heavy colored boxes or noisy decorative borders.
 */
function QuizInputFields({
  isCalc,
  mode = "conceptual",
  work,
  setWork,
  answer,
  setAnswer,
  disabled,
}) {
  const requiresWorking = isCalc || mode === "calculation";

  if (requiresWorking) {
    return (
      <div className="quiz-input-container" style={{ marginTop: "var(--space-5)" }}>
        <ContentSection title="YOUR WORKING (STEP-BY-STEP)">
          <textarea
            className="editorial-textarea"
            placeholder="Write each step of your calculation..."
            value={work}
            onChange={(e) => setWork(e.target.value)}
            disabled={disabled}
            rows={5}
            style={{
              width: "100%",
              padding: "12px 14px",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "15px",
              lineHeight: "1.6",
              color: "var(--text-primary)",
              background: "var(--surface)",
              border: "1px solid var(--border-subtle, #e5e5e5)",
              borderRadius: "var(--radius-control, 8px)",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </ContentSection>

        <ContentSection title="FINAL ANSWER" style={{ marginTop: "var(--space-4)" }}>
          <input
            type="text"
            className="editorial-input"
            placeholder="Your final result..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={disabled}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontFamily: "var(--font-family)",
              fontSize: "15.5px",
              color: "var(--text-primary)",
              background: "var(--surface)",
              border: "1px solid var(--border-subtle, #e5e5e5)",
              borderRadius: "var(--radius-control, 8px)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </ContentSection>
      </div>
    );
  }

  if (mode === "short_answer") {
    return (
      <div className="quiz-input-container" style={{ marginTop: "var(--space-5)" }}>
        <ContentSection title="YOUR ANSWER">
          <input
            type="text"
            className="editorial-input"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={disabled}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontFamily: "var(--font-family)",
              fontSize: "15.5px",
              color: "var(--text-primary)",
              background: "var(--surface)",
              border: "1px solid var(--border-subtle, #e5e5e5)",
              borderRadius: "var(--radius-control, 8px)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </ContentSection>
      </div>
    );
  }

  return (
    <div className="quiz-input-container" style={{ marginTop: "var(--space-5)" }}>
      <ContentSection title="YOUR RESPONSE">
        <textarea
          className="editorial-textarea"
          placeholder="Explain your thinking or response..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={disabled}
          rows={4}
          style={{
            width: "100%",
            padding: "12px 14px",
            fontFamily: "var(--font-family)",
            fontSize: "15px",
            lineHeight: "1.6",
            color: "var(--text-primary)",
            background: "var(--surface)",
            border: "1px solid var(--border-subtle, #e5e5e5)",
            borderRadius: "var(--radius-control, 8px)",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </ContentSection>
    </div>
  );
}

export default QuizInputFields;
