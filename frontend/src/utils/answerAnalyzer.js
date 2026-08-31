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

export function analyseStudentAnswer(studentAnswer, correctAnswer, question = {}) {
  const studentNorm = normalizeStr(studentAnswer);
  const correctNorm = normalizeStr(correctAnswer);
  const studentToks = tokenize(studentNorm);
  const correctToks = tokenize(correctNorm);
  const feedback    = [];
  const covered     = new Set();

  // ── Step-level (for math / procedural questions) ─────────────────────────
  if (Array.isArray(question.steps) && question.steps.length > 0) {
    question.steps.forEach((step, i) => {
      const stepClean = step.replace(/^step\s*\d+\s*[:-]/i, "").trim();
      const stepToks  = tokenize(normalizeStr(stepClean));
      const overlap   = stepToks.filter((t) => studentToks.includes(t));
      const ratio     = stepToks.length > 0 ? overlap.length / stepToks.length : 0;

      if (ratio >= 0.45) {
        feedback.push({
          type: "step_correct",
          icon: "✓",
          message: `Step ${i + 1} was correct — you mentioned ${overlap.slice(0, 3).join(", ")}, which matches the expected approach.`
        });
      } else if (ratio >= 0.15) {
        feedback.push({
          type: "step_partial",
          icon: "⚠",
          message: `Step ${i + 1} was partially right. You started on the right path but didn't fully complete it. Expected: "${stepClean}"`
        });
      } else {
        feedback.push({
          type: "step_wrong",
          icon: "✗",
          message: `Step ${i + 1} was missed or incorrect. The expected step was: "${stepClean}"`
        });
      }
    });

    return { type: "step_analysis", feedback, studentSaid: studentAnswer.trim(), correctAnswer };
  }

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
