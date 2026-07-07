function QuestionDisplay({ isCalc, questionText }) {
  return (
    <>
      <div className={`q-type-badge ${isCalc ? "qtb-calc" : "qtb-written"}`}>
        {isCalc ? "Calculation Question" : "Written / Explanation Question"}
      </div>

      <div className="q-txt">{questionText || "Question not available"}</div>
    </>
  );
}

export default QuestionDisplay;
