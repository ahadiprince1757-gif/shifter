/**
 * ============================================================================
 * TIXAR ANALYTICS EVIDENCE ADAPTER
 * ============================================================================
 *
 * Core Invariant:
 * The intelligence layer may reduce or interpret evidence, but it may NEVER
 * increase or fabricate evidence.
 * 1 question answered in the database = exactly 1 attempt in the engine.
 *
 * Responsibilities:
 * 1. Normalizes raw backend analytics data into canonical learning evidence.
 * 2. Preserves real client IDs, topic keys, correctness, timestamps, and metadata.
 * 3. Never fabricates cognitive levels (keeps null when untagged).
 * 4. Refuses to convert curriculum topics or navigation visits into learning evidence.
 * ============================================================================
 */

/**
 * Adapts raw /api/analytics response into standardized evidence.
 *
 * @param {Object} rawAnalytics - Raw API payload from /api/analytics
 * @returns {Object} { attempts, totalQuestionsAnswered, totalVisits, coldStart, intelligenceState }
 */
export function adaptAnalyticsToEvidence(rawAnalytics = null) {
  if (!rawAnalytics) {
    return {
      attempts: [],
      totalQuestionsAnswered: 0,
      totalVisits: 0,
      coldStart: true,
      intelligenceState: "no_evidence",
    };
  }

  const rawEvidence = rawAnalytics.evidence || {};
  const rawAttempts = Array.isArray(rawEvidence.attempts) ? rawEvidence.attempts : [];

  // Canonical Evidence Path: Real individual question attempts
  const attempts = rawAttempts.map((item) => ({
    id: item.id || null,
    clientEventId: item.client_event_id || null,
    topicId: item.topic_id || null,
    topic: item.topic || item.topic_title || "General",
    subjectId: item.subject_id || null,
    chapterId: item.chapter_id || null,
    correct: Boolean(item.correct),
    eventType: item.event_type || (item.correct ? "question_correct" : "question_incorrect"),
    cognitiveLevel: item.cognitive_level || null, // Truthful: null when not tagged
    timestamp: item.created_at || null,
    source: "telemetry",
  }));

  const totalQuestionsAnswered = attempts.length;
  const hasAssessmentEvidence = totalQuestionsAnswered > 0;
  const coldStart = rawAnalytics.coldStart ?? !hasAssessmentEvidence;

  const intelligenceState =
    rawAnalytics.intelligenceState ||
    (totalQuestionsAnswered === 0
      ? "no_evidence"
      : totalQuestionsAnswered < 5
      ? "early_evidence"
      : "established");

  const authority = rawAnalytics.authority || (rawAnalytics.decision ? "SERVER_VERIFIED" : "LOCAL_PROVISIONAL");
  const engineVersion = rawAnalytics.engineVersion || "2.0.0";
  const ruleVersion = rawAnalytics.ruleVersion || 1;
  const schemaVersion = rawAnalytics.schemaVersion || 1;
  const authoritativeDecision = rawAnalytics.decision || null;

  return {
    attempts,
    totalQuestionsAnswered,
    totalVisits: Number(rawEvidence.totalVisits) || 0,
    coldStart,
    intelligenceState,
    authority,
    engineVersion,
    ruleVersion,
    schemaVersion,
    authoritativeDecision,
    rawTopics: rawAnalytics.topics || [],
    mostVisited: rawAnalytics.mostVisited || [],
    unvisited: rawAnalytics.unvisited || [],
  };
}
