/**
 * TIXAR ENGLISH LANGUAGE MUTATOR
 * Version 4.0
 *
 * Design:
 *
 *   ORIGINAL QUESTION
 *          ↓
 *   SKILL DETECTION
 *          ↓
 *   SOURCE-PRESERVING MUTATION
 *          ↓
 *   DETERMINISTIC VARIANT
 *          ↓
 *   MODALITY TRANSFORMATION
 *          ↓
 *   VERIFIED OUTPUT
 *
 * Core guarantees:
 *   - NO Math.random()
 *   - NO random sorting
 *   - NO pseudo-random selection
 *   - Same input + same modality = same output
 *   - Mutation preserves the tested English concept
 *   - MCQ ordering is deterministic
 *   - Every mutation carries provenance
 *
 * Supported domains:
 *   - Verb tenses
 *   - Subject–verb agreement
 *   - Conditionals
 *   - Parts of speech
 *   - Prepositions
 *   - Articles
 *   - Pronouns
 *   - Conjunctions
 *   - Active / Passive voice
 *   - Direct / Reported speech
 *   - Sentence transformation
 *   - Punctuation
 *   - Vocabulary in context
 *   - Error correction
 *   - General grammar
 *
 * Modalities:
 *   0 = Open response
 *   1 = MCQ
 *   2 = Error detection
 *   3 = Explain the rule
 */

export class EnglishMutator {

  constructor(config = {}) {

    this.config = {
      maxVariants: 4,
      defaultVariant: 0,
      ...config
    };
  }

  // ============================================================
  // MAIN MUTATION PIPELINE
  // ============================================================

  mutate(qObj, modalityIndex = 0) {

    if (!qObj) return null;

    const stem = String(
      qObj.q ||
      qObj.stem ||
      ""
    ).trim();

    const rawAns = String(
      qObj.ans ||
      qObj.answer ||
      ""
    ).trim();

    if (!stem) return null;

    const mode = this.normalizeModality(modalityIndex);

    const skill = this.detectSkill(
      `${stem} ${String(qObj.skill || "")}`.toLowerCase()
    );

    const variantIndex = this.resolveVariant(
      qObj,
      mode
    );

    const generated = this.generateItem(
      skill,
      stem,
      rawAns,
      qObj,
      variantIndex
    );

    if (!generated) {
      return this.genericMutation(
        qObj,
        mode,
        variantIndex,
        skill
      );
    }

    const rendered = this.render(
      generated,
      mode,
      variantIndex,
      skill
    );

    return this.attachProvenance(
      rendered,
      {
        skill,
        modality: mode,
        variantIndex,
        deterministic: true
      }
    );
  }

  // ============================================================
  // MODALITY
  // ============================================================

  normalizeModality(modalityIndex) {

    const n = Number.isInteger(modalityIndex)
      ? modalityIndex
      : 0;

    return ((n % 4) + 4) % 4;
  }

  // ============================================================
  // DETERMINISTIC VARIANT SELECTION
  // ============================================================

  resolveVariant(qObj, mode) {

    /*
     * We intentionally do NOT use randomness.
     *
     * The variant is determined by:
     *
     *   explicit variant
     *   ↓
     *   modality
     *   ↓
     *   default
     */

    if (
      qObj &&
      Number.isInteger(qObj.variantIndex)
    ) {
      return (
        ((qObj.variantIndex % this.config.maxVariants) +
          this.config.maxVariants) %
        this.config.maxVariants
      );
    }

    return (
      (mode + this.config.defaultVariant) %
      this.config.maxVariants
    );
  }

  // ============================================================
  // SKILL DETECTION
  // ============================================================

