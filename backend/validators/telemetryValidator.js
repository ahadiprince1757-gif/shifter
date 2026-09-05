/**
 * TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P0
 * Telemetry Event Runtime Validator
 * 
 * Invariants: Tixar Intelligence Law
 * - Never fabricate evidence.
 * - Reject malformed or unidentifiable events.
 * - Guard event idempotency with strict client_event_id validation.
 */

const ALLOWED_EVENT_TYPES = new Set([
  // Canonical Assessment Events (Evidence of Learning)
  'question_correct',
  'question_incorrect',
  'quiz_completed',
  'assessment_submitted',
  'diagnostic_completed',
  'retention_verified',
  
  // Pedagogical Interaction & Support Events
  'lesson_opened',
  'hint_requested',
  'explanation_viewed',
  'review_completed',
  'spaced_review_rated',
  
  // Navigational & System Telemetry
  'topic_viewed',
  'dashboard_viewed',
  'streak_updated'
]);

const MAX_FUTURE_DRIFT_MS = 5 * 60 * 1000; // 5 minutes clock skew allowance
const MIN_ALLOWED_TIMESTAMP_MS = new Date('2024-01-01T00:00:00Z').getTime();

/**
 * Validates a single telemetry event.
 * @param {Object} event Raw event from client
 * @returns {{ valid: boolean, error?: string }}
 */
function validateEvent(event) {
  if (!event || typeof event !== 'object') {
    return { valid: false, error: 'Event payload must be a non-null object' };
  }

  // 1. client_event_id: Required, non-empty string for idempotency
  if (!event.client_event_id || typeof event.client_event_id !== 'string' || event.client_event_id.trim().length === 0) {
    return { valid: false, error: 'Missing or invalid client_event_id: must be a non-empty string' };
  }

  // 2. event_type: Required string, standard vocabulary or valid snake_case identifier
  if (!event.event_type || typeof event.event_type !== 'string') {
    return { valid: false, error: 'Missing or invalid event_type' };
  }

  const normalizedEventType = event.event_type.trim().toLowerCase();
  const isValidIdentifier = /^[a-z]+(_[a-z0-9]+)*$/.test(normalizedEventType);
  if (!isValidIdentifier) {
    return { valid: false, error: `Malformed event_type identifier: "${event.event_type}"` };
  }
  if (!ALLOWED_EVENT_TYPES.has(normalizedEventType)) {
    return { valid: false, error: `Unrecognized or non-telemetry event_type: "${event.event_type}"` };
  }

  // 3. Timestamp verification
  const rawTs = event.created_at || event.timestamp;
  if (rawTs) {
    const tsMs = typeof rawTs === 'number' ? rawTs : new Date(rawTs).getTime();
    if (isNaN(tsMs)) {
      return { valid: false, error: `Invalid date format in timestamp: "${rawTs}"` };
    }
    const now = Date.now();
    if (tsMs > now + MAX_FUTURE_DRIFT_MS) {
      return { valid: false, error: `Event timestamp is in the future (>5m drift): ${new Date(tsMs).toISOString()}` };
    }
    if (tsMs < MIN_ALLOWED_TIMESTAMP_MS) {
      return { valid: false, error: `Event timestamp precedes system genesis: ${new Date(tsMs).toISOString()}` };
    }
  }

  // 4. Assessment events must carry curriculum coordinate (topic or topic_id)
  const isAssessment = normalizedEventType === 'question_correct' || normalizedEventType === 'question_incorrect';
  if (isAssessment) {
    const payload = event.payload || {};
    const topic = payload.topic || payload.topic_id || event.topic || event.topic_id;
    if (!topic) {
      return { valid: false, error: 'Assessment events must contain curriculum coordinate (topic or topic_id)' };
    }
  }

  return { valid: true };
}

/**
 * Validates a batch of telemetry events, filtering duplicates within the batch.
 * @param {Array<Object>} events Batch of raw events
 * @returns {{ validEvents: Array<Object>, rejectedEvents: Array<{ event: Object, error: string }>, stats: Object }}
 */
function validateEventsBatch(events) {
  if (!Array.isArray(events)) {
    return {
      validEvents: [],
      rejectedEvents: [{ event: null, error: 'Batch must be an array' }],
      stats: { total: 0, valid: 0, rejected: 1, duplicates: 0 }
    };
  }

  const validEvents = [];
  const rejectedEvents = [];
  const seenClientIds = new Set();
  let duplicatesCount = 0;

  for (const item of events) {
    const check = validateEvent(item);
    if (!check.valid) {
      rejectedEvents.push({ event: item, error: check.error });
      continue;
    }

    const trimmedId = item.client_event_id.trim();
    if (seenClientIds.has(trimmedId)) {
      duplicatesCount++;
      // Intra-batch duplicate silently suppressed from execution list
      continue;
    }

    seenClientIds.add(trimmedId);
    validEvents.push({
      ...item,
      client_event_id: trimmedId,
      event_type: item.event_type.trim().toLowerCase()
    });
  }

  return {
    validEvents,
    rejectedEvents,
    duplicatesCount,
    stats: {
      total: events.length,
      valid: validEvents.length,
      rejected: rejectedEvents.length,
      duplicates: duplicatesCount
    }
  };
}

module.exports = {
  validateEvent,
  validateEventsBatch,
  ALLOWED_EVENT_TYPES
};
