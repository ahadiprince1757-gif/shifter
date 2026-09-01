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
import { CbcRubricEvaluator } from "./cbcRubricEvaluator.js";
import { ProveItEngine } from "./proveItEngine.js";

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

    const isIrrelevantOrNoIdea = 
      !sTrim || 
      /^(idk|i\s*don'?t\s*know|no\s*idea|pass|skip|dunno|idfk|help|\?+|\.+|nothing|none|xyz|abc|asdf|qwerty|i\s*do\s*not\s*know|not\s*sure|whatever)$/i.test(sTrim) ||
      (sTrim.length <= 2 && !/^\d+$/.test(sTrim));

    if (isIrrelevantOrNoIdea) {
      return {
        type: "IRRELEVANT_KNEW_NOTHING",
        label: "Irrelevant / Knew Nothing",
        strategy: "SCAFFOLDED_MUTATION",
        guidance: "Learner entered an irrelevant answer or expressed having no idea. Providing scaffolded sub-step guidance before full problem.",
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
    let cleanStem = (variant.q || variant.stem || blueprint.q || blueprint.stem || "")
      .replace(/^\[[^\]]+\]\s*/i, "")
      .replace(/^step-by-step practice:\s*/i, "")
      .trim();

    cleanStem = this._reframeStructuralRepresentation(cleanStem);

    // Guarantee parameter variation if stem numbers match blueprint numbers
    cleanStem = this._ensureParameterVariation(cleanStem, blueprint);

    let targetedHint;
    let targetedTag;

    switch (diagnosis.type) {
      case "IRRELEVANT_KNEW_NOTHING":
      case "BLANK_KNEW_NOTHING":
        targetedTag = "Scaffolded Variant";
        targetedHint = `Scaffolded Hint: Review the required rule or formula, then solve step-by-step.`;
        break;

      case "NOTATION_UNIT_TYPO":
        targetedTag = "Notation Check";
        if (!/\b(unit|cm|m|kg|ksh|\$)\b/i.test(cleanStem)) {
          cleanStem = `${cleanStem} (Include standard units)`;
        }
        targetedHint = `Notation Check: Ensure your answer includes exact required units or formatting ${correctAnswer ? `(Target format: ${correctAnswer})` : ""}.`;
        break;

      case "ARITHMETIC_OPERATIONAL_SLIP":
        targetedTag = "Calculation Check";
        targetedHint = `Calculation Check: Pay special attention to sign rules and operational steps.`;
        break;

      case "CONCEPTUAL_FORMULA_MISCONCEPTION":
      default:
        targetedTag = "Concept Focus";
        targetedHint = `Concept Focus: Identify the target formula or principle first before evaluating.`;
        break;
    }

    const finalHint = targetedHint || variant.hint || blueprint.hint || "";
    const rawOptions = Array.isArray(variant.options) && variant.options.length > 0 ? variant.options : null;
    const requestedType = variant.type || blueprint.type || "open_response";
    const finalType = (requestedType === "mcq" && !rawOptions)
      ? (blueprint.type === "calc" || variant.type === "calc" ? "calc" : "open_response")
      : requestedType;

    const level = blueprint._attemptCount ? Math.min(3, blueprint._attemptCount + 1) : 1;
    const rubricEval = CbcRubricEvaluator.evaluateAttempt({
      isCorrect: false,
      level,
      diagnosis
    });

    const proveItState = ProveItEngine.getLadderState({
      level,
      attempts: blueprint._attempts || []
    });

    return {
      ...variant,
      q: cleanStem,
      stem: cleanStem,
      type: finalType,
      options: finalType === "mcq" ? rawOptions : null,
      diagnosis,
      targetedTag,
      hint: finalHint,
      rubricEval,
      proveItState
    };
  }

  _ensureParameterVariation(cleanStem, blueprint) {
    const origStem = blueprint.q || blueprint.stem || "";
    const origNums = origStem.match(/\b\d+(?:\.\d+)?\b/g);
    const currNums = cleanStem.match(/\b\d+(?:\.\d+)?\b/g);

    if (origNums && currNums && origNums.join(",") === currNums.join(",")) {
      // Numbers are identical to original — vary the numbers!
      const scale = (Math.floor(Math.random() * 3) + 2); // scale by 2, 3, or 4
      return cleanStem.replace(/\b\d+(?:\.\d+)?\b/g, (match) => {
        const val = parseFloat(match);
        if (val >= 1000) return (val * scale).toLocaleString();
        if (val > 1) return String(val * scale);
        return match;
      });
    }
    return cleanStem;
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
      const modalityIndex = typeof blueprint._attemptCount === "number" ? blueprint._attemptCount : Math.floor(Math.random() * 4);
      return mutator.mutate(blueprint, modalityIndex);
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
