/**
 * FeedbackActions
 * Solid primary action button + subtle text secondary button.
 * Touch targets >= 44px.
 */
export default function FeedbackActions({
  isCorrect,
  isPartial,
  onPrimary,
  primaryLabel,
  onSecondary,
  secondaryLabel,
  onTertiary,
  tertiaryLabel,
  disabled = false,
}) {
  return (
    <div className="action-stack">
      {onPrimary && (
        <button
          type="button"
          className="primary-action-btn"
          onClick={onPrimary}
          disabled={disabled}
        >
          {primaryLabel || (isCorrect ? "NEXT QUESTION →" : "TRY AGAIN")}
        </button>
      )}

      {onSecondary && (
        <button
          type="button"
          className="secondary-action-btn"
          onClick={onSecondary}
          disabled={disabled}
        >
          {secondaryLabel || "Next question →"}
        </button>
      )}

      {onTertiary && (
        <button
          type="button"
          className="secondary-action-btn"
          onClick={onTertiary}
          disabled={disabled}
          style={{ opacity: 0.8 }}
        >
          {tertiaryLabel || "Review concept"}
        </button>
      )}
    </div>
  );
}
