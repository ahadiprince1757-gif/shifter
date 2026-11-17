/**
 * SectionHeading
 * Technical, deliberate, uppercase section label.
 */
export default function SectionHeading({ children, subtitle, className = "" }) {
  if (!children) return null;
  return (
    <div className={`section-heading-wrapper ${className}`}>
      <h2 className="type-section-heading">{children}</h2>
      {subtitle && <p className="type-supporting" style={{ marginTop: "4px" }}>{subtitle}</p>}
    </div>
  );
}
