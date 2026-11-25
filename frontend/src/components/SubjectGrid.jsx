import { useMemo } from "react";
import logger from "../utils/logger";
import { useAuth } from "../hooks/useAuth";
import SmartPrompt from "./SmartPrompt";
import { useNextAction } from "../hooks/useNextAction";
import { enroll } from "../api";
import staticCurriculum from "../data/curriculum.json";
import { ACTIVE_SUBJECT_IDS } from "../data/subjectRegistry";

// Canonical 6 subjects
const CANONICAL_FALLBACK = Object.freeze(
  staticCurriculum.filter((s) => ACTIVE_SUBJECT_IDS.includes(s.id))
);

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

/**
 * SubjectGrid
 *
 * Full-screen, two-column layout conforming to Global Layout Rules:
 * - Full-width surface: uses the entire screen width with comfortable horizontal padding.
 * - 2 columns: exactly 2 columns across the screen (with 1 column on narrow mobile if needed).
 * - Structure through typography: Title, metadata, and clean row dividers.
 * - No card soup, no thick borders, no floating drop shadows.
 */
function SubjectGrid({ curriculum, openSubject, mastered, onResume }) {
  const { session } = useAuth();
  const userId = session?.user?.id || null;

  const displaySubjects = useMemo(() => {
    if (Array.isArray(curriculum) && curriculum.length > 0) {
      const canonical = curriculum.filter((s) => ACTIVE_SUBJECT_IDS.includes(s.id));
      if (canonical.length > 0) return canonical;
    }
    return CANONICAL_FALLBACK;
  }, [curriculum]);

  const { action: nextAction, loading: nextActionLoading } = useNextAction(userId);

  const lastTopic = useMemo(() => {
    if (!userId) return null;
    try {
      const raw = localStorage.getItem(`lastTopic_${userId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, [userId]);

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", { subjectId, subjectLabel: label });
    if (userId) enroll(subjectId).catch(() => {});
    openSubject(subjectId);
  };

  const showResume = Boolean(
    lastTopic &&
    lastTopic.subjectId &&
    lastTopic.chapterId &&
    lastTopic.topic &&
    onResume
  );

  return (
    <div
      id="v-subjects"
      className="view active"
      style={{
        width: "100%",
        maxWidth: "100%",
        padding: "clamp(1rem, 3vw, 2.5rem)",
        boxSizing: "border-box",
      }}
    >
      {/* Urgent Next Action Prompt (if active) */}
      <SmartPrompt action={nextAction} loading={nextActionLoading} />

      {/* Resume bookmark prompt */}
      {!nextAction && showResume && (
        <div
          style={{
            marginBottom: "var(--space-6)",
            paddingBottom: "var(--space-4)",
            borderBottom: "1px solid var(--border-subtle, #e5e5e5)",
          }}
        >
          <div className="type-meta" style={{ marginBottom: "var(--space-1)", textTransform: "uppercase" }}>
            Pick up where you left off
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
            <div>
              <h2 className="type-question" style={{ margin: "0 0 4px 0" }}>
                {formatTitle(lastTopic.topic)}
              </h2>
              <div className="type-supporting">
                {formatTitle(lastTopic.subjectLabel || lastTopic.subjectId)} · {formatTitle(lastTopic.chapterLabel || lastTopic.chapterId)}
              </div>
            </div>
            <button
              type="button"
              className="primary-action-btn"
              style={{ width: "auto", minWidth: "120px", padding: "8px 16px" }}
              onClick={() => onResume(lastTopic.subjectId, lastTopic.chapterId, lastTopic.topic)}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Main Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "var(--space-5)",
        }}
      >
        <h1 className="type-page-heading" style={{ fontSize: "26px" }}>
          Your Subjects
        </h1>
        <span className="type-meta">
          {displaySubjects.length} subjects
        </span>
      </div>

      {/* 2-Column Full-Screen Grid with clean 1px borders */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1px",
          background: "var(--border-subtle, #e5e5e5)",
          border: "1px solid var(--border-subtle, #e5e5e5)",
          borderRadius: "var(--radius-control, 8px)",
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {displaySubjects.map((s) => {
          const chapters = s.chapters || [];
          const totalTopics = chapters.reduce((a, c) => a + (c && Array.isArray(c.topics) ? c.topics.length : 0), 0);

          return (
            <button
              key={s.id}
              onClick={() => handleSubjectClick(s.id, s.label)}
              style={{
                background: "var(--surface)",
                border: "none",
                padding: "clamp(18px, 2.5vw, 28px)",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                outline: "none",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-subtle, #f7f7f7)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
              aria-label={`${s.label}, ${chapters.length} chapters, ${totalTopics} topics`}
            >
              <div>
                <div
                  className="type-question"
                  style={{ fontSize: "clamp(17px, 1.4vw, 20px)", fontWeight: 600, color: "var(--text-primary)" }}
                >
                  {s.label}
                </div>
                <div
                  className="type-supporting"
                  style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "14px" }}
                >
                  {chapters.length} chapters · {totalTopics} topics
                </div>
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "18px",
                  marginLeft: "16px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectGrid;
