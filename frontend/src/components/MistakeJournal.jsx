import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mistakeRepo } from "../repository/mistakeRepo";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";

function formatTitle(str) {
  if (!str) return "";
  if (!str.includes("_") && !str.includes("-") && /[a-z]/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str
    .replace(/[_-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function MistakeJournal() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all" | subjectId
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await mistakeRepo.getUnresolvedMistakes(userId);
      if (cancelled) return;
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setMistakes(data);
      setLoading(false);
      mistakeRepo.cleanupOldResolved().catch(() => {});
    }
    load();
    return () => { cancelled = true; };
  }, [userId]);

  const subjects = [...new Set(mistakes.map((m) => m.subject_id).filter(Boolean))];

  const filtered =
    filter === "all"
      ? mistakes
      : mistakes.filter((m) => m.subject_id === filter);

  const handlePractice = (mistake) => {
    const sid = mistake.subject_id || mistake.sid;
    const cid = mistake.chapter_id || mistake.chapter_key || mistake.cid;
    const topic = mistake.topic_id || mistake.topic_title;
    if (sid && cid && topic) {
      navigate(
        `/learn/${sid}/${cid}/${encodeURIComponent(topic)}`
      );
    } else {
      navigate("/subjects");
    }
  };

  return (
    <div className="mistake-journal">
      <div className="mj-header">
        <h2 className="mj-title">Mistake Journal</h2>
        <p className="mj-subtitle">
          Questions you answered incorrectly — practice them to turn weaknesses into strengths.
        </p>
      </div>

      {loading ? (
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={4} />
        </div>
      ) : mistakes.length === 0 ? (
        <div className="mj-empty">
          <div className="mj-empty-icon">—</div>
          <p className="mj-empty-text">No unresolved mistakes. Great work so far.</p>
          <p className="mj-empty-sub">Keep doing quizzes and any incorrect answers will appear here for targeted review.</p>
        </div>
      ) : (
        <>
          {/* Subject Filter */}
          {subjects.length > 1 && (
            <div className="mj-filter-row">
              <button
                className={`mj-filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All ({mistakes.length})
              </button>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  className={`mj-filter-btn ${filter === sub ? "active" : ""}`}
                  onClick={() => setFilter(sub)}
                >
                  {formatTitle(sub)} ({mistakes.filter((m) => m.subject_id === sub).length})
                </button>
              ))}
            </div>
          )}

          <div className="mj-list">
            {filtered.map((mistake) => (
              <div key={mistake.id} className="mj-item">
                <div className="mj-item-meta">
                  <span className="mj-topic-label">{formatTitle(mistake.topic_id)}</span>
                  <span className="mj-subject-label">
                    {formatTitle(mistake.subject_id)}
                    {mistake.chapter_id ? ` · ${formatTitle(mistake.chapter_id)}` : ""}
                  </span>
                </div>

                {mistake.question_text && (
                  <div className="mj-question">{mistake.question_text}</div>
                )}

                {mistake.correct_answer && (
                  <div className="mj-answer-row">
                    <span className="mj-answer-label">Correct Answer:</span>
                    <span className="mj-answer-value">{mistake.correct_answer}</span>
                  </div>
                )}

                {mistake.attempt_count > 1 && (
                  <div className="mj-attempt-count">
                    Missed {mistake.attempt_count} time{mistake.attempt_count !== 1 ? "s" : ""}
                  </div>
                )}

                <button
                  className="mj-practice-btn"
                  onClick={() => handlePractice(mistake)}
                >
                  Practice This Topic →
                </button>
              </div>
            ))}
          </div>

          <p className="mj-resolve-note">
            Mistakes are automatically cleared once you answer them correctly in a retry session.
          </p>
        </>
      )}
    </div>
  );
}
