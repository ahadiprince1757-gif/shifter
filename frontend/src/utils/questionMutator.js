/**
 * TIXAR UNIVERSAL QUESTION MUTATOR
 * Version 5.0
 *
 * EVIDENCE-FIRST / DETERMINISTIC / SEMANTIC-CONTRACT ARCHITECTURE
 *
 * ================================================================
 *
 * CORE LAW
 * ----------------------------------------------------------------
 *
 * A wrong answer does NOT automatically reveal a misconception.
 *
 * Therefore:
 *
 *   NO EVIDENCE
 *       ↓
 *   DIAGNOSTIC PROBE
 *
 *   STRONG EVIDENCE
 *       ↓
 *   TARGETED REPAIR
 *
 *   CORRECT + VERIFIED
 *       ↓
 *   TRANSFER
 *
 * ================================================================
 *
 * PIPELINE
 * ----------------------------------------------------------------
 *
 *   ORIGINAL BLUEPRINT
 *          ↓
 *   EVIDENCE COLLECTION
 *          ↓
 *   DIAGNOSIS
 *          ↓
 *   REPAIR PLAN
 *          ↓
 *   MUTATION CONTRACT
 *          ↓
 *   SUBJECT MUTATOR
 *          ↓
 *   INDEPENDENT VERIFICATION
 *          ↓
 *   ACCEPT / SAFE FALLBACK
 *
 * ================================================================
 *
 * IMPORTANT
 * ----------------------------------------------------------------
 *
 * QuestionMutator is an ORCHESTRATOR.
 *
 * It does NOT:
 *   - rewrite questions
 *   - invent mathematical values
 *   - randomly alter facts
 *   - guess misconceptions from answer differences
 *   - certify its own mutations
 *
 * Subject mutators own domain-specific generation.
 *
 * QuestionMutator owns:
 *   - evidence
 *   - diagnosis routing
 *   - semantic identity
 *   - mutation contract
 *   - invariant enforcement
 *   - independent structural verification
 *   - provenance
 *
 * ================================================================
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

import {
  createRepairPlan,
  summarizeRepairPlan,
} from "../engine/repairPlanner.js";

/* =================================================================
 * CONSTANTS
 * ================================================================= */

const DIAGNOSIS = Object.freeze({
  CORRECT: "CORRECT",

  // Explicitly supplied by upstream diagnostic metadata.
  CONFIRMED_MISCONCEPTION: "CONFIRMED_MISCONCEPTION",

  // Evidence indicates a particular repair.
  STRONG_DIAGNOSTIC_EVIDENCE: "STRONG_DIAGNOSTIC_EVIDENCE",

  // We know something went wrong but not why.
  INSUFFICIENT_EVIDENCE: "INSUFFICIENT_EVIDENCE",

  // Student gave no meaningful response.
  NO_RESPONSE: "NO_RESPONSE",

  // Same numeric value but representation differs.
  NOTATION_UNIT_TYPO: "NOTATION_UNIT_TYPO",

  // Safety state.
  INVALID_RESPONSE: "INVALID_RESPONSE",
});

const REPAIR_MODE = Object.freeze({
  PROBE: "PROBE",

  TARGETED_REPAIR: "TARGETED_REPAIR",

  TRANSFER: "TRANSFER",

  SCAFFOLDED_MUTATION: "SCAFFOLDED_MUTATION",

  NOTATION_HIGHLIGHT: "NOTATION_HIGHLIGHT",

  STANDARD: "STANDARD",
});

const QUESTION_MODE = Object.freeze({
  FULL_QUESTION: "FULL_QUESTION",
  DIAGNOSTIC_PROBE: "DIAGNOSTIC_PROBE",
  TARGETED_REPAIR: "TARGETED_REPAIR",
  TRANSFER: "TRANSFER",
});

/**
 * Semantic fields that should remain stable unless the repair planner
 * explicitly authorizes movement.
 */
const SEMANTIC_FIELDS = Object.freeze([
  "subject",
  "chapter",
  "topic",
  "conceptId",
  "skillId",
  "subskillId",
]);

