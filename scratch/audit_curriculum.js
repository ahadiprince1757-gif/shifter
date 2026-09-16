import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const rootDir = path.resolve(__dirname, "..");
const backendCurriculumPath = path.join(rootDir, "backend", "data", "curriculum.json");
const frontendCurriculumPath = path.join(rootDir, "frontend", "src", "data", "curriculum.json");
const curriculumJsPath = path.join(rootDir, "backend", "data", "curriculum.js");
const dataDir = path.join(rootDir, "backend", "data");

console.log("========================================================");
console.log("     TIXAR CANONICAL CURRICULUM & CONTENT AUDIT");
console.log("========================================================\n");

// --- 1. AUDIT CANONICAL CURRICULUM.JSON ---
console.log(">>> Phase 1: Canonical Source of Truth Audit");
if (!fs.existsSync(backendCurriculumPath)) {
  console.error("❌ backend/data/curriculum.json not found!");
  process.exit(1);
}

const canonicalCurriculum = JSON.parse(fs.readFileSync(backendCurriculumPath, "utf8"));
const CANONICAL_SUBJECT_IDS = ["math", "physics", "chemistry", "biology", "english", "computer"];

console.log(`Found ${canonicalCurriculum.length} subjects in backend/data/curriculum.json.`);

const subjectIds = new Set();
const duplicateSubjects = [];
const duplicateChapters = [];
const duplicateTopicsInChapter = [];
const topicToChapterMap = new Map(); // key: sid -> Map(topicName -> [cid, ...])

let totalChapters = 0;
let totalTopics = 0;

canonicalCurriculum.forEach((subj) => {
  if (subjectIds.has(subj.id)) duplicateSubjects.push(subj.id);
  subjectIds.add(subj.id);

  if (!CANONICAL_SUBJECT_IDS.includes(subj.id)) {
    console.warn(`⚠️ Non-canonical subject ID present: ${subj.id}`);
  }

  const chapIds = new Set();
  if (!subj.chapters || !Array.isArray(subj.chapters)) {
    console.error(`❌ Subject ${subj.id} has no chapters array!`);
    return;
  }

  const topicMap = new Map();
  topicToChapterMap.set(subj.id, topicMap);

  subj.chapters.forEach((chap) => {
    totalChapters++;
    if (chapIds.has(chap.id)) {
      duplicateChapters.push(`${subj.id}/${chap.id}`);
    }
    chapIds.add(chap.id);

    if (!chap.topics || !Array.isArray(chap.topics)) {
      console.error(`❌ Chapter ${subj.id}/${chap.id} has no topics array!`);
      return;
    }

    const seenInChap = new Set();
    chap.topics.forEach((topic) => {
      totalTopics++;
      if (seenInChap.has(topic)) {
        duplicateTopicsInChapter.push(`${subj.id}/${chap.id} -> "${topic}"`);
      }
      seenInChap.add(topic);

      if (!topicMap.has(topic)) {
        topicMap.set(topic, []);
      }
      topicMap.get(topic).push(chap.id);
    });
  });
});

console.log(`Canonical summary: ${canonicalCurriculum.length} subjects, ${totalChapters} chapters, ${totalTopics} topics.`);

if (duplicateSubjects.length > 0) console.error("❌ Duplicate subject IDs:", duplicateSubjects);
if (duplicateChapters.length > 0) console.error("❌ Duplicate chapter IDs:", duplicateChapters);
if (duplicateTopicsInChapter.length > 0) console.error("❌ Duplicate topics in same chapter:", duplicateTopicsInChapter);

// Check if any topic name appears in multiple chapters within same subject
const topicsInMultipleChapters = [];
for (const [sid, topicMap] of topicToChapterMap.entries()) {
  for (const [topic, cids] of topicMap.entries()) {
    if (cids.length > 1) {
      topicsInMultipleChapters.push(`${sid}: "${topic}" in chapters [${cids.join(", ")}]`);
    }
  }
}
if (topicsInMultipleChapters.length > 0) {
  console.warn("⚠️ Topics appearing in multiple chapters within subject:", topicsInMultipleChapters);
} else {
  console.log("✅ Zero duplicate topic names across chapters in canonical curriculum.");
}

