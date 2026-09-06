/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P2-A (HARDENED)
 * Evidence Strength Model & Evidence Qualification Engine
 * 
 * Constitutional Invariants (P2 Constitution):
 * 1. Calibration may change how Tixar interprets evidence, but it may never change what evidence actually occurred.
 * 2. Performance quality may strengthen evidence WITHIN an evidence level; it cannot promote evidence to a higher level (Law of Non-Promotion).
 * 3. Strict Boolean Normalization: Coercion rules (e.g. Boolean("false") === true) are prohibited; false is false.
 * 4. Temporal Calibration Integrity (Law 14): itemDifficultyAtObservation is temporally scoped; future calibrations cannot be retroactively injected.
 * 5. UNKNOWN Evidence & UNKNOWN_SKILL Non-Inference: Preserves provenance, but inferenceEligible: false and evidenceStrength: null.
 * 6. Stable Identity Determinism: Canonical attempts require stable identifiers; Date.now() generation is forbidden.
 * 7. Multi-Skill Deduplication & Conservation: 1 canonical attempt = 1 canonical attempt. Duplicate skill attributions are merged to at most one contribution per skill.
 * 8. Calibration Policy Governance: minDifficultyObservations (30) is governed by CALIBRATION_POLICY.
 * 9. Attribution Confidence Independence: Attribution confidence qualifies the mapping, never student performance evidence strength.
 */

const crypto = require('crypto');
const { ONTOLOGY_VERSION, SKILL_ROLES, UNKNOWN_SKILL } = require('./skillOntology');
const { EVIDENCE_LEVELS, EVIDENCE_LEVEL_SOURCES } = require('./evidenceVocabulary');

const CALIBRATION_VERSION = '1.0.0';

const CALIBRATION_POLICY = Object.freeze({
  minDifficultyObservations: 30
});

const MIN_DIFFICULTY_OBSERVATIONS = CALIBRATION_POLICY.minDifficultyObservations;

const EVIDENCE_LEVEL_WEIGHTS = Object.freeze({
  [EVIDENCE_LEVELS.RECOGNITION]: 0.40,
  [EVIDENCE_LEVELS.RECALL]: 0.55,
  [EVIDENCE_LEVELS.PROCEDURAL]: 0.70,
  [EVIDENCE_LEVELS.APPLICATION]: 0.85,
  [EVIDENCE_LEVELS.TRANSFER]: 1.00,
  [EVIDENCE_LEVELS.UNKNOWN]: 0.00 // Epistemic invariant: Unknown level produces no inferential evidence
});

const INDEPENDENCE_FACTORS = Object.freeze({
  NO_HINT: 1.00,
  MINOR_HINT: 0.75,
  MODERATE_HELP: 0.50,
  HEAVY_HELP: 0.25,
  ANSWER_REVEALED: 0.00
});

const NOVELTY_FACTORS = Object.freeze({
  ORDINAL_1: 1.00,
  ORDINAL_2: 0.60,
  ORDINAL_3: 0.35,
  ORDINAL_4_PLUS: 0.15
});

const SKILL_ROLE_WEIGHTS = Object.freeze({
  [SKILL_ROLES.PRIMARY]: 1.00,
  [SKILL_ROLES.SUPPORTING]: 0.35,
  [SKILL_ROLES.UNKNOWN]: 0.00 // UNKNOWN_SKILL produces no inferential evidence
});

/**
 * Normalizes boolean evidence values, preventing JavaScript Boolean("false") coercion bugs.
 * @param {any} value Input truth value
 * @param {boolean} fallback Default fallback if indeterminate
 * @returns {boolean}
 */
function normalizeBoolean(value, fallback = false) {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1'].includes(normalized)) return true;
    if (['false', '0', ''].includes(normalized)) return false;
  }
  return fallback;
}

function canonicalize(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(canonicalize);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result = {};
  for (const key of sortedKeys) {
    result[key] = canonicalize(obj[key]);
  }
  return result;
}

