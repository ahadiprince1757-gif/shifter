/**
 * ============================================================================
 * TIXAR EVIDENCE-GATED INTELLIGENT LEARNING AI ENGINE
 * ============================================================================
 *
 * Core Philosophy:
 * Deterministic systems decide what is TRUE. AI decides HOW TO TEACH IT.
 * The AI is an adaptive reasoning and communication layer sitting above
 * verified curriculum evidence, not an independent source of truth.
 *
 * Pipeline Architecture:
 * 1. Educational Query Router (Math Engine → Truth Brain → Curriculum RAG → Tutor AI)
 * 2. Evidence Gate (Relevance scoring & insufficiency refusal)
 * 3. Student Learning Context & Error History
 * 4. Structured Teaching Protocol Prompting
 * 5. Adaptive Hardware Model Selection
 * 6. Post-Generation Response Validation
 * ============================================================================
 */

import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { routeMathQuery } from "../utils/mathRouter";
import { getLocalRAGContext, buildGuardedSystemPrompt } from "../utils/aiRAGRouter";
import { verifyGeneratedAnswer } from "../utils/verificationOrchestrator";

export { buildGuardedSystemPrompt };

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

// Engine State Machine
let engineState = {
  status: "idle", // "idle" | "checking_support" | "downloading" | "initializing" | "ready" | "failed"
  engine: null,
  model: null,
  error: null,
  initPromise: null,
};

/**
 * Returns current engine state status
 */
export function getAIEngineStatus() {
  return {
    status: engineState.status,
    model: engineState.model,
    ready: engineState.status === "ready",
    error: engineState.error,
  };
}

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
 * Select optimal model based on hardware capacity and task complexity
 */
export function getOptimalModel({ task = "general", memoryGB = null } = {}) {
  const device = getDeviceCapabilities();
  if (!device.webGPU) return null;

  const deviceMemory = memoryGB || device.memory;

  if (task === "simple") {
    return AI_MODELS.FAST.id;
  }

  if (task === "reasoning" && deviceMemory >= 8) {
    return AI_MODELS.DEFAULT.id;
  }

  if (deviceMemory >= 4) {
    return AI_MODELS.BALANCED.id;
  }

  return AI_MODELS.LIGHT.id;
}

/**
 * Checks whether WebGPU is supported
 */
export function isWebGPUSupported() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

/**
 * Initialize WebLLM engine with state updates and promise deduplication
 */
export async function initializeAIEngine(onProgress, modelOverride = null) {
  if (!isWebGPUSupported()) {
    engineState.status = "failed";
    engineState.error = "WebGPU not supported";
    throw new Error("This device does not support WebGPU.");
  }

  const modelName = modelOverride || getOptimalModel() || FAST_MODEL;

  if (engineState.engine && engineState.model === modelName && engineState.status === "ready") {
    return engineState.engine;
  }

  if (engineState.initPromise && engineState.model === modelName) {
    return engineState.initPromise;
  }

  engineState.status = "downloading";
  engineState.model = modelName;
  engineState.error = null;

  engineState.initPromise = (async () => {
    try {
      const engine = await CreateMLCEngine(modelName, {
        initProgressCallback: (report) => {
          if (report?.text?.includes("Fetching") || report?.text?.includes("Loading")) {
            engineState.status = "downloading";
          } else if (report?.text?.includes("Compiling") || report?.text?.includes("Init")) {
            engineState.status = "initializing";
          }

          if (onProgress) {
            onProgress({ ...report, model: modelName, engineStatus: engineState.status });
          }
        },
      });

      engineState.engine = engine;
      engineState.status = "ready";
      return engine;
    } catch (err) {
      engineState.engine = null;
      engineState.status = "failed";
      engineState.error = err.message || "Engine initialization failed";
      engineState.initPromise = null;
      throw err;
    }
  })();

  return engineState.initPromise;
}

/**
 * Classifies query intent and routes to optimal engine layer
 */
export function routeEducationalQuery(prompt = "") {
  const text = String(prompt || "").trim();

  if (!text) {
    return { route: "INVALID", confidence: 1.0 };
  }

  // Layer 1 — Deterministic Mathematics
  const mathResult = routeMathQuery(text);
  if (mathResult?.isMath && mathResult?.answer) {
    return {
      route: "MATH_ENGINE",
      confidence: 1.0,
      result: mathResult,
    };
  }

  // Layer 2 — Subject Truth Verification
  const verification = verifyGeneratedAnswer(text, "", null);
  if (verification && verification.verificationStatus === "VERIFIED" && (verification.confidence ?? 0) >= 0.85) {
    return {
      route: "VERIFICATION_ENGINE",
      confidence: verification.confidence || 0.9,
      result: verification,
    };
  }

  // Layer 3 — Knowledge & Curriculum Retrieval
  if (isKnowledgeQuestion(text)) {
    return {
      route: "CURRICULUM_RAG",
      confidence: 0.8,
    };
  }

  // Layer 4 — Conversational Tutoring
  return {
    route: "TUTOR_AI",
    confidence: 0.6,
  };
}

