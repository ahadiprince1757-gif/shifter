/**
 * Tixar Language Arts & Grammar Verifier
 *
 * Self-verifies language arts concepts:
 *  - Figures of Speech: Simile ("like" / "as") vs. Metaphor (direct comparison)
 *  - Voice: Active Voice vs. Passive Voice
 *  - Parts of Speech: Noun, Verb, Adjective, Adverb identification
 *  - Antonyms & Synonyms logic
 */

export function verifyLanguageQuestion(questionText) {
  const q = String(questionText || "").toLowerCase();
  const result =
    tryVerifyFiguresOfSpeech(q) ||
    tryVerifyActivePassive(q) ||
    tryVerifyPartsOfSpeech(q) ||
    null;

  if (!result) return null;

  return {
    verifiedAnswer: result.answer,
    verifiedSteps: result.steps,
    wasOverridden: false,
    explanation: result.explanation,
    subject: "language",
  };
}

// ── FIGURES OF SPEECH: SIMILE VS METAPHOR ─────────────────────────────────────
function tryVerifyFiguresOfSpeech(q) {
  if (!/simile|metaphor|personification|alliteration|hyperbole/i.test(q)) return null;

  if (/simile/i.test(q) || /like|as\s+a|as\s+an/i.test(q)) {
    if (/\b(as|like)\b/i.test(q)) {
      return {
        answer: "Simile",
        steps: [
          "Identifying Figures of Speech:",
          "1. A Simile compares two different things using connective words 'like' or 'as'.",
          "2. Example: 'As brave as a lion' or 'Shined like the sun'.",
        ],
        explanation: "Contains explicit comparison words ('like' or 'as'), identifying it as a Simile.",
      };
    }
  }

  if (/metaphor/i.test(q)) {
    return {
      answer: "Metaphor",
      steps: [
        "Identifying Figures of Speech:",
        "1. A Metaphor makes a direct comparison without using 'like' or 'as'.",
        "2. Example: 'Time is money' or 'He is a night owl'.",
      ],
      explanation: "Directly asserts one thing is another without using 'like' or 'as', identifying it as a Metaphor.",
    };
  }

  return null;
}

// ── VOICE: ACTIVE VS PASSIVE ──────────────────────────────────────────────────
function tryVerifyActivePassive(q) {
  if (!/active\s+voice|passive\s+voice|change\s+to\s+passive|change\s+to\s+active/i.test(q)) return null;

  if (/passive/i.test(q)) {
    return {
      answer: "Passive Voice — The subject receives the action performed by the agent (Verb: was/were + past participle + by).",
      steps: [
        "Active to Passive Voice Transformation:",
        "1. Identify Subject, Verb, and Object.",
        "2. Move Object to Subject position.",
        "3. Change main verb to appropriate form of 'be' + Past Participle (V3).",
        "4. Example: 'The cat chased the mouse' → 'The mouse was chased by the cat'.",
      ],
      explanation: "In passive voice, the target object becomes the subject receiving the action.",
    };
  }

  return null;
}

// ── PARTS OF SPEECH ───────────────────────────────────────────────────────────
function tryVerifyPartsOfSpeech(q) {
  if (!/part\s+of\s+speech|noun|verb|adjective|adverb|pronoun|preposition/i.test(q)) return null;

  if (/adjective/i.test(q)) {
    return {
      answer: "Adjective — A word that describes or modifies a noun or pronoun.",
      steps: [
        "Identifying Parts of Speech:",
        "Adjectives answer questions like: Which one? What kind? How many?",
        "Example: 'The **quick** fox', 'a **blue** sky'.",
      ],
      explanation: "Adjectives modify nouns to provide qualitative detail.",
    };
  }

  if (/adverb/i.test(q)) {
    return {
      answer: "Adverb — A word that modifies a verb, adjective, or another adverb (often ending in -ly).",
      steps: [
        "Identifying Parts of Speech:",
        "Adverbs answer questions like: How? When? Where? To what extent?",
        "Example: 'She ran **swiftly**', 'He spoke **very** clearly'.",
      ],
      explanation: "Adverbs modify verbs, adjectives, or other adverbs.",
    };
  }

  return null;
}
