/**
 * Geography Subject Mutator
 *
 * Intelligent Geography Engine:
 * - Map Work: Scale, Distance, Area, Bearings, Grid References, Gradient, Contours.
 * - Physical Geography: Tectonics, Volcanicity, Rivers, Weathering, Coasts, Glaciation.
 * - Climate: Rainfall, Temperature, Pressure, Winds, Climate Classification.
 * - Human Geography: Population, Settlement, Agriculture, Industry, Transport, Trade.
 * - Environmental Geography: Conservation, Hazards, Resources, Sustainability.
 * - Generates diagnostic MCQs, open responses, error checks and rule explanations.
 *
 * Design principle:
 * Do not merely change the wording of a question.
 * Change the REPRESENTATION of the same geographic concept.
 */

export class GeographyMutator {
  mutate(qObj, modalityIndex = null) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();
    if (!stem) return null;

    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "").trim();

    const mode =
      typeof modalityIndex === "number"
        ? Math.abs(modalityIndex) % 4
        : Math.floor(Math.random() * 4);

    // ------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------

    const formatNumber = (value, decimals = 2) => {
      const rounded = Number(value.toFixed(decimals));
      return rounded.toLocaleString();
    };

    const shuffle = (arr) => {
      return [...arr].sort(() => Math.random() - 0.5);
    };

    const uniqueOptions = (correct, distractors) => {
      return shuffle(
        [...new Set([correct, ...distractors])]
          .filter(Boolean)
          .slice(0, 4)
      );
    };

    const makeResult = ({
      q,
      ans,
      hint,
      why,
      sol = ans,
      steps = [],
      type = "open_response",
      options = null,
      concept = "Geography"
    }) => ({
      ...qObj,
      q,
      ans,
      hint,
      why,
      sol,
      steps,
      type,
      options,
      concept,
      subject: "Geography"
    });

    // ============================================================
    // 1. MAP WORK ENGINE
    // ============================================================

    if (
      lower.includes("map") ||
      lower.includes("scale") ||
      lower.includes("grid") ||
      lower.includes("bearing") ||
      lower.includes("distance") ||
      lower.includes("contour") ||
      lower.includes("gradient") ||
      lower.includes("topographical")
    ) {
      const mapTopics = [];

      if (
        lower.includes("scale") ||
        lower.includes("distance") ||
        lower.includes("map")
      ) {
        mapTopics.push("scale");
      }

      if (lower.includes("bearing")) mapTopics.push("bearing");
      if (lower.includes("grid")) mapTopics.push("grid");
      if (lower.includes("contour") || lower.includes("gradient")) {
        mapTopics.push("gradient");
      }

      const selectedTopic =
        mapTopics[Math.floor(Math.random() * mapTopics.length)] || "scale";

      // ----------------------------------------------------------
      // SCALE / DISTANCE
      // ----------------------------------------------------------

      if (selectedTopic === "scale") {
        const scales = [25000, 50000, 100000];
        const scale = scales[Math.floor(Math.random() * scales.length)];

        const mapDistance = Math.floor(Math.random() * 10) + 4;

        const groundMeters = mapDistance * scale;
        const groundKm = groundMeters / 100000;

        const answer = `${formatNumber(groundKm)} km`;

        const distractors = [
          `${formatNumber(groundKm * 10)} km`,
          `${formatNumber(groundKm / 2)} km`,
          `${formatNumber(groundKm * 2)} km`
        ];

        if (mode === 0) {
          return makeResult({
            q:
              `A road measures ${mapDistance} cm on a topographical map ` +
              `with a scale of 1:${scale.toLocaleString()}. ` +
              `Calculate the actual ground distance in kilometres.`,
            ans: answer,
            hint:
              "Multiply the map distance by the scale denominator, " +
              "then convert centimetres to kilometres.",
            why:
              `Ground distance = ${mapDistance} × ${scale.toLocaleString()} cm ` +
              `= ${groundMeters.toLocaleString()} cm = ${answer}.`,
            sol: answer,
            steps: [
              `Step 1: Map distance = ${mapDistance} cm`,
              `Step 2: Ground distance = ${mapDistance} × ${scale.toLocaleString()} = ${groundMeters.toLocaleString()} cm`,
              `Step 3: Convert cm to km by dividing by 100,000`,
              `Step 4: Ground distance = ${answer}`
            ],
            type: "open_response",
            concept: "Map Scale and Ground Distance"
          });
        }

        if (mode === 1) {
          return makeResult({
            q:
              `A road is ${mapDistance} cm long on a 1:${scale.toLocaleString()} ` +
              `map. What is its actual ground distance?`,
            ans: answer,
            hint:
              "Use: Ground distance (km) = map distance (cm) × scale ÷ 100,000.",
            why:
              `${mapDistance} × ${scale.toLocaleString()} ÷ 100,000 = ${answer}.`,
            sol: answer,
            steps: [
              "Step 1: Identify map distance",
              "Step 2: Multiply by scale denominator",
              "Step 3: Convert centimetres to kilometres",
              "Step 4: Select the matching distance"
            ],
            type: "mcq",
            options: uniqueOptions(answer, distractors),
            concept: "Map Scale and Ground Distance"
          });
        }

        if (mode === 2) {
          const wrongDistance = groundKm * 10;

          return makeResult({
            q:
              `A student says that ${mapDistance} cm on a ` +
              `1:${scale.toLocaleString()} map represents ` +
              `${formatNumber(wrongDistance)} km on the ground. ` +
              `Is the calculation correct?`,
            ans: `Incorrect. The correct ground distance is ${answer}.`,
            hint:
              "Check the conversion from centimetres to kilometres.",
            why:
              `The scale gives ${groundMeters.toLocaleString()} cm, ` +
              `which is ${answer}, not ${formatNumber(wrongDistance)} km.`,
            sol: `Incorrect. Correct distance = ${answer}.`,
            steps: [
              `Step 1: Multiply ${mapDistance} cm by ${scale.toLocaleString()}`,
              `Step 2: Obtain ${groundMeters.toLocaleString()} cm`,
              "Step 3: Divide by 100,000 to convert to kilometres",
              `Step 4: Correct answer = ${answer}`
            ],
            type: "open_response",
            concept: "Map Scale Error Diagnosis"
          });
        }

        return makeResult({
          q:
            `State the formula for finding ground distance from map distance ` +
            `and calculate the ground distance represented by ${mapDistance} cm ` +
            `on a 1:${scale.toLocaleString()} map.`,
          ans:
            `Ground Distance = (Map Distance × Scale Denominator) ÷ 100,000. ` +
            `Answer = ${answer}.`,
          hint:
            "Remember that 100,000 cm = 1 km.",
          why:
            `(${mapDistance} × ${scale.toLocaleString()}) ÷ 100,000 = ${answer}.`,
          sol: answer,
          steps: [
            "Step 1: Write the scale-distance formula",
            "Step 2: Substitute the map distance",
            "Step 3: Convert centimetres into kilometres",
            `Step 4: Obtain ${answer}`
          ],
          type: "open_response",
          concept: "Map Scale Formula"
        });
      }

      // ----------------------------------------------------------
      // BEARINGS
      // ----------------------------------------------------------

      if (selectedTopic === "bearing") {
        const bearing = [35, 60, 120, 145, 210, 275, 320][
          Math.floor(Math.random() * 7)
        ];

        const reverseBearing = (bearing + 180) % 360 || 360;

        const answer = `${String(reverseBearing).padStart(3, "0")}°`;

        const distractors = [
          `${String((bearing + 90) % 360 || 360).padStart(3, "0")}°`,
          `${String((360 - bearing) % 360 || 360).padStart(3, "0")}°`,
          `${String(Math.abs(180 - bearing) || 360).padStart(3, "0")}°`
        ];

        if (mode === 0 || mode === 1) {
          return makeResult({
            q:
              `A settlement A has a bearing of ${String(bearing).padStart(
                3,
                "0"
              )}° from settlement B. ` +
              `What is the bearing of B from A?`,
            ans: answer,
            hint:
              "The back bearing is found by adding or subtracting 180°.",
            why:
              `Back bearing = ${bearing}° + 180° = ${answer}.`,
            sol: answer,
            steps: [
              `Step 1: Original bearing = ${bearing}°`,
              "Step 2: Add 180° because the direction is reversed",
              `Step 3: Back bearing = ${answer}`
            ],
            type: mode === 0 ? "open_response" : "mcq",
            options:
              mode === 1
                ? uniqueOptions(answer, distractors)
                : null,
            concept: "Three-Figure Bearings"
          });
        }

        return makeResult({
          q:
            `A student gives the back bearing of ${bearing}° as ` +
            `${String((bearing + 90) % 360 || 360).padStart(3, "0")}°. ` +
            `Explain the error and give the correct bearing.`,
          ans:
            `The student is incorrect. The correct back bearing is ${answer}.`,
          hint:
            "Reverse bearings differ by exactly 180°.",
          why:
            `A back bearing is obtained by adding 180° when the original ` +
            `bearing is less than 180° or subtracting 180° when it is greater.`,
          sol: answer,
          steps: [
            "Step 1: Identify the original bearing",
            "Step 2: Reverse the direction by 180°",
            `Step 3: Correct bearing = ${answer}`
          ],
          type: "open_response",
          concept: "Bearing Error Diagnosis"
        });
      }

      // ----------------------------------------------------------
      // CONTOUR / GRADIENT
      // ----------------------------------------------------------

      if (selectedTopic === "gradient") {
        const verticalInterval = [10, 20, 50][
          Math.floor(Math.random() * 3)
        ];

        const contourDifference = Math.floor(Math.random() * 6) + 3;
        const horizontalDistance =
          (Math.floor(Math.random() * 8) + 2) * 100;

        const verticalRise = verticalInterval * contourDifference;

        const gradientRatio =
          horizontalDistance / verticalRise;

        const ratio = Math.round(gradientRatio);

        return makeResult({
          q:
            `Two points on a topographical map have a vertical difference ` +
            `of ${verticalRise} m and a horizontal ground distance of ` +
            `${horizontalDistance} m. Calculate the gradient as a ratio ` +
            `of vertical interval to horizontal distance.`,
          ans: `1:${ratio}`,
          hint:
            "Gradient = vertical interval ÷ horizontal distance. Express it as 1:n.",
          why:
            `Gradient = ${verticalRise} ÷ ${horizontalDistance}. ` +
            `Therefore the approximate ratio is 1:${ratio}.`,
          sol: `1:${ratio}`,
          steps: [
            `Step 1: Vertical interval = ${verticalRise} m`,
            `Step 2: Horizontal distance = ${horizontalDistance} m`,
            "Step 3: Divide vertical interval by horizontal distance",
            `Step 4: Express the result as 1:${ratio}`
          ],
          type: "open_response",
          concept: "Contour Gradient"
        });
      }
    }

    // ============================================================
    // 2. CLIMATE & WEATHER ENGINE
    // ============================================================

    if (
      lower.includes("climate") ||
      lower.includes("weather") ||
      lower.includes("rainfall") ||
      lower.includes("temperature") ||
      lower.includes("humidity") ||
      lower.includes("pressure") ||
      lower.includes("wind") ||
      lower.includes("rain")
    ) {
      const climateCases = [
        {
          clue:
            "mean annual temperature of about 27°C, very small annual temperature range, " +
            "high humidity and rainfall throughout most months",
          answer: "Equatorial climate",
          why:
            "Persistent high temperatures and rainfall throughout the year are characteristic of equatorial climates.",
          distractors: [
            "Hot desert climate",
            "Mediterranean climate",
            "Tropical continental climate"
          ]
        },
        {
          clue:
            "high temperatures, very low annual rainfall, clear skies and large daily temperature ranges",
          answer: "Hot desert climate",
          why:
            "Very low rainfall and clear, dry conditions characterize hot desert environments.",
          distractors: [
            "Equatorial climate",
            "Tropical rainforest climate",
            "Polar climate"
          ]
        },
        {
          clue:
            "hot wet summers and cool dry winters, with most rainfall occurring during summer",
          answer: "Tropical savanna climate",
          why:
            "A distinct wet and dry season is characteristic of tropical savanna regions.",
          distractors: [
            "Equatorial climate",
            "Mediterranean climate",
            "Hot desert climate"
          ]
        },
        {
          clue:
            "hot dry summers and mild wet winters",
          answer: "Mediterranean climate",
          why:
            "Mediterranean climates are defined by dry summers and wetter winters.",
          distractors: [
            "Equatorial climate",
            "Tropical savanna climate",
            "Hot desert climate"
          ]
        }
      ];

      const selected =
        climateCases[Math.floor(Math.random() * climateCases.length)];

      if (mode === 0) {
        return makeResult({
          q:
            `A weather station records the following conditions: ${selected.clue}. ` +
            `Identify the most likely climatic region.`,
          ans: selected.answer,
          hint:
            "Match the temperature and rainfall pattern with the defining characteristics of major climate zones.",
          why: selected.why,
          sol: selected.answer,
          steps: [
            "Step 1: Examine temperature characteristics",
            "Step 2: Examine rainfall distribution",
            "Step 3: Compare the evidence with climate-zone characteristics",
            `Step 4: Identify ${selected.answer}`
          ],
          type: "open_response",
          concept: "Climate Classification"
        });
      }

      if (mode === 1) {
        return makeResult({
          q:
            `Which climate is most strongly associated with the following conditions? ` +
            `${selected.clue}.`,
          ans: selected.answer,
          hint:
            "Look at both rainfall amount/distribution and temperature pattern.",
          why: selected.why,
          sol: selected.answer,
          steps: [
            "Step 1: Identify temperature pattern",
            "Step 2: Identify rainfall pattern",
            "Step 3: Eliminate climates with incompatible characteristics",
            "Step 4: Select the best match"
          ],
          type: "mcq",
          options: uniqueOptions(selected.answer, selected.distractors),
          concept: "Climate Classification"
        });
      }

      return makeResult({
        q:
          `A student identifies the climate described as "${selected.clue}" ` +
          `as a different climate zone. Explain why that classification is wrong ` +
          `and identify the correct climate.`,
        ans:
          `The correct classification is ${selected.answer}. ${selected.why}`,
        hint:
          "Compare the observed rainfall and temperature pattern with climate definitions.",
        why: selected.why,
        sol: selected.answer,
        steps: [
          "Step 1: Extract temperature evidence",
          "Step 2: Extract rainfall evidence",
          "Step 3: Compare the evidence with climate characteristics",
          `Step 4: Correct classification = ${selected.answer}`
        ],
        type: "open_response",
        concept: "Climate Diagnostic Reasoning"
      });
    }

    // ============================================================
    // 3. TECTONICS & VOLCANICITY
    // ============================================================

    if (
      lower.includes("plate") ||
      lower.includes("tectonic") ||
      lower.includes("fault") ||
      lower.includes("fold") ||
      lower.includes("volcan") ||
      lower.includes("earthquake") ||
      lower.includes("rift") ||
      lower.includes("mountain")
    ) {
      const tectonicCases = [
        {
          clue:
            "Tensional forces pull the crust apart and the central block moves downward between parallel faults.",
          answer: "Rift valley",
          why:
            "Tensional forces produce normal faults, allowing the central block to subside and form a graben or rift valley.",
          distractors: [
            "Fold mountain",
            "Block mountain",
            "Volcanic cone"
          ]
        },
        {
          clue:
            "Compressional forces cause rock layers to bend without breaking.",
          answer: "Fold mountains",
          why:
            "Compression can buckle and fold sedimentary rock layers, producing fold mountains.",
          distractors: [
            "Rift valley",
            "Fault-block mountain",
            "Volcanic plateau"
          ]
        },
        {
          clue:
            "A block of crust is uplifted between two approximately parallel faults.",
          answer: "Block mountain",
          why:
            "An uplifted crustal block between faults forms a horst or block mountain.",
          distractors: [
            "Rift valley",
            "Fold mountain",
            "Volcanic crater"
          ]
        },
        {
          clue:
            "Magma rises through weaknesses in the crust and accumulates around a vent after repeated eruptions.",
          answer: "Volcanic cone",
          why:
            "Repeated deposition of lava and pyroclastic material around a volcanic vent can form a volcanic cone.",
          distractors: [
            "Rift valley",
            "Fold mountain",
            "Block mountain"
          ]
        }
      ];

      const selected =
        tectonicCases[Math.floor(Math.random() * tectonicCases.length)];

      return makeResult({
        q:
          `[Tectonic Process Investigation] ${selected.clue} ` +
          `Which landform or feature results?`,
        ans: selected.answer,
        hint:
          "Identify the tectonic force first, then determine how the crust moves.",
        why: selected.why,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the tectonic force",
          "Step 2: Determine whether the crust is compressed, extended or displaced",
          "Step 3: Identify the resulting crustal structure",
          `Step 4: Conclude ${selected.answer}`
        ],
        type: mode === 0 ? "open_response" : "mcq",
        options:
          mode === 0
            ? null
            : uniqueOptions(selected.answer, selected.distractors),
        concept: "Tectonics and Landform Formation"
      });
    }

    // ============================================================
    // 4. RIVER GEOMORPHOLOGY
    // ============================================================

    if (
      lower.includes("river") ||
      lower.includes("erosion") ||
      lower.includes("waterfall") ||
      lower.includes("meander") ||
      lower.includes("oxbow") ||
      lower.includes("delta") ||
      lower.includes("floodplain") ||
      lower.includes("levee")
    ) {
      const riverCases = [
        {
          process:
            "vertical erosion dominates in the youthful stage of a river",
          feature: "V-shaped valley",
          explanation:
            "Strong vertical erosion cuts downward into the river channel, producing steep-sided V-shaped valleys."
        },
        {
          process:
            "lateral erosion and deposition act around a pronounced river bend",
          feature: "Meander",
          explanation:
            "Differences in velocity around a bend cause erosion on the outer bank and deposition on the inner bank."
        },
        {
          process:
            "a meander loop becomes cut off from the main river channel",
          feature: "Oxbow lake",
          explanation:
            "Erosion can narrow the meander neck until the river takes a shorter course, leaving the former loop isolated."
        },
        {
          process:
            "a river deposits large quantities of sediment at its mouth where velocity decreases",
          feature: "Delta",
          explanation:
            "Reduced river velocity near the mouth encourages deposition of transported sediment, potentially forming a delta."
        }
      ];

      const selected =
        riverCases[Math.floor(Math.random() * riverCases.length)];

      return makeResult({
        q:
          `[Fluvial Geomorphology] A river is experiencing ${selected.process}. ` +
          `Which landform is most likely to develop?`,
        ans: selected.feature,
        hint:
          "Trace the dominant river process—erosion, transportation or deposition—to the resulting landform.",
        why: selected.explanation,
        sol: selected.feature,
        steps: [
          "Step 1: Identify the dominant river process",
          "Step 2: Determine where and how the process acts",
          "Step 3: Link the process to a characteristic landform",
          `Step 4: Identify ${selected.feature}`
        ],
        type: mode === 0 ? "open_response" : "mcq",
        options:
          mode === 0
            ? null
            : uniqueOptions(selected.feature, [
                "Waterfall",
                "Floodplain",
                "V-shaped valley",
                "Gorge"
              ]),
        concept: "Fluvial Processes and Landforms"
      });
    }

    // ============================================================
    // 5. WEATHERING
    // ============================================================

    if (
      lower.includes("weathering") ||
      lower.includes("weathered") ||
      lower.includes("exfoliation") ||
      lower.includes("carbonation") ||
      lower.includes("oxidation") ||
      lower.includes("freeze")
    ) {
      const weatheringCases = [
        {
          clue:
            "rocks repeatedly expand during the day and contract as temperatures fall at night",
          answer: "Thermal expansion and contraction",
          explanation:
            "Repeated heating and cooling create stresses within rocks that can eventually cause them to crack and disintegrate."
        },
        {
          clue:
            "carbon dioxide dissolves in rainwater and reacts with limestone",
          answer: "Carbonation",
          explanation:
            "Carbonic acid formed from carbon dioxide and water reacts with calcium carbonate in limestone."
        },
        {
          clue:
            "water enters cracks, freezes, expands and repeatedly widens the cracks",
          answer: "Freeze-thaw weathering",
          explanation:
            "Water expands when it freezes, exerting pressure on cracks and gradually breaking the rock apart."
        },
        {
          clue:
            "iron-bearing minerals react with oxygen and form iron oxides",
          answer: "Oxidation",
          explanation:
            "Oxygen reacts with iron-bearing minerals, weakening the rock and producing iron oxides."
        }
      ];

      const selected =
        weatheringCases[Math.floor(Math.random() * weatheringCases.length)];

      return makeResult({
        q:
          `[Weathering Investigation] ${selected.clue}. ` +
          `Which type of weathering is involved?`,
        ans: selected.answer,
        hint:
          "Focus on the physical or chemical change taking place in the rock.",
        why: selected.explanation,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the environmental condition",
          "Step 2: Identify the change occurring in the rock",
          "Step 3: Classify the weathering process",
          `Step 4: Answer ${selected.answer}`
        ],
        type: "mcq",
        options: uniqueOptions(selected.answer, [
          "Hydrolysis",
          "Carbonation",
          "Exfoliation",
          "Biological weathering"
        ]),
        concept: "Weathering Processes"
      });
    }

    // ============================================================
    // 6. COASTAL GEOGRAPHY
    // ============================================================

    if (
      lower.includes("coast") ||
      lower.includes("wave") ||
      lower.includes("beach") ||
      lower.includes("spit") ||
      lower.includes("stack") ||
      lower.includes("arch") ||
      lower.includes("cliff") ||
      lower.includes("longshore")
    ) {
      const coastalCases = [
        {
          clue:
            "waves erode a weakness in a headland until the opening develops completely through the rock",
          answer: "Arch",
          explanation:
            "Hydraulic action and abrasion can enlarge a weakness into an opening called an arch."
        },
        {
          clue:
            "the roof of a coastal arch collapses because of continued erosion",
          answer: "Stack",
          explanation:
            "When an arch collapses, an isolated pillar of resistant rock may remain as a stack."
        },
        {
          clue:
            "sediment is transported along the coastline by waves approaching at an angle",
          answer: "Longshore drift",
          explanation:
            "Swash moves material up the beach at an angle while backwash returns it downslope, producing net sediment movement along the coast."
        },
        {
          clue:
            "sediment is deposited across the mouth of a sheltered bay by longshore drift",
          answer: "Spit",
          explanation:
            "Longshore drift can extend a ridge of deposited sediment from the coast to form a spit."
        }
      ];

      const selected =
        coastalCases[Math.floor(Math.random() * coastalCases.length)];

      return makeResult({
        q:
          `[Coastal Processes] ${selected.clue}. ` +
          `Identify the resulting feature or process.`,
        ans: selected.answer,
        hint:
          "Follow the sequence of erosion or deposition described in the scenario.",
        why: selected.explanation,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the coastal process",
          "Step 2: Determine whether erosion or deposition dominates",
          "Step 3: Follow the sequence of landform development",
          `Step 4: Identify ${selected.answer}`
        ],
        type: mode === 0 ? "open_response" : "mcq",
        options:
          mode === 0
            ? null
            : uniqueOptions(selected.answer, [
                "Beach",
                "Wave-cut platform",
                "Cliff",
                "Delta"
              ]),
        concept: "Coastal Processes and Landforms"
      });
    }

    // ============================================================
    // 7. POPULATION & SETTLEMENT
    // ============================================================

    if (
      lower.includes("population") ||
      lower.includes("birth rate") ||
      lower.includes("death rate") ||
      lower.includes("migration") ||
      lower.includes("settlement") ||
      lower.includes("urban") ||
      lower.includes("rural") ||
      lower.includes("density")
    ) {
      const cases = [
        {
          clue:
            "a country has a high birth rate and rapidly falling death rate",
          answer: "Rapid natural population increase",
          explanation:
            "When births greatly exceed deaths, the natural increase in population becomes high."
        },
        {
          clue:
            "many people move from rural areas to cities in search of employment",
          answer: "Rural-urban migration",
          explanation:
            "Movement from rural areas toward urban centres is classified as rural-urban migration."
        },
        {
          clue:
            "a region has a very large population concentrated within a small land area",
          answer: "High population density",
          explanation:
            "Population density measures the number of people relative to the area occupied."
        }
      ];

      const selected =
        cases[Math.floor(Math.random() * cases.length)];

      return makeResult({
        q:
          `[Population Geography] ${selected.clue}. ` +
          `What geographic concept best describes this situation?`,
        ans: selected.answer,
        hint:
          "Identify the population variable or movement described.",
        why: selected.explanation,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the population phenomenon",
          "Step 2: Determine the relationship between the variables",
          "Step 3: Apply the correct geographic term",
          `Step 4: Conclude ${selected.answer}`
        ],
        type: "mcq",
        options: uniqueOptions(selected.answer, [
          "Population decline",
          "Urban decentralization",
          "International migration",
          "Low population density"
        ]),
        concept: "Population Geography"
      });
    }

    // ============================================================
    // 8. AGRICULTURAL GEOGRAPHY
    // ============================================================

    if (
      lower.includes("agriculture") ||
      lower.includes("farming") ||
      lower.includes("crop") ||
      lower.includes("livestock") ||
      lower.includes("plantation") ||
      lower.includes("irrigation")
    ) {
      const agricultureCases = [
        {
          clue:
            "farmers grow tea on cool, wet highlands with well-drained acidic soils",
          answer: "Commercial plantation farming",
          explanation:
            "Tea grown over large areas for sale and processing is commonly associated with commercial plantation agriculture."
        },
        {
          clue:
            "farmers depend on artificial application of water because rainfall is unreliable",
          answer: "Irrigated agriculture",
          explanation:
            "Irrigation supplements natural rainfall to provide crops with water."
        },
        {
          clue:
            "a farmer grows crops and keeps livestock on the same farm",
          answer: "Mixed farming",
          explanation:
            "Mixed farming combines crop production with livestock rearing."
        }
      ];

      const selected =
        agricultureCases[Math.floor(Math.random() * agricultureCases.length)];

      return makeResult({
        q:
          `[Agricultural Geography] ${selected.clue}. ` +
          `Which type of agricultural activity is represented?`,
        ans: selected.answer,
        hint:
          "Look at the farming system, environmental conditions and purpose of production.",
        why: selected.explanation,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the agricultural activity",
          "Step 2: Examine its environmental or economic characteristics",
          "Step 3: Match the evidence to a farming system",
          `Step 4: Identify ${selected.answer}`
        ],
        type: "mcq",
        options: uniqueOptions(selected.answer, [
          "Nomadic pastoralism",
          "Subsistence farming",
          "Shifting cultivation",
          "Extensive ranching"
        ]),
        concept: "Agricultural Geography"
      });
    }

    // ============================================================
    // 9. ENVIRONMENT & CONSERVATION
    // ============================================================

    if (
      lower.includes("conservation") ||
      lower.includes("environment") ||
      lower.includes("deforestation") ||
      lower.includes("pollution") ||
      lower.includes("sustainable") ||
      lower.includes("resource")
    ) {
      const cases = [
        {
          clue:
            "trees are planted on degraded land to reduce soil erosion and restore vegetation",
          answer: "Afforestation",
          explanation:
            "Afforestation involves establishing trees on land that was previously without forest."
        },
        {
          clue:
            "farmers cultivate crops across rather than down a slope to reduce surface runoff",
          answer: "Contour farming",
          explanation:
            "Cultivating along contour lines interrupts runoff and reduces soil erosion on slopes."
        },
        {
          clue:
            "a community uses a resource at a rate that allows natural regeneration to continue",
          answer: "Sustainable resource use",
          explanation:
            "Sustainability requires resource use to remain within the capacity of the environment to regenerate."
        }
      ];

      const selected =
        cases[Math.floor(Math.random() * cases.length)];

      return makeResult({
        q:
          `[Environmental Geography] ${selected.clue}. ` +
          `Which environmental management concept best describes the practice?`,
        ans: selected.answer,
        hint:
          "Focus on the purpose of the environmental management practice.",
        why: selected.explanation,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the environmental problem",
          "Step 2: Identify the management action",
          "Step 3: Determine the intended environmental outcome",
          `Step 4: Identify ${selected.answer}`
        ],
        type: mode === 0 ? "open_response" : "mcq",
        options:
          mode === 0
            ? null
            : uniqueOptions(selected.answer, [
                "Overexploitation",
                "Deforestation",
                "Desertification",
                "Open-cast mining"
              ]),
        concept: "Environmental Conservation"
      });
    }

    // ============================================================
    // 10. REVERSE INQUIRY
    // ============================================================

    if (rawAns.length > 3) {
      const genericDistractors = [
        "A tectonic process unrelated to the observed feature",
        "A climatic process that does not explain the observation",
        "A human activity with no direct relationship to the outcome"
      ];

      return makeResult({
        q:
          `[Geographic Reasoning] Regarding the following question:\n` +
          `"${stem}"\n\n` +
          `Which geographic principle, process or relationship explains the answer?`,
        ans: rawAns,
        hint:
          qObj.hint ||
          "Connect the observed geographic pattern to the physical or human process causing it.",
        why:
          qObj.why ||
          `The answer is explained by the geographic relationship represented by: ${rawAns}.`,
        sol:
          qObj.sol ||
          qObj.why ||
          rawAns,
        steps: [
          "Step 1: Identify the geographic phenomenon",
          "Step 2: Identify the relevant physical or human process",
          "Step 3: Establish the cause-and-effect relationship",
          "Step 4: State the geographic principle"
        ],
        type: "mcq",
        options: uniqueOptions(rawAns, genericDistractors),
        concept: "Geographic Reasoning"
      });
    }

    // ============================================================
    // 11. SAFE FALLBACK
    // ============================================================

    return {
      ...qObj,

      q: `[Geographic Reasoning Check] ${stem}`,

      hint:
        qObj.hint ||
        "Identify the geographic process, evidence and relationship involved.",

      why:
        qObj.why ||
        "A strong geographic answer should connect evidence to a geographic process or concept.",

      steps: [
        "Step 1: Identify the geographic phenomenon",
        "Step 2: Extract the important evidence",
        "Step 3: Apply the relevant geographic principle",
        "Step 4: Explain the cause, process or consequence"
      ],

      subject: "Geography",
      concept: "General Geographic Reasoning"
    };
  }
}