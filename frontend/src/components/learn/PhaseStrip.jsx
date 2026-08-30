

const MASTERY_STEPS = [
  { key: "DIAGNOSE", label: "Diagnose", short: "Diag" },
  { key: "TEACH", label: "Teach", short: "Teach" },
  { key: "RETRIEVE", label: "Retrieve", short: "Quiz" },
  { key: "IDENTIFY", label: "Identify", short: "Map" },
  { key: "REPAIR", label: "Repair", short: "Fix" },
  { key: "SPACE", label: "Space", short: "Space" },
  { key: "RETEST", label: "Retest", short: "Retest" },
  { key: "TRANSFER", label: "Transfer", short: "Transfer" },
  { key: "DONE", label: "Summary", short: "Done" },
];

function PhaseStrip({ sessionState, stateIndex, isStateDone, isStateCurrent }) {
  // If fallback legacy phase number is passed (e.g., phase = 0, 1, 2)
  if (typeof sessionState === "number") {
    const legacySteps = [
      { title: "Study Notes", shortLabel: "Notes", idx: 0 },
      { title: "Practice Quiz", shortLabel: "Quiz", idx: 1 },
      { title: "Mastered", shortLabel: "Mastered", idx: 2 },
    ];
    return (
      <div className="phase-strip legacy-strip">
        {legacySteps.map(({ shortLabel, idx }) => {
          const isCompleted = sessionState > idx;
          const isCurr = sessionState === idx;
          return (
            <div
              key={idx}
              className={`ph ${isCompleted ? "active" : ""} ${isCurr ? "current" : ""}`}
            >
              <span className="ph-num">{isCompleted ? "✓" : idx + 1}</span>
              <span className="phase-strip-label">{shortLabel}</span>
            </div>
          );
        })}
      </div>
    );
  }

  const activeIdx = stateIndex !== undefined ? stateIndex : 0;

  return (
    <div className="phase-strip-container">
      <div className="phase-strip-9state">
        {MASTERY_STEPS.map((step, idx) => {
          const done = isStateDone ? isStateDone(step.key) : idx < activeIdx;
          const current = isStateCurrent ? isStateCurrent(step.key) : idx === activeIdx;

          return (
            <div
              key={step.key}
              className={`ph-step-9 ${done ? "ph-done" : ""} ${current ? "ph-current" : ""}`}
              title={step.label}
            >
              <span className="ph-step-dot">
                {done ? "✓" : idx + 1}
              </span>
              <span className="ph-step-label">{step.short}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhaseStrip;
