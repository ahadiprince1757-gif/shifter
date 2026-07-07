import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useClickOutside } from "../hooks/useClickOutside";

export default function ProfileDropdown() {
  const { session, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setProfileMenuOpen(false));

  if (!session) return null;

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <button className="profile-trigger" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
        <img
          src={session.user.user_metadata?.avatar_url || "/Tixar.jpeg"}
          alt="Google Avatar"
          className="profile-avatar"
        />
        <span className="profile-email-lbl">{session.user.email}</span>
      </button>
      {profileMenuOpen && (
        <div className="profile-dropdown-menu">
          <div className="profile-info-header">
            <div className="profile-info-email">{session.user.email}</div>
            <div className="profile-info-status">
              Signed in via {session.user.app_metadata?.provider || "Google"}
            </div>
          </div>
          <button
            className="profile-menu-item"
            style={{ color: "var(--t2)" }}
            onClick={() => {
              navigate("/verification");
              setProfileMenuOpen(false);
            }}
          >
            Verify Session
          </button>
          <button
            className="profile-menu-item"
            onClick={async () => {
              await logout();
              setProfileMenuOpen(false);
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
