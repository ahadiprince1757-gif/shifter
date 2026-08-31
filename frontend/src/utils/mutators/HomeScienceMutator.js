/**
 * Home Science Subject Mutator
 *
 * Intelligent Home Science Engine:
 * - Nutrition, deficiency diseases & balanced diets
 * - Food hygiene, safety & preservation
 * - First aid & household health
 * - Textile fibres, clothing care & laundry
 * - Consumer education & budgeting
 * - Child development & family resource management
 * - Housing, sanitation & environmental hygiene
 * - Practical case-study reasoning
 * - Four-mode adaptive assessment:
 *      0 = Recall / Open Response
 *      1 = MCQ
 *      2 = Error Detection
 *      3 = Explain / Apply
 *
 * Design principle:
 * Don't merely change numbers/words.
 * Change the ANGLE from which the learner must demonstrate mastery.
 */

export class HomeScienceMutator {
  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "").trim();

    const mode =
      typeof modalityIndex === "number"
        ? Math.abs(Math.floor(modalityIndex)) % 4
        : Math.floor(Math.random() * 4);

    // ------------------------------------------------------------
    // Utility functions
    // ------------------------------------------------------------

    const shuffle = (arr) => {
      const copy = [...arr];

      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }

      return copy;
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
      concept = "Home Science",
      difficulty = "medium",
    }) => ({
      q,
      ans,
      hint,
      why: why || `The correct principle is ${ans}.`,
      sol,
      steps,
      type,
      options,
      concept,
      difficulty,
      subject: "Home Science",
    });

    // ------------------------------------------------------------
    // 1. NUTRITION & DEFICIENCY DISEASES
    // ------------------------------------------------------------

    if (
      lower.includes("nutrition") ||
      lower.includes("nutrient") ||
      lower.includes("vitamin") ||
      lower.includes("protein") ||
      lower.includes("carbohydrate") ||
      lower.includes("fat") ||
      lower.includes("mineral") ||
      lower.includes("diet") ||
      lower.includes("kwashiorkor") ||
      lower.includes("marasmus") ||
      lower.includes("scurvy") ||
      lower.includes("rickets") ||
      lower.includes("anaemia") ||
      lower.includes("anemia") ||
      lower.includes("deficiency") ||
      lower.includes("balanced diet")
    ) {
      const cases = [
        {
          condition: "Kwashiorkor",
          scenario:
            "A young child has severe growth retardation, oedema, muscle wasting and changes in hair and skin after prolonged inadequate protein intake.",
          nutrient: "Protein",
          remedy:
            "Gradually introduce adequate protein-rich foods such as eggs, milk, fish, meat, legumes and other suitable protein sources.",
          cause: "Severe protein deficiency",
          distractors: [
            "Vitamin C deficiency",
            "Excess dietary fibre",
            "Excess water intake",
          ],
          hint:
            "Look for oedema, growth failure and severe protein deficiency.",
        },

        {
          condition: "Scurvy",
          scenario:
            "A person develops bleeding gums, poor wound healing and weakness after a prolonged diet lacking fresh fruits and vegetables.",
          nutrient: "Vitamin C",
          remedy:
            "Include vitamin-C-rich foods such as oranges, guavas, lemons, tomatoes and fresh vegetables.",
          cause: "Vitamin C deficiency",
          distractors: [
            "Vitamin D deficiency",
            "Iron deficiency",
            "Vitamin B1 deficiency",
          ],
          hint:
            "Bleeding gums and poor wound healing strongly indicate vitamin C deficiency.",
        },

        {
          condition: "Rickets",
          scenario:
            "A growing child develops weak, poorly mineralized bones and skeletal deformities.",
          nutrient: "Vitamin D",
          remedy:
            "Provide adequate vitamin D through appropriate foods and safe exposure to sunlight, together with sufficient calcium.",
          cause: "Vitamin D deficiency affecting calcium absorption and bone mineralization",
          distractors: [
            "Vitamin C deficiency",
            "Protein deficiency only",
            "Excess carbohydrate intake",
          ],
          hint:
            "Think about bone mineralization and calcium absorption.",
        },

        {
          condition: "Iron-deficiency anaemia",
          scenario:
            "A student frequently feels tired, weak and short of breath and has pale inner eyelids.",
          nutrient: "Iron",
          remedy:
            "Increase iron-rich foods such as meat, liver, beans, dark green vegetables and fortified foods where appropriate.",
          cause: "Insufficient iron for normal haemoglobin production",
          distractors: [
            "Vitamin D deficiency",
            "Iodine excess",
            "Vitamin C toxicity",
          ],
          hint:
            "Paleness, fatigue and weakness are common signs associated with anaemia.",
        },

        {
          condition: "Marasmus",
          scenario:
            "An infant has severe wasting, very low body weight and loss of muscle and body fat due to prolonged inadequate energy intake.",
          nutrient: "Energy and protein",
          remedy:
            "Provide appropriate energy- and protein-rich nutrition under suitable health guidance.",
          cause: "Severe deficiency of energy and nutrients",
          distractors: [
            "Excess vitamin intake",
            "Excess dietary fibre",
            "Excess calcium intake",
          ],
          hint:
            "Severe wasting without prominent oedema points toward marasmus.",
        },
      ];

      const selected = cases[Math.floor(Math.random() * cases.length)];

      if (mode === 0) {
        return makeResult({
          q: `[Nutrition Case Study]\n${selected.scenario}\n\nWhich nutrient deficiency is most strongly associated with this condition?`,
          ans: selected.nutrient,
          hint: selected.hint,
          why: `${selected.condition} is associated with ${selected.cause}.`,
          sol: selected.nutrient,
          steps: [
            `Step 1: Identify the major symptoms: ${selected.scenario}`,
            `Step 2: Connect the symptoms to the deficiency pattern.`,
            `Step 3: Identify the missing nutrient: ${selected.nutrient}.`,
          ],
          type: "open_response",
          concept: "Nutrition & deficiency diseases",
        });
      }

      if (mode === 1) {
        return makeResult({
          q: `[Nutrition Diagnosis]\n${selected.scenario}\n\nWhich nutrient is most likely deficient?`,
          ans: selected.nutrient,
          hint: selected.hint,
          why: `${selected.nutrient} deficiency explains the characteristic symptoms described.`,
          sol: selected.nutrient,
          steps: [
            "Step 1: Identify the key symptoms.",
            "Step 2: Match them to the deficiency disease.",
            "Step 3: Identify the nutrient involved.",
          ],
          type: "mcq",
          options: uniqueOptions(selected.nutrient, selected.distractors),
          concept: "Nutrition & deficiency diseases",
        });
      }

      if (mode === 2) {
        const wrong = selected.distractors[0];

        return makeResult({
          q: `[Nutrition Error Check]\n${selected.scenario}\n\nA learner claims that the condition is caused by ${wrong}. Is the claim correct? Explain briefly and give the correct nutrient.`,
          ans: `Incorrect. The nutrient involved is ${selected.nutrient}.`,
          hint: selected.hint,
          why: `${selected.condition} is associated with ${selected.cause}, not ${wrong}.`,
          sol: `Incorrect. The correct nutrient is ${selected.nutrient}.`,
          steps: [
            "Step 1: Identify the symptoms.",
            "Step 2: Compare the symptoms with the proposed nutrient deficiency.",
            "Step 3: Reject the incorrect diagnosis.",
            `Step 4: Correct answer: ${selected.nutrient}.`,
          ],
          type: "open_response",
          concept: "Nutrition diagnosis",
        });
      }

      return makeResult({
        q: `[Applied Nutrition]\n${selected.scenario}\n\nState the deficiency involved and recommend an appropriate dietary approach.`,
        ans: `${selected.nutrient}. ${selected.remedy}`,
        hint: `${selected.hint} Then connect the nutrient to suitable food sources.`,
        why: `${selected.condition} results from ${selected.cause}. Correct dietary management should restore the deficient nutrient appropriately.`,
        sol: `${selected.nutrient}. ${selected.remedy}`,
        steps: [
          "Step 1: Diagnose the condition from the symptoms.",
          `Step 2: Identify the deficient nutrient: ${selected.nutrient}.`,
          "Step 3: Select appropriate nutrient-rich foods.",
          "Step 4: Explain how the dietary change addresses the deficiency.",
        ],
        type: "open_response",
        concept: "Applied nutrition",
      });
    }

    // ------------------------------------------------------------
    // 2. FOOD HYGIENE & FOOD SAFETY
    // ------------------------------------------------------------

    if (
      lower.includes("hygiene") ||
      lower.includes("sanitation") ||
      lower.includes("food safety") ||
      lower.includes("contamination") ||
      lower.includes("bacteria") ||
      lower.includes("preservation") ||
      lower.includes("storage") ||
      lower.includes("food poisoning")
    ) {
      const cases = [
        {
          scenario:
            "A cook handles raw chicken and then uses the same unwashed knife to chop tomatoes for a salad.",
          answer: "Cross-contamination",
          explanation:
            "Microorganisms from raw poultry can be transferred to ready-to-eat food through contaminated equipment.",
          options: [
            "Cross-contamination",
            "Food fortification",
            "Fermentation",
            "Emulsification",
          ],
          prevention:
            "Use separate or properly cleaned equipment and wash hands between handling raw and ready-to-eat foods.",
        },

        {
          scenario:
            "Cooked food is left at room temperature for many hours before being served.",
          answer: "Unsafe food storage",
          explanation:
            "Improper temperature control can allow harmful microorganisms to multiply.",
          options: [
            "Unsafe food storage",
            "Food enrichment",
            "Dry cleaning",
            "Textile shrinkage",
          ],
          prevention:
            "Store food at appropriate safe temperatures and avoid prolonged exposure to conditions that encourage microbial growth.",
        },

        {
          scenario:
            "A household stores dry grains in a clean, dry, airtight container.",
          answer: "Dry storage",
          explanation:
            "Keeping dry foods protected from moisture, pests and contamination helps maintain quality and safety.",
          options: [
            "Dry storage",
            "Pasteurization",
            "Smoking",
            "Freezing",
          ],
          prevention:
            "Maintain clean, dry and pest-free storage conditions.",
        },
      ];

      const selected = cases[Math.floor(Math.random() * cases.length)];

      if (mode === 0) {
        return makeResult({
          q: `[Food Safety Scenario]\n${selected.scenario}\n\nIdentify the main food-safety principle involved.`,
          ans: selected.answer,
          hint: "Focus on how food is handled, stored or protected from contamination.",
          why: selected.explanation,
          sol: selected.answer,
          steps: [
            "Step 1: Identify the unsafe or safe practice.",
            "Step 2: Determine the food-safety principle involved.",
            `Step 3: Apply the principle: ${selected.answer}.`,
          ],
          type: "open_response",
          concept: "Food hygiene & safety",
        });
      }

      if (mode === 1) {
        return makeResult({
          q: `[Food Hygiene MCQ]\n${selected.scenario}\n\nWhich principle best describes this situation?`,
          ans: selected.answer,
          hint: "Think about contamination, microorganisms, storage or handling.",
          why: selected.explanation,
          sol: selected.answer,
          steps: [
            "Step 1: Examine the food-handling practice.",
            "Step 2: Identify the possible safety risk.",
            "Step 3: Select the corresponding food-safety principle.",
          ],
          type: "mcq",
          options: shuffle(selected.options),
          concept: "Food hygiene & safety",
        });
      }

      if (mode === 2) {
        return makeResult({
          q: `[Food Safety Error Detection]\n${selected.scenario}\n\nA learner says this practice is completely safe. Do you agree? Give the correct principle and explain why.`,
          ans: `The correct principle is ${selected.answer}. ${selected.explanation}`,
          hint: "Look for the pathway by which food could become unsafe.",
          why: selected.explanation,
          sol: `${selected.answer}. ${selected.prevention}`,
          steps: [
            "Step 1: Identify the potentially unsafe practice.",
            "Step 2: Identify the hazard created.",
            "Step 3: Name the food-safety principle.",
            "Step 4: State how the risk can be prevented.",
          ],
          type: "open_response",
          concept: "Food safety diagnosis",
        });
      }

      return makeResult({
        q: `[Practical Food Safety]\n${selected.scenario}\n\nExplain what should be done to make the practice safer.`,
        ans: `${selected.answer}. ${selected.prevention}`,
        hint: "State both the principle and the practical corrective action.",
        why: selected.explanation,
        sol: `${selected.answer}. ${selected.prevention}`,
        steps: [
          "Step 1: Identify the food-safety problem.",
          "Step 2: Explain why it creates a risk.",
          "Step 3: Give a practical corrective measure.",
          "Step 4: Explain how the measure reduces the risk.",
        ],
        type: "open_response",
        concept: "Applied food hygiene",
      });
    }

    // ------------------------------------------------------------
    // 3. FOOD PRESERVATION
    // ------------------------------------------------------------

    if (
      lower.includes("preserv") ||
      lower.includes("drying") ||
      lower.includes("salting") ||
      lower.includes("smoking") ||
      lower.includes("canning") ||
      lower.includes("freezing") ||
      lower.includes("pasteur")
    ) {
      const preservation = [
        {
          scenario:
            "A farmer wants to preserve excess maize grain for several months while reducing moisture that could encourage spoilage.",
          answer: "Drying",
          reason:
            "Reducing moisture limits the conditions needed for many microorganisms and pests to cause deterioration.",
          options: [
            "Drying",
            "Adding excess water",
            "Leaving grain exposed to rain",
            "Increasing storage humidity",
          ],
        },

        {
          scenario:
            "Fresh fish must be preserved for longer storage using salt to reduce available water.",
          answer: "Salting",
          reason:
            "Salt reduces water availability and helps inhibit the growth of many microorganisms.",
          options: [
            "Salting",
            "Soaking in plain water",
            "Increasing humidity",
            "Leaving uncovered",
          ],
        },

        {
          scenario:
            "Milk is heated to a controlled temperature for a specified time to destroy many harmful microorganisms before being cooled.",
          answer: "Pasteurization",
          reason:
            "Pasteurization uses controlled heating to reduce harmful microorganisms while preserving much of the milk's quality.",
          options: [
            "Pasteurization",
            "Dehydration",
            "Smoking",
            "Salting",
          ],
        },
      ];

      const selected =
        preservation[Math.floor(Math.random() * preservation.length)];

      return makeResult({
        q:
          mode === 3
            ? `[Food Preservation Application]\n${selected.scenario}\n\nExplain why ${selected.answer} is suitable.`
            : `[Food Preservation]\n${selected.scenario}\n\nWhich preservation method is most appropriate?`,
        ans:
          mode === 3
            ? `${selected.answer}. ${selected.reason}`
            : selected.answer,
        hint: "Consider how the method controls moisture, microorganisms or spoilage.",
        why: selected.reason,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the food being preserved.",
          "Step 2: Identify the main spoilage problem.",
          "Step 3: Determine how the preservation method controls that problem.",
          `Step 4: Select ${selected.answer}.`,
        ],
        type: mode === 0 || mode === 3 ? "open_response" : "mcq",
        options:
          mode === 1
            ? shuffle(selected.options)
            : null,
        concept: "Food preservation",
      });
    }

    // ------------------------------------------------------------
    // 4. TEXTILE FIBRES & CLOTHING CARE
    // ------------------------------------------------------------

    if (
      lower.includes("textile") ||
      lower.includes("fabric") ||
      lower.includes("fibre") ||
      lower.includes("fiber") ||
      lower.includes("cotton") ||
      lower.includes("wool") ||
      lower.includes("silk") ||
      lower.includes("nylon") ||
      lower.includes("polyester") ||
      lower.includes("laundry") ||
      lower.includes("clothing")
    ) {
      const textileCases = [
        {
          scenario:
            "A garment is made from cotton and needs regular washing because it is used in hot weather.",
          answer: "Cotton is absorbent and comfortable in hot conditions.",
          principle: "Cotton absorbs moisture and allows comfortable wear in warm conditions.",
          options: [
            "Cotton is absorbent and comfortable in hot conditions.",
            "Cotton is completely waterproof.",
            "Cotton cannot absorb perspiration.",
            "Cotton is always more elastic than nylon.",
          ],
        },

        {
          scenario:
            "A wool garment is washed using very hot water and vigorous rubbing and later becomes smaller and distorted.",
          answer: "The wool has shrunk/felt because of unsuitable washing conditions.",
          principle:
            "Heat, moisture and agitation can cause wool fibres to felt and shrink.",
          options: [
            "The wool has shrunk/felt because of unsuitable washing conditions.",
            "Wool becomes stronger when aggressively rubbed.",
            "Hot water permanently increases wool size.",
            "Wool cannot absorb water.",
          ],
        },

        {
          scenario:
            "A delicate silk garment must be cleaned without damaging its fibres.",
          answer: "Use gentle washing and avoid excessive heat and harsh treatment.",
          principle:
            "Silk is a delicate natural fibre and requires careful handling.",
          options: [
            "Use gentle washing and avoid excessive heat and harsh treatment.",
            "Use vigorous scrubbing and boiling water.",
            "Use maximum heat during every stage.",
            "Bleach aggressively before washing.",
          ],
        },
      ];

      const selected =
        textileCases[Math.floor(Math.random() * textileCases.length)];

      return makeResult({
        q: `[Textile Care Scenario]\n${selected.scenario}\n\nWhat is the most appropriate principle or practice?`,
        ans: selected.answer,
        hint: "Consider the properties of the fibre and the effect of heat, moisture and mechanical action.",
        why: selected.principle,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the fibre or garment.",
          "Step 2: Recall its important properties.",
          "Step 3: Identify how the care method affects those properties.",
          "Step 4: Select the appropriate care practice.",
        ],
        type: mode === 1 ? "mcq" : "open_response",
        options: mode === 1 ? shuffle(selected.options) : null,
        concept: "Textiles & clothing care",
      });
    }

    // ------------------------------------------------------------
    // 5. FIRST AID & HOUSEHOLD ACCIDENTS
    // ------------------------------------------------------------

    if (
      lower.includes("first aid") ||
      lower.includes("burn") ||
      lower.includes("bleeding") ||
      lower.includes("fracture") ||
      lower.includes("faint") ||
      lower.includes("accident") ||
      lower.includes("injury") ||
      lower.includes("wound")
    ) {
      const cases = [
        {
          scenario:
            "A person receives a minor thermal burn while cooking.",
          answer:
            "Cool the burn under cool running water and seek appropriate medical help when necessary.",
          principle:
            "Cooling the affected area helps reduce heat in the tissues and limits further injury.",
          options: [
            "Cool the burn under cool running water",
            "Apply butter immediately",
            "Rub the burn vigorously",
            "Break any blisters",
          ],
        },

        {
          scenario:
            "A person has a minor external wound that is bleeding.",
          answer:
            "Apply firm direct pressure with a clean dressing or cloth.",
          principle:
            "Direct pressure helps control external bleeding.",
          options: [
            "Apply firm direct pressure",
            "Remove the clot repeatedly",
            "Rub dirt into the wound",
            "Ignore the bleeding",
          ],
        },
      ];

      const selected = cases[Math.floor(Math.random() * cases.length)];

      return makeResult({
        q: `[First Aid Scenario]\n${selected.scenario}\n\nWhat is the most appropriate immediate first-aid action?`,
        ans: selected.answer,
        hint: "Choose the action that protects the injured person and limits further harm.",
        why: selected.principle,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the type of injury.",
          "Step 2: Prevent further harm.",
          "Step 3: Apply the appropriate immediate first-aid measure.",
          "Step 4: Seek further medical assistance when necessary.",
        ],
        type: mode === 1 ? "mcq" : "open_response",
        options: mode === 1 ? shuffle(selected.options) : null,
        concept: "First aid",
      });
    }

    // ------------------------------------------------------------
    // 6. CONSUMER EDUCATION & RESOURCE MANAGEMENT
    // ------------------------------------------------------------

    if (
      lower.includes("consumer") ||
      lower.includes("budget") ||
      lower.includes("income") ||
      lower.includes("expenditure") ||
      lower.includes("saving") ||
      lower.includes("resources") ||
      lower.includes("household management") ||
      lower.includes("decision")
    ) {
      const cases = [
        {
          scenario:
            "A household has limited income and several competing needs. The family decides to meet food, shelter and education needs before buying luxury goods.",
          answer: "Prioritizing needs according to available resources",
          reason:
            "Limited resources require households to distinguish essential needs from wants and allocate resources accordingly.",
          options: [
            "Prioritizing needs according to available resources",
            "Spending all income immediately",
            "Ignoring essential expenditure",
            "Buying luxury goods before necessities",
          ],
        },

        {
          scenario:
            "A family records its expected income and planned expenditure before the beginning of each month.",
          answer: "Budgeting",
          reason:
            "A budget helps plan how available income will be allocated among different expenditure categories.",
          options: [
            "Budgeting",
            "Food preservation",
            "Textile finishing",
            "Cross-contamination",
          ],
        },
      ];

      const selected = cases[Math.floor(Math.random() * cases.length)];

      return makeResult({
        q: `[Home Resource Management]\n${selected.scenario}\n\nWhich Home Science principle is being demonstrated?`,
        ans: selected.answer,
        hint: "Think about how households make decisions when resources are limited.",
        why: selected.reason,
        sol: selected.answer,
        steps: [
          "Step 1: Identify the household resources available.",
          "Step 2: Identify the competing needs or wants.",
          "Step 3: Determine how the household allocates resources.",
          `Step 4: Identify the principle: ${selected.answer}.`,
        ],
        type: mode === 1 ? "mcq" : "open_response",
        options: mode === 1 ? shuffle(selected.options) : null,
        concept: "Consumer education & resource management",
      });
    }

    // ------------------------------------------------------------
    // 7. GENERAL REVERSE DIAGNOSTIC
    // ------------------------------------------------------------

    if (rawAns.length > 3) {
      const genericDistractors = [
        "Unrelated textile fibre properties",
        "Improper household budgeting",
        "Incorrect food storage practice",
        "Inappropriate sanitation procedure",
        "Unsuitable nutritional recommendation",
        "Incorrect preservation method",
      ];

      const distractors = shuffle(
        genericDistractors.filter(
          (item) => item.toLowerCase() !== rawAns.toLowerCase()
        )
      ).slice(0, 3);

      return makeResult({
        q: `[Home Science Diagnostic]\nRegarding:\n"${stem}"\n\nWhich Home Science principle best explains the correct answer?`,
        ans: rawAns,
        hint:
          qObj.hint ||
          "Connect the situation to nutrition, hygiene, textiles, family resource management or practical household care.",
        why:
          qObj.why ||
          `The correct principle is connected to: ${rawAns}.`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Identify the practical household situation.",
          "Step 2: Determine the Home Science concept being tested.",
          "Step 3: Connect the evidence to the correct principle.",
          "Step 4: Verify that the answer explains the situation.",
        ],
        type: "mcq",
        options: uniqueOptions(rawAns, distractors),
        concept: "Integrated Home Science",
      });
    }

    // ------------------------------------------------------------
    // 8. SAFE FALLBACK
    // ------------------------------------------------------------

    return makeResult({
      ...qObj,
      q: `[Home Science Application Check]\n${stem}`,
      ans: qObj.ans,
      hint:
        qObj.hint ||
        "Identify the practical problem, recall the relevant Home Science principle, and apply it to the situation.",
      why:
        qObj.why ||
        "The answer should be supported by an appropriate Home Science principle.",
      sol: qObj.sol || qObj.ans,
      steps: [
        "Step 1: Identify the practical situation.",
        "Step 2: Identify the Home Science concept involved.",
        "Step 3: Apply the relevant principle.",
        "Step 4: Check that the conclusion fits the evidence.",
      ],
      type: qObj.type || "open_response",
      options: qObj.options || null,
      concept: "General Home Science",
    });
  }
}