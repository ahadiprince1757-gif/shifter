import { useState } from 'react';

export function useQuizUI(topic) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [prevTopic, setPrevTopic] = useState(topic);

  // Reset UI states when topic changes (during render to prevent cascading render warnings)
  if (topic !== prevTopic) {
    setPrevTopic(topic);
    setShowHint(false);
    setShowAnswer(false);
  }

  return {
    showHint,
    setShowHint,
    showAnswer,
    setShowAnswer
  };
}
