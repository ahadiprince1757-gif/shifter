
/* =========================================================
   ENGLISH PHASE 1: SENTENCE STRUCTURE & PARTS OF SPEECH
========================================================= */
/* =========================
   1. PARTS OF SPEECH
========================= */
add(
  "english",
  "grammar",
  "Parts of speech",
  `<h2>Parts of Speech</h2>
<ul>
<li><b>Adverb</b> → describes a verb, adjective, or another adverb (quickly, very, slowly)</li>
<li><b>Pronoun</b> → replaces a noun (he, she, it, they)</li>
<li><b>Preposition</b> → shows position or relationship (in, on, under, between)</li>
<li><b>Conjunction</b> → joins words or sentences (and, but, because, or)</li>
<li><b>Interjection</b> → shows strong emotion (wow!, oh!, hey!)</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Parts of speech are the building blocks of language that work together to form meaning.
</pre>

<h3> EXAMPLES</h3>
<pre>
The tall boy runs quickly in the big school.
Wow! He is very fast but tired.
She and her friend walked under the bridge because it was raining.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li>The → article (determiner)</li>
<li>tall → adjective</li>
<li>boy → noun</li>
<li>runs → verb</li>
<li>quickly → adverb</li>
<li>in → preposition</li>
<li>the → article</li>
<li>big → adjective</li>
<li>school → noun</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Confusing adjectives and adverbs</li>
<li> Thinking verbs only mean physical actions</li>
<li> Ignoring context when identifying word type</li>
</ul>

`,

[
  {
    q: "Identify noun in: The boy runs.",
    steps: [
      "Step 1: find name",
      "Step 2: boy is naming word"
    ],
    ans: "boy",
    why: "noun rule"
  },

  {
    q: "What is verb in sentence?",
    steps: [
      "Step 1: find action",
      "Step 2: runs is action"
    ],
    ans: "runs",
    why: "verb rule"
  },

  {
    q: "What is adjective?",
    steps: [
      "Step 1: describes noun",
      "Step 2: gives quality"
    ],
    ans: "Describes a noun",
    why: "definition"
  }
],

[
  {
    q: "Identify adverb: He runs quickly.",
    hint: "how action is done",
    steps: [
      "Step 1: find verb",
      "Step 2: how he runs"
    ],
    ans: "quickly",
    why: "adverb rule"
  }
]
);


/* =========================
   2. SENTENCE STRUCTURE
========================= */
add(
  "english",
  "grammar",
  "Sentence structure",
  `<h2>Sentence Structure</h2>

<h3> KEY IDEA</h3>
<pre>
A sentence structure shows how words are arranged to form meaning.
</pre>

<h3> BASIC STRUCTURE</h3>
<pre>
S + V + O
Subject + Verb + Object
</pre>

<h3> EXAMPLES</h3>
<pre>
John eats mango.
She reads a book.
The boy kicks the ball.
They watch movies.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>John</b> → Subject (doer)</li>
<li><b>eats</b> → Verb (action)</li>
<li><b>mango</b> → Object (receiver)</li>
</ul>

<hr>

<h3> SIMPLE SENTENCES</h3>
<pre>
She sleeps.
The dog barks.
I eat rice.
</pre>

<h3> SIMPLE IDEA</h3>
<pre>
A simple sentence has one subject and one verb.
</pre>

<hr>

<h3> COMPOUND SENTENCES</h3>
<pre>
A compound sentence joins two simple sentences using conjunctions.
</pre>

<h3> COMMON CONJUNCTIONS</h3>
<ul>
<li>and</li>
<li>but</li>
<li>or</li>
<li>so</li>
<li>yet</li>
</ul>

<h3> EXAMPLES</h3>
<pre>
I wanted to play, but it started raining.
She studied hard, and she passed the exam.
He was tired, so he went to sleep.
You can stay here, or you can leave.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li>I wanted to play → simple sentence</li>
<li>It started raining → simple sentence</li>
<li>but → joining word</li>
</ul>

<hr>

<h3> COMPLEX SENTENCES</h3>
<pre>
A complex sentence has one main clause and one subordinate clause.
</pre>

<h3> EXAMPLES</h3>
<pre>
I stayed home because I was sick.
When it rained, we stayed inside.
She passed the exam although it was difficult.
</pre>

<hr>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Missing conjunctions in compound sentences</li>
<li> Confusing simple and compound sentences</li>
<li> Using wrong joining words</li>
<li> Writing incomplete sentences</li>
</ul>
`,

[
  {
    q: "What is a sentence structure?",
    steps: [
      "Step 1: arrangement of words",
      "Step 2: meaning"
    ],
    ans: "Arrangement of words to form meaning",
    why: "definition"
  },

  {
    q: "What is a compound sentence?",
    steps: [
      "Step 1: two sentences",
      "Step 2: joined by conjunction"
    ],
    ans: "A sentence made of two simple sentences joined by a conjunction",
    why: "grammar rule"
  },

  {
    q: "Identify: I was tired so I slept.",
    steps: [
      "Step 1: two ideas",
      "Step 2: joined by 'so'"
    ],
    ans: "Compound sentence",
    why: "structure identification"
  },

  {
    q: "Give example of compound sentence",
    steps: [
      "Step 1: two ideas",
      "Step 2: join"
    ],
    ans: "She studied hard and she passed",
    why: "example"
  }
]
);
/* =========================
   3. TENSES (PRESENT, PAST, FUTURE)
========================= */

add(
  "english",
  "grammar",
  "Tenses",
  `<h2>Tenses</h2>
<h3> KEY IDEA</h3>
<pre>
Tenses show the time of an action: present, past, or future.
</pre>

<h3> BASIC PATTERNS</h3>
<pre>
Present → Subject + base verb (She plays)
Past → Subject + past verb (She played)
Future → Subject + will + base verb (She will play)
</pre>

<h3> EXAMPLES</h3>
<pre>
Present → She plays football.
Past → She played football.
Future → She will play football.

Present → They eat rice.
Past → They ate rice.
Future → They will eat rice.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>She</b> → Subject</li>
<li><b>plays / played / will play</b> → Verb forms (tense changes)</li>
<li><b>football</b> → Object</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Mixing past and present in one sentence incorrectly</li>
<li> Forgetting “will” in future tense</li>
<li> Using wrong verb form (e.g., “she play yesterday”)</li>
</ul>
`,

[
  {
    q: "What is past tense of eat?",
    steps: [
      "Step 1: identify verb",
      "Step 2: change form"
    ],
    ans: "ate",
    why: "verb change"
  },

  {
    q: "What is future tense marker?",
    steps: [
      "Step 1: check structure",
      "Step 2: will"
    ],
    ans: "will",
    why: "grammar rule"
  },

  {
    q: "Identify tense: He walked home.",
    steps: [
      "Step 1: walked = past"
    ],
    ans: "Past tense",
    why: "verb form"
  }
],

[
  {
    q: "Convert: I go → past tense",
    hint: "went",
    steps: [
      "Step 1: change verb"
    ],
    ans: "I went",
    why: "tense transformation"
  }
]
);


/* =========================
   4. PUNCTUATION
========================= */

add(
  "english",
  "grammar",
  "Punctuation",
  `<h2>Punctuation</h2>
improve this notes <h3> NOTES</h3>
<ul>
<li><b>Full stop (.)</b> → ends a complete sentence</li>
<li><b>Comma (,)</b> → separates ideas, items, or pauses in a sentence</li>
<li><b>Question mark (?)</b> → used at the end of a question</li>
<li><b>Exclamation mark (!)</b> → shows strong emotion or emphasis</li>
<li><b>Apostrophe (’)</b> → shows possession or contraction (e.g., John's, don't)</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Punctuation helps writing become clear, structured, and meaningful.
</pre>

<h3> EXAMPLES</h3>
<pre>
Where are you?
I am fine.
Wow! That is amazing.

I bought apples, bananas, oranges, and mangoes.
John’s book is on the table.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>Where are you?</b> → Question mark shows inquiry</li>
<li><b>I am fine.</b> → Full stop ends a statement</li>
<li><b>I bought apples, bananas, oranges</b> → Commas separate items</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Forgetting punctuation at the end of sentences</li>
<li> Overusing commas in simple sentences</li>
<li> Using question marks in statements</li>
</ul>
`,

[
  {
    q: "What is function of full stop?",
    steps: [
      "Step 1: end sentence",
      "Step 2: complete idea"
    ],
    ans: "Ends a sentence",
    why: "punctuation rule"
  },

  {
    q: "When do we use question mark?",
    steps: [
      "Step 1: ask question",
      "Step 2: interrogative sentence"
    ],
    ans: "In questions",
    why: "grammar usage"
  },

  {
    q: "Fix: how are you",
    steps: [
      "Step 1: add capital",
      "Step 2: add question mark"
    ],
    ans: "How are you?",
    why: "correction"
  }
],

[
  {
    q: "Correct: i am fine",
    hint: "capital letter",
    steps: [
      "Step 1: capitalize I"
    ],
    ans: "I am fine.",
    why: "punctuation rule"
  }
]
);


/* =========================
   5. ACTIVE AND PASSIVE VOICE
========================= */

add(
  "english",
  "grammar",
  "Active & Passive",
  `<h2>Active & Passive Voice</h2>
<h3> NOTES</h3>
<ul>
<li><b>Active Voice</b> → the subject performs the action</li>
<li><b>Passive Voice</b> → the subject receives the action</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Active voice focuses on the doer, while passive voice focuses on the receiver of the action.
</pre>

<h3> STRUCTURE</h3>

<h4>Active Voice</h4>
<pre>
Subject + Verb + Object
The boy eats a mango.
</pre>

<h4>Passive Voice</h4>
<pre>
Object + to be verb + past participle + by + subject
The mango is eaten by the boy.
</pre>

<h3> MORE EXAMPLES</h3>
<pre>
Active: She writes a letter.
Passive: A letter is written by her.

Active: They built the house.
Passive: The house was built by them.

Active: The teacher teaches the class.
Passive: The class is taught by the teacher.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>Active:</b> The boy eats mango → focus on “boy” (doer)</li>
<li><b>Passive:</b> The mango is eaten by the boy → focus on “mango” (receiver)</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Forgetting the correct “to be” verb (is, was, are, were)</li>
<li> Using wrong past participle form</li>
<li> Thinking passive voice is incorrect or useless</li>
</ul>
`,

[
  {
    q: "What is active voice?",
    steps: [
      "Step 1: subject acts",
      "Step 2: performs action"
    ],
    ans: "Subject performs action",
    why: "definition"
  },

  {
    q: "What is passive voice?",
    steps: [
      "Step 1: object becomes subject",
      "Step 2: receives action"
    ],
    ans: "Subject receives action",
    why: "grammar rule"
  },

  {
    q: "Change to passive: John writes letter.",
    steps: [
      "Step 1: identify object",
      "Step 2: restructure sentence"
    ],
    ans: "Letter is written by John",
    why: "conversion rule"
  }
],

[
  {
    q: "Why passive voice used?",
    hint: "focus object",
    steps: [
      "Step 1: emphasize action receiver"
    ],
    ans: "To focus on object",
    why: "usage reason"
  }
]
);


/* =========================
   6. COMMON ERRORS
========================= */

