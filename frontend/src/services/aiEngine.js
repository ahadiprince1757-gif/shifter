import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { routeMathQuery } from "../utils/mathRouter";
import { getLocalRAGContext, buildGuardedSystemPrompt } from "../utils/aiRAGRouter";

// Ultra-fast instant model (~60MB download, 2-3 sec load)
export const FAST_MODEL = "SmolLM2-135M-Instruct-q0f16-MLC";
// Fast balanced model (~200MB download)
export const LIGHT_MODEL = "SmolLM2-360M-Instruct-q4f16_1-MLC";
// Medium low-RAM model (~350MB download)
export const LOW_RAM_MODEL = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
// Standard high accuracy model (~700MB download)
export const DEFAULT_MODEL = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

let engineInstance = null;
let engineInitPromise = null;
let loadedModelName = null;

/**
 * Determines the optimal default model.
 * Defaults to FAST_MODEL (~60MB) for near-instant initialization.
 */
export function getOptimalModel() {
  return FAST_MODEL;
}

/**
 * Initializes the WebLLM engine with GPU acceleration and IndexedDB caching.
 * Uses promise deduplication to prevent duplicate downloads and hanging loads.
 * @param {Function} onProgress Callback function to receive download & init status reports
 * @param {string} [modelOverride] Optional model name override
 */
export async function initializeAIEngine(onProgress, modelOverride) {
  const modelName = modelOverride || getOptimalModel();

  if (engineInstance && loadedModelName === modelName) {
    return engineInstance;
  }

  if (engineInitPromise && loadedModelName === modelName) {
    return engineInitPromise;
  }

  loadedModelName = modelName;
  engineInstance = null;

  engineInitPromise = (async () => {
    try {
      const engine = await CreateMLCEngine(modelName, {
        initProgressCallback: (report) => {
          if (onProgress) {
            onProgress(report);
          }
        },
      });
      engineInstance = engine;
      return engine;
    } catch (err) {
      engineInitPromise = null;
      loadedModelName = null;
      throw err;
    }
  })();

  return engineInitPromise;
}

/**
 * Queries the local offline AI model with real-time word-by-word streaming.
 * Automatically routes math to a deterministic solver & injects local RAG curriculum context.
 * @param {Object} engine The active MLC engine instance
 * @param {string} prompt User prompt text
 * @param {Function} onToken Callback triggered on each streamed token chunk
 * @param {string} [customSystemPrompt] Optional system prompt
 * @param {AbortSignal} [abortSignal] Optional signal to stop generation early
 */
export async function askLocalAI(
  engine,
  prompt,
  onToken,
  customSystemPrompt = null,
  abortSignal = null
) {
  // 1. Intercept Math Queries for 100% Deterministic Precision (No Hallucination)
  const mathResult = routeMathQuery(prompt);
  if (mathResult.isMath && mathResult.answer) {
    if (onToken) {
      onToken(mathResult.answer);
    }
    return mathResult.answer;
  }

  if (!engine) throw new Error("AI Engine not initialized");

  // 2. Retrieve Local RAG Context from BM25 Local Index & Build Guarded Prompt
  let systemPromptToUse = customSystemPrompt;
  if (!systemPromptToUse) {
    const ragContext = await getLocalRAGContext(prompt);
    systemPromptToUse = buildGuardedSystemPrompt(ragContext);
  }

  // 3. Query Local LLM with Low Temperature (0.1) for Fact Precision
  const messages = [
    { role: "system", content: systemPromptToUse },
    { role: "user", content: prompt },
  ];

  const completion = await engine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0.1, // Low temperature suppresses creative hallucination
  });

  let fullResponse = "";
  for await (const chunk of completion) {
    if (abortSignal?.aborted) break;
    const delta = chunk.choices[0]?.delta?.content || "";
    fullResponse += delta;
    if (onToken) {
      onToken(fullResponse);
    }
  }

  return fullResponse;
}


/**
 * Checks whether WebGPU is supported by the current browser environment.
 */
export function isWebGPUSupported() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

/**
 * Inline misconception explanation — fires ONLY when a student answered with
 * high confidence but got it wrong (confirmed misconception state).
 *
 * Streams word-by-word into the UI. No AI branding is ever shown to the user —
 * the output appears as plain explanation text below the feedback card.
 *
 * Silently returns (calls onToken with null) if the engine is not ready,
 * so the quiz flow is never blocked by model load state.
 *
 * @param {string}   question       - The question text
 * @param {string}   wrongAnswer    - What the student answered
 * @param {string}   correctAnswer  - The correct answer
 * @param {string}   [topicContext] - Optional topic context from RAG
 * @param {Function} onToken        - Called with streamed text chunks (null = done/skipped)
 * @param {AbortSignal} [abortSignal]
 */
export async function explainMisconception(
  question,
  wrongAnswer,
  correctAnswer,
  topicContext = "",
  onToken,
  abortSignal = null
) {
  // Silently skip if engine not ready — never block the quiz flow
  if (!engineInstance) {
    if (onToken) onToken(null);
    return;
  }

  const systemPrompt = topicContext
    ? `You are a study guide. Context: ${topicContext}`
    : "You are a study guide.";

  const userPrompt = `The student answered "${wrongAnswer}" to this question: "${question}". The correct answer is "${correctAnswer}". In 2 sentences maximum: explain why the student's thinking was wrong and the one core principle they must understand to correct it. Do not use phrases like "As an AI". Be direct and specific.`;

  try {
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    const completion = await engineInstance.chat.completions.create({
      messages,
      stream: true,
      temperature: 0.1,
      max_tokens: 120, // Enforce the 2-sentence constraint at the token level
    });

    let fullResponse = "";
    for await (const chunk of completion) {
      if (abortSignal?.aborted) break;
      const delta = chunk.choices[0]?.delta?.content || "";
      fullResponse += delta;
      if (onToken) onToken(fullResponse);
    }
  } catch {
    // Silently swallow errors — the existing static explanation is always present
    if (onToken) onToken(null);
  }
}
