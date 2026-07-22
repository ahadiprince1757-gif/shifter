/**
 * Kiswahili Language Subject Mutator
 * Handles sarufi (grammar), msamiati (vocabulary), and ufahamu (comprehension).
 */

const KISW_TEMPLATES = [
  {
    keywords: ["nomino", "kitenzi", "kivumishi", "kielezi", "aina", "neno", "sehemu"],
    gen: () => {
      const parts = [
        { word: "haraka", pos: "Kielezi (Adverb)", why: "Kinaelezea jinsi kitendo kinavyofanyika." },
        { word: "mzuri", pos: "Kivumishi (Adjective)", why: "Kinaelezea sifa ya nomino." },
        { word: "mwalimu", pos: "Nomino (Noun)", why: "Ni jina la mtu, kitu, au mahali." },
        { word: "anasoma", pos: "Kitenzi (Verb)", why: "Kinaonyesha kitendo kinachofanyika." },
        { word: "ndani", pos: "Kihusishi (Preposition)", why: "Kinaonyesha uhusiano wa mahali." }
      ];
      const p = parts[Math.floor(Math.random() * parts.length)];

      return {
        q: `Tambua aina ya neno hili: "${p.word}"`,
        ans: p.pos,
        hint: p.why,
        why: `"${p.word}" ni ${p.pos}. ${p.why}`,
        sol: `"${p.word}" ni ${p.pos}. ${p.why}`,
        steps: ["Hatua ya 1: Soma neno", "Hatua ya 2: Tambua kazi yake katika sentensi", "Hatua ya 3: Ainisha aina ya neno"]
      };
    }
  },
  {
    keywords: ["wingi", "umoja", "ngeli", "nomino"],
    gen: () => {
      const pairs = [
        { umoja: "mtoto", wingi: "watoto", ngeli: "M-WA" },
        { umoja: "mti", wingi: "miti", ngeli: "M-MI" },
        { umoja: "kiti", wingi: "viti", ngeli: "KI-VI" },
        { umoja: "nyumba", wingi: "nyumba", ngeli: "N-N" },
        { umoja: "ukuta", wingi: "kuta", ngeli: "U-N" }
      ];
      const p = pairs[Math.floor(Math.random() * pairs.length)];
      const askWingi = Math.random() > 0.5;

      return askWingi ? {
        q: `Andika wingi wa neno hili: "${p.umoja}"`,
        ans: p.wingi,
        hint: `Ngeli ya ${p.ngeli}`,
        why: `Umoja: ${p.umoja} → Wingi: ${p.wingi} (Ngeli ya ${p.ngeli}).`,
        sol: `Umoja: ${p.umoja} → Wingi: ${p.wingi} (Ngeli ya ${p.ngeli}).`,
        steps: ["Hatua ya 1: Tambua ngeli ya neno", "Hatua ya 2: Badilisha kiambishi awali", "Hatua ya 3: Andika wingi"]
      } : {
        q: `Andika umoja wa neno hili: "${p.wingi}"`,
        ans: p.umoja,
        hint: `Ngeli ya ${p.ngeli}`,
        why: `Wingi: ${p.wingi} → Umoja: ${p.umoja} (Ngeli ya ${p.ngeli}).`,
        sol: `Wingi: ${p.wingi} → Umoja: ${p.umoja} (Ngeli ya ${p.ngeli}).`,
        steps: ["Hatua ya 1: Tambua ngeli ya neno", "Hatua ya 2: Badilisha kiambishi awali", "Hatua ya 3: Andika umoja"]
      };
    }
  }
];

export class KiswahiliMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of KISW_TEMPLATES) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    // Cloze fallback
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const idx = Math.floor(words.length / 2);
        const target = words[idx];
        const masked = [...words];
        masked[idx] = "________";
        return {
          q: `Kamilisha: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Neno linaanza na '${target.charAt(0).toUpperCase()}'`,
          why: `Jibu kamili: ${qObj.ans}`,
          sol: qObj.why || qObj.ans,
          steps: ["Hatua ya 1: Soma sentensi", "Hatua ya 2: Tambua neno linalokosekana", "Hatua ya 3: Jaza pengo"]
        };
      }
    }

    return {
      ...qObj,
      q: `[KISWAHILI JARIBIO] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Tumia kanuni za sarufi",
      steps: ["Hatua ya 1: Tambua dhana", "Hatua ya 2: Tumia kanuni", "Hatua ya 3: Toa jibu"]
    };
  }
}
