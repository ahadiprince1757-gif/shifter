import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../api";
import SkeletonLoader from "./SkeletonLoader";
import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import {
  buildLearningIntelligence,
  calculateCognitiveMastery,
} from "../engine/learningIntelligenceEngine";
import { adaptAnalyticsToEvidence } from "../engine/analyticsEvidenceAdapter";
import ExplainabilityDrawer from "./ExplainabilityDrawer";

// ─────────────────────────────────────────────────────────────────────────────
// TIXAR COLOR LAW + ACCESSIBILITY CONTRACT
//
// Rule 1: Color is never the only signal channel.
//         Every colored value is paired with an icon or text label.
//         Removing all color must leave meaning fully intact.
//
// Rule 2: Colors are muted/tinted — not saturated primaries.
//         People with color aversions, colour blindness, or cultural
//         associations that differ from the designer's assumptions must
//         never be confused or distressed by the palette.
//
//  neutral (#64748b)  → NO_EVIDENCE. Nothing measured yet. No judgment.
//  ink     (#1d4ed8)  → Navigation and primary actions.
//  teal    (#0d9488)  → Demonstrated progress or mastery.   (replaces green — avoids red/green blindness)
//  ochre   (#b45309)  → Attention recommended.              (replaces amber — less alarming)
//  crimson (#be123c)  → Genuine problem requiring action.   (replaces red — more muted)
// ─────────────────────────────────────────────────────────────────────────────
const COLOR = {
  neutral: "#64748b",  // no evidence
  ink:     "#1d4ed8",  // primary action (blue family)
  teal:    "#0d9488",  // progress / mastery (distinguishable from crimson for all CVD types)
  ochre:   "#b45309",  // attention (warm, not alarming)
  crimson: "#be123c",  // urgent (dark enough to contrast on white, not screamingly saturated)
};

// ── Signal semantics: each signal has an icon so meaning is not color-only ────
// icon: ● = neutral/no data  ✓ = good  ▲ = needs action  ✗ = needs resolution
function signalConfig(value, type) {
  if (type === "reviews") {
    if (value === 0) return { color: COLOR.neutral, icon: "●", iconLabel: "none due" };
    return { color: COLOR.ochre, icon: "▲", iconLabel: `${value} due` };
  }
  if (type === "mistakes") {
    if (value === 0) return { color: COLOR.neutral, icon: "●", iconLabel: "none" };
    return { color: COLOR.crimson, icon: "✗", iconLabel: `${value} to fix` };
  }
  if (type === "accuracy") {
    if (value === null) return { color: COLOR.neutral, icon: "●", iconLabel: "not measured" };
    if (value >= 70) return { color: COLOR.teal,    icon: "✓", iconLabel: "strong" };
    if (value >= 50) return { color: COLOR.ochre,   icon: "▲", iconLabel: "improving" };
    return { color: COLOR.crimson, icon: "▲", iconLabel: "needs work" };
  }
  return { color: COLOR.neutral, icon: "●", iconLabel: "" };
}

