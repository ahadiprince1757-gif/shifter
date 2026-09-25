import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import logger from "../utils/logger";
import toast from "react-hot-toast";

export default function WelcomeAuthScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("select"); // 'select' | 'email_signin' | 'email_signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      logger.action("GOOGLE_LOGIN_INITIATED");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
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

  const handleEmailAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
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
        try {
          localStorage.setItem("tixar_onboarded", "true");
        } catch {}
        navigate("/subjects");
      } else {
        logger.action("EMAIL_SIGNUP_INITIATED", "pending", { email });
        const { data, error } = await supabase.auth.signUp({
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
        logger.auth("success", "EMAIL_SIGNUP", { email });
        if (data?.session) {
          toast.success("Account created successfully!");
          navigate("/subjects");
        } else {
          toast.success("Verification link sent! Please check your email to complete registration.");
          setMode("email_signin");
        }
      }
    } catch (err) {
      const authAction = mode === "email_signin" ? "EMAIL_LOGIN" : "EMAIL_SIGNUP";
      logger.error(authAction, err, { email });
      toast.error(`Authentication failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 120px)",
        padding: "1.5rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "var(--sur)",
          border: "1px solid var(--bd)",
          borderRadius: "24px",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(116, 184, 232, 0.1)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <picture>
          <source srcSet="/tixar-logo.webp?v=4" type="image/webp" />
          <img
            src="/tixar-logo.png?v=4"
            alt="Tixar Logo"
            width="56"
            height="56"
            style={{
              borderRadius: "14px",
              marginBottom: "1rem",
              background: "#fff",
              padding: "4px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          />
        </picture>

        <h1
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.65rem",
            fontWeight: 800,
            color: "var(--t)",
            marginBottom: "0.4rem",
            letterSpacing: "-0.02em",
          }}
        >
          Welcome to Tixar
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--t2)",
            lineHeight: 1.5,
            marginBottom: "1.8rem",
            maxWidth: "340px",
          }}
        >
          Adaptive mastery learning across Math, Sciences, and Computing. Sign in to track your progress and sync across devices.
        </p>

        {mode === "select" ? (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {/* Google Login */}
            <button
              className="oauth-btn google-btn"
              onClick={handleGoogleLogin}
              style={{ width: "100%", justifyContent: "center" }}
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
            </button>

            {/* Email Login */}
            <button
              className="oauth-btn"
              onClick={() => setMode("email_signin")}
              style={{
                width: "100%",
                justifyContent: "center",
                borderColor: "var(--v)",
                color: "var(--v)",
                background: "rgba(117, 82, 243, 0.04)",
              }}
            >
              Continue with Email
            </button>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <button
              type="button"
              className="auth-back-btn"
              onClick={() => setMode("select")}
              style={{ marginBottom: "1rem" }}
            >
              ← Back to options
            </button>

            <form className="email-auth-form" onSubmit={handleEmailAuthSubmit}>
              {mode === "email_signup" && (
                <div className="auth-form-group">
                  <label className="auth-label">Full Name</label>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Your name"
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
                    : "Create Account"}
              </button>

              <button
                type="button"
                className="auth-toggle-link"
                onClick={() =>
                  setMode(mode === "email_signin" ? "email_signup" : "email_signin")
                }
              >
                {mode === "email_signin"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
