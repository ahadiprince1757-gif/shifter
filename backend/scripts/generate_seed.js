/**
 * Upgraded Relational Seed Generator for Shifter/Tixar (Supabase)
 * Derives directly and strictly from backend/data/curriculum.json (Canonical Source of Truth).
 * Generates relational SQL for:
 *   - subjects (6)
 *   - chapters (70)
 *   - topics (334)
 *   - lessons (334)
 *   - quizzes (334)
 *   - questions (1800+)
 *   - answers
 * Fails loudly on ANY mismatch, orphan, missing question, or missing answer.
 */

const fs = require("fs");
const path = require("path");

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return String(str).replace(/'/g, "''");
}

function normalizeQ(q) {
  if (!q) return null;
  const qStr = q.q || q.Question || q.question || q.Q1 || q.Q;
  const ansVal = q.ans !== undefined ? q.ans : (q.Answer !== undefined ? q.Answer : (q.answer !== undefined ? q.answer : (q.A1 !== undefined ? q.A1 : (q.A !== undefined ? q.A : q.a))));
  const hintStr = q.hint || q.Hint || q.HINT || null;
  const baseWhy = q.why || q.Reason || q.mark || q.reason || q.Explanation || q.explain || q.explanation || "";

  let stepsText = "";
  if (q.steps && Array.isArray(q.steps)) {
    stepsText = q.steps.join("\n");
  }

  let whyStr = "";
  if (stepsText) {
    whyStr += `Steps:\n${stepsText}\n\n`;
  }
  if (baseWhy) {
    whyStr += `Explanation:\n${baseWhy}`;
  }
  whyStr = whyStr.trim();

  return {
    q: qStr,
    hint: hintStr,
    ans: ansVal,
    why: whyStr || "Demonstrate clear step-by-step reasoning."
  };
}

const dataDir = path.join(__dirname, "..", "data");
const curriculumPath = path.join(dataDir, "curriculum.json");
const outputPath = path.join(__dirname, "..", "..", "supabase", "seed.sql");

// 1. Read Canonical Curriculum
let curriculum = null;
try {
  curriculum = JSON.parse(fs.readFileSync(curriculumPath, "utf8"));
} catch (err) {
  console.error("FATAL: Error reading curriculum.json:", err);
  process.exit(1);
}

const CANONICAL_SUBJECT_IDS = ["math", "physics", "chemistry", "biology", "english", "computer"];
const activeSubjects = curriculum.filter(s => CANONICAL_SUBJECT_IDS.includes(s.id));

if (activeSubjects.length !== 6) {
  console.error(`FATAL: Expected 6 canonical subjects, found ${activeSubjects.length}`);
  process.exit(1);
}

// 2. Collate Content from Subject JS Data Files
const contentMap = new Map(); // key: `${sid}/${cid}/${topic}` -> { sid, cid, topic, notes, qs }

global.add = (sid, cid, topic, notes = "", qs = []) => {
  const notesStr = typeof notes === "string" ? notes : (Array.isArray(notes) ? notes.join("\n") : String(notes));
  const qsArray = Array.isArray(qs) ? qs : (qs ? [qs] : []);
  const key = `${sid}/${cid}/${topic}`;

  if (contentMap.has(key)) {
    const existing = contentMap.get(key);
    existing.notes = existing.notes + "\n<hr>\n" + notesStr;
    existing.qs = existing.qs.concat(qsArray);
  } else {
    contentMap.set(key, { sid, cid, topic, notes: notesStr, qs: qsArray });
  }
};

const subjectFiles = ["math.js", "physics.js", "chemistry.js", "biology.js", "english.js", "computer.js"];
subjectFiles.forEach((file) => {
  const filePath = path.join(dataDir, file);
  try {
    require(filePath);
  } catch (e) {
    console.error(`FATAL: Error loading content file ${file}:`, e);
    process.exit(1);
  }
});

// 3. Strict Verification Gate
let auditFailed = false;
let totalCanonicalChapters = 0;
let totalCanonicalTopics = 0;

activeSubjects.forEach(subj => {
  (subj.chapters || []).forEach(chap => {
    totalCanonicalChapters++;
    (chap.topics || []).forEach(top => {
      totalCanonicalTopics++;
      const key = `${subj.id}/${chap.id}/${top}`;
      if (!contentMap.has(key)) {
        console.error(`❌ MISSING CONTENT: Topic [${key}] has no content!`);
        auditFailed = true;
      }
    });
  });
});

