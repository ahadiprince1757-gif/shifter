import { useMemo } from "react";
import logger from "../utils/logger";
import { useAuth } from "../hooks/useAuth";
import SmartPrompt from "./SmartPrompt";
import { useNextAction } from "../hooks/useNextAction";
import { enroll } from "../api";
import staticCurriculum from "../data/curriculum.json";
import { ACTIVE_SUBJECT_IDS } from "../data/subjectRegistry";
import ReadingContainer from "./layout/ReadingContainer";
import ContentSection from "./content/ContentSection";

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
 * Implements the Tixar Global Layout Rules:
 * - Content belongs to the page; no artificial floating containers.
 * - Structure through typography: Title, metadata, and clean list/grid items.
 * - Purposeful whitespace over heavy borders, drop-shadows, and decorative card spines.
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
    <div id="v-subjects" className="view active" style={{ paddingTop: "0.5rem" }}>
      <ReadingContainer>
        {/* Urgent Next Action Prompt (if active) */}
        <SmartPrompt action={nextAction} loading={nextActionLoading} />

        {/* Resume bookmark prompt */}
        {!nextAction && showResume && (
          <div style={{ marginBottom: "var(--space-6)", paddingBottom: "var(--space-4)", borderBottom: "1px solid var(--border-subtle, #e5e5e5)" }}>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-5)" }}>
          <h1 className="type-page-heading" style={{ fontSize: "24px" }}>
            Your Subjects
          </h1>
          <span className="type-meta">
            {displaySubjects.length} subjects
          </span>
        </div>

        {/* Subjects List: Typography, clean 2-column or 1-column layout, zero card soup */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--border-subtle, #e5e5e5)",
            border: "1px solid var(--border-subtle, #e5e5e5)",
            borderRadius: "var(--radius-control, 8px)",
            overflow: "hidden",
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
                  padding: "20px 24px",
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
                  <div className="type-question" style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {s.label}
                  </div>
                  <div className="type-supporting" style={{ marginTop: "4px", color: "var(--text-secondary)" }}>
                    {chapters.length} chapters · {totalTopics} topics
                  </div>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "16px", marginLeft: "12px" }} aria-hidden="true">
                  →
                </div>
              </button>
            );
          })}
        </div>
      </ReadingContainer>
    </div>
  );
}

export default SubjectGrid;
