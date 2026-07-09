import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import ProfileDropdown from "./ProfileDropdown";
import Breadcrumbs from "./Breadcrumbs";

// Sun icon
const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z" />
  </svg>
);

// Moon icon
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
  </svg>
);

// Search icon
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
  </svg>
);

// Hamburger icon
const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

/**
 * Shared Navbar used on EVERY page.
 *
 * Props:
 *   isDark        – boolean
 *   toggleDark    – function
 *   session       – Supabase session (or null)
 *   onOpenAuth    – function to open the auth modal
 *   // App-only props (optional):
 *   curriculum    – array  (for GlobalSearch)
 *   onNavigateToTopic – function
 *   showAuthModal – boolean (to open auth modal from within the nav)
 *   setShowAuthModal – setter
 */
export default function Navbar({
  isDark,
  toggleDark,
  session,
  onOpenAuth,
  curriculum,
  onNavigateToTopic,
  setShowAuthModal,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isLanding = location.pathname === "/";
  const isApp = !isLanding;

  const handleLogoClick = () => {
    if (isLanding) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/subjects");
    }
    setMenuOpen(false);
  };

  const handleScrollToSubjects = () => {
    document.getElementById("subjs")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSearchNavigate = (subjectId, chapterId, topic) => {
    if (onNavigateToTopic) onNavigateToTopic(subjectId, chapterId, topic);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="lnav">
        {/* Logo */}
        <div className="lnav-logo" onClick={handleLogoClick}>
          <img src="/Tixar.jpeg" alt="Tixar Logo" className="logo-img" />
          <span className="lnav-brand">TIXAR</span>
        </div>

        {/* Desktop: breadcrumbs in the app (between logo and right-side controls) */}
        {isApp && (
          <div className="lnav-breadcrumbs">
            <Breadcrumbs />
          </div>
        )}

        {/* Desktop: search bar in the app */}
        {isApp && curriculum && (
          <div className="lnav-search-desktop">
            <GlobalSearch
              curriculum={curriculum}
              navigateToTopic={handleSearchNavigate}
            />
          </div>
        )}

        {/* Spacer on landing */}
        {isLanding && <div style={{ flex: 1 }} />}

        {/* Desktop right-side controls (always visible) */}
        <div className="lnav-desktop-controls">
          {/* Landing: Subjects scroll link */}
          {isLanding && (
            <button className="lnav-link-btn" onClick={handleScrollToSubjects}>
              Subjects
            </button>
          )}

          {/* App: Search icon (mobile only trigger) */}
          {isApp && curriculum && (
            <button
              className="lnav-search-icon"
              aria-label={searchOpen ? "Close search" : "Open search"}
              onClick={() => setSearchOpen((o) => !o)}
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
          )}

          {/* Dark mode toggle */}
          <button
            className="theme-toggle"
            onClick={toggleDark}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Auth / Profile */}
          {session ? (
            <ProfileDropdown />
          ) : (
            <button
              className="lnav-cta"
              onClick={() => {
                if (onOpenAuth) onOpenAuth();
                else if (setShowAuthModal) setShowAuthModal(true);
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}

          {/* App: Home button */}
          {isApp && (
            <button
              className="lnav-home-btn"
              onClick={() => { navigate("/"); setMenuOpen(false); }}
              aria-label="Go to Home"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="lnav-home-text">Home</span>
            </button>
          )}
        </div>

        {/* Hamburger – shown at ≤820px */}
        <button
          className="lnav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => { setMenuOpen((o) => !o); setSearchOpen(false); }}
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </nav>

      {/* Mobile search panel (drops below nav) */}
      {isApp && curriculum && searchOpen && (
        <div className="lnav-search-panel">
          <GlobalSearch
            curriculum={curriculum}
            navigateToTopic={handleSearchNavigate}
          />
        </div>
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lnav-drawer">
          {/* Breadcrumbs inside drawer when in app */}
          {isApp && (
            <div className="lnav-drawer-breadcrumbs">
              <Breadcrumbs />
            </div>
          )}

          {isLanding && (
            <button className="lnav-drawer-item" onClick={handleScrollToSubjects}>
              Subjects
            </button>
          )}

          <button
            className="lnav-drawer-item"
            onClick={() => { toggleDark(); }}
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {isApp && (
            <button
              className="lnav-drawer-item"
              onClick={() => { navigate("/"); setMenuOpen(false); }}
            >
              🏠 Home
            </button>
          )}

          {session ? (
            <div className="lnav-drawer-profile">
              <ProfileDropdown />
            </div>
          ) : (
            <button
              className="lnav-cta lnav-drawer-cta"
              onClick={() => {
                if (onOpenAuth) onOpenAuth();
                else if (setShowAuthModal) setShowAuthModal(true);
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </>
  );
}
