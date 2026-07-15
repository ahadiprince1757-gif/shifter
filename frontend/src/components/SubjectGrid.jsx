import logger from "../utils/logger";
import SkeletonLoader from "./SkeletonLoader";

function SubjectGrid({ curriculum, openSubject, mastered }) {
  if (!curriculum) {
    return (
      <div id="v-subjects" className="view active">
        <div className="sg-header">
          <h1 className="sg-title">Subjects</h1>
        </div>
        <div className="subj-list">
          <SkeletonLoader type="grid" count={6} />
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subjectId, label) => {
    logger.action("SUBJECT_SELECTED", "success", { subjectId, subjectLabel: label });
    openSubject(subjectId);
  };

  return (
    <div id="v-subjects" className="view active">
      <div className="sg-header">
        <h1 className="sg-title">Subjects</h1>
      </div>

      <div className="subj-list">
        {curriculum.map((s) => {
          const totalTopics = s.chapters.reduce((a, c) => a + c.topics.length, 0);
          const masteredCount = s.chapters.reduce(
            (a, c) => a + c.topics.filter((t) => mastered.has(`${s.id}|${c.id}|${t}`)).length,
            0
          );
          const prog = totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0;

          return (
            <button
              className="subj-row"
              key={s.id}
              onClick={() => handleSubjectClick(s.id, s.label)}
              aria-label={`${s.label}, ${Math.round(prog)}% complete`}
            >
              <span className="subj-row-icon">{s.icon}</span>
              <div className="subj-row-body">
                <div className="subj-row-name">{s.label}</div>
                <div className="subj-row-prog">
                  <div className="subj-row-bar">
                    <div className="subj-row-fill" style={{ width: `${prog}%` }} />
                  </div>
                  <span className="subj-row-pct">{Math.round(prog)}%</span>
                </div>
              </div>
              <svg className="subj-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SubjectGrid;


