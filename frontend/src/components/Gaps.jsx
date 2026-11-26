import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mistakeRepo } from "../repository/mistakeRepo";
import SkeletonLoader from "./SkeletonLoader";
import ReadingContainer from "./layout/ReadingContainer";
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

  // Gaps for the active subject (sanitized: drop blank topics & deduplicate by topic)
  const currentSubjectGaps = useMemo(() => {
    if (!activeSubject) return [];
    const seen = new Set();
    const filtered = [];
    for (const g of gaps) {
      if (g.subject_id !== activeSubject) continue;
      const title = formatTitle(g.topic_id || g.topic_title);
      if (!title) continue;
      const key = title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      filtered.push(g);
    }
    return filtered;
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

  const remainingGaps = useMemo(() => {
    if (!priorityGap) return currentSubjectGaps;
    return currentSubjectGaps.filter((g) => g.id !== priorityGap.id);
  }, [currentSubjectGaps, priorityGap]);

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
    <div id="v-gaps" className="view active" style={{ paddingTop: "0.5rem" }}>
      <ReadingContainer>
        {/* ── Header (Continuous Document Surface) ── */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h1 className="type-page-heading" style={{ fontSize: "26px", marginBottom: "6px" }}>
            Knowledge Gaps
          </h1>
          <div className="type-supporting" style={{ color: "var(--text-secondary)" }}>
            {activeSubject && currentSubjectGaps.length > 0
              ? `${currentSubjectGaps.length} topic${currentSubjectGaps.length === 1 ? "" : "s"} identified for targeted practice in ${getCanonicalSubjectName(activeSubject)}.`
              : "Review and strengthen topics identified from your previous quizzes."}
          </div>
        </div>

        {/* ── Quiet Offline Indicator ── */}
        {isOffline && (
          <div
            role="status"
            aria-live="polite"
            style={{
              marginBottom: "var(--space-4)",
              paddingLeft: "12px",
              borderLeft: "2px solid var(--text-muted, #94a3b8)",
              color: "var(--text-secondary)",
              fontSize: "13.5px",
            }}
          >
            Offline mode &mdash; displaying locally stored gaps.
          </div>
        )}

        {loading ? (
          <div style={{ marginTop: "1.5rem" }}>
            <SkeletonLoader type="list" count={4} />
          </div>
        ) : gaps.length === 0 ? (
          /* ── Clean Document Empty State ── */
          <div style={{ paddingTop: "var(--space-4)" }}>
            <div
              className="type-meta"
              style={{
                color: "var(--state-success, #15803d)",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              Verified Mastery ✓
            </div>
            <h2 className="type-question" style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
              All Clear &mdash; No Unresolved Gaps
            </h2>
            <p className="type-body" style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}>
              You have mastered all tested concepts across your subjects. Explore new topics to keep learning.
            </p>
            <button
              type="button"
              className="primary-action-btn"
              onClick={() => navigate("/subjects")}
            >
              Explore Subjects →
            </button>
          </div>
        ) : (
          <>
            {/* ── Underline Subject Navigation Tabs (No Pill Soup) ── */}
            {activeSubjects.length > 1 && (
              <div
                role="tablist"
                aria-label="Filter by subject"
                style={{
                  display: "flex",
                  gap: "24px",
                  overflowX: "auto",
                  borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
                  marginBottom: "var(--space-6)",
                  scrollbarWidth: "none",
                }}
              >
                {activeSubjects.map((sub) => {
                  const uniqueTopics = new Set(
                    gaps
                      .filter((g) => g.subject_id === sub)
                      .map((g) => formatTitle(g.topic_id || g.topic_title).toLowerCase())
                      .filter(Boolean)
                  );
                  const count = uniqueTopics.size;
                  if (count === 0) return null;
                  const subName = getCanonicalSubjectName(sub);
                  const isActive = activeSubject === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedSubject(sub)}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: isActive
                          ? "2px solid var(--tixar-blue-core, #287ce0)"
                          : "2px solid transparent",
                        padding: "10px 0",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive
                          ? "var(--tixar-blue-core, #287ce0)"
                          : "var(--text-secondary)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "-1px",
                        transition: "color 0.15s ease",
                      }}
                    >
                      <span>{subName}</span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: isActive
                            ? "var(--tixar-blue-core, #287ce0)"
                            : "var(--text-muted, #94a3b8)",
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Single Primary Recommendation (Left Accent, Compact Inline Action) ── */}
            {priorityGap && (
              <section
                aria-label={`Recommended next practice: ${formatTitle(priorityGap.topic_id || priorityGap.topic_title)}`}
                style={{
                  borderLeft: "2px solid var(--tixar-blue-core, #287ce0)",
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  marginBottom: "var(--space-6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    className="type-meta"
                    style={{
                      color: "var(--tixar-blue-core, #287ce0)",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Recommended Next
                  </div>
                  <h2
                    className="type-question"
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: priorityGap.chapter_id ? "3px" : "0",
                    }}
                  >
                    {formatTitle(priorityGap.topic_id || priorityGap.topic_title)}
                  </h2>
                  {priorityGap.chapter_id && (
                    <div
                      className="type-supporting"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formatTitle(priorityGap.chapter_id)}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="primary-action-btn"
                  onClick={() => handlePractice(priorityGap)}
                  aria-label={`Start practice for ${formatTitle(priorityGap.topic_id || priorityGap.topic_title)}`}
                  style={{
                    width: "auto",
                    minHeight: "38px",
                    padding: "8px 18px",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  Practice →
                </button>
              </section>
            )}

            {/* ── Remaining Gaps List (Editorial Hairline Rows, Zero Card Soup) ── */}
            {remainingGaps.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className="type-meta"
                  style={{
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    paddingBottom: "8px",
                    borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
                  }}
                >
                  More Topics to Repair
                </div>
                {remainingGaps.map((gap, idx) => {
                  const title = formatTitle(gap.topic_id || gap.topic_title);
                  const chapterLabel = gap.chapter_id ? formatTitle(gap.chapter_id) : "";
                  return (
                    <div
                      key={gap.id}
                      onClick={() => handlePractice(gap)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handlePractice(gap);
                        }
                      }}
                      aria-label={`Practice ${title}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 0",
                        borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.paddingLeft = "6px";
                        e.currentTarget.style.paddingRight = "6px";
                        e.currentTarget.style.background = "var(--surface-hover, #f0f7ff)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.paddingLeft = "0";
                        e.currentTarget.style.paddingRight = "0";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div>
                        <div
                          className="type-meta"
                          style={{
                            marginBottom: "3px",
                            textTransform: "uppercase",
                            color: "var(--tixar-blue-core, #287ce0)",
                          }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div
                          className="type-question"
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {title}
                        </div>
                        {chapterLabel && (
                          <div
                            className="type-supporting"
                            style={{ marginTop: "3px", color: "var(--text-secondary)" }}
                          >
                            {chapterLabel}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          color: "var(--tixar-blue-core, #287ce0)",
                          fontSize: "16px",
                          fontWeight: 600,
                          marginLeft: "16px",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        →
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </ReadingContainer>
    </div>
  );
}
