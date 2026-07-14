import { useState, useEffect } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { curriculumRepo } from "../repository/curriculumRepo";

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

  const loading = curriculum === null && !timedOut;

  // Derive lookups
  const subjectMap = new Map();
  const chapterMap = new Map();

  const list = Array.isArray(curriculum) ? curriculum : [];
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
