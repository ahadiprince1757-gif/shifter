/**
 * Kiswahili Language Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Sarufi Context & Ngeli Scenario
 * - Mode 2: Aina za Maneno Discrimination
 * - Mode 3: Umoja / Wingi Transformation
 * - Mode 4: Cloze Msamiati Check
 */

const KISW_SCENARIOS = [
  {
    keywords: ["wingi", "umoja", "ngeli", "nomino", "sentensi"],
    gen: () => {
      const cases = [
        { umoja: "Mtoto mtiifu anasoma kitabu.", wingi: "Watoto watiifu wanasoma vitabu.", ngeli: "M-WA / KI-VI", hint: "mtoto ➔ watoto, kitabu ➔ vitabu" },
        { umoja: "Mti mrefu umeanguka njiani.", wingi: "Miti mirefu imeanguka njiani.", ngeli: "M-MI", hint: "mti ➔ miti, umeanguka ➔ imeanguka" },
        { umoja: "Kiti kile kimevunjika.", wingi: "Viti vile vimevunjika.", ngeli: "KI-VI", hint: "kiti ➔ viti, kile ➔ vile" }
      ];
      const selected = cases[Math.floor(Math.random() * cases.length)];
      const askWingi = Math.random() > 0.5;

      return askWingi ? {
        q: `[Sentensi na Wingi] Badilisha sentensi hii katika wingi:\n"${selected.umoja}"`,
        ans: selected.wingi,
        hint: selected.hint,
        why: `Umoja: "${selected.umoja}" ➔ Wingi: "${selected.wingi}".`,
        sol: `Umoja: "${selected.umoja}" ➔ Wingi: "${selected.wingi}".`,
        steps: ["Hatua ya 1: Tambua ngeli ya nomino", "Hatua ya 2: Badilisha viambishi vya ngeli", "Hatua ya 3: Andika sentensi katika wingi"]
      } : {
        q: `[Sentensi na Umoja] Badilisha sentensi hii katika umoja:\n"${selected.wingi}"`,
        ans: selected.umoja,
        hint: selected.hint,
        why: `Wingi: "${selected.wingi}" ➔ Umoja: "${selected.umoja}".`,
        sol: `Wingi: "${selected.wingi}" ➔ Umoja: "${selected.umoja}".`,
        steps: ["Hatua ya 1: Tambua ngeli ya nomino", "Hatua ya 2: Badilisha viambishi vya ngeli", "Hatua ya 3: Andika sentensi katika umoja"]
      };
    }
  }
];

export class KiswahiliMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Scenario Match
    const match = KISW_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Ufahamu na Msamiati] Kamilisha pengo: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Neno linaanza na '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Jibu kamili: ${qObj.ans}`,
          sol: qObj.why || `Jibu kamili: ${qObj.ans}`,
          steps: ["Hatua ya 1: Soma sentensi", "Hatua ya 2: Tambua neno linalokosekana", "Hatua ya 3: Jaza pengo"]
        };
      }
    }

    // 3. Fallback
    return {
      ...qObj,
      q: `[Jaribio la Sarufi] Kuhusu "${qObj.q || qObj.stem}": Ni kanuni gani ya Kiswahili inayotumika hapa?`,
      hint: qObj.hint || "Tumia kanuni za ngeli na sarufi",
      steps: ["Hatua ya 1: Tambua dhana ya lugha", "Hatua ya 2: Tumia kanuni ya ngeli", "Hatua ya 3: Toa jibu sahihi"]
    };
  }
}
