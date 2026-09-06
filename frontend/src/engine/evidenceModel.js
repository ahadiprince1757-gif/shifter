/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P2-A.1 (CONSTITUTIONALLY HARDENED)
 * Evidence Strength Model & Evidence Qualification Engine (Client Module — ESM)
 * 
 * Constitutional Invariants (P2 Constitution):
 * 1. Calibration may change how Tixar interprets evidence, but it may never change what evidence actually occurred.
 * 2. Performance quality may strengthen evidence WITHIN an evidence level; it cannot promote evidence to a higher level (Law of Non-Promotion).
 * 3. Strict Correctness Normalization: Boolean normalization throws on malformed telemetry; "false" is never coerced to true.
 * 4. Temporal Calibration Integrity (Law 14): itemDifficultyAtObservation is temporally scoped; future calibrations cannot overwrite historical observations.
 * 5. UNKNOWN Evidence & UNKNOWN_SKILL Non-Inference: Preserves observation provenance, but sets inferenceEligible: false and evidenceStrength: null.
 * 6. Stable Identity Determinism: Canonical attempts require stable identifiers; Date.now() generation inside inference is strictly forbidden.
 * 7. Multi-Skill Attribution Law (Model A): Canonical attempt conservation and evidential contribution conservation are distinct concepts.
 *    A single attempt is conserved as 1 observation, but may inform multiple skill hypotheses independently.
 * 8. Calibration Policy Governance: minDifficultyObservations (30) is governed by CALIBRATION_POLICY.
 * 9. Attribution Confidence Independence: Attribution confidence qualifies the mapping, never student performance evidence strength.
 * 10. Qualification vs. Interpretation Boundary: evidenceStrength is strictly interpretive strength under CONFIGURED_RULE_MODEL v1.0.0;
 *     it preserves itemDifficultyAtObservation as an independent dimension for Milestone P2-C (Mastery Estimator).
 */

import { ONTOLOGY_VERSION, SKILL_ROLES, UNKNOWN_SKILL } from '../data/skillOntology.js';
import { EVIDENCE_LEVELS, EVIDENCE_LEVEL_SOURCES } from '../data/evidenceVocabulary.js';

export { EVIDENCE_LEVELS, EVIDENCE_LEVEL_SOURCES };

export const CALIBRATION_VERSION = '1.0.0';

export const CALIBRATION_POLICY = Object.freeze({
  minDifficultyObservations: 30
});

export const MIN_DIFFICULTY_OBSERVATIONS = CALIBRATION_POLICY.minDifficultyObservations;

export const EVIDENCE_LEVEL_WEIGHTS = Object.freeze({
  [EVIDENCE_LEVELS.RECOGNITION]: 0.40,
  [EVIDENCE_LEVELS.RECALL]: 0.55,
  [EVIDENCE_LEVELS.PROCEDURAL]: 0.70,
  [EVIDENCE_LEVELS.APPLICATION]: 0.85,
  [EVIDENCE_LEVELS.TRANSFER]: 1.00,
  [EVIDENCE_LEVELS.UNKNOWN]: 0.00
});

export const INDEPENDENCE_FACTORS = Object.freeze({
  NO_HINT: 1.00,
  MINOR_HINT: 0.75,
  MODERATE_HELP: 0.50,
  HEAVY_HELP: 0.25,
  ANSWER_REVEALED: 0.00
});

export const NOVELTY_FACTORS = Object.freeze({
  ORDINAL_1: 1.00,
  ORDINAL_2: 0.60,
  ORDINAL_3: 0.35,
  ORDINAL_4_PLUS: 0.15
});

export const SKILL_ROLE_WEIGHTS = Object.freeze({
  [SKILL_ROLES.PRIMARY]: 1.00,
  [SKILL_ROLES.SUPPORTING]: 0.35,
  [SKILL_ROLES.UNKNOWN]: 0.00
});

