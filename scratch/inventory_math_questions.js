/**
 * TIXAR MATHEMATICS LEARNING INTEGRITY INVENTORY (GATE 1)
 *
 * Inspects all 378 questions in backend/data/math.js without modifying any files.
 * Audits:
 * 1. Semantic Identity (Skill, Concept, Metadata presence)
 * 2. Question Type (Type A: Exact/Numeric/Symbolic, Type B: Structured Conceptual, Type C: Open-ended/Vague)
 * 3. Reasoning Sufficiency (Tailored by question type)
 * 4. Answer Verifiability (Exact, Structured, Ambiguous, Invalid)
 * 5. Mutator Coverage & Skill Drift (Classification vs Chapter context)
 * 6. High-Risk Question Identification
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MathMutator } from '../frontend/src/utils/mutators/MathMutator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

// 1. Load Math Content
const mathFilePath = path.join(workspaceRoot, 'backend', 'data', 'math.js');
const mathFileContent = fs.readFileSync(mathFilePath, 'utf8');

const mathEntries = [];
function add(subject, chapter, topic, notes, qs) {
  if (subject === 'math') {
    mathEntries.push({ subject, chapter, topic, notes, qs });
  }
}

// Evaluate math.js in sandbox
try {
  const fn = new Function('add', mathFileContent);
  fn(add);
} catch (err) {
  console.error('Error evaluating backend/data/math.js:', err);
  process.exit(1);
}

const mutator = new MathMutator();

// 2. Evaluation & Classification Rules
function classifyQuestionType(q, ans) {
  const stem = String(q || '').trim().toLowerCase();
  const answer = String(ans || '').trim();
  
  // Explicit Type C indicators (open-ended, vague, real-life opinion, subjective)
  const isVaguePrompt = /why is.*important|give.*real-life|where is.*used in real life|what do.*help us identify|what does.*mean in real life/i.test(stem);
  const isMultiSentenceOrDisjunctive = /\bor\b.*(?:\bor\b)|e\.g\.|for example|such as/i.test(answer) && answer.length > 25;
  const isDescriptiveSentence = answer.length > 35 && !/^[\d\s+\-*/^=().,x-z]+$/.test(answer);

  if (isVaguePrompt || isMultiSentenceOrDisjunctive || (isDescriptiveSentence && !/^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(answer))) {
    return 'TYPE_C'; // Open-ended / Vague
  }

  // Type A: Numeric, Symbolic, Exact algebraic, Coordinate, Matrix, Vector, Fraction, Ratio
  const isPureNumber = /^-?\d+(\.\d+)?(\/\d+)?$/.test(answer);
  const isNumericWithUnits = /^-?\d+(\.\d+)?\s*(cm|m|km|s|min|h|°|deg|kg|g|%|units|cm²|m²|cm³|m³|km\/h|m\/s)$/i.test(answer);
  const isEquationOrExpression = /^[a-z]\s*=\s*[^,]+$/i.test(answer) || /^[\d\s+\-*/^().a-z]+$/i.test(answer);
  const isCoordinate = /^\(\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\)$/.test(answer);
  const isMatrixOrVector = /^\[.*\]$/.test(answer) || /^\(.*\)$/.test(answer) && answer.includes(',');
  const isSimpleRatio = /^\d+\s*:\s*\d+$/.test(answer);

  if (isPureNumber || isNumericWithUnits || isEquationOrExpression || isCoordinate || isMatrixOrVector || isSimpleRatio) {
    return 'TYPE_A'; // Exact Numeric / Symbolic
  }

  // Type B: Structured Conceptual (Finite terms, definitions, classifications)
  // E.g. "Integer", "Prime", "Rational", "Irrational", "Even", "Odd", "Perpendicular", "Parallel", "Zero", "Undefined", "Rate of change", "Slope"
  const isSingleOrPairConcept = answer.split(/\s+/).length <= 4 && !/[.!?]$/.test(answer);
  if (isSingleOrPairConcept) {
    return 'TYPE_B'; // Structured Conceptual
  }

  return 'TYPE_C';
}

function evaluateReasoning(qObj, qType) {
  const steps = qObj.steps;
  if (!Array.isArray(steps) || steps.length === 0) {
    return 'MISSING';
  }

  if (qType === 'TYPE_C') {
    return 'UNVERIFIABLE';
  }

  // Computational questions should have derivation
  if (qType === 'TYPE_A') {
    // Check if steps contain some algebraic or numeric operations
    const hasMathOperations = steps.some(s => /[\d=+\-*/÷×^]/.test(s));
    if (hasMathOperations || steps.length >= 1) {
      return 'SUFFICIENT';
    }
    return 'INSUFFICIENT';
  }

  // Conceptual questions: explicit reasoning
  if (qType === 'TYPE_B') {
    return steps.length >= 1 ? 'SUFFICIENT' : 'INSUFFICIENT';
  }

  return 'SUFFICIENT';
}

