import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { topicRepo } from "../repository/topicRepo";
import { syncEngine } from "../sync/syncEngine";
import { recordEvent } from "../utils/analytics";
import { toast } from "react-hot-toast";

export function useTopicContent(subject, chapter, topic, setPhase, userId = null) {
  const hasParams = !!(subject?.id && chapter?.id && topic);
  const [error, setError] = useState(null);
  const [prevTopicKey, setPrevTopicKey] = useState(null);
  const recordedTopicRef = useRef(null);

  const topicKey = `${subject?.id}|${chapter?.id}|${topic}`;
  if (topicKey !== prevTopicKey) {
    setPrevTopicKey(topicKey);
    setError(null);
  }

  // useLiveQuery subscribes to the topic table in IndexedDB and re-renders whenever data changes
  const contentRecord = useLiveQuery(
    () => {
      if (!hasParams) return null;
      return topicRepo.getTopic(subject.id, chapter.id, topic);
    },
    [subject?.id, chapter?.id, topic],
    undefined // undefined = loading
  );

  const loading = contentRecord === undefined && hasParams;
  const content = contentRecord ? contentRecord.data : null;

  useEffect(() => {
    if (!hasParams || !subject?.id || !chapter?.id || !topic) return;

    const currentTopicKey = `${subject.id}|${chapter.id}|${topic}`;

    // Prevent duplicate fetches for the same topic in the same lifecycle
    if (recordedTopicRef.current === currentTopicKey) return;
    recordedTopicRef.current = currentTopicKey;

    const sid = subject.id;
    const cid = chapter.id;
    const tid = topic;

    console.log(`useTopicContent: Fetching ${sid}/${cid}/${tid}`);

    // Record telemetry
    if (userId) {
      recordEvent(sid, cid, tid, "visit", userId);
    }

    // Fetch from backend → save to IndexedDB → useLiveQuery reacts automatically.
    // prefetchTopic never throws (all errors caught internally).
    // We check content availability in .then() AFTER the fetch completes.
    syncEngine.prefetchTopic(sid, cid, tid).then(async () => {
      // After fetch attempt completes, verify content actually landed in IndexedDB
      try {
        const record = await topicRepo.getTopic(sid, cid, tid);
        if (!record?.data) {
          // Still nothing — show error
          setError("Failed to load content. Check your internet.");
          toast.error("Failed to load notes. Please check your internet connection.");
        }
        // If record exists, useLiveQuery has already updated or will update the UI
      } catch (dbErr) {
        console.error(`[useTopicContent] IndexedDB read failed for ${tid}:`, dbErr);
        setError("Failed to load content. Check your internet.");
        toast.error("Failed to load notes. Please check your internet connection.");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject?.id, chapter?.id, topic, userId, hasParams]);

  return { content, loading, error };
}
