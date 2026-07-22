// Sample Blueprints spanning Math, Physics, Biology, Chemistry, and Economics

export const sampleBlueprints = [
  // 1. MATHEMATICS / PHYSICS (Formula & Range Mutation)
  {
    id: "math_001",
    subject: "Physics",
    topic: "Kinematics",
    stem: "A vehicle accelerates from rest at a rate of {{a}} m/s² for {{t}} seconds. Calculate the total distance traveled.",
    variables: {
      a: { type: "NUMBER", min: 2, max: 12, step: 0.5 },
      t: { type: "NUMBER", min: 3, max: 20, step: 1 },
      // d = 0.5 * a * t^2
      correctDist: { type: "FORMULA", expression: "0.5 * a * Math.pow(t, 2)" },
      distractor1: { type: "FORMULA", expression: "a * t" }, // Common misconception (velocity instead of distance)
      distractor2: { type: "FORMULA", expression: "a * Math.pow(t, 2)" }, // Forgot 0.5 factor
      distractor3: { type: "FORMULA", expression: "0.5 * a * t" }
    },
    options: [
      { formula: "correctDist + ' m'" },
      { formula: "distractor1 + ' m'" },
      { formula: "distractor2 + ' m'" },
      { formula: "distractor3 + ' m'" }
    ],
    correctIndex: 0,
    explanation: "Using d = ½at², with a = {{a}} and t = {{t}}, distance = 0.5 × {{a}} × {{t}}² = {{correctDist}} m."
  },

  // 2. BIOLOGY / LIFE SCIENCES (Entity & Concept Swap)
  {
    id: "bio_002",
    subject: "Biology",
    topic: "Cellular Biology",
    stem: "Which organelle is primarily responsible for {{function}} in {{organismType}} cells?",
    variables: {
      scenario: {
        type: "SELECT",
        choices: [
          { function: "producing ATP energy through cellular respiration", organismType: "eukaryotic", answer: "Mitochondria" },
          { function: "converting sunlight into chemical energy via photosynthesis", organismType: "plant", answer: "Chloroplast" },
          { function: "synthesizing proteins using mRNA instructions", organismType: "all living", answer: "Ribosome" }
        ]
      },
      function: { type: "FORMULA", expression: "scenario.function" },
      organismType: { type: "FORMULA", expression: "scenario.organismType" },
      correctAnswer: { type: "FORMULA", expression: "scenario.answer" }
    },
    options: [
      "{{correctAnswer}}",
      "Endoplasmic Reticulum",
      "Golgi Apparatus",
      "Lysosome"
    ],
    correctIndex: 0,
    explanation: "The {{correctAnswer}} is responsible for {{function}}."
  },

  // 3. CHEMISTRY (Stoichiometry & Moles Calculation)
  {
    id: "chem_003",
    subject: "Chemistry",
    topic: "Stoichiometry",
    stem: "Calculate the number of moles in {{mass}} g of Sodium Chloride (NaCl), given molar mass = 58.44 g/mol.",
    variables: {
      mass: { type: "NUMBER", min: 10, max: 250, step: 5 },
      moles: { type: "FORMULA", expression: "(mass / 58.44).toFixed(2)" },
      d1: { type: "FORMULA", expression: "(mass * 58.44).toFixed(2)" },
      d2: { type: "FORMULA", expression: "(58.44 / mass).toFixed(2)" }
    },
    options: [
      { formula: "moles + ' mol'" },
      { formula: "d1 + ' mol'" },
      { formula: "d2 + ' mol'" },
      "1.00 mol"
    ],
    correctIndex: 0,
    explanation: "Moles = Mass ÷ Molar Mass = {{mass}} g ÷ 58.44 g/mol = {{moles}} mol."
  }
];
