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

// Retry wrapper for transient Node.js fetch failures (Windows TLS drops etc.)
async function sb(fn, label = "supabase call", retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      if (result.error && attempt === retries) return result;
      if (result.error && result.error.message && !result.error.message.includes("fetch failed")) return result;
      if (!result.error) return result;
      throw new Error(result.error.message);
    } catch (err) {
      if (attempt === retries) {
        return { error: err, data: null };
      }
      const delay = 600 * attempt;
      console.warn(`  [retry ${attempt}/${retries}] ${label}: ${err.message} — waiting ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

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
  const { error: deleteErr } = await sb(
    () => supabase.from("subjects").delete().neq("id", "_"),
    "clear subjects"
  );

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

  const { error: subjInsertErr } = await sb(
    () => supabase.from("subjects").insert(subjectsToInsert),
    "insert subjects"
  );

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

  const { error: chapInsertErr } = await sb(
    () => supabase.from("chapters").insert(chaptersToInsert),
    "insert chapters"
  );

  if (chapInsertErr) {
    console.error("Error inserting chapters:", chapInsertErr.message);
    process.exit(1);
  }

  // Fetch chapters back to map (subject_id, chapter_key) -> chapter_id
  const { data: chaptersData, error: chapFetchErr } = await sb(
    () => supabase.from("chapters").select("id, subject_id, chapter_key"),
    "fetch chapters"
  );

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
    const { error: topicInsertErr } = await sb(
      () => supabase.from("topics").insert(chunk),
      `insert topics chunk ${i}`
    );

    if (topicInsertErr) {
      console.error("Error inserting topics chunk:", topicInsertErr.message);
      process.exit(1);
    }
  }

  // Fetch topics back to map (subject_id, chapter_key, topic_title_lower) -> topic_id
  // We need to fetch chapters and subjects relationally or construct the map by joining
  const { data: topicsData, error: topicsFetchErr } = await sb(
    () => supabase.from("topics").select(`id, title, chapter:chapter_id ( chapter_key, subject_id )`),
    "fetch topics"
  );

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

  // insertWithRetry now delegates to the global sb() retry wrapper
  async function insertWithRetry(table, row) {
    const { error } = await sb(
      () => supabase.from(table).insert([row]),
      `insert row into ${table}`
    );
    if (error) throw error;
  }

  let lessonCount = 0;
  for (const row of lessonsToInsert) {
    try {
      await insertWithRetry("lessons", row);
    } catch (err) {
      console.error("Error inserting lesson:", err.message);
      process.exit(1);
    }
    lessonCount++;
    if (lessonCount % 50 === 0) console.log(`  Inserted ${lessonCount}/${lessonsToInsert.length} lessons...`);
    await new Promise((r) => setTimeout(r, 150));
  }
  console.log(`  Inserted all ${lessonCount} lessons.`);

  // Fetch lessons back to insert lesson_versions
  const { data: lessonsData, error: lessonsFetchErr } = await sb(
    () => supabase.from("lessons").select("id, content"),
    "fetch lessons"
  );

  if (lessonsFetchErr) {
    console.error("Error fetching lessons:", lessonsFetchErr.message);
    process.exit(1);
  }

  const lessonVersionsToInsert = lessonsData.map((l) => ({
    lesson_id: l.id,
    content: l.content,
    version: 1
  }));

  let versionCount = 0;
  for (const row of lessonVersionsToInsert) {
    try {
      await insertWithRetry("lesson_versions", row);
    } catch (err) {
      console.error("Error inserting lesson_version:", err.message);
      process.exit(1);
    }
    versionCount++;
    if (versionCount % 50 === 0) console.log(`  Inserted ${versionCount}/${lessonVersionsToInsert.length} lesson versions...`);
    await new Promise((r) => setTimeout(r, 150));
  }
  console.log(`  Inserted all ${versionCount} lesson versions.`);

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

  // 12. Batch Insert Profiles & Learning Feature Data
  console.log("Syncing profiles and seeding learning feature data (enrollments, progress, mistakes, spaced reviews, notes, audit logs, learning events)...");

  let profilesList = [];
  try {
    const { data: authUsersData } = await supabase.auth.admin.listUsers();
    if (authUsersData && authUsersData.users && authUsersData.users.length > 0) {
      const profilesToUpsert = authUsersData.users.map((u) => ({
        id: u.id,
        email: u.email,
        username: u.email ? u.email.split("@")[0] : "student",
        full_name: u.user_metadata?.full_name || (u.email ? u.email.split("@")[0] : "Student"),
        role_name: "student",
      }));
      await supabase.from("profiles").upsert(profilesToUpsert, { onConflict: "id" });
      profilesList = profilesToUpsert;
    }
  } catch (e) {
    console.warn("Notice: auth.admin.listUsers() not available or failed:", e.message);
  }

  // Fallback if no auth profiles
  if (profilesList.length === 0) {
    const { data: existingProfiles } = await supabase.from("profiles").select("id, email");
    if (existingProfiles && existingProfiles.length > 0) {
      profilesList = existingProfiles;
    } else {
      const demoId = "00000000-0000-0000-0000-000000000001";
      await supabase.from("profiles").upsert({
        id: demoId,
        email: "demo@shifter.app",
        username: "demouser",
        full_name: "Demo Student",
        role_name: "student",
      }, { onConflict: "id" });
      profilesList = [{ id: demoId, email: "demo@shifter.app" }];
    }
  }

  console.log(`Seeding user features for ${profilesList.length} profiles...`);

  // Prepare seed datasets across topics
  const allTopicEntries = Array.from(topicMap.entries()); // [key, topic_id]

  for (const user of profilesList) {
    const uId = user.id;

    // A. Enrollments: Enroll user in ALL subjects
    const enrollmentsToInsert = subjectsToInsert.map((s) => ({
      user_id: uId,
      subject_id: s.id,
    }));
    await supabase.from("enrollments").upsert(enrollmentsToInsert, { onConflict: "user_id,subject_id", ignoreDuplicates: true });

    if (allTopicEntries.length > 0) {
      // B. Progress: Seed completed topic scores & mastery
      const sampleTopics = allTopicEntries.slice(0, Math.min(30, allTopicEntries.length));
      const progressToInsert = sampleTopics.map(([key, tId], idx) => {
        const score = 60 + ((idx * 11) % 40);
        return {
          user_id: uId,
          topic_id: tId,
          completed: true,
          score: score,
          mastered: score >= 75,
          confidence_level: score >= 85 ? "high" : score >= 70 ? "medium" : "low",
        };
      });
      await supabase.from("progress").upsert(progressToInsert, { onConflict: "user_id,topic_id", ignoreDuplicates: false });

      // C. User Mistakes (Mistake Journal)
      const mistakeTopics = allTopicEntries.slice(0, Math.min(8, allTopicEntries.length));
      const mistakesToInsert = mistakeTopics.map(([key, tId], idx) => {
        const parts = key.split("|");
        const sId = parts[0];
        const cKey = parts[1];
        const topicName = parts[2] || "concept";
        return {
          user_id: uId,
          topic_id: tId,
          subject_id: sId,
          chapter_key: cKey,
          question_index: idx % 3,
          question_text: `Practice Question on ${topicName}: Explain the fundamental principle governing this topic.`,
          correct_answer: `The primary law and key relationship for ${topicName}.`,
          solution: `Step 1: Identify given quantities.\nStep 2: Apply the governing formula.\nStep 3: Calculate the result.`,
          resolved: idx % 2 === 1,
          attempt_count: idx + 1,
          resolved_at: idx % 2 === 1 ? new Date().toISOString() : null,
        };
      });
      await supabase.from("user_mistakes").upsert(mistakesToInsert, { onConflict: "user_id,topic_id,question_index", ignoreDuplicates: false });

      // D. Spaced Reviews (User Review Queue)
      const reviewTopics = allTopicEntries.slice(0, Math.min(10, allTopicEntries.length));
      const reviewsToInsert = reviewTopics.map(([key, tId], idx) => {
        const isOverdue = idx < 5; // First 5 are due/overdue for immediate review queue!
        const nextDate = isOverdue
          ? new Date(Date.now() - (idx + 1) * 3600 * 1000 * 4).toISOString() // 4 to 20 hours ago (due today)
          : new Date(Date.now() + (idx + 1) * 86400 * 1000 * 3).toISOString(); // 3 to 15 days in future
        return {
          user_id: uId,
          topic_id: tId,
          next_review_at: nextDate,
          interval_days: isOverdue ? 1 : (idx + 1) * 3,
          ease_factor: 2.5,
          repetitions: isOverdue ? 1 : 2,
        };
      });
      await supabase.from("spaced_reviews").upsert(reviewsToInsert, { onConflict: "user_id,topic_id", ignoreDuplicates: false });

      // E. User Notes (Personal Scratchpad)
      const noteTopics = allTopicEntries.slice(0, Math.min(6, allTopicEntries.length));
      const notesToInsert = noteTopics.map(([key, tId]) => {
        const parts = key.split("|");
        const topicName = parts[2] || "Topic";
        return {
          user_id: uId,
          topic_id: tId,
          note_text: `Study Notes for ${topicName}:\n• Key Concept: Remember the main definitions.\n• Calculations: Double-check units.\n• Common Exam Pitfall: Watch out for negative signs and conversion factors.`,
        };
      });
      await supabase.from("user_notes").upsert(notesToInsert, { onConflict: "user_id,topic_id", ignoreDuplicates: false });

      // F. Achievements
      const achievementsToInsert = sampleTopics.slice(0, 5).map(([key]) => {
        const parts = key.split("|");
        return {
          user_id: uId,
          achievement_name: `Mastered Topic: ${parts[2]}`,
          unlocked_at: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString(),
        };
      });
      await supabase.from("achievements").insert(achievementsToInsert);

      // G. Audit Logs
      const auditLogsToInsert = [
        { user_id: uId, action: "USER_LOGIN", table_name: "profiles", record_id: uId, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
        { user_id: uId, action: "SUBJECT_ENROLLED", table_name: "enrollments", record_id: "physics", timestamp: new Date(Date.now() - 86400000).toISOString() },
        { user_id: uId, action: "QUIZ_COMPLETED", table_name: "quizzes", record_id: "1", timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
        { user_id: uId, action: "NOTE_SAVED", table_name: "user_notes", record_id: "1", timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
      ];
      await supabase.from("audit_logs").insert(auditLogsToInsert);

      // H. Learning Events (Analytics)
      const learningEventsToInsert = [];
      allTopicEntries.slice(0, 15).forEach(([key, tId]) => {
        for (let i = 0; i < 4; i++) learningEventsToInsert.push({ topic_id: tId, user_id: uId, event_type: "visit" });
        for (let i = 0; i < 2; i++) learningEventsToInsert.push({ topic_id: tId, user_id: uId, event_type: "pass" });
        for (let i = 0; i < 1; i++) learningEventsToInsert.push({ topic_id: tId, user_id: uId, event_type: "fail" });
      });
      for (let i = 0; i < learningEventsToInsert.length; i += batchSize) {
        const chunk = learningEventsToInsert.slice(i, i + batchSize);
        await supabase.from("learning_events").insert(chunk);
      }
    }
  }

  console.log("Database upload completed successfully!");
}

run();
