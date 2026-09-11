/**
 * TIXAR HISTORY & GOVERNMENT MUTATOR
 *
 * Intelligent Historical Reasoning Engine
 * Version 5.0.0
 *
 * ================================================================
 * CORE LAW
 * ================================================================
 *
 * 1. NEVER use randomness.
 * 2. Same question + same modality + same variant = same result.
 * 3. Preserve the original historical concept.
 * 4. Change the cognitive operation, not the subject.
 * 5. Never create unrelated historical questions.
 * 6. MCQ options must be deterministic.
 * 7. Variant selection must be explicit.
 * 8. Modality and variant are independent.
 * 9. Preserve original question metadata.
 * 10. Every generated question records its provenance.
 *
 * ================================================================
 *
 * MODALITIES
 *
 * 0 = Recall / Open Response
 * 1 = MCQ
 * 2 = Error Detection
 * 3 = Explanation
 * 4 = Evidence / Source Reasoning
 * 5 = Reverse Historical Reasoning
 *
 * ================================================================
 */

export class HistoryMutator {

  // ================================================================
  // MAIN ENGINE
  // ================================================================

  mutate(qObj, modalityIndex = 0) {

    if (!qObj) return null;

    const stem =
      String(qObj.q || qObj.stem || "").trim();

    if (!stem) return null;

    const lower =
      stem.toLowerCase();

    const rawAns =
      String(qObj.ans || "").trim();

    /*
     * Modality is controlled externally.
     *
     * IMPORTANT:
     * There is NO Math.random() fallback.
     */

    const mode =
      this.normalizeModality(
        modalityIndex !== null &&
        modalityIndex !== undefined
          ? modalityIndex
          : qObj.modalityIndex ?? 0
      );

    /*
     * Variant is also explicit.
     *
     * If Tixar does not provide one,
     * variant 0 is used.
     */

    const variantIndex =
      this.normalizeVariant(
        qObj.variantIndex ?? 0
      );

    // ==============================================================
    // SHARED HELPERS
    // ==============================================================

    const unique = (items) => {

      if (!Array.isArray(items)) {
        return [];
      }

      const seen =
        new Set();

      const result = [];

      for (const item of items) {

        const value =
          String(item ?? "").trim();

        if (!value) continue;

        const key =
          value.toLowerCase();

        if (seen.has(key)) continue;

        seen.add(key);
        result.push(value);
      }

      return result;
    };

    /*
     * Deterministic rotation.
     *
     * This replaces random shuffling.
     *
     * [A,B,C,D]
     *
     * variant 0 -> [A,B,C,D]
     * variant 1 -> [B,C,D,A]
     * variant 2 -> [C,D,A,B]
     * variant 3 -> [D,A,B,C]
     */

    const rotate = (items, index = 0) => {

      if (
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return [];
      }

      const shift =
        ((Math.trunc(index) % items.length) +
          items.length) %
        items.length;

      return [
        ...items.slice(shift),
        ...items.slice(0, shift)
      ];
    };

    /*
     * Deterministically choose an item.
     */

    const pick = (items, index = 0) => {

      if (
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return null;
      }

      return items[
        Math.abs(
          Math.trunc(index)
        ) % items.length
      ];
    };

    /*
     * Generate deterministic MCQ options.
     *
     * Correct answer is included exactly once.
     * Duplicate options are removed.
     * Ordering is determined by variantIndex.
     */

    const makeOptions = (
      answer,
      alternatives = []
    ) => {

      const pool =
        unique([
          answer,
          ...alternatives
        ]);

      const limited =
        pool.slice(0, 4);

      return rotate(
        limited,
        variantIndex
      );
    };

    /*
     * Shared result constructor.
     */

    const makeResult = ({
      q,
      ans,
      hint,
      why,
      sol = ans,
      steps = [],
      type = "open_response",
      options = null,
      concept = "History & Government",
      difficulty = "medium",
      mutationType = "historical_reasoning"
    }) => {

      return {
        ...qObj,

        q,
        ans,

        hint,

        why:
          why ||
          `The historically supported answer is ${ans}.`,

        sol,

        steps,

        type,

        options,

        concept,

        difficulty,

        subject:
          qObj.subject ||
          "History & Government",

        mutation: {
          engine: "HistoryMutator",
          version: "5.0.0",
          deterministic: true,

          variantIndex,
          modalityIndex: mode,

          mutationType,

          sourceQuestion:
            stem
        }
      };
    };

    // ================================================================
    // SHARED HISTORICAL REASONING STEPS
    // ================================================================

    const baseSteps = [
      "Step 1: Identify the historical event, institution, person, process, or source.",
      "Step 2: Establish the relevant historical context.",
      "Step 3: Identify the evidence or relationship being tested.",
      "Step 4: Eliminate explanations that conflict with the historical context.",
      "Step 5: State the historically supported conclusion."
    ];

    // ================================================================
    // 1. GOVERNMENT & CONSTITUTIONAL STRUCTURES
    // ================================================================

    const governanceCases = [

      {
        id: "legislature",

        keywords: [
          "legislature",
          "parliament",
          "law making",
          "law-making",
          "law",
          "bill"
        ],

        answer:
          "Legislature",

        concept:
          "law-making",

        explanation:
          "The legislature performs the law-making function by debating, considering, amending where appropriate, and passing legislation.",

        alternatives: [
          "Executive",
          "Judiciary",
          "Public Service"
        ]
      },

      {
        id: "executive",

        keywords: [
          "executive",
          "implement",
          "implementation",
          "policy",
          "administration"
        ],

        answer:
          "Executive",

        concept:
          "implementation of laws and public policy",

        explanation:
          "The Executive is primarily responsible for implementing laws and administering public policy.",

        alternatives: [
          "Legislature",
          "Judiciary",
          "Electoral Commission"
        ]
      },

      {
        id: "judiciary",

        keywords: [
          "judiciary",
          "court",
          "justice",
          "interpret",
          "legal dispute"
        ],

        answer:
          "Judiciary",

        concept:
          "interpretation and application of law",

        explanation:
          "The Judiciary interprets and applies the law through the court system and determines legal disputes.",

        alternatives: [
          "Legislature",
          "Executive",
          "County Assembly"
        ]
      },

      {
        id: "devolution",

        keywords: [
          "devolution",
          "county government",
          "county governments",
          "county assembly",
          "local government"
        ],

        answer:
          "Devolution",

        concept:
          "distribution of specified governmental functions and resources between levels of government",

        explanation:
          "Devolution distributes specified governmental functions and resources between national and county levels of government.",

        alternatives: [
          "Centralization",
          "Privatization",
          "Federal taxation"
        ]
      },

      {
        id: "senate",

        keywords: [
          "senate",
          "senator",
          "county interests"
        ],

        answer:
          "Senate",

        concept:
          "representation of county interests",

        explanation:
          "The Senate represents county interests within Kenya's bicameral Parliament.",

        alternatives: [
          "National Assembly",
          "Judiciary",
          "Executive"
        ]
      },

      {
        id: "national assembly",

        keywords: [
          "national assembly",
          "member of parliament",
          "mp",
          "constituency"
        ],

        answer:
          "National Assembly",

        concept:
          "representation of constituencies and participation in national legislation",

        explanation:
          "The National Assembly represents constituencies and participates in legislation and other constitutional functions.",

        alternatives: [
          "Senate",
          "Judiciary",
          "Executive"
        ]
      }
    ];

    const governance =
      governanceCases.find(item =>
        item.keywords.some(
          keyword =>
            lower.includes(keyword)
        )
      );

    if (governance) {

      if (mode === 0) {

        return makeResult({

          q:
            `Which institution or governmental principle is primarily associated with ${governance.concept}?`,

          ans:
            governance.answer,

          hint:
            "Focus on the constitutional or governmental function being described.",

          why:
            governance.explanation,

          sol:
            governance.answer,

          steps:
            baseSteps,

          type:
            "open_response",

          concept:
            `Government & Constitution: ${governance.id}`,

          mutationType:
            "government_function"
        });
      }

      if (mode === 1) {

        return makeResult({

          q:
            `Which institution or governmental principle is primarily responsible for ${governance.concept}?`,

          ans:
            governance.answer,

          hint:
            "Match the governmental function with the institution responsible for it.",

          why:
            governance.explanation,

          sol:
            governance.answer,

          steps:
            baseSteps,

          type:
            "mcq",

          options:
            makeOptions(
              governance.answer,
              governance.alternatives
            ),

          concept:
            `Government & Constitution: ${governance.id}`,

          mutationType:
            "government_function_mcq"
        });
      }

      if (mode === 2) {

        const wrong =
          pick(
            governance.alternatives,
            variantIndex
          );

        return makeResult({

          q:
            `A student argues that "${wrong}" is primarily responsible for ${governance.concept}. Is the claim correct? Give the correct answer and explain why.`,

          ans:
            `Incorrect. The correct answer is ${governance.answer}. ${governance.explanation}`,

          hint:
            "Distinguish the functions of the different organs and institutions of government.",

          why:
            governance.explanation,

          sol:
            governance.answer,

          steps: [
            "Step 1: Identify the governmental function.",
            "Step 2: Recall the role of the institution responsible.",
            `Step 3: Compare the proposed answer (${wrong}) with the correct institution.`,
            `Step 4: Conclude that the correct answer is ${governance.answer}.`
          ],

          type:
            "open_response",

          concept:
            `Government & Constitution: ${governance.id}`,

          mutationType:
            "government_error_detection"
        });
      }

      if (mode === 3) {

        return makeResult({

          q:
            `Explain why ${governance.answer} is associated with ${governance.concept}.`,

          ans:
            governance.explanation,

          hint:
            "Explain the relationship between institutional responsibility and governmental function.",

          why:
            governance.explanation,

          sol:
            governance.explanation,

          steps: [
            "Step 1: Identify the institution or principle.",
            "Step 2: State its governmental role.",
            "Step 3: Connect that role to the function.",
            "Step 4: Explain why other institutions are not the primary answer."
          ],

          type:
            "open_response",

          concept:
            `Government & Constitution: ${governance.id}`,

          mutationType:
            "government_explanation"
        });
      }

      if (mode === 4) {

        return makeResult({

          q:
            `Which constitutional function provides the strongest evidence that ${governance.answer} is associated with ${governance.concept}?`,

          ans:
            governance.explanation,

          hint:
            "Use the actual function of the institution as your evidence.",

          why:
            governance.explanation,

          sol:
            governance.explanation,

          steps: [
            "Step 1: Identify the institution.",
            "Step 2: Identify its constitutional function.",
            "Step 3: Connect the function to the concept.",
            "Step 4: Use that relationship as evidence."
          ],

          type:
            "open_response",

          concept:
            `Government & Constitution: ${governance.id}`,

          mutationType:
            "government_evidence"
        });
      }

      return makeResult({

        q:
          `If ${governance.answer} failed to perform its role concerning ${governance.concept}, which governmental function would be directly affected? Explain.`,

        ans:
          governance.explanation,

        hint:
          "Work backwards from the institution's responsibility to the function that depends on it.",

        why:
          governance.explanation,

        sol:
          governance.explanation,

        steps: [
          "Step 1: Identify the institution.",
          "Step 2: Identify its normal responsibility.",
          "Step 3: Imagine that responsibility is not performed.",
          "Step 4: Identify the affected governmental function.",
          "Step 5: Explain the consequence."
        ],

        type:
          "open_response",

        concept:
          `Government & Constitution: ${governance.id}`,

        mutationType:
          "government_reverse_reasoning"
      });
    }

    // ================================================================
    // 2. HISTORICAL SOURCES
    // ================================================================

    const sourceCases = [

      {
        id: "archaeological",

        keywords: [
          "artifact",
          "archaeolog",
          "pottery",
          "tool",
          "iron object",
          "iron tools",
          "building remains"
        ],

        answer:
          "Archaeological source",

        explanation:
          "Physical remains such as pottery, tools, buildings and iron objects provide material evidence about past societies.",

        alternatives: [
          "Oral tradition",
          "Secondary source",
          "Fictional source"
        ]
      },

      {
        id: "primary",

        keywords: [
          "diary",
          "letter",
          "eyewitness",
          "original document",
          "original record",
          "contemporary record"
        ],

        answer:
          "Primary source",

        explanation:
          "A primary source provides direct evidence produced during the period or event being studied, such as an original letter, diary, photograph or official record.",

        alternatives: [
          "Secondary source",
          "Tertiary source",
          "Modern interpretation"
        ]
      },

      {
        id: "oral",

        keywords: [
          "oral tradition",
          "oral history",
          "elder",
          "spoken account",
          "oral account"
        ],

        answer:
          "Oral source",

        explanation:
          "Oral sources preserve historical information through spoken accounts, memories and traditions transmitted between generations.",

        alternatives: [
          "Archaeological source",
          "Written source",
          "Satellite image"
        ]
      },

      {
        id: "written",

        keywords: [
          "written source",
          "written record",
          "written document",
          "manuscript",
          "chronicle"
        ],

        answer:
          "Written source",

        explanation:
          "Written sources preserve historical information through documents, records, manuscripts, chronicles and other written evidence.",

        alternatives: [
          "Oral source",
          "Archaeological source",
          "Folklore alone"
        ]
      }
    ];

    const source =
      sourceCases.find(item =>
        item.keywords.some(
          keyword =>
            lower.includes(keyword)
        )
      );

    if (source) {

      if (mode === 0) {

        return makeResult({

          q:
            `Identify the type of historical source most relevant to the evidence described in:\n"${stem}"`,

          ans:
            source.answer,

          hint:
            "Look at how the historical evidence was produced or preserved.",

          why:
            source.explanation,

          sol:
            source.answer,

          steps: [
            "Step 1: Identify the form of evidence.",
            "Step 2: Determine how the evidence originated.",
            "Step 3: Consider whether it is material, oral, written or direct contemporary evidence.",
            "Step 4: Classify the source."
          ],

          type:
            "open_response",

          concept:
            `Historical Sources: ${source.id}`,

          mutationType:
            "source_classification"
        });
      }

      if (mode === 1) {

        return makeResult({

          q:
            `Which type of historical source is represented by the evidence described in the question?`,

          ans:
            source.answer,

          hint:
            "Classify the evidence according to how it provides historical information.",

          why:
            source.explanation,

          sol:
            source.answer,

          steps:
            baseSteps,

          type:
            "mcq",

          options:
            makeOptions(
              source.answer,
              source.alternatives
            ),

          concept:
            `Historical Sources: ${source.id}`,

          mutationType:
            "source_classification_mcq"
        });
      }

      if (mode === 2) {

        const wrong =
          pick(
            source.alternatives,
            variantIndex
          );

        return makeResult({

          q:
            `A historian claims that the evidence in the question is a "${wrong}". Evaluate the claim and give the correct classification.`,

          ans:
            `The claim is incorrect. The evidence is best classified as ${source.answer}. ${source.explanation}`,

          hint:
            "Identify the actual form and origin of the evidence before classifying it.",

          why:
            source.explanation,

          sol:
            source.answer,

          steps: [
            "Step 1: Identify the evidence.",
            "Step 2: Determine how it originated.",
            "Step 3: Compare it with the proposed classification.",
            "Step 4: Give the correct classification.",
            "Step 5: Explain the evidence supporting your classification."
          ],

          type:
            "open_response",

          concept:
            `Historical Sources: ${source.id}`,

          mutationType:
            "source_error_detection"
        });
      }

      if (mode === 3) {

        return makeResult({

          q:
            `Explain why the evidence described in the question is classified as a ${source.answer}.`,

          ans:
            source.explanation,

          hint:
            "Explain the origin and nature of the evidence.",

          why:
            source.explanation,

          sol:
            source.explanation,

          steps: [
            "Step 1: Identify the evidence.",
            "Step 2: Explain where it came from.",
            "Step 3: Connect its origin to the source classification.",
            "Step 4: Explain its historical value."
          ],

          type:
            "open_response",

          concept:
            `Historical Sources: ${source.id}`,

          mutationType:
            "source_explanation"
        });
      }

      if (mode === 4) {

        return makeResult({

          q:
            `What evidence-based reason would a historian use to classify the source in the question as a ${source.answer}?`,

          ans:
            source.explanation,

          hint:
            "Base the classification on the origin and nature of the evidence.",

          why:
            source.explanation,

          sol:
            source.explanation,

          steps: [
            "Step 1: Identify the source.",
            "Step 2: Examine its origin.",
            "Step 3: Identify what kind of evidence it provides.",
            "Step 4: Use those characteristics to justify the classification."
          ],

          type:
            "open_response",

          concept:
            `Historical Sources: ${source.id}`,

          mutationType:
            "source_evidence_reasoning"
        });
      }

      return makeResult({

        q:
          `If the source described in the question were unavailable, what other type of historical evidence could a historian use to investigate the same period? Explain why.`,

        ans:
          `A historian could use another suitable historical source and compare it with available evidence to reconstruct the past. The original source is classified as ${source.answer}.`,

        hint:
          "Historians strengthen interpretations by comparing different forms of evidence.",

        why:
          source.explanation,

        sol:
          `Use another relevant source and compare the evidence critically.`,

        steps: [
          "Step 1: Identify what information the original source provides.",
          "Step 2: Identify another source capable of providing related evidence.",
          "Step 3: Compare the sources.",
          "Step 4: Consider differences, limitations and possible bias.",
          "Step 5: Form a supported historical interpretation."
        ],

        type:
          "open_response",

        concept:
          `Historical Sources: ${source.id}`,

        mutationType:
          "source_reverse_reasoning"
      });
    }

    // ================================================================
    // 3. CAUSE & CONSEQUENCE
    // ================================================================

    const causalSignal =
      [
        "cause",
        "causes",
        "reason",
        "reasons",
        "result",
        "results",
        "effect",
        "effects",
        "consequence",
        "consequences",
        "why did",
        "why was",
        "why were",
        "led to",
        "impact"
      ].some(
        signal =>
          lower.includes(signal)
      );

    if (causalSignal && rawAns) {

      const causalVariants = [

        {
          q:
            `What was the most important historical cause or reason associated with the event described in the question?`
        },

        {
          q:
            `Which factor best explains the historical development described in the question?`
        },

        {
          q:
            `What important consequence followed from the historical development described in the question?`
        },

        {
          q:
            `Explain the cause-and-effect relationship involved in the historical question.`
        },

        {
          q:
            `Which factor most directly connects the historical circumstances in the question to its outcome?`
        },

        {
          q:
            `If the main historical cause identified in this question had not occurred, how might the outcome have differed?`
        }
      ];

      const selected =
        pick(
          causalVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected.q}\n\n` +
          `"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Separate causes from consequences and distinguish immediate causes from long-term background conditions.",

        why:
          qObj.why ||
          `The historically relevant explanation is: ${rawAns}`,

        sol:
          qObj.sol ||
          rawAns,

        steps: [
          "Step 1: Identify the historical event or development.",
          "Step 2: Identify the conditions surrounding it.",
          "Step 3: Distinguish causes from consequences.",
          "Step 4: Determine the strongest causal relationship.",
          "Step 5: State the conclusion using historical evidence."
        ],

        type:
          "open_response",

        concept:
          "Historical Causes & Consequences",

        mutationType:
          "cause_consequence_reasoning"
      });
    }

    // ================================================================
    // 4. COLONIALISM & NATIONALISM
    // ================================================================

    const colonialCases = [

      {
        id: "nationalism",

        keywords: [
          "nationalism",
          "independence movement",
          "self determination",
          "self-determination"
        ],

        answer:
          "Nationalism",

        explanation:
          "Nationalism encouraged people to seek political self-determination and challenge colonial rule.",

        alternatives: [
          "Colonial expansion",
          "Mercantilism",
          "Feudalism"
        ]
      },

      {
        id: "resistance",

        keywords: [
          "resistance",
          "mau mau",
          "armed resistance",
          "anti colonial"
        ],

        answer:
          "African resistance to colonial rule",

        explanation:
          "African resistance movements challenged colonial political, economic and social control through different strategies depending on the historical context.",

        alternatives: [
          "European industrialization",
          "Africanization of colonial administration",
          "Expansion of the Atlantic slave trade"
        ]
      },

      {
        id: "missionary",

        keywords: [
          "missionary",
          "missionaries",
          "mission station"
        ],

        answer:
          "Missionary activity",

        explanation:
          "Christian missionaries contributed to evangelization, education, health services and cultural change during the colonial period.",

        alternatives: [
          "Industrial revolution",
          "Military conscription alone",
          "Trans-Saharan camel trade"
        ]
      },

      {
        id: "settler",

        keywords: [
          "settler",
          "settlers",
          "settler farming",
          "white highlands"
        ],

        answer:
          "Settler colonialism",

        explanation:
          "Settler colonialism involved the establishment of European settler communities and the acquisition or control of land and economic resources.",

        alternatives: [
          "African nationalism",
          "Traditional barter",
          "Decolonization"
        ]
      },

      {
        id: "scramble",

        keywords: [
          "scramble for africa",
          "partition of africa",
          "berlin conference",
          "partition"
        ],

        answer:
          "European imperial expansion and partition of Africa",

        explanation:
          "European powers competed for African territories during the period of imperial expansion, with the Berlin Conference providing diplomatic rules for territorial claims.",

        alternatives: [
          "African decolonization",
          "Industrial decline in Europe",
          "Formation of modern county governments"
        ]
      }
    ];

    const colonial =
      colonialCases.find(item =>
        item.keywords.some(
          keyword =>
            lower.includes(keyword)
        )
      );

    if (colonial) {

      if (mode === 0) {

        return makeResult({

          q:
            `Which historical concept best explains the development described in the question?`,

          ans:
            colonial.answer,

          hint:
            "Use the historical period, actors and process rather than matching only one word.",

          why:
            colonial.explanation,

          sol:
            colonial.answer,

          steps: [
            "Step 1: Identify the historical period.",
            "Step 2: Identify the actors involved.",
            "Step 3: Identify the political, economic or social process.",
            "Step 4: Match the process with the historical concept.",
            "Step 5: Confirm that the concept fits the context."
          ],

          type:
            "open_response",

          concept:
            `Colonialism & Nationalism: ${colonial.id}`,

          mutationType:
            "colonial_concept"
        });
      }

      if (mode === 1) {

        return makeResult({

          q:
            `Which historical concept best explains the development described in the question?`,

          ans:
            colonial.answer,

          hint:
            "Match the historical process with the correct concept.",

          why:
            colonial.explanation,

          sol:
            colonial.answer,

          steps:
            baseSteps,

          type:
            "mcq",

          options:
            makeOptions(
              colonial.answer,
              colonial.alternatives
            ),

          concept:
            `Colonialism & Nationalism: ${colonial.id}`,

          mutationType:
            "colonial_concept_mcq"
        });
      }

      if (mode === 2) {

        const wrong =
          pick(
            colonial.alternatives,
            variantIndex
          );

        return makeResult({

          q:
            `A learner claims that the historical development described in the question is best explained by "${wrong}". Evaluate the claim.`,

          ans:
            `The claim is incorrect. The better explanation is ${colonial.answer}. ${colonial.explanation}`,

          hint:
            "Check whether the proposed concept belongs to the same historical process and period.",

          why:
            colonial.explanation,

          sol:
            colonial.answer,

          steps: [
            "Step 1: Identify the historical development.",
            "Step 2: Identify its historical context.",
            "Step 3: Test the proposed explanation.",
            "Step 4: Compare it with the correct concept.",
            "Step 5: State the historically supported explanation."
          ],

          type:
            "open_response",

          concept:
            `Colonialism & Nationalism: ${colonial.id}`,

          mutationType:
            "colonial_error_detection"
        });
      }

      if (mode === 3) {

        return makeResult({

          q:
            `Explain the relationship between ${colonial.answer} and the historical development described in the question.`,

          ans:
            colonial.explanation,

          hint:
            "Explain the historical process, not merely the definition.",

          why:
            colonial.explanation,

          sol:
            colonial.explanation,

          steps: [
            "Step 1: Identify the concept.",
            "Step 2: Explain what the concept means.",
            "Step 3: Connect it to the historical context.",
            "Step 4: Explain the resulting historical significance."
          ],

          type:
            "open_response",

          concept:
            `Colonialism & Nationalism: ${colonial.id}`,

          mutationType:
            "colonial_explanation"
        });
      }

      if (mode === 4) {

        return makeResult({

          q:
            `What historical evidence would best support the conclusion that ${colonial.answer} explains the development in the question?`,

          ans:
            colonial.explanation,

          hint:
            "Look for evidence about the actors, actions, policies and conditions of the period.",

          why:
            colonial.explanation,

          sol:
            colonial.explanation,

          steps: [
            "Step 1: Identify the historical claim.",
            "Step 2: Identify the actors involved.",
            "Step 3: Identify actions or policies that provide evidence.",
            "Step 4: Connect the evidence to the historical concept."
          ],

          type:
            "open_response",

          concept:
            `Colonialism & Nationalism: ${colonial.id}`,

          mutationType:
            "colonial_evidence"
        });
      }

      return makeResult({

        q:
          `If the historical process described in the question had developed differently, what major political or social consequence might have changed? Explain.`,

        ans:
          colonial.explanation,

        hint:
          "Work backwards from the historical process to its likely consequences.",

        why:
          colonial.explanation,

        sol:
          colonial.explanation,

        steps: [
          "Step 1: Identify the historical process.",
          "Step 2: Identify what it changed.",
          "Step 3: Remove or alter one important part of the process.",
          "Step 4: Consider the resulting historical consequence.",
          "Step 5: Support the conclusion using historical context."
        ],

        type:
          "open_response",

        concept:
          `Colonialism & Nationalism: ${colonial.id}`,

        mutationType:
          "colonial_counterfactual"
      });
    }

    // ================================================================
    // 5. HISTORICAL TRADE
    // ================================================================

    const tradeCases = [

      {
        id: "trans_saharan",

        keywords: [
          "trans-saharan",
          "trans saharan",
          "sahara",
          "camel",
          "salt and gold"
        ],

        answer:
          "Camel transport",

        explanation:
          "Camels were well adapted to long-distance travel across arid desert environments and therefore facilitated Trans-Saharan trade.",

        alternatives: [
          "Steam locomotives",
          "Ocean-going sailing ships",
          "Motor vehicles"
        ]
      },

      {
        id: "indian_ocean",

        keywords: [
          "indian ocean",
          "east african coast",
          "monsoon",
          "swahili coast"
        ],

        answer:
          "Monsoon winds",

        explanation:
          "Seasonal monsoon winds enabled sailors to plan journeys between the East African coast, Arabia, India and other Indian Ocean trading regions.",

        alternatives: [
          "Polar winds",
          "Tornadoes",
          "Glacial winds"
        ]
      },

      {
        id: "barter",

        keywords: [
          "barter",
          "exchange of goods",
          "exchange goods"
        ],

        answer:
          "Barter",

        explanation:
          "Barter involves exchanging goods or services directly without using money as the medium of exchange.",

        alternatives: [
          "Taxation",
          "Industrialization",
          "Colonial administration"
        ]
      }
    ];

    const trade =
      tradeCases.find(item =>
        item.keywords.some(
          keyword =>
            lower.includes(keyword)
        )
      );

    if (trade) {

      if (mode === 0) {

        return makeResult({

          q:
            `Explain the historical importance of ${trade.answer} in the context described by the question.`,

          ans:
            trade.explanation,

          hint:
            "Connect the factor to the practical conditions faced by traders.",

          why:
            trade.explanation,

          sol:
            trade.explanation,

          steps: [
            "Step 1: Identify the trade route or system.",
            "Step 2: Identify the conditions traders faced.",
            "Step 3: Identify the factor that addressed those conditions.",
            "Step 4: Explain its effect on trade."
          ],

          type:
            "open_response",

          concept:
            `Historical Trade: ${trade.id}`,

          mutationType:
            "trade_explanation"
        });
      }

      if (mode === 1) {

        return makeResult({

          q:
            `Which factor was most important in enabling the historical trade described in the question?`,

          ans:
            trade.answer,

          hint:
            "Match the environmental, technological or economic factor to the trade system.",

          why:
            trade.explanation,

          sol:
            trade.answer,

          steps: [
            "Step 1: Identify the trading environment.",
            "Step 2: Identify the challenge or requirement.",
            "Step 3: Match the relevant historical factor.",
            "Step 4: Eliminate anachronistic or unrelated options."
          ],

          type:
            "mcq",

          options:
            makeOptions(
              trade.answer,
              trade.alternatives
            ),

          concept:
            `Historical Trade: ${trade.id}`,

          mutationType:
            "trade_mcq"
        });
      }

      if (mode === 2) {

        const wrong =
          pick(
            trade.alternatives,
            variantIndex
          );

        return makeResult({

          q:
            `A learner claims that "${wrong}" was the main factor enabling the trade described. Evaluate the claim and give the historically appropriate answer.`,

          ans:
            `The claim is incorrect. The appropriate answer is ${trade.answer}. ${trade.explanation}`,

          hint:
            "Consider the geography, technology and historical period of the trade.",

          why:
            trade.explanation,

          sol:
            trade.answer,

          steps: [
            "Step 1: Identify the trade system.",
            "Step 2: Identify its geographical and historical conditions.",
            "Step 3: Test the proposed explanation.",
            "Step 4: Identify the historically appropriate factor.",
            "Step 5: Explain why it mattered."
          ],

          type:
            "open_response",

          concept:
            `Historical Trade: ${trade.id}`,

          mutationType:
            "trade_error_detection"
        });
      }

      if (mode === 3) {

        return makeResult({

          q:
            `Explain how ${trade.answer} made the historical trade system described in the question possible or more effective.`,

          ans:
            trade.explanation,

          hint:
            "Explain the mechanism connecting the factor to trade.",

          why:
            trade.explanation,

          sol:
            trade.explanation,

          steps: [
            "Step 1: Identify the factor.",
            "Step 2: Identify the problem or opportunity it addressed.",
            "Step 3: Explain the connection to trade.",
            "Step 4: State its historical significance."
          ],

          type:
            "open_response",

          concept:
            `Historical Trade: ${trade.id}`,

          mutationType:
            "trade_explanation"
        });
      }

      if (mode === 4) {

        return makeResult({

          q:
            `What historical or geographical evidence would support the importance of ${trade.answer} in the trade system described?`,

          ans:
            trade.explanation,

          hint:
            "Use evidence about geography, routes, technology, seasons or economic exchange.",

          why:
            trade.explanation,

          sol:
            trade.explanation,

          steps: [
            "Step 1: Identify the trade route.",
            "Step 2: Identify the environmental or economic conditions.",
            "Step 3: Identify evidence connecting the factor to those conditions.",
            "Step 4: Explain why the evidence supports the conclusion."
          ],

          type:
            "open_response",

          concept:
            `Historical Trade: ${trade.id}`,

          mutationType:
            "trade_evidence"
        });
      }

      return makeResult({

        q:
          `If ${trade.answer} had not been available or effective, how might the trade system described in the question have been affected? Explain.`,

        ans:
          trade.explanation,

        hint:
          "Consider what problem the historical factor solved.",

        why:
          trade.explanation,

        sol:
          trade.explanation,

        steps: [
          "Step 1: Identify the role of the factor.",
          "Step 2: Identify the problem it solved.",
          "Step 3: Remove the factor from the historical situation.",
          "Step 4: Predict the likely consequence.",
          "Step 5: Support the conclusion with historical reasoning."
        ],

        type:
          "open_response",

        concept:
          `Historical Trade: ${trade.id}`,

        mutationType:
          "trade_counterfactual"
      });
    }

    // ================================================================
    // 6. CHRONOLOGY
    // ================================================================

    const chronologySignal =
      [
        "chronolog",
        "sequence",
        "order",
        "before",
        "after",
        "earlier",
        "later",
        "first",
        "next",
        "preceded",
        "followed",
        "period"
      ].some(
        signal =>
          lower.includes(signal)
      );

    if (chronologySignal && rawAns) {

      const chronologyVariants = [

        `Place the historical development described in the question in its correct chronological context.`,

        `What important historical development occurred before or after the event described?`,

        `Explain the chronological relationship between the events involved in the question.`,

        `Which historical development should come immediately before the event described?`,

        `Which development followed the historical event described in the question?`,

        `Why is the chronological position of this event important for understanding the wider historical process?`
      ];

      const selected =
        pick(
          chronologyVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected}\n\n"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Use dates, periods and the sequence of related events to establish chronology.",

        why:
          qObj.why ||
          `The relevant historical answer is ${rawAns}.`,

        sol:
          qObj.sol ||
          rawAns,

        steps: [
          "Step 1: Identify the event or development.",
          "Step 2: Identify its approximate date or historical period.",
          "Step 3: Identify related events.",
          "Step 4: Compare their chronological positions.",
          "Step 5: Confirm the sequence using historical evidence."
        ],

        type:
          "open_response",

        concept:
          "Historical Chronology",

        mutationType:
          "chronological_reasoning"
      });
    }

    // ================================================================
    // 7. HISTORICAL SIGNIFICANCE
    // ================================================================

    const significanceSignal =
      [
        "significance",
        "significant",
        "importance",
        "important",
        "legacy",
        "contribution",
        "impact"
      ].some(
        signal =>
          lower.includes(signal)
      );

    if (significanceSignal && rawAns) {

      const significanceVariants = [

        `What makes the event or development in the question historically significant?`,

        `Which consequence best demonstrates the importance of the historical development described?`,

        `Explain the long-term significance of the event described in the question.`,

        `Why should historians consider this development important?`,

        `What changed because of the historical development described?`,

        `How did this development influence later historical events?`
      ];

      const selected =
        pick(
          significanceVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected}\n\n"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Historical significance concerns why an event mattered and what changed because of it.",

        why:
          qObj.why ||
          `The historical significance is: ${rawAns}`,

        sol:
          qObj.sol ||
          rawAns,

        steps: [
          "Step 1: Identify the historical event.",
          "Step 2: Identify what changed because of it.",
          "Step 3: Consider short-term and long-term effects.",
          "Step 4: Connect the event to later developments.",
          "Step 5: Explain why the event matters historically."
        ],

        type:
          "open_response",

        concept:
          "Historical Significance",

        mutationType:
          "historical_significance"
      });
    }

    // ================================================================
    // 8. HISTORICAL COMPARISON
    // ================================================================

    const comparisonSignal =
      [
        "compare",
        "comparison",
        "similar",
        "similarities",
        "difference",
        "differences",
        "contrast",
        "both",
        "unlike"
      ].some(
        signal =>
          lower.includes(signal)
      );

    if (comparisonSignal && rawAns) {

      const comparisonVariants = [

        `What is the most important historical similarity or difference relevant to the question?`,

        `How does the historical development in the question compare with the related development mentioned?`,

        `Which feature most clearly distinguishes the two historical situations?`,

        `Identify one significant similarity and explain its historical importance.`,

        `Identify one significant difference and explain why it occurred.`,

        `What historical factor best explains the difference between the situations being compared?`
      ];

      const selected =
        pick(
          comparisonVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected}\n\n"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Compare the same dimension in both historical situations before drawing a conclusion.",

        why:
          qObj.why ||
          `The comparison is supported by: ${rawAns}`,

        sol:
          qObj.sol ||
          rawAns,

        steps: [
          "Step 1: Identify both historical situations.",
          "Step 2: Choose the same dimension for comparison.",
          "Step 3: Identify the similarity or difference.",
          "Step 4: Explain the historical reason for it.",
          "Step 5: State the supported comparison."
        ],

        type:
          "open_response",

        concept:
          "Historical Comparison",

        mutationType:
          "historical_comparison"
      });
    }

    // ================================================================
    // 9. ECONOMIC & SOCIAL HISTORY
    // ================================================================

    const economicSignal =
      [
        "economy",
        "economic",
        "agriculture",
        "farming",
        "labour",
        "labor",
        "industry",
        "industrial",
        "tax",
        "taxation",
        "land",
        "cash crop",
        "cash crops",
        "trade",
        "market",
        "mining"
      ].some(
        signal =>
          lower.includes(signal)
      );

    if (economicSignal && rawAns) {

      const economicVariants = [

        `Which economic factor best explains the historical development described?`,

        `How did economic conditions influence the historical development in the question?`,

        `What economic consequence followed from the development described?`,

        `Explain the relationship between economic activity and the historical development in the question.`,

        `What evidence would demonstrate the economic impact of the development described?`,

        `If the economic factor identified in the question had changed, how might the historical outcome have differed?`
      ];

      const selected =
        pick(
          economicVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected}\n\n"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Consider land, labour, taxation, production, trade, markets and control of resources where relevant.",

        why:
          qObj.why ||
          `The relevant historical-economic explanation is ${rawAns}.`,

        sol:
          qObj.sol ||
          rawAns,

        steps: [
          "Step 1: Identify the historical development.",
          "Step 2: Identify the economic activity or resource involved.",
          "Step 3: Determine who benefited or was affected.",
          "Step 4: Connect the economic factor to the historical outcome.",
          "Step 5: State the supported conclusion."
        ],

        type:
          "open_response",

        concept:
          "Economic & Social History",

        mutationType:
          "economic_history_reasoning"
      });
    }

    // ================================================================
    // 10. PERSON / LEADER REASONING
    // ================================================================

    const leadershipSignal =
      [
        "leader",
        "leader's",
        "leader’s",
        "president",
        "king",
        "queen",
        "chief",
        "governor",
        "founder",
        "political figure"
      ].some(
        signal =>
          lower.includes(signal)
      );

    if (leadershipSignal && rawAns) {

      const leadershipVariants = [

        `What role did the historical figure play in the development described?`,

        `Which action or contribution best explains the historical figure's importance?`,

        `What historical evidence supports the role attributed to this leader?`,

        `What consequence followed from the actions of the historical figure described?`,

        `How might the historical development have differed if the figure had not taken the action described?`,

        `Why is this historical figure significant in the context of the question?`
      ];

      const selected =
        pick(
          leadershipVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected}\n\n"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Focus on the person's documented actions, role, context and historical consequences.",

        why:
          qObj.why ||
          `The relevant historical answer is ${rawAns}.`,

        sol:
          qObj.sol ||
          rawAns,

        steps: [
          "Step 1: Identify the historical figure.",
          "Step 2: Identify the historical period.",
          "Step 3: Identify the figure's actions or role.",
          "Step 4: Connect those actions to historical consequences.",
          "Step 5: State the supported conclusion."
        ],

        type:
          "open_response",

        concept:
          "Historical Leadership",

        mutationType:
          "leadership_reasoning"
      });
    }

    // ================================================================
    // 11. REVERSE HISTORICAL REASONING
    // ================================================================

    if (rawAns.length > 3) {

      const reverseVariants = [

        `Which historical concept best explains the answer to this question?`,

        `What historical evidence would best support the answer to this question?`,

        `What cause or process leads to the answer "${rawAns}"?`,

        `Which statement BEST explains why "${rawAns}" is historically appropriate?`,

        `What consequence would provide evidence that "${rawAns}" is correct?`,

        `What historical context must be true for "${rawAns}" to be the correct answer?`
      ];

      const selected =
        pick(
          reverseVariants,
          variantIndex
        );

      return makeResult({

        q:
          `${selected}\n\nOriginal question:\n"${stem}"`,

        ans:
          rawAns,

        hint:
          qObj.hint ||
          "Use historical evidence, chronology, context, cause and effect, and significance.",

        why:
          qObj.why ||
          `The relevant historical explanation is ${rawAns}.`,

        sol:
          qObj.sol ||
          qObj.why ||
          rawAns,

        steps: [
          "Step 1: Identify the original historical claim.",
          "Step 2: Identify the historical context.",
          "Step 3: Determine what evidence or process supports the answer.",
          "Step 4: Test whether alternative explanations fit the context.",
          "Step 5: State the historically supported conclusion."
        ],

        type:
          "open_response",

        concept:
          "Integrated Historical Reasoning",

        mutationType:
          "reverse_reasoning"
      });
    }

    // ================================================================
    // 12. SAFE DETERMINISTIC FALLBACK
    // ================================================================

    const fallbackVariants = [

      `Explain the historical concept being tested in the following question:\n"${stem}"`,

      `Identify the historical evidence needed to answer the following question:\n"${stem}"`,

      `What historical context is necessary to answer the following question?\n"${stem}"`,

      `What cause, process or relationship should a learner examine to answer the following question?\n"${stem}"`,

      `Why is the issue raised in the following question historically significant?\n"${stem}"`,

      `Evaluate the historical reasoning required by the following question:\n"${stem}"`
    ];

    const fallbackQuestion =
      pick(
        fallbackVariants,
        variantIndex
      );

    return makeResult({

      q:
        fallbackQuestion,

      ans:
        rawAns ||
        qObj.ans ||
        "",

      hint:
        qObj.hint ||
        "Use historical evidence, chronology, context, cause and effect, comparison and significance.",

      why:
        qObj.why ||
        "Historical questions should be answered using evidence and historical context rather than keyword recognition.",

      sol:
        qObj.sol ||
        qObj.ans ||
        "",

      steps: [
        "Step 1: Identify the historical topic.",
        "Step 2: Establish the relevant historical context.",
        "Step 3: Identify the evidence or historical relationship involved.",
        "Step 4: Apply chronological and cause-and-effect reasoning.",
        "Step 5: State and justify the historical conclusion."
      ],

      type:
        qObj.type ||
        "open_response",

      options:
        qObj.options ||
        null,

      concept:
        "General Historical Reasoning",

      mutationType:
        "deterministic_fallback"
    });
  }

  // ================================================================
  // MODALITY NORMALIZATION
  // ================================================================

  normalizeModality(value) {

    const numeric =
      Number(value);

    if (!Number.isFinite(numeric)) {
      return 0;
    }

    const integer =
      Math.trunc(numeric);

    return (
      ((integer % 6) + 6) % 6
    );
  }

  // ================================================================
  // VARIANT NORMALIZATION
  // ================================================================

  normalizeVariant(value) {

    const numeric =
      Number(value);

    if (!Number.isFinite(numeric)) {
      return 0;
    }

    const integer =
      Math.trunc(numeric);

    return (
      ((integer % 1000) + 1000) % 1000
    );
  }
}