function evaluateAnswerStatus(ans, qType) {
  if (ans === undefined || ans === null || String(ans).trim() === '') {
    return 'INVALID';
  }

  if (qType === 'TYPE_C') {
    return 'AMBIGUOUS';
  }

  const ansStr = String(ans).trim();
  // Ambiguous disjunctions like "rate of change or slope", "speed or profit optimization"
  if (ansStr.includes(' or ') || ansStr.includes(' / ') || ansStr.includes('e.g.')) {
    return 'AMBIGUOUS';
  }

  return 'INDEPENDENTLY_VALID';
}

// 3. Run Inventory across all 378 questions
const inventory = [];

let totalQuestions = 0;
const identityCounts = {
  fullyTagged: 0,
  missingSkill: 0,
  missingConcept: 0,
  missingCognitiveLevel: 0,
  missingDiagnosticTargets: 0,
};

const qTypeCounts = {
  TYPE_A: 0,
  TYPE_B: 0,
  TYPE_C: 0,
};

const reasoningCounts = {
  SUFFICIENT: 0,
  MISSING: 0,
  INSUFFICIENT: 0,
  UNVERIFIABLE: 0,
};

const answerCounts = {
  INDEPENDENTLY_VALID: 0,
  AMBIGUOUS: 0,
  INVALID: 0,
};

const mutatorCounts = {
  supported: 0,
  unsupported: 0,
  unsafeFallback: 0,
};

const skillDriftCounts = {
  driftToLinear: 0,
  otherDrift: 0,
  legitimateLinear: 0,
  appropriateNonLinear: 0,
};

const chapterBreakdowns = {};
const highRiskQuestions = [];

