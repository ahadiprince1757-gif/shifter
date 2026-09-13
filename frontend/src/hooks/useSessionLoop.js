/**
 * useSessionLoop.js
 *
 * Single-responsibility Orchestrator for Tixar's Singular Learning Loop:
 *
 * TEST ──► CLASSIFY ERROR ──► DIAGNOSE ──► SELECT REPAIR ──► RETEST ──► UPDATE MEMORY
 *
 * Invariant:
 * Diagnosed Skill ≡ Repair Skill ≡ Retest Skill
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { evaluateAnswer } from "../utils/grader";
import { mistakeRepo } from "../repository/mistakeRepo";
import { spacedRepo } from "../repository/spacedRepo";
import { saveProgress, saveAchievement } from "../api";
import { getVerifiedQuestionWithOptions } from "../utils/mcqVerifier";
import { recordErrorAndGetRecurrence } from "../utils/studentMemoryModel";
import {
  createRepairPlan as buildRepairPlan,
  selectRepairIntervention,
  INTERVENTION_TYPES,
} from "../utils/repairInterventionSelector";
import { buildWeaknessMap } from "../utils/weaknessMap";
import { getTransferQuestion } from "../utils/transferQuestion";

export const SESSION_PHASES = {
  NOTES: 0,
  QUIZ: 1,
  MASTERY: 2,
};

export function useSessionLoop({
  subject,
  chapter,
  topic,
  content,
  userId,
  markMastered,
  initialPhase = SESSION_PHASES.NOTES,
}) {
  const questions = useMemo(
    () => (Array.isArray(content?.qs) ? content.qs : []),
    [content]
  );

  // ── Core State ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState(initialPhase);
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

  // ── Repair State ───────────────────────────────────────────────────────────
  const [isRepairing, setIsRepairing] = useState(false);
  const [currentRepairPlan, setCurrentRepairPlan] = useState(null);
  const [repairedConcepts, setRepairedConcepts] = useState(new Set());

  // ── Session & Mastery State ────────────────────────────────────────────────
  const [sessionScore, setSessionScore] = useState(0);
  const [weaknessMap, setWeaknessMap] = useState({});
  const [transferQuestion, setTransferQuestion] = useState(null);

  const usedIndicesRef = useRef(new Set());

  // Reset state when topic changes
  const prevTopicRef = useRef(topic);
  useEffect(() => {
    if (topic === prevTopicRef.current) return;
    prevTopicRef.current = topic;

    setPhase(initialPhase);
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
    setCurrentRepairPlan(null);
    setRepairedConcepts(new Set());
    usedIndicesRef.current = new Set();
    setSessionScore(0);
    setWeaknessMap({});
    setTransferQuestion(null);
  }, [topic, initialPhase]);

  // Current question being answered
  const rawQuestion = activeQuestion || questions[qIdx] || null;
  const currentQuestion = useMemo(() => {
    return getVerifiedQuestionWithOptions(rawQuestion);
  }, [rawQuestion]);
  const isLastQuestion = qIdx >= questions.length - 1;

  // ── 1. startTest ───────────────────────────────────────────────────────────
  const startTest = useCallback(() => {
    setPhase(SESSION_PHASES.QUIZ);
    setQIdx(0);
    setAnswer("");
    setWork("");
    setFeedback(null);
  }, []);

  // ── 2. diagnoseFailure ─────────────────────────────────────────────────────
  const diagnoseFailure = useCallback(
    (evalResult, q) => {
      const cat = evalResult?.diagnosis?.type || evalResult?.analysis?.diagnosis?.type || "CONCEPTUAL_GAP";
      const recurrence = recordErrorAndGetRecurrence(topic, cat);

      return {
        ...evalResult,
        analysis: {
          ...(evalResult?.analysis || {}),
          diagnosisType: cat,
          recurrence,
        },
      };
    },
    [topic]
  );

  // ── 3. createRepairPlan ────────────────────────────────────────────────────
  const createRepairPlan = useCallback(
    (q, studentAns, evalResult) => {
      const plan = buildRepairPlan({
        question: q,
        feedback: evalResult,
        studentAnswer: studentAns,
        subject,
        chapter,
        topic,
      });
      setCurrentRepairPlan(plan);
      return plan;
    },
    [subject, chapter, topic]
  );

  // ── 4. recordMistake ───────────────────────────────────────────────────────
  const recordMistake = useCallback(
    (q, index, evalResult) => {
      setFailedQuestions((prev) => [
        ...prev,
        {
          qIdx: index,
          question: q.q || q.stem || "",
          correctAnswer: evalResult.correctAnswer,
          solution: evalResult.solution,
          mark: evalResult.mark,
          originalQ: q,
        },
      ]);

      mistakeRepo
        .saveMistake({
          userId,
          topicId: topic,
          subjectId: subject?.id || null,
          chapterId: chapter?.id || null,
          questionIndex: index,
          questionText: q.q || q.stem || "",
          correctAnswer: evalResult.correctAnswer || "",
          solution: evalResult.solution || "",
        })
        .catch(() => {});
    },
    [userId, topic, subject, chapter]
  );

  // ── 5. executeRepair / runRetest ───────────────────────────────────────────
  const executeRepair = useCallback(() => {
    const q = questions[qIdx];
    if (!q) return;

    // Use current repair plan or build fresh one
    const plan = currentRepairPlan || createRepairPlan(q, answer, feedback);
    const { probe, intervention } = selectRepairIntervention(plan, questions);

    setActiveQuestion(probe);
    setIsRepairing(true);
    setAnswer("");
    setWork("");
    setFeedback(null);
    setShowHint(false);
  }, [questions, qIdx, currentRepairPlan, createRepairPlan, answer, feedback]);

  // ── 6. confirmRepair ───────────────────────────────────────────────────────
  const confirmRepair = useCallback(
    (q) => {
      const conceptTag = q.concept_tag || q.semanticSkill?.conceptId || `q_${qIdx}`;
      setRepairedConcepts((prev) => new Set([...prev, conceptTag]));

      // Multi-state mistake transition: PROVISIONALLY_FIXED
      mistakeRepo
        .markProvisionallyFixed(topic, qIdx, {
          subjectId: subject?.id,
          chapterId: chapter?.id,
          userId,
        })
        .catch(() => {});
    },
    [qIdx, topic, subject, chapter, userId]
  );

  // ── 7. scheduleReview ──────────────────────────────────────────────────────
  const scheduleReview = useCallback(
    (score, total) => {
      const isCorrect = score >= 80;
      const finalConfidence = confidence || "medium";

      spacedRepo
        .updateReviewSchedule(topic, isCorrect, finalConfidence, {
          sid: subject?.id,
          cid: chapter?.id,
          userId,
        })
        .catch(() => {});

      if (subject?.id && chapter?.id) {
        saveProgress({
          sid: subject.id,
          cid: chapter.id,
          topicTitle: topic,
          completed: true,
          score,
          mastered: failedQuestions.length === 0,
          confidenceLevel: finalConfidence,
        }).catch(() => {});

        if (failedQuestions.length === 0 && topic) {
          saveAchievement(`Mastered: ${topic}`).catch(() => {});
        }
      }

      if (score === 100 && markMastered) {
        markMastered(`${subject?.id}|${chapter?.id}|${topic}`);
      }
    },
    [confidence, topic, subject, chapter, userId, failedQuestions.length, markMastered]
  );

  // ── 8. submitAnswer ────────────────────────────────────────────────────────
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
      const rawRes = evaluateAnswer(answer, q, work);

      if (!rawRes.isCorrect) {
        // Step A: Diagnose failure
        const diagnosed = diagnoseFailure(rawRes, q);

        // Step B: Build repair plan
        const plan = createRepairPlan(q, answer, diagnosed);

        setFeedback({
          ...diagnosed,
          confidence,
          whatWentWrong: plan.whatWentWrong,
          rule: plan.rule,
        });
        setGrading(false);

        if (!isRepairing) {
          usedIndicesRef.current.add(qIdx);
          recordMistake(q, qIdx, diagnosed);
        }
      } else {
        // Correct answer
        setFeedback({
          ...rawRes,
          confidence,
          isRepaired: isRepairing,
        });
        setGrading(false);

        if (isRepairing) {
          confirmRepair(q);
        } else {
          usedIndicesRef.current.add(qIdx);
        }
      }
    }, 150);
  }, [
    grading,
    answer,
    currentQuestion,
    work,
    confidence,
    diagnoseFailure,
    createRepairPlan,
    isRepairing,
    qIdx,
    recordMistake,
    confirmRepair,
  ]);

  // ── 9. finishQuiz ──────────────────────────────────────────────────────────
  const finishQuiz = useCallback(() => {
    const total = questions.length;
    const failedCount = failedQuestions.length;
    const score = total > 0 ? Math.round(((total - failedCount) / total) * 100) : 100;
    setSessionScore(score);

    scheduleReview(score, total);

    const map = buildWeaknessMap(failedQuestions, questions);
    setWeaknessMap(map);

    const tq = getTransferQuestion(questions, usedIndicesRef.current, topic, questions[0]);
    setTransferQuestion(tq);

    setPhase(SESSION_PHASES.MASTERY);
  }, [questions, failedQuestions, topic, scheduleReview]);

  // ── 10. nextQuestion ───────────────────────────────────────────────────────
  const nextQuestion = useCallback(() => {
    if (isRepairing) {
      setActiveQuestion(null);
      setIsRepairing(false);
      setCurrentRepairPlan(null);
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
      setCurrentRepairPlan(null);
    } else {
      finishQuiz();
    }
  }, [isRepairing, qIdx, questions.length, finishQuiz]);

  return {
    phase,
    setPhase,

    // Orchestrator Actions
    startTest,
    submitAnswer,
    executeRepair,
    startMutatedRepair: executeRepair, // Backwards-compatible alias
    nextQuestion,

    // Quiz Props
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

    // Repair & Gap State
    isRepairing,
    currentRepairPlan,
    repairedConcepts: Array.from(repairedConcepts),
    failedQuestions,

    // Mastery & Spaced Review
    sessionScore,
    weaknessMap,
    transferQuestion,
  };
}
