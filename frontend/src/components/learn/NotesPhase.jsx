import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NotesPhase({ content, goBack, onNext }) {
  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem("shifter_reader_zoom");
      return saved ? parseInt(saved, 10) : 100;
    } catch {
      return 100;
    }
  });

  const [swipeHint, setSwipeHint] = useState(null); // null | "left" | "right"
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const pinchStartDist = useRef(null);
  const pinchStartFontSize = useRef(100);
  const isPinching = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("shifter_reader_zoom", fontSize.toString());
    } catch {
      // ignore storage errors
    }
  }, [fontSize]);

  // Support pinch-to-zoom on desktop trackpads (ctrl + wheel)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setFontSize((prev) => {
          const delta = e.deltaY < 0 ? 5 : -5;
          return Math.max(70, Math.min(200, prev + delta));
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDist.current = dist;
      pinchStartFontSize.current = fontSize;
      isPinching.current = true;
    } else if (e.touches.length === 1) {
      isPinching.current = false;
      pinchStartDist.current = null;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (isPinching.current && e.touches.length === 2) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (pinchStartDist.current && pinchStartDist.current > 0) {
        const scale = currentDist / pinchStartDist.current;
        const newSize = Math.round(
          Math.max(70, Math.min(200, pinchStartFontSize.current * scale))
        );
        setFontSize(newSize);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isPinching.current) {
      if (e.touches.length < 2) {
        isPinching.current = false;
        pinchStartDist.current = null;
      }
      return;
    }
    if (touchStartX.current === null) return;
    if (!e.changedTouches || e.changedTouches.length === 0) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) {
      touchStartX.current = null;
      return;
    }
    if (deltaX < 0) {
      setSwipeHint("left");
    } else {
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

  return (
    <div
      ref={containerRef}
      className={`lc notes-swipeable${swipeHint ? ` swipe-${swipeHint}` : ""}`}
      id="notesCard"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="lch">
        <span className="lbadge lb-n">📖 Notes</span>
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

        {/* Swipe & Pinch hint row */}
        <div className="notes-swipe-hint">
          <span className="swipe-hint-text">← Swipe right to go back</span>
          <span className="swipe-hint-dot" />
          <span className="swipe-hint-text">Pinch to zoom</span>
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
