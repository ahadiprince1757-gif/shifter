import { db } from "../db/db";
import { curriculumRepo } from "../repository/curriculumRepo";
import { topicRepo } from "../repository/topicRepo";
import { progressRepo } from "../repository/progressRepo";
import { fetchCurriculum, fetchTopicContent, saveProgress } from "../api";
import { networkService } from "../services/networkService";

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

  async syncAll() {
    if (!navigator.onLine || !networkService.isOnline || this.isSyncing) return;
    this.isSyncing = true;

    try {
      // 1. Process UP sync (local changes pushed to server)
      await this.pushUpSync();

      // 2. Process DOWN sync (server changes pulled to local)
      await this.pullDownSync();
    } catch (error) {
      if (isNetworkError(error)) {
        console.warn("[Sync] Skipped — device appears offline or network is unstable.");
      } else {
        console.error("Sync failed:", error);
      }
    } finally {
      this.isSyncing = false;
    }
  }

  async pushUpSync() {
    // Get unsynced changes
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
      if (Array.isArray(curriculumData)) {
        await curriculumRepo.upsertBatch(curriculumData.map(c => ({
          ...c,
          is_deleted: false, 
        })));
        
        await db.sync_metadata.put({
          table_name: "curriculum",
          last_synced_at: Date.now()
        });
      }
    } catch (err) {
      if (isNetworkError(err)) {
        console.warn("[Sync] Down-sync skipped — network unavailable.");
      } else {
        console.error("DOWN sync failed:", err);
      }
      throw err;
    }
  }

  /**
   * Lazily fetch specific chapter/topic content when a user navigates to it,
   * if we are online. If offline, the UI will just read what we have in Dexie.
   */
  async prefetchTopic(subjectId, chapterId, topicId) {
    if (!navigator.onLine || !networkService.isOnline) return;

    try {
      const topicData = await fetchTopicContent(subjectId, chapterId, topicId);
      
      await topicRepo.upsertBatch([{
        id: `${subjectId}|${chapterId}|${topicId}`,
        curriculum_id: subjectId,
        chapter_id: chapterId,
        data: topicData,
        is_deleted: false
      }]);
    } catch (err) {
      if (isNetworkError(err)) {
        console.warn(`[Sync] Topic prefetch skipped (offline): ${topicId}`);
        // Don't throw for network errors — the UI will show cached content or a gentle message
        return;
      }
      console.error(`Failed to prefetch topic ${topicId}:`, err);
      throw err;
    }
  }
}

export const syncEngine = new SyncEngine();
