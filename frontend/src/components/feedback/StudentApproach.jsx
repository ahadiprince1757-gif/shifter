import ContentSection from "../content/ContentSection";
import Markdown from "../content/Markdown";

/**
 * StudentApproach
 * Shows what the learner actually did without judgemental banners.
 */
export default function StudentApproach({ studentAnswer, approachSummary }) {
  const text = approachSummary || (
    studentAnswer
      ? `You provided the answer "${studentAnswer}".`
      : "You provided an incorrect calculation."
  );

  return (
    <ContentSection title="YOUR APPROACH" className="feedback-section-approach">
      <div className="type-body" style={{ color: "var(--text-primary)" }}>
        <Markdown>{text}</Markdown>
      </div>
    </ContentSection>
  );
}
