const fs = require("fs");
const path = require("path");

const curriculum = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../backend/data/curriculum.json"), "utf8"));

const files = ["math.js", "physics.js", "chemistry.js", "biology.js", "english.js", "computer.js"];
const questionsByTopic = new Map();

global.add = (sid, cid, topic, notes, qs) => {
  const key = `${sid}|${cid}|${String(topic || "").toLowerCase().trim()}`;
  const count = Array.isArray(qs) ? qs.length : (qs ? 1 : 0);
  questionsByTopic.set(key, (questionsByTopic.get(key) || 0) + count);
};

for (const f of files) {
  try {
    require(path.resolve(__dirname, "../backend/data", f));
  } catch (e) {
    console.error("Error loading " + f, e.message);
  }
}

let totalTopics = 0;
let missingTopics = [];
let populatedTopics = 0;

for (const sub of curriculum) {
  for (const ch of sub.chapters || []) {
    for (const top of ch.topics || []) {
      totalTopics++;
      const key = `${sub.id}|${ch.id}|${String(top || "").toLowerCase().trim()}`;
      const count = questionsByTopic.get(key) || 0;
      if (count === 0) {
        missingTopics.push({ subject: sub.id, chapter: ch.id, topic: top });
      } else {
        populatedTopics++;
      }
    }
  }
}

console.log(`Total topics in curriculum.json: ${totalTopics}`);
console.log(`Topics with questions: ${populatedTopics}`);
console.log(`Topics with 0 questions: ${missingTopics.length}`);
if (missingTopics.length > 0) {
  console.log("\nBreakdown of topics with 0 questions by subject:");
  const bySub = {};
  for (const m of missingTopics) {
    bySub[m.subject] = (bySub[m.subject] || 0) + 1;
  }
  console.log(JSON.stringify(bySub, null, 2));

  console.log("\nFirst 15 missing topics:");
  console.log(JSON.stringify(missingTopics.slice(0, 15), null, 2));
}
