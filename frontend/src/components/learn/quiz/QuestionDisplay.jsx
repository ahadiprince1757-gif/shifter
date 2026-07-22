function QuestionDisplay({ questionText, category }) {
  if (!questionText) {
    return <div className="q-txt">Question not available</div>;
  }

  let tag = category || null;
  let text = questionText;

  // Extract bracketed mode tag (e.g. "[Application Scenario] ...") if present
  const tagMatch = questionText.match(/^\[([^\]]+)\]\s*/);
  if (tagMatch) {
    tag = tagMatch[1];
    text = questionText.replace(tagMatch[0], "");
  }

  return (
    <div className="q-display-card">
      {tag && (
        <div className="q-tag-row">
          <span className="q-tag-badge">💡 {tag}</span>
        </div>
      )}
      <div className="q-txt">{text}</div>
    </div>
  );
}

export default QuestionDisplay;
