import { useState } from "react";
import { supabase } from "../supabase";
import logger from "../utils/logger";
import toast from "react-hot-toast";

export default function AuthModal({ isOpen, onClose, onGuestAccess }) {
  // Navigation is handled centrally by App.jsx's onAuthStateChange listener
  const [mode, setMode] = useState("select"); // 'select' | 'email_signin' | 'email_signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      logger.action("GOOGLE_LOGIN_INITIATED");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Dynamically redirect back to the current application origin
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      logger.auth("success", "GOOGLE_LOGIN");
    } catch (err) {
      logger.error("GOOGLE_LOGIN", err);
      logger.auth("failed", "GOOGLE_LOGIN", { errorMessage: err.message });
      toast.error(`Google Login failed: ${err.message}`);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      logger.action("FACEBOOK_LOGIN_INITIATED");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          // Dynamically redirect back to the current application origin
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      logger.auth("success", "FACEBOOK_LOGIN");
    } catch (err) {
      logger.error("FACEBOOK_LOGIN", err);
      logger.auth("failed", "FACEBOOK_LOGIN", { errorMessage: err.message });
      toast.error(`Facebook Login failed: ${err.message}`);
    }
  };

  const handleEmailAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      logger.action("EMAIL_AUTH_SUBMIT", "failed", {
        reason: "missing_fields",
      });
      return;
    }
    setLoading(true);

    try {
      if (mode === "email_signin") {
        logger.action("EMAIL_LOGIN_INITIATED", "pending", { email });
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        logger.auth("success", "EMAIL_LOGIN", { email });
        logger.action("EMAIL_LOGIN", "success", { email });
        // Just close the modal — App.jsx onAuthStateChange will navigate to /subjects
        onClose();
      } else {
        // Signup
        logger.action("EMAIL_SIGNUP_INITIATED", "pending", { email });
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || email.split("@")[0],
            },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        logger.auth("success", "EMAIL_SIGNUP", {
          email,
          hasFullName: !!fullName,
        });
        logger.action("EMAIL_SIGNUP", "success", { email });
        toast.success(
          "Verification link sent! Please check your email to complete registration.",
        );
        setMode("email_signin");
      }
    } catch (err) {
      const authAction =
        mode === "email_signin" ? "EMAIL_LOGIN" : "EMAIL_SIGNUP";
      logger.error(authAction, err, { email });
      logger.auth("failed", authAction, { email, errorMessage: err.message });
      toast.error(`Authentication failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setMode("select");
    setEmail("");
    setPassword("");
    setFullName("");
  };

  return (
    <div
      className="auth-overlay"
      onClick={() => {
        resetForm();
        onClose();
      }}
    >
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="auth-close"
          onClick={() => {
            resetForm();
            onClose();
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <img src="/Tixar.jpeg" alt="Tixar Logo" className="auth-logo" />

        {mode === "select" ? (
          <>
            <h2 className="auth-title">Sign In to Tixar</h2>
            <p className="auth-desc">
              Sign in to save your learning progress, view analytics, and verify
              your credentials.
            </p>

            <div className="auth-buttons-list">
              {/* Active Google Login */}
              <button
                className="oauth-btn google-btn"
                onClick={handleGoogleLogin}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.08 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.51l4.11 3.15c.94-2.85 3.57-4.91 6.68-4.91z"
                  />
                </svg>
                Continue with Google
                <span
                  className="provider-badge"
                  style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--gr)",
                  }}
                >
                  Active
                </span>
              </button>

              {/* Active Facebook Login */}
              <button
                className="oauth-btn"
                onClick={handleFacebookLogin}
                style={{
                  borderColor: "#1877f2",
                  color: "#1877f2",
                  background: "rgba(24, 119, 242, 0.04)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
                <span
                  className="provider-badge"
                  style={{
                    background: "rgba(24, 119, 242, 0.12)",
                    color: "#1877f2",
                  }}
                >
                  Active
                </span>
              </button>

              {/* Active Email Login */}
              <button
                className="oauth-btn"
                onClick={() => setMode("email_signin")}
                style={{
                  borderColor: "var(--v)",
                  color: "var(--v)",
                  background: "rgba(117, 82, 243, 0.04)",
                }}
              >
                <span>Continue with Email</span>
                <span
                  className="provider-badge"
                  style={{
                    background: "rgba(117, 82, 243, 0.12)",
                    color: "var(--v)",
                  }}
                >
                  Active
                </span>
              </button>

              {/* Apple (Soon) */}
              <button className="oauth-btn disabled-btn" disabled>
                <span>Continue with Apple</span>
                <span className="provider-badge">Soon</span>
              </button>

              <button
                className="oauth-btn guest-btn"
                onClick={async () => {
                  logger.action("GUEST_ACCESS_REQUESTED");
                  onClose();
                  if (supabase.isMock) {
                    await supabase.auth.signInWithPassword({
                      email: "guest@tixar.app",
                      password: "guest"
                    });
                  }
                  if (onGuestAccess) onGuestAccess();
                }}
                style={{
                  borderStyle: "dashed",
                  borderColor: "var(--v)",
                  background: "rgba(117, 82, 243, 0.05)",
                  color: "var(--v)",
                  marginTop: "0.4rem",
                }}
              >
                <span>Explore as Guest</span>
                <span
                  className="provider-badge"
                  style={{
                    background: "rgba(117, 82, 243, 0.12)",
                    color: "var(--v)",
                  }}
                >
                  Free
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="auth-back-btn" onClick={resetForm}>
              ← Back to options
            </button>
            <h2 className="auth-title" style={{ fontSize: "1.3rem" }}>
              {mode === "email_signin"
                ? "Sign In with Email"
                : "Create Tixar Account"}
            </h2>
            <p className="auth-desc" style={{ marginBottom: "1rem" }}>
              {mode === "email_signin"
                ? "Enter your credentials to sign in."
                : "Create an account to save learning progress."}
            </p>

            <form className="email-auth-form" onSubmit={handleEmailAuthSubmit}>
              {mode === "email_signup" && (
                <div className="auth-form-group">
                  <label className="auth-label">Full Name</label>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="auth-form-group">
                <label className="auth-label">Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "email_signin"
                    ? "Sign In"
                    : "Sign Up"}
              </button>

              <button
                type="button"
                className="auth-toggle-link"
                onClick={() =>
                  setMode(
                    mode === "email_signin" ? "email_signup" : "email_signin",
                  )
                }
              >
                {mode === "email_signin"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </form>
          </>
        )}

        <p className="auth-footer">
          By signing in, you agree to Tixar's legal guidelines, privacy
          framework.
        </p>
      </div>
    </div>
  );
}
