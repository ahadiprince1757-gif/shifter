/**
 * ============================================================================
 * TIXAR VERIFICATION ORCHESTRATOR — TRUTH BRAIN
 * ============================================================================
 *
 * Responsibilities:
 * 1. Determine whether a deterministic verifier can solve/check the question.
 * 2. Establish a canonical answer where possible.
 * 3. Compare the candidate answer against the canonical answer.
 * 4. Decide whether automatic correction is safe (shouldOverride).
 *
 * Concept Separation:
 * - verificationStatus → Can Tixar establish the truth? (VERIFIED | PARTIALLY_VERIFIED | UNVERIFIED)
 * - answerStatus       → Is the candidate answer correct? (CORRECT | INCORRECT | PARTIALLY_CORRECT | NOT_COMPARABLE)
 * - confidenceTier     → Reliability level (HIGH | MEDIUM | LOW)
 * - shouldOverride     → Safe to replace candidate answer? (true only when truth is VERIFIED & candidate is INCORRECT)
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
 * @returns {object} Verification Result object
 */
export function verifyGeneratedAnswer(question, generatedAnswer = null, subjectHint = null) {
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
      console.warn(`[Truth Brain] ${verifier.name || "Verifier"} failed:`, error);
    }
  }

  // 5. NO SAFE MATCH
  return createUnverifiedResponse(
    "No deterministic verification engine could safely verify this question."
  );
}

/* ============================================================================
   PIPELINE BUILDER & SUBJECT DETECTION
============================================================================ */

function getVerifierPipeline(subject) {
  const pipeline = [];

  if (subject === "mathematics") {
    pipeline.push(runMathVerifier);
  } else if (subject === "science") {
    pipeline.push(runScienceVerifier);
  } else if (subject === "biology") {
    pipeline.push(runBiologyVerifier);
  } else if (subject === "language") {
    pipeline.push(runLanguageVerifier);
  }

  // Fallback / Unknown subject: try verifiers in safe deterministic order
  pipeline.push(
    runMathVerifier,
    runScienceVerifier,
    runBiologyVerifier,
    runLanguageVerifier
  );

  return pipeline;
}

function detectSubject(question, subjectHint) {
  if (subjectHint && ["mathematics", "math", "science", "physics", "chemistry", "biology", "language"].includes(subjectHint.toLowerCase())) {
    const normHint = subjectHint.toLowerCase();
    const mapped = normHint === "math" ? "mathematics" : normHint === "physics" || normHint === "chemistry" ? "science" : normHint;
    return { subject: mapped, confidence: 1.0, candidates: [[mapped, 1.0]] };
  }

  const scores = {
    mathematics: 0,
    science: 0,
    biology: 0,
    language: 0,
  };

  if (/\b(area|perimeter|volume|solve|calculate|simplify|factor|expand|equation|expression|quadratic|polynomial|algebra|percentage|fraction|ratio|proportion|average|mean|circumference|radius|diameter|gradient|slope)\b/i.test(question)) {
    scores.mathematics += 0.85;
  }
  if (/\b(force|newton|ohm|ohms|voltage|current|resistance|density|work done|joules|watts|electrical power|ph scale|acidic|alkaline|neutral)\b/i.test(question)) {
    scores.science += 0.90;
  }
  if (/\b(mitosis|meiosis|photosynthesis|chlorophyll|chloroplast|mitochondria|ribosome|nucleus|vacuole|artery|arteries|vein|veins|capillary|capillaries|monohybrid|punnett|genotype|phenotype|cell division)\b/i.test(question)) {
    scores.biology += 0.95;
  }
  if (/\b(simile|metaphor|personification|alliteration|hyperbole|active voice|passive voice|part of speech|noun|verb|adjective|adverb|pronoun|preposition|synonym|antonym)\b/i.test(question)) {
    scores.language += 0.85;
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topSubject, confidence] = ranked[0];

  return {
    subject: confidence >= 0.50 ? topSubject : "unknown",
    confidence,
    candidates: ranked,
  };
}

