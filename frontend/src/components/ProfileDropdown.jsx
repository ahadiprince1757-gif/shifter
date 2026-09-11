import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useClickOutside } from "../hooks/useClickOutside";

export default function ProfileDropdown() {
  const { session, logout, setShowAuthModal, openAuthWithReason } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setProfileMenuOpen(false));

  const handleOpenAuth = (reason) => {
    setProfileMenuOpen(false);
    if (openAuthWithReason && reason) {
      openAuthWithReason(reason);
    } else if (setShowAuthModal) {
      setShowAuthModal(true);
    }
  };

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    await logout();
  };

  // Signed In User Details
  const userEmail = session?.user?.email || "";
  const userAvatar = session?.user?.user_metadata?.avatar_url || "/Tixar.jpeg";
  const userName =
    session?.user?.user_metadata?.full_name ||
    (userEmail ? userEmail.split("@")[0] : "Student");
  const provider = session?.user?.app_metadata?.provider || "Google";

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      {session ? (
        <button
          className="profile-trigger profile-trigger--auth"
          onClick={() => setProfileMenuOpen((prev) => !prev)}
          aria-expanded={profileMenuOpen}
          aria-label="User account menu"
        >
          <img
            src={userAvatar}
            alt={userName}
            className="profile-avatar"
            onError={(e) => {
              e.target.src = "/Tixar.jpeg";
            }}
          />
          <span className="profile-email-lbl">{userName}</span>
          <svg
            className={`profile-chevron ${profileMenuOpen ? "profile-chevron--open" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            width="14"
            height="14"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button
          className="profile-trigger profile-trigger--guest"
          onClick={() => setProfileMenuOpen((prev) => !prev)}
          aria-expanded={profileMenuOpen}
          aria-label="Sign in or account options"
        >
          <div className="profile-guest-icon">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <span className="profile-email-lbl profile-email-lbl--guest">
            Sign In
          </span>
          <svg
            className={`profile-chevron ${profileMenuOpen ? "profile-chevron--open" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            width="14"
            height="14"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {profileMenuOpen && (
        <div className="profile-dropdown-menu">
          {session ? (
            <>
              <div className="profile-info-header">
                <div className="profile-info-name">{userName}</div>
                <div className="profile-info-email">{userEmail}</div>
                <div className="profile-info-status">
                  Signed in via {provider}
                </div>
              </div>
              <button
                className="profile-menu-item"
                onClick={() => {
                  navigate("/verification");
                  setProfileMenuOpen(false);
                }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                Verify Session
              </button>
              <button
                className="profile-menu-item profile-menu-item--logout"
                onClick={handleLogout}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
                Log Out
              </button>
            </>
          ) : (
            <>
              <div className="profile-info-header">
                <div className="profile-info-email" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                  Account & Sync
                </div>
                <div className="profile-info-status" style={{ marginTop: "0.25rem", lineHeight: "1.4" }}>
                  Sign in to save your learning history, access smart analytics, and sync across devices.
                </div>
              </div>

              <div className="profile-guest-actions">
                <button
                  className="profile-btn-primary"
                  onClick={() =>
                    handleOpenAuth("Sign in to save your learning progress and sync across devices.")
                  }
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                  Sign In / Log In
                </button>
                <button
                  className="profile-btn-secondary"
                  onClick={() =>
                    handleOpenAuth("Create an account to track your mastery.")
                  }
                >
                  Create Account
                </button>
              </div>

              <div className="profile-guest-badge">
                <span className="profile-guest-dot" />
                Offline Guest Mode Active
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
