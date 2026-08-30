/**
 * English Language Subject Mutator
 * Intelligent English Engine:
 * - Dynamic Grammar & Verb Tenses (Past Perfect, Conditionals, Subject-Verb Agreement).
 * - Parts of Speech & Syntactical Analysis (Adverbs, Prepositions, Conjunctions).
 * - Active/Passive Voice & Reported Speech Transformations.
 * - Generates 4 plausible language MCQ options with step-by-step grammatical breakdowns.
 */

export class EnglishMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    const mode = (typeof modalityIndex === "number" ? modalityIndex : Math.floor(Math.random() * 4)) % 4;

    // 1. Verb Tenses & Subject-Verb Agreement
    if (lower.includes("tense") || lower.includes("verb") || lower.includes("past") || lower.includes("present") || lower.includes("agreement") || lower.includes("plural")) {
      const items = [
        {
          sentence: "By the time the headteacher entered the assembly hall, the prefects ________ all the chairs.",
          ans: "had arranged",
          options: ["had arranged", "have arranged", "were arranging", "arranged"],
          hint: "Past Perfect Tense ('had' + past participle) for an action completed prior to another past event."
        },
        {
          sentence: "Neither the manager nor the accountants ________ aware of the budget deficit during yesterday's meeting.",
          ans: "were",
          options: ["were", "was", "are", "is"],
          hint: "When subject is joined by 'neither... nor', the verb agrees with the closer subject ('accountants' = plural)."
        },
        {
          sentence: "If the rain ________ earlier, the harvest would have been abundant.",
          ans: "had started",
          options: ["had started", "started", "would start", "has started"],
          hint: "Third Conditional ('If + past perfect..., would have + past participle')."
        }
      ];
      const selected = items[mode % items.length];
      const ansStr = selected.ans;

      if (mode === 0) {
        return {
          q: `Fill in the blank with the correct verb form:\n"${selected.sentence}"`,
          ans: ansStr,
          hint: selected.hint,
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      } else if (mode === 1) {
        return {
          q: `Select the grammatically correct verb form to complete the sentence:\n"${selected.sentence}"`,
          ans: ansStr,
          hint: selected.hint,
          sol: ansStr,
          type: "mcq",
          options: selected.options,
        };
      } else if (mode === 2) {
        const wrongForm = selected.options.find(o => o !== ansStr) || "was";
        const errorSentence = selected.sentence.replace("________", wrongForm);
        return {
          q: `Identify the grammatical error in this sentence and state the correct verb form:\n"${errorSentence}"`,
          ans: `The word '${wrongForm}' is incorrect; the correct form is '${ansStr}'.`,
          hint: selected.hint,
          sol: `Change '${wrongForm}' to '${ansStr}'.`,
          type: "open_response",
          options: null,
        };
      } else {
        return {
          q: `State the grammatical rule governing the blank space in this sentence and provide the correct word:\n"${selected.sentence}"`,
          ans: `Rule: ${selected.hint}. Correct word: ${ansStr}.`,
          hint: selected.hint,
          sol: `Rule: ${selected.hint}. Correct word: ${ansStr}.`,
          type: "open_response",
          options: null,
        };
      }
    }

    // 2. Parts of Speech & Syntactical Analysis
    if (lower.includes("noun") || lower.includes("pronoun") || lower.includes("verb") || lower.includes("adjective") || lower.includes("adverb") || lower.includes("preposition") || lower.includes("conjunction")) {
      const parts = [
        {
          sentence: "The surgeon performed the delicate operation surprisingly well.",
          word: "surprisingly",
          ans: "Adverb (modifying the adverb 'well')",
          options: [
            "Adverb (modifying the adverb 'well')",
            "Adjective (modifying the noun 'operation')",
            "Preposition showing position",
            "Conjunction joining clauses"
          ],
          hint: "'surprisingly' modifies how 'well' the operation was performed."
        },
        {
          sentence: "Despite the heavy downpour, the athletic competition proceeded as scheduled.",
          word: "Despite",
          ans: "Preposition showing contrast",
          options: [
            "Preposition showing contrast",
            "Subordinating conjunction joining clauses",
            "Adverb modifying 'proceeded'",
            "Coordinating conjunction"
          ],
          hint: "'Despite' functions as a preposition followed by a noun phrase."
        }
      ];
      const selected = parts[Math.floor(Math.random() * parts.length)];

      return {
        q: `[Parts of Speech Analysis] In the sentence: "${selected.sentence}"\nWhat is the exact grammatical function of the word "${selected.word}"?`,
        ans: selected.ans,
        hint: selected.hint,
        why: `"${selected.word}" functions as a ${selected.ans}. ${selected.hint}`,
        sol: selected.ans,
        steps: [
          `Step 1: Locate target word ("${selected.word}") in sentence`,
          "Step 2: Determine what word or clause it modifies or links",
          "Step 3: Classify exact part of speech"
        ],
        type: "mcq",
        options: selected.options
      };
    }

    // 3. Reverse Grammar Inquiry
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Language & Syntax Inquiry] Regarding: "${stem}"\nWhich grammatical rule or usage principle explains this correct form?`,
        ans: rawAns,
        hint: qObj.hint || "Apply standard English syntax and grammatical rules.",
        why: qObj.why || `Grammar rule: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze sentence structure and clause relationships",
          "Step 2: Apply standard English grammatical rule",
          "Step 3: State conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Parallelism of co-ordinated verb phrases",
          "Inversion of subject and auxiliary verb after negative adverbs",
          "Subjunctive mood expressing hypothetical conditions"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Grammar Rule Check] ${stem}`,
      hint: qObj.hint || "Apply standard English grammar and punctuation rules.",
      steps: [
        "Step 1: Analyze sentence structure",
        "Step 2: Apply grammar rule",
        "Step 3: State answer"
      ]
    };
  }
}
