/**
 * TIXAR BIOLOGY & LIFE SCIENCE VERIFIER
 *
 * Purpose:
 * - Detect biological concepts
 * - Understand the question's intent
 * - Return scientifically accurate reference answers
 * - Provide structured facts for downstream verification
 *
 * Architecture:
 *   Question
 *     ↓
 *   Detect Biology Concept
 *     ↓
 *   Detect Question Intent
 *     ↓
 *   Extract Relevant Scientific Facts
 *     ↓
 *   Construct Expected Answer
 *     ↓
 *   Compare Student/AI Answer   ← verifyBiologyAnswer()
 *     ↓
 *   Verify / Correct / Flag Uncertain
 *
 * IMPORTANT:
 * This acts as a high-confidence reference engine,
 * not a blind override of every generated answer.
 */


/* ============================================================================
   NORMALIZATION & INTENT DETECTION
============================================================================ */

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function detectIntent(q) {
  if (/compare|difference|differentiate|distinguish/.test(q)) return "compare";
  if (/function|role|importance|purpose|what does/.test(q)) return "function";
  if (/produce|products|formed|released/.test(q)) return "products";
  if (/reactants|raw materials|required|requires|needed/.test(q)) return "reactants";
  if (/ratio|monohybrid|punnett/.test(q)) return "genetics_ratio";
  if (/where|site|location/.test(q)) return "location";
  return "general";
}


/* ============================================================================
   PUBLIC API — QUESTION VERIFIER
============================================================================ */

/**
 * Given a biology question, returns a structured reference answer with facts,
 * steps, and confidence score. Returns null if no verifier matches.
 *
 * @param {string} questionText
 * @returns {object|null}
 */
export function verifyBiologyQuestion(questionText) {
  const q = normalize(questionText);

  const result =
    tryVerifyCellDivision(q) ||
    tryVerifyPhotosynthesis(q) ||
    tryVerifyGenetics(q) ||
    tryVerifyOrganelles(q) ||
    tryVerifyBloodVessels(q);

  if (!result) return null;

  return {
    ...result,
    verifiedAnswer: result.answer,
    verifiedSteps: result.steps || [],
    subject: "Biology",
    confidence: result.confidence ?? 0.95,
    wasOverridden: false,
  };
}


/* ============================================================================
   PUBLIC API — ANSWER VERIFIER
   Compares a student or AI-generated answer against known biological facts.
============================================================================ */

/**
 * Verifies a student's answer against expected biology facts.
 *
 * @param {{ question: string, studentAnswer: string }} params
 * @returns {{ verdict: string, score: number, matchedFacts: string[], missingFacts: string[], misconceptions: string[], correction: string|null }}
 */
export function verifyBiologyAnswer({ question, studentAnswer }) {
  const reference = verifyBiologyQuestion(question);
  if (!reference) return null;

  const ans = normalize(studentAnswer);
  const matchedFacts = [];
  const missingFacts = [];
  const misconceptions = [];

  // Flatten all expected facts from the reference into keyword sets
  const factChecks = buildFactChecks(reference);

  for (const { label, keywords, antiKeywords } of factChecks) {
    const matched = keywords.some((kw) => ans.includes(normalize(kw)));
    const contradicted = antiKeywords?.some((kw) => ans.includes(normalize(kw)));

    if (contradicted) {
      misconceptions.push(label);
    } else if (matched) {
      matchedFacts.push(label);
    } else {
      missingFacts.push(label);
    }
  }

  const total = factChecks.length;
  const score = total > 0 ? Math.round((matchedFacts.length / total) * 100) / 100 : 0;

  let verdict;
  if (score >= 0.8) verdict = "CORRECT";
  else if (score >= 0.4) verdict = "PARTIALLY_CORRECT";
  else verdict = "INCORRECT";

  return {
    verdict,
    score,
    matchedFacts,
    missingFacts,
    misconceptions,
    correction: misconceptions.length > 0 ? reference.explanation : null,
    cbcReady: score >= 0.58, // ME1 threshold
    reference: {
      answer: reference.answer,
      confidence: reference.confidence,
    },
  };
}

