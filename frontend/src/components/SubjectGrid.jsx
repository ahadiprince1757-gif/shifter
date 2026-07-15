import logger from "../utils/logger";
import SkeletonLoader from "./SkeletonLoader";

// Distinct accent colours per subject index — cycles if more subjects added
const SUBJECT_ACCENTS = [
  { from: "#7552f3", to: "#a78bfa" }, // purple
  { from: "#06b6d4", to: "#67e8f9" }, // cyan
  { from: "#10b981", to: "#6ee7b7" }, // emerald
  { from: "#f59e0b", to: "#fcd34d" }, // amber
  { from: "#ef4444", to: "#fca5a5" }, // red
  { from: "#ec4899", to: "#f9a8d4" }, // pink
  { from: "#3b82f6", to: "#93c5fd" }, // blue
  { from: "#8b5cf6", to: "#c4b5fd" }, // violet
];

function SubjectGrid({ curriculum, openSubject, mastered }) {
  if (!curriculum) {
    return (
      <div id="v-subjects" className="view active">
        <div className="sg-header">
          <div className="sg-header-text">
            <h1 className="sg-title">What would you like to study?</h1>
            <p className="sg-sub">Pick a subject to begin or continue your journey</p>
          </div>
        </div>
        <div className="subj-grid">
          <SkeletonLoader type="grid" count={6} />
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", { subjectId, subjectLabel: label });
    openSubject(subjectId);
  };

  const totalMastered = curriculum.reduce((total, s) =>
    total + s.chapters.reduce((a, c) =>
      a + c.topics.filter((t) => mastered.has(`${s.id}|${c.id}|${t}`)).length, 0
    ), 0
  );

  const totalTopicsAll = curriculum.reduce((total, s) =>
    total + s.chapters.reduce((a, c) => a + c.topics.length, 0), 0
  );

  const overallProg = totalTopicsAll > 0
    ? Math.round((totalMastered / totalTopicsAll) * 100)
    : 0;

  return (
    <div id="v-subjects" className="view active">
      <div className="sg-header">
        <div className="sg-header-text">
          <h1 className="sg-title">What would you like to study?</h1>
          <p className="sg-sub">Pick a subject to begin or continue your journey</p>
        </div>
        {overallProg > 0 && (
          <div className="sg-overall-prog">
            <div className="sg-overall-label">Overall progress</div>
            <div className="sg-overall-ring">
              <svg viewBox="0 0 44 44" className="sg-ring-svg">
                <circle cx="22" cy="22" r="18" className="sg-ring-bg" />
                <circle
                  cx="22" cy="22" r="18"
                  className="sg-ring-fill"
                  strokeDasharray={`${(overallProg / 100) * 113.1} 113.1`}
                />
              </svg>
              <span className="sg-ring-pct">{overallProg}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="subj-grid">
        {curriculum.map((s, idx) => {
          const totalTopics = s.chapters.reduce((a, c) => a + c.topics.length, 0);
          const masteredCount = s.chapters.reduce(
            (a, c) => a + c.topics.filter((t) => mastered.has(`${s.id}|${c.id}|${t}`)).length,
            0
          );
          const prog = totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0;
          const accent = SUBJECT_ACCENTS[idx % SUBJECT_ACCENTS.length];
          const isStarted = masteredCount > 0;
          const isComplete = prog >= 100;

          return (
            <div
              className={`subj-card${isComplete ? " subj-complete" : ""}`}
              key={s.id}
              onClick={() => handleSubjectClick(s.id, s.label)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleSubjectClick(s.id, s.label)}
              aria-label={`${s.label}, ${Math.round(prog)}% complete`}
              style={{ "--accent-from": accent.from, "--accent-to": accent.to }}
            >
              {/* Accent top bar */}
              <div className="subj-accent-bar" />

              {/* Top row: icon + status badge */}
              <div className="subj-top-row">
                <div className="subj-icon">{s.icon}</div>
                {isComplete ? (
                  <span className="subj-badge subj-badge-done">✓ Done</span>
                ) : isStarted ? (
                  <span className="subj-badge subj-badge-cont">Continue</span>
                ) : null}
              </div>

              {/* Subject name */}
              <div className="subj-name">{s.label}</div>

              {/* Meta: chapters & topics */}
              <div className="subj-meta">
                <span>{s.chapters.length} chapters</span>
                <span className="subj-meta-dot">·</span>
                <span>{totalTopics} topics</span>
              </div>

              {/* Progress bar + count */}
              <div className="subj-prog-wrap">
                <div className="subj-prog">
                  <div className="subj-prog-fill" style={{ width: `${prog}%` }} />
                </div>
                <span className="subj-prog-label">{masteredCount}/{totalTopics}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectGrid;

