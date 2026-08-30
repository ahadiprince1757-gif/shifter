import { useState } from "react";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";
import { evaluateAnswer } from "../../utils/grader";

/**
 * DiagnosticPhase
 *
 * Runs 2-3 quick diagnostic probes before main study.
 * System-driven: determines whether a knowledge gap exists.
 *   - 0 mistakes → skip to RETRIEVE (or Notes optional)
 *   - 1+ mistakes → transition to TEACH
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

  const currentProbe = diagnosticQuestions[currentIndex] || null;
  const q = currentProbe?.q;
  const isMCQ = q?.type === "mcq" && Array.isArray(q?.options);

  if (!q) {
    return (
      <div className="lc" id="diagnosticCard">
        <div className="lcb">
          <p>No diagnostic probes available. Preparing your session…</p>
          <button
            className="btn-p"
            onClick={() => onComplete([])}
            style={{ marginTop: "1rem" }}
          >
            Continue →
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
            🔍 Quick check: Let's see what you already know about this topic.
          </div>
        )}

        <QuestionDisplay
          isCalc={q.type === "calc"}
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
              <textarea
                className="quiz-input"
                rows={3}
                placeholder="Type your answer…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
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
              {feedback.isCorrect ? "✓ Probe Passed" : "✗ Gap Detected"}
            </div>

            <button className="btn-p diagnostic-next-btn" onClick={handleNext}>
              {currentIndex < diagnosticQuestions.length - 1
                ? "Next Probe →"
                : "Complete Diagnosis →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnosticPhase;
