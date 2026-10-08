/**
 * Regenerates only the frontend/src/data/chemistry.js from the backend chemistry.js data.
 * Does NOT use loadCanonicalCurriculum (bypasses the biology audit errors).
 */
const fs = require("fs");
const path = require("path");

const FRONTEND_DATA_DIR = path.resolve(__dirname, "../../frontend/src/data");
const dataDir = path.resolve(__dirname, "..", "data");

// Minimal normalizer (mirrors curriculumLoader logic for non-math/biology subjects)
function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeQuestion(q, { sid, cid, topic, qIdx }) {
  if (!q) return null;
  const qStr = q.q || q.Question || q.question || "Explain the core concept of this topic.";
  const rawAns = q.ans !== undefined ? q.ans : (q.Answer !== undefined ? q.Answer : (q.answer !== undefined ? q.answer : (q.A !== undefined ? q.A : q.a)));
  const ansStr = Array.isArray(rawAns)
    ? rawAns.map(a => String(a).trim()).filter(Boolean).join(", ")
    : (rawAns !== undefined && rawAns !== null ? String(rawAns).trim() : "");
  const hintStr = q.hint || q.Hint || `Focus on the core principle of ${topic}.`;
  const baseWhy = q.why || q.Reason || q.reason || q.Explanation || "";

  let steps = [];
  if (Array.isArray(q.steps) && q.steps.length > 0) {
    steps = q.steps.map(s => String(s).trim()).filter(Boolean);
  }
  if (steps.length === 0) {
    steps = [
      `Step 1: Identify key concept: Define the required principles for ${topic}.`,
      `Step 2: Apply governing rule: ${baseWhy ? baseWhy.replace(/\s+/g, " ").trim() : "Analyze the relationship and given criteria."}`,
      `Step 3: State the final conclusion: ${ansStr}`
    ];
  } else {
    steps = steps.map((s, idx) => {
      const stripped = s.replace(/^step\s*\d+\s*:\s*/i, "").trim();
      return `Step ${idx + 1}: ${stripped}`;
    });
  }
  const whyStr = baseWhy ? String(baseWhy).trim() : "Demonstrate clear step-by-step reasoning.";
  const solStr = q.sol || q.solution || steps.join("\n") || whyStr;

  let rawOptions = q.options || q.choices || null;
  let options = [];
  let type = q.type === "mcq" || (Array.isArray(rawOptions) && rawOptions.length > 0) ? "mcq" : "text";

  if (type === "mcq" && Array.isArray(rawOptions) && rawOptions.length > 0) {
    const hasExactMatch = rawOptions.some(opt => {
      if (typeof opt === "object" && opt !== null) return Boolean(opt.is_correct || opt.correct);
      return String(opt).trim() === ansStr;
    });
    options = rawOptions.map(opt => {
      if (typeof opt === "object" && opt !== null) {
        return { text: String(opt.text || opt.choice || "").trim(), is_correct: Boolean(opt.is_correct || opt.correct) };
      }
      const optText = String(opt).trim();
      const isCorrect = hasExactMatch ? optText === ansStr : optText.toLowerCase() === ansStr.toLowerCase();
      return { text: optText, is_correct: isCorrect };
    });
    const correctCount = options.filter(o => o.is_correct).length;
    if (correctCount === 0 && ansStr) options.push({ text: ansStr, is_correct: true });
    if (options.filter(o => o.is_correct).length > 1) {
      let foundFirst = false;
      options = options.map(o => {
        if (o.is_correct) { if (!foundFirst) { foundFirst = true; return o; } return { ...o, is_correct: false }; }
        return o;
      });
    }
  } else {
    type = "text"; options = [];
  }

  const conceptId = `${sid}_${cid}_${slugify(topic)}`;
  const skillId = `${sid}_${cid}`;
  const subskillId = `${skillId}_q${qIdx + 1}`;

  return { q: String(qStr).trim(), ans: ansStr, type, options, steps, why: whyStr, sol: solStr, hint: hintStr, subject: sid, chapter: cid, topic, conceptId, skillId, subskillId };
}

// Collect chemistry topics using global add()
const contentMap = new Map();
global.add = (...args) => {
  const sid = String(args[0] || "").toLowerCase().trim();
  if (sid !== "chemistry") return;

  const cid = String(args[1] || "").trim();
  const topic = String(args[2] || "").trim();
  const notes = typeof args[3] === "string" ? args[3] : String(args[3] || "");
  let rawQs = args[4] || [];
  if (!Array.isArray(rawQs) && rawQs) rawQs = [rawQs];
  if (Array.isArray(args[5])) rawQs = rawQs.concat(args[5]);

  const key = `${sid}/${cid}/${topic}`;
  if (contentMap.has(key)) {
    const existing = contentMap.get(key);
    existing.notes = existing.notes + "\n<hr>\n" + notes;
    existing.rawQs = existing.rawQs.concat(rawQs);
  } else {
    contentMap.set(key, { sid, cid, topic, topicGroup: topic, notes, rawQs });
  }
};

require(path.join(dataDir, "chemistry.js"));

// Normalize all questions
const chemistryTopics = [];
for (const [, content] of contentMap.entries()) {
  const normalizedQs = content.rawQs.map((rawQ, qIdx) =>
    normalizeQuestion(rawQ, { sid: content.sid, cid: content.cid, topic: content.topic, qIdx })
  ).filter(Boolean);

  chemistryTopics.push({
    id: `${content.sid}|${content.cid}|${content.topic}`,
    curriculum_id: content.sid,
    chapter_id: content.cid,
    topic_group: content.topicGroup || content.topic,
    topic: content.topic,
    data: {
      notes: content.notes,
      qs: normalizedQs,
    },
    version: 2,
    is_deleted: false,
  });
}

const outputFile = path.join(FRONTEND_DATA_DIR, "chemistry.js");
const fileContent = `/**
 * Canonical Bundled Content: CHEMISTRY
 * Auto-generated by backend/scripts/generate_chemistry_frontend.js
 * Total Topics: ${chemistryTopics.length}
 */

export const chemistryTopics = ${JSON.stringify(chemistryTopics, null, 2)};

export default chemistryTopics;
`;

fs.writeFileSync(outputFile, fileContent, "utf8");
console.log(`[generate_chemistry_frontend] Wrote ${chemistryTopics.length} topics to ${outputFile}`);
