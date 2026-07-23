/**
 * Advanced Knowledge & Database Search Engine
 * Offline & Online Hybrid | Live Value Calculator | Supabase & IndexedDB Integrator
 * Performs:
 * 1. 0ms Offline Inverted Index Knowledge Search
 * 2. Live Mathematical & Physical Value Evaluations (e.g., "Ohm's Law 12V 3A" -> R=4Ω, P=36W)
 * 3. Online Supabase & IndexedDB Database Querying when connected
 */

import { supabase } from "../supabase.js";
import { db } from "../db/db.js";

export const KNOWLEDGE_BASE = [
  // ── MATHEMATICS ───────────────────────────────────────────
  {
    id: "math_linear_eq",
    subject: "Mathematics",
    topic: "Algebra & Linear Equations",
    title: "How to Solve Linear Equations (ax + b = c)",
    keywords: ["solve x", "linear equation", "algebra", "unknown variable", "equation", "isolate x", "solve for x"],
    formula: "ax + b = c ➔ x = (c - b) / a",
    explanation: "To solve for x in a linear equation, perform inverse operations. First, subtract the constant term 'b' from both sides. Then divide both sides by the coefficient 'a'.",
    steps: [
      "Step 1: Subtract constant 'b' from both sides: ax = c - b",
      "Step 2: Divide both sides by coefficient 'a': x = (c - b) / a",
      "Step 3: Verify answer by substituting x back into original equation"
    ]
  },
  {
    id: "math_percentage_financial",
    subject: "Mathematics",
    topic: "Financial Math & Percentages",
    title: "Calculating Profit, Loss, and Percentage Discounts",
    keywords: ["profit", "loss", "discount", "percentage", "financial math", "interest", "selling price", "cost price", "margin"],
    formula: "Profit = Selling Price - Cost Price | Discount = Original Price × (Discount % / 100)",
    explanation: "Profit is earned when Selling Price exceeds Cost Price. For discounts, calculate the percentage of the original price and subtract it to find the final price paid.",
    steps: [
      "Step 1: Profit = Selling Price - Cost Price",
      "Step 2: Percentage Profit = (Profit / Cost Price) × 100%",
      "Step 3: Final Price after Discount = Original Price × (1 - Discount % / 100)"
    ]
  },
  {
    id: "math_circle_geometry",
    subject: "Mathematics",
    topic: "Geometry & Trigonometry",
    title: "Area and Circumference of a Circle",
    keywords: ["circle", "area", "circumference", "radius", "diameter", "pi", "pi r squared", "2 pi r", "perimeter"],
    formula: "Area = πr² | Circumference = 2πr (or πd)",
    explanation: "The radius 'r' is half of the diameter 'd'. Area measures the 2D surface enclosed by the circle, while circumference measures the boundary perimeter around it.",
    steps: [
      "Step 1: Identify radius r (r = diameter / 2)",
      "Step 2: Calculate Area = π × r²",
      "Step 3: Calculate Circumference = 2 × π × r"
    ]
  },
  {
    id: "math_kinematics_speed",
    subject: "Mathematics",
    topic: "Kinematics & Speed",
    title: "Speed, Distance, and Time Calculations",
    keywords: ["speed", "distance", "time", "km/h", "m/s", "velocity", "travel", "kinematics"],
    formula: "Distance = Speed × Time | Speed = Distance / Time | Time = Distance / Speed",
    explanation: "To calculate distance, multiply speed by travel time. Ensure units are compatible (e.g., km/h with hours, or m/s with seconds).",
    steps: [
      "Step 1: Check unit compatibility (convert km/h to m/s by dividing by 3.6 if needed)",
      "Step 2: Apply formula: Distance = Speed × Time",
      "Step 3: State final value with correct unit (km or m)"
    ]
  },

  // ── PHYSICS ───────────────────────────────────────────────
  {
    id: "phys_ohms_law",
    subject: "Physics",
    topic: "Current Electricity",
    title: "Ohm's Law and Electrical Power (V = I × R)",
    keywords: ["ohms law", "voltage", "current", "resistance", "power", "watts", "volts", "amperes", "circuit", "resistor"],
    formula: "V = I × R | Power (P) = V × I = I²R = V²/R",
    explanation: "Ohm's Law states that potential difference (V in Volts) across a conductor is directly proportional to current (I in Amperes) passing through it, provided temperature remains constant.",
    steps: [
      "Step 1: Identify given parameters (V in Volts, I in Amps, R in Ohms Ω)",
      "Step 2: Apply Ohm's Law: V = I × R",
      "Step 3: Calculate Power: P = V × I (in Watts)"
    ]
  },
  {
    id: "phys_newton_laws",
    subject: "Physics",
    topic: "Forces & Motion",
    title: "Newton's Second Law of Motion (F = m × a)",
    keywords: ["force", "mass", "acceleration", "newton", "f=ma", "work", "joules", "momentum", "motion"],
    formula: "Force (F) = mass (m) × acceleration (a) | Work (W) = Force × Distance",
    explanation: "Newton's 2nd Law states that net force applied to an object equals its mass multiplied by resulting acceleration. Work is done when a force moves an object through a distance.",
    steps: [
      "Step 1: Identify mass m in kg and acceleration a in m/s²",
      "Step 2: Calculate Force F = m × a (in Newtons N)",
      "Step 3: Calculate Work W = F × d (in Joules J)"
    ]
  },
  {
    id: "phys_waves",
    subject: "Physics",
    topic: "Waves & Sound",
    title: "Wave Equation (v = f × λ)",
    keywords: ["wave", "frequency", "wavelength", "hertz", "sound", "light", "speed of wave", "lambda"],
    formula: "v = f × λ (Speed = Frequency × Wavelength)",
    explanation: "Wave velocity 'v' is the product of its frequency 'f' (in Hertz Hz) and wavelength 'λ' (in meters m). Speed of sound in air is approximately 340 m/s.",
    steps: [
      "Step 1: Identify frequency f in Hz and wavelength λ in meters",
      "Step 2: Multiply f × λ to find wave speed v (m/s)",
      "Step 3: Rearrange as λ = v / f to find wavelength if speed is known"
    ]
  },

  // ── BIOLOGY ───────────────────────────────────────────────
  {
    id: "bio_photosynthesis",
    subject: "Biology",
    topic: "Plant Nutrition",
    title: "Photosynthesis Mechanism and Starch Testing",
    keywords: ["photosynthesis", "chlorophyll", "chloroplast", "glucose", "starch test", "iodine", "sunlight", "carbon dioxide", "light stage"],
    formula: "6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂",
    explanation: "Chlorophyll inside chloroplasts absorbs solar energy to convert carbon dioxide and water into glucose and oxygen. Stored glucose is converted to starch, tested using iodine (turns blue-black).",
    steps: [
      "Step 1: Light reaction: Chlorophyll traps solar energy to split water (photolysis)",
      "Step 2: Dark reaction: Carbon dioxide is reduced to synthesize glucose",
      "Step 3: Iodine test: Add iodine to leaf; blue-black color confirms starch presence"
    ]
  },
  {
    id: "bio_enzymes",
    subject: "Biology",
    topic: "Biochemistry",
    title: "Enzyme Kinetics and Thermal Denaturation",
    keywords: ["enzyme", "catalyst", "active site", "denaturation", "temperature", "pH", "pepsin", "substrate", "lock and key"],
    formula: "Enzyme + Substrate ➔ Enzyme-Substrate Complex ➔ Enzyme + Product",
    explanation: "Enzymes are biological protein catalysts with specific 3D active sites. Temperatures above optimum (>40°C) denature enzymes by breaking hydrogen bonds, permanently deforming the active site.",
    steps: [
      "Step 1: Substrate binds to specific complementary active site (Lock and Key model)",
      "Step 2: Activation energy is lowered, speeding up chemical transformation",
      "Step 3: Excessive heat or extreme pH alters 3D tertiary structure, causing denaturation"
    ]
  },
  {
    id: "bio_osmosis",
    subject: "Biology",
    topic: "Cell Transport Mechanisms",
    title: "Osmosis, Plasmolysis, and Turgor Pressure",
    keywords: ["osmosis", "diffusion", "semi-permeable", "turgid", "plasmolysis", "hypertonic", "hypotonic", "cell membrane", "water potential"],
    formula: "Water moves from High Water Potential (dilute) ➔ Low Water Potential (concentrated)",
    explanation: "Osmosis is the passive movement of water molecules across a selectively permeable membrane down a water potential gradient. Plant cells in hypertonic salt solutions lose water, resulting in plasmolysis.",
    steps: [
      "Step 1: Compare solute concentrations inside vs outside the cell",
      "Step 2: In hypertonic solutions, water leaves cell via osmosis",
      "Step 3: In hypotonic solutions, water enters cell, making plant cells turgid"
    ]
  },

  // ── CHEMISTRY ─────────────────────────────────────────────
  {
    id: "chem_moles_stoichiometry",
    subject: "Chemistry",
    topic: "Stoichiometry & Mole Concept",
    title: "Mole Calculations (n = m / M and C = n / V)",
    keywords: ["moles", "molar mass", "stoichiometry", "mass", "grams", "concentration", "molarity", "dm3", "solute"],
    formula: "Moles (n) = Mass (m) / Molar Mass (M) | Concentration (C) = Moles (n) / Volume (V in dm³)",
    explanation: "One mole contains Avogadro's number (6.022 × 10²³) of particles. Mass in grams divided by molar mass gives total moles. Concentration measures moles dissolved per cubic decimeter (dm³).",
    steps: [
      "Step 1: Moles = Mass (g) / Molar Mass (g/mol)",
      "Step 2: Convert volume to dm³ (cm³ ÷ 1000 = dm³)",
      "Step 3: Molarity = Moles / Volume (dm³)"
    ]
  },
  {
    id: "chem_acid_base_ph",
    subject: "Chemistry",
    topic: "Acids, Bases & Indicators",
    title: "pH Scale and Acid-Base Titration",
    keywords: ["acid", "base", "ph scale", "indicator", "litmus", "universal indicator", "titration", "neutralization", "hydrogen ion"],
    formula: "pH < 7 = Acidic (H⁺) | pH = 7 = Neutral | pH > 7 = Alkaline (OH⁻)",
    explanation: "Acids release hydrogen ions (H⁺) in aqueous solution turning Universal Indicator red (pH 1–3). Bases release hydroxide ions (OH⁻) turning indicator purple (pH 11–14). Neutralization forms salt and water.",
    steps: [
      "Step 1: Measure pH: pH 0–6 (Acidic), pH 7 (Neutral), pH 8–14 (Alkaline)",
      "Step 2: Universal Indicator colors: Red (strong acid), Green (neutral), Purple (strong base)",
      "Step 3: Acid + Base ➔ Salt + Water"
    ]
  },

  // ── COMPUTER STUDIES ──────────────────────────────────────
  {
    id: "cs_binary_conversion",
    subject: "Computer Studies",
    topic: "Data Representation",
    title: "Binary to Decimal Number Conversion",
    keywords: ["binary", "decimal", "base 2", "base 10", "bit", "byte", "number conversion", "radix", "hexadecimal"],
    formula: "Decimal = Sum of (Bit × 2^position)",
    explanation: "Computers store data in binary (base-2) using 0s and 1s. To convert binary to decimal, sum the active positional place values (128, 64, 32, 16, 8, 4, 2, 1).",
    steps: [
      "Step 1: Write down place values: 128, 64, 32, 16, 8, 4, 2, 1",
      "Step 2: Align binary digits under their corresponding place value",
      "Step 3: Add all place values that have a '1' above them"
    ]
  },
  {
    id: "cs_ram_vs_rom",
    subject: "Computer Studies",
    topic: "Computer Architecture",
    title: "RAM vs ROM Memory Architecture",
    keywords: ["ram", "rom", "primary memory", "volatile", "non volatile", "cpu", "storage", "firmware", "bios"],
    formula: "RAM = Temporary Volatile | ROM = Permanent Non-Volatile",
    explanation: "RAM (Random Access Memory) is high-speed volatile working memory that loses its contents when power is switched off. ROM (Read-Only Memory) is non-volatile permanent memory storing startup BIOS firmware.",
    steps: [
      "Step 1: RAM: Volatile, read/write, holds active programs",
      "Step 2: ROM: Non-volatile, read-only, holds bootloader firmware",
      "Step 3: Secondary Storage: SSD/HDD for long-term user file storage"
    ]
  },

  // ── BUSINESS STUDIES ──────────────────────────────────────
  {
    id: "bus_scarcity",
    subject: "Business Studies",
    topic: "Basic Economic Concepts",
    title: "Scarcity, Choice, and Opportunity Cost",
    keywords: ["scarcity", "choice", "opportunity cost", "wants", "resources", "capital", "economics", "trade off"],
    formula: "Opportunity Cost = Real cost of the next best alternative forgone",
    explanation: "Economic scarcity occurs because human wants are unlimited while productive resources (land, labor, capital) are limited. Scarcity forces economic choices, creating opportunity cost.",
    steps: [
      "Step 1: Identify limited resource (money, time, labor)",
      "Step 2: Evaluate competing alternative wants",
      "Step 3: The forgone alternative is the opportunity cost"
    ]
  },

  // ── GEOGRAPHY ─────────────────────────────────────────────
  {
    id: "geo_map_scale",
    subject: "Geography",
    topic: "Map Work & Landforms",
    title: "Map Scale and Ground Distance Calculation",
    keywords: ["map scale", "ground distance", "topographical map", "bearing", "representative fraction", "scale calculation"],
    formula: "Ground Distance (km) = (Map Distance in cm × Scale Factor) / 100,000",
    explanation: "A map scale of 1:50,000 means 1 cm on the map represents 50,000 cm (0.5 km) on the ground. Multiply map distance by scale factor and convert to km by dividing by 100,000.",
    steps: [
      "Step 1: Measure distance on map in cm",
      "Step 2: Multiply map cm by scale denominator (e.g. 50,000)",
      "Step 3: Divide total cm by 100,000 to get actual distance in kilometers (km)"
    ]
  }
];

