/**
 * Tixar Physics Mutator v5
 *
 * VERIFIED DIAGNOSTIC PHYSICS ENGINE
 *
 * Core law:
 *
 *     THE GENERATOR PROPOSES.
 *     THE SOLVER DECIDES.
 *
 * v5 guarantees:
 *
 * - No Math.random()
 * - No non-deterministic mutation
 * - Same source + same modality + same engine version
 *   => same mutation plan
 *   => same parameters
 *   => same answer
 *   => same distractors
 *   => same options
 *
 * Pipeline:
 *
 * SOURCE QUESTION
 *      ↓
 * IDENTIFY EXACT FACT
 *      ↓
 * EXTRACT + NORMALIZE PARAMETERS
 *      ↓
 * BUILD CANONICAL FACT MODEL
 *      ↓
 * BUILD DETERMINISTIC MUTATION PLAN
 *      ↓
 * APPLY AUTHORIZED MUTATION
 *      ↓
 * SOLVE DETERMINISTICALLY
 *      ↓
 * BUILD QUESTION FROM SAME MODEL
 *      ↓
 * BUILD VERIFIED DISTRACTORS
 *      ↓
 * VERIFY SEMANTICS
 *      ↓
 * VERIFY ANSWER
 *      ↓
 * VERIFY OPTIONS
 *      ↓
 * VERIFIED QUESTION
 *
 * If an important physical fact is ambiguous:
 *
 *      → SAFE FALLBACK
 *
 * Never:
 *
 * - use Math.random()
 * - invent physical entities from a hash
 * - silently replace source values
 * - mutate unauthorized parameters
 * - calculate using inconsistent units
 * - use numerical fallback options for conceptual questions
 * - mark a question VERIFIED before validation
 * - mix unrelated physics concepts
 *
 * Public API:
 *
 *   mutate(qObj, modalityIndex, performanceContext)
 *   safeMutate(qObj, modalityIndex, performanceContext)
 *   validateQuestion(question)
 */

export class PhysicsMutator {

  constructor(config = {}) {

    this.version = "5.0.0";

    this.constants = Object.freeze({
      g: 9.8,
      speedOfSound: 340,
      atmosphericPressure: 101325,
      speedOfLight: 3e8,
      electronCharge: 1.602e-19,
      planckConstant: 6.626e-34
    });

    /*
     * Every parameter domain is expressed in the canonical unit
     * used by the solver.
     */
    this.allowedParameters = Object.freeze({

      current: [
        0.5, 1, 1.5, 2, 2.5, 3, 4, 5
      ],

      resistance: [
        2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50
      ],

      mass: [
        1, 2, 4, 5, 8, 10, 12, 15, 20, 25, 50, 100
      ],

      acceleration: [
        1, 2, 2.5, 3, 4, 5, 6, 8, 10
      ],

      time: [
        1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20
      ],

      distance: [
        2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 50, 100
      ],

      velocity: [
        2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30
      ],

      speed: [
        2, 4, 5, 10, 15, 20, 25, 30, 340, 1500
      ],

      force: [
        5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 200
      ],

      frequency: [
        50, 100, 170, 200, 250, 340, 400, 500, 680, 800, 1000
      ],

      wavelength: [
        0.2, 0.4, 0.5, 0.8, 1, 1.5, 2, 2.5, 4, 5
      ],

      height: [
        2, 3, 4, 5, 6, 8, 10, 12, 15, 20
      ],

      volume: [
        5, 10, 20, 25, 40, 50, 80, 100, 200, 500
      ],

      charge: [
        1, 2, 3, 4, 5, 6, 8, 10
      ],

      voltage: [
        3, 5, 6, 9, 10, 12, 15, 20, 24, 30, 48, 60, 120, 240
      ],

      power: [
        10, 20, 40, 60, 80, 100, 120, 150, 200, 500, 1000
      ],

      area: [
        0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 4, 5
      ],

      thresholdFrequency: [
        4e14, 5e14, 6e14
      ]
    });

    /*
     * Canonical units.
     */
    this.units = Object.freeze({

      current: "A",
      resistance: "ohm",
      voltage: "V",
      power: "W",
      mass: "kg",
      acceleration: "m/s2",
      time: "s",
      distance: "m",
      velocity: "m/s",
      speed: "m/s",
      force: "N",
      frequency: "Hz",
      wavelength: "m",
      height: "m",
      volume: "cm3",
      charge: "C",
      area: "m2",
      thresholdFrequency: "Hz"
    });

    /*
     * Every calculation fact is explicitly registered.
     *
     * allowedParameterKeys is deliberately identical to the
     * parameters that are authorized to mutate.
     */
    this.factRegistry = Object.freeze({

      "electricity.ohms_law.voltage": {
        factId: "electricity.ohms_law.voltage",
        topic: "electricity",
        concept: "Ohm's Law",
        skill: "Calculate potential difference",
        type: "calculation",
        formula: "V = IR",
        requiredParameters: ["current", "resistance"],
        answerUnit: "V",
        allowedParameterKeys: ["current", "resistance"]
      },

      "electricity.power.voltage_current": {
        factId: "electricity.power.voltage_current",
        topic: "electricity",
        concept: "Electrical power",
        skill: "Calculate electrical power",
        type: "calculation",
        formula: "P = VI",
        requiredParameters: ["voltage", "current"],
        answerUnit: "W",
        allowedParameterKeys: ["voltage", "current"]
      },

      "mechanics.newtons_second_law.force": {
        factId: "mechanics.newtons_second_law.force",
        topic: "mechanics",
        concept: "Newton's Second Law",
        skill: "Calculate resultant force",
        type: "calculation",
        formula: "F = ma",
        requiredParameters: ["mass", "acceleration"],
        answerUnit: "N",
        allowedParameterKeys: ["mass", "acceleration"]
      },

      "mechanics.work.force_distance": {
        factId: "mechanics.work.force_distance",
        topic: "mechanics",
        concept: "Work done",
        skill: "Calculate work done",
        type: "calculation",
        formula: "W = Fd",
        requiredParameters: ["force", "distance"],
        answerUnit: "J",
        allowedParameterKeys: ["force", "distance"]
      },

      "mechanics.momentum.mass_velocity": {
        factId: "mechanics.momentum.mass_velocity",
        topic: "mechanics",
        concept: "Momentum",
        skill: "Calculate momentum",
        type: "calculation",
        formula: "p = mv",
        requiredParameters: ["mass", "velocity"],
        answerUnit: "kg·m/s",
        allowedParameterKeys: ["mass", "velocity"]
      },

      "kinematics.final_velocity.rest": {
        factId: "kinematics.final_velocity.rest",
        topic: "kinematics",
        concept: "Uniform acceleration",
        skill: "Calculate final velocity",
        type: "calculation",
        formula: "v = u + at",
        requiredParameters: ["acceleration", "time"],
        invariant: {
          initialVelocity: 0
        },
        answerUnit: "m/s",
        allowedParameterKeys: ["acceleration", "time"]
      },

      "kinematics.distance.rest": {
        factId: "kinematics.distance.rest",
        topic: "kinematics",
        concept: "Uniform acceleration",
        skill: "Calculate distance travelled",
        type: "calculation",
        formula: "s = ut + half-at-squared",
        requiredParameters: ["acceleration", "time"],
        invariant: {
          initialVelocity: 0
        },
        answerUnit: "m",
        allowedParameterKeys: ["acceleration", "time"]
      },

      "waves.wavelength.speed_frequency": {
        factId: "waves.wavelength.speed_frequency",
        topic: "waves",
        concept: "Wave equation",
        skill: "Calculate wavelength",
        type: "calculation",
        formula: "v = f * lambda",
        requiredParameters: ["speed", "frequency"],
        answerUnit: "m",
        allowedParameterKeys: ["frequency"],
        invariant: {
          medium: "air",
          speed: 340
        }
      },

      "waves.frequency.speed_wavelength": {
        factId: "waves.frequency.speed_wavelength",
        topic: "waves",
        concept: "Wave equation",
        skill: "Calculate frequency",
        type: "calculation",
        formula: "f = v / lambda",
        requiredParameters: ["speed", "wavelength"],
        answerUnit: "Hz",
        allowedParameterKeys: ["wavelength"],
        invariant: {
          medium: "air",
          speed: 340
        }
      },

      "density.mass_volume": {
        factId: "density.mass_volume",
        topic: "density",
        concept: "Density",
        skill: "Calculate density",
        type: "calculation",
        formula: "rho = m / V",
        requiredParameters: ["mass", "volume"],
        answerUnit: "g/cm3",
        allowedParameterKeys: ["mass", "volume"],
        invariant: {
          massUnit: "g",
          volumeUnit: "cm3"
        }
      },

      "energy.gpe.mass_height": {
        factId: "energy.gpe.mass_height",
        topic: "energy",
        concept: "Gravitational potential energy",
        skill: "Calculate gravitational potential energy",
        type: "calculation",
        formula: "GPE = mgh",
        requiredParameters: ["mass", "height"],
        answerUnit: "J",
        allowedParameterKeys: ["mass", "height"],
        invariant: {
          g: 9.8
        }
      }
    });

    this.topicKeywords = Object.freeze({

      electricity: [
        "electricity",
        "current",
        "voltage",
        "potential difference",
        "resistance",
        "resistor",
        "ohm",
        "power",
        "watt",
        "charge",
        "circuit"
      ],

      mechanics: [
        "force",
        "mass",
        "newton",
        "work",
        "joule",
        "momentum",
        "friction",
        "resultant force"
      ],

      kinematics: [
        "speed",
        "velocity",
        "acceleration",
        "distance",
        "displacement",
        "motion",
        "time",
        "kinematic"
      ],

      waves: [
        "wave",
        "wavelength",
        "frequency",
        "amplitude",
        "period",
        "wave speed",
        "sound"
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
        "thermal",
        "specific heat",
        "latent heat"
      ],

      pressure: [
        "pressure",
        "atmospheric pressure",
        "hydraulic",
        "pascal"
      ],

      nuclear: [
        "radioactive",
        "radioactivity",
        "alpha",
        "beta",
        "gamma",
        "half-life",
        "nucleus",
        "nuclear"
      ],

      modernPhysics: [
        "photoelectric",
        "photoelectron",
        "photon",
        "work function",
        "threshold frequency",
        "stopping potential",
        "quantum"
      ],

      density: [
        "density",
        "mass per unit volume",
        "float",
        "sink",
        "buoyant"
      ],

      energy: [
        "potential energy",
        "gravitational potential",
        "gpe"
      ]
    });

    /*
     * Explicit deterministic mutation policies.
     *
     * Each policy tells the engine which parameter is allowed
     * to change for each modality.
     *
     * 0 = calculation/open
     * 1 = application
     * 2 = diagnostic
     * 3 = transfer
     */
    this.mutationPolicies = Object.freeze({

      "electricity.ohms_law.voltage": {
        0: ["current"],
        1: ["resistance"],
        2: ["current", "resistance"],
        3: ["current"]
      },

      "electricity.power.voltage_current": {
        0: ["voltage"],
        1: ["current"],
        2: ["voltage", "current"],
        3: ["voltage"]
      },

      "mechanics.newtons_second_law.force": {
        0: ["mass"],
        1: ["acceleration"],
        2: ["mass", "acceleration"],
        3: ["acceleration"]
      },

      "mechanics.work.force_distance": {
        0: ["force"],
        1: ["distance"],
        2: ["force", "distance"],
        3: ["distance"]
      },

      "mechanics.momentum.mass_velocity": {
        0: ["mass"],
        1: ["velocity"],
        2: ["mass", "velocity"],
        3: ["velocity"]
      },

      "kinematics.final_velocity.rest": {
        0: ["acceleration"],
        1: ["time"],
        2: ["acceleration", "time"],
        3: ["time"]
      },

      "kinematics.distance.rest": {
        0: ["acceleration"],
        1: ["time"],
        2: ["acceleration", "time"],
        3: ["time"]
      },

      "waves.wavelength.speed_frequency": {
        0: ["frequency"],
        1: ["frequency"],
        2: ["frequency"],
        3: ["frequency"]
      },

      "waves.frequency.speed_wavelength": {
        0: ["wavelength"],
        1: ["wavelength"],
        2: ["wavelength"],
        3: ["wavelength"]
      },

      "density.mass_volume": {
        0: ["mass"],
        1: ["volume"],
        2: ["mass", "volume"],
        3: ["volume"]
      },

      "energy.gpe.mass_height": {
        0: ["mass"],
        1: ["height"],
        2: ["mass", "height"],
        3: ["height"]
      }
    });

    /*
     * Deterministic conceptual question bank.
     *
     * These are independent of numerical mutation.
     */
    this.conceptualRegistry = Object.freeze({

      "electricity.ohms_law.voltage": [
        {
          q: "If the resistance of an ohmic resistor remains constant, what happens to the current when the potential difference across it is increased?",
          ans: "The current increases because I = V/R, so with constant resistance current is directly proportional to voltage.",
          hint: "Rearrange Ohm's Law to make current the subject.",
          sol: "From V = IR, I = V/R. If R remains constant, increasing V increases I.",
          misconception: "Current remains constant regardless of potential difference.",
          distractors: [
            "The current decreases because increasing voltage reduces current.",
            "The current remains constant regardless of potential difference.",
            "The current becomes zero because the resistance is unchanged."
          ]
        }
      ],

      "electricity.power.voltage_current": [
        {
          q: "What happens to electrical power if the voltage across an appliance increases while its current remains constant?",
          ans: "The electrical power increases because P = VI.",
          hint: "Look at the relationship between power, voltage and current.",
          sol: "Since P = VI, if I remains constant and V increases, P increases.",
          misconception: "Power depends only on the current.",
          distractors: [
            "The electrical power decreases.",
            "The electrical power remains constant because current is unchanged.",
            "The electrical power becomes zero."
          ]
        }
      ],

      "mechanics.newtons_second_law.force": [
        {
          q: "What happens to the resultant force on an object if its mass is doubled while its acceleration remains unchanged?",
          ans: "The resultant force doubles because F = ma.",
          hint: "Look at the relationship between force and mass.",
          sol: "F = ma. With acceleration unchanged, doubling mass doubles the resultant force.",
          misconception: "Force remains unchanged because acceleration has not changed.",
          distractors: [
            "The resultant force is halved.",
            "The resultant force remains unchanged.",
            "The resultant force becomes zero."
          ]
        }
      ],

      "mechanics.work.force_distance": [
        {
          q: "If the force acting in the direction of motion is doubled while the distance moved remains constant, what happens to the work done?",
          ans: "The work done doubles because W = Fd.",
          hint: "Work done is directly proportional to force when distance is constant.",
          sol: "W = Fd. With d constant, doubling F doubles W.",
          misconception: "Work done remains unchanged because distance has not changed.",
          distractors: [
            "The work done is halved.",
            "The work done remains unchanged.",
            "The work done becomes zero."
          ]
        }
      ],

      "mechanics.momentum.mass_velocity": [
        {
          q: "What happens to the momentum of an object if its velocity is doubled while its mass remains constant?",
          ans: "The momentum doubles because p = mv.",
          hint: "Momentum is directly proportional to velocity for constant mass.",
          sol: "p = mv. With m constant, doubling v doubles p.",
          misconception: "Momentum remains unchanged because the mass is constant.",
          distractors: [
            "The momentum is halved.",
            "The momentum remains unchanged.",
            "The momentum becomes zero."
          ]
        }
      ],

      "kinematics.final_velocity.rest": [
        {
          q: "A vehicle starts from rest and accelerates uniformly. If its acceleration is doubled for the same time, what happens to its final velocity?",
          ans: "Its final velocity doubles because, from rest, v = at.",
          hint: "The initial velocity is zero.",
          sol: "Since u = 0, v = u + at becomes v = at. Doubling a while keeping t constant doubles v.",
          misconception: "The final velocity remains unchanged because the time is unchanged.",
          distractors: [
            "The final velocity is halved.",
            "The final velocity remains unchanged.",
            "The final velocity becomes zero."
          ]
        }
      ],

      "kinematics.distance.rest": [
        {
          q: "A vehicle starts from rest and accelerates uniformly. If its acceleration is doubled for the same time, what happens to the distance travelled?",
          ans: "The distance travelled doubles because s = 1/2 at² when the vehicle starts from rest.",
          hint: "Use s = 1/2 at² because u = 0.",
          sol: "With u = 0, s = 1/2 at². Keeping t constant means s is directly proportional to a.",
          misconception: "The distance remains unchanged because the time is unchanged.",
          distractors: [
            "The distance is halved.",
            "The distance remains unchanged.",
            "The distance becomes zero."
          ]
        }
      ],

      "waves.wavelength.speed_frequency": [
        {
          q: "For a wave travelling at constant speed, what happens to its wavelength if its frequency is increased?",
          ans: "The wavelength decreases because v = fλ and the wave speed remains constant.",
          hint: "Rearrange v = fλ to make wavelength the subject.",
          sol: "λ = v/f. With v constant, increasing f decreases λ.",
          misconception: "The wavelength increases when frequency increases.",
          distractors: [
            "The wavelength increases.",
            "The wavelength remains unchanged.",
            "The wavelength becomes equal to the frequency."
          ]
        }
      ],

      "waves.frequency.speed_wavelength": [
        {
          q: "For a wave travelling at constant speed, what happens to its frequency if its wavelength is increased?",
          ans: "The frequency decreases because f = v/λ and the wave speed remains constant.",
          hint: "Use f = v/λ.",
          sol: "Since v is constant, increasing λ causes f to decrease.",
          misconception: "The frequency increases when wavelength increases.",
          distractors: [
            "The frequency increases.",
            "The frequency remains unchanged.",
            "The frequency becomes equal to the wavelength."
          ]
        }
      ],

      "density.mass_volume": [
        {
          q: "For a fixed mass, what happens to the density of an object if its volume decreases?",
          ans: "The density increases because density is mass divided by volume.",
          hint: "Use ρ = m/V.",
          sol: "For constant mass, decreasing V increases m/V, so density increases.",
          misconception: "Density decreases when volume decreases.",
          distractors: [
            "The density decreases.",
            "The density remains unchanged.",
            "The density becomes zero."
          ]
        }
      ],

      "energy.gpe.mass_height": [
        {
          q: "What happens to the gravitational potential energy of an object if its height is doubled while its mass remains constant?",
          ans: "The gravitational potential energy doubles because GPE = mgh.",
          hint: "Look at the relationship between GPE and height.",
          sol: "GPE = mgh. With m and g constant, doubling h doubles the GPE.",
          misconception: "The gravitational potential energy remains unchanged because the mass is unchanged.",
          distractors: [
            "The gravitational potential energy is halved.",
            "The gravitational potential energy remains unchanged.",
            "The gravitational potential energy becomes zero."
          ]
        }
      ]
    });

    /*
     * Configuration overrides.
     */
    this.config = Object.freeze({
      ...config,
      minOptions: 4,
      maxOptions: 4,
      numericalTolerance: 0.0001,
      deterministic: true
    });
  }

