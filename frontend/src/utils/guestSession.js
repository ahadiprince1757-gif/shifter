const GUEST_ID_KEY = "shifter_guest_id";
const GUEST_QUIZ_COUNT_KEY = "shifter_guest_quiz_count";
const MAX_FREE_QUIZZES = 3;

/** Get or create persistent guest ID */
export function getGuestId() {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = "guest_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
}

/** Get current count of completed quizzes in guest mode */
export function getQuizzesCompletedCount() {
  const raw = localStorage.getItem(GUEST_QUIZ_COUNT_KEY);
  const count = parseInt(raw, 10);
  return Number.isNaN(count) ? 0 : count;
}

/** Increment completed guest quiz count */
export function incrementGuestQuizCount() {
  const current = getQuizzesCompletedCount();
  const next = current + 1;
  localStorage.setItem(GUEST_QUIZ_COUNT_KEY, next.toString());
  return next;
}

/** Check if guest has reached free quiz limit (3 quizzes) */
export function isTeaserLimitReached() {
  return getQuizzesCompletedCount() >= MAX_FREE_QUIZZES;
}

/** Get remaining free quizzes for guest */
export function getRemainingFreeQuizzes() {
  const remaining = MAX_FREE_QUIZZES - getQuizzesCompletedCount();
  return Math.max(0, remaining);
}
