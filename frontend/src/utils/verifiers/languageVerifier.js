/**
 * ============================================================================
 * TIXAR LANGUAGE ARTS & GRAMMAR VERIFIER
 * ============================================================================
 *
 * Purpose:
 * Context-aware linguistic verification engine for grammar, syntax,
 * figures of speech, voice transformations, and vocabulary.
 *
 * Supported Areas:
 * - Figures of Speech (Simile, Metaphor, Personification, Alliteration, Hyperbole)
 * - Active and Passive Voice (Definitions & Sentence Transformations)
 * - Parts of Speech (Noun, Verb, Adjective, Adverb, Pronoun, Preposition)
 * - Synonyms & Antonyms (Curated Vocabulary Engine)
 *
 * Key Design Principles:
 * - Never treat isolated keywords ("like", "-ly") as absolute grammatical truth.
 * - Distinguish Question Intent (Definition vs Identification vs Transformation vs Comparison).
 * - Extract quoted target sentences for contextual analysis.
 * - Return explicit confidence scores (High: 0.95+, Medium: 0.75-0.85, Low: <0.70).
 * ============================================================================
 */

export function verifyLanguageQuestion(questionText, storedAns = null) {
  const originalQuestion = String(questionText || "").trim();
  const q = normalize(originalQuestion);

  const result =
    tryVerifyFiguresOfSpeech(originalQuestion, q) ||
    tryVerifyActivePassive(originalQuestion, q) ||
    tryVerifyPartsOfSpeech(originalQuestion, q) ||
    tryVerifyVocabulary(originalQuestion, q);

  if (!result || !result.answer) {
    return null;
  }

  const comparison = compareLanguageAnswers(
    result.answer,
    storedAns,
    result.acceptableAnswers || []
  );

  return {
    verifiedAnswer: result.answer,
    verifiedSteps: result.steps || [],
    explanation: result.explanation,
    subject: "language",
    topic: result.topic,
    questionType: result.questionType,
    confidence: result.confidence ?? 0.85,
    acceptableAnswers: result.acceptableAnswers || [result.answer],
    wasOverridden: comparison.isDifferent,
    storedAnswer: storedAns ?? null,
    comparison,
  };
}

/* ============================================================================
   TEXT NORMALIZATION & COMPARISON ENGINE
============================================================================ */

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[.,!?'"“”‘’]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compareLanguageAnswers(verifiedAnswer, storedAnswer, acceptableAnswers = []) {
  if (storedAnswer === null || storedAnswer === undefined || String(storedAnswer).trim() === "") {
    return { compared: false, isDifferent: false };
  }

  const normVerified = normalize(verifiedAnswer);
  const normStored = normalize(storedAnswer);
  const normAcceptables = [normVerified, ...acceptableAnswers.map((a) => normalize(a))];

  const isMatch = normAcceptables.some((acc) => {
    if (!acc || !normStored) return false;
    return (
      acc === normStored ||
      normStored.includes(acc) ||
      acc.includes(normStored)
    );
  });

  return {
    compared: true,
    isDifferent: !isMatch,
    expected: verifiedAnswer,
    received: storedAnswer,
    acceptable: normAcceptables,
  };
}

/* ============================================================================
   QUESTION INTENT DETECTION
============================================================================ */

function detectLanguageIntent(q) {
  if (/identify|find|which word|pick out|underline|locate|what part of speech is/.test(q)) {
    return "identify";
  }
  if (/change.*passive|convert.*passive|rewrite.*passive|turn.*passive|make.*passive/.test(q)) {
    return "transform_to_passive";
  }
  if (/change.*active|convert.*active|rewrite.*active|turn.*active|make.*active/.test(q)) {
    return "transform_to_active";
  }
  if (/difference|differentiate|compare|distinguish/.test(q)) {
    return "compare";
  }
  if (/what is|define|meaning|explain|what does.*mean/.test(q)) {
    return "definition";
  }
  if (/synonym|similar meaning|same as|means the same/.test(q)) {
    return "synonym";
  }
  if (/antonym|opposite meaning|opposite of/.test(q)) {
    return "antonym";
  }
  return "general";
}

