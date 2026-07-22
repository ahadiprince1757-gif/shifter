import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("focus"); // 'focus' | 'visited' | 'strengths' | 'unexplored'
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
  }, []);

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <div className="analytics-hero">
          <h2 className="analytics-hero-title">Learning Progress</h2>
          <p className="analytics-hero-sub">Loading your study insights...</p>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={3} />
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

  const mostVisited = data.mostVisited || [];
  const mostPassed = data.mostPassed || [];
  const mostFailed = data.mostFailed || [];
  const unvisited = data.unvisited || [];

  const totalVisits = mostVisited.reduce((s, r) => s + (r.visit_count || 0), 0);
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

  // Group unvisited by subject cleanly
  const unvisitedBySubject = {};
  unvisited.forEach((item) => {
    const subName = item.subject_name || "General";
    if (!unvisitedBySubject[subName]) unvisitedBySubject[subName] = [];
    unvisitedBySubject[subName].push(item);
  });

  return (
    <div className="analytics-dashboard clean-view">
      {/* Header */}
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">Learning Progress</h2>
        <p className="analytics-hero-sub">
          A noise-free view of your study habits, quiz accuracy, and recommended practice areas.
        </p>
      </div>

      {/* Top Learning Summary Banner */}
      <div className="analytics-overview-card">
        <div className="analytics-metric">
          <span className="metric-val" style={{ color: "var(--v)" }}>
            {accuracyRate}%
          </span>
          <span className="metric-lbl">Quiz Accuracy</span>
        </div>
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val" style={{ color: "#3a8ffd" }}>
            {totalVisits}
          </span>
          <span className="metric-lbl">Notes Read</span>
        </div>
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val" style={{ color: "#10b981" }}>
            {totalPasses}
          </span>
          <span className="metric-lbl">Correct Answers</span>
        </div>
      </div>

      {/* Accuracy Visual Progress Bar */}
      {totalQuizzes > 0 && (
        <div className="analytics-progress-bar-container">
          <div className="progress-bar-header">
            <span>Overall Quiz Performance</span>
            <span>{accuracyRate}% Accuracy ({totalPasses}/{totalQuizzes})</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill-pass"
              style={{ width: `${accuracyRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Noise-Free Tab Switcher */}
      <div className="analytics-tabs" role="tablist">
        <button
          className={`analytics-tab-btn ${activeTab === "focus" ? "active" : ""}`}
          onClick={() => setActiveTab("focus")}
          role="tab"
          aria-selected={activeTab === "focus"}
        >
          🎯 Focus Areas ({mostFailed.length})
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === "visited" ? "active" : ""}`}
          onClick={() => setActiveTab("visited")}
          role="tab"
          aria-selected={activeTab === "visited"}
        >
          🔥 Most Studied ({mostVisited.length})
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === "strengths" ? "active" : ""}`}
          onClick={() => setActiveTab("strengths")}
          role="tab"
          aria-selected={activeTab === "strengths"}
        >
          ⭐ Strengths ({mostPassed.length})
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === "unexplored" ? "active" : ""}`}
          onClick={() => setActiveTab("unexplored")}
          role="tab"
          aria-selected={activeTab === "unexplored"}
        >
          🌱 Unexplored ({unvisited.length})
        </button>
      </div>

      {/* Tab Panel Content */}
      <div className="analytics-tab-panel">
        {/* TAB 1: Focus Areas (Needs Review) */}
        {activeTab === "focus" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Topics Needing Review</h3>
              <p>Topics where quiz questions were missed — practice these to improve score.</p>
            </div>
            {mostFailed.length === 0 ? (
              <div className="clean-empty-state">
                <span className="empty-icon">✨</span>
                <p>No weak spots detected! Keep up the great work.</p>
              </div>
            ) : (
              <div className="clean-topic-list">
                {mostFailed.map((item, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">{item.topic_title}</span>
                      <span className="clean-topic-meta">
                        {item.subject_name} • {item.chapter_title}
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

        {/* TAB 2: Most Studied */}
        {activeTab === "visited" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Frequently Read Topics</h3>
              <p>Topics you have revisited and studied most often.</p>
            </div>
            {mostVisited.length === 0 ? (
              <div className="clean-empty-state">
                <span className="empty-icon">📖</span>
                <p>Start reading topics to see your study activity here.</p>
              </div>
            ) : (
              <div className="clean-topic-list">
                {mostVisited.map((item, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">{item.topic_title}</span>
                      <span className="clean-topic-meta">
                        {item.subject_name} • {item.chapter_title}
                      </span>
                    </div>
                    <button
                      className="clean-action-btn primary"
                      onClick={() => handleStudyTopic(item)}
                    >
                      Study →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Strengths */}
        {activeTab === "strengths" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Mastered Topics</h3>
              <p>Topics where you scored highest and demonstrated mastery.</p>
            </div>
            {mostPassed.length === 0 ? (
              <div className="clean-empty-state">
                <span className="empty-icon">🏆</span>
                <p>Complete quizzes to unlock your topic strengths.</p>
              </div>
            ) : (
              <div className="clean-topic-list">
                {mostPassed.map((item, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">{item.topic_title}</span>
                      <span className="clean-topic-meta">
                        {item.subject_name} • {item.chapter_title}
                      </span>
                    </div>
                    <button
                      className="clean-action-btn primary"
                      onClick={() => handleStudyTopic(item)}
                    >
                      Review →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Unexplored */}
        {activeTab === "unexplored" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Unexplored Topics ({unvisited.length})</h3>
              <p>Topics waiting for you to discover and start learning.</p>
            </div>
            {unvisited.length === 0 ? (
              <div className="clean-empty-state">
                <span className="empty-icon">🎉</span>
                <p>Amazing! You've explored every single topic in the curriculum.</p>
              </div>
            ) : (
              <div className="clean-unvisited-subjects">
                {Object.keys(unvisitedBySubject).sort().map((subName) => (
                  <div key={subName} className="clean-subject-group">
                    <div className="subject-group-header">
                      <span className="subject-group-title">{subName}</span>
                      <span className="subject-group-count">
                        {unvisitedBySubject[subName].length} topics remaining
                      </span>
                    </div>
                    <div className="clean-topic-list">
                      {unvisitedBySubject[subName].slice(0, 5).map((item, idx) => (
                        <div key={idx} className="clean-topic-item">
                          <div className="clean-topic-details">
                            <span className="clean-topic-name">{item.topic_title}</span>
                            <span className="clean-topic-meta">{item.chapter_title}</span>
                          </div>
                          <button
                            className="clean-action-btn primary"
                            onClick={() => handleStudyTopic(item)}
                          >
                            Start →
                          </button>
                        </div>
                      ))}
                      {unvisitedBySubject[subName].length > 5 && (
                        <div className="more-topics-note">
                          +{unvisitedBySubject[subName].length - 5} more topics in {subName}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

