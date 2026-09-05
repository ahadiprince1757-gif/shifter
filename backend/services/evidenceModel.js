/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P2-A
 * Evidence Strength Model & Evidence Qualification Engine
 * 
 * Invariants (P2 Constitution):
 * 1. Calibration may change how Tixar interprets evidence, but it may never change what evidence actually occurred.
 * 2. Performance quality may strengthen evidence WITHIN an evidence level; it cannot promote evidence to a higher level (Law of Non-Promotion).
 * 3. Hint contamination reduces evidence strength / independence factor; it does NOT mark the attempt as incorrect.
 * 4. Multi-skill question evidence attribution: 1 canonical attempt produces qualified evidence contributions for N skills without multiplying canonical attempts (Conservation of Canonical Attempts).
 * 5. Difficulty is empirical, not assumed: N < MIN_DIFFICULTY_OBSERVATIONS strictly yields difficulty = null.
 * 6. Temporal Calibration Integrity: itemDifficultyAtObservation is temporally scoped and immutable once recorded.
 */

const crypto = require('crypto');
const { ONTOLOGY_VERSION, SKILL_ROLES } = require('./skillOntology');

const CALIBRATION_VERSION = '1.0.0';
const MIN_DIFFICULTY_OBSERVATIONS = 30;

const EVIDENCE_LEVELS = Object.freeze({
  RECOGNITION: 'RECOGNITION',
  RECALL: 'RECALL',
  PROCEDURAL: 'PROCEDURAL',
  APPLICATION: 'APPLICATION',
  TRANSFER: 'TRANSFER',
  UNKNOWN: 'UNKNOWN'
});

const EVIDENCE_LEVEL_SOURCES = Object.freeze({
  AUTHOR_TAG: 'AUTHOR_TAG',
  BLUEPRINT: 'BLUEPRINT',
  CURRICULUM_RULE: 'CURRICULUM_RULE',
  UNKNOWN: 'UNKNOWN'
});

const EVIDENCE_LEVEL_WEIGHTS = Object.freeze({
  [EVIDENCE_LEVELS.RECOGNITION]: 0.40,
  [EVIDENCE_LEVELS.RECALL]: 0.55,
  [EVIDENCE_LEVELS.PROCEDURAL]: 0.70,
  [EVIDENCE_LEVELS.APPLICATION]: 0.85,
  [EVIDENCE_LEVELS.TRANSFER]: 1.00,
  [EVIDENCE_LEVELS.UNKNOWN]: 0.30
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
  [SKILL_ROLES.UNKNOWN]: 0.10
});

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
    minDifficultyObservations: MIN_DIFFICULTY_OBSERVATIONS,
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
  UNKNOWN: 0.30
};

/**
 * Calculates independence factor based on hint usage and assistance telemetry.
 * Hint usage decreases evidential diagnostic strength without invalidating or mutating correctness.
 * 
 * @param {Object} observed Observation details (hintsUsed, solutionRevealed, assistanceLevel)
 * @returns {number} Independence factor between 0.00 and 1.00
 */