/* ============================================================================
   FIGURES OF SPEECH ENGINE
============================================================================ */

function tryVerifyFiguresOfSpeech(original, q) {
  if (!/simile|metaphor|personification|alliteration|hyperbole|figure of speech/.test(q)) {
    return null;
  }

  const intent = detectLanguageIntent(q);

  // 1. Concept Comparison
  if (intent === "compare" && /simile/.test(q) && /metaphor/.test(q)) {
    return {
      answer: "A simile compares things using words such as 'like' or 'as', while a metaphor makes a direct comparison without those words.",
      topic: "Figures of Speech",
      questionType: "comparison",
      steps: [
        "A simile makes an explicit comparison using comparison markers ('like' or 'as').",
        "A metaphor makes a direct comparison without using 'like' or 'as'.",
      ],
      explanation: "Both figures compare things, but a simile uses explicit comparison markers while a metaphor asserts direct equivalence.",
      confidence: 0.98,
    };
  }

  // 2. Sentence Classification (Identification)
  const sentence = extractQuotedSentence(original);
  if (intent === "identify" && sentence) {
    const classification = classifyFigureOfSpeech(sentence);
    if (classification) {
      return {
        answer: classification.type,
        topic: "Figures of Speech",
        questionType: "identification",
        acceptableAnswers: [classification.type, classification.type.toLowerCase()],
        steps: classification.steps,
        explanation: classification.explanation,
        confidence: classification.confidence,
      };
    }
  }

  // 3. Definitions
  if (/what is.*simile|define.*simile|meaning of.*simile/.test(q)) {
    return {
      answer: "A simile is a figure of speech that compares two different things using comparison words such as 'like' or 'as'.",
      topic: "Figures of Speech",
      questionType: "definition",
      acceptableAnswers: ["simile", "explicit comparison"],
      steps: [
        "Identify the concept: Simile.",
        "A simile compares two things using explicit comparison markers ('like' or 'as').",
      ],
      explanation: "Similes create vivid imagery by directly linking two different things using 'like' or 'as'.",
      confidence: 0.98,
    };
  }

  if (/what is.*metaphor|define.*metaphor|meaning of.*metaphor/.test(q)) {
    return {
      answer: "A metaphor is a figure of speech that directly describes one thing as another without using comparison words such as 'like' or 'as'.",
      topic: "Figures of Speech",
      questionType: "definition",
      acceptableAnswers: ["metaphor", "direct comparison"],
      steps: [
        "Identify the concept: Metaphor.",
        "A metaphor directly equates two unlike things without 'like' or 'as'.",
      ],
      explanation: "Metaphors create meaning by describing one item in terms of another without using connective comparison words.",
      confidence: 0.98,
    };
  }

  if (/what is.*personification|define.*personification/.test(q)) {
    return {
      answer: "Personification is a figure of speech in which human characteristics, emotions, or actions are given to non-human things or abstract concepts.",
      topic: "Figures of Speech",
      questionType: "definition",
      acceptableAnswers: ["personification"],
      steps: [
        "Identify the concept: Personification.",
        "Human attributes are assigned to non-human subjects.",
      ],
      explanation: "Personification enhances imagery by treating objects or natural forces as human.",
      confidence: 0.98,
    };
  }

  return null;
}

