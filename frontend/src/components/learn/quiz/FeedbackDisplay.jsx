import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function FeedbackDisplay({
  feedback,
  nextQuestion,
  finishTopic,
  grading,
  qIdx,
  totalQs,
  goToReview,
}) {
  if (!feedback) return null;

  const isCorrect = feedback.isCorrect;
  const isLastQuestion = qIdx >= totalQs - 1;
  const confidence = feedback.confidence; // "low" | "medium" | "high" | null

  const rawAnswer = feedback.correctAnswer || "";
  const answerBulletList = rawAnswer.includes("•")
    ? rawAnswer.split("•").map((s) => s.trim()).filter(Boolean)
    : null;

  // Calibration insight: cross-reference correctness with confidence
  const getCalibrationInsight = () => {
    if (!confidence) return null;
    if (!isCorrect && confidence === "high") {
      return {
        type: "misconception",
        message:
          "Concept Misconception — you were very confident but answered incorrectly. Review the explanation carefully; this is a priority area.",
      };
    }
    if (isCorrect && confidence === "low") {
      return {
        type: "unsure",
        message:
          "Lucky Guess / Unsure — you got it right but weren't confident. This topic is flagged for earlier review to reinforce it properly.",
      };
    }
    if (!isCorrect && confidence === "medium") {
      return {
        type: "knowledge-gap",
        message:
          "Knowledge Gap — study the explanation below, then use 'Review Concept' to see the full solution before retrying.",
      };
    }
    return null;
  };

  const calibration = getCalibrationInsight();

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-needs-review"}`}>
      {/* Header Status */}
      <div className="fb-header">
        <div className="fb-status-wrapper">
          <span className={`fb-status-badge ${isCorrect ? "fb-badge-success" : "fb-badge-review"}`}>
            {isCorrect ? "Correct" : "Needs Review"}
          </span>
        </div>
        <span className="fb-progress-pill">
          {qIdx + 1} / {totalQs}
        </span>
      </div>

      {/* Calibration Insight Banner */}
      {calibration && (
        <div className={`calibration-insight calibration-${calibration.type}`}>
          <div className="calibration-icon">
            {calibration.type === "misconception" ? "!" : calibration.type === "unsure" ? "?" : "i"}
          </div>
          <div className="calibration-text">{calibration.message}</div>
        </div>
      )}

      {/* 1. Direct Explanation / Solution FIRST */}
      {feedback.solution && (
        <div className="fb-explanation-box">
          <div className="fb-section-title">Explanation</div>
          <div className="fb-explanation-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {feedback.solution}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 2. Step-by-Step Breakdown (if available) */}
      {!isCorrect && Array.isArray(feedback.steps) && feedback.steps.length > 0 && (
        <div className="fb-steps-container">
          <div className="fb-section-title">Step-by-Step Solution</div>
          <div className="fb-steps-timeline">
            {feedback.steps.map((step, i) => (
              <div key={i} className="fb-step-card">
                <span className="fb-step-badge">Step {i + 1}</span>
                <div className="fb-step-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {step.replace(/^step\s*\d+\s*:\s*/i, "")}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Correct Target Answer SECOND */}
      {!isCorrect && rawAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-section-title">Correct Answer</div>
          {answerBulletList ? (
            <ul className="fb-answer-bullets">
              {answerBulletList.map((item, idx) => (
                <li key={idx} className="fb-answer-bullet-item">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="fb-answer-value">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {rawAnswer}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="fb-actions">
        {!isCorrect && (
          <button
            type="button"
            className="fb-action-btn fb-review-btn"
            onClick={goToReview}
            disabled={grading}
          >
            Review Concept
          </button>
        )}
        <button
          type="button"
          className="fb-action-btn fb-next-btn"
          onClick={() => {
            if (isLastQuestion) {
              finishTopic();
            } else {
              nextQuestion();
            }
          }}
          disabled={grading}
        >
          {isLastQuestion ? "Finish Topic" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

export default FeedbackDisplay;
