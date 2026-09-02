/**
 * ─────────────────────────────────────────────────────────────────
 * TIXAR 6-LAYER EDUCATIONAL INTELLIGENCE PIPELINE & RAG ROUTER
 * ─────────────────────────────────────────────────────────────────
 * Architecture:
 * Layer 1: Question & Student Intent Understanding (classifyEducationalIntent)
 * Layer 2: Deterministic Reasoning Engines (Math, Physics, Bio, Language)
 * Layer 3: Curriculum Knowledge Retrieval (Structured BM25 RAG with Metadata)
 * Layer 4: Educational Readiness & Competency Engine
 * Layer 5: Guarded LLM Generation with Uncertainty Enforcement
 * Layer 6: Answer Verification Orchestrator (VerificationOrchestrator)
 * ─────────────────────────────────────────────────────────────────
 */

import { routeMathQuery } from "./mathRouter.js";
import { localSearchEngine } from "./LocalSearchEngine.js";
import { verifyGeneratedAnswer } from "./verificationOrchestrator.js";

/**
 * Classifies the student's educational intent before touching the LLM or RAG.
 *
 * @param {string} prompt
 * @returns {{ type: 'solve'|'practice'|'mistake_analysis'|'readiness_check'|'concept_learning'|'general', domain?: string, confidence: number, mathResult?: object }}
 */
export function classifyEducationalIntent(prompt) {
  const q = String(prompt || "").trim().toLowerCase();

  // 1. Deterministic Math Engine
  const mathCheck = routeMathQuery(prompt);
  if (mathCheck?.isMath) {
    return {
      type: "solve",
      domain: "mathematics",
      confidence: 1.0,
      deterministic: true,
      mathResult: mathCheck,
    };
  }

  // 2. Practice / Assessment requests
  if (/quiz me|test me|give me (a )?question|practice question|test my knowledge/i.test(q)) {
    return {
      type: "practice",
      confidence: 0.90,
    };
  }

  // 3. Explanation of Mistakes
  if (/why (am i|was i|is this) wrong|explain my mistake|where did i go wrong|why was my answer incorrect/i.test(q)) {
    return {
      type: "mistake_analysis",
      confidence: 0.95,
    };
  }

  // 4. Readiness & Preparedness Checks
  if (/am i ready|readiness|how prepared|can i pass|exam ready|am i prepared/i.test(q)) {
    return {
      type: "readiness_check",
      confidence: 0.95,
    };
  }

  // 5. Conceptual Learning
  if (/^(what|why|how|explain|define|describe|compare|differentiate|list|summary of|formula for)\b/i.test(q)) {
    return {
      type: "concept_learning",
      confidence: 0.85,
    };
  }

  return {
    type: "general",
    confidence: 0.60,
  };
}

/**
 * Retrieves structured local offline RAG context for a user question.
 *
 * Returns detailed metadata (subject, strand, sub-strand, specific learning outcome)
 * to preserve curriculum alignment.
 *
 * @param {string} query
 * @returns {Promise<{ context: string, sources: Array<object>, confidence: number }>}
 */
export async function getLocalRAGContext(query) {
  try {
    const results = localSearchEngine.search(query);

    if (!results || results.length === 0) {
      return {
        context: "",
        sources: [],
        confidence: 0,
      };
    }

    const selectedResults = results.slice(0, 3);

    const context = selectedResults
      .map((item, index) => {
        const title = item.title || item.topic || "Curriculum Lesson";
        const subject = item.subject || "General Science";
        const strand = item.strand || item.category || "Core Strand";
        const learningOutcome = item.learningOutcome || item.outcome || "General Knowledge";
        const text = item.explanation || item.summary || item.content || "";
        const formula = item.formula ? `\nFormula: ${item.formula}` : "";

        return `SOURCE ${index + 1}
Subject: ${subject}
Topic: ${title}
Strand: ${strand}
Learning Outcome: ${learningOutcome}

${text}${formula}`.trim();
      })
      .join("\n\n");

    const retrievalConfidence = calculateRetrievalConfidence(selectedResults);

    return {
      context,
      sources: selectedResults.map((item) => ({
        id: item.id || item.title,
        subject: item.subject,
        topic: item.topic || item.title,
        strand: item.strand,
        learningOutcome: item.learningOutcome,
      })),
      confidence: retrievalConfidence,
    };
  } catch (err) {
    console.warn("[Local RAG] Retrieval failed:", err);
    return {
      context: "",
      sources: [],
      confidence: 0,
    };
  }
}

function calculateRetrievalConfidence(results) {
  if (!results.length) return 0;
  const topScore = results[0]?.score || 0.8;
  return Math.min(1.0, Math.max(0.4, topScore / 10));
}

/**
 * Constructs an Uncertainty-Enforced Educational System Prompt with structured RAG Context.
 *
 * @param {object|string} params Or raw string for backward compatibility
 * @returns {string} Structured system prompt
 */
