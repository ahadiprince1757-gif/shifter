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
      <div className="analytics-dashboard">
        <div className="analytics-hero">
          <h2 className="analytics-hero-title">Tixar Learning Intelligence</h2>
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
    } else if (recommendation.targetTopic) {
      navigate("/subjects");
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
      {/* Hero Header */}
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">Tixar Learning Intelligence</h2>
        <p className="analytics-hero-sub">
          Evidence-grounded readiness decisioning and personalized learning bottleneck diagnosis.
        </p>
      </div>

      {/* 1. TIXAR READINESS BANNER */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1.4rem 1.6rem",
          background: overview.isReady
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.05) 100%)",
          border: `1px solid ${overview.isReady ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: overview.isReady ? "#059669" : "#d97706" }}>
              🎯 Tixar Advancement Readiness
            </span>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--t, #0f172a)", margin: "0.2rem 0 0 0" }}>
              {overview.readinessScore}% Readiness — {overview.readinessLabel}
            </h3>
          </div>
          <span
            style={{
              padding: "0.35rem 0.8rem",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.82rem",
              background: overview.isReady ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
              color: overview.isReady ? "#059669" : "#d97706",
            }}
          >
            Evidence Confidence: {overview.evidenceConfidence}
          </span>
        </div>

        <p style={{ fontSize: "0.92rem", color: "var(--t2, #475569)", margin: 0, lineHeight: "1.5" }}>
          {overview.readinessRecommendation}
        </p>
      </div>

      {/* 2. PRIMARY LEARNING BOTTLENECK / NEXT BEST ACTION */}
      <div
        style={{
          marginTop: "1.2rem",
          padding: "1.2rem 1.4rem",
          background: "var(--sur, #ffffff)",
          border: "1px solid var(--bd, rgba(0, 0, 0, 0.08))",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ flex: "1", minWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
                padding: "0.2rem 0.5rem",
                borderRadius: "6px",
                background:
                  recommendation.priority === "CRITICAL"
                    ? "rgba(239, 68, 68, 0.15)"
                    : recommendation.priority === "HIGH"
                    ? "rgba(245, 158, 11, 0.15)"
                    : "rgba(59, 130, 246, 0.15)",
                color:
                  recommendation.priority === "CRITICAL"
                    ? "#dc2626"
                    : recommendation.priority === "HIGH"
                    ? "#d97706"
                    : "#2563eb",
              }}
            >
              ⚡ Primary Learning Bottleneck
            </span>
          </div>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.2rem 0", color: "var(--t, #0f172a)" }}>
            {recommendation.title}
          </h4>
          <p style={{ fontSize: "0.88rem", color: "var(--t2, #475569)", margin: 0 }}>
            {recommendation.reason}
          </p>
        </div>
        <button
          className="clean-action-btn primary"
          style={{ padding: "0.6rem 1.2rem", fontWeight: 700 }}
          onClick={handlePrimaryAction}
        >
          {recommendation.buttonLabel} →
        </button>
      </div>

      {/* 3 Core Metric Cards */}
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

      {/* Progress Bar + CBC Badge */}
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

      {/* 3. TRUTHFUL EVIDENCE-BASED COGNITIVE MASTERY CARD */}
      <div className="knowledge-state-card">
        <div className="knowledge-state-header">
          <div>
            <h3 className="knowledge-state-title">Evidence-Based Cognitive Mastery</h3>
            <p className="knowledge-state-subtitle">Directly measured from tagged student attempt evidence (no estimations)</p>
          </div>
          <span className="knowledge-state-gap-badge">
            {overview.evidenceConfidence === "HIGH"
              ? "✓ High Evidence Confidence"
              : "More Practice Needed for Full Confidence"}
          </span>
        </div>

        <div className="knowledge-state-grid">
          {cognitiveDimensions.map((dim) => (
            <div key={dim.label} className="knowledge-state-dim-card">
              <div className="knowledge-state-dim-label">
                <span>{dim.label}</span>
                {dim.val !== null ? (
                  <span style={{ fontWeight: 700, color: dim.color }}>{dim.val}%</span>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "var(--t2, #94a3b8)" }}>Not enough evidence yet</span>
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
          <span className="knowledge-state-diagnosis-title">Knowledge Map & Topic Vectors</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "0.8rem" }}>
            {/* Strong Topics */}
            <div style={{ padding: "0.8rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#059669", marginBottom: "0.4rem" }}>
                ✓ Strong Topics ({masteryMap?.strongTopics?.length || 0})
              </div>
              {masteryMap?.strongTopics?.length > 0 ? (
                masteryMap.strongTopics.map((t, idx) => (
                  <div key={idx} style={{ fontSize: "0.85rem", color: "var(--t)", padding: "0.2rem 0" }}>
                    • {formatTitle(t.topic)} ({t.performanceScore || t.mastery}%)
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "0.8rem", color: "var(--t2)" }}>No verified strong topics yet</div>
              )}
            </div>

            {/* Weak Topics & Gaps */}
            <div style={{ padding: "0.8rem", background: "rgba(239, 68, 68, 0.05)", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#dc2626", marginBottom: "0.4rem" }}>
                ⚠ Needs Attention ({masteryMap?.weakTopics?.length || 0})
              </div>
              {masteryMap?.weakTopics?.length > 0 ? (
                masteryMap.weakTopics.map((t, idx) => (
                  <div key={idx} style={{ fontSize: "0.85rem", color: "var(--t)", padding: "0.2rem 0" }}>
                    • {formatTitle(t.topic)} ({t.performanceScore || t.mastery}%)
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "0.8rem", color: "var(--t2)" }}>No critical weak spots detected</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Action-Oriented Tabs */}
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
                      <span className="clean-topic-name">{formatTitle(item.topic_title)}</span>
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
