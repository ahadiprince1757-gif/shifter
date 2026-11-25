import ReadingContainer from "./layout/ReadingContainer";

/**
 * ChapterList
 *
 * Implements Tixar Global Layout Rules:
 * - Full-screen continuous document layout.
 * - Structure through typography: Chapter index, Title, Topic/Subtopic counts.
 * - Calm, continuous list with simple baseline separators instead of rounded floating cards.
 */
function ChapterList({ subject, openChapter, goBack }) {
  if (!subject) return null;

  return (
    <div id="v-chapters" className="view active" style={{ paddingTop: "0.5rem" }}>
      <ReadingContainer>
        {/* Navigation Breadcrumb / Back Action */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <button
            type="button"
            className="secondary-action-btn"
            style={{ width: "auto", padding: "0", minHeight: "auto", color: "var(--text-secondary)" }}
            onClick={goBack}
          >
            ← All Subjects
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h1 className="type-page-heading" style={{ fontSize: "26px", marginBottom: "6px" }}>
            {subject.label}
          </h1>
          <div className="type-supporting" style={{ color: "var(--text-secondary)" }}>
            {subject.chapters.length} chapter{subject.chapters.length !== 1 ? "s" : ""} · Select a chapter to start learning
          </div>
        </div>

        {/* Chapters List (Tabular, calm list) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {subject.chapters.map((c, idx) => {
            const total = (c.topics || []).reduce((acc, t) => {
              if (typeof t === "object" && t !== null && Array.isArray(t.subtopics) && t.subtopics.length > 0) {
                return acc + t.subtopics.length;
              }
              return acc + 1;
            }, 0);
            const topicCount = (c.topics || []).length;
            const hasHierarchy = (c.topics || []).some(
              (t) => typeof t === "object" && t !== null && Array.isArray(t.subtopics) && t.subtopics.length > 0
            );
            const metaText = hasHierarchy
              ? `${topicCount} Topics · ${total} Subtopics`
              : `${total} topic${total !== 1 ? "s" : ""}`;

            return (
              <div
                key={c.id}
                onClick={() => openChapter(c.id)}
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
                    Chapter {idx + 1}
                  </div>
                  <div className="type-question" style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {c.label}
                  </div>
                  <div className="type-supporting" style={{ marginTop: "3px", color: "var(--text-secondary)" }}>
                    {metaText}
                  </div>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "16px", marginLeft: "16px" }} aria-hidden="true">
                  →
                </div>
              </div>
            );
          })}
        </div>
      </ReadingContainer>
    </div>
  );
}

export default ChapterList;
