

const STEPS = [
  { idx: 0, label: "Study Notes", short: "Notes" },
  { idx: 1, label: "Practice Quiz", short: "Quiz" },
  { idx: 2, label: "Mastery & Review", short: "Mastered" },
];

function PhaseStrip({ phase = 0, setPhase, canJumpTo }) {
  return (
    <div className="phase-strip-container">
      <div className="phase-strip-3act">
        {STEPS.map(({ idx, label, short }) => {
          const isDone = phase > idx;
          const isCurrent = phase === idx;
          const allowed = canJumpTo ? canJumpTo(idx) : true;

          return (
            <button
              key={idx}
              type="button"
              className={`ph-act-btn ${isDone ? "act-done" : ""} ${isCurrent ? "act-current" : ""} ${allowed ? "" : "disabled"}`}
              onClick={() => {
                if (setPhase && allowed) setPhase(idx);
              }}
              disabled={!allowed}
            >
              <span className="act-dot">{isDone ? "✓" : idx + 1}</span>
              <span className="act-label-full">{label}</span>
              <span className="act-label-short">{short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PhaseStrip;
