/**
 * useSessionLoop.js
 *
 * 3-Act Session Loop Controller wrapping the deep pedagogical engine:
 *
 * Act 1: CHECK & LEARN (Diagnose Probes → ALWAYS Teach/Notes)
 * Act 2: RETRIEVAL & REPAIR (Closed-Book Quiz → Targeted Concept Repair)
 * Act 3: TRANSFER & MASTERY (Spaced Retest → Structural Representation Transfer → Summary)
 *
 * Note: Even if diagnostic probes are answered correctly (no gap), Teaching/Notes is NEVER
 * skipped. It is presented as a concept confirmation pass to ensure no guessing occurred.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { selectDiagnosticQuestions, interpretDiagnostic } from "../utils/diagnosticSelector";
import {
  buildWeaknessMap,
  getConceptOrder,
  markRepairTaught,
  markRepairPassed,
} from "../utils/weaknessMap";
import { selectTransferQuestion, buildFallbackTransferQuestion } from "../utils/transferQuestion";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { evaluateAnswer } from "../utils/grader";

export const SESSION_STATES = {
  DIAGNOSE: "DIAGNOSE",
  TEACH: "TEACH",
  RETRIEVE: "RETRIEVE",
  IDENTIFY: "IDENTIFY",
  REPAIR: "REPAIR",
  SPACE: "SPACE",
  RETEST: "RETEST",
  TRANSFER: "TRANSFER",
  DONE: "DONE",
};

// 3 visual acts exposed to the UI top bar
export const ACT_MAP = {
  DIAGNOSE: 0, // Act 1: Check & Learn
  TEACH: 0,    // Act 1: Check & Learn
  RETRIEVE: 1, // Act 2: Retrieval & Repair
  IDENTIFY: 1, // Act 2: Retrieval & Repair
  REPAIR: 1,   // Act 2: Retrieval & Repair
  SPACE: 2,    // Act 3: Transfer & Mastery
  RETEST: 2,   // Act 3: Transfer & Mastery
  TRANSFER: 2, // Act 3: Transfer & Mastery
  DONE: 2,     // Act 3: Transfer & Mastery
};

export function useSessionLoop({ subject, chapter, topic, content, userId, markMastered }) {
  const questions = useMemo(
    () => (Array.isArray(content?.qs) ? content.qs : []),
    [content]
  );

  // ── Core state ──────────────────────────────────────────────────────────────
  const [sessionState, setSessionState] = useState(SESSION_STATES.DIAGNOSE);
  const [diagnosticQuestions, setDiagnosticQuestions] = useState([]);
  const [diagnosticResults, setDiagnosticResults] = useState([]);
  const [diagnosticResult, setDiagnosticResult] = useState(null); // "gap_found" | "no_gap"

  const usedIndicesRef = useRef(new Set());

  // ── Retrieve / Evaluate state ────────────────────────────────────────────────
  const [retrieveQIdx, setRetrieveQIdx] = useState(0);
  const [retrieveAnswer, setRetrieveAnswer] = useState("");
  const [retrieveWork, setRetrieveWork] = useState("");
  const [retrieveGrading, setRetrieveGrading] = useState(false);
  const [retrieveFeedback, setRetrieveFeedback] = useState(null);
  const [retrieveShowHint, setRetrieveShowHint] = useState(false);
  const [retrieveConfidence, setRetrieveConfidence] = useState(null);
  const [retrieveValidationError, setRetrieveValidationError] = useState("");
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [retrieveFinished, setRetrieveFinished] = useState(false);

  // ── Weakness / Repair state ──────────────────────────────────────────────────
  const [weaknessMap, setWeaknessMap] = useState({});
  const [conceptOrder, setConceptOrder] = useState([]);
  const [currentRepairIdx, setCurrentRepairIdx] = useState(0);

  // ── Spaced Review / Retest state ─────────────────────────────────────────────
  const [dueReviews, setDueReviews] = useState([]);

  // ── Transfer state ───────────────────────────────────────────────────────────
  const [transferQuestion, setTransferQuestion] = useState(null);
  const [transferAnswer, setTransferAnswer] = useState("");
  const [transferFeedback, setTransferFeedback] = useState(null);
  const [transferConfidence, setTransferConfidence] = useState(null);

  // ── Session summary ───────────────────────────────────────────────────────────
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Reset when topic changes
  const prevTopicRef = useRef(topic);
  useEffect(() => {
    if (topic === prevTopicRef.current) return;
    prevTopicRef.current = topic;

    setSessionState(SESSION_STATES.DIAGNOSE);
    setDiagnosticQuestions([]);
    setDiagnosticResults([]);
    setDiagnosticResult(null);
    usedIndicesRef.current = new Set();
    setRetrieveQIdx(0);
    setRetrieveAnswer("");
    setRetrieveWork("");
    setRetrieveGrading(false);
    setRetrieveFeedback(null);
    setRetrieveShowHint(false);
    setRetrieveConfidence(null);
    setRetrieveValidationError("");
    setFailedQuestions([]);
    setRetrieveFinished(false);
    setWeaknessMap({});
    setConceptOrder([]);
    setCurrentRepairIdx(0);
    setDueReviews([]);
    setTransferQuestion(null);
    setTransferAnswer("");
    setTransferFeedback(null);
    setTransferConfidence(null);
    setSessionScore(0);
    setSessionComplete(false);
  }, [topic]);

  // Load diagnostic questions
  useEffect(() => {
    if (questions.length === 0) return;
    if (sessionState !== SESSION_STATES.DIAGNOSE) return;
    if (diagnosticQuestions.length > 0) return;

    mistakeRepo
      .getUnresolvedMistakes(userId)
      .then((mistakes) => {
        const topicMistakes = (mistakes || [])
          .filter((m) => m.topic_id === topic)
          .map((m) => m.question_index)
          .filter((i) => typeof i === "number");
        setDiagnosticQuestions(selectDiagnosticQuestions(questions, topicMistakes));
      })
      .catch(() => {
        setDiagnosticQuestions(selectDiagnosticQuestions(questions, []));
      });
  }, [questions, sessionState, topic, userId, diagnosticQuestions.length]);

  const recordDiagnosticResult = useCallback((qIdx, passed) => {
    setDiagnosticResults((prev) => [
      ...prev.filter((r) => r.qIdx !== qIdx),
      { qIdx, passed },
    ]);
  }, []);

  // ── SPACE: schedule review & transition ──────────────────────────────────────
  const enterSpace = useCallback(
    (score, currentConfidence) => {
      setSessionState(SESSION_STATES.SPACE);

      const isCorrect = (score || 0) >= 80;
      const finalConfidence = currentConfidence || "medium";

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

      spacedRepo
        .getDueReviews(userId)
        .then((due) => {
          const filtered = (due || []).filter((r) => r.topic_id !== topic);
          setDueReviews(filtered);

          const tq =
            selectTransferQuestion(questions, usedIndicesRef.current) ||
            { qIdx: -1, q: buildFallbackTransferQuestion(topic, questions) };
          setTransferQuestion(tq);

          setSessionState(
            filtered.length > 0 ? SESSION_STATES.RETEST : SESSION_STATES.TRANSFER
          );
        })
        .catch(() => {
          const tq =
            selectTransferQuestion(questions, usedIndicesRef.current) ||
            { qIdx: -1, q: buildFallbackTransferQuestion(topic, questions) };
          setTransferQuestion(tq);
          setSessionState(SESSION_STATES.TRANSFER);
        });
    },
    [topic, subject, chapter, userId, markMastered, questions]
  );

  // ── RETRIEVE → IDENTIFY → REPAIR or SPACE ────────────────────────────────────
  const finishRetrieve = useCallback(
    (currentFailed, currentConfidence) => {
      setRetrieveFinished(true);

      const total = questions.length;
      const failedCount = (currentFailed || []).length;
      const score = total > 0 ? Math.round(((total - failedCount) / total) * 100) : 100;
      setSessionScore(score);

      const map = buildWeaknessMap(currentFailed || [], questions);
      const order = getConceptOrder(map);
      setWeaknessMap(map);
      setConceptOrder(order);

      if (order.length > 0) {
        setSessionState(SESSION_STATES.REPAIR);
      } else {
        enterSpace(score, currentConfidence);
      }
    },
    [questions, enterSpace]
  );

  // ── DIAGNOSE → ALWAYS TEACH (never skip teaching/notes) ─────────────────────
  const finishDiagnostic = useCallback(
    (results) => {
      const allResults = results || diagnosticResults;
      diagnosticQuestions.forEach(({ qIdx }) => usedIndicesRef.current.add(qIdx));

      const interpretation = interpretDiagnostic(allResults);
      setDiagnosticResult(interpretation);

      // ALWAYS proceed to TEACH/Notes so the student confirms their knowledge!
      setSessionState(SESSION_STATES.TEACH);
    },
    [diagnosticResults, diagnosticQuestions]
  );

  // ── TEACH → RETRIEVE ─────────────────────────────────────────────────────────
  const finishTeach = useCallback(() => {
    setSessionState(SESSION_STATES.RETRIEVE);
  }, []);

  // ── RETRIEVE answer submit ───────────────────────────────────────────────────
  const submitRetrieveAnswer = useCallback(
    (currentQIdx, currentAnswer, currentWork, currentConfidence) => {
      if (retrieveGrading) return;
      const answer = currentAnswer ?? retrieveAnswer;
      if (!answer.trim()) {
        setRetrieveValidationError("Please type your answer before submitting.");
        return;
      }

      setRetrieveValidationError("");
      setRetrieveGrading(true);

      const q = questions[currentQIdx ?? retrieveQIdx];
      if (!q) {
        setRetrieveGrading(false);
        return;
      }

      setTimeout(() => {
        const res = evaluateAnswer(answer, q);
        setRetrieveFeedback({ ...res, confidence: currentConfidence ?? retrieveConfidence });
        setRetrieveGrading(false);

        if (!res.isCorrect) {
          setFailedQuestions((prev) => [
            ...prev,
            {
              qIdx: currentQIdx ?? retrieveQIdx,
              question: q.q || "",
              correctAnswer: res.correctAnswer,
              solution: res.solution,
              mark: res.mark,
            },
          ]);
        }

        usedIndicesRef.current.add(currentQIdx ?? retrieveQIdx);
      }, 200);
    },
    [retrieveGrading, retrieveAnswer, retrieveQIdx, questions, retrieveConfidence]
  );

  const nextRetrieveQuestion = useCallback(
    (currentFailed, currentConfidence) => {
      const isLast = retrieveQIdx >= questions.length - 1;

      if (!isLast) {
        setRetrieveQIdx((prev) => prev + 1);
        setRetrieveAnswer("");
        setRetrieveWork("");
        setRetrieveFeedback(null);
        setRetrieveShowHint(false);
        setRetrieveValidationError("");
        setRetrieveConfidence(null);
      } else {
        finishRetrieve(currentFailed, currentConfidence);
      }
    },
    [retrieveQIdx, questions.length, finishRetrieve]
  );

  const markConceptTaught = useCallback((conceptTag) => {
    setWeaknessMap((prev) => markRepairTaught(prev, conceptTag));
  }, []);

  const passRepair = useCallback(
    (conceptTag, currentScore, currentConfidence) => {
      setWeaknessMap((prev) => markRepairPassed(prev, conceptTag));
      setCurrentRepairIdx((prevIdx) => {
        const nextIdx = prevIdx + 1;
        if (nextIdx >= conceptOrder.length) {
          setTimeout(() => enterSpace(currentScore ?? sessionScore, currentConfidence ?? retrieveConfidence), 0);
        }
        return nextIdx;
      });
    },
    [conceptOrder.length, enterSpace, sessionScore, retrieveConfidence]
  );

  const finishRetest = useCallback(() => {
    setSessionState(SESSION_STATES.TRANSFER);
  }, []);

  const submitTransferAnswer = useCallback(() => {
    if (!transferAnswer.trim() || transferFeedback) return;
    const q = transferQuestion?.q;
    if (!q) return;
    const res = evaluateAnswer(transferAnswer, q);
    setTransferFeedback({ ...res, confidence: transferConfidence });
  }, [transferAnswer, transferFeedback, transferQuestion, transferConfidence]);

  const finishSession = useCallback(() => {
    setSessionState(SESSION_STATES.DONE);
    setSessionComplete(true);
  }, []);

  // Compute active 3-act UI index (0, 1, or 2)
  const activeActIndex = ACT_MAP[sessionState] ?? 0;

  const currentRetrieveQuestion = questions[retrieveQIdx] || null;
  const isLastRetrieveQuestion = retrieveQIdx >= questions.length - 1;
  const currentRepairConcept = conceptOrder[currentRepairIdx] || null;
  const currentRepairData = currentRepairConcept ? weaknessMap[currentRepairConcept] : null;

  return {
    // State
    sessionState,
    activeActIndex,

    // DIAGNOSE
    diagnosticQuestions,
    diagnosticResults,
    diagnosticResult,
    recordDiagnosticResult,
    finishDiagnostic,

    // TEACH
    finishTeach,

    // RETRIEVE
    retrieveQIdx,
    currentRetrieveQuestion,
    isLastRetrieveQuestion,
    retrieveAnswer,
    setRetrieveAnswer,
    retrieveWork,
    setRetrieveWork,
    retrieveGrading,
    retrieveFeedback,
    setRetrieveFeedback,
    retrieveShowHint,
    setRetrieveShowHint,
    retrieveConfidence,
    setRetrieveConfidence,
    retrieveValidationError,
    retrieveFinished,
    submitRetrieveAnswer,
    nextRetrieveQuestion,
    failedQuestions,
    totalRetrieveQuestions: questions.length,

    // IDENTIFY / REPAIR
    weaknessMap,
    conceptOrder,
    currentRepairIdx,
    currentRepairConcept,
    currentRepairData,
    markConceptTaught,
    passRepair,

    // SPACE
    sessionScore,

    // RETEST
    dueReviews,
    finishRetest,

    // TRANSFER
    transferQuestion,
    transferAnswer,
    setTransferAnswer,
    transferFeedback,
    setTransferFeedback,
    transferConfidence,
    setTransferConfidence,
    submitTransferAnswer,
    finishSession,

    // DONE
    sessionComplete,
  };
}
