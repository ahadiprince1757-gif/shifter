/**
 * Tixar Physics Mutator v4
 *
 * VERIFIED DIAGNOSTIC PHYSICS ENGINE
 *
 * Core law:
 *
 *     THE GENERATOR PROPOSES.
 *     THE SOLVER DECIDES.
 *
 * Pipeline:
 *
 *     SOURCE QUESTION
 *          ↓
 *     IDENTIFY EXACT FACT
 *          ↓
 *     EXTRACT PARAMETERS
 *          ↓
 *     BUILD FACT MODEL
 *          ↓
 *     APPLY ONLY AUTHORIZED MUTATION
 *          ↓
 *     SOLVE DETERMINISTICALLY
 *          ↓
 *     VERIFY ANSWER
 *          ↓
 *     VERIFY CONCEPT / SKILL
 *          ↓
 *     VERIFIED QUESTION
 *
 * If any important physical fact is ambiguous:
 *
 *     → SAFE FALLBACK
 *
 * Never:
 * - invent physical entities from a hash
 * - silently replace source numbers
 * - mutate a numerical parameter without recalculating
 * - mark a question verified before validation
 * - mix unrelated physics concepts
 *
 * Public API:
 *   mutate(qObj, modalityIndex, performanceContext)
 *   safeMutate(qObj, modalityIndex, performanceContext)
 *   validateQuestion(question)
 */

export class PhysicsMutator {

