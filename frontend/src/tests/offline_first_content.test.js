import { describe, it, expect } from "vitest";
import { getBundledTopic, CONTENT_VERSION, SUBJECT_TOPIC_LOADERS } from "../data/contentLoader";

describe("Tixar Offline-First Content Architecture", () => {
  it("defines content version >= 2", () => {
    expect(CONTENT_VERSION).toBeGreaterThanOrEqual(2);
  });

  it("provides loaders for all 6 canonical subjects", () => {
    const subjects = ["math", "physics", "chemistry", "biology", "english", "computer"];
    for (const sid of subjects) {
      expect(SUBJECT_TOPIC_LOADERS[sid]).toBeDefined();
      expect(typeof SUBJECT_TOPIC_LOADERS[sid]).toBe("function");
    }
  });

  it("retrieves Mathematics topic from bundled chunk", async () => {
    const topic = await getBundledTopic("math", "numbers", "Number Systems");
    expect(topic).not.toBeNull();
    expect(topic.id).toBe("math|numbers|Number Systems");
    expect(topic.curriculum_id).toBe("math");
    expect(topic.chapter_id).toBe("numbers");
    expect(topic.data.notes).toContain("Number Systems");
    expect(Array.isArray(topic.data.qs)).toBe(true);
    expect(topic.data.qs.length).toBeGreaterThan(0);
    expect(topic.data.qs[0].q).toBeDefined();
    expect(topic.data.qs[0].ans).toBeDefined();
  });

  it("retrieves Physics topic from bundled chunk", async () => {
    const topic = await getBundledTopic("physics", "motion", "Displacement & Distance");
    expect(topic).not.toBeNull();
    expect(topic.curriculum_id).toBe("physics");
    expect(topic.data.notes.length).toBeGreaterThan(50);
    expect(topic.data.qs.length).toBeGreaterThan(0);
  });

  it("retrieves Chemistry topic with loose punctuation matching", async () => {
    const topic = await getBundledTopic("chemistry", "introduction", "Meaning of Chemistry");
    expect(topic).not.toBeNull();
    expect(topic.curriculum_id).toBe("chemistry");
    expect(topic.data.notes).toBeDefined();
  });

  it("retrieves Biology topic from bundled chunk", async () => {
    const topic = await getBundledTopic("biology", "cells", "Cell Biology");
    expect(topic).not.toBeNull();
    expect(topic.curriculum_id).toBe("biology");
  });

  it("retrieves English topic from bundled chunk", async () => {
    const topic = await getBundledTopic("english", "grammar", "Parts of speech");
    expect(topic).not.toBeNull();
    expect(topic.curriculum_id).toBe("english");
  });

  it("retrieves Computer Science topic from bundled chunk", async () => {
    const topic = await getBundledTopic("computer", "basics", "Data vs Information");
    expect(topic).not.toBeNull();
    expect(topic.curriculum_id).toBe("computer");
  });

  it("returns null gracefully for non-existent topics without throwing", async () => {
    const invalid = await getBundledTopic("math", "numbers", "Non-Existent Fantasy Topic 999");
    expect(invalid).toBeNull();

    const invalidSubject = await getBundledTopic("astrology", "stars", "Horoscopes");
    expect(invalidSubject).toBeNull();
  });
});
