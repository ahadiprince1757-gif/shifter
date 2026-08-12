import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics, fetchAchievements } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";

export default function AnalyticsDashboard() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("focus"); // 'focus' | 'visited' | 'strengths' | 'unexplored' | 'review' | 'mistakes' | 'achievements'
  const [dueReviews, setDueReviews] = useState([]);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [achievements, setAchievements] = useState([]);
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

    // Load local spaced review queue, mistake count, and cloud achievements
    spacedRepo.getDueReviews().then(setDueReviews).catch(() => {});
    mistakeRepo.getUnresolvedMistakes(userId).then((m) => setMistakeCount(m.length)).catch(() => {});
    fetchAchievements().then(setAchievements).catch(() => {});
  }, [userId]);

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

  const TABS = [
    { id: "focus", label: `Focus Areas`, count: mostFailed.length },
    { id: "review", label: `Due for Review`, count: dueReviews.length, highlight: dueReviews.length > 0 },
    { id: "mistakes", label: `Mistake Journal`, count: mistakeCount, highlight: mistakeCount > 0 },
    { id: "visited", label: `Most Studied`, count: mostVisited.length },
    { id: "strengths", label: `Strengths`, count: mostPassed.length },
    { id: "achievements", label: `Achievements`, count: achievements.length },
    { id: "unexplored", label: `Unexplored`, count: unvisited.length },
  ];

  return (
    <div className="analytics-dashboard clean-view">
      {/* Header */}
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">Learning Progress</h2>
        <p className="analytics-hero-sub">
          A clear view of your study habits, quiz accuracy, and recommended practice areas.
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
        <div className="metric-divider" />
        <div className="analytics-metric">
          <span className="metric-val" style={{ color: dueReviews.length > 0 ? "#f59e0b" : "var(--t2)" }}>
            {dueReviews.length}
          </span>
          <span className="metric-lbl">Due for Review</span>
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

      {/* Tab Switcher */}
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

      {/* Tab Panel Content */}
      <div className="analytics-tab-panel">

        {/* TAB: Due for Review (Spaced Repetition Queue) */}
        {activeTab === "review" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Spaced Review Queue</h3>
              <p>
                Topics whose memory retention is scheduled to fade today — revisit them now to reinforce long-term recall.
              </p>
            </div>
            {dueReviews.length === 0 ? (
              <div className="clean-empty-state">
                <p>No reviews due today. Check back after completing more quizzes.</p>
              </div>
            ) : (
              <div className="clean-topic-list">
                {dueReviews.map((item, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">{item.topic_id}</span>
                      <span className="clean-topic-meta">
                        Review interval: {item.interval_days} day{item.interval_days !== 1 ? "s" : ""} · Repetitions: {item.repetitions}
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

        {/* TAB: Mistake Journal */}
        {activeTab === "mistakes" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Mistake Journal</h3>
              <p>Questions you answered incorrectly — revisit topics to resolve them.</p>
            </div>
            {mistakeCount === 0 ? (
              <div className="clean-empty-state">
                <p>No active mistakes. Keep it up.</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ color: "var(--t2)", marginBottom: "1.2rem" }}>
                  You have <strong style={{ color: "var(--t)" }}>{mistakeCount}</strong> unresolved mistake{mistakeCount !== 1 ? "s" : ""} across your quizzes.
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

        {/* TAB: Focus Areas (Needs Review) */}
        {activeTab === "focus" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Topics Needing Review</h3>
              <p>Topics where quiz questions were missed — practice these to improve score.</p>
            </div>
            {mostFailed.length === 0 ? (
              <div className="clean-empty-state">
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

        {/* TAB: Most Studied */}
        {activeTab === "visited" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Frequently Read Topics</h3>
              <p>Topics you have revisited and studied most often.</p>
            </div>
            {mostVisited.length === 0 ? (
              <div className="clean-empty-state">
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

        {/* TAB: Strengths */}
        {activeTab === "strengths" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Mastered Topics</h3>
              <p>Topics where you scored highest and demonstrated mastery.</p>
            </div>
            {mostPassed.length === 0 ? (
              <div className="clean-empty-state">
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

        {/* TAB: Achievements */}
        {activeTab === "achievements" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Earned Achievements ({achievements.length})</h3>
              <p>Milestones and topic masteries saved to your cloud profile.</p>
            </div>
            {achievements.length === 0 ? (
              <div className="clean-empty-state">
                <p>Complete quizzes with 100% score to unlock topic mastery achievements.</p>
              </div>
            ) : (
              <div className="clean-topic-list">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="clean-topic-item">
                    <div className="clean-topic-details">
                      <span className="clean-topic-name">🏆 {ach.achievement_name}</span>
                      <span className="clean-topic-meta">
                        Unlocked {new Date(ach.unlocked_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: Unexplored */}
        {activeTab === "unexplored" && (
          <div className="clean-card">
            <div className="clean-card-header">
              <h3>Unexplored Topics ({unvisited.length})</h3>
              <p>Topics waiting for you to discover and start learning.</p>
            </div>
            {unvisited.length === 0 ? (
              <div className="clean-empty-state">
                <p>You have explored every single topic in the curriculum.</p>
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
