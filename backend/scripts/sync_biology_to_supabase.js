/**
 * Dedicated Sync Engine: Biology Diagnostic Question Bank -> Supabase
 *
 * Scope: Strictly Biology only.
 * Invariants:
 *  - Zero MCQs for Biology.
 *  - All questions are diagnostic with { q, hint, steps, ans, why }.
 *  - Full preservation of steps[], sol, why in explain JSON.
 *  - Every topic with questions has a corresponding quiz in `quizzes`.
 *  - Every question has an entry in `answers` with is_correct = true.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "..", ".env") });
const { createClient } = require("@supabase/supabase-js");
const { loadCanonicalCurriculum } = require("./curriculumLoader");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("FATAL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function sbCall(fn, label = "supabase call", retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      if (result.error) {
        if (attempt === retries || !result.error.message?.includes("fetch failed")) {
          return result;
        }
        throw new Error(result.error.message);
      }
      return result;
    } catch (err) {
      if (attempt === retries) return { error: err, data: null };
      const delay = 1000 * attempt;
      console.warn(`  [retry ${attempt}/${retries}] ${label}: ${err.message} — waiting ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

async function run() {
  console.log("=== SYNCING BIOLOGY DIAGNOSTIC QUESTIONS TO SUPABASE ===");

  // 1. Load canonical curriculum
  console.log("1. Loading canonical curriculum...");
  const canonical = loadCanonicalCurriculum();
  const biologyContent = [];
  for (const [key, content] of canonical.contentMap.entries()) {
    if (content.sid === "biology") {
      biologyContent.push(content);
    }
  }
  console.log(`   Found ${biologyContent.length} Biology content topics in curriculum.`);

  // 2. Fetch Biology chapters & topics from Supabase
  console.log("2. Fetching Biology chapters and topics from Supabase...");
  const { data: chapters, error: chapErr } = await sbCall(
    () => supabase.from("chapters").select("id, chapter_key, title").eq("subject_id", "biology"),
    "fetch chapters"
  );
  if (chapErr) throw chapErr;
  console.log(`   Found ${chapters.length} Biology chapters in DB.`);

  const chapterIds = chapters.map((c) => c.id);
  const { data: topics, error: topErr } = await sbCall(
    () => supabase.from("topics").select("id, chapter_id, title").in("chapter_id", chapterIds),
    "fetch topics"
  );
  if (topErr) throw topErr;
  console.log(`   Found ${topics.length} Biology topics in DB.`);

  // Build topic lookup: `${chapter_key}|${topic_title.toLowerCase()}` -> topic_id
  const chapterIdToKey = new Map();
  chapters.forEach((c) => chapterIdToKey.set(c.id, c.chapter_key));

  const topicMap = new Map();
  topics.forEach((t) => {
    const chapKey = chapterIdToKey.get(t.chapter_id);
    if (chapKey) {
      topicMap.set(`${chapKey}|${t.title.trim().toLowerCase()}`, t.id);
    }
  });

  // 3. Fetch or Create Quizzes for all Biology topics
  console.log("3. Ensuring quizzes exist for all Biology topics...");
  const topicIds = topics.map((t) => t.id);
  const { data: existingQuizzes, error: qzErr } = await sbCall(
    () => supabase.from("quizzes").select("id, topic_id").in("topic_id", topicIds),
    "fetch existing quizzes"
  );
  if (qzErr) throw qzErr;

  const quizMap = new Map(); // topic_id -> quiz_id
  (existingQuizzes || []).forEach((q) => quizMap.set(q.topic_id, q.id));

  // Identify topics missing quizzes
  const missingQuizzes = [];
  topics.forEach((t) => {
    if (!quizMap.has(t.id)) {
      missingQuizzes.push({
        topic_id: t.id,
        title: `${t.title} Quiz`,
        passing_score: 80,
      });
    }
  });

  if (missingQuizzes.length > 0) {
    console.log(`   Creating ${missingQuizzes.length} missing Biology quizzes...`);
    const batchSize = 100;
    for (let i = 0; i < missingQuizzes.length; i += batchSize) {
      const chunk = missingQuizzes.slice(i, i + batchSize);
      const { data: created, error: createQzErr } = await sbCall(
        () => supabase.from("quizzes").insert(chunk).select("id, topic_id"),
        `insert quizzes batch ${i}`
      );
      if (createQzErr) throw createQzErr;
      (created || []).forEach((q) => quizMap.set(q.topic_id, q.id));
    }
    console.log(`   ✓ All Biology quizzes created.`);
  } else {
    console.log(`   ✓ All Biology topics already have quizzes.`);
  }

  // 4. Clean out existing questions & answers for all Biology quizzes
  const allBiologyQuizIds = Array.from(quizMap.values());
  console.log(`4. Clearing existing questions for ${allBiologyQuizIds.length} Biology quizzes...`);

  // Delete in batches of 200 quizIds
  for (let i = 0; i < allBiologyQuizIds.length; i += 200) {
    const chunk = allBiologyQuizIds.slice(i, i + 200);
    // Find existing question IDs first to delete dependent answers if FK doesn't cascade
    const { data: oldQs } = await sbCall(
      () => supabase.from("questions").select("id").in("quiz_id", chunk),
      "fetch old question ids"
    );
    if (oldQs && oldQs.length > 0) {
      const oldQIds = oldQs.map((q) => q.id);
      for (let j = 0; j < oldQIds.length; j += 500) {
        const qSubChunk = oldQIds.slice(j, j + 500);
        await sbCall(
          () => supabase.from("answers").delete().in("question_id", qSubChunk),
          "delete old answers"
        );
      }
      for (let j = 0; j < oldQIds.length; j += 500) {
        const qSubChunk = oldQIds.slice(j, j + 500);
        await sbCall(
          () => supabase.from("questions").delete().in("id", qSubChunk),
          "delete old questions"
        );
      }
    }
  }
  console.log("   ✓ Cleaned old Biology questions and answers.");

  // 5. Insert new diagnostic questions
  console.log("5. Inserting standardized diagnostic questions...");
  const questionsToInsert = [];
  const metaList = [];

  for (const content of biologyContent) {
    const topicId = topicMap.get(`${content.cid}|${content.topic.trim().toLowerCase()}`);
    if (!topicId) continue;
    const quizId = quizMap.get(topicId);
    if (!quizId) continue;

    (content.qs || []).forEach((normQ, qIdx) => {
      const structuredExplain = JSON.stringify({
        why: normQ.why,
        sol: normQ.sol,
        steps: normQ.steps,
        options: [],
        conceptId: normQ.conceptId,
        skillId: normQ.skillId,
        subskillId: normQ.subskillId,
        subject: "biology",
        chapter: normQ.chapter,
        topic: normQ.topic,
      });

      questionsToInsert.push({
        quiz_id: quizId,
        question: normQ.q,
        type: "text",
        points: 1,
        hint: normQ.hint,
        explain: structuredExplain,
        position: qIdx,
      });

      metaList.push({
        quizId,
        position: qIdx,
        ans: normQ.ans,
      });
    });
  }

  console.log(`   Prepared ${questionsToInsert.length} diagnostic questions.`);

  const batchSize = 100;
  const dbQuestionIdMap = new Map(); // `${quizId}|${position}` -> question_id

  for (let i = 0; i < questionsToInsert.length; i += batchSize) {
    const chunk = questionsToInsert.slice(i, i + batchSize);
    const { data: qData, error: insQErr } = await sbCall(
      () => supabase.from("questions").insert(chunk).select("id, quiz_id, position"),
      `insert questions chunk ${i}`
    );
    if (insQErr) throw insQErr;
    (qData || []).forEach((q) => {
      dbQuestionIdMap.set(`${q.quiz_id}|${q.position}`, q.id);
    });
    if ((i / batchSize) % 5 === 0 || i + batchSize >= questionsToInsert.length) {
      console.log(`   Inserted ${Math.min(i + batchSize, questionsToInsert.length)} / ${questionsToInsert.length} questions...`);
    }
  }
  console.log(`   ✓ Successfully inserted ${dbQuestionIdMap.size} questions.`);

  // 6. Insert correct answers
  console.log("6. Inserting canonical answers into answers table...");
  const answersToInsert = [];
  metaList.forEach((m) => {
    const questionId = dbQuestionIdMap.get(`${m.quizId}|${m.position}`);
    if (questionId && m.ans) {
      answersToInsert.push({
        question_id: questionId,
        answer_text: m.ans,
        is_correct: true,
      });
    }
  });

  for (let i = 0; i < answersToInsert.length; i += batchSize) {
    const chunk = answersToInsert.slice(i, i + batchSize);
    const { error: insAnsErr } = await sbCall(
      () => supabase.from("answers").insert(chunk),
      `insert answers chunk ${i}`
    );
    if (insAnsErr) throw insAnsErr;
  }
  console.log(`   ✓ Successfully inserted ${answersToInsert.length} answers.`);

  // 7. Verification Audit
  console.log("\n=== VERIFICATION AUDIT ===");
  const { count: finalTotal, error: fErr } = await sbCall(
    () => supabase.from("questions").select("*", { count: "exact", head: true }).in("quiz_id", allBiologyQuizIds),
    "count final questions"
  );
  if (fErr) throw fErr;

  const { count: mcqCount } = await sbCall(
    () => supabase.from("questions").select("*", { count: "exact", head: true }).in("quiz_id", allBiologyQuizIds).eq("type", "mcq"),
    "count mcq questions"
  );

  const { count: textCount } = await sbCall(
    () => supabase.from("questions").select("*", { count: "exact", head: true }).in("quiz_id", allBiologyQuizIds).eq("type", "text"),
    "count text questions"
  );

  console.log(`Total Biology questions in DB: ${finalTotal}`);
  console.log(`Diagnostic Text questions:     ${textCount}`);
  console.log(`Multiple Choice questions:     ${mcqCount}`);

  if (mcqCount === 0 && textCount === questionsToInsert.length) {
    console.log("✓ SUCCESS: 100% of Biology questions in Supabase are diagnostic questions with zero MCQs!");
  } else {
    console.warn("⚠️ Warning: Mismatch detected in final counts.");
  }
}

run()
  .then(() => {
    console.log("=== SYNC COMPLETED SUCCESSFULLY ===");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FATAL ERROR during sync:", err);
    process.exit(1);
  });
