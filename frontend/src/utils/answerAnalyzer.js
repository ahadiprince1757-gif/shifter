/**
 * Smart Answer Analyser
 * Produces specific, sentence-level feedback for every incorrect answer.
 */

const CONCEPT_CLUSTERS = {
  instrument:  ["instrument", "device", "apparatus", "equipment", "tool", "machine", "gadget"],
  magnify:     ["magnify", "magnification", "enlarge", "amplify", "zoom", "bigger", "larger"],
  small:       ["small", "tiny", "minute", "micro", "microscopic", "little", "miniature"],
  observe:     ["observe", "see", "view", "look", "examine", "visualize", "watch", "inspect"],
  specimen:    ["specimen", "sample", "slide", "material", "tissue", "organism"],
  transfer:    ["transfer", "move", "conduct", "transmit", "carry", "pass"],
  current:     ["current", "electricity", "flow", "charge", "ampere"],
  bond:        ["bond", "link", "join", "connect", "attract"],
  ionic:       ["ionic", "ion", "cation", "anion", "charged", "electrostatic"],
  covalent:    ["covalent", "share", "sharing", "paired", "pair"],
  profit:      ["profit", "gain", "surplus", "income", "revenue", "earning"],
  loss:        ["loss", "deficit", "negative", "shortfall"],
  divide:      ["divide", "division", "quotient", "split", "ratio", "per"],
  multiply:    ["multiply", "product", "times", "factor"],
  subtract:    ["subtract", "minus", "deduct", "reduce"],
  add:         ["add", "sum", "total", "plus", "increase", "combine"],
  formula:     ["formula", "equation", "expression", "rule", "law"],
  calculate:   ["calculate", "compute", "solve", "find", "determine"],
};

const WORD_TO_CLUSTER = {};
for (const [clusterName, words] of Object.entries(CONCEPT_CLUSTERS)) {
  for (const w of words) WORD_TO_CLUSTER[w] = clusterName;
}

const STOP = new Set([
  "a","an","the","is","are","was","were","be","been","being","it","its",
  "to","of","in","on","at","by","for","with","about","as","into","that",
  "which","who","what","this","these","those","they","them","has","have",
  "had","do","does","did","will","would","could","should","may","might",
  "not","no","yes","also","very","just","more","can","used","using","use",
  "and","but","or","nor","so","yet","both","either","neither"
]);

function normalizeStr(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s) {
  return normalizeStr(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w));
}

function getCluster(word) { return WORD_TO_CLUSTER[normalizeStr(word)] || null; }

function wordsInSameCluster(w1, w2) {
  const c1 = getCluster(w1); const c2 = getCluster(w2);
  return c1 && c2 && c1 === c2;
}

function findClosestInStudent(targetWord, studentTokens) {
  const tNorm = normalizeStr(targetWord);
  for (const sw of studentTokens) {
    if (sw === tNorm || sw.startsWith(tNorm.slice(0, Math.max(4, tNorm.length - 2))) || tNorm.startsWith(sw.slice(0, Math.max(4, sw.length - 2)))) {
      return { studentWord: sw, relationship: "exact" };
    }
  }
  for (const sw of studentTokens) {
    if (wordsInSameCluster(sw, tNorm)) return { studentWord: sw, relationship: "same_cluster" };
  }
  return { studentWord: null, relationship: "none" };
}

function segmentPhrase(phrase) {
  return phrase.split(/[,;]|\band\b|\bor\b|\bbut\b/i).map((s) => s.trim()).filter((s) => s.length > 1);
}

const OPPOSITES = {
  ionic: "covalent", covalent: "ionic",
  add: "subtract", subtract: "add",
  multiply: "divide", divide: "multiply",
  profit: "loss", loss: "profit",
};

const QUALIFIERS = ["small","large","strong","weak","high","low","positive",
                    "negative","simple","complex","equal","unequal"];

