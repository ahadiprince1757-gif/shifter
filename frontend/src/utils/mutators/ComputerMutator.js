/**
 * Computer Studies Subject Mutator
 * Provides multi-mode adaptive mutations:
 * - Mode 1: IT Troubleshooting Case Study & System Scenario
 * - Mode 2: Binary/Decimal Number System Randomization
 * - Mode 3: Hardware / Software Component Discrimination
 * - Mode 4: Cloze Computer Science Concept Completion
 */

const CS_SCENARIOS = [
  {
    keywords: ["binary", "decimal", "convert", "base", "bit", "byte"],
    gen: () => {
      const dec = Math.floor(Math.random() * 150) + 15; // 15 to 164
      const bin = dec.toString(2);
      const isDecToBin = Math.random() > 0.5;

      return isDecToBin ? {
        q: `[Number Systems Scenario] A computer processor receives data encoded as decimal number ${dec}. Convert this number into binary (base-2) format used by digital circuits.`,
        ans: bin,
        hint: "Repeatedly divide by 2 and record remainders bottom-up",
        why: `Decimal ${dec} = Binary ${bin}. Divide by 2 repeatedly and collect remainders in reverse order.`,
        sol: `Decimal ${dec} = Binary ${bin}. Divide by 2 repeatedly and collect remainders in reverse order.`,
        steps: ["Step 1: Divide decimal number by 2", "Step 2: Note the remainder (0 or 1)", "Step 3: Repeat until quotient is 0", "Step 4: Read remainders from bottom to top"],
        type: "mcq",
        options: [bin, (dec + 1).toString(2), (dec - 1).toString(2), (dec + 4).toString(2)]
      } : {
        q: `[Data Encoding Scenario] A network interface receives a binary data signal '${bin}'. What is the equivalent decimal value represented by this binary code?`,
        ans: `${dec}`,
        hint: "Multiply each bit by 2 raised to its position power (8-4-2-1)",
        why: `Binary ${bin} = Decimal ${dec}. Expand positional values using powers of 2.`,
        sol: `Binary ${bin} = Decimal ${dec}. Expand positional values using powers of 2.`,
        steps: ["Step 1: Assign binary place values (1, 2, 4, 8, 16...)", "Step 2: Multiply each binary digit by its place value", "Step 3: Sum the results to get decimal value"]
      };
    }
  },
  {
    keywords: ["hardware", "software", "input", "output", "storage", "cpu", "ram", "rom"],
    gen: () => {
      const cases = [
        {
          scenario: "A graphic designer needs to input high-resolution paper sketches into digital image files on a PC. Which computer input device should they use?",
          ans: "Scanner",
          distractors: ["Printer", "Monitor", "Plotter"],
          hint: "Optical device that captures physical images"
        },
        {
          scenario: "A video editor notices that their computer becomes extremely slow when running multiple large editing applications simultaneously. Upgrading which component will increase temporary memory capacity for active tasks?",
          ans: "RAM (Random Access Memory)",
          distractors: ["ROM", "Hard Drive", "Power Supply"],
          hint: "Volatile high-speed primary memory"
        }
      ];
      const selected = cases[Math.floor(Math.random() * cases.length)];

      return {
        q: `[IT Troubleshooting Scenario] ${selected.scenario}`,
        ans: selected.ans,
        hint: selected.hint,
        why: `The correct component is ${selected.ans}. ${selected.hint}.`,
        sol: `The correct component is ${selected.ans}. ${selected.hint}.`,
        steps: ["Step 1: Analyze user requirements in scenario", "Step 2: Match requirement to component type", "Step 3: Select correct device"],
        type: "mcq",
        options: [selected.ans, ...selected.distractors]
      };
    }
  }
];

export class ComputerMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    // 1. Scenario Match
    const match = CS_SCENARIOS.find(s => s.keywords.some(kw => stem.includes(kw)));
    if (match) {
      return match.gen();
    }

    // 2. Cloze Check
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const maskedIdx = Math.floor(words.length / 2);
        const targetWord = words[maskedIdx];
        const masked = [...words];
        masked[maskedIdx] = "________";

        return {
          q: `[Computing Concept Check] Fill in the missing term: "${masked.join(" ")}"`,
          ans: targetWord,
          hint: qObj.hint || `Computing term starts with '${targetWord.charAt(0).toUpperCase()}'`,
          why: `Full statement: ${qObj.ans}`,
          sol: qObj.why || `Full statement: ${qObj.ans}`,
          steps: ["Step 1: Read computing statement", "Step 2: Identify missing technical term", "Step 3: Fill in the blank"]
        };
      }
    }

    // 3. Application Scaffold Fallback
    return {
      ...qObj,
      q: `[IT Systems Check] Regarding "${qObj.q || qObj.stem}": How does this function within a computer system?`,
      hint: qObj.hint || "Apply hardware, software, or data principles",
      steps: ["Step 1: Identify computer sub-system", "Step 2: Recall data flow or processing logic", "Step 3: State conclusion"]
    };
  }
}
