import { db } from "../db/db";
import { curriculumRepo } from "../repository/curriculumRepo";
import { topicRepo } from "../repository/topicRepo";
import { progressRepo } from "../repository/progressRepo";
import { mistakeRepo } from "../repository/mistakeRepo";
import { fetchCurriculum, fetchTopicContent, saveProgress } from "../api";
import { networkService } from "../services/networkService";
import staticCurriculum from "../data/curriculum.json";
import { getBundledTopic, seedBundledTopics } from "../data/contentLoader";

// Canonical subject IDs — only these are ever kept in local storage.
const CANONICAL_SUBJECT_IDS = new Set(["math", "physics", "chemistry", "biology", "english", "computer"]);
const CANONICAL_IDS = Object.freeze(Array.from(CANONICAL_SUBJECT_IDS));

/**
 * Check if an error is a transient network failure (not a server/logic error).
 */
function isNetworkError(err) {
  if (!err) return false;
  const msg = err.message || "";
  return (
    msg === "Failed to fetch" ||
    msg.includes("NetworkError") ||
    msg.includes("ERR_NETWORK") ||
    msg.includes("ERR_NAME_NOT_RESOLVED") ||
    msg.includes("Load failed")
  );
}

class SyncEngine {
  constructor() {
    this.isSyncing = false;
    
    // Auto-sync when network comes online
    networkService.subscribe((state, previousStatus) => {
      const isOnlineNow = Boolean(state?.isOnline || state?.status === "ONLINE" || state?.status === "DEGRADED" || state === true);
      const wasNotOnlineBefore = !previousStatus || previousStatus !== "ONLINE";
      if (isOnlineNow && wasNotOnlineBefore) {
        this.syncAll();
      }
    });
  }

  /**
   * Seed from the bundled static curriculum.json if IndexedDB has no subjects.
   * This means the app always shows the 6 subjects immediately — even offline
   * on first load, even if the backend is down.
   */
  async seedFromStatic() {
    try {
      const canonical = staticCurriculum.filter(s => CANONICAL_SUBJECT_IDS.has(s.id));
      const count = await db.curriculum.count();
      if (count === 0 && canonical.length > 0) {
        await curriculumRepo.upsertBatch(canonical.map(c => ({ ...c, is_deleted: false })));
        console.log("[Sync] Seeded from static curriculum:", canonical.map(s => s.id).join(", "));
      }
      // Purge any dead/non-canonical subjects from Dexie
      const allLocal = await db.curriculum.toArray();
      const nonCanonical = allLocal.filter(s => !CANONICAL_SUBJECT_IDS.has(s.id));
      if (nonCanonical.length > 0) {
        await Promise.all(nonCanonical.map(s => db.curriculum.delete(s.id)));
      }

      // Idempotently seed bundled educational topics into IndexedDB
      await seedBundledTopics();
    } catch (e) {
      console.warn("[Sync] Static seed failed:", e);
    }
  }

  async syncAll(options = {}) {
    const { force = false, minIntervalMs = 5 * 60 * 1000 } = options;

    if (this.isSyncing) return;

    // Always seed from static first so the UI is never blank
    await this.seedFromStatic();

    if (!navigator.onLine) return;

    // If network status is CHECKING, wait up to 5s for connectivity check to complete
    if (networkService.status === "CHECKING") {
      await networkService.waitForOnline(5000);
    }

    if (!networkService.isOnline) return;

    // Staleness guard: skip redundant sync if curriculum is fresh (<5 min) and no pending local changes
    if (!force) {
      try {
        const meta = await db.sync_metadata.get("curriculum");
        if (meta?.last_synced_at && (Date.now() - meta.last_synced_at < minIntervalMs)) {
          const allChanges = await db.change_log.toArray();
          const hasPending = allChanges.some(change => !change.synced);
          if (!hasPending) {
            return; // Cache is fresh, skip network roundtrip
          }
        }
      } catch (e) {
        // Fall back to normal sync on check failure
      }
    }

    this.isSyncing = true;

    try {
      // 1. Process UP sync (local changes pushed to server)
      await this.pushUpSync();

      // 2. Process DOWN sync (server changes pulled to local)
      await this.pullDownSync();
    } catch (error) {
      if (isNetworkError(error)) {
        console.debug("[Sync] Skipped — device appears offline or network is unstable.");
      } else {
        console.warn("[Sync] Sync note:", error?.message || error);
      }
    } finally {
      this.isSyncing = false;
    }
  }

