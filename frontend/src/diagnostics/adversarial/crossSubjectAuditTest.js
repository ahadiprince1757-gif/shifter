import { validateSkillOntology, CORE_SKILL_REGISTRY } from "../../data/skillOntology.js";
import { getDirectPrerequisites, SKILL_RELATIONSHIPS } from "../../data/skillGraph.js";
import { parseNoteSections, SECTION_TYPES } from "../../engine/noteSectionParser.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log("=== CROSS-SUBJECT ARCHITECTURE VERIFICATION ===");

// Test 1: Skill Ontology Validation
const valRes = validateSkillOntology();
console.log("Ontology validation errors:", valRes.errors);
assert(valRes.valid, `Skill ontology validation failed with ${valRes.errors.length} errors`);
console.log("✅ PASS: Skill Ontology is structurally valid.");

// Test 2: Registered Pilot Skills
const registeredSkills = Object.keys(CORE_SKILL_REGISTRY);
assert(registeredSkills.includes("chemistry.stoichiometry.mole_to_mole_ratio_application"), "Missing mole ratio skill");
assert(registeredSkills.includes("math.numbers.fractions.multiplication_division"), "Missing fraction multiplication skill");
console.log(`✅ PASS: ${registeredSkills.length} canonical skills active.`);

// Test 3: Cross-Subject Graph Edges
const moleRatioPrereqs = getDirectPrerequisites("chemistry.stoichiometry.mole_to_mole_ratio_application");
const hasMathPrereq = moleRatioPrereqs.some(p => p.skillId === "math.numbers.fractions.multiplication_division");
assert(hasMathPrereq, "Mole ratio calculation must connect to math fraction multiplication in skill graph");
console.log("✅ PASS: Cross-subject graph relationship (Chemistry -> Math Fractions) verified.");

// Test 4: Note Section Parser (Chemistry & Math notes)
const sampleMoleNote = `
<h2>Meaning of Mole</h2>
<p>Introductory context about chemical particles and reactions.</p>
<h3>1. Why chemists need the mole</h3>
<p>Chemical reactions involve particles that are far too small to count individually.</p>
<h3>Worked Example 1: Identifying the particles</h3>
<p>Sample problem calculation for particles in 18 g of water.</p>
<h3>Common mistakes to avoid</h3>
<p>Remember that one mole does not mean one gram.</p>
`;

const parsedSections = parseNoteSections(sampleMoleNote, "chemistry|moles|Meaning of Mole");
assert(parsedSections.length === 4, `Expected 4 sections (1 h2 title + 3 h3 sections), got ${parsedSections.length}`);
assert(parsedSections[0].headingLevel === 2, "First section is h2 title section");
assert(parsedSections[0].sectionKey === "meaning_of_mole", "First section key matches title slug");
assert(parsedSections[1].sectionType === SECTION_TYPES.FOUNDATION, "Why chemists need mole is FOUNDATION");
assert(parsedSections[2].sectionType === SECTION_TYPES.WORKED_EXAMPLE, "Worked Example is WORKED_EXAMPLE");
assert(parsedSections[3].sectionType === SECTION_TYPES.MISCONCEPTION, "Mistakes to avoid is MISCONCEPTION");
assert(parsedSections[2].contentHash && parsedSections[2].contentHash.length === 8, "Must compute 8-char contentHash");
console.log("✅ PASS: Note Section Parser correctly extracts and classifies HTML sections.");

// ============================================================================
// THE TARGET MILESTONE: End-to-End Cross-Subject Diagnosis, Repair & Transfer
// ============================================================================
import { PILOT_QUESTIONS, getPilotQuestionById } from "../../engine/pilotQuestionRegistry.js";
import { selectCrossSubjectRepair } from "../../engine/crossSubjectRepairSelector.js";
import { verifyFoundationalRetest, verifyContextualTransfer, VERIFICATION_OUTCOME } from "../../engine/crossSubjectVerifier.js";

console.log("\n--- RUNNING TARGET MILESTONE: Chemistry Stoichiometry Fraction Error ---");

// Step 1: Chemistry Question C07: 2Al + 3Cl2 -> 2AlCl3. How many moles of AlCl3 from 6.0 moles of Cl2?
const qC07 = getPilotQuestionById("pilot_c07");
assert(qC07 !== null, "Question pilot_c07 must exist in registry");
assert(qC07.subjectId === "chemistry", "Originating subject must be Chemistry");

