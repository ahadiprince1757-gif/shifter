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
import { parseStrictNumericValue } from "./grader.js";

/**
 * A comparison can establish correctness or incorrectness
 * only when both answers can be compared reliably.
 */
export function classifyComparableAnswers(candidate, canonical) {
  const candidateText = String(candidate ?? "").trim();
  const canonicalText = String(canonical ?? "").trim();

  if (!candidateText || !canonicalText) {
    return {
      answerStatus: "NOT_COMPARABLE",
      compared: false,
    };
  }

  const candidateNumber = parseStrictNumericValue(candidateText);
  const canonicalNumber = parseStrictNumericValue(canonicalText);

  // If either answer is numeric, both must parse numerically.
  // Never fall back to substring matching for a failed numeric parse.
  if (candidateNumber !== null || canonicalNumber !== null) {
    if (candidateNumber === null || canonicalNumber === null) {
      return {
        answerStatus: "NOT_COMPARABLE",
        compared: false,
      };
    }

    const equal = Math.abs(candidateNumber - canonicalNumber) <= 1e-9;

    return {
      answerStatus: equal ? "CORRECT" : "INCORRECT",
      compared: true,
    };
  }

  // Non-numeric answers need a subject-specific comparison.
  // Exact normalized equality is safe; semantic matching should
  // be performed by a suitable verifier, not substring matching.
  const normalize = (text) =>
    text.toLowerCase().replace(/\s+/g, " ").trim();

  if (normalize(candidateText) === normalize(canonicalText)) {
    return {
      answerStatus: "CORRECT",
      compared: true,
    };
  }

  return {
    answerStatus: "NOT_COMPARABLE",
    compared: false,
  };
}

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

  // 4. RUN ALL CANDIDATE VERIFIERS IN PIPELINE
  const matches = [];

  for (const verifier of verifiers) {
    try {
      const result = verifier(q, candidateAnswer);

      if (
        result?.matched &&
        result.canonicalAnswer !== undefined &&
        result.canonicalAnswer !== null &&
        String(result.canonicalAnswer).trim().length > 0
      ) {
        matches.push(result);
      }
    } catch (error) {
      console.warn(
        `[Truth Brain] ${verifier.name || "Verifier"} failed:`,
        error
      );
    }
  }

  // 5. EVALUATE MATCHES & DETECT CONFLICTS
  if (matches.length === 0) {
    return createUnverifiedResponse(
      "No deterministic verification engine could safely verify this question."
    );
  }

  if (matches.length === 1) {
    const single = matches[0];
    return buildVerificationResult({
      subject: single.subject,
      canonicalAnswer: single.canonicalAnswer,
      steps: single.steps || [],
      explanation: single.explanation || null,
      confidence: single.confidence ?? 0.85,
      answerStatus: single.answerStatus || "NOT_COMPARABLE",
      extra: single.extra || {},
    });
  }

  // Check whether multiple matching verifiers produce conflicting canonical answers
  let hasConflict = false;
  for (let i = 0; i < matches.length; i++) {
    for (let j = i + 1; j < matches.length; j++) {
      const comp = classifyComparableAnswers(
        matches[i].canonicalAnswer,
        matches[j].canonicalAnswer
      );
      if (comp.answerStatus === "INCORRECT") {
        hasConflict = true;
        break;
      }
    }
    if (hasConflict) break;
  }

  if (hasConflict) {
    // If an explicit subject hint was provided with high confidence, prefer that match
    const hintedMatch = matches.find((m) => m.subject === subject);
    if (
      hintedMatch &&
      subjectDetection.confidence >= 0.95 &&
      hintedMatch.confidence >= 0.90
    ) {
      return buildVerificationResult({
        subject: hintedMatch.subject,
        canonicalAnswer: hintedMatch.canonicalAnswer,
        steps: hintedMatch.steps || [],
        explanation: hintedMatch.explanation || null,
        confidence: hintedMatch.confidence,
        answerStatus: hintedMatch.answerStatus || "NOT_COMPARABLE",
        extra: hintedMatch.extra || {},
      });
    }

    // Conflicting canonical answers across engines without definitive hint:
    // Safe fallback per audit plan is UNVERIFIED rather than guessing.
    return createUnverifiedResponse(
      "Multiple verification engines produced conflicting canonical answers."
    );
  }

  // All matched verifiers agree: pick the highest-confidence match
  matches.sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0));
  const bestMatch = matches[0];

  return buildVerificationResult({
    subject: bestMatch.subject,
    canonicalAnswer: bestMatch.canonicalAnswer,
    steps: bestMatch.steps || [],
    explanation: bestMatch.explanation || null,
    confidence: bestMatch.confidence ?? 0.85,
    answerStatus: bestMatch.answerStatus || "NOT_COMPARABLE",
    extra: bestMatch.extra || {},
  });
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
  let compared = false;

  if (candidateAnswer) {
    const comp = classifyComparableAnswers(candidateAnswer, canonicalAnswer);
    answerStatus = comp.answerStatus;
    compared = comp.compared;
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
      compared,
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
  let compared = false;

  if (candidateAnswer) {
    if (result.comparison?.compared) {
      answerStatus = result.comparison.isDifferent ? "INCORRECT" : "CORRECT";
      compared = true;
    } else {
      const comp = classifyComparableAnswers(candidateAnswer, canonicalAnswer);
      answerStatus = comp.answerStatus;
      compared = comp.compared;
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
      compared,
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
  let compared = false;
  let factCheck = null;

  if (candidateAnswer) {
    factCheck = verifyBiologyAnswer({
      question,
      studentAnswer: candidateAnswer,
    });

    if (factCheck?.verdict === "CORRECT") {
      answerStatus = "CORRECT";
      compared = true;
    } else if (factCheck?.verdict === "PARTIALLY_CORRECT") {
      answerStatus = "PARTIALLY_CORRECT";
      compared = true;
    } else if (factCheck?.verdict === "INCORRECT") {
      answerStatus = "INCORRECT";
      compared = true;
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
      compared,
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
  let compared = false;

  if (candidateAnswer) {
    if (result.comparison?.compared) {
      answerStatus = result.comparison.isDifferent ? "INCORRECT" : "CORRECT";
      compared = true;
    } else {
      answerStatus = compareLanguageAnswer(
        candidateAnswer,
        canonicalAnswer,
        result.acceptableAnswers || []
      );
      compared = answerStatus !== "NOT_COMPARABLE";
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
      compared,
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
  // 3. Comparison was actually performed and reliable (compared === true)
  // 4. Canonical answer is a non-empty string
  const canOverride =
    verificationStatus === "VERIFIED" &&
    answerStatus === "INCORRECT" &&
    extra?.compared === true &&
    typeof canonicalAnswer === "string" &&
    canonicalAnswer.trim().length > 0;

  const shouldOverride = canOverride;

  return {
    ...extra,

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

  const numCand = parseStrictNumericValue(normCand);
  const numCanon = parseStrictNumericValue(normCanon);
  if (numCand !== null && numCanon !== null) {
    return Math.abs(numCand - numCanon) <= 0.01;
  }

  // Substring match ONLY when one term is substantially contained in the other
  // and not trivially short — prevents "cat" matching "catalogue".
  if (
    normCand.length >= 6 &&
    normCanon.length >= 6 &&
    normCand.length / normCanon.length > 0.6 &&
    normCanon.length / normCand.length > 0.6
  ) {
    return normCand.includes(normCanon) || normCanon.includes(normCand);
  }

  return false;
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
