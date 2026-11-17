import SectionHeading from "./SectionHeading";

/**
 * ContentSection
 * Continuous document section. No cards, no borders, no boxes.
 */
export default function ContentSection({
  title,
  subtitle,
  children,
  className = "",
  id,
  style = {},
}) {
  return (
    <section id={id} className={`content-section ${className}`} style={style}>
      {title && <SectionHeading subtitle={subtitle}>{title}</SectionHeading>}
      {children}
    </section>
  );
}
