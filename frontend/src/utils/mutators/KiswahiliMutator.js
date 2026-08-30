/**
 * Kiswahili Language Subject Mutator
 * Injini ya Kiswahili na Sarufi:
 * - Mutates Ngeli na Upatanisho wa Kisarufi (Umoja ↔ Wingi).
 * - Aina za Maneno (Nomino, Vivumishi, Vielezi, Vitenzi).
 * - Methali, Nahau na Msamiati wa Kiswahili.
 * - Hutoa maswali yenye uchaguzi wa majibu 4 (MCQ) na hatua kwa hatua za sarufi.
 */

export class KiswahiliMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    const mode = (typeof modalityIndex === "number" ? modalityIndex : Math.floor(Math.random() * 4)) % 4;

    // 1. Ngeli na Upatanisho wa Kisarufi (Umoja na Wingi)
    if (lower.includes("wingi") || lower.includes("umoja") || lower.includes("ngeli") || lower.includes("sentensi") || lower.includes("kisarufi")) {
      const cases = [
        {
          umoja: "Mwanafunzi mtiifu anasoma kitabu kizuri.",
          wingi: "Wanafunzi watiifu wanasoma vitabu vizuri.",
          distractors: [
            "Mwanafunzi watiifu wanasoma vitabu vizuri.",
            "Wanafunzi mtiifu anasoma kitabu kizuri.",
            "Wanafunzi watiifu wanasoma kitabu vizuri."
          ],
          hint: "Ngeli ya A-WA (mtu): mwanafunzi ➔ wanafunzi; Ngeli ya KI-VI (kitu): kitabu ➔ vitabu."
        },
        {
          umoja: "Mti mrefu umeanguka njiani.",
          wingi: "Miti mirefu imeanguka njiani.",
          distractors: [
            "Miti mrefu umeanguka njiani.",
            "Miti mirefu imeanguka njiani.",
            "Mti mirefu imeanguka njiani."
          ],
          hint: "Ngeli ya M-MI: mti (u-) ➔ miti (i-); mrefu ➔ mirefu."
        },
        {
          umoja: "Jicho lake limevimba sana.",
          wingi: "Macho yao yamevimba sana.",
          distractors: [
            "Majicho yao yamevimba sana.",
            "Macho lake limevimba sana.",
            "Jicho yao yamevimba sana."
          ],
          hint: "Ngeli ya LI-YA: jicho (li-) ➔ macho (ya-)."
        }
      ];
      const selected = cases[mode % cases.length];
      const ansStr = selected.wingi;

      if (mode === 0) {
        return {
          q: `Andika sentensi hii katika wingi:\n"${selected.umoja}"`,
          ans: ansStr,
          hint: selected.hint,
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      } else if (mode === 1) {
        return {
          q: `Teua sentensi iliyoandikwa vizuri katika WINGI:\n"${selected.umoja}"`,
          ans: ansStr,
          hint: selected.hint,
          sol: ansStr,
          type: "mcq",
          options: [ansStr, ...selected.distractors],
        };
      } else if (mode === 2) {
        const wrongSentence = selected.distractors[0];
        return {
          q: `Sahihisha kosa la upatanisho wa kisarufi katika sentensi hii:\n"${wrongSentence}"`,
          ans: `Sentensi sahihi ni: "${ansStr}".`,
          hint: selected.hint,
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      } else {
        return {
          q: `Taja ngeli za nomino zilizotumika katika sentensi hii na uandike wingi wake:\n"${selected.umoja}"`,
          ans: `Ngeli na Wingi: ${selected.hint}. Sentensi katika wingi: "${ansStr}".`,
          hint: selected.hint,
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      }
    }

    // 2. Aina za Maneno (Nomino, Kivumishi, Kielezi, Kitenzi)
    if (lower.includes("nomino") || lower.includes("kitenzi") || lower.includes("kivumishi") || lower.includes("kielezi") || lower.includes("aina za maneno")) {
      const items = [
        {
          sentence: "Mwalimu alifafanua somo kwa makini sana.",
          word: "kwa makini",
          ans: "Kielezi cha namna (kinaeleza jinsi mwalimu alivyofafanua)",
          options: [
            "Kielezi cha namna (kinaeleza jinsi mwalimu alivyofafanua)",
            "Kivumishi cha sifa (kinatambua nomino)",
            "Nomino ya pekee",
            "Kiunganishi cha sentensi"
          ],
          hint: "'kwa makini' kinaeleza jinsi kitendo cha kufafanua kilivyotendeka."
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];

      return {
        q: `[Aina za Maneno] Katika sentensi: "${selected.sentence}"\nNeno/Kifungu kilichopigiwa mstari "${selected.word}" ni aina gani ya neno?`,
        ans: selected.ans,
        hint: selected.hint,
        why: `"${selected.word}" inatumika kama ${selected.ans}.`,
        sol: selected.ans,
        steps: [
          `Hatua ya 1: Tambua neno lililotajwa ("${selected.word}") katika sentensi`,
          "Hatua ya 2: Uchanganue kazi yake katika muundo wa sentensi",
          "Hatua ya 3: Teua aina sahihi ya neno"
        ],
        type: "mcq",
        options: selected.options
      };
    }

    // 3. Reverse Inquiry kwa Kiswahili
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Uchunguzi wa Sarufi na Msamiati] Kuhusu: "${stem}"\nNi kanuni gani sahihi ya Kisarufi au Msamiati inayotumika hapa?`,
        ans: rawAns,
        hint: qObj.hint || "Zingatia kanuni za sarufi, ngeli, na muundo wa Kiswahili.",
        why: qObj.why || `Kanuni sahihi: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Hatua ya 1: Soma na uchanganue muundo wa sentensi",
          "Hatua ya 2: Tumia kanuni sahihi ya sarufi na ngeli",
          "Hatua ya 3: Toa jibu sahihi"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Upatanisho wa ngeli katika viambishi rejeshi",
          "Mnyambuliko wa vitenzi katika kauli ya kutendeka",
          "Matumizi ya vihusishi vya mahali"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Uchunguzi wa Sarufi] ${stem}`,
      hint: qObj.hint || "Zingatia kanuni za ngeli na sarufi.",
      steps: [
        "Hatua ya 1: Tambua dhana ya lugha",
        "Hatua ya 2: Tumia kanuni ya ngeli",
        "Hatua ya 3: Toa jibu sahihi"
      ]
    };
  }
}
