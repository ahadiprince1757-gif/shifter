import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const hasValidConfig = supabaseUrl && supabaseAnonKey && supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";

let supabaseInstance = null;

if (hasValidConfig) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
  }
} else {
  console.error(
    "Supabase is not configured properly! " +
    "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your frontend/.env file."
  );
}

// Export a proxy or safe object to prevent crashes on undefined properties
export const supabase = supabaseInstance || new Proxy({}, {
  get(target, prop) {
    if (prop === "auth") {
      return new Proxy({}, {
        get(authTarget, authProp) {
          return () => {
            console.error(`Attempted to call supabase.auth.${authProp} without valid config`);
            return Promise.reject(new Error("Supabase config is invalid or missing"));
          };
        }
      });
    }
    return () => {
      console.error(`Attempted to call supabase.${prop} without valid config`);
      return Promise.reject(new Error("Supabase config is invalid or missing"));
    };
  }
});
