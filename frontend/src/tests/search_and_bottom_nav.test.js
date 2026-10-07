import { describe, it, expect, vi } from "vitest";

describe("Search & Subtopic Navigation Architecture", () => {
  const sampleCurriculum = [
    {
      id: "physics",
      label: "Physics",
      chapters: [
        {
          id: "motion",
          label: "Linear Motion",
          topics: [
            {
              name: "Distance and Displacement",
              subtopics: [
                "Distance",
                "Displacement",
                "Distance and Displacement Compared",
              ],
            },
            {
              name: "Speed and Velocity",
              subtopics: ["Speed", "Velocity", "Instantaneous Velocity"],
            },
          ],
        },
      ],
    },
    {
      id: "biology",
      label: "Biology",
      chapters: [
        {
          id: "cells",
          label: "Cell Biology",
          topics: [
            {
              name: "Cell Structure",
              subtopics: [
                "What is a Cell",
                "Cell Membrane",
                "Mitochondria",
              ],
            },
          ],
        },
      ],
    },
  ];

  it("indexes subtopics accurately from hierarchical curriculum structure", () => {
    const q = "displacement";
    const matches = [];

    sampleCurriculum.forEach((subj) => {
      subj.chapters.forEach((chap) => {
        chap.topics.forEach((t) => {
          const topicName = typeof t === "object" ? t.name : String(t);
          const subtopics =
            typeof t === "object" && Array.isArray(t.subtopics)
              ? t.subtopics
              : [topicName];

          subtopics.forEach((sub) => {
            if (sub.toLowerCase().includes(q)) {
              matches.push({
                subject: subj.id,
                chapter: chap.id,
                topicGroup: topicName,
                topic: sub,
                isSubtopic: sub !== topicName,
              });
            }
          });
        });
      });
    });

    expect(matches.length).toBe(2);
    expect(matches[0].topic).toBe("Displacement");
    expect(matches[0].isSubtopic).toBe(true);
    expect(matches[0].topicGroup).toBe("Distance and Displacement");
    expect(matches[1].topic).toBe("Distance and Displacement Compared");
  });

  it("handles string topics without crashing or throwing TypeError", () => {
    const flatCurriculum = [
      {
        id: "chem",
        label: "Chemistry",
        chapters: [
          {
            id: "atoms",
            label: "Atoms",
            topics: ["Atomic Theory", "Electron Configuration"],
          },
        ],
      },
    ];

    const q = "atomic";
    const matches = [];

    flatCurriculum.forEach((subj) => {
      subj.chapters.forEach((chap) => {
        chap.topics.forEach((t) => {
          const topicName = typeof t === "object" ? t.name : String(t);
          const subtopics =
            typeof t === "object" && Array.isArray(t.subtopics)
              ? t.subtopics
              : [topicName];

          subtopics.forEach((sub) => {
            if (sub.toLowerCase().includes(q)) {
              matches.push({
                subject: subj.id,
                chapter: chap.id,
                topic: sub,
              });
            }
          });
        });
      });
    });

    expect(matches.length).toBe(1);
    expect(matches[0].topic).toBe("Atomic Theory");
  });

  it("constructs correct direct learn route for any matched subtopic", () => {
    const subjectId = "physics";
    const chapterId = "motion";
    const subtopic = "Instantaneous Velocity";

    const targetRoute = `/learn/${subjectId}/${chapterId}/${encodeURIComponent(subtopic)}`;
    expect(targetRoute).toBe(
      "/learn/physics/motion/Instantaneous%20Velocity"
    );
  });
});