export class LocalSearchEngine {
  constructor(documents = KNOWLEDGE_BASE) {
    this.documents = documents;
  }

  /**
   * Evaluates numerical queries to compute live physical/mathematical values on the fly.
   * e.g., "Ohm's law 12V 3A" -> R = 4 Ω, P = 36 W
   * e.g., "Circle radius 7" -> Area = 154 cm²
   * e.g., "Speed 100 km 2 hours" -> 50 km/h
   */
  evaluateLiveQueryValues(queryText) {
    if (!queryText || typeof queryText !== "string") return null;
    const lower = queryText.toLowerCase();

    // 1. Ohm's Law Evaluation: e.g. "12V 3A" or "voltage 24 current 2"
    const voltMatch = lower.match(/(\d+(?:\.\d+)?)\s*v/i);
    const ampMatch = lower.match(/(\d+(?:\.\d+)?)\s*a/i);
    const ohmMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:ohm|Ω)/i);

    if (voltMatch && ampMatch) {
      const v = parseFloat(voltMatch[1]);
      const i = parseFloat(ampMatch[1]);
      if (i > 0) {
        const r = (v / i).toFixed(2);
        const p = (v * i).toFixed(2);
        return {
          id: "live_calc_ohms",
          subject: "Physics",
          topic: "Electricity Calculation",
          title: `🧮 Live Calculation: Ohm's Law for ${v} V & ${i} A`,
          formula: `V = ${v} V | I = ${i} A ➔ Resistance R = ${r} Ω | Power P = ${p} W`,
          explanation: `Calculated values: Resistance R = V ÷ I = ${v} ÷ ${i} = ${r} Ω. Electrical Power P = V × I = ${v} × ${i} = ${p} Watts.`,
          steps: [
            `Step 1: Given V = ${v} V, I = ${i} A`,
            `Step 2: Resistance R = ${v} / ${i} = ${r} Ω`,
            `Step 3: Power P = ${v} × ${i} = ${p} W`
          ],
          isLiveCalculated: true
        };
      }
    }

    if (voltMatch && ohmMatch) {
      const v = parseFloat(voltMatch[1]);
      const r = parseFloat(ohmMatch[1]);
      if (r > 0) {
        const i = (v / r).toFixed(2);
        const p = ((v * v) / r).toFixed(2);
        return {
          id: "live_calc_ohms_vr",
          subject: "Physics",
          topic: "Electricity Calculation",
          title: `🧮 Live Calculation: Ohm's Law for ${v} V & ${r} Ω`,
          formula: `V = ${v} V | R = ${r} Ω ➔ Current I = ${i} A | Power P = ${p} W`,
          explanation: `Calculated values: Current I = V ÷ R = ${v} ÷ ${r} = ${i} Amperes. Power P = V² ÷ R = ${p} Watts.`,
          steps: [
            `Step 1: Given V = ${v} V, R = ${r} Ω`,
            `Step 2: Current I = ${v} / ${r} = ${i} A`,
            `Step 3: Power P = (${v}²) / ${r} = ${p} W`
          ],
          isLiveCalculated: true
        };
      }
    }

    // 2. Speed / Kinematics Evaluation: e.g. "100 km 2 hours"
    const distMatch = lower.match(/(\d+(?:\.\d+)?)\s*km/i);
    const timeMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hour|hr|h|second|sec|s)/i);

    if (distMatch && timeMatch) {
      const d = parseFloat(distMatch[1]);
      const t = parseFloat(timeMatch[1]);
      if (t > 0) {
        const s = (d / t).toFixed(1);
        return {
          id: "live_calc_speed",
          subject: "Mathematics / Physics",
          topic: "Kinematics Evaluation",
          title: `🧮 Live Calculation: Speed for ${d} km in ${t} hours`,
          formula: `Speed = Distance ÷ Time = ${d} km ÷ ${t} h = ${s} km/h`,
          explanation: `Calculated average speed: ${s} km/h. Distance covered = ${d} km over ${t} hours.`,
          steps: [
            `Step 1: Given Distance d = ${d} km, Time t = ${t} hours`,
            `Step 2: Speed = d / t = ${d} / ${t} = ${s} km/h`
          ],
          isLiveCalculated: true
        };
      }
    }

    // 3. Circle Geometry Evaluation: e.g. "circle radius 7"
    const radMatch = lower.match(/(?:radius|r)\s*=?\s*(\d+(?:\.\d+)?)/i);
    if (radMatch && lower.includes("circle")) {
      const r = parseFloat(radMatch[1]);
      const area = ((22 / 7) * r * r).toFixed(2);
      const circ = (2 * (22 / 7) * r).toFixed(2);
      return {
        id: "live_calc_circle",
        subject: "Mathematics",
        topic: "Geometry Evaluation",
        title: `🧮 Live Calculation: Circle with Radius r = ${r}`,
        formula: `Area = πr² = ${area} | Circumference = 2πr = ${circ}`,
        explanation: `Taking π ≈ 22/7: Area = (22/7) × ${r}² = ${area}. Circumference = 2 × (22/7) × ${r} = ${circ}.`,
        steps: [
          `Step 1: Radius r = ${r}`,
          `Step 2: Area = (22/7) × ${r}² = ${area}`,
          `Step 3: Circumference = 2 × (22/7) × ${r} = ${circ}`
        ],
        isLiveCalculated: true
      };
    }

    return null;
  }

  /**
   * Search offline knowledge base + calculate live parameter values.
   */
  search(queryText) {
    if (!queryText || typeof queryText !== "string") return [];
    const q = queryText.toLowerCase().trim();
    if (q.length < 2) return [];

    const results = [];

    // Check if query contains numerical parameters for live value evaluation
    const liveValueResult = this.evaluateLiveQueryValues(q);
    if (liveValueResult) {
      results.push(liveValueResult);
    }

    const queryTokens = q.split(/\s+/).filter(t => t.length > 1);

    this.documents.forEach((doc) => {
      let score = 0;
      const titleLower = doc.title.toLowerCase();
      const topicLower = doc.topic.toLowerCase();
      const subjectLower = doc.subject.toLowerCase();
      const explLower = doc.explanation.toLowerCase();
      const formulaLower = (doc.formula || "").toLowerCase();
      const keywords = doc.keywords || [];

      // Exact title match boost
      if (titleLower.includes(q)) score += 100;
      if (topicLower.includes(q)) score += 60;
      if (subjectLower.includes(q)) score += 30;

      // Token matching
      queryTokens.forEach((token) => {
        if (titleLower.includes(token)) score += 30;
        if (keywords.some(k => k.includes(token))) score += 25;
        if (formulaLower.includes(token)) score += 20;
        if (explLower.includes(token)) score += 10;

        // Prefix match
        if (titleLower.startsWith(token)) score += 15;
      });

      if (score > 0) {
        results.push({
          ...doc,
          score
        });
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  /**
   * Online Database Search: Queries live Supabase & IndexedDB database tables when connected.
   */
  async searchOnlineDatabase(queryText) {
    if (!queryText || typeof queryText !== "string") return [];
    const q = queryText.trim();
    if (q.length < 2) return [];

    const dbResults = [];

    // 1. Search local IndexedDB topics store
    try {
      const localTopics = await db.topics.filter(t => !t.is_deleted).toArray();
      localTopics.forEach(t => {
        const title = t.title || t.topic || "";
        if (title.toLowerCase().includes(q.toLowerCase())) {
          dbResults.push({
            id: `db_local_${t.id}`,
            subject: t.curriculum_id || "Database Topic",
            topic: t.chapter_id || "Live IndexedDB Record",
            title: `🌐 DB Topic: ${title}`,
            formula: t.formula || null,
            explanation: t.summary || t.content || `Live record retrieved from IndexedDB.`,
            isOnlineDatabaseRecord: true
          });
        }
      });
    } catch (err) {
      console.warn("IndexedDB search warning:", err);
    }

    // 2. Search Supabase remote database if online
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
              subject: item.curriculum_id || "Supabase Cloud",
              topic: item.chapter_id || "Live Cloud Database",
              title: `☁️ Cloud DB: ${item.title}`,
              explanation: item.summary || "Live topic record retrieved from Cloud Database.",
              isOnlineDatabaseRecord: true
            });
          });
        }
      } catch (err) {
        console.warn("Supabase online database search warning:", err);
      }
    }

    return dbResults;
  }
}

export const localSearchEngine = new LocalSearchEngine();
