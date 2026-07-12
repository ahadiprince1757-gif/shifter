import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NotesPhase({ topic, content, goBack, onNext }) {
  const [zoom, setZoom] = useState(100);
  const lastTap = useRef(0);

  const notes = Array.isArray(content.notes)
    ? content.notes.join("\n")
    : content.notes || "";

  console.log(`NotesPhase: Rendering ${topic}`, {
    notesLength: notes.length,
    content,
  });

  const hasHtml = typeof notes === "string" && /<[^>]+>/.test(notes);
  const markup = notes || "<p>No notes are available for this topic yet.</p>";

  console.log(`NotesPhase: hasHtml=${hasHtml}, markupLength=${markup.length}`);

  const handleTouchStart = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Toggle between 100% and 140% zoom on double tap
      setZoom((prev) => (prev === 100 ? 140 : 100));
    }
    lastTap.current = now;
  };

  return (
    <div className="lc" id="notesCard">
      <div className="lch" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0, flex: 1 }}>
          <span className="lbadge lb-n" style={{ flexShrink: 0 }}>📖 Notes</span>
          <span className="lct" style={{ 
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis",
            minWidth: 0 
          }}>{topic}</span>
        </div>
        <div className="zoom-controls" style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
          <button 
            className="zoom-btn" 
            onClick={() => setZoom(prev => Math.max(prev - 10, 70))}
            title="Zoom Out"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--bd)",
              borderRadius: "6px",
              padding: "0.2rem 0.5rem",
              cursor: "pointer",
              color: "var(--t)",
              fontSize: "0.75rem",
              fontWeight: "600",
              minHeight: "32px",
              display: "flex",
              alignItems: "center"
            }}
          >
            A-
          </button>
          <span style={{ fontSize: "0.75rem", color: "var(--t2)", minWidth: "36px", textAlign: "center" }}>
            {zoom}%
          </span>
          <button 
            className="zoom-btn" 
            onClick={() => setZoom(prev => Math.min(prev + 10, 200))}
            title="Zoom In"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--bd)",
              borderRadius: "6px",
              padding: "0.2rem 0.5rem",
              cursor: "pointer",
              color: "var(--t)",
              fontSize: "0.75rem",
              fontWeight: "600",
              minHeight: "32px",
              display: "flex",
              alignItems: "center"
            }}
          >
            A+
          </button>
          <button 
            className="zoom-btn" 
            onClick={() => setZoom(100)}
            title="Reset Zoom"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--bd)",
              borderRadius: "6px",
              padding: "0.2rem 0.5rem",
              cursor: "pointer",
              color: "var(--t2)",
              fontSize: "0.7rem",
              minHeight: "32px",
              display: "flex",
              alignItems: "center"
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="lcb">
        <div 
          className="notes-scroll-container" 
          onTouchStart={handleTouchStart}
          style={{ 
            overflowX: "auto", 
            overflowY: "visible", 
            WebkitOverflowScrolling: "touch",
            width: "100%" 
          }}
        >
          <div className="nc" style={{ fontSize: `${zoom}%`, transition: "font-size 0.15s ease-out" }}>
            {hasHtml ? (
              <div dangerouslySetInnerHTML={{ __html: markup }} />
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {markup}
              </ReactMarkdown>
            )}
          </div>
        </div>
        <div className="lnav-strip">
          <button className="btn-g" onClick={goBack}>
            ← Back to Topics
          </button>
          <button className="btn-p" onClick={onNext}>
            I've Finished Reading →
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesPhase;