export function normalizeBoolean(value, fallback = false) {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1'].includes(normalized)) return true;
    if (['false', '0', ''].includes(normalized)) return false;
  }
  return fallback;
}

export function normalizeCorrectness(value) {
  if (value === true || value === false) return value;
  if (value === 1) return true;
  if (value === 0) return false;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true' || normalized === '1') return true;
    if (normalized === 'false' || normalized === '0') return false;
  }
  throw new Error('[evidenceModel] Correctness must be boolean');
}

export function normalizeDifficulty(value) {
  if (value === null || value === undefined) return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0 || numeric > 1) {
    throw new Error('[evidenceModel] Invalid item difficulty');
  }
  return Math.round(numeric * 100) / 100;
}

export function calculateIndependenceFactor(observed = {}) {
  const isSolutionRevealed = normalizeBoolean(observed.solutionRevealed || observed.answerRevealed, false);
  if (isSolutionRevealed) {
    return INDEPENDENCE_FACTORS.ANSWER_REVEALED;
  }

  const hintsCount = Number(observed.hintsUsed ?? observed.hints_used ?? observed.hints ?? 0);
  const assistanceLevel = String(observed.assistanceLevel || observed.assistance_level || '').toUpperCase();

  if (assistanceLevel === 'HEAVY_HELP' || hintsCount >= 3) {
    return INDEPENDENCE_FACTORS.HEAVY_HELP;
  }
  if (assistanceLevel === 'MODERATE_HELP' || hintsCount === 2) {
    return INDEPENDENCE_FACTORS.MODERATE_HELP;
  }
  if (assistanceLevel === 'MINOR_HINT' || hintsCount === 1) {
    return INDEPENDENCE_FACTORS.MINOR_HINT;
  }

  return INDEPENDENCE_FACTORS.NO_HINT;
}

export function calculateNoveltyFactor(attemptOrdinal = 1) {
  const ordinal = Math.max(1, parseInt(attemptOrdinal, 10) || 1);
  if (ordinal === 1) return NOVELTY_FACTORS.ORDINAL_1;
  if (ordinal === 2) return NOVELTY_FACTORS.ORDINAL_2;
  if (ordinal === 3) return NOVELTY_FACTORS.ORDINAL_3;
  return NOVELTY_FACTORS.ORDINAL_4_PLUS;
}

export function calculateItemDifficultyMetrics(itemObservations = []) {
  if (!Array.isArray(itemObservations)) {
    return {
      observedFailureRate: null,
      difficulty: null,
      eligibleObservationCount: 0,
      totalObservationCount: 0
    };
  }

  const total = itemObservations.length;
  let eligibleCount = 0;
  let incorrectCount = 0;

  for (const obs of itemObservations) {
    if (!obs || typeof obs !== 'object') continue;
    const rawVal = obs.is_correct !== undefined ? obs.is_correct : (obs.correct !== undefined ? obs.correct : undefined);
    if (rawVal === undefined || rawVal === null) continue;
    try {
      const isCorrect = normalizeCorrectness(rawVal);
      eligibleCount++;
      if (!isCorrect) incorrectCount++;
    } catch {
      // Malformed or corrupted telemetry is excluded from population calibration
    }
  }

  const failureRate = eligibleCount > 0 ? Math.round((incorrectCount / eligibleCount) * 100) / 100 : null;
  const difficulty = eligibleCount >= CALIBRATION_POLICY.minDifficultyObservations ? failureRate : null;

  return {
    observedFailureRate: failureRate,
    difficulty,
    eligibleObservationCount: eligibleCount,
    totalObservationCount: total
  };
}

export function calibrateItemDifficulty(itemObservations = []) {
  return calculateItemDifficultyMetrics(itemObservations).difficulty;
}

