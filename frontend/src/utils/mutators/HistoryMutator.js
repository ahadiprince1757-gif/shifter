/**
 * History & Government Subject Mutator
 *
 * Intelligent Historical Reasoning Engine:
 *
 * CORE PRINCIPLE:
 * Never mutate a question into an unrelated topic.
 * Preserve the original historical concept while changing
 * the cognitive operation required to solve it.
 *
 * Capabilities:
 * - Kenyan History & Government
 * - African History
 * - World History
 * - Constitutional/Government Structures
 * - Historical Causes & Consequences
 * - Chronology
 * - Primary/Secondary Source Analysis
 * - Historical Significance
 * - Historical Comparison
 * - Trade & Economic History
 * - Colonialism & Nationalism
 * - Generates plausible MCQs
 * - Error detection
 * - Reverse historical reasoning
 */

export class HistoryMutator {

  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;

    const stem = String(qObj.q || qObj.stem || "").trim();
    if (!stem) return null;

    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "").trim();

    const mode =
      typeof modalityIndex === "number"
        ? ((modalityIndex % 6) + 6) % 6
        : Math.floor(Math.random() * 6);

    // ---------------------------------------------------------
    // Utility Functions
    // ---------------------------------------------------------

    const shuffle = (arr) => {
      const copy = [...arr];

      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }

      return copy;
    };

    const unique = (arr) => [...new Set(arr.filter(Boolean))];

    const makeMCQ = ({
      q,
      answer,
      options,
      hint,
      why,
      steps,
      explanation
    }) => {

      const finalOptions = shuffle(
        unique([answer, ...options])
      ).slice(0, 4);

      return {
        q,
        ans: answer,
        hint,
        why: why || explanation || answer,
        sol: answer,
        steps,
        type: "mcq",
        options: finalOptions
      };
    };

    const baseSteps = [
      "Step 1: Identify the historical event, institution, person, or process.",
      "Step 2: Examine the evidence and historical context.",
      "Step 3: Connect the evidence to the relevant historical principle.",
      "Step 4: Eliminate explanations that do not fit the context.",
      "Step 5: State the historically supported conclusion."
    ];

    // =========================================================
    // 1. GOVERNMENT & CONSTITUTIONAL STRUCTURES
    // =========================================================

    if (
      lower.includes("constitution") ||
      lower.includes("government") ||
      lower.includes("parliament") ||
      lower.includes("legislature") ||
      lower.includes("executive") ||
      lower.includes("judiciary") ||
      lower.includes("president") ||
      lower.includes("senate") ||
      lower.includes("national assembly") ||
      lower.includes("court") ||
      lower.includes("bill") ||
      lower.includes("devolution") ||
      lower.includes("county")
    ) {

      const governanceCases = [

        {
          keywords: ["legislature", "parliament", "law", "bill"],
          answer: "Legislature",
          concept: "law-making",
          alternatives: [
            "Executive",
            "Judiciary",
            "Public Service"
          ],
          explanation:
            "The legislature performs the law-making function by debating, considering, amending where appropriate, and passing legislation."
        },

        {
          keywords: ["executive", "implement", "policy", "administration"],
          answer: "Executive",
          concept: "implementation of laws and public policy",
          alternatives: [
            "Legislature",
            "Judiciary",
            "Electoral Commission"
          ],
          explanation:
            "The Executive is primarily responsible for implementing laws and administering government policy."
        },

        {
          keywords: ["judiciary", "court", "justice", "interpret", "legal dispute"],
          answer: "Judiciary",
          concept: "interpretation and application of law",
          alternatives: [
            "Legislature",
            "Executive",
            "County Assembly"
          ],
          explanation:
            "The Judiciary interprets and applies the law through the court system and determines legal disputes."
        },

        {
          keywords: ["devolution", "county", "local government"],
          answer: "Devolution",
          concept: "distribution of governmental functions and resources to county governments",
          alternatives: [
            "Centralization",
            "Privatization",
            "Federal taxation"
          ],
          explanation:
            "Devolution distributes specified governmental functions and resources between national and county levels of government."
        }
      ];

      const selected =
        governanceCases.find(item =>
          item.keywords.some(k => lower.includes(k))
        );

      if (selected) {

        if (mode === 0) {
          return {
            q: `Which arm or governmental principle is primarily associated with ${selected.concept}?`,
            ans: selected.answer,
            hint: `Focus on the constitutional function being described.`,
            why: selected.explanation,
            sol: selected.answer,
            steps: baseSteps,
            type: "open_response",
            options: null
          };
        }

        if (mode === 1) {
          return makeMCQ({
            q: `Which institution or governmental principle is primarily responsible for ${selected.concept}?`,
            answer: selected.answer,
            options: selected.alternatives,
            hint: "Match the described function with the institution responsible for it.",
            why: selected.explanation,
            steps: baseSteps
          });
        }

        if (mode === 2) {

          const wrong = selected.alternatives[0];

          return {
            q:
              `A student argues that "${wrong}" is primarily responsible for ` +
              `${selected.concept}. Is the claim correct? Give the correct answer and explain why.`,

            ans:
              `Incorrect. The correct answer is ${selected.answer}. ` +
              `${selected.explanation}`,

            hint:
              "Distinguish the functions of the different organs of government.",

            why: selected.explanation,

            sol: selected.answer,

            steps: [
              "Step 1: Identify the governmental function.",
              "Step 2: Recall the constitutional role associated with that function.",
              `Step 3: Compare the proposed answer (${wrong}) with the correct institution.`,
              `Step 4: Conclude that the correct answer is ${selected.answer}.`
            ],

            type: "open_response",
            options: null
          };
        }

        if (mode === 3) {
          return {
            q:
              `Explain why ${selected.answer} is associated with ` +
              `${selected.concept}.`,

            ans: selected.explanation,

            hint:
              "Explain the relationship between institutional responsibility and governmental function.",

            why: selected.explanation,

            sol: selected.explanation,

            steps: [
              "Step 1: Identify the institution.",
              "Step 2: State its constitutional/governmental role.",
              "Step 3: Connect the role to the scenario."
            ],

            type: "open_response",
            options: null
          };
        }

        if (mode === 4) {
          return makeMCQ({
            q:
              `Which statement BEST explains the role of ${selected.answer} in relation to ${selected.concept}?`,

            answer: selected.explanation,

            options: [
              `${selected.alternatives[0]} performs the function instead.`,
              `${selected.alternatives[1]} is constitutionally responsible for it.`,
              `${selected.alternatives[2]} has primary responsibility for it.`
            ],

            hint:
              "Choose the explanation that correctly connects the institution to its function.",

            why: selected.explanation,

            steps: baseSteps
          });
        }

        // mode 5 = reverse inquiry

        return {
          q:
            `If ${selected.answer} did NOT perform its role concerning ` +
            `${selected.concept}, which constitutional or governmental ` +
            `function would be affected? Explain.`,

          ans: selected.explanation,

          hint:
            "Work backwards from the institution's responsibility to its consequence.",

          why: selected.explanation,

          sol: selected.explanation,

          steps: [
            "Step 1: Identify the institution.",
            "Step 2: Identify its normal responsibility.",
            "Step 3: Imagine that responsibility is not performed.",
            "Step 4: Determine the governmental function affected."
          ],

          type: "open_response",
          options: null
        };
      }
    }

    // =========================================================
    // 2. HISTORICAL SOURCES
    // =========================================================

    if (
      lower.includes("source") ||
      lower.includes("artifact") ||
      lower.includes("archaeolog") ||
      lower.includes("oral tradition") ||
      lower.includes("written source") ||
      lower.includes("primary source") ||
      lower.includes("secondary source") ||
      lower.includes("fossil") ||
      lower.includes("document") ||
      lower.includes("diary") ||
      lower.includes("letter")
    ) {

      const sourceTypes = [
        {
          keys: ["artifact", "archaeolog", "pottery", "tool", "iron"],
          answer: "Archaeological source",
          explanation:
            "Physical remains such as pottery, tools, buildings, and iron objects provide direct material evidence about past societies.",
          alternatives: [
            "Oral tradition",
            "Secondary source",
            "Fictional source"
          ]
        },

        {
          keys: ["diary", "letter", "eyewitness", "original document"],
          answer: "Primary source",
          explanation:
            "A primary source is direct evidence produced during the period or event being studied, such as an original letter, diary, photograph, or official record.",
          alternatives: [
            "Secondary source",
            "Tertiary source",
            "Modern interpretation"
          ]
        },

        {
          keys: ["oral tradition", "oral history", "elder", "tradition"],
          answer: "Oral source",
          explanation:
            "Oral traditions preserve historical information through spoken accounts transmitted between generations.",
          alternatives: [
            "Archaeological source",
            "Written source",
            "Satellite image"
          ]
        }
      ];

      const selected = sourceTypes.find(item =>
        item.keys.some(k => lower.includes(k))
      );

      if (selected) {

        if (mode === 0) {
          return {
            q:
              `Identify the type of historical source most relevant to the evidence described in:\n"${stem}"`,

            ans: selected.answer,
            hint: "Look at how the historical evidence was produced or preserved.",
            why: selected.explanation,
            sol: selected.answer,
            steps: [
              "Step 1: Identify the form of evidence.",
              "Step 2: Determine whether it is physical, oral, written, or an interpretation.",
              "Step 3: Classify the source."
            ],
            type: "open_response",
            options: null
          };
        }

        if (mode === 1) {
          return makeMCQ({
            q:
              `Which type of historical source is represented by the evidence described in the question?`,

            answer: selected.answer,
            options: selected.alternatives,

            hint:
              "Classify the evidence according to how it provides historical information.",

            why: selected.explanation,
            steps: baseSteps
          });
        }

        if (mode === 2) {

          return {
            q:
              `A historian claims that the evidence in the question is a ` +
              `${selected.alternatives[0]}. Evaluate the claim and give the correct classification.`,

            ans:
              `The claim is incorrect. The evidence is best classified as ${selected.answer}. ${selected.explanation}`,

            hint:
              "Identify the actual form of evidence before classifying it.",

            why: selected.explanation,

            sol: selected.answer,

            steps: [
              "Step 1: Identify the evidence.",
              "Step 2: Determine how the evidence originated.",
              "Step 3: Compare it with the proposed classification.",
              "Step 4: Give the correct classification."
            ],

            type: "open_response",
            options: null
          };
        }

        return makeMCQ({
          q:
            `Why would a historian consider the described evidence useful when reconstructing the past?`,

          answer: selected.explanation,

          options: [
            "Because every historical source is completely free from bias.",
            "Because historians never need to compare different sources.",
            "Because modern historians can simply assume the source is accurate."
          ],

          hint:
            "Think about how historians use evidence to reconstruct the past.",

          why: selected.explanation,

          steps: [
            "Step 1: Identify the nature of the source.",
            "Step 2: Determine what information it can provide.",
            "Step 3: Consider reliability, context, and possible bias.",
            "Step 4: Explain its historical value."
          ]
        });
      }
    }

    // =========================================================
    // 3. CAUSE & EFFECT
    // =========================================================

    if (
      lower.includes("cause") ||
      lower.includes("reason") ||
      lower.includes("result") ||
      lower.includes("effect") ||
      lower.includes("consequence") ||
      lower.includes("why did") ||
      lower.includes("led to") ||
      lower.includes("impact")
    ) {

      if (rawAns) {

        const question =
          mode === 0
            ? `What was the most important historical reason or cause associated with this event?\n"${stem}"`
            : mode === 1
              ? `Which factor best explains the historical outcome described in the question?\n"${stem}"`
              : mode === 2
                ? `What was one important consequence of the historical development described in the question?`
                : mode === 3
                  ? `Explain the cause-and-effect relationship in the following historical question:\n"${stem}"`
                  : mode === 4
                    ? `Which statement best explains WHY the historical event in this question occurred?`
                    : `If the main cause identified in this question had not occurred, how might the historical outcome have differed?`;

        return {
          q: question,

          ans: rawAns,

          hint:
            qObj.hint ||
            "Separate immediate causes from long-term causes and distinguish causes from consequences.",

          why:
            qObj.why ||
            `The historical explanation is: ${rawAns}`,

          sol:
            qObj.sol ||
            rawAns,

          steps: [
            "Step 1: Identify the historical event or development.",
            "Step 2: Identify the conditions surrounding it.",
            "Step 3: Distinguish causes from consequences.",
            "Step 4: Connect the relevant factor to the historical outcome.",
            "Step 5: State the conclusion using historical evidence."
          ],

          type: mode === 1 || mode === 4 ? "mcq" : "open_response",

          options:
            mode === 1 || mode === 4
              ? unique([
                  rawAns,
                  "A factor that occurred much later and therefore could not have caused the event.",
                  "An unrelated geographical feature with no connection to the event.",
                  "A purely speculative explanation unsupported by historical context."
                ])
              : null
        };
      }
    }

    // =========================================================
    // 4. COLONIALISM & NATIONALISM
    // =========================================================

    if (
      lower.includes("colonial") ||
      lower.includes("imperial") ||
      lower.includes("nationalism") ||
      lower.includes("independence") ||
      lower.includes("missionary") ||
      lower.includes("settler") ||
      lower.includes("resistance") ||
      lower.includes("mau mau") ||
      lower.includes("scramble for africa")
    ) {

      const concepts = [
        {
          keys: ["nationalism", "independence"],
          answer: "Nationalism",
          explanation:
            "Nationalism encouraged people to seek political self-determination and challenge colonial rule.",
          alternatives: [
            "Colonial expansion",
            "Mercantilism",
            "Feudalism"
          ]
        },

        {
          keys: ["resistance", "mau mau"],
          answer: "African resistance to colonial rule",
          explanation:
            "Resistance movements challenged colonial political, economic, and social control using different strategies depending on the historical context.",
          alternatives: [
            "European industrialization",
            "Africanization of colonial administration",
            "Expansion of the Atlantic slave trade"
          ]
        },

        {
          keys: ["missionary"],
          answer: "Missionary activity",
          explanation:
            "Christian missionaries played roles in education, evangelization, health services, and cultural change during the colonial period.",
          alternatives: [
            "Industrial revolution",
            "Military conscription alone",
            "Trans-Saharan camel trade"
          ]
        }
      ];

      const selected = concepts.find(c =>
        c.keys.some(k => lower.includes(k))
      );

      if (selected) {

        return makeMCQ({
          q:
            `Which historical concept best explains the development described in the question?`,

          answer: selected.answer,

          options: selected.alternatives,

          hint:
            "Use the historical context rather than matching only one keyword.",

          why: selected.explanation,

          steps: [
            "Step 1: Identify the historical period.",
            "Step 2: Identify the actors involved.",
            "Step 3: Determine the political, economic, or social process.",
            "Step 4: Match the process with the historical concept.",
            "Step 5: Eliminate concepts belonging to a different period or process."
          ]
        });
      }
    }

    // =========================================================
    // 5. HISTORICAL TRADE
    // =========================================================

    if (
      lower.includes("trade") ||
      lower.includes("merchant") ||
      lower.includes("barter") ||
      lower.includes("trade route") ||
      lower.includes("indian ocean") ||
      lower.includes("trans-saharan") ||
      lower.includes("gold") ||
      lower.includes("salt")
    ) {

      const tradeCases = [

        {
          keys: ["trans-saharan", "sahara", "salt", "gold"],
          answer: "Camel transport",
          explanation:
            "Camels were well adapted to long-distance travel across arid desert environments and therefore facilitated Trans-Saharan trade.",
          alternatives: [
            "Steam locomotives",
            "Ocean-going sailing ships",
            "Motor vehicles"
          ]
        },

        {
          keys: ["indian ocean", "coast", "monsoon"],
          answer: "Monsoon winds",
          explanation:
            "Seasonal monsoon winds enabled sailors to plan journeys between the East African coast, Arabia, India, and other Indian Ocean trading regions.",
          alternatives: [
            "Polar winds",
            "Tornadoes",
            "Glacial winds"
          ]
        }
      ];

      const selected = tradeCases.find(c =>
        c.keys.some(k => lower.includes(k))
      );

      if (selected) {

        if (mode === 0) {
          return {
            q:
              `Explain the historical importance of ${selected.answer} in the context described.`,

            ans: selected.explanation,

            hint:
              "Connect the factor to the practical conditions of the trading environment.",

            why: selected.explanation,

            sol: selected.explanation,

            steps: [
              "Step 1: Identify the trading environment.",
              "Step 2: Identify the challenge faced by traders.",
              "Step 3: Identify the factor that helped overcome the challenge.",
              "Step 4: Explain its effect on trade."
            ],

            type: "open_response",
            options: null
          };
        }

        return makeMCQ({
          q:
            `Which factor was most important in enabling the historical trade described in the question?`,

          answer: selected.answer,

          options: selected.alternatives,

          hint:
            "Match the environmental or technological factor to the trade route.",

          why: selected.explanation,

          steps: [
            "Step 1: Identify the trade route.",
            "Step 2: Identify its environmental conditions.",
            "Step 3: Determine what traders needed to overcome those conditions.",
            "Step 4: Select the historically appropriate factor."
          ]
        });
      }
    }

    // =========================================================
    // 6. CHRONOLOGY & SEQUENCE
    // =========================================================

    if (
      lower.includes("first") ||
      lower.includes("earlier") ||
      lower.includes("later") ||
      lower.includes("chronolog") ||
      lower.includes("sequence") ||
      lower.includes("order") ||
      lower.includes("before") ||
      lower.includes("after")
    ) {

      if (rawAns) {

        return {
          q:
            `Place the historical development described in the question in its correct chronological context and explain what happened before or after it.`,

          ans: rawAns,

          hint:
            qObj.hint ||
            "Use dates, periods, and the sequence of events to establish chronology.",

          why:
            qObj.why ||
            `The correct historical answer is ${rawAns}.`,

          sol:
            qObj.sol ||
            rawAns,

          steps: [
            "Step 1: Identify the event or development.",
            "Step 2: Identify its approximate historical period or date.",
            "Step 3: Compare it with related events.",
            "Step 4: Establish what occurred before and after it.",
            "Step 5: Confirm the chronological relationship."
          ],

          type: "open_response",
          options: null
        };
      }
    }

    // =========================================================
    // 7. HISTORICAL SIGNIFICANCE
    // =========================================================

    if (
      lower.includes("significance") ||
      lower.includes("importance") ||
      lower.includes("important") ||
      lower.includes("legacy")
    ) {

      if (rawAns) {

        return makeMCQ({
          q:
            `Which statement best explains the historical significance of the event or development described in the question?`,

          answer: rawAns,

          options: [
            "It had no meaningful effect on later historical developments.",
            "Its significance can only be understood through modern events.",
            "It was unrelated to the political, economic, or social conditions of its period."
          ],

          hint:
            "Historical significance concerns why an event mattered and what changed because of it.",

          why:
            qObj.why ||
            `Historical significance: ${rawAns}`,

          steps: [
            "Step 1: Identify the historical event.",
            "Step 2: Identify what changed because of it.",
            "Step 3: Consider its short-term and long-term effects.",
            "Step 4: Explain why historians consider it significant."
          ]
        });
      }
    }

    // =========================================================
    // 8. GENERAL REVERSE INQUIRY
    // =========================================================

    if (rawAns.length > 3) {

      const reverseQuestions = [
        `Which historical concept explains the answer to this question?\n"${stem}"`,
        `What historical evidence would best support the answer to this question?\n"${stem}"`,
        `What cause, process, or principle leads to the answer "${rawAns}"?`,
        `Which statement BEST explains why "${rawAns}" is the correct answer?`,
        `What would most likely change the historical conclusion in this question?`
      ];

      const q = reverseQuestions[mode % reverseQuestions.length];

      return {
        q,

        ans: rawAns,

        hint:
          qObj.hint ||
          "Use chronology, historical context, evidence, cause and effect, and historical significance.",

        why:
          qObj.why ||
          `The relevant historical explanation is ${rawAns}.`,

        sol:
          qObj.sol ||
          qObj.why ||
          rawAns,

        steps: [
          "Step 1: Identify the historical claim or answer.",
          "Step 2: Determine the historical context.",
          "Step 3: Identify the evidence or process supporting the answer.",
          "Step 4: Eliminate historically inconsistent explanations.",
          "Step 5: State the supported conclusion."
        ],

        type: mode === 1 || mode === 3 ? "mcq" : "open_response",

        options:
          mode === 1 || mode === 3
            ? unique([
                rawAns,
                "A historically unrelated development from another period.",
                "A consequence that occurred before the supposed cause.",
                "A modern interpretation with no connection to the historical evidence."
              ])
            : null
      };
    }

    // =========================================================
    // 9. SAFE FALLBACK
    // =========================================================

    return {
      ...qObj,

      q:
        mode === 0
          ? `[Historical Reasoning] Explain the historical basis of the following question:\n${stem}`
          : mode === 1
            ? `[Historical Reasoning] Which historical concept is being tested?\n${stem}`
            : mode === 2
              ? `[Historical Reasoning] What evidence would help answer this question?\n${stem}`
              : mode === 3
                ? `[Historical Reasoning] What cause or process explains this question?\n${stem}`
                : mode === 4
                  ? `[Historical Reasoning] What is the historical significance of the issue raised?\n${stem}`
                  : `[Historical Reasoning] Evaluate the historical claim made in this question:\n${stem}`,

      hint:
        qObj.hint ||
        "Use historical evidence, chronology, context, cause and effect, and significance.",

      why:
        qObj.why ||
        "Historical questions should be answered using evidence and contextual reasoning rather than keyword recognition.",

      sol:
        qObj.sol ||
        qObj.ans ||
        "",

      steps: [
        "Step 1: Identify the historical topic.",
        "Step 2: Establish the relevant historical context.",
        "Step 3: Identify the evidence or historical process involved.",
        "Step 4: Apply chronological and cause-and-effect reasoning.",
        "Step 5: State and justify the conclusion."
      ]
    };
  }
}