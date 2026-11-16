/**
 * Tixar Hybrid Engine Bridge
 * Connects React UI to the Python FastAPI Intelligence Engine when available,
 * with instantaneous, zero-latency fallback to local JavaScript diagnostics when offline.
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

  // 1. Attempt online Python Reasoning Engine first if online
  if (navigator.onLine) {
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
        return {
          ...pythonResult,
          engineSource: "python",
        };
      }
    } catch {
      // Fall through to local deterministic JavaScript engine on timeout / network error
    }
  }

  // 2. Local JavaScript Diagnostic Engine Fallback (Instant, Offline)
  const localDiagnosis = diagnoseStudentSubmission({
    answer: studentAnswer,
    work: userWork,
    question,
    questionText,
    expectedAnswer,
  });

  return {
    ...localDiagnosis,
    engineSource: "javascript-local",
  };
}
