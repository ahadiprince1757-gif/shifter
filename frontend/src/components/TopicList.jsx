import React from "react";

function TopicList({ subject, chapter, openTopic, goBack, mastered }) {
  if (!subject || !chapter) return null;

  // Normalize topic hierarchy: each topic can have subtopics
  const normalizedTopics = (chapter.topics || []).map((t, idx) => {
    if (typeof t === "object" && t !== null) {
      const subList = Array.isArray(t.subtopics) && t.subtopics.length > 0 ? t.subtopics : [t.name || `Topic ${idx + 1}`];
      return {
        id: t.id || `top-${idx}`,
        name: t.name || t.label || t.title || `Topic ${idx + 1}`,
        subtopics: subList,
      };
    }
    return {
      id: `top-${idx}`,
      name: String(t),
      subtopics: [String(t)],
    };
  });

  // Calculate global subtopic metrics across the chapter
  const allSubtopics = normalizedTopics.flatMap((top) =>
    top.subtopics.map((sub) => ({
      subtopic: sub,
      topicName: top.name,
      isMastered: mastered?.has(`${subject.id}|${chapter.id}|${sub}`) || false,
    }))
  );

  const totalSubtopics = allSubtopics.length;
  const masteredCount = allSubtopics.filter((s) => s.isMastered).length;
  const firstUnmasteredSubtopic = allSubtopics.find((s) => !s.isMastered)?.subtopic;
  const percentComplete = totalSubtopics > 0 ? Math.round((masteredCount / totalSubtopics) * 100) : 0;

  // Determine if chapter has multi-subtopic groups
  const hasNestedHierarchy = normalizedTopics.some(
    (top) => top.subtopics.length > 1 || top.name !== top.subtopics[0]
  );

  return (
    <div id="v-topics" className="view active">
      {/* Chapter Header */}
      <div className="vhd-humanistic">
        <button className="vback-humanistic" onClick={goBack}>
          ← {subject.label}
        </button>
        <div className="vtitle-humanistic">{chapter.label}</div>
        <div className="vsub-humanistic">
          {hasNestedHierarchy
            ? `${normalizedTopics.length} Topics · ${totalSubtopics} Subtopics · ${masteredCount} Completed`
            : `${totalSubtopics} topic${totalSubtopics !== 1 ? "s" : ""} · ${masteredCount} Completed`}
        </div>

        {/* Chapter Progress Bar */}
        <div className="chapter-progress-track">
          <div
            className="chapter-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Topics & Subtopics Hierarchy */}
      <div className="topic-hierarchy-container">
        {hasNestedHierarchy ? (
          normalizedTopics.map((topicGroup, groupIdx) => {
            const groupMasteredCount = topicGroup.subtopics.filter((sub) =>
              mastered?.has(`${subject.id}|${chapter.id}|${sub}`)
            ).length;
            const isGroupAllDone =
              groupMasteredCount === topicGroup.subtopics.length &&
              topicGroup.subtopics.length > 0;
            const groupIndexStr = String(groupIdx + 1).padStart(2, "0");

            return (
              <div className="topic-group-section" key={topicGroup.id || topicGroup.name}>
                {/* Topic Header Bar */}
                <div className="topic-group-header">
                  <div className="topic-group-left">
                    <span className="topic-group-index">TOPIC {groupIndexStr}</span>
                    <h3 className="topic-group-title">{topicGroup.name}</h3>
                  </div>
                  <div className="topic-group-right">
                    <span
                      className={`topic-group-badge ${
                        isGroupAllDone ? "badge-all-done" : ""
                      }`}
                    >
                      {isGroupAllDone
                        ? "Completed ✓"
                        : `${groupMasteredCount}/${topicGroup.subtopics.length} Mastered`}
                    </span>
                  </div>
                </div>

                {/* Subtopics List */}
                <div className="subtopic-list">
                  {topicGroup.subtopics.map((sub, subIdx) => {
                    const isMastered = mastered?.has(
                      `${subject.id}|${chapter.id}|${sub}`
                    );
                    const isSuggested = !isMastered && sub === firstUnmasteredSubtopic;
                    const subIndexStr = `${groupIdx + 1}.${subIdx + 1}`;

                    return (
                      <div
                        className={`topic-card-humanistic subtopic-card ${
                          isMastered ? "done" : ""
                        } ${isSuggested ? "suggested" : ""}`}
                        key={sub}
                        onClick={() => openTopic(sub)}
                      >
                        <span className="subtopic-index">{subIndexStr}</span>
                        <div className="topic-card-body">
                          <div className="topic-title">{sub}</div>
                        </div>

                        <div className="topic-status-pill">
                          {isMastered && <span className="pill-done">Completed ✓</span>}
                          {isSuggested && (
                            <span className="pill-suggested">Up Next</span>
                          )}
                          {!isMastered && !isSuggested && (
                            <span className="pill-ready">Ready →</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          /* Flat topics layout for chapters with single-level topics */
          <div className="topic-list-humanistic">
            {normalizedTopics.map((topicGroup, i) => {
              const sub = topicGroup.subtopics[0] || topicGroup.name;
              const isMastered = mastered?.has(
                `${subject.id}|${chapter.id}|${sub}`
              );
              const isSuggested = !isMastered && sub === firstUnmasteredSubtopic;
              const indexStr = String(i + 1).padStart(2, "0");

              return (
                <div
                  className={`topic-card-humanistic ${isMastered ? "done" : ""} ${
                    isSuggested ? "suggested" : ""
                  }`}
                  key={sub}
                  onClick={() => openTopic(sub)}
                >
                  <span className="topic-index">{indexStr}</span>
                  <div className="topic-card-body">
                    <div className="topic-title">{sub}</div>
                  </div>

                  <div className="topic-status-pill">
                    {isMastered && <span className="pill-done">Completed ✓</span>}
                    {isSuggested && <span className="pill-suggested">Up Next</span>}
                    {!isMastered && !isSuggested && (
                      <span className="pill-ready">Ready →</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopicList;
