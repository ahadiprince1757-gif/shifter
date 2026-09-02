/**
 * ============================================================================
 * TIXAR VERIFICATION ORCHESTRATOR — TRUTH BRAIN
 * ============================================================================
 *
 * Responsibilities:
 * 1. Determine whether a deterministic verifier can solve/check the question.
 * 2. Establish a canonical answer where possible.
 * 3. Compare candidate answer against the canonical answer.
 * 4. Decide whether automatic correction is safe (shouldOverride).
 *
 * Important Concept Separation:
 * - verificationStatus → Can Tixar establish the truth? (VERIFIED | PARTIALLY_VERIFIED | UNVERIFIED)
 * - answerStatus       → Is the candidate answer correct? (CORRECT | INCORRECT | PARTIALLY_CORRECT | NOT_COMPARABLE)
 * - confidence         → Numerical reliability score (0.0 to 1.0)
 * - confidenceTier     → Reliability level (HIGH | MEDIUM | LOW)
 * - shouldOverride     → Safe to replace candidate answer? (true ONLY when truth is VERIFIED & candidate is INCORRECT)
 * ============================================================================
 */

import { verifyMathAnswer } from "./mathVerifier.js";
import { verifyScienceQuestion } from "./verifiers/scienceVerifier.js";
import { verifyBiologyQuestion, verifyBiologyAnswer } from "./verifiers/biologyVerifier.js";
import { verifyLanguageQuestion } from "./verifiers/languageVerifier.js";

/**
 * Universal verification entry point for any generated or candidate answer.
 *
 * @param {string} question  - The original question text
 * @param {string} [generatedAnswer] - The candidate or generated answer to verify
 * @param {string} [subjectHint] - Optional subject hint ('math'|'science'|'biology'|'language')
 * @returns {object} Universal Verification Result object
 */
export function verifyGeneratedAnswer(
  question,
  generatedAnswer = null,
  subjectHint = null
) {
  const q = String(question || "").trim();
  const candidateAnswer = String(generatedAnswer || "").trim();

  // 1. INPUT VALIDATION
  if (!q) {
    return createUnverifiedResponse("Empty question provided.");
  }

  // 2. DETERMINE LIKELY SUBJECT
  const subjectDetection = detectSubject(q, subjectHint);
  const subject = subjectDetection.subject;

  // 3. BUILD VERIFIER PIPELINE
  const verifiers = getVerifierPipeline(subject);

  // 4. RUN VERIFIERS IN PIPELINE ORDER
  for (const verifier of verifiers) {
    try {
      const result = verifier(q, candidateAnswer);

      if (!result?.matched) {
        continue;
      }

      return buildVerificationResult({
        subject: result.subject,
        canonicalAnswer: result.canonicalAnswer,
        steps: result.steps || [],
        explanation: result.explanation || null,
        confidence: result.confidence ?? 0.85,
        answerStatus: result.answerStatus || "NOT_COMPARABLE",
        extra: result.extra || {},
      });
    } catch (error) {
      console.warn(
        `[Truth Brain] ${verifier.name || "Verifier"} failed:`,
        error
      );
    }
  }

  // 5. NO SAFE MATCH
  return createUnverifiedResponse(
    "No deterministic verification engine could safely verify this question."
  );
}

/**
 * Pipeline Builder - constructs prioritized pipeline based on detected subject
 */
export function getVerifierPipeline(subject) {
  const pipeline = [];

  if (subject === "mathematics" || subject === "math") {
    pipeline.push(runMathVerifier, runScienceVerifier, runBiologyVerifier, runLanguageVerifier);
  } else if (subject === "science") {
    pipeline.push(runScienceVerifier, runMathVerifier, runBiologyVerifier, runLanguageVerifier);
  } else if (subject === "biology") {
    pipeline.push(runBiologyVerifier, runScienceVerifier, runMathVerifier, runLanguageVerifier);
  } else if (subject === "language") {
    pipeline.push(runLanguageVerifier, runBiologyVerifier, runScienceVerifier, runMathVerifier);
  } else {
    // Unknown subject: try engines in a safe order
    pipeline.push(
      runMathVerifier,
      runScienceVerifier,
      runBiologyVerifier,
      runLanguageVerifier
    );
  }

  return pipeline;
}

/**
 * Subject Detector using score heuristics and candidate ranking
 */
