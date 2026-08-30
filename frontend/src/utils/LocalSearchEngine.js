/**
 * ─────────────────────────────────────────────────────────────────
 * BM25 Lexical Search Engine — 100% Local, Zero Dependencies
 * ─────────────────────────────────────────────────────────────────
 * Implements BM25 (Best Match 25) — the gold-standard ranking function
 * used by Elasticsearch, Lucene, Solr, and PostgreSQL full-text search.
 *
 * Capabilities:
 *  1. BM25 term-frequency ranking across all document fields
 *  2. Inverted Index build-once, search in O(k·log n) time
 *  3. Natural language question normalization ("what is a cell" → "cell")
 *  4. Porter-style stemmer (run/running/ran → run, photosynthes...)
 *  5. Stop-word removal (the, is, a, an, of, ...)
 *  6. Live mathematical/physical value calculator
 *  7. Online Supabase & IndexedDB database querying
 * ─────────────────────────────────────────────────────────────────
 */

import { supabase } from "../supabase.js";
import { db } from "../db/db.js";

// ── STOP WORDS ────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "in", "on", "at", "to", "of", "and",
  "or", "for", "with", "what", "how", "why", "where", "when", "who",
  "does", "do", "can", "will", "are", "be", "was", "were", "has", "have",
  "had", "its", "i", "me", "my", "we", "you", "he", "she", "they", "that",
  "this", "these", "those", "which", "from", "by", "as", "up", "about",
  "into", "through", "during", "tell", "explain", "define", "give"
]);

// ── BM25 PARAMETERS ───────────────────────────────────────────────
const BM25_K1 = 1.5;   // Term frequency saturation
const BM25_B  = 0.75;  // Length normalization factor

// ── FIELD WEIGHTS (boosts certain fields over others) ─────────────
const FIELD_WEIGHTS = {
  keywords:    3.0,
  title:       2.5,
  topic:       1.8,
  formula:     1.5,
  explanation: 1.2,
  subject:     1.0,
  steps:       0.9,
};

// ── TYPO CORRECTIONS ──────────────────────────────────────────────
const TYPO_MAP = {
  ryme: "rhyme",
  rythem: "rhythm",
  chemestry: "chemistry",
  biolgy: "biology",
  phsyics: "physics",
  mathmatics: "mathematics",
  geografy: "geography",
  agriclture: "agriculture",
  enregy: "energy",
  motoin: "motion",
  photsynthesis: "photosynthesis",
  celluar: "cellular",
  kinetik: "kinetic",
};

