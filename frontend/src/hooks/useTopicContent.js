import { useState, useEffect, useCallback } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { topicRepo } from "../repository/topicRepo";
import { syncEngine } from "../sync/syncEngine";
import { recordEvent } from "../utils/analytics";
import { toast } from "react-hot-toast";

export function useTopicContent(
  subject,
  chapter,
  topic,
  setPhase,
  userId = null
) {
  const subjectId = subject?.id;
  const chapterId = chapter?.id;
  const topicId = topic;

  const hasParams = Boolean(subjectId && chapterId && topicId);

  const [error, setError] = useState(null);
  const [fetchedContent, setFetchedContent] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  /*
   * Read the topic from IndexedDB.
   * useLiveQuery automatically updates when Dexie writes fresh data.
   */
  const contentRecord = useLiveQuery(
    async () => {
      if (!hasParams) return null;
      try {
        return await topicRepo.getTopic(subjectId, chapterId, topicId);
      } catch (err) {
        console.error("[useTopicContent] IndexedDB read error:", err);
        return null;
      }
    },
    [subjectId, chapterId, topicId],
    undefined
  );

  // Content is available if either IndexedDB live query or direct fetch returned it
  const content = contentRecord?.data || fetchedContent || null;
  const loading = hasParams && !content && !error;

  /*
   * Reset state cleanly when switching topics.
   */
  useEffect(() => {
    setError(null);
    setFetchedContent(null);
  }, [subjectId, chapterId, topicId]);

  /*
   * Fetch topic content from the backend or local cache.
   */
  useEffect(() => {
    if (!hasParams) return;

    let cancelled = false;
    const sid = subjectId;
    const cid = chapterId;
    const tid = topicId;

    console.log(`[useTopicContent] Loading content for ${sid}/${cid}/${tid}`);

    if (userId) {
      try {
        recordEvent(sid, cid, tid, "visit", userId);
      } catch (err) {
        console.warn("[useTopicContent] Visit telemetry failed:", err);
      }
    }

    const loadTopic = async () => {
      try {
        // 1. Check if IndexedDB already has content
        const existingRecord = await topicRepo.getTopic(sid, cid, tid).catch(() => null);
        if (cancelled) return;

        if (existingRecord?.data) {
          setFetchedContent(existingRecord.data);
          setError(null);
        }

        // 2. Fetch fresh content from server (and upsert to IndexedDB in background)
        const freshData = await syncEngine.prefetchTopic(sid, cid, tid);
        if (cancelled) return;

        if (freshData) {
          setFetchedContent(freshData);
          setError(null);
          return;
        }

        // 3. If prefetch returned nothing, re-verify IndexedDB
        if (!existingRecord?.data) {
          const fallbackRecord = await topicRepo.getTopic(sid, cid, tid).catch(() => null);
          if (cancelled) return;

          if (fallbackRecord?.data) {
            setFetchedContent(fallbackRecord.data);
            setError(null);
            return;
          }

          // 4. Truly no content available anywhere
          console.warn(`[useTopicContent] No content found: ${sid}/${cid}/${tid}`);
          setError("Failed to load notes. Please check your network connection.");
          toast.error("Failed to load notes. Please check your internet connection.");
        }
      } catch (err) {
        if (cancelled) return;
        console.error(`[useTopicContent] Exception loading ${sid}/${cid}/${tid}:`, err);
        
        // Final sanity check of IndexedDB before showing error
        const local = await topicRepo.getTopic(sid, cid, tid).catch(() => null);
        if (local?.data) {
          setFetchedContent(local.data);
          setError(null);
        } else {
          setError("Failed to load notes. Please check your network connection.");
          toast.error("Failed to load notes. Please check your internet connection.");
        }
      }
    };

    loadTopic();

    return () => {
      cancelled = true;
    };
  }, [subjectId, chapterId, topicId, userId, hasParams, reloadTrigger]);

  const reload = useCallback(() => {
    setError(null);
    setReloadTrigger((prev) => prev + 1);
  }, []);

  return {
    content,
    loading,
    error,
    reload,
  };
}
