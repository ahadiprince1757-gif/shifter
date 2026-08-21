function PhaseStrip({ phase, setPhase, canJumpTo }) {
  const steps = [
    { title: "Study Notes", shortLabel: "Notes", idx: 0 },
    { title: "Practice Quiz", shortLabel: "Quiz", idx: 1 },
    { title: "Mastered", shortLabel: "Mastered", idx: 2 },
  ];

  return (
    <div className="phase-strip" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
      {steps.map(({ title, shortLabel, idx }) => {
        const isCompleted = phase > idx;
        const isCurrent = phase === idx;
        const allowed = canJumpTo ? canJumpTo(idx) : true;

        return (
          <button
            key={idx}
            type="button"
            className={`ph ${isCompleted ? "active" : ""} ${isCurrent ? "current" : ""} ${allowed ? "" : "disabled"}`}
            onClick={() => {
              if (!setPhase || !allowed) return;
              setPhase(idx);
            }}
            disabled={!allowed}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              cursor: allowed && setPhase ? "pointer" : "default",
              opacity: allowed ? 1 : 0.5,
              border: isCurrent ? "1px solid var(--v)" : "1px solid var(--bd)",
              background: isCurrent ? "rgba(77, 166, 255, 0.12)" : isCompleted ? "var(--bg2)" : "transparent",
              color: isCurrent ? "var(--v)" : isCompleted ? "var(--t)" : "var(--t3)",
              fontWeight: isCurrent ? 700 : 500,
              padding: "0.45rem 0.75rem",
              borderRadius: "12px",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              fontSize: "0.72rem",
              fontWeight: 800,
              background: isCompleted ? "var(--gr)" : isCurrent ? "var(--v)" : "var(--bd)",
              color: "#ffffff",
            }}>
              {isCompleted ? "✓" : idx + 1}
            </span>
            <span className="phase-strip-label">{shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

export default PhaseStrip;
