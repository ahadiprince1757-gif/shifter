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
 * Full-screen, two-column layout with semantic brand identity:
 * - Edge-to-edge 2 columns spanning to the ends of the mobile screen.
 * - Solid Tixar blue (#287ce0) for navigational arrows and hover states.
 * - Structure through typography: Title, metadata, and clean dividers.
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
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
      }}
    >
      {/* Urgent Next Action Prompt (if active) */}
      <div style={{ padding: "8px 20px 0 20px" }}>
        <SmartPrompt action={nextAction} loading={nextActionLoading} />
      </div>

      {/* Resume bookmark prompt */}
      {!nextAction && showResume && (
        <div
          style={{
            margin: "0 20px 14px 20px",
            paddingBottom: "14px",
            borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
          }}
        >
          <div className="type-meta" style={{ marginBottom: "var(--space-1)", textTransform: "uppercase", color: "var(--tixar-blue-core, #287ce0)" }}>
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
              style={{ width: "auto", minWidth: "112px", minHeight: "38px", padding: "8px 16px", fontSize: "14px" }}
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
          padding: "4px 20px 10px 20px",
        }}
      >
        <span className="type-meta" style={{ textTransform: "uppercase", color: "var(--text-secondary)" }}>
          {displaySubjects.length} subjects
        </span>
      </div>

      {/* Spaced 2-Column Editorial Grid (Subject Name Only) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "12px 20px",
          padding: "0 20px 24px 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {displaySubjects.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSubjectClick(s.id, s.label)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
              borderLeft: "2px solid var(--tixar-blue-core, #287ce0)",
              padding: "18px 12px 18px 14px",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
              outline: "none",
              transition: "background 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-hover, #f0f7ff)";
              const arrow = e.currentTarget.querySelector(".subj-arrow");
              if (arrow) arrow.style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              const arrow = e.currentTarget.querySelector(".subj-arrow");
              if (arrow) arrow.style.transform = "translateX(0)";
            }}
            aria-label={s.label}
          >
            <span
              className="type-question"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                fontWeight: 600,
                color: "var(--text-primary)",
                minWidth: 0,
              }}
            >
              {s.label}
            </span>
            <span
              className="subj-arrow"
              style={{
                color: "var(--tixar-blue-core, #287ce0)",
                fontSize: "16px",
                fontWeight: 600,
                flexShrink: 0,
                transition: "transform 0.15s ease",
              }}
              aria-hidden="true"
            >
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SubjectGrid;
