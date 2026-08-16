import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import ProfileDropdown from "./ProfileDropdown";
import Breadcrumbs from "./Breadcrumbs";
import { useAuth } from "../hooks/useAuth";

// Icons
const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7v1a2 2 0 01-2 2h-1v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1H5a2 2 0 01-2-2v-1a7 7 0 017-7h1V5.73A2.001 2.001 0 0112 2zm-3 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

const ProgressIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
  </svg>
);

const MistakesIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

// Navigation items used in desktop tabs and mobile drawer
const APP_NAV_ITEMS = [
  { path: "/subjects", label: "Subjects", icon: HomeIcon },
  { path: "/tutor", label: "AI Tutor", icon: BotIcon },
  { path: "/mistakes", label: "Mistakes", icon: MistakesIcon },
  { path: "/analytics", label: "Progress", icon: ProgressIcon },
];

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
  const { openAuthWithReason } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 15) {
        setIsVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) > 8) {
        setIsVisible(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };
    const handleTap = () => setIsVisible(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleTap, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleTap);
    };
  }, [lastScrollY]);

  const isHeaderVisible = isVisible || menuOpen || searchOpen;
  const isLanding = location.pathname === "/";
  const isApp = !isLanding;

  const handleLogoClick = () => {
    isLanding ? window.scrollTo({ top: 0, behavior: "smooth" }) : navigate("/subjects");
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

  const handleSignIn = () => {
    const reason = "Sign in to save your learning progress, view analytics, and sync your scores across devices.";
    if (openAuthWithReason) openAuthWithReason(reason);
    else if (onOpenAuth) onOpenAuth();
    else if (setShowAuthModal) setShowAuthModal(true);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`lnav ${isHeaderVisible ? "" : "lnav-hidden"}`}>
        {/* Logo */}
        <div className="lnav-logo" onClick={handleLogoClick}>
          <img src="/tixar-logo.png?v=3" alt="Tixar Logo" className="logo-img" />
          <span className="lnav-brand">TIXAR</span>
        </div>

        {/* Desktop: breadcrumbs in app */}
        {isApp && (
          <div className="lnav-breadcrumbs">
            <Breadcrumbs />
          </div>
        )}

        {/* Desktop: search bar in app */}
        {isApp && curriculum && (
          <div className="lnav-search-desktop">
            <GlobalSearch curriculum={curriculum} navigateToTopic={handleSearchNavigate} />
          </div>
        )}

        {/* Landing spacer */}
        {isLanding && <div style={{ flex: 1 }} />}

        {/* Desktop navigation tabs (app only) */}
        {isApp && (
          <nav className="lnav-nav-links" aria-label="Main navigation">
            {APP_NAV_ITEMS.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path ||
                (path === "/tutor" && location.pathname === "/ai-tutor");
              return (
                <button
                  key={path}
                  className={`lnav-tab-btn ${isActive ? "lnav-tab-btn--active" : ""}`}
                  onClick={() => { navigate(path); setMenuOpen(false); }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon />
                  {label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right side controls */}
        <div className="lnav-desktop-controls">
          {/* Landing: subjects scroll */}
          {isLanding && (
            <button className="lnav-link-btn" onClick={handleScrollToSubjects}>
              Subjects
            </button>
          )}

          {/* App: search icon (mobile trigger) */}
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
          <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Auth / Profile */}
          {session ? (
            <ProfileDropdown />
          ) : (
            <button className="lnav-guest-pill" onClick={handleSignIn}>
              <span className="lnav-guest-action" style={{ fontWeight: 600 }}>Sign In</span>
            </button>
          )}
        </div>

        {/* Hamburger – shown on mobile */}
        <button
          className="lnav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => { setMenuOpen((o) => !o); setSearchOpen(false); }}
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </nav>

      {/* Mobile search panel */}
      {isApp && curriculum && searchOpen && (
        <div className="lnav-search-panel">
          <GlobalSearch curriculum={curriculum} navigateToTopic={handleSearchNavigate} />
        </div>
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lnav-drawer">
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

          {/* App nav links in drawer */}
          {isApp && APP_NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path ||
              (path === "/tutor" && location.pathname === "/ai-tutor");
            return (
              <button
                key={path}
                className="lnav-drawer-item"
                style={{
                  color: isActive ? "var(--v)" : undefined,
                  fontWeight: isActive ? 600 : undefined,
                }}
                onClick={() => { navigate(path); setMenuOpen(false); }}
              >
                <Icon />
                {" "}{label}
              </button>
            );
          })}

          <button className="lnav-drawer-item" onClick={() => { toggleDark(); }}>
            {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {session ? (
            <div className="lnav-drawer-profile">
              <ProfileDropdown />
            </div>
          ) : (
            <button className="lnav-cta lnav-drawer-cta" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </div>
      )}
    </>
  );
}
