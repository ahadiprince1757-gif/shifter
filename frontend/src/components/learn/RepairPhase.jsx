import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { questionMutator } from "../../utils/questionMutator";
import { evaluateAnswer } from "../../utils/grader";
import { isCalculationQuestion } from "../../utils/questionTypeHelper";
import { getAtomicRepairContent } from "../../engine/repairPlanner";
import { verifyRepair, OUTCOME } from "../../engine/repairVerifier";
import { selectCrossSubjectRepair, DIAGNOSTIC_CERTAINTY } from "../../engine/crossSubjectRepairSelector";
import { verifyFoundationalRetest, verifyContextualTransfer, VERIFICATION_OUTCOME } from "../../engine/crossSubjectVerifier";
import { getPilotQuestionById } from "../../engine/pilotQuestionRegistry";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";

// Feature Flag: Enable Cross-Subject Repair & Two-Stage Verification
export const ENABLE_CROSS_SUBJECT_REPAIR = true;

/**
 * RepairPhase
 *
 * Runs one repair cycle per weak concept:
 *   1. Show a targeted mini-explanation card (only the relevant section, not all notes)
 *   2. Give a mutated variant of one of the failed questions (closed-book retrieval)
 *   3. On correct answer → advance to next concept
 *   4. On wrong answer → allow one more attempt, then advance anyway
 *
 * Props:
 *   conceptTag       string    — current concept being repaired
 *   repairData       object    — { questions[], repairTaught, repairPassed }
 *   content          object    — full topic content (notes + qs)
 *   subject          object
 *   currentIdx       number    — which repair we're on (1-based display)
 *   totalConcepts    number
 *   onTaught         function  — called when mini-explain shown, ready for retrieval
 *   onPassed         function  — called when repair answered correctly
 *   onSkip           function  — called when learner has used all attempts
 */
