function ChapterList({ subject, openChapter, goBack }) {
  if (!subject) return null;

  return (
    <div id="v-chapters" className="view active">
      <div className="vhd">
        <button className="vback" onClick={goBack}>← All Subjects</button>
        <div className="vtitle">{subject.icon} {subject.label}</div>
        <div className="vsub">{subject.chapters.length} chapters — pick one to explore</div>
      </div>
      <div className="chap-list">
        {subject.chapters.map((c, i) => (
          <div className="chap-card" key={c.id} onClick={() => openChapter(c.id)}>
            <div className="chap-num">{String(i + 1).padStart(2, "0")}</div>
            <div style={{ flex: 1 }}>
              <div className="chap-name">{c.label}</div>
              <div className="chap-meta">{c.topics.length} topics</div>
            </div>
            <div className="chap-arr">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
