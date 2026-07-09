import logger from "./utils/logger";
import { getActiveSession } from "./supabase";

// Base API URL – taken from env or fallback to localhost during dev
const raw = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://shifter-i49i.onrender.com" : "http://localhost:3001");
const API_BASE = raw.replace(/\/$/, "") + "/api";

/** Helper to retrieve auth headers from Supabase session */
function getAuthHeaders() {
  const session = getActiveSession();
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }
  return {};
}

export async function fetchCurriculum() {
  const startTime = Date.now();
  try {
    const r = await fetch(`${API_BASE}/curriculum`, { headers: getAuthHeaders() });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("GET", "/api/curriculum", r.status, {
        responseTime,
        error: "Failed to fetch curriculum",
      });
      throw new Error("Failed to fetch curriculum");
    }

    logger.api("GET", "/api/curriculum", r.status, { responseTime });
    return r.json();
  } catch (error) {
    logger.error("FETCH_CURRICULUM", error);
    throw error;
  }
}

export async function fetchTopicContent(sid, cid, topic) {
  const startTime = Date.now();
  const endpoint = `/api/content/${sid}/${cid}/${topic}`;

  try {
    const r = await fetch(
      `${API_BASE}/content/${encodeURIComponent(sid)}/${encodeURIComponent(cid)}/${encodeURIComponent(topic)}`,
      { headers: getAuthHeaders() }
    );
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("GET", endpoint, r.status, {
        responseTime,
        subject: sid,
        chapter: cid,
        topic,
        error: "Failed to fetch topic content",
      });
      throw new Error("Failed to fetch topic content");
    }

    logger.api("GET", endpoint, r.status, {
      responseTime,
      subject: sid,
      chapter: cid,
      topic,
    });
    return r.json();
  } catch (error) {
    logger.error("FETCH_TOPIC_CONTENT", error, {
      subject: sid,
      chapter: cid,
      topic,
    });
    throw error;
  }
}

export async function gradeAnswer(payload) {
  const startTime = Date.now();

  try {
    const r = await fetch(`${API_BASE}/grade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("POST", "/api/grade", r.status, {
        responseTime,
        questionId: payload.qId,
        error: "Failed to grade answer",
      });
      throw new Error("Failed to grade answer");
    }

    const result = await r.json();
    logger.api("POST", "/api/grade", r.status, {
      responseTime,
      questionId: payload.qId,
      isCorrect: result.isCorrect,
    });
    return result;
  } catch (error) {
    logger.error("GRADE_ANSWER", error, { questionId: payload.qId });
    throw error;
  }
}

export async function fetchAnalytics() {
  const startTime = Date.now();
  try {
    const r = await fetch(`${API_BASE}/analytics`, { headers: getAuthHeaders() });
    const responseTime = Date.now() - startTime;

    if (!r.ok) {
      logger.api("GET", "/api/analytics", r.status, {
        responseTime,
        error: "Failed to fetch analytics",
      });
      throw new Error("Failed to fetch analytics");
    }

    logger.api("GET", "/api/analytics", r.status, { responseTime });
    return r.json();
  } catch (error) {
    logger.error("FETCH_ANALYTICS", error);
    throw error;
  }
}
