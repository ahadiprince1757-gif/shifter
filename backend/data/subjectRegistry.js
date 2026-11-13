/**
 * CANONICAL TIXAR SUBJECT REGISTRY (Backend)
 * Single authoritative source of truth for all active Tixar subjects.
 */

const SUBJECTS = Object.freeze({
  math: {
    id: "math",
    name: "Mathematics",
    tier: 1,
    status: "active",
  },
  physics: {
    id: "physics",
    name: "Physics",
    tier: 2,
    status: "active",
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    tier: 2,
    status: "active",
  },
  biology: {
    id: "biology",
    name: "Biology",
    tier: 3,
    status: "active",
  },
  english: {
    id: "english",
    name: "English",
    tier: 3,
    status: "active",
  },
  computer: {
    id: "computer",
    name: "Computer Studies",
    tier: 3,
    status: "active",
  },
});

const ACTIVE_SUBJECT_IDS = Object.freeze(Object.keys(SUBJECTS));

function isSubjectActive(subjectId) {
  if (!subjectId || typeof subjectId !== "string") return false;
  return ACTIVE_SUBJECT_IDS.includes(subjectId.toLowerCase().trim());
}

function getSubject(subjectId) {
  if (!subjectId || typeof subjectId !== "string") return null;
  return SUBJECTS[subjectId.toLowerCase().trim()] || null;
}

module.exports = {
  SUBJECTS,
  ACTIVE_SUBJECT_IDS,
  isSubjectActive,
  getSubject,
};