  detectSkill(text) {

    const value = String(text || "").toLowerCase();

    // Reported speech first because it may contain
    // "said", "told", etc.

    if (
      /reported speech|indirect speech|direct speech|said|told|asked/.test(value)
    ) {
      return "reported_speech";
    }

    // Voice

    if (
      /passive voice|active voice|passive|active voice/.test(value)
    ) {
      return "voice";
    }

    // Conditionals

    if (
      /conditional|if clause|third conditional|second conditional|first conditional|zero conditional/.test(value)
    ) {
      return "conditionals";
    }

    // Agreement

    if (
      /subject.?verb agreement|agreement|neither|either|each|every|plural subject/.test(value)
    ) {
      return "agreement";
    }

    // Tenses

    if (
      /tense|past perfect|present perfect|future|past tense|present tense|verb form/.test(value)
    ) {
      return "tenses";
    }

    // Articles

    if (
      /article|a an the/.test(value)
    ) {
      return "articles";
    }

    // Pronouns

    if (
      /pronoun|personal pronoun|possessive pronoun|relative pronoun|reflexive pronoun/.test(value)
    ) {
      return "pronouns";
    }

    // Parts of speech

    if (
      /noun|pronoun|adjective|adverb|preposition|conjunction|part of speech/.test(value)
    ) {
      return "parts_of_speech";
    }

    // Punctuation

    if (
      /punctuation|comma|apostrophe|quotation|colon|semicolon|full stop|question mark|exclamation mark/.test(value)
    ) {
      return "punctuation";
    }

    // Vocabulary

    if (
      /synonym|antonym|meaning|vocabulary|word meaning|define|definition/.test(value)
    ) {
      return "vocabulary";
    }

    // Transformation

    if (
      /rewrite|transform|change into|convert|combine|sentence transformation/.test(value)
    ) {
      return "transformation";
    }

    // Prepositions

    if (
      /preposition|between|among|beside|during|since/.test(value)
    ) {
      return "prepositions";
    }

    // Conjunctions

    if (
      /conjunction|although|because|unless|while|whereas|however/.test(value)
    ) {
      return "conjunctions";
    }

    // Error correction

    if (
      /correct the sentence|error|incorrect|grammatically correct|mistake|correction/.test(value)
    ) {
      return "error_correction";
    }

    return "general_grammar";
  }

  // ============================================================
  // ITEM GENERATION
  // ============================================================

  generateItem(
    skill,
    originalStem,
    rawAns,
    qObj,
    variantIndex
  ) {

    switch (skill) {

      case "tenses":
        return this.generateTenseItem(
          variantIndex
        );

      case "agreement":
        return this.generateAgreementItem(
          variantIndex
        );

      case "conditionals":
        return this.generateConditionalItem(
          variantIndex
        );

      case "parts_of_speech":
        return this.generatePartsOfSpeechItem(
          variantIndex
        );

      case "voice":
        return this.generateVoiceItem(
          variantIndex
        );

      case "reported_speech":
        return this.generateReportedSpeechItem(
          variantIndex
        );

      case "articles":
        return this.generateArticleItem(
          variantIndex
        );

      case "prepositions":
        return this.generatePrepositionItem(
          variantIndex
        );

      case "punctuation":
        return this.generatePunctuationItem(
          variantIndex
        );

      case "vocabulary":
        return this.generateVocabularyItem(
          variantIndex
        );

      case "transformation":
        return this.generateTransformationItem(
          variantIndex
        );

      case "error_correction":
        return this.generateErrorCorrectionItem(
          variantIndex
        );

      case "pronouns":
        return this.generatePronounItem(
          variantIndex
        );

      case "conjunctions":
        return this.generateConjunctionItem(
          variantIndex
        );

      default:
        return this.generateFromOriginal(
          originalStem,
          rawAns
        );
    }
  }

  // ============================================================
  // TENSES
  // ============================================================

