/**
 * seed_achievements.js
 *
 * Populates initial default achievement milestones into Supabase `achievements` table
 * so that the table is populated and not empty.
 */
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAchievements() {
  console.log("Connecting to Supabase to seed initial achievements...");

  // Get first user profile ID or fallback
  const { data: profiles, error: profileErr } = await supabase
    .from("profiles")
    .select("id")
    .limit(1);

  if (profileErr) {
    console.error("Failed to query profiles table:", profileErr.message);
  }

  const userId = profiles?.[0]?.id || "00000000-0000-0000-0000-000000000000";

  const defaultAchievements = [
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

  const { data, error } = await supabase
    .from("achievements")
    .upsert(defaultAchievements, { onConflict: "user_id, achievement_name" })
    .select();

  if (error) {
    console.error("Error inserting achievements:", error.message);
  } else {
    console.log(`✓ Successfully seeded ${data?.length || defaultAchievements.length} initial achievements into public.achievements!`);
  }
}

seedAchievements().catch((err) => {
  console.error("Seed script failed:", err);
});