export function qualifyEvidenceContribution(canonicalAttempt = {}, skillAttribution = {}, availableCalibration = {}) {
  if (!canonicalAttempt || typeof canonicalAttempt !== 'object') {
    throw new Error('[evidenceModel] canonicalAttempt is required');
  }

  const attemptId = canonicalAttempt.client_event_id || canonicalAttempt.id;
  if (!attemptId) {
    throw new Error('[evidenceModel] Canonical attempt requires a stable attempt identity');
  }

  const questionId = canonicalAttempt.question_id || canonicalAttempt.questionId || skillAttribution.questionId || 'unknown_item';

  const isCorrect = normalizeCorrectness(
    canonicalAttempt.is_correct !== undefined ? canonicalAttempt.is_correct : canonicalAttempt.correct
  );

  const hintsUsed = Number(canonicalAttempt.hints_used ?? canonicalAttempt.hintsUsed ?? canonicalAttempt.hints ?? 0);
  const solutionRevealed = Boolean(canonicalAttempt.solution_revealed || canonicalAttempt.answer_revealed);
  const assistanceLevel = String(canonicalAttempt.assistance_level || canonicalAttempt.assistanceLevel || 'NONE').toUpperCase();
  const attemptOrdinal = Math.max(1, parseInt(canonicalAttempt.attempt_ordinal ?? canonicalAttempt.attemptOrdinal ?? 1, 10) || 1);

  const skillId = skillAttribution.skillId || skillAttribution.id || 'unknown_skill';
  const skillRole = skillAttribution.role || SKILL_ROLES.PRIMARY;
  const isUnknownSkill = skillId === UNKNOWN_SKILL.id || skillRole === SKILL_ROLES.UNKNOWN;
  const evidenceWeight = SKILL_ROLE_WEIGHTS[skillRole] !== undefined ? SKILL_ROLE_WEIGHTS[skillRole] : SKILL_ROLE_WEIGHTS[SKILL_ROLES.PRIMARY];

  let declaredLevel = skillAttribution.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN;
  if (!Object.values(EVIDENCE_LEVELS).includes(declaredLevel)) {
    declaredLevel = EVIDENCE_LEVELS.UNKNOWN;
  }
  const evidenceLevelSource = skillAttribution.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN;
  const isUnknownLevel = declaredLevel === EVIDENCE_LEVELS.UNKNOWN;

  const independenceFactor = calculateIndependenceFactor({
    hintsUsed,
    solutionRevealed,
    assistanceLevel
  });

  const noveltyFactor = calculateNoveltyFactor(attemptOrdinal);

  const countsTowardSkillMastery = !isUnknownSkill && !isUnknownLevel;
  const inferenceEligible = countsTowardSkillMastery;

  const baseLevelWeight = EVIDENCE_LEVEL_WEIGHTS[declaredLevel] ?? 0.00;
  let evidenceStrength = null;
  if (inferenceEligible) {
    const accuracyMultiplier = isCorrect ? 1.0 : 0.45;
    const rawStrength = baseLevelWeight * accuracyMultiplier * independenceFactor * noveltyFactor * evidenceWeight;
    evidenceStrength = Math.round((rawStrength + Number.EPSILON) * 100) / 100;
  }

  let itemDifficultyAtObservation = null;
  if (canonicalAttempt.item_difficulty_at_observation !== undefined) {
    itemDifficultyAtObservation = normalizeDifficulty(canonicalAttempt.item_difficulty_at_observation);
  } else if (availableCalibration.itemDifficultyAtObservation !== undefined) {
    itemDifficultyAtObservation = normalizeDifficulty(availableCalibration.itemDifficultyAtObservation);
  }

  const calibVersion = availableCalibration.calibrationVersion || CALIBRATION_VERSION;
  const attributionConfidence = skillAttribution.confidence !== undefined ? skillAttribution.confidence : null;

  const identityBlock = Object.freeze({
    attemptId,
    questionId,
    skillId
  });

  const attributionBlock = Object.freeze({
    skillRole,
    attributionWeight: evidenceWeight,
    attributionConfidence,
    ontologyVersion: skillAttribution.ontologyVersion || ONTOLOGY_VERSION
  });

  const observationBlock = Object.freeze({
    correct: isCorrect,
    hintsUsed,
    solutionRevealed,
    assistanceLevel,
    attemptOrdinal,
    isFirstAttemptOnItem: attemptOrdinal === 1
  });

  const classificationBlock = Object.freeze({
    evidenceLevel: declaredLevel,
    evidenceLevelSource
  });

  const qualificationBlock = Object.freeze({
    independenceFactor,
    noveltyFactor,
    configuredLevelWeight: baseLevelWeight,
    skillAttributionWeight: evidenceWeight,
    evidenceWeight,
    itemDifficultyAtObservation,
    strengthModel: Object.freeze({
      type: 'CONFIGURED_RULE_MODEL',
      version: calibVersion
    }),
    evidenceStrength
  });

  const eligibilityBlock = Object.freeze({
    countsAsObservedEvidence: true,
    countsTowardSkillMastery,
    reason: countsTowardSkillMastery
      ? 'ELIGIBLE'
      : (isUnknownSkill ? 'UNKNOWN_SKILL' : 'UNKNOWN_LEVEL')
  });

  const provenanceBlock = Object.freeze({
    ontologyVersion: skillAttribution.ontologyVersion || ONTOLOGY_VERSION,
    calibrationVersion: calibVersion,
    calibrationSnapshotHash: availableCalibration.calibrationSnapshotHash || null
  });

  return Object.freeze({
    identity: identityBlock,
    attribution: attributionBlock,
    observation: observationBlock,
    classification: classificationBlock,
    qualification: qualificationBlock,
    eligibility: eligibilityBlock,
    provenance: provenanceBlock,

    // Flat compatibility accessors:
    attemptId,
    questionId,
    skillId,
    skillRole,
    evidenceLevel: declaredLevel,
    evidenceLevelSource,
    inferenceEligible,
    observed: Object.freeze({
      correct: isCorrect,
      independent: independenceFactor === INDEPENDENCE_FACTORS.NO_HINT,
      hintsUsed,
      attemptOrdinal,
      isFirstAttemptOnItem: attemptOrdinal === 1
    })
  });
}

