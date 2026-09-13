import { useEffect } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { curriculumRepo } from "../repository/curriculumRepo";
import staticCurriculum from "../data/curriculum.json";
import { ACTIVE_SUBJECT_IDS } from "../data/subjectRegistry";

// The frozen 6 canonical subjects
const DEFAULT_CANONICAL_LIST = Object.freeze(
  staticCurriculum.filter((s) => ACTIVE_SUBJECT_IDS.includes(s.id))
);

export function useCurriculum() {
  // Subscribe to IndexedDB changes
  const dexieCurriculum = useLiveQuery(
    () => curriculumRepo.getAll(),
    [],
    null
  );

  // Auto-seed Dexie with the canonical 6 if empty
  useEffect(() => {
    if (!Array.isArray(dexieCurriculum) || dexieCurriculum.length > 0) return;
    curriculumRepo.upsertBatch(DEFAULT_CANONICAL_LIST.map(c => ({ ...c, is_deleted: false })))
      .catch(() => {});
  }, [dexieCurriculum]);

  // Clean and filter: only ever return the 6 canonical subjects
  const validDexieList = Array.isArray(dexieCurriculum)
    ? dexieCurriculum.filter(s => ACTIVE_SUBJECT_IDS.includes(s.id))
    : [];

  // Always supply the 6 canonical subjects immediately — zero blank flash, zero loading delay
  const list = validDexieList.length > 0 ? validDexieList : DEFAULT_CANONICAL_LIST;

  // Build lookups
  const subjectMap = new Map();
  const chapterMap = new Map();

  list.forEach((subject) => {
    subjectMap.set(subject.id, subject);
    if (subject.chapters) {
      subject.chapters.forEach((chapter) => {
        chapterMap.set(`${subject.id}|${chapter.id}`, chapter);
      });
    }
  });

  return {
    curriculum: list,
    subjectMap,
    chapterMap,
    loading: false,
    error: null,
  };
}

