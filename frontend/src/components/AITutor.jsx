import { useState, useEffect, useRef, useCallback } from "react";
import {
  initializeAIEngine,
  askLocalAI,
  isWebGPUSupported,
  getOptimalModel,
} from "../services/aiEngine";

import HomeworkScannerModal from "./HomeworkScannerModal";

const STARTER_PROMPTS = [
  { text: "Help me truly understand Ohm's Law" },
  { text: "Explain photosynthesis with a vivid analogy" },
  { text: "Break down quadratic equations intuitively" },
  { text: "Why did World War I start? Give me the human story" },
];

// Icons
const CameraScanIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
const BotAvatarIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.4" />
    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const WarnIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);



const MaximizeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="10" y1="14" x2="3" y2="21" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="3" />
  </svg>
);



export default function AITutor() {
  const [engine, setEngine] = useState(null);
  const [statusText, setStatusText] = useState("Not Loaded");
  const [progressRatio, setProgressRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [webGpuSupported] = useState(() => isWebGPUSupported());

  // User prompt edit state
  const [editingIdx, setEditingIdx] = useState(null);
  const [editPromptText, setEditPromptText] = useState("");

  // AI message edit state
  const [editingAiIdx, setEditingAiIdx] = useState(null);
  const [editAiText, setEditAiText] = useState("");

  // Copy state (tracks which message was just copied)
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Scanner modal state
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleInsertScannedText = (text) => {
    if (!text) return;
    setInputPrompt((prev) => (prev ? `${prev}\n${text}` : text));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmitScannedPrompt = (text) => {
    if (!text) return;
    setInputPrompt(text);
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  // Abort controller ref for stopping generation
  const abortControllerRef = useRef(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Create a new chat session
  const handleNewChat = () => {
    setMessages([]);
    setInputPrompt("");
    setEditingIdx(null);
  };

  const handleStartEngine = useCallback(async () => {
    if (!isWebGPUSupported()) return null;
    setIsLoading(true);
    setStatusText("Initializing AI...");
    setProgressRatio(0);
    try {
      const optimalModel = getOptimalModel();
      const loadedEngine = await initializeAIEngine((report) => {
        setStatusText(report.text || "Loading model...");
        if (report.progress !== undefined) {
          setProgressRatio(Math.round(report.progress * 100));
        }
      }, optimalModel);
      setEngine(loadedEngine);
      setStatusText("Ready");
      setProgressRatio(100);
      return loadedEngine;
    } catch (err) {
      console.error("WebLLM Initialization Error:", err);
      setStatusText("Failed — check browser WebGPU support.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Auto-initialize AI engine on mount (Minimalist, zero button fatigue)
  useEffect(() => {
    let mounted = true;
    if (isWebGPUSupported()) {
      Promise.resolve().then(() => {
        if (mounted) {
          handleStartEngine();
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [handleStartEngine]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim() || isGenerating) return;

    const userText = inputPrompt.trim();
    setInputPrompt("");
    inputRef.current?.focus();

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setIsGenerating(true);
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    const abortCtrl = new AbortController();
    abortControllerRef.current = abortCtrl;

    try {
      let activeEngine = engine;
      if (!activeEngine) {
        setStatusText("Initializing AI...");
        activeEngine = await handleStartEngine();
      }

      if (!activeEngine) {
        throw new Error("AI engine failed to initialize.");
      }

      await askLocalAI(activeEngine, userText, (currentText) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", text: currentText };
          return updated;
        });
      }, undefined, abortCtrl.signal);
    } catch (err) {
      if (!abortCtrl.signal.aborted) {
        console.error("AI Generation Error:", err);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            text: "Something went wrong while generating response. Please verify WebGPU support in your browser.",
          };
          return updated;
        });
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  // Stop ongoing AI generation
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Copy any message text to clipboard
  const handleCopyMessage = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Start editing an AI message inline
  const handleStartAiEdit = (idx, text) => {
    if (isGenerating) return;
    setEditingAiIdx(idx);
    setEditAiText(text);
  };

  // Save edited AI message (no re-generation — user edits the content directly)
  const handleSaveAiEdit = (idx) => {
    const trimmed = editAiText.trim();
    if (!trimmed) return;
    setMessages((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], text: trimmed };
      return updated;
    });
    setEditingAiIdx(null);
    setEditAiText("");
  };

  const handleCancelAiEdit = () => {
    setEditingAiIdx(null);
    setEditAiText("");
  };

  // Prompt Edit Handlers
  const handleStartEdit = (idx, text) => {
    if (isGenerating) return;
    setEditingIdx(idx);
    setEditPromptText(text);
  };

  const handleCancelEdit = () => {
    setEditingIdx(null);
    setEditPromptText("");
  };

  const handleSaveEdit = async (idx) => {
    const updatedText = editPromptText.trim();
    if (!updatedText || isGenerating) return;

    // Truncate messages up to index idx with the new text, removing old AI responses after it
    const updatedMessages = messages.slice(0, idx);
    updatedMessages.push({ role: "user", text: updatedText });

    setEditingIdx(null);
    setEditPromptText("");
    setMessages(updatedMessages);

    if (!engine) return;

    setIsGenerating(true);
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    const abortCtrl = new AbortController();
    abortControllerRef.current = abortCtrl;

    try {
      await askLocalAI(engine, updatedText, (currentText) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", text: currentText };
          return updated;
        });
      }, undefined, abortCtrl.signal);
    } catch (err) {
      if (!abortCtrl.signal.aborted) {
        console.error("AI Generation Error:", err);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            text: "Something went wrong while generating response.",
          };
          return updated;
        });
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
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
    <div className={`ai-minimalist-wrapper ${isFullscreen ? "ai-minimalist-wrapper--fullscreen" : ""}`}>
      {/* Header bar when NOT fullscreen */}
      {!isFullscreen && (
        <div className="ai-outer-header">
          <div>
            <h1 className="ai-editorial-title">
              Ask Quiz
            </h1>
            <p className="ai-outer-subtitle">
              Instant on-device concept & quiz explainer
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className={`ai-status-pill ${engine ? "ai-status-pill--ready" : "ai-status-pill--idle"}`}>
              <span className={`ai-status-dot ${isLoading ? "ai-status-dot--pulse" : ""}`} />
              <span className="ai-status-text">
                {isLoading ? `Preparing ${progressRatio}%` : engine ? "Ask Quiz Ready" : "Offline Ready"}
              </span>
            </span>

            {/* 100% Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(true)}
              title="Expand to 100% Full Screen"
              className="ai-icon-btn"
            >
              <MaximizeIcon />
            </button>
          </div>
        </div>
      )}

      {/* WebGPU Warning */}
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

      {/* Main Container Card */}
      <div className={`ai-minimalist-card ${isFullscreen ? "ai-minimalist-card--fullscreen" : ""}`}>
        
        {/* Card Header Bar */}
        <div className="ai-minimalist-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              title="Clear & Start New Session"
              className="ai-card-btn"
            >
              <PlusIcon /> <span className="ai-btn-text">New Session</span>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen((f) => !f)}
              title={isFullscreen ? "Exit Fullscreen" : "100% Full Screen"}
              className="ai-icon-btn"
            >
              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
            </button>
          </div>
        </div>

        {/* Model Download / Initialization Progress Bar (Automatic, minimalist) */}
        {isLoading && (
          <div style={{
            padding: "0.65rem 1.25rem",
            borderBottom: "1px solid var(--bd)",
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--t3)", marginBottom: "0.3rem" }}>
                <span>{statusText}</span>
                <span>{progressRatio}%</span>
              </div>
              <div style={{
                width: "100%", height: "4px", background: "rgba(117,82,243,0.12)", borderRadius: "2px", overflow: "hidden"
              }}>
                <div style={{
                  width: `${progressRatio}%`, height: "100%",
                  background: "var(--g2)", transition: "width 0.3s ease", borderRadius: "2px"
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Body Layout: Main Chat */}
        <div className="ai-layout-body">
          {/* Main Chat Area */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            background: "var(--sur)",
          }}>
            {/* Chat Messages */}
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
                  <h2 className="ai-empty-title">
                    Ask Quiz
                  </h2>
                  <p className="ai-empty-subtitle">
                    Ask any question about your studies, equations, or concepts. Runs 100% locally in your browser.
                  </p>

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
                </div>
              )}

              {messages.map((msg, idx) => {
                const isEditingThis = editingIdx === idx;

                if (msg.role === "user") {
                  if (isEditingThis) {
                    return (
                      <div key={idx} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className="ai-msg-edit-container">
                          <textarea
                            className="ai-msg-edit-textarea"
                            value={editPromptText}
                            onChange={(e) => setEditPromptText(e.target.value)}
                            placeholder="Edit your prompt..."
                            autoFocus
                          />
                          <div className="ai-msg-edit-actions">
                            <button
                              type="button"
                              className="ai-msg-edit-cancel-btn"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="ai-msg-edit-save-btn"
                              onClick={() => handleSaveEdit(idx)}
                              disabled={!editPromptText.trim()}
                            >
                              Save & Resubmit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={idx} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div className="ai-msg-user-wrapper">
                        <button
                          type="button"
                          className="ai-msg-edit-btn"
                          onClick={() => handleStartEdit(idx, msg.text)}
                          title="Edit prompt"
                          aria-label="Edit prompt"
                        >
                          <PencilIcon />
                        </button>
                        <div className="ai-msg-bubble ai-msg-bubble--user" style={{ whiteSpace: "pre-wrap" }}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Assistant message
                const isEditingAi = editingAiIdx === idx;
                const isCopied = copiedIdx === idx;
                const isLastMsg = idx === messages.length - 1;

                if (isEditingAi) {
                  return (
                    <div key={idx} style={{ display: "flex", justifyContent: "flex-start", gap: "0.5rem" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: "rgba(117,82,243,0.1)", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        color: "var(--v)", flexShrink: 0, marginTop: "0.1rem",
                      }}>
                        <BotAvatarIcon />
                      </div>
                      <div className="ai-msg-edit-container" style={{ flex: 1, maxWidth: "82%" }}>
                        <textarea
                          className="ai-msg-edit-textarea"
                          value={editAiText}
                          onChange={(e) => setEditAiText(e.target.value)}
                          placeholder="Edit AI response..."
                          autoFocus
                          style={{ minHeight: "80px" }}
                        />
                        <div className="ai-msg-edit-actions">
                          <button type="button" className="ai-msg-edit-cancel-btn" onClick={handleCancelAiEdit}>Cancel</button>
                          <button type="button" className="ai-msg-edit-save-btn" onClick={() => handleSaveAiEdit(idx)} disabled={!editAiText.trim()}>Save</button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="ai-msg-assistant-group">
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
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
                      <div className="ai-msg-bubble ai-msg-bubble--assistant" style={{ whiteSpace: "pre-wrap" }}>
                        {msg.text || (isGenerating && isLastMsg ? (
                          <span style={{ opacity: 0.5, fontStyle: "italic" }}>Thinking…</span>
                        ) : "")}
                      </div>
                    </div>

                    {/* Action buttons row below AI bubble */}
                    {msg.text && (
                      <div className="ai-msg-actions">
                        <button
                          type="button"
                          className="ai-msg-action-btn"
                          onClick={() => handleCopyMessage(msg.text, idx)}
                          title={isCopied ? "Copied!" : "Copy message"}
                        >
                          {isCopied ? <CheckIcon /> : <CopyIcon />}
                          <span>{isCopied ? "Copied" : "Copy"}</span>
                        </button>
                        {!isGenerating && (
                          <button
                            type="button"
                            className="ai-msg-action-btn"
                            onClick={() => handleStartAiEdit(idx, msg.text)}
                            title="Edit this response"
                          >
                            <PencilIcon />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
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
                  placeholder={isLoading ? "Initializing AI companion..." : "Ask anything… (Enter to send)"}
                  disabled={isGenerating}
                  style={{
                    width: "100%",
                    padding: "0.85rem 5.6rem 0.85rem 1.1rem",
                    borderRadius: "16px",
                    border: "1px solid var(--bd)",
                    background: "var(--bg)",
                    color: "var(--t)",
                    fontSize: "0.925rem",
                    outline: "none",
                    resize: "none",
                    lineHeight: 1.4,
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                    opacity: isGenerating ? 0.6 : 1,
                    minHeight: "48px",
                    maxHeight: "120px",
                    overflowY: "auto",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  aria-label="Scan homework photo or image"
                  title="Scan homework with camera or upload photo"
                  style={{
                    position: "absolute",
                    right: "48px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(116, 184, 232, 0.15)",
                    color: "#74B8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    flexShrink: 0,
                  }}
                >
                  <CameraScanIcon />
                </button>
                <button
                  type={isGenerating ? "button" : "submit"}
                  onClick={isGenerating ? handleStopGeneration : undefined}
                  disabled={!isGenerating && !inputPrompt.trim()}
                  aria-label={isGenerating ? "Stop generating" : "Send"}
                  title={isGenerating ? "Stop generating" : "Send message"}
                  style={{
                    position: "absolute",
                    right: "8px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "none",
                    background: isGenerating
                      ? "var(--rd, #ef4444)"
                      : inputPrompt.trim()
                      ? "var(--g2)"
                      : "rgba(117, 82, 243, 0.12)",
                    color: isGenerating || inputPrompt.trim() ? "#fff" : "var(--t3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isGenerating || inputPrompt.trim() ? "pointer" : "not-allowed",
                    boxShadow: isGenerating
                      ? "0 2px 10px rgba(239, 68, 68, 0.35)"
                      : inputPrompt.trim()
                      ? "0 2px 8px rgba(117, 82, 243, 0.3)"
                      : "none",
                    transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isGenerating || inputPrompt.trim() ? "scale(1)" : "scale(0.9)",
                    flexShrink: 0,
                  }}
                >
                  {isGenerating ? <StopIcon /> : <SendIcon />}
                </button>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--t3)", textAlign: "center", marginTop: "0.5rem" }}>
                Downloads once to browser cache · Future loads are instant offline
              </p>
            </form>
          </div>
        </div>
      </div>

      <HomeworkScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onInsertText={handleInsertScannedText}
        onSubmitPrompt={handleSubmitScannedPrompt}
      />
    </div>
  );
}
