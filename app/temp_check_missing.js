const fs = require("fs");

const text = fs.readFileSync("app.nexis.html", "utf8");

const addMatches = [
  ...text.matchAll(/add\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g),
].map((m) => `${m[1]}|${m[2]}|${m[3]}`);
const addSet = new Set(addMatches);

const subjectBlocks = [
  ...text.matchAll(
    /\{\s*id:\s*"([^"]+)",[\s\S]*?chapters:\s*\[([\s\S]*?)\]\s*\}/g,
  ),
];

const topicRe = /id:\s*"([^"]+)",[\s\S]*?topics:\s*\[([\s\S]*?)\]/g;
const missing = [];

for (const subjectBlock of subjectBlocks) {
  const sid = subjectBlock[1];
  const chaptersBlock = subjectBlock[2];

  let topicMatch;
  while ((topicMatch = topicRe.exec(chaptersBlock)) !== null) {
    const cid = topicMatch[1];
    const topics = [...topicMatch[2].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

    for (const topic of topics) {
      const key = `${sid}|${cid}|${topic}`;
      if (!addSet.has(key)) {
        missing.push(key);
      }
    }
  }

  topicRe.lastIndex = 0;
}

console.log(`missing count: ${missing.length}`);
for (const item of missing) {
  console.log(item);
}