function isKnowledgeQuestion(text) {
  return /^(what|why|how|define|explain|describe|list|compare|differentiate|state|identify|give an example)/i.test(
    text.trim()
  );
}

/**
 * Verified RAG Context Retrieval with Evidence Gate Scoring
 */
export async function getVerifiedRAGContext(query) {
  try {
    const ragResult = await getLocalRAGContext(query);
    const confidence = ragResult.confidence || 0;
    const context = ragResult.context || "";
    const evidenceFound = confidence >= 0.45 && context.length >= 40;

    return {
      context,
      confidence,
      evidenceFound,
      sources: ragResult.sources ? ragResult.sources.length : 0,
    };
  } catch (error) {
    console.warn("[Tixar RAG] Verified retrieval failed:", error);
    return {
      context: "",
      confidence: 0,
      evidenceFound: false,
      sources: 0,
    };
  }
}

/**
 * Structured Teaching Protocol Prompt Construction
 */
export function buildTixarTeachingPrompt({
  ragContext = "",
  evidenceConfidence = 0,
  studentLevel = "high school",
  studentContext = {},
}) {
  let prompt = `You are Tixar, an educational reasoning and teaching system.
Your purpose is not merely to provide answers. Your purpose is to help the student understand WHY.

STUDENT LEVEL: ${studentLevel}

TRUTH PROTOCOL:
1. Never present uncertain information as fact.
2. If verified curriculum evidence is provided, use that evidence as the primary source of truth.
3. Do not introduce important factual claims that contradict the provided evidence.
4. If the evidence is insufficient, explicitly state: "I do not have enough verified curriculum evidence to answer this with confidence."
5. Never invent formulas, definitions, historical events, scientific laws, or curriculum facts.
6. Separate VERIFIED FACT, REASONING, and EXAMPLES.

TEACHING PROTOCOL:
1. Start with the direct answer.
2. Explain the core principle.
3. Break difficult ideas into small logical steps.
4. Use an analogy only if it improves understanding.
5. Do not overwhelm the student.
6. Prefer understanding over memorization.
7. If the student is wrong, explain the misconception rather than simply repeating the correct answer.

EVIDENCE CONFIDENCE: ${Math.round(evidenceConfidence * 100)}%
VERIFIED CURRICULUM MATERIAL:
${ragContext || "NO VERIFIED CURRICULUM MATERIAL AVAILABLE"}

RESPONSE FORMAT:
Answer:
[Direct response]

Why:
[Core principle]

Step-by-step:
1.
2.
3.

Key idea to remember:
[One memorable principle]`;

  if (studentContext.repeatedMisconception) {
    prompt += `\n\nNOTE: The student has repeatedly struggled with this concept. Use a different teaching approach or analogy.`;
  }

  return prompt;
}

/**
 * Post-Generative Response Validation ("AI does not grade its own homework")
 */
export function validateAIResponse({ question, answer, subject = null }) {
  const verification = verifyGeneratedAnswer(question, answer, subject);
  const safe = verification.answerStatus === "CORRECT" || verification.answerStatus === "VERIFIED";

  return {
    safe,
    verification,
  };
}

/**
 * Main Evidence-Gated Tixar AI Pipeline Entry Point
 */
