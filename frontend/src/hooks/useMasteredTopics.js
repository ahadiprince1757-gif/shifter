import { useState, useEffect } from "react";
import { db } from "../utils/db";
import { useAuth } from "./useAuth";
import { fetchProgress, saveProgress } from "../api";
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

      const userStorageKey = `Tixar_mastered_${userId}`;
      const cachedUserId = localStorage.getItem("shifter_current_user_id");
      const isDifferentUser = cachedUserId && cachedUserId !== userId;

      // 1. Load user-scoped local cached state for fast offline UI
      try {
        if (isDifferentUser) {
          // Switching user: reset local memory state first
          if (!isCancelled) setMastered(new Set());
        }
        
        let all = [];
        try {
          if (db.mastered.schema?.indexes?.some((idx) => idx.name === "userId")) {
            all = await db.mastered.where("userId").equals(userId).toArray();
          } else {
            const rawAll = await db.mastered.toArray();
            all = rawAll.filter((item) => item.userId === userId || !item.userId);
          }
        } catch {
          all = await db.mastered.toArray();
        }

        const userKeys = new Set(
          all
            .filter((item) => item.userId === userId)
            .map((item) => item.topicKey)
            .filter(Boolean)
        );

        if (!isCancelled && userKeys.size > 0) {
          setMastered(userKeys);
        }
      } catch (err) {
        console.error("Failed to load mastered topics from IndexedDB", err);
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
              dbEntries.push({ userId, topicKey: item.topicKey });
            }
          }

          // ALWAYS sync state and local DB with remote response for THIS user
          setMastered(masteredKeys);

          // Clear old records for this user or legacy unassigned entries
          try {
            const allItems = await db.mastered.toArray();
            const keysToDelete = allItems
              .filter((i) => i.userId === userId || !i.userId)
              .map((i) => (i.userId ? [i.userId, i.topicKey] : i.topicKey));
            if (keysToDelete.length > 0) {
              await db.mastered.bulkDelete(keysToDelete).catch(() => {});
            }
          } catch (err) {
            console.debug("Error clearing legacy mastered entries", err);
          }

          if (dbEntries.length > 0) {
            await db.mastered.bulkPut(dbEntries).catch(() => {});
          }

          try {
            localStorage.setItem(userStorageKey, JSON.stringify([...masteredKeys]));
            localStorage.setItem("shifter_current_user_id", userId);
          } catch (err) {
            console.debug("Error writing mastered topics to localStorage", err);
          }
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

  /**
   * Mark a topic as mastered.
   * @param {string} topicKey  — format: "${sid}|${cid}|${topicTitle}"
   * @param {{ sid: string, cid: string, topicTitle: string }} [meta] — needed to sync to Supabase
   */
  const markMastered = async (topicKey, meta = {}) => {
    if (!userId) return;

    // Optimistic state update
    setMastered((prev) => {
      const next = new Set(prev);
      next.add(topicKey);
      return next;
    });

    const userStorageKey = `Tixar_mastered_${userId}`;

    try {
      await db.mastered.put({ userId, topicKey });

      // Sync to localStorage as a fallback per user
      try {
        const saved = localStorage.getItem(userStorageKey);
        const currentSet = saved ? new Set(JSON.parse(saved)) : new Set();
        currentSet.add(topicKey);
        localStorage.setItem(userStorageKey, JSON.stringify([...currentSet]));
      } catch {
        // Ignore fallback errors
      }
    } catch (err) {
      console.error("Failed to save mastered topic to IndexedDB", err);
      toast.error("Failed to save progress offline.");
    }

    // Sync mastery to Supabase progress table
    // Parse meta from the topicKey if not provided explicitly
    let { sid, cid, topicTitle } = meta;
    if (!sid || !cid || !topicTitle) {
      const parts = topicKey.split("|");
      if (parts.length === 3) {
        [sid, cid, topicTitle] = parts;
      }
    }

    if (sid && cid && topicTitle) {
      saveProgress({
        sid,
        cid,
        topicTitle,
        completed: true,
        mastered: true,
        score: 100,
      }).catch(() => {}); // fire-and-forget
    }
  };

  return { mastered, markMastered, loading };
}
