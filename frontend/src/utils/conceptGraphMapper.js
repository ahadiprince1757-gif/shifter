/**
 * Engine 2: Concept Graph & Weighted Meaning Mapper
 *
 * Categorizes answer components into:
 *  - ESSENTIAL (1.0 weight)
 *  - IMPORTANT (0.7 weight)
 *  - SUPPORTING (0.4 weight)
 *  - OPTIONAL   (0.0 weight)
 *
 * Evaluates semantic triples against expected graph edges, distinguishing
 * essential conceptual understanding from superfluous or missing phrasing.
 */

// ── 1. CONCEPT WEIGHT TAXONOMY ────────────────────────────────────────────────

const CONCEPT_WEIGHTS = {
  // Biology / General Science Core Definitions
  instrument:  { weight: 1.0, level: "ESSENTIAL", role: "classification" },
  device:      { weight: 1.0, level: "ESSENTIAL", role: "classification" },
  magnify:     { weight: 1.0, level: "ESSENTIAL", role: "primary_function" },
  magnification:{ weight: 1.0, level: "ESSENTIAL", role: "primary_function" },
  specimen:    { weight: 0.7, level: "IMPORTANT", role: "target_object" },
  small:       { weight: 0.7, level: "IMPORTANT", role: "qualifier" },
  microscopic: { weight: 0.7, level: "IMPORTANT", role: "qualifier" },
  biology:     { weight: 0.4, level: "SUPPORTING", role: "domain_context" },
  medicine:    { weight: 0.4, level: "SUPPORTING", role: "domain_context" },

  // Physics / Density
  density:     { weight: 1.0, level: "ESSENTIAL", role: "governing_property" },
  mass:        { weight: 1.0, level: "ESSENTIAL", role: "quantity" },
  volume:      { weight: 1.0, level: "ESSENTIAL", role: "space" },
  float:       { weight: 0.7, level: "IMPORTANT", role: "phenomenon" },
  liquid:      { weight: 0.4, level: "SUPPORTING", role: "state" },
  solid:       { weight: 0.4, level: "SUPPORTING", role: "state" },

  // Chemistry Bonding
  ionic:       { weight: 1.0, level: "ESSENTIAL", role: "bond_type" },
  covalent:    { weight: 1.0, level: "ESSENTIAL", role: "bond_type" },
  transfer:    { weight: 1.0, level: "ESSENTIAL", role: "electron_mechanism" },
  share:       { weight: 1.0, level: "ESSENTIAL", role: "electron_mechanism" },
  electron:    { weight: 0.7, level: "IMPORTANT", role: "particle" },
  charge:      { weight: 0.7, level: "IMPORTANT", role: "property" },
};

/**
 * Gets the component weight and importance level of a token.
 */
export function getConceptWeight(word) {
  const w = String(word || "").toLowerCase();
  return CONCEPT_WEIGHTS[w] || { weight: 0.5, level: "SUPPORTING", role: "general" };
}

// ── 2. CONCEPT GRAPH EVALUATOR ────────────────────────────────────────────────

/**
 * Evaluates student semantic triples and tokens against the reference concept graph.
 * Returns detailed breakdown of Essential, Important, and Supporting components.
 *
 * @param {Array} studentTriples - Triples extracted from student answer
 * @param {Array<string>} studentTokens - Tokenized student answer
 * @param {Array<string>} correctTokens - Tokenized reference answer
 * @returns {Object} Graph evaluation summary
 */
export function evaluateConceptGraph(studentTriples, studentTokens, correctTokens) {
  const sSet = new Set(studentTokens.map((t) => t.toLowerCase()));
  const cSet = new Set(correctTokens.map((t) => t.toLowerCase()));

  const essentialMet = [];
  const essentialMissing = [];
  const importantMet = [];
  const importantMissing = [];
  const supportingMet = [];

  let totalWeight = 0;
  let earnedWeight = 0;

  for (const cToken of cSet) {
    const meta = getConceptWeight(cToken);
    totalWeight += meta.weight;

    const isPresent = sSet.has(cToken);

    if (isPresent) {
      earnedWeight += meta.weight;
      if (meta.level === "ESSENTIAL") essentialMet.push(cToken);
      else if (meta.level === "IMPORTANT") importantMet.push(cToken);
      else supportingMet.push(cToken);
    } else {
      if (meta.level === "ESSENTIAL") essentialMissing.push(cToken);
      else if (meta.level === "IMPORTANT") importantMissing.push(cToken);
    }
  }

  const weightedScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  const isEssentialSatisfied = essentialMissing.length === 0;

  return {
    weightedScore,
    isEssentialSatisfied,
    essentialMet,
    essentialMissing,
    importantMet,
    importantMissing,
    supportingMet,
    totalWeight,
    earnedWeight,
  };
}
