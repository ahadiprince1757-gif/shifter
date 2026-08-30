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
  repairedConcepts = [],
  nextTopic,
  goToNext,
  goBack,
  userId,
}) {
  const [nextReview, setNextReview] = useState(null);

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
          <div className="ss-score-label">Retrieval Score</div>
          <div className="ss-score-hint">
            {(sessionScore ?? 0) >= 80
              ? "Strong — this concept is consolidating."
              : (sessionScore ?? 0) >= 50
              ? "Partial — keep spacing your reviews."
              : "Needs more work — review is scheduled soon."}
          </div>
        </div>
      </div>

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
          <div className="ss-review-label">Spaced review scheduled</div>
          <div className="ss-review-date">Come back {formatDate(nextReview)}</div>
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