function RepairPhase({
  conceptTag,
  repairData,
  content,
  subject,
  currentIdx,
  totalConcepts,
  onTaught,
  onPassed,
  onSkip,
}) {
  const [repairStep, setRepairStep] = useState("teach"); // "teach" | "retrieve"
  const [verificationStage, setVerificationStage] = useState("foundational"); // "foundational" | "contextual"
  const [repairQ, setRepairQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [, setWork] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [validationError, setValidationError] = useState("");

  const primaryFailed = repairData?.questions?.[0] || null;

  // ── Cross-Subject Repair Plan (Feature Flagged) ───────────────────────────
  const crossSubjectPlan = useMemo(() => {
    if (!ENABLE_CROSS_SUBJECT_REPAIR || !primaryFailed) return null;
    const originalQ = primaryFailed.originalQ || (content?.qs?.[primaryFailed.qIdx]);
    if (!originalQ) return null;

    const pilotSpec = getPilotQuestionById(originalQ.questionId || originalQ.id);
    const targetQ = pilotSpec || {
      questionId: originalQ.questionId || originalQ.id || "custom_q",
      subjectId: subject?.id || subject?.name || "chemistry",
      topicId: content?.id || "general",
      ...originalQ,
    };

    const diag = primaryFailed.diagnosis || primaryFailed.analysis?.diagnosis || {
      status: "CONFIRMED",
      certainty: DIAGNOSTIC_CERTAINTY.OBSERVED_CALCULATION_ERROR,
      targetSkillId: primaryFailed.skillId || conceptTag,
    };

    const submission = {
      rawAnswer: primaryFailed.userAnswer || primaryFailed.studentAnswer || "",
      workingLines: primaryFailed.workingLines || (primaryFailed.userAnswer ? [primaryFailed.userAnswer] : []),
    };

    const plan = selectCrossSubjectRepair({
      question: targetQ,
      diagnosis: diag,
      submission,
    });

    return plan?.status === "REPAIR_SELECTED" && plan.isCrossSubject ? plan : null;
  }, [primaryFailed, content, subject, conceptTag]);

  // ── Concept snippet extraction ──────────────────────────────────────────────
  // Try to find a relevant paragraph from the notes using the concept tag or
  // question text as a search term. Falls back to first 600 chars of notes.
  const extractConceptSnippet = () => {
    const notes = Array.isArray(content?.notes)
      ? content.notes.join("\n\n")
      : content?.notes || "";

    if (!notes) return null;

    // Build search terms from concept tag and question text
    const searchTerms = [
      ...(conceptTag || "").replace(/_/g, " ").split(" ").filter((w) => w.length > 3),
      ...(primaryFailed?.questionText || "")
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 4)
        .slice(0, 5),
    ];

    // Split notes into paragraphs and score them
    const paragraphs = notes.split(/\n{2,}/);
    let bestPara = null;
    let bestScore = 0;

    for (const para of paragraphs) {
      const lc = para.toLowerCase();
      const score = searchTerms.filter((t) => lc.includes(t)).length;
      if (score > bestScore) {
        bestScore = score;
        bestPara = para;
      }
    }

    // Use the best paragraph + the one after it for context
    if (bestPara && bestScore > 0) {
      const idx = paragraphs.indexOf(bestPara);
      const snippet = [bestPara, paragraphs[idx + 1] || ""].join("\n\n").trim();
      return snippet.length > 800 ? snippet.slice(0, 800) + "…" : snippet;
    }

    // Fallback: first 600 chars of notes
    return notes.slice(0, 600) + (notes.length > 600 ? "…" : "");
  };

  const atomicRepair = getAtomicRepairContent(conceptTag);
  const snippet = extractConceptSnippet();

  // ── Start retrieval after mini-teach ───────────────────────────────────────
  const handleStartRetrieval = () => {
    if (crossSubjectPlan) {
      setVerificationStage("foundational");
      setRepairQ(crossSubjectPlan.foundationalRetest);
      setRepairStep("retrieve");
      if (onTaught) onTaught(conceptTag);
      return;
    }

    // Generate a mutated variant of the failed question using diagnosis & skill context
    const originalQ = primaryFailed?.originalQ || (content?.qs?.[primaryFailed?.qIdx]);
    const subjectName = subject?.name || subject?.id || "";
    const mutated = originalQ
      ? questionMutator.mutateForRepair({
          originalQuestion: originalQ,
          targetSkill: conceptTag || primaryFailed?.skillId,
          diagnosis: primaryFailed?.diagnosis || primaryFailed?.analysis?.diagnosis,
          subjectName,
          correctAnswer: primaryFailed?.correctAnswer || "",
        }) || originalQ
      : null;

    setRepairQ(mutated);
    setRepairStep("retrieve");
    if (onTaught) onTaught(conceptTag);
  };

  // ── Submit repair answer ───────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!answer.trim()) {
      setValidationError("Please type your answer before submitting.");
      return;
    }
    setValidationError("");

    if (crossSubjectPlan) {
      if (verificationStage === "foundational") {
        const retestResult = verifyFoundationalRetest({
          repairPlan: crossSubjectPlan,
          studentAnswer: answer,
        });
        const isPass = retestResult.status === VERIFICATION_OUTCOME.ACQUISITION_CONFIRMED;
        setFeedback({
          isCorrect: isPass,
          correctAnswer: crossSubjectPlan.foundationalRetest?.ans,
          message: isPass
            ? "Foundational arithmetic verified! Ready to apply back in Chemistry."
            : "Check your calculation.",
        });
        setAttempts((a) => a + 1);
        return;
      } else {
        const transferResult = verifyContextualTransfer({
          repairPlan: crossSubjectPlan,
          studentAnswer: answer,
        });
        const isPass = transferResult.status === VERIFICATION_OUTCOME.TRANSFER_CONFIRMED;
        setFeedback({
          isCorrect: isPass,
          correctAnswer: crossSubjectPlan.contextualTransfer?.ans,
          message: isPass
            ? "Contextual transfer verified! Excellent work."
            : "Check your stoichiometric ratio calculation.",
        });
        setAttempts((a) => a + 1);
        return;
      }
    }

    const q = repairQ || primaryFailed?.originalQ;
    if (!q) return;

    const res = evaluateAnswer(answer, q);
    const plan = {
      repairTarget: conceptTag || "unknown",
      repairMode: "ISOLATE",
      questionMode: "ISOLATED_SKILL",
    };
    const verification = verifyRepair(plan, q, { answer, timeMs: 0 });

    setFeedback({
      ...res,
      verification,
      isRepaired: verification.outcome === OUTCOME.REPAIRED || res.isCorrect,
    });
    setAttempts((a) => a + 1);
  };

  // ── Advance after feedback ──────────────────────────────────────────────────
  const handleAdvance = () => {
    if (crossSubjectPlan) {
      if (verificationStage === "foundational") {
        if (feedback?.isCorrect) {
          // Transition to Stage 2: Contextual Transfer
          setVerificationStage("contextual");
          setRepairQ(crossSubjectPlan.contextualTransfer);
          setAnswer("");
          setWork("");
          setFeedback(null);
          setAttempts(0);
          setShowHint(false);
          return;
        } else if (attempts >= 2) {
          if (onSkip) onSkip(conceptTag);
        } else {
          // Retry foundational
          setAnswer("");
          setFeedback(null);
        }
        return;
      } else {
        // Stage 2: Contextual Transfer
        if (feedback?.isCorrect) {
          if (onPassed) onPassed(conceptTag);
        } else if (attempts >= 2) {
          if (onSkip) onSkip(conceptTag);
        } else {
          setAnswer("");
          setFeedback(null);
        }
        return;
      }
    }

    const isRepaired =
      feedback?.verification?.outcome === OUTCOME.REPAIRED ||
      Boolean(feedback?.isCorrect);

    if (isRepaired) {
      if (onPassed) onPassed(conceptTag);
    } else if (attempts >= 2 || feedback?.verification?.shouldEndRepairLoop) {
      // Two attempts or verifier terminal failure -> advance
      if (onSkip) onSkip(conceptTag);
    } else {
      // Allow one more attempt
      setAnswer("");
      setWork("");
      setFeedback(null);
      setShowHint(false);
    }
  };

  const conceptLabel = (conceptTag || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="lc" id="repairCard">
      {/* Header */}
      <div className="lch">
        <span className="lbadge lb-repair">Repair</span>
        <span className="repair-progress-label">
          Concept {currentIdx} of {totalConcepts}
        </span>
      </div>

      <div className="lcb">
        {/* ── TEACH step ── */}
        {repairStep === "teach" && (
          <div className="repair-teach-block">
            <div className="repair-concept-header">
              <div>
                <div className="repair-concept-title">Where Your Understanding Broke</div>
                <div className="repair-concept-tag">{conceptLabel}</div>
              </div>
            </div>

            {primaryFailed && (
              <div className="repair-missed-q">
                <div className="repair-missed-label">Question you missed:</div>
                <div className="repair-missed-text">{primaryFailed.questionText}</div>
                {primaryFailed.correctAnswer && (
                  <div className="repair-correct-answer">
                    <span className="repair-answer-label">Correct answer:</span>{" "}
                    <span className="repair-answer-value">{primaryFailed.correctAnswer}</span>
                  </div>
                )}
                {primaryFailed.solution && (
                  <div className="repair-solution">
                    <div className="repair-solution-label">Why:</div>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {primaryFailed.solution}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {crossSubjectPlan ? (
              <div className="repair-cross-subject-card" style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "8px", padding: "1rem", margin: "1rem 0" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#e0e7ff", color: "#3730a3", padding: "0.25rem 0.6rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                  <span>🔀 Cross-Subject Prerequisite Gap:</span>
                  <span>{crossSubjectPlan.sourceSubjectId?.toUpperCase()} → {crossSubjectPlan.originatingSubjectId?.toUpperCase()}</span>
                </div>
                <div style={{ fontWeight: 600, color: "var(--accent, #6366f1)", marginBottom: "0.4rem" }}>
                  Foundational Rule from {crossSubjectPlan.sourceSubjectId === "math" ? "Mathematics" : crossSubjectPlan.sourceSubjectId}: {crossSubjectPlan.diagnosedSkillName}
                </div>
                <div style={{ marginBottom: "0.4rem", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  {crossSubjectPlan.rule}
                </div>
                {crossSubjectPlan.example && (
                  <div style={{ fontSize: "0.85rem", opacity: 0.85, fontStyle: "italic", marginBottom: "0.6rem" }}>
                    Example: {crossSubjectPlan.example}
                  </div>
                )}
                {crossSubjectPlan.noteSection?.contentHtml && (
                  <div style={{ borderTop: "1px dashed rgba(99, 102, 241, 0.2)", paddingTop: "0.6rem", fontSize: "0.9rem" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {crossSubjectPlan.noteSection.contentHtml}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ) : (
              <>
                {atomicRepair && (
                  <div className="repair-atomic-card" style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "8px", padding: "1rem", margin: "1rem 0" }}>
                    <div style={{ fontWeight: 600, color: "var(--accent, #6366f1)", marginBottom: "0.4rem" }}>
                      Key Principle to Apply:
                    </div>
                    <div style={{ marginBottom: "0.4rem", fontSize: "0.95rem", lineHeight: 1.5 }}>
                      {atomicRepair.rule}
                    </div>
                    {atomicRepair.example && (
                      <div style={{ fontSize: "0.85rem", opacity: 0.85, fontStyle: "italic" }}>
                        Example: {atomicRepair.example}
                      </div>
                    )}
                  </div>
                )}

                {snippet && (
                  <div className="repair-snippet-card">
                    <div className="repair-snippet-label">Relevant concept from your notes:</div>
                    <div className="repair-snippet-body">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {snippet}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              className="btn-p repair-ready-btn"
              onClick={handleStartRetrieval}
            >
              {crossSubjectPlan
                ? "I understand — test foundational calculation →"
                : "I understand — test me on this →"}
            </button>
          </div>
        )}

        {/* ── RETRIEVE step ── */}
        {repairStep === "retrieve" && repairQ && (
          <div className="repair-retrieve-block">
            <div className="repair-retrieve-banner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                {crossSubjectPlan
                  ? verificationStage === "foundational"
                    ? "Stage 1: Verify Foundational Arithmetic (Isolated Primitive)"
                    : "Stage 2: Contextual Transfer in Chemistry (Closed Book)"
                  : "Retrieval — answer from memory. Notes are closed."}
              </span>
              {crossSubjectPlan && (
                <span style={{ fontSize: "0.75rem", opacity: 0.85, fontWeight: 600 }}>
                  {verificationStage === "foundational" ? "Step 1 of 2" : "Step 2 of 2"}
                </span>
              )}
            </div>

            <QuestionDisplay
              isCalc={isCalculationQuestion(repairQ, subject?.name || subject?.label)}
              questionText={repairQ.q}
            />

            {/* MCQ options */}
            {repairQ.type === "mcq" && Array.isArray(repairQ.options) && repairQ.options.length > 0 ? (
              <div className="mcq-group">
                {repairQ.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`mcq-option${answer === opt ? " mcq-selected" : ""}${feedback ? " mcq-disabled" : ""}`}
                    onClick={() => !feedback && setAnswer(opt)}
                  >
                    <input
                      type="radio"
                      name="repair-mcq"
                      className="mcq-radio"
                      value={opt}
                      checked={answer === opt}
                      onChange={() => !feedback && setAnswer(opt)}
                      disabled={!!feedback}
                    />
                    <span className="mcq-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="mcq-label">{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                className="quiz-input"
                rows={3}
                placeholder="Your answer…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!!feedback}
              />
            )}

            {validationError && (
              <div className="validation-error">{validationError}</div>
            )}

            <HintBox showHint={showHint} hintText={repairQ.hint} hints={repairQ.hints} />

            {!feedback && (
              <div className="repair-action-row">
                <button
                  className="btn-g"
                  onClick={() => setShowHint((s) => !s)}
                >
                  {showHint ? "Hide hint" : "Show hint"}
                </button>
                <button
                  className="btn-p"
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                >
                  Submit
                </button>
              </div>
            )}

            {feedback && (
              <div className={`repair-feedback ${feedback.isCorrect ? "repair-feedback--pass" : "repair-feedback--fail"}`}>
                <div className="repair-feedback-status">
                  {feedback.isCorrect ? "✓ Correct" : attempts >= 2 ? "Moving on" : "✗ Try once more"}
                </div>
                {feedback.correctAnswer && String(feedback.correctAnswer).trim().toLowerCase() !== "undefined" && !feedback.isCorrect && (
                  <div className="repair-feedback-answer">
                    Correct: <strong>{feedback.correctAnswer}</strong>
                  </div>
                )}
                <button className="btn-p repair-next-btn" onClick={handleAdvance}>
                  {crossSubjectPlan && verificationStage === "foundational" && feedback.isCorrect
                    ? "Proceed to Chemistry Problem →"
                    : feedback.isCorrect
                    ? "Next →"
                    : attempts >= 2
                    ? "Continue anyway →"
                    : "Try again →"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RepairPhase;
