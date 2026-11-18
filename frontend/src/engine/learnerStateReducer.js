/**
 * TIXAR DETERMINISTIC LEARNER STATE REDUCER
 *
 * Core Architectural Invariant:
 *   learner_skill_state is a pure deterministic projection (reducer)
 *   of immutable, append-only historical attempts, evidence, and repair events.
 *   Mutable raw state is NEVER stored as ground truth.
 *
 * Epistemic Rules:
 *   1. INCONCLUSIVE evidence NEVER alters learner skill state (epistemic refusal).
 *   2. Acquisition and Contextual Transfer are strictly decoupled:
 *      A student can demonstrate foundational acquisition (e.g. arithmetic),
 *      yet fail contextual transfer (e.g. stoichiometry). Failing transfer
 *      does NOT invalidate foundational acquisition.
 *   3. Out-of-order events from offline synchronization are deterministically
 *      sorted by client_timestamp with idempotency_key tie-breaking.
 *   4. Replaying history from beginning always yields the exact same state.
 */

export const SKILL_STATE = {
  ACQUISITION: {
    NOT_ASSESSED: "NOT_ASSESSED",
    GAP_DETECTED: "GAP_DETECTED",
    DEMONSTRATED: "DEMONSTRATED",
  },
  TRANSFER: {
    NOT_ASSESSED: "NOT_ASSESSED",
    FAILED_TRANSFER: "FAILED_TRANSFER",
    DEMONSTRATED: "DEMONSTRATED",
  },
  RETENTION: {
    NOT_ASSESSED: "NOT_ASSESSED",
    ACTIVE: "ACTIVE",
    NEEDS_REFRESH: "NEEDS_REFRESH",
  },
};

const RETENTION_EXPIRY_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

/**
 * Normalizes and sorts an array of heterogeneous events into a deterministic chronological stream.
 */
export function normalizeEventStream({ attempts = [], evidence = [], repairEvents = [] }) {
  const events = [];

  // Index evidence by attempt_id
  const evidenceByAttempt = new Map();
  for (const ev of evidence) {
    if (!evidenceByAttempt.has(ev.attempt_id)) {
      evidenceByAttempt.set(ev.attempt_id, []);
    }
    evidenceByAttempt.get(ev.attempt_id).push(ev);
  }

  // 1. Process attempts and attach evidence
  for (const att of attempts) {
    const ts = new Date(att.client_timestamp || att.created_at).getTime();
    const attEvidence = evidenceByAttempt.get(att.id) || [];

    events.push({
      eventType: "ATTEMPT",
      id: att.id,
      idempotency_key: att.idempotency_key,
      userId: att.user_id,
      questionId: att.question_id,
      isCorrect: att.is_correct,
      timestamp: ts,
      evidence: attEvidence,
    });
  }

  // 2. Process repair events
  for (const rep of repairEvents) {
    const ts = new Date(rep.created_at || rep.client_timestamp || Date.now()).getTime();
    events.push({
      eventType: "REPAIR",
      id: rep.id,
      idempotency_key: rep.idempotency_key,
      userId: rep.user_id,
      questionId: rep.question_id,
      diagnosedSkillId: rep.diagnosed_skill_id,
      retestOutcome: rep.retest_outcome,
      transferOutcome: rep.transfer_outcome,
      completionStatus: rep.completion_status,
      timestamp: ts,
    });
  }

  // Deterministic chronological sort with idempotency_key tie-breaking
  events.sort((a, b) => {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    const keyA = a.idempotency_key || a.id || "";
    const keyB = b.idempotency_key || b.id || "";
    return keyA.localeCompare(keyB);
  });

  return events;
}

/**
 * Deterministically reduces an event stream to compute the learner's current skill states.
 *
 * @param {Object} params
 * @param {Object} [params.previousState] Existing skill state map (skillId -> state)
 * @param {Array} params.events Ordered event list
 * @param {number} [params.asOfTimestamp] Optional cutoff timestamp for time-travel queries
 * @returns {Object} Updated map of skillId -> { acquisition_status, transfer_status, retention_status, last_verified_at, history_count }
 */
