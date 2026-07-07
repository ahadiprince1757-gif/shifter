function MasteredPhase({
  topic,
  content,
  nextTopic,
  goBack,
  goToNext,
  failedQuestions,
}) {
  const hasMistakes = failedQuestions && failedQuestions.length > 0;

  // Extract key learning points from quiz questions
  const extractKeyPoints = () => {
    if (!content?.qs || content.qs.length === 0) {
      return ["Core concepts and fundamentals"];
    }

    const points = [];
    const keywords = [
      "calculating",
      "converting",
      "understanding",
      "solving",
      "applying",
      "identifying",
      "analyzing",
      "evaluating",
      "working with",
      "using",
      "determining",
      "finding",
    ];

    content.qs.forEach((q) => {
      if (q.q) {
        const lowerQ = q.q.toLowerCase();

        // Try to find meaningful learning outcomes
        for (let keyword of keywords) {
          if (lowerQ.includes(keyword)) {
            // Extract the concept after the keyword
            const regex = new RegExp(
              `${keyword}\\s+([a-zA-Z\\s]+?)(?:\\?|$|\\.|,)`,
            );
            const match = lowerQ.match(regex);
            if (match && match[1]) {
              const concept = match[1]
                .trim()
                .split(/\s+/)
                .slice(0, 3)
                .join(" ");
              if (
                concept &&
                concept.length > 2 &&
                !points.some((p) =>
                  p.toLowerCase().includes(concept.toLowerCase()),
                )
              ) {
                points.push(
                  `${keyword} ${concept}`.charAt(0).toUpperCase() +
                    `${keyword} ${concept}`.slice(1),
                );
              }
            }
          }
        }

        // Fallback: extract first meaningful chunk
        if (points.length < 5) {
          const cleanQ = q.q
            .replace(/[?!.,:;]/g, "")
            .split(" ")
            .slice(0, 4)
            .join(" ");
          if (
            cleanQ &&
            cleanQ.length > 3 &&
            !points.some((p) => p.toLowerCase().includes(cleanQ.toLowerCase()))
          ) {
            points.push(cleanQ);
          }
        }
      }
    });

    return points.length > 0
      ? points.slice(0, 5)
      : ["Core concepts and fundamentals"];
  };

  const keyPoints = extractKeyPoints();

  return (
    <div className="lc">
      <div className="lch">
        <span
          className="lbadge"
          style={{ background: "var(--gr)", color: "#fff" }}
        >
          🏆 Mastered
        </span>
      </div>

      <div
        className="lcb"
        style={{ textAlign: "center", padding: "2rem 1rem" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>

        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          Topic Completed!
        </h3>

        <p style={{ color: "var(--t2)", marginBottom: "1.5rem" }}>
          You have successfully completed <strong>{topic}</strong> and mastered
          its concepts.
        </p>

        <div
          style={{
            textAlign: "left",
            background: "rgba(76, 175, 80, 0.08)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <h4 style={{ marginBottom: "0.75rem", color: "var(--gr)" }}>
            ✨ Today's Learning Summary
          </h4>
          <p style={{ color: "var(--t2)", marginBottom: "1rem" }}>
            You successfully learned and mastered <strong>{topic}</strong>.
            Here's what you covered today:
          </p>
          <ul
            style={{
              color: "var(--t2)",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
              lineHeight: 1.8,
            }}
          >
            {keyPoints.map((point, idx) => (
              <li key={idx} style={{ marginBottom: "0.5rem" }}>
                📌 {point}
              </li>
            ))}
            <li style={{ marginBottom: "0.5rem" }}>
              📌 Problem-solving techniques and applications
            </li>
          </ul>
          <p style={{ color: "var(--t2)" }}>
            🚀 I recommend you to explore more complex topics like{" "}
            <strong>{nextTopic}</strong> to deepen your understanding and build
            stronger problem-solving skills!
          </p>
        </div>

        {hasMistakes ? (
          <div
            style={{
              textAlign: "left",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h4 style={{ marginBottom: "0.75rem" }}>Review Mistakes</h4>
            <p style={{ color: "var(--t2)", marginBottom: "1rem" }}>
              These questions were answered incorrectly. Review the correct
              answers and steps below.
            </p>
            {failedQuestions.map((item, index) => (
              <div
                key={`${item.qIdx}-${index}`}
                style={{
                  marginBottom: "1.2rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ marginBottom: "0.5rem", fontWeight: 700 }}>
                  Question {item.qIdx + 1}
                </div>
                <div style={{ marginBottom: "0.5rem", color: "var(--t1)" }}>
                  {item.question}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Correct Answer:</strong>
                  <div style={{ marginTop: "0.35rem", color: "var(--t2)" }}>
                    {item.correctAnswer}
                  </div>
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Explanation / Steps:</strong>
                  <div style={{ marginTop: "0.35rem", color: "var(--t2)", whiteSpace: "pre-line" }}>
                    {item.solution || "No explanation available."}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--t2)", marginBottom: "1.5rem" }}>
            No incorrect questions — great job!
          </p>
        )}

        {nextTopic && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>👉 Next Recommended:</p>
            <strong style={{ display: "block", marginBottom: "0.8rem" }}>
              {nextTopic}
            </strong>

            <button className="btn-p" onClick={goToNext}>
              Continue to Next Topic
            </button>
          </div>
        )}

        <button
          className="btn-p"
          style={{
            background: "transparent",
            color: "var(--t2)",
            marginTop: "0.5rem",
          }}
          onClick={goBack}
        >
          Return to Topics List
        </button>
      </div>
    </div>
  );
}

export default MasteredPhase;
