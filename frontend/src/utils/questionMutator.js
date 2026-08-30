/**
 * Universal Diagnostic-Aware Question Mutator
 *
 * Does NOT mutate questions randomly or identically for every student!
 * Analyzes WHERE the learner's understanding broke:
 *   1. BLANK / KNEW NOTHING -> Scaffolded Sub-Step Mutation (breaks problem into 2 guided steps)
 *   2. ARITHMETIC / SIGN ERROR -> Operator Check Mutation (highlights calculation & sign rules)
 *   3. UNIT / NOTATION TYPO -> Notation Highlight Mutation (focuses on standard units & formatting)
 *   4. CONCEPTUAL FORMULA CONFUSION -> Concept Isolation Mutation (isolates the target property definition before calculation)
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

    this.strategies = {
      NUMBER: this._mutateNumber,
      SELECT: this._mutateSelect,
      FORMULA: this._evaluateFormula,
    };
  }

  /**
   * Diagnoses WHERE the student's answer broke.
   *
   * @param {string} studentAnswer
   * @param {string|Array} correctAnswer
   * @param {string} questionText
   * @returns {Object} Diagnostic error classification
   */
  diagnoseMisconception(studentAnswer = "", correctAnswer = "") {
    const sTrim = String(studentAnswer || "").trim();
    const cStr = Array.isArray(correctAnswer) ? correctAnswer[0] : String(correctAnswer || "");
    const cTrim = cStr.trim();

    if (!sTrim) {
      return {
        type: "BLANK_KNEW_NOTHING",
        label: "Zero Attempt / Blank",
        strategy: "SCAFFOLDED_MUTATION",
        guidance: "Learner left answer blank. Providing scaffolded sub-step guidance before full problem.",
      };
    }

    const sNum = parseFloat(sTrim.replace(/[^0-9.-]/g, ""));
    const cNum = parseFloat(cTrim.replace(/[^0-9.-]/g, ""));

    if (!isNaN(sNum) && !isNaN(cNum) && Math.abs(sNum - cNum) < 0.001 && sTrim.toLowerCase() !== cTrim.toLowerCase()) {
      return {
        type: "NOTATION_UNIT_TYPO",
        label: "Unit / Notation Slip",
        strategy: "NOTATION_HIGHLIGHT_MUTATION",
        guidance: "Learner calculated the correct numeric value, but missed standard units or notation formatting.",
      };
    }

    if (!isNaN(sNum) && !isNaN(cNum)) {
      return {
        type: "ARITHMETIC_OPERATIONAL_SLIP",
        label: "Arithmetic / Calculation Error",
        strategy: "OPERATOR_CHECK_MUTATION",
        guidance: "Learner attempted the calculation, but made a sign, order of operations, or arithmetic slip.",
      };
    }

    return {
      type: "CONCEPTUAL_FORMULA_MISCONCEPTION",
      label: "Formula / Concept Confusion",
      strategy: "CONCEPT_ISOLATION_MUTATION",
      guidance: "Learner applied an incorrect rule or formula. Isolating target concept definition before applying new numbers.",
    };
  }

  /**
   * Diagnostic-Aware Mutation Entry Point.
   *
   * @param {Object} blueprint - Original question object
   * @param {Object} [feedback] - Student's feedback object
   * @param {string} [subjectName] - Subject name
   * @returns {Object} Target-mutated question variant
   */
  mutate(blueprint, feedback = null, subjectName = "") {
    if (!blueprint) return null;

    const studentAnswer = feedback?.studentAnswer || feedback?.answer || "";
    const correctAnswer = feedback?.correctAnswer || blueprint.ans || "";

    const diagnosis = this.diagnoseMisconception(studentAnswer, correctAnswer);

    let baseVariant = this._routeToSubjectMutator(blueprint, subjectName);
    if (!baseVariant) {
      baseVariant = this._genericFallback(blueprint);
    }

    return this._applyTargetedDiagnosis(baseVariant, blueprint, diagnosis, correctAnswer);
  }

  _applyTargetedDiagnosis(variant, blueprint, diagnosis, correctAnswer) {
    const rawStem = (variant.q || variant.stem || blueprint.q || blueprint.stem || "").replace(/^\[[^\]]+\]\s*/i, "").trim();
    let cleanStem = this._reframeStructuralRepresentation(rawStem);
    let targetedHint;
    let targetedBanner;

    switch (diagnosis.type) {
      case "BLANK_KNEW_NOTHING":
        targetedBanner = "[Guided Scaffold Variant]";
        cleanStem = `Step-by-Step Practice: First state the formula/rule, then solve: ${cleanStem}`;
        targetedHint = `Scaffolded Hint: Look at what the question asks for, then apply the rule step-by-step.`;
        break;

      case "NOTATION_UNIT_TYPO":
        targetedBanner = "[Unit & Notation Variant]";
        cleanStem = `${cleanStem} (State your answer with standard units)`;
        targetedHint = `Notation Check: Your calculation was close! Make sure to include exact required units or formatting (e.g. ${correctAnswer ? `check unit for ${correctAnswer}` : "units"}).`;
        break;

      case "ARITHMETIC_OPERATIONAL_SLIP":
        targetedBanner = "[Structural Re-Framing Variant]";
        targetedHint = `Calculation Check: Pay special attention to sign rules and order of operations when evaluating.`;
        break;

      case "CONCEPTUAL_FORMULA_MISCONCEPTION":
      default:
        targetedBanner = "[Concept Focus Variant]";
        targetedHint = `Concept Focus: Identify the target formula first before applying numbers.`;
        break;
    }

    const finalHint = targetedHint || variant.hint || blueprint.hint || "";

    // Switch modality away from simple multiple-choice to open response / structural calculation
    // so learners face authentic friction and cannot just guess options.
    return {
      ...variant,
      q: `${targetedBanner} ${cleanStem}`,
      stem: `${targetedBanner} ${cleanStem}`,
      type: "open_response",
      options: null,
      diagnosis,
      targetedBanner,
      hint: finalHint,
    };
  }

  _reframeStructuralRepresentation(rawStem) {
    const multMatch = rawStem.match(/(\d+(?:\.\d+)?)\s*(?:[x×*]|times)\s*(\d+(?:\.\d+)?)/i);
    if (multMatch) {
      const a = multMatch[1];
      const b = multMatch[2];
      return `A rectangle has a length of ${a} units and a width of ${b} units. Calculate its total area.`;
    }

    const divMatch = rawStem.match(/(\d+(?:\.\d+)?)\s*(?:[÷/]|divided\s+by)\s*(\d+(?:\.\d+)?)/i);
    if (divMatch) {
      const a = divMatch[1];
      const b = divMatch[2];
      return `A total quantity of ${a} items is divided equally into ${b} groups. How many items are in each group?`;
    }

    return rawStem;
  }

  _routeToSubjectMutator(blueprint, subjectName) {
    if (blueprint.variables && Object.keys(blueprint.variables).length > 0) {
      return this._mutateFromTemplate(blueprint);
    }

    const subjectKey = (subjectName || blueprint.subject || "").toLowerCase().trim();
    let mutator = this._mutators[subjectKey];

    if (!mutator && subjectKey) {
      const matchKey = Object.keys(this._mutators).find((k) => subjectKey.includes(k) || k.includes(subjectKey));
      if (matchKey) mutator = this._mutators[matchKey];
    }

    if (mutator) {
      return mutator.mutate(blueprint);
    }

    return null;
  }

  // ── Legacy Template Interpolation ──────────────────────────────────────────

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

    const mutatedExplanation =
      instance.explanation || instance.why || instance.sol
        ? this._interpolateText(instance.explanation || instance.why || instance.sol, context)
        : "";

    const correctAnswerText =
      mutatedOptions.length > 0 && correctIndex >= 0 && correctIndex < mutatedOptions.length
        ? mutatedOptions[correctIndex]
        : instance.ans
        ? this._interpolateText(String(instance.ans), context)
        : "";

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

  // ── Generic Fallback ───────────────────────────────────────────────────────

  _genericFallback(qObj) {
    const rawStem = (qObj.q || qObj.stem || "").replace(/^\[[^\]]+\]\s*/i, "");
    const cleanStem = rawStem ? `Practice Question: ${rawStem}` : "Practice Question: Review the core concept below.";
    const answer = qObj.ans || (Array.isArray(qObj.options) ? qObj.options[qObj.correctIndex || 0] : "Correct Answer");

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
      why: qObj.why || qObj.explanation || `The correct answer is: ${answer}`,
      explanation: qObj.why || qObj.explanation || `The correct answer is: ${answer}`,
      sol: qObj.why || qObj.explanation || `The correct answer is: ${answer}`,
      steps: Array.isArray(qObj.steps) && qObj.steps.length > 0 ? qObj.steps : ["Step 1: Read carefully", "Step 2: Apply core rule"],
    };
  }

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
    try {
      let expr = expression;
      Object.entries(context).forEach(([k, v]) => {
        expr = expr.replace(new RegExp(`\\b${k}\\b`, "g"), v);
      });
      return Function(`"use strict"; return (${expr})`)();
    } catch {
      return 0;
    }
  }

  _shuffleWithOptions(options, correctIndex) {
    const indexed = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex }));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    return {
      options: indexed.map((item) => item.opt),
      newCorrectIndex: indexed.findIndex((item) => item.isCorrect),
    };
  }

  _interpolateText(text, context) {
    let result = text;
    Object.entries(context).forEach(([k, v]) => {
      result = result.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    });
    return result;
  }
}

export const questionMutator = new QuestionMutator();
