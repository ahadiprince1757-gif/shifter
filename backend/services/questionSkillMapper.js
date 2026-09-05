/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-A
 * Question-to-Skill Evidence Mapper & Attribution Engine
 * 
 * Invariants: Tixar Intelligence Law
 * 1. Question Evidence != Skill Attribution (Attribution is an interpretation).
 * 2. Attribution Does Not Multiply Evidence (1 attempt remains 1 attempt).
 * 3. Difficulty strictly remains null until empirical calibration.
 * 4. Untagged items map to UNKNOWN_SKILL with boundary enforcement.
 */

const crypto = require('crypto');
const {
  ONTOLOGY_VERSION,
  SKILL_ROLES,
  MAPPING_SOURCES,
  MAPPING_CONFIDENCE,
  UNKNOWN_SKILL,
  getSkillById
} = require('./skillOntology');

/**
 * Generates a deterministic content hash for question text/stem to ensure question versioning integrity.
 * @param {string} text Question text or stem
 * @returns {string} SHA-256 content hash
 */
function computeQuestionContentHash(text = '') {
  const normalized = String(text || '').trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 16);
}

/**
 * Maps question raw metadata into standardized, versioned skill attributions.
 * 
 * @param {Object} question Raw question entity or telemetry payload
 * @returns {Object} Canonical Question Attribution Map
 */
function mapQuestionToSkills(question = {}) {
  const questionId = question.id || question.question_id || question.questionId || 'unknown_question';
  const questionVersion = String(question.version || question.question_version || '1');
  const questionText = question.q || question.question || question.text || '';
  const questionContentHash = question.content_hash || question.contentHash || computeQuestionContentHash(questionText);

  // Cognitive Level (truthful: null when untagged)
  const rawCognitive = question.cognitive_level || question.cognitiveLevel || null;
  const cognitiveLevel = rawCognitive ? String(rawCognitive).toUpperCase().trim() : null;

  // Blueprint identifier
  const blueprintId = question.blueprint_id || question.blueprintId || null;

  // Extract skills
  const rawPrimarySkillId = question.primary_skill || question.primarySkill || question.skill_id || question.skillId;
  const rawSkillsList = Array.isArray(question.skills) ? question.skills : [];
  const rawSecondary = Array.isArray(question.secondary_skills)
    ? question.secondary_skills
    : Array.isArray(question.secondarySkills)
    ? question.secondarySkills
    : [];

  const attributedSkills = [];

  if (rawSkillsList.length > 0) {
    for (const item of rawSkillsList) {
      const skillId = typeof item === 'string' ? item : item.skillId || item.id;
      const role = item.role || (attributedSkills.length === 0 ? SKILL_ROLES.PRIMARY : SKILL_ROLES.SUPPORTING);
      const source = item.attributionSource || item.mappingSource || MAPPING_SOURCES.AUTHOR_TAG;
      const confidence = item.confidence !== undefined ? item.confidence : (MAPPING_CONFIDENCE[source] || 1.0);

      const resolved = getSkillById(skillId);
      attributedSkills.push({
        skillId: resolved.id,
        role: Object.values(SKILL_ROLES).includes(role) ? role : SKILL_ROLES.SUPPORTING,
        attributionSource: source,
        confidence,
        ontologyVersion: ONTOLOGY_VERSION
      });
    }
  } else if (rawPrimarySkillId) {
    const primaryResolved = getSkillById(rawPrimarySkillId);
    attributedSkills.push({
      skillId: primaryResolved.id,
      role: SKILL_ROLES.PRIMARY,
      attributionSource: question.mapping_source || MAPPING_SOURCES.AUTHOR_TAG,
      confidence: MAPPING_CONFIDENCE[question.mapping_source || MAPPING_SOURCES.AUTHOR_TAG] || 1.0,
      ontologyVersion: ONTOLOGY_VERSION
    });

    for (const sec of rawSecondary) {
      const secId = typeof sec === 'string' ? sec : sec.skillId || sec.id;
      const secResolved = getSkillById(secId);
      attributedSkills.push({
        skillId: secResolved.id,
        role: SKILL_ROLES.SUPPORTING,
        attributionSource: MAPPING_SOURCES.AUTHOR_TAG,
        confidence: 0.9,
        ontologyVersion: ONTOLOGY_VERSION
      });
    }
  } else {
    // Untagged -> Explicit UNKNOWN_SKILL
    attributedSkills.push({
      skillId: UNKNOWN_SKILL.id,
      role: SKILL_ROLES.UNKNOWN,
      attributionSource: MAPPING_SOURCES.UNKNOWN,
      confidence: null,
      ontologyVersion: ONTOLOGY_VERSION
    });
  }

  // Ensure there is an identified primary skill
  const primaryAttribution = attributedSkills.find(s => s.role === SKILL_ROLES.PRIMARY) || attributedSkills[0];

  return {
    questionId,
    questionVersion,
    questionContentHash,
    ontologyVersion: ONTOLOGY_VERSION,
    primarySkill: {
      id: primaryAttribution.skillId,
      ontologyVersion: ONTOLOGY_VERSION,
      isUnknown: primaryAttribution.skillId === UNKNOWN_SKILL.id
    },
    skills: attributedSkills,
    cognitiveLevel,
    difficulty: null, // Empirical difficulty strictly null until calibrated
    blueprintId
  };
}

module.exports = {
  computeQuestionContentHash,
  mapQuestionToSkills
};