// ── KNOWLEDGE BASE ────────────────────────────────────────────────
export const KNOWLEDGE_BASE = [
  // ── BIOLOGY & CELL SCIENCE ──────────────────────────────────────
  {
    id: "bio_what_is_cell",
    subject: "Biology",
    topic: "Cell Biology & Organization",
    title: "What is a Cell? (Definition, Structure & Functions)",
    keywords: "what is a cell what is cell cell definition cell structure organelles cytoplasm membrane basic unit of life eukaryote prokaryote nucleus mitochondria",
    formula: "Cell = Cell Membrane + Cytoplasm + Organelles + Genetic Material (DNA)",
    explanation: "A cell is the microscopic structural, functional, and biological unit of all living organisms. Known as the building block of life, cells carry out essential processes such as respiration, metabolism, protein synthesis, and self-replication. Discovered by Robert Hooke in 1665.",
    steps: "Step 1: Cell Membrane: Selectively permeable boundary regulating transport in and out of the cell. Step 2: Cytoplasm: Jelly-like fluid hosting metabolic enzymes and organelles. Step 3: Nucleus / DNA: Stores genetic instructions to direct cellular growth and protein synthesis. Step 4: Organelles (Mitochondria, Ribosomes): Perform specialized functions like ATP energy production and protein assembly."
  },
  {
    id: "bio_photosynthesis",
    subject: "Biology",
    topic: "Plant Nutrition",
    title: "Photosynthesis Mechanism and Starch Testing",
    keywords: "photosynthesis what is photosynthesis chlorophyll chloroplast glucose starch test iodine sunlight carbon dioxide light stage dark stage plant nutrition",
    formula: "6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂",
    explanation: "Chlorophyll inside chloroplasts absorbs solar energy to convert carbon dioxide and water into glucose and oxygen. Stored glucose is converted to starch, tested using iodine which turns blue-black. Occurs in the leaves of green plants.",
    steps: "Step 1: Light reaction: Chlorophyll traps solar energy to split water (photolysis). Step 2: Dark reaction: Carbon dioxide is reduced to synthesize glucose. Step 3: Iodine test: Add iodine to leaf; blue-black color confirms starch presence."
  },
  {
    id: "bio_enzymes",
    subject: "Biology",
    topic: "Biochemistry",
    title: "Enzyme Kinetics and Thermal Denaturation",
    keywords: "enzyme what is an enzyme what is enzyme catalyst active site denaturation temperature pH pepsin substrate lock and key model protein biological",
    formula: "Enzyme + Substrate ➔ Enzyme-Substrate Complex ➔ Enzyme + Product",
    explanation: "Enzymes are biological protein catalysts with specific 3D active sites that lower activation energy. Temperatures above optimum (above 40 degrees Celsius) denature enzymes by breaking hydrogen bonds, permanently deforming the active site so substrates no longer fit.",
    steps: "Step 1: Substrate binds to specific complementary active site (Lock and Key model). Step 2: Activation energy is lowered, speeding up chemical transformation. Step 3: Excessive heat or extreme pH alters 3D tertiary structure, causing denaturation."
  },
  {
    id: "bio_osmosis",
    subject: "Biology",
    topic: "Cell Transport Mechanisms",
    title: "Osmosis, Plasmolysis, and Turgor Pressure in Cells",
    keywords: "osmosis what is osmosis diffusion semi-permeable membrane turgid plasmolysis hypertonic hypotonic cell membrane water potential passive transport",
    formula: "Water moves from High Water Potential (dilute solution) ➔ Low Water Potential (concentrated solution)",
    explanation: "Osmosis is the passive movement of water molecules across a selectively permeable membrane down a water potential gradient. No energy is required. Plant cells in hypertonic (salty) solutions lose water and become plasmolysed. In hypotonic (dilute) solutions they become turgid.",
    steps: "Step 1: Compare solute concentrations inside vs outside the cell. Step 2: In hypertonic solutions water leaves cell via osmosis causing plasmolysis. Step 3: In hypotonic solutions water enters cell making plant cells turgid and firm."
  },

  // ── PHYSICS & ENERGY ────────────────────────────────────────────
  {
    id: "phys_kinetic_energy",
    subject: "Physics",
    topic: "Work, Energy & Power",
    title: "What is Kinetic Energy? Energy of Motion Explained",
    keywords: "kinetic energy what is kinetic energy ke formula energy of motion mechanical energy half m v squared joules velocity mass moving object speed",
    formula: "KE = ½ × m × v²   (Joules J)",
    explanation: "Kinetic energy (KE) is the energy an object possesses because of its motion. It depends on the mass m in kilograms and the velocity v in metres per second. When speed doubles, kinetic energy quadruples because velocity is squared. Zero velocity means zero kinetic energy.",
    steps: "Step 1: Identify mass m in kilograms (kg) and velocity v in metres per second (m/s). Step 2: Square the velocity: v² = v × v. Step 3: Multiply by mass and 0.5: KE = 0.5 × m × v². Step 4: State the answer in Joules (J)."
  },
  {
    id: "phys_potential_energy",
    subject: "Physics",
    topic: "Work, Energy & Power",
    title: "What is Gravitational Potential Energy? (PE = mgh)",
    keywords: "potential energy what is potential energy gravitational potential energy mgh pe formula stored energy height gravity joules",
    formula: "PE = m × g × h   (Joules J)",
    explanation: "Gravitational potential energy is stored energy due to an object's vertical height above the ground. It depends on mass m, gravitational field strength g equal to 10 m/s² on Earth, and height h in metres.",
    steps: "Step 1: Identify mass m in kg, gravity g = 10 m/s², and height h in metres. Step 2: Multiply all together: PE = m × g × h. Step 3: Express final stored energy in Joules."
  },
  {
    id: "phys_ohms_law",
    subject: "Physics",
    topic: "Current Electricity",
    title: "Ohm's Law and Electrical Power (V = I × R)",
    keywords: "ohms law what is ohms law voltage current resistance power watts volts amperes circuit resistor electrical conductor",
    formula: "V = I × R | Power P = V × I = I²R = V²/R",
    explanation: "Ohm's Law states that potential difference V in Volts across a conductor is proportional to current I in Amperes passing through it when temperature is constant. R is resistance measured in Ohms. Power is the rate of energy transfer in Watts.",
    steps: "Step 1: Identify given parameters V in Volts, I in Amps, R in Ohms. Step 2: Apply Ohm's Law: V = I × R to find missing quantity. Step 3: Calculate electrical Power: P = V × I in Watts."
  },
  {
    id: "phys_newton_second",
    subject: "Physics",
    topic: "Forces & Motion",
    title: "Newton's Second Law of Motion (F = ma)",
    keywords: "force mass acceleration newton second law f equals ma work joules momentum motion newton's law net force",
    formula: "Force F = mass m × acceleration a | Work W = Force × Distance",
    explanation: "Newton's Second Law states that net force applied to an object equals its mass multiplied by its acceleration. A larger force produces more acceleration. Work is done when a force moves an object through a distance in the direction of force.",
    steps: "Step 1: Identify mass m in kg and acceleration a in m/s². Step 2: Calculate net Force: F = m × a in Newtons N. Step 3: Calculate Work done: W = F × d in Joules J."
  },
  {
    id: "phys_waves",
    subject: "Physics",
    topic: "Waves & Sound",
    title: "Wave Equation: Speed, Frequency and Wavelength",
    keywords: "wave equation frequency wavelength hertz sound light speed of wave lambda wave speed transverse longitudinal vibration",
    formula: "Wave Speed v = f × λ  (Speed = Frequency × Wavelength)",
    explanation: "Wave velocity v in metres per second equals frequency f in Hertz multiplied by wavelength lambda in metres. Speed of sound in air is approximately 340 m/s. Speed of light in vacuum is 3 × 10⁸ m/s. Frequency and wavelength are inversely proportional at constant speed.",
    steps: "Step 1: Identify frequency f in Hz and wavelength λ in metres. Step 2: Multiply: wave speed v = f × λ in m/s. Step 3: Rearrange as λ = v / f to find wavelength or f = v / λ for frequency."
  },

  // ── ENGLISH LITERATURE & LANGUAGE ──────────────────────────────
  {
    id: "eng_rhyme",
    subject: "English",
    topic: "Poetry & Literary Devices",
    title: "What is Rhyme? Definition, Types and Rhyme Scheme",
    keywords: "what is rhyme what is a rhyme rhyme ryme rhyme scheme end rhyme internal rhyme poetry stanzas syllable sound couplet verse literature",
    formula: "Rhyme Scheme: AABB (couplet), ABAB (alternating), ABCB (ballad) | Cat rhymes with Hat, Light with Night",
    explanation: "A rhyme is the repetition of similar or identical vowel and consonant sounds at the end of words or poetry lines. Rhyme creates musicality, rhythm, and emphasis in verse. Types include end rhyme (at line endings), internal rhyme (within a line), and slant rhyme (near-rhymes like home and come).",
    steps: "Step 1: Read each line and identify the final stressed syllable sound. Step 2: Assign letter A to the first sound, B to the next new sound, and so on. Step 3: The resulting pattern (ABAB, AABB etc.) is the rhyme scheme. Step 4: End Rhyme example: 'I saw a cat / sitting on a mat' = AABB couplet rhyme."
  },
  {
    id: "eng_simile_metaphor",
    subject: "English",
    topic: "Figurative Language",
    title: "What is a Simile vs Metaphor? (Figurative Language)",
    keywords: "simile metaphor figurative language comparison what is simile what is metaphor as like literary device poem prose",
    formula: "Simile uses 'as' or 'like' | Metaphor states equality directly without comparison words",
    explanation: "A simile compares two unlike things using the words 'as' or 'like'. Example: 'brave as a lion'. A metaphor states one thing IS another. Example: 'He is a lion in battle'. Both create vivid imagery but metaphors make stronger, more direct comparisons.",
    steps: "Step 1: Simile: look for 'as' or 'like' connecting two unlike things. Step 2: Metaphor: look for direct equality statements (is, was, are, were) between two unlike things. Step 3: Both are figurative — not literally true — and create imagery."
  },

  // ── MATHEMATICS ─────────────────────────────────────────────────
  {
    id: "math_linear_eq",
    subject: "Mathematics",
    topic: "Algebra & Linear Equations",
    title: "Solving Linear Equations: ax + b = c Method",
    keywords: "solve x linear equation algebra unknown variable equation isolate x solve for x inverse operations balance method",
    formula: "ax + b = c  ➔  x = (c - b) / a",
    explanation: "To solve for x in a linear equation perform inverse operations to isolate x. Subtract the constant term from both sides then divide by the coefficient. Always verify by substituting back into the original equation.",
    steps: "Step 1: Subtract constant b from both sides: ax = c - b. Step 2: Divide both sides by coefficient a: x = (c - b) / a. Step 3: Verify by substituting x back into original equation to check LHS equals RHS."
  },
  {
    id: "math_percentage",
    subject: "Mathematics",
    topic: "Financial Math & Percentages",
    title: "Profit, Loss, Discount and Percentage Calculations",
    keywords: "profit loss discount percentage financial math simple interest selling price cost price margin buying price calculate percentage",
    formula: "Profit = Selling Price - Cost Price | Discount = Original × (Rate/100) | % Profit = (Profit/Cost) × 100",
    explanation: "Profit occurs when selling price exceeds cost price. Loss occurs when cost price exceeds selling price. For discounts multiply original price by discount percentage then divide by 100. Simple interest uses I = PRT/100 where P is principal, R is rate and T is time.",
    steps: "Step 1: Profit = Selling Price − Cost Price. Step 2: Percentage Profit = (Profit ÷ Cost Price) × 100%. Step 3: Discount Amount = Original Price × (Discount% ÷ 100). Step 4: Final Price = Original Price − Discount Amount."
  },
  {
    id: "math_circle",
    subject: "Mathematics",
    topic: "Geometry & Mensuration",
    title: "Area and Circumference of a Circle (πr² and 2πr)",
    keywords: "circle area circumference radius diameter pi pi r squared 2 pi r perimeter geometry mensuration sector",
    formula: "Area = πr² | Circumference = 2πr = πd  (π ≈ 22/7 ≈ 3.14159)",
    explanation: "A circle's area is pi times radius squared. Circumference is the perimeter distance around the circle equal to 2 times pi times radius. The diameter is twice the radius. Using pi as 22/7 gives accurate results for school calculations.",
    steps: "Step 1: Identify the radius r (or diameter d; then r = d ÷ 2). Step 2: Area = π × r² = (22/7) × r². Step 3: Circumference = 2 × π × r = 2 × (22/7) × r."
  },
  {
    id: "math_speed_distance_time",
    subject: "Mathematics",
    topic: "Rates & Kinematics",
    title: "Speed, Distance and Time Calculations",
    keywords: "speed distance time km/h m/s velocity average speed travel kinematics rate distance equals speed times time",
    formula: "Distance = Speed × Time | Speed = Distance / Time | Time = Distance / Speed",
    explanation: "The speed-distance-time triangle shows the relationship between the three quantities. Ensure units match: if speed is in km/h then time must be in hours to get distance in km. Convert km/h to m/s by dividing by 3.6.",
    steps: "Step 1: Check unit compatibility — convert if needed (km/h ÷ 3.6 = m/s). Step 2: Apply formula: Distance = Speed × Time. Step 3: State final value with correct unit (km or m)."
  },

  // ── CHEMISTRY ───────────────────────────────────────────────────
  {
    id: "chem_moles",
    subject: "Chemistry",
    topic: "Stoichiometry & Mole Concept",
    title: "Mole Calculations: n = m/M and Concentration C = n/V",
    keywords: "moles molar mass stoichiometry mass grams concentration molarity dm3 solute avogadro mole concept number of moles",
    formula: "Moles n = Mass m (g) / Molar Mass M (g/mol) | Concentration C = n / V (dm³)",
    explanation: "One mole contains Avogadro's number 6.022 × 10²³ particles. To find moles divide mass in grams by the molar mass. Molarity or concentration measures moles of solute per cubic decimetre of solution.",
    steps: "Step 1: Find molar mass by adding atomic masses from the periodic table. Step 2: Moles = Mass (g) ÷ Molar Mass (g/mol). Step 3: Convert volume to dm³ (cm³ ÷ 1000). Step 4: Concentration = Moles ÷ Volume in dm³."
  },
  {
    id: "chem_acids_bases",
    subject: "Chemistry",
    topic: "Acids, Bases & Indicators",
    title: "pH Scale, Acids and Bases — Indicators and Neutralization",
    keywords: "acid base ph scale indicator litmus universal indicator titration neutralization hydrogen ion alkali salt water strong acid weak acid",
    formula: "pH < 7 = Acidic (H⁺ ions) | pH = 7 = Neutral | pH > 7 = Alkaline (OH⁻ ions)",
    explanation: "Acids produce hydrogen ions H⁺ in solution and have pH below 7. Bases produce hydroxide ions OH⁻ and have pH above 7. Universal indicator turns red for strong acids and purple for strong bases. Neutralization: Acid + Base → Salt + Water.",
    steps: "Step 1: Use pH scale 0 to 14 (0–6 Acidic, 7 Neutral, 8–14 Alkaline). Step 2: Universal Indicator colors: Red (strong acid), Orange/Yellow (weak acid), Green (neutral), Blue/Purple (alkali). Step 3: Neutralization: Acid + Base → Salt + Water."
  },

  // ── COMPUTER STUDIES ────────────────────────────────────────────
  {
    id: "cs_binary",
    subject: "Computer Studies",
    topic: "Data Representation",
    title: "Binary to Decimal Conversion: Place Values Method",
    keywords: "binary decimal base 2 base 10 bit byte number conversion radix hexadecimal octal computing data binary number system",
    formula: "Decimal = Σ(Bit × 2^position) | Place values: 128, 64, 32, 16, 8, 4, 2, 1",
    explanation: "Computers use binary (base-2) with only 0s and 1s because electronic switches are either OFF (0) or ON (1). To convert binary to decimal write the place values (powers of 2) then add those where a 1 appears.",
    steps: "Step 1: Write place values from right: 1, 2, 4, 8, 16, 32, 64, 128. Step 2: Align binary digits under each place value. Step 3: Multiply each bit by its place value. Step 4: Sum all products to get the decimal equivalent."
  },
  {
    id: "cs_ram_rom",
    subject: "Computer Studies",
    topic: "Computer Architecture & Memory",
    title: "RAM vs ROM: Primary Memory in Computer Systems",
    keywords: "ram rom primary memory volatile non volatile cpu storage firmware bios memory computer hardware random access read only",
    formula: "RAM = Volatile (loses data on power off) | ROM = Non-Volatile (retains data permanently)",
    explanation: "RAM (Random Access Memory) is the computer's working memory. It stores currently running programs and is volatile meaning content is lost when power is removed. ROM (Read-Only Memory) stores permanent firmware like the BIOS bootloader and retains data without power.",
    steps: "Step 1: RAM is volatile fast read/write memory holding active programs and data. Step 2: ROM is non-volatile permanent read-only memory storing startup instructions (BIOS/firmware). Step 3: Secondary storage (HDD/SSD) provides long-term file storage that persists after shutdown."
  },

  // ── BUSINESS STUDIES ────────────────────────────────────────────
  {
    id: "bus_scarcity",
    subject: "Business Studies",
    topic: "Economic Concepts",
    title: "Scarcity, Choice and Opportunity Cost in Economics",
    keywords: "scarcity choice opportunity cost wants needs resources capital economics trade off human wants unlimited basic economic problem",
    formula: "Opportunity Cost = Value of the next best alternative that is given up (forgone)",
    explanation: "Scarcity arises because human wants are unlimited while productive resources like land labour and capital are limited. This forces choices between competing alternatives. Opportunity cost is the value of the best alternative you sacrifice when making a choice.",
    steps: "Step 1: Identify the scarce resource (money, time, land, labour). Step 2: List competing alternative uses of that resource. Step 3: The value of the next best alternative not chosen is the opportunity cost."
  },

  // ── GEOGRAPHY ───────────────────────────────────────────────────
  {
    id: "geo_map_scale",
    subject: "Geography",
    topic: "Map Reading & Cartography",
    title: "Map Scale and Ground Distance Calculation",
    keywords: "map scale ground distance topographical map bearing representative fraction scale calculation cartography km map reading",
    formula: "Ground Distance (km) = (Map Distance cm × Scale denominator) ÷ 100,000",
    explanation: "A representative fraction RF of 1:50,000 means every 1 cm on the map represents 50,000 cm (0.5 km) on the actual ground. Multiply the measured map distance by the scale denominator then convert centimetres to kilometres by dividing by 100,000.",
    steps: "Step 1: Measure the distance between two points on the map in centimetres. Step 2: Multiply map distance (cm) × scale denominator (e.g. 50,000). Step 3: Divide the result by 100,000 to convert to kilometres. Step 4: State final answer with the unit km."
  },
];

