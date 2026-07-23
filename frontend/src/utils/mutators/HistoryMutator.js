/**
 * History & Government Subject Mutator
 * Intelligent History Engine:
 * - Dynamic Constitutional & Governance Scenarios (Legislature, Executive, Judiciary).
 * - Primary Source Analysis & Historical Cause-and-Effect Inquiries ("The Reverse Aha!").
 * - Generates 4 plausible historical MCQ choices with step-by-step contextual breakdowns.
 */

export class HistoryMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Arms of Government & Constitutional Roles
    if (lower.includes("constitution") || lower.includes("government") || lower.includes("parliament") || lower.includes("judiciary") || lower.includes("executive") || lower.includes("president") || lower.includes("court") || lower.includes("bill")) {
      const branches = [
        { name: "Legislature (Parliament)", role: "enacting laws and debating national legislation", head: "Speaker of the National Assembly / Senate" },
        { name: "Executive", role: "implementing laws and administering public policy", head: "President" },
        { name: "Judiciary", role: "interpreting laws and administering justice through courts", head: "Chief Justice" }
      ];
      const selected = branches[Math.floor(Math.random() * branches.length)];

      return {
        q: `[Government Role Scenario] A new national policy bill has been drafted. Which organ of government is constitutionally mandated for ${selected.role}?`,
        ans: selected.name,
        hint: `This organ is headed by the ${selected.head}.`,
        why: `The ${selected.name} is the organ of government constitutionally empowered for ${selected.role}.`,
        sol: selected.name,
        steps: [
          `Step 1: Identify constitutional function described (${selected.role})`,
          `Step 2: Compare arms of government (Legislature, Executive, Judiciary)`,
          `Step 3: Conclude ${selected.name} is responsible`
        ],
        type: "mcq",
        options: [
          selected.name,
          selected.name.includes("Legislature") ? "Executive" : "Legislature (Parliament)",
          selected.name.includes("Judiciary") ? "Executive" : "Judiciary",
          "Public Service Commission"
        ]
      };
    }

    // 2. Historical Trade Routes & International Relations
    if (lower.includes("trade") || lower.includes("trans-saharan") || lower.includes("indian ocean") || lower.includes("barter") || lower.includes("merchant") || lower.includes("coloni")) {
      return {
        q: `[Historical Trade Case Study] Merchants trading across the arid Sahara Desert required specialized means of transport to survive extreme temperatures and long distances without water. Which animal became indispensable for Trans-Saharan trade?`,
        ans: "Camel ('Ship of the Desert')",
        hint: "Uniquely adapted to store fat reserves and conserve water in desert travel.",
        why: "Camels could travel over 100 miles across sandy desert terrain carrying heavy commercial goods like gold and salt without frequent water stops.",
        sol: "Camel",
        steps: [
          "Step 1: Identify trade route described (Trans-Saharan desert trade)",
          "Step 2: Analyze transport requirements in arid desert conditions",
          "Step 3: Conclude camel transport enabled long-distance desert trade"
        ],
        type: "mcq",
        options: [
          "Camel ('Ship of the Desert')",
          "Horse and wooden carriage",
          "Donkey pack train",
          "Steam locomotive engine"
        ]
      };
    }

    // 3. Primary & Secondary Sources of History
    if (lower.includes("source") || lower.includes("archaeology") || lower.includes("oral") || lower.includes("written") || lower.includes("artifact") || lower.includes("fossil")) {
      return {
        q: `[Historical Methods Investigation] An archaeologist excavates a prehistoric site and discovers preserved iron slag, pottery fragments, and stone tools buried underground. How are these physical historical remains classified?`,
        ans: "Primary archaeological sources (artifacts)",
        hint: "Direct physical objects created or used by humans during the historical period under study.",
        why: "Artifacts are unwritten primary physical evidence directly created or used by human societies in the past.",
        sol: "Primary archaeological sources",
        steps: [
          "Step 1: Note type of evidence (Physical excavated objects: pottery, iron slag)",
          "Step 2: Distinguish primary physical evidence from secondary written interpretations",
          "Step 3: Conclude primary archaeological sources"
        ],
        type: "mcq",
        options: [
          "Primary archaeological sources (artifacts)",
          "Secondary written historical sources",
          "Tertiary digital archives",
          "Linguistic oral traditions"
        ]
      };
    }

    // 4. Reverse Historical Inquiry Mode
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[Historical Analysis Inquiry] Regarding the historical development: "${stem}"\nWhat was the primary historical cause or lasting political significance?`,
        ans: rawAns,
        hint: qObj.hint || "Analyze historical cause-and-effect relationships.",
        why: qObj.why || `Historical significance: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Contextualize the historical event or system",
          "Step 2: Trace immediate causes and long-term socio-political impacts",
          "Step 3: State historical significance"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Establishment of international diplomatic neutrality",
          "Abolition of traditional indirect administrative governance",
          "Centralization of fiscal revenue collection"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Historical Analysis Check] ${stem}`,
      hint: qObj.hint || "Focus on governance rules and historical context.",
      steps: [
        "Step 1: Identify historical event or governance structure",
        "Step 2: Apply historical analysis rule",
        "Step 3: State conclusion"
      ]
    };
  }
}
