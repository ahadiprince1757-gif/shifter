import { Suspense, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import GlobalSearch from "./GlobalSearch";
import ProfileDropdown from "./ProfileDropdown";
import AuthModal from "./AuthModal";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import { useDarkMode } from "../hooks/useDarkMode";
import SkeletonLoader from "./SkeletonLoader";

export default function AppLayout() {
  const { session, showAuthModal, setShowAuthModal } = useAuth();
  const { curriculum } = useCurriculum();
  const [isDark, toggleDark] = useDarkMode();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const navigateToTopic = (subjectId, chapterId, topic) => {
    navigate(`/learn/${subjectId}/${chapterId}/${encodeURIComponent(topic)}`);
    setSearchOpen(false);
  };

  return (
    <div id="app-screen" className="screen active">
      <div className="app-bar">
        {/* Logo */}
        <div className="app-logo" onClick={() => navigate("/subjects")}>
          <img src="/Tixar.jpeg" alt="Tixar Logo" className="logo-img" />
          <span className="app-brand">Tixar</span>
        </div>

        {/* Breadcrumbs – hidden on small screens */}
        <div className="app-bar-breadcrumbs">
          <Breadcrumbs />
        </div>

        {/* Search – full on desktop, icon-toggle on mobile */}
        <div className={`app-bar-search${searchOpen ? " mobile-open" : ""}`}>
          <GlobalSearch curriculum={curriculum} navigateToTopic={navigateToTopic} />
        </div>

        {/* Search icon toggle – only visible on mobile */}
        <button
          className="app-bar-search-toggle"
          aria-label={searchOpen ? "Close search" : "Open search"}
          onClick={() => setSearchOpen((o) => !o)}
        >
          {searchOpen ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          )}
        </button>

        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle Dark Mode">
          {isDark ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
            </svg>
          )}
        </button>

        {/* Auth / Profile */}
        {session ? (
          <ProfileDropdown />
        ) : (
          <button
            className="lnav-cta"
            style={{ fontSize: "0.72rem", padding: "0.35rem 0.9rem" }}
            onClick={() => setShowAuthModal(true)}
          >
            Sign In
          </button>
        )}

        {/* Home button */}
        <button className="home-btn" onClick={() => navigate("/")} aria-label="Go back to Home">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="home-btn-text">Home</span>
        </button>
      </div>

      <div id="app-content">
        <Suspense fallback={<SkeletonLoader type="list" count={4} />}>
          <Outlet />
        </Suspense>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGuestAccess={() => navigate("/subjects")}
      />
    </div>
  );
}
