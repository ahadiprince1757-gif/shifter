import ContentSection from "../content/ContentSection";
import Markdown from "../content/Markdown";

/**
 * ErrorExplanation
 * Explains the identified error or misconception cleanly.
 * If inconclusive, states uncertainty rather than inventing a misconception.
 */
export default function ErrorExplanation({ reasons = [], rawAnswer = "" }) {
  const points = Array.isArray(reasons) && reasons.length > 0
    ? reasons
    : [
        ...(rawAnswer ? [`The correct answer is ${rawAnswer}.`] : []),
        "The calculation does not produce the required result.",
      ];

  return (
    <ContentSection title="WHY THIS IS WRONG" className="feedback-section-why">
      {points.length === 1 ? (
        <div className="type-body">
          <Markdown>{points[0]}</Markdown>
        </div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {points.map((pt, idx) => (
            <li key={idx} className="type-body" style={{ color: "var(--text-primary)" }}>
              <Markdown>{pt}</Markdown>
            </li>
          ))}
        </ul>
      )}
    </ContentSection>
  );
}
