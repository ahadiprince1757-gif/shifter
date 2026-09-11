/**
 * TIXAR COMPUTER STUDIES MUTATOR
 * Version 4.0
 *
 * DETERMINISTIC DIAGNOSTIC MUTATION ENGINE
 *
 * Design:
 *
 *       ORIGINAL QUESTION
 *              ↓
 *       CONCEPT DETECTION
 *              ↓
 *       STRUCTURE ANALYSIS
 *              ↓
 *       PARAMETER EXTRACTION
 *              ↓
 *       DETERMINISTIC MUTATION RULE
 *              ↓
 *       INDEPENDENT SOLVER
 *              ↓
 *       MISCONCEPTION DISTRACTORS
 *              ↓
 *       VERIFIED DIAGNOSTIC QUESTION
 *
 * Core principles:
 *
 * 1. NEVER use randomness.
 * 2. NEVER use Math.random().
 * 3. NEVER use hash-based pseudo-randomness.
 * 4. Never invent an unrelated parameter when the original
 *    question contains a usable parameter.
 * 5. Every mutated answer must be independently recalculated.
 * 6. Every mutation must have an explicit reason.
 * 7. MCQ ordering is deterministic.
 * 8. Distractors should represent plausible misconceptions.
 * 9. Mutation metadata must explain exactly what changed.
 */

export class ComputerMutator {
  constructor() {
    this.version = "4.0";

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
        misconception:
          "assuming a familiar logo or sender name proves authenticity",
      },

      ransomware: {
        answer: "Ransomware",
        clue: "malware encrypts files and demands payment",
        misconception:
          "thinking antivirus alone guarantees recovery",
      },

      ddos: {
        answer: "DDoS",
        clue: "many systems overwhelm a target with traffic",
        misconception:
          "confusing a traffic flood with malware infection",
      },

      spyware: {
        answer: "Spyware",
        clue:
          "software secretly monitors or collects information",
        misconception:
          "assuming every unwanted advertisement is spyware",
      },

