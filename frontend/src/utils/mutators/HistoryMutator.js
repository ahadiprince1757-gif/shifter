/**
 * History & Government Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: Historical Case Study & Primary Source Scenario
 * - Mode 2: Constitutional & Government Role Discrimination
 * - Mode 3: Cause and Effect Analysis
 * - Mode 4: Cloze Historical Concept Completion
 */

const HISTORY_SCENARIOS = [
  {
    keywords: ["constitution", "government", "parliament", "judiciary", "executive", "president", "court"],
    gen: () => {
      const branches = [
        { name: "Legislature (Parliament)", role: "enacting and passing laws", head: "Speaker of the National Assembly / Senate" },
        { name: "Executive", role: "implementing laws and administering government policy", head: "President" },
        { name: "Judiciary", role: "interpreting laws and administering justice through courts", head: "Chief Justice" }
      ];
      const selected = branches[Math.floor(Math.random() * branches.length)];

      return {
        q: `[Government Role Scenario] A new bill is drafted to reform national education. Which arm of government is constitutionally mandated for ${selected.role}?`,
        ans: selected.name,
        hint: `Headed by the ${selected.head}`,
        why: `The ${selected.name} is the organ of government responsible for ${selected.role}.`,
        sol: `The ${selected.name} is the organ of government responsible for ${selected.role}.`,
        steps: ["Step 1: Identify government function in scenario", "Step 2: Compare arms of government", "Step 3: State correct branch"],
        type: "mcq",
        options: ["Legislature (Parliament)", "Executive", "Judiciary", "Public Service Commission"]
      };
    }
  },
  {
    keywords: ["trade", "trans-saharan", "indian ocean", "barter", "currency", "merchant"],
    gen: () => {
      return {
        q: `[Historical Trade Case Study] Merchants trading across the Sahara Desert required specialized means of transport to survive harsh desert conditions. Which animal became known as the 'ship of the desert' enabling long-distance Trans-Saharan trade?`,
        ans: "Camel",
        hint: "Adapted to withstand long periods without water",
        why: "Camels were uniquely adapted to desert travel, carrying heavy loads across arid terrain.",
        sol: "Camels were uniquely adapted to desert travel, carrying heavy loads across arid terrain.",
        steps: ["Step 1: Identify trade route described (Trans-Saharan)", "Step 2: Consider desert transport requirements", "Step 3: State key pack animal"],
        type: "mcq",
        options: ["Camel", "Horse", "Donkey", "Ox"]
      };
    }
  }
];

export class HistoryMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Historical Scenario Match
    const match = HISTORY_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Historical Concept Completion
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 6) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Historical Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Historical term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full statement: ${qObj.ans}`,
          sol: qObj.why || `Full statement: ${qObj.ans}`,
          steps: ["Step 1: Read historical statement", "Step 2: Recall key event/term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[Historical Cause & Effect Check] Regarding "${qObj.q || qObj.stem}": What was the primary historical cause or significance?`,
      hint: qObj.hint || "Focus on key historical factors and significance",
      steps: ["Step 1: Recall historical context", "Step 2: Identify primary cause/significance", "Step 3: State conclusion"]
    };
  }
}