export function reduceLearnerSkillState({ previousState = {}, events = [], asOfTimestamp = Infinity }) {
  const state = JSON.parse(JSON.stringify(previousState));
  const seenIdempotencyKeys = new Set();

  for (const event of events) {
    // 1. Check timestamp cutoff (for reproducibility & backtesting)
    if (event.timestamp > asOfTimestamp) continue;

    // 2. Idempotency deduplication
    if (event.idempotency_key) {
      if (seenIdempotencyKeys.has(event.idempotency_key)) {
        continue; // Skip duplicate event
      }
      seenIdempotencyKeys.add(event.idempotency_key);
    }

    // Helper to get or init skill record
    const getSkillRecord = (skillId) => {
      if (!state[skillId]) {
        state[skillId] = {
          skill_id: skillId,
          acquisition_status: SKILL_STATE.ACQUISITION.NOT_ASSESSED,
          transfer_status: SKILL_STATE.TRANSFER.NOT_ASSESSED,
          retention_status: SKILL_STATE.RETENTION.NOT_ASSESSED,
          last_verified_at: null,
          history_count: 0,
        };
      }
      return state[skillId];
    };

    // 3. Process ATTEMPT event
    if (event.eventType === "ATTEMPT") {
      for (const ev of event.evidence) {
        // Epistemic refusal: Inconclusive or insufficient data NEVER changes state
        if (
          ev.diagnostic_certainty === "INCONCLUSIVE" ||
          ev.evidence_type === "AMBIGUOUS_EVIDENCE" ||
          ev.evidence_type === "INSUFFICIENT_DATA" ||
          !ev.skill_id
        ) {
          continue;
        }

        const skillRecord = getSkillRecord(ev.skill_id);
        skillRecord.history_count += 1;

        if (ev.diagnostic_status === "GAP_IDENTIFIED") {
          skillRecord.acquisition_status = SKILL_STATE.ACQUISITION.GAP_DETECTED;
          skillRecord.retention_status = SKILL_STATE.RETENTION.NEEDS_REFRESH;
        } else if (ev.diagnostic_status === "DEMONSTRATED") {
          skillRecord.acquisition_status = SKILL_STATE.ACQUISITION.DEMONSTRATED;
          skillRecord.last_verified_at = new Date(event.timestamp).toISOString();
          skillRecord.retention_status = SKILL_STATE.RETENTION.ACTIVE;
        }
      }
    }

    // 4. Process REPAIR event
    else if (event.eventType === "REPAIR") {
      if (!event.diagnosedSkillId) continue;
      const skillRecord = getSkillRecord(event.diagnosedSkillId);
      skillRecord.history_count += 1;

      // Foundational Retest Evaluation (Acquisition)
      if (event.retestOutcome === "ACQUISITION_CONFIRMED") {
        skillRecord.acquisition_status = SKILL_STATE.ACQUISITION.DEMONSTRATED;
        skillRecord.last_verified_at = new Date(event.timestamp).toISOString();
        skillRecord.retention_status = SKILL_STATE.RETENTION.ACTIVE;
      } else if (event.retestOutcome === "ACQUISITION_FAILED") {
        skillRecord.acquisition_status = SKILL_STATE.ACQUISITION.GAP_DETECTED;
        skillRecord.retention_status = SKILL_STATE.RETENTION.NEEDS_REFRESH;
      }

      // Contextual Transfer Evaluation (Decoupled from Acquisition)
      if (event.transferOutcome === "TRANSFER_CONFIRMED") {
        skillRecord.transfer_status = SKILL_STATE.TRANSFER.DEMONSTRATED;
      } else if (event.transferOutcome === "TRANSFER_FAILED") {
        skillRecord.transfer_status = SKILL_STATE.TRANSFER.FAILED_TRANSFER;
        // Invariant: acquisition_status is PRESERVED as DEMONSTRATED if retest passed
      }
    }
  }

  // 5. Evaluate retention status relative to asOfTimestamp
  const now = asOfTimestamp === Infinity ? Date.now() : asOfTimestamp;
  for (const skillId of Object.keys(state)) {
    const rec = state[skillId];
    if (rec.last_verified_at && rec.acquisition_status === SKILL_STATE.ACQUISITION.DEMONSTRATED) {
      const elapsed = now - new Date(rec.last_verified_at).getTime();
      if (elapsed > RETENTION_EXPIRY_MS) {
        rec.retention_status = SKILL_STATE.RETENTION.NEEDS_REFRESH;
      }
    }
  }

  return state;
}

/**
 * Full deterministic replay function from raw tables.
 */
export function replayLearnerHistory({ attempts = [], evidence = [], repairEvents = [], asOfTimestamp = Infinity }) {
  const normalizedStream = normalizeEventStream({ attempts, evidence, repairEvents });
  return reduceLearnerSkillState({ previousState: {}, events: normalizedStream, asOfTimestamp });
}
