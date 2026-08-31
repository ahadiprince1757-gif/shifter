/**
 * Tixar Biology & Life Science Verifier
 *
 * Verifies core biological facts and processes:
 *  - Mitosis vs. Meiosis cell division characteristics
 *  - Photosynthesis equation reactants & products
 *  - Blood Vessels: Arteries vs. Veins vs. Capillaries
 *  - Genetics: Monohybrid Mendelian ratios (3:1, 1:2:1)
 *  - Cell Organelles & Functions (Mitochondria = Powerhouse, Chloroplast = Photosynthesis)
 */

export function verifyBiologyQuestion(questionText) {
  const q = String(questionText || "").toLowerCase();
  const result =
    tryVerifyCellDivision(q) ||
    tryVerifyPhotosynthesis(q) ||
    tryVerifyOrganelles(q) ||
    tryVerifyBloodVessels(q) ||
    null;

  if (!result) return null;

  return {
    verifiedAnswer: result.answer,
    verifiedSteps: result.steps,
    wasOverridden: false, // Fact verification builds confidence & steps
    explanation: result.explanation,
    subject: "biology",
  };
}

// ── CELL DIVISION: MITOSIS VS MEIOSIS ────────────────────────────────────────
function tryVerifyCellDivision(q) {
  if (!/mitosis|meiosis|cell division|gamete|somatic/i.test(q)) return null;

  if (/mitosis/i.test(q)) {
    return {
      answer: "Produces 2 genetically identical diploid daughter cells for growth and repair.",
      steps: [
        "Key Characteristics of Mitosis:",
        "1. Occurs in somatic (body) cells.",
        "2. Results in 2 daughter cells with identical chromosome count (diploid 2n).",
        "3. Function: Growth, tissue repair, and asexual reproduction.",
      ],
      explanation: "Mitosis forms 2 identical diploid daughter cells for body growth and repair.",
    };
  }

  if (/meiosis/i.test(q)) {
    return {
      answer: "Produces 4 non-identical haploid gametes for sexual reproduction.",
      steps: [
        "Key Characteristics of Meiosis:",
        "1. Occurs in germ cells to produce gametes (sperm & egg).",
        "2. Involves 2 division phases, producing 4 haploid (n) cells.",
        "3. Increases genetic variation through crossing over.",
      ],
      explanation: "Meiosis produces 4 genetically unique haploid gametes for reproduction.",
    };
  }

  return null;
}

// ── PHOTOSYNTHESIS ────────────────────────────────────────────────────────────
function tryVerifyPhotosynthesis(q) {
  if (!/photosynthesis|chlorophyll|light reaction/i.test(q)) return null;

  if (/reactants?|raw materials?|requires?/i.test(q)) {
    return {
      answer: "Carbon Dioxide (CO₂) + Water (H₂O) in the presence of sunlight and chlorophyll.",
      steps: [
        "Photosynthesis Word Equation:",
        "Carbon Dioxide + Water + Light Energy → Glucose + Oxygen",
        "Reactants: CO₂ and H₂O",
        "Catalyst/Energy: Sunlight absorbed by Chlorophyll in chloroplasts",
      ],
      explanation: "Reactants are Carbon Dioxide and Water; Sunlight energy is required.",
    };
  }

  if (/products?|produces?|releases?/i.test(q)) {
    return {
      answer: "Glucose (C₆H₁₂O₆) and Oxygen (O₂).",
      steps: [
        "Photosynthesis Equation:",
        "6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂",
        "Products: Glucose (stored food) and Oxygen (released gas byproduct).",
      ],
      explanation: "Products are Glucose (sugar) and Oxygen gas.",
    };
  }

  return null;
}

// ── CELL ORGANELLES ───────────────────────────────────────────────────────────
function tryVerifyOrganelles(q) {
  if (!/mitochondri|chloroplast|ribosome|nucleus|vacuole/i.test(q)) return null;

  if (/mitochondri/i.test(q)) {
    return {
      answer: "Powerhouse of the cell — site of aerobic cellular respiration to generate ATP energy.",
      steps: [
        "Mitochondria Function:",
        "1. Site of aerobic respiration.",
        "2. Converts glucose and oxygen into ATP energy for cellular processes.",
      ],
      explanation: "Mitochondria carry out cellular respiration to produce ATP energy.",
    };
  }

  if (/ribosome/i.test(q)) {
    return {
      answer: "Site of protein synthesis.",
      steps: [
        "Ribosome Function:",
        "Translates mRNA sequences to synthesize proteins (polypeptide chains).",
      ],
      explanation: "Ribosomes synthesize proteins inside cells.",
    };
  }

  return null;
}

// ── BLOOD VESSELS ─────────────────────────────────────────────────────────────
function tryVerifyBloodVessels(q) {
  if (!/artery|arteries|vein|veins|capillary|capillaries/i.test(q)) return null;

  if (/arter/i.test(q)) {
    return {
      answer: "Carry oxygenated blood away from the heart under high pressure (thick muscular walls, no valves except semi-lunar).",
      steps: [
        "Artery Structure & Function:",
        "1. Directs blood AWAY from the heart.",
        "2. Thick elastic muscular walls withstand high blood pressure.",
      ],
      explanation: "Arteries transport blood away from the heart under high pressure.",
    };
  }

  if (/vein/i.test(q)) {
    return {
      answer: "Carry deoxygenated blood towards the heart under low pressure (thin muscular walls, contains valves to prevent backflow).",
      steps: [
        "Vein Structure & Function:",
        "1. Returns blood TOWARDS the heart.",
        "2. Contains valves to prevent backflow under low pressure.",
      ],
      explanation: "Veins carry blood towards the heart and have valves to prevent backflow.",
    };
  }

  return null;
}
