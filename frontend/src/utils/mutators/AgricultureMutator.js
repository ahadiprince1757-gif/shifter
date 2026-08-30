/**
 * Agriculture Subject Mutator
 * Intelligent Agricultural Science Engine:
 * - Dynamic Soil Science, Erosion Control, and Agronomic Case Studies.
 * - NPK Fertilizer & Nutrient Deficiency Diagnostics (Chlorosis, Stunting, Leaf Margin Scorching).
 * - Livestock Husbandry & Crop Parasite Control.
 * - Generates 4 plausible agricultural MCQ options with step-by-step farming logic.
 */

export class AgricultureMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    const mode = (typeof modalityIndex === "number" ? modalityIndex : Math.floor(Math.random() * 4)) % 4;

    // 1. Soil Science, Erosion & Soil Conservation
    if (lower.includes("soil") || lower.includes("erosion") || lower.includes("terracing") || lower.includes("clay") || lower.includes("sand") || lower.includes("humus") || lower.includes("manure")) {
      const isSlope = lower.includes("slope") || lower.includes("erosion") || lower.includes("water");
      const ansStr = isSlope ? "Terracing (Bench terraces) combined with cover crops" : "Organic compost / Farmyard manure";

      if (mode === 0) {
        return {
          q: isSlope
            ? `A farmer cultivating crops on a steep hillside slope notices severe topsoil loss after heavy rain. Which structural conservation measure should be constructed across the slope to reduce runoff velocity?`
            : `A farmer observes that rainwater drains away rapidly from sandy soil, leaving maize plants wilted. Which soil amendment should be incorporated to improve water retention and soil structure?`,
          ans: ansStr,
          hint: isSlope ? "Steps cut into hillsides reduce runoff slope and velocity." : "Organic matter binds soil particles and increases humus content.",
          sol: ansStr,
          type: "open_response",
          options: null,
        };
      } else if (mode === 1) {
        return {
          q: isSlope
            ? `Which structural measure effectively controls soil erosion on steep cultivated slopes?`
            : `Which soil amendment best increases moisture retention in sandy soils?`,
          ans: ansStr,
          hint: isSlope ? "Terraces cut steep slopes into steps." : "Organic manure adds humus.",
          sol: ansStr,
          type: "mcq",
          options: [
            ansStr,
            isSlope ? "Continuous deep tillage up and down the slope" : "Heavy application of synthetic nitrogen fertilizer",
            isSlope ? "Burning crop residues after harvesting" : "Overgrazing with sheep and goats",
            isSlope ? "Fallowing the land without vegetation cover" : "Flooding the field with saline irrigation water"
          ],
        };
      } else if (mode === 2) {
        return {
          q: isSlope
            ? `A farmer claimed that plowing up and down a steep slope prevents soil erosion. Is this claim correct? State the true conservation measure.`
            : `A farmer claimed that adding sand to sandy soil increases water retention. Is this claim correct? State the true amendment.`,
          ans: `Incorrect. The correct measure is ${ansStr}.`,
          hint: isSlope ? "Plowing up and down creates channels for water." : "Organic matter binds soil particles.",
          sol: `Incorrect. ${ansStr} should be applied.`,
          type: "open_response",
          options: null,
        };
      } else {
        return {
          q: isSlope
            ? `State the primary cause of water erosion on steep slopes and describe how bench terracing controls it.`
            : `Explain how organic manure improves both soil structure and water retention in sandy soils.`,
          ans: isSlope ? "High runoff velocity washes topsoil. Bench terracing reduces slope gradient to slow water." : "Organic manure adds humus which binds sand particles and absorbs moisture.",
          hint: isSlope ? "Terracing reduces slope speed." : "Humus binds particles.",
          sol: isSlope ? "Terraces reduce gradient and velocity." : "Humus improves structure and retention.",
          type: "open_response",
          options: null,
        };
      }
    }

    // 2. NPK Plant Nutrient Deficiency Diagnostics
    if (lower.includes("fertilizer") || lower.includes("nutrient") || lower.includes("nitrogen") || lower.includes("phosphorus") || lower.includes("potassium") || lower.includes("npk") || lower.includes("deficien")) {
      const nutrients = [
        { name: "Nitrogen (N)", role: "chlorophyll synthesis and vegetative leaf growth", symptom: "general yellowing of lower leaves (chlorosis) and stunted growth", solution: "Applying CAN or Urea top-dressing" },
        { name: "Phosphorus (P)", role: "root development and early crop establishment", symptom: "purplish discoloration on leaf margins and weak root systems", solution: "Applying DAP or Single Superphosphate at planting" },
        { name: "Potassium (K)", role: "disease resistance and stomatal regulation", symptom: "scorching and browning along leaf margins", solution: "Applying Muriate of Potash (KCl)" }
      ];
      const selected = nutrients[Math.floor(Math.random() * nutrients.length)];

      return {
        q: `[Agronomic Crop Diagnostics] A field officer inspects a maize crop and observes ${selected.symptom}. Which essential mineral nutrient is deficient in the soil?`,
        ans: selected.name,
        hint: `This nutrient is vital for ${selected.role}. ${selected.solution}.`,
        why: `Deficiency in ${selected.name} causes ${selected.symptom} because it is directly required for ${selected.role}.`,
        sol: selected.name,
        steps: [
          `Step 1: Observe crop deficiency symptom (${selected.symptom})`,
          `Step 2: Match symptom to plant physiological role (${selected.role})`,
          `Step 3: Diagnose missing NPK element (${selected.name})`
        ],
        type: "mcq",
        options: [
          selected.name,
          selected.name.includes("Nitrogen") ? "Phosphorus (P)" : "Nitrogen (N)",
          selected.name.includes("Potassium") ? "Phosphorus (P)" : "Potassium (K)",
          "Calcium (Ca)"
        ]
      };
    }

    // 3. Reverse Inquiry for General Agricultural Concepts
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Agricultural Practices Diagnostics] Regarding: "${stem}"\nWhat agronomic principle or farm management rule explains this recommendation?`,
        ans: rawAns,
        hint: qObj.hint || "Relate farm practices to soil conservation, crop yield, or animal health.",
        why: qObj.why || `Agronomic principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze crop or livestock husbandry scenario",
          "Step 2: Apply relevant agricultural science principle",
          "Step 3: State conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Integrated Pest Management (IPM) crop rotation cycle",
          "Rotational strip grazing to prevent pasture degradation",
          "Minimum tillage conservation agriculture"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Agronomic Application Check] ${stem}`,
      hint: qObj.hint || "Recall crop husbandry and soil management rules.",
      steps: [
        "Step 1: Identify crop or animal husbandry context",
        "Step 2: Apply farming principle",
        "Step 3: State conclusion"
      ]
    };
  }
}
