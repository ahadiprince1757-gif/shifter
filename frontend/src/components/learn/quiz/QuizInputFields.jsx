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
      <>
        <div style={{ margin: ".75rem 0" }}>
          <div className="fl">
            Show Your Working
            <span
              style={{
                fontWeight: 400,
                fontSize: ".64rem",
                color: "var(--t3)",
              }}
            >
              (write every step)
            </span>
          </div>
          <textarea
            className="work-ta"
            placeholder="Step 1: Write the formula..."
            value={work}
            onChange={(e) => setWork(e.target.value)}
            disabled={disabled}
          />
        </div>

        <div style={{ margin: ".58rem 0" }}>
          <div className="fl">Your Final Answer</div>
          <input
            type="text"
            className="ans-input"
            placeholder="Type your final calculated answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={disabled}
          />
        </div>
      </>
    );
  }

  if (mode === "short_answer") {
    return (
      <div style={{ margin: ".75rem 0" }}>
        <div className="fl">Your Answer</div>
        <input
          type="text"
          className="ans-input"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div style={{ margin: ".75rem 0" }}>
      <div className="fl">Your Explanation / Response</div>
      <textarea
        className="work-ta"
        placeholder="Type your response here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

export default QuizInputFields;
