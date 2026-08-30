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
 * Derives the underlying cognitive prerequisite skill and root-cause breakdown
 * for a failed concept.
 */
function derivePrerequisiteAnalysis(qText) {
  const text = (qText || "").toLowerCase();
  
  if (/\b(area|perimeter|rectangle|triangle|circle|radius|length|width)\b/i.test(text)) {
    return {
      prerequisiteSkill: "Geometric Dimensional Properties & Formulas",
      rootCause: "Sub-concept confusion between linear perimeter and 2D area calculations",
      remediationAction: "Isolate length/width relationship before computing total area",
    };
  }

  if (/\b(x|=|solve|equation|algebra|factor)\b/i.test(text)) {
    return {
      prerequisiteSkill: "Algebraic Equivalence & Inverse Operations",
      rootCause: "Misapplication of inverse operations across equal sign",
      remediationAction: "Isolate variable term by applying matching operations on both sides",
    };
  }

  if (/\b(speed|distance|time|rate|km\/h|m\/s)\b/i.test(text)) {
    return {
      prerequisiteSkill: "Rate & Kinematic Relations",
      rootCause: "Incorrect operational pairing of speed, distance, and time variables",
      remediationAction: "Check variable triangle: Distance = Speed × Time",
    };
  }

  if (/\b(%|percent|profit|discount|interest|shilling|ksh)\b/i.test(text)) {
    return {
      prerequisiteSkill: "Percentage Proportions & Base Quantity Calculation",
      rootCause: "Identifying correct base principal amount before applying rate percentage",
      remediationAction: "Define initial principal value as 100% baseline",
    };
  }

  return {
    prerequisiteSkill: "Core Operational Logic & Rule Application",
    rootCause: "Misconception in core procedural rule or step-by-step evaluation",
    remediationAction: "Review core definition step-by-step",
  };
}

/**
 * Build a WeaknessMap from the list of failed questions produced by useQuiz.
 * Now enriched with Cognitive Prerequisite Graph diagnostics.
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
    const qText = failed.question || (originalQ && originalQ.q) || "";
    const diag = derivePrerequisiteAnalysis(qText, originalQ, failed.mark);

    if (!map[conceptTag]) {
      map[conceptTag] = {
        conceptTag,
        prerequisiteSkill: diag.prerequisiteSkill,
        rootCause: diag.rootCause,
        remediationAction: diag.remediationAction,
        questions: [],
        repairTaught: false,
        repairPassed: false,
      };
    }

    map[conceptTag].questions.push({
      qIdx: failed.qIdx,
      questionText: qText,
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
