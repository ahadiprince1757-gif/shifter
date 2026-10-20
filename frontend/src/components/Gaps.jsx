import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mistakeRepo } from "../repository/mistakeRepo";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import { navigateToTopic, LEARNING_MODES } from "../utils/learningNavigation";
import { SUBJECTS } from "../data/subjectRegistry";
import { networkService } from "../services/networkService";

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

const CANONICAL_SUBJECT_MAP = {
  math: "Mathematics",
  mathematics: "Mathematics",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  english: "English",
  computer: "Computer Studies",
  computer_studies: "Computer Studies",
};

const SUBJECT_ORDER = [
  "math",
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "english",
  "computer",
  "computer_studies",
];

function getCanonicalSubjectName(subId) {
  if (!subId) return "General";
  const lower = subId.toLowerCase();
  if (CANONICAL_SUBJECT_MAP[lower]) return CANONICAL_SUBJECT_MAP[lower];
  if (SUBJECTS[lower]?.name) return SUBJECTS[lower].name;
  return formatTitle(subId);
}

export default function Gaps() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isOffline, setIsOffline] = useState(!networkService.isOnline);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = networkService.subscribe((state) => {
      setIsOffline(!state.isOnline);
    });
    return unsubscribe;
  }, []);

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
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Sort canonical subjects list based on standard ordering
  const activeSubjects = useMemo(() => {
    const raw = [...new Set(gaps.map((g) => g.subject_id).filter(Boolean))];
    return raw.sort((a, b) => {
      const idxA = SUBJECT_ORDER.indexOf(a.toLowerCase());
      const idxB = SUBJECT_ORDER.indexOf(b.toLowerCase());
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [gaps]);

  // Current active subject (defaults to first subject with gaps)
  const activeSubject = useMemo(() => {
    if (selectedSubject && activeSubjects.includes(selectedSubject)) {
      return selectedSubject;
    }
    return activeSubjects[0] || null;
  }, [selectedSubject, activeSubjects]);

  // Gaps for the active subject
  const currentSubjectGaps = useMemo(() => {
    if (!activeSubject) return [];
    return gaps.filter((g) => g.subject_id === activeSubject);
  }, [gaps, activeSubject]);

  // Recommended focus gap for this subject
  const priorityGap = useMemo(() => {
    if (!currentSubjectGaps || currentSubjectGaps.length === 0) return null;
    return [...currentSubjectGaps].sort((a, b) => {
      const aScore = (!a.resolved ? 100 : 0) + (a.attempt_count || 1) * 15;
      const bScore = (!b.resolved ? 100 : 0) + (b.attempt_count || 1) * 15;
      if (bScore !== aScore) return bScore - aScore;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })[0];
  }, [currentSubjectGaps]);

  // Group current subject gaps by chapter for clean organization
  const chapters = useMemo(() => {
    const map = new Map();
    for (const gap of currentSubjectGaps) {
      const chKey = gap.chapter_id || "general";
      if (!map.has(chKey)) map.set(chKey, []);
      map.get(chKey).push(gap);
    }
    // Sort items inside each chapter
    for (const [, list] of map.entries()) {
      list.sort((a, b) => {
        if (!a.resolved && b.resolved) return -1;
        if (a.resolved && !b.resolved) return 1;
        const aAttempts = a.attempt_count || 1;
        const bAttempts = b.attempt_count || 1;
        if (bAttempts !== aAttempts) return bAttempts - aAttempts;
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
    }
    return Array.from(map.entries());
  }, [currentSubjectGaps]);

  const handlePractice = (gap) => {
    if (!gap) return;
    const subjectId = gap.subject_id || gap.sid;
    const chapterId = gap.chapter_id || gap.chapter_key || gap.cid;
    const topicId = gap.topic_id || gap.topic_title;

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

  return (
    <div className="gaps-workspace" id="v-gaps">
      {/* ── Executive Noise-Free Header ── */}
      <header className="gaps-header">
        <h1 className="gaps-title">Knowledge Gaps</h1>
        <p className="gaps-subtitle">
          {activeSubject && currentSubjectGaps.length > 0
            ? `${currentSubjectGaps.length} topic${currentSubjectGaps.length === 1 ? "" : "s"} identified for targeted practice in ${getCanonicalSubjectName(activeSubject)}.`
            : "Review and strengthen topics identified from your previous quizzes."}
        </p>
      </header>

      {/* ── Quiet Offline Indicator ── */}
      {isOffline && (
        <div className="mj-offline-banner" role="status" aria-live="polite">
          <svg
            className="mj-offline-svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
            <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
          <span>Offline mode &mdash; displaying locally stored gaps.</span>
        </div>
      )}

      {loading ? (
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={4} />
        </div>
      ) : gaps.length === 0 ? (
        /* ── Modern Empty State (Zero Emojis, Peaceful) ── */
        <div className="mj-empty-state">
          <div className="mj-empty-art" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gr, #10b981)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <h2 className="mj-empty-heading">All Clear &mdash; No Unresolved Gaps</h2>
          <p className="mj-empty-desc">
            You have mastered all tested concepts across your subjects. Explore new topics to keep learning.
          </p>
          <button
            type="button"
            className="mj-empty-btn"
            onClick={() => navigate("/subjects")}
          >
            Explore Subjects &rarr;
          </button>
        </div>
      ) : (
        <>
          {/* ── Pure-Text Subject Navigation Tabs ── */}
          {activeSubjects.length > 1 && (
            <div
              className="gaps-subject-tabs"
              role="tablist"
              aria-label="Filter by subject"
            >
              {activeSubjects.map((sub) => {
                const count = gaps.filter((g) => g.subject_id === sub).length;
                const subName = getCanonicalSubjectName(sub);
                const isActive = activeSubject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gaps-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedSubject(sub)}
                  >
                    <span>{subName}</span>
                    <span className="gaps-tab-badge">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Single Primary Recommendation (Noise-Free) ── */}
          {priorityGap && (
            <section
              className="gaps-primary-card"
              aria-label={`Recommended next practice: ${formatTitle(priorityGap.topic_id)}`}
            >
              <div className="gaps-primary-info">
                <span className="gaps-primary-kicker">Recommended Next</span>
                <h2 className="gaps-primary-title">
                  {formatTitle(priorityGap.topic_id)}
                </h2>
                <div className="gaps-primary-meta">
                  {getCanonicalSubjectName(priorityGap.subject_id)}
                  {priorityGap.chapter_id && ` · ${formatTitle(priorityGap.chapter_id)}`}
                </div>
              </div>

              <button
                type="button"
                className="gaps-primary-btn"
                onClick={() => handlePractice(priorityGap)}
                aria-label={`Start practice for ${formatTitle(priorityGap.topic_id)}`}
              >
                <span>Practice Topic</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </section>
          )}

          {/* ── Professional Topic Queue (Clean Full-Screen Rows) ── */}
          <div className="gaps-queue-container">
            {chapters.map(([chapterKey, chapterGaps]) => {
              const isGeneral = !chapterKey || chapterKey === "general";
              const chapterTitle = isGeneral ? "Core Topics" : formatTitle(chapterKey);
              return (
                <section key={chapterKey} className="gaps-chapter-group">
                  <h3 className="gaps-chapter-title">{chapterTitle}</h3>

                  <div className="gaps-list">
                    {chapterGaps.map((gap) => (
                      <div
                        key={gap.id}
                        className="gaps-row"
                        onClick={() => handlePractice(gap)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handlePractice(gap);
                          }
                        }}
                        aria-label={`Practice ${formatTitle(gap.topic_id)}`}
                      >
                        <div className="gaps-row-main">
                          <div className="gaps-row-title">
                            {formatTitle(gap.topic_id)}
                          </div>
                          <div className="gaps-row-sub">
                            {getCanonicalSubjectName(gap.subject_id)}
                            {gap.chapter_id && ` · ${formatTitle(gap.chapter_id)}`}
                          </div>
                        </div>

                        <div className="gaps-row-actions">
                          <span
                            className={`gaps-row-status ${gap.resolved ? "resolved" : ""}`}
                          >
                            {gap.resolved ? "Mastered" : "Needs review"}
                          </span>

                          <button
                            type="button"
                            className="gaps-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePractice(gap);
                            }}
                            tabIndex={-1}
                          >
                            <span>Practice</span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
