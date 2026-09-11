/**
 * TIXAR KISWAHILI SUBJECT MUTATOR
 * Version 4.0.0
 *
 * Intelligent Kiswahili Learning Engine
 *
 * CORE PRINCIPLE:
 * Test -> Diagnose -> Explain -> Retrieve -> Transform
 *
 * DESIGN:
 * - Fully deterministic
 * - No Math.random()
 * - No random sorting
 * - Stable variant selection
 * - Stable MCQ ordering
 * - Modality and variant are independent
 * - Preserves original question metadata
 *
 * Covers:
 * - Ngeli na upatanisho wa kisarufi
 * - Umoja na wingi
 * - Nyakati za vitenzi
 * - Ukanushi
 * - Kauli za vitenzi
 * - Viambishi vya vitenzi
 * - Aina za maneno
 * - Uchanganuzi wa sentensi
 * - Methali
 * - Nahau
 * - Msamiati
 * - Visawe na vinyume
 * - Sarufi ya matumizi
 * - Error diagnosis
 * - Adaptive MCQ generation
 * - Reverse reasoning
 */

export class KiswahiliMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();

    if (!stem) return null;

    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "").trim();

    /*
     * ============================================================
     * DETERMINISTIC CONTROL
     * ============================================================
     *
     * modalityIndex:
     *   0 = open response
     *   1 = MCQ
     *   2 = error detection
     *   3 = explanation
     *   4 = application
     *   5 = reverse reasoning
     *
     * variantIndex:
     *   Controls which example/case is selected.
     *
     * IMPORTANT:
     * modality and variant are independent.
     */

    const requestedModality =
      modalityIndex !== null && modalityIndex !== undefined
        ? modalityIndex
        : qObj.modalityIndex ?? 0;

    const mode = this.normalizeIndex(requestedModality, 6);

    const variantIndex = this.normalizeVariant(
      qObj.variantIndex ?? 0
    );

    /*
     * ============================================================
     * UTILITY FUNCTIONS
     * ============================================================
     */

    const unique = (arr) => {
      if (!Array.isArray(arr)) return [];

      return [
        ...new Set(
          arr
            .filter(Boolean)
            .map((value) => String(value).trim())
            .filter(Boolean)
        ),
      ];
    };

    /*
     * Deterministic rotation.
     *
     * This replaces random shuffling.
     *
     * Example:
     * [A,B,C,D] + index 0 -> [A,B,C,D]
     * [A,B,C,D] + index 1 -> [B,C,D,A]
     * [A,B,C,D] + index 2 -> [C,D,A,B]
     */
    const rotate = (arr, index = 0) => {
      if (!Array.isArray(arr) || arr.length === 0) {
        return [];
      }

      const safeIndex = this.normalizeIndex(index, arr.length);

      return [
        ...arr.slice(safeIndex),
        ...arr.slice(0, safeIndex),
      ];
    };

    /*
     * Deterministically select one item.
     */
    const pick = (arr, index = 0) => {
      if (!Array.isArray(arr) || arr.length === 0) {
        return null;
      }

      return arr[this.normalizeIndex(index, arr.length)];
    };

    /*
     * Stable MCQ builder.
     *
     * The correct answer is always included.
     * Duplicate options are removed.
     * Ordering is deterministic.
     */
    const makeMCQ = (
      correct,
      distractors = [],
      optionVariantIndex = variantIndex
    ) => {
      const cleanCorrect = String(correct || "").trim();

      const candidates = unique([
        cleanCorrect,
        ...distractors,
      ]).filter(
        (option) =>
          option.toLowerCase() !== cleanCorrect.toLowerCase()
            ? true
            : option === cleanCorrect
      );

      /*
       * Keep the correct answer and then fill with
       * deterministic distractors.
       */
      const selected = [
        cleanCorrect,
        ...candidates.filter(
          (option) =>
            option.toLowerCase() !== cleanCorrect.toLowerCase()
        ),
      ].slice(0, 4);

      return rotate(selected, optionVariantIndex);
    };

    /*
     * Build a standard result object.
     */
    const makeResult = ({
      q,
      ans,
      hint,
      why,
      sol,
      steps,
      type = "open_response",
      options = null,
      concept = null,
      difficulty = null,
    }) => {
      return {
        ...qObj,

        q,
        ans,
        hint,
        why: why || ans,
        sol: sol || ans,
        steps,
        type,
        options,
        concept,
        difficulty,

        subject: "Kiswahili",

        mutation: {
          engine: "KiswahiliMutator",
          version: "4.0.0",
          deterministic: true,
          variantIndex,
          modalityIndex: mode,
        },
      };
    };

    const baseSteps = [
      "Hatua ya 1: Soma swali au sentensi kwa makini.",
      "Hatua ya 2: Tambua dhana ya Kiswahili inayopimwa.",
      "Hatua ya 3: Tumia kanuni inayohusika.",
      "Hatua ya 4: Linganisha chaguo au jibu na kanuni hiyo.",
      "Hatua ya 5: Thibitisha jibu kwa kutumia ushahidi wa kisarufi au kimatumizi.",
    ];

    /*
     * ============================================================
     * 1. NGELI NA UPATANISHO
     * ============================================================
     */

    if (
      lower.includes("ngeli") ||
      lower.includes("umoja") ||
      lower.includes("wingi") ||
      lower.includes("upatanisho") ||
      lower.includes("nomino")
    ) {
      const cases = [
        {
          singular:
            "Mwanafunzi mtiifu anasoma kitabu kizuri.",

          plural:
            "Wanafunzi watiifu wanasoma vitabu vizuri.",

          class:
            "A-WA na KI-VI",

          rule:
            "Mwanafunzi → wanafunzi, mtiifu → watiifu, ana- → wana-, kitabu → vitabu, kizuri → vizuri.",

          distractors: [
            "Mwanafunzi watiifu anasoma vitabu vizuri.",
            "Wanafunzi mtiifu anasoma kitabu kizuri.",
            "Wanafunzi watiifu anasoma vitabu vizuri.",
          ],
        },

        {
          singular:
            "Mti mrefu umeanguka njiani.",

          plural:
            "Miti mirefu imeanguka njiani.",

          class:
            "M-MI",

          rule:
            "Mti → miti, mrefu → mirefu, u- → i- katika upatanisho wa kitenzi.",

          distractors: [
            "Miti mrefu umeanguka njiani.",
            "Miti mirefu umeanguka njiani.",
            "Mti mirefu imeanguka njiani.",
          ],
        },

        {
          singular:
            "Jicho lake limevimba.",

          plural:
            "Macho yake yamevimba.",

          class:
            "LI-YA",

          rule:
            "Jicho → macho, lake → yake, li- → ya- katika upatanisho wa kitenzi.",

          distractors: [
            "Macho lake limevimba.",
            "Majicho yake yamevimba.",
            "Macho yao limevimba.",
          ],
        },

        {
          singular:
            "Kitabu kizito kimeanguka.",

          plural:
            "Vitabu vizito vimeanguka.",

          class:
            "KI-VI",

          rule:
            "Kitabu → vitabu, kizito → vizito, ki- → vi-.",

          distractors: [
            "Vitabu kizito kimeanguka.",
            "Vitabu vizito kimeanguka.",
            "Kitabu vizito vimeanguka.",
          ],
        },

        {
          singular:
            "Chakula kitamu kimeiva.",

          plural:
            "Vyakula vitamu vimeiva.",

          class:
            "KI-VI",

          rule:
            "Chakula → vyakula, kitamu → vitamu, ki- → vi-.",

          distractors: [
            "Vyakula kitamu kimeiva.",
            "Vyakula vitamu kimeiva.",
            "Chakula vitamu vimeiva.",
          ],
        },
      ];

      const selected = pick(cases, variantIndex);

      if (mode === 0) {
        return makeResult({
          q:
            `Andika sentensi hii katika wingi:\n"${selected.singular}"`,

          ans: selected.plural,

          hint:
            `Tambua ngeli ya nomino na ubadilishe nomino, kivumishi na kitenzi kwa upatanisho sahihi. ${selected.rule}`,

          why: selected.rule,

          sol: selected.plural,

          steps: [
            `Hatua ya 1: Tambua nomino kuu na ngeli yake (${selected.class}).`,
            "Hatua ya 2: Badilisha nomino kutoka umoja hadi wingi.",
            "Hatua ya 3: Badilisha vivumishi vinavyohusiana na nomino.",
            "Hatua ya 4: Rekebisha kiambishi cha kitenzi.",
            `Hatua ya 5: Sentensi sahihi ni "${selected.plural}".`,
          ],

          type: "open_response",

          concept: "ngeli_na_upatanisho",
        });
      }

      if (mode === 1) {
        return makeResult({
          q:
            `Teua sentensi iliyo na upatanisho sahihi katika WINGI:\n"${selected.singular}"`,

          ans: selected.plural,

          hint: selected.rule,

          why: selected.rule,

          sol: selected.plural,

          steps: [
            "Hatua ya 1: Tambua ngeli ya nomino.",
            "Hatua ya 2: Angalia kivumishi kinachohusiana na nomino.",
            "Hatua ya 3: Angalia kiambishi cha kitenzi.",
            "Hatua ya 4: Chagua sentensi ambayo vipengele vyote vinaafikiana.",
          ],

          type: "mcq",

          options: makeMCQ(
            selected.plural,
            selected.distractors
          ),

          concept: "ngeli_na_upatanisho",
        });
      }

      if (mode === 2) {
        const wrong = pick(
          selected.distractors,
          variantIndex
        );

        return makeResult({
          q:
            `Tambua na usahihishe kosa la upatanisho katika sentensi hii:\n"${wrong}"`,

          ans:
            `Sentensi sahihi ni: "${selected.plural}".`,

          hint: selected.rule,

          why: selected.rule,

          sol: selected.plural,

          steps: [
            "Hatua ya 1: Tambua nomino inayotawala upatanisho.",
            "Hatua ya 2: Kagua kivumishi.",
            "Hatua ya 3: Kagua kiambishi cha kitenzi.",
            `Hatua ya 4: Linganisha maneno yote na ngeli ${selected.class}.`,
            `Hatua ya 5: Sahihisha sentensi kuwa "${selected.plural}".`,
          ],

          type: "open_response",

          concept: "error_diagnosis_ngeli",
        });
      }

      if (mode === 3) {
        return makeResult({
          q:
            `Ni ngeli gani zinazotumika katika sentensi hii?\n"${selected.plural}"`,

          ans: selected.class,

          hint: selected.rule,

          why:
            `Sentensi hii inahusisha ${selected.class}.`,

          sol: selected.class,

          steps: [
            "Hatua ya 1: Tambua nomino.",
            "Hatua ya 2: Tambua umbo lake la umoja na wingi.",
            "Hatua ya 3: Angalia upatanisho wa kivumishi.",
            "Hatua ya 4: Angalia upatanisho wa kitenzi.",
            `Hatua ya 5: Tambua ngeli: ${selected.class}.`,
          ],

          type: "mcq",

          options: makeMCQ(
            selected.class,
            [
              "U-I",
              "A-WA",
              "LI-YA",
              "KI-VI",
            ]
          ),

          concept: "ngeli",
        });
      }

      if (mode === 4) {
        return makeResult({
          q:
            `Eleza kwa nini sentensi hii ina upatanisho sahihi:\n"${selected.plural}"`,

          ans: selected.rule,

          hint:
            "Fuata uhusiano kati ya nomino, kivumishi na kitenzi.",

          why: selected.rule,

          sol: selected.rule,

          steps: [
            "Hatua ya 1: Tambua nomino kuu.",
            "Hatua ya 2: Tambua ngeli yake.",
            "Hatua ya 3: Angalia kivumishi kinachohusiana nayo.",
            "Hatua ya 4: Angalia kiambishi cha kitenzi.",
            "Hatua ya 5: Eleza kwa nini maneno hayo yanaafikiana.",
          ],

          type: "open_response",

          concept: "upatanisho",
        });
      }

      return makeResult({
        q:
          `Badilisha sentensi hii kutoka WINGI hadi UMOJA:\n"${selected.plural}"`,

        ans: selected.singular,

        hint: selected.rule,

        why: selected.rule,

        sol: selected.singular,

        steps: [
          "Hatua ya 1: Tambua nomino ya wingi.",
          "Hatua ya 2: Ibadilishe kuwa umoja.",
          "Hatua ya 3: Rekebisha kivumishi.",
          "Hatua ya 4: Rekebisha kiambishi cha kitenzi.",
          `Hatua ya 5: Sentensi sahihi ni "${selected.singular}".`,
        ],

        type: "open_response",

        concept: "umoja_na_wingi",
      });
    }

    /*
     * ============================================================
     * 2. NYAKATI ZA VITENZI
     * ============================================================
     */

    if (
      lower.includes("wakati") ||
      lower.includes("nyakati") ||
      lower.includes("tense") ||
      lower.includes("jana") ||
      lower.includes("kesho") ||
      lower.includes("leo") ||
      lower.includes("sasa")
    ) {
      const tenseCases = [
        {
          clue: "jana",

          sentence:
            "Jana mwanafunzi _______ mtihani wake.",

          answer: "alifanya",

          rule:
            "Kiambishi -li- huonyesha wakati uliopita.",

          options: [
            "alifanya",
            "anafanya",
            "atafanya",
            "amefanya",
          ],
        },

        {
          clue: "sasa",

          sentence:
            "Mwanafunzi _______ kazi yake sasa.",

          answer: "anafanya",

          rule:
            "Kiambishi -na- huonyesha wakati uliopo.",

          options: [
            "alifanya",
            "anafanya",
            "atafanya",
            "amefanya",
          ],
        },

        {
          clue: "kesho",

          sentence:
            "Kesho wanafunzi _______ mtihani.",

          answer: "watafanya",

          rule:
            "Kiambishi -ta- huonyesha wakati ujao.",

          options: [
            "walifanya",
            "wanafanya",
            "watafanya",
            "wamefanya",
          ],
        },

        {
          clue: "tayari",

          sentence:
            "Wanafunzi _______ kazi yao.",

          answer: "wamefanya",

          rule:
            "Kiambishi -me- huonyesha tendo lililotimia.",

          options: [
            "walifanya",
            "wanafanya",
            "watafanya",
            "wamefanya",
          ],
        },
      ];

      const selected = pick(
        tenseCases,
        variantIndex
      );

      const isMCQ = mode === 1 || mode === 4;

      return makeResult({
        q:
          `${selected.sentence}\nNi kitenzi gani kinachofaa zaidi?`,

        ans: selected.answer,

        hint:
          `Tazama kidokezo cha wakati katika sentensi. ${selected.rule}`,

        why: selected.rule,

        sol: selected.answer,

        steps: [
          `Hatua ya 1: Tambua kidokezo cha wakati (${selected.clue}).`,
          "Hatua ya 2: Tambua wakati unaorejelewa.",
          "Hatua ya 3: Chagua kiambishi cha wakati kinachofaa.",
          `Hatua ya 4: Unda kitenzi sahihi: "${selected.answer}".`,
        ],

        type: isMCQ
          ? "mcq"
          : "open_response",

        options: isMCQ
          ? makeMCQ(
              selected.answer,
              selected.options
            )
          : null,

        concept: "nyakati_za_vitenzi",
      });
    }

    /*
     * ============================================================
     * 3. UKANUSHI
     * ============================================================
     */

    if (
      lower.includes("kanusha") ||
      lower.includes("ukanushi") ||
      lower.includes("negative") ||
      lower.includes("hasi")
    ) {
      const cases = [
        {
          positive:
            "Mwanafunzi anasoma kitabu.",

          negative:
            "Mwanafunzi hasomi kitabu.",

          rule:
            "Katika wakati uliopo, ukanushi wa anasoma ni hasomi. Muundo wa wakati uliopo hubadilika kutoka ha-...-i.",
        },

        {
          positive:
            "Wanafunzi walifika shuleni.",

          negative:
            "Wanafunzi hawakufika shuleni.",

          rule:
            "Katika wakati uliopita, walifika hukataliwa kwa kutumia hawaku-: hawakufika.",
        },

        {
          positive:
            "Atafanya kazi kesho.",

          negative:
            "Hatafanya kazi kesho.",

          rule:
            "Katika wakati ujao, ukanushi huunda muundo ha-ta-: hatafanya.",
        },

        {
          positive:
            "Amefika shuleni.",

          negative:
            "Hajafika shuleni.",

          rule:
            "Katika wakati timilifu, ukanushi hutumia muundo ha-ja-: hajafika.",
        },
      ];

      const selected = pick(
        cases,
        variantIndex
      );

      if (mode === 0 || mode === 4) {
        return makeResult({
          q:
            `Kanusha sentensi hii:\n"${selected.positive}"`,

          ans: selected.negative,

          hint: selected.rule,

          why: selected.rule,

          sol: selected.negative,

          steps: [
            "Hatua ya 1: Tambua wakati wa kitenzi.",
            "Hatua ya 2: Tambua muundo wa ukanushi unaohitajika.",
            "Hatua ya 3: Badilisha viambishi vinavyohitajika.",
            `Hatua ya 4: Jibu ni "${selected.negative}".`,
          ],

          type: "open_response",

          concept: "ukanushi",
        });
      }

      return makeResult({
        q:
          `Ni sentensi ipi ni ukanushi sahihi wa:\n"${selected.positive}"`,

        ans: selected.negative,

        hint: selected.rule,

        why: selected.rule,

        sol: selected.negative,

        steps: [
          "Hatua ya 1: Tambua wakati wa sentensi.",
          "Hatua ya 2: Tambua muundo sahihi wa ukanushi.",
          "Hatua ya 3: Ondoa au badilisha viambishi visivyofaa.",
          "Hatua ya 4: Chagua sentensi yenye ukanushi sahihi.",
        ],

        type: "mcq",

        options: makeMCQ(
          selected.negative,
          [
            selected.positive,
            "Mwanafunzi si anasoma kitabu.",
            "Mwanafunzi hanasoma kitabu.",
          ]
        ),

        concept: "ukanushi",
      });
    }

    /*
     * ============================================================
     * 4. KAULI ZA VITENZI
     * ============================================================
     */

    if (
      lower.includes("kauli") ||
      lower.includes("tendwa") ||
      lower.includes("tendea") ||
      lower.includes("tendeka") ||
      lower.includes("tendesha")
    ) {
      const voices = [
        {
          base:
            "Mwalimu anafundisha wanafunzi.",

          transformed:
            "Wanafunzi wanafundishwa na mwalimu.",

          voice:
            "Kauli ya kutendwa",

          rule:
            "Katika kauli ya kutendwa, mtendwa wa sentensi ya kutenda anaweza kuwa kiima, huku kitenzi kikibadilishwa kuwa muundo wa kutendwa.",
        },

        {
          base:
            "Mama anampikia mtoto chakula.",

          transformed:
            "Mama anampikia mtoto chakula.",

          voice:
            "Kauli ya kutendea",

          rule:
            "Kiambishi cha kutendea huonyesha kuwa kitendo kinafanywa kwa ajili ya mtu au kwa uhusiano na mahali/kitu fulani.",
        },

        {
          base:
            "Mwalimu anamfundisha mwanafunzi.",

          transformed:
            "Mwalimu anamfundisha mwanafunzi.",

          voice:
            "Kauli ya kutendesha",

          rule:
            "Kauli ya kutendesha huonyesha kusababisha au kufanya mtu mwingine atekeleze tendo.",
        },
      ];

      const selected = pick(
        voices,
        variantIndex
      );

      if (mode === 0 && selected.voice === "Kauli ya kutendwa") {
        return makeResult({
          q:
            `Badilisha sentensi hii iwe katika kauli ya kutendwa:\n"${selected.base}"`,

          ans: selected.transformed,

          hint: selected.rule,

          why: selected.rule,

          sol: selected.transformed,

          steps: [
            "Hatua ya 1: Tambua mtenda.",
            "Hatua ya 2: Tambua mtendwa.",
            "Hatua ya 3: Mgeuze mtendwa kuwa kiima.",
            "Hatua ya 4: Badilisha kitenzi kuwa kauli ya kutendwa.",
            `Hatua ya 5: Jibu: "${selected.transformed}".`,
          ],

          type: "open_response",

          concept: "kauli_ya_kitenzi",
        });
      }

      return makeResult({
        q:
          `Ni kauli gani ya kitenzi inaonyeshwa katika mfano huu?\n"${selected.base}"`,

        ans: selected.voice,

        hint: selected.rule,

        why: selected.rule,

        sol: selected.voice,

        steps: [
          "Hatua ya 1: Chunguza muundo wa kitenzi.",
          "Hatua ya 2: Tambua uhusiano kati ya mtenda na tendo.",
          "Hatua ya 3: Angalia viambishi vya kitenzi.",
          "Hatua ya 4: Tambua kauli inayotumika.",
        ],

        type: "mcq",

        options: makeMCQ(
          selected.voice,
          [
            "Kauli ya kutenda",
            "Kauli ya kutendwa",
            "Kauli ya kutendea",
            "Kauli ya kutendeka",
          ]
        ),

        concept: "kauli_za_vitenzi",
      });
    }

    /*
     * ============================================================
     * 5. VIAMBISHI VYA KITENZI
     * ============================================================
     */

    if (
      lower.includes("kiambishi") ||
      lower.includes("mofimu") ||
      lower.includes("mnyambuliko")
    ) {
      const verbs = [
        {
          word:
            "alimpigia",

          breakdown:
            "a-li-m-pig-i-a",

          subject:
            "a- = yeye",

          tense:
            "li- = wakati uliopita",

          object:
            "m- = yeye",

          root:
            "pig- = mzizi wa kitenzi",

          extension:
            "i- = kiambishi cha kutendea",

          ending:
            "a- = kiishio",
        },

        {
          word:
            "watakupenda",

          breakdown:
            "wa-ta-ku-pend-a",

          subject:
            "wa- = wao",

          tense:
            "ta- = wakati ujao",

          object:
            "ku- = wewe",

          root:
            "pend- = mzizi wa kitenzi",

          extension:
            null,

          ending:
            "a- = kiishio",
        },

        {
          word:
            "anasoma",

          breakdown:
            "a-na-som-a",

          subject:
            "a- = yeye",

          tense:
            "na- = wakati uliopo",

          object:
            null,

          root:
            "som- = mzizi wa kitenzi",

          extension:
            null,

          ending:
            "a- = kiishio",
        },
      ];

      const selected = pick(
        verbs,
        variantIndex
      );

      return makeResult({
        q:
          `Changanua kitenzi "${selected.word}" kwa kutaja viambishi na sehemu zake.`,

        ans:
          selected.breakdown,

        hint:
          `${selected.subject}; ${selected.tense}; ${selected.root}.`,

        why:
          `${selected.word} inaweza kugawanywa kama ${selected.breakdown}.`,

        sol:
          selected.breakdown,

        steps: [
          `Hatua ya 1: Tambua kiambishi cha nafsi: ${selected.subject}.`,
          `Hatua ya 2: Tambua kiambishi cha wakati: ${selected.tense}.`,
          selected.object
            ? `Hatua ya 3: Tambua kiambishi cha yambwa: ${selected.object}.`
            : "Hatua ya 3: Angalia kama kuna kiambishi cha yambwa.",
          `Hatua ya 4: Tambua mzizi: ${selected.root}.`,
          selected.extension
            ? `Hatua ya 5: Tambua kiambishi cha kutendea: ${selected.extension}.`
            : "Hatua ya 5: Angalia kama kuna kiambishi cha unyambulishaji.",
          `Hatua ya mwisho: Muundo mzima ni ${selected.breakdown}.`,
        ],

        type:
          mode === 1
            ? "mcq"
            : "open_response",

        options:
          mode === 1
            ? makeMCQ(
                selected.breakdown,
                [
                  selected.root,
                  selected.tense,
                  selected.subject,
                ]
              )
            : null,

        concept: "viambishi_vya_vitenzi",
      });
    }

    /*
     * ============================================================
     * 6. AINA ZA MANENO
     * ============================================================
     */

    if (
      lower.includes("aina za maneno") ||
      lower.includes("kivumishi") ||
      lower.includes("kielezi") ||
      lower.includes("kiwakilishi") ||
      lower.includes("kihusishi") ||
      lower.includes("kiunganishi")
    ) {
      const items = [
        {
          sentence:
            "Mwanafunzi mwenye bidii alijibu swali vizuri.",

          word:
            "mwanafunzi",

          answer:
            "Nomino",

          reason:
            "Ni jina la mtu.",

          distractors: [
            "Kitenzi",
            "Kivumishi",
            "Kielezi",
          ],
        },

        {
          sentence:
            "Mwanafunzi mwenye bidii alijibu swali vizuri.",

          word:
            "mwenye bidii",

          answer:
            "Kivumishi",

          reason:
            "Kinaeleza sifa au hali ya mwanafunzi.",

          distractors: [
            "Nomino",
            "Kielezi",
            "Kitenzi",
          ],
        },

        {
          sentence:
            "Mwanafunzi mwenye bidii alijibu swali vizuri.",

          word:
            "alijibu",

          answer:
            "Kitenzi",

          reason:
            "Kinaonyesha kitendo kilichofanywa.",

          distractors: [
            "Nomino",
            "Kivumishi",
            "Kielezi",
          ],
        },

        {
          sentence:
            "Mwanafunzi alijibu swali kwa uangalifu.",

          word:
            "kwa uangalifu",

          answer:
            "Kielezi cha namna",

          reason:
            "Kinaeleza jinsi kitendo kilivyofanyika.",

          distractors: [
            "Nomino",
            "Kivumishi",
            "Kiunganishi",
          ],
        },

        {
          sentence:
            "Alienda shuleni kwa sababu alikuwa na mtihani.",

          word:
            "kwa sababu",

          answer:
            "Kiunganishi",

          reason:
            "Huunganisha mawazo na kuonyesha sababu.",

          distractors: [
            "Kivumishi",
            "Nomino",
            "Kielezi cha mahali",
          ],
        },

        {
          sentence:
            "Kitabu kiko juu ya meza.",

          word:
            "juu ya",

          answer:
            "Kihusishi",

          reason:
            "Huonyesha uhusiano wa mahali kati ya vitu.",

          distractors: [
            "Kitenzi",
            "Kivumishi",
            "Kiunganishi",
          ],
        },

        {
          sentence:
            "Yeye mwenyewe alifanya kazi hiyo.",

          word:
            "yeye",

          answer:
            "Kiwakilishi",

          reason:
            "Kinasimamia au kuchukua nafasi ya nomino.",

          distractors: [
            "Kitenzi",
            "Kielezi",
            "Kihusishi",
          ],
        },
      ];

      const selected = pick(
        items,
        variantIndex
      );

      return makeResult({
        q:
          `Katika sentensi:\n"${selected.sentence}"\nNeno/kifungu "${selected.word}" ni aina gani ya neno?`,

        ans:
          selected.answer,

        hint:
          selected.reason,

        why:
          `"${selected.word}" ni ${selected.answer.toLowerCase()} kwa sababu ${selected.reason.toLowerCase()}`,

        sol:
          selected.answer,

        steps: [
          `Hatua ya 1: Tambua neno/kifungu "${selected.word}".`,
          "Hatua ya 2: Angalia kazi yake katika sentensi.",
          "Hatua ya 3: Tambua aina ya neno kulingana na kazi yake.",
          `Hatua ya 4: Jibu: ${selected.answer}.`,
        ],

        type: "mcq",

        options: makeMCQ(
          selected.answer,
          selected.distractors
        ),

        concept: "aina_za_maneno",
      });
    }

    /*
     * ============================================================
     * 7. METHALI
     * ============================================================
     */

    if (
      lower.includes("methali") ||
      lower.includes("maana ya methali")
    ) {
      const proverbs = [
        {
          proverb:
            "Haraka haraka haina baraka.",

          answer:
            "Kufanya mambo kwa pupa kunaweza kusababisha makosa na matokeo mabaya.",

          distractors: [
            "Mtu anayefanya kazi haraka hupata mali nyingi.",
            "Mambo yote yanapaswa kufanywa bila kufikiri.",
            "Baraka hupatikana kwa kukimbia.",
          ],
        },

        {
          proverb:
            "Haba na haba hujaza kibaba.",

          answer:
            "Mambo madogo madogo yakikusanywa kwa muda huleta mafanikio makubwa.",

          distractors: [
            "Kila jambo lazima lifanywe mara moja.",
            "Mali nyingi hupatikana bila juhudi.",
            "Kibaba ni chombo cha kuhifadhia maji.",
          ],
        },

        {
          proverb:
            "Asiyefunzwa na mamae hufunzwa na ulimwengu.",

          answer:
            "Mtu asipopata malezi na mafunzo, maisha yanaweza kumfundisha kwa njia ngumu.",

          distractors: [
            "Mama ndiye pekee anayefundisha mtoto.",
            "Mtu hapaswi kujifunza kutoka kwa wengine.",
            "Elimu hupatikana shuleni pekee.",
          ],
        },

        {
          proverb:
            "Umoja ni nguvu, utengano ni udhaifu.",

          answer:
            "Watu wanaoshirikiana huwa na uwezo mkubwa zaidi wa kufanikisha jambo kuliko waliogawanyika.",

          distractors: [
            "Mtu akifanya kazi peke yake hufaulu kila mara.",
            "Udhaifu huongezeka wakati watu wanashirikiana.",
            "Umoja humaanisha kutofanya kazi.",
          ],
        },

        {
          proverb:
            "Asiyesikia la mkuu huvunjika guu.",

          answer:
            "Mtu asiyesikiliza ushauri au maonyo anaweza kupata madhara.",

          distractors: [
            "Kila mtu anapaswa kupuuza ushauri.",
            "Mkuu ndiye anayevunja miguu ya watu.",
            "Mtu anayesikia ushauri huwa dhaifu.",
          ],
        },
      ];

      const selected = pick(
        proverbs,
        variantIndex
      );

      return makeResult({
        q:
          `Methali "${selected.proverb}" ina maana gani?`,

        ans:
          selected.answer,

        hint:
          "Usichukue maana ya maneno moja kwa moja; tafuta ujumbe au funzo linalowasilishwa.",

        why:
          selected.answer,

        sol:
          selected.answer,

        steps: [
          "Hatua ya 1: Soma methali kwa makini.",
          "Hatua ya 2: Epuka kuichukua kwa maana ya moja kwa moja.",
          "Hatua ya 3: Tambua ujumbe unaowasilishwa.",
          "Hatua ya 4: Husisha ujumbe huo na hali ya maisha.",
          `Hatua ya 5: Maana yake ni: ${selected.answer}`,
        ],

        type: "mcq",

        options: makeMCQ(
          selected.answer,
          selected.distractors
        ),

        concept: "methali",
      });
    }

    /*
     * ============================================================
     * 8. NAHAU
     * ============================================================
     */

    if (
      lower.includes("nahau") ||
      lower.includes("maana ya nahau")
    ) {
      const idioms = [
        {
          idiom:
            "Kupiga moyo konde",

          answer:
            "Kujipa moyo na kuwa jasiri.",

          distractors: [
            "Kupiga mtu kifuani.",
            "Kuwa na ugonjwa wa moyo.",
            "Kukimbia kutoka mahali.",
          ],
        },

        {
          idiom:
            "Kula chumvi nyingi",

          answer:
            "Kuwa na umri mkubwa au uzoefu mwingi.",

          distractors: [
            "Kula chakula chenye chumvi nyingi.",
            "Kupenda vyakula vya chumvi.",
            "Kuwa na kiu kila wakati.",
          ],
        },

        {
          idiom:
            "Kushika hatamu",

          answer:
            "Kuchukua uongozi au mamlaka.",

          distractors: [
            "Kushika kamba ya farasi.",
            "Kukimbia mbio.",
            "Kufanya kazi shambani.",
          ],
        },

        {
          idiom:
            "Kula njama",

          answer:
            "Kupanga kwa siri jambo baya au la kumdhuru mtu.",

          distractors: [
            "Kula chakula pamoja.",
            "Kufanya sherehe.",
            "Kusafiri usiku.",
          ],
        },

        {
          idiom:
            "Kufumba na kufumbua",

          answer:
            "Kwa muda mfupi sana.",

          distractors: [
            "Kulala kwa muda mrefu.",
            "Kufunga mlango.",
            "Kufanya kazi kwa bidii.",
          ],
        },
      ];

      const selected = pick(
        idioms,
        variantIndex
      );

      return makeResult({
        q:
          `Nahau "${selected.idiom}" ina maana gani?`,

        ans:
          selected.answer,

        hint:
          "Nahau huwa na maana ya kimafumbo, si maana yake ya moja kwa moja.",

        why:
          selected.answer,

        sol:
          selected.answer,

        steps: [
          "Hatua ya 1: Tambua kuwa ni nahau.",
          "Hatua ya 2: Epuka kutafsiri maneno moja kwa moja.",
          "Hatua ya 3: Tafuta maana ya kimafumbo.",
          "Hatua ya 4: Chagua maana inayolingana na matumizi yake.",
        ],

        type: "mcq",

        options: makeMCQ(
          selected.answer,
          selected.distractors
        ),

        concept: "nahau",
      });
    }

    /*
     * ============================================================
     * 9. VISAWE NA KINYUME
     * ============================================================
     */

    if (
      lower.includes("kisawe") ||
      lower.includes("visawe") ||
      lower.includes("kinyume") ||
      lower.includes("maana ya neno")
    ) {
      const vocabulary = [
        {
          word: "furaha",
          synonym: "shangwe",
          antonym: "huzuni",
        },

        {
          word: "haraka",
          synonym: "upesi",
          antonym: "polepole",
        },

        {
          word: "jasiri",
          synonym: "hodari",
          antonym: "mwoga",
        },

        {
          word: "adui",
          synonym: "mhasimu",
          antonym: "rafiki",
        },

        {
          word: "maarufu",
          synonym: "mashuhuri",
          antonym: "asiyejulikana",
        },

        {
          word: "mvivu",
          synonym: "mzembe",
          antonym: "mchapakazi",
        },

        {
          word: "nzuri",
          synonym: "bora",
          antonym: "mbaya",
        },
      ];

      const selected = pick(
        vocabulary,
        variantIndex
      );

      const asksAntonym =
        lower.includes("kinyume") ||
        (lower.includes("maana ya neno") &&
          mode % 2 === 1);

      const answer = asksAntonym
        ? selected.antonym
        : selected.synonym;

      return makeResult({
        q: asksAntonym
          ? `Neno "${selected.word}" lina kinyume kipi?`
          : `Neno "${selected.word}" lina kisawe kipi?`,

        ans:
          answer,

        hint: asksAntonym
          ? "Tafuta neno lenye maana inayopingana."
          : "Tafuta neno lenye maana inayokaribiana.",

        why:
          `"${answer}" ni ${
            asksAntonym ? "kinyume" : "kisawe"
          } cha "${selected.word}".`,

        sol:
          answer,

        steps: [
          `Hatua ya 1: Tambua maana ya "${selected.word}".`,
          asksAntonym
            ? "Hatua ya 2: Tafuta maana inayopingana nayo."
            : "Hatua ya 2: Tafuta maana inayokaribiana nayo.",
          `Hatua ya 3: Thibitisha kuwa "${answer}" inafaa.`,
        ],

        type: "mcq",

        options: makeMCQ(
          answer,
          asksAntonym
            ? [
                selected.synonym,
                "mvivu",
                "mkubwa",
              ]
            : [
                selected.antonym,
                "mvivu",
                "mkubwa",
              ]
        ),

        concept: asksAntonym
          ? "vinyume"
          : "visawe",
      });
    }

    /*
     * ============================================================
     * 10. UCHANGANUZI WA SENTENSI
     * ============================================================
     */

    if (
      lower.includes("changanua") ||
      lower.includes("uchanganuzi") ||
      lower.includes("muundo wa sentensi") ||
      lower.includes("kiima") ||
      lower.includes("kiarifu")
    ) {
      const examples = [
        {
          sentence:
            "Mwanafunzi anasoma kitabu.",

          subject:
            "Mwanafunzi",

          predicate:
            "anasoma kitabu",

          structure:
            "Kiima + Kiarifu",
        },

        {
          sentence:
            "Wakulima wanapanda mahindi shambani.",

          subject:
            "Wakulima",

          predicate:
            "wanapanda mahindi shambani",

          structure:
            "Kiima + Kiarifu",
        },

        {
          sentence:
            "Mtoto anacheza uwanjani.",

          subject:
            "Mtoto",

          predicate:
            "anacheza uwanjani",

          structure:
            "Kiima + Kiarifu",
        },

        {
          sentence:
            "Wanafunzi walifanya mtihani jana.",

          subject:
            "Wanafunzi",

          predicate:
            "walifanya mtihani jana",

          structure:
            "Kiima + Kiarifu",
        },
      ];

      const selected = pick(
        examples,
        variantIndex
      );

      if (mode === 1 || mode === 4) {
        return makeResult({
          q:
            `Katika sentensi hii, kiima ni kipi?\n"${selected.sentence}"`,

          ans:
            selected.subject,

          hint:
            "Tafuta anayefanya tendo au anayezungumziwa.",

          why:
            `"${selected.subject}" ndicho kiima cha sentensi.`,

          sol:
            selected.subject,

          steps: [
            "Hatua ya 1: Soma sentensi nzima.",
            "Hatua ya 2: Tambua tendo.",
            "Hatua ya 3: Uliza ni nani au nini kinachofanya au kinachohusishwa na tendo.",
            `Hatua ya 4: Jibu ni "${selected.subject}".`,
          ],

          type: "mcq",

          options: makeMCQ(
            selected.subject,
            [
              selected.predicate,
              "kitabu",
              "jana",
            ]
          ),

          concept: "kiima_na_kiarifu",
        });
      }

      return makeResult({
        q:
          `Changanua sentensi hii kwa kutambua Kiima na Kiarifu:\n"${selected.sentence}"`,

        ans:
          `Kiima: ${selected.subject}; Kiarifu: ${selected.predicate}`,

        hint:
          "Kiima ni anayefanya au anayehusishwa na tendo; kiarifu hueleza jambo kuhusu kiima.",

        why:
          `Kiima ni "${selected.subject}" na kiarifu ni "${selected.predicate}".`,

        sol:
          `Kiima: ${selected.subject}; Kiarifu: ${selected.predicate}`,

        steps: [
          "Hatua ya 1: Tafuta anayefanya tendo au anayezungumziwa.",
          `Hatua ya 2: Kiima ni "${selected.subject}".`,
          `Hatua ya 3: Sehemu inayotoa taarifa kuhusu kiima ni "${selected.predicate}".`,
          "Hatua ya 4: Hakikisha mgawanyo unaendana na maana ya sentensi.",
        ],

        type: "open_response",

        concept: "uchanganuzi_wa_sentensi",
      });
    }

    /*
     * ============================================================
     * 11. SARUFI YA MATUMIZI
     * ============================================================
     */

    if (
      lower.includes("sahihi") ||
      lower.includes("sarufi") ||
      lower.includes("kosa la kisarufi") ||
      lower.includes("rekebisha sentensi") ||
      lower.includes("sahihisha")
    ) {
      const grammarCases = [
        {
          wrong:
            "Watoto alicheza mpira.",

          correct:
            "Watoto walicheza mpira.",

          rule:
            "Nomino ya wingi 'watoto' huhitaji upatanisho wa nafsi wa- katika wakati uliopita: walicheza.",
        },

        {
          wrong:
            "Miti mrefu imeanguka.",

          correct:
            "Miti mirefu imeanguka.",

          rule:
            "Miti iko katika ngeli ya M-MI, hivyo kivumishi kinapaswa kuwa 'mirefu'.",
        },

        {
          wrong:
            "Kitabu nzuri kimepotea.",

          correct:
            "Kitabu kizuri kimepotea.",

          rule:
            "Kitabu kiko katika ngeli ya KI-VI, hivyo kivumishi kinapaswa kuafikiana nacho: kizuri.",
        },

        {
          wrong:
            "Wanafunzi anasoma.",

          correct:
            "Wanafunzi wanasoma.",

          rule:
            "Wanafunzi ni wingi wa ngeli ya A-WA, hivyo kitenzi kinahitaji kiambishi wa-.",
        },
      ];

      const selected = pick(
        grammarCases,
        variantIndex
      );

      if (mode === 2 || mode === 0) {
        return makeResult({
          q:
            `Tambua kosa la kisarufi na usahihishe sentensi hii:\n"${selected.wrong}"`,

          ans:
            selected.correct,

          hint:
            selected.rule,

          why:
            selected.rule,

          sol:
            selected.correct,

          steps: [
            "Hatua ya 1: Tambua nomino kuu.",
            "Hatua ya 2: Angalia upatanisho wake.",
            "Hatua ya 3: Tambua sehemu yenye kosa.",
            "Hatua ya 4: Tumia kanuni sahihi ya sarufi.",
            `Hatua ya 5: Sentensi sahihi ni "${selected.correct}".`,
          ],

          type: "open_response",

          concept: "sarufi_ya_matumizi",
        });
      }

      return makeResult({
        q:
          `Ni sentensi ipi iliyo sahihi?`,

        ans:
          selected.correct,

        hint:
          selected.rule,

        why:
          selected.rule,

        sol:
          selected.correct,

        steps: [
          "Hatua ya 1: Tambua nomino inayotawala upatanisho.",
          "Hatua ya 2: Kagua kivumishi au kitenzi.",
          "Hatua ya 3: Tumia kanuni ya ngeli.",
          "Hatua ya 4: Chagua sentensi yenye upatanisho sahihi.",
        ],

        type: "mcq",

        options: makeMCQ(
          selected.correct,
          [
            selected.wrong,
            "Watoto alicheza mpira.",
            "Wanafunzi anasoma.",
          ]
        ),

        concept: "error_diagnosis",
      });
    }

    /*
     * ============================================================
     * 12. REVERSE DIAGNOSTIC
     * ============================================================
     *
     * Existing answer becomes the anchor.
     *
     * No random distractors.
     */

    if (rawAns.length > 3) {
      const reverseQuestions = [
        `Ni kanuni gani ya Kiswahili inayothibitisha jibu hili?\n"${stem}"`,

        `Ni dhana gani ya Kiswahili inayohusiana moja kwa moja na jibu hili?\n"${stem}"`,

        `Kwa nini "${rawAns}" ndilo jibu linalofaa katika swali hili?`,

        `Ni ushahidi gani wa kisarufi unaounga mkono jibu "${rawAns}"?`,

        `Ni kanuni gani ungeweza kutumia ili kumshawishi mwanafunzi kwamba "${rawAns}" ni sahihi?`,

        `Ikiwa jibu ni "${rawAns}", ni kipengele gani cha sarufi au matumizi kinapaswa kuzingatiwa?`,
      ];

      const reverseQ = pick(
        reverseQuestions,
        mode
      );

      const reverseOptions = [
        rawAns,
        "Upatanisho wa ngeli",
        "Mnyambuliko wa vitenzi",
        "Matumizi ya vihusishi",
      ];

      return makeResult({
        q:
          `[Uchunguzi wa Kiswahili]\n${reverseQ}`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Chunguza ngeli, muundo wa sentensi, mnyambuliko wa kitenzi, msamiati au matumizi ya neno.",

        why:
          qObj.why ||
          `Jibu linalohusiana na swali ni: ${rawAns}.`,

        sol:
          qObj.sol ||
          qObj.why ||
          rawAns,

        steps: [
          "Hatua ya 1: Soma swali la awali.",
          "Hatua ya 2: Tambua jibu lililotolewa.",
          "Hatua ya 3: Tambua dhana ya Kiswahili inayohusiana na jibu.",
          "Hatua ya 4: Tumia kanuni hiyo kuthibitisha jibu.",
          "Hatua ya 5: Eleza uhusiano kati ya kanuni na jibu.",
        ],

        type:
          mode === 1 || mode === 3
            ? "mcq"
            : "open_response",

        options:
          mode === 1 || mode === 3
            ? makeMCQ(
                rawAns,
                reverseOptions.slice(1)
              )
            : null,

        concept:
          "reverse_kiswahili_reasoning",
      });
    }

    /*
     * ============================================================
     * 13. SAFE FALLBACK
     * ============================================================
     */

    const fallbackQuestions = [
      `[Uchunguzi wa Kiswahili] Eleza dhana inayopimwa katika swali hili:\n"${stem}"`,

      `[Uchunguzi wa Kiswahili] Ni kanuni gani ya Kiswahili inayohusika katika swali hili?\n"${stem}"`,

      `[Uchunguzi wa Kiswahili] Ni ushahidi gani wa kisarufi unaoweza kutumika kujibu swali hili?\n"${stem}"`,

      `[Uchunguzi wa Kiswahili] Eleza kwa nini jibu la swali hili linaweza kuwa sahihi:\n"${stem}"`,

      `[Uchunguzi wa Kiswahili] Ni kipengele gani cha sarufi, msamiati au matumizi kinapaswa kuzingatiwa?\n"${stem}"`,

      `[Uchunguzi wa Kiswahili] Tathmini swali hili kwa kutumia kanuni za Kiswahili:\n"${stem}"`,
    ];

    const fallbackQ = pick(
      fallbackQuestions,
      mode
    );

    return makeResult({
      q:
        fallbackQ,

      ans:
        rawAns || qObj.ans || "",

      hint:
        qObj.hint ||
        "Tambua dhana inayopimwa, tumia kanuni husika, kisha thibitisha jibu.",

      why:
        qObj.why ||
        "Jibu linapaswa kuthibitishwa kwa kutumia kanuni ya Kiswahili inayohusika.",

      sol:
        qObj.sol ||
        rawAns ||
        "Tumia kanuni husika ya Kiswahili.",

      steps: [
        "Hatua ya 1: Tambua dhana inayopimwa.",
        "Hatua ya 2: Tambua kanuni ya Kiswahili inayohusika.",
        "Hatua ya 3: Tumia kanuni hiyo kwenye swali.",
        "Hatua ya 4: Linganisha jibu na kanuni.",
        "Hatua ya 5: Thibitisha jibu.",
      ],

      type:
        mode === 1
          ? "mcq"
          : "open_response",

      options:
        mode === 1 && rawAns
          ? makeMCQ(
              rawAns,
              [
                "Jibu lisilohusiana na swali.",
                "Jibu linalokiuka kanuni ya Kiswahili.",
                "Jibu lisilo na ushahidi wa kisarufi.",
              ]
            )
          : null,

      concept:
        "general_kiswahili",
    });
  }

  /*
   * ============================================================
   * NORMALIZE MODALITY / VARIANT
   * ============================================================
   */

  normalizeIndex(value, length) {
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      return 0;
    }

    const integer = Math.trunc(numeric);

    return ((integer % length) + length) % length;
  }

  normalizeVariant(value) {
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      return 0;
    }

    const integer = Math.trunc(numeric);

    /*
     * Keep the variant space stable and bounded.
     * 1000 variants are more than enough for deterministic
     * cycling across the built-in case libraries.
     */
    return ((integer % 1000) + 1000) % 1000;
  }
}