// --- 2. AUDIT CURRICULUM.JS ---
console.log("\n>>> Phase 2: curriculum.js Architecture Check");
const curriculumJsContent = fs.readFileSync(curriculumJsPath, "utf8");
if (curriculumJsContent.includes("require(\"./curriculum.json\")") || curriculumJsContent.includes("require('./curriculum.json')")) {
  console.log("✅ curriculum.js directly re-exports curriculum.json (Single Source of Truth maintained).");
} else {
  console.error("❌ curriculum.js does not import curriculum.json! It appears to be manually maintained.");
}

// --- 3. AUDIT FRONTEND CURRICULUM SYNC ---
console.log("\n>>> Phase 3: Frontend vs Canonical Check");
if (fs.existsSync(frontendCurriculumPath)) {
  const backendRaw = fs.readFileSync(backendCurriculumPath, "utf8").trim();
  const frontendRaw = fs.readFileSync(frontendCurriculumPath, "utf8").trim();
  if (backendRaw === frontendRaw) {
    console.log("✅ frontend/src/data/curriculum.json is 100% byte-for-byte identical to backend.");
  } else {
    console.error("❌ frontend/src/data/curriculum.json differs from backend!");
  }
} else {
  console.error("❌ frontend/src/data/curriculum.json does not exist!");
}

// --- 4. AUDIT SUBJECT DATA CONTENT & QUESTIONS ---
console.log("\n>>> Phase 4: Subject Content & Semantic Mapping Audit");

const contentRegistry = new Map(); // key: `${sid}/${cid}/${topic}` -> []
let totalRegisteredCalls = 0;

global.add = (sid, cid, topic, notes, qs) => {
  totalRegisteredCalls++;
  const key = `${sid}/${cid}/${topic}`;
  if (!contentRegistry.has(key)) {
    contentRegistry.set(key, []);
  }
  contentRegistry.get(key).push({ sid, cid, topic, notes, qs });
};

const subjectFiles = ["math.js", "physics.js", "chemistry.js", "biology.js", "english.js", "computer.js"];
subjectFiles.forEach((file) => {
  const fPath = path.join(dataDir, file);
  try {
    require(fPath);
  } catch (err) {
    console.error(`❌ Failed to require ${file}:`, err.message);
  }
});

console.log(`Loaded ${subjectFiles.length} subject files. Total add() calls: ${totalRegisteredCalls}. Unique [sid/cid/topic] content keys: ${contentRegistry.size}`);

// Verify every canonical topic has content
const missingContent = [];
const orphanContent = [];
let totalCanonicalVerified = 0;

canonicalCurriculum.forEach((subj) => {
  (subj.chapters || []).forEach((chap) => {
    (chap.topics || []).forEach((top) => {
      const key = `${subj.id}/${chap.id}/${top}`;
      if (!contentRegistry.has(key)) {
        missingContent.push(key);
      } else {
        totalCanonicalVerified++;
      }
    });
  });
});

for (const [key] of contentRegistry.entries()) {
  const [sid, cid, top] = key.split("/");
  const subj = canonicalCurriculum.find((s) => s.id === sid);
  const chap = subj ? subj.chapters.find((c) => c.id === cid) : null;
  const exists = chap ? chap.topics.includes(top) : false;
  if (!exists) {
    orphanContent.push(key);
  }
}

console.log(`Canonical topics verified with content: ${totalCanonicalVerified}/${totalTopics}`);
if (missingContent.length > 0) {
  console.error(`❌ Missing content for ${missingContent.length} canonical topics:`);
  missingContent.forEach((k) => console.error(`   - ${k}`));
} else {
  console.log("✅ 100% of canonical topics have corresponding content!");
}

