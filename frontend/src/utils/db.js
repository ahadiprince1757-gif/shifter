import Dexie from "dexie";

// Initialize the database for Tixar learning progress
export const db = new Dexie("TixarProgressDB");

// Define schema: schema version 1 contains only the mastered topics table, keyed by topicKey
db.version(1).stores({
  mastered: "topicKey", // topicKey format: "subjectId|chapterId|topicName"
});
