import { CreateMLCEngine } from "@mlc-ai/web-llm";

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
  customSystemPrompt = "You are a warm, thoughtful, and humanistic learning companion named Socrates on Shifter. Your goal is to help the student truly grasp concepts through intuitive metaphors, clear reasoning, and encouraging dialogue. Speak like a wise, friendly mentor. Keep explanations clear, engaging, and personal without robotic jargon.",
  abortSignal = null
) {
  if (!engine) throw new Error("AI Engine not initialized");

  const messages = [
    { role: "system", content: customSystemPrompt },
    { role: "user", content: prompt },
  ];

  const completion = await engine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0.3,
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
