import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * Slide-over drawer that surfaces key formulas/definitions from topic notes
 * during the quiz phase — without navigating away and losing quiz state.
 */
function ConceptReferenceDrawer({ content, topic, isOpen, onClose }) {
  const notes = Array.isArray(content?.notes)
    ? content.notes.join("\n")
    : content?.notes || "";

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="ref-drawer-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div className={`ref-drawer ${isOpen ? "ref-drawer-open" : ""}`} role="complementary" aria-label="Concept Reference">
        <div className="ref-drawer-header">
          <span className="ref-drawer-title">Quick Reference — {topic}</span>
          <button
            className="ref-drawer-close"
            onClick={onClose}
            aria-label="Close reference drawer"
          >
            ✕
          </button>
        </div>
        <div className="ref-drawer-body">
          {notes ? (
            <div className="ref-drawer-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {notes}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="ref-drawer-empty">No notes available for this topic.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ConceptReferenceDrawer;
