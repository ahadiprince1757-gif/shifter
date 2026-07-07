function QuizInputFields({
  isCalc,
  work,
  setWork,
  answer,
  setAnswer,
  disabled,
}) {
  if (isCalc) {
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
            placeholder="Type your final answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={disabled}
          />
        </div>
      </>
    );
  }

  return (
    <div style={{ margin: ".75rem 0" }}>
      <div className="fl">✍️ Your Full Answer</div>
      <textarea
        className="work-ta"
        placeholder="Write your complete, detailed answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

export default QuizInputFields;
