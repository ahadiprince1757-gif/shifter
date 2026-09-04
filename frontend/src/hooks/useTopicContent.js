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

  // useLiveQuery subscribes to the topic table
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
    if (!hasParams) return;

    // Defense-in-depth: Prevent duplicate visit event recordings during same topic component lifecycle
    if (recordedTopicRef.current === topicKey) {
      return;
    }
    recordedTopicRef.current = topicKey;

    console.log(`useTopicContent: Requested ${subject.id}/${chapter.id}/${topic}`);

    // If we have content, we don't technically NEED to prefetch unless we want the absolute latest.
    // However, the offline-first approach is to trigger a background fetch if online to ensure freshness.
    syncEngine.prefetchTopic(subject.id, chapter.id, topic)
      .then(() => {
        // Log telemetry visit event once successfully checked/loaded
        recordEvent(subject.id, chapter.id, topic, "visit", userId);
      })
      .catch((err) => {
        console.error(`useTopicContent: Error prefetching ${subject.id}/${chapter.id}/${topic}:`, err);
        // We only set an error if we ALSO don't have local content.
        if (!contentRecord) {
          setError("Failed to load content. Check your internet.");
          toast.error("Failed to load notes. Please check your internet connection.");
        }
      });
  }, [subject?.id, chapter?.id, topic, userId, hasParams, topicKey]);

  return { content, loading, error };
}
