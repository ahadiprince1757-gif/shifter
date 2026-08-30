/**
 * seed_user_data.js
 *
 * Seeds initial demo records into Supabase `achievements` and `user_notes` tables
 * so that both tables are populated and do not display empty "Import Data CSV" placeholders.
 */
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log(`Connecting to Supabase (${supabaseUrl})...`);

  // 1. Get first profile ID if present
  const { data: profiles } = await supabase.from("profiles").select("id").limit(1);
  const userId = profiles?.[0]?.id || "00000000-0000-0000-0000-000000000000";

  console.log(`Target User ID: ${userId}`);

  // 2. Seed achievements
  console.log("\n1. Seeding public.achievements...");
  const sampleAchievements = [
    {
      user_id: userId,
      achievement_name: "First Retrieval Quiz Completed",
      unlocked_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      user_id: userId,
      achievement_name: "Mastered Topic: Linear Equations",
      unlocked_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      user_id: userId,
      achievement_name: "100% Active Retrieval Accuracy",
      unlocked_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      user_id: userId,
      achievement_name: "Structural Transfer Challenge Passed",
      unlocked_at: new Date().toISOString(),
    },
  ];

  const { data: achData, error: achError } = await supabase
    .from("achievements")
    .insert(sampleAchievements)
    .select();

  if (achError) {
    console.warn("  achievements insert note:", achError.message);
  } else {
    console.log(`  ✓ Inserted ${achData?.length || 4} achievement records into public.achievements!`);
  }

  // 3. Seed user_notes
  console.log("\n2. Seeding public.user_notes...");

  // Query a valid topic ID from public.topics
  const { data: topics } = await supabase.from("topics").select("id").limit(2);
  const topic1 = topics?.[0]?.id || 1;
  const topic2 = topics?.[1]?.id || 2;

  const sampleNotes = [
    {
      user_id: userId,
      topic_id: topic1,
      note_text: "Key Formula: ax + b = c. Always isolate x by inverse operations.",
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      user_id: userId,
      topic_id: topic2,
      note_text: "Equation: 6CO2 + 6H2O -> C6H12O6 + 6O2. Takes place in chloroplasts.",
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { data: noteData, error: noteError } = await supabase
    .from("user_notes")
    .insert(sampleNotes)
    .select();

  if (noteError) {
    console.warn("  user_notes insert note:", noteError.message);
  } else {
    console.log(`  ✓ Inserted ${noteData?.length || 2} user note records into public.user_notes!`);
  }

  console.log("\n✓ Seed completed!");
}

seedData().catch((err) => {
  console.error("Seed script failed:", err);
});
