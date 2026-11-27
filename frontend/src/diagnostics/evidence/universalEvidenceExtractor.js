/**
 * Universal Evidence Extractor (Phase 2)
 *
 * Observes BOTH userWork (steps / prose) AND studentAnswer (final answer / response)
 * across any subject, emitting a canonical EvidenceBundle with strict provenance
 * (OBSERVED | DERIVED | INFERRED) and confidence scores (0.0 - 1.0).
 *
 * Analyzers observe. They do NOT own diagnosis or feedback prose.
 */

import {
  EVIDENCE_TYPES,
  EVIDENCE_STATUS,
  EVIDENCE_PROVENANCE,
  createEvidenceItem,
  createEvidenceBundle,
} from "../../domain/contracts/EvidenceBundleContract.js";
import { analyzeArithmeticSteps } from "../analyzers/arithmeticStepAnalyzer.js";
import { analyzeStudentSteps } from "../analyzers/stepAnalyzer.js";
import { isKeyboardMash } from "../engine/inputClassifier.js";
import { isUninterpretableInput } from "../engine/studentReasoningAnalyzer.js";
import { SUBJECT_MISCONCEPTIONS } from "../knowledge/subjectMisconceptions.js";

const STOP_WORDS = new Set([
  "the", "and", "that", "this", "with", "from", "into", "onto", "your", "their",
  "they", "them", "then", "than", "when", "where", "which", "what", "will",
  "have", "has", "had", "been", "being", "were", "was", "are", "for", "not",
  "but", "back", "find", "person", "walks", "starting", "point", "meaning",
  "covers", "because", "since", "about", "there", "here", "only", "also",
]);

/**
 * Damerau-Levenshtein distance for typo-tolerant concept matching (e.g. foprward -> forward).
 */
function damerauLevenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }
  return dp[m][n];
}

