/**
 * ============================================================================
 * TIXAR INTELLIGENT LEARNING AI ENGINE
 * ============================================================================
 *
 * AI is NOT the source of truth.
 *
 * Architecture:
 * 1. Request Intelligence Router
 * 2. Deterministic Truth Engines
 * 3. Curriculum Retrieval & Quality Check
 * 4. Student Learning Context
 * 5. Evidence-Aware Prompt Construction
 * 6. Adaptive Model Selection
 * 7. Safe Streaming Generation
 * ============================================================================
 */

import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { routeMathQuery } from "../utils/mathRouter";
import { getLocalRAGContext, buildGuardedSystemPrompt } from "../utils/aiRAGRouter";

// Model Registry
export const AI_MODELS = {
  FAST: {
    id: "SmolLM2-135M-Instruct-q0f16-MLC",
    tier: "fast",
    minMemory: 2,
    description: "Ultra-fast instant model (~60MB download, 2-3 sec load)",
  },
  LIGHT: {
    id: "SmolLM2-360M-Instruct-q4f16_1-MLC",
    tier: "light",
    minMemory: 4,
    description: "Fast balanced model (~200MB download)",
  },
  BALANCED: {
    id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
    tier: "balanced",
    minMemory: 4,
    description: "Medium low-RAM model (~350MB download)",
  },
  DEFAULT: {
    id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    tier: "standard",
    minMemory: 8,
    description: "Standard high accuracy model (~700MB download)",
  },
};

export const FAST_MODEL = AI_MODELS.FAST.id;
export const LIGHT_MODEL = AI_MODELS.LIGHT.id;
export const LOW_RAM_MODEL = AI_MODELS.BALANCED.id;
export const DEFAULT_MODEL = AI_MODELS.DEFAULT.id;

let engineInstance = null;
let engineInitPromise = null;
let loadedModelName = null;

/**
 * Detect device hardware capabilities
 */
export function getDeviceCapabilities() {
  if (typeof navigator === "undefined") {
    return { webGPU: false, memory: 2, cores: 2 };
  }

  return {
    webGPU: "gpu" in navigator,
    memory: navigator.deviceMemory || 4,
    cores: navigator.hardwareConcurrency || 4,
  };
}

/**
 * Select optimal model based on hardware capacity
 */
export function getOptimalModel() {
  const device = getDeviceCapabilities();

  if (!device.webGPU) {
    return null;
  }

  if (device.memory >= 8 && device.cores >= 8) {
    return AI_MODELS.DEFAULT.id;
  }

  if (device.memory >= 4) {
    return AI_MODELS.BALANCED.id;
  }

  return AI_MODELS.FAST.id;
}

/**
 * Checks whether WebGPU is supported
 */
export function isWebGPUSupported() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

/**
 * Initialize WebLLM engine with promise deduplication and progress updates
 */
