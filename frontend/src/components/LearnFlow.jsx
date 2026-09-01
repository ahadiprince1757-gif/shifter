import { useEffect } from "react";
import { useTopicContent } from "../hooks/useTopicContent";
import { useSessionLoop, SESSION_PHASES } from "../hooks/useSessionLoop";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import { incrementGuestQuizCount } from "../utils/guestSession";

import { isCalculationQuestion } from "../utils/questionTypeHelper";

import LearnHeader from "./learn/LearnHeader";
import PhaseStrip from "./learn/PhaseStrip";
import NotesPhase from "./learn/NotesPhase";
import QuizPhase from "./learn/QuizPhase";
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
  const { session, openAuthWithReason } = useAuth();
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

  // Load topic content
  const { content, loading, error } = useTopicContent(
    subject,
    chapter,
    topic,
    null,
    userId
  );

  // Initialize edge-of-friction session loop
  const loop = useSessionLoop({
    subject,
    chapter,
    topic,
    content,
    userId,
    markMastered,
  });

  const handleGoToQuiz = () => {
    if (!session) {
      openAuthWithReason(
        "Please sign in to take quizzes and track your mastery."
      );
      return;
    }
    loop.setPhase(SESSION_PHASES.QUIZ);
  };

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
        <PhaseStrip phase={loop.phase} setPhase={loop.setPhase} />
        <div id="learnFlow">
          <div className="lc" style={{ padding: "2rem" }}>
            <SkeletonLoader type="text" />
          </div>
        </div>
      </div>
    );
  }

  const handleFinishQuiz = () => {
    if (!session) {
      incrementGuestQuizCount();
    }
    loop.nextQuestion();
  };

  const questions = Array.isArray(content?.qs) ? content.qs : [];
  const hasQuestions = questions.length > 0;

  return (
    <div id="v-learn" className="view active">
      <LearnHeader
        goBack={goBack}
        topic={topic}
        subject={subject}
        chapter={chapter}
      />

      <PhaseStrip
        phase={loop.phase}
        setPhase={loop.setPhase}
        canJumpTo={(p) => {
          if (p === 0) return true;
          if (p === 1) return true;
          if (p === 2) return loop.phase === 2 || mastered?.has(`${subject?.id}|${chapter?.id}|${topic}`);
          return false;
        }}
      />

      <div id="learnFlow">
        {/* STEP 0: STUDY NOTES */}
        {loop.phase === SESSION_PHASES.NOTES && (
          <NotesPhase
            topic={topic}
            subject={subject}
            chapter={chapter}
            content={content}
            goBack={goBack}
            onNext={handleGoToQuiz}
          />
        )}

        {/* STEP 1: PRACTICE QUIZ (with in-quiz Edge of Friction Repair) */}
        {loop.phase === SESSION_PHASES.QUIZ &&
          (hasQuestions ? (
            <QuizPhase
              topic={topic}
              qIdx={loop.qIdx}
              curQ={loop.currentQuestion}
              isCalc={isCalculationQuestion(loop.currentQuestion, subject?.name || subject?.label || subject?.id)}
              answer={loop.answer}
              setAnswer={loop.setAnswer}
              work={loop.work}
              setWork={loop.setWork}
              grading={loop.grading}
              feedback={loop.feedback}
              validationError={loop.validationError}
              showHint={loop.showHint}
              setShowHint={loop.setShowHint}
              submitAnswer={loop.submitAnswer}
              nextQuestion={loop.nextQuestion}
              finishTopic={handleFinishQuiz}
              isLastQuestion={loop.isLastQuestion}
              totalQs={loop.totalQs}
              confidence={loop.confidence}
              setConfidence={loop.setConfidence}
              content={content}
              startMutatedRepair={loop.startMutatedRepair}
            />
          ) : (
            <div className="lc" style={{ padding: "2rem" }}>
              <div className="lch">
                <span className="lbadge lb-q">Practice Quiz</span>
              </div>
              <div className="lcb">
                <p style={{ color: "var(--t2)", marginBottom: "1.2rem" }}>
                  There are no quiz questions available for this topic yet.
                </p>
                <button
                  className="btn-p"
                  onClick={() => loop.setPhase(SESSION_PHASES.MASTERY)}
                >
                  Finish Topic
                </button>
                <button
                  className="btn-g"
                  onClick={() => loop.setPhase(SESSION_PHASES.NOTES)}
                  style={{ marginLeft: "1rem" }}
                >
                  Back to Notes
                </button>
              </div>
            </div>
          ))}

        {/* STEP 2: MASTERY & REVIEW */}
        {loop.phase === SESSION_PHASES.MASTERY && (
          <SessionSummary
            topic={topic}
            subject={subject}
            chapter={chapter}
            sessionScore={loop.sessionScore}
            weaknessMap={loop.weaknessMap}
            repairedConcepts={loop.repairedConcepts}
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
