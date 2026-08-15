import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";

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
  const [mistakeCount, setMistakeCount] = useState(0);
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
    mistakeRepo.getUnresolvedMistakes(userId).then((m) => setMistakeCount(m.length)).catch(() => {});
  }, [userId]);

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <div className="analytics-hero">
          <h2 className="analytics-hero-title">Study Insights</h2>
          <p className="analytics-hero-sub">Loading your progress...</p>
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

  const totalPasses = mostPassed.reduce((s, r) => s + (r.pass_count || 0), 0);
  const totalFails = mostFailed.reduce((s, r) => s + (r.fail_count || 0), 0);
  const totalQuizzes = totalPasses + totalFails;

  const accuracyRate =
    totalQuizzes > 0 ? Math.round((totalPasses / totalQuizzes) * 100) : 0;

  const handleStudyTopic = (item) => {
    if (item.subject_id && item.chapter_id && item.topic_title) {
      navigate(
        `/learn/${item.subject_id}/${item.chapter_id}/${encodeURIComponent(
          item.topic_title
        )}`
      );
    } else {
      navigate("/subjects");
    }
  };

  const TABS = [
    { id: "focus", label: "Focus Areas", count: mostFailed.length },
    { id: "review", label: "Due for Review", count: dueReviews.length, highlight: dueReviews.length > 0 },
    { id: "mistakes", label: "Mistake Journal", count: mistakeCount, highlight: mistakeCount > 0 },
  ];

  return (
    <div className="analytics-dashboard clean-view">
      {/* Clean Minimalist Header */}
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">Study Insights</h2>
        <p className="analytics-hero-sub">
          Focused analytics to guide your revision and improve retention.
        </p>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="analytics-overview-card">
        <div className="analytics-metric">
          <span className="metric-val">
            {accuracyRate}%
          </span>
          <span className="metric-lbl">Quiz Accuracy</span>
        </div>
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val">
            {dueReviews.length}
          </span>
          <span className="metric-lbl">Due Reviews</span>
        </div>
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val">
            {mistakeCount}
          </span>
          <span className="metric-lbl">Active Mistakes</span>
        </div>
      </div>

      {/* Accuracy Visual Progress Bar */}
      {totalQuizzes > 0 && (
        <div className="analytics-progress-bar-container">
          <div className="progress-bar-header">
            <span>Overall Performance</span>
            <span>{accuracyRate}% Accuracy ({totalPasses}/{totalQuizzes} correct)</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill-pass"
              style={{ width: `${accuracyRate}%` }}
            />
          </div>
        </div>
      )}

      {/* 3 Action-Oriented Tabs */}
      <div className="analytics-tabs" role="tablist">
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

        {/* 1. FOCUS AREAS (Weak Spots) */}
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

        {/* 2. DUE FOR REVIEW (Spaced Repetition Schedule) */}
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
                      onClick={() => navigate(`/subjects`)}
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
            {mistakeCount === 0 ? (
              <div className="clean-empty-state">
                <p>No unresolved mistakes. Excellent accuracy!</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ color: "var(--t2)", marginBottom: "1.2rem", fontSize: "0.95rem" }}>
                  You have <strong style={{ color: "var(--t)", fontWeight: 700 }}>{mistakeCount}</strong> unresolved mistake{mistakeCount !== 1 ? "s" : ""}.
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
