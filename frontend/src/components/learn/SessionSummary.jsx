import { useState, useEffect } from "react";
import { spacedRepo } from "../../repository/spacedRepo";

function formatDate(isoString) {
  if (!isoString) return "soon";
  try {
    const d = new Date(isoString);
    const diff = Math.round((d - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "today";
    if (diff === 1) return "tomorrow";
    if (diff < 7) return `in ${diff} days`;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "soon";
  }
}

function formatConceptLabel(tag) {
  return (tag || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function ScoreRing({ score }) {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 80 ? "var(--gr, #22c55e)" : score >= 50 ? "#f59e0b" : "var(--rd, #ef4444)";

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="score-ring-svg">
      <circle cx="48" cy="48" r={radius} fill="none" stroke="var(--bd)" strokeWidth="8" />
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text
        x="48"
        y="53"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill={color}
        fontFamily="inherit"
      >
        {score}%
      </text>
    </svg>
  );
}

export default function SessionSummary({
  topic,
  subject,
  chapter,
  sessionScore,
  weaknessMap = {},
  repairedConcepts = [],
  nextTopic,
  goToNext,
  goBack,
  userId,
}) {
  const [nextReview, setNextReview] = useState(null);
  const weaknessEntries = Object.values(weaknessMap || {});

  useEffect(() => {
    if (!topic) return;
    spacedRepo
      .getTopicReviewInfo(topic, userId)
      .then((info) => {
        if (info?.next_review_at) setNextReview(info.next_review_at);
      })
      .catch(() => {});
  }, [topic, userId]);

  return (
    <div className="session-summary">
      {/* Header */}
      <div className="ss-header">
        <div className="ss-badge-row">
          <span className="lbadge lb-done">Session Complete</span>
        </div>
        <h2 className="ss-topic-title">{topic}</h2>
        <p className="ss-subtitle">
          {subject?.label || subject?.id}
          {chapter?.label ? ` · ${chapter.label}` : ""}
        </p>
      </div>

      {/* Score ring */}
      <div className="ss-score-row">
        <ScoreRing score={sessionScore ?? 0} />
        <div className="ss-score-meta">
          <div className="ss-score-label">Knowledge Survival Score</div>
          <div className="ss-score-hint">
            {(sessionScore ?? 0) >= 80
              ? "High Retention — core concepts survived retrieval testing."
              : (sessionScore ?? 0) >= 50
              ? "Partial Retention — review recommended to prevent memory decay."
              : "Low Retention — targeted spaced review queued."}
          </div>
        </div>
      </div>

      {/* Cognitive Knowledge-Gap Diagnostic Breakdown */}
      {weaknessEntries.length > 0 && (
        <div className="ss-section" style={{ marginTop: "1.2rem", padding: "1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", border: "1px solid var(--bd)" }}>
          <div className="ss-section-title" style={{ color: "#8ECBF0", marginBottom: "0.8rem" }}>
            Cognitive Knowledge-Gap Diagnosis
          </div>
          <div className="ss-concept-list" style={{ flexDirection: "column", gap: "0.8rem" }}>
            {weaknessEntries.map((w, idx) => (
              <div key={idx} style={{ padding: "0.6rem 0.8rem", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
                <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>
                  {w.prerequisiteSkill || "Prerequisite Concept"}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--t2)", marginTop: "0.2rem" }}>
                  <strong>Root Cause:</strong> {w.rootCause}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#74B8E8", marginTop: "0.2rem" }}>
                  <strong>Target Action:</strong> {w.remediationAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Repaired concepts list if user did variant retries during quiz */}
      {repairedConcepts && repairedConcepts.length > 0 && (
        <div className="ss-section">
          <div className="ss-section-title">Concepts Tested & Repaired In Quiz</div>
          <div className="ss-concept-list">
            {repairedConcepts.map((tag) => (
              <div key={tag} className="ss-concept-chip ss-concept-chip--repaired">
                <span className="ss-chip-icon">✓</span>
                {formatConceptLabel(tag)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next review date */}
      <div className="ss-review-banner">
        <div className="ss-review-text">
          <div className="ss-review-label">Spaced Memory Review Scheduled</div>
          <div className="ss-review-date">Next retention check {formatDate(nextReview)}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="ss-actions">
        {nextTopic ? (
          <>
            <button className="btn-p" onClick={goToNext}>
              Continue to Next Topic
            </button>
            <button className="btn-g" onClick={goBack}>
              Return to Topics
            </button>
          </>
        ) : (
          <button className="btn-p" onClick={goBack}>
            Return to Topics List
          </button>
        )}
      </div>
    </div>
  );
}
