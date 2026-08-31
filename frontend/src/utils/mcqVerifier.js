/**
 * Tixar MCQ Option Verifier & Distractor Generator
 *
 * Ensures that any Multiple Choice Question (MCQ) ALWAYS presents the learner
 * with the verified correct answer alongside 3 realistic, high-quality distractors.
 *
 * Catches database corruption where stored options (e.g. ["30", "65", "90", "60"])
 * completely lack the true answer (e.g. 6).
 */

import { verifyQuestionAcrossSubjects } from "./subjectVerifierRouter.js";

/**
 * Validates and repairs MCQ options for a given question object.
 *
 * @param {Object} questionObj - Current question object (with q, ans, options, etc.)
 * @returns {Object} Repaired question object with guaranteed valid options
 */
export function getVerifiedQuestionWithOptions(questionObj) {
  if (!questionObj) return questionObj;

  const qText = questionObj.q || questionObj.stem || "";
  const rawAns = questionObj.ans || "";

  // 1. Run Universal Multi-Subject Verification to get ground-truth answer
  const verification = verifyQuestionAcrossSubjects(qText, rawAns, questionObj);
  const targetAns = verification.wasOverridden ? verification.verifiedAnswer : String(rawAns);

  // If question has no options, return with verified answer & steps
  if (!Array.isArray(questionObj.options) || questionObj.options.length === 0) {
    return {
      ...questionObj,
      ans: targetAns,
      steps: verification.verifiedSteps || questionObj.steps || [],
      solution: verification.explanation || questionObj.sol || questionObj.why || "",
    };
  }

  // 2. Check if existing options contain the verified answer
  const normalizedTarget = normalizeOpt(targetAns);
  const options = questionObj.options.map((o) => String(o).trim());
  const hasTarget = options.some((opt) => isOptionMatch(opt, targetAns, normalizedTarget));

  if (hasTarget) {
    // Existing options are valid — keep them (and update ans if overridden)
    return {
      ...questionObj,
      ans: targetAns,
      steps: verification.verifiedSteps || questionObj.steps || [],
    };
  }

  // 3. Existing options are BROKEN / MISSING the target answer -> Regenerate 4 options
  const repairedOptions = generateRepairedOptions(targetAns, qText, options);

  return {
    ...questionObj,
    ans: targetAns,
    options: repairedOptions,
    steps: verification.verifiedSteps || questionObj.steps || [],
    solution: verification.explanation || questionObj.sol || questionObj.why || "",
  };
}

/**
 * Generates 4 clean, realistic MCQ options including targetAns.
 */
function generateRepairedOptions(targetAns, qText, existingOptions = []) {
  const targetNum = parseFloat(String(targetAns).trim());
  const isNumeric = !isNaN(targetNum) && String(targetAns).trim().match(/^-?\d+(?:\.\d+)?$/) !== null;

  if (isNumeric) {
    // Generate realistic mathematical distractors
    const unitMatch = String(targetAns).match(/\s*([a-z²³]+)$/i) || qText.match(/\b(cm|m|km|mm|ft|in|units?)\b/i);
    const unit = unitMatch ? ` ${unitMatch[1]}` : "";

    const d1 = targetNum + 2;
    const d2 = Math.max(1, Math.round(targetNum * 1.5));
    const d3 = Math.max(0, targetNum - 1 === targetNum ? targetNum + 4 : Math.abs(targetNum - 2));

    const set = new Set();
    set.add(`${targetNum}${unit}`);
    set.add(`${d1}${unit}`);
    set.add(`${d2}${unit}`);
    set.add(`${d3}${unit}`);

    // If set is smaller than 4, add extra distractors
    let count = 1;
    while (set.size < 4) {
      set.add(`${targetNum + count * 3}${unit}`);
      count++;
    }

    const opts = Array.from(set).slice(0, 4);
    return shuffleArray(opts);
  }

  // Non-numeric text question: replace the 4th option with targetAns
  const cleaned = existingOptions.filter((o) => o && o !== targetAns).slice(0, 3);
  cleaned.unshift(targetAns);

  while (cleaned.length < 4) {
    cleaned.push(`None of the above`);
  }

  return shuffleArray(cleaned);
}

function isOptionMatch(optStr, targetAnsStr, normalizedTarget) {
  const normOpt = normalizeOpt(optStr);
  if (normOpt === normalizedTarget) return true;

  const numOpt = parseFloat(optStr);
  const numTarget = parseFloat(targetAnsStr);

  if (!isNaN(numOpt) && !isNaN(numTarget)) {
    return Math.abs(numOpt - numTarget) < 1e-5;
  }

  return normOpt.includes(normalizedTarget) || normalizedTarget.includes(normOpt);
}

function normalizeOpt(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^\w]/g, "")
    .trim();
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
