import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mistakeRepo } from "../repository/mistakeRepo";
import SkeletonLoader from "./SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import { navigateToTopic, LEARNING_MODES } from "../utils/learningNavigation";

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

export default function MistakeJournal() {
  const { session } = useAuth();
  const userId = session?.user?.id || null;
  const [needsAttention, setNeedsAttention] = useState([]);
  const [provisionallyFixed, setProvisionallyFixed] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { needsAttention: na, provisionallyFixed: pf } =
        await mistakeRepo.getMistakesByLifecycle(userId);
      if (cancelled) return;

      na.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      pf.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      setNeedsAttention(na);
      setProvisionallyFixed(pf);
      setLoading(false);
      mistakeRepo.cleanupOldResolved().catch(() => {});
    }
    load();
    return () => { cancelled = true; };
  }, [userId]);

  const handlePractice = (mistake) => {
    const subjectId = mistake.subject_id || mistake.sid;
    const chapterId = mistake.chapter_id || mistake.chapter_key || mistake.cid;
    const topicId   = mistake.topic_id || mistake.topic_title;

    navigateToTopic(navigate, {
      subjectId,
      chapterId,
      topicId,
      mode: LEARNING_MODES.MISTAKE_REPAIR,
      source: "mistake_journal",
      mistakeId: mistake.id,
      questionId: mistake.question_id || null,
    });
  };

  const totalOpen = needsAttention.length;

  return (
    <div className="mistake-journal" style={{ maxWidth: "760px", margin: "0 auto", padding: "1.5rem 1rem" }}>
      {/* Header */}
      <div className="mj-header" style={{ marginBottom: "1.5rem" }}>
        <h2 className="mj-title" style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
          Mistakes
        </h2>
        <p className="mj-subtitle" style={{ color: "var(--t2)", fontSize: "0.95rem" }}>
          {totalOpen === 0
            ? "No unresolved gaps."
            : `${totalOpen} ${totalOpen === 1 ? "gap needs" : "gaps need"} attention`}
        </p>
      </div>

      {loading ? (
        <div style={{ marginTop: "1.5rem" }}>
          <SkeletonLoader type="list" count={3} />
        </div>
      ) : totalOpen === 0 && provisionallyFixed.length === 0 ? (
        <div className="mj-empty" style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <div className="mj-empty-icon" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✓</div>
          <p className="mj-empty-text" style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
            No unresolved mistakes.
          </p>
          <p className="mj-empty-sub" style={{ color: "var(--t2)", marginTop: "0.4rem", fontSize: "0.9rem" }}>
            When you miss questions during quizzes, Tixar logs the exact gaps here for targeted repair.
          </p>
        </div>
      ) : (
        <>
          {/* Active Gaps (Needs Attention) */}
          <div className="mj-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {needsAttention.map((mistake) => {
              const diagnosticNote =
                mistake.solution ||
                mistake.what_went_wrong ||
                mistake.correct_answer
                  ? `Expected: ${mistake.correct_answer}`
                  : null;

              return (
                <div
                  key={mistake.id}
                  className="mj-item"
                  style={{
                    padding: "1.2rem",
                    borderRadius: "12px",
                    background: "var(--sur)",
                    border: "1px solid var(--bd)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--t)" }}>
                      {formatTitle(mistake.topic_id)}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--t2)" }}>
                      {formatTitle(mistake.subject_id)}
                    </span>
                  </div>

                  {mistake.question_text && (
                    <div style={{ fontSize: "0.92rem", color: "var(--t)", lineHeight: "1.5" }}>
                      {mistake.question_text}
                    </div>
                  )}

                  {diagnosticNote && (
                    <div style={{ fontSize: "0.86rem", color: "var(--t2)", background: "rgba(0,0,0,0.03)", padding: "0.5rem 0.75rem", borderRadius: "8px" }}>
                      {diagnosticNote}
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn-p"
                    style={{ marginTop: "0.4rem", width: "fit-content" }}
                    onClick={() => handlePractice(mistake)}
                  >
                    Fix this →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Provisionally Fixed (Check Again Later) */}
          {provisionallyFixed.length > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--t2)", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "0.75rem" }}>
                Fixed — We'll check this again later ({provisionallyFixed.length})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {provisionallyFixed.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      padding: "0.8rem 1rem",
                      borderRadius: "10px",
                      background: "rgba(34, 197, 94, 0.04)",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "var(--gr, #22c55e)", fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: "0.9rem", color: "var(--t)", fontWeight: 600 }}>
                        {formatTitle(m.topic_id)}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--t2)" }}>
                      Scheduled for spaced review
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
