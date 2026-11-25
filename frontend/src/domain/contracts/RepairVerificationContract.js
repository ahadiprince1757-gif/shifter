/**
 * Repair Verification Contract
 *
 * Enforces Tixar's Fundamental Invariant:
 * Diagnosed Skill ≡ Repair Skill ≡ Retest Skill
 *
 * Any divergence between diagnosed skill and retest question skill
 * throws a RETEST_SKILL_MISMATCH domain error.
 */

export const RETEST_SKILL_MISMATCH = "RETEST_SKILL_MISMATCH";

/**
 * Normalizes a skill ID to canonical kebab-case format.
 * e.g., "math_numbers_bodmas", "BODMAS / Order of Operations", "bodmas-order-of-operations"
 * -> "math-numbers-bodmas-order-of-operations" or canonical standard.
 */
export function canonicalSkillId(skillId) {
  if (!skillId) return "unspecified-skill";
  return String(skillId)
    .trim()
    .toLowerCase()
    .replace(/[\s_/\\|]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Validates that a retest question tests the exact skill that was diagnosed.
 *
 * @param {Object} retestQuestion - The proposed retest question
 * @param {Object} repairPlan - The active repair plan containing diagnosedSkillId
 * @returns {boolean} true if valid
 * @throws {Error} RETEST_SKILL_MISMATCH if skills diverge
 */
export function validateRetestSkill(retestQuestion, repairPlan) {
  if (!repairPlan) {
    throw new Error("[RepairVerificationContract] repairPlan is required");
  }

  const diagnosedSkill = canonicalSkillId(
    repairPlan.diagnosedSkillId ||
    repairPlan.skillId ||
    repairPlan.conceptId ||
    repairPlan.concept
  );

  const retestSkill = canonicalSkillId(
    retestQuestion?.skillId ||
    retestQuestion?.conceptId ||
    retestQuestion?.topic ||
    retestQuestion?.concept
  );

  if (diagnosedSkill !== retestSkill) {
    const error = new Error(
      `[${RETEST_SKILL_MISMATCH}] Retest question skill '${retestSkill}' does not match diagnosed skill '${diagnosedSkill}'`
    );
    error.code = RETEST_SKILL_MISMATCH;
    error.diagnosedSkill = diagnosedSkill;
    error.retestSkill = retestSkill;
    throw error;
  }

  return true;
}

export function createRepairVerification({
  repairPlan,
  retestQuestion,
  isPassed = false,
  studentAnswer = "",
  timestamp = null,
}) {
  validateRetestSkill(retestQuestion, repairPlan);

  return {
    diagnosedSkillId: canonicalSkillId(repairPlan.diagnosedSkillId || repairPlan.skillId),
    retestQuestionId: retestQuestion.id || retestQuestion.qIdx,
    isPassed: Boolean(isPassed),
    studentAnswer: String(studentAnswer || ""),
    verifiedAt: timestamp || new Date().toISOString(),
  };
}