if (orphanContent.length > 0) {
  console.error(`❌ Found ${orphanContent.length} orphan content records:`);
  orphanContent.forEach((k) => console.error(`   - ${k}`));
} else {
  console.log("✅ 0 orphan content records found!");
}

// --- 5. AUDIT QUESTIONS AND ANSWERS INTEGRITY ---
console.log("\n>>> Phase 5: Question & Answer Semantic Integrity Audit");
let totalQuestions = 0;
let totalAnswers = 0;
let questionsWithoutText = 0;
let questionsWithoutAnswers = 0;
const invalidQuestions = [];

for (const [key, entries] of contentRegistry.entries()) {
  entries.forEach((entry, eIdx) => {
    const rawQs = Array.isArray(entry.qs) ? entry.qs : (entry.qs ? [entry.qs] : []);
    rawQs.forEach((q, qIdx) => {
      totalQuestions++;
      const qText = q ? (q.q || q.Question || q.question || q.Q1 || q.Q) : null;
      const ansVal = q ? (q.ans !== undefined ? q.ans : (q.Answer !== undefined ? q.Answer : (q.answer !== undefined ? q.answer : (q.A1 !== undefined ? q.A1 : (q.A !== undefined ? q.A : q.a))))) : undefined;

      if (!qText || String(qText).trim() === "") {
        questionsWithoutText++;
        invalidQuestions.push({ key, issue: "Missing question text", qIdx });
      }

      let validAnswersCount = 0;
      if (ansVal !== undefined && ansVal !== null) {
        const answersList = Array.isArray(ansVal) ? ansVal : [ansVal];
        answersList.forEach((a) => {
          if (a !== undefined && a !== null && String(a).trim() !== "") {
            validAnswersCount++;
            totalAnswers++;
          }
        });
      }

      if (validAnswersCount === 0) {
        questionsWithoutAnswers++;
        invalidQuestions.push({ key, issue: "Question has NO valid answer", qText, qIdx });
      }
    });
  });
}

console.log(`Total questions audited: ${totalQuestions}`);
console.log(`Total valid answers audited: ${totalAnswers}`);
if (questionsWithoutText > 0) {
  console.error(`❌ Questions without text: ${questionsWithoutText}`);
}
if (questionsWithoutAnswers > 0) {
  console.error(`❌ Questions without valid answer: ${questionsWithoutAnswers}`);
  invalidQuestions.slice(0, 10).forEach((iq) => {
    console.error(`   - [${iq.key}] Issue: ${iq.issue}, Text: "${iq.qText}"`);
  });
}
if (questionsWithoutText === 0 && questionsWithoutAnswers === 0) {
  console.log("✅ 100% of questions have valid text and at least one non-empty answer!");
}

// --- 6. PER-SUBJECT DETAILED BREAKDOWN ---
console.log("\n>>> Phase 6: Subject Breakdown");
canonicalCurriculum.forEach((subj) => {
  const chapCount = subj.chapters ? subj.chapters.length : 0;
  let topCount = 0;
  let subjQCount = 0;
  let subjAnsCount = 0;
  (subj.chapters || []).forEach((c) => {
    (c.topics || []).forEach((t) => {
      topCount++;
      const entries = contentRegistry.get(`${subj.id}/${c.id}/${t}`) || [];
      entries.forEach((e) => {
        const qs = Array.isArray(e.qs) ? e.qs : (e.qs ? [e.qs] : []);
        subjQCount += qs.length;
      });
    });
  });
  console.log(`   * ${subj.id.toUpperCase().padEnd(10)} | Chapters: ${String(chapCount).padStart(2)} | Topics: ${String(topCount).padStart(3)} | Questions: ${String(subjQCount).padStart(4)}`);
});

console.log("\n========================================================");
console.log("                   AUDIT COMPLETE");
console.log("========================================================");
