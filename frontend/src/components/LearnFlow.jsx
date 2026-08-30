import { useEffect } from "react";
import { useTopicContent } from "../hooks/useTopicContent";
import { useSessionLoop, SESSION_STATES } from "../hooks/useSessionLoop";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import { incrementGuestQuizCount } from "../utils/guestSession";

import LearnHeader from "./learn/LearnHeader";
import PhaseStrip from "./learn/PhaseStrip";
import DiagnosticPhase from "./learn/DiagnosticPhase";
import NotesPhase from "./learn/NotesPhase";
import QuizPhase from "./learn/QuizPhase";
import RepairPhase from "./learn/RepairPhase";
import SpacedRetestPhase from "./learn/SpacedRetestPhase";
import TransferPhase from "./learn/TransferPhase";
import SessionSummary from "./learn/SessionSummary";

function LearnFlow({
  subject,
  chapter,
  topic,
  goBack,
  goToTopic,
  markMastered,
  mastered,
}) {
  const { session } = useAuth();
  const userId = session?.user?.id || null;

  // Persist last-visited topic per user
  useEffect(() => {
    if (subject?.id && chapter?.id && topic && userId) {
      try {
        localStorage.setItem(
          `lastTopic_${userId}`,
          JSON.stringify({
            subjectId: subject.id,
            subjectLabel: subject.label,
            chapterId: chapter.id,
            chapterLabel: chapter.label,
            topic,
          })
        );
      } catch {
        /* storage quota — ignore */
      }
    }
  }, [subject?.id, subject?.label, chapter?.id, chapter?.label, topic, userId]);

  // Load content
  const { content, loading, error } = useTopicContent(
    subject,
    chapter,
    topic,
    null,
    userId
  );

  // Initialize the 9-state Mastery Session Loop
  const loop = useSessionLoop({
    subject,
    chapter,
    topic,
    content,
    userId,
    markMastered,
  });

  // Calculate next topic in curriculum
  const findNextTopic = () => {
    if (!subject || !chapter || !topic) return null;
    const currentTopicIndex = chapter.topics?.indexOf(topic);
    if (currentTopicIndex >= 0) {
      const nextInChapter = chapter.topics
        .slice(currentTopicIndex + 1)
        .find((t) => !mastered?.has(`${subject.id}|${chapter.id}|${t}`));
      if (nextInChapter) {
        return { chapterId: chapter.id, topic: nextInChapter };
      }
    }

    const currentChapterIndex = subject.chapters?.findIndex(
      (c) => c.id === chapter.id
    );
    for (
      let i = (currentChapterIndex ?? -1) + 1;
      i < (subject.chapters?.length || 0);
      i += 1
    ) {
      const nextTopic = subject.chapters[i].topics?.find(
        (t) => !mastered?.has(`${subject.id}|${subject.chapters[i].id}|${t}`)
      );
      if (nextTopic) {
        return { chapterId: subject.chapters[i].id, topic: nextTopic };
      }
    }
    return null;
  };

  const nextTopic = findNextTopic();
  const goToNextTopic = () => {
    if (nextTopic && goToTopic) {
      goToTopic(nextTopic.topic, nextTopic.chapterId);
    }
  };

  if (loading || error || !content) {
    return (
      <div id="v-learn" className="view active">
        <LearnHeader
          goBack={goBack}
          topic={topic}
          subject={subject}
          chapter={chapter}
        />
        <PhaseStrip
          sessionState={loop.sessionState}
          stateIndex={loop.stateIndex}
          isStateDone={loop.isStateDone}
          isStateCurrent={loop.isStateCurrent}
        />
        <div id="learnFlow">
          <div className="lc" style={{ padding: "2rem" }}>
            <SkeletonLoader type="text" />
          </div>
        </div>
      </div>
    );
  }

  const handleFinishSession = () => {
    if (!session) {
      incrementGuestQuizCount();
    }
    loop.finishSession();
  };

  return (
    <div id="v-learn" className="view active">
      <LearnHeader
        goBack={goBack}
        topic={topic}
        subject={subject}
        chapter={chapter}
      />

      <PhaseStrip
        sessionState={loop.sessionState}
        stateIndex={loop.stateIndex}
        isStateDone={loop.isStateDone}
        isStateCurrent={loop.isStateCurrent}
      />

      <div id="learnFlow">
        {/* 1. DIAGNOSE PHASE */}
        {loop.sessionState === SESSION_STATES.DIAGNOSE && (
          <DiagnosticPhase
            diagnosticQuestions={loop.diagnosticQuestions}
            onComplete={loop.finishDiagnostic}
          />
        )}

        {/* 2. TEACH PHASE (shown if gap found in diagnosis) */}
        {loop.sessionState === SESSION_STATES.TEACH && (
          <div className="teach-phase-wrapper">
            <div className="diagnostic-banner">
              ⚠️ Diagnostic outcome: Knowledge gap detected. Study the material below before taking the retrieval quiz.
            </div>
            <NotesPhase
              topic={topic}
              subject={subject}
              chapter={chapter}
              content={content}
              goBack={goBack}
              onNext={loop.finishTeach}
            />
          </div>
        )}

        {/* 3. RETRIEVE PHASE */}
        {loop.sessionState === SESSION_STATES.RETRIEVE && (
          <QuizPhase
            topic={topic}
            qIdx={loop.retrieveQIdx}
            curQ={loop.currentRetrieveQuestion}
            isCalc={loop.currentRetrieveQuestion?.type === "calc"}
            answer={loop.retrieveAnswer}
            setAnswer={loop.setRetrieveAnswer}
            work={loop.retrieveWork}
            setWork={loop.setRetrieveWork}
            explanation=""
            setExplanation={() => {}}
            grading={loop.retrieveGrading}
            feedback={loop.retrieveFeedback}
            validationError={loop.retrieveValidationError}
            showHint={loop.retrieveShowHint}
            setShowHint={loop.setRetrieveShowHint}
            submitAnswer={() =>
              loop.submitRetrieveAnswer(
                loop.retrieveQIdx,
                loop.retrieveAnswer,
                loop.retrieveWork,
                loop.retrieveConfidence
              )
            }
            nextQuestion={() =>
              loop.nextRetrieveQuestion(loop.failedQuestions, loop.retrieveConfidence)
            }
            finishTopic={() =>
              loop.nextRetrieveQuestion(loop.failedQuestions, loop.retrieveConfidence)
            }
            isLastQuestion={loop.isLastRetrieveQuestion}
            totalQs={loop.totalRetrieveQuestions}
            confidence={loop.retrieveConfidence}
            setConfidence={loop.setRetrieveConfidence}
          />
        )}

        {/* 4. REPAIR PHASE (IDENTIFY & REPAIR) */}
        {(loop.sessionState === SESSION_STATES.IDENTIFY ||
          loop.sessionState === SESSION_STATES.REPAIR) && (
          <RepairPhase
            conceptTag={loop.currentRepairConcept}
            repairData={loop.currentRepairData}
            content={content}
            subject={subject}
            currentIdx={loop.currentRepairIdx + 1}
            totalConcepts={loop.conceptOrder.length}
            onTaught={loop.markConceptTaught}
            onPassed={(concept) =>
              loop.passRepair(concept, loop.sessionScore, loop.retrieveConfidence)
            }
            onSkip={(concept) =>
              loop.passRepair(concept, loop.sessionScore, loop.retrieveConfidence)
            }
          />
        )}

        {/* 5. SPACE PHASE */}
        {loop.sessionState === SESSION_STATES.SPACE && (
          <div className="lc" style={{ padding: "2rem", textAlign: "center" }}>
            <div className="lbadge lb-space">Spacing Memory</div>
            <h3 style={{ marginTop: "1rem" }}>Review Schedule Updated</h3>
            <p style={{ color: "var(--t2)", marginTop: "0.5rem" }}>
              Memory consolidation schedule calculated. Preparing retest items...
            </p>
          </div>
        )}

        {/* 6. RETEST PHASE */}
        {loop.sessionState === SESSION_STATES.RETEST && (
          <SpacedRetestPhase
            dueReviews={loop.dueReviews}
            onComplete={loop.finishRetest}
          />
        )}

        {/* 7. TRANSFER PHASE */}
        {loop.sessionState === SESSION_STATES.TRANSFER && (
          <TransferPhase
            transferQuestion={loop.transferQuestion}
            answer={loop.transferAnswer}
            setAnswer={loop.setTransferAnswer}
            feedback={loop.transferFeedback}
            confidence={loop.transferConfidence}
            setConfidence={loop.setTransferConfidence}
            onSubmit={loop.submitTransferAnswer}
            onFinish={handleFinishSession}
          />
        )}

        {/* 8. DONE PHASE (SESSION SUMMARY) */}
        {loop.sessionState === SESSION_STATES.DONE && (
          <SessionSummary
            topic={topic}
            subject={subject}
            chapter={chapter}
            sessionScore={loop.sessionScore}
            diagnosticResult={loop.diagnosticResult}
            weaknessMap={loop.weaknessMap}
            conceptOrder={loop.conceptOrder}
            nextTopic={nextTopic?.topic}
            goToNext={goToNextTopic}
            goBack={goBack}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}

export default LearnFlow;
