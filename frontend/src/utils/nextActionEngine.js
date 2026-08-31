import { spacedRepo } from "../repository/spacedRepo";
import { mistakeRepo } from "../repository/mistakeRepo";

/**
 * Tixar Next Action Engine
 *
 * Purpose:
 * Decide the SINGLE highest-value learning action for a student.
 *
 * Priority:
 *
 * 1. MISCONCEPTION
 *    False belief detected → correct the belief before further practice.
 *
 * 2. OVERDUE REVIEW
 *    Previously learned knowledge is due for retrieval.
 *
 * 3. WEAKNESS
 *    Repeated failures / low mastery → targeted practice.
 *
 * 4. CONTINUE LEARNING
 *    Nothing urgent → allow the learner to continue normally.
 *
 * The engine deliberately returns ONE action.
 *
 * Tixar principle:
 *
 *     Diagnose → Decide → Act → Measure → Re-evaluate
 *
 * The engine should never attempt to teach everything at once.
 */

/* -------------------------------------------------------------------------- */
/* CONFIGURATION                                                              */
/* -------------------------------------------------------------------------- */

const CONFIG = {
  misconception: {
    minimumAttempts: 1,
  },

  weakness: {
    masteryThreshold: 0.3,
    minimumRepetitions: 2,
  },

  review: {
    highUrgencyCount: 3,
  },
};

/* -------------------------------------------------------------------------- */
/* PUBLIC API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Computes the most important next learning action for a student.
 *
 * @param {string|null} userId
 * @returns {Promise<Object|null>}
 */
