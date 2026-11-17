/**
 * StepList
 * Container for tabular 01, 02, 03 worked solution steps.
 */
export default function StepList({ children, className = "" }) {
  return <div className={`step-list ${className}`}>{children}</div>;
}
