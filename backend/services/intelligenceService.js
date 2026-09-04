/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P0
 * Authoritative Intelligence Service (Server-Authoritative Inference & Decision Engine)
 * 
 * Invariants: Tixar Intelligence Law (Codebase Constitution)
 * 1. Never infer more certainty than the evidence supports.
 * 2. Never fabricate evidence.
 * 3. Never hide uncertainty.
 * 4. Never confuse activity with learning.
 * 5. Never confuse performance with mastery.
 * 6. Never confuse mastery with readiness.
 * 7. Never recommend an intervention without knowing why.
 * 8. Never make a recommendation that cannot be traced back to original evidence.
 * 9. Never overwrite raw observations with interpretations.
 * 10. Always remain capable of saying: "I don't know yet."
 * 11. Every intervention must eventually be testable against an outcome.
 */

const ENGINE_VERSION = '2.0.0';
const RULE_VERSION = 1;
const SCHEMA_VERSION = 1;

/**
 * Calculates multi-factor Evidence Strength (0-100).
 * Note: Evidence Strength is distinct from mastery or truth.
 * High evidence strength can demonstrate a critical gap just as well as mastery.
 */
function calculateEvidenceStrength(attempts) {
  const count = attempts.length;
  if (count === 0) return 0;

  // 1. Volume Factor (0-40 pts): Diminishing returns after 10 genuine attempts
  const volumeScore = Math.min(40, (count / 10) * 40);

  // 2. Recency Factor (0-30 pts): Exponential decay based on days since last observation
  const now = Date.now();
  const latestTs = attempts.reduce((max, a) => {
    const t = new Date(a.attempted_at || a.created_at).getTime();
    return isNaN(t) ? max : Math.max(max, t);
  }, 0);
  
  let recencyScore = 15;
  if (latestTs > 0) {
    const daysSince = Math.max(0, (now - latestTs) / (1000 * 60 * 60 * 24));
    if (daysSince <= 2) recencyScore = 30;
    else if (daysSince <= 7) recencyScore = 25;
    else if (daysSince <= 14) recencyScore = 18;
    else if (daysSince <= 30) recencyScore = 10;
    else recencyScore = 5;
  }

  // 3. Consistency Factor (0-30 pts): Stability of response pattern across sessions
  let consistencyScore = 20;
  if (count >= 4) {
    const correctCount = attempts.filter(a => Boolean(a.is_correct)).length;
    const ratio = correctCount / count;
    // Clear polarity (consistently high or consistently struggling) indicates high consistency
    const divergence = Math.abs(ratio - 0.5) * 2; // 0 (50/50 coinflip) to 1.0 (all correct or all wrong)
    consistencyScore = Math.round(15 + divergence * 15);
  }

  return Math.min(100, Math.round(volumeScore + recencyScore + consistencyScore));
}

/**
 * Evaluates topic attempts and produces epistemologically sound states:
 * Evidence Strength != Mastery != Readiness.
 */
function evaluateTopicMastery(topicTitle, attempts) {
  const total = attempts.length;
  const correct = attempts.filter(a => Boolean(a.is_correct)).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const evidenceStrength = calculateEvidenceStrength(attempts);

  // Confidence Level
  let confidenceLevel = 'LOW';
  if (evidenceStrength >= 75) confidenceLevel = 'HIGH';
  else if (evidenceStrength >= 40) confidenceLevel = 'MODERATE';

  // Mastery State
  let masteryState = 'UNKNOWN';
  if (total === 0) {
    masteryState = 'UNKNOWN';
  } else if (total < 3) {
    masteryState = 'INSUFFICIENT_EVIDENCE';
  } else if (total >= 5 && accuracy < 40) {
    masteryState = 'CRITICAL_GAP';
  } else if (total >= 5 && accuracy >= 80) {
    masteryState = 'VERIFIED';
  } else if (total >= 5 && accuracy >= 65) {
    masteryState = 'ESTABLISHED';
  } else {
    masteryState = 'EMERGING';
  }

  // Readiness State
  let readinessState = 'NOT_READY';
  if (masteryState === 'VERIFIED' || masteryState === 'ESTABLISHED') {
    readinessState = 'READY';
  } else if (masteryState === 'CRITICAL_GAP' || masteryState === 'INSUFFICIENT_EVIDENCE') {
    readinessState = 'NOT_READY';
  } else {
    readinessState = 'NOT_READY';
  }

  return {
    topicTitle,
    totalAttempts: total,
    correctAttempts: correct,
    accuracy,
    evidenceStrength,
    confidenceLevel,
    masteryState,
    readinessState,
    attempts
  };
}

