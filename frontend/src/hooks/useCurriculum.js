import { useLiveQuery } from "./useLiveQuery";
import { curriculumRepo } from "../repository/curriculumRepo";

export function useCurriculum() {
  // useLiveQuery subscribes to the curriculum table and auto-updates when it changes
  const curriculum = useLiveQuery(
    () => curriculumRepo.getAll(),
    [], // dependencies
    null // default result while loading
  );

  const loading = curriculum === null;

  // Derive lookups
  const subjectMap = new Map();
  const chapterMap = new Map();

  if (curriculum && Array.isArray(curriculum)) {
    curriculum.forEach((subject) => {
      subjectMap.set(subject.id, subject);
      if (subject.chapters) {
        subject.chapters.forEach((chapter) => {
          chapterMap.set(`${subject.id}|${chapter.id}`, chapter);
        });
      }
    });
  }

  return {
    curriculum,
    subjectMap,
    chapterMap,
    loading,
    error: null,
  };
}
