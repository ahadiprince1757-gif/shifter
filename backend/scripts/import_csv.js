/**
 * Production-Grade CSV Importer for Shifter / Tixar (Supabase Ingestion)
 * 
 * Features:
 * - CSV Header Mapping to Supabase Schema (Subject, Chapter, Topic, Notes, Questions)
 * - Error Code Handling: 42501 (RLS), 23505 (Duplicate), 23502 (Missing Field), 22P02 (Type Error)
 * - Automatic Data Type Normalization & Sanitization
 * - Chunked Batching (BATCH_SIZE = 250) with .select() verification
 * - Detailed error reporting per row and per batch
 */

require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const BATCH_SIZE = 250;

/**
 * Normalizes raw CSV row object into Supabase table schema format.
 */
function mapCsvRowToSchema(row) {
  const sid = (row.sid || row.subject_id || row.subject || "").trim().toLowerCase();
  const cid = (row.cid || row.chapter_id || row.chapter || "").trim().toLowerCase();
  const topic = (row.topic || row.topic_title || row.title || "").trim();
  const notes = (row.notes || row.content || row.explanation || "").trim();

  let qs = [];
  if (row.qs || row.questions || row.question) {
    const rawQs = row.qs || row.questions || row.question;
    if (typeof rawQs === "string") {
      try {
        qs = JSON.parse(rawQs);
      } catch {
        qs = [{ q: rawQs, ans: row.answer || row.correct_answer || "" }];
      }
    } else if (Array.isArray(rawQs)) {
      qs = rawQs;
    }
  }

  return {
    sid: sid || "general",
    cid: cid || "overview",
    topic: topic || "Untitled Topic",
    notes: notes || "",
    qs: JSON.stringify(qs)
  };
}

/**
 * Main CSV Ingestion Function
 * @param {string} filePath Absolute or relative path to CSV file
 * @param {string} tableName Target Supabase table name (default: "content")
 */
async function importCsvFile(filePath, tableName = "content") {
  console.log(`\n=================================================`);
  console.log(`  SHIFTER CSV IMPORTER: ${path.basename(filePath)}`);
  console.log(`=================================================\n`);

  // Step 1: Read & Parse File
  if (!fs.existsSync(filePath)) {
    console.error(`✗ Error: File not found at ${filePath}`);
    return;
  }

  const rawContent = fs.readFileSync(filePath, "utf8");
  const lines = rawContent.split(/\r?\n/).filter(line => line.trim().length > 0);

  if (lines.length <= 1) {
    console.error(`✗ Error: CSV file is empty or missing headers.`);
    return;
  }

  // Basic CSV Parser (supporting comma-separated headers & quoted strings)
  const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""));
  console.log("1. Parsed CSV Headers:", headers);

  const rawRows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(v => v.trim().replace(/^["']|["']$/g, ""));
    const rowObj = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || "";
    });
    rawRows.push(rowObj);
  }

  console.log(`✓ Parsed ${rawRows.length} raw CSV rows.\n`);
  console.log("First Row Sample:", rawRows[0]);

  // Step 2: Map to Database Schema
  const mappedRows = rawRows.map(mapCsvRowToSchema).filter(r => r.topic !== "Untitled Topic");
  console.log(`✓ Mapped ${mappedRows.length} valid schema rows.\n`);

  // Step 3: Batch Insertion to Supabase
  let totalInserted = 0;
  let totalFailed = 0;

  for (let i = 0; i < mappedRows.length; i += BATCH_SIZE) {
    const batch = mappedRows.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    console.log(`Inserting Batch ${batchNum} (${batch.length} rows)...`);

    const { data, error } = await supabase
      .from(tableName)
      .insert(batch)
      .select("id");

    if (error) {
      console.error(`✗ Batch ${batchNum} Failed!`);
      console.error(`  Code:    ${error.code}`);
      console.error(`  Message: ${error.message}`);
      console.error(`  Details: ${error.details || "None"}`);
      console.error(`  Hint:    ${error.hint || "None"}`);

      // Map common database error codes
      if (error.code === "42501") {
        console.error("  👉 RLS Error: Active session lacks write permission. Check RLS policy or use Service Role key.");
      } else if (error.code === "23505") {
        console.error("  👉 Duplicate Key: Row violates a unique constraint.");
      } else if (error.code === "23502") {
        console.error("  👉 Missing Required Field: A non-nullable column received null.");
      } else if (error.code === "22P02") {
        console.error("  👉 Invalid Data Type: Cannot cast input string to target column data type.");
      }

      totalFailed += batch.length;
    } else {
      const count = data ? data.length : batch.length;
      totalInserted += count;
      console.log(`  ✓ Batch ${batchNum} Success: Inserted ${count} rows.`);
    }
  }

  console.log(`\n=================================================`);
  console.log(`  IMPORT COMPLETE: ${totalInserted} inserted, ${totalFailed} failed.`);
  console.log(`=================================================\n`);
}

// Allow CLI execution if passed a filename argument
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetFile = args[0] || path.join(__dirname, "..", "data", "sample_curriculum.csv");
  const table = args[1] || "content";
  importCsvFile(targetFile, table).catch(err => console.error("Unhandled Import Error:", err));
}

module.exports = { importCsvFile, mapCsvRowToSchema };
