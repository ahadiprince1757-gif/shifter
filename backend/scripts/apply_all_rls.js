/**
 * apply_all_rls.js
 * 
 * Applies supabase/apply_all_rls_and_columns.sql to Supabase via pg-meta API
 * or outputs 1-click execution instructions.
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  process.exit(1);
}

const sqlPath = path.join(__dirname, "..", "..", "supabase", "apply_all_rls_and_columns.sql");

async function run() {
  let sql;
  try {
    sql = fs.readFileSync(sqlPath, "utf8");
  } catch (err) {
    console.error("Failed to read apply_all_rls_and_columns.sql:", err.message);
    process.exit(1);
  }

  const pgMetaUrl = `${supabaseUrl}/pg-meta/default/query`;
  console.log(`Applying RLS migration to Supabase (${supabaseUrl})...`);

  try {
    const response = await fetch(pgMetaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ query: sql })
    });

    if (response.ok) {
      console.log("✓ RLS Policies & Column Extensions applied successfully!");
      return;
    }

    console.warn(`pg-meta returned status ${response.status}. Direct Dashboard SQL execution recommended:`);
  } catch (err) {
    console.warn("Direct HTTP SQL query unavailable:", err.message);
  }

  console.log("\n=======================================================");
  console.log("  1-CLICK SUPABASE RLS EXECUTION INSTRUCTIONS");
  console.log("=======================================================");
  console.log("1. Open your Supabase Dashboard:");
  console.log(`   ${supabaseUrl.replace('.co', '.co/project/')}/sql`);
  console.log("2. Open 'New query' in the SQL Editor.");
  console.log("3. Paste the contents of:");
  console.log(`   ${sqlPath}`);
  console.log("4. Click 'Run'.");
  console.log("=======================================================\n");
}

run();