  async pushUpSync() {
    // Flush any pending mistake operations (saved/resolved while offline)
    await mistakeRepo.flushPendingSync().catch(() => {});

    // Get unsynced progress changes
    const allChanges = await db.change_log.toArray();
    const pendingChanges = allChanges.filter(change => !change.synced);
    if (pendingChanges.length === 0) return;

    for (const change of pendingChanges) {
      try {
        if (change.type === "progress_update") {
          const payload = change.payload || {};
          const { sid, cid, topicId, completed, score, mastered, confidenceLevel } = payload;

          // Only push to Supabase if we have enough context (sid, cid, topicId)
          if (sid && cid && topicId) {
            await saveProgress({
              sid,
              cid,
              topicTitle: topicId,
              completed: completed ?? false,
              score: score ?? null,
              mastered: mastered ?? false,
              confidenceLevel: confidenceLevel ?? null,
            });
          }

          // Mark as synced locally
          await progressRepo.markSynced(change.entity_id);
          await db.change_log.update(change.id, { synced: true });
        }
      } catch (err) {
        if (isNetworkError(err)) {
          console.warn(`[Sync] Push skipped (offline) for change ${change.id}`);
          break; // Stop trying to push more if we're offline
        }
        console.error(`Failed to sync change ${change.id}`, err);
        // We do not throw here to allow other items in the queue to process
      }
    }
  }

  async pullDownSync() {
    if (!navigator.onLine) return;

    try {
      // Lazy prefetch: Only fetch curriculum high-level data
      const curriculumData = await fetchCurriculum();
      
      // Store in DB, assuming the server sends an array of curriculum subjects
      if (Array.isArray(curriculumData) && curriculumData.length > 0) {
        // Filter to only canonical subjects before storing
        const canonical = curriculumData.filter((s) => CANONICAL_SUBJECT_IDS.has(s.id));

        await curriculumRepo.upsertBatch(canonical.map(c => ({
          ...c,
          is_deleted: false, 
        })));

        // Soft-delete any subjects in Dexie that are NOT in the canonical list
        // (handles the case where old subjects were previously synced)
        const allLocal = await db.curriculum.toArray();
        const toDelete = allLocal
          .filter(s => !CANONICAL_SUBJECT_IDS.has(s.id))
          .map(s => s.id);
        if (toDelete.length > 0) {
          await Promise.all(toDelete.map(id => curriculumRepo.softDelete(id)));
          console.log("[Sync] Purged non-canonical subjects:", toDelete.join(", "));
        }
        
        await db.sync_metadata.put({
          table_name: "curriculum",
          last_synced_at: Date.now()
        });
      }
    } catch (err) {
      if (isNetworkError(err)) {
        console.debug("[Sync] Down-sync skipped — network unavailable.");
      } else {
        console.debug("[Sync] DOWN sync note:", err?.message || err);
      }
    }
  }

  /**
   * Lazily ensure specific chapter/topic content is in Dexie.
   * IndexedDB is the primary local source of truth.
   * If not yet present in Dexie, it pulls from the bundled chunk and writes to Dexie.
   * A non-blocking background refresh is triggered if online.
   */
  async prefetchTopic(subjectId, chapterId, topicId) {
    // 1. Read IndexedDB first
    let local = await topicRepo.getTopic(subjectId, chapterId, topicId).catch(() => null);

    // 2. If not in IndexedDB, fall back to bundled chunk immediately
    if (!local?.data) {
      const bundled = await getBundledTopic(subjectId, chapterId, topicId);
      if (bundled?.data) {
        await topicRepo.upsertBatch([bundled]).catch(() => {});
        local = bundled;
      }
    }

    // 3. Trigger background refresh without blocking if online
    if (typeof navigator !== "undefined" && navigator.onLine) {
      this.refreshTopicInBackground(subjectId, chapterId, topicId).catch(() => {});
    }

    return local?.data || null;
  }

  /**
   * Non-blocking background sync for a single topic.
   * Updates Dexie quietly if the server returns fresh content.
   * Never throws or interrupts user learning.
   */
  async refreshTopicInBackground(subjectId, chapterId, topicId) {
    try {
      const topicData = await fetchTopicContent(subjectId, chapterId, topicId);
      if (topicData && (topicData.notes || (Array.isArray(topicData.qs) && topicData.qs.length > 0))) {
        await topicRepo.upsertBatch([{
          id: `${subjectId}|${chapterId}|${topicId}`,
          curriculum_id: subjectId,
          chapter_id: chapterId,
          data: topicData,
          is_deleted: false,
        }]);
      }
    } catch (err) {
      // Quiet background failure — do not log scary error or disrupt user
      console.debug(`[Sync] Background refresh skipped for "${topicId}":`, err?.message || err);
    }
  }
}

export const syncEngine = new SyncEngine();
