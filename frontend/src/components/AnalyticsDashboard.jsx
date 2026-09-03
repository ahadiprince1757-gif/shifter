import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";
import { calculateCBCGrade } from "../engine/cbcGrading";
import {
  buildLearningIntelligence,
  calculateCognitiveMastery,
} from "../engine/learningIntelligenceEngine";

/** Helper to convert raw IDs/slugs into clean human Title Case */
function formatTitle(str) {
  if (!str) return "";
  if (!str.includes("_") && !str.includes("-") && /[a-z]/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str
    .replace(/[_-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function AnalyticsDashboard() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("focus"); // 'focus' | 'review' | 'mistakes'
  const [dueReviews, setDueReviews] = useState([]);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load analytics", err);
        setError("Failed to load analytics. Please try again.");
        setLoading(false);
      });

    spacedRepo.getDueReviews(userId).then(setDueReviews).catch(() => {});
    mistakeRepo.getUnresolvedMistakes(userId).then(setUnresolvedMistakes).catch(() => {});
  }, [userId]);

  if (loading) {
    return (
      <div className="analytics-dashboard clean-view">
        <div className="analytics-hero">
          <h2 className="analytics-hero-title">Learning Intelligence</h2>
          <p className="analytics-hero-sub">Analyzing learning evidence...</p>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={2} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const mostPassed = data.mostPassed || [];
  const mostFailed = data.mostFailed || [];

  // Synthesize raw attempts for Evidence Engines
  const attempts = [
    ...mostPassed.map((item) => ({
      topic: item.topic_title || item.topic,
      correct: true,
      cognitiveLevel: item.cognitive_level || "PROCEDURAL",
    })),
    ...mostFailed.map((item) => ({
      topic: item.topic_title || item.topic,
      correct: false,
      cognitiveLevel: item.cognitive_level || "APPLICATION",
    })),
  ];

  const intelligence = buildLearningIntelligence({
    attempts,
    dueReviews,
    unresolvedMistakes,
  });

  const { overview, masteryMap, recommendation } = intelligence;
  const cognitiveMastery = calculateCognitiveMastery(attempts);

  const totalPasses = mostPassed.reduce((s, r) => s + (r.pass_count || 0), 0);
  const totalFails = mostFailed.reduce((s, r) => s + (r.fail_count || 0), 0);
  const totalQuizzes = totalPasses + totalFails;
  const accuracyRate = overview.accuracy;
  const cbc = calculateCBCGrade(accuracyRate);

  const handleStudyTopic = (item) => {
    const sid = item.subject_id || item.sid;
    const cid = item.chapter_id || item.chapter_key || item.cid;
    const topic = item.topic_title || item.topic;
    if (sid && cid && topic) {
      navigate(`/learn/${sid}/${cid}/${encodeURIComponent(topic)}`);
    } else {
      navigate("/subjects");
    }
  };

  const handleReviewTopic = (item) => {
    const sid = item.subject_id || item.sid;
    const cid = item.chapter_id || item.chapter_key || item.cid;
    const topic = item.topic_title || item.topic_id || item.topic;
    if (sid && cid && topic) {
      navigate(`/learn/${sid}/${cid}/${encodeURIComponent(topic)}`);
    } else {
      navigate("/subjects");
    }
  };

  const handlePrimaryAction = () => {
    if (recommendation.route) {
      navigate(recommendation.route);
    } else {
      navigate("/subjects");
    }
  };

  const TABS = [
    { id: "focus", label: "Focus Areas", count: mostFailed.length },
    { id: "review", label: "Due for Review", count: dueReviews.length, highlight: dueReviews.length > 0 },
    { id: "mistakes", label: "Mistake Journal", count: unresolvedMistakes.length, highlight: unresolvedMistakes.length > 0 },
  ];

  const cognitiveDimensions = [
    { label: "Recognition", val: cognitiveMastery.RECOGNITION, color: "#38bdf8" },
    { label: "Recall", val: cognitiveMastery.RECALL, color: "#818cf8" },
    { label: "Procedure", val: cognitiveMastery.PROCEDURAL, color: "#10b981" },
    { label: "Application", val: cognitiveMastery.APPLICATION, color: "#f59e0b" },
    { label: "Transfer", val: cognitiveMastery.TRANSFER, color: "#ef4444" },
  ];

  return (
    <div className="analytics-dashboard clean-view">
      {/* Header */}
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">Learning Intelligence</h2>
        <p className="analytics-hero-sub">
          Evidence-grounded readiness decisioning and personalized learning bottleneck diagnosis.
        </p>
      </div>

      {/* 1. UNIFIED READINESS & BOTTLENECK ACTION CARD */}
      <div
        style={{
          marginTop: "1.2rem",
          padding: "1.4rem 1.5rem",
          background: "var(--sur, #ffffff)",
          border: "1px solid var(--bd, rgba(0, 0, 0, 0.08))",
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.02)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                padding: "0.25rem 0.6rem",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.78rem",
                background: overview.isReady ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                color: overview.isReady ? "#059669" : "#d97706",
              }}
            >
              {overview.readinessLabel}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--t2, #64748b)" }}>
              Confidence: {overview.evidenceConfidence}
            </span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--t, #0f172a)" }}>
            {overview.readinessScore}% <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--t2)" }}>Readiness</span>
          </div>
        </div>

        <div
          style={{
            padding: "1rem 1.2rem",
            background: "var(--bg, #f8fafc)",
            borderRadius: "10px",
            border: "1px solid var(--bd, rgba(0,0,0,0.05))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ flex: "1", minWidth: "220px" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--t2, #64748b)", letterSpacing: "0.04em" }}>
              Primary Bottleneck
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--t, #0f172a)", marginTop: "0.2rem" }}>
              {recommendation.title}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--t2, #475569)", marginTop: "0.2rem" }}>
              {recommendation.reason}
            </div>
          </div>

          <button
            className="clean-action-btn primary"
            style={{ padding: "0.55rem 1.1rem", fontWeight: 700, fontSize: "0.88rem" }}
            onClick={handlePrimaryAction}
          >
            {recommendation.buttonLabel} →
          </button>
        </div>
      </div>

      {/* 2. CORE METRICS ROW */}
      <div className="analytics-overview-card" style={{ marginTop: "1.2rem" }}>
        <div className="analytics-metric">
          <span className="metric-val">{accuracyRate}%</span>
          <span className="metric-lbl">Quiz Accuracy</span>
        </div>
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val">{dueReviews.length}</span>
          <span className="metric-lbl">Due Reviews</span>
        </div>
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val">{unresolvedMistakes.length}</span>
          <span className="metric-lbl">Active Mistakes</span>
        </div>
      </div>

      {/* CBC Overall Performance */}
      {totalQuizzes > 0 && (
        <div className="analytics-progress-bar-container">
          <div className="progress-bar-header">
            <span>Overall Performance</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span
                style={{
                  background: cbc.badgeBg,
                  color: cbc.badgeText,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  border: `1px solid ${cbc.badgeText}40`,
                }}
              >
                CBC {cbc.level} · {cbc.points}/8 pts
              </span>
              <span>{accuracyRate}% Accuracy ({totalPasses}/{totalQuizzes} correct)</span>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill-pass" style={{ width: `${accuracyRate}%` }} />
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--t2)", marginTop: "0.35rem" }}>
            {cbc.category} — {cbc.description}
          </div>
        </div>
      )}

      {/* 3. TRUTHFUL COGNITIVE EVIDENCE BREAKDOWN */}
      <div className="knowledge-state-card">
        <div className="knowledge-state-header">
          <div>
            <h3 className="knowledge-state-title">Evidence-Based Cognitive Mastery</h3>
            <p className="knowledge-state-subtitle">Directly measured from tagged student attempt evidence</p>
          </div>
        </div>

        <div className="knowledge-state-grid">
          {cognitiveDimensions.map((dim) => (
            <div key={dim.label} className="knowledge-state-dim-card">
              <div className="knowledge-state-dim-label">
                <span>{dim.label}</span>
                {dim.val !== null ? (
                  <span style={{ fontWeight: 700, color: dim.color }}>{dim.val}%</span>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "var(--t2, #94a3b8)" }}>No evidence yet</span>
                )}
              </div>
              <div className="knowledge-state-dim-track">
                {dim.val !== null ? (
                  <div style={{ width: `${dim.val}%`, height: "100%", background: dim.color, borderRadius: "3px" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.04)", borderRadius: "3px" }} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 4. KNOWLEDGE MAP: STRONG TOPICS VS WEAK TOPICS */}
        <div style={{ marginTop: "1.2rem", paddingTop: "1rem", borderTop: "1px solid var(--bd, rgba(0,0,0,0.06))" }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--t, #0f172a)", marginBottom: "0.8rem" }}>
            Knowledge Map
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {/* Strong Topics */}
            <div style={{ padding: "0.8rem 1rem", background: "rgba(16, 185, 129, 0.04)", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#059669", marginBottom: "0.4rem" }}>
                Strong Topics ({masteryMap?.strongTopics?.length || 0})
              </div>
              {masteryMap?.strongTopics?.length > 0 ? (
                masteryMap.strongTopics.map((t, idx) => (
                  <div key={idx} style={{ fontSize: "0.84rem", color: "var(--t)", padding: "0.2rem 0" }}>
                    {formatTitle(t.topic)} ({t.performanceScore ?? t.mastery ?? 0}%)
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "0.8rem", color: "var(--t2)" }}>No verified strong topics yet</div>
              )}
            </div>

            {/* Weak Topics & Gaps */}
            <div style={{ padding: "0.8rem 1rem", background: "rgba(239, 68, 68, 0.04)", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#dc2626", marginBottom: "0.4rem" }}>
                Needs Attention ({masteryMap?.weakTopics?.length || 0})
              </div>
              {masteryMap?.weakTopics?.length > 0 ? (
                masteryMap.weakTopics.map((t, idx) => (
                  <div key={idx} style={{ fontSize: "0.84rem", color: "var(--t)", padding: "0.2rem 0" }}>
                    {formatTitle(t.topic)} ({t.performanceScore ?? t.mastery ?? 0}%)
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "0.8rem", color: "var(--t2)" }}>No critical weak spots detected</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. ACTION TABS */}
      <div className="analytics-tabs" role="tablist" style={{ marginTop: "1.5rem" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`analytics-tab-btn ${activeTab === tab.id ? "active" : ""} ${tab.highlight ? "analytics-tab-btn--alert" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
            <span className="analytics-tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="analytics-tab-panel">

        {/* 1. FOCUS AREAS */}
        {activeTab === "focus" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Topics Needing Practice</h3>
              <p>Topics where questions were missed — practice these to raise your score.</p>
            </div>
            {mostFailed.length === 0 ? (
              <div className="clean-empty-state">
                <p style={{ marginBottom: "1rem" }}>No weak spots detected. Complete quizzes to get practice recommendations.</p>
                <button
                  className="clean-action-btn primary"
                  onClick={() => navigate("/subjects")}
                >
                  Browse Subjects to Practice →
                </button>
              </div>
            ) : (
              <div className="clean-topic-list">
                {mostFailed.map((item, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">{formatTitle(item.topic_title || item.topic)}</span>
                      <span className="clean-topic-meta">
                        {formatTitle(item.subject_name)} • {formatTitle(item.chapter_title)}
                      </span>
                    </div>
                    <button
                      className="clean-action-btn primary"
                      onClick={() => handleStudyTopic(item)}
                    >
                      Practice →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. DUE FOR REVIEW */}
        {activeTab === "review" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Memory Review Queue</h3>
              <p>Topics scheduled for review today to strengthen long-term memory.</p>
            </div>
            {dueReviews.length === 0 ? (
              <div className="clean-empty-state">
                <p>No reviews scheduled today. Great job keeping your memory fresh!</p>
              </div>
            ) : (
              <div className="clean-topic-list">
                {dueReviews.map((item, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">{formatTitle(item.topic_id)}</span>
                      <span className="clean-topic-meta">
                        Interval: {item.interval_days} day{item.interval_days !== 1 ? "s" : ""} · Repetitions: {item.repetitions}
                      </span>
                    </div>
                    <button
                      className="clean-action-btn primary"
                      onClick={() => handleReviewTopic(item)}
                    >
                      Review →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. MISTAKE JOURNAL */}
        {activeTab === "mistakes" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Unresolved Mistakes</h3>
              <p>Questions answered incorrectly in recent quizzes.</p>
            </div>
            {unresolvedMistakes.length === 0 ? (
              <div className="clean-empty-state">
                <p>No unresolved mistakes. Excellent accuracy!</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ color: "var(--t2)", marginBottom: "1.2rem", fontSize: "0.95rem" }}>
                  You have <strong style={{ color: "var(--t)", fontWeight: 700 }}>{unresolvedMistakes.length}</strong> unresolved mistake{unresolvedMistakes.length !== 1 ? "s" : ""}.
                </p>
                <button
                  className="clean-action-btn primary"
                  onClick={() => navigate("/mistakes")}
                >
                  Open Mistake Journal →
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
