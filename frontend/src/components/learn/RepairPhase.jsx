import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { questionMutator } from "../../utils/questionMutator";
import { evaluateAnswer } from "../../utils/grader";
import { isCalculationQuestion } from "../../utils/questionTypeHelper";
import { getAtomicRepairContent } from "../../engine/repairPlanner";
import { verifyRepair, OUTCOME } from "../../engine/repairVerifier";
import QuestionDisplay from "./quiz/QuestionDisplay";
import HintBox from "./quiz/HintBox";

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
  const [repairQ, setRepairQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [, setWork] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [validationError, setValidationError] = useState("");

  const primaryFailed = repairData?.questions?.[0] || null;

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

            <button
              className="btn-p repair-ready-btn"
              onClick={handleStartRetrieval}
            >
              I understand — test me on this →
            </button>
          </div>
        )}

        {/* ── RETRIEVE step ── */}
        {repairStep === "retrieve" && repairQ && (
          <div className="repair-retrieve-block">
            <div className="repair-retrieve-banner">
              Retrieval — answer from memory. Notes are closed.
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
                  {feedback.isCorrect
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
