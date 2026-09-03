/**
 * Tixar Physics Mutator
 *
 * Diagnostic Adaptive Physics Engine
 *
 * Design principles:
 * - Deterministic mutation from question + ID + modality.
 * - Never mutate a numerical parameter without recalculating the answer.
 * - Generates questions across:
 *      1. Recall
 *      2. Formula selection
 *      3. Calculation
 *      4. Interpretation
 *      5. Misconception diagnosis
 *      6. Real-world application
 *      7. Transfer
 * - Distractors are generated from realistic student errors.
 * - Every generated question contains:
 *      q
 *      ans
 *      hint
 *      sol
 *      steps
 *      concept
 *      skill
 *      difficulty
 *      misconception
 *      type
 *      options
 *
 * The mutator is designed to fit Tixar's learning loop:
 *
 *      Test
 *        ↓
 *      Find what is unknown
 *        ↓
 *      Teach the missing piece
 *        ↓
 *      Retrieve
 *        ↓
 *      Retest
 *        ↓
 *      Prove transfer
 */

export class PhysicsMutator {

  constructor() {

    this.constants = {
      g: 9.8,
      speedOfSound: 340,
      atmosphericPressure: 101325
    };

    this.topics = {
      electricity: [
        "current",
        "voltage",
        "potential difference",
        "resistance",
        "ohm",
        "circuit",
        "resistor",
        "electrical power",
        "electrical energy",
        "charge"
      ],

      mechanics: [
        "force",
        "mass",
        "newton",
        "friction",
        "resultant force",
        "work",
        "momentum"
      ],

      kinematics: [
        "speed",
        "velocity",
        "motion",
        "distance",
        "displacement",
        "acceleration",
        "kinematic"
      ],

      waves: [
        "wave",
        "wavelength",
        "frequency",
        "amplitude",
        "period",
        "wave speed",
        "sound wave"
      ],

      optics: [
        "reflection",
        "refraction",
        "lens",
        "mirror",
        "critical angle",
        "total internal reflection",
        "refractive index"
      ],

      thermal: [
        "temperature",
        "heat",
        "thermal energy",
        "specific heat capacity",
        "latent heat"
      ],

      pressure: [
        "pressure",
        "atmospheric pressure",
        "hydraulic",
        "pascal"
      ],

      nuclear: [
        "radioactivity",
        "radioactive",
        "alpha particle",
        "beta particle",
        "gamma ray",
        "half-life",
        "nucleus",
        "nuclear"
      ],

      modernPhysics: [
        "photoelectric",
        "photoelectric effect",
        "photoelectric emission",
        "photoelectron",
        "photon",
        "work function",
        "threshold frequency",
        "stopping potential",
        "quantum",
        "electron emission"
      ],

      density: [
        "density",
        "mass per unit volume",
        "float",
        "sink",
        "buoyant"
      ]
    };
  }

  // ============================================================
  // 1. DETERMINISTIC HASHING
  // ============================================================