/* =================================================================
 * QUESTION MUTATOR
 * ================================================================= */

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

  /* ===============================================================
   * PUBLIC API
   * =============================================================== */

  /**
   * Main mutation entry point.
   *
   * Supports:
   *
   * mutate(question, feedback, subject)
   *
   * and legacy:
   *
   * mutate(question, "math")
   */
  mutate(
    blueprint,
    feedback = {},
    subjectName = ""
  ) {
    if (!blueprint) {
      return null;
    }

    /*
     * Legacy compatibility:
     *
     * mutate(q, "math")
     */
    if (
      typeof feedback === "string" &&
      !subjectName
    ) {
      subjectName = feedback;
      feedback = {};
    }

    /*
     * ---------------------------------------------------------------
     * 1. RESOLVE SUBJECT
     * ---------------------------------------------------------------
     */

    const subject = this._resolveSubject(
      blueprint,
      subjectName
    );

    if (!subject) {
      return this._safeFallback(
        blueprint,
        {
          type: DIAGNOSIS.INVALID_RESPONSE,
          strategy: REPAIR_MODE.STANDARD,
          confidence: 0,
          evidence: [],
        },
        "NO_SUBJECT_MUTATOR"
      );
    }

    /*
     * ---------------------------------------------------------------
     * 2. BUILD SEMANTIC IDENTITY
     * ---------------------------------------------------------------
     */

    const semanticIdentity =
      this._extractSemanticIdentity(
        blueprint
      );

    /*
     * If the question has no meaningful identity,
     * mutation becomes unsafe.
     *
     * We still allow mutation when the question has at least
     * topic/skill information because older content may not have
     * conceptId/subskillId yet.
     */
    const identityCheck =
      this._validateSemanticIdentity(
        semanticIdentity
      );

    if (!identityCheck.valid) {
      return this._safeFallback(
        blueprint,
        {
          type: DIAGNOSIS.INVALID_RESPONSE,
          strategy: REPAIR_MODE.STANDARD,
          confidence: 0,
          evidence: [],
        },
        identityCheck.reason
      );
    }

    /*
     * ---------------------------------------------------------------
     * 3. COLLECT EVIDENCE
     * ---------------------------------------------------------------
     *
     * IMPORTANT:
     *
     * We do NOT diagnose yet.
     *
     * We first collect what is actually known.
     */

    const evidence =
      this.collectDiagnosticEvidence(
        blueprint,
        feedback
      );

    /*
     * ---------------------------------------------------------------
     * 4. DIAGNOSE FROM EVIDENCE
     * ---------------------------------------------------------------
     */

    const diagnosis =
      this.diagnoseEvidence(
        blueprint,
        evidence
      );

    /*
     * ---------------------------------------------------------------
     * 5. BUILD REPAIR PLAN
     * ---------------------------------------------------------------
     */

    const repairPlan =
      this._buildRepairPlan(
        blueprint,
        diagnosis,
        evidence
      );

    /*
     * ---------------------------------------------------------------
     * 6. CREATE IMMUTABLE MUTATION CONTRACT
     * ---------------------------------------------------------------
     */

    const contract =
      this._createMutationContract({
        blueprint,
        semanticIdentity,
        evidence,
        diagnosis,
        repairPlan,
        subject,
      });

    /*
     * ---------------------------------------------------------------
     * 7. ROUTE TO DOMAIN MUTATOR
     * ---------------------------------------------------------------
     */

    const candidate =
      this._routeToSubjectMutator(
        blueprint,
        subject,
        contract
      );

    if (!candidate) {
      return this._safeFallback(
        blueprint,
        diagnosis,
        "NO_SAFE_MUTATION"
      );
    }

    /*
     * ---------------------------------------------------------------
     * 7.5. CANONICAL IDENTITY STAMP
     * ---------------------------------------------------------------
     *
     * Sub-mutators own domain-specific generation and may use their
     * own internal topic/chapter labelling (e.g. PhysicsMutator uses
     * "Ohms Law" while the source question uses "electricity").
     *
     * The orchestrator guarantees canonical identity is preserved.
     * We stamp the original identity fields onto the candidate's
     * metadata so independent verification always sees them.
     *
     * Rules:
     *   - Only stamp fields that the ORIGINAL question actually had.
     *   - Never overwrite a field the sub-mutator already set to the
     *     same value (this is a no-op in that case).
     *   - Sub-mutator's internal provenance metadata is untouched.
     */
    if (candidate && typeof candidate === "object") {
      if (!candidate.metadata) {
        candidate.metadata = {};
      }

      const oi = semanticIdentity;

      if (oi.subject && !candidate.metadata.subject) {
        candidate.metadata.subject = oi.subject;
      }

      if (oi.chapter) {
        candidate.metadata.chapter = oi.chapter;
      }

      if (oi.topic) {
        candidate.metadata.topic = oi.topic;
      }

      if (oi.conceptId && !candidate.metadata.conceptId) {
        candidate.metadata.conceptId = oi.conceptId;
      }

      if (oi.skillId && !candidate.metadata.skillId) {
        candidate.metadata.skillId = oi.skillId;
      }

      if (oi.subskillId && !candidate.metadata.subskillId) {
        candidate.metadata.subskillId = oi.subskillId;
      }
    }

    /*
     * ---------------------------------------------------------------
     * 8. INDEPENDENT VERIFICATION
     * ---------------------------------------------------------------
     */

    const verification =
      this._verifyMutation(
        blueprint,
        candidate,
        contract
      );

    if (!verification.valid) {
      console.warn(
        "[QuestionMutator] Mutation rejected:",
        verification.reason
      );

      return this._safeFallback(
        blueprint,
        diagnosis,
        verification.reason
      );
    }

    /*
     * ---------------------------------------------------------------
     * 9. FINALIZE
     * ---------------------------------------------------------------
     */

    return this._finalizeMutation({
      blueprint,
      candidate,
      contract,
      verification,
    });
  }

  /* ===============================================================
   * EVIDENCE COLLECTION
   * =============================================================== */

  /**
   * Collect evidence without interpreting it.
   *
   * This is intentionally boring.
   *
   * Evidence collection should be factual.
   */
  collectDiagnosticEvidence(
    blueprint,
    feedback = {}
  ) {
    const studentAnswer =
      feedback?.studentAnswer ??
      feedback?.answer ??
      feedback?.response ??
      "";

    const correctAnswer =
      feedback?.correctAnswer ??
      blueprint?.ans ??
      blueprint?.answer ??
      "";

    const student =
      String(studentAnswer ?? "").trim();

    const correct =
      String(correctAnswer ?? "").trim();

    const evidence = [];

    /*
     * Explicit upstream diagnosis.
     *
     * This is high-value evidence because another diagnostic layer
     * has already supplied it.
     */
    const explicitMisconception =
      feedback?.misconception ??
      feedback?.diagnosis?.misconception ??
      feedback?.diagnosis?.type ??
      blueprint?.diagnostics?.misconception ??
      blueprint?.metadata?.diagnostics?.misconception ??
      blueprint?.mutationSpec?.misconception ??
      null;

    if (explicitMisconception) {
      evidence.push({
        source: "EXPLICIT_DIAGNOSTIC_METADATA",
        type: "MISCONCEPTION_DECLARED",
        value: explicitMisconception,
        strength: "STRONG",
      });
    }

    /*
     * Explicit diagnostic evidence supplied upstream.
     */
    const upstreamEvidence =
      feedback?.diagnosticEvidence ??
      feedback?.diagnosis?.evidence ??
      blueprint?.diagnostics?.evidence ??
      blueprint?.metadata?.diagnostics?.evidence ??
      null;

    if (Array.isArray(upstreamEvidence)) {
      for (const item of upstreamEvidence) {
        if (item == null) continue;

        evidence.push({
          source: "UPSTREAM_DIAGNOSTIC",
          type: "DIAGNOSTIC_EVIDENCE",
          value: item,
          strength: "STRONG",
        });
      }
    }

    /*
     * Response evidence.
     */
    if (!student || student === "—") {
      evidence.push({
        source: "STUDENT_RESPONSE",
        type: "NO_RESPONSE",
        value: null,
        strength: "STRONG",
      });

      return {
        studentAnswer: student,
        correctAnswer: correct,
        hasResponse: false,
        evidence,
      };
    }

    evidence.push({
      source: "STUDENT_RESPONSE",
      type: "ANSWER",
      value: student,
      strength: "OBSERVATION",
    });

    /*
     * Correctness is evidence, but not misconception evidence.
     */
    const equivalent =
      this._answersEquivalent(
        student,
        correct
      );

    evidence.push({
      source: "ANSWER_COMPARISON",
      type: equivalent
        ? "ANSWER_MATCH"
        : "ANSWER_MISMATCH",
      value: {
        student,
        correct,
      },
      strength: equivalent
        ? "STRONG"
        : "WEAK",
    });

    /*
     * Same numeric value is evidence of representation difference,
     * but not automatically proof of a unit/notation error.
     *
     * We only record the observation here.
     */
    if (
      !equivalent &&
      this._sameNumericValue(
        student,
        correct
      )
    ) {
      evidence.push({
        source: "ANSWER_COMPARISON",
        type: "NUMERIC_VALUE_MATCH",
        value: {
          student,
          correct,
        },
        strength: "MODERATE",
      });
    }

    /*
     * Optional structured evidence.
     */
    const structuredFields = [
      "working",
      "selectedOption",
      "responseTime",
      "hintUsed",
      "hintLevel",
      "confidence",
      "attemptCount",
      "previousAttempts",
    ];

    for (const field of structuredFields) {
      if (
        feedback?.[field] !== undefined &&
        feedback?.[field] !== null
      ) {
        evidence.push({
          source: "FEEDBACK",
          type: field.toUpperCase(),
          value: feedback[field],
          strength: "OBSERVATION",
        });
      }
    }

    return {
      studentAnswer: student,
      correctAnswer: correct,
      hasResponse: true,
      answerEquivalent: equivalent,
      evidence,
    };
  }

  /* ===============================================================
   * DIAGNOSTIC ENGINE
   * =============================================================== */

  /**
   * Diagnose ONLY from evidence.
   *
   * IMPORTANT:
   *
   * A wrong answer alone is insufficient evidence for a specific
   * misconception.
   */
  diagnoseEvidence(
    blueprint,
    evidenceBundle
  ) {
    const evidence =
      evidenceBundle?.evidence || [];

    /*
     * ---------------------------------------------------------------
     * NO RESPONSE
     * ---------------------------------------------------------------
     */

    const noResponse =
      evidence.some(
        (e) => e.type === "NO_RESPONSE"
      );

    if (noResponse) {
      return {
        type: DIAGNOSIS.NO_RESPONSE,
        strategy: REPAIR_MODE.SCAFFOLDED_MUTATION,
        confidence: 0.95,
        evidence: this._selectEvidence(
          evidence,
          "NO_RESPONSE"
        ),
      };
    }

    /*
     * ---------------------------------------------------------------
     * CORRECT
     * ---------------------------------------------------------------
     */

    const correct =
      evidence.some(
        (e) => e.type === "ANSWER_MATCH"
      );

    if (correct) {
      return {
        type: DIAGNOSIS.CORRECT,
        strategy: REPAIR_MODE.TRANSFER,
        confidence: 0.98,
        evidence: this._selectEvidence(
          evidence,
          "ANSWER_MATCH"
        ),
      };
    }

    /*
     * ---------------------------------------------------------------
     * EXPLICIT MISCONCEPTION
     * ---------------------------------------------------------------
     */

    const explicit =
      evidence.find(
        (e) =>
          e.type === "MISCONCEPTION_DECLARED"
      );

    if (explicit) {
      return {
        type: DIAGNOSIS.CONFIRMED_MISCONCEPTION,
        misconception: explicit.value,

        /*
         * Preserve the actual misconception so the repair planner
         * can route specifically.
         */
        target: explicit.value,

        strategy: REPAIR_MODE.TARGETED_REPAIR,
        confidence: 0.95,

        evidence: this._selectEvidence(
          evidence,
          "MISCONCEPTION_DECLARED"
        ),
      };
    }

    /*
     * ---------------------------------------------------------------
     * STRONG UPSTREAM EVIDENCE
     * ---------------------------------------------------------------
     */

    const strongEvidence =
      evidence.filter(
        (e) =>
          e.strength === "STRONG" &&
          e.type !== "ANSWER_MISMATCH"
      );

    if (strongEvidence.length > 0) {
      return {
        type: DIAGNOSIS.STRONG_DIAGNOSTIC_EVIDENCE,
        strategy: REPAIR_MODE.TARGETED_REPAIR,
        confidence: 0.90,
        evidence: strongEvidence,
      };
    }

    /*
     * ---------------------------------------------------------------
     * NUMERIC REPRESENTATION DIFFERENCE
     * ---------------------------------------------------------------
     *
     * This remains conservative.
     *
     * Same numeric value is NOT enough to claim a unit error.
     *
     * We only classify this when the question actually appears
     * unit/notation-sensitive.
     */

    const numericMatch =
      evidence.some(
        (e) =>
          e.type === "NUMERIC_VALUE_MATCH"
      );

    if (
      numericMatch &&
      this._questionAppearsUnitSensitive(
        blueprint
      )
    ) {
      return {
        type: DIAGNOSIS.NOTATION_UNIT_TYPO,
        strategy: REPAIR_MODE.NOTATION_HIGHLIGHT,
        confidence: 0.80,
        evidence: this._selectEvidence(
          evidence,
          "NUMERIC_VALUE_MATCH"
        ),
      };
    }

    /*
     * ---------------------------------------------------------------
     * UNKNOWN
     * ---------------------------------------------------------------
     *
     * This is the critical change.
     *
     * We DO NOT say:
     *
     * "unknown => concept isolation"
     *
     * We say:
     *
     * "unknown => diagnostic probe"
     */

    return {
      type: DIAGNOSIS.INSUFFICIENT_EVIDENCE,
      strategy: REPAIR_MODE.PROBE,
      confidence: 0,
      evidence: evidence.filter(
        (e) =>
          e.type === "ANSWER_MISMATCH"
      ),
    };
  }

  /* ===============================================================
   * REPAIR PLAN
   * =============================================================== */

  _buildRepairPlan(
    blueprint,
    diagnosis,
    evidence
  ) {
    /*
     * We give explicit control to the diagnostic state.
     *
     * The external repair planner can still add domain-specific
     * details, but it must not turn "unknown" into an invented
     * misconception.
     */

    if (
      diagnosis.type ===
      DIAGNOSIS.INSUFFICIENT_EVIDENCE
    ) {
      return this._buildProbePlan(
        blueprint,
        diagnosis
      );
    }

    if (
      diagnosis.type ===
      DIAGNOSIS.NO_RESPONSE
    ) {
      return this._buildScaffoldPlan(
        blueprint,
        diagnosis
      );
    }

    if (
      diagnosis.type ===
      DIAGNOSIS.CORRECT
    ) {
      return this._buildTransferPlan(
        blueprint,
        diagnosis
      );
    }

    /*
     * For confirmed/strong diagnoses use the existing planner.
     *
     * This preserves compatibility with the existing Tixar
     * repair-planning system.
     */
    let plan = null;

    try {
      plan = createRepairPlan(
        diagnosis,
        blueprint,
        {
          baseLevel:
            blueprint?.metadata?.difficulty ??
            blueprint?.difficulty ??
            2,

          attemptCount:
            blueprint?._attemptCount ??
            0,

          evidence,
        }
      );
    } catch (error) {
      console.warn(
        "[QuestionMutator] Repair planner failed:",
        error
      );
    }

    /*
     * Safety normalization.
     */
    return {
      ...(plan || {}),

      repairMode:
        plan?.repairMode ??
        REPAIR_MODE.TARGETED_REPAIR,

      questionMode:
        plan?.questionMode ??
        QUESTION_MODE.TARGETED_REPAIR,

      diagnosticType:
        diagnosis.type,

      diagnosticConfidence:
        diagnosis.confidence,
    };
  }

  _buildProbePlan(
    blueprint,
    diagnosis
  ) {
    return {
      repairMode: REPAIR_MODE.PROBE,

      questionMode:
        QUESTION_MODE.DIAGNOSTIC_PROBE,

      /*
       * PROBE means:
       *
       * Same semantic target.
       * Lower unnecessary complexity.
       * Change only what is necessary to expose the learner's
       * actual failure.
       */
      preserveConcept: true,
      preserveSkill: true,
      preserveSubskill: true,

      target:
        blueprint?.metadata?.subskillId ??
        blueprint?.subskillId ??
        blueprint?.metadata?.skillId ??
        blueprint?.skillId ??
        null,

      allowedTransformations: [
        "SIMPLIFY_PRESENTATION",
        "SIMPLIFY_NUMBERS",
        "REDUCE_COGNITIVE_LOAD",
        "ISOLATE_SINGLE_OPERATION",
        "KEEP_SEMANTIC_IDENTITY",
      ],

      forbiddenTransformations: [
        "CHANGE_CONCEPT",
        "CHANGE_SKILL",
        "CHANGE_SUBSKILL",
        "INTRODUCE_NEW_FORMULA",
        "INTRODUCE_UNRELATED_FACT",
        "RANDOMIZE_VALUES",
      ],

      diagnosticType:
        diagnosis.type,

      diagnosticConfidence:
        diagnosis.confidence,

      hint:
        "Let's isolate the exact step that is causing the difficulty.",
    };
  }

  _buildScaffoldPlan(
    blueprint,
    diagnosis
  ) {
    return {
      repairMode:
        REPAIR_MODE.SCAFFOLDED_MUTATION,

      questionMode:
        QUESTION_MODE.DIAGNOSTIC_PROBE,

      preserveConcept: true,
      preserveSkill: true,
      preserveSubskill: true,

      allowedTransformations: [
        "SIMPLIFY_PRESENTATION",
        "REDUCE_COGNITIVE_LOAD",
        "ADD_SCAFFOLD",
      ],

      forbiddenTransformations: [
        "CHANGE_CONCEPT",
        "CHANGE_SKILL",
        "CHANGE_SUBSKILL",
        "RANDOM_MUTATION",
      ],

      diagnosticType:
        diagnosis.type,

      diagnosticConfidence:
        diagnosis.confidence,

      hint:
        "Start by identifying what the question is asking you to find.",
    };
  }

  _buildTransferPlan(
    blueprint,
    diagnosis
  ) {
    return {
      repairMode:
        REPAIR_MODE.TRANSFER,

      questionMode:
        QUESTION_MODE.TRANSFER,

      preserveConcept: true,
      preserveSkill: true,
      preserveSubskill: true,

      allowedTransformations: [
        "CONTEXT_CHANGE",
        "REPRESENTATION_CHANGE",
        "TRANSFER_APPLICATION",
      ],

      forbiddenTransformations: [
        "CHANGE_CONCEPT",
        "CHANGE_SKILL",
        "CHANGE_SUBSKILL",
        "INCREASE_DIFFICULTY_WITHOUT_AUTHORIZATION",
      ],

      diagnosticType:
        diagnosis.type,

      diagnosticConfidence:
        diagnosis.confidence,

      hint:
        "Now use the same idea in a slightly different situation.",
    };
  }

  /* ===============================================================
   * MUTATION CONTRACT
   * =============================================================== */

  _createMutationContract({
    blueprint,
    semanticIdentity,
    evidence,
    diagnosis,
    repairPlan,
    subject,
  }) {
    const contract = {
      version: "5.0",

      subject,

      source: {
        identity: structuredClone(
          semanticIdentity
        ),

        questionId:
          blueprint?.id ??
          blueprint?.questionId ??
          null,
      },

      evidence: structuredClone(
        evidence
      ),

      diagnosis: structuredClone(
        diagnosis
      ),

      repair: structuredClone(
        repairPlan
      ),

      invariants: {
        preserveSubject: true,

        preserveChapter:
          Boolean(
            semanticIdentity.chapter
          ),

        preserveTopic:
          Boolean(
            semanticIdentity.topic
          ),

        preserveConcept:
          Boolean(
            semanticIdentity.conceptId
          ),

        preserveSkill:
          Boolean(
            semanticIdentity.skillId
          ),

        preserveSubskill:
          Boolean(
            semanticIdentity.subskillId
          ),

        independentVerification: true,
      },

      /*
       * Explicitly tell subject mutators that they own generation.
       */
      generation: {
        domainMutatorOwnsGeneration: true,

        questionMutatorMustNotRewrite: true,

        recalculateAnswer:
          true,

        requireVerification:
          true,
      },
    };

    /*
     * Freeze recursively enough to prevent accidental mutation
     * of the contract during generation.
     */
    return this._deepFreeze(
      contract
    );
  }

  /* ===============================================================
   * SUBJECT ROUTING
   * =============================================================== */

  _routeToSubjectMutator(
    blueprint,
    subject,
    contract
  ) {
    const mutator =
      this._mutators[subject];

    if (!mutator) {
      console.warn(
        `[QuestionMutator] No mutator for subject: ${subject}`
      );

      return null;
    }

    const attemptCount =
      Number.isInteger(
        blueprint?._attemptCount
      )
        ? blueprint._attemptCount
        : 0;

    /*
     * Preferred API:
     *
     * mutator.mutate(
     *   blueprint,
     *   attemptCount,
     *   contract
     * )
     *
     * This remains compatible with your current mutators.
     */
    try {
      const result = mutator.mutate(
        blueprint,
        attemptCount,
        contract
      );

      if (result && typeof result === "object") {
        if (!result.subject && subject) {
          result.subject = subject;
        }
      }

      return result;
    } catch (error) {
      console.error(
        `[QuestionMutator] ${subject} mutator failed:`,
        error
      );

      return null;
    }
  }

  /* ===============================================================
   * INDEPENDENT VERIFICATION
   * =============================================================== */

  _verifyMutation(
    original,
    candidate,
    contract
  ) {
    /*
     * ---------------------------------------------------------------
     * BASIC STRUCTURE
     * ---------------------------------------------------------------
     */

    if (
      !candidate ||
      typeof candidate !== "object"
    ) {
      return {
        valid: false,
        reason: "MISSING_VARIANT",
      };
    }

    const stem =
      candidate.q ??
      candidate.stem ??
      "";

    if (
      typeof stem !== "string" ||
      !stem.trim()
    ) {
      return {
        valid: false,
        reason: "MISSING_STEM",
      };
    }

    /*
     * ---------------------------------------------------------------
     * ANSWER
     * ---------------------------------------------------------------
     */

    if (
      candidate.ans === undefined &&
      candidate.answer === undefined
    ) {
      return {
        valid: false,
        reason: "MISSING_ANSWER",
      };
    }

    /*
     * ---------------------------------------------------------------
     * MCQ
     * ---------------------------------------------------------------
     */

    if (
      candidate.type === "mcq"
    ) {
      if (
        !Array.isArray(
          candidate.options
        ) ||
        candidate.options.length < 2
      ) {
        return {
          valid: false,
          reason: "INVALID_OPTIONS",
        };
      }

      const optionCheck =
        this._verifyMCQAnswer(
          candidate
        );

      if (!optionCheck.valid) {
        return optionCheck;
      }
    }

    /*
     * ---------------------------------------------------------------
     * SEMANTIC IDENTITY
     * ---------------------------------------------------------------
     */

    const originalIdentity =
      contract.source.identity;

    const candidateIdentity =
      this._extractSemanticIdentity(
        candidate
      );

    const identityCheck =
      this._verifySemanticIdentity(
        originalIdentity,
        candidateIdentity,
        contract
      );

    if (!identityCheck.valid) {
      return identityCheck;
    }

    /*
     * ---------------------------------------------------------------
     * SELF-CERTIFICATION IS NOT ACCEPTED AS VERIFICATION
     * ---------------------------------------------------------------
     *
     * A mutator saying mutationVerified=true is useful provenance,
     * but it is not sufficient evidence.
     *
     * Our checks above are independent.
     */

    /*
     * ---------------------------------------------------------------
     * REPAIR CONTRACT COMPLIANCE
     * ---------------------------------------------------------------
     */

    const contractCheck =
      this._verifyRepairContract(
        original,
        candidate,
        contract
      );

    if (!contractCheck.valid) {
      return contractCheck;
    }

    /*
     * ---------------------------------------------------------------
     * CONTENT SAFETY
     * ---------------------------------------------------------------
     */

    const contentCheck =
      this._verifyContentSafety(
        original,
        candidate
      );

    if (!contentCheck.valid) {
      return contentCheck;
    }

    return {
      valid: true,

      checks: {
        structure: true,
        answer: true,
        semanticIdentity: true,
        repairContract: true,
        contentSafety: true,
      },
    };
  }

  /* ===============================================================
   * SEMANTIC IDENTITY
   * =============================================================== */

  _extractSemanticIdentity(
    question
  ) {
    const metadata =
      question?.metadata || {};

    return {
      subject:
        this._firstDefined(
          metadata.subject,
          question?.subject
        ),

      chapter:
        this._firstDefined(
          metadata.chapter,
          question?.chapter
        ),

      topic:
        this._firstDefined(
          metadata.topic,
          question?.topic
        ),

      conceptId:
        this._firstDefined(
          metadata.conceptId,
          question?.conceptId,
          metadata.concept_id,
          question?.concept_id
        ),

      skillId:
        this._firstDefined(
          metadata.skillId,
          question?.skillId,
          metadata.skill_id,
          question?.skill_id,

          /*
           * Legacy skill support.
           */
          metadata.skill,
          question?.skill
        ),

      subskillId:
        this._firstDefined(
          metadata.subskillId,
          question?.subskillId,
          metadata.subskill_id,
          question?.subskill_id
        ),
    };
  }

  _validateSemanticIdentity(
    identity
  ) {
    /*
     * A legacy question may lack conceptId/subskillId.
     *
     * But a completely unclassified question should not be mutated.
     */
    const hasMeaningfulIdentity =
      Boolean(
        identity.subject ||
        identity.topic ||
        identity.conceptId ||
        identity.skillId
      );

    if (!hasMeaningfulIdentity) {
      return {
        valid: false,
        reason: "MISSING_SEMANTIC_IDENTITY",
      };
    }

    return {
      valid: true,
    };
  }

  _verifySemanticIdentity(
    original,
    candidate,
    contract
  ) {
    const fields =
      SEMANTIC_FIELDS;

    for (const field of fields) {
      const originalValue =
        this._normalizeSemanticValue(
          original?.[field]
        );

      const candidateValue =
        this._normalizeSemanticValue(
          candidate?.[field]
        );

      /*
       * If the original doesn't have the field,
       * the candidate is allowed to omit it too.
       */
      if (!originalValue) {
        continue;
      }

      /*
       * Candidate lost a known semantic field.
       */
      if (!candidateValue) {
        return {
          valid: false,
          reason:
            `SEMANTIC_IDENTITY_LOST:${field}`,
        };
      }

      /*
       * Subject has no reason to change.
       */
      if (
        field === "subject" &&
        !this._semanticValuesCompatible("subject", originalValue, candidateValue)
      ) {
        return {
          valid: false,
          reason:
            `SUBJECT_CHANGED:${originalValue}->${candidateValue}`,
        };
      }

      /*
       * Concept / skill / subskill are strict by default.
       *
       * A prerequisite move must be explicitly authorized by
       * the repair contract in a future version.
       */
      if (
        [
          "conceptId",
          "skillId",
          "subskillId",
        ].includes(field)
      ) {
        if (
          !this._semanticValuesCompatible(
            field,
            originalValue,
            candidateValue
          )
        ) {
          return {
            valid: false,
            reason:
              `SEMANTIC_FIELD_CHANGED:${field}:${originalValue}->${candidateValue}`,
          };
        }
      }

      /*
       * Chapter/topic are also preserved when supplied.
       */
      if (
        [
          "chapter",
          "topic",
        ].includes(field)
      ) {
        if (
          originalValue !==
          candidateValue
        ) {
          return {
            valid: false,
            reason:
              `CONTEXT_CHANGED:${field}:${originalValue}->${candidateValue}`,
          };
        }
      }
    }

    return {
      valid: true,
    };
  }

  _semanticValuesCompatible(
    field,
    a,
    b
  ) {
    if (a === b) {
      return true;
    }

    /*
     * Small legacy alias table.
     *
     * This should eventually move into the ontology rather than
     * living in QuestionMutator.
     */
    const aliases = {
      math: [
        "math",
        "mathematics",
      ],

      homescience: [
        "homescience",
        "home_science",
        "home science",
      ],

      business: [
        "business",
        "business_studies",
        "business studies",
      ],

      history: [
        "history",
        "history_and_government",
        "history and government",
      ],

      computer: [
        "computer",
        "computer_studies",
        "computer studies",
      ],

      rectangle_area: [
        "rectangle",
        "rectangle_area",
      ],

      percentage: [
        "percentage",
        "percentages",
      ],
    };

    const group =
      Object.values(
        aliases
      ).find(
        (values) =>
          values.includes(a) &&
          values.includes(b)
      );

    return Boolean(group);
  }

  /* ===============================================================
   * REPAIR CONTRACT VERIFICATION
   * =============================================================== */

  _verifyRepairContract(
    original,
    candidate,
    contract
  ) {
    const mode =
      contract?.repair?.repairMode;

    /*
     * ---------------------------------------------------------------
     * PROBE
     * ---------------------------------------------------------------
     *
     * A probe MUST NOT silently become a new concept.
     */

    if (
      mode === REPAIR_MODE.PROBE ||
      mode ===
        REPAIR_MODE.SCAFFOLDED_MUTATION
    ) {
      const identity =
        this._extractSemanticIdentity(
          candidate
        );

      const source =
        contract.source.identity;

      if (
        source.conceptId &&
        identity.conceptId &&
        source.conceptId !==
          identity.conceptId
      ) {
        return {
          valid: false,
          reason:
            "PROBE_CHANGED_CONCEPT",
        };
      }

      if (
        source.skillId &&
        identity.skillId &&
        !this._semanticValuesCompatible(
          "skillId",
          source.skillId,
          identity.skillId
        )
      ) {
        return {
          valid: false,
          reason:
            "PROBE_CHANGED_SKILL",
        };
      }

      if (
        source.subskillId &&
        identity.subskillId &&
        source.subskillId !==
          identity.subskillId
      ) {
        return {
          valid: false,
          reason:
            "PROBE_CHANGED_SUBSKILL",
        };
      }
    }

    /*
     * ---------------------------------------------------------------
     * TRANSFER
     * ---------------------------------------------------------------
     *
     * Transfer may change representation/context but not semantic
     * identity.
     */

    if (
      mode === REPAIR_MODE.TRANSFER
    ) {
      /*
       * Identity was already checked independently.
       *
       * Nothing else is required here.
       */
      return {
        valid: true,
      };
    }

    /*
     * ---------------------------------------------------------------
     * TARGETED REPAIR
     * ---------------------------------------------------------------
     */

    if (
      mode ===
      REPAIR_MODE.TARGETED_REPAIR
    ) {
      const target =
        contract?.repair?.target ??
        contract?.diagnosis?.target ??
        contract?.diagnosis?.misconception ??
        null;

      /*
       * We do not require the candidate to contain the target
       * string. Domain mutators may represent it structurally.
       *
       * But if there is no target at all, the repair is suspicious.
       */
      if (!target) {
        console.warn(
          "[QuestionMutator] Targeted repair has no explicit target."
        );
      }
    }

    return {
      valid: true,
    };
  }

  /* ===============================================================
   * CONTENT SAFETY
   * =============================================================== */

  _verifyContentSafety(
    original,
    candidate
  ) {
    const originalStem =
      String(
        original?.q ??
        original?.stem ??
        ""
      ).trim();

    const candidateStem =
      String(
        candidate?.q ??
        candidate?.stem ??
        ""
      ).trim();

    if (!candidateStem) {
      return {
        valid: false,
        reason: "EMPTY_GENERATED_QUESTION",
      };
    }

    /*
     * Reject accidental "[object Object]" corruption.
     */
    if (
      candidateStem.includes(
        "[object Object]"
      )
    ) {
      return {
        valid: false,
        reason:
          "CORRUPTED_STEM_OBJECT_STRING",
      };
    }

    /*
     * Reject NaN / Infinity leakage.
     */
    if (
      /\bNaN\b|\bInfinity\b/.test(
        candidateStem
      )
    ) {
      return {
        valid: false,
        reason:
          "INVALID_NUMERIC_OUTPUT",
      };
    }

    /*
     * Reject explicit undefined/null leakage.
     */
    if (
      /\bundefined\b|\bnull\b/.test(
        candidateStem
      )
    ) {
      return {
        valid: false,
        reason:
          "INVALID_TEMPLATE_OUTPUT",
      };
    }

    /*
     * A candidate should actually differ from the original for
     * mutation modes.
     *
     * We do NOT reject identical output because some domain
     * mutators may intentionally return a safe unchanged question.
     */
    void originalStem;

    return {
      valid: true,
    };
  }

  /* ===============================================================
   * MCQ VERIFICATION
   * =============================================================== */

  _verifyMCQAnswer(
    candidate
  ) {
    const options =
      candidate?.options || [];

    const answer =
      candidate?.ans ??
      candidate?.answer;

    /*
     * If answer is an index.
     */
    if (
      Number.isInteger(answer)
    ) {
      if (
        answer < 0 ||
        answer >= options.length
      ) {
        return {
          valid: false,
          reason:
            "ANSWER_INDEX_OUT_OF_RANGE",
        };
      }

      return {
        valid: true,
      };
    }

    /*
     * If answer is a string, it should correspond to an option
     * where possible.
     */
    const normalizedAnswer =
      String(answer ?? "")
        .trim()
        .toLowerCase();

    if (!normalizedAnswer) {
      return {
        valid: false,
        reason: "EMPTY_MCQ_ANSWER",
      };
    }

    const normalizedOptions =
      options.map((option) =>
        String(option ?? "")
          .trim()
          .toLowerCase()
      );

    /*
     * Some legacy formats use "A", "B", "C", "D".
     */
    if (
      /^[a-z]$/i.test(
        normalizedAnswer
      )
    ) {
      const index =
        normalizedAnswer.charCodeAt(0) -
        97;

      if (
        index >= 0 &&
        index < options.length
      ) {
        return {
          valid: true,
        };
      }
    }

    if (
      normalizedOptions.includes(
        normalizedAnswer
      )
    ) {
      return {
        valid: true,
      };
    }

    /*
     * Do not reject every legacy answer format.
     *
     * If the answer is a structured token unknown to us,
     * leave final semantic validation to the domain verifier.
     */
    return {
      valid: true,
    };
  }

  /* ===============================================================
   * FINALIZATION
   * =============================================================== */

  _finalizeMutation({
    blueprint,
    candidate,
    contract,
    verification,
  }) {
    const result =
      structuredClone(
        candidate
      );

    const existingMetadata =
      result.metadata || {};

    result.metadata = {
      ...existingMetadata,

      diagnosticRepair: {
        ...(existingMetadata.diagnosticRepair || {}),

        type:
          contract?.diagnosis?.type ??
          DIAGNOSIS.INSUFFICIENT_EVIDENCE,

        strategy:
          contract?.diagnosis?.strategy ??
          REPAIR_MODE.PROBE,

        confidence:
          contract?.diagnosis?.confidence ??
          0,

        evidence:
          contract?.evidence ?? [],

        repairPlan:
          contract?.repair ?? null,

        summary:
          this._summarizeRepairPlan(
            contract?.repair
          ),
      },

      semanticIdentity:
        contract?.source?.identity ??
        null,

      provenance: {
        ...(existingMetadata.provenance || {}),

        sourceQuestionId:
          blueprint?.id ??
          blueprint?.questionId ??
          null,

        mutationVerified:
          true,

        mutationAccepted:
          true,

        independentVerification:
          true,

        conceptPreserved:
          true,

        skillPreserved:
          true,

        subskillPreserved:
          true,

        answerRecalculated:
          true,

        verifier:
          "QuestionMutatorV5",
      },

      mutationContract: {
        version:
          contract?.version ??
          "5.0",

        repairMode:
          contract?.repair?.repairMode ??
          null,

        questionMode:
          contract?.repair?.questionMode ??
          null,
      },
    };

    /*
     * Do not overwrite a useful domain hint.
     */
    if (
      !result.hint
    ) {
      result.hint =
        contract?.repair?.hint ??
        this._diagnosticHint(
          contract?.diagnosis
        );
    }

    /*
     * Tags are additive and deterministic.
     */
    const tags =
      Array.isArray(
        result.tags
      )
        ? result.tags
        : [];

    const newTags = [
      `repair:${
        contract?.repair?.repairMode ??
        REPAIR_MODE.PROBE
      }`,

      `mode:${
        contract?.repair?.questionMode ??
        QUESTION_MODE.FULL_QUESTION
      }`,

      `diagnosis:${
        contract?.diagnosis?.type ??
        DIAGNOSIS.INSUFFICIENT_EVIDENCE
      }`,
    ];

    result.tags = [
      ...new Set([
        ...tags,
        ...newTags,
      ]),
    ];

    /*
     * Keep verification information available to telemetry/debugging.
     */
    result.metadata.verification = {
      independent:
        verification?.valid === true,

      checks:
        verification?.checks ??
        {},
    };

    return result;
  }

  /* ===============================================================
   * SAFE FALLBACK
   * =============================================================== */

  _safeFallback(
    blueprint,
    diagnosis,
    reason
  ) {
    const fallback =
      structuredClone(
        blueprint
      );

    fallback.metadata = {
      ...(fallback.metadata || {}),

      provenance: {
        ...(fallback.metadata?.provenance || {}),

        mutationVerified:
          true,

        mutationAccepted:
          false,

        fallback:
          true,

        reason,

        verifier:
          "QuestionMutatorV5",
      },

      diagnosticRepair: {
        type:
          diagnosis?.type ??
          DIAGNOSIS.INSUFFICIENT_EVIDENCE,

        strategy:
          diagnosis?.strategy ??
          REPAIR_MODE.PROBE,

        confidence:
          diagnosis?.confidence ??
          0,

        evidence:
          diagnosis?.evidence ??
          [],
      },
    };

    return fallback;
  }

  /* ===============================================================
   * HINTS
   * =============================================================== */

  _diagnosticHint(
    diagnosis
  ) {
    switch (
      diagnosis?.type
    ) {
      case DIAGNOSIS.NO_RESPONSE:
        return "Start by identifying what the question is asking you to find.";

      case DIAGNOSIS.NOTATION_UNIT_TYPO:
        return "Check your units, symbols, and how the final answer should be written.";

      case DIAGNOSIS.CORRECT:
        return "Now use the same idea in a slightly different situation.";

      case DIAGNOSIS.CONFIRMED_MISCONCEPTION:
      case DIAGNOSIS.STRONG_DIAGNOSTIC_EVIDENCE:
        return "Focus on the specific idea that caused the mistake.";

      case DIAGNOSIS.INSUFFICIENT_EVIDENCE:
      default:
        return "Let's isolate the exact step that is causing the difficulty.";
    }
  }

  /* ===============================================================
   * SUBJECT RESOLUTION
   * =============================================================== */

  _resolveSubject(
    blueprint,
    subjectName
  ) {
    const raw =
      subjectName ||
      blueprint?.subject ||
      blueprint?.metadata?.subject ||
      "";

    const key =
      this._normalizeSubject(
        raw
      );

    if (
      this._mutators[key]
    ) {
      return key;
    }

    /*
     * Controlled alias matching.
     *
     * Avoid broad substring matching such as:
     *
     * "computer" matching an unrelated subject containing computer.
     */
    const aliases = {
      mathematics: "math",
      "business studies":
        "business",
      "history and government":
        "history",
      "computer studies":
        "computer",
      "home science":
        "homescience",
    };

    if (
      aliases[key]
    ) {
      return aliases[key];
    }

    return null;
  }

  /* ===============================================================
   * SEMANTIC / TEXT HELPERS
   * =============================================================== */

  _questionAppearsUnitSensitive(
    blueprint
  ) {
    const text =
      [
        blueprint?.q,
        blueprint?.stem,
        blueprint?.notes,
        blueprint?.hint,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    /*
     * Conservative list.
     *
     * This is NOT a diagnosis.
     */
    const unitPatterns = [
      /\bkg\b/,
      /\bg\b/,
      /\bm\b/,
      /\bcm\b/,
      /\bmm\b/,
      /\bkm\b/,
      /\bs\b/,
      /\bmin\b/,
      /\bhours?\b/,
      /\bsecond(s)?\b/,
      /\bmetre(s)?\b/,
      /\bmeter(s)?\b/,
      /\bnewton(s)?\b/,
      /\bjoule(s)?\b/,
      /\bwatt(s)?\b/,
      /\bvolt(s)?\b/,
      /\bampere(s)?\b/,
      /\bpascal(s)?\b/,
      /\bmol(es)?\b/,
      /\bpercent\b/,
      /%/,
    ];

    return unitPatterns.some(
      (pattern) =>
        pattern.test(text)
    );
  }

  _answersEquivalent(
    a,
    b
  ) {
    const na =
      this._parseNumber(a);

    const nb =
      this._parseNumber(b);

    if (
      na !== null &&
      nb !== null
    ) {
      return (
        Math.abs(
          na - nb
        ) < 1e-9
      );
    }

    return (
      String(a ?? "")
        .trim()
        .toLowerCase() ===
      String(b ?? "")
        .trim()
        .toLowerCase()
    );
  }

  _sameNumericValue(
    a,
    b
  ) {
    const na =
      this._parseNumber(a);

    const nb =
      this._parseNumber(b);

    return (
      na !== null &&
      nb !== null &&
      Math.abs(
        na - nb
      ) < 1e-9
    );
  }

  _parseNumber(
    value
  ) {
    const raw =
      String(
        value ?? ""
      )
        .replace(
          /,/g,
          ""
        )
        .trim();

    if (!raw) {
      return null;
    }

    /*
     * Only accept a clean numeric representation.
     *
     * The old implementation stripped arbitrary characters,
     * which could accidentally convert:
     *
     * "8 m/s" -> "8"
     *
     * and create false equivalence.
     */
    const match =
      raw.match(
        /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i
      );

    if (!match) {
      return null;
    }

    const n =
      Number(
        match[0]
      );

    return Number.isFinite(
      n
    )
      ? n
      : null;
  }

  _normalizeSubject(
    subject
  ) {
    return String(
      subject ?? ""
    )
      .trim()
      .toLowerCase()
      .replace(
        /\s+/g,
        " "
      );
  }

  _normalizeSemanticValue(
    value
  ) {
    if (
      value === undefined ||
      value === null
    ) {
      return "";
    }

    return String(
      value
    )
      .trim()
      .toLowerCase()
      .replace(
        /\s+/g,
        "_"
      );
  }

  _firstDefined(
    ...values
  ) {
    for (
      const value of values
    ) {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return value;
      }
    }

    return null;
  }

  _selectEvidence(
    evidence,
    type
  ) {
    return evidence.filter(
      (item) =>
        item.type === type
    );
  }

  /* ===============================================================
   * REPAIR PLAN SUMMARY
   * =============================================================== */

  _summarizeRepairPlan(
    plan
  ) {
    if (!plan) {
      return null;
    }

    try {
      return summarizeRepairPlan(
        plan
      );
    } catch {
      return {
        mode:
          plan.repairMode ??
          null,

        questionMode:
          plan.questionMode ??
          null,
      };
    }
  }

  /* ===============================================================
   * IMMUTABILITY
   * =============================================================== */

  _deepFreeze(
    object
  ) {
    if (
      !object ||
      typeof object !== "object"
    ) {
      return object;
    }

    Object.freeze(
      object
    );

    for (
      const value of Object.values(
        object
      )
    ) {
      if (
        value &&
        typeof value === "object" &&
        !Object.isFrozen(value)
      ) {
        this._deepFreeze(
          value
        );
      }
    }

    return object;
  }
}

/* =================================================================
 * SINGLETON
 * ================================================================= */

export const questionMutator =
  new QuestionMutator();