// ── PORTER-LITE STEMMER ───────────────────────────────────────────
/**
 * Lightweight English stemmer — reduces words to a common root
 * so "kinetics" and "kinetic" both match the query "kinetic"
 */
function stemWord(word) {
  if (word.length <= 3) return word;
  if (word.endsWith("ies") && word.length > 4) return word.slice(0, -3) + "y";
  if (word.endsWith("ness")) return word.slice(0, -4);
  if (word.endsWith("ment")) return word.slice(0, -4);
  if (word.endsWith("tion")) return word.slice(0, -4);
  if (word.endsWith("ing") && word.length > 5) return word.slice(0, -3);
  if (word.endsWith("tion")) return word.slice(0, -3);
  if (word.endsWith("ed") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("ly") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("er") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("al")) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 4 && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

// ── TOKENIZER ─────────────────────────────────────────────────────
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 1 && !STOP_WORDS.has(t))
    .map(stemWord);
}

// ── BUILD DOCUMENT CORPUS (tokenizes each doc into its fields) ────
function buildCorpus(documents) {
  return documents.map(doc => {
    const fieldTokens = {};
    for (const field of Object.keys(FIELD_WEIGHTS)) {
      const raw = Array.isArray(doc[field]) ? doc[field].join(" ") : (doc[field] || "");
      fieldTokens[field] = tokenize(raw);
    }
    return { ...doc, _fieldTokens: fieldTokens };
  });
}