export function detectSubject(question, subjectHint = null) {
  if (
    subjectHint &&
    ["mathematics", "math", "science", "physics", "chemistry", "biology", "language"].includes(
      subjectHint.toLowerCase()
    )
  ) {
    const normHint = subjectHint.toLowerCase();
    const mapped =
      normHint === "math"
        ? "mathematics"
        : normHint === "physics" || normHint === "chemistry"
        ? "science"
        : normHint;
    return { subject: mapped, confidence: 1.0, candidates: [[mapped, 1.0]] };
  }

  const scores = {
    mathematics: 0,
    science: 0,
    biology: 0,
    language: 0,
  };

  const q = String(question || "").toLowerCase();

  // Mathematics heuristics
  if (
    /\b(area|perimeter|volume|solve|calculate|simplify|factor|expand|equation|expression|quadratic|polynomial|algebra|percentage|fraction|ratio|proportion|average|mean|circumference|radius|diameter|gradient|slope)\b/i.test(
      q
    )
  ) {
    scores.mathematics += 0.85;
  }

  // Science heuristics (Physics & Chemistry)
  if (
    /\b(force|newton|ohm|ohms|voltage|current|resistance|density|work done|joules|watts|electrical power|ph scale|acidic|alkaline|neutral|speed|velocity|acceleration)\b/i.test(
      q
    )
  ) {
    scores.science += 0.85;
  }

  // Biology heuristics
  if (
    /\b(mitosis|meiosis|photosynthesis|chlorophyll|chloroplast|mitochondria|ribosome|nucleus|vacuole|artery|arteries|vein|veins|capillary|capillaries|monohybrid|punnett|genotype|phenotype|cell division)\b/i.test(
      q
    )
  ) {
    scores.biology += 0.90;
  }

  // Language heuristics
  if (
    /\b(simile|metaphor|personification|alliteration|hyperbole|active voice|passive voice|part of speech|noun|verb|adjective|adverb|pronoun|preposition|synonym|antonym)\b/i.test(
      q
    )
  ) {
    scores.language += 0.85;
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topSubject, confidence] = ranked[0];

  return {
    subject: confidence >= 0.5 ? topSubject : "unknown",
    confidence,
    candidates: ranked,
  };
}

/* ============================================================================
   DOMAIN ADAPTERS (Normalize engine outputs to Universal Verifier Contract)
============================================================================ */

export function runMathVerifier(question, candidateAnswer) {
  const result = verifyMathAnswer(question, candidateAnswer);

  if (!result || result.confidence === 0 || (!result.operation && !result.wasOverridden && !result.answer)) {
    return { matched: false };
  }

  const canonicalAnswer = String(result.answer ?? result.verifiedAnswer ?? "");
  let answerStatus = "NOT_COMPARABLE";

  if (candidateAnswer) {
    const isMatch = compareNumericOrString(candidateAnswer, canonicalAnswer);
    answerStatus = isMatch ? "CORRECT" : "INCORRECT";
  }

  return {
    matched: true,
    subject: "mathematics",
    canonicalAnswer,
    steps: result.steps || result.verifiedSteps || [],
    explanation:
      result.explanation || "Verified using the mathematical reasoning engine.",
    confidence: result.confidence ?? 0.99,
    answerStatus,
    extra: {
      operation: result.operation || null,
    },
  };
}

export function runScienceVerifier(question, candidateAnswer) {
  const result = verifyScienceQuestion(question, candidateAnswer);

  if (!result) {
    return { matched: false };
  }

  const canonicalAnswer = String(result.canonicalAnswer || result.verifiedAnswer || result.answer || "");
  let answerStatus = "NOT_COMPARABLE";

  if (candidateAnswer) {
    if (result.comparison?.compared) {
      answerStatus = result.comparison.isDifferent ? "INCORRECT" : "CORRECT";
    } else {
      answerStatus = compareNumericOrString(candidateAnswer, canonicalAnswer)
        ? "CORRECT"
        : "INCORRECT";
    }
  }

  return {
    matched: true,
    subject: "science",
    canonicalAnswer,
    steps: result.verifiedSteps || result.steps || [],
    explanation: result.explanation || null,
    confidence: result.confidence ?? 0.95,
    answerStatus,
    extra: {
      topic: result.topic,
      formula: result.formula,
    },
  };
}

export function runBiologyVerifier(question, candidateAnswer) {
  const questionResult = verifyBiologyQuestion(question);

  if (!questionResult) {
    return { matched: false };
  }

  const canonicalAnswer = String(questionResult.canonicalAnswer || questionResult.verifiedAnswer || questionResult.answer || "");
  let answerStatus = "NOT_COMPARABLE";
  let factCheck = null;

  if (candidateAnswer) {
    factCheck = verifyBiologyAnswer({
      question,
      studentAnswer: candidateAnswer,
    });

    if (factCheck?.verdict === "CORRECT") {
      answerStatus = "CORRECT";
    } else if (factCheck?.verdict === "PARTIALLY_CORRECT") {
      answerStatus = "PARTIALLY_CORRECT";
    } else if (factCheck?.verdict === "INCORRECT") {
      answerStatus = "INCORRECT";
    }
  }

  return {
    matched: true,
    subject: "biology",
    canonicalAnswer,
    steps: questionResult.verifiedSteps || questionResult.steps || [],
    explanation: questionResult.explanation,
    confidence: questionResult.confidence ?? 0.92,
    answerStatus,
    extra: {
      factCheck,
      facts: questionResult.facts || null,
    },
  };
}

