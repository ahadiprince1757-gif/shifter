/**
 * Biology & Life Sciences Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Real-World Scenario / Experiment Case Study
 * - Mode 2: Multiple Choice Discrimination Challenge
 * - Mode 3: Cloze Concept Completion
 * - Mode 4: Organelle & Biological System Swap
 */

const ORGANELLE_DATA = [
  {
    name: "Mitochondria",
    function: "cellular respiration and ATP energy production",
    scenario: "A muscular cell requires high amounts of energy to contract during exercise. Which organelle will be found in abnormally high numbers in this cell?",
    distractors: ["Chloroplast", "Ribosome", "Golgi Apparatus"],
    hint: "Think about the energy powerhouse of the cell",
    why: "Mitochondria carry out aerobic respiration, producing ATP needed for muscular work."
  },
  {
    name: "Chloroplast",
    function: "photosynthesis and converting sunlight into glucose",
    scenario: "A scientist isolates green plant leaves and exposes them to sunlight and carbon dioxide. Which organelle is responsible for synthesizing sugars in these leaf cells?",
    distractors: ["Mitochondria", "Nucleus", "Vacuole"],
    hint: "Contains green chlorophyll pigment",
    why: "Chloroplasts contain chlorophyll which absorbs solar energy to synthesize glucose."
  },
  {
    name: "Ribosome",
    function: "protein synthesis by translating mRNA instructions",
    scenario: "A pancreatic cell actively secretes digestive enzymes (which are proteins). Which organelle is primarily responsible for manufacturing these protein enzymes?",
    distractors: ["Lysosome", "Centriole", "Mitochondria"],
    hint: "Site of protein assembly",
    why: "Ribosomes translate messenger RNA into polypeptide chains to build functional proteins."
  },
  {
    name: "Cell Membrane",
    function: "selective permeability and controlling transport of materials",
    scenario: "A cell absorbs necessary glucose while blocking harmful toxins from entering its cytoplasm. Which structure regulates this selective passage?",
    distractors: ["Cell Wall", "Cytoplasm", "Endoplasmic Reticulum"],
    hint: "Phospholipid bilayer boundary",
    why: "The selectively permeable cell membrane controls which substances enter or exit the cell."
  }
];

const EXPERIMENTS = [
  {
    topic: "osmosis",
    scenario: "A student places a plant cell into a hypertonic (concentrated salt) solution. What will happen to the water inside the cell?",
    ans: "Water moves out of the cell by osmosis causing plasmolysis",
    options: [
      "Water moves out of the cell by osmosis causing plasmolysis",
      "Water enters the cell causing it to burst",
      "No water movement occurs",
      "Salt enters the cell by active transport"
    ],
    hint: "Water moves from low solute to high solute concentration",
    why: "In a hypertonic solution, water leaves the cell down the water potential gradient."
  },
  {
    topic: "enzymes",
    scenario: "An enzyme-catalyzed reaction is heated to 80°C (far above optimum temperature). Why does the reaction rate drop to zero?",
    ans: "The enzyme active site is denatured by high heat",
    options: [
      "The enzyme active site is denatured by high heat",
      "Substrate molecules are destroyed",
      "The enzyme is consumed in the reaction",
      "The reaction becomes too fast to measure"
    ],
    hint: "High temperatures permanently alter 3D protein structure",
    why: "Excess heat breaks hydrogen bonds, denaturing the enzyme's active site."
  }
];

export class BiologyMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();
    const mode = Math.floor(Math.random() * 4); // Randomize pedagogical mode

    // 1. Organelle / Cell Structure Match
    const organelleMatch = ORGANELLE_DATA.find(o => stem.includes(o.name.toLowerCase()) || stem.includes("organelle") || stem.includes("cell"));
    if (organelleMatch) {
      if (mode === 0) {
        // Real-World Scenario
        return {
          q: organelleMatch.scenario,
          ans: organelleMatch.name,
          hint: organelleMatch.hint,
          why: organelleMatch.why,
          sol: organelleMatch.why,
          steps: ["Step 1: Identify cellular requirement in scenario", "Step 2: Relate function to organelle", "Step 3: State organelle name"],
          type: "mcq",
          options: this._shuffle([organelleMatch.name, ...organelleMatch.distractors])
        };
      } else if (mode === 1) {
        // Function to Organelle
        return {
          q: `What is the primary biological function of the ${organelleMatch.name} in eukaryotic cells?`,
          ans: organelleMatch.function,
          hint: organelleMatch.hint,
          why: organelleMatch.why,
          sol: organelleMatch.why,
          steps: ["Step 1: Identify organelle structure", "Step 2: Recall biochemical role", "Step 3: State main function"]
        };
      }
    }

    // 2. Experiment / Osmosis / Enzyme Match
    const expMatch = EXPERIMENTS.find(e => stem.includes(e.topic));
    if (expMatch) {
      return {
        q: expMatch.scenario,
        ans: expMatch.ans,
        hint: expMatch.hint,
        why: expMatch.why,
        sol: expMatch.why,
        steps: ["Step 1: Analyze experimental setup", "Step 2: Apply biological principle", "Step 3: Predict outcome"],
        type: "mcq",
        options: expMatch.options
      };
    }

    // 3. Cloze Concept Completion Mode
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 6) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Missing biological term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Complete concept: ${qObj.ans}`,
          sol: qObj.why || `Complete concept: ${qObj.ans}`,
          steps: ["Step 1: Read statement context", "Step 2: Identify missing biological term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 4. Default Application Scaffold Mode
    return {
      q: `[Application Check] Regarding ${qObj.q || qObj.stem}: What is the core biological principle involved?`,
      ans: qObj.ans,
      hint: qObj.hint || "Focus on fundamental biological mechanism",
      why: qObj.why || qObj.ans,
      sol: qObj.why || qObj.ans,
      steps: ["Step 1: Identify biological principle", "Step 2: Apply to question scenario", "Step 3: Formulate answer"]
    };
  }

  _shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
