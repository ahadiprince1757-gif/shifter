import ReadingContainer from "./layout/ReadingContainer";

/**
 * TopicList — Level 2 of the navigation hierarchy.
 *
 * Conforms to Tixar Global Layout Rules & Semantic Color:
 * - One continuous surface; no floating card soup.
 * - Structure through typography: Chapter title, Topic index (01, 02), Name, and Status.
 * - Solid Tixar blue (#287ce0) for active/upcoming status, emerald (#15803d) for verified completion.
 */
function TopicList({ subject, chapter, openTopic, openTopicGroup, goBack, mastered }) {
  if (!subject || !chapter) return null;

  // Normalize: every entry becomes { id, name, subtopics[] }
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

  // First unmastered subtopic
  const firstUnmastered = allSubtopics.find(
    (s) => !mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  );

  return (
    <div id="v-topics" className="view active" style={{ paddingTop: "0.5rem" }}>
      <ReadingContainer>
        {/* Navigation Breadcrumb / Back Action */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <button
            type="button"
            className="secondary-action-btn"
            style={{ width: "auto", padding: "0", minHeight: "auto", color: "var(--tixar-blue-core, #287ce0)", fontWeight: 500 }}
            onClick={goBack}
          >
            ← {subject.label}
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h1 className="type-page-heading" style={{ fontSize: "26px", marginBottom: "6px" }}>
            {chapter.label}
          </h1>
          <div className="type-supporting" style={{ color: "var(--text-secondary)" }}>
            {hasNested
              ? `${normalizedTopics.length} Topics · ${allSubtopics.length} Subtopics · ${masteredCount} Completed`
              : `${allSubtopics.length} topic${allSubtopics.length !== 1 ? "s" : ""} · ${masteredCount} Completed`}
          </div>
        </div>

        {/* Topics / Subtopics List (Continuous layout, zero cards) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {hasNested
            ? normalizedTopics.map((topicGroup, idx) => {
                const groupMastered = topicGroup.subtopics.filter((s) =>
                  mastered?.has(`${subject.id}|${chapter.id}|${s}`)
                ).length;
                const allDone = groupMastered === topicGroup.subtopics.length;
                const groupHasNext =
                  !allDone && topicGroup.subtopics.some((s) => s === firstUnmastered);

                const statusLabel = allDone
                  ? "Completed ✓"
                  : groupHasNext
                  ? `Up Next · ${groupMastered}/${topicGroup.subtopics.length} done`
                  : `${topicGroup.subtopics.length} subtopics · ${groupMastered} done`;

                return (
                  <div
                    key={topicGroup.id || topicGroup.name}
                    onClick={() =>
                      openTopicGroup
                        ? openTopicGroup(topicGroup.name)
                        : openTopic(topicGroup.subtopics[0])
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 0",
                      borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = "6px";
                      e.currentTarget.style.paddingRight = "6px";
                      e.currentTarget.style.background = "var(--surface-hover, #f0f7ff)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = "0";
                      e.currentTarget.style.paddingRight = "0";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div>
                      <div className="type-meta" style={{ marginBottom: "3px", textTransform: "uppercase", color: "var(--tixar-blue-core, #287ce0)" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="type-question" style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {topicGroup.name}
                      </div>
                      <div
                        className="type-supporting"
                        style={{
                          marginTop: "3px",
                          color: allDone
                            ? "var(--state-success, #15803d)"
                            : groupHasNext
                            ? "var(--tixar-blue-core, #287ce0)"
                            : "var(--text-secondary)",
                          fontWeight: groupHasNext ? 600 : 400,
                        }}
                      >
                        {statusLabel}
                      </div>
                    </div>
                    <div
                      style={{
                        color: allDone ? "var(--state-success, #15803d)" : "var(--tixar-blue-core, #287ce0)",
                        fontSize: "16px",
                        fontWeight: 600,
                        marginLeft: "16px",
                      }}
                      aria-hidden="true"
                    >
                      {allDone ? "✓" : "→"}
                    </div>
                  </div>
                );
              })
            : normalizedTopics.map((t, idx) => {
                const sub = t.subtopics[0] || t.name;
                const isMastered = mastered?.has(`${subject.id}|${chapter.id}|${sub}`);
                const isSuggested = !isMastered && sub === firstUnmastered;

                const statusLabel = isMastered
                  ? "Completed ✓"
                  : isSuggested
                  ? "Up Next"
                  : "Ready to learn";

                return (
                  <div
                    key={sub}
                    onClick={() => openTopic(sub)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 0",
                      borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = "6px";
                      e.currentTarget.style.paddingRight = "6px";
                      e.currentTarget.style.background = "var(--surface-hover, #f0f7ff)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = "0";
                      e.currentTarget.style.paddingRight = "0";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div>
                      <div className="type-meta" style={{ marginBottom: "3px", textTransform: "uppercase", color: "var(--tixar-blue-core, #287ce0)" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="type-question" style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {sub}
                      </div>
                      <div
                        className="type-supporting"
                        style={{
                          marginTop: "3px",
                          color: isMastered
                            ? "var(--state-success, #15803d)"
                            : isSuggested
                            ? "var(--tixar-blue-core, #287ce0)"
                            : "var(--text-secondary)",
                          fontWeight: isSuggested ? 600 : 400,
                        }}
                      >
                        {statusLabel}
                      </div>
                    </div>
                    <div
                      style={{
                        color: isMastered ? "var(--state-success, #15803d)" : "var(--tixar-blue-core, #287ce0)",
                        fontSize: "16px",
                        fontWeight: 600,
                        marginLeft: "16px",
                      }}
                      aria-hidden="true"
                    >
                      {isMastered ? "✓" : "→"}
                    </div>
                  </div>
                );
              })}
        </div>
      </ReadingContainer>
    </div>
  );
}

export default TopicList;
