import { useMasteredTopics } from "../hooks/useMasteredTopics";

/**
 * SubtopicList — Level 3 of the navigation hierarchy.
 *
 * Displays all subtopics under a single topic group (e.g. "Limits" inside "Calculus").
 * Matches the same card-based visual language as ChapterList and TopicList.
 */
function SubtopicList({ subject, chapter, topicGroup, openSubtopic, goBack, mastered }) {
  if (!subject || !chapter || !topicGroup) return null;

  const subtopics = topicGroup.subtopics || [];
  const masteredCount = subtopics.filter((s) =>
    mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  ).length;
  const percentComplete =
    subtopics.length > 0 ? Math.round((masteredCount / subtopics.length) * 100) : 0;

  // First unmastered subtopic gets "Up Next" badge
  const firstUnmastered = subtopics.find(
    (s) => !mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  );

  return (
    <div id="v-subtopics" className="view active">
      {/* Header — same pattern as Chapter/Topic pages */}
      <div className="vhd-humanistic">
        <button className="vback-humanistic" onClick={goBack}>
          ← {chapter.label}
        </button>
        <div className="vtitle-humanistic">{topicGroup.name}</div>
        <div className="vsub-humanistic">
          {subtopics.length} subtopic{subtopics.length !== 1 ? "s" : ""} ·{" "}
          {masteredCount} Completed
        </div>

        {/* Progress bar — same as TopicList chapter progress */}
        <div className="chapter-progress-track">
          <div
            className="chapter-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Subtopic cards — same card style as chapters */}
      <div className="chap-list-humanistic">
        {subtopics.map((sub, idx) => {
          const isMastered = mastered?.has(`${subject.id}|${chapter.id}|${sub}`);
          const isSuggested = !isMastered && sub === firstUnmastered;

          return (
            <div
              className={`chap-card-humanistic subtopic-nav-card${isMastered ? " done" : ""}${isSuggested ? " suggested" : ""}`}
              key={sub}
              onClick={() => openSubtopic(sub)}
            >
              <div className="chap-card-content">
                <div className="chap-badge-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="chap-name-humanistic">{sub}</div>
                <div className="chap-meta-humanistic">
                  {isMastered
                    ? "Completed ✓"
                    : isSuggested
                    ? "Up Next"
                    : "Ready to learn"}
                </div>
              </div>
              <div className="chap-arrow">
                {isMastered ? "✓" : "→"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubtopicList;
