import { useState, useEffect } from "react";
import { gradeAnswer } from "../api";
import { progressRepo } from "../repository/progressRepo";
import { networkService } from "../services/networkService";
import logger from "../utils/logger";
import { recordEvent } from "../utils/analytics";
import { evaluateAnswer } from "../utils/grader";
import { questionMutator } from "../utils/QuestionMutator";

export function useQuiz(
  subject,
  chapter,
  topic,
  content,
  markMastered,
  setPhase,
  userId = null,
) {
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [work, setWork] = useState("");
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [prevTopic, setPrevTopic] = useState(topic);

  // Adaptive Retry State Machine
  const [retryState, setRetryState] = useState(null); // null | "review" | "retry"
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Reset state when topic changes (during render to prevent cascading render warnings)
  if (topic !== prevTopic) {
    setPrevTopic(topic);
    setQIdx(0);
    setAnswer("");
    setExplanation("");
    setWork("");
    setGrading(false);
    setFeedback(null);
    setShowHint(false);
    setValidationError("");
    setFailedQuestions([]);
    setQuizFinished(false);
    setRetryState(null);
    setActiveQuestion(null);
  }

  // Clear validation error when answer is filled (during render)
  if (validationError && answer.trim()) {
    setValidationError("");
  }

  // Logger side effect when topic starts
  useEffect(() => {
    logger.action("TOPIC_STARTED", "success", {
      subject: subject?.id,
      chapter: chapter?.id,
      topic,
    });
  }, [topic, subject?.id, chapter?.id]);

  const submitAnswer = () => {
    if (grading) return;
    if (!subject?.id || !chapter?.id) return;
    if (!answer.trim()) {
      setValidationError("Please type your answer before submitting.");
      logger.action("ANSWER_SUBMIT", "failed", {
        reason: "empty_answer",
        questionIndex: qIdx,
      });
      return;
    }

    setValidationError("");
    setGrading(true);

    logger.action("ANSWER_SUBMIT", "pending", {
      subject: subject.id,
      chapter: chapter.id,
      topic,
      questionIndex: qIdx,
      answerLength: answer.trim().length,
      isRetry: retryState === "retry"
    });

    const targetQ = activeQuestion || content?.qs?.[qIdx];

    if (retryState === "retry" && activeQuestion) {
      setTimeout(() => {
        const res = evaluateAnswer(answer, activeQuestion);
        setFeedback(res);
        setGrading(false);

        logger.action("RETRY_GRADED", "success", {
          subject: subject.id,
          chapter: chapter.id,
          topic,
          questionIndex: qIdx,
          isCorrect: res.isCorrect,
        });
      }, 250);
      return;
    }

    const payload = {
      sid: subject.id,
      cid: chapter.id,
      topic: topic,
      qId: qIdx,
      answer: answer,
      work: work,
      explanation: explanation,
    };

    // Attempt online grade, fallback to client-side offline grade
    networkService.executeIfOnline(
      () => gradeAnswer(payload),
      async () => {
        // Evaluate answer locally offline
        const res = evaluateAnswer(answer, targetQ);
        await progressRepo.saveProgress({
          topicId: topic,
          data: { ...payload, isCorrect: res.isCorrect },
        });
        return res;
      }
    )
      .then((res) => {
        setFeedback(res);
        setGrading(false);

        logger.action("ANSWER_GRADED", "success", {
          subject: subject.id,
          chapter: chapter.id,
          topic,
          questionIndex: qIdx,
          isCorrect: res.isCorrect,
        });

        if (!res.isCorrect) {
          setFailedQuestions((prev) => [
            ...prev,
            {
              qIdx,
              question: targetQ?.q || "",
              correctAnswer: res.correctAnswer,
              solution: res.solution,
              mark: res.mark,
            },
          ]);
          logger.action("ANSWER_INCORRECT", "result", {
            subject: subject.id,
            chapter: chapter.id,
            topic,
            questionIndex: qIdx,
          });
          // Record fail event for analytics
          recordEvent(subject.id, chapter.id, topic, "fail", userId);
        } else {
          logger.action("ANSWER_CORRECT", "result", {
            subject: subject.id,
            chapter: chapter.id,
            topic,
            questionIndex: qIdx,
          });
          // Record pass event for analytics
          recordEvent(subject.id, chapter.id, topic, "pass", userId);
        }
      })
      .catch((err) => {
        logger.error("ANSWER_GRADE_ERROR", err, {
          subject: subject.id,
          chapter: chapter.id,
          topic,
          questionIndex: qIdx,
        });
        // Graceful fallback to client-side grading if server request fails
        const fallbackRes = evaluateAnswer(answer, targetQ);
        setFeedback(fallbackRes);
        setGrading(false);
      });
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    logger.action("QUIZ_COMPLETED", "success", {
      subject: subject?.id,
      chapter: chapter?.id,
      topic,
      totalQuestions: content?.qs?.length || 0,
      failedCount: failedQuestions.length,
    });
  };

  const nextQuestion = () => {
    const lastQuestion =
      !content || content.qs.length === 0 || qIdx >= content.qs.length - 1;

    logger.action("QUESTION_NEXT", "success", {
      subject: subject?.id,
      chapter: chapter?.id,
      topic,
      currentQuestionIndex: qIdx,
      isLastQuestion: lastQuestion,
    });

    setRetryState(null);
    setActiveQuestion(null);

    if (!lastQuestion) {
      setQIdx((prev) => prev + 1);
      setAnswer("");
      setWork("");
      setExplanation("");
      setFeedback(null);
      setShowHint(false);
      setValidationError("");
      return;
    }

    finishQuiz();
  };

  const startRetry = () => {
    setRetryState("retry");
    const currentQ = content?.qs?.[qIdx];
    if (currentQ) {
      const subjectName = subject?.name || subject?.id || "";
      const mutated = questionMutator.mutate(currentQ, subjectName);
      setActiveQuestion(mutated || currentQ);
    } else {
      setActiveQuestion(null);
    }
    setAnswer("");
    setWork("");
    setExplanation("");
    setFeedback(null);
    setShowHint(false);
    setValidationError("");
  };

  const goToReview = () => {
    setRetryState("review");
    setFeedback(null);
  };

  return {
    qIdx,
    setQIdx,
    answer,
    setAnswer,
    explanation,
    setExplanation,
    work,
    setWork,
    grading,
    feedback,
    setFeedback,
    showHint: showHint,
    setShowHint: (value) => {
      setShowHint(value);
      if (value) {
        logger.action("HINT_SHOWN", "success", {
          subject: subject?.id,
          chapter: chapter?.id,
          topic,
          questionIndex: qIdx,
        });
      }
    },
    validationError,
    setValidationError,
    failedQuestions,
    quizFinished,
    submitAnswer,
    nextQuestion,
    finishTopic: finishQuiz, // Map to finishQuiz for backwards compatibility
    finishQuiz,
    retryState,
    activeQuestion,
    startRetry,
    goToReview
  };
}
