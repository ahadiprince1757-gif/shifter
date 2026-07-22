import { useQuizUI } from "../../hooks/useQuizUI";
import QuestionDisplay from "./quiz/QuestionDisplay";
import QuizInputFields from "./quiz/QuizInputFields";
import HintBox from "./quiz/HintBox";
import QuizActionButtons from "./quiz/QuizActionButtons";
import FeedbackDisplay from "./quiz/FeedbackDisplay";

function QuizPhase({
  topic,
  qIdx,
  curQ,
  isCalc,
  answer,
  setAnswer,
  work,
  setWork,
  grading,
  feedback,
  validationError,
  showHint,
  setShowHint,
  submitAnswer,
  nextQuestion,
  finishTopic,
  isLastQuestion,
  totalQs,
  retryState,
  startRetry,
  goToReview,
  content,
}) {
  const { showAnswer, setShowAnswer } = useQuizUI(topic);

  // ── Concept Review Screen ──────────────────────────────────
  if (retryState === "review") {
    const originalQ = activeQuestion || content?.qs?.[qIdx];
    return (
      <div className="lc" id="qCard">
        <div className="lch">
          <span className="lbadge lb-n">📖 Review</span>
          <span className="lct">{topic}</span>
        </div>
        <div className="lcb">
          <div className="fb-card">
            <div className="fb-verdict">
              <span className="fb-dot fb-dot-incorrect" style={{ background: "var(--v)" }} />
              <span className="fb-verdict-text" style={{ color: "var(--v)" }}>Let's Review This Concept</span>
            </div>
            
            <div className="fb-explanation">
              {originalQ?.steps && originalQ.steps.length > 0 && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <h4 className="fb-explanation-title">Step-by-Step Breakdown</h4>
                  <ol className="review-steps-list">
                    {originalQ.steps.map((step, i) => (
                      <li key={i} className="review-step-item">
                        <span className="step-text">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              {originalQ?.ans && (
                <div className="fb-answer" style={{ marginBottom: "1.25rem" }}>
                  <span className="fb-answer-label">Correct Answer</span>
                  <span className="fb-answer-value">{originalQ.ans}</span>
                </div>
              )}
              
              {(originalQ?.why || originalQ?.sol) && (
                <div>
                  <h4 className="fb-explanation-title">Explanation</h4>
                  <div className="fb-explanation-text">
                    {originalQ.why}
                    {originalQ?.sol && originalQ.sol !== originalQ.why && (
                      <div style={{ marginTop: "0.5rem" }}>{originalQ.sol}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className="btn-p" onClick={startRetry} style={{ marginTop: "1rem", width: "100%" }}>
            Try Restructured Question →
          </button>
        </div>
      </div>
    );
  }

  // ── Normal / Retry Question Screen ─────────────────────────
  const isMCQ = curQ?.type === "mcq" && Array.isArray(curQ?.options);

  return (
    <div className="lc" id="qCard">
      <div className="lch">
        <span className="lbadge lb-q">
          {retryState === "retry" ? "🔄 Retry" : `🧠 Question ${qIdx + 1}`}
        </span>
        <span className="lct">{topic}</span>
      </div>

      <div className="lcb">
        <QuestionDisplay isCalc={isCalc} questionText={curQ?.q} />

        {isMCQ ? (
          <div className="mcq-group">
            {curQ.options.map((opt, i) => (
              <label
                key={i}
                className={`mcq-option${answer === opt ? " mcq-selected" : ""}${feedback ? " mcq-disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="mcq"
                  className="mcq-radio"
                  value={opt}
                  checked={answer === opt}
                  onChange={() => !feedback && !grading && setAnswer(opt)}
                  disabled={!!feedback || grading}
                />
                <span className="mcq-label">{opt}</span>
              </label>
            ))}
          </div>
        ) : (
          <QuizInputFields
            isCalc={isCalc}
            work={work}
            setWork={setWork}
            answer={answer}
            setAnswer={setAnswer}
            disabled={feedback || grading}
          />
        )}

        {validationError && (
          <div className="validation-error">{validationError}</div>
        )}

        <HintBox showHint={showHint} hintText={curQ?.hint} />

        {!feedback && (
          <QuizActionButtons
            showHint={showHint}
            setShowHint={setShowHint}
            submitAnswer={submitAnswer}
            grading={grading}
            canSubmit={!!answer.trim()}
          />
        )}

        <FeedbackDisplay
          feedback={feedback}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
          nextQuestion={nextQuestion}
          finishTopic={finishTopic}
          isLastQuestion={isLastQuestion}
          grading={grading}
          qIdx={qIdx}
          totalQs={totalQs}
          goToReview={goToReview}
          retryState={retryState}
        />
      </div>
    </div>
  );
}

export default QuizPhase;

