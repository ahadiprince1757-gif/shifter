import { db } from "../db/db";
import { mathTopics } from "./math.js";
import { physicsTopics } from "./physics.js";
import { chemistryTopics } from "./chemistry.js";
import { biologyTopics } from "./biology.js";
import { englishTopics } from "./english.js";
import { computerTopics } from "./computer.js";
import staticCurriculum from "./curriculum.json";
import { ACTIVE_SUBJECT_IDS } from "./subjectRegistry";
import { curriculumRepo } from "../repository/curriculumRepo";

export const CONTENT_VERSION = 11;

const STATIC_SUBJECT_MAP = {
  math: mathTopics,
  physics: physicsTopics,
  chemistry: chemistryTopics,
  biology: biologyTopics,
  english: englishTopics,
  computer: computerTopics,
};

export const SUBJECT_TOPIC_LOADERS = {
  math: () => Promise.resolve(mathTopics),
  physics: () => Promise.resolve(physicsTopics),
  chemistry: () => Promise.resolve(chemistryTopics),
  biology: () => Promise.resolve(biologyTopics),
  english: () => Promise.resolve(englishTopics),
  computer: () => Promise.resolve(computerTopics),
};

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
 * Synchronously checks memory with zero network dependencies so offline notes always load.
 */
export async function getBundledTopic(subjectId, chapterId, topicId) {
  const sid = String(subjectId || "").toLowerCase().trim();
  const chid = String(chapterId || "").trim();
  const tid = String(topicId || "").trim();
  const topics = STATIC_SUBJECT_MAP[sid];
  if (!topics || !Array.isArray(topics)) return null;

  try {
    const exactId = `${sid}|${chid}|${tid}`;
    let match = topics.find((t) => t.id === exactId);
    if (match) return match;

    // Direct match with un-trimmed topicId if different
    if (topicId !== tid) {
      match = topics.find((t) => t.id === `${sid}|${chid}|${topicId}`);
      if (match) return match;
    }

    // Fallback: loose comparison for punctuation/spacing differences
    const normTopic = normalizeTopicString(tid);
    match = topics.find(
      (t) =>
        t.curriculum_id === sid &&
        t.chapter_id === chid &&
        normalizeTopicString(t.topic) === normTopic
    );
    if (!match) {
      const topicAsChapter = normTopic.replace(/\s+/g, "_");
      match = topics.find(
        (t) =>
          t.curriculum_id === sid &&
          (t.chapter_id === topicAsChapter ||
           t.chapter_id.includes(topicAsChapter) ||
           topicAsChapter.includes(t.chapter_id))
      );
    }

    return match || null;
  } catch (err) {
    console.debug(`[ContentLoader] Note during bundled lookup for ${sid}:`, err);
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
    if (!force && meta?.version === CONTENT_VERSION && existingCount >= 390) {
      return { skipped: true, count: existingCount };
    }

    const allTopics = Object.values(STATIC_SUBJECT_MAP).flat().filter(Boolean);

    if (allTopics.length > 0) {
      // Remove any deprecated/orphan topics no longer in the static bundle
      const validIds = new Set(allTopics.map((t) => t.id));
      const currentStored = await db.topics.toArray().catch(() => []);
      const orphans = currentStored.filter((t) => !validIds.has(t.id));
      if (orphans.length > 0) {
        await db.topics.bulkDelete(orphans.map((t) => t.id)).catch(() => {});
      }

      await db.topics.bulkPut(allTopics);

      // Keep Dexie curriculum table aligned with canonical subjects and chapters
      const canonical = staticCurriculum.filter((s) => ACTIVE_SUBJECT_IDS.includes(s.id));
      await curriculumRepo.upsertBatch(canonical.map((c) => ({ ...c, is_deleted: false }))).catch(() => {});

      await db.sync_metadata.put({
        table_name: "content_version",
        version: CONTENT_VERSION,
        last_synced_at: Date.now(),
      });
    }

    return { skipped: false, count: allTopics.length };
  } catch (err) {
    console.debug("[ContentLoader] Seeding note:", err.message || err);
    return { error: err };
  }
}
