import { useNavigate } from "react-router-dom";

/**
 * SmartPrompt
 *
 * A single card that tells the student what to study next.
 * Rendered above the subject grid on the subjects page.
 *
 * Rules:
 * - If action is null, renders nothing at all.
 * - One card maximum. No lists.
 * - No scores, no percentages, no gamification shown to the student.
 * - Taps "Practice →" deep-links directly into the topic (skipping navigation).
 */
export default function SmartPrompt({ action, loading }) {
  const navigate = useNavigate();

  // Still computing — render nothing (avoid flash)
  if (loading || action === undefined) return null;

  // Nothing urgent — hide completely
  if (!action) return null;

  const handlePractice = () => {
    if (action.route) {
      navigate(action.route);
    }
  };

  return (
    <div
      className={`smart-prompt smart-prompt--${action.urgency}`}
      role="region"
      aria-label="Recommended study action"
    >
      <div className="smart-prompt-body">
        <div className="smart-prompt-label">
          {action.urgency === "high" ? "Practice now" : "When you're ready"}
        </div>
        <div className="smart-prompt-topic">{action.topic}</div>
        <div className="smart-prompt-reason">{action.reason}</div>
      </div>
      {action.route && (
        <button
          type="button"
          className="smart-prompt-btn"
          onClick={handlePractice}
          aria-label={`Practice ${action.topic}`}
        >
          Practice →
        </button>
      )}
    </div>
  );
}