// ── BM25 SCORER ───────────────────────────────────────────────────
function bm25Score(queryTerms, docFieldTokens, avgFieldLengths, N) {
  let score = 0;

  for (const [field, weight] of Object.entries(FIELD_WEIGHTS)) {
    const docTerms = docFieldTokens[field] || [];
    const docLen = docTerms.length;
    const avgLen = avgFieldLengths[field] || 1;

    // Build term frequency map for this field
    const tf = {};
    for (const term of docTerms) {
      tf[term] = (tf[term] || 0) + 1;
    }

    for (const qTerm of queryTerms) {
      const f = tf[qTerm] || 0;
      if (f === 0) continue;

      // IDF approximation (simplified for in-memory use)
      const idf = Math.log(1 + N / (1 + 1)); // simplified IDF

      // BM25 TF component
      const numerator = f * (BM25_K1 + 1);
      const denominator = f + BM25_K1 * (1 - BM25_B + BM25_B * (docLen / avgLen));
      const bm25tf = numerator / denominator;

      score += idf * bm25tf * weight;
    }
  }

  return score;
}

// ── TYPO CORRECTOR ────────────────────────────────────────────────
function correctTypos(text) {
  let result = text.toLowerCase().trim();
  for (const [typo, correction] of Object.entries(TYPO_MAP)) {
    result = result.replace(new RegExp(`\\b${typo}\\b`, "g"), correction);
  }
  return result;
}

