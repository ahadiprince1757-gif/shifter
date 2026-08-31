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

      {/* ── PERSONALISED ANSWER BREAKDOWN ─────────────────────────── */}
      {!isCorrect && feedback.breakdown && feedback.breakdown.closeness !== "irrelevant" && (
        <div className="fb-breakdown-container">

          {/* What the student said */}
          <div className="fb-breakdown-section fb-breakdown-you-said">
            <div className="fb-breakdown-label">
              <span className="fb-breakdown-icon">📝</span> You said:
            </div>
            <div className="fb-breakdown-quote">
              "{feedback.breakdown.studentSaid}"
            </div>
          </div>

          {/* How close they were */}
          <div className="fb-breakdown-closeness-bar">
            <div className="fb-breakdown-closeness-label">
              {feedback.breakdown.closenessLabel}
            </div>
            <div className="fb-breakdown-track">
              <div
                className={`fb-breakdown-fill fb-breakdown-fill--${feedback.breakdown.closeness}`}
                style={{ width: `${Math.max(10, feedback.breakdown.matchRatio)}%` }}
              />
            </div>
            <div className="fb-breakdown-ratio-text">
              {feedback.breakdown.matchRatio}% of key concepts present
            </div>
          </div>

          {/* What they got right */}
          {feedback.breakdown.matched.length > 0 && (
            <div className="fb-breakdown-section fb-breakdown-matched">
              <div className="fb-breakdown-label">
                <span className="fb-breakdown-icon">✓</span> What you got right:
              </div>
              <div className="fb-breakdown-chips">
                {feedback.breakdown.matched.map((w, i) => (
                  <span key={i} className="fb-breakdown-chip fb-chip-correct">{w}</span>
                ))}
              </div>
            </div>
          )}

          {/* What they missed — with explanations */}
          {feedback.breakdown.missing.length > 0 && (
            <div className="fb-breakdown-section fb-breakdown-missing">
              <div className="fb-breakdown-label">
                <span className="fb-breakdown-icon">✗</span> What was missing from your answer:
              </div>
              <div className="fb-breakdown-chips" style={{ marginBottom: "0.6rem" }}>
                {feedback.breakdown.missing.map((w, i) => (
                  <span key={i} className="fb-breakdown-chip fb-chip-missing">{w}</span>
                ))}
              </div>
              {feedback.breakdown.missingExplanations.length > 0 && (
                <div className="fb-breakdown-gap-list">
                  {feedback.breakdown.missingExplanations.map((gap, i) => (
                    <div key={i} className="fb-breakdown-gap-item">
                      <span className="fb-breakdown-gap-keyword">"{gap.keyword}"</span>
                      <span className="fb-breakdown-gap-reason"> — {gap.reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* For genuinely irrelevant / no-attempt answers */}
      {!isCorrect && feedback.breakdown && feedback.breakdown.closeness === "irrelevant" && (
        <div className="fb-breakdown-container">
          <div className="fb-breakdown-section" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            No meaningful attempt detected. Review the concept notes and try again.
          </div>
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
