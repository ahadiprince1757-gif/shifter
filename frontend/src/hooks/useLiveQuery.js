import { useState, useEffect, useRef } from "react";
import { liveQuery } from "dexie";

/**
 * React 19 compliant useLiveQuery hook.
 * Replaces dexie-react-hooks to avoid its broken default React import.
 */
export function useLiveQuery(querier, deps, defaultResult) {
  const [result, setResult] = useState(defaultResult);
  const [error, setError] = useState(null);
  const depsRef = useRef(deps);
  const querierRef = useRef(querier);

  // Keep refs up to date
  querierRef.current = querier;

  // Check if deps actually changed
  const depsChanged = !depsEqual(depsRef.current, deps);
  if (depsChanged) {
    depsRef.current = deps;
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  if (error) {
    console.error("useLiveQuery threw:", error);
    // Don't throw — return default so the app doesn't crash
    return defaultResult;
  }

  return result;
}

function depsEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}
