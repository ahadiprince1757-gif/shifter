function QuestionDisplay({ questionText, category, rubricEval, proveItState }) {
  if (!questionText) {
    return <div className="q-txt">Question not available</div>;
  }

  let tag = category || null;
  let text = questionText;

  // Extract bracketed mode tag if present
  const tagMatch = questionText.match(/^\[([^\]]+)\]\s*/);
  if (tagMatch) {
    tag = tagMatch[1];
    text = questionText.replace(tagMatch[0], "");
  }

  const rubric = rubricEval?.rubric;
  const level = proveItState?.level;
  const levelLabel = level === 3 ? "Level 3: Real-World CBC Transfer" : level === 2 ? "Level 2: Operational Stress" : "Level 1: Procedural Basis";

  return (
    <div className="q-display-card">
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem", alignItems: "center" }}>
        {rubric && (
          <span
            className="cbc-rubric-badge"
            style={{
              background: rubric.badgeBg,
              color: rubric.badgeText,
              padding: "0.25rem 0.6rem",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "0.75rem",
              border: `1px solid ${rubric.color}`
            }}
          >
            CBC Rubric: {rubric.code} ({rubric.label})
          </span>
        )}

        {proveItState && (
          <span
            className="prove-it-ladder-badge"
            style={{
              background: "rgba(99, 102, 241, 0.12)",
              color: "#4f46e5",
              padding: "0.25rem 0.6rem",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.75rem",
              border: "1px solid rgba(99, 102, 241, 0.3)"
            }}
          >
            Prove It Ladder: {levelLabel}
          </span>
        )}

        {tag && (
          <span className="q-tag-badge">{tag}</span>
        )}
      </div>

      <div className="q-txt">{text}</div>
    </div>
  );
}

export default QuestionDisplay;