/**
 * Computes a deterministic SHA-256 snapshot hash for calibration parameters.
 * @param {string} version Calibration version
 * @param {Object} params Additional calibration parameter map
 * @returns {string} 64-char hex SHA-256 hash
 */
function computeCalibrationSnapshotHash(version = CALIBRATION_VERSION, params = {}) {
  const payload = {
    version: String(version),
    policy: CALIBRATION_POLICY,
    evidenceLevelWeights: EVIDENCE_LEVELWEIGHTS_DETERMINISTIC,
    independenceFactors: INDEPENDENCE_FACTORS,
    noveltyFactors: NOVELTY_FACTORS,
    roleWeights: SKILL_ROLE_WEIGHTS,
    customParams: params
  };

  const canonicalJson = JSON.stringify(canonicalize(payload));
  return crypto.createHash('sha256').update(canonicalJson).digest('hex');
}

const EVIDENCE_LEVELWEIGHTS_DETERMINISTIC = {
  APPLICATION: 0.85,
  PROCEDURAL: 0.70,
  RECALL: 0.55,
  RECOGNITION: 0.40,
  TRANSFER: 1.00,
  UNKNOWN: 0.00
};

/**
 * Calculates independence factor based on hint usage and assistance telemetry.
 * Hint usage decreases evidential diagnostic strength without invalidating or mutating correctness.
 * 
 * @param {Object} observed Observation details (hintsUsed, solutionRevealed, assistanceLevel)
 * @returns {number} Independence factor between 0.00 and 1.00
 */
