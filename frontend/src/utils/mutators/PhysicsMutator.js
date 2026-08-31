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
        "power",
        "electrical energy",
        "charge"
      ],

      mechanics: [
        "force",
        "mass",
        "acceleration",
        "newton",
        "friction",
        "momentum",
        "work",
        "power",
        "energy"
      ],

      kinematics: [
        "speed",
        "velocity",
        "motion",
        "distance",
        "displacement",
        "acceleration",
        "rest",
        "kinematic",
        "time"
      ],

      waves: [
        "wave",
        "frequency",
        "wavelength",
        "sound",
        "light",
        "hz",
        "amplitude",
        "period"
      ],

      density: [
        "density",
        "volume",
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
  // 2. TOPIC DETECTION
  // ============================================================

  _detectTopic(stem) {

    const lower = stem.toLowerCase();

    const scores = {};

    for (const [topic, keywords] of Object.entries(this.topics)) {

      scores[topic] = keywords.reduce(
        (score, keyword) =>
          score + (lower.includes(keyword) ? 1 : 0),
        0
      );
    }

    const bestTopic = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])[0];

    if (!bestTopic || bestTopic[1] === 0) {
      return "general";
    }

    return bestTopic[0];
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
        "Conceptual reasoning",

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

    const topic =
      this._detectTopic(
        stem
      );

    // ----------------------------------------------------------
    // ELECTRICITY
    // ----------------------------------------------------------

    if (
      topic === "electricity"
    ) {

      return this._generateElectricity(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // MECHANICS
    // ----------------------------------------------------------

    if (
      topic === "mechanics"
    ) {

      return this._generateMechanics(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // KINEMATICS
    // ----------------------------------------------------------

    if (
      topic === "kinematics"
    ) {

      return this._generateKinematics(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // WAVES
    // ----------------------------------------------------------

    if (
      topic === "waves"
    ) {

      return this._generateWaves(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // DENSITY
    // ----------------------------------------------------------

    if (
      topic === "density"
    ) {

      return this._generateDensity(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // ENERGY
    // ----------------------------------------------------------

    if (
      stem.toLowerCase().includes("potential energy") ||
      stem.toLowerCase().includes("gravitational energy") ||
      stem.toLowerCase().includes("gpe")
    ) {

      return this._generateEnergy(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // MOMENTUM
    // ----------------------------------------------------------

    if (
      stem.toLowerCase().includes("momentum") ||
      stem.toLowerCase().includes("collision")
    ) {

      return this._generateMomentum(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // CONCEPTUAL FALLBACK
    // ----------------------------------------------------------

    if (
      qObj.ans &&
      String(qObj.ans).length > 3
    ) {

      return this._generateConceptual(
        stem,
        mode,
        seed
      );
    }

    // ----------------------------------------------------------
    // SAFE FALLBACK
    // ----------------------------------------------------------

    return {

      ...qObj,

      q:
        stem,

      hint:
        qObj.hint ||
        "Identify the physical quantities and the governing physical principle.",

      steps:
        qObj.steps || [
          "Identify the known physical quantities.",
          "Identify the unknown quantity.",
          "Select the governing equation.",
          "Substitute values with correct units.",
          "Check whether the answer is physically reasonable."
        ],

      concept:
        "Physics reasoning",

      skill:
        "Problem solving",

      difficulty:
        qObj.difficulty || 2,

      modality:
        "diagnostic"
    };
  }
}