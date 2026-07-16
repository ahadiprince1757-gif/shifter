function QuestionDisplay({ questionText }) {
  return (
    <div className="q-txt">{questionText || "Question not available"}</div>
  );
}

export default QuestionDisplay;
