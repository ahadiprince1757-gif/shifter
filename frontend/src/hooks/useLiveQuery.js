import { useState, useEffect, useRef } from "react";
import { liveQuery } from "dexie";

/**
 * React 19 compliant useLiveQuery hook.
 * Replaces dexie-react-hooks to avoid its broken default React import.
 */
export function useLiveQuery(querier, deps, defaultResult) {
  const [result, setResult] = useState(defaultResult);
  const [error, setError] = useState(null);
  const querierRef = useRef(querier);

  // Keep querierRef updated after render safely
  useEffect(() => {
    querierRef.current = querier;
  });

  // Serialize deps to a string for use as effect dependency
  const depsKey = JSON.stringify(deps || []);

  useEffect(() => {
    let cancelled = false;
    const observable = liveQuery(() => querierRef.current());
    const subscription = observable.subscribe({
      next: (val) => {
        if (!cancelled) {
          setResult(val);
          setError(null);
        }
      },
      error: (err) => {
        if (!cancelled) {
          console.error("useLiveQuery error:", err);
          setError(err);
        }
      },
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [depsKey]);

  if (error) {
    console.error("useLiveQuery threw:", error);
    // Don't throw — return default so the app doesn't crash
    return defaultResult;
  }

  return result;
}

