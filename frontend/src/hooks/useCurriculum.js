import { useEffect, useRef } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { curriculumRepo } from "../repository/curriculumRepo";
import staticCurriculum from "../data/curriculum.json";
import { ACTIVE_SUBJECT_IDS } from "../data/subjectRegistry";
import { CONTENT_VERSION } from "../data/contentLoader";

// curriculum.json is a plain array of subject objects
const CANONICAL_SUBJECTS = Array.isArray(staticCurriculum)
  ? staticCurriculum.filter((s) => s && ACTIVE_SUBJECT_IDS.includes(s.id))
  : [];

// Version key stored alongside each subject in Dexie
const VERSION_KEY = `curriculum_v${CONTENT_VERSION}`;

/**
 * Checks whether a subject from Dexie has the new hierarchical topic structure
 * (topics are objects with a `subtopics` array, not raw strings).
 */
function isHierarchical(subject) {
  return (
    subject &&
    Array.isArray(subject.chapters) &&
    subject.chapters.some((c) =>
      Array.isArray(c.topics) &&
      c.topics.some((t) => typeof t === "object" && t !== null && Array.isArray(t.subtopics))
    )
  );
}

/**
 * Checks whether a Dexie subject was seeded with the current CONTENT_VERSION.
 */
function isCurrentVersion(subject) {
  return subject && subject._v === VERSION_KEY;
}

export function useCurriculum() {
  const syncedRef = useRef(false);

  // Subscribe to IndexedDB changes
  const dexieCurriculum = useLiveQuery(
    () => curriculumRepo.getAll(),
    [],
    null
  );

  // Force-replace Dexie whenever:
  // 1. It is empty, OR
  // 2. Any subject is missing the current _v version stamp, OR
  // 3. Any subject lacks the hierarchical topic structure
  useEffect(() => {
    if (!Array.isArray(dexieCurriculum)) return; // still loading
    if (syncedRef.current) return;

    const needsSync =
      dexieCurriculum.length === 0 ||
      dexieCurriculum.some(
        (s) => !isCurrentVersion(s) || !isHierarchical(s)
      );

    if (needsSync) {
      syncedRef.current = true;
      const stamped = CANONICAL_SUBJECTS.map((s) => ({
        ...s,
        _v: VERSION_KEY,
        is_deleted: false,
      }));
      curriculumRepo.upsertBatch(stamped).catch(() => {});
    }
  }, [dexieCurriculum]);

  // Filter Dexie results to only canonical subjects
  const validDexieList = Array.isArray(dexieCurriculum)
    ? dexieCurriculum.filter(
        (s) =>
          s &&
          ACTIVE_SUBJECT_IDS.includes(s.id) &&
          isHierarchical(s) &&
          isCurrentVersion(s)
      )
    : [];

  // Use Dexie if it has fresh hierarchical data, otherwise fall back to static JSON instantly
  const list =
    validDexieList.length === CANONICAL_SUBJECTS.length
      ? validDexieList
      : CANONICAL_SUBJECTS;

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
