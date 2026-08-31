/**
 * TIXAR COMPUTER STUDIES MUTATOR
 * Version 3.0
 *
 * Design:
 *
 *       ORIGINAL QUESTION
 *              â†“
 *       CONCEPT DETECTION
 *              â†“
 *       QUESTION STRUCTURE
 *              â†“
 *       PARAMETER MUTATION
 *              â†“
 *       SOLVER
 *              â†“
 *       DISTRACTOR / MISCONCEPTION ENGINE
 *              â†“
 *       DIAGNOSTIC QUESTION
 *
 * Core principle:
 *
 * NEVER mutate a question unless the answer can be
 * independently recalculated from the mutated parameters.
 */

export class ComputerMutator {
  constructor() {
    this.version = "3.0";

    this.storage = {
      bit: 1,
      byte: 8,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4,
    };

    this.gates = {
      AND: {
        fn: (a, b) => a & b,
        rule: "1 only when both inputs are 1",
      },

      OR: {
        fn: (a, b) => a | b,
        rule: "1 when at least one input is 1",
      },

      XOR: {
        fn: (a, b) => a ^ b,
        rule: "1 when the inputs are different",
      },

      NAND: {
        fn: (a, b) => Number(!(a & b)),
        rule: "the opposite of AND",
      },

      NOR: {
        fn: (a, b) => Number(!(a | b)),
        rule: "the opposite of OR",
      },
    };

    this.protocols = {
      HTTP: "transfers web resources without transport encryption by itself",
      HTTPS: "transfers web resources using TLS encryption",
      FTP: "transfers files",
      DNS: "translates domain names into IP addresses",
      DHCP: "automatically assigns network configuration",
      TCP: "provides reliable, ordered data delivery",
      UDP: "provides connectionless data delivery with lower overhead",
    };

    this.security = {
      phishing: {
        answer: "Phishing",
        clue: "fraudulent communication designed to trick users",
        misconception: "assuming a familiar logo or sender name proves authenticity",
      },

      ransomware: {
        answer: "Ransomware",
        clue: "malware encrypts files and demands payment",
        misconception: "thinking antivirus alone guarantees recovery",
      },

      ddos: {
        answer: "DDoS",
        clue: "many systems overwhelm a target with traffic",
        misconception: "confusing a traffic flood with malware infection",
      },

      spyware: {
        answer: "Spyware",
        clue: "software secretly monitors or collects information",
        misconception: "assuming every unwanted advertisement is spyware",
      },

      brute_force: {
        answer: "Brute-force attack",
        clue: "many password combinations are attempted",
        misconception: "confusing repeated guessing with phishing",
      },
    };

    this.dataStructures = {
      array: {
        name: "Array",
        clue: "elements are stored in indexed positions",
      },

      stack: {
        name: "Stack",
        clue: "uses Last-In, First-Out",
      },

      queue: {
        name: "Queue",
        clue: "uses First-In, First-Out",
      },

      linked_list: {
        name: "Linked List",
        clue: "elements are connected through references",
      },

      tree: {
        name: "Tree",
        clue: "represents hierarchical relationships",
      },
    };
  }

  // =========================================================
  // DETERMINISTIC RANDOMNESS
  // =========================================================

  _hash(value) {
    let hash = 2166136261;

    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);

