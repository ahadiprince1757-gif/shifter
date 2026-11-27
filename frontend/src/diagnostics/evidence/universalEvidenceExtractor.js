/**
 * Universal Evidence Extractor (v2 — Source-Separated Evidence Pipeline)
 *
 * Architecture:
 * 1. Normalizes question into a canonical QuestionContract.
 * 2. Observes `userWork` and `studentAnswer` in strictly separate streams (never flattened before interpretation).
 * 3. Separates raw OBSERVED facts from DERIVED deterministic checks and INFERRED heuristics.
 * 4. Reconciles both streams into an immutable EvidenceBundle with relational links
 *    (SUPPORTS, CONTRADICTS, DERIVES_FROM), reasoningTrace, and explicit reconciliation state.
 *
 * Analyzers observe. They do NOT own diagnosis or feedback prose.
 */

import {
  EVIDENCE_TYPES,
  EVIDENCE_STATUS,
  EVIDENCE_PROVENANCE,
  EVIDENCE_RELATION_TYPES,
  RECONCILIATION_STATES,
  createEvidenceItem,
  createEvidenceBundle,
  createQuestionContract,
} from "../../domain/contracts/EvidenceBundleContract.js";
import { analyzeArithmeticSteps } from "../analyzers/arithmeticStepAnalyzer.js";
import { analyzeStudentSteps } from "../analyzers/stepAnalyzer.js";
import { isKeyboardMash } from "../engine/inputClassifier.js";
import { isUninterpretableInput } from "../engine/studentReasoningAnalyzer.js";
import { SUBJECT_MISCONCEPTIONS } from "../knowledge/subjectMisconceptions.js";
import {
  normalizeQuantity,
  compareQuantities,
} from "./quantityUnitNormalizer.js";
import {
  extractClauseClaims,
  evaluateConceptPolarity,
  parseExpectedMultiPartTargets,
  extractMultiPartClaimsFromSource,
} from "./claimNegationParser.js";

const STOP_WORDS = new Set([
  "the", "and", "that", "this", "with", "from", "into", "onto", "your", "their",
  "they", "them", "then", "than", "when", "where", "which", "what", "will",
  "have", "has", "had", "been", "being", "were", "was", "are", "for", "not",
  "but", "back", "find", "person", "walks", "starting", "point", "meaning",
  "covers", "because", "since", "about", "there", "here", "only", "also",
]);

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
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
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

/**
 * Observe a single source stream ("userWork" or "studentAnswer") independently.
 * Never mixes sources!
 */
