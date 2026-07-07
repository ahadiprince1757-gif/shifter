import { useState, useEffect } from "react";
import { gradeAnswer } from "../api";
import { progressRepo } from "../repository/progressRepo";
import { networkService } from "../services/networkService";
import logger from "../utils/logger";
import { recordEvent } from "../utils/analytics";

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
    });

    const payload = {
      sid: subject.id,
      cid: chapter.id,
      topic: topic,
      qId: qIdx,
      answer: answer,
      work: work,
      explanation: explanation,
    };

    // Attempt online grade, fallback to offline save
    networkService.executeIfOnline(
      () => gradeAnswer(payload),
      async () => {
        // Fallback action if offline
        await progressRepo.saveProgress({ topicId: topic, data: payload });
        return {
          isCorrect: true, // Optimistic offline assumption, or generic response
          correctAnswer: "Saved offline",
          solution: "Your answer has been saved and will be graded when you reconnect.",
          mark: "Pending Sync"
        };
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
              question: content?.qs?.[qIdx]?.q || "",
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
        setFeedback({
          isCorrect: false,
          correctAnswer: "Could not grade answer.",
          solution: "There was a network error. Please try again.",
        });
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
    finishQuiz,
  };
}
