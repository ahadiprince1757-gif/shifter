import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || "";

const hasValidConfig = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY"
);

let supabaseInstance = null;
let currentSession = null;

if (hasValidConfig) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    
    // Listen for auth state changes to keep currentSession updated
    supabaseInstance.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        currentSession = null;
      } else {
        currentSession = session;
      }
    });
  } catch (err) {
    console.warn("Notice: Failed to initialize Supabase client:", err.message || err);
  }
}

/**
 * Creates a graceful, non-crashing query builder for offline / unconfigured environments.
 */
function createSafeQueryBuilder() {
  const handler = {
    get(target, prop) {
      if (prop === "then") {
        return (resolve) => resolve({ data: [], error: null });
      }
      if (prop === "catch") {
        return () => Promise.resolve({ data: [], error: null });
      }
      return (..._args) => new Proxy({}, handler);
    }
  };
  return new Proxy({}, handler);
}

// Export a proxy or safe object to prevent crashes on undefined properties
export const supabase = supabaseInstance || {
  auth: {
    getSession: async () => ({ data: { session: getActiveSession() }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    getUser: async () => ({ data: { user: getActiveSession()?.user || null }, error: null }),
    signInWithOAuth: async () => ({ data: null, error: new Error("Authentication is currently offline.") }),
    signInWithPassword: async () => ({ data: null, error: new Error("Authentication is currently offline.") }),
    signUp: async () => ({ data: null, error: new Error("Authentication is currently offline.") }),
    signOut: async () => {
      currentSession = null;
      try {
        localStorage.removeItem("shifter_cached_session");
        localStorage.removeItem("shifter_current_user_id");
      } catch {}
      return { error: null };
    },
  },
  from: () => createSafeQueryBuilder(),
};

export function getActiveSession() {
  if (!currentSession) {
    try {
      const raw = localStorage.getItem("shifter_cached_session");
      if (raw) currentSession = JSON.parse(raw);
    } catch {
      // Ignore JSON parse errors
    }
  }
  return currentSession;
}

/** Canonical helper to retrieve active user UUID across Supabase session and local identity cache */
export function getActiveUserId() {
  const session = getActiveSession();
  return (
    session?.user?.id ||
    session?.user_id ||
    (typeof localStorage !== "undefined" ? localStorage.getItem("shifter_current_user_id") : null) ||
    null
  );
}

/** Identity enforcement helper that throws if no authenticated user is present */
export function requireUserId(userId = null) {
  const resolvedId = userId || getActiveUserId();
  if (!resolvedId) {
    throw new Error("[Tixar Identity] A valid user ID is required for this operation.");
  }
  return resolvedId;
}