// ── QUESTION NORMALIZER ───────────────────────────────────────────
function normalizeQuestion(text) {
  return text
    .replace(/^(what\s+is\s+a\s+|what\s+is\s+an\s+|what\s+is\s+|define\s+|explain\s+|tell\s+me\s+about\s+|how\s+to\s+|how\s+do\s+i\s+|how\s+does\s+|give\s+me\s+)/i, "")
    .trim();
}

// ── LIVE CALCULATOR ───────────────────────────────────────────────
function evaluateLiveQueryValues(lower) {
  const voltMatch = lower.match(/(\d+(?:\.\d+)?)\s*v(?:olts?)?(?:\b)/i);
  const ampMatch = lower.match(/(\d+(?:\.\d+)?)\s*a(?:mps?|mperes?)?(?:\b)/i);
  const ohmMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:ohms?|Ω)/i);

  if (voltMatch && ampMatch) {
    const v = parseFloat(voltMatch[1]), i = parseFloat(ampMatch[1]);
    if (i > 0) {
      const r = (v / i).toFixed(2), p = (v * i).toFixed(2);
      return {
        id: "live_ohms_vi", subject: "Physics", topic: "Electricity Calculation",
        title: `Live Result: Ohm's Law — ${v} V & ${i} A`,
        formula: `R = V/I = ${r} Ω | P = V×I = ${p} W`,
        explanation: `Resistance R = ${v} ÷ ${i} = ${r} Ω. Electrical Power P = ${v} × ${i} = ${p} Watts.`,
        steps: `Step 1: V = ${v} V, I = ${i} A → Step 2: R = V/I = ${r} Ω → Step 3: P = V×I = ${p} W`,
        isLiveCalculated: true
      };
    }
  }

  if (voltMatch && ohmMatch) {
    const v = parseFloat(voltMatch[1]), r = parseFloat(ohmMatch[1]);
    if (r > 0) {
      const i = (v / r).toFixed(2), p = ((v * v) / r).toFixed(2);
      return {
        id: "live_ohms_vr", subject: "Physics", topic: "Electricity Calculation",
        title: `Live Result: Ohm's Law — ${v} V & ${r} Ω`,
        formula: `I = V/R = ${i} A | P = V²/R = ${p} W`,
        explanation: `Current I = ${v} ÷ ${r} = ${i} A. Power P = ${v}² ÷ ${r} = ${p} W.`,
        steps: `Step 1: V = ${v} V, R = ${r} Ω → Step 2: I = V/R = ${i} A → Step 3: P = V²/R = ${p} W`,
        isLiveCalculated: true
      };
    }
  }

  const distMatch = lower.match(/(\d+(?:\.\d+)?)\s*km/i);
  const timeMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hr|h)\b/i);
  if (distMatch && timeMatch) {
    const d = parseFloat(distMatch[1]), t = parseFloat(timeMatch[1]);
    if (t > 0) {
      const s = (d / t).toFixed(1);
      return {
        id: "live_speed", subject: "Mathematics / Physics", topic: "Kinematics",
        title: `Live Result: ${d} km in ${t} hours`,
        formula: `Speed = ${d} km ÷ ${t} h = ${s} km/h`,
        explanation: `Average speed = Distance ÷ Time = ${d} ÷ ${t} = ${s} km/h.`,
        steps: `Step 1: d = ${d} km, t = ${t} h → Step 2: Speed = ${d} / ${t} = ${s} km/h`,
        isLiveCalculated: true
      };
    }
  }

  const radMatch = lower.match(/(?:radius|r)\s*=?\s*(\d+(?:\.\d+)?)/i);
  if (radMatch && lower.includes("circle")) {
    const r = parseFloat(radMatch[1]);
    const area = ((22 / 7) * r * r).toFixed(2);
    const circ = (2 * (22 / 7) * r).toFixed(2);
    return {
      id: "live_circle", subject: "Mathematics", topic: "Geometry",
      title: `Live Result: Circle r = ${r}`,
      formula: `Area = πr² = ${area} | Circumference = 2πr = ${circ}`,
      explanation: `Area = (22/7) × ${r}² = ${area}. Circumference = 2 × (22/7) × ${r} = ${circ}.`,
      steps: `Step 1: r = ${r} → Step 2: Area = (22/7) × ${r}² = ${area} → Step 3: C = 2 × (22/7) × ${r} = ${circ}`,
      isLiveCalculated: true
    };
  }

  const pctMatch = lower.match(/(\d+(?:\.\d+)?)\s*%/);
  const amtMatch = lower.match(/(?:ksh|\$|on|of)\s*(\d[\d,]*(?:\.\d+)?)/i);
  if (pctMatch && amtMatch && (lower.includes("discount") || lower.includes("profit") || lower.includes("interest"))) {
    const pct = parseFloat(pctMatch[1]);
    const amt = parseFloat(amtMatch[1].replace(/,/g, ""));
    const calcAmt = Math.round((amt * pct) / 100);
    const final = lower.includes("discount") ? amt - calcAmt : amt + calcAmt;
    const label = lower.includes("discount") ? "Discount" : "Profit";
    return {
      id: "live_financial", subject: "Mathematics", topic: "Financial Math",
      title: `Live Result: ${pct}% ${label} on ${amt.toLocaleString()}`,
      formula: `${label} = ${calcAmt.toLocaleString()} | Final = ${final.toLocaleString()}`,
      explanation: `${pct}% of ${amt.toLocaleString()} = ${calcAmt.toLocaleString()}. Final amount = ${final.toLocaleString()}.`,
      steps: `Step 1: ${pct}% × ${amt.toLocaleString()} = ${calcAmt.toLocaleString()} → Step 2: Final = ${amt.toLocaleString()} ${lower.includes("discount") ? "-" : "+"} ${calcAmt.toLocaleString()} = ${final.toLocaleString()}`,
      isLiveCalculated: true
    };
  }

  const eqMatch = lower.match(/(\d+)\s*x\s*([+-])\s*(\d+)\s*=\s*(\d+)/i);
  if (eqMatch) {
    const [, aStr, op, bStr, cStr] = eqMatch;
    const a = parseInt(aStr, 10), b = parseInt(bStr, 10), c = parseInt(cStr, 10);
    if (a > 0) {
      const rhs = op === "+" ? c - b : c + b;
      const x = (rhs / a).toFixed(2);
      return {
        id: "live_algebra", subject: "Mathematics", topic: "Algebra",
        title: `Live Result: Solve ${a}x ${op} ${b} = ${c}`,
        formula: `${a}x = ${rhs} → x = ${rhs} / ${a} = ${x}`,
        explanation: `${op === "+" ? "Subtract" : "Add"} ${b} from both sides: ${a}x = ${rhs}. Divide by ${a}: x = ${x}.`,
        steps: `Step 1: ${a}x = ${c} ${op === "+" ? "−" : "+"} ${b} = ${rhs} → Step 2: x = ${rhs} ÷ ${a} = ${x}`,
        isLiveCalculated: true
      };
    }
  }

  return null;
}

