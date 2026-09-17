/**
 * CANONICAL CURRICULUM INTEGRITY AUDITOR
 * Validates that backend curriculum and frontend bootstrap curriculum match 1:1,
 * enforces the 6 canonical subjects, and reports any drift or duplicate IDs.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CANONICAL_SUBJECT_IDS = new Set([
  "math",
  "physics",
  "chemistry",
  "biology",
  "english",
  "computer",
]);

const backendCurriculumPath = path.resolve(__dirname, "../backend/data/curriculum.json");
const frontendCurriculumPath = path.resolve(__dirname, "../frontend/src/data/curriculum.json");

function validate() {
  console.log("==================================================");
  console.log("   CURRICULUM INTEGRITY & SYNCHRONIZATION AUDIT   ");
  console.log("==================================================\n");

  if (!fs.existsSync(backendCurriculumPath)) {
    console.error(`FATAL: Backend curriculum not found at: ${backendCurriculumPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(frontendCurriculumPath)) {
    console.error(`FATAL: Frontend curriculum not found at: ${frontendCurriculumPath}`);
    process.exit(1);
  }

  const backendCurriculum = JSON.parse(fs.readFileSync(backendCurriculumPath, "utf8"));
  const frontendCurriculum = JSON.parse(fs.readFileSync(frontendCurriculumPath, "utf8"));

  let errors = 0;

  // 1. Check Canonical Subject Whitelist
  console.log("1. Checking Canonical Subject Whitelist (Strict 6):");
  backendCurriculum.forEach((s) => {
    if (!CANONICAL_SUBJECT_IDS.has(s.id)) {
      console.error(`  [EXTRA SUBJECT IN BACKEND] Subject "${s.id}" is not in the canonical 6!`);
      errors++;
    }
  });

  frontendCurriculum.forEach((s) => {
    if (!CANONICAL_SUBJECT_IDS.has(s.id)) {
      console.error(`  [EXTRA SUBJECT IN FRONTEND] Subject "${s.id}" is not in the canonical 6!`);
      errors++;
    }
  });

  for (const canonicalId of CANONICAL_SUBJECT_IDS) {
    if (!backendCurriculum.some((s) => s.id === canonicalId)) {
      console.error(`  [MISSING CANONICAL IN BACKEND] "${canonicalId}" missing from backend curriculum!`);
      errors++;
    }
    if (!frontendCurriculum.some((s) => s.id === canonicalId)) {
      console.error(`  [MISSING CANONICAL IN FRONTEND] "${canonicalId}" missing from frontend curriculum!`);
      errors++;
    }
  }

  // 2. Check 1-to-1 Parity between Backend and Frontend Bootstrap
  console.log("\n2. Checking Backend <-> Frontend Bootstrap Parity:");

  const backendSubMap = new Map(backendCurriculum.map((s) => [s.id, s]));
  const frontendSubMap = new Map(frontendCurriculum.map((s) => [s.id, s]));

  for (const [subId, bSub] of backendSubMap.entries()) {
    if (!CANONICAL_SUBJECT_IDS.has(subId)) continue;
    const fSub = frontendSubMap.get(subId);
    if (!fSub) {
      console.error(`  [MISSING FROM FRONTEND] Subject "${subId}"`);
      errors++;
      continue;
    }

    // Check duplicate chapter IDs
    const bChapterIds = (bSub.chapters || []).map((c) => c.id);
    const bChapDupes = bChapterIds.filter((id, idx) => bChapterIds.indexOf(id) !== idx);
    if (bChapDupes.length > 0) {
      console.error(`  [DUPLICATE ID] Backend subject "${subId}" has duplicate chapter IDs: ${bChapDupes.join(", ")}`);
      errors++;
    }

    const fChapterIds = (fSub.chapters || []).map((c) => c.id);
    const fChapDupes = fChapterIds.filter((id, idx) => fChapterIds.indexOf(id) !== idx);
    if (fChapDupes.length > 0) {
      console.error(`  [DUPLICATE ID] Frontend subject "${subId}" has duplicate chapter IDs: ${fChapDupes.join(", ")}`);
      errors++;
    }

    const bChapMap = new Map((bSub.chapters || []).map((c) => [c.id, c]));
    const fChapMap = new Map((fSub.chapters || []).map((c) => [c.id, c]));

    // Chapters in backend but missing in frontend
    for (const [chapId, bChap] of bChapMap.entries()) {
      const fChap = fChapMap.get(chapId);
      if (!fChap) {
        console.error(`  [MISSING FROM FRONTEND] Subject "${subId}" -> Chapter "${chapId}"`);
        errors++;
        continue;
      }

      // Check topics
      const bTopics = bChap.topics || [];
      const fTopics = fChap.topics || [];

      // Duplicate topics
      const bTopicDupes = bTopics.filter((t, idx) => bTopics.indexOf(t) !== idx);
      if (bTopicDupes.length > 0) {
        console.error(`  [DUPLICATE ID] Backend ${subId}/${chapId} has duplicate topics: ${bTopicDupes.join(", ")}`);
        errors++;
      }

      // Missing topics in frontend
      for (const t of bTopics) {
        if (!fTopics.includes(t)) {
          console.error(`  [MISSING FROM FRONTEND] Topic "${t}" in ${subId}/${chapId}`);
          errors++;
        }
      }

      // Extra topics in frontend
      for (const t of fTopics) {
        if (!bTopics.includes(t)) {
          console.error(`  [EXTRA TOPIC IN FRONTEND] Topic "${t}" in ${subId}/${chapId}`);
          errors++;
        }
      }
    }

    // Chapters in frontend but missing in backend
    for (const chapId of fChapMap.keys()) {
      if (!bChapMap.has(chapId)) {
        console.error(`  [EXTRA CHAPTER IN FRONTEND] Subject "${subId}" -> Chapter "${chapId}"`);
        errors++;
      }
    }
  }

  // Summary
  console.log("\n--------------------------------------------------");
  if (errors === 0) {
    console.log("✓ SUCCESS: Backend and Frontend bootstrap curricula are 100% in sync!");
    console.log(`✓ All 6 canonical subjects present with 0 drift and 0 duplicate IDs.`);
    process.exit(0);
  } else {
    console.error(`✗ FAILED: Found ${errors} curriculum integrity errors.`);
    process.exit(1);
  }
}

validate();
