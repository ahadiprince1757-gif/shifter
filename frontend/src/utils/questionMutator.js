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
    let mutator = this._mutators[subjectKey];

    if (!mutator && subjectKey) {
      // Find key that is included in subjectKey or vice-versa
      const matchKey = Object.keys(this._mutators).find(k => subjectKey.includes(k) || k.includes(subjectKey));
      if (matchKey) mutator = this._mutators[matchKey];
    }

    if (mutator) {
      const result = mutator.mutate(blueprint);
      if (result) {
        // Strip any ugly bracket prefixes like [Algebra Practice] or [Physics Parameter Retry]
        let cleanStem = (result.q || result.stem || blueprint.q || blueprint.stem || "").trim();
        cleanStem = cleanStem.replace(/^\[[^\]]+\]\s*/i, "");

        // Format simplified explanation for high clarity
        const rawWhy = result.why || result.explanation || blueprint.why || blueprint.explanation || "";
        const formattedWhy = this._formatSimplifiedExplanation(rawWhy, result.ans || blueprint.ans);

        return {
          id: `${blueprint.id || "q"}_${Date.now()}`,
          originalId: blueprint.id,
          subject: blueprint.subject || subjectName,
          topic: blueprint.topic,
          ...result,
          q: cleanStem,
          stem: cleanStem,
          why: formattedWhy,
          explanation: formattedWhy,
          sol: formattedWhy,
          hint: result.hint || blueprint.hint || "Focus on the core concept definition and key principles.",
          steps: Array.isArray(result.steps) && result.steps.length > 0
            ? result.steps
            : ["Step 1: Identify key values", "Step 2: Apply the fundamental rule", "Step 3: Calculate the answer"],
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

  // ── Generic Fallback: High-Clarity Conceptual Practice ─────

  _genericFallback(qObj) {
    const rawStem = (qObj.q || qObj.stem || "").replace(/^\[[^\]]+\]\s*/i, "");
    const cleanStem = rawStem ? `Practice Question: ${rawStem}` : "Practice Question: Review the core concept below.";
    const answer = qObj.ans || (Array.isArray(qObj.options) ? qObj.options[qObj.correctIndex || 0] : "Correct Answer");

    const simpleWhy = this._formatSimplifiedExplanation(
      qObj.why || qObj.explanation || qObj.sol || `The correct answer is: ${answer}`,
      answer
    );

    return {
      id: `retry_${Date.now()}`,
      originalId: qObj.id,
      subject: qObj.subject,
      topic: qObj.topic,
      q: cleanStem,
      stem: cleanStem,
      options: qObj.options ? [...qObj.options] : undefined,
      correctIndex: qObj.correctIndex,
      ans: answer,
      type: qObj.type || "mcq",
      hint: qObj.hint || `Hint: Focus on the core definition of ${qObj.topic || "this topic"}.`,
      why: simpleWhy,
      explanation: simpleWhy,
      sol: simpleWhy,
      steps: Array.isArray(qObj.steps) && qObj.steps.length > 0
        ? qObj.steps
        : [
            "Step 1: Read the question carefully to identify the target concept",
            "Step 2: Apply the core definition or rule",
            "Step 3: Verify your answer against the key principles"
          ],
    };
  }

  /**
   * Formats explanations into clear, simple, student-friendly sections:
   * 💡 Core Idea | 📝 Step-by-Step Breakdown | ⚠️ Key Takeaway
   */
  _formatSimplifiedExplanation(rawText, correctAnswer) {
    if (!rawText) {
      return `💡 **Core Idea:** The target answer is **${correctAnswer || "shown above"}**.\n\n📝 **How to Solve:** Review the key definition and apply the standard rule step-by-step.`;
    }

    // If already formatted, return as-is
    if (rawText.includes("💡") || rawText.includes("Core Idea")) {
      return rawText;
    }

    const cleanText = rawText.replace(/^Step\s*\d+:\s*/gi, "").trim();

    return `💡 **Core Idea:**\n${cleanText}\n\n📝 **Key Point:**\nMake sure to remember the core definition for **${correctAnswer ? `${correctAnswer}` : "this concept"}** when attempting similar problems.`;
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
