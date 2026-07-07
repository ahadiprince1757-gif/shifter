require("dotenv").config();
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  process.exit(1);
}

const analyticsSchemaPath = path.join(__dirname, "..", "..", "supabase", "analytics.sql");

async function run() {
  console.log("Reading analytics.sql...");
  
  let sql;
  try {
    sql = fs.readFileSync(analyticsSchemaPath, "utf8");
  } catch (err) {
    console.error("Failed to read analytics.sql:", err.message);
    process.exit(1);
  }

  const pgMetaUrl = `${supabaseUrl}/pg-meta/default/query`;
  console.log(`Executing schema against: ${supabaseUrl}`);

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
      process.exit(1);
    }

    const result = await response.json();
    console.log("Analytics schema applied successfully!");
    console.log("Result:", JSON.stringify(result));
  } catch (err) {
    console.error("Failed to apply analytics schema:", err.message);
    process.exit(1);
  }
}

run();
