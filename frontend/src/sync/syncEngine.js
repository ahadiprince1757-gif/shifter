import { db } from "../db/db";
import { curriculumRepo } from "../repository/curriculumRepo";
import { topicRepo } from "../repository/topicRepo";
import { progressRepo } from "../repository/progressRepo";
import { fetchCurriculum, fetchTopicContent, gradeAnswer } from "../api";
import { networkService } from "../services/networkService";

class SyncEngine {
  constructor() {
    this.isSyncing = false;
    
    // Auto-sync when network comes online
    networkService.subscribe((isOnline) => {
      if (isOnline) {
        this.syncAll();
      }
    });
  }

  async syncAll() {
    if (!networkService.isOnline || this.isSyncing) return;
    this.isSyncing = true;

    try {
      // 1. Process UP sync (local changes pushed to server)
      await this.pushUpSync();

      // 2. Process DOWN sync (server changes pulled to local)
      await this.pullDownSync();
    } catch (error) {
      console.error("Sync failed:", error);
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
          // Push to server
          await gradeAnswer(change.payload.data); // Assuming payload has what API needs
          
          // Mark as synced locally
          await progressRepo.markSynced(change.entity_id);
          await db.change_log.update(change.id, { synced: true });
        }
      } catch (err) {
        console.error(`Failed to sync change ${change.id}`, err);
        // We do not throw here to allow other items in the queue to process
      }
    }
  }

  async pullDownSync() {
    try {
      // Lazy prefetch: Only fetch curriculum high-level data
      // For a real delta-sync, we'd send 'last_synced_at' from sync_metadata table
      const curriculumData = await fetchCurriculum();
      
      // Store in DB, assuming the server sends an array of curriculum subjects
      // In our current implementation, fetchCurriculum returns an array.
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
      console.error("DOWN sync failed:", err);
      throw err;
    }
  }

  /**
   * Lazily fetch specific chapter/topic content when a user navigates to it,
   * if we are online. If offline, the UI will just read what we have in Dexie.
   */
  async prefetchTopic(subjectId, chapterId, topicId) {
    if (!networkService.isOnline) return;

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
      console.error(`Failed to prefetch topic ${topicId}:`, err);
      throw err;
    }
  }
}

export const syncEngine = new SyncEngine();
