import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NotesPhase({ topic, content, goBack, onNext }) {
  const [fontSize, setFontSize] = useState(100);
  const [swipeHint, setSwipeHint] = useState(null); // null | "left" | "right"
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Require a horizontal swipe longer than 50px and more horizontal than vertical
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) {
      touchStartX.current = null;
      return;
    }

    if (deltaX < 0) {
      // Swipe left – show hint only
      setSwipeHint("left");
    } else {
      // Swipe right – show hint only
      setSwipeHint("right");
    }
    setTimeout(() => setSwipeHint(null), 300);
    touchStartX.current = null;
  };

  const notes = Array.isArray(content.notes)
    ? content.notes.join("\n")
    : content.notes || "";
  const hasHtml = typeof notes === "string" && /<[^>]+>/.test(notes);
  const markup = notes || "<p>No notes are available for this topic yet.</p>";

  const zoomIn = () => setFontSize((f) => Math.min(f + 10, 160));
  const zoomOut = () => setFontSize((f) => Math.max(f - 10, 70));

  return (
    <div
      className={`lc notes-swipeable${swipeHint ? ` swipe-${swipeHint}` : ""}`}
      id="notesCard"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="lch">
        <span className="lbadge lb-n">📖 Notes</span>
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={zoomOut} title="Decrease font size">A−</button>
          <button className="zoom-btn" onClick={zoomIn} title="Increase font size">A+</button>
        </div>
      </div>
      <div className="lcb">
        <div className="notes-scroll-container">
          <div className="nc" style={{ fontSize: `${fontSize}%` }}>
            {hasHtml ? (
              <div dangerouslySetInnerHTML={{ __html: markup }} />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markup}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Swipe hint row */}
        <div className="notes-swipe-hint">
          <span className="swipe-hint-text">← Swipe right to go back</span>
          <span className="swipe-hint-dot" />
          <span className="swipe-hint-text">Swipe left for quiz →</span>
        </div>

        <div className="lnav-strip">
          <button className="btn-g" onClick={goBack}>← Back to Topics</button>
          <button className="btn-p" onClick={onNext}>I've Finished Reading →</button>
        </div>
      </div>
    </div>
  );
}

export default NotesPhase;
