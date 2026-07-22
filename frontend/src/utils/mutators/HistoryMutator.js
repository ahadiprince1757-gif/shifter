/**
 * History & Government Subject Mutator
 * Handles historical events, causes/effects, government structures, and cloze retries.
 */

export class HistoryMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = qObj.q || qObj.stem || "";

    // Cloze / Fill-in-the-blank conversion for long answers
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 8) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const maskedAns = [...words];
        maskedAns[maskedIdx] = "________";

        return {
          q: `Complete the historical concept: "${maskedAns.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full historical facts: ${qObj.ans}`,
          sol: qObj.why || `Full statement: ${qObj.ans}`,
          steps: ["Step 1: Read historical statement", "Step 2: Recall key term/event", "Step 3: Fill in missing word"]
        };
      }
    }

    return {
      ...qObj,
      q: `[HISTORY RETRY] ${stem}`,
      hint: qObj.hint || "Focus on key historical factors and dates",
      steps: ["Step 1: Recall historical context", "Step 2: Identify cause or event", "Step 3: State conclusion"]
    };
  }
}