add(
  "english",
  "grammar",
  "Common errors",
  `<h2>Common Errors</h2>

<h3> NOTES</h3>
<ul>
<li><b>Subject-Verb Agreement</b> → the verb must match the subject in number (singular/plural)</li>
<li><b>Tense Errors</b> → incorrect use of time forms (present, past, future)</li>
<li><b>Spelling Mistakes</b> → incorrect writing of words that affects clarity and meaning</li>
<li><b>Punctuation Errors</b> → missing or incorrect use of punctuation marks</li>
<li><b>Word Order Errors</b> → incorrect arrangement of words in a sentence</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Grammar errors happen when structure, time, or word forms do not match correctly.
</pre>
<h3> EXAMPLES</h3>
<pre>
 He go →  He goes
 They is →  They are
 She eat yesterday →  She ate yesterday
 I am go to school →  I am going to school
 He writed a letter →  He wrote a letter
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>He go</b> → wrong because singular subject needs “goes”</li>
<li><b>They is</b> → wrong because plural subject needs “are”</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Ignoring singular vs plural verb forms</li>
<li> Mixing past and present tense in one sentence</li>
<li> Spelling words the way they sound instead of correct form</li>
</ul>
`,

[
  {
    q: "Correct: She go to school",
    steps: [
      "Step 1: singular subject",
      "Step 2: add -s"
    ],
    ans: "She goes to school",
    why: "subject-verb agreement"
  },

  {
    q: "Why errors happen?",
    steps: [
      "Step 1: wrong grammar use",
      "Step 2: lack of rules"
    ],
    ans: "Incorrect grammar application",
    why: "learning gap"
  },

  {
    q: "Correct: They is happy",
    steps: [
      "Step 1: plural subject",
      "Step 2: change verb"
    ],
    ans: "They are happy",
    why: "grammar rule"
  }
],

[
  {
    q: "Fix: He eat rice",
    hint: "verb agreement",
    steps: [
      "Step 1: add -s"
    ],
    ans: "He eats rice",
    why: "grammar correction"
  }
]
);


/* =========================
   7. SENTENCE TYPES
========================= */

add(
  "english",
  "grammar",
  "Sentence types",
  `<h2>Sentence Types</h2>
<h3> NOTES</h3>
<ul>
<li><b>Declarative Sentence</b> → makes a statement or gives information</li>
<li><b>Interrogative Sentence</b> → asks a question</li>
<li><b>Imperative Sentence</b> → gives a command, instruction, or request</li>
<li><b>Exclamatory Sentence</b> → expresses strong emotion or feeling</li>
</ul>
<h3> KEY IDEA</h3>
<p>
Sentence types show the purpose or intention behind a sentence—whether we are stating, asking, commanding, or expressing strong feelings.
</p>

<hr>

<h3> MAIN TYPES OF SENTENCES</h3>
<pre>
Declarative   → makes a statement
Interrogative → asks a question
Imperative    → gives a command or instruction
Exclamatory   → expresses strong feeling or emotion
</pre>

<hr>

<h3> SIMPLE EXAMPLES</h3>
<pre>
Declarative   → I am going home.
Interrogative → What is your name?
Imperative    → Close the door.
Exclamatory   → What a beautiful day!
</pre>
<hr>
<h3> BREAKDOWN (HOW TO IDENTIFY)</h3>
<ul>
  <li><b>Go home!</b> → Imperative (it gives a command)</li>
  <li><b>What is this?</b> → Interrogative (it asks a question)</li>
  <li><b>I like music.</b> → Declarative (it gives information)</li>
  <li><b>Wow! That is amazing!</b> → Exclamatory (it shows strong emotion)</li>
</ul>
<hr>
<h3> QUICK MEMORY TRICK</h3>
<pre>
D → Declares (statement)
I → Inquires (question)
I → Instructs (command)
E → Expresses emotion
</pre>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Confusing questions with statements</li>
<li> Forgetting question marks in interrogative sentences</li>
<li> Using wrong tone for exclamatory sentences</li>
</ul>
`,

[
  {
    q: "What is declarative sentence?",
    steps: [
      "Step 1: gives information"
    ],
    ans: "Statement",
    why: "definition"
  },

  {
    q: "Identify: What are you doing?",
    steps: [
      "Step 1: question form"
    ],
    ans: "Interrogative",
    why: "sentence type"
  },

  {
    q: "Identify: Wow! That is amazing!",
    steps: [
      "Step 1: emotion expressed"
    ],
    ans: "Exclamatory",
    why: "sentence type"
  }
],

[
  {
    q: "What type: Close the door.",
    hint: "command",
    steps: [
      "Step 1: imperative action"
    ],
    ans: "Imperative",
    why: "structure rule"
  }
]
);


/* =========================
   8. IMPORTANCE OF GRAMMAR
========================= */

add(
  "english",
  "grammar",
  "Importance of grammar",
  `<h2>Importance of Grammar</h2>

<h3> NOTES</h3>
<ul>
<li><b>Clear Communication</b> → prevents misunderstandings between speaker and listener or writer and reader</li>
<li><b>Writing Improvement</b> → makes essays, reports, and emails more structured and professional</li>
<li><b>Exam Success</b> → helps in scoring higher marks in language and composition tasks</li>
<li><b>Professionalism</b> → shows accuracy, discipline, and attention to detail</li>
<li><b>Comprehension</b> → improves ability to understand written texts correctly</li>
<li><b>Logical Expression</b> → helps organize ideas in a clear and meaningful order</li>
<li><b>Confidence in Language</b> → reduces fear of speaking or writing incorrectly</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Grammar is the structure that turns thoughts into clear and understandable communication.
</pre>

<h3> EXAMPLE</h3>
<pre>
 Correct grammar → clear meaning
"I am going to school."

 Wrong grammar → confusion
"I going school am."
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>Correct sentence</b> → follows proper word order and tense rules</li>
<li><b>Incorrect sentence</b> → breaks structure, making meaning unclear</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Ignoring sentence structure rules</li>
<li> Mixing tenses in one sentence</li>
<li> Writing words in incorrect order</li>
</ul>
`,

[
  {
    q: "Why grammar important?",
    steps: [
      "Step 1: clarity",
      "Step 2: communication"
    ],
    ans: "Clear communication",
    why: "importance"
  },

  {
    q: "What happens with bad grammar?",
    steps: [
      "Step 1: misunderstanding",
      "Step 2: confusion"
    ],
    ans: "Communication failure",
    why: "effect"
  },

  {
    q: "Why students study grammar?",
    steps: [
      "Step 1: exams",
      "Step 2: writing skills"
    ],
    ans: "For exams and writing",
    why: "purpose"
  }
],

[
  {
    q: "What improves communication?",
    hint: "grammar",
    steps: [
      "Step 1: language rules"
    ],
    ans: "Grammar",
    why: "language system"
  }
]
);

/* =========================================================
   ENGLISH PHASE 2: COMPREHENSION & SUMMARY
========================================================= */
/* =========================
   1. COMPREHENSION SKILLS
========================= */

add(
  "english",
  "comprehension",
  "Comprehension skills",
  `<h2>Comprehension Skills</h2>

<h3> NOTES</h3>
<ul>
<li><b>Reading for Meaning</b> → understanding what the text is actually saying, not just reading words</li>
<li><b>Understanding Ideas in Context</b> → interpreting meaning based on surrounding sentences and overall passage</li>
<li><b>Answering Based on Evidence</b> → using information directly from the passage to support answers</li>
<li><b>Inference Skills</b> → reading between the lines to understand implied meaning</li>
<li><b>Vocabulary in Context</b> → guessing meaning of words based on how they are used in the passage</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Comprehension is not memorization—it is understanding and interpreting meaning from text.
</pre>

<h3> STRATEGY</h3>
<pre>
Read → Understand → Locate → Analyze → Answer
</pre>

<h3> STEP-BY-STEP EXPLANATION</h3>
<ul>
<li><b>Read</b> → go through the passage carefully without rushing</li>
<li><b>Understand</b> → identify the main idea and supporting details</li>
<li><b>Locate</b> → find where the answer is in the passage</li>
<li><b>Analyze</b> → compare question with passage information</li>
<li><b>Answer</b> → write a clear response based on evidence</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Passage: The Nile River provides water for farming in Egypt.

Question: Why is the Nile important?

Answer: It provides water for farming.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Answering from personal opinion instead of passage</li>
<li> Skipping parts of the text</li>
<li> Misunderstanding key ideas in the passage</li>
</ul>

`,

[
  {
    q: "What is comprehension?",
    steps: [
      "Step 1: read passage",
      "Step 2: understand meaning"
    ],
    ans: "Understanding a passage",
    why: "definition"
  },

  {
    q: "Why reading passage first is important?",
    steps: [
      "Step 1: get idea",
      "Step 2: avoid guessing"
    ],
    ans: "To understand context",
    why: "strategy rule"
  },

  {
    q: "Where should answers come from?",
    steps: [
      "Step 1: locate evidence",
      "Step 2: use passage"
    ],
    ans: "From the passage",
    why: "exam rule"
  }
],

[
  {
    q: "What is first step in comprehension?",
    hint: "read",
    steps: [
      "Step 1: start reading"
    ],
    ans: "Reading the passage",
    why: "process order"
  }
]
);


/* =========================
   2. INFERENCE QUESTIONS
========================= */

add(
  "english",
  "comprehension",
  "Inference questions",
  `<h2>Inference Questions</h2>

<h3> NOTES</h3>
<ul>
<li><b>Answers Not Directly Stated</b> → the answer is not written exactly in the passage</li>
<li><b>Using Clues in Passage</b> → small hints in sentences help you figure out meaning</li>
<li><b>Requires Logical Thinking</b> → you must connect ideas to reach a conclusion</li>
<li><b>Context Understanding</b> → meaning depends on surrounding information</li>
<li><b>Evidence-Based Reasoning</b> → conclusions must be supported by text clues</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Inference means reading between the lines to find meaning that is suggested, not stated.
</pre>

<h3> STRATEGY</h3>
<pre>
Clue + Logic + Context = Answer
</pre>

<h3> STEP-BY-STEP METHOD</h3>
<ul>
<li><b>Step 1:</b> Read the question carefully</li>
<li><b>Step 2:</b> Identify clues in the passage</li>
<li><b>Step 3:</b> Think about what those clues suggest</li>
<li><b>Step 4:</b> Combine clues with logic</li>
<li><b>Step 5:</b> Write the most reasonable answer</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Passage: The ground was wet and people carried umbrellas.

Question: What is the weather like?

Answer: It is raining.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Clue:</b> Wet ground + umbrellas</li>
<li><b>Logic:</b> Umbrellas are used in rain</li>
<li><b>Conclusion:</b> It must be raining</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Copying answers that are not stated or supported</li>
<li> Ignoring small clues in the passage</li>
<li> Using personal opinion instead of evidence</li>
</ul>
`,

[
  {
    q: "What is inference?",
    steps: [
      "Step 1: look for clues",
      "Step 2: think logically"
    ],
    ans: "Reading between lines",
    why: "definition"
  },

  {
    q: "Why inference is important?",
    steps: [
      "Step 1: hidden meaning",
      "Step 2: deeper understanding"
    ],
    ans: "To find hidden meaning",
    why: "exam skill"
  },

  {
    q: "How do you answer inference questions?",
    steps: [
      "Step 1: identify clues",
      "Step 2: combine ideas"
    ],
    ans: "Use context clues",
    why: "method"
  }
],

[
  {
    q: "If a boy is smiling after exam, what can you infer?",
    hint: "emotion",
    steps: [
      "Step 1: interpret behavior"
    ],
    ans: "He did well",
    why: "logical inference"
  }
]
);


