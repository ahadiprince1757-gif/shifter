import ContentSection from "../content/ContentSection";
import Markdown from "../content/Markdown";

/**
 * RememberRule
 *
 * Implements refined restrained rule accent:
 * A thin left accent line in brand cobalt (without creating a closed box/container),
 * preserving the continuous full-screen document.
 *
 * RULE TO REMEMBER
 * │ Double check your arithmetic before concluding.
 */
export default function RememberRule({ ruleText, title = "RULE TO REMEMBER" }) {
  if (!ruleText || !String(ruleText).trim()) return null;

  return (
    <ContentSection title={title} className="feedback-section-remember">
      <div
        className="type-body"
        style={{
          color: "var(--text-primary)",
          fontWeight: 450,
          borderLeft: "2px solid var(--tixar-blue-core, #287ce0)",
          paddingLeft: "14px",
          margin: "4px 0",
        }}
      >
        <Markdown>{ruleText}</Markdown>
      </div>
    </ContentSection>
  );
}
