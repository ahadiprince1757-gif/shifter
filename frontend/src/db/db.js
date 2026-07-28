import Dexie from "dexie";

export const db = new Dexie("ShifterLocalDB_v2");

db.version(3).stores({
  curriculum: "id, is_deleted",
  topics: "id, curriculum_id, chapter_id, is_deleted",
  user_progress: "id, topic_id, sync_status, updated_at",
  change_log: "++id, type, entity_id, synced, timestamp",
  sync_metadata: "table_name, last_synced_at",

  // New learning stores
  user_mistakes: "++id, topic_id, subject_id, chapter_id, question_index, resolved, updated_at",
  spaced_reviews: "topic_id, next_review_at, interval_days, ease_factor, repetitions, updated_at",
  user_notes: "topic_id, updated_at",
});

// Optional: Add some basic helper hooks or defaults here if needed
db.on("populate", () => {
  console.log("Database initialized for the first time.");
});

export default db;
