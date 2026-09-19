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

  // useLiveQuery subscribes to the topic table in IndexedDB
  const contentRecord = useLiveQuery(
    () => {
      if (!hasParams) return null;
      return topicRepo.getTopic(subject.id, chapter.id, topic);
    },
    [subject?.id, chapter?.id, topic],
    undefined // undefined means loading state
  );

  const loading = contentRecord === undefined && hasParams;
  const content = contentRecord ? contentRecord.data : null;

  useEffect(() => {
    if (!hasParams || !subject?.id || !chapter?.id || !topic) return;

    const currentTopicKey = `${subject.id}|${chapter.id}|${topic}`;

    // Prevent duplicate prefetch calls during same topic component lifecycle
    if (recordedTopicRef.current === currentTopicKey) {
      return;
    }
    recordedTopicRef.current = currentTopicKey;

    console.log(`useTopicContent: Requested ${subject.id}/${chapter.id}/${topic}`);

    // 1. Record student navigation telemetry event if authenticated
    if (userId) {
      recordEvent(subject.id, chapter.id, topic, "visit", userId);
    }

    // 2. Asynchronously prefetch content from server -> store in IndexedDB
    //    On error: only surface the error message to the user if no locally-cached
    //    content exists either. This prevents false "check internet" errors when
    //    the prefetch races or the network service hasn't confirmed online status yet.
    const sid = subject.id;
    const cid = chapter.id;
    const tid = topic;

    syncEngine.prefetchTopic(sid, cid, tid)
      .catch(async (err) => {
        console.error(`useTopicContent: Error prefetching ${sid}/${cid}/${tid}:`, err);
        // Before surfacing an error, check if we have local cache
        try {
          const fallback = await topicRepo.getTopic(sid, cid, tid);
          if (fallback?.data) {
            // Local cache exists — useLiveQuery will pick it up, no error needed
            return;
          }
        } catch {
          // ignore
        }
        // No local cache and prefetch failed — tell the user
        setError("Failed to load content. Check your internet.");
        toast.error("Failed to load notes. Please check your internet connection.");
      });
  }, [subject?.id, chapter?.id, topic, userId, hasParams]);

  return { content, loading, error };
}