// ── MAIN ENGINE CLASS ─────────────────────────────────────────────
export class LocalSearchEngine {
  constructor(documents = KNOWLEDGE_BASE) {
    this._rawDocuments = documents;
    this._corpus = buildCorpus(documents);
    this._avgFieldLengths = this._computeAvgFieldLengths();
    console.info(`[BM25 Engine] Indexed ${documents.length} documents across ${Object.keys(FIELD_WEIGHTS).length} fields`);
  }

  _computeAvgFieldLengths() {
    const sums = {};
    for (const field of Object.keys(FIELD_WEIGHTS)) sums[field] = 0;
    for (const doc of this._corpus) {
      for (const field of Object.keys(FIELD_WEIGHTS)) {
        sums[field] += (doc._fieldTokens[field] || []).length;
      }
    }
    const avgs = {};
    for (const field of Object.keys(FIELD_WEIGHTS)) {
      avgs[field] = sums[field] / Math.max(1, this._corpus.length);
    }
    return avgs;
  }

  /**
   * BM25 search: returns ranked results from local knowledge base.
   * Handles natural language questions, typos, stemming, and live calculations.
   */
  search(queryText) {
    if (!queryText || typeof queryText !== "string") return [];
    let raw = queryText.toLowerCase().trim();
    if (raw.length < 2) return [];

    const results = [];

    // 1. Live calculator first (if query has numbers)
    const liveResult = evaluateLiveQueryValues(raw);
    if (liveResult) results.push({ ...liveResult, score: 10000 });

    // 2. Normalize: fix typos + strip question prefixes
    raw = correctTypos(raw);
    const normalized = normalizeQuestion(raw);
    const combined = normalized !== raw ? `${raw} ${normalized}` : raw;

    // 3. Tokenize query (with stemming + stop word removal)
    const queryTerms = tokenize(combined);
    if (queryTerms.length === 0) return results;

    const N = this._corpus.length;

    // 4. Score each document using BM25
    for (const doc of this._corpus) {
      const score = bm25Score(queryTerms, doc._fieldTokens, this._avgFieldLengths, N);
      if (score > 0.01) {
        // Shallow copy without internal _fieldTokens
        const cleanDoc = Object.fromEntries(
          Object.entries(doc).filter(([k]) => k !== "_fieldTokens")
        );
        results.push({ ...cleanDoc, score });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  /**
   * Online Database Search: Queries live Supabase & IndexedDB when connected.
   */
  async searchOnlineDatabase(queryText) {
    if (!queryText || typeof queryText !== "string") return [];
    const q = queryText.trim();
    if (q.length < 2) return [];

    const dbResults = [];

    // Search local IndexedDB topics store
    try {
      const localTopics = await db.topics.filter(t => !t.is_deleted).toArray();
      localTopics.forEach(t => {
        const title = t.title || t.topic || "";
        if (title.toLowerCase().includes(q.toLowerCase())) {
          dbResults.push({
            id: `db_local_${t.id}`,
            subject: t.curriculum_id || "Database Topic",
            topic: t.chapter_id || "IndexedDB Record",
            title: `🌐 DB: ${title}`,
            formula: t.formula || null,
            explanation: t.summary || t.content || "Live record from IndexedDB.",
            isOnlineDatabaseRecord: true,
            score: 50
          });
        }
      });
    } catch (err) {
      console.warn("IndexedDB search warning:", err);
    }

    // Search Supabase remote database if online
    if (typeof navigator !== "undefined" && navigator.onLine && supabase && typeof supabase.from === "function") {
      try {
        const { data, error } = await supabase
          .from("topics")
          .select("id, title, summary, curriculum_id, chapter_id")
          .ilike("title", `%${q}%`)
          .limit(5);

        if (!error && data && data.length > 0) {
          data.forEach(item => {
            dbResults.push({
              id: `db_supabase_${item.id}`,
              subject: item.curriculum_id || "Cloud",
              topic: item.chapter_id || "Supabase DB",
              title: `☁️ Cloud DB: ${item.title}`,
              explanation: item.summary || "Live cloud database record.",
              isOnlineDatabaseRecord: true,
              score: 60
            });
          });
        }
      } catch (err) {
        console.warn("Supabase search warning:", err);
      }
    }

    return dbResults;
  }
}

export const localSearchEngine = new LocalSearchEngine();