/**
 * Converts a reference result's facts into a flat list of checkable assertions.
 * Each entry has a label, keywords to match, and optional antiKeywords for misconceptions.
 */
function buildFactChecks(reference) {
  const checks = [];
  const facts = reference.facts || {};

  // Cell division
  if (facts.mitosis) {
    checks.push({ label: "Mitosis produces 2 daughter cells", keywords: ["two", "2 daughter", "two daughter"] });
    checks.push({ label: "Mitosis chromosome number maintained", keywords: ["maintained", "same number", "identical"] });
    checks.push({ label: "Mitosis function: growth/repair", keywords: ["growth", "repair", "replace"] });
  }
  if (facts.meiosis) {
    checks.push({ label: "Meiosis produces 4 haploid cells", keywords: ["four", "4 haploid", "four haploid"] });
    checks.push({ label: "Meiosis reduces chromosome number", keywords: ["halved", "reduced", "half"] });
    checks.push({ label: "Meiosis produces gametes", keywords: ["gamete", "sexual reproduction", "reproduction"] });
    checks.push({
      label: "Meiosis produces genetically varied cells",
      keywords: ["variation", "varied", "different", "crossing over"],
      antiKeywords: ["identical", "same as parent"],
    });
  }

  // Blood vessels
  if (facts.arteries) {
    checks.push({ label: "Arteries carry blood away from heart", keywords: ["away from the heart", "from the heart"] });
    checks.push({ label: "Arteries have thick elastic walls", keywords: ["thick", "elastic", "muscular"] });
  }
  if (facts.veins) {
    checks.push({ label: "Veins carry blood towards the heart", keywords: ["towards the heart", "to the heart"] });
    checks.push({ label: "Veins have valves", keywords: ["valve", "valves"] });
  }
  if (facts.capillaries) {
    checks.push({ label: "Capillaries allow exchange of substances", keywords: ["exchange", "diffusion", "gases", "nutrients", "waste"] });
    checks.push({ label: "Capillaries have very thin walls", keywords: ["thin", "one cell", "single cell"] });
  }

  // Photosynthesis
  if (facts.reactants) {
    checks.push({ label: "Photosynthesis reactant: CO₂", keywords: ["carbon dioxide", "co2", "co₂"] });
    checks.push({ label: "Photosynthesis reactant: Water", keywords: ["water", "h2o", "h₂o"] });
    checks.push({
      label: "Light is not a reactant but an energy source",
      keywords: ["light energy", "light", "sunlight"],
      antiKeywords: ["sunlight is a catalyst", "light is a catalyst"],
    });
  }
  if (facts.products) {
    checks.push({ label: "Photosynthesis product: Glucose", keywords: ["glucose", "sugar", "c6h12o6"] });
    checks.push({ label: "Photosynthesis product: Oxygen", keywords: ["oxygen", "o2", "o₂"] });
  }

  // Organelles
  if (facts.organelle) {
    const funcKeywords = normalize(facts.function || "").split(" ").filter((w) => w.length > 4);
    if (funcKeywords.length > 0) {
      checks.push({ label: `${facts.organelle} function`, keywords: funcKeywords });
    }
  }

  // Genetics
  if (facts.phenotypicRatio) {
    checks.push({ label: "Phenotypic ratio 3:1", keywords: ["3:1", "3 to 1", "three to one"] });
  }
  if (facts.genotypicRatio) {
    checks.push({ label: "Genotypic ratio 1:2:1", keywords: ["1:2:1", "1 aa", "2 aa", "aa aa aa"] });
  }

  // Fallback: if no structured facts, check steps for keyword coverage
  if (checks.length === 0 && Array.isArray(reference.steps)) {
    reference.steps.forEach((step, i) => {
      const words = normalize(step).split(" ").filter((w) => w.length > 5).slice(0, 3);
      if (words.length > 0) {
        checks.push({ label: `Step ${i + 1}`, keywords: words });
      }
    });
  }

  return checks;
}


