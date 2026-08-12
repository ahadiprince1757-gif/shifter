import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

import { db as tixarDb } from "../utils/db";
import { db as shifterDb } from "../db/db";

const SESSION_CACHE_KEY = "shifter_cached_session";
const CURRENT_USER_ID_KEY = "shifter_current_user_id";

/** Wipe all local storage & IndexedDB user-scoped caches when switching accounts or logging out. */
export async function clearUserDataForUserSwitch() {
  try {
    await Promise.all([
      tixarDb.mastered.clear().catch(() => {}),
      shifterDb.user_progress.clear().catch(() => {}),
      shifterDb.user_mistakes.clear().catch(() => {}),
      shifterDb.user_notes.clear().catch(() => {}),
      shifterDb.spaced_reviews.clear().catch(() => {}),
    ]);
    localStorage.removeItem("Tixar_mastered");
    localStorage.removeItem("lastTopic");
    localStorage.removeItem("shifter_guest_quiz_count");
    localStorage.removeItem(CURRENT_USER_ID_KEY);
  } catch (err) {
    console.error("Error clearing user data for switch:", err);
  }
}

/** Read the last known session from localStorage synchronously (works offline). */
function readCachedSession() {
  try {
    const raw = localStorage.getItem(SESSION_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Persist session to localStorage so it survives network outages. */
function cacheSession(session) {
  try {
    if (session) {
      localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_CACHE_KEY);
    }
  } catch {
    // localStorage may be unavailable in private browsing — fail silently
  }
}

export function AuthProvider({ children }) {
  // Initialise immediately from cache — no network required
  const [session, setSession] = useState(() => readCachedSession());
  // If we already have a cached session, mark loading as done straight away
  const [sessionLoading, setSessionLoading] = useState(() => readCachedSession() === null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authReason, setAuthReason] = useState(null);
  const navigate = useNavigate();

  const openAuthWithReason = (reason) => {
    setAuthReason(reason);
    setShowAuthModal(true);
  };

  useEffect(() => {
    // Try to get the live session from Supabase (may fail if offline — that's OK,
    // we already have the cached session in state above).
    supabase.auth.getSession()
      .then(({ data: { session: existingSession } }) => {
        if (existingSession) {
          const prevUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
          const newUserId = existingSession.user?.id;
          if (prevUserId && newUserId && prevUserId !== newUserId) {
            clearUserDataForUserSwitch();
          }
          if (newUserId) {
            localStorage.setItem(CURRENT_USER_ID_KEY, newUserId);
          }
          setSession(existingSession);
          cacheSession(existingSession);
        }
        setSessionLoading(false);
      })
      .catch((err) => {
        // Offline or Supabase unreachable — rely on cached session loaded above
        console.warn("Could not reach Supabase for session (offline?)", err.message);
        setSessionLoading(false);
      });

    // Active auth state listener
    let subscription;
    try {
      let isInitialCall = true;

      const result = supabase.auth.onAuthStateChange((event, newSession) => {
        const prevUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
        const newUserId = newSession?.user?.id;

        if (newSession) {
          if (prevUserId && newUserId && prevUserId !== newUserId) {
            clearUserDataForUserSwitch();
          }
          if (newUserId) {
            localStorage.setItem(CURRENT_USER_ID_KEY, newUserId);
          }
          setSession(newSession);
          setSessionLoading(false);
          cacheSession(newSession);

          const isAuthCallback =
            window.location.hash.includes("access_token=") ||
            window.location.search.includes("code=");
          const isOnLanding = window.location.pathname === "/";

          setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname);
          }, 500);

          if (!isInitialCall || isAuthCallback) {
            toast.success(
              `Welcome! Logged in as ${newSession.user.user_metadata?.full_name || newSession.user.email}`
            );

            if (isOnLanding || isAuthCallback) {
              setTimeout(() => navigate("/subjects"), 100);
            }
            setShowAuthModal(false);
          }
        } else if (event === "SIGNED_OUT" || !newSession) {
          if (event === "SIGNED_OUT") {
            clearUserDataForUserSwitch();
            cacheSession(null);
            setSession(null);
            setSessionLoading(false);
          }
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
      await clearUserDataForUserSwitch();
      await supabase.auth.signOut();
      cacheSession(null); // Clear offline cache on explicit logout
      setSession(null);
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
        authReason,
        setAuthReason,
        openAuthWithReason,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