// Step 2: Student attempts question and makes a fraction arithmetic slip
// Correct setup is 6.0 * (2/3) = 4.0. Student writes "6 * 2/3 = 12" (multiplied 6*2 but failed to divide by 3)
const studentSubmission = {
  rawAnswer: "12",
  workingLines: ["Mole ratio AlCl3 : Cl2 = 2 : 3", "Moles AlCl3 = 6.0 * (2/3)", "Moles AlCl3 = 12"],
};

// Step 3: Diagnostic Engine inspects working evidence:
// Confirms student understood the chemistry ratio (2/3), but failed the fraction multiplication arithmetic!
const diagnosis = {
  status: "CONFIRMED",
  errorType: "FRACTION_ARITHMETIC_FAILURE",
  targetSkillId: "math.numbers.fractions.multiplication_division", // Math Foundational Skill!
  confidence: "HIGH",
};

// Step 4: Repair Selector generates cross-subject repair plan
const repairPlan = selectCrossSubjectRepair({
  question: qC07,
  diagnosis,
  submission: studentSubmission,
});

assert(repairPlan.status === "REPAIR_SELECTED", "Repair must be selected");
assert(repairPlan.isCrossSubject === true, "Must flag that repair is cross-subject");
assert(repairPlan.sourceSubjectId === "math", "Repair material must originate from Mathematics");
assert(repairPlan.diagnosedSkillId === "math.numbers.fractions.multiplication_division", "Target skill is fraction multiplication");
assert(repairPlan.noteSection.headingText.includes("Multiplying Fractions"), "Note section is fraction multiplication");
console.log("✅ PASS: Cross-subject repair plan retrieved Mathematics notes for Chemistry question.");

// Step 5: Student completes foundational retest on Math primitive: "Calculate: 6.0 × (2/3)"
const retestResult = verifyFoundationalRetest({
  repairPlan,
  studentAnswer: "4.0",
});

assert(retestResult.status === VERIFICATION_OUTCOME.ACQUISITION_CONFIRMED, "Acquisition confirmed");
assert(retestResult.acquisition === "DEMONSTRATED", "Primitive skill marked DEMONSTRATED");
assert(retestResult.nextStep === "RETURN_TO_DOMAIN_CONTEXT", "Prompt returns learner to domain context");
console.log("✅ PASS: Foundational retest verified isolated arithmetic primitive.");

// Step 6: Student returns to Chemistry and attempts contextual transfer question:
// "4Fe + 3O2 -> 2Fe2O3. How many moles of Fe2O3 are produced from 9.0 moles of O2 (ratio 2/3 = 6.0)?"
const transferSuccess = verifyContextualTransfer({
  repairPlan,
  studentAnswer: "6.0",
});

assert(transferSuccess.status === VERIFICATION_OUTCOME.TRANSFER_CONFIRMED, "Transfer confirmed");
assert(transferSuccess.contextualTransfer === "DEMONSTRATED", "Contextual transfer marked DEMONSTRATED");
console.log("✅ PASS: Contextual transfer demonstrated in Chemistry domain.");

// Step 7: Negative Transfer Test: Student gets the arithmetic right but fails the chemistry context
const transferFail = verifyContextualTransfer({
  repairPlan,
  studentAnswer: "13.5", // Inverted ratio (9.0 * 3/2 = 13.5)
});

assert(transferFail.status === VERIFICATION_OUTCOME.TRANSFER_FAILED, "Transfer failure detected");
assert(transferFail.acquisition === "DEMONSTRATED", "Foundational arithmetic is still DEMONSTRATED");
assert(transferFail.contextualTransfer === "FAILED_TRANSFER", "Contextual transfer marked FAILED_TRANSFER");
console.log("✅ PASS: Decoupled evidence preserved — acquisition intact while contextual transfer flagged.");

// Step 8: Ambiguous submission without working -> INCONCLUSIVE (does not guess)
const ambiguousRepair = selectCrossSubjectRepair({
  question: qC07,
  diagnosis: { status: "INCONCLUSIVE" },
  submission: { rawAnswer: "99" },
});
assert(ambiguousRepair.status === "INCONCLUSIVE", "Must refuse diagnosis when evidence is inconclusive");
assert(ambiguousRepair.requiresProbe === true, "Must require probe instead of guessing");
console.log("✅ PASS: Epistemic boundary preserved — ambiguous working returns INCONCLUSIVE.");

console.log("\n🎉 ALL CROSS-SUBJECT ARCHITECTURE & TARGET MILESTONE TESTS PASSED CLEANLY!");


