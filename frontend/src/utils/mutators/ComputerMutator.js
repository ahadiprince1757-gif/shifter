/**
 * Computer Studies Subject Mutator
 * Handles hardware, software, programming concepts, and data representation.
 */

const CS_TEMPLATES = [
  {
    keywords: ["binary", "decimal", "convert", "base", "bit", "byte"],
    gen: () => {
      const decimal = Math.floor(Math.random() * 200) + 10; // 10 to 209
      const binary = decimal.toString(2);
      const isDecToBin = Math.random() > 0.5;

      return isDecToBin ? {
        q: `Convert the decimal number ${decimal} to binary (base 2).`,
        ans: binary,
        hint: "Repeatedly divide by 2 and record remainders",
        why: `${decimal} in binary = ${binary}. Divide by 2 repeatedly, read remainders bottom-up.`,
        sol: `${decimal} in binary = ${binary}. Divide by 2 repeatedly, read remainders bottom-up.`,
        steps: ["Step 1: Divide number by 2", "Step 2: Record remainder", "Step 3: Repeat until quotient is 0", "Step 4: Read remainders from bottom to top"]
      } : {
        q: `Convert the binary number ${binary} to decimal (base 10).`,
        ans: `${decimal}`,
        hint: "Multiply each bit by 2 raised to its position power",
        why: `Binary ${binary} = ${decimal} in decimal. Expand using powers of 2.`,
        sol: `Binary ${binary} = ${decimal} in decimal. Expand using powers of 2.`,
        steps: ["Step 1: Write positional values (powers of 2)", "Step 2: Multiply each bit by its positional value", "Step 3: Sum all products"]
      };
    }
  },
  {
    keywords: ["hardware", "software", "input", "output", "storage", "cpu", "ram", "rom"],
    gen: () => {
      const items = [
        { device: "Keyboard", category: "Input device", why: "It sends data (keystrokes) to the computer for processing." },
        { device: "Monitor", category: "Output device", why: "It displays processed information to the user." },
        { device: "Hard Disk", category: "Storage device", why: "It permanently stores programs and files." },
        { device: "Printer", category: "Output device", why: "It produces hard copies of digital documents." },
        { device: "Mouse", category: "Input device", why: "It sends positional data and click commands to the computer." },
        { device: "RAM", category: "Primary memory", why: "It temporarily stores data currently in use by the CPU." }
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        q: `Classify the following computer component: ${item.device}`,
        ans: item.category,
        hint: `Does it send data in, display data out, or store data?`,
        why: `${item.device} is classified as a ${item.category}. ${item.why}`,
        sol: `${item.device} is classified as a ${item.category}. ${item.why}`,
        steps: ["Step 1: Identify what the device does", "Step 2: Determine if it sends, displays, or stores data", "Step 3: Classify accordingly"],
        type: "mcq",
        options: ["Input device", "Output device", "Storage device", "Primary memory"].filter((v, i, a) => a.indexOf(v) === i)
      };
    }
  }
];

export class ComputerMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").toLowerCase();

    for (const item of CS_TEMPLATES) {
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
          q: `Complete the computing concept: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Key term starts with '${target.charAt(0).toUpperCase()}'`,
          why: `Full concept: ${qObj.ans}`,
          sol: qObj.why || qObj.ans,
          steps: ["Step 1: Read the statement", "Step 2: Identify missing computing term", "Step 3: Fill in the blank"]
        };
      }
    }

    return {
      ...qObj,
      q: `[COMPUTER STUDIES RETRY] ${qObj.q || qObj.stem}`,
      hint: qObj.hint || "Apply computing fundamentals",
      steps: ["Step 1: Identify concept area", "Step 2: Recall key principle", "Step 3: State answer"]
    };
  }
}
