import Markdown from "../../content/Markdown";
import ContentSection from "../../content/ContentSection";
import StepList from "../../content/StepList";
import StepItem from "../../content/StepItem";
import QuestionDisplay from "../../feedback/QuestionDisplay";
import StudentApproach from "../../feedback/StudentApproach";
import CorrectMethod from "../../feedback/CorrectMethod";
import StandardAnswer from "../../feedback/StandardAnswer";

/**
 * TeacherFeedbackView
 *
 * Implements the continuous diagnostic feedback architecture for Tixar:
 * 
 * 1. CORRECT STATE:
 *    - Question
 *    - Your Reasoning (verified student claims)
 *    - Verified (affirmation without "Why this is wrong")
 *    - Check Your Thinking (same-skill check)
 *
 * 2. DIAGNOSED STATE:
 *    - Question
 *    - Your Approach
 *    - Why Your Thinking Broke (exact student evidence + exact break point)
 *    - Repair (key concept + structured steps)
 *    - Check Your Thinking (same-skill verification retest)
 *
 * 3. INCONCLUSIVE STATE:
 *    - Question
 *    - Your Response
 *    - I Can't See Your Reasoning Yet (insufficient evidence explanation)
 *    - How To Solve It (authoritative method)
 *    - Check Your Thinking (prompt for missing step)
 */
