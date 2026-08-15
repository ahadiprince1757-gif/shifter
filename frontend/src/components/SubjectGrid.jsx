import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../utils/logger";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";

import { useAuth } from "../hooks/useAuth";

function SubjectGrid({ curriculum, openSubject, mastered, onResume }) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const userId = session?.user?.id || null;

  // localStorage is synchronous → derive lastTopic via useMemo (no setState in effects)
  const lastTopic = useMemo(() => {
    if (!userId) return null;
    try {
      const raw = localStorage.getItem(`lastTopic_${userId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, [userId]);

  // Async spaced reviews state
  const [dueReviews, setDueReviews] = useState([]);

  // Only async work goes in useEffect
  useEffect(() => {
    if (!userId) return;
    spacedRepo.getDueReviews(userId).then(setDueReviews).catch(() => {});
  }, [userId]);


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

  // Show the resume banner whenever there is a valid last visited topic
  const showResume = Boolean(
    lastTopic &&
    lastTopic.subjectId &&
    lastTopic.chapterId &&
    lastTopic.topic &&
    onResume
  );

  return (
    <div id="v-subjects" className="view active">
      {showResume && (
        <div className="resume-card">
          <div className="resume-card-text">
            <div className="resume-card-header">
              <span className="resume-card-badge">Continue</span>
              <span className="resume-card-path">
                {lastTopic.subjectLabel || "Subject"} · {lastTopic.chapterLabel || "Chapter"}
              </span>
            </div>
            <h2 className="resume-card-topic">{lastTopic.topic}</h2>
          </div>
          <button
            type="button"
            className="resume-card-btn"
            onClick={() => onResume(lastTopic.subjectId, lastTopic.chapterId, lastTopic.topic)}
          >
            Resume Topic →
          </button>
        </div>
      )}

      {/* Spaced Review Queue Banner */}
      {dueReviews.length > 0 && (
        <div className="review-queue-banner">
          <div className="review-queue-text">
            <span className="review-queue-count">{dueReviews.length}</span>
            <span className="review-queue-label">
              topic{dueReviews.length !== 1 ? "s" : ""} scheduled for memory review today
            </span>
          </div>
          <button
            type="button"
            className="review-queue-btn"
            onClick={() => navigate("/analytics")}
          >
            Start Memory Review →
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