/* =========================
   3. VOCABULARY IN CONTEXT
========================= */

add(
  "english",
  "comprehension",
  "Vocabulary in context",
  `<h2>Vocabulary in Context</h2>

<h3> NOTES</h3>
<ul>
<li><b>Meaning Depends on Sentence</b> → a word’s meaning changes based on how it is used</li>
<li><b>Same Word, Different Meanings</b> → one word can have multiple meanings depending on context</li>
<li><b>Use Context Clues</b> → surrounding words help you understand the correct meaning</li>
<li><b>Sentence Situation</b> → the topic or situation of the sentence guides meaning</li>
<li><b>Word Position</b> → how a word is placed in a sentence can change its meaning</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Words do not have fixed meaning alone—they gain meaning from context.
</pre>

<h3> EXAMPLE</h3>
<pre>
He banked the money. → (bank = financial institution / to deposit money)

The river bank is muddy. → (bank = side of a river)
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>First sentence</b> → financial meaning (money is stored in a bank)</li>
<li><b>Second sentence</b> → geographical meaning (land beside a river)</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Assuming every word has only one meaning</li>
<li> Ignoring surrounding words in the sentence</li>
<li> Translating words without context</li>
</ul>
`,

[
  {
    q: "What is vocabulary in context?",
    steps: [
      "Step 1: check sentence",
      "Step 2: find meaning"
    ],
    ans: "Word meaning in sentence",
    why: "definition"
  },

  {
    q: "Why words have different meanings?",
    steps: [
      "Step 1: context changes",
      "Step 2: usage differs"
    ],
    ans: "Depends on context",
    why: "language rule"
  },

  {
    q: "Meaning of 'bank' in finance context?",
    steps: [
      "Step 1: money related",
      "Step 2: institution"
    ],
    ans: "Financial institution",
    why: "context clue"
  }
],

[
  {
    q: "Meaning of 'bright' in 'bright student'?",
    hint: "intelligent",
    steps: [
      "Step 1: adjective use"
    ],
    ans: "Intelligent",
    why: "context meaning"
  }
]
);


/* =========================
   4. FACTUAL QUESTIONS
========================= */

add(
  "english",
  "comprehension",
  "Factual questions",
  `<h2>Factual Questions</h2>
<h3> NOTES</h3>
<ul>
<li><b>Answers Directly in Passage</b> → the answer is clearly written in the text</li>
<li><b>No Interpretation Needed</b> → you do not need to guess or infer meaning</li>
<li><b>Look for Keywords</b> → important words in the question help you find the answer quickly</li>
<li><b>Exact Matching</b> → answers often appear in the same or very similar wording</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Direct questions test your ability to find information, not interpret it.
</pre>

<h3> STRATEGY</h3>
<pre>
Locate → Identify keyword → Copy relevant idea → Answer
</pre>

<h3> STEP-BY-STEP METHOD</h3>
<ul>
<li><b>Step 1:</b> Read the question carefully and pick out keywords</li>
<li><b>Step 2:</b> Scan the passage for those keywords</li>
<li><b>Step 3:</b> Find the exact sentence containing the answer</li>
<li><b>Step 4:</b> Copy or slightly rephrase the idea</li>
<li><b>Step 5:</b> Write a clear final answer</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Passage: The Nile River provides water for farming in Egypt.

Question: What does the Nile River provide?

Answer: Water for farming.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Keyword:</b> Nile River</li>
<li><b>Location:</b> First sentence</li>
<li><b>Answer:</b> Clearly stated in passage</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Overthinking simple questions</li>
<li> Using outside knowledge instead of passage</li>
<li> Missing keywords while scanning</li>
</ul>
`,

[
  {
    q: "What are factual questions?",
    steps: [
      "Step 1: find direct info",
      "Step 2: no guessing"
    ],
    ans: "Direct questions from passage",
    why: "definition"
  },

  {
    q: "How do you answer factual questions?",
    steps: [
      "Step 1: locate sentence",
      "Step 2: extract answer"
    ],
    ans: "From passage directly",
    why: "method"
  },

  {
    q: "Why are factual questions easy?",
    steps: [
      "Step 1: answers visible",
      "Step 2: no inference"
    ],
    ans: "Directly stated",
    why: "reason"
  }
],

[
  {
    q: "Where do factual answers come from?",
    hint: "text",
    steps: [
      "Step 1: scan passage"
    ],
    ans: "From the passage",
    why: "exam rule"
  }
]
);


/* =========================
   5. SUMMARY WRITING (RULES)
========================= */

add(
  "english",
  "summary",
  "Summary writing rules",
  `<h2>Summary Writing</h2>
<h3> NOTES</h3>
<ul>
<li><b>Shorten Passage Ideas</b> → reduce long text into a shorter version without losing meaning</li>
<li><b>Keep Key Points Only</b> → focus on main ideas, not small details</li>
<li><b>Use Own Words</b> → rewrite ideas instead of copying exact sentences</li>
<li><b>Remove Unnecessary Information</b> → leave out examples and repetition unless important</li>
<li><b>Maintain Meaning</b> → ensure the summary still reflects the original idea</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Summarizing means keeping the meaning while reducing the size of the text.
</pre>

<h3> METHOD</h3>
<pre>
Read → Underline → Select → Rewrite → Simplify
</pre>

<h3> STEP-BY-STEP EXPLANATION</h3>
<ul>
<li><b>Read</b> → understand the full passage</li>
<li><b>Underline</b> → highlight important ideas</li>
<li><b>Select</b> → choose only key points</li>
<li><b>Rewrite</b> → put ideas into your own words</li>
<li><b>Simplify</b> → make it short and clear</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Original: The Nile River provides water for farming, supports life in Egypt, and is very important for agriculture.

Summary: The Nile River is important for farming and life in Egypt.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Key idea:</b> Nile supports farming and life</li>
<li><b>Removed:</b> extra explanation and repetition</li>
<li><b>Result:</b> shorter but same meaning</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Copying full sentences from the passage</li>
<li> Leaving out important ideas</li>
<li> Making summary longer than original text</li>
</ul>
`,

[
  {
    q: "What is summary writing?",
    steps: [
      "Step 1: shorten text",
      "Step 2: keep meaning"
    ],
    ans: "Short form of passage",
    why: "definition"
  },

  {
    q: "Why use own words?",
    steps: [
      "Step 1: avoid copying",
      "Step 2: show understanding"
    ],
    ans: "To show comprehension",
    why: "writing skill"
  },

  {
    q: "What should be removed in summary?",
    steps: [
      "Step 1: examples",
      "Step 2: repetition"
    ],
    ans: "Unnecessary details",
    why: "summarizing rule"
  }
],

[
  {
    q: "What is first step in summary?",
    hint: "read",
    steps: [
      "Step 1: understand passage"
    ],
    ans: "Reading",
    why: "process step"
  }
]
);


/* =========================
   6. PARAPHRASING
========================= */

add(
  "english",
  "summary",
  "Paraphrasing",
  `<h2>Paraphrasing</h2>

<h3> NOTES</h3>
<ul>
<li><b>Rewrite Using Different Words</b> → express the same idea using new vocabulary and sentence structure</li>
<li><b>Keep Same Meaning</b> → do not change the original message or intention</li>
<li><b>Important in Summaries</b> → helps avoid copying while still preserving ideas</li>
<li><b>Change Structure</b> → you can rearrange sentence parts while keeping meaning</li>
<li><b>Use Synonyms</b> → replace words with similar meanings where appropriate</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Paraphrasing is changing how something is said, not what it means.
</pre>

<h3> EXAMPLES</h3>
<pre>
Original: He is very intelligent.
Paraphrase: He is highly smart.

Original: The boy is running quickly.
Paraphrase: The boy is moving fast on foot.

Original: She is angry about the situation.
Paraphrase: She is upset because of the situation.
</pre>

<h3> BREAKDOWN EXAMPLE</h3>
<ul>
<li><b>Original:</b> He is very intelligent</li>
<li><b>Step 1:</b> Identify meaning (smart person)</li>
<li><b>Step 2:</b> Replace words (very intelligent → highly smart)</li>
<li><b>Result:</b> Same meaning, different wording</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Changing the meaning while rewriting</li>
<li> Copying too many original words</li>
<li> Using incorrect synonyms that don’t fit context</li>
</ul>
`,

[
  {
    q: "What is paraphrasing?",
    steps: [
      "Step 1: change words",
      "Step 2: keep meaning"
    ],
    ans: "Rewriting in own words",
    why: "definition"
  },

  {
    q: "Why paraphrasing important?",
    steps: [
      "Step 1: avoid copying",
      "Step 2: improve clarity"
    ],
    ans: "Improves expression",
    why: "skill purpose"
  },

  {
    q: "Paraphrase: He is tired",
    steps: [
      "Step 1: find meaning",
      "Step 2: rewrite"
    ],
    ans: "He is exhausted",
    why: "language change"
  }
],

[
  {
    q: "What must remain same in paraphrasing?",
    hint: "meaning",
    steps: [
      "Step 1: change words only"
    ],
    ans: "Meaning",
    why: "rule"
  }
]
);


/* =========================
   7. ANSWERING TECHNIQUES
========================= */

add(
  "english",
  "comprehension",
  "Answering techniques",
  `<h2>Answering Techniques</h2>
<ul>
<li><b>Stay Focused</b> → avoid adding unrelated information</li>
<li><b>Check Keywords</b> → identify important words in the question and passage</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Good answers come from understanding the question and using clear evidence from the passage.
</pre>

<h3> STRATEGY</h3>
<pre>
Understand → Locate → Extract Evidence → Answer Clearly
</pre>

<h3> STEP-BY-STEP METHOD</h3>
<ul>
<li><b>Step 1:</b> Understand what the question is asking</li>
<li><b>Step 2:</b> Find relevant part of the passage</li>
<li><b>Step 3:</b> Extract correct information</li>
<li><b>Step 4:</b> Write a short and clear answer</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Passage: The Nile River provides water for farming in Egypt.

Question: Why is the Nile important?

Answer: It provides water for farming.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Writing too long or unnecessary explanations</li>
<li> Ignoring passage evidence</li>
<li> Misreading the question</li>
</ul>
`,

[
  {
    q: "Why read questions carefully?",
    steps: [
      "Step 1: avoid mistakes",
      "Step 2: understand requirement"
    ],
    ans: "To avoid wrong answers",
    why: "exam skill"
  },

  {
    q: "How should answers be written?",
    steps: [
      "Step 1: short",
      "Step 2: clear"
    ],
    ans: "Concise and clear",
    why: "writing rule"
  },

  {
    q: "Why use passage evidence?",
    steps: [
      "Step 1: support answer",
      "Step 2: avoid guessing"
    ],
    ans: "To support correctness",
    why: "exam marking"
  }
],

[
  {
    q: "What makes good answer?",
    hint: "clear and short",
    steps: [
      "Step 1: remove extra words"
    ],
    ans: "Concise answer",
    why: "exam standard"
  }
]
);


/* =========================
   8. IMPORTANCE OF COMPREHENSION
========================= */

