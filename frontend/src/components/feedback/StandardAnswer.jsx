import ContentSection from "../content/ContentSection";
import Markdown from "../content/Markdown";

/**
 * StandardAnswer
 * Shows final standard answer only when useful and non-redundant.
 * Omits if final worked step already clearly concludes with this exact value.
 */
export default function StandardAnswer({ answer, steps = [] }) {
  if (!answer || !String(answer).trim()) return null;

  const cleanAns = String(answer).trim();

  // Check redundancy with last step
  if (Array.isArray(steps) && steps.length > 0) {
    const lastStep = String(steps[steps.length - 1]).trim().toLowerCase();
    const cleanLower = cleanAns.toLowerCase();

    // If the last step explicitly says "= 60 km/h" or "is 60 km/h" or ends with the answer:
    if (
      lastStep.includes(`= ${cleanLower}`) ||
      lastStep.includes(`: ${cleanLower}`) ||
      lastStep.endsWith(cleanLower) ||
      lastStep === cleanLower
    ) {
      return null; // Redundant! The worked solution already gave it.
    }
  }

  return (
    <ContentSection title="STANDARD ANSWER" className="feedback-section-answer">
      <div className="type-question" style={{ fontWeight: 600 }}>
        <Markdown>{cleanAns}</Markdown>
      </div>
    </ContentSection>
  );
}