export function analyseStudentAnswer(studentAnswer, correctAnswer, question = {}, userWork = "") {
  const studentNorm = normalizeStr(studentAnswer);
  const correctNorm = normalizeStr(correctAnswer);
  const studentToks = tokenize(studentNorm);
  const correctToks = tokenize(correctNorm);
  const feedback    = [];
  const covered     = new Set();

  // ── Step-level Math & Procedural Analysis ─────────────────────────────────
  if (Array.isArray(question.steps) && question.steps.length > 0) {
    return analyseMathSteps(question.steps, studentAnswer, userWork, correctAnswer);
  }

  // ── Concept-level analysis ────────────────────────────────────────────────

  // ── Concept-level analysis ────────────────────────────────────────────────
  const correctSegments = segmentPhrase(correctNorm);

  for (const segment of correctSegments) {
    const segToks = tokenize(segment);
    if (segToks.length === 0) continue;

    const matched   = [];
    const wrongTerm = [];
    const missing   = [];

    for (const cWord of segToks) {
      if (covered.has(cWord)) continue;
      covered.add(cWord);
      const { studentWord, relationship } = findClosestInStudent(cWord, studentToks);
      if (relationship === "exact")         matched.push(cWord);
      else if (relationship === "same_cluster") wrongTerm.push({ expected: cWord, studentUsed: studentWord });
      else                                  missing.push(cWord);
    }

    const segRatio = segToks.length > 0 ? matched.length / segToks.length : 0;

    if (segRatio >= 0.8) {
      feedback.push({
        type: "segment_correct",
        icon: "✓",
        message: `You correctly said "${segment}" — that part of your answer is right.`
      });
    } else {
      for (const wt of wrongTerm) {
        feedback.push({
          type: "wrong_term",
          icon: "✗",
          message: `You said "${wt.studentUsed}" but the correct term here is "${wt.expected}". You had the right idea but used the wrong word — the answer specifically requires "${wt.expected}".`
        });
      }
      for (const m of missing.slice(0, 3)) {
        feedback.push({
          type: "missing_concept",
          icon: "✗",
          message: `You didn't mention "${m}" — this is a required concept. The answer expects you to include "${m}" because ${_explainWhy(m, correctNorm)}.`
        });
      }
    }
  }

  // ── Contradiction check ───────────────────────────────────────────────────
  for (const sTok of studentToks) {
    const sCluster  = getCluster(sTok);
    if (!sCluster) continue;
    const opposite = OPPOSITES[sCluster];
    if (!opposite) continue;
    const correctRequiresOpposite = correctToks.some((ct) => getCluster(ct) === opposite);
    if (correctRequiresOpposite) {
      feedback.push({
        type: "contradiction",
        icon: "✗",
        message: `You said "${sTok}" but the correct answer involves ${opposite} — these are opposite concepts. This is the core place your answer broke.`
      });
    }
  }

  // ── Qualifier check ───────────────────────────────────────────────────────
  for (const q of QUALIFIERS) {
    if (correctNorm.includes(q) && !studentNorm.includes(q)) {
      const qIdx  = correctNorm.indexOf(q);
      const nearby = correctNorm.slice(qIdx, qIdx + 40).split(" ").slice(0, 4).join(" ");
      feedback.push({
        type: "missing_qualifier",
        icon: "✗",
        message: `You missed the qualifier "${q}". The correct answer says "${nearby}..." — without "${q}" your answer is technically inaccurate.`
      });
    }
  }

  // ── Overall ratio ─────────────────────────────────────────────────────────
  const totalMatched = studentToks.filter((t) =>
    correctToks.includes(t) || correctToks.some((ct) => wordsInSameCluster(t, ct))
  ).length;
  const overallRatio = correctToks.length > 0
    ? Math.round((totalMatched / correctToks.length) * 100) : 0;

  return {
    type: "concept_analysis",
    feedback,
    studentSaid: studentAnswer.trim(),
    correctAnswer,
    overallRatio,
    summary: overallRatio >= 70
      ? "Very close — you understood the core idea but missed specific terminology."
      : overallRatio >= 35
      ? "Partially correct — you had some right ideas but missed critical concepts."
      : "Your answer went in a different direction from what was expected.",
  };
}

function _explainWhy(word) {
  const cluster = getCluster(word);
  if (cluster === "instrument") return "a microscope is a type of scientific instrument — that classification is the foundation of the definition";
  if (cluster === "magnify") return "the core function of the device is magnification";
  if (cluster === "small") return "the qualifier 'small' distinguishes microscopic objects from what the naked eye can see";
  if (cluster === "ionic") return "the bonding type is ionic, involving full electron transfer";
  if (cluster === "covalent") return "the bonding type is covalent, involving shared electrons";
  if (cluster === "formula") return "identifying the correct formula is the first step before any calculation";
  return "it is part of the complete and accurate definition";
}

