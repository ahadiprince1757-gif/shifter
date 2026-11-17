/**
 * StepItem
 * Single tabular step with technical leading zero index (01, 02).
 */
export default function StepItem({ number, children, className = "", isCorrected = false }) {
  const formattedNumber = typeof number === "number"
    ? String(number).padStart(2, "0")
    : String(number || "");

  return (
    <div className={`step-item ${isCorrected ? "step-item--corrected" : ""} ${className}`}>
      <span className="step-number" aria-hidden="true">{formattedNumber}</span>
      <div className="step-content">{children}</div>
    </div>
  );
}
