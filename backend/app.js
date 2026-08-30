const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const logger = require('./logger');

const app = express();
// Configure CORS using an allowlist from `ALLOWED_ORIGINS` env (comma-separated).
const allowedEnv = (process.env.ALLOWED_ORIGINS || "")
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    // Automatically allow local origins in development mode
    if (process.env.NODE_ENV !== "production") {
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin === "http://localhost" ||
        origin === "http://127.0.0.1"
      ) {
        return callback(null, true);
      }
    }
    if (allowedEnv.length === 0) return callback(null, true);
    if (
      allowedEnv.includes(origin) ||
      allowedEnv.some((a) => origin.endsWith(a)) ||
      origin.endsWith(".vercel.app") ||
      origin === "https://shifter-iota.vercel.app"
    )
      return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Structured logging middleware
app.use(logger.middleware());

// Content Security Policy to allow blob workers (for PDF rendering or other workers)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:;",
  );
  next();
});

// Helper to normalize question objects from different schemas
function normalizeQ(q) {
  if (!q) return q;
  const qStr =
    q.q ||
    q.Question ||
    q.question ||
    q.Q1 ||
    q.Q ||
    "Explain the core concept of this topic.";
  const ansStr =
    q.ans ||
    q.Answer ||
    q.answer ||
    q.A1 ||
    q.A ||
    q.a ||
    "Understanding of the concept.";
  const hintStr = q.hint || q.Hint || q.HINT || "Review the notes above.";
  const whyStr =
    q.why ||
    q.Reason ||
    q.mark ||
    q.reason ||
    q.Explanation ||
    q.explain ||
    q.explanation ||
    "Demonstrate clear step-by-step reasoning.";
  let solStr = q.sol || q.Solution || q.soln;
  if (!solStr && q.steps) solStr = q.steps.join("\n");
  if (!solStr) solStr = ansStr;

  return {
    q: qStr,
    hint: hintStr,
    ans: ansStr,
    why: whyStr,
    mark: whyStr,
    sol: solStr,
    steps: q.steps || null,
    type: q.type || null,
  };
}

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  logger.error(
    "INITIALIZATION",
    new Error(
      "SUPABASE_URL or SUPABASE_KEY/SUPABASE_SERVICE_ROLE_KEY not defined",
    ),
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

logger.debug("SUPABASE_INIT", { supabaseUrl });

// Endpoint: Ping
app.get("/api/ping", (req, res) => {
  logger.action("PING");
  res.send("pong");
});

// Health check for platform providers (Render, Heroku, etc.)
app.get("/health", (req, res) => {
  logger.action("HEALTH_CHECK");
  res.json({ ok: true });
});

// Endpoint: Receive logs from frontend
app.post("/api/logs", (req, res) => {
  const { logs } = req.body || {};
  if (Array.isArray(logs)) {
    logs.forEach((log) => {
      logger.debug("FRONTEND_LOG", {
        ...log,
        source: "frontend",
      });
    });
  }
  res.status(204).send(); // No content response
});

// Endpoint: Get Curriculum Structure
app.get("/api/curriculum", async (req, res) => {
  try {
    const { data, error } = await supabase.from("subjects").select(`
        id,
        label:name,
        chapters (
          id:chapter_key,
          label:title,
          position,
          topics (
            title,
            position
          )
        )
      `);
    if (error) {
      logger.db("SELECT", "subjects", "error", {
        error: error.message,
      });
      return res
        .status(500)
        .json({ error: "Database query failed fetching curriculum" });
    }
    logger.db("SELECT", "subjects", "success", {
      affectedRows: (data || []).length,
    });
    const formatted = (data || []).map((subj) => {
      const sortedChapters = (subj.chapters || []).sort(
        (a, b) => a.position - b.position,
      );
      return {
        id: subj.id,
        icon: "",
        label: subj.label,
        chapters: sortedChapters.map((chap) => {
          const sortedTopics = (chap.topics || []).sort(
            (a, b) => a.position - b.position,
          );
          return {
            id: chap.id,
            label: chap.label,
            topics: sortedTopics.map((t) => t.title),
          };
        }),
      };
    });
    logger.action("CURRICULUM_LOADED", "success", {
      subjectCount: formatted.length,
    });
    res.json(formatted);
  } catch (err) {
    logger.error("CURRICULUM_LOAD", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Get Content (Notes + Questions without answers)
app.get("/api/content/:sid/:cid/:topic", async (req, res) => {
  const { sid, cid, topic } = req.params;
  try {
    const { data: contentRow, error: contentErr } = await supabase
      .from("content_view")
      .select("topic_id, notes")
      .eq("sid", sid)
      .eq("cid", cid)
      .eq("topic", topic)
      .maybeSingle();
    if (contentErr) {
      logger.db("SELECT", "content_view", "error", {
        subject: sid,
        chapter: cid,
        topic,
        error: contentErr.message,
      });
      return res
        .status(500)
        .json({ error: "Database query failed fetching content" });
    }
    if (!contentRow) {
      logger.action("CONTENT_NOT_FOUND", "failed", {
        subject: sid,
        chapter: cid,
        topic,
      });
      return res.status(404).json({ error: "Content not found" });
    }
    logger.db("SELECT", "content_view", "success", {
      subject: sid,
      chapter: cid,
      topic,
    });
    // Fetch quizzes, questions, and answers for this topic
    const { data: quizData, error: quizErr } = await supabase
      .from("quizzes")
      .select(
        `
        id,
        questions (
          id,
          question,
          hint,
          explain,
          position,
          concept_tag,
          difficulty,
          answers (
            answer_text,
            is_correct
          )
        )
      `,
      )
      .eq("topic_id", contentRow.topic_id)
      .maybeSingle();
    if (quizErr) {
      logger.db("SELECT", "quizzes", "error", {
        topicId: contentRow.topic_id,
        error: quizErr.message,
      });
      return res
        .status(500)
        .json({ error: "Database query failed fetching quiz questions" });
    }
    logger.db("SELECT", "quizzes", "success", {
      topicId: contentRow.topic_id,
      questionCount: (quizData?.questions || []).length,
    });
    const qs = [];
    if (quizData && quizData.questions) {
      const sortedQuestions = quizData.questions.sort(
        (a, b) => a.position - b.position,
      );
      sortedQuestions.forEach((qObj) => {
        const correctAnswers = (qObj.answers || [])
          .filter((a) => a.is_correct)
          .map((a) => a.answer_text);
        qs.push({
          q: qObj.question,
          hint: qObj.hint || "",
          ans: correctAnswers.length === 1 ? correctAnswers[0] : correctAnswers,
          explain: qObj.explain || "",
          why: qObj.explain || "",
          concept_tag: qObj.concept_tag || "",
          difficulty: qObj.difficulty || "",
        });
      });
    }
    res.json({
      notes: contentRow.notes || "",
      qs,
    });
  } catch (err) {
    logger.error("CONTENT_LOAD", err, { subject: sid, chapter: cid, topic });
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Grade Answer
app.post("/api/grade", async (req, res) => {
  const { sid, cid, topic, qId, answer } = req.body || {};
  try {
    const { data: contentRow, error: contentErr } = await supabase
      .from("content_view")
      .select("topic_id")
      .eq("sid", sid)
      .eq("cid", cid)
      .eq("topic", topic)
      .maybeSingle();
    if (contentErr) {
      logger.db("SELECT", "content_view", "error", {
        operation: "grade",
        error: contentErr.message,
      });
      return res
        .status(500)
        .json({ error: "Database query failed grading answer" });
    }
    if (!contentRow) {
      logger.action("GRADE_ANSWER", "failed", { reason: "content_not_found" });
      return res.status(404).json({ error: "Content not found" });
    }
    const { data: quizData, error: quizErr } = await supabase
      .from("quizzes")
      .select(
        `
        id,
        questions (
          id,
          question,
          hint,
          explain,
          position,
          answers (
            answer_text,
            is_correct
          )
        )
      `,
      )
      .eq("topic_id", contentRow.topic_id)
      .maybeSingle();
    if (quizErr) {
      logger.db("SELECT", "quizzes", "error", {
        operation: "grade",
        topicId: contentRow.topic_id,
        error: quizErr.message,
      });
      return res.status(500).json({
        error: "Database query failed fetching quiz questions for grading",
      });
    }
    if (!quizData || !quizData.questions) {
      return res.status(404).json({ error: "Questions not found" });
    }
    const sortedQuestions = quizData.questions.sort(
      (a, b) => a.position - b.position,
    );
    if (!sortedQuestions[qId]) {
      return res.status(404).json({ error: "Question index not found" });
    }
    const questionObj = sortedQuestions[qId];
    const correctAnswers = (questionObj.answers || [])
      .filter((a) => a.is_correct)
      .map((a) => a.answer_text);
    const question = {
      q: questionObj.question,
      hint: questionObj.hint || "",
      ans: correctAnswers.length === 1 ? correctAnswers[0] : correctAnswers,
      why: questionObj.explain || "Demonstrate clear step-by-step reasoning.",
      sol: questionObj.explain || "Demonstrate clear step-by-step reasoning.",
      mark: questionObj.explain || "Demonstrate clear step-by-step reasoning.",
    };
    const correctAnswer = question.ans;
    const normalize = (s) =>
      String(s || "")
        .toLowerCase()
        .replace(/[\u2018\u2019\u201C\u201D]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    const tokenize = (s) => normalize(s).split(" ").filter(Boolean);
    const uAns = normalize(answer);
    let isCorrect = false;
    let mainCorrectAnswerStr = "";
    if (Array.isArray(correctAnswer)) {
      mainCorrectAnswerStr = correctAnswer[0] || "";
      isCorrect = correctAnswer.some((variant) => {
        const cAns = normalize(variant);
        if (uAns === cAns) return true;
        if (uAns.includes(cAns) || cAns.includes(uAns)) return true;
        if (uAns.length > 3 && cAns.length > 0) {
          const answerTokens = tokenize(uAns);
          const correctTokens = tokenize(cAns);
          const keywords = correctTokens.filter((w) => w.length > 3);
          const matchedKeywords = keywords.filter((w) =>
            answerTokens.includes(w),
          );
          const matchedCount = matchedKeywords.length;
          const keywordRatio = keywords.length ? matchedCount / keywords.length : 0;
          const overlapRatio = correctTokens.length
            ? matchedCount / Math.max(correctTokens.length, answerTokens.length)
            : 0;
          if (keywords.length > 0 && (keywordRatio >= 0.5 || overlapRatio >= 0.45)) {
            return true;
          }
          const commonPhrases = [
            cAns,
            ...correctTokens
              .slice(0, 3)
              .map((_, i) => correctTokens.slice(i, i + 3).join(" ")),
          ].filter(Boolean);
          if (commonPhrases.some((phrase) => phrase && uAns.includes(phrase))) {
            return true;
          }
        }
        return false;
      });
    } else {
      mainCorrectAnswerStr = correctAnswer;
      const cAns = normalize(correctAnswer);
      isCorrect = uAns === cAns;
      if (!isCorrect && (uAns.includes(cAns) || cAns.includes(uAns))) {
        isCorrect = true;
      }
      if (!isCorrect && uAns.length > 3 && cAns.length > 0) {
        const answerTokens = tokenize(uAns);
        const correctTokens = tokenize(cAns);
        const keywords = correctTokens.filter((w) => w.length > 3);
        const matchedKeywords = keywords.filter((w) => answerTokens.includes(w));
        const matchedCount = matchedKeywords.length;
        const keywordRatio = keywords.length ? matchedCount / keywords.length : 0;
        const overlapRatio = correctTokens.length
          ? matchedCount / Math.max(correctTokens.length, answerTokens.length)
          : 0;
        if (keywords.length > 0 && (keywordRatio >= 0.5 || overlapRatio >= 0.45)) {
          isCorrect = true;
        }
        const commonPhrases = [
          cAns,
          ...correctTokens
            .slice(0, 3)
            .map((_, i) => correctTokens.slice(i, i + 3).join(" ")),
        ].filter(Boolean);
        if (!isCorrect && commonPhrases.some((phrase) => phrase && uAns.includes(phrase))) {
          isCorrect = true;
        }
      }
    }
    logger.action("GRADE_ANSWER", "success", {
      isCorrect,
      questionIndex: qId,
    });
    res.json({
      isCorrect,
      correctAnswer: mainCorrectAnswerStr,
      solution: question.sol || question.why,
      mark: question.mark,
    });
  } catch (err) {
    logger.error("GRADE_ANSWER", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Batch insert learning events for analytics
app.post("/api/analytics/events", async (req, res) => {
  const { events } = req.body || {};
  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: "events array is required" });
  }
  try {
    const authUserId = await resolveUserId(req);
    const rowsToInsert = [];
    for (const evt of events) {
      const { sid, cid, topic, event_type, user_id } = evt;
      if (!sid || !cid || !topic || !event_type) continue;

      // Strict User Resolution: Require resolved auth token user_id or provided payload user_id
      const targetUserId = authUserId || user_id || null;
      if (!targetUserId) continue; // Skip unauthenticated anonymous events to prevent global data contamination

      const { data: contentRow, error: contentErr } = await supabase
        .from("content_view")
        .select("topic_id")
        .eq("sid", sid)
        .eq("cid", cid)
        .eq("topic", topic)
        .maybeSingle();
      if (contentErr || !contentRow) continue;
      rowsToInsert.push({
        topic_id: contentRow.topic_id,
        event_type,
        user_id: targetUserId,
      });
    }
    if (rowsToInsert.length === 0) {
      return res.json({ inserted: 0 });
    }
    const batchSize = 100;
    let totalInserted = 0;
    for (let i = 0; i < rowsToInsert.length; i += batchSize) {
      const chunk = rowsToInsert.slice(i, i + batchSize);
      const { error: insertErr } = await supabase
        .from("learning_events")
        .insert(chunk);
      if (insertErr) {
        logger.db("INSERT", "learning_events", "error", {
          error: insertErr.message,
        });
        continue;
      }
      totalInserted += chunk.length;
    }
    logger.action("ANALYTICS_EVENTS_SYNCED", "success", {
      receivedCount: events.length,
      insertedCount: totalInserted,
      userId: authUserId,
    });
    res.json({ inserted: totalInserted });
  } catch (err) {
    logger.error("ANALYTICS_EVENTS_SYNC", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Get aggregated analytics for the current user
app.get("/api/analytics", async (req, res) => {
  try {
    const userId = await resolveUserId(req);

    if (!userId) {
      return res.json({ mostVisited: [], mostPassed: [], mostFailed: [], unvisited: [] });
    }

    // Fetch full topics list from content_view
    const { data: allTopics, error: topicErr } = await supabase
      .from("content_view")
      .select("topic_id, sid, cid, topic");

    if (topicErr) {
      logger.db("SELECT", "content_view", "error", { error: topicErr.message });
      return res.status(500).json({ error: "Database query failed fetching topics for analytics" });
    }

    const topicMap = new Map();
    const titleMap = new Map();

    (allTopics || []).forEach((t) => {
      const topicObj = {
        topic_id: t.topic_id,
        topic_title: t.topic,
        chapter_title: t.cid,
        subject_name: t.sid,
        subject_id: t.sid,
        chapter_id: t.cid,
        visit_count: 0,
        pass_count: 0,
        fail_count: 0,
      };
      if (t.topic_id != null) topicMap.set(t.topic_id, topicObj);
      if (t.topic) titleMap.set(t.topic.toLowerCase().trim(), topicObj);
    });

    const getTopicItem = (id, title) => {
      if (id != null && topicMap.has(id)) return topicMap.get(id);
      if (title && titleMap.has(title.toLowerCase().trim())) return titleMap.get(title.toLowerCase().trim());
      return null;
    };

    // 1. User-specific learning events
    const { data: events } = await supabase
      .from("learning_events")
      .select("topic_id, event_type")
      .eq("user_id", userId);

    if (events) {
      events.forEach((e) => {
        const item = getTopicItem(e.topic_id, null);
        if (item) {
          if (e.event_type === "visit") item.visit_count += 1;
          if (e.event_type === "pass") item.pass_count += 1;
          if (e.event_type === "fail") item.fail_count += 1;
        }
      });
    }

    // 2. User-specific progress
    const { data: progressRows } = await supabase
      .from("progress")
      .select("topic_id, topic_title, completed, score")
      .eq("user_id", userId);

    if (progressRows) {
      progressRows.forEach((p) => {
        const item = getTopicItem(p.topic_id, p.topic_title);
        if (item) {
          if (p.completed && item.pass_count === 0) {
            item.pass_count = 1;
          }
          if (p.score != null && p.score < 50 && item.fail_count === 0) {
            item.fail_count = 1;
          }
        }
      });
    }

    const rows = Array.from(topicMap.values());

    const mostVisited = [...rows].filter((r) => r.visit_count > 0).sort((a, b) => b.visit_count - a.visit_count).slice(0, 10);
    const mostPassed = [...rows].filter((r) => r.pass_count > 0).sort((a, b) => b.pass_count - a.pass_count).slice(0, 10);
    const mostFailed = [...rows].filter((r) => r.fail_count > 0).sort((a, b) => b.fail_count - a.fail_count).slice(0, 10);
    const unvisited = rows.filter((r) => r.visit_count === 0 && r.pass_count === 0);

    logger.action("ANALYTICS_FETCHED", "success", {
      userId,
      totalTopics: rows.length,
      visitedCount: mostVisited.length,
      unvisitedCount: unvisited.length,
    });

    res.json({ mostVisited, mostPassed, mostFailed, unvisited });
  } catch (err) {
    logger.error("ANALYTICS_FETCH", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fix: Map /logs to /api/logs so frontend logger doesn't 404
app.post("/logs", (req, res) => {
  const { logs } = req.body || {};
  if (Array.isArray(logs)) {
    logs.forEach((log) => {
      logger.debug("FRONTEND_LOG", {
        ...log,
        source: "frontend",
      });
    });
  }
  res.status(204).send();
});

// ─────────────────────────────────────────────────────────────
// LEARNING FEATURE SYNC ENDPOINTS
// ─────────────────────────────────────────────────────────────

/**
 * Helper: resolve a topic_id from (subject_id, chapter_key, topic_title)
 * Returns null if not found.
 */
async function resolveTopicId(sid, cid, topicTitle) {
  const { data, error } = await supabase
    .from("content_view")
    .select("topic_id")
    .eq("sid", sid)
    .eq("cid", cid)
    .eq("topic", topicTitle)
    .limit(1);
  if (error || !data || data.length === 0) return null;
  return data[0].topic_id;
}

/**
 * Helper: resolve user_id from Authorization Bearer token.
 * Returns null if unauthenticated or token invalid.
 */
async function resolveUserId(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user.id;
}
const getUserId = resolveUserId;

// ── MISTAKES ─────────────────────────────────────────────────

// POST /api/mistakes — save or update a missed question
app.post("/api/mistakes", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { sid, cid, topicTitle, questionIndex, questionText, correctAnswer, solution } = req.body || {};
    if (!sid || !cid || !topicTitle || questionIndex == null) {
      return res.status(400).json({ error: "sid, cid, topicTitle, questionIndex are required" });
    }

    const topicId = await resolveTopicId(sid, cid, topicTitle);
    if (!topicId) return res.status(404).json({ error: "Topic not found" });

    const { error } = await supabase
      .from("user_mistakes")
      .upsert({
        user_id: userId,
        topic_id: topicId,
        subject_id: sid,
        chapter_key: cid,
        question_index: questionIndex,
        question_text: questionText || "",
        correct_answer: correctAnswer || "",
        solution: solution || "",
        resolved: false,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,topic_id,question_index", ignoreDuplicates: false });

    if (error) {
      logger.db("UPSERT", "user_mistakes", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to save mistake" });
    }

    logger.action("MISTAKE_SAVED", "success", { userId, topicId, questionIndex });
    res.json({ ok: true });
  } catch (err) {
    logger.error("MISTAKE_SAVE", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/mistakes/resolve — mark a mistake as resolved
app.patch("/api/mistakes/resolve", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { sid, cid, topicTitle, questionIndex } = req.body || {};
    if (!sid || !cid || !topicTitle || questionIndex == null) {
      return res.status(400).json({ error: "sid, cid, topicTitle, questionIndex are required" });
    }

    const topicId = await resolveTopicId(sid, cid, topicTitle);
    if (!topicId) return res.status(404).json({ error: "Topic not found" });

    const { error } = await supabase
      .from("user_mistakes")
      .update({ resolved: true, resolved_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("topic_id", topicId)
      .eq("question_index", questionIndex);

    if (error) {
      logger.db("UPDATE", "user_mistakes", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to resolve mistake" });
    }

    logger.action("MISTAKE_RESOLVED", "success", { userId, topicId, questionIndex });
    res.json({ ok: true });
  } catch (err) {
    logger.error("MISTAKE_RESOLVE", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/mistakes — fetch all unresolved mistakes for the user
app.get("/api/mistakes", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { data, error } = await supabase
      .from("user_mistakes")
      .select(`
        id, topic_id, subject_id, chapter_key, question_index,
        question_text, correct_answer, solution,
        resolved, attempt_count, created_at, updated_at,
        topics ( title )
      `)
      .eq("user_id", userId)
      .eq("resolved", false)
      .order("updated_at", { ascending: false });

    if (error) {
      logger.db("SELECT", "user_mistakes", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to fetch mistakes" });
    }

    res.json(data || []);
  } catch (err) {
    logger.error("MISTAKES_FETCH", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── SPACED REVIEWS ────────────────────────────────────────────

// POST /api/spaced-reviews — upsert a review schedule
app.post("/api/spaced-reviews", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { sid, cid, topicTitle, nextReviewAt, intervalDays, easeFactor, repetitions } = req.body || {};
    if (!sid || !cid || !topicTitle || !nextReviewAt) {
      return res.status(400).json({ error: "sid, cid, topicTitle, nextReviewAt are required" });
    }

    const topicId = await resolveTopicId(sid, cid, topicTitle);
    if (!topicId) return res.status(404).json({ error: "Topic not found" });

    const { error } = await supabase
      .from("spaced_reviews")
      .upsert({
        user_id: userId,
        topic_id: topicId,
        next_review_at: nextReviewAt,
        interval_days: intervalDays || 1,
        ease_factor: easeFactor || 2.5,
        repetitions: repetitions || 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,topic_id", ignoreDuplicates: false });

    if (error) {
      logger.db("UPSERT", "spaced_reviews", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to save spaced review" });
    }

    logger.action("SPACED_REVIEW_SAVED", "success", { userId, topicId });
    res.json({ ok: true });
  } catch (err) {
    logger.error("SPACED_REVIEW_SAVE", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/spaced-reviews — fetch due reviews for the user
app.get("/api/spaced-reviews", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { data, error } = await supabase
      .from("user_review_queue")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      logger.db("SELECT", "user_review_queue", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to fetch review queue" });
    }

    res.json(data || []);
  } catch (err) {
    logger.error("SPACED_REVIEWS_FETCH", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── USER NOTES ────────────────────────────────────────────────

// POST /api/notes — save personal synthesis note
app.post("/api/notes", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { sid, cid, topicTitle, noteText } = req.body || {};
    if (!sid || !cid || !topicTitle) {
      return res.status(400).json({ error: "sid, cid, topicTitle are required" });
    }

    const topicId = await resolveTopicId(sid, cid, topicTitle);
    if (!topicId) return res.status(404).json({ error: "Topic not found" });

    const { error } = await supabase
      .from("user_notes")
      .upsert({
        user_id: userId,
        topic_id: topicId,
        note_text: noteText || "",
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,topic_id", ignoreDuplicates: false });

    if (error) {
      logger.db("UPSERT", "user_notes", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to save note" });
    }

    res.json({ ok: true });
  } catch (err) {
    logger.error("NOTE_SAVE", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/notes/:sid/:cid/:topicTitle — fetch note for a topic
app.get("/api/notes/:sid/:cid/:topicTitle", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ note_text: "" });

    const { sid, cid, topicTitle } = req.params;
    const topicId = await resolveTopicId(sid, cid, decodeURIComponent(topicTitle));
    if (!topicId) return res.json({ note_text: "" });

    const { data, error } = await supabase
      .from("user_notes")
      .select("note_text, updated_at")
      .eq("user_id", userId)
      .eq("topic_id", topicId)
      .maybeSingle();

    if (error) {
      logger.db("SELECT", "user_notes", "error", { error: error.message });
      return res.json({ note_text: "" });
    }

    res.json({ note_text: data?.note_text || "", updated_at: data?.updated_at });
  } catch (err) {
    logger.error("NOTE_FETCH", err);
    res.json({ note_text: "" });
  }
});

// ── ENROLLMENTS ───────────────────────────────────────────────

// POST /api/enroll — enroll user in a subject
app.post("/api/enroll", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { subjectId } = req.body || {};
    if (!subjectId) return res.status(400).json({ error: "subjectId is required" });

    const { error } = await supabase
      .from("enrollments")
      .upsert({ user_id: userId, subject_id: subjectId }, { onConflict: "user_id,subject_id", ignoreDuplicates: true });

    if (error) {
      logger.db("UPSERT", "enrollments", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to enroll" });
    }

    logger.action("ENROLLED", "success", { userId, subjectId });
    res.json({ ok: true });
  } catch (err) {
    logger.error("ENROLL", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/enrollments — get all enrolled subjects for the user
app.get("/api/enrollments", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { data, error } = await supabase
      .from("enrollments")
      .select("subject_id, enrolled_at, subjects(name)")
      .eq("user_id", userId);

    if (error) {
      logger.db("SELECT", "enrollments", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to fetch enrollments" });
    }

    res.json(data || []);
  } catch (err) {
    logger.error("ENROLLMENTS_FETCH", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/progress — save mastered topic + confidence level
app.post("/api/progress", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { sid, cid, topicTitle, completed, score, mastered, confidenceLevel } = req.body || {};
    if (!sid || !cid || !topicTitle) {
      return res.status(400).json({ error: "sid, cid, topicTitle are required" });
    }

    const topicId = await resolveTopicId(sid, cid, topicTitle);
    if (!topicId) return res.status(404).json({ error: "Topic not found" });

    const updateObj = {
      user_id: userId,
      topic_id: topicId,
      updated_at: new Date().toISOString(),
    };
    if (completed != null) updateObj.completed = completed;
    if (score != null) updateObj.score = score;
    if (mastered != null) {
      updateObj.mastered = mastered;
      if (mastered) updateObj.mastered_at = new Date().toISOString();
    }
    if (confidenceLevel) updateObj.confidence_level = confidenceLevel;

    const { error } = await supabase
      .from("progress")
      .upsert(updateObj, { onConflict: "user_id,topic_id", ignoreDuplicates: false });

    if (error) {
      logger.db("UPSERT", "progress", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to save progress" });
    }

    logger.action("PROGRESS_SAVED", "success", { userId, topicId, mastered });
    res.json({ ok: true });
  } catch (err) {
    logger.error("PROGRESS_SAVE", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/progress — fetch user-specific progress (mastered topics, scores, completion)
app.get("/api/progress", async (req, res) => {
  try {
    const userId = await resolveUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { data: progressRows, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      logger.db("SELECT", "progress", "error", { error: error.message });
      return res.status(500).json({ error: "Failed to fetch progress" });
    }

    if (!progressRows || progressRows.length === 0) {
      return res.json({ progress: [] });
    }

    const topicIds = progressRows.map((p) => p.topic_id);
    const { data: contentRows } = await supabase
      .from("content_view")
      .select("topic_id, sid, cid, topic")
      .in("topic_id", topicIds);

    const topicMap = new Map();
    if (contentRows) {
      contentRows.forEach((c) => topicMap.set(c.topic_id, c));
    }

    const result = progressRows.map((p) => {
      const topicInfo = topicMap.get(p.topic_id) || {};
      const sid = topicInfo.sid;
      const cid = topicInfo.cid;
      const topic = topicInfo.topic;
      return {
        topic_id: p.topic_id,
        sid,
        cid,
        topic,
        topicKey: sid && cid && topic ? `${sid}|${cid}|${topic}` : null,
        mastered: !!p.mastered,
        completed: !!p.completed,
        score: p.score,
        confidence_level: p.confidence_level,
        updated_at: p.updated_at,
      };
    });

    res.json({ progress: result });
  } catch (err) {
    logger.error("PROGRESS_GET", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/achievements — Fetch user achievements
app.get('/api/achievements', async (req, res) => {
  try {
    const userId = await getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    if (error) {
      logger.db('SELECT', 'achievements', 'error', { error: error.message });
      return res.status(500).json({ error: "Failed to fetch achievements" });
    }

    res.json({ achievements: data || [] });
  } catch (err) {
    logger.error("ACHIEVEMENTS_GET", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/achievements — Unlock an achievement
app.post('/api/achievements', async (req, res) => {
  try {
    const userId = await getUserId(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { achievementName } = req.body || {};
    if (!achievementName) {
      return res.status(400).json({ error: "achievementName is required" });
    }

    const { data, error } = await supabase
      .from('achievements')
      .insert([{ user_id: userId, achievement_name: achievementName }])
      .select();

    if (error) {
      logger.db('INSERT', 'achievements', 'error', { error: error.message });
      return res.status(500).json({ error: "Failed to unlock achievement" });
    }

    logger.action("ACHIEVEMENT_UNLOCKED", "success", { userId, achievementName });
    res.json({ ok: true, achievement: data?.[0] });
  } catch (err) {
    logger.error("ACHIEVEMENT_POST", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;

