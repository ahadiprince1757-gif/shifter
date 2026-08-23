function TopicList({ subject, chapter, openTopic, goBack, mastered }) {
  if (!subject || !chapter) return null;

  return (
    <div id="v-topics" className="view active">
      <div className="vhd-humanistic">
        <button className="vback-humanistic" onClick={goBack}>
          ← {subject.label}
        </button>
        <div className="vtitle-humanistic">{chapter.label}</div>
        <div className="vsub-humanistic">
          {chapter.topics.length} topic{chapter.topics.length !== 1 ? "s" : ""} in this chapter
        </div>
      </div>

      <div className="topic-list-humanistic">
        {(() => {
          const firstUnmasteredIndex = chapter.topics.findIndex(
            (topic) => !mastered.has(`${subject.id}|${chapter.id}|${topic}`)
          );
          return chapter.topics.map((t, i) => {
            const isMastered = mastered.has(`${subject.id}|${chapter.id}|${t}`);
            const isSuggested = !isMastered && i === firstUnmasteredIndex;
            const indexStr = String(i + 1).padStart(2, "0");

            return (
              <div
                className={`topic-card-humanistic ${isMastered ? "done" : ""} ${isSuggested ? "suggested" : ""}`}
                key={t}
                onClick={() => openTopic(t)}
              >
                <span className="topic-index">{indexStr}</span>
                <div className="topic-card-body">
                  <div className="topic-title">{t}</div>
                </div>

                <div className="topic-status-pill">
                  {isMastered && <span className="pill-done">Completed ✓</span>}
                  {isSuggested && <span className="pill-suggested">Up Next</span>}
                  {!isMastered && !isSuggested && <span className="pill-ready">Ready →</span>}
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}

export default TopicList;
