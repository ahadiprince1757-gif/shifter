const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const curriculumPath = path.join(dataDir, "curriculum.json");
const outputPath = path.join(__dirname, "..", "..", "supabase", "seed.sql");

// Helper to escape SQL single quotes
function escapeSql(str) {
  if (typeof str !== "string") {
    str = String(str);
  }
  return str.replace(/'/g, "''");
}

console.log("Starting seed generation...");

// 1. Read curriculum
let curriculumDataStr = "";
try {
  if (fs.existsSync(curriculumPath)) {
    const curriculum = JSON.parse(fs.readFileSync(curriculumPath, "utf8"));
    curriculumDataStr = JSON.stringify(curriculum, null, 2);
  } else {
    console.error("Curriculum file not found at " + curriculumPath);
  }
} catch (err) {
  console.error("Error reading curriculum.json:", err);
  process.exit(1);
}

// 2. Define global add to capture content data (using a Map to deduplicate, matching index.js in-memory behavior)
const contentMap = new Map();
global.add = (sid, cid, topic, notes = "", qs = []) => {
  const notesStr = typeof notes === "string"
    ? notes
    : Array.isArray(notes)
      ? notes.join("\n")
      : String(notes);

  const qsArray = Array.isArray(qs) ? qs : [qs];
  const key = `${sid}|${cid}|${topic}`;
  contentMap.set(key, { sid, cid, topic, notes: notesStr, qs: qsArray });
};

// 3. Load all JS data files
try {
  const files = fs.readdirSync(dataDir);
  files.forEach((file) => {
    if (file.endsWith(".js") && file !== "curriculum.js") {
      try {
        require(path.join(dataDir, file));
        console.log(`Loaded data file: ${file}`);
      } catch (e) {
        console.error(`Error loading data file ${file}:`, e);
      }
    }
  });
} catch (err) {
  console.error("Failed to read data directory:", err);
  process.exit(1);
}

const contentData = Array.from(contentMap.values());
console.log(`Successfully loaded ${contentData.length} unique topics from data files.`);

// 4. Generate SQL script content
const sqlStatements = [];
sqlStatements.push("-- Seed script for Shifter app (Supabase)");
sqlStatements.push("-- Automatically generated. DO NOT EDIT DIRECTLY.\n");

// Clean existing data for idempotency
sqlStatements.push("TRUNCATE TABLE content, curriculum CASCADE;\n");

// Insert curriculum
if (curriculumDataStr) {
  sqlStatements.push("-- Insert Curriculum");
  sqlStatements.push("INSERT INTO curriculum (data) VALUES (");
  sqlStatements.push(`  '${escapeSql(curriculumDataStr)}'`);
  sqlStatements.push(");\n");
}

// Insert content rows
sqlStatements.push("-- Insert Content (Notes + Quiz Questions)");
contentData.forEach((row, index) => {
  const escapedSid = escapeSql(row.sid);
  const escapedCid = escapeSql(row.cid);
  const escapedTopic = escapeSql(row.topic);
  const escapedNotes = escapeSql(row.notes);
  const escapedQs = escapeSql(JSON.stringify(row.qs));

  sqlStatements.push(`-- Topic: ${row.sid} -> ${row.cid} -> ${row.topic}`);
  sqlStatements.push(`INSERT INTO content (sid, cid, topic, notes, qs) VALUES (`);
  sqlStatements.push(`  '${escapedSid}',`);
  sqlStatements.push(`  '${escapedCid}',`);
  sqlStatements.push(`  '${escapedTopic}',`);
  sqlStatements.push(`  '${escapedNotes}',`);
  sqlStatements.push(`  '${escapedQs}'`);
  sqlStatements.push(`);`);
  sqlStatements.push(""); // blank line
});

// Write to seed.sql
try {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, sqlStatements.join("\n"), "utf8");
  console.log(`Generated seed script with ${contentData.length} records successfully at ${outputPath}`);
} catch (err) {
  console.error("Failed to write seed.sql:", err);
  process.exit(1);
}
