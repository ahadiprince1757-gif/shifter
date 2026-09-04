const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const logger = require('./logger');
const { validateEventsBatch } = require('./validators/telemetryValidator');
const intelligenceService = require('./services/intelligenceService');

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

    // ── BACKEND SELF-VERIFICATION (Overrides corrupted DB answers) ───────────
    const qText = String(question.q || "").toLowerCase();
    let rawAns = question.ans;
    const rectMatch =
      qText.match(/(?:length|l)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm|ft|in)?\s+(?:and|,)?\s+(?:width|w|breadth)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i) ||
      qText.match(/(?:width|w|breadth)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)\s*(?:units?|cm|m|km|mm|ft|in)?\s+(?:and|,)?\s+(?:length|l)\s+(?:of|is|=)?\s*(\d+(?:\.\d+)?)/i);

    if (rectMatch && /area/i.test(qText)) {
      const a = parseFloat(rectMatch[1]);
      const b = parseFloat(rectMatch[2]);
      const calcArea = a * b;
      rawAns = String(calcArea);
    }

    const correctAnswer = rawAns;
    const normalize = (s) =>
      String(s || "")
        .toLowerCase()
        .replace(/[\u2018\u2019\u201C\u201D]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    const tokenize = (s) => normalize(s).split(" ").filter(Boolean);
    const uAns = normalize(answer);

    // Extract student number (e.g. "6 units" -> 6)
    const studentNumMatch = uAns.match(/-?\d+(?:\.\d+)?/);
    const studentNum = studentNumMatch ? parseFloat(studentNumMatch[0]) : null;

    const targetNum = !isNaN(parseFloat(String(correctAnswer))) ? parseFloat(String(correctAnswer)) : null;

    let isCorrect = false;

    if (studentNum !== null && targetNum !== null && Math.abs(studentNum - targetNum) < 1e-5) {
      isCorrect = true;
    } else if (Array.isArray(correctAnswer)) {
      isCorrect = correctAnswer.some((v) => normalize(v) === uAns);
    } else {
      isCorrect = normalize(correctAnswer) === uAns;
    }

    const mainCorrectAnswerStr = Array.isArray(correctAnswer) ? correctAnswer.join(" • ") : String(correctAnswer);
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

// Endpoint: Batch insert learning events for analytics with idempotency & bulk resolution
app.post("/api/analytics/events", async (req, res) => {
  const { events } = req.body || {};
  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: "events array is required" });
  }
  try {
    const authUserId = await resolveUserId(req);
    if (!authUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 1. Strict Runtime Validation & Batch Deduplication (Tixar Intelligence Law)
    const { validEvents, rejectedEvents, duplicatesCount, stats } = validateEventsBatch(events);

    if (validEvents.length === 0) {
      try {
        await supabase.from("telemetry_health_logs").insert({
          batch_size: stats.total,
          valid_events_count: 0,
          rejected_events_count: stats.rejected,
          duplicates_suppressed: duplicatesCount,
          unresolved_topics_count: 0,
          user_id: authUserId,
          rejection_reasons: rejectedEvents.slice(0, 10).map((r) => r.error),
        });
      } catch (logErr) {
        logger.warn("TELEMETRY_HEALTH_LOG_WARN", { error: logErr.message });
      }

      return res.status(400).json({
        error: "All events in batch failed schema validation",
        rejectedCount: stats.rejected,
        reasons: rejectedEvents.map((r) => r.error),
      });
    }

    // 2. Bulk resolution: extract unique sid::cid::topic keys to prevent N+1 queries
    const keysToResolve = new Map();
    for (const evt of validEvents) {
      const sid = evt.sid || evt.subject_id;
      const cid = evt.cid || evt.chapter_id;
      const topic = evt.topic;
      if (sid && cid && topic) {
        const key = `${String(sid).toLowerCase().trim()}::${String(cid).toLowerCase().trim()}::${String(topic).toLowerCase().trim()}`;
        if (!keysToResolve.has(key)) {
          keysToResolve.set(key, { sid, cid, topic });
        }
      }
    }

    const topicIdLookup = new Map();
    if (keysToResolve.size > 0) {
      const sids = [...new Set([...keysToResolve.values()].map((k) => k.sid))];
      const { data: matchedRows, error: lookupErr } = await supabase
        .from("content_view")
        .select("topic_id, sid, cid, topic")
        .in("sid", sids);

      if (!lookupErr && matchedRows) {
        for (const row of matchedRows) {
          if (row.sid && row.cid && row.topic) {
            const key = `${String(row.sid).toLowerCase().trim()}::${String(row.cid).toLowerCase().trim()}::${String(row.topic).toLowerCase().trim()}`;
            topicIdLookup.set(key, row.topic_id);
          }
        }
      }
    }

    // 3. Build rowsToInsert with server-enforced identity and idempotency key
    const rowsToInsert = [];
    let unresolvedTopicsCount = 0;

    for (const evt of validEvents) {
      const sid = evt.sid || evt.subject_id;
      const cid = evt.cid || evt.chapter_id;
      const topic = evt.topic;
      const event_type = evt.event_type || evt.type;

      if (!sid || !cid || !topic || !event_type) continue;

      const lookupKey = `${String(sid).toLowerCase().trim()}::${String(cid).toLowerCase().trim()}::${String(topic).toLowerCase().trim()}`;
      const topic_id = topicIdLookup.get(lookupKey) || null;
      if (!topic_id) {
        unresolvedTopicsCount++;
        continue;
      }

      const client_event_id = evt.client_event_id || evt.id || null;

      const metadata = evt.metadata || {};
      if (evt.cognitive_level || evt.cognitiveLevel) {
        metadata.cognitiveLevel = evt.cognitive_level || evt.cognitiveLevel;
      }
      if (evt.question_id) {
        metadata.questionId = evt.question_id;
      }

      rowsToInsert.push({
        topic_id,
        event_type,
        user_id: authUserId, // Server is the sole authority on identity
        client_event_id,
        metadata,
        created_at: evt.created_at || new Date().toISOString(),
      });
    }

    // 4. Batch upsert with ON CONFLICT (client_event_id) for retry safety
    let totalInserted = 0;
    if (rowsToInsert.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < rowsToInsert.length; i += batchSize) {
        const chunk = rowsToInsert.slice(i, i + batchSize);
        const { error: insertErr } = await supabase
          .from("learning_events")
          .upsert(chunk, { onConflict: "client_event_id", ignoreDuplicates: true });

        if (insertErr) {
          logger.warn("UPSERT_FALLBACK_TO_INSERT", { error: insertErr.message });
          const fallbackRows = chunk.map(({ client_event_id, ...rest }) => rest);
          const { error: fallbackErr } = await supabase.from("learning_events").insert(fallbackRows);
          if (fallbackErr) {
            logger.db("INSERT", "learning_events", "error", { error: fallbackErr.message });
            continue;
          }
        }
        totalInserted += chunk.length;
      }
    }

    // 5. Telemetry Ingestion Observability Log
    try {
      await supabase.from("telemetry_health_logs").insert({
        batch_size: stats.total,
        valid_events_count: validEvents.length,
        rejected_events_count: rejectedEvents.length,
        duplicates_suppressed: duplicatesCount,
        unresolved_topics_count: unresolvedTopicsCount,
        user_id: authUserId,
        rejection_reasons: rejectedEvents.slice(0, 10).map((r) => r.error),
      });
    } catch (healthLogErr) {
      logger.warn("TELEMETRY_HEALTH_LOG_INSERT_FAILED", { error: healthLogErr.message });
    }

    logger.action("ANALYTICS_EVENTS_SYNCED", "success", {
      receivedCount: events.length,
      validCount: validEvents.length,
      rejectedCount: rejectedEvents.length,
      duplicatesSuppressed: duplicatesCount,
      insertedCount: totalInserted,
      userId: authUserId,
    });

    res.json({
      inserted: totalInserted,
      accepted: validEvents.length,
      rejected: rejectedEvents.length,
      duplicatesSuppressed: duplicatesCount,
    });
  } catch (err) {
    logger.error("ANALYTICS_EVENTS_SYNC", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Get aggregated canonical learning evidence for the current user
app.get("/api/analytics", async (req, res) => {
  try {
    const userId = await resolveUserId(req);

    if (!userId) {
      return res.json({
        authority: "LOCAL_PROVISIONAL",
        engineVersion: intelligenceService.ENGINE_VERSION,
        ruleVersion: intelligenceService.RULE_VERSION,
        schemaVersion: intelligenceService.SCHEMA_VERSION,
        decision: null,
        coldStart: true,
        intelligenceState: "no_evidence",
        evidence: {
          totalQuestionsAnswered: 0,
          totalVisits: 0,
          correctCount: 0,
          incorrectCount: 0,
          attempts: [],
        },
        topics: [],
        mostVisited: [],
        mostPassed: [],
        mostFailed: [],
        unvisited: [],
      });
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

    // 1. Fetch user-specific learning events with full details
    const { data: events, error: eventErr } = await supabase
      .from("learning_events")
      .select("id, client_event_id, topic_id, event_type, created_at, metadata")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (eventErr) {
      logger.db("SELECT", "learning_events", "error", { error: eventErr.message });
    }

    const attempts = [];
    let totalVisits = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    if (events) {
      events.forEach((e) => {
        const isVisit = e.event_type === "visit" || e.event_type === "lesson_opened";
        const isPass = e.event_type === "pass" || e.event_type === "question_correct";
        const isFail = e.event_type === "fail" || e.event_type === "question_incorrect";

        const item = getTopicItem(e.topic_id, null);
        if (item) {
          if (isVisit) {
            item.visit_count += 1;
            totalVisits += 1;
          }
          if (isPass) {
            item.pass_count += 1;
            correctCount += 1;
            attempts.push({
              id: e.id,
              client_event_id: e.client_event_id || null,
              topic_id: e.topic_id,
              topic: item.topic_title,
              subject_id: item.subject_id,
              chapter_id: item.chapter_id,
              correct: true,
              event_type: e.event_type,
              cognitive_level: e.metadata?.cognitiveLevel || e.metadata?.cognitive_level || null,
              created_at: e.created_at,
            });
          }
          if (isFail) {
            item.fail_count += 1;
            incorrectCount += 1;
            attempts.push({
              id: e.id,
              client_event_id: e.client_event_id || null,
              topic_id: e.topic_id,
              topic: item.topic_title,
              subject_id: item.subject_id,
              chapter_id: item.chapter_id,
              correct: false,
              event_type: e.event_type,
              cognitive_level: e.metadata?.cognitiveLevel || e.metadata?.cognitive_level || null,
              created_at: e.created_at,
            });
          }
        }
      });
    }

    // 2. User-specific progress (for backward compatibility)
    const { data: progressRows } = await supabase
      .from("progress")
      .select("topic_id, topic_title, completed, score")
      .eq("user_id", userId);

    if (progressRows) {
      progressRows.forEach((p) => {
        const item = getTopicItem(p.topic_id, p.topic_title);
        if (item) {
          if (p.completed && item.pass_count === 0) item.pass_count = 1;
          if (p.score != null && p.score < 50 && item.fail_count === 0) item.fail_count = 1;
        }
      });
    }

    const rows = Array.from(topicMap.values());
    const mostVisited = [...rows].filter((r) => r.visit_count > 0).sort((a, b) => b.visit_count - a.visit_count).slice(0, 10);
    const mostPassed = [...rows].filter((r) => r.pass_count > 0).sort((a, b) => b.pass_count - a.pass_count).slice(0, 10);
    const mostFailed = [...rows].filter((r) => r.fail_count > 0).sort((a, b) => b.fail_count - a.fail_count).slice(0, 10);
    const unvisited = rows.filter((r) => r.visit_count === 0 && r.pass_count === 0);

    const totalQuestionsAnswered = attempts.length;
    const hasAssessmentEvidence = totalQuestionsAnswered > 0;
    const isColdStart = !hasAssessmentEvidence;

    const intelligenceState =
      totalQuestionsAnswered === 0
        ? "no_evidence"
        : totalQuestionsAnswered < 5
        ? "early_evidence"
        : "established";

    // 3. Fetch Spaced Reviews for retention evaluation
    const { data: spacedReviews } = await supabase
      .from("spaced_reviews")
      .select("id, user_id, topic_id, topic_title, next_review_at, interval_days, repetitions")
      .eq("user_id", userId);

    // 4. Compute and record Authoritative Intelligence Decision (Immutable Ledger)
    const authoritativeDecision = await intelligenceService.computeAndRecordDecision(
      supabase,
      userId,
      attempts,
      rows,
      spacedReviews || []
    );

    logger.action("ANALYTICS_FETCHED", "success", {
      userId,
      totalTopics: rows.length,
      totalQuestionsAnswered,
      totalVisits,
      isColdStart,
      intelligenceState,
      decisionId: authoritativeDecision.decisionId,
      decisionType: authoritativeDecision.decisionType,
    });

    res.json({
      authority: "SERVER_VERIFIED",
      engineVersion: authoritativeDecision.engineVersion,
      ruleVersion: authoritativeDecision.ruleVersion,
      schemaVersion: authoritativeDecision.schemaVersion,
      decision: authoritativeDecision,
      coldStart: isColdStart,
      intelligenceState,
      evidence: {
        totalQuestionsAnswered,
        totalVisits,
        correctCount,
        incorrectCount,
        attempts, // Canonical real assessment attempts (1:1 with learner actions)
      },
      topics: rows,
      mostVisited: isColdStart ? [] : mostVisited,
      mostPassed: isColdStart ? [] : mostPassed,
      mostFailed: isColdStart ? [] : mostFailed,
      unvisited,
    });
  } catch (err) {
    logger.error("ANALYTICS_FETCH", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint: Internal Intelligence & Telemetry Health Observability (Phase P0)
app.get("/api/admin/intelligence-health", async (req, res) => {
  try {
    const { data: healthLogs } = await supabase
      .from("telemetry_health_logs")
      .select("*")
      .order("recorded_at", { ascending: false })
      .limit(50);

    const { data: decisions } = await supabase
      .from("intelligence_decisions")
      .select("id, decision_type, action_type, engine_version, rule_version, created_at, supersedes_decision_id")
      .order("created_at", { ascending: false })
      .limit(50);

    const totalBatches = (healthLogs || []).length;
    const totalValid = (healthLogs || []).reduce((acc, h) => acc + (h.valid_events_count || 0), 0);
    const totalRejected = (healthLogs || []).reduce((acc, h) => acc + (h.rejected_events_count || 0), 0);
    const totalDuplicates = (healthLogs || []).reduce((acc, h) => acc + (h.duplicates_suppressed || 0), 0);

    res.json({
      status: "healthy",
      engineVersion: intelligenceService.ENGINE_VERSION,
      ruleVersion: intelligenceService.RULE_VERSION,
      schemaVersion: intelligenceService.SCHEMA_VERSION,
      telemetryObservability: {
        batchesObserved: totalBatches,
        totalValidEvents: totalValid,
        totalRejectedEvents: totalRejected,
        totalDuplicatesSuppressed: totalDuplicates,
        rejectionRatePct: totalValid + totalRejected > 0
          ? ((totalRejected / (totalValid + totalRejected)) * 100).toFixed(2)
          : "0.00",
        recentLogs: healthLogs || []
      },
      decisionsObservability: {
        recentDecisionsCount: (decisions || []).length,
        recentDecisions: decisions || []
      }
    });
  } catch (err) {
    logger.error("INTELLIGENCE_HEALTH_FETCH", err);
    res.status(500).json({ error: "Failed fetching intelligence health" });
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

