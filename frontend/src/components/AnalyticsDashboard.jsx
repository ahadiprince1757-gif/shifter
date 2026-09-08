import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import { calculateCBCGrade } from "../engine/cbcGrading";
import {
  buildLearningIntelligence,
  calculateCognitiveMastery,
} from "../engine/learningIntelligenceEngine";
import { adaptAnalyticsToEvidence } from "../engine/analyticsEvidenceAdapter";
import ExplainabilityDrawer from "./ExplainabilityDrawer";
import { navigateToTopic, LEARNING_MODES } from "../utils/learningNavigation";

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

/** Semi-Circle Arc Gauge SVG Component (Clean visual indicator of learning readiness) */
function ReadinessArcGauge({ score = 0 }) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // ~125.66
  const safeScore = Math.min(Math.max(score || 0, 0), 100);
  const progressOffset = circumference * (1 - safeScore / 100);

  return (
    <div className="readiness-gauge-wrapper">
      <svg viewBox="0 0 100 56" className="readiness-arc-svg" aria-label={`Readiness gauge: ${safeScore}%`}>
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
          stroke="var(--primary, #1d6bf3)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
        />
      </svg>
    </div>
  );
}

/** Dedicated Hero Card for New Users (No learning evidence yet) */
function ColdStartReadiness({ onBrowseSubjects }) {
  return (
    <div className="readiness-v2-card cold-start-card">
      <div className="cold-start-content">
        <div className="readiness-v2-label">LEARNING READINESS</div>
        <h2 className="cold-start-title">Start your learning journey</h2>
        <p className="cold-start-desc">
          Complete your first topic quiz to begin building your personalized learning profile and readiness diagnosis.
        </p>
        <button
          className="repair-gap-v2-btn"
          style={{ marginTop: "0.85rem", alignSelf: "flex-start" }}
          onClick={onBrowseSubjects}
        >
          Browse Subjects →
        </button>
      </div>
    </div>
  );
}