function calculateIndependenceFactor(observed = {}) {
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

/**
 * Calculates novelty factor based on attempt ordinal on the specific item.
 * Repeated attempts on the same item reduce novelty to prevent evidence inflation.
 * 
 * @param {number} attemptOrdinal 1-indexed attempt ordinal on this item
 * @returns {number} Novelty factor between 0.15 and 1.00
 */
function calculateNoveltyFactor(attemptOrdinal = 1) {
  const ordinal = Math.max(1, parseInt(attemptOrdinal, 10) || 1);
  if (ordinal === 1) return NOVELTY_FACTORS.ORDINAL_1;
  if (ordinal === 2) return NOVELTY_FACTORS.ORDINAL_2;
  if (ordinal === 3) return NOVELTY_FACTORS.ORDINAL_3;
  return NOVELTY_FACTORS.ORDINAL_4_PLUS;
}

/**
 * Calibrates item difficulty empirically across a population dataset.
 * Governed strictly by CALIBRATION_POLICY.minDifficultyObservations.
 * Invariant: N < 30 strictly yields null (null-protection).
 * Invariant: Identical observations yield identical failure rate (determinism).
 * 
 * @param {Array<Object>} itemObservations Array of student attempts on this item
 * @returns {number|null} Calibrated empirical failure rate in [0, 1] or null
 */
function calibrateItemDifficulty(itemObservations = []) {
  if (!Array.isArray(itemObservations) || itemObservations.length < CALIBRATION_POLICY.minDifficultyObservations) {
    return null;
  }

  const total = itemObservations.length;
  const incorrectCount = itemObservations.filter(obs => {
    const rawVal = obs.is_correct !== undefined ? obs.is_correct : (obs.correct !== undefined ? obs.correct : false);
    return !normalizeBoolean(rawVal, false);
  }).length;

  const empiricalFailureRate = incorrectCount / total;
  return Math.round(empiricalFailureRate * 100) / 100;
}

/**
 * Transforms an immutable canonical attempt into a qualified EvidenceContribution.
 * 
 * Constitutional Protections Enforced:
 * - Stable Identity: Requires client_event_id or id; never invents IDs with Date.now().
 * - Boolean Normalization: Uses normalizeBoolean to guard against "false" === true.
 * - Non-Promotion: Performance quality strengthens evidence WITHIN level, never promotes level.
 * - Independence & Novelty: Hint/novelty factors discount strength without modifying correctness.
 * - Non-Inference on UNKNOWN: Unknown level or UNKNOWN_SKILL produces inferenceEligible: false & evidenceStrength: null.
 * - Temporal Scoping: itemDifficultyAtObservation comes strictly from attempt or observation-time calibration.
 * - Attribution Confidence: Documented as metadata; not an automatic multiplier of performance strength.
 * 
 * @param {Object} canonicalAttempt Immutable observation
 * @param {Object} skillAttribution Skill mapping containing role, evidenceLevel, confidence
 * @param {Object} availableCalibration Current calibration state
 * @returns {Object} Qualified EvidenceContribution
 */
function qualifyEvidenceContribution(canonicalAttempt = {}, skillAttribution = {}, availableCalibration = {}) {
  if (!canonicalAttempt || typeof canonicalAttempt !== 'object') {
    throw new Error('[evidenceModel] canonicalAttempt is required');
  }

  // 1. Stable Identity Check (Invariant: Date.now() generation is forbidden)
  const attemptId = canonicalAttempt.client_event_id || canonicalAttempt.id;
  if (!attemptId) {
    throw new Error('[evidenceModel] Canonical attempt requires a stable attempt ID');
  }

  const questionId = canonicalAttempt.question_id || canonicalAttempt.questionId || skillAttribution.questionId || 'unknown_item';

  // 2. Strict Boolean Normalization
  const isCorrect = normalizeBoolean(
    canonicalAttempt.is_correct !== undefined ? canonicalAttempt.is_correct : canonicalAttempt.correct,
    false
  );

  const hintsUsed = Number(canonicalAttempt.hints_used ?? canonicalAttempt.hintsUsed ?? canonicalAttempt.hints ?? 0);
  const attemptOrdinal = Math.max(1, parseInt(canonicalAttempt.attempt_ordinal ?? canonicalAttempt.attemptOrdinal ?? 1, 10) || 1);

  // 3. Resolve skill role and weight
  const skillId = skillAttribution.skillId || skillAttribution.id || 'unknown_skill';
  const skillRole = skillAttribution.role || SKILL_ROLES.PRIMARY;
  const isUnknownSkill = skillId === UNKNOWN_SKILL.id || skillRole === SKILL_ROLES.UNKNOWN;
  const evidenceWeight = SKILL_ROLE_WEIGHTS[skillRole] !== undefined ? SKILL_ROLE_WEIGHTS[skillRole] : SKILL_ROLE_WEIGHTS[SKILL_ROLES.PRIMARY];

  // 4. Resolve evidence level with strict NON-PROMOTION guard
  let declaredLevel = skillAttribution.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN;
  if (!Object.values(EVIDENCE_LEVELS).includes(declaredLevel)) {
    declaredLevel = EVIDENCE_LEVELS.UNKNOWN;
  }
  const evidenceLevelSource = skillAttribution.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN;
  const isUnknownLevel = declaredLevel === EVIDENCE_LEVELS.UNKNOWN;

  // 5. Calculate qualification factors
  const independenceFactor = calculateIndependenceFactor({
    hintsUsed,
    solutionRevealed: canonicalAttempt.solution_revealed || canonicalAttempt.answer_revealed,
    assistanceLevel: canonicalAttempt.assistance_level || canonicalAttempt.assistanceLevel
  });

  const noveltyFactor = calculateNoveltyFactor(attemptOrdinal);

  // 6. Non-Inference Guard on UNKNOWN evidence or UNKNOWN_SKILL
  // Preserves provenance, but prohibits inferential claims
  const inferenceEligible = !isUnknownSkill && !isUnknownLevel;

  let evidenceStrength = null;
  if (inferenceEligible) {
    const baseLevelWeight = EVIDENCE_LEVEL_WEIGHTS[declaredLevel] ?? 0.00;
    const accuracyMultiplier = isCorrect ? 1.0 : 0.45;
    const rawStrength = baseLevelWeight * accuracyMultiplier * independenceFactor * noveltyFactor * evidenceWeight;
    evidenceStrength = Math.round(rawStrength * 100) / 100;
  }

  // 7. Temporal Calibration Integrity (Law 14)
  // itemDifficultyAtObservation must strictly reflect the difficulty AT OBSERVATION TIME
  let itemDifficultyAtObservation = null;
  if (canonicalAttempt.item_difficulty_at_observation !== undefined) {
    itemDifficultyAtObservation = canonicalAttempt.item_difficulty_at_observation;
  } else if (availableCalibration.itemDifficultyAtObservation !== undefined) {
    itemDifficultyAtObservation = availableCalibration.itemDifficultyAtObservation;
  }

  const calibVersion = availableCalibration.calibrationVersion || CALIBRATION_VERSION;
  const calibHash = availableCalibration.calibrationSnapshotHash || computeCalibrationSnapshotHash(calibVersion);

  // Attribution confidence qualifies the mapping, NOT student performance
  const attributionConfidence = skillAttribution.confidence !== undefined ? skillAttribution.confidence : null;

  return Object.freeze({
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
    }),
    qualification: Object.freeze({
      evidenceStrength,
      independenceFactor,
      noveltyFactor,
      evidenceWeight,
      itemDifficultyAtObservation,
      attributionConfidence
    }),
    provenance: Object.freeze({
      ontologyVersion: skillAttribution.ontologyVersion || ONTOLOGY_VERSION,
      calibrationVersion: calibVersion,
      calibrationSnapshotHash: calibHash
    })
  });
}

