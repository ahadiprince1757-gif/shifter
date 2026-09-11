import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";
import { adaptAnalyticsToEvidence } from "../engine/analyticsEvidenceAdapter";
import { buildLearningIntelligence } from "../engine/learningIntelligenceEngine";
import { navigateToTopic, LEARNING_MODES } from "../utils/learningNavigation";

/** Clean human Title Case */
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

/** Semi-circle arc gauge for clean, immediate visual readiness */
function ReadinessGauge({ score, isColdStart }) {
  const radius = 38;
  const strokeWidth = 7;
  const circumference = Math.PI * radius; // ~119.38
  const safeScore =
    isColdStart || score === null ? 0 : Math.min(Math.max(score, 0), 100);
  const progressOffset = circumference * (1 - safeScore / 100);

  return (
    <div className="analytics-readiness-gauge">
      <svg
        viewBox="0 0 96 54"
        className="analytics-readiness-svg"
        aria-label={`Readiness: ${safeScore}%`}
      >
        <path
          d="M 10 46 A 38 38 0 0 1 86 46"
          fill="none"
          stroke="var(--bd)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M 10 46 A 38 38 0 0 1 86 46"
          fill="none"
          stroke={
            safeScore >= 75
              ? "#10b981"
              : safeScore >= 50
              ? "var(--v)"
              : "#f59e0b"
          }
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="analytics-readiness-val">
        {isColdStart || score === null ? "—" : `${safeScore}%`}
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const userId = session?.user?.id || null;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dueReviews, setDueReviews] = useState([]);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState([]);

  useEffect(() => {
    let live = true;

    Promise.all([
      fetchAnalytics().catch((err) => {
        console.warn("[AnalyticsDashboard] fetchAnalytics fallback:", err);
        return null;
      }),
      (typeof spacedRepo.getDueReviews === "function"
        ? spacedRepo.getDueReviews(userId)
        : typeof spacedRepo.getDueItems === "function"
        ? spacedRepo.getDueItems(userId)
        : Promise.resolve([])
      ).catch(() => []),
      (typeof mistakeRepo.getUnresolvedMistakes === "function"
        ? mistakeRepo.getUnresolvedMistakes(userId)
        : typeof mistakeRepo.getUnresolved === "function"
        ? mistakeRepo.getUnresolved(userId)
        : Promise.resolve([])
      ).catch(() => []),
    ])
      .then(([analytics, reviews, mistakes]) => {
        if (!live) return;
        setData(analytics);
        setDueReviews(reviews || []);
        setUnresolvedMistakes(mistakes || []);
      })
      .catch(() => {
        if (live) setError("Could not load analytics.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });

    return () => {
      live = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="analytics-min-container">
        <div className="analytics-min-header">
          <h1 className="analytics-min-title">Progress</h1>
          <p className="analytics-min-sub">Loading your learning stats...</p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <SkeletonLoader type="list" count={3} />
        </div>
      </div>
    );
  }

  // Derive evidence and intelligence
  const evidence = data ? adaptAnalyticsToEvidence(data) : { attempts: [] };
  const attempts = evidence.attempts || [];
  const intelligence = buildLearningIntelligence({
    attempts,
    dueReviews,
    unresolvedMistakes,
  });

  const { overview } = intelligence;
  const totalQuizzes = attempts.length;
  const totalPasses = attempts.filter((a) => a.correct).length;
  const accuracyRate =
    totalQuizzes > 0 ? Math.round((totalPasses / totalQuizzes) * 100) : null;
  const isColdStart =
    totalQuizzes === 0 && dueReviews.length === 0 && unresolvedMistakes.length === 0;

  const weakTopics = intelligence?.masteryMap?.weakTopics || [];
  const strongTopics = intelligence?.masteryMap?.strongTopics || [];

  // Determine readiness score & status
  const readinessScore =
    overview.readinessScore ??
    (isColdStart ? null : Math.round((accuracyRate || 0) * 0.9));

  let statusType = "unmeasured";
  let readinessLabel = "Not Measured";
  let readinessDiagnosis =
    "Complete your first quiz to calculate your learning readiness.";

  if (!isColdStart) {
    if (totalQuizzes < 5) {
      statusType = "calibrating";
      readinessLabel = "Calibrating";
      readinessDiagnosis = "Complete a few more quizzes to lock in your score.";
    } else if (overview.isReady || (readinessScore !== null && readinessScore >= 75)) {
      statusType = "ready";
      readinessLabel = "Exam Ready";
      readinessDiagnosis = "Core concepts understood. Ready for higher-level topics.";
    } else {
      statusType = "practice";
      readinessLabel = "Needs Practice";
      readinessDiagnosis =
        weakTopics[0]
          ? `Focus on: ${formatTitle(weakTopics[0].topic_title || weakTopics[0].topic)}.`
          : "Work on active mistakes to increase readiness.";
    }
  }

  // Top priority focus
  const topFocus =
    weakTopics[0] ||
    (intelligence.recommendation?.title ? intelligence.recommendation : null);

  const handleStudyTopic = (item) => {
    const subjectId = item.subject_id || item.sid;
    const chapterId = item.chapter_id || item.chapter_key || item.cid;
    const topicId = item.topic_title || item.topic || item.title;

    navigateToTopic(navigate, {
      subjectId,
      chapterId,
      topicId,
      mode: LEARNING_MODES.MISTAKE_REPAIR,
      source: "analytics_dashboard",
    });
  };

  return (
    <div className="analytics-min-container">
      {/* 1. CLEAN HEADER */}
      <header className="analytics-min-header">
        <h1 className="analytics-min-title">Progress</h1>
        <p className="analytics-min-sub">
          {isColdStart
            ? "Your learning stats will appear as you practice."
            : `${totalQuizzes} questions answered`}
        </p>
      </header>

      {/* 2. MINIMALIST READINESS HERO */}
      <div className="analytics-readiness-card">
        <div className="analytics-readiness-left">
          <div className="analytics-readiness-kicker">Exam Readiness</div>
          <div className="analytics-readiness-status-row">
            <span
              className={`analytics-status-pill analytics-status-pill--${statusType}`}
            >
              <span className="analytics-status-dot" />
              {readinessLabel}
            </span>
          </div>
          <p className="analytics-readiness-sub">{readinessDiagnosis}</p>
        </div>

        <ReadinessGauge score={readinessScore} isColdStart={isColdStart} />
      </div>

      {/* 3. STATS AT A GLANCE */}
      <div className="analytics-min-grid">
        {/* Accuracy */}
        <div className="analytics-stat-card">
          <div className="analytics-stat-val">
            {accuracyRate !== null ? `${accuracyRate}%` : "—"}
          </div>
          <div className="analytics-stat-lbl">Accuracy</div>
          <div className="analytics-stat-sub">
            {totalQuizzes > 0
              ? `${totalPasses} of ${totalQuizzes} correct`
              : "No quizzes yet"}
          </div>
        </div>

        {/* Active Mistakes */}
        <div
          className={`analytics-stat-card ${
            unresolvedMistakes.length > 0 ? "analytics-stat-card--actionable" : ""
          }`}
          onClick={() => navigate("/mistakes")}
          role="button"
          tabIndex={0}
        >
          <div className="analytics-stat-val">{unresolvedMistakes.length}</div>
          <div className="analytics-stat-lbl">Mistakes</div>
          <div className="analytics-stat-sub">
            {unresolvedMistakes.length > 0 ? "Tap to repair →" : "All clear"}
          </div>
        </div>

        {/* Reviews Due */}
        <div
          className={`analytics-stat-card ${
            dueReviews.length > 0 ? "analytics-stat-card--actionable" : ""
          }`}
          onClick={() => {
            if (dueReviews.length > 0 && dueReviews[0]) {
              handleStudyTopic(dueReviews[0]);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="analytics-stat-val">{dueReviews.length}</div>
          <div className="analytics-stat-lbl">Reviews Due</div>
          <div className="analytics-stat-sub">
            {dueReviews.length > 0 ? "Tap to review →" : "Up to date"}
          </div>
        </div>
      </div>

      {/* 4. PRIMARY ACTION: WHAT TO DO NEXT */}
      {isColdStart ? (
        <div className="analytics-focus-card">
          <div className="analytics-focus-kicker">Next Step</div>
          <h2 className="analytics-focus-title">Start your first quiz</h2>
          <p className="analytics-focus-desc">
            Choose any subject to test your knowledge. We’ll pinpoint exactly what you know and where to focus.
          </p>
          <button
            className="analytics-focus-btn"
            onClick={() => navigate("/subjects")}
          >
            Browse Subjects →
          </button>
        </div>
      ) : topFocus ? (
        <div className="analytics-focus-card">
          <div className="analytics-focus-kicker">Recommended Next Step</div>
          <h2 className="analytics-focus-title">
            {formatTitle(topFocus.topic_title || topFocus.topic || topFocus.title)}
          </h2>
          <p className="analytics-focus-desc">
            {formatTitle(topFocus.subject_name || topFocus.subject_id || topFocus.subject)}
            {topFocus.performanceScore !== undefined
              ? ` · ${topFocus.performanceScore}% mastery`
              : ""}
          </p>
          <button
            className="analytics-focus-btn"
            onClick={() => handleStudyTopic(topFocus)}
          >
            Practice This Topic →
          </button>
        </div>
      ) : (
        <div className="analytics-focus-card analytics-focus-card--clean">
          <div className="analytics-focus-kicker">Great Work</div>
          <h2 className="analytics-focus-title">You're caught up!</h2>
          <p className="analytics-focus-desc">
            No critical gaps found. Continue learning new chapters to keep making progress.
          </p>
          <button
            className="analytics-focus-btn"
            onClick={() => navigate("/subjects")}
          >
            Continue Learning →
          </button>
        </div>
      )}

      {/* 5. WEAK TOPICS LIST (DIRECT TO THE POINT) */}
      {weakTopics.length > 0 && (
        <div className="analytics-section">
          <div className="analytics-section-title">Topics Needing Review</div>
          <div className="analytics-topic-list">
            {weakTopics.slice(0, 4).map((topic, i) => (
              <div
                key={i}
                className="analytics-topic-row"
                onClick={() => handleStudyTopic(topic)}
                role="button"
                tabIndex={0}
              >
                <div className="analytics-topic-info">
                  <div className="analytics-topic-name">
                    {formatTitle(topic.topic_title || topic.topic)}
                  </div>
                  <div className="analytics-topic-sub">
                    {formatTitle(topic.subject_name || topic.subject_id)} ·{" "}
                    {topic.performanceScore ?? 0}% mastery
                  </div>
                </div>
                <span className="analytics-row-action">Practice →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MASTERED TOPICS SUMMARY */}
      {strongTopics.length > 0 && (
        <div className="analytics-mastered-bar">
          <span className="analytics-mastered-check">✓</span>
          <span>
            <strong>{strongTopics.length}</strong> topic{strongTopics.length === 1 ? "" : "s"} mastered
          </span>
        </div>
      )}
    </div>
  );
}
