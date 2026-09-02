import { useEffect, useState } from "react";

/**
 * TIXAR PROGRESSIVE HINT BOX
 *
 * Philosophy:
 * A hint should guide the learner's thinking, not reveal the answer immediately.
 *
 * Supports:
 * - Single hints
 * - Multiple progressive hints
 * - Step-by-step hint revelation
 * - Hint usage tracking (for readiness engine)
 * - Graceful fallbacks
 */

function HintBox({
  showHint = false,
  hintText,
  hints = [],
  onHintViewed,
}) {
  const [currentHint, setCurrentHint] = useState(0);

  // Reset hint progression when the question changes.
  useEffect(() => {
    setCurrentHint(0);
  }, [hintText, hints]);

  if (!showHint) return null;

  // Normalize hints into a clean array.
  const hintList =
    Array.isArray(hints) && hints.length > 0
      ? hints.filter(Boolean)
      : hintText
        ? [
            hintText,
            "Think about which core principle or formula connects the information given.",
            "Try substituting your values or outlining the steps before finalizing your response."
          ]
        : [
            "Read the question carefully and identify what it is asking you to find.",
            "Focus on the information or concepts given in the question.",
            "Think about the first step you would take to solve or explain the problem.",
          ];

  const visibleHint = hintList[currentHint];
  const hasNextHint = currentHint < hintList.length - 1;

  const handleNextHint = () => {
    if (!hasNextHint) return;

    const nextIndex = currentHint + 1;
    setCurrentHint(nextIndex);

    // Allows parent component / readiness engine to track hint assistance.
    if (typeof onHintViewed === "function") {
      onHintViewed({
        hintNumber: nextIndex + 1,
        totalHints: hintList.length,
      });
    }
  };

  return (
    <div
      className="hint-box"
      role="status"
      aria-live="polite"
    >
      {/* Header */}
      <div className="hint-header">
        <div className="hint-title">
          <span className="hint-icon">💡</span>

          <div>
            <strong>Think about this</strong>

            {hintList.length > 1 && (
              <span className="hint-progress">
                Hint {currentHint + 1} of {hintList.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hint Content */}
      <div className="hint-content">
        {visibleHint}
      </div>

      {/* Progressive Hint Button */}
      {hasNextHint && (
        <button
          type="button"
          className="next-hint-btn"
          onClick={handleNextHint}
        >
          I still need help →
        </button>
      )}

      {/* Final Hint Message */}
      {!hasNextHint && hintList.length > 1 && (
        <div className="hint-footer">
          Try applying this idea before checking the answer.
        </div>
      )}
    </div>
  );
}

export default HintBox;
