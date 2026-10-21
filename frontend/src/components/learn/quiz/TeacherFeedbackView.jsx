import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function Markdown({ children }) {
  if (!children) return null;
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {String(children)}
    </ReactMarkdown>
  );
}

/**
 * TeacherFeedbackView
 *
 * Implements the deterministic teacher feedback interface matching the design in media_1792479448775.jpg.
 * Optimized specifically for mobile screens to eliminate cognitive clutter,
 * prevent horizontal squishing, and present high-clarity pedagogical guidance.
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

  const approachText =
    whatYouDid ||
    (studentAnswer ? `You answered: **${studentAnswer}**` : "");

  return (
    <div className="tfv-container" aria-label="Teacher Diagnostic Review">
      {/* ── CARD 0: QUESTION CONTEXT ── */}
      {questionText && (
        <section className="tfv-question-card">
          <div className="tfv-question-header">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="tfv-question-label">Question</span>
          </div>
          <div className="tfv-question-text">
            <Markdown>{questionText}</Markdown>
          </div>
        </section>
      )}

      {/* ── STEP ANALYSIS MODE (REASONING & RECONSTRUCTED WORKING) ── */}
      {stepAnalysis && status !== "correct" ? (
        <>
          {/* ── STAGE 1: WHAT YOU DID RIGHT ── */}
          {stepAnalysis.whatYouDidRight?.length > 0 && (
            <section className="tfv-card tfv-card-right">
              <div className="tfv-card-header">
                <div className="tfv-card-title-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gr, #10b981)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <h3 className="tfv-card-title">What You Did Right</h3>
                </div>
                <span className="tfv-badge tfv-badge-success">Step 1 — Correct</span>
              </div>
              <ul className="tfv-right-list">
                {stepAnalysis.whatYouDidRight.map((item, idx) => (
                  <li key={idx} className="tfv-right-item">
                    <Markdown>{item}</Markdown>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── STAGE 2: THIS IS WHERE YOUR WORKING GOES WRONG ── */}
          {stepAnalysis.whereYourWorkingBrokeDown && (
            <section className="tfv-card tfv-card-breakdown">
              <div className="tfv-card-header">
                <div className="tfv-card-title-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <h3 className="tfv-card-title">This Is Where Your Working Goes Wrong</h3>
                </div>
                <span className="tfv-badge tfv-badge-error">The Mistake</span>
              </div>

              <div className="tfv-breakdown-box">
                <div className="tfv-breakdown-student-line">
                  <span className="tfv-breakdown-tag-wrong">Your Step:</span>
                  <code className="tfv-code-highlight">{stepAnalysis.whereYourWorkingBrokeDown.studentStep}</code>
                </div>
                <div className="tfv-breakdown-explanation">
                  <Markdown>{stepAnalysis.whereYourWorkingBrokeDown.explanation}</Markdown>
                </div>
              </div>
            </section>
          )}

          {/* ── STAGE 3: YOUR CORRECTED WORKING (REBUILT FROM STUDENT ATTEMPT) ── */}
          {stepAnalysis.correctedWorking?.length > 0 && (
            <section className="tfv-card tfv-card-corrected">
              <div className="tfv-card-header">
                <div className="tfv-card-title-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--v, #6366f1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <h3 className="tfv-card-title">Your Corrected Working</h3>
                </div>
                <span className="tfv-badge tfv-badge-info">Rebuilt Solution</span>
              </div>

              <div className="tfv-corrected-work-list">
                {stepAnalysis.correctedWorking.map((item, idx) => (
                  <div
                    key={idx}
                    className={`tfv-corrected-row ${
                      item.status === "corrected" ? "highlight-corrected" : ""
                    }`}
                  >
                    <div className="tfv-corrected-line">
                      <code>{item.step}</code>
                      {item.status === "corrected" && (
                        <span className="tfv-corrected-tag">Corrected Step</span>
                      )}
                    </div>
                    {item.note && (
                      <div className="tfv-corrected-note">{item.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── STAGE 4: CHANGE THE WAY YOU APPROACH THIS ── */}
          {stepAnalysis.thinkingRepair && (
            <section className="tfv-remember-card">
              <div className="tfv-remember-header">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--v, #6366f1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
                </svg>
                <span className="tfv-remember-label">
                  {stepAnalysis.thinkingRepair.title || "Change the way you approach this"}
                </span>
              </div>
              <div className="tfv-remember-text">
                <Markdown>{stepAnalysis.thinkingRepair.strategy}</Markdown>
              </div>
            </section>
          )}
        </>
      ) : (
        /* ── STANDARD TEACHER FEEDBACK (WHEN NO STEP DEVIATION DETECTED) ── */
        <>
          {approachText && status !== "correct" && (
            <section className="tfv-card tfv-card-approach">
              <div className="tfv-card-header">
                <div className="tfv-card-title-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="tfv-icon-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <h3 className="tfv-card-title">Your Approach</h3>
                </div>
                <span className="tfv-badge tfv-badge-error">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>What you did</span>
                </span>
              </div>

              <div className="tfv-what-you-did-box">
                <svg
                  className="tfv-box-alert-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div className="tfv-what-you-did-text">
                  <Markdown>{approachText}</Markdown>
                </div>
              </div>

              {Array.isArray(whyThisIsWrong) && whyThisIsWrong.length > 0 && (
                <div className="tfv-why-wrong-section">
                  <h4 className="tfv-why-wrong-heading">Why this is wrong</h4>
                  <ul className="tfv-why-wrong-list">
                    {whyThisIsWrong.map((point, idx) => (
                      <li key={idx} className="tfv-why-wrong-item">
                        <Markdown>{point}</Markdown>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* ── CARD 2: THE RIGHT WAY ── */}
          {rightWaySteps.length > 0 && (
            <section className="tfv-card tfv-card-right-way">
              <div className="tfv-card-header">
                <div className="tfv-card-title-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gr, #10b981)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <h3 className="tfv-card-title">The Right Way</h3>
                </div>
                <span className="tfv-badge tfv-badge-success">
                  Follow this
                </span>
              </div>

              <ol className="tfv-steps-list">
                {rightWaySteps.map((step, idx) => (
                  <li key={idx} className="tfv-step-item">
                    <span className="tfv-step-badge">{idx + 1}</span>
                    <div className="tfv-step-content">
                      <Markdown>{step}</Markdown>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ── CARD 3: KEY RULE TO REMEMBER ── */}
          {rememberText && (
            <section className="tfv-remember-card">
              <div className="tfv-remember-header">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--v, #6366f1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
                </svg>
                <span className="tfv-remember-label">Rule to Remember</span>
              </div>
              <p className="tfv-remember-text">
                <Markdown>{rememberText}</Markdown>
              </p>
            </section>
          )}
        </>
      )}

      {/* ── CARD 4: FINAL CORRECT ANSWER ── */}
      {rawAnswer && (
        <section className="tfv-final-answer-card">
          <div className="tfv-final-answer-header">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Standard Answer</span>
          </div>
          <div className="tfv-final-answer-val">
            <Markdown>{rawAnswer}</Markdown>
          </div>
        </section>
      )}
    </div>
  );
}
