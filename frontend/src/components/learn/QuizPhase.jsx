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
    const originalQ = content?.qs?.[qIdx];
    return (
      <div className="lc" id="qCard">
        <div className="lch">
          <span className="lbadge lb-n">📖 Review</span>
          <span className="lct">{topic}</span>
        </div>
        <div className="lcb">
          <div className="review-box">
            <div className="review-header">
              <h3 className="review-title">Let's Review This Concept</h3>
            </div>
            <div className="review-body">
              {originalQ?.steps && originalQ.steps.length > 0 && (
                <div className="review-section">
                  <h4 className="review-section-title">Step-by-Step Breakdown</h4>
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
                <div className="review-section highlight-section">
                  <h4 className="review-section-title">Correct Answer</h4>
                  <p className="review-answer-text">{originalQ.ans}</p>
                </div>
              )}
              {originalQ?.why && (
                <div className="review-section">
                  <h4 className="review-section-title">Explanation</h4>
                  <p className="review-explanation-text">{originalQ.why}</p>
                </div>
              )}
              {originalQ?.sol && originalQ.sol !== originalQ.why && (
                <div className="review-section">
                  <h4 className="review-section-title">Solution</h4>
                  <p className="review-explanation-text">{originalQ.sol}</p>
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

