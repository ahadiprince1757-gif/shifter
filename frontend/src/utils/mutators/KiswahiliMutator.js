/**
 * Kiswahili Subject Mutator
 *
 * Intelligent Kiswahili Learning Engine
 *
 * Covers:
 * - Ngeli na upatanisho wa kisarufi
 * - Umoja na wingi
 * - Nyakati za vitenzi
 * - Ukanushi
 * - Kauli za vitenzi
 * - Viambishi vya vitenzi
 * - Aina za maneno
 * - Uchangananuzi wa sentensi
 * - Methali
 * - Nahau
 * - Msamiati na visawe
 * - Sarufi ya matumizi
 * - Error diagnosis
 * - Adaptive MCQ generation
 *
 * Design principle:
 * Test -> Diagnose -> Explain -> Retrieve -> Transform
 */

export class KiswahiliMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "").trim();

    const mode =
      typeof modalityIndex === "number"
        ? ((modalityIndex % 6) + 6) % 6
        : Math.floor(Math.random() * 6);

    /*
     * ============================================================
     * UTILITY FUNCTIONS
     * ============================================================
     */

    const unique = (arr) => [...new Set(arr.filter(Boolean))];

    const shuffle = (arr) => {
      const copy = [...arr];

      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }

      return copy;
    };

    const makeMCQ = (correct, distractors = []) => {
      const options = unique([correct, ...distractors])
        .filter(Boolean)
        .slice(0, 4);

      return shuffle(options);
    };


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
          singular: "Mwanafunzi mtiifu anasoma kitabu kizuri.",
          plural: "Wanafunzi watiifu wanasoma vitabu vizuri.",
          class: "A-WA na KI-VI",
          rule:
            "Mwanafunzi → wanafunzi, mtiifu → watiifu, ana- → wana-, kitabu → vitabu, ki- → vi-.",
          distractors: [
            "Mwanafunzi watiifu anasoma vitabu vizuri.",
            "Wanafunzi mtiifu anasoma kitabu kizuri.",
            "Wanafunzi watiifu anasoma vitabu vizuri.",
          ],
        },

        {
          singular: "Mti mrefu umeanguka njiani.",
          plural: "Miti mirefu imeanguka njiani.",
          class: "M-MI",
          rule:
            "Mti → miti, mrefu → mirefu, u- → i- katika upatanisho wa kitenzi.",
          distractors: [
            "Miti mrefu umeanguka njiani.",
            "Miti mirefu umeanguka njiani.",
            "Mti mirefu imeanguka njiani.",
          ],
        },

        {
          singular: "Jicho lake limevimba.",
          plural: "Macho yake yamevimba.",
          class: "LI-YA",
          rule:
            "Jicho → macho, lake → yake, li- → ya- katika kitenzi.",
          distractors: [
            "Macho lake limevimba.",
            "Majicho yake yamevimba.",
            "Macho yao limevimba.",
          ],
        },

        {
          singular: "Kitabu kizito kimeanguka.",
          plural: "Vitabu vizito vimeanguka.",
          class: "KI-VI",
          rule:
            "Kitabu → vitabu, kizito → vizito, ki- → vi-.",
          distractors: [
            "Vitabu kizito kimeanguka.",
            "Vitabu vizito kimeanguka.",
            "Kitabu vizito vimeanguka.",
          ],
        },

        {
          singular: "Chakula kitamu kimeiva.",
          plural: "Vyakula vitamu vimeiva.",
          class: "KI-VI",
          rule:
            "Chakula → vyakula, kitamu → vitamu, ki- → vi-.",
          distractors: [
            "Vyakula kitamu kimeiva.",
            "Vyakula vitamu kimeiva.",
            "Chakula vitamu vimeiva.",
          ],
        },
      ];

      const selected = cases[mode % cases.length];

      if (mode === 0) {
        return {
          q: `Andika sentensi hii katika wingi:\n"${selected.singular}"`,
          ans: selected.plural,
          hint: `Tambua ngeli ya nomino na ubadilishe nomino, kivumishi na kitenzi kwa upatanisho sahihi. ${selected.rule}`,
          why: selected.rule,
          sol: selected.plural,
          steps: [
            `Hatua ya 1: Tambua nomino kuu na ngeli yake (${selected.class}).`,
            "Hatua ya 2: Badilisha nomino kutoka umoja hadi wingi.",
            "Hatua ya 3: Badilisha kivumishi na viambishi vya kitenzi.",
            `Hatua ya 4: Sentensi sahihi ni "${selected.plural}".`,
          ],
          type: "open_response",
          options: null,
        };
      }

      if (mode === 1) {
        return {
          q: `Teua sentensi iliyo na upatanisho sahihi katika WINGI:\n"${selected.singular}"`,
          ans: selected.plural,
          hint: selected.rule,
          why: selected.rule,
          sol: selected.plural,
          steps: [
            "Hatua ya 1: Tambua ngeli ya nomino.",
            "Hatua ya 2: Angalia kivumishi kinachohusiana na nomino.",
            "Hatua ya 3: Angalia kiambishi cha kitenzi.",
          ],
          type: "mcq",
          options: makeMCQ(selected.plural, selected.distractors),
        };
      }

      if (mode === 2) {
        const wrong = selected.distractors[0];

        return {
          q: `Tambua na usahihishe kosa la upatanisho katika sentensi hii:\n"${wrong}"`,
          ans: `Sentensi sahihi ni: "${selected.plural}".`,
          hint: selected.rule,
          why: selected.rule,
          sol: selected.plural,
          steps: [
            "Hatua ya 1: Tambua nomino inayotawala upatanisho.",
            "Hatua ya 2: Kagua kivumishi.",
            "Hatua ya 3: Kagua kiambishi cha kitenzi.",
            `Hatua ya 4: Sahihisha sentensi kuwa "${selected.plural}".`,
          ],
          type: "open_response",
          options: null,
        };
      }

      if (mode === 3) {
        return {
          q: `Ni ngeli gani zinazotumika katika sentensi hii?\n"${selected.plural}"`,
          ans: selected.class,
          hint: selected.rule,
          why: `Sentensi hii inahusisha ${selected.class}.`,
          sol: selected.class,
          steps: [
            "Hatua ya 1: Tambua nomino.",
            "Hatua ya 2: Tambua kiambishi chake cha umoja/wingi.",
            "Hatua ya 3: Angalia upatanisho wa kivumishi na kitenzi.",
            `Hatua ya 4: Tambua ngeli: ${selected.class}.`,
          ],
          type: "mcq",
          options: makeMCQ(selected.class, [
            "U-I",
            "A-WA",
            "LI-YA",
            "KI-VI",
          ]),
        };
      }

      if (mode === 4) {
        return {
          q: `Eleza kwa nini sentensi hii ina upatanisho sahihi:\n"${selected.plural}"`,
          ans: selected.rule,
          hint: "Fuata uhusiano kati ya nomino, kivumishi na kitenzi.",
          why: selected.rule,
          sol: selected.rule,
          steps: [
            "Hatua ya 1: Tambua nomino kuu.",
            "Hatua ya 2: Tambua ngeli yake.",
            "Hatua ya 3: Angalia viambishi vya maneno vinavyohusiana nayo.",
          ],
          type: "open_response",
          options: null,
        };
      }

      return {
        q: `Badilisha sentensi hii kutoka WINGI hadi UMOJA:\n"${selected.plural}"`,
        ans: selected.singular,
        hint: selected.rule,
        why: selected.rule,
        sol: selected.singular,
        steps: [
          "Hatua ya 1: Tambua nomino ya wingi.",
          "Hatua ya 2: Ibadilishe kuwa umoja.",
          "Hatua ya 3: Rekebisha kivumishi.",
          "Hatua ya 4: Rekebisha kitenzi.",
        ],
        type: "open_response",
        options: null,
      };
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
      lower.includes("leo")
    ) {
      const tenseCases = [
        {
          clue: "jana",
          sentence: "Jana mwanafunzi _______ mtihani wake.",
          answer: "alifanya",
          rule: "Kiambishi -li- huonyesha wakati uliopita.",
          options: ["alifanya", "anafanya", "atafanya", "amefanya"],
        },
        {
          clue: "sasa",
          sentence: "Mwanafunzi _______ kazi yake sasa.",
          answer: "anafanya",
          rule: "Kiambishi -na- huonyesha wakati uliopo.",
          options: ["alifanya", "anafanya", "atafanya", "amefanya"],
        },
        {
          clue: "kesho",
          sentence: "Kesho wanafunzi _______ mtihani.",
          answer: "watafanya",
          rule: "Kiambishi -ta- huonyesha wakati ujao.",
          options: ["walifanya", "wanafanya", "watafanya", "wamefanya"],
        },
        {
          clue: "tayari",
          sentence: "Wanafunzi _______ kazi yao.",
          answer: "wamefanya",
          rule: "Kiambishi -me- huonyesha tendo lililotimia.",
          options: ["walifanya", "wanafanya", "watafanya", "wamefanya"],
        },
      ];

      const selected = tenseCases[mode % tenseCases.length];

      return {
        q: `${selected.sentence}\nNi kitenzi gani kinachofaa zaidi?`,
        ans: selected.answer,
        hint: `Tazama kidokezo cha wakati katika sentensi. ${selected.rule}`,
        why: selected.rule,
        sol: selected.answer,
        steps: [
          `Hatua ya 1: Tambua kidokezo cha wakati (${selected.clue}).`,
          "Hatua ya 2: Chagua kiambishi cha wakati kinachofaa.",
          `Hatua ya 3: Unda kitenzi sahihi: "${selected.answer}".`,
        ],
        type: mode % 2 === 0 ? "mcq" : "open_response",
        options: mode % 2 === 0 ? makeMCQ(selected.answer, selected.options) : null,
      };
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
          positive: "Mwanafunzi anasoma kitabu.",
          negative: "Mwanafunzi hasomi kitabu.",
          rule:
            "Katika wakati uliopo, -na- hubadilishwa kwa muundo wa ukanushi wa wakati huo: ha-...-i.",
        },
        {
          positive: "Wanafunzi walifika shuleni.",
          negative: "Wanafunzi hawakufika shuleni.",
          rule:
            "Katika wakati uliopita, ukanushi wa walifika ni hawakufika.",
        },
        {
          positive: "Atafanya kazi kesho.",
          negative: "Hatafanya kazi kesho.",
          rule:
            "Katika wakati ujao, ukanushi hutumia ha- pamoja na -ta-: hatafanya.",
        },
        {
          positive: "Amefika shuleni.",
          negative: "Hajafika shuleni.",
          rule:
            "Wakati timilifu katika ukanushi hutumia ha-...-ja.",
        },
      ];

      const selected = cases[mode % cases.length];

      return {
        q:
          mode % 2 === 0
            ? `Kanusha sentensi hii:\n"${selected.positive}"`
            : `Ni sentensi ipi ni ukanushi sahihi wa:\n"${selected.positive}"`,
        ans: selected.negative,
        hint: selected.rule,
        why: selected.rule,
        sol: selected.negative,
        steps: [
          "Hatua ya 1: Tambua wakati wa kitenzi.",
          "Hatua ya 2: Tambua muundo wa ukanushi unaohitajika.",
          "Hatua ya 3: Rekebisha kiambishi cha kitenzi.",
          `Hatua ya 4: Jibu ni "${selected.negative}".`,
        ],
        type: mode % 2 === 0 ? "open_response" : "mcq",
        options:
          mode % 2 === 0
            ? null
            : makeMCQ(selected.negative, [
                selected.positive,
                "Mwanafunzi si anasoma kitabu.",
                "Mwanafunzi hanasoma kitabu.",
              ]),
      };
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
          base: "Mwalimu anafundisha wanafunzi.",
          passive: "Wanafunzi wanafundishwa na mwalimu.",
          voice: "Kauli ya kutendwa",
          rule:
            "Kiima cha sentensi ya kutenda huwa yambwa katika kauli ya kutendwa.",
        },
        {
          base: "Mama anampikia mtoto chakula.",
          transformed: "Mama anampikia mtoto chakula.",
          voice: "Kauli ya kutendea",
          rule:
            "Kiambishi -i- kinaweza kuonyesha kitendo kinachofanywa kwa ajili ya mtu au mahali.",
        },
        {
          base: "Mwalimu anafundisha wanafunzi.",
          transformed: "Mwalimu anawafundisha wanafunzi.",
          voice: "Kauli ya kutendesha",
          rule:
            "Kauli ya kutendesha huonyesha kusababisha mtu mwingine kufanya kitendo.",
        },
      ];

      const selected = voices[mode % voices.length];

      if (mode % 2 === 0 && selected.passive) {
        return {
          q: `Badilisha sentensi hii iwe katika kauli ya kutendwa:\n"${selected.base}"`,
          ans: selected.passive,
          hint: selected.rule,
          why: selected.rule,
          sol: selected.passive,
          steps: [
            "Hatua ya 1: Tambua mtenda na mtendwa.",
            "Hatua ya 2: Mgeuze mtendwa kuwa kiima.",
            "Hatua ya 3: Badilisha kitenzi kuwa kauli ya kutendwa.",
            `Hatua ya 4: Jibu: "${selected.passive}".`,
          ],
          type: "open_response",
          options: null,
        };
      }

      return {
        q: `Ni kauli gani ya kitenzi inaonyeshwa katika mfano huu?\n"${selected.base}"`,
        ans: selected.voice,
        hint: selected.rule,
        why: selected.rule,
        sol: selected.voice,
        steps: [
          "Hatua ya 1: Chunguza muundo wa kitenzi.",
          "Hatua ya 2: Tambua uhusiano kati ya mtenda na tendo.",
          "Hatua ya 3: Tambua kauli inayotumika.",
        ],
        type: "mcq",
        options: makeMCQ(selected.voice, [
          "Kauli ya kutenda",
          "Kauli ya kutendwa",
          "Kauli ya kutendea",
          "Kauli ya kutendeka",
        ]),
      };
    }

    /*
     * ============================================================
     * 5. VIAMBISHI VYA KITENZI
     * ============================================================
     */

    if (
      lower.includes("kiambishi") ||
      lower.includes("kitenzi") ||
      lower.includes("mofimu") ||
      lower.includes("mnyambuliko")
    ) {
      const verbs = [
        {
          word: "alimpigia",
          breakdown: "a-li-m-pig-i-a",
          subject: "a- = yeye",
          tense: "li- = wakati uliopita",
          object: "m- = yeye",
          root: "pig- = mzizi wa kitenzi",
          extension: "i- = kauli ya kutendea",
          ending: "a- = kiishio",
        },
        {
          word: "watakupenda",
          breakdown: "wa-ta-ku-pend-a",
          subject: "wa- = wao",
          tense: "ta- = wakati ujao",
          object: "ku- = wewe",
          root: "pend- = mzizi",
          extension: null,
          ending: "a- = kiishio",
        },
      ];

      const selected = verbs[mode % verbs.length];

      return {
        q: `Changanua kitenzi "${selected.word}" kwa kutaja viambishi vyake.`,
        ans: selected.breakdown,
        hint: `${selected.subject}; ${selected.tense}; ${selected.root}.`,
        why: `${selected.word} inaweza kugawanywa kama ${selected.breakdown}.`,
        sol: selected.breakdown,
        steps: [
          `Hatua ya 1: Tambua kiambishi cha nafsi: ${selected.subject}.`,
          `Hatua ya 2: Tambua kiambishi cha wakati: ${selected.tense}.`,
          selected.object
            ? `Hatua ya 3: Tambua kiambishi cha yambwa: ${selected.object}.`
            : "Hatua ya 3: Tambua mzizi wa kitenzi.",
          `Hatua ya 4: Tambua mzizi: ${selected.root}.`,
          `Hatua ya 5: Muundo mzima: ${selected.breakdown}.`,
        ],
        type: "open_response",
        options: null,
      };
    }

    /*
     * ============================================================
     * 6. AINA ZA MANENO
     * ============================================================
     */

    if (
      lower.includes("aina za maneno") ||
      lower.includes("nomino") ||
      lower.includes("kivumishi") ||
      lower.includes("kielezi") ||
      lower.includes("kiwakilishi") ||
      lower.includes("kitenzi") ||
      lower.includes("kihusishi") ||
      lower.includes("kiunganishi")
    ) {
      const items = [
        {
          sentence: "Mwanafunzi mwenye bidii alijibu swali vizuri.",
          word: "mwanafunzi",
          answer: "Nomino",
          reason: "Ni jina la mtu.",
          distractors: ["Kitenzi", "Kivumishi", "Kielezi"],
        },
        {
          sentence: "Mwanafunzi mwenye bidii alijibu swali vizuri.",
          word: "mwenye bidii",
          answer: "Kivumishi",
          reason: "Kinaeleza sifa ya mwanafunzi.",
          distractors: ["Nomino", "Kielezi", "Kitenzi"],
        },
        {
          sentence: "Mwanafunzi mwenye bidii alijibu swali vizuri.",
          word: "alijibu",
          answer: "Kitenzi",
          reason: "Kinaonyesha kitendo kilichofanywa.",
          distractors: ["Nomino", "Kivumishi", "Kielezi"],
        },
        {
          sentence: "Mwanafunzi alijibu swali kwa uangalifu.",
          word: "kwa uangalifu",
          answer: "Kielezi cha namna",
          reason: "Kinaeleza jinsi kitendo kilivyofanyika.",
          distractors: [
            "Nomino",
            "Kivumishi",
            "Kiunganishi",
          ],
        },
        {
          sentence: "Alienda shuleni kwa sababu alikuwa na mtihani.",
          word: "kwa sababu",
          answer: "Kiunganishi",
          reason: "Huunganisha mawazo na kuonyesha sababu.",
          distractors: [
            "Kivumishi",
            "Nomino",
            "Kielezi cha mahali",
          ],
        },
        {
          sentence: "Kitabu kiko juu ya meza.",
          word: "juu ya",
          answer: "Kihusishi",
          reason: "Huonyesha uhusiano wa mahali kati ya vitu.",
          distractors: [
            "Kitenzi",
            "Kivumishi",
            "Kiunganishi",
          ],
        },
      ];

      const selected = items[mode % items.length];

      return {
        q: `Katika sentensi:\n"${selected.sentence}"\nNeno/kifungu "${selected.word}" ni aina gani ya neno?`,
        ans: selected.answer,
        hint: selected.reason,
        why: `"${selected.word}" ni ${selected.answer.toLowerCase()} kwa sababu ${selected.reason.toLowerCase()}`,
        sol: selected.answer,
        steps: [
          `Hatua ya 1: Tambua neno "${selected.word}".`,
          "Hatua ya 2: Angalia kazi yake katika sentensi.",
          "Hatua ya 3: Tambua aina ya neno.",
          `Hatua ya 4: Jibu: ${selected.answer}.`,
        ],
        type: "mcq",
        options: makeMCQ(selected.answer, selected.distractors),
      };
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
          proverb: "Haraka haraka haina baraka.",
          answer:
            "Kufanya mambo kwa pupa kunaweza kusababisha makosa na matokeo mabaya.",
          distractors: [
            "Mtu anayefanya kazi haraka hupata mali nyingi.",
            "Mambo yote yanapaswa kufanywa bila kufikiri.",
            "Baraka hupatikana kwa kukimbia.",
          ],
        },
        {
          proverb: "Haba na haba hujaza kibaba.",
          answer:
            "Mambo madogo madogo yakikusanywa kwa muda huleta mafanikio makubwa.",
          distractors: [
            "Kila jambo lazima lifanywe mara moja.",
            "Mali nyingi hupatikana bila juhudi.",
            "Kibaba ni chombo cha kuhifadhia maji.",
          ],
        },
        {
          proverb: "Asiyefunzwa na mamae hufunzwa na ulimwengu.",
          answer:
            "Mtu asipopata malezi na mafunzo, maisha yanaweza kumfundisha kwa njia ngumu.",
          distractors: [
            "Mama ndiye pekee anayefundisha mtoto.",
            "Mtu hapaswi kujifunza kutoka kwa wengine.",
            "Elimu hupatikana shuleni pekee.",
          ],
        },
      ];

      const selected = proverbs[mode % proverbs.length];

      return {
        q: `Methali "${selected.proverb}" ina maana gani?`,
        ans: selected.answer,
        hint: "Usichukue maana ya maneno moja kwa moja; tafuta ujumbe unaofichwa.",
        why: selected.answer,
        sol: selected.answer,
        steps: [
          "Hatua ya 1: Soma methali kwa makini.",
          "Hatua ya 2: Epuka maana ya moja kwa moja.",
          "Hatua ya 3: Tambua ujumbe au funzo lake.",
          `Hatua ya 4: Maana yake ni: ${selected.answer}`,
        ],
        type: "mcq",
        options: makeMCQ(selected.answer, selected.distractors),
      };
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
          idiom: "Kupiga moyo konde",
          answer: "Kujipa moyo na kuwa jasiri.",
          distractors: [
            "Kupiga mtu kifuani.",
            "Kuwa na ugonjwa wa moyo.",
            "Kukimbia kutoka mahali.",
          ],
        },
        {
          idiom: "Kula chumvi nyingi",
          answer: "Kuwa na umri mkubwa au uzoefu mwingi.",
          distractors: [
            "Kula chakula chenye chumvi nyingi.",
            "Kupenda vyakula vya chumvi.",
            "Kuwa na kiu kila wakati.",
          ],
        },
        {
          idiom: "Kushika hatamu",
          answer: "Kuchukua uongozi au mamlaka.",
          distractors: [
            "Kushika kamba ya farasi.",
            "Kukimbia mbio.",
            "Kufanya kazi shambani.",
          ],
        },
      ];

      const selected = idioms[mode % idioms.length];

      return {
        q: `Nahau "${selected.idiom}" ina maana gani?`,
        ans: selected.answer,
        hint: "Nahau huwa na maana ya kimafumbo, si maana yake ya moja kwa moja.",
        why: selected.answer,
        sol: selected.answer,
        steps: [
          "Hatua ya 1: Tambua kuwa ni nahau.",
          "Hatua ya 2: Epuka kutafsiri maneno moja kwa moja.",
          "Hatua ya 3: Tafuta maana ya kimafumbo.",
        ],
        type: "mcq",
        options: makeMCQ(selected.answer, selected.distractors),
      };
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
      ];

      const selected = vocabulary[mode % vocabulary.length];

      const asksAntonym =
        lower.includes("kinyume") || mode % 2 === 1;

      const answer = asksAntonym
        ? selected.antonym
        : selected.synonym;

      return {
        q: asksAntonym
          ? `Neno "${selected.word}" lina kinyume kipi?`
          : `Neno "${selected.word}" lina kisawe kipi?`,
        ans: answer,
        hint: asksAntonym
          ? "Tafuta neno lenye maana iliyo kinyume kabisa."
          : "Tafuta neno lenye maana inayokaribiana.",
        why: `"${answer}" ni ${
          asksAntonym ? "kinyume" : "kisawe"
        } cha "${selected.word}".`,
        sol: answer,
        steps: [
          `Hatua ya 1: Tambua maana ya "${selected.word}".`,
          asksAntonym
            ? "Hatua ya 2: Tafuta maana inayopingana nayo."
            : "Hatua ya 2: Tafuta maana inayokaribiana nayo.",
          `Hatua ya 3: Jibu ni "${answer}".`,
        ],
        type: "mcq",
        options: makeMCQ(answer, [
          asksAntonym ? selected.synonym : selected.antonym,
          "mvivu",
          "mkubwa",
        ]),
      };
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
          sentence: "Mwanafunzi anasoma kitabu.",
          subject: "Mwanafunzi",
          predicate: "anasoma kitabu",
          structure: "Kiima + Kiarifu",
        },
        {
          sentence: "Wakulima wanapanda mahindi shambani.",
          subject: "Wakulima",
          predicate: "wanapanda mahindi shambani",
          structure: "Kiima + Kiarifu",
        },
      ];

      const selected = examples[mode % examples.length];

      return {
        q: `Changanua sentensi hii kwa kutambua Kiima na Kiarifu:\n"${selected.sentence}"`,
        ans: `Kiima: ${selected.subject}; Kiarifu: ${selected.predicate}`,
        hint: "Kiima ni anayefanya au anayehusishwa na tendo; kiarifu hueleza jambo kuhusu kiima.",
        why: `Kiima ni "${selected.subject}" na kiarifu ni "${selected.predicate}".`,
        sol: `Kiima: ${selected.subject}; Kiarifu: ${selected.predicate}`,
        steps: [
          "Hatua ya 1: Tafuta anayefanya tendo au anayezungumziwa.",
          `Hatua ya 2: Kiima ni "${selected.subject}".`,
          `Hatua ya 3: Sehemu inayobaki ni kiarifu: "${selected.predicate}".`,
        ],
        type: "open_response",
        options: null,
      };
    }

    /*
     * ============================================================
     * 11. REVERSE DIAGNOSTIC
     *
     * Turn an existing answer into a question about the rule.
     * ============================================================
     */

    if (rawAns.length > 3) {
      return {
        q: `[Uchunguzi wa Kiswahili]\nKuhusu swali hili:\n"${stem}"\n\nNi kanuni gani ya Kiswahili inayothibitisha jibu hili?`,
        ans: rawAns,
        hint:
          qObj.hint ||
          "Chunguza ngeli, muundo wa sentensi, mnyambuliko wa kitenzi au matumizi ya msamiati.",
        why:
          qObj.why ||
          `Kanuni inayohusiana na jibu ni: ${rawAns}.`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Hatua ya 1: Soma sentensi au swali kwa makini.",
          "Hatua ya 2: Tambua dhana ya sarufi au msamiati inayohusika.",
          "Hatua ya 3: Tumia kanuni hiyo kuthibitisha jibu.",
          "Hatua ya 4: Linganisha jibu na kanuni.",
        ],
        type: "mcq",
        options: makeMCQ(rawAns, [
          "Upatanisho wa ngeli",
          "Mnyambuliko wa vitenzi",
          "Matumizi ya vihusishi",
        ]),
      };
    }

    /*
     * ============================================================
     * 12. SAFE FALLBACK
     * ============================================================
     */

    return {
      ...qObj,

      q: `[Uchunguzi wa Kiswahili] ${stem}`,

      hint:
        qObj.hint ||
        "Tambua dhana inayopimwa, tumia kanuni husika, kisha thibitisha jibu.",

      why:
        qObj.why ||
        "Jibu linapaswa kuthibitishwa kwa kutumia kanuni ya Kiswahili inayohusika.",

      sol:
        qObj.sol || rawAns || "Tumia kanuni husika ya Kiswahili.",

      steps: [
        "Hatua ya 1: Tambua dhana inayopimwa.",
        "Hatua ya 2: Tambua kanuni ya Kiswahili inayohusika.",
        "Hatua ya 3: Tumia kanuni hiyo kwenye swali.",
        "Hatua ya 4: Thibitisha jibu.",
      ],
    };
  }
}