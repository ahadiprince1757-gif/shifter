/**
 * Universal Client-Side Question Mutator
 * Central dispatcher that routes questions to subject-specific mutators.
 * Zero dependencies | Offline-first | Subject-agnostic fallback
 */

import { BiologyMutator } from "./mutators/BiologyMutator.js";
import { MathMutator } from "./mutators/MathMutator.js";
import { PhysicsMutator } from "./mutators/PhysicsMutator.js";
import { ChemistryMutator } from "./mutators/ChemistryMutator.js";
import { BusinessMutator } from "./mutators/BusinessMutator.js";
import { HistoryMutator } from "./mutators/HistoryMutator.js";
import { GeographyMutator } from "./mutators/GeographyMutator.js";
import { AgricultureMutator } from "./mutators/AgricultureMutator.js";
import { ComputerMutator } from "./mutators/ComputerMutator.js";
import { EnglishMutator } from "./mutators/EnglishMutator.js";
import { KiswahiliMutator } from "./mutators/KiswahiliMutator.js";
import { HomeScienceMutator } from "./mutators/HomeScienceMutator.js";

export class QuestionMutator {
  constructor() {
    // Subject-specific mutator instances
    this._mutators = {
      biology: new BiologyMutator(),
      math: new MathMutator(),
      mathematics: new MathMutator(),
      physics: new PhysicsMutator(),
      chemistry: new ChemistryMutator(),
      business: new BusinessMutator(),
      "business studies": new BusinessMutator(),
      history: new HistoryMutator(),
      "history and government": new HistoryMutator(),
      geography: new GeographyMutator(),
      agriculture: new AgricultureMutator(),
      computer: new ComputerMutator(),
      "computer studies": new ComputerMutator(),
      english: new EnglishMutator(),
      kiswahili: new KiswahiliMutator(),
      homescience: new HomeScienceMutator(),
      "home science": new HomeScienceMutator(),
    };

    // Legacy template strategies (still supported for blueprints with variables)
    this.strategies = {
      NUMBER: this._mutateNumber,
      SELECT: this._mutateSelect,
      FORMULA: this._evaluateFormula,
    };
  }

  /**
   * Main entry point.
   * @param {Object} blueprint - Question object (from DB or sampleBlueprints)
   * @param {string} [subjectName] - Subject identifier for routing (e.g. "biology", "math")
   * @returns {Object} Mutated question object
   */
  mutate(blueprint, subjectName = "") {
    if (!blueprint) return null;

    // 1. If blueprint has template variables, use legacy template interpolation
    if (blueprint.variables && Object.keys(blueprint.variables).length > 0) {
      return this._mutateFromTemplate(blueprint);
    }

    // 2. Route to subject-specific mutator
    const subjectKey = (subjectName || blueprint.subject || "").toLowerCase().trim();
    const mutator = this._mutators[subjectKey];

    if (mutator) {
      const result = mutator.mutate(blueprint);
      if (result) {
        return {
          id: `${blueprint.id || "q"}_${Date.now()}`,
          originalId: blueprint.id,
          subject: blueprint.subject || subjectName,
          topic: blueprint.topic,
          ...result,
          // Ensure steps always exist
          steps: result.steps || blueprint.steps || [],
        };
      }
    }

    // 3. Generic fallback: cloze transformation
    return this._genericFallback(blueprint);
  }

  // ── Legacy Template Interpolation (for blueprints with variables) ───

  _mutateFromTemplate(blueprint) {
    const instance = JSON.parse(JSON.stringify(blueprint));
    const context = {};

    if (instance.variables) {
      Object.entries(instance.variables).forEach(([varName, config]) => {
        context[varName] = this._resolveVariable(config, context);
      });
    }

    const mutatedStem = this._interpolateText(instance.stem || instance.q || "", context);

    let mutatedOptions = [];
    let correctIndex = instance.correctIndex ?? 0;

    if (instance.options) {
      const processedOptions = instance.options.map((opt) => {
        if (typeof opt === "string") {
          return this._interpolateText(opt, context);
        } else if (typeof opt === "object" && opt !== null && opt.formula) {
          return String(this._evaluateFormula(opt.formula, context));
        }
        return String(opt);
      });

      const shuffled = this._shuffleWithOptions(processedOptions, correctIndex);
      mutatedOptions = shuffled.options;
      correctIndex = shuffled.newCorrectIndex;
    }

    const mutatedExplanation = instance.explanation || instance.why || instance.sol
      ? this._interpolateText(instance.explanation || instance.why || instance.sol, context)
      : "";

    const correctAnswerText =
      mutatedOptions.length > 0 && correctIndex >= 0 && correctIndex < mutatedOptions.length
        ? mutatedOptions[correctIndex]
        : (instance.ans ? this._interpolateText(String(instance.ans), context) : "");

    return {
      id: `${instance.id}_${Date.now()}`,
      originalId: instance.id,
      subject: instance.subject,
      topic: instance.topic,
      q: mutatedStem,
      stem: mutatedStem,
      options: mutatedOptions,
      correctIndex: correctIndex,
      ans: correctAnswerText,
      explanation: mutatedExplanation,
      why: mutatedExplanation,
      sol: mutatedExplanation,
      steps: instance.steps || [],
      resolvedVariables: context,
    };
  }

