import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function SessionSummary({
  topic,
  subject,
  chapter,
  repairedConcepts = [],
  failedQuestions = [],
  nextTopic,
  goToNext,
  goBack,
  userId,
}) {
  const navigate = useNavigate();
  const [nextReview, setNextReview] = useState(null);
  const hasFailed = Array.isArray(failedQuestions) && failedQuestions.length > 0;
  const repairedList = Array.from(new Set(repairedConcepts || []));

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
          {subject?.label || subject?.name || subject?.id}
          {chapter?.label ? ` · ${chapter.label}` : ""}
        </p>
      </div>

      {/* Outcome Card */}
      {hasFailed ? (
        <div
          style={{
            marginTop: "1.2rem",
            padding: "1.2rem",
            background: "rgba(239, 68, 68, 0.06)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "1.1rem" }}>⚠️</span>
            <strong style={{ fontSize: "0.95rem", color: "var(--t)" }}>
              {failedQuestions.length} {failedQuestions.length === 1 ? "gap" : "gaps"} logged to Mistakes Journal
            </strong>
          </div>
          <p style={{ fontSize: "0.86rem", color: "var(--t2)", margin: "0.2rem 0 1rem", lineHeight: "1.5" }}>
            These concepts need reinforcement. You can review and fix them anytime in your Mistakes Journal.
          </p>
          <button
            type="button"
            className="btn-p"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => navigate("/mistakes")}
          >
            Go to Mistakes Journal →
          </button>
        </div>
      ) : (
        <div
          style={{
            marginTop: "1.2rem",
            padding: "1.2rem",
            background: "rgba(34, 197, 94, 0.06)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
            <span style={{ color: "var(--gr, #22c55e)", fontWeight: 700, fontSize: "1.1rem" }}>✓</span>
            <strong style={{ fontSize: "0.95rem", color: "var(--t)" }}>All questions verified</strong>
          </div>
          <p style={{ fontSize: "0.86rem", color: "var(--t2)", margin: 0, lineHeight: "1.5" }}>
            Core understanding demonstrated on all test questions.
          </p>
        </div>
      )}

      {/* Repaired concepts list if user repaired any during session */}
      {repairedList.length > 0 && (
        <div className="ss-section" style={{ marginTop: "1.2rem" }}>
          <div className="ss-section-title">Concepts Repaired in This Session</div>
          <div className="ss-concept-list">
            {repairedList.map((tag) => (
              <div key={tag} className="ss-concept-chip ss-concept-chip--repaired">
                <span className="ss-chip-icon">✓</span>
                {formatConceptLabel(tag)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Spaced Retention Check */}
      <div className="ss-review-banner" style={{ marginTop: "1.2rem" }}>
        <div className="ss-review-text">
          <div className="ss-review-label">Spaced Retention Check</div>
          <div className="ss-review-date">Scheduled for {formatDate(nextReview)}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="ss-actions" style={{ marginTop: "1.5rem" }}>
        {nextTopic ? (
          <>
            <button className="btn-p" onClick={goToNext}>
              Continue to Next Topic →
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
