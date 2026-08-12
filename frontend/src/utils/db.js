import Dexie from "dexie";

// Initialize the database for Tixar learning progress
export const db = new Dexie("TixarProgressDB");

// Version 1 (legacy schema)
db.version(1).stores({
  mastered: "topicKey", // topicKey format: "subjectId|chapterId|topicName"
});

// Version 2: Drop legacy objectStore so primary key can be changed without UpgradeError
db.version(2).stores({
  mastered: null,
});

// Version 3: user-scoped mastered topics with compound primary key
db.version(3).stores({
  mastered: "[userId+topicKey], userId, topicKey",
});

// Auto-recovery if database connection ever gets stuck or corrupted
db.open().catch(async (err) => {
  if (err.name === "UpgradeError" || err.name === "DatabaseClosedError") {
    console.warn("TixarProgressDB upgrade error detected, auto-resetting database...", err);
    await Dexie.delete("TixarProgressDB");
    await db.open();
  }
});

export default db;
