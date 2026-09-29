import { db } from "../db/db";

export const CONTENT_VERSION = 2;

export const SUBJECT_TOPIC_LOADERS = {
  math: () => import("./math.js").then((m) => m.default || m.mathTopics),
  physics: () => import("./physics.js").then((m) => m.default || m.physicsTopics),
  chemistry: () => import("./chemistry.js").then((m) => m.default || m.chemistryTopics),
  biology: () => import("./biology.js").then((m) => m.default || m.biologyTopics),
  english: () => import("./english.js").then((m) => m.default || m.englishTopics),
  computer: () => import("./computer.js").then((m) => m.default || m.computerTopics),
};

// In-memory cache for loaded subject chunks to avoid re-importing
const loadedChunks = new Map();

/**
 * Normalizes a topic string for loose comparison (handles dashes and whitespace).
 */
function normalizeTopicString(str) {
  return String(str || "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
}

/**
 * Retrieve a specific topic from the bundled static chunks.
 */
export async function getBundledTopic(subjectId, chapterId, topicId) {
  const sid = String(subjectId || "").toLowerCase().trim();
  const loader = SUBJECT_TOPIC_LOADERS[sid];
  if (!loader) return null;

  try {
    let topics = loadedChunks.get(sid);
    if (!topics) {
      topics = await loader();
      loadedChunks.set(sid, topics);
    }

    if (!Array.isArray(topics)) return null;

    const exactId = `${sid}|${chapterId}|${topicId}`;
    let match = topics.find((t) => t.id === exactId);
    if (match) return match;

    // Fallback: loose comparison for punctuation/spacing differences
    const normTopic = normalizeTopicString(topicId);
    match = topics.find(
      (t) =>
        t.curriculum_id === sid &&
        t.chapter_id === chapterId &&
        normalizeTopicString(t.topic) === normTopic
    );

    return match || null;
  } catch (err) {
    console.warn(`[ContentLoader] Failed to load bundled chunk for ${sid}:`, err);
    return null;
  }
}

/**
 * Idempotently seeds all bundled topics into Dexie IndexedDB.
 * Only writes when the stored content version differs or if the database is unseeded.
 */
export async function seedBundledTopics(force = false) {
  try {
    const meta = await db.sync_metadata.get("content_version").catch(() => null);
    const existingCount = await db.topics.count().catch(() => 0);

    // If already seeded at current content version and has content, skip
    if (!force && meta?.version === CONTENT_VERSION && existingCount >= 334) {
      return { skipped: true, count: existingCount };
    }

    console.log(`[ContentLoader] Seeding bundled topics (current: ${existingCount}, version: ${CONTENT_VERSION})...`);

    const chunkPromises = Object.entries(SUBJECT_TOPIC_LOADERS).map(async ([sid, loader]) => {
      let topics = loadedChunks.get(sid);
      if (!topics) {
        topics = await loader();
        loadedChunks.set(sid, topics);
      }
      return topics;
    });

    const results = await Promise.all(chunkPromises);
    const allTopics = results.flat().filter(Boolean);

    if (allTopics.length > 0) {
      await db.topics.bulkPut(allTopics);
      await db.sync_metadata.put({
        table_name: "content_version",
        version: CONTENT_VERSION,
        last_synced_at: Date.now(),
      });
      console.log(`[ContentLoader] Successfully seeded ${allTopics.length} topics into IndexedDB.`);
    }

    return { skipped: false, count: allTopics.length };
  } catch (err) {
    console.error("[ContentLoader] Seeding bundled topics failed:", err);
    return { error: err };
  }
}
