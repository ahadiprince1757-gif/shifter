/**
 * Geography Subject Mutator
 * Handles physical geography, climate, map work, and environmental concepts.
 */

const GEO_TEMPLATES = [
  {
    keywords: ["climate", "weather", "temperature", "rainfall", "humid"],
    gen: () => {
      const scenarios = [
        {
          q: "What is the difference between weather and climate?",
          ans: "Weather is the short-term atmospheric condition of a place, while climate is the average weather pattern over a long period (usually 30+ years).",
          hint: "One is short-term, one is long-term"
        },
        {
          q: "Name any two factors that influence the climate of a region.",
          ans: "Altitude and distance from the sea (continentality)",
          hint: "Think height and water bodies"
        },
        {
          q: "Why do coastal areas receive more rainfall than inland areas?",
          ans: "Because moisture-laden winds from the sea lose moisture as they move inland, so coastal areas get more rainfall.",
          hint: "Think about wind carrying moisture"
        }
      ];
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      return {
        ...s,
        why: s.ans,
        sol: s.ans,
        steps: ["Step 1: Identify the geographic factor", "Step 2: Explain the relationship", "Step 3: State conclusion clearly"]
      };
    }
  },
  {
    keywords: ["map", "scale", "grid", "bearing", "contour", "distance"],
    gen: () => {
      const scale = [10000, 25000, 50000][Math.floor(Math.random() * 3)];
      const mapDist = Math.floor(Math.random() * 15) + 2; // 2 to 16 cm
      const actualDist = (mapDist * scale) / 100000; // in km

      return {
        q: `On a map with a scale of 1:${scale.toLocaleString()}, the distance between two towns is ${mapDist} cm. Calculate the actual ground distance in kilometres.`,
        ans: `${actualDist} km`,
        hint: "Actual distance = Map distance × Scale",
        why: `Actual distance = ${mapDist} cm × ${scale.toLocaleString()} = ${mapDist * scale} cm = ${actualDist} km.`,
        sol: `Actual distance = ${mapDist} cm × ${scale.toLocaleString()} = ${mapDist * scale} cm = ${actualDist} km.`,
        steps: [
          "Step 1: Note map distance and scale",
          "Step 2: Multiply map distance by scale factor",
          "Step 3: Convert cm to km (÷ 100,000)"
        ]
      };
    }
  }
];

export class GeographyMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of GEO_TEMPLATES) {
      if (item.keywords.some(kw => stem.includes(kw))) {
        return item.gen();
      }
    }

    // Cloze fallback
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 8) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const idx = Math.floor(words.length / 2);
        const target = words[idx];
        const masked = [...words];
        masked[idx] = "________";
        return {
          q: `Complete the geographic concept: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Starts with '${target.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.why || qObj.ans,
          steps: ["Step 1: Read the geographic statement", "Step 2: Identify missing term", "Step 3: Fill in the blank"]
        };
      }
    }

    return {
      ...qObj,
      q: `[GEOGRAPHY RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Apply geographic principles",
      steps: ["Step 1: Identify geographic concept", "Step 2: Recall key factors", "Step 3: State answer"]
    };
  }
}
