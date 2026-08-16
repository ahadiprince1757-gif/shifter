import { useState, useEffect, useRef } from "react";
import {
  initializeAIEngine,
  askLocalAI,
  isWebGPUSupported,
  getOptimalModel,
  FAST_MODEL,
  LIGHT_MODEL,
  LOW_RAM_MODEL,
  DEFAULT_MODEL,
} from "../services/aiEngine";

const STARTER_PROMPTS = [
  { text: "Explain photosynthesis simply" },
  { text: "Help me solve a quadratic equation" },
  { text: "Summarize the causes of World War I" },
  { text: "What is Ohm's Law?" },
];

const BotAvatarIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7v1a2 2 0 01-2 2h-1v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1H5a2 2 0 01-2-2v-1a7 7 0 017-7h1V5.73A2.001 2.001 0 0112 2zm-3 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

const WarnIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
  </svg>
);

const ModelIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.9s linear infinite" }}>
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

export default function AITutor() {
  const [engine, setEngine] = useState(null);
  const [statusText, setStatusText] = useState("Not Loaded");
  const [progressRatio, setProgressRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(getOptimalModel());
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [webGpuSupported] = useState(() => isWebGPUSupported());
  const [messages, setMessages] = useState([]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleStartEngine = async () => {
    setIsLoading(true);
    setStatusText("Initializing...");
    setProgressRatio(0);
    try {
      const loadedEngine = await initializeAIEngine((report) => {
        setStatusText(report.text || "Loading model...");
        if (report.progress !== undefined) {
          setProgressRatio(Math.round(report.progress * 100));
        }
      }, selectedModel);
      setEngine(loadedEngine);
      setStatusText("Ready");
      setProgressRatio(100);
    } catch (err) {
      console.error("WebLLM Initialization Error:", err);
      setStatusText("Failed — check browser WebGPU support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!engine || !inputPrompt.trim() || isGenerating) return;

    const userText = inputPrompt.trim();
    setInputPrompt("");
    inputRef.current?.focus();

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setIsGenerating(true);
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    try {
      await askLocalAI(engine, userText, (currentText) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", text: currentText };
          return updated;
        });
      });
    } catch (err) {
      console.error("AI Generation Error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          text: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStarterClick = (text) => {
    setInputPrompt(text);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ai-minimalist-wrapper">
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--t)", lineHeight: 1.2 }}>
            AI Tutor
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--t3)", marginTop: "0.2rem" }}>
            Runs 100% on-device · Private · Free
          </p>
        </div>

        {/* Status pill */}
        <span className={`ai-status-pill ${engine ? "ai-status-pill--ready" : "ai-status-pill--idle"}`}>
          <span className={`ai-status-dot ${isLoading ? "ai-status-dot--pulse" : ""}`} />
          {isLoading ? `Loading ${progressRatio}%` : engine ? "AI Ready" : "Offline AI"}
        </span>
      </div>

      {/* WebGPU warning */}
      {!webGpuSupported && (
        <div style={{
          marginBottom: "1rem",
          padding: "0.85rem 1rem",
          background: "rgba(239, 68, 68, 0.08)",
          border: "1px solid rgba(239, 68, 68, 0.25)",
          borderRadius: "12px",
          color: "var(--rd)",
          fontSize: "0.85rem",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <WarnIcon /> WebGPU is not available. Use Chrome, Edge, or Safari 18+ to run on-device AI.
          </span>
        </div>
      )}

      {/* Main chat card */}
      <div className="ai-minimalist-card">

        {/* Model loader bar — shown only when model not loaded */}
        {!engine && webGpuSupported && (
          <div style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid var(--bd)",
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}>
            <button
              onClick={() => setShowModelPicker((o) => !o)}
              style={{
                fontSize: "0.8rem",
                color: "var(--t3)",
                background: "none",
                border: "1px solid var(--bd)",
                borderRadius: "8px",
                padding: "0.35rem 0.7rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <ModelIcon /> {
                selectedModel === FAST_MODEL ? "SmolLM2 135M (~60MB)" :
                selectedModel === LIGHT_MODEL ? "SmolLM2 360M (~200MB)" :
                selectedModel === LOW_RAM_MODEL ? "Qwen 2.5 0.5B (~350MB)" :
                "Llama 3.2 1B (~700MB)"
              }
            </button>

            {showModelPicker && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "var(--sur)",
                border: "1px solid var(--bd)",
                borderRadius: "12px",
                padding: "0.75rem",
                zIndex: 10,
                boxShadow: "var(--sh)",
                marginTop: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}>
                {[
                  { value: FAST_MODEL, label: "SmolLM2 135M", sub: "~60MB — Near Instant (Recommended)" },
                  { value: LIGHT_MODEL, label: "SmolLM2 360M", sub: "~200MB — Fast & Balanced" },
                  { value: LOW_RAM_MODEL, label: "Qwen 2.5 0.5B", sub: "~350MB — Medium Quality" },
                  { value: DEFAULT_MODEL, label: "Llama 3.2 1B", sub: "~700MB — High Accuracy" },
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => { setSelectedModel(m.value); setShowModelPicker(false); }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "8px",
                      border: `1px solid ${selectedModel === m.value ? "var(--bd2)" : "transparent"}`,
                      background: selectedModel === m.value ? "rgba(117,82,243,0.07)" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "0.1rem",
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--t)" }}>{m.label}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--t3)" }}>{m.sub}</span>
                  </button>
                ))}
              </div>
            )}

            {isLoading ? (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--t3)", marginBottom: "0.3rem" }}>
                  <span>{statusText}</span>
                  <span>{progressRatio}%</span>
                </div>
                <div style={{
                  width: "100%", height: "5px", background: "rgba(117,82,243,0.12)", borderRadius: "3px", overflow: "hidden"
                }}>
                  <div style={{
                    width: `${progressRatio}%`, height: "100%",
                    background: "var(--g2)", transition: "width 0.3s ease", borderRadius: "3px"
                  }} />
                </div>
              </div>
            ) : (
              <button
                onClick={handleStartEngine}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "0.55rem 1rem",
                  borderRadius: "10px",
                  border: "none",
                  background: "var(--g2)",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  boxShadow: "0 3px 10px rgba(117, 82, 243, 0.28)",
                  transition: "opacity 0.2s",
                }}
              >
                Load AI Model
              </button>
            )}
          </div>
        )}

        {/* Chat messages area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
        }}>
          {messages.length === 0 && (
            <div style={{
              margin: "auto",
              textAlign: "center",
              padding: "2rem 1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <div style={{
                width: "52px",
                height: "52px",
                background: "rgba(117, 82, 243, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--v)",
                marginBottom: "0.25rem",
              }}>
                <BotAvatarIcon />
              </div>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--t)" }}>
                {engine ? "Ask me anything" : "Load the AI to start"}
              </h2>
              <p style={{ fontSize: "0.83rem", color: "var(--t3)", maxWidth: "280px", lineHeight: 1.5 }}>
                {engine
                  ? "Science, maths, history — fully on-device and private."
                  : "Click 'Load AI Model' above to download and run locally."}
              </p>

              {engine && (
                <div className="ai-starter-grid" style={{ maxWidth: "480px" }}>
                  {STARTER_PROMPTS.map((sp) => (
                    <button
                      key={sp.text}
                      className="ai-starter-pill"
                      onClick={() => handleStarterClick(sp.text)}
                    >
                      {sp.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "assistant" && (
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(117, 82, 243, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--v)",
                  flexShrink: 0,
                  marginRight: "0.5rem",
                  marginTop: "0.1rem",
                }}>
                  <BotAvatarIcon />
                </div>
              )}
              <div className={`ai-msg-bubble ${msg.role === "user" ? "ai-msg-bubble--user" : "ai-msg-bubble--assistant"}`}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {msg.text || (msg.role === "assistant" && isGenerating ? (
                  <span style={{ opacity: 0.5, fontStyle: "italic" }}>Thinking…</span>
                ) : "")}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSendMessage}
          style={{
            padding: "0.85rem 1rem",
            borderTop: "1px solid var(--bd)",
            background: "var(--sur)",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <textarea
              ref={inputRef}
              rows={1}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={engine ? "Ask anything… (Enter to send)" : "Load the AI model first"}
              disabled={!engine || isGenerating}
              style={{
                width: "100%",
                padding: "0.85rem 3.5rem 0.85rem 1.1rem",
                borderRadius: "16px",
                border: "1px solid var(--bd)",
                background: engine ? "var(--bg)" : "var(--bg2)",
                color: "var(--t)",
                fontSize: "0.925rem",
                outline: "none",
                resize: "none",
                lineHeight: 1.4,
                fontFamily: "inherit",
                transition: "border-color 0.2s",
                opacity: engine ? 1 : 0.6,
                minHeight: "48px",
                maxHeight: "120px",
                overflowY: "auto",
              }}
            />
            <button
              type="submit"
              disabled={isGenerating || !inputPrompt.trim() || !engine}
              aria-label="Send"
              style={{
                position: "absolute",
                right: "8px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "none",
                background: inputPrompt.trim() && engine && !isGenerating
                  ? "var(--g2)"
                  : "rgba(117, 82, 243, 0.12)",
                color: inputPrompt.trim() && engine && !isGenerating ? "#fff" : "var(--t3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isGenerating || !inputPrompt.trim() || !engine ? "not-allowed" : "pointer",
                boxShadow: inputPrompt.trim() && engine && !isGenerating
                  ? "0 2px 8px rgba(117, 82, 243, 0.3)"
                  : "none",
                transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: inputPrompt.trim() && !isGenerating ? "scale(1)" : "scale(0.9)",
                flexShrink: 0,
              }}
            >
              {isGenerating ? <SpinnerIcon /> : <SendIcon />}
            </button>
          </div>
          <p style={{ fontSize: "0.72rem", color: "var(--t3)", textAlign: "center", marginTop: "0.5rem" }}>
            Downloads once to browser cache · Future loads are instant offline
          </p>
        </form>
      </div>
    </div>
  );
}