function observeSingleSource({
  sourceName,
  text,
  question,
  questionContract,
  expectedParts,
  evaluation,
  idCounter,
}) {
  const items = [];
  const relationships = [];
  let stepAnalysis = null;
  let reasoningTrace = null;
  const nextId = () => `ev_${++idCounter.val}`;

  const trimmed = String(text || "").trim();
  if (!trimmed) {
    return { items, relationships, stepAnalysis, reasoningTrace };
  }

  const questionText = String(question.q || question.stem || question.text || "").trim();
  const expectedAnswer = questionContract.expectedAnswer;

  // ── A. Quantitative Step / Equation Observation (userWork only) ────────────
  if (sourceName === "userWork" && /\r?\n/.test(trimmed)) {
    const arith = analyzeArithmeticSteps({
      userWork: trimmed,
      questionText,
      expectedAnswer,
    });

    if (arith && Array.isArray(arith.evaluatedSteps) && arith.evaluatedSteps.length > 0) {
      const traceSteps = [];
      for (const step of arith.evaluatedSteps) {
        const obsId = nextId();
        items.push(
          createEvidenceItem({
            id: obsId,
            type: EVIDENCE_TYPES.CALCULATION,
            source: "userWork",
            location: { source: "userWork", line: step.stepNumber },
            status: step.status === "valid" ? EVIDENCE_STATUS.VERIFIED : EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 1 },
            text: step.raw,
            meaning: step.raw,
            metadata: { stepNumber: step.stepNumber },
          })
        );

        const derId = nextId();
        const isStepValid = step.status === "valid";
        items.push(
          createEvidenceItem({
            id: derId,
            type: EVIDENCE_TYPES.CALCULATION,
            source: "userWork",
            location: { source: "userWork", line: step.stepNumber },
            status: isStepValid ? EVIDENCE_STATUS.VERIFIED : EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.DERIVED,
            confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 1 },
            text: step.raw,
            meaning: isStepValid
              ? `Step ${step.stepNumber} is mathematically valid`
              : step.explanation || `Breakdown at step ${step.stepNumber}`,
            derivation: { from: [obsId], rule: "ARITHMETIC_STEP_VERIFICATION" },
            metadata: {
              stepNumber: step.stepNumber,
              errorType: step.errorType,
              expected: step.expected,
            },
          })
        );

        relationships.push({
          type: EVIDENCE_RELATION_TYPES.DERIVES_FROM,
          from: derId,
          to: obsId,
          reason: "Deterministic step verification",
        });

        traceSteps.push({
          index: step.stepNumber,
          text: step.raw,
          status: isStepValid ? "SUPPORTED" : "DIVERGENT",
          evidenceId: obsId,
        });
      }

      const validSteps = arith.evaluatedSteps.filter((s) => s.status === "valid");
      if (arith.hasError && arith.firstError) {
        const err = arith.firstError;
        stepAnalysis = {
          whatYouDidRight: validSteps.map((s) => `Step ${s.stepNumber} was valid: \`${s.raw}\`.`),
          whereYourWorkingBrokeDown: {
            stepIndex: err.stepNumber,
            brokenAt: err.errorType || `step_${err.stepNumber}`,
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
        reasoningTrace = { steps: traceSteps, firstDivergence: err.stepNumber };
      } else {
        reasoningTrace = { steps: traceSteps, firstDivergence: null };
      }
    } else if (trimmed.includes("=")) {
      const alg = analyzeStudentSteps({ userWork: trimmed, initialEquationStr: questionText, expectedAnswer });
      if (alg && Array.isArray(alg.evaluatedSteps)) {
        const traceSteps = [];
        for (const step of alg.evaluatedSteps) {
          const isStepValid = step.status === "valid";
          const obsId = nextId();
          items.push(
            createEvidenceItem({
              id: obsId,
              type: EVIDENCE_TYPES.EQUATION,
              source: "userWork",
              location: { source: "userWork", line: step.stepNumber },
              status: isStepValid ? EVIDENCE_STATUS.VERIFIED : EVIDENCE_STATUS.DIVERGENT,
              provenance: EVIDENCE_PROVENANCE.OBSERVED,
              confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 1 },
              text: step.raw,
              meaning: step.raw,
              metadata: { stepNumber: step.stepNumber },
            })
          );

          const derId = nextId();
          items.push(
            createEvidenceItem({
              id: derId,
              type: EVIDENCE_TYPES.EQUATION,
              source: "userWork",
              location: { source: "userWork", line: step.stepNumber },
              status: isStepValid ? EVIDENCE_STATUS.VERIFIED : EVIDENCE_STATUS.DIVERGENT,
              provenance: EVIDENCE_PROVENANCE.DERIVED,
              confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 1 },
              text: step.raw,
              meaning: isStepValid
                ? `Equation step ${step.stepNumber} preserves equality`
                : step.explanation || `Algebraic divergence at step ${step.stepNumber}`,
              derivation: { from: [obsId], rule: "ALGEBRAIC_EQUALITY_CHECK" },
              metadata: { stepNumber: step.stepNumber, errorType: step.errorType, expected: step.expected },
            })
          );

          relationships.push({
            type: EVIDENCE_RELATION_TYPES.DERIVES_FROM,
            from: derId,
            to: obsId,
            reason: "Deterministic algebraic check",
          });

          traceSteps.push({
            index: step.stepNumber,
            text: step.raw,
            status: isStepValid ? "SUPPORTED" : "DIVERGENT",
            evidenceId: obsId,
          });
        }

        const validSteps = alg.evaluatedSteps.filter((s) => s.status === "valid");
        if (alg.hasError && alg.firstError) {
          const err = alg.firstError;
          stepAnalysis = {
            whatYouDidRight: validSteps.map((s) => `Step ${s.stepNumber} was valid: \`${s.raw}\`.`),
            whereYourWorkingBrokeDown: {
              stepIndex: err.stepNumber,
              brokenAt: err.errorType || `step_${err.stepNumber}`,
              studentStep: err.raw,
              correctedStep: err.expected,
              explanation: err.explanation,
            },
          };
          reasoningTrace = { steps: traceSteps, firstDivergence: err.stepNumber };
        } else {
          reasoningTrace = { steps: traceSteps, firstDivergence: null };
        }
      }
    }
  }

  // ── B. Multi-Part Target Observation (handles natural wording & typos) ─────
  if (expectedParts.length > 0) {
    const claims = extractMultiPartClaimsFromSource(trimmed, expectedParts);
    for (const c of claims) {
      const obsId = nextId();
      items.push(
        createEvidenceItem({
          id: obsId,
          type: c.qualitativeZero ? EVIDENCE_TYPES.CLAIM : EVIDENCE_TYPES.QUANTITY,
          source: sourceName,
          location: { source: sourceName },
          status: EVIDENCE_STATUS.SUPPORTED,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidenceFactors: { exactMatch: c.qualitativeZero ? 0 : 1, explicitLabel: 1, sourceQuality: 0.9 },
          text: c.matchedText,
          meaning: c.matchedText,
          subPart: c.part.partKey,
        })
      );

      const cmp = compareQuantities(c.normalizedObserved, c.part.normalizedExpected);
      const derId = nextId();
      const isMatch = cmp.equal || c.qualitativeZero;
      items.push(
        createEvidenceItem({
          id: derId,
          type: c.qualitativeZero ? EVIDENCE_TYPES.CLAIM : EVIDENCE_TYPES.QUANTITY,
          source: sourceName,
          location: { source: sourceName },
          status: isMatch ? EVIDENCE_STATUS.VERIFIED : EVIDENCE_STATUS.DIVERGENT,
          provenance: EVIDENCE_PROVENANCE.DERIVED,
          confidenceFactors: { exactMatch: isMatch ? 1 : 0, explicitLabel: 1, sourceQuality: 0.95 },
          text: c.matchedText,
          meaning: isMatch
            ? c.qualitativeZero
              ? `Correctly identified that returning to the starting point means ${c.part.label} is 0`
              : `Correctly identified ${c.part.label} as ${c.part.rawExpected}`
            : `Stated ${c.part.label} as ${c.extractedValStr}, but expected ${c.part.rawExpected}`,
          subPart: c.part.partKey,
          derivation: { from: [obsId], rule: "MULTI_PART_QUANTITY_COMPARISON" },
          metadata: { partKey: c.part.partKey, expected: c.part.rawExpected, observed: c.extractedValStr },
        })
      );
      relationships.push({
        type: EVIDENCE_RELATION_TYPES.DERIVES_FROM,
        from: derId,
        to: obsId,
        reason: `Evaluated ${c.part.label} against target`,
      });
    }
  } else if (expectedAnswer) {
    // ── C. Single Quantity / Unit Normalization Check ────────────────────────
    const expQty = normalizeQuantity(expectedAnswer);
    const obsQty = normalizeQuantity(trimmed);

    if (expQty && obsQty) {
      const cmp = compareQuantities(obsQty, expQty);
      if (cmp.comparable) {
        const obsId = nextId();
        items.push(
          createEvidenceItem({
            id: obsId,
            type: sourceName === "studentAnswer" ? EVIDENCE_TYPES.FINAL_ANSWER : EVIDENCE_TYPES.QUANTITY,
            source: sourceName,
            location: { source: sourceName },
            status: cmp.equal ? EVIDENCE_STATUS.VERIFIED : EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.OBSERVED,
            confidenceFactors: { exactMatch: cmp.equal ? 1 : 0, explicitLabel: 0, sourceQuality: 0.9 },
            text: trimmed,
            meaning: trimmed,
          })
        );

        const isUnitMismatch =
          (cmp.dimensionMatch && !cmp.unitMatch && Math.abs(obsQty.value - expQty.value) > 1e-4) ||
          (!cmp.equal &&
            obsQty.rawUnit &&
            expQty.rawUnit &&
            obsQty.rawUnit !== expQty.rawUnit &&
            Math.abs(obsQty.rawValue - expQty.rawValue) <= 1e-4);

        if (isUnitMismatch) {
          // Different unit in same dimension or wrong unit attached to right raw number
          const derId = nextId();
          items.push(
            createEvidenceItem({
              id: derId,
              type: EVIDENCE_TYPES.UNIT,
              source: sourceName,
              location: { source: sourceName },
              status: EVIDENCE_STATUS.DIVERGENT,
              provenance: EVIDENCE_PROVENANCE.DERIVED,
              confidenceFactors: { exactMatch: 0, explicitLabel: 1, sourceQuality: 0.95 },
              text: trimmed,
              meaning: `Unit mismatch: "${obsQty.rawUnit}" vs expected "${expQty.rawUnit}"`,
              derivation: { from: [obsId], rule: "UNIT_NORMALIZATION_CHECK" },
              metadata: { errorType: "unit_mismatch", expectedUnit: expQty.rawUnit, observedUnit: obsQty.rawUnit },
            })
          );
          relationships.push({
            type: EVIDENCE_RELATION_TYPES.DERIVES_FROM,
            from: derId,
            to: obsId,
            reason: "Unit comparison via UnitNormalizer",
          });
        } else if (cmp.missingUnit) {
          const derId = nextId();
          items.push(
            createEvidenceItem({
              id: derId,
              type: EVIDENCE_TYPES.UNIT,
              source: sourceName,
              location: { source: sourceName },
              status: EVIDENCE_STATUS.DIVERGENT,
              provenance: EVIDENCE_PROVENANCE.DERIVED,
              confidenceFactors: { exactMatch: 1, explicitLabel: 0, sourceQuality: 0.9 },
              text: trimmed,
              meaning: `Numeric value matches (${obsQty.value}), but missing required unit (${expQty.rawUnit})`,
              derivation: { from: [obsId], rule: "MISSING_UNIT_CHECK" },
              metadata: { errorType: "missing_unit", expectedUnit: expQty.rawUnit },
            })
          );
        }
      }
    }
  }

  // ── D. Negation-Aware Concept & Misconception Observation ──────────────────
  const tokens = tokenizeWords(trimmed);

  // Check evaluation matchedConcepts / missingConcepts with negation guard
  if (Array.isArray(evaluation?.matchedConcepts) && evaluation.matchedConcepts.length > 0) {
    for (const concept of evaluation.matchedConcepts) {
      const label = typeof concept === "string" ? concept : concept?.label || concept?.name || "";
      if (!label) continue;
      const polarityRes = evaluateConceptPolarity(trimmed, [label], "AFFIRMED");
      if (polarityRes.matched && !polarityRes.polarityMatches) {
        const obsId = nextId();
        items.push(
          createEvidenceItem({
            id: obsId,
            type: EVIDENCE_TYPES.CONTRADICTION,
            source: sourceName,
            location: { source: sourceName },
            status: EVIDENCE_STATUS.DIVERGENT,
            provenance: EVIDENCE_PROVENANCE.DERIVED,
            confidenceFactors: { exactMatch: 1, explicitLabel: 1, contradiction: 1 },
            text: polarityRes.clause,
            meaning: `Negated expected concept "${label}" using "${polarityRes.negationCue}"`,
            claim: { subject: label, relation: "present", polarity: "NEGATED" },
          })
        );
      } else {
        const obsId = nextId();
        items.push(
          createEvidenceItem({
            id: obsId,
            type: EVIDENCE_TYPES.CONCEPT,
            source: sourceName,
            location: { source: sourceName },
            status: EVIDENCE_STATUS.SUPPORTED,
            provenance: EVIDENCE_PROVENANCE.DERIVED,
            confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 0.9 },
            text: polarityRes.clause || label,
            meaning: `Demonstrated key concept: "${label}"`,
            claim: { subject: label, relation: "affirmed", polarity: "AFFIRMED" },
          })
        );
      }
    }
  }

  // Subject misconceptions check on this single source ONLY
  const subjectKey = String(questionContract.subject || "").toLowerCase();
  const misconceptionList =
    SUBJECT_MISCONCEPTIONS[subjectKey] ||
    Object.values(SUBJECT_MISCONCEPTIONS).flat();

  for (const rule of misconceptionList) {
    if (typeof rule.detect === "function") {
      try {
        const hit = rule.detect(trimmed, questionText, expectedAnswer);
        if (hit) {
          const obsId = nextId();
          items.push(
            createEvidenceItem({
              id: obsId,
              type: EVIDENCE_TYPES.CLAIM,
              source: sourceName,
              location: { source: sourceName },
              status: EVIDENCE_STATUS.DIVERGENT,
              provenance: EVIDENCE_PROVENANCE.INFERRED,
              confidenceFactors: { exactMatch: 0, explicitLabel: 1, sourceQuality: 0.85 },
              text: trimmed,
              meaning: hit.explanation || rule.description || rule.name,
              derivation: { from: [obsId], rule: `MISCONCEPTION_${rule.id || "RULE"}` },
              metadata: { misconceptionId: rule.id, repair: hit.repair },
            })
          );
        }
      } catch {
        // Ignore single rule errors
      }
    }
  }

  // Weak lexical overlap fallback (NEVER marked VERIFIED — strictly WEAK_SUPPORT + INFERRED)
  const hasStrongSupport = items.some(
    (i) => i.status === EVIDENCE_STATUS.VERIFIED || i.status === EVIDENCE_STATUS.SUPPORTED
  );
  if (!hasStrongSupport && expectedAnswer) {
    const refText = [expectedAnswer, question.why || ""].join(" ");
    const refWords = Array.from(
      new Set(tokenizeWords(refText).filter((w) => w.length >= 4 && !STOP_WORDS.has(w)))
    );
    const matchedWords = refWords.filter((w) => fuzzyTokenMatch(w, tokens));
    if (matchedWords.length > 0 && !isKeyboardMash(trimmed)) {
      // Guard against negated statements (e.g. "Photosynthesis does not require light")
      const clauses = extractClauseClaims(trimmed);
      const anyNegated = clauses.some((c) => c.polarity === "NEGATED");
      items.push(
        createEvidenceItem({
          id: nextId(),
          type: EVIDENCE_TYPES.CLAIM,
          source: sourceName,
          location: { source: sourceName },
          status: anyNegated ? EVIDENCE_STATUS.AMBIGUOUS : EVIDENCE_STATUS.WEAK_SUPPORT,
          provenance: EVIDENCE_PROVENANCE.INFERRED,
          confidenceFactors: { exactMatch: 0, explicitLabel: 0, ambiguity: anyNegated ? 0.6 : 0.3 },
          text: trimmed,
          meaning: `Referenced relevant term(s): ${matchedWords.slice(0, 4).join(", ")}`,
          metadata: { matchedKeywords: matchedWords },
        })
      );
    }
  }

  return { items, relationships, stepAnalysis, reasoningTrace };
}