  // ── Generic Fallback ────────────────────────────────────────

  _genericFallback(qObj) {
    if (qObj.ans && typeof qObj.ans === "string" && qObj.ans.length > 5) {
      const words = qObj.ans.split(" ");
      if (words.length >= 3) {
        const idx = Math.floor(words.length / 2);
        const target = words[idx];
        const masked = [...words];
        masked[idx] = "________";

        return {
          id: `fallback_${Date.now()}`,
          originalId: qObj.id,
          subject: qObj.subject,
          topic: qObj.topic,
          q: `Complete the concept: "${masked.join(" ")}"`,
          ans: target,
          hint: qObj.hint || `Missing word starts with '${target.charAt(0).toUpperCase()}'`,
          why: `Full answer: ${qObj.ans}`,
          sol: qObj.why || qObj.explain || `Full answer: ${qObj.ans}`,
          steps: ["Step 1: Read the incomplete statement", "Step 2: Identify missing key term", "Step 3: Fill in the blank"],
        };
      }
    }

    // Last resort: return with scaffolded hint
    return {
      ...qObj,
      id: `retry_${Date.now()}`,
      q: qObj.q || qObj.stem,
      hint: qObj.hint || "Focus on core principles and definitions",
      steps: qObj.steps || ["Step 1: Review the concept", "Step 2: Apply key principles", "Step 3: State your answer"],
    };
  }

  // ── Internal Strategy Handlers ─────────────────────────────

  _resolveVariable(config, context) {
    if (!config) return null;
    switch (config.type) {
      case "NUMBER":
        return this._mutateNumber(config);
      case "SELECT":
        return this._mutateSelect(config);
      case "FORMULA":
        return this._evaluateFormula(config.expression, context);
      default:
        return config.value ?? null;
    }
  }

  _mutateNumber({ min = 1, max = 100, step = 1, precision = 0 }) {
    const steps = Math.floor((max - min) / step);
    const randomStep = Math.floor(Math.random() * (steps + 1));
    const val = min + randomStep * step;
    return Number(val.toFixed(precision));
  }

  _mutateSelect({ choices = [] }) {
    if (!choices.length) return "";
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  _evaluateFormula(expression, context) {
    if (!expression) return "";
    const keys = Object.keys(context);
    const values = Object.values(context);
    try {
      const func = new Function(...keys, `return ${expression};`);
      const result = func(...values);
      return Number.isFinite(result) && !Number.isInteger(result)
        ? Number(result.toFixed(2))
        : result;
    } catch (err) {
      console.error(`Failed to evaluate formula: "${expression}"`, err);
      return NaN;
    }
  }

  _interpolateText(template, context) {
    if (!template) return "";
    return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, keyPath) => {
      const parts = keyPath.split(".");
      let val = context;
      for (const part of parts) {
        if (val !== undefined && val !== null) {
          val = val[part];
        } else {
          val = undefined;
          break;
        }
      }
      return val !== undefined && val !== null ? val : `{{${keyPath}}}`;
    });
  }

  _shuffleWithOptions(options, correctIndex) {
    const indexed = options.map((opt, idx) => ({
      value: opt,
      isCorrect: idx === correctIndex,
    }));

    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }

    return {
      options: indexed.map((item) => item.value),
      newCorrectIndex: indexed.findIndex((item) => item.isCorrect),
    };
  }
}

// Global Singleton Instance
export const questionMutator = new QuestionMutator();