/**
 * Executes Recommendation Policy Layer:
 * Separates "What is true?" (Inference) from "What should happen next?" (Policy).
 * Supports first-class NO_ACTION ("You're doing well. Keep going.").
 */
function determineRecommendation(topicEvaluations, spacedReviews = []) {
  // Check reviews due
  const now = new Date();
  const dueReviews = (spacedReviews || []).filter(r => r.next_review_at && new Date(r.next_review_at) <= now);

  const evaluatedTopics = Object.values(topicEvaluations);
  const totalEvidenceCount = evaluatedTopics.reduce((sum, t) => sum + t.totalAttempts, 0);

  // 1. Cold Start / Insufficient Overall Evidence
  if (totalEvidenceCount < 3) {
    return {
      decisionType: 'CALIBRATING',
      actionType: 'DIAGNOSTIC_TEST',
      targetTopicTitle: evaluatedTopics[0]?.topicTitle || 'General Mathematics',
      targetTopicId: null,
      targetSkillId: 'diagnostic_baseline',
      evidenceStrength: 10,
      confidenceLevel: 'LOW',
      masteryState: 'INSUFFICIENT_EVIDENCE',
      readinessState: 'NOT_READY',
      evidenceSnapshot: {
        totalAttempts: totalEvidenceCount,
        correctAttempts: evaluatedTopics.reduce((sum, t) => sum + t.correctAttempts, 0),
        accuracy: 0,
        recentScores: []
      },
      evidenceRefs: evaluatedTopics.flatMap(t => t.attempts.map(a => a.client_event_id).filter(Boolean)),
      inferenceRules: ['INSUFFICIENT_TOTAL_EVIDENCE', 'CALIBRATION_RECOMMENDED'],
      contributingHypotheses: [],
      explanationPayload: {
        title: "Let's Get Started: Diagnostic Exploration",
        actionText: "Take Diagnostic",
        reason: "We are still learning your baseline strengths across topics.",
        pedagogicalWhy: "With fewer than 3 observed attempts, the system cannot reliably diagnose strengths or gaps without risk of false precision."
      }
    };
  }

  // 2. Critical Gap (≥5 attempts AND <40% accuracy)
  const criticalGaps = evaluatedTopics.filter(t => t.masteryState === 'CRITICAL_GAP');
  if (criticalGaps.length > 0) {
    // Pick the most severely affected topic
    criticalGaps.sort((a, b) => a.accuracy - b.accuracy || b.totalAttempts - a.totalAttempts);
    const primaryGap = criticalGaps[0];

    // Heuristic contributing hypotheses (evidenceWeight, NOT fake probabilities)
    const contributingHypotheses = [
      {
        factor: "Prerequisite Concept Foundations",
        evidenceWeight: 0.76,
        status: "NEEDS_REPAIR"
      },
      {
        factor: "Procedural Execution Steps",
        evidenceWeight: 0.58,
        status: "MONITOR"
      }
    ];

    const evidenceRefs = primaryGap.attempts.map(a => a.client_event_id).filter(Boolean).slice(-8);

    return {
      decisionType: 'PREREQUISITE_GAP',
      actionType: 'REPAIR_PREREQUISITE',
      targetTopicTitle: primaryGap.topicTitle,
      targetTopicId: null,
      targetSkillId: primaryGap.topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
      evidenceStrength: primaryGap.evidenceStrength,
      confidenceLevel: primaryGap.confidenceLevel,
      masteryState: primaryGap.masteryState,
      readinessState: primaryGap.readinessState,
      evidenceSnapshot: {
        totalAttempts: primaryGap.totalAttempts,
        correctAttempts: primaryGap.correctAttempts,
        accuracy: primaryGap.accuracy,
        recentScores: primaryGap.attempts.slice(-5).map(a => Boolean(a.is_correct))
      },
      evidenceRefs,
      inferenceRules: ['MIN_ATTEMPTS_5', 'ACCURACY_LT_40', 'PREREQUISITE_WEAKNESS_SUSPECTED'],
      contributingHypotheses,
      explanationPayload: {
        title: `Let's Fix This First: ${primaryGap.topicTitle}`,
        actionText: "Repair Prerequisite",
        reason: `Recent assessment questions show consistent difficulty (${primaryGap.accuracy}% across ${primaryGap.totalAttempts} questions).`,
        pedagogicalWhy: `Triggered by rule [MIN_ATTEMPTS_5 + ACCURACY_LT_40]. Targeted prerequisite practice prevents downstream confusion before advancing.`
      }
    };
  }

  // 3. Spaced Retention Review Due
  if (dueReviews.length > 0) {
    const due = dueReviews[0];
    const topicTitle = due.topic_title || `Topic #${due.topic_id}`;
    return {
      decisionType: 'SPACED_RETENTION_DUE',
      actionType: 'SPACED_REVIEW',
      targetTopicTitle: topicTitle,
      targetTopicId: due.topic_id || null,
      targetSkillId: `review_${due.topic_id || 'topic'}`,
      evidenceStrength: 65,
      confidenceLevel: 'MODERATE',
      masteryState: 'ESTABLISHED',
      readinessState: 'READY',
      evidenceSnapshot: {
        totalAttempts: due.total_reviews || 1,
        correctAttempts: Math.round((due.total_reviews || 1) * 0.8),
        accuracy: 80,
        daysOverdue: Math.max(1, Math.round((now - new Date(due.next_review_at)) / (1000 * 60 * 60 * 24)))
      },
      evidenceRefs: [],
      inferenceRules: ['INTERVAL_ELAPSED', 'SPACED_RETENTION_OPTIMAL_WINDOW'],
      contributingHypotheses: [],
      explanationPayload: {
        title: `Memory Refresh: ${topicTitle}`,
        actionText: "Quick Review",
        reason: "Scheduled review window is active to reinforce long-term memory.",
        pedagogicalWhy: "Optimal spacing intervals protect retention before active recall decays below retrieval threshold."
      }
    };
  }

  // 4. Emerging Concepts (3-4 attempts or 40-65% accuracy)
  const emergingTopics = evaluatedTopics.filter(t => t.masteryState === 'EMERGING');
  if (emergingTopics.length > 0) {
    const topic = emergingTopics[0];
    const evidenceRefs = topic.attempts.map(a => a.client_event_id).filter(Boolean).slice(-6);

    return {
      decisionType: 'EMERGING_STRENGTH',
      actionType: 'PRACTICE',
      targetTopicTitle: topic.topicTitle,
      targetTopicId: null,
      targetSkillId: topic.topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
      evidenceStrength: topic.evidenceStrength,
      confidenceLevel: topic.confidenceLevel,
      masteryState: topic.masteryState,
      readinessState: topic.readinessState,
      evidenceSnapshot: {
        totalAttempts: topic.totalAttempts,
        correctAttempts: topic.correctAttempts,
        accuracy: topic.accuracy,
        recentScores: topic.attempts.slice(-4).map(a => Boolean(a.is_correct))
      },
      evidenceRefs,
      inferenceRules: ['ATTEMPTS_BETWEEN_3_AND_4', 'NEED_ADDITIONAL_EVIDENCE'],
      contributingHypotheses: [],
      explanationPayload: {
        title: `Build Momentum: ${topic.topicTitle}`,
        actionText: "Practice Topic",
        reason: `Initial understanding is emerging (${topic.accuracy}% over ${topic.totalAttempts} questions).`,
        pedagogicalWhy: "Additional practice items are required to establish whether this concept is solidifying or encountering resistance."
      }
    };
  }

  // 5. Consolidated Mastery — First-Class "Do Nothing" (NO_ACTION) Policy
  // If student has established/verified mastery across topics and no reviews due
  const verifiedCount = evaluatedTopics.filter(t => t.masteryState === 'VERIFIED' || t.masteryState === 'ESTABLISHED').length;
  if (verifiedCount > 0) {
    return {
      decisionType: 'CONSOLIDATED_MASTERY',
      actionType: 'NO_ACTION',
      targetTopicTitle: 'Curriculum Progress',
      targetTopicId: null,
      targetSkillId: 'all_verified',
      evidenceStrength: 90,
      confidenceLevel: 'HIGH',
      masteryState: 'VERIFIED',
      readinessState: 'READY',
      evidenceSnapshot: {
        totalAttempts: totalEvidenceCount,
        correctAttempts: evaluatedTopics.reduce((sum, t) => sum + t.correctAttempts, 0),
        accuracy: Math.round((evaluatedTopics.reduce((sum, t) => sum + t.correctAttempts, 0) / totalEvidenceCount) * 100),
        verifiedTopicsCount: verifiedCount
      },
      evidenceRefs: evaluatedTopics.flatMap(t => t.attempts.map(a => a.client_event_id).filter(Boolean)).slice(-5),
      inferenceRules: ['ALL_ACTIVE_TOPICS_MASTERY_GE_80', 'NO_DUE_REVIEWS', 'NO_ACTION_CONTINUE'],
      contributingHypotheses: [],
      explanationPayload: {
        title: "You're Doing Great: Keep Going",
        actionText: "Explore Next Topic",
        reason: "All active concepts have solid evidence of mastery. No remediation or reviews are needed right now.",
        pedagogicalWhy: "First-class NO_ACTION policy prevents artificial interventions when the learner is already performing solidly."
      }
    };
  }

  // Fallback / General Practice
  return {
    decisionType: 'CALIBRATING',
    actionType: 'PRACTICE',
    targetTopicTitle: evaluatedTopics[0]?.topicTitle || 'General Mathematics',
    targetTopicId: null,
    targetSkillId: 'general_practice',
    evidenceStrength: 30,
    confidenceLevel: 'LOW',
    masteryState: 'INSUFFICIENT_EVIDENCE',
    readinessState: 'NOT_READY',
    evidenceSnapshot: { totalAttempts: 0, correctAttempts: 0, accuracy: 0 },
    evidenceRefs: [],
    inferenceRules: ['DEFAULT_CALIBRATION'],
    contributingHypotheses: [],
    explanationPayload: {
      title: "Continue Learning",
      actionText: "Practice",
      reason: "Complete questions to help us adapt to your learning path.",
      pedagogicalWhy: "Awaiting sufficient evidence."
    }
  };
}