add(
  "english",
  "comprehension",
  "Importance",
  `<h2>Importance of Comprehension</h2>

<h3> NOTES</h3>
<ul>
<li><b>Improves Reading Skills</b> → increases speed, accuracy, and understanding of texts</li>
<li><b>Helps Exam Performance</b> → improves ability to answer questions correctly under time limits</li>
<li><b>Builds Vocabulary</b> → introduces new words and their meanings in context</li>
<li><b>Enhances Critical Thinking</b> → helps analyze and interpret information</li>
<li><b>Improves Focus</b> → trains the mind to pay attention to detail</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Strong comprehension skills improve both academic success and real-world understanding.
</pre>

<h3> EXAMPLE</h3>
<pre>
Good comprehension → high marks and clear understanding
Poor comprehension → low marks and confusion
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Good comprehension</b> → correct answers + understanding of ideas</li>
<li><b>Poor comprehension</b> → missed meaning + wrong answers</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Skipping reading practice regularly</li>
<li> Ignoring unknown words instead of learning them</li>
<li> Rushing through passages without understanding</li>
</ul>
`,

[
  {
    q: "Why comprehension is important?",
    steps: [
      "Step 1: understanding text",
      "Step 2: exam success"
    ],
    ans: "Improves understanding",
    why: "importance"
  },

  {
    q: "How does comprehension help exams?",
    steps: [
      "Step 1: better answers",
      "Step 2: correct interpretation"
    ],
    ans: "Improves marks",
    why: "academic benefit"
  },

  {
    q: "What improves vocabulary?",
    steps: [
      "Step 1: reading passages",
      "Step 2: context learning"
    ],
    ans: "Comprehension practice",
    why: "learning effect"
  }
],

[
  {
    q: "What skill is improved by reading passages?",
    hint: "vocabulary",
    steps: [
      "Step 1: exposure to words"
    ],
    ans: "Vocabulary",
    why: "language development"
  }
]
);

/* =========================================================
   ENGLISH PHASE 3: ESSAY WRITING SYSTEM
========================================================= */

/* =========================
   5. PARAGRAPH WRITING
========================= */
add(
  "english",
  "writing",
  "Paragraph writing",
  `<h2>Paragraph Writing</h2>
<ul>
<li><b>Example or Illustration</b> → helps make the idea clearer and more understandable</li>
<li><b>Unity</b> → all sentences in the paragraph must relate to the main idea</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A strong paragraph builds one clear idea step by step using support and examples.
</pre>

<h3> FORMAT</h3>
<pre>
Topic sentence → Explanation → Example → (Optional) Conclusion sentence
</pre>

<h3> DETAILED BREAKDOWN</h3>
<ul>
<li><b>Topic Sentence</b> → tells the reader what the paragraph is about</li>
<li><b>Explanation</b> → gives details or reasons about the topic sentence</li>
<li><b>Example</b> → provides real-life or logical illustration</li>
<li><b>Conclusion Sentence (optional)</b> → wraps up the idea neatly</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Topic sentence: Education is important in life.

Explanation: It helps people gain knowledge and skills needed for success.

Example: For instance, educated people are more likely to get better jobs.

Conclusion: Therefore, education plays a key role in personal development.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Mixing multiple ideas in one paragraph</li>
<li> Missing topic sentence</li>
<li> Adding unrelated information</li>
</ul>
`,

[
  {
    q: "What is paragraph?",
    steps: [
      "Step 1: group of sentences",
      "Step 2: one idea"
    ],
    ans: "Unit of writing with one idea",
    why: "definition"
  },

  {
    q: "What is topic sentence?",
    steps: [
      "Step 1: main idea",
      "Step 2: first sentence"
    ],
    ans: "Main idea sentence",
    why: "structure"
  },

  {
    q: "Why paragraphs are important?",
    steps: [
      "Step 1: organize ideas",
      "Step 2: clarity"
    ],
    ans: "Organize writing",
    why: "function"
  }
],

[
  {
    q: "What should paragraph contain?",
    hint: "one idea",
    steps: [
      "Step 1: focus point"
    ],
    ans: "One main idea",
    why: "writing rule"
  }
]
);


/* =========================
   6. COHERENCE & COHESION
========================= */

add(
  "english",
  "writing",
  "Coherence and cohesion",
  `<h2>Coherence & Cohesion</h2>
<ul>
<li><b>Clarity</b> → ideas are easy to follow and understand</li>
<li><b>Unity</b> → all sentences support the main idea of the text</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Coherence is about meaning flow; cohesion is about sentence connection.
</pre>

<h3> LINKING WORD EXAMPLES</h3>
<ul>
<li><b>Contrast:</b> however, but, although</li>
<li><b>Cause:</b> because, since, therefore</li>
<li><b>Addition:</b> and, also, moreover</li>
<li><b>Result:</b> so, therefore, as a result</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
I was tired. However, I continued working.

She studied hard because she wanted to pass the exam.

It was raining, therefore the match was cancelled.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>“However”</b> → shows contrast between being tired and continuing work</li>
<li><b>“Because”</b> → shows reason for studying hard</li>
<li><b>“Therefore”</b> → shows result of rain</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Writing sentences without logical connection</li>
<li> Overusing linking words in one paragraph</li>
<li> Using wrong connector for the relationship</li>
</ul>
`,

[
  {
    q: "What is coherence?",
    steps: [
      "Step 1: ideas flow",
      "Step 2: logical order"
    ],
    ans: "Logical flow of ideas",
    why: "definition"
  },

  {
    q: "What is cohesion?",
    steps: [
      "Step 1: linking words",
      "Step 2: sentence connection"
    ],
    ans: "Linking sentences",
    why: "writing rule"
  },

  {
    q: "Give example of linking word",
    steps: [
      "Step 1: contrast",
      "Step 2: however"
    ],
    ans: "However",
    why: "grammar use"
  }
],

[
  {
    q: "What improves essay flow?",
    hint: "linking words",
    steps: [
      "Step 1: connect ideas"
    ],
    ans: "Cohesion",
    why: "writing skill"
  }
]
);
/* =========================
   7. ESSAY MARKING CRITERIA
========================= */
add(
  "english",
  "writing",
  "Essay marking",
  `<h2>Essay Marking</h2>
<h3> NOTES</h3>
<ul>
<li><b>Content</b> → quality and relevance of ideas presented</li>
<li><b>Grammar</b> → correct use of language, tenses, and sentence structure</li>
<li><b>Organization</b> → logical arrangement of ideas (introduction, body, conclusion)</li>
<li><b>Creativity</b> → originality, expression, and use of interesting ideas or vocabulary</li>
<li><b>Clarity</b> → how easy it is for the reader to understand the writing</li>
<li><b>Coherence</b> → smooth flow of ideas from one point to another</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Good writing is balanced between ideas, language, structure, and originality.
</pre>

<h3> BREAKDOWN</h3>
<pre>
Content → 40%  (ideas and relevance)
Language → 30% (grammar and vocabulary)
Organization → 20% (structure and flow)
Creativity → 10% (original expression and style)
</pre>

<h3> EXPLANATION</h3>
<ul>
<li><b>Content</b> → what you say (ideas and arguments)</li>
<li><b>Language</b> → how correctly you say it</li>
<li><b>Organization</b> → how well ideas are arranged</li>
<li><b>Creativity</b> → how unique and engaging your writing is</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Writing good ideas with poor grammar</li>
<li> Having correct grammar but no clear structure</li>
<li> Ignoring creativity and repeating simple phrases</li>
</ul>
`,

[
  {
    q: "What is most important in essay?",
    steps: [
      "Step 1: ideas",
      "Step 2: relevance"
    ],
    ans: "Content",
    why: "marking scheme"
  },

  {
    q: "What affects language marks?",
    steps: [
      "Step 1: grammar",
      "Step 2: spelling"
    ],
    ans: "Grammar and spelling",
    why: "assessment"
  },

  {
    q: "Why organization matters?",
    steps: [
      "Step 1: structure",
      "Step 2: clarity"
    ],
    ans: "Makes essay clear",
    why: "evaluation rule"
  }
],

[
  {
    q: "Which part gives highest marks?",
    hint: "content",
    steps: [
      "Step 1: ideas quality"
    ],
    ans: "Content",
    why: "marking weight"
  }
]
);


/* =========================
   8. IMPORTANCE OF ESSAY WRITING
========================= */

add(
  "english",
  "writing",
  "Importance of essay writing",
  `<h2>Importance of Essay Writing</h2>
<h3> NOTES</h3>
<ul>
<li><b>Improves Communication</b> → helps express ideas clearly in speaking and writing</li>
<li><b>Helps Exams</b> → increases chances of scoring higher marks in composition tasks</li>
<li><b>Builds Creativity</b> → encourages original thinking and better expression of ideas</li>
<li><b>Enhances Confidence</b> → makes writing and speaking feel easier and more natural</li>
<li><b>Develops Critical Thinking</b> → helps organize ideas logically and effectively</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Good writing skills improve both academic performance and real-life communication.
</pre>

<h3> EXAMPLE</h3>
<pre>
Good essay → high marks, clear ideas, strong structure
Poor essay → low marks, unclear ideas, weak structure
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Good essay</b> → well-organized, clear, and engaging writing</li>
<li><b>Poor essay</b> → lacks structure, clarity, and development</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Not practicing writing regularly</li>
<li> Ignoring grammar and structure</li>
<li> Repeating the same ideas without development</li>
</ul>
`,

[
  {
    q: "Why essay writing important?",
    steps: [
      "Step 1: communication",
      "Step 2: exams"
    ],
    ans: "Improves writing skills",
    why: "importance"
  },

  {
    q: "What skill does essay writing build?",
    steps: [
      "Step 1: creativity",
      "Step 2: expression"
    ],
    ans: "Creativity and expression",
    why: "learning outcome"
  },

  {
    q: "Why students practice essays?",
    steps: [
      "Step 1: exams",
      "Step 2: fluency"
    ],
    ans: "For exam success",
    why: "purpose"
  }
],

[
  {
    q: "What improves writing skills?",
    hint: "practice essays",
    steps: [
      "Step 1: regular writing"
    ],
    ans: "Essay writing practice",
    why: "skill development"
  }
]
);

/* =========================================================
   ENGLISH PHASE 3: ESSAY WRITING SYSTEM
========================================================= */


/* =========================
   1. ESSAY STRUCTURE
========================= */

