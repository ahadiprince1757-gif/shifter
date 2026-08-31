/**
 * Tixar English Language Mutator
 *
 * Intelligent English Assessment Engine
 *
 * Core philosophy:
 *   Diagnose → Mutate → Retrieve → Explain → Verify
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
 *
 * Modalities:
 *   0 = Open response
 *   1 = MCQ
 *   2 = Error detection
 *   3 = Explain the rule
 */

export class EnglishMutator {

  mutate(qObj, modalityIndex = null) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();
    const rawAns = String(qObj.ans || "").trim();
    const lower = stem.toLowerCase();

    if (!stem) return null;

    // ------------------------------------------------------------
    // 1. Select modality
    // ------------------------------------------------------------

    const mode =
      Number.isInteger(modalityIndex)
        ? ((modalityIndex % 4) + 4) % 4
        : Math.floor(Math.random() * 4);

    // ------------------------------------------------------------
    // 2. Detect English skill
    // ------------------------------------------------------------

    const skill = this.detectSkill(lower);

    // ------------------------------------------------------------
    // 3. Generate a diagnostic item
    // ------------------------------------------------------------

    const generated = this.generateItem(skill, stem, rawAns);

    if (!generated) {
      return this.genericMutation(qObj, mode);
    }

    // ------------------------------------------------------------
    // 4. Convert the same learning objective into different
    //    assessment modalities
    // ------------------------------------------------------------

