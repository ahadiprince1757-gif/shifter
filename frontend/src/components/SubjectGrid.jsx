import logger from "../utils/logger";
import SkeletonLoader from "./SkeletonLoader";

function SubjectGrid({ curriculum, openSubject, mastered }) {
  if (!curriculum) {
    return (
      <div id="v-subjects" className="view active">
        <div className="vhd">
          <div className="vtitle">Choose a Subject</div>
          <div className="vsub">Select what you want to study today</div>
        </div>
        <div className="subj-grid">
          <SkeletonLoader type="grid" count={6} />
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", {
      subjectId,
      subjectLabel: label,
    });
    openSubject(subjectId);
  };

  return (
    <div id="v-subjects" className="view active">
      <div className="vhd">
        <div className="vtitle">Choose a Subject</div>
        <div className="vsub">Select what you want to study today</div>
      </div>
      <div className="subj-grid">
        {curriculum.map((s) => {
          const totalTopics = s.chapters.reduce(
            (a, c) => a + c.topics.length,
            0,
          );
          const masteredCount = s.chapters.reduce(
            (a, c) =>
              a +
              c.topics.filter((t) => mastered.has(`${s.id}|${c.id}|${t}`))
                .length,
            0,
          );
          const prog =
            totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0;

          return (
            <div
              className="subj-card"
              key={s.id}
              onClick={() => handleSubjectClick(s.id, s.label)}
            >
              <div className="subj-icon">{s.icon}</div>
              <div className="subj-name">
                {s.label}
                <svg className="subj-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginLeft: "auto", opacity: 0.5, transition: "transform 0.2s, opacity 0.2s" }}>
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </div>
              <div className="subj-meta">
                {s.chapters.length} chapters · {totalTopics} topics
              </div>
              <div className="subj-prog-wrap">
                <div className="subj-prog">
                  <div
                    className="subj-prog-fill"
                    style={{ width: `${prog}%` }}
                  ></div>
                </div>
                <span className="subj-prog-label">{Math.round(prog)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectGrid;
