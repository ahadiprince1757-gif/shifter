// Event-driven learning analytics telemetry queue and synchronization
const QUEUE_KEY = "shifter_learning_events";

/**
 * Helper to generate a random unique ID for event deduplication
 */
function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Retrieve all queued events from local storage
 */
export function getQueuedEvents() {
  try {
    const data = localStorage.getItem(QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to read telemetry event queue from localStorage", e);
    return [];
  }
}

/**
 * Overwrite/save the queue to local storage
 */
export function saveQueuedEvents(events) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error("Failed to save telemetry event queue to localStorage", e);
  }
}

/**
 * Record a new learning event (visits, passes, fails)
 * @param {string} sid - Subject ID (e.g. 'physics')
 * @param {string} cid - Chapter ID (e.g. 'motion')
 * @param {string} topic - Topic name (e.g. 'Displacement & Distance')
 * @param {string} type - Event type: 'visit', 'pass', or 'fail'
 * @param {string|null} userId - Current user's ID
 */
export function recordEvent(sid, cid, topic, type, userId = null) {
  if (!sid || !cid || !topic || !type) return;

  const events = getQueuedEvents();
  const newEvent = {
    id: generateId(),
    sid,
    cid,
    topic,
    event_type: type,
    user_id: userId || null,
    created_at: new Date().toISOString()
  };

  events.push(newEvent);
  saveQueuedEvents(events);
  console.log(`[Telemetry] Recorded event locally: ${type} -> ${sid}/${cid}/${topic}`);

  // Trigger sync asynchronously in the background
  triggerSync();
}

let syncInProgress = false;

/**
 * Sync queued events to backend in batches
 */
export async function triggerSync() {
  if (syncInProgress) return;
  
  const events = getQueuedEvents();
  if (events.length === 0) return;

  syncInProgress = true;
  const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const syncUrl = `${VITE_API_URL.replace(/\/$/, "")}/api/analytics/events`;

  // Capture the batch of event IDs we are trying to sync
  const batchToSync = [...events];
  const batchIds = new Set(batchToSync.map(e => e.id));

  try {
    const res = await fetch(syncUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ events: batchToSync })
    });

    if (res.ok) {
      console.log(`[Telemetry] Successfully synced ${batchToSync.length} events to the backend.`);
      // Retrieve the current queue state in case new events were added while syncing
      const currentEvents = getQueuedEvents();
      // Filter out only the events that we successfully synced
      const remainingEvents = currentEvents.filter(e => !batchIds.has(e.id));
      saveQueuedEvents(remainingEvents);
    } else {
      console.warn(`[Telemetry] Sync failed with status: ${res.status}`);
    }
  } catch (err) {
    console.warn("[Telemetry] Sync failed (offline mode):", err.message);
  } finally {
    syncInProgress = false;
  }
}