/**
 * Reconciles userWorkEvidence and studentAnswerEvidence without losing provenance.
 */
function reconcileStreams({
  userWork,
  studentAnswer,
  workObs,
  answerObs,
  expectedParts,
  questionContract,
  idCounter,
}) {
  const allItems = [...workObs.items, ...answerObs.items];
  const allRelations = [...workObs.relationships, ...answerObs.relationships];
  const nextId = () => `ev_${++idCounter.val}`;

  // Check multi-part coverage across BOTH independent streams
  if (expectedParts.length > 0) {
    for (const part of expectedParts) {
      const foundInWork = workObs.items.find(
        (i) => i.subPart === part.partKey && (i.status === EVIDENCE_STATUS.VERIFIED || i.status === EVIDENCE_STATUS.DIVERGENT)
      );
      const foundInAns = answerObs.items.find(
        (i) => i.subPart === part.partKey && (i.status === EVIDENCE_STATUS.VERIFIED || i.status === EVIDENCE_STATUS.DIVERGENT)
      );

      if (!foundInWork && !foundInAns) {
        allItems.push(
          createEvidenceItem({
            id: nextId(),
            type: EVIDENCE_TYPES.OMISSION,
            source: "reconciled",
            location: { source: "reconciled" },
            status: EVIDENCE_STATUS.MISSING,
            provenance: EVIDENCE_PROVENANCE.DERIVED,
            confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 0.9 },
            text: "",
            meaning: `Did not provide ${part.label} (${part.rawExpected})`,
            subPart: part.partKey,
            metadata: { partKey: part.partKey, expected: part.rawExpected },
          })
        );
      } else if (foundInWork && foundInAns && foundInWork.status !== foundInAns.status) {
        allRelations.push({
          type: EVIDENCE_RELATION_TYPES.CONTRADICTS,
          from: foundInAns.id,
          to: foundInWork.id,
          reason: `Working and final answer disagree on ${part.label}`,
        });
      }
    }
  }

  // Check working vs final answer numeric divergence
  if (userWork && studentAnswer && questionContract.expectedAnswer) {
    const expQty = normalizeQuantity(questionContract.expectedAnswer);
    const ansQty = normalizeQuantity(studentAnswer);
    const workLines = userWork.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const lastLine = workLines[workLines.length - 1] || "";
    const lastWorkQty = normalizeQuantity(lastLine.split("=").pop());

    if (expQty && ansQty && lastWorkQty) {
      const workMatchesExp = compareQuantities(lastWorkQty, expQty).equal;
      const ansMatchesExp = compareQuantities(ansQty, expQty).equal;

      if (workMatchesExp && !ansMatchesExp) {
        const recId = nextId();
        allItems.push(
          createEvidenceItem({
            id: recId,
            type: EVIDENCE_TYPES.CALCULATION,
            source: "reconciled",
            location: { source: "reconciled" },
            status: EVIDENCE_STATUS.VERIFIED,
            provenance: EVIDENCE_PROVENANCE.DERIVED,
            confidenceFactors: { exactMatch: 1, explicitLabel: 1, sourceQuality: 0.95 },
            text: lastLine,
            meaning: `Your working reached the correct value (${lastWorkQty.value}), but final answer was "${studentAnswer}"`,
          })
        );
        return {
          items: allItems,
          relationships: allRelations,
          reconciliation: RECONCILIATION_STATES.WORKING_CORRECT_FINAL_WRONG,
          firstDivergence: null,
        };
      }
    }
  }

  // Determine explicit reconciliation state
  const hasVerified = allItems.some((i) => i.status === EVIDENCE_STATUS.VERIFIED);
  const hasSupported = allItems.some((i) => i.status === EVIDENCE_STATUS.SUPPORTED);
  const hasDivergent = allItems.some((i) => i.status === EVIDENCE_STATUS.DIVERGENT);
  const hasMissing = allItems.some((i) => i.status === EVIDENCE_STATUS.MISSING);
  const hasUnitError = allItems.some((i) => i.type === EVIDENCE_TYPES.UNIT && i.status === EVIDENCE_STATUS.DIVERGENT);
  const hasContradiction = allItems.some((i) => i.type === EVIDENCE_TYPES.CONTRADICTION);

  let reconciliation = RECONCILIATION_STATES.UNCLASSIFIED;
  let firstDivergence = workObs.reasoningTrace?.firstDivergence ?? null;

  if (workObs.stepAnalysis?.whereYourWorkingBrokeDown) {
    reconciliation =
      firstDivergence === 1
        ? RECONCILIATION_STATES.FIRST_STEP_ERROR
        : RECONCILIATION_STATES.STEP_BREAKDOWN;
  } else if (hasContradiction) {
    reconciliation = RECONCILIATION_STATES.CONTRADICTION;
  } else if ((hasVerified || hasSupported) && hasMissing && !hasDivergent) {
    reconciliation = RECONCILIATION_STATES.PARTIAL_REASONING_MISSING_CALC;
  } else if (hasUnitError) {
    reconciliation = RECONCILIATION_STATES.UNIT_ERROR;
  } else if (hasDivergent) {
    reconciliation = RECONCILIATION_STATES.DIVERGENT_EVIDENCE;
  } else if (hasVerified || hasSupported) {
    reconciliation = RECONCILIATION_STATES.PARTIAL_VERIFIED;
  } else if (!userWork && studentAnswer) {
    reconciliation = RECONCILIATION_STATES.NO_WORK;
  }

  return {
    items: allItems,
    relationships: allRelations,
    reconciliation,
    firstDivergence,
  };
}