add(
  "english",
  "writing",
  "Essay structure",
  `<h2>Essay Structure</h2>
<ul>
<li><b>Unity of Ideas</b> → all parts should relate to the main topic</li>
<li><b>Logical Flow</b> → ideas should move smoothly from one paragraph to another</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A good composition is organized, clear, and follows a logical structure from start to finish.
</pre>

<h3> FORMAT</h3>
<pre>
Introduction (Hook + Topic Sentence)

Paragraph 1 (Main Idea 1 + Explanation + Example)
Paragraph 2 (Main Idea 2 + Explanation + Example)
Paragraph 3 (Main Idea 3 + Explanation + Example)

Conclusion (Summary + Final Opinion)
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Introduction</b> → captures attention and introduces the topic</li>
<li><b>Body</b> → explains ideas in detail using paragraphs</li>
<li><b>Conclusion</b> → wraps up the composition clearly</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Topic: Importance of Water

Introduction: Water is essential for life on Earth.

Paragraph 1: Water is needed for drinking and survival.

Paragraph 2: Water is used in agriculture for growing crops.

Paragraph 3: Water supports industries and daily activities.

Conclusion: Therefore, water is very important for all living things.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Missing introduction or conclusion</li>
<li> Mixing different ideas in one paragraph</li>
<li> Writing without clear structure</li>
</ul>

`,

[
  {
    q: "What is essay introduction?",
    steps: [
      "Step 1: introduce topic",
      "Step 2: attract reader"
    ],
    ans: "Opening part of essay",
    why: "structure"
  },

  {
    q: "What is body of essay?",
    steps: [
      "Step 1: give points",
      "Step 2: explain ideas"
    ],
    ans: "Main content paragraphs",
    why: "essay structure"
  },

  {
    q: "What is conclusion?",
    steps: [
      "Step 1: summarize ideas",
      "Step 2: final opinion"
    ],
    ans: "Ending of essay",
    why: "structure"
  }
],

[
  {
    q: "What comes first in essay?",
    hint: "introduction",
    steps: [
      "Step 1: opening section"
    ],
    ans: "Introduction",
    why: "order rule"
  }
]
);


/* =========================
   2. NARRATIVE ESSAY
========================= */

add(
  "english",
  "writing",
  "Narrative essay",
  `<h2>Narrative Essay</h2>
<ul>
<li><b>Has Events</b> → actions that move the story forward</li>
<li><b>Has Setting</b> → where and when the story takes place</li>
<li><b>Has a Plot</b> → sequence of connected events</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Narrative writing organizes events into a meaningful story with a beginning, middle, and end.
</pre>

<h3> STRUCTURE</h3>
<pre>
Beginning → Middle → End
</pre>

<h3> DETAILED BREAKDOWN</h3>
<ul>
<li><b>Beginning</b> → introduces characters, setting, and situation</li>
<li><b>Middle</b> → develops the main events and conflict</li>
<li><b>End</b> → resolves the problem and concludes the story</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Beginning: A boy went to the forest to collect firewood.

Middle: He got lost while searching deep inside the forest.

End: He followed a river and found his way back home.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Mixing present and past tense</li>
<li> Writing events in a confusing order</li>
<li> Leaving out the ending or resolution</li>
</ul>
`,

[
  {
    q: "What is narrative essay?",
    steps: [
      "Step 1: tells story",
      "Step 2: events in order"
    ],
    ans: "Story writing essay",
    why: "definition"
  },

  {
    q: "What tense is used in narrative essay?",
    steps: [
      "Step 1: check events",
      "Step 2: past actions"
    ],
    ans: "Past tense",
    why: "grammar rule"
  },

  {
    q: "What must narrative essay have?",
    steps: [
      "Step 1: characters",
      "Step 2: events"
    ],
    ans: "Characters and events",
    why: "story structure"
  }
],

[
  {
    q: "Write structure of narrative essay",
    hint: "beginning middle end",
    steps: [
      "Step 1: arrange events"
    ],
    ans: "Beginning, Middle, End",
    why: "format rule"
  }
]
);


/* =========================
   3. DESCRIPTIVE ESSAY
========================= */

add(
  "english",
  "writing",
  "Descriptive essay",
  `<h2>Descriptive Essay</h2>

<h3> NOTES</h3>
<ul>
<li><b>Describes Person, Place, or Event</b> → gives detailed information about what something looks, sounds, feels, or seems like</li>
<li><b>Uses Adjectives</b> → words that describe nouns (beautiful, noisy, crowded, bright)</li>
<li><b>Creates Imagery</b> → helps the reader form a clear mental picture</li>
<li><b>Uses Sensory Language</b> → describes sight, sound, smell, touch, and sometimes taste</li>
<li><b>Focus on Details</b> → adds depth and makes writing more interesting</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Descriptive writing helps the reader “see” the picture through words.
</pre>

<h3> EXAMPLE</h3>
<pre>
A busy market full of noise and color.

Expanded: A crowded market filled with shouting vendors, bright stalls, and the smell of fresh food in the air.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>“Busy market”</b> → shows activity and movement</li>
<li><b>“Noise and color”</b> → adds sensory details</li>
<li><b>Expanded version</b> → adds sound, sight, and smell for stronger imagery</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Using too few descriptive words</li>
<li> Repeating the same adjectives</li>
<li> Telling instead of showing</li>
</ul>
`,

[
  {
    q: "What is descriptive essay?",
    steps: [
      "Step 1: describe subject",
      "Step 2: use details"
    ],
    ans: "Essay that describes",
    why: "definition"
  },

  {
    q: "What words are used in descriptive essay?",
    steps: [
      "Step 1: describing words",
      "Step 2: adjectives"
    ],
    ans: "Adjectives",
    why: "language feature"
  },

  {
    q: "What is purpose of descriptive essay?",
    steps: [
      "Step 1: create picture",
      "Step 2: engage reader"
    ],
    ans: "To create imagery",
    why: "writing purpose"
  }
],

[
  {
    q: "Give example of descriptive writing",
    hint: "imagery",
    steps: [
      "Step 1: describe scene"
    ],
    ans: "A beautiful sunny beach",
    why: "example skill"
  }
]
);


/* =========================
   4. ARGUMENTATIVE ESSAY
========================= */

add(
  "english",
  "writing",
  "Argumentative essay",
  `<h2>Argumentative Essay</h2>
<h3> NOTES</h3>
<ul>
<li><b>Presents Opinion</b> → clearly states what the writer thinks about a topic</li>
<li><b>Supports with Reasons</b> → gives explanations, evidence, or examples</li>
<li><b>May Agree or Disagree</b> → the writer can support or oppose an idea</li>
<li><b>Uses Logic</b> → ideas should be reasonable and well explained</li>
<li><b>May Include Examples</b> → strengthens arguments and makes them clearer</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Argumentative writing is about convincing the reader using clear reasons and logic.
</pre>

<h3> STRUCTURE</h3>
<pre>
Introduction → Arguments → Conclusion
</pre>

<h3> DETAILED BREAKDOWN</h3>
<ul>
<li><b>Introduction</b> → introduces topic and gives opinion (thesis statement)</li>
<li><b>Arguments</b> → presents reasons and supporting details</li>
<li><b>Conclusion</b> → summarizes ideas and restates opinion</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Topic: Should students do homework?

Introduction: Students should be given homework.

Arguments:
1. It improves understanding.
2. It builds discipline.
3. It helps revision.

Conclusion: Therefore, homework is important for learning.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Giving opinions without reasons</li>
<li> Ignoring the opposing view</li>
<li> Writing unclear or weak arguments</li>
</ul>
`,

[
  {
    q: "What is argumentative essay?",
    steps: [
      "Step 1: give opinion",
      "Step 2: support it"
    ],
    ans: "Essay with arguments",
    why: "definition"
  },

  {
    q: "What is needed in argument essay?",
    steps: [
      "Step 1: reasons",
      "Step 2: evidence"
    ],
    ans: "Supporting points",
    why: "writing requirement"
  },

  {
    q: "Can you disagree in argumentative essay?",
    steps: [
      "Step 1: choose side",
      "Step 2: justify"
    ],
    ans: "Yes",
    why: "essay rule"
  }
],

[
  {
    q: "What is main purpose of argument essay?",
    hint: "persuade",
    steps: [
      "Step 1: express opinion"
    ],
    ans: "To persuade reader",
    why: "writing goal"
  }
]
);


/* =========================
   5. PARAGRAPH WRITING
========================= */

add(
  "english",
  "writing",
  "Paragraph writing",
  `<h2>Paragraph Writing</h2>
<ul>
<li><b>Clarity</b> → ideas should be easy to understand</li>
<li><b>Unity</b> → all sentences must relate to the topic sentence</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A strong paragraph builds one clear idea using explanation and examples.
</pre>

<h3> FORMAT</h3>
<pre>
Topic sentence → Explanation → Example
</pre>

<h3> DETAILED BREAKDOWN</h3>
<ul>
<li><b>Topic Sentence</b> → states the main idea of the paragraph</li>
<li><b>Explanation</b> → gives details or reasons about the idea</li>
<li><b>Example</b> → supports the idea with a real-life or logical case</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
Topic sentence: Exercise is important for health.

Explanation: It helps improve strength and keeps the body active.

Example: For example, people who exercise regularly have more energy and fewer illnesses.
</pre>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Including multiple ideas in one paragraph</li>
<li> Missing topic sentence</li>
<li> Adding irrelevant information</li>
</ul>
`,

[
  {
    q: "What is paragraph?",
    steps: [
      "Step 1: group of sentences",
      "Step 2: one idea"
    ],
    ans: "Unit of writing with one idea",
    why: "definition"
  },

  {
    q: "What is topic sentence?",
    steps: [
      "Step 1: main idea",
      "Step 2: first sentence"
    ],
    ans: "Main idea sentence",
    why: "structure"
  },

  {
    q: "Why paragraphs are important?",
    steps: [
      "Step 1: organize ideas",
      "Step 2: clarity"
    ],
    ans: "Organize writing",
    why: "function"
  }
],

[
  {
    q: "What should paragraph contain?",
    hint: "one idea",
    steps: [
      "Step 1: focus point"
    ],
    ans: "One main idea",
    why: "writing rule"
  }
]
);

/* =========================================================
   ENGLISH PHASE 5: POETRY MASTER SYSTEM
========================================================= */
/* =========================
   1. INTRODUCTION TO POETRY
========================= */

add(
  "english",
  "poetry",
  "Introduction to poetry",
  `<h2>Poetry</h2>

<h3> NOTES</h3>
<ul>
<li><b>Poetry is arranged in lines and stanzas</b> → written in a structured pattern different from prose</li>
<li><b>Expresses feelings and ideas</b> → focuses on emotions, thoughts, and imagination</li>
<li><b>Uses figurative language</b> → uses symbolism, metaphors, similes, and imagery</li>
<li><b>Rhythm and Sound</b> → may include rhyme, rhythm, and sound patterns</li>
<li><b>Concise Expression</b> → conveys meaning in fewer words but with deeper impact</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Poetry expresses deep meaning and emotion using carefully arranged words and structure.
</pre>

<h3> STRUCTURE</h3>
<pre>
Stanza → group of lines
Line → single row of words
</pre>

<h3> DETAILED BREAKDOWN</h3>
<ul>
<li><b>Stanza</b> → like a paragraph in poetry, grouping related ideas</li>
<li><b>Line</b> → individual line of poetry that carries meaning or rhythm</li>
<li><b>Figurative Language</b> → makes writing more vivid and expressive</li>
</ul>

<h3> EXAMPLE</h3>
<pre>
The sun rises in golden light,
Waking earth from quiet night.

(2 lines = 1 stanza)
</pre>

<h3> SAMPLE POEM</h3>
<pre>
The morning sun climbs up the sky,
And paints the clouds as days go by.

The birds awake with joyful song,
As gentle winds flow soft and long.

The world feels fresh, alive, and bright,
A peaceful start with warm sunlight.
</pre>

<h3> SAMPLE ANALYSIS</h3>
<ul>
<li><b>Theme</b> → beauty of nature and new beginnings</li>
<li><b>Tone</b> → peaceful and joyful</li>
<li><b>Imagery</b> → sun, birds, clouds, wind</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Treating poetry like normal paragraph writing</li>
<li> Ignoring meaning and focusing only on rhyme</li>
<li> Overcomplicating simple poetic ideas</li>
</ul>

`,

[
  {
    q: "What is poetry?",
    steps: [
      "Step 1: look at form",
      "Step 2: emotional expression"
    ],
    ans: "Writing in lines expressing feelings",
    why: "definition"
  },

  {
    q: "What is a stanza?",
    steps: [
      "Step 1: group of lines",
      "Step 2: poem section"
    ],
    ans: "Group of lines in a poem",
    why: "structure"
  },

  {
    q: "Why is poetry used?",
    steps: [
      "Step 1: express feelings",
      "Step 2: creativity"
    ],
    ans: "To express emotions creatively",
    why: "purpose"
  }
]
);


