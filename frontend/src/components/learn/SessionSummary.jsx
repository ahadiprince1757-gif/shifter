/**
 * SessionSummary
 *
 * Shown after the TRANSFER phase completes.
 * Replaces MasteredPhase with a full-cycle report.
 *
 * Shows:
 *   - Score from the RETRIEVE phase
 *   - Diagnostic outcome (gap found / no gap)
 *   - Concepts that were repaired
 *   - Next scheduled review date (from spacedRepo)
 *   - Actions: next topic or return to list
 *
 * Props:
 *   topic            string
 *   subject          object
 *   chapter          object
 *   sessionScore     number  (0–100)
 *   diagnosticResult "gap_found" | "no_gap" | null
 *   weaknessMap      object   { [conceptTag]: { questions[], repairTaught, repairPassed } }
 *   conceptOrder     string[]
 *   nextTopic        string | null
 *   goToNext         function
 *   goBack           function
 *   userId           string | null
 */

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
  diagnosticResult,
  weaknessMap,
  conceptOrder,
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

  const repairedConcepts = (conceptOrder || []).filter(
    (tag) => weaknessMap?.[tag]?.repairPassed
  );
  const skippedConcepts = (conceptOrder || []).filter(
    (tag) => !weaknessMap?.[tag]?.repairPassed
  );
  const noGap = diagnosticResult === "no_gap";

  return (
    <div className="session-summary">
      {/* Header */}
      <div className="ss-header">
        <div className="ss-badge-row">
          <span className="lbadge lb-done">Session Complete</span>
          {noGap && <span className="ss-nogap-pill">No gap detected</span>}
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
          <div className="ss-score-label">Retrieval score</div>
          <div className="ss-score-hint">
            {(sessionScore ?? 0) >= 80
              ? "Strong — this concept is consolidating."
              : (sessionScore ?? 0) >= 50
              ? "Partial — keep spacing your reviews."
              : "Needs more work — review is scheduled soon."}
          </div>
        </div>
      </div>

      {/* Diagnostic row */}
      <div className="ss-section">
        <div className="ss-section-title">Diagnosis</div>
        <div className={`ss-diagnostic-pill ${noGap ? "ss-dp--green" : "ss-dp--amber"}`}>
          {noGap
            ? "✓ You entered with no significant gaps"
            : "⚠ Gap detected — targeted teaching was applied"}
        </div>
      </div>

      {/* Repaired concepts */}
      {repairedConcepts.length > 0 && (
        <div className="ss-section">
          <div className="ss-section-title">Concepts Repaired</div>
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

      {/* Skipped concepts (used all attempts but still wrong) */}
      {skippedConcepts.length > 0 && (
        <div className="ss-section">
          <div className="ss-section-title">Still Needs Work</div>
          <div className="ss-concept-list">
            {skippedConcepts.map((tag) => (
              <div key={tag} className="ss-concept-chip ss-concept-chip--skipped">
                <span className="ss-chip-icon">↻</span>
                {formatConceptLabel(tag)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next review date */}
      <div className="ss-review-banner">
        <div className="ss-review-icon">📅</div>
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
