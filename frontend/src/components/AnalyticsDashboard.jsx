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

/** Semi-Circle Arc Gauge SVG Component */
function ReadinessArcGauge({ score = 0, confidence = "HIGH" }) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // ~125.66
  const safeScore = Math.min(Math.max(score, 0), 100);
  const progressOffset = circumference * (1 - safeScore / 100);

  return (
    <div className="readiness-gauge-wrapper">
      <svg viewBox="0 0 100 58" className="readiness-arc-svg">
        {/* Background Arc */}
        <path
          d="M 10 48 A 40 40 0 0 1 90 48"
          fill="none"
          stroke="var(--bd2, #e2e8f0)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <path
          d="M 10 48 A 40 40 0 0 1 90 48"
          fill="none"
          stroke="#1d6bf3"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
        />
        {/* Inner Score Text */}
        <text x="50" y="38" textAnchor="middle" className="gauge-score-text">
          {safeScore}%
        </text>
        <text x="50" y="48" textAnchor="middle" className="gauge-label-text">
          Readiness
        </text>
      </svg>
      <div className="gauge-confidence-tag">
        Confidence: <span className="confidence-val">{confidence}</span>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicFilterTab, setTopicFilterTab] = useState("needs_attention"); // 'needs_attention' | 'weak' | 'strong'
  const [dueReviews, setDueReviews] = useState([]);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState([]);
  const [showCognitiveDetails, setShowCognitiveDetails] = useState(false);
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
      <div className="analytics-v2-container">
        <div className="analytics-v2-header">
          <h1 className="analytics-v2-title">Learning Intelligence</h1>
          <p className="analytics-v2-sub">Analyzing learning evidence...</p>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-v2-container">
        <div className="analytics-error-box">
          <p>{error}</p>
        </div>
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

  const handlePrimaryAction = () => {
    if (recommendation.route) {
      navigate(recommendation.route);
    } else {
      navigate("/subjects");
    }
  };

  // Compile topic lists for "Topics to Focus On" tabs
  const needsAttentionList = masteryMap?.weakTopics?.length > 0 
    ? masteryMap.weakTopics 
    : mostFailed;

  const weakList = attempts
    .filter((a) => !a.correct)
    .map((a) => ({ topic_title: a.topic, mastery: 0 }));

  const strongList = masteryMap?.strongTopics?.length > 0 
    ? masteryMap.strongTopics 
    : mostPassed;

  let currentFilteredList = needsAttentionList;
  if (topicFilterTab === "weak") {
    currentFilteredList = weakList;
  } else if (topicFilterTab === "strong") {
    currentFilteredList = strongList;
  }

  const cognitiveDimensions = [
    { label: "Recognition", val: cognitiveMastery.RECOGNITION, color: "#38bdf8" },
    { label: "Recall", val: cognitiveMastery.RECALL, color: "#818cf8" },
    { label: "Procedure", val: cognitiveMastery.PROCEDURAL, color: "#10b981" },
    { label: "Application", val: cognitiveMastery.APPLICATION, color: "#f59e0b" },
    { label: "Transfer", val: cognitiveMastery.TRANSFER, color: "#ef4444" },
  ];

  return (
    <div className="analytics-v2-container">
      {/* 0. HEADER */}
      <header className="analytics-v2-header">
        <div className="analytics-v2-brand">
          <div className="analytics-v2-logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#1d6bf3">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="analytics-v2-title">Learning Intelligence</h1>
            <p className="analytics-v2-sub">Your learning. Measured. Improved.</p>
          </div>
        </div>
      </header>

      {/* 1. READINESS CARD */}
      <div className="readiness-v2-card">
        <div className="readiness-v2-top">
          <div className="readiness-v2-info">
            <div className="readiness-v2-label">READINESS</div>
            <div className="readiness-v2-score">{overview.readinessScore}%</div>
            <div className="readiness-v2-status">{overview.readinessLabel}</div>
            <div className="readiness-v2-subtext">
              {overview.isReady ? "All core prerequisites met" : "Critical gap detected"}
            </div>
          </div>

          <ReadinessArcGauge
            score={overview.readinessScore}
            confidence={overview.evidenceConfidence}
          />
        </div>

        {/* Primary Bottleneck Banner */}
        <div className="primary-bottleneck-v2-banner">
          <div className="bottleneck-v2-content">
            <div className="bottleneck-v2-tag">PRIMARY BOTTLENECK</div>
            <div className="bottleneck-v2-title">
              {formatTitle(recommendation.title || "Laboratory Safety and Apparatus")}
            </div>
            <div className="bottleneck-v2-desc">
              {recommendation.reason || "Your mastery is currently 0%, creating a prerequisite gap."}
            </div>
          </div>
          <button className="repair-gap-v2-btn" onClick={handlePrimaryAction}>
            {recommendation.buttonLabel || "Repair This Gap"} →
          </button>
        </div>
      </div>

      {/* 2. CORE METRICS 3-COLUMN GRID */}
      <div className="metrics-v2-grid">
        <div className="metric-v2-card">
          <div className="metric-v2-val">{accuracyRate}%</div>
          <div className="metric-v2-lbl">Quiz Accuracy</div>
          <div className="metric-v2-sub">{totalPasses} / {totalQuizzes} correct</div>
        </div>

        <div className="metric-v2-card" onClick={() => navigate("/analytics")}>
          <div className="metric-v2-val">{dueReviews.length}</div>
          <div className="metric-v2-lbl">Due Reviews</div>
          <div className="metric-v2-sub">
            {dueReviews.length > 0 ? "Review now" : "Keep it up!"}
          </div>
        </div>

        <div className="metric-v2-card" onClick={() => navigate("/mistakes")}>
          <div className="metric-v2-val">{unresolvedMistakes.length}</div>
          <div className="metric-v2-lbl">Active Mistake</div>
          <div className="metric-v2-sub">
            {unresolvedMistakes.length > 0 ? "Review now" : "Review now"}
          </div>
        </div>
      </div>

      {/* 3. TOPICS TO FOCUS ON SECTION */}
      <div className="topics-focus-v2-card">
        <div className="topics-v2-header">
          <h2 className="topics-v2-title">Topics to Focus On</h2>
          <button className="view-all-v2-link" onClick={() => navigate("/subjects")}>
            View all
          </button>
        </div>

        {/* Filter Tabs (Pill Buttons) */}
        <div className="topic-filter-v2-pills">
          <button
            className={`filter-v2-pill ${topicFilterTab === "needs_attention" ? "active" : ""}`}
            onClick={() => setTopicFilterTab("needs_attention")}
          >
            Needs Attention ({needsAttentionList.length})
          </button>
          <button
            className={`filter-v2-pill ${topicFilterTab === "weak" ? "active" : ""}`}
            onClick={() => setTopicFilterTab("weak")}
          >
            Weak ({weakList.length})
          </button>
          <button
            className={`filter-v2-pill ${topicFilterTab === "strong" ? "active" : ""}`}
            onClick={() => setTopicFilterTab("strong")}
          >
            Strong ({strongList.length})
          </button>
        </div>

        {/* Topic List */}
        <div className="topic-v2-list">
          {currentFilteredList.length === 0 ? (
            <div className="topic-v2-empty">
              <p>No topics in this category right now.</p>
            </div>
          ) : (
            currentFilteredList.map((item, idx) => {
              const title = formatTitle(item.topic_title || item.topic || "Topic");
              const subject = formatTitle(item.subject_name || item.subject_id || "Science");
              const chapter = formatTitle(item.chapter_title || item.chapter_id || "Practical Skills");
              const score = item.performanceScore ?? item.mastery ?? 0;

              return (
                <div
                  key={idx}
                  className="topic-v2-item"
                  onClick={() => handleStudyTopic(item)}
                >
                  <div className="topic-v2-item-main">
                    <div className="topic-v2-item-title">{title}</div>
                    <div className="topic-v2-item-sub">
                      {subject} • {chapter}
                    </div>
                  </div>
                  <div className="topic-v2-item-right">
                    <span className="topic-v2-badge">{score}%</span>
                    <span className="topic-v2-chevron">›</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Explore All Weak Topics Banner Button */}
        <button
          className="explore-weak-v2-btn"
          onClick={() => navigate("/subjects")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#1d6bf3">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Explore All Weak Topics
          </span>
          <span className="explore-v2-chevron">›</span>
        </button>
      </div>

      {/* 4. OPTIONAL COGNITIVE MASTERY EVIDENCE COLLAPSIBLE */}
      <div className="cognitive-collapsible-v2">
        <button
          className="cognitive-v2-toggle"
          onClick={() => setShowCognitiveDetails(!showCognitiveDetails)}
        >
          <span>Evidence & Cognitive Mastery Details</span>
          <span>{showCognitiveDetails ? "▲" : "▼"}</span>
        </button>

        {showCognitiveDetails && (
          <div className="cognitive-v2-body">
            {totalQuizzes > 0 && (
              <div className="cbc-v2-box">
                <span
                  style={{
                    background: cbc.badgeBg,
                    color: cbc.badgeText,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                  }}
                >
                  CBC {cbc.level} · {cbc.points}/8 pts
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--t2)" }}>
                  {cbc.category} — {cbc.description}
                </span>
              </div>
            )}

            <div className="cognitive-v2-grid">
              {cognitiveDimensions.map((dim) => (
                <div key={dim.label} className="cognitive-v2-row">
                  <div className="cognitive-v2-label">
                    <span>{dim.label}</span>
                    <span style={{ fontWeight: 700, color: dim.color }}>
                      {dim.val !== null ? `${dim.val}%` : "No evidence"}
                    </span>
                  </div>
                  <div className="cognitive-v2-track">
                    <div
                      className="cognitive-v2-fill"
                      style={{
                        width: `${dim.val || 0}%`,
                        background: dim.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