  constructor(config = {}) {

    this.version = "4.0.0";

    this.constants = Object.freeze({
      g: 9.8,
      speedOfSound: 340,
      atmosphericPressure: 101325,
      speedOfLight: 3e8,
      electronCharge: 1.602e-19,
      planckConstant: 6.626e-34
    });

    this.allowedParameters = Object.freeze({
      current:            [0.5, 1, 1.5, 2, 2.5, 3, 4, 5],
      resistance:         [2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50],
      mass:               [1, 2, 4, 5, 8, 10, 12, 15, 20, 25, 50, 100],
      acceleration:       [1, 2, 2.5, 3, 4, 5, 6, 8, 10],
      time:               [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20],
      distance:           [2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 50, 100],
      velocity:           [2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30],
      speed:              [2, 4, 5, 10, 15, 20, 25, 30, 340, 1500],
      force:              [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 200],
      frequency:          [50, 100, 170, 200, 250, 340, 400, 500, 680, 800, 1000],
      wavelength:         [0.2, 0.4, 0.5, 0.8, 1, 1.5, 2, 2.5, 4, 5],
      height:             [2, 3, 4, 5, 6, 8, 10, 12, 15, 20],
      volume:             [5, 10, 20, 25, 40, 50, 80, 100, 200, 500],
      charge:             [1, 2, 3, 4, 5, 6, 8, 10],
      voltage:            [3, 5, 6, 9, 10, 12, 15, 20, 24, 30, 48, 60, 120, 240],
      power:              [10, 20, 40, 60, 80, 100, 120, 150, 200, 500, 1000],
      area:               [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 4, 5],
      thresholdFrequency: [4e14, 5e14, 6e14]
    });

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
        invariant: { initialVelocity: 0 },
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
        invariant: { initialVelocity: 0 },
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
        invariant: { medium: "air", speed: 340 }
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
        invariant: { medium: "air", speed: 340 }
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
        allowedParameterKeys: ["mass", "volume"]
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
        invariant: { g: 9.8 }
      }
    });

    this.topicKeywords = Object.freeze({
      electricity:  ["electricity","current","voltage","potential difference","resistance","resistor","ohm","power","watt","charge","circuit"],
      mechanics:    ["force","mass","newton","work","joule","momentum","friction","resultant force"],
      kinematics:   ["speed","velocity","acceleration","distance","displacement","motion","time","kinematic"],
      waves:        ["wave","wavelength","frequency","amplitude","period","wave speed","sound"],
      optics:       ["reflection","refraction","lens","mirror","critical angle","total internal reflection","refractive index"],
      thermal:      ["temperature","heat","thermal","specific heat","latent heat"],
      pressure:     ["pressure","atmospheric pressure","hydraulic","pascal"],
      nuclear:      ["radioactive","radioactivity","alpha","beta","gamma","half-life","nucleus","nuclear"],
      modernPhysics:["photoelectric","photoelectron","photon","work function","threshold frequency","stopping potential","quantum"],
      density:      ["density","mass per unit volume","float","sink","buoyant"],
      energy:       ["potential energy","gravitational potential","gpe"]
    });
  }

  // ------------------------------------------------------------------
  // UTILITIES
  // ------------------------------------------------------------------

  _hash(value = "") {
    let h = 0;
    const s = String(value);
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return Math.abs(h);
  }

  _seed(qObj, modalityIndex = 0) {
    return this._hash(`${qObj?.id || ""}|${qObj?.q || qObj?.stem || ""}|physics|${modalityIndex}`);
  }

  _round(v, d = 2) { return Number(Number(v).toFixed(d)); }

  _shuffle(arr, seed) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.abs(seed + i * 31) % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  _number(value) {
    if (typeof value === "number") return value;
    const m = String(value ?? "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i);
    return m ? Number(m[0]) : null;
  }

  _extractNum(text, units) {
    const pat = units.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const m = String(text || "").match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:${pat})(?:(?=[^a-zA-Z0-9])|$)`, "i"));
    return m ? Number(m[1]) : null;
  }

  _extractNumAndUnit(text, units) {
    const pat = units.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const m = String(text || "").match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${pat})(?:(?=[^a-zA-Z0-9])|$)`, "i"));
    return m ? { value: Number(m[1]), matchedUnit: m[2] } : null;
  }

  // ------------------------------------------------------------------
  // TOPIC DETECTION
  // ------------------------------------------------------------------

  _normalizeTopic(v) {
    const s = String(v || "").toLowerCase();
    if (s.includes("photoelectric") || s.includes("quantum")) return "modernPhysics";
    if (s.includes("electric") || s.includes("circuit") || s.includes("ohm")) return "electricity";
    if (s.includes("kinematic") || s.includes("velocity") || s.includes("acceleration")) return "kinematics";
    if (s.includes("mechanic") || s.includes("force") || s.includes("momentum") || s.includes("work done")) return "mechanics";
    if (s.includes("wave") || s.includes("sound")) return "waves";
    if (s.includes("optic") || s.includes("lens") || s.includes("reflection") || s.includes("refraction")) return "optics";
    if (s.includes("thermal") || s.includes("heat") || s.includes("temperature")) return "thermal";
    if (s.includes("pressure") || s.includes("pascal") || s.includes("hydraulic")) return "pressure";
    if (s.includes("radioactiv") || s.includes("nuclear") || s.includes("half-life")) return "nuclear";
    if (s.includes("density") || s.includes("float") || s.includes("sink")) return "density";
    if (s.includes("potential energy") || s.includes("gpe")) return "energy";
    return null;
  }

  _detectTopic(qObj) {
    const explicit = qObj?.topic || qObj?.strand || qObj?.topicId || qObj?.factModel?.topic || qObj?.metadata?.factModel?.topic;
    if (explicit) { const n = this._normalizeTopic(explicit); if (n) return n; }

    const stem = String(qObj?.q || qObj?.stem || "").toLowerCase();
    const scores = {};
    for (const [topic, kws] of Object.entries(this.topicKeywords)) {
      scores[topic] = 0;
      for (const kw of kws) if (stem.includes(kw)) scores[topic] += kw.includes(" ") ? 3 : 1;
    }
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [best, second] = ranked;
    if (!best || best[1] === 0) return null;
    if (second && best[1] === second[1] && best[1] < 4) return null;
    return best[0];
  }

  // ------------------------------------------------------------------
  // FACT IDENTIFICATION
  // ------------------------------------------------------------------

  _existingFact(qObj) { return qObj?.metadata?.factModel || qObj?.factModel || null; }

  _identifyFact(qObj) {
    const ex = this._existingFact(qObj);
    if (ex?.factId && this.factRegistry[ex.factId]) {
      return { registry: this.factRegistry[ex.factId], source: "existing_fact_model", model: ex };
    }

    const s = String(qObj?.q || qObj?.stem || "").toLowerCase();

    if ((s.includes("ohm") || s.includes("resistor") || s.includes("Ω")) && (s.includes("current") || s.includes("resistance")) && (s.includes("voltage") || s.includes("potential difference")))
      return { registry: this.factRegistry["electricity.ohms_law.voltage"], source: "source_pattern" };

    if (s.includes("power") && s.includes("voltage") && s.includes("current"))
      return { registry: this.factRegistry["electricity.power.voltage_current"], source: "source_pattern" };

    if ((s.includes("force") || s.includes("resultant force") || s.includes("accelerate")) && s.includes("mass") && (s.includes("acceleration") || s.includes("accelerate")))
      return { registry: this.factRegistry["mechanics.newtons_second_law.force"], source: "source_pattern" };

    if (s.includes("work") && s.includes("force") && (s.includes("distance") || s.includes("direction")))
      return { registry: this.factRegistry["mechanics.work.force_distance"], source: "source_pattern" };

    if (s.includes("momentum") && s.includes("mass") && (s.includes("velocity") || s.includes("speed")))
      return { registry: this.factRegistry["mechanics.momentum.mass_velocity"], source: "source_pattern" };

    if ((s.includes("final velocity") || s.includes("velocity")) && s.includes("acceleration") && s.includes("time") && (s.includes("rest") || s.includes("starts from rest")))
      return { registry: this.factRegistry["kinematics.final_velocity.rest"], source: "source_pattern" };

    if ((s.includes("distance") || s.includes("displacement")) && s.includes("acceleration") && s.includes("time") && (s.includes("rest") || s.includes("starts from rest")))
      return { registry: this.factRegistry["kinematics.distance.rest"], source: "source_pattern" };

    if (s.includes("wavelength") && s.includes("frequency") && (s.includes("wave speed") || s.includes("sound") || s.includes("travels") || s.includes("speed")))
      return { registry: this.factRegistry["waves.wavelength.speed_frequency"], source: "source_pattern" };

    if (s.includes("frequency") && s.includes("wavelength") && (s.includes("wave") || s.includes("sound")))
      return { registry: this.factRegistry["waves.frequency.speed_wavelength"], source: "source_pattern" };

    if (s.includes("density") && (s.includes("mass") || s.includes("g") || s.includes("kg")) && (s.includes("volume") || s.includes("cm3") || s.includes("cm³")))
      return { registry: this.factRegistry["density.mass_volume"], source: "source_pattern" };

    if ((s.includes("potential energy") || s.includes("gpe")) && s.includes("mass") && s.includes("height"))
      return { registry: this.factRegistry["energy.gpe.mass_height"], source: "source_pattern" };

    return null;
  }

  // ------------------------------------------------------------------
  // PARAMETER EXTRACTION
  // ------------------------------------------------------------------

  _extractParameters(fact, qObj) {
    const ex = this._existingFact(qObj);
    if (ex?.parameters) {
      const params = {};
      for (const key of fact.requiredParameters) {
        const src = ex.parameters[key];
        if (src == null) return null;
        const val = typeof src === "object" ? src.value : src;
        const num = this._number(val);
        if (num == null) return null;
        params[key] = { value: num, unit: typeof src === "object" ? src.unit || null : null };
      }
      return params;
    }

    const stem = String(qObj?.q || qObj?.stem || "");
    const params = {};

    for (const key of fact.requiredParameters) {
      let value = null, unit = null;
      switch (key) {
        case "current": {
          const res = this._extractNumAndUnit(stem, ["A", "amp", "amps", "ampere", "amperes", "mA"]);
          if (res) {
            value = res.matchedUnit.toLowerCase() === "ma" ? this._round(res.value / 1000, 4) : res.value;
            unit = "A";
          }
          break;
        }
        case "resistance": {
          const res = this._extractNumAndUnit(stem, ["ohm", "ohms", "Ω"]);
          if (res) { value = res.value; unit = "ohms"; }
          break;
        }
        case "voltage": {
          const res = this._extractNumAndUnit(stem, ["V", "volt", "volts", "kV"]);
          if (res) {
            value = res.matchedUnit.toLowerCase() === "kv" ? res.value * 1000 : res.value;
            unit = "V";
          }
          break;
        }
        case "mass": {
          const res = this._extractNumAndUnit(stem, ["kg", "kilogram", "kilograms", "g", "gram", "grams"]);
          if (res) {
            const isGram = /^(g|gram|grams)$/i.test(res.matchedUnit);
            if (fact.topic === "density") {
              value = res.value;
              unit = isGram ? "g" : "kg";
            } else {
              value = isGram ? this._round(res.value / 1000, 4) : res.value;
              unit = "kg";
            }
          }
          break;
        }
        case "acceleration": {
          const res = this._extractNumAndUnit(stem, ["m/s2", "m/s^2", "m/s²", "ms^-2", "ms-2", "m s^-2"]);
          if (res) { value = res.value; unit = "m/s2"; }
          break;
        }
        case "time": {
          const res = this._extractNumAndUnit(stem, ["s", "sec", "secs", "second", "seconds", "min", "minute", "minutes", "h", "hour", "hours"]);
          if (res) {
            if (/^(min|minute|minutes)$/i.test(res.matchedUnit)) value = res.value * 60;
            else if (/^(h|hour|hours)$/i.test(res.matchedUnit)) value = res.value * 3600;
            else value = res.value;
            unit = "s";
          }
          break;
        }
        case "distance": {
          const res = this._extractNumAndUnit(stem, ["m", "metre", "metres", "meter", "meters", "km", "cm"]);
          if (res) {
            if (/^km$/i.test(res.matchedUnit)) value = res.value * 1000;
            else if (/^cm$/i.test(res.matchedUnit)) value = res.value / 100;
            else value = res.value;
            unit = "m";
          }
          break;
        }
        case "force": {
          const res = this._extractNumAndUnit(stem, ["N", "newton", "newtons", "kN"]);
          if (res) {
            value = /^kN$/i.test(res.matchedUnit) ? res.value * 1000 : res.value;
            unit = "N";
          }
          break;
        }
        case "velocity":
        case "speed": {
          const res = this._extractNumAndUnit(stem, ["m/s", "ms^-1", "ms-1", "m s^-1", "km/h"]);
          if (res) {
            value = /^km\/h$/i.test(res.matchedUnit) ? this._round(res.value / 3.6, 2) : res.value;
            unit = "m/s";
          }
          break;
        }
        case "frequency": {
          const res = this._extractNumAndUnit(stem, ["Hz", "hertz", "kHz", "MHz"]);
          if (res) {
            if (/^kHz$/i.test(res.matchedUnit)) value = res.value * 1000;
            else if (/^MHz$/i.test(res.matchedUnit)) value = res.value * 1e6;
            else value = res.value;
            unit = "Hz";
          }
          break;
        }
        case "wavelength": {
          const res = this._extractNumAndUnit(stem, ["m", "metre", "metres", "meter", "meters", "cm", "mm", "nm"]);
          if (res) {
            if (/^cm$/i.test(res.matchedUnit)) value = res.value / 100;
            else if (/^mm$/i.test(res.matchedUnit)) value = res.value / 1000;
            else if (/^nm$/i.test(res.matchedUnit)) value = res.value * 1e-9;
            else value = res.value;
            unit = "m";
          }
          break;
        }
        case "volume": {
          const res = this._extractNumAndUnit(stem, ["cm3", "cm^3", "cm³", "m3", "m^3", "m³", "litres", "liters", "l", "ml"]);
          if (res) {
            value = res.value;
            unit = /m3|m\^3|m³/i.test(res.matchedUnit) ? "m3" : "cm3";
          }
          break;
        }
        case "height": {
          const res = this._extractNumAndUnit(stem, ["m", "metre", "metres", "meter", "meters", "km", "cm"]);
          if (res) {
            if (/^km$/i.test(res.matchedUnit)) value = res.value * 1000;
            else if (/^cm$/i.test(res.matchedUnit)) value = res.value / 100;
            else value = res.value;
            unit = "m";
          }
          break;
        }
        default: return null;
      }
      if (value == null) return null;
      params[key] = { value, unit };
    }
    return params;
  }

  // ------------------------------------------------------------------
  // CONTROLLED PARAMETER MUTATION
  // ------------------------------------------------------------------

  _mutateParameter(key, sourceValue, fact, seed, offset = 0) {
    if (!fact.allowedParameterKeys?.includes(key)) return sourceValue;
    const allowed = this.allowedParameters[key];
    if (!Array.isArray(allowed) || !allowed.length) return sourceValue;
    const idx = allowed.findIndex(v => Math.abs(v - sourceValue) < 1e-6);
    if (idx === -1) {
      const candidate = allowed[Math.abs(seed + offset) % allowed.length];
      if (candidate !== sourceValue && Number.isFinite(candidate) && candidate > 0) return candidate;
      return allowed[0];
    }
    const shift = 1 + (Math.abs(seed + offset) % (allowed.length - 1));
    const candidate = allowed[(idx + shift) % allowed.length];
    if (candidate !== sourceValue && Number.isFinite(candidate) && candidate > 0) return candidate;
    return sourceValue;
  }

  _buildMutationParameters(fact, sourceParameters, seed) {
    const result = {};
    let offset = 0;
    for (const key of fact.requiredParameters) {
      const src = sourceParameters[key];
      if (!src) return null;
      result[key] = { value: this._mutateParameter(key, src.value, fact, seed, offset), unit: src.unit };
      offset++;
    }
    return result;
  }

  // ------------------------------------------------------------------
  // SOLVERS
  // ------------------------------------------------------------------

  _solve(factId, parameters) {
    const p = Object.fromEntries(Object.entries(parameters).map(([k, d]) => [k, d.value]));
    switch (factId) {
      case "electricity.ohms_law.voltage":        return this._round(p.current * p.resistance, 2);
      case "electricity.power.voltage_current":   return this._round(p.voltage * p.current, 2);
      case "mechanics.newtons_second_law.force":  return this._round(p.mass * p.acceleration, 2);
      case "mechanics.work.force_distance":       return this._round(p.force * p.distance, 2);
      case "mechanics.momentum.mass_velocity":    return this._round(p.mass * p.velocity, 2);
      case "kinematics.final_velocity.rest":      return this._round(p.acceleration * p.time, 2);
      case "kinematics.distance.rest":            return this._round(0.5 * p.acceleration * p.time * p.time, 2);
      case "waves.wavelength.speed_frequency":    return this._round(p.speed / p.frequency, 4);
      case "waves.frequency.speed_wavelength":    return this._round(p.speed / p.wavelength, 2);
      case "density.mass_volume":                 return this._round(p.mass / p.volume, 4);
      case "energy.gpe.mass_height":              return this._round(p.mass * this.constants.g * p.height, 2);
      default:                                    return null;
    }
  }

  _fmt(value, unit) { return `${value} ${unit}`; }

  // ------------------------------------------------------------------
  // DISTRACTORS
  // ------------------------------------------------------------------

  _distractors(factId, parameters, correctValue) {
    const p = Object.fromEntries(Object.entries(parameters).map(([k, d]) => [k, d.value]));
    const result = [];
    const add = (value, id, unit) => {
      if (!Number.isFinite(value) || value <= 0 || Math.abs(value - correctValue) < 1e-6) return;
      const formatted = this._fmt(this._round(value, 4), unit);
      if (!result.some(r => r.value === formatted)) {
        result.push({ value: formatted, misconceptionId: id });
      }
    };

    switch (factId) {
      case "electricity.ohms_law.voltage":
        add(p.current + p.resistance, "ADD_CURRENT_RESISTANCE", "V");
        add(p.resistance / p.current,  "DIVIDE_R_BY_I", "V");
        add(p.current / p.resistance,  "DIVIDE_I_BY_R", "V");
        add(p.current,                 "CURRENT_AS_VOLTAGE", "V");
        add(p.resistance,              "RESISTANCE_AS_VOLTAGE", "V");
        add(correctValue * 2,          "DOUBLE_FACTOR", "V");
        break;
      case "electricity.power.voltage_current":
        add(p.voltage + p.current,  "ADD_V_I", "W");
        add(p.voltage / p.current,  "DIVIDE_V_BY_I", "W");
        add(p.current / p.voltage,  "DIVIDE_I_BY_V", "W");
        add(p.voltage,              "VOLTAGE_AS_POWER", "W");
        add(p.current,              "CURRENT_AS_POWER", "W");
        add(correctValue * 2,       "DOUBLE_FACTOR", "W");
        break;
      case "mechanics.newtons_second_law.force":
        add(p.mass + p.acceleration,  "ADD_M_A", "N");
        add(p.mass / p.acceleration,  "DIVIDE_M_BY_A", "N");
        add(p.acceleration / p.mass,  "DIVIDE_A_BY_M", "N");
        add(p.acceleration,           "ACCEL_AS_FORCE", "N");
        add(p.mass,                   "MASS_AS_FORCE", "N");
        add(correctValue * 2,         "DOUBLE_FACTOR", "N");
        break;
      case "mechanics.work.force_distance":
        add(p.force + p.distance,  "ADD_F_D", "J");
        add(p.force / p.distance,  "DIVIDE_F_BY_D", "J");
        add(p.distance / p.force,  "DIVIDE_D_BY_F", "J");
        add(p.force,               "FORCE_AS_WORK", "J");
        add(p.distance,            "DISTANCE_AS_WORK", "J");
        add(correctValue * 2,      "DOUBLE_FACTOR", "J");
        break;
      case "mechanics.momentum.mass_velocity":
        add(p.mass + p.velocity,   "ADD_M_V", "kg·m/s");
        add(p.mass / p.velocity,   "DIVIDE_M_BY_V", "kg·m/s");
        add(p.velocity / p.mass,   "DIVIDE_V_BY_M", "kg·m/s");
        add(p.velocity,            "VEL_AS_MOMENTUM", "kg·m/s");
        add(0.5 * p.mass * p.velocity * p.velocity, "CONFUSE_WITH_KE", "kg·m/s");
        add(correctValue * 2,      "DOUBLE_FACTOR", "kg·m/s");
        break;
      case "kinematics.final_velocity.rest":
        add(0.5 * p.acceleration * p.time * p.time, "CONFUSE_DIST_VEL", "m/s");
        add(p.acceleration + p.time,                "ADD_A_T", "m/s");
        add(p.acceleration / p.time,                "DIVIDE_A_BY_T", "m/s");
        add(p.time / p.acceleration,                "DIVIDE_T_BY_A", "m/s");
        add(p.acceleration * p.time * 2,            "DOUBLE_FACTOR", "m/s");
        break;
      case "kinematics.distance.rest":
        add(p.acceleration * p.time,            "USE_VEL_AS_DIST", "m");
        add(p.acceleration * p.time * p.time,   "OMIT_HALF", "m");
        add(0.5 * p.acceleration * p.time,      "OMIT_T_SQUARED", "m");
        add(p.acceleration + p.time,            "ADD_A_T", "m");
        add(p.acceleration / p.time,            "DIVIDE_A_BY_T", "m");
        break;
      case "waves.wavelength.speed_frequency":
        add(p.frequency / p.speed,       "INVERT_WAVE", "m");
        add(p.speed * p.frequency,       "MULTIPLY_V_F", "m");
        add(p.speed / (p.frequency * 2), "DOUBLE_F_SCALE", "m");
        add(p.speed / (p.frequency / 2), "HALF_F_SCALE", "m");
        add(p.frequency,                 "FREQ_AS_WAVELENGTH", "m");
        break;
      case "waves.frequency.speed_wavelength":
        add(p.wavelength / p.speed,       "INVERT_WAVE", "Hz");
        add(p.speed * p.wavelength,       "MULTIPLY_V_L", "Hz");
        add(p.speed / (p.wavelength * 2), "DOUBLE_L_SCALE", "Hz");
        add(p.speed / (p.wavelength / 2), "HALF_L_SCALE", "Hz");
        add(p.wavelength,                 "WAVELENGTH_AS_FREQ", "Hz");
        break;
      case "density.mass_volume":
        add(p.volume / p.mass,   "REVERSE_DENSITY", "g/cm3");
        add(p.mass * p.volume,   "MULTIPLY_M_V", "g/cm3");
        add(p.mass,              "MASS_AS_DENSITY", "g/cm3");
        add(p.volume,            "VOLUME_AS_DENSITY", "g/cm3");
        add(correctValue * 2,    "DOUBLE_FACTOR", "g/cm3");
        break;
      case "energy.gpe.mass_height":
        add(p.mass * p.height,                        "OMIT_G", "J");
        add(p.mass * this.constants.g,                "OMIT_H", "J");
        add(p.mass + p.height + this.constants.g,     "ADD_PARAMS", "J");
        add(0.5 * p.mass * this.constants.g * p.height, "HALF_FACTOR", "J");
        add(correctValue * 2,                         "DOUBLE_FACTOR", "J");
        break;
      default: break;
    }
    return result;
  }

  // ------------------------------------------------------------------
  // MCQ
  // ------------------------------------------------------------------

  _mcqOptions(correct, distractors, seed) {
    const unique = [];
    for (const v of [correct, ...(distractors || [])]) {
      if (v && !unique.includes(v)) unique.push(v);
    }
    // Deterministic numerical fallbacks to guarantee 4 unique valid options:
    if (unique.length < 4) {
      const numMatch = String(correct).match(/-?\d+(?:\.\d+)?/);
      const unit = String(correct).replace(/-?\d+(?:\.\d+)?/, "").trim();
      const baseNum = numMatch ? Number(numMatch[0]) : 10;
      const unitStr = unit ? ` ${unit}` : "";
      const multipliers = [2, 0.5, 1.5, 3, 0.25, 4];
      for (const m of multipliers) {
        if (unique.length >= 4) break;
        const cand = `${this._round(baseNum * m, 2)}${unitStr}`;
        if (!unique.includes(cand)) unique.push(cand);
      }
    }
    if (unique.length < 4) return null;
    return this._shuffle(unique.slice(0, 4), seed);
  }

  // ------------------------------------------------------------------
  // CALCULATION BUILDER
  // ------------------------------------------------------------------

  _buildCalculation(fact, parameters, mode, seed) {
    const value = this._solve(fact.factId, parameters);
    if (value == null) return null;

    const answer = this._fmt(value, fact.answerUnit);
    const p = Object.fromEntries(Object.entries(parameters).map(([k, d]) => [k, d.value]));

    let q, hint, sol, steps;

    switch (fact.factId) {
      case "electricity.ohms_law.voltage":
        q     = `A ${p.resistance} ohm resistor carries a current of ${p.current} A. Calculate the potential difference across the resistor.`;
        hint  = "Use Ohm's Law: V = IR.";
        sol   = `V = IR = ${p.current} x ${p.resistance} = ${value} V.`;
        steps = [`Identify I = ${p.current} A.`, `Identify R = ${p.resistance} ohm.`, "Use V = IR.", `V = ${p.current} x ${p.resistance} = ${value} V.`];
        break;

      case "electricity.power.voltage_current":
        q     = `An appliance operates at ${p.voltage} V and draws ${p.current} A. Calculate its electrical power.`;
        hint  = "Use P = VI.";
        sol   = `P = VI = ${p.voltage} x ${p.current} = ${value} W.`;
        steps = [`V = ${p.voltage} V.`, `I = ${p.current} A.`, "Use P = VI.", `P = ${value} W.`];
        break;

      case "mechanics.newtons_second_law.force":
        q     = `A ${p.mass} kg object accelerates at ${p.acceleration} m/s2. Calculate the resultant force acting on it.`;
        hint  = "Use Newton's Second Law: F = ma.";
        sol   = `F = ma = ${p.mass} x ${p.acceleration} = ${value} N.`;
        steps = [`m = ${p.mass} kg.`, `a = ${p.acceleration} m/s2.`, "Use F = ma.", `F = ${value} N.`];
        break;

      case "mechanics.work.force_distance":
        q     = `A constant force of ${p.force} N moves an object ${p.distance} m in the direction of the force. Calculate the work done.`;
        hint  = "For force in the direction of motion, W = Fd.";
        sol   = `W = Fd = ${p.force} x ${p.distance} = ${value} J.`;
        steps = [`F = ${p.force} N.`, `d = ${p.distance} m.`, "Use W = Fd.", `W = ${value} J.`];
        break;

      case "mechanics.momentum.mass_velocity":
        q     = `A ${p.mass} kg object moves at ${p.velocity} m/s. Calculate its momentum.`;
        hint  = "Momentum: p = mv.";
        sol   = `p = mv = ${p.mass} x ${p.velocity} = ${value} kg m/s.`;
        steps = [`m = ${p.mass} kg.`, `v = ${p.velocity} m/s.`, "Use p = mv.", `p = ${value} kg m/s.`];
        break;

      case "kinematics.final_velocity.rest":
        q     = `A vehicle starts from rest and accelerates uniformly at ${p.acceleration} m/s2 for ${p.time} s. Calculate its final velocity.`;
        hint  = "Since the vehicle starts from rest, u = 0. Use v = u + at.";
        sol   = `v = 0 + (${p.acceleration} x ${p.time}) = ${value} m/s.`;
        steps = ["u = 0 m/s.", `a = ${p.acceleration} m/s2.`, `t = ${p.time} s.`, "Use v = u + at.", `v = ${value} m/s.`];
        break;

      case "kinematics.distance.rest":
        q     = `A vehicle starts from rest and accelerates uniformly at ${p.acceleration} m/s2 for ${p.time} s. Calculate the distance travelled.`;
        hint  = "Since u = 0, use s = (1/2) a t squared.";
        sol   = `s = 0.5 x ${p.acceleration} x ${p.time} squared = ${value} m.`;
        steps = ["u = 0 m/s.", `a = ${p.acceleration} m/s2.`, `t = ${p.time} s.`, "Use s = ut + 0.5 a t squared.", `Since u = 0, s = 0.5 a t squared = ${value} m.`];
        break;

      case "waves.wavelength.speed_frequency":
        q     = `A sound wave travels through air at ${p.speed} m/s and has a frequency of ${p.frequency} Hz. Calculate its wavelength.`;
        hint  = "Use v = f times lambda, so lambda = v / f.";
        sol   = `lambda = v / f = ${p.speed} / ${p.frequency} = ${value} m.`;
        steps = [`v = ${p.speed} m/s.`, `f = ${p.frequency} Hz.`, "Rearrange v = f lambda to lambda = v / f.", `lambda = ${value} m.`];
        break;

      case "waves.frequency.speed_wavelength":
        q     = `A wave travels through air at ${p.speed} m/s and has a wavelength of ${p.wavelength} m. Calculate its frequency.`;
        hint  = "Use f = v / lambda.";
        sol   = `f = ${p.speed} / ${p.wavelength} = ${value} Hz.`;
        steps = [`v = ${p.speed} m/s.`, `lambda = ${p.wavelength} m.`, "Use f = v / lambda.", `f = ${value} Hz.`];
        break;

      case "density.mass_volume":
        q     = `A solid has a mass of ${p.mass} g and occupies ${p.volume} cm3. Calculate its density.`;
        hint  = "Density: rho = m / V.";
        sol   = `rho = ${p.mass} / ${p.volume} = ${value} g/cm3.`;
        steps = [`m = ${p.mass} g.`, `V = ${p.volume} cm3.`, "Use rho = m / V.", `rho = ${value} g/cm3.`];
        break;

      case "energy.gpe.mass_height":
        q     = `A ${p.mass} kg object is raised through a vertical height of ${p.height} m. Taking g = ${this.constants.g} m/s2, calculate the increase in gravitational potential energy.`;
        hint  = "Use GPE = mgh.";
        sol   = `GPE = ${p.mass} x ${this.constants.g} x ${p.height} = ${value} J.`;
        steps = [`m = ${p.mass} kg.`, `h = ${p.height} m.`, `g = ${this.constants.g} m/s2.`, "Use GPE = mgh.", `GPE = ${value} J.`];
        break;

      default:
        return null;
    }

    const misconceptionData = this._distractors(fact.factId, parameters, value);
    const distractors = misconceptionData.map(d => d.value);
    const options = mode === 0 ? null : this._mcqOptions(answer, distractors, seed);

    return {
      q, ans: answer, hint, sol, steps,
      type: mode === 0 ? "open_response" : "mcq",
      options,
      concept: fact.concept,
      skill: fact.skill,
      difficulty: mode === 2 ? 3 : 2,
      misconception: mode === 2 ? (misconceptionData[0]?.misconceptionId || null) : null,
      modality: mode === 0 ? "calculation" : mode === 1 ? "application" : mode === 2 ? "diagnostic" : "transfer",
      factModel: {
        factId: fact.factId,
        type: fact.type,
        topic: fact.topic,
        concept: fact.concept,
        skill: fact.skill,
        formula: fact.formula,
        parameters,
        answer: { value, unit: fact.answerUnit },
        invariant: fact.invariant || null,
        provenance: {
          source: "verified_source_question",
          mutationType: "controlled_parameter_mutation",
          verifiedBy: "PhysicsMutator.v4.solver"
        }
      }
    };
  }

  // ------------------------------------------------------------------
  // CONCEPTUAL BUILDER
  // ------------------------------------------------------------------

  _buildConceptual(fact, mode) {
    const registry = {
      "electricity.ohms_law.voltage": {
        q: "If the resistance of an ohmic resistor remains constant, what happens to the current when the potential difference across it is increased?",
        ans: "The current increases because I = V/R, so with constant resistance current is directly proportional to voltage.",
        hint: "Rearrange Ohm's Law to make current the subject.",
        sol: "From V = IR, I = V/R. If R remains constant, increasing V increases I.",
        misconception: "Current remains constant regardless of potential difference."
      },
      "electricity.power.voltage_current": {
        q: "What happens to electrical power if the voltage across an appliance increases while its current remains constant?",
        ans: "The electrical power increases because P = VI.",
        hint: "Look at the relationship between power, voltage and current.",
        sol: "Since P = VI, if I remains constant and V increases, P increases.",
        misconception: "Power depends only on the current."
      },
      "mechanics.newtons_second_law.force": {
        q: "What happens to the resultant force on an object if its mass is doubled while its acceleration remains unchanged?",
        ans: "The resultant force doubles because F = ma.",
        hint: "Look at the relationship between force and mass.",
        sol: "F = ma. With acceleration unchanged, doubling mass doubles the resultant force.",
        misconception: "Force remains unchanged because acceleration has not changed."
      },
      "density.mass_volume": {
        q: "Why does an object with the same mass occupy a smaller volume when its density is greater?",
        ans: "Because density is mass per unit volume, so for a fixed mass, greater density corresponds to a smaller volume.",
        hint: "Use rho = m / V.",
        sol: "Rearranging rho = m / V gives V = m / rho. For fixed mass, increasing density decreases volume.",
        misconception: "Higher density always means greater volume."
      }
    };

    const item = registry[fact.factId];
    if (!item) return null;

    const distractors = [
      item.misconception,
      "The result changes randomly and cannot be predicted using a physical relationship.",
      "The physical quantities are unrelated."
    ];
    const options = mode === 1 ? this._mcqOptions(item.ans, distractors, this._hash(fact.factId)) : null;

    return {
      q: item.q, ans: item.ans, hint: item.hint, sol: item.sol,
      steps: ["Identify the physical quantities involved.", `Use ${fact.formula}.`, "Determine how the quantities are related.", "State the physical conclusion."],
      type: mode === 1 ? "mcq" : "open_response",
      options,
      concept: fact.concept,
      skill: "Conceptual reasoning",
      difficulty: 3,
      misconception: item.misconception,
      modality: "conceptual",
      factModel: {
        factId: fact.factId,
        type: "conceptual",
        topic: fact.topic,
        concept: fact.concept,
        skill: "Conceptual reasoning",
        formula: fact.formula,
        provenance: { source: "verified_source_question", mutationType: "conceptual_reframing", verifiedBy: "PhysicsMutator.v4.conceptRegistry" }
      }
    };
  }

  // ------------------------------------------------------------------
  // VALIDATION
  // ------------------------------------------------------------------

  _validateFactModel(question) {
    const fm = question?.factModel || question?.metadata?.factModel;
    if (!fm) return { valid: false, reason: "MISSING_FACT_MODEL" };

    const fact = this.factRegistry[fm.factId];
    if (!fact) return { valid: false, reason: "UNKNOWN_FACT_ID" };
    if (fm.topic !== fact.topic) return { valid: false, reason: "TOPIC_MISMATCH" };
    if (fm.concept !== fact.concept) return { valid: false, reason: "CONCEPT_MISMATCH" };

    if (fact.type === "calculation") {
      if (!fm.parameters) return { valid: false, reason: "MISSING_PARAMETERS" };
      for (const key of fact.requiredParameters) {
        const param = fm.parameters[key];
        if (!param) return { valid: false, reason: `MISSING_PARAMETER_${key}` };
        const val = typeof param === "object" ? param.value : param;
        if (!Number.isFinite(Number(val))) return { valid: false, reason: `INVALID_PARAMETER_${key}` };
        if (Number(val) <= 0) return { valid: false, reason: `NON_POSITIVE_PARAMETER_${key}` };
      }
      const expected = this._solve(fact.factId, fm.parameters);
      if (expected == null) return { valid: false, reason: "SOLVER_FAILED" };
      const actual = Number(fm.answer?.value);
      if (!Number.isFinite(actual)) return { valid: false, reason: "MISSING_ANSWER_VALUE" };
      if (Math.abs(expected - actual) > 0.0001) return { valid: false, reason: "ANSWER_DOES_NOT_MATCH_SOLVER", expected, actual };
    }
    return { valid: true };
  }

  validateQuestion(question) {
    if (!question) return false;
    if (typeof question.q !== "string" || !question.q.trim()) return false;
    if (typeof question.ans !== "string" || !question.ans.trim()) return false;

    if (!this._validateFactModel(question).valid) return false;

    const fm = question.factModel || question.metadata?.factModel;
    const fact = this.factRegistry[fm.factId];

    if (fact.type === "calculation") {
      const expected = this._solve(fact.factId, fm.parameters);
      if (expected == null) return false;
      const num = this._number(question.ans);
      if (num == null || Math.abs(num - expected) > 0.0001) return false;
    }

    if (question.type === "mcq") {
      if (!Array.isArray(question.options) || question.options.length !== 4) return false;
      if (new Set(question.options).size !== 4) return false;
      if (!question.options.includes(question.ans)) return false;
    }

    const forbidden = ["Incorrect physical relationship","Incorrect formula","Incorrect calculation","Incorrect use of formula","Cannot be determined"];
    if (Array.isArray(question.options)) {
      for (const opt of question.options) if (forbidden.includes(opt)) return false;
    }

    if (typeof question.hint !== "string" || typeof question.sol !== "string" || !Array.isArray(question.steps)) return false;

    return true;
  }

  // ------------------------------------------------------------------
  // FINALIZE
  // ------------------------------------------------------------------

  _finalize(result, sourceQuestion, fact, modalityIndex) {
    if (!result) return null;
    const finalized = {
      ...result,
      concept: result.concept || fact.concept,
      skill: result.skill || fact.skill,
      metadata: {
        ...(sourceQuestion?.metadata || {}),
        mutationEngine: "PhysicsMutator",
        mutationVersion: this.version,
        mutationStatus: "VERIFIED",
        verified: true,
        factModel: result.factModel,
        provenance: {
          sourceQuestionId: sourceQuestion?.id || null,
          factId: fact.factId,
          mutationType: result.factModel?.provenance?.mutationType || null,
          verifiedBy: "PhysicsMutator.v4.validator",
          mutationVerified: true,
          conceptPreserved: true,
          answerRecalculated: true
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

  _safeFallback(qObj, reason, topic = null) {
    return {
      ...qObj,
      q: qObj?.q || qObj?.stem || "",
      ans: qObj?.ans || "",
      hint: qObj?.hint || "Review the physical principle involved before answering.",
      sol: qObj?.sol || qObj?.explanation || "No verified mutation was generated because changing the question safely could not be proven.",
      steps: Array.isArray(qObj?.steps) ? qObj.steps : ["Identify the physical quantities.", "Recall the governing physical principle.", "Apply the principle to the original question."],
      type: qObj?.type || "open_response",
      options: qObj?.options || null,
      concept: qObj?.concept || null,
      skill: qObj?.skill || null,
      difficulty: qObj?.difficulty || 2,
      mutationStatus: "SKIPPED_UNSAFE_MUTATION",
      mutationReason: reason,
      detectedTopic: topic,
      safe: true,
      metadata: {
        ...(qObj?.metadata || {}),
        mutationEngine: "PhysicsMutator",
        mutationVersion: this.version,
        mutationStatus: "FALLBACK",
        verified: false,
        fallbackReason: reason
      }
    };
  }

  // ------------------------------------------------------------------
  // MAIN MUTATION
  // ------------------------------------------------------------------

  mutate(qObj, modalityIndex = 0, performanceContext = {}) {
    if (!qObj) return null;
    const stem = String(qObj.q || qObj.stem || "").trim();
    if (!stem) return null;

    const mode = Math.abs(Number(modalityIndex) || 0) % 4;
    const seed = this._seed(qObj, mode);

    // Step 1: Identify fact
    const id = this._identifyFact(qObj);
    if (!id) return this._safeFallback(qObj, "NO_VERIFIED_PHYSICS_FACT", this._detectTopic(qObj));

    const fact = id.registry;

    // Step 2: Extract parameters
    const sourceParams = this._extractParameters(fact, qObj);
    if (fact.type === "calculation" && !sourceParams) {
      return this._safeFallback(qObj, "SOURCE_PARAMETERS_NOT_EXTRACTABLE", fact.topic);
    }

    // Step 3: Build candidate
    let result = null;
    if (fact.type === "calculation") {
      const mutated = this._buildMutationParameters(fact, sourceParams, seed);
      if (!mutated) return this._safeFallback(qObj, "PARAMETER_MUTATION_FAILED", fact.topic);
      result = this._buildCalculation(fact, mutated, mode, seed);
    } else {
      result = this._buildConceptual(fact, mode);
    }

    if (!result) return this._safeFallback(qObj, "NO_SAFE_BUILDER", fact.topic);

    // Step 4: Concept lock
    if (result.factModel?.topic !== fact.topic) return this._safeFallback(qObj, "TOPIC_LEAKAGE", fact.topic);
    if (result.factModel?.concept !== fact.concept) return this._safeFallback(qObj, "CONCEPT_LEAKAGE", fact.topic);

    // Step 5: Finalize
    const finalized = this._finalize(result, qObj, fact, mode);
    if (!finalized) return this._safeFallback(qObj, "FINALIZATION_FAILED", fact.topic);

    // Step 6: Independent validation
    if (!this.validateQuestion(finalized)) return this._safeFallback(qObj, "SEMANTIC_VALIDATION_FAILED", fact.topic);

    return finalized;
  }

  // ------------------------------------------------------------------
  // SAFE MUTATE
  // ------------------------------------------------------------------

  safeMutate(qObj, modalityIndex = 0, performanceContext = {}) {
    const result = this.mutate(qObj, modalityIndex, performanceContext);
    if (!result) return null;
    if (result.mutationStatus === "SKIPPED_UNSAFE_MUTATION") return result;
    if (!this.validateQuestion(result)) {
      return this._safeFallback(qObj, "FINAL_SAFETY_VALIDATION_FAILED", result.detectedTopic || null);
    }
    return result;
  }
}

export default PhysicsMutator;