function tokenizeWords(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function fuzzyTokenMatch(targetWord, candidateTokens) {
  const t = targetWord.toLowerCase();
  if (candidateTokens.includes(t)) return true;
  if (t.length < 5) return false;
  const maxDist = t.length >= 7 ? 2 : 1;
  return candidateTokens.some((tok) => {
    if (Math.abs(tok.length - t.length) > maxDist) return false;
    return damerauLevenshtein(t, tok) <= maxDist;
  });
}

function parseNumericAndUnit(str) {
  const text = String(str || "").trim();
  const match = text.match(/(-?\d+(?:\.\d+)?)\s*([a-zA-Z/%°^2]+(?:\s*\/\s*[a-zA-Z]+)*)?/);
  if (!match) return null;
  const val = parseFloat(match[1]);
  if (!Number.isFinite(val)) return null;
  const unit = match[2] ? match[2].replace(/\s+/g, "").toLowerCase() : "";
  return { value: val, unit };
}

/**
 * Parse labeled multi-part expected answers like:
 * "Distance = 20 m; displacement = 0 m."
 */
export function parseMultiPartExpected(expectedAnswer) {
  const raw = String(expectedAnswer || "").trim();
  if (!raw) return [];
  const segments = raw
    .split(/[;\n]+/)
    .map((s) => s.replace(/\.+$/, "").trim())
    .filter(Boolean);

  if (segments.length <= 1) return [];

  const parts = [];
  for (const seg of segments) {
    const kv = seg.match(/^([a-zA-Z\s]{2,30}?)\s*(?:=|:|is)\s*(.+)$/i);
    if (kv) {
      const label = kv[1].trim();
      const valStr = kv[2].trim();
      const parsed = parseNumericAndUnit(valStr);
      parts.push({
        label,
        key: label.toLowerCase(),
        rawValue: valStr,
        numericValue: parsed?.value ?? null,
        unit: parsed?.unit || "",
      });
    }
  }
  return parts.length >= 2 ? parts : [];
}

/**
 * Extract evidence from multi-line or single-line math/algebra working.
 */
function extractMathWorkEvidence({ userWork, studentAnswer, questionText, expectedAnswer }) {
  const items = [];
  let stepAnalysis = null;

  if (userWork && userWork.trim()) {
    const arith = analyzeArithmeticSteps({ userWork, questionText, expectedAnswer });
    if (arith) {
      const evaluated = arith.evaluatedSteps || [];
      const validSteps = evaluated.filter((s) => s.status === "valid");
      for (const vs of validSteps) {
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.CALCULATION,
            source: "userWork",
            status: EVIDENCE_STATUS.VERIFIED,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidence: 0.96,
            text: vs.raw,
            meaning: `Step ${vs.stepNumber} is mathematically valid`,
            metadata: { stepNumber: vs.stepNumber },
          })
        );
      }

      if (arith.hasError && arith.firstError) {
        const err = arith.firstError;
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.CALCULATION,
            source: "userWork",
            status: EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidence: 0.97,
            text: err.raw,
            meaning: err.explanation || `Breakdown at step ${err.stepNumber}`,
            metadata: {
              stepNumber: err.stepNumber,
              errorType: err.errorType,
              expected: err.expected,
              repair: err.repair || arith.repair,
              verification: err.verification || arith.verification,
            },
          })
        );

        stepAnalysis = {
          whatYouDidRight: validSteps.map((s) => `Step ${s.stepNumber} was valid: \`${s.raw}\`.`),
          whereYourWorkingBrokeDown: {
            stepIndex: err.stepNumber,
            studentStep: err.raw,
            correctedStep: err.expected,
            explanation: err.explanation,
          },
          correctedWorking: (arith.theRightWay || []).map((step) => ({
            step,
            status: "corrected",
            note: "Target method",
          })),
        };
      }
      return { items, stepAnalysis };
    }

    if (userWork.includes("=")) {
      const alg = analyzeStudentSteps({ userWork, initialEquationStr: questionText, expectedAnswer });
      if (alg) {
        const evaluated = alg.evaluatedSteps || [];
        const validSteps = evaluated.filter((s) => s.status === "valid");
        for (const vs of validSteps) {
          items.push(
            createEvidenceItem({
              type: EVIDENCE_TYPES.EQUATION,
              source: "userWork",
              status: EVIDENCE_STATUS.VERIFIED,
              provenance: EVIDENCE_PROVENANCE.OBSERVED,
              confidence: 0.94,
              text: vs.raw,
              meaning: `Equation step ${vs.stepNumber} preserves equality`,
              metadata: { stepNumber: vs.stepNumber },
            })
          );
        }
        if (alg.hasError && alg.firstError) {
          const err = alg.firstError;
          items.push(
            createEvidenceItem({
              type: EVIDENCE_TYPES.EQUATION,
              source: "userWork",
              status: EVIDENCE_STATUS.DIVERGENT,
              provenance: EVIDENCE_PROVENANCE.OBSERVED,
              confidence: 0.95,
              text: err.raw,
              meaning: err.explanation || `Algebraic divergence at step ${err.stepNumber}`,
              metadata: {
                stepNumber: err.stepNumber,
                errorType: err.errorType,
                expected: err.expected,
              },
            })
          );
          stepAnalysis = {
            whatYouDidRight: validSteps.map((s) => `Step ${s.stepNumber} was valid: \`${s.raw}\`.`),
            whereYourWorkingBrokeDown: {
              stepIndex: err.stepNumber,
              studentStep: err.raw,
              correctedStep: err.expected,
              explanation: err.explanation,
            },
          };
        }
        return { items, stepAnalysis };
      }
    }
  }

  // Check if working reached the expected numeric answer even though final answer diverged
  if (userWork && studentAnswer) {
    const expParsed = parseNumericAndUnit(expectedAnswer);
    const ansParsed = parseNumericAndUnit(studentAnswer);
    const workLines = userWork.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const lastLine = workLines[workLines.length - 1] || "";
    const lastParsed = parseNumericAndUnit(lastLine.split("=").pop());
    if (
      expParsed &&
      lastParsed &&
      ansParsed &&
      Math.abs(lastParsed.value - expParsed.value) < 0.001 &&
      Math.abs(ansParsed.value - expParsed.value) >= 0.001
    ) {
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.CALCULATION,
          source: "reconciled",
          status: EVIDENCE_STATUS.VERIFIED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.95,
          text: lastLine,
          meaning: `Your working reached the correct value (${lastParsed.value})`,
        })
      );
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.QUANTITY,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.DIVERGENT,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.95,
          text: studentAnswer,
          meaning: `Final answer "${studentAnswer}" differs from the value reached in your working (${lastParsed.value})`,
          metadata: { errorType: "final_answer_error", expected: expectedAnswer },
        })
      );
    }
  }

  return { items, stepAnalysis };
}

/**
 * Evaluate multi-part targets across BOTH studentAnswer and userWork.
 */
