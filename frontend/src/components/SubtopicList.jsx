import ReadingContainer from "./layout/ReadingContainer";

/**
 * SubtopicList — Level 3 of the navigation hierarchy.
 *
 * Conforms to Tixar Global Layout Rules & Semantic Color:
 * - One continuous surface; no floating card soup.
 * - Structure through typography: Topic group title, Subtopic index (01, 02), Name, and Status.
 * - Solid Tixar blue (#287ce0) for active/upcoming status, emerald (#15803d) for verified completion.
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
            style={{ width: "auto", padding: "0", minHeight: "auto", color: "var(--tixar-blue-core, #287ce0)", fontWeight: 500 }}
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

export default SubtopicList;
