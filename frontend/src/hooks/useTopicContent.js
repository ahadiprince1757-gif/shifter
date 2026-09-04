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
    if (!hasParams || !subject?.id || !chapter?.id || !topic || !userId) return;

    const currentTopicKey = `${subject.id}|${chapter.id}|${topic}`;

    // Defense-in-depth: Prevent duplicate visit event recordings during same topic component lifecycle
    if (recordedTopicRef.current === currentTopicKey) {
      return;
    }
    recordedTopicRef.current = currentTopicKey;

    console.log(`useTopicContent: Requested ${subject.id}/${chapter.id}/${topic}`);

    // 1. Immediately record student navigation telemetry event (independent of network/prefetch)
    recordEvent(subject.id, chapter.id, topic, "visit", userId);

    // 2. Asynchronously prepare/prefetch content in background
    syncEngine.prefetchTopic(subject.id, chapter.id, topic)
      .catch((err) => {
        console.error(`useTopicContent: Error prefetching ${subject.id}/${chapter.id}/${topic}:`, err);
        if (!contentRecord) {
          setError("Failed to load content. Check your internet.");
          toast.error("Failed to load notes. Please check your internet connection.");
        }
      });
  }, [subject?.id, chapter?.id, topic, userId, hasParams]);

  return { content, loading, error };
}
