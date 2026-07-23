/**
 * Biology & Life Sciences Subject Mutator
 * Intelligent Context-Aware Biology Engine:
 * - Dynamically extracts target biological concepts (Photosynthesis, Enzymes, Genetics, Circulation, Plant Transport, Osmosis, Ecology).
 * - Transforms factual questions into real-world medical/ecological case studies and diagnostic investigations ("The Reverse Aha!").
 * - Generates 4 plausible domain-specific MCQ options with step-by-step biological explanations.
 */

export class BiologyMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Photosynthesis & Plant Physiology
    if (lower.includes("photosynthe") || lower.includes("chlorophyll") || lower.includes("leaf") || lower.includes("stomata") || lower.includes("light stage") || lower.includes("dark stage")) {
      return {
        q: `[Botany Lab Experiment] A botanist places a variegated leaf under bright sunlight for 6 hours after de-starching. After performing an iodine starch test, only the green areas turn dark blue/black while white areas remain brown. What does this experiment prove?`,
        ans: "Chlorophyll is essential for photosynthesis (starch production)",
        hint: "Iodine tests for starch; green areas contain chlorophyll pigment.",
        why: "Chlorophyll traps solar energy needed to synthesize glucose, which is converted to starch. Non-green areas lack chlorophyll and cannot perform photosynthesis.",
        sol: "Chlorophyll is essential for photosynthesis",
        steps: [
          "Step 1: Identify key variable (Green areas = Chlorophyll present)",
          "Step 2: Relate iodine color change (Blue-black = Starch present)",
          "Step 3: Conclude chlorophyll is required for light absorption and sugar production"
        ],
        type: "mcq",
        options: [
          "Chlorophyll is essential for photosynthesis (starch production)",
          "Sunlight is not required for starch formation",
          "Carbon dioxide is produced by chlorophyll",
          "Water is absorbed only by non-green areas"
        ]
      };
    }

    // 2. Enzymes & Digestion
    if (lower.includes("enzyme") || lower.includes("catalyst") || lower.includes("substrate") || lower.includes("active site") || lower.includes("denatur") || lower.includes("pepsin") || lower.includes("amylase")) {
      return {
        q: `[Biochemistry Diagnostic] A patient's core body temperature spikes to 41.5°C during a severe fever. Laboratory tests show that metabolic digestive reactions have slowed drastically. What is the molecular cause of this enzyme failure at high temperature?`,
        ans: "Thermal denaturation altering the 3D structure of the active site",
        hint: "High heat breaks delicate hydrogen bonds in protein structures.",
        why: "Excess thermal energy breaks hydrogen and disulfide bonds, deforming the enzyme's active site so substrates can no longer bind.",
        sol: "Thermal denaturation altering the active site",
        steps: [
          "Step 1: Analyze environmental condition (High temperature > 40°C)",
          "Step 2: Recall protein structure sensitivity to heat",
          "Step 3: State active site denaturation prevents enzyme-substrate complex formation"
        ],
        type: "mcq",
        options: [
          "Thermal denaturation altering the 3D structure of the active site",
          "Enzymes being completely consumed during the reaction",
          "Substrate molecules expanding and becoming too large",
          "Activation energy being lowered to zero"
        ]
      };
    }

    // 3. Respiration & Cell Organelles (Mitochondria, ATP)
    if (lower.includes("mitochondr") || lower.includes("atp") || lower.includes("respiration") || lower.includes("aerobic") || lower.includes("anaerobic") || lower.includes("glucose")) {
      return {
        q: `[Physiology Case Study] Microscopic examination of hummingbird wing muscle tissue reveals an extraordinarily high concentration of mitochondria compared to mammalian liver tissue. Why is this structural adaptation necessary?`,
        ans: "To provide vast amounts of ATP energy required for rapid muscle contraction",
        hint: "Mitochondria are the powerhouses where aerobic respiration generates ATP.",
        why: "Continuous high-frequency wing flapping demands high rates of ATP synthesis produced via aerobic respiration in mitochondria.",
        sol: "To provide vast amounts of ATP energy for rapid muscle contraction",
        steps: [
          "Step 1: Identify tissue requirement (Rapid continuous muscle movement)",
          "Step 2: Link organelle function (Mitochondria = Aerobic respiration & ATP synthesis)",
          "Step 3: Conclude high mitochondria count supports continuous energy supply"
        ],
        type: "mcq",
        options: [
          "To provide vast amounts of ATP energy required for rapid muscle contraction",
          "To store glycogen and digestive enzymes for later use",
          "To synthesize photosynthetic pigments during flight",
          "To filter metabolic waste products out of the muscle"
        ]
      };
    }

    // 4. Osmosis & Cell Transport (Turgor, Plasmolysis, Diffusion)
    if (lower.includes("osmosis") || lower.includes("diffusion") || lower.includes("semi-permeable") || lower.includes("plasmolys") || lower.includes("turgid") || lower.includes("flaccid")) {
      return {
        q: `[Cell Physiology Experiment] Strips of fresh potato tuber are immersed in a beaker of 20% concentrated salt solution. After 1 hour, the potato strips become limp, flexible, and decrease in length. Explain the physical cellular process responsible.`,
        ans: "Water moved out of potato cells into the concentrated salt solution by osmosis",
        hint: "Water moves from high water potential (inside cell) to lower water potential (hypertonic solution).",
        why: "The hypertonic salt solution has lower water potential than the cell sap, causing water to leave by osmosis, leading to loss of turgor (plasmolysis).",
        sol: "Water moved out of potato cells by osmosis",
        steps: [
          "Step 1: Compare water potential (Potato cell sap > 20% Salt solution)",
          "Step 2: Trace direction of osmosis (Water moves outward across membrane)",
          "Step 3: State outcome (Cells lose turgor pressure and shrink)"
        ],
        type: "mcq",
        options: [
          "Water moved out of potato cells into the concentrated salt solution by osmosis",
          "Salt molecules entered potato cells by active transport causing swelling",
          "Starch molecules dissolved into the beaker by simple diffusion",
          "Water entered potato cells by osmosis making them turgid"
        ]
      };
    }

    // 5. Genetics, DNA & Cell Division (Mitosis, Meiosis, Chromosomes)
    if (lower.includes("dna") || lower.includes("gene") || lower.includes("chromosome") || lower.includes("mitosis") || lower.includes("meiosis") || lower.includes("allele") || lower.includes("genotype")) {
      return {
        q: `[Genetics Inquiry] During gamete formation (sperm and egg cells), homologous chromosomes separate so that each daughter cell receives half the original chromosome number. What type of nuclear division is this, and why is it essential?`,
        ans: "Meiosis; it ensures the diploid chromosome number is restored upon fertilization",
        hint: "Meiosis produces haploid (n) gametes.",
        why: "Meiosis halves chromosome number (diploid 2n ➔ haploid n) so that fusion of sperm and egg during fertilization restores the diploid number (2n).",
        sol: "Meiosis; restores diploid number upon fertilization",
        steps: [
          "Step 1: Identify cell division type in gamete formation (Meiosis)",
          "Step 2: Note chromosome reduction (2n to n)",
          "Step 3: Explain significance (Prevents doubling of chromosome count each generation)"
        ],
        type: "mcq",
        options: [
          "Meiosis; it ensures the diploid chromosome number is restored upon fertilization",
          "Mitosis; it produces identical clone cells for growth and repair",
          "Binary fission; it doubles the genetic material in each daughter cell",
          "Fertilization; it multiplies chromosome numbers fourfold"
        ]
      };
    }

    // 6. Circulatory System & Transport in Animals
    if (lower.includes("heart") || lower.includes("blood") || lower.includes("artery") || lower.includes("vein") || lower.includes("hemoglobin") || lower.includes("capillary")) {
      return {
        q: `[Cardiovascular Diagnostics] A patient's blood test reveals a abnormally low red blood cell count. As a consequence, the patient experiences chronic fatigue and shortness of breath upon exertion. What is the primary physiological reason?`,
        ans: "Insufficient hemoglobin to transport adequate oxygen to body tissues",
        hint: "Red blood cells contain hemoglobin, which binds oxygen.",
        why: "Red blood cells carry oxygen via hemoglobin for cellular respiration. A shortage reduces ATP production, causing fatigue.",
        sol: "Insufficient hemoglobin to transport oxygen to tissues",
        steps: [
          "Step 1: Relate red blood cells to hemoglobin content",
          "Step 2: Identify hemoglobin role (Oxygen binding and transport)",
          "Step 3: Connect oxygen deficit to reduced cellular respiration and fatigue"
        ],
        type: "mcq",
        options: [
          "Insufficient hemoglobin to transport adequate oxygen to body tissues",
          "Inability of white blood cells to produce antibody proteins",
          "Loss of blood clotting ability leading to internal bleeding",
          "Decreased absorption of digested glucose in the small intestine"
        ]
      };
    }

    // 7. Plant Vascular Transport (Xylem & Phloem)
    if (lower.includes("xylem") || lower.includes("phloem") || lower.includes("transpiration") || lower.includes("translocation") || lower.includes("vascular")) {
      return {
        q: `[Plant Physiology Scenario] A researcher cuts a branch and places its cut stem into a flask of red dye. After 3 hours, red streaks appear inside the leaf veins. Which vascular tissue carried the red solution upward?`,
        ans: "Xylem vessel elements",
        hint: "Xylem transports water and dissolved mineral salts upward from roots to leaves.",
        why: "Xylem vessels form continuous hollow tubes that transport water and dissolved minerals upward driven by transpiration pull.",
        sol: "Xylem vessels",
        steps: [
          "Step 1: Identify substance transported (Liquid/Dye solution)",
          "Step 2: Recall direction of flow (Upward from stem to leaves)",
          "Step 3: Conclude Xylem is responsible for upward water transport"
        ],
        type: "mcq",
        options: [
          "Xylem vessel elements",
          "Phloem sieve tube elements",
          "Epidermal root hair cells",
          "Parenchyma storage cells"
        ]
      };
    }

    // 8. Generic Reverse Inquiry for Any Biological Question
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Biological Mechanism Inquiry] Regarding: "${stem}"\nWhat key biological process or structural mechanism explains this?`,
        ans: rawAns,
        hint: qObj.hint || "Relate the biological structure/function to core life principles.",
        why: qObj.why || `Biological principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Identify the biological entity or system mentioned",
          "Step 2: Recall its physiological or biochemical function",
          "Step 3: State the core biological mechanism"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Passive osmotic balance regulation",
          "Hormonal feedback inhibition",
          "Cellular ATP hydrolysis energy transfer"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Biological Principle Check] ${stem}`,
      hint: qObj.hint || "Focus on structure-function relationships.",
      steps: [
        "Step 1: Analyze biological context",
        "Step 2: Apply core biological mechanism",
        "Step 3: Formulate answer"
      ]
    };
  }
}