function calculateIndependenceFactor(observed = {}) {
  if (observed.solutionRevealed || observed.answerRevealed) {
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
 * Invariant: N < MIN_DIFFICULTY_OBSERVATIONS strictly yields null.
 * Invariant: Identical observations yield identical difficulty (determinism).
 * 
 * @param {Array<Object>} itemObservations Array of student attempts on this item
 * @param {number} minObservations Population threshold requirement
 * @returns {number|null} Calibrated difficulty in [0, 1] or null
 */
function calibrateItemDifficulty(itemObservations = [], minObservations = MIN_DIFFICULTY_OBSERVATIONS) {
  if (!Array.isArray(itemObservations) || itemObservations.length < minObservations) {
    return null;
  }

  // Count incorrect attempts
  const total = itemObservations.length;
  const incorrectCount = itemObservations.filter(obs => {
    const isCorrect = obs.is_correct !== undefined ? obs.is_correct : (obs.correct !== undefined ? obs.correct : false);
    return !Boolean(isCorrect);
  }).length;

  const failureRate = incorrectCount / total;
  return Math.round(failureRate * 100) / 100;
}

/**
 * Transforms an immutable canonical attempt into a qualified EvidenceContribution.
 * 
 * Constitutional Protections Enforced:
 * - Does NOT mutate canonicalAttempt (immutability).
 * - Does NOT upgrade evidenceLevel (Law of Non-Promotion: excellent procedural performance is PROCEDURAL).
 * - Independence factor discounts evidence without changing correctness.
 * - Novelty factor discounts repeated attempts without multiplying events.
 * 
 * @param {Object} canonicalAttempt Immutable observation
 * @param {Object} skillAttribution Skill mapping containing role and evidenceLevel
 * @param {Object} availableCalibration Current calibration state
 * @returns {Object} Qualified EvidenceContribution
 */
function qualifyEvidenceContribution(canonicalAttempt = {}, skillAttribution = {}, availableCalibration = {}) {
  if (!canonicalAttempt || typeof canonicalAttempt !== 'object') {
    throw new Error('[evidenceModel] canonicalAttempt is required');
  }

  // 1. Extract raw observation fields (WITHOUT mutating the input attempt)
  const attemptId = canonicalAttempt.client_event_id || canonicalAttempt.id || `att-${Date.now()}`;
  const questionId = canonicalAttempt.question_id || canonicalAttempt.questionId || skillAttribution.questionId || 'unknown_item';
  const isCorrect = Boolean(canonicalAttempt.is_correct ?? canonicalAttempt.correct ?? false);
  const hintsUsed = Number(canonicalAttempt.hints_used ?? canonicalAttempt.hintsUsed ?? canonicalAttempt.hints ?? 0);
  const attemptOrdinal = Math.max(1, parseInt(canonicalAttempt.attempt_ordinal ?? canonicalAttempt.attemptOrdinal ?? 1, 10) || 1);

  // 2. Resolve skill role and weight
  const skillId = skillAttribution.skillId || skillAttribution.id || 'unknown_skill';
  const skillRole = skillAttribution.role || SKILL_ROLES.PRIMARY;
  const evidenceWeight = SKILL_ROLE_WEIGHTS[skillRole] !== undefined ? SKILL_ROLE_WEIGHTS[skillRole] : SKILL_ROLE_WEIGHTS[SKILL_ROLES.PRIMARY];

  // 3. Resolve evidence level with strict NON-PROMOTION guard
  // Author/blueprint defines the level; student performance CANNOT promote it
  let declaredLevel = skillAttribution.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN;
  if (!Object.values(EVIDENCE_LEVELS).includes(declaredLevel)) {
    declaredLevel = EVIDENCE_LEVELS.UNKNOWN;
  }
  const evidenceLevelSource = skillAttribution.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN;

  // 4. Calculate qualification factors
  const independenceFactor = calculateIndependenceFactor({
    hintsUsed,
    solutionRevealed: canonicalAttempt.solution_revealed || canonicalAttempt.answer_revealed,
    assistanceLevel: canonicalAttempt.assistance_level || canonicalAttempt.assistanceLevel
  });

  const noveltyFactor = calculateNoveltyFactor(attemptOrdinal);

  // 5. Deterministic evidence strength calculation
  const baseLevelWeight = EVIDENCE_LEVEL_WEIGHTS[declaredLevel] ?? EVIDENCE_LEVEL_WEIGHTS.UNKNOWN;
  // A correct answer provides direct affirmative evidence; an incorrect answer provides gap diagnostic evidence
  const accuracyMultiplier = isCorrect ? 1.0 : 0.45;
  const rawStrength = baseLevelWeight * accuracyMultiplier * independenceFactor * noveltyFactor * evidenceWeight;
  const evidenceStrength = Math.round(rawStrength * 100) / 100;

  // 6. Temporal Calibration Integrity
  // itemDifficultyAtObservation must reflect the difficulty available AT OBSERVATION TIME
  let itemDifficultyAtObservation = null;
  if (canonicalAttempt.item_difficulty_at_observation !== undefined) {
    itemDifficultyAtObservation = canonicalAttempt.item_difficulty_at_observation;
  } else if (availableCalibration.itemDifficultyAtObservation !== undefined) {
    itemDifficultyAtObservation = availableCalibration.itemDifficultyAtObservation;
  } else if (availableCalibration.itemDifficulty !== undefined) {
    itemDifficultyAtObservation = availableCalibration.itemDifficulty;
  }

  const calibVersion = availableCalibration.calibrationVersion || CALIBRATION_VERSION;
  const calibHash = availableCalibration.calibrationSnapshotHash || computeCalibrationSnapshotHash(calibVersion);

  return Object.freeze({
    attemptId,
    questionId,
    skillId,
    skillRole,
    evidenceLevel: declaredLevel,
    evidenceLevelSource,
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
      itemDifficultyAtObservation
    }),
    provenance: Object.freeze({
      ontologyVersion: skillAttribution.ontologyVersion || ONTOLOGY_VERSION,
      calibrationVersion: calibVersion,
      calibrationSnapshotHash: calibHash
    })
  });
}

/**
 * Distributes qualified evidence contributions for a question attempt across all attributed skills.
 * 
 * Constitutional Invariant:
 * 1 canonical attempt remains 1 canonical attempt in the ledger.
 * Skills receive separately qualified contributions according to their roles (PRIMARY = 1.0, SUPPORTING = 0.35).
 * 
 * @param {Object} canonicalAttempt Single student attempt
 * @param {Object} questionMapping Mapped question attribution structure
 * @param {Object} availableCalibration Calibration metadata
 * @returns {Object} Attribution distribution containing canonicalAttempts: 1 and contributions array
 */
function distributeEvidenceContributions(canonicalAttempt = {}, questionMapping = {}, availableCalibration = {}) {
  const skills = Array.isArray(questionMapping.skills) && questionMapping.skills.length > 0
    ? questionMapping.skills
    : [{
        skillId: questionMapping.primarySkill?.id || 'unknown_skill',
        role: SKILL_ROLES.PRIMARY,
        evidenceLevel: questionMapping.evidenceLevel || EVIDENCE_LEVELS.UNKNOWN,
        evidenceLevelSource: questionMapping.evidenceLevelSource || EVIDENCE_LEVEL_SOURCES.UNKNOWN,
        ontologyVersion: questionMapping.ontologyVersion || ONTOLOGY_VERSION
      }];

  const contributions = skills.map(attr => {
    // Preserve question-level evidenceLevel if attribution does not specify one
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
  MIN_DIFFICULTY_OBSERVATIONS,
  EVIDENCE_LEVELS,
  EVIDENCE_LEVEL_SOURCES,
  EVIDENCE_LEVEL_WEIGHTS,
  INDEPENDENCE_FACTORS,
  NOVELTY_FACTORS,
  SKILL_ROLE_WEIGHTS,
  computeCalibrationSnapshotHash,
  calculateIndependenceFactor,
  calculateNoveltyFactor,
  calibrateItemDifficulty,
  qualifyEvidenceContribution,
  distributeEvidenceContributions
};
