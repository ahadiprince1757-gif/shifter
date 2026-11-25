import React from "react";

const STEPS = [
  { idx: 0, label: "Notes", number: "01" },
  { idx: 1, label: "Quiz", number: "02" },
  { idx: 2, label: "Mastered", number: "03" },
];

/**
 * PhaseStrip
 *
 * Implements Tixar Global Layout Rules:
 * - Quiet, understated stepper navigation without rounded cartoon cards or neon bubble pills.
 * - Structure through typography, tabular numbers (01, 02, 03), and subtle 1px dividers.
 * - Clear active states using text weight and underline/contrast rather than loud gradient badges.
 */
function PhaseStrip({ phase = 0, setPhase, canJumpTo }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "100%",
        borderBottom: "1px solid var(--border-subtle, #e5e5e5)",
        marginBottom: "var(--space-5)",
        boxSizing: "border-box",
      }}
      aria-label="Learning phase navigation"
    >
      {STEPS.map(({ idx, label, number }) => {
        const isDone = phase > idx;
        const isCurrent = phase === idx;
        const allowed = canJumpTo ? canJumpTo(idx) : true;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => {
              if (setPhase && allowed) setPhase(idx);
            }}
            disabled={!allowed}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 14px",
              border: "none",
              borderBottom: isCurrent ? "2px solid var(--text-primary)" : "2px solid transparent",
              background: "transparent",
              cursor: allowed ? "pointer" : "default",
              opacity: allowed ? 1 : 0.45,
              transition: "all 0.15s ease",
              outline: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "12px",
                fontWeight: 600,
                color: isCurrent
                  ? "var(--text-primary)"
                  : isDone
                  ? "var(--state-success, #15803d)"
                  : "var(--text-muted)",
              }}
            >
              {isDone ? "✓" : number}
            </span>
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "14px",
                fontWeight: isCurrent ? 600 : 450,
                color: isCurrent
                  ? "var(--text-primary)"
                  : isDone
                  ? "var(--state-success, #15803d)"
                  : "var(--text-secondary)",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default PhaseStrip;