export function runLanguageVerifier(question, candidateAnswer) {
  const result = verifyLanguageQuestion(question, candidateAnswer);

  if (!result) {
    return { matched: false };
  }

  const canonicalAnswer = String(result.canonicalAnswer || result.verifiedAnswer || result.answer || "");
  let answerStatus = "NOT_COMPARABLE";

  if (candidateAnswer) {
    if (result.comparison?.compared) {
      answerStatus = result.comparison.isDifferent ? "INCORRECT" : "CORRECT";
    } else {
      answerStatus = compareLanguageAnswer(
        candidateAnswer,
        canonicalAnswer,
        result.acceptableAnswers || []
      );
    }
  }

  return {
    matched: true,
    subject: "language",
    canonicalAnswer,
    steps: result.verifiedSteps || result.steps || [],
    explanation: result.explanation,
    confidence: result.confidence ?? 0.85,
    answerStatus,
    extra: {
      acceptableAnswers: result.acceptableAnswers || [],
      questionType: result.questionType || null,
    },
  };
}

/* ============================================================================
   RESPONSE BUILDER & HELPERS
============================================================================ */

export function buildVerificationResult({
  subject,
  canonicalAnswer,
  steps = [],
  explanation = null,
  confidence = 0,
  answerStatus = "NOT_COMPARABLE",
  extra = {},
}) {
  const confidenceTier = getConfidenceTier(confidence);

  const verificationStatus =
    confidence >= 0.85
      ? "VERIFIED"
      : confidence >= 0.50
      ? "PARTIALLY_VERIFIED"
      : "UNVERIFIED";

  // Only replace an answer if:
  // 1. Truth is established with high confidence (VERIFIED)
  // 2. Candidate answer is demonstrably INCORRECT
  const shouldOverride =
    verificationStatus === "VERIFIED" && answerStatus === "INCORRECT";

  return {
    // Can Tixar establish truth?
    verificationStatus,
    verified: verificationStatus === "VERIFIED", // Backward compatibility alias

    // Is candidate correct?
    answerStatus,

    // Confidence information
    confidence,
    confidenceTier,

    // Subject
    subject,

    // Canonical truth
    canonicalAnswer,
    verifiedAnswer: canonicalAnswer, // Backward compatibility alias

    // Explanation & steps
    verifiedSteps: steps,
    explanation,

    // Safety decision
    shouldOverride,
    wasOverridden: shouldOverride, // Backward compatibility alias

    requiresSecondaryVerification: verificationStatus !== "VERIFIED",

    ...extra,
  };
}

export function createUnverifiedResponse(reason) {
  return {
    verificationStatus: "UNVERIFIED",
    verified: false,
    answerStatus: "NOT_COMPARABLE",
    confidence: 0.40,
    confidenceTier: "LOW",
    subject: "unknown",
    canonicalAnswer: null,
    verifiedAnswer: null,
    verifiedSteps: [],
    explanation: null,
    shouldOverride: false,
    wasOverridden: false,
    requiresSecondaryVerification: true,
    reason,
  };
}

export function getConfidenceTier(confidence) {
  if (confidence >= 0.85) return "HIGH";
  if (confidence >= 0.50) return "MEDIUM";
  return "LOW";
}

function compareNumericOrString(candidate, canonical) {
  const normCand = String(candidate).trim().toLowerCase();
  const normCanon = String(canonical).trim().toLowerCase();
  if (normCand === normCanon) return true;

  const numCand = parseFloat(normCand);
  const numCanon = parseFloat(normCanon);
  if (!isNaN(numCand) && !isNaN(numCanon)) {
    return Math.abs(numCand - numCanon) <= 0.01;
  }

  return normCand.includes(normCanon) || normCanon.includes(normCand);
}

function compareLanguageAnswer(candidate, canonical, acceptableAnswers = []) {
  const normCand = String(candidate).trim().toLowerCase();
  const normCanon = String(canonical).trim().toLowerCase();
  const allAcceptable = [
    normCanon,
    ...acceptableAnswers.map((a) => String(a).trim().toLowerCase()),
  ];

  return allAcceptable.some(
    (acc) =>
      acc &&
      (acc === normCand || normCand.includes(acc) || acc.includes(normCand))
  )
    ? "CORRECT"
    : "INCORRECT";
}
