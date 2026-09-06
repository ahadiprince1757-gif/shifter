/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM
 * Shared Evidence Classification Vocabulary (ESM)
 * 
 * Defines standard taxonomy and sources for evidence levels, shared between
 * Question Mapping (P1-A) and Evidence Qualification (P2-A) without layering inversion.
 */

export const EVIDENCE_LEVELS = Object.freeze({
  RECOGNITION: 'RECOGNITION',
  RECALL: 'RECALL',
  PROCEDURAL: 'PROCEDURAL',
  APPLICATION: 'APPLICATION',
  TRANSFER: 'TRANSFER',
  UNKNOWN: 'UNKNOWN'
});

export const EVIDENCE_LEVEL_SOURCES = Object.freeze({
  AUTHOR_TAG: 'AUTHOR_TAG',
  BLUEPRINT: 'BLUEPRINT',
  CURRICULUM_RULE: 'CURRICULUM_RULE',
  UNKNOWN: 'UNKNOWN'
});