export async function initializeAIEngine(onProgress, modelOverride = null) {
  if (!isWebGPUSupported()) {
    throw new Error("This device does not support WebGPU.");
  }

  const modelName = modelOverride || getOptimalModel() || FAST_MODEL;

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
            onProgress({ ...report, model: modelName });
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
 * Classifies user prompt into learning request types
 */
export function classifyLearningRequest(prompt = "") {
  const text = String(prompt).trim().toLowerCase();

  if (!text) {
    return { type: "empty", confidence: 1.0 };
  }

  if (/\b(hint|help me|don't tell me the answer|clue)\b/.test(text)) {
    return { type: "hint", confidence: 0.95 };
  }

  if (/^(explain|what is|define|describe|how does|why does|teach me)/.test(text)) {
    return { type: "explanation", confidence: 0.90 };
  }

  if (/\b(example|show me how|demonstrate)\b/.test(text)) {
    return { type: "example", confidence: 0.90 };
  }

  if (/\b(revise|review|summary|summarize)\b/.test(text)) {
    return { type: "revision", confidence: 0.85 };
  }

  return { type: "general", confidence: 0.70 };
}

/**
 * Evaluates retrieved RAG curriculum context quality
 */
function evaluateRAGContext(context) {
  if (!context) {
    return { available: false, confidence: 0 };
  }

  const length = context.length;
  if (length < 80) {
    return { available: true, confidence: 0.4 };
  }
  if (length < 250) {
    return { available: true, confidence: 0.7 };
  }
  return { available: true, confidence: 0.9 };
}

/**
 * Constructs an adaptive educational prompt with student learning state
 */
function buildEducationalPrompt({
  ragContext = "",
  requestType = "general",
  studentContext = {},
}) {
  const basePrompt = `You are the educational reasoning layer of Tixar.
Your purpose is to help students understand, not merely give answers.

STRICT RULES:
1. Never invent facts.
2. Treat verified curriculum material as higher priority than general knowledge.
3. If reliable curriculum evidence is unavailable, say so clearly.
4. Do not pretend certainty when uncertain.
5. Adapt your explanation to the student's demonstrated understanding.
6. Explain the principle before giving the conclusion.
7. For mathematical questions, never contradict deterministic calculations.
8. Encourage reasoning rather than answer dependence.`;

  const learningInstructions = {
    hint: `The student requested a hint. Do NOT give the final answer. Give the smallest useful clue that moves them one step forward.`,
    explanation: `Explain clearly using: 1. Core idea, 2. Why it works, 3. Simple example. Avoid unnecessary complexity.`,
    example: `Provide one simple worked example. Explain each step and the reason behind it.`,
    revision: `Create a concise revision-focused explanation prioritizing core concepts, common mistakes, and key relationships.`,
    general: `Answer directly but teach the underlying principle.`,
  };

  let prompt = basePrompt + "\n\n" + (learningInstructions[requestType] || learningInstructions.general);

  if (studentContext.repeatedMisconception) {
    prompt += `\n\nIMPORTANT: This student has repeatedly struggled with this concept. Use a different teaching approach, analogy, or representation.`;
  }

  if (studentContext.masteryLevel === "beginner") {
    prompt += `\n\nThe student is at a beginner level. Avoid assuming prerequisite knowledge.`;
  } else if (studentContext.masteryLevel === "advanced") {
    prompt += `\n\nThe student demonstrates strong foundational understanding. Challenge them to connect this concept to a deeper application.`;
  }

  if (ragContext) {
    prompt += `\n\nVERIFIED CURRICULUM CONTEXT:\n${ragContext}\n\nUse this context as your primary factual evidence. Do not introduce conflicting claims.`;
  }

  return prompt;
}

/**
 * Queries the local offline AI model with adaptive intelligence routing
 */
export async function askLocalAI(
  engineOrOptions,
  promptArg = null,
  onTokenArg = null,
  customSystemPromptArg = null,
  studentContextArg = {},
  abortSignalArg = null
) {
  let engine, prompt, onToken, customSystemPrompt, studentContext, abortSignal;

  if (
    typeof engineOrOptions === "object" &&
    engineOrOptions !== null &&
    ("prompt" in engineOrOptions || "engine" in engineOrOptions)
  ) {
    engine = engineOrOptions.engine || engineInstance;
    prompt = engineOrOptions.prompt;
    onToken = engineOrOptions.onToken || null;
    customSystemPrompt = engineOrOptions.customSystemPrompt || null;
    studentContext = engineOrOptions.studentContext || {};
    abortSignal = engineOrOptions.abortSignal || null;
  } else {
    engine = engineOrOptions || engineInstance;
    prompt = promptArg;
    onToken = onTokenArg;
    customSystemPrompt = customSystemPromptArg;
    studentContext = studentContextArg || {};
    abortSignal = abortSignalArg;
  }

  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) {
    throw new Error("A question or prompt is required.");
  }

  // 1. DETERMINISTIC MATH INTERCEPTION
  const mathResult = routeMathQuery(cleanPrompt);
  if (mathResult?.isMath && mathResult?.answer) {
    const result = String(mathResult.answer);
    if (onToken) {
      onToken(result);
    }
    return {
      source: "deterministic_math",
      answer: result,
      verified: true,
      ragUsed: false,
    };
  }

  // 2. REQUEST UNDERSTANDING
  const request = classifyLearningRequest(cleanPrompt);

  // 3. CURRICULUM RETRIEVAL & QUALITY EVALUATION
  let ragContext = "";
  try {
    ragContext = await getLocalRAGContext(cleanPrompt);
  } catch (error) {
    console.warn("[Tixar AI] RAG retrieval failed:", error);
  }
  const ragQuality = evaluateRAGContext(ragContext);

  // 4. PROMPT CONSTRUCTION
  const systemPrompt =
    customSystemPrompt ||
    (ragQuality.confidence < 0.6 && !ragContext
      ? buildGuardedSystemPrompt(ragContext)
      : buildEducationalPrompt({
          ragContext: ragQuality.confidence >= 0.6 ? ragContext : "",
          requestType: request.type,
          studentContext,
        }));

  const activeEngine = engine || engineInstance;
  if (!activeEngine) {
    throw new Error("Local AI engine is not initialized.");
  }

  // 5. STREAMING GENERATION
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: cleanPrompt },
  ];

  const completion = await activeEngine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0.2,
    max_tokens: 500,
  });

  let fullResponse = "";
  for await (const chunk of completion) {
    if (abortSignal?.aborted) break;
    const delta = chunk?.choices?.[0]?.delta?.content || "";
    if (!delta) continue;
    fullResponse += delta;
    if (onToken) {
      onToken(fullResponse);
    }
  }

  return {
    source: ragQuality.available ? "curriculum_rag_llm" : "local_llm",
    answer: fullResponse,
    verified: ragQuality.confidence >= 0.8,
    ragUsed: ragQuality.available,
    ragConfidence: ragQuality.confidence,
    requestType: request.type,
  };
}