/* ============================================================================
   CELL DIVISION
============================================================================ */

function tryVerifyCellDivision(q) {
  const hasMitosis = /\bmitosis\b/.test(q);
  const hasMeiosis = /\bmeiosis\b/.test(q);

  if (!hasMitosis && !hasMeiosis) return null;

  const intent = detectIntent(q);

  // Both concepts present OR explicit comparison requested
  if ((hasMitosis && hasMeiosis) || intent === "compare") {
    return {
      answer:
        "Mitosis produces two genetically identical daughter cells, while meiosis produces four genetically varied haploid cells.",
      facts: {
        mitosis: {
          divisions: 1,
          daughterCells: 2,
          chromosomeNumber: "Maintained",
          geneticVariation: "Low",
          function: "Growth and tissue repair",
        },
        meiosis: {
          divisions: 2,
          daughterCells: 4,
          chromosomeNumber: "Halved",
          geneticVariation: "High",
          function: "Gamete production",
        },
      },
      steps: [
        "Mitosis involves one cell division.",
        "It produces two genetically similar daughter cells.",
        "Meiosis involves two successive divisions.",
        "It produces four genetically different haploid cells.",
        "Mitosis supports growth and repair, while meiosis produces gametes.",
      ],
      explanation:
        "The major distinction is that mitosis preserves chromosome number, while meiosis reduces it by half and increases genetic variation.",
      confidence: 0.98,
    };
  }

  if (hasMitosis) {
    return {
      answer:
        "Mitosis produces two genetically similar daughter cells and maintains the chromosome number of the parent cell.",
      facts: {
        mitosis: {
          divisions: 1,
          daughterCells: 2,
          chromosomeNumber: "Maintained",
          geneticSimilarity: "Generally identical",
          function: ["Growth", "Tissue repair", "Replacement of cells"],
        },
      },
      steps: [
        "Mitosis occurs through one nuclear division.",
        "Chromosomes are distributed equally.",
        "Two daughter cells are produced.",
        "The chromosome number is maintained.",
      ],
      explanation:
        "Mitosis enables growth and repair by producing new cells with the same chromosome number as the original cell.",
      confidence: 0.98,
    };
  }

  if (hasMeiosis) {
    return {
      answer:
        "Meiosis produces four haploid cells and reduces the chromosome number by half for sexual reproduction.",
      facts: {
        meiosis: {
          divisions: 2,
          daughterCells: 4,
          chromosomeNumber: "Halved",
          geneticVariation: true,
          function: "Production of gametes",
        },
      },
      steps: [
        "Meiosis consists of two successive divisions.",
        "The chromosome number is reduced by half.",
        "Four haploid cells are produced.",
        "Genetic variation can occur through processes such as crossing over and independent assortment.",
      ],
      explanation:
        "Meiosis produces haploid gametes so that the normal chromosome number can be restored during fertilization.",
      confidence: 0.98,
    };
  }

  return null;
}


/* ============================================================================
   PHOTOSYNTHESIS
============================================================================ */

