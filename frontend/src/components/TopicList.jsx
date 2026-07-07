function TopicList({ subject, chapter, openTopic, goBack, mastered }) {
  if (!subject || !chapter) return null;

  return (
    <div id="v-topics" className="view active">
      <div className="vhd">
        <button className="vback" onClick={goBack}>← Back</button>
        <div className="vtitle">{chapter.label}</div>
        <div className="vsub">{subject.icon} {subject.label}</div>
      </div>
      <div className="topic-list">
        {(() => {
          const firstUnmasteredIndex = chapter.topics.findIndex(
            (topic) => !mastered.has(`${subject.id}|${chapter.id}|${topic}`)
          );
          return chapter.topics.map((t, i) => {
            const isMastered = mastered.has(`${subject.id}|${chapter.id}|${t}`);
            const isSuggested = !isMastered && i === firstUnmasteredIndex;
            return (
              <div 
                className={`topic-card ${isMastered ? 'done' : ''} ${isSuggested ? 'suggested' : ''}`} 
                key={t} 
                onClick={() => openTopic(t)}
              >
                <div className="t-num">{isMastered ? "✓" : i + 1}</div>
                <div className="t-info">
                  <div className="t-name">{t}</div>
                  <div className="t-meta">{isMastered ? "Mastered ✓" : "Suggested next step ✨"}</div>
                </div>
                <div className="t-arr">→</div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}

export default TopicList;
