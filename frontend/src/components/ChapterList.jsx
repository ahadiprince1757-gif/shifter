import ReadingContainer from "./layout/ReadingContainer";

/**
 * ChapterList
 *
 * Implements Tixar Global Layout Rules & Semantic Color:
 * - Structure through typography: Chapter index, Title, Topic/Subtopic counts.
 * - Solid Tixar blue (#287ce0) for navigational arrows and active cues.
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
            style={{ width: "auto", padding: "0", minHeight: "auto", color: "var(--tixar-blue-core, #287ce0)", fontWeight: 500 }}
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
            Select a chapter to start learning
          </div>
        </div>

        {/* Chapters List (Tabular, calm list) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {subject.chapters.map((c, idx) => (
            <div
              key={c.id}
              onClick={() => openChapter(c.id)}
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
                  Chapter {idx + 1}
                </div>
                <div className="type-question" style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {c.label}
                </div>
              </div>
              <div style={{ color: "var(--tixar-blue-core, #287ce0)", fontSize: "16px", fontWeight: 600, marginLeft: "16px" }} aria-hidden="true">
                →
              </div>
            </div>
          ))}
        </div>
      </ReadingContainer>
    </div>
  );
}

export default ChapterList;
