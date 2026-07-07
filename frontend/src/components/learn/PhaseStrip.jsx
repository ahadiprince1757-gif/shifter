function PhaseStrip({ phase, setPhase, canJumpTo }) {
  const tabs = [
    { label: "① Notes", idx: 0 },
    { label: "② Quiz", idx: 1 },
    { label: "③ Mastered", idx: 2 },
  ];

  return (
    <div className="phase-strip">
      {tabs.map(({ label, idx }) => {
        const allowed = canJumpTo ? canJumpTo(idx) : true;
        return (
          <div
            key={idx}
            className={`ph ${phase >= idx ? "active" : ""} ${phase === idx ? "current" : ""} ${allowed ? "" : "disabled"}`}
            onClick={() => {
              if (!setPhase || !allowed) return;
              setPhase(idx);
            }}
            style={{
              cursor: allowed && setPhase ? "pointer" : "not-allowed",
              opacity: allowed ? 1 : 0.5,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

export default PhaseStrip;