/**
 * Diagnostic Misconception Explanation Engine
 */
export async function explainMisconception(
  questionOrOptions,
  wrongAnswerArg = null,
  correctAnswerArg = null,
  misconceptionTypeOrContext = null,
  topicContextArg = "",
  onTokenArg = null,
  abortSignalArg = null
) {
  let question, wrongAnswer, correctAnswer, misconceptionType, topicContext, recurrenceLevel, onToken, abortSignal;

  if (
    typeof questionOrOptions === "object" &&
    questionOrOptions !== null &&
    "question" in questionOrOptions
  ) {
    question = questionOrOptions.question;
    wrongAnswer = questionOrOptions.wrongAnswer;
    correctAnswer = questionOrOptions.correctAnswer;
    misconceptionType = questionOrOptions.misconceptionType || null;
    topicContext = questionOrOptions.topicContext || "";
    recurrenceLevel = questionOrOptions.recurrenceLevel || "SINGLE_SLIP";
    onToken = questionOrOptions.onToken;
    abortSignal = questionOrOptions.abortSignal || null;
  } else {
    question = questionOrOptions;
    wrongAnswer = wrongAnswerArg;
    correctAnswer = correctAnswerArg;
    misconceptionType = null;
    topicContext = typeof misconceptionTypeOrContext === "string" ? misconceptionTypeOrContext : topicContextArg;
    recurrenceLevel = "SINGLE_SLIP";
    onToken = typeof topicContextArg === "function" ? topicContextArg : onTokenArg;
    abortSignal = abortSignalArg;
  }

  const activeEngine = engineInstance;
  if (!activeEngine) {
    if (onToken) onToken(null);
    return null;
  }

  const systemPrompt = `You are Tixar's diagnostic teaching system.
Your job is NOT to merely tell a student they are wrong.
Identify the likely thinking that produced their answer.

Then:
1. Identify the misconception.
2. Explain why that reasoning fails.
3. Teach the correct principle.
4. Use a simple example.
5. Keep the explanation concise.

Never shame the student.
Never say "you should have known".
Do not mention being an AI.`;

  const recurrenceInstruction =
    recurrenceLevel === "CROSS_TOPIC_RECURRENCE"
      ? `This mistake has occurred repeatedly across multiple topics. Use a fundamentally different explanation or analogy.`
      : `This may be a one-time mistake. First determine whether it appears to be a conceptual misunderstanding or a simple slip.`;

  const userPrompt = `QUESTION:
${question}

STUDENT ANSWER:
${wrongAnswer}

VERIFIED ANSWER:
${correctAnswer}

KNOWN MISCONCEPTION:
${misconceptionType || "Unknown"}

CURRICULUM CONTEXT:
${topicContext || "No additional context available."}

${recurrenceInstruction}

Respond in a maximum of 4 short paragraphs.`;

  try {

    const completion = await activeEngine.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream: true,
      temperature: 0.2,
      max_tokens: 250,
    });

    let response = "";
    for await (const chunk of completion) {
      if (abortSignal?.aborted) break;
      const delta = chunk?.choices?.[0]?.delta?.content || "";
      response += delta;
      if (onToken) onToken(response);
    }
    return response;
  } catch (error) {
    console.warn("[Tixar AI] Misconception explanation failed:", error);
    if (onToken) onToken(null);
    return null;
  }
}