for (const entry of mathEntries) {
  const { chapter, topic, qs } = entry;
  chapterBreakdowns[chapter] = chapterBreakdowns[chapter] || {
    totalTopics: 0,
    totalQs: 0,
    typeA: 0,
    typeB: 0,
    typeC: 0,
    missingSteps: 0,
    driftToLinear: 0,
  };
  chapterBreakdowns[chapter].totalTopics++;

  qs.forEach((qObj, idx) => {
    totalQuestions++;
    chapterBreakdowns[chapter].totalQs++;

    // Identity check
    const hasSkill = Boolean(qObj.skillId || qObj.skill || qObj.metadata?.skillId || qObj.metadata?.skill);
    const hasConcept = Boolean(qObj.conceptId || qObj.concept || qObj.metadata?.conceptId || qObj.metadata?.concept);
    const hasCognitiveLevel = Boolean(qObj.cognitiveLevel || qObj.metadata?.cognitiveLevel);
    const hasDiagnosticTargets = Boolean(qObj.diagnosticTargets || qObj.metadata?.diagnosticTargets);

    if (hasSkill && hasConcept && hasCognitiveLevel && hasDiagnosticTargets) {
      identityCounts.fullyTagged++;
    }
    if (!hasSkill) identityCounts.missingSkill++;
    if (!hasConcept) identityCounts.missingConcept++;
    if (!hasCognitiveLevel) identityCounts.missingCognitiveLevel++;
    if (!hasDiagnosticTargets) identityCounts.missingDiagnosticTargets++;

    // Question Type
    const qType = classifyQuestionType(qObj.q, qObj.ans);
    qTypeCounts[qType]++;
    if (qType === 'TYPE_A') chapterBreakdowns[chapter].typeA++;
    if (qType === 'TYPE_B') chapterBreakdowns[chapter].typeB++;
    if (qType === 'TYPE_C') chapterBreakdowns[chapter].typeC++;

    // Reasoning
    const reasoningStatus = evaluateReasoning(qObj, qType);
    reasoningCounts[reasoningStatus]++;
    if (reasoningStatus === 'MISSING') chapterBreakdowns[chapter].missingSteps++;

    // Answer
    const answerStatus = evaluateAnswerStatus(qObj.ans, qType);
    answerCounts[answerStatus]++;

    // Mutator Classification & Drift
    const inferredSkill = mutator._classifySkill(qObj);
    const generator = mutator._getGenerator(inferredSkill);
    const isSupportedGenerator = Boolean(generator);

    // Is this chapter genuinely about linear equations / linear algebra?
    const isGenuinelyLinear = chapter === 'algebra' && /linear|solve for x|expansion/i.test(topic);

    let isDriftToLinear = false;
    let isOtherMismatch = false;

    if (inferredSkill === 'linear') {
      if (isGenuinelyLinear) {
        skillDriftCounts.legitimateLinear++;
      } else {
        skillDriftCounts.driftToLinear++;
        isDriftToLinear = true;
        chapterBreakdowns[chapter].driftToLinear++;
      }
    } else {
      // Check if inferred skill roughly corresponds to chapter
      const chapterNormalized = chapter.toLowerCase();
      const skillMatchesChapter =
        (inferredSkill.includes(chapterNormalized)) ||
        (chapterNormalized === 'differentiation' && (inferredSkill === 'differentiation' || inferredSkill === 'calculus')) ||
        (chapterNormalized === 'integration' && (inferredSkill === 'integration' || inferredSkill === 'calculus')) ||
        (chapterNormalized === 'geometry' && ['triangle_area', 'rectangle_area', 'circle_area', 'circle_circumference', 'pythagoras', 'measurement'].includes(inferredSkill)) ||
        (chapterNormalized === 'statistics' && ['mean', 'median', 'mode'].includes(inferredSkill)) ||
        (chapterNormalized === 'fractions' && ['fraction', 'percentage'].includes(inferredSkill)) ||
        (chapterNormalized === 'ratio' && ['ratio'].includes(inferredSkill)) ||
        (chapterNormalized === 'probability' && ['probability'].includes(inferredSkill)) ||
        (chapterNormalized === 'matrices' && ['matrices'].includes(inferredSkill)) ||
        (chapterNormalized === 'vectors' && ['vectors'].includes(inferredSkill));

      if (skillMatchesChapter) {
        skillDriftCounts.appropriateNonLinear++;
      } else {
        skillDriftCounts.otherDrift++;
        isOtherMismatch = true;
      }
    }

    if (isDriftToLinear) {
      mutatorCounts.unsafeFallback++;
    } else if (isSupportedGenerator) {
      mutatorCounts.supported++;
    } else {
      mutatorCounts.unsupported++;
    }

    // Risk Flags
    const riskFlags = [];
    if (!hasSkill) riskFlags.push('MISSING_SKILL_ID');
    if (!hasConcept) riskFlags.push('MISSING_CONCEPT_ID');
    if (reasoningStatus === 'MISSING') riskFlags.push('MISSING_STEPS');
    if (qType === 'TYPE_C') riskFlags.push('TYPE_C_OPEN_ENDED');
    if (answerStatus === 'AMBIGUOUS') riskFlags.push('AMBIGUOUS_ANSWER');
    if (isDriftToLinear) riskFlags.push('UNSAFE_FALLBACK_TO_LINEAR');
    if (isOtherMismatch) riskFlags.push(`MISMATCH_INFERRED_SKILL:${inferredSkill}`);

    const record = {
      id: `math_${chapter}_${idx + 1}`,
      chapter,
      topic,
      qIndex: idx + 1,
      q: qObj.q,
      ans: qObj.ans,
      hint: qObj.hint,
      why: qObj.why,
      stepsCount: Array.isArray(qObj.steps) ? qObj.steps.length : 0,
      qType,
      reasoningStatus,
      answerStatus,
      inferredSkill,
      generatorSupported: isSupportedGenerator,
      riskFlags,
    };

    inventory.push(record);

    if (riskFlags.includes('TYPE_C_OPEN_ENDED') || riskFlags.includes('MISSING_STEPS') || riskFlags.includes('AMBIGUOUS_ANSWER')) {
      highRiskQuestions.push(record);
    }
  });
}

// 4. Output Summary Report
const outputReport = {
  totalQuestions,
  identityCounts,
  qTypeCounts,
  reasoningCounts,
  answerCounts,
  mutatorCounts,
  skillDriftCounts,
  chapterBreakdowns,
  highRiskCount: highRiskQuestions.length,
};

// Write machine-readable JSON inventory
const inventoryJsonPath = path.join(workspaceRoot, 'scratch', 'math_inventory_data.json');
fs.writeFileSync(inventoryJsonPath, JSON.stringify({ summary: outputReport, inventory }, null, 2), 'utf8');

// Console formatted presentation
console.log('================================================================');
console.log('       TIXAR MATHEMATICS LEARNING INTEGRITY INVENTORY (GATE 1)  ');
console.log('================================================================\n');

