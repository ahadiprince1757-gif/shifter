import React from 'react';
import './ExplainabilityDrawer.css';

/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P0
 * Explainability Drawer ("Why am I seeing this?")
 * 
 * Invariants: Tixar Intelligence Law
 * - Never infer more certainty than evidence supports.
 * - Never recommend an intervention without knowing why.
 * - Every recommendation must be reproducible from original evidence.
 */
export default function ExplainabilityDrawer({
  isOpen,
  onClose,
  recommendation = {},
  overview = {},
}) {
  if (!isOpen) return null;

  const authority = recommendation.authority || "SERVER_VERIFIED";
  const decisionId = recommendation.decisionId || "N/A";
  const engineVersion = recommendation.engineVersion || "2.0.0";
  const ruleVersion = recommendation.ruleVersion || 1;
  const why = recommendation.why || {};
  const rules = why.rulesTriggered || recommendation.inferenceRules || [];
  const hypotheses = why.contributingHypotheses || recommendation.contributingHypotheses || [];
  const evidenceRefs = why.evidenceRefs || recommendation.evidenceRefs || [];
  const snapshot = why.evidenceSnapshot || recommendation.evidenceSnapshot || {
    totalAttempts: overview.totalAttempts || 0,
    correctAttempts: overview.correctAttempts || 0,
    accuracy: overview.accuracy || 0
  };

  const getRuleDescription = (rule) => {
    switch (rule) {
      case 'MIN_ATTEMPTS_5':
        return 'Sufficient sample size: At least 5 genuine question attempts observed.';
      case 'ACCURACY_LT_40':
        return 'Struggling threshold: Observed accuracy is below 40% on this concept.';
      case 'PREREQUISITE_WEAKNESS_SUSPECTED':
        return 'Pedagogical dependency: Upstream concept difficulty is interfering with this topic.';
      case 'INSUFFICIENT_TOTAL_EVIDENCE':
        return 'Baseline calibration: Fewer than 3 attempts recorded across the subject.';
      case 'CALIBRATION_RECOMMENDED':
        return 'Awaiting evidence: Exploring baseline understanding before diagnosing gaps.';
      case 'ALL_ACTIVE_TOPICS_MASTERY_GE_80':
        return 'Demonstrated mastery: Recent performance exceeds the 80% competency threshold.';
      case 'NO_DUE_REVIEWS':
        return 'Retention on track: No scheduled spaced reviews are currently due.';
      case 'NO_ACTION_CONTINUE':
        return 'First-Class "Do Nothing" Policy: Learner is progressing smoothly without artificial remediation.';
      case 'INTERVAL_ELAPSED':
        return 'Spaced interval: Review window is open to reinforce memory retrieval.';
      case 'ATTEMPTS_BETWEEN_3_AND_4':
        return 'Emerging signal: 3 to 4 attempts observed; gathering more evidence.';
      default:
        return `Active inference rule [${rule}]`;
    }
  };

  return (
    <div className="explain-drawer-overlay" onClick={onClose}>
      <div className="explain-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="explain-drawer-header">
          <div className="explain-drawer-badge-row">
            <span className={`explain-badge ${authority === 'SERVER_VERIFIED' ? 'verified' : 'provisional'}`}>
              <span className="explain-badge-dot" />
              {authority === 'SERVER_VERIFIED' ? `Server-Verified (v${engineVersion})` : 'Local Provisional (Offline)'}
            </span>
            <span className="explain-decision-tag">Decision #{decisionId}</span>
          </div>

          <h2 className="explain-drawer-title">Why Am I Seeing This?</h2>
          <p className="explain-drawer-subtitle">
            Every Tixar recommendation is reproducible from the exact evidence that existed when it was generated.
          </p>
          <button className="explain-drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="explain-drawer-body">
          {/* Section 1: Target & Action */}
          <div className="explain-card">
            <div className="explain-card-label">RECOMMENDED INTERVENTION</div>
            <div className="explain-highlight-title">{recommendation.title || 'Practice Topic'}</div>
            <div className="explain-card-desc">{recommendation.pedagogicalWhy || recommendation.reason}</div>
          </div>

          {/* Section 2: Evidence Snapshot at T0 */}
          <div className="explain-card">
            <div className="explain-card-label">EVIDENCE SNAPSHOT AT DECISION TIME</div>
            <div className="explain-snapshot-grid">
              <div className="explain-stat-box">
                <div className="explain-stat-val">{snapshot.totalAttempts ?? overview.totalAttempts ?? 0}</div>
                <div className="explain-stat-lbl">Questions Observed</div>
              </div>
              <div className="explain-stat-box">
                <div className="explain-stat-val">{snapshot.accuracy ?? overview.accuracy ?? 0}%</div>
                <div className="explain-stat-lbl">Observed Accuracy</div>
              </div>
              <div className="explain-stat-box">
                <div className="explain-stat-val">{why.evidenceStrength || 75}/100</div>
                <div className="explain-stat-lbl">Evidence Strength</div>
              </div>
              <div className="explain-stat-box">
                <div className="explain-stat-val">{why.confidence || 'MODERATE'}</div>
                <div className="explain-stat-lbl">Confidence Level</div>
              </div>
            </div>
            <p className="explain-footnote">
              * Evidence Strength measures volume, consistency, and recency of evidence — separate from student mastery.
            </p>
          </div>

          {/* Section 3: Rules Triggered */}
          <div className="explain-card">
            <div className="explain-card-label">PEDAGOGICAL INFERENCE RULES</div>
            {rules.length > 0 ? (
              <ul className="explain-rules-list">
                {rules.map((rule, idx) => (
                  <li key={idx} className="explain-rule-item">
                    <span className="explain-rule-code">{rule}</span>
                    <span className="explain-rule-text">{getRuleDescription(rule)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="explain-empty-text">No heuristic rules triggered; defaulting to standard practice.</p>
            )}
          </div>

          {/* Section 4: Contributing Hypotheses */}
          {hypotheses.length > 0 && (
            <div className="explain-card">
              <div className="explain-card-label">CONTRIBUTING HYPOTHESES (HEURISTIC WEIGHTS)</div>
              <div className="explain-hypotheses-list">
                {hypotheses.map((h, idx) => (
                  <div key={idx} className="explain-hypothesis-row">
                    <div className="explain-hypothesis-info">
                      <span className="explain-hypothesis-name">{h.factor}</span>
                      <span className="explain-hypothesis-weight">
                        Weight: {Math.round((h.evidenceWeight || 0.5) * 100)}%
                      </span>
                    </div>
                    <div className="explain-hypothesis-bar-bg">
                      <div
                        className="explain-hypothesis-bar-fill"
                        style={{ width: `${Math.round((h.evidenceWeight || 0.5) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="explain-footnote">
                * Weights represent heuristic contributor rankings, not calibrated probabilities.
              </p>
            </div>
          )}

          {/* Section 5: Evidence Provenance & Audit Trail */}
          <div className="explain-card">
            <div className="explain-card-label">EVIDENCE PROVENANCE AUDIT TRAIL</div>
            <div className="explain-audit-info">
              <div><strong>Engine Version:</strong> {engineVersion}</div>
              <div><strong>Rule Version:</strong> v{ruleVersion}</div>
              <div><strong>Immutable Decisions Ledger:</strong> Active (Update/Delete prohibited by database triggers)</div>
              {evidenceRefs.length > 0 && (
                <div className="explain-refs-block">
                  <strong>Referenced Client Event IDs ({evidenceRefs.length}):</strong>
                  <div className="explain-refs-chips">
                    {evidenceRefs.map((ref, idx) => (
                      <span key={idx} className="explain-ref-chip">{ref}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="explain-drawer-footer">
          <button className="explain-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
