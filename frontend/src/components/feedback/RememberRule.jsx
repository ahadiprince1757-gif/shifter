import ContentSection from "../content/ContentSection";
import Markdown from "../content/Markdown";

/**
 * RememberRule
 * Extracts the governing principle or mental model rule.
 */
export default function RememberRule({ ruleText, title = "RULE TO REMEMBER" }) {
  if (!ruleText || !String(ruleText).trim()) return null;

  return (
    <ContentSection title={title} className="feedback-section-remember">
      <div className="type-body" style={{ color: "var(--text-primary)", fontWeight: 450 }}>
        <Markdown>{ruleText}</Markdown>
      </div>
    </ContentSection>
  );
}