for (const [key] of contentMap.entries()) {
  const [sid, cid, top] = key.split("/");
  const subj = activeSubjects.find(s => s.id === sid);
  const chap = subj ? subj.chapters.find(c => c.id === cid) : null;
  const exists = chap ? chap.topics.includes(top) : false;
  if (!exists) {
    console.error(`❌ ORPHAN CONTENT: [${key}] is not in canonical curriculum!`);
    auditFailed = true;
  }
}

if (auditFailed) {
  console.error("🚨 AUDIT FAILED: Fix all discrepancies before generating database seed!");
  process.exit(1);
}

console.log(`✅ All ${activeSubjects.length} subjects, ${totalCanonicalChapters} chapters, and ${totalCanonicalTopics} topics verified 100%.`);

// 4. Generate Relational SQL Statements
const sql = [];
sql.push("-- ========================================================");
sql.push("-- Shifter/Tixar Supabase Production Relational Seed Script");
sql.push("-- Derived directly from Canonical curriculum.json");
sql.push("-- ========================================================\n");

sql.push("BEGIN;\n");
sql.push("-- 1. Clean existing content with cascading truncate");
sql.push("TRUNCATE TABLE public.subjects CASCADE;");
sql.push("TRUNCATE TABLE public.content, public.curriculum CASCADE;\n");

// Insert Subjects
sql.push("-- 2. Insert Subjects");
sql.push("INSERT INTO public.subjects (id, name, slug, description) VALUES");
const subjRows = activeSubjects.map((s, idx) => {
  const isLast = idx === activeSubjects.length - 1;
  return `  ('${escapeSql(s.id)}', '${escapeSql(s.label)}', '${escapeSql(s.id)}', '${escapeSql(s.label)}')` + (isLast ? ";" : ",");
});
sql.push(subjRows.join("\n") + "\n");

// Build relational entities
let chapterIdSeq = 1;
let topicIdSeq = 1;
let lessonIdSeq = 1;
let quizIdSeq = 1;
let questionIdSeq = 1;
let answerIdSeq = 1;

const chapterRows = [];
const topicRows = [];
const lessonRows = [];
const quizRows = [];
const questionRows = [];
const answerRows = [];

activeSubjects.forEach(subj => {
  (subj.chapters || []).forEach((chap, chapIdx) => {
    const currentChapId = chapterIdSeq++;
    chapterRows.push({
      id: currentChapId,
      subject_id: subj.id,
      chapter_key: chap.id,
      title: chap.label,
      position: chapIdx
    });

    (chap.topics || []).forEach((topTitle, topIdx) => {
      const currentTopicId = topicIdSeq++;
      topicRows.push({
        id: currentTopicId,
        chapter_id: currentChapId,
        title: topTitle,
        position: topIdx,
        difficulty: "standard"
      });

      const key = `${subj.id}/${chap.id}/${topTitle}`;
      const content = contentMap.get(key);

      // Lesson
      const currentLessonId = lessonIdSeq++;
      lessonRows.push({
        id: currentLessonId,
        topic_id: currentTopicId,
        content: content.notes,
        summary: `Master study notes for ${topTitle}`,
        estimated_minutes: 15
      });

      // Quiz
      const currentQuizId = quizIdSeq++;
      quizRows.push({
        id: currentQuizId,
        topic_id: currentTopicId,
        title: `${topTitle} Quiz`,
        passing_score: 80
      });

      // Questions & Answers
      const rawQs = Array.isArray(content.qs) ? content.qs : (content.qs ? [content.qs] : []);
      if (rawQs.length === 0) {
        console.error(`❌ ZERO QUESTIONS: Topic [${key}] has no quiz questions!`);
        auditFailed = true;
      }

      rawQs.forEach((rawQ, qIdx) => {
        const norm = normalizeQ(rawQ);
        if (!norm || !norm.q || String(norm.q).trim() === "") {
          console.error(`❌ INVALID QUESTION: Topic [${key}] question index ${qIdx} has empty question text!`);
          auditFailed = true;
          return;
        }

        const rawAnswers = Array.isArray(norm.ans) ? norm.ans : (norm.ans !== undefined && norm.ans !== null ? [norm.ans] : []);
        const validAnswers = rawAnswers
          .map(a => String(a).trim())
          .filter(a => a.length > 0);

        if (validAnswers.length === 0) {
          console.error(`❌ QUESTION WITHOUT ANSWER: Topic [${key}] question "${norm.q}" has no valid answers!`);
          auditFailed = true;
          return;
        }

        const currentQuestionId = questionIdSeq++;
        questionRows.push({
          id: currentQuestionId,
          quiz_id: currentQuizId,
          question: norm.q,
          type: "text",
          points: 1,
          hint: norm.hint,
          explain: norm.why,
          position: qIdx
        });

        validAnswers.forEach(ansText => {
          answerRows.push({
            id: answerIdSeq++,
            question_id: currentQuestionId,
            answer_text: ansText,
            is_correct: true
          });
        });
      });
    });
  });
});

