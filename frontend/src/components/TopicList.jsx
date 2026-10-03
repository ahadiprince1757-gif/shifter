/**
 * TopicList — Level 2 of the navigation hierarchy.
 *
 * For chapters with nested topics (e.g. Calculus → Limits / Differentiation / Integration):
 *   clicking a topic group navigates to the SubtopicList page.
 *
 * For flat chapters (single-level topics):
 *   clicking a topic goes directly to LearnFlow.
 *
 * Both paths use the same card visual language as ChapterList, preserving
 * Tixar's one-screen-at-a-time core principle.
 */
function TopicList({ subject, chapter, openTopic, openTopicGroup, goBack, mastered }) {
  if (!subject || !chapter) return null;

  // Normalize: every entry becomes { name, subtopics[] }
  const normalizedTopics = (chapter.topics || []).map((t, idx) => {
    if (typeof t === "object" && t !== null) {
      const subs =
        Array.isArray(t.subtopics) && t.subtopics.length > 0
          ? t.subtopics
          : [t.name || `Topic ${idx + 1}`];
      return { id: t.id || `top-${idx}`, name: t.name || `Topic ${idx + 1}`, subtopics: subs };
    }
    return { id: `top-${idx}`, name: String(t), subtopics: [String(t)] };
  });

  const hasNested = normalizedTopics.some(
    (t) => t.subtopics.length > 1 || t.name !== t.subtopics[0]
  );

  // Flatten for overall chapter progress
  const allSubtopics = normalizedTopics.flatMap((t) => t.subtopics);
  const masteredCount = allSubtopics.filter((s) =>
    mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  ).length;
  const percentComplete =
    allSubtopics.length > 0
      ? Math.round((masteredCount / allSubtopics.length) * 100)
      : 0;

  // First unmastered subtopic (used for flat mode Up Next badge)
  const firstUnmastered = allSubtopics.find(
    (s) => !mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  );

  return (
    <div id="v-topics" className="view active">
      {/* Header */}
      <div className="vhd-humanistic">
        <button className="vback-humanistic" onClick={goBack}>
          ← {subject.label}
        </button>
        <div className="vtitle-humanistic">{chapter.label}</div>
        <div className="vsub-humanistic">
          {hasNested
            ? `${normalizedTopics.length} Topics · ${allSubtopics.length} Subtopics · ${masteredCount} Completed`
            : `${allSubtopics.length} topic${allSubtopics.length !== 1 ? "s" : ""} · ${masteredCount} Completed`}
        </div>

        {/* Chapter progress bar */}
        <div className="chapter-progress-track">
          <div
            className="chapter-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Card list */}
      <div className="chap-list-humanistic">
        {hasNested
          ? /* ── NESTED: Topic group cards ─────────────────────────────────── */
            normalizedTopics.map((topicGroup, idx) => {
              const groupMastered = topicGroup.subtopics.filter((s) =>
                mastered?.has(`${subject.id}|${chapter.id}|${s}`)
              ).length;
              const allDone = groupMastered === topicGroup.subtopics.length;
              const groupHasNext =
                !allDone &&
                topicGroup.subtopics.some((s) => s === firstUnmastered);

              return (
                <div
                  className={`chap-card-humanistic${allDone ? " done" : ""}${groupHasNext ? " suggested" : ""}`}
                  key={topicGroup.id || topicGroup.name}
                  onClick={() =>
                    openTopicGroup
                      ? openTopicGroup(topicGroup.name)
                      : openTopic(topicGroup.subtopics[0])
                  }
                >
                  <div className="chap-card-content">
                    <div className="chap-badge-number">
                      TOPIC {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="chap-name-humanistic">{topicGroup.name}</div>
                    <div className="chap-meta-humanistic">
                      {allDone
                        ? "Completed ✓"
                        : groupHasNext
                        ? `Up Next · ${groupMastered}/${topicGroup.subtopics.length} done`
                        : `${topicGroup.subtopics.length} subtopic${topicGroup.subtopics.length !== 1 ? "s" : ""} · ${groupMastered} done`}
                    </div>
                  </div>
                  <div className="chap-arrow">{allDone ? "✓" : "→"}</div>
                </div>
              );
            })
          : /* ── FLAT: Direct subtopic cards ───────────────────────────────── */
            normalizedTopics.map((t, idx) => {
              const sub = t.subtopics[0] || t.name;
              const isMastered = mastered?.has(`${subject.id}|${chapter.id}|${sub}`);
              const isSuggested = !isMastered && sub === firstUnmastered;

              return (
                <div
                  className={`chap-card-humanistic${isMastered ? " done" : ""}${isSuggested ? " suggested" : ""}`}
                  key={sub}
                  onClick={() => openTopic(sub)}
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
                  <div className="chap-arrow">{isMastered ? "✓" : "→"}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default TopicList;
