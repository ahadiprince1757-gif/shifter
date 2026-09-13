import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mistakeRepo } from "../repository/mistakeRepo";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import { navigateToTopic, LEARNING_MODES } from "../utils/learningNavigation";
import { SUBJECTS } from "../data/subjectRegistry";

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

export default function Gaps() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await mistakeRepo.getUnresolvedMistakes(userId);
      if (cancelled) return;
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setGaps(data);
      setLoading(false);
      mistakeRepo.cleanupOldResolved().catch(() => {});
    }
    load();
    return () => { cancelled = true; };
  }, [userId]);

  const activeSubjects = [...new Set(gaps.map((g) => g.subject_id).filter(Boolean))];

  const filtered =
    filter === "all"
      ? gaps
      : gaps.filter((g) => g.subject_id === filter);

  const handlePractice = (gap) => {
    const subjectId = gap.subject_id || gap.sid;
    const chapterId = gap.chapter_id || gap.chapter_key || gap.cid;
    const topicId   = gap.topic_id || gap.topic_title;

    navigateToTopic(navigate, {
      subjectId,
      chapterId,
      topicId,
      mode: LEARNING_MODES.MISTAKE_REPAIR,
      source: "gaps_ledger",
      mistakeId: gap.id,
      questionId: gap.question_id || null,
    });
  };

  const getStatusBadge = (gap) => {
    if (gap.resolved) {
      return <span className="badge badge-success">STRONG</span>;
    }
    if (gap.attempt_count > 1) {
      return <span className="badge badge-warning">NEEDS REPAIR</span>;
    }
    return <span className="badge badge-info">VERIFYING</span>;
  };

  return (
    <div className="mistake-journal" id="v-gaps">
      <div className="mj-header">
        <h2 className="mj-title">Knowledge Gaps</h2>
        <p className="mj-subtitle">
          Identified weaknesses that require targeted practice. Tixar retests these until they stick.
        </p>
      </div>

      {loading ? (
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={4} />
        </div>
      ) : gaps.length === 0 ? (
        <div className="mj-empty">
          <div className="mj-empty-icon">✓</div>
          <p className="mj-empty-text">No unresolved knowledge gaps.</p>
          <p className="mj-empty-sub">Solve quiz problems in your subjects to diagnose and repair any hidden weaknesses.</p>
        </div>
      ) : (
        <>
          {activeSubjects.length > 1 && (
            <div className="mj-filter-row">
              <button
                className={`mj-filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All ({gaps.length})
              </button>
              {activeSubjects.map((sub) => {
                const subMeta = SUBJECTS[sub] || { name: formatTitle(sub) };
                return (
                  <button
                    key={sub}
                    className={`mj-filter-btn ${filter === sub ? "active" : ""}`}
                    onClick={() => setFilter(sub)}
                  >
                    {subMeta.name} ({gaps.filter((g) => g.subject_id === sub).length})
                  </button>
                );
              })}
            </div>
          )}

          <div className="mj-list">
            {filtered.map((gap) => {
              const subMeta = SUBJECTS[gap.subject_id] || { name: formatTitle(gap.subject_id) };
              return (
                <div key={gap.id} className="mj-item">
                  <div className="mj-item-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span className="mj-topic-label">{formatTitle(gap.topic_id)}</span>
                      <span className="mj-subject-label">
                        {subMeta.name}
                        {gap.chapter_id ? ` · ${formatTitle(gap.chapter_id)}` : ""}
                      </span>
                    </div>
                    {getStatusBadge(gap)}
                  </div>

                  {gap.question_text && (
                    <div className="mj-question">{gap.question_text}</div>
                  )}

                  {gap.correct_answer && (
                    <div className="mj-answer-row">
                      <span className="mj-answer-label">Target Standard:</span>
                      <span className="mj-answer-value">{gap.correct_answer}</span>
                    </div>
                  )}

                  <button
                    className="mj-practice-btn"
                    onClick={() => handlePractice(gap)}
                  >
                    Practice This Gap →
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mj-resolve-note">
            Gaps automatically transition to Repaired when you complete the targeted probe and proof loop.
          </p>
        </>
      )}
    </div>
  );
}