/**
 * Detailed Math Step Analyzer
 * Evaluates student's answer and working against question.steps.
 * Pinpoints the EXACT step where math broke and explains WHY.
 */
function analyseMathSteps(questionSteps, studentAnswer, userWork, correctAnswer) {
  const combinedWorking = [userWork, studentAnswer].filter(Boolean).join("\n");
  const fullNorm = normalizeStr(combinedWorking);
  const fullToks = tokenize(fullNorm);

  // Extract all numbers (including signed & decimals) from student input
  const studentNumbers = (combinedWorking.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);

  const feedback = [];
  let firstFailedStepIndex = -1;

  questionSteps.forEach((step, i) => {
    const stepNum = i + 1;
    const stepClean = step.replace(/^step\s*\d+\s*[:-]/i, "").trim();
    const stepNorm = normalizeStr(stepClean);
    const stepToks = tokenize(stepNorm);
    const stepNumbers = (stepClean.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);

    // Evaluate how well student's input matches this step
    const overlapToks = stepToks.filter((t) => fullToks.includes(t));
    const tokenMatchRatio = stepToks.length > 0 ? overlapToks.length / stepToks.length : 0;

    // Evaluate numerical matches for this step
    const numMatches = stepNumbers.filter((n) => studentNumbers.includes(n));
    const numMatchRatio = stepNumbers.length > 0 ? numMatches.length / stepNumbers.length : 1;

    // Check for Sign Error (e.g., student has -N when expected +N or vice-versa)
    const signErrors = [];
    stepNumbers.forEach((n) => {
      if (n !== 0 && !studentNumbers.includes(n) && studentNumbers.includes(-n)) {
        signErrors.push({ expected: n, studentGot: -n });
      }
    });

    const isStepPassed = (tokenMatchRatio >= 0.35 || numMatchRatio >= 0.5) && signErrors.length === 0;

    if (isStepPassed && firstFailedStepIndex === -1) {
      feedback.push({
        type: "step_correct",
        icon: "✓",
        message: `Step ${stepNum}: "${stepClean}" — Correct. You completed this step successfully.`
      });
    } else if (firstFailedStepIndex === -1) {
      // THIS IS THE EXACT STEP WHERE MATH BROKE!
      firstFailedStepIndex = i;

      let reasonDetail;
      if (signErrors.length > 0) {
        const se = signErrors[0];
        reasonDetail = `Sign Error: You wrote ${se.studentGot} instead of ${se.expected}. Pay close attention to positive/negative signs when rearranging terms.`;
      } else if (stepNumbers.length > 0 && numMatches.length === 0) {
        reasonDetail = `Calculation divergence: Expected values (${stepNumbers.join(", ")}) were not reached in your calculation. Check your arithmetic or formula substitution.`;
      } else if (stepNorm.includes("factor")) {
        reasonDetail = `Factoring error: The factors in your step do not expand back to the original quadratic expression.`;
      } else if (stepNorm.includes("divide")) {
        reasonDetail = `Division error: Division by coefficient was applied incorrectly or to only one side of the equation.`;
      } else {
        reasonDetail = `The method applied diverges from the required step: "${stepClean}".`;
      }

      feedback.push({
        type: "step_wrong",
        icon: "✗",
        message: `Step ${stepNum} is where your math broke: Expected "${stepClean}". ${reasonDetail}`
      });
    } else {
      // Subsequent step after a failure
      feedback.push({
        type: "step_partial",
        icon: "⚠",
        message: `Step ${stepNum}: "${stepClean}" — Could not be validated because your working broke at Step ${firstFailedStepIndex + 1}. Fix Step ${firstFailedStepIndex + 1} first.`
      });
    }
  });

  const displayStudentSaid = userWork ? `Working: "${userWork}" | Answer: "${studentAnswer}"` : studentAnswer.trim();

  return {
    type: "step_analysis",
    feedback,
    studentSaid: displayStudentSaid,
    correctAnswer,
    summary: firstFailedStepIndex !== -1
      ? `Math Step Breakdown — Your working broke at Step ${firstFailedStepIndex + 1}.`
      : "Math Step Breakdown — Steps attempted, but final calculation requires review.",
  };
}