  _hash(str) {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash);
  }

  _seed(qObj, modalityIndex = 0) {

    const stem = qObj?.q || qObj?.stem || "";
    const id = qObj?.id || "";

    return this._hash(
      `${stem}|${id}|physics|${modalityIndex}`
    );
  }

  _pick(array, seed, offset = 0) {

    if (!array || !array.length) return null;

    return array[
      Math.abs(seed + offset) % array.length
    ];
  }

  _round(value, decimals = 2) {

    return Number(
      Number(value).toFixed(decimals)
    );
  }

  _shuffle(array, seed) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

      const j = Math.abs(
        seed + i * 31
      ) % (i + 1);

      [result[i], result[j]] =
        [result[j], result[i]];
    }

    return result;
  }

  // ============================================================
  // 2. TOPIC DETECTION & CONCEPT LOCKING
  // ============================================================

  _normalizeTopic(topicStr) {
    if (!topicStr) return null;
    const lower = String(topicStr).toLowerCase();

    if (lower.includes("photoelectric") || lower.includes("quantum") || lower.includes("modern")) {
      return "modernPhysics";
    }
    if (lower.includes("electric") || lower.includes("circuit") || lower.includes("current")) {
      return "electricity";
    }
    if (lower.includes("kinematic") || lower.includes("speed") || lower.includes("velocity")) {
      return "kinematics";
    }
    if (lower.includes("mechanic") || lower.includes("force") || lower.includes("newton")) {
      return "mechanics";
    }
    if (lower.includes("wave") || lower.includes("sound")) {
      return "waves";
    }
    if (lower.includes("optic") || lower.includes("light") || lower.includes("lens")) {
      return "optics";
    }
    if (lower.includes("thermal") || lower.includes("heat")) {
      return "thermal";
    }
    if (lower.includes("pressure") || lower.includes("pascal")) {
      return "pressure";
    }
    if (lower.includes("nuclear") || lower.includes("radioactiv")) {
      return "nuclear";
    }
    if (lower.includes("density")) {
      return "density";
    }
    return null;
  }

  _detectTopic(stem, qObj = {}) {
    // 1. Explicit curriculum metadata takes top priority
    const explicitTopic = qObj.topic || qObj.strand || qObj.concept || qObj.topicId || null;
    if (explicitTopic) {
      const normalized = this._normalizeTopic(explicitTopic);
      if (normalized) {
        return normalized;
      }
    }

    const lower = String(stem || "").toLowerCase();

    // 2. Weighted keyword matching
    const scores = {};

    for (const [topic, keywords] of Object.entries(this.topics)) {
      scores[topic] = 0;

      for (const keyword of keywords) {
        if (lower.includes(keyword)) {
          // Multi-word phrases are given higher weight (3 vs 1)
          const weight = keyword.split(" ").length > 1 ? 3 : 1;
          scores[topic] += weight;
        }
      }
    }

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [bestTopic, bestScore] = ranked[0] || ["general", 0];
    const [, secondScore] = ranked[1] || ["general", 0];

    if (bestScore === 0) {
      return "general";
    }

    // Prevent ambiguous classification
    if (bestScore === secondScore && bestScore < 3) {
      return "general";
    }

    return bestTopic;
  }

  _validateTopicIntegrity(originalTopic, mutatedQuestion) {
    if (!mutatedQuestion || !mutatedQuestion.q) return false;
    const detectedMutatedTopic = this._detectTopic(mutatedQuestion.q, mutatedQuestion);

    if (
      originalTopic !== "general" &&
      detectedMutatedTopic !== "general" &&
      detectedMutatedTopic !== originalTopic
    ) {
      return false;
    }

    return true;
  }

  _createSafeFallback(qObj, topic) {
    const originalQuestion = qObj?.q || qObj?.stem || "";

    return {
      ...qObj,
      q: originalQuestion,
      ans: qObj?.ans || "",
      hint: qObj?.hint || "Review the core physical concept involved before answering.",
      sol: qObj?.sol || qObj?.explanation || "No safe mutation could be generated without changing the original physical concept.",
      steps: qObj?.steps || [
        "Identify the main physical concept.",
        "Recall the governing principle.",
        "Apply it to the original problem."
      ],
      mutationStatus: "SKIPPED_UNSAFE_MUTATION",
      detectedTopic: topic,
      safe: true,
      difficulty: qObj?.difficulty || 2,
      modality: "fallback"
    };
  }

  // ============================================================
  // 3. QUESTION CONSTRUCTION HELPERS
  // ============================================================

  _base({
    q,
    ans,
    hint,
    sol,
    steps,
    type = "mcq",
    options = null,
    concept,
    skill,
    difficulty = 2,
    misconception = null,
    modality = "calculation"
  }) {

    return {
      q,
      ans,
      hint,
      sol,
      steps,
      type,
      options,
      concept,
      skill,
      difficulty,
      misconception,
      modality
    };
  }

  _mcqOptions(correct, distractors, seed) {

    const unique = [
      correct,
      ...distractors
    ].filter(
      (value, index, arr) =>
        value &&
        arr.indexOf(value) === index
    );

    return this._shuffle(
      unique.slice(0, 4),
      seed
    );
  }

  // ============================================================
  // 4. ELECTRICITY
  // ============================================================

  _generateElectricity(stem, mode, seed) {

    const lower = stem.toLowerCase();

    const current =
      1 + (seed % 5);

    const resistance =
      5 + ((seed >> 2) % 8) * 5;

    const voltage =
      current * resistance;

    const power =
      voltage * current;



    // ----------------------------------------------------------
    // POWER
    // ----------------------------------------------------------

    if (
      lower.includes("power") ||
      lower.includes("watt")
    ) {

      const ans = `${power} W`;

      if (mode === 0) {

        return this._base({

          q:
            `An appliance draws ${current} A from a ${voltage} V supply. Calculate its electrical power.`,

          ans,

          hint:
            "Use P = VI.",

          sol:
            `P = VI = ${voltage} × ${current} = ${power} W.`,

          steps: [
            `Step 1: Identify V = ${voltage} V and I = ${current} A.`,
            "Step 2: Use P = VI.",
            `Step 3: P = ${voltage} × ${current} = ${power} W.`
          ],

          concept:
            "Electrical power",

          skill:
            "Formula substitution",

          difficulty: 2,

          misconception:
            "Confusing power with voltage or current."
        });

      }

      if (mode === 1) {

        return this._base({

          q:
            `An appliance operates at ${voltage} V and draws ${current} A. Which value is its electrical power?`,

          ans,

          hint:
            "Power is the product of voltage and current.",

          sol:
            `P = VI = ${voltage} × ${current} = ${power} W.`,

          steps: [
            "Identify voltage and current.",
            "Multiply them.",
            "Express the result in watts."
          ],

          type: "mcq",

          options: this._mcqOptions(
            ans,
            [
              `${voltage + current} W`,
              `${voltage / current} W`,
              `${current} W`
            ],
            seed
          ),

          concept:
            "Electrical power",

          skill:
            "Formula selection",

          difficulty: 2
        });
      }

      if (mode === 2) {

        const wrong =
          voltage + current;

        return this._base({

          q:
            `A student says that an appliance using ${voltage} V and ${current} A consumes ${wrong} W. Diagnose the error and calculate the correct power.`,

          ans:
            `Incorrect. The correct power is ${power} W.`,

          hint:
            "Power is not found by adding voltage and current.",

          sol:
            `The student added V and I. Instead, P = VI = ${voltage} × ${current} = ${power} W.`,

          steps: [
            "Identify the student's operation.",
            "Recall P = VI.",
            `Calculate ${voltage} × ${current} = ${power} W.`
          ],

          type: "open_response",

          concept:
            "Electrical power",

          skill:
            "Misconception diagnosis",

          difficulty: 3,

          misconception:
            "Adding voltage and current instead of multiplying."
        });
      }

      return this._base({

        q:
          `An appliance operates at ${voltage} V and ${current} A. State the formula for electrical power and calculate the power.`,

        ans:
          `P = VI. Power = ${power} W.`,

        hint:
          "Power equals voltage multiplied by current.",

        sol:
          `P = VI = ${voltage} × ${current} = ${power} W.`,

        steps: [
          "Recall the power equation.",
          "Substitute the values.",
          "Calculate the result and give the unit."
        ],

        concept:
          "Electrical power",

        skill:
          "Recall + calculation",

        difficulty: 2
      });
    }

    // ----------------------------------------------------------
    // OHM'S LAW
    // ----------------------------------------------------------

    const ans = `${voltage} V`;

    if (mode === 0) {

      return this._base({

        q:
          `A ${resistance} Ω resistor carries a current of ${current} A. Calculate the potential difference across it.`,

        ans,

        hint:
          "Ohm's Law: V = IR.",

        sol:
          `V = IR = ${current} × ${resistance} = ${voltage} V.`,

        steps: [
          `Step 1: I = ${current} A and R = ${resistance} Ω.`,
          "Step 2: Apply V = IR.",
          `Step 3: V = ${current} × ${resistance} = ${voltage} V.`
        ],

        concept:
          "Ohm's Law",

        skill:
          "Calculation",

        difficulty: 2
      });

    }

    if (mode === 1) {

      return this._base({

        q:
          `A ${resistance} Ω resistor carries ${current} A. Which voltage is correct?`,

        ans,

        hint:
          "Multiply current by resistance.",

        sol:
          `V = IR = ${current} × ${resistance} = ${voltage} V.`,

        steps: [
          "Use V = IR.",
          `Multiply ${current} by ${resistance}.`,
          `Answer = ${voltage} V.`
        ],

        type: "mcq",

        options: this._mcqOptions(
          ans,
          [
            `${resistance / current} V`,
            `${current + resistance} V`,
            `${voltage * 2} V`
          ],
          seed
        ),

        concept:
          "Ohm's Law",

        skill:
          "Formula application",

        difficulty: 2
      });

    }

    if (mode === 2) {

      const wrongVoltage =
        resistance + current;

      return this._base({

        q:
          `A student calculates the voltage across a ${resistance} Ω resistor carrying ${current} A as ${wrongVoltage} V. Is the student's method correct? Explain.`,

        ans:
          `No. The correct voltage is ${voltage} V because V = IR.`,

        hint:
          "Check whether the student multiplied or added I and R.",

        sol:
          `The student added the quantities. Ohm's Law requires multiplication: V = ${current} × ${resistance} = ${voltage} V.`,

        steps: [
          "Identify the student's operation.",
          "Recall V = IR.",
          `Calculate ${current} × ${resistance}.`
        ],

        type: "open_response",

        concept:
          "Ohm's Law",

        skill:
          "Error diagnosis",

        difficulty: 3,

        misconception:
          "Adding rather than multiplying in Ohm's Law."
      });
    }

    return this._base({

      q:
        `A circuit has a resistance of ${resistance} Ω and a current of ${current} A. State Ohm's Law and calculate the voltage.`,

      ans:
        `V = IR. Voltage = ${voltage} V.`,

      hint:
        "Voltage = current × resistance.",

      sol:
        `V = ${current} × ${resistance} = ${voltage} V.`,

      steps: [
        "Recall Ohm's Law.",
        "Substitute I and R.",
        "Calculate V."
      ],

      concept:
        "Ohm's Law",

      skill:
        "Recall + application",

      difficulty: 2
    });
  }

  // ============================================================
  // 5. NEWTON'S SECOND LAW
  // ============================================================

  _generateMechanics(stem, mode, seed) {

    const lower = stem.toLowerCase();

    const mass =
      5 + (seed % 8) * 5;

    const acceleration =
      2 + ((seed >> 2) % 5);

    const force =
      mass * acceleration;

    // ----------------------------------------------------------
    // WORK
    // ----------------------------------------------------------

    if (
      lower.includes("work") ||
      lower.includes("joule")
    ) {

      const distance =
        2 + (seed % 7);

      const work =
        force * distance;

      const ans =
        `${work} J`;

      return this._base({

        q:
          `A constant force of ${force} N moves an object ${distance} m in the direction of the force. Calculate the work done.`,

        ans,

        hint:
          "For a force acting in the direction of motion, W = Fd.",

        sol:
          `W = Fd = ${force} × ${distance} = ${work} J.`,

        steps: [
          `Step 1: F = ${force} N and d = ${distance} m.`,
          "Step 2: Use W = Fd.",
          `Step 3: ${force} × ${distance} = ${work} J.`
        ],

        type:
          mode === 0
            ? "open_response"
            : "mcq",

        options:
          mode === 0
            ? null
            : this._mcqOptions(
                ans,
                [
                  `${force + distance} J`,
                  `${force / distance} J`,
                  `${work / 2} J`
                ],
                seed
              ),

        concept:
          "Work done",

        skill:
          "Calculation",

        difficulty: 2
      });
    }

    // ----------------------------------------------------------
    // FORCE
    // ----------------------------------------------------------

    const ans =
      `${force} N`;

    if (mode === 0) {

      return this._base({

        q:
          `A ${mass} kg object accelerates at ${acceleration} m/s². Calculate the resultant force acting on it.`,

        ans,

        hint:
          "Newton's Second Law: F = ma.",

        sol:
          `F = ma = ${mass} × ${acceleration} = ${force} N.`,

        steps: [
          `Step 1: m = ${mass} kg and a = ${acceleration} m/s².`,
          "Step 2: Use F = ma.",
          `Step 3: ${mass} × ${acceleration} = ${force} N.`
        ],

        concept:
          "Newton's Second Law",

        skill:
          "Calculation",

        difficulty: 2
      });
    }

    if (mode === 1) {

      return this._base({

        q:
          `A ${mass} kg object accelerates at ${acceleration} m/s². Which resultant force acts on it?`,

        ans,

        hint:
          "Multiply mass by acceleration.",

        sol:
          `F = ma = ${mass} × ${acceleration} = ${force} N.`,

        steps: [
          "Identify mass and acceleration.",
          "Apply F = ma.",
          "Multiply the values."
        ],

        type:
          "mcq",

        options:
          this._mcqOptions(
            ans,
            [
              `${mass + acceleration} N`,
              `${mass / acceleration} N`,
              `${force * 2} N`
            ],
            seed
          ),

        concept:
          "Newton's Second Law",

        skill:
          "Formula selection",

        difficulty: 2
      });
    }

    if (mode === 2) {

      const wrong =
        mass + acceleration;

      return this._base({

        q:
          `A student claims that a ${mass} kg object accelerating at ${acceleration} m/s² experiences a force of ${wrong} N. Diagnose the mistake.`,

        ans:
          `Incorrect. The correct force is ${force} N because F = ma.`,

        hint:
          "Mass and acceleration must be multiplied.",

        sol:
          `The student added mass and acceleration. Newton's Second Law requires multiplication: F = ${mass} × ${acceleration} = ${force} N.`,

        steps: [
          "Identify the student's operation.",
          "Recall F = ma.",
          `Multiply ${mass} × ${acceleration}.`
        ],

        type:
          "open_response",

        concept:
          "Newton's Second Law",

        skill:
          "Misconception diagnosis",

        difficulty: 3,

        misconception:
          "Adding mass and acceleration instead of multiplying."
      });
    }

    return this._base({

      q:
        `State Newton's Second Law and calculate the resultant force on a ${mass} kg object accelerating at ${acceleration} m/s².`,

      ans:
        `F = ma. Force = ${force} N.`,

      hint:
        "Resultant force equals mass multiplied by acceleration.",

      sol:
        `F = ${mass} × ${acceleration} = ${force} N.`,

      steps: [
        "Recall Newton's Second Law.",
        "Substitute the values.",
        "Calculate the resultant force."
      ],

      concept:
        "Newton's Second Law",

      skill:
        "Recall + application",

      difficulty: 2
    });
  }

  // ============================================================
  // 6. KINEMATICS
  // ============================================================

  _generateKinematics(stem, mode, seed) {

    const acceleration =
      2 + (seed % 5);

    const time =
      2 + ((seed >> 2) % 6);

    const distance =
      0.5 *
      acceleration *
      time *
      time;

    const finalVelocity =
      acceleration * time;

    const ans =
      `${this._round(distance, 2)} m`;

    // ----------------------------------------------------------
    // DISTANCE FROM REST
    // ----------------------------------------------------------

    if (
      stem.toLowerCase().includes("distance") ||
      stem.toLowerCase().includes("travel") ||
      stem.toLowerCase().includes("covered")
    ) {

      if (mode === 0) {

        return this._base({

          q:
            `A vehicle starts from rest and accelerates uniformly at ${acceleration} m/s² for ${time} s. Calculate the distance travelled.`,

          ans,

          hint:
            "Because the vehicle starts from rest, u = 0. Use s = ut + ½at².",

          sol:
            `s = 0 + ½(${acceleration})(${time})² = ${this._round(distance, 2)} m.`,

          steps: [
            "Step 1: Initial velocity u = 0 m/s.",
            `Step 2: a = ${acceleration} m/s² and t = ${time} s.`,
            "Step 3: Use s = ut + ½at².",
            `Step 4: s = ${this._round(distance, 2)} m.`
          ],

          concept:
            "Uniform acceleration",

          skill:
            "Kinematics calculation",

          difficulty: 3
        });
      }

      if (mode === 1) {

        return this._base({

          q:
            `A vehicle starts from rest, accelerates at ${acceleration} m/s² for ${time} s. Which distance does it travel?`,

          ans,

          hint:
            "Use s = ½at².",

          sol:
            `s = ½ × ${acceleration} × ${time}² = ${this._round(distance, 2)} m.`,

          steps: [
            "Initial velocity is zero.",
            "Use s = ½at².",
            "Substitute the values."
          ],

          type:
            "mcq",

          options:
            this._mcqOptions(
              ans,
              [
                `${this._round(finalVelocity, 2)} m`,
                `${this._round(distance * 2, 2)} m`,
                `${this._round(distance / 2, 2)} m`
              ],
              seed
            ),

          concept:
            "Uniform acceleration",

          skill:
            "Equation selection",

          difficulty: 3
        });
      }

      if (mode === 2) {

        const wrong =
          this._round(
            acceleration * time,
            2
          );

        return this._base({

          q:
            `A student calculates the distance travelled by a vehicle accelerating from rest at ${acceleration} m/s² for ${time} s as ${wrong} m. Is this correct? Explain.`,

          ans:
            `No. ${wrong} m is the final velocity, not the distance. The distance travelled is ${this._round(distance, 2)} m.`,

          hint:
            "Check whether you calculated velocity or displacement.",

          sol:
            `v = at = ${acceleration} × ${time} = ${wrong} m/s. This is velocity. Distance is s = ½at² = ${this._round(distance, 2)} m.`,

          steps: [
            "Identify what the student's calculation represents.",
            "Calculate final velocity.",
            "Use s = ½at² for distance.",
            "Compare the two quantities."
          ],

          type:
            "open_response",

          concept:
            "Kinematics",

          skill:
            "Quantity discrimination",

          difficulty: 4,

          misconception:
            "Confusing final velocity with displacement."
        });
      }
    }

    // ----------------------------------------------------------
    // FINAL VELOCITY
    // ----------------------------------------------------------

    const velocityAns =
      `${finalVelocity} m/s`;

    return this._base({

      q:
        `A vehicle starts from rest and accelerates uniformly at ${acceleration} m/s² for ${time} s. Calculate its final velocity.`,

      ans:
        velocityAns,

      hint:
        "Use v = u + at. Since the vehicle starts from rest, u = 0.",

      sol:
        `v = 0 + (${acceleration} × ${time}) = ${finalVelocity} m/s.`,

      steps: [
        "Initial velocity u = 0 m/s.",
        "Use v = u + at.",
        `v = ${acceleration} × ${time}.`,
        `Final velocity = ${finalVelocity} m/s.`
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcqOptions(
              velocityAns,
              [
                `${this._round(finalVelocity / 2, 2)} m/s`,
                `${this._round(finalVelocity * 2, 2)} m/s`,
                `${this._round(distance, 2)} m/s`
              ],
              seed
            ),

      concept:
        "Uniform acceleration",

      skill:
        "Velocity calculation",

      difficulty: 2
    });
  }

  // ============================================================
  // 7. WAVES
  // ============================================================

  _generateWaves(stem, mode, seed) {

    const frequency =
      100 + (seed % 8) * 50;

    const speed =
      this.constants.speedOfSound;

    const wavelength =
      this._round(
        speed / frequency,
        2
      );

    const ans =
      `${wavelength} m`;

    if (
      stem.toLowerCase().includes("wavelength") ||
      stem.toLowerCase().includes("wave")
    ) {

      if (mode === 0) {

        return this._base({

          q:
            `A sound wave travels through air at ${speed} m/s and has a frequency of ${frequency} Hz. Calculate its wavelength.`,

          ans,

          hint:
            "Use v = fλ, therefore λ = v/f.",

          sol:
            `λ = v/f = ${speed}/${frequency} = ${wavelength} m.`,

          steps: [
            `Step 1: v = ${speed} m/s.`,
            `Step 2: f = ${frequency} Hz.`,
            "Step 3: Rearrange v = fλ to λ = v/f.",
            `Step 4: λ = ${wavelength} m.`
          ],

          concept:
            "Wave equation",

          skill:
            "Wave calculation",

          difficulty: 2
        });
      }

      if (mode === 1) {

        return this._base({

          q:
            `A sound wave travels at ${speed} m/s with a frequency of ${frequency} Hz. What is its wavelength?`,

          ans,

          hint:
            "Divide wave speed by frequency.",

          sol:
            `λ = ${speed}/${frequency} = ${wavelength} m.`,

          steps: [
            "Use λ = v/f.",
            "Substitute speed and frequency.",
            "Calculate wavelength."
          ],

          type:
            "mcq",

          options:
            this._mcqOptions(
              ans,
              [
                `${this._round(frequency / speed, 2)} m`,
                `${this._round(speed * frequency, 2)} m`,
                `${this._round(wavelength * 2, 2)} m`
              ],
              seed
            ),

          concept:
            "Wave equation",

          skill:
            "Formula application",

          difficulty: 2
        });
      }
    }

    // ----------------------------------------------------------
    // FREQUENCY FROM WAVELENGTH
    // ----------------------------------------------------------

    const f =
      this._round(
        speed / wavelength,
        2
      );

    return this._base({

      q:
        `A sound wave travels at ${speed} m/s and has a wavelength of ${wavelength} m. Calculate its frequency.`,

      ans:
        `${f} Hz`,

      hint:
        "Use f = v/λ.",

      sol:
        `f = ${speed}/${wavelength} ≈ ${f} Hz.`,

      steps: [
        "Start with v = fλ.",
        "Rearrange to f = v/λ.",
        "Substitute the values.",
        "Calculate frequency."
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcqOptions(
              `${f} Hz`,
              [
                `${this._round(speed * wavelength, 2)} Hz`,
                `${this._round(wavelength / speed, 2)} Hz`,
                `${this._round(f / 2, 2)} Hz`
              ],
              seed
            ),

      concept:
        "Wave equation",

      skill:
        "Rearranging equations",

      difficulty: 3
    });
  }

  // ============================================================
  // 8. DENSITY
  // ============================================================

  _generateDensity(stem, mode, seed) {

    const mass =
      100 + (seed % 8) * 50;

    const volume =
      10 + ((seed >> 2) % 6) * 5;

    const density =
      this._round(
        mass / volume,
        2
      );

    const ans =
      `${density} g/cm³`;

    if (mode === 0) {

      return this._base({

        q:
          `A solid has a mass of ${mass} g and occupies ${volume} cm³. Calculate its density.`,

        ans,

        hint:
          "Density = mass ÷ volume.",

        sol:
          `ρ = m/V = ${mass}/${volume} = ${density} g/cm³.`,

        steps: [
          `Step 1: Mass = ${mass} g.`,
          `Step 2: Volume = ${volume} cm³.`,
          "Step 3: Use ρ = m/V.",
          `Step 4: Density = ${density} g/cm³.`
        ],

        concept:
          "Density",

        skill:
          "Calculation",

        difficulty: 2
      });
    }

    if (mode === 1) {

      return this._base({

        q:
          `A material has a mass of ${mass} g and volume ${volume} cm³. Which value is its density?`,

        ans,

        hint:
          "Divide mass by volume.",

        sol:
          `ρ = ${mass}/${volume} = ${density} g/cm³.`,

        steps: [
          "Recall density = mass/volume.",
          "Substitute the values.",
          "Calculate density."
        ],

        type:
          "mcq",

        options:
          this._mcqOptions(
            ans,
            [
              `${this._round(mass * volume, 2)} g/cm³`,
              `${this._round(volume / mass, 2)} g/cm³`,
              `${this._round(mass / 2, 2)} g/cm³`
            ],
            seed
          ),

        concept:
          "Density",

        skill:
          "Formula selection",

        difficulty: 2
      });
    }

    if (mode === 2) {

      const wrong =
        this._round(
          volume / mass,
          4
        );

      return this._base({

        q:
          `A student calculates the density of an object with mass ${mass} g and volume ${volume} cm³ as ${wrong} g/cm³. Diagnose the student's error.`,

        ans:
          `The correct density is ${density} g/cm³. The student divided volume by mass instead of mass by volume.`,

        hint:
          "Density is mass per unit volume.",

        sol:
          `Density = mass/volume = ${mass}/${volume} = ${density} g/cm³.`,

        steps: [
          "Recall the definition of density.",
          "Check the order of the division.",
          "Calculate mass ÷ volume.",
          "State the correct unit."
        ],

        type:
          "open_response",

        concept:
          "Density",

        skill:
          "Misconception diagnosis",

        difficulty: 3,

        misconception:
          "Reversing mass and volume in the density equation."
      });
    }

    return this._base({

      q:
        `An object has a mass of ${mass} g and volume ${volume} cm³. State the density formula and calculate its density.`,

      ans:
        `ρ = m/V. Density = ${density} g/cm³.`,

      hint:
        "Density means mass per unit volume.",

      sol:
        `ρ = ${mass}/${volume} = ${density} g/cm³.`,

      steps: [
        "Recall the density equation.",
        "Substitute mass and volume.",
        "Calculate the density."
      ],

      concept:
        "Density",

      skill:
        "Recall + calculation",

      difficulty: 2
    });
  }

  // ============================================================
  // 9. ENERGY
  // ============================================================

  _generateEnergy(stem, mode, seed) {

    const mass =
      2 + (seed % 8);

    const height =
      2 + ((seed >> 2) % 8);

    const g =
      this.constants.g;

    const potentialEnergy =
      this._round(
        mass * g * height,
        2
      );

    const ans =
      `${potentialEnergy} J`;

    return this._base({

      q:
        `A ${mass} kg object is raised through a vertical height of ${height} m. Taking g = ${g} m/s², calculate the increase in gravitational potential energy.`,

      ans,

      hint:
        "Use GPE = mgh.",

      sol:
        `GPE = mgh = ${mass} × ${g} × ${height} = ${potentialEnergy} J.`,

      steps: [
        `Step 1: m = ${mass} kg.`,
        `Step 2: h = ${height} m.`,
        `Step 3: g = ${g} m/s².`,
        "Step 4: Apply GPE = mgh.",
        `Step 5: GPE = ${potentialEnergy} J.`
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcqOptions(
              ans,
              [
                `${this._round(mass * height, 2)} J`,
                `${this._round(mass * g, 2)} J`,
                `${this._round(potentialEnergy / 2, 2)} J`
              ],
              seed
            ),

      concept:
        "Gravitational potential energy",

      skill:
        "Energy calculation",

      difficulty: 2
    });
  }

  // ============================================================
  // 10. MOMENTUM
  // ============================================================

  _generateMomentum(stem, mode, seed) {

    const mass =
      2 + (seed % 9);

    const velocity =
      2 + ((seed >> 3) % 8);

    const momentum =
      mass * velocity;

    const ans =
      `${momentum} kg·m/s`;

    return this._base({

      q:
        `A ${mass} kg object moves at ${velocity} m/s. Calculate its momentum.`,

      ans,

      hint:
        "Momentum p = mv.",

      sol:
        `p = mv = ${mass} × ${velocity} = ${momentum} kg·m/s.`,

      steps: [
        "Recall p = mv.",
        `Substitute m = ${mass} kg.`,
        `Substitute v = ${velocity} m/s.`,
        `Calculate p = ${momentum} kg·m/s.`
      ],

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options:
        mode === 0
          ? null
          : this._mcqOptions(
              ans,
              [
                `${mass + velocity} kg·m/s`,
                `${this._round(momentum / 2, 2)} kg·m/s`,
                `${mass / velocity} kg·m/s`
              ],
              seed
            ),

      concept:
        "Momentum",

      skill:
        "Calculation",

      difficulty: 2
    });
  }

  // ============================================================
  // 11. DIAGNOSTIC CONCEPTUAL QUESTIONS
  // ============================================================

  _generateConceptual(stem, mode, seed) {

    const concepts = [

      {
        q:
          "A car travelling at constant velocity moves along a straight road. What can be said about the resultant force acting on the car?",

        ans:
          "The resultant force is zero because the acceleration is zero.",

        misconception:
          "An object must have a resultant force acting on it to keep moving.",

        hint:
          "Think about Newton's First Law.",

        sol:
          "Constant velocity means zero acceleration. From F = ma, zero acceleration means zero resultant force."
      },

      {
        q:
          "Why does a metal conductor carry electric current more easily than an insulator?",

        ans:
          "A metal contains mobile charge carriers, especially delocalized electrons, that can move through the material.",

        misconception:
          "Current is produced because atoms themselves move through the wire.",

        hint:
          "What actually moves through a metal conductor?",

        sol:
          "Metals contain mobile electrons. When a potential difference is applied, these electrons drift through the conductor and produce current."
      },

      {
        q:
          "Why does increasing the frequency of a wave while keeping its speed constant decrease its wavelength?",

        ans:
          "Because v = fλ, so if v remains constant, wavelength must decrease as frequency increases.",

        misconception:
          "Higher frequency automatically means a higher wave speed.",

        hint:
          "Use the wave equation.",

        sol:
          "From v = fλ, λ = v/f. Therefore, with constant v, increasing f causes λ to decrease."
      },

      {
        q:
          "Why does a sharp knife cut more easily than a blunt knife when the same force is applied?",

        ans:
          "The sharp knife has a smaller contact area, producing greater pressure for the same force.",

        misconception:
          "Pressure depends only on the force applied.",

        hint:
          "Pressure depends on both force and area.",

        sol:
          "Pressure P = F/A. A smaller area produces greater pressure when the force is unchanged."
      }
    ];

    const concept =
      this._pick(
        concepts,
        seed
      );

    return this._base({

      q:
        concept.q,

      ans:
        concept.ans,

      hint:
        concept.hint,

      sol:
        concept.sol,

      steps: [
        "Identify the physical situation.",
        "Recall the governing principle.",
        "Connect the principle to the observation.",
        "State the conclusion."
      ],

      type:
        mode === 1
          ? "mcq"
          : "open_response",

      options:
        mode === 1
          ? this._mcqOptions(
              concept.ans,
              [
                concept.misconception,
                "The effect occurs randomly and cannot be explained by a physical law.",
                "The quantity remains unchanged regardless of the physical conditions."
              ],
              seed
            )
          : null,

      concept:
        concept.concept || "Conceptual reasoning",

      skill:
        "Physical explanation",

      difficulty: 3,

      misconception:
        concept.misconception,

      modality:
        "conceptual"
    });
  }

  // ============================================================
  // 11. MODERN PHYSICS (PHOTOELECTRIC EFFECT)
  // ============================================================

  _generateModernPhysics(stem, mode, seed) {
    const lower = stem.toLowerCase();

    const frequency = 5e14 + (seed % 5) * 1e14;
    const thresholdFrequency = 4e14;

    if (
      lower.includes("photoelectric") ||
      lower.includes("photoelectron") ||
      lower.includes("photon") ||
      lower.includes("work function") ||
      lower.includes("threshold frequency") ||
      lower.includes("quantum") ||
      lower.includes("emission")
    ) {

      // MODE 0 — CONCEPTUAL RECALL
      if (mode === 0) {
        return this._base({
          q: "What is meant by the threshold frequency in the photoelectric effect?",
          ans: "It is the minimum frequency of electromagnetic radiation required to eject electrons from a metal surface.",
          hint: "Think about the minimum photon energy needed to overcome the work function.",
          sol: "A photon must have sufficient energy (E = hf) to overcome the work function of the material. The corresponding minimum frequency is called the threshold frequency.",
          steps: [
            "Recall that photon energy is E = hf.",
            "Electrons require a minimum energy (work function) to escape.",
            "This minimum condition defines the threshold frequency."
          ],
          type: "mcq",
          options: this._mcqOptions(
            "It is the minimum frequency of electromagnetic radiation required to eject electrons from a metal surface.",
            [
              "It is the maximum frequency of light that a metal can reflect.",
              "It is the frequency at which electrons move at the speed of light.",
              "It is the intensity of light required to heat the metal to emission."
            ],
            seed
          ),
          concept: "Threshold frequency",
          skill: "Conceptual understanding",
          difficulty: 2,
          modality: "recall"
        });
      }

      // MODE 1 — FREQUENCY REASONING / APPLICATION
      if (mode === 1) {
        const isEmitted = frequency >= thresholdFrequency;
        return this._base({
          q: `Light with frequency ${frequency.toExponential(1)} Hz falls on a metal with threshold frequency ${thresholdFrequency.toExponential(1)} Hz. Will photoelectrons be emitted? Explain.`,
          ans: isEmitted
            ? "Yes. The frequency is greater than the threshold frequency, so photons have sufficient energy to release electrons."
            : "No. The frequency is below the threshold frequency, so photons do not have sufficient energy to release electrons.",
          hint: "Compare the incident light frequency with the threshold frequency.",
          sol: isEmitted
            ? `Since ${frequency.toExponential(1)} Hz is greater than ${thresholdFrequency.toExponential(1)} Hz, individual photons carry enough energy to eject photoelectrons.`
            : `Since ${frequency.toExponential(1)} Hz is below ${thresholdFrequency.toExponential(1)} Hz, individual photons lack the required work function energy.`,
          steps: [
            "Identify the incident frequency.",
            "Identify the threshold frequency.",
            "Compare the two frequencies.",
            "Determine whether electron emission occurs."
          ],
          type: "mcq",
          options: this._mcqOptions(
            isEmitted
              ? "Yes. The frequency is greater than the threshold frequency, so photons have sufficient energy to release electrons."
              : "No. The frequency is below the threshold frequency, so photons do not have sufficient energy to release electrons.",
            [
              isEmitted
                ? "No. Photoelectrons are only emitted when light intensity is doubled."
                : "Yes. Any light beam will eventually release electrons given enough time.",
              "Yes. Electron emission depends only on the voltage applied across the metal.",
              "No. Photoelectric emission can only occur in a liquid medium."
            ],
            seed
          ),
          concept: "Threshold frequency application",
          skill: "Physical reasoning",
          difficulty: 3,
          modality: "application"
        });
      }

      // MODE 2 — MISCONCEPTION DIAGNOSIS
      if (mode === 2) {
        return this._base({
          q: "A student states that increasing the intensity of light will always cause electrons to be emitted from a metal, regardless of frequency. Is the student correct? Explain.",
          ans: "No. If the light frequency is below the threshold frequency, increasing intensity alone will not provide enough energy per individual photon to eject electrons.",
          hint: "Does intensity increase the energy of each individual photon?",
          sol: "Photon energy depends strictly on frequency (E = hf). Increasing intensity increases the rate of incoming photons, but if each photon has energy below the work function, no emission occurs.",
          steps: [
            "Recall E = hf.",
            "Identify that photon energy depends on frequency.",
            "Distinguish photon quantity (intensity) from photon energy (frequency).",
            "Evaluate the student's claim."
          ],
          type: "mcq",
          options: this._mcqOptions(
            "No. If the light frequency is below the threshold frequency, increasing intensity alone will not provide enough energy per individual photon to eject electrons.",
            [
              "Yes. Higher intensity increases photon energy until electrons are pushed out.",
              "Yes. Bright light heats the metal so electrons boil off thermal-electronically.",
              "No. Intensity only affects the speed of emitted electrons, not their count."
            ],
            seed
          ),
          concept: "Photoelectric effect intensity vs frequency",
          skill: "Misconception diagnosis",
          difficulty: 4,
          misconception: "Increasing light intensity always causes photoelectric emission.",
          modality: "diagnostic"
        });
      }

      // MODE 3 — CONCEPTUAL TRANSFER
      return this._base({
        q: "Two beams of light shine on the same metal. Beam A has higher intensity but a frequency below the threshold frequency. Beam B has lower intensity but a frequency above the threshold frequency. Which beam will produce photoelectrons?",
        ans: "Beam B will produce photoelectrons because its frequency is above the threshold frequency. Beam A cannot produce them regardless of intensity.",
        hint: "For photoelectric emission, first consider the energy of an individual photon.",
        sol: "A single photon must have energy at least equal to the work function (E = hf). Since Beam B has a frequency above the threshold frequency, its photons carry enough energy to eject electrons.",
        steps: [
          "Recall E = hf.",
          "Compare each frequency with the threshold frequency.",
          "Separate intensity from single-photon energy.",
          "Determine which beam can cause emission."
        ],
        type: "mcq",
        options: this._mcqOptions(
          "Beam B will produce photoelectrons because its frequency is above the threshold frequency. Beam A cannot produce them regardless of intensity.",
          [
            "Beam A will produce them because its higher intensity delivers more overall energy.",
            "Both beams will produce equal numbers of photoelectrons.",
            "Neither beam will produce photoelectrons because intensity and frequency cancel out."
          ],
          seed
        ),
        concept: "Frequency versus intensity transfer",
        skill: "Conceptual transfer",
        difficulty: 5,
        misconception: "Greater light intensity automatically means greater photon energy.",
        modality: "transfer"
      });
    }

    return null;
  }

  // ============================================================
  // 12. MAIN MUTATOR
  // ============================================================

  mutate(qObj, modalityIndex = 0) {

    if (!qObj) return null;

    const stem =
      (
        qObj.q ||
        qObj.stem ||
        ""
      ).trim();

    if (!stem) return null;

    const mode =
      (
        typeof modalityIndex === "number"
          ? modalityIndex
          : 0
      ) % 4;

    const seed =
      this._seed(
        qObj,
        mode
      );

    const topic = this._detectTopic(stem, qObj);
    let result = null;

    // ----------------------------------------------------------
    // TOPIC ROUTING WITH CONCEPT LOCKING
    // ----------------------------------------------------------

    if (topic === "electricity") {
      result = this._generateElectricity(stem, mode, seed);
    } else if (topic === "mechanics") {
      result = this._generateMechanics(stem, mode, seed);
    } else if (topic === "kinematics") {
      result = this._generateKinematics(stem, mode, seed);
    } else if (topic === "waves") {
      result = this._generateWaves(stem, mode, seed);
    } else if (topic === "density") {
      result = this._generateDensity(stem, mode, seed);
    } else if (topic === "modernPhysics") {
      result = this._generateModernPhysics(stem, mode, seed);
    } else if (stem.toLowerCase().includes("potential energy") || stem.toLowerCase().includes("gpe")) {
      result = this._generateEnergy(stem, mode, seed);
    } else if (stem.toLowerCase().includes("momentum") || stem.toLowerCase().includes("collision")) {
      result = this._generateMomentum(stem, mode, seed);
    }

    // ----------------------------------------------------------
    // SEMANTIC BOUNDARY VALIDATION
    // ----------------------------------------------------------

    if (result && this._validateTopicIntegrity(topic, result)) {
      return result;
    }

    // ----------------------------------------------------------
    // SAFE CONCEPT-PRESERVING FALLBACK (No Topic Leakage)
    // ----------------------------------------------------------

    return this._createSafeFallback(qObj, topic);
  }
}