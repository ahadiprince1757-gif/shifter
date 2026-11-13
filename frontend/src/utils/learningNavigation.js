/**
 * learningNavigation.js
 *
 * Centralised navigation utility for deep-linking into the learning flow.
 *
 * Instead of scattering URL construction across every component, all
 * navigation into /learn/* passes through here so the destination always
 * carries full context (mode, source, mistakeId, etc.).
 *
 * Usage:
 *   import { navigateToTopic } from "../utils/learningNavigation";
 *   navigateToTopic(navigate, { subjectId, chapterId, topicId, mode: "mistake_repair", mistakeId });
 */

export const LEARNING_MODES = {
  /** Standard flow — open Notes first, then Quiz */
  NORMAL: "normal",
  /** Jump straight to the Quiz phase to re-attempt a failed topic */
  MISTAKE_REPAIR: "mistake_repair",
  /** Jump straight to the Quiz phase for a scheduled spaced-repetition review */
  SPACED_REVIEW: "spaced_review",
};

/**
 * Build the canonical /learn path for a topic.
 *
 * @param {string} subjectId
 * @param {string} chapterId
 * @param {string} topicId   — may be a human-readable string or a slug
 * @returns {string}         — URL-safe path segment
 */
export function buildLearningPath(subjectId, chapterId, topicId) {
  if (!subjectId || !chapterId || !topicId) {
    return "/subjects";
  }
  return `/learn/${subjectId}/${chapterId}/${encodeURIComponent(topicId)}`;
}

/**
 * Navigate to a topic, optionally carrying repair context so LearnFlow
 * can skip directly to the Quiz phase and show a contextual banner.
 *
 * @param {Function} navigate   — react-router useNavigate()
 * @param {object}   opts
 * @param {string}   opts.subjectId
 * @param {string}   opts.chapterId
 * @param {string}   opts.topicId
 * @param {string}   [opts.mode]       — one of LEARNING_MODES (default: NORMAL)
 * @param {string}   [opts.source]     — where the navigation originated ("mistake_journal" | "analytics" | etc.)
 * @param {string}   [opts.mistakeId]  — ID of the specific mistake record (if applicable)
 * @param {string}   [opts.questionId] — ID of the exact question the learner got wrong
 */
export function navigateToTopic(navigate, opts = {}) {
  const {
    subjectId,
    chapterId,
    topicId,
    mode = LEARNING_MODES.NORMAL,
    source = null,
    mistakeId = null,
    questionId = null,
  } = opts;

  const path = buildLearningPath(subjectId, chapterId, topicId);

  if (path === "/subjects") {
    // Not enough information — fall back gracefully
    navigate("/subjects");
    return;
  }

  const state = {
    mode,
    source,
    mistakeId,
    questionId,
    subjectId,
    chapterId,
    topicId,
  };

  navigate(path, { state });
}
