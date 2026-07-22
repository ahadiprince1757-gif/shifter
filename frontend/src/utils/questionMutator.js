/**
 * Universal Client-Side Question Mutator
 * Zero dependencies | Offline-first | Subject-agnostic
 */

export class QuestionMutator {
  constructor() {
    // Registered mutation strategies
    this.strategies = {
      NUMBER: this._mutateNumber,
      SELECT: this._mutateSelect,
      FORMULA: this._evaluateFormula,
    };
  }

  /**
   * Main entry point: takes a question blueprint and returns a fully mutated, printable question object.
   */
  mutate(blueprint) {
    if (!blueprint) return null;

    // 1. Create a deep copy of the blueprint to avoid mutating the original template
    const instance = JSON.parse(JSON.stringify(blueprint));
    const context = {};

    // 2. Resolve all variables defined in the blueprint
    if (instance.variables) {
      Object.entries(instance.variables).forEach(([varName, config]) => {
        context[varName] = this._resolveVariable(config, context);
      });
    }

    // 3. Mutate the question stem text
    const mutatedStem = this._interpolateText(instance.stem || instance.q || "", context);

    // 4. Mutate and shuffle options (if multiple choice)
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

      // Securely shuffle options and recalculate correct answer index
      const shuffled = this._shuffleWithOptions(processedOptions, correctIndex);
      mutatedOptions = shuffled.options;
      correctIndex = shuffled.newCorrectIndex;
    }

    // 5. Generate dynamic explanation/feedback
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

  // --- Internal Strategy Handlers ---

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
      // Support dot notation like scenario.function
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

    // Fisher-Yates shuffle algorithm
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