function tryVerifyPhotosynthesis(q) {
  if (!/photosynthesis|chlorophyll|light reaction|dark reaction/.test(q)) return null;

  const intent = detectIntent(q);

  if (intent === "reactants") {
    return {
      answer:
        "The main raw materials for photosynthesis are carbon dioxide and water. Light energy is required and chlorophyll absorbs the light.",
      facts: {
        reactants: ["Carbon dioxide", "Water"],
        requiredConditions: ["Light", "Chlorophyll"],
      },
      steps: [
        "Plants absorb carbon dioxide from the environment.",
        "Water is absorbed mainly through the roots.",
        "Chlorophyll absorbs light energy.",
        "The energy drives the conversion of reactants into glucose.",
      ],
      explanation:
        "Carbon dioxide and water provide the raw materials, while light provides energy for the process.",
      confidence: 0.98,
    };
  }

  if (intent === "products") {
    return {
      answer: "The main products of photosynthesis are glucose and oxygen.",
      facts: { products: ["Glucose", "Oxygen"] },
      steps: [
        "Light energy is absorbed by chlorophyll.",
        "Carbon dioxide and water are converted through a series of reactions.",
        "Glucose is formed as an energy-rich organic compound.",
        "Oxygen is released as a product.",
      ],
      explanation:
        "Photosynthesis converts light energy into chemical energy stored in glucose.",
      confidence: 0.98,
    };
  }

  if (/equation|formula/.test(q)) {
    return {
      answer:
        "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, using light energy and chlorophyll.",
      facts: { equation: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
      steps: [
        "Six molecules of carbon dioxide combine with six molecules of water.",
        "Light energy drives the reactions.",
        "Glucose and oxygen are produced.",
      ],
      explanation:
        "This equation represents the overall simplified chemical process of photosynthesis.",
      confidence: 0.99,
    };
  }

  return {
    answer:
      "Photosynthesis is the process by which organisms such as green plants use light energy to produce glucose from carbon dioxide and water, releasing oxygen.",
    steps: [
      "Chlorophyll absorbs light energy.",
      "Carbon dioxide and water are used as raw materials.",
      "Chemical reactions form glucose.",
      "Oxygen is released.",
    ],
    explanation:
      "Photosynthesis converts light energy into chemical energy stored in glucose.",
    confidence: 0.95,
  };
}


/* ============================================================================
   GENETICS
============================================================================ */

function tryVerifyGenetics(q) {
  if (
    !/monohybrid|mendel|punnett|genotype|phenotype|dominant|recessive|3:1|1:2:1/.test(q)
  ) {
    return null;
  }

  if (/phenotypic|3:1/.test(q)) {
    return {
      answer:
        "A typical monohybrid cross between two heterozygous individuals produces a phenotypic ratio of 3:1 under complete dominance.",
      facts: {
        cross: "Aa × Aa",
        phenotypicRatio: "3:1",
        genotypicRatio: "1:2:1",
      },
      steps: [
        "Cross two heterozygous parents (Aa × Aa).",
        "Construct a Punnett square.",
        "Three offspring show the dominant phenotype, one shows the recessive.",
      ],
      explanation:
        "Three offspring are expected to show the dominant phenotype for every one showing the recessive phenotype, statistically speaking.",
      confidence: 0.98,
    };
  }

  if (/genotypic|1:2:1/.test(q)) {
    return {
      answer:
        "A typical monohybrid cross between two heterozygous individuals produces a genotypic ratio of 1:2:1.",
      facts: {
        cross: "Aa × Aa",
        genotypicRatio: "1 AA : 2 Aa : 1 aa",
      },
      steps: [
        "Cross two heterozygous parents (Aa × Aa).",
        "Possible offspring: AA, Aa, Aa, aa.",
        "The genotypic ratio is 1 AA : 2 Aa : 1 aa.",
      ],
      explanation:
        "The possible offspring genotypes occur in the ratio AA : Aa : aa = 1 : 2 : 1.",
      confidence: 0.98,
    };
  }

  return null;
}


/* ============================================================================
   CELL ORGANELLES
============================================================================ */

function tryVerifyOrganelles(q) {
  const organelles = {
    mitochondria: {
      patterns: /mitochondri/,
      answer:
        "Mitochondria are major sites of aerobic respiration and ATP production.",
      function: "Energy transfer through aerobic cellular respiration.",
    },
    chloroplast: {
      patterns: /chloroplast/,
      answer:
        "Chloroplasts are the organelles where photosynthesis occurs in plant cells and many algae.",
      function: "Photosynthesis.",
    },
    ribosome: {
      patterns: /ribosome/,
      answer: "Ribosomes are sites of protein synthesis.",
      function: "Protein synthesis.",
    },
    nucleus: {
      patterns: /\bnucleus\b/,
      answer:
        "The nucleus contains genetic material and helps control cellular activities.",
      function:
        "Storage of genetic information and regulation of cell activities.",
    },
    vacuole: {
      patterns: /vacuole/,
      answer:
        "Vacuoles are involved in storage, and the large central vacuole in plant cells helps maintain turgor pressure.",
      function: "Storage and maintenance of cell pressure.",
    },
  };

  for (const [name, data] of Object.entries(organelles)) {
    if (data.patterns.test(q)) {
      return {
        answer: data.answer,
        facts: { organelle: name, function: data.function },
        steps: [
          `Identify the organelle: ${name}.`,
          `Its primary function is: ${data.function}`,
        ],
        explanation: data.answer,
        confidence: 0.98,
      };
    }
  }

  return null;
}


/* ============================================================================
   BLOOD VESSELS
============================================================================ */

function tryVerifyBloodVessels(q) {
  const hasArtery = /\barter(y|ies)\b/.test(q);
  const hasVein = /\bvein(s)?\b/.test(q);
  const hasCapillary = /\bcapillar(y|ies)\b/.test(q);

  if (!hasArtery && !hasVein && !hasCapillary) return null;

  const intent = detectIntent(q);

  // Comparison
  if ((hasArtery && hasVein) || intent === "compare") {
    return {
      answer:
        "Arteries carry blood away from the heart, while veins carry blood towards the heart. Capillaries are tiny vessels where exchange of substances occurs.",
      facts: {
        arteries: { direction: "Away from the heart", walls: "Thick and elastic" },
        veins: { direction: "Towards the heart", walls: "Thinner than arteries", valves: "Usually present" },
        capillaries: { function: "Exchange of gases, nutrients and wastes", walls: "Very thin, usually one cell thick" },
      },
      steps: [
        "Arteries transport blood away from the heart.",
        "Veins return blood towards the heart.",
        "Capillaries allow efficient exchange between blood and tissues.",
      ],
      explanation:
        "Blood vessel classification is primarily based on the direction of blood flow relative to the heart.",
      confidence: 0.98,
    };
  }

  if (hasArtery) {
    return {
      answer:
        "Arteries carry blood away from the heart and generally have thick, elastic muscular walls to withstand relatively high pressure.",
      facts: { arteries: { direction: "Away from the heart", walls: "Thick and elastic", pressure: "Generally high" } },
      steps: [
        "Arteries carry blood away from the heart.",
        "They have thick, muscular, elastic walls.",
        "They generally operate under higher pressure than veins.",
      ],
      // Scientific accuracy: avoid the oxygenation oversimplification
      explanation:
        "Arteries are defined by carrying blood away from the heart. Oxygen content varies depending on the vessel; for example, pulmonary arteries carry deoxygenated blood.",
      confidence: 0.98,
    };
  }

  if (hasVein) {
    return {
      answer:
        "Veins carry blood towards the heart and generally operate under lower pressure than arteries.",
      facts: { veins: { direction: "Towards the heart", pressure: "Generally lower", valves: "Common in many veins" } },
      steps: [
        "Veins carry blood towards the heart.",
        "They operate under lower pressure than arteries.",
        "Many veins contain valves to prevent backflow.",
      ],
      // Scientific accuracy: avoid the oxygenation oversimplification
      explanation:
        "Veins are defined by carrying blood towards the heart. Oxygen content can vary; pulmonary veins carry oxygenated blood.",
      confidence: 0.98,
    };
  }

  if (hasCapillary) {
    return {
      answer:
        "Capillaries are tiny blood vessels with very thin walls that allow the exchange of gases, nutrients and waste products between blood and tissues.",
      facts: { capillaries: { function: "Exchange of substances", walls: "Very thin" } },
      steps: [
        "Capillaries are the smallest blood vessels.",
        "Their walls are very thin — often just one cell thick.",
        "They allow gases, nutrients and waste to pass between blood and tissues.",
      ],
      explanation:
        "Their thin walls and extensive networks make capillaries efficient sites of exchange.",
      confidence: 0.98,
    };
  }

  return null;
}
