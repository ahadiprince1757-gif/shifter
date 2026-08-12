-- ─────────────────────────────────────────────────────────────
-- reset_user_data.sql
--
-- Run this ONCE in the Supabase SQL Editor to wipe all existing
-- progress/learning data that was stored without proper user scoping.
-- After this, every user starts completely from scratch.
--
-- Tables cleared:
--   progress        (backend-written quiz/lesson progress rows)
--   user_mistakes   (mistake journal entries)
--   spaced_reviews  (spaced repetition schedule)
--   user_notes      (lesson notes)
-- ─────────────────────────────────────────────────────────────

-- Disable RLS temporarily so we can delete across all users
-- (we're service-role in the SQL editor, but this is explicit)
SET LOCAL row_security = off;

TRUNCATE TABLE public.user_mistakes   RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.spaced_reviews  RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.user_notes      RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.progress        RESTART IDENTITY CASCADE;

-- Re-enable RLS
SET LOCAL row_security = on;

-- Confirm
SELECT
  'user_mistakes'  AS tbl, COUNT(*) AS remaining FROM public.user_mistakes
UNION ALL
SELECT 'spaced_reviews', COUNT(*) FROM public.spaced_reviews
UNION ALL
SELECT 'user_notes',     COUNT(*) FROM public.user_notes
UNION ALL
SELECT 'progress',       COUNT(*) FROM public.progress;
