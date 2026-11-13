/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-A
 * Question-to-Skill Evidence Mapper & Attribution Engine (Client Module)
 * 
 * Invariants: Tixar Intelligence Law
 * 1. Question Evidence != Skill Attribution (Attribution is an interpretation).
 * 2. Attribution Does Not Multiply Evidence (1 attempt remains 1 attempt).
 * 3. Difficulty strictly remains null until empirical calibration.
 * 4. Untagged items map to UNKNOWN_SKILL with boundary enforcement.
 */

import {
  ONTOLOGY_VERSION,
  SKILL_ROLES,
  MAPPING_SOURCES,
  MAPPING_CONFIDENCE,
  UNKNOWN_SKILL,
  getSkillById
} from "../data/skillOntology.js";
import {
  EVIDENCE_LEVELS,
  EVIDENCE_LEVEL_SOURCES
} from "../data/evidenceVocabulary.js";

/**
 * Deterministic synchronous hex hash for question content versioning.
 * @param {string} text Question text
 * @returns {string} Hex hash string
 */
export function computeQuestionContentHash(text = '') {
  const str = String(text || '').trim().toLowerCase();
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
}

/**
 * Maps question raw metadata into standardized, versioned skill attributions.
 * 
 * @param {Object} question Raw question entity or telemetry payload
 * @returns {Object} Canonical Question Attribution Map
 */
export function mapQuestionToSkills(question = {}) {
  const questionId = question.id || question.question_id || question.questionId || 'unknown_question';
  const questionVersion = String(question.version || question.question_version || '1');
  const questionText = question.q || question.question || question.text || '';
  const questionContentHash = question.content_hash || question.contentHash || computeQuestionContentHash(questionText);

  // Cognitive Level (truthful: null when untagged)
  const rawCognitive = question.cognitive_level || question.cognitiveLevel || null;
  const cognitiveLevel = rawCognitive ? String(rawCognitive).toUpperCase().trim() : null;

  // Evidence Level (truthful: UNKNOWN when untagged/undeclared)
  const rawEvidenceLevel = question.evidence_level || question.evidenceLevel || null;
  let evidenceLevel = rawEvidenceLevel ? String(rawEvidenceLevel).toUpperCase().trim() : null;
  if (!evidenceLevel || !Object.values(EVIDENCE_LEVELS).includes(evidenceLevel)) {
    evidenceLevel = EVIDENCE_LEVELS.UNKNOWN;
  }

  const rawEvidenceLevelSource = question.evidence_level_source || question.evidenceLevelSource || null;
  let evidenceLevelSource = rawEvidenceLevelSource ? String(rawEvidenceLevelSource).toUpperCase().trim() : null;
  if (!evidenceLevelSource || !Object.values(EVIDENCE_LEVEL_SOURCES).includes(evidenceLevelSource)) {
    evidenceLevelSource = evidenceLevel === EVIDENCE_LEVELS.UNKNOWN ? EVIDENCE_LEVEL_SOURCES.UNKNOWN : EVIDENCE_LEVEL_SOURCES.AUTHOR_TAG;
  }

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
        evidenceLevel: item.evidenceLevel || evidenceLevel,
        evidenceLevelSource: item.evidenceLevelSource || evidenceLevelSource,
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
      evidenceLevel,
      evidenceLevelSource,
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
        evidenceLevel,
        evidenceLevelSource,
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
      evidenceLevel: EVIDENCE_LEVELS.UNKNOWN,
      evidenceLevelSource: EVIDENCE_LEVEL_SOURCES.UNKNOWN,
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
    evidenceLevel,
    evidenceLevelSource,
    difficulty: null, // Empirical difficulty strictly null until calibrated
    blueprintId
  };
}
