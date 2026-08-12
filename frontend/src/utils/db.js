import Dexie from "dexie";

// Initialize the database for Tixar learning progress
export const db = new Dexie("TixarProgressDB");

// Define schema:
// Version 1 (legacy)
db.version(1).stores({
  mastered: "topicKey", // topicKey format: "subjectId|chapterId|topicName"
});

// Version 2: user-scoped mastered topics
db.version(2).stores({
  mastered: "[userId+topicKey], userId, topicKey",
});

