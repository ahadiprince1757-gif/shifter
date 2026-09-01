import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";

/**
 * TransferPhase
 *
 * Structural Representation Transfer Phase.
 * Tests if the student can apply the exact same mathematical/conceptual structure
 * when re-framed into a different representation (e.g., geometric area vs pure multiplication,
 * visual diagram vs formula equation).
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

  const isMCQ = q.type === "mcq" && Array.isArray(q.options) && q.options.length > 0;

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
          <span className="lbadge lb-transfer">Representation Transfer</span>
          <span className="transfer-header-sub">Apply concept in a new structure</span>
        </div>
      </div>

      <div className="lcb">
        {!feedback && (
          <div className="transfer-framing-card">
            <div className="transfer-framing-text">
              <strong>Representation Challenge:</strong> This question re-frames the underlying concept into a new structural representation. Solve for the exact result using the same core principles.
            </div>
          </div>
        )}

        <QuestionDisplay
          isCalc={q.type === "calc"}
          questionText={q.q}
        />

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
                rows={3}
                placeholder="Enter your calculation or response…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            )}

            {validationError && (
              <div className="validation-error">{validationError}</div>
            )}

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
                Submit Transfer Answer
              </button>
            </div>
          </>
        )}

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
                ? "✓ Correct — Structural Transfer Complete!"
                : "Not quite — review the structural connection below"}
            </div>

            {feedback.correctAnswer && (
              <div className="transfer-feedback-answer">
                <div className="transfer-answer-label">Correct Solution:</div>
                <div className="transfer-answer-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {String(feedback.correctAnswer)}
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
              See Session Summary →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferPhase;
