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
import { determineResponseMode } from "../../utils/questionTypeHelper";
import { verifyQuestionAcrossSubjects } from "../../utils/subjectVerifierRouter";
import ReadingContainer from "../layout/ReadingContainer";
import ContentSection from "../content/ContentSection";
import StepList from "../content/StepList";
import StepItem from "../content/StepItem";

const markdownComponents = {
  table: ({ node, ...props }) => (
    <div className="table-responsive">
      <table {...props} />
    </div>
  ),
};

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
  refineAnswer,
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
    const displaySteps = (Array.isArray(originalQ.steps) && originalQ.steps.length > 0)
      ? originalQ.steps
      : (verification.verifiedSteps || []);
    const displayExplanation = originalQ.why || originalQ.sol || verification.explanation || "";

    return (
      <ReadingContainer style={{ paddingBlock: "var(--space-4)" }}>
        <div className="type-meta" style={{ marginBottom: "var(--space-3)" }}>
          Concept Review & Method Repair
        </div>

        {/* 1. Step-by-Step Solution Timeline FIRST */}
        {displaySteps.length > 0 && (
          <ContentSection title="HOW TO SOLVE IT (STEP-BY-STEP)">
            <StepList>
              {displaySteps.map((step, i) => (
                <StepItem key={i} number={i + 1}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                    {step.replace(/^step\s*\d+\s*:\s*/i, "")}
                  </ReactMarkdown>
                </StepItem>
              ))}
            </StepList>
          </ContentSection>
        )}

        {/* 2. Verified Target Answer SECOND */}
        {displayAnswer && (
          <ContentSection title="TARGET CORRECT ANSWER">
            <div className="type-question" style={{ fontWeight: 600 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {String(displayAnswer)}
              </ReactMarkdown>
            </div>
          </ContentSection>
        )}

        {/* 3. Explanation (if non-redundant) */}
        {displayExplanation &&
          displaySteps.length === 0 &&
          !/^\d+$/.test(String(displayExplanation).trim()) && (
            <ContentSection title="EXPLANATION">
              <div className="type-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                  {displayExplanation}
                </ReactMarkdown>
              </div>
            </ContentSection>
          )}

        <div style={{ marginTop: "var(--space-6)" }}>
          <button className="primary-action-btn" onClick={startRetry}>
            TRY RESTRUCTURED QUESTION →
          </button>
        </div>
      </ReadingContainer>
    );
  }

  // ── Feedback Document View (Full Screen, Single Surface) ──
  if (feedback) {
    return (
      <div className="feedback-screen-fullscreen">
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
          refineAnswer={refineAnswer}
          questionText={curQ?.q}
        />
      </div>
    );
  }

  // ── Normal / Retry Question Screen ─────────────────────────
  const isMCQ = curQ?.type === "mcq" && Array.isArray(curQ?.options) && curQ.options.length > 0;

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
                  className={`mcq-option${answer === opt ? " mcq-selected" : ""}`}
                  onClick={() => !grading && setAnswer(opt)}
                >
                  <input
                    type="radio"
                    name="mcq"
                    className="mcq-radio"
                    value={opt}
                    checked={answer === opt}
                    onChange={() => !grading && setAnswer(opt)}
                    disabled={grading}
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
              mode={determineResponseMode(curQ, topic).mode}
              work={work}
              setWork={setWork}
              answer={answer}
              setAnswer={setAnswer}
              disabled={grading}
            />
          )}

          {validationError && (
            <div className="validation-error">{validationError}</div>
          )}

          <HintBox showHint={showHint} hintText={curQ?.hint} hints={curQ?.hints} />

          {/* Metacognitive Confidence Selector — shown before first submission */}
          {answer.trim() && (
            <div className="confidence-selector">
              <div className="confidence-selector-label">How confident are you in this answer?</div>
              <div className="confidence-btn-group">
                {["low", "medium", "high"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`confidence-btn confidence-btn--${level}${confidence === level ? " confidence-btn--active" : ""}`}
                    onClick={() => setConfidence(level)}
                    disabled={grading}
                  >
                    {level === "low" ? "Not Sure" : level === "medium" ? "Fairly Sure" : "Very Sure"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <QuizActionButtons
            showHint={showHint}
            setShowHint={setShowHint}
            submitAnswer={submitAnswer}
            grading={grading}
            canSubmit={!!answer.trim()}
          />
        </div>
      </div>
    </>
  );
}

export default QuizPhase;
