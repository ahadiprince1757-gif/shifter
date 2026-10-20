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


function StatusBadge({ gap }) {
  if (gap.resolved) {
    return (
      <span className="mj-badge mj-badge--strong">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>MASTERED</span>
      </span>
    );
  }
  if (gap.attempt_count > 1) {
    return (
      <span className="mj-badge mj-badge--practice">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
        <span>TO PRACTICE</span>
      </span>
    );
  }
  return (
    <span className="mj-badge mj-badge--verifying">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <span>VERIFYING</span>
    </span>
  );
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

  // Next subject for quick transition
  const nextSubject = useMemo(() => {
    if (!activeSubject || activeSubjects.length <= 1) return null;
    const currentIdx = activeSubjects.indexOf(activeSubject);
    const nextIdx = (currentIdx + 1) % activeSubjects.length;
    return activeSubjects[nextIdx];
  }, [activeSubject, activeSubjects]);

  // Recommended focus gap for this subject (calm priority, no red)
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
    <div className="mj-container" id="v-gaps">
      {/* ── Compact Header ── */}
      <header className="mj-header-compact">
        <div className="mj-header-row">
          <div className="mj-title-group">
            <h1 className="mj-main-title">Knowledge Gaps</h1>
            <p className="mj-subtitle-compact">
              Organized by subject for targeted mastery.
            </p>
          </div>
          {activeSubject && currentSubjectGaps.length > 0 && (
            <div className="mj-total-badge" aria-label={`${currentSubjectGaps.length} gaps in ${getCanonicalSubjectName(activeSubject)}`}>
              <span className="mj-total-num">{currentSubjectGaps.length}</span>
              <span className="mj-total-label">{getCanonicalSubjectName(activeSubject)}</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Offline Banner (SVG vector, no emojis) ── */}
      {isOffline && (
        <div className="mj-offline-banner" role="status" aria-live="polite">
          <svg
            className="mj-offline-svg"
            width="15"
            height="15"
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
          <span>Offline mode &mdash; showing locally saved gaps.</span>
        </div>
      )}

      {loading ? (
        <div style={{ marginTop: "1rem" }}>
          <SkeletonLoader type="list" count={3} />
        </div>
      ) : gaps.length === 0 ? (
        /* ── Modern Empty State (Zero Emojis) ── */
        <div className="mj-empty-state">
          <div className="mj-empty-art" aria-hidden="true">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--gr, #10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <h2 className="mj-empty-heading">All Clear &mdash; No Unresolved Gaps</h2>
          <p className="mj-empty-desc">
            You have repaired all diagnosed weaknesses. Continue exploring your subjects to keep your mastery active.
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
          {/* ── Subject Switcher Bar (Purely Subjects, Zero 'All' Button) ── */}
          {activeSubjects.length > 1 && (
            <div
              className="mj-filter-scroll"
              role="tablist"
              aria-label="Select subject"
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
                    className={`mj-chip-btn ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedSubject(sub)}
                  >
                    <span>{subName}</span>
                    <span className="mj-chip-count">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Active Subject Header Banner ── */}
          {activeSubject && (
            <div className="mj-subject-hero-banner">
              <div className="mj-subject-hero-left">
                <div>
                  <h2 className="mj-subject-hero-title">
                    {getCanonicalSubjectName(activeSubject)}
                  </h2>
                  <p className="mj-subject-hero-sub">
                    {currentSubjectGaps.length === 1
                      ? "1 topic identified for targeted practice"
                      : `${currentSubjectGaps.length} topics identified for targeted practice`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Calm Focus Topic Card for Active Subject (Zero Red) ── */}
          {priorityGap && (
            <section
              className="mj-hero-section"
              aria-label={`Recommended next topic for ${getCanonicalSubjectName(activeSubject)}`}
            >
              <div className="mj-hero-card">
                <div className="mj-hero-top">
                  <div className="mj-hero-kicker">
                    <span className="mj-hero-beacon-calm" aria-hidden="true" />
                    <span>FOCUS TOPIC</span>
                  </div>
                  <div className="mj-hero-subject-pill">
                    <span>{getCanonicalSubjectName(priorityGap.subject_id)}</span>
                  </div>
                </div>

                <div className="mj-hero-content">
                  <h2 className="mj-hero-title">
                    {formatTitle(priorityGap.topic_id)}
                  </h2>
                  {priorityGap.chapter_id && (
                    <div className="mj-hero-chapter">
                      {formatTitle(priorityGap.chapter_id)}
                    </div>
                  )}

                  {priorityGap.question_text && (
                    <div className="mj-hero-snippet">
                      <span className="mj-snippet-quote">&ldquo;</span>
                      {priorityGap.question_text}
                      <span className="mj-snippet-quote">&rdquo;</span>
                    </div>
                  )}
                </div>

                <div className="mj-hero-bottom">
                  <div className="mj-hero-meta">
                    <StatusBadge gap={priorityGap} />
                    {priorityGap.attempt_count > 1 && (
                      <span className="mj-hero-attempts">
                        {priorityGap.attempt_count} attempts
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mj-hero-action-btn"
                    onClick={() => handlePractice(priorityGap)}
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
                </div>
              </div>
            </section>
          )}

          {/* ── Chapters Container: Topics Organized per Chapter ── */}
          <div className="mj-chapters-container">
            {chapters.map(([chapterKey, chapterGaps]) => {
              const isGeneral = !chapterKey || chapterKey === "general";
              const chapterTitle = isGeneral ? "Core Topics" : formatTitle(chapterKey);
              return (
                <section key={chapterKey} className="mj-chapter-section">
                  <div className="mj-chapter-header">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mj-chapter-icon"
                      aria-hidden="true"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <h3 className="mj-chapter-title">{chapterTitle}</h3>
                    <span className="mj-chapter-count">
                      {chapterGaps.length} {chapterGaps.length === 1 ? "topic" : "topics"}
                    </span>
                  </div>
                  <div className="mj-gap-cards-grid">
                    {chapterGaps.map((gap) => (
                      <GapCard
                        key={gap.id}
                        gap={gap}
                        subName={getCanonicalSubjectName(gap.subject_id)}
                        onPractice={handlePractice}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* ── Smooth Navigation to Next Subject ── */}
          {nextSubject && (
            <div className="mj-next-subject-card">
              <div className="mj-next-subject-info">
                <span className="mj-next-subject-label">Other Subjects</span>
                <span className="mj-next-subject-name">
                  {getCanonicalSubjectName(nextSubject)} ({gaps.filter((g) => g.subject_id === nextSubject).length})
                </span>
              </div>
              <button
                type="button"
                className="mj-next-subject-btn"
                onClick={() => setSelectedSubject(nextSubject)}
              >
                <span>Switch to {getCanonicalSubjectName(nextSubject)}</span>
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
          )}

          <p className="mj-footer-note">
            Gaps resolve automatically as you verify concepts in targeted practice.
          </p>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPACT GAP CARD (Smaller font, no glued text, refined buttons)
───────────────────────────────────────────────────────────── */

function GapCard({ gap, subName, onPractice }) {
  return (
    <article className="mj-card" aria-label={gap.topic_id || "Gap item"}>
      <div className="mj-card-header">
        <div className="mj-card-titles">
          <h3 className="mj-card-topic">{formatTitle(gap.topic_id)}</h3>
          <div className="mj-card-breadcrumb">
            <span className="mj-card-subname">{subName}</span>
            {gap.chapter_id && (
              <>
                <span className="mj-dot" aria-hidden="true">&bull;</span>
                <span className="mj-card-chapname">{formatTitle(gap.chapter_id)}</span>
              </>
            )}
          </div>
        </div>
        <div className="mj-card-badge-wrap">
          <StatusBadge gap={gap} />
        </div>
      </div>

      {gap.question_text && (
        <div className="mj-card-question-box">
          <p className="mj-card-question-text">{gap.question_text}</p>
        </div>
      )}

      <div className="mj-card-footer">
        <div className="mj-card-footer-info">
          {gap.correct_answer && (
            <div className="mj-card-target">
              <span className="mj-target-label">Standard:</span>
              <span className="mj-target-val">{gap.correct_answer}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className="mj-card-practice-btn"
          onClick={() => onPractice(gap)}
          aria-label={`Practice gap in ${formatTitle(gap.topic_id)}`}
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
    </article>
  );
}