function extractMultiPartEvidence({ combinedText, expectedAnswer }) {
  const parts = parseMultiPartExpected(expectedAnswer);
  if (parts.length === 0) return [];

  const items = [];
  const lower = combinedText.toLowerCase();
  const tokens = tokenizeWords(combinedText);

  for (const part of parts) {
    const mentionsLabel = fuzzyTokenMatch(part.key, tokens);
    const hasZeroWord = /\b(zero|none|null|back to (?:the )?(?:start|origin))\b/i.test(lower);

    // Check explicit labeled match: e.g. "distance = 20" or "displacement = 0" or "zero displacement"
    const labelRegex = new RegExp(`(?:${part.key})\\s*(?:=|is|:|was)?\\s*(-?\\d+(?:\\.\\d+)?)`, "i");
    const explicitMatch = lower.match(labelRegex);

    if (explicitMatch && part.numericValue !== null) {
      const obsVal = parseFloat(explicitMatch[1]);
      if (Math.abs(obsVal - part.numericValue) < 0.01) {
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.QUANTITY,
            source: "studentAnswer",
            status: EVIDENCE_STATUS.VERIFIED,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidence: 0.96,
            text: explicitMatch[0],
            meaning: `Correctly identified ${part.label} as ${part.rawValue}`,
            subPart: part.key,
          })
        );
      } else {
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.QUANTITY,
            source: "studentAnswer",
            status: EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidence: 0.94,
            text: explicitMatch[0],
            meaning: `Stated ${part.label} as ${obsVal} instead of ${part.rawValue}`,
            subPart: part.key,
            metadata: { expected: part.rawValue, observed: String(obsVal) },
          })
        );
      }
      continue;
    }

    // Qualitative match for zero displacement / return to origin
    if (part.numericValue === 0 && mentionsLabel && hasZeroWord) {
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.CLAIM,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.VERIFIED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.92,
          text: combinedText,
          meaning: `Correctly recognized that ${part.label} is zero upon returning to the starting point`,
          subPart: part.key,
        })
      );
      continue;
    }

    // Check if the numeric value appears unlabeled in the response
    if (part.numericValue !== null) {
      const numPresent = new RegExp(`\\b${part.numericValue}\\b`).test(lower);
      if (numPresent && mentionsLabel) {
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.QUANTITY,
            source: "studentAnswer",
            status: EVIDENCE_STATUS.VERIFIED,
            provenance: EVIDENCE_PROVENANCE.DERIVED,
            confidence: 0.82,
            text: `${part.label}: ${part.numericValue}`,
            meaning: `Included value ${part.numericValue} for ${part.label}`,
            subPart: part.key,
          })
        );
        continue;
      }
    }

    // Otherwise this required sub-part is missing
    items.push(
      createEvidenceItem({
        type: EVIDENCE_TYPES.OMISSION,
        source: "reconciled",
        status: EVIDENCE_STATUS.MISSING,
        provenance: EVIDENCE_PROVENANCE.DERIVED,
        confidence: 0.9,
        text: part.rawValue,
        meaning: mentionsLabel
          ? `Mentioned ${part.label}, but omitted the numerical result (${part.rawValue})`
          : `Did not provide ${part.label} (${part.rawValue})`,
        subPart: part.key,
        metadata: { expected: part.rawValue, mentionedConcept: mentionsLabel },
      })
    );
  }

  return items;
}

/**
 * Extract prose & conceptual evidence using evaluation.analysis + typo-tolerant matching
 * + subject misconception registry.
 */