function classifyFigureOfSpeech(sentence) {
  const s = sentence.toLowerCase().trim();

  // Simile: Require explicit structure ("as [word] as" OR "[action/noun] like a/an/the [noun]")
  const similePatterns = [
    /\bas\s+[a-z]+\s+as\b/,
    /\b\w+\s+like\s+(?:a|an|the|my|his|her|their)\s+[a-z]+\b/,
  ];

  // Exclude false positives like "I like reading", "He is like his father"
  const isFalsePositiveLike = /\b(i|we|they|you)\s+like\b/.test(s);

  if (!isFalsePositiveLike && similePatterns.some((pattern) => pattern.test(s))) {
    return {
      type: "Simile",
      steps: [
        "Analyze sentence structure.",
        "Sentence contains an explicit comparison marker ('as ... as' or 'like a/an/the').",
        "Therefore, the figure of speech is a Simile.",
      ],
      explanation: "The sentence uses an explicit comparison marker to compare two different things.",
      confidence: 0.90,
    };
  }

  // Personification: Non-human subject + human action
  const humanActions = ["whispered", "danced", "smiled", "cried", "laughed", "sang", "screamed", "called", "waved", "stood guard"];
  const nonHumanSubjects = ["wind", "sun", "moon", "river", "storm", "tree", "stars", "shadow", "ocean", "time", "clock", "flame"];

  for (const subject of nonHumanSubjects) {
    for (const action of humanActions) {
      if (new RegExp(`\\b${subject}s?\\b.*\\b${action}\\b`).test(s)) {
        return {
          type: "Personification",
          steps: [
            `Identify subject: '${subject}' (non-human).`,
            `Identify action: '${action}' (human attribute).`,
            "Assigning human actions to a non-human subject is Personification.",
          ],
          explanation: `The non-human subject '${subject}' is given the human action '${action}'.`,
          confidence: 0.88,
        };
      }
    }
  }

  // Alliteration: Repeated initial consonant sounds
  const words = s.match(/\b[a-z]+\b/g) || [];
  let repeatedInitials = 0;
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i][0] === words[i + 1][0] && !["a", "an", "the", "in", "on", "at", "to", "of", "and"].includes(words[i])) {
      repeatedInitials++;
    }
  }

  if (repeatedInitials >= 2) {
    return {
      type: "Alliteration",
      steps: [
        "Analyze initial consonant sounds.",
        "Multiple consecutive words share the same starting letter/sound.",
        "This indicates Alliteration.",
      ],
      explanation: "The repetition of initial consonant sounds across adjacent words forms alliteration.",
      confidence: 0.70, // Moderate confidence (phonetic analysis is ideal)
    };
  }

  return null;
}

/* ============================================================================
   ACTIVE & PASSIVE VOICE ENGINE
============================================================================ */

function tryVerifyActivePassive(original, q) {
  if (!/active voice|passive voice|change.*passive|change.*active|convert.*voice/.test(q)) {
    return null;
  }

  const intent = detectLanguageIntent(q);

  // 1. Definitions
  if (intent === "definition" || /what is|define/.test(q)) {
    if (/active voice/.test(q)) {
      return {
        answer: "Active voice is a sentence structure in which the subject performs the action expressed by the verb.",
        topic: "Voice",
        questionType: "definition",
        acceptableAnswers: ["active voice", "subject performs action"],
        steps: [
          "Identify the subject.",
          "Check if the subject is performing the action.",
          "If the subject performs the action, the sentence is in Active Voice.",
        ],
        explanation: "In active voice, the subject is the agent doing the action.",
        confidence: 0.98,
      };
    }

    if (/passive voice/.test(q)) {
      return {
        answer: "Passive voice is a sentence structure in which the subject receives or is acted upon by the action of the verb.",
        topic: "Voice",
        questionType: "definition",
        acceptableAnswers: ["passive voice", "subject receives action"],
        steps: [
          "Identify the subject and verb.",
          "Check if the subject is receiving the action.",
          "Passive voice typically uses an auxiliary verb ('was/were/is/are') + past participle.",
        ],
        explanation: "In passive voice, the focus shifts to the recipient of the action.",
        confidence: 0.98,
      };
    }
  }

  // 2. Sentence Transformation (Active -> Passive)
  const sentence = extractQuotedSentence(original);
  if (intent === "transform_to_passive" && sentence) {
    const transformed = transformActiveToPassive(sentence);
    if (transformed) {
      return {
        answer: transformed,
        topic: "Voice",
        questionType: "transformation",
        acceptableAnswers: [transformed, transformed.toLowerCase()],
        steps: [
          "Identify Subject, Verb, and Object.",
          "Move Object to the Subject position.",
          "Convert verb to auxiliary verb ('was/were') + past participle.",
          "Place original Subject after 'by'.",
        ],
        explanation: `Transformed active sentence '${sentence}' into passive voice: '${transformed}'.`,
        confidence: 0.85,
      };
    }
  }

  return null;
}

