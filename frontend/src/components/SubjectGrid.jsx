import { useMemo } from "react";
import logger from "../utils/logger";
import { useAuth } from "../hooks/useAuth";
import SmartPrompt from "./SmartPrompt";
import { useNextAction } from "../hooks/useNextAction";
import { enroll } from "../api";
import staticCurriculum from "../data/curriculum.json";
import { ACTIVE_SUBJECT_IDS } from "../data/subjectRegistry";

// The canonical 6 subjects, immediately accessible without network or database delays
const CANONICAL_FALLBACK = Object.freeze(
  staticCurriculum.filter((s) => ACTIVE_SUBJECT_IDS.includes(s.id))
);

const HUMANISTIC_PALETTES = [
  { accent: "#74B8E8", bg: "rgba(116, 184, 232, 0.06)", border: "rgba(116, 184, 232, 0.28)" },
  { accent: "#5AAEE0", bg: "rgba(90, 174, 224, 0.06)",  border: "rgba(90, 174, 224, 0.28)" },
  { accent: "#8ECBF0", bg: "rgba(142, 203, 240, 0.06)", border: "rgba(142, 203, 240, 0.28)" },
  { accent: "#4A9FD4", bg: "rgba(74, 159, 212, 0.06)",  border: "rgba(74, 159, 212, 0.28)" },
  { accent: "#9ED4F5", bg: "rgba(158, 212, 245, 0.06)", border: "rgba(158, 212, 245, 0.28)" },
  { accent: "#60B4E8", bg: "rgba(96, 180, 232, 0.06)",  border: "rgba(96, 180, 232, 0.28)" },
];

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

function SubjectGrid({ curriculum, openSubject, mastered, onResume }) {
  const { session } = useAuth();
  const userId = session?.user?.id || null;

  // Always drop the 6 canonical subjects immediately — zero loading state, zero blank screen
  const displaySubjects = useMemo(() => {
    if (Array.isArray(curriculum) && curriculum.length > 0) {
      const canonical = curriculum.filter((s) => ACTIVE_SUBJECT_IDS.includes(s.id));
      if (canonical.length > 0) return canonical;
    }
    return CANONICAL_FALLBACK;
  }, [curriculum]);

  // Compute the single most urgent next study action
  const { action: nextAction, loading: nextActionLoading } = useNextAction(userId);

  // localStorage is synchronous — derive lastTopic via useMemo
  const lastTopic = useMemo(() => {
    if (!userId) return null;
    try {
      const raw = localStorage.getItem(`lastTopic_${userId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, [userId]);

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", { subjectId, subjectLabel: label });
    // Silently enroll user in the subject on first visit (fire-and-forget)
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
      {/* Smart Prompt — single next-action card, hidden when nothing is urgent */}
      <SmartPrompt action={nextAction} loading={nextActionLoading} />

      {/* Fallback Bookmark Continue Card (only rendered if SmartPrompt is inactive) */}
      {!nextAction && showResume && (
        <div className="resume-card-humanistic">
          <div className="resume-card-content">
            <div className="resume-card-kicker">Pick up where you left off</div>
            <h2 className="resume-card-topic-title">
              {formatTitle(lastTopic.topic)}
            </h2>
            <div className="resume-card-location">
              {formatTitle(lastTopic.subjectLabel || lastTopic.subjectId)} · {formatTitle(lastTopic.chapterLabel || lastTopic.chapterId)}
            </div>
          </div>
          <button
            type="button"
            className="resume-card-action-btn"
            onClick={() => onResume(lastTopic.subjectId, lastTopic.chapterId, lastTopic.topic)}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Subject Section Header */}
      <div className="sg-section-title">
        <span>Your Subjects</span>
        <span className="sg-subject-count">{displaySubjects.length} curated courses</span>
      </div>

      {/* Humanistic Subject Cards Grid */}
      <div className="subj-grid-humanistic">
        {displaySubjects.map((s, idx) => {
          const chapters = s.chapters || [];
          const totalTopics = chapters.reduce((a, c) => a + (c && Array.isArray(c.topics) ? c.topics.length : 0), 0);
          const palette = HUMANISTIC_PALETTES[idx % HUMANISTIC_PALETTES.length];

          return (
            <button
              className="subj-notebook-card"
              key={s.id}
              onClick={() => handleSubjectClick(s.id, s.label)}
              style={{
                "--card-accent": palette.accent,
                "--card-bg-tint": palette.bg,
                "--card-border-tint": palette.border,
              }}
              aria-label={`${s.label}, ${chapters.length} chapters, ${totalTopics} topics`}
            >
              <div className="subj-notebook-spine" />
              <div className="subj-notebook-body">
                <div className="subj-notebook-header">
                  <div className="subj-notebook-info">
                    <div className="subj-notebook-name">{s.label}</div>
                    <div className="subj-notebook-chapters">
                      {chapters.length} chapter{chapters.length !== 1 ? "s" : ""} · {totalTopics} topic{totalTopics !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="subj-enter-arrow" aria-hidden="true" style={{ color: palette.accent, fontSize: "1.25rem", fontWeight: 700 }}>
                    →
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectGrid;

