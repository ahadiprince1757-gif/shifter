import ReadingContainer from "./layout/ReadingContainer";

/**
 * SubtopicList — Level 3 of the navigation hierarchy.
 *
 * Conforms to Tixar Global Layout Rules:
 * - One continuous surface; no floating card soup.
 * - Structure through typography: Topic group title, Subtopic index (01, 02), Name, and Status.
 * - Clean baseline separators without heavy rounded cards or drop shadows.
 */
function SubtopicList({ subject, chapter, topicGroup, openSubtopic, goBack, mastered }) {
  if (!subject || !chapter || !topicGroup) return null;

  const subtopics = topicGroup.subtopics || [];
  const masteredCount = subtopics.filter((s) =>
    mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  ).length;

  // First unmastered subtopic
  const firstUnmastered = subtopics.find(
    (s) => !mastered?.has(`${subject.id}|${chapter.id}|${s}`)
  );

  return (
    <div id="v-subtopics" className="view active" style={{ paddingTop: "0.5rem" }}>
      <ReadingContainer>
        {/* Navigation Breadcrumb / Back Action */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <button
            type="button"
            className="secondary-action-btn"
            style={{ width: "auto", padding: "0", minHeight: "auto", color: "var(--text-secondary)" }}
            onClick={goBack}
          >
            ← {chapter.label}
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h1 className="type-page-heading" style={{ fontSize: "26px", marginBottom: "6px" }}>
            {topicGroup.name}
          </h1>
          <div className="type-supporting" style={{ color: "var(--text-secondary)" }}>
            {subtopics.length} subtopic{subtopics.length !== 1 ? "s" : ""} · {masteredCount} Completed
          </div>
        </div>

        {/* Subtopic List (Continuous layout, zero cards) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {subtopics.map((sub, idx) => {
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
                onClick={() => openSubtopic(sub)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 0",
                  borderBottom: "1px solid var(--border-subtle, #e5e5e5)",
                  cursor: "pointer",
                  transition: "opacity 0.15s ease",
                }}
              >
                <div>
                  <div className="type-meta" style={{ marginBottom: "3px", textTransform: "uppercase" }}>
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
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                      fontWeight: isSuggested ? 600 : 400,
                    }}
                  >
                    {statusLabel}
                  </div>
                </div>
                <div
                  style={{
                    color: isMastered ? "var(--state-success, #15803d)" : "var(--text-muted)",
                    fontSize: "16px",
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

export default SubtopicList;