/**
 * Main entry point: builds an immutable, source-separated EvidenceBundle.
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

  const questionContract = createQuestionContract({
    ...question,
    ans: evaluation?.correctAnswer || question.ans || question.answer || question.correctAnswer || "",
  });

  // 1. Blank check
  if (!studentAnswer && !userWork) {
    return createEvidenceBundle({
      studentAnswer,
      working: userWork,
      items: [],
      reconciliation: RECONCILIATION_STATES.BLANK,
      questionContract,
    });
  }

  // 2. Malformed / keyboard mash check
  if ((isKeyboardMash(studentAnswer) || isUninterpretableInput(studentAnswer)) && !userWork) {
    return createEvidenceBundle({
      studentAnswer,
      working: userWork,
      items: [
        createEvidenceItem({
          id: "ev_1",
          type: EVIDENCE_TYPES.CLAIM,
          source: "studentAnswer",
          status: EVIDENCE_STATUS.AMBIGUOUS,
          provenance: EVIDENCE_PROVENANCE.OBSERVED,
          confidenceFactors: { exactMatch: 0, explicitLabel: 0, ambiguity: 0.9 },
          text: studentAnswer,
          meaning: "Submitted text does not contain recognizable words or mathematical expressions",
          metadata: { malformed: true },
        }),
      ],
      reconciliation: RECONCILIATION_STATES.MALFORMED,
      questionContract,
    });
  }

  const expectedParts = parseExpectedMultiPartTargets(questionContract.expectedAnswer);
  const idCounter = { val: 0 };

  // 3. Observe userWork and studentAnswer in strictly separate streams
  const workObs = observeSingleSource({
    sourceName: "userWork",
    text: userWork,
    question,
    questionContract,
    expectedParts,
    evaluation,
    idCounter,
  });

  const answerObs = observeSingleSource({
    sourceName: "studentAnswer",
    text: studentAnswer,
    question,
    questionContract,
    expectedParts,
    evaluation,
    idCounter,
  });

  // 4. Reconcile across streams
  const reconciled = reconcileStreams({
    userWork,
    studentAnswer,
    workObs,
    answerObs,
    expectedParts,
    questionContract,
    idCounter,
  });

  return createEvidenceBundle({
    studentAnswer,
    working: userWork,
    items: reconciled.items,
    relationships: reconciled.relationships,
    reconciliation: reconciled.reconciliation,
    reconciliationDetail: {
      state: reconciled.reconciliation,
      firstDivergence: reconciled.firstDivergence,
    },
    reasoningTrace: workObs.reasoningTrace,
    questionContract,
    stepAnalysis: workObs.stepAnalysis,
  });
}

// Keep export for backward compatibility
export { parseExpectedMultiPartTargets as parseMultiPartExpected };
