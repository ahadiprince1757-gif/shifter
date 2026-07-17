/**
 * questionMutator.js
 * Restructures quiz questions dynamically on the client side.
 * Supports:
 * 1. Math/Calculation questions: parses numbers, randomizes them, and calculates new answers.
 * 2. Conceptual/Written questions: converts them to Multiple Choice (MCQ) using other questions' answers as distractors.
 */

// Helper to evaluate basic mathematical expressions safely
function safeEval(expr) {
  const normalized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[^0-9+\-*/().\s]/g, ""); // strip anything unsafe
  try {
    const val = Function(`"use strict"; return (${normalized})`)();
    return Number(val);
  } catch {
    return null;
  }
}

// Generate a random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mutate a number slightly while preserving its size (single vs double digit, etc.)
function mutateNumber(num) {
  const n = parseInt(num, 10);
  if (isNaN(n)) return num;

  if (n === 0) return randomInt(1, 5).toString();
  if (n >= 1 && n <= 9) {
    let next = randomInt(2, 9);
    while (next === n) {
      next = randomInt(2, 9);
    }
    return next.toString();
  }
  if (n >= 10 && n <= 99) {
    // If it's a multiple of 5, keep it a multiple of 5
    if (n % 5 === 0) {
      let next = randomInt(2, 19) * 5;
      while (next === n || next < 10) {
        next = randomInt(2, 19) * 5;
      }
      return next.toString();
    }
    let next = n + randomInt(-5, 5);
    while (next === n || next < 10 || next > 99) {
      next = n + randomInt(-5, 5);
    }
    return next.toString();
  }
  return (n + randomInt(-10, 10)).toString();
}

/**
 * Restructures a calculation question by mutating numbers and recalculating.
 */
function mutateMathQuestion(question) {
  const qText = question.q;
  const originalAns = question.ans;

  // Pattern 1: Solve: A + B × C or Find: A ÷ B + C
  const triplePattern = /(\d+)\s*([+\-*/÷×])\s*(\d+)\s*([+\-*/÷×])\s*(\d+)/;
  // Pattern 2: Solve: (A + B) × C
  const bracketPattern = /\((\d+)\s*([+\-*/÷×])\s*(\d+)\)\s*([+\-*/÷×])\s*(\d+)/;
  // Pattern 3: Simple fraction A/B
  const fractionPattern = /(\d+)\s*([/÷])\s*(\d+)/;

  let newQText = qText;
  let newExpr = "";

  if (bracketPattern.test(qText)) {
    const match = qText.match(bracketPattern);
    const a = mutateNumber(match[1]);
    const b = mutateNumber(match[3]);
    const c = mutateNumber(match[5]);
    newExpr = `(${a} ${match[2]} ${b}) ${match[4]} ${c}`;
    newQText = qText.replace(bracketPattern, `(${a} ${match[2]} ${b}) ${match[4]} ${c}`);
  } else if (triplePattern.test(qText)) {
    const match = qText.match(triplePattern);
    const a = mutateNumber(match[1]);
    const b = mutateNumber(match[3]);
    const c = mutateNumber(match[5]);
    newExpr = `${a} ${match[2]} ${b} ${match[4]} ${c}`;
    newQText = qText.replace(triplePattern, `${a} ${match[2]} ${b} ${match[4]} ${c}`);
  } else if (fractionPattern.test(qText)) {
    const match = qText.match(fractionPattern);
    const a = mutateNumber(match[1]);
    const b = mutateNumber(match[3]);
    newExpr = `${a} ${match[2]} ${b}`;
    newQText = qText.replace(fractionPattern, `${a}${match[2]}${b}`);
  }

  if (newExpr) {
    const evaluated = safeEval(newExpr);
    if (evaluated !== null) {
      // Determine format of original answer
      const newAns = originalAns.includes(".")
        ? evaluated.toFixed(2)
        : Math.round(evaluated).toString();

      return {
        ...question,
        q: newQText,
        ans: newAns.toString(),
        steps: [
          `Step 1: Read the new numbers in the equation: ${newQText.replace(/Solve:\s*|Find:\s*/, "")}`,
          `Step 2: Solve calculations applying BODMAS hierarchy correctly.`,
          `Step 3: The correct solution is ${newAns}.`
        ],
        why: `Calculated variation: applying correct operations yields ${newAns}.`,
        sol: `Applying correct operations yields ${newAns}.`
      };
    }
  }

  // Fallback if regex matching fails: just ask the original question in a concept check wrapper
  return {
    ...question,
    q: `Concept Check: ${qText}`,
    why: question.why || "Let's review the original explanation."
  };
}

/**
 * Restructures a conceptual question by converting it into a Multiple Choice Question (MCQ).
 */
function mutateConceptualQuestion(question, topicContent) {
  const originalAns = question.ans;

  // Retrieve correct answers from other questions in this topic to use as distractors
  let distractors = [];
  if (topicContent && Array.isArray(topicContent.qs)) {
    distractors = topicContent.qs
      .map(q => q.ans)
      .filter(ans => ans && ans.toLowerCase() !== originalAns.toLowerCase());
  }

  // Standard backup distractors if not enough other questions exist
  const backupDistractors = [
    "None of the above",
    "Both factors combined",
    "It remains constant",
    "It decreases linearly",
    "An opposing process"
  ];

  let chosenDistractors = [...new Set(distractors)];
  if (chosenDistractors.length < 3) {
    chosenDistractors = [
      ...chosenDistractors,
      ...backupDistractors.filter(d => !chosenDistractors.includes(d))
    ].slice(0, 3);
  } else {
    // Shuffle and pick 3
    chosenDistractors = chosenDistractors
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  // Assemble and shuffle choices
  const choices = [originalAns, ...chosenDistractors]
    .map(c => c.trim())
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);

  return {
    ...question,
    q: `Verification: ${question.q}`,
    type: "mcq", // Mark as Multiple Choice Question
    options: choices,
    ans: originalAns
  };
}

/**
 * Main entry point to restructure/mutate a question.
 * @param {Object} question - The original question object.
 * @param {Object} topicContent - The full topic content (for distractors).
 */
export function restructureQuestion(question, topicContent) {
  if (!question) return null;

  const isCalc = question.type === "calc" || /\d+/.test(question.q);
  if (isCalc) {
    return mutateMathQuestion(question);
  } else {
    return mutateConceptualQuestion(question, topicContent);
  }
}
