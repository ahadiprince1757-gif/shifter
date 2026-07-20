import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalSearch from "./GlobalSearch";

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

const ProgressIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
  </svg>
);

export default function BottomNav({
  session,
  curriculum,
  onNavigateToTopic,
  onOpenAuth,
  setShowAuthModal,
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
  const isProfile = false; // future page

  const handleSearchNavigate = (subjectId, chapterId, topic) => {
    if (onNavigateToTopic) onNavigateToTopic(subjectId, chapterId, topic);
    setSearchOpen(false);
  };

  const handleProfileTap = () => {
    if (session) {
      // Navigate to analytics as profile proxy for now
      navigate("/analytics");
    } else {
      if (onOpenAuth) onOpenAuth();
      else if (setShowAuthModal) setShowAuthModal(true);
    }
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
          onClick={() => navigate("/subjects")}
          aria-label="Home"
        >
          <span className="bn-icon"><HomeIcon /></span>
          <span className="bn-label">Home</span>
        </button>

        <button
          className={`bn-item ${searchOpen ? "active" : ""}`}
          onClick={() => setSearchOpen((o) => !o)}
          aria-label="Search"
        >
          <span className="bn-icon"><SearchIcon /></span>
          <span className="bn-label">Search</span>
        </button>

        <button
          className={`bn-item ${isProgress ? "active" : ""}`}
          onClick={() => navigate("/analytics")}
          aria-label="Progress"
        >
          <span className="bn-icon"><ProgressIcon /></span>
          <span className="bn-label">Progress</span>
        </button>

        <button
          className={`bn-item ${isProfile ? "active" : ""}`}
          onClick={handleProfileTap}
          aria-label="Profile"
        >
          {session?.user?.user_metadata?.avatar_url ? (
            <img
              src={session.user.user_metadata.avatar_url}
              alt="Profile"
              className="bn-avatar"
            />
          ) : (
            <span className="bn-icon"><ProfileIcon /></span>
          )}
          <span className="bn-label">{session ? "Profile" : "Sign In"}</span>
        </button>
      </nav>
    </>
  );
}
