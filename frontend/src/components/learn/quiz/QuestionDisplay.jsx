import React from "react";
import Markdown from "../../content/Markdown";
import ContentSection from "../../content/ContentSection";

/**
 * QuestionDisplay (Quiz Interactive Mode)
 *
 * Renders the question cleanly as the beginning of the interactive screen.
 * Follows Global Layout Rules:
 * - No floating cards
 * - No rounded box containers
 * - No decorative badges or colored cards
 * - Structure through typography: uppercase 01 · QUESTION header, clear readable body
 */
function QuestionDisplay({ questionText, category, rubricEval, proveItState }) {
  if (!questionText) {
    return (
      <ContentSection title="QUESTION">
        <div className="type-body" style={{ color: "var(--text-muted)" }}>
          Question not available
        </div>
      </ContentSection>
    );
  }

  let text = questionText;
  let tag = category || null;

  // Extract bracketed mode tag if present
  const tagMatch = questionText.match(/^\[([^\]]+)\]\s*/);
  if (tagMatch) {
    tag = tagMatch[1];
    text = questionText.replace(tagMatch[0], "");
  }

  return (
    <ContentSection title="QUESTION" className="feedback-section-question">
      {tag && (
        <div className="type-meta" style={{ marginBottom: "var(--space-2)", textTransform: "uppercase" }}>
          {tag}
        </div>
      )}
      <div className="type-question">
        <Markdown>{text}</Markdown>
      </div>
    </ContentSection>
  );
}

export default QuestionDisplay;
