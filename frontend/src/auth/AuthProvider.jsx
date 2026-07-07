import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Restore initial session safely
    supabase.auth.getSession()
      .then(({ data: { session: existingSession } }) => {
        if (existingSession) {
          setSession(existingSession);
        }
        setSessionLoading(false);
      })
      .catch((err) => {
        console.error("Failed to restore session", err);
        setSessionLoading(false);
      });

    // Active auth listening channel
    let subscription;
    try {
      let isInitialCall = true;

      const result = supabase.auth.onAuthStateChange((event, newSession) => {
        setSession(newSession);
        setSessionLoading(false);

        if (event === "SIGNED_IN" && newSession) {
          const isAuthCallback =
            window.location.hash.includes("access_token=") ||
            window.location.search.includes("code=");
          const isOnLanding = window.location.pathname === "/";

          // Let the state engine absorb auth hooks before clearing location properties
          setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname);
          }, 500);

          if (!isInitialCall || isAuthCallback) {
            if (isOnLanding || isAuthCallback) {
              toast.success(`Welcome! Logged in as ${newSession.user.user_metadata?.full_name || newSession.user.email}`);
              setTimeout(() => navigate("/subjects"), 100);
            }
          }
        }
        
        if (event === "SIGNED_OUT") {
          // Session cleared
        }
        isInitialCall = false;
      });
      subscription = result?.data?.subscription;
    } catch (err) {
      console.error("Failed to set up auth listener", err);
      setTimeout(() => setSessionLoading(false), 0);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(`Logout failed: ${err.message}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        sessionLoading,
        showAuthModal,
        setShowAuthModal,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