export function distributeEvidenceContributions(canonicalAttempt = {}, questionMapping = {}, availableCalibration = {}) {
  const rawSkills = Array.isArray(questionMapping.skills) && questionMapping.skills.length > 0
    ? questionMapping.skills
    : [{
        skillId: questionMapping.primarySkill?.id || 'unknown_skill',
        role: SKILL_ROLES.PRIMARY,
        evidenceLevel: questionMapping.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN,
        evidenceLevelSource: questionMapping.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN,
        ontologyVersion: questionMapping.ontologyVersion || ONTOLOGY_VERSION
      }];

  const uniqueSkillsMap = new Map();
  for (const attr of rawSkills) {
    const skillId = attr.skillId || attr.id || 'unknown_skill';
    if (!uniqueSkillsMap.has(skillId)) {
      uniqueSkillsMap.set(skillId, attr);
    } else {
      const existing = uniqueSkillsMap.get(skillId);
      if (attr.role === SKILL_ROLES.PRIMARY && existing.role !== SKILL_ROLES.PRIMARY) {
        uniqueSkillsMap.set(skillId, attr);
      }
    }
  }
  const deduplicatedSkills = Array.from(uniqueSkillsMap.values());

  const contributions = deduplicatedSkills.map(attr => {
    const mergedAttr = {
      ...attr,
      questionId: questionMapping.questionId,
      evidenceLevel: attr.evidenceLevel || questionMapping.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN,
      evidenceLevelSource: attr.evidenceLevelSource || questionMapping.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN
    };
    return qualifyEvidenceContribution(canonicalAttempt, mergedAttr, availableCalibration);
  });

  return Object.freeze({
    canonicalAttempts: 1,
    contributions: Object.freeze(contributions)
  });
}