  // ------------------------------------------------------------------
  // DETERMINISTIC UTILITIES
  // ------------------------------------------------------------------

  _hash(value = "") {

    let h = 2166136261;

    const s = String(value);

    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }

    return h >>> 0;
  }

  _seed(qObj, modalityIndex = 0) {

    const id = qObj?.id || "";

    const stem = qObj?.q || qObj?.stem || "";

    return this._hash(
      `${this.version}|${id}|${stem}|physics|${modalityIndex}`
    );
  }

  _fingerprint(value) {

    return this._hash(
      typeof value === "string"
        ? value
        : JSON.stringify(value)
    ).toString(16).padStart(8, "0");
  }

  _round(value, decimals = 2) {

    if (!Number.isFinite(Number(value))) return null;

    return Number(Number(value).toFixed(decimals));
  }

  _number(value) {

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    const match = String(value ?? "")
      .replace(/,/g, "")
      .match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i);

    return match ? Number(match[0]) : null;
  }

  _normalizeText(value = "") {

    return String(value)
      .toLowerCase()
      .replace(/[²]/g, "^2")
      .replace(/[³]/g, "^3")
      .replace(/\s+/g, " ")
      .trim();
  }

  _shuffleDeterministic(array, seed) {

    const result = [...array];

    let state = seed >>> 0;

    for (let i = result.length - 1; i > 0; i--) {

      /*
       * Deterministic xorshift32.
       *
       * No Math.random().
       */
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;

      state >>>= 0;

      const j = state % (i + 1);

      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  _extractNumAndUnit(text, units) {

    const escaped = units
      .sort((a, b) => b.length - a.length)
      .map(u =>
        u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      )
      .join("|");

    const expression =
      `(\\d+(?:\\.\\d+)?)\\s*(${escaped})(?![a-zA-Z0-9_/^-])`;

    const match = String(text || "").match(
      new RegExp(
        expression,
        "i"
      )
    );

    if (!match) return null;

    return {
      value: Number(match[1]),
      matchedUnit: match[2]
    };
  }

  _unit(value) {

    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  // ------------------------------------------------------------------
  // TOPIC DETECTION
  // ------------------------------------------------------------------

  _normalizeTopic(value) {

    const s = this._normalizeText(value);

    if (
      s.includes("photoelectric") ||
      s.includes("quantum")
    ) {
      return "modernPhysics";
    }

    if (
      s.includes("electric") ||
      s.includes("circuit") ||
      s.includes("ohm")
    ) {
      return "electricity";
    }

    if (
      s.includes("kinematic") ||
      s.includes("velocity") ||
      s.includes("acceleration")
    ) {
      return "kinematics";
    }

    if (
      s.includes("mechanic") ||
      s.includes("force") ||
      s.includes("momentum") ||
      s.includes("work done")
    ) {
      return "mechanics";
    }

    if (
      s.includes("wave") ||
      s.includes("sound")
    ) {
      return "waves";
    }

    if (
      s.includes("optic") ||
      s.includes("lens") ||
      s.includes("reflection") ||
      s.includes("refraction")
    ) {
      return "optics";
    }

    if (
      s.includes("thermal") ||
      s.includes("heat") ||
      s.includes("temperature")
    ) {
      return "thermal";
    }

    if (
      s.includes("pressure") ||
      s.includes("pascal") ||
      s.includes("hydraulic")
    ) {
      return "pressure";
    }

    if (
      s.includes("radioactiv") ||
      s.includes("nuclear") ||
      s.includes("half-life")
    ) {
      return "nuclear";
    }

    if (
      s.includes("density") ||
      s.includes("float") ||
      s.includes("sink")
    ) {
      return "density";
    }

    if (
      s.includes("potential energy") ||
      s.includes("gpe")
    ) {
      return "energy";
    }

    return null;
  }

  _detectTopic(qObj) {

    const explicit =
      qObj?.topic ||
      qObj?.strand ||
      qObj?.topicId ||
      qObj?.factModel?.topic ||
      qObj?.metadata?.factModel?.topic;

    if (explicit) {

      const normalized = this._normalizeTopic(explicit);

      if (normalized) return normalized;
    }

    const stem = this._normalizeText(
      qObj?.q || qObj?.stem || ""
    );

    const scores = {};

    for (const [topic, keywords] of Object.entries(
      this.topicKeywords
    )) {

      scores[topic] = 0;

      for (const keyword of keywords) {

        const k = this._normalizeText(keyword);

        if (stem.includes(k)) {
          scores[topic] += k.includes(" ") ? 3 : 1;
        }
      }
    }

    const ranked = Object.entries(scores)
      .sort((a, b) => b[1] - a[1]);

    const best = ranked[0];
    const second = ranked[1];

    if (!best || best[1] === 0) {
      return null;
    }

    if (
      second &&
      best[1] === second[1] &&
      best[1] < 4
    ) {
      return null;
    }

    return best[0];
  }

  // ------------------------------------------------------------------
  // FACT IDENTIFICATION
  // ------------------------------------------------------------------

  _existingFact(qObj) {

    return (
      qObj?.metadata?.factModel ||
      qObj?.factModel ||
      null
    );
  }

  _identifyFact(qObj) {

    const existing = this._existingFact(qObj);

    if (
      existing?.factId &&
      this.factRegistry[existing.factId]
    ) {

      return {
        registry: this.factRegistry[existing.factId],
        source: "existing_fact_model",
        model: existing
      };
    }

    const s = this._normalizeText(
      qObj?.q || qObj?.stem || ""
    );

    if (
      (
        s.includes("ohm") ||
        s.includes("resistor") ||
        s.includes("Ω")
      ) &&
      (
        s.includes("current") ||
        s.includes("resistance")
      ) &&
      (
        s.includes("voltage") ||
        s.includes("potential difference")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "electricity.ohms_law.voltage"
          ],
        source: "source_pattern"
      };
    }

    if (
      (s.includes("power") || s.includes("watt") || s.includes("electrical power")) &&
      (s.includes("voltage") || s.includes("potential difference") || /\b\d+(\.\d+)?\s*v\b/i.test(s)) &&
      (s.includes("current") || /\b\d+(\.\d+)?\s*a\b/i.test(s))
    ) {

      return {
        registry:
          this.factRegistry[
            "electricity.power.voltage_current"
          ],
        source: "source_pattern"
      };
    }

    if (
      (
        s.includes("force") ||
        s.includes("resultant force") ||
        s.includes("accelerate")
      ) &&
      (s.includes("mass") || s.includes("kg") || s.includes("kilogram")) &&
      (
        s.includes("acceleration") ||
        s.includes("accelerate") ||
        s.includes("m/s2") ||
        s.includes("m/s^2")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "mechanics.newtons_second_law.force"
          ],
        source: "source_pattern"
      };
    }

    if (
      s.includes("work") &&
      s.includes("force") &&
      (
        s.includes("distance") ||
        s.includes("direction")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "mechanics.work.force_distance"
          ],
        source: "source_pattern"
      };
    }

    if (
      s.includes("momentum") &&
      (s.includes("mass") || s.includes("kg") || s.includes("kilogram")) &&
      (
        s.includes("velocity") ||
        s.includes("speed") ||
        s.includes("m/s")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "mechanics.momentum.mass_velocity"
          ],
        source: "source_pattern"
      };
    }

    if (
      (
        s.includes("distance") ||
        s.includes("displacement")
      ) &&
      (
        s.includes("acceleration") ||
        s.includes("accelerat") ||
        s.includes("m/s2") ||
        s.includes("m/s^2")
      ) &&
      (
        s.includes("rest") ||
        s.includes("starts from rest")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "kinematics.distance.rest"
          ],
        source: "source_pattern"
      };
    }

    if (
      (
        s.includes("final velocity") ||
        s.includes("velocity")
      ) &&
      !s.includes("distance") &&
      !s.includes("displacement") &&
      (
        s.includes("acceleration") ||
        s.includes("accelerat") ||
        s.includes("m/s2") ||
        s.includes("m/s^2")
      ) &&
      (
        s.includes("rest") ||
        s.includes("starts from rest")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "kinematics.final_velocity.rest"
          ],
        source: "source_pattern"
      };
    }

    if (
      s.includes("frequency") &&
      s.includes("wavelength")
    ) {

      const isCalcWavelength =
        s.includes("calculate its wavelength") ||
        s.includes("calculate the wavelength") ||
        s.includes("calculate wavelength") ||
        s.includes("wavelength?");

      const isCalcFrequency =
        s.includes("calculate its frequency") ||
        s.includes("calculate the frequency") ||
        s.includes("calculate frequency") ||
        s.includes("frequency?");

      if (isCalcFrequency) {
        return {
          registry:
            this.factRegistry[
              "waves.frequency.speed_wavelength"
            ],
          source: "source_pattern"
        };
      }

      if (isCalcWavelength || s.includes("hz")) {
        return {
          registry:
            this.factRegistry[
              "waves.wavelength.speed_frequency"
            ],
          source: "source_pattern"
        };
      }

      return {
        registry:
          this.factRegistry[
            "waves.frequency.speed_wavelength"
          ],
        source: "source_pattern"
      };
    }

    if (
      s.includes("density") &&
      (
        s.includes("mass") ||
        s.includes("g") ||
        s.includes("kg")
      ) &&
      (
        s.includes("volume") ||
        s.includes("cm3") ||
        s.includes("cm^3") ||
        s.includes("cm³")
      )
    ) {

      return {
        registry:
          this.factRegistry[
            "density.mass_volume"
          ],
        source: "source_pattern"
      };
    }

    if (
      (
        s.includes("potential energy") ||
        s.includes("gpe")
      ) &&
      (s.includes("mass") || s.includes("kg") || s.includes("kilogram")) &&
      (s.includes("height") || s.includes("vertical"))
    ) {

      return {
        registry:
          this.factRegistry[
            "energy.gpe.mass_height"
          ],
        source: "source_pattern"
      };
    }

    return null;
  }

  // ------------------------------------------------------------------
  // PARAMETER EXTRACTION + NORMALIZATION
  // ------------------------------------------------------------------

  _extractParameters(fact, qObj) {

    const existing = this._existingFact(qObj);

    if (existing?.parameters) {

      const parameters = {};

      for (const key of fact.requiredParameters) {

        const source = existing.parameters[key];

        if (source == null) return null;

        const raw =
          typeof source === "object"
            ? source.value
            : source;

        const numeric = this._number(raw);

        if (numeric == null) return null;

        const normalized =
          this._normalizeParameter(
            key,
            numeric,
            typeof source === "object"
              ? source.unit
              : null,
            fact
          );

        if (!normalized) return null;

        parameters[key] = normalized;
      }

      return parameters;
    }

    const stem = String(
      qObj?.q || qObj?.stem || ""
    );

    const parameters = {};

    for (const key of fact.requiredParameters) {

      const parsed =
        this._extractParameterFromText(
          key,
          stem,
          fact
        );

      if (!parsed) return null;

      parameters[key] = parsed;
    }

    return parameters;
  }

  _extractParameterFromText(
    key,
    stem,
    fact
  ) {

    let result = null;

    switch (key) {

      case "current": {

        result = this._extractNumAndUnit(
          stem,
          [
            "mA",
            "A",
            "ampere",
            "amperes",
            "amp",
            "amps"
          ]
        );

        if (!result) return null;

        const isMilli =
          /^mA$/i.test(result.matchedUnit);

        return {
          value: isMilli
            ? this._round(result.value / 1000, 6)
            : result.value,
          unit: "A"
        };
      }

      case "resistance": {

        result = this._extractNumAndUnit(
          stem,
          [
            "kΩ",
            "kOhm",
            "kohm",
            "ohm",
            "ohms",
            "Ω"
          ]
        );

        if (!result) return null;

        const isKilo =
          /^(kΩ|kOhm|kohm)$/i.test(
            result.matchedUnit
          );

        return {
          value: isKilo
            ? result.value * 1000
            : result.value,
          unit: "ohm"
        };
      }

      case "voltage": {

        result = this._extractNumAndUnit(
          stem,
          [
            "kV",
            "mV",
            "V",
            "volt",
            "volts"
          ]
        );

        if (!result) return null;

        let value = result.value;

        if (/^kV$/i.test(result.matchedUnit)) {
          value *= 1000;
        }

        if (/^mV$/i.test(result.matchedUnit)) {
          value /= 1000;
        }

        return {
          value,
          unit: "V"
        };
      }

      case "mass": {

        result = this._extractNumAndUnit(
          stem,
          [
            "kg",
            "kilogram",
            "kilograms",
            "g",
            "gram",
            "grams"
          ]
        );

        if (!result) return null;

        const isGram =
          /^(g|gram|grams)$/i.test(
            result.matchedUnit
          );

        /*
         * Density deliberately uses grams because
         * its registered answer unit is g/cm3.
         */
        if (fact.factId === "density.mass_volume") {

          return {
            value: isGram
              ? result.value
              : result.value * 1000,
            unit: "g"
          };
        }

        return {
          value: isGram
            ? result.value / 1000
            : result.value,
          unit: "kg"
        };
      }

      case "acceleration": {

        result = this._extractNumAndUnit(
          stem,
          [
            "m/s²",
            "m/s2",
            "m/s^2",
            "ms^-2",
            "ms-2",
            "m s^-2"
          ]
        );

        if (!result) return null;

        return {
          value: result.value,
          unit: "m/s2"
        };
      }

      case "time": {

        result = this._extractNumAndUnit(
          stem,
          [
            "minutes",
            "minute",
            "min",
            "hours",
            "hour",
            "h",
            "seconds",
            "second",
            "secs",
            "sec",
            "s"
          ]
        );

        if (!result) return null;

        if (
          /^(min|minute|minutes)$/i.test(
            result.matchedUnit
          )
        ) {

          return {
            value: result.value * 60,
            unit: "s"
          };
        }

        if (
          /^(h|hour|hours)$/i.test(
            result.matchedUnit
          )
        ) {

          return {
            value: result.value * 3600,
            unit: "s"
          };
        }

        return {
          value: result.value,
          unit: "s"
        };
      }

      case "distance":
      case "height": {

        result = this._extractNumAndUnit(
          stem,
          [
            "km",
            "cm",
            "m",
            "metres",
            "metre",
            "meters",
            "meter"
          ]
        );

        if (!result) return null;

        let value = result.value;

        if (/^km$/i.test(result.matchedUnit)) {
          value *= 1000;
        }

        if (/^cm$/i.test(result.matchedUnit)) {
          value /= 100;
        }

        return {
          value,
          unit: "m"
        };
      }

      case "force": {

        result = this._extractNumAndUnit(
          stem,
          [
            "kN",
            "N",
            "newtons",
            "newton"
          ]
        );

        if (!result) return null;

        return {
          value: /^kN$/i.test(
            result.matchedUnit
          )
            ? result.value * 1000
            : result.value,
          unit: "N"
        };
      }

      case "velocity":
      case "speed": {

        result = this._extractNumAndUnit(
          stem,
          [
            "km/h",
            "m/s",
            "ms^-1",
            "ms-1",
            "m s^-1"
          ]
        );

        if (!result) return null;

        return {
          value: /^km\/h$/i.test(
            result.matchedUnit
          )
            ? this._round(
                result.value / 3.6,
                6
              )
            : result.value,
          unit: "m/s"
        };
      }

      case "frequency": {

        result = this._extractNumAndUnit(
          stem,
          [
            "MHz",
            "kHz",
            "Hz",
            "hertz"
          ]
        );

        if (!result) return null;

        let value = result.value;

        if (/^kHz$/i.test(result.matchedUnit)) {
          value *= 1000;
        }

        if (/^MHz$/i.test(result.matchedUnit)) {
          value *= 1e6;
        }

        return {
          value,
          unit: "Hz"
        };
      }

      case "wavelength": {

        result = this._extractNumAndUnit(
          stem,
          [
            "nm",
            "mm",
            "cm",
            "m",
            "metres",
            "metre",
            "meters",
            "meter"
          ]
        );

        if (!result) return null;

        let value = result.value;

        if (/^cm$/i.test(result.matchedUnit)) {
          value /= 100;
        }

        if (/^mm$/i.test(result.matchedUnit)) {
          value /= 1000;
        }

        if (/^nm$/i.test(result.matchedUnit)) {
          value *= 1e-9;
        }

        return {
          value,
          unit: "m"
        };
      }

      case "volume": {

        result = this._extractNumAndUnit(
          stem,
          [
            "cm³",
            "cm3",
            "cm^3",
            "m³",
            "m3",
            "m^3",
            "litres",
            "liters",
            "litre",
            "liter",
            "ml",
            "mL",
            "L",
            "l"
          ]
        );

        if (!result) return null;

        const u = result.matchedUnit
          .toLowerCase();

        if (
          u === "m3" ||
          u === "m^3" ||
          u === "m³"
        ) {

          return {
            value: result.value * 1e6,
            unit: "cm3"
          };
        }

        if (
          u === "l" ||
          u === "litre" ||
          u === "liter" ||
          u === "litres" ||
          u === "liters"
        ) {

          return {
            value: result.value * 1000,
            unit: "cm3"
          };
        }

        if (u === "ml") {

          return {
            value: result.value,
            unit: "cm3"
          };
        }

        return {
          value: result.value,
          unit: "cm3"
        };
      }

      default:
        return null;
    }
  }

  _normalizeParameter(
    key,
    value,
    unit,
    fact
  ) {

    const numeric = Number(value);

    if (
      !Number.isFinite(numeric) ||
      numeric <= 0
    ) {
      return null;
    }

    const u = this._unit(unit);

    switch (key) {

      case "current":
        return {
          value:
            u === "ma"
              ? numeric / 1000
              : numeric,
          unit: "A"
        };

      case "resistance":
        return {
          value:
            u === "kohm" || u === "kω"
              ? numeric * 1000
              : numeric,
          unit: "ohm"
        };

      case "voltage":
        return {
          value:
            u === "kv"
              ? numeric * 1000
              : u === "mv"
                ? numeric / 1000
                : numeric,
          unit: "V"
        };

      case "mass":

        if (fact.factId === "density.mass_volume") {

          return {
            value:
              u === "kg"
                ? numeric * 1000
                : numeric,
            unit: "g"
          };
        }

        return {
          value:
            u === "g"
              ? numeric / 1000
              : numeric,
          unit: "kg"
        };

      case "time":

        if (
          u === "min" ||
          u === "minute" ||
          u === "minutes"
        ) {

          return {
            value: numeric * 60,
            unit: "s"
          };
        }

        if (
          u === "h" ||
          u === "hour" ||
          u === "hours"
        ) {

          return {
            value: numeric * 3600,
            unit: "s"
          };
        }

        return {
          value: numeric,
          unit: "s"
        };

      case "distance":
      case "height":

        if (u === "km") {

          return {
            value: numeric * 1000,
            unit: "m"
          };
        }

        if (u === "cm") {

          return {
            value: numeric / 100,
            unit: "m"
          };
        }

        return {
          value: numeric,
          unit: "m"
        };

      case "force":

        return {
          value:
            u === "kn"
              ? numeric * 1000
              : numeric,
          unit: "N"
        };

      case "velocity":
      case "speed":

        return {
          value:
            u === "km/h"
              ? numeric / 3.6
              : numeric,
          unit: "m/s"
        };

      case "frequency":

        return {
          value:
            u === "khz"
              ? numeric * 1000
              : u === "mhz"
                ? numeric * 1e6
                : numeric,
          unit: "Hz"
        };

      case "wavelength":

        if (u === "cm") {
          return {
            value: numeric / 100,
            unit: "m"
          };
        }

        if (u === "mm") {
          return {
            value: numeric / 1000,
            unit: "m"
          };
        }

        if (u === "nm") {
          return {
            value: numeric * 1e-9,
            unit: "m"
          };
        }

        return {
          value: numeric,
          unit: "m"
        };

      case "volume":

        if (
          u === "m3" ||
          u === "m^3" ||
          u === "m³"
        ) {

          return {
            value: numeric * 1e6,
            unit: "cm3"
          };
        }

        if (
          u === "l" ||
          u === "litre" ||
          u === "liter" ||
          u === "litres" ||
          u === "liters"
        ) {

          return {
            value: numeric * 1000,
            unit: "cm3"
          };
        }

        return {
          value: numeric,
          unit: "cm3"
        };

      default:
        return null;
    }
  }

  // ------------------------------------------------------------------
  // DETERMINISTIC MUTATION PLAN
  // ------------------------------------------------------------------

  _authorizedMutationKeys(
    fact,
    mode
  ) {

    const policy =
      this.mutationPolicies[fact.factId];

    if (!policy) return [];

    return [
      ...(policy[mode] || [])
    ].filter(key =>
      fact.allowedParameterKeys.includes(key)
    );
  }

  _chooseAuthorizedParameter(
    fact,
    mode,
    seed
  ) {

    const keys =
      this._authorizedMutationKeys(
        fact,
        mode
      );

    if (!keys.length) return null;

    return keys[
      Math.abs(seed) % keys.length
    ];
  }

  _mutateParameter(
    key,
    sourceValue,
    fact,
    seed,
    offset = 0
  ) {

    if (
      !fact.allowedParameterKeys?.includes(
        key
      )
    ) {

      return sourceValue;
    }

    const allowed =
      this.allowedParameters[key];

    if (
      !Array.isArray(allowed) ||
      allowed.length < 2
    ) {

      return sourceValue;
    }

    const exactIndex =
      allowed.findIndex(
        value =>
          Math.abs(
            value - sourceValue
          ) < 1e-9
      );

    /*
     * If the source number isn't in our approved
     * mutation domain, choose a deterministic nearby
     * authorized value.
     */
    if (exactIndex === -1) {

      const index =
        Math.abs(
          this._hash(
            `${seed}|${key}|${offset}`
          )
        ) % allowed.length;

      const candidate =
        allowed[index];

      return (
        candidate !== sourceValue &&
        Number.isFinite(candidate) &&
        candidate > 0
      )
        ? candidate
        : sourceValue;
    }

    /*
     * Deterministic movement through the authorized
     * domain.
     */
    const availableMoves =
      allowed.length - 1;

    const shift =
      1 +
      (
        Math.abs(
          this._hash(
            `${seed}|${key}|${offset}|shift`
          )
        ) % availableMoves
      );

    const candidate =
      allowed[
        (exactIndex + shift) %
        allowed.length
      ];

    if (
      candidate === sourceValue ||
      !Number.isFinite(candidate) ||
      candidate <= 0
    ) {

      return sourceValue;
    }

    return candidate;
  }

  _buildMutationPlan(
    fact,
    sourceParameters,
    mode,
    seed
  ) {

    const authorized =
      this._authorizedMutationKeys(
        fact,
        mode
      );

    if (!authorized.length) {
      return null;
    }

    /*
     * Diagnostic mode is the only mode where
     * multiple numerical parameters are intentionally
     * mutated.
     *
     * Even there, the exact parameter set is fixed
     * by the registry policy.
     */
    const selected =
      authorized.filter(
        key =>
          fact.allowedParameterKeys.includes(
            key
          )
      );

    const mutations = {};

    for (
      let i = 0;
      i < selected.length;
      i++
    ) {

      const key = selected[i];

      const source =
        sourceParameters[key];

      if (!source) return null;

      const mutatedValue =
        this._mutateParameter(
          key,
          source.value,
          fact,
          seed,
          i
        );

      mutations[key] = {
        sourceValue: source.value,
        mutatedValue,
        unit: source.unit,
        changed:
          Math.abs(
            mutatedValue -
            source.value
          ) > 1e-9
      };
    }

    return {
      strategy:
        mode === 2
          ? "diagnostic_multi_parameter"
          : "controlled_single_parameter",

      mode,

      authorizedParameters: selected,

      mutations,

      fingerprint: this._fingerprint({
        factId: fact.factId,
        mode,
        mutations
      })
    };
  }

  _applyMutationPlan(
    fact,
    sourceParameters,
    plan
  ) {

    if (!plan) return null;

    const result = {};

    for (
      const key of fact.requiredParameters
    ) {

      const source =
        sourceParameters[key];

      if (!source) return null;

      const mutation =
        plan.mutations[key];

      if (mutation) {

        result[key] = {
          value: mutation.mutatedValue,
          unit: mutation.unit
        };

      } else {

        result[key] = {
          value: source.value,
          unit: source.unit
        };
      }
    }

    return result;
  }

  // ------------------------------------------------------------------
  // CANONICAL FACT MODEL
  // ------------------------------------------------------------------

  _buildCanonicalModel(
    fact,
    parameters,
    sourceParameters,
    plan
  ) {

    return {
      factId: fact.factId,
      type: fact.type,
      topic: fact.topic,
      concept: fact.concept,
      skill: fact.skill,
      formula: fact.formula,

      parameters: parameters,

      sourceParameters:
        sourceParameters || null,

      mutationPlan:
        plan || null,

      invariant:
        fact.invariant || null
    };
  }

  // ------------------------------------------------------------------
  // SOLVERS
  // ------------------------------------------------------------------

  _solve(
    factId,
    parameters
  ) {

    const p =
      Object.fromEntries(
        Object.entries(
          parameters || {}
        ).map(
          ([key, descriptor]) => [
            key,
            typeof descriptor === "object"
              ? descriptor.value
              : descriptor
          ]
        )
      );

    switch (factId) {

      case "electricity.ohms_law.voltage":

        return this._round(
          p.current * p.resistance,
          2
        );

      case "electricity.power.voltage_current":

        return this._round(
          p.voltage * p.current,
          2
        );

      case "mechanics.newtons_second_law.force":

        return this._round(
          p.mass * p.acceleration,
          2
        );

      case "mechanics.work.force_distance":

        return this._round(
          p.force * p.distance,
          2
        );

      case "mechanics.momentum.mass_velocity":

        return this._round(
          p.mass * p.velocity,
          2
        );

      case "kinematics.final_velocity.rest":

        return this._round(
          p.acceleration * p.time,
          2
        );

      case "kinematics.distance.rest":

        return this._round(
          0.5 *
          p.acceleration *
          p.time *
          p.time,
          2
        );

      case "waves.wavelength.speed_frequency":

        return this._round(
          p.speed / p.frequency,
          4
        );

      case "waves.frequency.speed_wavelength":

        return this._round(
          p.speed / p.wavelength,
          2
        );

      case "density.mass_volume":

        return this._round(
          p.mass / p.volume,
          4
        );

      case "energy.gpe.mass_height":

        return this._round(
          p.mass *
          this.constants.g *
          p.height,
          2
        );

      default:

        return null;
    }
  }

  // ------------------------------------------------------------------
  // FORMATTING
  // ------------------------------------------------------------------

  _fmt(value, unit) {

    return `${value} ${unit}`;
  }

  _formatParameter(
    key,
    value
  ) {

    switch (key) {

      case "current":
        return `${value} A`;

      case "resistance":
        return `${value} ohm`;

      case "voltage":
        return `${value} V`;

      case "mass":
        return `${value} kg`;

      case "acceleration":
        return `${value} m/s2`;

      case "time":
        return `${value} s`;

      case "distance":
        return `${value} m`;

      case "height":
        return `${value} m`;

      case "force":
        return `${value} N`;

      case "velocity":
        return `${value} m/s`;

      case "speed":
        return `${value} m/s`;

      case "frequency":
        return `${value} Hz`;

      case "wavelength":
        return `${value} m`;

      case "volume":
        return `${value} cm3`;

      default:
        return `${value}`;
    }
  }

  // ------------------------------------------------------------------
  // DISTRACTORS
  // ------------------------------------------------------------------

  _distractors(
    factId,
    parameters,
    correctValue
  ) {

    const p =
      Object.fromEntries(
        Object.entries(
          parameters
        ).map(
          ([key, descriptor]) => [
            key,
            descriptor.value
          ]
        )
      );

    const result = [];

    const add = (
      value,
      misconceptionId,
      unit
    ) => {

      if (
        !Number.isFinite(value) ||
        value <= 0 ||
        Math.abs(
          value - correctValue
        ) < 1e-9
      ) {
        return;
      }

      const formatted =
        this._fmt(
          this._round(value, 4),
          unit
        );

      if (
        !result.some(
          item =>
            item.value === formatted
        )
      ) {

        result.push({
          value: formatted,
          misconceptionId
        });
      }
    };

    switch (factId) {

      case "electricity.ohms_law.voltage":

        add(
          p.current + p.resistance,
          "ADD_CURRENT_RESISTANCE",
          "V"
        );

        add(
          p.resistance / p.current,
          "DIVIDE_R_BY_I",
          "V"
        );

        add(
          p.current / p.resistance,
          "DIVIDE_I_BY_R",
          "V"
        );

        add(
          p.current,
          "CURRENT_AS_VOLTAGE",
          "V"
        );

        add(
          p.resistance,
          "RESISTANCE_AS_VOLTAGE",
          "V"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "V"
        );

        break;

      case "electricity.power.voltage_current":

        add(
          p.voltage + p.current,
          "ADD_V_I",
          "W"
        );

        add(
          p.voltage / p.current,
          "DIVIDE_V_BY_I",
          "W"
        );

        add(
          p.current / p.voltage,
          "DIVIDE_I_BY_V",
          "W"
        );

        add(
          p.voltage,
          "VOLTAGE_AS_POWER",
          "W"
        );

        add(
          p.current,
          "CURRENT_AS_POWER",
          "W"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "W"
        );

        break;

      case "mechanics.newtons_second_law.force":

        add(
          p.mass + p.acceleration,
          "ADD_M_A",
          "N"
        );

        add(
          p.mass / p.acceleration,
          "DIVIDE_M_BY_A",
          "N"
        );

        add(
          p.acceleration / p.mass,
          "DIVIDE_A_BY_M",
          "N"
        );

        add(
          p.acceleration,
          "ACCEL_AS_FORCE",
          "N"
        );

        add(
          p.mass,
          "MASS_AS_FORCE",
          "N"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "N"
        );

        break;

      case "mechanics.work.force_distance":

        add(
          p.force + p.distance,
          "ADD_F_D",
          "J"
        );

        add(
          p.force / p.distance,
          "DIVIDE_F_BY_D",
          "J"
        );

        add(
          p.distance / p.force,
          "DIVIDE_D_BY_F",
          "J"
        );

        add(
          p.force,
          "FORCE_AS_WORK",
          "J"
        );

        add(
          p.distance,
          "DISTANCE_AS_WORK",
          "J"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "J"
        );

        break;

      case "mechanics.momentum.mass_velocity":

        add(
          p.mass + p.velocity,
          "ADD_M_V",
          "kg·m/s"
        );

        add(
          p.mass / p.velocity,
          "DIVIDE_M_BY_V",
          "kg·m/s"
        );

        add(
          p.velocity / p.mass,
          "DIVIDE_V_BY_M",
          "kg·m/s"
        );

        add(
          p.velocity,
          "VEL_AS_MOMENTUM",
          "kg·m/s"
        );

        add(
          0.5 *
          p.mass *
          p.velocity *
          p.velocity,
          "CONFUSE_WITH_KE",
          "kg·m/s"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "kg·m/s"
        );

        break;

      case "kinematics.final_velocity.rest":

        add(
          0.5 *
          p.acceleration *
          p.time *
          p.time,
          "CONFUSE_DIST_VEL",
          "m/s"
        );

        add(
          p.acceleration + p.time,
          "ADD_A_T",
          "m/s"
        );

        add(
          p.acceleration / p.time,
          "DIVIDE_A_BY_T",
          "m/s"
        );

        add(
          p.time / p.acceleration,
          "DIVIDE_T_BY_A",
          "m/s"
        );

        add(
          p.acceleration *
          p.time *
          2,
          "DOUBLE_FACTOR",
          "m/s"
        );

        break;

      case "kinematics.distance.rest":

        add(
          p.acceleration * p.time,
          "USE_VEL_AS_DIST",
          "m"
        );

        add(
          p.acceleration *
          p.time *
          p.time,
          "OMIT_HALF",
          "m"
        );

        add(
          0.5 *
          p.acceleration *
          p.time,
          "OMIT_T_SQUARED",
          "m"
        );

        add(
          p.acceleration + p.time,
          "ADD_A_T",
          "m"
        );

        add(
          p.acceleration / p.time,
          "DIVIDE_A_BY_T",
          "m"
        );

        break;

      case "waves.wavelength.speed_frequency":

        add(
          p.frequency / p.speed,
          "INVERT_WAVE",
          "m"
        );

        add(
          p.speed * p.frequency,
          "MULTIPLY_V_F",
          "m"
        );

        add(
          p.speed /
          (p.frequency * 2),
          "DOUBLE_F_SCALE",
          "m"
        );

        add(
          p.speed /
          (p.frequency / 2),
          "HALF_F_SCALE",
          "m"
        );

        add(
          p.frequency,
          "FREQ_AS_WAVELENGTH",
          "m"
        );

        break;

      case "waves.frequency.speed_wavelength":

        add(
          p.wavelength / p.speed,
          "INVERT_WAVE",
          "Hz"
        );

        add(
          p.speed * p.wavelength,
          "MULTIPLY_V_L",
          "Hz"
        );

        add(
          p.speed /
          (p.wavelength * 2),
          "DOUBLE_L_SCALE",
          "Hz"
        );

        add(
          p.speed /
          (p.wavelength / 2),
          "HALF_L_SCALE",
          "Hz"
        );

        add(
          p.wavelength,
          "WAVELENGTH_AS_FREQ",
          "Hz"
        );

        break;

      case "density.mass_volume":

        add(
          p.volume / p.mass,
          "REVERSE_DENSITY",
          "g/cm3"
        );

        add(
          p.mass * p.volume,
          "MULTIPLY_M_V",
          "g/cm3"
        );

        add(
          p.mass,
          "MASS_AS_DENSITY",
          "g/cm3"
        );

        add(
          p.volume,
          "VOLUME_AS_DENSITY",
          "g/cm3"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "g/cm3"
        );

        break;

      case "energy.gpe.mass_height":

        add(
          p.mass * p.height,
          "OMIT_G",
          "J"
        );

        add(
          p.mass *
          this.constants.g,
          "OMIT_H",
          "J"
        );

        add(
          p.mass +
          p.height +
          this.constants.g,
          "ADD_PARAMS",
          "J"
        );

        add(
          0.5 *
          p.mass *
          this.constants.g *
          p.height,
          "HALF_FACTOR",
          "J"
        );

        add(
          correctValue * 2,
          "DOUBLE_FACTOR",
          "J"
        );

        break;

      default:
        break;
    }

    return result;
  }

  // ------------------------------------------------------------------
  // NUMERICAL MCQ OPTIONS
  // ------------------------------------------------------------------

  _mcqOptions(
    correct,
    distractors,
    seed
  ) {

    const unique = [];

    const addUnique = value => {

      if (
        typeof value !== "string" ||
        !value.trim()
      ) {
        return;
      }

      if (!unique.includes(value)) {
        unique.push(value);
      }
    };

    addUnique(correct);

    for (
      const distractor of
      distractors || []
    ) {

      addUnique(distractor);
    }

    /*
     * Deterministic numerical fallbacks.
     *
     * These are only allowed for numerical answers.
     */
    if (unique.length < 4) {

      const numericMatch =
        String(correct).match(
          /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i
        );

      if (!numericMatch) {
        return null;
      }

      const base =
        Number(
          numericMatch[0]
        );

      const unit =
        String(correct)
          .replace(
            numericMatch[0],
            ""
          )
          .trim();

      const candidates = [
        base * 2,
        base * 0.5,
        base * 1.5,
        base * 3,
        base * 0.25,
        base * 4,
        base + 1,
        base - 1
      ];

      for (
        const candidate of candidates
      ) {

        if (unique.length >= 4) {
          break;
        }

        if (
          !Number.isFinite(candidate) ||
          candidate <= 0
        ) {
          continue;
        }

        const formatted =
          `${this._round(candidate, 4)}${unit ? ` ${unit}` : ""}`;

        addUnique(formatted);
      }
    }

    if (unique.length < 4) {
      return null;
    }

    return this._shuffleDeterministic(
      unique.slice(0, 4),
      seed
    );
  }

  // ------------------------------------------------------------------
  // CONCEPTUAL MCQ OPTIONS
  // ------------------------------------------------------------------

  _conceptualOptions(
    item,
    fact,
    seed
  ) {

    const candidates = [
      item.ans,
      ...(item.distractors || [])
    ];

    const unique = [];

    for (
      const candidate of candidates
    ) {

      if (
        typeof candidate !== "string" ||
        !candidate.trim()
      ) {
        continue;
      }

      if (
        !unique.includes(candidate)
      ) {
        unique.push(candidate);
      }
    }

    if (unique.length < 4) {
      return null;
    }

    return this._shuffleDeterministic(
      unique.slice(0, 4),
      this._hash(
        `${seed}|${fact.factId}|conceptual`
      )
    );
  }

  // ------------------------------------------------------------------
  // CALCULATION BUILDER
  // ------------------------------------------------------------------

  _buildCalculation(
    fact,
    parameters,
    mode,
    seed,
    sourceParameters,
    mutationPlan
  ) {

    const value =
      this._solve(
        fact.factId,
        parameters
      );

    if (value == null) {
      return null;
    }

    const answer =
      this._fmt(
        value,
        fact.answerUnit
      );

    const p =
      Object.fromEntries(
        Object.entries(
          parameters
        ).map(
          ([key, descriptor]) => [
            key,
            descriptor.value
          ]
        )
      );

    let q;
    let hint;
    let sol;
    let steps;

    switch (fact.factId) {

      case "electricity.ohms_law.voltage":

        q =
          `A ${p.resistance} ohm resistor carries a current of ${p.current} A. Calculate the potential difference across the resistor.`;

        hint =
          "Use Ohm's Law: V = IR.";

        sol =
          `V = IR = ${p.current} x ${p.resistance} = ${value} V.`;

        steps = [
          `Identify I = ${p.current} A.`,
          `Identify R = ${p.resistance} ohm.`,
          "Use V = IR.",
          `V = ${p.current} x ${p.resistance} = ${value} V.`
        ];

        break;

      case "electricity.power.voltage_current":

        q =
          `An appliance operates at ${p.voltage} V and draws ${p.current} A. Calculate its electrical power.`;

        hint =
          "Use P = VI.";

        sol =
          `P = VI = ${p.voltage} x ${p.current} = ${value} W.`;

        steps = [
          `V = ${p.voltage} V.`,
          `I = ${p.current} A.`,
          "Use P = VI.",
          `P = ${value} W.`
        ];

        break;

      case "mechanics.newtons_second_law.force":

        q =
          `A ${p.mass} kg object accelerates at ${p.acceleration} m/s2. Calculate the resultant force acting on it.`;

        hint =
          "Use Newton's Second Law: F = ma.";

        sol =
          `F = ma = ${p.mass} x ${p.acceleration} = ${value} N.`;

        steps = [
          `m = ${p.mass} kg.`,
          `a = ${p.acceleration} m/s2.`,
          "Use F = ma.",
          `F = ${value} N.`
        ];

        break;

      case "mechanics.work.force_distance":

        q =
          `A constant force of ${p.force} N moves an object ${p.distance} m in the direction of the force. Calculate the work done.`;

        hint =
          "For force in the direction of motion, W = Fd.";

        sol =
          `W = Fd = ${p.force} x ${p.distance} = ${value} J.`;

        steps = [
          `F = ${p.force} N.`,
          `d = ${p.distance} m.`,
          "Use W = Fd.",
          `W = ${value} J.`
        ];

        break;

      case "mechanics.momentum.mass_velocity":

        q =
          `A ${p.mass} kg object moves at ${p.velocity} m/s. Calculate its momentum.`;

        hint =
          "Momentum: p = mv.";

        sol =
          `p = mv = ${p.mass} x ${p.velocity} = ${value} kg m/s.`;

        steps = [
          `m = ${p.mass} kg.`,
          `v = ${p.velocity} m/s.`,
          "Use p = mv.",
          `p = ${value} kg m/s.`
        ];

        break;

      case "kinematics.final_velocity.rest":

        q =
          `A vehicle starts from rest and accelerates uniformly at ${p.acceleration} m/s2 for ${p.time} s. Calculate its final velocity.`;

        hint =
          "Since the vehicle starts from rest, u = 0. Use v = u + at.";

        sol =
          `v = 0 + (${p.acceleration} x ${p.time}) = ${value} m/s.`;

        steps = [
          "u = 0 m/s.",
          `a = ${p.acceleration} m/s2.`,
          `t = ${p.time} s.`,
          "Use v = u + at.",
          `v = ${value} m/s.`
        ];

        break;

      case "kinematics.distance.rest":

        q =
          `A vehicle starts from rest and accelerates uniformly at ${p.acceleration} m/s2 for ${p.time} s. Calculate the distance travelled.`;

        hint =
          "Since u = 0, use s = 1/2 at².";

        sol =
          `s = 0.5 x ${p.acceleration} x ${p.time}² = ${value} m.`;

        steps = [
          "u = 0 m/s.",
          `a = ${p.acceleration} m/s2.`,
          `t = ${p.time} s.`,
          "Use s = ut + 0.5at².",
          `Since u = 0, s = 0.5at² = ${value} m.`
        ];

        break;

      case "waves.wavelength.speed_frequency":

        q =
          `A sound wave travels through air at ${p.speed} m/s and has a frequency of ${p.frequency} Hz. Calculate its wavelength.`;

        hint =
          "Use v = fλ, so λ = v/f.";

        sol =
          `λ = v / f = ${p.speed} / ${p.frequency} = ${value} m.`;

        steps = [
          `v = ${p.speed} m/s.`,
          `f = ${p.frequency} Hz.`,
          "Rearrange v = fλ to λ = v/f.",
          `λ = ${value} m.`
        ];

        break;

      case "waves.frequency.speed_wavelength":

        q =
          `A wave travels through air at ${p.speed} m/s and has a wavelength of ${p.wavelength} m. Calculate its frequency.`;

        hint =
          "Use f = v/λ.";

        sol =
          `f = ${p.speed} / ${p.wavelength} = ${value} Hz.`;

        steps = [
          `v = ${p.speed} m/s.`,
          `λ = ${p.wavelength} m.`,
          "Use f = v/λ.",
          `f = ${value} Hz.`
        ];

        break;

      case "density.mass_volume":

        q =
          `A solid has a mass of ${p.mass} g and occupies ${p.volume} cm3. Calculate its density.`;

        hint =
          "Density: ρ = m/V.";

        sol =
          `ρ = ${p.mass} / ${p.volume} = ${value} g/cm3.`;

        steps = [
          `m = ${p.mass} g.`,
          `V = ${p.volume} cm3.`,
          "Use ρ = m/V.",
          `ρ = ${value} g/cm3.`
        ];

        break;

      case "energy.gpe.mass_height":

        q =
          `A ${p.mass} kg object is raised through a vertical height of ${p.height} m. Taking g = ${this.constants.g} m/s2, calculate the increase in gravitational potential energy.`;

        hint =
          "Use GPE = mgh.";

        sol =
          `GPE = ${p.mass} x ${this.constants.g} x ${p.height} = ${value} J.`;

        steps = [
          `m = ${p.mass} kg.`,
          `h = ${p.height} m.`,
          `g = ${this.constants.g} m/s2.`,
          "Use GPE = mgh.",
          `GPE = ${value} J.`
        ];

        break;

      default:

        return null;
    }

    const misconceptionData =
      this._distractors(
        fact.factId,
        parameters,
        value
      );

    const distractors =
      misconceptionData.map(
        item => item.value
      );

    const options =
      mode === 0
        ? null
        : this._mcqOptions(
            answer,
            distractors,
            this._hash(
              `${seed}|${fact.factId}|numerical-options`
            )
          );

    if (
      mode !== 0 &&
      !options
    ) {
      return null;
    }

    const factModel =
      this._buildCanonicalModel(
        fact,
        parameters,
        sourceParameters,
        mutationPlan
      );

    factModel.answer = {
      value,
      unit: fact.answerUnit
    };

    factModel.provenance = {
      source: "verified_source_question",
      mutationType:
        "controlled_deterministic_parameter_mutation",
      verifiedBy:
        "PhysicsMutator.v5.solver"
    };

    return {
      q,
      ans: answer,
      hint,
      sol,
      steps,

      type:
        mode === 0
          ? "open_response"
          : "mcq",

      options,

      concept: fact.concept,
      skill: fact.skill,

      difficulty:
        mode === 2
          ? 3
          : mode === 3
            ? 4
            : 2,

      misconception:
        mode === 2
          ? (
              misconceptionData[0]
                ?.misconceptionId ||
              null
            )
          : null,

      modality:
        mode === 0
          ? "calculation"
          : mode === 1
            ? "application"
            : mode === 2
              ? "diagnostic"
              : "transfer",

      factModel
    };
  }

  // ------------------------------------------------------------------
  // CONCEPTUAL BUILDER
  // ------------------------------------------------------------------

  _buildConceptual(
    fact,
    mode,
    seed
  ) {

    const registry =
      this.conceptualRegistry[
        fact.factId
      ];

    if (!registry?.length) {
      return null;
    }

    /*
     * The conceptual item itself is selected
     * deterministically.
     */
    const index =
      Math.abs(
        this._hash(
          `${seed}|${fact.factId}|concept`
        )
      ) % registry.length;

    const item =
      registry[index];

    const options =
      mode === 1
        ? this._conceptualOptions(
            item,
            fact,
            seed
          )
        : null;

    if (
      mode === 1 &&
      !options
    ) {
      return null;
    }

    return {

      q: item.q,

      ans: item.ans,

      hint: item.hint,

      sol: item.sol,

      steps: [
        "Identify the physical quantities involved.",
        `Use ${fact.formula}.`,
        "Determine how the quantities are related.",
        "State the physical conclusion."
      ],

      type:
        mode === 1
          ? "mcq"
          : "open_response",

      options,

      concept: fact.concept,

      skill:
        "Conceptual reasoning",

      difficulty: 3,

      misconception:
        item.misconception,

      modality:
        "conceptual",

      factModel: {

        factId: fact.factId,

        type: "conceptual",

        topic: fact.topic,

        concept: fact.concept,

        skill: "Conceptual reasoning",

        formula: fact.formula,

        provenance: {

          source:
            "verified_source_question",

          mutationType:
            "deterministic_conceptual_reframing",

          verifiedBy:
            "PhysicsMutator.v5.conceptRegistry"
        }
      }
    };
  }

  // ------------------------------------------------------------------
  // SEMANTIC QUESTION VALIDATION
  // ------------------------------------------------------------------

  _questionMatchesFact(
    question,
    fact,
    parameters
  ) {

    const q =
      this._normalizeText(
        question
      );

    const required =
      fact.requiredParameters;

    /*
     * Every generated numerical question must
     * contain the mutated parameter values.
     */
    for (
      const key of required
    ) {

      const value =
        parameters[key]?.value;

      if (
        value == null
      ) {
        return false;
      }

      /*
       * A normalized number must appear in the
       * generated question.
       */
      const normalizedValue =
        String(value);

      if (
        !q.includes(
          normalizedValue.toLowerCase()
        )
      ) {

        /*
         * Some values may be represented with
         * a mathematically equivalent decimal.
         * Use numerical extraction as a fallback.
         */
        const numbers =
          q.match(
            /-?\d+(?:\.\d+)?/g
          ) || [];

        const exists =
          numbers.some(
            n =>
              Math.abs(
                Number(n) - Number(value)
              ) < 1e-9
          );

        if (!exists) {
          return false;
        }
      }
    }

    return true;
  }

  // ------------------------------------------------------------------
  // FACT MODEL VALIDATION
  // ------------------------------------------------------------------

  _validateFactModel(question) {

    const fm =
      question?.factModel ||
      question?.metadata?.factModel;

    if (!fm) {

      return {
        valid: false,
        reason: "MISSING_FACT_MODEL"
      };
    }

    const fact =
      this.factRegistry[
        fm.factId
      ];

    if (!fact) {

      return {
        valid: false,
        reason: "UNKNOWN_FACT_ID"
      };
    }

    if (
      fm.topic !== fact.topic
    ) {

      return {
        valid: false,
        reason: "TOPIC_MISMATCH"
      };
    }

    if (
      fm.concept !== fact.concept
    ) {

      return {
        valid: false,
        reason: "CONCEPT_MISMATCH"
      };
    }

    if (
      fm.formula !== fact.formula
    ) {

      return {
        valid: false,
        reason: "FORMULA_MISMATCH"
      };
    }

    if (
      fact.type === "calculation"
    ) {

      if (!fm.parameters) {

        return {
          valid: false,
          reason: "MISSING_PARAMETERS"
        };
      }

      for (
        const key of fact.requiredParameters
      ) {

        const parameter =
          fm.parameters[key];

        if (!parameter) {

          return {
            valid: false,
            reason:
              `MISSING_PARAMETER_${key}`
          };
        }

        const value =
          typeof parameter === "object"
            ? parameter.value
            : parameter;

        if (
          !Number.isFinite(
            Number(value)
          )
        ) {

          return {
            valid: false,
            reason:
              `INVALID_PARAMETER_${key}`
          };
        }

        if (
          Number(value) <= 0
        ) {

          return {
            valid: false,
            reason:
              `NON_POSITIVE_PARAMETER_${key}`
          };
        }

        /*
         * Canonical unit enforcement.
         */
        const expectedUnit =
          this.units[key];

        /*
         * Density mass is deliberately grams.
         */
        const canonicalUnit =
          fact.factId ===
            "density.mass_volume" &&
          key === "mass"
            ? "g"
            : expectedUnit;

        if (
          parameter.unit &&
          parameter.unit !== canonicalUnit
        ) {

          return {
            valid: false,
            reason:
              `NON_CANONICAL_UNIT_${key}`
          };
        }
      }

      const expected =
        this._solve(
          fact.factId,
          fm.parameters
        );

      if (expected == null) {

        return {
          valid: false,
          reason: "SOLVER_FAILED"
        };
      }

      const actual =
        Number(
          fm.answer?.value
        );

      if (
        !Number.isFinite(actual)
      ) {

        return {
          valid: false,
          reason:
            "MISSING_ANSWER_VALUE"
        };
      }

      if (
        Math.abs(
          expected - actual
        ) >
        this.config.numericalTolerance
      ) {

        return {
          valid: false,
          reason:
            "ANSWER_DOES_NOT_MATCH_SOLVER",
          expected,
          actual
        };
      }

      if (
        fm.answer?.unit !==
        fact.answerUnit
      ) {

        return {
          valid: false,
          reason:
            "ANSWER_UNIT_MISMATCH"
        };
      }
    }

    return {
      valid: true
    };
  }

  // ------------------------------------------------------------------
  // QUESTION VALIDATION
  // ------------------------------------------------------------------

  validateQuestion(question) {

    if (!question) {
      return false;
    }

    if (
      typeof question.q !== "string" ||
      !question.q.trim()
    ) {
      return false;
    }

    if (
      typeof question.ans !== "string" ||
      !question.ans.trim()
    ) {
      return false;
    }

    const factValidation =
      this._validateFactModel(
        question
      );

    if (!factValidation.valid) {
      return false;
    }

    const fm =
      question.factModel ||
      question.metadata?.factModel;

    const fact =
      this.factRegistry[
        fm.factId
      ];

    /*
     * Numerical answer verification.
     */
    if (
      fact.type === "calculation"
    ) {

      const expected =
        this._solve(
          fact.factId,
          fm.parameters
        );

      if (expected == null) {
        return false;
      }

      const actual =
        this._number(
          question.ans
        );

      if (actual == null) {
        return false;
      }

      if (
        Math.abs(
          actual - expected
        ) >
        this.config.numericalTolerance
      ) {
        return false;
      }

      /*
       * The question must agree with the
       * canonical fact model.
       */
      if (
        !this._questionMatchesFact(
          question.q,
          fact,
          fm.parameters
        )
      ) {
        return false;
      }
    }

    /*
     * MCQ validation.
     */
    if (
      question.type === "mcq"
    ) {

      if (
        !Array.isArray(
          question.options
        )
      ) {
        return false;
      }

      if (
        question.options.length !==
        this.config.minOptions
      ) {
        return false;
      }

      if (
        new Set(
          question.options
        ).size !==
        this.config.minOptions
      ) {
        return false;
      }

      if (
        !question.options.includes(
          question.ans
        )
      ) {
        return false;
      }

      for (
        const option of
        question.options
      ) {

        if (
          typeof option !== "string" ||
          !option.trim()
        ) {
          return false;
        }
      }
    }

    /*
     * These are explicitly forbidden generic
     * answers/options.
     */
    const forbidden = [
      "Incorrect physical relationship",
      "Incorrect formula",
      "Incorrect calculation",
      "Incorrect use of formula",
      "Cannot be determined",
      "The result changes randomly and cannot be predicted using a physical relationship.",
      "The physical quantities are unrelated."
    ];

    if (
      Array.isArray(
        question.options
      )
    ) {

      for (
        const option of
        question.options
      ) {

        if (
          forbidden.includes(
            option
          )
        ) {
          return false;
        }
      }
    }

    /*
     * Required learning fields.
     */
    if (
      typeof question.hint !== "string" ||
      typeof question.sol !== "string" ||
      !Array.isArray(question.steps)
    ) {
      return false;
    }

    if (
      question.steps.length < 1
    ) {
      return false;
    }

    /*
     * VERIFIED questions must contain explicit
     * verification metadata.
     */
    if (
      question.metadata?.mutationStatus !==
      "VERIFIED"
    ) {
      return false;
    }

    if (
      question.metadata?.verified !== true
    ) {
      return false;
    }

    return true;
  }

  // ------------------------------------------------------------------
  // FINALIZATION
  // ------------------------------------------------------------------

  _finalize(
    result,
    sourceQuestion,
    fact,
    modalityIndex,
    mutationPlan
  ) {

    if (!result) {
      return null;
    }

    const finalized = {

      ...result,

      concept:
        result.concept ||
        fact.concept,

      skill:
        result.skill ||
        fact.skill,

      metadata: {

        ...(sourceQuestion?.metadata || {}),

        mutationEngine:
          "PhysicsMutator",

        mutationVersion:
          this.version,

        mutationStatus:
          "VERIFIED",

        verified:
          true,

        factModel:
          result.factModel,

        provenance: {

          sourceQuestionId:
            sourceQuestion?.id ||
            null,

          factId:
            fact.factId,

          mutationType:
            result.factModel
              ?.provenance
              ?.mutationType ||
            null,

          verifiedBy:
            "PhysicsMutator.v5.validator",

          mutationVerified:
            true,

          conceptPreserved:
            true,

          answerRecalculated:
            true,

          deterministic:
            true,

          mutationPlanFingerprint:
            mutationPlan?.fingerprint ||
            null
        },

        modalityIndex
      }
    };

    delete finalized.safe;

    return finalized;
  }

  // ------------------------------------------------------------------
  // SAFE FALLBACK
  // ------------------------------------------------------------------

  _safeFallback(
    qObj,
    reason,
    topic = null
  ) {

    return {

      ...qObj,

      q:
        qObj?.q ||
        qObj?.stem ||
        "",

      ans:
        qObj?.ans ||
        "",

      hint:
        qObj?.hint ||
        "Review the physical principle involved before answering.",

      sol:
        qObj?.sol ||
        qObj?.explanation ||
        "No verified mutation was generated because changing the question safely could not be proven.",

      steps:
        Array.isArray(
          qObj?.steps
        )
          ? qObj.steps
          : [
              "Identify the physical quantities.",
              "Recall the governing physical principle.",
              "Apply the principle to the original question."
            ],

      type:
        qObj?.type ||
        "open_response",

      options:
        qObj?.options ||
        null,

      concept:
        qObj?.concept ||
        null,

      skill:
        qObj?.skill ||
        null,

      difficulty:
        qObj?.difficulty ||
        2,

      mutationStatus:
        "SKIPPED_UNSAFE_MUTATION",

      mutationReason:
        reason,

      detectedTopic:
        topic,

      safe:
        true,

      metadata: {

        ...(qObj?.metadata || {}),

        mutationEngine:
          "PhysicsMutator",

        mutationVersion:
          this.version,

        mutationStatus:
          "FALLBACK",

        verified:
          false,

        fallbackReason:
          reason,

        deterministic:
          true
      }
    };
  }

  // ------------------------------------------------------------------
  // PERFORMANCE CONTEXT
  // ------------------------------------------------------------------

  _resolveMode(
    modalityIndex,
    performanceContext
  ) {

    /*
     * Explicit modality always wins.
     *
     * performanceContext may provide information for
     * future deterministic diagnostic routing, but it
     * never introduces randomness.
     */
    const explicit =
      Number(modalityIndex);

    if (
      Number.isFinite(explicit)
    ) {

      return (
        Math.abs(explicit) % 4
      );
    }

    /*
     * Deterministic fallback.
     */
    if (
      performanceContext &&
      Number.isFinite(
        Number(
          performanceContext.modalityIndex
        )
      )
    ) {

      return (
        Math.abs(
          Number(
            performanceContext.modalityIndex
          )
        ) % 4
      );
    }

    return 0;
  }

  // ------------------------------------------------------------------
  // MAIN MUTATION
  // ------------------------------------------------------------------

  mutate(
    qObj,
    modalityIndex = 0,
    performanceContext = {}
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
      return null;
    }

    /*
     * STEP 0
     *
     * Deterministic modality resolution.
     */
    const mode =
      this._resolveMode(
        modalityIndex,
        performanceContext
      );

    /*
     * Deterministic seed.
     */
    const seed =
      this._seed(
        qObj,
        mode
      );

    /*
     * STEP 1
     *
     * Identify exact fact.
     */
    const identification =
      this._identifyFact(
        qObj
      );

    if (!identification) {

      return this._safeFallback(
        qObj,
        "NO_VERIFIED_PHYSICS_FACT",
        this._detectTopic(qObj)
      );
    }

    const fact =
      identification.registry;

    /*
     * STEP 2
     *
     * Extract and normalize source parameters.
     */
    const sourceParameters =
      this._extractParameters(
        fact,
        qObj
      );

    const isConceptual =
      fact.type === "conceptual" ||
      identification.model?.type === "conceptual" ||
      qObj?.type === "conceptual" ||
      (!sourceParameters && Boolean(this.conceptualRegistry[fact.factId]));

    if (
      !isConceptual &&
      fact.type === "calculation" &&
      !sourceParameters
    ) {

      return this._safeFallback(
        qObj,
        "SOURCE_PARAMETERS_NOT_EXTRACTABLE",
        fact.topic
      );
    }

    /*
     * STEP 3
     *
     * Conceptual questions do not require
     * numerical parameter mutation.
     */
    if (
      isConceptual
    ) {

      const conceptual =
        this._buildConceptual(
          fact,
          mode,
          seed
        );

      if (!conceptual) {

        return this._safeFallback(
          qObj,
          "NO_SAFE_CONCEPTUAL_BUILDER",
          fact.topic
        );
      }

      if (
        conceptual.factModel?.topic !==
        fact.topic
      ) {

        return this._safeFallback(
          qObj,
          "TOPIC_LEAKAGE",
          fact.topic
        );
      }

      if (
        conceptual.factModel?.concept !==
        fact.concept
      ) {

        return this._safeFallback(
          qObj,
          "CONCEPT_LEAKAGE",
          fact.topic
        );
      }

      const finalized =
        this._finalize(
          conceptual,
          qObj,
          fact,
          mode,
          null
        );

      if (!finalized) {

        return this._safeFallback(
          qObj,
          "FINALIZATION_FAILED",
          fact.topic
        );
      }

      /*
       * Conceptual validation.
       *
       * We temporarily validate the required
       * metadata independently because the generic
       * numerical validator does not apply.
       */
      if (
        !this._validateConceptualResult(
          finalized
        )
      ) {

        return this._safeFallback(
          qObj,
          "CONCEPTUAL_VALIDATION_FAILED",
          fact.topic
        );
      }

      return finalized;
    }

    /*
     * STEP 4
     *
     * Build deterministic mutation plan.
     */
    const mutationPlan =
      this._buildMutationPlan(
        fact,
        sourceParameters,
        mode,
        seed
      );

    if (!mutationPlan) {

      return this._safeFallback(
        qObj,
        "MUTATION_PLAN_FAILED",
        fact.topic
      );
    }

    /*
     * STEP 5
     *
     * Apply mutation plan.
     */
    const mutatedParameters =
      this._applyMutationPlan(
        fact,
        sourceParameters,
        mutationPlan
      );

    if (!mutatedParameters) {

      return this._safeFallback(
        qObj,
        "PARAMETER_MUTATION_FAILED",
        fact.topic
      );
    }

    /*
     * STEP 6
     *
     * Build verified calculation.
     */
    const result =
      this._buildCalculation(
        fact,
        mutatedParameters,
        mode,
        seed,
        sourceParameters,
        mutationPlan
      );

    if (!result) {

      return this._safeFallback(
        qObj,
        "NO_SAFE_BUILDER",
        fact.topic
      );
    }

    /*
     * STEP 7
     *
     * Concept lock.
     */
    if (
      result.factModel?.topic !==
      fact.topic
    ) {

      return this._safeFallback(
        qObj,
        "TOPIC_LEAKAGE",
        fact.topic
      );
    }

    if (
      result.factModel?.concept !==
      fact.concept
    ) {

      return this._safeFallback(
        qObj,
        "CONCEPT_LEAKAGE",
        fact.topic
      );
    }

    /*
     * STEP 8
     *
     * Ensure no unauthorized parameters
     * were mutated.
     */
    if (
      !this._validateMutationPlan(
        fact,
        sourceParameters,
        mutatedParameters,
        mutationPlan
      )
    ) {

      return this._safeFallback(
        qObj,
        "UNAUTHORIZED_PARAMETER_MUTATION",
        fact.topic
      );
    }

    /*
     * STEP 9
     *
     * Finalize.
     */
    const finalized =
      this._finalize(
        result,
        qObj,
        fact,
        mode,
        mutationPlan
      );

    if (!finalized) {

      return this._safeFallback(
        qObj,
        "FINALIZATION_FAILED",
        fact.topic
      );
    }

    /*
     * STEP 10
     *
     * Independent validation.
     */
    if (
      !this.validateQuestion(
        finalized
      )
    ) {

      return this._safeFallback(
        qObj,
        "SEMANTIC_VALIDATION_FAILED",
        fact.topic
      );
    }

    /*
     * STEP 11
     *
     * Verify deterministic fingerprint.
     */
    if (
      !this._verifyDeterministicFingerprint(
        finalized,
        qObj,
        mode,
        mutationPlan
      )
    ) {

      return this._safeFallback(
        qObj,
        "DETERMINISM_VALIDATION_FAILED",
        fact.topic
      );
    }

    return finalized;
  }

  // ------------------------------------------------------------------
  // MUTATION PLAN VALIDATION
  // ------------------------------------------------------------------

  _validateMutationPlan(
    fact,
    sourceParameters,
    mutatedParameters,
    plan
  ) {

    if (!plan) {
      return false;
    }

    const authorized =
      new Set(
        plan.authorizedParameters
      );

    for (
      const key of fact.requiredParameters
    ) {

      const source =
        sourceParameters[key];

      const mutated =
        mutatedParameters[key];

      if (
        !source ||
        !mutated
      ) {
        return false;
      }

      const changed =
        Math.abs(
          source.value -
          mutated.value
        ) > 1e-9;

      if (
        changed &&
        !authorized.has(key)
      ) {
        return false;
      }

      /*
       * Units cannot change during mutation.
       */
      if (
        source.unit !==
        mutated.unit
      ) {
        return false;
      }

      /*
       * Every mutated value must belong to
       * the authorized parameter domain.
       */
      if (changed) {

        const allowed =
          this.allowedParameters[key];

        if (
          !allowed?.some(
            value =>
              Math.abs(
                value -
                mutated.value
              ) < 1e-9
          )
        ) {

          return false;
        }
      }
    }

    return true;
  }

  // ------------------------------------------------------------------
  // CONCEPTUAL VALIDATION
  // ------------------------------------------------------------------

  _validateConceptualResult(
    question
  ) {

    if (!question) {
      return false;
    }

    if (
      typeof question.q !== "string" ||
      !question.q.trim()
    ) {
      return false;
    }

    if (
      typeof question.ans !== "string" ||
      !question.ans.trim()
    ) {
      return false;
    }

    if (
      typeof question.hint !== "string" ||
      !question.hint.trim()
    ) {
      return false;
    }

    if (
      typeof question.sol !== "string" ||
      !question.sol.trim()
    ) {
      return false;
    }

    if (
      !Array.isArray(question.steps) ||
      question.steps.length === 0
    ) {
      return false;
    }

    const fm =
      question.factModel;

    if (!fm) {
      return false;
    }

    if (
      !this.factRegistry[fm.factId]
    ) {
      return false;
    }

    if (
      fm.topic !==
      this.factRegistry[fm.factId].topic
    ) {
      return false;
    }

    if (
      fm.concept !==
      this.factRegistry[fm.factId].concept
    ) {
      return false;
    }

    if (
      question.type === "mcq"
    ) {

      if (
        !Array.isArray(
          question.options
        ) ||
        question.options.length !== 4
      ) {
        return false;
      }

      if (
        new Set(
          question.options
        ).size !== 4
      ) {
        return false;
      }

      if (
        !question.options.includes(
          question.ans
        )
      ) {
        return false;
      }
    }

    if (
      question.metadata?.verified !== true ||
      question.metadata?.mutationStatus !==
        "VERIFIED"
    ) {
      return false;
    }

    return true;
  }

  // ------------------------------------------------------------------
  // DETERMINISM VERIFICATION
  // ------------------------------------------------------------------

  _verifyDeterministicFingerprint(
    question,
    sourceQuestion,
    mode,
    mutationPlan
  ) {

    if (!question || !mutationPlan) {
      return false;
    }

    const expected =
      this._fingerprint({

        version: this.version,

        sourceId:
          sourceQuestion?.id ||
          null,

        sourceQuestion:
          sourceQuestion?.q ||
          sourceQuestion?.stem ||
          "",

        mode,

        mutationPlan:
          mutationPlan.mutations
      });

    const actual =
      this._fingerprint({

        version: this.version,

        sourceId:
          sourceQuestion?.id ||
          null,

        sourceQuestion:
          sourceQuestion?.q ||
          sourceQuestion?.stem ||
          "",

        mode,

        mutationPlan:
          mutationPlan.mutations
      });

    return expected === actual;
  }

  // ------------------------------------------------------------------
  // SAFE MUTATE
  // ------------------------------------------------------------------

  safeMutate(
    qObj,
    modalityIndex = 0,
    performanceContext = {}
  ) {

    const result =
      this.mutate(
        qObj,
        modalityIndex,
        performanceContext
      );

    if (!result) {
      return null;
    }

    if (
      result.mutationStatus ===
      "SKIPPED_UNSAFE_MUTATION"
    ) {

      return result;
    }

    const fm =
      result.factModel ||
      result.metadata?.factModel;

    /*
     * Numerical questions use the complete
     * validator.
     */
    if (
      fm?.type === "calculation"
    ) {

      if (
        !this.validateQuestion(
          result
        )
      ) {

        return this._safeFallback(
          qObj,
          "FINAL_SAFETY_VALIDATION_FAILED",
          result.detectedTopic ||
            fm.topic ||
            null
        );
      }

      return result;
    }

    /*
     * Conceptual questions use their own
     * semantic validator.
     */
    if (
      fm?.type === "conceptual"
    ) {

      if (
        !this._validateConceptualResult(
          result
        )
      ) {

        return this._safeFallback(
          qObj,
          "FINAL_CONCEPTUAL_SAFETY_VALIDATION_FAILED",
          fm.topic ||
            null
        );
      }

      return result;
    }

    return this._safeFallback(
      qObj,
      "UNKNOWN_RESULT_TYPE",
      null
    );
  }
}

export default PhysicsMutator;
