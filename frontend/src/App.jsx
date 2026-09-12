import { useEffect } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { syncEngine } from "./sync/syncEngine";
import { useAuth } from "./hooks/useAuth";
import { db } from "./db/db";

/**
 * SyncOnLogin
 *
 * Mounted inside AuthProvider so it can read the session.
 * Fires a full syncAll() whenever the authenticated user ID changes
 * (login, user switch). This guarantees that a new user who has just
 * signed in gets their curriculum pulled with a valid auth token —
 * fixing the blank subject list that occurred when the initial mount-
 * time sync ran before the session was available.
 */
function SyncOnLogin() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;

  useEffect(() => {
    if (!userId) return;
    syncEngine.syncAll().catch((err) =>
      console.warn("[SyncOnLogin] Re-sync after login failed:", err)
    );
  }, [userId]);

  return null;
}

function App() {
  // Only trigger sync on cold mount if local curriculum is empty (first install/visit).
  // Returning users render instantly from Dexie IndexedDB cache;
  // SyncOnLogin handles authoritative post-login sync with staleness guard.
  useEffect(() => {
    db.curriculum.count().then((count) => {
      if (count === 0) {
        syncEngine.syncAll({ force: true }).catch((err) =>
          console.warn("[App] Initial first-time sync failed:", err)
        );
      }
    }).catch(() => {});
  }, []);

  // Handle global double-tap (mobile) or double-click (desktop) to zoom in/out
  useEffect(() => {
    let lastTap = 0;

    const handleTouchEnd = (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        const target = e.target;
        if (target.closest('button, input, textarea, select, a, [role="button"]')) {
          return;
        }
        e.preventDefault();
        document.documentElement.classList.toggle("app-zoomed");
      }
      lastTap = currentTime;
    };

    const handleDblClick = (e) => {
      const target = e.target;
      if (target.closest('button, input, textarea, select, a, [role="button"]')) {
        return;
      }
      document.documentElement.classList.toggle("app-zoomed");
    };

    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("dblclick", handleDblClick);

    return () => {
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("dblclick", handleDblClick);
    };
  }, []);

  return (
    <AuthProvider>
      {/* Runs inside AuthProvider so it can read the session */}
      <SyncOnLogin />
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--sur)",
            color: "var(--t)",
            border: "1px solid var(--bd)",
            borderRadius: "12px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;