/* =========================
   2. RHYME AND RHYTHM
========================= */

add(
  "english",
  "poetry",
  "Rhyme and rhythm",
  `<h2>Rhyme & Rhythm</h2>
<h3> NOTES</h3>
<ul>
<li><b>Rhyme</b> → similarity in ending sounds of words in poetry</li>
<li><b>Rhythm</b> → pattern or beat created by stressed and unstressed syllables</li>
<li><b>Makes Poetry Musical</b> → rhyme and rhythm give poetry a song-like flow</li>
<li><b>Enhances Memory</b> → rhyming makes poems easier to remember</li>
<li><b>Creates Mood</b> → rhythm and sound patterns affect emotion and tone</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Rhyme and rhythm give poetry its sound, flow, and musical quality.
</pre>

<h3> EXAMPLE</h3>
<pre>
cat / hat / mat → rhyme (same ending sound)

The sun is bright,
Shining light.
</pre>

<h3> SAMPLE POEM</h3>
<pre>
The stars appear in silent night,
They sparkle softly, pure and bright.

The moon above begins to gleam,
Like silver floating in a dream.

The wind it sings a gentle tune,
Beneath the calm and glowing moon.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Rhyme</b> → night / bright, gleam / dream, tune / moon</li>
<li><b>Rhythm</b> → short balanced lines create a steady beat</li>
<li><b>Imagery</b> → stars, moon, wind, night sky</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Forcing rhyme without meaning</li>
<li> Ignoring rhythm and focusing only on words</li>
<li> Writing without flow or structure</li>
</ul>
`,

[
  {
    q: "What is rhyme?",
    steps: [
      "Step 1: look at ending sounds",
      "Step 2: match similarity"
    ],
    ans: "Similar ending sounds",
    why: "definition"
  },

  {
    q: "What is rhythm?",
    steps: [
      "Step 1: flow of words",
      "Step 2: beat pattern"
    ],
    ans: "Beat of poem",
    why: "poetry feature"
  },

  {
    q: "Why rhyme is used?",
    steps: [
      "Step 1: musical effect",
      "Step 2: memory aid"
    ],
    ans: "To make poem musical",
    why: "function"
  }
]
);


/* =========================
   3. TONE AND MOOD
========================= */

add(
  "english",
  "poetry",
  "Tone and mood",
  `<h2>Tone & Mood</h2>

<h3> KEY IDEA</h3>
<pre>
Tone is what the writer feels; mood is what the reader feels.
</pre>

<h3> EXAMPLE</h3>
<pre>
Sad poem → mood: sadness in the reader

Angry tone → writer expresses frustration or anger

Happy story → mood: joy and excitement in the reader
</pre>

<h3> SAMPLE POEM</h3>
<pre>
The sky is dark, the wind is cold,
The night feels heavy, harsh and old.

I walk alone without a sound,
No friendly voice, no hope is found.

The silence speaks in tones of pain,
As lonely thoughts return again.
</pre>

<h3> ANALYSIS OF THE POEM</h3>
<ul>
<li><b>Tone</b> → sad, gloomy, and reflective (writer shows loneliness and heaviness)</li>
<li><b>Mood</b> → sadness and loneliness felt by the reader</li>
<li><b>Imagery</b> → dark sky, cold wind, silence, loneliness</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Confusing tone and mood as the same thing</li>
<li> Ignoring emotional words in the poem</li>
<li> Not using evidence from lines to support ideas</li>
</ul>
`,

[
  {
    q: "What is tone?",
    steps: [
      "Step 1: check writer attitude",
      "Step 2: emotion in words"
    ],
    ans: "Writer's attitude",
    why: "definition"
  },

  {
    q: "What is mood?",
    steps: [
      "Step 1: reader feeling",
      "Step 2: emotional effect"
    ],
    ans: "Feeling created in reader",
    why: "literary concept"
  },

  {
    q: "Difference between tone and mood?",
    steps: [
      "Step 1: tone = writer",
      "Step 2: mood = reader"
    ],
    ans: "Tone is writer’s attitude, mood is reader’s feeling",
    why: "comparison"
  }
]
);


/* =========================
   4. POETIC DEVICES
========================= */

add(
  "english",
  "poetry",
  "Poetic devices",
  `<h2>Poetic Devices</h2>

<h3> NOTES</h3>
<ul>
<li><b>Simile</b> → compares two things using “like” or “as”</li>
<li><b>Metaphor</b> → direct comparison without “like” or “as”</li>
<li><b>Alliteration</b> → repetition of the same initial consonant sound in words</li>
<li><b>Personification</b> → giving human qualities to non-human things</li>
<li><b>Imagery</b> → language that creates mental pictures</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Figurative language makes writing more vivid, expressive, and imaginative.
</pre>

<h3> EXAMPLES</h3>
<pre>
Simile: He is as strong as a lion.

Metaphor: Time is a thief.

Alliteration: She sells sea shells by the sea shore.

Personification: The wind whispered through the trees.
</pre>

<h3> SAMPLE POEM</h3>
<pre>
The wind danced through the silent night,
Like a ghost in silver light. (simile)

Time is a river flowing fast, (metaphor)
Carrying moments that cannot last.

Soft seas sing songs along the shore, (personification)
Whispering tales forevermore.

Brilliant birds beat bright blue skies, (alliteration)
As golden sunrise slowly rises.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Simile</b> → “Like a ghost in silver light” compares wind using “like”</li>
<li><b>Metaphor</b> → “Time is a river” shows time as a flowing river</li>
<li><b>Alliteration</b> → “Brilliant birds beat bright blue skies” repeated ‘b’ sound</li>
<li><b>Personification</b> → “Soft seas sing songs” gives human action to sea</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Mixing simile and metaphor rules</li>
<li> Overusing figurative language in one sentence</li>
<li> Using comparisons that are unclear or unrealistic</li>
</ul>
`,

[
  {
    q: "What is alliteration?",
    steps: [
      "Step 1: repeated sounds",
      "Step 2: same letter"
    ],
    ans: "Repetition of consonant sounds",
    why: "definition"
  },

  {
    q: "Give example of metaphor",
    steps: [
      "Step 1: direct comparison",
      "Step 2: identity statement"
    ],
    ans: "He is a lion",
    why: "device example"
  },

  {
    q: "What is personification?",
    steps: [
      "Step 1: human traits",
      "Step 2: non-human objects"
    ],
    ans: "Giving human qualities to objects",
    why: "poetic device"
  }
]
);


/* =========================
   5. POEM ANALYSIS METHOD (KCSE)
========================= */

add(
  "english",
  "poetry",
  "Poem analysis method",
  `<h2>Poem Analysis</h2>

<h3> NOTES</h3>
<ul>
<li><b>Read Poem Carefully</b> → understand the words, structure, and tone</li>
<li><b>Identify Theme</b> → find the main message or idea of the poem</li>
<li><b>Identify Devices</b> → look for simile, metaphor, rhyme, rhythm, etc.</li>
<li><b>Explain Meaning</b> → interpret what the poet is trying to communicate</li>
<li><b>Use Evidence</b> → quote or refer to specific lines from the poem</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Poetry analysis is about understanding meaning through structure, language, and evidence.
</pre>

<h3> METHOD</h3>
<pre>
Point → Evidence → Explanation
</pre>

<h3> DETAILED BREAKDOWN</h3>
<ul>
<li><b>Point</b> → state your idea about the poem</li>
<li><b>Evidence</b> → give a line or example from the poem</li>
<li><b>Explanation</b> → explain how the evidence supports your point</li>
</ul>

<h3> SAMPLE POEM</h3>
<pre>
The rain falls softly on the ground,
A silent tear without a sound.

The clouds above are dark and grey,
As sunlight slowly fades away.

The wind it sighs through empty trees,
A lonely voice upon the breeze.
</pre>

<h3> EXAMPLE ANALYSIS</h3>
<pre>
Point: The poem shows sadness in nature.

Evidence: “The rain falls softly on the ground, / A silent tear without a sound.”

Explanation: The rain is compared to tears, suggesting sadness and emotional expression in nature.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Theme</b> → sadness and loneliness in nature</li>
<li><b>Tone</b> → calm but sorrowful</li>
<li><b>Devices</b> → personification (“wind it sighs”), imagery (“dark and grey clouds”)</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Only summarizing without analysis</li>
<li> Not using evidence from the poem</li>
<li> Misinterpreting the theme</li>
</ul>
`,

[
  {
    q: "How do you analyze a poem?",
    steps: [
      "Step 1: read carefully",
      "Step 2: identify meaning"
    ],
    ans: "Read, interpret, explain",
    why: "method"
  },

  {
    q: "What is first step in poem analysis?",
    steps: [
      "Step 1: read poem",
      "Step 2: understand context"
    ],
    ans: "Reading the poem",
    why: "process"
  },

  {
    q: "Why use evidence in poems?",
    steps: [
      "Step 1: support answer",
      "Step 2: avoid guessing"
    ],
    ans: "To support interpretation",
    why: "exam rule"
  }
]
);


/* =========================
   6. UNSEEN POEM STRATEGY
========================= */

add(
  "english",
  "poetry",
  "Unseen poem strategy",
  `<h2>Unseen Poem Strategy</h2>

<h3> NOTES</h3>
<ul>
<li><b>Read Poem Twice</b> → first for general meaning, second for deeper understanding</li>
<li><b>Identify Mood</b> → the feeling created in the reader (sad, happy, serious, etc.)</li>
<li><b>Identify Theme</b> → the main message or idea of the poem</li>
<li><b>Use Context Clues</b> → understand unknown words using surrounding words and lines</li>
<li><b>Focus on Keywords</b> → important words that show meaning and emotion</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Understanding poetry requires careful reading, interpretation, and attention to meaning.
</pre>

<h3> STRATEGY</h3>
<pre>
Read → Understand → Interpret → Answer
</pre>

<h3> STEP-BY-STEP BREAKDOWN</h3>
<ul>
<li><b>Read</b> → go through the poem carefully more than once</li>
<li><b>Understand</b> → grasp the basic meaning of lines and words</li>
<li><b>Interpret</b> → identify mood, theme, and literary devices</li>
<li><b>Answer</b> → respond using evidence from the poem</li>
</ul>

<h3> SAMPLE POEM</h3>
<pre>
The night is quiet, dark and deep,
The world has drifted fast asleep.

No voices break the silent air,
Just stillness hanging everywhere.

The moonlight glows so pale and white,
A watchful eye throughout the night.
</pre>

<h3> EXAMPLE</h3>
<pre>
Poem line: “The night is quiet, dark and deep.”

Mood: calmness and loneliness

Theme: peace and stillness of night / solitude
</pre>

<h3> ANALYSIS</h3>
<ul>
<li><b>Keywords</b> → quiet, dark, deep, silent, stillness</li>
<li><b>Mood</b> → calm, peaceful, slightly lonely</li>
<li><b>Theme</b> → nighttime stillness and isolation</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Reading only once and missing deeper meaning</li>
<li> Ignoring mood and focusing only on words</li>
<li> Guessing answers without context clues</li>
</ul>
`,

[
  {
    q: "What is unseen poem?",
    steps: [
      "Step 1: new poem",
      "Step 2: not studied before"
    ],
    ans: "Poem not seen before exam",
    why: "definition"
  },

  {
    q: "How do you answer unseen poem?",
    steps: [
      "Step 1: read twice",
      "Step 2: interpret meaning"
    ],
    ans: "Use context understanding",
    why: "exam skill"
  },

  {
    q: "Why read poem twice?",
    steps: [
      "Step 1: understanding",
      "Step 2: deeper meaning"
    ],
    ans: "To understand fully",
    why: "strategy"
  }
]
);


