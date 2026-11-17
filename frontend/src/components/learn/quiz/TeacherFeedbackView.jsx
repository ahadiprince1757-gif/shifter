import Markdown from "../../content/Markdown";
import ContentSection from "../../content/ContentSection";
import StepList from "../../content/StepList";
import StepItem from "../../content/StepItem";
import QuestionDisplay from "../../feedback/QuestionDisplay";
import StudentApproach from "../../feedback/StudentApproach";
import ErrorExplanation from "../../feedback/ErrorExplanation";
import CorrectMethod from "../../feedback/CorrectMethod";
import RememberRule from "../../feedback/RememberRule";
import StandardAnswer from "../../feedback/StandardAnswer";

/**
 * TeacherFeedbackView
 *
 * Implements the continuous diagnostic document architecture for Tixar:
 * 1. Question
 * 2. Your Approach
 * 3. Diagnosis (Why this is wrong)
 * 4. The Right Way (tabular 01, 02 numbered steps)
 * 5. Rule to Remember
 * 6. Standard Answer (only when useful and mathematically consistent)
 *
 * Design Invariants:
 * - One screen, one surface. Sections are separated by space and dividers, not cards.
 * - Color communicates state, never structure. Typography establishes hierarchy.
 * - No floating cards, no card soup, no surrounding boxes or shadows.
 * - 01 / 02 / 03 tabular deliberate step numbering.
 * - Full-width mobile breathing room.
 */