export function buildEducationalSystemPrompt(params = {}) {
  const ragContext = typeof params === "string" ? params : params.ragContext || "";
  const studentContext = typeof params === "object" ? params.studentContext : {};
  const retrievalConfidence = typeof params === "object" ? params.retrievalConfidence || 0 : 0;

  let prompt = `You are Socrates, Tixar's warm, precise offline AI tutor.

STRICT EDUCATIONAL GUARDIANS:
1. Truth First: Never invent facts or guess answers when information is missing.
2. Step-by-Step Logic: Explain mathematical and scientific steps clearly.
3. Uncertainty Enforcement: If retrieval confidence is low (${retrievalConfidence.toFixed(2)}), explicitly state: "I cannot verify this with 100% certainty from your offline curriculum materials."
4. Concise & Engaging: Use simple, clear metaphors tailored to a high-school student.`;

  if (studentContext?.weakTopics && studentContext.weakTopics.length > 0) {
    prompt += `\n\nSTUDENT WEAKNESS ALERT:
The student currently needs support in: ${studentContext.weakTopics.join(", ")}. Provide extra clarity if this question touches those areas.`;
  }

  if (ragContext) {
    prompt += `\n\nVERIFIED CURRICULUM CONTEXT:
${ragContext}

Only summarize and explain using the verified context above. Do not speculate beyond this curriculum text.`;
  }

  return prompt;
}

/** Backward-compatible export */
export function buildGuardedSystemPrompt(ragContext = "") {
  return buildEducationalSystemPrompt(ragContext);
}

/** Backward-compatible export for classifyQuestionIntent */
export function classifyQuestionIntent(prompt) {
  const intent = classifyEducationalIntent(prompt);
  let type = "general";
  if (intent.type === "solve") type = "math";
  else if (intent.type === "concept_learning" || intent.type === "practice") type = "curriculum_rag";
  return {
    type,
    confidence: intent.confidence,
    mathResult: intent.mathResult,
    educationalIntent: intent,
  };
}

/**
 * Process a user query through the 6-Layer Educational Intelligence Pipeline.
 *
 * @param {string} prompt User prompt
 * @param {Object} engine Local LLM engine instance
 * @param {Function} askLLMFn Callback function to query local LLM / Ollama
 * @param {Object} [studentContext] Student state / weakness map
 * @returns {Promise<object>} Complete response object with source, answer, verification, and metadata
 */
export async function processEducationalQuery(prompt, engine, askLLMFn, studentContext = {}) {
  // ── LAYER 1: UNDERSTAND STUDENT INTENTION ──────────────────────────────────
  const intent = classifyEducationalIntent(prompt);

  // ── LAYER 2: DETERMINISTIC ENGINE (Math & Science Solver) ─────────────────
  if (intent.type === "solve" && intent.mathResult?.answer) {
    return {
      source: "deterministic_engine",
      answer: intent.mathResult.answer,
      confidence: 1.0,
      verified: true,
      ragUsed: false,
    };
  }

  // ── LAYER 3: CURRICULUM KNOWLEDGE RETRIEVAL ────────────────────────────────
  // Only retrieve RAG context when the query is learning-focused
  const shouldRetrieve = ["concept_learning", "mistake_analysis", "practice"].includes(intent.type);
  let rag = { context: "", sources: [], confidence: 0 };

  if (shouldRetrieve) {
    rag = await getLocalRAGContext(prompt);
  }

  // ── LAYER 4: READINESS & PREPAREDNESS CHECK ────────────────────────────────
  if (intent.type === "readiness_check") {
    const weakTopics = studentContext.weakTopics || [];
    const readinessScore = studentContext.readinessScore || 70;
    const isReady = readinessScore >= 75 && weakTopics.length === 0;

    const readinessReport = isReady
      ? `🎉 **You are Exam Ready!**\n\nYour overall readiness score is **${readinessScore}%** with no critical knowledge gaps. Keep up the strong practice!`
      : `⚠️ **Targeted Revision Recommended**\n\nYour current readiness score is **${readinessScore}%**.\n\nKey areas to review before your exam:\n${weakTopics.length > 0 ? weakTopics.map((t) => `• ${t}`).join("\n") : "• General practice questions"}`;

    return {
      source: "readiness_engine",
      answer: readinessReport,
      confidence: 0.95,
      verified: true,
      ragUsed: false,
    };
  }

  // ── LAYER 5: GUARDED LLM GENERATION ───────────────────────────────────────
  const systemPrompt = buildEducationalSystemPrompt({
    ragContext: rag.context,
    intent,
    studentContext,
    retrievalConfidence: rag.confidence,
  });

  const llmAnswer = await askLLMFn(engine, prompt, undefined, systemPrompt);

  // ── LAYER 6: ANSWER VERIFICATION (VerificationOrchestrator) ───────────────
  const verification = verifyGeneratedAnswer(prompt, llmAnswer);

  return {
    source: rag.context ? "curriculum_rag" : "guarded_llm",
    answer: llmAnswer,
    verified: verification.verified,
    confidence: verification.confidence || rag.confidence,
    confidenceTier: verification.confidenceTier,
    verificationDetails: verification,
    ragUsed: Boolean(rag.context),
    curriculumSources: rag.sources,
  };
}
