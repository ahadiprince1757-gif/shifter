import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import GlobalSearch from "./GlobalSearch";
// Simple debounce to avoid duplicate rapid clicks
function debounce(fn, delay = 150) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
// Prefetch lazy-loaded route components
const prefetchMap = {
  "/analytics": () => import("../components/AnalyticsDashboard"),
  "/mistakes": () => import("../components/MistakeJournal"),
  "/tutor": () => import("../components/AITutor"),
  "/ai-tutor": () => import("../components/AITutor"),
};
function prefetchRoute(path) {
  const loader = prefetchMap[path];
  if (loader) {
    loader(); // trigger import, ignore result
  }
}

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const ProgressIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7v1a2 2 0 01-2 2h-1v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1H5a2 2 0 01-2-2v-1a7 7 0 017-7h1V5.73A2.001 2.001 0 0112 2zm-3 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

const MistakesIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

export default function BottomNav({
  curriculum,
  onNavigateToTopic,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      // Tap anywhere on the page to make bottom nav reappear
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleTap, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleTap);
    };
  }, [lastScrollY]);

  const isNavVisible = isVisible || searchOpen;

  const path = location.pathname;
  const isHome = path === "/subjects";
  const isProgress = path === "/analytics";
  const isMistakes = path === "/mistakes";
  const isTutor = path === "/tutor" || path === "/ai-tutor";

  const handleSearchNavigate = (subjectId, chapterId, topic) => {
    if (onNavigateToTopic) onNavigateToTopic(subjectId, chapterId, topic);
    setSearchOpen(false);
  };

  return (
    <>
      {/* Search overlay */}
      {searchOpen && (
        <div className="bottom-search-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
          <div className="bottom-search-panel">
            <div className="bottom-search-header">
              <span className="bottom-search-title">Search Topics</span>
              <button
                className="bottom-search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            </div>
            {curriculum && (
              <GlobalSearch
                curriculum={curriculum}
                navigateToTopic={handleSearchNavigate}
              />
            )}
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      <nav className={`bottom-nav ${isNavVisible ? "" : "bn-hidden"}`} role="navigation" aria-label="Mobile navigation">
        <button
          className={`bn-item ${isHome ? "active" : ""}`}
          onClick={debounce(() => navigate("/subjects"))}
          aria-label="Home"
        >
          <span className="bn-icon"><HomeIcon /></span>
          <span className="bn-label">Home</span>
        </button>

        <button
          className={`bn-item ${isTutor ? "active" : ""}`}
          onClick={debounce(() => { navigate("/tutor"); prefetchRoute("/tutor"); })}
          onMouseEnter={() => prefetchRoute("/tutor")}
          aria-label="Ask Quiz"
        >
          <span className="bn-icon"><BotIcon /></span>
          <span className="bn-label">Ask Quiz</span>
        </button>

        <button
          className={`bn-item ${isMistakes ? "active" : ""}`}
          onClick={debounce(() => { navigate("/mistakes"); prefetchRoute("/mistakes"); })}
          onMouseEnter={() => prefetchRoute("/mistakes")}
          aria-label="Mistakes"
        >
          <span className="bn-icon"><MistakesIcon /></span>
          <span className="bn-label">Mistakes</span>
        </button>

        <button
          className={`bn-item ${isProgress ? "active" : ""}`}
          onClick={debounce(() => { navigate("/analytics"); prefetchRoute("/analytics"); })}
          onMouseEnter={() => prefetchRoute("/analytics")}
          aria-label="Progress"
        >
          <span className="bn-icon"><ProgressIcon /></span>
          <span className="bn-label">Progress</span>
        </button>
      </nav>
    </>
  );
}

