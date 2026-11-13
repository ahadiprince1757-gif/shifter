import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import GlobalSearch from "./GlobalSearch";

// Simple debounce to avoid duplicate rapid clicks
function debounce(fn, delay = 150) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const GapsIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 12z" />
  </svg>
);

export default function BottomNav({
  curriculum: propCurriculum,
  onNavigateToTopic: propNavigateToTopic,
}) {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { curriculum: hookCurriculum } = useCurriculum();

  const curriculum = propCurriculum || hookCurriculum || [];
  const onNavigateToTopic =
    propNavigateToTopic ||
    ((subjectId, chapterId, topic) => {
      navigate(`/learn/${subjectId}/${chapterId}/${encodeURIComponent(topic)}`);
    });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Lock body scroll when search panel is open
  useEffect(() => {
    if (isSearchOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isSearchOpen]);

  // Handle ESC key to close search panel
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show nav when close to the top of the page
      if (currentScrollY <= 15) {
        setIsVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) > 8) {
        // Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    const handleTap = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleTap, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleTap);
    };
  }, [lastScrollY]);

  if (!session) return null;

  const path = location.pathname;
  const isHome = path === "/subjects" || path === "/";
  const isGaps = path === "/gaps" || path === "/mistakes";

  return (
    <>
      {/* ── Mobile & Tablet Bottom Navigation Bar ────────────────────────── */}
      <nav
        className={`bottom-nav ${isVisible ? "" : "bn-hidden"}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <button
          className={`bn-item ${isHome && !isSearchOpen ? "active" : ""}`}
          onClick={debounce(() => {
            setIsSearchOpen(false);
            navigate("/subjects");
          })}
          aria-label="Subjects"
        >
          <span className="bn-icon">
            <HomeIcon />
          </span>
          <span className="bn-label">Subjects</span>
        </button>

        <button
          className={`bn-item bn-item--search ${isSearchOpen ? "active" : ""}`}
          onClick={() => setIsSearchOpen((prev) => !prev)}
          aria-label="Search topics, subtopics and notes"
          aria-expanded={isSearchOpen}
        >
          <span className="bn-icon bn-icon--search">
            <SearchIcon />
          </span>
          <span className="bn-label">Search</span>
        </button>

        <button
          className={`bn-item ${isGaps && !isSearchOpen ? "active" : ""}`}
          onClick={debounce(() => {
            setIsSearchOpen(false);
            navigate("/gaps");
          })}
          aria-label="Gaps"
        >
          <span className="bn-icon">
            <GapsIcon />
          </span>
          <span className="bn-label">Gaps</span>
        </button>
      </nav>

      {/* ── Desktop Floating Bottom Search Button (hidden on mobile via CSS) ─ */}
      <button
        className="desktop-bottom-search-btn"
        onClick={() => setIsSearchOpen(true)}
        aria-label="Search topics, subtopics and notes"
      >
        <span className="dbs-icon">
          <SearchIcon />
        </span>
        <span className="dbs-text">Search topics & notes</span>
        <kbd className="dbs-kbd">/</kbd>
      </button>

      {/* ── Bottom Search Overlay & Panel ─────────────────────────────────── */}
      {isSearchOpen && (
        <div
          className="bottom-search-overlay"
          onClick={() => setIsSearchOpen(false)}
          role="presentation"
        >
          <div
            className="bottom-search-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search topics, subtopics and notes"
          >
            <div className="bottom-search-header">
              <div className="bottom-search-title">Search Topics</div>
              <button
                className="bottom-search-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            </div>

            <GlobalSearch
              curriculum={curriculum}
              navigateToTopic={(subjId, chapId, topic) => {
                onNavigateToTopic(subjId, chapId, topic);
                setIsSearchOpen(false);
              }}
              autoFocus={true}
              onClose={() => setIsSearchOpen(false)}
              placeholder="Type a topic or subtopic..."
            />
          </div>
        </div>
      )}
    </>
  );
}
