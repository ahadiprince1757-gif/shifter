/**
 * weaknessMap.js
 *
 * After the EVALUATE phase, converts `failedQuestions[]` from useQuiz into a
 * WeaknessMap that groups failures by concept.  The system then runs one
 * targeted repair cycle per concept group instead of one per wrong question.
 *
 * WeaknessMap shape:
 * {
 *   [conceptTag]: {
 *     conceptTag: string,
 *     questions: Array<{ qIdx, questionText, correctAnswer, solution }>,
 *     repairTaught: boolean,
 *     repairPassed: boolean,
 *   }
 * }
 */

/**
 * Derive a stable concept tag from a question object.
 * Uses q.concept_tag when the backend provides it;
 * falls back to a short slug of the question text so the system still works
 * against existing content that has no concept_tag field.
 *
 * @param {object} q  - question object from content.qs[]
 * @param {number} qIdx
 * @returns {string}
 */
function deriveConceptTag(q, qIdx) {
  if (q && q.concept_tag && q.concept_tag.trim()) {
    return q.concept_tag.trim().toLowerCase().replace(/\s+/g, "_");
  }
  // Fallback: first 4 significant words of the question text → deterministic slug
  const text = (q && q.q) || "";
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 4);
  return words.length > 0 ? words.join("_") : `question_${qIdx}`;
}

/**
 * Build a WeaknessMap from the list of failed questions produced by useQuiz.
 *
 * @param {Array<{ qIdx, question, correctAnswer, solution, mark }>} failedQuestions
 * @param {Array<object>} allQuestions  - full content.qs[] array
 * @returns {object}  WeaknessMap keyed by concept tag
 */
export function buildWeaknessMap(failedQuestions = [], allQuestions = []) {
  const map = {};

  for (const failed of failedQuestions) {
    const originalQ = allQuestions[failed.qIdx] || null;
    const conceptTag = deriveConceptTag(originalQ, failed.qIdx);

    if (!map[conceptTag]) {
      map[conceptTag] = {
        conceptTag,
        questions: [],
        repairTaught: false,
        repairPassed: false,
      };
    }

    map[conceptTag].questions.push({
      qIdx: failed.qIdx,
      questionText: failed.question || (originalQ && originalQ.q) || "",
      correctAnswer: failed.correctAnswer || (originalQ && originalQ.ans) || "",
      solution: failed.solution || (originalQ && (originalQ.sol || originalQ.why)) || "",
      mark: failed.mark || (originalQ && originalQ.mark) || "",
      originalQ,
    });
  }

  return map;
}

/**
 * Return an ordered array of concept tags from the WeaknessMap,
 * sorted so concepts with more failures come first.
 *
 * @param {object} weaknessMap
 * @returns {string[]}
 */
export function getConceptOrder(weaknessMap) {
  return Object.keys(weaknessMap).sort(
    (a, b) =>
      weaknessMap[b].questions.length - weaknessMap[a].questions.length
  );
}

/**
 * Mark a concept's repair phase as taught (mini-explanation shown).
 * Returns a new WeaknessMap (immutable update).
 */
export function markRepairTaught(weaknessMap, conceptTag) {
  if (!weaknessMap[conceptTag]) return weaknessMap;
  return {
    ...weaknessMap,
    [conceptTag]: { ...weaknessMap[conceptTag], repairTaught: true },
  };
}

/**
 * Mark a concept's repair phase as passed (retry answered correctly).
 * Returns a new WeaknessMap (immutable update).
 */
export function markRepairPassed(weaknessMap, conceptTag) {
  if (!weaknessMap[conceptTag]) return weaknessMap;
  return {
    ...weaknessMap,
    [conceptTag]: { ...weaknessMap[conceptTag], repairPassed: true },
  };
}

/**
 * Returns true when every concept in the map has been repaired (passed or taught).
 */
export function allRepairsComplete(weaknessMap) {
  return (
    Object.keys(weaknessMap).length > 0 &&
    Object.values(weaknessMap).every((c) => c.repairTaught && c.repairPassed)
  );
}
