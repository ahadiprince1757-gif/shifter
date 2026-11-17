import ContentSection from "../content/ContentSection";
import StepList from "../content/StepList";
import StepItem from "../content/StepItem";
import Markdown from "../content/Markdown";

/**
 * CorrectMethod
 * Demonstrates the correct reasoning using tabular 01, 02 numbered steps.
 * Zero colored circles.
 */
export default function CorrectMethod({ steps = [], title = "THE RIGHT WAY" }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <ContentSection title={title} className="feedback-section-right-way">
      <StepList>
        {steps.map((step, idx) => (
          <StepItem key={idx} number={idx + 1}>
            <Markdown>{step}</Markdown>
          </StepItem>
        ))}
      </StepList>
    </ContentSection>
  );
}
