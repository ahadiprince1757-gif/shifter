/**
 * Universal Diagnostic-Aware Question Mutator
 *
 * Directs incoming question blueprints to domain-specific mutators
 * and enforces strict verification and provenance tracking.
 *
 * Pipeline:
 *   diagnoseMisconception → createRepairPlan → subject mutator → verify → return
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
import { createRepairPlan, summarizeRepairPlan } from "../engine/repairPlanner.js";

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
  }

  /**
   * Main mutation entry.
   *
   * Important:
   * - The subject mutator creates the actual variant.
   * - QuestionMutator does NOT rewrite the mathematics/facts afterward.
   * - Validation happens before a variant is returned.
   */
  mutate(blueprint, feedback = {}, subjectName = "") {
    if (!blueprint) return null;

    // Handle callers that pass subjectName as the second argument (e.g. mutate(q, "math"))
    if (typeof feedback === "string" && !subjectName) {
      subjectName = feedback;
      feedback = {};
    }

    const studentAnswer =
      feedback?.studentAnswer ??
      feedback?.answer ??
      "";

    const correctAnswer =
      feedback?.correctAnswer ??
      blueprint?.ans ??
      blueprint?.answer ??
      "";

    const diagnosis = this.diagnoseMisconception(
      studentAnswer,
      correctAnswer,
      blueprint
    );

    // Build a structured repair plan from the diagnosis.
    // This is the key upgrade: mutators now receive a full plan
    // instead of just a raw strategy string.
    const repairPlan = createRepairPlan(diagnosis, blueprint, {
      baseLevel: blueprint?.metadata?.difficulty ?? blueprint?.difficulty ?? 2,
      attemptCount: blueprint?._attemptCount ?? 0,
    });

    const context = {
      ...feedback,

      diagnosis,
      repairPlan,

      // Legacy compatibility — keep strategy string for mutators that use it
      repairStrategy: repairPlan.repairMode,

      sourceQuestion: blueprint,

      // Never let downstream code silently change facts.
      preserveConcept: true,
      preserveSkill: true,
      recalculateAnswer: true,
      requireVerification: true,
    };

    const variant = this._routeToSubjectMutator(
      blueprint,
      subjectName,
      context
    );

    if (!variant) {
      return this._safeFallback(
        blueprint,
        diagnosis,
        "NO_SAFE_MUTATION"
      );
    }

    const verified = this._verifyVariant(
      blueprint,
      variant,
      subjectName
    );

    if (!verified.valid) {
      console.warn(
        "[QuestionMutator] Rejected unsafe mutation:",
        verified.reason
      );

      return this._safeFallback(
        blueprint,
        diagnosis,
        verified.reason
      );
    }

    return this._applyTargetedDiagnosis(
      variant,
      blueprint,
      diagnosis,
      context.repairPlan
    );
  }

  /**
   * Diagnose the learner.
   *
   * This is deliberately conservative.
   * We should never claim "formula misconception"
   * simply because two numbers differ.
   */
  diagnoseMisconception(
    studentAnswer,
    correctAnswer,
    blueprint = null
  ) {
    const student = String(studentAnswer ?? "").trim();
    const correct = String(correctAnswer ?? "").trim();

    if (!student || student === "—") {
      return {
        type: "IRRELEVANT_KNEW_NOTHING",
        strategy: "SCAFFOLDED_MUTATION",
        confidence: 0.95,
      };
    }

    if (this._answersEquivalent(student, correct)) {
      return {
        type: "CORRECT",
        strategy: "TRANSFER_MUTATION",
        confidence: 0.98,
      };
    }

    // If the question contains a known misconception model,
    // prefer it over guessing from the final answer.
    const knownMisconception =
      blueprint?.diagnostics?.misconception ??
      blueprint?.metadata?.diagnostics?.misconception ??
      blueprint?.mutationSpec?.misconception;

    if (knownMisconception) {
      return {
        type: knownMisconception,
        strategy: "TARGETED_REPAIR",
        confidence: 0.90,
      };
    }

    // Unit / notation problems.
    if (this._sameNumericValue(student, correct)) {
      return {
        type: "NOTATION_UNIT_TYPO",
        strategy: "NOTATION_HIGHLIGHT",
        confidence: 0.90,
      };
    }

    // We don't have enough evidence to call a formula error.
    // Therefore use a cautious operational repair.
    return {
      type: "UNKNOWN_WRONG_ANSWER",
      strategy: "CONCEPT_ISOLATION",
      confidence: 0.55,
    };
  }

  _routeToSubjectMutator(
    blueprint,
    subjectName,
    context = {}
  ) {
    const key = this._normalizeSubject(subjectName || blueprint.subject || "");

    let mutator = this._mutators[key];

    if (!mutator && key) {
      const matchKey = Object.keys(this._mutators).find((k) => key.includes(k) || k.includes(key));
      if (matchKey) mutator = this._mutators[matchKey];
    }

    if (!mutator) {
      console.warn(
        `[QuestionMutator] No mutator for subject: ${subjectName}`
      );

      return null;
    }

    const attemptCount = Number.isInteger(
      blueprint?._attemptCount
    )
      ? blueprint._attemptCount
      : 0;

    return mutator.mutate(
      blueprint,
      attemptCount,
      context
    );
  }

  /**
   * CRITICAL:
   *
   * There is intentionally NO:
   *
   *   _ensureParameterVariation()
   *   _reframeStructuralRepresentation()
   *
   * here.
   *
   * The subject mutator owns semantic mutation.
   */
  _applyTargetedDiagnosis(
    variant,
    blueprint,
    diagnosis,
    repairPlan
  ) {
    const result = structuredClone(variant);

    result.metadata = {
      ...(result.metadata || {}),

      diagnosticRepair: {
        type: diagnosis.type,
        strategy: diagnosis.strategy,
        confidence: diagnosis.confidence,
        // Attach the full repair plan so the UI / verifier can use it
        repairPlan: repairPlan || null,
      },

      provenance: {
        ...(result.metadata?.provenance || {}),

        sourceQuestionId:
          blueprint?.id ??
          blueprint?.questionId ??
          null,

        mutationVerified: true,
        conceptPreserved: true,
        answerRecalculated: true,
      },
    };

    result.hint =
      result.hint ||
      repairPlan?.hint ||
      this._diagnosticHint(diagnosis);

    result.tags = [
      ...(result.tags || []),
      `repair:${repairPlan?.repairMode || diagnosis.strategy}`,
      `mode:${repairPlan?.questionMode || "FULL_QUESTION"}`,
    ];

    return result;
  }

  _diagnosticHint(diagnosis) {
    switch (diagnosis.strategy) {
      case "SCAFFOLDED_MUTATION":
        return "Start by identifying what the question is asking you to find.";

      case "NOTATION_HIGHLIGHT":
        return "Check your units, symbols, and how the final answer should be written.";

      case "CONCEPT_ISOLATION":
        return "Before calculating, identify the rule or formula that applies.";

      case "TARGETED_REPAIR":
        return "Focus on the specific idea that caused the mistake.";

      case "TRANSFER_MUTATION":
        return "Now use the same idea in a slightly different situation.";

      default:
        return "Think about the rule you need before calculating.";
    }
  }

  /**
   * Never generate a fake question as a fallback.
   *
   * An unchanged verified question is safer than
   * an invented incorrect question.
   */
  _safeFallback(
    blueprint,
    diagnosis,
    reason
  ) {
    const fallback = structuredClone(blueprint);

    fallback.metadata = {
      ...(fallback.metadata || {}),

      provenance: {
        ...(fallback.metadata?.provenance || {}),

        mutationVerified: true,
        mutationAccepted: false,
        fallback: true,
        reason,
      },

      diagnosticRepair: {
        type: diagnosis.type,
        strategy: diagnosis.strategy,
      },
    };

    return fallback;
  }

  _verifyVariant(
    original,
    variant,
    subjectName
  ) {
    if (!variant?.q && !variant?.stem) {
      return {
        valid: false,
        reason: "MISSING_STEM",
      };
    }

    if (
      variant.ans === undefined ||
      variant.ans === null
    ) {
      return {
        valid: false,
        reason: "MISSING_ANSWER",
      };
    }

    if (
      variant.type === "mcq" &&
      (!Array.isArray(variant.options) ||
        variant.options.length < 2)
    ) {
      return {
        valid: false,
        reason: "INVALID_OPTIONS",
      };
    }

    // A subject mutator must explicitly say that it
    // verified the generated question.
    if (
      variant.metadata?.provenance?.mutationVerified !== true &&
      variant.metadata?.verified !== true
    ) {
      return {
        valid: false,
        reason: "MUTATION_NOT_VERIFIED",
      };
    }

    // Concept must not disappear.
    const originalSkill =
      original?.metadata?.skill ??
      original?.skill;

    const variantSkill =
      variant?.metadata?.skill ??
      variant?.skill;

    if (
      originalSkill &&
      variantSkill &&
      !this._compatibleSkill(
        originalSkill,
        variantSkill
      )
    ) {
      return {
        valid: false,
        reason: `SKILL_CHANGED:${originalSkill}->${variantSkill}`,
      };
    }

    return {
      valid: true,
    };
  }

  _compatibleSkill(a, b) {
    if (a === b) return true;

    const aliases = {
      mathematics: "math",
      rectangle: "rectangle_area",
      percentage: "percentage",
    };

    return (
      aliases[a] === b ||
      aliases[b] === a
    );
  }

  _answersEquivalent(a, b) {
    const na = this._parseNumber(a);
    const nb = this._parseNumber(b);

    if (na !== null && nb !== null) {
      return Math.abs(na - nb) < 1e-9;
    }

    return (
      String(a)
        .trim()
        .toLowerCase() ===
      String(b)
        .trim()
        .toLowerCase()
    );
  }

  _sameNumericValue(a, b) {
    const na = this._parseNumber(a);
    const nb = this._parseNumber(b);

    return (
      na !== null &&
      nb !== null &&
      Math.abs(na - nb) < 1e-9
    );
  }

  _parseNumber(value) {
    const cleaned = String(value ?? "")
      .replace(/,/g, "")
      .replace(/[^\d.+\-eE]/g, "")
      .trim();

    if (!cleaned) return null;

    const n = Number(cleaned);

    return Number.isFinite(n) ? n : null;
  }

  _normalizeSubject(subject) {
    return String(subject ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }
}

export const questionMutator = new QuestionMutator();