      brute_force: {
        answer: "Brute-force attack",
        clue:
          "many password combinations are attempted",
        misconception:
          "confusing repeated guessing with phishing",
      },
    };

    this.dataStructures = {
      array: {
        name: "Array",
        clue:
          "stores elements in indexed positions",
      },

      stack: {
        name: "Stack",
        clue:
          "uses Last-In, First-Out",
      },

      queue: {
        name: "Queue",
        clue:
          "uses First-In, First-Out",
      },

      linked_list: {
        name: "Linked List",
        clue:
          "stores elements connected through references",
      },

      tree: {
        name: "Tree",
        clue:
          "represents hierarchical relationships",
      },
    };

    /*
     * Explicit deterministic mutation sequences.
     *
     * modalityIndex selects the mutation rule.
     *
     * 0 → first rule
     * 1 → second rule
     * 2 → third rule
     * 3 → fourth rule
     *
     * Nothing here is random.
     */
    this.mutationPlans = {
      number_system: [
        "change_value",
        "reverse_conversion",
        "change_representation",
        "increase_complexity",
      ],

      storage: [
        "change_capacity",
        "change_file_size",
        "change_both",
        "increase_scale",
      ],

      logic: [
        "change_inputs",
        "change_gate",
        "invert_gate",
        "contrast_gate",
      ],

      cpu: [
        "change_stage",
        "reverse_recall",
        "stage_application",
      ],

      hardware: [
        "change_scenario",
        "contrast_component",
        "functional_application",
      ],

      networking: [
        "change_protocol",
        "reverse_lookup",
        "protocol_contrast",
      ],

      ip: [
        "change_octet",
        "invalid_range",
        "invalid_octet_count",
        "boundary_test",
      ],

      cybersecurity: [
        "change_threat",
        "change_clue",
        "threat_contrast",
      ],

      data_structure: [
        "change_structure",
        "change_access_pattern",
        "structure_contrast",
      ],

      database: [
        "primary_foreign_key",
        "record_field",
        "normalization",
        "query_application",
      ],

      algorithm: [
        "algorithm_identity",
        "complexity",
        "search_contrast",
        "sorting_application",
      ],

      programming: [
        "variable_state",
        "condition",
        "loop_boundary",
        "assignment",
      ],

      operating_system: [
        "process",
        "memory",
        "file_management",
        "multitasking",
      ],
    };
  }

  // =========================================================
  // DETERMINISTIC UTILITIES
  // =========================================================

  _steps(items) {
    return items.map(
      (item, index) => `Step ${index + 1}: ${item}`
    );
  }

  _contains(text, terms) {
    const normalized = String(text || "").toLowerCase();

    return terms.some((term) =>
      normalized.includes(String(term).toLowerCase())
    );
  }

  _numbers(text) {
    return [
      ...String(text || "").matchAll(
        /\b\d+(?:\.\d+)?\b/g
      ),
    ].map((match) => Number(match[0]));
  }

  _firstNumber(text) {
    const numbers = this._numbers(text);

    return numbers.length
      ? numbers[0]
      : null;
  }

  _replaceNumber(text, oldValue, newValue) {
    return String(text).replace(
      String(oldValue),
      String(newValue)
    );
  }

  _normalizeIndex(index, length) {
    if (!length) return 0;

    const value = Number.isFinite(index)
      ? Math.floor(index)
      : 0;

    return ((value % length) + length) % length;
  }

  _select(sequence, index) {
    if (!sequence.length) return null;

    return sequence[
      this._normalizeIndex(
        index,
        sequence.length
      )
    ];
  }

  _nextFromSequence(items, index) {
    if (!items.length) return null;

    return items[
      this._normalizeIndex(index, items.length)
    ];
  }

  _unique(items) {
    return [...new Set(
      items
        .filter(
          (item) =>
            item !== null &&
            item !== undefined &&
            String(item).trim() !== ""
        )
        .map(String)
    )];
  }

  // =========================================================
  // CONCEPT DETECTION
  // =========================================================

  _detectConcept(stem) {
    const text = String(stem || "").toLowerCase();

    /*
     * Specific concepts first.
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
        "assignment",
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
  // MUTATION PLAN
  // =========================================================

  _getMutationRule(concept, modalityIndex) {
    const rules =
      this.mutationPlans[concept] || [
        "application",
      ];

    return this._select(
      rules,
      modalityIndex
    );
  }

  // =========================================================
  // NUMBER SYSTEMS
  // =========================================================

  _detectNumberSystemDirection(stem) {
    const text = String(stem).toLowerCase();

    if (
      this._contains(text, [
        "binary",
        "base 2",
      ])
    ) {
      return "binary";
    }

    if (
      this._contains(text, [
        "hexadecimal",
        "hex",
        "base 16",
      ])
    ) {
      return "hex";
    }

    return "decimal";
  }

  _decimalToBinary(value) {
    return Number(value)
      .toString(2)
      .padStart(8, "0");
  }

  _binaryToDecimal(value) {
    return parseInt(
      String(value),
      2
    );
  }

  _decimalToHex(value) {
    return Number(value)
      .toString(16)
      .toUpperCase();
  }

  _extractNumberSystemValue(stem) {
    const text = String(stem);

    /*
     * Prefer explicit binary values.
     */
    const binaryMatch =
      text.match(
        /\b([01]{2,8})\s*(?:₂|base\s*2)\b/i
      );

    if (binaryMatch) {
      return {
        type: "binary",
        value: binaryMatch[1],
      };
    }

    /*
     * Explicit hexadecimal.
     */
    const hexMatch =
      text.match(
        /\b([0-9A-F]+)\s*(?:₁₆|base\s*16|hexadecimal|hex)\b/i
      );

    if (hexMatch) {
      return {
        type: "hex",
        value: hexMatch[1],
      };
    }

    /*
     * Otherwise use a usable decimal number.
     */
    const numbers = this._numbers(text);

    const usable = numbers.find(
      (n) => n >= 0 && n <= 255
    );

    if (usable !== undefined) {
      return {
        type: "decimal",
        value: usable,
      };
    }

    /*
     * Safe deterministic fallback.
     */
    return {
      type: "decimal",
      value: 25,
    };
  }

  _numberSystem(stem, mode, rule) {
    const extracted =
      this._extractNumberSystemValue(stem);

    let decimal;

    if (extracted.type === "binary") {
      decimal =
        this._binaryToDecimal(
          extracted.value
        );
    } else if (extracted.type === "hex") {
      decimal =
        parseInt(
          extracted.value,
          16
        );
    } else {
      decimal =
        Number(extracted.value);
    }

    if (!Number.isFinite(decimal)) {
      decimal = 25;
    }

    decimal = Math.max(
      0,
      Math.min(255, decimal)
    );

    /*
     * RULE 1:
     * Change the original value.
     */
    if (rule === "change_value") {
      const mutated =
        decimal < 255
          ? decimal + 1
          : decimal - 1;

      return this._buildNumberQuestion(
        mutated,
        "binary",
        mode,
        rule,
        `The original numeric value was changed deterministically from ${decimal} to ${mutated}.`
      );
    }

    /*
     * RULE 2:
     * Reverse conversion direction.
     */
    if (rule === "reverse_conversion") {
      return this._buildNumberQuestion(
        decimal,
        extracted.type === "binary"
          ? "decimal"
          : "binary",
        mode,
        rule,
        "The conversion direction was reversed."
      );
    }

    /*
     * RULE 3:
     * Change representation.
     */
    if (rule === "change_representation") {
      return this._buildNumberQuestion(
        decimal,
        "hex",
        mode,
        rule,
        "The same underlying value is tested in hexadecimal representation."
      );
    }

    /*
     * RULE 4:
     * Increase complexity by doubling.
     */
    const mutated =
      decimal * 2 <= 255
        ? decimal * 2
        : Math.floor(decimal / 2);

    return this._buildNumberQuestion(
      mutated,
      "binary",
      mode,
      rule,
      `The numerical value was deterministically scaled from ${decimal} to ${mutated}.`
    );
  }

  _buildNumberQuestion(
    decimal,
    target,
    mode,
    rule,
    mutationReason
  ) {
    let input;
    let answer;
    let question;
    let solution;

    if (target === "binary") {
      input = decimal;
      answer =
        this._decimalToBinary(decimal);

      question =
        `Convert decimal ${decimal} into an 8-bit binary number.`;

      solution =
        `${decimal}₁₀ = ${answer}₂`;
    } else if (target === "hex") {
      input = decimal;
      answer =
        this._decimalToHex(decimal);

      question =
        `Convert decimal ${decimal} into hexadecimal.`;

      solution =
        `${decimal}₁₀ = ${answer}₁₆`;
    } else {
      input =
        this._decimalToBinary(decimal);

      answer = String(decimal);

      question =
        `An 8-bit binary value is ${input}. What decimal value does it represent?`;

      solution =
        `${input}₂ = ${answer}₁₀`;
    }

    const distractors =
      this._numberDistractors(
        decimal,
        target,
        answer
      );

    return {
      concept: "number_system",

      q: question,

      ans: String(answer),

      hint:
        target === "binary"
          ? "Use powers of 2 or repeated division by 2."
          : target === "hex"
            ? "Group the value using hexadecimal place values."
            : "Add the place values represented by the 1-bits.",

      sol: solution,

      steps:
        target === "binary"
          ? this._steps([
              `Start with decimal ${decimal}.`,
              "Determine the powers of 2 represented.",
              "Write the bits from left to right.",
              `Result: ${answer}.`,
            ])
          : target === "hex"
            ? this._steps([
                `Start with decimal ${decimal}.`,
                "Convert using hexadecimal place values.",
                "Use digits 0–9 and A–F.",
                `Result: ${answer}.`,
              ])
            : this._steps([
                `Write the binary value ${input}.`,
                "Assign powers of 2 to each position.",
                "Add the values corresponding to 1-bits.",
                `Result: ${answer}.`,
              ]),

      why:
        `${mutationReason} The answer was independently calculated from ${decimal}.`,

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
              mode
            ),

      mutationRule: rule,
      mutationReason,
    };
  }

  _numberDistractors(
    decimal,
    target,
    correct
  ) {
    const candidates = [];

    /*
     * ±1 represents arithmetic / conversion mistakes.
     */
    const lower =
      Math.max(0, decimal - 1);

    const higher =
      Math.min(255, decimal + 1);

    /*
     * Bit-order / place-value style errors.
     */
    const doubled =
      Math.min(255, decimal * 2);

    const halved =
      Math.floor(decimal / 2);

    const values = [
      lower,
      higher,
      doubled,
      halved,
    ];

    for (const value of values) {
      if (target === "binary") {
        candidates.push(
          this._decimalToBinary(value)
        );
      } else if (target === "hex") {
        candidates.push(
          this._decimalToHex(value)
        );
      } else {
        candidates.push(
          String(value)
        );
      }
    }

    return this._unique(
      candidates
    ).filter(
      (x) => x !== String(correct)
    );
  }

  // =========================================================
  // STORAGE
  // =========================================================

  _extractStorageParameters(stem) {
    const text =
      String(stem).toLowerCase();

    const numbers =
      this._numbers(text);

    let capacityGB =
      numbers.find(
        (n) =>
          text.includes(`${n} gb`)
      );

    let fileMB =
      numbers.find(
        (n) =>
          text.includes(`${n} mb`)
      );

    if (!Number.isFinite(capacityGB)) {
      capacityGB =
        numbers[0] || 4;
    }

    if (!Number.isFinite(fileMB)) {
      fileMB =
        numbers[1] || 2;
    }

    return {
      capacityGB,
      fileMB,
    };
  }

  _storage(stem, mode, rule) {
    let {
      capacityGB,
      fileMB,
    } =
      this._extractStorageParameters(
        stem
      );

    /*
     * Keep values educationally useful.
     */
    capacityGB =
      Math.max(
        1,
        Math.min(1024, capacityGB)
      );

    fileMB =
      Math.max(
        1,
        Math.min(1024, fileMB)
      );

    if (rule === "change_capacity") {
      capacityGB =
        capacityGB < 1024
          ? capacityGB + 1
          : Math.max(1, capacityGB - 1);
    }

    if (rule === "change_file_size") {
      fileMB =
        fileMB < 1024
          ? fileMB + 1
          : Math.max(1, fileMB - 1);
    }

    if (rule === "change_both") {
      capacityGB =
        capacityGB < 1024
          ? capacityGB + 1
          : capacityGB;

      fileMB =
        fileMB < 1024
          ? fileMB + 1
          : fileMB;
    }

    if (rule === "increase_scale") {
      if (capacityGB <= 512) {
        capacityGB *= 2;
      } else {
        fileMB =
          Math.max(
            1,
            Math.floor(fileMB / 2)
          );
      }
    }

    const capacityMB =
      capacityGB * 1024;

    const files =
      Math.floor(
        capacityMB / fileMB
      );

    const answer =
      `${files} files`;

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
        `${capacityGB} GB × 1024 = ${capacityMB} MB. ` +
        `${capacityMB} ÷ ${fileMB} = ${files}. ` +
        `The parameters were changed using the deterministic rule "${rule}".`,

      sol: answer,

      steps: this._steps([
        `${capacityGB} GB × 1024 = ${capacityMB} MB.`,
        `${capacityMB} MB ÷ ${fileMB} MB = ${files}.`,
        "Only complete files count.",
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
                `${Math.max(0, Math.floor(files / 2))} files`,
                `${files + 10} files`,
                `${Math.max(0, files - 10)} files`,
              ],
              mode
            ),

      mutationRule: rule,
      mutationReason:
        `Storage parameters were deterministically changed using "${rule}".`,
    };
  }

  // =========================================================
  // LOGIC GATES
  // =========================================================

  _extractGate(stem) {
    const text =
      String(stem).toLowerCase();

    const names =
      Object.keys(this.gates);

    for (const name of names) {
      if (text.includes(name.toLowerCase())) {
        return name;
      }
    }

    return "AND";
  }

  _extractLogicInputs(stem) {
    const matches =
      String(stem).match(
        /(?:A|input\s*A)\s*=\s*([01]).*?(?:B|input\s*B)\s*=\s*([01])/i
      );

    if (matches) {
      return [
        Number(matches[1]),
        Number(matches[2]),
      ];
    }

    const numbers =
      this._numbers(stem)
        .filter(
          (n) => n === 0 || n === 1
        );

    return [
      numbers[0] ?? 0,
      numbers[1] ?? 0,
    ];
  }

  _logic(stem, mode, rule) {
    let gateName =
      this._extractGate(stem);

    let [a, b] =
      this._extractLogicInputs(stem);

    if (rule === "change_inputs") {
      /*
       * Flip exactly one input.
       * Deterministic: A is changed first.
       */
      a = a === 0 ? 1 : 0;
    }

    if (rule === "change_gate") {
      const names =
        Object.keys(this.gates);

      const current =
        names.indexOf(gateName);

      gateName =
        names[
          this._normalizeIndex(
            current + 1,
            names.length
          )
        ];
    }

    if (rule === "invert_gate") {
      const opposite = {
        AND: "NAND",
        NAND: "AND",
        OR: "NOR",
        NOR: "OR",
        XOR: "XOR",
      };

      gateName =
        opposite[gateName] || "AND";
    }

    if (rule === "contrast_gate") {
      const contrast = {
        AND: "OR",
        OR: "AND",
        XOR: "AND",
        NAND: "NOR",
        NOR: "NAND",
      };

      gateName =
        contrast[gateName] || "AND";
    }

    const gate =
      this.gates[gateName];

    const output =
      gate.fn(a, b);

    const correct =
      String(output);

    return {
      concept: "logic",

      q:
        `A ${gateName} gate receives A = ${a} and B = ${b}. What is the output?`,

      ans: correct,

      hint:
        gate.rule,

      why:
        `${gateName} applied to ${a} and ${b} gives ${correct}. ` +
        `Mutation rule: ${rule}.`,

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
              ["0", "1"],
              mode
            ),

      mutationRule: rule,
      mutationReason:
        `The logic question was transformed using "${rule}".`,
    };
  }

  // =========================================================
  // CPU
  // =========================================================

  _cpu(stem, mode, rule) {
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

    const originalText =
      String(stem).toLowerCase();

    let currentIndex =
      stages.findIndex(
        (stage) =>
          originalText.includes(
            stage.name.toLowerCase()
          )
      );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    let index =
      currentIndex;

    if (rule === "change_stage") {
      index =
        this._normalizeIndex(
          currentIndex + 1,
          stages.length
        );
    }

    if (rule === "reverse_recall") {
      index =
        this._normalizeIndex(
          currentIndex - 1,
          stages.length
        );
    }

    if (rule === "stage_application") {
      index =
        this._normalizeIndex(
          currentIndex + 2,
          stages.length
        );
    }

    const stage =
      stages[index];

    const distractors =
      stages
        .filter(
          (x) =>
            x.name !== stage.name
        )
        .map(
          (x) =>
            `${x.name}: ${x.description}`
        );

    return {
      concept: "cpu",

      q:
        `During the CPU instruction cycle, what happens during the ${stage.name} stage?`,

      ans:
        stage.description,

      hint:
        "Remember Fetch → Decode → Execute.",

      why:
        `${stage.name} is responsible for ${stage.description}. ` +
        `Mutation rule: ${rule}.`,

      sol:
        stage.description,

      steps: this._steps([
        "Identify the CPU cycle stage.",
        `Recall the purpose of ${stage.name}.`,
        "Apply it to the instruction cycle.",
        `Answer: ${stage.description}.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          stage.description,
          distractors,
          0
        ),

      mutationRule: rule,
      mutationReason:
        `The CPU stage was changed deterministically using "${rule}".`,
    };
  }

  // =========================================================
  // HARDWARE
  // =========================================================

  _hardware(stem, mode, rule) {
    const scenarios = [
      {
        q:
          "A computer slows down when many applications are running simultaneously. Which component is most likely under pressure?",

        ans: "RAM",

        why:
          "RAM holds programs and data currently being used by the computer and is volatile.",
      },

      {
        q:
          "A processor needs extremely fast access to frequently used instructions. Which component helps reduce access time?",

        ans: "Cache memory",

        why:
          "Cache is small, high-speed memory located close to the CPU.",
      },

      {
        q:
          "Which component retains files after the computer is switched off?",

        ans: "Secondary storage",

        why:
          "SSD and HDD storage are non-volatile.",
      },

      {
        q:
          "Which component executes program instructions and performs calculations?",

        ans: "CPU",

        why:
          "The CPU processes instructions and controls their execution.",
      },
    ];

    const text =
      String(stem).toLowerCase();

    let currentIndex =
      scenarios.findIndex(
        (scenario) =>
          text.includes(
            scenario.ans.toLowerCase()
          )
      );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    let index =
      currentIndex;

    if (rule === "change_scenario") {
      index =
        this._normalizeIndex(
          currentIndex + 1,
          scenarios.length
        );
    }

    if (rule === "contrast_component") {
      index =
        this._normalizeIndex(
          currentIndex + 2,
          scenarios.length
        );
    }

    if (rule === "functional_application") {
      index =
        this._normalizeIndex(
          currentIndex + 3,
          scenarios.length
        );
    }

    const scenario =
      scenarios[index];

    const options = [
      "RAM",
      "ROM",
      "Cache memory",
      "CPU",
      "Secondary storage",
      "Control Unit",
    ].filter(
      (x) =>
        x !== scenario.ans
    );

    return {
      concept: "hardware",

      q:
        `[Hardware Diagnosis] ${scenario.q}`,

      ans:
        scenario.ans,

      hint:
        "Match the symptom or requirement to the component's function.",

      why:
        `${scenario.why} Mutation rule: ${rule}.`,

      sol:
        scenario.ans,

      steps: this._steps([
        "Identify the observed problem.",
        "Determine which hardware function is involved.",
        `Match the function to ${scenario.ans}.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          scenario.ans,
          options,
          0
        ),

      mutationRule: rule,
      mutationReason:
        `The hardware scenario was selected through a deterministic sequence.`,
    };
  }

  // =========================================================
  // NETWORKING
  // =========================================================

  _networking(stem, mode, rule) {
    const names =
      Object.keys(
        this.protocols
      );

    const text =
      String(stem).toLowerCase();

    let currentIndex =
      names.findIndex(
        (name) =>
          text.includes(
            name.toLowerCase()
          )
      );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    let index =
      currentIndex;

    if (rule === "change_protocol") {
      index =
        this._normalizeIndex(
          currentIndex + 1,
          names.length
        );
    }

    if (rule === "reverse_lookup") {
      index =
        this._normalizeIndex(
          currentIndex + 2,
          names.length
        );
    }

    if (rule === "protocol_contrast") {
      const contrasts = {
        HTTP: "HTTPS",
        HTTPS: "HTTP",
        TCP: "UDP",
        UDP: "TCP",
        DNS: "DHCP",
        DHCP: "DNS",
        FTP: "HTTP",
      };

      const original =
        names[currentIndex];

      const contrasted =
        contrasts[original] || "DNS";

      index =
        names.indexOf(
          contrasted
        );

      if (index < 0) {
        index = 0;
      }
    }

    const name =
      names[index];

    const answer =
      this.protocols[name];

    return {
      concept: "networking",

      q:
        `Which network protocol is primarily responsible for ${answer}?`,

      ans:
        name,

      hint:
        "Match the network task to the protocol's main role.",

      why:
        `${name}: ${answer}. Mutation rule: ${rule}.`,

      sol:
        name,

      steps: this._steps([
        "Identify the network task.",
        "Match the task to a protocol.",
        `${name} performs this function.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          name,
          names.filter(
            (x) => x !== name
          ),
          0
        ),

      mutationRule: rule,
      mutationReason:
        `The protocol was changed deterministically using "${rule}".`,
    };
  }

  // =========================================================
  // IP ADDRESSING
  // =========================================================

  _extractIP(stem) {
    const match =
      String(stem).match(
        /\b(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\b/
      );

    if (!match) {
      return [
        192,
        168,
        1,
        10,
      ];
    }

    return [
      Number(match[1]),
      Number(match[2]),
      Number(match[3]),
      Number(match[4]),
    ];
  }

  _ip(stem, mode, rule) {
    let octets =
      this._extractIP(stem);

    if (rule === "change_octet") {
      octets[3] =
        octets[3] < 254
          ? octets[3] + 1
          : 1;
    }

    if (rule === "invalid_range") {
      octets[3] = 256;
    }

    if (rule === "invalid_octet_count") {
      /*
       * Build an intentionally invalid address
       * with five octets.
       */
      const valid =
        `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;

      const invalid =
        `${valid}.1`;

      return {
        concept: "ip",

        q:
          "Which of the following is a valid IPv4 address?",

        ans:
          invalid,

        hint:
          "An IPv4 address must contain exactly four decimal octets, each from 0 to 255.",

        why:
          `Mutation rule "${rule}" intentionally tests octet count.`,

        sol:
          "This mutation is invalid because it contains five octets.",

        steps: this._steps([
          "Count the octets.",
          "IPv4 requires exactly four octets.",
          "This address has five octets.",
          "Therefore it is invalid.",
        ]),

        type: "mcq",

        options: this._mcq(
          invalid,
          [
            "192.168.1.1",
            "10.0.0.1",
            "172.16.0.1",
          ],
          mode
        ),

        mutationRule: rule,
        mutationReason:
          "The mutation intentionally changed the structural validity of the address.",
      };
    }

    if (rule === "boundary_test") {
      octets[3] = 255;
    }

    const ip =
      octets.join(".");

    const isValid =
      octets.length === 4 &&
      octets.every(
        (x) =>
          Number.isInteger(x) &&
          x >= 0 &&
          x <= 255
      );

    const answer =
      ip;

    return {
      concept: "ip",

      q:
        "Which of the following is a valid IPv4 address?",

      ans:
        answer,

      hint:
        "IPv4 contains four decimal octets. Each octet must be between 0 and 255.",

      why:
        `${ip} contains four octets and every octet is within 0–255. ` +
        `Mutation rule: ${rule}. Validity = ${isValid}.`,

      sol:
        answer,

      steps: this._steps([
        "Check that there are exactly four octets.",
        "Check that each octet is between 0 and 255.",
        `Therefore ${ip} is valid.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          ip,
          [
            `${octets[0]}.${octets[1]}.${octets[2]}.300`,
            `${octets[0]}.${octets[1]}.${octets[2]}`,
            `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}.5`,
          ],
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The IP parameter was transformed deterministically using "${rule}".`,
    };
  }

  // =========================================================
  // CYBERSECURITY
  // =========================================================

  _cybersecurity(stem, mode, rule) {
    const threats =
      Object.values(
        this.security
      );

    const text =
      String(stem).toLowerCase();

    let currentIndex =
      threats.findIndex(
        (threat) =>
          text.includes(
            threat.answer.toLowerCase()
          )
      );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    let index =
      currentIndex;

    if (rule === "change_threat") {
      index =
        this._normalizeIndex(
          currentIndex + 1,
          threats.length
        );
    }

    if (rule === "change_clue") {
      index =
        this._normalizeIndex(
          currentIndex + 2,
          threats.length
        );
    }

    if (rule === "threat_contrast") {
      const original =
        threats[currentIndex];

      const contrast =
        threats.findIndex(
          (x) =>
            x.answer !==
            original.answer
        );

      index =
        contrast >= 0
          ? contrast
          : 0;
    }

    const threat =
      threats[index];

    return {
      concept: "cybersecurity",

      q:
        `[Security Diagnosis] An incident matches this description: ${threat.clue}. What type of attack is this?`,

      ans:
        threat.answer,

      hint:
        "Classify the attack from its observable behavior.",

      why:
        `${threat.answer} matches the description because ${threat.clue}. ` +
        `Mutation rule: ${rule}.`,

      sol:
        threat.answer,

      steps: this._steps([
        "Identify the observable behavior.",
        `Match the behavior to ${threat.answer}.`,
        "Reject similar threats using their defining characteristics.",
      ]),

      type: "mcq",

      options:
        this._mcq(
          threat.answer,
          threats
            .filter(
              (x) =>
                x.answer !==
                threat.answer
            )
            .map(
              (x) =>
                x.answer
            ),
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The security scenario was changed through an explicit deterministic rule.`,
    };
  }

  // =========================================================
  // DATA STRUCTURES
  // =========================================================

  _dataStructure(stem, mode, rule) {
    const structures =
      Object.values(
        this.dataStructures
      );

    const text =
      String(stem).toLowerCase();

    let currentIndex =
      structures.findIndex(
        (structure) =>
          text.includes(
            structure.name.toLowerCase()
          )
      );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    let index =
      currentIndex;

    if (rule === "change_structure") {
      index =
        this._normalizeIndex(
          currentIndex + 1,
          structures.length
        );
    }

    if (rule === "change_access_pattern") {
      index =
        this._normalizeIndex(
          currentIndex + 2,
          structures.length
        );
    }

    if (rule === "structure_contrast") {
      const contrasts = {
        Stack: "Queue",
        Queue: "Stack",
        Array: "Linked List",
        "Linked List": "Array",
        Tree: "Array",
      };

      const target =
        contrasts[
          structures[currentIndex].name
        ];

      const targetIndex =
        structures.findIndex(
          (x) =>
            x.name === target
        );

      index =
        targetIndex >= 0
          ? targetIndex
          : 0;
    }

    const structure =
      structures[index];

    return {
      concept: "data_structure",

      q:
        `Which data structure ${structure.clue}?`,

      ans:
        structure.name,

      hint:
        "Focus on how data is organized or accessed.",

      why:
        `${structure.name} ${structure.clue}. Mutation rule: ${rule}.`,

      sol:
        structure.name,

      steps: this._steps([
        "Identify the required access pattern.",
        `Match it with: ${structure.clue}.`,
        `Therefore the answer is ${structure.name}.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          structure.name,
          structures
            .filter(
              (x) =>
                x.name !==
                structure.name
            )
            .map(
              (x) =>
                x.name
            ),
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The data structure was changed deterministically using "${rule}".`,
    };
  }

  // =========================================================
  // DATABASE
  // =========================================================

  _database(stem, mode, rule) {
    const concepts = [
      {
        name: "Primary Key",
        clue:
          "uniquely identifies each record in a table",
      },

      {
        name: "Foreign Key",
        clue:
          "links a record to a key in another table",
      },

      {
        name: "Field",
        clue:
          "represents a single attribute of a record",
      },

      {
        name: "Record",
        clue:
          "represents one complete row of related data",
      },

      {
        name: "Normalization",
        clue:
          "organizes data to reduce unnecessary duplication",
      },

      {
        name: "Query",
        clue:
          "requests or manipulates data in a database",
      },
    ];

    const text =
      String(stem).toLowerCase();

    let index =
      concepts.findIndex(
        (item) =>
          text.includes(
            item.name.toLowerCase()
          )
      );

    if (index < 0) {
      index = 0;
    }

    if (rule === "primary_foreign_key") {
      const current =
        concepts[index].name;

      index =
        current === "Primary Key"
          ? 1
          : 0;
    }

    if (rule === "record_field") {
      const current =
        concepts[index].name;

      index =
        current === "Record"
          ? 2
          : 3;
    }

    if (rule === "normalization") {
      index = 4;
    }

    if (rule === "query_application") {
      index = 5;
    }

    const item =
      concepts[index];

    return {
      concept: "database",

      q:
        `Which database concept ${item.clue}?`,

      ans:
        item.name,

      hint:
        "Focus on the role performed by the database concept.",

      why:
        `${item.name} ${item.clue}. Mutation rule: ${rule}.`,

      sol:
        item.name,

      steps: this._steps([
        "Identify the database task.",
        `Match the task to ${item.name}.`,
        `Therefore the answer is ${item.name}.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          item.name,
          concepts
            .filter(
              (x) =>
                x.name !==
                item.name
            )
            .map(
              (x) =>
                x.name
            ),
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The database concept was changed using the explicit rule "${rule}".`,
    };
  }

  // =========================================================
  // ALGORITHMS
  // =========================================================

  _algorithm(stem, mode, rule) {
    const algorithms = [
      {
        name: "Linear Search",
        clue:
          "checks items sequentially until the target is found",
        complexity:
          "O(n)",
      },

      {
        name: "Binary Search",
        clue:
          "repeatedly divides a sorted search space",
        complexity:
          "O(log n)",
      },

      {
        name: "Bubble Sort",
        clue:
          "repeatedly compares and swaps adjacent elements",
        complexity:
          "O(n²) in the basic worst case",
      },
    ];

    const text =
      String(stem).toLowerCase();

    let index =
      algorithms.findIndex(
        (algorithm) =>
          text.includes(
            algorithm.name.toLowerCase()
          )
      );

    if (index < 0) {
      index = 0;
    }

    if (rule === "algorithm_identity") {
      index =
        this._normalizeIndex(
          index + 1,
          algorithms.length
        );
    }

    if (rule === "complexity") {
      /*
       * Keep same algorithm but explicitly
       * test complexity.
       */
    }

    if (rule === "search_contrast") {
      index =
        algorithms[index].name ===
        "Linear Search"
          ? 1
          : 0;
    }

    if (rule === "sorting_application") {
      index = 2;
    }

    const algorithm =
      algorithms[index];

    if (rule === "complexity") {
      return {
        concept: "algorithm",

        q:
          `What is the basic time complexity associated with ${algorithm.name}?`,

        ans:
          algorithm.complexity,

        hint:
          "Consider how the number of operations grows as the input grows.",

        why:
          `${algorithm.name} has the stated complexity in this simplified model.`,

        sol:
          algorithm.complexity,

        steps: this._steps([
          `Identify the algorithm: ${algorithm.name}.`,
          "Determine how its operations grow.",
          `Answer: ${algorithm.complexity}.`,
        ]),

        type: "mcq",

        options:
          this._mcq(
            algorithm.complexity,
            algorithms
              .map(
                (x) =>
                  x.complexity
              )
              .filter(
                (x) =>
                  x !==
                  algorithm.complexity
              ),
            mode
          ),

        mutationRule: rule,
        mutationReason:
          `The mutation changed the tested dimension from algorithm identity to complexity.`,
      };
    }

    return {
      concept: "algorithm",

      q:
        `Which algorithm ${algorithm.clue}?`,

      ans:
        algorithm.name,

      hint:
        "Match the algorithm to its defining operation.",

      why:
        `${algorithm.name} ${algorithm.clue}. Mutation rule: ${rule}.`,

      sol:
        algorithm.name,

      steps: this._steps([
        "Identify the operation described.",
        `Match it to ${algorithm.name}.`,
        `Therefore the answer is ${algorithm.name}.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          algorithm.name,
          algorithms
            .filter(
              (x) =>
                x.name !==
                algorithm.name
            )
            .map(
              (x) =>
                x.name
            ),
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The algorithm was transformed using "${rule}".`,
    };
  }

  // =========================================================
  // PROGRAMMING
  // =========================================================

  _programming(stem, mode, rule) {
    const text =
      String(stem).toLowerCase();

    /*
     * Explicit deterministic question families.
     */

    if (
      rule === "variable_state"
    ) {
      return {
        concept: "programming",

        q:
          "A variable x starts at 5. The statement x = x + 3 is executed. What is the new value of x?",

        ans: "8",

        hint:
          "Take the old value and add 3.",

        why:
          "The mutation tests variable state after an assignment.",

        sol:
          "8",

        steps: this._steps([
          "Start with x = 5.",
          "Add 3 to the current value.",
          "5 + 3 = 8.",
          "Therefore x = 8.",
        ]),

        type:
          mode === 0
            ? "open_response"
            : "mcq",

        options:
          mode === 0
            ? null
            : this._mcq(
                "8",
                [
                  "5",
                  "2",
                  "15",
                ],
                mode
              ),

        mutationRule: rule,
        mutationReason:
          "The programming mutation tests the state of a variable after execution.",
      };
    }

    if (rule === "condition") {
      return {
        concept: "programming",

        q:
          "If x = 7, which condition is true?",

        ans:
          "x > 5",

        hint:
          "Compare 7 with each value.",

        why:
          "The mutation tests conditional reasoning rather than simple recall.",

        sol:
          "x > 5",

        steps: this._steps([
          "Identify x = 7.",
          "Compare 7 with 5.",
          "7 is greater than 5.",
          "Therefore x > 5 is true.",
        ]),

        type: "mcq",

        options:
          this._mcq(
            "x > 5",
            [
              "x < 5",
              "x === 5",
              "x < 0",
            ],
            mode
          ),

        mutationRule: rule,
        mutationReason:
          "The mutation changes the task into deterministic conditional evaluation.",
      };
    }

    if (rule === "loop_boundary") {
      return {
        concept: "programming",

        q:
          "A loop runs for i = 1 to i = 5 inclusive. How many times does the loop execute?",

        ans: "5",

        hint:
          "Count 1, 2, 3, 4 and 5.",

        why:
          "The mutation tests whether the learner understands loop boundaries.",

        sol:
          "5",

        steps: this._steps([
          "Start at 1.",
          "Continue through 5.",
          "Count the values: 1, 2, 3, 4, 5.",
          "Therefore the loop executes 5 times.",
        ]),

        type: "mcq",

        options:
          this._mcq(
            "5",
            [
              "4",
              "6",
              "10",
            ],
            mode
          ),

        mutationRule: rule,
        mutationReason:
          "The mutation targets loop-boundary understanding.",
      };
    }

    return {
      concept: "programming",

      q:
        "What is the purpose of assigning a value to a variable?",

      ans:
        "To store a value that can be used by a program",

      hint:
        "Think about what a variable represents during program execution.",

      why:
        `The programming question was generated using the deterministic rule "${rule}".`,

      sol:
        "To store a value that can be used by a program",

      steps: this._steps([
        "Identify the role of a variable.",
        "A variable holds data.",
        "That data can be read or changed by the program.",
      ]),

      type: "mcq",

      options:
        this._mcq(
          "To store a value that can be used by a program",
          [
            "To physically store electricity",
            "To permanently shut down the computer",
            "To connect every computer to the internet",
          ],
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The programming fallback used deterministic rule "${rule}".`,
    };
  }

  // =========================================================
  // OPERATING SYSTEMS
  // =========================================================

  _operatingSystem(stem, mode, rule) {
    const concepts = [
      {
        name: "Process scheduling",
        clue:
          "decides how CPU time is allocated among processes",
      },

      {
        name: "Memory management",
        clue:
          "manages the allocation and use of main memory",
      },

      {
        name: "File management",
        clue:
          "organizes and controls files and directories",
      },

      {
        name: "Multitasking",
        clue:
          "allows multiple programs or tasks to make progress",
      },
    ];

    const text =
      String(stem).toLowerCase();

    let index =
      concepts.findIndex(
        (item) =>
          text.includes(
            item.name.toLowerCase()
          )
      );

    if (index < 0) {
      index = 0;
    }

    if (rule === "process") {
      index = 0;
    }

    if (rule === "memory") {
      index = 1;
    }

    if (rule === "file_management") {
      index = 2;
    }

    if (rule === "multitasking") {
      index = 3;
    }

    const item =
      concepts[index];

    return {
      concept: "operating_system",

      q:
        `Which operating-system function ${item.clue}?`,

      ans:
        item.name,

      hint:
        "Match the task to the operating-system function responsible for it.",

      why:
        `${item.name} ${item.clue}. Mutation rule: ${rule}.`,

      sol:
        item.name,

      steps: this._steps([
        "Identify the operating-system task.",
        `Match it to ${item.name}.`,
        `Therefore the answer is ${item.name}.`,
      ]),

      type: "mcq",

      options:
        this._mcq(
          item.name,
          concepts
            .filter(
              (x) =>
                x.name !==
                item.name
            )
            .map(
              (x) =>
                x.name
            ),
          mode
        ),

      mutationRule: rule,
      mutationReason:
        `The operating-system concept was selected deterministically.`,
    };
  }

  // =========================================================
  // MCQ ENGINE
  // =========================================================

  _mcq(correct, distractors, modalityIndex = 0) {
    const correctValue =
      String(correct);

    const unique =
      this._unique([
        correctValue,
        ...distractors,
      ]);

    /*
     * Only use real distractors.
     *
     * Do NOT generate meaningless:
     *
     * "Alternative 1"
     *
     * because that creates an artificial answer
     * rather than a diagnostic misconception.
     */

    const options =
      unique
        .slice(0, 4);

    /*
     * If fewer than four legitimate options exist,
     * return what we actually have rather than inventing
     * fake answers.
     */
    if (options.length <= 1) {
      return options;
    }

    /*
     * Deterministic answer-position rotation.
     *
     * modality 0 → position 0
     * modality 1 → position 1
     * modality 2 → position 2
     * modality 3 → position 3
     *
     * No shuffle.
     */
    const desiredPosition =
      this._normalizeIndex(
        modalityIndex,
        options.length
      );

    const currentPosition =
      options.indexOf(
        correctValue
      );

    if (
      currentPosition >= 0 &&
      currentPosition !== desiredPosition
    ) {
      [
        options[currentPosition],
        options[desiredPosition],
      ] = [
        options[desiredPosition],
        options[currentPosition],
      ];
    }

    return options;
  }

  // =========================================================
  // DIAGNOSTIC WRAPPER
  // =========================================================

  _decorate(
    result,
    qObj,
    concept,
    rule,
    modalityIndex
  ) {
    if (!result) {
      return null;
    }

    const mutationRule =
      result.mutationRule ||
      rule;

    return {
      ...result,

      concept,

      mutation: {
        version:
          this.version,

        generated:
          true,

        deterministic:
          true,

        random:
          false,

        rule:
          mutationRule,

        modalityIndex:
          this._normalizeIndex(
            modalityIndex,
            4
          ),

        reason:
          result.mutationReason ||
          "Deterministic mutation.",
      },

      diagnostic: {
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

        mutationDimension:
          mutationRule,

        deterministic:
          true,
      },

      sourceQuestionId:
        qObj.id ||
        null,
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

      operating_system: [
        "process_memory_confusion",
        "file_management_confusion",
        "multitasking_confusion",
      ],
    };

    return (
      map[concept] || [
        "conceptual_error",
      ]
    );
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

    if (
      numerical.includes(
        concept
      )
    ) {
      return "medium";
    }

    return "easy";
  }

  // =========================================================
  // MAIN MUTATOR
  // =========================================================

  mutate(
    qObj,
    modalityIndex = 0
  ) {
    if (!qObj) {
      return null;
    }

    const stem =
      String(
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    if (!stem) {
      return qObj;
    }

    const mode =
      this._normalizeIndex(
        modalityIndex,
        4
      );

    const concept =
      this._detectConcept(
        stem
      );

    const rule =
      this._getMutationRule(
        concept,
        mode
      );

    let result;

    switch (concept) {
      case "number_system":
        result =
          this._numberSystem(
            stem,
            mode,
            rule
          );
        break;

      case "storage":
        result =
          this._storage(
            stem,
            mode,
            rule
          );
        break;

      case "logic":
        result =
          this._logic(
            stem,
            mode,
            rule
          );
        break;

      case "cpu":
        result =
          this._cpu(
            stem,
            mode,
            rule
          );
        break;

      case "hardware":
        result =
          this._hardware(
            stem,
            mode,
            rule
          );
        break;

      case "networking":
        result =
          this._networking(
            stem,
            mode,
            rule
          );
        break;

      case "ip":
        result =
          this._ip(
            stem,
            mode,
            rule
          );
        break;

      case "cybersecurity":
        result =
          this._cybersecurity(
            stem,
            mode,
            rule
          );
        break;

      case "data_structure":
        result =
          this._dataStructure(
            stem,
            mode,
            rule
          );
        break;

      case "database":
        result =
          this._database(
            stem,
            mode,
            rule
          );
        break;

      case "algorithm":
        result =
          this._algorithm(
            stem,
            mode,
            rule
          );
        break;

      case "programming":
        result =
          this._programming(
            stem,
            mode,
            rule
          );
        break;

      case "operating_system":
        result =
          this._operatingSystem(
            stem,
            mode,
            rule
          );
        break;

      default:
        result =
          this._fallback(
            qObj,
            stem,
            concept
          );
    }

    return this._decorate(
      result,
      qObj,
      concept,
      rule,
      mode
    );
  }

  // =========================================================
  // SAFE FALLBACK
  // =========================================================

  _fallback(
    qObj,
    stem,
    concept
  ) {
    return {
      ...qObj,

      q:
        `[Computer Science Application] ${stem}`,

      concept,

      hint:
        qObj.hint ||
        "Identify the computing principle involved.",

      steps:
        qObj.steps ||
        this._steps([
          "Identify the computer science concept.",
          "Recall the rule governing the concept.",
          "Apply the rule to the given situation.",
          "Check whether the conclusion is consistent.",
        ]),

      mutationRule:
        "application",

      mutationReason:
        "The concept could not be safely transformed into a parameterized question, so the original question was preserved rather than randomly altered.",
    };
  }
}