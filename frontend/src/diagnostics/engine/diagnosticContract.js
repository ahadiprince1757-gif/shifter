/**
 * TIXAR CANONICAL DIAGNOSTIC FEEDBACK CONTRACT
 *
 * Implements the authoritative structured diagnosis schema:
 * {
 *   status: "correct" | "diagnosed" | "inconclusive",
 *   correctness: "correct" | "incorrect" | "partial",
 *   studentAnswer: string,
 *   evidence: [{ text: string, meaning: string }],
 *   diagnosis: {
 *     type: "misconception" | "procedure" | "formula" | "calculation" |
 *           "units" | "classification" | "concept" | "missing_step" | "unclassified",
 *     brokenAt: string,
 *     explanation: string
 *   },
 *   breakPoint: {
 *     concept: string,
 *     errorType: string,
 *     explanation: string
 *   },
 *   repair: {
 *     concept: string,
 *     explanation: string,
 *     steps: string[]
 *   },
 *   verification: {
 *     question: string,
 *     expectedConcept: string,
 *     options?: string[],
 *     correctAnswer?: string,
 *     type: "same_skill"
 *   }
 * }
 */

export const DIAGNOSTIC_STATUS = Object.freeze({
  CORRECT: "correct",
  DIAGNOSED: "diagnosed",
  INCONCLUSIVE: "inconclusive",
});

export const CORRECTNESS_STATUS = Object.freeze({
  CORRECT: "correct",
  INCORRECT: "incorrect",
  PARTIAL: "partial",
});

export const DIAGNOSIS_TYPE = Object.freeze({
  MISCONCEPTION: "misconception",
  PROCEDURE: "procedure",
  FORMULA: "formula",
  CALCULATION: "calculation",
  UNITS: "units",
  CLASSIFICATION: "classification",
  CONCEPT: "concept",
  MISSING_STEP: "missing_step",
  UNCLASSIFIED: "unclassified",
});

/**
 * Creates and validates a structured diagnosis adhering to the canonical contract.
 */
export function createStructuredDiagnosis({
  status = DIAGNOSTIC_STATUS.INCONCLUSIVE,
  correctness = null,
  studentAnswer = "",
  userWork = "",
  evidence = [],
  diagnosis = null,
  breakPoint = null,
  repair = null,
  verification = null,
  confidence = "low",
  // Legacy / Presentation compatibility properties
  errorType = null,
  whatYouDid = "",
  whyThisIsWrong = [],
  theRightWay = [],
  remember = "",
  probe = null,
  stepAnalysis = null,
  observed = [],
  expected = [],
  contract = null,
}) {
  const normalizedStatus =
    status === "correct"
      ? DIAGNOSTIC_STATUS.CORRECT
      : status === "diagnosed"
      ? DIAGNOSTIC_STATUS.DIAGNOSED
      : DIAGNOSTIC_STATUS.INCONCLUSIVE;

  const normalizedCorrectness =
    correctness ||
    (normalizedStatus === DIAGNOSTIC_STATUS.CORRECT
      ? CORRECTNESS_STATUS.CORRECT
      : CORRECTNESS_STATUS.INCORRECT);

  // Normalize evidence into canonical [{ text, meaning }] structure
  const normalizedEvidence = Array.isArray(evidence)
    ? evidence.map((e) => {
        if (typeof e === "string") {
          return { text: e, meaning: "Observed student input" };
        }
        return {
          text: String(e.text || e.raw || ""),
          meaning: String(e.meaning || e.description || e.interpretation || ""),
        };
      })
    : [];

  // Canonical diagnosis structure
  const normalizedDiagnosis = diagnosis
    ? {
        type: diagnosis.type || DIAGNOSIS_TYPE.UNCLASSIFIED,
        brokenAt: diagnosis.brokenAt || breakPoint?.concept || "unclassified",
        explanation: diagnosis.explanation || breakPoint?.explanation || "",
      }
    : null;

  // Canonical breakPoint structure
  const normalizedBreakPoint = breakPoint
    ? {
        concept: breakPoint.concept || normalizedDiagnosis?.brokenAt || "",
        errorType: breakPoint.errorType || errorType || "conceptual_divergence",
        explanation: breakPoint.explanation || normalizedDiagnosis?.explanation || "",
      }
    : normalizedDiagnosis
    ? {
        concept: normalizedDiagnosis.brokenAt,
        errorType: errorType || "conceptual_divergence",
        explanation: normalizedDiagnosis.explanation,
      }
    : null;

  // Canonical repair structure
  const normalizedRepair = repair
    ? {
        concept: repair.concept || normalizedBreakPoint?.concept || "core_concept",
        explanation: repair.explanation || repair.principle || "",
        steps: Array.isArray(repair.steps)
          ? repair.steps.map(String)
          : repair.counterExample
          ? [repair.counterExample]
          : [],
        ...(repair.principle ? { principle: repair.principle } : {}),
        ...(repair.counterExample ? { counterExample: repair.counterExample } : {}),
      }
    : null;

  // Canonical verification structure (Same-Skill Retest)
  const normalizedVerification = verification
    ? {
        question: verification.question || (probe?.question ?? ""),
        expectedConcept: verification.expectedConcept || "",
        type: verification.type || "same_skill",
        ...(verification.options || probe?.options
          ? { options: verification.options || probe?.options }
          : {}),
        ...(verification.correctAnswer || probe?.correctAnswer
          ? { correctAnswer: verification.correctAnswer || probe?.correctAnswer }
          : {}),
      }
    : probe
    ? {
        question: probe.question,
        expectedConcept: normalizedBreakPoint?.concept || "",
        options: probe.options || [],
        correctAnswer: probe.correctAnswer || "",
        type: "same_skill",
      }
    : null;

  return {
    status: normalizedStatus,
    correctness: normalizedCorrectness,
    studentAnswer: String(studentAnswer || ""),
    userWork: String(userWork || ""),
    evidence: normalizedEvidence,
    diagnosis: normalizedDiagnosis,
    breakPoint: normalizedBreakPoint,
    repair: normalizedRepair,
    verification: normalizedVerification,

    // Backward-compatible properties for existing consumers
    errorType: errorType || normalizedBreakPoint?.errorType || null,
    whatYouDid: whatYouDid || (studentAnswer ? `You entered "${studentAnswer}".` : ""),
    whyThisIsWrong: Array.isArray(whyThisIsWrong) ? whyThisIsWrong : [String(whyThisIsWrong || "")],
    theRightWay: Array.isArray(theRightWay) ? theRightWay : [],
    remember: remember || normalizedRepair?.explanation || "",
    confidence: confidence || (normalizedStatus === DIAGNOSTIC_STATUS.DIAGNOSED ? "high" : "low"),
    probe: probe || (normalizedVerification?.options ? normalizedVerification : null),
    ...(stepAnalysis ? { stepAnalysis } : {}),
    ...(contract ? { contract } : {}),
    observed: observed.length > 0 ? observed : normalizedEvidence.map((e) => e.text),
    expected: expected.length > 0 ? expected : [],
  };
}