const IRREGULAR_VERBS = {
  ate: "eaten",
  wrote: "written",
  took: "taken",
  saw: "seen",
  made: "made",
  gave: "given",
  drew: "drawn",
  built: "built",
  broke: "broken",
  bought: "bought",
  drove: "driven",
  sang: "sung",
  threw: "thrown",
  bit: "bitten",
};

function transformActiveToPassive(sentence) {
  // Pattern: [Subject] [Past Tense Verb] [Object]
  // e.g., "The boy kicked the ball" -> "The ball was kicked by the boy"
  const cleanSent = sentence.trim().replace(/[.!?]$/, "");
  const parts = cleanSent.split(/\s+/);
  if (parts.length < 3) return null;

  // Find verb index (simple heuristic for past tense verbs or irregular verbs)
  let verbIdx = -1;
  for (let i = 1; i < parts.length - 1; i++) {
    const word = parts[i].toLowerCase();
    if (word.endsWith("ed") || IRREGULAR_VERBS[word]) {
      verbIdx = i;
      break;
    }
  }

  if (verbIdx === -1) return null;

  const subject = parts.slice(0, verbIdx).join(" ");
  const rawVerb = parts[verbIdx].toLowerCase();
  const object = parts.slice(verbIdx + 1).join(" ");

  if (!subject || !object) return null;

  const pastParticiple = IRREGULAR_VERBS[rawVerb] || rawVerb;
  const isPluralObject = /\bs$|\b(they|them|people|children|cats|dogs|books|balls)\b/i.test(object);
  const aux = isPluralObject ? "were" : "was";

  return `${capitalize(object)} ${aux} ${pastParticiple} by ${subject.toLowerCase()}.`;
}

/* ============================================================================
   PARTS OF SPEECH ENGINE
============================================================================ */

function tryVerifyPartsOfSpeech(original, q) {
  if (!/part of speech|noun|verb|adjective|adverb|pronoun|preposition/.test(q)) {
    return null;
  }

  const intent = detectLanguageIntent(q);

  // 1. Definitions
  if (intent === "definition" || /what is|define/.test(q)) {
    const DEFINITIONS = {
      noun: "A noun is a word used to name a person, place, thing, or idea.",
      verb: "A verb is a word that expresses an action, occurrence, or state of being.",
      adjective: "An adjective is a word that describes or modifies a noun or pronoun.",
      adverb: "An adverb is a word that modifies a verb, adjective, or another adverb.",
      pronoun: "A pronoun is a word used in place of a noun.",
      preposition: "A preposition shows the relationship of a noun or pronoun to another word in the sentence.",
    };

    for (const [part, def] of Object.entries(DEFINITIONS)) {
      if (new RegExp(`\\b${part}\\b`).test(q)) {
        return {
          answer: def,
          topic: "Parts of Speech",
          questionType: "definition",
          acceptableAnswers: [def, part],
          steps: [`Identify part of speech: ${part}.`, def],
          explanation: def,
          confidence: 0.98,
        };
      }
    }
  }

  // 2. Identification from sentence
  if (intent === "identify") {
    const sentence = extractQuotedSentence(original);
    if (!sentence) return null;

    if (/\badverb\b/.test(q)) {
      return identifyAdverb(sentence);
    }
    if (/\badjective\b/.test(q)) {
      return identifyAdjective(sentence);
    }
  }

  return null;
}

function identifyAdverb(sentence) {
  const words = sentence.match(/\b[a-zA-Z]+\b/g) || [];
  // Exclude non-adverb -ly words
  const nonAdverbLy = ["friendly", "lovely", "family", "lonely", "silly", "ugly", "holly", "belly"];
  const adverbs = words.filter(
    (w) => w.toLowerCase().endsWith("ly") && !nonAdverbLy.includes(w.toLowerCase())
  );

  if (adverbs.length === 0) return null;

  return {
    answer: adverbs[0],
    topic: "Parts of Speech",
    questionType: "identification",
    acceptableAnswers: adverbs,
    steps: [
      "Scan sentence for words modifying action/manner.",
      `'${adverbs[0]}' functions as an adverb describing manner.`,
    ],
    explanation: `'${adverbs[0]}' modifies the verb/action in the sentence.`,
    confidence: 0.78,
  };
}

