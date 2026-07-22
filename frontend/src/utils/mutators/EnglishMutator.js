/**
 * English Language Subject Mutator
 * Handles grammar, comprehension, vocabulary, and language structure.
 */

const ENGLISH_TEMPLATES = [
  {
    keywords: ["tense", "past", "present", "future", "verb", "conjugat"],
    gen: () => {
      const verbs = [
        { base: "run", past: "ran", pp: "run", present: "runs", continuous: "running" },
        { base: "write", past: "wrote", pp: "written", present: "writes", continuous: "writing" },
        { base: "eat", past: "ate", pp: "eaten", present: "eats", continuous: "eating" },
        { base: "go", past: "went", pp: "gone", present: "goes", continuous: "going" },
        { base: "teach", past: "taught", pp: "taught", present: "teaches", continuous: "teaching" },
        { base: "swim", past: "swam", pp: "swum", present: "swims", continuous: "swimming" },
        { base: "break", past: "broke", pp: "broken", present: "breaks", continuous: "breaking" }
      ];
      const v = verbs[Math.floor(Math.random() * verbs.length)];
      const qType = Math.floor(Math.random() * 3);

      if (qType === 0) {
        return {
          q: `What is the simple past tense of the verb "${v.base}"?`,
          ans: v.past,
          hint: `Irregular verb form`,
          why: `The simple past tense of "${v.base}" is "${v.past}".`,
          sol: `The simple past tense of "${v.base}" is "${v.past}".`,
          steps: ["Step 1: Identify the base verb", "Step 2: Recall irregular past form", "Step 3: State past tense"],
          type: "mcq",
          options: [v.past, v.pp, v.continuous, v.base]
        };
      } else if (qType === 1) {
        return {
          q: `What is the past participle of the verb "${v.base}"?`,
          ans: v.pp,
          hint: `Used with 'has/have/had'`,
          why: `The past participle of "${v.base}" is "${v.pp}" (e.g., "I have ${v.pp}").`,
          sol: `The past participle of "${v.base}" is "${v.pp}".`,
          steps: ["Step 1: Identify the base verb", "Step 2: Recall past participle form", "Step 3: State participle"],
          type: "mcq",
          options: [v.pp, v.past, v.continuous, v.present]
        };
      } else {
        return {
          q: `Complete: "She is currently ________ in the pool." (verb: ${v.base})`,
          ans: v.continuous,
          hint: `Present continuous tense`,
          why: `The present continuous form of "${v.base}" is "${v.continuous}".`,
          sol: `The present continuous form of "${v.base}" is "${v.continuous}".`,
          steps: ["Step 1: Identify tense (present continuous)", "Step 2: Add -ing to base verb", "Step 3: State continuous form"]
        };
      }
    }
  },
  {
    keywords: ["noun", "pronoun", "adjective", "adverb", "preposition", "parts of speech"],
    gen: () => {
      const parts = [
        { word: "quickly", pos: "Adverb", why: "It modifies a verb by describing how an action is done." },
        { word: "beautiful", pos: "Adjective", why: "It describes a noun by telling its quality." },
        { word: "under", pos: "Preposition", why: "It shows the relationship between a noun and another word." },
        { word: "happiness", pos: "Noun", why: "It names an abstract concept/feeling." },
        { word: "she", pos: "Pronoun", why: "It replaces a noun to avoid repetition." }
      ];
      const p = parts[Math.floor(Math.random() * parts.length)];

      return {
        q: `Identify the part of speech of the word "${p.word}" in the sentence.`,
        ans: p.pos,
        hint: p.why.split(".")[0],
        why: `"${p.word}" is a ${p.pos}. ${p.why}`,
        sol: `"${p.word}" is a ${p.pos}. ${p.why}`,
        steps: ["Step 1: Read the word in context", "Step 2: Determine its grammatical role", "Step 3: Classify part of speech"],
        type: "mcq",
        options: ["Noun", "Adjective", "Adverb", "Preposition", "Pronoun"].slice(0, 4)
      };
    }
  }
];

export class EnglishMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of ENGLISH_TEMPLATES) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    // Cloze fallback
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const idx = Math.floor(words.length / 2);
        const target = words[idx];
        const masked = [...words];
        masked[idx] = "________";
        return {
          q: `Complete the sentence: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Word starts with '${target.charAt(0).toUpperCase()}'`,
          why: `Full answer: ${qObj.ans}`,
          sol: qObj.why || qObj.ans,
          steps: ["Step 1: Read sentence context", "Step 2: Identify missing word", "Step 3: Fill in the blank"]
        };
      }
    }

    return {
      ...qObj,
      q: `[ENGLISH RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Apply grammar and comprehension rules",
      steps: ["Step 1: Identify language concept", "Step 2: Apply grammar rule", "Step 3: State answer"]
    };
  }
}