export async function askTixarAI({
  engine = engineState.engine,
  prompt,
  onToken = null,
  abortSignal = null,
  studentContext = {},
  customSystemPrompt = null,
} = {}) {
  const text = String(prompt || "").trim();
  if (!text) {
    throw new Error("Prompt cannot be empty");
  }

  // 1. INTELLIGENCE ROUTER
  const route = routeEducationalQuery(text);

  // 2. DETERMINISTIC ANSWERS (MATH & SUBJECT VERIFICATION)
  if (route.route === "MATH_ENGINE") {
    const answer = String(route.result.answer);
    if (onToken) onToken(answer);
    return {
      answer,
      source: "DETERMINISTIC_MATH",
      confidence: 1.0,
      ragUsed: false,
    };
  }

  if (route.route === "VERIFICATION_ENGINE") {
    const answer = route.result.canonicalAnswer || route.result.explanation || "Verified topic concept.";
    if (onToken) onToken(answer);
    return {
      answer,
      source: "VERIFICATION_ENGINE",
      confidence: route.confidence,
      ragUsed: false,
    };
  }

  // 3. CURRICULUM RETRIEVAL & EVIDENCE GATE
  const rag = await getVerifiedRAGContext(text);

  if (route.route === "CURRICULUM_RAG" && !rag.evidenceFound) {
    const answer = "I could not find enough verified curriculum material to answer this with confidence.";
    if (onToken) onToken(answer);
    return {
      answer,
      source: "INSUFFICIENT_EVIDENCE",
      confidence: 0,
      ragUsed: false,
    };
  }

  // 4. AI TEACHING GENERATION
  const activeEngine = engine || engineState.engine;
  if (!activeEngine) {
    throw new Error("AI engine not initialized");
  }

  const systemPrompt =
    customSystemPrompt ||
    buildTixarTeachingPrompt({
      ragContext: rag.context,
      evidenceConfidence: rag.confidence,
      studentLevel: studentContext.level || "high school",
      studentContext,
    });

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: text },
  ];

  const completion = await activeEngine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0.15,
    max_tokens: 500,
  });

  let fullResponse = "";
  for await (const chunk of completion) {
    if (abortSignal?.aborted) break;
    const delta = chunk.choices?.[0]?.delta?.content || "";
    if (!delta) continue;
    fullResponse += delta;
    if (onToken) onToken(fullResponse);
  }

  return {
    answer: fullResponse,
    source: rag.evidenceFound ? "CURRICULUM_GROUNDED_AI" : "GENERAL_TUTOR_AI",
    confidence: rag.evidenceFound ? rag.confidence : 0.5,
    ragUsed: rag.evidenceFound,
  };
}

/**
 * Backward compatibility wrapper for askLocalAI
 */
export async function askLocalAI(
  engineOrOptions,
  promptArg = null,
  onTokenArg = null,
  customSystemPromptArg = null,
  studentContextArg = {},
  abortSignalArg = null
) {
  if (
    typeof engineOrOptions === "object" &&
    engineOrOptions !== null &&
    ("prompt" in engineOrOptions || "engine" in engineOrOptions)
  ) {
    const result = await askTixarAI(engineOrOptions);
    return result;
  }

  const result = await askTixarAI({
    engine: engineOrOptions || engineState.engine,
    prompt: promptArg,
    onToken: onTokenArg,
    customSystemPrompt: customSystemPromptArg,
    studentContext: studentContextArg || {},
    abortSignal: abortSignalArg,
  });

  return result.answer;
}

/**
 * Diagnostic Misconception Detective Engine
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
  let question, wrongAnswer, correctAnswer, misconceptionType, topicContext, recurrenceLevel, previousMistakes, onToken, abortSignal;

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
    previousMistakes = questionOrOptions.previousMistakes || [];
    onToken = questionOrOptions.onToken;
    abortSignal = questionOrOptions.abortSignal || null;
  } else {
    question = questionOrOptions;
    wrongAnswer = wrongAnswerArg;
    correctAnswer = correctAnswerArg;
    misconceptionType = null;
    topicContext = typeof misconceptionTypeOrContext === "string" ? misconceptionTypeOrContext : topicContextArg;
    recurrenceLevel = "SINGLE_SLIP";
    previousMistakes = [];
    onToken = typeof topicContextArg === "function" ? topicContextArg : onTokenArg;
    abortSignal = abortSignalArg;
  }

  const activeEngine = engineState.engine;
  if (!activeEngine) {
    if (onToken) onToken(null);
    return null;
  }

  const systemPrompt = `You are Tixar's diagnostic teaching system.
Your job is NOT to merely tell a student they are wrong.
You act as a misconception detective analyzing underlying conceptual patterns.

Then:
1. Identify what the student likely believes.
2. Explain why that belief produces the error.
3. Teach the correct principle.
4. Give one simple corrective example.
5. Keep the explanation concise and encouraging.`;

  const historyText = previousMistakes.length > 0
    ? `ERROR HISTORY:\nStudent has repeatedly made these errors: ${previousMistakes.join(", ")}.\n`
    : "";

  const recurrenceInstruction =
    recurrenceLevel === "CROSS_TOPIC_RECURRENCE"
      ? `This mistake has occurred repeatedly across multiple topics. Use a fundamentally different explanation or analogy.`
      : `This may be an isolated mistake. First determine whether it appears to be a conceptual misunderstanding or a simple calculation slip.`;

  const userPrompt = `QUESTION:
${question}

STUDENT ANSWER:
${wrongAnswer}

VERIFIED ANSWER:
${correctAnswer}

KNOWN MISCONCEPTION:
${misconceptionType || "Unknown"}

${historyText}CURRICULUM CONTEXT:
${topicContext || "No additional context available."}

${recurrenceInstruction}

Respond in 4 structured, clear paragraphs.`;

  try {
    const completion = await activeEngine.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream: true,
      temperature: 0.15,
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
