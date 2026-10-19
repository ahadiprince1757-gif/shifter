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

/* ─────────────────────────────────────────────────────────────
   BESPOKE SVG GRAPHICS (NO EMOJIS)
───────────────────────────────────────────────────────────── */

function SubjectSvgIcon({ subjectId, size = 16, className = "" }) {
  const key = (subjectId || "").toLowerCase();

  if (key === "math" || key === "mathematics") {
    // Compass / Geometry icon
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="5" r="2" />
        <path d="m11 7-6 13" />
        <path d="m13 7 6 13" />
        <path d="M8.5 15h7" />
      </svg>
    );
  }

  if (key === "chemistry") {
    // Erlenmeyer Flask icon
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M9 3h6" />
        <path d="M10 3v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V3" />
        <path d="M7 16h10" />
        <circle cx="10" cy="13" r="0.75" fill="currentColor" />
        <circle cx="14" cy="14" r="0.75" fill="currentColor" />
      </svg>
    );
  }

  if (key === "physics") {
    // Atom / Orbital icon
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
      </svg>
    );
  }

  if (key === "biology") {
    // DNA Double Helix icon
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M2 15c6.667-6 13.333 0 20-6" />
        <path d="M2 9c6.667 6 13.333 0 20 6" />
        <path d="M5.5 10.5v3" />
        <path d="M8.5 8.5v7" />
        <path d="M12 9v6" />
        <path d="M15.5 8.5v7" />
        <path d="M18.5 10.5v3" />
      </svg>
    );
  }

  if (key === "english") {
    // Open Book icon
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    );
  }

  if (key === "computer" || key === "computer_studies") {
    // Terminal / Code screen icon
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="m7 9 3 2.5L7 14" />
        <line x1="12" y1="14" x2="16" y2="14" />
      </svg>
    );
  }

  // Fallback: Knowledge spark icon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
    </svg>
  );
}

function StatusBadge({ gap }) {
  if (gap.resolved) {
    return (
      <span className="mj-badge mj-badge--strong">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>STRONG</span>
      </span>
    );
  }
  if (gap.attempt_count > 1) {
    return (
      <span className="mj-badge mj-badge--repair">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>NEEDS REPAIR</span>
      </span>
    );
  }
  return (
    <span className="mj-badge mj-badge--verifying">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>VERIFYING</span>
    </span>
  );
}

