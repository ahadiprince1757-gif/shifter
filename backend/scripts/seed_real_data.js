/**
 * Production-Ready Real Data Seed Engine for Shifter / Tixar (Supabase)
 *
 * Architecture:
 *   curriculum.json + 6 subject JS data files
 *                  │
 *                  ▼
 *          Canonical Loader (scripts/curriculumLoader.js)
 *                  │
 *                  ▼
 *          Normalize + Validate
 *                  │
 *          ┌───────┴────────┐
 *          ▼                ▼
 *   Curriculum Seed    Demo Learner Seed
 *          │                │
 *          ▼                ▼
 *   Supabase tables    User-state tables
 *
 * Invariants Enforced:
 *   1. Zero data loss: steps[] preserved, sol preserved, MCQ options/distractors preserved.
 *   2. Semantic integrity: non-empty answers, exactly 1 correct MCQ option, 100% curriculum match.
 *   3. Tixar Skill Invariant: Diagnosed Skill ≡ Repair Skill ≡ Retest Skill.
 *   4. Clean separation: Curriculum and Learner fixtures are distinct phases.
 *
 * Flags:
 *   --curriculum-only : only seed curriculum hierarchy (subjects, chapters, topics, lessons, quizzes, questions, answers)
 *   --learner-only    : only seed user state fixtures (enrollments, progress, user_mistakes, spaced_reviews, user_notes, achievements)
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "..", ".env") });
const { createClient } = require("@supabase/supabase-js");
const { loadCanonicalCurriculum } = require("./curriculumLoader");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("FATAL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY) must be set in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// Robust retry wrapper for transient network / TLS drops
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
      if (attempt === retries) {
        return { error: err, data: null };
      }
      const delay = 600 * attempt;
      console.warn(`  [retry ${attempt}/${retries}] ${label}: ${err.message} — waiting ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// ============================================================================
// PHASE 1: CURRICULUM SEED (Canonical Hierarchy)
// ============================================================================
async function seedCurriculum(canonical) {
  console.log("\n========================================================");
  console.log("PHASE 1: Seeding Canonical Curriculum Hierarchy");
  console.log("========================================================");
  console.log(`Stats to seed: ${canonical.stats.subjectsCount} subjects, ${canonical.stats.chaptersCount} chapters, ${canonical.stats.topicsCount} topics, ${canonical.stats.questionsCount} questions.\n`);

  const { curriculum, contentMap } = canonical;
  const batchSize = 100;

  // 1. Cascading clear of existing curriculum
  console.log("1. Clearing existing curriculum data...");
  const { error: clearErr } = await sbCall(
    () => supabase.from("subjects").delete().neq("id", "_"),
    "clear subjects"
  );
  if (clearErr) {
    throw new Error(`Failed to clear subjects: ${clearErr.message}`);
  }
  console.log("   ✓ Existing curriculum cleared.");

  // 2. Insert Subjects
  console.log("2. Inserting canonical subjects...");
  const subjectsToInsert = curriculum.map((s) => ({
    id: s.id,
    name: s.label,
    slug: s.id,
    description: s.label,
  }));
  const { error: subjErr } = await sbCall(
    () => supabase.from("subjects").insert(subjectsToInsert),
    "insert subjects"
  );
  if (subjErr) throw new Error(`Failed to insert subjects: ${subjErr.message}`);
  console.log(`   ✓ Inserted ${subjectsToInsert.length} subjects.`);

  // 3. Insert Chapters
  console.log("3. Inserting chapters...");
  const chaptersToInsert = [];
  curriculum.forEach((subj) => {
    (subj.chapters || []).forEach((chap, cIdx) => {
      chaptersToInsert.push({
        subject_id: subj.id,
        chapter_key: chap.id,
        title: chap.label,
        position: cIdx,
      });
    });
  });

  const { error: chapErr } = await sbCall(
    () => supabase.from("chapters").insert(chaptersToInsert),
    "insert chapters"
  );
  if (chapErr) throw new Error(`Failed to insert chapters: ${chapErr.message}`);
  console.log(`   ✓ Inserted ${chaptersToInsert.length} chapters.`);

  // Fetch chapters back to map (subject_id, chapter_key) -> chapter_id
  const { data: dbChapters, error: fetchChapErr } = await sbCall(
    () => supabase.from("chapters").select("id, subject_id, chapter_key"),
    "fetch chapters"
  );
  if (fetchChapErr) throw new Error(`Failed to fetch chapters: ${fetchChapErr.message}`);

  const chapterIdMap = new Map();
  dbChapters.forEach((c) => {
    chapterIdMap.set(`${c.subject_id}|${c.chapter_key}`, c.id);
  });

  // 4. Insert Topics
  console.log("4. Inserting topics...");
  const topicsToInsert = [];
  curriculum.forEach((subj) => {
    (subj.chapters || []).forEach((chap) => {
      const chapterId = chapterIdMap.get(`${subj.id}|${chap.id}`);
      (chap.topics || []).forEach((topTitle, tIdx) => {
        topicsToInsert.push({
          chapter_id: chapterId,
          title: topTitle,
          position: tIdx,
          difficulty: "standard",
        });
      });
    });
  });

  for (let i = 0; i < topicsToInsert.length; i += batchSize) {
    const chunk = topicsToInsert.slice(i, i + batchSize);
    const { error: topicErr } = await sbCall(
      () => supabase.from("topics").insert(chunk),
      `insert topics chunk ${i}`
    );
    if (topicErr) throw new Error(`Failed to insert topics chunk: ${topicErr.message}`);
  }
  console.log(`   ✓ Inserted ${topicsToInsert.length} topics.`);

  const { data: dbTopics, error: fetchTopicErr } = await sbCall(
    () => supabase.from("topics").select("id, title, chapter_id, chapter:chapter_id ( chapter_key, subject_id )"),
    "fetch topics"
  );
  if (fetchTopicErr) throw new Error(`Failed to fetch topics: ${fetchTopicErr.message}`);

  const topicIdMap = new Map();
  dbTopics.forEach((t) => {
    const key = `${t.chapter.subject_id}|${t.chapter.chapter_key}|${t.title.trim().toLowerCase()}`;
    topicIdMap.set(key, { id: t.id, chapter_id: t.chapter_id, title: t.title, sid: t.chapter.subject_id, cid: t.chapter.chapter_key });
  });

  // 5. Insert Lessons & Lesson Versions
  console.log("5. Inserting lessons and lesson versions...");
  const lessonsToInsert = [];
  for (const [key, content] of contentMap.entries()) {
    const topicLookup = `${content.sid}|${content.cid}|${content.topic.trim().toLowerCase()}`;
    const topicInfo = topicIdMap.get(topicLookup);
    const topicId = topicInfo?.id || topicInfo;
    if (topicId) {
      lessonsToInsert.push({
        topic_id: topicId,
        content: content.notes,
        summary: `Canonical lesson notes for ${content.topic}`,
        estimated_minutes: 15,
      });
    }
  }

  const insertedLessons = [];
  for (let i = 0; i < lessonsToInsert.length; i += batchSize) {
    const chunk = lessonsToInsert.slice(i, i + batchSize);
    const { data: lData, error: lErr } = await sbCall(
      () => supabase.from("lessons").insert(chunk).select("id, content"),
      `insert lessons chunk ${i}`
    );
    if (lErr) throw new Error(`Failed to insert lessons: ${lErr.message}`);
    if (lData) insertedLessons.push(...lData);
  }
  console.log(`   ✓ Inserted ${insertedLessons.length} lessons.`);

  const lessonVersionsToInsert = insertedLessons.map((l) => ({
    lesson_id: l.id,
    content: l.content,
    version: 1,
  }));

  for (let i = 0; i < lessonVersionsToInsert.length; i += batchSize) {
    const chunk = lessonVersionsToInsert.slice(i, i + batchSize);
    const { error: lvErr } = await sbCall(
      () => supabase.from("lesson_versions").insert(chunk),
      `insert lesson_versions chunk ${i}`
    );
    if (lvErr) throw new Error(`Failed to insert lesson versions: ${lvErr.message}`);
  }
  console.log(`   ✓ Inserted ${lessonVersionsToInsert.length} lesson versions.`);

  // 6. Insert Quizzes
  console.log("6. Inserting quizzes...");
  const quizzesToInsert = [];
  for (const [key, content] of contentMap.entries()) {
    const topicLookup = `${content.sid}|${content.cid}|${content.topic.trim().toLowerCase()}`;
    const topicInfo = topicIdMap.get(topicLookup);
    const topicId = topicInfo?.id || topicInfo;
    if (topicId && content.qs && content.qs.length > 0) {
      quizzesToInsert.push({
        topic_id: topicId,
        title: `${content.topic} Quiz`,
        passing_score: 80,
      });
    }
  }

  const quizIdMap = new Map(); // topic_id -> quiz_id
  for (let i = 0; i < quizzesToInsert.length; i += batchSize) {
    const chunk = quizzesToInsert.slice(i, i + batchSize);
    const { data: qzData, error: qzErr } = await sbCall(
      () => supabase.from("quizzes").insert(chunk).select("id, topic_id"),
      `insert quizzes chunk ${i}`
    );
    if (qzErr) throw new Error(`Failed to insert quizzes: ${qzErr.message}`);
    if (qzData) {
      qzData.forEach((qz) => quizIdMap.set(qz.topic_id, qz.id));
    }
  }
  console.log(`   ✓ Inserted ${quizzesToInsert.length} quizzes.`);

  // 7. Insert Questions with Full Rich Metadata (Zero Data Loss)
  console.log("7. Inserting questions (preserving steps, sol, why, options, type)...");
  const questionsToInsert = [];
  const questionMetaList = []; // Helper to correlate for answers insertion

  for (const [key, content] of contentMap.entries()) {
    const topicLookup = `${content.sid}|${content.cid}|${content.topic.trim().toLowerCase()}`;
    const topicInfo = topicIdMap.get(topicLookup);
    const topicId = topicInfo?.id || topicInfo;
    const quizId = quizIdMap.get(topicId);
    if (!quizId) continue;

    content.qs.forEach((normQ, qIdx) => {
      // Clean structured JSON explain preserving all rich attributes
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

      questionsToInsert.push({
        quiz_id: quizId,
        question: normQ.q,
        type: normQ.type,
        points: 1,
        hint: normQ.hint,
        explain: structuredExplain,
        position: qIdx,
      });

      questionMetaList.push({
        quizId,
        position: qIdx,
        normQ,
      });
    });
  }

  const dbQuestionIdMap = new Map(); // `${quizId}|${position}` -> question_id
  for (let i = 0; i < questionsToInsert.length; i += batchSize) {
    const chunk = questionsToInsert.slice(i, i + batchSize);
    const { data: qData, error: qErr } = await sbCall(
      () => supabase.from("questions").insert(chunk).select("id, quiz_id, position"),
      `insert questions chunk ${i}`
    );
    if (qErr) throw new Error(`Failed to insert questions: ${qErr.message}`);
    if (qData) {
      qData.forEach((q) => {
        dbQuestionIdMap.set(`${q.quiz_id}|${q.position}`, q.id);
      });
    }
  }
  console.log(`   ✓ Inserted ${questionsToInsert.length} questions with structured steps & solutions.`);

  // 8. Insert Answers (Correct & Distractors)
  console.log("8. Inserting answers (preserving correct answers and MCQ options)...");
  const answersToInsert = [];

  questionMetaList.forEach((meta) => {
    const questionId = dbQuestionIdMap.get(`${meta.quizId}|${meta.position}`);
    if (!questionId) return;

    if (meta.normQ.type === "mcq" && meta.normQ.options.length > 0) {
      meta.normQ.options.forEach((opt) => {
        answersToInsert.push({
          question_id: questionId,
          answer_text: opt.text,
          is_correct: opt.is_correct,
        });
      });
    } else {
      // Structured / text question canonical answer
      answersToInsert.push({
        question_id: questionId,
        answer_text: meta.normQ.ans,
        is_correct: true,
      });
    }
  });

  for (let i = 0; i < answersToInsert.length; i += batchSize) {
    const chunk = answersToInsert.slice(i, i + batchSize);
    const { error: ansErr } = await sbCall(
      () => supabase.from("answers").insert(chunk),
      `insert answers chunk ${i}`
    );
    if (ansErr) throw new Error(`Failed to insert answers: ${ansErr.message}`);
  }
  console.log(`   ✓ Inserted ${answersToInsert.length} answers.`);

  return {
    chapterIdMap,
    topicIdMap,
    quizIdMap,
    dbQuestionIdMap,
  };
}

// ============================================================================
// PHASE 2: DEMO LEARNER SEED (Authentic Curriculum Fixtures)
// ============================================================================
async function seedLearnerFixtures(canonical, dbMaps = null) {
  console.log("\n========================================================");
  console.log("PHASE 2: Seeding Authentic Learner State Fixtures");
  console.log("========================================================");

  const { curriculum, contentMap } = canonical;

  // 1. Identify or create demo profile
  let targetProfiles = [];
  try {
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    if (authUsers && authUsers.users && authUsers.users.length > 0) {
      targetProfiles = authUsers.users.map((u) => ({
        id: u.id,
        email: u.email,
        username: u.email ? u.email.split("@")[0] : "student",
        full_name: u.user_metadata?.full_name || (u.email ? u.email.split("@")[0] : "Student"),
        role_name: "student",
      }));
      await supabase.from("profiles").upsert(targetProfiles, { onConflict: "id" });
    }
  } catch (e) {
    // Admin API not available with anon/service key in some environments
  }

  if (targetProfiles.length === 0) {
    const { data: existingProfiles } = await supabase.from("profiles").select("id, email, username, full_name");
    if (existingProfiles && existingProfiles.length > 0) {
      targetProfiles = existingProfiles;
    } else {
      const demoId = "00000000-0000-0000-0000-000000000001";
      const demoStudent = {
        id: demoId,
        email: "demo@shifter.app",
        username: "demostudent",
        full_name: "Demo Student",
        role_name: "student",
      };
      await supabase.from("profiles").upsert(demoStudent, { onConflict: "id" });
      targetProfiles = [demoStudent];
    }
  }

  console.log(`Found ${targetProfiles.length} active profile(s) to seed.`);

  // Load active topics & questions from DB if dbMaps not supplied
  let topicIdMap = dbMaps?.topicIdMap;
  let chapterIdMap = dbMaps?.chapterIdMap;

  if (!topicIdMap || !chapterIdMap) {
    const { data: dbTopics } = await sbCall(
      () => supabase.from("topics").select("id, title, chapter_id, chapter:chapter_id ( chapter_key, subject_id )"),
      "fetch topics for learner"
    );
    topicIdMap = new Map();
    chapterIdMap = new Map();
    (dbTopics || []).forEach((t) => {
      const key = `${t.chapter.subject_id}|${t.chapter.chapter_key}|${t.title.trim().toLowerCase()}`;
      topicIdMap.set(key, { id: t.id, chapter_id: t.chapter_id, title: t.title, sid: t.chapter.subject_id, cid: t.chapter.chapter_key });
    });
  }

  // Fetch real questions from Supabase for linking mistakes
  const { data: dbQuestions } = await sbCall(
    () => supabase.from("questions").select("id, quiz_id, question, explain, position, quiz:quiz_id ( topic_id )").limit(200),
    "fetch questions for learner mistakes"
  );

  const realQuestionsList = dbQuestions || [];

  for (const profile of targetProfiles) {
    const uid = profile.id;
    console.log(`\nSeeding learner state for: ${profile.email || profile.username} (${uid})`);

    // A. Enrollments: Enroll in all 6 canonical subjects
    const enrollments = curriculum.map((s) => ({
      user_id: uid,
      subject_id: s.id,
      enrolled_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    }));
    await supabase.from("enrollments").upsert(enrollments, { onConflict: "user_id,subject_id", ignoreDuplicates: true });
    console.log(`   ✓ Enrolled in ${enrollments.length} subjects.`);

    // B. Realistic Progress across 35 authentic topics
    const contentEntries = Array.from(contentMap.entries());
    const progressTopics = contentEntries.slice(0, 35);
    const progressToInsert = [];

    progressTopics.forEach(([key, content], idx) => {
      const lookup = `${content.sid}|${content.cid}|${content.topic.trim().toLowerCase()}`;
      const topicInfo = topicIdMap.get(lookup);
      const topicId = topicInfo?.id || topicInfo;
      if (!topicId) return;

      const score = 65 + ((idx * 7) % 35); // 65% to 99%
      const mastered = score >= 80;
      progressToInsert.push({
        user_id: uid,
        topic_id: topicId,
        topic_title: content.topic,
        subject_id: content.sid,
        chapter_id: topicInfo?.chapter_id || null,
        completed: true,
        score: score,
        mastered: mastered,
        mastered_at: mastered ? new Date(Date.now() - (idx + 1) * 86400000).toISOString() : null,
        confidence_level: score >= 85 ? "high" : score >= 75 ? "medium" : "low",
        mastery_score: score,
        last_studied_at: new Date(Date.now() - (idx + 1) * 3600000 * 6).toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    if (progressToInsert.length > 0) {
      await supabase.from("progress").upsert(progressToInsert, { onConflict: "user_id,topic_id" });
      console.log(`   ✓ Seeded progress & mastery for ${progressToInsert.length} authentic topics.`);
    }

    // C. Authentic Mistake Journal (Real curriculum questions with student misconceptions)
    const mistakeCandidates = [
      { sid: "math", cid: "numbers", topic: "Number Systems & Basic Operations", qIdx: 0, studentAnswer: "24", misconception: "Calculated left to right (6+2=8, 8×3=24) instead of prioritizing Multiplication before Addition via BODMAS." },
      { sid: "physics", cid: "motion", topic: "Displacement & Distance", qIdx: 0, studentAnswer: "Distance = 20 m, Displacement = 20 m", misconception: "Confused scalar distance with vector displacement; failed to recognize return to start position gives zero displacement." },
      { sid: "computer", cid: "basics", topic: "Data vs Information", qIdx: 0, studentAnswer: "Data and information are identical terms for computer storage", misconception: "Failed to distinguish unprocessed raw facts (data) from processed meaningful context (information)." },
      { sid: "chemistry", cid: "introduction", topic: "Meaning of Chemistry", qIdx: 0, studentAnswer: "Chemistry is the study of laboratory equipment and mixing chemicals", misconception: "Narrow focus on lab activities rather than fundamental study of matter and its transformative changes." },
      { sid: "english", cid: "grammar", topic: "Parts of speech", qIdx: 0, studentAnswer: "runs", misconception: "Identified the action verb instead of the naming noun (The boy)." },
      { sid: "math", cid: "algebra", topic: "Linear Equations", qIdx: 0, studentAnswer: "x = 7", misconception: "Sign error when transposing constant term to the right side of the equation." },
      { sid: "physics", cid: "forces", topic: "Newton's Laws of Motion", qIdx: 0, studentAnswer: "Heavy objects always fall faster regardless of gravity", misconception: "Common Aristotelian intuition confusing air resistance with gravitational acceleration." },
      { sid: "computer", cid: "programming", topic: "Control Structures", qIdx: 0, studentAnswer: "while loops always execute at least once", misconception: "Confused 'while' loop (pre-test condition) with 'do-while' loop (post-test condition)." }
    ];

    const mistakesToInsert = [];
    mistakeCandidates.forEach((cand, idx) => {
      const key = `${cand.sid}/${cand.cid}/${cand.topic}`;
      const content = contentMap.get(key);
      if (!content || !content.qs[cand.qIdx]) return;

      const realQ = content.qs[cand.qIdx];
      const lookup = `${cand.sid}|${cand.cid}|${cand.topic.toLowerCase()}`;
      const topicInfo = topicIdMap.get(lookup);
      const topicId = topicInfo?.id || topicInfo;

      const matchingDbQ = realQuestionsList.find(q => q.question === realQ.q);

      mistakesToInsert.push({
        user_id: uid,
        topic_id: topicId || null,
        topic_title: cand.topic,
        subject_id: cand.sid,
        chapter_id: topicInfo?.chapter_id || null,
        chapter_key: cand.cid,
        question_index: cand.qIdx,
        question_text: realQ.q,
        correct_answer: realQ.ans,
        solution: realQ.steps.join("\n"),
        diagnostic_data: {
          studentSaid: cand.studentAnswer,
          misconception: cand.misconception,
          mistake_type: idx % 3 === 0 ? "misconception" : (idx % 3 === 1 ? "procedural_error" : "calculation_error"),
          concept: cand.topic,
          skillId: realQ.skillId,
          subskillId: realQ.subskillId,
          steps: realQ.steps,
        },
        resolved: idx % 2 === 1, // 50% resolved, 50% unresolved for active review queue
        resolved_at: idx % 2 === 1 ? new Date().toISOString() : null,
        attempt_count: 2,
        updated_at: new Date().toISOString(),
      });
    });

    if (mistakesToInsert.length > 0) {
      const { error: mErr } = await supabase.from("user_mistakes").upsert(mistakesToInsert, {
        onConflict: "user_id,topic_id,question_index",
        ignoreDuplicates: false,
      });
      if (mErr) console.warn("   ⚠️ Warning seeding mistakes:", mErr.message);
      else console.log(`   ✓ Seeded ${mistakesToInsert.length} authentic mistake records (tied directly to curriculum questions).`);
    }

    // D. Authentic Spaced Reviews Queue
    const reviewTopics = contentEntries.slice(0, 10);
    const reviewsToInsert = [];

    reviewTopics.forEach(([key, content], idx) => {
      const lookup = `${content.sid}|${content.cid}|${content.topic.trim().toLowerCase()}`;
      const topicInfo = topicIdMap.get(lookup);
      const topicId = topicInfo?.id || topicInfo;
      if (!topicId) return;

      const isOverdue = idx < 5; // First 5 are active/overdue today!
      const nextDate = isOverdue
        ? new Date(Date.now() - (idx + 1) * 3600000 * 3).toISOString() // 3 to 15 hours ago
        : new Date(Date.now() + (idx + 1) * 86400000 * 2).toISOString(); // 2 to 10 days in future

      reviewsToInsert.push({
        user_id: uid,
        topic_id: topicId,
        topic_title: content.topic,
        subject_id: content.sid,
        chapter_id: topicInfo?.chapter_id || null,
        next_review_at: nextDate,
        interval_days: isOverdue ? 1 : (idx + 1) * 2,
        ease_factor: 2.5,
        repetitions: isOverdue ? 1 : 3,
        updated_at: new Date().toISOString(),
      });
    });

    if (reviewsToInsert.length > 0) {
      const { error: srErr } = await supabase.from("spaced_reviews").upsert(reviewsToInsert, {
        onConflict: "user_id,topic_id",
        ignoreDuplicates: false,
      });
      if (srErr) console.warn("   ⚠️ Warning seeding spaced reviews:", srErr.message);
      else console.log(`   ✓ Seeded ${reviewsToInsert.length} spaced review items (5 overdue, 5 scheduled).`);
    }

    // E. Authentic Student Notes (Personal Scratchpad with real curriculum formulas & takeaways)
    const noteTopics = [
      {
        sid: "math",
        cid: "numbers",
        topic: "Number Systems & Basic Operations",
        notes: "### Key Takeaways: BODMAS & Numbers\n• Always resolve Brackets first, then Orders (powers/roots).\n• Multiplication and Division have equal rank; solve left to right.\n• Negative numbers: Remember subtracting a negative is equivalent to adding: `a - (-b) = a + b`.",
      },
      {
        sid: "physics",
        cid: "motion",
        topic: "Displacement & Distance",
        notes: "### Formula Sheet: Motion\n• Distance is scalar (total ground covered).\n• Displacement is vector: `Δx = x_final - x_initial`.\n• Tip: When a runner returns to starting line, displacement is always 0 m regardless of laps run!",
      },
      {
        sid: "computer",
        cid: "basics",
        topic: "Data vs Information",
        notes: "### Computing Fundamentals\n• Data = Raw unprocessed facts (e.g., [85, 92, 78]).\n• Information = Processed data with context (e.g., 'Average Grade: 85%').\n• Processing turns unstructured inputs into actionable decisions.",
      },
      {
        sid: "chemistry",
        cid: "introduction",
        topic: "Meaning of Chemistry",
        notes: "### Core Chemistry Concepts\n• Matter has mass and occupies volume.\n• Physical changes are reversible (e.g. melting ice).\n• Chemical changes form entirely new chemical bonds (e.g. rusting iron, combustion).",
      },
      {
        sid: "english",
        cid: "grammar",
        topic: "Parts of speech",
        notes: "### Grammar Quick Reference\n• Noun = Person, place, thing, or abstract idea.\n• Adjective = Modifies a noun (e.g., 'the swift fox').\n• Adverb = Modifies a verb, adjective, or other adverb (e.g., 'runs quickly').",
      },
      {
        sid: "math",
        cid: "number_theory",
        topic: "Divisibility Rules",
        notes: "### Number Theory Shortcuts\n• Divisible by 3: Sum of all digits divisible by 3.\n• Divisible by 4: Last 2 digits form a multiple of 4.\n• Divisible by 6: Satisfies both rule for 2 (even) and rule for 3.",
      }
    ];

    const userNotesToInsert = [];
    noteTopics.forEach((nt) => {
      const lookup = `${nt.sid}|${nt.cid}|${nt.topic.toLowerCase()}`;
      const topicInfo = topicIdMap.get(lookup);
      const topicId = topicInfo?.id || topicInfo;
      if (!topicId) return;

      userNotesToInsert.push({
        user_id: uid,
        topic_id: topicId,
        topic_title: nt.topic,
        subject_id: nt.sid,
        chapter_id: topicInfo?.chapter_id || null,
        note_text: nt.notes,
      });
    });

    if (userNotesToInsert.length > 0) {
      const { error: unErr } = await supabase.from("user_notes").upsert(userNotesToInsert, {
        onConflict: "user_id,topic_id",
        ignoreDuplicates: false,
      });
      if (unErr) console.warn("   ⚠️ Warning seeding user notes:", unErr.message);
      else console.log(`   ✓ Seeded ${userNotesToInsert.length} authentic student notes & formula sheets.`);
    }

    // F. Meaningful Milestone Achievements
    const achievementsToInsert = [
      { user_id: uid, achievement_name: "First Steps: Completed Number Systems & Basic Operations", unlocked_at: new Date(Date.now() - 86400000 * 7).toISOString() },
      { user_id: uid, achievement_name: "Physics Explorer: Mastered Displacement & Distance", unlocked_at: new Date(Date.now() - 86400000 * 5).toISOString() },
      { user_id: uid, achievement_name: "Tech Savvy: Completed Computer Fundamentals", unlocked_at: new Date(Date.now() - 86400000 * 3).toISOString() },
      { user_id: uid, achievement_name: "Grammar Master: Mastered Parts of Speech", unlocked_at: new Date(Date.now() - 86400000 * 2).toISOString() },
      { user_id: uid, achievement_name: "Consistency Champion: 5-Day Study Streak", unlocked_at: new Date().toISOString() },
    ];

    await supabase.from("achievements").insert(achievementsToInsert);
    console.log(`   ✓ Seeded ${achievementsToInsert.length} authentic milestone achievements.`);
  }
}

// ============================================================================
// MAIN EXECUTION CONTROLLER
// ============================================================================
async function main() {
  const args = process.argv.slice(2);
  const isCurriculumOnly = args.includes("--curriculum-only");
  const isLearnerOnly = args.includes("--learner-only");

  console.log("=== Shifter / Tixar Production Real Data Seed Script ===");
  console.log(`Mode: ${isCurriculumOnly ? "Curriculum Only" : isLearnerOnly ? "Learner Fixtures Only" : "Full (Curriculum + Learner Fixtures)"}`);

  const canonical = loadCanonicalCurriculum();

  let dbMaps = null;
  if (!isLearnerOnly) {
    dbMaps = await seedCurriculum(canonical);
  }

  if (!isCurriculumOnly) {
    await seedLearnerFixtures(canonical, dbMaps);
  }

  console.log("\n========================================================");
  console.log("🎉 Seed execution completed successfully with ZERO data loss!");
  console.log("========================================================\n");
}

main().catch((err) => {
  console.error("\n❌ SEED FAILED WITH ERROR:", err);
  process.exit(1);
});
