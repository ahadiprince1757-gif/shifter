import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";
import {
  buildLearningIntelligence,
  calculateCognitiveMastery,
} from "../engine/learningIntelligenceEngine";
import { adaptAnalyticsToEvidence } from "../engine/analyticsEvidenceAdapter";
import ExplainabilityDrawer from "./ExplainabilityDrawer";

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

/**
 * Ring gauge — one visual element, zero redundant labels.
 * The number IS the gauge. The ring IS the progress.
 */
function RingGauge({ score = 0, size = 96 }) {
  const safe = Math.min(Math.max(score || 0, 0), 100);
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - safe / 100);
  const color = safe >= 75 ? "#22c55e" : safe >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <svg width={size} height={size} viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="48" cy="48" r={r} fill="none" stroke="var(--bd, #e2e8f0)" strokeWidth="8" />
      <circle
        cx="48" cy="48" r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke 0.5s ease" }}
      />
      <text
        x="48" y="48"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ transform: "rotate(90deg) translate(0, -96px)", transformOrigin: "48px 48px" }}
        fill="var(--t, #0f172a)"
        fontSize="20"
        fontWeight="800"
        fontFamily="inherit"
      >
        {safe}
      </text>
    </svg>
  );
}

/** Inline spark bar — one-line topic state at a glance */
function SparkBar({ pct = 0, color = "#1d6bf3" }) {
  return (
    <div style={{ height: 3, borderRadius: 99, background: "var(--bd, #e2e8f0)", overflow: "hidden", marginTop: 4 }}>
      <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 99, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

/** Five-channel cognitive visual — no labels that explain nothing */
function CognitiveFiveBar({ dimensions }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 40 }}>
      {dimensions.map((d) => {
        const h = Math.max(4, ((d.val || 0) / 100) * 40);
        return (
          <div key={d.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div
              style={{
                width: "100%",
                height: h,
                borderRadius: "3px 3px 0 0",
                background: d.val ? d.color : "var(--bd, #e2e8f0)",
                transition: "height 1s cubic-bezier(.4,0,.2,1)",
                opacity: d.val ? 1 : 0.4,
              }}
              title={`${d.label}: ${d.val ?? "No data"}%`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dueReviews, setDueReviews] = useState([]);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState([]);
  const [showExplainability, setShowExplainability] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics()
      .then((res) => { setData(res); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
    spacedRepo.getDueReviews(userId).then(setDueReviews).catch(() => {});
    mistakeRepo.getUnresolvedMistakes(userId).then(setUnresolvedMistakes).catch(() => {});
  }, [userId]);

  if (loading) {
    return (
      <div className="adash">
        <div className="adash-skeleton">
          <SkeletonLoader type="list" count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="adash">
        <div className="adash-error">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>Something went wrong. <button onClick={() => window.location.reload()}>Retry</button></p>
        </div>
      </div>
    );
  }

  if (!data) return null;

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

  const isColdStart =
    overview.coldStart ||
    (attempts.length === 0 && dueReviews.length === 0 && unresolvedMistakes.length === 0);

  const handleStudyTopic = (item) => {
    const sid = item.subject_id || item.sid;
    const cid = item.chapter_id || item.chapter_key || item.cid;
    const topic = item.topic_title || item.topic;
    if (sid && cid && topic) navigate(`/learn/${sid}/${cid}/${encodeURIComponent(topic)}`);
    else navigate("/subjects");
  };

  const handlePrimaryAction = () => {
    navigate(recommendation.route || "/subjects");
  };

  const allTopicStats = Object.values(masteryMap?.topics || {});
  const priorityTopics = isColdStart
    ? []
    : [...(masteryMap?.weakTopics || [])].slice(0, 3);

  const cognitiveDimensions = [
    { key: "REC", label: "Recall", val: cognitiveMastery.RECOGNITION?.score, color: "#38bdf8" },
    { key: "RCL", label: "Recall", val: cognitiveMastery.RECALL?.score, color: "#818cf8" },
    { key: "PRO", label: "Procedure", val: cognitiveMastery.PROCEDURAL?.score, color: "#10b981" },
    { key: "APP", label: "Application", val: cognitiveMastery.APPLICATION?.score, color: "#f59e0b" },
    { key: "TRF", label: "Transfer", val: cognitiveMastery.TRANSFER?.score, color: "#ef4444" },
  ];

  const readiness = overview.readinessScore || 0;
  const readinessColor = readiness >= 75 ? "#22c55e" : readiness >= 50 ? "#f59e0b" : "#ef4444";

  // Determine one short, honest status phrase — zero corporate-speak
  const statusPhrase = isColdStart
    ? "No data yet"
    : readiness >= 80
    ? "On track"
    : readiness >= 50
    ? "Building"
    : "Needs work";

  // The ONE thing the learner should do next
  const nextTopic = recommendation.title ? formatTitle(recommendation.title) : null;
  const nextLabel = recommendation.buttonLabel || "Practice";

  return (
    <div className="adash">

      {/* ── HERO: Score + Status ─────────────────────────────── */}
      <div className="adash-hero">
        <div className="adash-hero-left">
          <div className="adash-status-pill" style={{ background: `${readinessColor}18`, color: readinessColor }}>
            {statusPhrase}
          </div>
          {isColdStart ? (
            <>
              <h1 className="adash-big-num" style={{ color: "var(--t, #0f172a)", fontSize: "1.6rem", lineHeight: 1.2 }}>
                Start learning
              </h1>
              <p className="adash-hero-sub">Complete a quiz to see your progress here.</p>
            </>
          ) : (
            <>
              <h1 className="adash-big-num">{readiness}<span className="adash-big-pct">%</span></h1>
              <p className="adash-hero-sub" style={{ color: "var(--t2, #64748b)" }}>
                {totalPasses}/{totalQuizzes} correct
              </p>
            </>
          )}
        </div>

        <div className="adash-hero-right">
          {isColdStart ? (
            <button className="adash-cta adash-cta-primary" onClick={() => navigate("/subjects")}>
              Browse subjects
            </button>
          ) : (
            <RingGauge score={readiness} size={88} />
          )}
        </div>
      </div>

      {/* ── NEXT ACTION: Single focused card ────────────────── */}
      {!isColdStart && nextTopic && (
        <div className="adash-next-card" onClick={handlePrimaryAction}>
          <div className="adash-next-eyebrow">Up next</div>
          <div className="adash-next-topic">{nextTopic}</div>
          <div className="adash-next-footer">
            <span className="adash-next-action-label">{nextLabel} →</span>
            {recommendation.authority === "SERVER_VERIFIED" && (
              <span className="adash-verified-dot" title="Server verified" />
            )}
          </div>
        </div>
      )}

      {/* ── QUICK SIGNALS: 2-column max, tap targets ───────── */}
      {!isColdStart && (
        <div className="adash-signals">
          <button
            className="adash-signal-card"
            onClick={() => navigate("/analytics")}
            aria-label={`${dueReviews.length} reviews due`}
          >
            <div className="adash-signal-num" style={{ color: dueReviews.length > 0 ? "#f59e0b" : "#22c55e" }}>
              {dueReviews.length}
            </div>
            <div className="adash-signal-lbl">Due reviews</div>
          </button>

          <button
            className="adash-signal-card"
            onClick={() => navigate("/mistakes")}
            aria-label={`${unresolvedMistakes.length} mistakes to fix`}
          >
            <div className="adash-signal-num" style={{ color: unresolvedMistakes.length > 0 ? "#ef4444" : "#22c55e" }}>
              {unresolvedMistakes.length}
            </div>
            <div className="adash-signal-lbl">Mistakes</div>
          </button>

          <button
            className="adash-signal-card"
            onClick={() => navigate("/subjects")}
            aria-label={`${accuracyRate}% accuracy`}
          >
            <div className="adash-signal-num">{accuracyRate}%</div>
            <div className="adash-signal-lbl">Accuracy</div>
          </button>
        </div>
      )}

      {/* ── PRIORITY QUEUE: Max 3 items, no tabs ───────────── */}
      {!isColdStart && priorityTopics.length > 0 && (
        <div className="adash-queue">
          <div className="adash-section-label">Focus</div>
          {priorityTopics.map((item, idx) => {
            const title = formatTitle(item.topic_title || item.topic || "Topic");
            const score = item.performanceScore ?? item.mastery ?? 0;
            const barColor = score < 40 ? "#ef4444" : score < 70 ? "#f59e0b" : "#22c55e";
            return (
              <button
                key={idx}
                className="adash-queue-item"
                onClick={() => handleStudyTopic(item)}
              >
                <div className="adash-queue-item-inner">
                  <span className="adash-queue-title">{title}</span>
                  <span className="adash-queue-pct" style={{ color: barColor }}>{score}%</span>
                </div>
                <SparkBar pct={score} color={barColor} />
              </button>
            );
          })}
          <button className="adash-queue-more" onClick={() => navigate("/subjects")}>
            All topics →
          </button>
        </div>
      )}

      {/* ── COGNITIVE BARS: No explanation needed, hover = detail ── */}
      {!isColdStart && (
        <div className="adash-cognitive">
          <div className="adash-section-label">Skill depth</div>
          <CognitiveFiveBar dimensions={cognitiveDimensions} />
          <div className="adash-cognitive-axis">
            {cognitiveDimensions.map((d) => (
              <div key={d.key} className="adash-cognitive-tick" style={{ color: d.val ? d.color : "var(--t3, #94a3b8)" }}>
                {d.key}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cold start CTA */}
      {isColdStart && (
        <button className="adash-cta adash-cta-primary adash-cta-full" onClick={() => navigate("/subjects")}>
          Start your first quiz →
        </button>
      )}

      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        recommendation={recommendation}
        overview={overview}
      />
    </div>
  );
}
