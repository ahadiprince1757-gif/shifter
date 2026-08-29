import { useMemo } from "react";
import logger from "../utils/logger";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import SmartPrompt from "./SmartPrompt";
import { useNextAction } from "../hooks/useNextAction";

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

  // Compute the single most urgent next study action
  const { action: nextAction, loading: nextActionLoading } = useNextAction(userId);

  // localStorage is synchronous → derive lastTopic via useMemo
  const lastTopic = useMemo(() => {
    if (!userId) return null;
    try {
      const raw = localStorage.getItem(`lastTopic_${userId}`);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, [userId]);

  if (!curriculum) {
    return (
      <div id="v-subjects" className="view active" style={{ paddingTop: "0.5rem" }}>
        <div className="subj-grid-humanistic">
          <SkeletonLoader type="grid" count={6} />
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", { subjectId, subjectLabel: label });
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
        <span className="sg-subject-count">{curriculum.length} curated courses</span>
      </div>

      {/* Humanistic Subject Cards Grid */}
      <div className="subj-grid-humanistic">
        {curriculum.map((s, idx) => {
          const totalTopics = s.chapters.reduce((a, c) => a + c.topics.length, 0);
          const masteredCount = s.chapters.reduce(
            (a, c) => a + c.topics.filter((t) => mastered.has(`${s.id}|${c.id}|${t}`)).length,
            0
          );
          const pct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;
          const palette = HUMANISTIC_PALETTES[idx % HUMANISTIC_PALETTES.length];

          // SVG progress circle calculations
          const radius = 16;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (pct / 100) * circumference;

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
              aria-label={`${s.label}, ${masteredCount} of ${totalTopics} topics mastered`}
            >
              <div className="subj-notebook-spine" />
              <div className="subj-notebook-body">
                <div className="subj-notebook-header">
                  <span className="subj-notebook-tag">Course {idx + 1}</span>
                  <div className="subj-ring-container" title={`${pct}% complete`}>
                    <svg className="subj-ring-svg" viewBox="0 0 40 40" style={{ width: "100%", height: "100%" }}>
                      <circle
                        cx="20"
                        cy="20"
                        r={radius}
                        className="subj-ring-bg"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r={radius}
                        className="subj-ring-fill"
                        style={{
                          strokeDasharray: circumference,
                          strokeDashoffset: strokeDashoffset,
                          stroke: palette.accent,
                        }}
                      />
                    </svg>
                    <span className="subj-ring-pct">{pct}%</span>
                  </div>
                </div>

                <div className="subj-notebook-name">{s.label}</div>
                <div className="subj-notebook-chapters">
                  {s.chapters.length} chapters
                </div>

                <div className="subj-notebook-footer">
                  <span className="subj-notebook-progress-text">
                    {masteredCount === 0
                      ? "Not started yet"
                      : masteredCount === totalTopics
                      ? "All mastered"
                      : `${masteredCount} of ${totalTopics} topics done`}
                  </span>
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
