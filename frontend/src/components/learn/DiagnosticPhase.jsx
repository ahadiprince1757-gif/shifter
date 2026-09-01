import { useState, useRef, useEffect } from "react";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";
import { evaluateAnswer } from "../../utils/grader";
import { isCalculationQuestion } from "../../utils/questionTypeHelper";

/**
 * DiagnosticPhase
 *
 * Runs 2-3 quick diagnostic probes before main study.
 * Features an optimized typing experience:
 *   - Auto-focused input
 *   - Press Enter / Ctrl+Enter to submit probe instantly
 *   - Clean professional typography without emojis
 *
 * Props:
 *   diagnosticQuestions  Array<{ qIdx, q }>
 *   onComplete           function(results: Array<{ qIdx, passed }>)
 */
function DiagnosticPhase({ diagnosticQuestions = [], onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [validationError, setValidationError] = useState("");

  const inputRef = useRef(null);

  const currentProbe = diagnosticQuestions[currentIndex] || null;
  const q = currentProbe?.q;
  const isMCQ = q?.type === "mcq" && Array.isArray(q?.options) && q.options.length > 0;

  // Auto-focus answer input on load or question change
  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, feedback]);

  if (!q) {
    return (
      <div className="lc" id="diagnosticCard">
        <div className="lcb">
          <p>No diagnostic probes available. Preparing your session...</p>
          <button
            className="btn-p"
            onClick={() => onComplete([])}
            style={{ marginTop: "1rem" }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!answer.trim()) {
      setValidationError("Please enter an answer before submitting.");
      return;
    }
    setValidationError("");

    const res = evaluateAnswer(answer, q);
    setFeedback(res);

    setResults((prev) => [
      ...prev.filter((r) => r.qIdx !== currentProbe.qIdx),
      { qIdx: currentProbe.qIdx, passed: res.isCorrect },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (answer.trim() && !feedback) {
        handleSubmit();
      }
    }
  };

  const handleNext = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < diagnosticQuestions.length) {
      setCurrentIndex(nextIdx);
      setAnswer("");
      setFeedback(null);
      setShowHint(false);
    } else {
      onComplete(results);
    }
  };

  return (
    <div className="lc" id="diagnosticCard">
      <div className="lch">
        <div className="diagnostic-header-row">
          <span className="lbadge lb-diag">Diagnostic Probe</span>
          <span className="diagnostic-progress-label">
            Probe {currentIndex + 1} of {diagnosticQuestions.length}
          </span>
        </div>
      </div>

      <div className="lcb">
        {!feedback && (
          <div className="diagnostic-framing">
            Quick Check: Test your baseline knowledge on this topic.
          </div>
        )}

        <QuestionDisplay
          isCalc={isCalculationQuestion(q, q?.subject)}
          questionText={q.q}
        />

        {!feedback ? (
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
                      name="diag-mcq"
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
              <div className="probe-input-container">
                <input
                  ref={inputRef}
                  type="text"
                  className="quiz-input probe-input-field"
                  placeholder="Type your answer and press Enter..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="input-shortcut-hint">Press Enter to submit</span>
              </div>
            )}

            {validationError && (
              <div className="validation-error">{validationError}</div>
            )}

            <HintBox showHint={showHint} hintText={q.hint} />

            <div className="diagnostic-action-row">
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
                Submit Probe
              </button>
            </div>
          </>
        ) : (
          <div
            className={`diagnostic-feedback ${
              feedback.isCorrect
                ? "diagnostic-feedback--pass"
                : "diagnostic-feedback--fail"
            }`}
          >
            <div className="diagnostic-feedback-status">
              {feedback.isCorrect ? "Probe Passed" : "Gap Detected"}
            </div>

            <button className="btn-p diagnostic-next-btn" onClick={handleNext}>
              {currentIndex < diagnosticQuestions.length - 1
                ? "Next Probe"
                : "Complete Diagnosis"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnosticPhase;
