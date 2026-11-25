import React from "react";
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
 * One continuous, full-screen teaching document structured through whitespace
 * and typography — NOT floating cards, rounded boxes, colored background panels,
 * or decorative borders.
 *
 * Structure:
 * 01 · QUESTION
 * 02 · YOUR APPROACH
 * 03 · DIAGNOSIS (WHY YOUR THINKING BROKE)
 * 04 · THE RIGHT WAY (Tabular 01, 02 numbered steps demonstrating corrected method)
 * 05 · RULE TO REMEMBER
 * 06 · STANDARD ANSWER (if not redundant)
 * 07 · CHECK YOUR THINKING (targeted verification probe)
 */
export default function TeacherFeedbackView({
  diagnosis,
  rawAnswer = "",
  steps = [],
  why = "",
  isPartial = false,
  questionText = "",
  studentAnswer = "",
  userWork = "",
  isCorrect = false,
  subject = "",
  topic = "",
}) {
  if (!diagnosis) return null;

  const {
    status,
    whatYouDid,
    whyThisIsWrong = [],
    theRightWay = [],
    remember,
    stepAnalysis = null,
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

  // Raw submission content preserved exactly
  const submittedWork = (userWork || diagnosis.userWork || "").trim();
  const studentAns = (studentAnswer || diagnosis.studentAnswer || "").trim();
  const parsedStudentSteps = submittedWork
    ? submittedWork.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
    : [];
  const hasMultiLineWorking = parsedStudentSteps.length > 1;

  // Helper to safely unpack structured explanations
  const unpack = (val) => {
    if (!val) return "";
    if (typeof val === "object") return val;
    const str = String(val).trim();
    if (str.startsWith("{") && str.endsWith("}")) {
      try {
        const p = JSON.parse(str);
        if (p && typeof p === "object") return p;
      } catch {
        return val;
      }
    }
    return val;
  };

  // Authoritative steps
  const stepsList = Array.isArray(theRightWay) && theRightWay.length > 0 ? theRightWay : steps;
  const standardSteps = [];
  for (const item of (Array.isArray(stepsList) ? stepsList : [stepsList])) {
    const u = unpack(item);
    if (u && typeof u === "object") {
      if (Array.isArray(u.steps)) {
        u.steps.forEach((s) => s && standardSteps.push(String(s).trim()));
      } else if (u.sol || u.solution) {
        String(u.sol || u.solution).split(/\r?\n/).forEach((s) => s.trim() && standardSteps.push(s.trim()));
      }
    } else if (u) {
      standardSteps.push(String(u).trim());
    }
  }

  // Authoritative answer
  const expectedAnswer = String(rawAnswer || diagnosis.expected?.[0] || diagnosis.correctAnswer || "").trim();

  // Rule to remember
  const unpackedRemember = unpack(remember);
  const cleanRemember =
    unpackedRemember && typeof unpackedRemember === "object"
      ? unpackedRemember.why || unpackedRemember.explain || unpackedRemember.sol || ""
      : remember;
  const rememberText = String(cleanRemember || why || "").trim();

  // Verification Probe
  const targetVerification = verification || probe || null;

  // Breakdown step info if multi-line working exists
  const breakStepIndex = stepAnalysis?.whereYourWorkingBrokeDown?.stepIndex ?? parsedStudentSteps.length;
  const breakStudentStep = stepAnalysis?.whereYourWorkingBrokeDown?.studentStep || parsedStudentSteps[parsedStudentSteps.length - 1] || studentAns;
  const correctedStepVal = stepAnalysis?.whereYourWorkingBrokeDown?.correctedStep || expectedAnswer;

  // Normalized why points
  const rawWhyPoints = Array.isArray(whyThisIsWrong)
    ? whyThisIsWrong
    : (whyThisIsWrong ? [whyThisIsWrong] : []);
  const whyPoints = Array.from(new Set(rawWhyPoints.map((p) => String(p).trim()).filter(Boolean)));

  const errorExplanation =
    diagDetail?.explanation ||
    breakPoint?.explanation ||
    (whyPoints.length > 0 ? whyPoints[0] : null) ||
    (expectedAnswer
      ? `You entered "${studentAns}", but the calculation leads to "${expectedAnswer}".`
      : "The calculation diverged from the expected result.");

  // ==========================================================================
  // PATH 1: CORRECT (Student Reasoning Confirmed)
  // ==========================================================================
  if (isActuallyCorrect) {
    return (
      <div className="feedback-document-root" aria-label="Correct Exercise Feedback">
        {/* 01 · QUESTION */}
        <QuestionDisplay questionText={questionText} />

        {/* 02 · YOUR APPROACH */}
        <ContentSection title="YOUR APPROACH">
          {hasMultiLineWorking ? (
            <div className="type-body" style={{ color: "var(--text-primary)" }}>
              <p style={{ marginBottom: "var(--space-2)", color: "var(--text-secondary)", fontSize: "13px" }}>
                You submitted your working:
              </p>
              <StepList>
                {parsedStudentSteps.map((line, idx) => (
                  <StepItem key={idx} number={idx + 1}>
                    <code>{line}</code>
                  </StepItem>
                ))}
              </StepList>
            </div>
          ) : (
            <StudentApproach
              studentAnswer={studentAns}
              approachSummary={submittedWork || (studentAns ? `You entered "${studentAns}".` : "")}
            />
          )}
        </ContentSection>

        {/* WHAT YOU DID RIGHT */}
        <ContentSection title="WHAT YOU DID RIGHT">
          <div className="type-body" style={{ color: "var(--text-primary)" }}>
            <p>
              {whatYouDid || "Your reasoning and calculation correctly follow the standard method."}
            </p>
          </div>
        </ContentSection>

        {/* RULE TO REMEMBER */}
        {rememberText && (
          <RememberRule ruleText={rememberText} title="RULE TO REMEMBER" />
        )}

        {/* STANDARD ANSWER */}
        {expectedAnswer && (
          <StandardAnswer answer={expectedAnswer} steps={standardSteps} />
        )}
      </div>
    );
  }

  // ==========================================================================
  // PATH 2: DIAGNOSED / INCONCLUSIVE (Continuous Teaching Document)
  // ==========================================================================
  return (
    <div className="feedback-document-root" aria-label="Feedback Document">
      {/* 01 · QUESTION */}
      <QuestionDisplay questionText={questionText} />

      {/* 02 · YOUR APPROACH */}
      <ContentSection title="YOUR APPROACH">
        {hasMultiLineWorking ? (
          <div className="type-body" style={{ color: "var(--text-primary)" }}>
            <p style={{ marginBottom: "var(--space-2)", color: "var(--text-secondary)", fontSize: "13px" }}>
              You submitted your working:
            </p>
            <StepList>
              {parsedStudentSteps.map((line, idx) => {
                const stepNum = idx + 1;
                const isError = stepNum === breakStepIndex;
                return (
                  <StepItem key={idx} number={stepNum} isCorrected={isError}>
                    <code>{line}</code>
                    {isError && (
                      <span style={{ marginLeft: "8px", color: "var(--state-error, #dc2626)", fontSize: "12px", fontWeight: 600 }}>
                        ← Where working diverged
                      </span>
                    )}
                  </StepItem>
                );
              })}
            </StepList>
          </div>
        ) : (
          <StudentApproach
            studentAnswer={studentAns}
            approachSummary={submittedWork || (studentAns ? `You entered "${studentAns}".` : "")}
          />
        )}
      </ContentSection>

      {/* 03 · WHAT YOU DID RIGHT (if multi-step working had valid initial steps) */}
      {hasMultiLineWorking && breakStepIndex > 1 && (
        <ContentSection title="WHAT YOU DID RIGHT">
          <div className="type-body" style={{ color: "var(--text-primary)" }}>
            {parsedStudentSteps.slice(0, breakStepIndex - 1).map((line, idx) => (
              <p key={idx} style={{ margin: "2px 0" }}>
                Step {idx + 1} was valid: <code>{line}</code>.
              </p>
            ))}
          </div>
        </ContentSection>
      )}

      {/* 04 · WHY YOUR THINKING BROKE */}
      <ContentSection title="WHY YOUR THINKING BROKE">
        <div className="type-body" style={{ color: "var(--text-primary)" }}>
          {hasMultiLineWorking && breakStudentStep && (
            <p style={{ fontFamily: "monospace", fontWeight: 600, color: "var(--state-error, #dc2626)", marginBottom: "4px" }}>
              {breakStudentStep}
            </p>
          )}
          <Markdown>{errorExplanation}</Markdown>
        </div>
      </ContentSection>

      {/* 05 · THE RIGHT WAY (Tabular deliberate 01, 02 steps) */}
      {standardSteps.length > 0 && (
        <CorrectMethod steps={standardSteps} title="THE RIGHT WAY" />
      )}

      {/* 06 · RULE TO REMEMBER */}
      {rememberText && (
        <RememberRule ruleText={rememberText} title="RULE TO REMEMBER" />
      )}

      {/* 07 · STANDARD ANSWER (omitted if redundant with last step) */}
      {expectedAnswer && (
        <StandardAnswer answer={expectedAnswer} steps={standardSteps} />
      )}

      {/* 08 · CHECK YOUR THINKING (Targeted Verification Retest) */}
      {targetVerification?.question && (
        <ContentSection title="CHECK YOUR THINKING">
          <div className="type-body" style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>
            <Markdown>{targetVerification.question}</Markdown>
          </div>

          {Array.isArray(targetVerification.options) && targetVerification.options.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
              {targetVerification.options.map((opt, i) => {
                const isTarget = opt === targetVerification.correctAnswer;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border-subtle, #f0f0f0)",
                      fontSize: "14.5px",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>{opt}</span>
                    {isTarget && (
                      <span style={{ color: "var(--state-success, #15803d)", fontSize: "12px", fontWeight: 600 }}>
                        ✓ Correct Reasoning
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            expectedAnswer && (
              <div style={{ padding: "6px 0", fontSize: "14.5px", color: "var(--text-primary)" }}>
                <span>{expectedAnswer}</span>
                <span style={{ marginLeft: "12px", color: "var(--state-success, #15803d)", fontSize: "12px", fontWeight: 600 }}>
                  ✓ Target Result
                </span>
              </div>
            )
          )}
        </ContentSection>
      )}
    </div>
  );
}
