/**
 * Geography Subject Mutator
 * Intelligent Geography Engine:
 * - Dynamic Map Scale & Ground Distance Solver ($1:25,000, 1:50,000, 1:100,000$).
 * - Real-World Fieldwork, Physical Landforms (Tectonics, Volcanicity, Rivers), and Climatic Case Studies.
 * - Generates 4 plausible geographic MCQ choices with step-by-step landform/scale breakdowns.
 */

export class GeographyMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Dynamic Map Work & Scale Calculations
    if (lower.includes("map") || lower.includes("scale") || lower.includes("grid") || lower.includes("bearing") || lower.includes("distance") || lower.includes("contour")) {
      const scales = [25000, 50000, 100000];
      const selectedScale = scales[Math.floor(Math.random() * scales.length)];
      const mapCm = Math.floor(Math.random() * 12) + 3; // 3 to 14 cm
      const actualKm = (mapCm * selectedScale) / 100000;

      return {
        q: `[Map Work Scenario] On a topographical map drawn to a representative fraction scale of 1:${selectedScale.toLocaleString()}, a straight road segment measures ${mapCm} cm. Calculate the actual ground distance of the road in kilometres.`,
        ans: `${actualKm} km`,
        hint: "Formula: Ground Distance (km) = (Map Distance in cm × Scale Factor) ÷ 100,000",
        why: `Ground Distance = ${mapCm} cm × ${selectedScale.toLocaleString()} = ${mapCm * selectedScale} cm = ${actualKm} km.`,
        sol: `${actualKm} km`,
        steps: [
          `Step 1: Multiply map distance in cm by scale denominator: ${mapCm} × ${selectedScale.toLocaleString()} = ${mapCm * selectedScale} cm`,
          `Step 2: Convert cm to km by dividing by 100,000: ${mapCm * selectedScale} ÷ 100,000`,
          `Step 3: Final ground distance = ${actualKm} km`
        ],
        type: "mcq",
        options: [
          `${actualKm} km`,
          `${(actualKm * 10).toFixed(1)} km`,
          `${(actualKm / 2).toFixed(1)} km`,
          `${(actualKm * 2).toFixed(1)} km`
        ]
      };
    }

    // 2. Climate & Meteorology Case Studies
    if (lower.includes("climate") || lower.includes("weather") || lower.includes("temperature") || lower.includes("rainfall") || lower.includes("humidity") || lower.includes("rain")) {
      return {
        q: `[Climatology Investigation] A meteorological station records high mean annual temperatures (27°C), low annual temperature range (2°C), and intense afternoon convectional rainfall nearly every day. Which climatic zone is being monitored?`,
        ans: "Equatorial Climate Zone",
        hint: "Characterized by high solar radiation and daily afternoon convectional rain.",
        why: "Equatorial regions experience intense overhead solar radiation year-round, generating rapid convectional updrafts and daily rain.",
        sol: "Equatorial Climate Zone",
        steps: [
          "Step 1: Analyze temperature data (High mean, low range = Equatorial region)",
          "Step 2: Note precipitation pattern (Afternoon convectional rain)",
          "Step 3: Conclude Equatorial Climate Zone"
        ],
        type: "mcq",
        options: [
          "Equatorial Climate Zone",
          "Tropical Savanna Climate Zone",
          "Hot Desert Climate Zone",
          "Mediterranean Climate Zone"
        ]
      };
    }

    // 3. Physical Landforms, Tectonics & Volcanicity
    if (lower.includes("volcan") || lower.includes("fault") || lower.includes("fold") || lower.includes("river") || lower.includes("glac") || lower.includes("rock") || lower.includes("plate")) {
      return {
        q: `[Geomorphology Case Study] Parallel fault lines develop in the Earth's crust due to tensional forces pulling blocks of land apart. As the central block sinks between parallel fault scarps, which major landform is created?`,
        ans: "Rift Valley (Graben)",
        hint: "Formed when a middle crustal block drops between parallel normal fault lines.",
        why: "Tensional forces cause normal faulting, allowing the central block of crust to subside forming a steep-sided Rift Valley (Graben).",
        sol: "Rift Valley (Graben)",
        steps: [
          "Step 1: Identify crustal force involved (Tensional forces pulling apart)",
          "Step 2: Trace crustal movement (Central block subsides along parallel faults)",
          "Step 3: Conclude Rift Valley / Graben formation"
        ],
        type: "mcq",
        options: [
          "Rift Valley (Graben)",
          "Block Mountain (Horst)",
          "Fold Mountain range",
          "Volcanic Caldera lake"
        ]
      };
    }

    // 4. Reverse Inquiry for General Geographic Concepts
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Geographic Process Investigation] Regarding: "${stem}"\nWhich physical process or environmental factor explains this geographic outcome?`,
        ans: rawAns,
        hint: qObj.hint || "Relate physical landforms and climate data to natural processes.",
        why: qObj.why || `Geographic process: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Analyze physical feature or environmental observation",
          "Step 2: Identify physical process (Erosion, Weathering, Tectonics, Climate)",
          "Step 3: State conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Differential chemical weathering of igneous rock",
          "Coastal wave deposition creating spit landforms",
          "Orogeny caused by convergent tectonic plate collision"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Physical Geography Check] ${stem}`,
      hint: qObj.hint || "Recall landform formation and climate principles.",
      steps: [
        "Step 1: Identify landform or climate feature",
        "Step 2: Apply physical geographic rule",
        "Step 3: State conclusion"
      ]
    };
  }
}
