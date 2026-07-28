import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useQuizUI } from "../../hooks/useQuizUI";
import QuestionDisplay from "./quiz/QuestionDisplay";
import QuizInputFields from "./quiz/QuizInputFields";
import HintBox from "./quiz/HintBox";
import QuizActionButtons from "./quiz/QuizActionButtons";
import FeedbackDisplay from "./quiz/FeedbackDisplay";
import ConceptReferenceDrawer from "./quiz/ConceptReferenceDrawer";

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
  confidence,
  setConfidence,
}) {
  const { showAnswer, setShowAnswer } = useQuizUI(topic);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Concept Review Screen ──────────────────────────────────
  if (retryState === "review") {
    const originalQ = activeQuestion || content?.qs?.[qIdx];
    const rawAnswer = originalQ?.ans || "";
    return (
      <div className="lc" id="qCard">
        <div className="lch">
          <span className="lbadge lb-n">Concept Review</span>
        </div>
        <div className="lcb">
          <div className="fb-card fb-review-mode">
            <div className="fb-header">
              <div className="fb-status-wrapper">
                <span className="fb-status-badge fb-badge-review">Concept Review</span>
              </div>
            </div>

            {/* 1. Explanation FIRST */}
            {(originalQ?.why || originalQ?.sol) && (
              <div className="fb-explanation-box">
                <div className="fb-section-title">Explanation</div>
                <div className="fb-explanation-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {originalQ.why || originalQ?.sol}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* 2. Step-by-Step Breakdown */}
            {originalQ?.steps && originalQ.steps.length > 0 && (
              <div className="fb-steps-container">
                <div className="fb-section-title">Step-by-Step Solution</div>
                <div className="fb-steps-timeline">
                  {originalQ.steps.map((step, i) => (
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

            {/* 3. Target Answer SECOND */}
            {rawAnswer && (
              <div className="fb-correct-answer-box">
                <div className="fb-section-title">Correct Answer</div>
                <div className="fb-answer-value">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {rawAnswer}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <button className="fb-action-btn fb-next-btn" onClick={startRetry} style={{ marginTop: "1.2rem", width: "100%" }}>
            Try Restructured Question →
          </button>
        </div>
      </div>
    );
  }

  // ── Normal / Retry Question Screen ─────────────────────────
  const isMCQ = curQ?.type === "mcq" && Array.isArray(curQ?.options);

  return (
    <>
      <ConceptReferenceDrawer
        content={content}
        topic={topic}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="lc" id="qCard">
        <div className="lch">
          <div className="quiz-phase-header-row">
            <span className="lbadge lb-q">
              {retryState === "retry" ? "Retry" : `Question ${qIdx + 1} of ${totalQs || 1}`}
            </span>
            <button
              className="ref-drawer-trigger"
              onClick={() => setDrawerOpen(true)}
              title="Open concept reference"
              aria-label="Open concept reference notes"
            >
              View Notes
            </button>
          </div>
        </div>

        <div className="lcb">
          {retryState === "retry" && (
            <div className="retry-mode-banner">
              Restructured Question — Same concept, different approach.
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

          {/* Metacognitive Confidence Selector — shown before first submission */}
          {!feedback && answer.trim() && (
            <div className="confidence-selector">
              <div className="confidence-selector-label">How confident are you in this answer?</div>
              <div className="confidence-btn-group">
                {["low", "medium", "high"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`confidence-btn confidence-btn--${level}${confidence === level ? " confidence-btn--active" : ""}`}
                    onClick={() => setConfidence(level)}
                    disabled={!!feedback || grading}
                  >
                    {level === "low" ? "Not Sure" : level === "medium" ? "Fairly Sure" : "Very Sure"}
                  </button>
                ))}
              </div>
            </div>
          )}

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
    </>
  );
}

export default QuizPhase;
