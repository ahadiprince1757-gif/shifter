/**
 * Geography Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Environmental & Fieldwork Case Study
 * - Mode 2: Map Work & Scale Calculations
 * - Mode 3: Physical Geography Feature Discrimination
 * - Mode 4: Cloze Climate & Terrain Check
 */

const GEO_SCENARIOS = [
  {
    keywords: ["climate", "weather", "temperature", "rainfall", "humid", "sea"],
    gen: () => {
      return {
        q: `[Environmental Case Study] A weather station recorded high temperatures, heavy afternoon convectional rainfall, and high humidity consistently throughout the year. Which climatic zone is being described?`,
        ans: "Equatorial Climate",
        hint: "Characterized by high temperatures and daily afternoon rainfall",
        why: "Equatorial climate experiences high radiation year-round leading to daily evaporation and convectional rain.",
        sol: "Equatorial climate experiences high radiation year-round leading to daily evaporation and convectional rain.",
        steps: ["Step 1: Analyze temperature and rainfall pattern", "Step 2: Compare climatic zones", "Step 3: Identify Equatorial climate"],
        type: "mcq",
        options: ["Equatorial Climate", "Savanna Climate", "Desert Climate", "Mediterranean Climate"]
      };
    }
  },
  {
    keywords: ["map", "scale", "grid", "bearing", "contour", "distance"],
    gen: () => {
      const scales = [25000, 50000, 100000];
      const selectedScale = scales[Math.floor(Math.random() * scales.length)];
      const mapCm = Math.floor(Math.random() * 12) + 3; // 3 to 14 cm
      const actualKm = (mapCm * selectedScale) / 100000;

      return {
        q: `[Map Work Scenario] On a topographical map drawn to a scale of 1:${selectedScale.toLocaleString()}, a straight road measures ${mapCm} cm. Calculate the actual ground distance of the road in kilometres.`,
        ans: `${actualKm} km`,
        hint: "Formula: Ground Distance = (Map Distance × Scale Factor) ÷ 100,000",
        why: `Ground Distance = ${mapCm} cm × ${selectedScale.toLocaleString()} = ${mapCm * selectedScale} cm = ${actualKm} km.`,
        sol: `Ground Distance = ${mapCm} cm × ${selectedScale.toLocaleString()} = ${mapCm * selectedScale} cm = ${actualKm} km.`,
        steps: ["Step 1: Multiply map distance in cm by scale factor", "Step 2: Convert cm to km by dividing by 100,000", "Step 3: State final ground distance"],
        type: "mcq",
        options: [`${actualKm} km`, `${actualKm * 10} km`, `${(actualKm / 2).toFixed(1)} km`, `${actualKm * 2} km`]
      };
    }
  }
];

export class GeographyMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Scenario Match
    const match = GEO_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 6) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Geographic Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.why || `Full concept: ${qObj.ans}`,
          steps: ["Step 1: Read geographic statement", "Step 2: Identify missing landform/climate term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[Fieldwork & Physical Check] Regarding "${qObj.q || qObj.stem}": What physical process or geographic factor explains this?`,
      hint: qObj.hint || "Recall physical landforms and environmental processes",
      steps: ["Step 1: Identify geographic feature", "Step 2: Trace formation process", "Step 3: State conclusion"]
    };
  }
}
