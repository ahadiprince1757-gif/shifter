import { useState, useEffect } from "react";
import { db } from "../utils/db";
import logger from "../utils/logger";
import toast from "react-hot-toast";

export function useMasteredTopics() {
  const [mastered, setMastered] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMastered() {
      try {
        const all = await db.mastered.toArray();
        const set = new Set(all.map((item) => item.topicKey));
        setMastered(set);
      } catch (err) {
        console.error("Failed to load mastered topics from IndexedDB", err);
        
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem("Tixar_mastered");
          if (saved) {
            setMastered(new Set(JSON.parse(saved)));
          }
        } catch {
          // Ignore fallback errors
        }
      } finally {
        setLoading(false);
      }
    }
    loadMastered();
  }, []);

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
