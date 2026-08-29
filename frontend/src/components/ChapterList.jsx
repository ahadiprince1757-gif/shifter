function ChapterList({ subject, openChapter, goBack }) {
  if (!subject) return null;

  return (
    <div id="v-chapters" className="view active">
      <div className="vhd-humanistic">
        <button className="vback-humanistic" onClick={goBack}>
          ← All Subjects
        </button>
        <div className="vtitle-humanistic">{subject.label}</div>
        <div className="vsub-humanistic">
          {subject.chapters.length} chapter{subject.chapters.length !== 1 ? "s" : ""} · Select a chapter to start learning
        </div>
      </div>

      <div className="chap-list-humanistic">
        {subject.chapters.map((c, idx) => {
          const estMinutes = Math.max(5, c.topics.length * 4);
          return (
            <div
              className="chap-card-humanistic"
              key={c.id}
              onClick={() => openChapter(c.id)}
            >
              <div className="chap-card-content">
                <div className="chap-badge-number">Chapter {idx + 1}</div>
                <div className="chap-name-humanistic">{c.label}</div>
                <div className="chap-meta-humanistic">
                  {c.topics.length} topic{c.topics.length !== 1 ? "s" : ""} · ~{estMinutes} min study
                </div>
              </div>
              <div className="chap-arrow">→</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterList;
