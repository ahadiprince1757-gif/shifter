/**
 * Biology & Life Sciences Subject Mutator
 * Simplifies complex concepts, handles organelle/system swaps,
 * and scaffolds multi-item questions into guided retries.
 */

const ORGANELLE_POOL = [
  {
    organelle: "Mitochondria",
    function: "producing ATP energy through cellular respiration",
    hint: "Powerhouse of the cell",
    why: "Mitochondria convert nutrients into usable chemical energy (ATP).",
    steps: ["Step 1: Identify energy organelle", "Step 2: Link to cellular respiration", "Step 3: State ATP production"]
  },
  {
    organelle: "Chloroplast",
    function: "converting sunlight into chemical energy via photosynthesis",
    hint: "Contains chlorophyll",
    why: "Chloroplasts trap light energy to produce glucose in plant cells.",
    steps: ["Step 1: Identify plant organelle", "Step 2: Link to sunlight absorption", "Step 3: State photosynthesis"]
  },
  {
    organelle: "Ribosome",
    function: "synthesizing proteins using mRNA instructions",
    hint: "Protein factory",
    why: "Ribosomes translate genetic instructions to build proteins.",
    steps: ["Step 1: Identify protein machinery", "Step 2: Link to translation", "Step 3: State protein synthesis"]
  },
  {
    organelle: "Nucleus",
    function: "controlling cell activities and storing genetic material (DNA)",
    hint: "Control center",
    why: "The nucleus holds chromosomes and regulates gene expression.",
    steps: ["Step 1: Identify control center", "Step 2: Link to DNA storage", "Step 3: State cellular regulation"]
  },
  {
    organelle: "Cell Membrane",
    function: "regulating the movement of substances in and out of the cell",
    hint: "Selectively permeable barrier",
    why: "The cell membrane maintains internal cell balance by selective transport.",
    steps: ["Step 1: Identify cell boundary", "Step 2: Link to selective permeability", "Step 3: State transport regulation"]
  }
];

export class BiologyMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = qObj.q || qObj.stem || "";
    const lowerStem = stem.toLowerCase();

    // 1. Organelle / Cell Structure Swap Strategy
    if (lowerStem.includes("organelle") || lowerStem.includes("cell") || ORGANELLE_POOL.some(o => lowerStem.includes(o.organelle.toLowerCase()))) {
      const selected = ORGANELLE_POOL[Math.floor(Math.random() * ORGANELLE_POOL.length)];
      const isFunctionQ = Math.random() > 0.5;

      if (isFunctionQ) {
        return {
          q: `Which cell organelle is primarily responsible for ${selected.function}?`,
          ans: selected.organelle,
          hint: selected.hint,
          why: selected.why,
          sol: selected.why,
          steps: selected.steps,
          type: "mcq",
          options: this._shuffleOptions(selected.organelle, ["Mitochondria", "Chloroplast", "Ribosome", "Nucleus", "Endoplasmic Reticulum"])
        };
      } else {
        return {
          q: `State the primary function of the ${selected.organelle} in a cell.`,
          ans: selected.function,
          hint: selected.hint,
          why: selected.why,
          sol: selected.why,
          steps: selected.steps
        };
      }
    }

    // 2. Osmosis / Diffusion Simplification Strategy
    if (lowerStem.includes("osmosis") || lowerStem.includes("diffusion") || lowerStem.includes("transport")) {
      const isOsmosis = lowerStem.includes("osmosis");
      return {
        q: isOsmosis
          ? "In biological systems, osmosis specifically refers to the movement of which substance across a semi-permeable membrane?"
          : "What is the net movement of particles from a region of higher concentration to lower concentration called?",
        ans: isOsmosis ? "Water (or solvent molecules)" : "Diffusion",
        hint: isOsmosis ? "Think about liquid solvent" : "Passive transport process",
        why: isOsmosis
          ? "Osmosis is the specialized passive movement of water molecules across a selectively permeable membrane."
          : "Diffusion occurs down a concentration gradient without requiring cellular energy.",
        sol: isOsmosis
          ? "Osmosis is the specialized passive movement of water molecules across a selectively permeable membrane."
          : "Diffusion occurs down a concentration gradient without requiring cellular energy.",
        steps: isOsmosis
          ? ["Step 1: Identify solvent (water)", "Step 2: Note concentration gradient", "Step 3: Require semi-permeable membrane"]
          : ["Step 1: Identify high vs low concentration", "Step 2: Recognize passive movement", "Step 3: State diffusion definition"]
      };
    }

    // 3. Multi-Item Request Reduction (e.g., "Give 10 functions...")
    const numberMatch = stem.match(/(?:give|state|list|name)\s+(\d+)/i);
    if (numberMatch && qObj.ans && Array.isArray(qObj.ans)) {
      const singleItem = qObj.ans[Math.floor(Math.random() * qObj.ans.length)];
      return {
        q: stem.replace(numberMatch[0], "State 1 key function/characteristic of"),
        ans: singleItem,
        hint: qObj.hint || "Focus on one primary function",
        why: qObj.why || `One essential aspect is: ${singleItem}`,
        sol: qObj.explain || qObj.why || singleItem,
        steps: ["Step 1: Identify key requirement", "Step 2: Focus on one valid function", "Step 3: State clearly"]
      };
    }

    // 4. Cloze / Fill-in-the-Blank Scaffold Strategy
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const maskedAns = [...words];
        maskedAns[maskedIdx] = "________";

        return {
          q: `Complete the key biological concept: "${maskedAns.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Missing term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.explain || qObj.why || `Full concept: ${qObj.ans}`,
          steps: ["Step 1: Read incomplete statement", "Step 2: Identify missing key biological term", "Step 3: Provide missing word"]
        };
      }
    }

    // Fallback: Scaffolded stem with hint
    return {
      ...qObj,
      q: `[SIMPLIFIED RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Focus on core principles",
      steps: qObj.steps || ["Step 1: Review question context", "Step 2: Apply core principles", "Step 3: State final answer"]
    };
  }

  _shuffleOptions(correctOpt, pool) {
    const distractors = pool.filter(p => p !== correctOpt).slice(0, 3);
    const opts = [correctOpt, ...distractors];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }
}
