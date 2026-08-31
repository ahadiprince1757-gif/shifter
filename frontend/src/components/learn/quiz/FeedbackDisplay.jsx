import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { explainMisconception } from "../../../services/aiEngine";
import { getLocalRAGContext } from "../../../utils/aiRAGRouter";

function FeedbackDisplay({
  feedback,
  nextQuestion,
  finishTopic,
  grading,
  qIdx,
  totalQs,
  goToReview,
  startMutatedRepair,
}) {
  const [explanationText, setExplanationText] = useState(null);
  const [explanationGenerating, setExplanationGenerating] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!feedback) return;

    const isMisconception =
      !feedback.isCorrect && feedback.confidence === "high";

    if (!isMisconception) return;

    let cancelled = false;
    abortRef.current = new AbortController();

    Promise.resolve().then(() => {
      setExplanationGenerating(true);
      setExplanationText("");
    });

    const question = feedback.questionText || "";
    const wrongAnswer = feedback.studentAnswer || feedback.answer || "";
    const correctAnswer = feedback.correctAnswer || "";

    getLocalRAGContext(question)
      .then((ragContext) => {
        if (cancelled) return;
        return explainMisconception(
          question,
          wrongAnswer,
          correctAnswer,
          ragContext || "",
          (chunk) => {
            if (cancelled) return;
            if (chunk === null) {
              setExplanationText(null);
              setExplanationGenerating(false);
            } else {
              setExplanationText(chunk);
            }
          },
          abortRef.current.signal
        );
      })
      .then(() => {
        if (!cancelled) setExplanationGenerating(false);
      })
      .catch(() => {
        if (!cancelled) {
          setExplanationText(null);
          setExplanationGenerating(false);
        }
      });

    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, [feedback]);

  if (!feedback) return null;

  const isCorrect = feedback.isCorrect;
  const isLastQuestion = qIdx >= totalQs - 1;
  const confidence = feedback.confidence;

  const rawAnswer = feedback.correctAnswer || "";
  const answerBulletList = rawAnswer.includes("•")
    ? rawAnswer.split("•").map((s) => s.trim()).filter(Boolean)
    : null;

  const getCalibrationInsight = () => {
    if (!confidence) return null;
    if (!isCorrect && confidence === "high") {
      return {
        type: "misconception",
        message:
          "Concept Misconception — You were confident in your response, but the logic broke. Review the step-by-step solution carefully.",
      };
    }
    if (isCorrect && confidence === "low") {
      return {
        type: "unsure",
        message:
          "Unsure Confirmation — Correct answer recorded, but low confidence was flagged for future review.",
      };
    }
    if (!isCorrect && confidence === "medium") {
      return {
        type: "knowledge-gap",
        message:
          "Knowledge Gap — Review the breakdown below to clarify the concept before moving forward.",
      };
    }
    return null;
  };

  const calibration = getCalibrationInsight();

  return (
    <div className={`fb-card ${isCorrect ? "fb-correct" : "fb-needs-review"}`}>
      {/* Status Header */}
      <div className="fb-header">
        <div className="fb-status-wrapper">
          <span className={`fb-status-badge ${isCorrect ? "fb-badge-success" : "fb-badge-review"}`}>
            {isCorrect ? "Correct" : "Needs Review"}
          </span>
        </div>
        <span className="fb-progress-pill">
          {qIdx + 1} / {totalQs}
        </span>
      </div>

      {/* Calibration Insight */}
      {calibration && (
        <div className={`calibration-insight calibration-${calibration.type}`}>
          <div className="calibration-text">{calibration.message}</div>
        </div>
      )}

      {/* Working & Procedural Evaluation Note */}
      {feedback.workingNote && (
        <div className={`calibration-insight ${isCorrect ? "calibration-unsure" : "calibration-knowledge-gap"}`} style={{ marginTop: "0.5rem" }}>
          <div className="calibration-text">{feedback.workingNote}</div>
        </div>
      )}

      {/* Inline Misconception Explanation */}
      {!isCorrect && confidence === "high" && (
        <>
          {explanationGenerating && !explanationText && (
            <div className="misconception-explanation-thinking" aria-live="polite">
              <span className="misconception-explanation-dot" />
              <span className="misconception-explanation-dot" />
              <span className="misconception-explanation-dot" />
            </div>
          )}
          {explanationText && (
            <div className="misconception-explanation" aria-live="polite">
              {explanationText}
            </div>
          )}
        </>
      )}

      {/* ── SMART ANSWER ANALYSIS ─────────────────────────────────────── */}
      {!isCorrect && feedback.analysis && feedback.analysis.feedback && feedback.analysis.feedback.length > 0 && (
        <div className="smart-analysis-container">

          {/* What the student wrote */}
          <div className="smart-analysis-you-said">
            <span className="smart-analysis-label">📝 You wrote:</span>
            <span className="smart-analysis-quote">"{feedback.analysis.studentSaid}"</span>
          </div>

          {/* Summary sentence */}
          {feedback.analysis.summary && (
            <div className="smart-analysis-summary">
              {feedback.analysis.summary}
            </div>
          )}

          {/* Per-issue breakdown — specific sentences */}
          <div className="smart-analysis-list">
            {feedback.analysis.feedback.map((item, i) => (
              <div
                key={i}
                className={`smart-analysis-item smart-analysis-item--${
                  item.type === "segment_correct" || item.type === "step_correct"
                    ? "correct"
                    : item.type === "step_partial" || item.type === "missing_qualifier"
                    ? "warn"
                    : "wrong"
                }`}
              >
                <span className="smart-analysis-item-icon">{item.icon}</span>
                <span className="smart-analysis-item-text">{item.message}</span>
              </div>
            ))}
          </div>

          {/* Concept accuracy bar */}
          {feedback.analysis.type === "concept_analysis" && typeof feedback.analysis.overallRatio === "number" && (
            <div className="smart-analysis-bar-row">
              <span className="smart-analysis-bar-label">
                Concept accuracy: {feedback.analysis.overallRatio}%
              </span>
              <div className="smart-analysis-bar-track">
                <div
                  className="smart-analysis-bar-fill"
                  style={{ width: `${Math.max(5, feedback.analysis.overallRatio)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explanation / Solution */}
      {feedback.solution && (
        <div className="fb-explanation-box">
          <div className="fb-section-title">Explanation</div>
          <div className="fb-explanation-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {feedback.solution}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Step-by-Step Breakdown */}
      {!isCorrect && Array.isArray(feedback.steps) && feedback.steps.length > 0 && (
        <div className="fb-steps-container">
          <div className="fb-section-title">Step-by-Step Solution</div>
          <div className="fb-steps-timeline">
            {feedback.steps.map((step, i) => (
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

      {/* Correct Target Answer */}
      {!isCorrect && rawAnswer && (
        <div className="fb-correct-answer-box">
          <div className="fb-section-title">Correct Answer</div>
          {answerBulletList ? (
            <ul className="fb-answer-bullets">
              {answerBulletList.map((item, idx) => (
                <li key={idx} className="fb-answer-bullet-item">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="fb-answer-value">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {rawAnswer}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="fb-actions">
        {!isCorrect && startMutatedRepair && (
          <button
            type="button"
            className="fb-action-btn fb-repair-btn"
            onClick={startMutatedRepair}
            disabled={grading}
          >
            Try Variant Question
          </button>
        )}
        {!isCorrect && goToReview && (
          <button
            type="button"
            className="fb-action-btn fb-review-btn"
            onClick={goToReview}
            disabled={grading}
          >
            Review Concept
          </button>
        )}
        <button
          type="button"
          className="fb-action-btn fb-next-btn"
          onClick={() => {
            if (isLastQuestion) {
              finishTopic();
            } else {
              nextQuestion();
            }
          }}
          disabled={grading}
        >
          {isLastQuestion ? "Finish Topic" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default FeedbackDisplay;
