import { useState, useEffect } from "react";
import { useTopicContent } from "../hooks/useTopicContent";
import { useQuiz } from "../hooks/useQuiz";
import SkeletonLoader from "./SkeletonLoader";

import LearnHeader from "./learn/LearnHeader";
import PhaseStrip from "./learn/PhaseStrip";
import NotesPhase from "./learn/NotesPhase";
import QuizPhase from "./learn/QuizPhase";
import MasteredPhase from "./learn/MasteredPhase";

function LearnFlow({
  subject,
  chapter,
  topic,
  goBack,
  goToTopic,
  markMastered,
  mastered,
}) {
  const [phase, setPhase] = useState(0); // 0: Notes, 1: Quiz, 2: Mastered

  // Persist last-visited topic so the Subjects page can offer a "Continue" banner
  useEffect(() => {
    if (subject?.id && chapter?.id && topic) {
      try {
        localStorage.setItem(
          "lastTopic",
          JSON.stringify({
            subjectId: subject.id,
            subjectLabel: subject.label,
            chapterId: chapter.id,
            chapterLabel: chapter.label,
            topic,
          })
        );
      } catch { /* storage quota or private-mode errors — silently ignore */ }
    }
  }, [subject?.id, subject?.label, chapter?.id, chapter?.label, topic]);

  const { content, loading, error } = useTopicContent(
    subject,
    chapter,
    topic,
    setPhase,
  );

  const quiz = useQuiz(
    subject,
    chapter,
    topic,
    content,
    markMastered,
    setPhase,
  );

  if (loading || error || !content) {
    return (
      <div id="v-learn" className="view active">
        <LearnHeader
          goBack={goBack}
          topic={topic}
          subject={subject}
          chapter={chapter}
          phase={phase}
        />

        <PhaseStrip
          phase={phase}
          setPhase={setPhase}
          canJumpTo={() => false}
        />

        <div id="learnFlow">
          <div className="lc" style={{ padding: "2rem" }}>
            {phase === 1 ? (
              <SkeletonLoader type="quiz" />
            ) : phase === 2 ? (
              <SkeletonLoader type="list" count={3} />
            ) : (
              <SkeletonLoader type="text" />
            )}
          </div>
        </div>
      </div>
    );
  }

  const questions = Array.isArray(content?.qs) ? content.qs : [];
  const curQ = questions[quiz.qIdx] ?? null;
  const isCalc = curQ && curQ.type === "calc";

  const findNextTopic = () => {
    if (!subject || !chapter || !topic) return null;

    const currentTopicIndex = chapter.topics.indexOf(topic);
    if (currentTopicIndex >= 0) {
      const nextInChapter = chapter.topics
        .slice(currentTopicIndex + 1)
        .find((t) => !mastered.has(`${subject.id}|${chapter.id}|${t}`));
      if (nextInChapter) {
        return { chapterId: chapter.id, topic: nextInChapter };
      }
    }

    const currentChapterIndex = subject.chapters.findIndex(
      (c) => c.id === chapter.id,
    );
    for (let i = currentChapterIndex + 1; i < subject.chapters.length; i += 1) {
      const nextTopic = subject.chapters[i].topics.find(
        (t) => !mastered.has(`${subject.id}|${subject.chapters[i].id}|${t}`),
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

  const hasQuestions = questions.length > 0;
  const isLastQuestion = hasQuestions && quiz.qIdx === questions.length - 1;

const finishTopic = () => {
  const key = `${subject.id}|${chapter.id}|${topic}`;

  markMastered(key);

  if (quiz.finishQuiz) {
    quiz.finishQuiz();
  }

  setPhase(2);

  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};



  const quizCompleted =
    !hasQuestions ||
    quiz.quizFinished ||
    (isLastQuestion && quiz.feedback !== null);

const canJumpToPhase = (idx) => {
  // Notes always clickable
  if (idx === 0) return true;

  // Quiz clickable after notes
  if (idx === 1) return true;

  // Mastered clickable after finishing
  if (idx === 2) {
    return (
      phase === 2 ||
      quizCompleted ||
      quiz.quizFinished ||
      mastered.has(`${subject.id}|${chapter.id}|${topic}`)
    );
  }

  return false;
};

  return (
    <div id="v-learn" className="view active">
      <LearnHeader
        goBack={goBack}
        topic={topic}
        subject={subject}
        chapter={chapter}
        phase={phase}
      />

      <PhaseStrip
        phase={phase}
        setPhase={setPhase}
        canJumpTo={canJumpToPhase}
      />

      <div id="learnFlow">
        {phase === 0 && (
          <NotesPhase
            topic={topic}
            subject={subject}
            chapter={chapter}
            content={content}
            goBack={goBack}
            onNext={() => setPhase(1)}
          />
        )}

        {phase === 1 &&
          (hasQuestions ? (
            <QuizPhase
              topic={topic}
              qIdx={quiz.qIdx}
              curQ={quiz.activeQuestion || curQ}
              isCalc={quiz.activeQuestion ? quiz.activeQuestion.type === "calc" : isCalc}
              answer={quiz.answer}
              setAnswer={quiz.setAnswer}
              work={quiz.work}
              setWork={quiz.setWork}
              explanation={quiz.explanation}
              setExplanation={quiz.setExplanation}
              grading={quiz.grading}
              feedback={quiz.feedback}
              validationError={quiz.validationError}
              showHint={quiz.showHint}
              setShowHint={quiz.setShowHint}
              submitAnswer={quiz.submitAnswer}
              nextQuestion={quiz.nextQuestion}
              finishTopic={finishTopic}
              isLastQuestion={isLastQuestion}
              totalQs={questions.length}
              retryState={quiz.retryState}
              activeQuestion={quiz.activeQuestion}
              startRetry={quiz.startRetry}
              goToReview={quiz.goToReview}
              content={content}
              confidence={quiz.confidence}
              setConfidence={quiz.setConfidence}
            />
          ) : (
            <div className="lc" style={{ padding: "2rem" }}>
              <div className="lch">
                <span className="lbadge lb-q">🧠 Quiz</span>
              </div>
              <div className="lcb">
                <p style={{ color: "var(--t2)", marginBottom: "1.2rem" }}>
                  There are no quiz questions available for this topic yet.
                </p>
                <button className="btn-p" onClick={() => { finishTopic(); setPhase(2); }}>
                  Finish Topic
                </button>
                <button
                  className="btn-g"
                  onClick={() => setPhase(0)}
                  style={{ marginLeft: "1rem" }}
                >
                  Back to Notes
                </button>
              </div>
            </div>
          ))}

        {phase === 2 && (
          <MasteredPhase
            topic={topic}
            content={content}
            nextTopic={nextTopic?.topic}
            goToNext={goToNextTopic}
            goBack={goBack}
            failedQuestions={quiz.failedQuestions}
          />
        )}
      </div>
    </div>
  );
}

export default LearnFlow;