/* =========================
   7. THEMES IN POETRY
========================= */

add(
  "english",
  "poetry",
  "Themes in poetry",
  `<h2>Themes in Poetry</h2> 
<h3> NOTES</h3>
<ul>
<li><b>Main Idea of the Poem</b> → the central message the poet wants to communicate</li>
<li><b>Universal Concepts</b> → common themes like love, death, nature, friendship, or struggle</li>
<li><b>Found Through Interpretation</b> → discovered by analyzing meaning, not stated directly</li>
<li><b>Supported by Evidence</b> → identified using words, images, and symbols in the poem</li>
<li><b>Gives Deeper Meaning</b> → explains what the poem is really about beyond surface words</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A theme is the deeper message behind the poem’s words and events.
</pre>

<h3> EXAMPLE</h3>
<pre>
Nature → beauty of the environment and harmony with life

Love → emotional connection between people

Death → the reality and mystery of life’s end
</pre>

<h3> SAMPLE POEMS BY THEME</h3>

<h3> Nature Theme</h3>
<pre>
The river flows through greenest land,
Carved gently by nature’s hand.

The trees stand tall in morning light,
Dancing softly through the night.
</pre>

<h3> Theme: Nature → beauty, peace, and harmony of the environment</h3>

<hr>

<h3> Love Theme</h3>
<pre>
Your smile is like the morning sun,
A warmth that melts the day begun.

Your voice is calm, a gentle song,
That makes my heart feel safe and strong.
</pre>

<h3> Theme: Love → affection, emotional connection, warmth</h3>

<hr>

<h3> Death Theme</h3>
<pre>
The candle fades into the night,
A final blink of fading light.

Silence falls where voices were,
Only memories now occur.
</pre>

<h3> Theme: Death → endings, loss, and remembrance</h3>

<hr>

<h3> Friendship Theme</h3>
<pre>
Through storms and rain, we stand as one,
Two paths that feel like they are one.

A hand to hold when times are tough,
A simple smile is strong enough.
</pre>

<h3> Theme: Friendship → loyalty, support, and trust</h3>

<hr>

<h3> Struggle Theme</h3>
<pre>
I walk through fire, cold and deep,
Through broken dreams and nights of sleep.

But still I rise, I will not fall,
I hear success is worth it all.
</pre>

<h3> Theme: Struggle → resilience, perseverance, overcoming hardship</h3>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Confusing theme with summary</li>
<li> Stating events instead of ideas</li>
<li> Using very specific details instead of general meaning</li>
</ul>
`,

[
  {
    q: "What is theme in poetry?",
    steps: [
      "Step 1: main idea",
      "Step 2: message"
    ],
    ans: "Central idea in poem",
    why: "definition"
  },

  {
    q: "Give example of theme",
    steps: [
      "Step 1: emotion",
      "Step 2: love or death"
    ],
    ans: "Love",
    why: "example"
  },

  {
    q: "How do you find theme?",
    steps: [
      "Step 1: read poem",
      "Step 2: analyze meaning"
    ],
    ans: "Through interpretation",
    why: "analysis"
  }
]
);


/* =========================
   8. IMPORTANCE OF POETRY
========================= */

add(
  "english",
  "poetry",
  "Importance of poetry",
  `<h2>Importance of Poetry</h2>

<h3> NOTES</h3>
<ul>
<li><b>Express Emotions</b> → helps writers communicate feelings like joy, sadness, love, or anger</li>
<li><b>Improves Creativity</b> → encourages imagination and original expression of ideas</li>
<li><b>Enhances Language Skills</b> → improves vocabulary, imagery, and sentence structure</li>
<li><b>Builds Appreciation</b> → helps readers understand beauty in language</li>
<li><b>Develops Critical Thinking</b> → improves interpretation of meaning and symbols</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Poetry is a powerful form of expression that combines emotion, creativity, and language.
</pre>

<h3> EXAMPLE</h3>
<pre>
Poetry → emotional expression through creative and meaningful words
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Emotions</b> → poetry expresses deep human feelings</li>
<li><b>Creativity</b> → uses imagination and figurative language</li>
<li><b>Language skills</b> → improves vocabulary and expression</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Thinking poetry is only about rhyming words</li>
<li> Ignoring meaning and focusing only on structure</li>
<li> Not appreciating figurative language</li>
</ul>
`,

[
  {
    q: "Why is poetry important?",
    steps: [
      "Step 1: expression",
      "Step 2: creativity"
    ],
    ans: "Expresses emotions",
    why: "importance"
  },

  {
    q: "What skill does poetry improve?",
    steps: [
      "Step 1: language use",
      "Step 2: creativity"
    ],
    ans: "Language and creativity",
    why: "learning outcome"
  },

  {
    q: "Why students study poetry?",
    steps: [
      "Step 1: exams",
      "Step 2: interpretation skills"
    ],
    ans: "For analysis skills",
    why: "academic purpose"
  }
]
);

/* =========================================================
   ENGLISH PHASE 6: LANGUAGE USE (FUNCTIONAL WRITING)
========================================================= */


/* =========================
   1. FORMAL LETTER WRITING
========================= */

add(
  "english",
  "writing",
  "Formal letters",
  `<h2>Formal Letter Writing</h2>
<h3> NOTES</h3>
<ul>
<li><b>Used for Official Communication</b> → written for formal situations like schools, offices, or organizations</li>
<li><b>Fixed Format</b> → follows a specific structure that must be respected</li>
<li><b>Polite and Formal Language</b> → avoids slang and uses respectful wording</li>
<li><b>Clear Purpose</b> → written to inform, request, complain, or apply for something</li>
<li><b>Logical Flow</b> → ideas are arranged in a clear and professional order</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A formal letter communicates clearly and respectfully using a fixed structure.
</pre>

<h3> FORMAT</h3>
<pre>
Sender’s Address
Date
Receiver’s Address
Salutation (Dear Sir/Madam)

Introduction
Body
Conclusion

Yours faithfully
Name
</pre>

<h3> SAMPLE LETTER</h3>
<pre>
P.O. Box 123
Huure, Jenhak
23rd April 2026

The Headteacher
Green Valley School
P.O. Box 456
Aders,Fractals

Dear Sir/Madam,

I am writing to request permission to be absent from school for two days due to illness. I have been advised by a doctor to rest and recover fully.

I will ensure that I catch up with all missed work once I return to school. I kindly request your approval for my absence.

Thank you for your understanding.

Yours faithfully,
John larry
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Introduction</b> → states the purpose of the letter</li>
<li><b>Body</b> → gives details and explanation</li>
<li><b>Conclusion</b> → polite closing and request or summary</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Using informal language (e.g., slang)</li>
<li> Missing important parts like address or date</li>
<li> Writing without clear purpose</li>
</ul>
`,

[
  {
    q: "What is formal letter?",
    steps: [
      "Step 1: official communication",
      "Step 2: structured format"
    ],
    ans: "Official letter with formal structure",
    why: "definition"
  },

  {
    q: "When is formal letter used?",
    steps: [
      "Step 1: institutions",
      "Step 2: official matters"
    ],
    ans: "In official communication",
    why: "usage"
  },

  {
    q: "What closing is used in formal letter?",
    steps: [
      "Step 1: check salutation",
      "Step 2: formal ending"
    ],
    ans: "Yours faithfully",
    why: "format rule"
  }
]
);


/* =========================
   2. INFORMAL LETTER
========================= */

add(
  "english",
  "writing",
  "Informal letters",
  `<h2>Informal Letter</h2>
 
<h3> NOTES</h3>
<ul>
<li><b>Used for Friends/Family</b> → written to people you are close to</li>
<li><b>Friendly Language</b> → uses casual, simple, and relaxed words</li>
<li><b>No Strict Format</b> → structure is flexible compared to formal letters</li>
<li><b>Personal Tone</b> → expresses feelings, updates, or personal experiences</li>
<li><b>Conversational Style</b> → feels like talking to someone directly</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
An informal letter is a friendly message written in a relaxed and personal way.
</pre>

<h3> FORMAT</h3>
<pre>
Dear Friend,

Paragraphs (chat style)

Yours sincerely,
Name
</pre>

<h3> SAMPLE LETTER</h3>
<pre>
Dear Friend,

I hope you are doing well. I just wanted to tell you about my weekend. It was really fun because I went to visit my cousin and we played football for hours.

We also went to a nearby park and had snacks while talking about school and life. I wish you were there too because it would have been even more fun.

Please write back when you are free and tell me how you are doing.

Yours sincerely,
Jutyer
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Greeting</b> → “Dear Friend” starts the letter warmly</li>
<li><b>Body</b> → shares personal news and experiences</li>
<li><b>Closing</b> → friendly sign-off like “Yours sincerely”</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Using overly formal language</li>
<li> Writing without personal connection</li>
<li> Making it too structured like a formal letter</li>
</ul>
`,

[
  {
    q: "What is informal letter?",
    steps: [
      "Step 1: personal communication",
      "Step 2: friendly tone"
    ],
    ans: "Letter to friends or family",
    why: "definition"
  },

  {
    q: "Difference between formal and informal letter?",
    steps: [
      "Step 1: formal = official",
      "Step 2: informal = personal"
    ],
    ans: "Formal is official, informal is personal",
    why: "comparison"
  },

  {
    q: "Who receives informal letter?",
    steps: [
      "Step 1: personal relationship",
      "Step 2: friends or family"
    ],
    ans: "Friends and family",
    why: "usage"
  }
]
);


/* =========================
   3. REPORT WRITING
========================= */

