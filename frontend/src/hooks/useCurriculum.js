import { useState, useEffect } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { curriculumRepo } from "../repository/curriculumRepo";
import staticCurriculum from "../data/curriculum.json";

// Canonical subjects — always shown even if network is unavailable
const CANONICAL_IDS = ["math", "physics", "chemistry", "biology", "english", "computer"];

export function useCurriculum() {
  // useLiveQuery subscribes to the curriculum table and auto-updates when it changes
  const curriculum = useLiveQuery(
    () => curriculumRepo.getAll(),
    [], // dependencies
    null // default result while loading
  );

  // If Dexie hasn't resolved after 2 s (e.g. first-visit + offline), stop blocking the UI
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    if (curriculum !== null) return; // Data arrived — no timeout needed
    const id = setTimeout(() => setTimedOut(true), 2000);
    return () => clearTimeout(id);
  }, [curriculum]);

  // If Dexie is empty (first visit / cleared storage / offline), immediately seed
  // from the bundled static curriculum so the UI is never blank.
  useEffect(() => {
    if (!Array.isArray(curriculum) || curriculum.length > 0) return;
    // Dexie resolved but returned nothing — seed it now
    const canonical = staticCurriculum.filter(s => CANONICAL_IDS.includes(s.id));
    if (canonical.length > 0) {
      curriculumRepo.upsertBatch(canonical.map(c => ({ ...c, is_deleted: false })))
        .catch(() => {});
    }
  }, [curriculum]);

  const loading = curriculum === null && !timedOut;

  // Derive lookups
  const subjectMap = new Map();
  const chapterMap = new Map();

  // If still loading or Dexie is empty, fall back to the static list so UI is never blank
  const list = Array.isArray(curriculum) && curriculum.length > 0
    ? curriculum
    : Array.isArray(curriculum) && curriculum.length === 0
      ? staticCurriculum.filter(s => CANONICAL_IDS.includes(s.id))
      : [];

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
    loading,
    error: null,
  };
}

