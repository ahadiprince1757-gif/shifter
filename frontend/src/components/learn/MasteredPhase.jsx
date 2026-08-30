function MasteredPhase({
  topic,
  nextTopic,
  goBack,
  goToNext,
  failedQuestions,
  weaknessMap = {},
  sessionScore = 100,
}) {
  const hasMistakes = failedQuestions && failedQuestions.length > 0;
  const weaknessEntries = Object.values(weaknessMap || {});

  return (
    <div className="mastered-container">
      {/* Beautiful, Shareable Achievement Card */}
      <div className="m-card">
        {/* Corner Branding */}
        <div className="m-card-header">
          <span className="m-brand">TIXAR</span>
          <span className="m-status">{sessionScore === 100 ? "PERFECT MASTERY" : "COMPLETED"}</span>
        </div>

        {/* Certificate Content */}
        <div className="m-card-body">
          <div className="m-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="m-title">{topic}</h2>
          <p className="m-subtitle">Knowledge Survival Score: {sessionScore}%</p>
        </div>

        {/* Footer detail */}
        <div className="m-card-footer">
          <span>Memory Retention Review Scheduled via SM-2 Spaced Repetition</span>
        </div>
      </div>

      {/* Cognitive Knowledge-Gap Diagnostic Breakdown */}
      {hasMistakes && weaknessEntries.length > 0 && (
        <div className="m-diagnostic-card" style={{ marginTop: "1rem", padding: "1.2rem", background: "var(--card-bg, #1a1a1a)", borderRadius: "8px", border: "1px solid var(--border-color, #333)" }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#888", marginBottom: "0.5rem" }}>
            Cognitive Knowledge-Gap Diagnosis
          </div>
          {weaknessEntries.map((w, idx) => (
            <div key={idx} style={{ marginBottom: idx < weaknessEntries.length - 1 ? "1rem" : 0 }}>
              <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>
                {w.prerequisiteSkill || "Prerequisite Concept"}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#bbb", marginTop: "0.2rem" }}>
                <strong>Root Cause:</strong> {w.rootCause}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#74B8E8", marginTop: "0.2rem" }}>
                <strong>Target Action:</strong> {w.remediationAction}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review details if mistakes occurred */}
      {hasMistakes && (
        <details className="m-review-details" style={{ marginTop: "1rem" }}>
          <summary className="m-review-summary">
            Review {failedQuestions.length} correction{failedQuestions.length > 1 ? "s" : ""}
          </summary>
          <div className="m-review-content">
            {failedQuestions.map((item, index) => (
              <div key={index} className="m-review-item">
                <div className="m-review-q">Question {item.qIdx + 1}: {item.question}</div>
                <div className="m-review-ans">Correct: {item.correctAnswer}</div>
                {item.solution && <div className="m-review-sol">{item.solution}</div>}
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Distraction-free actions below the screenshot zone */}
      <div className="m-actions">
        {nextTopic ? (
          <>
            <button className="btn-p btn-m-continue" onClick={goToNext}>
              Continue to Next Topic
            </button>
            <button className="btn-g btn-m-back" onClick={goBack}>
              Return to Topics
            </button>
          </>
        ) : (
          <button className="btn-p btn-m-continue" onClick={goBack}>
            Return to Topics List
          </button>
        )}
      </div>
    </div>
  );
}

export default MasteredPhase;