add(
  "english",
  "writing",
  "Report writing",
  `<h2>Report Writing</h2>
<h3> NOTES</h3>
<ul>
<li><b>Formal Presentation of Facts</b> → presents information in a structured and professional way</li>
<li><b>Uses Headings</b> → divides information into clear sections for easy reading</li>
<li><b>Objective Language</b> → avoids personal opinions and focuses on facts</li>
<li><b>Clear and Logical</b> → information is arranged in a systematic order</li>
<li><b>Purpose-Based</b> → written to inform, investigate, or explain a situation</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A report presents facts clearly, logically, and without personal opinion.
</pre>

<h3> FORMAT</h3>
<pre>
Title
Introduction
Findings
Conclusion
Recommendations
</pre>

<h3> SAMPLE REPORT</h3>
<pre>
Title: Report on Cleanliness in School

Introduction:
This report investigates the level of cleanliness in the school compound.

Findings:
It was observed that classrooms are generally clean, but the playground has litter. Some dustbins are also not properly used.

Conclusion:
The school environment is fairly clean, but improvement is needed in waste disposal.

Recommendations:
Students should be encouraged to use dustbins properly, and more cleaning days should be organized.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Introduction</b> → explains purpose of the report</li>
<li><b>Findings</b> → presents collected facts and observations</li>
<li><b>Conclusion</b> → summarizes overall situation</li>
<li><b>Recommendations</b> → gives suggested solutions</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Including personal opinions instead of facts</li>
<li> Missing headings or structure</li>
<li> Writing unclear or unorganized information</li>
</ul>
`,

[
  {
    q: "What is report writing?",
    steps: [
      "Step 1: present facts",
      "Step 2: structured format"
    ],
    ans: "Formal presentation of information",
    why: "definition"
  },

  {
    q: "What language is used in reports?",
    steps: [
      "Step 1: neutral tone",
      "Step 2: objective writing"
    ],
    ans: "Formal and objective language",
    why: "style"
  },

  {
    q: "What is included in report?",
    steps: [
      "Step 1: findings",
      "Step 2: recommendations"
    ],
    ans: "Findings and recommendations",
    why: "structure"
  }
]
);


/* =========================
   4. SPEECH WRITING
========================= */

add(
  "english",
  "writing",
  "Speech writing",
  `<h2>Speech Writing</h2>
<h3> NOTES</h3>
<ul>
<li><b>Used for Addressing an Audience</b> → delivered to a group of people in public speaking situations</li>
<li><b>Has Greeting and Closing</b> → begins with a salutation and ends politely</li>
<li><b>Formal or Informal Tone</b> → depends on the audience and purpose</li>
<li><b>Clear Structure</b> → ideas are organized logically for easy listening</li>
<li><b>Engaging Language</b> → uses examples, questions, and emphasis to keep attention</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
A speech is a spoken presentation meant to inform, persuade, or entertain an audience.
</pre>

<h3> FORMAT</h3>
<pre>
Ladies and gentlemen...

Introduction
Body
Conclusion

Thank you.
</pre>

<h3> SAMPLE SPEECH</h3>
<pre>
Ladies and gentlemen,

Today I would like to talk about the importance of education. Education helps us gain knowledge, develop skills, and build a better future.

In addition, education opens opportunities for better jobs and improves living standards. It also helps society grow by creating responsible citizens.

In conclusion, education is the key to success and development. Let us all value and support learning.

Thank you.
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Introduction</b> → captures attention and introduces the topic</li>
<li><b>Body</b> → explains main ideas with examples and reasons</li>
<li><b>Conclusion</b> → summarizes and ends the speech politely</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Writing without clear structure</li>
<li> Making speeches too long or confusing</li>
<li> Ignoring audience engagement</li>
</ul>
`,

[
  {
    q: "What is speech writing?",
    steps: [
      "Step 1: addressing audience",
      "Step 2: structured talk"
    ],
    ans: "Written address to audience",
    why: "definition"
  },

  {
    q: "How does speech start?",
    steps: [
      "Step 1: greeting",
      "Step 2: audience address"
    ],
    ans: "With greeting",
    why: "format rule"
  },

  {
    q: "Why is conclusion important in speech?",
    steps: [
      "Step 1: summarize ideas",
      "Step 2: end politely"
    ],
    ans: "To end speech properly",
    why: "structure"
  }
]
);


/* =========================
   5. IDIOMS AND PROVERBS
========================= */

add(
  "english",
  "language",
  "Idioms and proverbs",
  `<h2>Idioms & Proverbs</h2>

<h3> NOTES</h3>
<ul>
<li><b>Idioms</b> → fixed expressions whose meaning is different from the literal words</li>
<li><b>Proverbs</b> → short wise sayings that give advice or truth</li>
<li><b>Non-literal Meaning</b> → you cannot understand them word-for-word</li>
<li><b>Used in Daily Language</b> → common in speaking, writing, and literature</li>
<li><b>Cultural Meaning</b> → often reflect beliefs and life lessons of a society</li>
</ul>

<h3> KEY IDEA</h3>
<pre>
Idioms and proverbs communicate deeper meaning beyond the literal words used.
</pre>

<h3> EXAMPLES</h3>
<pre>
Idiom: break the ice → start a conversation in a social situation

Idiom: hit the books → start studying seriously

Proverb: no pain no gain → success requires effort and struggle

Proverb: a stitch in time saves nine → solving problems early prevents bigger issues
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>Idiom</b> → meaning cannot be guessed from individual words</li>
<li><b>Proverb</b> → gives advice or life lesson</li>
<li><b>Context</b> → understanding comes from usage, not literal meaning</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Interpreting idioms word-for-word</li>
<li> Confusing idioms with normal phrases</li>
<li> Using proverbs without understanding their meaning</li>
</ul>
`,

[
  {
    q: "What is idiom?",
    steps: [
      "Step 1: fixed phrase",
      "Step 2: non-literal meaning"
    ],
    ans: "Expression with hidden meaning",
    why: "definition"
  },

  {
    q: "What is proverb?",
    steps: [
      "Step 1: wise saying",
      "Step 2: life lesson"
    ],
    ans: "Short wise statement",
    why: "definition"
  },

  {
    q: "Meaning of break the ice?",
    steps: [
      "Step 1: start interaction"
    ],
    ans: "To start conversation",
    why: "idiom meaning"
  }
]
);


/* =========================
   6. REGISTER (FORMAL & INFORMAL LANGUAGE)
========================= */

add(
  "english",
  "language",
  "Register",
  `<h2>Register</h2>
<h3> NOTES</h3>
<ul>
<li><b>Formal Register</b> → used in official, academic, or professional situations</li>
<li><b>Informal Register</b> → used in casual conversations with friends or family</li>
<li><b>Depends on Situation</b> → choice of language changes based on audience and purpose</li>
<li><b>Word Choice</b> → formal language is polite and structured, informal is relaxed and simple</li>
<li><b>Tone Difference</b> → formal is serious, informal is friendly</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Register is the level of formality in language depending on who you are speaking or writing to.
</pre>
<h3> EXAMPLE</h3>
<pre>
Formal: I request your assistance.

Informal: Help me please.

Formal: I am unable to attend the meeting.

Informal: I can’t come to the meeting.
</pre>
<h3> BREAKDOWN</h3>
<ul>
<li><b>Formal</b> → polite, complete sentences, no slang</li>
<li><b>Informal</b> → short, simple, conversational</li>
<li><b>Situation</b> → determines which style is appropriate</li>
</ul>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Using slang in formal writing</li>
<li> Being too stiff in informal communication</li>
<li> Mixing formal and informal styles in one text</li>
</ul>
`,

[
  {
    q: "What is register?",
    steps: [
      "Step 1: language style",
      "Step 2: depends on situation"
    ],
    ans: "Style of language use",
    why: "definition"
  },

  {
    q: "When is formal register used?",
    steps: [
      "Step 1: official situations",
      "Step 2: formal communication"
    ],
    ans: "In official settings",
    why: "usage"
  },

  {
    q: "Difference between formal and informal?",
    steps: [
      "Step 1: formal = polite",
      "Step 2: informal = casual"
    ],
    ans: "Formal is official, informal is casual",
    why: "comparison"
  }
]
);


/* =========================
   7. EMAIL WRITING
========================= */

add(
  "english",
  "writing",
  "Email writing",
  `<h2>Email Writing</h2>
<h3> NOTES</h3>
<ul>
<li><b>Used for Electronic Communication</b> → sent through internet platforms like email services</li>
<li><b>Has Subject Line</b> → shows the main idea of the message before opening it</li>
<li><b>Formal or Informal Tone</b> → depends on whether it is for work, school, or friends</li>
<li><b>Clear and Concise</b> → messages should be short and easy to understand</li>
<li><b>Professional Structure</b> → follows a fixed format for clarity</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
An email is a digital message used for fast and structured communication.
</pre>
<h3> FORMAT</h3>
<pre>
To: ...
Subject: ...

Message body

Regards,
Name
</pre>
<h3> SAMPLE EMAIL</h3>
<pre>
To: teacher@example.com
Subject: Request for Extension of Assignment Deadline

Dear Sir/Madam,

I am writing to kindly request an extension for submitting my assignment due to illness. I have been advised to rest and recover before resuming my studies.

I would appreciate it if I could be given a few extra days to complete my work.

Thank you for your understanding.

Regards,
Jutyer
</pre>

<h3> BREAKDOWN</h3>
<ul>
<li><b>To</b> → receiver’s email address</li>
<li><b>Subject</b> → brief summary of the message</li>
<li><b>Body</b> → main message with explanation</li>
<li><b>Closing</b> → polite ending and name</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li> Missing subject line</li>
<li> Using informal language in formal emails</li>
<li> Writing long, unclear messages</li>
</ul>
`,

[
  {
    q: "What is email?",
    steps: [
      "Step 1: electronic message",
      "Step 2: internet communication"
    ],
    ans: "Electronic communication message",
    why: "definition"
  },

  {
    q: "What is subject line?",
    steps: [
      "Step 1: topic of email"
    ],
    ans: "Title of email",
    why: "format rule"
  },

  {
    q: "Why emails are used?",
    steps: [
      "Step 1: fast communication",
      "Step 2: official messaging"
    ],
    ans: "For quick communication",
    why: "usage"
  }
]
);


/* =========================
   8. IMPORTANCE OF LANGUAGE USE
========================= */

add(
  "english",
  "language",
  "Importance of language use",
  `<h2>Importance of Language Use</h2>
<h3> NOTES</h3>
<ul>
<li><b>Improves Communication</b> → helps express ideas clearly in speaking and writing</li>
<li><b>Helps in Exams</b> → improves performance in essays, comprehension, and grammar questions</li>
<li><b>Builds Professionalism</b> → develops formal writing skills used in work and official communication</li>
<li><b>Enhances Confidence</b> → makes it easier to express thoughts without confusion</li>
<li><b>Improves Clarity</b> → reduces misunderstandings in communication</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Good writing skills help people communicate clearly, succeed academically, and act professionally.
</pre>
<h3> EXAMPLE</h3>
<pre>
Good language → clear message understood easily
Bad language → confusing message and misunderstanding
</pre>
<h3> BREAKDOWN</h3>
<ul>
<li><b>Good language</b> → correct grammar, clear vocabulary, and proper structure</li>
<li><b>Bad language</b> → unclear sentences, errors, and poor organization</li>
</ul>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Ignoring grammar rules</li>
<li> Writing without structure</li>
<li> Using unclear or informal language in formal situations</li>
</ul>
`,

[
  {
    q: "Why language use important?",
    steps: [
      "Step 1: communication",
      "Step 2: clarity"
    ],
    ans: "Improves communication",
    why: "importance"
  },

  {
    q: "What does good language do?",
    steps: [
      "Step 1: clear message",
      "Step 2: understanding"
    ],
    ans: "Ensures clarity",
    why: "effect"
  },

  {
    q: "Why students learn language use?",
    steps: [
      "Step 1: exams",
      "Step 2: writing skills"
    ],
    ans: "For effective communication",
    why: "purpose"
  }
]
);