export default function TeacherFeedbackView({
  diagnosis,
  rawAnswer,
  steps = [],
  why = "",
  isPartial = false,
  questionText = "",
  studentAnswer = "",
}) {
  if (!diagnosis) return null;

  const {
    status,
    whatYouDid,
    whyThisIsWrong = [],
    theRightWay = [],
    remember,
    stepAnalysis,
    probe = null,
    repair = null,
  } = diagnosis;

  // Helper to unpack JSON strings if backend/database stores structured explanation JSON
  const unpackJson = (val) => {
    if (!val) return "";
    if (typeof val === "object") return val;
    const str = String(val).trim();
    if (str.startsWith("{") && str.endsWith("}")) {
      try {
        const parsed = JSON.parse(str);
        if (parsed && typeof parsed === "object") return parsed;
      } catch {
        return val;
      }
    }
    return val;
  };

  // Extract raw steps list from theRightWay or steps
  const rawStepsCandidates =
    Array.isArray(theRightWay) && theRightWay.length > 0
      ? theRightWay
      : steps;

  const rightWaySteps = [];
  const listToProcess = Array.isArray(rawStepsCandidates)
    ? rawStepsCandidates
    : [rawStepsCandidates];

  for (const item of listToProcess) {
    const unpacked = unpackJson(item);
    if (unpacked && typeof unpacked === "object") {
      if (Array.isArray(unpacked.steps) && unpacked.steps.length > 0) {
        unpacked.steps.forEach((s) => s && rightWaySteps.push(String(s).trim()));
      } else if (unpacked.sol || unpacked.solution) {
        String(unpacked.sol || unpacked.solution)
          .split(/\r?\n/)
          .forEach((s) => s.trim() && rightWaySteps.push(s.trim()));
      }
    } else if (unpacked) {
      rightWaySteps.push(String(unpacked).trim());
    }
  }

  // Unpack remember and why
  const unpackedRemember = unpackJson(remember);
  const cleanRemember =
    unpackedRemember && typeof unpackedRemember === "object"
      ? unpackedRemember.why || unpackedRemember.explain || unpackedRemember.sol || ""
      : remember;

  const unpackedWhy = unpackJson(why);
  const cleanWhy =
    unpackedWhy && typeof unpackedWhy === "object"
      ? unpackedWhy.why || unpackedWhy.explain || unpackedWhy.sol || ""
      : why;

  const rememberText = String(cleanRemember || cleanWhy || "").trim();

  // Approach formulation
  const approachText =
    whatYouDid ||
    (studentAnswer ? `You provided the answer "${studentAnswer}".` : "You provided an incorrect calculation.");

  // Consistency check: ensure standard answer does not contradict the worked solution
  let consistentAnswer = rawAnswer;
  if (rightWaySteps.length > 0 && rawAnswer) {
    const lastStep = rightWaySteps[rightWaySteps.length - 1];
    // If last step has an answer with unit (e.g. 60 km/h) and rawAnswer is just a numeric mismatch (e.g. 16.6667), extract the step answer
    const unitMatch = lastStep.match(/(?:=|is|speed\s*=)\s*([0-9.]+\s*(?:km\/h|m\/s|N|J|W|m|kg|s|%|[a-zA-Z/]+))/i);
    if (unitMatch && unitMatch[1]) {
      const stepVal = unitMatch[1].trim();
      const rawNum = parseFloat(rawAnswer);
      const stepNum = parseFloat(stepVal);
      if (!isNaN(rawNum) && !isNaN(stepNum) && Math.abs(rawNum - stepNum) > 0.01) {
        // Discrepancy detected: use the worked solution's verified conclusion
        consistentAnswer = stepVal;
      }
    }
  }

  // Why points fallback
  const whyPoints =
    Array.isArray(whyThisIsWrong) && whyThisIsWrong.length > 0
      ? whyThisIsWrong
      : [
          ...(consistentAnswer ? [`The correct answer is ${consistentAnswer}.`] : []),
          "The calculation does not produce the required result.",
        ];

  return (
    <div className="teacher-diagnostic-flow" aria-label="Diagnostic Feedback">
      {/* ── 1. QUESTION ── */}
      <QuestionDisplay questionText={questionText} />

      {/* ── STEP ANALYSIS MODE (REASONING & RECONSTRUCTED WORKING) ── */}
      {stepAnalysis && status !== "correct" ? (
        <>
          {stepAnalysis.whatYouDidRight?.length > 0 && (
            <ContentSection title="WHAT YOU DID RIGHT">
              <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {stepAnalysis.whatYouDidRight.map((item, idx) => (
                  <li key={idx} className="type-body">
                    <Markdown>{item}</Markdown>
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}

          {stepAnalysis.whereYourWorkingBrokeDown && (
            <ContentSection title="WHERE YOUR WORKING WENT WRONG">
              <div style={{ marginBottom: "var(--space-2)" }}>
                <code style={{ background: "var(--surface-subtle)", padding: "2px 8px", borderRadius: "4px", fontSize: "14px" }}>
                  {stepAnalysis.whereYourWorkingBrokeDown.studentStep}
                </code>
              </div>
              <div className="type-body">
                <Markdown>{stepAnalysis.whereYourWorkingBrokeDown.explanation}</Markdown>
              </div>
            </ContentSection>
          )}

          {stepAnalysis.correctedWorking?.length > 0 && (
            <ContentSection title="YOUR CORRECTED WORKING">
              <StepList>
                {stepAnalysis.correctedWorking.map((item, idx) => (
                  <StepItem key={idx} number={idx + 1} isCorrected={item.status === "corrected"}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
                      <code>{item.step}</code>
                      {item.status === "corrected" && (
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--state-success)", textTransform: "uppercase" }}>
                          ✓ Corrected
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <div className="type-supporting" style={{ marginTop: "4px" }}>
                        {item.note}
                      </div>
                    )}
                  </StepItem>
                ))}
              </StepList>
            </ContentSection>
          )}

          {stepAnalysis.thinkingRepair && (
            <RememberRule
              title={stepAnalysis.thinkingRepair.title ? stepAnalysis.thinkingRepair.title.toUpperCase() : "CHANGE THE WAY YOU APPROACH THIS"}
              ruleText={stepAnalysis.thinkingRepair.strategy}
            />
          )}
        </>
      ) : (
        /* ── STANDARD TEACHER FEEDBACK (CONTINUOUS DOCUMENT FLOW) ── */
        <>
          {/* ── 2. YOUR APPROACH ── */}
          {approachText && status !== "correct" && (
            <StudentApproach studentAnswer={studentAnswer} approachSummary={approachText} />
          )}

          {/* ── 3. DIAGNOSIS (WHY THIS IS WRONG) ── */}
          {whyPoints.length > 0 && status !== "correct" && (
            <ErrorExplanation reasons={whyPoints} rawAnswer={consistentAnswer} />
          )}

          {/* ── 4. THE RIGHT WAY ── */}
          {rightWaySteps.length > 0 && (
            <CorrectMethod steps={rightWaySteps} />
          )}

          {/* ── 5. RULE TO REMEMBER ── */}
          {rememberText && (
            <RememberRule ruleText={rememberText} />
          )}
        </>
      )}

      {/* ── COGNITIVE REPAIR (KEY PRINCIPLE & COUNTEREXAMPLE) ── */}
      {repair && (repair.principle || repair.counterExample) && (
        <ContentSection title="KEY PRINCIPLE">
          {repair.principle && (
            <div className="type-body" style={{ marginBottom: repair.counterExample ? "var(--space-3)" : 0 }}>
              <Markdown>{repair.principle}</Markdown>
            </div>
          )}
          {repair.counterExample && (
            <div className="type-supporting">
              <strong>Example: </strong>
              <Markdown>{repair.counterExample}</Markdown>
            </div>
          )}
        </ContentSection>
      )}

      {/* ── TARGETED DIAGNOSTIC PROBE ── */}
      {probe && probe.question && (
        <ContentSection title="CHECK YOUR THINKING">
          <div className="type-body" style={{ marginBottom: "var(--space-3)", fontWeight: 500 }}>
            <Markdown>{probe.question}</Markdown>
          </div>
          {Array.isArray(probe.options) && probe.options.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {probe.options.map((opt, i) => (
                <div
                  key={i}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-control)",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{opt}</span>
                  {opt === probe.correctAnswer && (
                    <span style={{ color: "var(--state-success)", fontWeight: 600, fontSize: "12px" }}>
                      ✓ Correct Reasoning
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </ContentSection>
      )}

      {/* ── 6. STANDARD ANSWER (Only when useful, non-redundant, and consistent) ── */}
      {consistentAnswer && (
        <StandardAnswer answer={consistentAnswer} steps={rightWaySteps} />
      )}
    </div>
  );
}