function ChevronIcon({ expanded }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Gaps() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isOffline, setIsOffline] = useState(!networkService.isOnline);
  const [collapsedSubjects, setCollapsedSubjects] = useState({});
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

  // Filtered gaps (either 'all' or specific subject)
  const filteredGaps = useMemo(() => {
    if (filter === "all") return gaps;
    return gaps.filter((g) => g.subject_id === filter);
  }, [gaps, filter]);

  // Single Action Hero: Identify the single most critical gap needing immediate repair
  const priorityGap = useMemo(() => {
    if (!filteredGaps || filteredGaps.length === 0) return null;
    return [...filteredGaps].sort((a, b) => {
      // Prioritize unresolved with highest attempt counts
      const aScore = (!a.resolved ? 100 : 0) + (a.attempt_count || 1) * 15;
      const bScore = (!b.resolved ? 100 : 0) + (b.attempt_count || 1) * 15;
      if (bScore !== aScore) return bScore - aScore;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })[0];
  }, [filteredGaps]);

  // Group gaps by subject for structured, clutter-free reading
  const groupedGaps = useMemo(() => {
    const map = new Map();
    for (const sub of activeSubjects) {
      map.set(sub, []);
    }
    for (const gap of gaps) {
      const sub = gap.subject_id || "general";
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub).push(gap);
    }
    // Sort items inside each subject: Needs Repair first, then Verifying
    for (const [sub, list] of map.entries()) {
      list.sort((a, b) => {
        if (!a.resolved && b.resolved) return -1;
        if (a.resolved && !b.resolved) return 1;
        const aAttempts = a.attempt_count || 1;
        const bAttempts = b.attempt_count || 1;
        if (bAttempts !== aAttempts) return bAttempts - aAttempts;
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
    }
    return map;
  }, [gaps, activeSubjects]);

  const toggleSubjectCollapse = (subId) => {
    setCollapsedSubjects((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

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
              Targeted practice to seal verified learning gaps.
            </p>
          </div>
          {gaps.length > 0 && (
            <div className="mj-total-badge" aria-label={`${gaps.length} total gaps`}>
              <span className="mj-total-num">{gaps.length}</span>
              <span className="mj-total-label">Gaps</span>
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
          {/* ── ONE ACTION AT A SCREEN: Priority Focus Hero Card ── */}
          {priorityGap && (
            <section
              className="mj-hero-section"
              aria-label="Recommended immediate action"
            >
              <div className="mj-hero-card">
                <div className="mj-hero-top">
                  <div className="mj-hero-kicker">
                    <span className="mj-hero-beacon" aria-hidden="true" />
                    <span>PRIORITY REPAIR</span>
                  </div>
                  <div className="mj-hero-subject-pill">
                    <SubjectSvgIcon
                      subjectId={priorityGap.subject_id}
                      size={12}
                    />
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
                    <span>Practice Now</span>
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

          {/* ── Subject Filter Bar (Scrollable, Clean Vector Chips) ── */}
          {activeSubjects.length > 1 && (
            <div
              className="mj-filter-scroll"
              role="tablist"
              aria-label="Filter gaps by subject"
            >
              <button
                type="button"
                role="tab"
                aria-selected={filter === "all"}
                className={`mj-chip-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                <span>All</span>
                <span className="mj-chip-count">{gaps.length}</span>
              </button>

              {activeSubjects.map((sub) => {
                const count = gaps.filter((g) => g.subject_id === sub).length;
                const subName = getCanonicalSubjectName(sub);
                const isActive = filter === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`mj-chip-btn ${isActive ? "active" : ""}`}
                    onClick={() => setFilter(sub)}
                  >
                    <SubjectSvgIcon subjectId={sub} size={13} />
                    <span>{subName}</span>
                    <span className="mj-chip-count">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Sorted by Subjects List ── */}
          <div className="mj-subject-sections">
            {filter === "all" ? (
              // When "All" is active, group neatly by Subject
              activeSubjects.map((subId) => {
                const subGaps = groupedGaps.get(subId) || [];
                if (subGaps.length === 0) return null;
                const isCollapsed = Boolean(collapsedSubjects[subId]);
                const subName = getCanonicalSubjectName(subId);
                const needsRepairCount = subGaps.filter(
                  (g) => !g.resolved && (g.attempt_count || 1) > 1
                ).length;

                return (
                  <div key={subId} className="mj-subject-block">
                    <button
                      type="button"
                      className="mj-subject-header-btn"
                      onClick={() => toggleSubjectCollapse(subId)}
                      aria-expanded={!isCollapsed}
                    >
                      <div className="mj-subject-header-left">
                        <span className="mj-subject-icon-box">
                          <SubjectSvgIcon subjectId={subId} size={15} />
                        </span>
                        <span className="mj-subject-header-title">{subName}</span>
                        <span className="mj-subject-header-count">
                          {subGaps.length}
                        </span>
                        {needsRepairCount > 0 && (
                          <span className="mj-subject-repair-alert">
                            {needsRepairCount} need repair
                          </span>
                        )}
                      </div>
                      <ChevronIcon expanded={!isCollapsed} />
                    </button>

                    {!isCollapsed && (
                      <div className="mj-gap-cards-grid">
                        {subGaps.map((gap) => (
                          <GapCard
                            key={gap.id}
                            gap={gap}
                            subName={subName}
                            onPractice={handlePractice}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              // When a specific subject filter is active
              <div className="mj-subject-block">
                <div className="mj-gap-cards-grid">
                  {filteredGaps.map((gap) => (
                    <GapCard
                      key={gap.id}
                      gap={gap}
                      subName={getCanonicalSubjectName(gap.subject_id)}
                      onPractice={handlePractice}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

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
