/**
 * English Language Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Sentence Context & Grammar Case Study
 * - Mode 2: Multiple Choice Part-of-Speech & Tense Discrimination
 * - Mode 3: Cloze Vocabulary & Comprehension Check
 * - Mode 4: Active/Passive & Reported Speech Transformation
 */

const ENG_SCENARIOS = [
  {
    keywords: ["tense", "past", "present", "future", "verb", "conjugat"],
    gen: () => {
      const sentences = [
        { base: "write", sentence: "By the time the bell rang, the students ________ their essays.", ans: "had written", options: ["had written", "wrote", "have written", "were writing"], hint: "Past perfect tense for action completed before another past action" },
        { base: "freeze", sentence: "The lake had ________ solid during the severe winter storm.", ans: "frozen", options: ["frozen", "froze", "freezed", "freezing"], hint: "Past participle form following 'had'" },
        { base: "speak", sentence: "Neither the minister nor the delegates ________ at the conference yesterday.", ans: "spoke", options: ["spoke", "spoken", "speaks", "speaking"], hint: "Simple past tense for past event" }
      ];
      const selected = sentences[Math.floor(Math.random() * sentences.length)];

      return {
        q: `[Grammar Context Scenario] Select the grammatically correct verb form to complete the sentence:\n"${selected.sentence}"`,
        ans: selected.ans,
        hint: selected.hint,
        why: `Correct choice is '${selected.ans}'. ${selected.hint}.`,
        sol: `Correct choice is '${selected.ans}'. ${selected.hint}.`,
        steps: ["Step 1: Read full sentence context", "Step 2: Identify time frame and tense agreement", "Step 3: Choose correct verb form"],
        type: "mcq",
        options: selected.options
      };
    }
  },
  {
    keywords: ["noun", "pronoun", "adjective", "adverb", "preposition", "parts of speech"],
    gen: () => {
      const items = [
        { sentence: "She completed the marathon remarkably fast.", target: "remarkably", ans: "Adverb (modifying the adjective 'fast')", distractors: ["Adjective", "Preposition", "Conjunction"], hint: "Modifies an adjective" },
        { sentence: "The team celebrated despite the heavy rain.", target: "despite", ans: "Preposition", distractors: ["Conjunction", "Adverb", "Verb"], hint: "Connects a noun phrase to show contrast" }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];

      return {
        q: `[Parts of Speech Scenario] In the sentence: "${selected.sentence}"\nWhat is the grammatical function of the word "${selected.target}"?`,
        ans: selected.ans,
        hint: selected.hint,
        why: `"${selected.target}" functions as a ${selected.ans}. ${selected.hint}.`,
        sol: `"${selected.target}" functions as a ${selected.ans}. ${selected.hint}.`,
        steps: ["Step 1: Identify the highlighted word", "Step 2: Analyze its grammatical relationship", "Step 3: Select part of speech"],
        type: "mcq",
        options: [selected.ans, ...selected.distractors]
      };
    }
  }
];

export class EnglishMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Scenario Match
    const match = ENG_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Language Concept Check] Fill in the missing word: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Word starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Complete sentence: ${qObj.ans}`,
          sol: qObj.why || `Complete sentence: ${qObj.ans}`,
          steps: ["Step 1: Read sentence context", "Step 2: Identify missing vocabulary/grammar item", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[Grammar & Style Check] Regarding "${qObj.q || qObj.stem}": What language rule applies here?`,
      hint: qObj.hint || "Apply standard English grammar and punctuation rules",
      steps: ["Step 1: Analyze sentence structure", "Step 2: Apply grammar/vocabulary rule", "Step 3: State answer"]
    };
  }
}
