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
import { verifyQuestionAcrossSubjects } from "../../utils/subjectVerifierRouter";

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
  startMutatedRepair,
}) {
  const { showAnswer, setShowAnswer } = useQuizUI(topic);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Concept Review Screen ──────────────────────────────────
  if (retryState === "review") {
    const originalQ = activeQuestion || content?.qs?.[qIdx] || {};
    const questionText = originalQ.q || originalQ.stem || "";
    const rawAnswer = originalQ.ans || "";

    // Run Universal Multi-Subject Verification to get verified answer & steps
    const verification = verifyQuestionAcrossSubjects(questionText, rawAnswer, originalQ);
    const displayAnswer = verification.wasOverridden ? verification.verifiedAnswer : rawAnswer;
    const displaySteps = verification.verifiedSteps || originalQ.steps || [];
    const displayExplanation = verification.explanation || originalQ.why || originalQ.sol || "";

    return (
      <div className="lc" id="qCard">
        <div className="lch">
          <span className="lbadge lb-n">Concept Review & Method Repair</span>
        </div>
        <div className="lcb">
          <div className="fb-card fb-review-mode">
            <div className="fb-header">
              <div className="fb-status-wrapper">
                <span className="fb-status-badge fb-badge-review">Concept Repair</span>
              </div>
            </div>

            {/* 1. Step-by-Step Solution Timeline FIRST */}
            {displaySteps.length > 0 && (
              <div className="fb-steps-container">
                <div className="fb-section-title">How to Solve It (Step-by-Step)</div>
                <div className="fb-steps-timeline">
                  {displaySteps.map((step, i) => (
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

            {/* 2. Verified Target Answer SECOND */}
            {displayAnswer && (
              <div className="fb-correct-answer-box">
                <div className="fb-section-title">Target Correct Answer</div>
                <div className="fb-answer-value">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {String(displayAnswer)}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* 3. Explanation (if non-redundant) */}
            {displayExplanation &&
              displaySteps.length === 0 &&
              !/^\d+$/.test(String(displayExplanation).trim()) && (
                <div className="fb-explanation-box">
                  <div className="fb-section-title">Explanation</div>
                  <div className="fb-explanation-text">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {displayExplanation}
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
              Practice Variant — Testing the same core concept with new parameters.
            </div>
          )}
          <QuestionDisplay
            isCalc={isCalc}
            questionText={curQ?.q}
            rubricEval={curQ?.rubricEval}
            proveItState={curQ?.proveItState}
          />

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
            startMutatedRepair={startMutatedRepair}
          />
        </div>
      </div>
    </>
  );
}

export default QuizPhase;
