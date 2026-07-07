import { useState, useEffect } from "react";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";

function StatCard({ title, icon, items, valueKey, color }) {
  return (
    <div className="analytics-card" style={{ "--card-accent": color }}>
      <div className="analytics-card-header">
        <span className="analytics-card-icon">{icon}</span>
        <h3 className="analytics-card-title">{title}</h3>
      </div>
      <div className="analytics-card-body">
        {items.length === 0 ? (
          <p className="analytics-empty">No data yet</p>
        ) : (
          <ul className="analytics-list">
            {items.map((item, idx) => (
              <li key={idx} className="analytics-list-item">
                <div className="analytics-list-rank">#{idx + 1}</div>
                <div className="analytics-list-info">
                  <span className="analytics-list-topic">
                    {item.topic_title}
                  </span>
                  <span className="analytics-list-meta">
                    {item.subject_name} › {item.chapter_title}
                  </span>
                </div>
                <div
                  className="analytics-list-count"
                  style={{ color }}
                >
                  {item[valueKey]}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function UnvisitedCard({ items }) {
  const [expanded, setExpanded] = useState(false);
  // Group by subject
  const grouped = {};
  items.forEach((item) => {
    if (!grouped[item.subject_name]) grouped[item.subject_name] = [];
    grouped[item.subject_name].push(item);
  });

  const subjectNames = Object.keys(grouped).sort();
  const displayItems = expanded ? subjectNames : subjectNames.slice(0, 5);

  return (
    <div
      className="analytics-card analytics-card-wide"
      style={{ "--card-accent": "var(--t3)" }}
    >
      <div className="analytics-card-header">
        <span className="analytics-card-icon">🔍</span>
        <h3 className="analytics-card-title">
          Unvisited Topics
          <span className="analytics-badge">{items.length}</span>
        </h3>
      </div>
      <div className="analytics-card-body">
        {items.length === 0 ? (
          <p className="analytics-empty">
            🎉 All topics have been visited!
          </p>
        ) : (
          <>
            {displayItems.map((subjectName) => (
              <div key={subjectName} className="analytics-unvisited-group">
                <h4 className="analytics-unvisited-subject">{subjectName}</h4>
                <div className="analytics-unvisited-chips">
                  {grouped[subjectName].slice(0, 8).map((item, idx) => (
                    <span key={idx} className="analytics-chip">
                      {item.topic_title}
                    </span>
                  ))}
                  {grouped[subjectName].length > 8 && (
                    <span className="analytics-chip analytics-chip-more">
                      +{grouped[subjectName].length - 8} more
                    </span>
                  )}
                </div>
              </div>
            ))}
            {subjectNames.length > 5 && (
              <button
                className="analytics-expand-btn"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? "Show less"
                  : `Show ${subjectNames.length - 5} more subjects`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <h2 className="analytics-hero-title">📊 Learning Analytics</h2>
          <p className="analytics-hero-sub">
            Track learning patterns, identify strengths, and discover areas for
            improvement.
          </p>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <SkeletonLoader type="list" count={4} />
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

  const totalVisits = (data.mostVisited || []).reduce(
    (s, r) => s + (r.visit_count || 0),
    0,
  );
  const totalPasses = (data.mostPassed || []).reduce(
    (s, r) => s + (r.pass_count || 0),
    0,
  );
  const totalFails = (data.mostFailed || []).reduce(
    (s, r) => s + (r.fail_count || 0),
    0,
  );

  return (
    <div className="analytics-dashboard">
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">📊 Learning Analytics</h2>
        <p className="analytics-hero-sub">
          Track learning patterns, identify strengths, and discover areas for
          improvement.
        </p>
      </div>

      <div className="analytics-summary-row">
        <div className="analytics-summary-stat">
          <span className="analytics-summary-num" style={{ color: "#7c5cfc" }}>
            {totalVisits}
          </span>
          <span className="analytics-summary-label">Topic Views</span>
        </div>
        <div className="analytics-summary-stat">
          <span className="analytics-summary-num" style={{ color: "#34d399" }}>
            {totalPasses}
          </span>
          <span className="analytics-summary-label">Correct Answers</span>
        </div>
        <div className="analytics-summary-stat">
          <span className="analytics-summary-num" style={{ color: "#f87171" }}>
            {totalFails}
          </span>
          <span className="analytics-summary-label">Incorrect Answers</span>
        </div>
        <div className="analytics-summary-stat">
          <span className="analytics-summary-num" style={{ color: "var(--t2)" }}>
            {(data.unvisited || []).length}
          </span>
          <span className="analytics-summary-label">Unvisited Topics</span>
        </div>
      </div>

      <div className="analytics-grid">
        <StatCard
          title="Most Visited Topics"
          icon="🔥"
          items={data.mostVisited || []}
          valueKey="visit_count"
          color="#7c5cfc"
        />
        <StatCard
          title="Top Successes"
          icon="✅"
          items={data.mostPassed || []}
          valueKey="pass_count"
          color="#34d399"
        />
        <StatCard
          title="Hardest Topics"
          icon="⚠️"
          items={data.mostFailed || []}
          valueKey="fail_count"
          color="#f87171"
        />
      </div>

      <UnvisitedCard items={data.unvisited || []} />
    </div>
  );
}