function extractProseAndSubjectEvidence({
  studentAnswer,
  userWork,
  question,
  expectedAnswer,
  evaluation,
}) {
  const items = [];
  const combined = [userWork, studentAnswer].filter(Boolean).join(" ").trim();
  const qText = String(question?.q || question?.stem || "").trim();
  const subject = String(question?.subject || "").toLowerCase();
  const tokens = tokenizeWords(combined);

  // 1. Check cross-subject misconceptions registry (OBSERVED patterns)
  for (const rule of SUBJECT_MISCONCEPTIONS) {
    try {
      if (rule.subject && subject && !subject.includes(rule.subject) && !rule.subject.includes(subject)) {
        continue;
      }
      if (rule.matches({ studentInput: combined, questionText: qText, expectedAnswer })) {
        const diag = rule.diagnose({ studentInput: combined, questionText: qText, expectedAnswer });
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.CLAIM,
            source: userWork ? "userWork" : "studentAnswer",
            status: EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidence: 0.94,
            text: combined,
            meaning: diag.whatYouDid || diag.whyThisIsWrong?.[0] || rule.name,
            metadata: {
              misconceptionCode: rule.code,
              misconceptionName: rule.name,
              diag,
            },
          })
        );
      }
    } catch {
      // ignore individual rule match errors
    }
  }

  // 2. Consume answerAnalyzer.js findings from evaluation.analysis
  const analysis = evaluation?.analysis || null;
  if (analysis) {
    for (const c of analysis.concepts?.present || []) {
      const label = typeof c === "string" ? c : c.concept || c.text || "";
      if (!label) continue;
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.CLAIM,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.VERIFIED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.85,
          text: label,
          meaning: `Demonstrated key concept: "${label}"`,
        })
      );
    }

    for (const contra of analysis.contradictions || []) {
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.COMPARISON,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.DIVERGENT,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.9,
          text: contra.studentConcept || combined,
          meaning: `Used "${contra.studentConcept}" where "${contra.expectedConcept}" was expected`,
          metadata: {
            expected: contra.expectedConcept,
            observed: contra.studentConcept,
          },
        })
      );
    }

    for (const m of analysis.concepts?.missing || []) {
      const label = typeof m === "string" ? m : m.concept || "";
      if (!label) continue;
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.OMISSION,
          source: "reconciled",
          status: EVIDENCE_STATUS.MISSING,
          provenance: EVIDENCE_PROVENANCE.DERIVED,
          confidence: 0.82,
          text: label,
          meaning: `Missing required concept: "${label}"`,
        })
      );
    }
  }

  // 3. Typo-tolerant keyword check against question.why / expectedAnswer when no analysis concepts matched
  if (items.filter((i) => i.status === EVIDENCE_STATUS.VERIFIED).length === 0 && tokens.length >= 3) {
    const referenceText = `${expectedAnswer} ${question?.why || ""}`.trim();
    const refWords = Array.from(
      new Set(tokenizeWords(referenceText).filter((w) => w.length >= 5 && !STOP_WORDS.has(w)))
    );
    const matchedWords = refWords.filter((w) => fuzzyTokenMatch(w, tokens));
    if (matchedWords.length > 0) {
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.EXPLANATION,
          source: userWork ? "userWork" : "studentAnswer",
          status: EVIDENCE_STATUS.VERIFIED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.78,
          text: matchedWords.slice(0, 4).join(", "),
          meaning: `Referenced relevant idea(s): ${matchedWords.slice(0, 4).join(", ")}`,
        })
      );
    }
  }

  return items;
}

/**
 * Check unit omission / mismatch or bare numeric answer signatures.
 */
function extractQuantityAndUnitEvidence({ studentAnswer, userWork, expectedAnswer, questionText }) {
  const items = [];
  const exp = parseNumericAndUnit(expectedAnswer);
  const stu = parseNumericAndUnit(studentAnswer);
  if (!exp || !stu) return items;

  // Unit mismatch or omission when numeric value is exact
  if (Math.abs(stu.value - exp.value) < 0.001) {
    if (!stu.unit && exp.unit) {
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.QUANTITY,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.VERIFIED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.96,
          text: String(stu.value),
          meaning: `Correct numerical value (${stu.value})`,
        })
      );
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.UNIT,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.MISSING,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.95,
          text: exp.unit,
          meaning: `Missing unit "${exp.unit}"`,
          metadata: { errorType: "unit_omitted", expectedUnit: exp.unit },
        })
      );
    } else if (stu.unit && exp.unit && stu.unit !== exp.unit) {
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.QUANTITY,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.VERIFIED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.96,
          text: String(stu.value),
          meaning: `Correct numerical value (${stu.value})`,
        })
      );
      items.push(
        createEvidenceItem({
          type: EVIDENCE_TYPES.UNIT,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.DIVERGENT,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.95,
          text: stu.unit,
          meaning: `Used unit "${stu.unit}" instead of "${exp.unit}"`,
          metadata: { errorType: "unit_mismatch", expectedUnit: exp.unit, observedUnit: stu.unit },
        })
      );
    }
    return items;
  }

  // Bare wrong numeric answer (INFERRED only if no working was provided!)
  if (!userWork || !userWork.trim()) {
    const qLower = String(questionText || "").toLowerCase();
    // Check for rate operation inversion signature (e.g. d * t instead of d / t)
    if (qLower.includes("speed") || qLower.includes("velocity")) {
      const distMatches = [...qLower.matchAll(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?|kilometres?|m\b|meters?|metres?)/gi)];
      const timeMatches = [...qLower.matchAll(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h\b|seconds?|secs?|s\b|minutes?|mins?)/gi)];
      const totalD = distMatches.reduce((acc, m) => acc + parseFloat(m[1]), 0);
      const totalT = timeMatches.reduce((acc, m) => acc + parseFloat(m[1]), 0);
      if (totalD > 0 && totalT > 0 && Math.abs(stu.value - totalD * totalT) < 0.05) {
        items.push(
          createEvidenceItem({
            type: EVIDENCE_TYPES.QUANTITY,
            source: "studentAnswer",
            status: EVIDENCE_STATUS.AMBIGUOUS,
            provenance: EVIDENCE_PROVENANCE.INFERRED,
            confidence: 0.6,
            text: studentAnswer,
            meaning: `Final value ${stu.value} matches ${totalD} × ${totalT}, though no working was shown`,
            metadata: { candidateSignature: "rate_inversion", inputs: [totalD, totalT] },
          })
        );
      }
    }
  }

  return items;
}

