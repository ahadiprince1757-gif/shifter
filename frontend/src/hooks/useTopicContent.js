import { useState, useEffect, useCallback } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { topicRepo } from "../repository/topicRepo";
import { syncEngine } from "../sync/syncEngine";
import { recordEvent } from "../utils/analytics";
import { toast } from "react-hot-toast";
import { getBundledTopic } from "../data/contentLoader";

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

    if (userId) {
      try {
        recordEvent(sid, cid, tid, "visit", userId);
      } catch (err) {
        // silent telemetry fallback
      }
    }

    const loadTopic = async () => {
      try {
        // 1. Read IndexedDB first (Primary Source of Truth)
        let existingRecord = await topicRepo.getTopic(sid, cid, tid).catch(() => null);
        if (cancelled) return;

        let contentData = existingRecord?.data || null;

        // 2. If not yet in IndexedDB, immediately check bundled static content
        if (!contentData) {
          const bundled = await getBundledTopic(sid, cid, tid);
          if (cancelled) return;

          if (bundled?.data) {
            contentData = bundled.data;
            // Write to Dexie in background so future visits read from IndexedDB
            topicRepo.upsertBatch([bundled]).catch(() => {});
          }
        }

        // 3. If we have content (from IndexedDB or bundled static data), render immediately
        if (contentData) {
          setFetchedContent(contentData);
          setError(null);

          // 4. Trigger quiet non-blocking background refresh if online
          if (typeof navigator !== "undefined" && navigator.onLine) {
            syncEngine.refreshTopicInBackground(sid, cid, tid).catch(() => {});
          }
          return;
        }

        // 5. If not found locally or in bundled data and online, attempt remote fetch as last resort
        if (typeof navigator !== "undefined" && navigator.onLine) {
          const freshData = await syncEngine.prefetchTopic(sid, cid, tid).catch(() => null);
          if (cancelled) return;

          if (freshData) {
            setFetchedContent(freshData);
            setError(null);
            return;
          }
        }

        // 6. Genuinely unavailable
        setError("Topic content is currently unavailable. Please check your connection and try again.");
      } catch (err) {
        if (cancelled) return;

        // Sanity fallback check
        const local = await topicRepo.getTopic(sid, cid, tid).catch(() => null);
        if (local?.data) {
          setFetchedContent(local.data);
          setError(null);
        } else {
          setError("Topic content is currently unavailable. Please check your connection and try again.");
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