export default function TeacherFeedbackView({
  diagnosis,
  rawAnswer = "",
  steps = [],
  why = "",
  isPartial = false,
  questionText = "",
  studentAnswer = "",
  isCorrect = false,
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
    evidence = [],
    verification = null,
    diagnosis: diagDetail = null,
    breakPoint = null,
  } = diagnosis;

  const isActuallyCorrect =
    isCorrect === true ||
    status === "correct" ||
    diagnosis.correctness === "correct";

  const isDiagnosed =
    status === "diagnosed" &&
    !isActuallyCorrect;

  const isInconclusive =
    !isActuallyCorrect &&
    !isDiagnosed;

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

  // Extract repair steps
  const repairSteps = Array.isArray(repair?.steps)
    ? repair.steps
    : [];

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
  const studentAns = studentAnswer || diagnosis.studentAnswer || "";
  const approachText =
    whatYouDid ||
    (studentAns ? `You provided the answer "${studentAns}".` : "You provided an incorrect calculation.");

  // Consistency check: ensure standard answer does not contradict the worked solution
  let consistentAnswer = rawAnswer || diagnosis.expected?.[0] || "";
  if (rightWaySteps.length > 0 && rawAnswer) {
    const lastStep = rightWaySteps[rightWaySteps.length - 1];
    const unitMatch = lastStep.match(/(?:=|is|speed\s*=)\s*([0-9.]+\s*(?:km\/h|m\/s|N|J|W|m|kg|s|%|[a-zA-Z/]+))/i);
    if (unitMatch && unitMatch[1]) {
      const stepVal = unitMatch[1].trim();
      const rawNum = parseFloat(rawAnswer);
      const stepNum = parseFloat(stepVal);
      if (!isNaN(rawNum) && !isNaN(stepNum) && Math.abs(rawNum - stepNum) > 0.01) {
        consistentAnswer = stepVal;
      }
    }
  }

  const whyPoints =
    Array.isArray(whyThisIsWrong) && whyThisIsWrong.length > 0
      ? whyThisIsWrong
      : [
          ...(consistentAnswer ? [`The correct answer is ${consistentAnswer}.`] : []),
          "The calculation does not produce the required result.",
        ];

  const targetVerification = verification || probe;

  // ==========================================================================
  // PATH 1: CORRECT (Student Reasoning Verified — ZERO "Why this is wrong")
  // ==========================================================================
  if (isActuallyCorrect) {
    const verifiedEvidence = Array.isArray(evidence) ? evidence : [];

    return (
      <div className="teacher-diagnostic-flow teacher-diagnostic-flow--correct" aria-label="Correct Reasoning Verified">
        {/* 1. QUESTION */}
        <QuestionDisplay questionText={questionText} />

        {/* 2. YOUR REASONING */}
        <ContentSection title="YOUR REASONING" className="feedback-section-reasoning">
          {verifiedEvidence.length > 1 ? (
            <div className="type-body" style={{ color: "var(--text-primary)" }}>
              <p style={{ marginBottom: "var(--space-2)" }}>
                You correctly separated the required concepts:
              </p>
              <ul className="diagnostic-reason-list" style={{ listStyleType: "none", paddingLeft: 0 }}>
                {verifiedEvidence.map((ev, i) => (
                  <li key={i} className="type-body" style={{ color: "var(--text-primary)", marginBottom: "4px" }}>
                    • <strong>{ev.text}</strong>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "var(--space-2)", color: "var(--text-secondary)", fontSize: "14px" }}>
                Your reasoning matches the classification used in this question.
              </p>
            </div>
          ) : (
            <StudentApproach
              studentAnswer={studentAns}
              approachSummary={whatYouDid || `Your answer "${studentAns}" matches the expected concept.`}
            />
          )}
        </ContentSection>

        {/* 3. VERIFIED */}
        <ContentSection title="VERIFIED" className="feedback-section-verified">
          <div className="type-body" style={{ color: "var(--state-success, #16a34a)", fontWeight: 600 }}>
            {rememberText || "You identified the key distinction correctly."}
          </div>
        </ContentSection>

        {/* 4. CHECK YOUR THINKING (Same-Skill Check) */}
        {targetVerification?.question && (
          <ContentSection title="CHECK YOUR THINKING" className="feedback-section-check">
            <div className="type-body" style={{ marginBottom: "var(--space-2)", fontWeight: 500 }}>
              <Markdown>{targetVerification.question}</Markdown>
            </div>
            {Array.isArray(targetVerification.options) && targetVerification.options.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {targetVerification.options.map((opt, i) => (
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
                    {opt === targetVerification.correctAnswer && (
                      <span style={{ color: "var(--state-success, #16a34a)", fontWeight: 600, fontSize: "12px" }}>
                        ✓ Key Distinction
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ContentSection>
        )}

        {/* 5. STANDARD ANSWER */}
        {consistentAnswer && (
          <StandardAnswer answer={consistentAnswer} steps={rightWaySteps} />
        )}
      </div>
    );
  }

  // ==========================================================================
  // PATH 2: DIAGNOSED (Identified Cognitive Breakdown & Targeted Repair)
  // ==========================================================================
  if (isDiagnosed) {
    const observedQuote = evidence?.[0]?.text || null;
    const breakExplanation =
      diagDetail?.explanation ||
      breakPoint?.explanation ||
      whyPoints[0] ||
      "A specific conceptual divergence occurred.";

    return (
      <div className="teacher-diagnostic-flow teacher-diagnostic-flow--diagnosed" aria-label="Diagnostic Feedback">
        {/* 1. QUESTION */}
        <QuestionDisplay questionText={questionText} />

        {/* 2. STEP ANALYSIS (IF MULTI-LINE WORKING WAS RECONSTRUCTED) */}
        {stepAnalysis ? (
          <>
            {stepAnalysis.whatYouDidRight?.length > 0 && (
              <ContentSection title="WHAT YOU DID RIGHT">
                <ul className="diagnostic-reason-list">
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
                    </StepItem>
                  ))}
                </StepList>
              </ContentSection>
            )}
          </>
        ) : (
          <>
            {/* 2. YOUR APPROACH */}
            <StudentApproach studentAnswer={studentAns} approachSummary={approachText} />

            {/* 3. WHY YOUR THINKING BROKE */}
            <ContentSection title="WHY YOUR THINKING BROKE" className="feedback-section-why">
              {observedQuote && (
                <div style={{ marginBottom: "var(--space-2)", padding: "var(--space-2) var(--space-3)", background: "var(--surface-subtle)", borderRadius: "var(--radius-control)", borderLeft: "3px solid var(--accent, #6366f1)" }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "2px" }}>
                    Observed in your answer:
                  </div>
                  <div className="type-body" style={{ fontStyle: "italic", color: "var(--text-primary)" }}>
                    "{observedQuote}"
                  </div>
                </div>
              )}
              <div className="type-body">
                <Markdown>{breakExplanation}</Markdown>
              </div>
            </ContentSection>

            {/* 4. REPAIR */}
            <ContentSection title="REPAIR" className="feedback-section-repair">
              {repair?.explanation && (
                <div className="type-body" style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>
                  <Markdown>{repair.explanation}</Markdown>
                </div>
              )}
              {repairSteps.length > 0 ? (
                <StepList>
                  {repairSteps.map((step, idx) => (
                    <StepItem key={idx} number={idx + 1}>
                      <Markdown>{step}</Markdown>
                    </StepItem>
                  ))}
                </StepList>
              ) : rightWaySteps.length > 0 ? (
                <CorrectMethod steps={rightWaySteps} />
              ) : null}
              {rememberText && (
                <div className="type-supporting" style={{ marginTop: "var(--space-3)", borderTop: "1px dashed var(--border-subtle)", paddingTop: "var(--space-2)" }}>
                  <strong>Remember: </strong>
                  <Markdown>{rememberText}</Markdown>
                </div>
              )}
            </ContentSection>
          </>
        )}

        {/* 5. CHECK YOUR THINKING (Same-Skill Retest Probe) */}
        {targetVerification?.question && (
          <ContentSection title="CHECK YOUR THINKING" className="feedback-section-check">
            <div className="type-body" style={{ marginBottom: "var(--space-3)", fontWeight: 500 }}>
              <Markdown>{targetVerification.question}</Markdown>
            </div>
            {Array.isArray(targetVerification.options) && targetVerification.options.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {targetVerification.options.map((opt, i) => (
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
                    {opt === targetVerification.correctAnswer && (
                      <span style={{ color: "var(--state-success, #16a34a)", fontWeight: 600, fontSize: "12px" }}>
                        ✓ Correct Reasoning
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ContentSection>
        )}

        {/* 6. STANDARD ANSWER */}
        {consistentAnswer && (
          <StandardAnswer answer={consistentAnswer} steps={rightWaySteps} />
        )}
      </div>
    );
  }

  // ==========================================================================
  // PATH 3: INCONCLUSIVE (Insufficient Evidence — Refusal to Invent Reasons)
  // ==========================================================================
  return (
    <div className="teacher-diagnostic-flow teacher-diagnostic-flow--inconclusive" aria-label="Inconclusive Reasoning Notice">
      {/* 1. QUESTION */}
      <QuestionDisplay questionText={questionText} />

      {/* 2. YOUR RESPONSE */}
      <StudentApproach studentAnswer={studentAns} approachSummary={approachText} />

      {/* 3. I CAN'T SEE YOUR REASONING YET */}
      <ContentSection title="I CAN'T SEE YOUR REASONING YET" className="feedback-section-inconclusive">
        <div className="type-body" style={{ marginBottom: "var(--space-2)" }}>
          <Markdown>
            {whyPoints[0] || "Your response doesn't contain enough mathematical reasoning for me to determine where your thinking broke."}
          </Markdown>
        </div>
        <div className="type-supporting" style={{ color: "var(--text-secondary)" }}>
          {whyPoints[1] || "Try showing the step you used to reach your answer."}
        </div>
      </ContentSection>

      {/* 4. HOW TO SOLVE IT (Guidance) */}
      {rightWaySteps.length > 0 && (
        <CorrectMethod steps={rightWaySteps} title="HOW TO SOLVE IT" />
      )}

      {/* 5. CHECK YOUR THINKING */}
      {targetVerification?.question && (
        <ContentSection title="CHECK YOUR THINKING" className="feedback-section-check">
          <div className="type-body" style={{ fontWeight: 500 }}>
            <Markdown>{targetVerification.question}</Markdown>
          </div>
        </ContentSection>
      )}
    </div>
  );
}
