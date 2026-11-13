import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    const msg = error?.message || "";
    if (
      msg.includes("dynamically imported module") ||
      msg.includes("Failed to fetch") ||
      msg.includes("error loading dynamically imported module")
    ) {
      const lastReload = window.sessionStorage.getItem("eb_chunk_reload");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        window.sessionStorage.setItem("eb_chunk_reload", String(now));
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      const isChunkError =
        this.state.error?.message?.includes("dynamically imported module") ||
        this.state.error?.message?.includes("Failed to fetch");

      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#0b0a12",
          color: "#f1effa",
          fontFamily: "Inter, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: isChunkError ? "#4da6ff" : "#ff6b6b" }}>
            {isChunkError ? "App Update Available" : "Something went wrong"}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", maxWidth: "500px", marginBottom: "1.5rem" }}>
            {isChunkError
              ? "A newer version of Tixar has been deployed. Please reload to load the latest lessons and notes."
              : (this.state.error?.message || "An unexpected error occurred.")}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #4da6ff, #287ce0)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
