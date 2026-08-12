import { useState, useEffect } from "react";
import { db } from "../utils/db";
import { useAuth } from "./useAuth";
import { fetchProgress } from "../api";
import toast from "react-hot-toast";

export function useMasteredTopics() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [mastered, setMastered] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadMastered() {
      if (!userId) {
        if (!isCancelled) {
          setMastered(new Set());
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      // Check if user changed before loading cached data
      const cachedUserId = localStorage.getItem("shifter_current_user_id");
      const isDifferentUser = cachedUserId && cachedUserId !== userId;

      // 1. If different user, wipe local DB immediately so old user data is never loaded
      if (isDifferentUser) {
        await db.mastered.clear().catch(() => {});
        localStorage.removeItem("Tixar_mastered");
        if (!isCancelled) setMastered(new Set());
      } else {
        // Load local cached state for fast offline UI
        try {
          const all = await db.mastered.toArray();
          if (!isCancelled && all.length > 0) {
            setMastered(new Set(all.map((item) => item.topicKey)));
          }
        } catch (err) {
          console.error("Failed to load mastered topics from IndexedDB", err);
        }
      }

      // 2. Fetch user's latest progress from Supabase if online
      try {
        const remoteProgress = await fetchProgress();
        if (!isCancelled && Array.isArray(remoteProgress)) {
          const masteredKeys = new Set();
          const dbEntries = [];

          for (const item of remoteProgress) {
            if (item.mastered && item.topicKey) {
              masteredKeys.add(item.topicKey);
              dbEntries.push({ topicKey: item.topicKey });
            }
          }

          // ALWAYS sync state and local DB with remote response (even if 0 items for new user)
          setMastered(masteredKeys);
          await db.mastered.clear().catch(() => {});
          if (dbEntries.length > 0) {
            await db.mastered.bulkPut(dbEntries).catch(() => {});
          }
          try {
            localStorage.setItem("Tixar_mastered", JSON.stringify([...masteredKeys]));
            localStorage.setItem("shifter_current_user_id", userId);
          } catch {}
        }
      } catch (err) {
        console.warn("Could not sync remote progress (offline?):", err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }

    }

    loadMastered();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  const markMastered = async (topicKey) => {
    // Optimistic state update
    setMastered((prev) => {
      const next = new Set(prev);
      next.add(topicKey);
      return next;
    });

    try {
      await db.mastered.put({ topicKey });

      // Sync to localStorage as a fallback
      try {
        const saved = localStorage.getItem("Tixar_mastered");
        const currentSet = saved ? new Set(JSON.parse(saved)) : new Set();
        currentSet.add(topicKey);
        localStorage.setItem("Tixar_mastered", JSON.stringify([...currentSet]));
      } catch {
        // Ignore fallback errors
      }
    } catch (err) {
      console.error("Failed to save mastered topic to IndexedDB", err);
      toast.error("Failed to save progress offline.");
    }
  };

  return { mastered, markMastered, loading };
}

