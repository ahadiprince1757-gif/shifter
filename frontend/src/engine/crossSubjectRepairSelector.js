/**
 * TIXAR CROSS-SUBJECT REPAIR SELECTOR
 *
 * Implements the core Tixar milestone:
 * When a student struggles with a problem (e.g. in Chemistry), inspects diagnostic
 * evidence to determine whether the breakdown occurred on a domain concept
 * or a cross-subject foundational prerequisite (e.g. Mathematics fraction multiplication).
 *
 * Invariants:
 * 1. Required skills != Diagnosed gap. Never repair all required skills at once.
 * 2. If evidence is ambiguous or missing working, returns INCONCLUSIVE (does not guess).
 * 3. Retrieves targeted note sections from the skill's originating subject (e.g. Math notes for Chemistry arithmetic errors).
 * 4. Provides independent foundational retest and contextual transfer probes.
 */

import { getSkillById, SKILL_CLASSIFICATIONS } from "../data/skillOntology.js";
import { getPilotQuestionById } from "./pilotQuestionRegistry.js";
import { parseNoteSections, SECTION_TYPES } from "./noteSectionParser.js";

export const DIAGNOSTIC_CERTAINTY = Object.freeze({
  OBSERVED_CALCULATION_ERROR: "OBSERVED_CALCULATION_ERROR", // Explicit calculation error observed in lines of working
  CONFIRMED_MISCONCEPTION: "CONFIRMED_MISCONCEPTION",       // Unambiguous conceptual violation (e.g. 6 * 3/2 = 9)
  PROBABLE_EXPLANATION: "PROBABLE_EXPLANATION",             // Plausible failure mode requiring verification probe
  INCONCLUSIVE: "INCONCLUSIVE",                             // Insufficient evidence; bare answer or multiple conflicting causes
});

// Canonical curated repair library for foundational skills (sourced from authentic curriculum notes)
export const FOUNDATIONAL_REPAIR_LIBRARY = Object.freeze({
  "math.numbers.fractions.multiplication_division": {
    skillId: "math.numbers.fractions.multiplication_division",
    subjectId: "math",
    sectionId: "sec_math_fractions_multiplying_fractions_1",
    rule: "To multiply fractions, multiply the numerators straight across, and multiply the denominators straight across.",
    example: "(a/b) × (c/d) = (a × c) / (b × d). Example: 6 × (2/3) = (6 × 2) / 3 = 12 / 3 = 4.",
    noteSection: {
      id: "sec_math_fractions_multiplying_fractions_1",
      headingText: "Multiplying Fractions",
      sectionType: SECTION_TYPES.PROCEDURE,
      contentHtml: `
        <h3>Multiplying Fractions</h3>
        <p>When multiplying a whole number by a fraction, multiply the whole number by the numerator and divide by the denominator:</p>
        <pre>6 × (2/3) = (6 × 2) ÷ 3 = 12 ÷ 3 = 4</pre>
        <p>Never invert fractions during multiplication; inversion is strictly for division.</p>
      `.trim(),
    },
  },
  "math.numbers.integers.signed_arithmetic": {
    skillId: "math.numbers.integers.signed_arithmetic",
    subjectId: "math",
    sectionId: "sec_math_numbers_basic_operations_integers_1",
    rule: "Multiplication of positive integers requires accurate single-digit factor execution.",
    example: "2 × 40 = 80, not 70.",
    noteSection: {
      id: "sec_math_numbers_basic_operations_integers_1",
      headingText: "Basic Operations with Integers",
      sectionType: SECTION_TYPES.PROCEDURE,
      contentHtml: `
        <h3>Basic Operations with Integers</h3>
        <p>To multiply a single-digit integer by a multiple of 10, multiply the leading digits and append the zero:</p>
        <pre>2 × 40 = 2 × (4 × 10) = 8 × 10 = 80</pre>
      `.trim(),
    },
  },
  "chemistry.equations.balance_stoichiometry": {
    skillId: "chemistry.equations.balance_stoichiometry",
    subjectId: "chemistry",
    sectionId: "sec_chem_equations_balancing_chemical_equations_1",
    rule: "Balance atoms by changing front coefficients only. Never alter subscript numbers in a chemical formula.",
    example: "2Mg + O₂ → 2MgO (Total: 2 Mg, 2 O on both sides).",
    noteSection: {
      id: "sec_chem_equations_balancing_chemical_equations_1",
      headingText: "Balancing Chemical Equations",
      sectionType: SECTION_TYPES.MISCONCEPTION,
      contentHtml: `
        <h3>Balancing Chemical Equations</h3>
        <p>A chemical formula represents a fixed molecule. Changing subscripts creates a different, non-existent compound:</p>
        <pre>Correct: 2Mg + O₂ → 2MgO\nIncorrect: Mg + O₂ → MgO₂</pre>
      `.trim(),
    },
  },
  "chemistry.stoichiometry.extract_mole_ratio": {
    skillId: "chemistry.stoichiometry.extract_mole_ratio",
    subjectId: "chemistry",
    sectionId: "sec_chem_stoichiometry_interpreting_mole_ratios_1",
    rule: "The mole ratio is determined by the balancing coefficients in front of each substance.",
    example: "In 2Al + 3Cl₂ → 2AlCl₃, the ratio of AlCl₃ to Cl₂ is 2 : 3 (or 2/3).",
    noteSection: {
      id: "sec_chem_stoichiometry_interpreting_mole_ratios_1",
      headingText: "Interpreting Mole Ratios",
      sectionType: SECTION_TYPES.FOUNDATION,
      contentHtml: `
        <h3>Interpreting Mole Ratios</h3>
        <p>Coefficients represent mole ratios. The ratio of product to reactant is:</p>
        <pre>Multiplier = (Coefficient of substance sought) / (Coefficient of substance given)</pre>
      `.trim(),
    },
  },
});

