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

  // Check if Dexie list has modern hierarchical topic structure
  const isUpToDate =
    validDexieList.length > 0 &&
    validDexieList.some(
      (s) =>
        s.id === "math" &&
        s.chapters?.some((c) => c.id === "geometry" && typeof c.topics?.[0] === "object")
    );

  // Always supply canonical subjects immediately — zero blank flash, zero loading delay
  const list = isUpToDate ? validDexieList : DEFAULT_CANONICAL_LIST;

  // If Dexie was outdated, sync modern structure in background
  useEffect(() => {
    if (validDexieList.length > 0 && !isUpToDate) {
      curriculumRepo
        .upsertBatch(DEFAULT_CANONICAL_LIST.map((c) => ({ ...c, is_deleted: false })))
        .catch(() => {});
    }
  }, [validDexieList, isUpToDate]);

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

