import { useState } from "react";
import logger from "../utils/logger";
import SkeletonLoader from "./SkeletonLoader";

function SubjectGrid({ curriculum, openSubject, mastered, onResume }) {
  // Lazy initializer — reads localStorage once on first render, no effect needed
  const [lastTopic] = useState(() => {
    try {
      const raw = localStorage.getItem("lastTopic");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  if (!curriculum) {
    return (
      <div id="v-subjects" className="view active">
        <div className="sg-header">
          <h1 className="sg-title">Subjects</h1>
        </div>
        <div className="subj-grid">
          <SkeletonLoader type="grid" count={6} />
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", { subjectId, subjectLabel: label });
    openSubject(subjectId);
  };

  // Only show the resume banner if there's at least some mastery progress
  const hasMastered = mastered && mastered.size > 0;
  const showResume = lastTopic && hasMastered && onResume;

  return (
    <div id="v-subjects" className="view active">
      {showResume && (
        <div className="resume-card">
          <div className="resume-card-text">
            <span className="resume-card-label">Continue learning</span>
            <span className="resume-card-topic">{lastTopic.topic}</span>
            <span className="resume-card-path">
              {lastTopic.subjectLabel} · {lastTopic.chapterLabel}
            </span>
          </div>
          <button
            className="btn-p resume-card-btn"
            onClick={() => onResume(lastTopic.subjectId, lastTopic.chapterId, lastTopic.topic)}
          >
            Resume →
          </button>
        </div>
      )}

      <div className="sg-header">
        <h1 className="sg-title">Subjects</h1>
      </div>

      <div className="subj-grid">
        {curriculum.map((s) => {
          const totalTopics = s.chapters.reduce((a, c) => a + c.topics.length, 0);
          const masteredCount = s.chapters.reduce(
            (a, c) => a + c.topics.filter((t) => mastered.has(`${s.id}|${c.id}|${t}`)).length,
            0
          );
          const prog = totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0;

          return (
            <button
              className="subj-box"
              key={s.id}
              onClick={() => handleSubjectClick(s.id, s.label)}
              aria-label={`${s.label}, ${Math.round(prog)}% complete`}
            >
              <div className="subj-box-name">{s.label}</div>
              <div className="subj-box-prog">
                <div className="subj-box-bar">
                  <div className="subj-box-fill" style={{ width: `${prog}%` }} />
                </div>
                <span className="subj-box-pct">{Math.round(prog)}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectGrid;
