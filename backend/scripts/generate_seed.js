/**
 * Relational Seed SQL Generator for Shifter / Tixar (Supabase)
 *
 * Derives strictly and directly from Canonical Curriculum through curriculumLoader.
 * Outputs idempotent, transactional PostgreSQL to supabase/seed.sql.
 *
 * Invariants:
 *   1. Zero data loss: Preserves steps[], sol, why, and MCQ options in structured JSON explain.
 *   2. Relational consistency: Exactly 6 subjects, 70 chapters, 334 topics, 334 lessons, 334 quizzes, 1800 questions.
 *   3. All answers and distractors correctly seeded into public.answers.
 */

const fs = require("fs");
const path = require("path");
const { loadCanonicalCurriculum } = require("./curriculumLoader");

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const outputPath = path.resolve(__dirname, "..", "..", "supabase", "seed.sql");

console.log("Loading and validating canonical curriculum...");
const canonical = loadCanonicalCurriculum();
const { curriculum, contentMap, stats } = canonical;

console.log(`Validated: ${stats.subjectsCount} subjects, ${stats.chaptersCount} chapters, ${stats.topicsCount} topics, ${stats.questionsCount} questions.\n`);

const sql = [];

sql.push("-- ========================================================");
sql.push("-- Shifter / Tixar Supabase Production Relational Seed Script");
sql.push("-- Derived directly from Canonical curriculum.json & subject JS files");
sql.push("-- Zero Data Loss: Preserves steps[], sol, why, and options[]");
sql.push("-- ========================================================\n");

sql.push("BEGIN;\n");
sql.push("-- 1. Cascading clean of existing curriculum");
sql.push("TRUNCATE TABLE public.subjects CASCADE;");
sql.push("TRUNCATE TABLE public.content, public.curriculum CASCADE;\n");

// 2. Insert Subjects
sql.push("-- 2. Insert Subjects");
sql.push("INSERT INTO public.subjects (id, name, slug, description) VALUES");
const subjLines = curriculum.map((s, idx) => {
  const isLast = idx === curriculum.length - 1;
  return `  (${escapeSql(s.id)}, ${escapeSql(s.label)}, ${escapeSql(s.id)}, ${escapeSql(s.label)})` + (isLast ? ";" : ",");
});
sql.push(subjLines.join("\n") + "\n");

// 3. Build relational records
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

curriculum.forEach((subj) => {
  (subj.chapters || []).forEach((chap, cIdx) => {
    const currentChapId = chapterIdSeq++;
    chapterRows.push({
      id: currentChapId,
      subject_id: subj.id,
      chapter_key: chap.id,
      title: chap.label,
      position: cIdx,
    });

    (chap.topics || []).forEach((topTitle, tIdx) => {
      const currentTopicId = topicIdSeq++;
      topicRows.push({
        id: currentTopicId,
        chapter_id: currentChapId,
        title: topTitle,
        position: tIdx,
        difficulty: "standard",
      });

      const trimmedTitle = String(topTitle).trim();
      const key = `${subj.id}/${chap.id}/${trimmedTitle}`;
      const content = contentMap.get(key) || contentMap.get(`${subj.id}/${chap.id}/${topTitle}`);
      if (!content) {
        throw new Error(`Content not found for topic: ${key}`);
      }

      // Lesson
      const currentLessonId = lessonIdSeq++;
      lessonRows.push({
        id: currentLessonId,
        topic_id: currentTopicId,
        content: content.notes,
        summary: `Canonical lesson notes for ${topTitle}`,
        estimated_minutes: 15,
      });

      // Quiz
      const currentQuizId = quizIdSeq++;
      quizRows.push({
        id: currentQuizId,
        topic_id: currentTopicId,
        title: `${topTitle} Quiz`,
        passing_score: 80,
      });

      // Questions & Answers
      content.qs.forEach((normQ, qIdx) => {
        const currentQuestionId = questionIdSeq++;
        const structuredExplain = JSON.stringify({
          why: normQ.why,
          sol: normQ.sol,
          steps: normQ.steps,
          options: normQ.options,
          conceptId: normQ.conceptId,
          skillId: normQ.skillId,
          subskillId: normQ.subskillId,
          subject: normQ.subject,
          chapter: normQ.chapter,
          topic: normQ.topic,
        });

        questionRows.push({
          id: currentQuestionId,
          quiz_id: currentQuizId,
          question: normQ.q,
          type: normQ.type,
          points: 1,
          hint: normQ.hint,
          explain: structuredExplain,
          position: qIdx,
        });

        if (normQ.type === "mcq" && normQ.options.length > 0) {
          normQ.options.forEach((opt) => {
            answerRows.push({
              id: answerIdSeq++,
              question_id: currentQuestionId,
              answer_text: opt.text,
              is_correct: opt.is_correct,
            });
          });
        } else {
          answerRows.push({
            id: answerIdSeq++,
            question_id: currentQuestionId,
            answer_text: normQ.ans,
            is_correct: true,
          });
        }
      });
    });
  });
});

