import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NotesPhase({ topic, content, goBack, onNext }) {
  const [fontSize, setFontSize] = useState(100);

  const notes = Array.isArray(content.notes)
    ? content.notes.join("\n")
    : content.notes || "";

  const hasHtml = typeof notes === "string" && /<[^>]+>/.test(notes);
  const markup = notes || "<p>No notes are available for this topic yet.</p>";

  const zoomIn  = () => setFontSize((f) => Math.min(f + 10, 160));
  const zoomOut = () => setFontSize((f) => Math.max(f - 10, 70));

  return (
    <div className="lc" id="notesCard">
      <div className="lch">
        <span className="lbadge lb-n">📖 Notes</span>
        <span className="lct">{topic}</span>
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={zoomOut} title="Decrease font size">A−</button>
          <button className="zoom-btn" onClick={zoomIn}  title="Increase font size">A+</button>
        </div>
      </div>
      <div className="lcb">
        <div className="notes-scroll-container">
          <div className="nc" style={{ fontSize: `${fontSize}%` }}>
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