/* ============================================================================
   DOMAIN ADAPTERS (Normalize engine outputs to orchestrator contract)
============================================================================ */

function runMathVerifier(question, candidateAnswer) {
  const result = verifyMathAnswer(question, candidateAnswer);
  if (!result || !result.verified) {
    return { matched: false };
  }

  const canonicalAnswer = String(result.answer ?? "");
  const isMatch = candidateAnswer && compareNumericOrString(candidateAnswer, canonicalAnswer);

  return {
    matched: true,
    subject: "mathematics",
    canonicalAnswer,
    steps: result.steps || [],
    explanation: result.explanation || "Calculated using the Symbolic Math Engine.",
    confidence: 0.99,
    answerStatus: candidateAnswer ? (isMatch ? "CORRECT" : "INCORRECT") : "NOT_COMPARABLE",
  };
}

function runScienceVerifier(question, candidateAnswer) {
  const result = verifyScienceQuestion(question, candidateAnswer);
  if (!result) {
    return { matched: false };
  }

  const canonicalAnswer = result.verifiedAnswer || String(result.answer || "");
  let answerStatus = "NOT_COMPARABLE";

  if (candidateAnswer) {
    if (result.comparison?.compared) {
      answerStatus = result.comparison.isDifferent ? "INCORRECT" : "CORRECT";
    } else {
      answerStatus = compareNumericOrString(candidateAnswer, canonicalAnswer) ? "CORRECT" : "INCORRECT";
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

function runBiologyVerifier(question, candidateAnswer) {
  const questionResult = verifyBiologyQuestion(question);
  if (!questionResult) {
    return { matched: false };
  }

  const canonicalAnswer = questionResult.answer || questionResult.verifiedAnswer || "";
  let answerStatus = "NOT_COMPARABLE";
  let factCheck = null;

  if (candidateAnswer) {
    factCheck = verifyBiologyAnswer({ question, studentAnswer: candidateAnswer });
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
    steps: questionResult.steps || questionResult.verifiedSteps || [],
    explanation: questionResult.explanation,
    confidence: questionResult.confidence ?? 0.92,
    answerStatus,
    extra: { factCheck },
  };
}

function runLanguageVerifier(question, candidateAnswer) {
  const result = verifyLanguageQuestion(question, candidateAnswer);
  if (!result) {
    return { matched: false };
  }

  const canonicalAnswer = result.verifiedAnswer || result.answer || "";
  let answerStatus = "NOT_COMPARABLE";

  if (candidateAnswer) {
    if (result.comparison?.compared) {
      answerStatus = result.comparison.isDifferent ? "INCORRECT" : "CORRECT";
    } else {
      answerStatus = compareLanguageAnswer(candidateAnswer, canonicalAnswer, result.acceptableAnswers || []);
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
    extra: { acceptableAnswers: result.acceptableAnswers || [] },
  };
}

/* ============================================================================
   RESPONSE BUILDERS & COMPARATOR HELPERS
============================================================================ */

function buildVerificationResult({
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
  // 2. The candidate answer is demonstrably INCORRECT
  const shouldOverride = verificationStatus === "VERIFIED" && answerStatus === "INCORRECT";

  return {
    verificationStatus,
    answerStatus,
    confidence,
    confidenceTier,
    subject,
    canonicalAnswer,
    verifiedAnswer: canonicalAnswer, // Backward compatibility property
    verifiedSteps: steps,
    explanation,
    shouldOverride,
    wasOverridden: shouldOverride, // Backward compatibility property
    requiresSecondaryVerification: verificationStatus !== "VERIFIED",
    ...extra,
  };
}

function createUnverifiedResponse(reason) {
  return {
    verificationStatus: "UNVERIFIED",
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

function getConfidenceTier(confidence) {
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
  const allAcceptable = [normCanon, ...acceptableAnswers.map((a) => String(a).trim().toLowerCase())];

  return allAcceptable.some((acc) => acc && (acc === normCand || normCand.includes(acc) || acc.includes(normCand)))
    ? "CORRECT"
    : "INCORRECT";
}
