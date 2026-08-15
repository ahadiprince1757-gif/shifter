import { useState, useEffect, useRef } from "react";
import {
  initializeAIEngine,
  askLocalAI,
  isWebGPUSupported,
  getOptimalModel,
  DEFAULT_MODEL,
  LOW_RAM_MODEL,
} from "../services/aiEngine";

export default function AITutor() {
  const [engine, setEngine] = useState(null);
  const [statusText, setStatusText] = useState("Not Loaded");
  const [progressRatio, setProgressRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(getOptimalModel());
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [webGpuSupported, setWebGpuSupported] = useState(true);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setWebGpuSupported(isWebGPUSupported());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleStartEngine = async () => {
    setIsLoading(true);
    setStatusText("Initializing WebGPU engine...");
    setProgressRatio(0);

    try {
      const loadedEngine = await initializeAIEngine((report) => {
        setStatusText(report.text || "Loading model parameters...");
        if (report.progress !== undefined) {
          setProgressRatio(Math.round(report.progress * 100));
        }
      }, selectedModel);

      setEngine(loadedEngine);
      setStatusText("Ready");
      setProgressRatio(100);
    } catch (err) {
      console.error("WebLLM Initialization Error:", err);
      setStatusText("Failed to initialize WebLLM. Ensure browser & device support WebGPU.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!engine || !inputPrompt.trim() || isGenerating) return;

    const userText = inputPrompt.trim();
    setInputPrompt("");

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
          text: "An error occurred while generating the answer. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1rem" }}>
      {/* Header card */}
      <div
        style={{
          background: "var(--sur)",
          border: "1px solid var(--bd)",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "var(--sh)",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--t)", marginBottom: "0.25rem" }}>
              Offline AI Tutor
            </h1>
            <p style={{ color: "var(--t2)", fontSize: "0.9rem" }}>
              Runs 100% on-device via WebGPU. $0 API cost & fully private.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600",
                background: engine ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                color: engine ? "var(--gr)" : "var(--go)",
                border: `1px solid ${engine ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: engine ? "var(--gr)" : "var(--go)",
                }}
              />
              {engine ? "Model Ready" : "Model Not Loaded"}
            </span>
          </div>
        </div>

        {!webGpuSupported && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.85rem 1rem",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              color: "var(--rd)",
              fontSize: "0.875rem",
            }}
          >
            ⚠️ WebGPU is not enabled in your current browser. Please enable WebGPU or use Chrome, Edge, or Safari 18+ to run on-device AI models.
          </div>
        )}

        {/* Engine Setup Card */}
        {!engine && webGpuSupported && (
          <div
            style={{
              marginTop: "1.25rem",
              padding: "1.25rem",
              background: "var(--bg2)",
              borderRadius: "12px",
              border: "1px solid var(--bd)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--t2)", marginBottom: "0.4rem" }}>
                Select Open-Weight Model:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "8px",
                  border: "1px solid var(--bd)",
                  background: "var(--sur)",
                  color: "var(--t)",
                  fontSize: "0.9rem",
                }}
              >
                <option value={DEFAULT_MODEL}>Llama 3.2 1B Instruct (~700MB - High Accuracy)</option>
                <option value={LOW_RAM_MODEL}>Qwen 2.5 0.5B Instruct (~350MB - Ultra Light / Low RAM)</option>
              </select>
            </div>

            {isLoading && (
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--t2)", marginBottom: "0.3rem" }}>
                  <span>Status: {statusText}</span>
                  <span>{progressRatio}%</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "rgba(117, 82, 243, 0.15)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progressRatio}%`,
                      height: "100%",
                      background: "var(--g2)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleStartEngine}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "0.75rem 1.25rem",
                borderRadius: "10px",
                border: "none",
                background: "var(--g2)",
                color: "#fff",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                boxShadow: "0 4px 12px rgba(117, 82, 243, 0.3)",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
            >
              {isLoading ? "Downloading & Loading Model..." : "Load Local AI Model into Browser Cache"}
            </button>

            <p style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--t3)", textAlign: "center" }}>
              Downloads once into IndexedDB browser cache. Future launches load instantly offline!
            </p>
          </div>
        )}
      </div>

      {/* Chat Area */}
      {engine && (
        <div
          style={{
            background: "var(--sur)",
            border: "1px solid var(--bd)",
            borderRadius: "16px",
            boxShadow: "var(--sh)",
            display: "flex",
            flexDirection: "column",
            minHeight: "450px",
            overflow: "hidden",
          }}
        >
          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: "1.5rem",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxHeight: "500px",
            }}
          >
            {messages.length === 0 && (
              <div style={{ margin: "auto", textAlign: "center", color: "var(--t3)", padding: "2rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤖</div>
                <h3 style={{ fontSize: "1.1rem", color: "var(--t)", marginBottom: "0.25rem" }}>
                  Your Offline AI Tutor is Ready
                </h3>
                <p style={{ fontSize: "0.875rem" }}>
                  Ask any question about science, math, history, or homework concepts!
                </p>
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
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "0.85rem 1.1rem",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "var(--v)" : "var(--bg2)",
                    color: msg.role === "user" ? "#fff" : "var(--t)",
                    fontSize: "0.925rem",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    boxShadow: msg.role === "user" ? "0 2px 8px rgba(117, 82, 243, 0.2)" : "none",
                  }}
                >
                  {msg.text || (msg.role === "assistant" && isGenerating ? "Thinking..." : "")}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "1rem",
              borderTop: "1px solid var(--bd)",
              background: "var(--sur)",
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask a question (e.g. How does photosynthesis work?)"
              disabled={isGenerating}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--bd)",
                background: "var(--bg)",
                color: "var(--t)",
                fontSize: "0.925rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isGenerating || !inputPrompt.trim()}
              style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "12px",
                border: "none",
                background: "var(--g2)",
                color: "#fff",
                fontWeight: "600",
                cursor: isGenerating || !inputPrompt.trim() ? "not-allowed" : "pointer",
                opacity: isGenerating || !inputPrompt.trim() ? 0.6 : 1,
                transition: "opacity 0.15s ease",
              }}
            >
              {isGenerating ? "Streaming..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
