import ContentSection from "../content/ContentSection";
import Markdown from "../content/Markdown";

/**
 * QuestionDisplay (Feedback Mode)
 * Presents the original question as the beginning of the lesson — not a card or notification.
 */
export default function QuestionDisplay({ questionText, progressText }) {
  if (!questionText) return null;

  return (
    <ContentSection title="QUESTION" className="feedback-section-question">
      {progressText && (
        <div className="type-meta" style={{ marginBottom: "var(--space-2)" }}>
          {progressText}
        </div>
      )}
      <div className="type-question">
        <Markdown>{questionText}</Markdown>
      </div>
    </ContentSection>
  );
}
