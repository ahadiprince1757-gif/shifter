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
    const rowsToInsert = [];
    for (const evt of events) {
      const { sid, cid, topic, event_type, user_id } = evt;
      if (!sid || !cid || !topic || !event_type) continue;
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
        user_id: user_id || null,
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
    });
    res.json({ inserted: totalInserted });
  } catch (err) {
    logger.error("ANALYTICS_EVENTS_SYNC", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Get aggregated analytics from topic_analytics_view
app.get("/api/analytics", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("topic_analytics_view")
      .select("*");
    if (error) {
      logger.db("SELECT", "topic_analytics_view", "error", {
        error: error.message,
      });
      return res
        .status(500)
        .json({ error: "Database query failed fetching analytics" });
    }
    const rows = data || [];
    const mostVisited = [...rows]
      .filter((r) => r.visit_count > 0)
      .sort((a, b) => b.visit_count - a.visit_count)
      .slice(0, 10);
    const mostPassed = [...rows]
      .filter((r) => r.pass_count > 0)
      .sort((a, b) => b.pass_count - a.pass_count)
      .slice(0, 10);
    const mostFailed = [...rows]
      .filter((r) => r.fail_count > 0)
      .sort((a, b) => b.fail_count - a.fail_count)
      .slice(0, 10);
    const unvisited = rows.filter((r) => r.visit_count === 0);
    logger.action("ANALYTICS_FETCHED", "success", {
      totalTopics: rows.length,
      visitedCount: rows.filter((r) => r.visit_count > 0).length,
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

module.exports = app;