/**
 * Distributes qualified evidence contributions across attributed skills with duplicate protection.
 * 
 * Constitutional Invariants:
 * - 1 canonical attempt remains 1 canonical attempt in the ledger.
 * - Duplicate skill attributions are deterministically merged to at most one contribution per skill.
 * 
 * @param {Object} canonicalAttempt Single student attempt
 * @param {Object} questionMapping Mapped question attribution structure
 * @param {Object} availableCalibration Calibration metadata
 * @returns {Object} Attribution distribution containing canonicalAttempts: 1 and contributions array
 */
function distributeEvidenceContributions(canonicalAttempt = {}, questionMapping = {}, availableCalibration = {}) {
  const rawSkills = Array.isArray(questionMapping.skills) && questionMapping.skills.length > 0
    ? questionMapping.skills
    : [{
        skillId: questionMapping.primarySkill?.id || 'unknown_skill',
        role: SKILL_ROLES.PRIMARY,
        evidenceLevel: questionMapping.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN,
        evidenceLevelSource: questionMapping.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN,
        ontologyVersion: questionMapping.ontologyVersion || ONTOLOGY_VERSION
      }];

  // Deterministic Duplicate Skill Attribution Guard (Test 39)
  // Merge multiple attributions for the same skill ID: PRIMARY takes precedence over SUPPORTING
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
    canonicalAttempts: 1, // CONSTITUTIONAL INVARIANT: never multiplied!
    contributions: Object.freeze(contributions)
  });
}

module.exports = {
  CALIBRATION_VERSION,
  CALIBRATION_POLICY,
  MIN_DIFFICULTY_OBSERVATIONS,
  EVIDENCE_LEVELS,
  EVIDENCE_LEVEL_SOURCES,
  EVIDENCE_LEVEL_WEIGHTS,
  INDEPENDENCE_FACTORS,
  NOVELTY_FACTORS,
  SKILL_ROLE_WEIGHTS,
  normalizeBoolean,
  computeCalibrationSnapshotHash,
  calculateIndependenceFactor,
  calculateNoveltyFactor,
  calibrateItemDifficulty,
  qualifyEvidenceContribution,
  distributeEvidenceContributions
};
