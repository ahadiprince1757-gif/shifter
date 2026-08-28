import { useState, useEffect, useCallback } from "react";
import { computeNextAction } from "../utils/nextActionEngine";

/**
 * useNextAction
 *
 * React hook that wraps the next action engine.
 * Re-computes whenever userId changes or when refresh() is called
 * (e.g. after a quiz session completes).
 *
 * Returns:
 *   action  — the computed action object, or null if nothing is urgent
 *   loading — true while computing
 *   refresh — call this after a quiz to re-evaluate urgency
 */
export function useNextAction(userId) {
  const [action, setAction] = useState(undefined); // undefined = not yet computed
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);

  const refresh = useCallback(() => {
    setRevision((r) => r + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setLoading(true);
    });
    computeNextAction(userId)
      .then((result) => {
        if (!cancelled) {
          setAction(result); // null means nothing urgent
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAction(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [userId, revision]);

  return { action, loading, refresh };
}
