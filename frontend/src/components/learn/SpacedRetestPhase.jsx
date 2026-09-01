import { useState } from "react";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";
import { evaluateAnswer } from "../../utils/grader";
import { isCalculationQuestion } from "../../utils/questionTypeHelper";

/**
 * SpacedRetestPhase
 *
 * Runs spaced repetition review items for previously studied topics
 * that are currently due for re-testing.
 *
 * Props:
 *   dueReviews   Array<{ topic_id, question_text, answer, hint, solution }>
 *   onComplete   function
 */
function SpacedRetestPhase({ dueReviews = [], onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const currentItem = dueReviews[currentIndex] || null;

  if (!currentItem || dueReviews.length === 0) {
    return (
      <div className="lc" id="retestCard">
        <div className="lcb">
          <p>No spaced review items due today!</p>
          <button className="btn-p" onClick={onComplete} style={{ marginTop: "1rem" }}>
            Continue to Transfer →
          </button>
        </div>
      </div>
    );
  }

  const questionObj = {
    q: currentItem.question_text || currentItem.q || `Review concept for topic: ${currentItem.topic_id}`,
    ans: currentItem.answer || currentItem.ans || "",
    hint: currentItem.hint || "",
    why: currentItem.solution || currentItem.why || "",
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const res = evaluateAnswer(answer, questionObj);
    setFeedback(res);
  };

  const handleNext = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < dueReviews.length) {
      setCurrentIndex(nextIdx);
      setAnswer("");
      setFeedback(null);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="lc" id="retestCard">
      <div className="lch">
        <div className="retest-header-row">
          <span className="lbadge lb-retest">Spaced Retest</span>
          <span className="retest-progress-label">
            Review {currentIndex + 1} of {dueReviews.length}
          </span>
        </div>
      </div>

      <div className="lcb">
        <div className="retest-framing">
          Spaced Review: Testing past material to strengthen long-term memory retrieval.
        </div>

        <QuestionDisplay
          isCalc={isCalculationQuestion(questionObj, questionObj?.subject)}
          questionText={questionObj.q}
        />

        {!feedback ? (
          <>
            <textarea
              className="quiz-input"
              rows={3}
              placeholder="Type your answer from memory…"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <HintBox showHint={showHint} hintText={questionObj.hint} />

            <div className="retest-action-row">
              {questionObj.hint && (
                <button className="btn-g" onClick={() => setShowHint((s) => !s)}>
                  {showHint ? "Hide hint" : "Show hint"}
                </button>
              )}
              <button
                className="btn-p"
                onClick={handleSubmit}
                disabled={!answer.trim()}
              >
                Submit Review
              </button>
            </div>
          </>
        ) : (
          <div
            className={`retest-feedback ${
              feedback.isCorrect ? "retest-feedback--pass" : "retest-feedback--fail"
            }`}
          >
            <div className="retest-feedback-status">
              {feedback.isCorrect ? "✓ Retest Correct" : "✗ Review Needed"}
            </div>
            {feedback.correctAnswer && !feedback.isCorrect && (
              <div className="retest-answer">Correct: {feedback.correctAnswer}</div>
            )}
            <button className="btn-p retest-next-btn" onClick={handleNext}>
              {currentIndex < dueReviews.length - 1 ? "Next Review →" : "Proceed to Transfer →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpacedRetestPhase;