export async function computeNextAction(userId) {
  try {
    const uid = userId || null;

    /*
     * Without a user ID we cannot safely query user-specific learning data.
     * Returning null is safer than accidentally exposing another user's state.
     */
    if (!uid) {
      console.warn(
        "[NextActionEngine] No userId supplied. Skipping personalised next action."
      );

      return null;
    }

    /* ---------------------------------------------------------------------- */
    /* LOAD LEARNING STATE                                                    */
    /* ---------------------------------------------------------------------- */

    const [unresolvedMistakes, dueReviews] = await Promise.all([
      mistakeRepo.getUnresolvedMistakes(uid),
      spacedRepo.getDueReviews(uid),
    ]);

    const mistakes = Array.isArray(unresolvedMistakes)
      ? unresolvedMistakes
      : [];

    const reviews = Array.isArray(dueReviews) ? dueReviews : [];

    /* ---------------------------------------------------------------------- */
    /* 1. MISCONCEPTION                                                      */
    /* ---------------------------------------------------------------------- */

    const misconceptionAction = await findMisconceptionAction(
      mistakes,
      uid
    );

    if (misconceptionAction) {
      return misconceptionAction;
    }

    /* ---------------------------------------------------------------------- */
    /* 2. OVERDUE SPACED REVIEW                                               */
    /* ---------------------------------------------------------------------- */

    const reviewAction = createReviewAction(reviews, mistakes);

    if (reviewAction) {
      return reviewAction;
    }

    /* ---------------------------------------------------------------------- */
    /* 3. LOW-MASTERY WEAK SPOT                                               */
    /* ---------------------------------------------------------------------- */

    const weakSpotAction = await findWeakSpotAction(mistakes, uid);

    if (weakSpotAction) {
      return weakSpotAction;
    }

    /* ---------------------------------------------------------------------- */
    /* 4. NOTHING URGENT                                                      */
    /* ---------------------------------------------------------------------- */

    return null;
  } catch (error) {
    console.error(
      "[NextActionEngine] Failed to compute next action:",
      error
    );

    /*
     * The recommendation engine must never break the learning experience.
     * If analytics fail, the learner can continue normally.
     */
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* MISCONCEPTION DETECTION                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Finds the most urgent unresolved misconception.
 *
 * A misconception is different from an ordinary mistake:
 *
 *     Mistake:
 *         Student got something wrong.
 *
 *     Misconception:
 *         Student appears to hold an incorrect mental model.
 *
 * Tixar should intervene differently for these two states.
 */
async function findMisconceptionAction(mistakes, userId) {
  if (!mistakes.length) {
    return null;
  }

  /*
   * Sort potentially important mistakes first.
   *
   * This prevents the order returned by IndexedDB/API from determining
   * which misconception Tixar chooses.
   */
  const candidates = [...mistakes].sort((a, b) => {
    const confidenceA = getConfidenceScore(a);
    const confidenceB = getConfidenceScore(b);

    if (confidenceB !== confidenceA) {
      return confidenceB - confidenceA;
    }

    return (
      getAttemptCount(b) -
      getAttemptCount(a)
    );
  });

  for (const mistake of candidates) {
    if (
      getAttemptCount(mistake) <
      CONFIG.misconception.minimumAttempts
    ) {
      continue;
    }

    const topicId = getTopicId(mistake);

    if (!topicId) {
      continue;
    }

    let reviewInfo = null;

    try {
      reviewInfo = await spacedRepo.getTopicReviewInfo(
        topicId,
        userId
      );
    } catch (error) {
      console.warn(
        "[NextActionEngine] Could not load review info:",
        error
      );
    }

    /*
     * Only classify the topic as a misconception when the learning-state
     * system explicitly says so.
     *
     * Do NOT infer misconception merely because the student was wrong.
     */
    if (
      reviewInfo?.learning_state !==
      "misconception"
    ) {
      continue;
    }

    return buildAction({
      type: "misconception",
      topic: topicId,
      subject: getSubjectId(mistake, reviewInfo),
      chapter: getChapterId(mistake, reviewInfo),
      urgency: "high",

      reason:
        "You may have formed an incorrect understanding of this concept. Let's correct the idea before you practise it further.",

      title: "Fix the misconception",

      instruction:
        "First understand why your current idea fails, then explain the correct idea in your own words.",

      btnText: "Fix This Concept",

      targetMode: "MISCONCEPTION_TEACH",

      route: buildLearningRoute(
        getSubjectId(mistake, reviewInfo),
        getChapterId(mistake, reviewInfo),
        topicId
      ),

      metadata: {
        attemptCount: getAttemptCount(mistake),
        learningState: "misconception",
      },
    });
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* SPACED REVIEW                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Chooses the most overdue review.
 */
function createReviewAction(dueReviews, mistakes) {
  if (!dueReviews.length) {
    return null;
  }

  const sortedReviews = [...dueReviews].sort(
    compareReviewDates
  );

  const top = sortedReviews[0];

  if (!top) {
    return null;
  }

  const topicId = getTopicId(top);

  if (!topicId) {
    return null;
  }

  const matchingMistake = mistakes.find(
    (mistake) =>
      getTopicId(mistake) === topicId
  );

  const subjectId =
    getSubjectId(top) ||
    getSubjectId(matchingMistake);

  const chapterId =
    getChapterId(top) ||
    getChapterId(matchingMistake);

  const overdueCount = dueReviews.length;

  const urgency =
    overdueCount >=
    CONFIG.review.highUrgencyCount
      ? "high"
      : "medium";

  return buildAction({
    type: "review",

    topic: topicId,

    subject: subjectId,

    chapter: chapterId,

    urgency,

    reason:
      "This topic is due for memory retrieval. Revisiting it now helps prevent previously learned knowledge from fading.",

    title: "Retrieve this from memory",

    instruction:
      "Try to answer without looking at your notes first. Retrieval is the test of whether the knowledge is still available.",

    btnText: "Start Review",

    targetMode: "RETRIEVE_UNASSISTED",

    route: buildLearningRoute(
      subjectId,
      chapterId,
      topicId
    ),

    metadata: {
      dueCount: overdueCount,
      nextReviewAt:
        top.next_review_at || null,
    },
  });
}

/* -------------------------------------------------------------------------- */
/* WEAKNESS DETECTION                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Finds a topic with genuinely weak mastery.
 *
 * Weakness is not triggered after one bad answer.
 *
 * We require:
 *
 *     mastery < threshold
 *     AND
 *     repetitions >= minimum
 *
 * This prevents Tixar from overreacting to one unlucky mistake.
 */
async function findWeakSpotAction(mistakes, userId) {
  let allReviews = [];

  try {
    /*
     * Prefer a repository method if available.
     *
     * This allows the data layer to enforce user isolation and indexing.
     */
    if (
      typeof spacedRepo.getAllReviews ===
      "function"
    ) {
      allReviews =
        (await spacedRepo.getAllReviews(userId)) || [];
    }
  } catch (error) {
    console.warn(
      "[NextActionEngine] Could not load all review records:",
      error
    );
  }

  /*
   * If repository support is unavailable, we deliberately do not query
   * the raw database here.
   *
   * The old implementation directly accessed:
   *
   *     db.spaced_reviews.toArray()
   *
   * That mixes the policy layer with the persistence layer and can
   * accidentally become a privacy problem.
   */

  if (!Array.isArray(allReviews)) {
    allReviews = [];
  }

  const weakSpots = allReviews
    .filter((review) => {
      if (
        review.user_id &&
        review.user_id !== userId
      ) {
        return false;
      }

      const mastery =
        Number(review.mastery_score);

      const repetitions =
        Number(review.repetitions);

      return (
        Number.isFinite(mastery) &&
        mastery <
          CONFIG.weakness.masteryThreshold &&
        Number.isFinite(repetitions) &&
        repetitions >=
          CONFIG.weakness.minimumRepetitions
      );
    })
    .sort(
      (a, b) =>
        Number(a.mastery_score) -
        Number(b.mastery_score)
    );

  if (!weakSpots.length) {
    return null;
  }

  const weakest = weakSpots[0];

  const topicId = getTopicId(weakest);

  if (!topicId) {
    return null;
  }

  const matchingMistake = mistakes.find(
    (mistake) =>
      getTopicId(mistake) === topicId
  );

  const subjectId =
    getSubjectId(weakest) ||
    getSubjectId(matchingMistake);

  const chapterId =
    getChapterId(weakest) ||
    getChapterId(matchingMistake);

  return buildAction({
    type: "weakness",

    topic: topicId,

    subject: subjectId,

    chapter: chapterId,

    urgency: "medium",

    reason:
      "This topic remains weak after repeated attempts. Let's practise the specific skill instead of simply moving on.",

    title: "Strengthen this weak spot",

    instruction:
      "Start with a targeted question at the edge of what you currently know. We will identify exactly where the reasoning breaks.",

    btnText: "Strengthen Topic",

    targetMode: "TARGETED_PRACTICE",

    route: buildLearningRoute(
      subjectId,
      chapterId,
      topicId
    ),

    metadata: {
      masteryScore:
        Number(weakest.mastery_score),

      repetitions:
        Number(weakest.repetitions),
    },
  });
}

/* -------------------------------------------------------------------------- */
/* ACTION BUILDER                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Creates a consistent action shape for the UI.
 *
 * Keeping the object shape consistent means the UI doesn't need to know
 * how the policy engine arrived at the decision.
 */
function buildAction({
  type,
  topic,
  subject,
  chapter,
  route,
  reason,
  urgency,
  title,
  instruction,
  btnText,
  targetMode,
  metadata = {},
}) {
  return {
    type,

    topic,

    subject: subject || null,

    chapter: chapter || null,

    route: route || "/analytics",

    reason,

    urgency,

    title,

    instruction,

    btnText,

    targetMode,

    metadata,
  };
}

/* -------------------------------------------------------------------------- */
/* IDENTITY HELPERS                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Normalises topic identity across repositories.
 *
 * Different records may use topic_id or topic_title.
 */
function getTopicId(record) {
  if (!record) {
    return null;
  }

  const value =
    record.topic_id ??
    record.topic_key ??
    record.topic_title ??
    record.topic;

  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const result = String(value).trim();

  return result || null;
}

/**
 * Normalises subject identity.
 */
function getSubjectId(record, fallback = null) {
  if (record) {
    const value =
      record.subject_id ??
      record.subject_key ??
      record.sid ??
      record.subject;

    if (
      value !== null &&
      value !== undefined &&
      String(value).trim()
    ) {
      return String(value).trim();
    }
  }

  return fallback;
}

/**
 * Normalises chapter identity.
 */
function getChapterId(record, fallback = null) {
  if (record) {
    const value =
      record.chapter_id ??
      record.chapter_key ??
      record.cid ??
      record.chapter;

    if (
      value !== null &&
      value !== undefined &&
      String(value).trim()
    ) {
      return String(value).trim();
    }
  }

  return fallback;
}

/* -------------------------------------------------------------------------- */
/* CONFIDENCE / ATTEMPT HELPERS                                               */
/* -------------------------------------------------------------------------- */

/**
 * Extracts confidence from different possible record shapes.
 */
function getConfidenceScore(record) {
  if (!record) {
    return 0;
  }

  const candidates = [
    record.confidence,
    record.confidence_score,
    record.self_confidence,
    record.confidenceRating,
  ];

  for (const value of candidates) {
    const numeric = Number(value);

    if (Number.isFinite(numeric)) {
      return numeric;
    }

    if (
      typeof value === "string"
    ) {
      const normalized =
        value.toLowerCase().trim();

      if (
        normalized.includes("very sure") ||
        normalized.includes("very confident")
      ) {
        return 4;
      }

      if (
        normalized.includes("sure") ||
        normalized.includes("confident")
      ) {
        return 3;
      }

      if (
        normalized.includes("unsure") ||
        normalized.includes("not sure")
      ) {
        return 1;
      }
    }
  }

  return 0;
}

function getAttemptCount(record) {
  const value =
    Number(record?.attempt_count);

  return Number.isFinite(value)
    ? value
    : 0;
}

/* -------------------------------------------------------------------------- */
/* DATE HANDLING                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Safely compares review dates.
 *
 * Invalid/missing dates are placed last rather than producing NaN
 * comparisons that can make Array.sort behave unpredictably.
 */
function compareReviewDates(a, b) {
  const dateA =
    parseDate(a?.next_review_at);

  const dateB =
    parseDate(b?.next_review_at);

  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return dateA - dateB;
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const time =
    new Date(value).getTime();

  return Number.isFinite(time)
    ? time
    : null;
}

/* -------------------------------------------------------------------------- */
/* ROUTING                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Builds a learner route when enough curriculum context exists.
 */
function buildLearningRoute(
  subjectId,
  chapterId,
  topicId
) {
  if (
    !subjectId ||
    !chapterId ||
    !topicId
  ) {
    return "/analytics";
  }

  return `/learn/${encodeURIComponent(
    subjectId
  )}/${encodeURIComponent(
    chapterId
  )}/${encodeURIComponent(topicId)}`;
}