if (auditFailed) {
  console.error("🚨 AUDIT FAILED during entity generation: Aborting seed script generation!");
  process.exit(1);
}

// Batch output helper
function appendBatchInserts(tableName, columns, rows, batchSize = 100) {
  sql.push(`-- Insert ${tableName} (${rows.length} records)`);
  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    sql.push(`INSERT INTO public.${tableName} (${columns.join(", ")}) VALUES`);
    const valRows = chunk.map((r, rIdx) => {
      const isLast = rIdx === chunk.length - 1;
      const vals = columns.map(c => {
        const v = r[c];
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "number" || typeof v === "boolean") return String(v);
        return `'${escapeSql(v)}'`;
      });
      return `  (${vals.join(", ")})` + (isLast ? ";" : ",");
    });
    sql.push(valRows.join("\n"));
  }
  sql.push("");
}

appendBatchInserts("chapters", ["id", "subject_id", "chapter_key", "title", "position"], chapterRows);
appendBatchInserts("topics", ["id", "chapter_id", "title", "position", "difficulty"], topicRows);
appendBatchInserts("lessons", ["id", "topic_id", "content", "summary", "estimated_minutes"], lessonRows);
appendBatchInserts("quizzes", ["id", "topic_id", "title", "passing_score"], quizRows);
appendBatchInserts("questions", ["id", "quiz_id", "question", "type", "points", "hint", "explain", "position"], questionRows);
appendBatchInserts("answers", ["id", "question_id", "answer_text", "is_correct"], answerRows, 200);

// Sequence resets
sql.push("-- 3. Reset Identity Sequences");
sql.push(`SELECT setval(pg_get_serial_sequence('public.chapters', 'id'), ${chapterIdSeq});`);
sql.push(`SELECT setval(pg_get_serial_sequence('public.topics', 'id'), ${topicIdSeq});`);
sql.push(`SELECT setval(pg_get_serial_sequence('public.lessons', 'id'), ${lessonIdSeq});`);
sql.push(`SELECT setval(pg_get_serial_sequence('public.quizzes', 'id'), ${quizIdSeq});`);
sql.push(`SELECT setval(pg_get_serial_sequence('public.questions', 'id'), ${questionIdSeq});`);
sql.push(`SELECT setval(pg_get_serial_sequence('public.answers', 'id'), ${answerIdSeq});\n`);

// Backwards compatibility legacy inserts
sql.push("-- 4. Legacy Tables (curriculum & content)");
sql.push(`INSERT INTO public.curriculum (data) VALUES ('${escapeSql(JSON.stringify(activeSubjects))}');\n`);

const contentData = Array.from(contentMap.values());
contentData.forEach(row => {
  sql.push(`INSERT INTO public.content (sid, cid, topic, notes, qs) VALUES (`);
  sql.push(`  '${escapeSql(row.sid)}',`);
  sql.push(`  '${escapeSql(row.cid)}',`);
  sql.push(`  '${escapeSql(row.topic)}',`);
  sql.push(`  '${escapeSql(row.notes)}',`);
  sql.push(`  '${escapeSql(JSON.stringify(row.qs))}'`);
  sql.push(`);`);
});

sql.push("\nCOMMIT;\n");

// Write to seed.sql
try {
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, sql.join("\n"), "utf8");
  console.log(`\n====================================================`);
  console.log(`   SEED SCRIPT GENERATED SUCCESSFULLY`);
  console.log(`====================================================`);
  console.log(`Output:      ${outputPath}`);
  console.log(`Subjects:    ${activeSubjects.length}`);
  console.log(`Chapters:    ${chapterRows.length}`);
  console.log(`Topics:      ${topicRows.length}`);
  console.log(`Lessons:     ${lessonRows.length}`);
  console.log(`Quizzes:     ${quizRows.length}`);
  console.log(`Questions:   ${questionRows.length}`);
  console.log(`Answers:     ${answerRows.length}`);
  console.log(`File Size:   ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
} catch (err) {
  console.error("FATAL: Failed to write seed.sql:", err);
  process.exit(1);
}
