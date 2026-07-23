/**
 * Computer Studies Subject Mutator
 * Intelligent Computer Science & IT Engine:
 * - Dynamic Number System Converter (Decimal ↔ Binary ↔ Hexadecimal) with calculated binary output.
 * - Data Storage & Unit Converter (Bits, Bytes, KB, MB, GB).
 * - Real-World IT Support & System Architecture Diagnostic Scenarios (Hardware, RAM vs ROM, Networks, Cybersecurity).
 * - Generates 4 plausible technical MCQ options with step-by-step logic.
 */

export class ComputerMutator {
  mutate(qObj) {
    if (!qObj) return null;
    const stem = (qObj.q || qObj.stem || "").trim();
    const lower = stem.toLowerCase();
    const rawAns = String(qObj.ans || "");

    // 1. Dynamic Binary <-> Decimal Number System Engine
    if (lower.includes("binary") || lower.includes("decimal") || lower.includes("convert") || lower.includes("base 2") || lower.includes("base 10") || lower.includes("bit")) {
      const dec = Math.floor(Math.random() * 120) + 15; // 15 to 135
      const bin = dec.toString(2);
      const isDecToBin = Math.random() > 0.5;

      if (isDecToBin) {
        return {
          q: `[Number Systems Conversion] A computer system processes integer values in binary. Convert the decimal number ${dec} into its 8-bit binary representation.`,
          ans: bin.padStart(8, "0"),
          hint: "Repeatedly divide the decimal number by 2 and record remainders from bottom to top.",
          why: `Decimal ${dec} in binary is ${bin.padStart(8, "0")}.\nDivide by 2 repeatedly: ${dec} ÷ 2 = ${Math.floor(dec / 2)} rem ${dec % 2}...`,
          sol: bin.padStart(8, "0"),
          steps: [
            `Step 1: Divide decimal ${dec} by 2 repeatedly`,
            `Step 2: Collect remainders in reverse order: ${bin}`,
            `Step 3: Pad to 8-bits: ${bin.padStart(8, "0")}`
          ],
          type: "mcq",
          options: [
            bin.padStart(8, "0"),
            (dec + 1).toString(2).padStart(8, "0"),
            (dec - 2).toString(2).padStart(8, "0"),
            (dec + 4).toString(2).padStart(8, "0")
          ]
        };
      } else {
        return {
          q: `[Digital Data Encoding] A CPU register holds a binary string '${bin}'. What is the equivalent decimal value represented by this binary code?`,
          ans: `${dec}`,
          hint: "Multiply each binary digit by its positional power of 2 (128, 64, 32, 16, 8, 4, 2, 1) and sum.",
          why: `Binary ${bin} = Decimal ${dec}. Positional sum of active bits equals ${dec}.`,
          sol: `${dec}`,
          steps: [
            `Step 1: Assign binary place values (1, 2, 4, 8, 16, 32, 64...)`,
            `Step 2: Multiply each binary digit '1' by its place value`,
            `Step 3: Add the products together: Total = ${dec}`
          ],
          type: "mcq",
          options: [`${dec}`, `${dec + 1}`, `${dec - 2}`, `${dec * 2}`]
        };
      }
    }

    // 2. Data Storage & Capacity Calculations
    if (lower.includes("storage") || lower.includes("byte") || lower.includes("kilobyte") || lower.includes("megabyte") || lower.includes("gigabyte") || lower.includes("capacity")) {
      const mbSize = (Math.floor(Math.random() * 4) + 1) * 5; // 5, 10, 15, 20 MB
      const gbCapacity = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5 GB
      const totalMB = gbCapacity * 1000; // Using 1000 MB per GB standard
      const fileCount = Math.floor(totalMB / mbSize);

      return {
        q: `[Storage Capacity Calculation] A user has a USB flash drive with ${gbCapacity} GB of free storage space. How many high-resolution photos averaging ${mbSize} MB each can be stored on this drive? (Taking 1 GB = 1000 MB)`,
        ans: `${fileCount} photos`,
        hint: "Formula: Total Storage in MB ÷ File Size in MB",
        why: `Total Space = ${gbCapacity} GB × 1000 MB/GB = ${totalMB} MB.\nNumber of photos = ${totalMB} MB ÷ ${mbSize} MB = ${fileCount} photos.`,
        sol: `${fileCount} photos`,
        steps: [
          `Step 1: Convert flash drive capacity to MB: ${gbCapacity} GB × 1000 = ${totalMB} MB`,
          `Step 2: Divide total MB by individual file size: ${totalMB} ÷ ${mbSize}`,
          `Step 3: Maximum files stored = ${fileCount} photos`
        ],
        type: "mcq",
        options: [
          `${fileCount} photos`,
          `${fileCount / 2} photos`,
          `${fileCount + 50} photos`,
          `${gbCapacity * mbSize} photos`
        ]
      };
    }

    // 3. Hardware Architecture (CPU, RAM, ROM, Secondary Storage)
    if (lower.includes("ram") || lower.includes("rom") || lower.includes("cpu") || lower.includes("memory") || lower.includes("processor") || lower.includes("alu") || lower.includes("volatile")) {
      return {
        q: `[System Architecture Diagnostics] A computer user notices that opening multiple browser tabs causes the system to freeze. However, saved files remain intact after restarting the machine. Which hardware component was overwhelmed, and what is its primary characteristic?`,
        ans: "RAM (Random Access Memory); it is volatile temporary working memory",
        hint: "RAM holds active programs temporarily and loses data when powered off.",
        why: "RAM provides high-speed volatile storage for currently active tasks. Insufficient RAM slows down multitasking.",
        sol: "RAM; volatile temporary working memory",
        steps: [
          "Step 1: Analyze system symptom (Slowdown during active multitasking)",
          "Step 2: Distinguish Primary Memory (RAM) from Secondary Storage (Hard Drive)",
          "Step 3: Conclude RAM capacity was exceeded"
        ],
        type: "mcq",
        options: [
          "RAM (Random Access Memory); it is volatile temporary working memory",
          "ROM (Read-Only Memory); it is non-volatile permanent firmware storage",
          "SSD (Solid State Drive); it is secondary permanent storage",
          "Control Unit (CU); it coordinates instruction execution cycles"
        ]
      };
    }

    // 4. Cybersecurity, Networking & Internet Protocols
    if (lower.includes("network") || lower.includes("internet") || lower.includes("firewall") || lower.includes("phishing") || lower.includes("ip address") || lower.includes("router") || lower.includes("encryption")) {
      return {
        q: `[Cybersecurity Incident Report] An office employee receives an urgent email claiming to be from their bank asking them to click a link and verify password credentials. What cyber threat is this, and how should it be handled?`,
        ans: "Phishing attack; report email and do not click embedded links",
        hint: "Phishing uses fraudulent communication to trick users into revealing sensitive credentials.",
        why: "Phishing attacks impersonate legitimate organizations to steal sensitive user data like passwords and banking PINs.",
        sol: "Phishing attack; report and do not click link",
        steps: [
          "Step 1: Identify attack vector (Fraudulent email seeking credentials)",
          "Step 2: Classify security threat (Phishing social engineering)",
          "Step 3: State defense action (Do not click links; report immediately)"
        ],
        type: "mcq",
        options: [
          "Phishing attack; report email and do not click embedded links",
          "DDoS attack; disconnect router power cable immediately",
          "Ransomware infection; reformat hard drive partition",
          "Spyware injection; upgrade anti-virus firewall definitions"
        ]
      };
    }

    // 5. Generic Reverse Diagnostic IT Scenario
    if (rawAns && rawAns.length > 3) {
      return {
        q: `[IT Systems Investigation] Regarding: "${stem}"\nWhich computer science principle or system component governs this operation?`,
        ans: rawAns,
        hint: qObj.hint || "Relate IT operation to hardware, software, or network architecture.",
        why: qObj.why || `Computing principle: ${rawAns}`,
        sol: qObj.sol || qObj.why || rawAns,
        steps: [
          "Step 1: Identify data processing or hardware component involved",
          "Step 2: Recall computer science architectural rule",
          "Step 3: State conclusion"
        ],
        type: "mcq",
        options: [
          rawAns,
          "Fetch-Decode-Execute machine cycle in CPU",
          "Relational database primary key indexing",
          "Asymmetric RSA public-key cryptographic encryption"
        ]
      };
    }

    return {
      ...qObj,
      q: `[Computer Systems Check] ${stem}`,
      hint: qObj.hint || "Check hardware, software, or network rules.",
      steps: [
        "Step 1: Identify computer sub-system",
        "Step 2: Apply computing logic",
        "Step 3: Formulate answer"
      ]
    };
  }
}
