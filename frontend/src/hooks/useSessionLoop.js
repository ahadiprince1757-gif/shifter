/**
 * useSessionLoop.js
 *
 * Streamlined Session Controller focused on Edge-of-Friction Learning:
 *
 * Step 0: STUDY NOTES (Clean reading & concept preparation)
 * Step 1: PRACTICE QUIZ (Closed-book retrieval + In-quiz Edge-of-Friction Repair with mutated variants)
 * Step 2: MASTERY & REVIEW (Score breakdown, repaired concepts list, spaced repetition scheduling)
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { buildWeaknessMap } from "../utils/weaknessMap";
import { selectTransferQuestion, buildFallbackTransferQuestion } from "../utils/transferQuestion";
import { spacedRepo } from "../repository/spacedRepo";
import { evaluateAnswer } from "../utils/grader";
import { questionMutator } from "../utils/questionMutator";

export const SESSION_PHASES = {
  NOTES: 0,
  QUIZ: 1,
  MASTERY: 2,
};

export function useSessionLoop({ subject, chapter, topic, content, userId, markMastered }) {
  const questions = useMemo(
    () => (Array.isArray(content?.qs) ? content.qs : []),
    [content]
  );

  // ── Core Phase: 0 = Notes, 1 = Quiz, 2 = Mastery ────────────────────────────
  const [phase, setPhase] = useState(SESSION_PHASES.NOTES);

  // ── Quiz State ─────────────────────────────────────────────────────────────
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [work, setWork] = useState("");
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // ── Edge-of-Friction Repair inside quiz ──────────────────────────────────
  const [isRepairing, setIsRepairing] = useState(false);
  const [, setRepairAttempts] = useState(0);
  const [repairedConcepts, setRepairedConcepts] = useState(new Set());

  // ── Transfer & Mastery State ──────────────────────────────────────────────
  const [transferQuestion, setTransferQuestion] = useState(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [weaknessMap, setWeaknessMap] = useState({});

  const usedIndicesRef = useRef(new Set());

  // Reset state when topic changes
  const prevTopicRef = useRef(topic);
  useEffect(() => {
    if (topic === prevTopicRef.current) return;
    prevTopicRef.current = topic;

    setPhase(SESSION_PHASES.NOTES);
    setQIdx(0);
    setAnswer("");
    setWork("");
    setGrading(false);
    setFeedback(null);
    setShowHint(false);
    setConfidence(null);
    setValidationError("");
    setFailedQuestions([]);
    setActiveQuestion(null);
    setIsRepairing(false);
    setRepairAttempts(0);
    setRepairedConcepts(new Set());
    usedIndicesRef.current = new Set();
    setSessionScore(0);
    setWeaknessMap({});
    setTransferQuestion(null);
  }, [topic]);

  // Current question being answered (mutated variant if in repair mode, otherwise standard bank question)
  const currentQuestion = activeQuestion || questions[qIdx] || null;
  const isLastQuestion = qIdx >= questions.length - 1;

  // ── Submit Answer ──────────────────────────────────────────────────────────
  const submitAnswer = useCallback(() => {
    if (grading) return;
    if (!answer.trim()) {
      setValidationError("Please enter your answer before submitting.");
      return;
    }

    setValidationError("");
    setGrading(true);

    const q = currentQuestion;
    if (!q) {
      setGrading(false);
      return;
    }

    setTimeout(() => {
      const res = evaluateAnswer(answer, q);
      setFeedback({ ...res, confidence });
      setGrading(false);

      if (!isRepairing) {
        usedIndicesRef.current.add(qIdx);
        if (!res.isCorrect) {
          setFailedQuestions((prev) => [
            ...prev,
            {
              qIdx,
              question: q.q || "",
              correctAnswer: res.correctAnswer,
              solution: res.solution,
              mark: res.mark,
              originalQ: q,
            },
          ]);
        }
      } else {
        if (res.isCorrect) {
          const conceptTag = q.concept_tag || `q_${qIdx}`;
          setRepairedConcepts((prev) => new Set([...prev, conceptTag]));
        }
      }
    }, 150);
  }, [grading, answer, currentQuestion, confidence, isRepairing, qIdx]);

  // ── Trigger In-Quiz Mutated Repair (Edge of Friction) ─────────────────────
  const startMutatedRepair = useCallback(() => {
    const q = questions[qIdx];
    if (!q) return;

    const subjectName = subject?.name || subject?.label || subject?.id || "";
    // Pass feedback (contains studentAnswer, correctAnswer, etc.) for targeted error mutation
    const mutated = questionMutator.mutate(q, feedback, subjectName) || q;

    setActiveQuestion(mutated);
    setIsRepairing(true);
    setAnswer("");
    setWork("");
    setFeedback(null);
    setShowHint(false);
    setRepairAttempts((a) => a + 1);
  }, [questions, qIdx, feedback, subject]);

  // ── Finish Quiz → Mastery ──────────────────────────────────────────────────
  const finishQuiz = useCallback(() => {
    const total = questions.length;
    const failedCount = failedQuestions.length;
    const score = total > 0 ? Math.round(((total - failedCount) / total) * 100) : 100;
    setSessionScore(score);

    const isCorrect = score >= 80;
    const finalConfidence = confidence || "medium";
    spacedRepo
      .updateReviewSchedule(topic, isCorrect, finalConfidence, {
        sid: subject?.id,
        cid: chapter?.id,
        userId,
      })
      .catch(() => {});

    if (score === 100 && markMastered) {
      markMastered(`${subject?.id}|${chapter?.id}|${topic}`);
    }

    const map = buildWeaknessMap(failedQuestions, questions);
    setWeaknessMap(map);

    const tq =
      selectTransferQuestion(questions, usedIndicesRef.current) ||
      { qIdx: -1, q: buildFallbackTransferQuestion(topic, questions) };
    setTransferQuestion(tq);

    setPhase(SESSION_PHASES.MASTERY);
  }, [questions, failedQuestions, topic, subject, chapter, userId, confidence, markMastered]);

  // ── Next Question / Finish Quiz ────────────────────────────────────────────
  const nextQuestion = useCallback(() => {
    if (isRepairing) {
      setActiveQuestion(null);
      setIsRepairing(false);
    }

    const isLast = qIdx >= questions.length - 1;

    if (!isLast) {
      setQIdx((prev) => prev + 1);
      setAnswer("");
      setWork("");
      setFeedback(null);
      setShowHint(false);
      setValidationError("");
      setConfidence(null);
      setActiveQuestion(null);
      setIsRepairing(false);
    } else {
      finishQuiz();
    }
  }, [isRepairing, qIdx, questions.length, finishQuiz]);

  return {
    phase,
    setPhase,

    // Quiz props
    qIdx,
    currentQuestion,
    isLastQuestion,
    totalQs: questions.length,
    answer,
    setAnswer,
    work,
    setWork,
    grading,
    feedback,
    showHint,
    setShowHint,
    confidence,
    setConfidence,
    validationError,
    submitAnswer,
    nextQuestion,

    // Edge-of-Friction Repair
    isRepairing,
    startMutatedRepair,
    repairedConcepts: Array.from(repairedConcepts),

    // Mastery
    sessionScore,
    weaknessMap,
    transferQuestion,
    failedQuestions,
  };
}