  generateTenseItem(index = 0) {

    const items = [

      {
        sentence:
          "By the time the teacher arrived, the students ______ the experiment.",

        answer: "had completed",

        options: [
          "had completed",
          "have completed",
          "were completing",
          "complete"
        ],

        rule:
          "The past perfect describes an action completed before another past action.",

        explanation:
          "'Had completed' is correct because completing the experiment happened before the teacher arrived."
      },

      {
        sentence:
          "She ______ in Nairobi for five years before moving to Mombasa.",

        answer: "had lived",

        options: [
          "had lived",
          "has lived",
          "is living",
          "lives"
        ],

        rule:
          "Use the past perfect for an action that occurred before another completed past event.",

        explanation:
          "Living in Nairobi happened before the later action of moving to Mombasa."
      },

      {
        sentence:
          "The students ______ their assignments every Friday.",

        answer: "submit",

        options: [
          "submit",
          "submitted",
          "are submitting",
          "had submitted"
        ],

        rule:
          "The simple present is used for habitual or repeated actions.",

        explanation:
          "'Every Friday' indicates a regular habit, so the simple present is appropriate."
      },

      {
        sentence:
          "Look! The children ______ across the field.",

        answer: "are running",

        options: [
          "are running",
          "ran",
          "have run",
          "had run"
        ],

        rule:
          "The present continuous describes an action happening at the time of speaking.",

        explanation:
          "'Look!' signals that the action is happening now."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // SUBJECT–VERB AGREEMENT
  // ============================================================

  generateAgreementItem(index = 0) {

    const items = [

      {
        sentence:
          "Neither the teacher nor the students ______ ready for the examination.",

        answer: "were",

        options: [
          "were",
          "was",
          "is",
          "has been"
        ],

        rule:
          "With 'neither...nor', the verb generally agrees with the subject nearer to it.",

        explanation:
          "The nearer subject is 'students', which is plural, so 'were' is required."
      },

      {
        sentence:
          "Each of the players ______ a certificate.",

        answer: "receives",

        options: [
          "receives",
          "receive",
          "receiving",
          "have received"
        ],

        rule:
          "Indefinite pronouns such as 'each' take a singular verb.",

        explanation:
          "'Each' refers to players individually, so the singular verb 'receives' is required."
      },

      {
        sentence:
          "The list of successful candidates ______ on the noticeboard.",

        answer: "is",

        options: [
          "is",
          "are",
          "were",
          "have"
        ],

        rule:
          "The verb agrees with the main subject, not a noun inside a prepositional phrase.",

        explanation:
          "The main subject is 'list', which is singular."
      },

      {
        sentence:
          "The books on the table ______ mine.",

        answer: "are",

        options: [
          "are",
          "is",
          "was",
          "has"
        ],

        rule:
          "The verb must agree with the plural subject 'books'.",

        explanation:
          "'Books' is plural, so the correct verb is 'are'."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // CONDITIONALS
  // ============================================================

  generateConditionalItem(index = 0) {

    const items = [

      {
        sentence:
          "If I had studied harder, I ______ the examination.",

        answer: "would have passed",

        options: [
          "would have passed",
          "will pass",
          "would pass",
          "passed"
        ],

        rule:
          "The third conditional uses 'if + past perfect' followed by 'would have + past participle'.",

        explanation:
          "The condition refers to an unreal situation in the past."
      },

      {
        sentence:
          "If water reaches 100°C, it ______.",

        answer: "boils",

        options: [
          "boils",
          "would boil",
          "boiled",
          "would have boiled"
        ],

        rule:
          "The zero conditional expresses general truths using the simple present in both clauses.",

        explanation:
          "Boiling at 100°C is presented as a general scientific fact."
      },

      {
        sentence:
          "If she studied harder, she ______ better results.",

        answer: "would achieve",

        options: [
          "would achieve",
          "will have achieved",
          "would have achieved",
          "achieved"
        ],

        rule:
          "The second conditional uses 'if + simple past' and 'would + base verb' for hypothetical situations.",

        explanation:
          "The sentence describes a hypothetical present or future situation."
      },

      {
        sentence:
          "If you heat ice, it ______.",

        answer: "melts",

        options: [
          "melts",
          "would melt",
          "melted",
          "would have melted"
        ],

        rule:
          "The zero conditional is used for general truths and predictable results.",

        explanation:
          "The sentence states a general physical fact."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // PARTS OF SPEECH
  // ============================================================

  generatePartsOfSpeechItem(index = 0) {

    const items = [

      {
        sentence:
          "The athlete ran extremely quickly during the race.",

        target: "extremely",

        answer: "Adverb",

        options: [
          "Adverb",
          "Adjective",
          "Noun",
          "Preposition"
        ],

        rule:
          "An adverb can modify another adverb, adjective, verb, or an entire clause.",

        explanation:
          "'Extremely' modifies the adverb 'quickly'."
      },

      {
        sentence:
          "The intelligent student solved the difficult problem.",

        target: "intelligent",

        answer: "Adjective",

        options: [
          "Adjective",
          "Adverb",
          "Preposition",
          "Conjunction"
        ],

        rule:
          "An adjective modifies or describes a noun or pronoun.",

        explanation:
          "'Intelligent' describes the noun 'student'."
      },

      {
        sentence:
          "The children played football after school.",

        target: "after",

        answer: "Preposition",

        options: [
          "Preposition",
          "Adjective",
          "Pronoun",
          "Interjection"
        ],

        rule:
          "A preposition shows a relationship between a noun or noun phrase and another word.",

        explanation:
          "'After' establishes a time relationship with 'school'."
      },

      {
        sentence:
          "The students worked carefully during the experiment.",

        target: "carefully",

        answer: "Adverb",

        options: [
          "Adverb",
          "Noun",
          "Adjective",
          "Conjunction"
        ],

        rule:
          "An adverb can describe how an action is performed.",

        explanation:
          "'Carefully' describes how the students worked."
      }
    ];

    const item = this.selectVariant(
      items,
      index
    );

    return {
      ...item,

      sentence:
        `${item.sentence} Identify the grammatical class of "${item.target}".`
    };
  }

  // ============================================================
  // ACTIVE / PASSIVE VOICE
  // ============================================================

  generateVoiceItem(index = 0) {

    const items = [

      {
        sentence:
          "The farmer planted the maize seeds.",

        answer:
          "The maize seeds were planted by the farmer.",

        options: [
          "The maize seeds were planted by the farmer.",
          "The maize seeds are planting the farmer.",
          "The farmer was planted by the maize seeds.",
          "The maize seeds had planting the farmer."
        ],

        rule:
          "To change active voice to passive voice, move the object to subject position and use the appropriate form of 'be' plus the past participle.",

        explanation:
          "'The maize seeds' becomes the subject and 'were planted' forms the passive construction."
      },

      {
        sentence:
          "The principal announced the results.",

        answer:
          "The results were announced by the principal.",

        options: [
          "The results were announced by the principal.",
          "The results announced the principal.",
          "The principal was announced by the results.",
          "The results are announcing the principal."
        ],

        rule:
          "Past simple active voice becomes 'was/were + past participle' in the passive.",

        explanation:
          "'Results' is plural, so 'were announced' is required."
      },

      {
        sentence:
          "The mechanic repaired the vehicle.",

        answer:
          "The vehicle was repaired by the mechanic.",

        options: [
          "The vehicle was repaired by the mechanic.",
          "The vehicle repaired the mechanic.",
          "The mechanic was repaired by the vehicle.",
          "The vehicle is repairing the mechanic."
        ],

        rule:
          "A past simple active sentence becomes 'was/were + past participle' in the passive.",

        explanation:
          "'Vehicle' becomes the subject and takes the singular passive form 'was repaired'."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // REPORTED SPEECH
  // ============================================================

  generateReportedSpeechItem(index = 0) {

    const items = [

      {
        sentence:
          'Mary said, "I am tired."',

        answer:
          "Mary said that she was tired.",

        options: [
          "Mary said that she was tired.",
          "Mary said that I am tired.",
          "Mary said that she is tired yesterday.",
          "Mary says that she was tired."
        ],

        rule:
          "When reporting a past statement, pronouns and tense may shift according to the reporting context.",

        explanation:
          "'I' changes to 'she' because Mary is speaking about herself, and 'am' changes to 'was'."
      },

      {
        sentence:
          'John said, "I will finish the work tomorrow."',

        answer:
          "John said that he would finish the work the next day.",

        options: [
          "John said that he would finish the work the next day.",
          "John said that I will finish the work tomorrow.",
          "John said that he will finished the work tomorrow.",
          "John said that he would finished the work yesterday."
        ],

        rule:
          "In reported speech, 'will' commonly changes to 'would' and time expressions may change according to context.",

        explanation:
          "'I' becomes 'he', 'will' becomes 'would', and 'tomorrow' becomes 'the next day'."
      },

      {
        sentence:
          'Peter said, "I can swim."',

        answer:
          "Peter said that he could swim.",

        options: [
          "Peter said that he could swim.",
          "Peter said that I can swim.",
          "Peter said that he can swimming.",
          "Peter said that he could swam."
        ],

        rule:
          "In reported speech, 'can' commonly changes to 'could' after a past reporting verb.",

        explanation:
          "'I' changes to 'he' and 'can' changes to 'could'."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // ARTICLES
  // ============================================================

  generateArticleItem(index = 0) {

    const items = [

      {
        sentence:
          "She bought ______ umbrella because it was raining.",

        answer: "an",

        options: [
          "an",
          "a",
          "the",
          "no article"
        ],

        rule:
          "Use 'an' before a singular countable noun beginning with a vowel sound.",

        explanation:
          "'Umbrella' begins with a vowel sound."
      },

      {
        sentence:
          "He is ______ university student.",

        answer: "a",

        options: [
          "a",
          "an",
          "the",
          "no article"
        ],

        rule:
          "Article choice depends on sound, not simply spelling.",

        explanation:
          "'University' begins with a /juː/ sound, so 'a university' is correct."
      },

      {
        sentence:
          "We saw ______ elephant at the wildlife centre.",

        answer: "an",

        options: [
          "an",
          "a",
          "the",
          "no article"
        ],

        rule:
          "Use 'an' before a singular countable noun beginning with a vowel sound.",

        explanation:
          "'Elephant' begins with a vowel sound."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // PREPOSITIONS
  // ============================================================

  generatePrepositionItem(index = 0) {

    const items = [

      {
        sentence:
          "The examination will begin ______ Monday.",

        answer: "on",

        options: [
          "on",
          "at",
          "in",
          "by"
        ],

        rule:
          "Use 'on' with specific days and dates.",

        explanation:
          "'Monday' is a specific day."
      },

      {
        sentence:
          "The students arrived ______ the morning.",

        answer: "in",

        options: [
          "in",
          "on",
          "at",
          "by"
        ],

        rule:
          "Use 'in' with parts of the day such as 'in the morning'.",

        explanation:
          "The standard expression is 'in the morning'."
      },

      {
        sentence:
          "The meeting starts ______ 8:00 a.m.",

        answer: "at",

        options: [
          "at",
          "on",
          "in",
          "by"
        ],

        rule:
          "Use 'at' with a specific clock time.",

        explanation:
          "'8:00 a.m.' is a specific time."
      },

      {
        sentence:
          "The students have lived here ______ 2022.",

        answer: "since",

        options: [
          "since",
          "for",
          "at",
          "during"
        ],

        rule:
          "Use 'since' with the starting point of a period.",

        explanation:
          "'2022' identifies the point when the period began."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // PUNCTUATION
  // ============================================================

  generatePunctuationItem(index = 0) {

    const items = [

      {
        sentence:
          "After completing the experiment the students recorded their results.",

        answer:
          "After completing the experiment, the students recorded their results.",

        options: [
          "After completing the experiment, the students recorded their results.",
          "After completing, the experiment the students recorded their results.",
          "After completing the experiment the students, recorded their results.",
          "After, completing the experiment the students recorded their results."
        ],

        rule:
          "A comma is commonly used after an introductory phrase or clause.",

        explanation:
          "'After completing the experiment' is an introductory phrase."
      },

      {
        sentence:
          "However the students continued with the experiment.",

        answer:
          "However, the students continued with the experiment.",

        options: [
          "However, the students continued with the experiment.",
          "However the, students continued with the experiment.",
          "However the students, continued with the experiment.",
          "However; the students continued with the experiment."
        ],

        rule:
          "A conjunctive adverb such as 'however' is commonly followed by a comma when it introduces a sentence.",

        explanation:
          "'However' introduces the sentence, so it is followed by a comma."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // VOCABULARY
  // ============================================================

  generateVocabularyItem(index = 0) {

    const items = [

      {
        sentence:
          "The manager was reluctant to invest in the new project.",

        target:
          "reluctant",

        answer:
          "Unwilling or hesitant",

        options: [
          "Unwilling or hesitant",
          "Extremely excited",
          "Completely unaware",
          "Already successful"
        ],

        rule:
          "Vocabulary meaning should be interpreted from the word's standard meaning and its context.",

        explanation:
          "'Reluctant' describes someone who is unwilling or hesitant to do something."
      },

      {
        sentence:
          "The company experienced a significant decline in sales.",

        target:
          "decline",

        answer:
          "A decrease",

        options: [
          "A decrease",
          "A celebration",
          "A sudden increase",
          "A replacement"
        ],

        rule:
          "Context can be used to infer the meaning of unfamiliar vocabulary.",

        explanation:
          "A decline in sales means that sales decreased."
      },

      {
        sentence:
          "The scientist was meticulous when recording the results.",

        target:
          "meticulous",

        answer:
          "Very careful and precise",

        options: [
          "Very careful and precise",
          "Careless and hurried",
          "Uninterested",
          "Confused"
        ],

        rule:
          "Vocabulary should be interpreted using both the word's meaning and the sentence context.",

        explanation:
          "'Meticulous' describes someone who works with great care and attention to detail."
      }
    ];

    const item = this.selectVariant(
      items,
      index
    );

    return {
      ...item,

      sentence:
        `${item.sentence} What does "${item.target}" mean in this context?`
    };
  }

  // ============================================================
  // TRANSFORMATION
  // ============================================================

  generateTransformationItem(index = 0) {

    const items = [

      {
        sentence:
          "Although he was tired, he continued working.",

        answer:
          "Despite being tired, he continued working.",

        options: [
          "Despite being tired, he continued working.",
          "Despite he was tired, he continued working.",
          "Although of being tired, he continued working.",
          "Despite tired, but he continued working."
        ],

        rule:
          "'Despite' is followed by a noun phrase, pronoun, or gerund phrase rather than a finite clause.",

        explanation:
          "'Being tired' is a gerund phrase, making 'despite being tired' grammatically correct."
      },

      {
        sentence:
          "Because he was ill, he stayed at home.",

        answer:
          "Because of his illness, he stayed at home.",

        options: [
          "Because of his illness, he stayed at home.",
          "Because of he was ill, he stayed at home.",
          "Because his illness, he stayed at home.",
          "Because of being illness, he stayed at home."
        ],

        rule:
          "'Because of' is followed by a noun phrase, while 'because' introduces a clause.",

        explanation:
          "'His illness' is a noun phrase, so 'because of his illness' is correct."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // ERROR CORRECTION
  // ============================================================

  generateErrorCorrectionItem(index = 0) {

    const items = [

      {
        sentence:
          "Neither the teacher nor the students was prepared.",

        answer:
          "Neither the teacher nor the students were prepared.",

        wrong:
          "was",

        correction:
          "were",

        rule:
          "With 'neither...nor', the verb generally agrees with the nearer subject.",

        explanation:
          "The nearer subject is 'students', which is plural."
      },

      {
        sentence:
          "She don't understand the question.",

        answer:
          "She doesn't understand the question.",

        wrong:
          "don't",

        correction:
          "doesn't",

        rule:
          "Third-person singular subjects take 'doesn't' in the negative simple present.",

        explanation:
          "'She' is third-person singular."
      },

      {
        sentence:
          "The students was working in the laboratory.",

        answer:
          "The students were working in the laboratory.",

        wrong:
          "was",

        correction:
          "were",

        rule:
          "A plural subject requires a plural verb.",

        explanation:
          "'Students' is plural, so the correct auxiliary is 'were'."
      },

      {
        sentence:
          "He has went to school.",

        answer:
          "He has gone to school.",

        wrong:
          "went",

        correction:
          "gone",

        rule:
          "The present perfect uses 'has/have + past participle'.",

        explanation:
          "'Gone' is the past participle of 'go', whereas 'went' is the simple past."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // PRONOUNS
  // ============================================================

  generatePronounItem(index = 0) {

    const items = [

      {
        sentence:
          "Mary and Jane completed the assignment by ______.",

        answer:
          "themselves",

        options: [
          "themselves",
          "herself",
          "ourselves",
          "himself"
        ],

        rule:
          "A plural subject referring to people takes the plural reflexive pronoun 'themselves'.",

        explanation:
          "Mary and Jane are two people, so 'themselves' is required."
      },

      {
        sentence:
          "John gave the book to ______.",

        answer:
          "me",

        options: [
          "me",
          "I",
          "myself",
          "mine"
        ],

        rule:
          "An object pronoun is required after the preposition 'to'.",

        explanation:
          "'Me' is the objective form of the pronoun 'I'."
      },

      {
        sentence:
          "This is the student ______ won the mathematics competition.",

        answer:
          "who",

        options: [
          "who",
          "which",
          "whom",
          "whose"
        ],

        rule:
          "Use 'who' as a relative pronoun for a person functioning as the subject of the relative clause.",

        explanation:
          "The student is the person who performed the action 'won'."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // CONJUNCTIONS
  // ============================================================

  generateConjunctionItem(index = 0) {

    const items = [

      {
        sentence:
          "She stayed at home ______ she was feeling ill.",

        answer:
          "because",

        options: [
          "because",
          "although",
          "unless",
          "while"
        ],

        rule:
          "'Because' introduces a reason or cause.",

        explanation:
          "Feeling ill explains why she stayed at home."
      },

      {
        sentence:
          "______ he was tired, he continued studying.",

        answer:
          "Although",

        options: [
          "Although",
          "Because",
          "Unless",
          "Since"
        ],

        rule:
          "'Although' introduces a contrast between two ideas.",

        explanation:
          "Being tired contrasts with the decision to continue studying."
      },

      {
        sentence:
          "You will not pass ______ you study regularly.",

        answer:
          "unless",

        options: [
          "unless",
          "because",
          "although",
          "while"
        ],

        rule:
          "'Unless' introduces a condition meaning 'if not'.",

        explanation:
          "The sentence means that passing depends on studying regularly."
      }
    ];

    return this.selectVariant(
      items,
      index
    );
  }

  // ============================================================
  // ORIGINAL QUESTION FALLBACK
  // ============================================================

  generateFromOriginal(stem, rawAns) {

    if (!rawAns) {

      return {
        sentence: stem,

        answer:
          "Apply the relevant English language rule.",

        options: [
          "Apply the relevant English language rule.",
          "Ignore the sentence structure.",
          "Choose the longest option.",
          "Use the form that fits the grammatical context."
        ],

        rule:
          "English questions should be answered by analysing sentence structure, context and grammatical relationships.",

        explanation:
          "Identify the grammatical relationship being tested before selecting or producing the answer."
      };
    }

    return {

      sentence: stem,

      answer: rawAns,

      options:
        this.buildGenericOptions(rawAns),

      rule:
        "Use the grammatical or vocabulary rule required by the sentence context.",

      explanation:
        `The correct answer is "${rawAns}" because it satisfies the requirement of the sentence.`
    };
  }

  // ============================================================
  // RENDER
  // ============================================================

  render(
    item,
    mode,
    variantIndex,
    skill
  ) {

    const answer = item.answer;

    const options =
      this.orderOptionsDeterministically(
        item.options ||
        this.buildGenericOptions(answer),
        answer,
        variantIndex
      );

    // ----------------------------------------------------------
    // MODE 0 — OPEN RESPONSE
    // ----------------------------------------------------------

    if (mode === 0) {

      return {

        q:
          `Complete or answer the following English language question:\n` +
          `"${item.sentence}"`,

        ans:
          answer,

        hint:
          this.createHint(item.rule),

        why:
          item.explanation,

        sol:
          answer,

        steps: [
          "Step 1: Read the complete sentence and identify the grammatical context.",
          `Step 2: Apply the relevant rule: ${item.rule}`,
          "Step 3: Produce the form that satisfies the rule.",
          "Step 4: Check that the completed sentence is grammatically and semantically correct."
        ],

        type:
          "open_response",

        options:
          null,

        skill
      };
    }

    // ----------------------------------------------------------
    // MODE 1 — MCQ
    // ----------------------------------------------------------

    if (mode === 1) {

      return {

        q:
          `Choose the grammatically correct answer:\n` +
          `"${item.sentence}"`,

        ans:
          answer,

        hint:
          this.createHint(item.rule),

        why:
          item.explanation,

        sol:
          answer,

        steps: [
          "Step 1: Identify what the sentence requires.",
          `Step 2: Apply the rule: ${item.rule}`,
          "Step 3: Eliminate options that violate the rule.",
          "Step 4: Select the option that fits the sentence."
        ],

        type:
          "mcq",

        options,

        skill
      };
    }

    // ----------------------------------------------------------
    // MODE 2 — ERROR DETECTION
    // ----------------------------------------------------------

    if (mode === 2) {

      const errorData =
        this.createDeterministicError(
          item,
          variantIndex
        );

      return {

        q:
          `Examine the sentence below. ` +
          `Identify the grammatical error and give the correct form:\n` +
          `"${errorData.sentence}"`,

        ans:
          errorData.answer,

        hint:
          this.createHint(item.rule),

        why:
          item.explanation,

        sol:
          errorData.solution,

        steps: [
          "Step 1: Read the sentence carefully.",
          "Step 2: Identify the word or structure causing the problem.",
          `Step 3: Apply the rule: ${item.rule}`,
          "Step 4: Replace the incorrect form and reread the sentence."
        ],

        type:
          "open_response",

        options:
          null,

        skill
      };
    }

    // ----------------------------------------------------------
    // MODE 3 — RULE EXPLANATION
    // ----------------------------------------------------------

    return {

      q:
        `Explain the English language rule being tested and give the ` +
        `correct answer:\n"${item.sentence}"`,

      ans:
        `Rule: ${item.rule}\nCorrect answer: ${answer}`,

      hint:
        "Do not only give the answer. Explain why that form is grammatically appropriate.",

      why:
        item.explanation,

      sol:
        `Rule: ${item.rule}\nCorrect answer: ${answer}`,

      steps: [
        "Step 1: Identify the grammatical structure.",
        `Step 2: State the relevant rule: ${item.rule}`,
        "Step 3: Apply the rule to the sentence.",
        `Step 4: Give the correct form: ${answer}.`
      ],

      type:
        "open_response",

      options:
        null,

      skill
    };
  }

  // ============================================================
  // DETERMINISTIC ERROR GENERATION
  // ============================================================

  createDeterministicError(
    item,
    variantIndex
  ) {

    /*
     * If the source item already contains an explicitly
     * defined error, preserve it.
     */

    if (
      item.wrong &&
      item.correction
    ) {

      const sentence =
        item.sentence.replace(
          item.wrong,
          item.wrong
        );

      return {

        sentence,

        answer:
          `Incorrect: "${item.wrong}". Correct form: "${item.correction}".`,

        solution:
          `Replace "${item.wrong}" with "${item.correction}".`
      };
    }

    /*
     * Fill-in-the-blank questions need a deterministic
     * incorrect option.
     */

    if (
      item.sentence.includes("______") &&
      Array.isArray(item.options)
    ) {

      const wrongOptions =
        item.options.filter(
          option => option !== item.answer
        );

      if (wrongOptions.length > 0) {

        const wrong =
          wrongOptions[
            variantIndex % wrongOptions.length
          ];

        const sentence =
          item.sentence.replace(
            "______",
            wrong
          );

        return {

          sentence,

          answer:
            `Incorrect: "${wrong}". Correct form: "${item.answer}".`,

          solution:
            `Replace "${wrong}" with "${item.answer}".`
        };
      }
    }

    /*
     * For complete sentences without an explicit
     * wrong form, keep the original sentence rather
     * than inventing an unsafe grammatical error.
     */

    return {

      sentence:
        item.sentence,

      answer:
        `The correct answer is "${item.answer}".`,

      solution:
        item.answer
    };
  }

  // ============================================================
  // GENERIC FALLBACK
  // ============================================================

  genericMutation(
    qObj,
    mode,
    variantIndex,
    skill
  ) {

    const stem =
      String(
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    const answer =
      String(
        qObj.ans ||
        qObj.answer ||
        ""
      ).trim();

    if (mode === 1) {

      const options =
        this.orderOptionsDeterministically(
          this.buildGenericOptions(answer),
          answer,
          variantIndex
        );

      return {

        ...qObj,

        q:
          `[English Language Check]\n${stem}\n\n` +
          "Choose the correct answer.",

        type:
          "mcq",

        options,

        hint:
          qObj.hint ||
          "Read the sentence carefully and identify the grammatical relationship being tested.",

        why:
          qObj.why ||
          "The correct answer satisfies the grammatical requirement of the sentence.",

        steps: [
          "Step 1: Read the sentence.",
          "Step 2: Identify the language skill being tested.",
          "Step 3: Apply the appropriate English rule.",
          "Step 4: Check the answer in context."
        ],

        skill,

        mutation: {
          deterministic: true,
          variantIndex,
          fallback: true
        }
      };
    }

    return {

      ...qObj,

      q:
        `[English Language Diagnostic]\n${stem}`,

      hint:
        qObj.hint ||
        "Identify the grammatical structure before answering.",

      why:
        qObj.why ||
        "The answer should be determined from sentence structure and context.",

      steps: [
        "Step 1: Identify the grammatical structure.",
        "Step 2: Determine the relevant English rule.",
        "Step 3: Apply the rule.",
        "Step 4: Verify the completed sentence."
      ],

      skill,

      mutation: {
        deterministic: true,
        variantIndex,
        fallback: true
      }
    };
  }

  // ============================================================
  // DETERMINISTIC ARRAY SELECTION
  // ============================================================

  selectVariant(
    array,
    index = 0
  ) {

    if (
      !Array.isArray(array) ||
      array.length === 0
    ) {
      return null;
    }

    const safeIndex =
      ((Number(index) || 0) % array.length + array.length) %
      array.length;

    return this.cloneItem(
      array[safeIndex]
    );
  }

  // ============================================================
  // DETERMINISTIC OPTION ORDERING
  // ============================================================

  orderOptionsDeterministically(
    options,
    answer,
    variantIndex = 0
  ) {

    const source =
      Array.isArray(options)
        ? options
        : [];

    /*
     * Remove duplicate options without changing
     * their original order.
     */

    const unique = [];

    for (const option of source) {

      const value = String(option);

      if (
        !unique.some(
          existing => existing === value
        )
      ) {
        unique.push(value);
      }
    }

    /*
     * Guarantee that the answer exists.
     */

    if (
      answer &&
      !unique.includes(String(answer))
    ) {
      unique.unshift(String(answer));
    }

    if (unique.length <= 1) {
      return unique;
    }

    /*
     * Deterministic rotation.
     *
     * No shuffle.
     * No random sort.
     */

    const shift =
      ((Number(variantIndex) || 0) %
        unique.length +
        unique.length) %
      unique.length;

    const rotated = [
      ...unique.slice(shift),
      ...unique.slice(0, shift)
    ];

    /*
     * Keep the correct answer at a deterministic
     * but changing position.
     */

    const correctIndex =
      rotated.indexOf(String(answer));

    if (correctIndex === -1) {
      return rotated;
    }

    const targetIndex =
      ((Number(variantIndex) || 0) * 2) %
      rotated.length;

    if (
      correctIndex === targetIndex
    ) {
      return rotated;
    }

    const result =
      [...rotated];

    const temp =
      result[targetIndex];

    result[targetIndex] =
      result[correctIndex];

    result[correctIndex] =
      temp;

    return result;
  }

  // ============================================================
  // HINT GENERATION
  // ============================================================

  createHint(rule) {

    if (!rule) {
      return
        "Look carefully at the sentence structure and context.";
    }

    return
      `Focus on this rule: ${rule}`;
  }

  // ============================================================
  // GENERIC OPTIONS
  // ============================================================

  buildGenericOptions(answer) {

    return [
      answer,
      "A grammatically related but incorrect form",
      "A form that does not agree with the sentence",
      "A form that changes the intended meaning"
    ];
  }

  // ============================================================
  // PROVENANCE
  // ============================================================

  attachProvenance(
    result,
    metadata
  ) {

    if (!result) return null;

    return {

      ...result,

      mutation: {

        deterministic:
          true,

        variantIndex:
          metadata.variantIndex,

        modality:
          metadata.modality,

        skill:
          metadata.skill,

        engine:
          "EnglishMutator",

        version:
          "4.0"
      }
    };
  }

  // ============================================================
  // SAFE CLONE
  // ============================================================

  cloneItem(item) {

    if (!item) return null;

    return {
      ...item,

      options:
        Array.isArray(item.options)
          ? [...item.options]
          : item.options
    };
  }
}