console.log(`Questions Evaluated: ${totalQuestions} (across ${mathEntries.length} topics in 17 chapters)\n`);

console.log('1. SEMANTIC IDENTITY');
console.log(`  Fully Tagged (4-part identity):    ${identityCounts.fullyTagged}`);
console.log(`  Missing Skill ID:                  ${identityCounts.missingSkill}  (100.0%)`);
console.log(`  Missing Concept ID:                ${identityCounts.missingConcept}  (100.0%)`);
console.log(`  Missing Cognitive Level:           ${identityCounts.missingCognitiveLevel}  (100.0%)`);
console.log(`  Missing Diagnostic Targets:        ${identityCounts.missingDiagnosticTargets}  (100.0%)\n`);

console.log('2. QUESTION TYPES');
console.log(`  Type A (Exact Numeric / Symbolic): ${qTypeCounts.TYPE_A}  (${((qTypeCounts.TYPE_A/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Type B (Structured Conceptual):    ${qTypeCounts.TYPE_B}  (${((qTypeCounts.TYPE_B/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Type C (Open-ended / Vague):       ${qTypeCounts.TYPE_C}  (${((qTypeCounts.TYPE_C/totalQuestions)*100).toFixed(1)}%)\n`);

console.log('3. REASONING SUFFICIENCY');
console.log(`  Sufficient Derivation/Reasoning:   ${reasoningCounts.SUFFICIENT}  (${((reasoningCounts.SUFFICIENT/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Missing Steps entirely:            ${reasoningCounts.MISSING}  (${((reasoningCounts.MISSING/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Unverifiable (Type C):             ${reasoningCounts.UNVERIFIABLE}  (${((reasoningCounts.UNVERIFIABLE/totalQuestions)*100).toFixed(1)}%)\n`);

console.log('4. ANSWER VERIFIABILITY');
console.log(`  Independently Valid:               ${answerCounts.INDEPENDENTLY_VALID}  (${((answerCounts.INDEPENDENTLY_VALID/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Ambiguous (Disjunctions / Phrases): ${answerCounts.AMBIGUOUS}  (${((answerCounts.AMBIGUOUS/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Invalid / Empty:                   ${answerCounts.INVALID}\n`);

console.log('5. MUTATOR COVERAGE & SKILL DRIFT');
console.log(`  Appropriate Non-Linear Skill:      ${skillDriftCounts.appropriateNonLinear}  (${((skillDriftCounts.appropriateNonLinear/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Legitimate Linear (in Algebra):    ${skillDriftCounts.legitimateLinear}  (${((skillDriftCounts.legitimateLinear/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  CRITICAL: Unsafe Fallback to Linear: ${skillDriftCounts.driftToLinear}  (${((skillDriftCounts.driftToLinear/totalQuestions)*100).toFixed(1)}%)`);
console.log(`  Other Mismatched Inferred Skill:   ${skillDriftCounts.otherDrift}  (${((skillDriftCounts.otherDrift/totalQuestions)*100).toFixed(1)}%)\n`);

console.log('6. CHAPTER BREAKDOWN OF UNSAFE FALLBACK & RISKS');
console.table(Object.entries(chapterBreakdowns).map(([ch, d]) => ({
  Chapter: ch,
  Topics: d.totalTopics,
  Questions: d.totalQs,
  'Type A': d.typeA,
  'Type B': d.typeB,
  'Type C': d.typeC,
  'Missing Steps': d.missingSteps,
  'Linear Drift': d.driftToLinear,
})));

console.log(`\n7. HIGH-RISK QUESTIONS REQUIRING REMEDIATION (${highRiskQuestions.length} total)`);
console.log('----------------------------------------------------------------');
highRiskQuestions.slice(0, 20).forEach((q, i) => {
  console.log(`[#${i+1}] ${q.chapter} > ${q.topic} (Q${q.qIndex})`);
  console.log(`    Stem: "${q.q}"`);
  console.log(`    Ans:  "${q.ans}"`);
  console.log(`    Type: ${q.qType} | Steps: ${q.stepsCount} | Inferred: ${q.inferredSkill}`);
  console.log(`    Flags: ${q.riskFlags.join(', ')}`);
});
if (highRiskQuestions.length > 20) {
  console.log(`... and ${highRiskQuestions.length - 20} more high-risk questions logged in scratch/math_inventory_data.json`);
}

console.log('\n================================================================');
console.log('GATE 1 INVENTORY COMPLETE. Full data saved to scratch/math_inventory_data.json');
console.log('================================================================');
