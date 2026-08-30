

const THREE_ACTS = [
  { actIdx: 0, title: "Check & Learn", short: "1. Learn" },
  { actIdx: 1, title: "Active Retrieval", short: "2. Practice" },
  { actIdx: 2, title: "Transfer & Mastery", short: "3. Transfer" },
];

function PhaseStrip({ activeActIndex = 0 }) {
  return (
    <div className="phase-strip-container">
      <div className="phase-strip-3act">
        {THREE_ACTS.map(({ actIdx, title, short }) => {
          const isDone = activeActIndex > actIdx;
          const isCurrent = activeActIndex === actIdx;

          return (
            <div
              key={actIdx}
              className={`ph-act-btn ${isDone ? "act-done" : ""} ${isCurrent ? "act-current" : ""}`}
            >
              <span className="act-dot">{isDone ? "✓" : actIdx + 1}</span>
              <span className="act-label-full">{title}</span>
              <span className="act-label-short">{short}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhaseStrip;
