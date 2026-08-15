import { CreateMLCEngine } from "@mlc-ai/web-llm";

// Default model standard for 1B quantized (~700MB)
export const DEFAULT_MODEL = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
// Low-RAM model for devices with limited memory (~350MB)
export const LOW_RAM_MODEL = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";

let engineInstance = null;

/**
 * Determines the optimal model based on available device RAM safeguard.
 */
export function getOptimalModel() {
  if (typeof navigator !== "undefined" && navigator.deviceMemory) {
    if (navigator.deviceMemory < 4) {
      return LOW_RAM_MODEL;
    }
  }
  return DEFAULT_MODEL;
}

/**
 * Initializes the WebLLM engine with GPU acceleration and IndexedDB caching.
 * @param {Function} onProgress Callback function to receive download & init status reports
 * @param {string} [modelOverride] Optional model name override
 */
export async function initializeAIEngine(onProgress, modelOverride) {
  if (engineInstance) return engineInstance;

  const modelName = modelOverride || getOptimalModel();

  engineInstance = await CreateMLCEngine(modelName, {
    initProgressCallback: (report) => {
      if (onProgress) {
        onProgress(report);
      }
    },
  });

  return engineInstance;
}

/**
 * Queries the local offline AI model with real-time word-by-word streaming.
 * @param {Object} engine The active MLC engine instance
 * @param {string} prompt User prompt text
 * @param {Function} onToken Callback triggered on each streamed token chunk
 * @param {string} [customSystemPrompt] Optional system prompt
 */
export async function askLocalAI(
  engine,
  prompt,
  onToken,
  customSystemPrompt = "You are an offline high school tutor. Provide concise, clear explanations."
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