function identifyAdjective(sentence) {
  const words = sentence.match(/\b[a-zA-Z]+\b/g) || [];
  const commonAdjectives = [
    "beautiful", "quick", "bright", "dark", "tall", "short", "heavy", "light",
    "red", "blue", "green", "large", "small", "ancient", "young", "happy", "sad",
    "golden", "cold", "hot", "warm", "fierce", "gentle"
  ];

  const found = words.find((w) => commonAdjectives.includes(w.toLowerCase()));
  if (!found) return null;

  return {
    answer: found,
    topic: "Parts of Speech",
    questionType: "identification",
    acceptableAnswers: [found, found.toLowerCase()],
    steps: [
      "Identify descriptive word modifying a noun.",
      `'${found}' describes a noun in the sentence.`,
    ],
    explanation: `'${found}' functions as an adjective in this context.`,
    confidence: 0.82,
  };
}

/* ============================================================================
   CURATED VOCABULARY ENGINE (SYNONYMS & ANTONYMS)
============================================================================ */

const VOCABULARY = {
  happy: { synonyms: ["joyful", "glad", "cheerful", "delighted"], antonyms: ["sad", "unhappy", "sorrowful", "miserable"] },
  big: { synonyms: ["large", "huge", "enormous", "gigantic"], antonyms: ["small", "tiny", "little", "miniature"] },
  brave: { synonyms: ["courageous", "fearless", "bold", "valiant"], antonyms: ["cowardly", "timid", "fearful"] },
  fast: { synonyms: ["quick", "rapid", "swift", "speedy"], antonyms: ["slow", "sluggish"] },
  smart: { synonyms: ["clever", "intelligent", "bright", "wise"], antonyms: ["stupid", "foolish", "ignorant"] },
  strong: { synonyms: ["powerful", "mighty", "robust"], antonyms: ["weak", "feeble", "frail"] },
  cold: { synonyms: ["chilly", "freezing", "frigid"], antonyms: ["hot", "warm"] },
  hot: { synonyms: ["warm", "boiling", "scorching"], antonyms: ["cold", "cool", "chilly"] },
  ancient: { synonyms: ["old", "antique", "historic"], antonyms: ["modern", "new", "recent"] },
  difficult: { synonyms: ["hard", "challenging", "tough"], antonyms: ["easy", "simple"] },
};

function tryVerifyVocabulary(original, q) {
  const intent = detectLanguageIntent(q);
  if (intent !== "synonym" && intent !== "antonym") {
    return null;
  }

  for (const [targetWord, data] of Object.entries(VOCABULARY)) {
    const wordPattern = new RegExp(`\\b${targetWord}\\b`, "i");
    if (!wordPattern.test(q)) continue;

    const answers = intent === "synonym" ? data.synonyms : data.antonyms;

    return {
      answer: answers[0],
      topic: intent === "synonym" ? "Synonyms" : "Antonyms",
      questionType: "vocabulary",
      acceptableAnswers: answers,
      steps: [
        `Identify target word: '${targetWord}'.`,
        intent === "synonym"
          ? `Select a word with a similar meaning (e.g., '${answers[0]}').`
          : `Select a word with the opposite meaning (e.g., '${answers[0]}').`,
      ],
      explanation: `'${answers[0]}' is an established ${intent} for '${targetWord}'.`,
      confidence: 0.95,
    };
  }

  return null;
}

/* ============================================================================
   HELPERS
============================================================================ */

function extractQuotedSentence(text) {
  const patterns = [
    /"([^"]+)"/,
    /'([^']+)'/,
    /“([^”]+)”/,
    /‘([^’]+)’/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1].trim().length > 0) {
      return match[1].trim();
    }
  }

  return null;
}

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