      hash +=
        (hash << 1) +
        (hash << 4) +
        (hash << 7) +
        (hash << 8) +
        (hash << 24);
    }

    return hash >>> 0;
  }

  _seed(qObj, stem) {
    return this._hash(
      `${qObj.id || ""}|${stem}|${this.version}`
    );
  }

  _int(seed, min, max, offset = 0) {
    return min + ((seed + offset) % (max - min + 1));
  }

  _pick(array, seed, offset = 0) {
    return array[(seed + offset) % array.length];
  }

  _shuffle(items, seed) {
    const arr = [...items];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = (seed + i * 31) % (i + 1);

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  _steps(items) {
    return items.map(
      (item, index) => `Step ${index + 1}: ${item}`
    );
  }

  // =========================================================
  // TEXT UTILITIES
  // =========================================================

  _contains(text, terms) {
    return terms.some((term) =>
      text.includes(term.toLowerCase())
    );
  }

  _numbers(text) {
    return [...text.matchAll(/\b\d+(?:\.\d+)?\b/g)]
      .map((match) => Number(match[0]));
  }

  _replaceNumber(text, oldValue, newValue) {
    return text.replace(
      String(oldValue),
      String(newValue)
    );
  }

  // =========================================================
  // CONCEPT DETECTION
  // =========================================================

  _detectConcept(stem) {
    const text = stem.toLowerCase();

    /*
     * ORDER MATTERS.
     *
     * More specific concepts must be checked before
     * broader concepts.
     */

    if (
      this._contains(text, [
        "binary",
        "decimal",
        "hexadecimal",
        "base 2",
        "base 10",
        "base 16",
        "number system",
      ])
    ) {
      return "number_system";
    }

    if (
      this._contains(text, [
        "truth table",
        "logic gate",
        "and gate",
        "or gate",
        "xor",
        "nand",
        "nor",
        "boolean expression",
      ])
    ) {
      return "logic";
    }

    if (
      this._contains(text, [
        "ipv4",
        "ipv6",
        "ip address",
        "subnet",
        "subnet mask",
        "octet",
        "cidr",
      ])
    ) {
      return "ip";
    }

    if (
      this._contains(text, [
        "bit",
        "byte",
        "kilobyte",
        "megabyte",
        "gigabyte",
        "terabyte",
        "file size",
        "storage capacity",
      ])
    ) {
      return "storage";
    }

    if (
      this._contains(text, [
        "fetch",
        "decode",
        "execute",
        "machine cycle",
        "instruction cycle",
        "alu",
        "control unit",
        "register",
      ])
    ) {
      return "cpu";
    }

    if (
      this._contains(text, [
        "ram",
        "rom",
        "cache",
        "ssd",
        "hdd",
        "volatile",
        "non-volatile",
        "secondary storage",
      ])
    ) {
      return "hardware";
    }

    if (
      this._contains(text, [
        "dns",
        "dhcp",
        "http",
        "https",
        "ftp",
        "tcp",
        "udp",
        "router",
        "switch",
        "protocol",
        "network",
      ])
    ) {
      return "networking";
    }

    if (
      this._contains(text, [
        "phishing",
        "ransomware",
        "spyware",
        "ddos",
        "brute force",
        "malware",
        "firewall",
        "encryption",
        "authentication",
      ])
    ) {
      return "cybersecurity";
    }

    if (
      this._contains(text, [
        "primary key",
        "foreign key",
        "normalization",
        "sql",
        "database",
        "query",
        "record",
        "field",
      ])
    ) {
      return "database";
    }

    if (
      this._contains(text, [
        "big o",
        "complexity",
        "linear search",
        "binary search",
        "bubble sort",
        "algorithm",
      ])
    ) {
      return "algorithm";
    }

    if (
      this._contains(text, [
        "array",
        "stack",
        "queue",
        "linked list",
        "tree",
        "lifo",
        "fifo",
        "data structure",
      ])
    ) {
      return "data_structure";
    }

    if (
      this._contains(text, [
        "variable",
        "loop",
        "iteration",
        "if statement",
        "function",
        "pseudocode",
        "program",
        "code",
      ])
    ) {
      return "programming";
    }

    if (
      this._contains(text, [
        "operating system",
        "process scheduling",
        "memory management",
        "kernel",
        "multitasking",
        "file management",
      ])
    ) {
      return "operating_system";
    }

    return "unknown";
  }

  // =========================================================
  // NUMBER SYSTEMS
  // =========================================================

  _numberSystem(stem, mode, seed) {
    const decimal = this._int(seed, 12, 240, 7);

    const binary = decimal
      .toString(2)
      .padStart(8, "0");

    const hexadecimal = decimal
      .toString(16)
      .toUpperCase();

    const text = stem.toLowerCase();

    let target = "decimal";

    if (
      this._contains(text, [
        "binary",
        "base 2",
      ])
    ) {
      target = "binary";
    }

    if (
      this._contains(text, [
        "hexadecimal",
        "hex",
        "base 16",
      ])
    ) {
      target = "hex";
    }

    if (target === "binary") {
      return this._numberQuestion(
        decimal,
        binary,
        `${decimal}â‚â‚€ = ${binary}â‚‚`,
        mode,
        seed
      );
    }

    if (target === "hex") {
      return this._numberQuestion(
        decimal,
        hexadecimal,
        `${decimal}â‚â‚€ = ${hexadecimal}â‚â‚†`,
        mode,
        seed
      );
    }

    return this._numberQuestion(
      binary,
      decimal,
      `${binary}â‚‚ = ${decimal}â‚â‚€`,
      mode,
      seed
    );
  }

  _numberQuestion(input, answer, solution, mode, seed) {
    const isBinaryAnswer =
      typeof answer === "string" &&
      /^[01]+$/.test(String(answer));

    const distractors = isBinaryAnswer
      ? [
          Number(answer) + 1,
          Number(answer) - 1,
          Number(answer) + 8,
        ].map((x) =>
          Number(x)
            .toString(2)
            .padStart(8, "0")
        )
      : [
          Number(answer) + 1,
          Number(answer) - 1,
          Number(answer) + 8,
        ].map(String);

    const question = isBinaryAnswer
      ? `Convert decimal ${input} into an 8-bit binary number.`
      : `An 8-bit binary value is ${input}. What decimal value does it represent?`;

    return {
      concept: "number_system",
      q: question,
      ans: String(answer),
      hint: isBinaryAnswer
        ? "Use powers of 2 or repeated division by 2."
        : "Add the place values represented by the 1-bits.",
      sol: solution,

      steps: isBinaryAnswer
        ? this._steps([
            `Start with decimal ${input}.`,
            "Determine which powers of 2 are required.",
            `Write the bits from left to right.`,
            `Result: ${answer}.`,
          ])
        : this._steps([
            `Write the binary value ${input}.`,
            "Assign powers of 2 to each position.",
            "Add the values corresponding to 1-bits.",
            `Result: ${answer}.`,
          ]),

      why: `The answer is calculated from the mutated value ${input}.`,

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              String(answer),
              distractors,
              seed
            ),
    };
  }

  // =========================================================
  // STORAGE / DATA REPRESENTATION
  // =========================================================

  _storage(stem, mode, seed) {
    const fileMB = this._int(
      seed,
      2,
      20,
      5
    );

    const capacityGB = this._int(
      seed,
      2,
      10,
      17
    );

    const capacityMB =
      capacityGB * 1024;

    const files =
      Math.floor(capacityMB / fileMB);

    const answer = `${files} files`;

    return {
      concept: "storage",

      q:
        `A storage device has ${capacityGB} GB of free space. ` +
        `Each video requires ${fileMB} MB. ` +
        `Assuming 1 GB = 1024 MB, what is the maximum ` +
        `number of complete videos that can be stored?`,

      ans: answer,

      hint:
        "Convert both quantities to the same unit before dividing.",

      why:
        `${capacityGB} GB Ã— 1024 = ${capacityMB} MB. ` +
        `${capacityMB} Ã· ${fileMB} = ${files}.`,

      sol: answer,

      steps: this._steps([
        `${capacityGB} GB Ã— 1024 = ${capacityMB} MB.`,
        `${capacityMB} MB Ã· ${fileMB} MB = ${files}.`,
        `Only complete files count.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              answer,
              [
                `${Math.floor(files / 2)} files`,
                `${files + 10} files`,
                `${files - 10} files`,
              ],
              seed
            ),
    };
  }

  // =========================================================
  // LOGIC GATES
  // =========================================================

  _logic(stem, mode, seed) {
    const names = Object.keys(this.gates);
    const gateName = this._pick(
      names,
      seed
    );

    const gate = this.gates[gateName];

    const a = seed % 2;
    const b = Math.floor(seed / 2) % 2;

    const output = gate.fn(a, b);

    const correct = String(output);

    return {
      concept: "logic",

      q:
        `A ${gateName} gate receives ` +
        `A = ${a} and B = ${b}. ` +
        `What is the output?`,

      ans: correct,

      hint: gate.rule,

      why:
        `${gateName} applied to ${a} and ${b} gives ${correct}.`,

      sol: correct,

      steps: this._steps([
        `Identify the gate: ${gateName}.`,
        `Apply its rule: ${gate.rule}.`,
        `Evaluate ${a} and ${b}.`,
        `Output = ${correct}.`,
      ]),

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcq(
              correct,
              ["0", "1", "10"],
              seed
            ),
    };
  }

  // =========================================================
  // CPU
  // =========================================================

  _cpu(stem, mode, seed) {
    const stages = [
      {
        name: "Fetch",
        description:
          "retrieves the next instruction from memory",
      },

      {
        name: "Decode",
        description:
          "interprets the instruction",
      },

      {
        name: "Execute",
        description:
          "performs the required operation",
      },
    ];

    const stage = this._pick(
      stages,
      seed
    );

    return {
      concept: "cpu",

      q:
        `During the CPU instruction cycle, ` +
        `what happens during the ${stage.name} stage?`,

      ans: stage.description,

      hint:
        "Remember Fetch â†’ Decode â†’ Execute.",

      why:
        `${stage.name} is responsible for ${stage.description}.`,

      sol: stage.description,

      steps: this._steps([
        "Identify the CPU cycle stage.",
        `Recall the purpose of ${stage.name}.`,
        `Apply it to the instruction cycle.`,
        `Answer: ${stage.description}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        stage.description,
        stages
          .filter(
            x => x.name !== stage.name
          )
          .map(
            x => `${x.name}: ${x.description}`
          ),
        seed
      ),
    };
  }

  // =========================================================
  // HARDWARE
  // =========================================================

  _hardware(stem, mode, seed) {
    const scenarios = [
      {
        q:
          "A computer slows down when many applications " +
          "are running simultaneously. Which component " +
          "is most likely under pressure?",

        ans: "RAM",

        why:
          "RAM holds programs and data currently being used " +
          "by the computer and is volatile.",
      },

      {
        q:
          "A processor needs extremely fast access to " +
          "frequently used instructions. Which component " +
          "helps reduce access time?",

        ans: "Cache memory",

        why:
          "Cache is small, high-speed memory located close to the CPU.",
      },

      {
        q:
          "Which component retains files after the computer " +
          "is switched off?",

        ans: "Secondary storage",

        why:
          "SSD and HDD storage are non-volatile.",
      },

      {
        q:
          "Which component executes program instructions " +
          "and performs calculations?",

        ans: "CPU",

        why:
          "The CPU processes instructions and controls their execution.",
      },
    ];

    const scenario = this._pick(
      scenarios,
      seed
    );

    const options = [
      "RAM",
      "ROM",
      "Cache memory",
      "CPU",
      "Secondary storage",
      "Control Unit",
    ].filter(
      x => x !== scenario.ans
    );

    return {
      concept: "hardware",

      q:
        `[Hardware Diagnosis] ${scenario.q}`,

      ans: scenario.ans,

      hint:
        "Match the symptom or requirement to the component's function.",

      why: scenario.why,

      sol: scenario.ans,

      steps: this._steps([
        "Identify the observed problem.",
        "Determine which hardware function is involved.",
        `Match the function to ${scenario.ans}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        scenario.ans,
        options,
        seed
      ),
    };
  }

  // =========================================================
  // NETWORKING
  // =========================================================

  _networking(stem, mode, seed) {
    const names = Object.keys(
      this.protocols
    );

    const name = this._pick(
      names,
      seed
    );

    const answer =
      this.protocols[name];

    return {
      concept: "networking",

      q:
        `Which network protocol is primarily responsible ` +
        `for ${answer}?`,

      ans: name,

      hint:
        "Match the network task to the protocol's main role.",

      why:
        `${name}: ${answer}.`,

      sol: name,

      steps: this._steps([
        "Identify the network task.",
        "Match the task to a protocol.",
        `${name} performs this function.`,
      ]),

      type: "mcq",

      options: this._mcq(
        name,
        names.filter(
          x => x !== name
        ),
        seed
      ),
    };
  }

  // =========================================================
  // IP ADDRESSING
  // =========================================================

  _ip(stem, mode, seed) {
    const octets = [
      this._int(seed, 1, 223, 3),
      this._int(seed, 0, 255, 7),
      this._int(seed, 0, 255, 11),
      this._int(seed, 1, 254, 17),
    ];

    const ip = octets.join(".");

    return {
      concept: "ip",

      q:
        "Which of the following is a valid IPv4 address?",

      ans: ip,

      hint:
        "IPv4 contains four decimal octets. " +
        "Each octet must be between 0 and 255.",

      why:
        `${ip} contains four octets, each within 0â€“255.`,

      sol: ip,

      steps: this._steps([
        "Check that there are exactly four octets.",
        "Check that each octet is between 0 and 255.",
        `Therefore ${ip} is valid.`,
      ]),

      type: "mcq",

      options: this._mcq(
        ip,
        [
          `${octets[0]}.${octets[1]}.${octets[2]}.300`,
          `${octets[0]}.${octets[1]}.${octets[2]}`,
          `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}.5`,
        ],
        seed
      ),
    };
  }

  // =========================================================
  // CYBERSECURITY
  // =========================================================

  _cybersecurity(stem, mode, seed) {
    const threats = Object.values(
      this.security
    );

    const threat = this._pick(
      threats,
      seed
    );

    return {
      concept: "cybersecurity",

      q:
        `[Security Diagnosis] ` +
        `An incident matches this description: ` +
        `${threat.clue}. What type of attack is this?`,

      ans: threat.answer,

      hint:
        "Classify the attack from its observable behavior.",

      why:
        `${threat.answer} matches the description because ` +
        `${threat.clue}.`,

      sol: threat.answer,

      steps: this._steps([
        "Identify the observable behavior.",
        `Match the behavior to ${threat.answer}.`,
        `Reject similar threats using their defining characteristics.`,
      ]),

      type: "mcq",

      options: this._mcq(
        threat.answer,
        threats
          .filter(
            x => x.answer !== threat.answer
          )
          .map(
            x => x.answer
          ),
        seed
      ),
    };
  }

  // =========================================================
  // DATA STRUCTURES
  // =========================================================

  _dataStructure(stem, mode, seed) {
    const structures =
      Object.values(
        this.dataStructures
      );

    const structure =
      this._pick(
        structures,
        seed
      );

    return {
      concept: "data_structure",

      q:
        `Which data structure ${structure.clue}?`,

      ans: structure.name,

      hint:
        "Focus on how data is organized or accessed.",

      why:
        `${structure.name} ${structure.clue}.`,

      sol:
        structure.name,

      steps: this._steps([
        "Identify the required access pattern.",
        `Match it with: ${structure.clue}.`,
        `Therefore the answer is ${structure.name}.`,
      ]),

      type: "mcq",

      options: this._mcq(
        structure.name,
        structures
          .filter(
            x => x.name !== structure.name
          )
          .map(
            x => x.name
          ),
        seed
      ),
    };
  }

  // =========================================================
  // MCQ ENGINE
  // =========================================================

  _mcq(correct, distractors, seed) {
    const unique = [];

    for (
      const item of [correct, ...distractors]
    ) {
      const value = String(item);

      if (
        value &&
        !unique.includes(value)
      ) {
        unique.push(value);
      }
    }

    /*
     * Never duplicate "None of the above".
     * If fewer than four options exist,
     * generate controlled alternatives.
     */

    let counter = 1;

    while (unique.length < 4) {
      const fallback =
        `Alternative ${counter++}`;

      if (!unique.includes(fallback)) {
        unique.push(fallback);
      }
    }

    return this._shuffle(
      unique.slice(0, 4),
      seed
    );
  }

  // =========================================================
  // DIAGNOSTIC WRAPPER
  // =========================================================

  _decorate(result, qObj, concept, seed) {
    if (!result) return null;

    return {
      ...result,

      concept,

      mutation: {
        seed,
        version: this.version,
        generated: true,
      },

      diagnostic: {
        /*
         * These fields allow Tixar to later connect
         * question performance to misconceptions.
         */

        concept,

        misconceptionTags:
          this._misconceptions(
            concept,
            result
          ),

        difficulty:
          this._difficulty(
            concept,
            result
          ),
      },

      sourceQuestionId:
        qObj.id || null,
    };
  }

  // =========================================================
  // MISCONCEPTION ENGINE
  // =========================================================

  _misconceptions(concept) {
    const map = {
      number_system: [
        "place_value_error",
        "base_conversion_error",
        "bit_order_error",
      ],

      storage: [
        "unit_conversion_error",
        "division_error",
        "1024_vs_1000_error",
      ],

      logic: [
        "truth_table_error",
        "AND_OR_confusion",
        "XOR_confusion",
      ],

      cpu: [
        "fetch_decode_confusion",
        "execute_decode_confusion",
      ],

      hardware: [
        "RAM_ROM_confusion",
        "primary_secondary_memory_confusion",
        "cache_RAM_confusion",
      ],

      networking: [
        "protocol_role_confusion",
        "TCP_UDP_confusion",
        "DNS_DHCP_confusion",
      ],

      ip: [
        "octet_range_error",
        "octet_count_error",
        "IPv4_structure_error",
      ],

      cybersecurity: [
        "attack_classification_error",
        "social_engineering_confusion",
        "malware_confusion",
      ],

      database: [
        "primary_foreign_key_confusion",
        "query_normalization_confusion",
        "record_field_confusion",
      ],

      algorithm: [
        "complexity_confusion",
        "algorithm_identification_error",
      ],

      data_structure: [
        "FIFO_LIFO_confusion",
        "linear_hierarchical_confusion",
      ],

      programming: [
        "assignment_condition_confusion",
        "loop_boundary_error",
        "variable_state_error",
      ],
    };

    return map[concept] || [
      "conceptual_error",
    ];
  }

  // =========================================================
  // DIFFICULTY
  // =========================================================

  _difficulty(concept) {
    const numerical = [
      "number_system",
      "storage",
      "ip",
    ];

    if (numerical.includes(concept)) {
      return "medium";
    }

    return "easy";
  }

  // =========================================================
  // MAIN MUTATOR
  // =========================================================

  mutate(qObj, modalityIndex = 0) {
    if (!qObj) return null;

    const stem =
      String(
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    if (!stem) {
      return qObj;
    }

    const lower =
      stem.toLowerCase();

    const mode =
      Number.isFinite(
        modalityIndex
      )
        ? ((Math.floor(modalityIndex) % 4) + 4) % 4
        : 0;

    const seed =
      this._seed(
        qObj,
        stem
      );

    const concept =
      this._detectConcept(
        lower
      );

    const result = (() => {
      switch (concept) {
        case "number_system":
          return this._numberSystem(stem, mode, seed);
        case "storage":
          return this._storage(stem, mode, seed);
        case "logic":
          return this._logic(stem, mode, seed);
        case "cpu":
          return this._cpu(stem, mode, seed);
        case "hardware":
          return this._hardware(stem, mode, seed);
        case "networking":
          return this._networking(stem, mode, seed);
        case "ip":
          return this._ip(stem, mode, seed);
        case "cybersecurity":
          return this._cybersecurity(stem, mode, seed);
        case "data_structure":
          return this._dataStructure(stem, mode, seed);
        default:
          return this._fallback(qObj, stem, concept);
      }
    })();

    return this._decorate(
      result,
      qObj,
      concept,
      seed
    );
  }

  // =========================================================
  // SAFE FALLBACK
  // =========================================================

  _fallback(qObj, stem, concept) {
    return {
      ...qObj,

      q:
        `[Computer Science Application] ${stem}`,

      concept,

      hint:
        qObj.hint ||
        "Identify the computing principle involved.",

      steps:
        this._steps([
          "Identify the computer science concept.",
          "Recall the rule governing the concept.",
          "Apply the rule to the given situation.",
          "Check whether the conclusion is consistent.",
        ]),
    };
  }
}
