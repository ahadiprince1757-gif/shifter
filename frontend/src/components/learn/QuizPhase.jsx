import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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
  activeQuestion,
  startRetry,
  goToReview,
  content,
}) {
  const { showAnswer, setShowAnswer } = useQuizUI(topic);

  // ── Concept Review Screen ──────────────────────────────────
  if (retryState === "review") {
    const originalQ = activeQuestion || content?.qs?.[qIdx];
    const rawAnswer = originalQ?.ans || "";
    return (
      <div className="lc" id="qCard">
        <div className="lch">
          <span className="lbadge lb-n">📖 Concept Review</span>
        </div>
        <div className="lcb">
          <div className="fb-card fb-review-mode">
            <div className="fb-header">
              <div className="fb-status-wrapper">
                <div className="fb-icon-ring fb-ring-review">
                  <span className="fb-status-icon">📖</span>
                </div>
                <div className="fb-status-info">
                  <div className="fb-verdict-title">Concept Deep-Dive</div>
                  <div className="fb-verdict-subtitle">
                    Study the solution below, then attempt the restructured question.
                  </div>
                </div>
              </div>
            </div>

            {/* Target Answer */}
            {rawAnswer && (
              <div className="fb-correct-answer-box">
                <div className="fb-section-header">
                  <span className="fb-section-icon">🎯</span>
                  <span className="fb-section-title">Correct Target Answer</span>
                </div>
                <div className="fb-answer-value">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {rawAnswer}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Step-by-Step Breakdown */}
            {originalQ?.steps && originalQ.steps.length > 0 && (
              <div className="fb-steps-container">
                <div className="fb-section-header">
                  <span className="fb-section-icon">🧩</span>
                  <span className="fb-section-title">Step-by-Step Breakdown</span>
                </div>
                <div className="fb-steps-timeline">
                  {originalQ.steps.map((step, i) => (
                    <div key={i} className="fb-step-card">
                      <div className="fb-step-badge">Step {i + 1}</div>
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

            {/* Explanation */}
            {(originalQ?.why || originalQ?.sol) && (
              <div className="fb-explanation-box">
                <div className="fb-section-header">
                  <span className="fb-section-icon">💡</span>
                  <span className="fb-section-title">Key Concept Explanation</span>
                </div>
                <div className="fb-explanation-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {originalQ.why || originalQ?.sol}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <button className="btn-p fb-action-btn fb-next-btn" onClick={startRetry} style={{ marginTop: "1.2rem", width: "100%" }}>
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
          {retryState === "retry" ? "🔄 Retry" : `🧠 Question ${qIdx + 1} of ${totalQs || 1}`}
        </span>
      </div>

      <div className="lcb">
        {retryState === "retry" && (
          <div className="retry-mode-banner">
            🔄 Restructured Question — Same concept, different approach. Show what you know!
          </div>
        )}
        <QuestionDisplay isCalc={isCalc} questionText={curQ?.q} />

        {isMCQ ? (
          <div className="mcq-group">
            {curQ.options.map((opt, i) => (
              <label
                key={i}
                className={`mcq-option${answer === opt ? " mcq-selected" : ""}${feedback ? " mcq-disabled" : ""}`}
                onClick={() => !feedback && !grading && setAnswer(opt)}
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
                <span className="mcq-letter">
                  {String.fromCharCode(65 + i)}
                </span>
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