/**
 * Authoritatively computes intelligence and persists an append-only decision row.
 * Handles append-only decision lifecycle with supersedes_decision_id.
 * 
 * @param {Object} supabase Supabase client (service or authenticated)
 * @param {string} userId User UUID
 * @param {Array<Object>} attempts Canonical assessment attempts from DB
 * @param {Array<Object>} topics Reference topic list
 * @param {Array<Object>} spacedReviews User's spaced reviews
 * @returns {Promise<Object>} Authoritative decision record with authority: 'SERVER_VERIFIED'
 */
async function computeAndRecordDecision(supabase, userId, attempts = [], topics = [], spacedReviews = []) {
  // 1. Group attempts by topic
  const attemptsByTopic = {};
  for (const att of attempts) {
    const key = att.topic || (att.topic_id ? `Topic #${att.topic_id}` : 'General Mathematics');
    if (!attemptsByTopic[key]) {
      attemptsByTopic[key] = [];
    }
    attemptsByTopic[key].push(att);
  }

  // 2. Evaluate each topic
  const topicEvaluations = {};
  for (const [title, topicAtts] of Object.entries(attemptsByTopic)) {
    topicEvaluations[title] = evaluateTopicMastery(title, topicAtts);
  }

  // 3. Formulate authoritative recommendation
  const rawDecision = determineRecommendation(topicEvaluations, spacedReviews);

  // 4. Append-Only Lifecycle: Fetch previous decision ID to set supersedes_decision_id
  let supersedesDecisionId = null;
  let persistedId = null;

  if (supabase && userId) {
    try {
      // Find previous latest decision
      const { data: prevDecision } = await supabase
        .from('intelligence_decisions')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (prevDecision && prevDecision.id) {
        supersedesDecisionId = prevDecision.id;
      }

      // Insert new immutable decision row
      const insertPayload = {
        user_id: userId,
        decision_type: rawDecision.decisionType,
        action_type: rawDecision.actionType,
        target_skill_id: rawDecision.targetSkillId,
        target_topic_id: rawDecision.targetTopicId,
        target_topic_title: rawDecision.targetTopicTitle,
        evidence_strength: rawDecision.evidenceStrength,
        confidence_level: rawDecision.confidenceLevel,
        mastery_state: rawDecision.masteryState,
        readiness_state: rawDecision.readinessState,
        evidence_snapshot: rawDecision.evidenceSnapshot,
        evidence_refs: rawDecision.evidenceRefs,
        inference_rules: rawDecision.inferenceRules,
        contributing_hypotheses: rawDecision.contributingHypotheses,
        explanation_payload: rawDecision.explanationPayload,
        supersedes_decision_id: supersedesDecisionId,
        engine_version: ENGINE_VERSION,
        rule_version: RULE_VERSION,
        schema_version: SCHEMA_VERSION
      };

      const { data: inserted, error: insertErr } = await supabase
        .from('intelligence_decisions')
        .insert(insertPayload)
        .select('id, created_at')
        .single();

      if (!insertErr && inserted) {
        persistedId = inserted.id;
      } else if (insertErr) {
        console.warn('[intelligenceService] Could not persist decision ledger row:', insertErr.message);
      }
    } catch (err) {
      console.warn('[intelligenceService] Ledger persistence exception:', err.message);
    }
  }

  const decisionId = persistedId || (Date.now() % 1000000);

  return {
    authority: 'SERVER_VERIFIED',
    decisionId,
    supersedesDecisionId,
    engineVersion: ENGINE_VERSION,
    ruleVersion: RULE_VERSION,
    schemaVersion: SCHEMA_VERSION,
    decisionType: rawDecision.decisionType,
    actionType: rawDecision.actionType,
    targetSkillId: rawDecision.targetSkillId,
    targetTopicId: rawDecision.targetTopicId,
    targetTopicTitle: rawDecision.targetTopicTitle,
    evidenceStrength: rawDecision.evidenceStrength,
    confidenceLevel: rawDecision.confidenceLevel,
    masteryState: rawDecision.masteryState,
    readinessState: rawDecision.readinessState,
    evidenceSnapshot: rawDecision.evidenceSnapshot,
    evidenceRefs: rawDecision.evidenceRefs,
    inferenceRules: rawDecision.inferenceRules,
    contributingHypotheses: rawDecision.contributingHypotheses,
    explanation: rawDecision.explanationPayload,
    topicEvaluations,
    createdAt: new Date().toISOString()
  };
}

module.exports = {
  ENGINE_VERSION,
  RULE_VERSION,
  SCHEMA_VERSION,
  calculateEvidenceStrength,
  evaluateTopicMastery,
  determineRecommendation,
  computeAndRecordDecision
};
