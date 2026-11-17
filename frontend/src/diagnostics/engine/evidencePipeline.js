/**
 * TIXAR EVIDENCE & VERIFICATION PIPELINE (PHASE 1)
 *
 * Sequence:
 *   RAW SUBMISSION
 *         ↓
 *   0. NORMALIZATION (normalizer.js)
 *         ↓
 *   1. EVIDENCE ENGINE (evidenceEngine.js)
 *         ↓  [EvidenceObject]
 *   2. VERIFICATION ENGINE
 *         ↓  [CORRECT / INCORRECT / INCONCLUSIVE]
 *   3. ERROR LOCALIZER (errorLocalizer.js)
 *         ↓  [First Verified Divergence]
 *   CANONICAL SUBMISSION CONTRACT
 */

import { normalizeSubmission } from "./normalizer.js";
import { extractSubmissionEvidence } from "./evidenceEngine.js";
import { localizeErrorDivergence } from "./errorLocalizer.js";
import { evaluateEvidenceSufficiency } from "./sufficiencyGate.js";
import { generateHypotheses, selectMinimalProbe } from "./hypothesisEngine.js";
import {
  VerificationStatus,
  EvidenceSufficiency,
  createSubmissionContract,
} from "../contracts/evidenceContract.js";

/**
 * Executes the complete Phase 1 evidence and verification pipeline.
 *
 * @param {string} rawAnswer - The student's raw submission text
 * @param {object} question - The question definition and expected parameters
 * @returns {object} Canonical SubmissionContract
 */
export function executeEvidencePipeline(rawAnswer, question = {}) {
  // 0. Submission Normalization
  const normalized = normalizeSubmission(rawAnswer);

  // Extract question context parameters
  const expected = question.expected || {};
  const questionContext = {
    text: question.q || question.text || "",
    expectedInputs: Array.isArray(expected.inputs) ? expected.inputs : [],
    expectedAnswer: expected.answer ?? null,
    expectedUnit: expected.unit ?? null,
  };

  // 1. Evidence Extraction
  const evidence = extractSubmissionEvidence(rawAnswer, questionContext);

  // 2. Verification
  let status = VerificationStatus.INCONCLUSIVE;
  let answerConfidence = 0;
  let errorConfidence = 0;
  let causeConfidence = 0;

  const expAnswer = expected.answer !== null && expected.answer !== undefined
    ? parseFloat(expected.answer)
    : null;
  const obsResult = evidence.observedResult !== null && evidence.observedResult !== undefined
    ? parseFloat(evidence.observedResult)
    : null;

  if (expAnswer !== null && obsResult !== null) {
    if (Math.abs(expAnswer - obsResult) < 0.001) {
      status = VerificationStatus.CORRECT;
      answerConfidence = 1.0;
      errorConfidence = 0.0;
      causeConfidence = 0.95;
    } else {
      status = VerificationStatus.INCORRECT;
      answerConfidence = 1.0;
      errorConfidence = 0.99;
    }
  } else if (!rawAnswer || String(rawAnswer).trim() === "") {
    status = VerificationStatus.INCONCLUSIVE;
    answerConfidence = 0.0;
    errorConfidence = 0.0;
    causeConfidence = 0.0;
  } else {
    // Non-numeric or text submission: check text match
    const expText = String(expected.answer || "").trim().toLowerCase();
    const subText = String(normalized || "").trim().toLowerCase();
    if (expText && subText && (subText === expText || subText.includes(expText))) {
      status = VerificationStatus.CORRECT;
      answerConfidence = 0.95;
      causeConfidence = 0.9;
    } else if (expText && subText) {
      status = VerificationStatus.INCORRECT;
      answerConfidence = 0.95;
      errorConfidence = 0.95;
    } else {
      status = VerificationStatus.INCONCLUSIVE;
      causeConfidence = 0.2;
    }
  }

  // 3. Error Localization (Only if not correct)
  let divergence = null;
  if (status === VerificationStatus.INCORRECT) {
    divergence = localizeErrorDivergence(evidence, expected);
    causeConfidence = divergence?.confidence || 0.3;
  }

  // 4. Evidence Sufficiency Gate
  // Applied after divergence/causeConfidence to cap any inflated values
  let evidenceSufficiency = EvidenceSufficiency.SUFFICIENT;
  let probe = null;
  let hypotheses = [];

  if (status === VerificationStatus.INCORRECT) {
    const sufficiencyResult = evaluateEvidenceSufficiency(evidence, expected);
    evidenceSufficiency = sufficiencyResult.sufficiency;

    // Cap causeConfidence — inferred evidence cannot claim same certainty as observed
    causeConfidence = Math.min(causeConfidence, sufficiencyResult.causeConfidenceCap);

    // Generate competing hypotheses
    hypotheses = generateHypotheses(evidence, expected);

    // Select probe when sufficiency is INSUFFICIENT or hypotheses are ambiguous
    if (
      evidenceSufficiency === EvidenceSufficiency.INSUFFICIENT ||
      evidenceSufficiency === EvidenceSufficiency.BORDERLINE
    ) {
      probe = selectMinimalProbe(hypotheses, expected);
    }
  }

  // Return Canonical Contract
  return createSubmissionContract({
    question: {
      skillId: question.skillId || question.id || "general",
      subject: question.subject || "science",
      text: question.q || question.text || "",
      expected,
    },
    student: {
      rawAnswer,
      normalized,
      evidence,
    },
    verification: {
      status,
      answerConfidence,
      errorConfidence,
      evidenceSufficiency,
      causeConfidence,
    },
    divergence,
    hypotheses,
    probe,
  });
}
