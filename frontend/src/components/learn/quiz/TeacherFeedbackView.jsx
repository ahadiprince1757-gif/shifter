import React from "react";
import Markdown from "../../content/Markdown";
import ContentSection from "../../content/ContentSection";
import QuestionDisplay from "../../feedback/QuestionDisplay";
import StandardAnswer from "../../feedback/StandardAnswer";
import "./TeacherFeedbackView.css";

/**
 * TeacherFeedbackView
 *
 * Implements the "Teacher Marking Student Exercise Book" feedback experience.
 *
 * Three Educational Layers:
 * 1. UNDERSTAND: Reads and marks the student's exact submission line by line.
 * 2. REPAIR: Shows the student how to correct their own step, preserving all valid work.
 * 3. VERIFY: Gives a targeted micro-check testing the isolated repaired skill.
 *
 * Invariant: Never displays generic error text or "I can't see your reasoning yet".
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

  // Raw submission content
  const submittedWork = (userWork || diagnosis.userWork || "").trim();
  const studentAns = (studentAnswer || diagnosis.studentAnswer || "").trim();
  const displaySubmission = submittedWork || studentAns || "No response recorded";
  const hasMultiLineWorking = submittedWork.includes("\n") || (submittedWork && submittedWork.length > 5);

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
  const rememberText = String(cleanRemember || why || "Double check each calculation step carefully.").trim();

  // Verification Probe
  const targetVerification = verification || probe || null;

  // Header meta text
  const subjectTopicHeader = [subject, topic].filter(Boolean).join(" · ").toUpperCase() || "QUESTION FEEDBACK";

  // ==========================================================================
  // PATH 1: CORRECT (Student Reasoning Verified)
  // ==========================================================================
  if (isActuallyCorrect) {
    return (
      <div className="teacher-exercise-book teacher-exercise-book--mastered" aria-label="Correct Exercise Marking">
        <div className="exercise-meta-bar">
          <span className="exercise-subject-badge">{subjectTopicHeader}</span>
          <span className="exercise-status-badge exercise-status-badge--mastered">
            ✓ Mastered
          </span>
        </div>

        <QuestionDisplay questionText={questionText} />

        <div className="exercise-submission-card">
          <div className="exercise-submission-header">
            <span>Your Submission</span>
            <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ Correct</span>
          </div>
          <div className="exercise-submission-content">
            {displaySubmission}
          </div>
        </div>

        <ContentSection title="YOUR REASONING" className="feedback-section-reasoning">
          <div className="type-body" style={{ color: "var(--text-primary)" }}>
            <p>
              {whatYouDid || "Your response correctly demonstrates the governing concept and calculation."}
            </p>
          </div>
        </ContentSection>

        {rememberText && (
          <ContentSection title="KEY RULE REINFORCED" className="feedback-section-verified">
            <div className="type-body" style={{ color: "var(--state-success, #16a34a)", fontWeight: 600 }}>
              {rememberText}
            </div>
          </ContentSection>
        )}

        {targetVerification?.question && (
          <ContentSection title="CHECK YOUR THINKING" className="feedback-section-check">
            <div className="exercise-verify-card">
              <div className="type-body" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                <Markdown>{targetVerification.question}</Markdown>
              </div>
              {Array.isArray(targetVerification.options) && targetVerification.options.length > 0 && (
                <div className="exercise-verify-options">
                  {targetVerification.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`exercise-verify-option ${opt === targetVerification.correctAnswer ? "exercise-verify-option--correct" : ""}`}
                    >
                      <span>{opt}</span>
                      {opt === targetVerification.correctAnswer && (
                        <span className="exercise-verify-badge">✓ Key Distinction</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ContentSection>
        )}

        {expectedAnswer && (
          <StandardAnswer answer={expectedAnswer} steps={standardSteps} />
        )}
      </div>
    );
  }

  // ==========================================================================
  // PATH 2: INCORRECT — TEACHER MARKING EXERCISE BOOK
  // ==========================================================================

  const whyPoints = Array.isArray(whyThisIsWrong) ? whyThisIsWrong : (whyThisIsWrong ? [whyThisIsWrong] : []);
  const errorExplanation =
    diagDetail?.explanation ||
    breakPoint?.explanation ||
    (whyPoints.length > 0 ? whyPoints[0] : null) ||
    `Your calculation diverged from the expected result (${expectedAnswer}).`;

  // Fallback step generation if stepAnalysis is null but working exists
  const parsedStudentSteps = submittedWork ? submittedWork.split(/\r?\n/).map((s) => s.trim()).filter(Boolean) : [];
  const breakStepIndex = stepAnalysis?.whereYourWorkingBrokeDown?.stepIndex ?? parsedStudentSteps.length;
  const breakStudentStep = stepAnalysis?.whereYourWorkingBrokeDown?.studentStep || parsedStudentSteps[parsedStudentSteps.length - 1] || studentAns;
  const correctedStepVal = stepAnalysis?.whereYourWorkingBrokeDown?.correctedStep || expectedAnswer;

  return (
    <div className="teacher-exercise-book" aria-label="Teacher Marking Feedback">
      {/* 1. Header Meta Bar */}
      <div className="exercise-meta-bar">
        <span className="exercise-subject-badge">{subjectTopicHeader}</span>
        <span className="exercise-status-badge exercise-status-badge--needs-correction">
          Needs correction
        </span>
      </div>

      {/* 2. Question Statement */}
      <QuestionDisplay questionText={questionText} />

      {/* 3. YOUR SUBMISSION (Original student work preserved untouched) */}
      <div className="exercise-submission-card">
        <div className="exercise-submission-header">
          <span>Your Submission (Original Work)</span>
          <span style={{ color: "#dc2626", fontWeight: 700 }}>✗ Incorrect</span>
        </div>
        <div className="exercise-submission-content">
          {displaySubmission}
        </div>
      </div>

      {/* 4. LAYER 1: UNDERSTAND (Annotated Steps) */}
      {hasMultiLineWorking && parsedStudentSteps.length > 1 ? (
        <ContentSection title="LET'S LOOK AT YOUR STEPS">
          <div className="exercise-step-list">
            {parsedStudentSteps.map((line, idx) => {
              const stepNumber = idx + 1;
              const isErrorStep = stepNumber === breakStepIndex;
              const isValid = stepNumber < breakStepIndex;

              return (
                <div
                  key={idx}
                  className={`exercise-step-card ${isErrorStep ? "exercise-step-card--divergent" : "exercise-step-card--valid"}`}
                >
                  <div className="exercise-step-header">
                    <span className="exercise-step-title">
                      <span className="exercise-step-code">Step {stepNumber}:</span>
                      <code>{line}</code>
                    </span>
                    <span className={`exercise-step-badge ${isErrorStep ? "exercise-step-badge--error" : "exercise-step-badge--correct"}`}>
                      {isErrorStep ? "✗ Where your working went wrong" : "✓ Correct"}
                    </span>
                  </div>

                  <div className="exercise-step-explanation">
                    {isValid && (
                      <span>Valid step: You correctly followed the procedure up to this point.</span>
                    )}
                    {isErrorStep && (
                      <Markdown>{errorExplanation}</Markdown>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ContentSection>
      ) : (
        /* Single final answer submitted — Teacher explains the calculation */
        <ContentSection title="LET'S EXAMINE THE CALCULATION">
          {standardSteps.length > 0 ? (
            <div className="exercise-step-list">
              {standardSteps.map((s, idx) => (
                <div key={idx} className="exercise-step-card exercise-step-card--valid">
                  <div className="exercise-step-header">
                    <span className="exercise-step-title">Step {idx + 1}:</span>
                  </div>
                  <div className="exercise-step-explanation">
                    <Markdown>{s}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="type-body" style={{ color: "var(--text-primary)" }}>
              <p>The standard method leads to <strong>{expectedAnswer}</strong>.</p>
            </div>
          )}

          <div style={{ marginTop: "1rem" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Where your answer diverged
            </div>
            <div className="type-body">
              <p>
                You entered <strong>"{studentAns}"</strong>, but the expected calculation gives <strong>"{expectedAnswer}"</strong>.
              </p>
              <Markdown>{errorExplanation}</Markdown>
            </div>
          </div>
        </ContentSection>
      )}

      {/* 5. LAYER 2: REPAIR (Correcting the working) */}
      <ContentSection title="LET'S CORRECT YOUR WORKING" className="feedback-section-repair">
        <div className="exercise-comparison-box">
          <div className="exercise-comparison-col exercise-comparison-col--original">
            <div className="exercise-comparison-label">Your Original Step</div>
            <div className="exercise-comparison-value">
              {breakStudentStep}
            </div>
          </div>
          <div className="exercise-comparison-col exercise-comparison-col--corrected">
            <div className="exercise-comparison-label">Corrected Step</div>
            <div className="exercise-comparison-value">
              {correctedStepVal}
            </div>
          </div>
        </div>

        <div className="exercise-reassurance-note">
          You did not need to abandon your whole method — you only needed to correct this specific calculation step.
        </div>

        {rememberText && (
          <div style={{ marginTop: "0.75rem", fontSize: "0.92rem", color: "var(--text-primary)" }}>
            <strong>What to remember: </strong>
            <Markdown>{rememberText}</Markdown>
          </div>
        )}
      </ContentSection>

      {/* 6. LAYER 3: VERIFY (Targeted Same-Skill Retest) */}
      <ContentSection title="LET'S SEE IF YOU'VE GOT IT (Verification)" className="feedback-section-check">
        <div className="exercise-verify-card">
          <div className="type-body" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
            <Markdown>
              {targetVerification?.question || `Calculate the corrected step: What is ${correctedStepVal}?`}
            </Markdown>
          </div>

          {Array.isArray(targetVerification?.options) && targetVerification.options.length > 0 ? (
            <div className="exercise-verify-options">
              {targetVerification.options.map((opt, i) => (
                <div
                  key={i}
                  className={`exercise-verify-option ${opt === targetVerification.correctAnswer ? "exercise-verify-option--correct" : ""}`}
                >
                  <span>{opt}</span>
                  {opt === targetVerification.correctAnswer && (
                    <span className="exercise-verify-badge">✓ Correct Reasoning</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            expectedAnswer && (
              <div className="exercise-verify-options">
                <div className="exercise-verify-option exercise-verify-option--correct">
                  <span>{expectedAnswer}</span>
                  <span className="exercise-verify-badge">✓ Target Result</span>
                </div>
              </div>
            )
          )}
        </div>
      </ContentSection>

      {/* 7. Standard Solution Reference */}
      {expectedAnswer && (
        <StandardAnswer answer={expectedAnswer} steps={standardSteps} />
      )}
    </div>
  );
}