/** Curriculum tree preview (always rendered for curriculum exploration) */
function CurriculumExplorer({ curriculum, onNavigate }) {
  const [expanded, setExpanded] = useState({});

  if (!curriculum || curriculum.length === 0) return null;

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="adash-curriculum">
      <div className="adash-curriculum-header">
        <h3 className="adash-curriculum-title">Curriculum Explorer</h3>
        <span className="adash-curriculum-sub">Preview all available subjects & chapters</span>
      </div>
      {curriculum.map((subject) => (
        <div key={subject.id} className="adash-curriculum-subject">
          <button
            className="adash-curriculum-subject-row"
            onClick={() => toggle(subject.id)}
            aria-expanded={!!expanded[subject.id]}
          >
            <span className="adash-curriculum-subject-name">{subject.label}</span>
            <span className="adash-curriculum-chevron">
              {expanded[subject.id] ? "▴" : "▾"}
            </span>
          </button>
          {expanded[subject.id] && (
            <div className="adash-curriculum-chapters">
              {subject.chapters.map((ch) => (
                <button
                  key={ch.id}
                  className="adash-curriculum-chapter-row"
                  onClick={() => onNavigate(`/subjects/${subject.id}`)}
                >
                  {formatTitle(ch.label || ch.id)}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { curriculum } = useCurriculum();
  const userId = session?.user?.id || null;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicFilterTab, setTopicFilterTab] = useState("needs_attention"); // 'needs_attention' | 'emerging' | 'strong'
  const [dueReviews, setDueReviews] = useState([]);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState([]);
  const [showCognitiveDetails, setShowCognitiveDetails] = useState(false);
  const [showExplainability, setShowExplainability] = useState(false);

  useEffect(() => {
    let live = true;

    Promise.all([
      fetchAnalytics().catch((err) => {
        console.error("Failed to load analytics", err);
        return null;
      }),
      (typeof spacedRepo.getDueReviews === "function"
        ? spacedRepo.getDueReviews(userId)
        : typeof spacedRepo.getDueItems === "function"
        ? spacedRepo.getDueItems(userId)
        : Promise.resolve([])
      ).catch((err) => {
        console.warn("[AnalyticsDashboard] Failed to fetch due reviews:", err);
        return [];
      }),
      (typeof mistakeRepo.getUnresolvedMistakes === "function"
        ? mistakeRepo.getUnresolvedMistakes(userId)
        : typeof mistakeRepo.getUnresolved === "function"
        ? mistakeRepo.getUnresolved(userId)
        : Promise.resolve([])
      ).catch((err) => {
        console.warn("[AnalyticsDashboard] Failed to fetch unresolved mistakes:", err);
        return [];
      }),
    ])
      .then(([analytics, reviews, mistakes]) => {
        if (!live) return;
        if (!analytics) {
          setError("Failed to load analytics. Please try again.");
        }
        setData(analytics);
        setDueReviews(reviews || []);
        setUnresolvedMistakes(mistakes || []);
      })
      .catch((err) => {
        console.error("[AnalyticsDashboard] Error loading analytics data:", err);
        if (live) setError("Failed to load analytics. Please try again.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });

    return () => { live = false; };
  }, [userId]);

  if (loading) {
    return (
      <div className="analytics-v2-container">
        <div className="analytics-v2-header">
          <h1 className="analytics-v2-title">My Learning</h1>
          <p className="analytics-v2-sub">Analyzing learning evidence and readiness...</p>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={3} />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="analytics-v2-container">
        <div className="analytics-error-box">
          <p>{error}</p>
          <button
            className="repair-gap-v2-btn"
            style={{ marginTop: "0.8rem" }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Adapt backend data to canonical evidence (no artificial attempt synthesis)
  const evidence = adaptAnalyticsToEvidence(data);
  const attempts = evidence.attempts;

  const intelligence = buildLearningIntelligence({
    attempts,
    dueReviews,
    unresolvedMistakes,
    authoritativeDecision: evidence.authoritativeDecision,
    authority: evidence.authority,
  });

  const { overview, masteryMap, recommendation } = intelligence;
  const cognitiveMastery = intelligence.cognitiveMastery || {};

  const totalPasses = attempts.filter((a) => a.correct).length;
  const totalQuizzes = attempts.length;
  const accuracyRate = overview.accuracy;
  const cbc = calculateCBCGrade(accuracyRate || 0);

  // Strict Cold-Start Determination from evidence
  const isColdStart =
    overview.coldStart ||
    (attempts.length === 0 && dueReviews.length === 0 && unresolvedMistakes.length === 0);

  const readinessScore = overview.readinessScore ?? (isColdStart ? 0 : Math.round((accuracyRate || 0) * 0.9));
  const readinessLabel = isColdStart
    ? "Unmeasured"
    : totalQuizzes < 5
    ? "We're Still Learning Your Strengths"
    : overview.isReady
    ? "Ready to progress"
    : "Not ready yet";

  const handleStudyTopic = (item, mode = LEARNING_MODES.MISTAKE_REPAIR) => {
    const subjectId = item.subject_id || item.sid;
    const chapterId = item.chapter_id || item.chapter_key || item.cid;
    const topicId   = item.topic_title || item.topic;

    navigateToTopic(navigate, {
      subjectId,
      chapterId,
      topicId,
      mode,
      source: "analytics_dashboard",
    });
  };

  const handlePrimaryAction = () => {
    if (recommendation?.route) {
      navigate(recommendation.route);
    } else {
      navigate("/subjects");
    }
  };

  // Compile topic lists for "The Focus Queue" using evidence-backed thresholds
  const allTopicStats = Object.values(masteryMap?.topics || {});

  // Needs Attention: Confirmed weak topics (>= 3 attempts, < 58% score)
  const needsAttentionList = isColdStart ? [] : (masteryMap?.weakTopics || []);

  // Emerging: Topics with signal but insufficient evidence (1-2 attempts)
  const emergingList = isColdStart
    ? []
    : allTopicStats.filter((t) => t.attempts < 3 && t.performanceScore < 58);

  // Strong: Verified mastery (>= 5 attempts, >= 75% score)
  const strongList = isColdStart ? [] : (masteryMap?.strongTopics || []);

  let currentFilteredList = needsAttentionList;
  if (topicFilterTab === "emerging" || topicFilterTab === "weak") {
    currentFilteredList = emergingList;
  } else if (topicFilterTab === "strong") {
    currentFilteredList = strongList;
  }

  const cognitiveDimensions = [
    { label: "Recognition", val: cognitiveMastery.RECOGNITION?.score, count: cognitiveMastery.RECOGNITION?.evidenceCount, color: "#38bdf8" },
    { label: "Recall", val: cognitiveMastery.RECALL?.score, count: cognitiveMastery.RECALL?.evidenceCount, color: "#818cf8" },
    { label: "Procedure", val: cognitiveMastery.PROCEDURAL?.score, count: cognitiveMastery.PROCEDURAL?.evidenceCount, color: "#10b981" },
    { label: "Application", val: cognitiveMastery.APPLICATION?.score, count: cognitiveMastery.APPLICATION?.evidenceCount, color: "#f59e0b" },
    { label: "Transfer", val: cognitiveMastery.TRANSFER?.score, count: cognitiveMastery.TRANSFER?.evidenceCount, color: "#ef4444" },
  ];

  return (
    <div className="analytics-v2-container">
      {/* 0. HEADER */}
      <header className="analytics-v2-header">
        <div className="analytics-v2-brand">
          <div className="analytics-v2-logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="analytics-v2-title">My Learning</h1>
            <p className="analytics-v2-sub">Actionable intelligence for your next step.</p>
          </div>
        </div>
      </header>

      {/* LEVEL 1: READINESS & ACTION HERO CARD */}
      {isColdStart ? (
        <ColdStartReadiness onBrowseSubjects={() => navigate("/subjects")} />
      ) : (
        <div className="readiness-v2-card">
          <div className="readiness-v2-top">
            <div className="readiness-v2-info">
              <div className="readiness-v2-label">LEARNING READINESS</div>
              <div className="readiness-v2-score">{readinessScore}%</div>
              <div className="readiness-v2-status">{readinessLabel}</div>
              <div className="readiness-v2-subtext">
                {recommendation?.title
                  ? `Your biggest gap is: ${formatTitle(recommendation.title)}`
                  : "All core prerequisites met"}
              </div>
            </div>

            <ReadinessArcGauge score={readinessScore} />
          </div>

          {/* Human-Centered Next Step Banner */}
          <div className="primary-bottleneck-v2-banner">
            <div className="bottleneck-v2-content">
              <div className="bottleneck-v2-tag-row">
                <span className="bottleneck-v2-tag">
                  {recommendation?.type === "critical_gap"
                    ? "FOUNDATIONAL FOCUS"
                    : recommendation?.type === "calibrating"
                    ? "CALIBRATING"
                    : recommendation?.action === "NO_ACTION"
                    ? "PROGRESSING SMOOTHLY"
                    : "RECOMMENDED NEXT STEP"}
                </span>
                <span
                  className={`authority-v2-pill ${
                    recommendation?.authority === "SERVER_VERIFIED" ? "verified" : "provisional"
                  }`}
                >
                  <span className="authority-pill-dot" />
                  {recommendation?.authority === "SERVER_VERIFIED" ? "Server Verified" : "Offline Provisional"}
                </span>
              </div>
              <div className="bottleneck-v2-title">
                {formatTitle(recommendation?.title || "Continue Practice")}
              </div>
              <div className="bottleneck-v2-desc">
                {recommendation?.reason || "Complete additional practice to build your readiness profile."}
              </div>
              <button
                type="button"
                className="why-am-i-seeing-this-link"
                onClick={() => setShowExplainability(true)}
              >
                Why am I seeing this? (View Evidence & Rules) →
              </button>
            </div>
            <button className="repair-gap-v2-btn" onClick={handlePrimaryAction}>
              {recommendation?.buttonLabel || "Practice Now"} →
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 2: ESSENTIAL SIGNALS GRID */}
      <div className="metrics-v2-grid">
        <div className="metric-v2-card">
          <div className="metric-v2-val">{isColdStart ? "—" : `${accuracyRate ?? 0}%`}</div>
          <div className="metric-v2-lbl">Quiz Accuracy</div>
          <div className="metric-v2-sub">
            {isColdStart ? "No attempts yet" : `${totalPasses} / ${totalQuizzes} correct`}
          </div>
        </div>

        <div className="metric-v2-card" onClick={() => navigate("/analytics")}>
          <div className="metric-v2-val">{dueReviews.length}</div>
          <div className="metric-v2-lbl">Due Reviews</div>
          <div className="metric-v2-sub">
            {dueReviews.length > 0 ? "Review now" : "All clean!"}
          </div>
        </div>

        <div className="metric-v2-card" onClick={() => navigate("/mistakes")}>
          <div className="metric-v2-val">{unresolvedMistakes.length}</div>
          <div className="metric-v2-lbl">Active Mistakes</div>
          <div className="metric-v2-sub">
            {unresolvedMistakes.length > 0 ? "Review now" : "All clean!"}
          </div>
        </div>
      </div>

      {/* LEVEL 3: THE FOCUS QUEUE (Top 3 Priority Topics) */}
      <div className="topics-focus-v2-card">
        <div className="topics-v2-header">
          <div>
            <h2 className="topics-v2-title">Your Next Focus</h2>
            <p className="topics-v2-sub">Top priority steps for maximum score impact</p>
          </div>
        </div>

        {/* Filter Tabs (Pill Buttons) */}
        {!isColdStart && (
          <div className="topic-filter-v2-pills">
            <button
              className={`filter-v2-pill ${topicFilterTab === "needs_attention" ? "active" : ""}`}
              onClick={() => setTopicFilterTab("needs_attention")}
            >
              Needs Attention ({needsAttentionList.length})
            </button>
            <button
              className={`filter-v2-pill ${topicFilterTab === "emerging" ? "active" : ""}`}
              onClick={() => setTopicFilterTab("emerging")}
            >
              Emerging ({emergingList.length})
            </button>
            <button
              className={`filter-v2-pill ${topicFilterTab === "strong" ? "active" : ""}`}
              onClick={() => setTopicFilterTab("strong")}
            >
              Strong ({strongList.length})
            </button>
          </div>
        )}

        {/* Focus Queue Items */}
        <div className="topic-v2-list">
          {isColdStart ? (
            <div className="topic-v2-empty" style={{ padding: "1.2rem 0" }}>
              <p style={{ fontWeight: 600, color: "var(--t)" }}>No focus areas recorded yet</p>
              <p style={{ marginTop: "0.25rem", fontSize: "0.82rem", color: "var(--t2)" }}>
                Your personalized focus queue will appear here as you complete quizzes and build learning evidence.
              </p>
              <button
                className="topic-action-pill-btn"
                style={{ marginTop: "0.85rem", padding: "0.4rem 0.9rem" }}
                onClick={() => navigate("/subjects")}
              >
                Browse Subjects →
              </button>
            </div>
          ) : currentFilteredList.length === 0 ? (
            <div className="topic-v2-empty">
              <p>No topics currently require attention in this category.</p>
            </div>
          ) : (
            currentFilteredList.slice(0, 3).map((item, idx) => {
              const title = formatTitle(item.topic_title || item.topic || "Topic");
              const subject = formatTitle(item.subject_name || item.subject_id || "Science");
              const chapter = formatTitle(item.chapter_title || item.chapter_id || "Practical Skills");
              const score = item.performanceScore ?? item.mastery ?? 0;
              const actionLabel = topicFilterTab === "strong" ? "Review" : score < 40 ? "Repair" : "Practice";
              // Strong topics don't need repair mode — open Notes normally
              const navMode = topicFilterTab === "strong"
                ? LEARNING_MODES.NORMAL
                : LEARNING_MODES.MISTAKE_REPAIR;

              return (
                <div
                  key={idx}
                  className="topic-v2-item"
                  onClick={() => handleStudyTopic(item, navMode)}
                >
                  <div className="topic-v2-item-main">
                    <div className="topic-v2-item-title">{idx + 1}. {title}</div>
                    <div className="topic-v2-item-sub">
                      {subject} • {chapter} ({score}% mastery)
                    </div>
                  </div>
                  <div className="topic-v2-item-right">
                    <button className="topic-action-pill-btn">
                      {actionLabel} →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* View All Topics Button */}
        <button
          className="explore-weak-v2-btn"
          onClick={() => navigate("/subjects")}
        >
          <span>{isColdStart ? "Explore Subject Catalog" : `View all ${currentFilteredList.length} topics`}</span>
          <span className="explore-v2-chevron">→</span>
        </button>
      </div>

      {/* LEVEL 4: DEEP INTELLIGENCE (Collapsed Analytics Drawer) */}
      <div className="cognitive-collapsible-v2">
        <button
          className="cognitive-v2-toggle"
          onClick={() => setShowCognitiveDetails(!showCognitiveDetails)}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            Deep Learning Intelligence & Evidence
          </span>
          <span>{showCognitiveDetails ? "▲" : "▼"}</span>
        </button>

        {showCognitiveDetails && (
          <div className="cognitive-v2-body">
            {isColdStart ? (
              <div style={{ padding: "1.2rem 0", textAlign: "center", color: "var(--t2)", fontSize: "0.85rem" }}>
                Learning evidence and cognitive dimension scores will appear here after your first topic quiz.
              </div>
            ) : (
              <>
                {/* Evidence Confidence Tag */}
                <div
                  className="deep-evidence-meta"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "0.6rem",
                  }}
                >
                  <span style={{ fontSize: "0.82rem", color: "var(--t2)" }}>
                    Evidence Confidence:{" "}
                    <strong style={{ color: "var(--primary, #1d6bf3)" }}>
                      {overview.evidenceConfidence || "CALIBRATING"}
                    </strong>
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--t3, #94a3b8)" }}>
                    Measured from attempt history
                  </span>
                </div>

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
                  <div
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "var(--t)",
                      marginTop: "0.4rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Cognitive Mastery Dimensions
                  </div>
                  {cognitiveDimensions.map((dim) => (
                    <div key={dim.label} className="cognitive-v2-row">
                      <div className="cognitive-v2-label">
                        <span>{dim.label}</span>
                        <span style={{ fontWeight: 700, color: "var(--t)" }}>
                          {dim.val !== null
                            ? `${dim.val}% (${dim.count} question${dim.count > 1 ? "s" : ""})`
                            : "No evidence yet"}
                        </span>
                      </div>
                      <div className="cognitive-v2-track">
                        <div
                          className="cognitive-v2-fill"
                          style={{
                            width: `${dim.val || 0}%`,
                            background: "var(--primary, #1d6bf3)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* LEVEL 5: CURRICULUM EXPLORER (Always visible) */}
      <CurriculumExplorer
        curriculum={curriculum}
        onNavigate={navigate}
      />

      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        recommendation={recommendation}
        overview={overview}
      />
    </div>
  );
}
