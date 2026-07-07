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
}) {
  const { showAnswer, setShowAnswer } = useQuizUI(topic);

  return (
    <div className="lc" id="qCard">
      <div className="lch">
        <span className="lbadge lb-q">🧠 Question {qIdx + 1}</span>
        <span className="lct">{topic}</span>
      </div>

      <div className="lcb">
        <QuestionDisplay isCalc={isCalc} questionText={curQ?.q} />

        <QuizInputFields
          isCalc={isCalc}
          work={work}
          setWork={setWork}
          answer={answer}
          setAnswer={setAnswer}
          disabled={feedback || grading}
        />

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
        />
      </div>
    </div>
  );
}

export default QuizPhase;