function formatTitle(str) {
  if (!str) return "";
  if (!str.includes("_") && !str.includes("-") && /[a-z]/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str
    .replace(/[_-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// ── Ring gauge ────────────────────────────────────────────────────────────────
function RingGauge({ score, size = 88, color }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
      <circle cx="40" cy="40" r={r} fill="none" stroke="var(--ring-track, rgba(0,0,0,0.06))" strokeWidth="6" />
      <circle
        cx="40" cy="40" r={r} fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 40 40)"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }}
      />
    </svg>
  );
}

// ── Spark bar (single horizontal fill) ───────────────────────────────────────
function SparkBar({ pct, color }) {
  return (
    <div className="adash-spark-track">
      <div
        className="adash-spark-fill"
        style={{ width: `${Math.max(2, pct)}%`, background: color }}
      />
    </div>
  );
}

// ── Five cognitive bars ───────────────────────────────────────────────────────
function CognitiveFiveBar({ dimensions }) {
  return (
    <div className="adash-five-bars">
      {dimensions.map((d) => (
        <div key={d.key} className="adash-five-bar-col">
          <div className="adash-five-bar-track">
            <div
              className="adash-five-bar-fill"
              style={{
                height: `${d.val || 0}%`,
                background: d.val ? d.color : "var(--divider, #e2e8f0)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Curriculum tree (always rendered) ────────────────────────────────────────
function CurriculumExplorer({ curriculum, onNavigate }) {
  const [expanded, setExpanded] = useState({});

  if (!curriculum || curriculum.length === 0) return null;

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="adash-curriculum">
      <div className="adash-section-label">Ready to explore</div>
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { curriculum } = useCurriculum();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dueReviews, setDueReviews] = useState([]);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState([]);
  const [showExplainability, setShowExplainability] = useState(false);

  useEffect(() => {
    let live = true;
    Promise.all([
      fetchAnalytics(),
      spacedRepo.getDueItems(session?.user?.id),
      mistakeRepo.getUnresolved(session?.user?.id),
    ])
      .then(([analytics, reviews, mistakes]) => {
        if (!live) return;
        setData(analytics);
        setDueReviews(reviews || []);
        setUnresolvedMistakes(mistakes || []);
      })
      .catch(() => { if (live) setData(null); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [session?.user?.id]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="adash">
        <SkeletonLoader type="card" count={3} />
      </div>
    );
  }

  // ── Build intelligence from evidence ─────────────────────────────────────
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

  // ── Constitutional state derivation ──────────────────────────────────────
  // Always use overview.learnerState. Never re-derive from raw scores.
  const learnerState = overview.learnerState; // NOT_STARTED | EARLY_EVIDENCE | PROGRESSING | NEEDS_SUPPORT

  const totalPasses = attempts.filter((a) => a.correct).length;
  const totalQuizzes = attempts.length;

  // ── Status config: icon + muted color for the hero pill ─────────────────
  const statusConfig = {
    NOT_STARTED:    { label: "Ready to begin",  icon: "○", color: COLOR.neutral, bgAlpha: "10" },
    EARLY_EVIDENCE: { label: "Calibrating",     icon: "◐", color: COLOR.ink,     bgAlpha: "12" },
    PROGRESSING:    { label: "On track",        icon: "✓", color: COLOR.teal,    bgAlpha: "12" },
    NEEDS_SUPPORT:  { label: "Needs attention", icon: "▲", color: COLOR.ochre,   bgAlpha: "12" },
  }[learnerState] || { label: "Ready to begin", icon: "○", color: COLOR.neutral, bgAlpha: "10" };

  const readiness = overview.readinessScore || 0;

  // ── Cognitive dimensions: single ink hue at varying opacity ──────────────
  // Using one color family avoids the "what does each color mean?" problem
  // while height of the bar already carries the magnitude signal.
  const cognitiveDimensions = [
    { key: "REC", label: "Recognition", val: cognitiveMastery.RECOGNITION?.score, color: COLOR.ink  },
    { key: "RCL", label: "Recall",      val: cognitiveMastery.RECALL?.score,       color: COLOR.ink  },
    { key: "PRO", label: "Procedure",   val: cognitiveMastery.PROCEDURAL?.score,   color: COLOR.teal },
    { key: "APP", label: "Application", val: cognitiveMastery.APPLICATION?.score,  color: COLOR.teal },
    { key: "TRF", label: "Transfer",    val: cognitiveMastery.TRANSFER?.score,     color: COLOR.ochre },
  ];

  // Evidence-based topic queue (only shown when there is evidence)
  const priorityTopics = learnerState !== "NOT_STARTED"
    ? [...(masteryMap?.weakTopics || [])].slice(0, 3)
    : [];

  const hasEvidence  = learnerState !== "NOT_STARTED";
  const hasInsights  = learnerState === "PROGRESSING" || learnerState === "NEEDS_SUPPORT";
  const nextTopic    = recommendation?.title ? formatTitle(recommendation.title) : null;

  // ── Signal configs: icon + muted color, never color alone ────────────────
  const reviewSig   = signalConfig(dueReviews.length, "reviews");
  const mistakeSig  = signalConfig(unresolvedMistakes.length, "mistakes");
  const accuracySig = signalConfig(hasEvidence ? (overview.accuracy ?? 0) : null, "accuracy");

  const handleStudyTopic = (item) => {
    const sid = item.subject_id || item.sid;
    const cid = item.chapter_id || item.chapter_key || item.cid;
    const topic = item.topic_title || item.topic;
    if (sid && cid && topic) navigate(`/learn/${sid}/${cid}/${encodeURIComponent(topic)}`);
    else navigate("/subjects");
  };

  return (
    <div className="adash">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="adash-hero">
        <div className="adash-hero-left">
          <div
            className="adash-status-pill"
            style={{
              background: `${statusConfig.color}${statusConfig.bgAlpha}`,
              color: statusConfig.color,
            }}
          >
            {statusConfig.label}
          </div>

          {learnerState === "NOT_STARTED" ? (
            <>
              <h1 className="adash-cold-headline">Your learning profile</h1>
              <p className="adash-cold-sub">
                Complete an activity to see your personal mastery data here.
              </p>
            </>
          ) : (
            <>
              <h1 className="adash-big-num">
                {readiness}<span className="adash-big-pct">%</span>
              </h1>
              <p className="adash-hero-sub">
                {totalPasses}/{totalQuizzes} correct
              </p>
            </>
          )}
        </div>

        <div className="adash-hero-right">
          {learnerState === "NOT_STARTED" ? (
            <button
              className="adash-cta adash-cta-primary"
              onClick={() => navigate("/subjects")}
            >
              Browse subjects
            </button>
          ) : (
            <RingGauge score={readiness} size={84} color={statusConfig.color} />
          )}
        </div>
      </div>

      {/* ── NEXT ACTION ──────────────────────────────────────────────────── */}
      {hasEvidence && nextTopic && (
        <button
          className="adash-next-card"
          onClick={() => navigate(recommendation.route || "/subjects")}
        >
          <div className="adash-next-eyebrow">Up next</div>
          <div className="adash-next-topic">{nextTopic}</div>
          <div className="adash-next-footer">
            <span className="adash-next-action-label">
              {recommendation.buttonLabel || "Practice"} →
            </span>
            {recommendation.authority === "SERVER_VERIFIED" && (
              <span className="adash-verified-dot" title="Server verified" />
            )}
          </div>
        </button>
      )}

      {/* ── SIGNALS (only shown when evidence exists) ────────────────────── */}
      {/* Each card: icon + number + label — meaning intact without any color */}
      {hasEvidence && (
        <div className="adash-signals">
          <button
            className="adash-signal-card"
            onClick={() => navigate("/analytics")}
            aria-label={`${dueReviews.length} reviews due`}
          >
            <div className="adash-signal-icon" style={{ color: reviewSig.color }}
              aria-hidden="true">{reviewSig.icon}</div>
            <div className="adash-signal-num" style={{ color: reviewSig.color }}>
              {dueReviews.length}
            </div>
            <div className="adash-signal-lbl">Reviews</div>
          </button>

          <button
            className="adash-signal-card"
            onClick={() => navigate("/mistakes")}
            aria-label={`${unresolvedMistakes.length} mistakes`}
          >
            <div className="adash-signal-icon" style={{ color: mistakeSig.color }}
              aria-hidden="true">{mistakeSig.icon}</div>
            <div className="adash-signal-num" style={{ color: mistakeSig.color }}>
              {unresolvedMistakes.length}
            </div>
            <div className="adash-signal-lbl">Mistakes</div>
          </button>

          <button
            className="adash-signal-card"
            onClick={() => navigate("/subjects")}
            aria-label={`${overview.accuracy ?? 0}% accuracy, ${accuracySig.iconLabel}`}
          >
            <div className="adash-signal-icon" style={{ color: accuracySig.color }}
              aria-hidden="true">{accuracySig.icon}</div>
            <div className="adash-signal-num" style={{ color: accuracySig.color }}>
              {/* Constitutional: never show 0% when NOT_STARTED. hasEvidence guards this. */}
              {overview.accuracy ?? 0}%
            </div>
            <div className="adash-signal-lbl">Accuracy</div>
          </button>
        </div>
      )}

      {/* ── PRIORITY TOPICS (evidence-based, shown only after calibration) ─ */}
      {hasInsights && priorityTopics.length > 0 && (
        <div className="adash-queue">
          <div className="adash-section-label">Focus</div>
          {priorityTopics.map((item, idx) => {
            const title = formatTitle(item.topic_title || item.topic || "Topic");
            const score = item.performanceScore ?? item.mastery ?? 0;
            // Semantic label carries meaning. Bar fill + muted color is secondary.
            const scoreLabel = score >= 70 ? "strong" : score >= 40 ? "building" : "needs work";
            const barColor   = score >= 70 ? COLOR.teal : score >= 40 ? COLOR.ochre : COLOR.crimson;
            return (
              <button
                key={idx}
                className="adash-queue-item"
                onClick={() => handleStudyTopic(item)}
                aria-label={`${title}: ${score}%, ${scoreLabel}`}
              >
                <div className="adash-queue-item-inner">
                  <span className="adash-queue-title">{title}</span>
                  <span className="adash-queue-pct" style={{ color: barColor }}>
                    {/* Score + text label — no learner must guess what a color means */}
                    {score}% <span className="adash-queue-score-label">{scoreLabel}</span>
                  </span>
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

      {/* ── CURRICULUM EXPLORER — ALWAYS VISIBLE ─────────────────────────── */}
      {/* A learner should never lose access to "where do I go next?" simply  */}
      {/* because Tixar does not yet have enough evidence about them.          */}
      <CurriculumExplorer
        curriculum={curriculum}
        onNavigate={navigate}
      />

      {/* ── LEARNING INSIGHTS (only shown once calibrated) ───────────────── */}
      {hasEvidence && (
        <div className="adash-cognitive">
          <div className="adash-section-label">Your learning profile</div>
          {hasInsights ? (
            <>
              <CognitiveFiveBar dimensions={cognitiveDimensions} />
              <div className="adash-cognitive-axis">
                {cognitiveDimensions.map((d) => (
                  <div
                    key={d.key}
                    className="adash-cognitive-tick"
                    title={d.label}
                    style={{ color: d.val ? d.color : "var(--t3, #94a3b8)" }}
                  >
                    {d.key}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="adash-no-insights">
              Complete a few more activities to build your mastery profile.
            </p>
          )}
        </div>
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