/**
 * Main entry point: builds a unified EvidenceBundle from CanonicalSubmission + EvaluationResult.
 */
export function buildEvidenceBundle(submission = {}, questionOrEval = null, maybeEval = null) {
  const studentAnswer = String(submission.studentAnswer ?? submission.answer ?? "").trim();
  const userWork = String(submission.userWork ?? submission.work ?? "").trim();
  
  let question = submission.question || {};
  let evaluation = null;

  if (maybeEval !== null) {
    question = questionOrEval || question;
    evaluation = maybeEval;
  } else if (questionOrEval) {
    if (questionOrEval.q || questionOrEval.stem || questionOrEval.steps || questionOrEval.ans) {
      question = questionOrEval;
    } else if (questionOrEval.isCorrect !== undefined || questionOrEval.grade || questionOrEval.correctAnswer) {
      evaluation = questionOrEval;
    }
  }

  const questionText = String(question.q || question.stem || question.text || "").trim();
  const expectedAnswer = String(
    evaluation?.correctAnswer || question.ans || question.answer || question.correctAnswer || ""
  ).trim();

  // 1. Blank or uninterpretable / keyboard mash check
  if (!studentAnswer && !userWork) {
    return createEvidenceBundle({
      studentAnswer,
      working: userWork,
      items: [],
      reconciliation: "BLANK",
    });
  }

  if ((isKeyboardMash(studentAnswer) || isUninterpretableInput(studentAnswer)) && !userWork) {
    return createEvidenceBundle({
      studentAnswer,
      working: userWork,
      items: [
        createEvidenceItem({
          type: EVIDENCE_TYPES.CLAIM,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.AMBIGUOUS,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidence: 0.95,
          text: studentAnswer,
          meaning: "Submitted text does not contain recognizable words or mathematical expressions",
          metadata: { malformed: true },
        }),
      ],
      reconciliation: "MALFORMED",
    });
  }

  const allItems = [];
  let stepAnalysis = null;

  // 2. Quantitative working & reconciliation
  const mathRes = extractMathWorkEvidence({ userWork, studentAnswer, questionText, expectedAnswer });
  allItems.push(...mathRes.items);
  stepAnalysis = mathRes.stepAnalysis;

  // 3. Multi-part targets (e.g. Distance = 20 m; displacement = 0 m)
  const combined = [userWork, studentAnswer].filter(Boolean).join(" ").trim();
  const multiPartItems = extractMultiPartEvidence({ combinedText: combined, expectedAnswer });
  allItems.push(...multiPartItems);

  // 4. Unit / numeric quantity checks
  if (multiPartItems.length === 0) {
    allItems.push(
      ...extractQuantityAndUnitEvidence({ studentAnswer, userWork, expectedAnswer, questionText })
    );
  }

  // 5. Prose / conceptual / subject knowledge checks
  allItems.push(
    ...extractProseAndSubjectEvidence({
      studentAnswer,
      userWork,
      question,
      expectedAnswer,
      evaluation,
    })
  );

  // Determine reconciliation state
  const hasVerified = allItems.some((i) => i.status === EVIDENCE_STATUS.VERIFIED);
  const hasDivergent = allItems.some((i) => i.status === EVIDENCE_STATUS.DIVERGENT);
  const hasMissing = allItems.some((i) => i.status === EVIDENCE_STATUS.MISSING);
  const hasReconciledFinalDiv = allItems.some((i) => i.source === "reconciled" && i.status === EVIDENCE_STATUS.VERIFIED);

  let reconciliation = "UNCLASSIFIED";
  if (hasReconciledFinalDiv) reconciliation = "FINAL_DIVERGENCE";
  else if (stepAnalysis?.whereYourWorkingBrokeDown) reconciliation = "STEP_BREAKDOWN";
  else if (hasVerified && hasMissing && !hasDivergent) reconciliation = "PARTIAL_REASONING_MISSING_CALC";
  else if (hasDivergent) reconciliation = "DIVERGENT_EVIDENCE";
  else if (hasVerified) reconciliation = "PARTIAL_VERIFIED";

  return createEvidenceBundle({
    studentAnswer,
    working: userWork,
    items: allItems,
    reconciliation,
    stepAnalysis,
  });
}
