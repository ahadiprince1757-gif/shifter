/**
 * Tixar Hybrid Engine Bridge
 *
 * Architectural Invariant:
 * 1. Local JavaScript diagnostic engine is the PRIMARY baseline authority.
 * 2. High-confidence deterministic diagnoses are used immediately (zero latency, zero network).
 * 3. Python reasoning engine is called ONLY when local diagnosis is inconclusive / low-confidence
 *    AND the device is online, acting as an enhancement layer, NEVER a replacement authority.
 * 4. Offline mode is 100% autonomous and uninterrupted.
 */

import { diagnoseStudentSubmission } from "../diagnostics/teacherDiagnoser";

const PYTHON_ENGINE_URL =
  import.meta.env.VITE_PYTHON_ENGINE_URL || "http://localhost:8000";

const REQUEST_TIMEOUT_MS = 2000;

export async function diagnoseWithEngineFallback({
  studentAnswer,
  question,
  userWork = "",
  subject = "",
  topic = "",
}) {
  const questionText = question?.q || question?.stem || "";
  const expectedAnswer = question?.ans || "";

  // ── Step 1: Run Local JavaScript Diagnostic Engine First (Primary Authority) ──
  const localDiagnosis = diagnoseStudentSubmission({
    answer: studentAnswer,
    work: userWork,
    question,
    questionText,
    expectedAnswer,
  });

  const isHighConfidence =
    localDiagnosis?.confidence === "high" ||
    localDiagnosis?.evidence?.score >= 0.85;

  const isEstablished =
    localDiagnosis?.status === "correct" ||
    (localDiagnosis?.status === "diagnosed" && isHighConfidence);

  // If local diagnosis is established with high confidence, use it immediately!
  // No network roundtrip, instantaneous feedback, offline-authoritative.
  if (isEstablished || !navigator.onLine) {
    return {
      ...localDiagnosis,
      engineSource: "javascript-local",
    };
  }

  // ── Step 2: Online Enhancement via Python Engine ──
  // Reached only when local diagnosis is inconclusive / low-confidence AND online.
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(`${PYTHON_ENGINE_URL}/api/v1/diagnose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentAnswer,
        questionText,
        expectedAnswer,
        userWork,
        subject,
        topic,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const pythonResult = await response.json();

      // If Python successfully identified a cause or verified repair, enrich the diagnosis
      if (
        pythonResult?.status === "diagnosed" ||
        pythonResult?.cause?.identified === true
      ) {
        return {
          ...localDiagnosis,
          ...pythonResult,
          engineSource: "python-enhanced",
        };
      }
    }
  } catch {
    // Network failure, CORS, or timeout: gracefully retain local diagnostic result
  }

  // ── Step 3: Fallback to local diagnosis ──
  return {
    ...localDiagnosis,
    engineSource: "javascript-local",
  };
}
