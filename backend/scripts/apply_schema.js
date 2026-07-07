/**
 * apply_schema.js
 * 
 * One-time script to apply supabase/schema.sql to the Supabase database
 * using the Supabase Management API (SQL execution via service role key).
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

const schemaPath = path.join(__dirname, "..", "..", "supabase", "schema.sql");

async function run() {
  console.log("Reading schema.sql...");
  
  let sql;
  try {
    sql = fs.readFileSync(schemaPath, "utf8");
  } catch (err) {
    console.error("Failed to read schema.sql:", err.message);
    process.exit(1);
  }

  console.log(`Schema SQL loaded (${sql.length} chars). Applying to Supabase...`);

  // Use the Supabase PostgreSQL HTTP API endpoint
  // POST /rest/v1/rpc won't work for DDL, so we use the /pg endpoint
  // which is available via the service role key
  const pgUrl = `${supabaseUrl}/pg`;

  // Try the SQL query endpoint first
  const sqlApiUrl = `${supabaseUrl}/rest/v1/rpc`;

  // Split the SQL into individual statements for execution
  // We'll use the Supabase SQL exec endpoint
  const execUrl = `${supabaseUrl}/pg/query`;

  // Actually, let's use the raw pg REST query endpoint that Supabase exposes
  // Format: POST to /rest/v1/ with raw SQL via the query parameter
  // The most reliable way is to use the PostgREST RPC or the pg-meta API

  // Let's try using fetch to the Supabase SQL API
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({})
    });

    // If that doesn't work, we'll try the pg-meta endpoint
    console.log("Trying pg-meta SQL endpoint...");
  } catch (e) {
    // Expected to fail, continue to next approach
  }

  // Use the pg package for direct PostgreSQL connection
  // Extract the project ref from the Supabase URL
  const projectRef = supabaseUrl.replace("https://", "").replace(".supabase.co", "");
  
  // Try using the Supabase pg-meta API which allows SQL execution
  const pgMetaUrl = `${supabaseUrl}/pg-meta/default/query`;

  console.log(`Executing schema against: ${supabaseUrl}`);
  console.log(`Project ref: ${projectRef}`);

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

    if (!response.ok) {
      const text = await response.text();
      console.error(`pg-meta API returned ${response.status}: ${text}`);
      console.log("\n============================================");
      console.log("AUTOMATIC SCHEMA APPLICATION FAILED.");
      console.log("============================================");
      console.log("Please apply the schema manually:");
      console.log("1. Open your Supabase Dashboard: " + supabaseUrl.replace('.co', '.co/project/') + "/sql");
      console.log("2. Open the SQL Editor");
      console.log("3. Paste the contents of supabase/schema.sql");
      console.log("4. Click 'Run'");
      console.log("5. Then run: node backend/scripts/push_db.js");
      console.log("============================================");
      process.exit(1);
    }

    const result = await response.json();
    console.log("Schema applied successfully!");
    console.log("Result:", JSON.stringify(result).slice(0, 200));
  } catch (err) {
    console.error("Failed to apply schema:", err.message);
    console.log("\n============================================");
    console.log("AUTOMATIC SCHEMA APPLICATION FAILED.");
    console.log("============================================");
    console.log("Please apply the schema manually:");
    console.log("1. Open your Supabase Dashboard");
    console.log("2. Go to the SQL Editor");
    console.log("3. Paste the contents of supabase/schema.sql");
    console.log("4. Click 'Run'");
    console.log("5. Then run: node backend/scripts/push_db.js");
    console.log("============================================");
    process.exit(1);
  }
}

run();