    return this.render(generated, mode);
  }

  // ============================================================
  // SKILL DETECTION
  // ============================================================

  detectSkill(text) {

    if (
      /reported speech|direct speech|indirect speech|said|told|asked/.test(text)
    ) {
      return "reported_speech";
    }

    if (
      /passive voice|active voice|passive|active voice/.test(text)
    ) {
      return "voice";
    }

    if (
      /conditional|if clause|third conditional|second conditional|first conditional/.test(text)
    ) {
      return "conditionals";
    }

    if (
      /subject.?verb agreement|agreement|neither|either|each|every|plural subject/.test(text)
    ) {
      return "agreement";
    }

    if (
      /tense|past perfect|present perfect|future|past tense|present tense|verb form/.test(text)
    ) {
      return "tenses";
    }

    if (
      /noun|pronoun|adjective|adverb|preposition|conjunction|part of speech/.test(text)
    ) {
      return "parts_of_speech";
    }

    if (
      /article|a an the/.test(text)
    ) {
      return "articles";
    }

    if (
      /punctuation|comma|apostrophe|quotation|colon|semicolon/.test(text)
    ) {
      return "punctuation";
    }

    if (
      /synonym|antonym|meaning|vocabulary|word meaning|define/.test(text)
    ) {
      return "vocabulary";
    }

    if (
      /correct the sentence|error|incorrect|grammatically correct|mistake/.test(text)
    ) {
      return "error_correction";
    }

    if (
      /rewrite|transform|change into|convert|combine|sentence transformation/.test(text)
    ) {
      return "transformation";
    }

    if (
      /preposition|in|on|at|between|among|beside|during|since/.test(text)
    ) {
      return "prepositions";
    }

    return "general_grammar";
  }

  // ============================================================
  // ITEM GENERATION
  // ============================================================

  generateItem(skill, originalStem, rawAns) {

    switch (skill) {

      case "tenses":
        return this.generateTenseItem();

      case "agreement":
        return this.generateAgreementItem();

      case "conditionals":
        return this.generateConditionalItem();

      case "parts_of_speech":
        return this.generatePartsOfSpeechItem();

      case "voice":
        return this.generateVoiceItem();

      case "reported_speech":
        return this.generateReportedSpeechItem();

      case "articles":
        return this.generateArticleItem();

      case "prepositions":
        return this.generatePrepositionItem();

      case "punctuation":
        return this.generatePunctuationItem();

      case "vocabulary":
        return this.generateVocabularyItem();

      case "transformation":
        return this.generateTransformationItem();

      case "error_correction":
        return this.generateErrorCorrectionItem();

      default:
        return this.generateFromOriginal(originalStem, rawAns);
    }
  }

  // ============================================================
  // VERB TENSES
  // ============================================================

  generateTenseItem() {

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
          "The past perfect tense describes an action completed before another past action.",

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

    return this.pick(items);
  }

  // ============================================================
  // SUBJECT–VERB AGREEMENT
  // ============================================================

  generateAgreementItem() {

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
          "The main subject is 'list', which is singular. 'Of successful candidates' does not change the subject."
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // CONDITIONALS
  // ============================================================

  generateConditionalItem() {

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
          "The condition refers to an unreal situation in the past, so the result is 'would have passed'."
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
          "Boiling at 100°C is a general scientific fact."
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
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // PARTS OF SPEECH
  // ============================================================

  generatePartsOfSpeechItem() {

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
          "'Extremely' modifies the adverb 'quickly', showing its degree."
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
          "A preposition shows a relationship between a noun or noun phrase and another word in the sentence.",

        explanation:
          "'After' establishes a time relationship between 'school' and 'played'."
      }

    ];

    const item = this.pick(items);

    return {
      ...item,
      sentence:
        `${item.sentence} Identify the grammatical class of "${item.target}".`
    };
  }

  // ============================================================
  // ACTIVE / PASSIVE VOICE
  // ============================================================

  generateVoiceItem() {

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
          "'The maize seeds' becomes the subject, 'were planted' forms the passive construction, and 'by the farmer' identifies the original agent."
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
          "'Results' is plural, so the passive auxiliary is 'were': 'were announced'."
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // REPORTED SPEECH
  // ============================================================

  generateReportedSpeechItem() {

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
          "'I' changes to 'she' because Mary is speaking about herself, and 'am' changes to 'was' under the past reporting verb 'said'."
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
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // ARTICLES
  // ============================================================

  generateArticleItem() {

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
          "'Umbrella' begins with a vowel sound, so 'an umbrella' is correct."
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
          "'University' begins with a /juː/ sound, which is a consonant sound, so 'a university' is correct."
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // PREPOSITIONS
  // ============================================================

  generatePrepositionItem() {

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
          "'Monday' is a specific day, so 'on Monday' is correct."
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
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // PUNCTUATION
  // ============================================================

  generatePunctuationItem() {

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
          "A comma is commonly used after an introductory dependent phrase or clause.",

        explanation:
          "'After completing the experiment' is an introductory phrase, so a comma separates it from the main clause."
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // VOCABULARY
  // ============================================================

  generateVocabularyItem() {

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
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // SENTENCE TRANSFORMATION
  // ============================================================

  generateTransformationItem() {

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
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // ERROR CORRECTION
  // ============================================================

  generateErrorCorrectionItem() {

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
          "The nearer subject is 'students', which is plural, so 'were' is required."
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
          "'She' is third-person singular, so the correct auxiliary is 'does not' → 'doesn't'."
      }

    ];

    return this.pick(items);
  }

  // ============================================================
  // GENERATE FROM ORIGINAL QUESTION
  // ============================================================

  generateFromOriginal(stem, rawAns) {

    if (!rawAns) {
      return {
        sentence: stem,
        answer: "Apply the relevant English language rule.",
        options: [
          "Apply the relevant English language rule.",
          "Ignore the sentence structure.",
          "Choose the longest option.",
          "Use a random verb form."
        ],
        rule:
          "English questions should be answered by analysing sentence structure, context and grammatical relationships.",
        explanation:
          "Identify the grammatical relationship being tested before selecting the answer."
      };
    }

    return {
      sentence: stem,
      answer: rawAns,
      options: this.buildGenericOptions(rawAns),
      rule:
        "Use the grammatical or vocabulary rule required by the sentence context.",
      explanation:
        `The correct answer is "${rawAns}" because it satisfies the grammatical requirement of the sentence.`
    };
  }

  // ============================================================
  // RENDER MODALITY
  // ============================================================

  render(item, mode) {

    const answer = item.answer;
    const options = this.shuffle(
      item.options || this.buildGenericOptions(answer)
    );

    // ----------------------------------------------------------
    // MODE 0 — OPEN RESPONSE
    // ----------------------------------------------------------

    if (mode === 0) {

      return {
        q: `Complete or answer the following English language question:\n"${item.sentence}"`,

        ans: answer,

        hint: this.createHint(item.rule),

        why: item.explanation,

        sol: answer,

        steps: [
          "Step 1: Read the complete sentence and identify the grammatical context.",
          `Step 2: Apply the relevant rule: ${item.rule}`,
          `Step 3: Select or produce the form that satisfies the rule.`,
          `Step 4: Check that the completed sentence is grammatically and semantically correct.`
        ],

        type: "open_response",

        options: null,

        skill: item.rule
      };
    }

    // ----------------------------------------------------------
    // MODE 1 — MCQ
    // ----------------------------------------------------------

    if (mode === 1) {

      return {
        q: `Choose the grammatically correct answer:\n"${item.sentence}"`,

        ans: answer,

        hint: this.createHint(item.rule),

        why: item.explanation,

        sol: answer,

        steps: [
          "Step 1: Identify what the sentence requires.",
          `Step 2: Apply the rule: ${item.rule}`,
          "Step 3: Eliminate options that violate the rule.",
          `Step 4: Select "${answer}".`
        ],

        type: "mcq",

        options: options,

        skill: item.rule
      };
    }

    // ----------------------------------------------------------
    // MODE 2 — ERROR DETECTION
    // ----------------------------------------------------------

    if (mode === 2) {

      const wrong =
        item.wrong ||
        options.find(option => option !== answer) ||
        "incorrect form";

      const errorSentence = item.sentence.includes("______")
        ? item.sentence.replace("______", wrong)
        : item.sentence;

      return {
        q:
          `Examine the sentence below. ` +
          `Identify the grammatical error and give the correct form:\n` +
          `"${errorSentence}"`,

        ans:
          item.correction
            ? `Incorrect: "${wrong}". Correct form: "${item.correction}".`
            : `The correct answer is "${answer}".`,

        hint: this.createHint(item.rule),

        why: item.explanation,

        sol:
          item.correction
            ? `Replace "${wrong}" with "${item.correction}".`
            : answer,

        steps: [
          "Step 1: Read the sentence carefully.",
          "Step 2: Identify the word or structure causing the grammatical problem.",
          `Step 3: Apply the rule: ${item.rule}`,
          "Step 4: Replace the incorrect form and reread the sentence."
        ],

        type: "open_response",

        options: null,

        skill: item.rule
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

      why: item.explanation,

      sol:
        `Rule: ${item.rule}\nCorrect answer: ${answer}`,

      steps: [
        "Step 1: Identify the grammatical structure.",
        `Step 2: State the relevant rule: ${item.rule}`,
        "Step 3: Apply the rule to the sentence.",
        `Step 4: Give the correct form: ${answer}.`
      ],

      type: "open_response",

      options: null,

      skill: item.rule
    };
  }

  // ============================================================
  // GENERIC FALLBACK
  // ============================================================

  genericMutation(qObj, mode) {

    const stem = String(qObj.q || qObj.stem || "").trim();
    const answer = String(qObj.ans || "").trim();

    if (mode === 1) {

      return {
        ...qObj,

        q:
          `[English Language Check]\n${stem}\n\n` +
          "Choose the correct answer.",

        type: "mcq",

        options: this.buildGenericOptions(answer),

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
        ]
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
      ]
    };
  }

  // ============================================================
  // HELPERS
  // ============================================================

  pick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  createHint(rule) {
    if (!rule) {
      return "Look carefully at the sentence structure and context.";
    }

    return `Focus on this rule: ${rule}`;
  }

  buildGenericOptions(answer) {

    return [
      answer,
      "A grammatically related but incorrect form",
      "A form that does not agree with the sentence",
      "A form that changes the intended meaning"
    ];
  }
}