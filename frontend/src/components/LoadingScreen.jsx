import { useState, useEffect, useRef } from "react";

/**
 * Premium Asymptotic Progress & Checklist Loading Screen
 * * Uses the "Indeterminate Determinate" progress technique combined with a
 * modern glassmorphic dashboard and smooth shifting mesh background.
 */
export default function LoadingScreen({
  fullScreen = true,
  isReady = false,
  onComplete,
  message = "",

}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("sprint"); // "sprint" | "crawl" | "done" | "hidden"

  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const progressRef = useRef(0);
  const hasSnappedRef = useRef(false);

  // Phase 1 & 2: Sprint to ~70% then slow trickle
  useEffect(() => {
    if (phase === "done" || phase === "hidden") return;

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    // Parameters for target threshold
    const sprintDuration = 800; // ms to hit the initial curve peak
    const sprintTarget = 70;    // The magic 70% mark

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;

      if (progressRef.current < sprintTarget) {
        // --- SPRINT PHASE ---
        // Fast cubic ease-out to launch up to 70% rapidly
        const t = Math.min(elapsed / sprintDuration, 1);
        const eased = 1 - Math.pow(1 - t, 3); 
        const next = eased * sprintTarget;
        progressRef.current = next;
        setProgress(next);

        if (t >= 1) {
          setPhase("crawl");
        }
      } else {
        // --- TRICKLE PHASE ---
        // Instead of slowing down to zero, we trickle slowly at a fixed, 
        // small linear step (e.g., ~0.05% per frame) but slow down exponentially 
        // as we push closer to 95% so it NEVER hits 100% early.
        const remaining = 95 - progressRef.current;
        
        // This ensures a steady micro-movement that keeps the user feeling 
        // like it's loading, but stretches out the timeline significantly.
        const trickleIncrement = Math.max(remaining * 0.002, 0.02); 
        
        progressRef.current = Math.min(progressRef.current + trickleIncrement, 98);
        setProgress(progressRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  // Phase 3: Snap to 100% when all states are ready
  useEffect(() => {
    if (isReady && !hasSnappedRef.current) {
      hasSnappedRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      setPhase("done");

      progressRef.current = 100;
      setProgress(100);

      let completeTimer;
      // Trigger fade out and complete event callback
      const timer = setTimeout(() => {
        setPhase("fade");
        completeTimer = setTimeout(() => {
          setPhase("hidden");
          if (onComplete) {
            onComplete();
          }
        }, 400); // Match CSS transition duration
      }, 700);

      return () => {
        clearTimeout(timer);
        if (completeTimer) clearTimeout(completeTimer);
      };
    }
  }, [isReady, onComplete]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`premium-loader-root ${phase === "done" ? "premium-loader--done" : ""}`}
      style={{
        position: fullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: fullScreen ? "100vh" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 9999,
        transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        opacity: (phase === "hidden" || phase === "fade") ? 0 : 1,
      }}
    >
      {/* Minimal Loader UI */}
      <div className="minimal-loader" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "var(--bg, #0b0a12)",
        color: "var(--t, #f1effa)",
        fontFamily: "Inter, sans-serif",
      }}>
        {/* Logo */}
        <img src="/Tixar.jpeg" alt="Tixar" style={{ width: "64px", height: "64px", borderRadius: "12px", marginBottom: "1rem" }} />
        
        {/* Progress Bar */}
        <div className="minimal-loader__track" style={{
          position: "relative",
          width: "min(320px, 80vw)",
          height: "6px",
          background: "var(--bd, rgba(255,255,255,0.1))",
          borderRadius: "99px",
          overflow: "visible",
        }}>
          <div
            className="minimal-loader__fill"
            style={{
              height: "100%",
              background: phase === "done" 
                ? "linear-gradient(90deg, #7552f3, #10b981)" 
                : "linear-gradient(90deg, #7552f3, #3a8ffd)",
              width: `${progress}%`,
              borderRadius: "99px",
              transition: phase === "done" ? "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)" : "width 0.06s linear",
              boxShadow: phase === "done" 
                ? "0 0 15px rgba(16, 185, 129, 0.5)" 
                : "0 0 12px rgba(117, 82, 243, 0.4)",
            }}
          />
          <div
            className="minimal-loader__glow"
            style={{
              position: "absolute",
              top: "50%",
              left: `${Math.min(progress, 98)}%`,
              transform: "translate(-50%, -50%)",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: phase === "done" ? "#10b981" : "#3a8ffd",
              boxShadow: phase === "done"
                ? "0 0 12px rgba(16, 185, 129, 0.8)"
                : "0 0 10px rgba(58, 143, 253, 0.7), 0 0 20px rgba(117, 82, 243, 0.4)",
              transition: phase === "done" ? "left 0.4s cubic-bezier(0.22, 1, 0.36, 1)" : "left 0.06s linear",
              animation: "glowPulse 1.2s ease-in-out infinite",
            }}
          />
        </div>
        
        {/* Percentage */}
        <div style={{ 
          marginTop: "0.5rem", 
          fontSize: "1.2rem", 
          fontWeight: 700, 
          backgroundImage: phase === "done" 
            ? "linear-gradient(135deg, #7552f3, #10b981)"
            : "linear-gradient(135deg, #7552f3, #3a8ffd)", 
          WebkitBackgroundClip: "text", 
          backgroundClip: "text", 
          WebkitTextFillColor: "transparent" 
        }}>
          {Math.round(progress)}%
        </div>
        
        {message && (
          <div style={{ 
            marginTop: "0.5rem", 
            fontSize: "0.85rem", 
            fontWeight: 500, 
            color: "var(--t3, rgba(255,255,255,0.6))",
            letterSpacing: "0.02em"
          }}>
            {message}
          </div>
        )}
        
        <style>{`
          @keyframes glowPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
            50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
          }
        `}</style>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght400;500;600;700;800&family=Space+Grotesk:wght500;700&display=swap');

        .premium-loader-root {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: var(--bg, #0b0a12);
          color: var(--t, #f1effa);
        }
      `}</style>
    </div>
  );
}