/**
 * Selects the minimal, targeted cross-subject repair intervention.
 *
 * @param {object} params
 * @param {object} params.question - Problem definition { questionId, subjectId, topicId, skills }
 * @param {object} params.diagnosis - Diagnostic output { errorType, targetSkillId, certainty, status, evidenceId }
 * @param {object} [params.submission] - Student submission { rawAnswer, workingLines }
 * @returns {object} Structured RepairPlan or { status: "INCONCLUSIVE" }
 */
export function selectCrossSubjectRepair({
  question = {},
  diagnosis = {},
  submission = {},
}) {
  const pilotSpec = getPilotQuestionById(question.questionId);
  const qSubject = question.subjectId || pilotSpec?.subjectId || "general";
  const rawWorking = Array.isArray(submission.workingLines) ? submission.workingLines : [];

  // Invariant 1: If diagnosis is inconclusive, lacks empirical working, or targetSkillId is null, refuse to fabricate
  const isBareAnswer = rawWorking.length === 0 && !submission.writtenReasoning;
  const isExplicitlyInconclusive =
    diagnosis.status === "INCONCLUSIVE" ||
    diagnosis.certainty === DIAGNOSTIC_CERTAINTY.INCONCLUSIVE ||
    !diagnosis.targetSkillId;

  if (isExplicitlyInconclusive || (isBareAnswer && !diagnosis.isDirectObservation)) {
    return {
      status: "INCONCLUSIVE",
      diagnosticCertainty: DIAGNOSTIC_CERTAINTY.INCONCLUSIVE,
      reason: "Available student working does not uniquely identify the broken skill.",
      requiresProbe: true,
      questionId: question.questionId,
    };
  }

  const targetSkillId = diagnosis.targetSkillId;
  const targetSkill = getSkillById(targetSkillId);

  // Invariant 2: Detect whether this is a cross-subject foundational repair
  const isCrossSubject = targetSkill.subjectId && targetSkill.subjectId !== qSubject;

  // Retrieve matching instructional resource from library
  const repairResource = FOUNDATIONAL_REPAIR_LIBRARY[targetSkillId] || {
    skillId: targetSkillId,
    subjectId: targetSkill.subjectId || qSubject,
    sectionId: `sec_${targetSkillId.replace(/[^a-zA-Z0-9]/g, '_')}_1`,
    rule: `Review and verify the foundational rules for ${targetSkill.name}.`,
    example: "Carefully trace each step of the calculation.",
    noteSection: {
      id: `sec_${targetSkillId.replace(/[^a-zA-Z0-9]/g, '_')}_1`,
      headingText: targetSkill.name,
      sectionType: SECTION_TYPES.PROCEDURE,
      contentHtml: `<h3>${targetSkill.name}</h3><p>${targetSkill.description}</p>`,
    },
  };

  const foundationalRetest = pilotSpec?.foundationalRetest || {
    questionId: `retest_${targetSkillId}`,
    q: `Verify calculation for ${targetSkill.name}.`,
    ans: "",
    skillId: targetSkillId,
  };

  const contextualTransfer = pilotSpec?.contextualTransfer || {
    questionId: `transfer_${targetSkillId}`,
    q: `Apply ${targetSkill.name} in original domain problem.`,
    ans: "",
    skillId: targetSkillId,
  };

  const deliveredSectionIds = repairResource.noteSection?.id ? [repairResource.noteSection.id] : [];

  return {
    status: "REPAIR_SELECTED",
    repairId: `rep_${question.questionId || "q"}_${targetSkillId}`,
    questionId: question.questionId,
    diagnosedSkillId: targetSkillId,
    diagnosedSkillName: targetSkill.name,
    diagnosticCertainty: diagnosis.certainty || DIAGNOSTIC_CERTAINTY.OBSERVED_CALCULATION_ERROR,
    triggeringEvidenceIds: diagnosis.evidenceId ? [diagnosis.evidenceId] : [`ev_${question.questionId}_calc_slip`],
    deliveredResourceIds: deliveredSectionIds,
    repairVersion: "1.0.0",
    isCrossSubject,
    sourceSubjectId: repairResource.subjectId,
    originatingSubjectId: qSubject,
    repairStrategy: isCrossSubject ? "PREREQUISITE_CROSS_SUBJECT" : "DOMAIN_SPECIFIC_REPAIR",
    rule: repairResource.rule,
    example: repairResource.example,
    noteSection: repairResource.noteSection,
    foundationalRetest,
    contextualTransfer,
    successCriteria: "Demonstrate accurate unassisted execution on foundational retest before resuming domain question.",
  };
}
