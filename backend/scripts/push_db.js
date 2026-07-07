require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY) must be set in your backend/.env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const dataDir = path.join(__dirname, "..", "data");
const curriculumPath = path.join(dataDir, "curriculum.json");

function normalizeQ(q) {
  if (!q) return q;
  const qStr = q.q || q.Question || q.question || q.Q1 || q.Q || "Explain the core concept of this topic.";
  const ansStr = q.ans || q.Answer || q.answer || q.A1 || q.A || q.a || "Understanding of the concept.";
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
  
  if (ansStr) {
    const formattedAns = Array.isArray(ansStr) ? ansStr.join(", ") : ansStr;
    whyStr += `Correct Answer:\n${formattedAns}\n\n`;
  }

  if (baseWhy) {
    whyStr += `Explanation:\n${baseWhy}`;
  }

  whyStr = whyStr.trim();
  if (!whyStr) {
    whyStr = "Demonstrate clear step-by-step reasoning.";
  }

  return {
    q: qStr,
    hint: hintStr,
    ans: ansStr,
    why: whyStr
  };
}

async function run() {
  console.log("Connecting to Supabase at:", supabaseUrl);

  // 1. Read curriculum
  let curriculum = null;
  try {
    if (fs.existsSync(curriculumPath)) {
      curriculum = JSON.parse(fs.readFileSync(curriculumPath, "utf8"));
    } else {
      console.error("Curriculum file not found at " + curriculumPath);
      process.exit(1);
    }
  } catch (err) {
    console.error("Error reading curriculum.json:", err);
    process.exit(1);
  }

  // 2. Define global add to capture content data
  const contentMap = new Map();
  global.add = (sid, cid, topic, notes = "", qs = []) => {
    const notesStr = typeof notes === "string"
      ? notes
      : Array.isArray(notes)
        ? notes.join("\n")
        : String(notes);

    const qsArray = Array.isArray(qs) ? qs : [qs];
    const key = `${sid}|${cid}|${topic.toLowerCase()}`;
    contentMap.set(key, {
      sid,
      cid,
      topic,
      notes: notesStr,
      qs: qsArray
    });
  };

  // 3. Load all JS data files
  try {
    const files = fs.readdirSync(dataDir);
    files.forEach((file) => {
      if (file.endsWith(".js") && file !== "curriculum.js") {
        require(path.join(dataDir, file));
      }
    });
  } catch (err) {
    console.error("Failed to read data directory:", err);
    process.exit(1);
  }

  console.log(`Loaded ${contentMap.size} unique content topics and curriculum.`);

  // 4. Truncate existing data via cascading subjects delete
  console.log("Clearing existing content data in Supabase...");
  const { error: deleteErr } = await supabase
    .from("subjects")
    .delete()
    .neq("id", "_");

  if (deleteErr) {
    console.error("Error clearing existing subjects:", deleteErr.message);
    process.exit(1);
  }
  console.log("Existing data cleared.");

  // 5. Batch Insert Subjects
  console.log("Inserting subjects...");
  const subjectsToInsert = curriculum.map((subj) => ({
    id: subj.id,
    name: subj.label,
    slug: subj.id,
    description: subj.label
  }));

  const { error: subjInsertErr } = await supabase
    .from("subjects")
    .insert(subjectsToInsert);

  if (subjInsertErr) {
    console.error("Error inserting subjects:", subjInsertErr.message);
    process.exit(1);
  }

  // 6. Batch Insert Chapters
  console.log("Inserting chapters...");
  const chaptersToInsert = [];
  curriculum.forEach((subj) => {
    if (subj.chapters) {
      subj.chapters.forEach((chap, chapIdx) => {
        chaptersToInsert.push({
          subject_id: subj.id,
          chapter_key: chap.id,
          title: chap.label,
          position: chapIdx
        });
      });
    }
  });

  const { error: chapInsertErr } = await supabase
    .from("chapters")
    .insert(chaptersToInsert);

  if (chapInsertErr) {
    console.error("Error inserting chapters:", chapInsertErr.message);
    process.exit(1);
  }

  // Fetch chapters back to map (subject_id, chapter_key) -> chapter_id
  const { data: chaptersData, error: chapFetchErr } = await supabase
    .from("chapters")
    .select("id, subject_id, chapter_key");

  if (chapFetchErr) {
    console.error("Error fetching chapters:", chapFetchErr.message);
    process.exit(1);
  }

  const chapterMap = new Map();
  chaptersData.forEach((chap) => {
    chapterMap.set(`${chap.subject_id}|${chap.chapter_key}`, chap.id);
  });

  // 7. Batch Insert Topics
  console.log("Inserting topics...");
  const topicsToInsert = [];
  curriculum.forEach((subj) => {
    if (subj.chapters) {
      subj.chapters.forEach((chap) => {
        const chapterId = chapterMap.get(`${subj.id}|${chap.id}`);
        if (chap.topics) {
          const seenTopicsInChapter = new Set();
          chap.topics.forEach((topicTitle, topicIdx) => {
            const normalizedTitle = topicTitle.trim().toLowerCase();
            if (seenTopicsInChapter.has(normalizedTitle)) {
              console.log(`Skipping duplicate topic "${topicTitle}" in chapter "${chap.title}" (${subj.id})`);
              return;
            }
            seenTopicsInChapter.add(normalizedTitle);
            topicsToInsert.push({
              chapter_id: chapterId,
              title: topicTitle,
              position: topicIdx,
              difficulty: "intermediate"
            });
          });
        }
      });
    }
  });

  // Insert topics in chunks to avoid any request limit errors
  const batchSize = 100;
  for (let i = 0; i < topicsToInsert.length; i += batchSize) {
    const chunk = topicsToInsert.slice(i, i + batchSize);
    const { error: topicInsertErr } = await supabase
      .from("topics")
      .insert(chunk);

    if (topicInsertErr) {
      console.error("Error inserting topics chunk:", topicInsertErr.message);
      process.exit(1);
    }
  }

  // Fetch topics back to map (subject_id, chapter_key, topic_title_lower) -> topic_id
  // We need to fetch chapters and subjects relationally or construct the map by joining
  const { data: topicsData, error: topicsFetchErr } = await supabase
    .from("topics")
    .select(`
      id,
      title,
      chapter:chapter_id (
        chapter_key,
        subject_id
      )
    `);

  if (topicsFetchErr) {
    console.error("Error fetching topics:", topicsFetchErr.message);
    process.exit(1);
  }

  const topicMap = new Map();
  topicsData.forEach((topic) => {
    const key = `${topic.chapter.subject_id}|${topic.chapter.chapter_key}|${topic.title.toLowerCase()}`;
    topicMap.set(key, topic.id);
  });

  // 8. Batch Insert Lessons
  console.log("Inserting lessons...");
  const lessonsToInsert = [];
  const contentArray = Array.from(contentMap.values());

  contentArray.forEach((c) => {
    const key = `${c.sid}|${c.cid}|${c.topic.toLowerCase()}`;
    const topicId = topicMap.get(key);
    if (topicId) {
      lessonsToInsert.push({
        topic_id: topicId,
        content: c.notes,
        summary: null,
        estimated_minutes: 10
      });
    } else {
      console.warn(`Warning: Could not find topic in curriculum matching ${key}`);
    }
  });

  for (let i = 0; i < lessonsToInsert.length; i += batchSize) {
    const chunk = lessonsToInsert.slice(i, i + batchSize);
    const { error: lessonInsertErr } = await supabase
      .from("lessons")
      .insert(chunk);

    if (lessonInsertErr) {
      console.error("Error inserting lessons chunk:", lessonInsertErr.message);
      process.exit(1);
    }
  }

  // Fetch lessons back to insert lesson_versions
  const { data: lessonsData, error: lessonsFetchErr } = await supabase
    .from("lessons")
    .select("id, content");

  if (lessonsFetchErr) {
    console.error("Error fetching lessons:", lessonsFetchErr.message);
    process.exit(1);
  }

  const lessonVersionsToInsert = lessonsData.map((l) => ({
    lesson_id: l.id,
    content: l.content,
    version: 1
  }));

  for (let i = 0; i < lessonVersionsToInsert.length; i += batchSize) {
    const chunk = lessonVersionsToInsert.slice(i, i + batchSize);
    const { error: versionsInsertErr } = await supabase
      .from("lesson_versions")
      .insert(chunk);

    if (versionsInsertErr) {
      console.error("Error inserting lesson versions chunk:", versionsInsertErr.message);
      process.exit(1);
    }
  }

  // 9. Batch Insert Quizzes
  console.log("Inserting quizzes...");
  const quizzesToInsert = [];
  contentArray.forEach((c) => {
    const key = `${c.sid}|${c.cid}|${c.topic.toLowerCase()}`;
    const topicId = topicMap.get(key);
    if (topicId && c.qs && c.qs.length > 0) {
      quizzesToInsert.push({
        topic_id: topicId,
        title: `${c.topic} Quiz`,
        passing_score: 0
      });
    }
  });

  const quizMap = new Map();
  for (let i = 0; i < quizzesToInsert.length; i += batchSize) {
    const chunk = quizzesToInsert.slice(i, i + batchSize);
    const { data: insertedQuizzes, error: quizInsertErr } = await supabase
      .from("quizzes")
      .insert(chunk)
      .select("id, topic_id");

    if (quizInsertErr) {
      console.error("Error inserting quizzes chunk:", quizInsertErr.message);
      process.exit(1);
    }

    if (insertedQuizzes) {
      insertedQuizzes.forEach((q) => {
        quizMap.set(q.topic_id, q.id);
      });
    }
  }

  // 10. Batch Insert Questions
  console.log("Inserting questions...");
  const questionsToInsert = [];
  const questionMetaData = []; // To helper map questions back

  contentArray.forEach((c) => {
    const key = `${c.sid}|${c.cid}|${c.topic.toLowerCase()}`;
    const topicId = topicMap.get(key);
    if (!topicId) return;

    const quizId = quizMap.get(topicId);
    if (!quizId) return;

    if (c.qs && c.qs.length > 0) {
      c.qs.forEach((qItem, qIdx) => {
        const normalized = normalizeQ(qItem);
        questionsToInsert.push({
          quiz_id: quizId,
          question: normalized.q,
          type: "text",
          points: 1,
          hint: normalized.hint,
          explain: normalized.why,
          position: qIdx
        });
        questionMetaData.push({
          quizId,
          position: qIdx,
          ans: normalized.ans
        });
      });
    }
  });

  const dbQuestionMap = new Map();
  for (let i = 0; i < questionsToInsert.length; i += batchSize) {
    const chunk = questionsToInsert.slice(i, i + batchSize);
    const { data: insertedQuestions, error: questionInsertErr } = await supabase
      .from("questions")
      .insert(chunk)
      .select("id, quiz_id, position");

    if (questionInsertErr) {
      console.error("Error inserting questions chunk:", questionInsertErr.message);
      process.exit(1);
    }

    if (insertedQuestions) {
      insertedQuestions.forEach((q) => {
        dbQuestionMap.set(`${q.quiz_id}|${q.position}`, q.id);
      });
    }
  }

  // 11. Batch Insert Answers
  console.log("Inserting answers...");
  const answersToInsert = [];
  questionMetaData.forEach((meta) => {
    const questionId = dbQuestionMap.get(`${meta.quizId}|${meta.position}`);
    if (!questionId) return;

    if (Array.isArray(meta.ans)) {
      meta.ans.forEach((ansStr) => {
        answersToInsert.push({
          question_id: questionId,
          answer_text: String(ansStr),
          is_correct: true
        });
      });
    } else {
      answersToInsert.push({
        question_id: questionId,
        answer_text: String(meta.ans),
        is_correct: true
      });
    }
  });

  for (let i = 0; i < answersToInsert.length; i += batchSize) {
    const chunk = answersToInsert.slice(i, i + batchSize);
    const { error: answerInsertErr } = await supabase
      .from("answers")
      .insert(chunk);

    if (answerInsertErr) {
      console.error("Error inserting answers chunk:", answerInsertErr.message);
      process.exit(1);
    }
  }

  console.log("Database upload completed successfully!");
}

run();
