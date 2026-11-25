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

/**
 * QuizPhase
 *
 * Implements the Global Layout Rules across the interactive testing phase:
 * 1. ONE INTERFACE. EVERY SCREEN.
 * 2. NO FLOATING CONTENT / CARDS (the screen itself is the document).
 * 3. NO CARD SOUP (no rounded card wrappers, borders, or badge overload).
 * 4. STRUCTURE THROUGH TYPOGRAPHY & WHITESPACE.
 * 5. ONE CLEAR FOCUS & ONE PRIMARY ACTION.
 */
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
        <div className="type-meta" style={{ marginBottom: "var(--space-3)", textTransform: "uppercase" }}>
          Concept Review & Method Repair
        </div>

        {/* 1. Step-by-Step Solution Timeline */}
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

        {/* 2. Target Answer */}
        {displayAnswer && (
          <ContentSection title="TARGET CORRECT ANSWER">
            <div className="type-question" style={{ fontWeight: 600 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {String(displayAnswer)}
              </ReactMarkdown>
            </div>
          </ContentSection>
        )}

        {/* 3. Explanation */}
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

  // ── Interactive Question Screen (One Continuous Surface) ──
  const isMCQ = curQ?.type === "mcq" && Array.isArray(curQ?.options) && curQ.options.length > 0;
  const progressLabel = retryState === "retry"
    ? "PRACTICE VARIANT"
    : `QUESTION ${qIdx + 1} OF ${totalQs || 1}`;

  return (
    <>
      <ConceptReferenceDrawer
        content={content}
        topic={topic}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <ReadingContainer style={{ paddingBlock: "var(--space-4)" }}>
        {/* Progress Header */}
        <div className="type-meta" style={{ marginBottom: "var(--space-4)", textTransform: "uppercase" }}>
          {progressLabel}
        </div>

        {/* 01 · Question Statement */}
        <QuestionDisplay
          isCalc={isCalc}
          questionText={curQ?.q}
          rubricEval={curQ?.rubricEval}
          proveItState={curQ?.proveItState}
        />

        {/* 02 · Student Input (MCQ Options or Step-by-Step Working & Final Answer) */}
        {isMCQ ? (
          <ContentSection title="SELECT YOUR ANSWER" style={{ marginTop: "var(--space-5)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {curQ.options.map((opt, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    border: answer === opt ? "1px solid var(--text-primary)" : "1px solid var(--border-subtle, #e5e5e5)",
                    borderRadius: "var(--radius-control, 8px)",
                    cursor: grading ? "default" : "pointer",
                    background: answer === opt ? "var(--surface-subtle, #f7f7f7)" : "var(--surface)",
                    transition: "border-color 0.15s ease",
                  }}
                  onClick={() => !grading && setAnswer(opt)}
                >
                  <input
                    type="radio"
                    name="mcq"
                    value={opt}
                    checked={answer === opt}
                    onChange={() => !grading && setAnswer(opt)}
                    disabled={grading}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "13px" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="type-body" style={{ color: "var(--text-primary)" }}>
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </ContentSection>
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
          <div style={{ marginTop: "var(--space-3)", color: "var(--state-error, #dc2626)", fontSize: "14px" }}>
            {validationError}
          </div>
        )}

        <HintBox showHint={showHint} hintText={curQ?.hint} hints={curQ?.hints} />

        {/* 03 · Action System */}
        <QuizActionButtons
          showHint={showHint}
          setShowHint={setShowHint}
          submitAnswer={submitAnswer}
          grading={grading}
          canSubmit={!!answer.trim()}
        />
      </ReadingContainer>
    </>
  );
}

export default QuizPhase;
