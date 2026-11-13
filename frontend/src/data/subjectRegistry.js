/**
 * CANONICAL TIXAR SUBJECT REGISTRY
 * Single authoritative source of truth for all active Tixar subjects.
 *
 * LAW:
 * 1. Mathematics is Tier 1 (Flagship).
 * 2. Physics & Chemistry are Tier 2 (Expansion).
 * 3. Biology, English & Computer Studies are Tier 3 (Controlled).
 * 4. 'computer' is the ONLY canonical identifier for Computer Studies.
 * 5. Production code must NEVER recognize or import unlisted subjects.
 */

export const SUBJECTS = Object.freeze({
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

export const ACTIVE_SUBJECT_IDS = Object.freeze(Object.keys(SUBJECTS));

export function isSubjectActive(subjectId) {
  if (!subjectId || typeof subjectId !== "string") return false;
  return ACTIVE_SUBJECT_IDS.includes(subjectId.toLowerCase().trim());
}

export function getSubject(subjectId) {
  if (!subjectId || typeof subjectId !== "string") return null;
  return SUBJECTS[subjectId.toLowerCase().trim()] || null;
}
