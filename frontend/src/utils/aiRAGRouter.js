/**
 * ─────────────────────────────────────────────────────────────────
 * 4-Layer Educational AI Router & Local RAG System for Shifter
 * ─────────────────────────────────────────────────────────────────
 * Architecture:
 * 1. Intent Detection / Question Router
 * 2. Deterministic Math Engine (mathRouter.js)
 * 3. Local Curriculum RAG Layer (BM25 LocalSearchEngine)
 * 4. System Prompt Guard & Uncertainty Enforcer
 * ─────────────────────────────────────────────────────────────────
 */

import { routeMathQuery } from "./mathRouter";
import { localSearchEngine } from "./LocalSearchEngine";

/**
 * Classifies user prompt intent before touching the LLM.
 * @param {string} prompt 
 * @returns {{ type: 'math'|'curriculum_rag'|'general', confidence: number }}
 */
export function classifyQuestionIntent(prompt) {
  const mathCheck = routeMathQuery(prompt);
  if (mathCheck.isMath) {
    return { type: "math", confidence: 1.0, mathResult: mathCheck };
  }

  // Keywords indicating curriculum RAG retrieval
  const RAG_KEYWORDS = /^(what is|define|explain|how does|why is|describe|list|causes of|summary of|what are|formula for)\s+/i;
  if (RAG_KEYWORDS.test(prompt.trim())) {
    return { type: "curriculum_rag", confidence: 0.85 };
  }

  return { type: "general", confidence: 0.7 };
}

/**
 * Retrieves local offline RAG context for a user question.
 * @param {string} query 
 * @returns {Promise<string>} Clean formatted context string
 */
export async function getLocalRAGContext(query) {
  try {
    const results = localSearchEngine.search(query);
    if (!results || results.length === 0) return "";

    const contextSnippets = results.slice(0, 2).map((item, idx) => {
      const title = item.title || item.topic || "Lesson";
      const subj = item.subject ? `[${item.subject}] ` : "";
      const text = item.explanation || item.summary || item.content || "";
      const formula = item.formula ? `\nFormula: ${item.formula}` : "";
      return `CONTEXT ${idx + 1}: ${subj}${title}\n${text}${formula}`;
    });

    return contextSnippets.join("\n\n");
  } catch (err) {
    console.warn("[Local RAG] Error retrieving context:", err);
    return "";
  }
}

/**
 * Constructs an Uncertainty-Enforced System Prompt with RAG Context.
 * @param {string} ragContext Retrieved curriculum context string
 * @returns {string} Structured system prompt
 */
export function buildGuardedSystemPrompt(ragContext = "") {
  let prompt = `You are a warm, precise offline educational tutor named Socrates on Shifter.

STRICT RULES:
1. Never invent facts or guess answers when information is missing.
2. If mathematical calculations are provided or required, state the exact calculation.
3. If you cannot verify an answer with certainty, clearly state "I cannot verify this with certainty based on your offline materials."
4. Prefer short, accurate, clear explanations over speculative ones.
5. Explain concepts at a high school student's level using clear metaphors.`;

  if (ragContext) {
    prompt += `\n\nUSE THIS VERIFIED CURRICULUM CONTEXT TO ANSWER:
${ragContext}

Only summarize and explain the verified context above. Do not add speculative outside facts.`;
  }

  return prompt;
}

/**
 * Process a user query through the 4-Layer Educational Architecture.
 * @param {string} prompt User prompt
 * @param {Object} engine Local LLM engine instance
 * @param {Function} askLLMFn Callback function to query local LLM / Ollama
 * @returns {Promise<{ source: string, answer: string, ragUsed: boolean }>}
 */
export async function processEducationalQuery(prompt, engine, askLLMFn) {
  // Layer 1 & 2: Intent Detection + Deterministic Math Engine
  const intent = classifyQuestionIntent(prompt);
  if (intent.type === "math" && intent.mathResult?.answer) {
    return {
      source: "deterministic_math",
      answer: intent.mathResult.answer,
      ragUsed: false,
    };
  }

  // Layer 3: Local Curriculum RAG Layer
  let ragContext = "";
  if (intent.type === "curriculum_rag" || prompt.length > 8) {
    ragContext = await getLocalRAGContext(prompt);
  }

  // Layer 4: Guarded Prompt Construction
  const guardedPrompt = buildGuardedSystemPrompt(ragContext);

  // Execute with LLM using low temperature (0.1) for high factual accuracy
  const llmAnswer = await askLLMFn(engine, prompt, undefined, guardedPrompt);

  return {
    source: ragContext ? "curriculum_rag_llm" : "guarded_llm",
    answer: llmAnswer,
    ragUsed: Boolean(ragContext),
  };
}
