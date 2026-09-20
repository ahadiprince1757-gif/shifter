
import { useState, useEffect } from "react";
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

  /*
   * Read the topic from IndexedDB.
   *
   * useLiveQuery will automatically re-run when the topic record
   * changes, including after syncEngine.prefetchTopic() writes
   * fresh content into IndexedDB.
   */
  const contentRecord = useLiveQuery(
    async () => {
      if (!hasParams) return null;

      try {
        return await topicRepo.getTopic(
          subjectId,
          chapterId,
          topicId
        );
      } catch (err) {
        console.error(
          "[useTopicContent] Failed to read topic:",
          err
        );

        return null;
      }
    },
    [subjectId, chapterId, topicId],
    undefined
  );

  const loading = hasParams && contentRecord === undefined;
  const content = contentRecord?.data ?? null;

  /*
   * Reset the error whenever the user moves to a different topic.
   *
   * IMPORTANT:
   * This happens inside useEffect, NOT during render.
   */
  useEffect(() => {
    setError(null);
  }, [subjectId, chapterId, topicId]);

  /*
   * Fetch topic content from the backend when the topic changes.
   */
  useEffect(() => {
    if (!hasParams) return;

    let cancelled = false;

    const sid = subjectId;
    const cid = chapterId;
    const tid = topicId;

    console.log(
      `[useTopicContent] Fetching ${sid}/${cid}/${tid}`
    );

    /*
     * Record telemetry.
     *
     * Analytics failure should never break topic loading.
     */
    if (userId) {
      try {
        recordEvent(
          sid,
          cid,
          tid,
          "visit",
          userId
        );
      } catch (err) {
        console.warn(
          "[useTopicContent] Failed to record visit event:",
          err
        );
      }
    }

    /*
     * Fetch → save to IndexedDB → useLiveQuery detects
     * the IndexedDB update → UI re-renders with content.
     */
    const loadTopic = async () => {
      try {
        await syncEngine.prefetchTopic(
          sid,
          cid,
          tid
        );

        /*
         * The fetch completed. Verify that content actually
         * exists in IndexedDB.
         */
        const record = await topicRepo.getTopic(
          sid,
          cid,
          tid
        );

        if (cancelled) return;

        if (!record?.data) {
          console.warn(
            `[useTopicContent] No content found after sync: ${sid}/${cid}/${tid}`
          );

          setError(
            "Failed to load content. Check your internet."
          );

          toast.error(
            "Failed to load notes. Please check your internet connection."
          );

          return;
        }

        /*
         * Content exists.
         *
         * Do NOT manually set content here.
         * useLiveQuery is responsible for detecting the
         * IndexedDB change and updating the component.
         */
        console.log(
          `[useTopicContent] Content loaded: ${sid}/${cid}/${tid}`
        );
      } catch (err) {
        if (cancelled) return;

        console.error(
          `[useTopicContent] Failed to load ${sid}/${cid}/${tid}:`,
          err
        );

        setError(
          "Failed to load content. Check your internet."
        );

        toast.error(
          "Failed to load notes. Please check your internet connection."
        );
      }
    };

    loadTopic();

    /*
     * Prevent an old topic request from updating state after
     * the user has already navigated to another topic.
     */
    return () => {
      cancelled = true;
    };
  }, [
    subjectId,
    chapterId,
    topicId,
    userId,
    hasParams
  ]);

  return {
    content,
    loading,
    error
  };
}
