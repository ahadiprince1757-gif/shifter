/**
 * Idempotent Synchronization Script for Supabase Curriculum Tables
 * 
 * Synchronizes canonical curriculum from backend/data/curriculum.json into:
 *   - public.curriculum_subjects
 *   - public.curriculum_chapters
 *   - public.curriculum_topics
 * 
 * Safety guarantees:
 *   - 100% idempotent: can be run repeatedly without duplicate rows or data loss.
 *   - Preserves all relational foreign keys (subject_id, chapter_id).
 *   - Does NOT fabricate or modify any student data (user_notes, question_attempts, etc.).
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const curriculumPath = path.resolve(__dirname, "../data/curriculum.json");

async function chunkedUpsert(table, records, onConflictKey, chunkSize = 100) {
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    const { error } = await supabase
      .from(table)
      .upsert(chunk, { onConflict: onConflictKey });

    if (error) {
      throw new Error(`Failed to upsert into ${table} (chunk ${i}-${i + chunk.length}): ${error.message}`);
    }
  }
}

async function run() {
  console.log("==================================================");
  console.log("   SUPABASE CANONICAL CURRICULUM SYNCHRONIZATION   ");
  console.log("==================================================");

  if (!fs.existsSync(curriculumPath)) {
    console.error(`❌ Curriculum file not found at: ${curriculumPath}`);
    process.exit(1);
  }

  const curriculum = JSON.parse(fs.readFileSync(curriculumPath, "utf8"));
  console.log(`✓ Loaded canonical curriculum with ${curriculum.length} subjects.`);

  // 1. Prepare Subjects
  const subjects = curriculum.map((s) => ({
    id: s.id,
    label: s.label,
    icon: s.icon || "📚"
  }));

  // 2. Prepare Chapters & Topics
  const chapters = [];
  const topics = [];

  curriculum.forEach((subj) => {
    (subj.chapters || []).forEach((chap, cIdx) => {
      chapters.push({
        id: chap.id,
        subject_id: subj.id,
        label: chap.label,
        topics_order: cIdx
      });

      (chap.topics || []).forEach((top, tIdx) => {
        const title = typeof top === "object" && top !== null
          ? (top.name || top.label || top.title || "")
          : String(top);

        if (title.trim()) {
          topics.push({
            chapter_id: chap.id,
            topic: title.trim(),
            topic_order: tIdx
          });
        }
      });
    });
  });

  console.log(`\nPrepared entities for synchronization:`);
  console.log(`  - Subjects:  ${subjects.length}`);
  console.log(`  - Chapters:  ${chapters.length}`);
  console.log(`  - Topics:    ${topics.length}`);

  // 3. Upsert Subjects
  console.log("\n[1/3] Synchronizing curriculum_subjects...");
  await chunkedUpsert("curriculum_subjects", subjects, "id", 50);
  console.log(`✓ Synchronized ${subjects.length} subjects.`);

  // 4. Upsert Chapters
  console.log("[2/3] Synchronizing curriculum_chapters...");
  await chunkedUpsert("curriculum_chapters", chapters, "id", 100);
  console.log(`✓ Synchronized ${chapters.length} chapters.`);

  // 5. Upsert Topics
  console.log("[3/3] Synchronizing curriculum_topics...");
  await chunkedUpsert("curriculum_topics", topics, "chapter_id,topic,topic_order", 150);
  console.log(`✓ Synchronized ${topics.length} topics.`);

  // 6. Verify Final Counts in Database
  console.log("\n==================================================");
  console.log("            DATABASE VERIFICATION AUDIT           ");
  console.log("==================================================");

  const tablesToVerify = [
    { name: "curriculum_subjects", expected: ">= 12" },
    { name: "curriculum_chapters", expected: chapters.length.toString() },
    { name: "curriculum_topics",   expected: topics.length.toString() },
    { name: "user_notes",           expected: "0 (unmodified student data)" },
    { name: "question_attempts",    expected: "0 (unmodified student data)" },
    { name: "learning_events",      expected: "0 (unmodified student data)" },
    { name: "intelligence_decisions", expected: "0 (unmodified student data)" }
  ];

  for (const tbl of tablesToVerify) {
    const { count, error } = await supabase
      .from(tbl.name)
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(`  - ${tbl.name.padEnd(25)}: ERROR (${error.message})`);
    } else {
      console.log(`  - ${tbl.name.padEnd(25)}: ${String(count).padStart(5)} rows  [Target: ${tbl.expected}]`);
    }
  }

  console.log("==================================================");
  console.log("✓ Curriculum synchronization finished successfully!");
}

run().catch((err) => {
  console.error("\n❌ Synchronization failed:", err.message);
  process.exit(1);
});
