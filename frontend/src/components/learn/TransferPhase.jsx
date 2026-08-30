import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";

/**
 * TransferPhase
 *
 * Final active phase of the session loop.
 * Shows a novel-context question and asks the learner to apply what they know.
 * After answering (right or wrong), the session summary is unlocked.
 *
 * Props:
 *   transferQuestion   { qIdx, q }   — from useSessionLoop.transferQuestion
 *   answer             string
 *   setAnswer          function
 *   feedback           object | null
 *   confidence         string | null
 *   setConfidence      function
 *   onSubmit           function       — submitTransferAnswer from useSessionLoop
 *   onFinish           function       — finishSession from useSessionLoop
 */
function TransferPhase({
  transferQuestion,
  answer,
  setAnswer,
  feedback,
  confidence,
  setConfidence,
  onSubmit,
  onFinish,
}) {
  const [showHint, setShowHint] = useState(false);
  const [validationError, setValidationError] = useState("");

  const q = transferQuestion?.q;
  if (!q) return null;

  const isMCQ = q.type === "mcq" && Array.isArray(q.options);

  const handleSubmit = () => {
    if (!answer.trim()) {
      setValidationError("Please write your answer before submitting.");
      return;
    }
    setValidationError("");
    onSubmit();
  };

  return (
    <div className="lc" id="transferCard">
      <div className="lch">
        <div className="transfer-header-row">
          <span className="lbadge lb-transfer">Transfer</span>
          <span className="transfer-header-sub">Apply what you know</span>
        </div>
      </div>

      <div className="lcb">
        {/* Framing message */}
        {!feedback && (
          <div className="transfer-framing-card">
            <div className="transfer-framing-icon">🔗</div>
            <div className="transfer-framing-text">
              This question uses the same concept in a new context. There's no
              notes page to consult — show that you can apply what you learned.
            </div>
          </div>
        )}

        <QuestionDisplay
          isCalc={q.type === "calc"}
          questionText={q.q}
        />

        {/* Answer input */}
        {!feedback && (
          <>
            {isMCQ ? (
              <div className="mcq-group">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`mcq-option${answer === opt ? " mcq-selected" : ""}`}
                    onClick={() => setAnswer(opt)}
                  >
                    <input
                      type="radio"
                      name="transfer-mcq"
                      className="mcq-radio"
                      value={opt}
                      checked={answer === opt}
                      onChange={() => setAnswer(opt)}
                    />
                    <span className="mcq-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="mcq-label">{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                className="quiz-input"
                rows={4}
                placeholder="Write your answer here…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            )}

            {validationError && (
              <div className="validation-error">{validationError}</div>
            )}

            {/* Confidence selector */}
            {answer.trim() && (
              <div className="confidence-selector">
                <div className="confidence-selector-label">
                  How confident are you in this answer?
                </div>
                <div className="confidence-btn-group">
                  {["low", "medium", "high"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`confidence-btn confidence-btn--${level}${
                        confidence === level ? " confidence-btn--active" : ""
                      }`}
                      onClick={() => setConfidence(level)}
                    >
                      {level === "low"
                        ? "Not Sure"
                        : level === "medium"
                        ? "Fairly Sure"
                        : "Very Sure"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <HintBox showHint={showHint} hintText={q.hint} />

            <div className="transfer-action-row">
              {q.hint && (
                <button
                  className="btn-g"
                  onClick={() => setShowHint((s) => !s)}
                >
                  {showHint ? "Hide hint" : "Show hint"}
                </button>
              )}
              <button
                className="btn-p"
                onClick={handleSubmit}
                disabled={!answer.trim()}
              >
                Submit
              </button>
            </div>
          </>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            className={`transfer-feedback ${
              feedback.isCorrect
                ? "transfer-feedback--pass"
                : "transfer-feedback--fail"
            }`}
          >
            <div className="transfer-feedback-status">
              {feedback.isCorrect
                ? "✓ Correct — you can transfer this knowledge"
                : "Not quite — but attempting transfer is how retention is built"}
            </div>

            {feedback.correctAnswer && (
              <div className="transfer-feedback-answer">
                <div className="transfer-answer-label">Model answer:</div>
                <div className="transfer-answer-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {feedback.correctAnswer}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {feedback.solution && (
              <div className="transfer-feedback-why">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {feedback.solution}
                </ReactMarkdown>
              </div>
            )}

            <button className="btn-p transfer-finish-btn" onClick={onFinish}>
              See session summary →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferPhase;
