import Dexie from "dexie";

export const db = new Dexie("ShifterLocalDB_v2");

db.version(2).stores({
  // curriculum: primary key is 'id'
  // Indexed fields: is_deleted for easy filtering
  curriculum: "id, is_deleted",

  // topics: primary key is 'id'
  // Indexed fields: curriculum_id, chapter_id, is_deleted
  topics: "id, curriculum_id, chapter_id, is_deleted",

  // user_progress: primary key is 'id' (can be auto-increment or a specific format like userId_topicId)
  // Indexed fields: topic_id, sync_status
  user_progress: "id, topic_id, sync_status, updated_at",

  // change_log: auto-incrementing primary key 'id'
  // Indexed fields: type, entity_id, synced
  change_log: "++id, type, entity_id, synced, timestamp",

  // sync_metadata: primary key is 'table_name'
  sync_metadata: "table_name, last_synced_at",
});

// Optional: Add some basic helper hooks or defaults here if needed
db.on("populate", () => {
  console.log("Database initialized for the first time.");
});

export default db;
