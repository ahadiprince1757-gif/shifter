import React from "react";

const STEPS = [
  { idx: 0, label: "Notes", number: "01" },
  { idx: 1, label: "Quiz", number: "02" },
  { idx: 2, label: "Mastered", number: "03" },
];

/**
 * PhaseStrip
 *
 * Implements Tixar Global Layout Rules & Color Semantics:
 * - Active: solid Tixar blue (#287ce0) underline and bold text weight (color + structural signal).
 * - Completed: verified green (#15803d) checkmark.
 * - Inactive: clean muted slate.
 * - No floating cards or pill bubbles.
 */
function PhaseStrip({ phase = 0, setPhase, canJumpTo }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "100%",
        borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
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
              borderBottom: isCurrent ? "2px solid var(--tixar-blue-core, #287ce0)" : "2px solid transparent",
              background: isCurrent ? "var(--surface-hover, #f0f7ff)" : "transparent",
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
                fontWeight: isCurrent ? 700 : 600,
                color: isCurrent
                  ? "var(--tixar-blue-core, #287ce0)"
                  : isDone
                  ? "var(--state-success, #15803d)"
                  : "var(--text-muted, #94a3b8)",
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
                  ? "var(--tixar-blue-core, #287ce0)"
                  : isDone
                  ? "var(--state-success, #15803d)"
                  : "var(--text-secondary, #475569)",
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
