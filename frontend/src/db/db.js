import Dexie from "dexie";

export const db = new Dexie("ShifterLocalDB_v2");

db.version(10).stores({
  curriculum: "id, is_deleted",
  topics: "id, curriculum_id, chapter_id, is_deleted",
  user_progress: "id, topic_id, sync_status, updated_at",
  change_log: "++id, type, entity_id, synced, timestamp",
  sync_metadata: "table_name, last_synced_at",

  // New learning stores
  user_mistakes: "++id, topic_id, subject_id, chapter_id, question_index, resolved, updated_at",
  spaced_reviews: "topic_id, next_review_at, interval_days, ease_factor, repetitions, updated_at",
  user_notes: "topic_id, updated_at",
}).upgrade(async (tx) => {
  await tx.table("topics").clear();
});

// Version 11: Drop stores with old primary keys to prevent Dexie UpgradeError
db.version(11).stores({
  spaced_reviews: null,
  user_notes: null,
});

// Version 12: Re-create user-scoped stores with compound primary keys
db.version(12).stores({
  curriculum: "id, is_deleted",
  topics: "id, curriculum_id, chapter_id, is_deleted",
  user_progress: "id, user_id, topic_id, sync_status, updated_at",
  change_log: "++id, type, entity_id, synced, timestamp",
  sync_metadata: "table_name, last_synced_at",

  // User-scoped learning stores
  user_mistakes: "++id, user_id, topic_id, subject_id, chapter_id, question_index, resolved, updated_at",
  spaced_reviews: "[user_id+topic_id], user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions, updated_at",
  user_notes: "[user_id+topic_id], user_id, topic_id, updated_at",
});

// Version 15: Compound indexes for strict identity isolation across user mistakes and spaced reviews
db.version(15).stores({
  curriculum: "id, is_deleted",
  topics: "id, curriculum_id, chapter_id, is_deleted",
  user_progress: "id, user_id, topic_id, sync_status, updated_at",
  change_log: "++id, type, entity_id, synced, timestamp",
  sync_metadata: "table_name, last_synced_at",
  user_mistakes: "++id, [user_id+topic_id+question_index], [user_id+topic_id], user_id, topic_id, subject_id, chapter_id, question_index, resolved, updated_at",
  spaced_reviews: "[user_id+topic_id], user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions, updated_at",
  user_notes: "[user_id+topic_id], user_id, topic_id, updated_at",
});

// Version 16: Non-destructive upgrade — topics table is managed via content-versioning
db.version(16).upgrade(async () => {
  // Idempotent content versioning manages updates; never clear offline library
});

// Version 17: Add pending sync queue for offline mistake mutations
db.version(17).stores({
  // Outbox: queued operations that couldn't be pushed to Supabase while offline.
  // op: 'save' | 'resolve'
  // payload: serialised args for the API call
  // created_at: ISO string so the queue can be drained in insertion order
  pending_mistake_sync: "++id, op, created_at",
});

// Version 18: Drop all stores that may have an incompatible primary key on older clients.
// Dexie does not allow changing a primary key in-place — stores must be dropped first.
// This resolves: UpgradeError: Not yet support for changing primary key
db.version(18).stores({
  spaced_reviews: null,
  user_notes: null,
  user_mistakes: null,
});

// Version 19: Re-create learning stores with correct compound primary keys
db.version(19).stores({
  user_mistakes: "++id, [user_id+topic_id+question_index], [user_id+topic_id], user_id, topic_id, subject_id, chapter_id, question_index, resolved, updated_at",
  spaced_reviews: "[user_id+topic_id], user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions, updated_at",
  user_notes: "[user_id+topic_id], user_id, topic_id, updated_at",
});

db.on("populate", () => {
  console.log("Database initialized for the first time.");
});

// Robust open with auto-recovery:
// If ANY UpgradeError occurs (e.g. missing version in chain, primary key change on legacy client),
// the safest path is to delete the local cache and start fresh.
// All persistent progress is stored in Supabase — IndexedDB is a local performance cache only.
db.open().catch(async (err) => {
  console.error("[Tixar DB] Failed to open local database:", err);

  if (err?.name === "UpgradeError" || err?.name === "DatabaseClosedError") {
    try {
      console.warn("[Tixar DB] Upgrade conflict detected — resetting local cache and re-opening...");
      await Dexie.delete("ShifterLocalDB_v2");
      await db.open();
      console.log("[Tixar DB] Successfully re-opened after reset.");
    } catch (reopenErr) {
      console.error("[Tixar DB] Re-open after reset failed:", reopenErr);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("tixar:db-error", {
            detail: { name: reopenErr?.name, message: reopenErr?.message },
          })
        );
      }
    }
    return;
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("tixar:db-error", {
        detail: { name: err?.name, message: err?.message },
      })
    );
  }
});


export default db;