// Helper to batch SQL inserts
function appendBatch(table, columns, rows, batchSize = 250) {
  sql.push(`-- Insert ${table} (${rows.length} rows)`);
  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    sql.push(`INSERT INTO public.${table} (${columns.join(", ")}) VALUES`);
    const values = chunk.map((r, rIdx) => {
      const isLast = rIdx === chunk.length - 1;
      const rowVals = columns.map((col) => {
        const val = r[col];
        if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
        if (typeof val === "number") return val;
        return escapeSql(val);
      });
      return `  (${rowVals.join(", ")})` + (isLast ? ";" : ",");
    });
    sql.push(values.join("\n"));
  }
  sql.push("");
}

appendBatch("chapters", ["id", "subject_id", "chapter_key", "title", "position"], chapterRows);
appendBatch("topics", ["id", "chapter_id", "title", "position", "difficulty"], topicRows);
appendBatch("lessons", ["id", "topic_id", "content", "summary", "estimated_minutes"], lessonRows);

// Lesson versions
const lessonVersionRows = lessonRows.map((l) => ({
  id: l.id,
  lesson_id: l.id,
  content: l.content,
  version: 1,
}));
appendBatch("lesson_versions", ["id", "lesson_id", "content", "version"], lessonVersionRows);

appendBatch("quizzes", ["id", "topic_id", "title", "passing_score"], quizRows);
appendBatch("questions", ["id", "quiz_id", "question", "type", "points", "hint", "explain", "position"], questionRows);
appendBatch("answers", ["id", "question_id", "answer_text", "is_correct"], answerRows);

// Reset sequence generators in Postgres so subsequent runtime inserts don't collide
sql.push("-- Reset sequence generators to avoid key collisions on subsequent inserts");
sql.push("SELECT setval(pg_get_serial_sequence('public.chapters', 'id'), COALESCE((SELECT MAX(id) FROM public.chapters), 1));");
sql.push("SELECT setval(pg_get_serial_sequence('public.topics', 'id'), COALESCE((SELECT MAX(id) FROM public.topics), 1));");
sql.push("SELECT setval(pg_get_serial_sequence('public.lessons', 'id'), COALESCE((SELECT MAX(id) FROM public.lessons), 1));");
sql.push("SELECT setval(pg_get_serial_sequence('public.lesson_versions', 'id'), COALESCE((SELECT MAX(id) FROM public.lesson_versions), 1));");
sql.push("SELECT setval(pg_get_serial_sequence('public.quizzes', 'id'), COALESCE((SELECT MAX(id) FROM public.quizzes), 1));");
sql.push("SELECT setval(pg_get_serial_sequence('public.questions', 'id'), COALESCE((SELECT MAX(id) FROM public.questions), 1));");
sql.push("SELECT setval(pg_get_serial_sequence('public.answers', 'id'), COALESCE((SELECT MAX(id) FROM public.answers), 1));\n");

sql.push("COMMIT;\n");

fs.writeFileSync(outputPath, sql.join("\n"), "utf8");
console.log(`✅ Successfully generated ${outputPath}`);
console.log(`Summary:
  Subjects:        ${curriculum.length}
  Chapters:        ${chapterRows.length}
  Topics:          ${topicRows.length}
  Lessons:         ${lessonRows.length}
  Quizzes:         ${quizRows.length}
  Questions:       ${questionRows.length} (with full steps[], sol, why, options)
  Answers:         ${answerRows.length}
`);
